import { useState, useEffect } from 'react';

const T = { bg: '#0A0A0A', card: '#181818', card2: '#222222', border: '#2A2A2A', border2: '#3A3A3A', t1: '#FFFFFF', t2: '#A3A3A3', t3: '#555555' };
const C = { brand: '#3F6EE8', emerald: '#10B981', crimson: '#F43F5E', sun: '#FCD34D', indigo: '#6366F1', tan: '#FB923C', slate: '#94A3B8' };
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

function Spark({ data, color, h = 22, bright = false }) {
  if (!data || data.length < 2) return <div style={{ height: h }} />;
  const mn = Math.min(...data), mx = Math.max(...data), r = mx - mn || 1;
  const w = 100;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - ((v - mn) / r) * h * .8 - 2]);
  const line = smooth(pts);
  const area = line + ` L${pts[pts.length - 1][0]},${h} L${pts[0][0]},${h} Z`;
  const id = 'spes' + color.replace('#', '').replace(/[(),.\s]/g, '') + (bright ? 'b' : '') + Math.floor(Math.random() * 1e6);
  const topO = bright ? .55 : .2;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={topO} /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth={bright ? 1.8 : 1.5} strokeLinecap="round" />
    </svg>
  );
}

function KpiCard({ label, value, sub, sparkData, sparkColor, accent, warn }) {
  const valC = accent ? C.tan : (warn ? C.sun : T.t1);
  const sparkC = accent ? C.tan : (sparkColor || C.brand);
  return (
    <div style={{ background: warn ? ha(C.sun, .06) : T.card, padding: '10px 12px 0', display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, ...ch(7) }}>
      <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.13em', textTransform: 'uppercase', color: T.t3, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: valC, lineHeight: 1, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: T.t2, marginTop: 1 }}>{sub}</div>}
      <div style={{ marginLeft: -12, marginRight: -12, marginTop: 'auto' }}>
        <Spark data={sparkData} color={sparkC} h={20} bright={accent} />
      </div>
    </div>
  );
}

const FUNNEL_DATA = [
  [{ label: 'Уники', v: 1280, c: T.t3 }, { label: 'Клики', v: 8550, c: C.indigo }, { label: 'Заказы', v: 142, c: C.brand }, { label: 'Оплачено', v: 57, c: C.emerald }, { label: 'Закрыто', v: 57, c: C.emerald }],
  [{ label: 'Уники', v: 73, c: T.t3 }, { label: 'Клики', v: 156, c: C.indigo }, { label: 'Заказы', v: 16, c: C.brand }, { label: 'Оплачено', v: 1, c: C.sun }, { label: 'Закрыто', v: 1, c: C.sun }],
];

const TOP_DATA = [
  { n: 1, name: 'Global eSIM 20GB 31D', sub: 'Global · 4 заказа', val: '10 640 ₽', c: C.emerald },
  { n: 2, name: 'Kazakhstan eSIM 5GB 7D', sub: 'KZ · 3 заказа', val: '2 320 ₽', c: T.t2 },
  { n: 3, name: 'Turkiye eSIM Unlimited 1D', sub: 'TR · 4 заказа', val: '950 ₽', c: T.t2 },
  { n: 4, name: 'Belarus eSIM 10GB 7D', sub: 'BY · 1 заказ', val: '2 005 ₽', c: T.t2 },
  { n: 5, name: 'Poland eSIM 5GB 30D', sub: 'PL · 1 заказ', val: '1 550 ₽', c: T.t2 },
];

function DashMain({ isMobile }) {
  const s1 = [40, 55, 48, 62, 58, 71, 65, 80, 74, 88];
  // Динамика заказов по дням (10 дней)
  const ordersN1 = [12, 14, 11, 16, 18, 20, 17, 22, 19, 25];
  const ordersN2 = [1, 0, 2, 1, 3, 2, 1, 4, 3, 2];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 5 }}>
        <KpiCard accent label="Напр. 1 · Выручка" value="31 240 ₽" sub="За мес. 412 800 ₽" sparkData={s1} />
        <KpiCard label="Маржа Н1" value="8 680 ₽" sub="~27% от выручки" sparkData={s1.map((v) => v * .28)} sparkColor={C.emerald} />
        <KpiCard label="Конверсия Н1" value="40%" sub="Создан → Закрыт" sparkData={[36, 38, 37, 40, 39, 41, 40, 42, 40, 40]} sparkColor={C.emerald} />
        <KpiCard warn label="Конверсия Н2" value="8%" sub="Создан → Закрыт" sparkData={[6, 7, 6, 8, 7, 9, 8, 8, 7, 8]} sparkColor={C.sun} />
      </div>

      <div style={{ background: T.card, padding: '10px 12px', ...ch(8) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <span style={{ width: 14, height: 1, background: C.brand, display: 'block' }} />
          <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.13em', textTransform: 'uppercase', color: T.t3 }}>Сравнение направлений · 30 дней</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 8, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontSize: 8, fontWeight: 600, color: T.t3, letterSpacing: '.08em', textTransform: 'uppercase' }}>Направление 1 · ₽</div>
            {[['Выручка', '31 240 ₽', C.brand], ['Маржа', '8 680 ₽', C.emerald], ['Заказов', '142', T.t1], ['Конверсия', '40%', C.emerald]].map(([l, v, c]) => (
              <div key={l} style={{ background: T.card2, padding: '5px 8px', ...ch(5) }}>
                <div style={{ fontSize: 7, color: T.t3, marginBottom: 1 }}>{l}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: c, fontVariantNumeric: 'tabular-nums' }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            {[['×17', 'выручка'], ['×20', 'маржа'], ['×9', 'заказов'], ['×5', 'конверсия']].map(([k, l]) => (
              <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: 12, fontWeight: 900, color: C.brand, fontVariantNumeric: 'tabular-nums' }}>{k}</span>
                <span style={{ fontSize: 7, color: T.t3 }}>{l}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontSize: 8, fontWeight: 600, color: T.t3, letterSpacing: '.08em', textTransform: 'uppercase' }}>Направление 2 · Крипта</div>
            {[['Выручка', '26,40 $', C.indigo], ['Маржа', '6,08 $', C.emerald], ['Заказов', '16', T.t2], ['Конверсия', '8%', C.sun]].map(([l, v, c]) => (
              <div key={l} style={{ background: T.card2, padding: '5px 8px', ...ch(5) }}>
                <div style={{ fontSize: 7, color: T.t3, marginBottom: 1 }}>{l}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: c, fontVariantNumeric: 'tabular-nums' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: T.card, padding: '10px 12px', ...ch(8) }}>
        <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: T.t3, marginBottom: 6 }}>Заказы по дням · 10 дней</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { label: 'Направление 1 (₽)', data: ordersN1, color: C.brand, max: 25 },
            { label: 'Направление 2 (Крипта)', data: ordersN2, color: C.indigo, max: 5 },
          ].map((ch2) => (
            <div key={ch2.label}>
              <div style={{ fontSize: 7, color: T.t3, marginBottom: 3 }}>{ch2.label}</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 36 }}>
                {ch2.data.map((v, i) => <div key={i} style={{ flex: 1, height: (v / ch2.max * 100) + '%', background: ch2.color, opacity: .35 + (v / ch2.max) * .55, borderRadius: 1, minHeight: v > 0 ? 2 : 0 }} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashFunnel() {
  return (
    <div style={{ background: T.card, padding: '10px 12px', ...ch(8) }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
        <span style={{ width: 14, height: 1, background: C.indigo, display: 'block' }} />
        <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.13em', textTransform: 'uppercase', color: T.t3 }}>Воронка · Уник → Закрытый заказ</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[0, 1].map((vi) => {
          const fn = FUNNEL_DATA[vi]; const mx = fn[0].v;
          return (
            <div key={vi}>
              <div style={{ fontSize: 8, fontWeight: 600, color: T.t3, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 6 }}>Направление {vi + 1} · {vi === 0 ? '₽' : 'Крипта'}</div>
              {fn.map((s, i) => {
                const pct = Math.round(s.v / mx * 100);
                const conv = i > 0 ? Math.round(s.v / fn[i - 1].v * 100) : null;
                const cc = conv === null ? null : conv > 60 ? C.emerald : conv > 30 ? C.sun : C.crimson;
                return (
                  <div key={i} style={{ marginBottom: 5 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
                      <span style={{ fontSize: 9, fontWeight: 600, color: s.c, flex: 1 }}>{s.label}</span>
                      <span style={{ fontSize: 10, fontWeight: 800, color: T.t1, fontVariantNumeric: 'tabular-nums' }}>{s.v.toLocaleString('ru')}</span>
                      {conv !== null && <span style={{ fontSize: 9, fontWeight: 700, color: cc, background: ha(cc, .12), padding: '1px 5px', ...ch(3) }}>→{conv}%</span>}
                    </div>
                    <div style={{ height: 14, background: T.border, ...ch(4) }}>
                      <div style={{ height: '100%', width: pct + '%', background: ha(s.c, .3), borderLeft: `2px solid ${s.c}` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DashTop() {
  return (
    <div style={{ background: T.card, ...ch(8), overflow: 'hidden' }}>
      <div style={{ padding: '8px 12px', borderBottom: `1px solid ${T.border}` }}>
        <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: T.t3 }}>Топ продуктов · Направление 1 · по выручке</span>
      </div>
      <div style={{ padding: '4px 0' }}>
        {TOP_DATA.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: i % 2 === 1 ? ha('#fff', .015) : T.card, borderBottom: i < TOP_DATA.length - 1 ? `1px solid ${T.border}` : 'none' }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: T.t3, minWidth: 14 }}>{r.n}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: T.t1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</div>
              <div style={{ fontSize: 9, color: T.t3 }}>{r.sub}</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: r.c, fontVariantNumeric: 'tabular-nums' }}>{r.val}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: '8px 12px', borderTop: `1px solid ${T.border}`, background: T.card2 }}>
        <div style={{ fontSize: 8, fontWeight: 600, color: T.t3, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 4 }}>Топ продуктов · Направление 2</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: C.indigo, minWidth: 14 }}>1</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: T.t1 }}>Russia 10GB 30Day</div>
            <div style={{ fontSize: 9, color: T.t3 }}>RU · 1 заказ</div>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.indigo, fontVariantNumeric: 'tabular-nums' }}>26,40 $</span>
        </div>
      </div>
    </div>
  );
}

export default function EsimDashboard() {
  const [tab, setTab] = useState('main');
  const isMobile = useIsMobile(540);
  const TBTN = { height: 22, padding: '0 9px', fontSize: 8, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all .12s' };
  const tabs = [['main', 'Дашборд'], ['funnel', 'Воронка'], ['top', 'Топ']];

  return (
    <div style={{ background: T.card, ...ch(20), overflow: 'hidden', fontFamily: 'Inter,sans-serif' }}>
      <div style={{ background: T.card, borderBottom: `1px solid ${T.border}`, padding: '0 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 38, gap: 8 }}>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.18em', color: T.t2, whiteSpace: 'nowrap' }}>СИСТЕМА В ДЕЙСТВИИ</span>
          <div style={{ display: 'flex', gap: 2, background: '#0A0A0A', padding: 2, ...ch(5) }}>
            {tabs.map(([k, l]) => {
              const a = tab === k;
              return <button key={k} onClick={() => setTab(k)} style={{ ...TBTN, background: a ? C.brand : 'transparent', color: a ? '#fff' : T.t3, ...ch(4) }}>{l}</button>;
            })}
          </div>
        </div>
      </div>
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {tab === 'main' && <DashMain isMobile={isMobile} />}
        {tab === 'funnel' && <DashFunnel />}
        {tab === 'top' && <DashTop />}
        <div style={{ paddingTop: 2 }}>
          <span style={{ fontSize: 7, color: T.t3 }}>Система в продакшне · NDA · данные изменены</span>
        </div>
      </div>
    </div>
  );
}
