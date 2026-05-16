export default function Customization() {
  return (
    <section className="bg-light section">
      <div className="container">
        <div className="eyebrow">
          <div className="eyebrow-line"></div>
          <span className="eyebrow-text">Кастомность</span>
        </div>

        <div className="cst-head">
          <h2 className="cst-h2">Не коробка — <em>конфигурация</em> под ваш бизнес</h2>
          <p className="cst-sub">
            Платформа гибкая. Вы можете убирать лишнее и добавлять своё — то, что нужно
            именно вашему бизнесу. Не «настройте сами», а конфигурация на этапе внедрения.
          </p>
        </div>
      </div>

      <div className="cst-grid">
        <div className="cst-card">
          <div className="cst-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </div>
          <div>
            <div className="cst-title">Состав разделов</div>
            <div className="cst-desc">
              Оставляете только то, что нужно вашему бизнесу. Не нужны заявки с сайта — убираем.
              Не нужны сделки — убираем. Платформа не перегружена функциями.
            </div>
            <div className="cst-example">
              <strong>Пример:</strong> производство без онлайн-витрины — убираем лидогенерацию,
              оставляем CRM + учёт + задачи
            </div>
          </div>
        </div>

        <div className="cst-card">
          <div className="cst-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <div>
            <div className="cst-title">Свои разделы и листы</div>
            <div className="cst-desc">
              Товары, склады, контрагенты, договоры, проекты — добавляем то, что есть в вашем
              бизнесе. Не подгоняем бизнес под платформу.
            </div>
            <div className="cst-example">
              <strong>Пример:</strong> строительная компания — добавляем «Объекты», «Подрядчики»,
              «Акты выполненных работ»
            </div>
          </div>
        </div>

        <div className="cst-card">
          <div className="cst-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <div>
            <div className="cst-title">Свои показатели и KPI</div>
            <div className="cst-desc">
              Если у вас своя метрика — встраиваем её в дашборд. Маржа по бренду, оборот по точке,
              конверсия по менеджеру — считаются по вашей формуле.
            </div>
            <div className="cst-example">
              <strong>Пример:</strong> ecom на WB — добавляем «Маржа по бренду», «Выкуп», «ДРР»
            </div>
          </div>
        </div>

        <div className="cst-card">
          <div className="cst-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div>
            <div className="cst-title">Свои регламенты и процессы</div>
            <div className="cst-desc">
              Этапы сделки, статусы заявок, контроли — настраиваем под то, как реально работает
              ваш бизнес.
            </div>
            <div className="cst-example">
              <strong>Пример:</strong> услуги B2B — добавляем стадию «Согласование договора» между
              «КП отправлено» и «Подписание»
            </div>
          </div>
        </div>
      </div>

      <div className="cst-vs">
        <div>
          <div className="cst-vs-eb">
            <span className="cst-vs-eb-line"></span> Битрикс / amoCRM
          </div>
          <div className="cst-vs-title them">Конструктор «настройте сами»</div>
          <div className="cst-vs-text them">
            Тратите 3 месяца на настройку или платите интегратору.
            Платформа выходит «настроенной», но не готовой к управлению.
          </div>
        </div>
        <div>
          <div className="cst-vs-eb us">
            <span className="cst-vs-eb-line"></span> AIVISION
          </div>
          <div className="cst-vs-title us">Конфигурация на этапе внедрения</div>
          <div className="cst-vs-text">
            По итогам диагностики платформа выходит готовой под ваш бизнес,
            а не «надо ещё докрутить».
          </div>
        </div>
      </div>
    </section>
  );
}
