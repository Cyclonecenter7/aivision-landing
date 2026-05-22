import { useState } from 'react';

const T = { bg: '#0A0A0A', card: '#181818', card2: '#222222', border: '#2A2A2A', t1: '#FFFFFF', t2: '#A3A3A3', t3: '#555555' };
const C = { brand: '#3F6EE8', emerald: '#10B981', crimson: '#F43F5E', sun: '#FCD34D', tan: '#FB923C', slate: '#94A3B8', indigo: '#6366F1' };
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

function Spark({ data, color, h = 20 }) {
  if (!data || data.length < 2) return <div style={{ height: h }} />;
  const mn = Math.min(...data), mx = Math.max(...data), r = mx - mn || 1;
  const w = 100;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - ((v - mn) / r) * h * .8 - 2]);
  const line = smooth(pts);
  const area = line + ` L${pts[pts.length - 1][0]},${h} L${pts[0][0]},${h} Z`;
  const id = 'spsls' + color.replace('#', '') + Math.floor(Math.random() * 1e6);
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity=".18" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const FUNNEL_STAGES = [
  { label: 'Лид', v: 100, c: T.t3 },
  { label: 'Квалифицирован', v: 68, c: C.brand },
  { label: 'Встреча', v: 42, c: C.tan },
  { label: 'КП отправлено', v: 31, c: C.sun },
  { label: 'Оплата', v: 19, c: C.emerald },
];

const MANAGERS = [
  { name: 'Менеджер А', letter: 'А', conv: 24, deals: 12, revenue: '1.4М', spark: [18, 20, 22, 21, 24, 23, 24], c: C.emerald },
  { name: 'Менеджер Б', letter: 'Б', conv: 19, deals: 8, revenue: '0.9М', spark: [15, 16, 17, 16, 18, 18, 19], c: C.brand },
  { name: 'Менеджер В', letter: 'В', conv: 14, deals: 6, revenue: '0.7М', spark: [12, 13, 12, 14, 13, 14, 14], c: C.sun },
  { name: 'Менеджер Г', letter: 'Г', conv: 9, deals: 3, revenue: '0.3М', spark: [14, 13, 12, 11, 10, 9, 9], c: C.crimson, warn: true },
];

function DashDashboard() {
  const revData = [42, 45, 48, 44, 50, 52, 49, 55, 53, 58, 56, 60, 62, 60, 58];
  const dealData = [35, 38, 40, 37, 42, 44, 41, 46, 44, 48, 47, 50, 52, 50, 47];
  const mn = 30, mx = 65, r = mx - mn, h = 56, pt = 4;
  const yi = (v) => pt + h - ((v - mn) / r) * h;
  const xi = (i) => (i / 14) * 290 + 5;
  const rpts = revData.map((v, i) => [xi(i), yi(v)]);
  const dpts = dealData.map((v, i) => [xi(i), yi(v)]);
  const rl = smooth(rpts); const dl = smooth(dpts);
  const ra = rl + ` L${rpts[14][0]},${pt + h} L${rpts[0][0]},${pt + h} Z`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', gap: 5 }}>
        {[
          { label: 'Выручка', val: '5.8М ₽', sub: '+12% vs пред.', spark: revData, color: C.tan, accent: true },
          { label: 'Сделок активных', val: '47', sub: 'в работе сейчас', spark: dealData, color: C.brand },
          { label: 'Средний чек', val: '123К ₽', sub: '+8% vs пред.', spark: [88, 92, 95, 98, 102, 105, 108, 112, 115, 118, 120, 121, 123, 122, 123], color: C.emerald },
          { label: 'Скорость сделки', val: '12 дн.', sub: 'было 18 дней', spark: [18, 17, 17, 16, 16, 15, 15, 14, 14, 13, 13, 12, 12, 12, 12].reverse(), color: C.sun },
        ].map((it, i) => (
          <div key={i} style={{ flex: 1, background: it.accent ? C.tan : T.card, padding: '10px 10px 0', ...ch(7) }}>
            <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.11em', textTransform: 'uppercase', color: it.accent ? 'rgba(0,0,0,.45)' : T.t3, marginBottom: 2 }}>{it.label}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: it.accent ? '#0A0A0A' : it.color, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{it.val}</div>
            <div style={{ fontSize: 9, color: it.accent ? 'rgba(0,0,0,.35)' : T.t2, marginBottom: 2 }}>{it.sub}</div>
            <div style={{ marginLeft: -10, marginRight: -10 }}><Spark data={it.spark} color={it.accent ? 'rgba(0,0,0,.25)' : it.color} h={20} /></div>
          </div>
        ))}
      </div>

      <div style={{ background: T.card, padding: '10px 12px', ...ch(8) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <span style={{ width: 14, height: 1, background: C.tan, display: 'block' }} />
          <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: T.t3 }}>Выручка · 15 недель</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 1.5, background: C.tan, display: 'block' }} /><span style={{ fontSize: 8, color: T.t2 }}>Выручка</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, borderBottom: `1.5px dashed ${C.brand}`, display: 'block' }} /><span style={{ fontSize: 8, color: T.t2 }}>Сделки</span></div>
          </div>
        </div>
        <svg width="100%" height={64} viewBox="0 0 300 64" preserveAspectRatio="none" style={{ display: 'block' }}>
          <defs>
            <linearGradient id="slsrg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.tan} stopOpacity=".15" /><stop offset="100%" stopColor={C.tan} stopOpacity="0" /></linearGradient>
          </defs>
          <path d={ra} fill="url(#slsrg)" />
          <path d={rl} fill="none" stroke={C.tan} strokeWidth="1.8" strokeLinecap="round" />
          <path d={dl} fill="none" stroke={C.brand} strokeWidth="1.3" strokeLinecap="round" strokeDasharray="4 2" />
          <line x1="5" y1={pt + h} x2="295" y2={pt + h} stroke={T.border} strokeWidth="1" />
          <circle cx={rpts[14][0]} cy={rpts[14][1]} r="3" fill={C.tan} />
        </svg>
      </div>

      <div style={{ background: T.card, padding: '10px 12px', ...ch(8) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <span style={{ width: 14, height: 1, background: C.emerald, display: 'block' }} />
          <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: T.t3 }}>Нагрузка менеджера · до и после</span>
        </div>
        {[
          { label: 'Сбор отчётов', was: 120, now: 0, c: C.crimson },
          { label: 'Сверка данных', was: 40, now: 5, c: C.sun },
          { label: 'Подготовка сводок', was: 60, now: 10, c: C.tan },
          { label: 'Продажи', was: 180, now: 305, c: C.emerald },
        ].map((r) => {
          const max = 320;
          const wasW = Math.round(r.was / max * 100);
          const nowW = Math.round(r.now / max * 100);
          return (
            <div key={r.label} style={{ marginBottom: 7 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <span style={{ fontSize: 10, color: T.t2, flex: 1 }}>{r.label}</span>
                <span style={{ fontSize: 9, color: T.t3 }}>{r.was > r.now ? '−' + (r.was - r.now) : r.now > r.was ? '+' + (r.now - r.was) : ''} мин</span>
              </div>
              <div style={{ display: 'flex', gap: 2, height: 5 }}>
                <div style={{ width: wasW + '%', background: ha(r.c, .25), borderRadius: 1 }} />
                <div style={{ width: nowW + '%', background: r.c, borderRadius: 1, opacity: .8 }} />
              </div>
            </div>
          );
        })}
        <div style={{ fontSize: 8, color: T.t3, marginTop: 4 }}>▪ светлый = было · ▪ яркий = стало</div>
        <div style={{ marginTop: 8, padding: '7px 10px', background: ha(C.emerald, .07), borderLeft: `2px solid ${C.emerald}`, ...ch(5) }}>
          <span style={{ fontSize: 10, color: T.t2 }}>Освобождено </span>
          <span style={{ fontSize: 10, fontWeight: 700, color: C.emerald }}>+2 ч/день</span>
          <span style={{ fontSize: 10, color: T.t2 }}> — менеджер занимается продажами, а не Excel</span>
        </div>
      </div>
    </div>
  );
}

function DashFunnel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ background: T.card, padding: '10px 12px', ...ch(8) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <span style={{ width: 14, height: 1, background: C.brand, display: 'block' }} />
          <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: T.t3 }}>Воронка продаж · конверсия по этапам</span>
        </div>
        {FUNNEL_STAGES.map((s, i) => {
          const conv = i > 0 ? Math.round(s.v / FUNNEL_STAGES[i - 1].v * 100) : null;
          const convC = conv === null ? null : conv > 70 ? C.emerald : conv > 50 ? C.sun : C.crimson;
          const pct = s.v;
          return (
            <div key={i} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: s.c, flex: 1 }}>{s.label}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: T.t1, fontVariantNumeric: 'tabular-nums' }}>{s.v}</span>
                {conv && <span style={{ fontSize: 10, fontWeight: 700, color: convC, background: ha(convC, .12), padding: '1px 6px', ...ch(4) }}>→{conv}%</span>}
              </div>
              <div style={{ height: 16, background: T.border, ...ch(4), overflow: 'hidden' }}>
                <div style={{ height: '100%', width: pct + '%', background: ha(s.c === T.t3 ? '#555' : s.c, .28), borderLeft: `2px solid ${s.c === T.t3 ? '#555' : s.c}` }} />
              </div>
            </div>
          );
        })}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 4 }}>
          <div style={{ background: ha(C.brand, .07), padding: '8px 10px', ...ch(6) }}>
            <div style={{ fontSize: 9, color: T.t3, marginBottom: 2 }}>Итоговая конверсия</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: C.brand }}>19%</div>
            <div style={{ fontSize: 9, color: T.t3 }}>лид → оплата</div>
          </div>
          <div style={{ background: ha(C.emerald, .07), padding: '8px 10px', ...ch(6) }}>
            <div style={{ fontSize: 9, color: T.t3, marginBottom: 2 }}>Скорость сделки</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: C.emerald }}>12 дн.</div>
            <div style={{ fontSize: 9, color: T.t3 }}>было 18 дней</div>
          </div>
        </div>
      </div>

      <div style={{ background: T.card, padding: '10px 12px', ...ch(8) }}>
        <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: T.t3, marginBottom: 8 }}>Слабое место воронки</div>
        <div style={{ padding: '10px 12px', background: ha(C.sun, .07), borderLeft: `2px solid ${C.sun}`, ...ch(6), marginBottom: 6 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.sun, marginBottom: 3 }}>Лид → Квалификация: 68%</div>
          <div style={{ fontSize: 11, color: T.t2 }}>Каждый третий лид не квалифицируется. Причина — нет скрипта первичной квалификации.</div>
        </div>
        <div style={{ padding: '10px 12px', background: ha(C.crimson, .07), borderLeft: `2px solid ${C.crimson}`, ...ch(6) }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.crimson, marginBottom: 3 }}>КП → Оплата: 61%</div>
          <div style={{ fontSize: 11, color: T.t2 }}>Низкая конверсия после отправки КП. Нет follow-up задач в системе.</div>
        </div>
      </div>
    </div>
  );
}

function DashManagers() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ background: T.card, ...ch(8), overflow: 'hidden' }}>
        <div style={{ padding: '8px 12px', borderBottom: `1px solid ${T.border}` }}>
          <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: T.t3 }}>Эффективность менеджеров</span>
        </div>
        {MANAGERS.map((m, i) => (
          <div key={i} style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, background: i % 2 === 1 ? ha('#fff', .015) : T.card, borderBottom: `1px solid ${T.border}` }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: ha(m.c, .15), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: m.c, flexShrink: 0 }}>{m.letter}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: T.t1 }}>{m.name}</span>
                {m.warn && <span style={{ fontSize: 9, fontWeight: 700, color: C.crimson, background: ha(C.crimson, .15), padding: '1px 5px', ...ch(3) }}>⚠ алерт</span>}
              </div>
              <div style={{ display: 'flex', gap: 2 }}>
                <div style={{ height: 4, width: (m.conv / 25 * 100) + '%', background: m.c, borderRadius: 1, opacity: .8 }} />
                <div style={{ flex: 1, height: 4, background: T.border, borderRadius: 1 }} />
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 900, color: m.c, fontVariantNumeric: 'tabular-nums' }}>{m.conv}%</div>
              <div style={{ fontSize: 9, color: T.t3 }}>{m.deals} сд · {m.revenue}</div>
            </div>
            <div style={{ width: 44, flexShrink: 0 }}><Spark data={m.spark} color={m.c} h={18} /></div>
          </div>
        ))}
      </div>

      <div style={{ background: T.card, padding: '10px 12px', ...ch(8) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <span style={{ width: 14, height: 1, background: C.crimson, display: 'block' }} />
          <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: T.t3 }}>Активные алерты</span>
        </div>
        {[
          { text: 'Менеджер Г — конверсия упала ниже 10% за 2 недели', c: C.crimson, time: 'сегодня 09:14' },
          { text: '3 сделки без активности более 7 дней', c: C.sun, time: 'вчера' },
          { text: 'Средний цикл сделки вырос на 20% у Менеджера В', c: C.sun, time: '3 дня назад' },
        ].map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '8px 0', borderBottom: i < 2 ? `1px solid ${T.border}` : 'none' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: a.c, flexShrink: 0, marginTop: 3 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: T.t1, lineHeight: 1.4, marginBottom: 2 }}>{a.text}</div>
              <div style={{ fontSize: 9, color: T.t3 }}>{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SalesDashboard() {
  const [tab, setTab] = useState('dash');
  const TBTN = { height: 22, padding: '0 9px', fontSize: 8, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all .12s' };
  const tabs = [['dash', 'Дашборд'], ['funnel', 'Воронка'], ['managers', 'Менеджеры']];

  return (
    <div style={{ background: T.card, ...ch(20), overflow: 'hidden', fontFamily: 'Inter,sans-serif' }}>
      <div style={{ background: T.card, borderBottom: `1px solid ${T.border}`, padding: '0 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 38 }}>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.1em', color: T.t2 }}>СИСТЕМА В ДЕЙСТВИИ</span>
          <div style={{ display: 'flex', gap: 1, background: '#0A0A0A', padding: 2, ...ch(5) }}>
            {tabs.map(([k, l]) => {
              const a = tab === k;
              return <button key={k} onClick={() => setTab(k)} style={{ ...TBTN, background: a ? C.tan : 'transparent', color: a ? '#0A0A0A' : T.t3, ...ch(4) }}>{l}</button>;
            })}
          </div>
        </div>
      </div>
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {tab === 'dash' && <DashDashboard />}
        {tab === 'funnel' && <DashFunnel />}
        {tab === 'managers' && <DashManagers />}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 7, color: T.t3 }}>Платформа AIVISION · NDA · данные изменены</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}><div style={{ width: 5, height: 5, borderRadius: '50%', background: C.emerald }} /><span style={{ fontSize: 7, color: T.t3 }}>live</span></div>
        </div>
      </div>
    </div>
  );
}
