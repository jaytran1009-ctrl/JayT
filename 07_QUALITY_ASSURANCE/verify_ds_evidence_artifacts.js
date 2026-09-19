/**
 * SECTION DS — INDEPENDENT EVIDENCE ARTIFACT VERIFIER
 * Governing: JAYT-245 Section DS (Lines 2917-2932)
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PROJECT_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const VAULT_DIR = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/evidence_vault_ds');
const MANIFEST_PATH = path.join(VAULT_DIR, 'EVIDENCE_MANIFEST_DS.json');

console.log('========================================================================');
console.log('🛡️  SECTION DS — INDEPENDENT EVIDENCE ARTIFACT VERIFIER');
console.log(`   Manifest: ${MANIFEST_PATH}`);
console.log('========================================================================\n');

let passedTests = 0;
let totalTests = 0;

function assertTest(desc, condition) {
  totalTests++;
  if (condition) {
    console.log(`✅ PASS [${totalTests}]: ${desc}`);
    passedTests++;
  } else {
    console.error(`❌ FAIL [${totalTests}]: ${desc}`);
  }
}

if (!fs.existsSync(MANIFEST_PATH)) {
  console.error('❌ Manifest file missing!');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

// Test 1: Total artifacts count in manifest
assertTest('Manifest contains 5 evidence artifact records', manifest.artifacts.length === 5);

// Test 2: Verify time integrity of the manifest itself
const genTime = Date.parse(manifest.artifact_generated_at);
const signTime = Date.parse(manifest.signed_at);
assertTest('Manifest artifact_generated_at is valid ISO-8601 UTC', !isNaN(genTime) && manifest.artifact_generated_at.endsWith('Z'));
assertTest('Manifest signed_at is valid ISO-8601 UTC', !isNaN(signTime) && manifest.signed_at.endsWith('Z'));
assertTest('Manifest chronology valid (generated_at <= signed_at)', genTime <= signTime);

// Test 3: Inspect each artifact on disk against manifest metadata
manifest.artifacts.forEach((entry, idx) => {
  const filePath = path.join(PROJECT_ROOT, entry.relative_path);
  const exists = fs.existsSync(filePath);
  assertTest(`[${entry.candidate_id}] Artifact file exists on disk (${entry.artifact_filename})`, exists);

  if (exists) {
    const fileBuffer = fs.readFileSync(filePath);
    const actualSha256 = crypto.createHash('sha256').update(fileBuffer).digest('hex');
    const actualSize = fileBuffer.length;

    assertTest(`[${entry.candidate_id}] Actual file size (${actualSize} bytes) matches manifest (${entry.byte_size} bytes)`, actualSize === entry.byte_size);
    assertTest(`[${entry.candidate_id}] Actual SHA256 checksum (${actualSha256.substring(0, 16)}...) matches manifest (${entry.sha256.substring(0, 16)}...)`, actualSha256 === entry.sha256);

    const fetchTime = Date.parse(entry.fetched_at_utc);
    assertTest(`[${entry.candidate_id}] Fetch timestamp (${entry.fetched_at_utc}) is valid and <= generated_at`, !isNaN(fetchTime) && fetchTime <= genTime);
  }
});

// Test 4: Verification of candidate decisions and quarantine rules
const bunChaCa = manifest.artifacts.find(a => a.candidate_id === 'CAND_BUN_CHA_CA_109');
assertTest('Bún Chả Cá 109 artifact matches CITY_PORTAL_ROOT and is isolated to DISCOVERY_LEAD', bunChaCa && bunChaCa.pipeline_stage === 'DISCOVERY_LEAD' && bunChaCa.reviewer_decision === 'QUARANTINED_CITY_PORTAL_ROOT');

const comGaAHai = manifest.artifacts.find(a => a.candidate_id === 'CAND_COM_GA_A_HAI');
assertTest('Cơm Gà A Hải artifact matches SOCIAL_PROFILE_SHELL and is UNVERIFIED_BLOCKED_DYNAMIC_SHELL', comGaAHai && comGaAHai.pipeline_stage === 'CAPTURE_RETRY_REQUIRED' && comGaAHai.reviewer_decision === 'UNVERIFIED_BLOCKED_DYNAMIC_SHELL');

const thuVienDut = manifest.artifacts.find(a => a.candidate_id === 'CAND_THU_VIEN_DUT');
assertTest('Thư viện ĐHBK artifact is CAPTURE_PENDING awaiting open policy verification', thuVienDut && thuVienDut.pipeline_stage === 'CAPTURE_PENDING');

const busR16A = manifest.artifacts.find(a => a.candidate_id === 'CAND_BUS_R16A');
assertTest('Buýt R16A artifact is CAPTURE_PENDING awaiting timetable capture', busR16A && busR16A.pipeline_stage === 'CAPTURE_PENDING');

console.log('\n------------------------------------------------------------------------');
console.log(`📊 Result: ${passedTests} / ${totalTests} Evidence Artifact Checks Passed`);
console.log('------------------------------------------------------------------------\n');

// Copy verifier script to QA directory
const qaVerifierDest = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/verify_ds_evidence_artifacts.js');
fs.copyFileSync(__filename, qaVerifierDest);
console.log(`✅ Saved QA Verifier script -> ${qaVerifierDest}`);

if (passedTests === totalTests) {
  console.log('🎉 SECTION DS EVIDENCE ARTIFACT VAULT INTEGRITY PASS (100% REPRODUCIBLE)\n');
  process.exit(0);
} else {
  console.error('💥 SECTION DS EVIDENCE ARTIFACT VAULT FAILED!\n');
  process.exit(1);
}
