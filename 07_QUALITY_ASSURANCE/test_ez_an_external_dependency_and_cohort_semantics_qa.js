/**
 * JAYT EXTERNAL DEPENDENCY ELIMINATION & PRE-SLA COHORT SEMANTICS QA SUITE (SECTION EZ-AN)
 * Governing Directive: JAYT-245 Section EZ-AN (Lines 5018-5046)
 *
 * Verifies:
 * 1. Zero third-party network requests on staging page load (audit all request URLs)
 * 2. Zero console errors across 1440, 768, 390 viewports with NO suppression or filtering
 * 3. Cohort ledger contains strictly 0 tier / interim verdicts for candidates in OPEN_EVALUATING
 * 4. BHD candidate has INTAKE_FAILED_NO_RAW with 0 tier
 * 5. Negative Fixtures: Any OPEN candidate or aggregate containing a tier verdict before close FAILS gate
 * 6. SOT vs Served HTML SHA-256 Parity and Staging Health
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

// Validation engine enforcing pre-SLA semantics
function validatePreSlaCandidateSemantics(candidate) {
  if (candidate.status === 'OPEN_EVALUATING') {
    if (candidate.interim_assessment) {
      throw new Error(`ERR_PRE_SLA_TIER_FORBIDDEN: Candidate ${candidate.candidate_id} has interim_assessment (${candidate.interim_assessment}) before SLA close`);
    }
    if (candidate.verdict_tier) {
      throw new Error(`ERR_PRE_SLA_TIER_FORBIDDEN: Candidate ${candidate.candidate_id} has verdict_tier (${candidate.verdict_tier}) before SLA close`);
    }
    if (candidate.tier_verdict) {
      throw new Error(`ERR_PRE_SLA_TIER_FORBIDDEN: Candidate ${candidate.candidate_id} has tier_verdict before SLA close`);
    }
  }
  return true;
}

function validatePreSlaBatchSummary(batchSummary) {
  const forbiddenKeys = ['t1_deals_approved', 't2_programs_approved', 't4_held_internal', 'unreachable_held_internal', 'fail_closed_closed_count'];
  for (const key of forbiddenKeys) {
    if (batchSummary[key] !== undefined) {
      throw new Error(`ERR_PRE_SLA_TIER_AGGREGATE_FORBIDDEN: Batch summary contains premature tier aggregate ${key}`);
    }
  }
  return true;
}

async function runEZANCorrectionQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-AN EXTERNAL DEPENDENCY & PRE-SLA SEMANTICS QA...\n');

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

  const ledgerPath = path.join(ROOT, '06_TRUST_AND_EVIDENCE/COHORT_CINEMA_TRANSIT_15_CANDIDATES_LEDGER_EZ_AM.json');
  assert.ok(fs.existsSync(ledgerPath), 'Cohort ledger must exist');
  const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));

  // --- Suite 1: Clean Pre-SLA Cohort Semantics (Mandate EZ-AN.3) ---
  console.log('--- Suite 1: Clean Pre-SLA Cohort Semantics (Mandate EZ-AN.3) ---');

  await it('All 14 reachable candidates in OPEN_EVALUATING have missing_fields and preclosure_block_reason with zero tier labels', () => {
    const openCands = ledger.candidates.filter(c => c.status === 'OPEN_EVALUATING');
    assert.strictEqual(openCands.length, 14);

    openCands.forEach(c => {
      assert.strictEqual(c.sla_status, 'OPEN_EVALUATING');
      assert.ok(Array.isArray(c.missing_fields) && c.missing_fields.length > 0);
      assert.ok(c.preclosure_block_reason && typeof c.preclosure_block_reason === 'string');
      assert.strictEqual(c.interim_assessment, undefined, `${c.candidate_id} must not have interim_assessment`);
      assert.strictEqual(c.verdict_tier, undefined, `${c.candidate_id} must not have verdict_tier`);
      assert.strictEqual(c.tier_verdict, undefined, `${c.candidate_id} must not have tier_verdict`);
      validatePreSlaCandidateSemantics(c);
    });
  });

  await it('BHD Star candidate has status INTAKE_FAILED_NO_RAW with zero tier, not counted as closure or verdict', () => {
    const bhd = ledger.candidates.find(c => c.candidate_id === 'COHORT_EZ_AM_04');
    assert.ok(bhd);
    assert.strictEqual(bhd.status, 'INTAKE_FAILED_NO_RAW');
    assert.strictEqual(bhd.sla_status, 'INTAKE_FAILED_NO_RAW');
    assert.strictEqual(bhd.http_status, 0);
    assert.strictEqual(bhd.raw_byte_length, 0);
    assert.strictEqual(bhd.public_eligible, false);
    assert.strictEqual(bhd.interim_assessment, undefined);
    assert.strictEqual(bhd.verdict_tier, undefined);
    assert.ok(bhd.preclosure_block_reason.includes('ECONNREFUSED'));
  });

  await it('Batch summary contains zero premature tier aggregates', () => {
    validatePreSlaBatchSummary(ledger.batch_summary);
    assert.strictEqual(ledger.batch_summary.total_candidates, 15);
    assert.strictEqual(ledger.batch_summary.raw_captured_success, 14);
    assert.strictEqual(ledger.batch_summary.intake_failed_no_raw_count, 1);
    assert.strictEqual(ledger.batch_summary.sla_open_evaluating_count, 14);
    assert.strictEqual(ledger.batch_summary.early_verdicts_rendered, 0);
    assert.strictEqual(ledger.batch_summary.public_eligible_count, 0);
  });

  // --- Suite 2: Negative Fixtures for Pre-SLA Semantics (Mandate EZ-AN.3) ---
  console.log('\n--- Suite 2: Negative Fixtures for Pre-SLA Semantics (Mandate EZ-AN.3) ---');

  await it('[Negative Fixture 1] Open candidate with interim_assessment (recreating EZ-AM fault) MUST FAIL gate', () => {
    const faultyCand = {
      candidate_id: 'TEST_FAULTY_01',
      status: 'OPEN_EVALUATING',
      interim_assessment: 'T4_DESCRIPTIVE_ONLY_HELD_INTERNAL'
    };
    assert.throws(
      () => validatePreSlaCandidateSemantics(faultyCand),
      /ERR_PRE_SLA_TIER_FORBIDDEN/
    );
  });

  await it('[Negative Fixture 2] Open candidate with verdict_tier (recreating premature verdict fault) MUST FAIL gate', () => {
    const faultyCand = {
      candidate_id: 'TEST_FAULTY_02',
      status: 'OPEN_EVALUATING',
      verdict_tier: 'T2_DOCUMENTATION'
    };
    assert.throws(
      () => validatePreSlaCandidateSemantics(faultyCand),
      /ERR_PRE_SLA_TIER_FORBIDDEN/
    );
  });

  await it('[Negative Fixture 3] Batch summary presenting tier counts before close MUST FAIL gate', () => {
    const faultySummary = {
      total_candidates: 15,
      t4_held_internal: 14 // forbidden premature aggregate
    };
    assert.throws(
      () => validatePreSlaBatchSummary(faultySummary),
      /ERR_PRE_SLA_TIER_AGGREGATE_FORBIDDEN/
    );
  });

  // --- Suite 3: External Dependency Elimination & Zero Console Errors (Mandate EZ-AN.2) ---
  console.log('\n--- Suite 3: External Dependency Elimination & Zero Console Errors (Mandate EZ-AN.2) ---');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    const interceptedRequests = [];
    const consoleErrors = [];

    // Track all network requests strictly
    page.on('request', req => {
      interceptedRequests.push(req.url());
    });

    // Collect all console messages of type error WITHOUT ANY FILTERING OR SUPPRESSION
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Also catch any page-level unhandled errors
    page.on('pageerror', err => {
      consoleErrors.push(err.message);
    });

    await page.goto(STAGING_URL, { waitUntil: 'networkidle0' });

    await it('[Request Audit] 100% of network requests on page load are local (ZERO third-party fonts/CDNs)', () => {
      assert.ok(interceptedRequests.length > 0, 'Must have recorded requests');
      interceptedRequests.forEach(reqUrl => {
        assert.ok(
          reqUrl.startsWith('http://127.0.0.1:4173') || reqUrl.startsWith('http://localhost:4173'),
          `Third-party request detected: ${reqUrl}`
        );
        assert.ok(!reqUrl.includes('googleapis.com'), `Google Fonts API requested: ${reqUrl}`);
        assert.ok(!reqUrl.includes('gstatic.com'), `Google Fonts Static requested: ${reqUrl}`);
      });
    });

    await it('[Browser Desktop 1440] Zero console errors during full page lifecycle (NO filtering)', async () => {
      await page.setViewport({ width: 1440, height: 900 });
      assert.strictEqual(consoleErrors.length, 0, `Console errors on 1440: ${consoleErrors.join('; ')}`);
    });

    await it('[Browser Tablet 768] Zero console errors on tablet viewport', async () => {
      await page.setViewport({ width: 768, height: 1024 });
      await page.reload({ waitUntil: 'networkidle0' });
      assert.strictEqual(consoleErrors.length, 0, `Console errors on 768: ${consoleErrors.join('; ')}`);
    });

    await it('[Browser Mobile 390] Zero console errors on mobile viewport', async () => {
      await page.setViewport({ width: 390, height: 844 });
      await page.reload({ waitUntil: 'networkidle0' });
      assert.strictEqual(consoleErrors.length, 0, `Console errors on 390: ${consoleErrors.join('; ')}`);
    });
  } finally {
    await browser.close();
  }

  // --- Suite 4: Parity, Build Manifest & Staging Health Invariants ---
  console.log('\n--- Suite 4: Parity, Build Manifest & Staging Health Invariants ---');

  const sotHtmlPath = path.join(ROOT, '03_SOURCE_OF_TRUTH/index.html');
  const depHtmlPath = path.join(ROOT, 'staging_deploy_ey/index.html');
  const sotHtmlSha = crypto.createHash('sha256').update(fs.readFileSync(sotHtmlPath)).digest('hex');
  const depHtmlSha = crypto.createHash('sha256').update(fs.readFileSync(depHtmlPath)).digest('hex');

  await it('SOT HTML and Served HTML have identical SHA-256 (ZERO DEPLOY DRIFT after font removal)', () => {
    assert.strictEqual(sotHtmlSha, depHtmlSha);
    const htmlContent = fs.readFileSync(sotHtmlPath, 'utf8');
    assert.ok(!htmlContent.includes('fonts.googleapis.com'), 'SOT HTML must not contain Google Fonts');
    assert.ok(!htmlContent.includes('fonts.gstatic.com'), 'SOT HTML must not contain Google Fonts');
  });

  await it('Live staging health endpoint returns exact expectedVersion and PERFECT_MATCH_ZERO_DRIFT', async () => {
    const res = await fetch(HEALTH_URL);
    const data = await res.json();
    assert.strictEqual(data.status, 'UP');
    assert.strictEqual(data.version, EXPECTED_VERSION);
    assert.strictEqual(data.parity, 'PERFECT_MATCH_ZERO_DRIFT');
  });

  await it('EZ-AN parity manifest and release receipt record external dependency elimination', () => {
    const m = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_AN.json'), 'utf8'));
    const r = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_AN.json'), 'utf8'));

    assert.ok(m.version === EXPECTED_VERSION || m.version === 'v3.482.0-staging.ez');
    assert.strictEqual(m.external_dependency_audit.third_party_fonts, 'REMOVED_COMPLETELY');
    assert.strictEqual(m.external_dependency_audit.external_network_requests_on_load, 0);
    assert.strictEqual(m.cohort_semantics.open_evaluating_count, 14);
    assert.strictEqual(m.cohort_semantics.intake_failed_no_raw_count, 1);

    assert.ok(r.version === EXPECTED_VERSION || r.version === 'v3.482.0-staging.ez');
    assert.strictEqual(r.external_requests_on_load, 0);
    assert.strictEqual(r.cohort_15_candidates.open_evaluating, 14);
    assert.strictEqual(r.cohort_15_candidates.intake_failed_no_raw, 1);
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-AN EXTERNAL DEPENDENCY & PRE-SLA SEMANTICS QA TESTS PASSED!\n');
}

runEZANCorrectionQA().catch(e => {
  console.error('Fatal Runner Error:', e);
  process.exit(1);
});
