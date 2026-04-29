// Products section — three-tier pricing cards (light / blue / dark)

const PRODUCTS = [
  {
    id: '01', name: 'Управленческий\nаудит', duration: '1–2 недели',
    tagline: 'Глубокая диагностика бизнеса за 1–2 недели',
    results: [
      ['BarChart2', 'Чёткое понимание, где теряются деньги'],
      ['Target', 'Понимание, что внедрять'],
      ['TrendingUp', 'План развития бизнеса'],
    ],
    items: ['Карта утечек прибыли', 'Анализ управленческих рисков', 'Диагностика финансовой логики', 'Структура KPI', 'Цифровая архитектура', 'План перехода'],
    price: 'от 50 000 ₽', theme: 'light',
  },
  {
    id: '02', name: 'Система управляемой\nприбыли', duration: '30 дней',
    tagline: 'Вы управляете бизнесом через цифры, а не через интуицию.',
    results: [
      ['Diamond', 'Единый центр управления'],
      ['Shield', 'Вы видите прибыль'],
      ['TrendingUp', 'Появляется управляемость'],
    ],
    items: ['Управленческий аудит', 'Центр управления', 'Прозрачная прибыль', 'KPI по отделам', 'План-факт контроль', 'BI-отчётность', 'Регламент решений'],
    price: 'от 100 000 ₽', theme: 'blue',
  },
  {
    id: '03', name: 'Контур роста', duration: 'Партнёрство',
    tagline: 'Мы берём ответственность за ваш рост',
    results: [
      ['Settings', 'Полностью управляемая система'],
      ['Shield', 'Минимальная зависимость от ручного контроля'],
      ['Handshake', 'Поддержка и контроль'],
    ],
    items: ['Управленческий аудит', 'Система управляемой прибыли', 'Предиктивная аналитика', 'Контроль маржи в реальном времени', 'Оповещания по рискам', 'Системные совещания'],
    price: 'Индивидуально', theme: 'dark',
  },
];

// Tiny inline icons (Lucide-style strokes) — we load lucide-static from CDN too, but inline keeps the kit self-contained for preview
const Icons = {
  BarChart2: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Target: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  TrendingUp: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  Diamond: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z"/></svg>,
  Shield: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Settings: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Handshake: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/></svg>,
};

const PRODUCT_THEMES = {
  light: { card: { background: '#fff', border: '1px solid #E8E8E8' }, title: '#0A0A0A', duration: '#888', kicker: '#999',
    resultBg: '#F0F3FA', resultBorder: '1px solid #E4E8F0', resultIcon: '#3F6EE8', resultText: '#333',
    item: '#555', tagline: '#999', price: '#0A0A0A', btnVariant: 'primary', idVariant: 'blue' },
  blue: { card: { background: '#3F6EE8', border: 'none' }, title: '#fff', duration: 'rgba(255,255,255,.85)', kicker: 'rgba(255,255,255,.75)',
    resultBg: 'rgba(255,255,255,.15)', resultBorder: 'none', resultIcon: '#fff', resultText: '#fff',
    item: '#E9EEFC', tagline: 'rgba(255,255,255,.7)', price: '#fff', btnVariant: 'invert', idVariant: 'white' },
  dark: { card: { background: '#181818', border: 'none' }, title: '#fff', duration: '#666', kicker: '#555',
    resultBg: '#252525', resultBorder: 'none', resultIcon: '#3F6EE8', resultText: '#ccc',
    item: '#aaa', tagline: '#555', price: '#fff', btnVariant: 'primary', idVariant: 'blue' },
};

function ProductCard({ p, onCta }) {
  const t = PRODUCT_THEMES[p.theme];
  return (
    <div style={{ ...t.card, padding: 28, display: 'flex', flexDirection: 'column', clipPath: chamfer(28) }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <NumberBadge n={p.id} variant={t.idVariant} />
        <span style={{ fontSize: 12, fontWeight: 500, color: t.duration }}>{p.duration}</span>
      </div>
      <h3 style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.25, color: t.title, margin: '20px 0 0', whiteSpace: 'pre-line', minHeight: 64 }}>{p.name}</h3>
      <div style={{ paddingTop: 16 }}>
        <Kicker color={t.kicker} style={{ marginBottom: 12 }}>Результат</Kicker>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
          {p.results.map(([ic, label], i) => (
            <div key={i} style={{ background: t.resultBg, border: t.resultBorder, padding: 8, display: 'flex', flexDirection: 'column', gap: 6, clipPath: chamfer(10), color: t.resultIcon }}>
              {Icons[ic]}
              <span style={{ fontSize: 11, lineHeight: 1.25, fontWeight: 500, color: t.resultText }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 18 }}>
        {p.items.map((it, i) => <div key={i} style={{ fontSize: 13, lineHeight: 1.5, color: t.item }}>{it}</div>)}
      </div>
      <div style={{ flex: 1 }} />
      <p style={{ fontSize: 12, lineHeight: 1.55, color: t.tagline, padding: '16px 0' }}>{p.tagline}</p>
      <div style={{ fontSize: 28, fontWeight: 700, color: t.price, paddingBottom: 16 }}>{p.price}</div>
      <Button variant={t.btnVariant} onClick={onCta} fullWidth>Узнать подробнее</Button>
    </div>
  );
}

function Products({ onCta }) {
  return (
    <section style={{ background: '#F0F2F5', padding: '64px 0' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>
        <Eyebrow color="blue">Продукты</Eyebrow>
        <h2 style={{ fontSize: 36, fontWeight: 600, color: '#0A0A0A', margin: '16px 0 24px' }}>Три уровня системы</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {PRODUCTS.map(p => <ProductCard key={p.id} p={p} onCta={onCta} />)}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Products, ProductCard });
