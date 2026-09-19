const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PROJECT_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const RAW_DIR = path.join(PROJECT_ROOT, 'content_pipeline', 'staging_candidates', 'raw_captures_forward');
const BATCH_V2_PATH = path.join(RAW_DIR, 'forward_raw_capture_v2_pilot_batch_report.json');

console.log('========================================================================');
console.log('🛡️ JAYT-245 QA GATE: GENERIC FAIL-CLOSED RAW CAPTURE & CLOCK-SKEW AUDITOR');
console.log('========================================================================\n');

const MAX_ALLOWED_CLOCK_SKEW_SECONDS = 60;

/**
 * Generic validator for a single raw capture record against its physical file on disk.
 * ZERO target-ID branching: decisions are made strictly on mathematical & protocol invariants.
 */
function validateRawCaptureRecord(rec, rootDir) {
  const issues = [];
  const payloadPath = path.join(rootDir, rec.final_raw_payload_file);

  // 1. Physical existence
  if (!fs.existsSync(payloadPath)) {
    return { valid: false, issues: [`File missing: ${rec.final_raw_payload_file}`], is_anomaly: true, is_semantic_ready: false };
  }

  // 2. Hash integrity
  const rawBytes = fs.readFileSync(payloadPath);
  const recomputedHash = crypto.createHash('sha256').update(rawBytes).digest('hex');
  if (recomputedHash !== rec.pre_normalization_sha256) {
    issues.push(`SHA-256 mismatch: recorded ${rec.pre_normalization_sha256}, computed ${recomputedHash}`);
  }

  // 3. Non-empty body
  if (rawBytes.length === 0) {
    issues.push('Payload body is empty (0 bytes)');
  }

  // 4. Timestamp causality
  const startedMs = Date.parse(rec.capture_started_at_iso);
  const finishedMs = Date.parse(rec.capture_finished_at_iso);
  if (isNaN(startedMs) || isNaN(finishedMs) || startedMs > finishedMs) {
    issues.push(`Timestamp causality violation: start ${rec.capture_started_at_iso} > finish ${rec.capture_finished_at_iso}`);
  }

  // 5. Final terminal HTTP status
  if (rec.final_http_status !== 200) {
    issues.push(`Terminal HTTP status is ${rec.final_http_status}, expected 200`);
  }

  // 6. Redirect chain existence
  if (!Array.isArray(rec.redirect_chain) || rec.redirect_chain.length === 0) {
    issues.push('Missing or empty redirect chain metadata');
  }

  // 7. Generic Server clock-skew measurement
  let isClockSkewAnomaly = false;
  let skewSeconds = 0;
  const serverDateStr = rec.final_headers ? (rec.final_headers.date || rec.final_headers.Date) : null;
  if (serverDateStr) {
    const serverMs = Date.parse(serverDateStr);
    if (!isNaN(serverMs) && !isNaN(finishedMs)) {
      skewSeconds = Math.round((serverMs - finishedMs) / 1000);
      if (Math.abs(skewSeconds) > MAX_ALLOWED_CLOCK_SKEW_SECONDS) {
        isClockSkewAnomaly = true;
        issues.push(`Server clock skew anomaly: ${skewSeconds}s exceeds ${MAX_ALLOWED_CLOCK_SKEW_SECONDS}s threshold`);
      }
    }
  }

  const isTechnicallyValid = (issues.filter(i => !i.includes('clock skew anomaly')).length === 0);
  const isSemanticReady = isTechnicallyValid && !isClockSkewAnomaly;

  return {
    valid: isTechnicallyValid,
    is_anomaly: isClockSkewAnomaly,
    skew_seconds: skewSeconds,
    is_semantic_ready: isSemanticReady,
    issues: issues
  };
}

// ----------------------------------------------------------------------
// PART A: SELF-TESTING FIXTURES (PASS / FAIL TEST SUITE)
// ----------------------------------------------------------------------
console.log('🧪 Part A: Running Generic Gate Unit Fixtures...');

// Fixture 1: Synthetic Valid Record (MUST PASS)
const mockValidPayload = '<html><body>Test Valid Payload</body></html>';
const mockValidHash = crypto.createHash('sha256').update(mockValidPayload).digest('hex');
const mockTmpDir = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE', '.tmp_fixtures');
if (!fs.existsSync(mockTmpDir)) fs.mkdirSync(mockTmpDir, { recursive: true });
const mockValidFile = path.join(mockTmpDir, 'mock_valid.txt');
fs.writeFileSync(mockValidFile, mockValidPayload, 'utf8');

const fixtureValid = {
  final_raw_payload_file: path.relative(PROJECT_ROOT, mockValidFile),
  pre_normalization_sha256: mockValidHash,
  capture_started_at_iso: '2026-08-28T22:00:00.000Z',
  capture_finished_at_iso: '2026-08-28T22:00:01.000Z',
  final_http_status: 200,
  redirect_chain: [{ hop: 1 }],
  final_headers: { date: 'Fri, 28 Aug 2026 22:00:01 GMT' }
};
const resFixtureValid = validateRawCaptureRecord(fixtureValid, PROJECT_ROOT);
if (!resFixtureValid.valid || !resFixtureValid.is_semantic_ready) {
  console.error('❌ FIXTURE TEST FAILED: Valid fixture failed validation!', resFixtureValid);
  process.exit(1);
}
console.log('   ✅ Fixture 1 (Valid Target): PASS (semantic_ready: true)');

// Fixture 2: Synthetic Anomalous Record with 180s clock skew (MUST FAIL-CLOSED)
const fixtureAnomalousSkew = {
  final_raw_payload_file: path.relative(PROJECT_ROOT, mockValidFile),
  pre_normalization_sha256: mockValidHash,
  capture_started_at_iso: '2026-08-28T22:00:00.000Z',
  capture_finished_at_iso: '2026-08-28T22:00:01.000Z',
  final_http_status: 200,
  redirect_chain: [{ hop: 1 }],
  final_headers: { date: 'Fri, 28 Aug 2026 22:03:01 GMT' } // 180s skew
};
const resFixtureAnomalous = validateRawCaptureRecord(fixtureAnomalousSkew, PROJECT_ROOT);
if (resFixtureAnomalous.is_semantic_ready || !resFixtureAnomalous.is_anomaly) {
  console.error('❌ FIXTURE TEST FAILED: Anomalous clock skew was NOT fail-closed!', resFixtureAnomalous);
  process.exit(1);
}
console.log('   ✅ Fixture 2 (Anomalous Clock Skew 180s): FAIL-CLOSED (anomaly: true, semantic_ready: false)');

// Cleanup fixture tmp
fs.rmSync(mockTmpDir, { recursive: true, force: true });
console.log('   🟢 Part A Unit Fixtures: 100% PASS.\n');

// ----------------------------------------------------------------------
// PART B: AUDITING ACTIVE STAGING BATCH
// ----------------------------------------------------------------------
console.log('🔍 Part B: Auditing Staging Batch Records...');

const batch = JSON.parse(fs.readFileSync(BATCH_V2_PATH, 'utf8'));
let totalAudited = 0;
let semanticReadyList = [];
let anomalyList = [];
let criticalFailures = [];

batch.records.forEach((rec, idx) => {
  totalAudited++;
  const result = validateRawCaptureRecord(rec, PROJECT_ROOT);

  if (!result.valid) {
    criticalFailures.push(`[${rec.target_id}] ${result.issues.join('; ')}`);
    console.log(`❌ [${idx + 1}/${batch.records.length}] ${rec.target_id} (${rec.brand}): TECHNICAL FAIL -> ${result.issues.join('; ')}`);
  } else if (result.is_anomaly) {
    anomalyList.push({ target_id: rec.target_id, brand: rec.brand, skew_seconds: result.skew_seconds });
    console.log(`⚠️ [${idx + 1}/${batch.records.length}] ${rec.target_id} (${rec.brand}): 🚩 ANOMALY (Skew: ${result.skew_seconds}s) -> EXCLUDED FROM SEMANTIC READY`);
  } else {
    semanticReadyList.push(rec.target_id);
    console.log(`✅ [${idx + 1}/${batch.records.length}] ${rec.target_id} (${rec.brand}): PASS (Skew: ${result.skew_seconds}s, semantic_ready: true)`);
  }
});

console.log('\n------------------------------------------------------------------------');
console.log(`📊 Audit Summary: ${totalAudited} Audited | ${semanticReadyList.length} Semantic-Ready | ${anomalyList.length} Anomalous Excluded`);

if (criticalFailures.length > 0) {
  console.error('❌ GATE FAILED WITH CRITICAL ERRORS:');
  criticalFailures.forEach(f => console.error('   -', f));
  process.exit(1);
}

console.log('🟢 [GENERIC-FAIL-CLOSED-GATE-PASS] 100% Technical Integrity & Generic Clock Skew Exclusion Verified!');
