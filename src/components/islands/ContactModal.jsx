import { useState, useEffect } from 'react';
import { saveLead } from '@/lib/tracker';
import { reachYandexGoal } from '@/lib/yandexMetrika';
import { X } from 'lucide-react';
import ContactToggleInput from './ContactToggleInput';
import { Btn } from '@/components/ui';

const clipCard = 'polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)';
export default function ContactModal({ open, onClose, source = 'modal', demoGate = false, initial = null }) {
  const [form, setForm] = useState({ name: '', contact: '', website: '', consent: false });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setForm({
        name: initial?.name || '',
        contact: initial?.contact || '',
        website: '',
        consent: false,
      });
    }
  }, [open, initial?.name, initial?.contact]);

  useEffect(() => {
    if (sent && demoGate) {
      const id = setTimeout(() => { window.location.href = '/demo/'; }, 1500);
      return () => clearTimeout(id);
    }
  }, [sent, demoGate]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Honeypot
    if (form.website) { setSent(true); setLoading(false); return; }
    // Validation
    const name = form.name.trim();
    const contact = form.contact.trim();
    if (name.length < 2 || name.length > 100) {
      setError('Имя 2–100 символов'); setLoading(false); return;
    }
    if (contact.length < 3 || contact.length > 100) {
      setError('Контакт 3–100 символов'); setLoading(false); return;
    }
    const isPhone = /^\+\d{10,15}$/.test(contact.replace(/[\s\-()]/g, ''));
    const isTg    = /^@?[a-zA-Z0-9_]{5,32}$/.test(contact);
    if (!isPhone && !isTg) {
      if (contact.startsWith('@')) {
        const handle = contact.slice(1);
        setError(handle.length < 5 ? 'Ник Telegram: минимум 5 символов' : 'Ник Telegram: только буквы, цифры и _');
      } else {
        setError('Введи телефон (+7...) или telegram (@username)');
      }
      setLoading(false); return;
    }
    try {
      const contact_type = isPhone ? 'phone' : 'telegram';
      await saveLead({ name, contact, contact_type, source_block: source, website: form.website });
      reachYandexGoal('reg_ok');
      setSent(true);
    } catch (err) {
      setError(err.message || 'Что-то пошло не так. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSent(false); setError(''); }, 300);
  };

  return (
    <div
      data-track="modal_overlay_close"
      data-track-block="contact_modal"
      className="lead-modal-overlay"
      style={{ background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={handleClose}
    >
      <div
        className="lead-modal-card"
        role="dialog"
        aria-modal="true"
        aria-label={demoGate ? 'Доступ к демо' : 'Записаться на диагностику'}
        style={{ clipPath: clipCard }}
        onClick={e => e.stopPropagation()}
      >
        <button
          data-track="modal_close"
          data-track-block="contact_modal"
          onClick={handleClose}
          className="absolute top-5 right-5 text-[#555] hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-px bg-blue" />
          <span className="text-blue text-xs font-medium uppercase tracking-widest">
            {demoGate ? 'Доступ к демо' : 'Диагностика'}
          </span>
        </div>

        <h3 className="text-white text-2xl font-bold leading-snug mb-2">
          {demoGate ? 'Откройте демо платформы' : 'Попробовать систему'}
        </h3>
        <p className="text-[#888] text-sm mb-6">
          {demoGate
            ? 'Оставьте контакт — откроем доступ к интерактивному демо.'
            : 'Оставьте контакт — разберём задачу и покажем платформу на демо-данных.'}
        </p>

        {sent ? (
          <div className="py-6 text-center">
            <svg width="48" height="48" viewBox="0 0 256 256" className="mx-auto mb-4">
              <polygon points="0,0 256,0 256,208 208,256 0,256" fill="#0A0A0A" />
              <polygon points="72,64 192,64 192,148 156,184 72,184" fill="#3F6EE8" />
            </svg>
            {demoGate ? (
              <>
                <div className="text-white font-semibold mb-1">Спасибо за контакт</div>
                <p className="text-[#555] text-xs mb-5">Открываем демо…</p>
                <Btn
                  track="modal_demo_gate_open"
                  trackBlock="contact_modal"
                  onClick={() => { window.location.href = '/demo/'; }}
                  className="w-full"
                >
                  Смотреть демо
                </Btn>
              </>
            ) : (
              <>
                <div className="text-white font-semibold mb-1">Заявка принята</div>
                <p className="text-[#555] text-xs mb-6">Свяжемся в течение 5 минут</p>

                <div className="border-t border-[#2A2A2A] pt-5 mt-2">
                  <p className="text-[#888] text-xs mb-3 leading-relaxed">
                    Пока мы связываемся —<br />посмотрите будущую систему
                  </p>
                  <a
                    href="/demo/"
                    data-track="modal_success_demo"
                    data-track-block="contact_modal"
                    className="inline-flex items-center gap-2 text-blue text-sm font-semibold no-underline hover:opacity-80 transition-opacity"
                  >
                    Смотреть демо
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="lead-form">
            {/* Honeypot — скрыто от людей, ловит ботов */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={e => setForm({ ...form, website: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
              aria-hidden="true"
            />
            <input
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Ваше имя"
              aria-label="Имя"
              className="lead-input"
            />
            <ContactToggleInput
              dark={true}
              value={form.contact}
              onChange={val => setForm({ ...form, contact: val })}
              trackBlock="contact_modal"
            />
            <label className="lead-consent">
              <input
                type="checkbox"
                required
                checked={form.consent}
                onChange={e => setForm({ ...form, consent: e.target.checked })}
                style={{ marginTop: 3, accentColor: '#3F6EE8' }}
              />
              <span style={{ fontSize: 11, color: '#666', lineHeight: 1.4 }}>
                Я ознакомлен(-а) и согласен(-а) с{' '}
                <a href="/privacy-policy" target="_blank" style={{ color: '#3F6EE8', textDecoration: 'underline' }}>
                  Политикой обработки ПДн
                </a>{' '}и{' '}
                <a href="/consent" target="_blank" style={{ color: '#3F6EE8', textDecoration: 'underline' }}>
                  Согласием на обработку ПДн
                </a>
              </span>
            </label>
            {error && (
              <p className="text-red text-xs">{error}</p>
            )}
            <div className="lead-actions">
              <Btn
                track="modal_submit"
                trackBlock="contact_modal"
                type="submit"
                disabled={loading || !form.consent}
                className="lead-action disabled:opacity-50"
              >
                {loading
                  ? 'Отправляем...'
                  : demoGate ? 'Смотреть демо' : 'Записаться на диагностику'}
              </Btn>
              {!demoGate && (
                <>
                  <a
                    href="/demo/"
                    target="_blank"
                    rel="noopener"
                    className="btn btn-secondary lead-action"
                    data-track="modal_form_demo"
                    data-track-block="contact_modal"
                  >
                    Посмотреть демо
                  </a>
                  <button
                    type="submit"
                    disabled={loading || !form.consent}
                    className="btn btn-secondary lead-action lead-action-help"
                    data-track="modal_help_submit"
                    data-track-block="contact_modal"
                  >
                    {loading ? 'Отправляем...' : 'Получить помощь с разбором'}
                  </button>
                </>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
