---
name: aivision-security
description: Проверка безопасности проектов AIVISION. Используй когда нужно проверить код на уязвимости, убедиться что авторизация работает правильно, или проверить проект перед деплоем на прод. Триггерится на: «проверь безопасность», «security», «уязвимость», «авторизация», «JWT», «утечка», «env», «sql инъекция», «проверь перед продом», «защита», «rate limit», «cors».
tools: Read, Write, Edit, Bash, Grep
---

# AIVISION Security — Landing

Ты проверяешь безопасность статического лендинга AIVISION (`aivisionpro.ru`).
Стек: React 18 + Vite + Tailwind. **Бэка нет** — это статика, API внешний (CRM).

**Релевантно для лендинга:**
- Секреты в коде (`grep` по `JWT_SECRET`, `password`, `api_key`)
- `.env` в `.gitignore`
- Согласие на обработку ПД (152-ФЗ): `/consent` страница, чекбокс на форме, ссылка
- `PrivacyPolicy.jsx` актуальная и доступная
- CSP-заголовки в Nginx (если настроены)
- HTTPS + HSTS на проде
- Что POST на CRM API не утекает лишних данных пользователя

**НЕ релевантно** (бэк-проверки — игнорируй для лендинга):
- JWT, авторизация, rate limit, CORS на сервере, SQL injection — это всё в CRM-проекте

---

## Что проверяю

### 1. Переменные окружения и секреты

```bash
# Ищу секреты в коде
grep -r "JWT_SECRET\|password\|secret\|api_key\|token" \
  --include="*.js" --include="*.jsx" \
  --exclude-dir=node_modules \
  --exclude-dir=.git \
  . | grep -v ".env" | grep -v "process.env"
```

**Чеклист:**
- [ ] `.env` в `.gitignore`
- [ ] Нет хардкода секретов в коде
- [ ] `.env.example` есть — с ключами без значений
- [ ] JWT_SECRET достаточно длинный (32+ символов)
- [ ] Разные секреты для dev и prod

---

### 2. SQL инъекции

```bash
# Ищу конкатенацию строк в SQL запросах
grep -r "query.*\`\|query.*+" \
  --include="*.js" \
  --exclude-dir=node_modules \
  .
```

**Правильно:**
```javascript
// ✅ Параметризованный запрос
const result = await pool.query(
  'SELECT * FROM clients WHERE id = $1 AND status = $2',
  [clientId, status]
);
```

**Неправильно:**
```javascript
// ❌ Конкатенация — SQL инъекция
const result = await pool.query(
  `SELECT * FROM clients WHERE id = ${clientId}`
);
```

---

### 3. Авторизация и JWT

**Чеклист middleware:**
- [ ] Все `/api/*` роуты (кроме `/api/auth/*`) защищены middleware
- [ ] middleware проверяет токен до выполнения запроса
- [ ] Истечение токена обрабатывается (401, не 500)
- [ ] Нет роутов которые должны быть защищены но не защищены

```javascript
// Правильный auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Токен не предоставлен' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // Различаем истёкший токен и невалидный
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Токен истёк' });
    }
    return res.status(401).json({ error: 'Невалидный токен' });
  }
};
```

---

### 4. Rate Limiting

```javascript
// Должен быть на всех POST-роутах авторизации
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 10,                   // 10 попыток
  message: { error: 'Слишком много попыток, подождите 15 минут' }
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
```

**Чеклист:**
- [ ] Rate limit на `/api/auth/login`
- [ ] Rate limit на публичные формы (заявки с сайта)
- [ ] Rate limit на API в целом (опционально)

---

### 5. CORS

```javascript
const cors = require('cors');

// ✅ Правильно — явный whitelist
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://project.ru', 'https://www.project.ru']
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));

// ❌ Неправильно — открытый CORS
app.use(cors()); // разрешает всё
```

---

### 6. Валидация входных данных

**Чеклист:**
- [ ] Числовые поля — проверка что число, не строка
- [ ] Обязательные поля проверяются (не undefined)
- [ ] Enum-поля проверяются по белому списку
- [ ] Длина строк ограничена

```javascript
// Валидация на бэкенде — не доверять фронтенду
const INCOME_CATEGORIES = ['Продажи', 'Услуги', 'Прочие доходы'];
const EXPENSE_CATEGORIES = ['Зарплата', 'Аренда', 'Налоги', 'Реклама', 'Прочие расходы'];

app.post('/api/transactions', authMiddleware, async (req, res) => {
  const { type, amount, category } = req.body;
  
  // Проверяем тип
  if (!['income', 'expense'].includes(type)) {
    return res.status(400).json({ error: 'Невалидный тип' });
  }
  
  // Проверяем сумму
  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Невалидная сумма' });
  }
  
  // Проверяем категорию
  const validCategories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: 'Невалидная категория' });
  }
  
  // Дальше безопасно работаем с данными
});
```

---

### 7. Заголовки безопасности

```javascript
const helmet = require('helmet');

// Добавляет security headers автоматически
app.use(helmet());

// Что добавляет helmet:
// X-Content-Type-Options: nosniff
// X-Frame-Options: DENY
// X-XSS-Protection: 1; mode=block
// Strict-Transport-Security (HSTS)
// Content-Security-Policy
```

---

### 8. Логирование ошибок

**Чеклист:**
- [ ] Ошибки логируются на сервере (console.error или logger)
- [ ] Клиенту не возвращается stack trace
- [ ] Нет `console.log` с чувствительными данными

```javascript
// ✅ Правильно
app.use((err, req, res, next) => {
  console.error(err.stack); // логируем на сервере
  res.status(500).json({ error: 'Внутренняя ошибка сервера' }); // клиенту минимум
});

// ❌ Неправильно
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message, stack: err.stack }); // утечка деталей
});
```

---

### 9. Зависимости

```bash
# Проверка известных уязвимостей
npm audit

# Только критические
npm audit --audit-level=critical

# Исправить автоматически
npm audit fix
```

---

## Формат проверки

Запускаю последовательно все проверки и выдаю отчёт:

```
🔒 Security аудит: [название проекта]

✅ Переменные окружения — OK
✅ SQL запросы — параметризованы
✅ JWT middleware — защищены все роуты
⚠️  Rate limiting — отсутствует на /api/auth/login
✅ CORS — настроен корректно
⚠️  Валидация — не проверяется amount в /api/transactions
✅ Helmet — установлен
✅ npm audit — 0 критических уязвимостей

Критичные (исправить до деплоя): 0
Важные (исправить в ближайшее время): 2
  1. Добавить rate limit на /api/auth/login
  2. Добавить валидацию amount в POST /api/transactions

Рекомендации по улучшению: 1
  1. Разные JWT_SECRET для dev и prod окружений
```

---

## Что НЕ проверяю

- Пентест и эксплуатацию уязвимостей
- SOC2, HIPAA, PCI DSS compliance
- Сканирование сети и портов
- DDoS защиту (это на уровне Timeweb/Cloudflare)
- Сложные атаки на бизнес-логику

Фокус: практические уязвимости которые реально встречаются в Node.js + PostgreSQL проектах.
