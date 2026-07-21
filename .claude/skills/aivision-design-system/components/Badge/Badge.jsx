/**
 * Badge — tiny status pill / count. Micro-chamfer (4px). Tinted bg + matching
 * text, or solid fill. NEVER a border on the chamfer.
 */
const BADGE_TINT = {
  brand:   ['rgba(63,110,232,.15)', 'var(--brand)'],
  emerald: ['rgba(16,185,129,.15)', 'var(--emerald)'],
  crimson: ['rgba(244,63,94,.15)',  'var(--crimson)'],
  sun:     ['rgba(252,211,77,.18)', 'var(--sun)'],
  slate:   ['rgba(148,163,184,.18)','var(--slate)'],
  neutral: ['var(--surface-alt)',   'var(--text-secondary)'],
};
const BADGE_SOLID = {
  brand: 'var(--brand)', emerald: 'var(--emerald)', crimson: 'var(--crimson)',
  sun: 'var(--sun)', slate: 'var(--slate)', neutral: 'var(--text-secondary)',
};

export function Badge({ children, variant = 'brand', solid = false, dot = false, className = '', style = {} }) {
  const [bg, fg] = BADGE_TINT[variant] || BADGE_TINT.brand;
  const cut = 4;
  const clip = `polygon(0 0,100% 0,100% calc(100% - ${cut}px),calc(100% - ${cut}px) 100%,0 100%)`;
  const onSolid = variant === 'sun' ? '#3A2D00' : '#fff';
  return React.createElement('span', {
    className,
    style: {
      display: 'inline-flex', alignItems: 'center', gap: 5,
      height: 20, padding: '0 8px',
      fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, letterSpacing: '.02em',
      lineHeight: 1, whiteSpace: 'nowrap',
      background: solid ? BADGE_SOLID[variant] : bg,
      color: solid ? onSolid : fg,
      clipPath: clip, WebkitClipPath: clip,
      ...style,
    },
  },
    dot ? React.createElement('span', {
      'aria-hidden': true,
      style: { width: 6, height: 6, borderRadius: '50%', background: solid ? onSolid : fg, flexShrink: 0 },
    }) : null,
    children
  );
}
