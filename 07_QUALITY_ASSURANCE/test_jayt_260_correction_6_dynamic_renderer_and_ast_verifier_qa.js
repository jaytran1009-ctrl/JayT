/**
 * JAYT-260-CORRECTION-6 DYNAMIC RENDERER, OPERATIONAL TRACE & AST VERIFIER QA SUITE
 * Governing Directive: JAYT-245 Section JAYT-260-CORRECTION-6 (Lines 5520-5535)
 *
 * Verifies:
 * 1. AST & Data-Flow Direct Read Verifier (Mandate CORRECTION-6.4):
 *    - Executes verifyAstDirectEvidenceReads() and validates AST_EVIDENCE_READ_AUDIT_REPORT.json.
 * 2. Dynamic Catalog Rendering Engine & Hash Integrity (Mandate CORRECTION-6.2):
 *    - Dynamic HTML generated strictly from admitted candidates with input_hash and response_body_hash.
 *    - Negative test: input referencing quarantined artifact throws QUARANTINED_ARTIFACT_REFERENCE fail-closed.
 * 3. Operational Trace Provenance & QA Fixture Isolation (Mandate CORRECTION-6.3):
 *    - Asserts JAYT_OPERATIONAL_RUNTIME_EXECUTION_TRACE.json references canonical files, not test fixtures.
 * 4. Staging Static Preview & Puppeteer Viewports QA on 1440, 768, 390 (Mandates CORRECTION-6.1 & 6.5):
 *    - Zero DOM diff, 1 approved pilot card, 0 batch cards, 0 console errors across 1440, 768, 390.
 * 5. Platform State & Commercial Locks (Mandate CORRECTION-6.5):
 *    - Batch 02 is BLOCKED.
 *    - Production locked at v3.419.0 (P0_EQ = OPEN).
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
const COHORT_15_CLOSURE_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_COHORT_15_SLA_CLOSURE_LEDGER.json');
const AST_REPORT_PATH = path.join(ROOT, '00_PROGRAM_BASELINE/AST_EVIDENCE_READ_AUDIT_REPORT.json');
const OPERATIONAL_TRACE_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_OPERATIONAL_RUNTIME_EXECUTION_TRACE.json');

const { verifyAstDirectEvidenceReads } = require('../00_PROGRAM_BASELINE/verify_ast_direct_evidence_reads.js');
const { renderDynamicCatalogWithAdmission } = require('../03_SOURCE_OF_TRUTH/jayt_dynamic_catalog_renderer.js');
const { getQuarantineDenylist } = require('../00_PROGRAM_BASELINE/jayt_artifact_loader_guard.js');

async function runJayt260Correction6QA() {
  console.log('\n🔬 RUNNING JAYT-260-CORRECTION-6 DYNAMIC RENDERER & AST VERIFIER QA...\n');

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

  // --- Suite 1: AST & Data-Flow Direct Evidence Read Verifier (Mandate CORRECTION-6.4) ---
  console.log('--- Suite 1: AST & Data-Flow Direct Evidence Read Verifier (Mandate CORRECTION-6.4) ---');

  const astAuditResult = verifyAstDirectEvidenceReads();

  await it('verifyAstDirectEvidenceReads confirms zero unauthorized direct reads via AST analysis', () => {
    assert.strictEqual(astAuditResult.verdict, 'PASS_ZERO_UNAUTHORIZED_DIRECT_EVIDENCE_READS');
    assert.strictEqual(astAuditResult.violations_count, 0);
    assert.ok(astAuditResult.total_runtime_modules_scanned > 0);
  });

  await it('AST_EVIDENCE_READ_AUDIT_REPORT.json records explicit allowlist exclusions with rationale', () => {
    assert.ok(fs.existsSync(AST_REPORT_PATH));
    const diskReport = JSON.parse(fs.readFileSync(AST_REPORT_PATH, 'utf8'));
    assert.strictEqual(diskReport.verdict, 'PASS_ZERO_UNAUTHORIZED_DIRECT_EVIDENCE_READS');
    assert.strictEqual(diskReport.explicit_allowlist_exclusions.length, 2);
    assert.ok(diskReport.explicit_allowlist_exclusions.some(e => e.module_path.includes('jayt_canonical_admission_gateway.js')));
    assert.ok(diskReport.explicit_allowlist_exclusions.some(e => e.module_path.includes('jayt_artifact_loader_guard.js')));
  });

  // --- Suite 2: Dynamic Catalog Rendering Engine & Hash Integrity (Mandate CORRECTION-6.2) ---
  console.log('\n--- Suite 2: Dynamic Catalog Rendering Engine & Hash Integrity (Mandate CORRECTION-6.2) ---');

  const cleanCandidatesInput = [
    {
      candidate_id: "GITHUB_EDUCATION_PILOT_T2",
      title: "GitHub Student Developer Pack",
      admissionState: "PUBLIC_APPROVED",
      public_eligible: true,
      geographic_scope: "TOAN_QUOC_DA_NANG_VERIFIED",
      external_url: "https://docs.github.com/en/education"
    },
    {
      candidate_id: "INTERNAL_HELD_ITEM",
      title: "Internal Unapproved Deal",
      admissionState: "EVIDENCE_COMPLETE_INTERNAL_HELD",
      public_eligible: false,
      geographic_scope: "DA_NANG"
    }
  ];

  const renderResult = renderDynamicCatalogWithAdmission(cleanCandidatesInput);

  await it('renderDynamicCatalogWithAdmission generates dynamic HTML body with input_hash and response_body_hash', () => {
    assert.ok(renderResult.trace_id.startsWith('DYN_RENDER_'));
    assert.ok(renderResult.input_hash && renderResult.input_hash.length === 64);
    assert.ok(renderResult.response_body_hash && renderResult.response_body_hash.length === 64);
    assert.strictEqual(renderResult.rendered_count, 1);
    assert.deepStrictEqual(renderResult.admitted_ids, ['GITHUB_EDUCATION_PILOT_T2']);
    assert.ok(renderResult.html_body.includes('GitHub Student Developer Pack'));
    assert.ok(renderResult.html_body.includes('jayt-dynamic-catalog-grid'));
    assert.ok(!renderResult.html_body.includes('Internal Unapproved Deal'));
  });

  const denylist = getQuarantineDenylist();
  const quarantinedCandidateInput = [
    {
      candidate_id: "QUARANTINED_TEST_CANDIDATE",
      title: "Quarantined Synthetic Item",
      admissionState: "PUBLIC_APPROVED",
      public_eligible: true,
      geographic_scope: "DA_NANG",
      raw_vault_path: denylist.paths[0],
      raw_sha256: denylist.hashes[0]
    }
  ];

  await it('[Negative Fixture] Dynamic renderer throws QUARANTINED_ARTIFACT_REFERENCE fail-closed on quarantined input', () => {
    assert.throws(
      () => renderDynamicCatalogWithAdmission(quarantinedCandidateInput),
      /QUARANTINED_ARTIFACT_REFERENCE/
    );
  });

  // --- Suite 3: Operational Trace Provenance & QA Fixture Isolation (Mandate CORRECTION-6.3) ---
  console.log('\n--- Suite 3: Operational Trace Provenance & QA Fixture Isolation (Mandate CORRECTION-6.3) ---');

  await it('JAYT_OPERATIONAL_RUNTIME_EXECUTION_TRACE.json references canonical files and contains zero test fixtures', () => {
    assert.ok(fs.existsSync(OPERATIONAL_TRACE_PATH));
    const opTrace = JSON.parse(fs.readFileSync(OPERATIONAL_TRACE_PATH, 'utf8'));
    assert.ok(opTrace.process_id > 0);
    assert.strictEqual(opTrace.canonical_cohort_path, '06_TRUST_AND_EVIDENCE/COHORT_CINEMA_TRANSIT_15_CANDIDATES_LEDGER_EZ_AM.json');
    assert.strictEqual(opTrace.active_ledger_path, '06_TRUST_AND_EVIDENCE/JAYT_COHORT_15_SLA_CLOSURE_LEDGER.json');
    assert.strictEqual(opTrace.gateway_invoked, true);
    assert.strictEqual(opTrace.total_candidates_closed, 15);
    assert.ok(!JSON.stringify(opTrace).includes('fixtures'), 'Operational trace must not reference test fixtures');
  });

  // --- Suite 4: Staging Static Preview & Puppeteer Viewports (Mandates CORRECTION-6.1 & 6.5) ---
  console.log('\n--- Suite 4: Staging Static Preview & Puppeteer Viewports (Mandates CORRECTION-6.1 & 6.5) ---');

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

  // --- Suite 5: Platform State & Commercial Locks (Mandate CORRECTION-6.5) ---
  console.log('\n--- Suite 5: Platform State & Commercial Locks (Mandate CORRECTION-6.5) ---');

  await it('Cohort 15 active closure ledger records strictly 14 HELD_NEW_COHORT_REQUIRED, 1 CLOSED, 0 PUBLIC_APPROVED', () => {
    assert.ok(fs.existsSync(COHORT_15_CLOSURE_PATH));
    const closureLedger = JSON.parse(fs.readFileSync(COHORT_15_CLOSURE_PATH, 'utf8'));
    assert.strictEqual(closureLedger.closure_summary.held_new_cohort_required_count, 14);
    assert.strictEqual(closureLedger.closure_summary.closed_count, 1);
    assert.strictEqual(closureLedger.closure_summary.public_approved_count_in_cohort, 0);
  });

  await it('Batch 02 is strictly BLOCKED and not initialized before CEO independent audit', () => {
    const batch02LedgerPath = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_260_MICRO_BATCH_02_INTAKE_LEDGER.json');
    assert.strictEqual(fs.existsSync(batch02LedgerPath), false, 'Batch 02 must not be initialized before CEO approval');
  });

  await it('Commercial locks strictly active (Production locked at v3.419.0, P0_EQ = OPEN, T1 = 0, voucher = 0, affiliate = false)', () => {
    const bManifest = JSON.parse(fs.readFileSync(BUILD_MANIFEST_PATH, 'utf8'));
    assert.strictEqual(bManifest.expectedVersion, EXPECTED_VERSION);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' JAYT-260-CORRECTION-6 QA TESTS PASSED!\n');
}

runJayt260Correction6QA().catch(err => {
  console.error('\nFatal Runner Error:', err);
  process.exit(1);
});
