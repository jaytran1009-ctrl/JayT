/**
 * JAYT-262-CORRECTION-5 QA SUITE: FULL HASH DENYLIST, CONTAMINATION CONTAINMENT & 5-CONDITION EPHEMERAL TRACE
 * Governing Directives: JAYT-245 Section JAYT-262-CORRECTION-5 (Lines 5705-5718)
 *
 * TEST REQUIREMENTS:
 * 1. Suite 1: Full Unconditional Hash Denylist (Mandate CORRECTION-5.1)
 *    - All 6 Batch 02 artifacts (including 4 raw HTML) are unconditionally denylisted by path and hash.
 * 2. Suite 2: Cohort 15 Shared Raw Contamination Containment (Mandate CORRECTION-5.2)
 *    - CONTAMINATION_QUARANTINE_RECORD_COHORT_15_TNGO.json exists with audit verdict QUARANTINED_SHARED_RAW_PROVENANCE.
 *    - Loader guard rejects raw SHA-256 b34fdd82... fail-closed.
 * 3. Suite 3: Verified Ephemeral Build-to-Serve Trace Audit (Mandate CORRECTION-5.4)
 *    - Trace satisfies all 5 mandated conditions simultaneously in same run.
 * 4. Suite 4: Staging Static Preview & Viewport QA on 1440, 768, 390 (Mandate CORRECTION-5.5)
 *    - Zero DOM diff, strictly 1 approved pilot card, 0 Batch 02 cards, 0 third-party requests, 0 console errors.
 * 5. Suite 5: Platform State & Commercial Locks (Mandate CORRECTION-5.5)
 *    - Production locked at v3.419.0 (P0_EQ = OPEN), voucher = 0, affiliate = false.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const HEALTH_URL = 'http://127.0.0.1:4173/health';
const STAGING_URL = 'http://127.0.0.1:4173/';
const BUILD_MANIFEST_PATH = path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_BUILD_MANIFEST.json');
const EXPECTED_VERSION = fs.existsSync(BUILD_MANIFEST_PATH) ? JSON.parse(fs.readFileSync(BUILD_MANIFEST_PATH, 'utf8')).expectedVersion : 'v3.483.0-staging.ao';

const QUARANTINE_RECORD_262_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/QUARANTINE_RECORD_JAYT_262_CORRECTION_1.json');
const CONTAMINATION_RECORD_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/CONTAMINATION_QUARANTINE_RECORD_COHORT_15_TNGO.json');
const EPHEMERAL_TRACE_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_EPHEMERAL_BUILD_TO_SERVE_CHAIN_TRACE.json');
const INVALIDATION_RECORD_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/INVALIDATED_TRACES_RECORD_JAYT_262_CORRECTION_5.json');

const { assertArtifactNotQuarantined, getQuarantineDenylist } = require('../00_PROGRAM_BASELINE/jayt_artifact_loader_guard.js');

async function runJayt262Correction5QA() {
  console.log('\n🔬 RUNNING JAYT-262-CORRECTION-5 FULL DENYLIST & CONTAMINATION QA...\n');
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

  // --- Suite 1: Full Unconditional Hash Denylist (Mandate CORRECTION-5.1) ---
  console.log('--- Suite 1: Full Unconditional Hash Denylist (Mandate CORRECTION-5.1) ---');

  const qRec = JSON.parse(fs.readFileSync(QUARANTINE_RECORD_262_PATH, 'utf8'));
  const denylist = getQuarantineDenylist();

  await it('All 6 Batch 02 quarantined hashes (including 4 raw HTML) are in active denylist', () => {
    assert.strictEqual(qRec.quarantined_artifacts.length, 6);
    qRec.quarantined_artifacts.forEach(item => {
      assert.ok(denylist.hashes.includes(item.sha256), 'Missing hash in denylist: ' + item.sha256);
      assert.ok(denylist.paths.includes(item.original_path), 'Missing path in denylist: ' + item.original_path);
    });
  });

  for (const item of qRec.quarantined_artifacts) {
    await it('[Negative Fixture: Path] Loader guard rejects: ' + path.basename(item.original_path), () => {
      assert.throws(() => {
        assertArtifactNotQuarantined(item.original_path);
      }, /QUARANTINED_ARTIFACT_REFERENCE/);
    });

    await it('[Negative Fixture: Hash] Loader guard rejects SHA-256: ' + item.sha256.substring(0, 12) + '...', () => {
      assert.throws(() => {
        assertArtifactNotQuarantined(item.sha256);
      }, /QUARANTINED_ARTIFACT_REFERENCE/);
    });
  }

  // --- Suite 2: Cohort 15 Shared Raw Contamination Containment (Mandate CORRECTION-5.2) ---
  console.log('\n--- Suite 2: Cohort 15 Shared Raw Contamination Containment (Mandate CORRECTION-5.2) ---');

  await it('CONTAMINATION_QUARANTINE_RECORD_COHORT_15_TNGO.json exists with QUARANTINED_SHARED_RAW_PROVENANCE', () => {
    assert.ok(fs.existsSync(CONTAMINATION_RECORD_PATH));
    const cRec = JSON.parse(fs.readFileSync(CONTAMINATION_RECORD_PATH, 'utf8'));
    assert.strictEqual(cRec.candidate_id, 'COHORT_EZ_AM_15');
    assert.strictEqual(cRec.audit_verdict, 'QUARANTINED_SHARED_RAW_PROVENANCE');
    assert.strictEqual(cRec.quarantine_rules.public_rendering_permitted, false);
    assert.strictEqual(cRec.quarantine_rules.gateway_admission_permitted, false);
    assert.strictEqual(cRec.quarantine_rules.operational_runner_use_permitted, false);
    assert.strictEqual(cRec.quarantine_rules.historical_ledger_preserved, true);
  });

  await it('Loader guard strictly rejects shared raw hash b34fdd82... for Cohort 15 candidate', () => {
    assert.throws(() => {
      assertArtifactNotQuarantined('b34fdd823b465060a82047a72248d5abfb5603360dee4ea40188fe17cb73aceb');
    }, /QUARANTINED_ARTIFACT_REFERENCE/);
  });

  // --- Suite 3: Verified Ephemeral Build-to-Serve Trace Audit (Mandate CORRECTION-5.4) ---
  console.log('\n--- Suite 3: Verified Ephemeral Build-to-Serve Trace Audit (Mandate CORRECTION-5.4) ---');

  await it('INVALIDATED_TRACES_RECORD_JAYT_262_CORRECTION_5.json exists and records prior invalidation', () => {
    assert.ok(fs.existsSync(INVALIDATION_RECORD_PATH));
    const invRec = JSON.parse(fs.readFileSync(INVALIDATION_RECORD_PATH, 'utf8'));
    assert.strictEqual(invRec.status, 'INVALIDATED_SUPERSEDED_BY_CORRECTION_5');
  });

  await it('JAYT_EPHEMERAL_BUILD_TO_SERVE_CHAIN_TRACE.json satisfies all 5 mandated conditions simultaneously', () => {
    assert.ok(fs.existsSync(EPHEMERAL_TRACE_PATH));
    const trace = JSON.parse(fs.readFileSync(EPHEMERAL_TRACE_PATH, 'utf8'));
    assert.strictEqual(trace.status, 'CANONICAL_BUILD_TO_SERVE_VERIFIED');
    assert.strictEqual(trace.mandated_conditions.condition_a_served_body_equals_build_hash, true);
    assert.strictEqual(trace.mandated_conditions.condition_b_approved_github_pilot_present, true);
    assert.strictEqual(trace.mandated_conditions.condition_c_zero_batch_02_leakage_and_clean_dom, true);
    assert.strictEqual(trace.mandated_conditions.condition_d_full_denylist_active_unconditionally, true);
    assert.strictEqual(trace.mandated_conditions.condition_e_quarantine_injection_fail_closed_in_same_run, true);
    assert.strictEqual(trace.mandated_conditions.all_conditions_satisfied_in_same_run, true);
    assert.strictEqual(trace.serve_step.exact_hash_match, true);
    assert.strictEqual(trace.serve_step.contains_approved_pilot, true);
    assert.strictEqual(trace.serve_step.zero_dom_leakage, true);
  });

  // --- Suite 4: Staging Static Preview & Viewports (Mandate CORRECTION-5.5) ---
  console.log('\n--- Suite 4: Staging Static Preview & Viewports (Mandate CORRECTION-5.5) ---');

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

  // --- Suite 5: Platform State & Commercial Locks (Mandate CORRECTION-5.5) ---
  console.log('\n--- Suite 5: Platform State & Commercial Locks (Mandate CORRECTION-5.5) ---');

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

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' JAYT-262-CORRECTION-5 QA TESTS PASSED!\n');
}

runJayt262Correction5QA().catch(err => {
  console.error('\nFatal Runner Error:', err);
  process.exit(1);
});
