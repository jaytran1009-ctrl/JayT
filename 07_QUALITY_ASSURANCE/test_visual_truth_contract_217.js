const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const sotDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');
const { verifyVisualTruthContract } = require('./verify_visual_truth_contract_217');
const { evaluateVisualTruthState, VISUAL_TRUTH_STATES } = require(path.join(sotDir, 'jayt_visual_truth_contract.js'));

function runTestSuite217() {
  console.log('========================================================================');
  console.log('🧪 JAYT-217: VISUAL TRUTH CONTRACT TEST SUITE');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  let passedTests = 0;
  const totalTests = 6;

  // Test 1: VISUAL_TRUTH_TAXONOMY_INTEGRITY
  console.log('--- TEST 1: VISUAL_TRUTH_TAXONOMY_INTEGRITY ---');
  if (VISUAL_TRUTH_STATES.VERIFIED_EXACT === 'VERIFIED_EXACT' &&
      VISUAL_TRUTH_STATES.IDENTITY_VISUAL === 'IDENTITY_VISUAL' &&
      VISUAL_TRUTH_STATES.BLOCKED === 'BLOCKED') {
    console.log('  ✅ PASS: VISUAL_TRUTH_TAXONOMY_INTEGRITY (3-state taxonomy verified).');
    passedTests++;
  } else {
    console.error('  ❌ FAIL: Invalid visual truth states.');
  }

  // Test 2: STOP_SHIP_RELEASE_GATE_INVARIANT
  console.log('\n--- TEST 2: STOP_SHIP_RELEASE_GATE_INVARIANT ---');
  const releaseGateResult = verifyVisualTruthContract();
  if (releaseGateResult.status === 'VERIFIED AND LIVE' && releaseGateResult.blockedCount === 0) {
    console.log('  ✅ PASS: STOP_SHIP_RELEASE_GATE_INVARIANT (Live registry verified with 0 blocked items).');
    passedTests++;
  } else {
    console.error('  ❌ FAIL: Release gate returned stop-ship or blocked items.');
  }

  // Test 3: INCOMPLETE_CLAIM_TRIGGERS_HARD_BLOCKED
  console.log('\n--- TEST 3: INCOMPLETE_CLAIM_TRIGGERS_HARD_BLOCKED (FAIL-CLOSED) ---');
  const fakeCard = {
    card_id: 'FAKE_PROMO_01',
    brand: 'Fake Brand',
    visual_kind: 'VERIFIED_EXACT',
    asset_file_or_embed_url: 'assets/fake.png',
    // Missing source_page_url, missing rights_proof_artifact_path, missing bundle
  };
  const evalResult = evaluateVisualTruthState(fakeCard, false);
  if (evalResult.state === VISUAL_TRUTH_STATES.BLOCKED && evalResult.missing_criteria.length > 0) {
    console.log(`  ✅ PASS: INCOMPLETE_CLAIM_TRIGGERS_HARD_BLOCKED (Blocked correctly: missing ${evalResult.missing_criteria.length} criteria).`);
    passedTests++;
  } else {
    console.error('  ❌ FAIL: Fake card was not blocked!');
  }

  // Test 4: PUBLIC_KPI_TRANSPARENCY_ACCURACY
  console.log('\n--- TEST 4: PUBLIC_KPI_TRANSPARENCY_ACCURACY ---');
  const registry = JSON.parse(fs.readFileSync(path.join(sotDir, 'card_visual_evidence_registry.json'), 'utf8'));
  const promoCount = registry.dashboard_breakdown.verified_exact_visuals_count;
  const identCount = registry.dashboard_breakdown.jayt_identity_visuals_count;
  const blockCount = registry.dashboard_breakdown.blocked_assets_count;

  if (promoCount === 0 && identCount === 29 && blockCount === 0) {
    console.log(`  ✅ PASS: PUBLIC_KPI_TRANSPARENCY_ACCURACY (Exact: ${promoCount}/29, Identity: ${identCount}/29, Blocked: ${blockCount}/29).`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: Inaccurate KPIs: exact=${promoCount}, ident=${identCount}, blocked=${blockCount}`);
  }

  // Test 5: FORBIDDEN_SYNTHETIC_OVERCLAIMS_ZERO
  console.log('\n--- TEST 5: FORBIDDEN_SYNTHETIC_OVERCLAIMS_ZERO ---');
  const interfaceCode = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');
  const forbidden1 = interfaceCode.includes('OFFICIAL PROVENANCE ASSET · JAYT-215');
  const forbidden2 = interfaceCode.includes('Địa điểm thực địa đối soát') || interfaceCode.includes('ĐỊA ĐIỂM THỰC ĐỊA ĐỐI SOÁT');
  const forbidden3 = interfaceCode.includes('Ảnh/banner khuyến mãi chính thức (Khớp SHA-256)');

  if (!forbidden1 && !forbidden2 && !forbidden3) {
    console.log('  ✅ PASS: FORBIDDEN_SYNTHETIC_OVERCLAIMS_ZERO (0 forbidden synthetic claims in interface code).');
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: Forbidden claims found in interface code.`);
  }

  // Test 6: HANDOVER_STATUS_TAXONOMY_CONFORMANCE
  console.log('\n--- TEST 6: HANDOVER_STATUS_TAXONOMY_CONFORMANCE ---');
  const validHandoverStatuses = ['VERIFIED AND LIVE', 'BLOCKED WITH EVIDENCE', 'INCONCLUSIVE'];
  if (validHandoverStatuses.includes(releaseGateResult.status)) {
    console.log(`  ✅ PASS: HANDOVER_STATUS_TAXONOMY_CONFORMANCE (Result status: "${releaseGateResult.status}").`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: Invalid handover status: ${releaseGateResult.status}`);
  }

  console.log('\n========================================================================');
  if (passedTests === totalTests) {
    console.log(`🎉 ALL ${passedTests}/${totalTests} JAYT-217 TESTS PASSED [100% CONFORMANCE]\n`);
  } else {
    console.error(`❌ ONLY ${passedTests}/${totalTests} TESTS PASSED`);
    process.exit(1);
  }
}

if (require.main === module) {
  runTestSuite217();
}

module.exports = { runTestSuite217 };
