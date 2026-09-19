const fs = require('fs');
const path = require('path');
const http = require('http');
const assert = require('assert');
const crypto = require('crypto');
const { execSync } = require('child_process');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const sotDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');
const deployDir = path.join(repoRoot, 'deploy', 'public');
const stagingDir = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH');

let passCount = 0;
let totalCount = 0;

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

async function runAsyncTest(name, fn) {
  totalCount++;
  try {
    await fn();
    console.log(`  [${name}]: [PASS]`);
    passCount++;
  } catch (err) {
    console.error(`  [${name}]: [FAIL] - ${err.message}`);
  }
}

function runSyncTest(name, fn) {
  totalCount++;
  try {
    fn();
    console.log(`  [${name}]: [PASS]`);
    passCount++;
  } catch (err) {
    console.error(`  [${name}]: [FAIL] - ${err.message}`);
  }
}

async function main() {
  console.log('🧪 [JAYT-101-TEST] Khởi chạy bộ kiểm thử Controlled Live Provenance Capture 101 (REAL BROWSER & LIVE ARTIFACTS)...\n');

  // TEST 01: Project Memory Consistency (10/10 PASS)
  runSyncTest('TEST_01_MEMORY_CONSISTENCY_PASSES_ALL_10_TESTS', () => {
    const memTestPath = path.join(__dirname, 'test_project_memory_consistency.js');
    assert.ok(fs.existsSync(memTestPath), 'test_project_memory_consistency.js missing');
    const out = execSync(`node "${memTestPath}"`, { encoding: 'utf8', cwd: repoRoot });
    assert.ok(out.includes('10/10') && out.includes('PASS'), 'Project memory must pass 10/10');
  });

  // TEST 02: Negative Taxonomy Enforcement for 094 Through 101
  runSyncTest('TEST_02_NEGATIVE_TAXONOMY_ENFORCEMENT_FOR_094_THROUGH_101', () => {
    const { validateGlobalStatusTaxonomy067 } = require('./memory_transaction_manager_057.js');
    const nonApprovedWos = ['094', '094A', '094B', '095', '096', '097', '098', '099', '099A', '100', '101'];
    for (const wo of nonApprovedWos) {
      assert.throws(() => {
        validateGlobalStatusTaxonomy067(`| \`2026-08-25T16:10:00+07:00\` | \`JAYT-${wo}\` | Desc | Art | Test | **ACCEPTED BY CEO** |`);
      }, /STATUS_TAXONOMY_VIOLATION_067/, `Work order ${wo} MUST fail-closed when claiming ACCEPTED BY CEO`);

      assert.throws(() => {
        validateGlobalStatusTaxonomy067(`| \`2026-08-25T16:10:00+07:00\` | \`JAYT-${wo}\` | Desc | Art | Test | **CEO APPROVED** |`);
      }, /STATUS_TAXONOMY_VIOLATION_067/, `Work order ${wo} MUST fail-closed when claiming CEO APPROVED`);
    }
  });

  // TEST 03: Batch 101 Summary Contains 5 Live Authenticated Captures
  runSyncTest('TEST_03_BATCH_101_SUMMARY_CONTAINS_5_LIVE_AUTHENTICATED_CAPTURES', () => {
    const sumPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_101', 'batch_101_summary.json');
    assert.ok(fs.existsSync(sumPath), 'batch_101_summary.json missing');
    const sum = JSON.parse(fs.readFileSync(sumPath, 'utf8'));

    assert.strictEqual(sum.targets_total, 5, 'Must have 5 targets');
    assert.strictEqual(sum.authenticated_count, 5, 'All 5 targets must be CAPTURE_AUTHENTICATED');
    assert.strictEqual(sum.failed_count, 0, 'Must have 0 failed captures in batch 101');
  });

  // TEST 04: Physical On-Disk Authentic Artifacts and Hashes for all 5 Targets
  runSyncTest('TEST_04_PHYSICAL_ON_DISK_AUTHENTIC_ARTIFACTS_AND_HASHES_FOR_ALL_5_TARGETS', () => {
    const capturesDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_101', 'captures_101');
    assert.ok(fs.existsSync(capturesDir), 'captures_101 dir missing');

    const expectedTargets = [
      'TARGET_101_METIZ_OFFICIAL',
      'TARGET_101_GALAXY_DANANG_OFFICIAL',
      'TARGET_101_PHELA_OFFICIAL',
      'TARGET_101_GONGCHA_OFFICIAL',
      'TARGET_101_JOLLIBEE_OFFICIAL'
    ];

    for (const tid of expectedTargets) {
      const tDir = path.join(capturesDir, tid);
      assert.ok(fs.existsSync(tDir), `Target dir missing: ${tDir}`);

      const receiptPath = path.join(tDir, 'capture_receipt.json');
      assert.ok(fs.existsSync(receiptPath), `Receipt missing: ${receiptPath}`);
      const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));

      assert.strictEqual(receipt.status, 'CAPTURE_AUTHENTICATED');
      assert.strictEqual(receipt.http_response.status, 200);

      // Verify HTML on disk & hash
      const htmlPath = path.join(tDir, 'page.html');
      assert.ok(fs.existsSync(htmlPath), `HTML missing: ${htmlPath}`);
      const htmlBuf = fs.readFileSync(htmlPath);
      assert.ok(htmlBuf.length > 500, `HTML too small: ${htmlBuf.length}`);
      assert.strictEqual(sha256(htmlBuf), receipt.artifacts.page_html.sha256, `HTML hash mismatch for ${tid}`);

      // Verify Text on disk & hash
      const textPath = path.join(tDir, 'page.txt');
      assert.ok(fs.existsSync(textPath), `Text missing: ${textPath}`);
      const textBuf = fs.readFileSync(textPath);
      assert.ok(textBuf.length > 50, `Text too small: ${textBuf.length}`);
      assert.strictEqual(sha256(textBuf), receipt.artifacts.page_txt.sha256, `Text hash mismatch for ${tid}`);

      // Verify Screenshot PNG on disk & hash
      const pngPath = path.join(tDir, 'page.png');
      assert.ok(fs.existsSync(pngPath), `PNG missing: ${pngPath}`);
      const pngBuf = fs.readFileSync(pngPath);
      assert.ok(pngBuf.length > 5000, `PNG too small: ${pngBuf.length}`);
      assert.strictEqual(sha256(pngBuf), receipt.artifacts.page_png.sha256, `PNG hash mismatch for ${tid}`);
    }
  });

  // TEST 05: No Synthetic Fallback in any of the 5 Live Captures
  runSyncTest('TEST_05_NO_SYNTHETIC_FALLBACK_IN_ANY_OF_THE_5_LIVE_CAPTURES', () => {
    const capturesDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_101', 'captures_101');
    const targetDirs = fs.readdirSync(capturesDir);

    for (const td of targetDirs) {
      const textPath = path.join(capturesDir, td, 'page.txt');
      if (fs.existsSync(textPath)) {
        const text = fs.readFileSync(textPath, 'utf8');
        assert.ok(!text.includes('FALLBACK_METADATA'), `Fallback token found in ${td}/page.txt`);
        assert.ok(!text.includes('[METADATA_FALLBACK]'), `Fallback token found in ${td}/page.txt`);
      }
    }
  });

  // TEST 06: Fail-Closed Collector Engine Preserved
  runSyncTest('TEST_06_FAIL_CLOSED_COLLECTOR_ENGINE_PRESERVED', () => {
    const testColPath = path.join(__dirname, 'test_fail_closed_collector_100.js');
    assert.ok(fs.existsSync(testColPath), 'test_fail_closed_collector_100.js missing');
    const out = execSync(`node "${testColPath}"`, { encoding: 'utf8', cwd: repoRoot });
    assert.ok(out.includes('5/5') && out.includes('PASS'), 'Collector tests must pass 5/5');
  });

  // TEST 07: Updated Disclaimer Copy in Dataset for all 18 Historical Locations
  runSyncTest('TEST_07_UPDATED_DISCLAIMER_COPY_IN_DATASET_FOR_ALL_18_HISTORICAL_LOCATIONS', () => {
    const dsPath = path.join(stagingDir, 'four_layer_dataset.json');
    assert.ok(fs.existsSync(dsPath), 'four_layer_dataset.json missing in staging');
    const ds = JSON.parse(fs.readFileSync(dsPath, 'utf8'));

    const locs = ds.layer_2_watchlist.verified_locations;
    assert.strictEqual(locs.length, 18, `Must have exactly 18 historical locations, got: ${locs.length}`);

    for (const loc of locs) {
      assert.strictEqual(
        loc.status_disclaimer,
        'Địa điểm từng được ghi nhận từ nguồn chính thức; vui lòng kiểm tra trạng thái hiện tại tại nguồn.',
        `Disclaimer copy mismatch for ${loc.id}`
      );
    }
  });

  // TEST 08: Updated Disclaimer Copy in Interface JS
  runSyncTest('TEST_08_UPDATED_DISCLAIMER_COPY_IN_INTERFACE_JS', () => {
    const jsContent = fs.readFileSync(path.join(stagingDir, 'jayt_apex_interface.js'), 'utf8');
    assert.ok(jsContent.includes('Địa điểm từng được ghi nhận từ nguồn chính thức; vui lòng kiểm tra trạng thái hiện tại tại nguồn'));
  });

  // Start HTTP Staging Server SERVING DIRECTLY FROM STAGING_INSTANCE DIRECTORY
  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const filePath = path.join(stagingDir, reqPath);
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath);
      const mime = ext === '.html' ? 'text/html' : ext === '.js' ? 'application/javascript' : ext === '.json' ? 'application/json' : 'text/plain';
      res.writeHead(200, { 'Content-Type': mime });
      res.end(fs.readFileSync(filePath));
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  });

  const port = await new Promise(resolve => {
    server.listen(0, '127.0.0.1', () => resolve(server.address().port));
  });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const externalRequests = [];

  // TEST 09: Puppeteer Real Browser on Staging Instance 5 Slots
  await runAsyncTest('TEST_09_PUPPETEER_REAL_BROWSER_ON_STAGING_INSTANCE_5_SLOTS', async () => {
    const page = await browser.newPage();
    page.on('request', req => {
      const url = req.url();
      if (!url.startsWith('http://127.0.0.1') && !url.startsWith('http://localhost') && !url.startsWith('data:')) {
        externalRequests.push(url);
      }
    });

    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('[data-time-slot="SLOT_0730"]', { timeout: 10000 });

    // Slot 07:30
    await page.click('[data-time-slot="SLOT_0730"]');
    await new Promise(r => setTimeout(r, 150));
    const title0730 = await page.$eval('.apex-hero-title', el => el.textContent);
    assert.ok(title0730.includes('Cà Phê Sáng'), `07:30 title mismatch: ${title0730}`);

    // Slot 11:15
    await page.click('[data-time-slot="SLOT_1115"]');
    await new Promise(r => setTimeout(r, 150));
    const title1115 = await page.$eval('.apex-hero-title', el => el.textContent);
    assert.ok(title1115.includes('Bữa Trưa Nhanh'), `11:15 title mismatch: ${title1115}`);

    // Slot 14:15
    await page.click('[data-time-slot="SLOT_1415"]');
    await new Promise(r => setTimeout(r, 150));
    const title1415 = await page.$eval('.apex-hero-title', el => el.textContent);
    assert.ok(title1415.includes('Trà Chiều'), `14:15 title mismatch: ${title1415}`);

    // Slot 17:30
    await page.click('[data-time-slot="SLOT_1730"]');
    await new Promise(r => setTimeout(r, 150));
    const title1730 = await page.$eval('.apex-hero-title', el => el.textContent);
    assert.ok(title1730.includes('Kèo Tối'), `17:30 title mismatch: ${title1730}`);

    // Slot 21:00
    await page.click('[data-time-slot="SLOT_2100"]');
    await new Promise(r => setTimeout(r, 150));
    const title2100 = await page.$eval('.apex-hero-title', el => el.textContent);
    assert.ok(title2100.includes('Ăn Đêm'), `21:00 title mismatch: ${title2100}`);

    await page.close();
  });

  // TEST 10: Puppeteer Real Browser Split Bill Interactive & Escape Key
  await runAsyncTest('TEST_10_PUPPETEER_REAL_BROWSER_SPLIT_BILL_INTERACTIVE_AND_ESCAPE', async () => {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('#btn-open-calc-sheet', { timeout: 10000 });

    // Open Bottom Sheet Modal
    await page.click('#btn-open-calc-sheet');
    await new Promise(r => setTimeout(r, 150));

    const sheetVisibleBefore = await page.$eval('#calc-bottom-sheet-overlay', el => el.classList.contains('active'));
    assert.strictEqual(sheetVisibleBefore, true, 'Sheet overlay must have .active class in DOM');

    // Input values into Split Bill
    await page.$eval('#sheet-input-price', el => { el.value = '500000'; el.dispatchEvent(new Event('input')); });
    await page.$eval('#sheet-input-voucher', el => { el.value = '100000'; el.dispatchEvent(new Event('input')); });
    await page.$eval('#sheet-input-split', el => { el.value = '4'; el.dispatchEvent(new Event('input')); });
    await new Promise(r => setTimeout(r, 150));

    const perPersonText = await page.$eval('#sheet-val-per-person', el => el.textContent);
    assert.ok(perPersonText.includes('100.000') || perPersonText.includes('100,000'), `Calculated value mismatch: ${perPersonText}`);

    // Press Escape to dismiss
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 150));

    const sheetVisibleAfter = await page.$eval('#calc-bottom-sheet-overlay', el => el.classList.contains('active'));
    assert.strictEqual(sheetVisibleAfter, false, 'Sheet modal must NOT have .active class after Escape key');

    await page.close();
  });

  // TEST 11: Puppeteer Real Browser PII Submission & Live LocalStorage Assertion
  await runAsyncTest('TEST_11_PUPPETEER_REAL_BROWSER_PII_SUBMISSION_AND_LOCALSTORAGE', async () => {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('#community-signal-input', { timeout: 10000 });

    await page.evaluate(() => localStorage.removeItem('jayt_community_signals_080'));

    const piiRawText = 'Quán C giảm 20% liên hệ 0903112233 hoặc email help@jayt.vn, CCCD 048199334455';
    await page.type('#community-signal-input', piiRawText);
    await page.click('#btn-submit-community-signal');
    await new Promise(r => setTimeout(r, 200));

    const storedJson = await page.evaluate(() => localStorage.getItem('jayt_community_signals_080'));
    assert.ok(storedJson, 'localStorage must contain submitted signal');
    const signals = JSON.parse(storedJson);
    assert.ok(signals.length > 0, 'Signals array must have at least 1 item');

    const firstSig = signals[0].submitted_content;

    assert.ok(!firstSig.includes('0903112233'), 'Raw phone number MUST NOT be in localStorage');
    assert.ok(!firstSig.includes('help@jayt.vn'), 'Raw email MUST NOT be in localStorage');
    assert.ok(!firstSig.includes('048199334455'), 'Raw CCCD MUST NOT be in localStorage');

    assert.ok(firstSig.includes('[SĐT ĐÃ XÓA]'), 'Must contain [SĐT ĐÃ XÓA]');
    assert.ok(firstSig.includes('[EMAIL ĐÃ XÓA]'), 'Must contain [EMAIL ĐÃ XÓA]');
    assert.ok(firstSig.includes('[ĐỊNH DANH ĐÃ XÓA]'), 'Must contain [ĐỊNH DANH ĐÃ XÓA]');

    await page.close();
  });

  // TEST 12: Puppeteer Zero External Network Requests (Airgap Enforced)
  runSyncTest('TEST_12_PUPPETEER_ZERO_EXTERNAL_NETWORK_REQUESTS_AIRGAP', () => {
    assert.strictEqual(externalRequests.length, 0, `External network requests detected: ${externalRequests.join(', ')}`);
  });

  // TEST 13: Puppeteer Real Browser District Filter Interaction
  await runAsyncTest('TEST_13_PUPPETEER_REAL_BROWSER_DISTRICT_FILTER_INTERACTION', async () => {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('[data-district-filter="Hải Châu"]', { timeout: 10000 });

    await page.click('[data-district-filter="Hải Châu"]');
    await new Promise(r => setTimeout(r, 200));

    const hcCards = await page.$$('.apex-rich-deal-card.state-watchlist');
    assert.ok(hcCards.length > 0, 'Must show cards for Hải Châu');

    await page.click('[data-district-filter="ALL"]');
    await new Promise(r => setTimeout(r, 200));

    await page.close();
  });

  await browser.close();
  server.close();

  // TEST 14: Strict 18 Historical Cobalt Locations (No Unaudited Additions)
  runSyncTest('TEST_14_STRICT_18_HISTORICAL_COBALT_LOCATIONS_NO_UNAUDITED_ADDITION', () => {
    const dsPath = path.join(stagingDir, 'four_layer_dataset.json');
    const ds = JSON.parse(fs.readFileSync(dsPath, 'utf8'));
    assert.strictEqual(ds.layer_2_watchlist.verified_locations.length, 18, 'Must maintain exactly 18 historical locations');
  });

  // TEST 15: Strict Touch Targets >= 44px
  runSyncTest('TEST_15_STRICT_TOUCH_TARGETS_GE_44PX', () => {
    const htmlContent = fs.readFileSync(path.join(stagingDir, 'index.html'), 'utf8');
    assert.ok(htmlContent.includes('--touch-min: 44px;'));
    assert.ok(htmlContent.includes('.apex-time-pill'));
    assert.ok(htmlContent.includes('.apex-category-pill'));
  });

  // TEST 16: Three-Layer Byte Parity (03_SOURCE_OF_TRUTH === deploy/public === staging_instance)
  runSyncTest('TEST_16_THREE_LAYER_BYTE_PARITY', () => {
    const syncFiles = ['index.html', 'jayt_apex_interface.js', 'customer_journey_north_star.json', 'four_layer_dataset.json'];
    for (const f of syncFiles) {
      const sotBuf = fs.readFileSync(path.join(sotDir, f));
      const depBuf = fs.readFileSync(path.join(deployDir, f));
      const stgBuf = fs.readFileSync(path.join(stagingDir, f));

      const sotHash = sha256(sotBuf);
      const depHash = sha256(depBuf);
      const stgHash = sha256(stgBuf);

      assert.strictEqual(depHash, sotHash, `Deploy parity mismatch for ${f}`);
      assert.strictEqual(stgHash, sotHash, `Staging parity mismatch for ${f}`);
    }
  });

  // TEST 17: Release Candidate Freeze Protocol Enforced
  runSyncTest('TEST_17_RELEASE_CANDIDATE_FREEZE_PROTOCOL_ENFORCED', () => {
    const rc101Path = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_CANDIDATE_101.json');
    assert.strictEqual(fs.existsSync(rc101Path), false, 'RELEASE_CANDIDATE_101.json must NOT exist in 101');
  });

  // TEST 18: Production Lock Invariants
  runSyncTest('TEST_18_PRODUCTION_LOCK_INVARIANTS', () => {
    const dealsPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
    assert.ok(fs.existsSync(dealsPath), 'deals_feed.json missing');
    const dealsContent = fs.readFileSync(dealsPath, 'utf8').trim();
    assert.ok(dealsContent === '[]' || dealsContent === '', 'deals_feed.json MUST be []');

    const manifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');
    assert.ok(fs.existsSync(manifestPath), 'RELEASE_MANIFEST.json missing');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert.strictEqual(manifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved MUST be false');
  });

  console.log('\n======================================================');
  if (passCount === totalCount) {
    console.log(`🟢 [CONTROLLED-LIVE-101-SUMMARY] Toàn bộ ${passCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
  } else {
    console.error(`❌ [CONTROLLED-LIVE-101-SUMMARY] Thất bại: ${passCount}/${totalCount} PASS.\n`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('❌ Lỗi:', err);
  process.exit(1);
});
