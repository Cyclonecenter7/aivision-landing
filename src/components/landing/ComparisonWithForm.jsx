export default function ComparisonWithForm() {
  const cards = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="6" y="4" width="20" height="24" rx="1" stroke="#E8E8E8" strokeWidth="1.5" fill="none" />
          <line x1="10" y1="11" x2="22" y2="11" stroke="#E8E8E8" strokeWidth="1.5" />
          <line x1="10" y1="15" x2="22" y2="15" stroke="#E8E8E8" strokeWidth="1.5" />
          <line x1="10" y1="19" x2="18" y2="19" stroke="#E8E8E8" strokeWidth="1.5" />
          <line x1="8" y1="6" x2="24" y2="26" stroke="#E5484D" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      crossed: 'Отчёт в PDF',
      ours: 'Панель управления под ключ',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="10" r="4" stroke="#E8E8E8" strokeWidth="1.5" fill="none" />
          <path d="M10 24c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#E8E8E8" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M22 14l4 4" stroke="#E8E8E8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="6" x2="24" y2="26" stroke="#E5484D" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      crossed: 'Рекомендации и уход',
      ours: 'Внедрение и результат',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="12" y="14" width="8" height="10" rx="1" stroke="#E8E8E8" strokeWidth="1.5" fill="none" />
          <path d="M12 14v-2a4 4 0 1 1 8 0v2" stroke="#E8E8E8" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <line x1="8" y1="6" x2="24" y2="26" stroke="#E5484D" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      crossed: 'Зависимость от эксперта',
      ours: 'Инструмент остаётся у вас',
    },
  ];

  return (
    <section id="comparison" className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-6 h-px bg-[#0A0A0A]" />
          <span className="text-[#0A0A0A] text-xs font-medium uppercase tracking-widest">
            Отличие от консалтинга
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-semibold text-[#0A0A0A] leading-tight mb-10">
          Мы делаем, а не советуем.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="border border-[#E8E8E8] p-5 flex flex-col gap-4"
            >
              {card.icon}
              <div className="text-[#AAA] text-sm line-through">{card.crossed}</div>
              <div className="text-[#0A0A0A] text-base font-bold">{card.ours}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
