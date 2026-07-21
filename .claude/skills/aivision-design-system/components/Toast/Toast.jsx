/**
 * Toast — transient notification. Chamfered surface + left rail (chamfer-safe
 * ::before-style inner bar). Elevation via filter: drop-shadow (clip-safe).
 */
const TOAST_CFG = {
  info:    { rail: 'var(--brand)',   icon: 'M12 16v-4 M12 8h.01', ring: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20' },
  success: { rail: 'var(--emerald)', icon: 'M20 6 9 17l-5-5' },
  error:   { rail: 'var(--crimson)', icon: 'M18 6 6 18 M6 6l12 12' },
  warning: { rail: 'var(--sun)',     icon: 'M12 9v4 M12 17h.01 M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z' },
};

export function Toast({ type = 'info', title, message, onClose, className = '', style = {} }) {
  const cfg = TOAST_CFG[type] || TOAST_CFG.info;
  const cut = 10;
  const clip = `polygon(0 0,100% 0,100% calc(100% - ${cut}px),calc(100% - ${cut}px) 100%,0 100%)`;
  const isCircle = type === 'info' || type === 'success';
  return React.createElement('div', {
    className: `anim-toast ${className}`, role: 'status',
    style: {
      position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 11,
      width: 340, padding: '13px 14px 13px 17px', background: 'var(--surface)',
      clipPath: clip, WebkitClipPath: clip,
      filter: 'drop-shadow(0 10px 26px rgba(0,0,0,.4))', ...style,
    },
  },
    // left rail (chamfer-safe — inside the clip)
    React.createElement('span', { 'aria-hidden': true, style: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: cfg.rail } }),
    // icon
    React.createElement('svg', { width: 17, height: 17, viewBox: '0 0 24 24', fill: 'none', stroke: cfg.rail, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', style: { flexShrink: 0, marginTop: 1 } },
      isCircle ? React.createElement('circle', { cx: 12, cy: 12, r: 10 }) : null,
      React.createElement('path', { d: cfg.icon })
    ),
    // text
    React.createElement('div', { style: { flex: 1, minWidth: 0 } },
      React.createElement('div', { style: { fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' } }, title),
      message ? React.createElement('div', { style: { fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.45 } }, message) : null
    ),
    // close
    onClose ? React.createElement('button', {
      type: 'button', onClick: onClose, 'aria-label': 'Закрыть',
      style: { flexShrink: 0, width: 20, height: 20, padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' },
    },
      React.createElement('svg', { width: 13, height: 13, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round' },
        React.createElement('path', { d: 'M18 6 6 18 M6 6l12 12' }))
    ) : null
  );
}
