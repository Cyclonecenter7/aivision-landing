# AIVISION Landing — Контекст проекта

Публичный лендинг (`aivisionpro.ru`) + вшитое demo CRM по адресу `/demo/`.
Только фронтенд, статика, билдится Vite.

API-вызовы (трекинг, заявки) идут на CRM-бэкенд (`api.aivisionpro.ru`)
через `VITE_API_URL`.

## Стек

```
React 18 + Vite 6
Tailwind 3                  — utility, в основном фоны (.bg-brand/.bg-dark/.bg-light)
react-router-dom 6
react-helmet-async 3        — SEO/<head>
lucide-react                — иконки
```

Никаких UI-китов, state-management, TypeScript.

## Дизайн-стратегия v2 (актуальная)

Лендинг переписан под утверждённый HTML-референс. Все стили компонентов
оригинального референса вшиты в `src/index.css` через `@layer components`
(включая медиа-запросы для ≤768px и ≤380px). Tailwind остаётся для
утилитных классов (`.font-inter`, `.overflow-x-hidden` и т.д.).

**Геометрия:** chamfer-угол через `clip-path: polygon(...)` (10–28px),
**никакого** `border-radius` и **никакого** `border` на элементах с `clip-path`
(не дружат — даёт «крюк» по диагонали). Если нужна кайма — `box-shadow: inset 0 0 0 Npx`
или двухслойная обёртка (см. `.sticky-cta-demo` и `.sticky-cta-demo-inner`).

**Italic — запрещён** глобально (`em, i, cite, address { font-style: normal }`).
Акценты — только цветом `var(--brand) #3F6EE8`.

## Структура

```
src/
├── App.jsx                       роутер + глобальный click-tracker
├── main.jsx                      entry
├── index.css                     Tailwind base + полный CSS реф в @layer components
├── pages/
│   ├── Landing.jsx               главная — композиция 12 v2-секций + ContactModal state
│   ├── CasePage.jsx              карточка кейса
│   ├── PrivacyPolicy.jsx
│   └── Consent.jsx
├── components/
│   ├── landing/
│   │   ├── ContactModal.jsx               модалка диагностики, шлёт saveLead
│   │   ├── ContactToggleInput.jsx         input с переключателем Telegram/Телефон
│   │   ├── DashboardSlider.jsx            универсальный слайдер (variant=...)
│   │   └── v2/                            ★ актуальные секции лендинга
│   │       ├── Navbar.jsx                 внутри Hero, абсолютный
│   │       ├── Hero.jsx                   #01 brand-фон, триада SVG + 2 CTA
│   │       ├── Problem.jsx                #02 light, 3 prob-card
│   │       ├── Solution.jsx               #03 dark, 3 sol-card (Видимость/Контроль/Управляемость)
│   │       ├── Advantages.jsx             #04 light, 3 adv-card (collapsible body)
│   │       ├── Platform.jsx               #05 dark, slider variant="platform"
│   │       ├── Customization.jsx          #06 light, 4 cst-card + cst-viz stack + cst-vs (brand)
│   │       ├── Integrations.jsx           #07 light, конструктор: 9 чипов → описание → форма
│   │       ├── HowWeWork.jsx              #08 dark, 4 шага + closing
│   │       ├── Difference.jsx             #09 light, 4 diff-card
│   │       ├── Cases.jsx                  #10 light, 3 brand-карточки из data/cases.js
│   │       ├── FinalCTA.jsx               #11 dark, inline-форма (saveLead напрямую)
│   │       ├── StickyCta.jsx              sticky-бар (Диагностика + TG + Демо)
│   │       └── Footer.jsx
│   └── ui/                       Btn (используется в ContactModal/CasePage), index.js
├── lib/
│   ├── tracker.js                визит/сессия/клик/saveLead → CRM-бэк
│   ├── seo.js                    helmet-хелперы (SEO.home, SEO.case1/2/3)
│   ├── ErrorBoundary.jsx
│   └── PageNotFound.jsx
├── config/
│   └── brand.js                  бренд-константы (НЕ используется в v2, кандидат на удаление)
└── data/
    ├── cases.js                  3 кейса (Образование / 200+ млн / WB)
    └── dashboard-slides.jsx      SLIDER_VARIANTS: finance / crm / ecommerce / platform

public/
├── demo/                         вшитая сборка CRM (см. scripts/sync-demo.sh)
├── favicon.svg, robots.txt, sitemap.xml

scripts/
└── sync-demo.sh                  пересборка demo CRM в public/demo/
```

## Важные особенности

- Все API-вызовы → CRM-бэкенд через `VITE_API_URL` (`api.aivisionpro.ru`).
  Если пусто — fetch пойдёт по относительному пути и не сработает
- Трекинг кликов — через атрибут `data-track` на DOM-элементе
  (handler в `App.jsx`, шлёт в `trackClick` из `lib/tracker.js`).
  Дополнительно: `data-track-block`, `data-track-text`
- SEO через `react-helmet-async`. Все страницы должны быть обёрнуты в `<HelmetProvider>`
  (включено в `main.jsx`)
- Алиас `@/` → `src/` (см. `jsconfig.json` / `vite.config.js`)
- Реакция на заявку везде единая копия — **«в течение 5 минут»**
  (ContactModal success / FinalCTA stat / Integrations form hint)

### DashboardSlider variants

`src/data/dashboard-slides.jsx` экспортирует `SLIDER_VARIANTS`:

| variant | tabs | использование |
|---|---|---|
| `finance` | Дашборд / Операции / Визиты / Аналитика / Категории | CasePage кейс 1 (образование) |
| `crm` | Сделки / Финансы / Аналитика / Платёж / PnL | CasePage кейс 2 (200+ млн) |
| `ecommerce` | Обзор / Бренды / Воронка / Товары | CasePage кейс 3 (WB) |
| `platform` | Дашборд / Заявки / Клиенты / Задачи | **v2-лендинг Platform секция (dark)** |

Слайды автопереключаются каждые 8с. На мобилке `.av-slider-stage`
зафиксирован высотой 540px (overflow hidden) чтобы avoid reflow при
автопереключении (слайды разной высоты иначе двигают viewport).

### Inline-формы саб­миттят saveLead напрямую

`FinalCTA` и `Integrations` форма НЕ открывают ContactModal — шлют лиды
сами через `saveLead({ name, contact, contact_type, source_block })`.
ContactModal остаётся для кнопок «Начать диагностику» в навбаре, hero, sticky.

### Demo CRM в `public/demo/`

- Содержит вшитую статическую сборку CRM-фронтенда. Это интерактивное демо
  на лендинге, доступно по `/demo/`
- Обновляется **вручную** через `scripts/sync-demo.sh`:
  ```bash
  ./scripts/sync-demo.sh           # CRM_PATH=../AIVISION\ CRM по умолчанию
  ```
  Скрипт делает `VITE_DEMO=1 npm run build` в CRM, копирует `dist/` в `public/demo/`
- CRM-сборка с `VITE_DEMO=1` использует моки вместо реального бэка
  и base path `/demo/` для ассетов
- После каждой синхронизации — отдельный коммит `chore(demo): rebuild — <причина>`
  с SHA исходного коммита CRM в описании
- **Процесс синхронизации — техдолг.** Автоматизация через GitHub Action
  отложена. Сам артефакт `public/demo/` — фича прода, не удалять

### Demo gate / post-submit upsell

- После отправки формы заявки в `ContactModal` показывается success-блок
  с предложением открыть демо. Аналогично в FinalCTA после саб­мита
- Демо открывается в новой вкладке на `/demo/`

## Окружение

```bash
cp .env.example .env       # VITE_API_URL=https://api.aivisionpro.ru
npm install
npm run dev                # http://localhost:5173
npm run build              # → dist/ для прода
```

## Деплой

- **Прод:** `aivisionpro.ru` (push в `main` → `.github/workflows/deploy.yml`
  → vite build mode=production → rsync на VPS Timeweb)
- **Dev:** `aivisiontest.ru` (push в `dev` → mode=development → rsync)
- nginx раздаёт `dist/` статикой с `try_files /index.html` для SPA-роутинга

## Техдолг (не блокер, фоном)

- `src/config/brand.js` — не используется компонентами, кандидат на удаление
- `src/components/ui/Eyebrow.jsx`, `ClipCard.jsx`, `Section.jsx` — экспортируются
  из `ui/index.js`, но не импортируются. Btn остаётся (используется ContactModal + CasePage)
- CSS legacy vars в `src/index.css:13–17` (`--color-bg`, `--color-bg-light`,
  `--color-dark2`, `--color-red`) — не используются. `--font-inter` нужен
- `SLIDER_VARIANTS.finance/crm/ecommerce` со слайдами `FinanceSlideN/CrmSlideN/EcomSlideN`
  (~500 строк) живут только для CasePage. Если кейсы будут переделаны — кандидат на чистку

## Что НЕ делаем

- Не добавляем backend в этот репо — бэк живёт в `AIVISION CRM/backend/`
- Не добавляем state-management (redux/zustand) — лендинг не нуждается
- Не добавляем TypeScript — проект на чистом JS
- Не правим файлы в `public/demo/` руками — артефакт билда CRM, перезатрётся
  следующим `sync-demo.sh`. Менять надо CRM-репо и пересобирать
- Не делаем fetch на относительные пути — всегда через `VITE_API_URL`
- Не используем `border` + `clip-path` вместе — даёт «крюк» по диагонали.
  Альтернатива: `box-shadow: inset` или двухслойная обёртка
- Не используем italic — глобально отключён в `@layer base`
