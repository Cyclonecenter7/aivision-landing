// ── Design tokens ─────────────────────────────────────────────
const G = '#16A34A'; const R = '#E5484D'; const B = '#3F6EE8';

export const darkTokens = {
  bg: '#0d0d0d', cardBg: '#111', cardBorder: '#1e1e1e',
  titleC: '#fff', bodyC: '#888', subC: '#555', mutedC: '#444',
  trackBg: '#1e1e1e', divBorder: '#1e1e1e',
  tabOffBg: '#141414', tabOffC: '#555', tabOffBorder: '#1e1e1e',
  wrapBg: 'transparent', wrapBorder: 'none',
};
export const lightTokens = {
  bg: '#F8F9FC', cardBg: '#fff', cardBorder: '#E8E8E8',
  titleC: '#0A0A0A', bodyC: '#444', subC: '#888', mutedC: '#AAA',
  trackBg: '#E8E8E8', divBorder: '#F0F0F0',
  tabOffBg: '#fff', tabOffC: '#888', tabOffBorder: '#E8E8E8',
  wrapBg: '#fff', wrapBorder: '1px solid #E8E8E8',
};

const ch = (px) => ({ clipPath: `polygon(0 0,100% 0,100% calc(100% - ${px}px),calc(100% - ${px}px) 100%,0 100%)` });

// ── Shared atoms ───────────────────────────────────────────────

function Card({ t, children, style = {} }) {
  const bg     = t?.cardBg     ?? '#fff';
  const border = t?.cardBorder ?? '#E8E8E8';
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, ...style }}>
      {children}
    </div>
  );
}

function TH({ children, t }) {
  const c = t?.mutedC ?? '#AAA';
  return (
    <div style={{ fontSize: 7, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: c }}>
      {children}
    </div>
  );
}

function Bar({ pct, color = B, t }) {
  const bg = t?.trackBg ?? '#E8E8E8';
  return (
    <div style={{ height: 4, background: bg }}>
      <div style={{ height: 4, width: `${pct}%`, background: color }} />
    </div>
  );
}

function Callout({ children, tag, t }) {
  return (
    <div style={{ background: '#0A0A0A', padding: '10px 14px', marginTop: 10, ...ch(6) }}>
      <div style={{ fontSize: 7, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#555', marginBottom: 3 }}>
        {tag || 'ВЫВОД AIVISION'}
      </div>
      <div style={{ fontSize: 11, color: '#fff', lineHeight: 1.5 }}>{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// VARIANT: "finance" (DashboardSlider1 slides, dark/light)
// ─────────────────────────────────────────────────────────────

function FinanceSlide1({ t }) {
  const items = ['МАРЖА +93%', 'ОБОРОТ +9%', 'РАСХОДЫ −32%', 'МАРЖА ЗА МЕСЯЦ 376 185 ₽', 'ОБОРОТ ЗА МЕСЯЦ 649 351 ₽'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
      <div style={{ fontSize: 10, fontWeight: 700, color: t.titleC, marginBottom: 2 }}>Дашборд продаж · Апрель 2026</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        {[
          { label: 'МАРЖА',   today: '27 985 ₽', month: '376 185 ₽', delta: '+93%',  c: G },
          { label: 'ОБОРОТ',  today: '29 000 ₽', month: '649 351 ₽', delta: '+9%',   c: B },
          { label: 'РАСХОДЫ', today: '1 015 ₽',  month: '273 166 ₽', delta: '−32%',  c: R },
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

function FinanceSlide2({ t }) {
  const rows = [
    { date:'12.04, 17:00', service:'Оказание услуг', client:'Клиент 1', sum:'+ 4 000 ₽' },
    { date:'12.04, 14:00', service:'Мероприятие',    client:'Клиент 2', sum:'+ 25 000 ₽' },
    { date:'11.04, 12:00', service:'Оказание услуг', client:'Клиент 3', sum:'+ 8 500 ₽' },
    { date:'10.04, 18:00', service:'Сертификат',     client:'Клиент 4', sum:'+ 4 000 ₽' },
  ];
  const cats = [
    { cat:'Оказание услуг', val:'352 021 ₽', pct:54 },
    { cat:'Мероприятия',    val:'288 000 ₽', pct:44 },
    { cat:'Сертификаты',    val:'5 330 ₽',   pct:1  },
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

function FinanceSlide3({ t }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: t.titleC, marginBottom: 2 }}>Визиты · Апрель, 12</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
        {[
          { label:'Всего',     value:'2',       c: t.titleC },
          { label:'Пришли',    value:'2',       c: G },
          { label:'Конверсия', value:'100%',    c: B },
          { label:'Ср. чек',   value:'14 500 ₽', c: B },
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

function FinanceSlide4({ t }) {
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
            <polyline points={points.map((v,i)=>`${(i/(points.length-1))*300},${36-(v/max)*30}`).join(' ')} fill="none" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points={points.map((v,i)=>`${(i/(points.length-1))*300},${36-(v/max)*18}`).join(' ')} fill="none" stroke={G} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3" />
          </svg>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 7, color: t.mutedC, marginTop: 4 }}>
          {[1,5,10,15,20,25,30].map(n=><span key={n}>{n}</span>)}
        </div>
      </Card>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        {[{label:'Маржа',val:'376 185 ₽',c:G},{label:'Доходы',val:'649 351 ₽',c:B},{label:'Расходы',val:'273 166 ₽',c:R}].map((m,i)=>(
          <Card key={i} t={t} style={{ padding: '8px 10px' }}>
            <div style={{ fontSize: 7, color: t.mutedC, marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: m.c, fontVariantNumeric: 'tabular-nums' }}>{m.val}</div>
          </Card>
        ))}
      </div>
      <Callout t={t}>Расходы сократились на −32% при росте оборота +9%. Маржа удвоена за 2 месяца.</Callout>
    </div>
  );
}

function FinanceSlide5({ t }) {
  const income  = [{ cat:'Оказание услуг',val:'352 021',pct:54},{cat:'Мероприятия',val:'288 000',pct:44},{cat:'Продажа товаров',val:'5 330',pct:1},{cat:'Сертификаты',val:'4 000',pct:1}];
  const expense = [{ cat:'Аренда',val:'183 756',pct:67},{cat:'Зарплата',val:'43 200',pct:16},{cat:'Пригл. эксперт',val:'20 000',pct:7},{cat:'Закупка',val:'6 284',pct:2},{cat:'Комиссия',val:'4 341',pct:2}];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: t.titleC, marginBottom: 2 }}>Доходы и расходы по категориям</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        <Card t={t} style={{ padding: 10 }}>
          <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.14em', color: t.mutedC, marginBottom: 4 }}>Доходы</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: B, fontVariantNumeric: 'tabular-nums', marginBottom: 8 }}>649 351 ₽</div>
          {income.map((r,i)=>(
            <div key={i} style={{ marginBottom: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 7, marginBottom: 2 }}><span style={{ color: t.subC }}>{r.cat}</span><span style={{ color: B }}>{r.pct}%</span></div>
              <Bar pct={r.pct} color={B} t={t} />
            </div>
          ))}
        </Card>
        <Card t={t} style={{ padding: 10 }}>
          <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.14em', color: R, marginBottom: 4 }}>Расходы</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: R, fontVariantNumeric: 'tabular-nums', marginBottom: 8 }}>273 166 ₽</div>
          {expense.map((r,i)=>(
            <div key={i} style={{ marginBottom: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 7, marginBottom: 2 }}><span style={{ color: t.subC }}>{r.cat}</span><span style={{ color: R }}>{r.pct}%</span></div>
              <Bar pct={r.pct} color={R} t={t} />
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// VARIANT: "crm" (DashboardSlider2 slides, light)
// ─────────────────────────────────────────────────────────────
const lt = lightTokens;

function CrmSlideDeals() {
  const [offset, setOffset] = [0, () => {}]; // static display
  const stages = [
    { label:'Новая',     color: B, deals:[{id:'#12',name:'Компания 5',sum:'1 200 000 ₽',tag:'Входящий запрос',tagC:B},{id:'#11',name:'Компания 6',sum:'840 000 ₽',tag:'Квалификация',tagC:B}] },
    { label:'Переговоры',color:'#7B5AE8',deals:[{id:'#9',name:'Компания 3',sum:'3 400 000 ₽',tag:'КП отправлено',tagC:B},{id:'#10',name:'Компания 4',sum:'2 100 000 ₽',tag:'Согласование',tagC:'#EAB308'}] },
    { label:'Договор',   color:'#EAB308',deals:[{id:'#7',name:'Компания 2',sum:'4 800 000 ₽',tag:'Юр. проверка',tagC:'#EAB308'}] },
    { label:'Оплата',    color:G,deals:[{id:'#3',name:'Компания 2',sum:'163 000 ₽',tag:'Фиксация объёма',tagC:'#EAB308'}] },
    { label:'Завершена', color:'#888',deals:[{id:'#4',name:'Компания 1',sum:'34 000 ₽',tag:'47.1% маржа',tagC:G},{id:'#5',name:'Компания 3',sum:'2 800 000 ₽',tag:'Закрыта',tagC:'#888'}] },
  ];
  const [off, setOff] = [0, () => {}];

  // Use local state via React.useState
  const { useState: us } = { useState: (v) => { let x = v; return [x, () => {}]; } };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: lt.titleC }}>Сделки · {stages.reduce((a,s)=>a+s.deals.length,0)} в работе</div>
        <span style={{ fontSize: 8, fontWeight: 600, color: G }}>Оборот: 16 200 000 ₽</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        {stages.slice(0, 3).map((st, i) => (
          <div key={i} style={{ background: lt.cardBg, border: `1px solid ${lt.cardBorder}`, padding: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: st.color, flexShrink: 0 }} />
              <span style={{ fontSize: 8, fontWeight: 600, color: lt.bodyC }}>{st.label}</span>
              <span style={{ marginLeft: 'auto', fontSize: 7, fontWeight: 700, color: B }}>{st.deals.length}</span>
            </div>
            {st.deals.slice(0, 2).map((deal, j) => (
              <div key={j} style={{ background: '#F8F9FC', border: '1px solid #E8EEF8', padding: 6, marginBottom: 4 }}>
                <div style={{ fontSize: 7, fontWeight: 600, color: B }}>{deal.id}</div>
                <div style={{ fontSize: 8, fontWeight: 700, color: lt.titleC, filter: 'blur(3px)', userSelect: 'none' }}>{deal.name}</div>
                <div style={{ fontSize: 8, fontWeight: 600, color: G, fontVariantNumeric: 'tabular-nums', marginTop: 2 }}>{deal.sum}</div>
                <div style={{ display: 'inline-block', marginTop: 4, padding: '2px 6px', fontSize: 7, fontWeight: 500, background: `${deal.tagC}18`, color: deal.tagC }}>{deal.tag}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function CrmSlideFinance() {
  const rows = [
    ['31.03','Входящий','Компания 1','Сделка #7','+2 400 000 ₽',G],
    ['31.03','Исходящий','Контрагент 1','Сделка #7','−1 450 000 ₽',R],
    ['30.03','Входящий','Компания 3','Сделка #9','+1 000 000 ₽',G],
    ['30.03','Исходящий','Контрагент 2','Сделка #9','−380 000 ₽',R],
    ['29.03','Входящий','Компания 2','Сделка #3','+163 000 ₽',G],
    ['29.03','Исходящий','Контрагент 3','Сделка #3','−980 000 ₽',R],
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: lt.titleC, marginBottom: 2 }}>Финансы · ДДС</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        {[{label:'ВХОДЯЩИЕ',value:'9 200 000 ₽',c:G},{label:'ИСХОДЯЩИЕ',value:'6 800 000 ₽',c:R},{label:'БАЛАНС',value:'+2 400 000 ₽',c:G}].map((m,i)=>(
          <div key={i} style={{ background: lt.cardBg, border: `1px solid ${lt.cardBorder}`, padding: '8px 10px' }}>
            <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.14em', color: lt.mutedC, marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 11, fontWeight: 800, color: m.c, fontVariantNumeric: 'tabular-nums' }}>{m.value}</div>
          </div>
        ))}
      </div>
      <div style={{ background: lt.cardBg, border: `1px solid ${lt.cardBorder}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', padding: '6px 10px', borderBottom: `1px solid ${lt.divBorder}`, gap: 4 }}>
          {['Дата','Тип','Контрагент','Сделка','Сумма'].map(h=><div key={h} style={{ fontSize: 7, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: lt.mutedC }}>{h}</div>)}
        </div>
        {rows.map((row,i)=>(
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', padding: '6px 10px', borderBottom: i < rows.length-1 ? `1px solid ${lt.divBorder}` : 'none', gap: 4 }}>
            <div style={{ fontSize: 7, color: lt.subC }}>{row[0]}</div>
            <div style={{ fontSize: 7, color: row[1]==='Входящий' ? G : R }}>{row[1]}</div>
            <div style={{ fontSize: 7, color: lt.bodyC }}>{row[2]}</div>
            <div style={{ fontSize: 7, color: lt.subC }}>{row[3]}</div>
            <div style={{ fontSize: 7, fontWeight: 600, color: row[5], fontVariantNumeric: 'tabular-nums' }}>{row[4]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CrmSlideAnalytics() {
  const managers = [
    { name:'Менеджер 1', oborot:'312 000 ₽', marzha:'56 000 ₽', active:1, closed:3 },
    { name:'Менеджер 2', oborot:'0 ₽', marzha:'0 ₽', active:0, closed:0 },
    { name:'Менеджер 3', oborot:'0 ₽', marzha:'0 ₽', active:0, closed:0 },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: lt.titleC, marginBottom: 2 }}>Аналитика · Последние 30 дней</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
        {[{label:'ОБОРОТ',fact:'16 200 000 ₽',pot:'7 400 000 ₽',c:B},{label:'ВЫРУЧКА',fact:'9 200 000 ₽',pot:'4 100 000 ₽',c:G},{label:'МАРЖА',fact:'2 400 000 ₽',pot:'1 800 000 ₽',c:G},{label:'РАСХОДЫ',fact:'6 800 000 ₽',pot:'2 600 000 ₽',c:R}].map((m,i)=>(
          <div key={i} style={{ background: lt.cardBg, border: `1px solid ${lt.cardBorder}`, padding: '8px 8px' }}>
            <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.12em', color: lt.mutedC, marginBottom: 3 }}>{m.label}</div>
            <div style={{ fontSize: 9, fontWeight: 800, color: m.c, fontVariantNumeric: 'tabular-nums' }}>{m.fact}</div>
            <div style={{ fontSize: 7, color: lt.mutedC, marginTop: 4 }}>Потенциал</div>
            <div style={{ fontSize: 8, color: lt.subC, fontVariantNumeric: 'tabular-nums' }}>{m.pot}</div>
          </div>
        ))}
      </div>
      <div style={{ background: lt.cardBg, border: `1px solid ${lt.cardBorder}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', padding: '6px 10px', borderBottom: `1px solid ${lt.divBorder}`, gap: 4 }}>
          {['Менеджер','Факт оборот','Факт маржа','Активные','Закрытые'].map(h=><div key={h} style={{ fontSize: 7, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: lt.mutedC }}>{h}</div>)}
        </div>
        {managers.map((m,i)=>(
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', padding: '6px 10px', borderBottom: i < managers.length-1 ? `1px solid ${lt.divBorder}` : 'none', gap: 4 }}>
            <div style={{ fontSize: 8, color: lt.bodyC }}>{m.name}</div>
            <div style={{ fontSize: 8, fontWeight: 600, color: B, fontVariantNumeric: 'tabular-nums' }}>{m.oborot}</div>
            <div style={{ fontSize: 8, fontWeight: 600, color: G, fontVariantNumeric: 'tabular-nums' }}>{m.marzha}</div>
            <div style={{ fontSize: 8, color: lt.subC }}>{m.active}</div>
            <div style={{ fontSize: 8, color: lt.subC }}>{m.closed}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CrmSlidePayment() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: lt.titleC, marginBottom: 2 }}>Финансы · Добавить платёж</div>
      <div style={{ background: lt.cardBg, border: `1px solid ${lt.cardBorder}`, padding: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
          {[{label:'Тип',val:'Приход',focus:false},{label:'Категория',val:'Выберите...',focus:false,ph:true},{label:'Сумма ₽',val:'1 200 000',focus:true},{label:'Дата',val:'31.03.2026',focus:false}].map((f,i)=>(
            <div key={i}>
              <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.12em', color: lt.mutedC, marginBottom: 3 }}>{f.label}</div>
              <div style={{ background: '#F8F9FC', border: `1px solid ${f.focus ? B : lt.cardBorder}`, padding: '6px 10px', fontSize: 9, color: f.ph ? lt.subC : lt.titleC, fontVariantNumeric: 'tabular-nums' }}>{f.val}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#F0F7F0', border: `1px solid ${G}40`, padding: 10, marginBottom: 10 }}>
          {['Документ загружен','Платёж подтверждён'].map((txt,i)=>(
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <span style={{ color: G, fontSize: 10 }}>✓</span>
              <span style={{ fontSize: 8, color: G }}>{txt}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <div style={{ padding: '5px 14px', border: `1px solid ${lt.cardBorder}`, fontSize: 9, color: lt.subC, ...ch(6), cursor: 'pointer' }}>Отмена</div>
          <div style={{ padding: '5px 14px', background: B, color: '#fff', fontSize: 9, fontWeight: 600, ...ch(6), cursor: 'pointer' }}>Сохранить</div>
        </div>
      </div>
    </div>
  );
}

function CrmSlidePnL() {
  const projects = [
    { name:'Проект А',income:'5 200 000 ₽',expense:'2 800 000 ₽',margin:'2 400 000 ₽',pct:'+22%',loss:false },
    { name:'Проект Б',income:'4 100 000 ₽',expense:'2 600 000 ₽',margin:'1 500 000 ₽',pct:'+18%',loss:false },
    { name:'Проект В',income:'1 800 000 ₽',expense:'2 700 000 ₽',margin:'−900 000 ₽',pct:'−41%',loss:true  },
    { name:'Проект Г',income:'3 200 000 ₽',expense:'1 900 000 ₽',margin:'1 300 000 ₽',pct:'+9%',loss:false  },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: lt.titleC, marginBottom: 2 }}>PnL по проектам · 4 единицы</div>
      <div style={{ background: lt.cardBg, border: `1px solid ${lt.cardBorder}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', padding: '6px 10px', borderBottom: `1px solid ${lt.divBorder}`, gap: 4 }}>
          {['Проект','Доход','Расход','Маржа','Δ мес'].map(h=><div key={h} style={{ fontSize: 7, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: lt.mutedC }}>{h}</div>)}
        </div>
        {projects.map((p,i)=>(
          <div key={i} style={{ borderBottom: i < projects.length-1 ? `1px solid ${lt.divBorder}` : 'none' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', padding: '6px 10px', gap: 4 }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: p.loss ? R : lt.titleC }}>{p.name}</div>
              <div style={{ fontSize: 8, color: B, fontVariantNumeric: 'tabular-nums' }}>{p.income}</div>
              <div style={{ fontSize: 8, color: R, fontVariantNumeric: 'tabular-nums' }}>{p.expense}</div>
              <div style={{ fontSize: 8, fontWeight: 700, color: p.loss ? R : G, fontVariantNumeric: 'tabular-nums' }}>{p.margin}</div>
              <div style={{ fontSize: 8, fontWeight: 700, color: p.loss ? R : G }}>{p.pct}</div>
            </div>
          </div>
        ))}
      </div>
      <Callout tag="ДИАГНОСТИКА AIVISION">Проект В убыточен — маржа −900 000 ₽. Скрыт в общем PnL до внедрения системы.</Callout>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// VARIANT: "ecommerce" (DashboardSlider3 slides, light)
// ─────────────────────────────────────────────────────────────

function EcomSlideOverview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: lt.titleC }}>WB Аналитика</div>
        <div style={{ fontSize: 8, color: lt.subC }}>5–7 апр 2024</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
        <div style={{ background: B, padding: 10, gridColumn: '1', gridRow: '1 / 3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 7, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)' }}>Прибыль</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>2.4М ₽</div>
        </div>
        {[{label:'Заказы',val:'1 247',c:lt.titleC},{label:'Конверсия',val:'12.3%',c:B},{label:'Маржа',val:'46.2%',c:G},{label:'Выручка',val:'5.2М ₽',c:G},{label:'Продано',val:'82 шт',c:lt.titleC},{label:'Просмотры',val:'16 590',c:lt.titleC}].map((m,i)=>(
          <div key={i} style={{ background: lt.cardBg, border: `1px solid ${lt.cardBorder}`, padding: '8px 10px' }}>
            <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.12em', color: lt.mutedC, marginBottom: 3 }}>{m.label}</div>
            <div style={{ fontSize: i < 3 ? 16 : 12, fontWeight: 800, color: m.c, fontVariantNumeric: 'tabular-nums' }}>{m.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EcomSlideBrands() {
  const brands = [
    { name:'Бренд 1',active:'31/61',orders:450,rev:'850К ₽',conv:'11%',growth:'+8%',bar:62 },
    { name:'Бренд 2',active:'7/19', orders:380,rev:'720К ₽',conv:'13%',growth:'+15%',bar:48 },
    { name:'Бренд 3',active:'6/37', orders:417,rev:'830К ₽',conv:'12%',growth:'+11%',bar:55 },
    { name:'Бренд 4',active:'0/3',  orders:0,  rev:'—',     conv:'—',  growth:'—',   bar:0  },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: lt.titleC, marginBottom: 2 }}>Аналитика по брендам</div>
      <div style={{ background: lt.cardBg, border: `1px solid ${lt.cardBorder}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', padding: '6px 10px', borderBottom: `1px solid ${lt.divBorder}`, gap: 4 }}>
          {['Бренд','Активных','Заказы','Выручка','Конв.','Рост'].map(h=><div key={h} style={{ fontSize: 7, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: lt.mutedC }}>{h}</div>)}
        </div>
        {brands.map((b,i)=>(
          <div key={i} style={{ borderBottom: i < brands.length-1 ? `1px solid ${lt.divBorder}` : 'none' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', padding: '6px 10px', gap: 4 }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: lt.titleC }}>{b.name}</div>
              <div style={{ fontSize: 8, color: lt.subC }}>{b.active}</div>
              <div style={{ fontSize: 8, fontWeight: 600, color: lt.titleC, fontVariantNumeric: 'tabular-nums' }}>{b.orders}</div>
              <div style={{ fontSize: 8, color: B, fontVariantNumeric: 'tabular-nums' }}>{b.rev}</div>
              <div style={{ fontSize: 8, color: G }}>{b.conv}</div>
              <div style={{ fontSize: 8, fontWeight: 600, color: b.growth==='—' ? lt.mutedC : G }}>{b.growth}</div>
            </div>
            {b.bar > 0 && (
              <div style={{ padding: '0 10px 8px' }}>
                <div style={{ height: 4, background: lt.trackBg }}><div style={{ height: 4, width: `${b.bar}%`, background: B }} /></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EcomSlideFunnel() {
  const stages = [
    { label:'Просмотры',value:16590,pct:100,  conv:'—',     delta:'—',      convPos:null  },
    { label:'В корзину',value:2041, pct:12.3, conv:'12.3%', delta:'−87.7%', convPos:false },
    { label:'Заказы',   value:1247, pct:7.5,  conv:'61.1%', delta:'−38.9%', convPos:true  },
    { label:'Выкуп',    value:1018, pct:6.1,  conv:'81.6%', delta:'−18.4%', convPos:true  },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
      <div style={{ background: lt.cardBg, border: `1px solid ${lt.cardBorder}`, overflow: 'hidden', flex: 1 }}>
        <div style={{ padding: '8px 12px', borderBottom: `1px solid ${lt.divBorder}`, fontSize: 9, fontWeight: 600, color: lt.titleC }}>Воронка продаж · E-commerce</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontVariantNumeric: 'tabular-nums' }}>
          <thead><tr>
            {['Этап','Кол-во','Конв.','Δ этапа'].map((h,i)=>(
              <th key={h} style={{ textAlign: i===0 ? 'left' : 'right', padding: '8px 12px', fontSize: 8, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', borderBottom: `1px solid ${lt.divBorder}`, whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {stages.map((st,i)=>(
              <tr key={i}>
                {[st.label,st.value.toLocaleString('ru-RU'),st.conv,st.delta].map((v,j)=>(
                  <td key={j} style={{ textAlign: j===0 ? 'left' : 'right', padding: '7px 12px', fontSize: 10, fontWeight: 500, color: j===0 ? lt.titleC : j===2 ? (st.convPos===null ? '#AAA' : st.convPos ? G : R) : (st.convPos===null ? '#AAA' : R), borderBottom: `1px solid #F4F4F5`, fontVariantNumeric: 'tabular-nums' }}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: '6px 12px 10px' }}>
          {stages.map((st,i)=>(
            <div key={i} style={{ marginBottom: i < stages.length-1 ? 5 : 0 }}>
              <div style={{ background: '#F0F3FA', height: 4 }}><div style={{ height: 4, width: `${Math.min(st.pct,100)}%`, background: B }} /></div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        {[{l:'Рост выручки',v:'+35%',c:G},{l:'Конверсия',v:'+8%',c:G},{l:'Выкуп',v:'81.6%',c:G}].map((m,i)=>(
          <div key={i} style={{ background: lt.cardBg, border: `1px solid ${lt.cardBorder}`, padding: '8px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 8, color: lt.mutedC, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3 }}>{m.l}</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: m.c, fontVariantNumeric: 'tabular-nums' }}>{m.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EcomSlideProducts() {
  const products = [
    { name:'Артикул А-01',stock:74, views:294,conv:'12.5%',sum:'3 220 ₽',convPos:true },
    { name:'Артикул А-03',stock:29, views:342,conv:'33.3%',sum:'9 450 ₽',convPos:true },
    { name:'Артикул Б-01',stock:98, views:359,conv:'10.3%',sum:'7 770 ₽',convPos:true },
    { name:'Артикул Б-02',stock:64, views:171,conv:'33.3%',sum:'8 960 ₽',convPos:true },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
      <div style={{ background: lt.cardBg, border: `1px solid ${lt.cardBorder}`, overflow: 'hidden', flex: 1 }}>
        <div style={{ padding: '8px 12px', borderBottom: `1px solid ${lt.divBorder}`, fontSize: 9, fontWeight: 600, color: lt.titleC }}>Детализация по товарам · WB</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontVariantNumeric: 'tabular-nums' }}>
          <thead><tr>
            {['Товар','Остаток','Просм.','Конв.','Сумма'].map((h,i)=>(
              <th key={h} style={{ textAlign: i===0 ? 'left' : 'right', padding: '8px 12px', fontSize: 8, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', borderBottom: `1px solid ${lt.divBorder}`, whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {products.map((p,i)=>(
              <tr key={i}>
                <td style={{ padding: '7px 12px', fontSize: 10, fontWeight: 500, color: lt.titleC, borderBottom: '1px solid #F4F4F5' }}>{p.name}</td>
                <td style={{ textAlign: 'right', padding: '7px 12px', fontSize: 10, fontWeight: 500, color: lt.bodyC, borderBottom: '1px solid #F4F4F5' }}>{p.stock}</td>
                <td style={{ textAlign: 'right', padding: '7px 12px', fontSize: 10, fontWeight: 500, color: '#888', borderBottom: '1px solid #F4F4F5' }}>{p.views}</td>
                <td style={{ textAlign: 'right', padding: '7px 12px', fontSize: 10, fontWeight: 500, color: p.convPos ? G : B, borderBottom: '1px solid #F4F4F5' }}>{p.conv}</td>
                <td style={{ textAlign: 'right', padding: '7px 12px', fontSize: 10, fontWeight: 500, color: B, borderBottom: '1px solid #F4F4F5', fontVariantNumeric: 'tabular-nums' }}>{p.sum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        {[{l:'Общий оборот',v:'5.2М ₽',c:B},{l:'Ср. конверсия',v:'12.1%',c:G},{l:'Топ SKU',v:'4 из 4',c:G}].map((m,i)=>(
          <div key={i} style={{ background: lt.cardBg, border: `1px solid ${lt.cardBorder}`, padding: '8px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 8, color: lt.mutedC, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3 }}>{m.l}</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: m.c, fontVariantNumeric: 'tabular-nums' }}>{m.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// VARIANT: "platform" — реальные экраны AIVISION CRM (dark)
// Дашборд / Заявки / Клиенты / Задачи
// ─────────────────────────────────────────────────────────────

const SUN = '#FCD34D'; const INDIGO = '#6366F1'; const SLATE = '#94A3B8';

function PltSectionHead({ t, color, title, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
      <span style={{ width: 6, height: 6, background: color, flexShrink: 0 }} />
      <span style={{ fontSize: 11, fontWeight: 700, color: t.titleC, letterSpacing: '-0.01em' }}>{title}</span>
      {sub && <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '0.16em', color: t.mutedC, textTransform: 'uppercase' }}>{sub}</span>}
    </div>
  );
}

function PltKpi({ t, label, value, delta, deltaColor, valColor }) {
  return (
    <Card t={t} style={{ padding: '8px 10px' }}>
      <div style={{ fontSize: 7, fontWeight: 600, letterSpacing: '0.14em', color: t.mutedC, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 800, color: valColor || t.titleC, fontVariantNumeric: 'tabular-nums', marginTop: 3, letterSpacing: '-0.02em' }}>{value}</div>
      {delta && <div style={{ fontSize: 8, fontWeight: 600, color: deltaColor || t.mutedC, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>{delta}</div>}
    </Card>
  );
}

function PlatformDashboard({ t }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
      <PltSectionHead t={t} color={SUN} title="Финансы" sub="Май · 16 из 31 дн." />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
        <PltKpi t={t} label="Маржа"  value="1.84 М ₽" valColor={B} delta="+27%" deltaColor={G} />
        <PltKpi t={t} label="Доход"  value="4.2 М ₽"  delta="+14%" deltaColor={G} />
        <PltKpi t={t} label="Расход" value="2.36 М ₽" delta="+6%"  deltaColor={R} />
        <PltKpi t={t} label="Сделки" value="15"      delta="в работе" />
      </div>

      <Card t={t} style={{ padding: '10px 12px 6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 7, fontWeight: 600, letterSpacing: '0.14em', color: t.mutedC, textTransform: 'uppercase' }}>Доходы · Расходы · Маржа</span>
          <div style={{ display: 'flex', gap: 10, fontSize: 7, color: t.subC }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 2, background: G }} />Доход</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 2, background: R }} />Расход</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 2, background: B }} />Маржа</span>
          </div>
        </div>
        <svg width="100%" height="170" viewBox="0 0 600 170" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gPltBrand" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={B} stopOpacity="0.22" />
              <stop offset="100%" stopColor={B} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gPltEm" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={G} stopOpacity="0.18" />
              <stop offset="100%" stopColor={G} stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="40"  x2="600" y2="40"  stroke={t.cardBorder} strokeWidth="1" strokeDasharray="2 4" />
          <line x1="0" y1="85"  x2="600" y2="85"  stroke={t.cardBorder} strokeWidth="1" strokeDasharray="2 4" />
          <line x1="0" y1="130" x2="600" y2="130" stroke={t.cardBorder} strokeWidth="1" />

          <path d="M 20,120 C 80,118 140,123 200,115 C 260,108 320,115 380,108 C 440,100 500,105 580,102" fill="none" stroke={R} strokeWidth="2" />
          <path d="M 20,88 C 80,82 140,76 200,68 C 260,60 320,65 380,52 C 440,40 500,46 580,40 L 580,130 L 20,130 Z" fill="url(#gPltEm)" />
          <path d="M 20,88 C 80,82 140,76 200,68 C 260,60 320,65 380,52 C 440,40 500,46 580,40" fill="none" stroke={G} strokeWidth="2" />
          <path d="M 20,108 C 80,104 140,98 200,90 C 260,82 320,75 380,65 C 440,55 500,62 580,56 L 580,130 L 20,130 Z" fill="url(#gPltBrand)" />
          <path d="M 20,108 C 80,104 140,98 200,90 C 260,82 320,75 380,65 C 440,55 500,62 580,56" fill="none" stroke={B} strokeWidth="2.25" />

          <circle cx="580" cy="56" r="3.5" fill={t.cardBg} stroke={B} strokeWidth="2" />
          <circle cx="580" cy="40" r="3"   fill={t.cardBg} stroke={G} strokeWidth="2" />
          <circle cx="580" cy="102" r="3"  fill={t.cardBg} stroke={R} strokeWidth="2" />
        </svg>
      </Card>
    </div>
  );
}

function PlatformLeads({ t }) {
  const statuses = [
    { l: 'Новые',      c: B,        n: 18, pct: 38 },
    { l: 'Связались',  c: G,        n: 12, pct: 25 },
    { l: 'Целевые',    c: SUN,      n: 9,  pct: 19 },
    { l: 'Отказ',      c: SLATE,    n: 8,  pct: 18 },
  ];
  const sources = [
    { l: 'Сайт',     hot: 6, warm: 4, cold: 2 },
    { l: 'Telegram', hot: 3, warm: 5, cold: 3 },
    { l: 'Реклама',  hot: 2, warm: 3, cold: 4 },
    { l: 'Реф.',     hot: 4, warm: 2, cold: 1 },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
      <PltSectionHead t={t} color={B} title="Заявки" sub="Май · 47 шт." />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 5 }}>
        <PltKpi t={t} label="Всего"     value="47" delta="+18%" deltaColor={G} />
        <PltKpi t={t} label="Новые"     value="18" delta="+22%" deltaColor={G} />
        <PltKpi t={t} label="Связались" value="12" delta="+8%"  deltaColor={G} />
        <PltKpi t={t} label="Целевые"   value="9"  delta="+12%" deltaColor={G} />
        <PltKpi t={t} label="Горячие"   value="13" valColor={R} />
        <PltKpi t={t} label="Тёплые"    value="14" valColor={SUN} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        <Card t={t} style={{ padding: '10px 12px' }}>
          <div style={{ fontSize: 7, fontWeight: 600, letterSpacing: '0.14em', color: t.mutedC, textTransform: 'uppercase', marginBottom: 8 }}>По статусам</div>
          <div style={{ display: 'flex', height: 6, gap: 1, marginBottom: 8 }}>
            {statuses.map(s => <div key={s.l} style={{ flex: s.n, background: s.c }} />)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {statuses.map(s => (
              <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 8 }}>
                <span style={{ width: 6, height: 6, background: s.c, flexShrink: 0 }} />
                <span style={{ color: t.bodyC, flex: 1 }}>{s.l}</span>
                <span style={{ color: t.mutedC, fontVariantNumeric: 'tabular-nums' }}>{s.pct}%</span>
                <span style={{ color: t.titleC, fontWeight: 700, fontVariantNumeric: 'tabular-nums', minWidth: 14, textAlign: 'right' }}>{s.n}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card t={t} style={{ padding: '10px 12px' }}>
          <div style={{ fontSize: 7, fontWeight: 600, letterSpacing: '0.14em', color: t.mutedC, textTransform: 'uppercase', marginBottom: 8 }}>По источникам</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {sources.map(s => {
              const tot = s.hot + s.warm + s.cold;
              return (
                <div key={s.l} style={{ display: 'grid', gridTemplateColumns: '50px 1fr 18px', gap: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 8, color: t.bodyC, fontWeight: 500 }}>{s.l}</span>
                  <div style={{ display: 'flex', height: 6, gap: 1 }}>
                    <div style={{ flex: s.hot,  background: R }} />
                    <div style={{ flex: s.warm, background: SUN }} />
                    <div style={{ flex: s.cold, background: SLATE }} />
                  </div>
                  <span style={{ fontSize: 8, color: t.titleC, fontWeight: 700, fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{tot}</span>
                </div>
              );
            })}
            <div style={{ display: 'flex', gap: 10, paddingTop: 4, borderTop: `1px solid ${t.divBorder}`, marginTop: 2 }}>
              <span style={{ fontSize: 7, color: t.subC, display: 'inline-flex', gap: 4, alignItems: 'center' }}><span style={{ width: 6, height: 6, background: R }} />Гор.</span>
              <span style={{ fontSize: 7, color: t.subC, display: 'inline-flex', gap: 4, alignItems: 'center' }}><span style={{ width: 6, height: 6, background: SUN }} />Тёпл.</span>
              <span style={{ fontSize: 7, color: t.subC, display: 'inline-flex', gap: 4, alignItems: 'center' }}><span style={{ width: 6, height: 6, background: SLATE }} />Хол.</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function PlatformClients({ t }) {
  const recent = [
    { name: 'ООО «Альфа»',         tag: 'B2B услуги',    classif: 'hot',  rev: '1.2 М ₽' },
    { name: 'ИП Соколов А.',        tag: 'E-com',         classif: 'warm', rev: '420 К ₽' },
    { name: 'ООО «Стройпроект»',    tag: 'Строительство', classif: 'hot',  rev: '2.8 М ₽' },
    { name: 'Школа «Логика»',       tag: 'Образование',   classif: 'cold', rev: '180 К ₽' },
  ];
  const dot = (kind) => kind === 'hot' ? R : kind === 'warm' ? SUN : SLATE;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
      <PltSectionHead t={t} color={G} title="Клиенты" sub="База · 124 актив." />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 5 }}>
        <PltKpi t={t} label="Всего"     value="156" />
        <PltKpi t={t} label="Активные"  value="124" valColor={G} />
        <PltKpi t={t} label="Новые"     value="14"  delta="+8%" deltaColor={G} />
        <PltKpi t={t} label="Горячие"   value="32"  valColor={R} />
        <PltKpi t={t} label="Тёплые"    value="47"  valColor={SUN} />
      </div>

      <Card t={t} style={{ padding: '10px 12px' }}>
        <div style={{ fontSize: 7, fontWeight: 600, letterSpacing: '0.14em', color: t.mutedC, textTransform: 'uppercase', marginBottom: 8 }}>Последние активные</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {recent.map((c, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '12px 1.4fr 1fr 0.7fr', gap: 8, alignItems: 'center', padding: '5px 0', borderBottom: i < recent.length - 1 ? `1px solid ${t.divBorder}` : 'none' }}>
              <span style={{ width: 7, height: 7, background: dot(c.classif), borderRadius: '50%' }} />
              <span style={{ fontSize: 9, color: t.titleC, fontWeight: 600, filter: 'blur(2px)', userSelect: 'none' }}>{c.name}</span>
              <span style={{ fontSize: 8, color: t.subC }}>{c.tag}</span>
              <span style={{ fontSize: 9, color: B, fontWeight: 700, fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{c.rev}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function PlatformTasks({ t }) {
  const cols = [
    {
      title: 'Открытые', color: B, count: 8,
      items: [
        { t: 'Подготовить КП для клиента', who: 'А. Соколов', due: 'сегодня' },
        { t: 'Созвон по проекту X',         who: 'И. Петров',  due: '12.05' },
      ],
    },
    {
      title: 'В работе', color: SUN, count: 5,
      items: [
        { t: 'Внедрение CRM для школы', who: 'М. Иванова', due: '15.05' },
        { t: 'Настроить интеграцию 1С',  who: 'А. Соколов', due: '16.05' },
      ],
    },
    {
      title: 'Просрочены', color: R, count: 2,
      items: [
        { t: 'Согласовать договор',     who: 'Д. Кузнецов', due: '−2 дн' },
      ],
    },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
      <PltSectionHead t={t} color={INDIGO} title="Задачи" sub="Май · 15 шт." />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 5 }}>
        <PltKpi t={t} label="Всего"     value="15" />
        <PltKpi t={t} label="Открытые"  value="8"  valColor={B} />
        <PltKpi t={t} label="Просрочены" value="2" valColor={R} />
        <PltKpi t={t} label="Создано"   value="12" delta="+4" deltaColor={G} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 5, flex: 1 }}>
        {cols.map(col => (
          <Card key={col.title} t={t} style={{ padding: '8px 9px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 6, height: 6, background: col.color }} />
                <span style={{ fontSize: 8, fontWeight: 700, color: t.titleC, letterSpacing: '0.04em' }}>{col.title}</span>
              </span>
              <span style={{ fontSize: 8, fontWeight: 700, color: t.mutedC, fontVariantNumeric: 'tabular-nums' }}>{col.count}</span>
            </div>
            {col.items.map((it, i) => (
              <div key={i} style={{ background: t.bg, padding: '6px 7px', borderLeft: `2px solid ${col.color}` }}>
                <div style={{ fontSize: 8, color: t.titleC, fontWeight: 500, lineHeight: 1.3 }}>{it.t}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                  <span style={{ fontSize: 7, color: t.subC }}>{it.who}</span>
                  <span style={{ fontSize: 7, color: col.color, fontWeight: 600 }}>{it.due}</span>
                </div>
              </div>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Variant registry
// ─────────────────────────────────────────────────────────────

export const SLIDER_VARIANTS = {
  finance: {
    tabs: ['Дашборд', 'Операции', 'Визиты', 'Аналитика', 'Категории'],
    slideComponents: [FinanceSlide1, FinanceSlide2, FinanceSlide3, FinanceSlide4, FinanceSlide5],
    fixedTheme: null,
    hasLive: false,
  },
  crm: {
    tabs: ['Сделки', 'Финансы', 'Аналитика', 'Платёж', 'PnL'],
    slideComponents: [CrmSlideDeals, CrmSlideFinance, CrmSlideAnalytics, CrmSlidePayment, CrmSlidePnL],
    fixedTheme: 'light',
    hasLive: false,
  },
  ecommerce: {
    tabs: ['Обзор', 'Бренды', 'Воронка', 'Товары'],
    slideComponents: [EcomSlideOverview, EcomSlideBrands, EcomSlideFunnel, EcomSlideProducts],
    fixedTheme: 'light',
    hasLive: true,
  },
  platform: {
    tabs: ['Дашборд', 'Заявки', 'Клиенты', 'Задачи'],
    slideComponents: [PlatformDashboard, PlatformLeads, PlatformClients, PlatformTasks],
    fixedTheme: null,
    hasLive: true,
  },
};
