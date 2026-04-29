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

function Bar({ pct, color = B }) {
  return (
    <div style={{ height: 4, background: t.trackBg }}>
      <div style={{ height: 4, width: `${pct}%`, background: color }} />
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
    { label:'Просмотры', value:16590, pct:100, conv:'—', bottleneck: false },
    { label:'В корзину', value:2041, pct:12.3, conv:'12.3%', bottleneck: true },
    { label:'Заказы', value:1247, pct:7.5, conv:'61.1%', bottleneck: false },
    { label:'Выкуп', value:1018, pct:6.1, conv:'81.6%', bottleneck: false },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: t.titleC, marginBottom: 2 }}>Воронка продаж · API-автоматизация</div>
      <Card style={{ padding: 16 }}>
        {stages.map((st, i) => (
          <div key={i} style={{ marginBottom: i < stages.length-1 ? 12 : 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 9, fontWeight: 600, color: t.bodyC }}>{st.label}</span>
                {st.bottleneck && (
                  <span style={{ fontSize: 7, fontWeight: 700, padding: '1px 5px', background: R, color: '#fff', letterSpacing: '0.1em' }}>УЗЕЛ</span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {st.conv !== '—' && <span style={{ fontSize: 8, fontWeight: 700, color: st.bottleneck ? R : G }}>{st.conv}</span>}
                <span style={{ fontSize: 9, fontWeight: 700, color: t.titleC, fontVariantNumeric: 'tabular-nums' }}>{st.value.toLocaleString('ru')}</span>
              </div>
            </div>
            <div style={{ height: 6, background: t.trackBg }}>
              <div style={{
                height: 6,
                width: `${st.pct}%`,
                background: st.bottleneck ? R : i === stages.length-1 ? G : B,
              }} />
            </div>
          </div>
        ))}
      </Card>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        <Card style={{ padding: 10 }}>
          <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.12em', color: t.mutedC, marginBottom: 3 }}>До автоматизации</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: R }}>2–3 ч/день</div>
          <div style={{ fontSize: 7, color: t.subC, marginTop: 2 }}>ручной сбор данных</div>
        </Card>
        <Card style={{ padding: 10 }}>
          <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.12em', color: t.mutedC, marginBottom: 3 }}>После</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: G }}>0 минут</div>
          <div style={{ fontSize: 7, color: t.subC, marginTop: 2 }}>API подтягивает сам</div>
        </Card>
      </div>
    </div>
  );
}

function SlideProducts() {
  const products = [
    { name:'SKU-1 Бренд 1', stock:74, views:294, conv:'12.5%', sum:'3 220 ₽' },
    { name:'SKU-2 Бренд 1', stock:51, views:119, conv:'0%', sum:'1 610 ₽' },
    { name:'SKU-3 Бренд 1', stock:29, views:342, conv:'33.3%', sum:'9 450 ₽' },
    { name:'SKU-1 Бренд 2', stock:98, views:359, conv:'10.3%', sum:'7 770 ₽' },
    { name:'SKU-2 Бренд 2', stock:64, views:171, conv:'33.3%', sum:'8 960 ₽' },
  ];
  const convColor = (c) => parseFloat(c) > 10 ? G : parseFloat(c) === 0 ? R : B;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: t.titleC, marginBottom: 2 }}>Детализация по товарам · 6 апр</div>
      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', padding: '6px 10px', borderBottom: `1px solid ${t.divBorder}`, gap: 4 }}>
          {['Товар','Ост.','Просм.','Конв%','Сумма'].map(h => <TH key={h}>{h}</TH>)}
        </div>
        {products.map((p,i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', padding: '6px 10px', borderBottom: i < products.length-1 ? `1px solid ${t.divBorder}` : 'none', gap: 4, alignItems: 'center' }}>
            <div style={{ fontSize: 7, color: t.bodyC, lineHeight: 1.3 }}>{p.name}</div>
            <div style={{ fontSize: 8, color: t.titleC, fontVariantNumeric: 'tabular-nums' }}>{p.stock}</div>
            <div style={{ fontSize: 8, color: t.subC, fontVariantNumeric: 'tabular-nums' }}>{p.views}</div>
            <div style={{ fontSize: 8, fontWeight: 600, color: convColor(p.conv) }}>{p.conv}</div>
            <div style={{ fontSize: 8, fontWeight: 600, color: B, fontVariantNumeric: 'tabular-nums' }}>{p.sum}</div>
          </div>
        ))}
      </Card>
      <div style={{ background: '#0A0A0A', padding: '10px 14px', ...ch(6) }}>
        <div style={{ fontSize: 7, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#555', marginBottom: 3 }}>ВЫВОД AIVISION</div>
        <div style={{ fontSize: 11, color: '#fff', lineHeight: 1.5 }}>SKU-3 Бренд 1 — конверсия 33.3% при минимальном остатке 29 шт. Приоритет пополнения.</div>
      </div>
    </div>
  );
}

const slideComponents = [SlideOverview, SlideBrands, SlideFunnel, SlideProducts];

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
    <div style={{ background: '#fff', border: '1px solid #E8E8E8', padding: 24, ...ch(20) }}>
      <div style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#999', marginBottom: 10 }}>
        Система в действии
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
        {SLIDES.map((name, i) => (
          <button
            key={i}
            onClick={() => handleTab(i)}
            style={{
              fontSize: 9, fontWeight: 500, padding: '4px 10px', cursor: 'pointer', border: 'none',
              background: i === active ? B : '#fff',
              color: i === active ? '#fff' : '#888',
              outline: i !== active ? '1px solid #E8E8E8' : 'none',
              transition: 'all 0.15s',
              ...ch(8),
            }}
          >
            {name}
          </button>
        ))}
      </div>

      <div style={{ padding: 14, height: 320, overflow: 'hidden', background: '#F8F9FC', border: '1px solid #E8E8E8' }}>
        <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.2s ease' }}>
          <Slide />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => handleTab(i)}
            style={{
              height: 6, width: i === active ? 16 : 6, borderRadius: 999,
              background: i === active ? B : '#DDD',
              border: 'none', cursor: 'pointer', transition: 'all 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  );
}
