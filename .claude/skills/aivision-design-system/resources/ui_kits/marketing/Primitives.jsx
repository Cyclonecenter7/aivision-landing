// Tiny utility components shared across the UI kit.
// Load via <script type="text/babel" src="Primitives.jsx">

// Eyebrow: 24px line + uppercase label. Color param: blue | red | black
function Eyebrow({ children, color = 'blue' }) {
  const colorMap = {
    blue: '#3F6EE8',
    red: '#E5484D',
    black: '#0A0A0A',
    white: '#FFFFFF',
  };
  const c = colorMap[color] || color;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontSize: 12, fontWeight: 500, color: c, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
      <span style={{ width: 24, height: 1, background: c }} />
      {children}
    </div>
  );
}

// Chamfer helper — produces the clip-path polygon
const chamfer = (px) => `polygon(0 0, 100% 0, 100% calc(100% - ${px}px), calc(100% - ${px}px) 100%, 0 100%)`;

// Primary button — blue, white text, chamfer 16
function Button({ children, onClick, variant = 'primary', size = 'default', fullWidth = false, iconRight = null }) {
  const sizes = {
    default: { padY: 16, padX: 32, chamfer: 16, fontSize: 14 },
    small:   { padY: 10, padX: 20, chamfer: 12, fontSize: 12 },
    large:   { padY: 18, padX: 36, chamfer: 16, fontSize: 15 },
  };
  const variants = {
    primary: { bg: '#3F6EE8', fg: '#fff', bgHover: '#2f5dd2' },
    dark:    { bg: '#0A0A0A', fg: '#fff', bgHover: '#3F6EE8' },
    invert:  { bg: '#fff', fg: '#3F6EE8', bgHover: '#EEF3FD' },
  };
  const s = sizes[size];
  const v = variants[variant];
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: `${s.padY}px ${s.padX}px`,
        background: hover ? v.bgHover : v.bg,
        color: v.fg,
        fontSize: s.fontSize,
        fontWeight: 500,
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'background 150ms',
        clipPath: chamfer(s.chamfer),
        width: fullWidth ? '100%' : 'auto',
      }}
    >
      {children}
      {iconRight}
    </button>
  );
}

// Card — the default light surface w/ chamfer 20
function Card({ children, variant = 'light', chamferSize = 20, padding = 24, style = {}, className = '' }) {
  const variants = {
    light: { bg: '#fff', border: '1px solid #E8E8E8', color: '#0A0A0A' },
    blue:  { bg: '#3F6EE8', border: 'none', color: '#fff' },
    dark:  { bg: '#181818', border: '1px solid #2A2A2A', color: '#fff' },
    black: { bg: '#0A0A0A', border: 'none', color: '#fff' },
    tint:  { bg: '#F0F3FA', border: '1px solid #E4E8F0', color: '#0A0A0A' },
    surface:{bg: '#F8F9FC', border: '1px solid #E8EEF8', color: '#0A0A0A' },
  };
  const v = variants[variant];
  return (
    <div
      className={className}
      style={{
        background: v.bg,
        border: v.border,
        color: v.color,
        padding,
        clipPath: chamferSize > 0 ? chamfer(chamferSize) : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Numbered ID square  (01 / 02 / 03)
function NumberBadge({ n, variant = 'blue', size = 40 }) {
  const variants = {
    blue:  { bg: '#3F6EE8', fg: '#fff' },
    white: { bg: '#fff', fg: '#3F6EE8' },
    black: { bg: '#0A0A0A', fg: '#fff' },
  };
  const v = variants[variant];
  return (
    <div style={{
      width: size, height: size,
      background: v.bg, color: v.fg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: Math.round(size * 0.33), fontWeight: 700,
      clipPath: chamfer(Math.round(size * 0.3)),
      flexShrink: 0,
    }}>{n}</div>
  );
}

// Kicker / micro-label (ex: "Результат", "Для кого")
function Kicker({ children, color = '#999', style = {} }) {
  return (
    <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color, ...style }}>
      {children}
    </div>
  );
}

Object.assign(window, { Eyebrow, Button, Card, NumberBadge, Kicker, chamfer });
