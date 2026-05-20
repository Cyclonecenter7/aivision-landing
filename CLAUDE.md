# AIVISION Landing — Контекст проекта

Публичный лендинг (`aivisionpro.ru`) + вшитое demo CRM по адресу `/demo/`.
Static site через **Astro 5** (SSG), React-острова для интерактива.
API-вызовы (трекинг, заявки) идут на CRM-бэкенд (`api.aivisionpro.ru`)
через `PUBLIC_API_URL`.

## Стек

```
Astro 5 + @astrojs/react + @astrojs/tailwind + @astrojs/mdx + @astrojs/sitemap
React 18                    — только в islands (ContactModal/DashboardSlider/InlineLeadForm/IntegrationsBuilder)
Tailwind 3                  — utility (.bg-brand/.bg-dark/.bg-light), preflight отключён
lucide-react                — иконки в React-islands
Content Collections         — кейсы как .md в src/content/cases/
```

Никаких UI-китов (кроме `Btn` для ContactModal), state-management, TypeScript.

## Дизайн-стратегия v2

Все стили компонентов вшиты в `src/styles/global.css` через `@layer components`
(включая медиа-запросы для ≤768px и ≤380px). Tailwind остаётся для
утилитных классов (`.font-inter`, `.overflow-x-hidden`).

**Геометрия:** chamfer-угол через `clip-path: polygon(...)` (10–28px),
**никакого** `border-radius` и **никакого** `border` на элементах с `clip-path`
(не дружат — даёт «крюк» по диагонали). Если нужна кайма — `box-shadow: inset 0 0 0 Npx`
или двухслойная обёртка.

**Italic — запрещён** глобально (`em, i, cite, address { font-style: normal }`).
Акценты — только цветом `var(--brand) #3F6EE8`.

## Структура

```
astro.config.mjs              integrations + trailingSlash:'always' + build.format:'directory'
tailwind.config.cjs           content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'], applyBaseStyles:false
tsconfig.json                 paths: { "@/*": ["./src/*"] }

src/
├── layouts/
│   └── BaseLayout.astro         <head>: title/description/canonical, OG, twitter,
│                                yandex-verification (a580ae03a42eedfc),
│                                JSON-LD (Organization+WebSite+...page-specific),
│                                Я.Метрика (109325036) + GA4 (G-PRM6XBSJZS) только в prod,
│                                глобальный click-tracker + .js-open-contact делегат
│
├── pages/                       file-based роуты SSG
│   ├── index.astro              главная (композиция 12 секций + StickyCta + ContactModalIsland)
│   ├── cases/[slug].astro       динамика через getCollection('cases')
│   ├── privacy-policy.astro
│   ├── consent.astro
│   └── 404.astro                noindex, Astro подхватывает автоматом
│
├── components/
│   ├── v2/                      ★ 14 .astro секций (markup-only, без React-runtime)
│   │   ├── Navbar.astro         внутри Hero
│   │   ├── Hero.astro           CTA через .js-open-contact + data-source
│   │   ├── Problem · Solution · HowWeWork · Difference · Footer
│   │   ├── Advantages.astro     collapsible через inline <script> (vanilla)
│   │   ├── Customization.astro  то же
│   │   ├── Platform.astro       включает <DashboardSlider client:visible />
│   │   ├── Integrations.astro   обёртка над <IntegrationsBuilder client:load />
│   │   ├── FinalCTA.astro       обёртка над <InlineLeadForm client:load />
│   │   ├── Cases.astro          getCollection('cases'), сортировка по order
│   │   └── StickyCta.astro      scroll-listener inline-script
│   │
│   ├── islands/                 React-острова (интерактив)
│   │   ├── ContactModalIsland.jsx   слушает window 'aivision:open-contact'
│   │   ├── ContactModal.jsx
│   │   ├── ContactToggleInput.jsx
│   │   ├── DashboardSlider.jsx
│   │   ├── InlineLeadForm.jsx       форма для FinalCTA
│   │   └── IntegrationsBuilder.jsx  chips + форма
│   │
│   └── ui/
│       └── Btn.jsx                  только для ContactModal/CasePage
│
├── content/
│   ├── config.ts                Astro content config (zod schema)
│   └── cases/
│       ├── education.md         id:"education", order:1, sliderVariant:"finance"
│       ├── construction.md      id:"construction", order:2, sliderVariant:"crm"
│       └── ecommerce.md         id:"ecommerce", order:3, sliderVariant:"ecommerce"
│
├── lib/
│   ├── tracker.js               visitor/session/click/saveLead → PUBLIC_API_URL/api/*
│   ├── seo.js                   home/caseEducation/caseConstruction/caseEcommerce/privacy/consent
│   │                            поля: title, description, ogTitle, ogDescription,
│   │                            path, ogImage, twitterImage, robots
│   └── jsonld.js                organizationSchema, websiteSchema, caseSchema()
│
├── data/
│   └── dashboard-slides.jsx     SLIDER_VARIANTS: finance/crm/ecommerce/platform
│
└── styles/
    └── global.css               Tailwind base + полный CSS реф v2 в @layer components
                                 + @import Inter из Google Fonts на первой строке

public/
├── demo/                        вшитая сборка CRM (см. scripts/sync-demo.sh)
├── og/                          OG-картинки 1200×630 PNG (Inter, brand)
│   ├── og-main.png              ≈57KB
│   ├── og-case-1.png            ≈40KB (для education)
│   ├── og-case-2.png            ≈45KB (для construction)
│   └── og-case-3.png            ≈40KB (для ecommerce)
├── favicon.svg
├── logo-512.png                 для JSON-LD Organization.logo, rich snippet Google
├── robots.txt                   Disallow /demo/, Sitemap → sitemap-index.xml

deploy/
└── nginx/                       источник правды серверных конфигов
    ├── aivision-security-dev.conf       snippet headers для aivisiontest (с X-Robots noindex)
    ├── aivision-security-prod.conf      snippet headers для aivisionpro.ru
    ├── aivisiontest.ru.landing-block.conf
    ├── aivisionpro.ru.landing-block.conf
    └── README.md

scripts/
└── sync-demo.sh                 пересборка demo CRM в public/demo/
```

## Важные особенности

### Глобальное событие открытия модалки

В Astro нет React-state пробрасывания. Любая кнопка-триггер модалки:

```html
<button class="btn js-open-contact" data-source="hero">Начать диагностику</button>
```

Глобальный делегат в `BaseLayout.astro` ловит клик на `.js-open-contact`,
эмитит `window.dispatchEvent(new CustomEvent('aivision:open-contact', {detail:{source}}))`.

`ContactModalIsland.jsx` (один экземпляр на странице через `client:load`)
слушает это событие и открывает модалку.

### Click-трекинг

Атрибут `data-track="..."` + опц. `data-track-block` / `data-track-text`.
Глобальный handler в `BaseLayout.astro` ловит клик по любому `[data-track]`
и шлёт `trackClick(text, id, block)` из `lib/tracker.js`.

### SEO

`src/lib/seo.js` — словарь `SEO.{home,caseEducation,caseConstruction,caseEcommerce,privacy,consent}`.
Каждая запись: `title, description, ogTitle, ogDescription, path, ogImage, twitterImage, robots`.

`seoUrl(seoEntry)` возвращает полный URL с `PUBLIC_SITE_URL` (per-env).

Дев-окружение всегда noindex (BaseLayout проверяет `PUBLIC_ENV !== 'production'`).

JSON-LD: на каждой странице Organization + WebSite автоматически из `BaseLayout`.
Кейсы дополнительно прокидывают `caseSchema()` через `jsonLd` prop.

### Кейсы как Markdown

`src/content/cases/{education,construction,ecommerce}.md` — frontmatter с
структурированными полями (problems[], actions[], results[], sliderVariant,
seoKey, order, datePublished, ogImage).

Чтобы добавить новый кейс: создаёшь `<slug>.md`, добавляешь запись в `seo.js`,
ставишь `seoKey` в frontmatter. Маршрут `/cases/<slug>/` появится автоматом.

### DashboardSlider variants

`src/data/dashboard-slides.jsx` экспортирует `SLIDER_VARIANTS`:

| variant | использование |
|---|---|
| `finance` | кейс education (`sliderLight: true`) |
| `crm` | кейс construction |
| `ecommerce` | кейс ecommerce |
| `platform` | v2-лендинг Platform секция (dark) |

Слайды автопереключаются каждые 8с. На мобилке `.av-slider-stage`
зафиксирован высотой 540px (overflow hidden).

### Inline-формы

`InlineLeadForm.jsx` (FinalCTA) и `IntegrationsBuilder.jsx` (Integrations)
шлют лиды напрямую через `saveLead()`, не открывают ContactModal.

### Demo CRM в `public/demo/`

- Вшитая статическая сборка CRM-фронтенда. Обновляется вручную через
  `scripts/sync-demo.sh`
- CRM-сборка с `VITE_DEMO=1` использует моки + base path `/demo/`
- **Не править руками** — артефакт билда CRM, перезатрётся следующим sync

### URL-редизайн (история)

Старые URL `/case/1`, `/case/2`, `/case/3` редиректят 301 на
`/cases/education/`, `/cases/construction/`, `/cases/ecommerce/`
(nginx config в `deploy/nginx/aivisionpro.ru.landing-block.conf`).

## Окружение

```bash
cp .env.example .env       # PUBLIC_SITE_URL=http://localhost:4321
                           # PUBLIC_API_URL=https://api.aivisionpro.ru
                           # PUBLIC_ENV=development
npm install
npm run dev                # http://localhost:4321
npm run build              # → dist/
npm run check              # astro check (типизация — техдолг, может валиться на Astro.props)
```

## Деплой

- **Prod:** `aivisionpro.ru` (push в `main` → `.github/workflows/deploy.yml`
  → `astro build` с PUBLIC_ENV=production → rsync `dist/` на VPS Timeweb)
- **Dev:** `aivisiontest.ru` (push в `dev` → PUBLIC_ENV=development → rsync)
- Nginx раздаёт `dist/` статикой с `try_files $uri $uri/ =404`
  и `error_page 404 /404.html`
- Security headers через `/etc/nginx/snippets/aivision-security-{dev,prod}.conf`
  (include в каждом location — иначе add_header inheritance ломается)
- На dev: X-Robots-Tag noindex. На prod: без него (индексируется)

## Аналитика и SEO

- **Я.Метрика 109325036** — только в prod, через PUBLIC_ENV check
- **GA4 G-PRM6XBSJZS** — только в prod
- **Я.Вебмастер verification:** `a580ae03a42eedfc` (meta-тег в BaseLayout)
- **Google Search Console:** DNS-verification (meta-тег не нужен)
- **Sitemap:** `https://aivisionpro.ru/sitemap-index.xml` (авто через @astrojs/sitemap)

## Что НЕ делаем

- Не добавляем backend — бэк живёт в `AIVISION CRM/backend/`
- Не добавляем state-management — нет повода
- Не добавляем TypeScript на pages (только тонкие interface Props в .astro)
- Не правим файлы в `public/demo/` руками
- Не делаем fetch на относительные пути — всегда через `PUBLIC_API_URL`
- Не используем `border` + `clip-path` вместе
- Не используем italic
- Не используем `border-radius` на chamfer-элементах
- Не возвращаемся на `react-router-dom`/`react-helmet-async` — миграция на Astro закрыла SEO-блокер
