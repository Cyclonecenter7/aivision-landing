import { useState } from 'react';

const CARDS = [
  {
    num: '01',
    title: 'Состав разделов',
    desc: 'Оставляете только то, что нужно вашему бизнесу. Не нужны заявки с сайта — убираем. Не нужны сделки — убираем. Платформа не перегружена функциями.',
    example: <><strong>Пример:</strong> производство без онлайн-витрины — убираем лидогенерацию, оставляем CRM + учёт + задачи</>,
  },
  {
    num: '02',
    title: 'Свои разделы и листы',
    desc: 'Товары, склады, контрагенты, договоры, проекты — добавляем то, что есть в вашем бизнесе. Не подгоняем бизнес под платформу.',
    example: <><strong>Пример:</strong> строительная компания — добавляем «Объекты», «Подрядчики», «Акты выполненных работ»</>,
  },
  {
    num: '03',
    title: 'Свои показатели и KPI',
    desc: 'Если у вас своя метрика — встраиваем её в дашборд. Маржа по бренду, оборот по точке, конверсия по менеджеру — считаются по вашей формуле.',
    example: <><strong>Пример:</strong> ecom на WB — добавляем «Маржа по бренду», «Выкуп», «ДРР»</>,
  },
  {
    num: '04',
    title: 'Свои регламенты и процессы',
    desc: 'Этапы сделки, статусы заявок, контроли — настраиваем под то, как реально работает ваш бизнес.',
    example: <><strong>Пример:</strong> услуги B2B — добавляем стадию «Согласование договора» между «КП отправлено» и «Подписание»</>,
  },
];

function CstCard({ num, title, desc, example }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="cst-card">
      <div className="cst-num">{num}</div>
      <div>
        <div className="cst-title">{title}</div>
        <button
          type="button"
          className="cst-toggle"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          data-track={`cst_toggle_${num}`}
          data-track-block="customization"
        >
          <span>{open ? 'Свернуть' : 'Подробнее'}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <div className={`cst-desc${open ? ' expanded' : ''}`}>{desc}</div>
        <div className="cst-example">{example}</div>
      </div>
    </div>
  );
}

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

      <div className="cst-layout">
        <div className="cst-list">
          {CARDS.map(c => <CstCard key={c.num} {...c} />)}
        </div>

        <div className="cst-stack" aria-hidden="true">
          <div className="cst-sheet cst-sheet-4">
            <div className="cst-sheet-eb">+ Лист</div>
            <div className="cst-sheet-title">Согласование договора</div>
            <div className="cst-sheet-rows">
              <div className="cst-sheet-row">статус</div>
              <div className="cst-sheet-row">ответственный</div>
            </div>
          </div>
          <div className="cst-sheet cst-sheet-3">
            <div className="cst-sheet-eb">+ Лист</div>
            <div className="cst-sheet-title">Маржа по бренду</div>
            <div className="cst-sheet-rows">
              <div className="cst-sheet-row">бренд / SKU</div>
              <div className="cst-sheet-row">выкуп · ДРР</div>
              <div className="cst-sheet-row">формула маржи</div>
            </div>
          </div>
          <div className="cst-sheet cst-sheet-2">
            <div className="cst-sheet-eb">+ Лист</div>
            <div className="cst-sheet-title">Подрядчики</div>
            <div className="cst-sheet-rows">
              <div className="cst-sheet-row">договоры</div>
              <div className="cst-sheet-row">акты выполненных работ</div>
              <div className="cst-sheet-row">оплаты</div>
            </div>
          </div>
          <div className="cst-sheet cst-sheet-1">
            <div className="cst-sheet-eb">+ Лист</div>
            <div className="cst-sheet-title">Объекты</div>
            <div className="cst-sheet-rows">
              <div className="cst-sheet-row">адрес · площадь</div>
              <div className="cst-sheet-row">сроки сдачи</div>
              <div className="cst-sheet-row">подрядчики</div>
              <div className="cst-sheet-row">бюджет / факт</div>
            </div>
          </div>
        </div>
      </div>

      <div className="cst-vs">
        <div>
          <div className="cst-vs-eb">
            <span className="cst-vs-eb-line"></span> Другие интеграторы
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
