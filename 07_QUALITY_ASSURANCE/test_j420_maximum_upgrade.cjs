const puppeteer = require('puppeteer');
const assert = require('assert');

(async () => {
  const base = process.env.JAYT_J420_TEST_URL || 'http://127.0.0.1:4181/';
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const required = ['#onsite-counter-search-section','#counter-quick-dock','#cinema-schedule-container','#danang-fnb-hub-container','#campus-dock-section','#deals-vault-module','#lunch-arbitrage-module','#student-savings-module','#split-bill-module','#dorm-shopping-module','.jayt-pass-banner','#counter-copilot-sheet'];
  for (const viewport of [{width:390,height:844},{width:1440,height:900}]) {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', e => errors.push(e.message));
    await page.setViewport({...viewport,deviceScaleFactor:1});
    const response = await page.goto(base,{waitUntil:'networkidle2'});
    assert([200,304].includes(response.status()));
    const m = await page.evaluate((selectors) => {
      const visible=s=>{const e=document.querySelector(s);return !!e&&getComputedStyle(e).display!=='none'&&e.getClientRects().length>0};
      const text=document.body.innerText;
      const dock=document.querySelector('#counter-quick-dock');
      return {version:document.querySelector('[data-version]')?.dataset.version,title:document.querySelector('.brand-title')?.textContent.trim(),subtitle:document.querySelector('.brand-subtitle')?.textContent.trim(),forbidden:/AESTHETIC\s*&\s*MINIMAL\s*DESIGN/i.test(text),undefinedText:/\bundefined\b/i.test(text),overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,required:selectors.every(s=>document.querySelector(s)),visibleCore:['.j411-radar','#cinema-schedule-container','#campus-dock-section','#lunch-arbitrage-module','#split-bill-module'].every(s=>visible(s)),nameCardHero:visible('.j406-pass-stage'),dockVisible:visible('#counter-quick-dock'),dockHeight:dock?.getBoundingClientRect().height||0,affiliateLeak:document.documentElement.innerHTML.includes('affiliate_enabled: true')};
    },required);
    assert.strictEqual(m.version,'v3.464.0-j420');
    assert.strictEqual(m.title,'JAYT ĐÀ NẴNG');
    assert.strictEqual(m.subtitle,'Cẩm nang tiện ích & đời sống số');
    assert(m.required && m.visibleCore && !m.forbidden && !m.undefinedText && !m.overflow && !m.nameCardHero && !m.affiliateLeak);
    if(viewport.width===390) assert(m.dockVisible&&m.dockHeight>=55&&m.dockHeight<=58); else assert.strictEqual(m.dockVisible,false);
    const hudMs=await page.evaluate(()=>{const t=performance.now();openCashierQuickCard('highlands_coffee');return performance.now()-t});
    assert(hudMs<30,`HUD ${hudMs}ms`);
    assert.strictEqual(errors.length,0,errors.join('\n'));
    console.log(`J420 ${viewport.width}px PASS | 12 modules | HUD ${hudMs.toFixed(2)}ms | 0 console errors`);
    await page.close();
  }
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
