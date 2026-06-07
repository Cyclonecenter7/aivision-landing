# AIVISION — Шрифты бренда

Это набор шрифтов и правил типографики для бренда AIVISION (B2B-консалтинг, СУП — Система управляемой прибыли).

## Содержимое

```
aivision-fonts/
├── README.md                      ← ты здесь
├── TYPOGRAPHY-RULES.md            ← правила использования (засунуть в Claude Design)
├── Fraunces/                      ← serif для лендинга и кейсов
│   ├── Fraunces-VariableFont.ttf
│   ├── Fraunces-Italic-VariableFont.ttf
│   └── OFL.txt
├── SpaceGrotesk/                  ← display sans для CRM
│   ├── SpaceGrotesk-VariableFont.ttf
│   └── OFL.txt
└── Inter/                         ← UI sans для всего
    ├── InterVariable.woff2
    ├── InterVariable-Italic.woff2
    ├── Inter-Regular.woff2
    ├── Inter-Medium.woff2
    ├── Inter-SemiBold.woff2
    ├── Inter-Bold.woff2
    └── LICENSE.txt
```

Все шрифты — бесплатные, под лицензией SIL Open Font License (OFL) или MIT (Inter). Можно использовать в коммерческих проектах без ограничений.

## Что куда грузить

### В Claude Design (форма "Add fonts, logos and assets")
- Перетащи ВСЕ файлы шрифтов (3 папки × файлы) одним заходом
- Также добавь `TYPOGRAPHY-RULES.md` — Claude прочитает правила

### В код проекта (aivision-landing, aivision-crm)
1. Положи файлы в `public/fonts/` (или аналог)
2. Подключи через `@font-face` в CSS:

```css
/* Fraunces — Variable */
@font-face {
  font-family: 'Fraunces';
  src: url('/fonts/Fraunces-VariableFont.ttf') format('truetype-variations');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Fraunces';
  src: url('/fonts/Fraunces-Italic-VariableFont.ttf') format('truetype-variations');
  font-weight: 100 900;
  font-style: italic;
  font-display: swap;
}

/* Space Grotesk — Variable */
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/SpaceGrotesk-VariableFont.ttf') format('truetype-variations');
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}

/* Inter — Variable */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/InterVariable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Inter';
  src: url('/fonts/InterVariable-Italic.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-style: italic;
  font-display: swap;
}
```

Или подключи через Google Fonts CDN (быстрее, если не критично сидеть на self-hosted):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&family=Inter:wght@400..700&family=Space+Grotesk:wght@400..700&display=swap" rel="stylesheet">
```

## Лицензии

- **Inter** — SIL Open Font License 1.1 (см. `Inter/LICENSE.txt`)
- **Fraunces** — SIL Open Font License 1.1 (см. `Fraunces/OFL.txt`)
- **Space Grotesk** — SIL Open Font License 1.1 (см. `SpaceGrotesk/OFL.txt`)

Все три можно использовать в коммерческих проектах, на сайтах, в приложениях, в маркетинговых материалах без отчислений. Запрещено продавать сами шрифты отдельно от продукта.
