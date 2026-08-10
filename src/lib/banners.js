// Рантайм-рендер баннеров по действиям визитора.
// Работает поверх уже льющегося tracker-стрима: после init трекера тянет
// подходящий баннер из admin ingest и рендерит через island BannerHost.
//
// Поток: fetch (GET) → (immediate | after_seconds таймер) → render → impression (POST) → CTA.
// tenant НЕ передаём — он выводится сервером из X-Ingest-Key (тот же паттерн, что tracker).

const API_BASE = import.meta.env.PUBLIC_API_URL || '';
const INGEST_KEY = import.meta.env.PUBLIC_INGEST_KEY;

// --- клиентский дедуп показа (второй слой к серверному freq_cap) ---

function dedupKey(bannerId) {
  return `shvec_banner_shown:${bannerId}`;
}

// Уже показывали этот баннер в рамках текущего freq-окна?
function alreadyShown(banner) {
  const cap = banner.freq_cap || 'once_session';
  const key = dedupKey(banner.id);
  try {
    if (sessionStorage.getItem(`shvec_banner_seen_page:${banner.id}`)) return true;
    if (cap === 'every_visit') return false;
    if (cap === 'once_session') return !!sessionStorage.getItem(key);
    // once_visitor (и любые незнакомые cap-значения) — долгоживущий localStorage
    return !!localStorage.getItem(key);
  } catch {
    return false;
  }
}

function markShown(banner) {
  const cap = banner.freq_cap || 'once_session';
  const key = dedupKey(banner.id);
  const ts = String(Date.now());
  try {
    if (cap === 'once_session') sessionStorage.setItem(key, ts);
    else if (cap !== 'every_visit') localStorage.setItem(key, ts);
    // в пределах одной загрузки страницы не рендерим повторно никогда
    sessionStorage.setItem(`shvec_banner_seen_page:${banner.id}`, ts);
  } catch {
    /* хранилище недоступно — не критично */
  }
}

// --- сеть ---

async function recordImpression(banner, ids) {
  if (!API_BASE || !INGEST_KEY) return;
  try {
    await fetch(`${API_BASE}/api/v1/ingest/banners/impression`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Ingest-Key': INGEST_KEY,
      },
      body: JSON.stringify({
        banner_id: banner.id,
        event_id: crypto.randomUUID(),
        visitor_id: ids.visitor_id,
        session_id: ids.session_id,
      }),
    });
  } catch {
    /* silent — impression не блокирует показ */
  }
}

// Достаём объект баннера из envelope ok/error (или из голого тела — defensive).
function extractBanner(data) {
  if (!data || typeof data !== 'object') return null;
  if (data.ok === false) return null;
  const banner = data.banner || data.data || (data.id ? data : null);
  if (!banner || !banner.id) return null;
  return banner;
}

// --- показ ---

function showBanner(banner, ids) {
  if (alreadyShown(banner)) return;
  markShown(banner);

  // Island BannerHost смонтирован в BaseLayout и слушает это событие.
  window.dispatchEvent(new CustomEvent('shvec:show-banner', { detail: banner }));

  // Показ фиксируем сразу после рендера.
  recordImpression(banner, ids);
}

// Триггер-директива: immediate | after_seconds | scroll_percent | exit_intent.
function scheduleBanner(banner, ids) {
  const trigger = banner.trigger || {};
  const mode = trigger.mode || 'immediate';

  if (mode === 'after_seconds') {
    const seconds = Number(trigger.value) || 0;
    window.setTimeout(() => showBanner(banner, ids), Math.max(0, seconds) * 1000);
    return;
  }

  if (mode === 'scroll_percent') {
    const threshold = Math.min(95, Math.max(10, Number(trigger.value) || 65));
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 100;
      if (progress < threshold) return;
      window.removeEventListener('scroll', onScroll);
      showBanner(banner, ids);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return;
  }

  if (mode === 'exit_intent') {
    // Exit intent имеет смысл только на desktop. На touch-устройствах используем
    // аккуратный fallback по времени, чтобы не ловить каждое движение пальца.
    if (window.matchMedia('(pointer: fine)').matches) {
      const onLeave = (event) => {
        if (event.clientY > 0) return;
        document.removeEventListener('mouseout', onLeave);
        showBanner(banner, ids);
      };
      document.addEventListener('mouseout', onLeave);
    } else {
      window.setTimeout(() => showBanner(banner, ids), Math.max(20, Number(trigger.value) || 45) * 1000);
    }
    return;
  }

  showBanner(banner, ids);
}

// --- init: вызывать после initTracker (нужны visitor_id / session_id) ---

export async function initBanners(ids) {
  if (typeof window === 'undefined') return;
  if (!API_BASE || !INGEST_KEY) return;

  const visitor_id = ids?.visitor_id || localStorage.getItem('shvec_visitor_id') || '';
  const session_id = ids?.session_id || sessionStorage.getItem('shvec_session_id') || '';
  if (!visitor_id || !session_id) return;

  const params = new URLSearchParams({
    visitor_id,
    session_id,
    page: window.location.pathname,
    seconds: '0',
  });

  let res;
  try {
    res = await fetch(`${API_BASE}/api/v1/ingest/banners?${params.toString()}`, {
      method: 'GET',
      headers: { 'X-Ingest-Key': INGEST_KEY },
    });
  } catch {
    return; // сеть/CORS/CSP — баннеры не критичны, молча выходим
  }

  // 204 / пусто → нет матча, ничего не рендерим.
  if (!res || res.status === 204 || !res.ok) return;

  let data;
  try {
    data = await res.json();
  } catch {
    return;
  }

  const banner = extractBanner(data);
  if (!banner) return;

  scheduleBanner(banner, { visitor_id, session_id });
}
