import { useState } from 'react';
import { saveLead } from '@/lib/tracker';
import { X } from 'lucide-react';
import ContactToggleInput from './ContactToggleInput';

const clipCard = 'polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)';
const clipBtn  = 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)';

export default function ContactModal({ open, onClose, source = 'modal' }) {
  const [form, setForm] = useState({ name: '', contact: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const contact_type = form.contact.startsWith('+') ? 'phone' : 'telegram';
      await saveLead({ name: form.name, contact: form.contact, contact_type, source_block: source });
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
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={handleClose}
    >
      <div
        className="bg-[#181818] w-full max-w-md p-8 relative"
        style={{ clipPath: clipCard }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-[#555] hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-6 h-px bg-[#3F6EE8]" />
          <span className="text-[#3F6EE8] text-xs font-medium uppercase tracking-widest">Записаться на разбор</span>
        </div>

        <h3 className="text-white text-2xl font-bold leading-snug mb-2">
          Оставьте контакт
        </h3>
        <p className="text-[#555] text-sm mb-8">
          Свяжемся в течение 5 минут. Разбор бесплатный.
        </p>

        {sent ? (
          <div className="py-6 text-center">
            <div
              className="w-12 h-12 bg-[#3F6EE8] mx-auto mb-4 flex items-center justify-center"
              style={{ clipPath: clipBtn }}
            >
              <div className="w-3 h-3 bg-white" />
            </div>
            <div className="text-white font-semibold mb-1">Заявка принята</div>
            <p className="text-[#555] text-xs">Свяжемся в течение 5 минут</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-[#555] text-[10px] uppercase tracking-widest mb-2 block">Имя</label>
              <div className="bg-[#252525] border border-[#2A2A2A] focus-within:border-[#3F6EE8] transition-colors">
                <input
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Ваше имя"
                  className="w-full bg-transparent text-white text-sm px-4 py-3 focus:outline-none placeholder:text-[#444]"
                />
              </div>
            </div>
            <ContactToggleInput
              dark={true}
              value={form.contact}
              onChange={val => setForm({ ...form, contact: val })}
            />
            <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <input type="checkbox" required style={{ marginTop: 3, accentColor: '#3F6EE8' }} />
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
              <p className="text-[#E5484D] text-xs">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-[#3F6EE8] text-white text-sm font-medium py-4 px-6 hover:bg-blue-700 transition-colors disabled:opacity-50"
              style={{ clipPath: clipBtn }}
            >
              {loading ? 'Отправляем...' : 'Записаться на разбор'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
