/**
 * JAYT STRICT RECEIPT-ONLY VALIDITY & SCHEMA TEST (083E)
 * Directive: JAYT-083E-RECEIPT-ONLY-VALIDITY
 * 
 * Verifies zero-trust validity enforcement (validity_spec must come exclusively from hashed receipt),
 * explicit literal artifact_type, snippet grounding, and Freshness TTL compliance.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const engine083e = require(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'multi_source_pipeline_083e', 'multi_source_triage_engine_083e.js'));
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

console.log('🧪 [JAYT-083E-TEST] Khởi chạy bộ kiểm thử Receipt-Only Validity & Schema Chặt Chẽ 083E...\n');

let passedTests = 0;
const totalTests = 11;

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

// Prepare dedicated test fixtures directory
const fixtureDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'mock_fixtures_083e');
if (fs.existsSync(fixtureDir)) {
  fs.rmSync(fixtureDir, { recursive: true, force: true });
}
fs.mkdirSync(fixtureDir, { recursive: true });

// Create a valid raw physical HTML snapshot
const sampleHtmlPath = path.join(fixtureDir, 'sample_cinema_promo_capture.html');
fs.writeFileSync(sampleHtmlPath, `<!DOCTYPE html>
<html>
<head><title>Metiz Cinema Promo</title></head>
<body>
  <h1>SUPER MONDAY TẠI METIZ CINEMA</h1>
  <p>Khởi động ngày thứ hai mỗi tuần cùng rạp Metiz Cinema.</p>
  <p>Giá vé ưu đãi chỉ 55.000 đồng.</p>
  <p>Điều kiện: Vui lòng xuất trình thẻ thành viên tại quầy vé.</p>
  <p>Chương trình áp dụng từ 2026-08-20 đến 2026-08-31.</p>
</body>
</html>`, 'utf8');
const sampleHtmlSha = crypto.createHash('sha256').update(fs.readFileSync(sampleHtmlPath)).digest('hex');

// TEST 01: Negative - Injected / Self-declared validity_spec in signal or evidence_bundle
runTest('TEST_01_NEGATIVE_INJECTED_VALIDITY_SPEC_FAILS_CLOSED', () => {
  const signal = {
    id: 'SIG_083E_01',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema',
    title: 'Super Monday',
    source_url: 'https://metiz.vn/promotion/super-monday',
    // Prohibited self-declared validity_spec
    validity_spec: {
      is_recurring: true,
      recurring_rule: 'THỨ HAI MỖI TUẦN'
    },
    evidence_bundle: {
      receipt_path: 'some_receipt.json',
      receipt_sha256: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    }
  };

  const evalResult = engine083e.evaluateSignalStrict083e(signal);
  assert.strictEqual(evalResult.binding_valid, false);
  assert.ok(evalResult.binding_failure_reason.includes('VALIDITY_SPEC_NOT_RECEIPT_BOUND'));
  assert.strictEqual(evalResult.observed_points_count, 0);
  assert.strictEqual(evalResult.is_ready_for_review, false);
});

// TEST 02: Negative - Receipt missing explicit literal artifact_type field
runTest('TEST_02_NEGATIVE_MISSING_EXPLICIT_ARTIFACT_TYPE_FAILS_CLOSED', () => {
  const noTypeReceiptPath = path.join(fixtureDir, 'receipt_missing_artifact_type.json');
  fs.writeFileSync(noTypeReceiptPath, JSON.stringify({
    receipt_id: 'RECEIPT_NO_EXPLICIT_TYPE',
    target_url: 'https://metiz.vn/promotion/super-monday',
    checked_at: '2026-08-24T06:30:00Z',
    artifact_path: path.relative(repoRoot, sampleHtmlPath).replace(/\\/g, '/'),
    artifact_sha256: sampleHtmlSha
    // artifact_type string field is missing
  }, null, 2), 'utf8');
  const recSha = crypto.createHash('sha256').update(fs.readFileSync(noTypeReceiptPath)).digest('hex');

  const signal = {
    id: 'SIG_083E_02',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema',
    title: 'Super Monday',
    source_url: 'https://metiz.vn/promotion/super-monday',
    evidence_bundle: {
      receipt_path: path.relative(repoRoot, noTypeReceiptPath).replace(/\\/g, '/'),
      receipt_sha256: recSha,
      price_snippet: '55.000',
      conditions_snippet: 'xuất trình thẻ thành viên',
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema'
    }
  };

  const evalResult = engine083e.evaluateSignalStrict083e(signal);
  assert.strictEqual(evalResult.binding_valid, false);
  assert.ok(evalResult.binding_failure_reason.includes('RECEIPT_MISSING_EXPLICIT_ARTIFACT_TYPE'));
});

// TEST 03: Negative - Unallowlisted artifact_type
runTest('TEST_03_NEGATIVE_UNALLOWLISTED_ARTIFACT_TYPE_FAILS_CLOSED', () => {
  const badTypeReceiptPath = path.join(fixtureDir, 'receipt_bad_artifact_type.json');
  fs.writeFileSync(badTypeReceiptPath, JSON.stringify({
    receipt_id: 'RECEIPT_BAD_TYPE',
    target_url: 'https://metiz.vn/promotion/super-monday',
    checked_at: '2026-08-24T06:30:00Z',
    artifact_path: path.relative(repoRoot, sampleHtmlPath).replace(/\\/g, '/'),
    artifact_sha256: sampleHtmlSha,
    artifact_type: 'unsupported_binary_format'
  }, null, 2), 'utf8');
  const recSha = crypto.createHash('sha256').update(fs.readFileSync(badTypeReceiptPath)).digest('hex');

  const signal = {
    id: 'SIG_083E_03',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema',
    title: 'Super Monday',
    source_url: 'https://metiz.vn/promotion/super-monday',
    evidence_bundle: {
      receipt_path: path.relative(repoRoot, badTypeReceiptPath).replace(/\\/g, '/'),
      receipt_sha256: recSha
    }
  };

  const evalResult = engine083e.evaluateSignalStrict083e(signal);
  assert.strictEqual(evalResult.binding_valid, false);
  assert.ok(evalResult.binding_failure_reason.includes('UNALLOWLISTED_ARTIFACT_TYPE'));
});

// TEST 04: Negative - Ungrounded validity rule in receipt
runTest('TEST_04_NEGATIVE_UNGROUNDED_VALIDITY_RULE_IN_RECEIPT', () => {
  const ungroundedReceiptPath = path.join(fixtureDir, 'receipt_ungrounded_rule.json');
  fs.writeFileSync(ungroundedReceiptPath, JSON.stringify({
    receipt_id: 'RECEIPT_UNGROUNDED',
    target_url: 'https://metiz.vn/promotion/super-monday',
    checked_at: '2026-08-24T06:30:00Z',
    artifact_path: path.relative(repoRoot, sampleHtmlPath).replace(/\\/g, '/'),
    artifact_sha256: sampleHtmlSha,
    artifact_type: 'dom_html',
    validity_spec: {
      deal_type: 'WEEKLY_RECURRING',
      is_recurring: true,
      recurring_rule: 'THỨ SÁU VUI VẺ' // Not in physical artifact!
    }
  }, null, 2), 'utf8');
  const recSha = crypto.createHash('sha256').update(fs.readFileSync(ungroundedReceiptPath)).digest('hex');

  const signal = {
    id: 'SIG_083E_04',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema',
    title: 'Super Monday',
    source_url: 'https://metiz.vn/promotion/super-monday',
    declared_level: engine083e.CONFIDENCE_LEVELS.LEVEL_B,
    evidence_bundle: {
      receipt_path: path.relative(repoRoot, ungroundedReceiptPath).replace(/\\/g, '/'),
      receipt_sha256: recSha,
      price_snippet: '55.000',
      conditions_snippet: 'xuất trình thẻ thành viên',
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema'
    }
  };

  const evalResult = engine083e.evaluateSignalStrict083e(signal, { refDate: new Date('2026-08-24T20:30:00Z') });
  assert.strictEqual(evalResult.binding_valid, true);
  assert.strictEqual(evalResult.temporal_validity.is_active, false);
  assert.ok(evalResult.temporal_validity.reason.includes('VALIDITY_SNIPPET_UNGROUNDED'));
  assert.strictEqual(evalResult.batch_decision, engine083e.BATCH_DECISIONS.LINEAGE_VALID_HISTORICAL_ONLY);
});

// TEST 05: Negative - Weekly recurring exceeded 7-day TTL
runTest('TEST_05_NEGATIVE_WEEKLY_RECURRING_EXCEEDED_TTL_7D', () => {
  const recurringReceiptPath = path.join(fixtureDir, 'receipt_recurring_valid.json');
  fs.writeFileSync(recurringReceiptPath, JSON.stringify({
    receipt_id: 'RECEIPT_RECURRING_VALID',
    target_url: 'https://metiz.vn/promotion/super-monday',
    checked_at: '2026-08-10T06:30:00Z', // Captured 14 days before refDate
    artifact_path: path.relative(repoRoot, sampleHtmlPath).replace(/\\/g, '/'),
    artifact_sha256: sampleHtmlSha,
    artifact_type: 'dom_html',
    validity_spec: {
      deal_type: 'WEEKLY_RECURRING',
      is_recurring: true,
      recurring_rule: 'THỨ HAI MỖI TUẦN'
    }
  }, null, 2), 'utf8');
  const recSha = crypto.createHash('sha256').update(fs.readFileSync(recurringReceiptPath)).digest('hex');

  const signal = {
    id: 'SIG_083E_05',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema',
    title: 'Super Monday',
    source_url: 'https://metiz.vn/promotion/super-monday',
    declared_level: engine083e.CONFIDENCE_LEVELS.LEVEL_B,
    evidence_bundle: {
      receipt_path: path.relative(repoRoot, recurringReceiptPath).replace(/\\/g, '/'),
      receipt_sha256: recSha,
      price_snippet: '55.000',
      conditions_snippet: 'xuất trình thẻ thành viên',
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema'
    }
  };

  const evalResult = engine083e.evaluateSignalStrict083e(signal, { refDate: new Date('2026-08-24T20:30:00Z') });
  assert.strictEqual(evalResult.binding_valid, true);
  assert.strictEqual(evalResult.temporal_validity.is_active, false);
  assert.ok(evalResult.temporal_validity.reason.includes('RECURRING_DEAL_EXCEEDED_7D_TTL'));
  assert.strictEqual(evalResult.batch_decision, engine083e.BATCH_DECISIONS.LINEAGE_VALID_HISTORICAL_ONLY);
});

// TEST 06: Negative - Daily deal exceeded 24-hour TTL
runTest('TEST_06_NEGATIVE_DAILY_DEAL_EXCEEDED_TTL_24H', () => {
  const dailyReceiptPath = path.join(fixtureDir, 'receipt_daily_valid.json');
  fs.writeFileSync(dailyReceiptPath, JSON.stringify({
    receipt_id: 'RECEIPT_DAILY_VALID',
    target_url: 'https://metiz.vn/promotion/super-monday',
    checked_at: '2026-08-22T06:30:00Z', // Captured 62 hours before refDate
    artifact_path: path.relative(repoRoot, sampleHtmlPath).replace(/\\/g, '/'),
    artifact_sha256: sampleHtmlSha,
    artifact_type: 'dom_html',
    validity_spec: {
      deal_type: 'DAILY_DEAL',
      is_recurring: false
    }
  }, null, 2), 'utf8');
  const recSha = crypto.createHash('sha256').update(fs.readFileSync(dailyReceiptPath)).digest('hex');

  const signal = {
    id: 'SIG_083E_06',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema',
    title: 'Flash Sale',
    source_url: 'https://metiz.vn/promotion/super-monday',
    declared_level: engine083e.CONFIDENCE_LEVELS.LEVEL_B,
    evidence_bundle: {
      receipt_path: path.relative(repoRoot, dailyReceiptPath).replace(/\\/g, '/'),
      receipt_sha256: recSha,
      price_snippet: '55.000',
      conditions_snippet: 'xuất trình thẻ thành viên',
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema'
    }
  };

  const evalResult = engine083e.evaluateSignalStrict083e(signal, { refDate: new Date('2026-08-24T20:30:00Z') });
  assert.strictEqual(evalResult.temporal_validity.is_active, false);
  assert.ok(evalResult.temporal_validity.reason.includes('DAILY_DEAL_EXCEEDED_TTL_24H'));
  assert.strictEqual(evalResult.batch_decision, engine083e.BATCH_DECISIONS.LINEAGE_VALID_HISTORICAL_ONLY);
});

// TEST 07: Negative - Expired valid_to date in receipt
runTest('TEST_07_NEGATIVE_EXPIRED_VALID_TO_DATE_IN_RECEIPT', () => {
  const expiredReceiptPath = path.join(fixtureDir, 'receipt_expired_valid_to.json');
  fs.writeFileSync(expiredReceiptPath, JSON.stringify({
    receipt_id: 'RECEIPT_EXPIRED_DATE',
    target_url: 'https://metiz.vn/promotion/super-monday',
    checked_at: '2026-08-24T06:30:00Z',
    artifact_path: path.relative(repoRoot, sampleHtmlPath).replace(/\\/g, '/'),
    artifact_sha256: sampleHtmlSha,
    artifact_type: 'dom_html',
    validity_spec: {
      valid_to: '2026-08-10' // Expired relative to 2026-08-24
    }
  }, null, 2), 'utf8');
  const recSha = crypto.createHash('sha256').update(fs.readFileSync(expiredReceiptPath)).digest('hex');

  const signal = {
    id: 'SIG_083E_07',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema',
    title: 'Expired Deal',
    source_url: 'https://metiz.vn/promotion/super-monday',
    declared_level: engine083e.CONFIDENCE_LEVELS.LEVEL_B,
    evidence_bundle: {
      receipt_path: path.relative(repoRoot, expiredReceiptPath).replace(/\\/g, '/'),
      receipt_sha256: recSha,
      price_snippet: '55.000',
      conditions_snippet: 'xuất trình thẻ thành viên',
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema'
    }
  };

  const evalResult = engine083e.evaluateSignalStrict083e(signal, { refDate: new Date('2026-08-24T20:30:00Z') });
  assert.strictEqual(evalResult.temporal_validity.is_active, false);
  assert.ok(evalResult.temporal_validity.reason.includes('OFFER_EXPIRED'));
  assert.strictEqual(evalResult.batch_decision, engine083e.BATCH_DECISIONS.LINEAGE_VALID_HISTORICAL_ONLY);
});

// TEST 08: Positive - Genuine fresh receipt-bound recurring deal passes
runTest('TEST_08_POSITIVE_GENUINE_FRESH_RECEIPT_BOUND_RECURRING_PASSES', () => {
  const freshRecurringReceiptPath = path.join(fixtureDir, 'receipt_fresh_recurring_valid.json');
  fs.writeFileSync(freshRecurringReceiptPath, JSON.stringify({
    receipt_id: 'RECEIPT_FRESH_RECURRING',
    target_url: 'https://metiz.vn/promotion/super-monday',
    checked_at: '2026-08-24T06:30:00Z', // Captured 14 hours ago (<= 7d)
    artifact_path: path.relative(repoRoot, sampleHtmlPath).replace(/\\/g, '/'),
    artifact_sha256: sampleHtmlSha,
    artifact_type: 'dom_html',
    validity_spec: {
      deal_type: 'WEEKLY_RECURRING',
      is_recurring: true,
      recurring_rule: 'thứ hai mỗi tuần'
    }
  }, null, 2), 'utf8');
  const recSha = crypto.createHash('sha256').update(fs.readFileSync(freshRecurringReceiptPath)).digest('hex');

  const signal = {
    id: 'SIG_083E_08',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema Đà Nẵng',
    title: 'Super Monday — Thứ Hai Siêu Hạng',
    source_url: 'https://metiz.vn/promotion/super-monday',
    declared_level: engine083e.CONFIDENCE_LEVELS.LEVEL_B,
    is_account_locked: false,
    is_cart_dependent: false,
    evidence_bundle: {
      receipt_path: path.relative(repoRoot, freshRecurringReceiptPath).replace(/\\/g, '/'),
      receipt_sha256: recSha,
      price_snippet: '55.000',
      conditions_snippet: 'xuất trình thẻ thành viên',
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema'
    }
  };

  const evalResult = engine083e.evaluateSignalStrict083e(signal, { refDate: new Date('2026-08-24T20:30:00Z') });
  assert.strictEqual(evalResult.binding_valid, true);
  assert.strictEqual(evalResult.observed_points_count, 6);
  assert.strictEqual(evalResult.temporal_validity.is_active, true);
  assert.strictEqual(evalResult.batch_decision, engine083e.BATCH_DECISIONS.READY_FOR_BATCH_REVIEW);
  assert.strictEqual(evalResult.is_ready_for_review, true);
});

// TEST 09: Positive - Fresh receipt-bound specific valid_to passes
runTest('TEST_09_POSITIVE_GENUINE_FRESH_RECEIPT_BOUND_FUTURE_VALID_TO_PASSES', () => {
  const freshDateReceiptPath = path.join(fixtureDir, 'receipt_fresh_date_valid.json');
  fs.writeFileSync(freshDateReceiptPath, JSON.stringify({
    receipt_id: 'RECEIPT_FRESH_DATE',
    target_url: 'https://metiz.vn/promotion/super-monday',
    checked_at: '2026-08-24T06:30:00Z', // Captured 14 hours ago (<= 30d)
    artifact_path: path.relative(repoRoot, sampleHtmlPath).replace(/\\/g, '/'),
    artifact_sha256: sampleHtmlSha,
    artifact_type: 'dom_html',
    validity_spec: {
      valid_to: '2026-08-31' // 7 days in future
    }
  }, null, 2), 'utf8');
  const recSha = crypto.createHash('sha256').update(fs.readFileSync(freshDateReceiptPath)).digest('hex');

  const signal = {
    id: 'SIG_083E_09',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema Đà Nẵng',
    title: 'Super Monday',
    source_url: 'https://metiz.vn/promotion/super-monday',
    declared_level: engine083e.CONFIDENCE_LEVELS.LEVEL_B,
    evidence_bundle: {
      receipt_path: path.relative(repoRoot, freshDateReceiptPath).replace(/\\/g, '/'),
      receipt_sha256: recSha,
      price_snippet: '55.000',
      conditions_snippet: 'xuất trình thẻ thành viên',
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema'
    }
  };

  const evalResult = engine083e.evaluateSignalStrict083e(signal, { refDate: new Date('2026-08-24T20:30:00Z') });
  assert.strictEqual(evalResult.binding_valid, true);
  assert.strictEqual(evalResult.temporal_validity.is_active, true);
  assert.strictEqual(evalResult.batch_decision, engine083e.BATCH_DECISIONS.READY_FOR_BATCH_REVIEW);
  assert.strictEqual(evalResult.is_ready_for_review, true);
});

// TEST 10: Negative - Level D community signal cannot auto-upgrade
runTest('TEST_10_NEGATIVE_LEVEL_D_COMMUNITY_CANNOT_AUTO_UPGRADE', () => {
  const freshRecurringReceiptPath = path.join(fixtureDir, 'receipt_fresh_recurring_valid.json');
  const recSha = crypto.createHash('sha256').update(fs.readFileSync(freshRecurringReceiptPath)).digest('hex');

  const signal = {
    id: 'SIG_083E_10',
    cohort: 'COMMUNITY',
    brand: 'Metiz',
    title: 'Tín Hiệu Cộng Đồng',
    source_url: 'https://metiz.vn/promotion/super-monday',
    declared_level: engine083e.CONFIDENCE_LEVELS.LEVEL_D,
    evidence_bundle: {
      receipt_path: path.relative(repoRoot, freshRecurringReceiptPath).replace(/\\/g, '/'),
      receipt_sha256: recSha,
      price_snippet: '55.000',
      conditions_snippet: 'xuất trình thẻ thành viên',
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema'
    }
  };

  const evalResult = engine083e.evaluateSignalStrict083e(signal);
  assert.strictEqual(evalResult.batch_decision, engine083e.BATCH_DECISIONS.NEEDS_RECHECK);
  assert.strictEqual(evalResult.is_ready_for_review, false);
});

// TEST 11: Production Invariants Locked
runTest('TEST_11_PRODUCTION_INVARIANTS_LOCKED', () => {
  const feedContent = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
  assert.strictEqual(feedContent.length, 0, 'Production feed must remain []');

  const manifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  assert.strictEqual(manifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved must remain false');
});

// Cleanup fixture directory after tests
fs.rmSync(fixtureDir, { recursive: true, force: true });

console.log('\n======================================================');
if (passedTests === totalTests) {
  console.log(`🟢 [RECEIPT-ONLY-VALIDITY-083E-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [RECEIPT-ONLY-VALIDITY-083E-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
