import { useState } from 'react';
import { saveLead } from '@/lib/tracker';
import { reachYandexGoal } from '@/lib/yandexMetrika';
import ContactToggleInput from './ContactToggleInput';

export default function InlineLeadForm({ sourceBlock = 'final_cta' }) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (website) {
      setSent(true);
      setLoading(false);
      return;
    }

    const trimmedName = name.trim();
    let preparedContact = contact.trim();
    if (!preparedContact.startsWith('+') && preparedContact && !preparedContact.startsWith('@')) {
      preparedContact = '@' + preparedContact.replace(/^@+/, '');
    }

    if (trimmedName.length < 2 || trimmedName.length > 100) {
      setError('Имя 2–100 символов');
      setLoading(false);
      return;
    }
    if (preparedContact.length < 3 || preparedContact.length > 100) {
      setError('Контакт 3–100 символов');
      setLoading(false);
      return;
    }
    const isPhone = /^\+\d{10,15}$/.test(preparedContact.replace(/[\s\-()]/g, ''));
    const isTg = /^@?[a-zA-Z0-9_]{5,32}$/.test(preparedContact);
    if (!isPhone && !isTg) {
      setError('Введите телефон (+7...) или Telegram (@username)');
      setLoading(false);
      return;
    }

    try {
      await saveLead({
        name: trimmedName,
        contact: preparedContact,
        contact_type: isPhone ? 'phone' : 'telegram',
        source_block: sourceBlock,
        website,
      });
      reachYandexGoal('reg_ok');
      setSent(true);
    } catch (err) {
      setError(err.message || 'Что-то пошло не так. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="cta-form cta-form-sent">
        <svg width="48" height="48" viewBox="0 0 256 256" style={{ marginBottom: 16 }}>
          <polygon points="0,0 256,0 256,208 208,256 0,256" fill="#0A0A0A" />
          <polygon points="72,64 192,64 192,148 156,184 72,184" fill="#3F6EE8" />
        </svg>
        <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--d-text)', marginBottom: 8 }}>Заявка принята</div>
        <p style={{ fontSize: 14, color: 'var(--d-text-sec)', marginBottom: 24 }}>
          Свяжемся в течение 5 минут
        </p>
        <div style={{ borderTop: '1px solid var(--d-border)', paddingTop: 20, width: '100%' }}>
          <p style={{ fontSize: 12, color: 'var(--d-text-mut)', marginBottom: 12, lineHeight: 1.5 }}>
            Пока мы связываемся —<br />посмотрите будущую систему
          </p>
          <a
            href="/demo/"
            className="js-open-demo"
            data-source="final_cta_success_demo"
            data-track="final_cta_demo"
            data-track-block="final_cta"
            style={{ color: 'var(--brand)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}
          >
            Посмотреть демо →
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className="cta-form lead-form" onSubmit={handleSubmit}>
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

      <div className="lead-form-head">
        <div className="lead-modal-badge">Бесплатно · ответ за 5 минут</div>
        <h3>Получите разбор вашего бизнеса</h3>
        <p>Разберём слепые зоны и покажем точки роста. Бесплатно, ответим в Telegram или по телефону за 5 минут.</p>
      </div>

      <input
        className="lead-input"
        aria-label="Имя"
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <ContactToggleInput
        dark
        value={contact}
        onChange={(value) => { setContact(value); setError(''); }}
        trackBlock="final_cta"
      />

      {error && <p style={{ color: 'var(--crimson)', fontSize: 12 }}>{error}</p>}

      <div className="lead-actions lead-actions--audit">
        <button
          type="submit"
          className="btn btn-on-dark lead-action"
          data-track="final_form_submit"
          data-track-block="final_cta"
          disabled={!consent || loading}
        >
          {loading ? 'Отправляем…' : 'Получить аудит'}
        </button>
      </div>

      <label className="cta-consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span>
          Нажимая кнопку, я соглашаюсь с{' '}
          <a href="/privacy-policy" target="_blank" rel="noopener">Политикой обработки ПДн</a>{' '}
          и <a href="/consent" target="_blank" rel="noopener">Согласием на обработку ПДн</a>
        </span>
      </label>
    </form>
  );
}
