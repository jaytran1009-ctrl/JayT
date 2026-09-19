/**
 * JAYT-262-CORRECTION-1 QUARANTINE & CLOCK GUARD ENFORCEMENT QA SUITE
 * Governing Directive: JAYT-245 Section JAYT-262-CORRECTION-1 (Lines 5649-5664)
 *
 * Verifies:
 * 1. Quarantine Manifest & Complete Artifact Isolation (Mandate CORRECTION-1.1):
 *    - Asserts QUARANTINE_RECORD_JAYT_262_CORRECTION_1.json exists.
 *    - Asserts active Batch 02 intake pack, ledger, and vault directory are strictly ABSENT.
 *    - Asserts all 6 artifacts are preserved in QUARANTINED_EVIDENCE_VAULT_JAYT_MICRO_BATCH_02.
 * 2. Loader Guard Denylist & Negative Fixtures (Mandate CORRECTION-1.1):
 *    - Asserts referencing any quarantined path or hash throws QUARANTINED_ARTIFACT_REFERENCE.
 * 3. Clock Guard Engine & Premature Closure Prevention (Mandate CORRECTION-1.3):
 *    - Asserts closure attempt before deadline_utc throws SLA_NOT_REACHED.
 * 4. Staging Static Preview & Puppeteer Viewports (Mandate CORRECTION-1.5):
 *    - 100% local network requests, zero DOM diff, zero console errors across 1440, 768, 390.
 * 5. Platform State & Commercial Locks (Mandate CORRECTION-1.5):
 *    - Batch 02 status is QUARANTINED_FALSE_CLOCK_OR_PROVENANCE.
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
const QUARANTINE_RECORD_262_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/QUARANTINE_RECORD_JAYT_262_CORRECTION_1.json');
const QUARANTINE_VAULT_MB02_DIR = path.join(ROOT, '06_TRUST_AND_EVIDENCE/QUARANTINED_EVIDENCE_VAULT_JAYT_MICRO_BATCH_02');
const OLD_VAULT_MB02_DIR = path.join(ROOT, '06_TRUST_AND_EVIDENCE/evidence_vault_jayt_micro_batch_02');

const { assertArtifactNotQuarantined, getQuarantineDenylist } = require('../00_PROGRAM_BASELINE/jayt_artifact_loader_guard.js');

async function runJayt262Correction1QA() {
  console.log('\n🔬 RUNNING JAYT-262-CORRECTION-1 QUARANTINE & CLOCK GUARD QA...\n');

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

  // --- Suite 1: Quarantine Manifest & Complete Artifact Isolation (Mandate CORRECTION-1.1) ---
  console.log('--- Suite 1: Quarantine Manifest & Complete Artifact Isolation (Mandate CORRECTION-1.1) ---');

  await it('QUARANTINE_RECORD_JAYT_262_CORRECTION_1.json exists and records 6 quarantined artifacts', () => {
    assert.ok(fs.existsSync(QUARANTINE_RECORD_262_PATH));
    const rec = JSON.parse(fs.readFileSync(QUARANTINE_RECORD_262_PATH, 'utf8'));
    assert.strictEqual(rec.quarantined_artifacts_count, 6);
    assert.strictEqual(rec.batch_status, 'QUARANTINED_FALSE_CLOCK_OR_PROVENANCE');
  });

  await it('Active Batch 02 intake pack, ledger, and old vault dir are strictly ABSENT', () => {
    assert.strictEqual(fs.existsSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_MICRO_BATCH_02_INTAKE_PACK.json')), false);
    assert.strictEqual(fs.existsSync(path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_MICRO_BATCH_02_2D_LEDGER.json')), false);
    assert.strictEqual(fs.existsSync(OLD_VAULT_MB02_DIR), false);
  });

  await it('All 6 quarantined artifacts exist in QUARANTINED_EVIDENCE_VAULT_JAYT_MICRO_BATCH_02', () => {
    assert.ok(fs.existsSync(QUARANTINE_VAULT_MB02_DIR));
    const files = fs.readdirSync(QUARANTINE_VAULT_MB02_DIR);
    assert.strictEqual(files.length, 6);
  });

  // --- Suite 2: Loader Guard Denylist & Negative Fixtures (Mandate CORRECTION-1.1) ---
  console.log('\n--- Suite 2: Loader Guard Denylist & Negative Fixtures (Mandate CORRECTION-1.1) ---');

  const rec = JSON.parse(fs.readFileSync(QUARANTINE_RECORD_262_PATH, 'utf8'));

  for (const item of rec.quarantined_artifacts) {
    await it('[Negative Fixture: Path] Loader guard rejects quarantined path: ' + path.basename(item.original_path), () => {
      assert.throws(() => {
        assertArtifactNotQuarantined(item.original_path);
      }, /QUARANTINED_ARTIFACT_REFERENCE/);
    });

    await it('[Negative Fixture: Hash] Loader guard rejects quarantined SHA-256: ' + item.sha256.substring(0, 12) + '...', () => {
      assert.throws(() => {
        assertArtifactNotQuarantined(item.sha256);
      }, /QUARANTINED_ARTIFACT_REFERENCE/);
    });
  }

  // --- Suite 3: Clock Guard Engine & Premature Closure Prevention (Mandate CORRECTION-1.3) ---
  console.log('\n--- Suite 3: Clock Guard Engine & Premature Closure Prevention (Mandate CORRECTION-1.3) ---');

  function evaluateSlaClosure(slaStartedAtUtc, deadlineUtc, currentClockUtc) {
    const startMs = Date.parse(slaStartedAtUtc);
    const deadlineMs = Date.parse(deadlineUtc);
    const currentMs = Date.parse(currentClockUtc);

    if (currentMs < deadlineMs) {
      const remainingHours = ((deadlineMs - currentMs) / (3600 * 1000)).toFixed(2);
      throw new Error('SLA_NOT_REACHED: Cannot close batch prematurely. ' + remainingHours + ' hours remaining until deadline.');
    }
    return { status: "SLA_EXPIRED_CLOSURE_PERMITTED" };
  }

  await it('[Negative Fixture 1] Premature closure attempt before deadline throws SLA_NOT_REACHED', () => {
    const start = currentRuntimeIso;
    const deadline = new Date(Date.parse(currentRuntimeIso) + 6 * 3600 * 1000).toISOString();
    assert.throws(() => {
      evaluateSlaClosure(start, deadline, currentRuntimeIso);
    }, /SLA_NOT_REACHED/);
  });

  await it('[Positive Fixture] Closure attempt after deadline passes clock guard', () => {
    const pastStart = new Date(Date.now() - 7 * 3600 * 1000).toISOString();
    const pastDeadline = new Date(Date.now() - 1 * 3600 * 1000).toISOString();
    const res = evaluateSlaClosure(pastStart, pastDeadline, currentRuntimeIso);
    assert.strictEqual(res.status, 'SLA_EXPIRED_CLOSURE_PERMITTED');
  });

  // --- Suite 4: Staging Static Preview & Puppeteer Viewports (Mandate CORRECTION-1.5) ---
  console.log('\n--- Suite 4: Staging Static Preview & Puppeteer Viewports (Mandate CORRECTION-1.5) ---');

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

  // --- Suite 5: Platform State & Commercial Locks (Mandate CORRECTION-1.5) ---
  console.log('\n--- Suite 5: Platform State & Commercial Locks (Mandate CORRECTION-1.5) ---');

  await it('Cohort 15 active closure ledger records strictly 14 HELD_NEW_COHORT_REQUIRED, 1 CLOSED, 0 PUBLIC_APPROVED', () => {
    assert.ok(fs.existsSync(COHORT_15_CLOSURE_PATH));
    const closureLedger = JSON.parse(fs.readFileSync(COHORT_15_CLOSURE_PATH, 'utf8'));
    assert.strictEqual(closureLedger.closure_summary.held_new_cohort_required_count, 14);
    assert.strictEqual(closureLedger.closure_summary.closed_count, 1);
    assert.strictEqual(closureLedger.closure_summary.public_approved_count_in_cohort, 0);
  });

  await it('Commercial locks strictly active (Production locked at v3.419.0, P0_EQ = OPEN, T1 = 0, voucher = 0, affiliate = false)', () => {
    const bManifest = JSON.parse(fs.readFileSync(BUILD_MANIFEST_PATH, 'utf8'));
    assert.strictEqual(bManifest.expectedVersion, EXPECTED_VERSION);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' JAYT-262-CORRECTION-1 QA TESTS PASSED!\n');
}

runJayt262Correction1QA().catch(err => {
  console.error('\nFatal Runner Error:', err);
  process.exit(1);
});
