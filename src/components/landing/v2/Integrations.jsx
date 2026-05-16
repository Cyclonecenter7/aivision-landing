export default function Integrations() {
  return (
    <section id="integrations" className="bg-light section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="eyebrow">
          <div className="eyebrow-line"></div>
          <span className="eyebrow-text">Интеграции</span>
        </div>

        <div className="int-head">
          <h2 className="int-h2">Платформа <em>поверх</em> ваших систем — не вместо них</h2>
          <p className="int-sub">
            Не заставляем уходить с 1С, банка, МойСклад или amoCRM. Подключаемся по API —
            данные стекаются в единый управленческий слой.
          </p>
        </div>
      </div>

      <div className="int-grid">
        <div className="int-card">
          <div className="int-card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="5" width="20" height="14" />
              <path d="M2 10h20" />
            </svg>
          </div>
          <div className="int-card-title">Банки</div>
          <div className="int-card-desc">
            Платежи, остатки, движение по счетам — автоматически в учёт.
            Без ручного ввода.
          </div>
        </div>

        <div className="int-card">
          <div className="int-card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div className="int-card-title">1С, МойСклад</div>
          <div className="int-card-desc">
            Товары, остатки, продажи. P&amp;L по направлениям на реальных данных.
          </div>
        </div>

        <div className="int-card">
          <div className="int-card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="7" r="4" />
              <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
              <circle cx="17" cy="11" r="3" />
            </svg>
          </div>
          <div className="int-card-title">amoCRM, Bitrix</div>
          <div className="int-card-desc">
            Оставляем вашу CRM на месте. Подключаемся и поднимаем управленческий слой.
          </div>
        </div>

        <div className="int-card">
          <div className="int-card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3h18v18H3z" />
              <path d="M3 9h18M9 21V9" />
            </svg>
          </div>
          <div className="int-card-title">Маркетплейсы</div>
          <div className="int-card-desc">
            Wildberries, Ozon, WhatsApp, Telegram, IP-телефония — в одной картине.
          </div>
        </div>

        <div className="int-card">
          <div className="int-card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <div className="int-card-title">Любые API</div>
          <div className="int-card-desc">
            Открытое API — подключаем. Нет — настраиваем через файлы или вебхуки.
          </div>
        </div>
      </div>

      <div className="int-flow">
        <div className="int-flow-eb">Как это работает в результате</div>
        <div className="int-flow-rows">
          <div className="int-flow-row">
            <strong>Заявка с сайта</strong>
            <span>→ попадает в платформу</span>
          </div>
          <div className="int-flow-row">
            <strong>Платёж в банке</strong>
            <span>→ отражается в учёте</span>
          </div>
          <div className="int-flow-row">
            <strong>Продажа в 1С</strong>
            <span>→ попадает в P&amp;L</span>
          </div>
          <div className="int-flow-row">
            <strong>Звонок менеджера</strong>
            <span>→ подгружается к сделке</span>
          </div>
        </div>
      </div>
    </section>
  );
}
