---
name: aivision-frontend
description: >
  Разработка статического лендинга AIVISION (aivisionpro.ru).
  React 18 + Vite 6 + Tailwind 3 + React Router 6 + react-helmet-async,
  без бэка/БД/auth. Используй при любой работе с UI лендинга: секции v2,
  страницы кейсов, формы, модалки, трекинг кликов, SEO-теги.
  Триггерится на: «секция», «блок лендинга», «hero», «кейс», «страница»,
  «форма заявки», «модалка», «навбар», «футер», «дашборд-слайды»,
  «компонент», «React», «UI», «вёрстка», «адаптив», «трекинг», «UTM»,
  «SEO», «Helmet», «meta-теги».
---

> **СТЕК ОБНОВЛЁН (2026-05): Astro 5 SSG + React-islands.** Source of truth — `CLAUDE.md` в корне репо. Старые упоминания React Router / react-helmet-async / `App.jsx` / `main.jsx` ниже могут быть устаревшими — миграция закрыта в `feat/astro-migration` (PR #5, merged в main).

# AIVISION Landing — React + Vite

Ты пишешь статический лендинг AIVISION.
Стек: React 18 + Vite 6 + Tailwind + React Router + react-helmet-async.
Бэка нет — только статика. API-вызовы (трекинг, заявки) идут на отдельный
CRM-бэкенд через `PUBLIC_API_URL`.

---

## Стек и инструменты

```
Framework:  React 18
Build:      Vite 6
Router:     react-router-dom v6
Styles:     Tailwind CSS 3 + @layer components (vшитый HTML-референс v2)
Geometry:   clip-path: polygon(...) для chamfer (НЕ border-radius)
Icons:      Lucide React (stroke, обычно size 20)
SEO:        react-helmet-async (HelmetProvider в main.jsx)
HTTP:       fetch (нативный) — для трекинга и форм
```

**Не используем:**
- Backend / API endpoints — только статика, билд в `dist/`
- TypeScript
- TanStack Query — оверкилл для лендинга
- zod — валидацию форм вручную (минимум полей)
- Redux / Zustand
- Next.js — Vite SPA достаточно
- Axios — нативный fetch
- UI-киты — Tailwind utility-first + кастомные классы

**Env переменные:** `import.meta.env.PUBLIC_*` (Vite, не CRA).

---

## Структура (см. CLAUDE.md в корне для актуальной картины)

```
src/
├── App.jsx                          роутер + глобальный click-tracker
├── main.jsx                         entry, оборачивает в <HelmetProvider>
├── index.css                        Tailwind base + полный CSS реф в @layer components
│                                    (вшиты медиа ≤768px и ≤380px, italic disabled)
├── pages/
│   ├── Landing.jsx                  главная — композиция 12 v2-секций + ContactModal
│   ├── CasePage.jsx                 карточка кейса (по :id)
│   ├── PrivacyPolicy.jsx
│   └── Consent.jsx
├── components/
│   ├── landing/
│   │   ├── ContactModal.jsx                  модалка диагностики, шлёт saveLead
│   │   ├── ContactToggleInput.jsx            переключатель TG/Телефон
│   │   ├── DashboardSlider.jsx               универсальный слайдер (variant=...)
│   │   └── v2/                               ★ актуальная архитектура секций
│   │       ├── Navbar.jsx                    внутри Hero, абсолютный
│   │       ├── Hero.jsx                      #01 brand
│   │       ├── Problem.jsx                   #02 light
│   │       ├── Solution.jsx                  #03 dark
│   │       ├── Advantages.jsx                #04 light, collapsible body
│   │       ├── Platform.jsx                  #05 dark + slider variant="platform"
│   │       ├── Customization.jsx             #06 light
│   │       ├── Integrations.jsx              #07 light, чипы → форма
│   │       ├── HowWeWork.jsx                 #08 dark
│   │       ├── Difference.jsx                #09 light
│   │       ├── Cases.jsx                     #10 light, из data/cases.js
│   │       ├── FinalCTA.jsx                  #11 dark, inline-форма (saveLead напрямую)
│   │       ├── StickyCta.jsx                 sticky-бар
│   │       └── Footer.jsx
│   └── ui/
│       └── Btn (используется в ContactModal + CasePage)
├── lib/
│   ├── tracker.js                   visitor/session/click/saveLead → CRM API
│   ├── seo.js                       SEO.<route> объекты (title/description/url)
│   ├── ErrorBoundary.jsx            обёртка в App.jsx
│   └── PageNotFound.jsx
├── data/
│   ├── cases.js                     3 кейса для CasePage
│   └── dashboard-slides.jsx         SLIDER_VARIANTS (finance/crm/ecommerce/platform)
└── config/
    └── brand.js                     (legacy, не используется компонентами v2)
```

---

## Ключевые паттерны

### Создание новой секции v2

1. Файл: `src/components/landing/v2/<Name>.jsx`
2. Утилитные классы Tailwind + кастомные классы из `@layer components` в `index.css`
3. Включить в `src/pages/Landing.jsx` в правильное место композиции
4. Если есть CTA — `data-track` атрибуты + проброс `onOpenContact` из Landing если нужна модалка

```jsx
import { ArrowRight } from 'lucide-react';

export default function MySection({ onOpenContact }) {
  return (
    <section className="my-section">
      <div className="container">
        <div className="eyebrow">Подзаголовок</div>
        <h2 className="section-title">Заголовок секции</h2>
        <p className="section-lead">Лид-текст под заголовком.</p>

        <button
          className="btn-brand"
          data-track="mysection-cta"
          data-track-block="mysection"
          data-track-text="Начать диагностику"
          onClick={onOpenContact}
        >
          Начать диагностику <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}
```

### Трекинг (data-track атрибуты)

Глобальный обработчик в `App.jsx` ловит клик по любому `[data-track]` и
вызывает `trackClick(text, id, block)` из `lib/tracker.js`.

```jsx
<a
  data-track="footer-tg"
  data-track-block="footer"
  data-track-text="Telegram"
  href="https://t.me/aivisionpro"
>
  Telegram
</a>
```

Дополнительно есть `initTracker()` в `Landing.jsx` (визит, сессия, UTM).

### Inline-форма (FinalCTA / Integrations)

Шлёт лид НАПРЯМУЮ через `saveLead`, не открывает ContactModal:

```jsx
import { saveLead } from '@/lib/tracker';

async function submit(e) {
  e.preventDefault();
  if (!name.trim() || !contact.trim()) return setError('Заполни поля');
  setLoading(true);
  try {
    await saveLead({ name, contact, contact_type, source_block: 'final-cta' });
    setSent(true);  // успех: «Свяжемся в течение 5 минут»
  } catch (err) {
    setError('Не удалось отправить');
  } finally {
    setLoading(false);
  }
}
```

### ContactModal (диагностика)

Общая модалка для кнопок в навбаре, hero, sticky. Получает `open`,
`onClose`, `source` (для аналитики откуда вызвана), `initial`. Внутри —
форма с `ContactToggleInput` (TG/Телефон), валидация вручную, чекбокс
согласия со ссылкой на `/consent`. После сабмита — success-блок с
предложением открыть демо `/demo/`.

### Динамическая страница кейса

`/case/:id` → `CasePage.jsx` берёт данные из `data/cases.js` по id.
Использует `DashboardSlider` с variant соответствующим кейсу
(`finance`/`crm`/`ecommerce`). SEO теги через `SEO.case1`, `case2`, `case3`.

### SEO через react-helmet-async

`main.jsx` оборачивает приложение в `<HelmetProvider>`. На каждой странице:

```jsx
import { Helmet } from 'react-helmet-async';
import { SEO } from '@/lib/seo';

<Helmet>
  <html lang="ru" />
  <title>{SEO.home.title}</title>
  <meta name="description" content={SEO.home.description} />
  <link rel="canonical" href={SEO.home.url} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={SEO.home.title} />
  <meta property="og:description" content={SEO.home.description} />
  <meta property="og:url" content={SEO.home.url} />
  <meta property="og:site_name" content="AIVISION" />
  <meta property="og:locale" content="ru_RU" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={SEO.home.title} />
  <meta name="twitter:description" content={SEO.home.description} />
</Helmet>
```

**Важно для SEO**: Helmet рендерит теги в браузере. Для нормальной
индексации Google и шеринга в Telegram нужен **пререндер на билде**
(или статичные fallback-мета в `index.html`). См. CLAUDE.md / SEO-задачу.

---

## Стили — AIVISION v2

### Геометрия chamfer

```css
.btn-brand {
  background: var(--brand);
  color: #fff;
  padding: 14px 22px;
  font-weight: 600;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
}
```

**Запрещено:**
- `border-radius` на элементах с `clip-path`
- `border` + `clip-path` (даёт «крюк» по диагонали). Альтернатива:
  `box-shadow: inset 0 0 0 1px <color>` или двухслойная обёртка
  (см. `.sticky-cta-demo` + `.sticky-cta-demo-inner`)
- `italic` (`em, i, cite, address { font-style: normal }` глобально)
- Любой акцент кроме `var(--brand)` `#3F6EE8`

### Цвета

```css
--brand: #3F6EE8;
--bg-dark: #0A0A0A;
--bg-light: #F4F4F5;
--text: #0A0A0A;
--muted: #6B7280;
```

См. `aivision-design-system` скилл для полной палитры.

### Адаптив

Mobile-first. Tailwind breakpoints (`sm md lg xl`) + кастомные media
для `@media (max-width: 768px)` и `@media (max-width: 380px)` в
`@layer components` (важные правки геометрии вручную, не Tailwind).

---

## Принципы кода

- Компонент до 200 строк — больше декомпозируй
- Один компонент = один файл
- Hooks в отдельные файлы только если переиспользуются
- Контент (>5 элементов одного типа) — выноси в `src/data/`
- Loading/error states обязательны для async (форма, fetch)
- Accessibility: семантический HTML, `aria-label` на иконочных кнопках,
  фокус видим
- Адаптив проверять руками на 768 и 380

---

## Что НЕ делаем

- НЕ создаём бэкенд внутри лендинга — все запросы идут в CRM API
- НЕ хранить пользовательские данные в localStorage кроме `aivision_visitor_id`
  (трекинг)
- НЕ добавлять TanStack/zod/state-libs — нет повода
- НЕ копировать UI из CRM целиком — лендинг и CRM имеют разную плотность
- НЕ править файлы в `public/demo/` руками — артефакт билда CRM,
  перезатрётся следующим `sync-demo.sh`
- НЕ делать fetch на относительные пути — всегда через `PUBLIC_API_URL`
- НЕ использовать `border` + `clip-path` вместе
- НЕ использовать italic
