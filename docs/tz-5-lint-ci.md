# ТЗ #5 — Линты, форматтер, pre-commit, CI-checks (лендинг)

**Контекст:** на сайте сейчас нет ESLint, Prettier, Husky, нет проверки lint/build на CI. Существующий `.github/workflows/deploy.yml` сразу деплоит на push в dev/main без проверок. Любое сломанное изменение (broken build, undefined var, опечатка в JSX) **доходит до dev/prod без сопротивления**.

**В CRM-проекте этот ТЗ уже выполнен** (`docs/lint-ci-tz.md` в CRM-репо). Здесь — адаптация под лендинг (один воркспейс вместо двух, другой ESLint config, нет backend).

**Эффект:** битые деплои блокируются ещё до push'а (Husky) и до merge (CI).

**Скоуп:** ESLint + Prettier + Husky + GitHub Actions checks workflow для `AIVISION WEB`.

**Стек:** Node 20, npm, GitHub Actions, ESLint 9, Prettier 3, Husky 9, lint-staged 15.

**Где работаем:** `/Users/cyclonecenter7/Desktop/Code/AIVISION WEB/`.

---

## Задача 1 — ESLint + react/hooks/a11y (30 мин)

### Шаги

1. Установить:
```bash
npm install --save-dev eslint@^9.39.0 @eslint/js globals \
  eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

2. Создать `eslint.config.js` (flat config, ESM):

```js
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2024,
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['error', 'warn'] }],
      'no-undef': 'error',
      'no-var': 'error',
      'prefer-const': 'warn',
      'eqeqeq': ['error', 'smart'],

      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-key': 'error',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
    },
    ignores: ['node_modules/**', 'dist/**', 'public/**', 'build.out'],
  },
];
```

3. Если будет конфликт peer-deps (как в CRM с jsx-a11y@6 vs eslint@10) — создать `.npmrc`:
```
legacy-peer-deps=true
```

4. Scripts в `package.json`:
```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

5. Прогон `npm run lint:fix` потом `npm run lint`. Ожидать:
   - **Много warnings** про exhaustive-deps + a11y (норм)
   - **Errors** — фиксить сразу. Скорее всего unused imports после tz-4 (если декомпозили компоненты)

**Приёмка:** `npm run lint` — 0 errors. Warnings допустимы.

---

## Задача 2 — Prettier (10 мин)

```bash
npm install --save-dev prettier
```

`.prettierrc.json`:
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

`.prettierignore`:
```
node_modules
dist
build
*.log
.env
.env.*
public
build.out
```

Scripts:
```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

**Перед автоформатом — отдельный коммит:**
```bash
npm run format
git add -A
git commit -m "chore: apply prettier formatting"
```

Большой diff, но чистая история (потом git blame не страдает).

**Приёмка:** `npm run format:check` — 0 невалидных файлов.

---

## Задача 3 — Husky + lint-staged (15 мин)

```bash
npm install --save-dev husky lint-staged
npx husky init
```

В `package.json` добавить:
```json
{
  "scripts": {
    "prepare": "husky"
  },
  "lint-staged": {
    "src/**/*.{js,jsx}": [
      "prettier --write",
      "eslint --fix --max-warnings=10"
    ],
    "*.{json,md,yml}": "prettier --write"
  }
}
```

`.husky/pre-commit`:
```sh
npx lint-staged
```

`.husky/pre-push`:
```sh
echo "[pre-push] running lint..."
npm run lint || { echo "❌ lint failed"; exit 1; }

echo "[pre-push] running build..."
npm run build || { echo "❌ build failed"; exit 1; }

echo "✅ pre-push passed"
```

```bash
chmod +x .husky/pre-commit .husky/pre-push
```

### Приёмка

- Поменять файл с unused import → попытаться закоммитить → eslint бьёт, коммит блокируется
- Сломать билд (синтаксис) → попытаться `git push` → pre-push блокирует
- Чистый коммит → проходит автоформат → попадает в коммит

---

## Задача 4 — GitHub Actions checks workflow (15 мин)

Создать `.github/workflows/checks.yml`:

```yaml
name: Checks

on:
  pull_request:
    branches: [dev, main]
  push:
    branches: ['**']    # на любую ветку, не только dev/main

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
        env:
          VITE_API_URL: https://api.aivisiontest.ru

  format-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run format:check
```

**Существующий `deploy.yml` НЕ трогать** — он деплоит на push в dev/main, остаётся как есть. `checks.yml` — независимый, прогоняет lint/build/format на любую ветку.

**Branch protection** — для приватных репов нужен GitHub Pro ($4/мес). Без него: Husky pre-push даёт основную защиту локально.

### Приёмка

- Push в любую ветку → видны 3 jobs в Actions tab: `lint`, `build`, `format-check`
- Все зелёные на чистом коде
- Ломаешь билд / unused import → красный

---

## Чеклист

- [ ] ESLint 9 + react/hooks/a11y настроен, `npm run lint` = 0 errors
- [ ] `.npmrc` с `legacy-peer-deps=true` если был конфликт
- [ ] Prettier настроен, `format:check` зелёный
- [ ] Husky pre-commit работает (форматит + лоинтит staged)
- [ ] Husky pre-push работает (lint + build, блокирует битый push)
- [ ] `.github/workflows/checks.yml` создан и проходит на тестовой ветке
- [ ] CLAUDE.md обновлён — раздел про линты/форматтер/CI

---

## Раздел в CLAUDE.md

Добавить:

```markdown
## Качество кода

### Линты
- ESLint 9 (flat config) — `eslint.config.js`
- Prettier 3 — `.prettierrc.json`
- React + react-hooks + jsx-a11y плагины

### Команды
\`\`\`bash
npm run lint          # 0 errors
npm run lint:fix
npm run format
npm run format:check
\`\`\`

### Pre-commit
- Husky + lint-staged: prettier + eslint --fix на изменённые файлы
- Pre-push: full lint + build

### CI
- `.github/workflows/checks.yml` — lint, build, format-check на каждый push
- `.github/workflows/deploy.yml` — деплой на push в dev/main
```

---

## Что НЕ делать

- НЕ ставить TypeScript — отдельное обсуждение
- НЕ менять структуру кода (FSD-lite, переименования) — это другой ТЗ
- НЕ фиксить ВСЕ warnings разом — ужесточать постепенно
- НЕ ставить airbnb / standard конфиги — навяжут стиль чужого кода
- НЕ трогать существующий `deploy.yml`

---

## Финальный коммит (серия)

```
chore(eslint): add ESLint 9 + react/hooks/a11y flat config
chore(prettier): add Prettier 3 with shared config
chore: apply prettier formatting (auto)
chore(husky): add pre-commit and pre-push hooks
chore(ci): add lint/build/format-check workflow
docs(claude): add code-quality section
```
