import { useState } from 'react';
import { saveLead } from '@/lib/tracker';
import ContactToggleInput from './ContactToggleInput';

// ---------------------------------------------------------------------------
// Facts data
// ---------------------------------------------------------------------------
const facts = [
  { num: '30 мин', label: 'разбор бизнеса' },
  { num: '0 ₽', label: 'первая консультация' },
  { num: '1 день', label: 'до конкретных шагов' },
];

// ---------------------------------------------------------------------------
// Input style helpers
// ---------------------------------------------------------------------------
const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff',
  padding: '12px 16px',
  fontSize: 13,
  outline: 'none',
  boxSizing: 'border-box',
  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)',
};

// ---------------------------------------------------------------------------
// SuccessState
// ---------------------------------------------------------------------------
function SuccessState() {
  return (
    <div style={{ textAlign: 'center', padding: '32px 0' }}>
      <svg width="48" height="48" viewBox="0 0 256 256" style={{ margin: '0 auto 16px' }}>
        <polygon points="0,0 256,0 256,208 208,256 0,256" fill="rgba(255,255,255,0.06)" />
        <polygon points="72,64 192,64 192,148 156,184 72,184" fill="#3F6EE8" />
      </svg>
      <div style={{ color: '#fff', fontWeight: 600, fontSize: 16, marginBottom: 6 }}>Заявка принята</div>
      <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>Свяжемся в течение часа</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DiagnosisForm
// ---------------------------------------------------------------------------
function DiagnosisForm() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Honeypot
    if (honeypot) { setSent(true); return; }

    const trimName = name.trim();
    const trimContact = contact.trim();

    // Validate name
    if (trimName.length < 2 || trimName.length > 100) {
      setError('Имя 2–100 символов');
      return;
    }

    // Validate contact
    if (trimContact.length < 3 || trimContact.length > 100) {
      setError('Контакт 3–100 символов');
      return;
    }
    const cleanContact = trimContact.replace(/[\s\-()+]/g, '');
    const isPhone = /^\+?\d{10,15}$/.test(cleanContact) || /^\+7\d{10}$/.test('+7' + cleanContact);
    const phoneTest = /^\+\d{10,15}$/.test(trimContact.replace(/[\s\-()]/g, ''));
    const isTg = /^@?[a-zA-Z0-9_]{5,32}$/.test(trimContact);
    if (!phoneTest && !isTg) {
      if (trimContact.startsWith('@')) {
        const handle = trimContact.slice(1);
        setError(handle.length < 5 ? 'Ник Telegram: минимум 5 символов' : 'Ник Telegram: только буквы, цифры и _');
      } else {
        setError('Введи телефон (+7...) или telegram (@username)');
      }
      return;
    }

    const contact_type = phoneTest ? 'phone' : 'telegram';

    setLoading(true);
    try {
      await saveLead({
        name: trimName,
        contact: trimContact,
        contact_type,
        source_block: 'diagnosis',
        website: honeypot,
      });
      setSent(true);
    } catch (err) {
      setError(err.message || 'Что-то пошло не так. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) return <SuccessState />;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Honeypot */}
      <input
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      {/* Name */}
      <div>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>
          Имя
        </label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Александр"
          style={inputStyle}
          onFocus={(e) => { e.target.style.borderColor = 'rgba(63,110,232,0.6)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
        />
      </div>

      {/* Telegram / Phone */}
      <ContactToggleInput
        dark={true}
        value={contact}
        onChange={setContact}
      />

      {/* Consent 152-FZ */}
      <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', cursor: 'pointer' }}>
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          style={{ marginTop: 3, accentColor: '#3F6EE8', flexShrink: 0 }}
        />
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>
          Я ознакомлен(-а) и согласен(-а) с{' '}
          <a href="/privacy-policy" target="_blank" style={{ color: '#3F6EE8', textDecoration: 'underline' }}>
            Политикой обработки ПДн
          </a>
          {' '}и{' '}
          <a href="/consent" target="_blank" style={{ color: '#3F6EE8', textDecoration: 'underline' }}>
            Согласием на обработку ПДн
          </a>
        </span>
      </label>

      {/* Error */}
      {error && (
        <p style={{ color: '#E5484D', fontSize: 12, margin: 0 }}>{error}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        data-track="diagnosis_submit"
        data-track-block="diagnosis"
        style={{
          width: '100%',
          padding: '13px 0',
          fontSize: 13,
          fontWeight: 600,
          background: loading ? 'rgba(63,110,232,0.6)' : '#3F6EE8',
          color: '#fff',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)',
          transition: 'background 0.15s',
          opacity: loading ? 0.7 : 1,
        }}
        onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = '#2D5BD4'; }}
        onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = '#3F6EE8'; }}
      >
        {loading ? 'Отправляем...' : 'Начать диагностику'}
      </button>

      {/* Sub-note */}
      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', textAlign: 'center', margin: 0 }}>
        Никаких презентаций. Только разбор вашей ситуации.
      </p>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function Diagnosis() {
  return (
    <section
      id="diagnosis"
      style={{
        background: '#0A0A0A',
        scrollMarginTop: 72,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(48px, 6vw, 72px) clamp(24px, 5vw, 64px)',
          display: 'flex',
          gap: 48,
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {/* Left block */}
        <div style={{ flex: '1 1 320px', maxWidth: 560 }}>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 24, height: 2, background: '#3F6EE8', flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#3F6EE8' }}>
              Диагностика
            </span>
          </div>

          {/* Heading */}
          <h2
            style={{
              fontSize: 'clamp(26px, 3.5vw, 36px)',
              fontWeight: 700,
              lineHeight: 1.15,
              color: '#fff',
              margin: '0 0 16px',
            }}
          >
            30 минут на разбор бизнеса —<br />бесплатно, без подготовки
          </h2>

          {/* Sub */}
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.5)',
              maxWidth: 420,
              margin: 0,
            }}
          >
            Покажем где у вас теряется прибыль и какой
            из четырёх продуктов AIVISION закрывает запрос.
          </p>

          {/* Facts */}
          <div style={{ display: 'flex', gap: 32, marginTop: 40, flexWrap: 'wrap' }}>
            {facts.map((f) => (
              <div key={f.num}>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: '#3F6EE8',
                    fontVariantNumeric: 'tabular-nums',
                    lineHeight: 1.1,
                    marginBottom: 4,
                  }}
                >
                  {f.num}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.35)',
                    maxWidth: 100,
                    lineHeight: 1.4,
                  }}
                >
                  {f.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right block — form */}
        <div style={{ flex: '0 0 340px', width: 340, maxWidth: '100%' }}>
          <DiagnosisForm />
        </div>
      </div>
    </section>
  );
}
