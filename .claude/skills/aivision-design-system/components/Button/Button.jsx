/**
 * Button — chamfered AIVISION action. Variants: primary | secondary | ghost
 * | danger. The chamfer is the action's focus mark and deepens TRANSIENTLY on
 * press (10→18px), then springs back — focus from motion, not a bigger cut.
 *
 * No border anywhere (clip-path would tear it). "ghost" is a low-contrast
 * FILL, not an outline.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  className = '',
  style = {},
  children,
  ...rest
}) {
  const [pressed, setPressed] = React.useState(false);
  const cut = pressed ? 18 : 10;
  const clip = `polygon(0 0,100% 0,100% calc(100% - ${cut}px),calc(100% - ${cut}px) 100%,0 100%)`;

  const SIZES = {
    sm: { height: 32, padding: '0 14px', fontSize: 12 },
    md: { height: 40, padding: '0 18px', fontSize: 13 },
    lg: { height: 48, padding: '0 24px', fontSize: 15 },
  };
  const PALETTES = {
    primary:   { background: 'var(--brand)',       color: '#fff' },
    secondary: { background: 'var(--surface-alt)',  color: 'var(--text-primary)' },
    ghost:     { background: 'var(--surface)',      color: 'var(--text-secondary)' },
    danger:    { background: 'var(--crimson)',      color: '#fff' },
  };
  const sz = SIZES[size] || SIZES.md;
  const pal = PALETTES[variant] || PALETTES.primary;

  const btnStyle = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    height: sz.height, padding: sz.padding, fontSize: sz.fontSize, fontWeight: 600,
    fontFamily: 'var(--font-ui)', letterSpacing: '.01em',
    border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
    clipPath: clip, WebkitClipPath: clip,
    transition: 'clip-path .18s cubic-bezier(.4,0,.2,1), filter .15s',
    ...pal,
    ...style,
  };
  return React.createElement(as, {
    className,
    style: btnStyle,
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    onMouseLeave: () => setPressed(false),
    ...rest,
  }, children);
}
