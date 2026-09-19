/**
 * 07_QUALITY_ASSURANCE/test_locator_runner_resilience.cjs
 * 
 * JAYT-329 Batch 13: Store Locator Matrix Runner Resilience Test Suite (V2.2)
 * 
 * Directly imports and verifies all exported guard and parser functions from:
 * 04_DATA_PIPELINE/harvest_danang_locations.js
 * 
 * Critical Council Requirements:
 * 1. MANDATORY: Real DOM inspection cannot be bypassed by environment variables or mocks.
 *    If DOM has wrong IDs, runner MUST FAIL even if process.env contains valid IDs.
 * 2. MANDATORY: If source declares 3 pages but page 2 is missing, code MUST record missing page
 *    and emit INCOMPLETE_PAGINATION, never COMPLETE.
 * 3. Generic pagination fixtures (1, 2, 3 pages, and limit exceeded).
 * 4. HTTP error guards (500, 404).
 * 5. Anti-synthesis parsers (Metiz, Lotte, Phi Long, Jollibee, Phúc Long).
 * 6. Policy engine separation.
 * 7. Header sanitization.
 * 8. Staging guard dynamic assertions & CLI process exit codes (1 on failure, 0 on pass).
 */

const assert = require('assert');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { execSync } = require('child_process');

// DIRECT IMPORT of real production functions
const {
  sanitizeHeaders,
  fetchWithGuards,
  evaluateStagingAssertions,
  verifyStagingGuard,
  generateTestReceipt,
  harvestPaginatedJsonStrict,
  parsePhucLongApiStrict,
  parseJollibeeHtmlStrict,
  parsePhiLongHtmlStrict,
  parseCGVCinemaHtmlStrict,
  parseGalaxyCinemaHtmlStrict,
  parseLotteCinemaHtmlStrict,
  parseMetizHtmlStrict,
  evaluatePolicyEligibilityStrict,
  resolveBrandProvenanceTimestamps,
  validateCaptureReceipt,
  getReplayTimestamp,
  getBrandFileCandidates
} = require('../04_DATA_PIPELINE/harvest_danang_locations.js');

const { verifyAllPolicySpans } = require('./verify_all_policy_spans.cjs');
const { verifyPolicyIngressScope } = require('./verify_policy_ingress_scope.cjs');

let passedTests = 0;
let totalTests = 0;

async function runTest(testName, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  [PASS] ${testName}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${testName}: ${err.message}`);
    throw err;
  }
}

async function main() {
  console.log('=== RUNNING BATCH 13 LOCATOR RUNNER RESILIENCE TESTS (V2.2) ===\n');

  // -----------------------------------------------------------------------------
  // Group 1: Generic Pagination & Strict Missing Page Detection
  // -----------------------------------------------------------------------------
  console.log('--- Group 1: Pagination Fixtures & Strict Completeness ---');

  const tmpFixturesDir = path.resolve('07_QUALITY_ASSURANCE/tmp_fixtures_pagination');
  if (!fs.existsSync(tmpFixturesDir)) fs.mkdirSync(tmpFixturesDir, { recursive: true });

  try {
    // 1-page response
    fs.writeFileSync(path.join(tmpFixturesDir, 'brand1_page1.raw.json'), JSON.stringify({
      paging: { totalCount: 20, pageNumber: 1, pageSize: 50, totalPages: 1 },
      data: [{ storeCode: 'B1_01', officeAddress: '100 Lê Duẩn, Đà Nẵng' }]
    }));

    // 2-page response
    fs.writeFileSync(path.join(tmpFixturesDir, 'brand2_page1.raw.json'), JSON.stringify({
      paging: { totalCount: 60, pageNumber: 1, pageSize: 30, totalPages: 2 },
      data: [{ storeCode: 'B2_01', officeAddress: '200 Lê Duẩn, Đà Nẵng' }]
    }));
    fs.writeFileSync(path.join(tmpFixturesDir, 'brand2_page2.raw.json'), JSON.stringify({
      paging: { totalCount: 60, pageNumber: 2, pageSize: 30, totalPages: 2 },
      data: [{ storeCode: 'B2_02', officeAddress: '202 Lê Duẩn, Đà Nẵng' }]
    }));

    // 3-page response
    fs.writeFileSync(path.join(tmpFixturesDir, 'brand3_page1.raw.json'), JSON.stringify({
      paging: { totalCount: 90, pageNumber: 1, pageSize: 30, totalPages: 3 },
      data: [{ storeCode: 'B3_01', officeAddress: '301 Lê Duẩn, Đà Nẵng' }]
    }));
    fs.writeFileSync(path.join(tmpFixturesDir, 'brand3_page2.raw.json'), JSON.stringify({
      paging: { totalCount: 90, pageNumber: 2, pageSize: 30, totalPages: 3 },
      data: [{ storeCode: 'B3_02', officeAddress: '302 Lê Duẩn, Đà Nẵng' }]
    }));
    fs.writeFileSync(path.join(tmpFixturesDir, 'brand3_page3.raw.json'), JSON.stringify({
      paging: { totalCount: 90, pageNumber: 3, pageSize: 30, totalPages: 3 },
      data: [{ storeCode: 'B3_03', officeAddress: '303 Lê Duẩn, Đà Nẵng' }]
    }));

    // 4-page response exceeding limit (max_pages = 2)
    fs.writeFileSync(path.join(tmpFixturesDir, 'brand4_page1.raw.json'), JSON.stringify({
      paging: { totalCount: 200, pageNumber: 1, pageSize: 50, totalPages: 4 },
      data: [{ storeCode: 'B4_01', officeAddress: '401 Lê Duẩn, Đà Nẵng' }]
    }));
    fs.writeFileSync(path.join(tmpFixturesDir, 'brand4_page2.raw.json'), JSON.stringify({
      paging: { totalCount: 200, pageNumber: 2, pageSize: 50, totalPages: 4 },
      data: [{ storeCode: 'B4_02', officeAddress: '402 Lê Duẩn, Đà Nẵng' }]
    }));

    // 3-page response but Page 2 is MISSING
    fs.writeFileSync(path.join(tmpFixturesDir, 'brand_missing_p2_page1.raw.json'), JSON.stringify({
      paging: { totalCount: 90, pageNumber: 1, pageSize: 30, totalPages: 3 },
      data: [{ storeCode: 'BM_01', officeAddress: '501 Lê Duẩn, Đà Nẵng' }]
    }));
    // Note: page 2 intentionally omitted
    fs.writeFileSync(path.join(tmpFixturesDir, 'brand_missing_p2_page3.raw.json'), JSON.stringify({
      paging: { totalCount: 90, pageNumber: 3, pageSize: 30, totalPages: 3 },
      data: [{ storeCode: 'BM_03', officeAddress: '503 Lê Duẩn, Đà Nẵng' }]
    }));

    await runTest('1.1 Single-page response yields COMPLETE_PAGINATION with 1 harvested page', async () => {
      const brand = {
        brand_id: 'brand1',
        pagination: { enabled: true, max_pages: 5, page_param: 'pageNumber' }
      };
      const res = await harvestPaginatedJsonStrict(brand, { offline: true, baselineDir: tmpFixturesDir });
      assert.strictEqual(res.totalPages, 1);
      assert.strictEqual(res.pagesHarvested, 1);
      assert.strictEqual(res.paginationStatus, 'COMPLETE_PAGINATION');
      assert.strictEqual(res.isComplete, true);
      assert.strictEqual(res.missingPages.length, 0);
    });

    await runTest('1.2 Two-page response within limit yields COMPLETE_PAGINATION with 2 harvested pages', async () => {
      const brand = {
        brand_id: 'brand2',
        pagination: { enabled: true, max_pages: 2, page_param: 'pageNumber' }
      };
      const res = await harvestPaginatedJsonStrict(brand, { offline: true, baselineDir: tmpFixturesDir });
      assert.strictEqual(res.totalPages, 2);
      assert.strictEqual(res.pagesHarvested, 2);
      assert.strictEqual(res.paginationStatus, 'COMPLETE_PAGINATION');
      assert.strictEqual(res.isComplete, true);
    });

    await runTest('1.3 Three-page response within limit (max_pages=5) yields COMPLETE_PAGINATION with 3 harvested pages', async () => {
      const brand = {
        brand_id: 'brand3',
        pagination: { enabled: true, max_pages: 5, page_param: 'pageNumber' }
      };
      const res = await harvestPaginatedJsonStrict(brand, { offline: true, baselineDir: tmpFixturesDir });
      assert.strictEqual(res.totalPages, 3);
      assert.strictEqual(res.pagesHarvested, 3);
      assert.strictEqual(res.paginationStatus, 'COMPLETE_PAGINATION');
      assert.strictEqual(res.isComplete, true);
    });

    await runTest('1.4 Four-page response exceeding limit (max_pages=2) records INCOMPLETE_PAGINATION and warning', async () => {
      const brand = {
        brand_id: 'brand4',
        pagination: { enabled: true, max_pages: 2, page_param: 'pageNumber' }
      };
      const res = await harvestPaginatedJsonStrict(brand, { offline: true, baselineDir: tmpFixturesDir });
      assert.strictEqual(res.totalPages, 4);
      assert.strictEqual(res.pagesHarvested, 2);
      assert.strictEqual(res.paginationStatus, 'INCOMPLETE_PAGINATION');
      assert.strictEqual(res.isComplete, false);
      assert.ok(res.paginationWarning.includes('exceeded max_pages limit'));
    });

    // MANDATORY TEST 2: Source declares 3 pages but page 2 is missing
    await runTest('1.5 MANDATORY: Source declares 3 pages but page 2 is missing -> records missing page and INCOMPLETE_PAGINATION', async () => {
      const brand = {
        brand_id: 'brand_missing_p2',
        pagination: { enabled: true, max_pages: 5, page_param: 'pageNumber' }
      };
      const res = await harvestPaginatedJsonStrict(brand, { offline: true, baselineDir: tmpFixturesDir });
      assert.strictEqual(res.totalPages, 3);
      assert.strictEqual(res.isComplete, false, 'Harvest must NOT be marked complete when page 2 is missing');
      assert.strictEqual(res.paginationStatus, 'INCOMPLETE_PAGINATION');
      assert.deepStrictEqual(res.missingPages, [2], 'Must identify page 2 as missing');
      assert.ok(res.paginationWarning.includes('Missing page(s): [2]'));
    });
  } finally {
    fs.rmSync(tmpFixturesDir, { recursive: true, force: true });
  }

  // -----------------------------------------------------------------------------
  // Group 2: Real DOM Staging Guard & Anti-Bypass Verification
  // -----------------------------------------------------------------------------
  console.log('\n--- Group 2: Real DOM Staging Guard & Anti-Bypass Verification ---');

  // Spawn local test HTTP server to serve custom fixtures for DOM inspection
  const testServer = http.createServer((req, res) => {
    if (req.url === '/wrong_dom.html') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      // Fixture where DOM has ONLY B12_13 (missing B12_15 and B12_05)
      res.end(`
        <!DOCTYPE html>
        <html>
        <body>
          <div id="commercial-fixture-container">
            <div data-sku="B12_13">Mouse M170</div>
          </div>
        </body>
        </html>
      `);
    } else if (req.url === '/error500') {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else if (req.url === '/error404') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json', 'Set-Cookie': 'session=secret123' });
      res.end(JSON.stringify({ ok: true }));
    }
  });

  await new Promise(resolve => testServer.listen(0, '127.0.0.1', resolve));
  const serverPort = testServer.address().port;

  try {
    // MANDATORY TEST 1: DOM is wrong but environment variable contains the 4 valid IDs -> MUST FAIL
    await runTest('2.1 MANDATORY: DOM has wrong cards but env var contains correct IDs -> MUST FAIL (Anti-Bypass Guard)', async () => {
      const originalEnv = process.env.TEST_MOCK_STAGING_IDS;
      process.env.TEST_MOCK_STAGING_IDS = JSON.stringify(['B12_13', 'B12_15', 'B12_05', 'PROD_JOLLIBEE_COMBO_02']);

      let failed = false;
      const tmpReceiptPath = path.resolve('07_QUALITY_ASSURANCE/tmp_anti_bypass_receipt.json');

      try {
        await verifyStagingGuard(
          `http://127.0.0.1:${serverPort}/wrong_dom.html`,
          ['B12_13', 'B12_15', 'B12_05', 'PROD_JOLLIBEE_COMBO_02'],
          tmpReceiptPath
        );
      } catch (err) {
        failed = true;
        assert.ok(err.message.includes('Staging Guard Assertion Failed'), 'Error must report assertion failure');
      } finally {
        process.env.TEST_MOCK_STAGING_IDS = originalEnv || '';
        if (fs.existsSync(tmpReceiptPath)) {
          const writtenReceipt = JSON.parse(fs.readFileSync(tmpReceiptPath, 'utf8'));
          assert.strictEqual(writtenReceipt.all_passed, false, 'Saved receipt must record all_passed: false');
          assert.strictEqual(writtenReceipt.staging_guard_assertions.status, 'FAIL', 'Saved receipt status must be FAIL');
          fs.unlinkSync(tmpReceiptPath);
        }
      }

      assert.strictEqual(failed, true, 'Runner MUST FAIL when real DOM does not match, ignoring any mock env variables');
    });

    await runTest('2.2 fetchWithGuards rejects HTTP 500 error before parsing', async () => {
      await assert.rejects(
        async () => {
          await fetchWithGuards(`http://127.0.0.1:${serverPort}/error500`, {}, 3000);
        },
        /HTTP Error: server returned status 500/
      );
    });

    await runTest('2.3 fetchWithGuards rejects HTTP 404 error before parsing', async () => {
      await assert.rejects(
        async () => {
          await fetchWithGuards(`http://127.0.0.1:${serverPort}/error404`, {}, 3000);
        },
        /HTTP Error: server returned status 404/
      );
    });

    await runTest('2.4 sanitizeHeaders redacts set-cookie, auth tokens, and sensitive headers', () => {
      const raw = {
        'content-type': 'application/json',
        'set-cookie': 'secret_cookie=123',
        'authorization': 'Bearer secret_token',
        'x-auth-token': 'token_abc',
        'proxy-authorization': 'Basic credentials',
        'date': 'Sun, 06 Sep 2026 06:00:00 GMT'
      };
      const clean = sanitizeHeaders(raw);
      assert.strictEqual(clean['set-cookie'], '[REDACTED_SANITIZED]');
      assert.strictEqual(clean['authorization'], '[REDACTED_SANITIZED]');
      assert.strictEqual(clean['x-auth-token'], '[REDACTED_SANITIZED]');
      assert.strictEqual(clean['proxy-authorization'], '[REDACTED_SANITIZED]');
      assert.strictEqual(clean['content-type'], 'application/json');
      assert.strictEqual(clean['date'], 'Sun, 06 Sep 2026 06:00:00 GMT');
    });

    await runTest('2.5 generateTestReceipt writes strictly labeled TEST_ONLY receipts', () => {
      const tmpTestReceipt = path.resolve('07_QUALITY_ASSURANCE/tmp_test_only_receipt.json');
      try {
        const rep = generateTestReceipt(['B12_13', 'B12_15'], ['B12_13', 'B12_15', 'B12_05'], tmpTestReceipt);
        assert.strictEqual(rep.receipt_name, 'TEST_MOCK_STAGING_RECEIPT');
        assert.strictEqual(rep.scope, 'TEST_ONLY — KHÔNG PHÊ DUYỆT STAGING/PRODUCTION');
        assert.strictEqual(rep.all_passed, false);
      } finally {
        if (fs.existsSync(tmpTestReceipt)) fs.unlinkSync(tmpTestReceipt);
      }
    });
  } finally {
    testServer.close();
  }

  // -----------------------------------------------------------------------------
  // Group 3: Anti-Synthesis & Address Proof Requirement (Strict Parsers)
  // -----------------------------------------------------------------------------
  console.log('\n--- Group 3: Anti-Synthesis & Address Proof Requirement ---');

  await runTest('3.1 parseLotteCinemaHtmlStrict rejects HTML with only navigation item / cinemaID but no address', () => {
    const mockHtml = '<html><body><select><option value="8007">Đà Nẵng</option></select></body></html>';
    const res = parseLotteCinemaHtmlStrict(mockHtml, 'mock_sha');
    assert.strictEqual(res.length, 0, 'Must emit 0 locations when physical address is missing');
  });

  await runTest('3.2 parseMetizHtmlStrict rejects HTML with only tax code and hotline but no facility address', () => {
    const mockHtml = '<html><body><footer>CÔNG TY TNHH KHỞI PHÁT - MST: 0400668112 - Hotline: 0236 3630 689</footer></body></html>';
    const res = parseMetizHtmlStrict(mockHtml, 'mock_sha');
    assert.strictEqual(res.length, 0, 'Must emit 0 locations when physical facility address is missing');
  });

  await runTest('3.3 parseMetizHtmlStrict accepts HTML only if explicit physical address exists', () => {
    const mockHtml = '<html><body><div class="address">Tầng 1 Helio Center, Đường 2 Tháng 9, P. Hòa Cường Bắc, Q. Hải Châu, TP. Đà Nẵng</div></body></html>';
    const res = parseMetizHtmlStrict(mockHtml, 'mock_sha');
    assert.strictEqual(res.length, 1);
    assert.strictEqual(res[0].location_id, 'metiz_cinema_helio');
    assert.strictEqual(res[0].district, 'Hải Châu');
  });

  await runTest('3.4 parsePhucLongApiStrict rejects records with empty or missing officeAddress', () => {
    const mockPayload = {
      data: [
        { storeCode: '9999', storeName: 'Missing Address', officeAddress: null },
        { storeCode: '9998', storeName: 'Empty Address', officeAddress: '   ' },
        { storeCode: '1001', storeName: 'Phúc Long Nguyễn Văn Linh', officeAddress: '59 Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng' }
      ]
    };
    const res = parsePhucLongApiStrict(mockPayload, 1, 'mock_sha');
    assert.strictEqual(res.length, 1);
    assert.strictEqual(res[0].store_code, '1001');
    assert.strictEqual(res[0].district, 'Hải Châu');
  });

  await runTest('3.5 parsePhiLongHtmlStrict extracts verbatim spans without synthesizing code, district, or phone', () => {
    const mockHtml = `
      <ul class="stores">
        <li class="s-item"><span>Phi Long 152-158 Hàm Nghi, Đà Nẵng</span><span class="phone">0236 3888 000</span></li>
        <li class="s-item"><span>Phi Long 52 Nguyễn Văn Linh, Đà Nẵng</span><span class="phone">0236 3888 000</span></li>
      </ul>
    `;
    const res = parsePhiLongHtmlStrict(mockHtml, 'mock_sha');
    assert.strictEqual(res.length, 2);
    assert.strictEqual(res[0].store_code, null, 'Must NOT synthesize sequential store code');
    assert.strictEqual(res[0].district, null, 'Must NOT infer district from street name');
    assert.strictEqual(res[0].phone, null, 'Must NOT synthesize or guess phone association');
    assert.strictEqual(res[0].location_id, 'phi_long_ham_nghi');
    assert.strictEqual(res[1].location_id, 'phi_long_nguyen_van_linh');
    assert.ok(res[0].provenance.byte_offset !== null && res[0].provenance.byte_offset >= 0);
  });

  await runTest('3.6 parseJollibeeHtmlStrict strictly excludes out-of-province false positives', () => {
    const mockHtml = `
      <script>
        window.storeIframes = [
          { "id": 1, "name": "Jollibee Co.opmart Tam Kỳ", "address": "Co.opmart Tam Kỳ, TP. Tam Kỳ, Quảng Nam", "phone": "0235 385 8888" },
          { "id": 2, "name": "Jollibee Đà Nẵng Hải Phòng", "address": "Số 15 Phố Đà Nẵng, Ngô Quyền, TP. Hải Phòng", "phone": "0225 385 8888" },
          { "id": 3, "name": "Jollibee Vincom Đà Nẵng", "address": "Tầng 4 TTTM Vincom Đà Nẵng, 910A Ngô Quyền, Q. Sơn Trà, TP. Đà Nẵng", "phone": "0236 399 6666" }
        ];
      </script>
    `;
    const res = parseJollibeeHtmlStrict(mockHtml, 'mock_sha');
    assert.strictEqual(res.length, 1, 'Only genuine Da Nang facility must be admitted');
    assert.strictEqual(res[0].store_code, '3');
    assert.strictEqual(res[0].district, 'Sơn Trà');
    assert.strictEqual(res[0].phone, '02363996666');
  });

  await runTest('3.7 parseCGVCinemaHtmlStrict extracts genuine cinema facility and exact district', () => {
    const mockHtml = `
      <div class="page-title theater-title"><h3>CGV Vĩnh Trung Plaza</h3></div>
      <div class="theater-address">255-257 đường Hùng Vương Quận Thanh Khê Tp. Đà Nẵng</div>
      <label>Hotline : </label><div class="theater-contact">1900 6017</div>
    `;
    const res = parseCGVCinemaHtmlStrict(mockHtml, 'mock_sha', 'https://www.cgv.vn/default/cinox/site/cgv-vinh-trung-plaza');
    assert.strictEqual(res.length, 1);
    assert.strictEqual(res[0].name, 'CGV Vĩnh Trung Plaza');
    assert.strictEqual(res[0].district, 'Thanh Khê');
    assert.strictEqual(res[0].phone, '1900 6017');
    assert.strictEqual(res[0].store_code, 'cgv_vinh_trung_plaza');
  });

  await runTest('3.8 parseGalaxyCinemaHtmlStrict extracts facility with SSR comment markers', () => {
    const mockHtml = `
      <title>Lịch Chiếu Phim Rạp Galaxy Cinema Coop Đà Nẵng</title>
      <p><span class="text-grey-40">Địa chỉ<!-- -->:</span> <!-- -->Tầng 3, TTTM Co.opmart Đà Nẵng - 478 Điện Biên Phủ, Phường Thanh Khê, TP. Đà Nẵng<!-- --> </p>
      <p><span class="text-grey-40">Hotline<!-- -->:</span> <a href="tel:1900 2224">1900 2224</a></p>
    `;
    const res = parseGalaxyCinemaHtmlStrict(mockHtml, 'mock_sha');
    assert.strictEqual(res.length, 1);
    assert.strictEqual(res[0].name, 'Galaxy Cinema Coop Đà Nẵng');
    assert.strictEqual(res[0].phone, '1900 2224');
    assert.ok(res[0].verbatim_address.includes('478 Điện Biên Phủ'));
    assert.ok(res[0].provenance.byte_offset !== null && res[0].provenance.byte_offset >= 0);
  });

  await runTest('3.9 parseCGVCinemaHtmlStrict preserves exact verbatim address and provides separate normalized display address', () => {
    const mockHtml = `
      <div class="page-title theater-title"><h3>CGV MM Supercenter Đà Nẵng</h3></div>
      <div class="theater-address">Tầng 3, Trung tâm thương mại MM Supercenter Đà Nẵng,Tầng 3, Trung Tâm Thương Mại MM Mega Market Đà Nẵng, 167 Đường Nguyễn Sinh Sắc, Phường Hòa Khánh, Thành phố Đà Nẵng</div>
      <label>Hotline : </label><div class="theater-contact">1900 6017</div>
    `;
    const res = parseCGVCinemaHtmlStrict(mockHtml, 'mock_sha', 'https://www.cgv.vn/default/cinox/site/cgv-mm-da-nang');
    assert.strictEqual(res.length, 1);
    assert.strictEqual(res[0].verbatim_address, 'Tầng 3, Trung tâm thương mại MM Supercenter Đà Nẵng,Tầng 3, Trung Tâm Thương Mại MM Mega Market Đà Nẵng, 167 Đường Nguyễn Sinh Sắc, Phường Hòa Khánh, Thành phố Đà Nẵng', 'verbatim_address must NOT be trimmed or altered');
    assert.strictEqual(res[0].display_address, 'Tầng 3, TTTM MM Mega Market Đà Nẵng, 167 Đường Nguyễn Sinh Sắc, Phường Hòa Khánh, TP. Đà Nẵng', 'display_address must provide clean normalized address');
  });

  await runTest('3.10 Offline replay records checked_this_run: false and cites historical probes for un-probed brands', () => {
    const baseVault = path.resolve('06_TRUST_AND_EVIDENCE/batch_13_locator_vault');
    const runDirs = fs.readdirSync(baseVault)
      .filter(d => d.startsWith('run_') && fs.statSync(path.join(baseVault, d)).isDirectory())
      .sort();
    const latestRun = runDirs[runDirs.length - 1];
    const summary = JSON.parse(fs.readFileSync(path.join(baseVault, latestRun, 'HARVEST_SUMMARY_REPORT.json')));

    assert.strictEqual(summary.brand_completeness_matrix.highlands_coffee.checked_this_run, false);
    assert.strictEqual(summary.brand_completeness_matrix.highlands_coffee.status, 'NOT_CHECKED_THIS_RUN');
    assert.strictEqual(summary.brand_completeness_matrix.highlands_coffee.observed_status, 'HISTORICAL_PROBE__BLOCKED_403_WAF');
    assert.strictEqual(summary.brand_completeness_matrix.highlands_coffee.historical_observation_unverified, true, 'Highlands must record historical_observation_unverified: true when no receipt exists');
    assert.strictEqual(summary.brand_completeness_matrix.highlands_coffee.observed_at, null, 'Must NOT synthesize or hardcode timestamp when receipt is absent');

    assert.strictEqual(summary.brand_completeness_matrix.dien_may_xanh.checked_this_run, false);
    assert.strictEqual(summary.brand_completeness_matrix.dien_may_xanh.status, 'NOT_CHECKED_THIS_RUN');
    assert.strictEqual(summary.brand_completeness_matrix.dien_may_xanh.observed_status, 'HISTORICAL_PROBE__SERVER_ERROR_500');
    assert.strictEqual(summary.brand_completeness_matrix.dien_may_xanh.historical_observation_unverified, true, 'DMX must record historical_observation_unverified: true when no receipt exists');
    assert.strictEqual(summary.brand_completeness_matrix.dien_may_xanh.observed_at, null, 'Must NOT synthesize or hardcode timestamp when receipt is absent');
  });

  await runTest('3.11 Brand provenance timestamps are strictly isolated and NEVER leak across brands', () => {
    const baselineDir = path.resolve('06_TRUST_AND_EVIDENCE/batch_13_locator_vault/run_20260906_125250');
    
    // 1. Un-probed / file-less brands
    const hlProv = resolveBrandProvenanceTimestamps(baselineDir, 'highlands_coffee');
    assert.strictEqual(hlProv.server_date, null, 'Highlands server_date must be null');
    assert.strictEqual(hlProv.captured_at, null, 'Highlands captured_at must be null without receipt');
    assert.strictEqual(hlProv.file_mtime, null, 'Highlands file_mtime must be null when no file exists');
    assert.strictEqual(hlProv.observed_at, null, 'Highlands observed_at must be null');
    assert.strictEqual(hlProv.historical_observation_unverified, true, 'Highlands must be unverified');
    assert.strictEqual(getReplayTimestamp(baselineDir, 'highlands_coffee'), null, 'getReplayTimestamp must return null for Highlands');

    const dmxProv = resolveBrandProvenanceTimestamps(baselineDir, 'dien_may_xanh');
    assert.strictEqual(dmxProv.server_date, null, 'DMX server_date must be null');
    assert.strictEqual(dmxProv.captured_at, null, 'DMX captured_at must be null without receipt');
    assert.strictEqual(dmxProv.file_mtime, null, 'DMX file_mtime must be null');
    assert.strictEqual(dmxProv.observed_at, null, 'DMX observed_at must be null');
    assert.strictEqual(dmxProv.historical_observation_unverified, true, 'DMX must be unverified');
    assert.strictEqual(getReplayTimestamp(baselineDir, 'dien_may_xanh'), null);

    // 2. Arbitrary non-existent brand
    const ghostProv = resolveBrandProvenanceTimestamps(baselineDir, 'ghost_brand_nonexistent');
    assert.strictEqual(ghostProv.server_date, null);
    assert.strictEqual(ghostProv.captured_at, null);
    assert.strictEqual(ghostProv.file_mtime, null);
    assert.strictEqual(ghostProv.observed_at, null);
    assert.strictEqual(ghostProv.historical_observation_unverified, true);
    assert.strictEqual(getReplayTimestamp(baselineDir, 'ghost_brand_nonexistent'), null);

    // 3. Brand with raw HTML files but NO headers file in baseline (CGV)
    // CRITICAL: MUST NOT steal headers from Jollibee or Phi Long!
    const cgvProv = resolveBrandProvenanceTimestamps(baselineDir, 'cgv_cinemas');
    assert.strictEqual(cgvProv.server_date, null, 'CGV server_date must NOT leak from Jollibee or other headers');
    assert.strictEqual(cgvProv.captured_at, null, 'CGV captured_at must be null without receipt');
    assert.ok(cgvProv.file_mtime !== null, 'CGV raw file mtime should be present from cgv raw files');
    assert.strictEqual(cgvProv.observed_at, null, 'CGV observed_at must NOT use file_mtime as capture timestamp');
    assert.strictEqual(cgvProv.historical_observation_unverified, true, 'CGV must remain unverified without genuine server_date or receipt');
    assert.strictEqual(getReplayTimestamp(baselineDir, 'cgv_cinemas'), null, 'CGV replay timestamp must be null');

    // 4. Brand with genuine Date header (Jollibee)
    const jbProv = resolveBrandProvenanceTimestamps(baselineDir, 'jollibee');
    assert.strictEqual(jbProv.server_date, '2026-09-06T05:52:53.000Z', 'Jollibee genuine Date header must be parsed');
    assert.strictEqual(jbProv.observed_at, '2026-09-06T05:52:53.000Z');
    assert.strictEqual(jbProv.historical_observation_unverified, false);
    assert.strictEqual(getReplayTimestamp(baselineDir, 'jollibee'), '2026-09-06T05:52:53.000Z');

    // 5. Verify file candidate scoping
    const jbCandidates = getBrandFileCandidates(baselineDir, 'jollibee');
    assert.ok(jbCandidates.headers.every(h => path.basename(h).startsWith('jollibee')), 'Jollibee candidates must only match jollibee files');
    const cgvCandidates = getBrandFileCandidates(baselineDir, 'cgv_cinemas');
    assert.ok(cgvCandidates.headers.every(h => path.basename(h).startsWith('cgv_')), 'CGV candidates must only match cgv files');
  });

  await runTest('3.12 MANDATORY: Policy term marked VERIFIED lacking text_span, byte_offset, or raw hash MUST cause verification to FAIL', () => {
    // Subtest A: Term marked VERIFIED with missing text_span
    const invalidSpanMatrix = {
      matrix_name: 'TEST_FAIL_SPAN',
      version: '1.0',
      policies: [{
        policy_id: 'POLICY_TEST_A',
        brand_id: 'cgv_cinemas',
        raw_source_path: '05_DEAL_AND_AFFILIATE/candidates/evidence_snapshots/cgv_culture_day_official_promo_raw.html',
        raw_sha256: 'f8f1fe1922c945bf9b84e0860fd498f68a37e33e9e86be5784234d498a75e3eb',
        terms: {
          invalid_term: {
            text_span: null, // missing span!
            byte_offset: 100,
            status: 'VERIFIED'
          }
        }
      }]
    };
    const repA = verifyAllPolicySpans(invalidSpanMatrix, { saveReceipt: false });
    assert.strictEqual(repA.all_passed, false, 'Must fail when text_span is null for VERIFIED term');
    assert.strictEqual(repA.total_spans_failed, 1, 'total_spans_failed must increment');
    assert.ok(repA.policy_results[0].spans_checked[0].error.includes('MANDATORY_FAIL'), 'Must record mandatory fail error');

    // Subtest B: Term marked VERIFIED with missing byte_offset
    const invalidOffsetMatrix = {
      matrix_name: 'TEST_FAIL_OFFSET',
      version: '1.0',
      policies: [{
        policy_id: 'POLICY_TEST_B',
        brand_id: 'cgv_cinemas',
        raw_source_path: '05_DEAL_AND_AFFILIATE/candidates/evidence_snapshots/cgv_culture_day_official_promo_raw.html',
        raw_sha256: 'f8f1fe1922c945bf9b84e0860fd498f68a37e33e9e86be5784234d498a75e3eb',
        terms: {
          invalid_term: {
            text_span: 'CGV CULTURE DAY',
            byte_offset: null, // missing offset!
            status: 'VERIFIED'
          }
        }
      }]
    };
    const repB = verifyAllPolicySpans(invalidOffsetMatrix, { saveReceipt: false });
    assert.strictEqual(repB.all_passed, false, 'Must fail when byte_offset is null for VERIFIED term');
    assert.strictEqual(repB.total_spans_failed, 1);

    // Subtest C: Policy with raw_sha256 mismatch
    const hashMismatchMatrix = {
      matrix_name: 'TEST_FAIL_HASH',
      version: '1.0',
      policies: [{
        policy_id: 'POLICY_TEST_C',
        brand_id: 'cgv_cinemas',
        raw_source_path: '05_DEAL_AND_AFFILIATE/candidates/evidence_snapshots/cgv_culture_day_official_promo_raw.html',
        raw_sha256: '0000000000000000000000000000000000000000000000000000000000000000', // bad hash
        terms: {
          valid_term: {
            text_span: 'CGV CULTURE DAY - THỨ HAI CUỐI CÙNG CỦA THÁNG ĐÃ TRỞ LẠI !!!',
            byte_offset: 263,
            status: 'VERIFIED'
          }
        }
      }]
    };
    const repC = verifyAllPolicySpans(hashMismatchMatrix, { saveReceipt: false });
    assert.strictEqual(repC.all_passed, false, 'Must fail when raw_sha256 does not match disk file');
    assert.strictEqual(repC.policy_results[0].raw_sha256_match, false);
  });

  await runTest('3.13 MANDATORY: validateCaptureReceipt strictly enforces 3-way match (brand, URL, raw hash)', () => {
    const baselineDir = path.resolve('06_TRUST_AND_EVIDENCE/batch_13_locator_vault/run_20260906_125250');
    const validJollibeeHtmlPath = path.join(baselineDir, 'jollibee.raw.html');
    const validJollibeeHash = crypto.createHash('sha256').update(fs.readFileSync(validJollibeeHtmlPath)).digest('hex');

    // Case 1: Valid 3-way match
    const validReceipt = {
      brand_id: 'jollibee',
      locator_url: 'https://jollibee.com.vn/cua-hang',
      raw_sha256: validJollibeeHash,
      raw_file: 'jollibee.raw.html',
      captured_at_utc: '2026-09-06T05:52:53.000Z'
    };
    const resValid = validateCaptureReceipt(validReceipt, 'jollibee', 'https://jollibee.com.vn/cua-hang', baselineDir);
    assert.strictEqual(resValid.valid, true, 'Must pass when brand, URL, and hash match');
    assert.strictEqual(resValid.captured_at, '2026-09-06T05:52:53.000Z');

    // Case 2: Brand Mismatch
    const resBrandMismatch = validateCaptureReceipt(validReceipt, 'cgv_cinemas', 'https://jollibee.com.vn/cua-hang', baselineDir);
    assert.strictEqual(resBrandMismatch.valid, false, 'Must fail on brand mismatch');
    assert.ok(resBrandMismatch.reason.includes('BRAND_MISMATCH'));

    // Case 3: URL Mismatch
    const resUrlMismatch = validateCaptureReceipt(validReceipt, 'jollibee', 'https://jollibee.com.vn/khuyen-mai', baselineDir);
    assert.strictEqual(resUrlMismatch.valid, false, 'Must fail on URL mismatch');
    assert.ok(resUrlMismatch.reason.includes('URL_MISMATCH'));

    // Case 4: Raw Hash Mismatch
    const tamperedReceipt = {
      ...validReceipt,
      raw_sha256: 'badhash000000000000000000000000000000000000000000000000000000000'
    };
    const resHashMismatch = validateCaptureReceipt(tamperedReceipt, 'jollibee', 'https://jollibee.com.vn/cua-hang', baselineDir);
    assert.strictEqual(resHashMismatch.valid, false, 'Must fail on hash mismatch');
    assert.ok(resHashMismatch.reason.includes('RAW_HASH_MISMATCH'));

    // Case 5: Missing Timestamp
    const noTimeReceipt = {
      brand_id: 'jollibee',
      locator_url: 'https://jollibee.com.vn/cua-hang',
      raw_sha256: validJollibeeHash,
      raw_file: 'jollibee.raw.html'
    };
    const resNoTime = validateCaptureReceipt(noTimeReceipt, 'jollibee', 'https://jollibee.com.vn/cua-hang', baselineDir);
    assert.strictEqual(resNoTime.valid, false, 'Must fail on missing timestamp');
    assert.strictEqual(resNoTime.reason, 'MISSING_TIMESTAMP');
  });

  await runTest('3.14 MANDATORY: verifyPolicyIngressScope validates all 3 ingress candidates and fails if any condition is violated', () => {
    // 1. Production scope file MUST pass 3/3
    const rep = verifyPolicyIngressScope(null, { saveReceipt: false });
    assert.strictEqual(rep.all_passed, true, 'Production scope file must pass all checks');
    assert.strictEqual(rep.candidates_passed, 3);
    assert.strictEqual(rep.candidates_failed, 0);

    // 2. Failure case: Mutated SHA-256
    const scopeData = JSON.parse(fs.readFileSync('04_DATA_PIPELINE/batch_matrix/BATCH_13_POLICY_INGRESS_SCOPE.json', 'utf8'));
    const mutatedHashScope = JSON.parse(JSON.stringify(scopeData));
    mutatedHashScope.candidates[0].link_provenance.parent_file_sha256 = '0000000000000000000000000000000000000000000000000000000000000000';
    const repFailHash = verifyPolicyIngressScope(mutatedHashScope, { saveReceipt: false });
    assert.strictEqual(repFailHash.all_passed, false, 'Must fail on SHA-256 mismatch');
    assert.strictEqual(repFailHash.candidate_results[0].checks.file_sha256_match, false);

    // 3. Failure case: Mutated span_start
    const mutatedSpanScope = JSON.parse(JSON.stringify(scopeData));
    mutatedSpanScope.candidates[1].link_provenance.span_start = 100;
    const repFailSpan = verifyPolicyIngressScope(mutatedSpanScope, { saveReceipt: false });
    assert.strictEqual(repFailSpan.all_passed, false, 'Must fail on byte slice mismatch');
    assert.strictEqual(repFailSpan.candidate_results[1].checks.byte_slice_match, false);

    // 4. Failure case: Predefined price assertion
    const mutatedAssertScope = JSON.parse(JSON.stringify(scopeData));
    mutatedAssertScope.candidates[2].policy_scope_required.push('Giá combo 69k cho học sinh');
    const repFailAssert = verifyPolicyIngressScope(mutatedAssertScope, { saveReceipt: false });
    assert.strictEqual(repFailAssert.all_passed, false, 'Must fail when predefined price is injected');
    assert.strictEqual(repFailAssert.candidate_results[2].checks.no_predefined_assertions, false);
  });

  // -----------------------------------------------------------------------------
  // Group 4: Policy Engine Separation & Independent Audit
  // -----------------------------------------------------------------------------
  console.log('\n--- Group 4: Policy Engine Separation ---');

  await runTest('4.1 Phúc Long standard store has separate earning and redemption ELIGIBLE status', () => {
    const loc = {
      brand_id: 'phuclong',
      store_code: '1001',
      verbatim_address: '59 Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng'
    };
    const policy = evaluatePolicyEligibilityStrict(loc);
    assert.strictEqual(policy.earning_status, 'ELIGIBLE');
    assert.strictEqual(policy.redemption_status, 'ELIGIBLE');
    assert.strictEqual(policy.overall_status, 'ELIGIBLE');
  });

  await runTest('4.2 Phúc Long Airport store has EXCLUDED earning and UNVERIFIED redemption (no conflation)', () => {
    const loc = {
      brand_id: 'phuclong',
      store_code: '2129',
      verbatim_address: 'DV-03 Cảng hàng không quốc tế Đà Nẵng, Quận Hải Châu, Đà Nẵng'
    };
    const policy = evaluatePolicyEligibilityStrict(loc);
    assert.strictEqual(policy.earning_status, 'EXCLUDED', 'Airport must be explicitly EXCLUDED for earning points');
    assert.strictEqual(policy.redemption_status, 'UNVERIFIED', 'Airport redemption must be UNVERIFIED, not merged or assumed');
    assert.strictEqual(policy.overall_status, 'EXCLUDED');
  });

  await runTest('4.3 Phi Long price observation does NOT grant store-wide deal eligibility', () => {
    const loc = {
      brand_id: 'phi_long',
      store_code: null,
      verbatim_address: 'Phi Long 152-158 Hàm Nghi, Đà Nẵng'
    };
    const policy = evaluatePolicyEligibilityStrict(loc);
    assert.strictEqual(policy.overall_status, 'UNVERIFIED');
    assert.strictEqual(policy.earning_status, 'NOT_APPLICABLE');
    assert.ok(policy.reason.includes('không phải chính sách chuỗi'));
  });

  await runTest('4.4 Jollibee policy remains UNVERIFIED pending leaf menu approval', () => {
    const loc = {
      brand_id: 'jollibee',
      store_code: '45',
      verbatim_address: 'Vincom Đà Nẵng'
    };
    const policy = evaluatePolicyEligibilityStrict(loc);
    assert.strictEqual(policy.overall_status, 'UNVERIFIED');
    assert.strictEqual(policy.earning_status, 'UNVERIFIED');
    assert.strictEqual(policy.redemption_status, 'UNVERIFIED');
  });

  await runTest('4.5 CGV policy remains UNVERIFIED pending U22 student promo audit', () => {
    const loc = {
      brand_id: 'cgv_cinemas',
      store_code: 'cgv_vincom_da_nang',
      verbatim_address: 'Vincom Đà Nẵng'
    };
    const policy = evaluatePolicyEligibilityStrict(loc);
    assert.strictEqual(policy.overall_status, 'UNVERIFIED');
    assert.strictEqual(policy.earning_status, 'UNVERIFIED');
  });

  await runTest('4.6 Galaxy policy remains UNVERIFIED pending U22 2026 recency audit', () => {
    const loc = {
      brand_id: 'galaxy_cinema',
      store_code: 'galaxy_coop_da_nang',
      verbatim_address: '478 Điện Biên Phủ'
    };
    const policy = evaluatePolicyEligibilityStrict(loc);
    assert.strictEqual(policy.overall_status, 'UNVERIFIED');
    assert.strictEqual(policy.earning_status, 'UNVERIFIED');
  });

  // -----------------------------------------------------------------------------
  // Group 5: Staging Guard Dynamic Boolean Assertions (Exported Function)
  // -----------------------------------------------------------------------------
  console.log('\n--- Group 5: Staging Guard Dynamic Boolean Assertions ---');

  await runTest('5.1 evaluateStagingAssertions passes when mounted cards match exactly [B12_13, B12_15, B12_05, PROD_JOLLIBEE_COMBO_02]', () => {
    const result = evaluateStagingAssertions(['B12_13', 'B12_15', 'B12_05', 'PROD_JOLLIBEE_COMBO_02'], ['B12_13', 'B12_15', 'B12_05', 'PROD_JOLLIBEE_COMBO_02']);
    assert.strictEqual(result.all_passed, true);
    assert.strictEqual(result.status, 'PASS');
    assert.strictEqual(result.has_exact_count, true);
    assert.strictEqual(result.has_all_expected, true);
    assert.strictEqual(result.has_no_extras, true);
    assert.strictEqual(result.zero_duplicates, true);
  });

  await runTest('5.2 evaluateStagingAssertions FAILS if unauthorized deal card is injected', () => {
    const result = evaluateStagingAssertions(['B12_13', 'B12_15', 'B12_05', 'PROD_JOLLIBEE_COMBO_02', 'B12_99_UNAPPROVED'], ['B12_13', 'B12_15', 'B12_05', 'PROD_JOLLIBEE_COMBO_02']);
    assert.strictEqual(result.all_passed, false);
    assert.strictEqual(result.status, 'FAIL');
    assert.strictEqual(result.has_no_extras, false);
    assert.strictEqual(result.has_exact_count, false);
  });

  await runTest('5.3 evaluateStagingAssertions FAILS if cards are duplicated', () => {
    const result = evaluateStagingAssertions(['B12_13', 'B12_15', 'B12_05', 'PROD_JOLLIBEE_COMBO_02', 'PROD_JOLLIBEE_COMBO_02'], ['B12_13', 'B12_15', 'B12_05', 'PROD_JOLLIBEE_COMBO_02']);
    assert.strictEqual(result.all_passed, false);
    assert.strictEqual(result.status, 'FAIL');
    assert.strictEqual(result.zero_duplicates, false);
  });

  await runTest('5.4 evaluateStagingAssertions FAILS if any approved card is missing', () => {
    const result = evaluateStagingAssertions(['B12_13', 'B12_15', 'B12_05'], ['B12_13', 'B12_15', 'B12_05', 'PROD_JOLLIBEE_COMBO_02']);
    assert.strictEqual(result.all_passed, false);
    assert.strictEqual(result.status, 'FAIL');
    assert.strictEqual(result.has_all_expected, false);
    assert.strictEqual(result.has_exact_count, false);
  });

  // -----------------------------------------------------------------------------
  // Group 6: CLI Process Exit Code Verification (Integration)
  // -----------------------------------------------------------------------------
  console.log('\n--- Group 6: CLI Process Exit Code Verification ---');

  await runTest('6.1 Runner CLI exits with code 0 on verified offline replay with real DOM', () => {
    let succeededWithExitCode0 = false;
    try {
      execSync('node 04_DATA_PIPELINE/harvest_danang_locations.js --offline', {
        stdio: 'pipe'
      });
      succeededWithExitCode0 = true;
    } catch (err) {
      succeededWithExitCode0 = false;
    }
    assert.strictEqual(succeededWithExitCode0, true, 'Runner CLI MUST exit with code 0 on successful offline replay');
  });

  await runTest('6.2 Generated table in GENERATED_TABLES.md preserves unaltered verbatim address for CGV MM', () => {
    const tableContent = fs.readFileSync('06_TRUST_AND_EVIDENCE/batch_13_locator_vault/GENERATED_TABLES.md', 'utf8');
    assert.ok(tableContent.includes('Tầng 3, Trung tâm thương mại MM Supercenter Đà Nẵng,Tầng 3, Trung Tâm Thương Mại MM Mega Market Đà Nẵng, 167 Đường Nguyễn Sinh Sắc, Phường Hòa Khánh, Thành phố Đà Nẵng'), 'Table MUST contain exact unshortened verbatim address string');
    assert.ok(tableContent.includes('Tầng 3, TTTM MM Mega Market Đà Nẵng, 167 Đường Nguyễn Sinh Sắc, Phường Hòa Khánh, TP. Đà Nẵng'), 'Table MUST also contain separate display address');
  });

  console.log(`\n=== TEST SUITE SUMMARY: ${passedTests}/${totalTests} TESTS PASSED (100%) ===`);
}

main().catch(err => {
  console.error('TEST SUITE ENCOUNTERED AN UNCAUGHT ERROR:', err);
  process.exit(1);
});
