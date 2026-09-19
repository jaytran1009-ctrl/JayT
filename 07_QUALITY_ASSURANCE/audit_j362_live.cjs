const fs = require('fs');
const crypto = require('crypto');
const puppeteer = require('puppeteer');
const base = 'https://jayt-production-v3420.vercel.app';
const manifest = require('../08_RELEASE_VAULT/candidates/v3.430.0-j361/candidate_manifest.json');
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
(async () => {
  const endpoints = [];
  for (const [file, meta] of Object.entries(manifest.files)) {
    const url = base + (file === 'index.html' ? '/' : '/' + file);
    const start = Date.now();
    const r = await fetch(url, {cache:'no-store', signal:AbortSignal.timeout(30000)});
    const bytes = Buffer.from(await r.arrayBuffer());
    endpoints.push({url,status:r.status,elapsed_ms:Date.now()-start,sha256:hash(bytes),matches_candidate:hash(bytes)===meta.sha256});
  }
  const browser = await puppeteer.launch({headless:true});
  const viewports = [];
  try {
    for (const width of [1440,768,390]) {
      const page = await browser.newPage();
      const errors = [];
      page.on('pageerror', e=>errors.push(String(e)));
      page.on('console', m=>{if(m.type()==='error') errors.push(m.text());});
      await page.setViewport({width,height:1000});
      await page.goto(base,{waitUntil:'networkidle2'});
      const home = await page.evaluate(()=>({radar:document.querySelectorAll('#home-radar-grid .radar-card').length,overflow:document.documentElement.scrollWidth>innerWidth}));
      await page.evaluate(()=>document.querySelector('button[data-nav="EXPLORE"]').click());
      await page.waitForSelector('#voucher-vault-grid .vault-card');
      const vault = await page.evaluate(()=>({cards:document.querySelectorAll('#voucher-vault-grid .vault-card').length,split:document.querySelectorAll('#voucher-vault-grid .inline-split-widget').length,overflow:document.documentElement.scrollWidth>innerWidth}));
      viewports.push({width,home,vault,errors});
      await page.close();
    }
  } finally { await browser.close(); }
  const pass = endpoints.every(e=>e.status===200&&e.matches_candidate)&&viewports.every(v=>v.home.radar===15&&v.vault.cards===42&&v.vault.split===34&&!v.home.overflow&&!v.vault.overflow&&v.errors.length===0);
  const receipt = {directive:'JAYT-362 / JAYT-362-A1',checked_at_utc:new Date().toISOString(),deployment_id:'dpl_72b2G579GhCPSS7A6AoLHrypQa91',version:'v3.430.0',production_url:base,status:pass?'PASS':'FAIL',endpoints,viewports,rollback_target:'dpl_BiD7syWRkLVgXFjPNjxesMJ2h4mM',scope:'Live served bytes and HOME/Vault DOM checks; earlier candidate functional evidence remains separately archived.'};
  const p = '08_RELEASE_VAULT/JAYT_362_GREAT_GO_LIVE_RECEIPT.json';
  fs.writeFileSync(p,JSON.stringify(receipt,null,2)+'\n');
  fs.writeFileSync(p+'.sha256',hash(fs.readFileSync(p))+'\n');
  console.log(JSON.stringify(receipt,null,2));
  if(!pass) process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
