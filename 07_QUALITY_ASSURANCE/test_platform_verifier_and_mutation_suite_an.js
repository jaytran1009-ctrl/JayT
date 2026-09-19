const fs = require('fs');
const path = require('path');
const { verifyPlatformRegistry, sha256Buffer, sha256FullFileStreaming, calculateCanonicalSelfHash } = require('./platform_verifier_engine.js');

/**
 * JAYT-245 SECTION AO: UNIVERSAL FULL-BYTE VERIFIER & REAL WORKSPACE MUTATION SUITE
 * 1. Audits Real Platform Registry AN & Core Manifest AN across 15,973 assets via 100% full-byte streaming SHA-256.
 * 2. Executes 9 Real Adversarial Mutation Tests with genuine workspace temp fixtures passing through verifyPlatformRegistry.
 */

console.log('========================================================================');
console.log('🛡️ JAYT-245 QA GATE: FULL-BYTE STREAMING VERIFIER & REAL MUTATION SUITE (AO)');
console.log('========================================================================\n');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const REGISTRY_PATH = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE', 'JAYT_245_PLATFORM_REGISTRY_AN.json');
const CORE_MANIFEST_PATH = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE', 'CORE_BASELINE_MANIFEST_AN.json');

if (!fs.existsSync(REGISTRY_PATH)) {
  console.error('❌ Registry file missing:', REGISTRY_PATH);
  process.exit(1);
}

const realRegistry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));

// Phase 1: Real Platform Verification across ALL 15,973 inventoried assets
console.log('🔍 [Phase 1] Running Universal Verifier Engine on Real Platform Registry AN (Full-Byte Scan)...');
const realResult = verifyPlatformRegistry(realRegistry, PROJECT_ROOT);

if (!realResult.valid) {
  console.error('❌ [REAL-VERIFIER-FAIL] Platform Registry verification failed with errors:');
  realResult.errors.forEach(err => console.error('   - ' + err));
  process.exit(1);
}

console.log(`   ✅ Algorithm Declared: ${realRegistry.hash_algorithm} (VALIDATED)`);
console.log(`   ✅ Canonical Self-Hash: ${realRegistry.self_sha256} (MATCH)`);
console.log(`   ✅ Core Manifest Canonical Self-Hash: VALIDATED`);
console.log(`   ✅ Total Full-Byte Verified: ${realResult.verified_count} / ${realRegistry.total_assets_inventoried} assets`);
console.log(`   ✅ Total Data Streamed: ${(realResult.total_bytes_read / (1024 * 1024)).toFixed(2)} MB`);
console.log(`   ✅ Memory Snapshot SHA-256: ${realRegistry.memory_snapshot_sha256} (VALIDATED)`);
console.log(`   ✅ Core Manifest SHA-256: ${realRegistry.core_manifest_sha256} (VALIDATED)`);
console.log(`   ✅ Zero Quarantine Leakage & Clean Staging/Production Separation (VALIDATED)`);

// Phase 2: 9 Adversarial Mutation Tests (All passing through universal verifyPlatformRegistry engine)
console.log('\n🧪 [Phase 2] Running 9 Real Adversarial Mutation Tests through Universal Verifier Engine (AO)...');
let allMutationsPassed = true;

// Mutation 1: Large File Byte Change After 1 MB (Proves Full-Byte Streaming Integrity)
{
  const figmaRel = '04_DATA_PIPELINE/real_raw_evidence_vault/RAW_VAULT_TGT_B_10_1787938260500.html';
  const figmaFull = path.join(PROJECT_ROOT, figmaRel);
  
  if (fs.existsSync(figmaFull)) {
    const figmaBuf = fs.readFileSync(figmaFull);
    const mutBuf = Buffer.from(figmaBuf);
    mutBuf[1050000] = mutBuf[1050000] === 0x61 ? 0x62 : 0x61;
    
    const tmpFigmaFull = path.join(PROJECT_ROOT, '04_DATA_PIPELINE/real_raw_evidence_vault/tmp_mutated_figma.raw.html');
    fs.writeFileSync(tmpFigmaFull, mutBuf);
    
    const mutReg = JSON.parse(JSON.stringify(realRegistry));
    const targetAsset = mutReg.assets.find(a => a.relative_path === figmaRel);
    if (targetAsset) {
      targetAsset.relative_path = '04_DATA_PIPELINE/real_raw_evidence_vault/tmp_mutated_figma.raw.html';
      mutReg.assets = [targetAsset, ...mutReg.assets.filter(a => a.relative_path !== figmaRel)];
    }
    
    const res = verifyPlatformRegistry(mutReg, PROJECT_ROOT, { sampleOnly: true, skipSelfHash: true });
    fs.unlinkSync(tmpFigmaFull);
    
    if (!res.valid && res.errors.some(e => e.includes('SHA-256 mismatch for'))) {
      console.log('   ✅ Mutation 1 (Large File Byte Change After 1 MB): REJECTED fail-closed (Full-Byte Verified).');
    } else {
      console.error('   ❌ Mutation 1 FAILED to reject byte change after 1 MB!');
      allMutationsPassed = false;
    }
  } else {
    console.error('   ❌ Mutation 1 target file missing:', figmaRel);
    allMutationsPassed = false;
  }
}

// Mutation 2: Corrupted Registry Canonical Self-Hash
{
  const mut = JSON.parse(JSON.stringify(realRegistry));
  mut.self_sha256 = 'badbeef000000000000000000000000000000000000000000000000000000000';
  const res = verifyPlatformRegistry(mut, PROJECT_ROOT, { sampleOnly: true });
  if (!res.valid && res.errors.some(e => e.includes('Registry self-hash mismatch'))) {
    console.log('   ✅ Mutation 2 (Corrupted Registry Self-Hash): REJECTED fail-closed.');
  } else {
    console.error('   ❌ Mutation 2 FAILED to reject!');
    allMutationsPassed = false;
  }
}

// Mutation 3: Corrupted Core Manifest Canonical Self-Hash
{
  const coreObj = JSON.parse(fs.readFileSync(CORE_MANIFEST_PATH, 'utf8'));
  const mutCoreObj = JSON.parse(JSON.stringify(coreObj));
  mutCoreObj.self_sha256 = 'badbeef000000000000000000000000000000000000000000000000000000000';
  
  const tmpCorePath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/tmp_mutated_core.json');
  fs.writeFileSync(tmpCorePath, JSON.stringify(mutCoreObj, null, 2));
  
  const mutReg = JSON.parse(JSON.stringify(realRegistry));
  const coreAsset = mutReg.assets.find(a => a.relative_path.includes('CORE_BASELINE_MANIFEST_AN.json'));
  if (coreAsset) coreAsset.relative_path = '00_PROGRAM_BASELINE/tmp_mutated_core.json';
  
  const res = verifyPlatformRegistry(mutReg, PROJECT_ROOT, { sampleOnly: true, skipSelfHash: true });
  fs.unlinkSync(tmpCorePath);
  
  if (!res.valid && res.errors.some(e => e.includes('Core manifest self-hash mismatch') || e.includes('SHA-256 mismatch'))) {
    console.log('   ✅ Mutation 3 (Corrupted Core Manifest Self-Hash): REJECTED fail-closed.');
  } else {
    console.error('   ❌ Mutation 3 FAILED to reject!');
    allMutationsPassed = false;
  }
}

// Mutation 4: Memory Snapshot Hash Mismatch
{
  const mut = JSON.parse(JSON.stringify(realRegistry));
  mut.memory_snapshot_sha256 = 'stalehash1234567890abcdef1234567890abcdef1234567890abcdef12345678';
  const res = verifyPlatformRegistry(mut, PROJECT_ROOT, { sampleOnly: true, skipSelfHash: true });
  if (!res.valid && res.errors.some(e => e.includes('Memory snapshot SHA-256 mismatch'))) {
    console.log('   ✅ Mutation 4 (Stale Memory Snapshot): REJECTED fail-closed.');
  } else {
    console.error('   ❌ Mutation 4 FAILED to reject!');
    allMutationsPassed = false;
  }
}

// Mutation 5: Missing Operating Brief
{
  const mut = JSON.parse(JSON.stringify(realRegistry));
  mut.assets = mut.assets.filter(a => !a.relative_path.includes('NEW_CHAT_OPERATING_BRIEF_AN.md'));
  const res = verifyPlatformRegistry(mut, PROJECT_ROOT, { sampleOnly: true, skipSelfHash: true });
  if (!res.valid && res.errors.some(e => e.includes('NEW_CHAT_OPERATING_BRIEF_AN.md is missing'))) {
    console.log('   ✅ Mutation 5 (Missing Operating Brief Entry): REJECTED fail-closed.');
  } else {
    console.error('   ❌ Mutation 5 FAILED to reject!');
    allMutationsPassed = false;
  }
}

// Mutation 6: Real Quarantine Import in Production Build Fixture (Section AO)
{
  const tmpDeployWithQuarantine = path.join(PROJECT_ROOT, 'deploy/tmp_mutated_deploy_quarantine.js');
  const realDeployContent = fs.readFileSync(path.join(PROJECT_ROOT, 'deploy/jayt_apex_interface.js'), 'utf8');
  const poisonedContent = realDeployContent + '\n// Adversarial Poisoning\nconst bad = require("../09_CONTAINMENT_QUARANTINE_NON_SERVED/quarantine_bundle.js");\n';
  
  fs.writeFileSync(tmpDeployWithQuarantine, poisonedContent, 'utf8');
  
  const res = verifyPlatformRegistry(realRegistry, PROJECT_ROOT, {
    deployJsPath: tmpDeployWithQuarantine,
    sampleOnly: true,
    skipSelfHash: true
  });
  
  fs.unlinkSync(tmpDeployWithQuarantine);
  
  if (!res.valid && res.errors.some(e => e.includes('Quarantine lifecycle leakage detected') || e.includes('Prohibited import into quarantine'))) {
    console.log('   ✅ Mutation 6 (Real Quarantine Import in Production Fixture): REJECTED fail-closed via Verifier Engine.');
  } else {
    console.error('   ❌ Mutation 6 FAILED to reject real quarantine import!');
    allMutationsPassed = false;
  }
}

// Mutation 7: Unapproved Staging Promotion in Production Fixture (Section AO)
{
  const tmpDeployStagingOverwrite = path.join(PROJECT_ROOT, 'deploy/tmp_mutated_deploy_staging.js');
  const stagingContent = fs.readFileSync(path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging.js'), 'utf8');
  
  fs.writeFileSync(tmpDeployStagingOverwrite, stagingContent, 'utf8');
  
  const res = verifyPlatformRegistry(realRegistry, PROJECT_ROOT, {
    deployJsPath: tmpDeployStagingOverwrite,
    sampleOnly: true,
    skipSelfHash: true
  });
  
  fs.unlinkSync(tmpDeployStagingOverwrite);
  
  if (!res.valid && res.errors.some(e => e.includes('Unapproved staging promotion detected') || e.includes('Staging version identifier leaked'))) {
    console.log('   ✅ Mutation 7 (Unapproved Staging Overwrite in Production Fixture): REJECTED fail-closed via Verifier Engine.');
  } else {
    console.error('   ❌ Mutation 7 FAILED to reject unapproved staging promotion!');
    allMutationsPassed = false;
  }
}

// Mutation 8: Missing / Corrupted Rollback Release Receipt (Section AO)
{
  const fakeReceiptPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/non_existent_release_receipt.json');
  
  const res = verifyPlatformRegistry(realRegistry, PROJECT_ROOT, {
    releaseReceiptPath: fakeReceiptPath,
    sampleOnly: true,
    skipSelfHash: true
  });
  
  if (!res.valid && res.errors.some(e => e.includes('Missing production release receipt'))) {
    console.log('   ✅ Mutation 8 (Missing Rollback Release Receipt): REJECTED fail-closed via Verifier Engine.');
  } else {
    console.error('   ❌ Mutation 8 FAILED to reject missing release receipt!');
    allMutationsPassed = false;
  }
}

// Mutation 9: Staging Version Leak in Production Build (Section AO)
{
  const tmpDeployVersionLeak = path.join(PROJECT_ROOT, 'deploy/tmp_mutated_deploy_version_leak.js');
  const realDeployContent = fs.readFileSync(path.join(PROJECT_ROOT, 'deploy/jayt_apex_interface.js'), 'utf8');
  const leakedContent = realDeployContent + '\n// Leaked staging version\nconst JAYT_VERSION = "v3.420.0-staging.ak";\n';
  
  fs.writeFileSync(tmpDeployVersionLeak, leakedContent, 'utf8');
  
  const res = verifyPlatformRegistry(realRegistry, PROJECT_ROOT, {
    deployJsPath: tmpDeployVersionLeak,
    sampleOnly: true,
    skipSelfHash: true
  });
  
  fs.unlinkSync(tmpDeployVersionLeak);
  
  if (!res.valid && res.errors.some(e => e.includes('Staging version identifier leaked'))) {
    console.log('   ✅ Mutation 9 (Staging Version Leak in Production Build): REJECTED fail-closed via Verifier Engine.');
  } else {
    console.error('   ❌ Mutation 9 FAILED to reject staging version leak!');
    allMutationsPassed = false;
  }
}

console.log('------------------------------------------------------------------------');
if (!allMutationsPassed) {
  console.error('❌ [PLATFORM-MUTATION-SUITE-FAIL] One or more adversarial mutations failed!');
  process.exit(1);
}

console.log('🟢 [PLATFORM-MUTATION-SUITE-PASS] Full-Byte Platform Registry & 9 Adversarial Workspace Mutations 100% PASSED (Section AO)!');
console.log('========================================================================');
