export default function Difference() {
  return (
    <section id="diff" className="bg-light section">
      <div className="container">
        <div className="eyebrow">
          <div className="eyebrow-line"></div>
          <span className="eyebrow-text">Отличие</span>
        </div>

        <div className="diff-head">
          <h2 className="diff-h2">Мы — не консалтинг,<br />не CRM, не <em>AI-агентство</em></h2>
          <p className="diff-sub">
            Управленческое решение — это не отчёт, не софт и не магия ИИ.
            Это работающая система, которой пользуется команда каждый день.
          </p>
        </div>
      </div>

      <div className="diff-grid">
        <div className="diff-card">
          <div className="diff-eb">
            <span className="diff-eb-line"></span> Не консалтинг
          </div>
          <div className="diff-title">Отчёт не лежит на полке</div>
          <div className="diff-cols-head">
            <span className="diff-col-h">Консалтинг</span>
            <span className="diff-col-h us">AIVISION</span>
          </div>
          <div className="diff-compare">
            <div className="diff-them">Отчёт в PDF и список рекомендаций</div>
            <div className="diff-us">Работающая система — встроенная в дашборд собственника</div>
          </div>
        </div>

        <div className="diff-card">
          <div className="diff-eb">
            <span className="diff-eb-line"></span> Не CRM-платформа
          </div>
          <div className="diff-title">Внутри — управленческая логика</div>
          <div className="diff-cols-head">
            <span className="diff-col-h">Битрикс, amoCRM</span>
            <span className="diff-col-h us">AIVISION</span>
          </div>
          <div className="diff-compare">
            <div className="diff-them">Голый софт — «настройте сами под себя»</div>
            <div className="diff-us">Готовая система с зашитыми правилами под ваш сегмент</div>
          </div>
        </div>

        <div className="diff-card">
          <div className="diff-eb">
            <span className="diff-eb-line"></span> Не интегратор
          </div>
          <div className="diff-title">Внедрение от 1 недели</div>
          <div className="diff-cols-head">
            <span className="diff-col-h">Интегратор</span>
            <span className="diff-col-h us">AIVISION</span>
          </div>
          <div className="diff-compare">
            <div className="diff-them">1–2 месяца настройки. За это время бизнес уже изменится</div>
            <div className="diff-us">Запуск за неделю — управленческая логика зашита в платформу</div>
          </div>
        </div>

        <div className="diff-card">
          <div className="diff-eb">
            <span className="diff-eb-line"></span> Не AI-агентство
          </div>
          <div className="diff-title">Продаём результат, не технологию</div>
          <div className="diff-cols-head">
            <span className="diff-col-h">AI-агентство</span>
            <span className="diff-col-h us">AIVISION</span>
          </div>
          <div className="diff-compare">
            <div className="diff-them">Продают чат-ботов, автоматизации и агентов</div>
            <div className="diff-us">Продаём управленческий результат. ИИ — там где реально помогает</div>
          </div>
        </div>
      </div>
    </section>
  );
}
