---
name: aivision-testing
description: Тестирование проектов AIVISION через Playwright. Используй когда нужно протестировать готовый функционал, проверить что ничего не сломалось, или написать тест перед деплоем. Триггерится на: «протестируй», «проверь», «напиши тесты», «запусти тесты», «всё работает?», «проверь перед деплоем», «smoke test», «e2e».
tools: Read, Write, Edit, Bash
---

# AIVISION Testing — Playwright (Landing)

Ты пишешь и запускаешь Playwright-тесты для статического лендинга AIVISION.
Цель: убедиться что core-флоу работает (открытие страниц, форма заявки, трекинг).
Не 100% coverage — проверяем критические пути которые нельзя сломать.

---

## Окружение

- **Dev (локалка)**: `http://localhost:5173` (Vite dev server)
- **Staging**: `https://aivisiontest.ru`
- **Prod**: `https://aivisionpro.ru`
- **Запуск**: `npx playwright test` (если Playwright уже стоит) или
  `npx playwright install` перед первым запуском
- **Конфиг**: `playwright.config.js` в корне проекта
- **Отчёт**: `npx playwright show-report`
- **Браузер**: Chromium headless по умолчанию

Если `playwright.config.js` нет — создаю его первым делом с `baseURL`
по умолчанию `http://localhost:5173`.

**API мок**: лендинг шлёт заявки на `${VITE_API_URL}/api/leads`. В тестах
лучше мокать через `page.route('**/api/leads', ...)` чтобы не загрязнять
реальный CRM-бэк лишними лидами.

---

## Что критично проверить на лендинге

1. **Главная (`/`)** — открывается, hero виден, навбар работает
2. **CTA-кнопка** — открывает `ContactModal`
3. **Форма заявки** — валидация (пустые поля), успешная отправка POST на API,
   обязательный чекбокс согласия на обработку ПД
4. **Трекинг** — клик по `[data-track]` шлёт событие в API (можно мокать ответ)
5. **Кейсы** — `/cases/:slug` открывается, 404 на несуществующий slug
6. **Юридические страницы** — `/privacy`, `/consent` открываются
7. **Адаптив** — mobile breakpoint (375px), tablet (768px)

---

## Что тестируем по типам проектов

### Дашборд / BI панель

```
✅ Страница открывается без ошибок в консоли
✅ KPI-карточки загружаются (числа видны, не пусто)
✅ Фильтр периода работает (меняет данные)
✅ Графики рендерятся (canvas/svg присутствует)
✅ Таблицы загружаются (хотя бы 1 строка)
✅ Нет console.error в браузере
```

### CRM

```
✅ Список записей загружается
✅ Боковая панель открывается по клику на запись
✅ Создание записи через модалку работает (форма → сохранить → появилось в таблице)
✅ Удаление/деактивация работает
✅ Фильтры/поиск работают
✅ Статусы меняются
✅ Нет console.error
```

### Сайт / Лендинг

```
✅ Главная страница открывается
✅ Навигация работает (все ссылки кликабельны)
✅ Форма заявки отправляется (заполнить → отправить → сообщение об успехе)
✅ Мобильная версия (viewport 390px) — нет горизонтального скролла
✅ Нет console.error
```

### Управленческая панель / Финансы

```
✅ Авторизация работает (логин → попадаем в панель)
✅ Основные модули открываются без ошибок
✅ Создание записи работает
✅ Числа форматируются правильно (не NaN, не undefined)
✅ Защищённые роуты недоступны без авторизации
✅ Нет console.error
```

---

## Шаблон теста (реальные селекторы лендинга)

```javascript
// tests/smoke.spec.js
const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.TEST_URL || 'http://localhost:5173';

test.describe('AIVISION Landing — smoke', () => {

  test.beforeEach(async ({ page }) => {
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log(`❌ Console error: ${msg.text()}`);
      }
    });
  });

  test('Главная открывается, hero виден', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/AIVISION/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('CTA в hero открывает модалку диагностики', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('[data-track="hero-cta-primary"]').first().click();
    // ContactModal появилась
    await expect(page.locator('text=Диагностика')).toBeVisible();
  });

  test('Форма заявки сабмитит (мок API)', async ({ page }) => {
    // Мок ответа CRM-бэка
    await page.route('**/api/leads', (route) =>
      route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
    );

    await page.goto(BASE_URL);
    await page.locator('[data-track="hero-cta-primary"]').first().click();
    await page.fill('input[name="name"]', 'Test');
    await page.fill('input[name="contact"]', '+79991112233');
    await page.check('input[type="checkbox"]'); // согласие на ПД
    await page.click('button[type="submit"]');
    await expect(page.locator('text=5 минут')).toBeVisible();
  });

  test('Адаптив на mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    // Нет горизонтального скролла
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(375);
  });

  test('Кейс /case/1 открывается', async ({ page }) => {
    await page.goto(`${BASE_URL}/case/1`);
    await expect(page).toHaveTitle(/кейс AIVISION/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Demo /demo/ открывается', async ({ page }) => {
    await page.goto(`${BASE_URL}/demo/`);
    // CRM-логин или дашборд
    await expect(page.locator('body')).not.toBeEmpty();
  });
});
```

**Селекторы лендинга** (приоритет):
- `[data-track="<id>"]` — для CTA-кнопок (всегда уникальны, всегда есть)
- `[name="name"]`, `[name="contact"]` — поля форм
- `text=...` — заголовки секций / success-копия
- `h1`, `h2` — структурные заголовки
- `data-testid="..."` — добавляй сам если нужно стабильное место

---

## Как работаю

### 1. Читаю проект

Перед написанием тестов:
- Смотрю структуру папок
- Читаю package.json — как запускается проект
- Смотрю основные страницы/компоненты
- Определяю тип проекта (дашборд / CRM / сайт / панель)

### 2. Создаю playwright.config.js если нет

```javascript
// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: process.env.TEST_URL || 'http://localhost:5173',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [['html', { open: 'never' }], ['list']],
});
```

### 3. Пишу тесты под конкретный проект

Не шаблонные — смотрю реальные селекторы в коде.
Предпочитаю: `data-testid` > `role` > `text` > CSS-селекторы.

### 4. Запускаю и показываю результат

```
✅ Прошло: 8/10 тестов
❌ Упало: 2 теста

Упавшие:
1. "Фильтр периода работает" — элемент не найден: [data-testid="period-filter"]
   → Скорее всего компонент ещё не отрендерился. Добавил waitForSelector.

2. "График рендерится" — timeout
   → API /api/dashboard возвращает 500. Проблема в бэкенде, не в тесте.
```

### 5. Если тест упал — разбираюсь почему

- Проблема в тесте (неправильный селектор, таймаут) → фикшу тест
- Проблема в коде (500 ошибка, пустые данные, сломанный компонент) → сообщаю основателю с деталями

---

## Авторизация в тестах

Если проект требует логин:

```javascript
// tests/auth.setup.js
const { test: setup } = require('@playwright/test');

setup('авторизация', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', process.env.TEST_EMAIL);
  await page.fill('[name="password"]', process.env.TEST_PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL('/dashboard');
  // Сохраняем состояние авторизации
  await page.context().storageState({ path: 'tests/.auth/user.json' });
});
```

```javascript
// playwright.config.js — добавить
projects: [
  { name: 'setup', testMatch: /auth.setup.js/ },
  {
    name: 'tests',
    use: { storageState: 'tests/.auth/user.json' },
    dependencies: ['setup'],
  },
],
```

Переменные `TEST_EMAIL` и `TEST_PASSWORD` — в `.env.test`, не в коде.

---

## Что НЕ тестируем

- 100% coverage — это не наша цель
- Каждый пиксель и цвет — это ручная проверка
- Сложные бизнес-сценарии с множеством шагов — только критические пути
- Unit-тесты отдельных функций — только если явно попросят

---

## Отчёт основателю

После каждого прогона:

```
🧪 Тестирование завершено

Прошло: 9/10
Упало: 1

✅ Страница открывается
✅ Авторизация работает
✅ Дашборд загружает данные
✅ KPI-карточки отображаются
✅ Фильтр периода работает
✅ Таблица заявок загружается
✅ Боковая панель открывается
✅ Создание транзакции работает
✅ Мобильная версия без горизонтального скролла
❌ График финансов — timeout (API /api/finance медленнее 30с)

Рекомендация: можно деплоить, но проверь скорость /api/finance на dev.
```
