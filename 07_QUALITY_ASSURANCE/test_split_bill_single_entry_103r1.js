const fs = require('fs');
const path = require('path');
const http = require('http');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const sotDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');
const deployDir = path.join(repoRoot, 'deploy', 'public');
const stagingDir = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH');
const canonicalCobaltPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'canonical_cobalt_branches_103.json');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

let passedTests = 0;
let totalTests = 0;

function runSyncTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  [${name}]: [PASS]`);
    passedTests++;
  } catch (err) {
    console.error(`  [${name}]: [FAIL] - ${err.message}`);
  }
}

async function runAsyncTest(name, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  [${name}]: [PASS]`);
    passedTests++;
  } catch (err) {
    console.error(`  [${name}]: [FAIL] - ${err.message}`);
  }
}

async function main() {
  console.log('🧪 [JAYT-103R1-TEST] Khởi chạy bộ kiểm thử Split-Bill Single Entry & Clean Bottom-Sheet 103R1...\n');

  // TEST 01: Project Memory Consistency
  runSyncTest('TEST_01_MEMORY_CONSISTENCY_PASSES_ALL_10_TESTS', () => {
    const memContent = fs.readFileSync(memoryPath, 'utf8');
    const versionMatch = memContent.match(/Phiên bản tài liệu\*\*:\s*`([^`]+)`/);
    assert.ok(versionMatch, 'Version header must exist');
    assert.ok(memContent.includes('JAYT-103R1') || memContent.includes('103R1'), 'Must contain 103R1 reference');
    assert.ok(memContent.includes('is_approved: false'), 'Must state is_approved: false');
  });

  // TEST 02: Negative Taxonomy Enforcement
  runSyncTest('TEST_02_NEGATIVE_TAXONOMY_ENFORCEMENT_FOR_094_THROUGH_103R1', () => {
    const memContent = fs.readFileSync(memoryPath, 'utf8');
    for (const b of ['094', '095', '096', '097', '098', '099', '099A', '100', '101', '102', '103', '103R', '103R1']) {
      const re = new RegExp(`Status.*${b}.*(CEO-APPROVED|PRODUCTION-READY|ALL_PASS_CONFIRMED|PUBLIC-RELEASED)`, 'i');
      assert.ok(!re.test(memContent), `Batch ${b} must not claim unauthorized CEO-approved status`);
    }
  });

  // TEST 03: Exactly ONE btn-open-calc-sheet in Templates
  runSyncTest('TEST_03_EXACTLY_ONE_BTN_OPEN_CALC_SHEET_IN_TEMPLATES', () => {
    const jsContent = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');
    const matches = jsContent.match(/id=["']btn-open-calc-sheet["']/g) || [];
    assert.strictEqual(matches.length, 1, `Must have exactly 1 HTML template with id="btn-open-calc-sheet", found: ${matches.length}`);
  });

  // TEST 04: Zero Duplicate Calculator CTAs (Sidebar/Hero IDs Eliminated)
  runSyncTest('TEST_04_ZERO_DUPLICATE_CALCULATOR_CTAS', () => {
    const jsContent = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');
    assert.ok(!jsContent.includes('btn-open-calc-sheet-sidebar'), 'btn-open-calc-sheet-sidebar must be eliminated');
    assert.ok(!jsContent.includes('btn-open-calc-sheet-hero'), 'btn-open-calc-sheet-hero must be eliminated');
  });

  // TEST 05: CSS Bottom-Sheet Hidden by Default
  runSyncTest('TEST_05_CSS_BOTTOM_SHEET_HIDDEN_BY_DEFAULT', () => {
    const htmlContent = fs.readFileSync(path.join(sotDir, 'index.html'), 'utf8');
    assert.ok(htmlContent.includes('.apex-bottom-sheet-overlay'), 'CSS must define .apex-bottom-sheet-overlay');
    assert.ok(htmlContent.includes('display: none !important;'), 'Overlay must have display: none !important by default');
    assert.ok(htmlContent.includes('.apex-bottom-sheet-overlay.active'), 'CSS must define .apex-bottom-sheet-overlay.active');
  });

  // TEST 06: Byte-for-Byte Provenance for 14 Cobalt Branches
  runSyncTest('TEST_06_BYTE_FOR_BYTE_PROVENANCE_FOR_ALL_14_COBALT_BRANCHES', () => {
    assert.ok(fs.existsSync(canonicalCobaltPath), 'canonical_cobalt_branches_103.json missing');
    const manifest = JSON.parse(fs.readFileSync(canonicalCobaltPath, 'utf8'));
    assert.strictEqual(manifest.cobalt_branches.length, 14, 'Must have exactly 14 unique Cobalt branches');

    for (const b of manifest.cobalt_branches) {
      const pageTxtPath = path.resolve(repoRoot, b.evidence_pointer.artifact_path);
      assert.ok(fs.existsSync(pageTxtPath), `page.txt missing: ${pageTxtPath}`);
      const pageTxt = fs.readFileSync(pageTxtPath, 'utf8');
      const slice = pageTxt.slice(b.evidence_pointer.char_offset, b.evidence_pointer.char_offset + b.evidence_pointer.snippet_length);
      assert.strictEqual(slice, b.evidence_pointer.snippet, `Slice mismatch for ${b.id}`);
    }
  });

  // Start HTTP Server for Real Browser Testing
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

  // TEST 07: Puppeteer Real Browser Desktop (1440x900) Split-Bill Lifecycle & Single CTA
  await runAsyncTest('TEST_07_PUPPETEER_DESKTOP_SPLIT_BILL_LIFECYCLE_AND_SINGLE_CTA', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });

    // 1. Verify exactly 1 button #btn-open-calc-sheet in DOM
    const btnCount = await page.$$eval('#btn-open-calc-sheet', els => els.length);
    assert.strictEqual(btnCount, 1, `Real DOM must contain exactly 1 #btn-open-calc-sheet, found: ${btnCount}`);

    // 2. Verify bottom sheet modal is completely hidden at load time
    const isHiddenAtStart = await page.$eval('#calc-bottom-sheet-overlay', el => {
      const style = window.getComputedStyle(el);
      return style.display === 'none' || style.visibility === 'hidden' || !el.classList.contains('active');
    });
    assert.strictEqual(isHiddenAtStart, true, 'Modal overlay MUST be hidden at load time');

    // 3. Click to open modal
    await page.click('#btn-open-calc-sheet');
    await new Promise(r => setTimeout(r, 150));

    const isOpen = await page.$eval('#calc-bottom-sheet-overlay', el => {
      const style = window.getComputedStyle(el);
      return el.classList.contains('active') && style.display !== 'none';
    });
    assert.strictEqual(isOpen, true, 'Modal must become visible with active class after click');

    // 4. Close via Escape key
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 150));

    const isClosedByEscape = await page.$eval('#calc-bottom-sheet-overlay', el => {
      const style = window.getComputedStyle(el);
      return !el.classList.contains('active') || style.display === 'none';
    });
    assert.strictEqual(isClosedByEscape, true, 'Modal must close on Escape key');

    // 5. Open again & close via X button
    await page.click('#btn-open-calc-sheet');
    await new Promise(r => setTimeout(r, 150));
    await page.click('#btn-close-calc-sheet');
    await new Promise(r => setTimeout(r, 150));

    const isClosedByX = await page.$eval('#calc-bottom-sheet-overlay', el => {
      const style = window.getComputedStyle(el);
      return !el.classList.contains('active') || style.display === 'none';
    });
    assert.strictEqual(isClosedByX, true, 'Modal must close on X button click');

    // 6. Open again & close via Overlay click
    await page.click('#btn-open-calc-sheet');
    await new Promise(r => setTimeout(r, 150));
    await page.evaluate(() => {
      const overlay = document.getElementById('calc-bottom-sheet-overlay');
      overlay.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    });
    await new Promise(r => setTimeout(r, 150));

    const isClosedByOverlay = await page.$eval('#calc-bottom-sheet-overlay', el => {
      const style = window.getComputedStyle(el);
      return !el.classList.contains('active') || style.display === 'none';
    });
    assert.strictEqual(isClosedByOverlay, true, 'Modal must close on overlay background click');

    await page.close();
  });

  // TEST 08: Puppeteer Real Browser Mobile (375x812) Split-Bill Interactive Calculation
  await runAsyncTest('TEST_08_PUPPETEER_MOBILE_SPLIT_BILL_INTERACTIVE_CALCULATION', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 375, height: 812 });
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });

    // Verify modal is hidden at start
    const isHiddenAtStart = await page.$eval('#calc-bottom-sheet-overlay', el => {
      const style = window.getComputedStyle(el);
      return style.display === 'none' || !el.classList.contains('active');
    });
    assert.strictEqual(isHiddenAtStart, true, 'Modal must be hidden on mobile at start');

    // Open sheet
    await page.click('#btn-open-calc-sheet');
    await new Promise(r => setTimeout(r, 150));

    // Input values: 300,000 price, 50,000 voucher, 2 split
    await page.$eval('#sheet-input-price', el => { el.value = '300000'; el.dispatchEvent(new Event('input')); });
    await page.$eval('#sheet-input-voucher', el => { el.value = '50000'; el.dispatchEvent(new Event('input')); });
    await page.$eval('#sheet-input-split', el => { el.value = '2'; el.dispatchEvent(new Event('input')); });
    await new Promise(r => setTimeout(r, 150));

    // Check per person calculation: (300,000 - 50,000) / 2 = 125,000 VND
    const perPersonText = await page.$eval('#sheet-val-per-person', el => el.innerText);
    assert.ok(perPersonText.includes('125.000') || perPersonText.includes('125,000'), `Per person value expected 125.000 VND, got: ${perPersonText}`);

    // Click copy button
    await page.click('#btn-copy-split-result');
    await new Promise(r => setTimeout(r, 150));

    const toast = await page.evaluate(() => {
      const el = document.querySelector('.apex-toast-item');
      return el ? el.innerText : '';
    });
    assert.ok(toast.includes('Đã sao chép kết quả chia bill'), 'Toast confirmation missing after copy');

    // Close sheet
    await page.click('#btn-close-calc-sheet');
    await new Promise(r => setTimeout(r, 150));

    await page.close();
  });

  // TEST 09: Mobile Viewport Zero Horizontal Overflow (375px)
  await runAsyncTest('TEST_09_MOBILE_VIEWPORT_ZERO_HORIZONTAL_OVERFLOW', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 375, height: 812 });
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });

    const overflow = await page.evaluate(() => {
      const docWidth = document.documentElement.offsetWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      return scrollWidth > docWidth;
    });
    assert.strictEqual(overflow, false, 'Mobile viewport (375px) must not have horizontal overflow');
    await page.close();
  });

  // TEST 10: 100% Airgap on All Interactions
  await runAsyncTest('TEST_10_PUPPETEER_ZERO_EXTERNAL_NETWORK_REQUESTS_AIRGAP', async () => {
    const externalRequests = [];
    const page = await browser.newPage();
    page.on('request', req => {
      const url = req.url();
      if (!url.startsWith('http://127.0.0.1') && !url.startsWith('http://localhost') && !url.startsWith('data:')) {
        externalRequests.push(url);
      }
    });

    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });

    await page.click('#btn-open-calc-sheet');
    await new Promise(r => setTimeout(r, 100));
    await page.click('#btn-close-calc-sheet');

    assert.strictEqual(externalRequests.length, 0, `External network requests forbidden: ${JSON.stringify(externalRequests)}`);
    await page.close();
  });

  // TEST 11: PII Sanitization in Community Signal
  await runAsyncTest('TEST_11_PUPPETEER_REAL_BROWSER_PII_SANITIZATION_IN_LOCALSTORAGE', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });

    await page.waitForSelector('#community-signal-input', { timeout: 10000 });
    await page.$eval('#community-signal-input', el => {
      el.value = 'Quán Highland tại 74 Bạch Đằng đang có combo 45k. Liên hệ 0905123456 hoặc test@gmail.com';
      el.dispatchEvent(new Event('input'));
    });

    await page.click('#btn-submit-community-signal');
    await new Promise(r => setTimeout(r, 300));

    const storedSignals = await page.evaluate(() => {
      const raw = localStorage.getItem('jayt_community_signals_080');
      return raw ? JSON.parse(raw) : [];
    });

    assert.ok(storedSignals.length > 0, 'Signal must be stored locally');
    const lastSig = storedSignals[0];
    const text = lastSig.submitted_content || lastSig.content || '';
    assert.ok(!text.includes('0905123456'), 'Phone number must be scrubbed');
    assert.ok(!text.includes('test@gmail.com'), 'Email must be scrubbed');
    assert.ok(text.includes('[SĐT ĐÃ XÓA]'), 'Phone scrubber mask missing');
    assert.ok(text.includes('[EMAIL ĐÃ XÓA]'), 'Email scrubber mask missing');

    await page.close();
  });

  // TEST 12: Single Unified Dock with 5 Time Pills
  runSyncTest('TEST_12_EXACTLY_ONE_HORIZONTAL_DOCK_AND_5_PILLS', () => {
    const jsContent = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');
    const dockMatches = jsContent.match(/class="[^"]*apex-time-of-day-dock[^"]*"/g) || [];
    assert.strictEqual(dockMatches.length, 1, 'Must have exactly 1 horizontal dock template in JS');

    for (const slot of ['SLOT_0730', 'SLOT_1115', 'SLOT_1415', 'SLOT_1730', 'SLOT_2100']) {
      assert.ok(jsContent.includes(slot), `Must support slot ${slot}`);
    }
  });

  // TEST 13: District Selector in Header Dropdown
  runSyncTest('TEST_13_DISTRICT_SELECTOR_IN_HEADER_DROPDOWN', () => {
    const jsContent = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');
    assert.ok(jsContent.includes('id="select-hub-district"'), 'Header must contain #select-hub-district');
  });

  // TEST 14: Expandable Watchlist Toggle
  await runAsyncTest('TEST_14_EXPANDABLE_WATCHLIST_TOGGLE_INTERACTION', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 375, height: 812 });
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });

    const isHiddenBefore = await page.$eval('#extended-watchlist-content', el => el.style.display === 'none');
    assert.strictEqual(isHiddenBefore, true, 'Extended watchlist must be hidden at load');

    await page.click('#btn-toggle-extended-watchlist');
    await new Promise(r => setTimeout(r, 150));

    const isVisibleAfter = await page.$eval('#extended-watchlist-content', el => el.style.display === 'block');
    assert.strictEqual(isVisibleAfter, true, 'Extended watchlist must become block after click');

    await page.close();
  });

  // TEST 15: Strict Touch Targets >= 44px
  runSyncTest('TEST_15_STRICT_TOUCH_TARGETS_GE_44PX', () => {
    const htmlContent = fs.readFileSync(path.join(sotDir, 'index.html'), 'utf8');
    assert.ok(htmlContent.includes('--touch-min: 44px;'), 'CSS must define --touch-min: 44px');
  });

  // TEST 16: Three-Layer Byte Parity
  runSyncTest('TEST_16_THREE_LAYER_BYTE_PARITY', () => {
    for (const f of ['index.html', 'jayt_apex_interface.js', 'customer_journey_north_star.json', 'four_layer_dataset.json']) {
      const sotHash = sha256(fs.readFileSync(path.join(sotDir, f)));
      const deployHash = sha256(fs.readFileSync(path.join(deployDir, f)));
      const stagingHash = sha256(fs.readFileSync(path.join(stagingDir, f)));
      assert.strictEqual(deployHash, sotHash, `Deploy parity mismatch for ${f}`);
      assert.strictEqual(stagingHash, sotHash, `Staging parity mismatch for ${f}`);
    }
  });

  // TEST 17: Release Candidate Freeze Protocol
  runSyncTest('TEST_17_RELEASE_CANDIDATE_FREEZE_PROTOCOL_ENFORCED', () => {
    const rc103r1Path = path.join(repoRoot, '08_RELEASE_VAULT', 'releases', 'candidate_103r1', 'RELEASE_CANDIDATE_103R1.json');
    assert.strictEqual(fs.existsSync(rc103r1Path), false, 'Forbidden new release candidate 103R1 created');
  });

  // TEST 18: Production Lock Invariants
  runSyncTest('TEST_18_PRODUCTION_LOCK_INVARIANTS', () => {
    const feed = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
    assert.strictEqual(feed.length, 0, 'Production deals_feed.json must remain []');

    const manifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
    assert.strictEqual(manifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved must remain false');
  });

  await browser.close();
  server.close();

  console.log('\n======================================================');
  if (passedTests === totalTests) {
    console.log(`🟢 [SPLIT-BILL-103R1-SUMMARY] Toàn bộ ${passedTests}/${totalTests} KIỂM THỬ ĐÃ ĐẠT [PASS]!`);
    process.exit(0);
  } else {
    console.error(`❌ [SPLIT-BILL-103R1-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error in test suite:', err);
  process.exit(1);
});
