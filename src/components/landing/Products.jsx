import { useState } from 'react';
import ContactModal from './ContactModal';
import { Section, Eyebrow } from '@/components/ui';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const products = [
  {
    id: '01',
    name: 'Диагностика бизнеса',
    duration: '1–2 недели',
    subtitle: 'Для тех кто хочет разобраться',
    desc: 'Погружаемся в бизнес, строим карту показателей, проектируем систему.',
    tags: ['Карта потерь', 'Структура KPI', 'ТЗ на систему'],
    list: [
      'Анализ финансовой структуры',
      'Выявление точек потерь прибыли',
      'Карта центров затрат',
      'Диагностика юнит-экономики',
      'Приоритетный план внедрения',
      'ТЗ на систему управления',
    ],
    note: 'Если идёте дальше — стоимость входит в проект',
    price: 'от 50 000 ₽',
    cta: 'Начать диагностику',
    flagship: false,
    theme: 'white',
    source: 'products_cta_01',
  },
  {
    id: '02',
    name: 'Платформа AIVISION',
    duration: '1 неделя',
    subtitle: 'Для тех кому нужен старт быстро',
    desc: 'Готовая платформа: сайт, CRM, дашборд с KPI и P&L — в одной системе. За неделю.',
    tags: ['Сайт + CRM', 'Дашборд KPI', 'Контроль задач'],
    list: [
      'Сайт под задачу бизнеса',
      'CRM: заявки, клиенты, сделки, задачи',
      'Дашборд с маржой, оборотом, расходами',
      'Heat-классификация лидов',
      'Базовый управленческий учёт',
      'Обучение команды на сдаче',
    ],
    note: 'Без склейки Tilda, amoCRM и ПланФакта',
    price: 'от 150 000 ₽',
    cta: 'Посмотреть платформу',
    flagship: false,
    theme: 'gray',
    source: 'products_cta_02',
  },
  {
    id: '03',
    name: 'Система управляемой прибыли',
    duration: '1–2 месяца',
    subtitle: 'Для тех кто знает что хочет',
    desc: 'Знаете что нужно — мы строим. Собираем требования, разрабатываем и сдаём под ключ.',
    tags: ['Единый дашборд', 'Прозрачный PnL', 'KPI по отделам'],
    list: [
      'Центр управления бизнесом',
      'Автоматический план-факт',
      'BI-отчётность и интеграции',
      'Регламент принятия решений',
    ],
    note: 'Вы видите бизнес в цифрах — не через ощущения',
    price: 'от 250 000 ₽',
    cta: 'Начать диагностику',
    flagship: true,
    theme: 'blue',
    source: 'products_cta_03',
  },
  {
    id: '04',
    name: 'Контур роста',
    duration: '3–6 месяцев',
    subtitle: 'Долгосрочное партнёрство',
    desc: 'Система работает, данные актуальны. Дорабатываем под рост, остаёмся управленческим партнёром.',
    tags: ['Стратегия роста', 'Партнёр 24/7', 'Масштабирование'],
    list: [
      'Предиктивная аналитика',
      'Маржинальность в реальном времени',
      'Автооповещения по отклонениям',
    ],
    note: 'Система остаётся у вас — не зависит от одного человека',
    price: 'от 300 000 ₽',
    cta: 'Начать диагностику',
    flagship: false,
    theme: 'black',
    source: 'products_cta_04',
  },
];

// ---------------------------------------------------------------------------
// Theme tokens (inline styles — no dynamic Tailwind class generation)
// ---------------------------------------------------------------------------
const themes = {
  white: {
    cardBg: '#FFFFFF',
    numBadgeBg: '#EEF2FF',
    numBadgeText: '#3F6EE8',
    durationColor: '#999999',
    tagBg: '#F0F4FF',
    tagText: '#3F6EE8',
    descColor: '#525252',
    listColor: '#525252',
    dashColor: '#999999',
    dividerColor: '#E8E8E8',
    noteColor: '#999999',
    priceColor: '#0A0A0A',
    ctaBg: '#F0F2F8',
    ctaText: '#0A0A0A',
    headingColor: '#0A0A0A',
    subtitleColor: '#888888',
  },
  gray: {
    cardBg: '#F0F2F8',
    numBadgeBg: '#E4E9FF',
    numBadgeText: '#3F6EE8',
    durationColor: '#999999',
    tagBg: '#E8EDFF',
    tagText: '#3F6EE8',
    descColor: '#525252',
    listColor: '#525252',
    dashColor: '#999999',
    dividerColor: '#E8E8E8',
    noteColor: '#999999',
    priceColor: '#0A0A0A',
    ctaBg: '#3F6EE8',
    ctaText: '#ffffff',
    headingColor: '#0A0A0A',
    subtitleColor: '#888888',
  },
  blue: {
    cardBg: '#3F6EE8',
    numBadgeBg: 'rgba(255,255,255,0.18)',
    numBadgeText: '#ffffff',
    durationColor: 'rgba(255,255,255,0.5)',
    tagBg: 'rgba(255,255,255,0.14)',
    tagText: '#ffffff',
    descColor: 'rgba(255,255,255,0.78)',
    listColor: 'rgba(255,255,255,0.72)',
    dashColor: 'rgba(255,255,255,0.3)',
    dividerColor: 'rgba(255,255,255,0.14)',
    noteColor: 'rgba(255,255,255,0.4)',
    priceColor: '#ffffff',
    ctaBg: 'rgba(255,255,255,0.14)',
    ctaText: '#ffffff',
    headingColor: '#ffffff',
    subtitleColor: 'rgba(255,255,255,0.65)',
  },
  black: {
    cardBg: '#0A0A0A',
    numBadgeBg: 'rgba(255,255,255,0.08)',
    numBadgeText: 'rgba(255,255,255,0.6)',
    durationColor: 'rgba(255,255,255,0.3)',
    tagBg: 'rgba(255,255,255,0.07)',
    tagText: 'rgba(255,255,255,0.6)',
    descColor: 'rgba(255,255,255,0.5)',
    listColor: 'rgba(255,255,255,0.48)',
    dashColor: 'rgba(255,255,255,0.18)',
    dividerColor: 'rgba(255,255,255,0.07)',
    noteColor: 'rgba(255,255,255,0.22)',
    priceColor: '#ffffff',
    ctaBg: '#3F6EE8',
    ctaText: '#ffffff',
    headingColor: '#ffffff',
    subtitleColor: 'rgba(255,255,255,0.45)',
  },
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function ProductCard({ p, onCtaClick }) {
  const t = themes[p.theme];

  return (
    <div
      className="product-card relative"
      style={{
        background: t.cardBg,
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)',
      }}
    >
      {/* Flagship badge */}
      {p.flagship && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 22,
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            background: '#10B981',
            color: '#fff',
            padding: '4px 10px 5px',
            clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%)',
          }}
        >
          Флагман
        </div>
      )}

      {/* Zone 1 — num + duration */}
      <div
        className="card-num"
        style={{
          padding: p.flagship ? '36px 22px 0' : '22px 22px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 600,
            background: t.numBadgeBg,
            color: t.numBadgeText,
            flexShrink: 0,
            clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)',
          }}
        >
          {p.id}
        </div>
        <span style={{ fontSize: 11, color: t.durationColor }}>{p.duration}</span>
      </div>

      {/* Zone 2 — heading + subtitle */}
      <div className="card-head" style={{ padding: '14px 22px 0' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.3, color: t.headingColor, margin: 0 }}>
          {p.name}
        </h3>
        <p style={{ fontSize: 12, fontStyle: 'italic', color: t.subtitleColor, margin: '4px 0 0' }}>
          {p.subtitle}
        </p>
      </div>

      {/* Zone 3 — description */}
      <div className="card-desc" style={{ padding: '12px 22px 0' }}>
        <p style={{ fontSize: 12, lineHeight: 1.6, color: t.descColor, margin: 0 }}>
          {p.desc}
        </p>
      </div>

      {/* Zone 4 — tags */}
      <div className="card-tags" style={{ padding: '12px 22px 0', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {p.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 10,
              fontWeight: 500,
              padding: '4px 9px',
              background: t.tagBg,
              color: t.tagText,
              clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Zone 5 — list */}
      <div
        className="card-list"
        style={{ padding: '14px 22px 0', alignSelf: 'start' }}
      >
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {p.list.map((item) => (
            <li
              key={item}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: t.listColor, lineHeight: 1.5 }}
            >
              <span style={{ color: t.dashColor, flexShrink: 0, marginTop: 1 }}>—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Zone 6 — divider + note + price */}
      <div
        className="card-footer-top"
        style={{ padding: '18px 22px 0', alignSelf: 'end' }}
      >
        <div style={{ height: 1, background: t.dividerColor, marginBottom: 12 }} />
        <p style={{ fontSize: 11, fontStyle: 'italic', color: t.noteColor, margin: '0 0 10px', lineHeight: 1.5 }}>
          {p.note}
        </p>
        <div style={{ fontSize: 20, fontWeight: 700, color: t.priceColor, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
          {p.price}
        </div>
      </div>

      {/* Zone 7 — CTA */}
      <div className="card-cta" style={{ padding: '12px 22px 22px' }}>
        <button
          data-track="products_cta"
          data-track-block="products"
          onClick={() => onCtaClick(p.source)}
          style={{
            width: '100%',
            padding: '11px 0',
            fontSize: 13,
            fontWeight: 500,
            background: t.ctaBg,
            color: t.ctaText,
            border: 'none',
            cursor: 'pointer',
            clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          {p.cta}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function Products() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState('');

  const openModal = (source) => {
    setModalSource(source);
    setModalOpen(true);
  };

  return (
    <>
      <Section id="products" className="bg-[#E2E6EF] py-16 md:py-24">
        <Eyebrow>Продукты</Eyebrow>
        <h2
          style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#0A0A0A', lineHeight: 1.2, marginBottom: 32, marginTop: 12 }}
        >
          Четыре продукта — под разный запрос
        </h2>

        <div
          className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          style={{ gap: 14 }}
        >
          {products.map((p) => (
            <ProductCard key={p.id} p={p} onCtaClick={openModal} />
          ))}
        </div>
      </Section>

      <ContactModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        source={modalSource}
      />
    </>
  );
}
