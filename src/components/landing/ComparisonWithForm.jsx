const classic = [
  'Рекомендации',
  'Отчёт в PDF',
  'Нет внедрения и контроля',
  'Нет цифровой системы',
];

const aivision = [
  'Проектирование управленческой архитектуры',
  'Внедрение KPI',
  'Создание BI-системы',
  'Интеграции и автоматизация',
  'Регламент управленческого ритма',
];

export default function ComparisonWithForm() {
  return (
    <section id="comparison" className="bg-[#F0F2F5] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-6 h-px bg-[#0A0A0A]" />
          <span className="text-[#0A0A0A] text-xs font-medium uppercase tracking-widest">Отличие</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-semibold text-[#0A0A0A] leading-tight mb-10">
          Чем AIVISION отличается от классического консалтинга
        </h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Left — Classic */}
          <div className="bg-white border border-[#E8E8E8] p-8 h-fit">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#E5484D] mb-6">
              Обычный консалтинг
            </div>
            <div className="flex flex-col">
              {classic.map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-3.5 border-b border-[#F0F0F0] last:border-0">
                  <div className="w-2 h-px bg-[#E5484D] flex-shrink-0" />
                  <span className="text-[#666] text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — AiVision */}
          <div className="bg-[#3F6EE8] p-8 h-fit">
            <div className="text-xs font-semibold uppercase tracking-widest text-white mb-6">
              AIVISION
            </div>
            <div className="flex flex-col">
              {aivision.map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-3.5 border-b border-[#5b7fec] last:border-0">
                  <div className="w-1.5 h-1.5 bg-white flex-shrink-0" />
                  <span className="text-white text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-[#5b7fec]">
              <p className="text-white text-sm leading-relaxed font-semibold">
                Мы не даём советы. Мы строим систему и ведём бизнес к результату
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
