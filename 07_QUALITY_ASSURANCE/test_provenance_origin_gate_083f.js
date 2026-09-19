/**
 * JAYT STRICT PROVENANCE ORIGIN & EVIDENCE GATE TEST (083F)
 * Directive: JAYT-083F-PROVENANCE-ORIGIN-GATE
 * 
 * Rules Enforced:
 * 1. Prohibits any synthetic/mock fixture from reaching READY_FOR_BATCH_REVIEW (fails closed).
 * 2. Positive lineage testing strictly uses genuine Chrome CDP captures on disk (Metiz batch_069_step2b).
 * 3. Enforces real capture_origin verification ('LIVE_CHROME_CDP_ANONYMOUS', 'REAL_BROWSER_CDP', etc.).
 * 4. Historical captures with unproven active rule strictly evaluate to LINEAGE_VALID_HISTORICAL_ONLY.
 * 5. Production catalog invariant locked [].
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const engine083f = require(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'multi_source_pipeline_083f', 'multi_source_triage_engine_083f.js'));
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

console.log('🧪 [JAYT-083F-TEST] Khởi chạy bộ kiểm thử Provenance Origin Gate & Lineage Thật 083F...\n');

let passedTests = 0;
const totalTests = 8;

function runTest(testName, testFn) {
  try {
    testFn();
    passedTests++;
    console.log(`  [${testName}]: [PASS]`);
  } catch (err) {
    console.error(`  [${testName}]: [FAIL] - ${err.message}`);
    process.exitCode = 1;
  }
}

// Reference authentic on-disk Chrome CDP receipt from batch_069_step2b
const realMetizReceiptRel = '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/FRESH_CAPTURE_RECEIPT_METIZ_SUPER_MONDAY.json';
const realMetizReceiptFull = path.join(repoRoot, realMetizReceiptRel);
const realMetizReceiptSha = crypto.createHash('sha256').update(fs.readFileSync(realMetizReceiptFull)).digest('hex');

// TEST 01: Negative - Any mock fixture path is strictly blocked fail-closed
runTest('TEST_01_NEGATIVE_MOCK_FIXTURE_PATH_STRICTLY_BLOCKED', () => {
  const signal = {
    id: 'SIG_083F_MOCK',
    cohort: 'CINEMA',
    brand: 'Cinema X',
    title: 'Mock Deal',
    source_url: 'https://cinema.vn/deal',
    evidence_bundle: {
      receipt_path: '07_QUALITY_ASSURANCE/mock_fixtures/fake_receipt.json',
      receipt_sha256: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    }
  };

  const evalResult = engine083f.evaluateSignalStrict083f(signal);
  assert.strictEqual(evalResult.binding_valid, false);
  assert.ok(evalResult.binding_failure_reason.includes('FORBIDDEN_EVIDENCE_PATH'));
  assert.strictEqual(evalResult.batch_decision, engine083f.BATCH_DECISIONS.NEEDS_RECHECK);
  assert.strictEqual(evalResult.is_ready_for_review, false);
});

// TEST 02: Negative - Prohibited self-declared validity_spec rejected
runTest('TEST_02_NEGATIVE_SELF_DECLARED_VALIDITY_SPEC_REJECTED', () => {
  const signal = {
    id: 'SIG_083F_INJECTED',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema Đà Nẵng',
    title: 'Super Monday',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    declared_level: engine083f.CONFIDENCE_LEVELS.LEVEL_B,
    validity_spec: {
      is_recurring: true,
      recurring_rule: 'THỨ HAI MỖI TUẦN'
    },
    evidence_bundle: {
      receipt_path: realMetizReceiptRel,
      receipt_sha256: realMetizReceiptSha
    }
  };

  const evalResult = engine083f.evaluateSignalStrict083f(signal);
  assert.strictEqual(evalResult.binding_valid, false);
  assert.ok(evalResult.binding_failure_reason.includes('VALIDITY_SPEC_NOT_RECEIPT_BOUND'));
  assert.strictEqual(evalResult.observed_points_count, 0);
  assert.strictEqual(evalResult.is_ready_for_review, false);
});

// TEST 03: Negative - Unverified capture_origin rejected
runTest('TEST_03_NEGATIVE_UNVERIFIED_CAPTURE_ORIGIN_REJECTED', () => {
  // Inspect behavior with unallowlisted origin check directly
  const unverifiedResult = engine083f.verifyReceiptProvenanceStrict083f({
    receipt_path: '05_DEAL_AND_AFFILIATE/candidates/evidence_snapshots/capture_receipt_CGV.json',
    receipt_sha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(repoRoot, '05_DEAL_AND_AFFILIATE/candidates/evidence_snapshots/capture_receipt_CGV.json'))).digest('hex'),
    signal_source_url: 'https://cgv.vn'
  });

  // Candidate snapshot receipt does not contain allowlisted capture_origin
  assert.strictEqual(unverifiedResult.valid, false);
  assert.ok(unverifiedResult.failure_reason.includes('PROVENANCE_ORIGIN_UNVERIFIED') || unverifiedResult.failure_reason.includes('FORBIDDEN_EVIDENCE_PATH'));
});

// TEST 04: Positive Lineage - Real Chrome CDP capture verifies physical evidence on disk
runTest('TEST_04_POSITIVE_REAL_CHROME_CDP_HISTORICAL_EVIDENCE_VERIFIED', () => {
  const signal = {
    id: 'SIG_083F_REAL_METIZ',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema Đà Nẵng',
    title: 'Super Monday — Thứ Hai Siêu Hạng',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    declared_level: engine083f.CONFIDENCE_LEVELS.LEVEL_B,
    is_account_locked: false,
    is_cart_dependent: false,
    evidence_bundle: {
      receipt_path: realMetizReceiptRel,
      receipt_sha256: realMetizReceiptSha,
      price_snippet: '55.000',
      conditions_snippet: 'xuất trình thẻ thành viên',
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema'
    }
  };

  const evalResult = engine083f.evaluateSignalStrict083f(signal);
  // Real Chrome CDP receipt has valid hash, LIVE_CHROME_CDP_ANONYMOUS origin, and real DOM HTML
  assert.strictEqual(evalResult.binding_valid, true);
  assert.strictEqual(evalResult.observed_points_count, 6, 'All 6 physical lineage points verified on disk');
  // Because realMetizReceipt has no active validity_spec written in its JSON, it strictly evaluates to LINEAGE_VALID_HISTORICAL_ONLY
  assert.strictEqual(evalResult.batch_decision, engine083f.BATCH_DECISIONS.LINEAGE_VALID_HISTORICAL_ONLY);
  assert.strictEqual(evalResult.is_historical_lineage_only, true);
  assert.strictEqual(evalResult.is_ready_for_review, false);
});

// TEST 05: Negative - Substring overlap snippets rejected on real artifact
runTest('TEST_05_NEGATIVE_SUBSTRING_OVERLAP_SNIPPETS_REJECTED', () => {
  const signal = {
    id: 'SIG_083F_OVERLAP',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema Đà Nẵng',
    title: 'Super Monday',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    declared_level: engine083f.CONFIDENCE_LEVELS.LEVEL_B,
    evidence_bundle: {
      receipt_path: realMetizReceiptRel,
      receipt_sha256: realMetizReceiptSha,
      price_snippet: '55.000 đồng/ vé 2D',
      conditions_snippet: '55.000 đồng', // Substring overlap!
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema'
    }
  };

  const evalResult = engine083f.evaluateSignalStrict083f(signal);
  assert.strictEqual(evalResult.binding_valid, true);
  assert.ok(evalResult.decision_reason.includes('SUBSTRING_OVERLAP_SNIPPETS'));
  assert.strictEqual(evalResult.batch_decision, engine083f.BATCH_DECISIONS.NEEDS_RECHECK);
  assert.strictEqual(evalResult.is_ready_for_review, false);
});

// TEST 06: Negative - URL mismatch fails closed
runTest('TEST_06_NEGATIVE_URL_MISMATCH_FAILS_CLOSED', () => {
  const signal = {
    id: 'SIG_083F_URL_MISMATCH',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema Đà Nẵng',
    title: 'Super Monday',
    source_url: 'https://metiz.vn/promotion/different-url-slug',
    declared_level: engine083f.CONFIDENCE_LEVELS.LEVEL_B,
    evidence_bundle: {
      receipt_path: realMetizReceiptRel,
      receipt_sha256: realMetizReceiptSha,
      price_snippet: '55.000',
      conditions_snippet: 'xuất trình thẻ thành viên',
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema'
    }
  };

  const evalResult = engine083f.evaluateSignalStrict083f(signal);
  assert.strictEqual(evalResult.binding_valid, false);
  assert.ok(evalResult.binding_failure_reason.includes('NORMALIZED_URL_MISMATCH'));
  assert.strictEqual(evalResult.batch_decision, engine083f.BATCH_DECISIONS.NEEDS_RECHECK);
});

// TEST 07: Negative - Level D community signal cannot auto-upgrade
runTest('TEST_07_NEGATIVE_LEVEL_D_COMMUNITY_CANNOT_AUTO_UPGRADE', () => {
  const signal = {
    id: 'SIG_083F_COMMUNITY',
    cohort: 'COMMUNITY',
    brand: 'Metiz',
    title: 'Tín Hiệu Cộng Đồng',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    declared_level: engine083f.CONFIDENCE_LEVELS.LEVEL_D,
    evidence_bundle: {
      receipt_path: realMetizReceiptRel,
      receipt_sha256: realMetizReceiptSha,
      price_snippet: '55.000',
      conditions_snippet: 'xuất trình thẻ thành viên',
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema'
    }
  };

  const evalResult = engine083f.evaluateSignalStrict083f(signal);
  assert.strictEqual(evalResult.batch_decision, engine083f.BATCH_DECISIONS.NEEDS_RECHECK);
  assert.strictEqual(evalResult.is_ready_for_review, false);
});

// TEST 08: Production Invariants Locked
runTest('TEST_08_PRODUCTION_INVARIANTS_LOCKED', () => {
  const feedContent = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
  assert.strictEqual(feedContent.length, 0, 'Production feed must remain []');

  const manifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  assert.strictEqual(manifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved must remain false');
});

console.log('\n======================================================');
if (passedTests === totalTests) {
  console.log(`🟢 [PROVENANCE-ORIGIN-083F-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [PROVENANCE-ORIGIN-083F-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
