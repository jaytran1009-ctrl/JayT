/**
 * JAYT-185: EVIDENCE IMMUTABILITY GUARDRAIL TEST SUITE
 * Verifies that:
 * 1. Active evidence management scripts do not contain unlink/rm operations.
 * 2. appendOnlyVaultArchive strictly preserves source files and generates dual-hash receipts.
 * 3. assertImmutabilitySafe protects all designated evidence/vault directories.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { appendOnlyVaultArchive, assertImmutabilitySafe } = require('./evidence_immutability_guardrail');

const repoRoot = path.resolve(__dirname, '..');
const qaDir = path.join(repoRoot, '07_QUALITY_ASSURANCE');

function runImmutabilityTestSuite() {
  console.log('========================================================================');
  console.log('🧪 JAYT-185: EVIDENCE IMMUTABILITY GUARDRAIL TEST SUITE');
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

  // TEST 1: Static Codebase Scan for Unlink/Rm in Evidence Management Scripts
  test('Static AST/Regex Scan: Zero unlink or rm in active evidence management modules', () => {
    const activeEvidenceModules = [
      'evidence_immutability_guardrail.js',
      'semantic_evidence_validator_180.js',
      'official_source_harvester_184.js',
      'build_ui_bundle_181.js',
      'certify_harvest_and_live_state_184.js'
    ];

    const forbiddenPatterns = [
      /\b(?:fs\.)?unlinkSync\s*\(/,
      /\b(?:fs\.)?rmSync\s*\(/,
      /\b(?:fs\.)?rmdirSync\s*\(/,
      /\b(?:fs\.)?promises\.unlink\s*\(/,
      /\b(?:fs\.)?promises\.rm\s*\(/
    ];

    for (const f of activeEvidenceModules) {
      const fullPath = path.join(qaDir, f);
      if (!fs.existsSync(fullPath)) continue;
      const code = fs.readFileSync(fullPath, 'utf8');
      for (const pattern of forbiddenPatterns) {
        if (pattern.test(code)) {
          throw new Error('Forbidden destructive pattern ' + pattern + ' found in ' + f);
        }
      }
    }
  });

  // TEST 2: Runtime Test for appendOnlyVaultArchive
  test('Runtime Verification: appendOnlyVaultArchive preserves source file', () => {
    const testDir = path.join(qaDir, 'runtime_evidence', 'test_sandbox_185');
    if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });

    const testFile = path.join(testDir, 'sample_evidence.txt');
    fs.writeFileSync(testFile, 'JAYT_185_IMMUTABLE_EVIDENCE_PROVENANCE_' + Date.now(), 'utf8');

    const vaultDir = path.join(testDir, 'vault_dest');
    const receipt = appendOnlyVaultArchive(testFile, vaultDir, 'TEST_ARCHIVE');

    // Assert source file still exists
    assert(fs.existsSync(testFile), 'Source file was deleted or unlinked!');
    // Assert target vault file exists
    assert(fs.existsSync(receipt.vault_target_path), 'Vault copy was not created!');
    // Assert hashes match
    assert.strictEqual(receipt.source_sha256, receipt.vault_target_sha256, 'SHA-256 mismatch in receipt');
    assert.strictEqual(receipt.source_preserved, true, 'Receipt did not declare source_preserved');
  });

  // TEST 3: assertImmutabilitySafe throws on protected paths
  test('Runtime Verification: assertImmutabilitySafe guards protected directories', () => {
    let caught = false;
    try {
      assertImmutabilitySafe('07_QUALITY_ASSURANCE/runtime_evidence/evidence_184_harvest/artifact_1.html');
    } catch (e) {
      caught = true;
    }
    assert(caught, 'assertImmutabilitySafe failed to reject destructive operation on runtime_evidence');
  });

  console.log('\n========================================================================');
  console.log('📊 TEST SUMMARY: ' + passed + ' PASSED, ' + failed + ' FAILED');
  console.log('========================================================================\n');

  if (failed > 0) process.exit(1);
}

if (require.main === module) {
  runImmutabilityTestSuite();
}

module.exports = { runImmutabilityTestSuite };
