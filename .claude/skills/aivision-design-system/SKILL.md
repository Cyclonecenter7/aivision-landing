---
name: aivision-design-system
description: Use this skill to generate well-branded interfaces and assets for AIVISION — a Russian B2B management consulting platform. Two type families, three voices: Onest (brand/headlines/hero numbers), IBM Plex Sans (UI/body), IBM Plex Mono (data/labels/numbers). Covers marketing landing, CRM admin, social media, slides — plus a chamfer motion system. Contains design guidelines, color tokens, typography, fonts, UI kit prototypes, and a full Instagram/Threads social design canon.
user-invocable: true
---

Read this file fully, then explore the other available files as needed.

If creating visual artifacts (slides, mocks, prototypes, social posts), copy assets out and create static HTML files. If working on production code, read the rules here to become an expert in designing with this brand.

If invoked without guidance — ask what to build, ask questions, act as expert designer outputting HTML artifacts or production code.

## Quick start

1. `README.md` — company context, CONTENT FUNDAMENTALS, VISUAL FOUNDATIONS, ICONOGRAPHY
2. `colors_and_type.css` — all CSS tokens (colors, type scale, chamfer helpers, animations)
3. UI reference — `ui_kits/landing/index.html` / `ui_kits/crm/index.html` / `ui_kits/mobile/index.html`
4. Component reference — `preview/` folder (25+ cards)
5. Fonts — self-hosted in `fonts/` or Google Fonts CDN
6. Slides — `slides/index.html` (6-slide pitch deck template)
7. Social — `social/reference-carousel.html` (эталон) + `social/tokens.html`

---

## Три поверхности — три канона

| Задача | Канон | Файлы |
|---|---|---|
| Лендинг, кейсы, маркетинговые страницы | **Landing** — Onest + Plex Sans | `ui_kits/landing/index.html` |
| CRM-дашборд, заявки, финансы, задачи | **CRM** — Onest + Plex Sans + Plex Mono | `ui_kits/crm/index.html`, `ui_kits/mobile/index.html` |
| Instagram / Threads — карусели, посты | **Social** — только Plex Sans, 3 фона | см. раздел ниже |
| Питч-деки, презентации | **Slides** — Onest + Plex Sans/Mono | `slides/index.html` |

---

## Core design rules (must follow)

- **7-color closed palette** — brand #3F6EE8, emerald #10B981, crimson #F43F5E, sun #FCD34D, slate #94A3B8, indigo #6366F1, tangerine #FB923C. No ad-hoc colors.
- **Chamfer** — `clip-path: polygon(0 0, 100% 0, 100% calc(100% - Xpx), calc(100% - Xpx) 100%, 0 100%)` on all interactive/container elements **in hi-fi output (landing, CRM, slides, social)**. **One scale: `--chamfer` = 10px everywhere** — chamfer does NOT scale with importance ("bigger cut = more focus" is a trap); focus & hierarchy come from **motion + colour** (`.ch-hover` / `.ch-press` / `ChamferBorder` draw — see `preview/chamfer-motion-lab.html`). No border-radius (except true circles). ⛔ **NOT in wireframes / lo-fi sketches / storyboards** — those use plain square corners.
- **Focus / selection on a chamfered element = `ChamferBorder` SVG stroke, NEVER a chamfered `border`** (the #1 bug). `border`+`clip-path` tears the cut corner. Focus always lives as a `<polygon>` stroke overlay tracing the element's OWN chamfer. We do NOT use spotlight/dimming overlays. Two cases: (1) in-place selection → `ChamferBorder` stroke (Select-H); (2) input `:focus-visible` → recoloured `ChamferBorder`. Canon: `preview/focus-and-spotlight.html`.
- **No gradients** — except linear gradient under chart lines (opacity 0.25 → 0) and glass blur on mobile tab bar.
- **2 families, 3 voices** — **Onest** = brand voice (headlines, hero/short numbers, logo; neo-grotesque with native Cyrillic — contrast comes from weight + tight tracking, NOT optical size). **IBM Plex Sans** = human voice (body, UI, labels, buttons). **IBM Plex Mono** = machine voice (eyebrows, table data, FULL precise numbers, dates, IDs; `tabular-nums` + slashed `zero`). Never reach for Inter or Fraunces — they are gone. Onest has no italic and no `opsz` axis — never apply `font-style:italic` or `font-variation-settings:opsz` to it.
- **Number system — «число = главный объект»** (see `preview/type-hero.html` + utilities in `colors_and_type.css`):
  - SHORT display number → **Onest ticker** (`.num-ticker`, weight 600), abbreviated («1,54 МЛН ₽», «48», «18%»). `.num-ticker--rule` adds the brand chamfer-underline (echoes the logo mark).
  - FULL precise number → **Plex Mono** (`.num-mono`) — even digit groups, no display-font cramping.
  - Unit (₽, %, МЛН) → muted mono, smaller (`.num-unit`).
  - Delta → `.delta-chip` (mono, chamfer, status colour: `--up` emerald ↑ / `--down` crimson ↓). NO «пп» jargon.
  - Comparison baseline → stated **ONCE per screen** (`.delta-base`, e.g. «Δ к апрелю»), never repeated on every card.
- **Display accent** — 1–3 words / the key number in headings coloured `--brand` (colour only — Onest has no italic).
- **Monotone curves** — Steffen interpolation for all line charts (copy `smooth()` from `ui_kits/crm/index.html`).
- **Editorial page headers** — every CRM page: mono eyebrow + Onest heading with a factual statement and a coloured accent number.
- **Logo** — clean **Onest wordmark** (`.logo-wordmark`, weight 600 UPPERCASE), monochrome (no blue tint on the word). The chamfer lives ONLY in the square mark — never a second chamfer in the wordmark. No «AI» highlight.
- **Lucide icons** — stroke only, stroke-width 2, 20px. No emoji.
- **Russian language** — diagnostic tone, no exclamations, no hype words. Real minus U+2212, non-breaking space in ₽ amounts.
- **Dark theme default** — bg #0A0A0A, surface #181818, surface-alt #222222. Light theme: bg #FAFAFA, surface #FFFFFF.

---

## Motion canon

Token reference + principles: **`preview/motion-principles.html`** (durations, easing roles, interaction→token map). State set: **`preview/interaction-states.html`**. Live lab: **`preview/chamfer-motion-lab.html`**. Page-load: **`preview/crm-page-load.html`**.

**Живой бренд — но движение по делу.** AIVISION должен ощущаться живым продуктом, а не статичной макеткой: знак-скос дышит, числа набегают, контент въезжает под фирменным углом. Это «продуктовый вайб» — интерфейс реагирует и подтверждает действия. Но движение — это инструмент смысла, не украшение:
- **Анимируй там, где есть событие:** загрузка (лоадер-знак), появление данных (count-up, page-load reveal), действие пользователя (ховер/клик/флуд кнопки, выбор карточки), смена состояния (тосты, раскрытие поиска), переход. Движение **отвечает** на что-то.
- **НЕ анимируй ради красоты:** никаких вечных декоративных циклов на контенте, параллакса, «плавающих» элементов, аним-на-скролл просто потому что можно. Если убрать анимацию и смысл не теряется — убери её.
- **Каждое движение — про скос.** Скос прочерчивается, углубляется, обегает контур, режется при въезде, рассыпается на скос-осколки. Движение носит бренд, а не живёт отдельно.
- **Токены, а не магические числа.** Длительности: `--dur-instant 80ms` (hover-тинт), `--dur-fast 140ms` (press/фокус/чипы), `--dur-base 220ms` (меню/тосты/смена состояния), `--dur-slow 360ms` (модалки/page-load). Easing-роли: `--ease-out` (вход+UI), `--ease-in` (уход), `--ease-in-out` (перемещение), `--ease-spring` (акцент, лёгкий overshoot — только модалка/tooltip/ключевой выбор). Никаких длительностей >360ms в UI. Карта интеракция→токен — в `motion-principles.html`.
- **Тихий каркас.** Таблицы, шапки, разделители, плотные списки не дёргаются. Жизнь — в акцентных моментах (KPI, hero, CTA, лоадер, тосты), не везде сразу.

- **Chamfer is the motion subject.** Focus/hierarchy = motion + colour, never a bigger cut. The 10px rest cut deepens **transiently**: `.ch-hover` (+6px) on hover, `.ch-press` (+8px) on click — always returns to 10px.
- **Select (H)** — one continuous accent line: on hover it draws down the left edge; on click it wraps the full chamfer outline and the card latches «selected». One stroke, no parallel elements.
- **Focus-split (I)** — focus at the LAYOUT level: click a panel → it grows, siblings collapse to chamfered slivers (flex-grow); cut stays 10px, colour rail intensifies.
- **Button flood (P)** — chamfered button (action = static cut, no deepen): hover draws a left-edge line, click floods the brand colour left→right.
- **Page-load** — content rises + fades top-down, staggered ~60→430ms, easeOutQuart, ~1s total. Visible end-state is the BASE style; animate FROM hidden gated on a `.reset`/replay so print & no-JS show content. Never leave content stuck at opacity 0.
- **Loader** — the brand mark itself, one looped cycle: contour draws → fills & breathes → shatters into 4 chamfer shards → shards merge into a line → repeat (`O` in the lab).
- **Numbers count up**, **toasts** fly in from the corner with the chamfer cutting in, **histogram** bars grow from the bottom with a top-left chamfer.
- **Respect `prefers-reduced-motion`** — keep the FADE, drop movement & scale. All entrance keyframes are redefined opacity-only and chamfer-deepen/spinner are suppressed under the media query (already wired in `colors_and_type.css`). Content still appears — just without travel or spring.

---

## Social Canon — Instagram / Threads

Использовать когда нужен статичный медиа-контент для соцсетей: карусели, одиночные посты, обложки.
**Открой `social/reference-carousel.html` первым** — эталонная карусель из 6 слайдов со всеми паттернами.
**Токены и размеры:** `social/tokens.html`.

### Холст и логотип
- Размер: **1080×1080 px** (1:1). Padding: **8%** со всех сторон = 86px.
- Логотип **на каждом слайде**, top 8% left 8%. Метка 44×44px, wordmark **Onest 600 UPPERCASE** ls 0.02em (был Inter — больше нет).
- Chamfer на метке: `clip-path: polygon(0 0, 100% 0, 100% 81%, 81% 100%, 0 100%)`
- Цвет метки: на белом → `#0A0A0A`; на чёрном → `#3F6EE8`; на синем → `#FFFFFF`

### Три фона — строго
```
WHITE  #FAFAFA   обложки, основная масса слайдов
BLACK  #0A0A0A   контраст, раскрытие, финал
BLUE   #3F6EE8   кульминация — один раз за карусель
```
Никаких других цветов. Синий — только 1 раз. Не больше 2 одинаковых фонов подряд.

### Шрифт — только IBM Plex Sans
| Роль | Preview 340px | На 1080px | Weight |
|---|---|---|---|
| H1 (обложка) | 22px | 55–110px (по длине) | 800 |
| H2 (заголовок слайда) | 19px | 80px | 800 |
| Sub | 11px | 35px | 500 |
| Eyebrow | 8px | 25px | 600 UPPERCASE ls 0.15em |
| Body | 10px | 32px | 400 |
| Level num | 11px | 35px | 700 |
| Level title | 13px | 41px | 700 |

H1 на 1080px подбирается по длине: короткий (≤4 слова) → 90–110px; средний → 70–85px; длинный (6+ слов) → 55–70px. Самое длинное слово должно занимать 35–55% рабочей ширины (907px).

### Цвета на слайде
- На белом: текст `#0A0A0A`, muted `#525252`, акцент `#3F6EE8`
- На чёрном: текст `#FFFFFF`, muted `#A3A3A3`, акцент `#3F6EE8`
- На синем: текст `#FFFFFF`, muted `rgba(255,255,255,.78)`, акцентов нет
- **Запрещены:** emerald, crimson, sun, slate на слайдах соцсетей

### Структура карусели
```
1/N  Обложка     WHITE   H1 + sub
2/N  Постановка  WHITE   body ×3 фразы
3/N  Раскрытие   BLACK   level-num с divider
4/N  Раскрытие   WHITE   level-num с divider
5/N  Кульминация BLUE ★  eyebrow + H2 + body  ← один раз
6/N  Финал       BLACK   вопрос или CTA
```

### Правила текста
- Body ≤ 3 строк на слайд. Заголовок 2–4 строки.
- Переносы через `<br>`, слова-связки через `&nbsp;`.
- Тон диагностический, без восклиций и эмодзи.
- CTA в финале — вопрос, не «жми ссылку».

### Чек-лист перед выдачей
- [ ] Логотип на каждом слайде, правильный цвет метки
- [ ] Padding 8% соблюдён
- [ ] Синий фон ровно 1 раз (или не встречается)
- [ ] Только Plex Sans, только три фона
- [ ] Никаких border-radius, градиентов, теней
- [ ] Body ≤ 3 строк, H1 по § 4.2 (35–55% рабочей ширины)
- [ ] При экспорте PNG: рендер → сверка с критерием ширины → итерация (не показывать первый рендер без сверки)
