# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual-diagnostic.spec.js >> Mobile nav readability >> construction — nav contrast check
- Location: tests/visual-diagnostic.spec.js:147:5

# Error details

```
Error: Nav must have height

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - navigation [ref=e4]:
      - link "← Кейсы" [ref=e5] [cursor=pointer]:
        - /url: /#cases
      - link "След. →" [ref=e6] [cursor=pointer]:
        - /url: /cases/ecommerce/
    - generic [ref=e7]:
      - generic [ref=e8]: NDA
      - generic [ref=e9]: Показатели изменены. Структура — реальная.
    - generic [ref=e10]:
      - generic [ref=e13]: Кейс 2 · Строительство
      - generic [ref=e14]: 4 проекта · 20+ млн ₽/мес
      - heading "Большой оборот, нулевая прозрачность — четыре проекта стали управляемыми" [level=1] [ref=e15]
      - paragraph [ref=e16]: "Не было понимания, какой проект зарабатывает, а какой съедает ресурс. При 20+ млн ₽/мес это означало: неизвестно куда уходят миллионы."
      - generic [ref=e17]:
        - generic [ref=e18]:
          - generic [ref=e19]: 4 PnL
          - generic [ref=e20]: раздельных проекта
        - generic [ref=e21]:
          - generic [ref=e22]: 1 убыточный
          - generic [ref=e23]: выявлен и признан
        - generic [ref=e24]:
          - generic [ref=e25]: +20%
          - generic [ref=e26]: рост 2 проектов
        - generic [ref=e27]:
          - generic [ref=e28]: "0"
          - generic [ref=e29]: просроченных налогов
    - generic [ref=e31]:
      - generic [ref=e34]: Три плоскости проблемы
      - generic [ref=e35]:
        - generic [ref=e36]:
          - generic [ref=e37]: Нет видимости
          - generic [ref=e38]: Один общий P&L на 4 проекта. Неизвестно куда уходят миллионы.
        - generic [ref=e39]:
          - generic [ref=e40]: Нет контроля
          - generic [ref=e41]: Всё замыкалось на собственнике. Команда без системы ответственности.
        - generic [ref=e42]:
          - generic [ref=e43]: Нет управляемости
          - generic [ref=e44]: Кассовые разрывы. Нет CRM. Договоры не структурированы.
    - generic [ref=e45]:
      - generic [ref=e48]: Система в действии · 3 разреза
      - generic [ref=e54]: 1 / 3
      - generic [ref=e58]:
        - generic [ref=e59]:
          - generic [ref=e60]: "01"
          - generic [ref=e61]:
            - generic [ref=e62]:
              - generic [ref=e63]: ОПУ
              - generic [ref=e64]: P&L по 4 проектам · апрель
            - generic [ref=e65]: Раздельная прибыль каждого проекта
            - generic [ref=e66]: 4 независимых PnL. Маржа в реальном времени. Один проект — убыточный, решение принято на цифрах.
        - generic [ref=e71]:
          - generic [ref=e72]:
            - generic [ref=e73]:
              - generic [ref=e74]: Выручка
              - generic [ref=e75]: 20,5М ₽
              - generic [ref=e76]: +12% к прошлому году
              - img [ref=e78]
            - generic [ref=e81]:
              - generic [ref=e82]: Валовая прибыль
              - generic [ref=e83]: 8,2М ₽
              - generic [ref=e84]: 40% маржа
              - img [ref=e86]
            - generic [ref=e88]:
              - generic [ref=e89]: Операционная
              - generic [ref=e90]: 5,4М ₽
              - generic [ref=e91]: 26% маржа
              - img [ref=e93]
            - generic [ref=e95]:
              - generic [ref=e96]: Чистая прибыль
              - generic [ref=e97]: 4,0М ₽
              - generic [ref=e98]: +15% к апрелю
              - img [ref=e100]
          - generic [ref=e102]:
            - generic [ref=e103]:
              - generic [ref=e105]: План / Факт · выручка по проектам
              - generic [ref=e106]: тыс. ₽
            - generic [ref=e107]:
              - generic [ref=e108]:
                - generic [ref=e109]: Итого по компании
                - generic [ref=e110]: план 22 000
                - generic [ref=e111]: 20 500
                - generic [ref=e112]: "-6.8%"
              - generic [ref=e117]:
                - generic [ref=e118]: "0"
                - generic [ref=e119]: "план: 22 000"
            - generic [ref=e120]:
              - generic [ref=e121]:
                - generic [ref=e122]: "1"
                - generic [ref=e124]: Проект 1
                - generic [ref=e125]: план 9 000
                - generic [ref=e126]: 8 200
                - generic [ref=e127]: "-8.9%"
              - generic "план" [ref=e130]
            - generic [ref=e132]:
              - generic [ref=e133]: "2"
              - generic [ref=e135]: Проект 2
              - generic [ref=e136]: план 5 800
              - generic [ref=e137]: 6 100
              - generic [ref=e138]: +5.2%
            - generic [ref=e141]:
              - generic [ref=e142]:
                - generic [ref=e143]: "3"
                - generic [ref=e145]: Проект 3
                - generic [ref=e146]: план 4 800
                - generic [ref=e147]: 4 400
                - generic [ref=e148]: "-8.3%"
              - generic "план" [ref=e151]
            - generic [ref=e152]:
              - generic [ref=e153]:
                - generic [ref=e154]: "4"
                - generic [ref=e155]:
                  - generic [ref=e156]: Проект 4
                  - generic [ref=e157]: УБЫТОЧНЫЙ
                - generic [ref=e158]: план 2 400
                - generic [ref=e159]: 1 800
                - generic [ref=e160]: "-25.0%"
              - generic "план" [ref=e163]
            - generic [ref=e164]:
              - generic [ref=e167]: выполнили / перевыполнили
              - generic [ref=e170]: отстают
              - generic [ref=e173]: марка плана
      - generic [ref=e174]:
        - button "← Назад" [disabled] [ref=e175]
        - button "Далее →" [ref=e176] [cursor=pointer]
    - generic [ref=e178]:
      - generic [ref=e181]: Результат
      - generic [ref=e182]:
        - generic [ref=e183]:
          - generic [ref=e184]: 4 PnL
          - generic [ref=e185]: раздельных
        - generic [ref=e186]:
          - generic [ref=e187]: 1 убыточный
          - generic [ref=e188]: выявлен
        - generic [ref=e189]:
          - generic [ref=e190]: +20%
          - generic [ref=e191]: рост 2 проектов
        - generic [ref=e192]:
          - generic [ref=e193]: "0"
          - generic [ref=e194]: просроченных налогов
      - generic [ref=e195]:
        - strong [ref=e196]: "Главное:"
        - text: четыре проекта перестали быть «общим котлом». Каждый — управляемая единица.
    - generic [ref=e197]:
      - generic [ref=e198]: У вас несколько проектов?
      - generic [ref=e199]: Разберём где теряются деньги между направлениями
      - button "Начать диагностику →" [ref=e200] [cursor=pointer]
  - contentinfo [ref=e201]:
    - generic [ref=e202]:
      - generic [ref=e203]:
        - img [ref=e204]
        - text: AIVISION
        - generic [ref=e206]: ·
        - link "support@aivisionpro.ru" [ref=e207] [cursor=pointer]:
          - /url: mailto:support@aivisionpro.ru
      - generic [ref=e208]:
        - link "Демо платформы" [ref=e209] [cursor=pointer]:
          - /url: /demo/
        - link "Политика ПДн" [ref=e210] [cursor=pointer]:
          - /url: /privacy-policy
        - link "Согласие на обработку ПДн" [ref=e211] [cursor=pointer]:
          - /url: /consent
      - generic [ref=e212]: © 2026 AIVISION
  - generic [ref=e213]:
    - button "Начать диагностику" [ref=e214] [cursor=pointer]
    - link "Написать в Telegram" [ref=e215] [cursor=pointer]:
      - /url: https://t.me/aivision_pro
      - img [ref=e216]
    - link "Смотреть демо" [ref=e218] [cursor=pointer]:
      - /url: /demo/
      - generic [ref=e219]:
        - img [ref=e220]
        - text: Смотреть демо
```

# Test source

```ts
  75  |   const cases = [
  76  |     { name: 'construction', url: `${BASE}/cases/construction/` },
  77  |     { name: 'education',    url: `${BASE}/cases/education/` },
  78  |     { name: 'ecommerce',    url: `${BASE}/cases/ecommerce/` },
  79  |     { name: 'esim',         url: `${BASE}/cases/esim/` },
  80  |   ];
  81  | 
  82  |   for (const c of cases) {
  83  |     test(`${c.name} — scan dashboard tabs for English`, async ({ page }) => {
  84  |       await page.goto(c.url, { waitUntil: 'networkidle', timeout: 45000 });
  85  |       await page.waitForTimeout(2500);
  86  | 
  87  |       // Click through all tabs and collect text
  88  |       const tabs = page.locator('.av-tab-btn, [class*="tab-btn"], [class*="tab-label"], button[class*="tab"]');
  89  |       const tabCount = await tabs.count();
  90  |       console.log(`  ${c.name}: found ${tabCount} tabs`);
  91  | 
  92  |       const allText = [];
  93  | 
  94  |       // Collect text from current state
  95  |       allText.push(await page.evaluate(() => document.body.innerText));
  96  | 
  97  |       // Click each tab
  98  |       for (let i = 0; i < tabCount; i++) {
  99  |         try {
  100 |           await tabs.nth(i).click();
  101 |           await page.waitForTimeout(600);
  102 |           allText.push(await page.evaluate(() => document.body.innerText));
  103 |         } catch (_) {}
  104 |       }
  105 | 
  106 |       const combined = allText.join('\n');
  107 |       const forbidden = [
  108 |         { p: /\bYoY\b/g, l: 'YoY' },
  109 |         { p: /\bYTD\b/g, l: 'YTD' },
  110 |         { p: /\bWoW\b/g, l: 'WoW' },
  111 |         { p: /\bMoM\b/g, l: 'MoM' },
  112 |         { p: /\bQoQ\b/g, l: 'QoQ' },
  113 |         { p: /\bNaN\b/g,  l: 'NaN' },
  114 |       ];
  115 | 
  116 |       const found = [];
  117 |       for (const { p, l } of forbidden) {
  118 |         const m = combined.match(p);
  119 |         if (m) found.push({ label: l, matches: [...new Set(m)] });
  120 |       }
  121 | 
  122 |       if (found.length) {
  123 |         console.log(`  FORBIDDEN ENGLISH in ${c.name} dashboard tabs: ${JSON.stringify(found)}`);
  124 |       } else {
  125 |         console.log(`  ${c.name}: no forbidden English in any tab`);
  126 |       }
  127 | 
  128 |       expect(found, `English terms in ${c.name} dashboard tabs`).toHaveLength(0);
  129 |     });
  130 |   }
  131 | });
  132 | 
  133 | // -------------------------------------------------------
  134 | // 3. Mobile: check nav buttons readability across case pages
  135 | // -------------------------------------------------------
  136 | test.describe('Mobile nav readability', () => {
  137 |   test.use({ viewport: { width: 390, height: 844 } });
  138 | 
  139 |   const cases = [
  140 |     { name: 'construction', url: `${BASE}/cases/construction/` },
  141 |     { name: 'education',    url: `${BASE}/cases/education/` },
  142 |     { name: 'ecommerce',    url: `${BASE}/cases/ecommerce/` },
  143 |     { name: 'esim',         url: `${BASE}/cases/esim/` },
  144 |   ];
  145 | 
  146 |   for (const c of cases) {
  147 |     test(`${c.name} — nav contrast check`, async ({ page }) => {
  148 |       await page.goto(c.url, { waitUntil: 'networkidle', timeout: 45000 });
  149 |       await page.waitForTimeout(1000);
  150 | 
  151 |       const navInfo = await page.evaluate(() => {
  152 |         const nav = document.querySelector('.nav');
  153 |         if (!nav) return { found: false };
  154 | 
  155 |         const backBtn = nav.querySelector('.nav-back, [class*="nav-back"], a');
  156 |         const nextBtn = nav.querySelector('.nav-next, [class*="nav-next"]');
  157 |         const navBg = window.getComputedStyle(nav).background;
  158 |         const backColor = backBtn ? window.getComputedStyle(backBtn).color : null;
  159 |         const nextColor = nextBtn ? window.getComputedStyle(nextBtn).color : null;
  160 | 
  161 |         return {
  162 |           found: true,
  163 |           navBg: navBg.slice(0, 80),
  164 |           backText: backBtn?.innerText?.trim(),
  165 |           backColor,
  166 |           nextText: nextBtn?.innerText?.trim(),
  167 |           nextColor,
  168 |           navHeight: Math.round(nav.getBoundingClientRect().height),
  169 |         };
  170 |       });
  171 | 
  172 |       console.log(`  ${c.name} nav: ${JSON.stringify(navInfo)}`);
  173 | 
  174 |       if (navInfo.found) {
> 175 |         expect(navInfo.navHeight, 'Nav must have height').toBeGreaterThan(0);
      |                                                           ^ Error: Nav must have height
  176 |         // Back button must exist
  177 |         expect(navInfo.backText, 'Back button must exist').toBeTruthy();
  178 |       }
  179 |     });
  180 |   }
  181 | });
  182 | 
  183 | // -------------------------------------------------------
  184 | // 4. Desktop: scan for specific visual problems
  185 | //    - hero stats with empty/zero values that look broken
  186 | //    - diff-row items with suspiciously short text
  187 | // -------------------------------------------------------
  188 | test.describe('Content sanity checks', () => {
  189 |   test.use({ viewport: { width: 1280, height: 900 } });
  190 | 
  191 |   const cases = [
  192 |     { name: 'construction', url: `${BASE}/cases/construction/` },
  193 |     { name: 'education',    url: `${BASE}/cases/education/` },
  194 |     { name: 'ecommerce',    url: `${BASE}/cases/ecommerce/` },
  195 |     { name: 'esim',         url: `${BASE}/cases/esim/` },
  196 |   ];
  197 | 
  198 |   for (const c of cases) {
  199 |     test(`${c.name} — content sanity`, async ({ page }) => {
  200 |       await page.goto(c.url, { waitUntil: 'networkidle', timeout: 45000 });
  201 |       await page.waitForTimeout(2500);
  202 | 
  203 |       const issues = await page.evaluate(() => {
  204 |         const problems = [];
  205 | 
  206 |         // Check hero stats for empty values
  207 |         const heroStats = document.querySelectorAll('.hero-stat-val, .hs-val, [class*="stat-val"], [class*="stat-num"]');
  208 |         for (const el of heroStats) {
  209 |           const text = el.innerText?.trim();
  210 |           if (!text || text === '0' || text === '-' || text === '—' || text === '...' || text === 'undefined') {
  211 |             problems.push({ type: 'empty-stat', cls: el.className?.toString().slice(0,60), text });
  212 |           }
  213 |         }
  214 | 
  215 |         // Check diff-row for very short descriptions (possible truncation)
  216 |         const diffDescs = document.querySelectorAll('.diff-desc, [class*="diff-desc"]');
  217 |         for (const el of diffDescs) {
  218 |           const text = el.innerText?.trim();
  219 |           if (text && text.length < 15) {
  220 |             problems.push({ type: 'short-diff-desc', text });
  221 |           }
  222 |         }
  223 | 
  224 |         // Check action descriptions are not empty
  225 |         const actionDescs = document.querySelectorAll('.action-desc, [class*="action-desc"]');
  226 |         for (const el of actionDescs) {
  227 |           const text = el.innerText?.trim();
  228 |           if (!text || text.length < 10) {
  229 |             problems.push({ type: 'empty-action-desc', cls: el.className?.toString().slice(0,60), text });
  230 |           }
  231 |         }
  232 | 
  233 |         // Check for raw "null" or "0 ₽" in visible hero stats
  234 |         const body = document.body.innerText;
  235 |         if (/\bnull\b/.test(body)) problems.push({ type: 'raw-null-in-text' });
  236 | 
  237 |         return problems;
  238 |       });
  239 | 
  240 |       if (issues.length) {
  241 |         console.log(`  ${c.name} content issues:`);
  242 |         for (const i of issues) console.log(`    ${JSON.stringify(i)}`);
  243 |       } else {
  244 |         console.log(`  ${c.name}: content looks clean`);
  245 |       }
  246 | 
  247 |       // Only fail on truly broken content, not cosmetic
  248 |       const critical = issues.filter(i =>
  249 |         i.type === 'raw-null-in-text' ||
  250 |         (i.type === 'empty-stat' && i.text === 'undefined')
  251 |       );
  252 |       expect(critical, `Critical content issues on ${c.name}`).toHaveLength(0);
  253 |     });
  254 |   }
  255 | });
  256 | 
  257 | // -------------------------------------------------------
  258 | // 5. Mobile: esim page — specific zoom on the nav area
  259 | //    (esim had reported readability issue in prior run)
  260 | // -------------------------------------------------------
  261 | test('esim mobile — nav zoom screenshot', async ({ page }) => {
  262 |   await page.setViewportSize({ width: 390, height: 844 });
  263 |   await page.goto(`${BASE}/cases/esim/`, { waitUntil: 'networkidle', timeout: 45000 });
  264 |   await page.waitForTimeout(1500);
  265 | 
  266 |   await page.screenshot({
  267 |     path: path.join(screenshotsDir, 'esim-mobile-nav-zoom.png'),
  268 |     clip: { x: 0, y: 0, width: 390, height: 60 }
  269 |   });
  270 |   console.log('esim mobile nav screenshot saved');
  271 | });
  272 | 
  273 | // -------------------------------------------------------
  274 | // 6. Construction desktop — check YoY/YTD in dashboard tabs
  275 | // -------------------------------------------------------
```