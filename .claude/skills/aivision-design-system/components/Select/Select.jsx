/**
 * Select — the AIVISION custom dropdown. Replaces the off-brand native
 * <select> popup with a chamfered trigger + chamfered floating menu.
 *
 * Chamfer rules (see CLAUDE.md):
 *  • Trigger focus/open state = ChamferBorder SVG overlay recoloured to
 *    --brand — NEVER an outline/box-shadow/border on the chamfered control.
 *  • The floating menu gets elevation from `filter: drop-shadow()` (follows
 *    the clipped silhouette) — NOT box-shadow, which clip-path would slice.
 *  • Cut is the form-field size (8px) to line up with Input in a form row.
 *
 * Keyboard: ↓/↑ move, Enter/Space select, Esc close. Click-outside closes.
 */
const SELECT_CUT = 8;

function useSelectChamfer(ref) {
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
  const points = w && h ? `0,0 ${w},0 ${w},${h - SELECT_CUT} ${w - SELECT_CUT},${h} 0,${h}` : '';
  return { w, h, points };
}

function normalizeOptions(options) {
  return (options || []).map((o) =>
    typeof o === 'object' && o !== null ? { value: o.value, label: o.label ?? o.value } : { value: o, label: o }
  );
}

export function Select({
  label,
  options,
  value,
  defaultValue,
  placeholder = 'Выберите…',
  onChange,
  disabled = false,
  error = false,
  className = '',
  style = {},
}) {
  const opts = normalizeOptions(options);
  const controlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const selected = controlled ? value : internal;

  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(-1);
  const rootRef = React.useRef(null);
  const triggerRef = React.useRef(null);
  const { w, h, points } = useSelectChamfer(triggerRef);

  const selectedIdx = opts.findIndex((o) => o.value === selected);
  const selectedLabel = selectedIdx >= 0 ? opts[selectedIdx].label : null;

  // Click-outside
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const openMenu = () => { if (disabled) return; setActive(selectedIdx >= 0 ? selectedIdx : 0); setOpen(true); };
  const choose = (i) => {
    const v = opts[i].value;
    if (!controlled) setInternal(v);
    onChange && onChange(v);
    setOpen(false);
    triggerRef.current && triggerRef.current.focus();
  };

  const onKeyDown = (e) => {
    if (disabled) return;
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openMenu(); }
      return;
    }
    if (e.key === 'Escape') { e.preventDefault(); setOpen(false); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(opts.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (active >= 0) choose(active); }
  };

  const clip = `polygon(0 0,100% 0,100% calc(100% - ${SELECT_CUT}px),calc(100% - ${SELECT_CUT}px) 100%,0 100%)`;
  const menuClip = `polygon(0 0,100% 0,100% calc(100% - ${SELECT_CUT}px),calc(100% - ${SELECT_CUT}px) 100%,0 100%)`;
  const stroke = error ? 'var(--crimson)' : open ? 'var(--brand)' : 'var(--border-strong)';

  return React.createElement('div', {
    ref: rootRef,
    className,
    style: { display: 'flex', flexDirection: 'column', gap: 6, position: 'relative', ...style },
  },
    label
      ? React.createElement('span', {
          style: {
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em',
            textTransform: 'uppercase', color: 'var(--text-muted)',
          },
        }, label)
      : null,

    // Trigger
    React.createElement('div', {
      style: { position: 'relative', display: 'block', opacity: disabled ? 0.45 : 1 },
    },
      React.createElement('button', {
        ref: triggerRef,
        type: 'button',
        disabled,
        'aria-haspopup': 'listbox',
        'aria-expanded': open,
        onClick: () => (open ? setOpen(false) : openMenu()),
        onKeyDown,
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
          width: '100%', height: 40, padding: '0 13px',
          background: 'var(--surface-alt)',
          color: selectedLabel ? 'var(--text-primary)' : 'var(--text-muted)',
          fontFamily: 'var(--font-ui)', fontSize: 13, textAlign: 'left',
          border: 'none', outline: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
          clipPath: clip, WebkitClipPath: clip,
        },
      },
        React.createElement('span', {
          style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
        }, selectedLabel || placeholder),
        // chevron
        React.createElement('svg', {
          width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none',
          stroke: 'var(--text-secondary)', strokeWidth: 2.4, 'aria-hidden': true,
          style: { flexShrink: 0, transition: 'transform .18s cubic-bezier(.4,0,.2,1)', transform: open ? 'rotate(180deg)' : 'none' },
        }, React.createElement('polyline', { points: '6 9 12 15 18 9' }))
      ),

      // ChamferBorder focus/open stroke
      points
        ? React.createElement('svg', {
            'aria-hidden': true, viewBox: `0 0 ${w} ${h}`, preserveAspectRatio: 'none',
            style: { position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' },
          },
            React.createElement('polygon', {
              points,
              style: { fill: 'none', stroke, strokeWidth: open || error ? 2 : 1.5, vectorEffect: 'non-scaling-stroke', transition: 'stroke .15s cubic-bezier(.4,0,.2,1)' },
            })
          )
        : null
    ),

    // Menu
    open
      ? React.createElement('div', {
          role: 'listbox',
          style: {
            position: 'absolute', top: label ? 'calc(100% + 0px)' : '100%', left: 0, right: 0, marginTop: 6,
            zIndex: 50, background: 'var(--surface)', padding: 5,
            clipPath: menuClip, WebkitClipPath: menuClip,
            filter: 'drop-shadow(0 10px 26px rgba(0,0,0,.45))',
            animation: 'aiv-select-in .14s cubic-bezier(.4,0,.2,1)',
          },
        },
          opts.map((o, i) => {
            const isSel = o.value === selected;
            const isActive = i === active;
            return React.createElement('div', {
              key: String(o.value) + i,
              role: 'option',
              'aria-selected': isSel,
              onMouseEnter: () => setActive(i),
              onClick: () => choose(i),
              style: {
                position: 'relative', display: 'flex', alignItems: 'center', gap: 9,
                height: 36, padding: '0 11px 0 12px', cursor: 'pointer',
                fontFamily: 'var(--font-ui)', fontSize: 13,
                fontWeight: isSel ? 600 : 400,
                color: isSel ? 'var(--brand)' : 'var(--text-primary)',
                background: isActive ? 'var(--surface-alt)' : 'transparent',
                clipPath: `polygon(0 0,100% 0,100% calc(100% - 4px),calc(100% - 4px) 100%,0 100%)`,
                transition: 'background .1s',
              },
            },
              // check (brand) — reserve space so labels align
              React.createElement('span', { style: { width: 13, flexShrink: 0, display: 'inline-flex' } },
                isSel
                  ? React.createElement('svg', { width: 13, height: 13, viewBox: '0 0 24 24', fill: 'none', stroke: 'var(--brand)', strokeWidth: 2.6, 'aria-hidden': true },
                      React.createElement('polyline', { points: '20 6 9 17 4 12' }))
                  : null
              ),
              React.createElement('span', { style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, o.label)
            );
          })
        )
      : null
  );
}
