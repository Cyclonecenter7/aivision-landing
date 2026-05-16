export default function Advantages() {
  return (
    <section className="bg-light section">
      <div className="container">
        <div className="eyebrow">
          <div className="eyebrow-line"></div>
          <span className="eyebrow-text">Преимущества</span>
        </div>
      </div>

      <div className="adv-head">
        <h2 className="adv-h2">
          Три причины выбрать<br /><em>управленческое</em> решение
        </h2>
        <p className="adv-sub">
          Простая современная технология для собственника и готовая управленческая
          экспертиза — в одной платформе
        </p>
      </div>

      <div className="adv-grid">
        <div className="adv-card">
          <div className="adv-card-num">01 · Технология</div>
          <div className="adv-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </div>
          <div className="adv-card-title">Технологическая<br />платформа</div>
          <div className="adv-card-body">
            Не голые отчёты, не таблицы Excel. Система сама подсвечивает где проблема,
            формулирует выводы из данных, подсказывает что делать. ИИ работает внутри — там,
            где он реально полезен.
          </div>
          <div className="adv-card-result">→ Современное решение, а не вчерашний день</div>
        </div>

        <div className="adv-card">
          <div className="adv-card-num">02 · Простота</div>
          <div className="adv-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </div>
          <div className="adv-card-title">Простота для<br />собственника</div>
          <div className="adv-card-body">
            Не нужно становиться IT-директором, чтобы управлять бизнесом. Не нужно три месяца
            разбираться в настройках. Мы конфигурируем платформу под бизнес — собственник
            работает с готовой картиной.
          </div>
          <div className="adv-card-result">→ Платформа простая снаружи, умная внутри</div>
        </div>

        <div className="adv-card">
          <div className="adv-card-num">03 · Экспертиза</div>
          <div className="adv-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div className="adv-card-title">Готовая управленческая<br />логика</div>
          <div className="adv-card-body">
            Собственники не всегда знают что считать и какие KPI ставить — особенно если
            впервые выходят на этот уровень управления. Мы знаем — потому что работали с
            десятком бизнесов в этом сегменте.
          </div>
          <div className="adv-card-result">→ Не нужно изобретать систему с нуля</div>
        </div>
      </div>
    </section>
  );
}
