/**
 * Tooltip — hover/focus label bubble. Chamfered, filter:drop-shadow elevation.
 * Shows after a short delay on mouseenter / focus; hides on leave / blur / Esc.
 */
export function Tooltip({ label, placement = 'top', children, className = '', style = {} }) {
  const [open, setOpen] = React.useState(false);
  const timer = React.useRef(null);
  const show = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(true), 120); };
  const hide = () => { clearTimeout(timer.current); setOpen(false); };
  React.useEffect(() => () => clearTimeout(timer.current), []);

  const cut = 6;
  const clip = `polygon(0 0,100% 0,100% calc(100% - ${cut}px),calc(100% - ${cut}px) 100%,0 100%)`;
  const gap = 8;
  const pos = {
    top:    { bottom: `calc(100% + ${gap}px)`, left: '50%', transform: 'translateX(-50%)' },
    bottom: { top: `calc(100% + ${gap}px)`, left: '50%', transform: 'translateX(-50%)' },
    left:   { right: `calc(100% + ${gap}px)`, top: '50%', transform: 'translateY(-50%)' },
    right:  { left: `calc(100% + ${gap}px)`, top: '50%', transform: 'translateY(-50%)' },
  }[placement];

  return React.createElement('span', {
    className,
    style: { position: 'relative', display: 'inline-flex', ...style },
    onMouseEnter: show, onMouseLeave: hide, onFocus: show, onBlur: hide,
    onKeyDown: (e) => { if (e.key === 'Escape') hide(); },
  },
    children,
    open ? React.createElement('span', {
      role: 'tooltip',
      className: 'anim-pop',
      style: {
        position: 'absolute', ...pos, zIndex: 60, whiteSpace: 'nowrap',
        background: 'var(--surface)', color: 'var(--text-primary)',
        fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 500,
        padding: '6px 10px', clipPath: clip, WebkitClipPath: clip,
        filter: 'drop-shadow(0 6px 18px rgba(0,0,0,.45))', pointerEvents: 'none',
      },
    }, label) : null
  );
}
