const whatWeDoItems = [
  'Архитектура управленческой модели',
  'Финансовая логика и прозрачная прибыль',
  'KPI по отделам',
  'План-факт и контроль маржинальности',
  'BI-система и центр управления',
  'Регламент управленческого ритма',
];

const audienceTraits = [
  'Делает 10+ млн ₽ в месяц, но не видит чистую прибыль',
  'Чувствует, что деньги проходят через бизнес, но не остаются',
  'Не понимает маржинальность по направлениям',
  'Живёт в кассовых разрывах и «ручном режиме»',
];

const processSteps = [
  { id: '01', title: 'Интервью с собственником', desc: 'Разбираем текущую модель, болевые точки и цели' },
  { id: '02', title: 'Диагностика и карта рисков', desc: 'Выявляем утечки прибыли и управленческие риски' },
  { id: '03', title: 'Проектирование модели', desc: 'Строим архитектуру управленческой системы под ваш бизнес' },
  { id: '04', title: 'Внедрение, обучение и запуск', desc: 'Запускаем систему, обучаем команду, передаём управление' },
];

const clip = 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)';
const clipSmall = 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)';

export default function ChaosToSystem() {
  return (
    <section className="bg-[#F0F2F5] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-px bg-[#0A0A0A]" />
          <span className="text-[#0A0A0A] text-xs font-medium uppercase tracking-widest">Система</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-16">
          Как мы превращаем хаос в систему
        </h2>

        {/* 3-column grid */}
        <div className="grid md:grid-cols-[1fr_120px_1fr] gap-8 items-start">

          {/* LEFT — Для кого */}
          <div>
            <div className="text-[#3F6EE8] text-xs font-medium uppercase tracking-widest mb-5">Для кого</div>
            <h3 className="text-xl font-bold text-[#0A0A0A] leading-tight mb-6">
              Собственник,<br />который
            </h3>
            <div className="bg-white border border-[#E8E8E8] overflow-hidden">
              {audienceTraits.map((trait, i) => (
                <div key={i} className="flex items-start gap-4 px-6 py-4 border-b border-[#F0F0F0] last:border-0">
                  <span className="text-[#E5484D] text-xs font-mono mt-0.5 flex-shrink-0 w-5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[#555] text-sm leading-relaxed">{trait}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER — Визуал стрелка */}
          <div className="hidden md:flex flex-col items-center justify-start pt-10 gap-0">
            <div className="bg-white border border-[#E8E8E8] p-4 w-full text-center" style={{ clipPath: clip }}>
              <div className="text-[#E5484D] text-xs font-semibold">Хаос</div>
            </div>
            <div className="w-px h-8 bg-[#3F6EE8] opacity-30" />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M12 19l-5-5M12 19l5-5" stroke="#3F6EE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="w-px h-8 bg-[#3F6EE8] opacity-30" />
            <div className="bg-[#3F6EE8] p-4 w-full text-center" style={{ clipPath: clip }}>
              <div className="text-white text-xs font-semibold">Система</div>
            </div>
          </div>

          {/* RIGHT — Что делаем */}
          <div>
            <div className="text-[#3F6EE8] text-xs font-medium uppercase tracking-widest mb-5">Что мы делаем</div>
            <h3 className="text-xl font-bold text-[#0A0A0A] leading-tight mb-6">
              AIVISION — это
            </h3>
            <div className="bg-white border border-[#E8E8E8] overflow-hidden">
              {whatWeDoItems.map((item, i) => (
                <div key={i} className="flex items-center gap-5 px-6 py-4 border-b border-[#F0F0F0] last:border-0">
                  <span className="text-[#3F6EE8] text-xs font-mono w-5 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[#0A0A0A] text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Этапы */}
        <div className="mt-20 pt-16 border-t border-[#E0E0E0]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-[#0A0A0A]" />
            <span className="text-[#0A0A0A] text-xs font-medium uppercase tracking-widest">Этапы работы</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-10">
            Как проходит работа
          </h2>
          <div className="grid md:grid-cols-4 gap-5">
            {processSteps.map((step) => (
              <div key={step.id} className="bg-white border border-[#E8E8E8] p-6">
                <div
                  className="w-10 h-10 bg-[#3F6EE8] flex items-center justify-center text-white text-sm font-bold mb-5"
                  style={{ clipPath: clipSmall }}
                >
                  {step.id}
                </div>
                <h3 className="text-[#0A0A0A] font-semibold text-sm leading-tight mb-3">{step.title}</h3>
                <p className="text-[#888] text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}