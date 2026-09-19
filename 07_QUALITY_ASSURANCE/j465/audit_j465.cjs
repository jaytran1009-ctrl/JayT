const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const output = __dirname;
const targets = [
  ['WS1_deploy', 'file:///D:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/deploy/index.html'],
  ['WS2_deploy', 'file:///D:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/03_SOURCE_OF_TRUTH/index.html'],
];
const viewports = [[390,844], [1440,1000]];
const modules = ['j406-private-concierge','cinema-power-hub','campus-dock-section','deals-vault-module','lunch-arbitrage-module','split-bill-module','dorm-shopping-module'];
(async () => {
  const browser = await puppeteer.launch({headless:'new'});
  const report = { generatedAt: new Date().toISOString(), targets: [] };
  for (const [label,url] of targets) {
    const target = {label,url, viewports:[]};
    for (const [width,height] of viewports) {
      const page = await browser.newPage();
      const errors=[]; const consoleErrors=[];
      page.on('pageerror', e => errors.push(String(e)));
      page.on('console', m => {if(m.type()==='error') consoleErrors.push(m.text())});
      await page.setViewport({width,height,deviceScaleFactor:1});
      await page.goto(url, {waitUntil:'networkidle0',timeout:30000});
      await new Promise(r=>setTimeout(r,300));
      const data = await page.evaluate((modules) => {
        const rgb=v=>(v.match(/\d+/g)||[]).map(Number);
        const cream=c=>{const [r,g,b]=rgb(c); return r>220&&g>215&&b>195};
        const all=[...document.querySelectorAll('*')].filter(e=>{const s=getComputedStyle(e);const r=e.getBoundingClientRect();return r.width>20&&r.height>20&&s.display!=='none'&&s.visibility!=='hidden'});
        const creamEls=all.filter(e=>cream(getComputedStyle(e).backgroundColor)).map(e=>({tag:e.tagName,id:e.id,cls:e.className,background:getComputedStyle(e).backgroundColor})).slice(0,50);
        const hero=document.querySelector('#j406-private-concierge');
        const heroBg=hero ? getComputedStyle(hero).backgroundImage : '';
        const heroImg=[...document.images].find(i=>/dragon_bridge/i.test(i.src));
        const hud=document.querySelector('#bottom-action-dock, .bottom-action-dock, .mobile-quick-dock');
        const start=performance.now(); hud?.click(); const hudClickMs=performance.now()-start;
        return { runtimeStyleTags:[...document.querySelectorAll('style')].filter(s=>s.textContent.includes('J465')||s.id||s.dataset.runtime).map(s=>({id:s.id,bytes:s.textContent.length})), totalStyleTags:document.querySelectorAll('style').length, heroBg,heroImg:heroImg&&{src:heroImg.src,complete:heroImg.complete,naturalWidth:heroImg.naturalWidth}, nameCardText:document.body.innerText.match(/Name Card|JayT Pass/gi)||[], dormCards:document.querySelectorAll('.dorm-sku-card, .dorm-product-card, [data-dorm-sku]').length, modules:Object.fromEntries(modules.map(id=>[id,!!document.getElementById(id)])), overflow:{scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,overflowX:document.documentElement.scrollWidth>document.documentElement.clientWidth}, creamEls,hudClickMs};
      }, modules);
      const shot = path.join(output, `${label}_${width}x${height}_full.png`);
      await page.screenshot({path:shot,fullPage:true});
      target.viewports.push({width,height,...data,pageErrors:errors,consoleErrors,screenshot:shot});
      await page.close();
    }
    report.targets.push(target);
  }
  await browser.close();
  fs.writeFileSync(path.join(output,'j465_audit_report.json'), JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
})().catch(e=>{console.error(e);process.exit(1)});
