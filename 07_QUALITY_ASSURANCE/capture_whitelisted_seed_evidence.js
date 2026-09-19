#!/usr/bin/env node
'use strict';

// CEO-authorized DA.2 collector: exactly one unauthenticated GET per whitelist URL.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const captures = [
  ['SEED_01_CGV', 'https://www.cgv.vn/default/culture-day'],
  ['SEED_02_METIZ', 'https://metiz.vn/tin-tuc/thu-hai-vui-ve-45k/'],
  ['SEED_03_GALAXY', 'https://www.galaxycine.vn/khuyen-mai/happy-day'],
  ['SEED_04_GITHUB', 'https://education.github.com/pack'],
  ['SEED_05_SPOTIFY', 'https://www.spotify.com/vn-vi/student/'],
  ['SEED_06_DANABUS', 'https://danangbus.vn/'],
  ['SEED_07_SHOPEEFOOD', 'https://shopeefood.vn/da-nang'],
  ['SEED_08_GRABFOOD', 'https://food.grab.com/vn/vi/']
];
const retry02 = process.argv.includes('--retry-02');
const outputDir = path.join(__dirname, 'runtime_evidence', retry02 ? 'raw_captures_retry02' : 'raw_captures');
const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');

async function capture([id, url]) {
  const capturedAtUtc = new Date().toISOString();
  try {
    const response = await fetch(url, {
      method: 'GET', redirect: 'manual', credentials: 'omit',
      headers: { 'User-Agent': 'JayT-Evidence-Audit/1.0', 'Accept': 'text/html,application/json;q=0.9,*/*;q=0.1' }
    });
    const body = Buffer.from(await response.arrayBuffer());
    const headers = Object.fromEntries(response.headers.entries());
    const status = response.status;
    const bodyPath = path.join(outputDir, `${id}.body`);
    fs.writeFileSync(bodyPath, body);
    return { id, url, captured_at_utc: capturedAtUtc, http_status: status, headers, body_file: path.basename(bodyPath), body_sha256: sha256(body), status: status >= 200 && status < 400 ? 'CAPTURED_AWAITING_CEO_AUDIT' : 'QUARANTINE_NO_CLAIM' };
  } catch (error) {
    return { id, url, captured_at_utc: capturedAtUtc, http_status: null, headers: {}, body_file: null, body_sha256: null, status: 'QUARANTINE_NO_CLAIM', error: String(error.message) };
  }
}

(async () => {
  fs.mkdirSync(outputDir, { recursive: true });
  const results = [];
  for (const item of captures) results.push(await capture(item));
  const manifest = { directive: retry02 ? 'JAYT-245 DA Retry #2' : 'JAYT-245 DA.2', execution_id: retry02 ? 'EXECUTION_RETRY_02_20260903' : 'EXECUTION_RETRY_01_20260903', collector: 'single-shot-unauthenticated-get', network_requests: captures.length, generated_at_utc: new Date().toISOString(), results };
  fs.writeFileSync(path.join(outputDir, 'RAW_CAPTURE_MANIFEST.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify(manifest, null, 2));
})();
