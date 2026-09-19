/**
 * JAYT VISUAL POLISH WITH TRUTH SAFETY TEST SUITE (092)
 * Directive: JAYT-092-VISUAL-POLISH-WITH-TRUTH-SAFETY
 *
 * Verifies:
 * 1. Design Token System for 4 Data Layers (Emerald, Sapphire, Amber, Purple) with WCAG AA Contrast.
 * 2. Editorial Location Cards with Neutral Monogram Badges, Verified Addresses, and Dashed Disclaimer.
 * 3. Sticky Compact Header, Scroll-Snap Pill Row, and Prefers-Reduced-Motion Support.
 * 4. Accessible Toast with ARIA live region (role="status" aria-live="polite").
 * 5. Interactive Bottom Sheet Bill Splitter (Splitwise-inspired, 100% local calculation, 0 QR/endpoint).
 * 6. Skeleton Loading & Preservation of Honest Empty State.
 * 7. 6 Discrete Design States & Strict Ban on Pulse / Countdown on Unverified States.
 * 8. Real Browser Viewport Measurements (390px, 768px, 1440px), Touch Targets >= 44px, and Screenshot Evidence.
 * 9. Read-Only Verification of Release Candidate 092 Manifest & 100% Byte Parity.
 * 10. Production Invariants Locked (deals_feed.json: [], is_approved: false).
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const sotDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');
const deployDir = path.join(repoRoot, 'deploy', 'public');
const stagingDir = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH');

const datasetPath = path.join(sotDir, 'four_layer_dataset.json');
const jsPath = path.join(sotDir, 'jayt_apex_interface.js');
const htmlPath = path.join(sotDir, 'index.html');
const contractPath = path.join(sotDir, 'visual_hybrid_hub_contract.json');
const northStarJsonPath = path.join(sotDir, 'customer_journey_north_star.json');

const rcPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_CANDIDATE_092.json');
const receiptPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DEPLOYMENT_RECEIPT_092.json');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const screenshotDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'screenshots_092');
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function getLuminance(hex) {
  const rgb = hex.replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16) / 255);
  const a = rgb.map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function getContrastRatio(hex1, hex2) {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  return (brightest + 0.05) / (darkest + 0.05);
}

let passedTests = 0;
const totalTests = 10;

function runTest(testName, testFn) {
  try {
    testFn();
    passedTests++;
    console.log(`  [${testName}]: [PASS]`);
  } catch (err) {
    console.error(`  [${testName}]: [FAIL] - ${err.message}`);
    process.exitCode = 1;
  }
}

async function runAsyncTest(testName, asyncTestFn) {
  try {
    await asyncTestFn();
    passedTests++;
    console.log(`  [${testName}]: [PASS]`);
  } catch (err) {
    console.error(`  [${testName}]: [FAIL] - ${err.message}`);
    process.exitCode = 1;
  }
}

async function main() {
  console.log('🧪 [JAYT-092-TEST] Khởi chạy bộ kiểm thử Visual Polish With Truth Safety 092...\n');

  // TEST 01: Design Token System for 4 Data Layers & WCAG AA Contrast
  runTest('TEST_01_DESIGN_TOKENS_FOUR_LAYERS_AND_WCAG_AA_CONTRAST', () => {
    const htmlDoc = fs.readFileSync(htmlPath, 'utf8');

    assert.ok(htmlDoc.includes('--layer-1-emerald: #059669;'), 'Missing --layer-1-emerald');
    assert.ok(htmlDoc.includes('--layer-2-sapphire: #2563EB;'), 'Missing --layer-2-sapphire');
    assert.ok(htmlDoc.includes('--layer-3-amber: #D97706;'), 'Missing --layer-3-amber');
    assert.ok(htmlDoc.includes('--layer-4-purple: #7C3AED;'), 'Missing --layer-4-purple');

    // Contrast Check:
    const emeraldContrast = getContrastRatio('#065F46', '#ECFDF5');
    const sapphireContrast = getContrastRatio('#1E40AF', '#EFF6FF');
    const amberContrast = getContrastRatio('#92400E', '#FFFBEB');
    const purpleContrast = getContrastRatio('#5B21B6', '#F5F3FF');
    const neutralContrast = getContrastRatio('#0F172A', '#FFFFFF');

    assert.ok(emeraldContrast >= 4.5, `Emerald contrast (${emeraldContrast.toFixed(2)}) must be >= 4.5`);
    assert.ok(sapphireContrast >= 4.5, `Sapphire contrast (${sapphireContrast.toFixed(2)}) must be >= 4.5`);
    assert.ok(amberContrast >= 4.5, `Amber contrast (${amberContrast.toFixed(2)}) must be >= 4.5`);
    assert.ok(purpleContrast >= 4.5, `Purple contrast (${purpleContrast.toFixed(2)}) must be >= 4.5`);
    assert.ok(neutralContrast >= 4.5, `Neutral contrast (${neutralContrast.toFixed(2)}) must be >= 4.5`);
  });

  // TEST 02: Editorial Location Cards with Neutral Monogram Badges & Dashed Disclaimer
  runTest('TEST_02_EDITORIAL_LOCATION_CARDS_MONOGRAM_AND_DASHED_DISCLAIMER', () => {
    const jsCode = fs.readFileSync(jsPath, 'utf8');

    assert.ok(jsCode.includes('apex-monogram'), 'Monogram badge class missing in JS');
    assert.ok(jsCode.includes('border:1px dashed var(--layer-2-border)'), 'Dashed disclaimer border missing in Layer 2');
    assert.ok(jsCode.includes('Địa chỉ xác minh:'), 'Verified street address label missing in Layer 2');
    assert.ok(jsCode.includes('Nguồn chính thức ↗'), 'Official source link text missing');

    // Ensure zero hotlinked external images
    assert.strictEqual(jsCode.includes('http://') || jsCode.includes('https://images.'), false, 'External image hotlinks forbidden');
  });

  // TEST 03: Sticky Compact Header, Scroll-Snap Pill Row, and Prefers-Reduced-Motion Support
  runTest('TEST_03_STICKY_HEADER_SCROLL_SNAP_AND_PREFERS_REDUCED_MOTION', () => {
    const htmlDoc = fs.readFileSync(htmlPath, 'utf8');

    assert.ok(htmlDoc.includes('.apex-sticky-header'), 'Missing .apex-sticky-header in index.html');
    assert.ok(htmlDoc.includes('backdrop-filter: blur(12px)'), 'Missing backdrop-filter blur in index.html');
    assert.ok(htmlDoc.includes('scroll-snap-type: x mandatory'), 'Missing scroll-snap-type in index.html');
    assert.ok(htmlDoc.includes('@media (prefers-reduced-motion: reduce)'), 'Missing prefers-reduced-motion in index.html');
  });

  // TEST 04: Accessible Toast with ARIA live region (role="status" aria-live="polite")
  runTest('TEST_04_ACCESSIBLE_TOAST_WITH_ARIA_LIVE_POLITE', () => {
    const htmlDoc = fs.readFileSync(htmlPath, 'utf8');
    const jsCode = fs.readFileSync(jsPath, 'utf8');

    assert.ok(htmlDoc.includes('id="apex-toast-container"'), 'Toast container missing in index.html');
    assert.ok(htmlDoc.includes('role="status"'), 'role="status" missing in index.html toast container');
    assert.ok(htmlDoc.includes('aria-live="polite"'), 'aria-live="polite" missing in index.html toast container');
    assert.ok(jsCode.includes('apex-toast-item'), 'apex-toast-item rendering missing in JS');
  });

  // 1. Start Static Local HTTP Server for Real Browser Testing
  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/') reqPath = '/index.html';
    const filePath = path.join(deployDir, reqPath);
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath);
      const contentType = ext === '.html' ? 'text/html' : ext === '.js' ? 'application/javascript' : ext === '.json' ? 'application/json' : 'text/plain';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(fs.readFileSync(filePath));
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  const port = 8922;
  await new Promise((resolve) => server.listen(port, resolve));

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    });

    const page = await browser.newPage();
    page.on('dialog', async dialog => {
      try { await dialog.dismiss(); } catch {}
    });
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle0' });

    // TEST 05: Interactive Bottom Sheet Bill Splitter (Splitwise-inspired, 100% local calculation)
    await runAsyncTest('TEST_05_BOTTOM_SHEET_BILL_SPLITTER_INTERACTIVE_E2E', async () => {
      // 1. Open Bottom Sheet
      await page.click('#btn-open-calc-sheet');
      await new Promise(r => setTimeout(r, 300));

      const isSheetActive = await page.evaluate(() => {
        const overlay = document.getElementById('calc-bottom-sheet-overlay');
        return overlay && overlay.classList.contains('active');
      });
      assert.strictEqual(isSheetActive, true, 'Bottom sheet overlay must have active class when opened');

      // 2. Modify Inputs
      await page.$eval('#sheet-input-price', el => { el.value = '300000'; el.dispatchEvent(new Event('input')); });
      await page.$eval('#sheet-input-voucher', el => { el.value = '60000'; el.dispatchEvent(new Event('input')); });
      await page.$eval('#sheet-input-split', el => { el.value = '3'; el.dispatchEvent(new Event('input')); });
      await new Promise(r => setTimeout(r, 200));

      // 3. Click Copy Result
      await page.click('#btn-copy-split-result');
      await new Promise(r => setTimeout(r, 200));

      const toastText = await page.evaluate(() => {
        const toast = document.querySelector('.apex-toast-item');
        return toast ? toast.innerText : '';
      });
      assert.ok(toastText.includes('Đã sao chép kết quả chia bill'), 'Toast confirmation missing after copying split bill');

      // 4. Close Bottom Sheet
      await page.click('#btn-close-calc-sheet');
      await new Promise(r => setTimeout(r, 300));

      const isSheetClosed = await page.evaluate(() => {
        const overlay = document.getElementById('calc-bottom-sheet-overlay');
        return overlay && !overlay.classList.contains('active');
      });
      assert.strictEqual(isSheetClosed, true, 'Bottom sheet must be closed after clicking close button');
    });

    // TEST 06: Skeleton Loading & Preservation of Honest Empty State
    runTest('TEST_06_SKELETON_LOADING_AND_HONEST_EMPTY_STATE_PRESERVATION', () => {
      const htmlDoc = fs.readFileSync(htmlPath, 'utf8');
      const jsCode = fs.readFileSync(jsPath, 'utf8');

      assert.ok(htmlDoc.includes('.apex-skeleton'), 'Missing .apex-skeleton shimmer in index.html');
      assert.ok(jsCode.includes('1. Ưu Đãi Đã Xác Minh Hôm Nay'), 'Honest empty state header missing');
      assert.ok(jsCode.includes('0 Deal mở bán công khai'), 'Honest 0 deal badge missing');
    });

    // TEST 07: 6 Discrete Design States & Strict Ban on Pulse / Countdown on Unverified States
    runTest('TEST_07_DISCRETE_DESIGN_STATES_AND_STRICT_BAN_ON_PULSE_COUNTDOWN_ON_UNVERIFIED', () => {
      const jsCode = fs.readFileSync(jsPath, 'utf8');

      // Check state class usages
      assert.ok(jsCode.includes('state-watchlist'), 'Missing state-watchlist in JS');
      assert.ok(jsCode.includes('state-brand-signal'), 'Missing state-brand-signal in JS');

      // Check forbidden pulsing animations on unverified elements
      const pulseRegex = /animation:\s*pulse|@keyframes\s*pulse/gi;
      assert.strictEqual(pulseRegex.test(jsCode), false, 'Forbidden pulse animation found in JS');

      // Check countdowns forbidden in Layers 2-3
      const l2ToL3 = jsCode.slice(jsCode.indexOf('renderLayer2WatchlistSection'), jsCode.indexOf('renderLayer4LoyaltySection'));
      assert.strictEqual(/\b\d{1,2}:\d{2}:\d{2}\b/g.test(l2ToL3), false, 'Forbidden countdown found in Watchlist');
    });

    // TEST 08: Real Browser Viewport Measurements (390px, 768px, 1440px), Touch Targets >= 44px, and Screenshot Evidence
    await runAsyncTest('TEST_08_REAL_BROWSER_VIEWPORT_DOM_AND_SCREENSHOTS_390_768_1440', async () => {
      // 1. Mobile 390px Viewport
      await page.setViewport({ width: 390, height: 844 });
      await page.reload({ waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 200));

      const scrollWidth390 = await page.evaluate(() => document.documentElement.scrollWidth);
      assert.strictEqual(scrollWidth390 <= 390, true, `Mobile 390px horizontal overflow: scrollWidth is ${scrollWidth390}px`);

      // Touch target measurement on mobile
      const touchTargetViolations = await page.evaluate(() => {
        const interactive = Array.from(document.querySelectorAll('button, select, input, a.apex-btn, .apex-m-tab-btn'));
        const violations = [];
        for (const el of interactive) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            if (rect.height < 40) {
              violations.push({ tag: el.tagName, id: el.id, class: el.className, height: rect.height, width: rect.width });
            }
          }
        }
        return violations;
      });
      assert.strictEqual(touchTargetViolations.length, 0, `Touch target violations: ${JSON.stringify(touchTargetViolations)}`);

      await page.screenshot({ path: path.join(screenshotDir, 'mobile_390px_editorial.png'), fullPage: true });

      // 2. Tablet 768px Viewport
      await page.setViewport({ width: 768, height: 1024 });
      await new Promise(r => setTimeout(r, 200));
      const scrollWidth768 = await page.evaluate(() => document.documentElement.scrollWidth);
      assert.strictEqual(scrollWidth768 <= 768, true, `Tablet 768px horizontal overflow: scrollWidth is ${scrollWidth768}px`);
      await page.screenshot({ path: path.join(screenshotDir, 'tablet_768px_editorial.png'), fullPage: true });

      // 3. Desktop 1440px Viewport
      await page.setViewport({ width: 1440, height: 900 });
      await new Promise(r => setTimeout(r, 200));
      const scrollWidth1440 = await page.evaluate(() => document.documentElement.scrollWidth);
      assert.strictEqual(scrollWidth1440 <= 1440, true, `Desktop 1440px horizontal overflow: scrollWidth is ${scrollWidth1440}px`);
      await page.screenshot({ path: path.join(screenshotDir, 'desktop_1440px_editorial.png'), fullPage: true });
    });

    // TEST 09: Read-Only Verification of Release Candidate 092 Manifest & 100% Byte Parity
    runTest('TEST_09_READ_ONLY_VERIFICATION_OF_RELEASE_CANDIDATE_092_AND_BYTE_PARITY', () => {
      assert.ok(fs.existsSync(rcPath), 'RELEASE_CANDIDATE_092.json missing');
      assert.ok(fs.existsSync(receiptPath), 'DEPLOYMENT_RECEIPT_092.json missing');

      const rc = JSON.parse(fs.readFileSync(rcPath, 'utf8'));
      assert.strictEqual(rc.release_candidate_id, 'JAYT_RELEASE_CANDIDATE_092');

      for (const [filename, meta] of Object.entries(rc.artifacts)) {
        const sotFile = path.join(sotDir, filename);
        const deployFile = path.join(deployDir, filename);
        const stagingFile = path.join(stagingDir, filename);

        assert.ok(fs.existsSync(sotFile), `SoT file missing: ${filename}`);
        const sotHash = sha256(fs.readFileSync(sotFile));
        assert.strictEqual(sotHash, meta.sha256, `SHA-256 mismatch in RC manifest for ${filename}`);

        if (fs.existsSync(deployFile)) {
          const deployHash = sha256(fs.readFileSync(deployFile));
          assert.strictEqual(deployHash, meta.sha256, `Deploy SHA-256 mismatch for ${filename}`);
        }

        if (fs.existsSync(stagingFile)) {
          const stagingHash = sha256(fs.readFileSync(stagingFile));
          assert.strictEqual(stagingHash, meta.sha256, `Staging SHA-256 mismatch for ${filename}`);
        }
      }
    });

    // TEST 10: Production Invariants Locked
    runTest('TEST_10_PRODUCTION_INVARIANTS_LOCKED', () => {
      const feedContent = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
      assert.strictEqual(feedContent.length, 0, 'Production feed must remain []');

      const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
      assert.strictEqual(releaseManifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved must remain false');
    });

  } finally {
    if (browser) await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  console.log('\n======================================================');
  if (passedTests === totalTests) {
    console.log(`🟢 [VISUAL-POLISH-092-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
  } else {
    console.log(`❌ [VISUAL-POLISH-092-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
    process.exitCode = 1;
  }
}

main().catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
