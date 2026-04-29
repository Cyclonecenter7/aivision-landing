const traits = [
  'Делает 10+ млн ₽ в месяц, но не видит чистую прибыль',
  'Чувствует, что деньги проходят через бизнес, но не остаются',
  'Не понимает маржинальность по направлениям',
  'Живёт в кассовых разрывах и «ручном режиме»',
  'Собирает цифры из разных таблиц и CRM',
  'Принимает решения интуитивно, потому что нет единой картины',
  'Устал быть единственным центром контроля',
  'Понимает, что любая ошибка в управлении стоит миллионов',
];

const clipActive = 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)';

export default function Audience() {
  return (
    <section id="audience" className="bg-[#F0F2F5] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-[#3F6EE8]" />
              <span className="text-[#3F6EE8] text-xs font-medium uppercase tracking-widest">Для кого</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] leading-tight mb-6">
              Для собственника,<br />который
            </h2>

            <div className="mt-12 bg-white border border-[#E8E8E8] p-6" style={{ clipPath: clipActive }}>
              <div className="text-[#E5484D] text-sm font-semibold">Бизнес растёт,</div>
              <div className="text-[#888] text-sm mt-1">а управляемости нет!</div>
            </div>
          </div>

          {/* Right */}
          <div className="bg-white border border-[#E8E8E8] overflow-hidden">
            {traits.map((trait, i) => (
              <div key={i} className="flex items-start gap-4 px-6 py-4 border-b border-[#F0F0F0] last:border-0">
                <span className="text-[#3F6EE8] text-xs font-mono mt-0.5 flex-shrink-0 w-5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[#555] text-sm leading-relaxed">{trait}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}