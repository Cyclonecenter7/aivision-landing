// Hero section — left text + right tabbed dashboard mock

const HERO_TABS = ['Дашборд', 'Операции', 'Сделки', 'PnL', 'Воронка', 'Товары'];

function HeroDashboardSlide() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#0A0A0A' }}>Дашборд продаж · Апрель 2026</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        {[
          { label: 'МАРЖА', month: '376 185', delta: '+93%', c: '#16a34a' },
          { label: 'ОБОРОТ', month: '649 351', delta: '+9%', c: '#3F6EE8' },
          { label: 'РАСХОДЫ', month: '273 166', delta: '−32%', c: '#E5484D' },
        ].map(m => (
          <div key={m.label} style={{ background: '#fff', border: '1px solid #E8E8E8', padding: 8 }}>
            <div style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '.12em', color: '#AAA', fontWeight: 600 }}>{m.label}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: m.c, marginTop: 3 }}>₽{m.month}</div>
            <div style={{ fontSize: 9, color: m.c, fontWeight: 600, marginTop: 2 }}>{m.delta}</div>
          </div>
        ))}
      </div>
      <div style={{ background: '#fff', border: '1px solid #E8E8E8', padding: 10, marginTop: 4 }}>
        <div style={{ fontSize: 9, color: '#AAA', marginBottom: 6 }}>Статистика по дням · Апрель</div>
        {[['01.04','12 400','18 000','5 600'],['02.04','9 200','14 500','5 300'],['03.04','15 800','22 000','6 200']].map((row,i) => (
          <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:8, padding:'6px 0', borderTop: i ? '1px solid #F0F0F0' : 'none', fontSize: 10 }}>
            <div style={{ color: '#888' }}>{row[0]}</div>
            <div style={{ color: '#16a34a', fontWeight:600 }}>{row[1]}</div>
            <div style={{ color: '#444' }}>{row[2]}</div>
            <div style={{ color: '#E5484D' }}>{row[3]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroDashboard() {
  const [active, setActive] = React.useState(0);
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setActive(p => (p+1) % HERO_TABS.length); setVisible(true); }, 200);
    }, 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ background: '#fff', border: '1px solid #E8E8E8', padding: 20 }}>
      <Kicker style={{ marginBottom: 12 }}>Система в действии</Kicker>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
        {HERO_TABS.map((name, i) => (
          <button key={i} onClick={() => { setVisible(false); setTimeout(() => { setActive(i); setVisible(true); }, 150); }}
            style={{
              fontSize: 10, fontWeight: 500, padding: '4px 10px', cursor: 'pointer',
              background: i === active ? '#3F6EE8' : '#fff',
              color: i === active ? '#fff' : '#888',
              border: `1px solid ${i === active ? '#3F6EE8' : '#E8E8E8'}`,
              fontFamily: 'inherit',
            }}>{name}</button>
        ))}
      </div>
      <div style={{ background: '#F8F9FC', border: '1px solid #E8E8E8', padding: 12, height: 260, overflow: 'hidden', opacity: visible ? 1 : 0, transition: 'opacity 200ms' }}>
        <HeroDashboardSlide />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 12 }}>
        {HERO_TABS.map((_, i) => (
          <div key={i} style={{
            height: 6, borderRadius: 3, background: i === active ? '#3F6EE8' : '#DDD',
            width: i === active ? 16 : 6, transition: 'all 200ms',
          }} />
        ))}
      </div>
    </div>
  );
}

function Hero({ onCta }) {
  return (
    <section style={{
      minHeight: '100vh', background: '#F0F2F5',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      paddingTop: 64, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4,
        backgroundImage: 'linear-gradient(#E0E4EA 1px, transparent 1px), linear-gradient(90deg, #E0E4EA 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '80px 24px', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'center' }}>
          <div>
            <Eyebrow color="blue">Система управляемой прибыли</Eyebrow>
            <h1 style={{ fontSize: 46, fontWeight: 700, color: '#0A0A0A', lineHeight: 1.1, letterSpacing: '-0.02em', margin: '24px 0', }}>
              Бизнес растёт —<br />но внутри <span style={{ color: '#3F6EE8' }}>хаос</span>
            </h1>
            <p style={{ color: '#666', fontSize: 16, lineHeight: 1.65, marginBottom: 32, maxWidth: 420 }}>
              Наводим порядок в финансах и управлении: показываем реальную прибыль и собираем систему за 30 дней
            </p>
            <Button onClick={onCta}>Разобрать бизнес</Button>
            <div style={{ marginTop: 14, color: '#AAA', fontSize: 12, lineHeight: 1.7 }}>
              Диагностика 1–2 недели<br />Работаем с бизнесами от 10 млн ₽ / мес
            </div>
          </div>
          <HeroDashboard />
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero });
