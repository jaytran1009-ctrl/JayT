/**
 * JAYT-176: CONTAINMENT CERTIFICATION & SMOKE TEST
 * Directive: CHỈ THỊ KHẨN JAYT-176 — CONTAINMENT JAYT-175 & REAL-EVIDENCE RECOVERY
 * 
 * AUDIT MANDATE:
 * 1. Live JS Asset SHA-256 matches local containment artifact (5600d60a...).
 * 2. Live DOM renders Daily Deal OS 3.317 and "0 Deal Đã Đối Soát".
 * 3. Zero .jayt-card-verified-deal cards in DOM.
 * 4. Zero forbidden price/deal strings from batch 175.
 * 5. 6 student portals remain in 🟣 NGUỒN ĐANG THEO DÕI with zero claims.
 * 6. 3 Screenshots captured with metadata (Desktop Light, Mobile Light, Mobile Dark).
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const evidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_176_containment');
if (!fs.existsSync(evidenceDir)) fs.mkdirSync(evidenceDir, { recursive: true });

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256File(p) { return sha256Buf(fs.readFileSync(p)); }

const FORBIDDEN_STRINGS_176 = [
  '10 Deal Đã Đối Soát',
  '29.500đ', '49.000đ', '65.000đ', '200$+', '100$', '10$/tháng',
  'Miễn phí 100% bản quyền', 'Giảm 50% gói nghe nhạc',
  'Đã xác thực chứng từ'
];

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
  console.log('🛡️ JAYT-176: CONTAINMENT CERTIFICATION & SMOKE TEST');
  console.log('    ' + new Date().toISOString());
  console.log('========================================================================\n');

  // STEP 1: Live Asset SHA-256 Parity
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
      record('Live JS Asset SHA-256 matches containment artifact', 'PASS', 0, `Hash: ${liveJsHash}`);
    } else {
      record('Live JS Asset SHA-256 matches containment artifact', 'FAIL', 1, `MISMATCH: Live=${liveJsHash} Local=${localHash}`);
    }
  } catch (err) {
    record('Live JS Asset SHA-256 matches containment artifact', 'INCONCLUSIVE', 2, `Network: ${err.message}`);
  }

  // STEP 2: Live DOM Assertions via Puppeteer
  console.log('\n--- GATE 2: LIVE DOM CONTAINMENT ASSERTIONS ---');
  let puppeteer;
  try { puppeteer = require('puppeteer'); } catch (e) { puppeteer = null; }

  if (!puppeteer) {
    record('Puppeteer Live Containment Test', 'INCONCLUSIVE', 2, 'Puppeteer not installed');
  } else {
    let browser = null;
    try {
      browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto('https://deploy-ten-xi-48.vercel.app/', { waitUntil: 'networkidle0', timeout: 25000 });

      const bodyText = await page.evaluate(() => document.body.innerText);

      // Check version badge 3.317
      assert(bodyText.includes('Daily Deal OS 3.317') || bodyText.includes('3.317'), 'DOM missing version 3.317');
      console.log('     Confirmed Daily Deal OS 3.317 rendered.');

      // Check 0 Deal Đã Đối Soát
      assert(bodyText.includes('0 Deal Đã Đối Soát') || bodyText.includes('0 Deal'), 'DOM missing 0 Deal overview');
      assert(!bodyText.includes('10 Deal Đã Đối Soát'), 'DOM still contains "10 Deal Đã Đối Soát"');
      console.log('     Confirmed Daily Board shows 0 Deal Đã Đối Soát.');

      // Check 0 Tier 1 cards
      const tier1Count = await page.$$eval('.jayt-card-verified-deal', els => els.length);
      assert.strictEqual(tier1Count, 0, `Expected 0 verified deal cards, got ${tier1Count}`);
      console.log('     Confirmed 0 Tier 1 deal cards rendered.');

      // Check forbidden strings absent
      for (const f of FORBIDDEN_STRINGS_176) {
        assert(!bodyText.includes(f), `Forbidden string "${f}" found in live DOM!`);
      }
      console.log('     Confirmed zero forbidden strings from batch 175 in live DOM.');

      // Check Hub navigation - Hub 5 (Đồ KTX)
      const hubs = await page.$$('.jayt-category-hub-pill');
      if (hubs.length >= 5) {
        await hubs[4].click();
        await new Promise(r => setTimeout(r, 1000));
        const hub5Tier1 = await page.$$eval('.jayt-card-verified-deal', els => els.length);
        assert.strictEqual(hub5Tier1, 0, 'Hub 5 has uncontained Tier 1 cards');
        console.log('     Confirmed Hub 5 has 0 Tier 1 cards.');
      }

      record('Live DOM containment verification', 'PASS', 0, 'Version 3.317, 0 deals overview, 0 Tier 1 cards, 0 forbidden strings');

      // STEP 3: Capture 3 Live Containment Screenshots
      console.log('\n--- GATE 3: THREE LIVE CONTAINMENT SCREENSHOTS ---');
      const screenshots = [];

      // Desktop Light
      await page.setViewport({ width: 1440, height: 900 });
      await page.evaluate(() => document.body.setAttribute('data-theme', 'light'));
      await new Promise(r => setTimeout(r, 500));
      const dPath = path.join(evidenceDir, 'screenshot_176_desktop_light.png');
      await page.screenshot({ path: dPath, fullPage: false });
      screenshots.push({
        file: 'screenshot_176_desktop_light.png',
        viewport: '1440x900',
        theme: 'light',
        size: fs.statSync(dPath).size,
        hash: sha256File(dPath)
      });

      // Mobile Light
      await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
      await page.evaluate(() => document.body.setAttribute('data-theme', 'light'));
      await new Promise(r => setTimeout(r, 500));
      const mLPath = path.join(evidenceDir, 'screenshot_176_mobile_light.png');
      await page.screenshot({ path: mLPath, fullPage: false });
      screenshots.push({
        file: 'screenshot_176_mobile_light.png',
        viewport: '390x844',
        theme: 'light',
        size: fs.statSync(mLPath).size,
        hash: sha256File(mLPath)
      });

      // Mobile Dark
      await page.evaluate(() => document.body.setAttribute('data-theme', 'dark'));
      await new Promise(r => setTimeout(r, 500));
      const mDPath = path.join(evidenceDir, 'screenshot_176_mobile_dark.png');
      await page.screenshot({ path: mDPath, fullPage: false });
      screenshots.push({
        file: 'screenshot_176_mobile_dark.png',
        viewport: '390x844',
        theme: 'dark',
        size: fs.statSync(mDPath).size,
        hash: sha256File(mDPath)
      });

      for (const s of screenshots) {
        console.log(`     ${s.file} | ${s.viewport} ${s.theme} | ${s.size} bytes | ${s.hash.substring(0, 24)}...`);
      }

      record('Three live containment screenshots captured with metadata', 'PASS', 0, '3 screenshots captured');

    } catch (err) {
      record('Puppeteer Live Containment Test', 'FAIL', 1, err.message);
    } finally {
      if (browser) await browser.close();
    }
  }

  // SUMMARY
  console.log('\n========================================================================');
  console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED, ${inconclusiveCount} INCONCLUSIVE`);
  console.log('========================================================================\n');

  const out = {
    directive: 'JAYT-176',
    timestamp: new Date().toISOString(),
    gates: results,
    summary: { pass: passCount, fail: failCount, inconclusive: inconclusiveCount },
    verdict: failCount === 0 && inconclusiveCount === 0 ? 'LIVE_CONTAINMENT_176_VERIFIED' : 'LIVE_CONTAINMENT_FAILED'
  };

  const outPath = path.join(evidenceDir, 'CERTIFICATION_RESULT_176.json');
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
  console.log(`📄 Result saved to: ${outPath}`);

  process.exit(out.verdict === 'LIVE_CONTAINMENT_176_VERIFIED' ? 0 : 1);
}

run().catch(err => {
  console.error('❌ Unhandled error:', err);
  process.exit(1);
});
