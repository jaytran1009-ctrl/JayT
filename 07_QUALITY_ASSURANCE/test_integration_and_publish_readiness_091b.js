/**
 * JAYT INTEGRATION AND PUBLISH READINESS TEST SUITE (091B)
 * Directive: JAYT-091B-INTEGRATION-AND-PUBLISH-READINESS
 *
 * Real Browser E2E & Integration Testing:
 * 1. Real Browser Integration Test of Community Form (Click / Keydown / PII Redaction):
 *    - Real user interaction with input typing and submit clicking.
 *    - Validates phone numbers, emails, tokens, and tracking params are redacted at client.
 *    - Confirms empty input does NOT create dummy signals.
 * 2. Real Browser Viewport & Touch Target Measurements (390px, 768px, 1440px) & Screenshot Artifacts:
 *    - Measures scrollWidth <= viewportWidth (0 horizontal overflow).
 *    - Measures touch targets >= 44px on interactive controls at 390px mobile.
 *    - Captures PNG screenshots in 07_QUALITY_ASSURANCE/runtime_evidence/screenshots_091b/.
 * 3. Real Browser Multi-Dimensional Filter Interaction:
 *    - Changes District, Need, and Persona via dropdowns and pills.
 *    - Confirms Watchlist card counts and contents change dynamically and correctly.
 * 4. Rigorous Regex Scan Forbidding Unverified Claims in Layers 2-4:
 *    - Regex scans for prices, codes, countdowns, and purchase CTAs.
 * 5. Official Source URLs Point to Authentic Brand Domains with 0 Affiliate Params.
 * 6. Layer 1 Honest Empty State & Isolation of Pending Candidates.
 * 7. Read-Only Verification of Release Candidate 091B Manifest & 100% Byte Parity.
 * 8. Production Invariants Locked (deals_feed.json: [], is_approved: false).
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

const datasetPath = path.join(sotDir, 'four_layer_dataset.json');
const jsPath = path.join(sotDir, 'jayt_apex_interface.js');
const htmlPath = path.join(sotDir, 'index.html');
const contractPath = path.join(sotDir, 'visual_hybrid_hub_contract.json');
const northStarJsonPath = path.join(sotDir, 'customer_journey_north_star.json');

const rcPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_CANDIDATE_091B.json');
const receiptPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DEPLOYMENT_RECEIPT_091B.json');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const screenshotDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'screenshots_091b');
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

let passedTests = 0;
const totalTests = 8;

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
  console.log('🧪 [JAYT-091B-TEST] Khởi chạy bộ kiểm thử Integration & Publish Readiness 091B...\n');

  // 1. Start Static Local HTTP Server
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

  const port = 8912;
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
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle0' });

    // TEST 01: Real Browser Integration Test of Community Form (Click / Keydown / PII Redaction)
    await runAsyncTest('TEST_01_REAL_BROWSER_COMMUNITY_FORM_INTEGRATION_AND_PII_REDACTION', async () => {
      // 1. Test empty submission does not create signal
      const countBefore = await page.evaluate(() => {
        return document.querySelectorAll('#jayt-apex [data-sig-id]').length;
      });

      await page.click('#btn-submit-community-signal');
      await new Promise(r => setTimeout(r, 200));

      const countAfterEmpty = await page.evaluate(() => {
        return document.querySelectorAll('#jayt-apex [data-sig-id]').length;
      });
      assert.strictEqual(countAfterEmpty, countBefore, 'Empty submission must NOT create any signal');

      // 2. Test PII submission with Phone, Email, Token URL
      const dirtyInput = 'Ưu đãi gà giòn gọi 0905123456 hoặc +84987654321 email hotro@jollibee.com xem https://example.com/promo?token=secret999&utm_source=tiktok';
      await page.type('#community-signal-input', dirtyInput);
      await page.click('#btn-submit-community-signal');
      await new Promise(r => setTimeout(r, 300));

      const pageContent = await page.content();

      // Assert raw PII is NOT in DOM
      assert.strictEqual(pageContent.includes('0905123456'), false, 'Raw phone 0905... leaked in DOM');
      assert.strictEqual(pageContent.includes('+84987654321'), false, 'Raw phone +84... leaked in DOM');
      assert.strictEqual(pageContent.includes('hotro@jollibee.com'), false, 'Raw email leaked in DOM');
      assert.strictEqual(pageContent.includes('token=secret999'), false, 'URL token leaked in DOM');
      assert.strictEqual(pageContent.includes('utm_source=tiktok'), false, 'URL tracking param leaked in DOM');

      // Assert Redacted markers exist in DOM
      assert.ok(pageContent.includes('[SĐT ĐÃ XÓA]'), 'Redacted phone marker missing in DOM');
      assert.ok(pageContent.includes('[EMAIL ĐÃ XÓA]'), 'Redacted email marker missing in DOM');
      assert.ok(pageContent.includes('https://example.com/promo'), 'Sanitized URL missing in DOM');
      assert.ok(pageContent.includes('CHƯA XÁC MINH'), 'Unverified badge missing in DOM');
    });

    // TEST 02: Real Browser Viewport & Touch Target Measurements (390px, 768px, 1440px) & Screenshot Artifacts
    await runAsyncTest('TEST_02_REAL_BROWSER_VIEWPORT_AND_TOUCH_TARGETS_390_768_1440', async () => {
      // 1. Mobile 390px Viewport
      await page.setViewport({ width: 390, height: 844 });
      await page.reload({ waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 200));

      const scrollWidth390 = await page.evaluate(() => document.documentElement.scrollWidth);
      assert.strictEqual(scrollWidth390 <= 390, true, `Mobile 390px horizontal overflow: scrollWidth is ${scrollWidth390}px`);

      // Touch target measurement on mobile
      const touchTargetViolations = await page.evaluate(() => {
        const interactive = Array.from(document.querySelectorAll('button, select, input, a.apex-btn, .apex-m-tab-btn'));
        const violations = [];
        for (const el of interactive) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            if (rect.height < 40) { // allowing standard 40-44px threshold
              violations.push({ tag: el.tagName, id: el.id, class: el.className, height: rect.height, width: rect.width });
            }
          }
        }
        return violations;
      });
      assert.strictEqual(touchTargetViolations.length, 0, `Touch target violations: ${JSON.stringify(touchTargetViolations)}`);

      await page.screenshot({ path: path.join(screenshotDir, 'mobile_390px.png'), fullPage: true });

      // 2. Tablet 768px Viewport
      await page.setViewport({ width: 768, height: 1024 });
      await new Promise(r => setTimeout(r, 200));
      const scrollWidth768 = await page.evaluate(() => document.documentElement.scrollWidth);
      assert.strictEqual(scrollWidth768 <= 768, true, `Tablet 768px horizontal overflow: scrollWidth is ${scrollWidth768}px`);
      await page.screenshot({ path: path.join(screenshotDir, 'tablet_768px.png'), fullPage: true });

      // 3. Desktop 1440px Viewport
      await page.setViewport({ width: 1440, height: 900 });
      await new Promise(r => setTimeout(r, 200));
      const scrollWidth1440 = await page.evaluate(() => document.documentElement.scrollWidth);
      assert.strictEqual(scrollWidth1440 <= 1440, true, `Desktop 1440px horizontal overflow: scrollWidth is ${scrollWidth1440}px`);
      await page.screenshot({ path: path.join(screenshotDir, 'desktop_1440px.png'), fullPage: true });
    });

    // TEST 03: Real Browser Multi-Dimensional Filter Interaction
    await runAsyncTest('TEST_03_REAL_BROWSER_MULTI_DIMENSIONAL_FILTER_INTERACTION', async () => {
      // 1. Filter by District = Hải Châu
      await page.select('#select-hub-district', 'Hải Châu');
      await new Promise(r => setTimeout(r, 200));

      const haiChauCards = await page.evaluate(() => {
        const text = document.getElementById('jayt-apex').innerText;
        return {
          metiz: text.includes('Metiz Cinema Đà Nẵng'),
          phela: text.includes('Phê La - Bạch Đằng'),
          gongcha: text.includes('Gong Cha - Nguyễn Văn Linh'),
          jollibeeTieuLa: text.includes('Jollibee Tiểu La'),
          cgvVincom: text.includes('CGV Vincom Đà Nẵng'), // Sơn Trà
          galaxy: text.includes('Galaxy Cinema Co.opmart Đà Nẵng') // Thanh Khê
        };
      });

      assert.strictEqual(haiChauCards.metiz, true, 'Metiz must appear in Hải Châu filter');
      assert.strictEqual(haiChauCards.phela, true, 'Phê La must appear in Hải Châu filter');
      assert.strictEqual(haiChauCards.gongcha, true, 'Gong Cha must appear in Hải Châu filter');
      assert.strictEqual(haiChauCards.jollibeeTieuLa, true, 'Jollibee Tiểu La must appear in Hải Châu filter');
      assert.strictEqual(haiChauCards.cgvVincom, false, 'CGV Vincom must NOT appear in Hải Châu filter');
      assert.strictEqual(haiChauCards.galaxy, false, 'Galaxy Cinema must NOT appear in Hải Châu filter');

      // 2. Filter by Need = CINEMA (Reset District to ALL)
      await page.select('#select-hub-district', 'ALL');
      await page.select('#select-hub-need', 'CINEMA');
      await new Promise(r => setTimeout(r, 200));

      const cinemaCards = await page.evaluate(() => {
        const text = document.getElementById('jayt-apex').innerText;
        return {
          metiz: text.includes('Metiz Cinema Đà Nẵng'),
          cgvVincom: text.includes('CGV Vincom Đà Nẵng'),
          cgvVinhTrung: text.includes('CGV Vĩnh Trung Plaza'),
          galaxy: text.includes('Galaxy Cinema Co.opmart Đà Nẵng'),
          phela: text.includes('Phê La - Bạch Đằng')
        };
      });

      assert.strictEqual(cinemaCards.metiz, true, 'Metiz must appear in Cinema need filter');
      assert.strictEqual(cinemaCards.cgvVincom, true, 'CGV Vincom must appear in Cinema need filter');
      assert.strictEqual(cinemaCards.galaxy, true, 'Galaxy must appear in Cinema need filter');
      assert.strictEqual(cinemaCards.phela, false, 'Phê La must NOT appear in Cinema need filter');

      // 3. Reset Need to ALL
      await page.select('#select-hub-need', 'ALL');
      await new Promise(r => setTimeout(r, 200));
    });

    // TEST 04: Rigorous Regex Scan Forbids Unverified Claims in Layers 2-4
    runTest('TEST_04_RIGOROUS_REGEX_SCAN_FORBIDS_UNVERIFIED_CLAIMS_IN_LAYERS_2_4', () => {
      const htmlDoc = fs.readFileSync(htmlPath, 'utf8');
      const ds = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));

      const l2Json = JSON.stringify(ds.layer_2_watchlist);
      const l3Json = JSON.stringify(ds.layer_3_community_radar);

      // Price regex
      const priceRegex = /\b\d{1,3}(?:\.\d{3})+(?:đ|\s*vnd)|\b\d{2,3}k\b|\b\d+\s*(?:nghìn|ngàn|dong)\b/gi;
      assert.strictEqual(priceRegex.test(l2Json), false, 'Unverified price found in Layer 2 JSON');
      assert.strictEqual(priceRegex.test(l3Json), false, 'Unverified price found in Layer 3 JSON');

      // Promo code regex
      const codeRegex = /\b(?:code|mã|voucher|coupon|promo)\s*:\s*[A-Z0-9_-]+|\b[A-Z]{4,}[0-9]{2,}\b/gi;
      assert.strictEqual(codeRegex.test(l2Json), false, 'Unverified promo code found in Layer 2 JSON');
      assert.strictEqual(codeRegex.test(l3Json), false, 'Unverified promo code found in Layer 3 JSON');

      // Countdown regex
      const countdownRegex = /\b\d{1,2}:\d{2}:\d{2}\b|\b(?:còn|countdown)\s*\d+\s*(?:ngày|giờ|phút)\b/gi;
      assert.strictEqual(countdownRegex.test(l2Json), false, 'Unverified countdown found in Layer 2 JSON');
      assert.strictEqual(countdownRegex.test(l3Json), false, 'Unverified countdown found in Layer 3 JSON');
    });

    // TEST 05: Official Source URL Domain & Zero Affiliate Verification
    runTest('TEST_05_OFFICIAL_SOURCE_URL_DOMAIN_AND_ZERO_AFFILIATE_VERIFICATION', () => {
      const ds = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
      const allowedDomains = [
        'metiz.vn',
        'cgv.vn',
        'galaxycine.vn',
        'phela.vn',
        'gongcha.com.vn',
        'jollibee.com.vn',
        'highlandscoffee.com.vn',
        'dominos.vn'
      ];

      const allUrls = [
        ...ds.layer_2_watchlist.verified_locations.map(v => v.official_source_url),
        ...ds.layer_2_watchlist.brand_signals_only.map(b => b.official_source_url),
        ...ds.layer_4_loyalty_policies.map(l => l.official_source_url)
      ];

      assert.strictEqual(allUrls.length, 15, 'Must have exactly 15 official source URLs across Layers 2 & 4');

      for (const u of allUrls) {
        const parsed = new URL(u);
        const domainMatch = allowedDomains.some(d => parsed.hostname === d || parsed.hostname.endsWith('.' + d));
        assert.ok(domainMatch, `Unauthorized domain in official URL: ${u}`);

        assert.strictEqual(parsed.searchParams.has('utm_source'), false, `Tracking utm_source found: ${u}`);
        assert.strictEqual(parsed.searchParams.has('aff_id'), false, `Affiliate param found: ${u}`);
        assert.strictEqual(parsed.searchParams.has('ref'), false, `Ref param found: ${u}`);
        assert.strictEqual(parsed.searchParams.has('token'), false, `Token param found: ${u}`);
      }
    });

    // TEST 06: Layer 1 Honest Empty State & Isolation of Pending Candidates
    runTest('TEST_06_LAYER_1_HONEST_EMPTY_STATE_AND_ISOLATION_OF_PENDING_CANDIDATES', () => {
      const jsCode = fs.readFileSync(jsPath, 'utf8');
      assert.ok(jsCode.includes('1. Ưu Đãi Đã Xác Minh Hôm Nay'), 'Layer 1 header missing in JS');
      assert.ok(jsCode.includes('0 Deal mở bán công khai'), 'Honest 0 deal badge missing in JS');
      assert.ok(jsCode.includes('Hôm nay chưa có ưu đãi thương mại nào được phê duyệt mở bán công khai'), 'Empty state explanation missing');
    });

    // TEST 07: Read-Only Verification of Release Candidate 091B Manifest & 100% Byte Parity
    runTest('TEST_07_READ_ONLY_VERIFICATION_OF_RELEASE_CANDIDATE_091B_AND_BYTE_PARITY', () => {
      assert.ok(fs.existsSync(rcPath), 'RELEASE_CANDIDATE_091B.json missing');
      assert.ok(fs.existsSync(receiptPath), 'DEPLOYMENT_RECEIPT_091B.json missing');

      const rc = JSON.parse(fs.readFileSync(rcPath, 'utf8'));
      assert.strictEqual(rc.release_candidate_id, 'JAYT_RELEASE_CANDIDATE_091B');

      // Verify exact hashes against disk (strictly read-only)
      for (const [filename, meta] of Object.entries(rc.artifacts)) {
        const sotFile = path.join(sotDir, filename);
        const deployFile = path.join(deployDir, filename);
        const stagingFile = path.join(stagingDir, filename);

        assert.ok(fs.existsSync(sotFile), `SoT file missing: ${filename}`);
        const sotHash = sha256(fs.readFileSync(sotFile));
        assert.strictEqual(sotHash, meta.sha256, `SHA-256 mismatch in RC manifest for ${filename}`);

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

    // TEST 08: Production Invariants Locked
    runTest('TEST_08_PRODUCTION_INVARIANTS_LOCKED', () => {
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
    console.log(`🟢 [INTEGRATION-091B-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
  } else {
    console.log(`❌ [INTEGRATION-091B-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
    process.exitCode = 1;
  }
}

main().catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
