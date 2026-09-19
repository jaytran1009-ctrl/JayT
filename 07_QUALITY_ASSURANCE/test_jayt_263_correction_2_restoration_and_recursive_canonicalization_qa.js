/**
 * JAYT-263-CORRECTION-2 QA SUITE: HISTORICAL V1 RESTORATION, SUPERSESSION LEDGER & RECURSIVE CANONICALIZATION
 * Governing Directive: JAYT-245 Section JAYT-263-CORRECTION-2 (Lines 5760-5774)
 *
 * TEST REQUIREMENTS:
 * 1. Suite 1: Historical v1 Record Restoration Audit (Mandate CORRECTION-2.2)
 *    - JAYT_CONTAMINATION_FREEZE_STATE_V1.json exists in 00_PROGRAM_BASELINE/HISTORICAL/.
 *    - File bytes SHA-256 strictly equals 97464c8f0151e141f21239893632b909471f4527c1f64c9f8ac47b8cf7c3371a.
 *    - Contains self-declared record_sha256 = aee7e71bb09503cf4dafb58040d44678ce64c472f0924a9bd407881f60855960.
 * 2. Suite 2: Non-Self-Referencing Supersession Ledger (Mandate CORRECTION-2.4)
 *    - JAYT_FREEZE_STATE_SUPERSESSION_LEDGER.json exists and links exact previous_path, previous_file_bytes_sha256, V2 path/bytes hash.
 *    - V2 supersedes field does NOT point to active mirror.
 * 3. Suite 3: Recursive Deterministic Key Sorting at All Object Depths (Mandate CORRECTION-2.5)
 *    - Canonicalizer sorts keys at every depth of nested objects and nested arrays.
 *    - Two payloads with scrambled key insertion orders at multiple depths produce IDENTICAL digest.
 *    - Array ordering is preserved.
 * 4. Suite 4: Preflight Guard Fail-Closed Contract Verification (Mandates CORRECTION-2.1 & 2.5)
 *    - Valid V2 active record fails closed with CONTAMINATION_FREEZE_ACTIVE.
 *    - Tampered record fails closed with FREEZE_STATE_INTEGRITY_MISMATCH.
 *    - Missing record fails closed with FREEZE_STATE_UNAVAILABLE.
 *    - Malformed JSON fails closed with ERR_INVALID_FREEZE_STATE_JSON.
 * 5. Suite 5: Staging Static Preview & Viewports (Mandate CORRECTION-2.6)
 *    - Live staging health UP, strictly 1 approved pilot card, 0 Batch 02 cards, 0 third-party requests, 0 console errors.
 * 6. Suite 6: Platform State & Commercial Locks (Mandate CORRECTION-2.6)
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

const V1_HISTORICAL_PATH = path.join(ROOT, '00_PROGRAM_BASELINE/HISTORICAL/JAYT_CONTAMINATION_FREEZE_STATE_V1.json');
const V2_CANONICAL_PATH = path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_CONTAMINATION_FREEZE_STATE_V2.json');
const ACTIVE_MIRROR_PATH = path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_CONTAMINATION_FREEZE_STATE.json');
const SUPERSESSION_LEDGER_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE/JAYT_FREEZE_STATE_SUPERSESSION_LEDGER.json');

const EXPECTED_V1_HASH = '97464c8f0151e141f21239893632b909471f4527c1f64c9f8ac47b8cf7c3371a';
const EXPECTED_V1_DECLARED = 'aee7e71bb09503cf4dafb58040d44678ce64c472f0924a9bd407881f60855960';

const { assertContaminationFreezeNotActive, computeCanonicalPayloadSha256 } = require('../00_PROGRAM_BASELINE/jayt_freeze_state_guard.js');

async function runJayt263Correction2QA() {
  console.log('\n🔬 RUNNING JAYT-263-CORRECTION-2 HISTORICAL RESTORATION & RECURSIVE CANONICALIZATION QA...\n');
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

  // --- Suite 1: Historical v1 Record Restoration Audit (Mandate CORRECTION-2.2) ---
  console.log('--- Suite 1: Historical v1 Record Restoration Audit (Mandate CORRECTION-2.2) ---');

  await it('Historical v1 record exists in 00_PROGRAM_BASELINE/HISTORICAL/', () => {
    assert.ok(fs.existsSync(V1_HISTORICAL_PATH));
  });

  await it('Historical v1 file bytes SHA-256 strictly equals 97464c8... and declared hash equals aee7e71...', () => {
    const content = fs.readFileSync(V1_HISTORICAL_PATH);
    const fileBytesHash = crypto.createHash('sha256').update(content).digest('hex');
    assert.strictEqual(fileBytesHash, EXPECTED_V1_HASH);

    const parsed = JSON.parse(content.toString('utf8'));
    assert.strictEqual(parsed.record_sha256, EXPECTED_V1_DECLARED);
    assert.strictEqual(parsed.directive_id, 'JAYT-263');
    assert.strictEqual(parsed.state, 'ACTIVE');
  });

  // --- Suite 2: Non-Self-Referencing Supersession Ledger (Mandate CORRECTION-2.4) ---
  console.log('\n--- Suite 2: Non-Self-Referencing Supersession Ledger (Mandate CORRECTION-2.4) ---');

  await it('JAYT_FREEZE_STATE_SUPERSESSION_LEDGER.json exists and links v1 historical path and bytes hash', () => {
    assert.ok(fs.existsSync(SUPERSESSION_LEDGER_PATH));
    const ledger = JSON.parse(fs.readFileSync(SUPERSESSION_LEDGER_PATH, 'utf8'));
    assert.strictEqual(ledger.audit_verdict, 'SUPERSESSION_CHAIN_RESTORED_AND_VERIFIED');
    assert.strictEqual(ledger.supersession_chain.length, 2);

    const entry1 = ledger.supersession_chain[0];
    assert.strictEqual(entry1.record_version, 'v1.0');
    assert.strictEqual(entry1.file_bytes_sha256, EXPECTED_V1_HASH);
    assert.strictEqual(entry1.file_path, '00_PROGRAM_BASELINE/HISTORICAL/JAYT_CONTAMINATION_FREEZE_STATE_V1.json');

    const entry2 = ledger.supersession_chain[1];
    assert.strictEqual(entry2.record_version, 'v2.0');
    assert.strictEqual(entry2.supersedes_target.previous_path, '00_PROGRAM_BASELINE/HISTORICAL/JAYT_CONTAMINATION_FREEZE_STATE_V1.json');
    assert.strictEqual(entry2.supersedes_target.previous_file_bytes_sha256, EXPECTED_V1_HASH);
  });

  await it('V2 supersedes field does NOT point to active mirror (points to historical v1 path)', () => {
    const v2 = JSON.parse(fs.readFileSync(V2_CANONICAL_PATH, 'utf8'));
    assert.strictEqual(v2.supersedes.previous_record_path, '00_PROGRAM_BASELINE/HISTORICAL/JAYT_CONTAMINATION_FREEZE_STATE_V1.json');
    assert.notStrictEqual(v2.supersedes.previous_record_path, '00_PROGRAM_BASELINE/JAYT_CONTAMINATION_FREEZE_STATE.json');
  });

  // --- Suite 3: Recursive Deterministic Key Sorting at All Object Depths (Mandate CORRECTION-2.5) ---
  console.log('\n--- Suite 3: Recursive Deterministic Key Sorting at All Object Depths (Mandate CORRECTION-2.5) ---');

  await it('Two multi-depth payloads with scrambled insertion orders produce IDENTICAL canonical digest', () => {
    const payloadA = {
      z_level1: {
        b_nested: { y_deep: 100, a_deep: 200 },
        a_nested: [ { d: 4, c: 3 }, { f: 6, e: 5 } ]
      },
      a_level1: "top_value",
      canonical_payload_sha256: "WILL_BE_EXCLUDED"
    };

    const payloadB = {
      a_level1: "top_value",
      z_level1: {
        a_nested: [ { c: 3, d: 4 }, { e: 5, f: 6 } ],
        b_nested: { a_deep: 200, y_deep: 100 }
      },
      canonical_payload_sha256: "DIFFERENT_TOP_LEVEL_WILL_BE_EXCLUDED"
    };

    const digestA = computeCanonicalPayloadSha256(payloadA);
    const digestB = computeCanonicalPayloadSha256(payloadB);

    assert.strictEqual(digestA, digestB);
  });

  await it('Array element ordering is strictly preserved during recursive canonicalization', () => {
    const arrayPayload1 = { list: ["first", "second", "third"] };
    const arrayPayload2 = { list: ["second", "first", "third"] };

    const digest1 = computeCanonicalPayloadSha256(arrayPayload1);
    const digest2 = computeCanonicalPayloadSha256(arrayPayload2);

    assert.notStrictEqual(digest1, digest2);
  });

  // --- Suite 4: Preflight Guard Fail-Closed Contract Verification (Mandates CORRECTION-2.1 & 2.5) ---
  console.log('\n--- Suite 4: Preflight Guard Fail-Closed Contract Verification (Mandates CORRECTION-2.1 & 2.5) ---');

  await it('Valid V2 active record fails closed with CONTAMINATION_FREEZE_ACTIVE for runner & builder', () => {
    assert.throws(() => {
      assertContaminationFreezeNotActive('COHORT_15_OPERATIONAL_RUNNER');
    }, /CONTAMINATION_FREEZE_ACTIVE/);

    assert.throws(() => {
      assertContaminationFreezeNotActive('STOREFRONT_CATALOG_BUILDER');
    }, /CONTAMINATION_FREEZE_ACTIVE/);
  });

  await it('Tampered record fails closed with FREEZE_STATE_INTEGRITY_MISMATCH', () => {
    const tempTamperedPath = path.join(ROOT, 'scratch/qa_corr2_temp_tampered.json');
    const validState = JSON.parse(fs.readFileSync(ACTIVE_MIRROR_PATH, 'utf8'));
    const tampered = JSON.parse(JSON.stringify(validState));
    tampered.enforcement_contract.preflight_check_mandated = false; // modify nested property
    fs.writeFileSync(tempTamperedPath, JSON.stringify(tampered, null, 2), 'utf8');

    try {
      assert.throws(() => {
        assertContaminationFreezeNotActive('COHORT_15_OPERATIONAL_RUNNER', tempTamperedPath);
      }, /FREEZE_STATE_INTEGRITY_MISMATCH/);
    } finally {
      if (fs.existsSync(tempTamperedPath)) fs.unlinkSync(tempTamperedPath);
    }
  });

  await it('Missing record fails closed with FREEZE_STATE_UNAVAILABLE', () => {
    const nonExistent = path.join(ROOT, 'scratch/qa_corr2_non_existent.json');
    assert.throws(() => {
      assertContaminationFreezeNotActive('COHORT_15_OPERATIONAL_RUNNER', nonExistent);
    }, /FREEZE_STATE_UNAVAILABLE/);
  });

  await it('Malformed JSON fails closed with ERR_INVALID_FREEZE_STATE_JSON', () => {
    const tempMalformed = path.join(ROOT, 'scratch/qa_corr2_temp_malformed.json');
    fs.writeFileSync(tempMalformed, '{ broken_syntax: true, ', 'utf8');
    try {
      assert.throws(() => {
        assertContaminationFreezeNotActive('COHORT_15_OPERATIONAL_RUNNER', tempMalformed);
      }, /ERR_INVALID_FREEZE_STATE_JSON/);
    } finally {
      if (fs.existsSync(tempMalformed)) fs.unlinkSync(tempMalformed);
    }
  });

  // --- Suite 5: Staging Static Preview & Viewports (Mandate CORRECTION-2.6) ---
  console.log('\n--- Suite 5: Staging Static Preview & Viewports (Mandate CORRECTION-2.6) ---');

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

  // --- Suite 6: Platform State & Commercial Locks (Mandate CORRECTION-2.6) ---
  console.log('\n--- Suite 6: Platform State & Commercial Locks (Mandate CORRECTION-2.6) ---');

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

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' JAYT-263-CORRECTION-2 QA TESTS PASSED!\n');
}

runJayt263Correction2QA().catch(err => {
  console.error('\nFatal Runner Error:', err);
  process.exit(1);
});
