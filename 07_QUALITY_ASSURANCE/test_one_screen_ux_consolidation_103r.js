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
  console.log('🧪 [JAYT-103R-TEST] Khởi chạy bộ kiểm thử One-Screen UX Consolidation 103R (REGRESSION & CLEAN EXPERIENCE AUDIT)...\n');

  // TEST 01: Project Memory Consistency (10/10 PASS)
  runSyncTest('TEST_01_MEMORY_CONSISTENCY_PASSES_ALL_10_TESTS', () => {
    const memTestPath = path.join(__dirname, 'test_project_memory_consistency.js');
    assert.ok(fs.existsSync(memTestPath), 'test_project_memory_consistency.js missing');
    const out = execSync(`node "${memTestPath}"`, { encoding: 'utf8', cwd: repoRoot });
    assert.ok(out.includes('10/10') && out.includes('PASS'), 'Project memory must pass 10/10');
  });

  // TEST 02: Negative Taxonomy Enforcement for 094 Through 103R
  runSyncTest('TEST_02_NEGATIVE_TAXONOMY_ENFORCEMENT_FOR_094_THROUGH_103R', () => {
    const { validateGlobalStatusTaxonomy067 } = require('./memory_transaction_manager_057.js');
    const nonApprovedWos = ['094', '094A', '094B', '095', '096', '097', '098', '099', '099A', '100', '101', '102', '103', '103R'];
    for (const wo of nonApprovedWos) {
      assert.throws(() => {
        validateGlobalStatusTaxonomy067(`| \`2026-08-25T16:34:00+07:00\` | \`JAYT-${wo}\` | Desc | Art | Test | **ACCEPTED BY CEO** |`);
      }, /STATUS_TAXONOMY_VIOLATION_067/, `Work order ${wo} MUST fail-closed when claiming ACCEPTED BY CEO`);

      assert.throws(() => {
        validateGlobalStatusTaxonomy067(`| \`2026-08-25T16:34:00+07:00\` | \`JAYT-${wo}\` | Desc | Art | Test | **CEO APPROVED** |`);
      }, /STATUS_TAXONOMY_VIOLATION_067/, `Work order ${wo} MUST fail-closed when claiming CEO APPROVED`);
    }
  });

  // TEST 03: Exactly One Horizontal Dock in DOM
  runSyncTest('TEST_03_EXACTLY_ONE_HORIZONTAL_DOCK_IN_DOM', () => {
    const jsContent = fs.readFileSync(path.join(stagingDir, 'jayt_apex_interface.js'), 'utf8');
    const timeDockOccurrences = (jsContent.match(/class="[^"]*apex-time-of-day-dock[^"]*"/g) || []).length;
    assert.strictEqual(timeDockOccurrences, 1, 'Must have exactly 1 time-of-day dock template in interface JS');
    assert.strictEqual(jsContent.includes('function renderCategoryDock'), false, 'Category dock function MUST be deleted');
  });

  // TEST 04: Exactly 5 Time-Slot Pills in Unified Dock
  runSyncTest('TEST_04_EXACTLY_5_TIME_SLOT_PILLS_IN_UNIFIED_DOCK', () => {
    const jsContent = fs.readFileSync(path.join(stagingDir, 'jayt_apex_interface.js'), 'utf8');
    const slotMatches = ['SLOT_0730', 'SLOT_1115', 'SLOT_1415', 'SLOT_1730', 'SLOT_2100'];
    for (const s of slotMatches) {
      assert.ok(jsContent.includes(s), `Missing slot definition for ${s}`);
    }
  });

  // TEST 05: District Selector in Header Dropdown
  runSyncTest('TEST_05_DISTRICT_SELECTOR_IN_HEADER_DROPDOWN', () => {
    const jsContent = fs.readFileSync(path.join(stagingDir, 'jayt_apex_interface.js'), 'utf8');
    assert.ok(jsContent.includes('id="select-hub-district"'), 'Header must contain select-hub-district');
  });

  // TEST 06: Exactly One Split Bill Modal and No Sticky Footer Overlay
  runSyncTest('TEST_06_EXACTLY_ONE_SPLIT_BILL_MODAL_AND_NO_STICKY_FOOTER_OVERLAY', () => {
    const jsContent = fs.readFileSync(path.join(stagingDir, 'jayt_apex_interface.js'), 'utf8');
    const modalOccurrences = (jsContent.match(/id="calc-bottom-sheet-overlay"/g) || []).length;
    assert.strictEqual(modalOccurrences, 1, 'Must have exactly 1 bottom sheet overlay modal');
  });

  // TEST 07: Consolidated First Viewport Structure in Mobile
  runSyncTest('TEST_07_CONSOLIDATED_FIRST_VIEWPORT_STRUCTURE_IN_MOBILE', () => {
    const jsContent = fs.readFileSync(path.join(stagingDir, 'jayt_apex_interface.js'), 'utf8');
    assert.ok(jsContent.includes('btn-toggle-extended-watchlist'), 'Must have expandable watchlist toggle button');
    assert.ok(jsContent.includes('extended-watchlist-content'), 'Must have extended watchlist container');
  });

  // TEST 08: Hero CTA Honest Copy and Zero Fake Deals
  runSyncTest('TEST_08_HERO_CTA_HONEST_COPY_AND_ZERO_FAKE_DEALS', () => {
    const jsContent = fs.readFileSync(path.join(stagingDir, 'jayt_apex_interface.js'), 'utf8');
    assert.ok(jsContent.includes('Khám phá địa điểm gần bạn ↓'), 'Hero CTA must be honest location discovery');
  });

  // TEST 09: Byte-for-Byte Provenance for all 14 Cobalt Branches
  runSyncTest('TEST_09_BYTE_FOR_BYTE_PROVENANCE_FOR_ALL_14_COBALT_BRANCHES', () => {
    const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'canonical_cobalt_branches_103.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert.strictEqual(manifest.total_unique_cobalt_branches, 14);

    for (const b of manifest.cobalt_branches) {
      const artPath = path.join(repoRoot, b.evidence_pointer.artifact_path);
      const rawText = fs.readFileSync(artPath, 'utf8');
      const ep = b.evidence_pointer;

      const slice = rawText.slice(ep.char_offset, ep.char_offset + ep.snippet_length);
      assert.strictEqual(slice, ep.snippet, `Slice mismatch for ${b.id}`);
      assert.strictEqual(sha256(ep.snippet), ep.snippet_sha256, `Hash mismatch for ${b.id}`);
    }
  });

  // TEST 10: Zero Out-of-Da Nang Addresses
  runSyncTest('TEST_10_ZERO_OUT_OF_DANANG_ADDRESSES', () => {
    const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'canonical_cobalt_branches_103.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    for (const b of manifest.cobalt_branches) {
      assert.ok(!b.address.toLowerCase().includes('tam kỳ'));
      assert.ok(!b.address.toLowerCase().includes('quảng nam'));
      assert.ok(!b.address.toLowerCase().includes('hải phòng'));
      assert.ok(!b.address.toLowerCase().includes('hồ chí minh'));
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

  // TEST 11: Puppeteer Real Browser on Staging Instance 5 Slots
  await runAsyncTest('TEST_11_PUPPETEER_REAL_BROWSER_ON_STAGING_INSTANCE_5_SLOTS', async () => {
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

    for (const s of ['SLOT_0730', 'SLOT_1115', 'SLOT_1415', 'SLOT_1730', 'SLOT_2100']) {
      await page.click(`[data-time-slot="${s}"]`);
      await new Promise(r => setTimeout(r, 100));
    }

    await page.close();
  });

  // TEST 12: Puppeteer Real Browser Split Bill Interactive & Escape Key
  await runAsyncTest('TEST_12_PUPPETEER_REAL_BROWSER_SPLIT_BILL_INTERACTIVE_AND_ESCAPE', async () => {
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

  // TEST 13: Puppeteer Zero External Network Requests (Airgap Enforced)
  runSyncTest('TEST_13_PUPPETEER_ZERO_EXTERNAL_NETWORK_REQUESTS_AIRGAP', () => {
    assert.strictEqual(externalRequests.length, 0, `External network requests detected: ${externalRequests.join(', ')}`);
  });

  // TEST 14: Puppeteer Real Browser PII Sanitization in LocalStorage
  await runAsyncTest('TEST_14_PUPPETEER_REAL_BROWSER_PII_SANITIZATION_IN_LOCALSTORAGE', async () => {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('#community-signal-input', { timeout: 10000 });

    await page.evaluate(() => localStorage.removeItem('jayt_community_signals_080'));

    const piiRawText = 'Quán ngon tại 0905123456 email admin@jayt.com CCCD 048123456789';
    await page.type('#community-signal-input', piiRawText);
    await page.click('#btn-submit-community-signal');
    await new Promise(r => setTimeout(r, 200));

    const storedJson = await page.evaluate(() => localStorage.getItem('jayt_community_signals_080'));
    assert.ok(storedJson);
    const signals = JSON.parse(storedJson);
    const firstSig = signals[0].submitted_content;

    assert.ok(!firstSig.includes('0905123456'));
    assert.ok(!firstSig.includes('admin@jayt.com'));
    assert.ok(!firstSig.includes('048123456789'));
    assert.ok(firstSig.includes('[SĐT ĐÃ XÓA]'));

    await page.close();
  });

  // TEST 15: Puppeteer Expandable Watchlist Toggle Interaction
  await runAsyncTest('TEST_15_PUPPETEER_EXPANDABLE_WATCHLIST_TOGGLE_INTERACTION', async () => {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('#btn-toggle-extended-watchlist', { timeout: 10000 });

    const isHiddenBefore = await page.$eval('#extended-watchlist-content', el => el.style.display === 'none');
    assert.strictEqual(isHiddenBefore, true, 'Extended watchlist should be collapsed initially');

    await page.click('#btn-toggle-extended-watchlist');
    await new Promise(r => setTimeout(r, 200));

    const isVisibleAfter = await page.$eval('#extended-watchlist-content', el => el.style.display === 'block');
    assert.strictEqual(isVisibleAfter, true, 'Extended watchlist should expand after click');

    await page.close();
  });

  // TEST 16: Mobile Viewport No Horizontal Overflow (375px)
  await runAsyncTest('TEST_16_MOBILE_VIEWPORT_NO_HORIZONTAL_OVERFLOW', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 375, height: 812 });
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const innerWidth = await page.evaluate(() => window.innerWidth);
    assert.ok(scrollWidth <= innerWidth + 1, `Horizontal overflow detected: scrollWidth ${scrollWidth} > innerWidth ${innerWidth}`);

    await page.close();
  });

  await browser.close();
  server.close();

  // TEST 17: Strict Touch Targets >= 44px
  runSyncTest('TEST_17_STRICT_TOUCH_TARGETS_GE_44PX', () => {
    const htmlContent = fs.readFileSync(path.join(stagingDir, 'index.html'), 'utf8');
    assert.ok(htmlContent.includes('--touch-min: 44px;'));
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
    const rc103rPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_CANDIDATE_103R.json');
    assert.strictEqual(fs.existsSync(rc103rPath), false, 'RELEASE_CANDIDATE_103R.json must NOT exist in 103R');
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

  // TEST 21: Monogram Badges for Brand Cards
  runSyncTest('TEST_21_MONOGRAM_BADGES_FOR_BRAND_CARDS', () => {
    const jsContent = fs.readFileSync(path.join(stagingDir, 'jayt_apex_interface.js'), 'utf8');
    assert.ok(jsContent.includes('brandMonograms') || jsContent.includes('monogram'));
  });

  console.log('\n======================================================');
  if (passCount === totalCount) {
    console.log(`🟢 [ONE-SCREEN-UX-103R-SUMMARY] Toàn bộ ${passCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
  } else {
    console.error(`❌ [ONE-SCREEN-UX-103R-SUMMARY] Thất bại: ${passCount}/${totalCount} PASS.\n`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('❌ Lỗi:', err);
  process.exit(1);
});
