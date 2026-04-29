// Comparison + contact form section

const CLASSIC = ['Рекомендации', 'Отчёт в PDF', 'Нет внедрения и контроля', 'Нет цифровой системы'];
const AIV = ['Проектирование управленческой архитектуры', 'Внедрение KPI', 'Создание BI-системы', 'Интеграции и автоматизация', 'Регламент управленческого ритма'];

function ComparisonWithForm() {
  const [form, setForm] = React.useState({ name: '', contact: '' });
  const [mode, setMode] = React.useState('phone');
  const [sent, setSent] = React.useState(false);
  const submit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <section style={{ background: '#F0F2F5', padding: '128px 0' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>
        <Eyebrow color="black">Отличие</Eyebrow>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0A0A0A', margin: '24px 0 48px' }}>
          Чем AIVISION отличается от классического консалтинга
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {/* Classic */}
          <div style={{ background: '#fff', border: '1px solid #E8E8E8', padding: 32 }}>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#E5484D', marginBottom: 24 }}>Обычный консалтинг</div>
            {CLASSIC.map((it, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: i < CLASSIC.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
                <div style={{ width: 8, height: 1, background: '#E5484D' }} />
                <span style={{ color: '#666', fontSize: 14 }}>{it}</span>
              </div>
            ))}
          </div>
          {/* AIVISION */}
          <div style={{ background: '#3F6EE8', padding: 32 }}>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#fff', marginBottom: 24 }}>AIVISION</div>
            {AIV.map((it, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: i < AIV.length - 1 ? '1px solid #5b7fec' : 'none' }}>
                <div style={{ width: 6, height: 6, background: '#fff' }} />
                <span style={{ color: '#fff', fontSize: 14 }}>{it}</span>
              </div>
            ))}
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid #5b7fec' }}>
              <p style={{ color: '#fff', fontSize: 14, lineHeight: 1.55, fontWeight: 600, margin: 0 }}>Мы не даём советы. Мы строим систему и ведём бизнес к результату</p>
            </div>
          </div>
          {/* Form */}
          <div style={{ background: '#0A0A0A', padding: 32 }}>
            <Eyebrow color="blue">Диагностика</Eyebrow>
            <h3 style={{ color: '#fff', fontSize: 22, fontWeight: 700, lineHeight: 1.25, margin: '20px 0 16px' }}>Вы управляете бизнесом или бизнес управляет вашими деньгами?</h3>
            <p style={{ color: '#999', fontSize: 13, lineHeight: 1.55, margin: '0 0 24px' }}>Оставьте контакт — свяжемся в течение минуты и расскажем, как выстроить систему управляемой прибыли.</p>
            {sent ? (
              <div style={{ padding: '32px 0', textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, background: '#3F6EE8', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', clipPath: chamfer(16) }}>
                  <div style={{ width: 14, height: 14, background: '#fff' }} />
                </div>
                <div style={{ color: '#fff', fontWeight: 600, marginBottom: 6 }}>Заявка принята</div>
                <p style={{ color: '#666', fontSize: 12, margin: 0 }}>Свяжемся в течение минуты</p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 10, color: '#666', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8 }}>Имя</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя"
                    style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2A2A2A', color: '#fff', fontSize: 14, padding: '12px 16px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <div style={{ display: 'flex', gap: 0, marginBottom: 8, background: '#1a1a1a', border: '1px solid #2A2A2A', width: 'fit-content' }}>
                    {['phone', 'telegram'].map(m => (
                      <button key={m} type="button" onClick={() => setMode(m)} style={{ padding: '6px 14px', fontSize: 11, border: 'none', background: mode === m ? '#3F6EE8' : 'transparent', color: mode === m ? '#fff' : '#666', cursor: 'pointer', fontFamily: 'inherit' }}>{m === 'phone' ? 'Телефон' : 'Telegram'}</button>
                    ))}
                  </div>
                  <input required value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} placeholder={mode === 'phone' ? '+7 999 000 00 00' : '@username'}
                    style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2A2A2A', color: '#fff', fontSize: 14, padding: '12px 16px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                </div>
                <Button fullWidth>Узнать подробнее</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: '#fff', borderTop: '1px solid #E8E8E8', padding: '40px 24px' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="../../assets/aivision-logo.png" style={{ width: 28, height: 28, objectFit: 'contain' }} />
          <span style={{ fontWeight: 700, color: '#0A0A0A', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em' }}>AIVISION</span>
        </div>
        <p style={{ color: '#888', fontSize: 12, margin: 0 }}>Мы внедряем систему, в которой бизнес начинает показывать правду в цифрах</p>
        <p style={{ color: '#BBB', fontSize: 12, margin: 0 }}>© 2025 AiVision</p>
      </div>
    </footer>
  );
}

// Contact modal
function ContactModal({ open, onClose }) {
  const [form, setForm] = React.useState({ name: '', contact: '' });
  const [sent, setSent] = React.useState(false);
  if (!open) return null;
  const submit = (e) => { e.preventDefault(); setSent(true); };
  const close = () => { onClose(); setTimeout(() => setSent(false), 300); };
  return (
    <div onClick={close} style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(4px)' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#181818', width: '100%', maxWidth: 440, padding: 32, clipPath: chamfer(28), position: 'relative' }}>
        <button onClick={close} style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 18 }}>×</button>
        <Eyebrow color="blue">Узнать подробнее</Eyebrow>
        <h3 style={{ color: '#fff', fontSize: 22, fontWeight: 700, lineHeight: 1.3, margin: '16px 0 6px' }}>Оставьте контакт</h3>
        <p style={{ color: '#555', fontSize: 13, margin: '0 0 28px' }}>Свяжемся в течение минуты</p>
        {sent ? (
          <div style={{ padding: '24px 0', textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, background: '#3F6EE8', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', clipPath: chamfer(16) }}>
              <div style={{ width: 12, height: 12, background: '#fff' }} />
            </div>
            <div style={{ color: '#fff', fontWeight: 600, marginBottom: 4 }}>Заявка принята</div>
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 10, color: '#555', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8 }}>Имя</label>
              <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" style={{ width: '100%', background: '#252525', border: '1px solid #2A2A2A', color: '#fff', fontSize: 14, padding: '12px 16px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 10, color: '#555', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8 }}>Контакт</label>
              <input required value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} placeholder="+7 или @telegram" style={{ width: '100%', background: '#252525', border: '1px solid #2A2A2A', color: '#fff', fontSize: 14, padding: '12px 16px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            </div>
            <Button fullWidth>Узнать подробнее</Button>
          </form>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { ComparisonWithForm, Footer, ContactModal });
