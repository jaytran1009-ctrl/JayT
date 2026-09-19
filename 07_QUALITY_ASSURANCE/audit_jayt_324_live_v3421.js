// Read-only live verification; writes only a dedicated local audit receipt.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');
const root = path.resolve(__dirname, '..');
const base = 'https://jayt-production-v3420.vercel.app';
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const read = p => fs.readFileSync(path.join(root, p));
const normalize = u => new URL(u).href;
(async () => {
  const result = { receipt_id: 'JAYT_324_V3421_LIVE_POST_DEPLOY_AUDIT', checked_at_utc: new Date().toISOString(), url: base,
    deployment_id: 'dpl_5bzFrqKUzAyrzN5pgP8o4f5VFPgQ', artifacts: [], viewports: [], blockers: [] };
  const manifest = JSON.parse(read('08_RELEASE_VAULT/candidates/v3.421.0/candidate_manifest.json'));
  const registry = JSON.parse(read('08_RELEASE_VAULT/RELEASE_CANDIDATE_v3.421.0_REGISTRY.json'));
  const files = Object.values(manifest.artifacts).map(a => ({ name: path.basename(a.path), expected: a.sha256 }));
  files.push({name: 'candidate_manifest.json', expected: sha(read('08_RELEASE_VAULT/candidates/v3.421.0/candidate_manifest.json'))});
  for (const f of files) {
    const response = await fetch(base + '/' + f.name, { signal: AbortSignal.timeout(20000) });
    const actual = sha(Buffer.from(await response.arrayBuffer()));
    const pass = response.status === 200 && actual === f.expected;
    result.artifacts.push({ ...f, actual, http_status: response.status, pass });
    if (!pass) result.blockers.push('Artifact mismatch: ' + f.name);
  }
  const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']});
  try {
    for (const width of [1440, 768, 390]) {
      const page = await browser.newPage();
      await page.setCacheEnabled(false);
      await page.setViewport({width, height: 900});
      const errors = [], externalRequests = [];
      page.on('pageerror', e => errors.push(String(e)));
      page.on('console', m => {if (m.type() === 'error') errors.push(m.text());});
      page.on('request', req => {const u=req.url(); if (!u.startsWith(base + '/') && !u.startsWith('data:')) externalRequests.push(u);});
      const response = await page.goto(base, {waitUntil:'networkidle0', timeout:30000});
      const dom = await page.evaluate(() => ({
        version: document.body.dataset.ledgerVersion,
        count: document.querySelectorAll('.t2-pilot-card-section').length,
        links: [...document.querySelectorAll('.t2-pilot-card-section a[href^="http"]')].map(a=>a.href),
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
      }));
      const expected = registry.approved_entities.map(e => normalize(e.external_url)).sort();
      const linksMatch = JSON.stringify([...dom.links].sort()) === JSON.stringify(expected);
      const commercialLinks = dom.links.filter(u => /[?&](utm_[^=]*|affiliate|ref|voucher)=|s\.shopee\.vn|go\.isclix/i.test(u));
      const pass = response.status()===200 && dom.version==='v3.421.0' && dom.count===22 && linksMatch && !dom.overflow && !errors.length && !externalRequests.length && !commercialLinks.length;
      result.viewports.push({width, http_status:response.status(), ...dom, linksMatch, errors, externalRequests, commercialLinks, pass});
      if (!pass) result.blockers.push('DOM gate failed: ' + width);
      await page.close();
    }
  } finally { await browser.close(); }
  result.local_deals_feed_empty = JSON.stringify(JSON.parse(read('05_DEAL_AND_AFFILIATE/deals_feed.json'))) === '[]';
  if (!result.local_deals_feed_empty) result.blockers.push('Local deals feed not empty');
  result.pass = result.blockers.length === 0;
  fs.writeFileSync(path.join(__dirname,'runtime_evidence/JAYT_324_V3421_LIVE_POST_DEPLOY_AUDIT.json'),JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify({pass:result.pass,blockers:result.blockers,artifacts:result.artifacts,viewports:result.viewports.map(v=>({width:v.width,count:v.count,version:v.version,pass:v.pass}))},null,2));
  if (!result.pass) process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
