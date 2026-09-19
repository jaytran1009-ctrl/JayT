/**
 * JAYT VERIFIED SUPPLY EXPANSION TEST SUITE (083)
 * Directive: JAYT-P0.2-VERIFIED-SUPPLY-EXPANSION-083
 * 
 * Verifies multi-source batch pipeline, confidence levels, 6-point triage grid,
 * negative anti-auto-publish gates, and immutable production invariants.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const registryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'multi_source_pipeline_083', 'multi_source_signal_registry_083.json');
const triageEngine = require(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'multi_source_pipeline_083', 'multi_source_triage_engine_083.js'));
const reviewPackPath = path.join(repoRoot, '08_RELEASE_VAULT', 'JAYT_BATCH_REVIEW_PACK_083.md');
const receiptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'batch_083', 'BATCH_083_EVIDENCE_RECEIPT.json');
const dealsFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

console.log('🧪 [JAYT-083-TEST] Khởi chạy bộ kiểm thử Mở Rộng Nguồn Cung Xác Thực 083...\n');

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
runTest('TEST_01_MULTI_SOURCE_60_SIGNALS_ACROSS_6_COHORTS', () => {
  assert.ok(fs.existsSync(registryPath), 'Registry 083 file must exist');
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  assert.ok(Array.isArray(registry.signals), 'signals must be an array');
  assert.ok(registry.signals.length >= 60, `Expected >= 60 signals, got ${registry.signals.length}`);

  const requiredCohorts = ['F_AND_B', 'CAFE_TEA', 'CINEMA', 'MOBILITY', 'ECOMMERCE', 'COMMUNITY'];
  const cohortsPresent = new Set(registry.signals.map(s => s.cohort));

  for (const c of requiredCohorts) {
    assert.ok(cohortsPresent.has(c), `Cohort ${c} must be present in registry`);
    const count = registry.signals.filter(s => s.cohort === c).length;
    assert.ok(count >= 10, `Cohort ${c} must have at least 10 signals, got ${count}`);
  }
});

// TEST 02
runTest('TEST_02_CONFIDENCE_LEVELS_STANDARDIZATION', () => {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const validLevels = Object.values(triageEngine.CONFIDENCE_LEVELS);

  for (const s of registry.signals) {
    assert.ok(validLevels.includes(s.declared_level), `Signal ${s.id} has invalid level: ${s.declared_level}`);
  }
});

// TEST 03
runTest('TEST_03_TRIAGE_GRID_3_STATE_ENFORCEMENT', () => {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const { results } = triageEngine.processSignalBatch(registry.signals);
  const validStates = Object.values(triageEngine.TRIAGE_STATES);

  for (const r of results) {
    assert.ok(r.triage_grid, `Signal ${r.id} must have triage_grid`);
    const keys = Object.keys(r.triage_grid);
    assert.strictEqual(keys.length, 6, `Signal ${r.id} must have exactly 6 triage points`);

    for (const k of keys) {
      const val = r.triage_grid[k];
      assert.ok(validStates.includes(val), `Point ${k} on signal ${r.id} has invalid state '${val}'`);
      assert.notStrictEqual(val, 'PASS', 'Triage point must not contain inferred PASS');
    }
  }
});

// TEST 04
runTest('TEST_04_NEGATIVE_NO_AUTO_UPGRADE_FROM_D_TO_B', () => {
  const mockLevelDSignal = {
    id: 'SIG_MOCK_D_01',
    cohort: 'COMMUNITY',
    brand: 'Quán Mock',
    title: 'Deal Tự Xưng Giảm 50%',
    source_url: 'https://mock.unverified.site/deal',
    observed_price: '20000',
    observed_original_price: '40000',
    observed_conditions: 'Điều kiện ghi nhận từ bài post mạng xã hội',
    observed_validity: 'Hết tuần này',
    observed_scope: 'Đà Nẵng',
    declared_level: triageEngine.CONFIDENCE_LEVELS.LEVEL_D,
    evidence_type: 'COMMUNITY_UNVERIFIED_SOURCE',
    is_account_locked: false,
    is_cart_dependent: false
  };

  const evalResult = triageEngine.evaluateSignal(mockLevelDSignal);
  assert.strictEqual(evalResult.batch_decision, triageEngine.BATCH_DECISIONS.NEEDS_RECHECK, 'Level D signal must be NEEDS_RECHECK');
  assert.strictEqual(evalResult.is_ready_for_review, false, 'Level D signal must NOT be ready for batch review without independent evidence');
});

// TEST 05
runTest('TEST_05_NO_AUTO_PUBLISH_TO_PRODUCTION', () => {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  triageEngine.processSignalBatch(registry.signals);

  const feedContent = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
  assert.ok(Array.isArray(feedContent), 'deals_feed.json must be an array');
  assert.strictEqual(feedContent.length, 0, 'deals_feed.json must remain strictly [] (0 records)');

  const manifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  const isApproved = manifest.governance_locks.immutable_ceo_approval_record.is_approved;
  assert.strictEqual(isApproved, false, 'RELEASE_MANIFEST is_approved must remain false');
});

// TEST 06
runTest('TEST_06_COMMUNITY_QUEUE_ISOLATION', () => {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const communitySignals = registry.signals.filter(s => s.cohort === 'COMMUNITY');

  for (const s of communitySignals) {
    assert.strictEqual(s.declared_level, triageEngine.CONFIDENCE_LEVELS.LEVEL_D, `Community signal ${s.id} must be LEVEL_D`);
    const evalRes = triageEngine.evaluateSignal(s);
    assert.strictEqual(evalRes.batch_decision, triageEngine.BATCH_DECISIONS.NEEDS_RECHECK);
    assert.ok(evalRes.decision_reason.includes('Tín hiệu cộng đồng'), 'Reason must explicitly note community signal');
  }
});

// TEST 07
runTest('TEST_07_CONSOLIDATED_REVIEW_PACK_STRUCTURE', () => {
  assert.ok(fs.existsSync(reviewPackPath), 'JAYT_BATCH_REVIEW_PACK_083.md must exist');
  assert.ok(fs.existsSync(receiptPath), 'BATCH_083_EVIDENCE_RECEIPT.json must exist');

  const mdContent = fs.readFileSync(reviewPackPath, 'utf8');
  assert.ok(mdContent.includes('BATCH_REVIEW_PACK_083'), 'Markdown must have batch title');
  assert.ok(mdContent.includes('READY_FOR_BATCH_REVIEW'), 'Markdown must have READY_FOR_BATCH_REVIEW section');
  assert.ok(mdContent.includes('NEEDS_RECHECK'), 'Markdown must have NEEDS_RECHECK section');
  assert.ok(mdContent.includes('REJECTED_OR_ACCOUNT_DEPENDENT'), 'Markdown must have REJECTED section');

  const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
  assert.strictEqual(receipt.stats.total_signals, 60, 'Receipt must record exactly 60 evaluated signals');
});

// TEST 08
runTest('TEST_08_PRODUCTION_INVARIANTS_LOCKED', () => {
  const feedContent = JSON.parse(fs.readFileSync(dealsFeedPath, 'utf8'));
  assert.strictEqual(feedContent.length, 0, 'Production feed must be empty []');

  const manifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  const isApproved = manifest.governance_locks.immutable_ceo_approval_record.is_approved;
  assert.strictEqual(isApproved, false, 'is_approved must be false');
});

console.log('\n======================================================');
if (passedTests === totalTests) {
  console.log(`🟢 [VERIFIED-SUPPLY-083-SUMMARY] Kết quả kiểm thử: ${passedTests}/${totalTests} PASS!\n`);
} else {
  console.log(`❌ [VERIFIED-SUPPLY-083-SUMMARY] Thất bại: ${passedTests}/${totalTests} PASS.\n`);
  process.exitCode = 1;
}
