const API_BASE = import.meta.env.PUBLIC_API_URL || '';
const INGEST_KEY = import.meta.env.PUBLIC_INGEST_KEY || '';
const VISITOR_KEY = 'shvec_visitor_id';
const SESSION_KEY = 'shvec_session_id';
const CONTEXT_KEY = 'shvec_session_context';
const TRACKED_KEY = 'shvec_session_tracked';
let ready;

function uuid() {
  return crypto.randomUUID();
}

function readUTM() {
  const p = new URLSearchParams(window.location.search);
  return Object.fromEntries(['source', 'medium', 'campaign', 'term', 'content'].map((key) => [`utm_${key}`, p.get(`utm_${key}`) || '']));
}

function ids() {
  let visitor_id = localStorage.getItem(VISITOR_KEY);
  if (!visitor_id) { visitor_id = uuid(); localStorage.setItem(VISITOR_KEY, visitor_id); }
  let session_id = sessionStorage.getItem(SESSION_KEY);
  if (!session_id) { session_id = uuid(); sessionStorage.setItem(SESSION_KEY, session_id); }
  return { visitor_id, session_id };
}

function sessionContext() {
  const existing = sessionStorage.getItem(CONTEXT_KEY);
  if (existing) {
    try { return JSON.parse(existing); } catch { sessionStorage.removeItem(CONTEXT_KEY); }
  }
  const context = { ...ids(), ...readUTM(), referrer: document.referrer || '', landing_page: window.location.href };
  sessionStorage.setItem(CONTEXT_KEY, JSON.stringify(context));
  return context;
}

async function postTrack(payload, keepalive = false) {
  const res = await fetch(`${API_BASE}/api/v1/ingest/track`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Ingest-Key': INGEST_KEY },
    body: JSON.stringify(payload), keepalive,
  });
  if (!res.ok) throw new Error(`track failed: ${res.status}`);
}

// A click waits for this promise. We prefer dropping an early click to storing a
// click without its session: the latter makes funnels look real while being wrong.
export function initTracker() {
  if (ready) return ready;
  ready = (async () => {
    const context = sessionContext();
    if (!sessionStorage.getItem(TRACKED_KEY)) {
      await postTrack({ event: 'session', ...context, user_agent: navigator.userAgent });
      sessionStorage.setItem(TRACKED_KEY, '1');
    }
    return context;
  })().catch((error) => {
    // Do not poison the tab after a transient outage: the next user action or
    // page init starts a fresh session-write attempt with the same session id.
    ready = null;
    throw error;
  });
  return ready;
}

export function getTrackingData() { return sessionContext(); }

export function trackClick(element_text, element_id = '', source_block = '', options = {}) {
  const event_id = uuid();
  initTracker().then((context) => postTrack({
    event: 'click', event_id, visitor_id: context.visitor_id, session_id: context.session_id,
    element_id, element_text: String(element_text || '').slice(0, 240), source_block,
    page_url: window.location.href, banner_id: options.bannerId || undefined,
  }, true)).catch(() => {});
  return event_id;
}

export async function saveLead({ name, contact, contact_type, source_block, turnover, website }) {
  const t = await initTracker();
  const res = await fetch(`${API_BASE}/api/v1/ingest/leads`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Ingest-Key': INGEST_KEY },
    body: JSON.stringify({ contact, name, contact_type, source_block, turnover: turnover || '', website,
      visitor_id: t.visitor_id, session_id: t.session_id, landing_page: t.landing_page, referrer: t.referrer,
      utm_source: t.utm_source, utm_medium: t.utm_medium, utm_campaign: t.utm_campaign }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Ошибка сервера (${res.status}). Попробуй снова.`);
  return data.lead || data;
}
