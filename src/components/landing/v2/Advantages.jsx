import { useState } from 'react';

const CARDS = [
  {
    num: '01',
    name: 'Технологическая платформа',
    body: 'Не голые отчёты, не таблицы Excel. Система сама подсвечивает где проблема, формулирует выводы из данных, подсказывает что делать. ИИ работает внутри — там, где он реально полезен.',
    result: '→ Современное решение, а не вчерашний день',
  },
  {
    num: '02',
    name: 'Простота для собственника',
    body: 'Не нужно становиться IT-директором, чтобы управлять бизнесом. Не нужно три месяца разбираться в настройках. Мы конфигурируем платформу под бизнес — собственник работает с готовой картиной.',
    result: '→ Платформа простая снаружи, умная внутри',
  },
  {
    num: '03',
    name: 'Готовая управленческая логика',
    body: 'Собственники не всегда знают что считать и какие KPI ставить — особенно если впервые выходят на этот уровень управления. Мы знаем — потому что работали с десятком бизнесов в этом сегменте.',
    result: '→ Не нужно изобретать систему с нуля',
  },
];

function AdvCard({ num, name, body, result }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="adv-card">
      <h3 className="adv-card-h">
        <span className="adv-card-h-num">{num}</span>
        <span className="adv-card-h-name">{name}</span>
      </h3>

      <button
        type="button"
        className="adv-card-toggle"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        data-track={`adv_toggle_${num}`}
        data-track-block="advantages"
      >
        <span>{open ? 'Свернуть' : 'Подробнее'}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div className={`adv-card-body${open ? ' expanded' : ''}`}>
        {body}
      </div>

      <div className="adv-card-result">{result}</div>
    </div>
  );
}

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
        {CARDS.map(c => <AdvCard key={c.num} {...c} />)}
      </div>
    </section>
  );
}
