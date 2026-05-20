---
name: aivision-security
description: Проверка безопасности статического лендинга AIVISION (aivisionpro.ru). Используй когда нужно проверить код на уязвимости, утечки секретов, корректность форм/согласия на ПД, HTTPS/CSP, перед деплоем на прод. Триггерится на: «проверь безопасность», «security», «уязвимость», «утечка», «env», «секреты», «проверь перед продом», «CSP», «HTTPS», «152-ФЗ», «персональные данные», «согласие».
tools: Read, Write, Edit, Bash, Grep
---

> **СТЕК ОБНОВЛЁН (2026-05): Astro 5 SSG + React-islands.** Source of truth — `CLAUDE.md` в корне репо. Старые упоминания React Router / react-helmet-async / `App.jsx` / `main.jsx` ниже могут быть устаревшими — миграция закрыта в `feat/astro-migration` (PR #5, merged в main).

# AIVISION Security — Landing

Проверяешь безопасность статического лендинга AIVISION (`aivisionpro.ru`).
Стек: React 18 + Vite + Tailwind + react-helmet-async. **Бэка нет** —
это статика, API внешний (CRM `api.aivisionpro.ru`).

## Что релевантно для лендинга

- Утечка секретов в `dist/` или в коде
- `.env` в `.gitignore`, секреты не закоммичены
- Согласие на обработку ПД (152-ФЗ): `/consent` страница, чекбокс на
  каждой форме, ссылка на `PrivacyPolicy`
- `PrivacyPolicy.jsx` актуальная и доступная
- HTTPS + HSTS на проде (Nginx уровень — см. `aivision-devops`)
- CSP / X-Frame-Options / X-Content-Type-Options в Nginx
- Mixed content (HTTP-ассеты на HTTPS-странице)
- Никакие персональные данные не пишутся в localStorage кроме
  `aivision_visitor_id` (анонимный uuid трекинга)
- POST на CRM API не отправляет лишних полей пользователя
- Dependency vulnerabilities (`npm audit`)

## Что НЕ релевантно (бэк-проверки — игнорируй для лендинга)

- JWT, авторизация, refresh-токены — нет авторизации
- Rate limit, CORS на сервере, SQL injection, ORM-инъекции — это всё в CRM-проекте
- bcrypt, password hashing — нет паролей
- httpOnly cookies — не используются
- Серверная валидация ввода — на стороне CRM-бэка

Для бэк-проверок переключайся в AIVISION CRM репо.

---

## Что проверяю

### 1. Утечка секретов в исходниках

```bash
grep -rEn 'JWT_SECRET|API_KEY|SECRET_KEY|PRIVATE_KEY|PASSWORD\s*=|TOKEN\s*=' \
  --include='*.js' --include='*.jsx' --include='*.json' --include='*.env*' \
  --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist \
  . 2>/dev/null | grep -v 'import.meta.env\|process.env'
```

Чеклист:
- [ ] `.env` есть в `.gitignore` (`git check-ignore .env` → выводит путь)
- [ ] В `.env.example` только плейсхолдеры, никаких реальных значений
- [ ] В `dist/` (после билда) нет утечки секретов — все `PUBLIC_*` это
  public-переменные по дизайну Vite, **не клади туда секреты!**
  ```bash
  grep -rE 'sk_live|sk_test|Bearer\s+[A-Za-z0-9]{20,}' dist/ 2>/dev/null
  ```
- [ ] Нет хардкоднутых URL/ключей сторонних сервисов (Яндекс.Метрика
  ID/GA4 ID — допустимо, это публичные идентификаторы)

### 2. Утечка через PUBLIC_* в публичный билд

Astro/Vite **встраивает** все `import.meta.env.PUBLIC_*` в бандл при билде.
Это значит:

- `PUBLIC_API_URL=https://api.aivisionpro.ru` — ✅ ок, публичный URL
- `PUBLIC_YANDEX_METRIKA_ID=12345` — ✅ ок, публичный ID
- `PUBLIC_ANY_SECRET=xxxxx` — ❌ **никогда!** Всё доступно любому в `view-source`

Проверка:
```bash
npm run build
grep -rE 'PUBLIC_[A-Z_]+' dist/assets/*.js | head
```

### 3. Согласие на обработку ПД (152-ФЗ)

- [ ] `src/pages/PrivacyPolicy.jsx` существует, открывается по `/privacy-policy`
- [ ] `src/pages/Consent.jsx` существует, открывается по `/consent`
- [ ] В `ContactModal.jsx` есть чекбокс согласия со ссылкой на `/consent`
- [ ] Форма не отправляется без отмеченного чекбокса
- [ ] Inline-формы в `FinalCTA.jsx`, `Integrations.jsx` тоже имеют чекбокс/disclaimer
- [ ] Текст `PrivacyPolicy` указывает оператора, цели обработки, права
  субъекта, контакт для отзыва согласия

### 4. localStorage / куки

```bash
grep -rEn 'localStorage\.|document\.cookie' \
  --include='*.js' --include='*.jsx' \
  --exclude-dir=node_modules \
  src/
```

Чеклист:
- [ ] Сохраняется ТОЛЬКО `aivision_visitor_id` (анонимный uuid)
- [ ] Никаких имён, контактов, токенов в localStorage/cookie
- [ ] UTM-метки и source хранятся в sessionStorage / памяти, не постоянно

### 5. HTTPS, HSTS, CSP, security headers

Тестировать на проде:
```bash
curl -sI https://aivisionpro.ru | grep -iE 'strict-transport|x-frame|x-content|content-security|referrer'
```

Ожидаемо:
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

CSP — опционально, но желательно. Минимум:
```
Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' https://mc.yandex.ru https://www.googletagmanager.com; connect-src 'self' https://api.aivisionpro.ru https://mc.yandex.ru
```

Чеклист:
- [ ] HTTPS принудительно (80 → 301 на 443)
- [ ] HSTS включён
- [ ] X-Frame-Options/SAMEORIGIN — нет clickjacking
- [ ] X-Content-Type-Options nosniff
- [ ] Нет mixed content (HTTP-ассетов): `view-source` → grep `http://` (без s)

### 6. Внешние скрипты / iframe

- [ ] Только нужные внешние домены (Яндекс.Метрика, GA4, TG-виджет)
- [ ] Все `<iframe>` имеют `sandbox` где возможно
- [ ] Нет `dangerouslySetInnerHTML` с пользовательским вводом

```bash
grep -rEn 'dangerouslySetInnerHTML|<iframe' \
  --include='*.jsx' src/
```

### 7. POST на CRM API — минимизация данных

В `ContactModal`, `FinalCTA`, `Integrations` форма шлёт в `saveLead`:

```js
{ name, contact, contact_type, source_block }
```

Чеклист:
- [ ] Не шлются полные UA, geolocation, IP — это собирает бэк сам
- [ ] Не шлются содержимое других форм / страниц
- [ ] Email/телефон не логируются в `console.log`

### 8. Зависимости

```bash
npm audit --omit=dev          # только prod-deps
npm outdated                  # что устарело
```

- [ ] Нет high/critical в `npm audit`
- [ ] React 18.x, Vite 6.x, RR 6.x — мажорные апдейты без необходимости не делать

### 9. Demo CRM (`public/demo/`)

Это вшитая сборка CRM с `VITE_DEMO=1` — мок-API, без реального бэка.
Проверки:
- [ ] В моках нет реальных контактов / email / телефонов клиентов
- [ ] Нет JWT_SECRET / DATABASE_URL в `public/demo/`
- [ ] Demo не делает реальных запросов на `api.aivisionpro.ru`
  (`grep -r 'api\.aivisionpro' public/demo/` → пусто)

---

## Чеклист перед прод-деплоем

- [ ] `npm audit` чисто (high/critical)
- [ ] `git ls-files | grep -E '\.env$|secrets|\.pem$|\.key$'` → пусто
- [ ] Грэп секретов в `src/` и `dist/` → пусто
- [ ] HTTPS + HSTS активны на `aivisionpro.ru`
- [ ] Согласие на ПД работает (чекбокс блокирует сабмит)
- [ ] `/privacy-policy` и `/consent` доступны
- [ ] localStorage не пишет персональные данные
- [ ] Mixed content нет (DevTools → Security tab)
- [ ] Demo (`public/demo/`) не утекает реальные данные

---

## Формат отчёта

```
🔒 Security Review — AIVISION Landing
Дата: YYYY-MM-DD
Ветка: dev / main
Билд: <SHA>

✅ ПРОЙДЕНО:
- [...]

⚠️ ПРЕДУПРЕЖДЕНИЯ (не блокеры, но желательно поправить):
- [...]

❌ БЛОКЕРЫ (нельзя в прод):
- [...]

Рекомендации:
1. [...]
```
