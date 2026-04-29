import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { saveLead } from '@/lib/tracker';

const clipCard  = 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)';
const clipModal = 'polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)';
const clipBtn   = 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)';

export default function StarterBanner() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('starterBannerShown')) return;
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleBannerClose = (e) => {
    e.stopPropagation();
    setVisible(false);
    sessionStorage.setItem('starterBannerShown', 'true');
  };

  const handleBannerClick = () => {
    setVisible(false);
    setModalOpen(true);
    sessionStorage.setItem('starterBannerShown', 'true');
  };

  const handleModalClose = () => setModalOpen(false);

  return (
    <>
      {/* Баннер — фиксированный, снизу справа, появляется через 15 сек */}
      {visible && (
        <div
          className="fixed bottom-6 right-6 z-40 cursor-pointer w-72 select-none"
          style={{ background: '#0A0A0A', border: '1px solid #333', clipPath: clipCard, padding: '16px 20px 18px' }}
          onClick={handleBannerClick}
        >
          <button
            onClick={handleBannerClose}
            className="absolute top-3 right-3 text-[#555] hover:text-white transition-colors p-0.5"
            aria-label="Закрыть"
          >
            <X size={13} />
          </button>
          <div className="flex items-center gap-2 mb-1 pr-4">
            <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0 animate-pulse" />
            <span className="text-white text-sm font-semibold">Стартуете бизнес?</span>
          </div>
          <p className="text-[#666] text-xs pl-4">Стек под ключ за 7 дней</p>
        </div>
      )}

      {/* Модалка стартового стека */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 overflow-y-auto"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={handleModalClose}
        >
          <div
            className="bg-[#181818] w-full max-w-2xl p-8 relative my-auto"
            style={{ clipPath: clipModal }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={handleModalClose}
              className="absolute top-5 right-5 text-[#555] hover:text-white transition-colors"
              aria-label="Закрыть"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-[#3F6EE8]" />
              <span className="text-[#3F6EE8] text-xs font-semibold uppercase tracking-widest">
                Стартовый стек
              </span>
            </div>
            <h2 className="text-white text-2xl font-bold leading-snug mb-6">
              Всё для старта — за 7 дней под ключ
            </h2>

            {/* Two-column product grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#252525] p-5">
                <div className="text-[#3F6EE8] text-[10px] font-semibold uppercase tracking-widest mb-2">
                  01 — Сайт
                </div>
                <p className="text-[#AAA] text-sm leading-relaxed">
                  По вашему тексту и дизайну.<br />
                  Нет дизайна — сделаем базовый.
                </p>
              </div>
              <div className="bg-[#252525] p-5">
                <div className="text-[#3F6EE8] text-[10px] font-semibold uppercase tracking-widest mb-3">
                  02 — Система управления
                </div>
                <div className="flex flex-col gap-1.5">
                  {['Дашборд — общая статистика', 'Базовый финучёт', 'База клиентов', 'Задачи и трекер дедлайнов'].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1 h-1 mt-1.5 bg-[#3F6EE8] rounded-full flex-shrink-0" />
                      <span className="text-[#AAA] text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div
              className="flex items-center justify-between flex-wrap gap-3 px-5 py-4 mb-6"
              style={{ background: '#0A0A0A', border: '1px solid #2A2A2A' }}
            >
              <span className="text-white text-sm font-semibold">Стоимость под ключ</span>
              <div className="flex items-center gap-4">
                <span className="text-white text-xl font-bold">100 000 ₽</span>
                <span className="text-[#666] text-sm">срок — 7 дней</span>
              </div>
            </div>

            {/* Inline form — переиспользует паттерн ContactModal, source = starter_banner */}
            <StarterForm />
          </div>
        </div>
      )}
    </>
  );
}

// Форма внутри того же файла — не отдельный компонент
function StarterForm() {
  const [form, setForm] = useState({ name: '', contact: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const contact_type = form.contact.startsWith('+') ? 'phone' : 'telegram';
      await saveLead({ name: form.name, contact: form.contact, contact_type, source_block: 'starter_banner' });
      setSent(true);
    } catch (err) {
      setError(err.message || 'Что-то пошло не так. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="py-4 text-center">
        <div className="text-white font-semibold mb-1">Заявка принята ✓</div>
        <p className="text-[#555] text-xs">Свяжемся в течение 5 минут</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className="text-[#555] text-xs -mt-2">Свяжемся в течение 5 минут</p>
      <div className="grid md:grid-cols-2 gap-4">
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
        <div>
          <label className="text-[#555] text-[10px] uppercase tracking-widest mb-2 block">Telegram / Телефон</label>
          <div className="bg-[#252525] border border-[#2A2A2A] focus-within:border-[#3F6EE8] transition-colors">
            <input
              required
              value={form.contact}
              onChange={e => setForm({ ...form, contact: e.target.value })}
              placeholder="@username или +7..."
              className="w-full bg-transparent text-white text-sm px-4 py-3 focus:outline-none placeholder:text-[#444]"
            />
          </div>
        </div>
      </div>
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
      {error && <p className="text-[#E5484D] text-xs">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-[#3F6EE8] text-white text-sm font-medium py-4 px-6 hover:bg-blue-700 transition-colors disabled:opacity-50"
        style={{ clipPath: clipBtn }}
      >
        {loading ? 'Отправляем...' : 'Хочу подключить'}
      </button>
    </form>
  );
}
