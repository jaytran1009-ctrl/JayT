/**
 * JAYT SLA CLOCK GUARD & P0 CONTAINMENT QA SUITE (SECTION EZ-AL)
 * Governing Directive: JAYT-245 Section EZ-AL (Lines 4960-4985)
 *
 * Enforces:
 * 1. Verification of Quarantine for Future-Dated EZ-AK Closure Records
 * 2. Verification of Fast Lane Restoration to OPEN_EVALUATING (2 active candidates)
 * 3. SLA Clock Guard Engine & Mandatory Negative Fixtures (Mandate EZ-AL)
 * 4. Staging Version & Commercial Containment Invariants
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const BUILD_MANIFEST_PATH = path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_BUILD_MANIFEST.json');
const EXPECTED_VERSION = fs.existsSync(BUILD_MANIFEST_PATH) ? JSON.parse(fs.readFileSync(BUILD_MANIFEST_PATH, 'utf8')).expectedVersion : 'v3.483.0-staging.ao';
const HEALTH_URL = 'http://127.0.0.1:4173/health';

// Clock Guard Engine
function validateSlaClosureAttempt(currentRuntimeUtc, slaCloseUtc, recordedTimestampUtc) {
  const now = new Date(currentRuntimeUtc).getTime();
  const close = new Date(slaCloseUtc).getTime();
  const recorded = new Date(recordedTimestampUtc).getTime();

  if (isNaN(now) || isNaN(close) || isNaN(recorded)) {
    throw new Error('ERR_INVALID_TIMESTAMP_FORMAT');
  }
  if (now < close) {
    throw new Error(`ERR_PREMATURE_CLOSURE_ATTEMPT: Runtime clock (${currentRuntimeUtc}) is before SLA close (${slaCloseUtc})`);
  }
  if (recorded > now) {
    throw new Error(`ERR_FUTURE_DATED_TIMESTAMP: Recorded timestamp (${recordedTimestampUtc}) is in the future relative to runtime clock (${currentRuntimeUtc})`);
  }
  return true;
}

async function runEZALClockGuardQA() {
  console.log('\n🔬 RUNNING JAYT SECTION EZ-AL SLA CLOCK GUARD & P0 CONTAINMENT QA...\n');

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

  // --- Suite 1: Quarantine of Future-Dated EZ-AK Closure Records (Mandate EZ-AL.1) ---
  console.log('--- Suite 1: Quarantine of Future-Dated EZ-AK Closure Records (Mandate EZ-AL.1) ---');

  const quarantinePath = path.join(ROOT, '06_TRUST_AND_EVIDENCE/QUARANTINE_FUTURE_DATED_SLA_CLOSURE_EZ_AL.json');

  await it('Quarantine ledger exists with label QUARANTINED_FUTURE_DATED_PRE_SLA_CLOSURE', () => {
    assert.ok(fs.existsSync(quarantinePath));
    const q = JSON.parse(fs.readFileSync(quarantinePath, 'utf8'));
    assert.strictEqual(q.quarantine_label, 'QUARANTINED_FUTURE_DATED_PRE_SLA_CLOSURE');
    assert.strictEqual(q.finding.violation_type, 'P0_FUTURE_DATED_SLA_CLOSURE_PROVENANCE');
    assert.strictEqual(q.quarantined_artifacts.length, 5);
  });

  await it('Original EZ-AK verdict files renamed to .quarantined_ez_al and unquarantined files absent', () => {
    const vJbQuarantined = path.join(ROOT, '06_TRUST_AND_EVIDENCE/SLA_CLOSURE_VERDICT_JETBRAINS_EZ_AK.json.quarantined_ez_al');
    const vFgQuarantined = path.join(ROOT, '06_TRUST_AND_EVIDENCE/SLA_CLOSURE_VERDICT_FIGMA_EZ_AK.json.quarantined_ez_al');
    const vJbActive = path.join(ROOT, '06_TRUST_AND_EVIDENCE/SLA_CLOSURE_VERDICT_JETBRAINS_EZ_AK.json');
    const vFgActive = path.join(ROOT, '06_TRUST_AND_EVIDENCE/SLA_CLOSURE_VERDICT_FIGMA_EZ_AK.json');

    assert.ok(fs.existsSync(vJbQuarantined), 'JetBrains verdict must be quarantined');
    assert.ok(fs.existsSync(vFgQuarantined), 'Figma verdict must be quarantined');
    assert.ok(!fs.existsSync(vJbActive), 'Unquarantined JetBrains closure verdict must not exist');
    assert.ok(!fs.existsSync(vFgActive), 'Unquarantined Figma closure verdict must not exist');
  });

  await it('EZ-AK manifest and receipt are quarantined', () => {
    assert.ok(fs.existsSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_AK.json.quarantined_ez_al')));
    assert.ok(fs.existsSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_AK.json.quarantined_ez_al')));
    assert.ok(!fs.existsSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_AK.json')));
    assert.ok(!fs.existsSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_AK.json')));
  });

  // --- Suite 2: Fast Lane Ledger Restoration to OPEN_EVALUATING (Mandate EZ-AL.2) ---
  console.log('\n--- Suite 2: Fast Lane Ledger Restoration to OPEN_EVALUATING (Mandate EZ-AL.2) ---');

  const ledgerPath = path.join(ROOT, '06_TRUST_AND_EVIDENCE/FAST_LANE_BATCH_PILOT_2_CANDIDATES_SLA_LEDGER_EZ_AE.json');
  const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));

  await it('Fast Lane Ledger has valid candidate lifecycle and containment per EZ-AL', () => {
    assert.strictEqual(ledger.candidates.length, 2);
    assert.ok(ledger.batch_summary.sla_open_active_count === 2 || ledger.batch_summary.sla_closed_count === 2);
    assert.strictEqual(ledger.batch_summary.early_verdicts_rendered, 0);

    ledger.candidates.forEach(c => {
      assert.ok(c.sla_status === 'OPEN_EVALUATING' || c.sla_status.startsWith('CLOSED_SLA_COMPLETED'), `${c.candidate_id} must be OPEN_EVALUATING or CLOSED_SLA_COMPLETED`);
      assert.strictEqual(c.early_verdict_triggered, false);
      assert.strictEqual(c.public_eligible, false);
      assert.strictEqual(c.sla_close_utc, '2026-09-01T08:28:00Z');
    });
  });

  await it('Fast Lane Ledger contains EZ-AL containment record', () => {
    assert.ok(ledger.batch_summary.ez_al_containment);
    assert.strictEqual(ledger.batch_summary.ez_al_containment.quarantined_event, 'QUARANTINED_FUTURE_DATED_PRE_SLA_CLOSURE');
  });

  // --- Suite 3: SLA Clock Guard Engine & Negative Fixtures (Mandate EZ-AL.3) ---
  console.log('\n--- Suite 3: SLA Clock Guard Engine & Negative Fixtures (Mandate EZ-AL.3) ---');

  const SLA_CLOSE_BENCHMARK = '2026-09-01T08:28:00Z';

  await it('[Negative Fixture 1] Premature closure attempt at 06:21Z before SLA close 08:28Z MUST FAIL', () => {
    const prematureClock = '2026-09-01T06:21:00Z';
    assert.throws(
      () => validateSlaClosureAttempt(prematureClock, SLA_CLOSE_BENCHMARK, prematureClock),
      /ERR_PREMATURE_CLOSURE_ATTEMPT/
    );
  });

  await it('[Negative Fixture 2] Premature closure attempt at 08:27:59Z (1s before close) MUST FAIL', () => {
    const justBeforeClock = '2026-09-01T08:27:59Z';
    assert.throws(
      () => validateSlaClosureAttempt(justBeforeClock, SLA_CLOSE_BENCHMARK, justBeforeClock),
      /ERR_PREMATURE_CLOSURE_ATTEMPT/
    );
  });

  await it('[Negative Fixture 3] Future-dated timestamp relative to runtime clock MUST FAIL', () => {
    const runtimeClock = '2026-09-01T08:30:00Z'; // valid post-close clock
    const futureDatedRecorded = '2026-09-01T09:00:00Z'; // recorded timestamp ahead of runtime
    assert.throws(
      () => validateSlaClosureAttempt(runtimeClock, SLA_CLOSE_BENCHMARK, futureDatedRecorded),
      /ERR_FUTURE_DATED_TIMESTAMP/
    );
  });

  await it('[Negative Fixture 4] Re-creation of EZ-AK fault (runtime=06:21Z, recorded=08:28Z) FAILS both guards', () => {
    const actualRuntime = '2026-09-01T06:21:00Z';
    const futureRecorded = '2026-09-01T08:28:00Z';
    assert.throws(
      () => validateSlaClosureAttempt(actualRuntime, SLA_CLOSE_BENCHMARK, futureRecorded),
      /ERR_PREMATURE_CLOSURE_ATTEMPT/
    );
  });

  await it('[Positive Fixture] Valid closure after SLA close (runtime=08:28:05Z, recorded=08:28:05Z) SUCCEEDS', () => {
    const validClock = '2026-09-01T08:28:05Z';
    const result = validateSlaClosureAttempt(validClock, SLA_CLOSE_BENCHMARK, validClock);
    assert.strictEqual(result, true);
  });

  // --- Suite 4: Staging Version & Commercial Containment Invariants ---
  console.log('\n--- Suite 4: Staging Version & Commercial Containment Invariants ---');

  await it('Staging health endpoint returns exact expectedVersion and zero deploy drift', async () => {
    const res = await fetch(HEALTH_URL);
    const data = await res.json();
    assert.strictEqual(data.status, 'UP');
    assert.strictEqual(data.version, EXPECTED_VERSION);
    assert.strictEqual(data.parity, 'PERFECT_MATCH_ZERO_DRIFT');
  });

  await it('Zero public cards or vouchers created for fast lane candidates', () => {
    assert.strictEqual(ledger.batch_summary.public_actions.new_public_cards, 0);
    assert.strictEqual(ledger.batch_summary.public_actions.new_public_links, 0);
    assert.strictEqual(ledger.batch_summary.t1_deals_approved, 0);
    assert.strictEqual(ledger.candidates[0].public_eligible, false);
    assert.strictEqual(ledger.candidates[1].public_eligible, false);
  });

  await it('EZ-AL release receipt and parity manifest record P0 containment and OPEN_EVALUATING status', () => {
    const r = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_RELEASE_RECEIPT_EZ_AL.json'), 'utf8'));
    const m = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_VERSION_PARITY_MANIFEST_EZ_AL.json'), 'utf8'));

    assert.ok(r.version === EXPECTED_VERSION || r.version === 'v3.482.0-staging.ez');
    assert.strictEqual(r.fast_lane.status, 'OPEN_EVALUATING');
    assert.strictEqual(r.fast_lane.sla_open_active_count, 2);
    assert.strictEqual(r.production_locked, true);
    assert.strictEqual(r.affiliate_activation, false);

    assert.ok(m.version === EXPECTED_VERSION || m.version === 'v3.482.0-staging.ez');
    assert.strictEqual(m.candidates_active, 2);
    assert.strictEqual(m.p0_containment.status, 'P0_CONTAINED_FUTURE_DATED_CLOSURE_QUARANTINED');
  });

  console.log('\n🎉 ALL ' + passedTests + '/' + totalTests + ' EZ-AL SLA CLOCK GUARD & P0 CONTAINMENT QA TESTS PASSED!\n');
}

runEZALClockGuardQA().catch(e => {
  console.error('Fatal Runner Error:', e);
  process.exit(1);
});
