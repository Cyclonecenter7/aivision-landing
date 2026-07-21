/**
 * ChamferBox — the foundational AIVISION container primitive.
 *
 * Renders a box with the brand chamfer (bottom-right cut) via clip-path.
 * NEVER pair a border/box-shadow with the chamfer (clip-path slices it and
 * tears the corner). For an accent stroke use the `rail` prop — it renders a
 * chamfer-safe inner rail (absolutely positioned INSIDE the clipped box).
 *
 * The cut is ONE brand size (10px). Do not scale it for emphasis — focus
 * comes from motion + colour, not a bigger cut.
 */
export function ChamferBox({
  as = 'div',
  chamfer = 10,
  rail,
  className = '',
  style = {},
  children,
  ...rest
}) {
  const clip = `polygon(0 0,100% 0,100% calc(100% - ${chamfer}px),calc(100% - ${chamfer}px) 100%,0 100%)`;
  const boxStyle = {
    clipPath: clip,
    WebkitClipPath: clip,
    ...(rail ? { position: 'relative' } : null),
    ...style,
  };
  return React.createElement(
    as,
    { className, style: boxStyle, ...rest },
    rail
      ? React.createElement('span', {
          'aria-hidden': true,
          style: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: rail },
        })
      : null,
    children
  );
}
