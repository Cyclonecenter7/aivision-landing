# ТЗ #6 — Smoke E2E тесты лендинга (Playwright)

**Контекст:** на лендинге есть 4 страницы (`Landing`, `CasePage`, `PrivacyPolicy`, `Consent`), форма заявки `ContactModal` (POST `/api/leads`), тракинг (`tracker.js` — visitor/session/click). Сейчас перед каждым деплоем надо руками: открыть лендинг, кликнуть на CTA, заполнить форму, отправить, проверить что заявка дошла. Долго и подвержено забыванию.

**Решение:** Playwright E2E против живого dev-окружения лендинга. Тесты в GitHub Actions на каждый push. Зелёные = форма работает, страницы открываются, трекинг шлёт.

**Скоуп:** базовый smoke на 6-8 сценариев. НЕ покрывает визуал, мобильный адаптив, кросс-браузер.

**Стек:** `@playwright/test`, Node 20, GitHub Actions.

**Где работаем:** `/Users/cyclonecenter7/Desktop/Code/AIVISION WEB/`.

**Окружения:**
- **Dev URL фронта лендинга:** `https://aivisiontest.ru` (паттерн: prod без поддомена → dev без поддомена)
- **API dev:** `https://api.aivisiontest.ru` (см. `.env.development`)
- **Prod (НЕ ТРОГАТЬ для тестов):** `https://aivisionpro.ru` + `https://api.aivisionpro.ru`

---

## Архитектура

### Synthetic monitoring против live dev

Тесты не поднимают локально. Стучатся напрямую в dev-домен лендинга.
Минимум setup, максимум reality (Nginx, SSL, real CORS).

### Test data isolation

Лендинг не имеет auth. Каждый E2E прогон создаёт **реальную заявку** в dev-БД CRM
через `POST https://api.aivisiontest.ru/api/leads`.

**Изоляция:**
- Префикс `[E2E-LANDING]` в имени и контакте (`+79990000001`, `e2e-landing@test.local`)
- При желании — nightly cleanup на CRM dev:
  `DELETE FROM leads WHERE name LIKE '[E2E-LANDING]%'`

### Concurrency

```yaml
concurrency:
  group: e2e-landing-dev
  cancel-in-progress: false
```

Воркеров: `1` (последовательно, не наводнять CRM API).

---

## Задача 1 — Установка Playwright (10 мин)

```bash
npm i -D @playwright/test
npx playwright install --with-deps chromium
```

`playwright.config.js`:

```js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['html'], ['github']] : 'list',
  timeout: 30_000,
  use: {
    baseURL: process.env.E2E_URL || 'https://aivisiontest.ru',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },
  projects: [
    { name: 'chromium', use: devices['Desktop Chrome'] },
  ],
});
```

`.gitignore` добавить:
```
test-results/
playwright-report/
```

Scripts в `package.json`:
```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:report": "playwright show-report"
  }
}
```

**Приёмка:** `npx playwright --version` показывает версию.

---

## Задача 2 — Спека страниц (smoke navigation, 20 мин)

Создать `tests/e2e/pages.spec.js`:

```js
import { test, expect } from '@playwright/test';

const pages = [
  { path: '/',         heading: /aivision|управляем|маржа|прибыл/i },
  { path: '/privacy',  heading: /политик|конфиденциальн/i },
  { path: '/consent',  heading: /согласи|обработк/i },
  // CasePage — нужен реальный slug, проверь src/data/cases.js
  // { path: '/cases/<slug>', heading: /кейс|case/i },
];

for (const { path, heading } of pages) {
  test(`${path} loads without errors`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    const res = await page.goto(path);
    expect(res.status()).toBeLessThan(400);
    await expect(page.getByRole('heading', { name: heading }).first()).toBeVisible({
      timeout: 10_000,
    });
    expect(errors, `Console errors on ${path}:\n${errors.join('\n')}`).toHaveLength(0);
  });
}

test('404 page works', async ({ page }) => {
  const res = await page.goto('/nonexistent-page');
  await expect(page.getByText(/404|не найдена|not found/i)).toBeVisible();
});
```

> **Перед запуском:** открой `src/data/cases.js`, найди реальные slug'и кейсов,
> добавь их в массив `pages` для проверки `/cases/<slug>`.

**Приёмка:** все страницы открываются без console errors.

---

## Задача 3 — Спека формы заявки (30 мин)

Создать `tests/e2e/contact-form.spec.js`:

```js
import { test, expect } from '@playwright/test';

test.describe('Contact form', () => {
  test('opens modal from CTA', async ({ page }) => {
    await page.goto('/');
    // CTA в hero — селектор по data-track или тексту
    await page.getByRole('button', { name: /диагностик|связ|оставить заявк/i }).first().click();
    await expect(page.getByRole('dialog').or(page.getByText(/имя|телефон|контакт/i))).toBeVisible({
      timeout: 5_000,
    });
  });

  test('rejects empty form', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /диагностик|связ/i }).first().click();
    await page.getByRole('button', { name: /отправить|оставить|связаться/i }).click();
    // Ожидаем ошибку валидации
    await expect(page.getByText(/обязательн|введ/i)).toBeVisible({ timeout: 3_000 });
  });

  test('rejects submit without consent checkbox', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /диагностик|связ/i }).first().click();

    await page.getByLabel(/имя|name/i).fill('[E2E-LANDING] Test User');
    await page.getByLabel(/телефон|контакт|phone/i).fill('+79990000001');
    // НЕ ставить чекбокс согласия

    await page.getByRole('button', { name: /отправить|оставить/i }).click();
    await expect(page.getByText(/согласи|обработк/i)).toBeVisible({ timeout: 3_000 });
  });

  test('submits valid form successfully', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /диагностик|связ/i }).first().click();

    await page.getByLabel(/имя|name/i).fill(`[E2E-LANDING] ${Date.now()}`);
    await page.getByLabel(/телефон|контакт|phone/i).fill(`+79990${Date.now().toString().slice(-6)}`);
    await page.getByRole('checkbox', { name: /согласи|обработк/i }).check();

    // Слушаем POST /api/leads
    const requestPromise = page.waitForResponse(
      (res) => res.url().includes('/api/leads') && res.request().method() === 'POST'
    );

    await page.getByRole('button', { name: /отправить|оставить/i }).click();

    const response = await requestPromise;
    expect(response.status()).toBeGreaterThanOrEqual(200);
    expect(response.status()).toBeLessThan(300);

    await expect(page.getByText(/спасибо|принят|свяжемся/i)).toBeVisible({ timeout: 5_000 });
  });
});
```

> **Селекторы (`getByLabel`, `getByRole`) — мои предположения.** Перед запуском
> открой `src/components/landing/ContactModal.jsx` и `ContactToggleInput.jsx`
> и подправь под реальные label/aria-label.
>
> Лучше — добавить `data-testid="contact-form-name"`, `contact-form-contact`,
> `contact-form-consent`, `contact-form-submit` (отдельная задача 6).

**Приёмка:** все 4 теста зелёные. В CRM dev-БД появляется запись `[E2E-LANDING] ...`.

---

## Задача 4 — Спека трекинга (15 мин)

Создать `tests/e2e/tracking.spec.js`:

```js
import { test, expect } from '@playwright/test';

test.describe('Tracking', () => {
  test('sends visitor event on first visit', async ({ page }) => {
    const visitorPromise = page.waitForRequest(
      (req) => req.url().includes('/api/visitors') && req.method() === 'POST'
    );
    await page.goto('/');
    const req = await visitorPromise;
    const body = JSON.parse(req.postData() || '{}');
    expect(body.visitor_id).toBeTruthy();
  });

  test('sends click event on data-track button', async ({ page }) => {
    await page.goto('/');

    const clickPromise = page.waitForRequest(
      (req) => req.url().includes('/api/clicks') && req.method() === 'POST',
      { timeout: 5_000 }
    );

    // Любая кнопка с data-track — берём CTA в hero
    await page.getByRole('button', { name: /диагностик|связ/i }).first().click();

    const req = await clickPromise;
    const body = JSON.parse(req.postData() || '{}');
    expect(body.text).toBeTruthy();
    expect(body.id).toBeTruthy();
  });
});
```

**Приёмка:** оба теста зелёные. В CRM dev-БД появляются записи в таблицах
`visitors` и `clicks` с тестовыми данными.

---

## Задача 5 — GitHub Actions e2e job (15 мин)

В `.github/workflows/checks.yml` добавить (после задач #5 на lint+CI):

```yaml
e2e-dev:
  runs-on: ubuntu-latest
  needs: [build]    # ждём чтобы build прошёл
  concurrency:
    group: e2e-landing-dev
    cancel-in-progress: false
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 20
        cache: npm
    - run: npm ci
    - run: npx playwright install --with-deps chromium
    - run: npm run test:e2e
      env:
        E2E_URL: https://aivisiontest.ru   # уточнить у основателя
    - uses: actions/upload-artifact@v4
      if: failure()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 7
```

**Приёмка:** на push job `e2e-dev` запускается, проходит зелёным. При фейле — HTML report + screenshots в artifact.

---

## Задача 6 (опц) — `data-testid` атрибуты (30 мин)

Селекторы по тексту fragile. Перевод/правка копирайта → тесты падают.

Добавить `data-testid` на:
- `ContactModal.jsx`: `contact-form-name`, `contact-form-contact`, `contact-form-consent`, `contact-form-submit`, `contact-form-close`
- `ContactToggleInput.jsx`: `contact-toggle-phone`, `contact-toggle-email`, `contact-toggle-telegram`
- `Hero.jsx`: `hero-cta-primary`, `hero-cta-secondary`
- `Navbar.jsx`: `nav-logo`, `nav-cta`

В тестах — `page.getByTestId('contact-form-submit')`. Селекторы перестают зависеть от копирайта.

---

## Чеклист

### Установка
- [ ] Playwright установлен
- [ ] `playwright.config.js` создан с правильным `baseURL` (dev URL уточнён!)
- [ ] `.gitignore` обновлён

### Тесты
- [ ] `pages.spec.js` — все 4 страницы + 404 зелёные
- [ ] `contact-form.spec.js` — open + 2 ошибки валидации + успешный submit
- [ ] `tracking.spec.js` — visitor + click events улетают
- [ ] (опц) `data-testid` добавлены на ключевые элементы

### Инфра
- [ ] **DEV URL уточнён** и заменён в config + workflow
- [ ] GitHub secret `E2E_URL` добавлен (или прямо в workflow если не секрет)
- [ ] `checks.yml` имеет job `e2e-dev`
- [ ] Artifact c failure-репортом загружается
- [ ] Concurrency group `e2e-landing-dev` настроена

### После прогона
- [ ] Все E2E зелёные
- [ ] В CRM dev-БД появились лиды `[E2E-LANDING] ...`
- [ ] (опц) добавлен cron на CRM для cleanup `DELETE WHERE name LIKE '[E2E-LANDING]%'`

---

## Что НЕ делать

- НЕ запускать тесты против prod (`aivisionpro.ru`) — только dev
- НЕ создавать тестовые лиды без префикса `[E2E-LANDING]`
- НЕ покрывать всё — это smoke, цель: 80% критичных путей за 1-2 минуты
- НЕ добавлять visual regression в первой итерации — flaky
- НЕ запускать E2E в pre-push hook — слишком долго
- НЕ трогать существующий `deploy.yml`
- НЕ выдумывать dev URL — уточнить у основателя

---

## Дальнейшие итерации (НЕ в этом ТЗ, в Obsidian backlog)

- Visual regression через `expect(page).toHaveScreenshot()` + disable animations
- Mobile viewport (iPhone 14 / iPad)
- Cross-browser (firefox, webkit)
- Lighthouse CI score check (PerformanceBudget)
- Accessibility deep audit (axe-core)

---

## Финальный коммит (серия)

```
test(e2e): add Playwright config and gitignore
test(e2e): add pages spec (smoke navigation)
test(e2e): add contact form spec (open/validation/submit)
test(e2e): add tracking spec (visitor/click events)
ci: add e2e-dev job to checks.yml
test(e2e): add data-testid attributes to key elements
```
