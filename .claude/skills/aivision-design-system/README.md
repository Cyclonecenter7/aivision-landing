# AIVISION Design System v1.0

B2B управленческий консалтинг для бизнеса от 10 млн ₽/мес. Строим «Системы управляемой прибыли» (СУП): находим где теряется маржа, внедряем KPI, управленческий учёт, CRM.

> «Мы не даём советы. Мы строим систему и ведём бизнес к результату.»

---

## Продукты

| Продукт | Домен | Описание |
|---|---|---|
| Лендинг | aivisionpro.ru | Маркетинговый сайт: главная, кейсы /case/1–3, блог |
| AIVISION CRM | admin.aivisionpro.ru | Админ-платформа: воронка продаж, финансы, KPI, задачи |

Оба продукта существуют в **multi-tenant** архитектуре — клиент получает клон CRM на своём домене.

---

## Источники

Этот дизайн-системный проект создан на основе:
- `aivision-design-system/` — эталонные HTML-файлы (palette.html, reference-inspire.html, reference-work.html, reference-mobile.html, reference-logo.html, SKILL.md)
- `uploads/` — шрифтовые файлы (Fraunces, IBM Plex Sans/Mono, Inter — legacy) и правила типографики (TYPOGRAPHY-RULES.md)

Ни один из источников не доступен публично — это внутренние материалы AIVISION.

---

## CONTENT FUNDAMENTALS

### Язык и тон

- **Только русский язык.** Никаких смешений с английским в пользовательском тексте.
- **Деловой, диагностический тон** — без хайпа, без восклицаний.
- **Голос «мы»** (от первого лица множественного числа). К читателю — косвенно: _«Собственник видел оборот, но не видел маржи»_.
- **Никаких восклицательных знаков.** Никаких эмодзи. Никаких слов-усилителей («уникальный», «революционный», «гарантированно»).

### Синтаксические паттерны

- **Диагностический триптих:** проблема → механизм → разрешение.
- **Тире вместо глаголов-связок:** _«Доход рос — расходы быстрее.»_
- **Числа со знаком:** `+93%`, `−32%`, `200М+`. Настоящий минус `−` (U+2212), не дефис.
- **Валюта:** `₽` постфиксом, неразрывный пробел: `376 185 ₽`.

### Eyebrow-метки (UPPERCASE)

```
ПРОБЛЕМА · ПРОДУКТЫ · КЕЙСЫ · ДИАГНОСТИКА · СИСТЕМА УПРАВЛЯЕМОЙ ПРИБЫЛИ
МАЙ · 2 ИЗ 31 ДН. · ВОРОНКА · СВОД · СЕГОДНЯ
```

Всегда UPPERCASE, letter-spacing 0.12–0.16em, 10–11px **Plex Mono** (машинный голос).

### CTA-фразы

- «Разобрать бизнес» — главный CTA
- «Начать диагностику»
- «Узнать подробнее»

### Примеры заголовков (Onest — акцент цветом)

- «Бизнес стал *управляемым* — за 30 дней.»
- «Большой оборот, *нулевая прозрачность*: четыре проекта стали...»
- «Бизнес дорос до того момента, когда *ручное управление* начинает стоить миллионы.»

Акцент выделяет 1–3 слова цветом. Один акцент на заголовок.

### Editorial-заголовки в CRM (каждая страница)

```
[ EYEBROW — мелкий контекст ]
[ Заголовок-факт с акцентным числом ]
```

Примеры:
- «МАЙ · 2 ИЗ 31 ДН.» → **«48 новых заявок. +18% к апрелю.»**
- «ПЛАН НА 2 МАЯ» → **«3 задачи на сегодня. 1 просрочена.»**
- «ВОРОНКА · МАЙ» → **«15 сделок в работе. 4,8 М ₽ в пайплайне.»**

---

## VISUAL FOUNDATIONS

### Цвет

7 цветов — закрытая система. Никаких ad-hoc цветов вне палитры.

**Семантика (5):**

| Токен | Hex | Смысл |
|---|---|---|
| `--brand` | `#3F6EE8` | Бренд, маржа, primary CTA, «В работе» |
| `--emerald` | `#10B981` | Доход, успех, «Завершена» |
| `--crimson` | `#F43F5E` | Расход, провал, просрочка, ГОРЯЧИЙ ЛИД |
| `--sun` | `#FCD34D` | В процессе, «Связались», дедлайн, ТЁПЛЫЙ ЛИД |
| `--slate` | `#94A3B8` | Нейтрально, «Недоступен», нет данных, ХОЛОДНЫЙ ЛИД |

**Категориальные (2):**

| Токен | Hex | Смысл |
|---|---|---|
| `--indigo` | `#6366F1` | Второй синий для категорий |
| `--tangerine` | `#FB923C` | Тёплый акцент для категорий |

**Нейтральные (dark theme):**
`bg #0A0A0A · surface #181818 · surface-alt #222222 · border #2A2A2A · border-strong #3A3A3A`
`text-primary #FFFFFF · text-secondary #A3A3A3 · text-muted #666666`

**Нейтральные (light theme):**
`bg #FAFAFA · surface #FFFFFF · surface-alt #F4F4F4 · border #E8E8E8 · border-strong #D4D4D4`
`text-primary #0A0A0A · text-secondary #525252 · text-muted #999999`

Brand `#3F6EE8` одинаков в обеих темах. Hover: `#5A85F0` (dark) / `#2D5BD4` (light).

**4 закона:**
1. Семантика побеждает категорию — emerald нельзя использовать «для красоты»
2. Порядок категориальных фиксирован: `brand → emerald → crimson → sun → indigo → tangerine → slate`
3. Максимум 5 цветов на одном блоке
4. Палитра закрытая — 8-й цвет = переосмыслить структуру блока

### Типографика

**Две семьи, три голоса:**

| Шрифт | Голос | Где |
|---|---|---|
| **Onest** | Бренд | Заголовки, hero, короткие/hero-числа (контраст весом + трекингом), логотип. Лендинг + CRM. |
| **IBM Plex Sans** | Человек | Body, UI, лейблы, кнопки. Везде. |
| **IBM Plex Mono** | Машина | Эйбрау, данные, ПОЛНЫЕ точные числа, даты, ID. `tabular-nums` + слэш-`zero`. |

Fraunces и Inter — **убраны**, не использовать. У Onest нет курсива и оси `opsz`.

**Правила чисел («число = главный объект»)** — утилиты в `colors_and_type.css`, образец `preview/type-hero.html`:
- КОРОТКОЕ display-число → **Onest-тикер** (`.num-ticker`, вес 600), сокращённо («1,54 МЛН ₽»). `.num-ticker--rule` — скос-подчёрк в бренде (эхо знака).
- ПОЛНОЕ точное число → **Plex Mono** (`.num-mono`) — ровные разряды, без слипания.
- Единица (₽, %, МЛН) → приглушённый mono, мельче (`.num-unit`).
- Дельта → `.delta-chip` (mono, скос, цвет статуса ↑/↓). Без «пп».
- База сравнения → **один раз на экран** (`.delta-base`, «Δ к апрелю»), не на каждой карточке.

Акцент в заголовках — 1–3 слова / ключевое число синим `--brand` (только цветом — у Onest нет курсива).

### Chamfer — фирменный скос

**Главная геометрическая подпись бренда.** Скос нижнего правого угла на всех интерактивных и контейнерных элементах — **в hi-fi выводе** (лендинг, CRM, слайды, соц).

⛔ **НЕ в вайрфреймах / lo-fi скетчах / сторибордах.** Там прямые углы. Скос — это финишная полировка бренда; на грубом плоском черновике вырез угла показывает фон-бумагу и читается как «незакрашенный / сломанный угол», а не как подпись. Вайрфрейм = структура, без фирменной геометрии.

```css
clip-path: polygon(0 0, 100% 0, 100% calc(100% - Xpx), calc(100% - Xpx) 100%, 0 100%);
```

Размеры: **один масштаб — `--chamfer` = 10px** на всех hi-fi контейнерах (кнопка, карточка, KPI, hero). **Скос НЕ масштабируется со значимостью** — «чем больше срез, тем важнее» это ловушка: размер начинает нести смысл и каждый ставит свой. Фокус и иерархию задают **движение и цвет**, не величина выреза.

Легаси-шкала (4 / 6 / 8 / 12 / 16 / 20 / 28px) — только для micro-элементов (крошечные теги, чекбоксы), где 10px не влезает. Никогда как сигнал важности.

**Моушн скоса** (`preview/chamfer-motion-lab.html`): срез углубляется на ховере (`.ch-hover`, +6px) и нажатии (`.ch-press`, +8px) — это временный отклик, размер возвращается к 10px; на hero-моментах акцентная линия прочерчивается по контуру (`ChamferBorder`).

⚠ `border` + `clip-path` несовместимы. Для обводки на chamfer-элементах — SVG-overlay `ChamferBorder`.

⛔ **Фокус / выбор на скос-элементе — это `ChamferBorder` SVG-обводка, а НЕ `border`** (главный баг). `border`+`clip-path` рвёт угол. Фокус всегда живёт как `<polygon>`-stroke поверх элемента, повторяя его собственный срез. Спотлайтов с затемнением у нас нет. Два случая: (1) выбор на месте → `ChamferBorder`-обводка (Select-H); (2) фокус поля `:focus-visible` → перекрашенный `ChamferBorder`. Канон: `preview/focus-and-spotlight.html`.

### Без border-radius

**Никаких скруглённых углов** на кнопках, карточках, блоках. Исключения: настоящие круги (аватары, буллеты, ручка Toggle, прогресс-бары).

### Без градиентов

Никаких декоративных градиентов. Допустимо:
- Линейный градиент под линией графика (`stopOpacity 0.25 → 0`)
- Glass `backdrop-filter: blur` только на mobile tab bar (системный iOS-паттерн)
- `box-shadow` на dropdown/popover для отрыва от фона

### Графики — только Monotone curves

Steffen monotone interpolation. Кривая плавная, но НИКОГДА не выходит за фактические значения — профессиональный стандарт финансовых дашбордов (Apple, Stripe, Linear).

Заливка под линией: `stopOpacity 0.25 → 0`. Толщина: 2.25px главные / 1.75px спарклайны.

### Иконография

**Lucide Icons** — только stroke, `stroke-width: 2`, размер 20px. Никаких fill, emoji, иконочных шрифтов.

### Анимации

Базовый easing `cubic-bezier(.4, 0, .2, 1)` (`--ease-ui`). Полный моушн-канон — раздел Motion в `SKILL.md` + живая лаборатория `preview/chamfer-motion-lab.html`, загрузка страницы — `preview/crm-page-load.html`.

- **Скос — субъект движения.** Фокус задаётся движением и цветом, не размером выреза. Покой 10px, ховер `.ch-hover` (+6px) и нажатие `.ch-press` (+8px) углубляют срез временно.
- **Выбор (H):** одна непрерывная линия — на ховере чертится по левому краю, по клику обегает контур, карточка фиксируется выбранной.
- **Фокус-сплит (I):** клик по панели — она растёт, соседи сжимаются в скошенные полосы (flex-grow), скос остаётся 10px.
- **Кнопка-флуд (P):** ховер чертит линию слева, клик заливает кнопку брендом слева направо.
- **Загрузка страницы:** контент въезжает сверху вниз со стаггером (~1с, easeOutQuart). Видимое состояние — базовое; анимация идёт ИЗ скрытого, чтобы печать и no-JS показывали контент.
- **Лоадер:** сам знак-скос в цикле — контур → заливка/дыхание → 4 скос-осколка → линия → повтор.
- `fadeIn` / `barGrow` — лёгкие входы компонентов и роста столбцов. Уважать `prefers-reduced-motion`.

### Карточки

Нет `border-radius`. Есть chamfer 8–10px. Фон `surface`. Без теней — только контраст фонов. На dropdown/popover — `box-shadow`.

### Spacing

Base unit 4px. Gaps: 4 / 6 / 8 / 12 / 14 / 16 / 20 / 24 / 32 / 48 / 56.

### Hover / Press состояния

- Primary кнопка hover: `#5A85F0` (dark) / `#2D5BD4` (light)
- Строки таблицы hover: `surfaceAlt` background
- Прочие элементы hover: `surfaceAlt` background

### Фоновые изображения / текстуры

Нет текстур, нет паттернов, нет фоновых изображений. Чистые плоские фоны.

### Прозрачность / blur

Только на mobile tab bar: `background: rgba(10,10,10,0.72)` + `backdrop-filter: blur(20px) saturate(180%)`.

### Цвет изображений

Фотографии и иллюстрации не используются в UI. Графики и метрики — единственные «визуалы».

---

## ICONOGRAPHY

**Библиотека:** [Lucide](https://lucide.dev/) — stroke only, `stroke-width: 2`, размер 20px по умолчанию.

```html
<!-- CDN подключение -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
```

**Правила:**
- Цвет через `currentColor` — иконки наследуют цвет текста
- Размер 20px в navigation и body; 12–16px внутри кнопок
- Никаких filled-иконок
- Никаких emoji
- Никаких unicode-символов как иконок

**Часто используемые иконки:**
`BarChart2`, `TrendingUp`, `TrendingDown`, `Users`, `ClipboardList`, `DollarSign`, `Calendar`, `Bell`, `Settings`, `ChevronDown`, `ChevronRight`, `X`, `Plus`, `Search`, `ArrowUpRight`

**Логотип (assets/):**

| Файл | Описание |
|---|---|
| `assets/logo-blue.svg` | На тёмном фоне (fill #3F6EE8) |
| `assets/logo-black.svg` | На светлом фоне (fill #0A0A0A) |
| `assets/logo-white.svg` | На синем фоне (fill #FFFFFF) |
| `assets/logo-mono.svg` | Универсальный (fill currentColor) |
| `assets/favicon.svg` | SVG favicon с dark-mode адаптацией |

SVG path (viewBox 256×256):
```
M 0 0 L 256 0 L 256 208 L 208 256 L 0 256 Z
```

Одна chamfer-форма. Никакой внешней рамки. Wordmark: «AIVISION» **Onest 600 UPPERCASE**, монохром — без синего на слове. Скос — только в знаке-метке, не в слове. Без выделения «AI».

---

## Компоненты (React)

Готовые React-компоненты живут в `components/<Name>/` (`.jsx` + `.d.ts` + `.html`-витрина). Компилятор собирает их в `_ds_bundle.js` и публикует на `window.AIVISIONDesignSystem1_f5b66e`. В потребляющем проекте подключи бандл и достань компонент с неймспейса — **не** грузи `.jsx` напрямую через `<script src>`.

```html
<link rel="stylesheet" href="colors_and_type.css"/>
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" ...></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" ...></script>
<script src="_ds_bundle.js"></script>
<script>
  const { Button, Input, KPICard, ChamferBox } = window.AIVISIONDesignSystem1_f5b66e;
</script>
```

| Компонент | Роль | Ключевые props |
|---|---|---|
| **ChamferBox** | Скос-контейнер-примитив с опциональным `rail`-акцентом (chamfer-safe, без border). | `rail?`, `style` |
| **Button** | Скошенное действие. Cut углубляется на press (10→18px), не border. | `variant` (primary/secondary/ghost/danger), `size` (sm/md/lg) |
| **Input** | Скошенное поле. Фокус/ошибка — `ChamferBorder`-обводка по собственному скосу, не outline. | `label?`, `error?`, `disabled?` |
| **Select** | Кастомный дропдаун (замена нативного `<select>`): скошенный триггер + скошенное меню, бренд-галочка. Фокус — `ChamferBorder`; тень меню — `filter: drop-shadow` (не box-shadow). | `options`, `value?`, `defaultValue?`, `placeholder?`, `onChange?`, `error?`, `disabled?` |
| **KPICard** | Метрика дашборда: скос + левый rail, число в Onest, дельта mono-чипом. | `label`, `value`, `delta?`, `direction` (up/down), `accent?` |
| **Badge** | Статус-пилюля / счётчик · микро-скос 4px · тинт или solid · точка. | `variant`, `solid?`, `dot?` |
| **Spinner / Progress** | Indeterminate-кольцо (без скоса — кольцо обводит) + линейный determinate-прогресс (chamfer-safe). | Spinner: `size?`,`color?` · Progress: `value`,`max?`,`color?` |
| **Toast** | Уведомление: скос + rail по типу · slide-in · drop-shadow. | `type` (info/success/error/warning), `title`, `message?`, `onClose?` |
| **Tooltip** | Подсказка по hover/focus · скос + drop-shadow · pop-in · 4 стороны. | `label`, `placement?`, `children` |
| **Menu** | Контекстное меню действий (не Select): иконки, danger, разделители. | `trigger`, `items[]`, `align?` |
| **Modal** | Диалог: fade-scrim + скос-панель pop-in · Esc/скрим/крестик закрывают. | `open`, `onClose`, `title?`, `children`, `footer?`, `width?` |

Правило для всех: **скос ИЛИ border — никогда вместе** (clip-path режет border/box-shadow). Обводка на скос-элементе — только `ChamferBorder` SVG-overlay.

**Starting points** (видны в пикере потребляющих проектов): `ChamferBox` (Компоненты); экраны `crm`, `landing`, `mobile`.

---

## Структура проекта

```
/
├── README.md                    ← этот файл
├── SKILL.md                     ← Claude Agent Skill
├── colors_and_type.css          ← CSS-токены цвета и типографики
├── fonts/                       ← шрифтовые файлы (woff2)
│   ├── (Onest — Google Fonts @import в colors_and_type.css)
│   ├── (IBM Plex Sans / Mono — Google Fonts @import в colors_and_type.css)
│   ├── InterVariable.woff2          ← legacy, не используется
│   ├── InterVariable-Italic.woff2
│   └── Inter-{Regular,Medium,SemiBold,Bold}.woff2
├── assets/                      ← логотипы и SVG-иконки
│   ├── logo-blue.svg
│   ├── logo-black.svg
│   ├── logo-white.svg
│   ├── logo-mono.svg
│   └── favicon.svg
├── components/                  ← React-компоненты (.jsx + .d.ts + .html-витрина)
│   ├── ChamferBox/              ← скос-контейнер-примитив
│   ├── Button/                  ← скошенная кнопка
│   ├── Input/                   ← скошенное поле + ChamferBorder-фокус
│   ├── Select/                  ← кастомный дропдаун (замена нативного select)
│   ├── KPICard/                 ← метрика дашборда
│   ├── Badge/                   ← статус-пилюля / счётчик
│   ├── Spinner/                 ← Spinner (кольцо) + Progress (линейный)
│   ├── Toast/                   ← уведомление
│   ├── Tooltip/                 ← подсказка по hover/focus
│   ├── Menu/                    ← контекстное меню действий
│   └── Modal/                   ← диалог
├── preview/                     ← HTML-карточки дизайн-системы
│   ├── colors-semantic.html
│   ├── colors-neutrals-dark.html
│   ├── colors-neutrals-light.html
│   ├── colors-light-theme.html
│   ├── type-hero.html
│   ├── type-scale.html
│   ├── type-tricks.html
│   ├── type-ui.html
│   ├── spacing-chamfer.html
│   ├── spacing-tokens.html
│   ├── spacing-animations.html   ← группа Motion
│   ├── chamfer-motion-lab.html   ← группа Motion
│   ├── focus-and-spotlight.html
│   ├── brand-logo.html
│   ├── brand-social.html
│   ├── crm-page-load.html
│   ├── components-buttons.html
│   ├── components-inputs.html
│   ├── components-tags.html
│   ├── components-kpi.html
│   ├── components-skeleton.html
│   ├── components-charts.html
│   └── components-table.html
└── ui_kits/
    ├── landing/                 ← Лендинг aivisionpro.ru
    │   └── index.html
    ├── crm/                    ← Admin CRM admin.aivisionpro.ru
    │   └── index.html
    └── mobile/                 ← Mobile CRM (iOS)
        └── index.html
```
