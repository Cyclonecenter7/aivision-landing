import { useState, useEffect, useRef, useCallback } from 'react';

const SLIDES = ['Сделки', 'Финансы', 'Аналитика', 'Платёж', 'PnL'];
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

function Callout({ tag, children }) {
  return (
    <div style={{ background: '#0A0A0A', padding: '10px 14px', marginTop: 10, ...ch(6) }}>
      <div style={{ fontSize: 7, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#555', marginBottom: 3 }}>{tag || 'ВЫВОД AIVISION'}</div>
      <div style={{ fontSize: 11, color: '#fff', lineHeight: 1.5 }}>{children}</div>
    </div>
  );
}

function SlideDeals() {
  const [offset, setOffset] = useState(0);
  const stages = [
    { label: 'Новая', color: B, deals: [
      { id: '#12', name: 'Компания 5', sum: '1 200 000 ₽', tag: 'Входящий запрос', tagC: B },
      { id: '#11', name: 'Компания 6', sum: '840 000 ₽', tag: 'Квалификация', tagC: B },
    ]},
    { label: 'Переговоры', color: '#7B5AE8', deals: [
      { id: '#9', name: 'Компания 3', sum: '3 400 000 ₽', tag: 'КП отправлено', tagC: B },
      { id: '#10', name: 'Компания 4', sum: '2 100 000 ₽', tag: 'Согласование', tagC: '#EAB308' },
    ]},
    { label: 'Договор', color: '#EAB308', deals: [
      { id: '#7', name: 'Компания 2', sum: '4 800 000 ₽', tag: 'Юр. проверка', tagC: '#EAB308' },
    ]},
    { label: 'Оплата', color: G, deals: [
      { id: '#3', name: 'Компания 2', sum: '163 000 ₽', tag: 'Фиксация объёма', tagC: '#EAB308' },
    ]},
    { label: 'Завершена', color: '#888', deals: [
      { id: '#4', name: 'Компания 1', sum: '34 000 ₽', tag: '47.1% маржа', tagC: G },
      { id: '#5', name: 'Компания 3', sum: '2 800 000 ₽', tag: 'Закрыта', tagC: '#888' },
    ]},
  ];
  const visible = stages.slice(offset, offset + 3);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: t.titleC }}>Сделки · {stages.reduce((a,s)=>a+s.deals.length,0)} в работе</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 8, fontWeight: 600, color: G }}>Оборот: 16 200 000 ₽</span>
          <div style={{ display: 'flex', gap: 3 }}>
            {[['←', offset===0, ()=>setOffset(o=>Math.max(0,o-1))], ['→', offset>=stages.length-3, ()=>setOffset(o=>Math.min(stages.length-3,o+1))]].map(([label,disabled,fn],i) => (
              <button key={i} onClick={fn} style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, border: `1px solid ${disabled ? t.cardBorder : B}`, background: 'transparent', color: disabled ? '#CCC' : B, cursor: disabled ? 'default' : 'pointer', ...ch(4) }}>{label}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 3, marginBottom: 4 }}>
        {stages.map((_, i) => (
          <div key={i} style={{ height: 3, flex: 1, background: i >= offset && i < offset + 3 ? B : t.trackBg }} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        {visible.map((st, i) => (
          <Card key={i} style={{ padding: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: st.color, flexShrink: 0 }} />
              <span style={{ fontSize: 8, fontWeight: 600, color: t.bodyC }}>{st.label}</span>
              <span style={{ marginLeft: 'auto', fontSize: 7, fontWeight: 700, color: B }}>{st.deals.length}</span>
            </div>
            {st.deals.slice(0, 2).map((deal, j) => (
              <div key={j} style={{ background: '#F8F9FC', border: '1px solid #E8EEF8', padding: 6, marginBottom: 4 }}>
                <div style={{ fontSize: 7, fontWeight: 600, color: B }}>{deal.id}</div>
                <div style={{ fontSize: 8, fontWeight: 700, color: t.titleC, filter: 'blur(3px)', userSelect: 'none' }}>{deal.name}</div>
                <div style={{ fontSize: 8, fontWeight: 600, color: G, fontVariantNumeric: 'tabular-nums', marginTop: 2 }}>{deal.sum}</div>
                <div style={{ display: 'inline-block', marginTop: 4, padding: '2px 6px', fontSize: 7, fontWeight: 500, background: `${deal.tagC}18`, color: deal.tagC }}>{deal.tag}</div>
              </div>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
}

function SlideFinance() {
  const rows = [
    ['31.03','Входящий','Компания 1','Сделка #7','+2 400 000 ₽', G],
    ['31.03','Исходящий','Контрагент 1','Сделка #7','−1 450 000 ₽', R],
    ['30.03','Входящий','Компания 3','Сделка #9','+1 000 000 ₽', G],
    ['30.03','Исходящий','Контрагент 2','Сделка #9','−380 000 ₽', R],
    ['29.03','Входящий','Компания 2','Сделка #3','+163 000 ₽', G],
    ['29.03','Исходящий','Контрагент 3','Сделка #3','−980 000 ₽', R],
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: t.titleC, marginBottom: 2 }}>Финансы · ДДС</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        {[
          { label:'ВХОДЯЩИЕ', value:'9 200 000 ₽', c: G },
          { label:'ИСХОДЯЩИЕ', value:'6 800 000 ₽', c: R },
          { label:'БАЛАНС', value:'+2 400 000 ₽', c: G },
        ].map((m,i) => (
          <Card key={i} style={{ padding: '8px 10px' }}>
            <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.14em', color: t.mutedC, marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 11, fontWeight: 800, color: m.c, fontVariantNumeric: 'tabular-nums' }}>{m.value}</div>
          </Card>
        ))}
      </div>
      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', padding: '6px 10px', borderBottom: `1px solid ${t.divBorder}`, gap: 4 }}>
          {['Дата','Тип','Контрагент','Сделка','Сумма'].map(h => <TH key={h}>{h}</TH>)}
        </div>
        {rows.map((row, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', padding: '6px 10px', borderBottom: i < rows.length-1 ? `1px solid ${t.divBorder}` : 'none', gap: 4 }}>
            <div style={{ fontSize: 7, color: t.subC }}>{row[0]}</div>
            <div style={{ fontSize: 7, color: row[1]==='Входящий' ? G : R }}>{row[1]}</div>
            <div style={{ fontSize: 7, color: t.bodyC }}>{row[2]}</div>
            <div style={{ fontSize: 7, color: t.subC }}>{row[3]}</div>
            <div style={{ fontSize: 7, fontWeight: 600, color: row[5], fontVariantNumeric: 'tabular-nums' }}>{row[4]}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function SlideAnalytics() {
  const managers = [
    { name:'Менеджер 1', oborot:'312 000 ₽', marzha:'56 000 ₽', active:1, closed:3 },
    { name:'Менеджер 2', oborot:'0 ₽', marzha:'0 ₽', active:0, closed:0 },
    { name:'Менеджер 3', oborot:'0 ₽', marzha:'0 ₽', active:0, closed:0 },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: t.titleC, marginBottom: 2 }}>Аналитика · Последние 30 дней</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
        {[
          { label:'ОБОРОТ', fact:'16 200 000 ₽', pot:'7 400 000 ₽', c: B },
          { label:'ВЫРУЧКА', fact:'9 200 000 ₽', pot:'4 100 000 ₽', c: G },
          { label:'МАРЖА', fact:'2 400 000 ₽', pot:'1 800 000 ₽', c: G },
          { label:'РАСХОДЫ', fact:'6 800 000 ₽', pot:'2 600 000 ₽', c: R },
        ].map((m,i) => (
          <Card key={i} style={{ padding: '8px 8px' }}>
            <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.12em', color: t.mutedC, marginBottom: 3 }}>{m.label}</div>
            <div style={{ fontSize: 9, fontWeight: 800, color: m.c, fontVariantNumeric: 'tabular-nums' }}>{m.fact}</div>
            <div style={{ fontSize: 7, color: t.mutedC, marginTop: 4 }}>Потенциал</div>
            <div style={{ fontSize: 8, color: t.subC, fontVariantNumeric: 'tabular-nums' }}>{m.pot}</div>
          </Card>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        <Card style={{ padding: 10 }}>
          <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.12em', color: t.mutedC, marginBottom: 3 }}>Долги нам</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: B, fontVariantNumeric: 'tabular-nums' }}>4 200 000 ₽</div>
          <div style={{ fontSize: 7, color: t.mutedC, marginTop: 2 }}>Входящие платежи</div>
        </Card>
        <Card style={{ padding: 10 }}>
          <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.12em', color: t.mutedC, marginBottom: 3 }}>Долги от нас</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: R, fontVariantNumeric: 'tabular-nums' }}>2 900 000 ₽</div>
          <div style={{ fontSize: 7, color: t.mutedC, marginTop: 2 }}>Исходящие платежи</div>
        </Card>
      </div>
      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', padding: '6px 10px', borderBottom: `1px solid ${t.divBorder}`, gap: 4 }}>
          {['Менеджер','Факт оборот','Факт маржа','Активные','Закрытые'].map(h => <TH key={h}>{h}</TH>)}
        </div>
        {managers.map((m,i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', padding: '6px 10px', borderBottom: i < managers.length-1 ? `1px solid ${t.divBorder}` : 'none', gap: 4 }}>
            <div style={{ fontSize: 8, color: t.bodyC }}>{m.name}</div>
            <div style={{ fontSize: 8, fontWeight: 600, color: B, fontVariantNumeric: 'tabular-nums' }}>{m.oborot}</div>
            <div style={{ fontSize: 8, fontWeight: 600, color: G, fontVariantNumeric: 'tabular-nums' }}>{m.marzha}</div>
            <div style={{ fontSize: 8, color: t.subC }}>{m.active}</div>
            <div style={{ fontSize: 8, color: t.subC }}>{m.closed}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function SlidePayment() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: t.titleC, marginBottom: 2 }}>Финансы · Добавить платёж</div>
      <Card style={{ padding: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
          {[
            { label:'Тип', val:'Приход', focus: false },
            { label:'Категория', val:'Выберите...', focus: false, placeholder: true },
            { label:'Сумма ₽', val:'1 200 000', focus: true },
            { label:'Дата', val:'31.03.2026', focus: false },
          ].map((f,i) => (
            <div key={i}>
              <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.12em', color: t.mutedC, marginBottom: 3 }}>{f.label}</div>
              <div style={{ background: '#F8F9FC', border: `1px solid ${f.focus ? B : t.cardBorder}`, padding: '6px 10px', fontSize: 9, color: f.placeholder ? t.subC : t.titleC, fontVariantNumeric: 'tabular-nums' }}>{f.val}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.12em', color: t.mutedC, marginBottom: 3 }}>Сделка</div>
          <div style={{ background: '#F8F9FC', border: `1px solid ${t.cardBorder}`, padding: '6px 10px', fontSize: 9, color: B }}>#9 Компания 3 ✕</div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.12em', color: t.mutedC, marginBottom: 3 }}>Примечание</div>
          <div style={{ background: '#F8F9FC', border: `1px solid ${t.cardBorder}`, padding: '6px 10px', fontSize: 9, color: t.subC }}>Аванс по сделке (1 200 000 ₽ из 3 400 000 ₽)</div>
        </div>
        <div style={{ background: '#F0F7F0', border: `1px solid ${G}40`, padding: 10, marginBottom: 10 }}>
          <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.12em', color: t.mutedC, marginBottom: 5 }}>Подтверждение</div>
          {['Документ загружен','Платёж подтверждён'].map((txt,i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <span style={{ color: G, fontSize: 10 }}>✓</span>
              <span style={{ fontSize: 8, color: G }}>{txt}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <div style={{ padding: '5px 14px', border: `1px solid ${t.cardBorder}`, fontSize: 9, color: t.subC, ...ch(6), cursor: 'pointer' }}>Отмена</div>
          <div style={{ padding: '5px 14px', background: B, color: '#fff', fontSize: 9, fontWeight: 600, ...ch(6), cursor: 'pointer' }}>Сохранить</div>
        </div>
      </Card>
    </div>
  );
}

function SlidePnL() {
  const projects = [
    { name:'Проект А', income:'5 200 000 ₽', expense:'2 800 000 ₽', margin:'2 400 000 ₽', pct:'+22%', loss: false, bar:72 },
    { name:'Проект Б', income:'4 100 000 ₽', expense:'2 600 000 ₽', margin:'1 500 000 ₽', pct:'+18%', loss: false, bar:58 },
    { name:'Проект В', income:'1 800 000 ₽', expense:'2 700 000 ₽', margin:'−900 000 ₽', pct:'−41%', loss: true, bar:28 },
    { name:'Проект Г', income:'3 200 000 ₽', expense:'1 900 000 ₽', margin:'1 300 000 ₽', pct:'+9%', loss: false, bar:45 },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: t.titleC, marginBottom: 2 }}>PnL по проектам · 4 единицы</div>
      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', padding: '6px 10px', borderBottom: `1px solid ${t.divBorder}`, gap: 4 }}>
          {['Проект','Доход','Расход','Маржа','Δ мес'].map(h => <TH key={h}>{h}</TH>)}
        </div>
        {projects.map((p,i) => (
          <div key={i} style={{ borderBottom: i < projects.length-1 ? `1px solid ${t.divBorder}` : 'none' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', padding: '6px 10px', gap: 4 }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: p.loss ? R : t.titleC }}>{p.name}</div>
              <div style={{ fontSize: 8, color: B, fontVariantNumeric: 'tabular-nums' }}>{p.income}</div>
              <div style={{ fontSize: 8, color: R, fontVariantNumeric: 'tabular-nums' }}>{p.expense}</div>
              <div style={{ fontSize: 8, fontWeight: 700, color: p.loss ? R : G, fontVariantNumeric: 'tabular-nums' }}>{p.margin}</div>
              <div style={{ fontSize: 8, fontWeight: 700, color: p.loss ? R : G }}>{p.pct}</div>
            </div>
            <div style={{ padding: '0 10px 8px' }}>
              <div style={{ height: 3, background: t.trackBg }}>
                <div style={{ height: 3, width: `${p.bar}%`, background: p.loss ? R : B }} />
              </div>
            </div>
          </div>
        ))}
      </Card>
      <Callout tag="ДИАГНОСТИКА AIVISION">Проект В убыточен — маржа −900 000 ₽. Скрыт в общем PnL до внедрения системы.</Callout>
    </div>
  );
}

const slideComponents = [SlideDeals, SlideFinance, SlideAnalytics, SlidePayment, SlidePnL];

export default function DashboardSlider2() {
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
