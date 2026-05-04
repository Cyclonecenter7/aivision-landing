import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Design-system helpers (dashboard scale) ──────────────────
const ch = (px) => ({ clipPath: `polygon(0 0,100% 0,100% calc(100% - ${px}px),calc(100% - ${px}px) 100%,0 100%)` });
const G = '#16A34A';   // green  — прибыль, рост
const R = '#E5484D';   // red    — убыток, падение
const B = '#3F6EE8';   // blue   — выручка, объём, нейтральная

// ─── Atoms ────────────────────────────────────────────────────

function Ticker({ items }) {
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

function Kpi({ label, value, delta, deltaPos, unit }) {
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

function Bar({ pct, color = B, height = 5 }) {
  return (
    <div style={{ background: '#F0F3FA', height, width: '100%' }}>
      <div style={{ height, width: `${Math.min(pct, 100)}%`, background: color }} />
    </div>
  );
}


const TH = ({ children, align = 'left' }) => (
  <th style={{ textAlign: align, padding: '8px 12px', fontSize: 8, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', borderBottom: '1px solid #F0F0F0', whiteSpace: 'nowrap' }}>
    {children}
  </th>
);
const TD = ({ children, align = 'left', color, blur }) => (
  <td style={{ textAlign: align, padding: '7px 12px', fontSize: 10, fontWeight: 500, color: color || '#333', borderBottom: '1px solid #F4F4F5', fontVariantNumeric: 'tabular-nums', ...(blur ? { filter: 'blur(3px)', userSelect: 'none' } : {}) }}>
    {children}
  </td>
);

// ─── Slides ───────────────────────────────────────────────────

function SlideDashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
      <Ticker items={[
        { label: 'МАРЖА',   value: '376 185 ₽', delta: '+93%',  pos: true },
        { label: 'ОБОРОТ',  value: '649 351 ₽', delta: '+9%',   pos: true },
        { label: 'РАСХОДЫ', value: '273 166 ₽', delta: '−32%',  pos: true },
      ]} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        <Kpi label="МАРЖА"   value="376 185" unit="₽" delta="+93%" deltaPos={true} />
        <Kpi label="ОБОРОТ"  value="649 351" unit="₽" delta="+9%"  deltaPos={true} />
        <Kpi label="РАСХОДЫ" value="273 166" unit="₽" delta="−32%" deltaPos={true} />
      </div>

      <div style={{ background: '#fff', border: '1px solid #E8E8E8', overflow: 'hidden', flex: 1 }}>
        <div style={{ padding: '8px 12px', borderBottom: '1px solid #F0F0F0', fontSize: 9, fontWeight: 600, letterSpacing: '-0.01em', color: '#0A0A0A' }}>
          Дашборд продаж · Апрель 2026
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10, fontVariantNumeric: 'tabular-nums' }}>
          <thead><tr>
            <TH>Дата</TH><TH align="right">Маржа</TH><TH align="right">Оборот</TH><TH align="right">Расходы</TH>
          </tr></thead>
          <tbody>
            {[['01.04','12 400','18 000','5 600'],['02.04','9 200','14 500','5 300'],['03.04','15 800','22 000','6 200']].map((row, i) => (
              <tr key={i}>
                <TD>{row[0]}</TD>
                <TD align="right" color={G}>{row[1]} ₽</TD>
                <TD align="right" color={B}>{row[2]} ₽</TD>
                <TD align="right" color={R}>{row[3]} ₽</TD>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SlideOperations() {
  const rows = [
    ['12.04, 17:00','Оказание услуг','Клиент 1','+ 4 000 ₽'],
    ['12.04, 14:00','Мероприятие',  'Клиент 2','+ 25 000 ₽'],
    ['11.04, 12:00','Оказание услуг','Клиент 3','+ 8 500 ₽'],
    ['10.04, 18:00','Сертификат',   'Клиент 4','+ 4 000 ₽'],
  ];
  const cats = [
    { cat: 'Оказание услуг', val: '352 021 ₽', pct: 54 },
    { cat: 'Мероприятия',   val: '288 000 ₽', pct: 44 },
    { cat: 'Сертификаты',   val: '5 330 ₽',   pct: 2  },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
      <div style={{ background: '#fff', border: '1px solid #E8E8E8', overflow: 'hidden', flex: 1 }}>
        <div style={{ padding: '8px 12px', borderBottom: '1px solid #F0F0F0', fontSize: 9, fontWeight: 600, color: '#0A0A0A' }}>Доходные операции</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontVariantNumeric: 'tabular-nums' }}>
          <thead><tr>
            <TH>Дата</TH><TH>Услуга</TH><TH>Клиент</TH><TH align="right">Сумма</TH>
          </tr></thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <TD color="#888">{row[0]}</TD>
                <TD>{row[1]}</TD>
                <TD blur>{row[2]}</TD>
                <TD align="right" color={G}>{row[3]}</TD>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ background: '#fff', border: '1px solid #E8E8E8', padding: '10px 12px' }}>
        <div style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#888', marginBottom: 8 }}>Топ категорий</div>
        {cats.map((r, i) => (
          <div key={i} style={{ marginBottom: i < cats.length - 1 ? 8 : 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 4 }}>
              <span style={{ color: '#555' }}>{r.cat}</span>
              <span style={{ color: B, fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{r.val}</span>
            </div>
            <Bar pct={r.pct} color={B} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideDeals() {
  const tagVariants = { review: { bg: '#FEF3C7', fg: '#92620B' }, sent: { bg: '#EEF3FD', fg: '#2545B8' }, won: { bg: '#DCFCE7', fg: '#107D38' } };
  const stages = [
    { label: 'Переговоры', dot: B, deals: [
      { id: '#9',  name: 'Компания А', sum: '3 400 000 ₽', tag: 'КП отправлено', tv: 'sent'   },
      { id: '#10', name: 'Компания Б', sum: '2 100 000 ₽', tag: 'Согласование', tv: 'review'  },
    ]},
    { label: 'Договор', dot: '#EAB308', deals: [
      { id: '#7',  name: 'Компания В', sum: '4 800 000 ₽', tag: 'Юр. проверка', tv: 'review'  },
    ]},
    { label: 'Оплата', dot: G, deals: [
      { id: '#3',  name: 'Компания Г', sum: '163 000 ₽',   tag: 'Закрыта',     tv: 'won'     },
    ]},
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: '#0A0A0A', letterSpacing: '-0.01em' }}>Сделки · 5 в работе</div>
        <span style={{ fontSize: 9, fontWeight: 700, color: G, fontVariantNumeric: 'tabular-nums' }}>16 200 000 ₽</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, flex: 1 }}>
        {stages.map((st, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #E8E8E8', padding: '10px 10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: st.dot, flexShrink: 0 }} />
              <span style={{ fontSize: 9, fontWeight: 600, color: '#333' }}>{st.label}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {st.deals.map((d, j) => {
                const tc = tagVariants[d.tv] || tagVariants.review;
                return (
                  <div key={j} style={{ background: '#F8F9FC', border: '1px solid #E8EEF8', padding: '8px 9px' }}>
                    <div style={{ fontSize: 8, fontWeight: 700, color: B }}>{d.id}</div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: '#0A0A0A', marginTop: 2 }}>{d.name}</div>
                    <div style={{ fontSize: 9, fontWeight: 600, color: G, fontVariantNumeric: 'tabular-nums', marginTop: 2 }}>{d.sum}</div>
                    <span style={{ display: 'inline-block', marginTop: 5, padding: '2px 6px', fontSize: 8, fontWeight: 500, background: tc.bg, color: tc.fg, borderRadius: 2 }}>{d.tag}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        {[{l:'Входящие',v:'4.2М ₽',c:B},{l:'Исходящие',v:'2.9М ₽',c:R},{l:'Маржа',v:'1.3М ₽',c:G}].map((m,i)=>(
          <div key={i} style={{ background: '#fff', border: '1px solid #E8E8E8', padding: '8px 10px' }}>
            <div style={{ fontSize: 8, color: '#AAA', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3 }}>{m.l}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: m.c, fontVariantNumeric: 'tabular-nums' }}>{m.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Simple sparkline chart
function SparkLine({ data, color = B, w = 130, h = 44 }) {
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

// Simple donut pie chart
function PieDonut({ segments, size = 66 }) {
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

function SlidePnL() {
  const projects = [
    { name: 'Проект А', income: '5 200 000', expense: '2 800 000', margin: '2 400 000', pct: '+22%', pos: true,  bar: 72 },
    { name: 'Проект Б', income: '4 100 000', expense: '2 600 000', margin: '1 500 000', pct: '+18%', pos: true,  bar: 58 },
    { name: 'Проект В', income: '1 800 000', expense: '2 700 000', margin: '−900 000',  pct: '−41%', pos: false, bar: 28, loss: true },
    { name: 'Проект Г', income: '3 200 000', expense: '1 900 000', margin: '1 300 000', pct: '+9%',  pos: true,  bar: 45 },
  ];
  const sparkData  = [820, 940, 870, 1150, 1380, 1620]; // тыс. ₽ маржа по месяцам
  const pieSegs = [
    { v: 2400, c: G  },
    { v: 1500, c: B  },
    { v: 900,  c: R  },
    { v: 1300, c: '#6EA8F7' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
      <div style={{ background: '#fff', border: '1px solid #E8E8E8', overflow: 'hidden', flex: 1 }}>
        <div style={{ padding: '8px 12px', borderBottom: '1px solid #F0F0F0', fontSize: 9, fontWeight: 600, color: '#0A0A0A' }}>PnL по проектам · 4 единицы</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontVariantNumeric: 'tabular-nums' }}>
          <thead><tr>
            <TH>Проект</TH><TH align="right">Доход</TH><TH align="right">Расход</TH><TH align="right">Маржа</TH><TH align="right">Δ</TH>
          </tr></thead>
          <tbody>
            {projects.map((p, i) => (
              <tr key={i}>
                <td style={{ padding: '6px 12px', fontSize: 10, fontWeight: p.loss ? 700 : 500, color: p.loss ? R : '#0A0A0A', borderBottom: '1px solid #F4F4F5' }}>{p.name}</td>
                <TD align="right" color={B}>{p.income} ₽</TD>
                <TD align="right" color={R}>{p.expense} ₽</TD>
                <TD align="right" color={p.pos ? G : R}>{p.margin} ₽</TD>
                <TD align="right" color={p.pos ? G : R}>{p.pct}</TD>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8 }}>
        <div style={{ background: '#fff', border: '1px solid #E8E8E8', padding: '8px 12px' }}>
          <div style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.13em', color: '#AAA', marginBottom: 6 }}>Маржа · 6 мес.</div>
          <SparkLine data={sparkData} color={G} w={130} h={40} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ fontSize: 8, color: '#CCC' }}>Янв</span>
            <span style={{ fontSize: 8, color: G, fontWeight: 700 }}>+97%</span>
            <span style={{ fontSize: 8, color: '#CCC' }}>Июн</span>
          </div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #E8E8E8', padding: '8px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
          <div style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.13em', color: '#AAA' }}>Доля</div>
          <PieDonut segments={pieSegs} size={54} />
        </div>
      </div>
    </div>
  );
}

function SlideFunnel() {
  const stages = [
    { label: 'Просмотры', value: 16590, pct: 100,  conv: '—',     delta: '—',      convPos: null  },
    { label: 'В корзину', value: 2041,  pct: 12.3, conv: '12.3%', delta: '−87.7%', convPos: false },
    { label: 'Заказы',    value: 1247,  pct: 7.5,  conv: '61.1%', delta: '−38.9%', convPos: true  },
    { label: 'Выкуп',     value: 1018,  pct: 6.1,  conv: '81.6%', delta: '−18.4%', convPos: true  },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
      <div style={{ background: '#fff', border: '1px solid #E8E8E8', overflow: 'hidden', flex: 1 }}>
        <div style={{ padding: '8px 12px', borderBottom: '1px solid #F0F0F0', fontSize: 9, fontWeight: 600, color: '#0A0A0A' }}>
          Воронка продаж · E-commerce
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontVariantNumeric: 'tabular-nums' }}>
          <thead><tr>
            <TH>Этап</TH>
            <TH align="right">Кол-во</TH>
            <TH align="right">Конв.</TH>
            <TH align="right">Δ этапа</TH>
          </tr></thead>
          <tbody>
            {stages.map((st, i) => (
              <tr key={i}>
                <TD>{st.label}</TD>
                <TD align="right" color="#0A0A0A">{st.value.toLocaleString('ru-RU')}</TD>
                <TD align="right" color={st.convPos === null ? '#AAA' : st.convPos ? G : R}>{st.conv}</TD>
                <TD align="right" color={st.convPos === null ? '#AAA' : R}>{st.delta}</TD>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: '6px 12px 10px' }}>
          {stages.map((st, i) => (
            <div key={i} style={{ marginBottom: i < stages.length - 1 ? 5 : 0 }}>
              <Bar pct={st.pct} color={B} height={4} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        {[{l:'Рост выручки',v:'+35%',c:G},{l:'Конверсия',v:'+8%',c:G},{l:'Выкуп',v:'81.6%',c:G}].map((m,i)=>(
          <div key={i} style={{ background: '#fff', border: '1px solid #E8E8E8', padding: '8px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 8, color: '#AAA', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3 }}>{m.l}</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: m.c, fontVariantNumeric: 'tabular-nums' }}>{m.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideProducts() {
  const products = [
    { name: 'Артикул А-01',  stock: 74,  views: 294, conv: '12.5%', sum: '3 220 ₽', convPos: true  },
    { name: 'Артикул А-03',  stock: 29,  views: 342, conv: '33.3%', sum: '9 450 ₽', convPos: true  },
    { name: 'Артикул Б-01',  stock: 98,  views: 359, conv: '10.3%', sum: '7 770 ₽', convPos: true  },
    { name: 'Артикул Б-02',  stock: 64,  views: 171, conv: '33.3%', sum: '8 960 ₽', convPos: true  },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
      <div style={{ background: '#fff', border: '1px solid #E8E8E8', overflow: 'hidden', flex: 1 }}>
        <div style={{ padding: '8px 12px', borderBottom: '1px solid #F0F0F0', fontSize: 9, fontWeight: 600, color: '#0A0A0A' }}>Детализация по товарам · WB</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontVariantNumeric: 'tabular-nums' }}>
          <thead><tr>
            <TH>Товар</TH><TH align="right">Остаток</TH><TH align="right">Просм.</TH><TH align="right">Конв.</TH><TH align="right">Сумма</TH>
          </tr></thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i}>
                <TD>{p.name}</TD>
                <TD align="right">{p.stock}</TD>
                <TD align="right" color="#888">{p.views}</TD>
                <TD align="right" color={p.conv === '0%' ? R : p.convPos ? G : B}>{p.conv}</TD>
                <TD align="right" color={B}>{p.sum}</TD>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        {[{l:'Общий оборот',v:'5.2М ₽',c:B},{l:'Ср. конверсия',v:'12.1%',c:G},{l:'Топ SKU',v:'4 из 4',c:G}].map((m,i)=>(
          <div key={i} style={{ background: '#fff', border: '1px solid #E8E8E8', padding: '8px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 8, color: '#AAA', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3 }}>{m.l}</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: m.c, fontVariantNumeric: 'tabular-nums' }}>{m.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────

const TABS = ['Дашборд', 'Операции', 'Сделки', 'PnL', 'Воронка', 'Товары'];
const slideComponents = [SlideDashboard, SlideOperations, SlideDeals, SlidePnL, SlideFunnel, SlideProducts];
const clipTab = (active) => active
  ? 'polygon(0 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%)'
  : 'polygon(0 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%)';

export default function HeroDashboard() {
  const [active, setActive]   = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef              = useRef(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setActive(p => (p + 1) % TABS.length); setVisible(true); }, 200);
    }, 6000);
  }, []);

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current); }, [startTimer]);

  const handleTab = (i) => {
    setVisible(false);
    setTimeout(() => { setActive(i); setVisible(true); }, 150);
    startTimer();
  };

  const Slide = slideComponents[active];

  return (
    <div className="av-dashboard-wrap" style={{ background: '#fff', border: '1px solid #E8E8E8', ...{ clipPath: 'polygon(0 0,100% 0,100% calc(100% - 20px),calc(100% - 20px) 100%,0 100%)' } }}>
      {/* Header bar */}
      <div style={{ padding: '10px 14px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#AAA' }}>
          Система в действии
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: G, boxShadow: `0 0 4px ${G}` }} />
          <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.18em', color: G }}>LIVE</span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="av-dashboard-tabs" style={{ display: 'flex', flexWrap: 'wrap', gap: 4, padding: '8px 14px' }}>
        {TABS.map((name, i) => (
          <button
            key={i}
            data-track={`hero_dashboard_tab_${i}`}
            data-track-block="hero_dashboard"
            data-track-text={name}
            onClick={() => handleTab(i)}
            style={{
              fontSize: 9, fontWeight: 500, padding: '5px 10px',
              background: i === active ? B : '#fff',
              color:      i === active ? '#fff' : '#888',
              border:     i === active ? `1px solid ${B}` : '1px solid #E8E8E8',
              cursor: 'pointer',
              transition: 'all 0.15s',
              clipPath: clipTab(i === active),
              fontFamily: 'inherit',
            }}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Slide area */}
      <div className="av-dashboard-stage" style={{
        padding: '0 14px 0',
        height: 300,
        overflow: 'hidden',
        background: '#F8F9FC',
        borderTop: '1px solid #F0F0F0',
        borderBottom: '1px solid #F0F0F0',
      }}>
        <div style={{ height: '100%', padding: '12px 0', opacity: visible ? 1 : 0, transition: 'opacity 0.2s ease' }}>
          <Slide />
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, padding: '10px 0 12px' }}>
        {TABS.map((name, i) => (
          <button
            key={i}
            data-track={`hero_dashboard_dot_${i}`}
            data-track-block="hero_dashboard"
            data-track-text={name}
            onClick={() => handleTab(i)}
            style={{
              height: 5,
              width: i === active ? 16 : 5,
              borderRadius: '50rem',
              background: i === active ? B : '#DDD',
              border: 'none', cursor: 'pointer',
              transition: 'all 0.2s',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
