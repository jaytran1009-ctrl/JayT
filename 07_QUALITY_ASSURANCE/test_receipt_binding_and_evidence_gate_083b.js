/**
 * JAYT CRYPTOGRAPHIC RECEIPT BINDING & EVIDENCE GATE TEST (083B)
 * Directive: JAYT-083B-RECEIPT-BINDING-AND-MEMORY-REPAIR
 * 
 * Verifies deep cryptographic receipt-to-artifact binding, dedicated snippet checks,
 * forbidden artifact rejections, and fail-closed evaluation.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const engine083b = require(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'multi_source_pipeline_083b', 'multi_source_triage_engine_083b.js'));
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

console.log('🧪 [JAYT-083B-TEST] Khởi chạy bộ kiểm thử Ràng Buộc Receipt Mật Mã 083B...\n');

let passedTests = 0;
const totalTests = 9;

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

// TEST 01: Negative - Receipt pointing to wrong artifact hash
runTest('TEST_01_NEGATIVE_WRONG_ARTIFACT_HASH_FAILS_CLOSED', () => {
  const tempReceiptDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'mock_fixtures_083b');
  fs.mkdirSync(tempReceiptDir, { recursive: true });

  const tempReceiptPath = path.join(tempReceiptDir, 'fixture_mismatch_hash_receipt.json');
  const receiptData = {
    receipt_id: 'FIXTURE_MISMATCH_HASH',
    target_url: 'https://metiz.vn/promotion/super-monday',
    checked_at: '2026-08-24T06:32:50Z',
    artifacts: {
      dom_html: {
        path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/fresh_metiz_super_monday_capture.html',
        sha256: '0000000000000000000000000000000000000000000000000000000000000000'
      }
    }
  };
  fs.writeFileSync(tempReceiptPath, JSON.stringify(receiptData, null, 2), 'utf8');

  const signal = {
    id: 'SIG_TEST_01',
    cohort: 'CINEMA',
    brand: 'Metiz',
    title: 'Super Monday',
    source_url: 'https://metiz.vn/promotion/super-monday',
    evidence_bundle: {
      receipt_path: path.relative(repoRoot, tempReceiptPath).replace(/\\/g, '/')
    }
  };

  const evalResult = engine083b.evaluateSignalStrict083b(signal);
  fs.unlinkSync(tempReceiptPath);

  assert.strictEqual(evalResult.binding_valid, false);
  assert.ok(evalResult.binding_failure_reason.includes('ARTIFACT_HASH_MISMATCH'), `Expected ARTIFACT_HASH_MISMATCH, got ${evalResult.binding_failure_reason}`);
  assert.strictEqual(evalResult.observed_points_count, 0);
  assert.strictEqual(evalResult.is_ready_for_review, false);
});

// TEST 02: Negative - Source URL mismatch
runTest('TEST_02_NEGATIVE_WRONG_SOURCE_URL_FAILS_CLOSED', () => {
  const signal = {
    id: 'SIG_TEST_02',
    cohort: 'CINEMA',
    brand: 'Metiz',
    title: 'Super Monday',
    source_url: 'https://other-domain.vn/different-promo',
    evidence_bundle: {
      receipt_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/FRESH_CAPTURE_RECEIPT_METIZ_SUPER_MONDAY.json'
    }
  };

  const evalResult = engine083b.evaluateSignalStrict083b(signal);
  assert.strictEqual(evalResult.binding_valid, false);
  assert.ok(evalResult.binding_failure_reason.includes('SOURCE_URL_MISMATCH'));
  assert.strictEqual(evalResult.observed_points_count, 0);
});

// TEST 03: Negative - Forbidden file path (PROJECT_MEMORY.md as evidence)
runTest('TEST_03_NEGATIVE_FORBIDDEN_FILE_PATH_REJECTED', () => {
  const signal = {
    id: 'SIG_TEST_03',
    cohort: 'CINEMA',
    brand: 'Galaxy',
    title: 'Deal Tự Gán',
    source_url: 'https://galaxycine.vn',
    evidence_bundle: {
      receipt_path: 'PROJECT_MEMORY.md'
    }
  };

  const evalResult = engine083b.evaluateSignalStrict083b(signal);
  assert.strictEqual(evalResult.binding_valid, false);
  assert.ok(evalResult.binding_failure_reason.includes('FORBIDDEN_RECEIPT_PATH'));
});

// TEST 04: Negative - Synthetic marker in artifact
runTest('TEST_04_NEGATIVE_SYNTHETIC_MARKER_IN_SNAPSHOT_REJECTED', () => {
  const tempDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'mock_fixtures_083b');
  fs.mkdirSync(tempDir, { recursive: true });

  const tempArtifact = path.join(tempDir, 'fixture_synthetic_snapshot.html');
  fs.writeFileSync(tempArtifact, '<html><body>DEMO_ONLY_NOT_FOR_RENDER Deal giả lập 50k</body></html>', 'utf8');
  const artHash = crypto.createHash('sha256').update(fs.readFileSync(tempArtifact)).digest('hex');

  const tempReceipt = path.join(tempDir, 'fixture_synthetic_receipt.json');
  fs.writeFileSync(tempReceipt, JSON.stringify({
    target_url: 'https://example.com/deal',
    checked_at: '2026-08-24T12:00:00Z',
    artifacts: {
      dom_html: {
        path: path.relative(repoRoot, tempArtifact).replace(/\\/g, '/'),
        sha256: artHash
      }
    }
  }, null, 2), 'utf8');

  const signal = {
    id: 'SIG_TEST_04',
    cohort: 'F_AND_B',
    brand: 'Demo Brand',
    title: 'Demo Deal',
    source_url: 'https://example.com/deal',
    evidence_bundle: {
      receipt_path: path.relative(repoRoot, tempReceipt).replace(/\\/g, '/')
    }
  };

  const evalResult = engine083b.evaluateSignalStrict083b(signal);
  fs.unlinkSync(tempArtifact);
  fs.unlinkSync(tempReceipt);

  assert.strictEqual(evalResult.binding_valid, false);
  assert.ok(evalResult.binding_failure_reason.includes('SYNTHETIC_MARKER_DETECTED'), `Expected SYNTHETIC_MARKER_DETECTED, got ${evalResult.binding_failure_reason}`);
});

// TEST 05: Negative - Reusing single generic snippet for all claims
runTest('TEST_05_NEGATIVE_SHARED_GENERIC_SNIPPET_REJECTED', () => {
  const signal = {
    id: 'SIG_TEST_05',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema Đà Nẵng',
    title: 'Super Monday',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    declared_level: engine083b.CONFIDENCE_LEVELS.LEVEL_B,
    evidence_bundle: {
      receipt_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/FRESH_CAPTURE_RECEIPT_METIZ_SUPER_MONDAY.json',
      // Reusing identical string for all 4 claims
      price_snippet: 'Metiz Cinema',
      conditions_snippet: 'Metiz Cinema',
      validity_snippet: 'Metiz Cinema',
      scope_snippet: 'Metiz Cinema'
    }
  };

  const evalResult = engine083b.evaluateSignalStrict083b(signal);
  assert.strictEqual(evalResult.binding_valid, true);
  // Reused snippets fail distinctness check, so claims become NOT_OBSERVED
  assert.strictEqual(evalResult.triage_grid.point_1_price_spec, engine083b.TRIAGE_STATES.NOT_OBSERVED);
  assert.strictEqual(evalResult.triage_grid.point_2_terms_conditions, engine083b.TRIAGE_STATES.NOT_OBSERVED);
  assert.strictEqual(evalResult.triage_grid.point_3_validity_window, engine083b.TRIAGE_STATES.NOT_OBSERVED);
  assert.strictEqual(evalResult.triage_grid.point_4_geographic_scope, engine083b.TRIAGE_STATES.NOT_OBSERVED);
  assert.strictEqual(evalResult.is_ready_for_review, false);
});

// TEST 06: Negative - Partial distinct snippet match
runTest('TEST_06_NEGATIVE_PARTIAL_SNIPPET_MATCH_GIVES_PARTIAL_POINTS', () => {
  const signal = {
    id: 'SIG_TEST_06',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema Đà Nẵng',
    title: 'Super Monday',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    declared_level: engine083b.CONFIDENCE_LEVELS.LEVEL_B,
    evidence_bundle: {
      receipt_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/FRESH_CAPTURE_RECEIPT_METIZ_SUPER_MONDAY.json',
      price_snippet: '55.000',
      conditions_snippet: 'thành viên Metiz Cinema',
      validity_snippet: 'KHONG_TON_TAI_TRONG_FILE_ABCXYZ',
      scope_snippet: 'QUAN_KHONG_CO_TRONG_FILE_12345'
    }
  };

  const evalResult = engine083b.evaluateSignalStrict083b(signal);
  assert.strictEqual(evalResult.binding_valid, true);
  assert.strictEqual(evalResult.triage_grid.point_1_price_spec, engine083b.TRIAGE_STATES.OBSERVED);
  assert.strictEqual(evalResult.triage_grid.point_2_terms_conditions, engine083b.TRIAGE_STATES.OBSERVED);
  assert.strictEqual(evalResult.triage_grid.point_3_validity_window, engine083b.TRIAGE_STATES.NOT_OBSERVED);
  assert.strictEqual(evalResult.triage_grid.point_4_geographic_scope, engine083b.TRIAGE_STATES.NOT_OBSERVED);
  assert.strictEqual(evalResult.observed_points_count, 4); // price, conditions, public, lineage
  assert.strictEqual(evalResult.batch_decision, engine083b.BATCH_DECISIONS.NEEDS_RECHECK);
});

// TEST 07: Positive - Genuine physical historical capture passes
runTest('TEST_07_POSITIVE_GENUINE_HISTORICAL_CAPTURE_PASSES', () => {
  const signal = {
    id: 'SIG_TEST_07_HISTORICAL_METIZ',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema Đà Nẵng',
    title: 'Super Monday — Thứ Hai Siêu Hạng',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    declared_level: engine083b.CONFIDENCE_LEVELS.LEVEL_B,
    is_account_locked: false,
    is_cart_dependent: false,
    evidence_bundle: {
      receipt_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/FRESH_CAPTURE_RECEIPT_METIZ_SUPER_MONDAY.json',
      price_snippet: '55.000',
      conditions_snippet: 'thành viên Metiz Cinema',
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema'
    }
  };

  const evalResult = engine083b.evaluateSignalStrict083b(signal);
  assert.strictEqual(evalResult.binding_valid, true, 'Lineage must be valid for genuine historical capture');
  assert.strictEqual(evalResult.observed_points_count, 6, 'All 6 distinct points must be OBSERVED');
  assert.strictEqual(evalResult.batch_decision, engine083b.BATCH_DECISIONS.READY_FOR_BATCH_REVIEW);
  assert.strictEqual(evalResult.is_ready_for_review, true);
});

// TEST 08: Negative - Level D community signal cannot auto-upgrade
runTest('TEST_08_NEGATIVE_LEVEL_D_COMMUNITY_CANNOT_AUTO_UPGRADE', () => {
  const signal = {
    id: 'SIG_TEST_08_COMMUNITY',
    cohort: 'COMMUNITY',
    brand: 'Metiz',
    title: 'Tín Hiệu Cộng Đồng',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    declared_level: engine083b.CONFIDENCE_LEVELS.LEVEL_D,
    is_account_locked: false,
    is_cart_dependent: false,
    evidence_bundle: {
      receipt_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/FRESH_CAPTURE_RECEIPT_METIZ_SUPER_MONDAY.json',
      price_snippet: '55.000',
      conditions_snippet: 'thành viên Metiz Cinema',
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema'
    }
  };

  const evalResult = engine083b.evaluateSignalStrict083b(signal);
  assert.strictEqual(evalResult.batch_decision, engine083b.BATCH_DECISIONS.NEEDS_RECHECK, 'Level D must remain NEEDS_RECHECK');
  assert.strictEqual(evalResult.is_ready_for_review, false);
});

// TEST 09: Production Invariants Locked
runTest('TEST_09_PRODUCTION_INVARIANTS_LOCKED', () => {
  const feedContent = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
  assert.strictEqual(feedContent.length, 0, 'Production feed must remain []');

  const manifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  assert.strictEqual(manifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved must remain false');
});

console.log('\n======================================================');
if (passedTests === totalTests) {
  console.log(`🟢 [RECEIPT-BINDING-083B-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [RECEIPT-BINDING-083B-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
