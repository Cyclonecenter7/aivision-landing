# AIVISION Landing — Контекст проекта

Публичный лендинг (`aivisionpro.ru`) + вшитое demo CRM по адресу `/demo/`.
Только фронтенд, статика, билдится Vite.

API-вызовы (трекинг, заявки) идут на CRM-бэкенд (`api.aivisionpro.ru`)
через `VITE_API_URL`.

## Стек

```
React 18 + Vite 6
Tailwind 3
react-router-dom 6
react-helmet-async 3   — SEO/<head>
lucide-react           — иконки
```

Никаких UI-китов, никакого state-management, никакого TypeScript.

## Структура

```
src/
├── App.jsx                    роутер + глобальный click-tracker
├── main.jsx                   entry
├── index.css                  Tailwind layers
├── pages/
│   ├── Landing.jsx            главная (собрана из секций)
│   ├── CasePage.jsx           карточка кейса
│   ├── PrivacyPolicy.jsx
│   └── Consent.jsx
├── components/
│   ├── landing/               секции лендинга
│   │   ├── Navbar, Hero, HeroDashboard/, Problem, Diagnosis,
│   │   ├── Products, Cases, Integrations, DashboardSlider,
│   │   ├── ComparisonWithForm, ContactModal, ContactToggleInput,
│   │   ├── DemoStrip, StarterBanner, Footer
│   └── ui/                    Btn, Eyebrow, Section, ClipCard, index.js
├── lib/
│   ├── tracker.js             визит/сессия/клик → CRM-бэк (UTM, fingerprint)
│   ├── seo.js                 helmet-хелперы
│   ├── ErrorBoundary.jsx
│   └── PageNotFound.jsx
├── config/
│   └── brand.js               бренд-константы (цвета, тексты)
└── data/
    ├── cases.js               массив кейсов
    └── dashboard-slides.jsx   данные для DashboardSlider

public/
├── demo/                      вшитая сборка CRM (см. scripts/sync-demo.sh)
├── favicon.svg, robots.txt, sitemap.xml

scripts/
└── sync-demo.sh               пересборка demo CRM в public/demo/
```

## Важные особенности

- Все API-вызовы → CRM-бэкенд через `VITE_API_URL` (`api.aivisionpro.ru`).
  Если пусто — fetch пойдёт по относительному пути и не сработает
- Трекинг кликов — через атрибут `data-track` на DOM-элементе
  (handler в `App.jsx`, шлёт в `trackClick` из `lib/tracker.js`).
  Дополнительно: `data-track-block`, `data-track-text`
- SEO через `react-helmet-async`. Все страницы должны быть обёрнуты в `<HelmetProvider>`
- Алиас `@/` → `src/` (см. `jsconfig.json` / `vite.config.js`)
- Стили: Tailwind utility-first, бренд-константы — в `src/config/brand.js`
  и общем дизайн-системе AIVISION (см. одноимённый skill)

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
- **Это техдолг.** Автоматизация через GitHub Action отложена

### Demo gate / post-submit upsell

- После отправки формы заявки (`ContactModal.jsx`) показывается экран с предложением
  открыть демо
- Соответствующие секции: `DemoStrip.jsx`, `StarterBanner.jsx`,
  `ComparisonWithForm.jsx`
- Демо открывается в новой вкладке на `/demo/`

## Окружение

```bash
cp .env.example .env       # VITE_API_URL=https://api.aivisionpro.ru
npm install
npm run dev                # http://localhost:5173
npm run build              # → dist/ для прода
```

## Деплой

`dist/` через Nginx раздаётся с `aivisionpro.ru`. CI/CD — см. `.github/workflows/`.

## Что НЕ делаем

- Не добавляем backend в этот репо — бэк живёт в `AIVISION CRM/backend/`
- Не добавляем state-management (redux/zustand) — лендинг не нуждается
- Не добавляем TypeScript — проект на чистом JS
- Не правим файлы в `public/demo/` руками — это артефакт билда CRM, перезатрётся
  следующим `sync-demo.sh`. Менять надо CRM-репо и пересобирать
- Не делаем fetch на относительные пути — всегда через `VITE_API_URL`
