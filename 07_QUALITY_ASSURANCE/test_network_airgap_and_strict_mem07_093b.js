/**
 * JAYT NETWORK AIRGAP & STRICT MEM_07 TEST SUITE (093B)
 * Directive: JAYT-093B-STAGING-ACCEPTANCE-AND-STRICT-MEM07-UPGRADE
 *
 * PURE READ-ONLY TEST SUITE: Zero disk writes during test execution.
 *
 * Verifies:
 * 1. Strict MEM_07 Unit Logic (Positive on valid Section 5, Negative fail-closed on missing criteria).
 * 2. Real Browser Network Interception Airgap on Community Signal Submission (0 external HTTP requests).
 * 3. Real Browser Network Interception Airgap on Bill Split & User Voucher Entry (0 external HTTP requests).
 * 4. Honest Client-Side LocalStorage Persistence (100% local browser execution).
 * 5. Production Invariants Locked (deals_feed.json: [], is_approved: false).
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const deployDir = path.join(repoRoot, 'deploy', 'public');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

let passedTests = 0;
const totalTests = 5;

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
  console.log('🧪 [JAYT-093B-TEST] Khởi chạy bộ kiểm thử Network Airgap & Strict MEM_07 093B (READ-ONLY)...\n');

  // TEST 01: Strict MEM_07 Unit Logic (Positive & Negative Cases)
  runTest('TEST_01_STRICT_MEM_07_UNIT_POSITIVE_AND_NEGATIVE', () => {
    function evaluateMem07(memoryText) {
      let activeWoId = null;
      const topStatusMatch = memoryText.match(/\b(\d{3}[A-Z0-9_-]*|JAYT-[A-Z0-9_-]+)\s*:\s*(?:IMPLEMENTED|IN_PROGRESS|PROPOSED)/i);
      if (topStatusMatch) {
        activeWoId = topStatusMatch[1].toUpperCase();
      }
      const section5Match = memoryText.match(/## 5\.\s*(?:Work Order Đang Hoạt Động|Kế Hoạch Vận Hành)[\s\S]*?(?=## 6\.|$)/i);
      const section5Text = section5Match ? section5Match[0] : '';
      const mentionsActiveWoInSection5 = activeWoId ? section5Text.includes(activeWoId.replace(/JAYT-/g, '')) : false;
      const criteriaItems = section5Text.match(/(?:^\s*\d+\.|\*|-)\s+\*\*[^*]+\*\*:?[^\n]*/gm) || [];
      const hasSubstantialCriteria = criteriaItems.length >= 3 && criteriaItems.every(item => item.trim().length >= 20);
      return Boolean(section5Text && mentionsActiveWoInSection5 && hasSubstantialCriteria);
    }

    const realMemText = fs.readFileSync(path.join(repoRoot, 'PROJECT_MEMORY.md'), 'utf8');
    assert.strictEqual(evaluateMem07(realMemText), true, 'Real PROJECT_MEMORY.md must pass strict MEM_07');

    const topStatusMatch = realMemText.match(/\b(\d{3}[A-Z0-9_-]*|JAYT-[A-Z0-9_-]+)\s*:\s*(?:IMPLEMENTED|IN_PROGRESS|PROPOSED)/i);
    const activeWo = topStatusMatch ? topStatusMatch[1] : '093B';

    // Negative 1: Missing Section 5
    const badMemNoS5 = realMemText.replace(/## 5\.\s*Work Order Đang Hoạt Động[\s\S]*?(?=## 6\.|$)/i, '');
    assert.strictEqual(evaluateMem07(badMemNoS5), false, 'Empty Section 5 must fail MEM_07');

    // Negative 2: Section 5 with wrong WO
    const section5Block = realMemText.match(/## 5\.\s*Work Order Đang Hoạt Động[\s\S]*?(?=---\s*\n\s*## 6\.)/i)[0];
    const replacedS5 = section5Block.split(activeWo.replace(/JAYT-/g, '')).join('WRONG_WO_ID');
    const badMemWrongWo = realMemText.replace(section5Block, replacedS5);
    assert.strictEqual(evaluateMem07(badMemWrongWo), false, 'Mismatched WO in Section 5 must fail MEM_07');

    // Negative 3: Insufficient criteria (< 3 items)
    const badMemSparse = realMemText.replace(/1\. \*\*[\s\S]*?(?=---\s*\n\s*## 6\.)/, '1. **Chỉ có 1 tiêu chí duy nhất**: quá ít.\n\n');
    assert.strictEqual(evaluateMem07(badMemSparse), false, 'Sparse criteria (<3 items) must fail MEM_07');
  });

  // Start Static Local HTTP Server for Puppeteer Testing
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

  const port = 8938;
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

    const interceptedRequests = [];
    await page.setRequestInterception(true);
    page.on('request', req => {
      const url = req.url();
      const method = req.method();
      const postData = req.postData();
      interceptedRequests.push({ url, method, postData });
      req.continue();
    });

    await page.setViewport({ width: 390, height: 844 });
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle0' });

    // Initial static asset requests should only be to localhost:8938
    const nonLocalhostInit = interceptedRequests.filter(r => !r.url.startsWith(`http://localhost:${port}/`));
    assert.strictEqual(nonLocalhostInit.length, 0, `Forbidden initial external network requests: ${JSON.stringify(nonLocalhostInit)}`);

    // TEST 02: Network Airgap on Community Signal Submission
    await runAsyncTest('TEST_02_PUPPETEER_NETWORK_AIRGAP_ON_COMMUNITY_SUBMISSION', async () => {
      const startReqCount = interceptedRequests.length;

      const input = await page.$('#community-signal-input');
      assert.ok(input, 'Community signal input must exist on home page');

      await page.$eval('#community-signal-input', el => {
        el.value = 'Metiz Cinema đang có ưu đãi bắp nước thứ hai tại Helio Center Đà Nẵng';
        el.dispatchEvent(new Event('input'));
      });

      await page.click('#btn-submit-community-signal');
      await new Promise(r => setTimeout(r, 300));

      const postSubmitReqs = interceptedRequests.slice(startReqCount).filter(r => {
        // Exclude local static image/asset GETs triggered by browser re-render
        if (r.method === 'GET' && r.url.match(/\.(png|jpg|jpeg|svg|gif|css|js|json)$/i) && r.url.startsWith(`http://localhost:${port}/`)) {
          return false;
        }
        return true;
      });
      // Assert 0 network requests triggered on submit (100% airgapped)
      assert.strictEqual(postSubmitReqs.length, 0, `Submission must NOT trigger any network requests: ${JSON.stringify(postSubmitReqs)}`);

      // Verify toast appeared
      const toastText = await page.evaluate(() => {
        const toast = document.querySelector('.apex-toast-item');
        return toast ? toast.innerText : '';
      });
      assert.ok(toastText.includes('Đã ghi nhận tín hiệu cộng đồng'), 'Toast confirmation missing');
    });

    // TEST 03: Network Airgap on Bill Split & User Voucher Entry
    await runAsyncTest('TEST_03_PUPPETEER_NETWORK_AIRGAP_ON_BILL_SPLIT_AND_VOUCHER_ENTRY', async () => {
      const startReqCount = interceptedRequests.length;

      // Open calculator bottom sheet
      await page.click('#btn-open-calc-sheet');
      await new Promise(r => setTimeout(r, 200));

      await page.$eval('#sheet-input-price', el => { el.value = '500000'; el.dispatchEvent(new Event('input')); });
      await page.$eval('#sheet-input-voucher', el => { el.value = '100000'; el.dispatchEvent(new Event('input')); });
      await page.$eval('#sheet-input-split', el => { el.value = '4'; el.dispatchEvent(new Event('input')); });
      await new Promise(r => setTimeout(r, 200));

      await page.click('#btn-copy-split-result');
      await new Promise(r => setTimeout(r, 200));
      await page.click('#btn-close-calc-sheet');
      await new Promise(r => setTimeout(r, 200));

      const postCalcReqs = interceptedRequests.slice(startReqCount);
      assert.strictEqual(postCalcReqs.length, 0, `Calculator must NOT trigger any network requests: ${JSON.stringify(postCalcReqs)}`);
    });

    // TEST 04: Honest LocalStorage Persistence
    await runAsyncTest('TEST_04_HONEST_LOCAL_STORAGE_PERSISTENCE', async () => {
      const storedSignals = await page.evaluate(() => {
        const raw = localStorage.getItem('jayt_community_signals_080') || localStorage.getItem('jayt_community_signals');
        return raw ? JSON.parse(raw) : [];
      });

      assert.ok(Array.isArray(storedSignals) && storedSignals.length > 0, 'Signal must be saved in localStorage');
      assert.ok(storedSignals[0].submitted_content.includes('Metiz Cinema'), 'Stored content mismatch');
      assert.strictEqual(storedSignals[0].note.includes('0 PII'), false, 'Note must not contain absolute "0 PII"');
    });

    // TEST 05: Production Invariants Locked
    runTest('TEST_05_PRODUCTION_INVARIANTS_LOCKED', () => {
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
    console.log(`🟢 [AIRGAP-AND-MEM07-093B-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
  } else {
    console.log(`❌ [AIRGAP-AND-MEM07-093B-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
    process.exitCode = 1;
  }
}

main().catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
