import { useState } from 'react';

const T = { bg: '#0A0A0A', card: '#181818', card2: '#1F1F1F', border: '#2A2A2A', t1: '#FFFFFF', t2: '#A3A3A3', t3: '#555555' };
const C = { brand: '#3F6EE8', emerald: '#10B981', crimson: '#F43F5E', sun: '#FCD34D', indigo: '#6366F1', tan: '#FB923C', slate: '#94A3B8' };
const ACC = C.slate;
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

function BigSpark({ data, color, h = 54, filled = false, idKey }) {
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
          <stop offset="0%" stopColor={color} stopOpacity={filled ? '.45' : '0'} />
          <stop offset="60%" stopColor={color} stopOpacity={filled ? '.05' : '0'} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {filled && <path d={area} fill={`url(#${id})`} />}
      <path d={line} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function KpiBig({ label, value, sub, subColor, sparkData, accent, sparkColor, idKey }) {
  const fg = accent ? ACC : T.t1;
  const subC = subColor || T.t2;
  const sparkC = accent ? ACC : (sparkColor || C.brand);
  return (
    <div style={{ background: T.card, padding: '14px 14px 0', display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, height: 138, ...ch(10), overflow: 'hidden' }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: T.t3, marginBottom: 6, lineHeight: 1.2 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: fg, lineHeight: 1, fontVariantNumeric: 'tabular-nums', letterSpacing: '-.025em', marginBottom: 5, whiteSpace: 'nowrap' }}>{value}</div>
      {sub && <div style={{ fontSize: 10, fontWeight: 600, color: subC, fontVariantNumeric: 'tabular-nums', lineHeight: 1.2 }}>{sub}</div>}
      <div style={{ marginLeft: -14, marginRight: -14, marginTop: 'auto', height: 48 }}>
        <BigSpark data={sparkData} color={sparkC} h={48} filled={accent} idKey={idKey} />
      </div>
    </div>
  );
}


function PnL() {
  // план/факт по проектам — макет ячейки из case-build-opu-only.html
  const planFact = [
    { id: '1', name: 'Проект 1', plan: 9000, fact: 8200, c: ACC },
    { id: '2', name: 'Проект 2', plan: 5800, fact: 6100, c: C.emerald },
    { id: '3', name: 'Проект 3', plan: 4800, fact: 4400, c: C.sun },
    { id: '4', name: 'Проект 4', plan: 2400, fact: 1800, c: C.crimson, warn: true },
  ];
  const totalPlan = planFact.reduce((s, p) => s + p.plan, 0);
  const totalFact = planFact.reduce((s, p) => s + p.fact, 0);
  const totalDelta = totalFact - totalPlan;
  const totalDeltaPct = (totalDelta / totalPlan * 100).toFixed(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* 4 KPI каскад ОПУ: Выручка → Валовая → Операционная → Чистая */}
      <div style={{ display: 'flex', gap: 6 }}>
        <KpiBig accent label="Выручка" value="20,5М ₽" sub="+12% YoY" sparkData={[15, 16, 17, 18, 19, 20, 20.5]} idKey="pnl-rev" />
        <KpiBig label="Валовая прибыль" value="8,2М ₽" sub="40% маржа" subColor={C.emerald} sparkData={[5, 5.5, 6.5, 7, 7.5, 8, 8.2]} sparkColor={C.emerald} idKey="pnl-gross" />
        <KpiBig label="Операционная" value="5,4М ₽" sub="26% маржа" subColor={C.emerald} sparkData={[3, 3.5, 4, 4.5, 5, 5.2, 5.4]} sparkColor={C.emerald} idKey="pnl-op" />
        <KpiBig label="Чистая прибыль" value="4,0М ₽" sub="+15% к апрелю" subColor={C.emerald} sparkData={[2.5, 2.8, 3.2, 3.5, 3.8, 3.9, 4]} sparkColor={C.emerald} idKey="pnl-net" />
      </div>

      {/* План / Факт — общий + по 4 проектам */}
      <div style={{ background: T.card, ...ch(10), overflow: 'hidden' }}>
        {/* header */}
        <div style={{ padding: '12px 14px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 14, height: 2, background: ACC, display: 'block' }} />
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: T.t3 }}>План / Факт · выручка по проектам</span>
          <span style={{ marginLeft: 'auto', fontSize: 9, color: T.t3 }}>тыс. ₽</span>
        </div>

        {/* ИТОГО ПО КОМПАНИИ — выделено accent-fade */}
        <div style={{ padding: 14, background: ha(ACC, .08), borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: T.t1, letterSpacing: '.04em', textTransform: 'uppercase' }}>Итого по компании</span>
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 9, color: T.t3, fontVariantNumeric: 'tabular-nums' }}>план {totalPlan.toLocaleString('ru-RU')}</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: T.t1, fontVariantNumeric: 'tabular-nums' }}>{totalFact.toLocaleString('ru-RU')}</span>
            <span style={{ fontSize: 11, fontWeight: 800, color: totalDelta >= 0 ? C.emerald : C.crimson, background: ha(totalDelta >= 0 ? C.emerald : C.crimson, .15), padding: '3px 8px', fontVariantNumeric: 'tabular-nums', ...ch(4), minWidth: 54, textAlign: 'center' }}>{totalDelta >= 0 ? '+' : ''}{totalDeltaPct}%</span>
          </div>
          {/* двойной бар: план серый, факт сверху */}
          <div style={{ position: 'relative', height: 8, background: T.border, borderRadius: 1 }}>
            <div style={{ position: 'absolute', inset: 0, background: ha('#fff', .05), borderRadius: 1 }} />
            <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: Math.min(100, totalFact / totalPlan * 100) + '%', background: totalDelta >= 0 ? C.emerald : ACC, borderRadius: 1, transition: 'width .3s' }} />
            <div style={{ position: 'absolute', top: -2, left: '100%', width: 2, height: 12, background: T.t2, transform: 'translateX(-1px)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 8, color: T.t3, fontVariantNumeric: 'tabular-nums' }}>
            <span>0</span>
            <span>план: {totalPlan.toLocaleString('ru-RU')}</span>
          </div>
        </div>

        {/* строки по проектам */}
        {planFact.map((p, i) => {
          const delta = p.fact - p.plan;
          const deltaPct = (delta / p.plan * 100).toFixed(1);
          const exceedsPlan = p.fact >= p.plan;
          const factPct = Math.min(100, p.fact / p.plan * 100);
          return (
            <div key={p.id} style={{ padding: '12px 14px', borderBottom: i < planFact.length - 1 ? `1px solid ${T.border}` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 }}>
                <div style={{ width: 22, height: 22, background: ha(p.c, .15), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: p.c, ...ch(5), flexShrink: 0 }}>{p.id}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: T.t1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                  {p.warn && <div style={{ fontSize: 8, fontWeight: 700, color: C.crimson, letterSpacing: '.05em' }}>УБЫТОЧНЫЙ</div>}
                </div>
                <span style={{ fontSize: 9, color: T.t3, fontVariantNumeric: 'tabular-nums' }}>план {p.plan.toLocaleString('ru-RU')}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: T.t1, fontVariantNumeric: 'tabular-nums', minWidth: 50, textAlign: 'right' }}>{p.fact.toLocaleString('ru-RU')}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: exceedsPlan ? C.emerald : C.crimson, background: ha(exceedsPlan ? C.emerald : C.crimson, .12), padding: '2px 7px', fontVariantNumeric: 'tabular-nums', ...ch(4), minWidth: 54, textAlign: 'center' }}>{delta >= 0 ? '+' : ''}{deltaPct}%</span>
              </div>
              {/* бар с маркой плана */}
              <div style={{ position: 'relative', height: 6, background: T.border, borderRadius: 1, marginLeft: 32 }}>
                <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: factPct + '%', background: exceedsPlan ? C.emerald : p.c, opacity: .85, borderRadius: 1 }} />
                {p.fact < p.plan && (
                  <div style={{ position: 'absolute', top: -2, left: '100%', width: 2, height: 10, background: T.t2, transform: 'translateX(-1px)' }} title="план" />
                )}
              </div>
            </div>
          );
        })}

        {/* легенда */}
        <div style={{ padding: '10px 14px', background: T.card2, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 14, height: 6, background: C.emerald, borderRadius: 1 }} />
            <span style={{ fontSize: 9, color: T.t2 }}>выполнили / перевыполнили</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 14, height: 6, background: C.crimson, borderRadius: 1, opacity: .85 }} />
            <span style={{ fontSize: 9, color: T.t2 }}>отстают</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 2, height: 10, background: T.t2 }} />
            <span style={{ fontSize: 9, color: T.t2 }}>марка плана</span>
          </div>
        </div>
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

export default function BuildDashboard({ only, hideHeader = false, hideFooter = false }) {
  const [tab, setTab] = useState(only || 'pnl');
  const active = only || tab;
  const TBTN = { height: 24, padding: '0 11px', fontSize: 9, fontWeight: 600, letterSpacing: '.09em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all .12s' };
  const tabs = [['pnl', 'ОПУ'], ['dds', 'ДДС'], ['balance', 'Баланс']];

  return (
    <div style={{ background: T.card, ...ch(20), overflow: 'hidden', fontFamily: 'Inter,sans-serif' }}>
      {!hideHeader && (
        <div style={{ background: T.card, borderBottom: `1px solid ${T.border}`, padding: '0 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 42 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', color: T.t2 }}>СИСТЕМА В ДЕЙСТВИИ</span>
            <div style={{ display: 'flex', gap: 2, background: '#0A0A0A', padding: 2, ...ch(6) }}>
              {tabs.map(([k, l]) => {
                const a = active === k;
                return <button key={k} type="button" onClick={() => setTab(k)} disabled={!!only} style={{ ...TBTN, background: a ? ACC : 'transparent', color: a ? '#fff' : T.t3, ...ch(5), opacity: only && !a ? .3 : 1, cursor: only ? 'default' : 'pointer' }}>{l}</button>;
              })}
            </div>
          </div>
        </div>
      )}
      <div style={{ padding: '12px 14px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {active === 'pnl' && <PnL />}
        {active === 'dds' && <DDS />}
        {active === 'balance' && <Balance />}
        {!hideFooter && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 4 }}>
            <span style={{ fontSize: 8, color: T.t3 }}>Платформа AIVISION · NDA · данные изменены</span>
          </div>
        )}
      </div>
    </div>
  );
}
