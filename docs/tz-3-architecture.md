# ТЗ #3 — Архитектура сайта (без бэка)

**Контекст:** на лендинге **28% кода = копипаст**. `DashboardSlider{1,2,3}` (3 файла × ~350 строк), `CasePage{,2,3}` + `Cases.jsx` (4 файла × ~165 строк), `HeroDashboard.jsx` 488 строк-монолит, `clipPath` polygon дублируется по 30+ местам, "AIVISION" / "aivisionpro.ru" хардкод по 40 файлам — невозможно клонировать под клиента Стартового стека.

**Worktree:** `/Users/cyclonecenter7/Desktop/Code/AIVISION WEB/`
**CRM не трогаем** в этом ТЗ.

**Зависимость:** ТЗ #1 + #2 лучше сделать раньше (рефакторить чистый рабочий код проще). Если делать вместе с #2 — учти что `<Btn>` примитив должен принимать `data-track` пропы.

**Билд:** `npm run build` exit 0.

---

## 🌐 Task 3.1 — Создать `src/components/ui/` design-kit

**Новые файлы:**

### `src/components/ui/ClipCard.jsx`
Универсальная chamfer-обёртка вместо inline `clipPath`:
```jsx
const CLIP_VARIANTS = {
  card:   'polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)',
  button: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)',
  large:  'polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)',
};

export default function ClipCard({
  variant = 'card',
  className = '',
  style = {},
  as: Tag = 'div',
  children,
  ...rest
}) {
  return (
    <Tag
      className={className}
      style={{ ...style, clipPath: CLIP_VARIANTS[variant] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
```

### `src/components/ui/Btn.jsx`
Универсальная кнопка с встроенным трекингом (синергия с ТЗ #2):
```jsx
const VARIANTS = {
  primary:   'bg-[#3F6EE8] text-white hover:bg-[#5180F0]',
  secondary: 'bg-[#252525] text-white border border-[#3A3A3A] hover:bg-[#2F2F2F]',
  ghost:     'bg-transparent text-[#888] hover:text-white',
};
const SIZES = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export default function Btn({
  variant = 'primary',
  size = 'md',
  track,         // data-track ID
  trackBlock,    // data-track-block
  className = '',
  children,
  ...rest
}) {
  const trackProps = track ? { 'data-track': track, 'data-track-block': trackBlock } : {};
  return (
    <button
      className={`${VARIANTS[variant]} ${SIZES[size]} font-medium transition-colors ${className}`}
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)' }}
      {...trackProps}
      {...rest}
    >
      {children}
    </button>
  );
}
```

### `src/components/ui/Section.jsx`
Общий контейнер секции:
```jsx
export default function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`py-20 px-6 max-w-6xl mx-auto ${className}`}>
      {children}
    </section>
  );
}
```

### `src/components/ui/Eyebrow.jsx`
UPPERCASE лейбл с акцент-полоской:
```jsx
export default function Eyebrow({ children, color = '#3F6EE8' }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-px" style={{ background: color }} />
      <span className="text-xs font-medium uppercase tracking-widest" style={{ color }}>
        {children}
      </span>
    </div>
  );
}
```

### `src/components/ui/index.js`
Barrel export:
```js
export { default as Btn } from './Btn';
export { default as ClipCard } from './ClipCard';
export { default as Section } from './Section';
export { default as Eyebrow } from './Eyebrow';
```

**Применение:** заменить inline `<button>` и `clipPath` в **минимум 8 файлах** (Hero, Navbar, Footer, Products, Cases, ContactModal, StarterBanner, Integrations).

**Acceptance:**
- `grep -rn "clipPath: 'polygon" src/ --include="*.jsx" | grep -v components/ui` → < 5 hits (остальные через `<ClipCard>`)
- `grep -rn "<button" src/ --include="*.jsx" | grep -v components/ui` → < 10 hits (остальные через `<Btn>`)

---

## 🌐 Task 3.2 — `DashboardSlider` декомпозиция

**Файлы:**
- Удалить: `src/components/landing/DashboardSlider.jsx` (356 строк)
- Удалить: `src/components/landing/DashboardSlider2.jsx` (349 строк)
- Удалить: `src/components/landing/DashboardSlider3.jsx` (331 строк)
- Создать: `src/components/landing/DashboardSlider.jsx` (один универсальный, ~150 строк)
- Создать: `src/data/dashboard-slides.js` (data для 3 вариантов)

**`src/data/dashboard-slides.js`:**
```js
export const SLIDER_VARIANTS = {
  finance: { title: '...', metrics: [...], chartData: [...] },
  leads:   { title: '...', metrics: [...], chartData: [...] },
  ops:     { title: '...', metrics: [...], chartData: [...] },
};
```

**`DashboardSlider.jsx`:**
```jsx
import { SLIDER_VARIANTS } from '@/data/dashboard-slides';

export default function DashboardSlider({ variant = 'finance' }) {
  const data = SLIDER_VARIANTS[variant];
  // ... общая логика рендера
}
```

**В местах вызова:**
```jsx
// Было: <DashboardSlider /> + <DashboardSlider2 /> + <DashboardSlider3 />
// Стало: <DashboardSlider variant="finance" /> и т.д.
```

**Acceptance:**
- 3 файла удалены, 1 + data остались
- `wc -l src/components/landing/DashboardSlider.jsx` < 200
- Визуально все 3 слайда отображаются как раньше

---

## 🌐 Task 3.3 — `Cases` + `CasePage` декомпозиция

**Файлы:**
- Удалить: `src/pages/CasePage.jsx`, `CasePage2.jsx`, `CasePage3.jsx` (3 × 165 строк)
- Изменить: `src/pages/Landing.jsx` — компонент `Cases` уже там
- Создать: `src/pages/CasePage.jsx` (один универсальный, ~100 строк)
- Создать: `src/data/cases.js`
- Изменить: `src/App.jsx` — один маршрут вместо трёх

**`src/data/cases.js`:**
```js
export const CASES = {
  '1': { client: 'X-Производство', industry: 'Производство', problem: '...', solution: '...', metrics: {...} },
  '2': { client: 'Y-Ритейл', industry: 'Ритейл', problem: '...', solution: '...', metrics: {...} },
  '3': { client: 'Z-Услуги', industry: 'Услуги', problem: '...', solution: '...', metrics: {...} },
};
```

**`src/pages/CasePage.jsx`:**
```jsx
import { useParams } from 'react-router-dom';
import { CASES } from '@/data/cases';

export default function CasePage() {
  const { id } = useParams();
  const data = CASES[id];
  if (!data) return <Navigate to="/" />;
  // ... render shared template
}
```

**`src/App.jsx`:**
```jsx
// Было: 3 routes
<Route path="/case/:id" element={<CasePage />} />
```

**Acceptance:**
- 3 файла удалены, 1 + data
- Все 3 кейса доступны по `/case/1`, `/case/2`, `/case/3`
- Невалидный id (`/case/99`) → редирект на главную

---

## 🌐 Task 3.4 — `HeroDashboard.jsx` декомпозиция

**Файл:** `src/components/landing/HeroDashboard.jsx` (488 строк)

**Сделать:** разбить на 3-4 файла по логическим частям:
- `HeroDashboard.jsx` — основной (~100 строк, композиция)
- `HeroDashboard/MetricsRow.jsx` — KPI карточки сверху
- `HeroDashboard/Chart.jsx` — график
- `HeroDashboard/StatusList.jsx` — список статусов

(Точные имена и состав — на усмотрение, главное чтобы каждый файл был < 200 строк.)

**Acceptance:**
- `find src/components/landing/HeroDashboard* -type f | xargs wc -l` — каждый < 200 строк
- Визуально HeroDashboard выглядит как раньше

---

## 🌐 Task 3.5 — `src/config/brand.js`

**Создать `src/config/brand.js`:**
```js
export const BRAND = {
  name: 'AIVISION',
  domain: 'aivisionpro.ru',
  supportEmail: 'support@aivisionpro.ru',
  supportTelegram: '@aivision_support',

  // Цены продуктов
  starterPrice: '100 000 ₽',
  starterDays: '7 дней',

  // Кейсы — базовые данные (детали в data/cases.js)
  caseCount: 3,

  // Цвета (для возможной кастомизации под клиента)
  colors: {
    accent: '#3F6EE8',
    bg: '#0A0A0A',
    surface: '#181818',
    text: '#ffffff',
    textMuted: '#888',
  },
};
```

**Применение:** заменить хардкоды по всему `src/`:
```bash
grep -rn "AIVISION\|aivisionpro\|support@\|100 000 ₽\|100к" src/ --include="*.jsx" --include="*.js"
```

В каждом файле:
```jsx
import { BRAND } from '@/config/brand';
// ...
<h1>{BRAND.name}</h1>
<a href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a>
```

**Acceptance:**
- `grep -rn "aivisionpro.ru" src/ --include="*.jsx" | grep -v config/brand` → 0 hits
- `grep -rn "AIVISION" src/ --include="*.jsx" | grep -v config/brand | grep -v "//\\|/\\*"` → < 5 hits (остатки в комментариях/alt-тегах)

---

## 🌐 Task 3.6 — Footer/StarterBanner inline-style → Tailwind

**Файлы:**
- `src/components/landing/Footer.jsx`
- `src/components/landing/StarterBanner.jsx`

**Сделать:** заменить `style={{...}}` на Tailwind classes (как в остальных файлах). Inline-style оставить только для динамических значений (`style={{ background: theme.bg }}`) или сложных `clipPath` (через `<ClipCard>`).

**Acceptance:**
- `grep -c "style={{" src/components/landing/Footer.jsx src/components/landing/StarterBanner.jsx` — каждый < 5 (только динамические или clipPath через ClipCard)

---

## Промпт для Sonnet

```
ТЗ: /Users/cyclonecenter7/Desktop/Code/AIVISION WEB/docs/tz-3-architecture.md

Выполни 6 задач Task 3.1-3.6 — чистый рефакторинг сайта, без бэка.

Worktree: /Users/cyclonecenter7/Desktop/Code/AIVISION WEB/

ВАЖНО: ТЗ #1 + #2 должны быть сделаны до этого. Если в коде уже есть data-track атрибуты — `<Btn>` примитив должен их прокидывать через track/trackBlock пропы.

Порядок:
1. Task 3.1 — design-kit (Btn, ClipCard, Section, Eyebrow) первым, остальные на нём строятся
2. Task 3.2 — DashboardSlider декомпозиция (3 файла → 1 + data)
3. Task 3.3 — Cases декомпозиция (3 → 1 + data)
4. Task 3.4 — HeroDashboard декомпозиция
5. Task 3.5 — brand.js + замена хардкодов
6. Task 3.6 — Footer/StarterBanner inline-style → Tailwind

Constraints:
- НЕ трогать бэк CRM (никаких изменений в /Users/cyclonecenter7/Desktop/Code/AIVISION CRM/)
- НЕ трогать tracker.js логику (только можно использовать через `<Btn track=>`)
- Визуально сайт должен остаться идентичным
- После: `npm run build` exit 0

Reply под 400 слов:
- Список изменённых/созданных/удалённых файлов
- Сколько строк сэкономили (до vs после)
- Сколько хардкодов AIVISION/домена убрали
- Сколько inline-button заменили на <Btn>
- Сколько clipPath копий убрали
- Build exit code
```

## Финальный коммит

`refactor(arch): design-kit + slider/cases templates + brand config`

Сэкономишь **~1200 строк копипаста**, готовность к клонированию под клиента Стартового стека за 30 минут.
