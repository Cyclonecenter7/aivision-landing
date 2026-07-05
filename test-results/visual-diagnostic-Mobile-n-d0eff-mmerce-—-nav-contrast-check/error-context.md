# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual-diagnostic.spec.js >> Mobile nav readability >> ecommerce — nav contrast check
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
        - /url: /cases/esim/
    - generic [ref=e7]:
      - generic [ref=e8]: NDA
      - generic [ref=e9]: Показатели изменены. Структура — реальная.
    - generic [ref=e10]:
      - generic [ref=e13]: Кейс 3 · Продажи
      - generic [ref=e14]: 5+ млн ₽/мес · Стабильный рост
      - heading "Продажи шли — рост тормозила операционка" [level=1] [ref=e15]
      - paragraph [ref=e16]: Бизнес упирался не в рынок, а в одного сотрудника, который одновременно продавал и собирал отчёты.
      - generic [ref=e17]:
        - generic [ref=e18]:
          - generic [ref=e19]: −30–40%
          - generic [ref=e20]: нагрузка менеджера
        - generic [ref=e21]:
          - generic [ref=e22]: 2 ч/день
          - generic [ref=e23]: обратно в продажи
        - generic [ref=e24]:
          - generic [ref=e25]: мгновенно
          - generic [ref=e26]: данные без задержки
        - generic [ref=e27]:
          - generic [ref=e28]: 100%
          - generic [ref=e29]: прозрачность воронки
    - generic [ref=e31]:
      - generic [ref=e34]: Три плоскости проблемы
      - generic [ref=e35]:
        - generic [ref=e36]:
          - generic [ref=e37]: Нет видимости
          - generic [ref=e38]: Excel-таблицы вручную. 2 ч/день на сбор — расхождения в цифрах норма.
        - generic [ref=e39]:
          - generic [ref=e40]: Нет контроля
          - generic [ref=e41]: Всё замыкалось на одном человеке. Бизнес — в пропускную способность одного сотрудника.
        - generic [ref=e42]:
          - generic [ref=e43]: Нет управляемости
          - generic [ref=e44]: Конверсия по этапам не отслеживалась. Планирование «по факту».
    - generic [ref=e46]:
      - generic [ref=e49]: Что сделали
      - generic [ref=e50]:
        - generic [ref=e51]: "01"
        - generic [ref=e52]:
          - generic [ref=e53]: Данные собираются автоматически
          - generic [ref=e54]: API-подключение — продажи в платформе без ручного ввода. Реал-тайм вместо актуализации раз в день.
      - generic [ref=e55]:
        - generic [ref=e56]: "02"
        - generic [ref=e57]:
          - generic [ref=e58]: Воронка — видно где застревают сделки
          - generic [ref=e59]: Каждый этап с конверсией. Руководитель видит где менеджер теряет клиентов — без пересказа.
      - generic [ref=e60]:
        - generic [ref=e61]: "03"
        - generic [ref=e62]:
          - generic [ref=e63]: Эффективность менеджеров и алерты
          - generic [ref=e64]: Кто справляется, кто нет — на цифрах, не на ощущениях. Алерты по проседанию метрик — до проблемы.
    - generic [ref=e65]:
      - generic [ref=e68]: Система в действии
      - generic [ref=e71]:
        - generic [ref=e73]:
          - generic [ref=e74]: СИСТЕМА В ДЕЙСТВИИ
          - generic [ref=e75]:
            - button "Дашборд" [ref=e76] [cursor=pointer]
            - button "Закупки" [ref=e77] [cursor=pointer]
            - button "Финансы" [ref=e78] [cursor=pointer]
        - generic [ref=e79]:
          - generic [ref=e80]:
            - generic [ref=e81]:
              - generic [ref=e82]:
                - generic [ref=e83]: Выручка
                - generic [ref=e84]: 5.8M ₽
                - generic [ref=e85]: +12%vs пред.
                - img [ref=e88]
              - generic [ref=e91]:
                - generic [ref=e92]: Реклама / ДРР
                - generic [ref=e93]: 7%
                - generic [ref=e94]: −5 ппк январю
                - img [ref=e97]
              - generic [ref=e100]:
                - generic [ref=e101]: Продажи, шт
                - generic [ref=e102]: 1 247
                - generic [ref=e103]: +22%vs пред.
                - img [ref=e106]
              - generic [ref=e109]:
                - generic [ref=e110]: Остаток, дн
                - generic [ref=e111]: 14 дн.
                - generic [ref=e112]: по топу
                - img [ref=e115]
            - generic [ref=e118]:
              - generic [ref=e119]:
                - generic [ref=e122]: Закупки в пути
                - generic [ref=e123]: 9 партий · 2.4M ₽
              - generic [ref=e124]:
                - generic [ref=e125]:
                  - generic [ref=e126]: Оплачено
                  - generic [ref=e127]: "2"
                - generic [ref=e128]:
                  - generic [ref=e129]: Китай
                  - generic [ref=e130]: "4"
                - generic [ref=e131]:
                  - generic [ref=e132]: Фулфилмент
                  - generic [ref=e133]: "1"
                - generic [ref=e134]:
                  - generic [ref=e135]: Приёмка
                  - generic [ref=e136]: "2"
            - generic [ref=e137]:
              - generic [ref=e138]:
                - generic [ref=e141]: Проданные за 7 дней
                - generic [ref=e142]: 682 шт
              - generic [ref=e143]:
                - generic [ref=e144]:
                  - generic [ref=e145]:
                    - generic [ref=e146]: Товар 1
                    - generic [ref=e147]: Бренд А
                  - generic [ref=e148]: 214 шт
                  - generic [ref=e149]: 7д
                - generic [ref=e150]:
                  - generic [ref=e151]:
                    - generic [ref=e152]: Товар 2
                    - generic [ref=e153]: Бренд Б
                  - generic [ref=e154]: 186 шт
                  - generic [ref=e155]: 21д
                - generic [ref=e156]:
                  - generic [ref=e157]:
                    - generic [ref=e158]: Товар 3
                    - generic [ref=e159]: Бренд В
                  - generic [ref=e160]: 142 шт
                  - generic [ref=e161]: 16д
                - generic [ref=e162]:
                  - generic [ref=e163]:
                    - generic [ref=e164]: Товар 4
                    - generic [ref=e165]: Бренд В
                  - generic [ref=e166]: 140 шт
                  - generic [ref=e167]: СТОП
          - generic [ref=e168]: Платформа AIVISION · NDA · данные изменены
    - generic [ref=e170]:
      - generic [ref=e173]: Результат
      - generic [ref=e174]:
        - generic [ref=e175]:
          - generic [ref=e176]: −30–40%
          - generic [ref=e177]: нагрузка менеджера
        - generic [ref=e178]:
          - generic [ref=e179]: 2 ч/день
          - generic [ref=e180]: обратно в продажи
        - generic [ref=e181]:
          - generic [ref=e182]: 100%
          - generic [ref=e183]: прозрачность воронки
        - generic [ref=e184]:
          - generic [ref=e185]: алерты
          - generic [ref=e186]: по отклонениям метрик
      - generic [ref=e187]:
        - strong [ref=e188]: "Главное:"
        - text: продажи стали управляемым процессом, а не набором действий отдельных сотрудников.
    - generic [ref=e189]:
      - generic [ref=e190]: Продажи есть — роста нет?
      - generic [ref=e191]: Найдём где операционка тормозит бизнес
      - button "Начать диагностику →" [ref=e192] [cursor=pointer]
  - contentinfo [ref=e193]:
    - generic [ref=e194]:
      - generic [ref=e195]:
        - img [ref=e196]
        - text: AIVISION
        - generic [ref=e198]: ·
        - link "support@aivisionpro.ru" [ref=e199] [cursor=pointer]:
          - /url: mailto:support@aivisionpro.ru
      - generic [ref=e200]:
        - link "Демо платформы" [ref=e201] [cursor=pointer]:
          - /url: /demo/
        - link "Политика ПДн" [ref=e202] [cursor=pointer]:
          - /url: /privacy-policy
        - link "Согласие на обработку ПДн" [ref=e203] [cursor=pointer]:
          - /url: /consent
      - generic [ref=e204]: © 2026 AIVISION
  - generic [ref=e205]:
    - button "Начать диагностику" [ref=e206] [cursor=pointer]
    - link "Написать в Telegram" [ref=e207] [cursor=pointer]:
      - /url: https://t.me/aivision_pro
      - img [ref=e208]
    - link "Смотреть демо" [ref=e210] [cursor=pointer]:
      - /url: /demo/
      - generic [ref=e211]:
        - img [ref=e212]
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