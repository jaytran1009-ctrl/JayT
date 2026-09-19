const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const http = require('http');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const sotDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');
const deployDir = path.join(repoRoot, 'deploy', 'public');
const stagingDir = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

let passed = 0;
let total = 0;

function runTest(name, fn) {
  total++;
  try {
    fn();
    console.log(`  [${name}]: [PASS]`);
    passed++;
  } catch (err) {
    console.error(`  [${name}]: [FAIL] - ${err.message}`);
  }
}

async function runAsyncTest(name, fn) {
  total++;
  try {
    await fn();
    console.log(`  [${name}]: [PASS]`);
    passed++;
  } catch (err) {
    console.error(`  [${name}]: [FAIL] - ${err.message}`);
  }
}

function startLocalServer(rootDir) {
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.png': 'image/png'
  };

  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const filePath = path.join(rootDir, reqPath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': mimeTypes[ext] || 'text/plain',
        'Cache-Control': 'no-cache'
      });
      res.end(fs.readFileSync(filePath));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      resolve({ server, port });
    });
  });
}

async function main() {
  console.log('🧪 [JAYT-104-TEST] Khởi chạy bộ kiểm thử Humanized Discovery Polish 104...\n');

  // TEST 01: Memory Consistency
  runTest('TEST_01_MEMORY_CONSISTENCY_PASSES_ALL_10_TESTS', () => {
    const { execSync } = require('child_process');
    const out = execSync('node 07_QUALITY_ASSURANCE/test_project_memory_consistency.js', { encoding: 'utf8', cwd: repoRoot });
    assert.ok(out.includes('TOÀN BỘ 10/10 KIỂM THỬ TÍNH NHẤT QUÁN PROJECT_MEMORY.MD ĐÃ ĐẠT [PASS]!'), 'Memory consistency must pass 10/10');
  });

  // TEST 02: Zero Jargon Strings in SOT Interface
  runTest('TEST_02_ZERO_JARGON_STRINGS_IN_INTERFACE', () => {
    const jsContent = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');
    const htmlContent = fs.readFileSync(path.join(sotDir, 'index.html'), 'utf8');
    const forbidden = ['TẦNG XANH DƯƠNG', 'Cobalt Tier', 'COBALT TIER', 'JayT Discovery', 'JAYT DISCOVERY'];
    for (const term of forbidden) {
      assert.strictEqual((jsContent.match(new RegExp(term, 'gi')) || []).length, 0, `JS must not contain jargon '${term}'`);
      assert.strictEqual((htmlContent.match(new RegExp(term, 'gi')) || []).length, 0, `HTML must not contain jargon '${term}'`);
    }
  });

  // TEST 03: Monograms Function Coverage for Brands
  runTest('TEST_03_REAL_BRAND_MONOGRAMS_COVERAGE', () => {
    const jsContent = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');
    assert.ok(jsContent.includes('function getBrandMonogram'), 'Must define dynamic getBrandMonogram');
    assert.ok(jsContent.includes("text.includes('kichi')"), 'Must support Kichi');
    assert.ok(jsContent.includes("text.includes('dookki')"), 'Must support Dookki');
    assert.ok(jsContent.includes("text.includes('highlands')"), 'Must support Highlands');
    assert.ok(jsContent.includes("text.includes('the coffee house')"), 'Must support The Coffee House');
    assert.ok(jsContent.includes("text.includes('phê la')"), 'Must support Phê La');
    assert.ok(jsContent.includes("text.includes('cgv')"), 'Must support CGV');
    assert.ok(jsContent.includes("text.includes('galaxy')"), 'Must support Galaxy');
    assert.ok(jsContent.includes("text.includes('jollibee')"), 'Must support Jollibee');
  });

  // TEST 04: Community Signal Friendly Amber Style & PII Redaction
  runTest('TEST_04_FRIENDLY_AMBER_COMMUNITY_RADAR', () => {
    const jsContent = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');
    assert.ok(jsContent.includes('#FFFBEB') && jsContent.includes('#FDE68A') && jsContent.includes('#92400E'), 'Radar note must use warm amber style');
    assert.ok(!jsContent.includes('CẢNH BÁO BẢO MẬT: Tuyệt đối KHÔNG'), 'Must NOT have harsh red intimidating banner');
    assert.ok(jsContent.includes('Gửi tín hiệu an toàn'), 'Must have friendly safety notice');
  });

  // TEST 05: Single 1-Sentence Sourced Disclaimer & District Filter Pills
  runTest('TEST_05_CONCISE_DISCLAIMER_AND_DISTRICT_PILLS', () => {
    const jsContent = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');
    assert.ok(jsContent.includes('Địa chỉ đã xác minh — kiểm tra giá & điều kiện thực tế tại quán') ||
              jsContent.includes('Địa chỉ đã xác minh — vui lòng đối soát giá/ưu đãi thực tế tại quán'), 'Must have concise 1-sentence disclaimer');
    assert.ok(jsContent.includes('data-district-filter="Hải Châu"'), 'Must have Hai Chau filter');
    assert.ok(jsContent.includes('data-district-filter="Sơn Trà"'), 'Must have Son Tra filter');
    assert.ok(jsContent.includes('data-district-filter="Thanh Khê"'), 'Must have Thanh Khe filter');
  });

  // REAL BROWSER TESTS VIA PUPPETEER
  let serverInfo = null;
  let browser = null;

  try {
    serverInfo = await startLocalServer(stagingDir);
    const testUrl = `http://127.0.0.1:${serverInfo.port}/index.html`;

    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    });

    // TEST 06: Desktop 1440px Real Browser Validation
    await runAsyncTest('TEST_06_PUPPETEER_DESKTOP_1440_HUMANIZED_UI', async () => {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto(testUrl, { waitUntil: 'networkidle0' });

      // Verify slot contextual question
      const heroTitle = await page.$eval('.apex-hero-title', el => el.textContent.trim());
      assert.ok(heroTitle.length > 0, 'Hero title must be populated');

      // Verify Hero branding
      const imaxScreen = await page.$eval('.apex-hero-imax-screen', el => el.textContent.trim());
      assert.strictEqual(imaxScreen, 'JAYT ĐÀ NẴNG', 'Branding must be JAYT ĐÀ NẴNG');

      // Verify modal is hidden
      const isModalVisible = await page.$eval('#calc-bottom-sheet-overlay', el => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden' && parseFloat(style.opacity) > 0;
      });
      assert.strictEqual(isModalVisible, false, 'Modal overlay must be hidden at load time');

      // Verify exactly 1 split bill button
      const calcButtons = await page.$$eval('#btn-open-calc-sheet', els => els.length);
      assert.strictEqual(calcButtons, 1, 'Exactly 1 #btn-open-calc-sheet');

      await page.close();
    });

    // TEST 07: Mobile 375px Real Browser Validation & Zero Horizontal Overflow
    await runAsyncTest('TEST_07_PUPPETEER_MOBILE_375_ZERO_HORIZONTAL_OVERFLOW', async () => {
      const page = await browser.newPage();
      await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
      await page.goto(testUrl, { waitUntil: 'networkidle0' });

      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      assert.strictEqual(overflow, false, 'Viewport 375px must have ZERO horizontal overflow');

      // Verify interactive district pill click
      await page.click('button[data-district-filter="Hải Châu"]');
      await new Promise(r => setTimeout(r, 200));

      const haiChauActive = await page.$eval('button[data-district-filter="Hải Châu"]', el => el.classList.contains('apex-btn-pine'));
      assert.strictEqual(haiChauActive, true, 'Hai Chau district filter must activate upon click');

      await page.close();
    });

    // TEST 08: Airgap Network Check
    await runAsyncTest('TEST_08_PUPPETEER_AIRGAP_NETWORK_ZERO_EXTERNAL_REQUESTS', async () => {
      const page = await browser.newPage();
      const externalRequests = [];

      page.on('request', req => {
        const url = req.url();
        if (!url.startsWith('http://127.0.0.1') && !url.startsWith('http://localhost') && !url.startsWith('data:')) {
          externalRequests.push(url);
        }
      });

      await page.goto(testUrl, { waitUntil: 'networkidle0' });
      assert.strictEqual(externalRequests.length, 0, `Airgap violated: external requests: ${externalRequests.join(', ')}`);
      await page.close();
    });

  } finally {
    if (browser) await browser.close();
    if (serverInfo && serverInfo.server) serverInfo.server.close();
  }

  // TEST 09: Three-Layer Byte Parity
  runTest('TEST_09_THREE_LAYER_BYTE_PARITY', () => {
    const files = ['index.html', 'jayt_apex_interface.js', 'customer_journey_north_star.json', 'four_layer_dataset.json'];
    for (const f of files) {
      const sotHash = sha256(fs.readFileSync(path.join(sotDir, f)));
      const depHash = sha256(fs.readFileSync(path.join(deployDir, f)));
      const stgHash = sha256(fs.readFileSync(path.join(stagingDir, f)));
      assert.strictEqual(sotHash, depHash, `Byte parity mismatch between SOT and deploy for ${f}`);
      assert.strictEqual(sotHash, stgHash, `Byte parity mismatch between SOT and staging for ${f}`);
    }
  });

  // TEST 10: Production Lock Invariants
  runTest('TEST_10_PRODUCTION_LOCK_INVARIANTS', () => {
    const feed = JSON.parse(fs.readFileSync(prodFeedPath, 'utf8'));
    assert.strictEqual(feed.length, 0, 'Production deals_feed.json must remain []');

    const manifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
    assert.strictEqual(manifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved must remain false');
  });

  console.log('\n======================================================');
  if (passed === total) {
    console.log(`🟢 [HUMANIZED-POLISH-104-SUMMARY] Toàn bộ ${passed}/${total} KIỂM THỬ ĐÃ ĐẠT [PASS]!`);
    process.exit(0);
  } else {
    console.error(`❌ [HUMANIZED-POLISH-104-SUMMARY] Thất bại: ${passed}/${total} PASS.`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
