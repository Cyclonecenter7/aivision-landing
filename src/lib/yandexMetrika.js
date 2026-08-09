export const YANDEX_METRIKA_ID = 109677313;

const PENDING_GOALS_KEY = '__shvecYmPendingGoals';

function hasAnalyticsConsent() {
  try {
    return window.localStorage.getItem('shvec_cookie_consent') === 'accepted';
  } catch {
    return false;
  }
}

function queueGoal(goalName, params) {
  const queue = Array.isArray(window[PENDING_GOALS_KEY])
    ? window[PENDING_GOALS_KEY]
    : [];
  // Только память текущей страницы: ничего не пишем в cookies/localStorage.
  queue.push({ goalName, params });
  window[PENDING_GOALS_KEY] = queue.slice(-20);
}

export function flushPendingYandexGoals() {
  if (typeof window === 'undefined' || !hasAnalyticsConsent() || typeof window.ym !== 'function') {
    return 0;
  }

  const queue = Array.isArray(window[PENDING_GOALS_KEY])
    ? window[PENDING_GOALS_KEY]
    : [];
  window[PENDING_GOALS_KEY] = [];
  queue.forEach(({ goalName, params }) => {
    window.ym(YANDEX_METRIKA_ID, 'reachGoal', goalName, params);
  });
  return queue.length;
}

export function reachYandexGoal(goalName, params) {
  if (typeof window === 'undefined' || !goalName) return false;

  if (!hasAnalyticsConsent()) {
    queueGoal(goalName, params);
    return false;
  }

  if (typeof window.ym !== 'function') return false;
  window.ym(YANDEX_METRIKA_ID, 'reachGoal', goalName, params);
  return true;
}

if (typeof window !== 'undefined') {
  window.addEventListener('shvec:analytics-consent', flushPendingYandexGoals);
}
