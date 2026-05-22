import { useState } from 'react';

const T = { bg: '#0A0A0A', card: '#181818', card2: '#222222', border: '#2A2A2A', t1: '#FFFFFF', t2: '#A3A3A3', t3: '#555555' };
const C = { brand: '#3F6EE8', emerald: '#10B981', crimson: '#F43F5E', sun: '#FCD34D', indigo: '#6366F1', tan: '#FB923C', slate: '#94A3B8' };
const ch = (n = 8) => ({ clipPath: `polygon(0 0,100% 0,100% calc(100% - ${n}px),calc(100% - ${n}px) 100%,0 100%)` });
const ha = (c, a) => { const h = c.replace('#', ''); return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${a})`; };

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

function Spark({ data, color, h = 18 }) {
  if (!data || data.length < 2) return <div style={{ height: h }} />;
  const mn = Math.min(...data), mx = Math.max(...data), r = mx - mn || 1;
  const w = 100;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - ((v - mn) / r) * h * .8 - 2]);
  const line = smooth(pts);
  const area = line + ` L${pts[pts.length - 1][0]},${h} L${pts[0][0]},${h} Z`;
  const id = 'spbld' + color.replace('#', '') + Math.floor(Math.random() * 1e6);
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity=".18" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const PROJECTS = [
  { id: 'А', name: 'Проект А', revenue: 8200000, margin: 28, trend: [55, 60, 62, 65, 70, 74, 78, 80, 84, 88], c: C.emerald, status: 'растёт', grow: '+20%' },
  { id: 'Б', name: 'Проект Б', revenue: 6100000, margin: 22, trend: [40, 42, 44, 46, 48, 50, 52, 55, 57, 60], c: C.brand, status: 'растёт', grow: '+20%' },
  { id: 'В', name: 'Проект В', revenue: 4400000, margin: 11, trend: [62, 60, 63, 61, 62, 64, 63, 62, 63, 62], c: C.sun, status: 'стабилен', grow: 'стаб.' },
  { id: 'Г', name: 'Проект Г', revenue: 1800000, margin: -6, trend: [30, 28, 26, 25, 24, 22, 20, 18, 17, 15], c: C.crimson, status: 'убыточный', grow: 'убыток', warn: true },
];

function DashOverview() {
  const total = PROJECTS.reduce((s, p) => s + p.revenue, 0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', gap: 5 }}>
        {[
          { label: 'Оборот всего', val: '20,5М ₽', color: C.brand, accent: true },
          { label: 'Прибыльных', val: '3 из 4', color: C.emerald },
          { label: 'Убыточных', val: '1 проект', color: C.crimson },
          { label: 'Кассовых разрывов', val: '0', color: C.emerald },
        ].map((it, i) => (
          <div key={i} style={{ flex: 1, background: it.accent ? C.brand : T.card, padding: '10px 10px 8px', ...ch(7) }}>
            <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.11em', textTransform: 'uppercase', color: it.accent ? 'rgba(255,255,255,.55)' : T.t3, marginBottom: 2 }}>{it.label}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: it.accent ? '#fff' : it.color, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{it.val}</div>
          </div>
        ))}
      </div>

      <div style={{ background: T.card, ...ch(8), overflow: 'hidden' }}>
        <div style={{ padding: '8px 12px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 14, height: 1, background: C.brand, display: 'block' }} />
          <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: T.t3 }}>4 проекта · P&L раздельно</span>
        </div>
        {PROJECTS.map((p, i) => {
          const revShare = Math.round(p.revenue / total * 100);
          return (
            <div key={i} style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, background: i % 2 === 1 ? ha('#fff', .015) : T.card, borderBottom: `1px solid ${T.border}` }}>
              <div style={{ width: 24, height: 24, background: ha(p.c, .15), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: p.c, flexShrink: 0, ...ch(6) }}>{p.id}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: T.t1 }}>{p.name}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: p.c, background: ha(p.c, .12), padding: '1px 6px', ...ch(3) }}>{p.grow}</span>
                  {p.warn && <span style={{ fontSize: 9, fontWeight: 700, color: C.crimson, background: ha(C.crimson, .15), padding: '1px 6px', ...ch(3) }}>УБЫТОЧНЫЙ</span>}
                </div>
                <div style={{ height: 4, background: T.border, borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: revShare + '%', background: p.c, opacity: .7, borderRadius: 2 }} />
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 900, color: p.c, fontVariantNumeric: 'tabular-nums' }}>{p.margin > 0 ? '+' : ''}{p.margin}%</div>
                <div style={{ fontSize: 9, color: T.t3 }}>{(p.revenue / 1e6).toFixed(1)}М ₽</div>
              </div>
              <div style={{ width: 50, flexShrink: 0 }}><Spark data={p.trend} color={p.c} h={18} /></div>
            </div>
          );
        })}
        <div style={{ padding: '8px 12px', background: T.card2, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 10, color: T.t2, flex: 1 }}>Итого оборот</span>
          <span style={{ fontSize: 13, fontWeight: 900, color: C.brand, fontVariantNumeric: 'tabular-nums' }}>20,5М ₽/мес</span>
        </div>
      </div>

      <div style={{ background: T.card, padding: '10px 12px', ...ch(8) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <span style={{ width: 14, height: 1, background: C.brand, display: 'block' }} />
          <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: T.t3 }}>Доля выручки по проектам</span>
        </div>
        <div style={{ display: 'flex', height: 20, gap: 1, ...ch(6), overflow: 'hidden', marginBottom: 8 }}>
          {PROJECTS.map((p, i) => {
            const w = Math.round(p.revenue / total * 100);
            return <div key={i} style={{ width: w + '%', background: ha(p.c, .4), display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: w > 10 ? 'auto' : 0 }}>
              {w > 10 && <span style={{ fontSize: 9, fontWeight: 700, color: p.c }}>{p.id}</span>}
            </div>;
          })}
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {PROJECTS.map((p) => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 8, height: 8, ...ch(2), background: ha(p.c, .5) }} />
              <span style={{ fontSize: 9, color: T.t2 }}>{p.name}</span>
              <span style={{ fontSize: 9, fontWeight: 700, color: p.c }}>{(p.revenue / 1e6).toFixed(1)}М</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashDDS() {
  const income = [18, 19, 20, 22, 21, 23, 22, 24, 23, 25, 24, 26];
  const expense = [17, 18, 18, 19, 18, 20, 18, 19, 18, 20, 19, 21];
  const mn = 16, mx = 27, r = mx - mn, iH = 65, padT = 5;
  const xi = (i) => (i / 11) * 290 + 5;
  const yi = (v) => padT + iH - ((v - mn) / r) * iH;
  const ipts = income.map((v, i) => [xi(i), yi(v)]);
  const epts = expense.map((v, i) => [xi(i), yi(v)]);
  const il = smooth(ipts);
  const el = smooth(epts);
  const ia = il + ` L${ipts[11][0]},${padT + iH} L${ipts[0][0]},${padT + iH} Z`;
  const ea = el + ` L${epts[11][0]},${padT + iH} L${epts[0][0]},${padT + iH} Z`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ background: T.card, padding: '10px 12px', ...ch(8) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <span style={{ width: 14, height: 1, background: C.brand, display: 'block' }} />
          <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: T.t3 }}>Движение денег · 12 месяцев (млн ₽)</span>
        </div>
        <svg width="100%" height={80} viewBox="0 0 300 80" preserveAspectRatio="none" style={{ display: 'block', marginBottom: 4 }}>
          <defs>
            <linearGradient id="bdig" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.brand} stopOpacity=".15" /><stop offset="100%" stopColor={C.brand} stopOpacity="0" /></linearGradient>
            <linearGradient id="bdeg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.crimson} stopOpacity=".1" /><stop offset="100%" stopColor={C.crimson} stopOpacity="0" /></linearGradient>
          </defs>
          <path d={ia} fill="url(#bdig)" />
          <path d={ea} fill="url(#bdeg)" />
          <path d={il} fill="none" stroke={C.brand} strokeWidth="1.8" strokeLinecap="round" />
          <path d={el} fill="none" stroke={C.crimson} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 2" />
          <line x1="5" y1={padT + iH} x2="295" y2={padT + iH} stroke={T.border} strokeWidth="1" />
        </svg>
        <div style={{ display: 'flex', gap: 12, marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 14, height: 1.5, background: C.brand, display: 'block' }} /><span style={{ fontSize: 9, color: T.t2 }}>Приходы</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 14, borderBottom: `1.5px dashed ${C.crimson}`, display: 'block' }} /><span style={{ fontSize: 9, color: T.t2 }}>Расходы</span></div>
        </div>
        <div style={{ padding: '7px 10px', background: ha(C.emerald, .07), borderLeft: `2px solid ${C.emerald}`, ...ch(5) }}>
          <span style={{ fontSize: 10, color: T.t2 }}>Кассовые разрывы устранены — </span>
          <span style={{ fontSize: 10, fontWeight: 700, color: C.emerald }}>0 инцидентов</span>
          <span style={{ fontSize: 10, color: T.t2 }}> после включения алертов</span>
        </div>
      </div>

      <div style={{ background: T.card, ...ch(8), overflow: 'hidden' }}>
        <div style={{ padding: '8px 12px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 14, height: 1, background: C.sun, display: 'block' }} />
          <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: T.t3 }}>Сравнение · доход / расход по проектам</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr 1fr 1fr', padding: '6px 12px', borderBottom: `1px solid ${T.border}`, gap: 8 }}>
          <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: T.t3 }}>Проект</span>
          <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: T.t3, textAlign: 'right' }}>Доход</span>
          <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: T.t3, textAlign: 'right' }}>Расход</span>
          <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: T.t3, textAlign: 'right' }}>Маржа</span>
        </div>
        {[
          { letter: 'А', name: 'Проект А', income: 8.2, expense: 5.9, c: C.emerald },
          { letter: 'Б', name: 'Проект Б', income: 6.1, expense: 4.8, c: C.brand },
          { letter: 'В', name: 'Проект В', income: 4.4, expense: 3.9, c: C.sun },
          { letter: 'Г', name: 'Проект Г', income: 1.8, expense: 1.9, c: C.crimson, warn: true },
        ].map((r, i) => {
          const margin = +(r.income - r.expense).toFixed(1);
          const marginC = margin > 0 ? C.emerald : C.crimson;
          return (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 1fr 1fr', padding: '8px 12px', borderBottom: i < 3 ? `1px solid ${T.border}` : 'none', gap: 8, alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 18, height: 18, background: ha(r.c, .15), ...ch(4), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: r.c, flexShrink: 0 }}>{r.letter}</div>
                <span style={{ fontSize: 10, color: T.t2 }}>{r.warn ? '⚠' : ''}</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: T.t1, fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{r.income.toFixed(1)}М ₽</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: T.t2, fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{r.expense.toFixed(1)}М ₽</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: marginC, fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{margin > 0 ? '+' : ''}{margin.toFixed(1)}М</span>
            </div>
          );
        })}
        <div style={{ padding: '8px 12px', background: T.card2, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 10, color: T.t2, flex: 1 }}>Сводно</span>
          <span style={{ fontSize: 10, color: T.t3, fontVariantNumeric: 'tabular-nums' }}>20.5М</span>
          <span style={{ fontSize: 10, color: T.t3, fontVariantNumeric: 'tabular-nums' }}>16.5М</span>
          <span style={{ fontSize: 12, fontWeight: 900, color: C.emerald, fontVariantNumeric: 'tabular-nums' }}>+4.0М</span>
        </div>
      </div>
    </div>
  );
}

export default function BuildDashboard() {
  const [tab, setTab] = useState('overview');
  const TBTN = { height: 22, padding: '0 9px', fontSize: 8, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all .12s' };
  const tabs = [['overview', 'Проекты'], ['dds', 'ДДС + прогноз']];

  return (
    <div style={{ background: T.card, ...ch(20), overflow: 'hidden', fontFamily: 'Inter,sans-serif' }}>
      <div style={{ background: T.card, borderBottom: `1px solid ${T.border}`, padding: '0 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 38 }}>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.1em', color: T.t2 }}>СИСТЕМА В ДЕЙСТВИИ</span>
          <div style={{ display: 'flex', gap: 1, background: '#0A0A0A', padding: 2, ...ch(5) }}>
            {tabs.map(([k, l]) => {
              const a = tab === k;
              return <button key={k} onClick={() => setTab(k)} style={{ ...TBTN, background: a ? C.brand : 'transparent', color: a ? '#fff' : T.t3, ...ch(4) }}>{l}</button>;
            })}
          </div>
        </div>
      </div>
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {tab === 'overview' && <DashOverview />}
        {tab === 'dds' && <DashDDS />}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 7, color: T.t3 }}>Платформа AIVISION · NDA · данные изменены</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}><div style={{ width: 5, height: 5, borderRadius: '50%', background: C.emerald }} /><span style={{ fontSize: 7, color: T.t3 }}>live</span></div>
        </div>
      </div>
    </div>
  );
}
