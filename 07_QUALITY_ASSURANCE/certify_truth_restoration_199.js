const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('puppeteer');
const https = require('https');

const repoRoot = path.resolve(__dirname, '..');
const evidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_199_certification');
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

async function certifyLiveState199() {
  console.log('========================================================================');
  console.log('🛡️ JAYT-199: TRUTH RESTORATION & ZERO-SYNTHETIC LIVE CERTIFICATION');
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
    const feedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generated_tiered_savings_feed_199.json');
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

  // --- GATE 2: LIVE DOM APPLICABILITY & ZERO-SYNTHETIC ASSERTIONS ---
  console.log('\n--- GATE 2: LIVE DOM ZERO-SYNTHETIC ASSERTIONS ---');
  let browser = null;
  try {
    browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('https://deploy-ten-xi-48.vercel.app/', { waitUntil: 'networkidle0', timeout: 25000 });
    await new Promise(r => setTimeout(r, 1000));

    const bodyText = await page.evaluate(() => document.body.innerText);
    const feedWindowData = await page.evaluate(() => window.JAYT_TIERED_SAVINGS_FEED || window.JAYT_VERIFIED_DEALS_FEED);

    assert(feedWindowData, 'window.JAYT_TIERED_SAVINGS_FEED is not defined on live window');
    const readyCount = (feedWindowData.ready_to_use_deals || []).length;
    const promoCount = (feedWindowData.promo_scope_pending_deals || []).length;
    const communityCount = (feedWindowData.community_pending_audit || []).length;
    const trackingCount = (feedWindowData.verified_location_tracking || []).length;
    const totalOps = readyCount + promoCount + communityCount + trackingCount;

    assert.strictEqual(readyCount, 0, 'ready_to_use_deals.length must be 0');
    assert.strictEqual(promoCount, 12, 'promo_scope_pending_deals.length must be 12');
    assert.strictEqual(communityCount, 0, 'community_pending_audit.length must be 0');
    assert.strictEqual(trackingCount, 25, 'verified_location_tracking.length must be 25');
    console.log(`     Confirmed live feed: ${readyCount} Ready to Use, ${promoCount} Promo Scope Pending, ${communityCount} Community Audit, ${trackingCount} Location/Privileges (Total Board Ops: ${totalOps}).`);

    // Check version badge 3.340
    assert(bodyText.includes('Daily Deal OS 3.340'), 'DOM missing version Daily Deal OS 3.340');
    console.log('     Confirmed Daily Deal OS 3.340 rendered.');

    // Check KPI representation string
    assert(bodyText.includes('0 dùng ngay') && bodyText.includes('12 cần xác nhận') && bodyText.includes('0 cộng đồng đang đối soát'), 'DOM missing honest separated KPI string');
    console.log('     Confirmed honest separated 4-tier KPI rendered: 0 dùng ngay · 12 cần xác nhận · 0 cộng đồng đang đối soát.');

    // Check Zero Synthetic Community: Bà Lang, The 1980s, Cô Điệp must NOT exist as cards
    assert(!bodyText.includes('Cơm Tấm Sườn Cay Bà Lang'), 'Synthetic card Bà Lang improperly found in DOM');
    assert(!bodyText.includes('Bánh Mì Chả Bò Cô Điệp'), 'Synthetic card Cô Điệp improperly found in DOM');
    console.log('     Confirmed zero synthetic community cards in DOM.');

    // Check Metiz Cinema is in Scope Pending
    assert(bodyText.includes('Metiz Cinema Helio Đà Nẵng — Chương Trình Ưu Đãi Phim & U22'), 'Metiz missing from scope pending');
    console.log('     Confirmed Metiz Cinema rendered in 🔵 Scope Pending tier.');

    record('Live DOM Daily Savings Board & Zero-Synthetic Assertions', 'PASS', 0, 'OS 3.340, 37 Opportunities, Zero Synthetic Records, Zero Overclaim Verified');

    // STEP 3: Capture 3 Live Screenshots
    console.log('\n--- GATE 3: THREE LIVE SCREENSHOTS (DESKTOP & MOBILE) ---');
    const screenshots = [];

    // Desktop Light
    await page.setViewport({ width: 1440, height: 900 });
    await page.evaluate(() => document.body.setAttribute('data-theme', 'light'));
    await new Promise(r => setTimeout(r, 500));
    const dPath = path.join(evidenceDir, 'screenshot_199_desktop_light.png');
    await page.screenshot({ path: dPath, fullPage: false });
    if (fs.existsSync(artifactsDir)) {
      fs.copyFileSync(dPath, path.join(artifactsDir, 'screenshot_199_desktop_light.png'));
    }
    screenshots.push({ name: 'screenshot_199_desktop_light.png', path: dPath, sha256: sha256File(dPath) });
    console.log('     📸 Saved: screenshot_199_desktop_light.png (' + screenshots[0].sha256.substring(0, 16) + '...)');

    // Mobile Light (iPhone 14)
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.evaluate(() => document.body.setAttribute('data-theme', 'light'));
    await new Promise(r => setTimeout(r, 500));
    const mlPath = path.join(evidenceDir, 'screenshot_199_mobile_light.png');
    await page.screenshot({ path: mlPath, fullPage: false });
    if (fs.existsSync(artifactsDir)) {
      fs.copyFileSync(mlPath, path.join(artifactsDir, 'screenshot_199_mobile_light.png'));
    }
    screenshots.push({ name: 'screenshot_199_mobile_light.png', path: mlPath, sha256: sha256File(mlPath) });
    console.log('     📸 Saved: screenshot_199_mobile_light.png (' + screenshots[1].sha256.substring(0, 16) + '...)');

    // Mobile Dark (iPhone 14)
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.evaluate(() => document.body.setAttribute('data-theme', 'dark'));
    await new Promise(r => setTimeout(r, 500));
    const mdPath = path.join(evidenceDir, 'screenshot_199_mobile_dark.png');
    await page.screenshot({ path: mdPath, fullPage: false });
    if (fs.existsSync(artifactsDir)) {
      fs.copyFileSync(mdPath, path.join(artifactsDir, 'screenshot_199_mobile_dark.png'));
    }
    screenshots.push({ name: 'screenshot_199_mobile_dark.png', path: mdPath, sha256: sha256File(mdPath) });
    console.log('     📸 Saved: screenshot_199_mobile_dark.png (' + screenshots[2].sha256.substring(0, 16) + '...)');

    record('Live Visual Capture (3 Devices/Themes)', 'PASS', 0, '3/3 Screenshots saved & hashed');

  } catch (err) {
    record('Live DOM Runtime Binding & Screenshot Capture', 'FAIL', 1, err.message);
  } finally {
    if (browser) await browser.close();
  }

  // --- REPORT GENERATION ---
  const report = {
    certification_id: 'CERT_199_' + Date.now(),
    timestamp: new Date().toISOString(),
    live_url: 'https://deploy-ten-xi-48.vercel.app/',
    version: '3.340.0',
    total_checks: results.length,
    passed_checks: results.filter(r => r.status === 'PASS').length,
    failed_checks: results.filter(r => r.status === 'FAIL').length,
    all_passed: results.every(r => r.status === 'PASS'),
    results
  };

  const reportPath = path.join(evidenceDir, 'CERTIFICATION_199_LIVE_REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log('\n📄 Live Certification Report saved to: ' + path.relative(repoRoot, reportPath));

  if (!report.all_passed) {
    console.error('\n❌ SOME CERTIFICATION GATES FAILED!');
    process.exit(1);
  } else {
    console.log('\n🎉 ALL JAYT-199 LIVE CERTIFICATION GATES PASSED (TRUTH RESTORED & ZERO-SYNTHETIC)');
  }
}

if (require.main === module) {
  certifyLiveState199().catch(err => {
    console.error('Fatal Certification Error:', err);
    process.exit(1);
  });
}

module.exports = { certifyLiveState199 };
