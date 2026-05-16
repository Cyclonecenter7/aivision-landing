import { useState } from 'react';

export default function FinalCTA({ onOpenContact }) {
  const [name, setName] = useState('');
  const [mode, setMode] = useState('telegram');
  const [contact, setContact] = useState('');
  const [consent, setConsent] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    let preparedContact = contact.trim();
    if (mode === 'telegram' && preparedContact && !preparedContact.startsWith('@')) {
      preparedContact = '@' + preparedContact.replace(/^@+/, '');
    }
    onOpenContact({ name: name.trim(), contact: preparedContact });
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
              <div className="cta-stat-val">1 день</div>
              <div className="cta-stat-lab">до конкретных шагов</div>
            </div>
          </div>
        </div>

        <form className="cta-form" onSubmit={handleSubmit}>
          <div className="cta-field">
            <div className="cta-field-lab">Имя</div>
            <input
              className="cta-input"
              placeholder="Александр"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="cta-field">
            <div className="cta-toggle">
              <button
                type="button"
                className={`cta-toggle-btn ${mode === 'telegram' ? 'active' : ''}`}
                onClick={() => { setMode('telegram'); setContact(''); }}
              >
                Telegram
              </button>
              <button
                type="button"
                className={`cta-toggle-btn ${mode === 'phone' ? 'active' : ''}`}
                onClick={() => { setMode('phone'); setContact(''); }}
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

          <button
            type="submit"
            className="cta-submit"
            data-track="final_form_submit"
            data-track-block="final_cta"
            disabled={!consent}
            style={!consent ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
          >
            Начать диагностику
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <div className="cta-after">Никаких презентаций. Только разбор вашей ситуации.</div>
        </form>
      </div>
    </section>
  );
}
