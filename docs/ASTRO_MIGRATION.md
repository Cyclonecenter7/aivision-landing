# Миграция AIVISION Landing на Astro — тезис

**Цель документа:** дать любой Claude Code сессии (или человеку) полный контекст
чтобы выполнить миграцию пошагово, без расхождения с задумкой.

**Дата составления:** 2026-05-20
**Статус:** план утверждён, ждём контент от партнёра + CF wildcard/API token

---

## 0. Контекст и зачем

### Что есть сейчас
- React 18 + Vite 6 SPA на `aivisionpro.ru`
- Деплой: GitHub Actions → vite build → rsync `dist/` на Timeweb VPS 85.239.51.8
- Две ветки: `dev` → `aivisiontest.ru`, `main` → `aivisionpro.ru`
- 12 v2-секций лендинга + 4 страницы (главная + 3 кейса + privacy + consent)
- ContactModal с формой заявки, шлёт `saveLead` на CRM-бэк `api.aivisionpro.ru`
- Tracker (visitor/session/click + UTM) → CRM-бэк
- Demo CRM в `public/demo/` (вшитая сборка CRM, синхронизируется `scripts/sync-demo.sh`)
- react-helmet-async для SEO-тегов (рендерится **на клиенте** — главная проблема)

### Что не работает
1. **SEO/шеринг сломаны.** `curl https://aivisionpro.ru/` отдаёт 508 байт пустого HTML с
   `<title>AIVISION</title>` и `<div id="root"></div>`. Helmet рендерит мета-теги уже
   в браузере. Telegram/VK/FB/LinkedIn не выполняют JS — видят пустоту. Google индексирует
   с задержкой ~неделю (вторая волна рендера) и часто неполно.
2. **OG-картинок нет** → шеринг в любой мессенджер = голый URL.
3. **JSON-LD нет** → нет rich snippet в Google.
4. **Verification meta нет** → не можем зарегистрировать сайт в Я.Вебмастере и Search Console.
5. **Аналитики нет** → слепы по органике и поведению.
6. **Lighthouse mobile** ~60 баллов (LCP > 3s из-за JS-only render).

### Цель миграции
- **Технически решить блокер SEO** (контент должен быть в исходном HTML)
- **Подготовить шаблон под массовое клонирование** для будущих клиентов
- **Поднять Lighthouse mobile до 95+** на каждом клоне
- **Не сломать ничего** из существующей бизнес-логики

### Почему Astro (не Vite-пререндер, не Next.js)
- **Vite-пререндер** = 1 день работы, но даёт technical debt при клонировании на 100 клиентов
  (puppeteer-зависимость в каждом репо, длинные билды). Окупится только при 1-3 клонах.
- **Next.js** = 2-3 недели работы. Переплата JS-бандла (Next runtime ~50 KB extra на каждой странице),
  оверкилл для статичных лендингов без серверной логики.
- **Astro** = 5-7 дней работы. Zero JS by default + islands для интерактива. Идеально под
  use-case «лендинг + шаблон для клонирования». Markdown-контент для кейсов позволит
  маркетологу править контент без касания JSX.

---

## 1. Что СОХРАНЯЕМ один-в-один

Это критический список — миграция не должна затронуть ни одну из этих вещей.

### Визуальное
- Все 12 v2-секций (Hero, Problem, Solution, Advantages, Platform, Customization,
  Integrations, HowWeWork, Difference, Cases, FinalCTA, StickyCta, Footer, Navbar)
- Дизайн-система v2: chamfer через `clip-path`, Inter, brand `#3F6EE8`, italic запрещён
- Все CSS-правила из `src/index.css` (`@layer components`, медиа ≤768px и ≤380px)
- Анимации, hover-эффекты, состояния
- Адаптив на всех брейкпоинтах
- Тексты лендинга (партнёр может прислать обновлённые отдельно)

### Бизнес-логика
- **Tracker** (`src/lib/tracker.js`) — visitor_id, session_id, UTM, clickTrack, saveLead
- **Глобальный click-handler** на `[data-track]` (`App.jsx` → переезжает в Layout)
- **ContactModal** — диагностика, с переключателем TG/Тел, чекбокс ПД
- **ContactToggleInput** — переключатель типа контакта
- **Inline-формы** (`FinalCTA`, `Integrations`) — шлют saveLead напрямую
- **DashboardSlider** — авто-переключение слайдов 8с, варианты finance/crm/ecommerce/platform
- **saveLead API** → `${VITE_API_URL}/api/leads` на CRM-бэк
- **Демо-CRM** в `public/demo/` — артефакт билда CRM, обновляется через `sync-demo.sh`
- **Demo gate / post-submit upsell** — после отправки формы предложение открыть `/demo/`
- **localStorage** только `aivision_visitor_id` (анонимный uuid)
- **152-ФЗ** — чекбокс согласия на каждой форме, страницы `/privacy-policy` и `/consent`

### Инфра
- Деплой на 85.239.51.8 через GitHub Actions + rsync
- Nginx раздаёт статику из `dist/`
- SSL Let's Encrypt
- Wildcard сертификат (после установки CF wildcard)

---

## 2. Что МЕНЯЕТСЯ (технически, не визуально)

| Слой | До | После |
|---|---|---|
| Framework | Vite 6 + React 18 SPA | Astro + React-islands |
| Роутинг | `react-router-dom v6` (client-side) | Astro file-based (SSG) |
| SEO теги | `react-helmet-async` (client) | Astro frontmatter (server, в HTML) |
| Кейсы (контент) | `src/data/cases.js` JS-массив | `src/content/cases/*.md` (Markdown collection) |
| Entry point | `src/main.jsx` | `src/pages/index.astro` |
| Глобальный shell | `App.jsx` (router + click-tracker) | `src/layouts/BaseLayout.astro` |
| Build команда | `vite build` | `astro build` (использует Vite внутри) |
| Bundle размер | ~150 KB JS | ~5-15 KB JS (только islands) |
| Lighthouse mobile | ~60 | ~95-100 (ожидание) |
| Скорость до первого экрана | ~2.5s | ~0.5s |

### Удаляются зависимости
- `react-router-dom` — больше не нужен, роутинг file-based
- `react-helmet-async` — больше не нужен, мета в frontmatter

### Добавляются зависимости
- `astro` (^5.x)
- `@astrojs/react` — интеграция React-компонентов
- `@astrojs/tailwind` — нативная Tailwind интеграция
- `@astrojs/mdx` — если кейсы пойдут как `.mdx` (для встроенных компонентов в Markdown)
- `@astrojs/sitemap` — авто-генерация sitemap.xml

### Сохраняются зависимости
- `react`, `react-dom` — для island-компонентов
- `lucide-react` — иконки
- `tailwindcss` — стили
- Все dev-зависимости (eslint, prettier, etc.)

---

## 3. Целевая структура `src/`

```
src/
├── layouts/
│   └── BaseLayout.astro              ← общий шаблон: <head>, <body>, Footer,
│                                        StickyCta, ContactModal, click-tracker
│
├── pages/                            ← file-based роуты Astro
│   ├── index.astro                   ← главная (композиция 12 секций)
│   ├── case/
│   │   └── [id].astro                ← динамическая страница кейса (SSG через getStaticPaths)
│   ├── privacy-policy.astro
│   └── consent.astro
│
├── components/
│   ├── v2/                           ← 14 v2-секций (как .astro или .jsx)
│   │   ├── Navbar.astro              ← статика → .astro
│   │   ├── Hero.astro
│   │   ├── Problem.astro
│   │   ├── Solution.astro
│   │   ├── Advantages.astro          ← collapsible body → может быть .jsx с client:visible
│   │   ├── Platform.astro            ← внутри DashboardSlider как island
│   │   ├── Customization.astro
│   │   ├── Integrations.astro        ← интерактивные чипы → .jsx client:load
│   │   ├── HowWeWork.astro
│   │   ├── Difference.astro
│   │   ├── Cases.astro
│   │   ├── FinalCTA.astro            ← внутри inline-форма как .jsx island
│   │   ├── StickyCta.astro           ← может .jsx если есть состояние scroll
│   │   └── Footer.astro
│   │
│   └── islands/                      ← интерактивные React-компоненты
│       ├── ContactModal.jsx          ← переезжает 1-в-1
│       ├── ContactToggleInput.jsx    ← переезжает 1-в-1
│       ├── DashboardSlider.jsx       ← переезжает 1-в-1
│       └── InlineLeadForm.jsx        ← извлечение из FinalCTA + Integrations
│
├── content/
│   ├── config.ts                     ← Astro content config (схема для cases collection)
│   └── cases/
│       ├── case-1.md                 ← кейс «Образование» в Markdown с frontmatter
│       ├── case-2.md                 ← кейс «Строительный 200 млн»
│       └── case-3.md                 ← кейс «Wildberries»
│
├── lib/
│   ├── tracker.js                    ← БЕЗ ИЗМЕНЕНИЙ
│   ├── seo.js                        ← остаётся как источник meta для всех страниц
│   └── jsonld.js                     ← НОВЫЙ — Organization + WebSite + BreadcrumbList schemas
│
├── data/
│   └── dashboard-slides.jsx          ← SLIDER_VARIANTS, без изменений
│
└── styles/
    └── global.css                    ← переезд из src/index.css (Tailwind + @layer components v2)
```

```
public/
├── og/                               ← НОВАЯ папка для OG-картинок (от партнёра)
│   ├── og-main.png                   ← 1200×630 PNG ≤ 300 КБ
│   ├── og-case-1.png
│   ├── og-case-2.png
│   └── og-case-3.png
├── demo/                             ← БЕЗ ИЗМЕНЕНИЙ (sync-demo.sh)
├── favicon.svg                       ← без изменений
├── logo-512.png                      ← НОВЫЙ (от партнёра, для JSON-LD)
├── robots.txt                        ← обновить (убрать /demo/)
└── (sitemap.xml авто-генерируется @astrojs/sitemap)
```

---

## 4. SEO Setup — детально

### BaseLayout.astro — что в `<head>`

```astro
---
// src/layouts/BaseLayout.astro
import { SEO } from '@/lib/seo';
import { organizationSchema, websiteSchema } from '@/lib/jsonld';

interface Props {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;       // дефолт /og/og-main.png
  ogType?: string;        // дефолт 'website'
  noindex?: boolean;      // для /privacy-policy и /consent
  jsonLd?: object[];      // дополнительные schemas для страницы
}

const {
  title,
  description,
  canonical,
  ogImage = '/og/og-main.png',
  ogType = 'website',
  noindex = false,
  jsonLd = [],
} = Astro.props;

const ogImageFull = canonical.replace(/\/$/, '') + ogImage;
const allSchemas = [organizationSchema, websiteSchema, ...jsonLd];
---

<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    {noindex && <meta name="robots" content="noindex, follow" />}

    <!-- OpenGraph -->
    <meta property="og:type" content={ogType} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={ogImageFull} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="ru_RU" />
    <meta property="og:site_name" content="AIVISION" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImageFull} />

    <!-- Verification (вписать когда придут от партнёра) -->
    <meta name="yandex-verification" content="<TODO>" />
    <meta name="google-site-verification" content="<TODO>" />

    <!-- Icons -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <!-- JSON-LD schemas -->
    {allSchemas.map((schema) => (
      <script type="application/ld+json" set:html={JSON.stringify(schema)} />
    ))}

    <!-- Preload critical font -->
    <link rel="preload" href="/fonts/Inter-Variable.woff2" as="font" type="font/woff2" crossorigin />

    <!-- Analytics (от партнёра) -->
    <!-- <YandexMetrika id="XXXXXXXX" /> -->
    <!-- <GA4 id="G-XXXXXXXXXX" /> -->
  </head>

  <body class="font-inter overflow-x-hidden">
    <slot />

    <!-- Global click-tracker — переезжает из App.jsx -->
    <script>
      import { initTracker, trackClick } from '@/lib/tracker';
      initTracker();
      document.addEventListener('click', (e) => {
        const el = (e.target as Element).closest('[data-track]');
        if (!el) return;
        const id = (el as HTMLElement).dataset.track || '';
        const block = (el as HTMLElement).dataset.trackBlock || '';
        const text = (el as HTMLElement).dataset.trackText || el.textContent?.trim() || '';
        trackClick(text, id, block);
      });
    </script>
  </body>
</html>
```

### src/lib/seo.js — расширенный

```js
// Каждая страница имеет полный набор полей
export const SEO = {
  home: {
    title: '...',          // от партнёра
    description: '...',    // от партнёра
    url: 'https://aivisionpro.ru',
    ogImage: '/og/og-main.png',
  },
  case1: {
    title: '...',
    description: '...',
    url: 'https://aivisionpro.ru/case/1',
    ogImage: '/og/og-case-1.png',
  },
  case2: { /* ... */ },
  case3: { /* ... */ },
  privacy: {
    title: 'Политика конфиденциальности — AIVISION',
    description: 'Политика обработки персональных данных в соответствии с 152-ФЗ.',
    url: 'https://aivisionpro.ru/privacy-policy',
    ogImage: '/og/og-main.png',
    noindex: true,
  },
  consent: {
    title: 'Согласие на обработку персональных данных — AIVISION',
    description: 'Согласие на обработку ПД при использовании сайта aivisionpro.ru.',
    url: 'https://aivisionpro.ru/consent',
    ogImage: '/og/og-main.png',
    noindex: true,
  },
};
```

### src/lib/jsonld.js — новый файл

```js
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://aivisionpro.ru/#organization',
  name: 'AIVISION',                       // от партнёра — может быть полное юр. имя
  legalName: '<TODO от партнёра>',
  url: 'https://aivisionpro.ru',
  logo: 'https://aivisionpro.ru/logo-512.png',
  email: '<TODO>',
  telephone: '<TODO опционально>',
  foundingDate: '<TODO>',
  description: '<TODO от партнёра — одной фразой о компании>',
  sameAs: [
    // соцсети — от партнёра
    // 'https://t.me/aivisionpro',
    // 'https://vk.com/aivisionpro',
    // 'https://linkedin.com/company/aivisionpro',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://aivisionpro.ru/#website',
  url: 'https://aivisionpro.ru',
  name: 'AIVISION',
  publisher: { '@id': 'https://aivisionpro.ru/#organization' },
  inLanguage: 'ru-RU',
};

// Для страницы кейса — динамически
export function caseSchema(caseData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseData.title,
    image: caseData.ogImage,
    datePublished: caseData.datePublished,
    author: { '@id': 'https://aivisionpro.ru/#organization' },
    publisher: { '@id': 'https://aivisionpro.ru/#organization' },
  };
}
```

### Sitemap

Использовать `@astrojs/sitemap` интеграцию — авто-генерирует `sitemap-index.xml`
для всех роутов кроме помеченных `noindex` (privacy, consent).

`astro.config.mjs`:
```js
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://aivisionpro.ru',
  integrations: [sitemap({
    filter: (page) => !page.includes('/privacy-policy') && !page.includes('/consent'),
  })],
});
```

### robots.txt — обновить

```
User-agent: *
Allow: /
Disallow: /demo/

Sitemap: https://aivisionpro.ru/sitemap-index.xml
```

---

## 5. Tracking — как переносим

### lib/tracker.js — без изменений
Файл копируется как есть. Функции `initTracker`, `trackClick`, `saveLead`, `getVisitorId` работают идентично.

### Глобальный click-handler
Переезжает из `App.jsx` в `<script>` блок в `BaseLayout.astro`. Это inline-скрипт Astro, который выполняется на каждой странице. Работает идентично текущему поведению.

### UTM-метки
Логика парсинга UTM из URL и сохранения в session — внутри `initTracker()`. Без изменений.

### Visitor ID
`localStorage.aivision_visitor_id` — без изменений. При первом визите создаётся uuid.

### saveLead
Внутри ContactModal и InlineLeadForm — компоненты импортируют `saveLead` из `lib/tracker.js`. Без изменений.

---

## 6. Кейсы как Markdown

Сейчас кейсы лежат в `src/data/cases.js` как JS-массив объектов. Переезжают в `src/content/cases/*.md`.

### Пример `src/content/cases/case-1.md`

```markdown
---
id: 1
slug: education-margin-27
title: Как образовательный бизнес поднял маржу на 27% за 30 дней
shortTitle: Маржа +27% за месяц
client: Образовательная компания
industry: Образование
revenue: 12 млн ₽/мес
ogImage: /og/og-case-1.png
datePublished: 2026-03-15
sliderVariant: finance
metrics:
  - label: Маржинальность
    value: '+27%'
    period: 'за 30 дней'
  - label: Расходы
    value: '−20%'
    period: 'за 30 дней'
  - label: Повторные продажи
    value: '+20%'
---

## Контекст

Выручка 12 млн ₽/мес. Маржа падала 4 месяца подряд.

## Что построили

- Управленческую систему с раздельным учётом по продуктам
- Дашборд с KPI и P&L
- ...

## Результат

- Маржинальность +27% за 30 дней
- ...
```

### src/content/config.ts

```ts
import { defineCollection, z } from 'astro:content';

const cases = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.number(),
    slug: z.string(),
    title: z.string(),
    shortTitle: z.string(),
    client: z.string(),
    industry: z.string(),
    revenue: z.string().optional(),
    ogImage: z.string(),
    datePublished: z.date(),
    sliderVariant: z.enum(['finance', 'crm', 'ecommerce', 'platform']),
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string(),
      period: z.string().optional(),
    })),
  }),
});

export const collections = { cases };
```

### src/pages/case/[id].astro

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '@/layouts/BaseLayout.astro';
import DashboardSlider from '@/components/islands/DashboardSlider.jsx';
import { caseSchema } from '@/lib/jsonld';

export async function getStaticPaths() {
  const cases = await getCollection('cases');
  return cases.map((c) => ({
    params: { id: c.data.id.toString() },
    props: { caseData: c },
  }));
}

const { caseData } = Astro.props;
const { Content } = await caseData.render();
---

<BaseLayout
  title={caseData.data.title}
  description={caseData.data.shortTitle}
  canonical={`https://aivisionpro.ru/case/${caseData.data.id}`}
  ogImage={caseData.data.ogImage}
  ogType="article"
  jsonLd={[caseSchema(caseData.data)]}
>
  <article>
    <Content />
    <DashboardSlider variant={caseData.data.sliderVariant} client:visible />
  </article>
</BaseLayout>
```

**Профит:** партнёр редактирует case-1.md через GitHub web UI, не трогая код.

---

## 7. Деплой

### GitHub Actions workflow

Текущий `.github/workflows/deploy.yml` меняется на 1 команду:

```yaml
- name: Build
  run: |
    if [ "${{ github.ref_name }}" = "main" ]; then
      npm run build -- --mode production
    else
      npm run build -- --mode development
    fi
  env:
    PUBLIC_API_URL: ${{ github.ref_name == 'main' && 'https://api.aivisionpro.ru' || 'https://api.aivisiontest.ru' }}
```

ВАЖНО: Astro использует `PUBLIC_*` префикс для public env переменных, **не `VITE_*`**.
В коде заменить `import.meta.env.VITE_API_URL` → `import.meta.env.PUBLIC_API_URL` везде
(в `tracker.js` и в формах).

### Nginx — без изменений
Та же раздача `dist/` статикой. SPA-роутинг `try_files` не нужен (Astro генерирует
явные HTML файлы для каждого роута), но не сломает если оставить.

### Демо CRM
`public/demo/` остаётся. `scripts/sync-demo.sh` работает идентично. В Astro `public/`
обрабатывается так же как в Vite — содержимое копируется в `dist/` как есть.

### Параллельный домен для тестирования
Деплой dev-ветки на `astro.aivisiontest.ru` (новый поддомен) — для тестирования
до merge в main. После CF wildcard это сделается одной командой в nginx + certbot.

---

## 8. Migration Checklist — пошагово

### Phase 0 — подготовка (без миграции, до старта)

- [ ] Wildcard в CF: `*.aivisiontest.ru → 85.239.51.8`, proxy OFF
- [ ] CF API token для wildcard SSL (Edit Zone DNS на `aivisiontest.ru`)
- [ ] Контент от партнёра: тексты, OG-картинки, Organization data, verification meta
- [ ] Создать ветку `feat/astro-migration` от `dev`

### Phase 1 — каркас Astro

- [ ] `npm create astro@latest` в новой временной папке для генерации шаблонов
- [ ] Создать `package.json` Astro в текущей репе (бэкап старого как `package.json.vite.bak`)
- [ ] Установить: `astro`, `@astrojs/react`, `@astrojs/tailwind`, `@astrojs/mdx`, `@astrojs/sitemap`
- [ ] Удалить: `react-router-dom`, `react-helmet-async`, `vite`, `@vitejs/plugin-react`
- [ ] Создать `astro.config.mjs` с интеграциями + `site: 'https://aivisionpro.ru'`
- [ ] Перенести `tailwind.config.js` (работает в Astro без правок)
- [ ] Создать `src/styles/global.css` из `src/index.css`
- [ ] Создать `src/layouts/BaseLayout.astro` (см. § 4)
- [ ] Создать `src/lib/jsonld.js` (см. § 4)
- [ ] Обновить `src/lib/seo.js` под новую схему (см. § 4)

### Phase 2 — компоненты

- [ ] Перенести `src/lib/tracker.js` — без изменений
- [ ] Заменить `import.meta.env.VITE_API_URL` → `import.meta.env.PUBLIC_API_URL` глобально
- [ ] Перенести `src/data/dashboard-slides.jsx` — без изменений
- [ ] Создать `src/components/islands/`:
  - [ ] `ContactModal.jsx` — копия из `src/components/landing/ContactModal.jsx`
  - [ ] `ContactToggleInput.jsx` — копия
  - [ ] `DashboardSlider.jsx` — копия
  - [ ] `InlineLeadForm.jsx` — извлечь общую форму из FinalCTA + Integrations
- [ ] Создать `src/components/v2/` — переписать 14 секций как `.astro`:
  - [ ] Navbar.astro
  - [ ] Hero.astro (внутри CTA вызывает ContactModal через `client:load`)
  - [ ] Problem.astro
  - [ ] Solution.astro
  - [ ] Advantages.astro (collapsible — лёгкий островок или CSS-only)
  - [ ] Platform.astro (с `<DashboardSlider variant="platform" client:visible />`)
  - [ ] Customization.astro
  - [ ] Integrations.astro (чипы + форма — `client:load` island)
  - [ ] HowWeWork.astro
  - [ ] Difference.astro
  - [ ] Cases.astro (читает из content collection)
  - [ ] FinalCTA.astro (с `<InlineLeadForm client:load />`)
  - [ ] StickyCta.astro (с `<StickyCtaIsland client:load />` если есть scroll-логика)
  - [ ] Footer.astro

### Phase 3 — страницы

- [ ] `src/pages/index.astro` — главная (композиция секций + BaseLayout)
- [ ] `src/pages/case/[id].astro` — динамический роут (см. § 6)
- [ ] `src/pages/privacy-policy.astro` — статика + noindex
- [ ] `src/pages/consent.astro` — статика + noindex

### Phase 4 — контент

- [ ] `src/content/config.ts` — схема коллекций
- [ ] `src/content/cases/case-1.md` — мигрировать из `data/cases.js`
- [ ] `src/content/cases/case-2.md`
- [ ] `src/content/cases/case-3.md`

### Phase 5 — public assets

- [ ] `public/favicon.svg` — без изменений
- [ ] `public/demo/` — без изменений
- [ ] `public/og/og-main.png` — положить от партнёра
- [ ] `public/og/og-case-1.png` ... `og-case-3.png` — от партнёра
- [ ] `public/logo-512.png` — от партнёра
- [ ] `public/robots.txt` — обновить (см. § 4)

### Phase 6 — workflow и инфра

- [ ] Обновить `.github/workflows/deploy.yml` (env переменная + build команда)
- [ ] Создать nginx-конфиг для `astro.aivisiontest.ru` на 85.239.51.8
- [ ] Запросить SSL через certbot (после CF wildcard)
- [ ] rsync `dist/` на `/var/www/aivision-landing-astro-test/`

### Phase 7 — security headers (nginx)

Добавить в nginx-конфиг **обоих** доменов (dev и prod):

```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://mc.yandex.ru https://www.googletagmanager.com; connect-src 'self' https://api.aivisionpro.ru https://api.aivisiontest.ru https://mc.yandex.ru" always;
```

### Phase 8 — verification и аналитика (от партнёра)

- [ ] Вписать `<meta name="yandex-verification" content="...">` в BaseLayout
- [ ] Вписать `<meta name="google-site-verification" content="...">` в BaseLayout
- [ ] Добавить Яндекс.Метрику счётчик (компонент `<YandexMetrika id="..." />` в Layout)
- [ ] Добавить GA4 (`<GA4 id="G-..." />` в Layout)
- [ ] Submit sitemap в Я.Вебмастер
- [ ] Submit sitemap в Search Console

### Phase 9 — тестирование на `astro.aivisiontest.ru`

- [ ] `curl https://astro.aivisiontest.ru/ | grep title` — title в HTML
- [ ] `curl https://astro.aivisiontest.ru/ | grep og:image` — OG в HTML
- [ ] Lighthouse mobile — должен быть ≥ 90
- [ ] Все 12 секций визуально 1-в-1 с prod (скриншот-сравнение)
- [ ] Все 3 кейса открываются (`/case/1`, `/case/2`, `/case/3`)
- [ ] Privacy и Consent открываются
- [ ] 404 на `/nonexistent` показывает кастомную страницу
- [ ] ContactModal открывается из Hero, Sticky, Navbar
- [ ] Форма ContactModal сабмитится (мокнуть API в тесте или проверить с реальным CRM dev)
- [ ] Inline-форма FinalCTA сабмитится
- [ ] Inline-форма Integrations сабмитится
- [ ] Чекбокс согласия на ПД блокирует отправку
- [ ] DashboardSlider переключает слайды каждые 8с
- [ ] Click-трекинг работает (DevTools → Network → POST на /api/clicks)
- [ ] UTM-метки сохраняются (URL `?utm_source=test` → видно в saveLead body)
- [ ] visitor_id создаётся в localStorage
- [ ] `/demo/` открывается, CRM-демо работает
- [ ] Telegram-парсер: отправить `https://astro.aivisiontest.ru/` в любой чат → карточка с картинкой
- [ ] OG-валидаторы: [opengraph.xyz](https://www.opengraph.xyz/url/https://astro.aivisiontest.ru/), [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug/)
- [ ] Адаптив 375×667 (iPhone SE), 768, 1280, 1920
- [ ] DevTools Console — ноль ошибок на главной и кейсах
- [ ] DevTools Security — нет mixed content

### Phase 10 — cut-over в прод

- [ ] PR `feat/astro-migration` → `dev` → ревью → merge
- [ ] CI деплоит dev-ветку → `aivisiontest.ru` (старый Vite-сайт **заменяется** на Astro)
- [ ] Финальная проверка `aivisiontest.ru` — всё работает
- [ ] PR `dev` → `main` → merge
- [ ] CI деплоит main → `aivisionpro.ru`
- [ ] Проверка `curl https://aivisionpro.ru/ | head -50` — мета-теги в HTML
- [ ] Принудительный обновление Telegram-кэша: `https://aivisionpro.ru?_=1` в чат
  + `@WebpageBot` → команда обновления превью
- [ ] Lighthouse финальный замер prod

### Phase 11 — после деплоя

- [ ] Удалить временный поддомен `astro.aivisiontest.ru` (опционально, можно оставить)
- [ ] Обновить CLAUDE.md в репе под новый стек
- [ ] Обновить скилы и агенты (aivision-cto, aivision-frontend, aivision-testing,
  aivision-devops) под Astro
- [ ] Архивировать или удалить `package.json.vite.bak`, старые `src/main.jsx`, `src/App.jsx`
  если не удалены ранее
- [ ] Закрыть SEO-tasks: верификация в Я.Вебмастер и Search Console прошла
- [ ] Через ~3-7 дней — проверить в Я.Вебмастере что страницы индексируются с правильными
  заголовками и сниппетами

---

## 9. Rollback Plan

Если на любом этапе после деплоя на `aivisionpro.ru` обнаружится критическая поломка
(сайт не открывается, форма не работает, конверсии упали):

1. **Быстрый откат через git:**
   ```bash
   cd /var/www/aivision-landing
   git revert <commit-merge> --no-edit
   git push origin main
   # CI задеплоит обратно Vite-версию через ~2-3 минуты
   ```

2. **Ручной откат на сервере (если CI медленный):**
   ```bash
   ssh aivision-dev
   cd /var/www/aivision-landing
   # rsync с предыдущей working dist (если есть бэкап)
   rsync -avz /var/www/aivision-landing.backup/dist/ /var/www/aivision-landing/dist/
   ```

3. **Перед cut-over обязательно:**
   - Сделать бэкап текущего `/var/www/aivision-landing/dist/` →
     `/var/www/aivision-landing-vite-backup-YYYY-MM-DD/`
   - Снэпшот текущей `main` ветки →
     `git tag pre-astro-migration` в репе

---

## 10. Что НЕ делается в этой миграции

- Изменение текстов лендинга (если партнёр не присылает — оставляем текущие)
- Новая дизайн-система или редизайн секций
- Новые секции лендинга
- Бэкенд CRM (отдельный репо, отдельная задача)
- Кастомизация воронки/статусов в CRM
- Блог (отдельная стратегическая задача)
- Bootstrap-скрипт для клонирования клиентов (отдельная задача после миграции)
- Создание prod-сервера для клиентов (отдельная задача)

---

## 11. Зависимости от других задач

### Блокирующие миграцию (без них нельзя стартовать Phase 1)
- CF wildcard `*.aivisiontest.ru → 85.239.51.8` proxy OFF
- CF API token Edit Zone DNS для `aivisiontest.ru`

### Не блокируют, но нужны для финального деплоя в прод
- Контент от партнёра (тексты, OG-картинки, JSON-LD данные, verification meta, аналитика IDs)
- При отсутствии → используем плейсхолдеры (текущие тексты из seo.js, favicon как og-image),
  деплоим, потом точечно подменяем (~1 час правок)

### Не связаны с миграцией (отдельные задачи)
- Bootstrap-скрипт для клонирования — стартует **после** успешной миграции AIVISION
- Pred-сервер выделение для клиентов — после первой продажи

---

## 12. Метрики успеха

После cut-over в прод, проверить через 7 дней:

| Метрика | Цель | Как измерить |
|---|---|---|
| Lighthouse mobile Performance | ≥ 90 | PageSpeed Insights |
| Lighthouse mobile SEO | 100 | PageSpeed Insights |
| HTML содержит контент | да | `curl https://aivisionpro.ru/ \| grep -i 'Hero text'` |
| OG-карточка в Telegram | картинка + заголовок | вручную, `@WebpageBot` |
| Я.Вебмастер: страниц в индексе | 5 (главная + 3 кейса + privacy/consent либо ноль если noindex) | Я.Вебмастер → Индексирование |
| Search Console: страниц в индексе | 4 (без privacy/consent) | Search Console → Index Coverage |
| Конверсия формы заявки | **не упала vs до миграции** | CRM аналитика |
| Скорость деплоя | ≤ 3 мин на ветку | GitHub Actions runtime |

---

## 13. Контакты и роли

- **Технический исполнитель:** Claude Code в репе AIVISION WEB
- **Решения по стеку:** Stepan Markov (cyclonecenter7@gmail.com)
- **Контент / SEO-тексты / OG-картинки:** партнёр-маркетолог (имя)
- **Сервер dev:** 85.239.51.8 (Timeweb VPS, SSH alias `aivision-dev`)
- **Сервер prod:** тот же 85.239.51.8 (отдельный prod-сервер выделим позже)
- **DNS:** CloudFlare, зона `aivisionpro.ru` + `aivisiontest.ru`

---

**Этот документ — единый источник правды по миграции.**
При любых изменениях плана — обновлять документ, не держать в голове.
