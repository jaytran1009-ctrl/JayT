const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('puppeteer');
const https = require('https');

const repoRoot = path.resolve(__dirname, '..');
const evidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_195_harvest');
const artifactsDir = 'C:\\Users\\tritr\\.gemini\\antigravity\\brain\\d5cf4def-63d1-4b27-a09f-44b0738094ea';

if (!fs.existsSync(evidenceDir)) fs.mkdirSync(evidenceDir, { recursive: true });

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256File(p) { return sha256Buf(fs.readFileSync(p)); }

function fetchUrl(url, maxRetries = 3) {
  return new Promise((resolve, reject) => {
    function attempt(n) {
      https.get(url, (res) => {
        let chunks = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => {
          const bodyBuf = Buffer.concat(chunks);
          resolve({ status: res.statusCode, body: bodyBuf.toString('utf8'), rawBuf: bodyBuf });
        });
      }).on('error', (err) => {
        if (n > 1) {
          setTimeout(() => attempt(n - 1), 1000);
        } else {
          reject(err);
        }
      });
    }
    attempt(maxRetries);
  });
}

async function certifyLiveState195() {
  console.log('========================================================================');
  console.log('🛡️ JAYT-195: SCALE-UP BATCH & LIVE CERTIFICATION (10 CONFIRMED DEALS)');
  console.log('    ' + new Date().toISOString());
  console.log('========================================================================\n');

  const results = [];
  function record(desc, status, exitCode, details) {
    results.push({ description: desc, status, exitCode, details });
    console.log((status === 'PASS' ? '✅ ' : '❌ ') + status + ' [exit:' + exitCode + ']: ' + desc + '\n     ' + details);
  }

  // --- GATE 1: 3-WAY DETERMINISTIC HASH PARITY ---
  console.log('--- GATE 1: 3-WAY DETERMINISTIC HASH PARITY ---');
  try {
    const feedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generated_tiered_savings_feed_195.json');
    const localModulePath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_verified_deals_module.js');
    const localJsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');

    const feedHash = sha256File(feedPath);
    const localModuleHash = sha256File(localModulePath);
    const localJsHash = sha256File(localJsPath);

    // Fetch Live Module with cache buster
    const liveModuleRes = await fetchUrl('https://deploy-ten-xi-48.vercel.app/jayt_verified_deals_module.js?cb=' + Date.now() + Math.random());
    assert.strictEqual(liveModuleRes.status, 200, 'Live Module returned HTTP ' + liveModuleRes.status);
    const liveModuleHash = sha256Buf(liveModuleRes.rawBuf);

    // Fetch Live Main JS with cache buster
    const liveJsRes = await fetchUrl('https://deploy-ten-xi-48.vercel.app/jayt_apex_interface.js?cb=' + Date.now() + Math.random());
    assert.strictEqual(liveJsRes.status, 200, 'Live Main JS returned HTTP ' + liveJsRes.status);
    const liveJsHash = sha256Buf(liveJsRes.rawBuf);

    console.log('     Input Feed JSON SHA:       ' + feedHash);
    console.log('     Local Data Module SHA:     ' + localModuleHash);
    console.log('     Live Data Module SHA:      ' + liveModuleHash);
    console.log('     Local Main Interface SHA:  ' + localJsHash);
    console.log('     Live Main Interface SHA:   ' + liveJsHash);

    assert.strictEqual(liveModuleHash, localModuleHash, 'Live Module hash mismatch with SOT module');
    assert.strictEqual(liveJsHash, localJsHash, 'Live Main JS hash mismatch with SOT JS');
    assert(liveModuleRes.body.includes(feedHash), 'Live Module body does not reference input feed SHA-256');

    record('3-Way Deterministic Hash Parity (Feed -> Module -> Live)', 'PASS', 0, 'Feed: ' + feedHash.substring(0, 16) + '... | Module: ' + liveModuleHash.substring(0, 16) + '...');
  } catch (err) {
    record('3-Way Deterministic Hash Parity', 'FAIL', 1, err.message);
  }

  // --- GATE 2: LIVE DOM APPLICABILITY & SCALE-UP ASSERTIONS ---
  console.log('\n--- GATE 2: LIVE DOM APPLICABILITY & SCALE-UP ASSERTIONS ---');
  let browser = null;
  try {
    browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('https://deploy-ten-xi-48.vercel.app/', { waitUntil: 'networkidle0', timeout: 25000 });

    const bodyText = await page.evaluate(() => document.body.innerText);
    const feedWindowData = await page.evaluate(() => window.JAYT_TIERED_SAVINGS_FEED || window.JAYT_VERIFIED_DEALS_FEED);

    // Verify window feed structure
    assert(feedWindowData, 'window.JAYT_TIERED_SAVINGS_FEED is not defined on live window');
    const confirmedCount = (feedWindowData.local_confirmed_actionable_deals || []).length;
    const scopePendingCount = (feedWindowData.offer_with_danang_branch_scope_pending || []).length;
    const studentPrivsCount = (feedWindowData.student_long_term_privileges || []).length;
    assert.strictEqual(confirmedCount, 10, 'local_confirmed_actionable_deals.length is not 10');
    assert.strictEqual(scopePendingCount, 3, 'offer_with_danang_branch_scope_pending.length is not 3');
    assert.strictEqual(studentPrivsCount, 10, 'student_long_term_privileges.length is not 10');
    console.log('     Confirmed live feed: 10 Local Confirmed Deals (Scale Target Met!), 3 Scope Pending Deals, 10 Student Privileges.');

    // Check version badge 3.336
    assert(bodyText.includes('Daily Deal OS 3.336'), 'DOM missing version Daily Deal OS 3.336');
    console.log('     Confirmed Daily Deal OS 3.336 rendered.');

    // Check Khối 1: KPI 10/30-50 Deal Hành Động Xác Nhận Tại Đà Nẵng
    assert(bodyText.includes('10/30–50') || bodyText.includes('10 Deal Đã Đối Soát'), 'DOM missing KPI 10/30-50 Deal Hành Động Xác Nhận');
    console.log('     Confirmed KPI 10/30-50 rendered.');

    // Check Distinct Status Badges and Da Nang Brands
    assert(bodyText.includes('Metiz Cinema'), 'DOM missing Metiz Cinema');
    assert(bodyText.includes('Starlight Cinema'), 'DOM missing Starlight Cinema');
    assert(bodyText.includes('DanaBus'), 'DOM missing DanaBus');
    assert(bodyText.includes('Ga Đà Nẵng'), 'DOM missing Ga Đà Nẵng');
    assert(bodyText.includes('Jollibee'), 'DOM missing Jollibee');
    assert(bodyText.includes('Mikazuki'), 'DOM missing Mikazuki');
    console.log('     Confirmed all 6 verified Da Nang local brands rendered in DOM.');

    record('Live DOM Scale-Up & 10 Confirmed Deals Binding', 'PASS', 0, 'OS 3.336, 10 Confirmed Deals, 3 Scope Pending Deals, 10 Student Privileges, Verified Scale-Up Target Met');

    // STEP 3: Capture 3 Live Screenshots
    console.log('\n--- GATE 3: THREE LIVE SCREENSHOTS (DESKTOP & MOBILE) ---');
    const screenshots = [];

    // Desktop Light
    await page.setViewport({ width: 1440, height: 900 });
    await page.evaluate(() => document.body.setAttribute('data-theme', 'light'));
    await new Promise(r => setTimeout(r, 500));
    const dPath = path.join(evidenceDir, 'screenshot_195_desktop_light.png');
    await page.screenshot({ path: dPath, fullPage: false });
    if (fs.existsSync(artifactsDir)) {
      fs.copyFileSync(dPath, path.join(artifactsDir, 'screenshot_195_desktop_light.png'));
    }
    screenshots.push({ name: 'screenshot_195_desktop_light.png', path: dPath, sha256: sha256File(dPath) });
    console.log('     📸 Saved: screenshot_195_desktop_light.png (' + screenshots[0].sha256.substring(0, 16) + '...)');

    // Mobile Light (iPhone 14)
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.evaluate(() => document.body.setAttribute('data-theme', 'light'));
    await new Promise(r => setTimeout(r, 500));
    const mlPath = path.join(evidenceDir, 'screenshot_195_mobile_light.png');
    await page.screenshot({ path: mlPath, fullPage: false });
    if (fs.existsSync(artifactsDir)) {
      fs.copyFileSync(mlPath, path.join(artifactsDir, 'screenshot_195_mobile_light.png'));
    }
    screenshots.push({ name: 'screenshot_195_mobile_light.png', path: mlPath, sha256: sha256File(mlPath) });
    console.log('     📸 Saved: screenshot_195_mobile_light.png (' + screenshots[1].sha256.substring(0, 16) + '...)');

    // Mobile Dark (iPhone 14)
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.evaluate(() => document.body.setAttribute('data-theme', 'dark'));
    await new Promise(r => setTimeout(r, 500));
    const mdPath = path.join(evidenceDir, 'screenshot_195_mobile_dark.png');
    await page.screenshot({ path: mdPath, fullPage: false });
    if (fs.existsSync(artifactsDir)) {
      fs.copyFileSync(mdPath, path.join(artifactsDir, 'screenshot_195_mobile_dark.png'));
    }
    screenshots.push({ name: 'screenshot_195_mobile_dark.png', path: mdPath, sha256: sha256File(mdPath) });
    console.log('     📸 Saved: screenshot_195_mobile_dark.png (' + screenshots[2].sha256.substring(0, 16) + '...)');

    record('Live Containment Visual Capture (3 Devices/Themes)', 'PASS', 0, '3/3 Screenshots saved & hashed');

  } catch (err) {
    record('Live DOM Runtime Binding & Screenshot Capture', 'FAIL', 1, err.message);
  } finally {
    if (browser) await browser.close();
  }

  // --- REPORT GENERATION ---
  const report = {
    certification_id: 'CERT_195_' + Date.now(),
    timestamp: new Date().toISOString(),
    live_url: 'https://deploy-ten-xi-48.vercel.app/',
    version: '3.336.0',
    total_checks: results.length,
    passed_checks: results.filter(r => r.status === 'PASS').length,
    failed_checks: results.filter(r => r.status === 'FAIL').length,
    all_passed: results.every(r => r.status === 'PASS'),
    results
  };

  const reportPath = path.join(evidenceDir, 'CERTIFICATION_195_LIVE_REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log('\n📄 Live Certification Report saved to: ' + path.relative(repoRoot, reportPath));

  if (!report.all_passed) {
    console.error('\n❌ SOME CERTIFICATION GATES FAILED!');
    process.exit(1);
  } else {
    console.log('\n🎉 ALL JAYT-195 LIVE CERTIFICATION GATES PASSED (10 CONFIRMED DEALS SCALE-UP STATE)');
  }
}

if (require.main === module) {
  certifyLiveState195().catch(err => {
    console.error('Fatal Certification Error:', err);
    process.exit(1);
  });
}

module.exports = { certifyLiveState195 };
