import { useState } from 'react';

const T = { bg: '#0A0A0A', card: '#181818', card2: '#1F1F1F', border: '#2A2A2A', t1: '#FFFFFF', t2: '#A3A3A3', t3: '#555555' };
const C = { brand: '#3F6EE8', emerald: '#10B981', crimson: '#F43F5E', sun: '#FCD34D', indigo: '#6366F1', tan: '#FB923C', slate: '#94A3B8' };
const ACC = C.brand;
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

function BigSpark({ data, color, h = 54, filled = true, idKey }) {
  if (!data || data.length < 2) return <div style={{ height: h }} />;
  const mn = Math.min(...data), mx = Math.max(...data), r = mx - mn || 1;
  const w = 200;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - ((v - mn) / r) * h * .72 - 4]);
  const line = smooth(pts);
  const area = line + ` L${pts[pts.length - 1][0]},${h} L${pts[0][0]},${h} Z`;
  const id = 'bspk_' + (idKey || (color.replace('#', '') + h));
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={filled ? '.55' : '0'} />
          <stop offset="100%" stopColor={color} stopOpacity={filled ? '.15' : '0'} />
        </linearGradient>
      </defs>
      {filled && <path d={area} fill={`url(#${id})`} />}
      <path d={line} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function KpiBig({ label, value, sub, subColor, sparkData, accent, sparkColor, idKey }) {
  const bg = accent ? ACC : T.card;
  const fg = accent ? '#fff' : T.t1;
  const labelColor = accent ? 'rgba(255,255,255,.6)' : T.t3;
  const subC = accent ? 'rgba(255,255,255,.75)' : (subColor || T.t2);
  return (
    <div style={{ background: bg, padding: '14px 14px 0', display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, height: 138, ...ch(10), overflow: 'hidden' }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: labelColor, marginBottom: 6, lineHeight: 1.2 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: fg, lineHeight: 1, fontVariantNumeric: 'tabular-nums', letterSpacing: '-.025em', marginBottom: 5, whiteSpace: 'nowrap' }}>{value}</div>
      {sub && <div style={{ fontSize: 10, fontWeight: 600, color: subC, fontVariantNumeric: 'tabular-nums', lineHeight: 1.2 }}>{sub}</div>}
      <div style={{ marginLeft: -14, marginRight: -14, marginTop: 'auto', height: 48 }}>
        <BigSpark data={sparkData} color={accent ? 'rgba(0,0,0,.55)' : (sparkColor || C.brand)} h={48} idKey={idKey} />
      </div>
    </div>
  );
}

const PROJECTS = [
  { id: '1', name: 'Проект 1', code: 'PRJ-01', revenue: 8200000, expenses: 5904000, profit: 2296000, margin: 28, c: C.emerald, grow: '+20%' },
  { id: '2', name: 'Проект 2', code: 'PRJ-02', revenue: 6100000, expenses: 4758000, profit: 1342000, margin: 22, c: C.brand, grow: '+20%' },
  { id: '3', name: 'Проект 3', code: 'PRJ-03', revenue: 4400000, expenses: 3916000, profit: 484000, margin: 11, c: C.sun, grow: 'стаб.' },
  { id: '4', name: 'Проект 4', code: 'PRJ-04', revenue: 1800000, expenses: 1908000, profit: -108000, margin: -6, c: C.crimson, grow: 'убыток', warn: true },
];

const fmtM = v => {
  const a = Math.abs(v); const s = v < 0 ? '−' : '';
  if (a >= 1e6) return s + (a / 1e6).toFixed(1).replace('.', ',') + 'М ₽';
  if (a >= 1e3) return s + Math.round(a / 1e3) + 'К ₽';
  return s + Math.round(a) + ' ₽';
};

function PnL() {
  const totalRev = PROJECTS.reduce((s, p) => s + p.revenue, 0);
  const totalExp = PROJECTS.reduce((s, p) => s + p.expenses, 0);
  const totalProfit = totalRev - totalExp;
  const totalMargin = (totalProfit / totalRev * 100).toFixed(1);

  const revMonthly = [16, 17, 17.5, 18, 18.2, 19, 19.5, 20, 20.2, 20.5, 20.5, 20.5];
  const expMonthly = [14, 14.5, 15, 15.2, 15.5, 15.8, 16, 16.2, 16.3, 16.4, 16.5, 16.5];
  const profitMonthly = revMonthly.map((v, i) => v - expMonthly[i]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <KpiBig accent label="Чистая прибыль" value={fmtM(totalProfit)} sub="+15% к апрелю" sparkData={profitMonthly} idKey="pnl-net" />
        <KpiBig label="Маржа" value={`${totalMargin}%`} sub="+2 пп vs пред." subColor={C.emerald} sparkData={[16, 17, 18, 19, 20, 21, 21, 21, 21]} sparkColor={C.emerald} idKey="pnl-margin" />
        <KpiBig label="Выручка" value={fmtM(totalRev)} sub="+12% YoY" subColor={C.brand} sparkData={revMonthly} sparkColor={C.brand} idKey="pnl-rev" />
        <KpiBig label="Себес/выручка" value="60.6%" sub="цель ≤65%" subColor={C.sun} sparkData={[65, 64, 63, 62, 61, 61, 61, 60.6, 60.6]} sparkColor={C.sun} idKey="pnl-cost" />
      </div>

      <div style={{ background: T.card, ...ch(10), overflow: 'hidden' }}>
        <div style={{ padding: '10px 14px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 14, height: 2, background: ACC, display: 'block' }} />
          <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.13em', textTransform: 'uppercase', color: T.t3 }}>ОПУ по проектам · апрель 2026</span>
          <span style={{ marginLeft: 'auto', fontSize: 10, color: T.t3 }}>в тыс. ₽</span>
        </div>

        <div style={{ padding: '10px 14px', display: 'grid', gridTemplateColumns: '28px minmax(110px,1fr) 90px 90px 90px 60px', gap: 10, fontSize: 8, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: T.t3, borderBottom: `1px solid ${T.border}` }}>
          <span></span>
          <span>Проект</span>
          <span style={{ textAlign: 'right' }}>Выручка</span>
          <span style={{ textAlign: 'right' }}>Расходы</span>
          <span style={{ textAlign: 'right' }}>Прибыль</span>
          <span style={{ textAlign: 'right' }}>Маржа</span>
        </div>

        {PROJECTS.map((p, i) => (
          <div key={p.id} style={{ padding: '10px 14px', display: 'grid', gridTemplateColumns: '28px minmax(110px,1fr) 90px 90px 90px 60px', gap: 10, alignItems: 'center', background: i % 2 === 1 ? ha('#fff', .012) : T.card, borderBottom: `1px solid ${T.border}` }}>
            <div style={{ width: 24, height: 24, background: ha(p.c, .15), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: p.c, ...ch(5) }}>{p.id}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: T.t1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
              <div style={{ fontSize: 9, color: T.t3, fontVariantNumeric: 'tabular-nums' }}>{p.code}{p.warn && ' · УБЫТОЧНЫЙ'}</div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.t1, fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{Math.round(p.revenue / 1000).toLocaleString('ru-RU')}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.t2, fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{Math.round(p.expenses / 1000).toLocaleString('ru-RU')}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: p.profit > 0 ? C.emerald : C.crimson, fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{p.profit > 0 ? '+' : ''}{Math.round(p.profit / 1000).toLocaleString('ru-RU')}</div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: p.c, background: ha(p.c, .12), padding: '2px 7px', ...ch(4) }}>{p.margin > 0 ? '+' : ''}{p.margin}%</span>
            </div>
          </div>
        ))}

        <div style={{ padding: '12px 14px', background: T.card2, display: 'grid', gridTemplateColumns: '28px minmax(110px,1fr) 90px 90px 90px 60px', gap: 10, alignItems: 'center' }}>
          <div></div>
          <div style={{ fontSize: 11, fontWeight: 800, color: T.t1, letterSpacing: '.05em' }}>ИТОГО</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: T.t1, fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{Math.round(totalRev / 1000).toLocaleString('ru-RU')}</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: T.t2, fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{Math.round(totalExp / 1000).toLocaleString('ru-RU')}</div>
          <div style={{ fontSize: 13, fontWeight: 900, color: C.emerald, fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>+{Math.round(totalProfit / 1000).toLocaleString('ru-RU')}</div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: C.emerald, background: ha(C.emerald, .15), padding: '2px 7px', ...ch(4) }}>{totalMargin}%</span>
          </div>
        </div>
      </div>

      <div style={{ background: T.card, ...ch(10), overflow: 'hidden' }}>
        <div style={{ padding: '10px 14px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 14, height: 2, background: C.emerald, display: 'block' }} />
          <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.13em', textTransform: 'uppercase', color: T.t3 }}>ABC-анализ расходов · структура</span>
        </div>
        {[
          { g: 'A', label: 'Топ 80% расходов', sub: 'Стройматериалы + ФОТ · 12 статей', val: '9.6М ₽', c: C.brand, trend: [80, 82, 84, 85, 87], w: '80%' },
          { g: 'B', label: 'Следующие 15%', sub: 'Логистика + спецтехника · 18 статей', val: '2.4М ₽', c: C.sun, trend: [20, 22, 21, 22, 22], w: '15%' },
          { g: 'C', label: 'Остаток 5%', sub: 'Прочее · 47 статей', val: '0.8М ₽', c: C.slate, trend: [8, 7, 7, 8, 7.5], w: '5%' },
        ].map((r, i) => (
          <div key={r.g} style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: i < 2 ? `1px solid ${T.border}` : 'none' }}>
            <div style={{ width: 28, height: 28, background: ha(r.c, .15), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: r.c, ...ch(6) }}>{r.g}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: T.t1 }}>{r.label}</span>
                <span style={{ fontSize: 10, color: T.t3 }}>· {r.sub}</span>
              </div>
              <div style={{ height: 4, background: T.border, borderRadius: 1 }}>
                <div style={{ height: '100%', width: r.w, background: r.c, borderRadius: 1 }} />
              </div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 800, color: r.c, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{r.val}</div>
            <div style={{ width: 50, height: 20 }}><BigSpark data={r.trend} color={r.c} h={20} filled={false} idKey={'abc-' + r.g} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DDS() {
  const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
  const income = [18, 19, 20, 22, 21, 23, 22, 24, 23, 25, 24, 26];
  const outflow = [17, 18, 18, 19, 18, 20, 18, 19, 18, 20, 19, 21];
  const balance = income.map((v, i) => v - outflow[i]);
  const cumBalance = balance.reduce((acc, v, i) => { acc.push((acc[i - 1] || 0) + v); return acc; }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <KpiBig accent label="Остаток на счетах" value="14.6М ₽" sub="+2.1М за месяц" sparkData={cumBalance} idKey="dds-bal" />
        <KpiBig label="Приходы YTD" value="267М ₽" sub="+18% YoY" subColor={C.emerald} sparkData={income} sparkColor={C.emerald} idKey="dds-in" />
        <KpiBig label="Расходы YTD" value="221М ₽" sub="−3% к плану" subColor={C.crimson} sparkData={outflow} sparkColor={C.crimson} idKey="dds-out" />
        <KpiBig label="Кассовые разрывы" value="0" sub="за 12 мес." subColor={C.emerald} sparkData={[2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]} sparkColor={C.emerald} idKey="dds-gap" />
      </div>

      <div style={{ background: T.card, padding: 14, ...ch(10) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          <span style={{ width: 14, height: 2, background: ACC, display: 'block' }} />
          <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.13em', textTransform: 'uppercase', color: T.t3 }}>ДДС · 12 месяцев</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 14, height: 2, background: C.brand }} /><span style={{ fontSize: 9, color: T.t2 }}>Приходы</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 14, borderTop: `2px dashed ${C.crimson}`, display: 'block' }} /><span style={{ fontSize: 9, color: T.t2 }}>Расходы</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 8, height: 8, background: C.emerald }} /><span style={{ fontSize: 9, color: T.t2 }}>Сальдо</span></div>
          </div>
        </div>
        <svg width="100%" height={140} viewBox="0 0 300 140" preserveAspectRatio="none" style={{ display: 'block', marginBottom: 6 }}>
          <defs>
            <linearGradient id="dds_ig" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.brand} stopOpacity=".18" /><stop offset="100%" stopColor={C.brand} stopOpacity="0" /></linearGradient>
          </defs>
          {(() => {
            const mn = 15, mx = 28, r = mx - mn, h = 118, pt = 8;
            const yi = v => pt + h - ((v - mn) / r) * h;
            const xi = i => (i / 11) * 290 + 5;
            const ipts = income.map((v, i) => [xi(i), yi(v)]);
            const opts = outflow.map((v, i) => [xi(i), yi(v)]);
            const il = smooth(ipts); const ol = smooth(opts);
            const ia = il + ` L${ipts[11][0]},${pt + h} L${ipts[0][0]},${pt + h} Z`;
            const grid = [0.25, 0.5, 0.75, 1].map((p, i) => <line key={i} x1="5" y1={pt + h * p} x2="295" y2={pt + h * p} stroke={T.border} strokeWidth="1" strokeDasharray={p === 1 ? '' : '2 4'} />);
            const sbars = balance.map((v, i) => {
              const bx = xi(i) - 6, bw = 12;
              const bh = Math.max(2, (v / 8) * 20);
              return <rect key={i} x={bx} y={pt + h - bh} width={bw} height={bh} fill={ha(C.emerald, .35)} rx="1" />;
            });
            return <>
              {grid}
              {sbars}
              <path d={ia} fill="url(#dds_ig)" />
              <path d={il} fill="none" stroke={C.brand} strokeWidth="2" strokeLinecap="round" />
              <path d={ol} fill="none" stroke={C.crimson} strokeWidth="1.6" strokeLinecap="round" strokeDasharray="5 3" />
              <circle cx={ipts[11][0]} cy={ipts[11][1]} r="3.5" fill={C.brand} />
              <circle cx={opts[11][0]} cy={opts[11][1]} r="3" fill={C.crimson} />
            </>;
          })()}
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 5px' }}>
          {months.map((m, i) => <span key={i} style={{ fontSize: 8, color: T.t3, fontVariantNumeric: 'tabular-nums' }}>{m}</span>)}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        <div style={{ background: T.card, ...ch(10), overflow: 'hidden' }}>
          <div style={{ padding: '10px 14px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 2, background: C.emerald, display: 'block' }} />
            <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.13em', textTransform: 'uppercase', color: T.t3 }}>Приходы · апрель</span>
          </div>
          {[
            { label: 'Оплата по договорам', val: '18.4М ₽', pct: 78, c: C.brand },
            { label: 'Авансы заказчиков', val: '3.8М ₽', pct: 16, c: C.indigo },
            { label: 'Возвраты НДС', val: '1.2М ₽', pct: 5, c: C.slate },
            { label: 'Прочее', val: '0.2М ₽', pct: 1, c: T.t3 },
          ].map((r, i) => (
            <div key={i} style={{ padding: '9px 14px', borderBottom: i < 3 ? `1px solid ${T.border}` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: T.t1, flex: 1 }}>{r.label}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.t1, fontVariantNumeric: 'tabular-nums' }}>{r.val}</span>
              </div>
              <div style={{ height: 3, background: T.border, borderRadius: 1 }}>
                <div style={{ height: '100%', width: r.pct + '%', background: r.c, borderRadius: 1 }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: T.card, ...ch(10), overflow: 'hidden' }}>
          <div style={{ padding: '10px 14px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 2, background: C.crimson, display: 'block' }} />
            <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.13em', textTransform: 'uppercase', color: T.t3 }}>Расходы · апрель</span>
          </div>
          {[
            { label: 'Стройматериалы', val: '8.9М ₽', pct: 46, c: C.crimson },
            { label: 'ФОТ + подрядчики', val: '6.4М ₽', pct: 33, c: C.tan },
            { label: 'Спецтехника', val: '2.1М ₽', pct: 11, c: C.sun },
            { label: 'Налоги + аренда', val: '1.9М ₽', pct: 10, c: C.slate },
          ].map((r, i) => (
            <div key={i} style={{ padding: '9px 14px', borderBottom: i < 3 ? `1px solid ${T.border}` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: T.t1, flex: 1 }}>{r.label}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.t1, fontVariantNumeric: 'tabular-nums' }}>{r.val}</span>
              </div>
              <div style={{ height: 3, background: T.border, borderRadius: 1 }}>
                <div style={{ height: '100%', width: r.pct + '%', background: r.c, borderRadius: 1 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Balance() {
  const assets = [
    { label: 'Денежные средства', val: 14.6, c: C.emerald },
    { label: 'Дебиторская задолженность', val: 22.4, c: C.brand },
    { label: 'Запасы (стройматериалы)', val: 18.1, c: C.indigo },
    { label: 'Основные средства', val: 34.2, c: C.slate },
    { label: 'НДС к возмещению', val: 3.8, c: C.sun },
  ];
  const liabs = [
    { label: 'Кредиторская задолженность', val: 19.7, c: C.crimson },
    { label: 'Авансы полученные', val: 12.3, c: C.tan },
    { label: 'Кредиты + займы', val: 24.5, c: C.crimson },
    { label: 'Налоги к уплате', val: 4.1, c: C.sun },
    { label: 'Капитал', val: 32.5, c: C.emerald },
  ];
  const totalAssets = assets.reduce((s, a) => s + a.val, 0);
  const totalLiabs = liabs.reduce((s, a) => s + a.val, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <KpiBig accent label="Чистые активы" value="32.5М ₽" sub="+4.2М за квартал" sparkData={[24, 26, 27, 29, 30, 31, 32, 32.5]} idKey="bal-na" />
        <KpiBig label="Оборотный капитал" value="36.5М ₽" sub="ликвидность 1.8" subColor={C.emerald} sparkData={[28, 30, 32, 34, 35, 36, 36.5, 36.5]} sparkColor={C.emerald} idKey="bal-wc" />
        <KpiBig label="Долговая нагрузка" value="0.43" sub="цель ≤0.5" subColor={C.sun} sparkData={[.6, .55, .5, .48, .46, .44, .43, .43]} sparkColor={C.sun} idKey="bal-debt" />
        <KpiBig label="ROE годовой" value="28.4%" sub="+5 пп YoY" subColor={C.emerald} sparkData={[19, 21, 23, 24, 25, 26, 27, 28, 28.4]} sparkColor={C.emerald} idKey="bal-roe" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        <div style={{ background: T.card, ...ch(10), overflow: 'hidden' }}>
          <div style={{ padding: '10px 14px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 2, background: C.brand, display: 'block' }} />
            <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.13em', textTransform: 'uppercase', color: T.t3 }}>Активы</span>
            <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700, color: T.t1 }}>{totalAssets.toFixed(1)}М ₽</span>
          </div>
          {assets.map((a, i) => {
            const pct = a.val / totalAssets * 100;
            return (
              <div key={i} style={{ padding: '9px 14px', borderBottom: i < assets.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: T.t1, flex: 1 }}>{a.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: T.t1, fontVariantNumeric: 'tabular-nums' }}>{a.val.toFixed(1)}М ₽</span>
                  <span style={{ fontSize: 9, color: T.t3, minWidth: 32, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{pct.toFixed(0)}%</span>
                </div>
                <div style={{ height: 3, background: T.border, borderRadius: 1 }}>
                  <div style={{ height: '100%', width: pct + '%', background: a.c, borderRadius: 1 }} />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ background: T.card, ...ch(10), overflow: 'hidden' }}>
          <div style={{ padding: '10px 14px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 2, background: C.crimson, display: 'block' }} />
            <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.13em', textTransform: 'uppercase', color: T.t3 }}>Обязательства + капитал</span>
            <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700, color: T.t1 }}>{totalLiabs.toFixed(1)}М ₽</span>
          </div>
          {liabs.map((a, i) => {
            const pct = a.val / totalLiabs * 100;
            return (
              <div key={i} style={{ padding: '9px 14px', borderBottom: i < liabs.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: T.t1, flex: 1 }}>{a.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: T.t1, fontVariantNumeric: 'tabular-nums' }}>{a.val.toFixed(1)}М ₽</span>
                  <span style={{ fontSize: 9, color: T.t3, minWidth: 32, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{pct.toFixed(0)}%</span>
                </div>
                <div style={{ height: 3, background: T.border, borderRadius: 1 }}>
                  <div style={{ height: '100%', width: pct + '%', background: a.c, borderRadius: 1 }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ background: T.card, ...ch(10), overflow: 'hidden' }}>
        <div style={{ padding: '10px 14px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 10, height: 2, background: C.emerald, display: 'block' }} />
          <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.13em', textTransform: 'uppercase', color: T.t3 }}>Финансовые коэффициенты</span>
        </div>
        <div style={{ padding: 14, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[
            { label: 'Текущая ликвидность', val: '1.84', target: '>1.5', c: C.emerald, note: 'норма' },
            { label: 'Быстрая ликвидность', val: '1.12', target: '>1.0', c: C.emerald, note: 'норма' },
            { label: 'Коэф. автономии', val: '0.34', target: '>0.5', c: C.sun, note: 'ниже целевого' },
            { label: 'Оборачиваемость деб. зад.', val: '42 дн', target: '<45', c: C.emerald, note: 'норма' },
            { label: 'Оборачиваемость кред. зад.', val: '38 дн', target: '<50', c: C.emerald, note: 'норма' },
            { label: 'Длительность опер. цикла', val: '68 дн', target: '<75', c: C.emerald, note: 'норма' },
          ].map((k, i) => (
            <div key={i} style={{ background: T.card2, padding: '12px 14px', ...ch(6) }}>
              <div style={{ fontSize: 9, color: T.t3, marginBottom: 6, letterSpacing: '.05em', lineHeight: 1.3 }}>{k.label}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 3, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: k.c, fontVariantNumeric: 'tabular-nums', letterSpacing: '-.02em', lineHeight: 1 }}>{k.val}</span>
                <span style={{ fontSize: 9, color: T.t3, whiteSpace: 'nowrap' }}>цель {k.target}</span>
              </div>
              <span style={{ fontSize: 9, fontWeight: 600, color: k.c }}>{k.note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BuildDashboard() {
  const [tab, setTab] = useState('pnl');
  const TBTN = { height: 24, padding: '0 11px', fontSize: 9, fontWeight: 600, letterSpacing: '.09em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all .12s' };
  const tabs = [['pnl', 'ОПУ'], ['dds', 'ДДС'], ['balance', 'Баланс']];

  return (
    <div style={{ background: T.card, ...ch(20), overflow: 'hidden', fontFamily: 'Inter,sans-serif' }}>
      <div style={{ background: T.card, borderBottom: `1px solid ${T.border}`, padding: '0 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 42 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', color: T.t2 }}>СИСТЕМА В ДЕЙСТВИИ</span>
          <div style={{ display: 'flex', gap: 2, background: '#0A0A0A', padding: 2, ...ch(6) }}>
            {tabs.map(([k, l]) => {
              const a = tab === k;
              return <button key={k} type="button" onClick={() => setTab(k)} style={{ ...TBTN, background: a ? ACC : 'transparent', color: a ? '#fff' : T.t3, ...ch(5) }}>{l}</button>;
            })}
          </div>
        </div>
      </div>
      <div style={{ padding: '12px 14px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {tab === 'pnl' && <PnL />}
        {tab === 'dds' && <DDS />}
        {tab === 'balance' && <Balance />}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 4 }}>
          <span style={{ fontSize: 8, color: T.t3 }}>Платформа AIVISION · NDA · данные изменены</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 5, height: 5, borderRadius: '50%', background: C.emerald }} /><span style={{ fontSize: 8, color: T.t3 }}>live</span></div>
        </div>
      </div>
    </div>
  );
}
