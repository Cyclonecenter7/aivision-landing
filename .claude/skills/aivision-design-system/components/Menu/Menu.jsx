/**
 * Menu — context / action dropdown. Chamfered trigger + chamfered floating
 * action list. Open = ChamferBorder stroke on the trigger; menu elevation =
 * filter:drop-shadow (clip-safe). NEVER a border on the chamfer.
 */
const MENU_CUT = 8;

function useMenuChamfer(ref) {
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
  const points = w && h ? `0,0 ${w},0 ${w},${h - MENU_CUT} ${w - MENU_CUT},${h} 0,${h}` : '';
  return { w, h, points };
}

export function Menu({ trigger, items = [], align = 'left', className = '', style = {} }) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(-1);
  const rootRef = React.useRef(null);
  const trigRef = React.useRef(null);
  const { w, h, points } = useMenuChamfer(trigRef);

  const actionIdx = items.map((it, i) => (it === 'separator' || it.disabled ? -1 : i)).filter((i) => i >= 0);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const choose = (i) => {
    const it = items[i];
    if (it && it !== 'separator' && !it.disabled) { it.onSelect && it.onSelect(); setOpen(false); trigRef.current && trigRef.current.focus(); }
  };
  const move = (dir) => {
    if (!actionIdx.length) return;
    const cur = actionIdx.indexOf(active);
    const next = cur < 0 ? (dir > 0 ? 0 : actionIdx.length - 1) : Math.max(0, Math.min(actionIdx.length - 1, cur + dir));
    setActive(actionIdx[next]);
  };
  const onKeyDown = (e) => {
    if (!open) { if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(true); setActive(actionIdx[0] ?? -1); } return; }
    if (e.key === 'Escape') { e.preventDefault(); setOpen(false); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (active >= 0) choose(active); }
  };

  const clip = `polygon(0 0,100% 0,100% calc(100% - ${MENU_CUT}px),calc(100% - ${MENU_CUT}px) 100%,0 100%)`;
  const stroke = open ? 'var(--brand)' : 'var(--border-strong)';

  return React.createElement('div', {
    ref: rootRef, className,
    style: { position: 'relative', display: 'inline-flex', ...style },
  },
    React.createElement('div', { style: { position: 'relative', display: 'inline-flex' } },
      React.createElement('button', {
        ref: trigRef, type: 'button', 'aria-haspopup': 'menu', 'aria-expanded': open,
        onClick: () => setOpen((o) => !o), onKeyDown,
        style: {
          display: 'inline-flex', alignItems: 'center', gap: 7, height: 36, padding: '0 13px',
          background: 'var(--surface-alt)', color: 'var(--text-primary)',
          fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 500,
          border: 'none', outline: 'none', cursor: 'pointer', clipPath: clip, WebkitClipPath: clip,
        },
      }, trigger),
      points ? React.createElement('svg', {
        'aria-hidden': true, viewBox: `0 0 ${w} ${h}`, preserveAspectRatio: 'none',
        style: { position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' },
      }, React.createElement('polygon', { points, style: { fill: 'none', stroke, strokeWidth: open ? 2 : 1.5, vectorEffect: 'non-scaling-stroke', transition: 'stroke var(--dur-fast) var(--ease-out)' } })) : null
    ),

    open ? React.createElement('div', {
      role: 'menu', className: 'anim-select',
      style: {
        position: 'absolute', top: 'calc(100% + 6px)', [align]: 0, zIndex: 50, minWidth: 180,
        background: 'var(--surface)', padding: 5, clipPath: clip, WebkitClipPath: clip,
        filter: 'drop-shadow(0 10px 26px rgba(0,0,0,.45))', animation: 'aiv-select-in var(--dur-base) var(--ease-out)',
      },
    },
      items.map((it, i) => {
        if (it === 'separator') return React.createElement('div', { key: 'sep' + i, role: 'separator', style: { height: 1, background: 'var(--border)', margin: '5px 0' } });
        const isActive = i === active;
        const fg = it.disabled ? 'var(--text-muted)' : it.danger ? 'var(--crimson)' : 'var(--text-primary)';
        return React.createElement('div', {
          key: i, role: 'menuitem', 'aria-disabled': !!it.disabled,
          onMouseEnter: () => !it.disabled && setActive(i),
          onClick: () => choose(i),
          style: {
            display: 'flex', alignItems: 'center', gap: 10, height: 34, padding: '0 11px',
            fontFamily: 'var(--font-ui)', fontSize: 13, color: fg,
            cursor: it.disabled ? 'not-allowed' : 'pointer', opacity: it.disabled ? 0.5 : 1,
            background: isActive && !it.disabled ? (it.danger ? 'rgba(244,63,94,.1)' : 'var(--surface-alt)') : 'transparent',
            clipPath: `polygon(0 0,100% 0,100% calc(100% - 4px),calc(100% - 4px) 100%,0 100%)`,
            transition: 'background var(--dur-instant) var(--ease-out)',
          },
        },
          it.icon ? React.createElement('svg', { width: 15, height: 15, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', style: { flexShrink: 0, opacity: 0.85 } }, React.createElement('path', { d: it.icon })) : null,
          React.createElement('span', null, it.label)
        );
      })
    ) : null
  );
}
