const fs = require('fs');
const path = require('path');
const http = require('http');
const assert = require('assert');
const crypto = require('crypto');
const { execSync, spawnSync } = require('child_process');
const puppeteer = require('puppeteer');

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const repoRoot = path.resolve(__dirname, '..');
const sotDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');
const deployDir = path.join(repoRoot, 'deploy', 'public');
const stagingDir = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH');
const htmlPath = path.join(sotDir, 'index.html');
const jsPath = path.join(sotDir, 'jayt_apex_interface.js');
const rc094aPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_CANDIDATE_094A.json');
const emitterPath = path.join(repoRoot, '08_RELEASE_VAULT', 'emit_release_candidate_094a.js');
const disclosurePath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECORD_094_RE_EMISSION_INTEGRITY_GAP.json');

let passCount = 0;
let totalCount = 0;

function runTest(name, fn) {
  totalCount++;
  try {
    fn();
    console.log(`  [${name}]: [PASS]`);
    passCount++;
  } catch (err) {
    console.error(`  [${name}]: [FAIL] - ${err.message}`);
  }
}

async function runAsyncTest(name, fn) {
  totalCount++;
  try {
    await fn();
    console.log(`  [${name}]: [PASS]`);
    passCount++;
  } catch (err) {
    console.error(`  [${name}]: [FAIL] - ${err.message}`);
  }
}

async function main() {
  console.log('🧪 [JAYT-094A-TEST] Khởi chạy bộ kiểm thử Cinematic Bento HTTP Staging 094A (READ-ONLY)...\n');

  // TEST 01: Project Memory Consistency
  runTest('TEST_01_MEMORY_CONSISTENCY_PASSES_ALL_10_TESTS', () => {
    const memTestPath = path.join(__dirname, 'test_project_memory_consistency.js');
    assert.ok(fs.existsSync(memTestPath), 'test_project_memory_consistency.js missing');
    const out = execSync(`node "${memTestPath}"`, { encoding: 'utf8', cwd: repoRoot });
    assert.ok(out.includes('10/10') && out.includes('PASS'), 'Project memory must pass 10/10');
  });

  // TEST 02: Append-Only Disclosure 094 Record Exists
  runTest('TEST_02_DISCLOSURE_094_EXISTS_AND_CANDIDATE_ISOLATED', () => {
    assert.ok(fs.existsSync(disclosurePath), 'DISCLOSURE_RECORD_094_RE_EMISSION_INTEGRITY_GAP.json must exist');
    const disc = JSON.parse(fs.readFileSync(disclosurePath, 'utf8'));
    assert.strictEqual(disc.disclosure_id, 'DISCLOSURE_RECORD_094_RE_EMISSION_INTEGRITY_GAP');
    assert.strictEqual(disc.governance_status, 'SUPERSEDED_BY_094A');
    assert.strictEqual(disc.production_lock_preserved, true);
  });

  // TEST 03: Negative Emitter Collision (Fail-Closed, Exit Code 1, 0 Mutation)
  runTest('TEST_03_NEGATIVE_COLLISION_NON_ZERO_EXIT_AND_ZERO_MUTATION', () => {
    assert.ok(fs.existsSync(rc094aPath), 'RELEASE_CANDIDATE_094A.json must exist prior to collision test');
    const beforeHash = sha256(fs.readFileSync(rc094aPath));

    const result = spawnSync('node', [emitterPath], { cwd: repoRoot, encoding: 'utf8' });
    assert.notStrictEqual(result.status, 0, 'Collision run must exit with non-zero status code');
    assert.ok(result.stderr.includes('FAIL-CLOSED') || result.stderr.includes('tồn tại'), 'Expected fail-closed error');

    const afterHash = sha256(fs.readFileSync(rc094aPath));
    assert.strictEqual(afterHash, beforeHash, 'Candidate file hash must not mutate upon collision');
  });

  // TEST 04: Pre-generated HTTP Staging Evidence Metadata Integrity
  runTest('TEST_04_PRE_GENERATED_HTTP_STAGING_EVIDENCE_METADATA', () => {
    const metaPath = path.join(__dirname, 'runtime_evidence', 'screenshots_094a', 'evidence_metadata_094a.json');
    assert.ok(fs.existsSync(metaPath), 'evidence_metadata_094a.json must exist');

    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    assert.strictEqual(meta.work_order, 'JAYT-094A-STAGING-CINEMATIC-BENTO-AND-DISCLOSURE');
    assert.ok(meta.staging_http_origin && meta.staging_http_origin.startsWith('http://127.0.0.1:'), 'Origin must be HTTP staging');

    const expectedScreens = [
      'desktop_1440px_cinematic_bento.png',
      'tablet_768px_cinematic_bento.png',
      'mobile_390px_cinematic_bento.png'
    ];

    for (const screen of expectedScreens) {
      assert.ok(meta.viewports[screen], `Metadata entry missing for ${screen}`);
      const screenPath = path.join(__dirname, 'runtime_evidence', 'screenshots_094a', screen);
      assert.ok(fs.existsSync(screenPath), `Screenshot file missing: ${screen}`);
      const screenBuf = fs.readFileSync(screenPath);
      assert.strictEqual(sha256(screenBuf), meta.viewports[screen].sha256, `SHA-256 mismatch for ${screen}`);
      assert.strictEqual(screenBuf.length, meta.viewports[screen].file_size_bytes, `Size mismatch for ${screen}`);
      assert.strictEqual(meta.viewports[screen].overflow_x, false, `Overflow detected in ${screen}`);
    }
  });

  // Start Real HTTP Static Server for Testing
  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const filePath = path.join(sotDir, reqPath);
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath);
      const mime = ext === '.html' ? 'text/html' : ext === '.js' ? 'application/javascript' : ext === '.json' ? 'application/json' : 'text/plain';
      res.writeHead(200, { 'Content-Type': mime });
      res.end(fs.readFileSync(filePath));
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  });

  const port = await new Promise(resolve => {
    server.listen(0, '127.0.0.1', () => {
      resolve(server.address().port);
    });
  });

  const httpOrigin = `http://127.0.0.1:${port}`;

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    const interceptedRequests = [];

    await page.setRequestInterception(true);
    page.on('request', req => {
      const url = req.url();
      if (!url.startsWith(httpOrigin)) {
        interceptedRequests.push({ url, method: req.method() });
      }
      req.continue();
    });

    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${httpOrigin}/`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 400));

    // TEST 05: Strict Touch Targets >= 44px on Mobile
    await runAsyncTest('TEST_05_STRICT_TOUCH_TARGETS_GE_44PX_ACROSS_DOM', async () => {
      await page.setViewport({ width: 390, height: 844, isMobile: true });
      await new Promise(r => setTimeout(r, 300));

      const touchViolations = await page.evaluate(() => {
        const interactive = Array.from(document.querySelectorAll('button, select, input, a.apex-btn, .apex-category-pill, .apex-hero-cta-btn'));
        const violations = [];
        for (const el of interactive) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            if (rect.height < 44) {
              violations.push({ tag: el.tagName, id: el.id, class: el.className, height: rect.height, width: rect.width });
            }
          }
        }
        return violations;
      });
      assert.strictEqual(touchViolations.length, 0, `Touch target <44px violations: ${JSON.stringify(touchViolations)}`);
    });

    // TEST 06: Category Dock & Scroll Snap
    await runAsyncTest('TEST_06_CATEGORY_DOCK_AND_SCROLL_SNAP_INTERACTION', async () => {
      const dockExists = await page.evaluate(() => Boolean(document.querySelector('.apex-category-dock')));
      assert.strictEqual(dockExists, true, 'Category dock must exist on discovery home');

      const pillCount = await page.evaluate(() => document.querySelectorAll('.apex-category-pill').length);
      assert.ok(pillCount >= 5, `Category dock must contain >= 5 pills, found ${pillCount}`);

      // Click on Lunch category
      await page.click('button[data-category-dock="LUNCH"]');
      await new Promise(r => setTimeout(r, 200));

      const activeCat = await page.evaluate(() => {
        const activePill = document.querySelector('.apex-category-pill.active');
        return activePill ? activePill.innerText : '';
      });
      assert.ok(activeCat.includes('Cơm Trưa'), 'Category pill click must update active filter');
    });

    // TEST 07: Bento 45/30/25 Hierarchy & Layout
    await runAsyncTest('TEST_07_BENTO_45_30_25_HIERARCHY_AND_LAYOUT', async () => {
      const hasHero = await page.evaluate(() => Boolean(document.querySelector('.apex-cinematic-hero')));
      const hasContext = await page.evaluate(() => Boolean(document.querySelector('.apex-context-column')));
      const hasFintech = await page.evaluate(() => Boolean(document.querySelector('.apex-fintech-metal-card')));
      const hasRadar = await page.evaluate(() => Boolean(document.querySelector('.apex-radar-amber-card')));

      assert.strictEqual(hasHero, true, 'Hero card must exist');
      assert.strictEqual(hasContext, true, 'Context cards must exist');
      assert.strictEqual(hasFintech, true, 'Fintech metal card must exist');
      assert.strictEqual(hasRadar, true, 'Amber radar card must exist');
    });

    // TEST 08: Viewport 2 Khám Phá Dịch Vụ Địa Phương
    await runAsyncTest('TEST_08_VIEWPORT_2_LOCAL_SERVICES_AND_WIDGET', async () => {
      const titleExists = await page.evaluate(() => {
        const title = document.querySelector('.apex-discovery-section-title');
        return title ? title.innerText.includes('Khám Phá Dịch Vụ Địa Phương') : false;
      });
      assert.strictEqual(titleExists, true, 'Khám Phá Dịch Vụ Địa Phương section title must exist');

      const serviceCards = await page.evaluate(() => document.querySelectorAll('.apex-service-card').length);
      assert.ok(serviceCards >= 3, `Expected >= 3 service cards, got ${serviceCards}`);
    });

    // TEST 09: Splitwise Bottom Sheet & Keyboard Escape Dismissal
    await runAsyncTest('TEST_09_SPLITWISE_BOTTOM_SHEET_AND_ESCAPE_DISMISSAL', async () => {
      await page.click('#btn-open-calc-sheet-sidebar');
      await new Promise(r => setTimeout(r, 200));

      const isOverlayActive = await page.evaluate(() => {
        const overlay = document.getElementById('calc-bottom-sheet-overlay');
        return overlay ? overlay.classList.contains('active') : false;
      });
      assert.strictEqual(isOverlayActive, true, 'Bottom sheet overlay must become active');

      await page.$eval('#sheet-input-price', el => { el.value = '300000'; el.dispatchEvent(new Event('input')); });
      await page.$eval('#sheet-input-voucher', el => { el.value = '60000'; el.dispatchEvent(new Event('input')); });
      await page.$eval('#sheet-input-split', el => { el.value = '3'; el.dispatchEvent(new Event('input')); });
      await new Promise(r => setTimeout(r, 200));

      const perPersonText = await page.evaluate(() => {
        const el = document.getElementById('sheet-val-per-person');
        return el ? el.innerText : '';
      });
      assert.ok(perPersonText.includes('80.000'), `Per-person split must be 80.000đ, got ${perPersonText}`);

      // Press Escape to dismiss
      await page.keyboard.press('Escape');
      await new Promise(r => setTimeout(r, 200));

      const isOverlayClosed = await page.evaluate(() => {
        const overlay = document.getElementById('calc-bottom-sheet-overlay');
        return overlay ? overlay.classList.contains('active') : false;
      });
      assert.strictEqual(isOverlayClosed, false, 'Pressing Escape must close bottom sheet');
    });

    // TEST 10: Community Signal Submission & Network Airgap with PII Sanitization
    await runAsyncTest('TEST_10_COMMUNITY_SIGNAL_NETWORK_AIRGAP_AND_PII_SANITIZATION', async () => {
      const startReqs = interceptedRequests.length;

      const input = await page.$('#community-signal-input');
      assert.ok(input, 'Community signal input must exist on page');

      await page.$eval('#community-signal-input', el => {
        el.value = 'Liên hệ anh Tuấn 0905123456 hoặc email tuan@gmail.com tại rạp Metiz Helio';
        el.dispatchEvent(new Event('input'));
      });

      await page.click('#btn-submit-community-signal');
      await new Promise(r => setTimeout(r, 300));

      const postReqs = interceptedRequests.slice(startReqs);
      assert.strictEqual(postReqs.length, 0, `Submission must not trigger network requests: ${JSON.stringify(postReqs)}`);

      // Verify stored in localStorage with PII redacted
      const stored = await page.evaluate(() => {
        const raw = localStorage.getItem('jayt_community_signals_080') || localStorage.getItem('jayt_community_signals');
        return raw ? JSON.parse(raw) : [];
      });
      assert.ok(stored.length > 0, 'Signal must be stored');
      assert.ok(stored[0].submitted_content.includes('[SĐT ĐÃ XÓA]'), 'Phone number must be redacted');
      assert.ok(stored[0].submitted_content.includes('[EMAIL ĐÃ XÓA]'), 'Email must be redacted');
    });

    // TEST 11: Release Candidate 094A Manifest & Production Lock Invariants
    runTest('TEST_11_RELEASE_CANDIDATE_094A_BYTE_PARITY_AND_PRODUCTION_LOCK', () => {
      assert.ok(fs.existsSync(rc094aPath), 'RELEASE_CANDIDATE_094A.json missing');
      const rc = JSON.parse(fs.readFileSync(rc094aPath, 'utf8'));
      assert.strictEqual(rc.release_candidate_id, 'JAYT_RELEASE_CANDIDATE_094A');
      assert.strictEqual(rc.version, '2.4.1');

      for (const [filename, meta] of Object.entries(rc.artifacts)) {
        const sotFile = path.join(sotDir, filename);
        const deployFile = path.join(deployDir, filename);
        const stagingFile = path.join(stagingDir, filename);

        assert.ok(fs.existsSync(sotFile), `SoT file missing: ${filename}`);
        const sotBuf = fs.readFileSync(sotFile);
        assert.strictEqual(sha256(sotBuf), meta.sha256, `SHA-256 mismatch for ${filename}`);
        assert.strictEqual(sotBuf.length, meta.size_bytes, `Size mismatch for ${filename}`);

        if (fs.existsSync(deployFile)) {
          assert.strictEqual(sha256(fs.readFileSync(deployFile)), meta.sha256, `Deploy SHA-256 mismatch for ${filename}`);
        }
        if (fs.existsSync(stagingFile)) {
          assert.strictEqual(sha256(fs.readFileSync(stagingFile)), meta.sha256, `Staging SHA-256 mismatch for ${filename}`);
        }
      }

      // Production Lock Invariants
      const dealsFeed = JSON.parse(fs.readFileSync(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json'), 'utf8'));
      assert.ok(Array.isArray(dealsFeed) && dealsFeed.length === 0, 'Production deals_feed.json must be []');
      assert.strictEqual(rc.invariants.production_feed_empty, true);
      assert.strictEqual(rc.invariants.production_approval_is_false, true);

      const releaseManifest = JSON.parse(fs.readFileSync(path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json'), 'utf8'));
      const isApproved = releaseManifest?.governance_locks?.immutable_ceo_approval_record?.is_approved ?? releaseManifest?.is_approved;
      assert.strictEqual(isApproved, false, 'RELEASE_MANIFEST.is_approved must be false');
    });

  } finally {
    await browser.close();
    server.close();
  }

  console.log('\n======================================================');
  if (passCount === totalCount) {
    console.log(`🟢 [CINEMATIC-BENTO-094A-SUMMARY] Toàn bộ ${passCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!`);
  } else {
    console.error(`❌ [CINEMATIC-BENTO-094A-SUMMARY] Thất bại: ${passCount}/${totalCount} PASS.`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('❌ [TEST-RUNNER-ERROR]', err);
  process.exit(1);
});
