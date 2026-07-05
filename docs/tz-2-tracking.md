# ТЗ #2 — Трекинг кликов end-to-end

**Контекст:** сейчас `trackClick()` зовётся только в `Hero.jsx:46` — **трекается 3% кликов из 66**. 97% теряется. Нужно автотрекинг через `data-track` атрибут + бэк CRM расширить чтобы понимать `source_block`.

**Worktrees:**
- Сайт: `/Users/cyclonecenter7/Desktop/Code/AIVISION WEB/`
- CRM бэк: `/Users/cyclonecenter7/Desktop/Code/AIVISION CRM/.claude/worktrees/brave-blackburn-9dfeab/`

**Зависимость:** **TЗ #1 (security) лучше выполнить первым**, чтоб формы работали корректно — иначе невозможно проверить conversion rate.

**Билд:** site `npm run build` exit 0; CRM `npm test` все зелёные.

---

## 🟦 CRM-BACKEND Task 2.1 — `source_block` в clicks таблице

**Файлы:**
- `backend/init.sql` — для свежих установок
- `backend/db.js` — миграция в `initDB()` для уже-существующих БД

**Сделать в `init.sql`:**
```sql
CREATE TABLE IF NOT EXISTS clicks (
  id           SERIAL PRIMARY KEY,
  visitor_id   VARCHAR(255),
  session_id   VARCHAR(255),
  element_id   VARCHAR(255),
  element_text TEXT,
  page_url     TEXT,
  source_block VARCHAR(50),         -- ← новое
  created_date TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_clicks_element_block ON clicks(element_id, source_block);
```

**Сделать в `db.js initDB()`** (внутри advisory lock, через `client.query`):
```js
await client.query(`ALTER TABLE clicks ADD COLUMN IF NOT EXISTS source_block VARCHAR(50)`);
await client.query(`CREATE INDEX IF NOT EXISTS idx_clicks_element_block ON clicks(element_id, source_block)`);
```

**Acceptance:**
- Перезапустить бэк → `SELECT column_name FROM information_schema.columns WHERE table_name='clicks'` содержит `source_block`

---

## 🟦 CRM-BACKEND Task 2.2 — `recordClick` принимает `source_block`

**Файл:** `backend/services/analytics.js` (функция `recordClick`)

**Сделать:**
```js
export async function recordClick(payload) {
  assertUUID(payload.visitor_id, 'visitor_id');     // из ТЗ #1
  assertUUID(payload.session_id, 'session_id');
  const { visitor_id, session_id, element_id, element_text, page_url, source_block } = payload;
  await pool.query(
    `INSERT INTO clicks (visitor_id, session_id, element_id, element_text, page_url, source_block)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [visitor_id, session_id, element_id, element_text, page_url, source_block || null]
  );
}
```

**Acceptance:**
- POST `/api/clicks` с `source_block: 'hero'` → строка в БД с `source_block='hero'`

---

## 🟦 CRM-BACKEND Task 2.3 — `getClicks` GROUP BY element_id

**Файл:** `backend/services/analytics.js` (функция `getClicks`)

**Сейчас** `GROUP BY element_id, element_text` — если текст кнопки изменили на сайте, агрегация считает их разными.

**Сделать:**
```js
export async function getClicks({ from, to, days = 30 }) {
  const { fromDate, toDate } = dateRange(from, to, days);
  const result = await pool.query(
    `SELECT element_id,
            source_block,
            (array_agg(element_text ORDER BY created_date DESC))[1] AS element_text,
            COUNT(*) AS clicks
     FROM clicks
     WHERE created_date >= $1 AND created_date <= $2
     GROUP BY element_id, source_block
     ORDER BY clicks DESC LIMIT 50`,
    [fromDate, toDate]
  );
  return result.rows;
}
```

Лимит 20→50 чтоб больше блоков попадало в дашборд.

**Acceptance:**
- 5 кликов с element_id=`hero_cta`, текст менялся 2 раза → агрегация: 1 строка, count=5, текст последний

---

## 🌐 Site Task 2.4 — Auto-tracking listener

**Файл:** `src/App.jsx` (или `src/main.jsx`)

**Сделать:** добавить useEffect с глобальным listener:
```jsx
import { useEffect } from 'react';
import { trackClick } from '@/lib/tracker';

function App() {
  useEffect(() => {
    const handler = (e) => {
      const el = e.target.closest('[data-track]');
      if (!el) return;
      const id = el.dataset.track;
      const block = el.dataset.trackBlock || '';
      const text = el.dataset.trackText || el.textContent?.trim() || '';
      trackClick(text, id, block);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return ( /* existing JSX */ );
}
```

**Acceptance:**
- Кликнуть на любой `<button data-track="x" data-track-block="y">` → в Network вкладке POST /api/clicks с `source_block: 'y'`
- Кликнуть на кнопку без `data-track` → ничего не шлётся

---

## 🌐 Site Task 2.5 — `trackClick` через `sendBeacon`

**Файл:** `src/lib/tracker.js` (функция `trackClick`)

**Сейчас** `await fetch(...)` — если юзер кликает на ссылку и страница начала уходить, fetch не успевает. **Клики на навигацию теряются.**

**Сделать:**
```js
export function trackClick(element_text, element_id = '', source_block = '') {
  const { visitor_id, session_id } = getTrackingData();
  const payload = JSON.stringify({
    visitor_id, session_id, element_id, element_text, page_url: window.location.href, source_block,
  });

  // sendBeacon гарантирует доставку даже при unload навигации
  if (navigator.sendBeacon) {
    const blob = new Blob([payload], { type: 'application/json' });
    if (navigator.sendBeacon(`${API_BASE}/api/clicks`, blob)) return;
  }
  // Fallback на fetch с keepalive
  fetch(`${API_BASE}/api/clicks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => {});
}
```

Функция теперь синхронная (не async) — sendBeacon не возвращает Promise.

**Acceptance:**
- Клик на `<a href="https://google.com" data-track="external">` → в Network видно POST /api/clicks даже если страница уходит

---

## 🌐 Site Task 2.6 — Дописать `data-track` атрибуты на 66 кнопок

**Файлы (8 штук, total 66 кнопок):**

| Файл | Кнопок | Примеры `data-track` ID |
|---|---|---|
| `src/components/landing/Navbar.jsx` | 12 | `nav_logo`, `nav_home`, `nav_products`, `nav_cases`, `nav_pricing`, `nav_contact`, `nav_cta_top`, `mobile_menu_toggle`, и т.д. |
| `src/components/landing/Hero.jsx` | 2 | `hero_cta` (✅ уже есть), `hero_secondary` |
| `src/components/landing/StarterBanner.jsx` | 8 | `banner_open`, `banner_close`, `banner_modal_close`, `banner_submit`, и т.д. |
| `src/components/landing/ContactModal.jsx` | 5 | `modal_close`, `modal_overlay_close`, `modal_submit`, `modal_toggle_phone`, `modal_toggle_tg` |
| `src/components/landing/HeroDashboard.jsx` | 4 | `hero_dashboard_tab1`, `hero_dashboard_tab2`, и т.д. |
| `src/components/landing/Integrations.jsx` | 3 | `integration_amocrm`, `integration_bitrix`, и т.д. |
| `src/components/landing/Footer.jsx` | 2 | `footer_email`, `footer_telegram` |
| `src/components/landing/Cases.jsx` | 2 | `case_card_1`, `case_card_2`, `case_card_3` |
| `src/components/landing/Products.jsx` | 2 | `product_card_X` |

**Шаблон правки:**
```jsx
// Было:
<button onClick={() => setModal(true)}>Связаться</button>

// Стало:
<button
  data-track="hero_cta"
  data-track-block="hero"
  onClick={() => setModal(true)}
>
  Связаться
</button>
```

`data-track-block` значения: `hero`, `navbar`, `products`, `cases`, `integrations`, `starter_banner`, `contact_modal`, `hero_dashboard`, `footer`.

**Удалить старый явный `trackClick` в `Hero.jsx:46`** — больше не нужен, listener сам поймает через `data-track`.

**Acceptance:**
- `grep -rn "data-track=" src/components/landing/ src/pages/ --include="*.jsx" | wc -l` → 66+ совпадений
- В прод (или локально) кликнуть в каждый блок → в Network 66 разных POST /api/clicks с разными source_block

---

## Промпт для Sonnet

```
ТЗ: /Users/cyclonecenter7/Desktop/Code/AIVISION WEB/docs/tz-2-tracking.md

Выполни 6 задач (CRM Task 2.1-2.3 + Site Task 2.4-2.6).

Зависит от ТЗ #1 (security) — должен быть выполнен первым (assertUUID использует UUID validation из ТЗ #1).

Файлы:
- Сайт: /Users/cyclonecenter7/Desktop/Code/AIVISION WEB/src/
- CRM бэк: /Users/cyclonecenter7/Desktop/Code/AIVISION CRM/.claude/worktrees/brave-blackburn-9dfeab/backend/

Каждая задача помечена 🌐 (сайт) или 🟦 (CRM-бэк).

Порядок:
1. CRM Task 2.1 (миграция БД) → 2.2 (recordClick) → 2.3 (getClicks)
2. Site Task 2.4 (auto-listener) → 2.5 (sendBeacon) → 2.6 (66 атрибутов)

Constraints:
- НЕ трогать архитектуру вне scope
- После: site `npm run build` exit 0; CRM `npm test` зелёные
- Site и CRM коммитить отдельно

Reply под 300 слов: список файлов, статус каждой задачи, exit codes, итоговое количество `data-track` атрибутов.
```

## Финальный коммит

**CRM-бэк:** `feat(analytics): source_block in clicks + improved aggregation`
**Сайт:** `feat(tracking): auto-track via data-track attributes + sendBeacon for reliability`
