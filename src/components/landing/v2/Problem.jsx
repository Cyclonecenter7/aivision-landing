export default function Problem() {
  return (
    <section className="bg-light problem-section">
      <div className="container">
        <div className="eyebrow">
          <div className="eyebrow-line"></div>
          <span className="eyebrow-text">Проблема</span>
        </div>
      </div>

      <div className="problem-head">
        <h2 className="problem-h2">
          Если бизнес растёт,<br />но <em>управляемости</em> нет
        </h2>
        <p className="problem-sub">
          Три уровня, где собственник теряет управление —
          от видимости до решений на данных
        </p>
      </div>

      <div className="problem-grid">
        <div className="prob-card">
          <div className="prob-top" style={{ background: 'var(--brand)' }}></div>
          <div className="prob-num">01</div>
          <div className="prob-title">Видимости нет</div>
          <ul className="prob-list">
            <li>Данные в CRM, расходы в Excel, задачи в Trello</li>
            <li>Реальная картина бизнеса — в голове собственника</li>
            <li>P&amp;L по направлениям — раз в квартал, с опозданием</li>
            <li>Оборот видно — маржу нет</li>
          </ul>
        </div>

        <div className="prob-card">
          <div className="prob-top" style={{ background: 'var(--sun)' }}></div>
          <div className="prob-num">02</div>
          <div className="prob-title">Контроля нет</div>
          <ul className="prob-list">
            <li>Процессы держатся на ключевых людях</li>
            <li>Регламенты — на бумаге, не в работе</li>
            <li>Менеджер уволился — выросла дыра</li>
            <li>Заявки теряются. Сделки висят. Задачи забываются</li>
          </ul>
        </div>

        <div className="prob-card">
          <div className="prob-top" style={{ background: 'var(--crimson)' }}></div>
          <div className="prob-num">03</div>
          <div className="prob-title">Управляемости нет</div>
          <ul className="prob-list">
            <li>Решения принимаются на интуиции</li>
            <li>Куда уходит маржа при росте — непонятно</li>
            <li>Стратегия — «фокусируемся на X в этом квартале»</li>
            <li>Масштабирование пугает — не видно узких мест</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
