const fs = require('fs');
const path = require('path');
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
const rc094Path = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_CANDIDATE_094.json');
const emitterPath = path.join(repoRoot, '08_RELEASE_VAULT', 'emit_release_candidate_094.js');

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
  console.log('🧪 [JAYT-094-TEST] Khởi chạy bộ kiểm thử Cinematic Bento Discovery Premium 094 (READ-ONLY)...\n');

  // TEST 01: Project Memory Consistency
  runTest('TEST_01_MEMORY_CONSISTENCY_PASSES_ALL_10_TESTS', () => {
    const memTestPath = path.join(__dirname, 'test_project_memory_consistency.js');
    assert.ok(fs.existsSync(memTestPath), 'test_project_memory_consistency.js missing');
    const out = execSync(`node "${memTestPath}"`, { encoding: 'utf8', cwd: repoRoot });
    assert.ok(out.includes('10/10') && out.includes('PASS'), 'Project memory must pass 10/10');
  });

  // TEST 02: Negative Emitter Collision (Fail-Closed, Exit Code 1, 0 Mutation)
  runTest('TEST_02_NEGATIVE_COLLISION_NON_ZERO_EXIT_AND_ZERO_MUTATION', () => {
    assert.ok(fs.existsSync(rc094Path), 'RELEASE_CANDIDATE_094.json must exist prior to collision test');
    const beforeHash = sha256(fs.readFileSync(rc094Path));

    const result = spawnSync('node', [emitterPath], { cwd: repoRoot, encoding: 'utf8' });
    assert.notStrictEqual(result.status, 0, 'Collision run must exit with non-zero status code');
    assert.ok(result.stderr.includes('FAIL-CLOSED') || result.stderr.includes('tồn tại'), 'Expected fail-closed error');

    const afterHash = sha256(fs.readFileSync(rc094Path));
    assert.strictEqual(afterHash, beforeHash, 'Candidate file hash must not mutate upon collision');
  });

  // TEST 03: Pre-generated Evidence Metadata Integrity
  runTest('TEST_03_PRE_GENERATED_EVIDENCE_ARTIFACTS_AND_METADATA', () => {
    const metaPath = path.join(__dirname, 'runtime_evidence', 'screenshots_094', 'evidence_metadata_094.json');
    assert.ok(fs.existsSync(metaPath), 'evidence_metadata_094.json must exist');

    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    assert.strictEqual(meta.work_order, 'JAYT-094-CINEMATIC-BENTO-DISCOVERY-PREMIUM');

    const expectedScreens = [
      'desktop_1440px_cinematic.png',
      'tablet_768px_cinematic.png',
      'mobile_390px_cinematic.png'
    ];

    for (const screen of expectedScreens) {
      assert.ok(meta.viewports[screen], `Metadata entry missing for ${screen}`);
      const screenPath = path.join(__dirname, 'runtime_evidence', 'screenshots_094', screen);
      assert.ok(fs.existsSync(screenPath), `Screenshot file missing: ${screen}`);
      const screenBuf = fs.readFileSync(screenPath);
      assert.strictEqual(sha256(screenBuf), meta.viewports[screen].sha256, `SHA-256 mismatch for ${screen}`);
      assert.strictEqual(screenBuf.length, meta.viewports[screen].file_size_bytes, `Size mismatch for ${screen}`);
      assert.strictEqual(meta.viewports[screen].overflow_x, false, `Overflow detected in ${screen}`);
    }
  });

  // Puppeteer Interactive Tests
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
      if (!url.startsWith('file://')) {
        interceptedRequests.push({ url, method: req.method() });
      }
      req.continue();
    });

    const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 400));

    // TEST 04: Strict Touch Targets >= 44px
    await runAsyncTest('TEST_04_STRICT_TOUCH_TARGETS_GE_44PX_ACROSS_DOM', async () => {
      await page.setViewport({ width: 390, height: 844, isMobile: true });
      await new Promise(r => setTimeout(r, 300));

      const touchViolations = await page.evaluate(() => {
        const interactive = Array.from(document.querySelectorAll('button, select, input, a.apex-btn, .apex-category-pill, .apex-hero-btn'));
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

    // TEST 05: Category Dock & Scroll Snap
    await runAsyncTest('TEST_05_CATEGORY_DOCK_AND_SCROLL_SNAP_INTERACTION', async () => {
      const dockExists = await page.evaluate(() => Boolean(document.querySelector('.apex-category-dock')));
      assert.strictEqual(dockExists, true, 'Category dock must exist on discovery home');

      const pillCount = await page.evaluate(() => document.querySelectorAll('.apex-category-pill').length);
      assert.ok(pillCount >= 5, `Category dock must contain >= 5 pills, found ${pillCount}`);

      // Click on Cinema category
      await page.click('button[data-category-dock="CINEMA"]');
      await new Promise(r => setTimeout(r, 200));

      const activeCat = await page.evaluate(() => {
        const activePill = document.querySelector('.apex-category-pill.active');
        return activePill ? activePill.innerText : '';
      });
      assert.ok(activeCat.includes('Rạp phim'), 'Category pill click must update active filter');
    });

    // TEST 06: Hero State Rigor (Honest Zero-Offer State)
    await runAsyncTest('TEST_06_HERO_STATE_RIGOR_HONEST_ZERO_OFFER', async () => {
      const heroText = await page.evaluate(() => {
        const hero = document.querySelector('.apex-cinematic-hero');
        return hero ? hero.innerText : '';
      });
      assert.ok(heroText.includes('Chưa có ưu đãi thương mại được mở bán công khai hôm nay'), 'Hero must display honest zero-offer state');
      assert.strictEqual(heroText.includes('55.000'), false, 'Hero must not contain fake 55k price');
      assert.strictEqual(heroText.includes('25.000'), false, 'Hero must not contain fake 25k price');
      assert.strictEqual(heroText.includes('ĐẶT VÉ NGAY'), false, 'Hero must not contain unverified booking CTA');
    });

    // TEST 07: Context Cards & Merchant Asset Safety
    runTest('TEST_07_CONTEXT_CARDS_AND_ASSET_SAFETY', () => {
      const jsCode = fs.readFileSync(jsPath, 'utf8');

      // Zero unverified pulses
      const pulseRegex = /animation:\s*pulse|@keyframes\s*pulse/gi;
      assert.strictEqual(pulseRegex.test(jsCode), false, 'Forbidden pulse animation found');

      // Zero external image hotlinks
      assert.strictEqual(jsCode.includes('http://') || jsCode.includes('https://images.'), false, 'External image hotlinks forbidden');
    });

    // TEST 08: Splitwise Bottom Sheet & Keyboard Escape Dismissal
    await runAsyncTest('TEST_08_SPLITWISE_BOTTOM_SHEET_AND_ESCAPE_DISMISSAL', async () => {
      await page.click('#btn-open-calc-sheet');
      await new Promise(r => setTimeout(r, 200));

      const isOverlayActive = await page.evaluate(() => {
        const overlay = document.getElementById('calc-bottom-sheet-overlay');
        return overlay ? overlay.classList.contains('active') : false;
      });
      assert.strictEqual(isOverlayActive, true, 'Bottom sheet overlay must become active');

      // Enter numbers into calculator inputs
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

    // TEST 09: Community Signal Network Airgap
    await runAsyncTest('TEST_09_COMMUNITY_SIGNAL_NETWORK_AIRGAP', async () => {
      const startReqs = interceptedRequests.length;

      const input = await page.$('#community-signal-input');
      assert.ok(input, 'Community signal input must exist on page');

      await page.$eval('#community-signal-input', el => {
        el.value = 'Highlands Coffee Bạch Đằng đang có ưu đãi trà sen vàng thứ 4';
        el.dispatchEvent(new Event('input'));
      });

      await page.click('#btn-submit-community-signal');
      await new Promise(r => setTimeout(r, 300));

      const postReqs = interceptedRequests.slice(startReqs);
      assert.strictEqual(postReqs.length, 0, `Submission must not trigger network requests: ${JSON.stringify(postReqs)}`);

      // Verify stored in localStorage
      const stored = await page.evaluate(() => {
        const raw = localStorage.getItem('jayt_community_signals_080') || localStorage.getItem('jayt_community_signals');
        return raw ? JSON.parse(raw) : [];
      });
      assert.ok(stored.length > 0 && stored[0].submitted_content.includes('Highlands Coffee'), 'Signal must be saved locally');
    });

    // TEST 10: Release Candidate 094 Manifest Integrity & Production Lock
    runTest('TEST_10_RELEASE_CANDIDATE_094_BYTE_PARITY_AND_PRODUCTION_LOCK', () => {
      assert.ok(fs.existsSync(rc094Path), 'RELEASE_CANDIDATE_094.json missing');
      const rc = JSON.parse(fs.readFileSync(rc094Path, 'utf8'));
      assert.strictEqual(rc.release_candidate_id, 'JAYT_RELEASE_CANDIDATE_094');
      assert.strictEqual(rc.version, '2.4.0');

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
    });

  } finally {
    await browser.close();
  }

  console.log('\n======================================================');
  if (passCount === totalCount) {
    console.log(`🟢 [CINEMATIC-BENTO-094-SUMMARY] Toàn bộ ${passCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!`);
  } else {
    console.error(`❌ [CINEMATIC-BENTO-094-SUMMARY] Thất bại: ${passCount}/${totalCount} PASS.`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('❌ [TEST-RUNNER-ERROR]', err);
  process.exit(1);
});
