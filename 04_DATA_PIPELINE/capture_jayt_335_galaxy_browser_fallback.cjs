'use strict';

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.resolve(__dirname, '..');
const VAULT = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'batch_15_p2_vault');
const SCOPE = JSON.parse(fs.readFileSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'JAYT_335_BATCH_15_P2_TARGETED_INGRESS_SCOPE.json'), 'utf8'));
const targets = SCOPE.targets.filter(item => item.candidate_id.startsWith('P2O_GALAXY_'));
const run = fs.readdirSync(VAULT, { withFileTypes: true })
  .filter(entry => entry.isDirectory() && entry.name.startsWith('run_'))
  .map(entry => ({ name: entry.name, mtime: fs.statSync(path.join(VAULT, entry.name)).mtimeMs }))
  .sort((a, b) => b.mtime - a.mtime)[0];
if (!run || targets.length !== 2) throw new Error('JAYT-335 Galaxy fallback scope guard failed');
const runDir = path.join(VAULT, run.name);
const sensitive = /cookie|authorization|token|secret|set-cookie/i;

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const results = [];
  try {
    for (const target of targets) {
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36');
      const capturedAt = new Date().toISOString();
      try {
        const response = await page.goto(target.source_url, { waitUntil: 'domcontentloaded', timeout: 45000 });
        if (!response) throw new Error('No main-document response');
        const body = Buffer.from(await response.content());
        const finalUrl = response.url();
        const requested = new URL(target.source_url);
        const final = new URL(finalUrl);
        if (requested.origin !== final.origin) throw new Error(`Cross-origin redirect blocked: ${finalUrl}`);
        const responseHeaders = {};
        for (const [key, value] of Object.entries(response.headers())) {
          if (!sensitive.test(key)) responseHeaders[key.toLowerCase()] = value;
        }
        const base = target.candidate_id;
        fs.writeFileSync(path.join(runDir, `${base}.raw.html`), body);
        fs.writeFileSync(path.join(runDir, `${base}.headers.json`), JSON.stringify({
          captured_at_utc: capturedAt,
          capture_transport: 'PUPPETEER_MAIN_DOCUMENT_RESPONSE_CONTENT',
          requested_url: target.source_url,
          final_url: finalUrl,
          http_status: response.status(),
          response_headers: responseHeaders
        }, null, 2) + '\n');
        results.push({ candidate_id: base, http_status: response.status(), final_url: finalUrl, raw_bytes: body.length });
      } catch (error) {
        results.push({ candidate_id: target.candidate_id, error: error.message });
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
  console.log(JSON.stringify({ run_directory: run.name, results }, null, 2));
  if (results.some(item => item.error)) process.exitCode = 1;
})().catch(error => { console.error(error.stack || error.message); process.exitCode = 1; });
