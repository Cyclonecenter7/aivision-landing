import { useState } from 'react';
import { Target, BarChart2, FileText, Monitor, TrendingUp, Users, Shield, Maximize2 } from 'lucide-react';
import ContactModal from './ContactModal';
import { Btn } from '@/components/ui';

const CUT = 28;
const clipCard = `polygon(0 0, 100% 0, 100% calc(100% - ${CUT}px), calc(100% - ${CUT}px) 100%, 0 100%)`;
const clipBtn  = `polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)`;

const products = [
  {
    id: '01',
    name: 'Диагностика бизнеса',
    subtitle: 'Для тех кто хочет разобраться',
    description: 'Не знаете что именно нужно считать? Разбираемся вместе — погружаемся в бизнес, строим карту показателей, проектируем систему.',
    chips: [
      { label: 'Карта потерь',    Icon: Target    },
      { label: 'Структура KPI',   Icon: BarChart2  },
      { label: 'ТЗ на систему',   Icon: FileText   },
    ],
    items: [
      'Анализ финансовой структуры',
      'Выявление точек потерь прибыли',
      'Карта центров затрат',
      'Диагностика юнит-экономики',
      'Приоритетный план внедрения',
      'ТЗ на систему управления',
    ],
    tagline: 'Если идёте дальше — стоимость анализа входит в проект',
    price: 'от 50 000 ₽',
    timing: '1–2 недели',
    style: 'light',
  },
  {
    id: '02',
    name: 'Система управляемой прибыли',
    subtitle: 'Для тех кто знает что хочет',
    description: 'Знаете что нужно — мы строим. Собираем требования, разрабатываем и сдаём под ключ.',
    chips: [
      { label: 'Единый дашборд',  Icon: Monitor    },
      { label: 'Прозрачный PnL',  Icon: TrendingUp  },
      { label: 'KPI по отделам',  Icon: Users       },
    ],
    items: [
      'Центр управления бизнесом',
      'Автоматический план-факт',
      'BI-отчётность и интеграции',
      'Регламент принятия решений',
    ],
    tagline: 'Вы видите бизнес в цифрах — не через ощущения',
    price: 'от 150 000 ₽',
    timing: '1–2 месяца',
    style: 'blue',
  },
  {
    id: '03',
    name: 'Контур роста',
    subtitle: '3–6 месяцев',
    description: 'Система работает, данные актуальны. Дорабатываем под рост, разбираем отклонения, остаёмся управленческим партнёром.',
    chips: [
      { label: 'Стратегия роста',  Icon: TrendingUp  },
      { label: 'Партнёр 24/7',     Icon: Shield      },
      { label: 'Масштабирование',  Icon: Maximize2   },
    ],
    items: [
      'Предиктивная аналитика',
      'Маржинальность в реальном времени',
      'Автооповещения по отклонениям',
    ],
    tagline: 'Система остаётся у вас — не зависит от одного человека',
    price: 'Индивидуально',
    timing: '3–6 месяцев',
    style: 'dark',
  },
];

const theme = {
  light: {
    card:     'bg-white border border-[#E8E8E8]',
    idBg:     'bg-[#3F6EE8]', idText: 'text-white',
    timing:   'text-[#888]',
    title:    'text-[#0A0A0A]',
    subtitle: 'text-[#AAA]',
    desc:     'text-[#666]',
    chipBg:   'bg-[#EEF1FA]',
    chipText: 'text-[#3F6EE8]',
    item:     'text-[#555]',
    itemDot:  'bg-[#3F6EE8]',
    tagline:  'text-[#999]',
    price:    'text-[#0A0A0A]',
    btn: 'primary',
  },
  blue: {
    card:     'bg-[#3F6EE8]',
    idBg:     'bg-white',  idText: 'text-[#3F6EE8]',
    timing:   'text-blue-100',
    title:    'text-white',
    subtitle: 'text-blue-200',
    desc:     'text-blue-100',
    chipBg:   'bg-white/20',
    chipText: 'text-white',
    item:     'text-blue-50',
    itemDot:  'bg-white',
    tagline:  'text-blue-100',
    price:    'text-white',
    btn: 'white',
  },
  dark: {
    card:     'bg-[#181818]',
    idBg:     'bg-[#3F6EE8]', idText: 'text-white',
    timing:   'text-[#666]',
    title:    'text-white',
    subtitle: 'text-[#666]',
    desc:     'text-[#AAA]',
    chipBg:   'bg-[#252525]',
    chipText: 'text-[#888]',
    item:     'text-[#aaa]',
    itemDot:  'bg-[#3F6EE8]',
    tagline:  'text-[#555]',
    price:    'text-white',
    btn: 'primary',
  },
};

export default function Products() {
  const [modal, setModal] = useState(false);
  return (
    <>
    <section id="products" className="bg-[#F0F2F5] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-6 h-px bg-[#3F6EE8]" />
          <span className="text-[#3F6EE8] text-xs font-medium uppercase tracking-widest">Продукты</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-semibold text-[#0A0A0A] leading-tight mb-10">
          Три продукта — под разный запрос
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {products.map((p) => {
            const t = theme[p.style];
            return (
              <div
                key={p.id}
                className={`flex flex-col p-7 h-full ${t.card}`}
                style={{ clipPath: clipCard }}
              >
                {/* Row 1 — Header: ID + timing */}
                <div className="flex items-center justify-between mb-0">
                  <div
                    className={`w-10 h-10 flex items-center justify-center text-sm font-bold ${t.idBg} ${t.idText}`}
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}
                  >
                    {p.id}
                  </div>
                  <span className={`text-xs font-medium ${t.timing}`}>{p.timing}</span>
                </div>

                {/* Row 2 — Title + subtitle */}
                <h3 className={`text-2xl font-bold leading-snug pt-4 ${t.title}`}>
                  {p.name}
                </h3>
                <p className={`text-xs italic mt-1.5 mb-3 ${t.subtitle}`}>{p.subtitle}</p>

                {/* Row 3 — Description */}
                <p className={`text-sm leading-relaxed mb-4 ${t.desc}`}>{p.description}</p>

                {/* Row 4 — Chips (rectangular with icons) */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.chips.map(({ label, Icon }, i) => (
                    <span
                      key={i}
                      className={`text-[10px] font-medium px-2.5 py-1 flex items-center gap-1 ${t.chipBg} ${t.chipText}`}
                      style={{ borderRadius: 2 }}
                    >
                      <Icon size={9} strokeWidth={2.5} />
                      {label}
                    </span>
                  ))}
                </div>

                {/* Row 5 — Items list */}
                <div className="flex flex-col gap-1.5 mb-4">
                  {p.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className={`w-1 h-1 mt-2 rounded-full flex-shrink-0 ${t.itemDot}`} />
                      <span className={`text-sm leading-relaxed ${t.item}`}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Flex spacer */}
                <div className="flex-grow" />

                {/* Row 6 — Tagline */}
                <p className={`text-xs leading-relaxed pt-4 pb-4 italic ${t.tagline}`}>{p.tagline}</p>

                {/* Row 7 — Price */}
                <div className={`text-3xl font-bold pb-4 ${t.price}`}>{p.price}</div>

                {/* CTA */}
                <Btn
                  variant={t.btn}
                  track={`product_cta_${p.id}`}
                  trackBlock="products"
                  onClick={() => setModal(true)}
                  className="block w-full text-center"
                >
                  Начать диагностику
                </Btn>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    {/* ContactModal — вне <section> для надёжности на всех браузерах */}
    <ContactModal open={modal} onClose={() => setModal(false)} source="products_cta" />
    </>
  );
}
