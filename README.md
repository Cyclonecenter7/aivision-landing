# AIVISION Landing

Лендинг-сайт. Только фронтенд (статика, билд через Vite).

Все API-вызовы (трекинг, заявки) идут на отдельный CRM-бэкенд через `VITE_API_URL`.

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

Минимум: `react`, `react-dom`, `react-router-dom`, `lucide-react`. Всё.

## API URL

`VITE_API_URL` обязательна. Если пусто — fetch идёт по относительному пути и не будет работать после разделения с CRM.
