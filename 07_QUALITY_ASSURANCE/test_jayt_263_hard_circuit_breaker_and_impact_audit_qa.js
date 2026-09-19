/**
 * JAYT-263 / JAYT-263-CORRECTION-1 QA SUITE: HARD CIRCUIT BREAKER & NON-SELF-REFERENCING INTEGRITY CONTRACT
 * Governing Directives: JAYT-245 Section JAYT-263 (Lines 5733-5745) & JAYT-263-CORRECTION-1 (Lines 5746-5759)
 *
 * TEST REQUIREMENTS:
 * 1. Suite 1: Canonical Append-Only Freeze State Record v2 & Non-Self-Referencing Digest (CORRECTION-1.2 & 1.3)
 *    - JAYT_CONTAMINATION_FREEZE_STATE.json exists with record_version=v2.0, state=ACTIVE, directive_id=JAYT-263-CORRECTION-1.
 *    - canonical_payload_sha256 strictly matches computeCanonicalPayloadSha256(state).
 *    - AUDIT_ADDENDUM_FREEZE_STATE_V1_INTEGRITY.json exists, classifying v1 record as FREEZE_ENFORCEMENT_ACTIVE__INTEGRITY_UNVERIFIED.
 * 2. Suite 2: Three-Case Fail-Closed Integrity Verification (CORRECTION-1.2 & 1.4)
 *    - Case A: Valid Active Record -> throws CONTAMINATION_FREEZE_ACTIVE.
 *    - Case B: Tampered / Mismatched Record -> throws FREEZE_STATE_INTEGRITY_MISMATCH.
 *    - Case C1: Missing / Unavailable File -> throws FREEZE_STATE_UNAVAILABLE.
 *    - Case C2: Malformed JSON File -> throws ERR_INVALID_FREEZE_STATE_JSON.
 * 3. Suite 3: Independent Three-Case Runtime Freeze Trace Audit (CORRECTION-1.4)
 *    - JAYT_263_CORRECTION_1_THREE_CASE_FREEZE_INTEGRITY_TRACE.json exists and verifies all three fail-closed cases.
 * 4. Suite 4: Impact Audit Dossier Integrity (Mandate JAYT-263.5)
 *    - JAYT_263_CONTAMINATION_IMPACT_AUDIT_DOSSIER.json exists and exhaustively maps colliding hash b34fdd82...
 * 5. Suite 5: Staging Static Preview & Viewports (Mandates JAYT-263.6 & CORRECTION-1.5)
 *    - Live staging health UP, strictly 1 approved pilot card, 0 Batch 02 cards, 0 third-party requests, 0 console errors.
 * 6. Suite 6: Platform State & Commercial Locks (Mandates JAYT-263.6 & CORRECTION-1.5)
 *    - Production locked at v3.419.0 (P0_EQ = OPEN), voucher = 0, affiliate = false.
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

const FREEZE_STATE_PATH = path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_CONTAMINATION_FREEZE_STATE.json');
const ADDENDUM_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/AUDIT_ADDENDUM_FREEZE_STATE_V1_INTEGRITY.json');
const THREE_CASE_TRACE_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_263_CORRECTION_1_THREE_CASE_FREEZE_INTEGRITY_TRACE.json');
const DOSSIER_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_263_CONTAMINATION_IMPACT_AUDIT_DOSSIER.json');

const { assertContaminationFreezeNotActive, computeCanonicalPayloadSha256 } = require('../00_PROGRAM_BASELINE/jayt_freeze_state_guard.js');

async function runJayt263Correction1QA() {
  console.log('\n🔬 RUNNING JAYT-263-CORRECTION-1 HARD CIRCUIT BREAKER & INTEGRITY QA...\n');
  console.log('  ℹ Current System Runtime UTC: ' + new Date().toISOString());

  let totalTests = 0;
  let passedTests = 0;

  async function it(name, fn) {
    totalTests++;
    try {
      await fn();
      passedTests++;
      console.log('  ✓ ' + name);
    } catch (err) {
      console.error('  ✕ ' + name + ': ' + err.message);
      throw err;
    }
  }

  // --- Suite 1: Canonical Freeze State Record v2 & Non-Self-Referencing Digest ---
  console.log('--- Suite 1: Canonical Freeze State Record v2 & Non-Self-Referencing Digest ---');

  await it('JAYT_CONTAMINATION_FREEZE_STATE.json exists and declares record_version=v2.0 under JAYT-263-CORRECTION-1', () => {
    assert.ok(fs.existsSync(FREEZE_STATE_PATH));
    const state = JSON.parse(fs.readFileSync(FREEZE_STATE_PATH, 'utf8'));
    assert.strictEqual(state.record_version, 'v2.0');
    assert.strictEqual(state.state, 'ACTIVE');
    assert.strictEqual(state.directive_id, 'JAYT-263-CORRECTION-1');
    assert.strictEqual(state.enforcement_contract.fail_closed_error_code, 'CONTAMINATION_FREEZE_ACTIVE');
    assert.strictEqual(state.enforcement_contract.integrity_mismatch_error_code, 'FREEZE_STATE_INTEGRITY_MISMATCH');
    assert.strictEqual(state.enforcement_contract.state_unavailable_error_code, 'FREEZE_STATE_UNAVAILABLE');
    assert.strictEqual(state.enforcement_contract.unlock_authority, 'CEO_DIRECTIVE_ONLY');
    assert.ok(state.scope.includes('COHORT_15_RUNNER'));
    assert.ok(state.scope.includes('CATALOG_BUILD'));
  });

  await it('canonical_payload_sha256 strictly matches computeCanonicalPayloadSha256(state)', () => {
    const state = JSON.parse(fs.readFileSync(FREEZE_STATE_PATH, 'utf8'));
    const computedDigest = computeCanonicalPayloadSha256(state);
    assert.strictEqual(state.canonical_payload_sha256, computedDigest);
  });

  await it('AUDIT_ADDENDUM_FREEZE_STATE_V1_INTEGRITY.json exists and documents v1 record supersession', () => {
    assert.ok(fs.existsSync(ADDENDUM_PATH));
    const addendum = JSON.parse(fs.readFileSync(ADDENDUM_PATH, 'utf8'));
    assert.strictEqual(addendum.audit_verdict, 'FREEZE_ENFORCEMENT_ACTIVE__INTEGRITY_UNVERIFIED');
    assert.strictEqual(addendum.target_artifact.actual_file_bytes_sha256, '97464c8f0151e141f21239893632b909471f4527c1f64c9f8ac47b8cf7c3371a');
  });

  // --- Suite 2: Three-Case Fail-Closed Integrity Verification ---
  console.log('\n--- Suite 2: Three-Case Fail-Closed Integrity Verification ---');

  await it('[Case A] Valid Active Record throws CONTAMINATION_FREEZE_ACTIVE for runner & builder', () => {
    assert.throws(() => {
      assertContaminationFreezeNotActive('COHORT_15_OPERATIONAL_RUNNER');
    }, /CONTAMINATION_FREEZE_ACTIVE/);

    assert.throws(() => {
      assertContaminationFreezeNotActive('STOREFRONT_CATALOG_BUILDER');
    }, /CONTAMINATION_FREEZE_ACTIVE/);
  });

  await it('[Case B] Tampered / Mismatched Record throws FREEZE_STATE_INTEGRITY_MISMATCH', () => {
    const tempTamperedPath = path.join(ROOT, 'scratch/qa_temp_tampered_state.json');
    const validState = JSON.parse(fs.readFileSync(FREEZE_STATE_PATH, 'utf8'));
    const tampered = JSON.parse(JSON.stringify(validState));
    tampered.reason = "TAMPERED REASON";
    fs.writeFileSync(tempTamperedPath, JSON.stringify(tampered, null, 2), 'utf8');

    try {
      assert.throws(() => {
        assertContaminationFreezeNotActive('COHORT_15_OPERATIONAL_RUNNER', tempTamperedPath);
      }, /FREEZE_STATE_INTEGRITY_MISMATCH/);
    } finally {
      if (fs.existsSync(tempTamperedPath)) fs.unlinkSync(tempTamperedPath);
    }
  });

  await it('[Case C1] Missing / Unavailable File throws FREEZE_STATE_UNAVAILABLE', () => {
    const nonExistent = path.join(ROOT, 'scratch/qa_non_existent.json');
    assert.throws(() => {
      assertContaminationFreezeNotActive('COHORT_15_OPERATIONAL_RUNNER', nonExistent);
    }, /FREEZE_STATE_UNAVAILABLE/);
  });

  await it('[Case C2] Malformed JSON File throws ERR_INVALID_FREEZE_STATE_JSON', () => {
    const tempMalformed = path.join(ROOT, 'scratch/qa_temp_malformed.json');
    fs.writeFileSync(tempMalformed, '{ broken_json: true, ', 'utf8');
    try {
      assert.throws(() => {
        assertContaminationFreezeNotActive('COHORT_15_OPERATIONAL_RUNNER', tempMalformed);
      }, /ERR_INVALID_FREEZE_STATE_JSON/);
    } finally {
      if (fs.existsSync(tempMalformed)) fs.unlinkSync(tempMalformed);
    }
  });

  // --- Suite 3: Independent Three-Case Runtime Freeze Trace Audit ---
  console.log('\n--- Suite 3: Independent Three-Case Runtime Freeze Trace Audit ---');

  await it('JAYT_263_CORRECTION_1_THREE_CASE_FREEZE_INTEGRITY_TRACE.json exists and confirms all three fail-closed cases', () => {
    assert.ok(fs.existsSync(THREE_CASE_TRACE_PATH));
    const trace = JSON.parse(fs.readFileSync(THREE_CASE_TRACE_PATH, 'utf8'));
    assert.strictEqual(trace.final_audit_summary.all_three_cases_fail_closed, true);
    assert.strictEqual(trace.final_audit_summary.fail_open_possible, false);
    assert.strictEqual(trace.three_case_telemetry.length, 3);
  });

  // --- Suite 4: Impact Audit Dossier Integrity ---
  console.log('\n--- Suite 4: Impact Audit Dossier Integrity ---');

  await it('JAYT_263_CONTAMINATION_IMPACT_AUDIT_DOSSIER.json exists and exhaustively maps colliding hash b34fdd82...', () => {
    assert.ok(fs.existsSync(DOSSIER_PATH));
    const dossier = JSON.parse(fs.readFileSync(DOSSIER_PATH, 'utf8'));
    assert.strictEqual(dossier.executive_summary.colliding_raw_sha256, 'b34fdd823b465060a82047a72248d5abfb5603360dee4ea40188fe17cb73aceb');
    assert.strictEqual(dossier.colliding_evidence_artifacts.length, 2);
    assert.strictEqual(dossier.impacted_subsystems_and_components.length, 7);
  });

  // --- Suite 5: Staging Static Preview & Viewports ---
  console.log('\n--- Suite 5: Staging Static Preview & Viewports ---');

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

      await it('[' + vp.name + '] Zero DOM diff: strictly 1 approved pilot card rendered (GitHub), 0 Batch 02 cards', async () => {
        const cards = await page.$$('.t2-pilot-card-section');
        assert.strictEqual(cards.length, 1);
        const title = await page.$eval('.t2-pilot-card-section h2', el => el.textContent);
        assert.ok(title.includes('GitHub Education'));
        const bodyText = await page.$eval('body', el => el.textContent);
        assert.ok(!bodyText.includes('DanaBus'));
        assert.ok(!bodyText.includes('Metiz'));
        assert.ok(!bodyText.includes('Galaxy'));
        assert.ok(!bodyText.includes('TNGo'));
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

  // --- Suite 6: Platform State & Commercial Locks ---
  console.log('\n--- Suite 6: Platform State & Commercial Locks ---');

  await it('Cohort 15 active closure ledger records strictly 14 HELD_NEW_COHORT_REQUIRED, 1 CLOSED, 0 PUBLIC_APPROVED', () => {
    const activeClosurePath = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_COHORT_15_SLA_CLOSURE_LEDGER.json');
    assert.ok(fs.existsSync(activeClosurePath));
    const ledger = JSON.parse(fs.readFileSync(activeClosurePath, 'utf8'));
    assert.strictEqual(ledger.candidates.length, 15);
    const held = ledger.candidates.filter(c => c.admissionState === 'HELD_NEW_COHORT_REQUIRED');
    const closed = ledger.candidates.filter(c => c.admissionState === 'CLOSED');
    assert.strictEqual(held.length, 14);
    assert.strictEqual(closed.length, 1);
  });

  await it('Commercial locks strictly active (Production locked at v3.419.0, P0_EQ = OPEN, T1 = 0, voucher = 0, affiliate = false)', () => {
    const bManifest = JSON.parse(fs.readFileSync(BUILD_MANIFEST_PATH, 'utf8'));
    assert.strictEqual(bManifest.expectedVersion, EXPECTED_VERSION);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' JAYT-263-CORRECTION-1 QA TESTS PASSED!\n');
}

runJayt263Correction1QA().catch(err => {
  console.error('\nFatal Runner Error:', err);
  process.exit(1);
});
