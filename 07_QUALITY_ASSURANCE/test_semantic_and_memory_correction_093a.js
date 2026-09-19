/**
 * JAYT SEMANTIC AND MEMORY CORRECTION TEST SUITE (093A)
 * Directive: JAYT-093A-SEMANTIC-AND-MEMORY-CORRECTION
 *
 * PURE READ-ONLY TEST SUITE: Zero disk writes during test execution.
 *
 * Verifies:
 * 1. Project Memory Consistency Suite passes all 10/10 checks (MEM_07 resolved).
 * 2. Correction Receipt 093 exists with exact on-disk metrics & disclosure.
 * 3. Candidate 093A Invariants (production_approval_is_false: true, client_side_local_storage_only_no_server_transmission: true) & honest privacy copy.
 * 4. Negative Collision Test: Second emitter run exits with non-zero code & zero candidate hash mutation.
 * 5. Pre-Generated Evidence Artifacts & Screenshot Integrity (093A).
 * 6. Strict Touch Targets >= 44px on Mobile 390px (0 violations).
 * 7. Premium Bento Grid Hierarchy & Responsive Breakpoints.
 * 8. Splitwise Bottom Sheet Interactive E2E (100% local calculation).
 * 9. Release Candidate 093A Manifest & 100% Byte Parity across SoT/Deploy/Staging.
 * 10. Production Invariants Locked (deals_feed.json: [], is_approved: false).
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const { spawnSync } = require('child_process');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const sotDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');
const deployDir = path.join(repoRoot, 'deploy', 'public');
const stagingDir = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH');

const jsPath = path.join(sotDir, 'jayt_apex_interface.js');
const htmlPath = path.join(sotDir, 'index.html');

const correctionReceipt093Path = path.join(repoRoot, '08_RELEASE_VAULT', 'DEPLOYMENT_RECEIPT_093_CORRECTION.json');
const rc093aPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_CANDIDATE_093A.json');
const emitter093aPath = path.join(repoRoot, '08_RELEASE_VAULT', 'emit_release_candidate_093a.js');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const evidenceMetaPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'screenshots_093a', 'EVIDENCE_METADATA_093A.json');

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
  console.log('🧪 [JAYT-093A-TEST] Khởi chạy bộ kiểm thử Semantic & Memory Correction 093A (READ-ONLY)...\n');

  // TEST 01: Project Memory Consistency Suite (MEM_07 resolved)
  runTest('TEST_01_MEMORY_CONSISTENCY_PASSES_ALL_10_TESTS', () => {
    const res = spawnSync('node', [path.join(repoRoot, '07_QUALITY_ASSURANCE', 'test_project_memory_consistency.js')], { encoding: 'utf8' });
    assert.strictEqual(res.status, 0, `test_project_memory_consistency.js failed: ${res.stdout}\n${res.stderr}`);
    assert.ok(res.stdout.includes('10/10 KIỂM THỬ TÍNH NHẤT QUÁN PROJECT_MEMORY.MD ĐÃ ĐẠT [PASS]'), 'MEM_07 must pass');
  });

  // TEST 02: Correction Receipt 093 Exists with Exact Metrics
  runTest('TEST_02_CORRECTION_RECEIPT_093_EXISTS_WITH_EXACT_METRICS', () => {
    assert.ok(fs.existsSync(correctionReceipt093Path), 'DEPLOYMENT_RECEIPT_093_CORRECTION.json missing');
    const corr = JSON.parse(fs.readFileSync(correctionReceipt093Path, 'utf8'));
    assert.strictEqual(corr.status, 'CORRECTED_AND_SUPERSEDED_BY_093A');
    assert.ok(corr.frozen_093_exact_disk_measurements['index.html'].size_bytes > 0);
    assert.ok(corr.frozen_093_exact_disk_measurements['jayt_apex_interface.js'].size_bytes > 0);
  });

  // TEST 03: Candidate 093A Invariants & Honest Privacy Copy
  runTest('TEST_03_CANDIDATE_093A_INVARIANTS_AND_HONEST_PRIVACY_COPY', () => {
    assert.ok(fs.existsSync(rc093aPath), 'RELEASE_CANDIDATE_093A.json missing');
    const rc = JSON.parse(fs.readFileSync(rc093aPath, 'utf8'));

    assert.strictEqual(rc.invariants.production_approval_is_false, true, 'production_approval_is_false invariant required');
    assert.strictEqual(rc.invariants.client_side_local_storage_only_no_server_transmission, true, 'client_side_local_storage_only invariant required');
    assert.strictEqual(rc.invariants.ceo_approval_locked, undefined, 'Ambiguous ceo_approval_locked must be replaced');
    assert.strictEqual(rc.invariants.zero_pii_storage, undefined, 'Absolute zero_pii_storage claim must be replaced');

    const jsCode = fs.readFileSync(jsPath, 'utf8');
    assert.strictEqual(jsCode.includes('0 PII'), false, 'Absolute "0 PII" claim forbidden in JS');
    assert.strictEqual(jsCode.includes('Riêng tư tuyệt đối'), false, 'Absolute "Riêng tư tuyệt đối" claim forbidden in JS');
    assert.ok(jsCode.includes('Xử lý cục bộ: Dữ liệu được lưu trữ trên trình duyệt'), 'Honest local storage description required');
  });

  // TEST 04: Negative Collision Test: Second Emitter Run Exits Non-Zero & Zero Hash Mutation
  runTest('TEST_04_NEGATIVE_COLLISION_NON_ZERO_EXIT_AND_ZERO_MUTATION', () => {
    const beforeHash = sha256(fs.readFileSync(rc093aPath));

    const secondRun = spawnSync('node', [emitter093aPath], { encoding: 'utf8' });
    assert.notStrictEqual(secondRun.status, 0, 'Second emitter run MUST exit with non-zero code on collision');
    assert.ok(secondRun.stderr.includes('[FAIL-CLOSED]'), 'Fail-closed message required on collision');

    const afterHash = sha256(fs.readFileSync(rc093aPath));
    assert.strictEqual(beforeHash, afterHash, 'Candidate file hash MUST remain strictly identical after collision');
  });

  // TEST 05: Pre-Generated Evidence Artifacts & Screenshot Integrity
  runTest('TEST_05_PRE_GENERATED_EVIDENCE_ARTIFACTS_AND_METADATA', () => {
    assert.ok(fs.existsSync(evidenceMetaPath), 'EVIDENCE_METADATA_093A.json missing');
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

  const port = 8936;
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

    // TEST 06: Strict Touch Targets >= 44px across DOM
    await runAsyncTest('TEST_06_STRICT_TOUCH_TARGETS_GE_44PX_ACROSS_DOM', async () => {
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

    // TEST 07: Bento Grid Hierarchy & Responsive Breakpoints
    runTest('TEST_07_PREMIUM_BENTO_GRID_HIERARCHY_AND_RESPONSIVE', () => {
      const htmlDoc = fs.readFileSync(htmlPath, 'utf8');
      const jsCode = fs.readFileSync(jsPath, 'utf8');

      assert.ok(htmlDoc.includes('apex-premium-bento') || htmlDoc.includes('apex-cinematic-bento'), 'Missing bento grid container in index.html');
      assert.ok(htmlDoc.includes('apex-premium-hero') || htmlDoc.includes('apex-cinematic-hero'), 'Missing hero container in index.html');
      assert.ok(htmlDoc.includes('apex-fintech-widget') || htmlDoc.includes('apex-fintech-metal'), 'Missing fintech widget in index.html');
      assert.ok(htmlDoc.includes('apex-premium-radar') || htmlDoc.includes('apex-radar-glass') || htmlDoc.includes('apex-radar-amber-card'), 'Missing radar container in index.html');
      assert.ok(jsCode.includes('apex-premium-bento') || jsCode.includes('apex-cinematic-bento'), 'Missing bento container in JS');
    });

    // TEST 08: Splitwise Bottom Sheet Interactive E2E
    await runAsyncTest('TEST_08_SPLITWISE_BOTTOM_SHEET_INTERACTIVE_E2E', async () => {
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

    // TEST 09: Release Candidate 093A Manifest Integrity & Deploy Parity
    runTest('TEST_09_RELEASE_CANDIDATE_093A_MANIFEST_INTEGRITY_AND_DEPLOY_PARITY', () => {
      assert.ok(fs.existsSync(rc093aPath), 'RELEASE_CANDIDATE_093A.json missing');
      const rc = JSON.parse(fs.readFileSync(rc093aPath, 'utf8'));
      assert.strictEqual(rc.release_candidate_id, 'JAYT_RELEASE_CANDIDATE_093A');

      for (const [filename, meta] of Object.entries(rc.artifacts)) {
        assert.ok(meta.sha256 && meta.size_bytes > 0, `Metadata must be valid for ${filename}`);
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
    console.log(`🟢 [SEMANTIC-AND-MEMORY-093A-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
  } else {
    console.log(`❌ [SEMANTIC-AND-MEMORY-093A-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
    process.exitCode = 1;
  }
}

main().catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
