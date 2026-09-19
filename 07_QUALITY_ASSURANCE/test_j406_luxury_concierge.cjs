const puppeteer = require('puppeteer');
const assert = require('assert');

(async () => {
  const base = process.env.JAYT_J406_TEST_URL || 'http://127.0.0.1:4189/';
  const browser = await puppeteer.launch({ headless: true });
  for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.setViewport({ ...viewport, deviceScaleFactor: 1 });
    const response = await page.goto(base, { waitUntil: 'networkidle2' });
    assert([200, 304].includes(response.status()), `unexpected HTTP ${response.status()}`);
    const metrics = await page.evaluate(() => ({
      version: document.querySelector('[data-version]')?.dataset.version,
      height: document.documentElement.scrollHeight,
      viewportHeight: innerHeight,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      visibleLegacyDormCards: [...document.querySelectorAll('#dorm-shopping-module .product-card')].filter((el) => getComputedStyle(el).display !== 'none' && el.getClientRects().length).length,
      concierge: !!document.getElementById('j406-private-concierge'),
      pass: !!document.querySelector('#j406-private-concierge #j405-pass-card'),
      horizons: document.querySelectorAll('.j406-horizon').length,
      modules: ['onsite-counter-search-section','cinema-power-hub','danang-fnb-hub-container','campus-dock-section','deals-vault-module','lunch-arbitrage-module','student-savings-module','split-bill-module','dorm-shopping-module'].filter((id) => document.getElementById(id)).length
    }));
    assert.strictEqual(metrics.version, 'v3.458.0-j406');
    assert(metrics.concierge && metrics.pass && metrics.horizons >= 2);
    assert.strictEqual(metrics.modules, 9);
    assert.strictEqual(metrics.visibleLegacyDormCards, 0);
    assert.strictEqual(metrics.overflow, false);
    assert.strictEqual(errors.length, 0, errors.join('\n'));
    if (viewport.width === 390) assert(metrics.height <= viewport.height * 3, `mobile page is ${metrics.height}px`);
    const start = await page.evaluate(() => performance.now());
    await page.click('.j406-card button');
    const elapsed = await page.evaluate((s) => performance.now() - s, start);
    assert(elapsed < 50, `HUD ${elapsed}ms`);
    await page.close();
    console.log(`J406 ${viewport.width}px PASS | height ${metrics.height}px | HUD ${elapsed.toFixed(2)}ms | 0 console errors`);
  }
  await browser.close();
})().catch((error) => { console.error(error); process.exit(1); });
