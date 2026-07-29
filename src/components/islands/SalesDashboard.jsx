import { useState, useRef, useEffect } from 'react';

const T = { bg: '#0A0A0A', card: '#161616', card2: '#1A1A1A', border: '#252525', borderSoft: '#1F1F1F', t1: '#F0F0F0', t2: '#888888', t3: '#555555' };
const C = { brand: '#3F6EE8', emerald: '#10B981', crimson: '#F43F5E', sun: '#FCD34D', tan: '#FB923C', slate: '#94A3B8' };
const ch = (n = 8) => ({ clipPath: `polygon(0 0,100% 0,100% calc(100% - ${n}px),calc(100% - ${n}px) 100%,0 100%)` });
const ha = (c, a) => { const h = c.replace('#', ''); return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${a})`; };

function useIsMobile(bp = 540) {
  const [m, setM] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia(`(max-width: ${bp}px)`);
    const fn = () => setM(mq.matches);
    fn();
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, [bp]);
  return m;
}

function smooth(pts) {
  const n = pts.length; if (n < 2) return '';
  if (n === 2) return `M${pts[0][0]},${pts[0][1]} L${pts[1][0]},${pts[1][1]}`;
  const t = new Array(n);
  for (let i = 1; i < n - 1; i++) {
    const d1 = pts[i][0] - pts[i - 1][0], d2 = pts[i + 1][0] - pts[i][0];
    const s1 = (pts[i][1] - pts[i - 1][1]) / d1, s2 = (pts[i + 1][1] - pts[i][1]) / d2;
    if (s1 * s2 <= 0) t[i] = 0;
    else { const p = (s1 * d2 + s2 * d1) / (d1 + d2); t[i] = Math.sign(s1) * Math.min(Math.abs(s1), Math.abs(s2), .5 * Math.abs(p)); }
  }
  t[0] = (pts[1][1] - pts[0][1]) / (pts[1][0] - pts[0][0]);
  t[n - 1] = (pts[n - 1][1] - pts[n - 2][1]) / (pts[n - 1][0] - pts[n - 2][0]);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < n - 1; i++) {
    const dx = (pts[i + 1][0] - pts[i][0]) / 3;
    d += ` C${pts[i][0] + dx},${pts[i][1] + t[i] * dx} ${pts[i + 1][0] - dx},${pts[i + 1][1] - t[i + 1] * dx} ${pts[i + 1][0]},${pts[i + 1][1]}`;
  }
  return d;
}

function Spark({ data, color, h = 36, bright = false, fill = true }) {
  const ref = useRef(null);
  const [w, setW] = useState(120);
  useEffect(() => {
    if (!ref.current) return;
    const r = new ResizeObserver(([e]) => setW(e.contentRect.width));
    r.observe(ref.current);
    return () => r.disconnect();
  }, []);
  if (!data || data.length < 2) return <div ref={ref} style={{ height: h }} />;
  const mn = Math.min(...data), mx = Math.max(...data), rg = mx - mn || 1;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - ((v - mn) / rg) * h * .85 - 2]);
  const line = smooth(pts);
  const area = line + ` L${pts[pts.length - 1][0]},${h} L${pts[0][0]},${h} Z`;
  const id = 'spwb' + color.replace('#', '') + h + (bright ? 'b' : '') + Math.floor(Math.random() * 1e6);
  const topOpacity = bright ? .55 : .22;
  return (
    <div ref={ref} style={{ width: '100%', height: h }}>
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={topOpacity} />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {fill && <path d={area} fill={`url(#${id})`} />}
        <path d={line} fill="none" stroke={color} strokeWidth={bright ? 2 : 1.6} strokeLinecap="round" />
      </svg>
    </div>
  );
}

function Kpi({ label, value, delta, deltaLabel, color, accent, sparkData, sparkColor }) {
  const valColor = accent ? C.tan : (color || T.t1);
  const sparkC = accent ? C.tan : (sparkColor || color || C.brand);
  const isGood = delta && (delta.startsWith('+') || delta.startsWith('↑') || delta.startsWith('−'));
  const deltaC = isGood ? C.emerald : T.t2;
  return (
    <div style={{ background: T.card, padding: '11px 12px 0', display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden', minWidth: 0, ...ch(7) }}>
      <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: T.t3 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: valColor, fontVariantNumeric: 'tabular-nums', lineHeight: 1.1, whiteSpace: 'nowrap' }}>{value}</div>
      <div style={{ fontSize: 9, color: T.t2, marginBottom: 2, minHeight: 12 }}>
        {delta && <span style={{ fontWeight: 700, marginRight: 4, color: deltaC }}>{delta}</span>}
        {deltaLabel}
      </div>
      <div style={{ marginLeft: -12, marginRight: -12, marginTop: 'auto' }}>
        <Spark data={sparkData} color={sparkC} h={32} bright={accent} />
      </div>
    </div>
  );
}

function Eyebrow({ color, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ width: 12, height: 1, background: color || C.emerald, flexShrink: 0, display: 'block' }} />
      <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: T.t3 }}>{children}</span>
    </div>
  );
}

/* ─── Local: Индекс локализации (используется во вкладке Закупки) ─── */
function LocBlock() {
  return (
    <div style={{ background: T.card, padding: '10px 12px', ...ch(8) }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <Eyebrow color={C.tan}>Индекс локализации</Eyebrow>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: C.sun, fontVariantNumeric: 'tabular-nums' }}>1.14</span>
          <span style={{ fontSize: 9, color: T.t3 }}>цель ≤ 1.0</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {[
          { r: 'Центральный', pct: 97, c: C.emerald, share: 36.5 },
          { r: 'Южный + СК', pct: 29, c: C.sun, share: 14.5 },
          { r: 'Приволжский', pct: 7, c: C.crimson, share: 14.8 },
          { r: 'Дальневост. + Сиб.', pct: 3, c: C.crimson, share: 13.6 },
        ].map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ fontSize: 10, color: T.t1, flex: '0 0 100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.r}</span>
            <div style={{ flex: 1, height: 4, background: T.borderSoft, ...ch(2), minWidth: 30 }}>
              <div style={{ height: '100%', width: r.pct + '%', background: r.c, ...ch(2) }} />
            </div>
            <span style={{ fontSize: 9, fontWeight: 700, color: r.c, fontVariantNumeric: 'tabular-nums', minWidth: 28, textAlign: 'right' }}>{r.pct}%</span>
            <span style={{ fontSize: 9, color: T.t3, fontVariantNumeric: 'tabular-nums', minWidth: 32, textAlign: 'right' }}>{r.share}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── TAB 1: ДАШБОРД ─── */
function TabDashboard({ isMobile }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 5 }}>
        <Kpi accent label="Выручка" value="5,8 млн ₽" delta="+12%" deltaLabel="к предыдущему периоду"
          sparkData={[2.1, 2.4, 2.3, 2.8, 3.1, 2.9, 3.4, 3.8, 4.2, 4.5, 5.0, 5.3, 5.6, 5.7, 5.8]} />
        <Kpi label="Реклама / ДРР" value="7%" delta="−5 пп" deltaLabel="к январю" color={C.brand}
          sparkData={[12, 11.5, 11, 10.5, 10, 9.8, 9.4, 9, 8.6, 8.2, 8, 7.8, 7.5, 7.3, 7]} sparkColor={C.brand} />
        <Kpi label="Продажи, шт" value="1 247" delta="+22%" deltaLabel="к предыдущему периоду" color={C.emerald}
          sparkData={[820, 850, 890, 920, 940, 970, 1010, 1050, 1090, 1130, 1170, 1200, 1220, 1240, 1247]} sparkColor={C.emerald} />
        <Kpi label="Остаток, дн" value="14 дн." deltaLabel="по топу" color={C.sun}
          sparkData={[18, 17, 17, 16, 16, 15, 15, 14, 14, 14, 14, 14, 14, 14, 14]} sparkColor={C.sun} />
      </div>

      <div style={{ background: T.card, padding: '10px 12px', ...ch(8) }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, gap: 8, flexWrap: 'wrap' }}>
          <Eyebrow color={C.brand}>Закупки в пути</Eyebrow>
          <span style={{ fontSize: 10, fontWeight: 700, color: T.t1, fontVariantNumeric: 'tabular-nums' }}>9 партий · 2,4 млн ₽</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 5 }}>
          {[
            { l: 'Оплачено', n: 2, c: C.brand },
            { l: 'Китай', n: 4, c: C.sun },
            { l: 'Фулфилмент', n: 1, c: C.tan },
            { l: 'Приёмка', n: 2, c: C.emerald },
          ].map((s, i) => (
            <div key={i} style={{ background: ha(s.c, .1), padding: '7px 8px', borderBottom: `2px solid ${s.c}`, ...ch(4) }}>
              <div style={{ fontSize: 8, fontWeight: 600, color: s.c, letterSpacing: '.06em', marginBottom: 2 }}>{s.l}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: T.t1, fontVariantNumeric: 'tabular-nums' }}>{s.n}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: T.card, padding: '10px 12px', ...ch(8) }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, gap: 8, flexWrap: 'wrap' }}>
          <Eyebrow color={C.emerald}>Проданные за 7 дней</Eyebrow>
          <span style={{ fontSize: 10, fontWeight: 700, color: T.t1, fontVariantNumeric: 'tabular-nums' }}>682 шт</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {[
            { l: 'Товар 1', brand: 'Бренд А', qty: '214 шт', days: 7, c: C.emerald },
            { l: 'Товар 2', brand: 'Бренд Б', qty: '186 шт', days: 21, c: C.emerald },
            { l: 'Товар 3', brand: 'Бренд В', qty: '142 шт', days: 16, c: C.emerald },
            { l: 'Товар 4', brand: 'Бренд В', qty: '140 шт', days: 0, c: C.crimson, stop: true },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '5px 0', borderBottom: i < 3 ? `1px solid ${T.borderSoft}` : 'none' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 500, color: T.t1 }}>{r.l}</div>
                <div style={{ fontSize: 9, color: T.t3 }}>{r.brand}</div>
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: r.stop ? C.crimson : T.t1, fontVariantNumeric: 'tabular-nums', minWidth: 50, textAlign: 'right' }}>{r.qty}</span>
              {r.stop
                ? <span style={{ fontSize: 8, fontWeight: 700, color: C.crimson, background: ha(C.crimson, .15), padding: '2px 6px', ...ch(3) }}>СТОП</span>
                : <span style={{ fontSize: 9, color: r.days < 7 ? C.crimson : r.days < 14 ? C.sun : C.emerald, fontVariantNumeric: 'tabular-nums', minWidth: 32, textAlign: 'right' }}>{r.days}д</span>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── TAB 2: ЗАКУПКИ (канбан + индекс локализации) ─── */
function TabPurchases({ isMobile }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 5 }}>
        <Kpi accent label="В работе" value="14" delta="2 закупа" deltaLabel="новых"
          sparkData={[8, 9, 10, 11, 12, 12, 13, 13, 13, 14, 14, 14, 14, 14, 14]} />
        <Kpi label="Вложено" value="3,2 млн ₽" delta="+18%" deltaLabel="к предыдущему периоду" color={C.brand}
          sparkData={[1.8, 2.0, 2.1, 2.3, 2.4, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.1, 3.2, 3.2, 3.2]} sparkColor={C.brand} />
        <Kpi label="Себес точный" value="±0%" deltaLabel="по партиям" color={C.emerald}
          sparkData={[5, 4, 3, 3, 2, 2, 1, 1, 1, .5, .5, .3, .2, .1, 0]} sparkColor={C.emerald} />
        <Kpi label="Цикл" value="42 дн." deltaLabel="было 67" color={C.sun}
          sparkData={[67, 65, 62, 60, 58, 55, 53, 50, 48, 46, 45, 44, 43, 42, 42]} sparkColor={C.sun} />
      </div>

      <div style={{ background: T.card, padding: '10px 12px', ...ch(8) }}>
        <Eyebrow color={C.brand}>Канбан · 7 стадий закупа</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(4,1fr)' : 'repeat(7,1fr)', gap: 3, marginTop: 8 }}>
          {[
            { l: 'План', n: 3, c: '#6B7280' },
            { l: 'Оплач.', n: 2, c: C.brand },
            { l: 'Китай', n: 4, c: C.sun },
            { l: 'Фулфил.', n: 1, c: C.tan },
            { l: 'Приёмка', n: 5, c: C.tan },
            { l: 'На ВБ', n: 8, c: C.emerald },
            { l: 'Закр.', n: 12, c: '#6B7280' },
          ].map((s, i) => (
            <div key={i} style={{ background: ha(s.c, .1), padding: '7px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, borderBottom: `2px solid ${s.c}`, minWidth: 0, ...ch(3) }}>
              <span style={{ fontSize: 8, fontWeight: 600, color: s.c, letterSpacing: '.04em', whiteSpace: 'nowrap' }}>{s.l}</span>
              <span style={{ fontSize: 12, fontWeight: 800, color: T.t1, fontVariantNumeric: 'tabular-nums' }}>{s.n}</span>
            </div>
          ))}
        </div>
      </div>

      <LocBlock />
    </div>
  );
}

/* ─── TAB 3: ФИНАНСЫ ─── */
function TabFinance({ isMobile }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 5 }}>
        <Kpi accent label="Чистая прибыль" value="442 тыс. ₽" delta="+15%" deltaLabel="к апрелю"
          sparkData={[280, 300, 320, 340, 360, 370, 380, 400, 410, 420, 430, 438, 440, 441, 442]} />
        <Kpi label="Маржа" value="33%" delta="+2 пп" deltaLabel="к предыдущему периоду" color={C.emerald}
          sparkData={[28, 29, 30, 30, 31, 31, 32, 32, 32, 33, 33, 33, 33, 33, 33]} sparkColor={C.emerald} />
        <Kpi label="Нагрузка ВБ" value="29%" deltaLabel="цель ≤30%" color={C.brand}
          sparkData={[35, 34, 33, 33, 32, 31, 31, 30, 30, 30, 29, 29, 29, 29, 29]} sparkColor={C.brand} />
        <Kpi label="ДРР" value="7%" delta="−5 пп" deltaLabel="к январю" color={C.sun}
          sparkData={[12, 11.5, 11, 10.5, 10, 9.8, 9.4, 9, 8.6, 8.2, 8, 7.8, 7.5, 7.3, 7]} sparkColor={C.sun} />
      </div>

      <div style={{ background: T.card, padding: '10px 12px', ...ch(8) }}>
        <Eyebrow color={C.emerald}>ABC-анализ · структура продаж</Eyebrow>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
          {[
            { grp: 'A', label: 'Топ 80% выручки', count: '8 артикулов', sum: '4,6 млн ₽', pct: 80, c: C.emerald, spark: [400, 440, 460, 510, 540, 580, 620, 680, 720, 760, 810, 860, 890, 940, 980] },
            { grp: 'B', label: 'Следующие 15%', count: '12 артикулов', sum: '870 тыс. ₽', pct: 15, c: C.sun, spark: [180, 190, 200, 210, 220, 225, 230, 240, 250, 260, 265, 270, 275, 280, 285] },
            { grp: 'C', label: 'Остаток 5%', count: '30 артикулов', sum: '290 тыс. ₽', pct: 5, c: '#6B7280', spark: [80, 82, 85, 87, 88, 90, 90, 91, 92, 93, 94, 95, 95, 96, 97] },
          ].map((g, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', background: ha(g.c, .15), color: g.c, fontWeight: 800, fontSize: 11, flexShrink: 0, ...ch(4) }}>{g.grp}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, gap: 6 }}>
                  <span style={{ fontSize: 10, color: T.t1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.label} <span style={{ color: T.t3 }}>· {g.count}</span></span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: g.c, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{g.sum}</span>
                </div>
                <div style={{ height: 4, background: T.borderSoft, ...ch(2) }}>
                  <div style={{ height: '100%', width: g.pct + '%', background: g.c, ...ch(2) }} />
                </div>
              </div>
              {!isMobile && <div style={{ width: 44, flexShrink: 0 }}><Spark data={g.spark} color={g.c} h={18} fill={false} /></div>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: T.card, padding: '10px 12px', ...ch(8) }}>
        <Eyebrow color={C.tan}>Куда ушёл рубль · цель 30/40/30</Eyebrow>
        <div style={{ display: 'flex', height: 20, gap: 2, marginTop: 8, marginBottom: 8, ...ch(4), overflow: 'hidden' }}>
          <div style={{ width: '29%', background: ha(C.crimson, .4), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: C.crimson }}>29%</span>
          </div>
          <div style={{ width: '42%', background: ha(C.tan, .4), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: C.tan }}>42%</span>
          </div>
          <div style={{ width: '29%', background: ha(C.slate, .4), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: C.slate }}>29%</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {[
            { l: 'Нагрузка ВБ', v: '29%', tgt: 'цель 30%', c: C.crimson },
            { l: 'Прибыль', v: '42%', tgt: 'цель 40%', c: C.tan },
            { l: 'Себестоимость', v: '29%', tgt: 'цель 30%', c: C.slate },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 7, height: 7, background: r.c, flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: T.t2, flex: 1 }}>{r.l}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: r.c, fontVariantNumeric: 'tabular-nums', minWidth: 30 }}>{r.v}</span>
              <span style={{ fontSize: 9, color: T.t3, minWidth: 56 }}>{r.tgt}</span>
              <span style={{ fontSize: 11, color: C.emerald }}>✓</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SalesDashboard() {
  const [tab, setTab] = useState('dashboard');
  const isMobile = useIsMobile(540);
  const TBTN = { height: 22, padding: '0 9px', fontSize: 8, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all .12s' };
  const tabs = [['dashboard', 'Дашборд'], ['purchases', 'Закупки'], ['finance', 'Финансы']];

  return (
    <div style={{ background: T.card, ...ch(20), overflow: 'hidden', fontFamily: 'Inter,sans-serif' }}>
      <div style={{ background: T.card, borderBottom: `1px solid ${T.borderSoft}`, padding: '0 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 38, gap: 8 }}>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.18em', color: T.t2, whiteSpace: 'nowrap' }}>СИСТЕМА В ДЕЙСТВИИ</span>
          <div style={{ display: 'flex', gap: 2, background: T.bg, padding: 2, ...ch(5) }}>
            {tabs.map(([k, l]) => {
              const a = tab === k;
              return <button key={k} onClick={() => setTab(k)} style={{ ...TBTN, background: a ? C.tan : 'transparent', color: a ? '#1a0f00' : T.t3, ...ch(4) }}>{l}</button>;
            })}
          </div>
        </div>
      </div>

      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {tab === 'dashboard' && <TabDashboard isMobile={isMobile} />}
        {tab === 'purchases' && <TabPurchases isMobile={isMobile} />}
        {tab === 'finance' && <TabFinance isMobile={isMobile} />}
        <div style={{ paddingTop: 2 }}>
          <span style={{ fontSize: 7, color: T.t3 }}>Платформа Швец · NDA · данные изменены</span>
        </div>
      </div>
    </div>
  );
}
