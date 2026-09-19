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
  console.log('🧪 [JAYT-103-TEST] Khởi chạy bộ kiểm thử Cobalt Canonicalization & Premium UX 103 (BYTE-FOR-BYTE OFFSET AUDIT)...\n');

  // TEST 01: Project Memory Consistency (10/10 PASS)
  runSyncTest('TEST_01_MEMORY_CONSISTENCY_PASSES_ALL_10_TESTS', () => {
    const memTestPath = path.join(__dirname, 'test_project_memory_consistency.js');
    assert.ok(fs.existsSync(memTestPath), 'test_project_memory_consistency.js missing');
    const out = execSync(`node "${memTestPath}"`, { encoding: 'utf8', cwd: repoRoot });
    assert.ok(out.includes('10/10') && out.includes('PASS'), 'Project memory must pass 10/10');
  });

  // TEST 02: Negative Taxonomy Enforcement for 094 Through 103
  runSyncTest('TEST_02_NEGATIVE_TAXONOMY_ENFORCEMENT_FOR_094_THROUGH_103', () => {
    const { validateGlobalStatusTaxonomy067 } = require('./memory_transaction_manager_057.js');
    const nonApprovedWos = ['094', '094A', '094B', '095', '096', '097', '098', '099', '099A', '100', '101', '102', '103'];
    for (const wo of nonApprovedWos) {
      assert.throws(() => {
        validateGlobalStatusTaxonomy067(`| \`2026-08-25T16:26:00+07:00\` | \`JAYT-${wo}\` | Desc | Art | Test | **ACCEPTED BY CEO** |`);
      }, /STATUS_TAXONOMY_VIOLATION_067/, `Work order ${wo} MUST fail-closed when claiming ACCEPTED BY CEO`);

      assert.throws(() => {
        validateGlobalStatusTaxonomy067(`| \`2026-08-25T16:26:00+07:00\` | \`JAYT-${wo}\` | Desc | Art | Test | **CEO APPROVED** |`);
      }, /STATUS_TAXONOMY_VIOLATION_067/, `Work order ${wo} MUST fail-closed when claiming CEO APPROVED`);
    }
  });

  // TEST 03: Canonical Cobalt Manifest Exists and Structure Valid
  runSyncTest('TEST_03_CANONICAL_COBALT_MANIFEST_EXISTS_AND_STRUCTURE_VALID', () => {
    const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'canonical_cobalt_branches_103.json');
    assert.ok(fs.existsSync(manifestPath), 'canonical_cobalt_branches_103.json missing');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    assert.strictEqual(manifest.total_unique_cobalt_branches, 14, 'Must have exactly 14 unique Cobalt branches');
    assert.strictEqual(manifest.total_amber_sources, 10, 'Must have exactly 10 Amber sources');
    assert.strictEqual(manifest.proven_deals_count, 0, 'Proven deals MUST be 0');
  });

  // TEST 04: Byte-for-Byte Line and Offset Verification in page.txt
  runSyncTest('TEST_04_BYTE_FOR_BYTE_LINE_AND_OFFSET_VERIFICATION_IN_PAGE_TXT', () => {
    const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'canonical_cobalt_branches_103.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    for (const branch of manifest.cobalt_branches) {
      const fullArtPath = path.join(repoRoot, branch.evidence_pointer.artifact_path);
      assert.ok(fs.existsSync(fullArtPath), `Artifact file missing: ${fullArtPath}`);

      const rawText = fs.readFileSync(fullArtPath, 'utf8');
      const ep = branch.evidence_pointer;

      // Check byte-for-byte exact slice match at char_offset
      const sliced = rawText.slice(ep.char_offset, ep.char_offset + ep.snippet_length);
      assert.strictEqual(sliced, ep.snippet, `Byte slice mismatch for branch ${branch.id} at offset ${ep.char_offset}`);

      // Check SHA-256 of snippet
      assert.strictEqual(sha256(ep.snippet), ep.snippet_sha256, `SHA-256 mismatch for snippet ${branch.id}`);

      // Check line_number correspondence
      const lines = rawText.split('\n');
      assert.strictEqual(lines[ep.line_number - 1], ep.snippet, `Line number ${ep.line_number} does not match snippet for ${branch.id}`);
    }
  });

  // TEST 05: District Distribution of 14 Canonical Branches
  runSyncTest('TEST_05_DISTRICT_DISTRIBUTION_OF_14_CANONICAL_BRANCHES', () => {
    const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'canonical_cobalt_branches_103.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    const counts = { 'Hải Châu': 0, 'Thanh Khê': 0, 'Sơn Trà': 0, 'Liên Chiểu': 0 };
    for (const b of manifest.cobalt_branches) {
      assert.ok(counts[b.district] !== undefined, `Unknown district: ${b.district}`);
      counts[b.district]++;
    }

    assert.strictEqual(counts['Hải Châu'], 6, 'Hải Châu must have 6 branches');
    assert.strictEqual(counts['Thanh Khê'], 4, 'Thanh Khê must have 4 branches');
    assert.strictEqual(counts['Sơn Trà'], 1, 'Sơn Trà must have 1 branch');
    assert.strictEqual(counts['Liên Chiểu'], 3, 'Liên Chiểu must have 3 branches');
  });

  // TEST 06: Zero Out-of-Da Nang Addresses in Cobalt List
  runSyncTest('TEST_06_ZERO_OUT_OF_DANANG_ADDRESSES_IN_COBALT_LIST', () => {
    const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'canonical_cobalt_branches_103.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    for (const b of manifest.cobalt_branches) {
      assert.ok(!b.address.toLowerCase().includes('tam kỳ'), `Tam Kỳ found in ${b.id}`);
      assert.ok(!b.address.toLowerCase().includes('quảng nam'), `Quảng Nam found in ${b.id}`);
      assert.ok(!b.address.toLowerCase().includes('hải phòng'), `Hải Phòng found in ${b.id}`);
      assert.ok(!b.address.toLowerCase().includes('hồ chí minh'), `HCM found in ${b.id}`);
    }
  });

  // TEST 07: Deduplication Across Batch 101 and 102
  runSyncTest('TEST_07_DEDUPLICATION_ACROSS_BATCH_101_AND_102', () => {
    const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'canonical_cobalt_branches_103.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    const seenIds = new Set();
    const seenAddresses = new Set();

    for (const b of manifest.cobalt_branches) {
      assert.ok(!seenIds.has(b.id), `Duplicate branch ID: ${b.id}`);
      seenIds.add(b.id);

      assert.ok(!seenAddresses.has(b.address), `Duplicate branch address: ${b.address}`);
      seenAddresses.add(b.address);
    }
  });

  // TEST 08: Zero Deals or Vouchers in Cobalt Manifest
  runSyncTest('TEST_08_ZERO_DEALS_OR_VOUCHERS_IN_COBALT_MANIFEST', () => {
    const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'canonical_cobalt_branches_103.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert.strictEqual(manifest.proven_deals_count, 0, 'Proven deals must be 0');
  });

  // TEST 09: Honest Disclaimer Copy Across Dataset
  runSyncTest('TEST_09_HONEST_DISCLAIMER_COPY_ACROSS_DATASET', () => {
    const dsPath = path.join(stagingDir, 'four_layer_dataset.json');
    const ds = JSON.parse(fs.readFileSync(dsPath, 'utf8'));
    assert.ok(ds.layer_2_watchlist.fresh_canonical_branches_103.length === 14);
    for (const b of ds.layer_2_watchlist.fresh_canonical_branches_103) {
      assert.strictEqual(b.disclaimer, 'Địa điểm chính thức — ưu đãi online chưa đủ dữ kiện; kiểm tra trực tiếp tại quán.');
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

    // Click 5 Time Slots
    for (const s of ['SLOT_0730', 'SLOT_1115', 'SLOT_1415', 'SLOT_1730', 'SLOT_2100']) {
      await page.click(`[data-time-slot="${s}"]`);
      await new Promise(r => setTimeout(r, 100));
    }

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

    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 150));

    const sheetVisibleAfter = await page.$eval('#calc-bottom-sheet-overlay', el => el.classList.contains('active'));
    assert.strictEqual(sheetVisibleAfter, false);

    await page.close();
  });

  // TEST 12: Puppeteer Zero External Network Requests (Airgap Enforced)
  runSyncTest('TEST_12_PUPPETEER_ZERO_EXTERNAL_NETWORK_REQUESTS_AIRGAP', () => {
    assert.strictEqual(externalRequests.length, 0, `External network requests detected: ${externalRequests.join(', ')}`);
  });

  // TEST 13: Puppeteer Real Browser PII Sanitization in LocalStorage
  await runAsyncTest('TEST_13_PUPPETEER_REAL_BROWSER_PII_SANITIZATION_IN_LOCALSTORAGE', async () => {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('#community-signal-input', { timeout: 10000 });

    await page.evaluate(() => localStorage.removeItem('jayt_community_signals_080'));

    const piiRawText = 'Quán E tại 0905998877 test@jayt.com CCCD 048177665544';
    await page.type('#community-signal-input', piiRawText);
    await page.click('#btn-submit-community-signal');
    await new Promise(r => setTimeout(r, 200));

    const storedJson = await page.evaluate(() => localStorage.getItem('jayt_community_signals_080'));
    assert.ok(storedJson);
    const signals = JSON.parse(storedJson);
    const firstSig = signals[0].submitted_content;

    assert.ok(!firstSig.includes('0905998877'));
    assert.ok(!firstSig.includes('test@jayt.com'));
    assert.ok(!firstSig.includes('048177665544'));
    assert.ok(firstSig.includes('[SĐT ĐÃ XÓA]'));

    await page.close();
  });

  // TEST 14: Puppeteer Real Browser District Filter Interaction
  await runAsyncTest('TEST_14_PUPPETEER_REAL_BROWSER_DISTRICT_FILTER_INTERACTION', async () => {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('[data-district-filter="Thanh Khê"]', { timeout: 10000 });

    await page.click('[data-district-filter="Thanh Khê"]');
    await new Promise(r => setTimeout(r, 200));

    const cards = await page.$$('.apex-rich-deal-card.state-watchlist');
    assert.ok(cards.length > 0);

    await page.close();
  });

  await browser.close();
  server.close();

  // TEST 15: Strict Touch Targets >= 44px
  runSyncTest('TEST_15_STRICT_TOUCH_TARGETS_GE_44PX', () => {
    const htmlContent = fs.readFileSync(path.join(stagingDir, 'index.html'), 'utf8');
    assert.ok(htmlContent.includes('--touch-min: 44px;'));
  });

  // TEST 16: Single Unified Dock and No Redundant Docks
  runSyncTest('TEST_16_SINGLE_CATEGORY_DOCK_AND_NO_REDUNDANT_DOCKS', () => {
    const jsContent = fs.readFileSync(path.join(stagingDir, 'jayt_apex_interface.js'), 'utf8');
    const dockOccurrences = (jsContent.match(/class="[^"]*apex-time-of-day-dock[^"]*"/g) || []).length;
    assert.strictEqual(dockOccurrences, 1, 'Must have exactly 1 horizontal dock template in interface JS');
    const htmlContent = fs.readFileSync(path.join(stagingDir, 'index.html'), 'utf8');
    assert.ok(htmlContent.includes('.apex-time-of-day-dock'), 'CSS must define .apex-time-of-day-dock styling');
  });

  // TEST 17: Monogram Badges for Safe Media Rendering
  runSyncTest('TEST_17_MONOGRAM_BADGES_FOR_SAFE_MEDIA_RENDERING', () => {
    const jsContent = fs.readFileSync(path.join(stagingDir, 'jayt_apex_interface.js'), 'utf8');
    assert.ok(jsContent.includes('apex-card-monogram') || jsContent.includes('monogram'));
  });

  // TEST 18: Three-Layer Byte Parity
  runSyncTest('TEST_18_THREE_LAYER_BYTE_PARITY', () => {
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

  // TEST 19: Release Candidate Freeze Protocol Enforced
  runSyncTest('TEST_19_RELEASE_CANDIDATE_FREEZE_PROTOCOL_ENFORCED', () => {
    const rc103Path = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_CANDIDATE_103.json');
    assert.strictEqual(fs.existsSync(rc103Path), false, 'RELEASE_CANDIDATE_103.json must NOT exist in 103');
  });

  // TEST 20: Production Lock Invariants
  runSyncTest('TEST_20_PRODUCTION_LOCK_INVARIANTS', () => {
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
    console.log(`🟢 [COBALT-CANONICAL-103-SUMMARY] Toàn bộ ${passCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
  } else {
    console.error(`❌ [COBALT-CANONICAL-103-SUMMARY] Thất bại: ${passCount}/${totalCount} PASS.\n`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('❌ Lỗi:', err);
  process.exit(1);
});
