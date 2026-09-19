const fs = require('fs');
const path = require('path');
const puppeteer = require('../node_modules/puppeteer');

const target = process.argv[2] || 'http://127.0.0.1:4181/';
const outDir = path.join(__dirname, 'j457_live');
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const report = {};
  for (const viewport of [{ name: 'mobile390', width: 390, height: 844 }, { name: 'desktop1440', width: 1440, height: 1000 }]) {
    const page = await browser.newPage();
    await page.setViewport(viewport);
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(target, { waitUntil: 'networkidle0', timeout: 60000 });
    const result = await page.evaluate(() => {
      const ids = ['j406-private-concierge', 'dorm-shopping-module', 'campus-dock-section', 'deals-vault-module', 'lunch-arbitrage-module', 'student-savings-module', 'split-bill-module'];
      const surfaces = ids.map((id) => {
        const el = document.getElementById(id);
        return { id, exists: !!el, background: el ? getComputedStyle(el).backgroundColor : null };
      });
      const cream = surfaces.filter((s) => /rgb\((?:255, 255, 255|244, 239, 229|251, 249, 245)\)/.test(s.background || ''));
      return {
        version: document.querySelector('.jayt-app-shell')?.dataset.version,
        bodyBackground: getComputedStyle(document.body).backgroundImage,
        surfaces,
        creamSurfaceIds: cream.map((s) => s.id),
        passCount: document.querySelectorAll('.jayt-pass-banner,#j405-pass-card').length,
        footer: document.querySelector('.jayt-footer')?.innerText.trim(),
        skuCount: document.querySelectorAll('#dorm-shopping-module .dorm-sku-card').length,
        affiliateEnabled: /"affiliate_enabled"\s*:\s*true/.test(document.documentElement.innerHTML),
        overflow: document.documentElement.scrollWidth - innerWidth,
        lunchVisuallyPocketed: innerWidth <= 760 ? getComputedStyle(document.getElementById('lunch-arbitrage-module')).position === 'absolute' : true
      };
    });
    if (viewport.width === 390) {
      const dockButtons = await page.$$('#counter-quick-dock .counter-dock-btn');
      await dockButtons[2].click();
      await page.waitForFunction(() => getComputedStyle(document.getElementById('counter-3sec-modal')).display !== 'none');
      result.lunchSheetOpen = await page.$eval('#counter-3sec-modal', (el) => getComputedStyle(el).display !== 'none');
      await page.evaluate(() => closeCounterQuickSheet());
      await dockButtons[3].click();
      await page.waitForFunction(() => getComputedStyle(document.getElementById('counter-3sec-modal')).display !== 'none');
      result.splitSheetOpen = await page.$eval('#counter-3sec-modal', (el) => getComputedStyle(el).display !== 'none');
      await page.evaluate(() => closeCounterQuickSheet());
    }
    result.hudOpenMs = await page.evaluate(() => {
      const started = performance.now();
      openCashierQuickCard('metiz_cinema');
      const elapsed = performance.now() - started;
      closeCounterQuickSheet();
      return elapsed;
    });
    result.consoleErrors = errors;
    report[viewport.name] = result;
    await page.screenshot({ path: path.join(outDir, `${viewport.name}.png`), fullPage: true });
    await page.close();
  }
  await browser.close();
  const failures = [];
  for (const [name, r] of Object.entries(report)) {
    if (r.version !== 'v3.495.0-j460-total-luxury') failures.push(`${name}: wrong version`);
    if (r.creamSurfaceIds.length) failures.push(`${name}: cream surfaces ${r.creamSurfaceIds.join(',')}`);
    if (r.passCount !== 0) failures.push(`${name}: pass banner present`);
    if (r.skuCount !== 30) failures.push(`${name}: expected 30 SKU, got ${r.skuCount}`);
    if (r.affiliateEnabled) failures.push(`${name}: affiliate unexpectedly enabled`);
    if (r.overflow > 0) failures.push(`${name}: horizontal overflow ${r.overflow}px`);
    if (r.consoleErrors.length) failures.push(`${name}: console errors ${r.consoleErrors.join(' | ')}`);
    if (r.hudOpenMs >= 30) failures.push(`${name}: HUD ${r.hudOpenMs}ms`);
  }
  if (!report.mobile390.lunchSheetOpen || !report.mobile390.splitSheetOpen || !report.mobile390.lunchVisuallyPocketed) failures.push('mobile390: pocket tools failed');
  console.log(JSON.stringify({ target, report, failures, pass: failures.length === 0 }, null, 2));
  process.exit(failures.length ? 1 : 0);
})().catch((error) => { console.error(error); process.exit(1); });
