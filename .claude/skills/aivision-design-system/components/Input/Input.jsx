/**
 * Input — chamfered text field whose focus/error state is drawn by a
 * ChamferBorder SVG overlay that traces the field's OWN chamfer (recolours
 * its stroke). NEVER an outline/box-shadow/border on the chamfered control —
 * clip-path would tear the cut. The overlay is sized to the field in px via a
 * ResizeObserver so the 8px cut stays crisp at any width.
 */
function useChamferPoints(ref, cut) {
  const [box, setBox] = React.useState({ w: 0, h: 0 });
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setBox({ w: el.offsetWidth, h: el.offsetHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  const { w, h } = box;
  const points = w && h ? `0,0 ${w},0 ${w},${h - cut} ${w - cut},${h} 0,${h}` : '';
  return { w, h, points };
}

export function Input({
  label,
  error = false,
  disabled = false,
  className = '',
  style = {},
  ...rest
}) {
  const cut = 8;
  const wrapRef = React.useRef(null);
  const [focused, setFocused] = React.useState(false);
  const { w, h, points } = useChamferPoints(wrapRef, cut);

  const clip = `polygon(0 0,100% 0,100% calc(100% - ${cut}px),calc(100% - ${cut}px) 100%,0 100%)`;
  const stroke = error ? 'var(--crimson)' : focused ? 'var(--brand)' : 'var(--border-strong)';

  return React.createElement('label', {
    className,
    style: { display: 'flex', flexDirection: 'column', gap: 6, ...style },
  },
    label
      ? React.createElement('span', {
          style: {
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em',
            textTransform: 'uppercase', color: 'var(--text-muted)',
          },
        }, label)
      : null,
    React.createElement('span', {
      ref: wrapRef,
      style: { position: 'relative', display: 'block', opacity: disabled ? 0.45 : 1 },
    },
      React.createElement('input', {
        disabled,
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false),
        style: {
          display: 'block', width: '100%', height: 40, padding: '0 13px',
          background: 'var(--surface-alt)', color: 'var(--text-primary)',
          fontFamily: 'var(--font-ui)', fontSize: 13, border: 'none', outline: 'none',
          clipPath: clip, WebkitClipPath: clip,
        },
        ...rest,
      }),
      points
        ? React.createElement('svg', {
            'aria-hidden': true,
            viewBox: `0 0 ${w} ${h}`,
            preserveAspectRatio: 'none',
            style: { position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' },
          },
            React.createElement('polygon', {
              points,
              style: { fill: 'none', stroke, strokeWidth: 1.5, vectorEffect: 'non-scaling-stroke', transition: 'stroke .15s cubic-bezier(.4,0,.2,1)' },
            })
          )
        : null
    )
  );
}
