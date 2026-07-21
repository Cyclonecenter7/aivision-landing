/**
 * Spinner — indeterminate loading ring. A ring OUTLINES, so it is round, not
 * chamfered. Built from an SVG circle with a gapped dash that rotates.
 * Progress — determinate linear track; chamfer-safe (clip on track + fill).
 */
export function Spinner({ size = 20, color = 'var(--brand)', thickness = 2.5, className = '', style = {} }) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  return React.createElement('span', {
    className, role: 'status', 'aria-label': 'Загрузка',
    style: { display: 'inline-flex', width: size, height: size, animation: 'aiv-spin .8s linear infinite', ...style },
  },
    React.createElement('svg', { width: size, height: size, viewBox: `0 0 ${size} ${size}` },
      React.createElement('circle', { cx: size / 2, cy: size / 2, r, fill: 'none', stroke: 'currentColor', strokeWidth: thickness, opacity: 0.16, style: { color } }),
      React.createElement('circle', {
        cx: size / 2, cy: size / 2, r, fill: 'none', stroke: color, strokeWidth: thickness,
        strokeLinecap: 'round', strokeDasharray: `${c * 0.28} ${c}`,
      })
    )
  );
}

export function Progress({ value, max = 100, color = 'var(--brand)', className = '', style = {} }) {
  const pct = Math.max(0, Math.min(1, value / max));
  const cut = 4;
  const clip = `polygon(0 0,100% 0,100% calc(100% - ${cut}px),calc(100% - ${cut}px) 100%,0 100%)`;
  return React.createElement('div', {
    className, role: 'progressbar', 'aria-valuenow': value, 'aria-valuemax': max,
    style: { position: 'relative', height: 6, background: 'var(--surface-alt)', clipPath: clip, WebkitClipPath: clip, overflow: 'hidden', ...style },
  },
    React.createElement('div', {
      style: { position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct * 100}%`, background: color, transition: 'width var(--dur-base) var(--ease-out)' },
    })
  );
}
