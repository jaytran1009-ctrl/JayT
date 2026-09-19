const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('puppeteer');
const https = require('https');

const repoRoot = path.resolve(__dirname, '..');
const evidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_187_containment');
if (!fs.existsSync(evidenceDir)) fs.mkdirSync(evidenceDir, { recursive: true });

function sha256Str(str) { return crypto.createHash('sha256').update(str, 'utf8').digest('hex'); }
function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256File(p) { return sha256Buf(fs.readFileSync(p)); }

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const bodyBuf = Buffer.concat(chunks);
        resolve({ status: res.statusCode, body: bodyBuf.toString('utf8'), rawBuf: bodyBuf });
      });
    }).on('error', reject);
  });
}

async function certifyLiveState187() {
  console.log('========================================================================');
  console.log('🛡️ JAYT-187: COMMUNITY SUPPLY BRIDGE & LIVE STATE CERTIFICATION');
  console.log('    ' + new Date().toISOString());
  console.log('========================================================================\n');

  const results = [];
  function record(desc, status, exitCode, details) {
    results.push({ description: desc, status, exitCode, details });
    console.log((status === 'PASS' ? '✅ ' : '❌ ') + status + ' [exit:' + exitCode + ']: ' + desc + '\n     ' + details);
  }

  // --- GATE 1: 3-WAY HASH PARITY (FEED -> MODULE -> LIVE ASSET) ---
  console.log('--- GATE 1: 3-WAY DETERMINISTIC HASH PARITY ---');
  try {
    const feedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generated_verified_deals_187.json');
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

  // --- GATE 2: LIVE DOM RUNTIME BINDING & COMMUNITY INBOX ASSERTIONS ---
  console.log('\n--- GATE 2: LIVE DOM RUNTIME BINDING ASSERTIONS ---');
  let browser = null;
  try {
    browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('https://deploy-ten-xi-48.vercel.app/', { waitUntil: 'networkidle0', timeout: 25000 });

    const bodyText = await page.evaluate(() => document.body.innerText);
    const feedWindowData = await page.evaluate(() => window.JAYT_VERIFIED_DEALS_FEED);

    // Verify window.JAYT_VERIFIED_DEALS_FEED
    assert(feedWindowData, 'window.JAYT_VERIFIED_DEALS_FEED is not defined on live window');
    assert.strictEqual(feedWindowData.total_deals, 3, 'window.JAYT_VERIFIED_DEALS_FEED.total_deals is not 3');
    console.log('     Confirmed window.JAYT_VERIFIED_DEALS_FEED is live with exactly 3 deals.');

    // Check version badge 3.328
    assert(bodyText.includes('Daily Deal OS 3.328') || bodyText.includes('3.328'), 'DOM missing version 3.328');
    console.log('     Confirmed Daily Deal OS 3.328 rendered.');

    // Check Community Proof Inbox rendered
    assert(bodyText.includes('Hộp Thư Báo Deal Thật') || bodyText.includes('Community Proof Inbox'), 'DOM missing Community Proof Inbox');
    console.log('     Confirmed Community Proof Inbox section rendered.');

    // Check Campus Starter Pack rendered
    assert(bodyText.includes('Campus Supply Starter Pack') || bodyText.includes('Cụm Hòa Khánh'), 'DOM missing Campus Starter Pack');
    console.log('     Confirmed Campus Supply Starter Pack (3 Clusters) rendered.');

    // Check 3 Deal Đã Đối Soát dynamically rendered
    assert(bodyText.includes('3 Deal Đã Đối Soát'), 'DOM missing 3 Deal overview');
    console.log('     Confirmed Daily Board dynamically rendered 3 Deal Đã Đối Soát (3/30–50 cơ hội/ngày).');

    record('Live DOM Runtime Binding & Verification', 'PASS', 0, 'Version 3.328, Community Proof Inbox, Campus Starter Pack, exactly 3 deals live');

    // STEP 3: Capture 3 Live Containment Screenshots
    console.log('\n--- GATE 3: THREE LIVE CONTAINMENT SCREENSHOTS ---');
    const screenshots = [];

    // Desktop Light
    await page.setViewport({ width: 1440, height: 900 });
    await page.evaluate(() => document.body.setAttribute('data-theme', 'light'));
    await new Promise(r => setTimeout(r, 500));
    const dPath = path.join(evidenceDir, 'screenshot_187_desktop_light.png');
    await page.screenshot({ path: dPath, fullPage: false });
    screenshots.push({
      file: 'screenshot_187_desktop_light.png',
      viewport: '1440x900',
      theme: 'light',
      size: fs.statSync(dPath).size,
      hash: sha256File(dPath)
    });

    // Mobile Light
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.evaluate(() => document.body.setAttribute('data-theme', 'light'));
    await new Promise(r => setTimeout(r, 500));
    const mLPath = path.join(evidenceDir, 'screenshot_187_mobile_light.png');
    await page.screenshot({ path: mLPath, fullPage: false });
    screenshots.push({
      file: 'screenshot_187_mobile_light.png',
      viewport: '390x844',
      theme: 'light',
      size: fs.statSync(mLPath).size,
      hash: sha256File(mLPath)
    });

    // Mobile Dark
    await page.evaluate(() => document.body.setAttribute('data-theme', 'dark'));
    await new Promise(r => setTimeout(r, 500));
    const mDPath = path.join(evidenceDir, 'screenshot_187_mobile_dark.png');
    await page.screenshot({ path: mDPath, fullPage: false });
    screenshots.push({
      file: 'screenshot_187_mobile_dark.png',
      viewport: '390x844',
      theme: 'dark',
      size: fs.statSync(mDPath).size,
      hash: sha256File(mDPath)
    });

    for (const s of screenshots) {
      console.log('     ' + s.file + ' | ' + s.viewport + ' ' + s.theme + ' | ' + s.size + ' bytes | ' + s.hash.substring(0, 24) + '...');
    }

    record('Three live containment screenshots captured with metadata', 'PASS', 0, screenshots.length + ' screenshots captured');
  } catch (err) {
    record('Live DOM and Screenshot Capture', 'FAIL', 1, err.message);
  } finally {
    if (browser) await browser.close();
  }

  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  console.log('\n========================================================================');
  console.log('📊 SUMMARY: ' + passed + ' PASSED, ' + failed + ' FAILED, 0 INCONCLUSIVE');
  console.log('========================================================================\n');

  const finalOutput = {
    test_suite: 'JAYT-187-LIVE-CERTIFICATION',
    timestamp: new Date().toISOString(),
    overall_status: failed === 0 ? 'PASS' : 'FAIL',
    passed_count: passed,
    failed_count: failed,
    results
  };

  const resPath = path.join(evidenceDir, 'CERTIFICATION_RESULT_187.json');
  fs.writeFileSync(resPath, JSON.stringify(finalOutput, null, 2), 'utf8');
  console.log('📄 Result saved to: ' + resPath);

  if (failed > 0) process.exit(1);
}

certifyLiveState187().catch(err => {
  console.error('Fatal certification error:', err);
  process.exit(1);
});
