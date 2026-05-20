#!/usr/bin/env bash
# Устанавливает git hooks из .githooks/ в локальный .git/hooks/.
#
# Запускается один раз на машину (после клона репы или после правки хуков).
# Hook'и в .git/hooks НЕ синхронизируются через git, поэтому нужен этот шаг.
#
# Альтернатива (если правки хуков частые): настроить core.hooksPath, тогда
# git будет читать прямо из .githooks/. Не делаем по умолчанию, чтобы не
# заставлять менять глобальные настройки.

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
SRC="$REPO_ROOT/.githooks"
DST="$REPO_ROOT/.git/hooks"

if [[ ! -d "$SRC" ]]; then
  echo "[install-hooks] нет директории $SRC — нечего ставить"
  exit 1
fi

mkdir -p "$DST"

for hook in "$SRC"/*; do
  [[ -f "$hook" ]] || continue
  name="$(basename "$hook")"
  target="$DST/$name"
  cp "$hook" "$target"
  chmod +x "$target"
  echo "[install-hooks] установлен: $name"
done

echo "[install-hooks] готово. Hooks активны для этого клона."
