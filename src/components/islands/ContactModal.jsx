import { useState, useEffect } from 'react';
import { saveLead } from '@/lib/tracker';
import { reachYandexGoal } from '@/lib/yandexMetrika';
import { X } from 'lucide-react';
import ContactToggleInput from './ContactToggleInput';

const DESTINATIONS = {
  demo: '/demo/',
  signup: 'https://app.shvec.tech/signup',
};

export default function ContactModal({ open, onClose, source = 'modal', mode = 'audit', initial = null }) {
  const [form, setForm] = useState({ name: '', contact: '', website: '', consent: false });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isDemo = mode === 'demo';

  useEffect(() => {
    if (!open) return;
    setForm({
      name: initial?.name || '',
      contact: initial?.contact || '',
      website: '',
      consent: false,
    });
    setSent(false);
    setError('');
  }, [open, initial?.name, initial?.contact, mode]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const intent = e.nativeEvent.submitter?.value || (isDemo ? 'demo' : 'audit');
    setLoading(true);
    setError('');

    if (form.website) {
      setSent(true);
      setLoading(false);
      return;
    }

    const name = form.name.trim();
    const contact = form.contact.trim();
    if (name.length < 2 || name.length > 100) {
      setError('Имя 2–100 символов'); setLoading(false); return;
    }
    if (contact.length < 3 || contact.length > 100) {
      setError('Контакт 3–100 символов'); setLoading(false); return;
    }
    const isPhone = /^\+\d{10,15}$/.test(contact.replace(/[\s\-()]/g, ''));
    const isTg = /^@?[a-zA-Z0-9_]{5,32}$/.test(contact);
    if (!isPhone && !isTg) {
      setError(contact.startsWith('@')
        ? 'Ник Telegram: минимум 5 символов, только буквы, цифры и _'
        : 'Введите телефон (+7...) или Telegram (@username)');
      setLoading(false);
      return;
    }

    try {
      await saveLead({
        name,
        contact,
        contact_type: isPhone ? 'phone' : 'telegram',
        source_block: `${source}:${intent}`,
        website: form.website,
      });
      reachYandexGoal('reg_ok');
      setSent(true);
      const destination = DESTINATIONS[intent];
      if (destination) window.setTimeout(() => { window.location.href = destination; }, 500);
    } catch (err) {
      setError(err.message || 'Что-то пошло не так. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    window.setTimeout(() => { setSent(false); setError(''); }, 300);
  };

  return (
    <div
      data-track="modal_overlay_close"
      data-track-block="contact_modal"
      className="lead-modal-overlay"
      style={{ background: 'rgba(10,10,10,0.76)', backdropFilter: 'blur(5px)' }}
      onClick={handleClose}
    >
      <div
        className={`lead-modal-card lead-modal-card--${mode}`}
        role="dialog"
        aria-modal="true"
        aria-label={isDemo ? 'Попробовать систему' : 'Получить аудит'}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          data-track="modal_close"
          data-track-block="contact_modal"
          onClick={handleClose}
          className="lead-modal-close"
          aria-label="Закрыть"
        >
          <X size={22} />
        </button>

        {!isDemo && <div className="lead-modal-badge">Бесплатно · ответ за 5 минут</div>}

        <h3 className="lead-modal-title">
          {isDemo ? 'Попробовать систему' : 'Получите разбор вашего бизнеса'}
        </h3>
        <p className="lead-modal-description">
          {isDemo
            ? 'Загрузите свои данные для бесплатного анализа или начните с демо-версии. Если нужна помощь — поможем с разбором.'
            : 'Разберём слепые зоны и покажем точки роста. Бесплатно, ответим в Telegram или по телефону за 5 минут.'}
        </p>

        {sent ? (
          <div className="lead-modal-success">
            <div className="lead-modal-success-mark">✓</div>
            <div className="lead-modal-success-title">Контакт получен</div>
            <p>{isDemo ? 'Открываем выбранный сценарий…' : 'Ответим в течение 5 минут'}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="lead-form">
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
              aria-hidden="true"
            />
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ваше имя"
              aria-label="Имя"
              className="lead-input"
            />
            <ContactToggleInput
              dark
              value={form.contact}
              onChange={(value) => { setForm({ ...form, contact: value }); setError(''); }}
              trackBlock={isDemo ? 'demo_modal' : 'audit_modal'}
            />

            {error && <p className="lead-form-error">{error}</p>}

            <div className={`lead-actions${isDemo ? ' lead-actions--demo' : ' lead-actions--audit'}`}>
              {isDemo ? (
                <>
                  <button
                    type="submit"
                    name="intent"
                    value="demo"
                    className="btn btn-on-dark lead-action"
                    disabled={loading || !form.consent}
                    data-track="demo_modal_open"
                    data-track-block="demo_modal"
                  >
                    {loading ? 'Отправляем…' : 'Открыть демо-версию'}
                  </button>
                  <button
                    type="submit"
                    name="intent"
                    value="signup"
                    className="btn lead-action lead-action-muted"
                    disabled={loading || !form.consent}
                    data-track="demo_modal_signup"
                    data-track-block="demo_modal"
                  >
                    Загрузить мои данные
                  </button>
                  <button
                    type="submit"
                    name="intent"
                    value="audit"
                    className="btn btn-secondary lead-action lead-action-help"
                    disabled={loading || !form.consent}
                    data-track="demo_modal_audit"
                    data-track-block="demo_modal"
                  >
                    Получить помощь с разбором
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  name="intent"
                  value="audit"
                  className="btn btn-on-dark lead-action"
                  disabled={loading || !form.consent}
                  data-track="audit_modal_submit"
                  data-track-block="audit_modal"
                >
                  {loading ? 'Отправляем…' : 'Получить аудит'}
                </button>
              )}
            </div>

            <label className="lead-consent">
              <input
                type="checkbox"
                required
                checked={form.consent}
                onChange={(e) => setForm({ ...form, consent: e.target.checked })}
              />
              <span>
                Нажимая кнопку, я соглашаюсь с{' '}
                <a href="/privacy-policy" target="_blank" rel="noopener">Политикой обработки ПДн</a>{' '}
                и <a href="/consent" target="_blank" rel="noopener">Согласием на обработку ПДн</a>
              </span>
            </label>
          </form>
        )}
      </div>
    </div>
  );
}
