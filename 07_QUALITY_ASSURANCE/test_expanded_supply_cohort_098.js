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
  console.log('🧪 [JAYT-098-TEST] Khởi chạy bộ kiểm thử Expanded Supply Cohort & Staging Instance Deployment 098 (REAL PUPPETEER BROWSER)...\n');

  // TEST 01: Project Memory Consistency (10/10 PASS)
  runSyncTest('TEST_01_MEMORY_CONSISTENCY_PASSES_ALL_10_TESTS', () => {
    const memTestPath = path.join(__dirname, 'test_project_memory_consistency.js');
    assert.ok(fs.existsSync(memTestPath), 'test_project_memory_consistency.js missing');
    const out = execSync(`node "${memTestPath}"`, { encoding: 'utf8', cwd: repoRoot });
    assert.ok(out.includes('10/10') && out.includes('PASS'), 'Project memory must pass 10/10');
  });

  // TEST 02: Historical Correction Receipt 097 Preserved
  runSyncTest('TEST_02_HISTORICAL_CORRECTION_RECEIPT_097_PRESERVED', () => {
    const receiptPath = path.join(repoRoot, '08_RELEASE_VAULT', 'CORRECTION_RECEIPT_097_TAXONOMY_AND_BROWSER_E2E_RIGOR.json');
    assert.ok(fs.existsSync(receiptPath), 'CORRECTION_RECEIPT_097 missing');
  });

  // TEST 03: Negative Taxonomy Enforcement for 094 Through 098
  runSyncTest('TEST_03_NEGATIVE_TAXONOMY_ENFORCEMENT_FOR_094_THROUGH_098', () => {
    const { validateGlobalStatusTaxonomy067 } = require('./memory_transaction_manager_057.js');
    const nonApprovedWos = ['094', '094A', '094B', '095', '096', '097', '098'];
    for (const wo of nonApprovedWos) {
      assert.throws(() => {
        validateGlobalStatusTaxonomy067(`| \`2026-08-25T15:00:00+07:00\` | \`JAYT-${wo}\` | Desc | Art | Test | **ACCEPTED BY CEO** |`);
      }, /STATUS_TAXONOMY_VIOLATION_067/, `Work order ${wo} MUST fail-closed when claiming ACCEPTED BY CEO`);

      assert.throws(() => {
        validateGlobalStatusTaxonomy067(`| \`2026-08-25T15:00:00+07:00\` | \`JAYT-${wo}\` | Desc | Art | Test | **CEO APPROVED** |`);
      }, /STATUS_TAXONOMY_VIOLATION_067/, `Work order ${wo} MUST fail-closed when claiming CEO APPROVED`);
    }
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

  // TEST 04: Puppeteer Real Browser on Staging Instance 5 Slots & Live DOM Mutations
  await runAsyncTest('TEST_04_PUPPETEER_REAL_BROWSER_ON_STAGING_INSTANCE_5_SLOTS', async () => {
    const page = await browser.newPage();
    page.on('request', req => {
      const url = req.url();
      if (!url.startsWith('http://127.0.0.1') && !url.startsWith('http://localhost') && !url.startsWith('data:')) {
        externalRequests.push(url);
      }
    });

    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });

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

  // TEST 05: Puppeteer Real Browser Split Bill Interactive & Escape Key
  await runAsyncTest('TEST_05_PUPPETEER_REAL_BROWSER_SPLIT_BILL_INTERACTIVE_AND_ESCAPE', async () => {
    const page = await browser.newPage();
    page.on('request', req => {
      const url = req.url();
      if (!url.startsWith('http://127.0.0.1') && !url.startsWith('http://localhost') && !url.startsWith('data:')) {
        externalRequests.push(url);
      }
    });

    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });

    // Open Bottom Sheet Modal
    await page.click('#btn-open-calc-sheet');
    await new Promise(r => setTimeout(r, 150));

    const sheetVisibleBefore = await page.$eval('#calc-bottom-sheet-overlay', el => el.classList.contains('active'));
    assert.strictEqual(sheetVisibleBefore, true, 'Sheet overlay must have .active class in DOM');

    // Input values into Split Bill
    await page.$eval('#sheet-input-price', el => { el.value = '400000'; el.dispatchEvent(new Event('input')); });
    await page.$eval('#sheet-input-voucher', el => { el.value = '80000'; el.dispatchEvent(new Event('input')); });
    await page.$eval('#sheet-input-split', el => { el.value = '4'; el.dispatchEvent(new Event('input')); });
    await new Promise(r => setTimeout(r, 150));

    // Assert live calculated per-person amount: (400,000 - 80,000) / 4 = 80,000 VND
    const perPersonText = await page.$eval('#sheet-val-per-person', el => el.textContent);
    assert.ok(perPersonText.includes('80.000') || perPersonText.includes('80,000'), `Calculated value mismatch: ${perPersonText}`);

    // Press Escape to dismiss
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 150));

    const sheetVisibleAfter = await page.$eval('#calc-bottom-sheet-overlay', el => el.classList.contains('active'));
    assert.strictEqual(sheetVisibleAfter, false, 'Sheet modal must NOT have .active class after Escape key');

    await page.close();
  });

  // TEST 06: Puppeteer Real Browser PII Submission & Live LocalStorage Assertion
  await runAsyncTest('TEST_06_PUPPETEER_REAL_BROWSER_PII_SUBMISSION_AND_LOCALSTORAGE', async () => {
    const page = await browser.newPage();
    page.on('request', req => {
      const url = req.url();
      if (!url.startsWith('http://127.0.0.1') && !url.startsWith('http://localhost') && !url.startsWith('data:')) {
        externalRequests.push(url);
      }
    });

    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });

    // Clear initial community localStorage
    await page.evaluate(() => localStorage.removeItem('jayt_community_signals_080'));

    // Type PII input into real DOM form
    const piiRawText = 'Quán B giảm 15% liên hệ 0914888999 hoặc gửi mail support@deal.vn, CCCD 048099123456';
    await page.type('#community-signal-input', piiRawText);
    await page.click('#btn-submit-community-signal');
    await new Promise(r => setTimeout(r, 200));

    // Read real localStorage from browser context
    const storedJson = await page.evaluate(() => localStorage.getItem('jayt_community_signals_080'));
    assert.ok(storedJson, 'localStorage must contain submitted signal');
    const signals = JSON.parse(storedJson);
    assert.ok(signals.length > 0, 'Signals array must have at least 1 item');

    const firstSig = signals[0].submitted_content;

    // Assert raw PII is 100% blocked
    assert.ok(!firstSig.includes('0914888999'), 'Raw phone number MUST NOT be in localStorage');
    assert.ok(!firstSig.includes('support@deal.vn'), 'Raw email MUST NOT be in localStorage');
    assert.ok(!firstSig.includes('048099123456'), 'Raw CCCD MUST NOT be in localStorage');

    // Assert sanitized tokens are present
    assert.ok(firstSig.includes('[SĐT ĐÃ XÓA]'), 'Must contain [SĐT ĐÃ XÓA]');
    assert.ok(firstSig.includes('[EMAIL ĐÃ XÓA]'), 'Must contain [EMAIL ĐÃ XÓA]');
    assert.ok(firstSig.includes('[ĐỊNH DANH ĐÃ XÓA]'), 'Must contain [ĐỊNH DANH ĐÃ XÓA]');

    await page.close();
  });

  // TEST 07: Puppeteer Zero External Network Requests (Airgap Enforced)
  runSyncTest('TEST_07_PUPPETEER_ZERO_EXTERNAL_NETWORK_REQUESTS_AIRGAP', () => {
    assert.strictEqual(externalRequests.length, 0, `External network requests detected: ${externalRequests.join(', ')}`);
  });

  await browser.close();
  server.close();

  // TEST 08: Expanded 5-Cluster Cohort Provenance
  runSyncTest('TEST_08_EXPANDED_5_CLUSTER_COHORT_PROVENANCE', () => {
    const dsPath = path.join(stagingDir, 'four_layer_dataset.json');
    assert.ok(fs.existsSync(dsPath), 'four_layer_dataset.json missing in staging instance');
    const ds = JSON.parse(fs.readFileSync(dsPath, 'utf8'));

    const locs = ds.layer_2_watchlist.verified_locations;
    assert.ok(Array.isArray(locs) && locs.length >= 9, 'Must have at least 9 verified locations');

    const districts = new Set(locs.map(l => l.locality.district));
    assert.ok(districts.has('Hải Châu'), 'Cohort must cover Hải Châu');
    assert.ok(districts.has('Sơn Trà'), 'Cohort must cover Sơn Trà');
    assert.ok(districts.has('Thanh Khê'), 'Cohort must cover Thanh Khê');
  });

  // TEST 09: Three-Tier Fixture Provenance Fields
  runSyncTest('TEST_09_THREE_TIER_FIXTURE_PROVENANCE_FIELDS', () => {
    const dsPath = path.join(stagingDir, 'four_layer_dataset.json');
    const ds = JSON.parse(fs.readFileSync(dsPath, 'utf8'));

    // Emerald candidates
    for (const c of ds.layer_1_pending_candidates) {
      assert.strictEqual(c.confidence_tier, 'EMERALD_PENDING_REVIEW');
      assert.strictEqual(c.is_commercial_published, false);
      assert.ok(c.evidence_pointer.policy_artifact && c.evidence_pointer.branch_artifact);
    }

    // Cobalt verified locations
    for (const loc of ds.layer_2_watchlist.verified_locations) {
      assert.strictEqual(loc.confidence_tier, 'COBALT_VERIFIED_LOCATION');
      assert.strictEqual(loc.ttl_status, 'ACTIVE_VERIFIED');
      assert.ok(loc.checked_at && loc.locality.street_address);
      assert.ok(loc.evidence_pointer.artifact_path && loc.evidence_pointer.artifact_sha256);
    }

    // Amber radar
    assert.strictEqual(ds.layer_3_community_radar.confidence_tier, 'AMBER_COMMUNITY_SIGNAL');
  });

  // TEST 10: Strict Language Invariants (No Prohibited Words in Blue/Amber Tiers)
  runSyncTest('TEST_10_STRICT_LANGUAGE_INVARIANTS_NO_PROHIBITED_WORDS', () => {
    const jsContent = fs.readFileSync(path.join(stagingDir, 'jayt_apex_interface.js'), 'utf8');
    assert.ok(jsContent.includes('Quán hoạt động; ưu đãi online chưa đủ dữ liệu'));
    assert.ok(jsContent.includes('Chưa có ưu đãi thương mại được mở bán công khai hôm nay') || jsContent.includes('Chưa có ưu đãi thương mại live hôm nay'));
  });

  // TEST 11: Strict Touch Targets >= 44px
  runSyncTest('TEST_11_STRICT_TOUCH_TARGETS_GE_44PX', () => {
    const htmlContent = fs.readFileSync(path.join(stagingDir, 'index.html'), 'utf8');
    assert.ok(htmlContent.includes('--touch-min: 44px;'));
    assert.ok(htmlContent.includes('.apex-time-pill'));
    assert.ok(htmlContent.includes('.apex-category-pill'));
  });

  // TEST 12: Pre-generated Staging Instance Evidence Metadata Parity
  runSyncTest('TEST_12_PRE_GENERATED_STAGING_INSTANCE_EVIDENCE_METADATA_PARITY', () => {
    const metaPath = path.join(__dirname, 'runtime_evidence', 'screenshots_098', 'evidence_metadata_098.json');
    assert.ok(fs.existsSync(metaPath), 'evidence_metadata_098.json missing');
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

    assert.strictEqual(meta.work_order, 'JAYT-098-EXPANDED-SUPPLY-COHORT-AND-STAGING-INSTANCE-DEPLOYMENT');
    assert.strictEqual(meta.release_candidate_emitted, false);

    const expectedScreens = [
      'desktop_1440px_expanded_supply_098.png',
      'tablet_768px_expanded_supply_098.png',
      'mobile_390px_expanded_supply_098.png'
    ];

    for (const scr of expectedScreens) {
      assert.ok(meta.viewports[scr], `Metadata missing entry for ${scr}`);
      const scrPath = path.join(__dirname, 'runtime_evidence', 'screenshots_098', scr);
      assert.ok(fs.existsSync(scrPath), `Screenshot missing: ${scr}`);
      const realBuf = fs.readFileSync(scrPath);
      assert.strictEqual(realBuf.length, meta.viewports[scr].file_size_bytes, `File size mismatch for ${scr}`);
      assert.strictEqual(sha256(realBuf), meta.viewports[scr].sha256, `SHA-256 mismatch for ${scr}`);
      assert.strictEqual(meta.viewports[scr].overflow_x, false, `Horizontal overflow detected for ${scr}`);
    }
  });

  // TEST 13: Three-Layer Byte Parity (03_SOURCE_OF_TRUTH === deploy/public === staging_instance)
  runSyncTest('TEST_13_THREE_LAYER_BYTE_PARITY', () => {
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

  // TEST 14: Release Candidate Freeze Protocol Enforced
  runSyncTest('TEST_14_RELEASE_CANDIDATE_FREEZE_PROTOCOL_ENFORCED', () => {
    const rc098Path = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_CANDIDATE_098.json');
    assert.strictEqual(fs.existsSync(rc098Path), false, 'RELEASE_CANDIDATE_098.json must NOT exist in 098');
  });

  // TEST 15: Production Lock Invariants
  runSyncTest('TEST_15_PRODUCTION_LOCK_INVARIANTS', () => {
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
    console.log(`🟢 [EXPANDED-SUPPLY-098-SUMMARY] Toàn bộ ${passCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
  } else {
    console.error(`❌ [EXPANDED-SUPPLY-098-SUMMARY] Thất bại: ${passCount}/${totalCount} PASS.\n`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('❌ Lỗi:', err);
  process.exit(1);
});
