/**
 * SECTION DU — ARTIFACT LINEAGE & PROVENANCE VALIDATOR
 * Governing: JAYT-245 Section DU (Lines 2965-2980)
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PROJECT_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const VAULT_DS_DIR = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/evidence_vault_ds');
const VAULT_DU_DIR = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/evidence_vault_du');
const MANIFEST_DS_PATH = path.join(VAULT_DS_DIR, 'EVIDENCE_MANIFEST_DS.json');
const MANIFEST_DU_PATH = path.join(VAULT_DU_DIR, 'EVIDENCE_MANIFEST_DU.json');
const MATRIX_DU_PATH = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_du_field_evidence_matrix.json');

console.log('========================================================================');
console.log('🛡️  SECTION DU — ARTIFACT LINEAGE & PROVENANCE VALIDATOR');
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

const manifestDS = JSON.parse(fs.readFileSync(MANIFEST_DS_PATH, 'utf8'));
const manifestDU = JSON.parse(fs.readFileSync(MANIFEST_DU_PATH, 'utf8'));
const matrixDU = JSON.parse(fs.readFileSync(MATRIX_DU_PATH, 'utf8'));

// Test 1: Count of artifacts in DU manifest
assertTest('DU manifest contains 5 evidence artifact records', manifestDU.artifacts.length === 5);

// Test 2: Verify explicit provenance policy
assertTest('DU manifest declares PROVENANCE_LINEAGE_ENFORCED policy', manifestDU.provenance_policy && manifestDU.provenance_policy.status === 'PROVENANCE_LINEAGE_ENFORCED');

// Test 3: Verify that every DU artifact matches DS origin in byte size, SHA-256, and original_fetched_at_utc
manifestDU.artifacts.forEach((duArt) => {
  const dsArt = manifestDS.artifacts.find(a => a.candidate_id === duArt.candidate_id);
  assertTest(`[${duArt.candidate_id}] Origin DS record exists`, !!dsArt);

  if (dsArt) {
    const duFilePath = path.join(PROJECT_ROOT, duArt.relative_path);
    const duFileBuf = fs.readFileSync(duFilePath);
    const duSha = crypto.createHash('sha256').update(duFileBuf).digest('hex');
    const duSize = duFileBuf.length;

    assertTest(`[${duArt.candidate_id}] Actual file size (${duSize}) matches DS origin size (${dsArt.byte_size})`, duSize === dsArt.byte_size);
    assertTest(`[${duArt.candidate_id}] Actual SHA-256 matches DS origin hash (${dsArt.sha256.substring(0, 16)}...)`, duSha === dsArt.sha256);
    assertTest(`[${duArt.candidate_id}] Lineage timestamp (${duArt.original_fetched_at_utc}) EXACTLY equals DS origin (${dsArt.fetched_at_utc})`, duArt.original_fetched_at_utc === dsArt.fetched_at_utc);
    assertTest(`[${duArt.candidate_id}] Reused lineage marked as REUSED_ARTIFACT_ORIGIN_DS`, duArt.reuse_lineage === 'REUSED_ARTIFACT_ORIGIN_DS');
  }
});

// Test 4: Verify Field-Level Evidence Matrix DU timestamps match DS origin
matrixDU.matrix.forEach((entity) => {
  const dsArt = manifestDS.artifacts.find(a => a.candidate_id === entity.candidate_id);
  const verifiedField = entity.fields.find(f => f.status === 'VERIFIED_FROM_SOURCE' || f.status === 'UNVERIFIED_BLOCKED_DYNAMIC_SHELL' || f.status === 'QUARANTINED_CITY_PORTAL_ROOT');
  if (verifiedField && dsArt) {
    assertTest(`[${entity.candidate_id}] Matrix field capture timestamp (${verifiedField.captured_at_utc}) matches DS origin (${dsArt.fetched_at_utc})`, verifiedField.captured_at_utc === dsArt.fetched_at_utc);
  }
});

// Test 5: Chronology integrity of DU manifest
const genTime = Date.parse(manifestDU.artifact_generated_at);
const signTime = Date.parse(manifestDU.signed_at);
assertTest('DU manifest generated_at <= signed_at', genTime <= signTime);
let allOriginBeforeGen = true;
manifestDU.artifacts.forEach(a => {
  const originTime = Date.parse(a.original_fetched_at_utc);
  if (isNaN(originTime) || originTime > genTime) allOriginBeforeGen = false;
});
assertTest('All origin_fetched_at timestamps are <= DU generation time', allOriginBeforeGen);

// Test 6: SIMULATED ATTEMPTED RESTAMPING TEST (Must FAIL on restamp detection)
console.log('\n--- SIMULATING ATTEMPTED RESTAMPING BREACH TEST ---');
function testIllegalRestampDetection(fakePayload) {
  // Validator rule: If an artifact with known hash has a modified capture timestamp not matching origin, reject!
  const dsMatch = manifestDS.artifacts.find(a => a.sha256 === fakePayload.sha256);
  if (dsMatch && dsMatch.fetched_at_utc !== fakePayload.claimed_capture_time) {
    return { error: 'PROVENANCE_VIOLATION_ILLEGAL_RESTAMP', passed: false };
  }
  return { error: null, passed: true };
}

const illegalPayload = {
  candidate_id: 'CAND_BUS_R16A',
  sha256: 'db237f074590e2d8ac299ff0522b8bc35b4ce9bd43738e3fcdf7289321660109',
  claimed_capture_time: '2026-08-30T14:35:00.000Z' // Fake restamped timestamp!
};

const breachResult = testIllegalRestampDetection(illegalPayload);
assertTest('Lineage Validator successfully catches and blocks illegal timestamp re-stamping attempt', !breachResult.passed && breachResult.error === 'PROVENANCE_VIOLATION_ILLEGAL_RESTAMP');

console.log('\n------------------------------------------------------------------------');
console.log(`📊 Result: ${passedTests} / ${totalTests} Lineage & Provenance Checks Passed`);
console.log('------------------------------------------------------------------------\n');

// Copy verifier script to QA directory
const qaVerifierDest = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/verify_du_artifact_lineage.js');
fs.copyFileSync(__filename, qaVerifierDest);
console.log(`✅ Saved QA Verifier script -> ${qaVerifierDest}`);

if (passedTests === totalTests) {
  console.log('🎉 SECTION DU ARTIFACT LINEAGE & PROVENANCE INTEGRITY PASS (100% REPRODUCIBLE)\n');
  process.exit(0);
} else {
  console.error('💥 SECTION DU LINEAGE VALIDATION FAILED!\n');
  process.exit(1);
}
