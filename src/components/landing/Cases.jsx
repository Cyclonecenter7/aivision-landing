import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DS_COLORS = { green: '#16A34A', red: '#E5484D', blue: '#3F6EE8' };
const ch = (px) => ({ clipPath: `polygon(0 0,100% 0,100% calc(100% - ${px}px),calc(100% - ${px}px) 100%,0 100%)` });

// metricColor: 'green' | 'red' | 'blue' (only 3 DS data colors)
const cases = [
  {
    id: 1,
    tag: 'Образование',
    title: 'Как образовательный проект перестал терять маржу',
    context: 'Выручка 12 млн ₽/мес — маржа падала 4 месяца подряд',
    summary: 'Доход рос, расходы — быстрее. Собственник видел оборот, но не видел маржи.',
    metrics: ['+18–27%', '−20%', '+20%'],
    metricColors: ['green', 'green', 'green'],
    metricLabels: ['к марже', 'расходов', 'повт. продаж'],
    available: true,
    hero: { value: '+93%', label: 'рост маржи', sub: 'за 2 месяца' },
  },
  {
    id: 2,
    tag: 'Оборот 200+ млн',
    title: 'Система в бизнесе с 4 проектами',
    context: '4 направления бизнеса — ни одного сводного отчёта',
    summary: 'Большой оборот — нулевая прозрачность. Выявлен убыточный проект, скрытый в общем PnL.',
    metrics: ['100%', '4', '+18%'],
    metricColors: ['blue', 'blue', 'green'],
    metricLabels: ['операций в учёте', 'направления в одном PnL', 'маржа за квартал'],
    available: true,
    hero: { value: '200М+', label: 'оборот под контролем', sub: '4 отдельных PnL' },
  },
  {
    id: 3,
    tag: 'E-commerce',
    title: 'Рост выручки на 35% за квартал',
    context: 'Рост выручки +40% за год — при этом чистая прибыль не менялась',
    summary: 'Данные были, но решения принимались вслепую. Выстроили систему аналитики и KPI.',
    metrics: ['+35%', '+8%', '−60%'],
    metricColors: ['green', 'green', 'green'],
    metricLabels: ['выручка за квартал', 'конверсия', 'времени на отчёты'],
    available: true,
    hero: { value: '+35%', label: 'рост выручки', sub: 'за квартал' },
  },
];

export default function Cases() {
  const navigate = useNavigate();

  return (
    <section id="cases" className="bg-[#F4F4F5] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex items-center gap-3 mb-5">
          <div className="w-6 h-px bg-[#3F6EE8]" />
          <span className="text-[#3F6EE8] text-xs font-medium uppercase tracking-widest">Кейсы</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-semibold text-[#0A0A0A] leading-tight mb-10">
          Результаты в цифрах
        </h2>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {cases.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => c.available && navigate(`/case/${c.id}`)}
              className={`text-left bg-white border border-[#E8E8E8] flex flex-col transition-all overflow-hidden ${
                c.available ? 'hover:border-[#3F6EE8] hover:shadow-sm cursor-pointer' : 'opacity-40 cursor-default'
              }`}
            >
              {/* Hero preview block */}
              <div className="w-full flex-shrink-0 bg-[#3F6EE8] px-6 py-5 flex items-end justify-between">
                <div className="text-white text-5xl font-black leading-none tracking-tight opacity-90">{c.hero.value}</div>
                <div className="text-white/40 text-[10px] uppercase tracking-widest font-medium text-right leading-relaxed">{c.hero.label}<br/>{c.hero.sub}</div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                {/* Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="bg-[#EEF3FD] px-2.5 py-1 text-[#3F6EE8] text-[10px] font-semibold uppercase tracking-widest">
                    {c.tag}
                  </div>
                  {!c.available && (
                    <span className="text-[#CCC] text-[10px] uppercase tracking-widest">Скоро</span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-[#0A0A0A] text-base font-semibold leading-snug mb-2">{c.title}</h3>
                {c.context && (
                  <p style={{ fontSize: 12, color: '#999', fontStyle: 'italic', marginBottom: 8 }}>{c.context}</p>
                )}
                <p className="text-[#888] text-xs leading-relaxed mb-6 flex-1">{c.summary}</p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {c.metrics.map((m, i) => (
                    <div key={i} style={{ background: '#F4F4F5', border: '1px solid #E8E8E8', padding: '10px 8px' }}>
                      <div style={{ fontSize: 8, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#AAA', marginBottom: 4, minHeight: 20 }}>{c.metricLabels[i]}</div>
                      <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.025em', fontVariantNumeric: 'tabular-nums', color: DS_COLORS[c.metricColors?.[i]] || '#3F6EE8' }}>{m}</div>
                    </div>
                  ))}
                </div>

                {c.available && (
                  <div className="flex items-center gap-2 text-[#3F6EE8] text-xs font-medium">
                    Читать кейс <ArrowRight size={12} />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>


    </section>
  );
}