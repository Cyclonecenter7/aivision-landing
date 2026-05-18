// AIVISION CRM Service Worker
// Handles incoming web-push events + click → focus/navigate.
// Kept minimal — no caching strategies (CRM is online-only).

const NOTIFICATION_DEFAULTS = {
  icon: '/favicon.svg',
  badge: '/favicon.svg',
};

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { title: 'Уведомление', body: event.data ? event.data.text() : '' };
  }
  const title = data.title || 'AIVISION CRM';
  // Tag = unique per entity (link contains entity id) → each event = separate notification.
  // Same entity updated → previous replaced (avoids spam on repeated edits of same lead/deal).
  const tag = data.link || data.type + ':' + Date.now();
  const options = {
    body: data.body || '',
    tag,
    renotify: true,
    data: { link: data.link || '/admin/dashboard' },
    icon: NOTIFICATION_DEFAULTS.icon,
    badge: NOTIFICATION_DEFAULTS.badge,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Browser rotates FCM endpoints periodically. Without this handler,
// our DB keeps the stale endpoint and push silently stops working.
// Fired when subscription is invalidated (or about to be).
self.addEventListener('pushsubscriptionchange', (event) => {
  event.waitUntil(
    (async () => {
      const oldSub = event.oldSubscription;
      // newSubscription is sometimes provided, sometimes we must subscribe again.
      let newSub = event.newSubscription;
      if (!newSub) {
        const opts = oldSub
          ? { userVisibleOnly: true, applicationServerKey: oldSub.options.applicationServerKey }
          : null;
        if (!opts) return;
        try {
          newSub = await self.registration.pushManager.subscribe(opts);
        } catch (err) {
          console.error('[SW] resubscribe failed:', err);
          return;
        }
      }
      // POST new endpoint to backend. No JWT in SW context — backend must
      // accept endpoint+keys+oldEndpoint and resolve user_id by oldEndpoint.
      const body = newSub.toJSON();
      try {
        await fetch('/api/push/resubscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            endpoint: body.endpoint,
            keys: body.keys,
            old_endpoint: oldSub?.endpoint || null,
          }),
        });
      } catch (err) {
        console.error('[SW] resubscribe POST failed:', err);
      }
    })()
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const link = event.notification.data?.link || '/admin/dashboard';
  const targetUrl = new URL(link, self.location.origin).href;

  event.waitUntil(
    (async () => {
      const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      // Try to focus an existing CRM tab and navigate it.
      for (const w of wins) {
        if (w.url.includes('/admin')) {
          await w.focus();
          if ('navigate' in w) {
            try {
              await w.navigate(targetUrl);
              return;
            } catch {
              /* cross-origin or unsupported */
            }
          }
          // Fallback: postMessage so the page can route via React Router
          w.postMessage({ type: 'sw:navigate', link });
          return;
        }
      }
      // No CRM tab open → open new window
      await self.clients.openWindow(targetUrl);
    })()
  );
});
