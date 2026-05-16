export default function HowWeWork() {
  return (
    <section id="how" className="bg-dark section">
      <div className="how-head">
        <div className="eyebrow">
          <div className="eyebrow-line"></div>
          <span className="eyebrow-text">Как работаем</span>
        </div>
        <h2 className="how-h2">От <em>диагностики</em> до работающей<br />системы управления</h2>
      </div>

      <div className="how-flow">
        <div className="how-step">
          <div className="how-step-top">
            <span className="how-step-num">01 · Диагностика</span>
            <span className="how-step-time">30 мин</span>
          </div>
          <div className="how-step-title">Разбор бизнеса</div>
          <div className="how-step-desc">
            30 минут разговора. Разбираем где собственник теряет управление —
            в видимости, контроле или управляемости.
          </div>
          <div className="how-step-foot">
            <span className="how-step-price-lab">Стоимость</span>
            <span className="how-step-price-val">бесплатно</span>
          </div>
        </div>

        <div className="how-step">
          <div className="how-step-top">
            <span className="how-step-num">02 · Конфигурация и внедрение</span>
            <span className="how-step-time">1–6 нед</span>
          </div>
          <div className="how-step-title">Платформа под задачу</div>
          <div className="how-step-desc">
            Конфигурация под клиента. Базовый запуск — 1 неделя.
            Полная стабилизация — 4–6 недель.
          </div>
          <div className="how-step-foot">
            <span className="how-step-price-lab">Стоимость</span>
            <span className="how-step-price-val">от 200 000 ₽</span>
          </div>
        </div>

        <div className="how-step">
          <div className="how-step-top">
            <span className="how-step-num">03 · Стабилизация</span>
            <span className="how-step-time">1 мес</span>
          </div>
          <div className="how-step-title">Команда привыкает</div>
          <div className="how-step-desc">
            Обратная связь, донастройка, помощь команде клиента.
            Этот месяц поддержки — без оплаты.
          </div>
          <div className="how-step-foot">
            <span className="how-step-price-lab">Стоимость</span>
            <span className="how-step-price-val" style={{ color: 'var(--emerald)' }}>0 ₽</span>
          </div>
        </div>

        <div className="how-step">
          <div className="how-step-top">
            <span className="how-step-num">04 · Жизнь системы</span>
            <span className="how-step-time">с 2-го мес</span>
          </div>
          <div className="how-step-title">Поддержка и развитие</div>
          <div className="how-step-desc">
            Технические обновления, донастройки под изменения бизнеса,
            консультационный созвон раз в месяц.
          </div>
          <div className="how-step-foot">
            <span className="how-step-price-lab">Поддержка</span>
            <span className="how-step-price-val">от 25 000 ₽/мес</span>
          </div>
        </div>
      </div>

      <div className="how-closing">
        <div className="how-closing-text">
          Управленческая система — <em>это не статика.</em><br />
          Каждый месяц бизнес меняется. Система меняется вместе с ним.
        </div>
      </div>
    </section>
  );
}
