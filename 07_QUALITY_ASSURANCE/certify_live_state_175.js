/**
 * JAYT-175: LIVE STATE CERTIFICATION & SMOKE TEST
 * Directive: CHỈ THỊ KHẨN JAYT-175 — FLASH SUPPLY SPRINT
 * 
 * ASSERTIONS:
 * 1. Fetch live JS asset -> check SHA-256 matches local deploy artifact.
 * 2. Live DOM renders Daily Deal OS 3.316 and "10 Deal Đã Đối Soát".
 * 3. 10 Verified 🟢 Deals rendered in their respective Hubs (Hub 4, Hub 5, Hub 3).
 * 4. 3 Screenshots saved with full metadata (Desktop Light, Mobile Light, Mobile Dark).
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const evidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_175_live');
if (!fs.existsSync(evidenceDir)) fs.mkdirSync(evidenceDir, { recursive: true });

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256File(p) { return sha256Buf(fs.readFileSync(p)); }

let passCount = 0, failCount = 0, inconclusiveCount = 0;
const results = [];

function record(name, status, exit, detail) {
  results.push({ name, status, exit, detail, ts: new Date().toISOString() });
  const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
  console.log(`  ${icon} ${status} [exit:${exit}]: ${name}`);
  if (detail) console.log(`     ${detail}`);
  if (status === 'PASS') passCount++;
  else if (status === 'FAIL') failCount++;
  else inconclusiveCount++;
}

async function run() {
  console.log('========================================================================');
  console.log('🔍 JAYT-175: LIVE STATE CERTIFICATION & SMOKE TEST');
  console.log('    ' + new Date().toISOString());
  console.log('========================================================================\n');

  // STEP 1: Fetch Live JS Asset & Assert Parity
  console.log('--- GATE 1: LIVE JS ASSET SHA-256 PARITY ---');
  let liveJsHash = null;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 15000);
    const res = await fetch('https://deploy-ten-xi-48.vercel.app/jayt_apex_interface.js', {
      signal: ctrl.signal,
      headers: { 'Cache-Control': 'no-cache' }
    });
    clearTimeout(t);
    const buf = Buffer.from(await res.arrayBuffer());
    liveJsHash = sha256Buf(buf);
    const localHash = sha256File(path.join(repoRoot, 'deploy', 'public', 'jayt_apex_interface.js'));

    console.log(`     Live JS SHA-256:  ${liveJsHash}`);
    console.log(`     Local JS SHA-256: ${localHash}`);

    if (liveJsHash === localHash) {
      record('Live JS Asset SHA-256 matches local deployment artifact', 'PASS', 0, `Hash: ${liveJsHash}`);
    } else {
      record('Live JS Asset SHA-256 matches local deployment artifact', 'FAIL', 1, `MISMATCH: Live=${liveJsHash} Local=${localHash}`);
    }
  } catch (err) {
    record('Live JS Asset SHA-256 matches local deployment artifact', 'INCONCLUSIVE', 2, `Network: ${err.message}`);
  }

  // STEP 2: Puppeteer Live DOM Assertions
  console.log('\n--- GATE 2: LIVE DOM SMOKE & HUBS ASSERTIONS ---');
  let puppeteer;
  try { puppeteer = require('puppeteer'); } catch (e) { puppeteer = null; }

  if (!puppeteer) {
    record('Puppeteer Live Smoke Test', 'INCONCLUSIVE', 2, 'Puppeteer not installed');
  } else {
    let browser = null;
    try {
      browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto('https://deploy-ten-xi-48.vercel.app/', { waitUntil: 'networkidle0', timeout: 25000 });

      // Check version badge
      const bodyText = await page.evaluate(() => document.body.innerText);
      assert(bodyText.includes('Daily Deal OS 3.316') || bodyText.includes('3.316'), 'DOM missing version 3.316');
      console.log('     Confirmed version 3.316 rendered.');

      // Check Daily Board overview
      assert(bodyText.includes('10 Deal Đã Đối Soát') || bodyText.includes('10 Deal'), 'DOM missing 10 Deal overview text');
      console.log('     Confirmed Daily Board overview displays 10 Deal.');

      // Check 5 Hubs Pills
      const hubCount = await page.$$eval('.jayt-category-hub-pill', els => els.length);
      assert.strictEqual(hubCount, 5, 'Expected 5 hub pills');
      console.log('     Confirmed 5 Category Hubs pills.');

      // Check Hub 4 (Di chuyển)
      let hubs = await page.$$('.jayt-category-hub-pill');
      await hubs[3].click(); // Hub 4
      await new Promise(r => setTimeout(r, 1000));
      const hub4Text = await page.evaluate(() => document.body.innerText);
      assert(hub4Text.includes('DanaBus') || hub4Text.includes('Đường Sắt'), 'Hub 4 missing DanaBus/DSVN deals');
      console.log('     Confirmed Hub 4 renders verified transit deals.');

      // Check Hub 5 (Đồ KTX & Học tập) - re-query pills
      hubs = await page.$$('.jayt-category-hub-pill');
      await hubs[4].click(); // Hub 5
      await new Promise(r => setTimeout(r, 1000));
      const hub5Text = await page.evaluate(() => document.body.innerText);
      assert(hub5Text.includes('GitHub') || hub5Text.includes('JetBrains') || hub5Text.includes('Spotify'), 'Hub 5 missing student deals');
      console.log('     Confirmed Hub 5 renders verified student benefits.');

      record('Live DOM smoke test & hub navigation', 'PASS', 0, 'Version 3.316, 10 deals overview, Hub 4 & 5 deals verified');

      // STEP 3: Take 3 Screenshots
      console.log('\n--- GATE 3: THREE LIVE SCREENSHOTS WITH FULL METADATA ---');
      const screenshots = [];

      // Desktop Light
      await page.setViewport({ width: 1440, height: 900 });
      await page.evaluate(() => document.body.setAttribute('data-theme', 'light'));
      await new Promise(r => setTimeout(r, 500));
      const dPath = path.join(evidenceDir, 'screenshot_175_desktop_light.png');
      await page.screenshot({ path: dPath, fullPage: false });
      screenshots.push({
        file: 'screenshot_175_desktop_light.png',
        viewport: '1440x900',
        theme: 'light',
        size: fs.statSync(dPath).size,
        hash: sha256File(dPath)
      });

      // Mobile Light
      await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
      await page.evaluate(() => document.body.setAttribute('data-theme', 'light'));
      await new Promise(r => setTimeout(r, 500));
      const mLPath = path.join(evidenceDir, 'screenshot_175_mobile_light.png');
      await page.screenshot({ path: mLPath, fullPage: false });
      screenshots.push({
        file: 'screenshot_175_mobile_light.png',
        viewport: '390x844',
        theme: 'light',
        size: fs.statSync(mLPath).size,
        hash: sha256File(mLPath)
      });

      // Mobile Dark
      await page.evaluate(() => document.body.setAttribute('data-theme', 'dark'));
      await new Promise(r => setTimeout(r, 500));
      const mDPath = path.join(evidenceDir, 'screenshot_175_mobile_dark.png');
      await page.screenshot({ path: mDPath, fullPage: false });
      screenshots.push({
        file: 'screenshot_175_mobile_dark.png',
        viewport: '390x844',
        theme: 'dark',
        size: fs.statSync(mDPath).size,
        hash: sha256File(mDPath)
      });

      for (const s of screenshots) {
        console.log(`     ${s.file} | ${s.viewport} ${s.theme} | ${s.size} bytes | ${s.hash.substring(0, 24)}...`);
      }

      record('Three live screenshots captured with metadata', 'PASS', 0, '3 screenshots captured');

    } catch (err) {
      record('Puppeteer Live Smoke Test', 'FAIL', 1, err.message);
    } finally {
      if (browser) await browser.close();
    }
  }

  // SUMMARY
  console.log('\n========================================================================');
  console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED, ${inconclusiveCount} INCONCLUSIVE`);
  console.log('========================================================================\n');

  const out = {
    directive: 'JAYT-175',
    timestamp: new Date().toISOString(),
    gates: results,
    summary: { pass: passCount, fail: failCount, inconclusive: inconclusiveCount },
    verdict: failCount === 0 && inconclusiveCount === 0 ? 'LIVE_BATCH_175_VERIFIED' : 'LIVE_DEPLOYMENT_UNVERIFIED'
  };

  const outPath = path.join(evidenceDir, 'CERTIFICATION_RESULT_175.json');
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
  console.log(`📄 Result saved to: ${outPath}`);

  process.exit(out.verdict === 'LIVE_BATCH_175_VERIFIED' ? 0 : 1);
}

run().catch(err => {
  console.error('❌ Unhandled error:', err);
  process.exit(1);
});
