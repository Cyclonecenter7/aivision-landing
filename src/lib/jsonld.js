const SITE = import.meta.env.PUBLIC_SITE_URL || 'https://aivisionpro.ru';

// Organization — оператор персональных данных.
// Данные из пакета партнёра (Будаева Ю.Ю., самозанятая).
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'AIVISION',
  alternateName: 'Будаева Юлия Юрьевна',
  url: SITE,
  logo: `${SITE}/logo-512.png`,
  email: 'support@aivisionpro.ru',
  telephone: '+7-985-664-80-01',
  taxID: '333412284650',
  description:
    'Агентство управленческих решений. Видимость, контроль и управляемость бизнеса через одну платформу — сайт, CRM, дашборд, учёт в единой системе.',
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
