/**
 * JAYT SYNTHETIC SUPPLY CONTAINMENT & EVIDENCE GATE TEST (083A)
 * Directive: JAYT-083A-SYNTHETIC-SUPPLY-CONTAINMENT
 * 
 * Verifies quarantine isolation of Batch 083 and tests the root-fixed
 * strict evidence-bound triage engine 083a against negative synthetic cases.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const quarantineDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_083_synthetic_supply');
const quarantineManifestPath = path.join(quarantineDir, 'BATCH_083_QUARANTINE_MANIFEST.json');
const quarantineDisclosurePath = path.join(quarantineDir, 'BATCH_083_INCIDENT_DISCLOSURE.md');

const engine083a = require(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'multi_source_pipeline_083a', 'multi_source_triage_engine_083a.js'));
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

console.log('🧪 [JAYT-083A-TEST] Khởi chạy bộ kiểm thử Cô Lập Sự Cố & Chốt Chặn Bằng Chứng 083A...\n');

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

// TEST 01
runTest('TEST_01_BATCH_083_QUARANTINE_VAULT_INTEGRITY', () => {
  assert.ok(fs.existsSync(quarantineManifestPath), 'Quarantine manifest must exist');
  assert.ok(fs.existsSync(quarantineDisclosurePath), 'Incident disclosure must exist');

  const manifest = JSON.parse(fs.readFileSync(quarantineManifestPath, 'utf8'));
  assert.strictEqual(manifest.directive, 'JAYT-083A-SYNTHETIC-SUPPLY-CONTAINMENT');
  assert.ok(manifest.quarantined_artifacts.length >= 6, 'Must contain at least 6 quarantined files');

  for (const item of manifest.quarantined_artifacts) {
    const filePath = path.join(quarantineDir, item.quarantined_filename);
    assert.ok(fs.existsSync(filePath), `Quarantined file ${item.quarantined_filename} must exist in vault`);
    const actualHash = crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
    assert.strictEqual(actualHash, item.sha256, `Hash mismatch for ${item.quarantined_filename}`);
  }
});

// TEST 02
runTest('TEST_02_NEGATIVE_UNVERIFIED_SELF_AUTHORED_JSON_FAILS_CLOSED', () => {
  // Signal with handwritten fields in JSON without physical evidence bundle (like 083 had)
  const syntheticSignal = {
    id: 'SIG_SYNTHETIC_TEST_01',
    cohort: 'F_AND_B',
    brand: 'Quán Giả Lập',
    title: 'Gà Rán 20k Tự Nghĩ',
    source_url: 'https://example.com/fake-deal',
    declared_level: engine083a.CONFIDENCE_LEVELS.LEVEL_B,
    is_account_locked: false,
    is_cart_dependent: false
    // No evidence_bundle provided
  };

  const evalResult = engine083a.evaluateSignalStrict083a(syntheticSignal);
  assert.strictEqual(evalResult.lineage_valid, false, 'Lineage must be invalid');
  assert.strictEqual(evalResult.observed_points_count, 0, 'Observed points must be strictly 0 without evidence bundle');
  assert.strictEqual(evalResult.triage_grid.point_1_price_spec, engine083a.TRIAGE_STATES.NOT_OBSERVED);
  assert.strictEqual(evalResult.triage_grid.point_2_terms_conditions, engine083a.TRIAGE_STATES.NOT_OBSERVED);
  assert.strictEqual(evalResult.triage_grid.point_6_verifiable_lineage, engine083a.TRIAGE_STATES.NOT_OBSERVED);
  assert.strictEqual(evalResult.is_ready_for_review, false, 'Must NOT be ready for review');
});

// TEST 03
runTest('TEST_03_NEGATIVE_NON_EXISTENT_ARTIFACT_FAILS_CLOSED', () => {
  const signalWithMissingArtifact = {
    id: 'SIG_MISSING_ARTIFACT',
    cohort: 'CINEMA',
    brand: 'Cinema X',
    title: 'Vé 50k',
    source_url: 'https://cinema.vn/promo',
    evidence_bundle: {
      artifact_path: '07_QUALITY_ASSURANCE/non_existent_snapshot.html',
      artifact_sha256: '0000000000000000000000000000000000000000000000000000000000000000',
      capture_timestamp: '2026-08-24T12:00:00Z',
      receipt_path: '07_QUALITY_ASSURANCE/non_existent_receipt.json',
      source_snippet: 'Vé 50k'
    }
  };

  const evalResult = engine083a.evaluateSignalStrict083a(signalWithMissingArtifact);
  assert.strictEqual(evalResult.lineage_valid, false);
  assert.ok(evalResult.lineage_failure_reason.includes('ARTIFACT_FILE_NOT_FOUND'));
  assert.strictEqual(evalResult.observed_points_count, 0);
});

// TEST 04
runTest('TEST_04_NEGATIVE_TAMPERED_SHA256_FAILS_CLOSED', () => {
  // Points to an existing file but supplies wrong hash
  const signalWithTamperedHash = {
    id: 'SIG_TAMPERED_HASH',
    cohort: 'CINEMA',
    brand: 'Galaxy Cinema',
    title: 'Happy Day',
    source_url: 'https://galaxycine.vn/khuyen-mai/happy-day',
    evidence_bundle: {
      artifact_path: 'PROJECT_MEMORY.md',
      artifact_sha256: '1111111111111111111111111111111111111111111111111111111111111111',
      capture_timestamp: '2026-08-24T12:00:00Z',
      receipt_path: 'PROJECT_MEMORY.md',
      source_snippet: 'JAYT'
    }
  };

  const evalResult = engine083a.evaluateSignalStrict083a(signalWithTamperedHash);
  assert.strictEqual(evalResult.lineage_valid, false);
  assert.ok(evalResult.lineage_failure_reason.includes('HASH_MISMATCH'));
  assert.strictEqual(evalResult.observed_points_count, 0);
});

// TEST 05
runTest('TEST_05_NEGATIVE_MISSING_SNIPPET_IN_CONTENT_FAILS_CLOSED', () => {
  const memContent = fs.readFileSync(path.join(repoRoot, 'PROJECT_MEMORY.md'), 'utf8');
  const realHash = crypto.createHash('sha256').update(memContent).digest('hex');

  const signalWithFakeSnippet = {
    id: 'SIG_FAKE_SNIPPET',
    cohort: 'CINEMA',
    brand: 'Galaxy',
    title: 'Happy Day',
    source_url: 'https://galaxycine.vn',
    evidence_bundle: {
      artifact_path: 'PROJECT_MEMORY.md',
      artifact_sha256: realHash,
      capture_timestamp: '2026-08-24T12:00:00Z',
      receipt_path: 'PROJECT_MEMORY.md',
      source_snippet: 'CHUOI_KY_TU_HOAN_TOAN_KHONG_TON_TAI_TRONG_FILE_123456789'
    }
  };

  const evalResult = engine083a.evaluateSignalStrict083a(signalWithFakeSnippet);
  assert.strictEqual(evalResult.lineage_valid, false);
  assert.ok(evalResult.lineage_failure_reason.includes('SOURCE_SNIPPET_NOT_FOUND'));
});

// TEST 06
runTest('TEST_06_POSITIVE_VERIFIED_PHYSICAL_EVIDENCE_PASSES', () => {
  const memContent = fs.readFileSync(path.join(repoRoot, 'PROJECT_MEMORY.md'), 'utf8');
  const realHash = crypto.createHash('sha256').update(memContent).digest('hex');

  const validSignal = {
    id: 'SIG_VALID_PHYSICAL',
    cohort: 'CINEMA',
    brand: 'Galaxy Cinema',
    title: 'Happy Day',
    source_url: 'https://galaxycine.vn/khuyen-mai/happy-day',
    declared_level: engine083a.CONFIDENCE_LEVELS.LEVEL_B,
    evidence_bundle: {
      artifact_path: 'PROJECT_MEMORY.md',
      artifact_sha256: realHash,
      capture_timestamp: '2026-08-24T12:00:00Z',
      receipt_path: 'PROJECT_MEMORY.md',
      source_snippet: 'JAYT CORP',
      verified_price: '50k',
      verified_conditions: 'áp dụng',
      verified_validity: 'thứ ba',
      verified_scope: 'đà nẵng'
    }
  };

  const evalResult = engine083a.evaluateSignalStrict083a(validSignal);
  assert.strictEqual(evalResult.lineage_valid, true, 'Lineage must be valid when all 5 physical checks pass');
  assert.strictEqual(evalResult.triage_grid.point_5_public_accessibility, engine083a.TRIAGE_STATES.OBSERVED);
  assert.strictEqual(evalResult.triage_grid.point_6_verifiable_lineage, engine083a.TRIAGE_STATES.OBSERVED);
});

// TEST 07
runTest('TEST_07_LEVEL_D_NO_AUTO_UPGRADE', () => {
  const memContent = fs.readFileSync(path.join(repoRoot, 'PROJECT_MEMORY.md'), 'utf8');
  const realHash = crypto.createHash('sha256').update(memContent).digest('hex');

  const levelDSignal = {
    id: 'SIG_LEVEL_D_PHYSICAL',
    cohort: 'COMMUNITY',
    brand: 'Quán Nhỏ',
    title: 'Bánh Mỳ Chấm',
    source_url: 'https://facebook.com/banhmy',
    declared_level: engine083a.CONFIDENCE_LEVELS.LEVEL_D,
    evidence_bundle: {
      artifact_path: 'PROJECT_MEMORY.md',
      artifact_sha256: realHash,
      capture_timestamp: '2026-08-24T12:00:00Z',
      receipt_path: 'PROJECT_MEMORY.md',
      source_snippet: 'JAYT CORP'
    }
  };

  const evalResult = engine083a.evaluateSignalStrict083a(levelDSignal);
  assert.strictEqual(evalResult.batch_decision, engine083a.BATCH_DECISIONS.NEEDS_RECHECK, 'Level D must NEVER become READY_FOR_BATCH_REVIEW');
  assert.strictEqual(evalResult.is_ready_for_review, false);
});

// TEST 08
runTest('TEST_08_PRODUCTION_INVARIANTS_LOCKED', () => {
  const feedContent = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
  assert.strictEqual(feedContent.length, 0, 'Production feed must remain []');

  const manifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  assert.strictEqual(manifest.governance_locks.immutable_ceo_approval_record.is_approved, false, 'is_approved must remain false');
});

console.log('\n======================================================');
if (passedTests === totalTests) {
  console.log(`🟢 [SYNTHETIC-CONTAINMENT-083A-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [SYNTHETIC-CONTAINMENT-083A-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
