/**
 * Modal — centred dialog. Fade scrim + chamfered pop-in panel. Elevation via
 * filter:drop-shadow (clip-safe). Esc / scrim / close button all call onClose.
 */
export function Modal({ open, onClose, title, children, footer, width = 440, className = '', style = {} }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose && onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  const cut = 12;
  const clip = `polygon(0 0,100% 0,100% calc(100% - ${cut}px),calc(100% - ${cut}px) 100%,0 100%)`;

  return React.createElement('div', {
    role: 'dialog', 'aria-modal': 'true',
    onMouseDown: (e) => { if (e.target === e.currentTarget) onClose && onClose(); },
    style: {
      position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, background: 'rgba(6,6,6,.72)', animation: 'aiv-fade-in var(--dur-base) var(--ease-out)',
    },
  },
    React.createElement('div', {
      className: `anim-pop ${className}`,
      style: {
        width: '100%', maxWidth: width, background: 'var(--surface)',
        clipPath: clip, WebkitClipPath: clip,
        filter: 'drop-shadow(0 24px 60px rgba(0,0,0,.55))', ...style,
      },
    },
      // header
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, padding: '20px 22px 0' } },
        title ? React.createElement('h2', { style: { fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 500, letterSpacing: '-.01em', color: 'var(--text-primary)', margin: 0 } }, title) : React.createElement('span', null),
        React.createElement('button', {
          type: 'button', onClick: onClose, 'aria-label': 'Закрыть',
          style: { flexShrink: 0, width: 26, height: 26, marginTop: -2, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' },
        }, React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round' }, React.createElement('path', { d: 'M18 6 6 18 M6 6l12 12' })))
      ),
      // body
      React.createElement('div', { style: { padding: '12px 22px 0', fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.55, color: 'var(--text-secondary)' } }, children),
      // footer
      React.createElement('div', { style: { display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '20px 22px 22px' } }, footer)
    )
  );
}
