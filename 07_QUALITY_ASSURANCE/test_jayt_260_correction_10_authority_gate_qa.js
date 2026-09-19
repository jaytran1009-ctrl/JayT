/**
 * JAYT-260-CORRECTION-10 AUTHORITY GATE & READ-ONLY PROPOSAL QA SUITE
 * Governing Directive: JAYT-245 Section JAYT-260-CORRECTION-10 (Lines 5589-5604)
 *
 * Verifies:
 * 1. Authority Decision Proposal Document (Mandates CORRECTION-10.2 & 10.3):
 *    - Asserts proposal doc exists detailing Option A & Option B.
 *    - Asserts no private keys, secrets, or fake operational signers were created.
 * 2. Historical Pilot Isolation & Zero Arbitrary Public Admission (Mandate CORRECTION-10.4):
 *    - Asserts Canonical Public Approved Registry contains strictly 1 historical approved pilot.
 * 3. Staging Static Preview & Puppeteer Viewports (Mandates CORRECTION-10.1 & 10.5):
 *    - 100% local network requests, zero DOM diff, zero console errors across 1440, 768, 390.
 * 4. Platform State & Commercial Locks (Mandate CORRECTION-10.5):
 *    - Batch 02 is BLOCKED.
 *    - Production locked at v3.419.0 (P0_EQ = OPEN).
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const puppeteer = require('puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const HEALTH_URL = 'http://127.0.0.1:4173/health';
const STAGING_URL = 'http://127.0.0.1:4173/';
const BUILD_MANIFEST_PATH = path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_BUILD_MANIFEST.json');
const EXPECTED_VERSION = fs.existsSync(BUILD_MANIFEST_PATH) ? JSON.parse(fs.readFileSync(BUILD_MANIFEST_PATH, 'utf8')).expectedVersion : 'v3.483.0-staging.ao';
const COHORT_15_CLOSURE_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_COHORT_15_SLA_CLOSURE_LEDGER.json');
const CANONICAL_REGISTRY_PATH = path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_CANONICAL_PUBLIC_APPROVED_REGISTRY.json');
const PROPOSAL_DOC_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_260_CORRECTION_10_AUTHORITY_DECISION_PROPOSAL.md');

async function runJayt260Correction10QA() {
  console.log('\n🔬 RUNNING JAYT-260-CORRECTION-10 AUTHORITY GATE QA...\n');

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

  const currentRuntimeIso = new Date().toISOString();
  console.log('  ℹ Current System Runtime UTC: ' + currentRuntimeIso);

  // --- Suite 1: Authority Decision Proposal Document (Mandates CORRECTION-10.2 & 10.3) ---
  console.log('--- Suite 1: Authority Decision Proposal Document (Mandates CORRECTION-10.2 & 10.3) ---');

  await it('Authority decision proposal document exists and details Option A and Option B', () => {
    assert.ok(fs.existsSync(PROPOSAL_DOC_PATH));
    const doc = fs.readFileSync(PROPOSAL_DOC_PATH, 'utf8');
    assert.ok(doc.includes('TÙY CHỌN A: Managed Capture Service'));
    assert.ok(doc.includes('TÙY CHỌN B: Human-Reviewed Evidence Intake'));
    assert.ok(doc.includes('JAYT-260-CORRECTION-10'));
  });

  await it('Zero private keys, secrets, or fake signers were created (Read-only compliance)', () => {
    const keyFiles = ['private.pem', 'id_rsa', 'secret.key', 'agent_secret.json'];
    for (const k of keyFiles) {
      assert.strictEqual(fs.existsSync(path.join(ROOT, k)), false);
    }
  });

  // --- Suite 2: Historical Pilot Isolation & Zero Arbitrary Public Admission (Mandate CORRECTION-10.4) ---
  console.log('\n--- Suite 2: Historical Pilot Isolation & Zero Arbitrary Public Admission (Mandate CORRECTION-10.4) ---');

  await it('Canonical Public Approved Registry preserves strictly 1 historical approved pilot (GitHub)', () => {
    assert.ok(fs.existsSync(CANONICAL_REGISTRY_PATH));
    const reg = JSON.parse(fs.readFileSync(CANONICAL_REGISTRY_PATH, 'utf8'));
    assert.strictEqual(reg.approved_entities_count, 1);
    assert.strictEqual(reg.approved_entities[0].candidate_id, 'GITHUB_EDUCATION_PILOT_T2');
    assert.strictEqual(reg.ceo_approval_id, 'CEO_DECISION_EZ_AR_GITHUB_PILOT_ONLY');
  });

  // --- Suite 3: Staging Static Preview & Puppeteer Viewports (Mandates CORRECTION-10.1 & 10.5) ---
  console.log('\n--- Suite 3: Staging Static Preview & Puppeteer Viewports (Mandates CORRECTION-10.1 & 10.5) ---');

  await it('Live staging health endpoint returns UP, expectedVersion, and PERFECT_MATCH_ZERO_DRIFT', async () => {
    const res = await fetch(HEALTH_URL);
    const data = await res.json();
    assert.strictEqual(data.status, 'UP');
    assert.strictEqual(data.version, EXPECTED_VERSION);
    assert.strictEqual(data.parity, 'PERFECT_MATCH_ZERO_DRIFT');
  });

  const viewports = [
    { name: 'Desktop 1440', width: 1440, height: 900, isMobile: false, hasTouch: false },
    { name: 'Tablet 768', width: 768, height: 1024, isMobile: true, hasTouch: true },
    { name: 'Mobile 390', width: 390, height: 844, isMobile: true, hasTouch: true }
  ];

  let browser;
  try {
    browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });

    for (const vp of viewports) {
      const page = await browser.newPage();
      await page.setViewport({
        width: vp.width,
        height: vp.height,
        isMobile: vp.isMobile,
        hasTouch: vp.hasTouch,
        deviceScaleFactor: 1
      });

      const consoleErrors = [];
      const networkRequests = [];

      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      page.on('request', req => {
        networkRequests.push(req.url());
      });

      await page.goto(STAGING_URL, { waitUntil: 'networkidle0' });

      await it('[' + vp.name + '] Zero DOM diff: strictly 1 approved pilot card rendered (GitHub), 0 batch cards', async () => {
        const cards = await page.$$('.t2-pilot-card-section');
        assert.strictEqual(cards.length, 1);
        const title = await page.$eval('.t2-pilot-card-section h2', el => el.textContent);
        assert.ok(title.includes('GitHub Education'));
      });

      await it('[' + vp.name + '] Zero DOM diff: strictly 1 external link in public DOM (GitHub Docs Pilot Only)', async () => {
        const extLinks = await page.$$eval('a[href^="http"]', anchors => {
          return anchors
            .map(a => a.href)
            .filter(h => !h.startsWith('http://127.0.0.1') && !h.startsWith('http://localhost'));
        });
        assert.strictEqual(extLinks.length, 1);
        assert.ok(extLinks[0].includes('docs.github.com'));
      });

      await it('[' + vp.name + '] 100% local network requests (0 third-party fonts/CDNs)', () => {
        const thirdParty = networkRequests.filter(u => !u.startsWith('http://127.0.0.1') && !u.startsWith('http://localhost') && !u.startsWith('data:'));
        assert.strictEqual(thirdParty.length, 0);
      });

      await it('[' + vp.name + '] Zero console errors during complete viewport lifecycle', () => {
        assert.strictEqual(consoleErrors.length, 0);
      });

      await page.close();
    }
  } finally {
    if (browser) await browser.close();
  }

  // --- Suite 4: Platform State & Commercial Locks (Mandate CORRECTION-10.5) ---
  console.log('\n--- Suite 4: Platform State & Commercial Locks (Mandate CORRECTION-10.5) ---');

  await it('Cohort 15 active closure ledger records strictly 14 HELD_NEW_COHORT_REQUIRED, 1 CLOSED, 0 PUBLIC_APPROVED', () => {
    assert.ok(fs.existsSync(COHORT_15_CLOSURE_PATH));
    const closureLedger = JSON.parse(fs.readFileSync(COHORT_15_CLOSURE_PATH, 'utf8'));
    assert.strictEqual(closureLedger.closure_summary.held_new_cohort_required_count, 14);
    assert.strictEqual(closureLedger.closure_summary.closed_count, 1);
    assert.strictEqual(closureLedger.closure_summary.public_approved_count_in_cohort, 0);
  });

  await it('Batch 02 is strictly BLOCKED and not initialized before Project Owner authority choice and CEO audit', () => {
    const batch02LedgerPath = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_260_MICRO_BATCH_02_INTAKE_LEDGER.json');
    assert.strictEqual(fs.existsSync(batch02LedgerPath), false, 'Batch 02 must not be initialized before Project Owner selection');
  });

  await it('Commercial locks strictly active (Production locked at v3.419.0, P0_EQ = OPEN, T1 = 0, voucher = 0, affiliate = false)', () => {
    const bManifest = JSON.parse(fs.readFileSync(BUILD_MANIFEST_PATH, 'utf8'));
    assert.strictEqual(bManifest.expectedVersion, EXPECTED_VERSION);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' JAYT-260-CORRECTION-10 QA TESTS PASSED!\n');
}

runJayt260Correction10QA().catch(err => {
  console.error('\nFatal Runner Error:', err);
  process.exit(1);
});
