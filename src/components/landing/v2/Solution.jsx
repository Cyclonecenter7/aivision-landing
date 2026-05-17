export default function Solution() {
  return (
    <section className="bg-dark section">
      <div className="container">
        <div className="eyebrow">
          <div className="eyebrow-line"></div>
          <span className="eyebrow-text">Решение</span>
        </div>
      </div>

      <div className="solution-head">
        <h2 className="solution-h2">
          Управление в <em>трёх плоскостях</em>
        </h2>
        <p className="solution-sub">
          Не три отдельные функции — этапы зрелости управления.<br />
          <strong>Видеть → Контролировать → Управлять</strong>
        </p>
      </div>

      <div className="sol-cards">
        <div className="sol-card">
          <div className="sol-left">
            <span className="sol-left-num">01</span>
            <div className="sol-left-dot" style={{ background: 'var(--brand)' }}></div>
          </div>
          <div className="sol-body">
            <div className="sol-title">Видимость</div>
            <ul className="sol-list">
              <li>Все данные бизнеса в одной системе</li>
              <li>Дашборд с маржой, оборотом, расходами в реальном времени</li>
              <li>P&amp;L по направлениям — автоматически</li>
              <li>Заявки, клиенты, сделки, задачи, финансы — связаны</li>
            </ul>
            <div className="sol-result">→ <strong>Собственник видит реальную картину бизнеса каждый день</strong></div>
          </div>
        </div>

        <div className="sol-card">
          <div className="sol-left">
            <span className="sol-left-num">02</span>
            <div className="sol-left-dot" style={{ background: 'var(--sun)' }}></div>
          </div>
          <div className="sol-body">
            <div className="sol-title">Контроль</div>
            <ul className="sol-list">
              <li>Процессы зашиты в систему, не в голову команды</li>
              <li>Регламенты живут внутри задач, не в переписках</li>
              <li>Контроль работает автоматически</li>
              <li>Заявки не теряются, сделки идут по этапам, задачи под контролем</li>
            </ul>
            <div className="sol-result">→ <strong>Бизнес не зависит от настроения сотрудников</strong></div>
          </div>
        </div>

        <div className="sol-card">
          <div className="sol-left">
            <span className="sol-left-num">03</span>
            <div className="sol-left-dot" style={{ background: 'var(--emerald)' }}></div>
          </div>
          <div className="sol-body">
            <div className="sol-title">Управляемость</div>
            <ul className="sol-list">
              <li>Система подсвечивает где проблема</li>
              <li>Оповещения по отклонениям, сценарии действий</li>
              <li>Гипотезы — на данных, не на ощущениях</li>
              <li>Решения принимаются на цифрах</li>
            </ul>
            <div className="sol-result">→ <strong>Собственник управляет — не тушит пожары</strong></div>
          </div>
        </div>
      </div>
    </section>
  );
}
