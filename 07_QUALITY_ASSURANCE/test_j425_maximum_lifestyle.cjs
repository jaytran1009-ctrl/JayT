const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const assert = require('assert');
const root = path.resolve(__dirname, '../deploy');
const port = 4185;
const mime = { '.html':'text/html; charset=utf-8', '.js':'application/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.json':'application/json' };
const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0] === '/' ? '/index.html' : req.url.split('?')[0];
  const file = path.join(root, url);
  if (fs.existsSync(file) && fs.statSync(file).isFile()) {
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  } else { res.writeHead(404); res.end('Not found'); }
});
(async () => {
  await new Promise(resolve => server.listen(port, '127.0.0.1', resolve));
  const browser = await puppeteer.launch({ headless:true, args:['--no-sandbox'] });
  try {
    for (const vp of [{width:390,height:844},{width:1440,height:900}]) {
      const page = await browser.newPage();
      const errors = [];
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      page.on('pageerror', error => errors.push(error.message));
      await page.setViewport({...vp, deviceScaleFactor:1});
      const response = await page.goto(`http://127.0.0.1:${port}/`, {waitUntil:'networkidle2'});
      assert.strictEqual(response.status(), 200);
      const metrics = await page.evaluate(() => {
        const visible = selector => { const element=document.querySelector(selector); return !!element && getComputedStyle(element).display !== 'none' && element.getClientRects().length > 0; };
        const text = document.body.innerText;
        const brands = [...document.querySelectorAll('.j408-brand-card')];
        return {
          version: document.querySelector('[data-version]')?.dataset.version,
          subtitle: document.querySelector('.brand-subtitle')?.textContent.trim(),
          hero: document.querySelector('#j406-title')?.textContent.trim(),
          dayparts: document.querySelectorAll('.j425-dayparts button').length,
          brands: brands.length,
          firstFive: brands.slice(0,5).map(item => item.innerText),
          modules: ['#campus-dock-section','#cinema-schedule-container','#lunch-arbitrage-module','#split-bill-module','#dorm-shopping-module'].every(selector => document.querySelector(selector)),
          nameCard: visible('.j406-pass-stage'), oldSlogan: /AESTHETIC\s*&\s*MINIMAL/i.test(text),
          undefinedText: /\bundefined\b/i.test(text), overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
          affiliateLeak: document.documentElement.innerHTML.includes('affiliate_enabled: true')
        };
      });
      assert.strictEqual(metrics.version, 'v3.469.0-j425');
      assert.strictEqual(metrics.subtitle, 'Tiện ích & Đời sống số');
      assert.strictEqual(metrics.hero, 'ĐÀ NẴNG — NHỊP PHỐ & ĐẶC QUYỀN QUẦY');
      assert.strictEqual(metrics.dayparts, 4); assert.strictEqual(metrics.brands, 10);
      for (const token of ['Bạch Đằng','Nguyễn Văn Linh','2 Tháng 9','Helio','Điện Biên Phủ']) assert(metrics.firstFive.join(' ').includes(token), token);
      assert(metrics.modules && !metrics.nameCard && !metrics.oldSlogan && !metrics.undefinedText && !metrics.overflow && !metrics.affiliateLeak);
      await page.evaluate(() => document.querySelectorAll('.j425-dayparts button')[3].click());
      assert((await page.$eval('#j425-pulse-copy', element => element.innerText)).includes('Tối Helio'));
      const hud = await page.evaluate(() => { const start=performance.now(); openCashierQuickCard('highlands_coffee'); return performance.now()-start; });
      assert(hud < 30); assert.strictEqual(errors.length, 0, errors.join('\n'));
      console.log(`J425 ${vp.width}px PASS | 10 local brands | 4 dayparts | HUD ${hud.toFixed(2)}ms`);
      await page.close();
    }
  } finally { await browser.close(); server.close(); }
})().catch(error => { console.error(error); server.close(); process.exit(1); });
