const SITE = import.meta.env.PUBLIC_SITE_URL || 'https://aivisionpro.ru';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'AIVISION',
  legalName: '<TODO>',
  url: SITE,
  logo: `${SITE}/logo-512.png`,
  email: '<TODO>',
  description: '<TODO>',
  sameAs: [],
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
    image: caseData.ogImage?.startsWith('http') ? caseData.ogImage : `${SITE}${caseData.ogImage || ''}`,
    datePublished: caseData.datePublished,
    author: { '@id': `${SITE}/#organization` },
    publisher: { '@id': `${SITE}/#organization` },
  };
}
