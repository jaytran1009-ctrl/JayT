/**
 * JAYT COMMUNITY DISCOVERY SUPPLY & CANONICALIZATION TEST SUITE (108R)
 * Directive: JAYT-108R-SUPPLY-TRUTH-AND-CANONICALIZATION
 */

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
const manifest108Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'community_discovery_signals_manifest_108.json');
const fourLayerPath = path.join(sotDir, 'four_layer_dataset.json');

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
  console.log('🧪 [JAYT-108R-TEST] Khởi chạy bộ kiểm thử Supply Truth & Canonicalization 108R...\n');

  // TEST 01: Memory Consistency
  runTest('TEST_01_MEMORY_CONSISTENCY_PASSES_ALL_10_TESTS', () => {
    const { execSync } = require('child_process');
    const out = execSync('node 07_QUALITY_ASSURANCE/test_project_memory_consistency.js', { encoding: 'utf8', cwd: repoRoot });
    assert.ok(out.includes('TOÀN BỘ 10/10 KIỂM THỬ TÍNH NHẤT QUÁN PROJECT_MEMORY.MD ĐÃ ĐẠT [PASS]!'), 'Memory consistency must pass 10/10');
  });

  // TEST 02: Single Canonical Cobalt Dataset Parity (18/18 matching four_layer_dataset.json & manifest 108R)
  runTest('TEST_02_CANONICAL_COBALT_DATASET_EXACT_ADDRESS_MATCH', () => {
    assert.ok(fs.existsSync(manifest108Path), 'community_discovery_signals_manifest_108.json must exist');
    assert.ok(fs.existsSync(fourLayerPath), 'four_layer_dataset.json must exist');

    const manifest = JSON.parse(fs.readFileSync(manifest108Path, 'utf8'));
    const fourLayer = JSON.parse(fs.readFileSync(fourLayerPath, 'utf8'));

    const fourLayerLocs = fourLayer.layer_2_watchlist.verified_locations;
    const manifestLocs = manifest.standardized_cobalt_venues;

    assert.ok(fourLayerLocs.length >= 18, `four_layer_dataset must have at least 18 verified locations, found ${fourLayerLocs.length}`);
    assert.strictEqual(manifestLocs.length, 18, 'manifest 108R must have 18 verified locations');

    for (let i = 0; i < 18; i++) {
      const mf = manifestLocs[i];
      const fl = fourLayerLocs.find(l => l.id === mf.id);
      assert.ok(fl, `Location ${mf.id} must exist in four_layer_dataset`);
      assert.strictEqual(mf.street_address, fl.street_address, `Address mismatch for ${mf.id}: '${mf.street_address}' vs '${fl.street_address}'`);
      assert.strictEqual(mf.venue_name, fl.venue_name, `Venue name mismatch for ${mf.id}`);
      assert.strictEqual(mf.district, fl.district, `District mismatch for ${mf.id}`);

      // Verify physical on-disk evidence exists and hash matches
      assert.ok(fl.evidence_pointer, `Location ${fl.id} must have evidence pointer`);
      const artifactFull = path.join(repoRoot, fl.evidence_pointer.artifact_path);
      assert.ok(fs.existsSync(artifactFull), `Evidence file must exist on disk: ${fl.evidence_pointer.artifact_path}`);
      const actualSha = sha256(fs.readFileSync(artifactFull));
      assert.strictEqual(actualSha, fl.evidence_pointer.artifact_sha256, `SHA-256 mismatch for evidence of ${fl.id}`);
    }
  });

  // TEST 03: Discovery Signals Provenance & Containment Check
  runTest('TEST_03_DISCOVERY_SIGNALS_PROVENANCE_AND_CONTAINMENT', () => {
    const manifest = JSON.parse(fs.readFileSync(manifest108Path, 'utf8'));
    const signals = manifest.public_discovery_signals;
    assert.strictEqual(signals.length, 32, 'Must have exactly 32 discovery items');

    let capturedCount = 0;
    let uncapturedCount = 0;

    signals.forEach(sig => {
      assert.strictEqual(sig.verified_deal, false, `Signal ${sig.signal_id} must have verified_deal: false`);
      if (sig.signal_status === 'SIGNAL_ONLY') {
        capturedCount++;
        assert.ok(sig.evidence_pointer, `SIGNAL_ONLY item ${sig.signal_id} must have evidence_pointer`);
        const fullArtPath = path.join(repoRoot, sig.evidence_pointer.artifact_path);
        assert.ok(fs.existsSync(fullArtPath), `Evidence file must exist for ${sig.signal_id}`);
        const actualHash = sha256(fs.readFileSync(fullArtPath));
        assert.strictEqual(actualHash, sig.evidence_pointer.artifact_sha256, `Hash mismatch for ${sig.signal_id}`);
      } else if (sig.signal_status === 'UNCAPTURED_DISCOVERY_SEED') {
        uncapturedCount++;
        assert.strictEqual(sig.evidence_pointer, null, `UNCAPTURED_DISCOVERY_SEED ${sig.signal_id} must have null evidence_pointer`);
      } else {
        assert.fail(`Invalid status for ${sig.signal_id}: ${sig.signal_status}`);
      }
    });

    assert.ok(capturedCount >= 20, `Expected >= 20 captured signals, got ${capturedCount}`);
    assert.ok(uncapturedCount >= 4, `Expected >= 4 uncaptured seeds, got ${uncapturedCount}`);
  });

  // TEST 04: Zero Fake Prices, Vouchers, or Claimed Discounts in Discovery Seed Titles
  runTest('TEST_04_ZERO_FAKE_PROMOTION_CLAIMS_IN_SEED_TITLES', () => {
    const manifest = JSON.parse(fs.readFileSync(manifest108Path, 'utf8'));
    const forbiddenPatterns = [
      /\b\d+k\b/i,
      /\b\d+%\b/,
      /\bđồng giá\b/i,
      /\bvoucher \d+/i,
      /\bhappy lunch\b/i,
      /\bhội viên tiết kiệm \d+/i,
      /\bgiảm \d+/i
    ];

    manifest.public_discovery_signals.forEach(sig => {
      for (const pattern of forbiddenPatterns) {
        assert.ok(!pattern.test(sig.signal_title), `Signal title for ${sig.signal_id} contains forbidden claim matching ${pattern}: '${sig.signal_title}'`);
      }
    });
  });

  // TEST 05: Three-Layer Parity
  runTest('TEST_05_THREE_LAYER_PARITY_FOR_ALL_CORE_FILES', () => {
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

    // TEST 06: Desktop 1440px Real Browser Validation - 4 CTAs and Exact Address Matching on UI
    await runAsyncTest('TEST_06_PUPPETEER_ALL_18_CARDS_MATCH_EXACT_CANONICAL_ADDRESSES', async () => {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto(testUrl, { waitUntil: 'networkidle0' });

      // Expand watchlist to see all 18 cards
      const expandBtn = await page.$('#btn-toggle-watchlist-expand');
      if (expandBtn) {
        await expandBtn.click();
        await new Promise(r => setTimeout(r, 200));
      }

      const fourLayer = JSON.parse(fs.readFileSync(fourLayerPath, 'utf8'));
      const expectedLocs = fourLayer.layer_2_watchlist.verified_locations;

      const renderedCards = await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('.apex-rich-deal-card.state-watchlist'));
        return cards.map(c => ({
          title: c.querySelector('div[style*="font-weight:800"]') ? c.querySelector('div[style*="font-weight:800"]').textContent.trim() : '',
          text: c.innerText
        }));
      });

      assert.ok(renderedCards.length >= 18, `Must render at least 18 location cards, rendered: ${renderedCards.length}`);

      for (let i = 0; i < 18; i++) {
        const exp = expectedLocs[i];
        const match = renderedCards.find(rc => rc.text.includes(exp.venue_name));
        assert.ok(match, `UI must render venue: ${exp.venue_name}`);
        assert.ok(match.text.includes(exp.street_address), `UI card for ${exp.venue_name} must contain exact canonical address '${exp.street_address}'`);
      }

      await page.close();
    });

    // TEST 07: Touch targets >= 44px for all primary interactive action buttons & CTAs
    await runAsyncTest('TEST_07_PUPPETEER_TOUCH_TARGETS_GE_44PX', async () => {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto(testUrl, { waitUntil: 'networkidle0' });

      const expandBtn = await page.$('#btn-toggle-watchlist-expand');
      if (expandBtn) {
        await expandBtn.click();
        await new Promise(r => setTimeout(r, 200));
      }

      const violations = await page.evaluate(() => {
        const interactive = Array.from(document.querySelectorAll('button, select, input, a.apex-btn, .apex-m-tab-btn, .apex-premium-btn, .apex-rich-deal-card a, .btn-category-card'));
        return interactive
          .filter(el => {
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return false;
            return rect.height < 43.5;
          })
          .map(el => ({ tag: el.tagName, id: el.id, class: el.className, height: el.getBoundingClientRect().height, width: el.getBoundingClientRect().width }));
      });

      assert.strictEqual(violations.length, 0, `Touch target violations: ${JSON.stringify(violations)}`);
      await page.close();
    });

    // TEST 08: Tablet 768px Responsive Check
    await runAsyncTest('TEST_08_PUPPETEER_TABLET_768_ZERO_OVERFLOW', async () => {
      const page = await browser.newPage();
      await page.setViewport({ width: 768, height: 1024, isMobile: false });
      await page.goto(testUrl, { waitUntil: 'networkidle0' });

      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      assert.strictEqual(overflow, false, 'Viewport 768px must have ZERO horizontal overflow');

      await page.close();
    });

    // TEST 09: Mobile 375px Zero Horizontal Overflow
    await runAsyncTest('TEST_09_PUPPETEER_MOBILE_375_ZERO_HORIZONTAL_OVERFLOW', async () => {
      const page = await browser.newPage();
      await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
      await page.goto(testUrl, { waitUntil: 'networkidle0' });

      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      assert.strictEqual(overflow, false, 'Viewport 375px must have ZERO horizontal overflow');

      await page.close();
    });

    // TEST 10: Airgap Network Check
    await runAsyncTest('TEST_10_PUPPETEER_AIRGAP_ZERO_EXTERNAL_REQUESTS', async () => {
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

  // TEST 11: Production Lock Invariants
  runTest('TEST_11_PRODUCTION_LOCK_INVARIANTS', () => {
    const feed = JSON.parse(fs.readFileSync(prodFeedPath, 'utf8'));
    assert.strictEqual(feed.length, 0, 'Production deals_feed.json must remain []');

    const manifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
    assert.strictEqual(manifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved must remain false');
  });

  console.log('\n======================================================');
  if (passed === total) {
    console.log(`🟢 [SUPPLY-TRUTH-108R-SUMMARY] Toàn bộ ${passed}/${total} KIỂM THỬ ĐÃ ĐẠT [PASS]!`);
    process.exit(0);
  } else {
    console.error(`❌ [SUPPLY-TRUTH-108R-SUMMARY] Thất bại: ${passed}/${total} PASS.`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
