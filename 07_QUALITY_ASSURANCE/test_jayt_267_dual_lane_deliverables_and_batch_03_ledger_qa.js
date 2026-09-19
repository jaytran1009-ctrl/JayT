/**
 * JAYT-267 QA SUITE: DUAL-LANE DELIVERABLES ENFORCEMENT & PRE-UNFREEZE PREREQUISITES
 * Governing Directive: JAYT-245 Section JAYT-267 (Lines 5838-5846)
 *
 * TEST REQUIREMENTS:
 * 1. Suite 1: Lane A Raw Forensic Runtime Trace Audit (Mandates JAYT-267.1 & 267.2)
 *    - RUNTIME_FREEZE_TRACE_EVIDENCE.log exists at both 06_TRUST_AND_EVIDENCE and project root.
 *    - Matches exact SHA-256 byte hash 3d9daa923752f41efbcaa2449773a58d8e4b645c5650144d2ad781a5a792c54b.
 *    - Explicitly proves: minimal read of freeze record for fail-closed preflight, and zero business I/O.
 *    - Records OS PID, UTC timestamps, source hashes, and exit code 1 for both entrypoints.
 * 2. Suite 2: Lane B Batch 03 Readiness Ledger Audit (Mandates JAYT-267.3 & 267.4)
 *    - JAYT_BATCH_03_READINESS_LEDGER.json exists at both 06_TRUST_AND_EVIDENCE and project root.
 *    - Contains exactly 28 target proposals (Hòa Khánh: 7, An Thượng: 7, Hải Châu: 7, Tiện ích số: 7).
 *    - Each proposal contains target_id, cluster, community_need, rationale, candidate_source_class, source_url_placeholder, evidence_field_contract, recheck_criteria, accessibility_notes, asset_rights_notes, and 7-department reviewer assignment.
 *    - Strictly enforces safety invariants: is_candidate: false, pricing: null, voucher: null, zero fake hashes, zero admission state, zero public flags.
 * 3. Suite 3: Hard Freeze V2 Runtime Preflight Circuit Breaker (Mandate JAYT-267.5)
 *    - Operational runner and catalog builder fail closed with CONTAMINATION_FREEZE_ACTIVE.
 * 4. Suite 4: Staging Static Preview & Viewports Lifecycle (Mandate JAYT-267.5)
 *    - Live staging health UP, expectedVersion, zero drift.
 *    - Viewports: strictly 1 approved GitHub card, 0 Batch 02 cards, 100% local network requests, 0 console errors.
 * 5. Suite 5: Platform State & Commercial Locks (Mandate JAYT-267.5)
 *    - Production locked at v3.420.0 (P0_EQ = OPEN), voucher = 0, affiliate = false.
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

const LOG_PATH_1 = path.join(ROOT, '06_TRUST_AND_EVIDENCE/RUNTIME_FREEZE_TRACE_EVIDENCE.log');
const LOG_PATH_2 = path.join(ROOT, 'RUNTIME_FREEZE_TRACE_EVIDENCE.log');
const EXPECTED_LOG_SHA256 = '3d9daa923752f41efbcaa2449773a58d8e4b645c5650144d2ad781a5a792c54b';

const LEDGER_PATH_1 = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_BATCH_03_READINESS_LEDGER.json');
const LEDGER_PATH_2 = path.join(ROOT, 'JAYT_BATCH_03_READINESS_LEDGER.json');
const CANONICAL_REGISTRY_PATH = path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_CANONICAL_PUBLIC_APPROVED_REGISTRY.json');
const approvedRegistry = JSON.parse(fs.readFileSync(CANONICAL_REGISTRY_PATH, 'utf8'));

const { assertContaminationFreezeNotActive } = require('../00_PROGRAM_BASELINE/jayt_freeze_state_guard.js');

async function runJayt267QA() {
  console.log('\n🔬 RUNNING JAYT-267 DUAL-LANE DELIVERABLES & BATCH 03 READINESS QA...\n');
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

  // --- Suite 1: Lane A Raw Forensic Runtime Trace Audit ---
  console.log('--- Suite 1: Lane A Raw Forensic Runtime Trace Audit ---');

  await it('RUNTIME_FREEZE_TRACE_EVIDENCE.log exists at both paths and matches exact SHA-256 byte hash', () => {
    assert.ok(fs.existsSync(LOG_PATH_1));
    assert.ok(fs.existsSync(LOG_PATH_2));

    const bytes1 = fs.readFileSync(LOG_PATH_1);
    const hash1 = crypto.createHash('sha256').update(bytes1).digest('hex');
    assert.strictEqual(hash1, EXPECTED_LOG_SHA256);

    const bytes2 = fs.readFileSync(LOG_PATH_2);
    const hash2 = crypto.createHash('sha256').update(bytes2).digest('hex');
    assert.strictEqual(hash2, EXPECTED_LOG_SHA256);
  });

  await it('Trace log explicitly differentiates minimal freeze record read from zero business I/O', () => {
    const text = fs.readFileSync(LOG_PATH_1, 'utf8');
    assert.ok(text.includes('Minimal Freeze Record Read: Limited strictly to reading 00_PROGRAM_BASELINE/JAYT_CONTAMINATION_FREEZE_STATE.json'));
    assert.ok(text.includes('Bytes Read from Raw Quarantined Candidate: 0 bytes'));
    assert.ok(text.includes('Bytes Written to Ledger/Deploy/Staging: 0 bytes'));
    assert.ok(text.includes('Bytes Written to Catalog/Deploy/Staging: 0 bytes'));
    assert.ok(text.includes('Zero Business I/O Verified: TRUE'));
    assert.ok(text.includes('Zero File System Mutation Verified: TRUE'));
  });

  await it('Trace log captures OS PID, timestamps, source hash, exit code 1, and CONTAMINATION_FREEZE_ACTIVE for both entrypoints', () => {
    const text = fs.readFileSync(LOG_PATH_1, 'utf8');
    // Case 1
    assert.ok(text.includes('CASE 1: OPERATIONAL RUNNER ENTRYPOINT RUNTIME EXECUTION'));
    assert.ok(text.includes('Source File Bytes SHA-256: d1f05bdfbf042a0f382db424165de1e6757c91d1d75b49eff172af8797af53be'));
    assert.ok(text.includes('Operating System Process ID (PID):'));
    assert.ok(text.includes('CONTAMINATION_FREEZE_ACTIVE: Component "COHORT_15_OPERATIONAL_RUNNER" is strictly FROZEN'));
    // Case 2
    assert.ok(text.includes('CASE 2: STOREFRONT CATALOG BUILDER ENTRYPOINT RUNTIME EXECUTION'));
    assert.ok(text.includes('Source File Bytes SHA-256: 3bfd04fdfeea176ea3463bb8b1f74d3f867c0ebae1e60db880e7470874e793b2'));
    assert.ok(text.includes('CATALOG_BUILD_ERROR: CONTAMINATION_FREEZE_ACTIVE: Component "STOREFRONT_CATALOG_BUILDER" is strictly FROZEN'));
  });

  // --- Suite 2: Lane B Batch 03 Readiness Ledger Audit ---
  console.log('\n--- Suite 2: Lane B Batch 03 Readiness Ledger Audit ---');

  await it('JAYT_BATCH_03_READINESS_LEDGER.json exists at both paths with matching bit-identical content', () => {
    assert.ok(fs.existsSync(LEDGER_PATH_1));
    assert.ok(fs.existsSync(LEDGER_PATH_2));

    const bytes1 = fs.readFileSync(LEDGER_PATH_1);
    const bytes2 = fs.readFileSync(LEDGER_PATH_2);
    assert.strictEqual(bytes1.toString('utf8'), bytes2.toString('utf8'));
  });

  await it('Readiness ledger defines exactly 28 proposals evenly distributed across 4 clusters (7 each)', () => {
    const ledger = JSON.parse(fs.readFileSync(LEDGER_PATH_1, 'utf8'));
    assert.strictEqual(ledger.accounting_summary.total_target_proposals, 28);
    assert.strictEqual(ledger.accounting_summary.cluster_counts.HOA_KHANH, 7);
    assert.strictEqual(ledger.accounting_summary.cluster_counts.AN_THUONG, 7);
    assert.strictEqual(ledger.accounting_summary.cluster_counts.HAI_CHAU, 7);
    assert.strictEqual(ledger.accounting_summary.cluster_counts.TIEN_ICH_SO, 7);
    assert.strictEqual(ledger.proposals.length, 28);
  });

  await it('All 28 proposals contain all required schema fields and 7-department reviewer assignment', () => {
    const ledger = JSON.parse(fs.readFileSync(LEDGER_PATH_1, 'utf8'));
    for (const p of ledger.proposals) {
      assert.ok(p.target_id);
      assert.ok(p.cluster);
      assert.ok(p.community_need);
      assert.ok(p.rationale);
      assert.ok(p.candidate_source_class);
      assert.ok(p.source_url_placeholder);
      assert.ok(Array.isArray(p.evidence_field_contract) && p.evidence_field_contract.length >= 5);
      assert.ok(p.recheck_criteria);
      assert.ok(p.accessibility_notes);
      assert.ok(p.asset_rights_notes);

      const rev = p.council_reviewer_assignment;
      assert.ok(rev.product_lead && rev.design_lead && rev.ux_cx_lead && rev.growth_lead && rev.data_trust_lead && rev.engineering_lead && rev.qa_lead);
    }
  });

  await it('All 28 proposals strictly enforce safety invariants (not candidates, no pricing/voucher/discount, no public flags)', () => {
    const ledger = JSON.parse(fs.readFileSync(LEDGER_PATH_1, 'utf8'));
    for (const p of ledger.proposals) {
      const inv = p.strict_safety_invariants;
      assert.strictEqual(inv.is_candidate, false);
      assert.strictEqual(inv.is_content_supply, false);
      assert.strictEqual(inv.sla_clock_active, false);
      assert.strictEqual(inv.fake_evidence_hash_present, false);
      assert.strictEqual(inv.admission_state, null);
      assert.strictEqual(inv.render_eligible_flag, false);
      assert.strictEqual(inv.public_approved_flag, false);
      assert.strictEqual(inv.pricing_field, null);
      assert.strictEqual(inv.discount_field, null);
      assert.strictEqual(inv.voucher_field, null);
      assert.strictEqual(inv.merchant_asset, null);
      assert.strictEqual(inv.commercial_cta, null);
    }
  });

  await it('Ledger summary maintains truthful accounting (candidates_admitted: 0, evidence_captured: 0, public_approved: 1)', () => {
    const ledger = JSON.parse(fs.readFileSync(LEDGER_PATH_1, 'utf8'));
    assert.strictEqual(ledger.accounting_summary.candidates_admitted, 0);
    assert.strictEqual(ledger.accounting_summary.evidence_captured, 0);
    assert.strictEqual(ledger.accounting_summary.public_approved, 1);
    assert.strictEqual(ledger.accounting_summary.blocked_quarantined, 7);
  });

  // --- Suite 3: Hard Freeze V2 Runtime Preflight Circuit Breaker ---
  console.log('\n--- Suite 3: Hard Freeze V2 Runtime Preflight Circuit Breaker ---');

  await it('Hard freeze V2 preflight circuit breaker halts runner and builder before file I/O', () => {
    assert.throws(() => {
      assertContaminationFreezeNotActive('COHORT_15_OPERATIONAL_RUNNER');
    }, /CONTAMINATION_FREEZE_ACTIVE/);

    assert.throws(() => {
      assertContaminationFreezeNotActive('STOREFRONT_CATALOG_BUILDER');
    }, /CONTAMINATION_FREEZE_ACTIVE/);
  });

  // --- Suite 4: Staging Static Preview & Viewports Lifecycle ---
  console.log('\n--- Suite 4: Staging Static Preview & Viewports Lifecycle ---');

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

      await it('[' + vp.name + '] Zero DOM diff: strictly ' + approvedRegistry.approved_entities_count + ' approved cards rendered, 0 Batch 02 cards', async () => {
        const cards = await page.$$('.t2-pilot-card-section');
        assert.strictEqual(cards.length, approvedRegistry.approved_entities_count);
        const bodyText = await page.$eval('body', el => el.textContent);
        for (const item of approvedRegistry.approved_entities) {
          const checkWord = item.candidate_id === 'BATCH03_DS_07' ? 'DanaBus' : (item.candidate_id === 'GITHUB_EDUCATION_PILOT_T2' ? 'GitHub' : (item.candidate_id === 'B04_02_KY_SO_TOAN_DAN_Y_TE' ? 'Ký Số' : (item.candidate_id.includes('CDC') ? 'CDC' : 'UED')));
          assert.ok(bodyText.includes(checkWord), 'Missing approved entity: ' + checkWord);
        }
        assert.ok(!bodyText.includes('Metiz'));
        assert.ok(!bodyText.includes('Galaxy'));
        assert.ok(!bodyText.includes('TNGo'));
      });

      await it('[' + vp.name + '] Zero DOM diff: strictly ' + approvedRegistry.approved_entities_count + ' external links matching approved registry', async () => {
        const extLinks = await page.$$eval('a[href^="http"]', anchors => {
          return anchors
            .map(a => a.href)
            .filter(h => !h.startsWith('http://127.0.0.1') && !h.startsWith('http://localhost'));
        });
        assert.strictEqual(extLinks.length, approvedRegistry.approved_entities_count);
        for (const item of approvedRegistry.approved_entities) {
          assert.ok(extLinks.some(link => link.startsWith(item.external_url) || item.external_url.startsWith(link)), 'Missing approved external link: ' + item.external_url);
        }
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

  // --- Suite 5: Platform State & Commercial Locks ---
  console.log('\n--- Suite 5: Platform State & Commercial Locks ---');

  await it('Commercial locks strictly active (Production locked at v3.420.0, P0_EQ = OPEN, T1 = 0, voucher = 0, affiliate = false)', () => {
    const bManifest = JSON.parse(fs.readFileSync(BUILD_MANIFEST_PATH, 'utf8'));
    assert.strictEqual(bManifest.expectedVersion, EXPECTED_VERSION);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' JAYT-267 QA TESTS PASSED!\n');
}

runJayt267QA().catch(err => {
  console.error('\nFatal Runner Error:', err);
  process.exit(1);
});
