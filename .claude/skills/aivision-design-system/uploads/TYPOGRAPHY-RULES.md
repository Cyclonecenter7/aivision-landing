# AIVISION — Правила типографики

Трёхшрифтовая система, бесплатные шрифты (SIL OFL / MIT). Закрытый набор — никаких альтернатив, никаких подмен.

---

## Три шрифта, три роли

### 1. Fraunces — лендинг и кейсы

Editorial serif с характером. Используется на маркетинговых поверхностях: главная страница aivisionpro.ru, страницы кейсов /case/1–3, блог, лонгриды, маркетинговые материалы.

**Где:** только лендинг и кейсы. В CRM не использовать.

**Веса:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold).

**Стили:** Normal + Italic. Курсив — для editorial-акцентов в заголовках (см. примеры ниже).

**Использовать для:**
- Hero-заголовков (H1) на лендинге и в кейсах (40–80px)
- Заголовков секций (H2) на лендинге (28–40px)
- Editorial-акцентов курсивом внутри заголовков (`<em>`)
- Тайтлов карточек кейсов
- CTA-блоков с большой фразой
- Цитат и pull-quotes в кейсах

**НЕ использовать для:**
- Кнопок, тегов, лейблов (это Inter)
- UI-элементов в CRM
- Длинного body-текста (мелких размеров от 11 до 17px — это Inter)
- Цифр в KPI и таблицах CRM (это Space Grotesk)

**Технические свойства:**
- `letter-spacing: -0.018em` до `-0.028em` на крупных размерах
- `line-height: 1.0` до `1.15` для заголовков
- `font-style: italic` для акцентов — курсив Fraunces настоящий, нарисованный отдельно

**Кириллица:** полная поддержка.

---

### 2. Space Grotesk — CRM display

Геометрический display sans с характером. Используется в админ-интерфейсе AIVISION CRM (admin.aivisionpro.ru) для крупных элементов: PageHeader, акцентных чисел, KPI, заголовков секций.

**Где:** только CRM. На лендинге не использовать.

**Веса:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold).

**Стили:** только Normal — у Space Grotesk нет курсива.

**Использовать для:**
- PageHeader: акцентное число (60–96px) + заголовок страницы (28–36px)
- KPI-карточек: значения метрик (28–40px)
- Заголовков секций в CRM (18–24px)
- Цифр в таблицах транзакций, если нужен характер (опционально — для важных сумм)
- Лого AIVISION CRM в топ-баре

**НЕ использовать для:**
- Лендинга в любом виде
- Body-текста, форм, кнопок (это Inter)
- Мелких UI-элементов (всё что <18px — это Inter)
- Длинного текста

**Технические свойства:**
- `letter-spacing: -0.025em` до `-0.045em` на крупных размерах
- `font-variant-numeric: tabular-nums` — обязательно на всех числах
- `line-height: 0.95` до `1.1` для крупных значений
- Веса: 500 для заголовков, 700 для KPI и акцентных чисел

**Кириллица:** полная поддержка.

---

### 3. Inter — UI везде

Универсальный UI-шрифт. Спроектирован специально для интерфейсов и плотных данных. Используется везде, где нужна читаемость на 11–17px: таблицы, формы, кнопки, мелкие лейблы, body-текст.

**Где:** везде. Лендинг, кейсы, CRM, любые продуктовые поверхности AIVISION.

**Веса:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold).

**Стили:** Normal + Italic (но Italic используется крайне редко).

**Использовать для:**
- Body-текста на лендинге и в кейсах (15–17px)
- Таблиц транзакций, клиентов, сделок в CRM
- Кнопок (все размеры)
- Форм, инпутов, лейблов
- Eyebrow-меток (`UPPERCASE LETTERSPACED`)
- Тегов, пиллов, статусов
- Навигации (топ-бар, меню, ссылки)
- Всех элементов меньше 20px
- Меток на графиках и оси

**НЕ использовать для:**
- Крупных заголовков на лендинге (это Fraunces)
- Акцентных чисел в CRM PageHeader (это Space Grotesk)

**Технические свойства:**
- `font-feature-settings: 'cv11', 'ss01'` — рекомендуемые альтернативы (single-storey a, прямая l)
- `font-variant-numeric: tabular-nums` на всех числовых данных в таблицах
- `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale` — обязательно на dark theme
- `letter-spacing: -0.01em` на крупных размерах (20px+), `0` на мелких
- `letter-spacing: 0.12em–0.16em + text-transform: uppercase` для eyebrow-меток

**Кириллица:** полная поддержка.

---

## Карта применения по типам контента

### Лендинг (aivisionpro.ru)

| Элемент | Шрифт | Вес | Размер |
|---|---|---|---|
| Hero H1 | Fraunces | 500 | 64–80px |
| Hero курсивный акцент | Fraunces Italic | 500 | 64–80px |
| Section H2 | Fraunces | 500 | 40–48px |
| Body lead | Inter | 400 | 16–18px |
| Body | Inter | 400 | 15px |
| Eyebrow | Inter | 600 | 11px, uppercase, ls .16em |
| Кнопки CTA | Inter | 700 | 13px, uppercase, ls .06em |
| Tag/Pill | Inter | 700 | 10px, uppercase, ls .13em |
| Лого AIVISION | Inter | 700 | 13px, uppercase, ls .14em |

### Страница кейса (aivisionpro.ru/case/X)

| Элемент | Шрифт | Вес | Размер |
|---|---|---|---|
| Кейс H1 | Fraunces | 500 | 56–64px |
| Курсивный акцент в H1 | Fraunces Italic | 500 | 56–64px |
| H2 секций (Точка А / Что сделали / Точка Б) | Fraunces | 500 | 28–32px |
| Тайтл плана (Видимость / Контроль / Управляемость) | Fraunces | 500 | 17–18px |
| Body внутри планов | Inter | 400 | 13.5–14px |
| Stats large (4 PnL, +20%, −35%) | Fraunces | 500 | 32–40px |
| Stats labels | Inter | 400 | 10–11px |
| CTA-блок текст | Fraunces | 500 | 24–28px |

### CRM Дашборд (admin.aivisionpro.ru)

| Элемент | Шрифт | Вес | Размер |
|---|---|---|---|
| Лого AIVISION CRM | Space Grotesk | 700 | 13px, uppercase |
| Навигация | Inter | 500 | 12px |
| PageHeader accent (+27%) | Space Grotesk | 500 | 80–96px |
| Page Title | Space Grotesk | 500 | 32–36px |
| Page lead | Inter | 400 | 14px |
| Section title | Space Grotesk | 500 | 18–22px |
| KPI value | Space Grotesk | 500 | 32–40px |
| KPI label (UPPERCASE) | Inter | 600 | 10px, ls .12em |
| Таблица header | Inter | 600 | 10px, uppercase, ls .12em |
| Таблица row | Inter | 400/600 | 13px |
| Таблица сумма (num) | Space Grotesk | 700 | 13–14px, tabular |
| Кнопки период | Inter | 600 | 11px |
| Pill (статус) | Inter | 600 | 10px, uppercase |
| Tooltip / hint | Inter | 400 | 11px |

---

## Tabular numbers — обязательное правило

Везде, где есть числа в колонках (таблицы, KPI, графики, финансовые данные), обязательно:

```css
font-variant-numeric: tabular-nums;
```

Это делает все цифры одинаковой ширины — колонки не «прыгают», глаз быстро сканирует.

Применять на:
- Таблицах транзакций, клиентов, сделок
- KPI-значениях
- Лейблах графиков
- Любых датах, временах, ID
- Финансовых суммах везде

---

## Иерархия размеров (Type Scale)

Десктоп:

```
Display XL  — 80px (только Fraunces Hero)
Display L   — 64px (Fraunces Hero, кейс H1)
Display M   — 48px (Fraunces section H2)
Display S   — 36px (Space Grotesk page title, Fraunces card title)
H1          — 32px
H2          — 28px
H3          — 24px
H4          — 20px
Body L      — 17px (Inter)
Body M      — 15px (Inter)
Body S      — 13px (Inter, таблицы)
Caption     — 11px (Inter, eyebrow)
Micro       — 10px (Inter, теги)
```

Мобильный (уменьшаем display на 30–40%):

```
Display XL  — 48px
Display L   — 40px
Display M   — 32px
Display S   — 28px
H1–H4       — те же
Body — те же
```

---

## Запрещённые комбинации

❌ Fraunces в CRM — нарушение, выглядит как «editorial-журнал внутри инструмента»
❌ Space Grotesk на лендинге — нарушение, теряется характер бренда
❌ Inter в крупных заголовках на лендинге — «как у всех»
❌ Body-текст на Space Grotesk или Fraunces — нечитаемо на мелких размерах
❌ Любой четвёртый шрифт (Geist, Helvetica, Manrope, что угодно) — закрытая система

---

## Курсив Fraunces — особый приём

В заголовках лендинга и кейсов используем курсив Fraunces для editorial-акцентов. Это **главный визуальный приём** маркетинга AIVISION.

**Правила:**
1. Курсив выделяет 1–3 слова в заголовке, не больше
2. Курсивная часть может быть окрашена в `--brand` (синий) или акцентный цвет секции (crimson для «Точки А», emerald для «Точки Б»)
3. На один заголовок — один курсивный акцент
4. Курсив не использовать в UI-элементах CRM

**Примеры:**
- «Бизнес стал *управляемым* — за 30 дней.»
- «Большой оборот, *нулевая прозрачность*: четыре проекта стали...»
- «Бизнес дорос до того момента, когда *ручное управление* начинает стоить миллионы.»

**CSS:**
```css
.cases-h2 em {
  font-style: italic;
  font-weight: 500;       /* такой же вес как остальной текст */
  color: var(--brand);    /* или другой акцентный цвет */
}
```

---

## Установка в код

### Через `@font-face` (self-hosted, рекомендуется для прод)

См. `README.md` в этом же архиве.

### Через Google Fonts CDN (быстрый старт, dev/прототипы)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&family=Inter:wght@400..700&family=Space+Grotesk:wght@400..700&display=swap" rel="stylesheet">
```

### CSS-переменные для системы

```css
:root {
  /* Шрифт-роли */
  --font-display:    'Fraunces', Georgia, serif;        /* лендинг, кейсы */
  --font-ui-display: 'Space Grotesk', system-ui, sans-serif;  /* CRM display */
  --font-ui:         'Inter', system-ui, sans-serif;    /* UI везде */
}
```

В компонентах использовать только переменные, не имена шрифтов напрямую. Это позволит при необходимости заменить шрифт через одну правку.

---

## Что Claude Design должен знать

- Этот файл — источник истины для типографики AIVISION
- Шрифты приложены в архиве (Fraunces, Space Grotesk, Inter)
- Используется только трёхшрифтовая система — никаких добавлений
- Лендинг: Fraunces + Inter
- CRM: Space Grotesk + Inter
- Курсив Fraunces — главный editorial-приём, использовать в заголовках лендинга и кейсов
- Все числа: `font-variant-numeric: tabular-nums`
- На dark theme обязательно font-smoothing antialiased
