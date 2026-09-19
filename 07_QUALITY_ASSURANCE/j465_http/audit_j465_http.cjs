const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const puppeteer = require('puppeteer');

const project = path.resolve(__dirname, '..', '..');
const servedRoot = path.join(project, 'deploy');
const output = __dirname;
const expectedVersion = 'v3.496.0-j465-monolithic-surface';
const viewports = [[390, 844], [1440, 1000]];
const coreModules = [
  'j406-private-concierge', 'campus-dock-section', 'deals-vault-module',
  'lunch-arbitrage-module', 'split-bill-module', 'dorm-shopping-module'
];
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.ico':'image/x-icon'};
const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const requested = urlPath === '/' ? '/index.html' : urlPath;
  const file = path.resolve(servedRoot, '.' + requested);
  if (!file.startsWith(servedRoot + path.sep) && file !== path.join(servedRoot, 'index.html')) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, bytes) => {
    if (err) { res.writeHead(err.code === 'ENOENT' ? 404 : 500); return res.end('Not found'); }
    res.writeHead(200, {'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control':'no-store'});
    res.end(bytes);
  });
});
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const fetchText = url => new Promise((resolve, reject) => https.get(url, response => {
  let body = ''; response.setEncoding('utf8'); response.on('data', chunk => body += chunk);
  response.on('end', () => resolve({status:response.statusCode, url:response.url || url, body}));
}).on('error', reject));

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const url = `http://127.0.0.1:${port}/`;
  const report = {generatedAt: new Date().toISOString(), servedRoot, url, expectedVersion, canonicalExpected:'J460', checks:{}, viewports:[]};
  const manifest = JSON.parse(fs.readFileSync(path.join(servedRoot, 'published_manifest.json'), 'utf8'));
  report.checks.exactJ465Version = {actual: manifest.version, pass: manifest.version === expectedVersion};
  const canonical = await fetchText(manifest.canonical_url);
  report.checks.canonicalRemainsJ460 = {canonicalUrl: manifest.canonical_url, status:canonical.status, containsJ460:/J460/i.test(canonical.body), containsJ465:/J465/i.test(canonical.body), pass: manifest.canonical_url === 'https://jayt-production-v3420.vercel.app' && canonical.status === 200 && /J460/i.test(canonical.body) && !/J465/i.test(canonical.body), note:'The remote canonical is verified separately from the HTTP-served local non-production J465 package.'};
  const browser = await puppeteer.launch({headless:'new'});
  for (const [width, height] of viewports) {
    const page = await browser.newPage();
    const pageErrors = [], consoleErrors = [];
    page.on('pageerror', err => pageErrors.push(String(err)));
    page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
    await page.setViewport({width, height, deviceScaleFactor:1});
    await page.goto(url, {waitUntil:'networkidle0', timeout:30000});
    await wait(500);
    const screenshot = path.join(output, `WS1_deploy_http_${width}x${height}_full.png`);
    await page.screenshot({path:screenshot, fullPage:true});
    const data = await page.evaluate(({coreModules}) => {
      const shown = e => { const s=getComputedStyle(e), r=e.getBoundingClientRect(); return s.display !== 'none' && s.visibility !== 'hidden' && +s.opacity !== 0 && r.width >= 20 && r.height >= 20 && r.bottom > 0 && r.right > 0 && r.top < innerHeight && r.left < innerWidth; };
      const nearWhite = color => { const n=(color.match(/[\\d.]+/g)||[]).map(Number); return n.length >= 3 && n[3] !== 0 && n[0] >= 220 && n[1] >= 215 && n[2] >= 195; };
      const components = [...document.querySelectorAll('*')].filter(shown);
      const creamEls = components.filter(e => nearWhite(getComputedStyle(e).backgroundColor)).map(e => ({tag:e.tagName,id:e.id,className:typeof e.className==='string' ? e.className : '',background:getComputedStyle(e).backgroundColor})).slice(0,100);
      const heroCandidates = [...document.querySelectorAll('[id*="hero" i], [class*="hero" i], #j406-private-concierge')];
      const hero = heroCandidates.find(e => /dragon|bridge/i.test(getComputedStyle(e).backgroundImage)) || heroCandidates.find(e => /dragon|bridge/i.test(e.textContent || '')) || document.querySelector('#j406-private-concierge');
      const cinema = document.getElementById('cinema-power-hub') || [...document.querySelectorAll('[id],[class]')].find(e => /cinema-power-hub/i.test(`${e.id} ${typeof e.className==='string'?e.className:''}`)) || [...document.querySelectorAll('section,div')].find(e => /cinema power hub/i.test(e.textContent || ''));
      const dock = document.querySelector('#counter-quick-dock, .counter-quick-dock, #bottom-action-dock, .bottom-action-dock, .mobile-quick-dock, [data-mobile-dock], [id*="dock" i][class*="mobile" i]');
      const styleTags = [...document.querySelectorAll('style')].map(s => ({id:s.id, bytes:s.textContent.length}));
      const runtimeTags = styleTags.filter(s => /j465|runtime|monolithic/i.test(s.id));
      const skuCount = document.querySelectorAll('.dorm-sku-card, .dorm-product-card, [data-dorm-sku], [data-sku]').length;
      let hudMs = null;
      let hudOpened = false;
      if (dock && innerWidth <= 600) {
        const action = dock.querySelector('.counter-dock-btn:nth-child(3), .quick-dock-btn:nth-child(3), button');
        const startedAt = performance.now();
        action?.click();
        hudMs = performance.now() - startedAt;
        const modal = document.getElementById('counter-3sec-modal');
        hudOpened = !!modal && getComputedStyle(modal).display !== 'none' && !!modal.querySelector('[role="dialog"]');
      }
      return {
        location: location.href, styleTags, runtimeTags,
        hero:{found:!!hero, selector:hero ? (hero.id ? '#'+hero.id : hero.tagName.toLowerCase()+'.'+[...hero.classList].join('.')) : null, backgroundImage:hero ? getComputedStyle(hero).backgroundImage : null},
        skuCount, nameCardOccurrences:(document.body.innerText.match(/Name Card/gi)||[]).length,
        coreModules:Object.fromEntries(coreModules.map(id=>[id, !!document.getElementById(id)])),
        cinemaPowerHub:{found:!!cinema, selector:cinema ? (cinema.id ? '#'+cinema.id : cinema.tagName.toLowerCase()+'.'+[...cinema.classList].join('.')) : null},
        mobileDock:{found:!!dock, visible:!!dock && shown(dock), selector:dock ? (dock.id ? '#'+dock.id : dock.tagName.toLowerCase()+'.'+[...dock.classList].join('.')) : null, hudMs, hudOpened},
        overflow:{scrollWidth:document.documentElement.scrollWidth, clientWidth:document.documentElement.clientWidth, overflowX:document.documentElement.scrollWidth > document.documentElement.clientWidth},
        nearWhiteVisibleComponents:creamEls
      };
    }, {coreModules});
    data.pageErrors = pageErrors; data.consoleErrors = consoleErrors;
    data.screenshot = screenshot;
    report.viewports.push({width,height,...data});
    await page.close();
  }
  await browser.close();
  const all = report.viewports;
  report.checks.oneRuntimeStyleTag = {actual:all.map(v=>v.runtimeTags), pass:all.every(v=>v.runtimeTags.length===1 && v.runtimeTags[0].id==='j465-monolithic-production-styles')};
  report.checks.dragonBridgeHeroLoaded = {actual:all.map(v=>v.hero), pass:all.every(v=>v.hero.found && /dragon|bridge/i.test(v.hero.backgroundImage||''))};
  report.checks.thirtySku = {actual:all.map(v=>v.skuCount), pass:all.every(v=>v.skuCount===30)};
  report.checks.nameCardAbsent = {actual:all.map(v=>v.nameCardOccurrences), pass:all.every(v=>v.nameCardOccurrences===0)};
  report.checks.coreModuleIds = {actual:all.map(v=>({core:v.coreModules,cinema:v.cinemaPowerHub})), pass:all.every(v=>Object.values(v.coreModules).every(Boolean) && v.cinemaPowerHub.found)};
  report.checks.mobileDockAndHud = {actual:all.map(v=>v.mobileDock), pass:all[0].mobileDock.found && all[0].mobileDock.visible && all[0].mobileDock.hudOpened && typeof all[0].mobileDock.hudMs === 'number' && all[0].mobileDock.hudMs < 30};
  report.checks.zeroErrors = {actual:all.map(v=>({page:v.pageErrors,console:v.consoleErrors})), pass:all.every(v=>!v.pageErrors.length&&!v.consoleErrors.length)};
  report.checks.zeroOverflow = {actual:all.map(v=>v.overflow), pass:all.every(v=>!v.overflow.overflowX)};
  report.checks.noVisibleNearWhiteCream = {actual:all.map(v=>v.nearWhiteVisibleComponents), pass:all.every(v=>!v.nearWhiteVisibleComponents.length)};
  report.pass = Object.values(report.checks).every(c=>c.pass);
  fs.writeFileSync(path.join(output,'j465_http_audit_report.json'), JSON.stringify(report,null,2));
  console.log(JSON.stringify({pass:report.pass, checks:Object.fromEntries(Object.entries(report.checks).map(([k,v])=>[k,v.pass]))},null,2));
  server.close();
})().catch(err => { console.error(err); server.close(); process.exitCode=1; });
