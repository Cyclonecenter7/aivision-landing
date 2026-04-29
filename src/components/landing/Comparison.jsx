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



export default function Comparison() {
  return (
    <section className="bg-[#F0F2F5] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-px bg-[#0A0A0A]" />
          <span className="text-[#0A0A0A] text-xs font-medium uppercase tracking-widest">Отличие</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-12">
          Чем AIVISION отличается<br />от классического консалтинга
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Classic */}
          <div className="bg-white border border-[#E8E8E8] p-8">
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

          {/* AiVision */}
          <div className="bg-[#181818] p-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#3F6EE8] mb-6">
              AIVISION
            </div>
            <div className="flex flex-col">
              {aivision.map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-3.5 border-b border-[#2A2A2A] last:border-0">
                  <div className="w-1.5 h-1.5 bg-[#3F6EE8] flex-shrink-0" />
                  <span className="text-[#ccc] text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-[#3F6EE8]">
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