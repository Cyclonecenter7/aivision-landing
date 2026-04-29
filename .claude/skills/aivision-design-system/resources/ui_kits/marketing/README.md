# Marketing UI Kit

Full composition of the AIVISION landing page, assembled from reusable primitives.

## Entry point
`index.html` — mounts React and composes `Navbar → Hero → Problem → Products → Cases → ComparisonWithForm → Footer` with a shared `ContactModal`.

## Files

| File | What it exports |
|---|---|
| `Primitives.jsx` | `Eyebrow`, `Button`, `Card`, `NumberBadge`, `Kicker`, `chamfer(px)` helper |
| `Navbar.jsx` | `Navbar` — fixed, transparent-by-default, white-on-scroll after 600px |
| `Hero.jsx` | `Hero` — full-height hero w/ text left + auto-rotating dashboard tab mock right |
| `Problem.jsx` | `Problem` — "Сейчас → С AIVISION" chaos/system visualization + 3-column explainer |
| `Products.jsx` | `Products`, `ProductCard` — 3-tier pricing cards (light / blue / dark) |
| `Cases.jsx` | `Cases`, `CaseCard` — 3 case-study cards w/ blue hero metric block |
| `ComparisonAndFooter.jsx` | `ComparisonWithForm`, `Footer`, `ContactModal` |

All components read globals from earlier scripts via `Object.assign(window, {...})` at the bottom of each file — do not convert to ES modules.

## Conventions

- **Chamfer.** The brand's defining gesture. Use `chamfer(px)` from `Primitives.jsx` inside inline `clipPath` styles. Sizes: 10 (chip) / 12 (badge) / 16 (default CTA) / 20 (card) / 28 (modal / feature card).
- **Eyebrow.** Always the first element in a section. Color encodes meaning — `blue` = default/product, `red` = problem, `black` = comparison/conclusion.
- **Numbers.** Real minus (`−`, U+2212), not hyphen. Currency always suffix `₽` with non-breaking space. Number badges (01/02/03) use `NumberBadge` with blue/white/black variants.
- **No gradients, no rounded corners** (except `border-radius` on true circles — bullet dots, progress bars). All surfaces are flat.
- **Icons** are inline SVG in `Products.jsx` matching Lucide stroke style (`stroke-width=2`, no fill). When adding new icons, use Lucide's source as the reference.

## Using components outside this kit

Copy the files you need into your page, keep the script-load order: `Primitives.jsx` first, then anything that depends on its globals. For a single component (e.g. just a Button on a new page), inlining the minimal code is fine — the chamfer + color logic is small.

## What's intentionally NOT here

- Auth, dashboard, internal app UI — AIVISION has only one product surface (this marketing site). The dashboards shown in the Hero are visual mocks of a future BI product.
- Mobile breakpoints — the production site does have responsive grids (`md:grid-cols-3`); this kit renders at desktop width for design-review purposes. When building real pages, re-introduce `@media (max-width: 768px)` rules.
- Dark-mode toggle — the brand uses dark surfaces as intentional contrast sections, not a system-wide mode.
