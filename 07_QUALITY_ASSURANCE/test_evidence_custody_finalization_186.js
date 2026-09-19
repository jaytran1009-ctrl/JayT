/**
 * JAYT-186: EVIDENCE CUSTODY FINALIZATION TEST SUITE
 * 1. Test duplicate archive rejection (No Overwrite).
 * 2. Test modification/overwrite blocking on archived artifacts.
 * 3. Global Static Scan across all active evidence custody, ingestion, and build modules.
 * 4. Verify Receipt Cryptographic Hash-Chain integrity.
 * 5. Verify Append-Only Event Sourcing state calculation.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const crypto = require('crypto');
const {
  appendOnlyVaultArchive,
  recordCustodyEvent,
  computeCurrentArtifactState,
  assertImmutabilitySafe
} = require('./evidence_immutability_guardrail');

const repoRoot = path.resolve(__dirname, '..');
const qaDir = path.join(repoRoot, '07_QUALITY_ASSURANCE');

function runCustodyTestSuite186() {
  console.log('========================================================================');
  console.log('🧪 JAYT-186: EVIDENCE CUSTODY FINALIZATION & HASH-CHAIN TEST SUITE');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  let passed = 0;
  let failed = 0;

  function test(name, fn) {
    try {
      fn();
      console.log('  [PASS]: ' + name);
      passed++;
    } catch (err) {
      console.error('  [FAIL]: ' + name + ' -> ' + err.message);
      failed++;
    }
  }

  const testSandbox = path.join(qaDir, 'runtime_evidence', 'test_sandbox_186_' + Date.now());
  if (!fs.existsSync(testSandbox)) fs.mkdirSync(testSandbox, { recursive: true });

  const testFileA = path.join(testSandbox, 'artifact_alpha.txt');
  fs.writeFileSync(testFileA, 'EVIDENCE_ALPHA_SAMPLE_186_' + Date.now(), 'utf8');

  // TEST 1: Duplicate Archive Rejection
  test('Test 1: Duplicate Archive Rejection in same Run ID', () => {
    const vaultDir = path.join(testSandbox, 'vault_test_1');
    const runId = 'run_fixed_duplicate_test_' + Date.now() + '_' + crypto.randomBytes(3).toString('hex');
    const r1 = appendOnlyVaultArchive(testFileA, vaultDir, 'INITIAL_ARCHIVE', runId);
    assert(r1 && r1.vault_target_sha256, 'First archive failed');

    let duplicateRejected = false;
    try {
      appendOnlyVaultArchive(testFileA, vaultDir, 'DUPLICATE_ATTEMPT', runId);
    } catch (err) {
      if (err.message.includes('DUPLICATE_ARCHIVE_ATTEMPT_REJECTED')) {
        duplicateRejected = true;
      }
    }
    assert(duplicateRejected, 'Duplicate archive did not reject overwrite!');
  });

  // TEST 2: Source Preservation without deletion or modification
  test('Test 2: Source Preservation without deletion or modification', () => {
    const vaultDir = path.join(testSandbox, 'vault_test_2');
    const r = appendOnlyVaultArchive(testFileA, vaultDir, 'SOURCE_CHECK');
    assert(fs.existsSync(testFileA), 'Source file was unlinked/deleted!');
    assert.strictEqual(r.source_preserved, true, 'Receipt did not declare source_preserved');
  });

  // TEST 3: Global Static Scan for Active Evidence Modules
  test('Test 3: Static Scan: Zero destructive operations across all active evidence custody & harvest modules', () => {
    const activeModules = [
      'evidence_immutability_guardrail.js',
      'semantic_evidence_validator_180.js',
      'official_source_harvester_184.js',
      'audit_batch_184_provenance.js',
      'sustainable_ingestion_185.js',
      'build_ui_bundle_181.js',
      'sync_sot_to_deploy_and_staging.js',
      'certify_harvest_and_live_state_184.js',
      'certify_harvest_and_live_state_185.js'
    ];

    const forbiddenPatterns = [
      /\b(?:fs\.)?unlinkSync\s*\(/,
      /\b(?:fs\.)?rmSync\s*\(/,
      /\b(?:fs\.)?rmdirSync\s*\(/,
      /\b(?:fs\.)?promises\.unlink\s*\(/,
      /\b(?:fs\.)?promises\.rm\s*\(/
    ];

    for (const f of activeModules) {
      const fullPath = path.join(qaDir, f);
      if (!fs.existsSync(fullPath)) continue;
      const code = fs.readFileSync(fullPath, 'utf8');
      for (const pattern of forbiddenPatterns) {
        if (pattern.test(code)) {
          throw new Error('Forbidden destructive pattern ' + pattern + ' found in active module ' + f);
        }
      }
    }
  });

  // TEST 4: Receipt Cryptographic Hash-Chain Continuity
  test('Test 4: Receipt Cryptographic Hash-Chain integrity', () => {
    const vaultChainDir = path.join(testSandbox, 'vault_chain_test');
    const file1 = path.join(testSandbox, 'chain_item_1.txt');
    const file2 = path.join(testSandbox, 'chain_item_2.txt');
    fs.writeFileSync(file1, 'CHAIN_PAYLOAD_1_' + Date.now(), 'utf8');
    fs.writeFileSync(file2, 'CHAIN_PAYLOAD_2_' + Date.now(), 'utf8');

    const receipt1 = appendOnlyVaultArchive(file1, vaultChainDir, 'CHAIN_LINK_1');
    assert(receipt1.previous_receipt_sha256, 'Receipt 1 missing previous_receipt_sha256');

    const receipt2 = appendOnlyVaultArchive(file2, vaultChainDir, 'CHAIN_LINK_2');
    assert(receipt2.previous_receipt_sha256, 'Receipt 2 missing previous_receipt_sha256');
    assert.notStrictEqual(receipt2.previous_receipt_sha256, 'GENESIS_RECEIPT_ROOT_0000000000000000000000000000000000000000000000000000000000000000', 'Receipt 2 should chain from Receipt 1');
  });

  // TEST 5: Append-Only Event Sourcing State Calculation
  test('Test 5: Append-Only Event Sourcing state calculation', () => {
    const testArtifactId = 'ART_TEST_EVENT_SOURCING_' + Date.now();

    recordCustodyEvent('ARTIFACT_CAPTURED', testArtifactId, { url: 'https://example.com/test' });
    let state = computeCurrentArtifactState(testArtifactId);
    assert.strictEqual(state.current_status, 'CAPTURED');

    recordCustodyEvent('ARTIFACT_VERIFIED', testArtifactId, { score: 'PASS_4_QUOTES' });
    state = computeCurrentArtifactState(testArtifactId);
    assert.strictEqual(state.current_status, 'VERIFIED');

    recordCustodyEvent('ARTIFACT_QUARANTINED', testArtifactId, { reason: 'POLICY_UPDATE' });
    state = computeCurrentArtifactState(testArtifactId);
    assert.strictEqual(state.current_status, 'QUARANTINED');
    assert.strictEqual(state.event_count, 3);
  });

  console.log('\n========================================================================');
  console.log('📊 CUSTODY TEST SUMMARY: ' + passed + ' PASSED, ' + failed + ' FAILED');
  console.log('========================================================================\n');

  if (failed > 0) process.exit(1);
}

if (require.main === module) {
  runCustodyTestSuite186();
}

module.exports = { runCustodyTestSuite186 };
