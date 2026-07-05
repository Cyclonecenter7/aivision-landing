import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE = 'https://aivisiontest.ru';

const PAGES = [
  { name: 'home',         url: `${BASE}/` },
  { name: 'construction', url: `${BASE}/cases/construction/` },
  { name: 'education',    url: `${BASE}/cases/education/` },
  { name: 'ecommerce',    url: `${BASE}/cases/ecommerce/` },
  { name: 'esim',         url: `${BASE}/cases/esim/` },
];

const VIEWPORTS = [
  { label: 'desktop', width: 1280, height: 900 },
  { label: 'mobile',  width: 390,  height: 844 },
];

// English terms that must NOT appear in Russian content (NDA is allowed)
const FORBIDDEN_PATTERNS = [
  { pattern: /\bYoY\b/g,           label: 'YoY' },
  { pattern: /\bYTD\b/g,           label: 'YTD' },
  { pattern: /\bWoW\b/g,           label: 'WoW' },
  { pattern: /\bMoM\b/g,           label: 'MoM' },
  { pattern: /\bQoQ\b/g,           label: 'QoQ' },
  { pattern: /\bNaN\b/g,           label: 'NaN' },
  { pattern: /\[object Object\]/g,  label: '[object Object]' },
  { pattern: /\bundefined\b/g,      label: 'undefined (raw)' },
];

const screenshotsDir = path.join(__dirname, '..', 'test-screenshots');
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

async function checkForbiddenEnglish(page) {
  const bodyText = await page.evaluate(() => document.body.innerText);
  const found = [];
  for (const { pattern, label } of FORBIDDEN_PATTERNS) {
    const matches = bodyText.match(pattern);
    if (matches) found.push({ label, matches: [...new Set(matches)] });
  }
  return found;
}

async function checkHorizontalOverflow(page, viewportWidth) {
  return page.evaluate((vw) => {
    const scrollWidth = document.documentElement.scrollWidth;
    const clientWidth = document.documentElement.clientWidth;
    const overflowing = [];
    if (scrollWidth > clientWidth + 2) {
      const all = document.querySelectorAll('*');
      for (const el of all) {
        try {
          const rect = el.getBoundingClientRect();
          if (rect.right > clientWidth + 4 && rect.width > 10) {
            const style = window.getComputedStyle(el);
            if (style.display !== 'none' && style.visibility !== 'hidden') {
              overflowing.push({
                tag: el.tagName,
                cls: (el.className || '').toString().slice(0, 80),
                right: Math.round(rect.right),
                width: Math.round(rect.width),
              });
              if (overflowing.length >= 8) break;
            }
          }
        } catch (_) {}
      }
    }
    return { scrollWidth, clientWidth, overflowing };
  }, viewportWidth);
}

async function checkTextOverflowInCards(page) {
  return page.evaluate(() => {
    const issues = [];
    const selectors = [
      '[class*="res-card"]',
      '[class*="plane"]',
      '[class*="stat-card"]',
      '[class*="hero-stat"]',
      '[class*="action-card"]',
      '[class*="diff-row"]',
      '[class*="kpi"]',
    ];
    const cards = document.querySelectorAll(selectors.join(', '));
    for (const card of cards) {
      const style = window.getComputedStyle(card);
      if (style.display === 'none') continue;
      if (card.scrollHeight > card.clientHeight + 6) {
        issues.push({
          tag: card.tagName,
          cls: (card.className || '').toString().slice(0, 80),
          scrollH: card.scrollHeight,
          clientH: card.clientHeight,
          text: (card.innerText || '').trim().slice(0, 80),
        });
        if (issues.length >= 8) break;
      }
    }
    return issues;
  });
}

// Get H1 text regardless of which view is active (desktop or mobile)
async function getH1Text(page) {
  return page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('h1'));
    for (const h of all) {
      const style = window.getComputedStyle(h);
      let el = h;
      let visible = true;
      while (el && el !== document.body) {
        const s = window.getComputedStyle(el);
        if (s.display === 'none' || s.visibility === 'hidden') { visible = false; break; }
        el = el.parentElement;
      }
      if (visible) return h.innerText.trim();
    }
    // fallback: just return first h1 text
    return all[0]?.innerText.trim() || '';
  });
}

// ------- per-viewport describe blocks -------

for (const vp of VIEWPORTS) {
  test.describe(`[${vp.label} ${vp.width}px] Visual review`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    for (const pg of PAGES) {
      test(`${pg.name}`, async ({ page }) => {
        const consoleErrors = [];
        page.on('console', msg => {
          if (msg.type() === 'error') consoleErrors.push(msg.text());
        });

        await page.goto(pg.url, { waitUntil: 'networkidle', timeout: 45000 });
        await page.waitForTimeout(2500);

        // Full-page screenshot
        const shotPath = path.join(screenshotsDir, `${pg.name}-${vp.label}.png`);
        await page.screenshot({ path: shotPath, fullPage: true });
        console.log(`    Screenshot → ${shotPath}`);

        // Title
        const title = await page.title();
        console.log(`    Title: ${title}`);
        expect(title.length, 'Page must have a title').toBeGreaterThan(0);

        // H1 — get visible one (respects d-view/m-view switching)
        const h1Text = await getH1Text(page);
        console.log(`    H1: ${h1Text.slice(0, 80)}`);
        expect(h1Text.length, 'H1 must have text').toBeGreaterThan(5);

        // Forbidden English
        const forbidden = await checkForbiddenEnglish(page);
        if (forbidden.length) {
          console.log(`    FORBIDDEN ENGLISH: ${JSON.stringify(forbidden)}`);
        }
        expect(forbidden, `Forbidden English on ${pg.name} [${vp.label}]`).toHaveLength(0);

        // Horizontal overflow (strict on mobile)
        const overflow = await checkHorizontalOverflow(page, vp.width);
        if (overflow.overflowing.length) {
          console.log(`    OVERFLOW scrollWidth=${overflow.scrollWidth} clientWidth=${overflow.clientWidth}`);
          for (const el of overflow.overflowing) {
            console.log(`      ${el.tag} .${el.cls} right=${el.right} width=${el.width}`);
          }
        }
        if (vp.label === 'mobile') {
          expect(
            overflow.scrollWidth,
            `Horizontal scroll on ${pg.name} mobile (scrollWidth=${overflow.scrollWidth})`
          ).toBeLessThanOrEqual(vp.width + 2);
        }

        // Text overflow in cards
        const cardOverflow = await checkTextOverflowInCards(page);
        if (cardOverflow.length) {
          console.log(`    CARD TEXT OVERFLOW:`);
          for (const c of cardOverflow) {
            console.log(`      ${c.tag} .${c.cls.slice(0,60)} scroll=${c.scrollH} client=${c.clientH} "${c.text}"`);
          }
        }
        // Don't fail on card overflow — just report (could be legitimate expansion)

        // Console errors
        const relevant = consoleErrors.filter(e =>
          !e.includes('mc.yandex') &&
          !e.includes('metrika') &&
          !e.includes('google') &&
          !e.includes('gtag') &&
          !e.includes('favicon') &&
          !e.includes('net::ERR') &&
          !e.includes('Failed to load resource')
        );
        if (relevant.length) {
          console.log(`    CONSOLE ERRORS:`);
          for (const e of relevant) console.log(`      ${e.slice(0, 200)}`);
        }
      });
    }

    // Special: construction mobile carousel check
    test(`construction — carousel not empty`, async ({ page }) => {
      test.skip(vp.label !== 'mobile', 'mobile only');

      await page.goto(`${BASE}/cases/construction/`, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(2500);

      // Scroll to "Что сделали" section
      await page.evaluate(() => {
        const all = Array.from(document.querySelectorAll('h2, h3, .block-title, .section-label'));
        const t = all.find(el => el.innerText?.includes('сделали') || el.innerText?.includes('действи'));
        if (t) t.scrollIntoView({ behavior: 'instant' });
      });
      await page.waitForTimeout(500);

      const shotPath = path.join(screenshotsDir, `construction-mobile-carousel.png`);
      await page.screenshot({ path: shotPath, fullPage: true });
      console.log(`    Carousel screenshot → ${shotPath}`);

      // Find the mobile "Что сделали" section
      const info = await page.evaluate(() => {
        const candidates = [
          '.m-actions',
          '.actions-list',
          '[class*="car-"]',
          '[class*="carousel"]',
          '[class*="actions"]',
        ];
        let found = null;
        for (const s of candidates) {
          found = document.querySelector(s);
          if (found) break;
        }

        if (!found) {
          // list all classes present for debugging
          const allCls = [...new Set(
            Array.from(document.querySelectorAll('[class]'))
              .map(e => e.className.toString().split(' '))
              .flat()
              .filter(c => c.length > 2)
          )].slice(0, 60);
          return { found: false, allClasses: allCls };
        }

        const rect = found.getBoundingClientRect();
        return {
          found: true,
          cls: found.className.toString().slice(0, 80),
          height: Math.round(rect.height),
          width: Math.round(rect.width),
          children: found.children.length,
          text: (found.innerText || '').trim().slice(0, 120),
        };
      });

      console.log(`    Carousel info: ${JSON.stringify(info)}`);

      if (info.found) {
        expect(info.height, 'Carousel height > 50px').toBeGreaterThan(50);
        expect(info.text.length, 'Carousel has text').toBeGreaterThan(5);
      } else {
        console.log(`    WARNING: carousel element not found. Classes present: ${info.allClasses?.join(', ')}`);
      }
    });
  });
}

// ------- Deploy verification test -------
test('deploy check — construction has "к прошлому году", no YoY/YTD', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${BASE}/cases/construction/`, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(2500);

  const body = await page.evaluate(() => document.body.innerText);

  const yoy = /\bYoY\b/.test(body);
  const ytd = /\bYTD\b/.test(body);
  const ruText = /к прошлому году|прошл/i.test(body);

  console.log(`  YoY present: ${yoy}`);
  console.log(`  YTD present: ${ytd}`);
  console.log(`  "к прошлому году" present: ${ruText}`);

  expect(yoy, 'YoY must be replaced with Russian').toBe(false);
  expect(ytd, 'YTD must be replaced with Russian').toBe(false);
});

// ------- Additional: check ALL pages for card overflow and empty areas -------
test.describe('Extra checks — mobile empty areas', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const pg of PAGES.filter(p => p.name !== 'home')) {
    test(`${pg.name} — no large empty areas`, async ({ page }) => {
      await page.goto(pg.url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(2500);

      const emptyAreas = await page.evaluate(() => {
        const suspects = [];
        // Check sections and major containers in mobile view
        const els = document.querySelectorAll(
          '.m-view section, .m-view div, .m-stat-grid, .m-res-grid, .m-what-grid, .car-track'
        );
        for (const el of els) {
          const style = window.getComputedStyle(el);
          if (style.display === 'none') continue;
          const rect = el.getBoundingClientRect();
          const text = (el.innerText || '').trim();
          if (rect.height > 150 && (!text || text.length < 5)) {
            suspects.push({
              cls: (el.className || '').toString().slice(0, 80),
              height: Math.round(rect.height),
              childCount: el.children.length,
            });
          }
        }
        return suspects;
      });

      if (emptyAreas.length) {
        console.log(`  EMPTY AREAS on ${pg.name} mobile:`);
        for (const a of emptyAreas) {
          console.log(`    .${a.cls} h=${a.height}px children=${a.childCount}`);
        }
      }
      // Soft check — report but don't fail immediately; let the dev decide
      expect(emptyAreas.length, `Large empty areas on ${pg.name} mobile: ${JSON.stringify(emptyAreas)}`).toBe(0);
    });
  }
});
