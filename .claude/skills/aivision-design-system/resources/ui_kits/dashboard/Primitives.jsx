/* global React */
// ============================================================
// AIVISION Dashboard UI Kit — Primitives
// All atoms. Load after tokens.css.
// Everything exported to window.DB.* namespace.
// ============================================================

const DB_BLUE = '#3F6EE8';
const DB_GREEN = '#16A34A';
const DB_RED = '#E5484D';
const DB_WARN = '#EAB308';
const DB_BLACK = '#0A0A0A';

// ─── chamfer helper ──────────────────────────────────────────
function ch(px) {
  return { clipPath: `polygon(0 0,100% 0,100% calc(100% - ${px}px),calc(100% - ${px}px) 100%,0 100%)` };
}

// ─── Eyebrow (mini, dashboard scale) ─────────────────────────
function DBEyebrow({ children, color = DB_BLUE }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      fontSize: 10, fontWeight: 500, letterSpacing: '0.18em',
      textTransform: 'uppercase', color,
    }}>
      <span style={{ width: 20, height: 1, background: color, flexShrink: 0 }} />
      {children}
    </div>
  );
}

// ─── LIVE Ticker ─────────────────────────────────────────────
// Black bar with scrolling key metrics + live green dot.
function DBTicker({ items }) {
  // items: [{ label, value, delta, pos }]
  return (
    <div style={{
      background: DB_BLACK, display: 'flex', alignItems: 'center',
      padding: '0 20px', height: 36, overflow: 'hidden', fontVariantNumeric: 'tabular-nums',
    }}>
      <div style={{ width: 6, height: 6, background: DB_GREEN, borderRadius: '50%', boxShadow: '0 0 6px #16A34A', marginRight: 8, flexShrink: 0 }} />
      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.22em', color: DB_GREEN, marginRight: 16, flexShrink: 0 }}>LIVE</span>
      {items.map((t, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          paddingRight: 18, marginRight: 18, flexShrink: 0,
          borderRight: i < items.length - 1 ? '1px solid #1A1A1A' : 'none',
        }}>
          <span style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#666' }}>{t.label}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#E8E8E8' }}>{t.value}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: t.pos ? DB_GREEN : DB_RED }}>{t.delta}</span>
        </div>
      ))}
    </div>
  );
}

// ─── KPI Card ────────────────────────────────────────────────
// size: 'default' | 'compact' | 'hero'
function DBKpi({ label, value, delta, deltaPos, size = 'default', unit, style = {} }) {
  const sizes = {
    compact: { pad: '14px 16px', val: 22, delta: 11, clip: 8 },
    default: { pad: '18px 20px', val: 32, delta: 12, clip: 10 },
    hero:    { pad: '28px 32px', val: 88, delta: 14, clip: 20 },
  };
  const s = sizes[size];
  return (
    <div style={{
      background: '#fff', border: '1px solid #E8E8E8',
      padding: s.pad, display: 'flex', flexDirection: 'column', gap: 6,
      ...ch(s.clip), ...style,
    }}>
      <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888' }}>{label}</div>
      <div style={{ fontSize: s.val, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1, fontVariantNumeric: 'tabular-nums', color: DB_BLACK }}>
        {value}{unit && <span style={{ fontSize: s.val * 0.45, color: '#888', fontWeight: 500, letterSpacing: 0, marginLeft: 4 }}>{unit}</span>}
      </div>
      {delta && (
        <div style={{ fontSize: s.delta, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: deltaPos ? DB_GREEN : DB_RED }}>{delta}</div>
      )}
    </div>
  );
}

// ─── KPI Strip ───────────────────────────────────────────────
// Horizontal row of compact KPI cards with equal-width cells.
function DBKpiStrip({ items }) {
  // items: [{ label, value, delta, deltaPos }]
  return (
    <div style={{ background: '#fff', border: '1px solid #E8E8E8', display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, ...ch(16) }}>
      {items.map((k, i) => (
        <div key={i} style={{
          padding: '20px 24px',
          borderRight: i < items.length - 1 ? '1px solid #F0F0F0' : 'none',
        }}>
          <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: 10 }}>{k.label}</div>
          <div style={{ fontSize: k.big ? 72 : 32, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.95, fontVariantNumeric: 'tabular-nums' }}>
            {k.value}{k.unit && <span style={{ fontSize: k.big ? 28 : 16, color: '#888', fontWeight: 500, letterSpacing: 0, marginLeft: 6 }}>{k.unit}</span>}
          </div>
          {k.delta && (
            <div style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums', marginTop: 8, color: k.deltaPos ? DB_GREEN : DB_RED }}>{k.delta}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Sparkline ───────────────────────────────────────────────
function DBSparkline({ values, color = DB_BLUE, width = 120, height = 28, filled = false }) {
  const min = Math.min(...values), max = Math.max(...values), range = max - min || 1;
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * width},${height - ((v - min) / range) * height}`).join(' ');
  const lastX = width, lastY = height - ((values[values.length - 1] - min) / range) * height;
  return (
    <svg width={width} height={height} style={{ display: 'inline-block', verticalAlign: 'middle', overflow: 'visible' }}>
      {filled && (
        <polyline points={`0,${height} ${pts} ${lastX},${height}`} fill={`${color}18`} stroke="none" />
      )}
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lastX} cy={lastY} r="3" fill={color} />
    </svg>
  );
}

// ─── Inline Sparkline (tiny, for table cells) ────────────────
function DBSparkMini({ values, pos = true }) {
  return <DBSparkline values={values} color={pos ? DB_GREEN : DB_RED} width={64} height={16} />;
}

// ─── Progress Bar ─────────────────────────────────────────────
function DBBar({ pct, variant = 'neu', height = 6 }) {
  const colors = { pos: DB_GREEN, neg: DB_RED, neu: DB_BLUE };
  return (
    <div style={{ background: '#F0F3FA', height, width: '100%' }}>
      <div style={{ height, width: `${Math.min(pct, 100)}%`, background: colors[variant] || colors.neu, ...ch(4) }} />
    </div>
  );
}

// ─── Data Table ───────────────────────────────────────────────
// cols: [{ key, label, align, render, width }]
// rows: [{ ...data }]
function DBTable({ cols, rows, title, subtitle, action }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #E8E8E8', ...ch(10) }}>
      {(title || action) && (
        <div style={{ padding: '14px 18px', borderBottom: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            {title && <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em' }}>{title}</div>}
            {subtitle && <div style={{ fontSize: 10, color: '#888', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>{subtitle}</div>}
          </div>
          {action && <div style={{ fontSize: 10, color: '#888', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{action}</div>}
        </div>
      )}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, fontVariantNumeric: 'tabular-nums' }}>
        <thead>
          <tr>
            {cols.map((c, i) => (
              <th key={i} style={{
                textAlign: c.align || 'left', padding: '10px 18px',
                fontSize: 9, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888',
                borderBottom: '1px solid #F0F0F0', width: c.width,
              }}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ cursor: 'default' }}>
              {cols.map((c, j) => (
                <td key={j} style={{
                  textAlign: c.align || 'left', padding: '11px 18px',
                  borderBottom: i < rows.length - 1 ? '1px solid #F4F4F5' : 'none',
                  fontSize: 13, fontWeight: 500, color: '#333',
                }}>
                  {c.render ? c.render(row[c.key], row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Delta Cell (for table use) ───────────────────────────────
function DBDelta({ value, pos }) {
  return <span style={{ color: pos ? DB_GREEN : DB_RED, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{value}</span>;
}

// ─── Funnel ───────────────────────────────────────────────────
// stages: [{ label, value, pct, conv, bottleneck }]
function DBFunnel({ stages, title }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #E8E8E8', ...ch(10) }}>
      {title && (
        <div style={{ padding: '14px 18px', borderBottom: '1px solid #F0F0F0' }}>
          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em' }}>{title}</div>
        </div>
      )}
      <div style={{ padding: '14px 18px 20px' }}>
        {stages.map((s, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5, alignItems: 'baseline' }}>
              <span style={{ color: s.bottleneck ? DB_BLACK : '#555', fontWeight: s.bottleneck ? 700 : 500 }}>
                {s.label}
                {s.bottleneck && <span style={{ color: DB_RED, fontSize: 9, letterSpacing: '0.18em', marginLeft: 8 }}>УЗЕЛ</span>}
              </span>
              <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 700 }}>
                {typeof s.value === 'number' ? s.value.toLocaleString('ru-RU') : s.value}
                {s.conv && <span style={{ color: s.bottleneck ? DB_RED : '#888', fontWeight: 500, marginLeft: 8 }}>{s.conv}</span>}
              </span>
            </div>
            <div style={{ height: 20, background: '#F0F3FA', ...ch(4) }}>
              <div style={{
                height: '100%', width: `${s.pct}%`,
                background: s.bottleneck ? DB_BLACK : `rgba(63,110,232,${1 - i * 0.14})`,
                ...ch(4),
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Pipeline / Kanban Stage ──────────────────────────────────
function DBStageCard({ id, name, amount, tag, tagVariant = 'review' }) {
  const tagColors = {
    review: { bg: '#FEF3C7', fg: '#92620B' },
    sent:   { bg: '#EEF3FD', fg: '#2545B8' },
    won:    { bg: '#DCFCE7', fg: '#107D38' },
    lost:   { bg: '#FEE2E2', fg: '#991B1B' },
  };
  const tc = tagColors[tagVariant] || tagColors.review;
  return (
    <div style={{ background: '#F8F9FC', border: '1px solid #E8EEF8', padding: '10px 12px', ...ch(8) }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: DB_BLUE, marginBottom: 3 }}>{id}</div>
      <div style={{ fontSize: 12, fontWeight: 700, color: DB_BLACK, marginBottom: 3 }}>{name}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: DB_GREEN, marginBottom: 6, fontVariantNumeric: 'tabular-nums' }}>{amount}</div>
      <span style={{ display: 'inline-block', padding: '2px 7px', fontSize: 10, fontWeight: 500, background: tc.bg, color: tc.fg, borderRadius: 2 }}>{tag}</span>
    </div>
  );
}

function DBPipelineColumn({ label, dotColor = DB_BLUE, cards = [] }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #E8E8E8', padding: '14px 14px', ...ch(8) }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: '#333' }}>{label}</span>
        <span style={{ fontSize: 10, color: '#999', marginLeft: 'auto' }}>{cards.length}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {cards.map((c, i) => <DBStageCard key={i} {...c} />)}
      </div>
    </div>
  );
}

// ─── SVG Line Chart ───────────────────────────────────────────
// series: [{ values, color, dashed }]
// xLabels: string[]
function DBLineChart({ series, xLabels, title, width = 500, height = 100 }) {
  const allVals = series.flatMap(s => s.values);
  const min = Math.min(...allVals), max = Math.max(...allVals), range = max - min || 1;
  const toY = (v) => height - ((v - min) / range) * height;
  const toX = (i, len) => (i / (len - 1)) * width;
  const GRID = [33, 66];

  return (
    <div>
      {title && <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>{title}</div>}
      <svg viewBox={`0 0 ${width} ${height + 24}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
        {GRID.map(p => (
          <line key={p} x1="0" y1={height - (p / 100) * height} x2={width} y2={height - (p / 100) * height} stroke="#F0F0F0" strokeWidth="1" />
        ))}
        {series.map((s, si) => {
          const pts = s.values.map((v, i) => `${toX(i, s.values.length)},${toY(v)}`).join(' ');
          const lx = toX(s.values.length - 1, s.values.length);
          const ly = toY(s.values[s.values.length - 1]);
          return (
            <g key={si}>
              {s.filled && (
                <polyline
                  points={`0,${height} ${pts} ${lx},${height}`}
                  fill={`${s.color}14`} stroke="none"
                />
              )}
              <polyline
                points={pts} fill="none"
                stroke={s.color} strokeWidth={s.thin ? 1.2 : 2}
                strokeDasharray={s.dashed ? '4 3' : undefined}
                strokeLinecap="round" strokeLinejoin="round"
              />
              <circle cx={lx} cy={ly} r="3" fill={s.color} />
            </g>
          );
        })}
        {xLabels && xLabels.map((l, i) => (
          <text key={i} x={toX(i, xLabels.length)} y={height + 18} textAnchor="middle" fontSize="9" fill="#AAA" letterSpacing="1">{l}</text>
        ))}
      </svg>
    </div>
  );
}

// ─── Callout ─────────────────────────────────────────────────
// Black accent strip with a TAG and a diagnostic sentence.
function DBCallout({ tag = 'УЗЕЛ', children }) {
  return (
    <div style={{
      background: DB_BLACK, color: '#fff', padding: '16px 22px',
      display: 'flex', alignItems: 'center', gap: 18, ...ch(12),
    }}>
      <div style={{
        fontSize: 9, fontWeight: 700, letterSpacing: '0.2em',
        color: DB_BLUE, padding: '4px 8px', border: `1px solid ${DB_BLUE}`,
        flexShrink: 0,
      }}>{tag}</div>
      <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.45, letterSpacing: '-0.005em', color: '#E8E8E8' }}>{children}</div>
    </div>
  );
}

// ─── Diagnostic Column ────────────────────────────────────────
// Black right column — the "дерзкость" in hybrid concepts E/F.
// items: [{ num, title, body }]
function DBDiagColumn({ items, footer }) {
  return (
    <div style={{
      background: DB_BLACK, color: '#E8E8E8', padding: '22px 20px',
      display: 'flex', flexDirection: 'column', gap: 0, ...ch(20),
    }}>
      <div style={{
        fontSize: 10, fontWeight: 500, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: '#888',
        paddingBottom: 12, borderBottom: '1px solid #1A1A1A', marginBottom: 16,
      }}>Диагностика</div>
      {items.map((it, i) => (
        <div key={i} style={{ paddingBottom: 14, marginBottom: 14, borderBottom: i < items.length - 1 ? '1px solid #1A1A1A' : 'none' }}>
          <div style={{ fontSize: 10, color: DB_BLUE, fontWeight: 700, letterSpacing: '0.18em', marginBottom: 7 }}>{it.num}</div>
          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em', color: '#fff', marginBottom: 5, lineHeight: 1.3 }}>{it.title}</div>
          <div style={{ fontSize: 11, color: '#888', lineHeight: 1.55 }}>{it.body}</div>
        </div>
      ))}
      {footer && <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid #1A1A1A', fontSize: 10, color: '#555', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{footer}</div>}
    </div>
  );
}

// ─── Filter Bar ───────────────────────────────────────────────
// chips: [{ label, active }]
function DBFilterBar({ chips, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {chips.map((c, i) => (
        <button key={i} onClick={() => onSelect && onSelect(i)} style={{
          padding: '7px 14px', fontSize: 11, fontWeight: 500, fontFamily: 'inherit',
          background: c.active ? DB_BLACK : '#fff',
          color: c.active ? '#fff' : '#333',
          border: c.active ? `1px solid ${DB_BLACK}` : '1px solid #E8E8E8',
          cursor: 'pointer', ...ch(6),
        }}>{c.label}</button>
      ))}
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────
// groups: [{ label, items: [{ label, active, icon? }] }]
function DBSidebar({ brand = 'AIVISION BI', groups }) {
  return (
    <aside style={{ background: '#fff', borderRight: '1px solid #E8E8E8', padding: '20px 0', minWidth: 200, fontFamily: 'inherit' }}>
      <div style={{ padding: '0 20px 20px', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 6, height: 6, background: DB_BLUE, borderRadius: '50%' }} />
        {brand}
      </div>
      {groups.map((g, gi) => (
        <div key={gi}>
          <div style={{ padding: '14px 20px 6px', fontSize: 9, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#999' }}>{g.label}</div>
          {g.items.map((it, ii) => (
            <div key={ii} style={{
              padding: '9px 20px', fontSize: 13, fontWeight: it.active ? 600 : 500,
              background: it.active ? '#F0F3FA' : 'transparent',
              color: it.active ? DB_BLUE : '#333',
              borderLeft: it.active ? `2px solid ${DB_BLUE}` : '2px solid transparent',
              cursor: 'pointer',
            }}>{it.label}</div>
          ))}
        </div>
      ))}
    </aside>
  );
}

// ─── Period Picker ────────────────────────────────────────────
function DBPeriodPicker({ options, active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 2, padding: 2, background: '#fff', border: '1px solid #E8E8E8' }}>
      {options.map((o, i) => (
        <button key={i} onClick={() => onChange && onChange(i)} style={{
          padding: '6px 14px', fontSize: 10, fontWeight: 600,
          letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'inherit',
          background: i === active ? DB_BLACK : 'transparent',
          color: i === active ? '#fff' : '#666',
          border: 'none', cursor: 'pointer',
        }}>{o}</button>
      ))}
    </div>
  );
}

// ─── Editorial Headline ───────────────────────────────────────
// The "дерзкость" in the masthead: diagnostic hypothesis title.
function DBEditorialHead({ kicker, headline, meta, highlightWord }) {
  const parts = highlightWord
    ? headline.split(highlightWord).flatMap((part, i, arr) => i < arr.length - 1 ? [part, <span key={i} style={{ color: DB_BLUE }}>{highlightWord}</span>] : [part])
    : [headline];
  return (
    <div style={{ paddingBottom: 18, borderBottom: '1px solid #E8E8E8', marginBottom: 22 }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 10, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: DB_BLUE, marginBottom: 10 }}>
        <span style={{ width: 28, height: 1, background: DB_BLUE }} />{kicker}
      </div>
      <h1 style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.05, margin: '0 0 6px', maxWidth: 720 }}>{parts}</h1>
      {meta && <div style={{ fontSize: 11, color: '#888', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{meta}</div>}
    </div>
  );
}

// Export everything to window.DB
window.DB = {
  ch,
  Eyebrow: DBEyebrow,
  Ticker: DBTicker,
  Kpi: DBKpi,
  KpiStrip: DBKpiStrip,
  Sparkline: DBSparkline,
  SparkMini: DBSparkMini,
  Bar: DBBar,
  Table: DBTable,
  Delta: DBDelta,
  Funnel: DBFunnel,
  StageCard: DBStageCard,
  PipelineColumn: DBPipelineColumn,
  LineChart: DBLineChart,
  Callout: DBCallout,
  DiagColumn: DBDiagColumn,
  FilterBar: DBFilterBar,
  Sidebar: DBSidebar,
  PeriodPicker: DBPeriodPicker,
  EditorialHead: DBEditorialHead,
};
