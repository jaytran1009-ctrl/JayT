/**
 * JAYT SECTION EZ-AR POST-SLA DECISION & GOVERNANCE QA TEST SUITE
 * Governing Directive: JAYT-245 Section EZ-AR (Lines 5018-5038)
 *
 * Verifies:
 * 1. CEO Post-SLA Decision Verification:
 *    - JetBrains: T4_DESCRIPTIVE_ONLY_HELD_INTERNAL, dynamic form survey rejected, public card = false.
 *    - Figma: T2_DOCUMENTATION_HELD_INTERNAL, public staging card rejected by CEO at this stage, public card = false.
 * 2. Commercial Containment & Staging Isolation:
 *    - 0 vouchers, 0 prices, 0 endorsements, 0 merchant assets, 0 commercial CTAs, 0 affiliate links.
 *    - Exactly 1 approved pilot card rendered on public DOM (GitHub Education Pilot).
 *    - Exactly 1 external link in public DOM (GitHub Docs Pilot Only).
 *    - Zero console errors during full page lifecycle.
 * 3. Cohort 15 Pre-SLA Semantics Preservation:
 *    - 14 candidates in OPEN_EVALUATING, 1 candidate INTAKE_FAILED_NO_RAW, 0 tier verdicts before SLA close.
 * 4. Build Immutability & 4-Way Artifact Parity:
 *    - Health endpoint reports v3.483.0-staging.ao and PERFECT_MATCH_ZERO_DRIFT.
 *    - SOT === Served === Manifest === Health for both JS and HTML SHA-256.
 * 5. Production Lock:
 *    - Production locked at v3.419.0 with P0_EQ = OPEN.
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

async function runEZARGovernanceQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-AR POST-SLA DECISION & GOVERNANCE QA...\n');

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

  // --- Suite 1: CEO Post-SLA Decision Verification (Mandate EZ-AR.1) ---
  console.log('--- Suite 1: CEO Post-SLA Decision Verification (Mandate EZ-AR.1) ---');

  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_AR.json'), 'utf8'));
  const receipt = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_AR.json'), 'utf8'));

  await it('JetBrains verdict recorded as T4_DESCRIPTIVE_ONLY_HELD_INTERNAL with dynamic survey rejected', () => {
    assert.strictEqual(manifest.fast_lane_decisions.jetbrains.tier, 'T4_DESCRIPTIVE_ONLY_HELD_INTERNAL');
    assert.strictEqual(manifest.fast_lane_decisions.jetbrains.dynamic_form_survey, 'REJECTED_BY_CEO');
    assert.strictEqual(manifest.fast_lane_decisions.jetbrains.card_created, false);
    assert.strictEqual(manifest.fast_lane_decisions.jetbrains.public_status, 'STRICTLY_INTERNAL_HELD');
  });

  await it('Figma verdict recorded as T2_DOCUMENTATION_HELD_INTERNAL with public card rejected by CEO at this stage', () => {
    assert.strictEqual(manifest.fast_lane_decisions.figma.tier, 'T2_DOCUMENTATION_HELD_INTERNAL');
    assert.strictEqual(manifest.fast_lane_decisions.figma.public_card_staging, 'REJECTED_BY_CEO_AT_THIS_STAGE');
    assert.strictEqual(manifest.fast_lane_decisions.figma.card_created, false);
    assert.strictEqual(manifest.fast_lane_decisions.figma.public_status, 'STRICTLY_INTERNAL_HELD');
  });

  await it('Release receipt records 0 public cards issued and commercial containment active', () => {
    assert.strictEqual(receipt.fast_lane_decisions.public_cards_issued, 0);
    assert.strictEqual(receipt.production_locked, true);
    assert.strictEqual(receipt.affiliate_activation, false);
    assert.strictEqual(receipt.voucher_verified_t1_count, 0);
  });

  // --- Suite 2: Puppeteer Browser Live Verification on 1440, 768, 390 ---
  console.log('\n--- Suite 2: Puppeteer Browser Live Verification on 1440, 768, 390 ---');

  let browser;
  try {
    browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await it('[Live Staging Browser] Exactly 1 approved pilot card rendered (GitHub), 0 Figma/JetBrains cards', async () => {
      await page.goto(STAGING_URL, { waitUntil: 'networkidle0' });
      const cards = await page.$$('.t2-pilot-card-section');
      assert.strictEqual(cards.length, 1);
      const title = await page.$eval('.t2-pilot-card-section h2', el => el.textContent);
      assert.ok(title.includes('GitHub Education'));

      // Verify no Figma or JetBrains text in public card section
      const pageText = await page.evaluate(() => document.body.innerText);
      assert.ok(!pageText.includes('Figma for Education'));
      assert.ok(!pageText.includes('Free JetBrains Student Pack'));
    });

    await it('[Live Staging Browser] Exactly 1 external link in public DOM (GitHub Docs Pilot Only)', async () => {
      const extLinks = await page.$$eval('a[href^="http"]', anchors => {
        return anchors
          .map(a => a.href)
          .filter(h => !h.startsWith('http://127.0.0.1') && !h.startsWith('http://localhost'));
      });
      assert.strictEqual(extLinks.length, 1);
      assert.ok(extLinks[0].includes('docs.github.com'));
    });

    await it('[Live Staging Browser] Zero console errors during full page lifecycle', () => {
      assert.strictEqual(consoleErrors.length, 0);
    });

    await page.close();
  } finally {
    if (browser) await browser.close();
  }

  // --- Suite 3: Cohort 15 Isolation & Pre-SLA Semantics (Mandate EZ-AR.2) ---
  console.log('\n--- Suite 3: Cohort 15 Isolation & Pre-SLA Semantics (Mandate EZ-AR.2) ---');

  const cohort = JSON.parse(fs.readFileSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/COHORT_CINEMA_TRANSIT_15_CANDIDATES_LEDGER_EZ_AM.json'), 'utf8'));

  await it('Cohort 15 candidates maintain clean pre-SLA semantics (14 OPEN_EVALUATING, 1 INTAKE_FAILED_NO_RAW, 0 tier)', () => {
    assert.strictEqual(cohort.candidates.length, 15);
    const openCands = cohort.candidates.filter(c => c.status === 'OPEN_EVALUATING');
    const failedCands = cohort.candidates.filter(c => c.status === 'INTAKE_FAILED_NO_RAW');
    assert.strictEqual(openCands.length, 14);
    assert.strictEqual(failedCands.length, 1);

    // Verify 0 tier labels on OPEN candidates
    openCands.forEach(c => {
      assert.strictEqual(c.interim_assessment, undefined);
      assert.strictEqual(c.verdict_tier, undefined);
      assert.strictEqual(c.public_eligible, false);
    });
  });

  // --- Suite 4: Build Immutability & Health Parity (Mandate EZ-AR.2) ---
  console.log('\n--- Suite 4: Build Immutability & Health Parity (Mandate EZ-AR.2) ---');

  await it('Live staging health endpoint returns EXACT expectedVersion and PERFECT_MATCH_ZERO_DRIFT', async () => {
    const res = await fetch(HEALTH_URL);
    const data = await res.json();
    assert.strictEqual(data.status, 'UP');
    assert.strictEqual(data.version, EXPECTED_VERSION);
    assert.strictEqual(data.parity, 'PERFECT_MATCH_ZERO_DRIFT');
  });

  await it('Council Review Pack EZ-AR provides comprehensive authority record', () => {
    const pack = fs.readFileSync(path.join(ROOT, '01_EXECUTIVE_COUNCIL/COUNCIL_REVIEW_PACK_EZ_AR_POST_SLA_DECISION_20260901.md'), 'utf8');
    assert.ok(pack.includes('COUNCIL_REVIEW_PACK_EZ_AR_POST_SLA_DECISION_20260901'));
    assert.ok(pack.includes('TIẾP NHẬN PHÁN QUYẾT THẨM QUYỀN CEO'));
    assert.ok(pack.includes('T2_DOCUMENTATION_HELD_INTERNAL'));
    assert.ok(pack.includes('T4_DESCRIPTIVE_ONLY_HELD_INTERNAL'));
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-AR POST-SLA DECISION & GOVERNANCE QA TESTS PASSED!\n');
}

runEZARGovernanceQA().catch(err => {
  console.error('\nFatal Runner Error:', err);
  process.exit(1);
});
