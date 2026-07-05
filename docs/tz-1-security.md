# ТЗ #1 — Безопасность форм и лидов

**Контекст:** сайт `/Users/cyclonecenter7/Desktop/Code/AIVISION WEB/` шлёт лиды в CRM-бэк. Сейчас формы могут молча терять заявки (бэк ответил 500, юзер видит "Заявка принята"), `Math.random()` коллизии в visitor_id, нет защиты от ботов, нет client-side валидации.

**Worktrees:**
- Сайт: `/Users/cyclonecenter7/Desktop/Code/AIVISION WEB/`
- CRM бэк: `/Users/cyclonecenter7/Desktop/Code/AIVISION CRM/.claude/worktrees/brave-blackburn-9dfeab/`

**Скоуп:** 7 задач (4 на сайте + 3 на бэке CRM). Сайт и бэк должны деплоиться вместе (honeypot работает только если обе стороны согласованы).

**Билд:** site `npm run build` exit 0; CRM `npm test` все зелёные.

---

## 🌐 Site Task 1.1 — `saveLead` обработка ошибок

**Файл:** `src/lib/tracker.js` (функция `saveLead`)

**Сейчас:**
```js
export async function saveLead({ name, contact, contact_type, source_block }) {
  const tracking = getTrackingData();
  const res = await fetch(`${API_BASE}/api/leads`, { ... });
  const data = await res.json();
  return data.lead || data;  // ← НЕ проверяет res.ok
}
```

Если бэк вернул 500/429/CORS-error → `data` = `{error: '...'}` → `data.lead || data` = объект с error → форма всё равно показывает "Заявка принята ✓". **Лиды теряются молча.**

**Сделать:**
```js
export async function saveLead({ name, contact, contact_type, source_block }) {
  const tracking = getTrackingData();
  let res;
  try {
    res = await fetch(`${API_BASE}/api/leads`, { ... });
  } catch (netErr) {
    throw new Error('Нет связи. Проверь интернет и попробуй снова.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Ошибка сервера (${res.status}). Попробуй снова.`);
  }
  return data.lead || data;
}
```

**Acceptance:**
- В DevTools заблокировать `/api/leads` (Network → Block) → отправить форму → юзер видит конкретную ошибку, НЕ "Заявка принята"
- Бэк вернул 429 → юзер видит "Слишком много попыток"

---

## 🌐 Site Task 1.2 — `crypto.randomUUID()`

**Файл:** `src/lib/tracker.js` (функция `generateUUID`)

**Сейчас:** `Math.random()` based UUID — коллизии возможны.

**Сделать:**
```js
function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // fallback для совсем старых браузеров (можно удалить, поддержка >= 95% сейчас)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0]) % 16;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}
```

**Acceptance:**
- В DevTools console: `localStorage.removeItem('aivision_visitor_id'); location.reload()` → новый UUID — копируешь, повторяешь 100 раз скриптом → 0 повторений

---

## 🌐 Site Task 1.3 — Honeypot field в формах

**Файлы:**
- `src/components/landing/ContactModal.jsx`
- `src/components/landing/StarterBanner.jsx`
- (опц) `src/components/landing/ComparisonWithForm.jsx` — если есть форма

**Сделать:** добавить скрытое поле `website` с CSS-скрытием (не `display:none` — некоторые боты это игнорят):

```jsx
<input
  type="text"
  name="website"
  value={form.website || ''}
  onChange={e => setForm({ ...form, website: e.target.value })}
  tabIndex={-1}
  autoComplete="off"
  style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
  aria-hidden="true"
/>
```

В `handleSubmit`:
```js
if (form.website) {
  // honeypot triggered, fake success silently
  setSent(true);
  return;
}
```

И передавать `website` в saveLead → бэк (см. CRM Task 1.5).

**Acceptance:**
- В DevTools заполнить `<input name="website">` → отправить → видишь "успех" но ничего на бэке не появилось

---

## 🌐 Site Task 1.4 — Client-side валидация

**Файлы:** `ContactModal.jsx`, `StarterBanner.jsx`, `ComparisonWithForm.jsx`

**Сделать:** в `handleSubmit` до `saveLead`:

```js
const name = form.name.trim();
const contact = form.contact.trim();

if (name.length < 2 || name.length > 100) {
  setError('Имя 2-100 символов');
  setLoading(false);
  return;
}
if (contact.length < 3 || contact.length > 100) {
  setError('Контакт 3-100 символов');
  setLoading(false);
  return;
}
// Phone: + и 10-15 цифр; Telegram: @ и 5-32 символа
const isPhone = /^\+\d{10,15}$/.test(contact.replace(/\s|-/g, ''));
const isTg    = /^@?[a-zA-Z0-9_]{5,32}$/.test(contact);
if (!isPhone && !isTg) {
  setError('Введи телефон (+7...) или telegram (@username)');
  setLoading(false);
  return;
}
```

**Acceptance:**
- Пустое имя → инлайн ошибка, форма не отправляется
- "asdf" в контакт → ошибка "введи телефон или telegram"
- Корректные данные → отправка идёт

---

## 🟦 CRM-BACKEND Task 1.5 — Honeypot reject

**Файл:** `backend/routes/leads.js` (handler `POST /leads`)

**Сделать:** в начале handler, до валидации:
```js
if (req.body.website || req.body.url) {
  // Honeypot triggered. Return 200 silently — don't tell the bot.
  return res.json({ ok: true, lead: { id: 0 } });
}
```

**Acceptance:**
- `curl -X POST .../api/leads -d '{"name":"X","contact":"+79991234567","contact_type":"phone","website":"http://spam"}'` → 200 ok но в БД `SELECT COUNT(*) FROM leads` не увеличивается

---

## 🟦 CRM-BACKEND Task 1.6 — UUID валидация

**Файл:** `backend/services/analytics.js`

**Сделать:** в начале `recordVisitor`, `recordSession`, `recordClick` добавить:
```js
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function assertUUID(value, field) {
  if (!UUID_RE.test(String(value || ''))) {
    throw new ValidationError(`Invalid ${field}`);
  }
}
```

В каждой функции:
```js
export async function recordVisitor(payload) {
  assertUUID(payload.visitor_id, 'visitor_id');
  // ... rest
}

export async function recordClick(payload) {
  assertUUID(payload.visitor_id, 'visitor_id');
  assertUUID(payload.session_id, 'session_id');
  // ... rest
}
```

Импорт `ValidationError` из `services/errors.js`.

**Acceptance:**
- `curl -X POST .../api/clicks -d '{"visitor_id":"hello","session_id":"foo"}'` → 400 `{error: "Invalid visitor_id"}`
- Реальный UUID v4 → 200 ok

---

## 🟦 CRM-BACKEND Task 1.7 — CORS проверка

**Файл:** `backend/.env` (на сервере)

**Сделать:** убедиться что `ALLOWED_ORIGINS` содержит домен сайта:
```
ALLOWED_ORIGINS=https://aivisionpro.ru,https://admin.aivisionpro.ru
```

Если нет — добавить и перезапустить PM2. Документировать в `backend/.env.example` (там уже есть пример).

**Acceptance:**
- `curl -H "Origin: https://aivisionpro.ru" -I .../api/leads` → ответ содержит `Access-Control-Allow-Origin: https://aivisionpro.ru`

---

## 🟦 CRM-BACKEND Task 1.8 — Заменить `Math.random()` на `crypto.randomUUID()` в backfill миграции

**Файл:** `backend/db.js` (строка ~287, в backfill checklist groups)

**Сейчас:**
```js
const groupId = `chkgrp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
```

`Math.random()` не криптостойкий — теоретически коллизии возможны.

**Сделать:** в начале файла добавить импорт:
```js
import { randomUUID } from 'crypto';
```

Заменить:
```js
const groupId = `chkgrp_${Date.now()}_${randomUUID().slice(0, 8)}`;
```

**Acceptance:**
- `grep -n "Math.random" backend/db.js` → 0 hits
- Тесты `npm test` зелёные

---

## Промпт для Sonnet

```
ТЗ: /Users/cyclonecenter7/Desktop/Code/AIVISION WEB/docs/tz-1-security.md

Выполни 8 задач (Site Task 1.1-1.4 + CRM-BACKEND Task 1.5-1.8).

Файлы:
- Сайт: /Users/cyclonecenter7/Desktop/Code/AIVISION WEB/src/
- CRM бэк: /Users/cyclonecenter7/Desktop/Code/AIVISION CRM/.claude/worktrees/brave-blackburn-9dfeab/backend/

Каждая задача помечена 🌐 (сайт) или 🟦 (CRM-бэк) — работай в соответствующей папке.

Constraints:
- Не трогать архитектуру / data flow вне scope
- После: site `npm run build` exit 0; CRM `npm test` все зелёные
- Site и CRM коммитить отдельно (разные репо/ветки)

Reply под 300 слов: список изменённых файлов, статус каждой задачи (✅/⚠️/❌), exit codes.
```

## Финальный коммит

**Сайт:** `feat(security): form error handling, crypto UUID, honeypot, client validation`
**CRM-бэк:** `feat(security): honeypot reject + UUID validation + crypto.randomUUID in migration`
