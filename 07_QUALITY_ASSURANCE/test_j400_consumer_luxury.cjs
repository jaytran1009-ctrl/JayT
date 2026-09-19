const fs = require('fs');
const path = require('path');
const puppeteer = require(require.resolve('puppeteer', { paths: [path.resolve(__dirname, '..')] }));

const BASE_URL = process.env.JAYT_TEST_URL || 'http://127.0.0.1:4181/';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', error => consoleErrors.push(error.message));
  await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  const response = await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

  const base = await page.evaluate(() => ({
    version: document.body.dataset.version,
    shellVersion: document.querySelector('.j400-shell')?.dataset.version,
    tabCount: document.querySelectorAll('[data-j400-tab]').length,
    productCount: document.querySelectorAll('.j400-product').length,
    activePanels: document.querySelectorAll('.j400-panel.is-active').length,
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    scrollHeight: document.documentElement.scrollHeight,
    viewportHeight: innerHeight,
    hasUndefined: document.body.innerText.includes('undefined'),
    fixedToolCount: document.querySelectorAll('.j400-bottom').length
  }));
  assert(response && response.status() === 200, 'Expected HTTP 200');
  assert(base.version === 'v3.451.0-j400-staging', 'Body version mismatch');
  assert(base.shellVersion === base.version, 'Shell version mismatch');
  assert(base.tabCount === 3, 'Expected exactly 3 tabs');
  assert(base.productCount === 4, 'Expected exactly 4 products');
  assert(base.activePanels === 1, 'Expected one active panel');
  assert(base.scrollWidth === base.clientWidth, 'Horizontal overflow detected');
  assert(!base.hasUndefined, 'Visible undefined text detected');
  assert(base.fixedToolCount === 1, 'Expected one fixed utility launcher');
  assert(base.scrollHeight <= base.viewportHeight * 2, 'Counter tab exceeds two viewports');

  await page.type('#j400-brand-input', 'Met');
  const visibleBrands = await page.evaluate(() => [...document.querySelectorAll('[data-j400-name]')].filter(x => !x.hidden).map(x => x.textContent.trim()));
  assert(visibleBrands.length === 1 && visibleBrands[0] === 'Metiz', 'RAM brand filtering failed');

  await page.click('.j400-deal');
  await page.waitForSelector('#cashier-quick-modal [role="dialog"]', { visible: true });
  const cashierAudit = await page.evaluate(() => ({
    latency: window.cashierQuickCardLastOpenMs,
    amountFontPx: parseFloat(getComputedStyle(document.querySelector('.cashier-quick-amount')).fontSize),
    hasBrand: Boolean(document.querySelector('#cashier-quick-title')?.textContent.trim()),
    hasCashierLine: Boolean(document.querySelector('.cashier-line')?.textContent.trim()),
    hasAddress: Boolean(document.querySelector('.cashier-address-text')?.textContent.trim()),
    viewportHeight: innerHeight,
    modalHeight: document.querySelector('.cashier-quick-card')?.getBoundingClientRect().height
  }));
  const cashierMs = cashierAudit.latency;
  assert(cashierMs < 30, `Cashier HUD took ${cashierMs.toFixed(2)}ms`);
  assert(cashierAudit.amountFontPx >= 36, 'Cashier amount is smaller than 36px');
  assert(cashierAudit.hasBrand && cashierAudit.hasCashierLine && cashierAudit.hasAddress, 'Cashier HUD is missing required content');
  assert(cashierAudit.modalHeight >= cashierAudit.viewportHeight, 'Cashier HUD is not full-screen');
  await page.evaluate(() => closeCashierQuickCard());

  await page.click('.j400-bottom button');
  await page.evaluate(() => {
    document.querySelector('#j400-food').value = '50000';
    document.querySelector('#j400-delivery').value = '12000';
    document.querySelector('#j400-voucher').value = '15000';
    updateJ400Lunch();
  });
  const lunch = await page.$eval('#j400-lunch-result', el => el.textContent.trim());
  assert(lunch === '47.000đ thực trả', `Lunch result mismatch: ${lunch}`);
  await page.click('.j400-tool-tabs button:nth-child(2)');
  const split = await page.$eval('#j400-split-result', el => el.textContent.trim());
  const qrRendered = await page.$eval('#j400-qr', el => Boolean(el.querySelector('table')));
  assert(split === '40.000đ / người', `Split result mismatch: ${split}`);
  assert(qrRendered, 'QR was not rendered');
  await page.evaluate(() => closeJ400Tools());

  const heights = {};
  for (const id of ['today', 'pass']) {
    await page.click(`[data-j400-tab="${id}"]`);
    heights[id] = await page.evaluate(() => ({ height: document.documentElement.scrollHeight, viewport: innerHeight }));
    assert(heights[id].height <= heights[id].viewport * 2, `${id} tab exceeds two viewports`);
  }

  const source = fs.readFileSync(path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js'), 'utf8');
  assert(!/affiliate_enabled\s*[:=]\s*true/i.test(source), 'affiliate_enabled=true detected');
  assert(consoleErrors.length === 0, `Console errors: ${consoleErrors.join(' | ')}`);

  await page.reload({ waitUntil: 'networkidle0' });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.resolve(__dirname, '../scratch/j400_counter_390.png'), fullPage: true });
  console.log(JSON.stringify({ httpStatus: response.status(), base, visibleBrands, cashierAudit, lunch, split, qrRendered, heights, consoleErrors }, null, 2));
  await browser.close();
})().catch(error => { console.error(error.stack || error); process.exit(1); });
