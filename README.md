# AIVISION Landing

Лендинг-сайт. Только фронтенд (статика, билд через Vite).

Все API-вызовы (трекинг, заявки) идут на отдельный CRM-бэкенд через `VITE_API_URL`.

Подробный контекст для агентов — в [`CLAUDE.md`](./CLAUDE.md).

## Запуск локально

```bash
cp .env.example .env       # отредактировать VITE_API_URL
npm install
npm run dev                # http://localhost:5173
```

## Прод-билд

```bash
npm run build              # → dist/
```

`dist/` раздаётся через Nginx с домена `aivisionpro.ru`.

## Зависимости

Минимум: `react`, `react-dom`, `react-router-dom`, `react-helmet-async`, `lucide-react`. Всё.

## API URL

`VITE_API_URL` обязательна. Если пусто — fetch идёт по относительному пути и не будет работать после разделения с CRM.

## Demo CRM (`public/demo/`)

В `public/demo/` лежит вшитая статическая сборка CRM-фронтенда — интерактивное демо
на лендинге (`/demo/`). Пересобирается вручную после изменений в CRM-репо:

```bash
./scripts/sync-demo.sh     # билд CRM с VITE_DEMO=1 → копия в public/demo/
git add public/demo
git commit -m "chore(demo): rebuild — <причина>"
```

Скрипт ожидает CRM в `../AIVISION CRM` (можно переопределить `CRM_PATH`).
Автоматизация через GitHub Action — отложено, текущий процесс ручной (тех долг).

## Demo gate

На лендинге после отправки формы заявки показывается post-submit upsell-экран
с предложением открыть демо. См. `src/components/landing/ContactModal.jsx`,
`DemoStrip.jsx`, `StarterBanner.jsx`. Демо открывается на `/demo/`.
