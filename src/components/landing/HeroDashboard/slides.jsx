import { Ticker, Kpi, Bar, SparkLine, PieDonut, TH, TD, G, R, B } from './atoms';

export function SlideDashboard() {
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

export function SlideOperations() {
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

export function SlideDeals() {
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

export function SlidePnL() {
  const projects = [
    { name: 'Проект А', income: '5 200 000', expense: '2 800 000', margin: '2 400 000', pct: '+22%', pos: true,  bar: 72 },
    { name: 'Проект Б', income: '4 100 000', expense: '2 600 000', margin: '1 500 000', pct: '+18%', pos: true,  bar: 58 },
    { name: 'Проект В', income: '1 800 000', expense: '2 700 000', margin: '−900 000',  pct: '−41%', pos: false, bar: 28, loss: true },
    { name: 'Проект Г', income: '3 200 000', expense: '1 900 000', margin: '1 300 000', pct: '+9%',  pos: true,  bar: 45 },
  ];
  const sparkData = [820, 940, 870, 1150, 1380, 1620];
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

export function SlideFunnel() {
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
            <TH>Этап</TH><TH align="right">Кол-во</TH><TH align="right">Конв.</TH><TH align="right">Δ этапа</TH>
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

export function SlideProducts() {
  const products = [
    { name: 'Артикул А-01', stock: 74,  views: 294, conv: '12.5%', sum: '3 220 ₽', convPos: true },
    { name: 'Артикул А-03', stock: 29,  views: 342, conv: '33.3%', sum: '9 450 ₽', convPos: true },
    { name: 'Артикул Б-01', stock: 98,  views: 359, conv: '10.3%', sum: '7 770 ₽', convPos: true },
    { name: 'Артикул Б-02', stock: 64,  views: 171, conv: '33.3%', sum: '8 960 ₽', convPos: true },
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
