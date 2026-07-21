/**
 * KPICard — the dashboard metric tile. Chamfered surface + left accent rail
 * (chamfer-safe, never a border). Value in Onest; delta as a mono
 * status chip (emerald ↑ / crimson ↓). The single most-repeated AIVISION unit.
 */
export function KPICard({
  label,
  value,
  delta,
  direction = 'up',
  accent = 'var(--brand)',
  className = '',
  style = {},
}) {
  const clip = 'polygon(0 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%)';
  const dColor = direction === 'down' ? 'var(--crimson)' : 'var(--emerald)';
  const arrow = direction === 'down' ? '↓' : '↑';

  return React.createElement('div', {
    className,
    style: {
      position: 'relative', background: 'var(--surface)',
      padding: '18px 20px 20px 22px', minWidth: 150,
      clipPath: clip, WebkitClipPath: clip, ...style,
    },
  },
    React.createElement('span', {
      'aria-hidden': true,
      style: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: accent },
    }),
    React.createElement('div', {
      style: {
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em',
        textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8,
      },
    }, label),
    React.createElement('div', {
      style: {
        fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 500,
        letterSpacing: '-.02em', lineHeight: 1.05, color: 'var(--text-primary)',
        fontVariantNumeric: 'tabular-nums',
      },
    }, value),
    delta != null
      ? React.createElement('div', {
          style: {
            display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 10,
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: dColor,
          },
        }, arrow + ' ' + delta)
      : null
  );
}
