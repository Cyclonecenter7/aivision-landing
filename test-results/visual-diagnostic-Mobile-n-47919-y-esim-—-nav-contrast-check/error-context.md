# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual-diagnostic.spec.js >> Mobile nav readability >> esim — nav contrast check
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
        - /url: /cases/education/
    - generic [ref=e7]:
      - generic [ref=e8]: NDA
      - generic [ref=e9]: Показатели изменены. Структура — реальная.
    - generic [ref=e10]:
      - generic [ref=e13]: Кейс 4 · Запуск
      - generic [ref=e14]: E-commerce · Цифровые продукты
      - heading "Как новое направление запустилось с управленческой видимостью с первого дня" [level=1] [ref=e15]
      - paragraph [ref=e16]: Опытный собственник знал типовую траекторию запуска без системы. Задача — зашить управление до старта, а не расчищать хаос через год.
      - generic [ref=e17]:
        - generic [ref=e18]:
          - generic [ref=e19]: День 1
          - generic [ref=e20]: видимость с запуска
        - generic [ref=e21]:
          - generic [ref=e22]: 2 направления
          - generic [ref=e23]: в одной картине
        - generic [ref=e24]:
          - generic [ref=e25]: ×17
          - generic [ref=e26]: разрыв виден сразу
        - generic [ref=e27]:
          - generic [ref=e28]: 0 ₽
          - generic [ref=e29]: найм аналитика
    - generic [ref=e31]:
      - generic [ref=e34]: Точка А — типовая траектория без системы
      - generic [ref=e35]:
        - generic [ref=e36]:
          - generic [ref=e37]: Мес. 1–3 · «всё под контролем»
          - generic [ref=e38]: Цифры собираются вручную в таблицах. Заказов мало — терпимо. Иллюзия видимости.
        - generic [ref=e39]:
          - generic [ref=e40]: Мес. 6–12 · картина распадается
          - generic [ref=e41]: Оборот растёт, данные по разным кабинетам. Два платёжных направления — два отдельных учёта. Реальную экономику не увидеть.
        - generic [ref=e42]:
          - generic [ref=e43]: 12+ мес. · хаос
          - generic [ref=e44]: Решения на ощущениях. Год работы + год на расчистку.
    - generic [ref=e46]:
      - generic [ref=e49]: Что сделали
      - generic [ref=e50]:
        - generic [ref=e51]: "01"
        - generic [ref=e52]:
          - generic [ref=e53]: Сайт как точка входа в систему
          - generic [ref=e54]: Каждое действие пользователя фиксируется и попадает в общую воронку. Не отдельный продукт со своими счётчиками.
      - generic [ref=e55]:
        - generic [ref=e56]: "02"
        - generic [ref=e57]:
          - generic [ref=e58]: Единая admin-панель над двумя направлениями
          - generic [ref=e59]: Рублёвое и криптовалютное — в одной картине. Выручка, маржа, заказы, конверсия — параллельно. Кратность видна сразу.
      - generic [ref=e60]:
        - generic [ref=e61]: "03"
        - generic [ref=e62]:
          - generic [ref=e63]: "Сквозная воронка: уник → закрытый заказ"
          - generic [ref=e64]: Конверсия на каждом шаге — отдельно по каждому направлению. Видно где теряются клиенты.
      - generic [ref=e65]:
        - generic [ref=e66]: "04"
        - generic [ref=e67]:
          - generic [ref=e68]: Решения на данных, не на ощущениях
          - generic [ref=e69]: Куда вкладывать рекламный бюджет, какие продукты масштабировать — на цифрах. Топ продуктов с первого дня.
    - generic [ref=e70]:
      - generic [ref=e73]: Система в действии
      - generic [ref=e76]:
        - generic [ref=e78]:
          - generic [ref=e79]: СИСТЕМА В ДЕЙСТВИИ
          - generic [ref=e80]:
            - button "Дашборд" [ref=e81] [cursor=pointer]
            - button "Воронка" [ref=e82] [cursor=pointer]
            - button "Топ" [ref=e83] [cursor=pointer]
        - generic [ref=e84]:
          - generic [ref=e85]:
            - generic [ref=e86]:
              - generic [ref=e87]:
                - generic [ref=e88]: Напр. 1 · Выручка
                - generic [ref=e89]: 31 240 ₽
                - generic [ref=e90]: За мес. 412 800 ₽
                - img [ref=e92]
              - generic [ref=e95]:
                - generic [ref=e96]: Маржа Н1
                - generic [ref=e97]: 8 680 ₽
                - generic [ref=e98]: ~27% от выручки
                - img [ref=e100]
              - generic [ref=e103]:
                - generic [ref=e104]: Конверсия Н1
                - generic [ref=e105]: 40%
                - generic [ref=e106]: Создан → Закрыт
                - img [ref=e108]
              - generic [ref=e111]:
                - generic [ref=e112]: Конверсия Н2
                - generic [ref=e113]: 8%
                - generic [ref=e114]: Создан → Закрыт
                - img [ref=e116]
            - generic [ref=e119]:
              - generic [ref=e122]: Сравнение направлений · 30 дней
              - generic [ref=e123]:
                - generic [ref=e124]:
                  - generic [ref=e125]: Направление 1 · ₽
                  - generic [ref=e126]:
                    - generic [ref=e127]: Выручка
                    - generic [ref=e128]: 31 240 ₽
                  - generic [ref=e129]:
                    - generic [ref=e130]: Маржа
                    - generic [ref=e131]: 8 680 ₽
                  - generic [ref=e132]:
                    - generic [ref=e133]: Заказов
                    - generic [ref=e134]: "142"
                  - generic [ref=e135]:
                    - generic [ref=e136]: Конверсия
                    - generic [ref=e137]: 40%
                - generic [ref=e138]:
                  - generic [ref=e139]:
                    - generic [ref=e140]: ×17
                    - generic [ref=e141]: выручка
                  - generic [ref=e142]:
                    - generic [ref=e143]: ×20
                    - generic [ref=e144]: маржа
                  - generic [ref=e145]:
                    - generic [ref=e146]: ×9
                    - generic [ref=e147]: заказов
                  - generic [ref=e148]:
                    - generic [ref=e149]: ×5
                    - generic [ref=e150]: конверсия
                - generic [ref=e151]:
                  - generic [ref=e152]: Направление 2 · Крипта
                  - generic [ref=e153]:
                    - generic [ref=e154]: Выручка
                    - generic [ref=e155]: 26,40 $
                  - generic [ref=e156]:
                    - generic [ref=e157]: Маржа
                    - generic [ref=e158]: 6,08 $
                  - generic [ref=e159]:
                    - generic [ref=e160]: Заказов
                    - generic [ref=e161]: "16"
                  - generic [ref=e162]:
                    - generic [ref=e163]: Конверсия
                    - generic [ref=e164]: 8%
            - generic [ref=e165]:
              - generic [ref=e166]: Заказы по дням · 10 дней
              - generic [ref=e167]:
                - generic [ref=e169]: Направление 1 (₽)
                - generic [ref=e182]: Направление 2 (Крипта)
          - generic [ref=e193]: Система в продакшне · NDA · данные изменены
    - generic [ref=e195]:
      - generic [ref=e198]: Точка Б — результат
      - generic [ref=e199]:
        - generic [ref=e200]:
          - generic [ref=e201]: День 1
          - generic [ref=e202]: видимость с запуска
        - generic [ref=e203]:
          - generic [ref=e204]: 2 направления
          - generic [ref=e205]: в одной картине
        - generic [ref=e206]:
          - generic [ref=e207]: ×17
          - generic [ref=e208]: разрыв виден сразу
        - generic [ref=e209]:
          - generic [ref=e210]: Топ продуктов
          - generic [ref=e211]: 100% видимость и сравнение
      - generic [ref=e212]:
        - strong [ref=e213]: "Главное:"
        - text: собственник не будет догонять управленческую картину через год. Она у него с первого дня.
    - generic [ref=e214]:
      - generic [ref=e215]: Запускаете новое направление?
      - generic [ref=e216]: Зашьём систему управления до старта — не будете расчищать хаос через год
      - button "Начать диагностику →" [ref=e217] [cursor=pointer]
  - contentinfo [ref=e218]:
    - generic [ref=e219]:
      - generic [ref=e220]:
        - img [ref=e221]
        - text: AIVISION
        - generic [ref=e223]: ·
        - link "support@aivisionpro.ru" [ref=e224] [cursor=pointer]:
          - /url: mailto:support@aivisionpro.ru
      - generic [ref=e225]:
        - link "Демо платформы" [ref=e226] [cursor=pointer]:
          - /url: /demo/
        - link "Политика ПДн" [ref=e227] [cursor=pointer]:
          - /url: /privacy-policy
        - link "Согласие на обработку ПДн" [ref=e228] [cursor=pointer]:
          - /url: /consent
      - generic [ref=e229]: © 2026 AIVISION
  - generic [ref=e230]:
    - button "Начать диагностику" [ref=e231] [cursor=pointer]
    - link "Написать в Telegram" [ref=e232] [cursor=pointer]:
      - /url: https://t.me/aivision_pro
      - img [ref=e233]
    - link "Смотреть демо" [ref=e235] [cursor=pointer]:
      - /url: /demo/
      - generic [ref=e236]:
        - img [ref=e237]
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