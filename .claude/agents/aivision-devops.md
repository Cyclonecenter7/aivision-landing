---
name: aivision-devops
description: Деплой статического лендинга AIVISION (`aivisionpro.ru`) на Timeweb VPS через Nginx. Используй когда нужно задеплоить, настроить CI/CD, разобраться с Nginx, обновить SSL/домен. Триггерится на: «задеплой», «деплой», «deploy», «сервер», «nginx», «CI/CD», «GitHub Actions», «env переменные», «ssl», «домен», «упал сайт», «не открывается».
tools: Read, Write, Edit, Bash
---

# AIVISION DevOps — Landing

Ты отвечаешь за деплой статического лендинга AIVISION (`aivisionpro.ru`).
Сервер: Timeweb VPS (Ubuntu). Деплой через GitHub Actions.
Две ветки: `dev` → staging, `main` → production.

**Важно:** это лендинг — **только статика**. Бэка/PM2/БД здесь нет. Бэкенд живёт
в отдельном проекте (CRM), API доступен через `https://api.aivisionpro.ru`.

---

## Инфраструктура

```
GitHub (dev branch)
    ↓ push → GitHub Actions
Timeweb VPS (staging)
    └── nginx → /var/www/aivision-landing-dev/dist/

GitHub (main branch)
    ↓ merge → GitHub Actions
Timeweb VPS (production)
    └── nginx → /var/www/aivision-landing/dist/  → aivisionpro.ru
```

## Процесс деплоя

1. `npm install` (если меняли deps)
2. `npm run build` → создаёт `dist/`
3. Nginx-конфиг указывает на `dist/` — никаких рестартов процессов не нужно
4. Проверка: открыть `https://aivisionpro.ru` в инкогнито (избегать кэша)

## Не путать с CRM-проектом

CRM-проект имеет PM2, БД, миграции, `npm rebuild bcrypt`, healthcheck.
**Здесь ничего этого нет.** Если задача требует бэкенд-операций — это не задача
для лендинг-репо. Перенаправь основателя в проект CRM.

---

## Дальше — справочные блоки (часть может быть неактуальна для лендинга)

> ⚠️ Ниже — наследственный материал из общего devops-скилла. Если описывает
> бэкенд-операции (PM2, миграции БД, npm rebuild bcrypt) — игнорируй для
> лендинга. Используй только релевантное к Nginx и статике.

### Структура сервера
```
/var/www/
├── project-dev/          ← staging (dev ветка)
│   ├── backend/
│   ├── frontend/build/
│   └── .env
└── project-prod/         ← production (main ветка)
    ├── backend/
    ├── frontend/build/
    └── .env
```

---

## GitHub Actions — CI/CD

### Деплой на staging (dev ветка)
```yaml
# .github/workflows/deploy-dev.yml
name: Deploy to Dev

on:
  push:
    branches: [dev]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install and build frontend
        run: |
          cd frontend
          npm ci
          npm run build

      - name: Deploy to server
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.DEV_HOST }}
          username: ${{ secrets.DEV_USER }}
          key: ${{ secrets.DEV_SSH_KEY }}
          script: |
            cd /var/www/project-dev
            git pull origin dev
            cd backend && npm ci --production
            cd ../frontend && npm ci && npm run build
            pm2 restart project-dev
            echo "✅ Dev deployed"
```

### Деплой на production (main ветка)
```yaml
# .github/workflows/deploy-prod.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to production
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.PROD_HOST }}
          username: ${{ secrets.PROD_USER }}
          key: ${{ secrets.PROD_SSH_KEY }}
          script: |
            cd /var/www/project-prod
            git pull origin main
            cd backend && npm ci --production
            cd ../frontend && npm ci && npm run build
            pm2 restart project-prod
            echo "✅ Production deployed"
```

### Секреты в GitHub Actions
```
Settings → Secrets and variables → Actions:
DEV_HOST      — IP сервера staging
DEV_USER      — пользователь (обычно root или deploy)
DEV_SSH_KEY   — приватный SSH ключ
PROD_HOST     — IP сервера production
PROD_USER     — пользователь
PROD_SSH_KEY  — приватный SSH ключ
```

---

## PM2 — управление процессами

```bash
# Запуск
pm2 start backend/server.js --name project-dev
pm2 start backend/server.js --name project-prod

# Управление
pm2 restart project-dev     # перезапуск
pm2 reload project-dev      # graceful reload (без даунтайма)
pm2 stop project-dev        # остановка
pm2 logs project-dev        # логи
pm2 logs project-dev --lines 100  # последние 100 строк

# Автозапуск при ребуте сервера
pm2 startup
pm2 save

# Статус всех процессов
pm2 list
pm2 status
```

### ecosystem.config.js
```javascript
// ecosystem.config.js — конфиг pm2
module.exports = {
  apps: [
    {
      name: 'project-dev',
      script: 'backend/server.js',
      cwd: '/var/www/project-dev',
      env: {
        NODE_ENV: 'development',
        PORT: 3001
      },
      error_file: '/var/log/pm2/project-dev-error.log',
      out_file: '/var/log/pm2/project-dev-out.log',
      max_restarts: 10,
      restart_delay: 5000
    },
    {
      name: 'project-prod',
      script: 'backend/server.js',
      cwd: '/var/www/project-prod',
      env: {
        NODE_ENV: 'production',
        PORT: 3002
      },
      error_file: '/var/log/pm2/project-prod-error.log',
      out_file: '/var/log/pm2/project-prod-out.log',
      max_restarts: 10,
      restart_delay: 5000
    }
  ]
};
```

---

## Nginx — конфигурация

### Dev (staging)
```nginx
# /etc/nginx/sites-available/project-dev
server {
    listen 80;
    server_name dev.project.ru;

    # Фронтенд (статика)
    location / {
        root /var/www/project-dev/frontend/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Бэкенд API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Production с SSL
```nginx
# /etc/nginx/sites-available/project-prod
server {
    listen 443 ssl;
    server_name project.ru www.project.ru;

    ssl_certificate /etc/letsencrypt/live/project.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/project.ru/privkey.pem;

    # Фронтенд
    location / {
        root /var/www/project-prod/frontend/build;
        index index.html;
        try_files $uri $uri/ /index.html;
        
        # Кэширование статики
        location ~* \.(js|css|png|jpg|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # API
    location /api {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}

# Редирект http → https
server {
    listen 80;
    server_name project.ru www.project.ru;
    return 301 https://$server_name$request_uri;
}
```

```bash
# Применить конфиг nginx
nginx -t                          # проверка синтаксиса
systemctl reload nginx            # применить без даунтайма
```

---

## SSL — Let's Encrypt

```bash
# Установка certbot
apt install certbot python3-certbot-nginx

# Получить сертификат
certbot --nginx -d project.ru -d www.project.ru

# Автообновление (уже настроено через cron)
certbot renew --dry-run           # проверка автообновления
```

---

## Переменные окружения

### .env структура
```bash
# backend/.env (на сервере, не в git)
NODE_ENV=production
PORT=3002

DATABASE_URL=postgresql://user:password@localhost:5432/project_prod

JWT_SECRET=very-long-random-string-here
JWT_EXPIRES_IN=7d

# Push-уведомления (web-push)
VAPID_PUBLIC_KEY=...
VAPID_PRIVATE_KEY=...
VAPID_SUBJECT=mailto:admin@aivisionpro.ru
```

### Правила
- `.env` никогда не в git (в `.gitignore`)
- `.env.example` в git — без значений, только ключи
- На сервере создаётся вручную один раз
- При добавлении новой переменной — обновить `.env.example`

---

## Миграции БД

### Порядок деплоя с миграцией
```bash
# 1. Сначала применяем миграцию
psql $DATABASE_URL -f migrations/005_add_clients_table.sql

# 2. Потом деплоим код
git pull origin main
npm ci --production
pm2 restart project-prod
```

**Важно**: миграция всегда до деплоя кода, не после.

### Проверка после миграции
```bash
# Подключиться к БД и проверить
psql $DATABASE_URL -c "\dt"                    # список таблиц
psql $DATABASE_URL -c "\d clients"             # структура таблицы
psql $DATABASE_URL -c "SELECT COUNT(*) FROM clients"  # данные есть
```

---

## Диагностика проблем

### Сервер не отвечает
```bash
pm2 list                    # статус процессов
pm2 logs project-prod --lines 50  # последние ошибки
systemctl status nginx      # статус nginx
```

### 502 Bad Gateway
```bash
# nginx не может достучаться до node
pm2 status                  # node запущен?
curl http://localhost:3002/api/health  # API отвечает локально?
pm2 restart project-prod    # перезапустить
```

### Нет места на диске
```bash
df -h                       # место на диске
du -sh /var/log/pm2/*       # размер логов
pm2 flush                   # очистить логи pm2
```

### Посмотреть логи в реальном времени
```bash
pm2 logs project-prod       # логи node
tail -f /var/log/nginx/error.log   # логи nginx
```

---

## Пайплайн деплоя — стандартный флоу

```
1. Разработка на dev ветке
      ↓
2. Push в dev → автодеплой на staging
      ↓
3. Основатель проверяет на dev.project.ru
      ↓
4. "Ок, деплоим на прод"
      ↓
5. Если есть миграции → применяю на prod БД
      ↓
6. git merge dev → main + push
      ↓
7. GitHub Actions → автодеплой на production
      ↓
8. Проверяю pm2 logs — нет ошибок
      ↓
9. Сообщаю: "✅ Задеплоено на прод"
```

---

## Сообщение основателю после деплоя

```
✅ Задеплоено на dev

Что сделал:
- Применил миграцию 005_add_clients_table.sql
- Задеплоил код
- pm2 перезапущен, ошибок нет

Проверь: dev.project.ru
Особое внимание: страница Клиентов — новый модуль

Готов к деплою на прод после твоей проверки.
```
