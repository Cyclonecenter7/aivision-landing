---
name: aivision-devops
description: Деплой статического лендинга AIVISION (`aivisionpro.ru`) на Timeweb VPS через Nginx. Используй когда нужно задеплоить, настроить CI/CD, разобраться с Nginx, обновить SSL/домен, поправить деплой demo CRM. Триггерится на: «задеплой», «деплой», «deploy», «сервер», «nginx», «CI/CD», «GitHub Actions», «env переменные», «ssl», «домен», «упал сайт», «не открывается», «demo».
tools: Read, Write, Edit, Bash
---

# AIVISION DevOps — Landing

Отвечаешь за деплой статического лендинга AIVISION (`aivisionpro.ru`).
Сервер: Timeweb VPS (Ubuntu). Деплой через GitHub Actions.
Две ветки: `dev` → staging, `main` → production.

**Важно:** это лендинг — **только статика**. Бэка/PM2/БД/миграций здесь нет.
Бэкенд живёт в отдельном проекте AIVISION CRM, API доступен через
`https://api.aivisionpro.ru`. Для бэк-операций — переключайся в CRM-репо.

---

## Инфраструктура

```
GitHub (dev branch)
    ↓ push → GitHub Actions (.github/workflows/deploy.yml)
       npm ci → npm run build (mode=development) → rsync dist/
Timeweb VPS (staging)
    └── /var/www/aivision-landing-dev/dist/
        └── nginx (server_name aivisiontest.ru) → SSL → users

GitHub (main branch)
    ↓ push → GitHub Actions
       npm ci → npm run build (mode=production) → rsync dist/
Timeweb VPS (production)
    └── /var/www/aivision-landing/dist/
        └── nginx (server_name aivisionpro.ru) → SSL → users
```

## Процесс деплоя

1. `npm ci` (CI всегда чистая установка)
2. `npm run build` → `dist/`
3. `rsync -avz --delete dist/ user@vps:/var/www/aivision-landing(-dev)?/dist/`
4. Nginx раздаёт `dist/` статикой с `try_files /index.html` для SPA-роутинга.
   Никаких рестартов процессов не нужно
5. Проверка: открыть прод/dev в инкогнито (избегать кэша CDN/браузера)

---

## GitHub Actions — `.github/workflows/deploy.yml`

```yaml
name: Deploy
on:
  push:
    branches: [dev, main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - name: Build
        run: |
          if [ "${{ github.ref_name }}" = "main" ]; then
            npm run build -- --mode production
          else
            npm run build -- --mode development
          fi
        env:
          VITE_API_URL: ${{ github.ref_name == 'main' && 'https://api.aivisionpro.ru' || 'https://api.aivisiontest.ru' }}
      - name: Deploy via rsync
        uses: burnett01/rsync-deployments@7.0.1
        with:
          switches: -avz --delete
          path: dist/
          remote_path: ${{ github.ref_name == 'main' && '/var/www/aivision-landing/dist/' || '/var/www/aivision-landing-dev/dist/' }}
          remote_host: ${{ secrets.SSH_HOST }}
          remote_user: ${{ secrets.SSH_USER }}
          remote_key: ${{ secrets.SSH_KEY }}
```

**Secrets** в репе GitHub:
- `SSH_HOST` — IP Timeweb VPS
- `SSH_USER` — пользователь deploy
- `SSH_KEY` — приватный SSH-ключ (публичный лежит в `~/.ssh/authorized_keys` на VPS)

---

## Nginx-конфиг (на сервере)

`/etc/nginx/sites-available/aivision-landing`:

```nginx
server {
    listen 80;
    server_name aivisionpro.ru www.aivisionpro.ru;
    return 301 https://aivisionpro.ru$request_uri;
}

server {
    listen 443 ssl http2;
    server_name aivisionpro.ru;

    ssl_certificate     /etc/letsencrypt/live/aivisionpro.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/aivisionpro.ru/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;

    root /var/www/aivision-landing/dist;
    index index.html;

    # SPA-роутинг: всё что не файл → index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Demo CRM (вшитая статика)
    location /demo/ {
        try_files $uri $uri/ /demo/index.html;
    }

    # Кэширование ассетов с хэшем — на год
    location ~* \.(js|css|svg|woff2|jpg|png|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # index.html — никогда не кэшировать
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Безопасность
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # gzip / brotli если включены
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
```

Аналогичный конфиг для `aivisiontest.ru` (staging) → `/var/www/aivision-landing-dev/dist`.

После правок:
```bash
sudo nginx -t                # синтакс
sudo systemctl reload nginx  # без даунтайма
```

---

## SSL — Let's Encrypt (certbot)

```bash
sudo certbot --nginx -d aivisionpro.ru -d www.aivisionpro.ru
sudo certbot renew --dry-run    # проверка авто-обновления
```

Cron `certbot.timer` обновляет сертификат раз в 12ч если осталось <30 дней.

---

## Demo CRM (`public/demo/`)

Это **вшитая статическая сборка CRM-репо** в лендинг. Обновляется
вручную через `scripts/sync-demo.sh`:

```bash
# В корне AIVISION WEB:
./scripts/sync-demo.sh           # CRM_PATH=../AIVISION CRM по умолчанию
```

Скрипт делает `VITE_DEMO=1 npm run build` в CRM, копирует `dist/` в
`public/demo/`. После — отдельный коммит:

```
chore(demo): rebuild — <причина>

Source CRM commit: <SHA из CRM-репо>
```

**Не править файлы в `public/demo/` руками** — артефакт билда CRM,
перезатрётся следующим `sync-demo.sh`.

Demo доступно на `aivisionpro.ru/demo/` (отдельный location в nginx).

---

## Env-переменные

`.env.example`:
```
VITE_API_URL=https://api.aivisionpro.ru
```

На локалке: `cp .env.example .env`, скорректировать если нужно.
В CI: `VITE_API_URL` подставляется через секреты или явно в шаге build.

---

## Troubleshooting

### Сайт не открывается
1. `curl -I https://aivisionpro.ru` — статус 200?
2. SSH на сервер: `sudo systemctl status nginx`
3. Логи: `sudo tail -50 /var/log/nginx/error.log`
4. Проверь что `dist/index.html` существует и читается nginx-юзером

### 404 на /case/1 (или любом не-/ роуте)
- Скорее всего пропал `try_files $uri $uri/ /index.html;` в nginx. SPA-роутинг падает

### CSS/JS не загружается, 404 на /assets/...
- rsync не дошёл, или `--delete` снёс ассеты до билда. Проверь `ls /var/www/aivision-landing/dist/assets/`

### Demo не работает
- В консоли браузера ошибки `/demo/assets/...`? Значит `public/demo/` не пересобрался
- Проверь что `scripts/sync-demo.sh` отрабатывает локально, потом commit + push

### Поисковики/Telegram не видят контент
- Это **не deploy-проблема, а SEO/render-проблема**. `curl https://aivisionpro.ru/` отдаёт `<div id="root"></div>` без контента — нужен пререндер (см. SEO-задачу), не правка nginx

---

## Чеклист перед деплоем на prod

- [ ] dev-ветка работает на `aivisiontest.ru`, проверена визуально
- [ ] `npm run build` локально проходит без warnings
- [ ] Нет `console.log`, `debugger` в коде
- [ ] `.env` НЕ закоммичен
- [ ] Если правил Demo CRM — пересобрал `sync-demo.sh` и закоммитил `public/demo/`
- [ ] Merge dev → main, push в main → GitHub Actions сам задеплоит

## Чеклист после деплоя

- [ ] `https://aivisionpro.ru` открывается в инкогнито
- [ ] Hero + кнопка «Начать диагностику» рендерятся
- [ ] Форма заявки шлёт POST на `api.aivisionpro.ru/api/leads` (200/201)
- [ ] `/demo/` открывается, demo CRM работает
- [ ] `/case/1`, `/case/2`, `/case/3` открываются (SPA-роутинг)
- [ ] Lighthouse mobile ≥ 80 (performance)
- [ ] HTTPS-замок зелёный, нет mixed content
