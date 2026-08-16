# ТЗ #4 — Технический долг и дизайн-система

> ## ⚠ Стек в этом документе устарел
>
> Помечено 2026-08-16. Ниже написано «React 18 + Vite 6 + Tailwind 3 +
> React Router 6». Фактически сайт мигрирован на **Astro 5 (SSG) с
> React-островами**: `package.json` содержит `astro ^5.0.0`, пакета
> `react-router-dom` в зависимостях нет.
>
> Актуальное описание архитектуры — `Швец сайт/CLAUDE.md`, сверен с кодом
> 2026-08-11. Задачи по тех-долгу ниже могут быть валидны, стек в шапке — нет.

**Контекст:** аудит лендинга `/Users/cyclonecenter7/Desktop/Code/AIVISION WEB/` показал накопленный тех-долг: 5 мёртвых компонентов, raceUI-мусор в Tailwind, дизайн-система не enforced (компоненты `<Section>`/`<Eyebrow>` не используются нигде, `#3F6EE8` захардкожен в 99 местах), отсутствует ErrorBoundary, `outline: none !important` ломает keyboard-навигацию.

**Скоуп:** 6 задач, чистый рефакторинг без изменения визуала.
**SEO/мета не входит** — отдельное ТЗ позже.

**Стек:** React 18 + Vite 6 + Tailwind 3 + React Router 6. Без бэка/auth.

**Деплой:** dev-ветка → стейдж → визуальная проверка.

---

## Задача 1 — Удалить мёртвые компоненты (5 мин)

Эти файлы не импортируются нигде (проверено через grep):

```
src/components/landing/Audience.jsx       (49 строк)
src/components/landing/ChaosToSystem.jsx  (123 строки)
src/components/landing/Comparison.jsx     (68 строк)  ← НЕ ComparisonWithForm
src/components/landing/Process.jsx        (38 строк)
src/components/landing/WhatWeDo.jsx       (53 строки)
```

**Шаги:**
1. Перед удалением — для каждого файла повторить `grep -rn "<имя файла без .jsx>" src/` и убедиться что 0 импортов
2. Удалить файлы
3. Проверить `npm run build` проходит
4. Запустить `npm run dev`, открыть `http://localhost:5173`, прокликать главную и `/cases/<любой>` — визуал не сломан

**Приёмка:** -331 строка, билд зелёный, визуал такой же.

---

## Задача 2 — Чистка `tailwind.config.cjs` (10 мин)

**Что есть сейчас:** конфиг скопирован из shadcn-стартера. Используется ~10% возможностей.

**Что удалить:**
- `darkMode: ["class"]` — нет переключателя тем, темной темы нет
- `borderRadius` блок (`lg/md/sm: var(--radius)`) — `--radius: 0px`, не нужно
- Все shadcn-токены через CSS variables: `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring` (не используются никем)
- `keyframes` и `animation` (`accordion-down/up`) — Radix accordion в проекте нет

**Что оставить:**
```js
fontFamily: { inter: ['var(--font-inter)'] },
colors: {
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  blue: '#3F6EE8',
  red: '#E5484D',
  dark2: '#2A2A2E',
  lightbg: '#F4F4F5',
}
```

**В `src/index.css` — удалить из `:root`:**
- `--card`, `--card-foreground`, `--popover`, `--popover-foreground`
- `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`
- `--destructive`, `--destructive-foreground`, `--input`, `--ring`
- `--radius`

**Оставить в `:root`:** `--background`, `--foreground`, `--border`, `--color-bg`, `--color-bg-light`, `--color-dark2`, `--color-blue`, `--color-red`, `--font-inter`.

**Перед чисткой:** `grep -rn "primary\|secondary\|muted-foreground\|popover\|destructive\|--radius\|--card" src/` — убедиться что ни один компонент не использует. Если используют — оставить нужные токены.

**Приёмка:** билд проходит, визуал не сломан, `tailwind.config.cjs` усох с 70+ строк до ~25.

---

## Задача 3 — Убрать `outline: none !important` (5 мин)

**Файл:** `src/index.css`, блок:

```css
@layer base {
  * {
    @apply border-border;
    outline: none !important;
  }
}
```

И ниже:
```css
button:focus,
button:focus-visible,
...
[tabindex]:focus-visible {
  outline: none !important;
  box-shadow: none !important;
}
```

**Проблема:** keyboard-юзеры не видят на каком элементе focus. Это серьёзный a11y фейл + Lighthouse штрафует.

**Что делать:**
1. Удалить `outline: none !important` из `* { ... }`
2. Удалить весь блок `button:focus, button:focus-visible, ... { outline: none !important; box-shadow: none !important; }`
3. Вместо этого добавить:

```css
@layer base {
  *:focus-visible {
    outline: 2px solid var(--color-blue);
    outline-offset: 2px;
    border-radius: 2px;
  }
  /* Скрываем outline только при mouse-клике, оставляем для keyboard */
  *:focus:not(:focus-visible) {
    outline: none;
  }
}
```

**Приёмка:**
- Tab по странице — видимый синий фокус на каждом интерактиве (кнопки, ссылки, инпуты)
- Mouse-клик — фокуса нет (визуал не меняется)
- Chamfer-формы (Btn) — фокус видим вокруг (если ломается из-за clip-path — обернуть в контейнер с outline)

---

## Задача 4 — `<ErrorBoundary>` (15 мин)

**Зачем:** сейчас любая JS-ошибка в любой секции = белый экран на всю страницу. Для production-сайта недопустимо.

**Шаги:**
1. Создать `src/lib/ErrorBoundary.jsx`:

```jsx
import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo);
    // TODO: отправлять в Sentry/CRM API когда подключим
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
          <div className="max-w-md text-center">
            <h1 className="text-3xl font-bold mb-4">Что-то пошло не так</h1>
            <p className="text-muted-foreground mb-6">
              Страница временно недоступна. Попробуйте обновить или вернуться на главную.
            </p>
            <a href="/" className="text-blue underline">На главную</a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
```

2. Обернуть `<Router>` в `App.jsx`:

```jsx
import ErrorBoundary from './lib/ErrorBoundary';
// ...
return (
  <ErrorBoundary>
    <Router>
      <Routes>...</Routes>
    </Router>
  </ErrorBoundary>
);
```

**Приёмка:**
- В любой секции временно бросить `throw new Error('test')` — увидеть fallback вместо белого
- Снять throw, нормальная страница работает

---

## Задача 5 — Заменить хардкод `#3F6EE8` на Tailwind (30 мин)

**Контекст:** цвет акцента упомянут в 99 местах в коде. Чтобы перебрендить — переписывать вручную в 99 файлах. Tailwind уже настроен на `colors.blue: '#3F6EE8'` — нужно использовать.

**Аналогично:** заменить `#5180F0` (hover blue), `#252525`, `#3A3A3A`, `#0A0A0A`, `#E5484D` где это есть.

**Шаги:**
1. Найти все хардкоды:
```bash
grep -rn "#3F6EE8\|#3f6ee8" src/ | wc -l   # ~99
grep -rn "#0A0A0A\|#0a0a0a" src/ | wc -l
grep -rn "#5180F0" src/
grep -rn "#252525\|#3A3A3A" src/
```

2. Замены в Tailwind-классах:
```
bg-[#3F6EE8]    → bg-blue
text-[#3F6EE8]  → text-blue
border-[#3F6EE8]→ border-blue
hover:bg-[#5180F0] → hover:bg-blue/80   (или добавить blue-hover в config)
bg-[#0A0A0A]    → bg-background  (если оно)
bg-[#E5484D]    → bg-red
```

3. В inline-styles (`style={{}}`) — оставить как есть (там часто токены через CSS-vars или динамика). Но проверить — где можно вынести цвет в Tailwind, вынести.

4. `Btn.jsx` — переписать варианты на Tailwind:
```jsx
const VARIANTS = {
  primary:   'bg-blue text-white hover:bg-blue/90',
  secondary: 'bg-dark2 text-white border border-[#3A3A3A] hover:bg-[#2F2F2F]',
  ghost:     'bg-transparent text-[#888] hover:text-white',
  dark:      'bg-background text-white hover:bg-blue',
  white:     'bg-white text-blue hover:bg-[#EEF2FF]',
};
```

**Приёмка:**
- `grep -c "#3F6EE8\|#3f6ee8" src/components/landing/*.jsx` упал с 99 до <10
- Визуал тот же
- Если поменять `colors.blue` в tailwind.config — смена цвета по всему сайту работает

---

## Задача 6 — Енфорсить `<Section>` и `<Eyebrow>` (1ч)

**Проблема:** примитивы `src/components/ui/Section.jsx` и `Eyebrow.jsx` не используются нигде. Каждая секция руками пишет `<section className="py-20 px-6 max-w-6xl mx-auto">`.

**Шаги:**

1. Пройти по всем секциям в `src/components/landing/` (Hero, Problem, Products, Integrations, Cases, ComparisonWithForm, Footer, StarterBanner, Navbar, DashboardSlider).

2. Для каждой:
   - Найти корневой `<section>` (или `<div>` если так)
   - Заменить на `<Section id="..." className="...">` (импорт из `@/components/ui/Section`)
   - Если есть подзаголовок-метка («Что мы делаем», «Кейсы», «Интеграции») — обернуть в `<Eyebrow>`

3. Если в текущей секции есть **специфичные классы** (`bg-background`, custom padding) — добавить через `className` пропс `<Section>` с `!py-32` для override если нужно.

4. Где `<Section>` мешает (полноширинная hero без max-w) — оставить нативный `<section>` и задокументировать в комментарии «// raw section: full-bleed hero, не use <Section>».

**Если выяснится что `<Section>` или `<Eyebrow>` слишком жёсткие** — отрефакторить их (добавить пропсы `width`, `padding`) перед массовым применением.

**Приёмка:**
- `grep -rln "ui/Section" src/components/landing | wc -l` — было 0, стало >5
- `grep -rln "Eyebrow" src/components/landing | wc -l` — было 0, стало >3
- Визуал не сломался
- Изменение `Section.jsx` (например `py-20` → `py-24`) — меняет отступы по всему сайту

---

## Порядок выполнения

**Блок 1 (быстрый, безопасный, 35 мин):**
1. Задача 1 (удалить мёртвое)
2. Задача 3 (outline)
3. Задача 4 (ErrorBoundary)
4. Задача 2 (Tailwind cleanup)

После блока 1 → коммит → деплой dev → визуальная проверка → если ок, идём дальше.

**Блок 2 (большой, рефакторинг, 1.5ч):**
5. Задача 5 (цвета на Tailwind)
6. Задача 6 (Section/Eyebrow)

После блока 2 → коммит → деплой dev → визуальная проверка.

---

## Что НЕ делать

- НЕ менять визуал — только рефакторинг кода под капотом
- НЕ трогать SEO / meta-теги / index.html — отдельное ТЗ
- НЕ удалять `dashboard-slides.jsx` — используется в `CasePage`. Разбиение на per-case файлы — отдельная задача
- НЕ трогать `HeroDashboard/` декомпозицию — оправдана
- НЕ объединять `ContactModal` + `ContactToggleInput` — Toggle переиспользуется
- НЕ менять брендинг (цвета, шрифт, chamfer) — это делается через `tailwind.config.cjs` после задачи 5
- НЕ добавлять TypeScript / TanStack / zod / shadcn — за пределами скоупа
- НЕ менять API контракты с CRM-бэком

---

## Чеклист завершения

- [ ] 5 мёртвых файлов удалены, билд зелёный
- [ ] `tailwind.config.cjs` усох до ~25 строк
- [ ] `outline: none !important` убран, focus-visible добавлен
- [ ] ErrorBoundary обёрнут вокруг Router
- [ ] `#3F6EE8` хардкоды <10 (было 99)
- [ ] `<Section>` используется в большинстве секций
- [ ] `<Eyebrow>` используется в секциях с подзаголовками
- [ ] `npm run build` проходит без warning
- [ ] Все страницы открываются и выглядят как до рефакторинга
- [ ] Tab-навигация показывает фокус на интерактивах
- [ ] Деплой на dev-стейдж прошёл, визуальная регрессия не обнаружена

---

## Финальный коммит

```
chore(tech-debt): remove dead code, enforce design system, fix a11y

- Delete 5 unused landing components (-331 lines)
- Strip shadcn-starter junk from tailwind.config.cjs
- Replace `outline: none !important` with focus-visible
- Add <ErrorBoundary> around Router
- Replace #3F6EE8 hardcodes with Tailwind `bg-blue/text-blue` (99 → <10)
- Enforce <Section>/<Eyebrow> primitives in landing sections

No visual changes. SEO/meta tags out of scope.
```
