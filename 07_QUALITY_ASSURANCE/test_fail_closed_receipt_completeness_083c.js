/**
 * JAYT FAIL-CLOSED RECEIPT COMPLETENESS & DISJOINT EVIDENCE TEST (083C)
 * Directive: JAYT-083C-FAIL-CLOSED-RECEIPT-COMPLETENESS
 * 
 * Verifies mandatory receipt SHA-256, URL normalization matching, complete receipt schema,
 * strict disjoint/non-overlapping snippets, and separation of historical vs active validity.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const engine083c = require(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'multi_source_pipeline_083c', 'multi_source_triage_engine_083c.js'));
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

console.log('🧪 [JAYT-083C-TEST] Khởi chạy bộ kiểm thử Fail-Closed Receipt Completeness 083C...\n');

let passedTests = 0;
const totalTests = 10;

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

// TEST 01: Negative - Missing mandatory receipt_sha256
runTest('TEST_01_NEGATIVE_MISSING_RECEIPT_SHA256_FAILS_CLOSED', () => {
  const signal = {
    id: 'SIG_083C_01',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema',
    title: 'Super Monday',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    evidence_bundle: {
      receipt_path: metizReceiptRel
      // receipt_sha256 is missing
    }
  };

  const evalResult = engine083c.evaluateSignalStrict083c(signal);
  assert.strictEqual(evalResult.binding_valid, false);
  assert.ok(evalResult.binding_failure_reason.includes('MISSING_OR_INVALID_RECEIPT_SHA256_MANDATORY'));
  assert.strictEqual(evalResult.observed_points_count, 0);
  assert.strictEqual(evalResult.is_ready_for_review, false);
});

// TEST 02: Negative - Tampered receipt (hash mismatch)
runTest('TEST_02_NEGATIVE_TAMPERED_RECEIPT_FAILS_CLOSED', () => {
  const signal = {
    id: 'SIG_083C_02',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema',
    title: 'Super Monday',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    evidence_bundle: {
      receipt_path: metizReceiptRel,
      receipt_sha256: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    }
  };

  const evalResult = engine083c.evaluateSignalStrict083c(signal);
  assert.strictEqual(evalResult.binding_valid, false);
  assert.ok(evalResult.binding_failure_reason.includes('RECEIPT_HASH_MISMATCH'));
  assert.strictEqual(evalResult.observed_points_count, 0);
});

// TEST 03: Negative - Missing target_url in receipt
runTest('TEST_03_NEGATIVE_MISSING_TARGET_URL_FAILS_CLOSED', () => {
  const tempDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'mock_fixtures_083c');
  fs.mkdirSync(tempDir, { recursive: true });

  const tempArtifact = path.join(tempDir, 'fixture_no_url_snapshot.html');
  fs.writeFileSync(tempArtifact, '<html><body>Ve 55k</body></html>', 'utf8');
  const artSha = crypto.createHash('sha256').update(fs.readFileSync(tempArtifact)).digest('hex');

  const tempReceipt = path.join(tempDir, 'fixture_no_url_receipt.json');
  fs.writeFileSync(tempReceipt, JSON.stringify({
    receipt_id: 'RECEIPT_NO_URL',
    checked_at: '2026-08-24T12:00:00Z',
    // target_url is missing
    artifacts: {
      dom_html: {
        path: path.relative(repoRoot, tempArtifact).replace(/\\/g, '/'),
        sha256: artSha
      }
    }
  }, null, 2), 'utf8');
  const recSha = crypto.createHash('sha256').update(fs.readFileSync(tempReceipt)).digest('hex');

  const signal = {
    id: 'SIG_083C_03',
    cohort: 'CINEMA',
    brand: 'Cinema X',
    title: 'Deal',
    source_url: 'https://cinema.vn/deal',
    evidence_bundle: {
      receipt_path: path.relative(repoRoot, tempReceipt).replace(/\\/g, '/'),
      receipt_sha256: recSha
    }
  };

  const evalResult = engine083c.evaluateSignalStrict083c(signal);
  fs.rmSync(tempDir, { recursive: true, force: true });

  assert.strictEqual(evalResult.binding_valid, false);
  assert.ok(evalResult.binding_failure_reason.includes('RECEIPT_MISSING_TARGET_URL'));
});

// TEST 04: Negative - URL normalization mismatch
runTest('TEST_04_NEGATIVE_NORMALIZED_URL_MISMATCH_FAILS_CLOSED', () => {
  const signal = {
    id: 'SIG_083C_04',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema',
    title: 'Super Monday',
    source_url: 'https://metiz.vn/promotion/completely-different-deal.html',
    evidence_bundle: {
      receipt_path: metizReceiptRel,
      receipt_sha256: metizReceiptSha
    }
  };

  const evalResult = engine083c.evaluateSignalStrict083c(signal);
  assert.strictEqual(evalResult.binding_valid, false);
  assert.ok(evalResult.binding_failure_reason.includes('NORMALIZED_URL_MISMATCH'));
});

// TEST 05: Negative - Substring overlap snippets rejected
runTest('TEST_05_NEGATIVE_SUBSTRING_OVERLAP_SNIPPETS_REJECTED', () => {
  const signal = {
    id: 'SIG_083C_05',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema Đà Nẵng',
    title: 'Super Monday',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    declared_level: engine083c.CONFIDENCE_LEVELS.LEVEL_B,
    evidence_bundle: {
      receipt_path: metizReceiptRel,
      receipt_sha256: metizReceiptSha,
      price_snippet: '55.000 đồng/ vé 2D',
      conditions_snippet: '55.000 đồng', // Substring of price_snippet!
      validity_snippet: 'thứ hai mỗi tuần',
      scope_snippet: 'Metiz Cinema'
    }
  };

  const evalResult = engine083c.evaluateSignalStrict083c(signal);
  assert.strictEqual(evalResult.binding_valid, true);
  assert.strictEqual(evalResult.triage_grid.point_1_price_spec, engine083c.TRIAGE_STATES.NOT_OBSERVED);
  assert.strictEqual(evalResult.triage_grid.point_2_terms_conditions, engine083c.TRIAGE_STATES.NOT_OBSERVED);
  assert.ok(evalResult.binding_failure_reason.includes('SUBSTRING_OVERLAP_SNIPPETS'));
  assert.strictEqual(evalResult.is_ready_for_review, false);
});

// TEST 06: Negative - Offset range overlap in content rejected
runTest('TEST_06_NEGATIVE_OFFSET_RANGE_OVERLAP_REJECTED', () => {
  const tempDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'mock_fixtures_083c');
  fs.mkdirSync(tempDir, { recursive: true });

  const tempArtifact = path.join(tempDir, 'fixture_overlap_snapshot.html');
  fs.writeFileSync(tempArtifact, '<html><body>Gia ve 55k thu hai tai rap Metiz</body></html>', 'utf8');
  const artSha = crypto.createHash('sha256').update(fs.readFileSync(tempArtifact)).digest('hex');

  const tempReceipt = path.join(tempDir, 'fixture_overlap_receipt.json');
  fs.writeFileSync(tempReceipt, JSON.stringify({
    receipt_id: 'RECEIPT_OVERLAP',
    target_url: 'https://cinema.vn/deal',
    checked_at: '2026-08-24T12:00:00Z',
    artifacts: {
      dom_html: {
        path: path.relative(repoRoot, tempArtifact).replace(/\\/g, '/'),
        sha256: artSha
      }
    }
  }, null, 2), 'utf8');
  const recSha = crypto.createHash('sha256').update(fs.readFileSync(tempReceipt)).digest('hex');

  const disjointCheck = engine083c.validateDisjointSnippets('Gia ve 55k thu hai tai rap Metiz', {
    price_snippet: 've 55k thu',
    conditions_snippet: '55k thu hai' // Overlaps in character span!
  });

  fs.rmSync(tempDir, { recursive: true, force: true });

  assert.strictEqual(disjointCheck.disjoint_valid, false);
  assert.ok(disjointCheck.failure_reason.includes('SUBSTRING_OVERLAP') || disjointCheck.failure_reason.includes('OVERLAP'));
});

// TEST 07: Positive - Historical expired deal separated as LINEAGE_VALID_HISTORICAL_ONLY
runTest('TEST_07_POSITIVE_HISTORICAL_EXPIRED_DEAL_SEPARATED', () => {
  const signal = {
    id: 'SIG_083C_07_HISTORICAL',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema Đà Nẵng',
    title: 'Super Monday — Lịch Sử',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    declared_level: engine083c.CONFIDENCE_LEVELS.LEVEL_B,
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
        valid_to: '2026-08-01' // Expired before current date (2026-08-24)
      }
    }
  };

  const evalResult = engine083c.evaluateSignalStrict083c(signal, { refDate: new Date('2026-08-24T20:30:00Z') });
  assert.strictEqual(evalResult.binding_valid, true);
  assert.strictEqual(evalResult.observed_points_count, 6, 'All 6 lineage points are OBSERVED');
  assert.strictEqual(evalResult.batch_decision, engine083c.BATCH_DECISIONS.LINEAGE_VALID_HISTORICAL_ONLY);
  assert.strictEqual(evalResult.is_historical_lineage_only, true);
  assert.strictEqual(evalResult.is_ready_for_review, false);
});

// TEST 08: Positive - Active validity deal passes as READY_FOR_BATCH_REVIEW
runTest('TEST_08_POSITIVE_ACTIVE_VALIDITY_DEAL_PASSES', () => {
  const signal = {
    id: 'SIG_083C_08_ACTIVE',
    cohort: 'CINEMA',
    brand: 'Metiz Cinema Đà Nẵng',
    title: 'Super Monday — Thứ Hai Siêu Hạng (Active)',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    declared_level: engine083c.CONFIDENCE_LEVELS.LEVEL_B,
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
        is_recurring: true,
        recurring_rule: 'THỨ HAI MỖI TUẦN'
      }
    }
  };

  const evalResult = engine083c.evaluateSignalStrict083c(signal, { refDate: new Date('2026-08-24T20:30:00Z') });
  assert.strictEqual(evalResult.binding_valid, true);
  assert.strictEqual(evalResult.observed_points_count, 6);
  assert.strictEqual(evalResult.batch_decision, engine083c.BATCH_DECISIONS.READY_FOR_BATCH_REVIEW);
  assert.strictEqual(evalResult.is_ready_for_review, true);
});

// TEST 09: Negative - Level D community signal cannot auto-upgrade
runTest('TEST_09_NEGATIVE_LEVEL_D_COMMUNITY_CANNOT_AUTO_UPGRADE', () => {
  const signal = {
    id: 'SIG_083C_09_COMMUNITY',
    cohort: 'COMMUNITY',
    brand: 'Metiz',
    title: 'Tín Hiệu Cộng Đồng',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    declared_level: engine083c.CONFIDENCE_LEVELS.LEVEL_D,
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

  const evalResult = engine083c.evaluateSignalStrict083c(signal);
  assert.strictEqual(evalResult.batch_decision, engine083c.BATCH_DECISIONS.NEEDS_RECHECK);
  assert.strictEqual(evalResult.is_ready_for_review, false);
});

// TEST 10: Production Invariants Locked
runTest('TEST_10_PRODUCTION_INVARIANTS_LOCKED', () => {
  const feedContent = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
  assert.strictEqual(feedContent.length, 0, 'Production feed must remain []');

  const manifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  assert.strictEqual(manifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved must remain false');
});

console.log('\n======================================================');
if (passedTests === totalTests) {
  console.log(`🟢 [RECEIPT-COMPLETENESS-083C-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [RECEIPT-COMPLETENESS-083C-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
