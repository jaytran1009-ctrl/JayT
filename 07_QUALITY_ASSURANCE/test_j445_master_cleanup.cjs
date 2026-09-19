const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require(path.resolve(__dirname, '..', 'node_modules', 'puppeteer'));

const root = path.resolve(__dirname, '..', 'deploy');
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.svg':'image/svg+xml', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.png':'image/png' };
const server = http.createServer((req, res) => {
  const clean = decodeURIComponent(req.url.split('?')[0]);
  const relative = clean === '/' ? 'index.html' : clean.replace(/^\/+/, '');
  const target = path.resolve(root, relative);
  if (!target.startsWith(root) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) {
    res.writeHead(404); res.end('Not found'); return;
  }
  res.writeHead(200, { 'Content-Type': types[path.extname(target).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(target).pipe(res);
});

(async () => {
  await new Promise((resolve) => server.listen(4185, '127.0.0.1', resolve));
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const results = {};
  let failed = false;
  for (const viewport of [{name:'mobile_390',width:390,height:844},{name:'desktop_1440',width:1440,height:900}]) {
    const page = await browser.newPage();
    await page.setViewport({ width: viewport.width, height: viewport.height });
    const consoleErrors = [];
    page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
    page.on('pageerror', (err) => consoleErrors.push(err.message));
    await page.goto('http://127.0.0.1:4185/', { waitUntil: 'networkidle0' });
    const metrics = await page.evaluate(() => {
      const visible = (el) => {
        if (!el) return false;
        const style = getComputedStyle(el); const rect = el.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
      };
      const surfaceSelectors = [
        '.jayt-header', '#j406-private-concierge .j406-hero', '.j434-cinema-section',
        '#j406-private-concierge .j408-brand-card', '#j406-private-concierge .j406-terminal',
        '#dorm-shopping-module', '#campus-dock-section', '#deals-vault-module',
        '#lunch-arbitrage-module', '#student-savings-module', '#split-bill-module', '.jayt-pass-banner'
      ];
      const states = surfaceSelectors.map((selector) => ({ selector, visible: visible(document.querySelector(selector)) }));
      const dorm = document.querySelector('#dorm-shopping-module');
      const concierge = document.querySelector('#j406-private-concierge');
      const started = performance.now();
      openCashierQuickCard('metiz_cinema');
      const hudMs = performance.now() - started;
      const hudVisible = visible(document.querySelector('#cashier-quick-modal .cashier-quick-card'));
      closeCashierQuickCard();
      return {
        version: document.querySelector('[data-version]')?.getAttribute('data-version'),
        styleTags: document.querySelectorAll('#jayt-app-root style').length,
        unifiedStyle: Boolean(document.querySelector('#j445-unified-production-styles')),
        surfaces: states,
        visibleSurfaceCount: states.filter((state) => state.visible).length,
        dormCards: document.querySelectorAll('#dorm-shopping-module .dorm-sku-card').length,
        dormImmediatelyAfterConcierge: concierge?.nextElementSibling === dorm,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        hudMs, hudVisible,
        undefinedText: document.body.innerText.includes('undefined'),
        affiliateEnabled: typeof CONFIG !== 'undefined' ? CONFIG.affiliate_enabled : false
      };
    });
    metrics.consoleErrors = consoleErrors;
    await page.screenshot({ path: path.join(__dirname, `j445_${viewport.name}.png`), fullPage: true });
    results[viewport.name] = metrics;
    const pass = metrics.styleTags === 1 && metrics.unifiedStyle && metrics.visibleSurfaceCount === 12 &&
      metrics.dormCards === 30 && metrics.dormImmediatelyAfterConcierge && metrics.overflow <= 1 &&
      metrics.hudMs < 30 && metrics.hudVisible && !metrics.undefinedText && consoleErrors.length === 0 &&
      metrics.affiliateEnabled === false;
    results[viewport.name].pass = pass;
    failed ||= !pass;
    await page.close();
  }
  await browser.close(); server.close();
  console.log(JSON.stringify(results, null, 2));
  if (failed) process.exitCode = 1;
})().catch((error) => { console.error(error); server.close(); process.exitCode = 1; });
