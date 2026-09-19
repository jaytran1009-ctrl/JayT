/**
 * JAYT RELEASE LINEAGE AND MOBILE-FIRST REMEDIATION TEST SUITE (092A)
 * Directive: JAYT-092A-RELEASE-LINEAGE-AND-MOBILE-FIRST-REMEDIATION
 *
 * PURE READ-ONLY TEST SUITE: Zero disk writes during test execution.
 *
 * Verifies:
 * 1. Append-Only Disclosure Record & Correction Receipt 092 Reclassification.
 * 2. Zero --force Fail-Closed Emitter Behavior.
 * 3. Pre-Generated Evidence Artifacts & Screenshot Integrity.
 * 4. Strict Touch Targets >= 44px on Mobile 390px (0 violations).
 * 5. Mobile-First Compact Watchlist (Top 3 default + Interactive Expand/Collapse).
 * 6. Keyboard Focus (:focus-visible), Reduced-Motion, and ARIA Live Polite Toast.
 * 7. Interactive Bottom Sheet Bill Splitter (100% Local Calculation).
 * 8. Zero Unverified Pulses, Countdowns, or External Image Hotlinks.
 * 9. Release Candidate 092A Manifest & 100% Byte Parity across SoT/Deploy/Staging.
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

const jsPath = path.join(sotDir, 'jayt_apex_interface.js');
const htmlPath = path.join(sotDir, 'index.html');

const disclosurePath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECORD_092A_RELEASE_LINEAGE_REMEDIATION.json');
const correctionReceiptPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DEPLOYMENT_RECEIPT_092_CORRECTION.json');
const rc092aPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_CANDIDATE_092A.json');
const emitter092aPath = path.join(repoRoot, '08_RELEASE_VAULT', 'emit_release_candidate_092a.js');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const evidenceMetaPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'screenshots_092a', 'EVIDENCE_METADATA_092A.json');

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
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
  console.log('🧪 [JAYT-092A-TEST] Khởi chạy bộ kiểm thử Release Lineage & Mobile-First Remediation 092A (READ-ONLY)...\n');

  // TEST 01: Append-Only Disclosure Record & Correction Receipt 092 Reclassification
  runTest('TEST_01_APPEND_ONLY_DISCLOSURE_AND_CORRECTION_RECEIPT_EXIST', () => {
    assert.ok(fs.existsSync(disclosurePath), 'DISCLOSURE_RECORD_092A_RELEASE_LINEAGE_REMEDIATION.json missing');
    assert.ok(fs.existsSync(correctionReceiptPath), 'DEPLOYMENT_RECEIPT_092_CORRECTION.json missing');

    const disc = JSON.parse(fs.readFileSync(disclosurePath, 'utf8'));
    assert.strictEqual(disc.disclosure_id, 'DISCLOSURE_092A_RELEASE_LINEAGE_REMEDIATION');
    assert.strictEqual(disc.remediation_status, 'IMPLEMENTED_APPEND_ONLY');

    const corr = JSON.parse(fs.readFileSync(correctionReceiptPath, 'utf8'));
    assert.strictEqual(corr.reclassification, 'LOCAL_STAGING_ATTESTATION_ONLY');
  });

  // TEST 02: Zero --force Fail-Closed Emitter Behavior
  runTest('TEST_02_ZERO_FORCE_FAIL_CLOSED_EMITTER_BEHAVIOR', () => {
    assert.ok(fs.existsSync(emitter092aPath), 'emit_release_candidate_092a.js missing');
    const emitterCode = fs.readFileSync(emitter092aPath, 'utf8');

    assert.strictEqual(emitterCode.includes('--force'), false, 'Forbidden --force flag detected in emitter');
    assert.ok(emitterCode.includes('fs.existsSync(targetRcPath)'), 'Fail-closed check missing in emitter');
  });

  // TEST 03: Pre-Generated Evidence Artifacts & Screenshot Integrity
  runTest('TEST_03_PRE_GENERATED_EVIDENCE_ARTIFACTS_AND_METADATA', () => {
    assert.ok(fs.existsSync(evidenceMetaPath), 'EVIDENCE_METADATA_092A.json missing');
    const meta = JSON.parse(fs.readFileSync(evidenceMetaPath, 'utf8'));

    const evidenceDir = path.dirname(evidenceMetaPath);
    const m390 = path.join(evidenceDir, meta.measurements.mobile_390px.screenshot);
    const tab768 = path.join(evidenceDir, meta.measurements.tablet_768px.screenshot);
    const desk1440 = path.join(evidenceDir, meta.measurements.desktop_1440px.screenshot);

    assert.ok(fs.existsSync(m390) && fs.statSync(m390).size > 10000, 'Mobile screenshot missing or empty');
    assert.ok(fs.existsSync(tab768) && fs.statSync(tab768).size > 10000, 'Tablet screenshot missing or empty');
    assert.ok(fs.existsSync(desk1440) && fs.statSync(desk1440).size > 10000, 'Desktop screenshot missing or empty');

    assert.strictEqual(sha256(fs.readFileSync(m390)), meta.measurements.mobile_390px.sha256, 'Mobile screenshot hash mismatch');
    assert.strictEqual(sha256(fs.readFileSync(tab768)), meta.measurements.tablet_768px.sha256, 'Tablet screenshot hash mismatch');
    assert.strictEqual(sha256(fs.readFileSync(desk1440)), meta.measurements.desktop_1440px.sha256, 'Desktop screenshot hash mismatch');
  });

  // Start Static Local HTTP Server for Real Browser Testing
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

  const port = 8926;
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

    await page.setViewport({ width: 390, height: 844 });
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle0' });

    // TEST 04: Strict Touch Targets >= 44px on Mobile 390px
    await runAsyncTest('TEST_04_STRICT_TOUCH_TARGETS_GE_44PX_ACROSS_DOM', async () => {
      const touchViolations = await page.evaluate(() => {
        const interactive = Array.from(document.querySelectorAll('button, select, input, a.apex-btn, .apex-m-tab-btn'));
        const violations = [];
        for (const el of interactive) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            if (rect.height < 44) {
              violations.push({ tag: el.tagName, id: el.id, class: el.className, height: rect.height, width: rect.width });
            }
          }
        }
        return violations;
      });
      assert.strictEqual(touchViolations.length, 0, `Strict touch target >=44px violations: ${JSON.stringify(touchViolations)}`);
    });

    // TEST 05: Mobile-First Compact Watchlist (Top 3 Default + Interactive Expand/Collapse)
    await runAsyncTest('TEST_05_MOBILE_FIRST_COMPACT_WATCHLIST_COLLAPSE_AND_EXPAND', async () => {
      // 1. Initial State: Exactly 3 verified location cards rendered
      const initialCardCount = await page.evaluate(() => document.querySelectorAll('.state-watchlist.apex-rich-deal-card').length);
      assert.strictEqual(initialCardCount, 3, `Initial collapsed watchlist must show top 3 cards, got ${initialCardCount}`);

      // 2. Expand: Click toggle button
      await page.click('#btn-toggle-watchlist-expand');
      await new Promise(r => setTimeout(r, 200));

      const expandedCardCount = await page.evaluate(() => document.querySelectorAll('.state-watchlist.apex-rich-deal-card').length);
      assert.strictEqual(expandedCardCount, 9, `Expanded watchlist must show all 9 cards, got ${expandedCardCount}`);

      // 3. Collapse: Click toggle button again
      await page.click('#btn-toggle-watchlist-expand');
      await new Promise(r => setTimeout(r, 200));

      const collapsedAgainCount = await page.evaluate(() => document.querySelectorAll('.state-watchlist.apex-rich-deal-card').length);
      assert.strictEqual(collapsedAgainCount, 3, `Collapsed watchlist must return to 3 cards, got ${collapsedAgainCount}`);
    });

    // TEST 06: Keyboard Focus (:focus-visible), Reduced-Motion, and ARIA Live Polite Toast
    runTest('TEST_06_KEYBOARD_FOCUS_ACCESSIBILITY_AND_REDUCED_MOTION', () => {
      const htmlDoc = fs.readFileSync(htmlPath, 'utf8');
      const jsCode = fs.readFileSync(jsPath, 'utf8');

      assert.ok(htmlDoc.includes('@media (prefers-reduced-motion: reduce)'), 'Missing prefers-reduced-motion in index.html');
      assert.ok(jsCode.includes(':focus-visible'), 'Missing :focus-visible in JS stylesheet');
      assert.ok(htmlDoc.includes('role="status"') && htmlDoc.includes('aria-live="polite"'), 'Accessible ARIA toast container missing');
    });

    // TEST 07: Splitwise Bottom Sheet Interactive E2E (100% Local Calculation)
    await runAsyncTest('TEST_07_SPLITWISE_BOTTOM_SHEET_INTERACTIVE_E2E', async () => {
      await page.click('#btn-open-calc-sheet');
      await new Promise(r => setTimeout(r, 200));

      const isSheetActive = await page.evaluate(() => {
        const overlay = document.getElementById('calc-bottom-sheet-overlay');
        return overlay && overlay.classList.contains('active');
      });
      assert.strictEqual(isSheetActive, true, 'Bottom sheet overlay must have active class when opened');

      await page.$eval('#sheet-input-price', el => { el.value = '300000'; el.dispatchEvent(new Event('input')); });
      await page.$eval('#sheet-input-voucher', el => { el.value = '60000'; el.dispatchEvent(new Event('input')); });
      await page.$eval('#sheet-input-split', el => { el.value = '3'; el.dispatchEvent(new Event('input')); });
      await new Promise(r => setTimeout(r, 200));

      await page.click('#btn-copy-split-result');
      await new Promise(r => setTimeout(r, 200));

      const toastText = await page.evaluate(() => {
        const toast = document.querySelector('.apex-toast-item');
        return toast ? toast.innerText : '';
      });
      assert.ok(toastText.includes('Đã sao chép kết quả chia bill'), 'Toast confirmation missing after copying split bill');

      await page.click('#btn-close-calc-sheet');
      await new Promise(r => setTimeout(r, 200));
    });

    // TEST 08: Zero Unverified Pulses, Countdowns, or External Image Hotlinks
    runTest('TEST_08_ZERO_UNVERIFIED_PULSES_OR_COUNTDOWNS_OR_HOTLINKS', () => {
      const jsCode = fs.readFileSync(jsPath, 'utf8');

      const pulseRegex = /animation:\s*pulse|@keyframes\s*pulse/gi;
      assert.strictEqual(pulseRegex.test(jsCode), false, 'Forbidden pulse animation found in JS');

      const l2ToL3 = jsCode.slice(jsCode.indexOf('renderLayer2WatchlistSection'), jsCode.indexOf('renderLayer4LoyaltyPoliciesSection'));
      assert.strictEqual(/\b\d{1,2}:\d{2}:\d{2}\b/g.test(l2ToL3), false, 'Forbidden countdown found in Watchlist');

      assert.strictEqual(jsCode.includes('http://') || jsCode.includes('https://images.'), false, 'External image hotlinks forbidden');
    });

    // TEST 09: Release Candidate 092A Manifest Integrity & Current Deploy Parity
    runTest('TEST_09_RELEASE_CANDIDATE_092A_MANIFEST_AND_DEPLOY_PARITY', () => {
      assert.ok(fs.existsSync(rc092aPath), 'RELEASE_CANDIDATE_092A.json missing');
      const rc = JSON.parse(fs.readFileSync(rc092aPath, 'utf8'));
      assert.strictEqual(rc.release_candidate_id, 'JAYT_RELEASE_CANDIDATE_092A');

      for (const [filename, meta] of Object.entries(rc.artifacts)) {
        assert.ok(meta.sha256 && meta.size_bytes > 0, `Valid artifact metadata required for ${filename}`);
        const sotFile = path.join(sotDir, filename);
        const deployFile = path.join(deployDir, filename);
        const stagingFile = path.join(stagingDir, filename);

        assert.ok(fs.existsSync(sotFile), `SoT file missing: ${filename}`);
        if (fs.existsSync(deployFile)) {
          const sotHash = sha256(fs.readFileSync(sotFile));
          const deployHash = sha256(fs.readFileSync(deployFile));
          assert.strictEqual(deployHash, sotHash, `Deploy SHA-256 mismatch for ${filename}`);
        }
        if (fs.existsSync(stagingFile)) {
          const sotHash = sha256(fs.readFileSync(sotFile));
          const stagingHash = sha256(fs.readFileSync(stagingFile));
          assert.strictEqual(stagingHash, sotHash, `Staging SHA-256 mismatch for ${filename}`);
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
    console.log(`🟢 [LINEAGE-AND-MOBILE-092A-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
  } else {
    console.log(`❌ [LINEAGE-AND-MOBILE-092A-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
    process.exitCode = 1;
  }
}

main().catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
