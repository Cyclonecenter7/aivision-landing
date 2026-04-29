export default function ComparisonWithForm() {
  const cards = [
    { crossed: 'Отчёт в PDF', ours: 'Мы строим систему' },
    { crossed: 'Рекомендации и уход', ours: 'Мы сдаём и остаёмся' },
    { crossed: 'Зависимость от эксперта', ours: 'Система остаётся у вас' },
  ];

  return (
    <section id="comparison" className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-6 h-px bg-[#3F6EE8]" />
          <span className="text-[#3F6EE8] text-xs font-medium uppercase tracking-widest">
            Отличие
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] leading-tight mb-10">
          Мы не консалтинг.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="border-l-2 border-[#3F6EE8] pl-5 py-1"
            >
              <div className="text-[#AAA] text-xs font-semibold uppercase tracking-widest mb-2">Консалтинг</div>
              <div className="text-[#AAA] text-sm line-through mb-3">{card.crossed}</div>
              <div className="text-[#0A0A0A] text-lg font-bold">{card.ours}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
