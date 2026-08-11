(function () {
  var YM_ID = 109677313;
  if (window.__shvecYmInitialized) return;
  window.__shvecYmInitialized = true;

  (function (m, e, t, r, i, k, a) {
    m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j += 1) {
      if (document.scripts[j].src === r) return;
    }
    k = e.createElement(t);
    a = e.getElementsByTagName(t)[0];
    k.async = 1;
    k.src = r;
    a.parentNode.insertBefore(k, a);
  })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=' + YM_ID, 'ym');

  window.ym(YM_ID, 'init', {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: 'dataLayer',
    accurateTrackBounce: true,
    trackLinks: true,
    referrer: document.referrer,
    url: window.location.href,
  });
  window.ym(YM_ID, 'reachGoal', 'Demo_enter_success');
})();
