const API_BASE = import.meta.env.PUBLIC_API_URL || '';

function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0]) % 16;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function parseUTM() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_term: params.get('utm_term') || '',
    utm_content: params.get('utm_content') || '',
  };
}

function hasUTM(utm) {
  return Object.values(utm).some(v => v);
}

export async function initTracker() {
  let visitor_id = localStorage.getItem('aivision_visitor_id');
  if (!visitor_id) {
    visitor_id = generateUUID();
    localStorage.setItem('aivision_visitor_id', visitor_id);
  }

  let session_id = sessionStorage.getItem('aivision_session_id');
  if (!session_id) {
    session_id = generateUUID();
    sessionStorage.setItem('aivision_session_id', session_id);
    const utm = parseUTM();
    const referrer = document.referrer || '';

    if (hasUTM(utm) || (referrer && !referrer.includes(window.location.hostname))) {
      const touches = JSON.parse(localStorage.getItem('aivision_touches') || '[]');
      touches.push({ ...utm, referrer, ts: Date.now() });
      if (touches.length > 50) touches.splice(0, touches.length - 50);
      localStorage.setItem('aivision_touches', JSON.stringify(touches));
    }

    // Новый контракт: один session-эвент на новую сессию (visitor_id внутри).
    try {
      await fetch(`${API_BASE}/api/v1/ingest/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Ingest-Key': import.meta.env.PUBLIC_INGEST_KEY,
        },
        body: JSON.stringify({
          event: 'session',
          visitor_id,
          session_id,
          utm_source: utm.utm_source,
          utm_medium: utm.utm_medium,
          utm_campaign: utm.utm_campaign,
          utm_term: utm.utm_term,
          utm_content: utm.utm_content,
          referrer,
          landing_page: window.location.href,
          user_agent: navigator.userAgent,
        }),
      });
    } catch (e) { /* silent */ }
  }

  return { visitor_id, session_id };
}

export function getTrackingData() {
  const visitor_id = localStorage.getItem('aivision_visitor_id') || '';
  const session_id = sessionStorage.getItem('aivision_session_id') || '';
  const utm = parseUTM();
  const referrer = document.referrer || '';
  const landing_page = sessionStorage.getItem('aivision_landing') || window.location.href;
  return { visitor_id, session_id, ...utm, referrer, landing_page };
}

export function trackClick(element_text, element_id = '', source_block = '') {
  const { visitor_id, session_id } = getTrackingData();
  const payload = JSON.stringify({
    event: 'click',
    visitor_id, session_id, element_id, element_text,
    source_block, page_url: window.location.href,
  });
  // sendBeacon не умеет ставить кастомные заголовки → не может нести X-Ingest-Key.
  // fetch с keepalive сохраняет доставку при unload/навигации.
  fetch(`${API_BASE}/api/v1/ingest/track`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Ingest-Key': import.meta.env.PUBLIC_INGEST_KEY,
    },
    body: payload,
    keepalive: true,
  }).catch(() => {});
}

export async function saveLead({ name, contact, contact_type, source_block, website }) {
  const t = getTrackingData();
  let res;
  try {
    res = await fetch(`${API_BASE}/api/v1/ingest/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Ingest-Key': import.meta.env.PUBLIC_INGEST_KEY,
      },
      body: JSON.stringify({
        contact,
        name,
        contact_type,
        source_block,
        utm_source: t.utm_source,
        utm_medium: t.utm_medium,
        utm_campaign: t.utm_campaign,
        website, // honeypot — humans leave empty
      }),
    });
  } catch (netErr) {
    throw new Error('Нет связи. Проверь интернет и попробуй снова.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Ошибка сервера (${res.status}). Попробуй снова.`);
  }
  return data.lead || data;
}