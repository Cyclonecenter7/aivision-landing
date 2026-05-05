import { Section, Eyebrow } from '@/components/ui';

export default function ComparisonWithForm() {
  const cards = [
    { crossed: 'Отчёт в PDF', ours: 'Мы строим систему' },
    { crossed: 'Рекомендации и уход', ours: 'Мы сдаём и остаёмся' },
    { crossed: 'Зависимость от эксперта', ours: 'Система остаётся у вас' },
  ];

  return (
    <Section id="comparison" className="bg-white py-16 md:py-24">
        <Eyebrow>Отличие</Eyebrow>
        <h2 className="text-4xl md:text-5xl font-bold text-background leading-tight mb-10">
          Мы не консалтинг.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="border-l-2 border-blue pl-5 py-1"
            >
              <div className="text-[#AAA] text-xs font-semibold uppercase tracking-widest mb-2">Консалтинг</div>
              <div className="text-[#AAA] text-sm line-through mb-3">{card.crossed}</div>
              <div className="text-background text-lg font-bold">{card.ours}</div>
            </div>
          ))}
        </div>
    </Section>
  );
}
