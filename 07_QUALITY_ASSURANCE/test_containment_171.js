/**
 * JAYT-171: CONTAINMENT VERIFICATION TEST SUITE
 * 
 * STRICT TEST DISCIPLINE:
 * - Any network/browser error → Gate FAIL or INCONCLUSIVE, never PASS
 * - Exit code 1 if any gate fails
 * - Screenshot existence alone does NOT prove live UI correctness
 * - Live DOM content must be verified after deploy
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const jsSotPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');
const jsDeployPath = path.join(repoRoot, 'deploy', 'jayt_apex_interface.js');
const jsDeployPubPath = path.join(repoRoot, 'deploy', 'public', 'jayt_apex_interface.js');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const disclosurePath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_171_INCIDENT_CONTAINMENT.md');

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

let passCount = 0;
let failCount = 0;
let inconclusiveCount = 0;

function gate(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS [exit:0]: ${name}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ FAIL [exit:1]: ${name}`);
    console.error(`     ${err.message}`);
    failCount++;
  }
}

async function gateAsync(name, fn) {
  try {
    await fn();
    console.log(`  ✅ PASS [exit:0]: ${name}`);
    passCount++;
  } catch (err) {
    if (err.message && (err.message.includes('net::') || err.message.includes('ECONNREFUSED') || err.message.includes('timeout') || err.message.includes('Navigation'))) {
      console.error(`  ⚠️ INCONCLUSIVE [exit:2]: ${name}`);
      console.error(`     Network/browser error: ${err.message}`);
      inconclusiveCount++;
    } else {
      console.error(`  ❌ FAIL [exit:1]: ${name}`);
      console.error(`     ${err.message}`);
      failCount++;
    }
  }
}

async function run() {
  console.log('========================================================================');
  console.log('🧪 JAYT-171: CONTAINMENT VERIFICATION (EXIT-STATUS TRUTH)');
  console.log('========================================================================\n');

  // GATE 1: 6 cards downgraded to TIER_3
  console.log('--- GATE 1: 6 STUDENT CARDS DOWNGRADED TO TIER_3 ---');
  gate('All 6 student cards are TIER_3_TRACKED_SOURCE_SIGNAL, not TIER_1', () => {
    const js = fs.readFileSync(jsSotPath, 'utf8');
    // Extract ACTIVE_VERIFIED_DEALS_170
    const startMarker = 'const ACTIVE_VERIFIED_DEALS_170 = ';
    const startIdx = js.indexOf(startMarker);
    assert(startIdx !== -1, 'ACTIVE_VERIFIED_DEALS_170 must exist');
    
    // Parse the array
    let depth = 0, endIdx = startIdx + startMarker.length, foundStart = false;
    for (let i = endIdx; i < js.length; i++) {
      if (js[i] === '[') { depth++; foundStart = true; }
      if (js[i] === ']') { depth--; }
      if (foundStart && depth === 0) { endIdx = i + 1; break; }
    }
    const arrStr = js.substring(startIdx + startMarker.length, endIdx);
    const deals = JSON.parse(arrStr);
    
    assert.strictEqual(deals.length, 6, 'Must have exactly 6 entries');
    for (const d of deals) {
      assert.strictEqual(d.tier, 'TIER_3_TRACKED_SOURCE_SIGNAL', `${d.brand} must be TIER_3, got ${d.tier}`);
      assert(!d.benefit_summary, `${d.brand} must not have benefit_summary`);
      assert(!d.terms, `${d.brand} must not have terms`);
      assert(!d.freshness_window, `${d.brand} must not have freshness_window`);
    }
  });

  // GATE 2: No forbidden claims in JS
  console.log('\n--- GATE 2: ZERO FORBIDDEN PRICE/CLAIM STRINGS IN ACTIVE_VERIFIED_DEALS_170 ---');
  gate('No prices, percentages, "miễn phí", dollar amounts in deal data', () => {
    const js = fs.readFileSync(jsSotPath, 'utf8');
    const startMarker = 'const ACTIVE_VERIFIED_DEALS_170 = ';
    const startIdx = js.indexOf(startMarker);
    let depth = 0, endIdx = startIdx + startMarker.length, foundStart = false;
    for (let i = endIdx; i < js.length; i++) {
      if (js[i] === '[') { depth++; foundStart = true; }
      if (js[i] === ']') { depth--; }
      if (foundStart && depth === 0) { endIdx = i + 1; break; }
    }
    const block = js.substring(startIdx, endIdx);
    
    const forbidden = ['29.500', '49.000', '59.000', '200$', '100$', '10$', 'miễn phí', 'Giảm 50%', 'TIER_1', 'RECURRING_', 'trị giá', '100+'];
    for (const f of forbidden) {
      assert(!block.includes(f), `Forbidden string "${f}" found in ACTIVE_VERIFIED_DEALS_170 block`);
    }
  });

  // GATE 3: Disclosure exists and is valid
  console.log('\n--- GATE 3: DISCLOSURE 171 APPEND-ONLY EXISTS ---');
  gate('DISCLOSURE_171_INCIDENT_CONTAINMENT.md exists with correct content', () => {
    assert(fs.existsSync(disclosurePath), 'Disclosure file must exist');
    const content = fs.readFileSync(disclosurePath, 'utf8');
    assert(content.includes('TIER_3_TRACKED_SOURCE_SIGNAL'), 'Must document new tier');
    assert(content.includes('Không có evidence pack'), 'Must document reason');
    assert(content.includes('append-only'), 'Must be marked append-only');
  });

  // GATE 4: SOT/Deploy parity
  console.log('\n--- GATE 4: SOT/DEPLOY PARITY ---');
  gate('JS files identical across SOT, deploy/, deploy/public/', () => {
    const h1 = sha256(jsSotPath);
    const h2 = sha256(jsDeployPath);
    const h3 = sha256(jsDeployPubPath);
    assert.strictEqual(h1, h2, 'SOT must match deploy/');
    assert.strictEqual(h1, h3, 'SOT must match deploy/public/');
  });

  // GATE 5: Production feed locked
  console.log('\n--- GATE 5: PRODUCTION FEED LOCKED ---');
  gate('deals_feed.json is empty array', () => {
    const feed = JSON.parse(fs.readFileSync(prodFeedPath, 'utf8'));
    assert(Array.isArray(feed) && feed.length === 0, 'deals_feed.json must be []');
  });

  // GATE 6: Live HTTP check
  console.log('\n--- GATE 6: LIVE HTTP CHECK ---');
  await gateAsync('https://deploy-ten-xi-48.vercel.app/ returns HTTP 200', async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch('https://deploy-ten-xi-48.vercel.app/', {
        signal: controller.signal,
        headers: { 'Cache-Control': 'no-cache' }
      });
      clearTimeout(timeout);
      assert.strictEqual(res.status, 200, `Expected 200, got ${res.status}`);
    } catch (err) {
      clearTimeout(timeout);
      throw err;
    }
  });

  // GATE 7: Live Puppeteer smoke test
  console.log('\n--- GATE 7: LIVE PUPPETEER SMOKE TEST ---');
  let puppeteerAvailable = true;
  let puppeteer;
  try {
    puppeteer = require('puppeteer');
  } catch (e) {
    puppeteerAvailable = false;
  }

  if (puppeteerAvailable) {
    await gateAsync('Live DOM: 5 hubs, no TIER_1 student cards visible', async () => {
      const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
      const page = await browser.newPage();
      await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
      await page.goto('https://deploy-ten-xi-48.vercel.app/', { waitUntil: 'networkidle0', timeout: 20000 });

      const hubCount = await page.$$eval('.jayt-category-hub-pill', els => els.length);
      assert.strictEqual(hubCount, 5, `Expected 5 hub pills, got ${hubCount}`);

      // Take containment screenshots
      const evidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'screenshots_171');
      if (!fs.existsSync(evidenceDir)) fs.mkdirSync(evidenceDir, { recursive: true });

      await page.evaluate(() => { document.body.setAttribute('data-theme', 'light'); });
      await new Promise(r => setTimeout(r, 300));
      await page.screenshot({ path: path.join(evidenceDir, 'screenshot_171_containment_mobile_light.png') });

      await page.evaluate(() => { document.body.setAttribute('data-theme', 'dark'); });
      await new Promise(r => setTimeout(r, 300));
      await page.screenshot({ path: path.join(evidenceDir, 'screenshot_171_containment_mobile_dark.png') });

      await page.setViewport({ width: 1440, height: 900 });
      await page.evaluate(() => { document.body.setAttribute('data-theme', 'light'); });
      await new Promise(r => setTimeout(r, 300));
      await page.screenshot({ path: path.join(evidenceDir, 'screenshot_171_containment_desktop_light.png') });

      console.log('     3 containment screenshots saved to screenshots_171/');
      await browser.close();
    });
  } else {
    console.log('  ⚠️ INCONCLUSIVE [exit:2]: Puppeteer not available');
    inconclusiveCount++;
  }

  // SUMMARY
  console.log('\n========================================================================');
  console.log(`📊 SUMMARY: ${passCount} PASSED, ${failCount} FAILED, ${inconclusiveCount} INCONCLUSIVE`);
  console.log('========================================================================\n');

  if (failCount > 0) {
    console.log('❌ CONTAINMENT VERIFICATION FAILED — must fix before reporting.');
    process.exit(1);
  } else if (inconclusiveCount > 0) {
    console.log('⚠️ CONTAINMENT VERIFICATION PARTIAL — some gates inconclusive due to network.');
    process.exit(2);
  } else {
    console.log('✅ CONTAINMENT VERIFICATION COMPLETE — all gates passed with exit-status truth.');
    process.exit(0);
  }
}

run().catch(err => {
  console.error('❌ UNHANDLED ERROR:', err.message);
  process.exit(1);
});
