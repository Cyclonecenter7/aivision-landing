const API_BASE = import.meta.env.VITE_API_URL || '';

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
    const utm = parseUTM();
    const referrer = document.referrer || '';
    try {
      await fetch(`${API_BASE}/api/visitors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitor_id,
          user_agent: navigator.userAgent,
          first_utm_source: utm.utm_source,
          first_utm_medium: utm.utm_medium,
          first_utm_campaign: utm.utm_campaign,
          first_utm_term: utm.utm_term,
          first_utm_content: utm.utm_content,
          first_referrer: referrer,
          first_page: window.location.href,
        }),
      });
    } catch (e) { /* silent */ }
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

    try {
      await fetch(`${API_BASE}/api/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id,
          visitor_id,
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

export async function trackClick(element_text, element_id = '') {
  const { visitor_id, session_id } = getTrackingData();
  try {
    await fetch(`${API_BASE}/api/clicks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitor_id,
        session_id,
        element_id,
        element_text,
        page_url: window.location.href,
      }),
    });
  } catch (e) { /* silent */ }
}

export async function saveLead({ name, contact, contact_type, source_block, website }) {
  const tracking = getTrackingData();
  let res;
  try {
    res = await fetch(`${API_BASE}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, contact, contact_type, source_block, website, status: 'new', ...tracking }),
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