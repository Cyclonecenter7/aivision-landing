#!/usr/bin/env bash
# Чистит Claude Code auto-worktrees и ветки после мерджа в dev/main.
#
# Режимы:
#   ./scripts/cleanup-worktrees.sh              — полная чистка
#   ./scripts/cleanup-worktrees.sh --dry-run    — показать что снёс бы
#   ./scripts/cleanup-worktrees.sh --safe       — только список кандидатов, не удалять
#                                                  (используется git hook post-merge)
#
# Безопасность:
# - Удаляет ТОЛЬКО ветки с префиксом claude/* (auto-worktree-ветки).
# - Удаляет только если ветка мержена в dev ИЛИ main.
# - НИКОГДА не трогает текущий worktree и текущую ветку.
# - НИКОГДА не трогает worktree моложе MIN_AGE_HOURS (активная сессия Claude Code).
# - НИКОГДА не трогает worktree залоченные через `git worktree lock`.
# - Битые worktrees (папок нет) — git worktree prune (всегда безопасно).

set -euo pipefail

DRY_RUN=0
SAFE_MODE=0
case "${1:-}" in
  --dry-run) DRY_RUN=1 ;;
  --safe)    SAFE_MODE=1 ;;
esac

MIN_AGE_HOURS="${CLAUDE_CLEANUP_MIN_AGE_HOURS:-24}"

# ВАЖНО: захватываем текущий worktree/ветку ДО cd, иначе после cd
# rev-parse вернёт main checkout, и guard на текущий worktree сломается.
CURRENT_WT="$(git rev-parse --show-toplevel)"
CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")"

# Переходим в main checkout — операции с ветками работают из единой точки.
COMMON_DIR="$(git rev-parse --git-common-dir)"
[[ "$COMMON_DIR" != /* ]] && COMMON_DIR="$(pwd)/$COMMON_DIR"
REPO_ROOT="$(cd "$COMMON_DIR/.." && pwd)"
cd "$REPO_ROOT"

log() { printf "[cleanup] %s\n" "$*"; }
run() {
  if [[ $DRY_RUN -eq 1 ]]; then
    log "DRY-RUN: $*"
  else
    eval "$@"
  fi
}

is_merged() {
  local br="$1"
  git merge-base --is-ancestor "refs/heads/$br" refs/heads/dev 2>/dev/null && return 0
  git merge-base --is-ancestor "refs/heads/$br" refs/heads/main 2>/dev/null && return 0
  return 1
}

# Возраст самого свежего файла в worktree, в часах. macOS + Linux.
worktree_age_hours() {
  local wt="$1"
  local latest_mtime
  # ищем самый свежий .jsx/.js/.css/.md/.json + любые правки кроме node_modules/.git
  latest_mtime="$(find "$wt" \
    -type d \( -name node_modules -o -name dist -o -name .git \) -prune -o \
    -type f -print 2>/dev/null \
    | head -2000 \
    | xargs -I{} stat -f '%m' "{}" 2>/dev/null \
    | sort -rn | head -1)"
  # fallback для Linux (stat -c)
  if [[ -z "$latest_mtime" ]]; then
    latest_mtime="$(find "$wt" \
      -type d \( -name node_modules -o -name dist -o -name .git \) -prune -o \
      -type f -print 2>/dev/null \
      | head -2000 \
      | xargs -I{} stat -c '%Y' "{}" 2>/dev/null \
      | sort -rn | head -1)"
  fi
  if [[ -z "$latest_mtime" ]]; then
    echo "9999"
    return
  fi
  local now age_sec age_hr
  now="$(date +%s)"
  age_sec=$(( now - latest_mtime ))
  age_hr=$(( age_sec / 3600 ))
  echo "$age_hr"
}

# Залочен ли worktree (git worktree lock)
is_locked() {
  local wt="$1"
  local gitdir
  gitdir="$(git -C "$wt" rev-parse --git-dir 2>/dev/null || echo "")"
  [[ -n "$gitdir" && -f "$gitdir/locked" ]]
}

log "fetch --all --prune"
run "git fetch --all --prune --quiet"

log "git worktree prune (битые worktrees, папок нет)"
run "git worktree prune"

# Парсим git worktree list --porcelain — устойчиво к пробелам в путях
declare -a WT_PATHS=()
declare -a WT_BRANCHES=()
cur_path=""
cur_branch=""
while IFS= read -r line; do
  case "$line" in
    "worktree "*) cur_path="${line#worktree }"; cur_branch="" ;;
    "branch "*)   cur_branch="${line#branch refs/heads/}" ;;
    "")
      if [[ -n "$cur_path" ]]; then
        WT_PATHS+=("$cur_path")
        WT_BRANCHES+=("$cur_branch")
      fi
      cur_path=""; cur_branch=""
      ;;
  esac
done < <(git worktree list --porcelain; echo "")

REMOVED_WT=()
REMOVED_BR=()
CANDIDATES=()
SKIPPED_REASONS=()

for i in "${!WT_PATHS[@]}"; do
  WT_PATH="${WT_PATHS[$i]}"
  WT_BRANCH="${WT_BRANCHES[$i]}"

  case "$WT_PATH" in *"/.claude/worktrees/"*) ;; *) continue ;; esac
  case "$WT_BRANCH" in claude/*) ;; *) continue ;; esac

  # HARD GUARD #1: текущий worktree и ветка
  if [[ "$WT_PATH" == "$CURRENT_WT" || "$WT_BRANCH" == "$CURRENT_BRANCH" ]]; then
    SKIPPED_REASONS+=("$WT_BRANCH | текущая сессия")
    continue
  fi

  # GUARD #2: ветка не мержена
  if ! is_merged "$WT_BRANCH"; then
    SKIPPED_REASONS+=("$WT_BRANCH | не мержена в dev/main")
    continue
  fi

  # GUARD #3: lock
  if is_locked "$WT_PATH"; then
    SKIPPED_REASONS+=("$WT_BRANCH | git worktree locked")
    continue
  fi

  # GUARD #4: свежие правки (возможно активная сессия)
  if [[ -d "$WT_PATH" ]]; then
    AGE="$(worktree_age_hours "$WT_PATH")"
    if [[ "$AGE" -lt "$MIN_AGE_HOURS" ]]; then
      SKIPPED_REASONS+=("$WT_BRANCH | правки <${MIN_AGE_HOURS}ч (возраст: ${AGE}ч)")
      continue
    fi
  fi

  CANDIDATES+=("$WT_PATH|$WT_BRANCH")
done

# В safe-режиме (hook) — только показать кандидатов, ничего не удалять.
if [[ $SAFE_MODE -eq 1 ]]; then
  printf "\n[cleanup] === SAFE MODE (auto после git pull) ===\n"
  if [[ ${#CANDIDATES[@]} -gt 0 ]]; then
    printf "Кандидаты на удаление (%d). Запусти ./scripts/cleanup-worktrees.sh для чистки:\n" "${#CANDIDATES[@]}"
    for c in "${CANDIDATES[@]}"; do
      printf "  - %s\n" "$(echo "$c" | awk -F'|' '{print $2 " ("$1")"}')"
    done
  else
    printf "Кандидатов на удаление нет. Чисто.\n"
  fi
  exit 0
fi

# Полная чистка
for c in "${CANDIDATES[@]:-}"; do
  [[ -z "$c" ]] && continue
  WT_PATH="${c%|*}"
  WT_BRANCH="${c##*|}"
  log "remove worktree: $WT_PATH (branch $WT_BRANCH)"
  run "git worktree remove --force \"$WT_PATH\""
  REMOVED_WT+=("$WT_PATH")
  log "delete branch: $WT_BRANCH"
  run "git branch -D \"$WT_BRANCH\""
  REMOVED_BR+=("$WT_BRANCH")
done

# Локальные claude/* ветки без worktree, уже мерженные
ALL_LOCAL_CLAUDE="$(git for-each-ref --format='%(refname:short)' refs/heads/claude/ 2>/dev/null || true)"
WT_BRANCH_SET=" $(printf '%s ' "${WT_BRANCHES[@]:-}") "
if [[ -n "$ALL_LOCAL_CLAUDE" ]]; then
  while IFS= read -r br; do
    [[ -z "$br" ]] && continue
    [[ "$br" == "$CURRENT_BRANCH" ]] && continue
    case "$WT_BRANCH_SET" in *" $br "*) continue ;; esac
    if is_merged "$br"; then
      log "delete orphan merged branch: $br"
      run "git branch -d \"$br\" 2>/dev/null || git branch -D \"$br\""
      REMOVED_BR+=("$br")
    fi
  done <<< "$ALL_LOCAL_CLAUDE"
fi

# Итоги
printf "\n[cleanup] === ИТОГИ ===\n"
printf "Удалено worktrees: %d\n" "${#REMOVED_WT[@]}"
for x in "${REMOVED_WT[@]:-}"; do [[ -n "$x" ]] && printf "  - %s\n" "$x"; done
printf "Удалено веток: %d\n" "${#REMOVED_BR[@]}"
for x in "${REMOVED_BR[@]:-}"; do [[ -n "$x" ]] && printf "  - %s\n" "$x"; done
if [[ ${#SKIPPED_REASONS[@]} -gt 0 ]]; then
  printf "Пропущено (защита):\n"
  for x in "${SKIPPED_REASONS[@]}"; do printf "  - %s\n" "$x"; done
fi
if [[ $DRY_RUN -eq 1 ]]; then
  printf "\n[cleanup] DRY-RUN: ничего не удалено. Запусти без --dry-run для реальной чистки.\n"
fi
