/**
 * JAYT STRICT ACTIVE VALIDITY & RECEIPT SCHEMA TEST (083D)
 * Directive: JAYT-083D-ACTIVE-VALIDITY-AND-RECEIPT-SCHEMA
 * 
 * Verifies mandatory allowlisted artifact_type, freshness TTL limits (24h/7d/30d),
 * evidence-bound validity rules, snippet error reporting, and fail-closed classification.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const engine083d = require(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'multi_source_pipeline_083d', 'multi_source_triage_engine_083d.js'));
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

console.log('🧪 [JAYT-083D-TEST] Khởi chạy bộ kiểm thử Active Validity & Schema Hoàn Chỉnh 083D...\n');

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

const metizReceiptRel = '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/FRESH_CAPTURE_RECEIPT_METIZ_SUPER_MONDAY.json';
const metizReceiptFull = path.join(repoRoot, metizReceiptRel);
const metizReceiptSha = crypto.createHash('sha256').update(fs.readFileSync(metizReceiptFull)).digest('hex');

// TEST 01: Negative - Missing or unallowlisted artifact_type
runTest('TEST_01_NEGATIVE_MISSING_OR_INVALID_ARTIFACT_TYPE_REJECTED', () => {
  const tempDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'mock_fixtures_083d');
  fs.mkdirSync(tempDir, { recursive: true });

  const tempArtifact = path.join(tempDir, 'fixture_bad_type.bin');
  fs.writeFileSync(tempArtifact, 'binary content', 'utf8');
  const artSha = crypto.createHash('sha256').update(fs.readFileSync(tempArtifact)).digest('hex');

  const tempReceipt = path.join(tempDir, 'fixture_bad_type_receipt.json');
  fs.writeFileSync(tempReceipt, JSON.stringify({
    receipt_id: 'RECEIPT_BAD_TYPE',
    target_url: 'https://cinema.vn/deal',
    checked_at: '2026-08-24T12:00:00Z',
    artifact_path: path.relative(repoRoot, tempArtifact).replace(/\\/g, '/'),
    artifact_sha256: artSha,
    artifact_type: 'unknown_binary_exe' // Invalid!
  }, null, 2), 'utf8');
  const recSha = crypto.createHash('sha256').update(fs.readFileSync(tempReceipt)).digest('hex');

  const signal = {
    id: 'SIG_083D_01',
    cohort: 'CINEMA',
    brand: 'Cinema X',
    title: 'Deal',
    source_url: 'https://cinema.vn/deal',
    evidence_bundle: {
      receipt_path: path.relative(repoRoot, tempReceipt).replace(/\\/g, '/'),
      receipt_sha256: recSha
    }
  };

  const evalResult = engine083d.evaluateSignalStrict083d(signal);
  fs.rmSync(tempDir, { recursive: true, force: true });

  assert.strictEqual(evalResult.binding_valid, false);
  assert.ok(evalResult.binding_failure_reason.includes('INVALID_OR_MISSING_ARTIFACT_TYPE'));
});

// TEST 02: Negative - Self-declared recurring rule without evidence-bound validity spec
runTest('TEST_02_NEGATIVE_UNSUPPORTED_SELF_DECLARED_RECURRING_RULE', () => {
  const signal = {
    id: 'SIG_083D_02',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema',
    title: 'Super Monday',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    declared_level: engine083d.CONFIDENCE_LEVELS.LEVEL_B,
    evidence_bundle: {
      receipt_path: metizReceiptRel,
      receipt_sha256: metizReceiptSha,
      price_snippet: '55.000',
      conditions_snippet: 'xuất trình thẻ thành viên',
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema'
      // No validity_spec bound in evidence bundle
    }
  };

  const evalResult = engine083d.evaluateSignalStrict083d(signal);
  assert.strictEqual(evalResult.binding_valid, true);
  assert.strictEqual(evalResult.temporal_validity.is_active, false);
  assert.strictEqual(evalResult.batch_decision, engine083d.BATCH_DECISIONS.LINEAGE_VALID_HISTORICAL_ONLY);
  assert.strictEqual(evalResult.is_ready_for_review, false);
});

// TEST 03: Negative - Weekly recurring exceeded 7-day TTL
runTest('TEST_03_NEGATIVE_WEEKLY_RECURRING_EXCEEDED_TTL_7D', () => {
  // Capture timestamp: 2026-08-01 (23 days before refDate 2026-08-24)
  const signal = {
    id: 'SIG_083D_03',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema Đà Nẵng',
    title: 'Super Monday',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    declared_level: engine083d.CONFIDENCE_LEVELS.LEVEL_B,
    evidence_bundle: {
      receipt_path: metizReceiptRel,
      receipt_sha256: metizReceiptSha,
      price_snippet: '55.000',
      conditions_snippet: 'xuất trình thẻ thành viên',
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema',
      validity_spec: {
        deal_type: 'WEEKLY_RECURRING',
        is_recurring: true,
        recurring_rule: 'THỨ HAI MỖI TUẦN'
      }
    }
  };

  // Metiz receipt checked_at was 2026-08-24T06:32:50Z.
  // Evaluate at refDate = 2026-09-05 (12 days later > 7d TTL)
  const evalResult = engine083d.evaluateSignalStrict083d(signal, { refDate: new Date('2026-09-05T12:00:00Z') });
  assert.strictEqual(evalResult.binding_valid, true);
  assert.strictEqual(evalResult.temporal_validity.is_active, false);
  assert.ok(evalResult.temporal_validity.reason.includes('RECURRING_DEAL_EXCEEDED_7D_TTL'));
  assert.strictEqual(evalResult.batch_decision, engine083d.BATCH_DECISIONS.LINEAGE_VALID_HISTORICAL_ONLY);
});

// TEST 04: Negative - Daily deal exceeded 24-hour TTL
runTest('TEST_04_NEGATIVE_DAILY_DEAL_EXCEEDED_TTL_24H', () => {
  const signal = {
    id: 'SIG_083D_04',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema Đà Nẵng',
    title: 'Flash Sale Ngày',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    declared_level: engine083d.CONFIDENCE_LEVELS.LEVEL_B,
    evidence_bundle: {
      receipt_path: metizReceiptRel,
      receipt_sha256: metizReceiptSha,
      price_snippet: '55.000',
      conditions_snippet: 'xuất trình thẻ thành viên',
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema',
      validity_spec: {
        deal_type: 'DAILY_DEAL',
        is_recurring: false
      }
    }
  };

  // Evaluate at refDate = 2026-08-26T06:32:50Z (48 hours after capture > 24h TTL)
  const evalResult = engine083d.evaluateSignalStrict083d(signal, { refDate: new Date('2026-08-26T06:32:50Z') });
  assert.strictEqual(evalResult.temporal_validity.is_active, false);
  assert.ok(evalResult.temporal_validity.reason.includes('DAILY_DEAL_EXCEEDED_TTL_24H'));
  assert.strictEqual(evalResult.batch_decision, engine083d.BATCH_DECISIONS.LINEAGE_VALID_HISTORICAL_ONLY);
});

// TEST 05: Negative - Expired valid_to date
runTest('TEST_05_NEGATIVE_EXPIRED_VALID_TO_DATE', () => {
  const signal = {
    id: 'SIG_083D_05',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema',
    title: 'Deal',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    declared_level: engine083d.CONFIDENCE_LEVELS.LEVEL_B,
    evidence_bundle: {
      receipt_path: metizReceiptRel,
      receipt_sha256: metizReceiptSha,
      price_snippet: '55.000',
      conditions_snippet: 'xuất trình thẻ thành viên',
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema',
      validity_spec: {
        valid_to: '2026-08-10' // Expired relative to 2026-08-24
      }
    }
  };

  const evalResult = engine083d.evaluateSignalStrict083d(signal, { refDate: new Date('2026-08-24T20:30:00Z') });
  assert.strictEqual(evalResult.temporal_validity.is_active, false);
  assert.ok(evalResult.temporal_validity.reason.includes('OFFER_EXPIRED'));
  assert.strictEqual(evalResult.batch_decision, engine083d.BATCH_DECISIONS.LINEAGE_VALID_HISTORICAL_ONLY);
});

// TEST 06: Negative - Capture age exceeded 30 days for specific valid_to deal
runTest('TEST_06_NEGATIVE_CAPTURE_AGE_EXCEEDED_30D_FOR_SPECIFIC_DATE', () => {
  const signal = {
    id: 'SIG_083D_06',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema',
    title: 'Deal',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    declared_level: engine083d.CONFIDENCE_LEVELS.LEVEL_B,
    evidence_bundle: {
      receipt_path: metizReceiptRel,
      receipt_sha256: metizReceiptSha,
      price_snippet: '55.000',
      conditions_snippet: 'xuất trình thẻ thành viên',
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema',
      validity_spec: {
        valid_to: '2026-10-30' // Future date
      }
    }
  };

  // Evaluate at refDate = 2026-10-01 (38 days after capture > 30d TTL)
  const evalResult = engine083d.evaluateSignalStrict083d(signal, { refDate: new Date('2026-10-01T12:00:00Z') });
  assert.strictEqual(evalResult.temporal_validity.is_active, false);
  assert.ok(evalResult.temporal_validity.reason.includes('CAPTURE_EXCEEDED_30D_TTL'));
  assert.strictEqual(evalResult.batch_decision, engine083d.BATCH_DECISIONS.LINEAGE_VALID_HISTORICAL_ONLY);
});

// TEST 07: Negative - Snippet validation failure surfaces proper reason
runTest('TEST_07_NEGATIVE_SNIPPET_ERROR_SURFACES_PROPER_REASON', () => {
  const signal = {
    id: 'SIG_083D_07',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema',
    title: 'Deal',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    declared_level: engine083d.CONFIDENCE_LEVELS.LEVEL_B,
    evidence_bundle: {
      receipt_path: metizReceiptRel,
      receipt_sha256: metizReceiptSha,
      price_snippet: '55.000 đồng/ vé 2D',
      conditions_snippet: '55.000 đồng', // Substring overlap!
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema'
    }
  };

  const evalResult = engine083d.evaluateSignalStrict083d(signal);
  assert.strictEqual(evalResult.binding_valid, true);
  assert.ok(evalResult.decision_reason.includes('SUBSTRING_OVERLAP_SNIPPETS'), `Expected snippet error in decision_reason, got: ${evalResult.decision_reason}`);
  assert.strictEqual(evalResult.batch_decision, engine083d.BATCH_DECISIONS.NEEDS_RECHECK);
});

// TEST 08: Positive - Fresh recurring deal within 7-day TTL passes
runTest('TEST_08_POSITIVE_FRESH_RECURRING_DEAL_WITHIN_7D_PASSES', () => {
  const signal = {
    id: 'SIG_083D_08',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema Đà Nẵng',
    title: 'Super Monday — Thứ Hai Siêu Hạng (Active)',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    declared_level: engine083d.CONFIDENCE_LEVELS.LEVEL_B,
    is_account_locked: false,
    is_cart_dependent: false,
    evidence_bundle: {
      receipt_path: metizReceiptRel,
      receipt_sha256: metizReceiptSha,
      price_snippet: '55.000',
      conditions_snippet: 'xuất trình thẻ thành viên',
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema',
      validity_spec: {
        deal_type: 'WEEKLY_RECURRING',
        is_recurring: true,
        recurring_rule: 'THỨ HAI MỖI TUẦN'
      }
    }
  };

  // Evaluated at refDate = 2026-08-24T20:30:00Z (captured 14 hours ago <= 7d TTL)
  const evalResult = engine083d.evaluateSignalStrict083d(signal, { refDate: new Date('2026-08-24T20:30:00Z') });
  assert.strictEqual(evalResult.binding_valid, true);
  assert.strictEqual(evalResult.observed_points_count, 6);
  assert.strictEqual(evalResult.temporal_validity.is_active, true);
  assert.strictEqual(evalResult.batch_decision, engine083d.BATCH_DECISIONS.READY_FOR_BATCH_REVIEW);
  assert.strictEqual(evalResult.is_ready_for_review, true);
});

// TEST 09: Positive - Fresh specific date deal within 30-day TTL passes
runTest('TEST_09_POSITIVE_FRESH_SPECIFIC_DATE_DEAL_WITHIN_30D_PASSES', () => {
  const signal = {
    id: 'SIG_083D_09',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema Đà Nẵng',
    title: 'Super Monday',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    declared_level: engine083d.CONFIDENCE_LEVELS.LEVEL_B,
    evidence_bundle: {
      receipt_path: metizReceiptRel,
      receipt_sha256: metizReceiptSha,
      price_snippet: '55.000',
      conditions_snippet: 'xuất trình thẻ thành viên',
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema',
      validity_spec: {
        valid_to: '2026-08-31' // 7 days in future
      }
    }
  };

  const evalResult = engine083d.evaluateSignalStrict083d(signal, { refDate: new Date('2026-08-24T20:30:00Z') });
  assert.strictEqual(evalResult.binding_valid, true);
  assert.strictEqual(evalResult.temporal_validity.is_active, true);
  assert.strictEqual(evalResult.batch_decision, engine083d.BATCH_DECISIONS.READY_FOR_BATCH_REVIEW);
  assert.strictEqual(evalResult.is_ready_for_review, true);
});

// TEST 10: Negative - Level D community signal cannot auto-upgrade
runTest('TEST_10_NEGATIVE_LEVEL_D_COMMUNITY_CANNOT_AUTO_UPGRADE', () => {
  const signal = {
    id: 'SIG_083D_10',
    cohort: 'COMMUNITY',
    brand: 'Metiz',
    title: 'Tín Hiệu Cộng Đồng',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    declared_level: engine083d.CONFIDENCE_LEVELS.LEVEL_D,
    evidence_bundle: {
      receipt_path: metizReceiptRel,
      receipt_sha256: metizReceiptSha,
      price_snippet: '55.000',
      conditions_snippet: 'xuất trình thẻ thành viên',
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema',
      validity_spec: {
        is_recurring: true,
        recurring_rule: 'THỨ HAI MỖI TUẦN'
      }
    }
  };

  const evalResult = engine083d.evaluateSignalStrict083d(signal);
  assert.strictEqual(evalResult.batch_decision, engine083d.BATCH_DECISIONS.NEEDS_RECHECK);
  assert.strictEqual(evalResult.is_ready_for_review, false);
});

// TEST 11: Production Invariants Locked
runTest('TEST_11_PRODUCTION_INVARIANTS_LOCKED', () => {
  const feedContent = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
  assert.strictEqual(feedContent.length, 0, 'Production feed must remain []');

  const manifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  assert.strictEqual(manifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved must remain false');
});

console.log('\n======================================================');
if (passedTests === totalTests) {
  console.log(`🟢 [ACTIVE-VALIDITY-083D-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [ACTIVE-VALIDITY-083D-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
