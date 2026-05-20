const SITE = import.meta.env.PUBLIC_SITE_URL || 'https://aivisionpro.ru';

export const SEO = {
  home: {
    title: 'AIVISION — Сайт, CRM и управленческий дашборд за 1 неделю',
    description: 'Готовая платформа для бизнеса от 5 млн ₽/мес: сайт, CRM, дашборд с KPI и P&L в одной системе. Внедрение за 1 неделю. Диагностика бизнеса — бесплатно.',
    path: '/',
    ogImage: '/og/og-main.png',
  },
  case1: {
    title: 'Как образовательный бизнес поднял маржу на 27% за 30 дней — кейс AIVISION',
    description: 'Выручка 12 млн ₽/мес, маржа падала 4 месяца подряд. Построили управленческую систему: маржинальность +27%, расходы −20%, повторные продажи +20%.',
    path: '/case/1',
    ogImage: '/og/og-case-1.png',
  },
  case2: {
    title: 'Управленческий учёт для строительного бизнеса 200 млн ₽ — кейс AIVISION',
    description: '4 проекта без раздельного учёта — один тихо съедал ресурс. Построили отдельные P&L, CRM и дашборд за 30 дней. Кассовых разрывов: 0.',
    path: '/case/2',
    ogImage: '/og/og-case-2.png',
  },
  case3: {
    title: 'Автоматизация аналитики Wildberries: +35% выручки за квартал — кейс AIVISION',
    description: '3 бренда на WB, 2–3 часа в день на ручной сбор данных. Подключили API, настроили воронку и дашборд. Выручка +35% за квартал, нагрузка менеджера −35%.',
    path: '/case/3',
    ogImage: '/og/og-case-3.png',
  },
  privacy: {
    title: 'Политика конфиденциальности — AIVISION',
    description: 'Политика обработки персональных данных в соответствии с 152-ФЗ.',
    path: '/privacy-policy',
    ogImage: '/og/og-main.png',
  },
  consent: {
    title: 'Согласие на обработку персональных данных — AIVISION',
    description: 'Согласие на обработку ПД при использовании сайта aivisionpro.ru.',
    path: '/consent',
    ogImage: '/og/og-main.png',
  },
};

export const seoUrl = (seoEntry) => {
  const p = seoEntry.path;
  if (p === '/') return SITE + '/';
  return `${SITE}${p.endsWith('/') ? p : p + '/'}`;
};
