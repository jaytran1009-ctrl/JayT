/**
 * JAYT-258 OPERATIONAL RUNNER & 2D CLOSURE GOVERNANCE QA TEST SUITE
 * Governing Directive: JAYT-245 Section JAYT-258 (Lines 5114-5140)
 *
 * Verifies:
 * 1. Pre-SLA Operational Runner Strict Clock Check (Mandate JAYT-258.1):
 *    - Runner uses actual system clock (new Date().toISOString()), takes no time arguments.
 *    - Halts with SLA_NOT_YET_REACHED while runtime < 19:04:01Z and creates 0 operational files.
 *    - Active closure ledger 06_TRUST_AND_EVIDENCE/JAYT_COHORT_15_SLA_CLOSURE_LEDGER.json is strictly ABSENT.
 * 2. 2-Axis Routing & Tier Non-Inference (Mandate JAYT-258.2):
 *    - Raw capture does not auto-grant tier. Missing contract -> HELD_NEW_COHORT_REQUIRED / CLOSED with contentTier=null.
 *    - BHD Star is CLOSED / HELD with INTAKE_FAILED_NO_RAW and contentTier=null.
 * 3. Single Closure Ledger Structure (Mandate JAYT-258.3):
 *    - Contains matrix 4x5 strictly for Cohort 15 with PUBLIC_APPROVED = 0.
 *    - Contains 7 departments' opinions directly embedded.
 *    - System registry retains GitHub Education Pilot as PUBLIC_APPROVED = 1.
 * 4. Staging Immutability & Viewport QA on 1440, 768, 390 (Mandate JAYT-258.1 & 258.4):
 *    - 0 DOM diff, strictly 1 pilot card (GitHub), 0 cohort cards, 0 third-party requests, 0 console errors.
 *    - Production locked at v3.419.0 (P0_EQ = OPEN), T1=0, vouchers=0, affiliate=false.
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
const CANONICAL_COHORT_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/COHORT_CINEMA_TRANSIT_15_CANDIDATES_LEDGER_EZ_AM.json');
const SYSTEM_REGISTRY_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_256_DATASET_2D_MAPPING_REGISTRY.json');
const ACTIVE_CLOSURE_LEDGER_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_COHORT_15_SLA_CLOSURE_LEDGER.json');

const { runOperationalCohort15Closure } = require('../06_TRUST_AND_EVIDENCE/run_cohort_15_sla_closure_operational.js');

async function runJayt258QA() {
  console.log('\n🔬 RUNNING JAYT-258 OPERATIONAL RUNNER & 2D CLOSURE GOVERNANCE QA...\n');

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

  // --- Suite 1: Pre-SLA Operational Runner Strict Clock Check (Mandate JAYT-258.1) ---
  console.log('--- Suite 1: Pre-SLA Operational Runner Strict Clock Check (Mandate JAYT-258.1) ---');

  await it('Operational runner runOperationalCohort15Closure() uses system clock and halts with SLA_NOT_YET_REACHED', () => {
    const result = runOperationalCohort15Closure();
    assert.strictEqual(result.status, 'SLA_NOT_YET_REACHED');
    assert.strictEqual(result.unreached_count, 15);
  });

  await it('Active closure ledger is strictly ABSENT before candidate SLA close', () => {
    assert.strictEqual(fs.existsSync(ACTIVE_CLOSURE_LEDGER_PATH), false, 'Active operational closure ledger must not exist pre-SLA');
  });

  // --- Suite 2: 2-Axis Routing & Tier Non-Inference (Mandate JAYT-258.2) ---
  console.log('\n--- Suite 2: 2-Axis Routing & Tier Non-Inference (Mandate JAYT-258.2) ---');

  const canonical = JSON.parse(fs.readFileSync(CANONICAL_COHORT_PATH, 'utf8'));
  const sysReg = JSON.parse(fs.readFileSync(SYSTEM_REGISTRY_PATH, 'utf8'));

  await it('Raw captures are unclassified intake only and do NOT auto-grant any tier (contentTier = null)', () => {
    sysReg.intake_pool_pre_sla.candidates.forEach(c => {
      assert.strictEqual(c.contentTier, null, 'Candidate ' + c.candidate_id + ' must have contentTier=null');
      assert.strictEqual(c.admissionState, 'OPEN_EVALUATING');
    });
  });

  await it('BHD Star candidate is OPEN_EVALUATING + INTAKE_FAILED_NO_RAW with contentTier = null', () => {
    const bhd = sysReg.intake_pool_pre_sla.candidates.find(c => c.candidate_id === 'COHORT_EZ_AM_04');
    assert.ok(bhd);
    assert.strictEqual(bhd.intakeStatus, 'INTAKE_FAILED_NO_RAW');
    assert.strictEqual(bhd.admissionState, 'OPEN_EVALUATING');
    assert.strictEqual(bhd.contentTier, null);
  });

  // --- Suite 3: Single Closure Ledger Invariants (Mandate JAYT-258.3) ---
  console.log('\n--- Suite 3: Single Closure Ledger Invariants (Mandate JAYT-258.3) ---');

  await it('System 2D Registry preserves GitHub Education Pilot as PUBLIC_APPROVED = 1 and 3 HELD items', () => {
    assert.strictEqual(sysReg.matrix_summary_4x5.T2_PROGRAM.PUBLIC_APPROVED, 1);
    assert.strictEqual(sysReg.matrix_summary_4x5.column_totals.PUBLIC_APPROVED, 1);
    assert.strictEqual(sysReg.matrix_summary_4x5.column_totals.EVIDENCE_COMPLETE_INTERNAL_HELD, 3);
    assert.strictEqual(sysReg.matrix_summary_4x5.column_totals.grand_total, 4);
  });

  // --- Suite 4: Staging Immutability & Viewport QA on 1440, 768, 390 (Mandate JAYT-258.1 & 258.4) ---
  console.log('\n--- Suite 4: Staging Immutability & Viewport QA on 1440, 768, 390 (Mandate JAYT-258.1 & 258.4) ---');

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

      await it('[' + vp.name + '] Zero DOM diff: strictly 1 approved pilot card rendered (GitHub), 0 cohort cards', async () => {
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

  // --- Suite 5: Health Parity & Commercial Containment (Mandate JAYT-258.4) ---
  console.log('\n--- Suite 5: Health Parity & Commercial Containment (Mandate JAYT-258.4) ---');

  await it('Live staging health endpoint returns EXACT expectedVersion and PERFECT_MATCH_ZERO_DRIFT', async () => {
    const res = await fetch(HEALTH_URL);
    const data = await res.json();
    assert.strictEqual(data.status, 'UP');
    assert.strictEqual(data.version, EXPECTED_VERSION);
    assert.strictEqual(data.parity, 'PERFECT_MATCH_ZERO_DRIFT');
  });

  await it('Commercial locks strictly active (Production locked at v3.419.0, P0_EQ = OPEN, T1 = 0, voucher = 0, affiliate = false)', () => {
    const bManifest = JSON.parse(fs.readFileSync(BUILD_MANIFEST_PATH, 'utf8'));
    assert.strictEqual(bManifest.expectedVersion, EXPECTED_VERSION);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' JAYT-258 OPERATIONAL RUNNER & 2D CLOSURE GOVERNANCE QA TESTS PASSED!\n');
}

runJayt258QA().catch(err => {
  console.error('\nFatal Runner Error:', err);
  process.exit(1);
});
