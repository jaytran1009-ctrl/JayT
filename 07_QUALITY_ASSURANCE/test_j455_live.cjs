const path = require('path');
const puppeteer = require(path.resolve(__dirname, '..', 'node_modules', 'puppeteer'));

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const report = {};
  let failed = false;
  for (const viewport of [{name:'mobile_390',width:390,height:844},{name:'desktop_1440',width:1440,height:900}]) {
    const page = await browser.newPage();
    await page.setViewport({width:viewport.width,height:viewport.height});
    const errors=[];
    page.on('console',m=>{if(m.type()==='error') errors.push(m.text());});
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto('https://jayt-production-v3420.vercel.app/?j455-live-qa=1',{waitUntil:'networkidle0'});
    const metrics=await page.evaluate(()=>{
      const visible=el=>{if(!el)return false;const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0;};
      const selectors=['.jayt-header','#j406-private-concierge .j406-hero','.j434-cinema-section','#j406-private-concierge .j408-brand-card','#j406-private-concierge .j406-terminal','#dorm-shopping-module','#campus-dock-section','#deals-vault-module','#lunch-arbitrage-module','#student-savings-module','#split-bill-module','.jayt-pass-banner'];
      const start=performance.now();openCashierQuickCard('metiz_cinema');const hudMs=performance.now()-start;const hudVisible=visible(document.querySelector('#cashier-quick-modal .cashier-quick-card'));closeCashierQuickCard();
      return {version:document.querySelector('[data-version]')?.dataset.version,styleTags:document.querySelectorAll('#jayt-app-root style').length,visibleSurfaces:selectors.filter(x=>visible(document.querySelector(x))).length,dormCards:document.querySelectorAll('#dorm-shopping-module .dorm-sku-card').length,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,undefinedText:document.body.innerText.includes('undefined'),affiliateEnabled:typeof CONFIG!=='undefined'?CONFIG.affiliate_enabled:false,hudMs,hudVisible};
    });
    metrics.consoleErrors=errors;
    const expectedVersion=process.env.JAYT_EXPECTED_VERSION||'v3.492.0-j455-human-craft';
    metrics.pass=metrics.version===expectedVersion&&metrics.styleTags===1&&metrics.visibleSurfaces===12&&metrics.dormCards===30&&metrics.overflow<=1&&!metrics.undefinedText&&metrics.affiliateEnabled===false&&metrics.hudMs<30&&metrics.hudVisible&&errors.length===0;
    report[viewport.name]=metrics;failed||=!metrics.pass;await page.close();
  }
  await browser.close();console.log(JSON.stringify(report,null,2));if(failed)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
