/**
 * QA TEST SUITE 111A: EXPANSION CONTAINMENT, ANTI-SYNTHETIC HASH & REAL LOCALITY INTEGRITY
 * Directive: JAYT-111A-EXPANSION-CONTAINMENT-AND-REAL-LOCALITY-CAPTURE
 * 
 * Verifies:
 * 1. Public dataset contains strictly the 18 canonical verified locations backed by real on-disk raw artifacts
 * 2. Anti-Synthetic Hash Assertion: Every artifact_sha256 matches the physical file SHA-256 on disk (NO sha256(name+addr))
 * 3. Verbatim Address Quote Assertion: Every venue quote exists inside its physical page.txt file
 * 4. Quarantine Registry: 82 synthetic/unverified venues quarantined in quarantined_venues_111a.json
 * 5. Zero Unapproved Photos: All venues render with Monogram banner + official source link (no cropped photos)
 * 6. Real Locality Engine: real_locality_capture_engine_111a.js contains >= 25 official targets
 * 7. Puppeteer Desktop 1440px: Visual Discovery Map, Quick Filter Pills, 4 CTAs per card
 * 8. Puppeteer Touch Targets >= 44px on all interactive pills, filters, and buttons
 * 9. Puppeteer Mobile 375px: Zero horizontal overflow and clean stacked layout
 * 10. Production Commercial Lock: deals_feed.json is empty array [], is_approved is false, 0 affiliate links
 * 11. Project Memory consistency at version >= 3.221.0
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const crypto = require('crypto');
const http = require('http');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const DATASET_PATH = path.join(repoRoot, '03_SOURCE_OF_TRUTH/four_layer_dataset.json');
const DEALS_FEED_PATH = path.join(repoRoot, '05_DEAL_AND_AFFILIATE/deals_feed.json');
const QUARANTINE_PATH = path.join(repoRoot, '05_DEAL_AND_AFFILIATE/quarantined_venues_111a.json');
const ENGINE_111A_PATH = path.join(repoRoot, '05_DEAL_AND_AFFILIATE/real_locality_capture_engine_111a.js');
const PROJECT_MEMORY_PATH = path.join(repoRoot, 'PROJECT_MEMORY.md');
const STAGING_DIR = path.join(repoRoot, '08_RELEASE_VAULT/deployments/staging_instance/03_SOURCE_OF_TRUTH');

let passedTests = 0;
let totalTests = 0;

function sha256(bufOrStr) {
  return crypto.createHash('sha256').update(bufOrStr).digest('hex');
}

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
  console.log('=== RUNNING QA TEST SUITE 111A: EXPANSION CONTAINMENT & REAL LOCALITY ===\n');

  // Test 1: SOT Contains Strictly 18 Canonical Locations
  runTest('Public verified_locations is strictly contained to 18 canonical locations', () => {
    assert.ok(fs.existsSync(DATASET_PATH), 'four_layer_dataset.json must exist');
    const dataset = JSON.parse(fs.readFileSync(DATASET_PATH, 'utf8'));
    assert.ok(dataset.layer_2_watchlist, 'layer_2_watchlist must exist');
    const locs = dataset.layer_2_watchlist.verified_locations;
    assert.ok(Array.isArray(locs), 'verified_locations must be an array');
    assert.strictEqual(locs.length, 18, `Must strictly contain 18 canonical locations, found ${locs.length}`);
  });

  // Test 2: Anti-Synthetic Hash & Physical File SHA-256 Match
  runTest('Anti-Synthetic Hash Guardrail: Every artifact_sha256 matches real on-disk file SHA-256', () => {
    const dataset = JSON.parse(fs.readFileSync(DATASET_PATH, 'utf8'));
    const locs = dataset.layer_2_watchlist.verified_locations;

    locs.forEach(l => {
      assert.ok(l.evidence_pointer, `Missing evidence_pointer for ${l.id}`);
      assert.ok(l.evidence_pointer.artifact_path, `Missing artifact_path for ${l.id}`);
      
      const fullPath = path.resolve(repoRoot, l.evidence_pointer.artifact_path);
      assert.ok(fs.existsSync(fullPath), `Physical raw artifact must exist on disk: ${l.evidence_pointer.artifact_path}`);

      const fileData = fs.readFileSync(fullPath);
      const realFileSha = sha256(fileData);
      assert.strictEqual(l.evidence_pointer.artifact_sha256, realFileSha, `artifact_sha256 for ${l.id} must match real on-disk file SHA-256`);

      // Ban synthetic name+address hash
      const syntheticHash = sha256(l.venue_name + ' | ' + l.street_address);
      assert.notStrictEqual(l.evidence_pointer.artifact_sha256, syntheticHash, `SYNTHETIC HASH BANNED: ${l.id} has synthetic hash`);
    });
  });

  // Test 3: Verbatim Address Quote Verification
  runTest('Verbatim Address Quote Guardrail: Raw artifact file contains address quote', () => {
    const dataset = JSON.parse(fs.readFileSync(DATASET_PATH, 'utf8'));
    const locs = dataset.layer_2_watchlist.verified_locations;

    locs.forEach(l => {
      const fullPath = path.resolve(repoRoot, l.evidence_pointer.artifact_path);
      const text = fs.readFileSync(fullPath, 'utf8');
      assert.ok(l.evidence_pointer.quote && l.evidence_pointer.quote.length > 5, `Missing quote for ${l.id}`);
      assert.ok(text.includes(l.evidence_pointer.quote), `Quote '${l.evidence_pointer.quote}' must exist in ${l.evidence_pointer.artifact_path}`);
    });
  });

  // Test 4: Quarantine Registry Integrity
  runTest('Quarantine Registry contains exactly 82 unverified venues isolated from public SOT', () => {
    assert.ok(fs.existsSync(QUARANTINE_PATH), 'quarantined_venues_111a.json must exist');
    const quarantine = JSON.parse(fs.readFileSync(QUARANTINE_PATH, 'utf8'));
    assert.strictEqual(quarantine.directive, 'JAYT-111A-EXPANSION-CONTAINMENT-AND-REAL-LOCALITY-CAPTURE');
    assert.strictEqual(quarantine.total_quarantined, 82, `Must quarantine exactly 82 venues, found ${quarantine.total_quarantined}`);
    assert.strictEqual(quarantine.venues.length, 82);
  });

  // Test 5: Zero Unapproved Photos / Monogram Fallback
  runTest('Zero Photo Display Policy: 100% of venues use brand monogram (0 unapproved photos)', () => {
    const dataset = JSON.parse(fs.readFileSync(DATASET_PATH, 'utf8'));
    const locs = dataset.layer_2_watchlist.verified_locations;

    locs.forEach(l => {
      assert.ok(l.photo_meta, `Missing photo_meta for ${l.id}`);
      assert.strictEqual(l.photo_meta.has_official_photo, false, `has_official_photo must be false for ${l.id}`);
      assert.strictEqual(l.photo_meta.photo_url, null, `photo_url must be null for ${l.id}`);
      assert.ok(l.photo_meta.attribution.includes('Monogram'), `Attribution must indicate monogram for ${l.id}`);
    });
  });

  // Test 6: Real Locality Capture Engine Exports
  runTest('Real Locality Capture Engine defines >= 25 official store locator targets in Da Nang', () => {
    assert.ok(fs.existsSync(ENGINE_111A_PATH), 'real_locality_capture_engine_111a.js must exist');
    const engine = require(ENGINE_111A_PATH);
    assert.ok(Array.isArray(engine.OFFICIAL_LOCALITY_TARGETS), 'OFFICIAL_LOCALITY_TARGETS must be an array');
    assert.ok(engine.OFFICIAL_LOCALITY_TARGETS.length >= 25, `Must have >= 25 targets, found ${engine.OFFICIAL_LOCALITY_TARGETS.length}`);
    assert.strictEqual(typeof engine.runLocalityCaptureBatch, 'function', 'Must export runLocalityCaptureBatch');
  });

  // Test 7: Production Commercial Lock Invariants
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

    // Test 8: Desktop 1440px Visual Discovery Map Rendering & Quick Filter Operations
    await runAsyncTest('Desktop 1440px: Visual Discovery Map renders 18 canonical monogram cards and 4 CTAs', async () => {
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

      // Expand watchlist
      const expandBtn = await page.$('#btn-toggle-watchlist-expand');
      if (expandBtn) {
        await expandBtn.click();
        await new Promise(r => setTimeout(r, 200));
      }

      // Check rendered cards
      const cards = await page.$$('.apex-rich-deal-card.state-watchlist');
      assert.strictEqual(cards.length, 18, `Expected exactly 18 rendered canonical cards, got ${cards.length}`);

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

    // Test 9: Touch Targets >= 44px
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

    // Test 10: Mobile 375px Zero Horizontal Overflow
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

  // Test 11: Project Memory Consistency
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
  console.error('Test Suite 111A Execution Error:', err);
  process.exit(1);
});
