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
const resolutionManifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'store_photo_rights_and_truth_resolution_107.json');

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
  console.log('🧪 [JAYT-107-TEST] Khởi chạy bộ kiểm thử Store Photo Truth & Rights Resolution 107...\n');

  // TEST 01: Memory Consistency
  runTest('TEST_01_MEMORY_CONSISTENCY_PASSES_ALL_10_TESTS', () => {
    const { execSync } = require('child_process');
    const out = execSync('node 07_QUALITY_ASSURANCE/test_project_memory_consistency.js', { encoding: 'utf8', cwd: repoRoot });
    assert.ok(out.includes('TOÀN BỘ 10/10 KIỂM THỬ TÍNH NHẤT QUÁN PROJECT_MEMORY.MD ĐÃ ĐẠT [PASS]!'), 'Memory consistency must pass 10/10');
  });

  // TEST 02: Resolution Manifest 107 Structure & Metrics
  runTest('TEST_02_RESOLUTION_MANIFEST_107_VALIDITY', () => {
    assert.ok(fs.existsSync(resolutionManifestPath), 'store_photo_rights_and_truth_resolution_107.json must exist');
    const manifest = JSON.parse(fs.readFileSync(resolutionManifestPath, 'utf8'));

    assert.strictEqual(manifest.manifest_id, 'STORE_PHOTO_RIGHTS_AND_TRUTH_RESOLUTION_107');
    assert.strictEqual(manifest.summary_metrics.total_cobalt_venues, 18);
    assert.strictEqual(manifest.summary_metrics.venues_with_confirmed_display_rights, 0);
    assert.strictEqual(manifest.summary_metrics.venues_using_fallback_monograms_and_outbound_links, 18);
    assert.strictEqual(manifest.summary_metrics.ai_store_photos_count, 0);
    assert.strictEqual(manifest.summary_metrics.crop_screenshots_hosted, 0);

    for (const v of manifest.venues_audit) {
      assert.strictEqual(v.rights_status, 'UNAUTHORIZED_PENDING_RIGHTS', `Venue ${v.venue_id} must have UNAUTHORIZED_PENDING_RIGHTS until confirmed`);
      assert.strictEqual(v.display_mode, 'FALLBACK_BRAND_MONOGRAM_WITH_OUTBOUND_LINK', `Venue ${v.venue_id} must use fallback monogram`);
    }
  });

  // TEST 03: Four-Part Truth & Rights Validation Engine (Positive & Negative Cases)
  function validatePhotoHostingEligibility(record) {
    if (!record.media_original_url || !record.media_original_url.startsWith('http')) return { eligible: false, reason: 'MISSING_DIRECT_MEDIA_URL' };
    if (!record.file_sha256 || record.file_sha256.length !== 64) return { eligible: false, reason: 'MISSING_OR_INVALID_FILE_SHA256' };
    if (!record.facility_attribution_match || record.facility_attribution_match === 'HOME_BANNER_ONLY' || record.facility_attribution_match.includes('GENERIC')) {
      return { eligible: false, reason: 'INSUFFICIENT_OR_UNMATCHED_FACILITY_ATTRIBUTION' };
    }
    if (record.rights_status !== 'DISPLAY_PERMISSION_CONFIRMED') {
      return { eligible: false, reason: 'UNCONFIRMED_DISPLAY_PERMISSION' };
    }
    return { eligible: true };
  }

  runTest('TEST_03_FOUR_PART_TRUTH_TEST_ENGINE', () => {
    // Valid case
    const validRec = {
      media_original_url: 'https://phela.vn/wp-content/uploads/2023/12/phela-bachdang-facade.jpg',
      file_sha256: 'a'.repeat(64),
      facility_attribution_match: 'EXACT_DA_NANG_BACH_DANG_STOREFRONT',
      rights_status: 'DISPLAY_PERMISSION_CONFIRMED'
    };
    assert.strictEqual(validatePhotoHostingEligibility(validRec).eligible, true);

    // Negative: Missing direct media url (e.g. page URL instead)
    assert.strictEqual(validatePhotoHostingEligibility({ ...validRec, media_original_url: '' }).eligible, false);

    // Negative: Invalid sha256
    assert.strictEqual(validatePhotoHostingEligibility({ ...validRec, file_sha256: 'invalid' }).eligible, false);

    // Negative: Home banner only
    assert.strictEqual(validatePhotoHostingEligibility({ ...validRec, facility_attribution_match: 'HOME_BANNER_ONLY' }).eligible, false);

    // Negative: Official source web but no confirmed permission
    assert.strictEqual(validatePhotoHostingEligibility({ ...validRec, rights_status: 'OFFICIAL_SOURCE_PUBLIC_WEB' }).eligible, false);
  });

  // TEST 04: Three-Layer Parity
  runTest('TEST_04_THREE_LAYER_PARITY_FOR_ALL_CORE_FILES', () => {
    const files = ['index.html', 'jayt_apex_interface.js', 'customer_journey_north_star.json', 'four_layer_dataset.json'];
    for (const f of files) {
      const sotHash = sha256(fs.readFileSync(path.join(sotDir, f)));
      const depHash = sha256(fs.readFileSync(path.join(deployDir, f)));
      const stgHash = sha256(fs.readFileSync(path.join(stagingDir, f)));
      assert.strictEqual(sotHash, depHash, `Byte parity mismatch between SOT and deploy for ${f}`);
      assert.strictEqual(sotHash, stgHash, `Byte parity mismatch between SOT and staging for ${f}`);
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

    // TEST 05: Desktop 1440px Real Browser Validation - ZERO Photos on Location Cards
    await runAsyncTest('TEST_05_PUPPETEER_ZERO_UNCONFIRMED_PHOTOS_ON_CARDS', async () => {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto(testUrl, { waitUntil: 'networkidle0' });

      // Expand watchlist
      const expandBtn = await page.$('#btn-toggle-watchlist-expand');
      if (expandBtn) {
        await expandBtn.click();
        await new Promise(r => setTimeout(r, 200));
      }

      // Assert ZERO <img> inside .apex-rich-deal-card.state-watchlist
      const cardImages = await page.$$('.apex-rich-deal-card.state-watchlist img');
      assert.strictEqual(cardImages.length, 0, `Expected 0 images rendered in location cards, found ${cardImages.length}`);

      // Assert 100% of 18 location cards have brand monograms
      const monograms = await page.$$('.apex-rich-deal-card.state-watchlist .apex-monogram');
      assert.strictEqual(monograms.length, 18, `Expected all 18 cards to have .apex-monogram, found ${monograms.length}`);

      await page.close();
    });

    // TEST 06: All 18 Cards Have "Xem không gian tại kênh chính thức ↗"
    await runAsyncTest('TEST_06_PUPPETEER_ALL_18_CARDS_HAVE_OUTBOUND_OFFICIAL_LINKS', async () => {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto(testUrl, { waitUntil: 'networkidle0' });

      const expandBtn = await page.$('#btn-toggle-watchlist-expand');
      if (expandBtn) {
        await expandBtn.click();
        await new Promise(r => setTimeout(r, 200));
      }

      const cardLinks = await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('.apex-rich-deal-card.state-watchlist'));
        return cards.map(c => {
          const a = c.querySelector('a');
          return {
            text: a ? a.textContent.trim() : '',
            href: a ? a.getAttribute('href') : ''
          };
        });
      });

      assert.strictEqual(cardLinks.length, 18, 'Must render 18 verified location cards');
      assert.ok(cardLinks.every(l => (l.text.includes('Xem không gian tại kênh chính thức') || l.text.includes('Xem nguồn chính thức')) && l.href.startsWith('http')),
        'All 18 location cards must have valid outbound official links');

      await page.close();
    });

    // TEST 07: Tablet 768px Viewport Check
    await runAsyncTest('TEST_07_PUPPETEER_TABLET_768_RESPONSIVE_CHECK', async () => {
      const page = await browser.newPage();
      await page.setViewport({ width: 768, height: 1024, isMobile: false });
      await page.goto(testUrl, { waitUntil: 'networkidle0' });

      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      assert.strictEqual(overflow, false, 'Viewport 768px must have ZERO horizontal overflow');

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
    console.log(`🟢 [STORE-PHOTO-TRUTH-107-SUMMARY] Toàn bộ ${passed}/${total} KIỂM THỬ ĐÃ ĐẠT [PASS]!`);
    process.exit(0);
  } else {
    console.error(`❌ [STORE-PHOTO-TRUTH-107-SUMMARY] Thất bại: ${passed}/${total} PASS.`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
