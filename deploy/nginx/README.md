# Nginx configs

Актуальный production-контур:

- `shvec-security-prod.conf` — заголовки безопасности и CSP для `shvec.tech`;
- `shvec.tech.landing-block.conf` — vhost публичного сайта;
- HTML кешируется на 5 минут в браузере и сутки на shared cache, хешированные ассеты — на год.

Файлы с `aivision*` в названии оставлены как легаси-конфигурация старых доменов.

Серверные конфиги для AIVISION Landing. Источник правды для конфига на сервере.
Бэкап `/etc/nginx/sites-enabled/aivisiontest.ru.bak-pre-astro-*` лежит в `/root/nginx-backups/` на сервере.

## Файлы

- `aivision-security-dev.conf` — snippet для include в каждый location/server.
  Содержит HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy,
  X-Robots-Tag noindex (dev only), CSP с api.aivisiontest.ru/Метрикой/GA4.
  Лежит на сервере в `/etc/nginx/snippets/aivision-security-dev.conf`.

- `aivisiontest.ru.landing-block.conf` — landing-блок server в
  `/etc/nginx/sites-enabled/aivisiontest.ru`. Подключает snippet,
  error_page 404 → /404.html, try_files $uri $uri/ =404 (без SPA-fallback,
  Astro генерирует явные роуты).

## Зачем include в каждый location

Nginx `add_header` НЕ наследуется из server в location если в location
есть собственный `add_header`. Без include в каждом блоке security headers
теряются на запросах к JS/CSS/index.html.

## Для prod (aivisionpro.ru)

Когда выкатываем Astro в prod — сделать `aivision-security-prod.conf`:
- Без `X-Robots-Tag noindex`
- CSP `connect-src` указать `api.aivisionpro.ru` вместо `aivisiontest.ru`
