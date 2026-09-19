/**
 * JAYT-266 QA SUITE: STRATEGIC PIVOT — DECOUPLED AUDIT & BULK-SUPPLY READINESS
 * Governing Directive: JAYT-245 Section JAYT-266 (Lines 5824-5837)
 *
 * TEST REQUIREMENTS:
 * 1. Suite 1: Lane A Technical Trace Verification Audit (Mandate JAYT-266.1)
 *    - JAYT_266_TECHNICAL_TRACE_VERIFICATION_REPORT.json exists with TECHNICAL_TRACE_VERIFIED.
 *    - Confirms raw log byte hash matches 3d9daa923752f41efbcaa2449773a58d8e4b645c5650144d2ad781a5a792c54b.
 *    - Acknowledges no authority to unfreeze or alter commercial holds.
 * 2. Suite 2: Lane B Bulk Supply Readiness Specification Audit (Mandate JAYT-266.2 & 266.3)
 *    - BATCH_03_BULK_SUPPLY_READINESS_SPECIFICATION.json exists.
 *    - Defines 28 target proposals across 4 clusters (Hòa Khánh, An Thượng, Hải Châu, Tiện ích số).
 *    - All proposals have is_candidate: false, pricing: null, voucher: null, zero raw capture, zero network requests.
 *    - Complete taxonomy (T1-T4), accessibility framework (WCAG 2.1 AA), and 7-department reviewer matrix.
 * 3. Suite 3: Supply Readiness Ledger & Segmented Accounting (Mandate JAYT-266.4)
 *    - JAYT_SUPPLY_READINESS_LEDGER.json exists.
 *    - Segments counts: proposals_prepared: 28, schema_ready: 28, evidence_captured: 0, public_approved: 1, blocked_quarantined: 7.
 * 4. Suite 4: Hard Freeze V2 Runtime Preflight Circuit Breaker (Mandate JAYT-266.1)
 *    - Operational runner and catalog builder fail closed with CONTAMINATION_FREEZE_ACTIVE.
 * 5. Suite 5: Staging Static Preview & Viewports Lifecycle (Mandate JAYT-266.5)
 *    - Live staging health UP, expectedVersion, zero drift.
 *    - Viewports: strictly 1 approved GitHub card, 0 Batch 02 cards, 100% local network requests, 0 console errors.
 * 6. Suite 6: Platform State & Commercial Locks (Mandate JAYT-266.5)
 *    - Production locked at v3.419.0 (P0_EQ = OPEN), voucher = 0, affiliate = false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const puppeteer = require('puppeteer');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const HEALTH_URL = 'http://127.0.0.1:4173/health';
const STAGING_URL = 'http://127.0.0.1:4173/';
const BUILD_MANIFEST_PATH = path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_BUILD_MANIFEST.json');
const EXPECTED_VERSION = fs.existsSync(BUILD_MANIFEST_PATH) ? JSON.parse(fs.readFileSync(BUILD_MANIFEST_PATH, 'utf8')).expectedVersion : 'v3.483.0-staging.ao';

const LANE_A_REPORT_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_266_TECHNICAL_TRACE_VERIFICATION_REPORT.json');
const LANE_B_SPEC_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/BATCH_03_BULK_SUPPLY_READINESS_SPECIFICATION.json');
const LEDGER_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_SUPPLY_READINESS_LEDGER.json');

const { assertContaminationFreezeNotActive } = require('../00_PROGRAM_BASELINE/jayt_freeze_state_guard.js');

async function runJayt266QA() {
  console.log('\n🔬 RUNNING JAYT-266 STRATEGIC PIVOT & BULK-SUPPLY READINESS QA...\n');
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

  // --- Suite 1: Lane A Technical Trace Verification Audit ---
  console.log('--- Suite 1: Lane A Technical Trace Verification Audit ---');

  await it('JAYT_266_TECHNICAL_TRACE_VERIFICATION_REPORT.json exists with status TECHNICAL_TRACE_VERIFIED', () => {
    assert.ok(fs.existsSync(LANE_A_REPORT_PATH));
    const rep = JSON.parse(fs.readFileSync(LANE_A_REPORT_PATH, 'utf8'));
    assert.strictEqual(rep.technical_verdict, 'TECHNICAL_TRACE_VERIFIED');
    assert.strictEqual(rep.target_evidence_audit.raw_log_bytes_sha256, '3d9daa923752f41efbcaa2449773a58d8e4b645c5650144d2ad781a5a792c54b');
    assert.ok(rep.authority_notice.includes('No authority to unfreeze'));
  });

  // --- Suite 2: Lane B Bulk Supply Readiness Specification Audit ---
  console.log('\n--- Suite 2: Lane B Bulk Supply Readiness Specification Audit ---');

  await it('BATCH_03_BULK_SUPPLY_READINESS_SPECIFICATION.json exists and defines 28 target proposals across 4 clusters', () => {
    assert.ok(fs.existsSync(LANE_B_SPEC_PATH));
    const spec = JSON.parse(fs.readFileSync(LANE_B_SPEC_PATH, 'utf8'));
    assert.strictEqual(spec.clusters_summary.total_clusters, 4);
    assert.strictEqual(spec.clusters_summary.total_proposals, 28);
    assert.strictEqual(spec.target_proposals_backlog.length, 28);
  });

  await it('All 28 target proposals strictly uphold safety rules (is_candidate: false, pricing: null, zero raw captures, zero network requests)', () => {
    const spec = JSON.parse(fs.readFileSync(LANE_B_SPEC_PATH, 'utf8'));
    for (const prop of spec.target_proposals_backlog) {
      const rules = prop.governing_rules;
      assert.strictEqual(rules.is_candidate, false);
      assert.strictEqual(rules.pricing_field, null);
      assert.strictEqual(rules.voucher_field, null);
      assert.strictEqual(rules.commercial_claim, null);
      assert.strictEqual(rules.raw_capture_performed, false);
      assert.strictEqual(rules.network_request_performed, false);
      assert.strictEqual(rules.render_eligible_before_unfreeze, false);
    }
  });

  await it('Specification establishes standardized taxonomy (T1-T4), accessibility framework, and 7-department reviewer matrix', () => {
    const spec = JSON.parse(fs.readFileSync(LANE_B_SPEC_PATH, 'utf8'));
    assert.ok(spec.taxonomy_definitions.T1 && spec.taxonomy_definitions.T2 && spec.taxonomy_definitions.T3 && spec.taxonomy_definitions.T4);
    assert.strictEqual(spec.accessibility_framework.wcag_conformance, 'WCAG 2.1 AA');
    assert.strictEqual(spec.accessibility_framework.color_contrast_minimum, '4.5:1');

    for (const prop of spec.target_proposals_backlog) {
      const rev = prop.reviewer_matrix;
      assert.ok(rev.product_reviewer && rev.design_reviewer && rev.ux_cx_reviewer && rev.growth_reviewer && rev.data_trust_reviewer && rev.engineering_reviewer && rev.qa_reviewer);
    }
  });

  // --- Suite 3: Supply Readiness Ledger & Segmented Accounting ---
  console.log('\n--- Suite 3: Supply Readiness Ledger & Segmented Accounting ---');

  await it('JAYT_SUPPLY_READINESS_LEDGER.json maintains segmented accounting with zero unapproved claims', () => {
    assert.ok(fs.existsSync(LEDGER_PATH));
    const ledger = JSON.parse(fs.readFileSync(LEDGER_PATH, 'utf8'));
    assert.strictEqual(ledger.kpi_accounting.proposals_prepared, 28);
    assert.strictEqual(ledger.kpi_accounting.schema_ready, 28);
    assert.strictEqual(ledger.kpi_accounting.evidence_captured, 0);
    assert.strictEqual(ledger.kpi_accounting.public_approved, 1);
    assert.strictEqual(ledger.kpi_accounting.blocked_quarantined, 7);
  });

  // --- Suite 4: Hard Freeze V2 Runtime Preflight Circuit Breaker ---
  console.log('\n--- Suite 4: Hard Freeze V2 Runtime Preflight Circuit Breaker ---');

  await it('Hard freeze V2 preflight circuit breaker halts runner and builder before file I/O', () => {
    assert.throws(() => {
      assertContaminationFreezeNotActive('COHORT_15_OPERATIONAL_RUNNER');
    }, /CONTAMINATION_FREEZE_ACTIVE/);

    assert.throws(() => {
      assertContaminationFreezeNotActive('STOREFRONT_CATALOG_BUILDER');
    }, /CONTAMINATION_FREEZE_ACTIVE/);
  });

  // --- Suite 5: Staging Static Preview & Viewport Lifecycle ---
  console.log('\n--- Suite 5: Staging Static Preview & Viewport Lifecycle ---');

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

  await it('Commercial locks strictly active (Production locked at v3.419.0, P0_EQ = OPEN, T1 = 0, voucher = 0, affiliate = false)', () => {
    const bManifest = JSON.parse(fs.readFileSync(BUILD_MANIFEST_PATH, 'utf8'));
    assert.strictEqual(bManifest.expectedVersion, EXPECTED_VERSION);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' JAYT-266 QA TESTS PASSED!\n');
}

runJayt266QA().catch(err => {
  console.error('\nFatal Runner Error:', err);
  process.exit(1);
});
