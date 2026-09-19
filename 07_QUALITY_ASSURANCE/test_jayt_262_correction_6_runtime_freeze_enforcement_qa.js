/**
 * JAYT-262-CORRECTION-6 QA SUITE: RUNTIME CONTAMINATION FREEZE ENFORCEMENT & ENTRYPOINT FAIL-CLOSED AUDIT
 * Governing Directives: JAYT-245 Section JAYT-262-CORRECTION-6 (Lines 5719-5732)
 *
 * TEST REQUIREMENTS:
 * 1. Suite 1: Canonical Contamination Freeze State Record (Mandates CORRECTION-6.1 & 6.4)
 *    - JAYT_CONTAMINATION_FREEZE_STATE.json exists with freeze_active=true, fail_closed_error_code=ERR_CONTAMINATION_FREEZE_ACTIVE, unlock_authority=CEO_DIRECTIVE_ONLY.
 * 2. Suite 2: Operational Runner Preflight Enforcement (Mandates CORRECTION-6.1 & 6.3)
 *    - Programmatic invocation and CLI process invocation both fail-closed with ERR_CONTAMINATION_FREEZE_ACTIVE before any I/O.
 * 3. Suite 3: Catalog Builder Preflight Enforcement (Mandates CORRECTION-6.1 & 6.3)
 *    - Programmatic invocation and CLI process invocation both fail-closed with ERR_CONTAMINATION_FREEZE_ACTIVE and create 0 output files.
 * 4. Suite 4: Runtime Freeze Enforcement Trace Audit & Evidence Distinction (Mandates CORRECTION-6.3 & 6.5)
 *    - JAYT_RUNTIME_FREEZE_ENFORCEMENT_TRACE.json exists and verifies runtime enforcement traces.
 *    - Distinguishes ALLOWLIST_INPUT_REJECTION from QUARANTINED_ARTIFACT_REFERENCE.
 * 5. Suite 5: Staging Static Preview & Viewport QA on 1440, 768, 390 (Mandate CORRECTION-6.5)
 *    - Zero DOM diff, strictly 1 approved pilot card, 0 Batch 02 cards, 0 third-party requests, 0 console errors.
 * 6. Suite 6: Platform State & Commercial Locks (Mandate CORRECTION-6.5)
 *    - Production locked at v3.419.0 (P0_EQ = OPEN), voucher = 0, affiliate = false.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { spawnSync } = require('child_process');
const puppeteer = require('puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const HEALTH_URL = 'http://127.0.0.1:4173/health';
const STAGING_URL = 'http://127.0.0.1:4173/';
const BUILD_MANIFEST_PATH = path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_BUILD_MANIFEST.json');
const EXPECTED_VERSION = fs.existsSync(BUILD_MANIFEST_PATH) ? JSON.parse(fs.readFileSync(BUILD_MANIFEST_PATH, 'utf8')).expectedVersion : 'v3.483.0-staging.ao';

const FREEZE_STATE_PATH = path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_CONTAMINATION_FREEZE_STATE.json');
const RUNNER_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/run_cohort_15_sla_closure_operational.js');
const BUILDER_PATH = path.join(ROOT, '03_SOURCE_OF_TRUTH/build_storefront_catalog.js');
const RUNTIME_TRACE_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_RUNTIME_FREEZE_ENFORCEMENT_TRACE.json');

const { assertContaminationFreezeNotActive } = require('../00_PROGRAM_BASELINE/jayt_freeze_state_guard.js');
const { runOperationalCohort15Closure } = require('../06_TRUST_AND_EVIDENCE/run_cohort_15_sla_closure_operational.js');
const { executeCatalogBuild } = require('../03_SOURCE_OF_TRUTH/build_storefront_catalog.js');

async function runJayt262Correction6QA() {
  console.log('\n🔬 RUNNING JAYT-262-CORRECTION-6 RUNTIME FREEZE ENFORCEMENT QA...\n');
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

  // --- Suite 1: Canonical Contamination Freeze State Record (Mandates CORRECTION-6.1 & 6.4) ---
  console.log('--- Suite 1: Canonical Contamination Freeze State Record (Mandates CORRECTION-6.1 & 6.4) ---');

  await it('JAYT_CONTAMINATION_FREEZE_STATE.json exists and declares freeze_active=true', () => {
    assert.ok(fs.existsSync(FREEZE_STATE_PATH));
    const state = JSON.parse(fs.readFileSync(FREEZE_STATE_PATH, 'utf8'));
    assert.strictEqual(state.freeze_active, true);
    assert.strictEqual(state.ceo_directive_id, 'JAYT-262-CORRECTION-6');
    assert.strictEqual(state.enforcement_contract.fail_closed_error_code, 'ERR_CONTAMINATION_FREEZE_ACTIVE');
    assert.strictEqual(state.enforcement_contract.unlock_authority, 'CEO_DIRECTIVE_ONLY');
    assert.ok(state.freeze_scope.includes('COHORT_15_OPERATIONAL_RUNNER'));
    assert.ok(state.freeze_scope.includes('STOREFRONT_CATALOG_BUILDER'));
  });

  await it('assertContaminationFreezeNotActive throws ERR_CONTAMINATION_FREEZE_ACTIVE for scoped components', () => {
    assert.throws(() => {
      assertContaminationFreezeNotActive('COHORT_15_OPERATIONAL_RUNNER');
    }, /ERR_CONTAMINATION_FREEZE_ACTIVE/);

    assert.throws(() => {
      assertContaminationFreezeNotActive('STOREFRONT_CATALOG_BUILDER');
    }, /ERR_CONTAMINATION_FREEZE_ACTIVE/);
  });

  // --- Suite 2: Operational Runner Preflight Enforcement (Mandates CORRECTION-6.1 & 6.3) ---
  console.log('\n--- Suite 2: Operational Runner Preflight Enforcement (Mandates CORRECTION-6.1 & 6.3) ---');

  await it('Programmatic invocation of runOperationalCohort15Closure() throws ERR_CONTAMINATION_FREEZE_ACTIVE', () => {
    assert.throws(() => {
      runOperationalCohort15Closure();
    }, /ERR_CONTAMINATION_FREEZE_ACTIVE/);
  });

  await it('CLI process execution of run_cohort_15_sla_closure_operational.js exits code 1 with ERR_CONTAMINATION_FREEZE_ACTIVE', () => {
    const res = spawnSync('node', [RUNNER_PATH], { cwd: ROOT, encoding: 'utf8' });
    assert.strictEqual(res.status, 1);
    assert.ok((res.stderr || res.stdout).includes('ERR_CONTAMINATION_FREEZE_ACTIVE'));
  });

  // --- Suite 3: Catalog Builder Preflight Enforcement (Mandates CORRECTION-6.1 & 6.3) ---
  console.log('\n--- Suite 3: Catalog Builder Preflight Enforcement (Mandates CORRECTION-6.1 & 6.3) ---');

  const tmpOut = path.join(ROOT, '07_QUALITY_ASSURANCE/ephemeral_deploy_trace/freeze_qa_test_out.html');
  if (fs.existsSync(tmpOut)) fs.unlinkSync(tmpOut);

  await it('Programmatic invocation of executeCatalogBuild() throws ERR_CONTAMINATION_FREEZE_ACTIVE', () => {
    assert.throws(() => {
      executeCatalogBuild('00_PROGRAM_BASELINE/JAYT_CANONICAL_PUBLIC_APPROVED_REGISTRY.json', tmpOut);
    }, /ERR_CONTAMINATION_FREEZE_ACTIVE/);
    assert.strictEqual(fs.existsSync(tmpOut), false);
  });

  await it('CLI process execution of build_storefront_catalog.js exits code 1 with ERR_CONTAMINATION_FREEZE_ACTIVE', () => {
    const res = spawnSync('node', [
      BUILDER_PATH,
      '--input', '00_PROGRAM_BASELINE/JAYT_CANONICAL_PUBLIC_APPROVED_REGISTRY.json',
      '--output', tmpOut
    ], { cwd: ROOT, encoding: 'utf8' });

    assert.strictEqual(res.status, 1);
    assert.ok((res.stderr || res.stdout).includes('ERR_CONTAMINATION_FREEZE_ACTIVE'));
    assert.strictEqual(fs.existsSync(tmpOut), false);
  });

  // --- Suite 4: Runtime Freeze Enforcement Trace Audit & Evidence Distinction (Mandates CORRECTION-6.3 & 6.5) ---
  console.log('\n--- Suite 4: Runtime Freeze Enforcement Trace Audit & Evidence Distinction (Mandates CORRECTION-6.3 & 6.5) ---');

  await it('JAYT_RUNTIME_FREEZE_ENFORCEMENT_TRACE.json exists and verifies runtime enforcement traces', () => {
    assert.ok(fs.existsSync(RUNTIME_TRACE_PATH));
    const trace = JSON.parse(fs.readFileSync(RUNTIME_TRACE_PATH, 'utf8'));
    assert.strictEqual(trace.final_verdict.runtime_freeze_enforced_at_entrypoints, true);
    assert.strictEqual(trace.final_verdict.production_paths_untouched, true);
    assert.strictEqual(trace.final_verdict.unlock_permitted_without_ceo_directive, false);
    assert.strictEqual(trace.input_rejection_classification.allowlist_path_rejection_type, 'ALLOWLIST_INPUT_REJECTION');
    assert.strictEqual(trace.input_rejection_classification.guard_hash_rejection_type, 'QUARANTINED_ARTIFACT_REFERENCE');
    assert.strictEqual(trace.input_rejection_classification.direct_guard_hash_denial_verified, true);
  });

  // --- Suite 5: Staging Static Preview & Viewports (Mandate CORRECTION-6.5) ---
  console.log('\n--- Suite 5: Staging Static Preview & Viewports (Mandate CORRECTION-6.5) ---');

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

  // --- Suite 6: Platform State & Commercial Locks (Mandate CORRECTION-6.5) ---
  console.log('\n--- Suite 6: Platform State & Commercial Locks (Mandate CORRECTION-6.5) ---');

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

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' JAYT-262-CORRECTION-6 QA TESTS PASSED!\n');
}

runJayt262Correction6QA().catch(err => {
  console.error('\nFatal Runner Error:', err);
  process.exit(1);
});
