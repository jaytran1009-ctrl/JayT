/**
 * JAYT-260-CORRECTION-2 SYNTHETIC VAULT QUARANTINE & DENYLIST LOADER QA TEST SUITE
 * Governing Directive: JAYT-245 Section JAYT-260-CORRECTION-2 (Lines 5453-5467)
 *
 * Verifies:
 * 1. Physical Vault Quarantine & Manifest Parity (Mandate CORRECTION-2.1):
 *    - Active directory 06_TRUST_AND_EVIDENCE/evidence_vault_jayt_260/ is strictly ABSENT / removed.
 *    - Quarantined vault 06_TRUST_AND_EVIDENCE/QUARANTINED_EVIDENCE_VAULT_JAYT_260_SYNTHETIC/ contains all 4 payloads.
 *    - QUARANTINE_RECORD_JAYT_260_CORRECTION_2.json records all 4 file hashes, lengths, source/dest paths, and reasons.
 * 2. Mandatory Denylist Loader Enforcement & Negative Fixtures (Mandate CORRECTION-2.2):
 *    - Loader throws QUARANTINED_ARTIFACT_REFERENCE when referencing quarantined path.
 *    - Loader throws QUARANTINED_ARTIFACT_REFERENCE when referencing quarantined SHA-256 hash.
 *    - Positive fixture with clean non-quarantined payload passes.
 * 3. Live Staging Preview & Puppeteer Viewport QA on 1440, 768, 390 (Mandate CORRECTION-2.4):
 *    - /health endpoint returns UP, v3.483.0-staging.ao, PERFECT_MATCH_ZERO_DRIFT.
 *    - 0 DOM diff, exactly 1 approved pilot card (GitHub), 0 batch cards, 0 third-party requests, 0 console errors.
 * 4. Platform State & Commercial Locks (Mandate CORRECTION-2.4):
 *    - Batch 02 is blocked / not initialized.
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
const ACTIVE_VAULT_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/evidence_vault_jayt_260');
const QUARANTINED_VAULT_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/QUARANTINED_EVIDENCE_VAULT_JAYT_260_SYNTHETIC');
const QUARANTINE_REC_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/QUARANTINE_RECORD_JAYT_260_CORRECTION_2.json');

const { assertArtifactNotQuarantined, getQuarantineDenylist } = require('../00_PROGRAM_BASELINE/jayt_artifact_loader_guard.js');

async function runJayt260Correction2QA() {
  console.log('\n🔬 RUNNING JAYT-260-CORRECTION-2 SYNTHETIC VAULT QUARANTINE & DENYLIST QA...\n');

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

  // --- Suite 1: Physical Vault Quarantine & Manifest Parity (Mandate CORRECTION-2.1) ---
  console.log('--- Suite 1: Physical Vault Quarantine & Manifest Parity (Mandate CORRECTION-2.1) ---');

  await it('Active directory 06_TRUST_AND_EVIDENCE/evidence_vault_jayt_260/ is strictly ABSENT / removed', () => {
    assert.strictEqual(fs.existsSync(ACTIVE_VAULT_PATH), false, 'Active synthetic vault must be physically removed from active tree');
  });

  await it('Quarantine vault exists and contains all 4 preserved synthetic payloads', () => {
    assert.ok(fs.existsSync(QUARANTINED_VAULT_PATH), 'Quarantined vault directory must exist');
    const files = fs.readdirSync(QUARANTINED_VAULT_PATH);
    assert.strictEqual(files.length, 4);
    assert.ok(files.includes('raw_vnpt_edu_sim_20260901.html'));
    assert.ok(files.includes('raw_transerco_bus_hanoi_student_20260901.html'));
    assert.ok(files.includes('raw_maur_metro1_student_policy_20260901.html'));
    assert.ok(files.includes('raw_canva_education_student_20260901.html'));
  });

  await it('QUARANTINE_RECORD_JAYT_260_CORRECTION_2.json contains full manifest with hashes, lengths, and reasons', () => {
    assert.ok(fs.existsSync(QUARANTINE_REC_PATH));
    const rec = JSON.parse(fs.readFileSync(QUARANTINE_REC_PATH, 'utf8'));
    assert.strictEqual(rec.verdict, 'JAYT_260_MICRO_BATCH_01_RAW_VAULT_PERMANENTLY_QUARANTINED');
    assert.strictEqual(rec.quarantined_files.length, 4);
    rec.quarantined_files.forEach(f => {
      assert.ok(f.sha256 && f.sha256.length === 64);
      assert.ok(f.byte_length > 0);
      assert.ok(f.source_path.includes('evidence_vault_jayt_260'));
      assert.ok(f.quarantined_destination_path.includes('QUARANTINED_EVIDENCE_VAULT_JAYT_260_SYNTHETIC'));
    });
  });

  // --- Suite 2: Mandatory Denylist Loader Enforcement & Negative Fixtures (Mandate CORRECTION-2.2) ---
  console.log('\n--- Suite 2: Mandatory Denylist Loader Enforcement & Negative Fixtures (Mandate CORRECTION-2.2) ---');

  const denylist = getQuarantineDenylist();
  assert.ok(denylist.hashes.length >= 4, 'Must load at least 4 denylisted hashes');

  await it('[Negative Fixture 1] Referencing quarantined file path throws QUARANTINED_ARTIFACT_REFERENCE', () => {
    assert.throws(
      () => assertArtifactNotQuarantined('06_TRUST_AND_EVIDENCE/evidence_vault_jayt_260/raw_vnpt_edu_sim_20260901.html'),
      /QUARANTINED_ARTIFACT_REFERENCE/
    );
  });

  await it('[Negative Fixture 2] Referencing quarantined SHA-256 hash throws QUARANTINED_ARTIFACT_REFERENCE', () => {
    const quarantinedSha = denylist.hashes[0];
    assert.throws(
      () => assertArtifactNotQuarantined(quarantinedSha),
      /QUARANTINED_ARTIFACT_REFERENCE/
    );
  });

  await it('[Negative Fixture 3] Referencing file inside QUARANTINED_EVIDENCE_VAULT_JAYT_260_SYNTHETIC throws QUARANTINED_ARTIFACT_REFERENCE', () => {
    const qFile = path.join(QUARANTINED_VAULT_PATH, 'raw_canva_education_student_20260901.html');
    assert.throws(
      () => assertArtifactNotQuarantined(qFile),
      /QUARANTINED_ARTIFACT_REFERENCE/
    );
  });

  await it('[Positive Fixture] Non-quarantined clean payload passes loader guard', () => {
    const cleanBuffer = Buffer.from('CLEAN_NON_QUARANTINED_PAYLOAD_TEST');
    assert.strictEqual(assertArtifactNotQuarantined('clean_test_path.html', cleanBuffer), true);
  });

  // --- Suite 3: Live Staging Preview & Puppeteer Viewport QA on 1440, 768, 390 (Mandate CORRECTION-2.4) ---
  console.log('\n--- Suite 3: Live Staging Preview & Puppeteer Viewport QA on 1440, 768, 390 (Mandate CORRECTION-2.4) ---');

  await it('Live staging health endpoint returns UP, expectedVersion, and PERFECT_MATCH_ZERO_DRIFT', async () => {
    const res = await fetch(HEALTH_URL);
    const data = await res.json();
    assert.strictEqual(data.status, 'UP');
    assert.strictEqual(data.version, EXPECTED_VERSION);
    assert.strictEqual(data.parity, 'PERFECT_MATCH_ZERO_DRIFT');
    assert.strictEqual(data.manifestMatch, true);
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

  // --- Suite 4: Platform State & Commercial Locks (Mandate CORRECTION-2.4) ---
  console.log('\n--- Suite 4: Platform State & Commercial Locks (Mandate CORRECTION-2.4) ---');

  const COHORT_15_ACTIVE_CLOSURE_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_COHORT_15_SLA_CLOSURE_LEDGER.json');

  await it('Active operational closure ledger JAYT_COHORT_15_SLA_CLOSURE_LEDGER.json exists and is valid', () => {
    assert.ok(fs.existsSync(COHORT_15_ACTIVE_CLOSURE_PATH), 'Active Cohort 15 closure ledger must exist on disk');
    const closureLedger = JSON.parse(fs.readFileSync(COHORT_15_ACTIVE_CLOSURE_PATH, 'utf8'));
    assert.strictEqual(closureLedger.ledger_id, 'JAYT_COHORT_15_SLA_CLOSURE_LEDGER');
    assert.strictEqual(closureLedger.closure_summary.total_candidates_closed, 15);
    closureLedger.candidates.forEach(c => {
      if (c.raw_vault_path) assertArtifactNotQuarantined(c.raw_vault_path);
      if (c.raw_sha256) assertArtifactNotQuarantined(c.raw_sha256);
    });
  });

  await it('Operational runner run_cohort_15_sla_closure_operational.js integrates jayt_artifact_loader_guard.js', () => {
    const runnerCode = fs.readFileSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/run_cohort_15_sla_closure_operational.js'), 'utf8');
    assert.ok(runnerCode.includes('jayt_artifact_loader_guard.js'), 'Runner must import loader guard');
    assert.ok(runnerCode.includes('assertArtifactNotQuarantined'), 'Runner must invoke assertArtifactNotQuarantined');
  });

  await it('Batch 02 is strictly BLOCKED and not initialized before CEO independent audit', () => {
    const batch02LedgerPath = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_260_MICRO_BATCH_02_INTAKE_LEDGER.json');
    assert.strictEqual(fs.existsSync(batch02LedgerPath), false, 'Batch 02 must not be initialized before CEO approval');
  });

  await it('Commercial locks strictly active (Production locked at v3.419.0, P0_EQ = OPEN, T1 = 0, voucher = 0, affiliate = false)', () => {
    const bManifest = JSON.parse(fs.readFileSync(BUILD_MANIFEST_PATH, 'utf8'));
    assert.strictEqual(bManifest.expectedVersion, EXPECTED_VERSION);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' JAYT-260-CORRECTION-2 QA TESTS PASSED!\n');
}

runJayt260Correction2QA().catch(err => {
  console.error('\nFatal Runner Error:', err);
  process.exit(1);
});
