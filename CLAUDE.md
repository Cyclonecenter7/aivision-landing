# ШВЕЦ — публичный сайт

> Один вопрос: как устроен и собирается публичный сайт ШВЕЦ.
> Общая карта: `../_ядро/docs/DOC-MAP.md`; границы site/admin/app:
> `../_ядро/docs/PRODUCT-LAYERS.md`; runtime:
> `../_ядро/docs/PRODUCTION-SNAPSHOT.generated.md`.
> Сверено с кодом: `shvec-site@3ef6a56` (production `main`) и
> `shvec-site@6627b98` (`dev`), 2026-08-11. Публичный runtime подтверждён
> snapshot от 2026-08-11; общий strict-гейт красный только из-за `/ready` app,
> не из-за сайта.

Публичный сайт `shvec.tech` под единым брендом ШВЕЦ разводит два маршрута:

- малому бизнесу — готовый ШВЕЦ app (`app.shvec.tech`);
- крупному — enterprise-адаптация «ШВЕЦ под вас».

Static site через **Astro 5** (SSG), React-острова для интерактива. API-вызовы
трекинга и заявок идут во внутренний backend `admin.shvec.tech` через
`PUBLIC_API_URL`. Обещание сайта не является доказательством поставки app.

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

**Текущий факт реализации:** chamfer-угол широко сделан через
`clip-path: polygon(...)` (10–28px). Это не разрешение размножать паттерн:
конфликт с общей DS-политикой закрывается отдельной миграцией, а не случайной
правкой рядом с фичей. Для существующей реализации — **никакого**
`border-radius` и **никакого** `border` на элементах с `clip-path`
(не дружат — даёт «крюк» по диагонали). ⚠ `box-shadow: inset 0 0 0 Npx` **тоже
режется** clip-path по диагонали — кайма рвётся на скосе (см. DS-скилл, `chOutline`
удалён по этой же причине). Каёмка на chamfer:
1. **Лучший выбор (по DS)** — без каймы, контраст фонов (белая карта на сером фоне,
   тёмная surface `#181818` на bg `#0A0A0A`).
2. Двухслойная обёртка: внешний chamfer = цвет каймы + `padding:1px`, внутренний
   на 1px меньший chamfer = surface.

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
│                                CookieBanner, consent-gated собственный tracker,
│                                делегаты .js-open-contact/.js-open-demo и YM-целей
│
├── pages/                       file-based роуты SSG
│   ├── index.astro              главная (композиция 12 секций + StickyCta + ContactModalIsland)
│   ├── cases/                   ★ 4 standalone .astro страниц (НЕ content collection)
│   │   ├── education.astro      EduDashboard (Финансы / Продукты / Мотивация)
│   │   ├── construction.astro   BuildDashboard (Проекты / ДДС+прогноз)
│   │   ├── ecommerce.astro      SalesDashboard (Дашборд / Воронка / Менеджеры) — slug 'ecommerce' но контент про продажи/услуги
│   │   └── esim.astro           EsimDashboard (Дашборд / Воронка / Топ)
│   ├── privacy-policy.astro
│   ├── consent.astro
│   ├── consent-registration.astro
│   └── 404.astro                noindex, Astro подхватывает автоматом
│
├── components/
│   ├── v2/                      ★ 14 .astro секций (markup-only, без React-runtime)
│   │   ├── Navbar.astro         внутри Hero
│   │   ├── Hero.astro           CTA через .js-open-contact + data-source
│   │   ├── Problem · Solution · HowWeWork · Difference · Footer
│   │   ├── Advantages.astro     collapsible через inline <script> (vanilla)
│   │   ├── Customization.astro  то же
│   │   ├── Platform.astro       включает <DashboardSlider client:visible /> (с NDA badge)
│   │   ├── Integrations.astro   обёртка над <IntegrationsBuilder client:load />
│   │   ├── FinalCTA.astro       обёртка над <InlineLeadForm client:load />
│   │   ├── Cases.astro          ★ HARDCODED 4 карточки (1 hero + 3 sub), темный фон,
│   │   │                        SVG-паттерны p-edu/p-bld/p-eco/p-esim
│   │   └── StickyCta.astro      scroll-listener inline-script
│   │
│   ├── islands/                 React-острова (интерактив)
│   │   ├── ContactModalIsland.jsx   слушает window 'aivision:open-contact'
│   │   ├── ContactModal.jsx
│   │   ├── ContactToggleInput.jsx
│   │   ├── DashboardSlider.jsx      для Platform секции главной, NDA badge + footnote
│   │   ├── InlineLeadForm.jsx       форма для FinalCTA
│   │   ├── IntegrationsBuilder.jsx  chips + форма
│   │   ├── EduDashboard.jsx     ★ 3 таба: Финансы/Продукты/Мотивация (case education)
│   │   ├── BuildDashboard.jsx   ★ 2 таба: Проекты (4 PnL) / ДДС+прогноз (сравнение доход/расход)
│   │   ├── SalesDashboard.jsx   ★ 3 таба: Дашборд/Воронка/Менеджеры (case ecommerce)
│   │   └── EsimDashboard.jsx    ★ 3 таба: Дашборд/Воронка/Топ продуктов (case esim)
│   │
│   └── ui/
│       └── Btn.jsx                  только для ContactModal/CasePage
│
├── lib/
│   ├── tracker.js               visitor/session/click/saveLead → PUBLIC_API_URL/api/*
│   ├── seo.js                   home/caseEducation/caseConstruction/caseEcommerce/caseEsim/privacy/consent
│   │                            поля: title, description, ogTitle, ogDescription,
│   │                            path, ogImage, twitterImage, robots
│   ├── yandexMetrika.js         reachGoal + очередь ранних целей текущей страницы
│   └── jsonld.js                organizationSchema, websiteSchema, caseSchema()
│
├── data/
│   └── dashboard-slides.jsx     SLIDER_VARIANTS: finance/crm/ecommerce/platform (для DashboardSlider)
│
└── styles/
    ├── global.css               Tailwind base + полный CSS реф v2 в @layer components
    │                            + @import Inter из Google Fonts на первой строке
    │                            ⚠ Содержит .nav стиль для Navbar главной — может конфликтовать
    │                            с case-v3 nav (override через `.case-v3 .nav { max-width: none; transform: none; ... }`)
    └── case-page-v3.css         ★ Shared CSS для 4 страниц кейсов, wrap class .case-v3
                                 (desktop + mobile через @media 768px, view switch без JS)

public/
├── demo/                        вшитая сборка CRM (см. scripts/sync-demo.sh);
│                                metrika.js шлёт Demo_enter_success
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

### Кейсы (v3 — standalone .astro)

★ **Content collection УДАЛЁН** (был `src/content/cases/*.md`). Каждый из 4
кейсов теперь полностью standalone `.astro` файл с:
- импортом `case-page-v3.css` (shared)
- обёрткой `<div class="case-v3">`
- двумя view-блоками `.d-view` (desktop) / `.m-view` (mobile), переключение
  через `@media (max-width: 768px)` — БЕЗ JS-toggle
- собственным React-island дашбордом (Edu/Build/Sales/EsimDashboard)
- inline `<script>` для mobile carousel («Что сделали» 3 слайда + touch + dots + prev/next)

Структура каждой страницы (одна и та же для 4-х):
1. `<nav class="nav">` — sticky, BACK (← Все кейсы) слева + NEXT справа.
   Без логотипа. Циклика next:
   education → construction → ecommerce → esim → education
2. `<div class="nda">` — жёлтый pill «NDA» + текст «Показатели изменены»
3. `<div class="d-hero">` — eyebrow + tag + H1 + lead + 4 hero-stat (grid карточки)
4. `<div class="d-layout">` (1fr 520px grid) — слева контент-блоки, справа sticky React-island
5. Content-блоки: «Точка А» (3 plane V/C/U) → «Что сделали» (3-5 actions) →
   «Точка Б» (6 res-card) → «Чем отличается» (diff-row)
6. CTA-бар + `<Footer />` + `<StickyCta />` + `<ContactModalIsland client:load />`

Чтобы добавить НОВЫЙ кейс:
1. Скопируй любую страницу `src/pages/cases/*.astro`
2. Добавь запись в `src/lib/seo.js` (title/og/path)
3. Создай React-island в `src/components/islands/<Name>Dashboard.jsx`
4. Обнови SVG-pattern + 4-ю карточку в `Cases.astro` (если нужно)
5. Обнови циклику next-button у соседних кейсов

### DashboardSlider variants (Platform секция главной)

`src/data/dashboard-slides.jsx` экспортирует `SLIDER_VARIANTS` для
`<DashboardSlider variant="platform" />` в Platform.astro. Имеет
**NDA badge** (синий, в header bar) + **footnote** под dot indicators
(«Уважаем NDA клиентов — цифры иллюстративные»).

| variant | использование |
|---|---|
| `finance` | (исторический, для cases пока не используется) |
| `crm` | (исторический) |
| `ecommerce` | (исторический) |
| `platform` | v2-лендинг Platform секция (dark) — ЕДИНСТВЕННЫЙ активный |

Слайды автопереключаются каждые 8с. На мобилке `.av-slider-stage`
зафиксирован высотой 540px (overflow hidden).

### CSS gotchas / уроки

**1. `<style is:global>` дублирование в Astro:** при одинаковых классах в
двух pages Astro может дедупнуть так что css не попадёт в bundle одной
из страниц. Решение — extract в отдельный `*.css` файл и `import` в frontmatter.

**2. Глобальный `.nav` (для Hero Navbar) переопределяет `.case-v3 .nav`:**
hero `.nav` имеет `position: absolute; max-width: 1200px; transform: translateX(-50%)`.
Tailwind layers > inline. На кейс-странице — явно сбрасываем в case-page-v3.css:
`max-width: none; transform: none; left: auto; right: auto`.

**3. Python для bulk edits в .astro:** `Edit` tool может выдать «File modified
since read» из-за linter. Для нескольких замен — `python3 <<EOF` script
с `.replace()` или `re.sub()`. Так быстрее и атомарно.

**4. CDN/nginx cache:** `?_=$(date +%s)` query bypass в curl для свежей версии.
При деплое stale файл = rsync не успел или повторно проверь file modtime
на сервере `/var/www/aivision-landing-dev/dist/`.

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
(исторические редиректы ещё лежат в legacy-файле
`deploy/nginx/aivisionpro.ru.landing-block.conf`; активный prod-конфиг —
`deploy/nginx/shvec.tech.landing-block.conf`).

## Окружение

```bash
cp .env.example .env       # PUBLIC_SITE_URL=http://localhost:4321
                           # PUBLIC_API_URL=https://admin.shvec.tech
                           # PUBLIC_ENV=development
npm install
npm run dev                # http://localhost:4321
npm run build              # → dist/
npm run check              # astro check (типизация — техдолг, может валиться на Astro.props)
```

## Деплой

- **Prod:** `shvec.tech` (push в `main` → `.github/workflows/deploy.yml`
  → `astro build` с PUBLIC_ENV=production → rsync `dist/` на VPS Timeweb)
- **Dev:** `aivisiontest.ru` (push в `dev` → PUBLIC_ENV=development → rsync)
- Production workflow перед сборкой проверяет ingest-key запросом к
  `admin.shvec.tech` и вычисляет активный web root по hash живого `index.html`;
  неоднозначный или отсутствующий target останавливает deploy.
- Nginx раздаёт `dist/` статикой с `try_files $uri $uri/ =404`
  и `error_page 404 /404.html`
- Security headers prod через SHVEC snippet; legacy-файлы с `aivision-*` в
  имени сохраняются до отдельной серверной миграции
  (include в каждом location — иначе add_header inheritance ломается)
- На dev: X-Robots-Tag noindex. На prod: без него (индексируется)

## Аналитика и SEO

- **Я.Метрика 109677313** — только в production, запускается сразу при загрузке
  страницы и не ждёт решения в cookie-баннере. `referrer` и текущий `url`
  передаются в `init`; UI баннера от этой схемы не меняется.
- **Собственная аналитика сайта** (`/api/v1/ingest/track`, visitor/session/click,
  баннеры) запускается только после `shvec_cookie_consent=accepted`.
- **Заявки** (`/api/v1/ingest/leads`) не зависят от согласия на необязательную
  поведенческую аналитику; неуспешный `/track` не блокирует отправку лида.
- **Цели Метрики:** `reg_ok` после подтверждённого приёма лида и
  `Demo_enter_success` при входе во встроенное demo. Кнопочные цели задаются
  через `data-ym-goal`/`data-ym-goals`; ранние события ждут `ym` только в памяти
  текущей страницы.
- **GA4 в текущем production-коде отсутствует.** Не возвращать без отдельного
  решения и актуализации юридических страниц.
- **Я.Вебмастер verification:** `a580ae03a42eedfc` (meta-тег в BaseLayout)
- **Google Search Console:** DNS-verification (meta-тег не нужен)
- **Sitemap:** `https://shvec.tech/sitemap-index.xml` (авто через @astrojs/sitemap)

## Workflow / процесс

- **Development:** push в `dev` → CI деплоит development-среду.
- **Production:** только push в `main`; текущий prod SHA публично не
  маркируется, поэтому проверяется artifact fingerprint из машинного snapshot.
- **Prod ТОЛЬКО по явному «ок»** от Степана. Push в `main` без подтверждения —
  запрещено. Откат — через проверенный revert/redeploy exact SHA, не force-push.
- **GitHub auth:** в worktree gh CLI может вылезти под другим юзером
  (dev1klas вместо Cyclonecenter7). `gh auth switch --user Cyclonecenter7`
  если push 403.

## Open issues / тех. долг

- `Cases.astro` (главная) — карточки 4-го кейса (eSIM) текстово
  рассинхронизированы с самой страницей: карточка говорит «Два сайта, два
  партнёра» / «Разные платёжки», страница говорит «Запуск нового направления
  с управленческой видимостью». Партнёр может прислать обновлённый cases-v5
  → обновим
- `BuildDashboard.jsx` — внутри dashboard под графиком ДДС всё ещё текст
  «Кассовые разрывы устранены — 0 инцидентов после включения алертов».
  Партнёр заменил «кассовые разрывы» на «налоговые оплаты» в res-grid страницы,
  но в дашборде этот алёрт-текст пока не правил. Возможно надо синхронизировать
- Construction action #03 содержит «контроль кассовых разрывов через алерты»
  (внутри action-desc) — это про процесс, не результат, оставлено
- `Cases.astro` SVG-паттерны не отражают новые narrative кейсов (p-edu это
  3 KPI, p-bld это 4 проекта — релевантно; p-eco воронка — норм для sales;
  p-esim 2 линии — рассинхрон с «запуском нового направления»)

## Текст на сайте

Любой текст, который видит человек — секции лендинга, страницы кейсов, блог,
FAQ, формы и модалки — пишется через `.claude/skills/shvec-voice` (симлинк на
`_ядро/skills/shvec-voice`). Это канон, а не рекомендация.

Поверхность «лендинг»: обращение на «вы», без хеджей, без точки в конце
одиночной строки, секциями.

Инварианты, которые нарушаются на сайте прямо сейчас и подлежат правке при
любом касании секции:

- **никого не обвиняем** — «Видимости нет», «Контроля нет», «Менеджер
  уволился, выросла дыра», «Масштабирование пугает» описывают отсутствие и
  пугают последствием. Надо описывать устройство;
- **не рамка дефицита** — «кассовый разрыв» в заголовке статьи блога;
- **тире «—»** встречается в секциях и в блоге;
- **ноль конкретных чисел** в статьях блога, при том что весь стиль стоит на
  сцене с суммами.

Правки текста не требуют ТЗ, но требуют прогона по чеклисту в конце `SKILL.md`.

## Что НЕ делаем

- Не добавляем backend — ingest живёт в `Швец админ/швец-админ-back`
- Не добавляем state-management — нет повода
- Не добавляем TypeScript на pages (только тонкие interface Props в .astro)
- Не правим файлы в `public/demo/` руками
- Не делаем fetch на относительные пути — всегда через `PUBLIC_API_URL`
- Не используем `border` + `clip-path` вместе
- Не используем italic
- Не используем `border-radius` на chamfer-элементах
- Не возвращаемся на `react-router-dom`/`react-helmet-async` — миграция на Astro закрыла SEO-блокер
