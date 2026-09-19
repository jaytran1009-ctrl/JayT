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
  console.log('🧪 [JAYT-102-TEST] Khởi chạy bộ kiểm thử Locality & Supply Resolution 102 (REAL BROWSER & 30 TARGETS AUDIT)...\n');

  // TEST 01: Project Memory Consistency (10/10 PASS)
  runSyncTest('TEST_01_MEMORY_CONSISTENCY_PASSES_ALL_10_TESTS', () => {
    const memTestPath = path.join(__dirname, 'test_project_memory_consistency.js');
    assert.ok(fs.existsSync(memTestPath), 'test_project_memory_consistency.js missing');
    const out = execSync(`node "${memTestPath}"`, { encoding: 'utf8', cwd: repoRoot });
    assert.ok(out.includes('10/10') && out.includes('PASS'), 'Project memory must pass 10/10');
  });

  // TEST 02: Negative Taxonomy Enforcement for 094 Through 102
  runSyncTest('TEST_02_NEGATIVE_TAXONOMY_ENFORCEMENT_FOR_094_THROUGH_102', () => {
    const { validateGlobalStatusTaxonomy067 } = require('./memory_transaction_manager_057.js');
    const nonApprovedWos = ['094', '094A', '094B', '095', '096', '097', '098', '099', '099A', '100', '101', '102'];
    for (const wo of nonApprovedWos) {
      assert.throws(() => {
        validateGlobalStatusTaxonomy067(`| \`2026-08-25T16:20:00+07:00\` | \`JAYT-${wo}\` | Desc | Art | Test | **ACCEPTED BY CEO** |`);
      }, /STATUS_TAXONOMY_VIOLATION_067/, `Work order ${wo} MUST fail-closed when claiming ACCEPTED BY CEO`);

      assert.throws(() => {
        validateGlobalStatusTaxonomy067(`| \`2026-08-25T16:20:00+07:00\` | \`JAYT-${wo}\` | Desc | Art | Test | **CEO APPROVED** |`);
      }, /STATUS_TAXONOMY_VIOLATION_067/, `Work order ${wo} MUST fail-closed when claiming CEO APPROVED`);
    }
  });

  // TEST 03: Batch 102 Summary Exists With Authentic and Fail-Closed Split
  runSyncTest('TEST_03_BATCH_102_SUMMARY_EXISTS_WITH_AUTHENTIC_AND_FAIL_CLOSED_SPLIT', () => {
    const sumPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_102', 'batch_102_summary.json');
    assert.ok(fs.existsSync(sumPath), 'batch_102_summary.json missing');
    const sum = JSON.parse(fs.readFileSync(sumPath, 'utf8'));

    assert.strictEqual(sum.targets_total, 25, 'Must have 25 targets in batch 102');
    assert.strictEqual(sum.authenticated_count, 16, 'Must have 16 authenticated in batch 102');
    assert.strictEqual(sum.failed_count, 9, 'Must have 9 failed captures in batch 102');
  });

  // TEST 04: Locality Resolution Report Exists and Valid
  runSyncTest('TEST_04_LOCALITY_RESOLUTION_REPORT_EXISTS_AND_VALID', () => {
    const repPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'locality_and_supply_resolution_102.json');
    assert.ok(fs.existsSync(repPath), 'locality_and_supply_resolution_102.json missing');
    const rep = JSON.parse(fs.readFileSync(repPath, 'utf8'));

    assert.strictEqual(rep.summary_metrics.total_targets_analyzed, 30, 'Total analyzed targets must be 30');
    assert.strictEqual(rep.summary_metrics.authenticated_sources, 21, 'Authenticated sources must be 21');
    assert.strictEqual(rep.summary_metrics.failed_sources, 9, 'Failed sources must be 9');
    assert.strictEqual(rep.summary_metrics.verified_locations_cobalt, 7, 'Cobalt candidate targets must be 7');
    assert.strictEqual(rep.summary_metrics.official_sources_no_locality_amber, 14, 'Amber sources must be 14');
    assert.strictEqual(rep.summary_metrics.proven_promotions_count, 0, 'Proven promotions MUST be 0');
    assert.strictEqual(rep.summary_metrics.unproven_promotions_count, 21, 'Unproven promotions must be 21');
  });

  // TEST 05: Exact Extracted Addresses Have Line, Offset, and SHA-256
  runSyncTest('TEST_05_EXACT_EXTRACTED_ADDRESSES_HAVE_LINE_OFFSET_AND_SHA256', () => {
    const repPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'locality_and_supply_resolution_102.json');
    const rep = JSON.parse(fs.readFileSync(repPath, 'utf8'));

    for (const cob of rep.cobalt_candidates_audited) {
      assert.ok(cob.extracted_addresses.length > 0, `Cobalt target ${cob.target_id} must have extracted addresses`);
      for (const addr of cob.extracted_addresses) {
        assert.ok(addr.line_number >= 1, 'Line number must be >= 1');
        assert.ok(addr.char_offset >= 0, 'Char offset must be >= 0');
        assert.ok(addr.snippet.length >= 15, 'Snippet must be >= 15 chars');
        assert.strictEqual(addr.snippet_sha256, sha256(addr.snippet), 'Snippet SHA-256 mismatch');
      }
    }
  });

  // TEST 06: Zero Promotion or Deal Claimed for Any Source
  runSyncTest('TEST_06_ZERO_PROMOTION_OR_DEAL_CLAIMED_FOR_ANY_SOURCE', () => {
    const repPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'locality_and_supply_resolution_102.json');
    const rep = JSON.parse(fs.readFileSync(repPath, 'utf8'));

    assert.strictEqual(rep.summary_metrics.proven_promotions_count, 0, 'Must have 0 proven promotions');
    for (const cob of rep.cobalt_candidates_audited) {
      assert.strictEqual(cob.promotion_status, 'PROMOTION_UNPROVEN');
      assert.strictEqual(cob.promotion_disclaimer, 'Địa điểm chính thức — ưu đãi online chưa đủ dữ kiện; kiểm tra trực tiếp tại quán.');
    }
    for (const amb of rep.amber_sources_audited) {
      assert.strictEqual(amb.promotion_status, 'PROMOTION_UNPROVEN');
      assert.strictEqual(amb.promotion_disclaimer, 'Địa điểm chính thức — ưu đãi online chưa đủ dữ kiện; kiểm tra trực tiếp tại quán.');
    }
  });

  // TEST 07: Physical On-Disk Artifacts Integrity for All Authenticated Captures
  runSyncTest('TEST_07_PHYSICAL_ON_DISK_ARTIFACTS_INTEGRITY_FOR_ALL_AUTHENTICATED_CAPTURES', () => {
    const repPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'locality_and_supply_resolution_102.json');
    const rep = JSON.parse(fs.readFileSync(repPath, 'utf8'));

    const allAuth = [...rep.cobalt_candidates_audited, ...rep.amber_sources_audited];
    assert.strictEqual(allAuth.length, 21);

    for (const item of allAuth) {
      assert.ok(item.artifacts.page_html.path, 'Missing page_html path');
      assert.ok(item.artifacts.page_txt.path, 'Missing page_txt path');
      assert.ok(item.artifacts.page_png.path, 'Missing page_png path');

      const htmlFull = path.join(repoRoot, item.artifacts.page_html.path);
      const txtFull = path.join(repoRoot, item.artifacts.page_txt.path);
      const pngFull = path.join(repoRoot, item.artifacts.page_png.path);

      assert.ok(fs.existsSync(htmlFull), `HTML missing on disk: ${htmlFull}`);
      assert.ok(fs.existsSync(txtFull), `TXT missing on disk: ${txtFull}`);
      assert.ok(fs.existsSync(pngFull), `PNG missing on disk: ${pngFull}`);

      assert.strictEqual(sha256(fs.readFileSync(htmlFull)), item.artifacts.page_html.sha256);
      assert.strictEqual(sha256(fs.readFileSync(txtFull)), item.artifacts.page_txt.sha256);
      assert.strictEqual(sha256(fs.readFileSync(pngFull)), item.artifacts.page_png.sha256);
    }
  });

  // TEST 08: Fail-Closed Invariant for All Failed Captures
  runSyncTest('TEST_08_FAIL_CLOSED_INVARIANT_FOR_ALL_FAILED_CAPTURES', () => {
    const repPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'locality_and_supply_resolution_102.json');
    const rep = JSON.parse(fs.readFileSync(repPath, 'utf8'));

    assert.strictEqual(rep.failed_sources_audited.length, 9);
    for (const fail of rep.failed_sources_audited) {
      assert.strictEqual(fail.classification, 'UNRESOLVED_FAILED_CAPTURE');
      assert.ok(fail.error, 'Failed target must have error message');
    }
  });

  // TEST 09: Updated Disclaimer Copy in Dataset and Interface
  runSyncTest('TEST_09_UPDATED_DISCLAIMER_COPY_IN_DATASET_AND_INTERFACE', () => {
    const dsPath = path.join(stagingDir, 'four_layer_dataset.json');
    const ds = JSON.parse(fs.readFileSync(dsPath, 'utf8'));
    for (const loc of ds.layer_2_watchlist.verified_locations) {
      assert.strictEqual(loc.status_disclaimer, 'Địa điểm từng được ghi nhận từ nguồn chính thức; vui lòng kiểm tra trạng thái hiện tại tại nguồn.');
    }
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

  // TEST 10: Puppeteer Real Browser on Staging Instance 5 Slots
  await runAsyncTest('TEST_10_PUPPETEER_REAL_BROWSER_ON_STAGING_INSTANCE_5_SLOTS', async () => {
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
    assert.ok(title0730.includes('Cà Phê Sáng'));

    // Slot 11:15
    await page.click('[data-time-slot="SLOT_1115"]');
    await new Promise(r => setTimeout(r, 150));
    const title1115 = await page.$eval('.apex-hero-title', el => el.textContent);
    assert.ok(title1115.includes('Bữa Trưa Nhanh'));

    // Slot 14:15
    await page.click('[data-time-slot="SLOT_1415"]');
    await new Promise(r => setTimeout(r, 150));
    const title1415 = await page.$eval('.apex-hero-title', el => el.textContent);
    assert.ok(title1415.includes('Trà Chiều'));

    // Slot 17:30
    await page.click('[data-time-slot="SLOT_1730"]');
    await new Promise(r => setTimeout(r, 150));
    const title1730 = await page.$eval('.apex-hero-title', el => el.textContent);
    assert.ok(title1730.includes('Kèo Tối'));

    // Slot 21:00
    await page.click('[data-time-slot="SLOT_2100"]');
    await new Promise(r => setTimeout(r, 150));
    const title2100 = await page.$eval('.apex-hero-title', el => el.textContent);
    assert.ok(title2100.includes('Ăn Đêm'));

    await page.close();
  });

  // TEST 11: Puppeteer Real Browser Split Bill Interactive & Escape Key
  await runAsyncTest('TEST_11_PUPPETEER_REAL_BROWSER_SPLIT_BILL_INTERACTIVE_AND_ESCAPE', async () => {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('#btn-open-calc-sheet', { timeout: 10000 });

    await page.click('#btn-open-calc-sheet');
    await new Promise(r => setTimeout(r, 150));

    const sheetVisibleBefore = await page.$eval('#calc-bottom-sheet-overlay', el => el.classList.contains('active'));
    assert.strictEqual(sheetVisibleBefore, true);

    await page.$eval('#sheet-input-price', el => { el.value = '600000'; el.dispatchEvent(new Event('input')); });
    await page.$eval('#sheet-input-voucher', el => { el.value = '120000'; el.dispatchEvent(new Event('input')); });
    await page.$eval('#sheet-input-split', el => { el.value = '4'; el.dispatchEvent(new Event('input')); });
    await new Promise(r => setTimeout(r, 150));

    const perPersonText = await page.$eval('#sheet-val-per-person', el => el.textContent);
    assert.ok(perPersonText.includes('120.000') || perPersonText.includes('120,000'));

    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 150));

    const sheetVisibleAfter = await page.$eval('#calc-bottom-sheet-overlay', el => el.classList.contains('active'));
    assert.strictEqual(sheetVisibleAfter, false);

    await page.close();
  });

  // TEST 12: Puppeteer Real Browser PII Submission & Live LocalStorage Assertion
  await runAsyncTest('TEST_12_PUPPETEER_REAL_BROWSER_PII_SUBMISSION_AND_LOCALSTORAGE', async () => {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('#community-signal-input', { timeout: 10000 });

    await page.evaluate(() => localStorage.removeItem('jayt_community_signals_080'));

    const piiRawText = 'Quán D giảm giá liên hệ 0909123456 hoặc info@brand.vn CCCD 048188223344';
    await page.type('#community-signal-input', piiRawText);
    await page.click('#btn-submit-community-signal');
    await new Promise(r => setTimeout(r, 200));

    const storedJson = await page.evaluate(() => localStorage.getItem('jayt_community_signals_080'));
    assert.ok(storedJson);
    const signals = JSON.parse(storedJson);
    assert.ok(signals.length > 0);

    const firstSig = signals[0].submitted_content;
    assert.ok(!firstSig.includes('0909123456'));
    assert.ok(!firstSig.includes('info@brand.vn'));
    assert.ok(!firstSig.includes('048188223344'));

    assert.ok(firstSig.includes('[SĐT ĐÃ XÓA]'));
    assert.ok(firstSig.includes('[EMAIL ĐÃ XÓA]'));
    assert.ok(firstSig.includes('[ĐỊNH DANH ĐÃ XÓA]'));

    await page.close();
  });

  // TEST 13: Puppeteer Zero External Network Requests (Airgap Enforced)
  runSyncTest('TEST_13_PUPPETEER_ZERO_EXTERNAL_NETWORK_REQUESTS_AIRGAP', () => {
    assert.strictEqual(externalRequests.length, 0, `External network requests detected: ${externalRequests.join(', ')}`);
  });

  // TEST 14: Puppeteer Real Browser District Filter Interaction
  await runAsyncTest('TEST_14_PUPPETEER_REAL_BROWSER_DISTRICT_FILTER_INTERACTION', async () => {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('[data-district-filter="Hải Châu"]', { timeout: 10000 });

    await page.click('[data-district-filter="Hải Châu"]');
    await new Promise(r => setTimeout(r, 200));

    const hcCards = await page.$$('.apex-rich-deal-card.state-watchlist');
    assert.ok(hcCards.length > 0);

    await page.click('[data-district-filter="ALL"]');
    await new Promise(r => setTimeout(r, 200));

    await page.close();
  });

  await browser.close();
  server.close();

  // TEST 15: Strict 18 Historical Cobalt Locations Preserved Pending CEO Decision
  runSyncTest('TEST_15_STRICT_18_HISTORICAL_COBALT_LOCATIONS_PRESERVED_PENDING_CEO_DECISION', () => {
    const dsPath = path.join(stagingDir, 'four_layer_dataset.json');
    const ds = JSON.parse(fs.readFileSync(dsPath, 'utf8'));
    assert.strictEqual(ds.layer_2_watchlist.verified_locations.length, 18, 'Must maintain exactly 18 historical locations pending CEO review');
  });

  // TEST 16: Strict Touch Targets >= 44px
  runSyncTest('TEST_16_STRICT_TOUCH_TARGETS_GE_44PX', () => {
    const htmlContent = fs.readFileSync(path.join(stagingDir, 'index.html'), 'utf8');
    assert.ok(htmlContent.includes('--touch-min: 44px;'));
  });

  // TEST 17: Three-Layer Byte Parity
  runSyncTest('TEST_17_THREE_LAYER_BYTE_PARITY', () => {
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

  // TEST 18: Release Candidate Freeze Protocol Enforced
  runSyncTest('TEST_18_RELEASE_CANDIDATE_FREEZE_PROTOCOL_ENFORCED', () => {
    const rc102Path = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_CANDIDATE_102.json');
    assert.strictEqual(fs.existsSync(rc102Path), false, 'RELEASE_CANDIDATE_102.json must NOT exist in 102');
  });

  // TEST 19: Production Lock Invariants
  runSyncTest('TEST_19_PRODUCTION_LOCK_INVARIANTS', () => {
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
    console.log(`🟢 [LOCALITY-RESOLUTION-102-SUMMARY] Toàn bộ ${passCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
  } else {
    console.error(`❌ [LOCALITY-RESOLUTION-102-SUMMARY] Thất bại: ${passCount}/${totalCount} PASS.\n`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('❌ Lỗi:', err);
  process.exit(1);
});
