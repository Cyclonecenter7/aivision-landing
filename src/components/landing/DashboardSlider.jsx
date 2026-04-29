import { useState, useEffect, useRef, useCallback } from 'react';

const SLIDES = ['Дашборд', 'Операции', 'Визиты', 'Аналитика', 'Категории'];
const ch = (px) => ({ clipPath: `polygon(0 0,100% 0,100% calc(100% - ${px}px),calc(100% - ${px}px) 100%,0 100%)` });
const G = '#16A34A'; const R = '#E5484D'; const B = '#3F6EE8';

const darkTokens = {
  bg: '#0d0d0d', cardBg: '#111', cardBorder: '#1e1e1e',
  titleC: '#fff', bodyC: '#888', subC: '#555', mutedC: '#444',
  trackBg: '#1e1e1e', divBorder: '#1e1e1e',
  tabOffBg: '#141414', tabOffC: '#555', tabOffBorder: '#1e1e1e',
  wrapBg: 'transparent', wrapBorder: 'none',
};
const lightTokens = {
  bg: '#F8F9FC', cardBg: '#fff', cardBorder: '#E8E8E8',
  titleC: '#0A0A0A', bodyC: '#444', subC: '#888', mutedC: '#AAA',
  trackBg: '#E8E8E8', divBorder: '#F0F0F0',
  tabOffBg: '#fff', tabOffC: '#888', tabOffBorder: '#E8E8E8',
  wrapBg: '#fff', wrapBorder: '1px solid #E8E8E8',
};

function Card({ t, children, style = {} }) {
  return (
    <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, ...style }}>
      {children}
    </div>
  );
}

function TH({ children, t }) {
  return <div style={{ fontSize: 7, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: t.mutedC }}>{children}</div>;
}

function Bar({ pct, color = B, t }) {
  return (
    <div style={{ height: 4, background: t.trackBg }}>
      <div style={{ height: 4, width: `${pct}%`, background: color }} />
    </div>
  );
}

function Ticker({ t }) {
  const items = ['МАРЖА +93%', 'ОБОРОТ +9%', 'РАСХОДЫ −32%', 'МАРЖА ЗА МЕСЯЦ 376 185 ₽', 'ОБОРОТ ЗА МЕСЯЦ 649 351 ₽'];
  return (
    <div style={{ background: '#0A0A0A', padding: '4px 0', overflow: 'hidden', marginBottom: 10 }}>
      <div style={{ display: 'flex', gap: 32, animation: 'tickerMove 18s linear infinite', whiteSpace: 'nowrap' }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ fontSize: 8, fontWeight: 600, letterSpacing: '0.12em', color: item.includes('−') ? R : item.includes('+') ? G : '#fff', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', display: 'inline-block', flexShrink: 0 }} />
            {item}
          </span>
        ))}
      </div>
      <style>{`@keyframes tickerMove { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}

function Callout({ children }) {
  return (
    <div style={{ background: '#0A0A0A', padding: '10px 14px', marginTop: 10, ...ch(6) }}>
      <div style={{ fontSize: 7, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#555', marginBottom: 3 }}>ВЫВОД AIVISION</div>
      <div style={{ fontSize: 11, color: '#fff', lineHeight: 1.5 }}>{children}</div>
    </div>
  );
}

function Slide1({ t }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Ticker t={t} />
      <div style={{ fontSize: 10, fontWeight: 700, color: t.titleC, marginBottom: 2 }}>Дашборд продаж · Апрель 2026</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        {[
          { label: 'МАРЖА', today: '27 985 ₽', month: '376 185 ₽', delta: '+93%', c: G },
          { label: 'ОБОРОТ', today: '29 000 ₽', month: '649 351 ₽', delta: '+9%', c: B },
          { label: 'РАСХОДЫ', today: '1 015 ₽', month: '273 166 ₽', delta: '−32%', c: R },
        ].map((m, i) => (
          <Card key={i} t={t} style={{ padding: '10px 10px' }}>
            <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.14em', color: t.mutedC, marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: m.c, fontVariantNumeric: 'tabular-nums' }}>{m.today}</div>
            <div style={{ fontSize: 7, color: t.mutedC, marginTop: 6 }}>За месяц</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: m.c, fontVariantNumeric: 'tabular-nums' }}>{m.month}</div>
            <div style={{ fontSize: 8, fontWeight: 600, color: m.c, marginTop: 2 }}>{m.delta} vs прошлый</div>
          </Card>
        ))}
      </div>
      <Card t={t} style={{ padding: 10 }}>
        <div style={{ fontSize: 7, color: t.mutedC, marginBottom: 6 }}>Статистика по дням · Апрель</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2, marginBottom: 4 }}>
          {['Дата','Маржа','Оборот','Расходы','Нов.','Повт.','Визиты'].map(h => <TH key={h} t={t}>{h}</TH>)}
        </div>
        {[['01.04','12 400','18 000','5 600','2','1','3'],['02.04','9 200','14 500','5 300','1','2','3'],['03.04','15 800','22 000','6 200','3','1','4']].map((row, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2, paddingTop: 6, borderTop: `1px solid ${t.divBorder}` }}>
            {row.map((cell, j) => (
              <div key={j} style={{ fontSize: 7, color: j===1 ? G : j===3 ? R : t.subC, fontVariantNumeric: 'tabular-nums' }}>{cell}</div>
            ))}
          </div>
        ))}
      </Card>
    </div>
  );
}

function Slide2({ t }) {
  const rows = [
    { date:'12.04, 17:00', service:'Оказание услуг', client:'Клиент 1', sum:'+ 4 000 ₽' },
    { date:'12.04, 14:00', service:'Мероприятие', client:'Клиент 2', sum:'+ 25 000 ₽' },
    { date:'11.04, 12:00', service:'Оказание услуг', client:'Клиент 3', sum:'+ 8 500 ₽' },
    { date:'10.04, 18:00', service:'Сертификат', client:'Клиент 4', sum:'+ 4 000 ₽' },
  ];
  const cats = [
    { cat:'Оказание услуг', val:'352 021 ₽', pct:54 },
    { cat:'Мероприятия', val:'288 000 ₽', pct:44 },
    { cat:'Сертификаты', val:'5 330 ₽', pct:1 },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: t.titleC, marginBottom: 2 }}>Доходные операции</div>
      <Card t={t}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', padding: '6px 10px', borderBottom: `1px solid ${t.divBorder}`, gap: 4 }}>
          {['Дата','Услуга/Товар','Клиент','Сумма'].map(h => <TH key={h} t={t}>{h}</TH>)}
        </div>
        {rows.map((row, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', padding: '6px 10px', borderBottom: i < rows.length-1 ? `1px solid ${t.divBorder}` : 'none', gap: 4 }}>
            <div style={{ fontSize: 8, color: t.subC }}>{row.date}</div>
            <div style={{ fontSize: 8, color: t.bodyC }}>{row.service}</div>
            <div style={{ fontSize: 8, color: t.subC, filter: 'blur(3px)', userSelect: 'none' }}>{row.client}</div>
            <div style={{ fontSize: 8, fontWeight: 600, color: G, fontVariantNumeric: 'tabular-nums' }}>{row.sum}</div>
          </div>
        ))}
      </Card>
      <Card t={t} style={{ padding: 10 }}>
        <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.14em', color: t.mutedC, marginBottom: 8 }}>Топ категорий по доходу</div>
        {cats.map((r, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8, marginBottom: 3 }}>
              <span style={{ color: t.bodyC }}>{r.cat}</span>
              <span style={{ color: B, fontVariantNumeric: 'tabular-nums' }}>{r.val}</span>
            </div>
            <Bar pct={r.pct} color={B} t={t} />
          </div>
        ))}
      </Card>
    </div>
  );
}

function Slide3({ t }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: t.titleC, marginBottom: 2 }}>Визиты · Апрель, 12</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
        {[
          { label:'Всего', value:'2', c: t.titleC },
          { label:'Пришли', value:'2', c: G },
          { label:'Конверсия', value:'100%', c: B },
          { label:'Ср. чек', value:'14 500 ₽', c: B },
        ].map((m, i) => (
          <Card key={i} t={t} style={{ padding: '8px 6px', textAlign: 'center' }}>
            <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.12em', color: t.mutedC, marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: m.c, fontVariantNumeric: 'tabular-nums' }}>{m.value}</div>
          </Card>
        ))}
      </div>
      <Card t={t}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', padding: '6px 10px', borderBottom: `1px solid ${t.divBorder}`, gap: 4 }}>
          {['Клиент','Мастер','Услуга','Статус'].map(h => <TH key={h} t={t}>{h}</TH>)}
        </div>
        {[['Клиент 1','Мастер 1','Услуга Б','✓'],['Клиент 2','Мастер 1','Услуга А','✓']].map((row, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', padding: '6px 10px', borderBottom: i===0 ? `1px solid ${t.divBorder}` : 'none', gap: 4 }}>
            <div style={{ fontSize: 8, color: t.subC, filter: 'blur(3px)', userSelect: 'none' }}>{row[0]}</div>
            <div style={{ fontSize: 8, color: t.bodyC, filter: 'blur(3px)', userSelect: 'none' }}>{row[1]}</div>
            <div style={{ fontSize: 8, color: t.bodyC }}>{row[2]}</div>
            <div style={{ fontSize: 8, color: G }}>{row[3]}</div>
          </div>
        ))}
      </Card>
      <Card t={t} style={{ padding: 10 }}>
        <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.14em', color: t.mutedC, marginBottom: 6 }}>Статистика по мастерам</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 8, color: t.bodyC, filter: 'blur(3px)', userSelect: 'none' }}>Мастер 1</span>
          <div style={{ display: 'flex', gap: 16 }}>
            <span style={{ fontSize: 8, color: t.subC }}>Визиты: <span style={{ color: t.titleC, fontWeight: 700 }}>2</span></span>
            <span style={{ fontSize: 8, color: t.subC }}>Конверсия: <span style={{ color: G, fontWeight: 700 }}>100%</span></span>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Slide4({ t }) {
  const points = [0,15,-8,30,45,20,80,55,90,65,-20,40,75,85,60,45,70,55,78,82,65,70,72,68,55,60,65,58,62,64];
  const max = Math.max(...points.map(Math.abs));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: t.titleC, marginBottom: 2 }}>Аналитика · Апрель 2026 vs Март 2026</div>
      <Card t={t} style={{ padding: 10 }}>
        <div style={{ fontSize: 7, color: t.mutedC, marginBottom: 8 }}>Апрель 2026 — Динамика маржи</div>
        <div style={{ position: 'relative', height: 72 }}>
          <svg viewBox="0 0 300 72" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <line x1="0" y1="36" x2="300" y2="36" stroke={t.trackBg} strokeWidth="1" />
            <polyline
              points={points.map((v,i)=>`${(i/(points.length-1))*300},${36-(v/max)*30}`).join(' ')}
              fill="none" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            />
            <polyline
              points={points.map((v,i)=>`${(i/(points.length-1))*300},${36-(v/max)*18}`).join(' ')}
              fill="none" stroke={G} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3"
            />
          </svg>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 7, color: t.mutedC, marginTop: 4 }}>
          {[1,5,10,15,20,25,30].map(n=><span key={n}>{n}</span>)}
        </div>
      </Card>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        {[
          { label:'Маржа', val:'376 185 ₽', c: G },
          { label:'Доходы', val:'649 351 ₽', c: B },
          { label:'Расходы', val:'273 166 ₽', c: R },
        ].map((m,i) => (
          <Card key={i} t={t} style={{ padding: '8px 10px' }}>
            <div style={{ fontSize: 7, color: t.mutedC, marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: m.c, fontVariantNumeric: 'tabular-nums' }}>{m.val}</div>
          </Card>
        ))}
      </div>
      <Callout>Расходы сократились на −32% при росте оборота +9%. Маржа удвоена за 2 месяца.</Callout>
    </div>
  );
}

function Slide5({ t }) {
  const income = [
    { cat:'Оказание услуг', val:'352 021', pct:54 },
    { cat:'Мероприятия', val:'288 000', pct:44 },
    { cat:'Продажа товаров', val:'5 330', pct:1 },
    { cat:'Сертификаты', val:'4 000', pct:1 },
  ];
  const expense = [
    { cat:'Аренда', val:'183 756', pct:67 },
    { cat:'Зарплата', val:'43 200', pct:16 },
    { cat:'Пригл. эксперт', val:'20 000', pct:7 },
    { cat:'Закупка', val:'6 284', pct:2 },
    { cat:'Комиссия', val:'4 341', pct:2 },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: t.titleC, marginBottom: 2 }}>Доходы и расходы по категориям</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        <Card t={t} style={{ padding: 10 }}>
          <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.14em', color: t.mutedC, marginBottom: 4 }}>Доходы</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: B, fontVariantNumeric: 'tabular-nums', marginBottom: 8 }}>649 351 ₽</div>
          {income.map((r,i) => (
            <div key={i} style={{ marginBottom: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 7, marginBottom: 2 }}>
                <span style={{ color: t.subC }}>{r.cat}</span>
                <span style={{ color: B }}>{r.pct}%</span>
              </div>
              <Bar pct={r.pct} color={B} t={t} />
            </div>
          ))}
        </Card>
        <Card t={t} style={{ padding: 10 }}>
          <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.14em', color: R, marginBottom: 4 }}>Расходы</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: R, fontVariantNumeric: 'tabular-nums', marginBottom: 8 }}>273 166 ₽</div>
          {expense.map((r,i) => (
            <div key={i} style={{ marginBottom: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 7, marginBottom: 2 }}>
                <span style={{ color: t.subC }}>{r.cat}</span>
                <span style={{ color: R }}>{r.pct}%</span>
              </div>
              <Bar pct={r.pct} color={R} t={t} />
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

const slideComponents = [Slide1, Slide2, Slide3, Slide4, Slide5];

export default function DashboardSlider({ light = false }) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const t = light ? lightTokens : darkTokens;
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
    <div style={{ background: t.wrapBg, border: t.wrapBorder, padding: 24, ...ch(20) }}>
      <div style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: t.mutedC, marginBottom: 10 }}>
        Система в действии
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
        {SLIDES.map((name, i) => (
          <button
            key={i}
            onClick={() => handleTab(i)}
            style={{
              fontSize: 9, fontWeight: 500, padding: '4px 10px', cursor: 'pointer', border: 'none',
              background: i === active ? B : t.tabOffBg,
              color: i === active ? '#fff' : t.tabOffC,
              outline: i !== active ? `1px solid ${t.tabOffBorder}` : 'none',
              transition: 'all 0.15s',
              ...ch(8),
            }}
          >
            {name}
          </button>
        ))}
      </div>

      <div style={{ padding: 14, height: 320, overflow: 'hidden', background: t.bg, border: `1px solid ${t.cardBorder}` }}>
        <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.2s ease' }}>
          <Slide t={t} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => handleTab(i)}
            style={{
              height: 6, width: i === active ? 16 : 6, borderRadius: 999,
              background: i === active ? B : t.trackBg,
              border: 'none', cursor: 'pointer', transition: 'all 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  );
}
