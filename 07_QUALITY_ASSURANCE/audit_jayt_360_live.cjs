const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const puppeteer = require('puppeteer');
const base = 'https://jayt-production-v3420.vercel.app';
const out = path.join(__dirname, 'runtime_evidence/JAYT_360_LIVE_RUNTIME_AUDIT_RECEIPT.json');
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const receipt = {directive:'JAYT-360', executor:'Codex independent audit', started_at:new Date().toISOString(), base, endpoints:[], viewports:[], failures:[]};
async function get(url) {
  const start=performance.now();
  const r=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(25000)});
  const b=Buffer.from(await r.arrayBuffer());
  return {url,final_url:r.url,status:r.status,ms:Math.round(performance.now()-start),bytes:b.length,sha256:sha(b),body:b.toString()};
}
function check(ok,label){if(!ok) receipt.failures.push(label);}
(async()=>{
  let browser;
  try {
    for(const p of ['/','/registry.json','/deals_feed.json','/jayt_storefront_sprint_b.js','/styles.css']) {
      const r=await get(base+p); const {body,...meta}=r; receipt.endpoints.push(meta); check(r.status===200,'HTTP '+p);
      if(p==='/registry.json') receipt.registry=JSON.parse(body);
      if(p==='/deals_feed.json') receipt.feed=JSON.parse(body);
    }
    check(receipt.feed.environment==='PRODUCTION_SERVED_VERIFIED','Production environment label');
    const old=JSON.parse(fs.readFileSync(path.join(__dirname,'../08_RELEASE_VAULT/candidates/v3.429.0/deals_feed.json')));
    const current={...receipt.feed,environment:old.environment};
    check(JSON.stringify(current)===JSON.stringify(old),'Feed data invariant');
    check(receipt.registry.approved_civic_entries.length===24&&receipt.registry.approved_commercial_entries.length===63,'87 registry entries');
    browser=await puppeteer.launch({headless:true});
    await browser.defaultBrowserContext().overridePermissions(base,['clipboard-read','clipboard-write']);
    let radar=[];
    for(const width of [1440,768,390]) {
      const page=await browser.newPage(); await page.setViewport({width,height:900});
      const v={width,console_errors:[],runtime_errors:[],routes:[]};
      page.on('console',m=>{if(m.type()==='error')v.console_errors.push(m.text());});
      page.on('pageerror',e=>v.runtime_errors.push(e.message));
      const requests=[];page.on('request',r=>requests.push({url:r.url(),method:r.method(),post:r.postData()}));
      await page.evaluateOnNewDocument(()=>{
        window.__j360gps=0;
        for(const key of ['getCurrentPosition','watchPosition']) {
          const orig=navigator.geolocation[key].bind(navigator.geolocation);
          navigator.geolocation[key]=(...args)=>{window.__j360gps++;return orig(...args);};
        }
      });
      await page.goto(base,{waitUntil:'networkidle2',timeout:60000});
      for(const route of ['HOME','EXPLORE','VOUCHER_HUB','VALUE_RADAR','SAVINGS_CALENDAR','SPLIT_BILL_PRO']) {
        await page.evaluate(r=>document.querySelector('[data-nav="'+r+'"]').click(),route);
        await new Promise(r=>setTimeout(r,150));
        const d=await page.evaluate(()=>{
          const visible=e=>e.getClientRects().length>0&&getComputedStyle(e).visibility!=='hidden';
          const cards=[...document.querySelectorAll('article')].filter(visible);
          return {civic:[...document.querySelectorAll('.t2-pilot-card-section')].filter(visible).map(e=>e.innerText),cards:cards.map(e=>({id:e.dataset.cardId||e.id,text:e.innerText.slice(0,140),class:e.className})),vault:[...document.querySelectorAll('.vault-card')].filter(visible).map(e=>({id:e.dataset.cardId||e.id,copies:[...e.querySelectorAll('.btn-copy-code')].map(b=>b.dataset.code)})),radar:[...document.querySelectorAll('.radar-card')].filter(visible).map(e=>({title:e.querySelector('h2')?.innerText,url:e.querySelector('a')?.href})),overflow:document.documentElement.scrollWidth>innerWidth,inline:[...document.querySelectorAll('.inline-split-select')].map(e=>({id:e.dataset.id,price:Number(e.dataset.bill)}))};
        });
        v.routes.push({route,...d}); check(!d.overflow,`${width} ${route} overflow`);
        if(route==='VOUCHER_HUB') {
          check(d.vault.length===29,`${width} vault count`);
          const codes=receipt.feed.offers.filter(o=>o.is_public_card).map(o=>o.code||o.public_code).filter(Boolean);
          check(d.vault.every(c=>c.copies.every(code=>codes.includes(code))),`${width} Copy code missing from served feed provenance`);
          v.voucher_real_codes=codes.length;
        }
        if(route==='VALUE_RADAR'){radar=d.radar;check(radar.length===15,`${width} radar count`);}
        if(route==='SPLIT_BILL_PRO') {
          const prices=v.routes.find(r=>r.route==='VOUCHER_HUB').inline;
          v.split=[];
          for(const item of prices) {
            const test=await page.evaluate(({price,id})=>{
              document.getElementById('split-bill-amount').value=price;
              document.getElementById('split-people-count').value=3;
              document.getElementById('btn-calculate-split').click();
              const text=document.getElementById('zalo-msg-preview')?.value||'';
              const formatted=Math.floor(price/3).toLocaleString('vi-VN');
              return {id,price,text,pass:text.includes(formatted)&&text.includes(price.toLocaleString('vi-VN'))&&text.includes('3 người')};
            },item);v.split.push(test);
          }
          check(v.split.length===25&&v.split.every(t=>t.pass),`${width} 25 Split Bill amounts`);
          const n=requests.length;
          await page.evaluate(()=>{document.getElementById('split-bill-payer').value='J360_TEST_ACCOUNT_000000';document.getElementById('btn-calculate-split').click();});
          await page.click('#btn-copy-zalo-msg');
          v.privacy=await page.evaluate(async()=>({gps_calls:window.__j360gps,local_storage:Object.keys(localStorage),session_storage:Object.keys(sessionStorage),export_contains_test_payer:document.getElementById('zalo-msg-preview').value.includes('J360_TEST_ACCOUNT_000000'),clipboard:await navigator.clipboard.readText()}));
          v.privacy.requests_during_export=requests.slice(n);
          check(v.privacy.gps_calls===0,`${width} GPS calls`);
          check(!v.privacy.export_contains_test_payer,`${width} Zero-PII absolute: payer exported`);
          check(!requests.slice(n).some(r=>JSON.stringify(r).includes('J360_TEST_ACCOUNT_000000')),`${width} payer network leak`);
          check(v.privacy.local_storage.length===0&&v.privacy.session_storage.length===0,`${width} storage empty`);
        }
      }
      check(v.console_errors.length===0&&v.runtime_errors.length===0,`${width} console/runtime`);
      receipt.viewports.push(v);await page.close();
    }
    receipt.radar_links=await Promise.all(radar.map(async x=>{try{const {body,...r}=await get(x.url);return {...x,...r};}catch(e){return {...x,error:e.message};}}));
    check(receipt.radar_links.length===15&&receipt.radar_links.every(r=>r.status===200),'15 Radar outbound HTTP 200');
    receipt.scope_limits=['No exhaustive heap or server-log inspection; GPS wrappers record calls in tested journeys only.','Clipboard uses real browser permissions; payer marker is synthetic. No message sent to Zalo.','HTTP 200 alone does not prove price freshness or product availability.'];
  }catch(e){receipt.failures.push(e.stack||String(e));}
  finally{if(browser)await browser.close();receipt.finished_at=new Date().toISOString();receipt.status=receipt.failures.length?'FAIL':'PASS';fs.writeFileSync(out,JSON.stringify(receipt,null,2));console.log(JSON.stringify({out,status:receipt.status,failures:receipt.failures},null,2));}
})();
