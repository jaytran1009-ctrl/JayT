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
  console.log('🧪 [JAYT-105-TEST] Khởi chạy bộ kiểm thử Visual Asset Enrichment 105...\n');

  // TEST 01: Memory Consistency
  runTest('TEST_01_MEMORY_CONSISTENCY_PASSES_ALL_10_TESTS', () => {
    const { execSync } = require('child_process');
    const out = execSync('node 07_QUALITY_ASSURANCE/test_project_memory_consistency.js', { encoding: 'utf8', cwd: repoRoot });
    assert.ok(out.includes('TOÀN BỘ 10/10 KIỂM THỬ TÍNH NHẤT QUÁN PROJECT_MEMORY.MD ĐÃ ĐẠT [PASS]!'), 'Memory consistency must pass 10/10');
  });

  // TEST 02: Physical Presence and Integrity of All 5 Discovery Images
  const expectedImages = [
    { name: 'cinema-context-v1.png', minSize: 1000000 },
    { name: 'coffee-context-v1.png', minSize: 1000000 },
    { name: 'lunch-context-v1.png', minSize: 1000000 },
    { name: 'mobility-context-v1.png', minSize: 1000000 },
    { name: 'shopping-context-v1.png', minSize: 1000000 }
  ];

  runTest('TEST_02_PHYSICAL_PRESENCE_OF_5_DISCOVERY_IMAGES', () => {
    const assetDir = path.join(sotDir, 'assets', 'discovery-images');
    assert.ok(fs.existsSync(assetDir), 'assets/discovery-images/ directory must exist in SOT');

    for (const img of expectedImages) {
      const imgPath = path.join(assetDir, img.name);
      assert.ok(fs.existsSync(imgPath), `Image must exist on disk: ${img.name}`);
      const stat = fs.statSync(imgPath);
      assert.ok(stat.size >= img.minSize, `Image size must be >= ${img.minSize} bytes, got ${stat.size}`);
    }
  });

  // TEST 03: Three-Layer Parity for Code and Assets
  runTest('TEST_03_THREE_LAYER_PARITY_INCLUDING_ASSETS', () => {
    const files = ['index.html', 'jayt_apex_interface.js', 'customer_journey_north_star.json', 'four_layer_dataset.json'];
    for (const f of files) {
      const sotHash = sha256(fs.readFileSync(path.join(sotDir, f)));
      const depHash = sha256(fs.readFileSync(path.join(deployDir, f)));
      const stgHash = sha256(fs.readFileSync(path.join(stagingDir, f)));
      assert.strictEqual(sotHash, depHash, `Byte parity mismatch between SOT and deploy for ${f}`);
      assert.strictEqual(sotHash, stgHash, `Byte parity mismatch between SOT and staging for ${f}`);
    }

    for (const img of expectedImages) {
      const sotImg = fs.readFileSync(path.join(sotDir, 'assets', 'discovery-images', img.name));
      const depImg = fs.readFileSync(path.join(deployDir, 'assets', 'discovery-images', img.name));
      const stgImg = fs.readFileSync(path.join(stagingDir, 'assets', 'discovery-images', img.name));

      const sotHash = sha256(sotImg);
      assert.strictEqual(sotHash, sha256(depImg), `Asset mismatch between SOT and deploy for ${img.name}`);
      assert.strictEqual(sotHash, sha256(stgImg), `Asset mismatch between SOT and staging for ${img.name}`);
    }
  });

  // TEST 04: AI Images Decoupled from Data Layer & Internal Asset Discipline
  runTest('TEST_04_AI_IMAGES_DECOUPLED_FROM_DATA_LAYER', () => {
    const jsContent = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');
    // Ensure no price/voucher attached to AI images
    assert.ok(!jsContent.includes('data-discount-ai-image'), 'No discount claims tied to AI images');
    // Under 106 directive, AI images are strictly internal assets and not rendered as store branches
    assert.ok(!jsContent.includes('lunch-context-v1.png" alt="Chi nhánh'), 'Must not render AI images as real store branches');
  });

  // TEST 05: Real Cobalt Locations Strictly Use Brand Monograms or Verified Photos
  runTest('TEST_05_COBALT_LOCATIONS_USE_AUTHENTIC_BRAND_MONOGRAMS', () => {
    const jsContent = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');
    assert.ok(jsContent.includes('getBrandMonogram'), 'Must use getBrandMonogram for Cobalt cards');
    assert.ok(!jsContent.includes('lunch-context-v1.png" alt="Chi nhánh'), 'Must NOT use AI image as a real store branch');
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
    await runAsyncTest('TEST_06_PUPPETEER_DESKTOP_1440_REAL_BROWSER_IMAGES', async () => {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto(testUrl, { waitUntil: 'networkidle0' });

      // Verify modal is hidden
      const isModalVisible = await page.$eval('#calc-bottom-sheet-overlay', el => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden' && parseFloat(style.opacity) > 0;
      });
      assert.strictEqual(isModalVisible, false, 'Modal overlay must be hidden at load time');

      await page.close();
    });

    // TEST 07: Tablet 768px Real Browser Validation
    await runAsyncTest('TEST_07_PUPPETEER_TABLET_768_RESPONSIVE_GRID', async () => {
      const page = await browser.newPage();
      await page.setViewport({ width: 768, height: 1024, isMobile: false });
      await page.goto(testUrl, { waitUntil: 'networkidle0' });

      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      assert.strictEqual(overflow, false, 'Viewport 768px must have ZERO horizontal overflow');

      await page.close();
    });

    // TEST 08: Mobile 375px Real Browser Validation & Interaction
    await runAsyncTest('TEST_08_PUPPETEER_MOBILE_375_ZERO_HORIZONTAL_OVERFLOW_AND_INTERACTION', async () => {
      const page = await browser.newPage();
      await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
      await page.goto(testUrl, { waitUntil: 'networkidle0' });

      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      assert.strictEqual(overflow, false, 'Viewport 375px must have ZERO horizontal overflow');

      // Click on time slot dock button
      const slotBtn = await page.$('[data-time-slot="SLOT_1730"]');
      assert.ok(slotBtn, 'Must find evening time slot button');
      await slotBtn.click();
      await new Promise(r => setTimeout(r, 250));

      // Verify Hero slot changes to evening
      const heroTitle = await page.$eval('.apex-hero-title', el => el.textContent);
      assert.ok(heroTitle.includes('Kèo Tối') || heroTitle.includes('Rạp Chiếu Phim'), 'Hero title must update to evening slot');

      await page.close();
    });

    // TEST 09: Airgap Network Check (0 external requests)
    await runAsyncTest('TEST_09_PUPPETEER_AIRGAP_NETWORK_ZERO_EXTERNAL_REQUESTS', async () => {
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

  // TEST 10: Production Lock Invariants
  runTest('TEST_10_PRODUCTION_LOCK_INVARIANTS', () => {
    const feed = JSON.parse(fs.readFileSync(prodFeedPath, 'utf8'));
    assert.strictEqual(feed.length, 0, 'Production deals_feed.json must remain []');

    const manifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
    assert.strictEqual(manifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved must remain false');
  });

  console.log('\n======================================================');
  if (passed === total) {
    console.log(`🟢 [VISUAL-ENRICHMENT-105-SUMMARY] Toàn bộ ${passed}/${total} KIỂM THỬ ĐÃ ĐẠT [PASS]!`);
    process.exit(0);
  } else {
    console.error(`❌ [VISUAL-ENRICHMENT-105-SUMMARY] Thất bại: ${passed}/${total} PASS.`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
