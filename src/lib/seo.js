// src/lib/seo.js
// Источник — пакет от партнёра (Юля), позиционирование выверено.
// Не откатывать тексты без согласования.
//
// Convention (Astro): path относительный, polный URL собирает seoUrl().
// ogImage — относительный путь, BaseLayout превращает в абсолютный.

const SITE = import.meta.env.PUBLIC_SITE_URL || 'https://aivisionpro.ru';

export const SEO = {
  home: {
    title: 'AIVISION — управленческая система для бизнеса от 10 млн ₽',
    description:
      'Видимость, контроль и управляемость бизнеса через одну платформу. Внедрение от 1 недели, от 200 000 ₽. Разбор бизнеса за 30 минут — начните диагностику.',
    ogTitle: 'Бизнес растёт — управляемости нет',
    ogDescription:
      'Оборот растёт, а прибыль стоит. Данные в пяти местах, решения на ощущениях. Собираем бизнес в одну систему, где собственник видит реальную картину каждый день.',
    path: '/',
    ogImage: '/og/og-main.png',
    twitterImage: '/og/og-main.png',
    robots: 'index, follow',
  },

  case1: {
    title: 'Управленческий учёт для онлайн-школы — кейс AIVISION',
    description:
      'Доход рос, маржа падала. За 30 дней построили систему: единый дашборд, P&L, привязка мотивации к марже. Маржинальность +18–27%, расходы −20%.',
    ogTitle: 'Как образовательный проект перестал терять маржу',
    ogDescription:
      'Доход рос на 3%, расходы — на 6% в месяц. Собрали маржу, оборот и расходы в один дашборд. Решения — на цифрах, а не на ощущениях.',
    path: '/case/1',
    ogImage: '/og/og-case-1.png',
    twitterImage: '/og/og-case-1.png',
    robots: 'index, follow',
  },

  case2: {
    title: 'Управленческий учёт в строительстве — кейс AIVISION',
    description:
      'Оборот 200+ млн, 4 проекта, нулевая прозрачность. Раздельный P&L по проектам, CRM, дашборд за 30 дней. Кассовых разрывов — 0, прогноз ДДС 6–12 мес.',
    ogTitle: 'Система в бизнесе с оборотом 200+ млн ₽ и 4 проектами',
    ogDescription:
      'Большой оборот — нулевая прозрачность. Один проект тихо съедал ресурс. Раздельный учёт по проектам, CRM, прогноз ДДС. Ноль кассовых разрывов.',
    path: '/case/2',
    ogImage: '/og/og-case-2.png',
    twitterImage: '/og/og-case-2.png',
    robots: 'index, follow',
  },

  case3: {
    title: 'Управление продажами на маркетплейсе — кейс AIVISION',
    description:
      'Ручной сбор данных съедал 2–3 часа в день. Подключили маркетплейс по API, собрали сквозную воронку и P&L по брендам. Продажи стали управляемым процессом.',
    ogTitle: 'Как продажи на маркетплейсе стали управляемым процессом',
    ogDescription:
      'Данные в Excel, аналитика руками, конверсия по воронке не видна. Подключили маркетплейс по API, собрали P&L по брендам и прогноз ДДС. Менеджер занимается ростом, а не сбором цифр.',
    path: '/case/3',
    ogImage: '/og/og-case-3.png',
    twitterImage: '/og/og-case-3.png',
    robots: 'index, follow',
  },

  privacy: {
    title: 'Политика конфиденциальности — AIVISION',
    description:
      'Политика обработки персональных данных AIVISION: какие данные собираем, как используем и защищаем, ваши права.',
    ogTitle: 'Политика конфиденциальности — AIVISION',
    ogDescription: 'Как AIVISION обрабатывает и защищает персональные данные.',
    path: '/privacy-policy',
    ogImage: '/og/og-main.png',
    twitterImage: '/og/og-main.png',
    robots: 'noindex, follow',
  },

  consent: {
    title: 'Согласие на обработку персональных данных — AIVISION',
    description:
      'Условия согласия на обработку персональных данных при заполнении форм на сайте AIVISION.',
    ogTitle: 'Согласие на обработку персональных данных',
    ogDescription: 'Условия обработки данных при отправке заявки на сайте AIVISION.',
    path: '/consent',
    ogImage: '/og/og-main.png',
    twitterImage: '/og/og-main.png',
    robots: 'noindex, follow',
  },
};

export const seoUrl = (seoEntry) => {
  const p = seoEntry.path;
  if (p === '/') return SITE + '/';
  return `${SITE}${p.endsWith('/') ? p : p + '/'}`;
};
