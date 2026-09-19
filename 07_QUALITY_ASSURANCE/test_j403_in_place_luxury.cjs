const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const targetUrl = process.env.JAYT_TEST_URL || 'http://127.0.0.1:4182/';
const widths = [390, 1440];
const requiredIds = [
  'onsite-counter-search-section',
  'counter-quick-dock',
  'campus-dock-section',
  'danang-fnb-hub-container',
  'lunch-arbitrage-module',
  'student-savings-module',
  'split-bill-module',
  'dorm-shopping-module',
  'counter-copilot-sheet',
  'onsite-bill-split-modal',
  'zalo-pass-modal'
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const fail = (message) => { throw new Error(message); };

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  let failures = 0;
  try {
    for (const width of widths) {
      const page = await browser.newPage();
      const consoleErrors = [];
      page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
      page.on('pageerror', err => consoleErrors.push(String(err && err.message || err)));
      await page.setViewport({ width, height: 844, isMobile: width < 768 });
      const response = await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 });
      const result = await page.evaluate((ids) => {
        const allText = document.body ? document.body.innerText : '';
        const root = document.documentElement;
        const dock = document.getElementById('counter-quick-dock');
        const dockStyle = dock ? getComputedStyle(dock) : null;
        return {
          status: window.__JAYT_STATUS || null,
          version: document.querySelector('[data-version]')?.getAttribute('data-version') || null,
          missingIds: ids.filter(id => !document.getElementById(id)),
          missingClass: !document.querySelector('.jayt-pass-banner'),
          hasUndefined: /(^|[^A-Za-z])undefined([^A-Za-z]|$)/i.test(allText),
          placeholderCount: Array.from(document.images).filter(img => /placeholder|neutral_placeholder|neutral-food|neutral_food/i.test(img.getAttribute('src') || '')).length,
          scrollWidth: root.scrollWidth,
          clientWidth: root.clientWidth,
          dockButtons: dock ? dock.querySelectorAll('button').length : 0,
          dockHeight: dockStyle ? parseFloat(dockStyle.height) : null,
          dockZIndex: dockStyle ? dockStyle.zIndex : null,
          affiliateTrueInDom: /affiliate_enabled\s*[:=]\s*true/i.test(document.documentElement.innerHTML)
        };
      }, requiredIds);
      if (!response || response.status && response.status >= 400) fail(`HTTP ${response && response.status}`);
      if (result.missingIds.length) fail(`missing IDs: ${result.missingIds.join(', ')}`);
      if (result.missingClass) fail('missing .jayt-pass-banner');
      if (result.hasUndefined) fail('undefined text present');
      if (result.placeholderCount) fail(`placeholder images: ${result.placeholderCount}`);
      if (result.scrollWidth > result.clientWidth) fail(`horizontal overflow ${result.scrollWidth}>${result.clientWidth}`);
      if (result.dockButtons !== 4) fail(`dock buttons ${result.dockButtons}`);
      if (Math.abs(result.dockHeight - 56) > 2) fail(`dock height ${result.dockHeight}`);
      if (String(result.dockZIndex) !== '90') fail(`dock z-index ${result.dockZIndex}`);
      if (result.affiliateTrueInDom) fail('affiliate_enabled=true leaked into DOM');
      if (consoleErrors.length) fail(`console errors: ${consoleErrors.join(' | ')}`);

      const dockOpen = await page.evaluate(() => {
        const button = document.querySelector('#counter-quick-dock button');
        if (!button) return { ok: false, reason: 'no dock button' };
        const start = performance.now();
        button.click();
        const modal = document.getElementById('cashier-quick-modal');
        return { ok: !!modal && modal.getAttribute('aria-hidden') !== 'true', latency: performance.now() - start };
      });
      if (!dockOpen.ok) fail('Cashier HUD did not open');
      if (dockOpen.latency >= 30) fail(`Cashier HUD latency ${dockOpen.latency.toFixed(2)}ms`);

      if (width === 390) {
        const splitOpen = await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('#counter-quick-dock button'));
          const split = buttons[3];
          if (!split) return false;
          split.click();
          const modal = document.getElementById('onsite-bill-split-modal');
          return !!modal && getComputedStyle(modal).display !== 'none' && modal.getAttribute('aria-hidden') !== 'true';
        });
        if (!splitOpen) fail('VietQR split modal did not open');
      }

      const screenshotPath = path.resolve(__dirname, '..', 'scratch', `j403_${width}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`[J403 QA ${width}px] PASS HTTP ${response.status()} | ${result.missingIds.length === 0 ? '12 modules' : 'modules FAIL'} | dock ${dockOpen.latency.toFixed(2)}ms`);
      await page.close();
    }
    const source = fs.readFileSync(path.resolve(__dirname, '..', '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js'), 'utf8');
    if (/affiliate_enabled\s*[:=]\s*true/i.test(source)) fail('affiliate_enabled=true found in source');
    console.log('JAYT-403 QA: PASS (390px + 1440px, no console errors, no overflow, no undefined)');
  } catch (error) {
    failures += 1;
    console.error(`JAYT-403 QA: FAIL — ${error.message}`);
  } finally {
    await browser.close();
  }
  process.exitCode = failures ? 1 : 0;
})();
