const puppeteer = require('puppeteer');
const assert = require('assert');

(async () => {
  const base = process.env.JAYT_J407_TEST_URL || 'http://127.0.0.1:4190/';
  const browser = await puppeteer.launch({ headless: true });
  for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.setViewport({ ...viewport, deviceScaleFactor: 1 });
    const response = await page.goto(base, { waitUntil: 'networkidle2' });
    assert([200, 304].includes(response.status()), `unexpected HTTP ${response.status()}`);

    const metrics = await page.evaluate(() => {
      const visible = (selector) => {
        const el = document.querySelector(selector);
        return !!el && getComputedStyle(el).display !== 'none' && el.getClientRects().length > 0;
      };
      const dock = document.querySelector('#counter-quick-dock');
      return {
        version: document.querySelector('[data-version]')?.dataset.version,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        visibleLegacyDormCards: [...document.querySelectorAll('#dorm-shopping-module .product-card')].filter((el) => getComputedStyle(el).display !== 'none' && el.getClientRects().length).length,
        campus: visible('#campus-dock-section'),
        cinema: visible('#cinema-schedule-container'),
        lunch: visible('#lunch-arbitrage-module'),
        split: visible('#split-bill-module'),
        dockVisible: visible('#counter-quick-dock'),
        dockPosition: dock ? getComputedStyle(dock).position : '',
        dockBottom: dock ? getComputedStyle(dock).bottom : '',
        dockHeight: dock ? dock.getBoundingClientRect().height : 0,
        terminalHints: document.querySelectorAll('.j406-hint').length,
        affiliateFalse: document.documentElement.innerHTML.includes('affiliate_enabled') ? !document.documentElement.innerHTML.includes('affiliate_enabled: true') : true
      };
    });
    assert.strictEqual(metrics.version, 'v3.459.0-j407');
    assert(metrics.campus && metrics.cinema && metrics.lunch && metrics.split, 'restored utility module is hidden');
    assert.strictEqual(metrics.visibleLegacyDormCards, 0);
    assert.strictEqual(metrics.terminalHints, 3);
    assert.strictEqual(metrics.overflow, false);
    assert.strictEqual(errors.length, 0, errors.join('\n'));

    if (viewport.width === 390) {
      assert(metrics.dockVisible && metrics.dockPosition === 'fixed' && metrics.dockBottom === '0px');
      assert(metrics.dockHeight >= 55 && metrics.dockHeight <= 58, `dock height ${metrics.dockHeight}`);
    } else {
      assert.strictEqual(metrics.dockVisible, false, 'desktop dock must be hidden');
    }

    await page.click('#j405-pass-flip');
    const pass = await page.evaluate(() => {
      const card = document.querySelector('#j406-private-concierge #j405-pass-card');
      const front = card.querySelector('.j405-pass-front');
      const back = card.querySelector('.j405-pass-back');
      const qr = back.querySelector('#j405-pass-qr');
      const cr = card.getBoundingClientRect();
      const qrRect = qr.getBoundingClientRect();
      return {
        flipped: card.classList.contains('is-flipped'),
        frontDisplay: getComputedStyle(front).display,
        backDisplay: getComputedStyle(back).display,
        backTransform: getComputedStyle(back).transform,
        qrInside: qrRect.left >= cr.left && qrRect.right <= cr.right && qrRect.top >= cr.top && qrRect.bottom <= cr.bottom
      };
    });
    assert(pass.flipped && pass.frontDisplay === 'none' && pass.backDisplay !== 'none');
    assert.strictEqual(pass.backTransform, 'none');
    assert(pass.qrInside, 'QR exceeds JayT Pass bounds');

    await page.close();
    console.log(`J407 ${viewport.width}px PASS | dock ${metrics.dockVisible ? 'mobile-fixed' : 'desktop-hidden'} | pass back unmirrored | utilities restored | 0 console errors`);
  }
  await browser.close();
})().catch((error) => { console.error(error); process.exit(1); });
