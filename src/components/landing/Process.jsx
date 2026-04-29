const steps = [
  { id: '01', title: 'Интервью с собственником', desc: 'Разбираем текущую модель, болевые точки и цели' },
  { id: '02', title: 'Диагностика и карта рисков', desc: 'Выявляем утечки прибыли и управленческие риски' },
  { id: '03', title: 'Проектирование модели', desc: 'Строим архитектуру управленческой системы под ваш бизнес' },
  { id: '04', title: 'Внедрение, обучение и запуск системы', desc: 'Запускаем систему, обучаем команду, передаём управление' },
];



export default function Process() {
  return (
    <section id="process" className="bg-[#F0F2F5] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-px bg-[#0A0A0A]" />
          <span className="text-[#0A0A0A] text-xs font-medium uppercase tracking-widest">Этапы работы</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-12">
          Как мы работаем
        </h2>

        <div className="grid md:grid-cols-4 gap-5">
          {steps.map((step) => (
            <div key={step.id} className="bg-white border border-[#E8E8E8] p-6">
              <div
                className="w-10 h-10 bg-[#3F6EE8] flex items-center justify-center text-white text-sm font-bold mb-5"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}
              >
                {step.id}
              </div>
              <h3 className="text-[#0A0A0A] font-semibold text-sm leading-tight mb-3">{step.title}</h3>
              <p className="text-[#888] text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}