import { useState } from 'react';
import { saveLead } from '@/lib/tracker';

export default function FinalCTA() {
  const [name, setName] = useState('');
  const [mode, setMode] = useState('telegram');
  const [contact, setContact] = useState('');
  const [consent, setConsent] = useState(true);
  const [website, setWebsite] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (website) { setSent(true); setLoading(false); return; }

    const trimmedName = name.trim();
    let preparedContact = contact.trim();
    if (mode === 'telegram' && preparedContact && !preparedContact.startsWith('@')) {
      preparedContact = '@' + preparedContact.replace(/^@+/, '');
    }

    if (trimmedName.length < 2 || trimmedName.length > 100) {
      setError('Имя 2–100 символов'); setLoading(false); return;
    }
    if (preparedContact.length < 3 || preparedContact.length > 100) {
      setError('Контакт 3–100 символов'); setLoading(false); return;
    }
    const isPhone = /^\+\d{10,15}$/.test(preparedContact.replace(/[\s\-()]/g, ''));
    const isTg    = /^@?[a-zA-Z0-9_]{5,32}$/.test(preparedContact);
    if (!isPhone && !isTg) {
      setError('Введите телефон (+7...) или Telegram (@username)');
      setLoading(false); return;
    }

    try {
      await saveLead({
        name: trimmedName,
        contact: preparedContact,
        contact_type: isPhone ? 'phone' : 'telegram',
        source_block: 'final_cta',
        website,
      });
      setSent(true);
    } catch (err) {
      setError(err.message || 'Что-то пошло не так. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cta" className="bg-dark cta-section">
      <div className="cta-wrap">
        <div className="cta-left">
          <div className="eyebrow">
            <div className="eyebrow-line"></div>
            <span className="eyebrow-text">Диагностика</span>
          </div>

          <h2 className="cta-h2">Разберём ваш бизнес<br />за <em>30 минут</em></h2>

          <p className="cta-sub">
            Покажем где у вас проблема — в видимости, контроле или управляемости.
            Покажем платформу на demo-данных, ответим на вопросы.
          </p>

          <div className="cta-stats">
            <div className="cta-stat">
              <div className="cta-stat-val">30 мин</div>
              <div className="cta-stat-lab">разбор бизнеса</div>
            </div>
            <div className="cta-stat">
              <div className="cta-stat-val">0 ₽</div>
              <div className="cta-stat-lab">первая консультация</div>
            </div>
            <div className="cta-stat">
              <div className="cta-stat-val">5 минут</div>
              <div className="cta-stat-lab">реакция на заявку</div>
            </div>
          </div>
        </div>

        {sent ? (
          <div className="cta-form cta-form-sent">
            <svg width="48" height="48" viewBox="0 0 256 256" style={{ marginBottom: 16 }}>
              <polygon points="0,0 256,0 256,208 208,256 0,256" fill="#0A0A0A" />
              <polygon points="72,64 192,64 192,148 156,184 72,184" fill="#3F6EE8" />
            </svg>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Заявка принята</div>
            <p style={{ fontSize: 14, color: 'var(--d-text-sec)', marginBottom: 24 }}>
              Свяжемся в течение 5 минут
            </p>
            <div style={{ borderTop: '1px solid var(--d-border)', paddingTop: 20, width: '100%' }}>
              <p style={{ fontSize: 12, color: 'var(--d-text-mut)', marginBottom: 12, lineHeight: 1.5 }}>
                Пока мы связываемся —<br />посмотрите будущую систему
              </p>
              <a
                href="/demo/"
                target="_blank"
                rel="noopener"
                data-track="final_cta_demo"
                data-track-block="final_cta"
                style={{ color: 'var(--brand)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}
              >
                Открыть демо платформы →
              </a>
            </div>
          </div>
        ) : (
          <form className="cta-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
              aria-hidden="true"
            />

            <div className="cta-field">
              <div className="cta-field-lab">Имя</div>
              <input
                className="cta-input"
                placeholder="Александр"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="cta-field">
              <div className="cta-toggle">
                <button
                  type="button"
                  className={`cta-toggle-btn ${mode === 'telegram' ? 'active' : ''}`}
                  onClick={() => { setMode('telegram'); setContact(''); setError(''); }}
                >
                  Telegram
                </button>
                <button
                  type="button"
                  className={`cta-toggle-btn ${mode === 'phone' ? 'active' : ''}`}
                  onClick={() => { setMode('phone'); setContact(''); setError(''); }}
                >
                  Телефон
                </button>
              </div>
            </div>

            <div className="cta-field">
              <input
                className="cta-input"
                type={mode === 'phone' ? 'tel' : 'text'}
                placeholder={mode === 'telegram' ? '@username' : '+7 (000) 000 00 00'}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>

            <label className="cta-consent">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <span>
                Я ознакомлен(-а) и согласен(-а) с{' '}
                <a href="/privacy-policy" target="_blank" rel="noopener">Политикой обработки ПДн</a>{' '}
                и{' '}
                <a href="/consent" target="_blank" rel="noopener">Согласием на обработку ПДн</a>
              </span>
            </label>

            {error && (
              <p style={{ color: 'var(--crimson)', fontSize: 12 }}>{error}</p>
            )}

            <button
              type="submit"
              className="cta-submit"
              data-track="final_form_submit"
              data-track-block="final_cta"
              disabled={!consent || loading}
              style={!consent || loading ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
            >
              {loading ? 'Отправляем…' : 'Начать диагностику'}
              {!loading && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </button>

            <div className="cta-after">Никаких презентаций. Только разбор вашей ситуации.</div>
          </form>
        )}
      </div>
    </section>
  );
}
