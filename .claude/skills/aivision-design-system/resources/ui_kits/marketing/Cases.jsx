// Cases section — 3 case cards with blue hero metric block

const CASES = [
  { id: 1, tag: 'Образование', title: 'Как образовательный проект перестал терять маржу',
    summary: 'Доход рос, расходы — быстрее. Собственник видел оборот, но не видел маржи.',
    metrics: ['+18–27%', '−20%', '+20%'], metricLabels: ['к марже', 'расходов', 'повт. продаж'],
    hero: { value: '+93%', label: 'рост маржи', sub: 'за 2 месяца' } },
  { id: 2, tag: 'Оборот 200+ млн', title: 'Система в бизнесе с 4 проектами',
    summary: 'Большой оборот — нулевая прозрачность. Выявлен убыточный проект, скрытый в общем PnL.',
    metrics: ['100%', '4', '−∞'], metricLabels: ['операций в учёте', 'отдельных PnL', 'кассовых разрывов'],
    hero: { value: '200М+', label: 'оборот под контролем', sub: '4 отдельных PnL' } },
  { id: 3, tag: 'E-commerce', title: 'Рост выручки на 35% за квартал',
    summary: 'Данные были, но решения принимались вслепую. Выстроили систему аналитики и KPI.',
    metrics: ['+35%', '+8 п.п.', '90'], metricLabels: ['выручка', 'конверсия', 'дней внедрения'],
    hero: { value: '+35%', label: 'рост выручки', sub: 'за квартал' } },
];

function CaseCard({ c, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ textAlign: 'left', background: '#fff',
        border: `1px solid ${hover ? '#3F6EE8' : '#E8E8E8'}`,
        display: 'flex', flexDirection: 'column', padding: 0, cursor: 'pointer',
        boxShadow: hover ? '0 1px 2px rgba(0,0,0,.05)' : 'none',
        transition: 'all 150ms', fontFamily: 'inherit' }}>
      <div style={{ background: '#3F6EE8', padding: '20px 24px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ color: '#fff', fontSize: 44, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', opacity: 0.92 }}>{c.hero.value}</div>
        <div style={{ color: 'rgba(255,255,255,.45)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', textAlign: 'right', lineHeight: 1.55 }}>{c.hero.label}<br/>{c.hero.sub}</div>
      </div>
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ background: '#EEF3FD', padding: '4px 10px', color: '#3F6EE8', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', alignSelf: 'flex-start', marginBottom: 18 }}>{c.tag}</div>
        <h3 style={{ color: '#0A0A0A', fontSize: 16, fontWeight: 600, lineHeight: 1.35, margin: '0 0 10px' }}>{c.title}</h3>
        <p style={{ color: '#888', fontSize: 12, lineHeight: 1.55, margin: '0 0 20px', flex: 1 }}>{c.summary}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 16 }}>
          {c.metrics.map((m, i) => (
            <div key={i} style={{ background: '#F4F4F5', border: '1px solid #E8E8E8', padding: 10 }}>
              <div style={{ color: '#3F6EE8', fontSize: 14, fontWeight: 700 }}>{m}</div>
              <div style={{ color: '#AAA', fontSize: 9, marginTop: 2 }}>{c.metricLabels[i]}</div>
            </div>
          ))}
        </div>
        <div style={{ color: '#3F6EE8', fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>Читать кейс →</div>
      </div>
    </button>
  );
}

function Cases({ onCaseClick }) {
  return (
    <section style={{ background: '#F4F4F5', padding: '96px 0' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>
        <Eyebrow color="blue">Кейсы</Eyebrow>
        <h2 style={{ fontSize: 36, fontWeight: 600, color: '#0A0A0A', lineHeight: 1.15, margin: '20px 0 40px' }}>Результаты в цифрах</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {CASES.map(c => <CaseCard key={c.id} c={c} onClick={() => onCaseClick && onCaseClick(c.id)} />)}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Cases, CaseCard });
