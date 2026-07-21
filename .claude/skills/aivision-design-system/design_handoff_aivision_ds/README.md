# Handoff: AIVISION Design System v1.0

## Overview
AIVISION — премиальная B2B-система для управленческого консалтинга («Системы управляемой прибыли»). Это **дизайн-система целиком**: токены, типографика, тёмная и светлая темы, 12 React-компонентов, моушен-система и 3 готовых UI-кита (лендинг, CRM-админка, мобильный CRM). Задача разработчика — **воссоздать эту систему в целевом кодовом окружении** (React/Vue/Svelte/SwiftUI/нативное и т.д.) по его установленным паттернам, а не копировать HTML напрямую.

## About the Design Files
Файлы в этом проекте — это **дизайн-референсы, написанные в HTML/React** (прототипы, показывающие задуманный вид и поведение), плюс **исходные React-компоненты**, которые можно портировать почти как есть. Если в целевом проекте уже есть фреймворк — переносите токены и компоненты на его паттерны. Если фреймворка нет — выберите подходящий и реализуйте систему в нём.

## Fidelity
**High-fidelity.** Финальные цвета, типографика, отступы, состояния и моушен. Воссоздавать пиксель-в-пиксель средствами целевого стека. Значения брать из `colors_and_type.css` (источник правды для токенов).

---

## ⛔ Самое важное правило системы — Chamfer (скос)

Вся система построена на **скосе** — срезанном нижне-правом угле:
```css
clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
```

**Железные правила (нарушение = главные баги системы):**
1. **Скос ОДНОГО размера — 10px** на всех hi-fi контейнерах. НЕ масштабировать для акцента. На hover он транзиентно углубляется до 16px, на press до 18px — и **сразу возвращается к 10px**. «Больше срез» ≠ «важнее».
2. **Скос ИЛИ `border`/`box-shadow` — НИКОГДА вместе** на одном элементе. `clip-path` режет border/shadow и рвёт угол. Для акцентной линии — внутренний rail (`::before` шириной 3px внутри клипа). Для тени плавающих панелей — `filter: drop-shadow()` (повторяет силуэт скоса), НЕ `box-shadow`.
3. **Фокус/выбор на скос-элементе = `ChamferBorder` SVG-обводка** по собственному скосу (`<polygon fill="none" stroke="--brand">`), НИКОГДА `outline`/`border`/`box-shadow`. Спотлайтов с затемнением нет.
4. **В wireframe/lo-fi скос НЕ используется** — только на hi-fi-поверхностях.

---

## Design Tokens
Источник: `colors_and_type.css` (`:root` для тёмной темы, `[data-theme="light"]` для светлой). 83 токена.

### Цвета — закрытая палитра из 7
| Токен | Hex (dark) | Роль |
|---|---|---|
| `--brand` | `#3F6EE8` | основной (синий) |
| `--emerald` | `#10B981` | успех, рост |
| `--crimson` | `#F43F5E` | ошибка, падение |
| `--sun` | `#FCD34D` | предупреждение |
| `--slate` | `#94A3B8` | нейтральный акцент |
| `--indigo` | `#6366F1` | вторичная категория |
| `--tangerine` | `#FB923C` | вторичная категория |

Нейтрали (dark): `--bg #0A0A0A`, `--surface #181818` (прибл.), `--surface-alt`, `--border`, `--border-strong`, `--text-primary #fff`, `--text-secondary`, `--text-muted`. Светлая тема переопределяет те же имена под `[data-theme="light"]` (`--bg #FAFAFA`, `--surface #FFFFFF` и т.д.). Точные значения — в CSS.

### Типографика — 2 семейства, 3 голоса
- `--font-display: 'Onest'` — БРЕНД-голос: заголовки, hero, **короткие числа** (KPI-значения).
- `--font-ui: 'IBM Plex Sans'` — ЧЕЛОВЕК: body, UI, лейблы.
- `--font-mono: 'IBM Plex Mono'` — МАШИНА: эйбрау, полные числа, даты, время, чипы-дельты.
- (Fraunces и Inter — legacy, НЕ использовать.)
Шкала, классы `.type-*` и числовые помощники (`.num-ticker`, `.num-mono`, `.delta-chip`) — в CSS.

### Spacing
`--space-1…10` (4px→64px). Скос — `--chamfer: 10px` (+ `--chamfer-hover: 16px`, `--chamfer-press: 18px` — транзиентные).

### Motion (UX-моушен — добавлено финально)
Характер: **живой, но быстрый и деловой**. Длительности короткие; пружина — только на акцентах.
| Токен | Значение | Применение |
|---|---|---|
| `--dur-instant` | 80ms | hover-тинты, мелкая обратная связь |
| `--dur-fast` | 140ms | press, переключатели, чипы, фокус |
| `--dur-base` | 220ms | меню, тосты, смена состояния |
| `--dur-slow` | 360ms | модалки, входы страницы |
| `--ease-out` | `cubic-bezier(.2,.8,.2,1)` | вход + большинство UI (decelerate) |
| `--ease-in` | `cubic-bezier(.4,0,1,1)` | уход (accelerate) |
| `--ease-in-out` | `cubic-bezier(.4,0,.2,1)` | перемещение между состояниями |
| `--ease-spring` | `cubic-bezier(.34,1.32,.5,1)` | акцент, лёгкий overshoot |

**Карта интеракция→токен** и принципы — в `preview/motion-principles.html`.
**Reduced-motion**: при `prefers-reduced-motion: reduce` оставляем fade, убираем движение/масштаб (все entrance-кейфреймы переопределены opacity-only; скос-deepen и spinner подавлены). Уже зашито в CSS — сохранить при портировании.

---

## Components (React — `components/<Name>/`)
Каждый компонент: `<Name>.jsx` (реализация на `React.createElement`), `<Name>.d.ts` (типы + JSDoc), `<Name>.html` (витрина). Все следуют правилам скоса выше.

| Компонент | Назначение | Ключевые props |
|---|---|---|
| **ChamferBox** | Базовый скос-контейнер + опц. `rail`-акцент | `as`, `chamfer`, `rail` |
| **Button** | Скошенная кнопка; скос углубляется на press | `variant` (primary/secondary/ghost/danger), `size` (sm/md/lg) |
| **Input** | Скош. поле; фокус/ошибка = ChamferBorder stroke | `label?`, `error?`, `disabled?` |
| **Select** | Кастомный дропдаун (замена нативного `<select>`); скос-меню, бренд-галочка, drop-shadow | `options`, `value?`, `defaultValue?`, `placeholder?`, `onChange?`, `error?`, `disabled?` |
| **KPICard** | Метрика дашборда: скос + левый rail, число Onest, дельта mono-чипом | `label`, `value`, `delta?`, `direction`, `accent?` |
| **Badge** | Статус-пилюля/счётчик, микро-скос 4px | `variant`, `solid?`, `dot?` |
| **Spinner / Progress** | Кольцо-загрузка (круг, без скоса) + линейный прогресс (chamfer-safe) | Spinner: `size?`,`color?`; Progress: `value`,`max?`,`color?` |
| **Toast** | Уведомление: скос + rail по типу, slide-in, drop-shadow | `type`, `title`, `message?`, `onClose?` |
| **Tooltip** | Подсказка hover/focus; скос + drop-shadow, pop-in | `label`, `placement?`, `children` |
| **Menu** | Контекстное меню действий (не Select); иконки, danger, разделители | `trigger`, `items[]`, `align?` |
| **Modal** | Диалог: fade-scrim + скос-панель pop-in; Esc/scrim/крестик закрывают | `open`, `onClose`, `title?`, `children`, `footer?`, `width?` |

Точные API — в `.d.ts` каждого компонента. Поведение (hover/press/focus/disabled/loading/selected как единый набор) — в `preview/interaction-states.html`.

---

## Screens / UI Kits (`ui_kits/`)
Готовые экраны-референсы — собирать из компонентов и токенов выше.
- **`ui_kits/landing/index.html`** — лендинг aivisionpro.ru: hero, кейсы, тарифы, CTA.
- **`ui_kits/crm/index.html`** — Admin CRM: воронка продаж, заявки, финансы, задачи (тёмная тема).
- **`ui_kits/mobile/index.html`** — мобильный CRM (iOS): дашборд, заявки, задачи.

## Patterns
`preview/patterns-states.html` — канон empty/error/success экранов + поток валидации формы (спокойная обратная связь по месту, без модалок-алертов).

---

## Где что лежит (карта референсов)
```
colors_and_type.css        ← ИСТОЧНИК ПРАВДЫ: все токены, темы, @font-face, классы
CLAUDE.md / SKILL.md / README.md  ← канон и правила (особенно скос — читать первым)
components/<Name>/          ← 12 React-компонентов (.jsx + .d.ts + витрина)
preview/                    ← карточки дизайн-системы (цвета, тип, моушен, состояния, паттерны)
  ├ motion-principles.html  ← моушен: токены, карта, принципы, reduced-motion
  ├ interaction-states.html ← состояния компонентов
  ├ patterns-states.html    ← empty/error/success + валидация
  └ focus-and-spotlight.html← канон фокуса (ChamferBorder)
ui_kits/                    ← 3 готовых экрана (landing / crm / mobile)
```

## Assets
- Шрифты: Onest, IBM Plex Sans, IBM Plex Mono — подключаются через Google Fonts `@import` в `colors_and_type.css`. В кодовой базе подключить теми же весами.
- Иконки: стиль Lucide (stroke 24×24). Использовать существующую иконотеку проекта в том же стиле.
- Логотип: знак-скос + Onest wordmark — SVG-path в `preview/brand-logo.html`.

## Реализация — порядок
1. Прочитать правила скоса (этот файл + `CLAUDE.md`).
2. Перенести токены из `colors_and_type.css` в систему тем целевого стека (CSS-vars / Tailwind config / тема).
3. Портировать компоненты из `components/` (логика на `React.createElement` читается прямо; типы — в `.d.ts`).
4. Сверять вид и поведение с `preview/` и `ui_kits/`.
5. Сохранить моушен-токены и reduced-motion-стратегию.
