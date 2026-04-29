import { useState } from 'react';
import { saveLead } from '@/lib/tracker';

const clipBtn  = 'polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)';
const clipTag  = 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)';

const TAGS = [
  {
    id: 'excel',
    label: 'Excel / Google Sheets',
    text: 'Данные уже есть — мы превращаем таблицы в живую систему с автообновлением и наглядными дашбордами',
  },
  {
    id: '1c',
    label: '1С',
    text: 'Подключаемся через REST API и вытягиваем все операции в реальном времени — PnL и ДДС без ручного труда',
  },
  {
    id: 'bitrix',
    label: 'Битрикс24',
    text: 'Берём сделки, воронку и оплаты — строим управленческий дашборд, который показывает реальную картину по продажам',
  },
  {
    id: 'yclients',
    label: 'YCLIENTS',
    text: 'Записи, выручка по мастерам, загрузка слотов — разбиваем по направлениям и показываем, где деньги',
  },
  {
    id: 'moysklad',
    label: 'МойСклад',
    text: 'Товарооборот, остатки и маржа по каждому SKU через API — видите прибыльность в разрезе ассортимента',
  },
  {
    id: 'amocrm',
    label: 'amoCRM',
    text: 'Воронка, конверсия, LTV — связываем с финансами и показываем, сколько стоит каждый закрытый клиент',
  },
  {
    id: 'planfact',
    label: 'ПланФакт',
    text: 'Берём ДДС и PnL, добавляем визуальный управленческий слой — собственник видит цифры, а не строки',
  },
  {
    id: 'other',
    label: 'Другое →',
    text: 'Есть API или выгрузка — подключимся. Нет — придумаем способ забрать данные и автоматизировать учёт',
  },
];

export default function Integrations() {
  const [selected, setSelected] = useState(new Set());
  const [contact, setContact] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleTag = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const selectedLabels = TAGS.filter(t => selected.has(t.id)).map(t => t.label).join(', ');
      await saveLead({
        name: '',
        contact,
        contact_type: 'telegram',
        source_block: `integrations: ${selectedLabels}`,
      });
      setSent(true);
    } catch (err) {
      setError(err.message || 'Ошибка. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  const activeTags = TAGS.filter(t => selected.has(t.id));

  return (
    <section className="bg-[#0A0A0A] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-6 h-px bg-[#3F6EE8]" />
          <span className="text-[#3F6EE8] text-xs font-medium uppercase tracking-widest">Интеграции</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
          Какие системы используете?
        </h2>
        <p className="text-[#555] text-base mb-10 max-w-xl">
          Выберите — покажем как забираем данные и что строим поверх вашего стека.
        </p>

        {/* Tag buttons */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {TAGS.map(tag => {
            const active = selected.has(tag.id);
            return (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className="text-sm font-medium px-4 py-2.5 border transition-colors"
                style={{
                  clipPath: clipTag,
                  background:   active ? '#3F6EE8' : '#222',
                  color:        active ? '#fff'     : '#777',
                  borderColor:  active ? '#3F6EE8' : '#2A2A2A',
                }}
                onMouseEnter={e => {
                  if (active) return;
                  e.currentTarget.style.background   = '#3F6EE8';
                  e.currentTarget.style.color        = '#fff';
                  e.currentTarget.style.borderColor  = '#3F6EE8';
                }}
                onMouseLeave={e => {
                  if (active) return;
                  e.currentTarget.style.background   = '#222';
                  e.currentTarget.style.color        = '#777';
                  e.currentTarget.style.borderColor  = '#2A2A2A';
                }}
              >
                {tag.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic description block */}
        {activeTags.length > 0 && (
          <div className="bg-[#181818] border border-[#2A2A2A] p-6 mb-8">
            <div className="flex flex-col gap-4">
              {activeTags.map(tag => (
                <div key={tag.id} className="flex items-start gap-3">
                  <div className="w-0.5 self-stretch bg-[#3F6EE8] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[#3F6EE8] text-[10px] font-semibold uppercase tracking-widest mb-1">
                      {tag.label}
                    </div>
                    <p className="text-[#AAA] text-sm leading-relaxed">{tag.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact form — appears when any tag selected */}
        {selected.size > 0 && (
          <div className="bg-[#181818] border border-[#2A2A2A] p-6 max-w-lg">
            {sent ? (
              <div className="py-2">
                <div className="text-white font-semibold mb-1">Заявка принята ✓</div>
                <p className="text-[#555] text-sm">Свяжемся в течение 5 минут</p>
              </div>
            ) : (
              <>
                <div className="text-[#3F6EE8] text-[10px] font-semibold uppercase tracking-widest mb-4">
                  Шаг 2 — оставьте Telegram
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 bg-[#252525] border border-[#333] focus-within:border-[#3F6EE8] transition-colors">
                      <input
                        required
                        value={contact}
                        onChange={e => setContact(e.target.value)}
                        placeholder="@username"
                        className="w-full bg-transparent text-white text-sm px-4 py-3 focus:outline-none placeholder:text-[#444]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#3F6EE8] text-white text-sm font-medium px-6 py-3 hover:bg-blue-700 transition-colors disabled:opacity-50 whitespace-nowrap"
                      style={{ clipPath: clipBtn }}
                    >
                      {loading ? '...' : 'Связаться →'}
                    </button>
                  </div>
                  {error && <p className="text-[#E5484D] text-xs">{error}</p>}
                  <p className="text-[#444] text-xs">
                    Ответим в течение 5 минут. Первый разбор — бесплатно.
                  </p>
                </form>
              </>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
