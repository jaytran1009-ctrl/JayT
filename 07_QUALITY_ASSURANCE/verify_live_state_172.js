/**
 * JAYT-172: RELEASE EVIDENCE TRUTH & LIVE-STATE VERIFICATION
 * 
 * PURPOSE: Verify actual live state of containment 171 deployment.
 * RULES:
 * - Network blocked → INCONCLUSIVE, not PASS
 * - Cannot aggregate PASS if any FAIL or INCONCLUSIVE exists
 * - Must print pass/fail/inconclusive counts and exit code
 * - Must hash all evidence artifacts from disk
 * - No product changes — only verification
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');

function sha256File(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

let passCount = 0;
let failCount = 0;
let inconclusiveCount = 0;
const results = [];

function gate(name, fn) {
  try {
    fn();
    results.push({ name, status: 'PASS', exit: 0 });
    console.log(`  ✅ PASS [exit:0]: ${name}`);
    passCount++;
  } catch (err) {
    results.push({ name, status: 'FAIL', exit: 1, error: err.message });
    console.error(`  ❌ FAIL [exit:1]: ${name}`);
    console.error(`     ${err.message}`);
    failCount++;
  }
}

async function gateNetwork(name, fn) {
  try {
    await fn();
    results.push({ name, status: 'PASS', exit: 0 });
    console.log(`  ✅ PASS [exit:0]: ${name}`);
    passCount++;
  } catch (err) {
    const isNetworkError = err.message && (
      err.message.includes('net::') ||
      err.message.includes('ECONNREFUSED') ||
      err.message.includes('ENOTFOUND') ||
      err.message.includes('timeout') ||
      err.message.includes('Navigation') ||
      err.message.includes('abort') ||
      err.message.includes('fetch failed') ||
      err.message.includes('ETIMEDOUT')
    );
    if (isNetworkError) {
      results.push({ name, status: 'INCONCLUSIVE', exit: 2, error: err.message });
      console.error(`  ⚠️  INCONCLUSIVE [exit:2]: ${name}`);
      console.error(`     Network/browser error: ${err.message}`);
      inconclusiveCount++;
    } else {
      results.push({ name, status: 'FAIL', exit: 1, error: err.message });
      console.error(`  ❌ FAIL [exit:1]: ${name}`);
      console.error(`     ${err.message}`);
      failCount++;
    }
  }
}

async function run() {
  console.log('========================================================================');
  console.log('🔍 JAYT-172: RELEASE EVIDENCE TRUTH & LIVE-STATE VERIFICATION');
  console.log('    Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  // === SOURCE-LEVEL CHECKS (no network needed) ===

  console.log('--- GATE 1: SOURCE CONTAINMENT — 6 cards at TIER_3 ---');
  gate('6 student cards are TIER_3_TRACKED_SOURCE_SIGNAL with zero claims', () => {
    const js = fs.readFileSync(path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js'), 'utf8');
    const marker = 'const ACTIVE_VERIFIED_DEALS_170 = ';
    const idx = js.indexOf(marker);
    assert(idx !== -1, 'ACTIVE_VERIFIED_DEALS_170 must exist');
    let depth = 0, end = idx + marker.length, started = false;
    for (let i = end; i < js.length; i++) {
      if (js[i] === '[') { depth++; started = true; }
      if (js[i] === ']') { depth--; }
      if (started && depth === 0) { end = i + 1; break; }
    }
    const block = js.substring(idx, end);
    const arr = JSON.parse(js.substring(idx + marker.length, end));
    assert.strictEqual(arr.length, 6);
    for (const d of arr) {
      assert.strictEqual(d.tier, 'TIER_3_TRACKED_SOURCE_SIGNAL', d.brand + ' must be TIER_3');
      assert(!d.benefit_summary, d.brand + ' has forbidden benefit_summary');
      assert(!d.terms, d.brand + ' has forbidden terms');
      assert(!d.freshness_window, d.brand + ' has forbidden freshness_window');
    }
    const forbidden = ['29.500', '49.000', '200$', '100$', '10$', 'miễn phí', 'Giảm 50%', 'TIER_1', 'RECURRING_', 'trị giá', '100+'];
    for (const f of forbidden) {
      assert(!block.includes(f), 'Forbidden "' + f + '" in deal block');
    }
  });

  console.log('\n--- GATE 2: SOT/DEPLOY/DEPLOY-PUBLIC PARITY ---');
  gate('JS SHA-256 identical across 3 locations', () => {
    const h1 = sha256File(path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js'));
    const h2 = sha256File(path.join(repoRoot, 'deploy', 'jayt_apex_interface.js'));
    const h3 = sha256File(path.join(repoRoot, 'deploy', 'public', 'jayt_apex_interface.js'));
    assert.strictEqual(h1, h2, 'SOT != deploy/');
    assert.strictEqual(h1, h3, 'SOT != deploy/public/');
    console.log('     SHA-256: ' + h1);
  });

  console.log('\n--- GATE 3: PRODUCTION FEED LOCKED ---');
  gate('deals_feed.json is []', () => {
    const feed = JSON.parse(fs.readFileSync(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json'), 'utf8'));
    assert(Array.isArray(feed) && feed.length === 0);
  });

  console.log('\n--- GATE 4: DISCLOSURE 171 EXISTS ---');
  gate('DISCLOSURE_171_INCIDENT_CONTAINMENT.md present and valid', () => {
    const p = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_171_INCIDENT_CONTAINMENT.md');
    assert(fs.existsSync(p), 'Disclosure file missing');
    const c = fs.readFileSync(p, 'utf8');
    assert(c.includes('TIER_3_TRACKED_SOURCE_SIGNAL'));
    assert(c.includes('append-only'));
  });

  console.log('\n--- GATE 5: SCREENSHOT FILES EXIST WITH HASH ---');
  gate('3 containment screenshots exist on disk with non-zero size', () => {
    const dir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'screenshots_171');
    const expected = [
      'screenshot_171_containment_desktop_light.png',
      'screenshot_171_containment_mobile_light.png',
      'screenshot_171_containment_mobile_dark.png'
    ];
    for (const f of expected) {
      const fp = path.join(dir, f);
      assert(fs.existsSync(fp), f + ' NOT FOUND at ' + fp);
      const stat = fs.statSync(fp);
      assert(stat.size > 10000, f + ' too small: ' + stat.size + ' bytes');
      const hash = sha256File(fp);
      console.log('     ' + f + ' | ' + stat.size + ' bytes | SHA-256: ' + hash.substring(0, 32) + '...');
    }
  });

  // === LIVE NETWORK CHECKS ===

  console.log('\n--- GATE 6: LIVE HTTP RESPONSE ---');
  await gateNetwork('Live HTTP 200 from https://deploy-ten-xi-48.vercel.app/', async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch('https://deploy-ten-xi-48.vercel.app/', {
        signal: controller.signal,
        headers: { 'Cache-Control': 'no-cache' }
      });
      clearTimeout(timeout);
      assert.strictEqual(res.status, 200, 'HTTP ' + res.status);
      const body = await res.text();
      // This is a client-side rendered app. HTML source contains script ref, not rendered text.
      assert(body.includes('jayt_apex_interface.js'), 'Live HTML does not reference jayt_apex_interface.js');
      console.log('     HTTP 200 confirmed. HTML source references jayt_apex_interface.js.');
      console.log('     Note: Version text is JS-rendered; verified via Puppeteer in Gate 7.');
    } catch (err) {
      clearTimeout(timeout);
      throw err;
    }
  });

  console.log('\n--- GATE 7: LIVE PUPPETEER DOM VERIFICATION ---');
  let puppeteer;
  try { puppeteer = require('puppeteer'); } catch (e) { puppeteer = null; }

  if (puppeteer) {
    await gateNetwork('Live DOM contains 5 hubs and version 3.314', async () => {
      const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
      try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('https://deploy-ten-xi-48.vercel.app/', { waitUntil: 'networkidle0', timeout: 20000 });

        const hubCount = await page.$$eval('.jayt-category-hub-pill', els => els.length);
        assert.strictEqual(hubCount, 5, 'Expected 5 hubs, got ' + hubCount);

        const pageText = await page.evaluate(() => document.body.innerText);
        assert(pageText.includes('Daily Deal OS 3.314'), 'Live DOM missing version 3.314');
        assert(!pageText.includes('TIER_1_VERIFIED_PROOF_DEAL'), 'Live DOM still shows TIER_1 label');

        console.log('     Live DOM verified: 5 hubs, version 3.314, no TIER_1 labels.');
      } finally {
        await browser.close();
      }
    });
  } else {
    results.push({ name: 'Live DOM Puppeteer check', status: 'INCONCLUSIVE', exit: 2, error: 'Puppeteer not installed' });
    console.log('  ⚠️  INCONCLUSIVE [exit:2]: Live DOM Puppeteer check — Puppeteer not installed');
    inconclusiveCount++;
  }

  // === SUMMARY ===
  console.log('\n========================================================================');
  console.log('📊 FINAL SUMMARY');
  console.log('========================================================================');
  console.log('  PASS:         ' + passCount);
  console.log('  FAIL:         ' + failCount);
  console.log('  INCONCLUSIVE: ' + inconclusiveCount);
  console.log('  TOTAL:        ' + (passCount + failCount + inconclusiveCount));
  console.log('');

  let finalVerdict;
  if (failCount > 0) {
    finalVerdict = 'LIVE_DEPLOYMENT_UNVERIFIED';
    console.log('❌ FINAL VERDICT: ' + finalVerdict);
    console.log('   Reason: ' + failCount + ' gate(s) FAILED.');
  } else if (inconclusiveCount > 0) {
    finalVerdict = 'LIVE_DEPLOYMENT_UNVERIFIED';
    console.log('⚠️  FINAL VERDICT: ' + finalVerdict);
    console.log('   Reason: ' + inconclusiveCount + ' gate(s) INCONCLUSIVE due to network.');
  } else {
    finalVerdict = 'LIVE_CONTAINMENT_VERIFIED';
    console.log('✅ FINAL VERDICT: ' + finalVerdict);
    console.log('   All gates passed with real evidence.');
  }

  // Write structured result to disk
  const resultObj = {
    directive: 'JAYT-172',
    timestamp: new Date().toISOString(),
    gates: results,
    summary: { pass: passCount, fail: failCount, inconclusive: inconclusiveCount },
    verdict: finalVerdict,
    exit_code: failCount > 0 ? 1 : (inconclusiveCount > 0 ? 2 : 0)
  };
  const resultPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'VERIFICATION_RESULT_172.json');
  fs.writeFileSync(resultPath, JSON.stringify(resultObj, null, 2), 'utf8');
  console.log('\n📄 Verification result saved to: ' + resultPath);

  process.exit(resultObj.exit_code);
}

run().catch(err => {
  console.error('❌ UNHANDLED ERROR:', err.message);
  process.exit(1);
});
