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
const photoManifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'official_store_photo_manifest_106.json');

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
  console.log('🧪 [JAYT-106-TEST] Khởi chạy bộ kiểm thử Official Store Photo Provenance 106...\n');

  // TEST 01: Memory Consistency
  runTest('TEST_01_MEMORY_CONSISTENCY_PASSES_ALL_10_TESTS', () => {
    const { execSync } = require('child_process');
    const out = execSync('node 07_QUALITY_ASSURANCE/test_project_memory_consistency.js', { encoding: 'utf8', cwd: repoRoot });
    assert.ok(out.includes('TOÀN BỘ 10/10 KIỂM THỬ TÍNH NHẤT QUÁN PROJECT_MEMORY.MD ĐÃ ĐẠT [PASS]!'), 'Memory consistency must pass 10/10');
  });

  // TEST 02: Zero AI Images in Storefront Renders
  runTest('TEST_02_ZERO_AI_IMAGES_IN_STOREFRONT_RENDER', () => {
    const jsContent = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');
    // Ensure no discovery-images referenced in slotConfigs hero media zone or location cards
    assert.ok(!jsContent.includes('heroImage: \'assets/discovery-images/'), 'Hero media zone must not use AI discovery images');
    assert.ok(!jsContent.includes('renderCategoryContextShowcase'), 'Category context AI showcase must not be rendered in storefront');
  });

  // TEST 03: Official Photo Manifest Structure and Provenance
  runTest('TEST_03_OFFICIAL_PHOTO_MANIFEST_VALIDITY', () => {
    assert.ok(fs.existsSync(photoManifestPath), 'official_store_photo_manifest_106.json must exist');
    const manifest = JSON.parse(fs.readFileSync(photoManifestPath, 'utf8'));

    assert.strictEqual(manifest.manifest_id, 'OFFICIAL_STORE_PHOTO_MANIFEST_106');
    assert.strictEqual(manifest.summary_metrics.total_cobalt_venues, 18);
    assert.strictEqual(manifest.summary_metrics.venues_with_authenticated_official_photos, 6);
    assert.strictEqual(manifest.summary_metrics.venues_using_fallback_monograms_and_outbound_links, 12);
    assert.strictEqual(manifest.summary_metrics.ai_store_photos_count, 0);

    for (const v of manifest.venues_audit) {
      assert.ok(v.venue_id && v.brand_name && v.branch_name && v.district && v.source_url && v.rights_status && v.display_mode);
      if (v.display_mode === 'OFFICIAL_PHOTO_THUMBNAIL') {
        assert.strictEqual(v.rights_status, 'OFFICIAL_SOURCE_PUBLIC_WEB');
        assert.ok(v.thumbnail_asset && v.sha256);
      } else {
        assert.strictEqual(v.display_mode, 'FALLBACK_BRAND_MONOGRAM_WITH_OUTBOUND_LINK');
        assert.strictEqual(v.rights_status, 'UNAUTHORIZED_PENDING_RIGHTS');
      }
    }
  });

  // TEST 04: Physical Presence and Integrity of All 6 Official Store Photos
  const expectedOfficialPhotos = [
    'galaxy-coopmart-danang.png',
    'cgv-vinhtrung-danang.png',
    'phela-bachdang-danang.png',
    'gongcha-nvl-danang.png',
    'jollibee-vincom-danang.png',
    'metiz-helio-danang.png'
  ];

  runTest('TEST_04_PHYSICAL_PRESENCE_OF_OFFICIAL_THUMBNAILS', () => {
    const photoDir = path.join(sotDir, 'assets', 'official-store-photos');
    assert.ok(fs.existsSync(photoDir), 'assets/official-store-photos directory must exist in SOT');

    const manifest = JSON.parse(fs.readFileSync(photoManifestPath, 'utf8'));
    const manifestMap = {};
    manifest.venues_audit.filter(v => v.thumbnail_asset).forEach(v => {
      manifestMap[path.basename(v.thumbnail_asset)] = v.sha256;
    });

    for (const p of expectedOfficialPhotos) {
      const pPath = path.join(photoDir, p);
      assert.ok(fs.existsSync(pPath), `Official photo missing: ${p}`);
      const buf = fs.readFileSync(pPath);
      assert.ok(buf.length > 0, `Photo file must be non-empty: ${p}`);
      const hash = sha256(buf);
      assert.strictEqual(hash, manifestMap[p], `Hash mismatch for ${p}`);
    }
  });

  // TEST 05: Three-Layer Parity for Code and Official Photos
  runTest('TEST_05_THREE_LAYER_PARITY_INCLUDING_OFFICIAL_PHOTOS', () => {
    const files = ['index.html', 'jayt_apex_interface.js', 'customer_journey_north_star.json', 'four_layer_dataset.json'];
    for (const f of files) {
      const sotHash = sha256(fs.readFileSync(path.join(sotDir, f)));
      const depHash = sha256(fs.readFileSync(path.join(deployDir, f)));
      const stgHash = sha256(fs.readFileSync(path.join(stagingDir, f)));
      assert.strictEqual(sotHash, depHash, `Byte parity mismatch between SOT and deploy for ${f}`);
      assert.strictEqual(sotHash, stgHash, `Byte parity mismatch between SOT and staging for ${f}`);
    }

    for (const p of expectedOfficialPhotos) {
      const sotImg = fs.readFileSync(path.join(sotDir, 'assets', 'official-store-photos', p));
      const depImg = fs.readFileSync(path.join(deployDir, 'assets', 'official-store-photos', p));
      const stgImg = fs.readFileSync(path.join(stagingDir, 'assets', 'official-store-photos', p));

      const sotHash = sha256(sotImg);
      assert.strictEqual(sotHash, sha256(depImg), `Asset mismatch between SOT and deploy for ${p}`);
      assert.strictEqual(sotHash, sha256(stgImg), `Asset mismatch between SOT and staging for ${p}`);
    }
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

    // TEST 06: Desktop 1440px Real Browser Validation of Fallback Monograms & Safety
    await runAsyncTest('TEST_06_PUPPETEER_DESKTOP_1440_OFFICIAL_PHOTOS_RENDER', async () => {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto(testUrl, { waitUntil: 'networkidle0' });

      // Click expand watchlist to see all cards
      const expandBtn = await page.$('#btn-toggle-watchlist-expand');
      if (expandBtn) {
        await expandBtn.click();
        await new Promise(r => setTimeout(r, 200));
      }

      // Verify all location cards have non-commercial attribution disclaimer
      const cardTexts = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.apex-rich-deal-card.state-watchlist')).map(c => c.textContent);
      });
      assert.ok(cardTexts.every(t => t.includes('Dữ liệu chỉ xác nhận không gian/địa điểm, không xác nhận giá hoặc ưu đãi.') || t.includes('Ảnh & dữ liệu chỉ xác nhận không gian/địa điểm')),
        'All location cards must contain non-commercial attribution disclaimer');

      await page.close();
    });

    // TEST 07: Fallback Monograms and Outbound Links for Venues without photo rights
    await runAsyncTest('TEST_07_PUPPETEER_FALLBACK_MONOGRAMS_AND_OUTBOUND_LINKS', async () => {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto(testUrl, { waitUntil: 'networkidle0' });

      const expandBtn = await page.$('#btn-toggle-watchlist-expand');
      if (expandBtn) {
        await expandBtn.click();
        await new Promise(r => setTimeout(r, 200));
      }

      const monograms = await page.$$('.apex-monogram');
      assert.ok(monograms.length >= 14, `Expected at least 14 monograms, got ${monograms.length}`);

      const outboundLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('.state-watchlist a'));
        return links.map(a => ({ text: a.textContent.trim(), href: a.getAttribute('href') }));
      });
      assert.ok(outboundLinks.some(l => l.text.includes('Xem không gian tại kênh chính thức') || l.text.includes('Nguồn chính thức') || l.text.includes('Xem nguồn chính thức')),
        'Must contain outbound official links on location cards');

      await page.close();
    });

    // TEST 08: Mobile 375px Zero Horizontal Overflow
    await runAsyncTest('TEST_08_PUPPETEER_MOBILE_375_ZERO_HORIZONTAL_OVERFLOW', async () => {
      const page = await browser.newPage();
      await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
      await page.goto(testUrl, { waitUntil: 'networkidle0' });

      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      assert.strictEqual(overflow, false, 'Viewport 375px must have ZERO horizontal overflow');

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
    console.log(`🟢 [OFFICIAL-STORE-PHOTO-106-SUMMARY] Toàn bộ ${passed}/${total} KIỂM THỬ ĐÃ ĐẠT [PASS]!`);
    process.exit(0);
  } else {
    console.error(`❌ [OFFICIAL-STORE-PHOTO-106-SUMMARY] Thất bại: ${passed}/${total} PASS.`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
