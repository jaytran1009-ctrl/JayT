/**
 * scripts/test_j387_mutation_fixtures.cjs
 * Mandate: JAYT-387 / WORK_ORDER_J387_LEVEL_MAX_INTEGRITY (M0 Mutation Fixtures)
 * Deliberately tests 5 mutation fixtures: ID, URL, Variant, Price, Swapped Media.
 * Asserts that verifyBuildEquality fails for every single mutation!
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { verifyBuildEquality } = require('./verify_j387_build_equality.cjs');

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jayt_mutation_tests_'));

const origRegistryPath = path.resolve('03_SOURCE_OF_TRUTH/j387/sku_registry.json');
const origApexPath = path.resolve('deploy/jayt_apex_interface.js');
const origHealthCheckPath = path.resolve('deploy/api/health-check.js');
const origEvidencePath = path.resolve('06_TRUST_AND_EVIDENCE/j387/product_and_offer_evidence.json');

function createFixtureWorkspace() {
  const ws = {
    registry: path.join(tempDir, 'reg_' + Math.random().toString(36).slice(2) + '.json'),
    apex: path.join(tempDir, 'apex_' + Math.random().toString(36).slice(2) + '.js'),
    healthCheck: path.join(tempDir, 'hc_' + Math.random().toString(36).slice(2) + '.js'),
    evidence: path.join(tempDir, 'ev_' + Math.random().toString(36).slice(2) + '.json')
  };

  fs.copyFileSync(origRegistryPath, ws.registry);
  fs.copyFileSync(origApexPath, ws.apex);
  fs.copyFileSync(origHealthCheckPath, ws.healthCheck);
  fs.copyFileSync(origEvidencePath, ws.evidence);

  return ws;
}

const testResults = [];

console.log('[MUTATION FIXTURE SUITE] Starting deliberate mutation tests...');

// -----------------------------------------------------------------------------
// TEST 1: ID MISMATCH MUTATION
// -----------------------------------------------------------------------------
{
  const ws = createFixtureWorkspace();
  let code = fs.readFileSync(ws.apex, 'utf8');
  // Mutate SKU 01 ID in UI
  code = code.replace('"sku_id": "DORM_SKU_01_OCAM_DIENQUANG"', '"sku_id": "DORM_SKU_01_MUTATED_WRONG_ID"');
  fs.writeFileSync(ws.apex, code, 'utf8');

  const res = verifyBuildEquality({
    registryPath: ws.registry,
    apexPath: ws.apex,
    healthCheckPath: ws.healthCheck,
    evidencePath: ws.evidence
  });

  const passedMutationGate = !res.pass && res.errors.some(e => e.includes('Missing in UI J387_DORM_SKUS') || e.includes('MUTATED'));
  testResults.push({
    test: 'MUTATION_1_ID_MISMATCH',
    expected_failure: true,
    actually_failed: !res.pass,
    passed_gate: passedMutationGate,
    error_sample: res.errors[0]
  });
  console.log('  1. ID Mismatch Mutation:', passedMutationGate ? 'PASS (Properly Rejected)' : 'FAIL (Not Rejected)');
}

// -----------------------------------------------------------------------------
// TEST 2: URL MISMATCH MUTATION
// -----------------------------------------------------------------------------
{
  const ws = createFixtureWorkspace();
  let code = fs.readFileSync(ws.healthCheck, 'utf8');
  // Mutate URL of SKU 02 in health check
  code = code.replace(
    'https://shopee.vn/jisulife_official/quat-de-ban-life7-4000mah-p.281940192',
    'https://shopee.vn/attacker_fake/malicious-url-p.999999999'
  );
  fs.writeFileSync(ws.healthCheck, code, 'utf8');

  const res = verifyBuildEquality({
    registryPath: ws.registry,
    apexPath: ws.apex,
    healthCheckPath: ws.healthCheck,
    evidencePath: ws.evidence
  });

  const passedMutationGate = !res.pass && res.errors.some(e => e.includes('Canonical URL mismatch'));
  testResults.push({
    test: 'MUTATION_2_URL_MISMATCH',
    expected_failure: true,
    actually_failed: !res.pass,
    passed_gate: passedMutationGate,
    error_sample: res.errors[0]
  });
  console.log('  2. URL Mismatch Mutation:', passedMutationGate ? 'PASS (Properly Rejected)' : 'FAIL (Not Rejected)');
}

// -----------------------------------------------------------------------------
// TEST 3: VARIANT MISMATCH MUTATION
// -----------------------------------------------------------------------------
{
  const ws = createFixtureWorkspace();
  let code = fs.readFileSync(ws.apex, 'utf8');
  // Mutate variant ID in UI
  code = code.replace('"variant_id": "DQ_ESV_04U_2M"', '"variant_id": "CORRUPTED_VARIANT_XYZ"');
  fs.writeFileSync(ws.apex, code, 'utf8');

  const res = verifyBuildEquality({
    registryPath: ws.registry,
    apexPath: ws.apex,
    healthCheckPath: ws.healthCheck,
    evidencePath: ws.evidence
  });

  const passedMutationGate = !res.pass && res.errors.some(e => e.includes('Variant ID mismatch'));
  testResults.push({
    test: 'MUTATION_3_VARIANT_MISMATCH',
    expected_failure: true,
    actually_failed: !res.pass,
    passed_gate: passedMutationGate,
    error_sample: res.errors[0]
  });
  console.log('  3. Variant Mismatch Mutation:', passedMutationGate ? 'PASS (Properly Rejected)' : 'FAIL (Not Rejected)');
}

// -----------------------------------------------------------------------------
// TEST 4: PRICE MISMATCH MUTATION
// -----------------------------------------------------------------------------
{
  const ws = createFixtureWorkspace();
  let code = fs.readFileSync(ws.apex, 'utf8');
  // Mutate observed price of SKU 01 in UI
  code = code.replace('"observed_price": 119000', '"observed_price": 999999');
  fs.writeFileSync(ws.apex, code, 'utf8');

  const res = verifyBuildEquality({
    registryPath: ws.registry,
    apexPath: ws.apex,
    healthCheckPath: ws.healthCheck,
    evidencePath: ws.evidence
  });

  const passedMutationGate = !res.pass && res.errors.some(e => e.includes('Price mismatch'));
  testResults.push({
    test: 'MUTATION_4_PRICE_MISMATCH',
    expected_failure: true,
    actually_failed: !res.pass,
    passed_gate: passedMutationGate,
    error_sample: res.errors[0]
  });
  console.log('  4. Price Mismatch Mutation:', passedMutationGate ? 'PASS (Properly Rejected)' : 'FAIL (Not Rejected)');
}

// -----------------------------------------------------------------------------
// TEST 5: SWAPPED MEDIA MAPPING MUTATION
// -----------------------------------------------------------------------------
{
  const ws = createFixtureWorkspace();
  let code = fs.readFileSync(ws.apex, 'utf8');
  // Swap media path in UI for SKU 01
  code = code.replace(
    '"asset_path": "assets/images/products/dorm_item_placeholder.svg"',
    '"asset_path": "assets/images/products/sku_01_sunhouse_kettle_shd1182.svg"'
  );
  fs.writeFileSync(ws.apex, code, 'utf8');

  const res = verifyBuildEquality({
    registryPath: ws.registry,
    apexPath: ws.apex,
    healthCheckPath: ws.healthCheck,
    evidencePath: ws.evidence
  });

  const passedMutationGate = !res.pass && res.errors.some(e => e.includes('Media asset path mismatch'));
  testResults.push({
    test: 'MUTATION_5_SWAPPED_MEDIA',
    expected_failure: true,
    actually_failed: !res.pass,
    passed_gate: passedMutationGate,
    error_sample: res.errors[0]
  });
  console.log('  5. Swapped Media Mutation:', passedMutationGate ? 'PASS (Properly Rejected)' : 'FAIL (Not Rejected)');
}

// Summary
const allPassed = testResults.every(r => r.passed_gate);
console.log('\n[MUTATION FIXTURE SUITE] Overall Result:', allPassed ? '5/5 PASS (100% GATED)' : 'FAIL');

// Cleanup
try {
  fs.rmSync(tempDir, { recursive: true, force: true });
} catch (e) {}

if (!allPassed) {
  process.exit(1);
} else {
  process.exit(0);
}
