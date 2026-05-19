---
name: aivision-frontend
description: >
  Разработка статического лендинга AIVISION (aivisionpro.ru).
  React 18 + Vite 6 + Tailwind 3 + React Router 6, без бэка/БД/auth.
  Используй при любой работе с UI лендинга: секции, страницы кейсов,
  формы, модалки, трекинг кликов.
  Триггерится на: «секция», «блок лендинга», «hero», «кейс», «страница»,
  «форма заявки», «модалка», «навбар», «футер», «дашборд-слайды»,
  «компонент», «React», «UI», «вёрстка», «адаптив», «трекинг», «UTM».
---

# AIVISION Landing — React + Vite

Ты пишешь статический лендинг AIVISION.
Стек: React 18 + Vite 6 + Tailwind + React Router. Бэка нет — только статика.
API-вызовы (трекинг, заявки) идут на отдельный CRM-бэкенд через `VITE_API_URL`.

---

## Стек и инструменты

```
Framework:  React 18
Build:      Vite 6
Router:     react-router-dom v6
Styles:     Tailwind CSS 3
Icons:      Lucide React
HTTP:       fetch (нативный) — только для трекинга и форм
```

**Не используем:**
- Backend / API endpoints — только статика, билд в `dist/`
- TypeScript
- TanStack Query — оверкилл для лендинга
- zod — валидацию форм делаем вручную (минимум полей)
- Redux / Zustand
- Next.js — Vite SPA достаточно
- Axios — нативный fetch

**Env переменные:** `import.meta.env.VITE_*` (Vite, не CRA).

---

## Структура (см. `CLAUDE.md` в корне)

```
src/
├── App.jsx                       роутер + глобальный click-tracker
├── main.jsx                      entry
├── index.css                     Tailwind base
├── pages/                        4 страницы
│   ├── Landing.jsx               главная — собирает все секции
│   ├── CasePage.jsx              страница кейса (динамическая по slug)
│   ├── PrivacyPolicy.jsx         152-ФЗ
│   └── Consent.jsx               согласие на обработку ПД
├── components/
│   ├── landing/                  секции лендинга (Hero, Problem, Cases, ...)
│   └── ui/                       примитивы (Btn, Section, Eyebrow, ClipCard)
├── lib/
│   ├── tracker.js                visitor/session/click → CRM API
│   └── PageNotFound.jsx          404
├── data/
│   ├── cases.js                  массив кейсов для CasePage
│   └── dashboard-slides.jsx      контент HeroDashboard слайдера
└── config/brand.js               брендовые константы
```

---

## Основные паттерны

### Трекинг клика (data-track атрибуты)

```jsx
<button
  data-track="hero-cta-primary"
  data-track-block="hero"
  data-track-text="Получить диагностику"
  className="..."
  onClick={openContactModal}
>
  Получить диагностику
</button>
```

Глобальный обработчик в `App.jsx` ловит клик по любому `[data-track]` и
вызывает `trackClick(text, id, block)` из `lib/tracker.js`.

### Секция лендинга

Каждая секция = свой файл в `components/landing/`. Принципы:
- Один файл = одна секция (Hero.jsx, Problem.jsx, Cases.jsx, ...)
- Используй `<Section>` обёртку из `ui/` для общих отступов/контейнера
- Используй `<Eyebrow>` для маленького заголовка-метки сверху
- Tailwind utility-классы, без отдельных CSS-файлов
- Контент-данные (списки кейсов, бенефитов) — в `src/data/` если массив >5 элементов

### Форма заявки (ContactModal)

Минимум валидации руками — без zod. Поля: имя, контакт (телефон/email/telegram),
выбор канала через `ContactToggleInput`. POST на `${VITE_API_URL}/api/leads`.
Согласие на обработку ПД — обязательный чекбокс со ссылкой на `/consent`.

```jsx
async function submit(e) {
  e.preventDefault();
  if (!name.trim()) return setError('Имя обязательно');
  if (!contact.trim()) return setError('Контакт обязателен');
  try {
    setLoading(true);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, contact, contact_type, source: 'landing' }),
    });
    if (!res.ok) throw new Error('Ошибка отправки');
    setSent(true);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}
```

### Динамическая страница кейса

`/cases/:slug` → `CasePage.jsx` берёт данные из `data/cases.js` по slug.
Если slug не найден → редирект на 404.

---

## Стили — AIVISION

Tailwind utility-first. Бренд-токены в `src/config/brand.js` и `tailwind.config.cjs`.

**Главные правила (см `aivision-design-system` скилл):**
- chamfer-углы (срезанные, не радиус)
- Inter — единственный шрифт
- акцент `#3F6EE8` — единственный цвет действия
- monotone-цвета на графиках/иконках
- никаких теней-блюров кроме hover на интерактив
- диагностический тон в текстах — без хайпа, без emoji

Если сомневаешься в дизайне — сначала смотри `components/ui/` и существующие секции,
копируй паттерн. Не придумывай.

---

## Принципы кода

- Компонент до 150 строк — больше декомпозируй на под-компоненты
- Один компонент = один файл
- Hooks в отдельные файлы только если переиспользуются
- Контент (>5 элементов одного типа) — выноси в `src/data/`
- Loading/error states обязательны для async (форма, картинки)
- Accessibility: семантический HTML, `aria-label` на иконочных кнопках, focus-видим
- Адаптив: mobile-first, breakpoints из Tailwind (`sm`, `md`, `lg`, `xl`)

---

## SEO / мета

- `index.html` — title, description, og-теги
- Каждая страница (`Landing`, `CasePage`, `PrivacyPolicy`, `Consent`) должна
  выставлять `document.title` через эффект если отличается от дефолта
- `robots.txt` и `sitemap.xml` в `public/`

---

## Что НЕ делаем

- НЕ создаём бэкенд внутри лендинга — все запросы идут в CRM API
- НЕ хранить пользовательские данные в localStorage кроме `aivision_visitor_id` (трекинг)
- НЕ добавлять TanStack/zod/state-libs — нет повода
- НЕ копировать UI из CRM целиком — лендинг и CRM имеют разную плотность интерфейса
