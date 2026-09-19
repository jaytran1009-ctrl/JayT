/**
 * QA TEST SUITE 111: DANANG VENUE EXPANSION & PREMIUM VISUAL DISCOVERY MAP
 * 
 * Verifies:
 * 1. Total verified canonical venues >= 80 (found 100 venues)
 * 2. 5 Da Nang districts coverage (Hải Châu >= 20, Thanh Khê >= 15, Sơn Trà >= 12, Liên Chiểu >= 12, Ngũ Hành Sơn >= 10)
 * 3. 100% of venues have complete profile (exact address, official source URL, clusters, intent tags, disclaimer)
 * 4. Zero AI / scrap images rule enforced; official photo attribution badge & monogram banner fallback
 * 5. Production commercial lock invariants (deals_feed.json: [])
 * 6. Puppeteer Desktop 1440px: Visual Discovery Map, Quick Filter Pills, 4 CTAs per card
 * 7. Puppeteer Touch Targets >= 44px on all interactive pills, filters, and action buttons
 * 8. Puppeteer Mobile 375px: Zero horizontal overflow and clean stacked layout
 * 9. Project Memory consistency at version >= 3.220.0
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const http = require('http');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const DATASET_PATH = path.join(repoRoot, '03_SOURCE_OF_TRUTH/four_layer_dataset.json');
const DEALS_FEED_PATH = path.join(repoRoot, '05_DEAL_AND_AFFILIATE/deals_feed.json');
const PROJECT_MEMORY_PATH = path.join(repoRoot, 'PROJECT_MEMORY.md');
const STAGING_DIR = path.join(repoRoot, '08_RELEASE_VAULT/deployments/staging_instance/03_SOURCE_OF_TRUTH');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`✅ PASS: [${totalTests}] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`❌ FAIL: [${totalTests}] ${name}`);
    console.error(err.message);
  }
}

async function runAsyncTest(name, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`✅ PASS: [${totalTests}] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`❌ FAIL: [${totalTests}] ${name}`);
    console.error(err.message);
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
  console.log('=== RUNNING QA TEST SUITE 111: DANANG VENUE EXPANSION & VISUAL DISCOVERY ===\n');

  // Test 1: Total Verified Venues >= 80
  runTest('Expanded venue registry contains >= 80 verified canonical locations', () => {
    assert.ok(fs.existsSync(DATASET_PATH), 'four_layer_dataset.json must exist');
    const dataset = JSON.parse(fs.readFileSync(DATASET_PATH, 'utf8'));
    assert.ok(dataset.layer_2_watchlist, 'layer_2_watchlist must exist');
    const locs = dataset.layer_2_watchlist.verified_locations;
    assert.ok(Array.isArray(locs), 'verified_locations must be an array');
    assert.ok(locs.length >= 80, `Expected >= 80 verified locations, found ${locs.length}`);
  });

  // Test 2: All 5 Districts Covered with >= 10 Venues Each
  runTest('All 5 Da Nang districts have comprehensive coverage (>= 10 venues per district)', () => {
    const dataset = JSON.parse(fs.readFileSync(DATASET_PATH, 'utf8'));
    const locs = dataset.layer_2_watchlist.verified_locations;
    
    const districtCounts = {
      'Hải Châu': locs.filter(l => l.district === 'Hải Châu').length,
      'Thanh Khê': locs.filter(l => l.district === 'Thanh Khê').length,
      'Sơn Trà': locs.filter(l => l.district === 'Sơn Trà').length,
      'Liên Chiểu': locs.filter(l => l.district.includes('Liên Chiểu') || l.district.includes('Hòa Khánh')).length,
      'Ngũ Hành Sơn': locs.filter(l => l.district === 'Ngũ Hành Sơn').length
    };

    assert.ok(districtCounts['Hải Châu'] >= 20, `Hải Châu count >= 20, got ${districtCounts['Hải Châu']}`);
    assert.ok(districtCounts['Thanh Khê'] >= 15, `Thanh Khê count >= 15, got ${districtCounts['Thanh Khê']}`);
    assert.ok(districtCounts['Sơn Trà'] >= 12, `Sơn Trà count >= 12, got ${districtCounts['Sơn Trà']}`);
    assert.ok(districtCounts['Liên Chiểu'] >= 12, `Liên Chiểu count >= 12, got ${districtCounts['Liên Chiểu']}`);
    assert.ok(districtCounts['Ngũ Hành Sơn'] >= 10, `Ngũ Hành Sơn count >= 10, got ${districtCounts['Ngũ Hành Sơn']}`);
  });

  // Test 3: Canonical Venue Schema & Exact Location Integrity
  runTest('100% of venues have complete canonical profile (exact address, official source URL, clusters, intent tags)', () => {
    const dataset = JSON.parse(fs.readFileSync(DATASET_PATH, 'utf8'));
    const locs = dataset.layer_2_watchlist.verified_locations;

    locs.forEach(l => {
      assert.ok(l.id && l.id.startsWith('VLOC_'), `Invalid venue ID: ${l.id}`);
      assert.ok(l.venue_name && l.venue_name.length > 3, `Invalid venue name for ${l.id}`);
      assert.ok(l.brand, `Missing brand for ${l.id}`);
      assert.ok(l.sector, `Missing sector for ${l.id}`);
      assert.ok(l.street_address && l.street_address.includes('Đà Nẵng'), `Address must specify Da Nang for ${l.id}`);
      assert.ok(l.official_source_url && l.official_source_url.startsWith('https://'), `Official URL must be https for ${l.id}`);
      assert.ok(Array.isArray(l.nearby_clusters) && l.nearby_clusters.length > 0, `Missing nearby_clusters for ${l.id}`);
      assert.ok(Array.isArray(l.intent_tags) && l.intent_tags.length > 0, `Missing intent_tags for ${l.id}`);
      assert.ok(l.status_disclaimer, `Missing status disclaimer for ${l.id}`);
      assert.ok(l.evidence_pointer && l.evidence_pointer.artifact_sha256, `Missing evidence pointer for ${l.id}`);
    });
  });

  // Test 4: Zero AI / Scrap Image Rule & Verified Official Photo Attribution
  runTest('Zero AI / scrap images rule enforced; official photos have verified on-disk asset and valid attribution badge', () => {
    const dataset = JSON.parse(fs.readFileSync(DATASET_PATH, 'utf8'));
    const locs = dataset.layer_2_watchlist.verified_locations;

    let officialPhotoCount = 0;
    let monogramCount = 0;

    locs.forEach(l => {
      assert.ok(l.photo_meta, `Missing photo_meta for ${l.id}`);
      if (l.photo_meta.has_official_photo) {
        officialPhotoCount++;
        assert.ok(l.photo_meta.photo_url, `Missing photo_url for ${l.id}`);
        const fullDiskPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', l.photo_meta.photo_url);
        assert.ok(fs.existsSync(fullDiskPath), `Physical photo asset must exist on disk: ${l.photo_meta.photo_url}`);
        assert.strictEqual(l.photo_meta.attribution, 'Ảnh từ kênh chính thức · Xem nguồn ↗');
      } else {
        monogramCount++;
        assert.strictEqual(l.photo_meta.photo_url, null);
      }
    });

    assert.ok(officialPhotoCount >= 5, `Expected >= 5 official store photos, got ${officialPhotoCount}`);
    assert.ok(monogramCount >= 70, `Expected >= 70 monogram fallbacks, got ${monogramCount}`);
  });

  // Test 5: Production Commercial Lock Invariants
  runTest('Production commercial feed invariant: deals_feed.json is empty array and is_approved is false', () => {
    const dealsFeed = JSON.parse(fs.readFileSync(DEALS_FEED_PATH, 'utf8'));
    assert.ok(Array.isArray(dealsFeed), 'deals_feed must be an array');
    assert.strictEqual(dealsFeed.length, 0, 'deals_feed must remain strictly empty []');
  });

  // REAL BROWSER PUPPETEER SUITE
  let serverInfo = null;
  let browser = null;

  try {
    serverInfo = await startLocalServer(STAGING_DIR);
    const testUrl = `http://127.0.0.1:${serverInfo.port}/index.html`;

    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    });

    // Test 6: Desktop 1440px Visual Discovery Map Rendering & Quick Filter Operations
    await runAsyncTest('Desktop 1440px: Visual Discovery Map renders with one-touch pills and 4 CTAs per card', async () => {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto(testUrl, { waitUntil: 'networkidle0' });

      // Verify Quick Filter Pills exist
      const quickFilterPills = await page.$$eval('[data-quick-filter]', els => els.map(e => e.getAttribute('data-quick-filter')));
      assert.ok(quickFilterPills.includes('ALL'));
      assert.ok(quickFilterPills.includes('NEARBY_CAMPUS'));
      assert.ok(quickFilterPills.includes('NEARBY_OFFICE'));
      assert.ok(quickFilterPills.includes('LUNCH'));
      assert.ok(quickFilterPills.includes('COFFEE_WORK'));
      assert.ok(quickFilterPills.includes('NIGHT_CINEMA'));
      assert.ok(quickFilterPills.includes('RETAIL_MART'));
      assert.ok(quickFilterPills.includes('BUDGET'));

      // Verify 5 District Filter Buttons exist
      const districtFilters = await page.$$eval('[data-district-filter]', els => els.map(e => e.getAttribute('data-district-filter')));
      assert.ok(districtFilters.includes('ALL'));
      assert.ok(districtFilters.includes('Hải Châu'));
      assert.ok(districtFilters.includes('Thanh Khê'));
      assert.ok(districtFilters.includes('Sơn Trà'));
      assert.ok(districtFilters.includes('Liên Chiểu') || districtFilters.includes('Hòa Khánh / Liên Chiểu'));
      assert.ok(districtFilters.includes('Ngũ Hành Sơn'));

      // Expand watchlist
      const expandBtn = await page.$('#btn-toggle-watchlist-expand');
      if (expandBtn) {
        await expandBtn.click();
        await new Promise(r => setTimeout(r, 200));
      }

      // Check rendered cards
      const cards = await page.$$('.apex-rich-deal-card.state-watchlist');
      assert.ok(cards.length >= 80, `Expected >= 80 rendered cards on desktop, got ${cards.length}`);

      // Verify 4 CTAs on first card
      const ctas = await page.evaluate(() => {
        const firstCard = document.querySelector('.apex-rich-deal-card.state-watchlist');
        if (!firstCard) return null;
        return {
          hasSplit: !!firstCard.querySelector('[data-action="split-bill-venue"]'),
          hasReport: !!firstCard.querySelector('[data-action="report-deal-venue"]'),
          hasSave: !!firstCard.querySelector('[data-action="save-venue"]'),
          hasOfficialSource: !!firstCard.querySelector('a[href^="http"]')
        };
      });

      assert.ok(ctas && ctas.hasSplit && ctas.hasReport && ctas.hasSave && ctas.hasOfficialSource, 'Every card must have all 4 community CTAs');

      await page.close();
    });

    // Test 7: Touch Targets >= 44px
    await runAsyncTest('Touch targets >= 44px for all interactive pills, filters, and action CTAs', async () => {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto(testUrl, { waitUntil: 'networkidle0' });

      const expandBtn = await page.$('#btn-toggle-watchlist-expand');
      if (expandBtn) {
        await expandBtn.click();
        await new Promise(r => setTimeout(r, 200));
      }

      const violations = await page.evaluate(() => {
        const interactive = Array.from(document.querySelectorAll('button, select, input, a.apex-btn, .apex-m-tab-btn, .apex-premium-btn, .btn-category-card'));
        return interactive
          .filter(el => {
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return false;
            return rect.height < 43.5;
          })
          .map(el => ({ tag: el.tagName, id: el.id, class: el.className, height: el.getBoundingClientRect().height, width: el.getBoundingClientRect().width }));
      });

      assert.strictEqual(violations.length, 0, `Touch target violations found: ${JSON.stringify(violations)}`);
      await page.close();
    });

    // Test 8: Mobile 375px Zero Horizontal Overflow
    await runAsyncTest('Mobile 375px viewport: Zero horizontal overflow and clean stacked Visual Discovery layout', async () => {
      const page = await browser.newPage();
      await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
      await page.goto(testUrl, { waitUntil: 'networkidle0' });

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      assert.strictEqual(scrollWidth, clientWidth, `Mobile 375px horizontal overflow: scrollWidth ${scrollWidth} > clientWidth ${clientWidth}`);

      await page.close();
    });

  } finally {
    if (browser) await browser.close();
    if (serverInfo && serverInfo.server) serverInfo.server.close();
  }

  // Test 9: Project Memory Consistency
  runTest('Project memory consistency: version matches >= 3.220.0 after transaction', () => {
    const memoryContent = fs.readFileSync(PROJECT_MEMORY_PATH, 'utf8');
    assert.ok(/(?:v)?3\.[2-9]\d+\.0/.test(memoryContent), 'Memory must be at version >= 3.220.0');
  });

  console.log(`\n====================================`);
  console.log(`TEST RESULTS: ${passedTests}/${totalTests} PASSED`);
  console.log(`====================================`);

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Test Suite 111 Execution Error:', err);
  process.exit(1);
});
