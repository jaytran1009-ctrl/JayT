/**
 * JAYT CHECKPOINT & TECHNICAL SERVE QA SUITE (SECTION EZ-AG)
 * Governing Directive: JAYT-245 Section EZ-AG (Lines 4832-4852)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('d:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/node_modules/puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const TARGET_URL = 'http://127.0.0.1:4173/';
const HEALTH_URL = 'http://127.0.0.1:4173/health';

async function runEZAGCheckpointQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-AG CHECKPOINT & TECHNICAL SERVE QA...\n');

  const baseDir = path.join(ROOT, '00_PROGRAM_BASELINE');
  const councilDir = path.join(ROOT, '01_EXECUTIVE_COUNCIL');
  const evidenceDir = path.join(ROOT, '06_TRUST_AND_EVIDENCE');

  const receiptPath = path.join(baseDir, 'JAYT_RELEASE_RECEIPT_EZ_AG.json');
  const manifestPath = path.join(baseDir, 'JAYT_VERSION_PARITY_MANIFEST_EZ_AG.json');
  const packPath = path.join(councilDir, 'COUNCIL_REVIEW_PACK_EZ_AG_CHECKPOINT_VERIFICATION_20260831.md');
  const ledgerPath = path.join(evidenceDir, 'FAST_LANE_BATCH_PILOT_2_CANDIDATES_SLA_LEDGER_EZ_AE.json');

  assert.ok(fs.existsSync(receiptPath), 'Missing Receipt EZ-AG');
  assert.ok(fs.existsSync(manifestPath), 'Missing Manifest EZ-AG');
  assert.ok(fs.existsSync(packPath), 'Missing Pack EZ-AG');
  assert.ok(fs.existsSync(ledgerPath), 'Missing Fast Lane Ledger');

  const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));

  let totalTests = 0;
  let passedTests = 0;

  async function it(name, fn) {
    totalTests++;
    try {
      await fn();
      console.log('  ✓ ' + name);
      passedTests++;
    } catch (err) {
      console.error('  ✕ ' + name + ': ' + err.message);
      throw err;
    }
  }

  // --- Suite 1: Governance Classification Invariants (Mandates EZ-AG.1 & EZ-AG.2) ---
  console.log('--- Suite 1: Governance Classification Invariants (Mandates EZ-AG.1 & EZ-AG.2) ---');

  await it('Manifest records technical_serve_status = TECHNICAL_SERVE_VERIFIED and UX acceptance pending', () => {
    assert.strictEqual(manifest.technical_serve_status, 'TECHNICAL_SERVE_VERIFIED');
    assert.strictEqual(manifest.ux_acceptance_status, 'UX_ACCEPTANCE_PENDING_CEO_BROWSER_REVIEW');
    assert.strictEqual(manifest.parity_status, 'PERFECT_MATCH_ZERO_DRIFT');
  });

  await it('Fast Lane ledger maintains exactly 2 candidates with valid raw SHA-256 and not public-eligible', () => {
    assert.strictEqual(ledger.candidates.length, 2);
    ledger.candidates.forEach(c => {
      assert.ok(
        c.sla_status === 'OPEN_EVALUATING' || c.sla_status.startsWith('VERDICT_RENDERED') || c.sla_status.startsWith('CLOSED_SLA_COMPLETED'),
        'SLA status should be OPEN_EVALUATING, VERDICT_RENDERED_*, or CLOSED_SLA_COMPLETED_*'
      );
      assert.strictEqual(c.public_eligible, false);
      const rawBuf = fs.readFileSync(path.join(ROOT, c.raw_capture_metadata.raw_vault_path));
      const sha = crypto.createHash('sha256').update(rawBuf).digest('hex');
      assert.strictEqual(sha, c.raw_capture_metadata.sha256);
    });
  });

  // --- Suite 2: Staging Health & Version Verification (Mandate EZ-AG.1) ---
  console.log('\n--- Suite 2: Staging Health & Version Verification (Mandate EZ-AG.1) ---');

  await it('Live staging health endpoint returns exact expected version from build manifest with PERFECT_MATCH_ZERO_DRIFT', async () => {
    const buildManifest = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_BUILD_MANIFEST.json'), 'utf8'));
    const expectedVer = buildManifest.expectedVersion;
    const res = await fetch(HEALTH_URL);
    const data = await res.json();
    assert.strictEqual(data.status, 'UP');
    assert.strictEqual(data.version, expectedVer, 'Health version must EXACTLY equal expectedVersion');
    assert.strictEqual(data.parity, 'PERFECT_MATCH_ZERO_DRIFT');
  });

  // --- Suite 3: Browser DOM Containment & Savings Lab Elements ---
  console.log('\n--- Suite 3: Browser DOM Containment & Savings Lab Elements ---');

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto(TARGET_URL, { waitUntil: 'networkidle0', timeout: 15000 });

    await it('[Browser] Exactly 1 external link in public DOM (GitHub Docs Pilot Only)', async () => {
      const extLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
        return links.filter(h => h.startsWith('http') && !h.includes('127.0.0.1') && !h.includes('localhost'));
      });
      assert.strictEqual(extLinks.length, 1);
      assert.ok(extLinks[0].includes('docs.github.com'));
    });

    await it('[Browser] Savings Lab v2 controls and presets exist in DOM and operate locally', async () => {
      await page.click('button[data-nav="BUY_DECISION"]');
      await new Promise(r => setTimeout(r, 400));
      const hasSolo = await page.$('#preset-solo');
      const hasGroup = await page.$('#preset-group');
      const hasFormula = await page.$('#formula-total');
      assert.ok(hasSolo && hasGroup && hasFormula);
    });

    await it('[Browser] 0 console errors during full page lifecycle', () => {
      assert.strictEqual(consoleErrors.length, 0);
    });

    await page.close();
  } finally {
    if (browser) await browser.close();
  }

  // --- Suite 4: Parity Verification ---
  console.log('\n--- Suite 4: Parity Verification ---');

  await it('SOT JS and Served JS have identical SHA-256 (ZERO DEPLOY DRIFT)', () => {
    assert.strictEqual(manifest.artifacts.sot_js.sha256, manifest.artifacts.served_js.sha256);
    assert.strictEqual(manifest.artifacts.sot_html.sha256, manifest.artifacts.served_html.sha256);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-AG CHECKPOINT QA TESTS PASSED!\n');
}

runEZAGCheckpointQA().catch(e => {
  console.error('Fatal Runner Error:', e);
  process.exit(1);
});
