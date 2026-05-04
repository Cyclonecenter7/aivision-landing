// ─── Design tokens ────────────────────────────────────────────
export const G = '#16A34A';
export const R = '#E5484D';
export const B = '#3F6EE8';
export const ch = (px) => ({ clipPath: `polygon(0 0,100% 0,100% calc(100% - ${px}px),calc(100% - ${px}px) 100%,0 100%)` });

// ─── Atoms ────────────────────────────────────────────────────

export function Ticker({ items }) {
  return (
    <div style={{ background: '#0A0A0A', display: 'flex', alignItems: 'center', padding: '0 14px', height: 28, overflow: 'hidden', fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>
      <div style={{ width: 5, height: 5, background: G, borderRadius: '50%', boxShadow: `0 0 5px ${G}`, marginRight: 7, flexShrink: 0 }} />
      <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.22em', color: G, marginRight: 12, flexShrink: 0 }}>LIVE</span>
      {items.map((t, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, paddingRight: 12, marginRight: 12, flexShrink: 0, borderRight: i < items.length - 1 ? '1px solid #1A1A1A' : 'none' }}>
          <span style={{ fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666' }}>{t.label}</span>
          <span style={{ fontSize: 9, fontWeight: 700, color: '#E0E0E0' }}>{t.value}</span>
          {t.delta && <span style={{ fontSize: 9, fontWeight: 700, color: t.pos ? G : R }}>{t.delta}</span>}
        </div>
      ))}
    </div>
  );
}

export function Kpi({ label, value, delta, deltaPos, unit }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #E8E8E8', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontSize: 8, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888' }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1, fontVariantNumeric: 'tabular-nums', color: '#0A0A0A' }}>
        {value}{unit && <span style={{ fontSize: 9, color: '#AAA', fontWeight: 500, marginLeft: 2 }}>{unit}</span>}
      </div>
      {delta && <div style={{ fontSize: 10, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: deltaPos ? G : R }}>{delta}</div>}
    </div>
  );
}

export function Bar({ pct, color = B, height = 5 }) {
  return (
    <div style={{ background: '#F0F3FA', height, width: '100%' }}>
      <div style={{ height, width: `${Math.min(pct, 100)}%`, background: color }} />
    </div>
  );
}

export function SparkLine({ data, color = B, w = 130, h = 44 }) {
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = 4 + (i / (data.length - 1)) * (w - 8);
    const y = h - 4 - ((v - min) / range) * (h - 10);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  const last = pts.split(' ').pop().split(',');
  return (
    <svg width={w} height={h} style={{ overflow: 'visible' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={last[0]} cy={last[1]} r={3} fill={color} />
    </svg>
  );
}

export function PieDonut({ segments, size = 66 }) {
  const cx = size / 2, cy = size / 2, r = size * 0.4, inner = size * 0.22;
  const total = segments.reduce((s, g) => s + g.v, 0);
  let angle = -Math.PI / 2;
  return (
    <svg width={size} height={size}>
      {segments.map((seg, i) => {
        const ratio = seg.v / total;
        const a0 = angle, a1 = (angle += ratio * 2 * Math.PI);
        const x1 = cx + r * Math.cos(a0), y1 = cy + r * Math.sin(a0);
        const x2 = cx + r * Math.cos(a1), y2 = cy + r * Math.sin(a1);
        const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
        const xi2 = cx + inner * Math.cos(a0), yi2 = cy + inner * Math.sin(a0);
        const large = ratio > 0.5 ? 1 : 0;
        const d = `M${x1.toFixed(2)},${y1.toFixed(2)} A${r},${r},0,${large},1,${x2.toFixed(2)},${y2.toFixed(2)} L${xi1.toFixed(2)},${yi1.toFixed(2)} A${inner},${inner},0,${large},0,${xi2.toFixed(2)},${yi2.toFixed(2)} Z`;
        return <path key={i} d={d} fill={seg.c} />;
      })}
    </svg>
  );
}

export const TH = ({ children, align = 'left' }) => (
  <th style={{ textAlign: align, padding: '8px 12px', fontSize: 8, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', borderBottom: '1px solid #F0F0F0', whiteSpace: 'nowrap' }}>
    {children}
  </th>
);

export const TD = ({ children, align = 'left', color, blur }) => (
  <td style={{ textAlign: align, padding: '7px 12px', fontSize: 10, fontWeight: 500, color: color || '#333', borderBottom: '1px solid #F4F4F5', fontVariantNumeric: 'tabular-nums', ...(blur ? { filter: 'blur(3px)', userSelect: 'none' } : {}) }}>
    {children}
  </td>
);
