import { useState } from 'react';
import { saveLead } from '@/lib/tracker';

const TAGS = [
  { id: 'excel',     label: 'Excel / Google Sheets', text: 'Подключаемся к вашим таблицам — вы получаете живую систему с автообновлением вместо ручного счёта' },
  { id: '1c',        label: '1С',                    text: 'Подключаемся к 1С — вы видите PnL, ДДС и все операции в реальном времени без выгрузок' },
  { id: 'bitrix',    label: 'Битрикс24',             text: 'Подключаемся к Битрикс24 — вы видите реальную картину по продажам, воронке и деньгам' },
  { id: 'yclients',  label: 'YCLIENTS',              text: 'Подключаемся к YCLIENTS — вы видите выручку, загрузку и маржу по каждому направлению и мастеру' },
  { id: 'moysklad',  label: 'МойСклад',              text: 'Подключаемся к МойСклад — вы видите прибыльность по каждому товару и направлению' },
  { id: 'amocrm',    label: 'amoCRM',                text: 'Подключаемся к amoCRM — вы видите сколько стоит каждый клиент и где воронка теряет деньги' },
  { id: 'planfact',  label: 'ПланФакт',              text: 'Подключаемся к ПланФакт — добавляем визуальный слой и управленческую аналитику поверх' },
  { id: 'adesk',     label: 'Adesk',                 text: 'Подключаемся к Adesk — строим дашборд собственника и управленческий разрез по направлениям' },
  { id: 'other',     label: 'Другое →',              text: 'Если есть API или выгрузка — подключимся. Расскажите что используете — оценим' },
];

export default function Integrations() {
  const [selected, setSelected] = useState(new Set());
  const [contact, setContact] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggle = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const activeTags = TAGS.filter(t => selected.has(t.id));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const c = contact.trim();
    if (c.length < 3) {
      setError('Введите Telegram или телефон'); setLoading(false); return;
    }
    const isPhone = /^\+\d{10,15}$/.test(c.replace(/[\s\-()]/g, ''));
    const isTg    = /^@?[a-zA-Z0-9_]{5,32}$/.test(c);
    if (!isPhone && !isTg) {
      setError('Введите телефон (+7...) или Telegram (@username)'); setLoading(false); return;
    }
    try {
      const labels = activeTags.map(t => t.label).join(', ') || '—';
      await saveLead({
        name: '',
        contact: c,
        contact_type: isPhone ? 'phone' : 'telegram',
        source_block: `integrations: ${labels}`,
      });
      setSent(true);
    } catch (err) {
      setError(err.message || 'Ошибка. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="integrations" className="bg-light section">
      <div className="container">
        <div className="eyebrow">
          <div className="eyebrow-line"></div>
          <span className="eyebrow-text">Интеграции</span>
        </div>

        <div className="int-head">
          <h2 className="int-h2">Платформа <em>поверх</em> ваших систем — не вместо них</h2>
          <p className="int-sub">
            Выберите систему, в которой вы работаете — покажем, как строим интеграцию
            и какой управленческий слой поднимаем поверх.
          </p>
        </div>
      </div>

      <div className="int-builder">
        <div className="int-chips">
          {TAGS.map(tag => (
            <button
              key={tag.id}
              type="button"
              className={`int-chip${selected.has(tag.id) ? ' active' : ''}`}
              onClick={() => toggle(tag.id)}
              data-track={`integration_${tag.id}`}
              data-track-block="integrations"
            >
              {tag.label}
            </button>
          ))}
        </div>

        {activeTags.length > 0 && (
          <div className="int-result">
            {activeTags.map(tag => (
              <div key={tag.id} className="int-result-row">
                <div className="int-result-bar" />
                <div>
                  <div className="int-result-label">{tag.label}</div>
                  <p className="int-result-text">{tag.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {selected.size > 0 && (
          <div className="int-form">
            {sent ? (
              <div className="int-form-sent">
                <strong>Заявка принята ✓</strong>
                <p style={{ color: 'var(--l-text-mut)', fontSize: 12, marginTop: 6 }}>
                  Свяжемся в течение 5 минут
                </p>
              </div>
            ) : (
              <>
                <div className="int-form-eb">Оставьте контакт — покажем, как это будет работать</div>
                <form onSubmit={handleSubmit}>
                  <div className="int-form-row">
                    <input
                      className="int-form-input"
                      required
                      value={contact}
                      onChange={e => setContact(e.target.value)}
                      placeholder="@username или +7..."
                    />
                    <button
                      type="submit"
                      className="int-form-submit"
                      disabled={loading}
                      data-track="integration_submit"
                      data-track-block="integrations"
                    >
                      {loading ? '...' : 'Связаться →'}
                    </button>
                  </div>
                  {error && <p className="int-form-error">{error}</p>}
                  <p className="int-form-hint">Ответим в течение 5 минут. Первый разбор — бесплатно.</p>
                </form>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
