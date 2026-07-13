const SITE = import.meta.env.PUBLIC_SITE_URL || 'https://aivisionpro.ru';

// Organization — оператор персональных данных.
// Данные из пакета партнёра (Будаева Ю.Ю., ИП).
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'AIVISION',
  alternateName: 'Будаева Юлия Юрьевна',
  url: SITE,
  logo: `${SITE}/logo-512.png`,
  email: 'admin@aivisionpro.ru',
  telephone: '+7-985-664-80-01',
  taxID: '333412284650',
  description:
    'Агентство управленческих решений. Видимость, контроль и управляемость бизнеса через одну платформу — сайт, CRM, дашборд, учёт в единой системе.',
  areaServed: { '@type': 'Country', name: 'Россия' },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+7-985-664-80-01',
    email: 'admin@aivisionpro.ru',
    contactType: 'sales',
    areaServed: 'RU',
    availableLanguage: 'Russian',
  },
  sameAs: [
    'https://t.me/aivision_pro',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  url: SITE,
  name: 'AIVISION',
  publisher: { '@id': `${SITE}/#organization` },
  inLanguage: 'ru-RU',
};

export function caseSchema(caseData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseData.title,
    image: caseData.ogImage?.startsWith('http')
      ? caseData.ogImage
      : `${SITE}${caseData.ogImage || ''}`,
    datePublished: caseData.datePublished,
    author: { '@id': `${SITE}/#organization` },
    publisher: { '@id': `${SITE}/#organization` },
  };
}

// FAQPage — переиспользует тексты из src/data/faq.js как есть (не меняем).
// Даёт expandable FAQ-сниппет в выдаче Google.
export function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: Array.isArray(it.a) ? it.a.join(' ') : it.a,
      },
    })),
  };
}

// BreadcrumbList — хлебные крошки в выдаче. items: [{ name, url }].
export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url.startsWith('http') ? it.url : `${SITE}${it.url}`,
    })),
  };
}

// Service + Offer — открытые цены в выдаче (цифры с блока «Стоимость»).
export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE}/#service`,
  name: 'Управленческая платформа AIVISION',
  serviceType: 'Внедрение управленческого учёта и BI',
  provider: { '@id': `${SITE}/#organization` },
  areaServed: { '@type': 'Country', name: 'Россия' },
  offers: [
    {
      '@type': 'Offer',
      name: 'Внедрение платформы',
      priceCurrency: 'RUB',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: 200000,
        maxPrice: 350000,
        priceCurrency: 'RUB',
      },
    },
    {
      '@type': 'Offer',
      name: 'Поддержка',
      priceCurrency: 'RUB',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        minPrice: 25000,
        maxPrice: 40000,
        priceCurrency: 'RUB',
        unitCode: 'MON',
      },
    },
  ],
};
