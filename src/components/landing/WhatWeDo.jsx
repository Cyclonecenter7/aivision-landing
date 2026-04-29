const items = [
  'Архитектура управленческой модели',
  'Финансовая логика и прозрачная прибыль',
  'KPI по отделам',
  'План-факт и контроль маржинальности',
  'BI-система и центр управления',
  'Регламент управленческого ритма',
];

const clipActive = 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)';

export default function WhatWeDo() {
  return (
    <section id="about" className="bg-[#F0F2F5] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-[#3F6EE8]" />
              <span className="text-[#3F6EE8] text-xs font-medium uppercase tracking-widest">Что мы делаем</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] leading-tight mb-6">
              AIVISION — это
            </h2>
            <p className="text-[#666] text-sm leading-relaxed mb-10">
              Вы видите, где бизнес зарабатывает, где теряет
              и управляете прибылью, а не «тушите пожары»
            </p>

            <div className="bg-white border border-[#E8E8E8] p-6" style={{ clipPath: clipActive }}>
              <div className="text-[#3F6EE8] text-xs font-semibold uppercase tracking-widest mb-3">Результат</div>
              <p className="text-[#0A0A0A] text-sm leading-relaxed">
                Собственник видит реальную картину бизнеса в цифрах
              </p>
            </div>
          </div>

          {/* Right — list */}
          <div className="bg-white border border-[#E8E8E8] overflow-hidden">
            {items.map((item, i) => (
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
    </section>
  );
}