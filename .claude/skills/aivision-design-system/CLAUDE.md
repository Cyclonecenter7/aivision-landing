# AIVISION — project rules

Read `SKILL.md` first for the full design system. The note below is a hard guard against a recurring rendering bug.

## ⛔ NEVER put `border` (or `box-shadow`) on a chamfered element

The whole system uses **chamfer** = `clip-path: polygon(0 0, 100% 0, 100% calc(100% - Xpx), calc(100% - Xpx) 100%, 0 100%)`.
`clip-path` clips EVERYTHING — including `border` and `box-shadow`. A border on a chamfered box gets sliced at the cut corner, leaving a broken/open corner and a torn accent line (the classic crimson "notch" artifact). This is the #1 generation bug in this project.

**Rule:** an element may have a `clip-path` chamfer **OR** a `border`/`box-shadow` — never both on the same node.

### Chamfer-safe ways to get an outline or accent

0. **One-liner helper class** (use this first, almost always enough). The DS ships ready-made rails in `colors_and_type.css` — just combine a chamfer size with a rail colour:
   ```html
   <div class="ch-lg ch-rail ch-rail-crimson">…</div>
   ```
   Available colours: `ch-rail-brand | -emerald | -crimson | -sun | -slate | -indigo | -tangerine`. The rail is a 3px inner `::before` pinned to the left edge — clipped *with* the shape, so the corner always closes cleanly.

1. **Hand-rolled inner rail** (when the helper doesn't fit — different side, width, position). Put the rail INSIDE the clipped element:
   ```css
   .card{position:relative;clip-path:polygon(0 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%);}
   .card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--crimson);}
   ```
2. **Full outline → `ChamferBorder` SVG overlay** (the sanctioned component for a 4-sided stroke). A `<svg><polygon/></svg>` absolutely positioned over the box, with `points` matching the chamfer, `fill:none; stroke:…`. Reference implementation: `preview/components-inputs.html` (the `.cf` field + `updateChamferSVG()` JS). Copy it; don't reinvent.
3. **Double-clip border** — a wrapper clipped to the chamfer in the border color, holding an inset child (1–2px smaller, same chamfer) in the fill color. Used by the light-theme input wrapper `.iw` in `preview/colors-light-theme.html`.
4. **Borderless** — most cards just use `background: var(--surface)` with the chamfer and no outline at all. When in doubt, no border.

If a divider/separator is needed, put `border-bottom`/`border-right` only on **flat, non-chamfered** elements (table rows, headers, columns) — exactly how the CRM/landing kits do it.

## ⛔ Focus on a chamfered element = ChamferBorder SVG stroke — NEVER a chamfered border

This is the **#1 recurring bug**: Claude reads "chamfer on ALL containers" and reflexively puts a `border` (or `box-shadow`) on the focused/selected element too. But `clip-path` + `border` tears the cut corner — the broken-corner / crimson-notch artifact. In this system focus always lives **as an SVG-stroke overlay that traces the element's OWN chamfer** (`ChamferBorder` — a `<polygon>` with `fill:none; stroke:--brand`). We do **NOT** use spotlight/dimming overlays. Canon + copy-paste: `preview/focus-and-spotlight.html`.

**Exactly two cases — both `ChamferBorder`:**

1. **On-element selection latch** (a card/KPI becomes "selected" in place). → **`ChamferBorder` SVG stroke** that traces the element's OWN chamfer — the "Select (H)" pattern (one continuous `<polygon pathLength="100">`, `stroke-dashoffset` 100→0). No `border`. Reference: `preview/chamfer-motion-lab.html` (section H).

2. **Keyboard `:focus-visible` on an input/button.** → The same `ChamferBorder` SVG overlay recolours its stroke to `--brand` (see `.cf` + `updateChamferSVG()` in `preview/components-inputs.html`). Never put `outline` or `box-shadow` on the chamfered control itself.

**Never** reach for `outline`, `box-shadow`, or a chamfered `border` to show focus/selection on a chamfered element — trace its cut with a `ChamferBorder` `<polygon>` stroke instead.

## ⛔ Chamfer is ONE size — never scale it for emphasis

The chamfer is a fixed brand mark: **`--chamfer` = 10px on every hi-fi container** (button, card, KPI, hero), via the `.chamfer` helper. Do NOT make the cut bigger on "more important" elements — "bigger cut = more focus" is the trap that makes every screen inconsistent.

**Focus & hierarchy come from motion + colour, not cut size:** `.ch-hover` deepens the cut transiently on hover (+6px), `.ch-press` on click (+8px), and `ChamferBorder` draws an accent stroke for hero moments — all returning to 10px. Live reference + the canon: `preview/chamfer-motion-lab.html`.

The legacy `--ch-*` / `.ch-*` size scale (4–28px) is for **micro-element fit only** (tiny tags, checkboxes, avatars where 10px wouldn't fit) — never as an importance signal.

## ⛔ NO chamfer in wireframes / lo-fi sketches / storyboards

The chamfer is a **hi-fi brand signature** — it belongs ONLY on production surfaces (landing, CRM, slides, social). README/SKILL say "chamfer on ALL container elements", but that means **all hi-fi containers**.

In a wireframe the cards are flat and sit on a light paper background, so a chamfer cut just exposes the background and reads as a **broken / unfilled corner** — not a brand mark. This is the #2 generation bug in this project.

**Rule:** when building a wireframe, lo-fi sketch, or storyboard frame → **square corners only**. No `clip-path` chamfer, no `ch-*` helper classes. Save the chamfer for the hi-fi pass.
