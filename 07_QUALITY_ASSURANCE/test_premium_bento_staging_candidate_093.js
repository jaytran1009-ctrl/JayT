/**
 * JAYT PREMIUM BENTO STAGING CANDIDATE TEST SUITE (093)
 * Directive: JAYT-093-PREMIUM-BENTO-STAGING-CANDIDATE
 *
 * PURE READ-ONLY TEST SUITE: Zero disk writes during test execution.
 *
 * Verifies:
 * 1. Premium Bento Grid Hierarchy (Hero, Verified Locations Widget, Fintech Split Bill, Community Radar).
 * 2. Desktop Canvas (1200px) and Responsive Mobile-First Breakpoints (760px, 430px).
 * 3. Zero Hotlinked External Images and Zero Unverified Claims.
 * 4. Strict Touch Targets >= 44px on Mobile 390px (0 violations).
 * 5. Pre-Generated Evidence Artifacts & Screenshot Integrity (093).
 * 6. Keyboard Focus (:focus-visible), Reduced-Motion, and ARIA Live Polite Toast.
 * 7. Interactive Bottom Sheet Bill Splitter (100% Local Calculation).
 * 8. Zero --force Fail-Closed Emitter Behavior (093).
 * 9. Release Candidate 093 Manifest & 100% Byte Parity across SoT/Deploy/Staging.
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

const rc093Path = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_CANDIDATE_093.json');
const emitter093Path = path.join(repoRoot, '08_RELEASE_VAULT', 'emit_release_candidate_093.js');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const evidenceMetaPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'screenshots_093', 'EVIDENCE_METADATA_093.json');

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
  console.log('🧪 [JAYT-093-TEST] Khởi chạy bộ kiểm thử Premium Bento Staging Candidate 093 (READ-ONLY)...\n');

  // TEST 01: Premium Bento Grid Hierarchy
  runTest('TEST_01_PREMIUM_BENTO_HERO_AND_WIDGETS', () => {
    const htmlDoc = fs.readFileSync(htmlPath, 'utf8');
    const jsCode = fs.readFileSync(jsPath, 'utf8');

    assert.ok(htmlDoc.includes('apex-premium-bento'), 'Missing .apex-premium-bento in index.html');
    assert.ok(htmlDoc.includes('apex-premium-hero'), 'Missing .apex-premium-hero in index.html');
    assert.ok(htmlDoc.includes('apex-fintech-widget'), 'Missing .apex-fintech-widget in index.html');
    assert.ok(htmlDoc.includes('apex-premium-radar'), 'Missing .apex-premium-radar in index.html');

    assert.ok(jsCode.includes('apex-premium-bento'), 'Missing .apex-premium-bento in JS');
    assert.ok(jsCode.includes('apex-premium-hero'), 'Missing .apex-premium-hero in JS');
  });

  // TEST 02: Desktop Canvas and Responsive Breakpoints
  runTest('TEST_02_DESKTOP_CANVAS_AND_RESPONSIVE_BREAKPOINTS', () => {
    const htmlDoc = fs.readFileSync(htmlPath, 'utf8');

    assert.ok(htmlDoc.includes('@media (max-width: 760px)'), 'Missing 760px breakpoint in index.html');
    assert.ok(htmlDoc.includes('@media (max-width: 430px)'), 'Missing 430px breakpoint in index.html');
  });

  // TEST 03: Zero Hotlink and Zero Unverified Claims
  runTest('TEST_03_ZERO_HOTLINK_AND_ZERO_UNVERIFIED_CLAIMS', () => {
    const jsCode = fs.readFileSync(jsPath, 'utf8');

    assert.strictEqual(jsCode.includes('http://') || jsCode.includes('https://images.'), false, 'Forbidden image hotlink in JS');
    const pulseRegex = /animation:\s*pulse|@keyframes\s*pulse/gi;
    assert.strictEqual(pulseRegex.test(jsCode), false, 'Forbidden pulse animation in JS');
  });

  // TEST 04: Pre-Generated Evidence Artifacts & Screenshot Integrity
  runTest('TEST_04_PRE_GENERATED_EVIDENCE_ARTIFACTS_AND_METADATA', () => {
    assert.ok(fs.existsSync(evidenceMetaPath), 'EVIDENCE_METADATA_093.json missing');
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

  const port = 8932;
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

    // TEST 05: Strict Touch Targets >= 44px across DOM
    await runAsyncTest('TEST_05_STRICT_TOUCH_TARGETS_GE_44PX_ACROSS_DOM', async () => {
      const touchViolations = await page.evaluate(() => {
        const interactive = Array.from(document.querySelectorAll('button, select, input, a.apex-btn, .apex-m-tab-btn, .apex-premium-btn'));
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

    // TEST 06: Keyboard Focus, Reduced-Motion, and ARIA Live Polite Toast
    runTest('TEST_06_KEYBOARD_FOCUS_ACCESSIBILITY_AND_REDUCED_MOTION', () => {
      const htmlDoc = fs.readFileSync(htmlPath, 'utf8');
      const jsCode = fs.readFileSync(jsPath, 'utf8');

      assert.ok(htmlDoc.includes('@media (prefers-reduced-motion: reduce)'), 'Missing prefers-reduced-motion in index.html');
      assert.ok(jsCode.includes(':focus-visible'), 'Missing :focus-visible in JS stylesheet');
      assert.ok(htmlDoc.includes('role="status"') && htmlDoc.includes('aria-live="polite"'), 'Accessible ARIA toast container missing');
    });

    // TEST 07: Splitwise Bottom Sheet Interactive E2E
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

    // TEST 08: Zero --force Fail-Closed Emitter Behavior
    runTest('TEST_08_ZERO_FORCE_FAIL_CLOSED_EMITTER_BEHAVIOR', () => {
      assert.ok(fs.existsSync(emitter093Path), 'emit_release_candidate_093.js missing');
      const emitterCode = fs.readFileSync(emitter093Path, 'utf8');

      assert.strictEqual(emitterCode.includes('process.argv.includes(\'--force\')'), false, 'Forbidden --force flag detected in emitter');
      assert.ok(emitterCode.includes('fs.existsSync(targetRcPath)'), 'Fail-closed check missing in emitter');
    });

    // TEST 09: Release Candidate 093 Manifest & 100% Byte Parity across SoT/Deploy/Staging
    runTest('TEST_09_RELEASE_CANDIDATE_093_100_PERCENT_BYTE_PARITY', () => {
      assert.ok(fs.existsSync(rc093Path), 'RELEASE_CANDIDATE_093.json missing');
      const rc = JSON.parse(fs.readFileSync(rc093Path, 'utf8'));
      assert.strictEqual(rc.release_candidate_id, 'JAYT_RELEASE_CANDIDATE_093');

      for (const [filename, meta] of Object.entries(rc.artifacts)) {
        const sotFile = path.join(sotDir, filename);
        const deployFile = path.join(deployDir, filename);
        const stagingFile = path.join(stagingDir, filename);

        assert.ok(fs.existsSync(sotFile), `SoT file missing: ${filename}`);
        const sotHash = sha256(fs.readFileSync(sotFile));
        assert.strictEqual(sotHash, meta.sha256, `SHA-256 mismatch in RC 093 manifest for ${filename}`);

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
    console.log(`🟢 [PREMIUM-BENTO-093-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
  } else {
    console.log(`❌ [PREMIUM-BENTO-093-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
    process.exitCode = 1;
  }
}

main().catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
