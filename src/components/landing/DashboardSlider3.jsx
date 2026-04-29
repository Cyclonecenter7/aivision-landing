import { useState, useEffect, useRef, useCallback } from 'react';

const SLIDES = ['Обзор', 'Бренды', 'Воронка', 'Товары'];
const ch = (px) => ({ clipPath: `polygon(0 0,100% 0,100% calc(100% - ${px}px),calc(100% - ${px}px) 100%,0 100%)` });
const G = '#16A34A'; const R = '#E5484D'; const B = '#3F6EE8';

const t = {
  cardBg: '#fff', cardBorder: '#E8E8E8',
  titleC: '#0A0A0A', bodyC: '#444', subC: '#888', mutedC: '#AAA',
  trackBg: '#E8E8E8', divBorder: '#F0F0F0',
};

function Card({ children, style = {} }) {
  return <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, ...style }}>{children}</div>;
}

function TH({ children }) {
  return <div style={{ fontSize: 7, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: t.mutedC }}>{children}</div>;
}

function THCell({ children, align = 'left' }) {
  return (
    <th style={{ textAlign: align, padding: '8px 12px', fontSize: 8, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', borderBottom: '1px solid #F0F0F0', whiteSpace: 'nowrap' }}>
      {children}
    </th>
  );
}

function TD({ children, align = 'left', color }) {
  return (
    <td style={{ textAlign: align, padding: '7px 12px', fontSize: 10, fontWeight: 500, color: color || '#333', borderBottom: '1px solid #F4F4F5', fontVariantNumeric: 'tabular-nums' }}>
      {children}
    </td>
  );
}

function Bar({ pct, color = B }) {
  return (
    <div style={{ height: 4, background: t.trackBg }}>
      <div style={{ height: 4, width: `${pct}%`, background: color }} />
    </div>
  );
}

function BarFull({ pct, color = B, height = 4 }) {
  return (
    <div style={{ background: '#F0F3FA', height, width: '100%' }}>
      <div style={{ height, width: `${Math.min(pct, 100)}%`, background: color }} />
    </div>
  );
}

function SlideOverview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: t.titleC }}>WB Аналитика</div>
        <div style={{ fontSize: 8, color: t.subC }}>5–7 апр 2024</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
        <div style={{ background: B, padding: 10, gridColumn: '1', gridRow: '1 / 3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 7, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)' }}>Прибыль</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>2.4М ₽</div>
        </div>
        {[
          { label:'Заказы', val:'1 247', c: t.titleC },
          { label:'Конверсия', val:'12.3%', c: B },
          { label:'Маржа', val:'46.2%', c: G },
          { label:'Выручка', val:'5.2М ₽', c: G },
          { label:'Продано', val:'82 шт', c: t.titleC },
          { label:'Просмотры', val:'16 590', c: t.titleC },
        ].map((m,i) => (
          <Card key={i} style={{ padding: '8px 10px' }}>
            <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.12em', color: t.mutedC, marginBottom: 3 }}>{m.label}</div>
            <div style={{ fontSize: i < 3 ? 16 : 12, fontWeight: 800, color: m.c, fontVariantNumeric: 'tabular-nums' }}>{m.val}</div>
          </Card>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        {[
          { name:'Бренд 1', orders:450, rev:'850К', conv:'11%' },
          { name:'Бренд 2', orders:380, rev:'720К', conv:'13%' },
          { name:'Бренд 3', orders:417, rev:'830К', conv:'12%' },
        ].map((b,i) => (
          <Card key={i} style={{ padding: '8px 10px' }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: t.titleC, marginBottom: 5 }}>{b.name}</div>
            <div style={{ fontSize: 7, color: t.subC }}>Заказы: <span style={{ color: t.bodyC, fontVariantNumeric: 'tabular-nums' }}>{b.orders}</span></div>
            <div style={{ fontSize: 7, color: t.subC }}>Выручка: <span style={{ color: B, fontVariantNumeric: 'tabular-nums' }}>{b.rev}</span></div>
            <div style={{ fontSize: 7, color: t.subC }}>Конв.: <span style={{ color: G }}>{b.conv}</span></div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SlideBrands() {
  const brands = [
    { name:'Бренд 1', active:'31/61', orders:450, rev:'850К ₽', conv:'11%', growth:'+8%', bar:62 },
    { name:'Бренд 2', active:'7/19', orders:380, rev:'720К ₽', conv:'13%', growth:'+15%', bar:48 },
    { name:'Бренд 3', active:'6/37', orders:417, rev:'830К ₽', conv:'12%', growth:'+11%', bar:55 },
    { name:'Бренд 4', active:'0/3', orders:0, rev:'—', conv:'—', growth:'—', bar:0 },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: t.titleC, marginBottom: 2 }}>Аналитика по брендам</div>
      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', padding: '6px 10px', borderBottom: `1px solid ${t.divBorder}`, gap: 4 }}>
          {['Бренд','Активных','Заказы','Выручка','Конв.','Рост'].map(h => <TH key={h}>{h}</TH>)}
        </div>
        {brands.map((b,i) => (
          <div key={i} style={{ borderBottom: i < brands.length-1 ? `1px solid ${t.divBorder}` : 'none' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', padding: '6px 10px', gap: 4 }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: t.titleC }}>{b.name}</div>
              <div style={{ fontSize: 8, color: t.subC }}>{b.active}</div>
              <div style={{ fontSize: 8, fontWeight: 600, color: t.titleC, fontVariantNumeric: 'tabular-nums' }}>{b.orders}</div>
              <div style={{ fontSize: 8, color: B, fontVariantNumeric: 'tabular-nums' }}>{b.rev}</div>
              <div style={{ fontSize: 8, color: G }}>{b.conv}</div>
              <div style={{ fontSize: 8, fontWeight: 600, color: b.growth === '—' ? t.mutedC : G }}>{b.growth}</div>
            </div>
            {b.bar > 0 && (
              <div style={{ padding: '0 10px 8px' }}>
                <Bar pct={b.bar} color={B} />
              </div>
            )}
          </div>
        ))}
      </Card>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        {[
          { l:'Общий оборот', v:'5.2М ₽', c: B },
          { l:'Ср. конверсия', v:'12.1%', c: G },
          { l:'API-интеграций', v:'4', c: t.titleC },
        ].map((m,i) => (
          <Card key={i} style={{ padding: '8px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 7, color: t.mutedC, marginBottom: 3 }}>{m.l}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: m.c, fontVariantNumeric: 'tabular-nums' }}>{m.v}</div>
          </Card>
        ))}
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
            <THCell>Этап</THCell>
            <THCell align="right">Кол-во</THCell>
            <THCell align="right">Конв.</THCell>
            <THCell align="right">Δ этапа</THCell>
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
              <BarFull pct={st.pct} color={B} height={4} />
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
            <THCell>Товар</THCell><THCell align="right">Остаток</THCell><THCell align="right">Просм.</THCell><THCell align="right">Конв.</THCell><THCell align="right">Сумма</THCell>
          </tr></thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i}>
                <TD>{p.name}</TD>
                <TD align="right">{p.stock}</TD>
                <TD align="right" color="#888">{p.views}</TD>
                <TD align="right" color={p.convPos ? G : B}>{p.conv}</TD>
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

const slideComponents = [SlideOverview, SlideBrands, SlideFunnel, SlideProducts];
const clipTab = 'polygon(0 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%)';

export default function DashboardSlider3() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setActive(p => (p + 1) % SLIDES.length); setVisible(true); }, 200);
    }, 8000);
  }, []);

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current); }, [startTimer]);

  const handleTab = (i) => {
    setVisible(false);
    setTimeout(() => { setActive(i); setVisible(true); }, 150);
    startTimer();
  };

  const Slide = slideComponents[active];

  return (
    <div className="av-dashboard-wrap" style={{ background: '#fff', border: '1px solid #E8E8E8', ...ch(20) }}>
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
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, padding: '8px 14px' }}>
        {SLIDES.map((name, i) => (
          <button
            key={i}
            onClick={() => handleTab(i)}
            style={{
              fontSize: 9, fontWeight: 500, padding: '5px 10px',
              background: i === active ? B : '#fff',
              color:      i === active ? '#fff' : '#888',
              border:     i === active ? `1px solid ${B}` : '1px solid #E8E8E8',
              cursor: 'pointer',
              transition: 'all 0.15s',
              clipPath: clipTab,
              fontFamily: 'inherit',
            }}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Slide area */}
      <div style={{
        padding: '0 14px 0',
        height: 320,
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
        {SLIDES.map((_, i) => (
          <button
            key={i}
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
