/**
 * scripts/test_j388_mutation_fixtures.cjs
 * Mandate: JAYT-388 / WORK_ORDER_J388_R2_EVIDENCE_EXECUTION (Build and Release Gate)
 * Deliberately tests 6 mutation fixtures:
 * 1. ID Mismatch Mutation
 * 2. URL Mismatch Mutation
 * 3. Variant Mismatch Mutation
 * 4. Price Mismatch Mutation
 * 5. Swapped Media Mutation
 * 6. Missing Snapshot Artifact Mutation
 *
 * Asserts that verifyArtifactIntegrity fails for every single mutation!
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { verifyArtifactIntegrity } = require('./verify_j388_build_equality.cjs');

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jayt_j388_mutation_tests_'));

const origRegistryPath = path.resolve('03_SOURCE_OF_TRUTH/j387/sku_registry.json');
const origApexPath = path.resolve('deploy/jayt_apex_interface.js');
const origHealthCheckPath = path.resolve('deploy/api/health-check.js');
const origEvidenceIndexPath = path.resolve('06_TRUST_AND_EVIDENCE/j388/sku_leaf_evidence_index.json');
const origSnapshotsDir = path.resolve('06_TRUST_AND_EVIDENCE/j388/raw_snapshots');
const origLeavesDir = path.resolve('06_TRUST_AND_EVIDENCE/j388/sku_leaves');

function createFixtureWorkspace() {
  const ws = {
    registry: path.join(tempDir, 'reg_' + Math.random().toString(36).slice(2) + '.json'),
    apex: path.join(tempDir, 'apex_' + Math.random().toString(36).slice(2) + '.js'),
    healthCheck: path.join(tempDir, 'hc_' + Math.random().toString(36).slice(2) + '.js'),
    evidenceIndex: path.join(tempDir, 'idx_' + Math.random().toString(36).slice(2) + '.json'),
    snapshotsDir: path.join(tempDir, 'snaps_' + Math.random().toString(36).slice(2)),
    leavesDir: path.join(tempDir, 'leaves_' + Math.random().toString(36).slice(2))
  };

  fs.copyFileSync(origRegistryPath, ws.registry);
  fs.copyFileSync(origApexPath, ws.apex);
  fs.copyFileSync(origHealthCheckPath, ws.healthCheck);
  fs.copyFileSync(origEvidenceIndexPath, ws.evidenceIndex);

  // Copy snapshot files
  fs.mkdirSync(ws.snapshotsDir, { recursive: true });
  fs.readdirSync(origSnapshotsDir).forEach(f => {
    fs.copyFileSync(path.join(origSnapshotsDir, f), path.join(ws.snapshotsDir, f));
  });

  // Copy leaf files
  fs.mkdirSync(ws.leavesDir, { recursive: true });
  fs.readdirSync(origLeavesDir).forEach(f => {
    fs.copyFileSync(path.join(origLeavesDir, f), path.join(ws.leavesDir, f));
  });

  return ws;
}

const testResults = [];

console.log('================================================================');
console.log('RUNNING JAYT-388 6-FIXTURE MUTATION TEST SUITE');
console.log('================================================================\n');

// -----------------------------------------------------------------------------
// TEST 1: ID MISMATCH MUTATION
// -----------------------------------------------------------------------------
{
  const ws = createFixtureWorkspace();
  let code = fs.readFileSync(ws.apex, 'utf8');
  code = code.replace('"sku_id": "DORM_SKU_01_OCAM_DIENQUANG"', '"sku_id": "DORM_SKU_01_MUTATED_WRONG_ID"');
  fs.writeFileSync(ws.apex, code, 'utf8');

  const res = verifyArtifactIntegrity({
    registryPath: ws.registry,
    apexPath: ws.apex,
    healthCheckPath: ws.healthCheck,
    evidenceIndexPath: ws.evidenceIndex,
    snapshotsDir: ws.snapshotsDir,
    leavesDir: ws.leavesDir
  });

  const passedMutationGate = !res.pass && res.errors.some(e => e.includes('Missing in UI') || e.includes('MUTATED'));
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
  code = code.replace(
    'https://shopee.vn/jisulife_official/quat-de-ban-life7-4000mah-p.281940192',
    'https://shopee.vn/attacker_fake/malicious-url-p.999999999'
  );
  fs.writeFileSync(ws.healthCheck, code, 'utf8');

  const res = verifyArtifactIntegrity({
    registryPath: ws.registry,
    apexPath: ws.apex,
    healthCheckPath: ws.healthCheck,
    evidenceIndexPath: ws.evidenceIndex,
    snapshotsDir: ws.snapshotsDir,
    leavesDir: ws.leavesDir
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
  let reg = JSON.parse(fs.readFileSync(ws.registry, 'utf8'));
  reg.skus[2].variant_id = 'TAMPERED_VARIANT_XYZ';
  fs.writeFileSync(ws.registry, JSON.stringify(reg, null, 2), 'utf8');

  const res = verifyArtifactIntegrity({
    registryPath: ws.registry,
    apexPath: ws.apex,
    healthCheckPath: ws.healthCheck,
    evidenceIndexPath: ws.evidenceIndex,
    snapshotsDir: ws.snapshotsDir,
    leavesDir: ws.leavesDir
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
  code = code.replace('"observed_price": 269000', '"observed_price": 1000');
  fs.writeFileSync(ws.apex, code, 'utf8');

  const res = verifyArtifactIntegrity({
    registryPath: ws.registry,
    apexPath: ws.apex,
    healthCheckPath: ws.healthCheck,
    evidenceIndexPath: ws.evidenceIndex,
    snapshotsDir: ws.snapshotsDir,
    leavesDir: ws.leavesDir
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
// TEST 5: SWAPPED MEDIA MUTATION
// -----------------------------------------------------------------------------
{
  const ws = createFixtureWorkspace();
  let code = fs.readFileSync(ws.apex, 'utf8');
  code = code.replace(
    '"media_classification": "LABELED_NEUTRAL_PLACEHOLDER"',
    '"media_classification": "OFFICIAL_PHYSICAL_STUDIO_PHOTO"'
  );
  fs.writeFileSync(ws.apex, code, 'utf8');

  const res = verifyArtifactIntegrity({
    registryPath: ws.registry,
    apexPath: ws.apex,
    healthCheckPath: ws.healthCheck,
    evidenceIndexPath: ws.evidenceIndex,
    snapshotsDir: ws.snapshotsDir,
    leavesDir: ws.leavesDir
  });

  const passedMutationGate = !res.pass && res.errors.some(e => e.includes('Media classification mismatch'));
  testResults.push({
    test: 'MUTATION_5_SWAPPED_MEDIA',
    expected_failure: true,
    actually_failed: !res.pass,
    passed_gate: passedMutationGate,
    error_sample: res.errors[0]
  });
  console.log('  5. Swapped Media Mutation:', passedMutationGate ? 'PASS (Properly Rejected)' : 'FAIL (Not Rejected)');
}

// -----------------------------------------------------------------------------
// TEST 6: MISSING SNAPSHOT ARTIFACT MUTATION
// -----------------------------------------------------------------------------
{
  const ws = createFixtureWorkspace();
  // Delete the physical snapshot file for SKU 01
  const targetSnapshot = path.join(ws.snapshotsDir, 'raw_snapshot_DORM_SKU_01_OCAM_DIENQUANG.json');
  if (fs.existsSync(targetSnapshot)) {
    fs.unlinkSync(targetSnapshot);
  }

  const res = verifyArtifactIntegrity({
    registryPath: ws.registry,
    apexPath: ws.apex,
    healthCheckPath: ws.healthCheck,
    evidenceIndexPath: ws.evidenceIndex,
    snapshotsDir: ws.snapshotsDir,
    leavesDir: ws.leavesDir
  });

  const passedMutationGate = !res.pass && res.errors.some(e => e.includes('Physical snapshot file missing on disk'));
  testResults.push({
    test: 'MUTATION_6_MISSING_SNAPSHOT_ARTIFACT',
    expected_failure: true,
    actually_failed: !res.pass,
    passed_gate: passedMutationGate,
    error_sample: res.errors[0]
  });
  console.log('  6. Missing Snapshot Artifact Mutation:', passedMutationGate ? 'PASS (Properly Rejected)' : 'FAIL (Not Rejected)');
}

console.log('\n================================================================');
const allPassed = testResults.every(t => t.passed_gate);
console.log(`MUTATION RESULTS: ${testResults.filter(t => t.passed_gate).length}/6 FIXTURES PROPERLY REJECTED`);
console.log('================================================================');

// Clean up tempDir
try {
  fs.rmSync(tempDir, { recursive: true, force: true });
} catch (e) {}

if (allPassed) {
  console.log('✅ ALL 6 MUTATION FIXTURES CAUGHT AND REJECTED BY BUILD INTEGRITY GATE!');
  process.exit(0);
} else {
  console.error('❌ SOME MUTATION FIXTURES WERE NOT CAUGHT!');
  process.exit(1);
}
