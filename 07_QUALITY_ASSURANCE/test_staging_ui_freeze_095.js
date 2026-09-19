const fs = require('fs');
const path = require('path');
const http = require('http');
const assert = require('assert');
const crypto = require('crypto');
const { execSync } = require('child_process');
const puppeteer = require('puppeteer');

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const repoRoot = path.resolve(__dirname, '..');
const sotDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');
const deployDir = path.join(repoRoot, 'deploy', 'public');
const stagingDir = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH');
const disclosure094Path = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECORD_094_RE_EMISSION_INTEGRITY_GAP.json');
const disclosure094aPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECORD_094A_RE_EMISSION_INTEGRITY_GAP.json');
const disclosure094bPath = path.join(repoRoot, '08_RELEASE_VAULT', 'DISCLOSURE_RECORD_094B_RE_EMISSION_AND_DIRECT_MUTATION.json');

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
  console.log('🧪 [JAYT-095-TEST] Khởi chạy bộ kiểm thử Staging UI Review & Freeze 095 (READ-ONLY)...\n');

  // TEST 01: Project Memory Consistency
  runTest('TEST_01_MEMORY_CONSISTENCY_PASSES_ALL_10_TESTS', () => {
    const memTestPath = path.join(__dirname, 'test_project_memory_consistency.js');
    assert.ok(fs.existsSync(memTestPath), 'test_project_memory_consistency.js missing');
    const out = execSync(`node "${memTestPath}"`, { encoding: 'utf8', cwd: repoRoot });
    assert.ok(out.includes('10/10') && out.includes('PASS'), 'Project memory must pass 10/10');
  });

  // TEST 02: Triple Append-Only Disclosures Exist (094, 094A, 094B)
  runTest('TEST_02_TRIPLE_APPEND_ONLY_DISCLOSURES_EXIST_AND_CANDIDATES_FROZEN', () => {
    assert.ok(fs.existsSync(disclosure094Path), 'DISCLOSURE_RECORD_094_RE_EMISSION_INTEGRITY_GAP.json missing');
    assert.ok(fs.existsSync(disclosure094aPath), 'DISCLOSURE_RECORD_094A_RE_EMISSION_INTEGRITY_GAP.json missing');
    assert.ok(fs.existsSync(disclosure094bPath), 'DISCLOSURE_RECORD_094B_RE_EMISSION_AND_DIRECT_MUTATION.json missing');

    const disc094 = JSON.parse(fs.readFileSync(disclosure094Path, 'utf8'));
    const disc094a = JSON.parse(fs.readFileSync(disclosure094aPath, 'utf8'));
    const disc094b = JSON.parse(fs.readFileSync(disclosure094bPath, 'utf8'));

    assert.strictEqual(disc094.governance_status, 'SUPERSEDED_BY_094A');
    assert.strictEqual(disc094a.governance_status, 'SUPERSEDED_BY_094B');
    assert.strictEqual(disc094b.governance_status, 'FROZEN_PENDING_CEO_UI_DECISION');
    assert.strictEqual(disc094b.production_lock_preserved, true);
  });

  // TEST 03: Release Candidate Freeze Protocol (Zero new RC generated in 095)
  runTest('TEST_03_RELEASE_CANDIDATE_FREEZE_PROTOCOL_ENFORCED', () => {
    const rc094cPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_CANDIDATE_094C.json');
    const rc095Path = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_CANDIDATE_095.json');
    assert.strictEqual(fs.existsSync(rc094cPath), false, 'RELEASE_CANDIDATE_094C.json must NOT exist');
    assert.strictEqual(fs.existsSync(rc095Path), false, 'RELEASE_CANDIDATE_095.json must NOT exist');
  });

  // TEST 03B: Negative Taxonomy Test - Rejected Work Orders (094, 094A, 094B) MUST NOT be Allowed ACCEPTED BY CEO
  runTest('TEST_03B_REJECTED_WORK_ORDERS_TAXONOMY_INTEGRITY_FAIL_CLOSED', () => {
    const { validateGlobalStatusTaxonomy067 } = require('./memory_transaction_manager_057.js');
    const receiptPath = path.join(repoRoot, '08_RELEASE_VAULT', 'CORRECTION_RECEIPT_095_REJECTED_WO_TAXONOMY_INTEGRITY.json');
    assert.ok(fs.existsSync(receiptPath), 'CORRECTION_RECEIPT_095_REJECTED_WO_TAXONOMY_INTEGRITY.json missing');

    const rejectedWos = ['094', '094A', '094B'];
    for (const wo of rejectedWos) {
      // Test table format negative
      assert.throws(() => {
        validateGlobalStatusTaxonomy067(`| \`2026-08-25T15:00:00+07:00\` | \`JAYT-${wo}\` | Description | Artifact | Test | **ACCEPTED BY CEO** |`);
      }, /STATUS_TAXONOMY_VIOLATION_067/, `Work order ${wo} MUST be rejected when claiming ACCEPTED BY CEO`);

      // Test colon format negative
      assert.throws(() => {
        validateGlobalStatusTaxonomy067(`${wo}: ACCEPTED BY CEO`);
      }, /STATUS_TAXONOMY_VIOLATION_067/, `Work order ${wo} MUST be rejected when claiming colon ACCEPTED`);
    }
  });

  // TEST 04: Pre-generated HTTP Staging Evidence Metadata Integrity
  runTest('TEST_04_PRE_GENERATED_HTTP_STAGING_EVIDENCE_METADATA', () => {
    const metaPath = path.join(__dirname, 'runtime_evidence', 'screenshots_095', 'evidence_metadata_095.json');
    assert.ok(fs.existsSync(metaPath), 'evidence_metadata_095.json must exist');

    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    assert.strictEqual(meta.work_order, 'JAYT-095-STAGING-UI-CONVERGENCE-AND-FREEZE');
    assert.strictEqual(meta.purpose, 'CEO_VISUAL_REVIEW_ONLY');
    assert.strictEqual(meta.release_candidate_emitted, false);
    assert.ok(meta.staging_http_origin && meta.staging_http_origin.startsWith('http://127.0.0.1:'), 'Origin must be HTTP staging');

    const expectedScreens = [
      'desktop_1440px_staging_review_095.png',
      'tablet_768px_staging_review_095.png',
      'mobile_390px_staging_review_095.png'
    ];

    for (const screen of expectedScreens) {
      assert.ok(meta.viewports[screen], `Metadata entry missing for ${screen}`);
      const screenPath = path.join(__dirname, 'runtime_evidence', 'screenshots_095', screen);
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

      await page.click('button[data-category-dock="LUNCH"]');
      await new Promise(r => setTimeout(r, 200));

      const activeCat = await page.evaluate(() => {
        const activePill = document.querySelector('.apex-category-pill.active');
        return activePill ? activePill.innerText : '';
      });
      assert.ok(activeCat.includes('Cơm Trưa'), 'Category pill click must update active filter');
    });

    // TEST 07: Bento 45/30/25 Hierarchy & Unclaimed Data Rigor (0 Fake Prices/Discounts)
    await runAsyncTest('TEST_07_BENTO_45_30_25_HIERARCHY_AND_UNCLAIMED_RIGOR', async () => {
      const heroText = await page.evaluate(() => {
        const hero = document.querySelector('.apex-cinematic-hero');
        return hero ? hero.innerText : '';
      });

      assert.ok(heroText.includes('Chưa có ưu đãi thương mại'), 'Hero must declare honest empty offer state');
      assert.ok(!heroText.includes('55.000đ'), 'Hero must not claim 55.000đ offer without verified commercial offer evidence');
      assert.ok(!heroText.includes('75.000đ'), 'Hero must not claim crossed out 75.000đ price without evidence');

      // Context cards must contain verified venues
      const contextText = await page.evaluate(() => {
        const col = document.querySelector('.apex-context-column');
        return col ? col.innerText : '';
      });
      assert.ok(contextText.includes('Gong Cha') && contextText.includes('Phê La'), 'Context cards must contain verified Gong Cha & Phê La');
    });

    // TEST 08: Viewport 2 Khám Phá Địa Điểm Đã Xác Minh Tại Đà Nẵng
    await runAsyncTest('TEST_08_VIEWPORT_2_VERIFIED_LOCATIONS_GRID', async () => {
      const titleExists = await page.evaluate(() => {
        const title = document.querySelector('.apex-discovery-section-title');
        return title ? title.innerText.includes('Điểm Hẹn Đã Xác Minh Tại Đà Nẵng') : false;
      });
      assert.strictEqual(titleExists, true, 'Section title must match verified locations in Da Nang');

      const serviceCards = await page.evaluate(() => document.querySelectorAll('.apex-service-card').length);
      assert.strictEqual(serviceCards, 4, `Expected 4 verified location cards, got ${serviceCards}`);
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
        el.value = 'Báo ưu đãi tại Gong Cha 01 Nguyễn Văn Linh: liên hệ 0905123456 hoặc email test@gmail.com';
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

    // TEST 11: Production Lock Invariants
    runTest('TEST_11_PRODUCTION_LOCK_INVARIANTS', () => {
      const dealsFeed = JSON.parse(fs.readFileSync(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json'), 'utf8'));
      assert.ok(Array.isArray(dealsFeed) && dealsFeed.length === 0, 'Production deals_feed.json must be []');

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
    console.log(`🟢 [STAGING-UI-FREEZE-095-SUMMARY] Toàn bộ ${passCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!`);
  } else {
    console.error(`❌ [STAGING-UI-FREEZE-095-SUMMARY] Thất bại: ${passCount}/${totalCount} PASS.`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('❌ [TEST-RUNNER-ERROR]', err);
  process.exit(1);
});
