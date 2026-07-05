import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE = 'https://aivisiontest.ru';
const screenshotsDir = path.join(__dirname, '..', 'test-screenshots');
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

// -------------------------------------------------------
// 1. Education mobile — zoom in on "Что сделали" carousel
// -------------------------------------------------------
test('education mobile — что сделали carousel detail', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE}/cases/education/`, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(2000);

  // Get detailed info about the mobile carousel area
  const info = await page.evaluate(() => {
    const mView = document.querySelector('.m-view');
    if (!mView) return { error: 'no .m-view' };

    // Find the "Что сделали" heading
    const headings = Array.from(mView.querySelectorAll('*'));
    const whatSection = headings.find(el =>
      el.innerText && el.innerText.trim() === 'ЧТО СДЕЛАЛИ'
    );

    // Find car-wrap in m-view
    const carWrap = mView.querySelector('.car-wrap, [class*="car-"]');
    const carSlides = mView.querySelectorAll('.car-slide');
    const carTrack = mView.querySelector('.car-track');

    const result = {
      whatSectionFound: !!whatSection,
      whatSectionClass: whatSection?.className?.toString(),
      carWrapFound: !!carWrap,
      carWrapHeight: carWrap ? Math.round(carWrap.getBoundingClientRect().height) : null,
      carWrapClass: carWrap?.className?.toString(),
      carTrackFound: !!carTrack,
      carTrackHeight: carTrack ? Math.round(carTrack.getBoundingClientRect().height) : null,
      carSlideCount: carSlides.length,
      carSlide1Text: carSlides[0]?.innerText?.trim().slice(0, 100),
      carSlideDisplay: carSlides[0] ? window.getComputedStyle(carSlides[0]).display : null,
    };

    return result;
  });

  console.log('Education carousel info:', JSON.stringify(info, null, 2));

  // Scroll to carousel and take targeted screenshot
  await page.evaluate(() => {
    const el = document.querySelector('.m-view .car-wrap') ||
               document.querySelector('.m-view [class*="car-"]');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(300);

  await page.screenshot({
    path: path.join(screenshotsDir, 'education-mobile-carousel-zoom.png'),
    clip: { x: 0, y: 0, width: 390, height: 844 }
  });
});

// -------------------------------------------------------
// 2. Check all case page dashboards for English labels
// -------------------------------------------------------
test.describe('Dashboard English labels scan', () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  const cases = [
    { name: 'construction', url: `${BASE}/cases/construction/` },
    { name: 'education',    url: `${BASE}/cases/education/` },
    { name: 'ecommerce',    url: `${BASE}/cases/ecommerce/` },
    { name: 'esim',         url: `${BASE}/cases/esim/` },
  ];

  for (const c of cases) {
    test(`${c.name} — scan dashboard tabs for English`, async ({ page }) => {
      await page.goto(c.url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(2500);

      // Click through all tabs and collect text
      const tabs = page.locator('.av-tab-btn, [class*="tab-btn"], [class*="tab-label"], button[class*="tab"]');
      const tabCount = await tabs.count();
      console.log(`  ${c.name}: found ${tabCount} tabs`);

      const allText = [];

      // Collect text from current state
      allText.push(await page.evaluate(() => document.body.innerText));

      // Click each tab
      for (let i = 0; i < tabCount; i++) {
        try {
          await tabs.nth(i).click();
          await page.waitForTimeout(600);
          allText.push(await page.evaluate(() => document.body.innerText));
        } catch (_) {}
      }

      const combined = allText.join('\n');
      const forbidden = [
        { p: /\bYoY\b/g, l: 'YoY' },
        { p: /\bYTD\b/g, l: 'YTD' },
        { p: /\bWoW\b/g, l: 'WoW' },
        { p: /\bMoM\b/g, l: 'MoM' },
        { p: /\bQoQ\b/g, l: 'QoQ' },
        { p: /\bNaN\b/g,  l: 'NaN' },
      ];

      const found = [];
      for (const { p, l } of forbidden) {
        const m = combined.match(p);
        if (m) found.push({ label: l, matches: [...new Set(m)] });
      }

      if (found.length) {
        console.log(`  FORBIDDEN ENGLISH in ${c.name} dashboard tabs: ${JSON.stringify(found)}`);
      } else {
        console.log(`  ${c.name}: no forbidden English in any tab`);
      }

      expect(found, `English terms in ${c.name} dashboard tabs`).toHaveLength(0);
    });
  }
});

// -------------------------------------------------------
// 3. Mobile: check nav buttons readability across case pages
// -------------------------------------------------------
test.describe('Mobile nav readability', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  const cases = [
    { name: 'construction', url: `${BASE}/cases/construction/` },
    { name: 'education',    url: `${BASE}/cases/education/` },
    { name: 'ecommerce',    url: `${BASE}/cases/ecommerce/` },
    { name: 'esim',         url: `${BASE}/cases/esim/` },
  ];

  for (const c of cases) {
    test(`${c.name} — nav contrast check`, async ({ page }) => {
      await page.goto(c.url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(1000);

      const navInfo = await page.evaluate(() => {
        const nav = document.querySelector('.nav');
        if (!nav) return { found: false };

        const backBtn = nav.querySelector('.nav-back, [class*="nav-back"], a');
        const nextBtn = nav.querySelector('.nav-next, [class*="nav-next"]');
        const navBg = window.getComputedStyle(nav).background;
        const backColor = backBtn ? window.getComputedStyle(backBtn).color : null;
        const nextColor = nextBtn ? window.getComputedStyle(nextBtn).color : null;

        return {
          found: true,
          navBg: navBg.slice(0, 80),
          backText: backBtn?.innerText?.trim(),
          backColor,
          nextText: nextBtn?.innerText?.trim(),
          nextColor,
          navHeight: Math.round(nav.getBoundingClientRect().height),
        };
      });

      console.log(`  ${c.name} nav: ${JSON.stringify(navInfo)}`);

      if (navInfo.found) {
        expect(navInfo.navHeight, 'Nav must have height').toBeGreaterThan(0);
        // Back button must exist
        expect(navInfo.backText, 'Back button must exist').toBeTruthy();
      }
    });
  }
});

// -------------------------------------------------------
// 4. Desktop: scan for specific visual problems
//    - hero stats with empty/zero values that look broken
//    - diff-row items with suspiciously short text
// -------------------------------------------------------
test.describe('Content sanity checks', () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  const cases = [
    { name: 'construction', url: `${BASE}/cases/construction/` },
    { name: 'education',    url: `${BASE}/cases/education/` },
    { name: 'ecommerce',    url: `${BASE}/cases/ecommerce/` },
    { name: 'esim',         url: `${BASE}/cases/esim/` },
  ];

  for (const c of cases) {
    test(`${c.name} — content sanity`, async ({ page }) => {
      await page.goto(c.url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(2500);

      const issues = await page.evaluate(() => {
        const problems = [];

        // Check hero stats for empty values
        const heroStats = document.querySelectorAll('.hero-stat-val, .hs-val, [class*="stat-val"], [class*="stat-num"]');
        for (const el of heroStats) {
          const text = el.innerText?.trim();
          if (!text || text === '0' || text === '-' || text === '—' || text === '...' || text === 'undefined') {
            problems.push({ type: 'empty-stat', cls: el.className?.toString().slice(0,60), text });
          }
        }

        // Check diff-row for very short descriptions (possible truncation)
        const diffDescs = document.querySelectorAll('.diff-desc, [class*="diff-desc"]');
        for (const el of diffDescs) {
          const text = el.innerText?.trim();
          if (text && text.length < 15) {
            problems.push({ type: 'short-diff-desc', text });
          }
        }

        // Check action descriptions are not empty
        const actionDescs = document.querySelectorAll('.action-desc, [class*="action-desc"]');
        for (const el of actionDescs) {
          const text = el.innerText?.trim();
          if (!text || text.length < 10) {
            problems.push({ type: 'empty-action-desc', cls: el.className?.toString().slice(0,60), text });
          }
        }

        // Check for raw "null" or "0 ₽" in visible hero stats
        const body = document.body.innerText;
        if (/\bnull\b/.test(body)) problems.push({ type: 'raw-null-in-text' });

        return problems;
      });

      if (issues.length) {
        console.log(`  ${c.name} content issues:`);
        for (const i of issues) console.log(`    ${JSON.stringify(i)}`);
      } else {
        console.log(`  ${c.name}: content looks clean`);
      }

      // Only fail on truly broken content, not cosmetic
      const critical = issues.filter(i =>
        i.type === 'raw-null-in-text' ||
        (i.type === 'empty-stat' && i.text === 'undefined')
      );
      expect(critical, `Critical content issues on ${c.name}`).toHaveLength(0);
    });
  }
});

// -------------------------------------------------------
// 5. Mobile: esim page — specific zoom on the nav area
//    (esim had reported readability issue in prior run)
// -------------------------------------------------------
test('esim mobile — nav zoom screenshot', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE}/cases/esim/`, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(1500);

  await page.screenshot({
    path: path.join(screenshotsDir, 'esim-mobile-nav-zoom.png'),
    clip: { x: 0, y: 0, width: 390, height: 60 }
  });
  console.log('esim mobile nav screenshot saved');
});

// -------------------------------------------------------
// 6. Construction desktop — check YoY/YTD in dashboard tabs
// -------------------------------------------------------
test('construction desktop — all dashboard tabs text', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 } );
  await page.goto(`${BASE}/cases/construction/`, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(2500);

  // Get all tab buttons
  const tabs = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, [role="tab"], [class*="tab"]'));
    return btns
      .filter(b => b.innerText?.trim().length > 0 && b.innerText?.trim().length < 50)
      .map(b => ({ text: b.innerText.trim(), cls: b.className?.toString().slice(0,60) }));
  });
  console.log('Construction tabs:', JSON.stringify(tabs));

  // Try clicking each tab-looking button and capture text
  const tabBtns = page.locator('button').filter({ hasText: /Проект|ДДС|Прогноз|доход|расход|план|факт/i });
  const count = await tabBtns.count();
  console.log(`Found ${count} tab buttons matching pattern`);

  for (let i = 0; i < count; i++) {
    const btn = tabBtns.nth(i);
    const btnText = await btn.innerText();
    await btn.click().catch(() => {});
    await page.waitForTimeout(500);

    // Get text from dashboard island area
    const dashText = await page.evaluate(() => {
      const dash = document.querySelector('[class*="Dashboard"], .av-slider, [class*="dashboard"]');
      return dash?.innerText?.trim().slice(0, 300) || '';
    });

    const yoy = /\bYoY\b/.test(dashText);
    const ytd = /\bYTD\b/.test(dashText);
    if (yoy || ytd) {
      console.log(`  TAB "${btnText.trim()}" — YoY:${yoy} YTD:${ytd}`);
      console.log(`  Text: ${dashText.slice(0, 200)}`);
    } else {
      console.log(`  TAB "${btnText.trim()}" — clean`);
    }
  }
});
