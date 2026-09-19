/**
 * JAYT HANDOFF HASH INTEGRITY & FAIL-CLOSED VALIDATOR (069E)
 * Directive: JAYT-069E-HANDOFF-TRUTH-AND-LESSON-CLOSURE
 * 
 * Enforces Rule 18:
 * - Handoff hashes MUST match on-disk receipt and artifact SHA-256 byte-for-byte.
 * - Negative test: Intentionally tampered / hand-typed hash MUST fail-closed immediately.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

function getSha(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

let testCount = 0;
let passCount = 0;

function assertTest(name, condition, message) {
  testCount++;
  if (condition) {
    passCount++;
    console.log(`  [${name}]: [PASS] - ${message}`);
  } else {
    console.error(`  [${name}]: [FAIL] - ${message}`);
    process.exitCode = 1;
  }
}

console.log('🧪 [TEST-069E-HANDOFF-INTEGRITY] Khởi chạy bộ kiểm thử Rule 18 Handoff Hash Integrity & Fail-Closed...');

/**
 * Validates a reported handoff artifact hash against receipt on disk
 */
function validateHandoffArtifactHash(receiptRelativePath, artifactKey, reportedHash) {
  const fullReceiptPath = path.resolve(repoRoot, receiptRelativePath);
  if (!fs.existsSync(fullReceiptPath)) {
    throw new Error(`RECEIPT_NOT_FOUND: ${receiptRelativePath}`);
  }

  const receipt = JSON.parse(fs.readFileSync(fullReceiptPath, 'utf8'));
  const artifactMeta = receipt.artifacts?.[artifactKey];
  if (!artifactMeta) {
    throw new Error(`ARTIFACT_KEY_NOT_FOUND: ${artifactKey} in ${receiptRelativePath}`);
  }

  const fullArtifactPath = path.resolve(repoRoot, artifactMeta.path);
  if (!fs.existsSync(fullArtifactPath)) {
    throw new Error(`PHYSICAL_ARTIFACT_NOT_FOUND: ${artifactMeta.path}`);
  }

  const actualDiskSha = getSha(fullArtifactPath);
  const receiptSha = artifactMeta.sha256;

  if (receiptSha !== actualDiskSha) {
    throw new Error(`RECEIPT_VS_DISK_MISMATCH: Receipt recorded ${receiptSha}, but disk has ${actualDiskSha}`);
  }

  if (reportedHash !== receiptSha) {
    throw new Error(`HANDOFF_HASH_MISMATCH: Reported hash "${reportedHash}" does NOT match verified receipt/disk SHA-256 "${receiptSha}".`);
  }

  return {
    valid: true,
    sha256: receiptSha,
    size_bytes: artifactMeta.size_bytes
  };
}

// TEST 1: Positive Test - Exact hash matching receipt & disk
try {
  const receiptPath = '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step1d_starlight_booking/CAPTURE_RECEIPT_STARLIGHT_BOOKING_FLOW.json';
  const receipt = JSON.parse(fs.readFileSync(path.resolve(repoRoot, receiptPath), 'utf8'));
  const validPngSha = receipt.artifacts.screenshot_png.sha256;

  const res = validateHandoffArtifactHash(receiptPath, 'screenshot_png', validPngSha);
  assertTest('H_01_POSITIVE_EXACT_HASH_MATCH', res.valid === true, 'Handoff hash khớp 100% với receipt và đĩa vật lý.');
} catch (err) {
  assertTest('H_01_POSITIVE_EXACT_HASH_MATCH', false, err.message);
}

// TEST 2: Negative Test - Intentionally tampered hash fails closed
try {
  const receiptPath = '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step1c_starlight/CAPTURE_RECEIPT_STARLIGHT_THU_3_PHIM_VIET.json';
  const tamperedDraftSha = '0374aa0c206f608bf50a4980bb6e22f2817ee27fb2e5d7d3d74a1cb27f818b26'; // Draft tampered

  let failedClosed = false;
  let errMsg = '';
  try {
    validateHandoffArtifactHash(receiptPath, 'screenshot_png', tamperedDraftSha);
  } catch (e) {
    failedClosed = true;
    errMsg = e.message;
  }

  assertTest(
    'H_02_NEGATIVE_TAMPERED_HASH_FAILS_CLOSED',
    failedClosed && errMsg.includes('HANDOFF_HASH_MISMATCH'),
    `Cố ý đưa hash sai lệch vào handoff bị chặn đứng fail-closed: ${errMsg}`
  );
} catch (err) {
  assertTest('H_02_NEGATIVE_TAMPERED_HASH_FAILS_CLOSED', false, err.message);
}

// TEST 3: Negative Test - Mismatched artifact key fails closed
try {
  const receiptPath = '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step1c_starlight/CAPTURE_RECEIPT_STARLIGHT_CT_U22.json';
  let failedClosed = false;
  try {
    validateHandoffArtifactHash(receiptPath, 'non_existent_key', 'some_hash');
  } catch (e) {
    failedClosed = true;
  }
  assertTest('H_03_NEGATIVE_UNKNOWN_KEY_FAILS_CLOSED', failedClosed, 'Artifact key không tồn tại bị chặn fail-closed.');
} catch (err) {
  assertTest('H_03_NEGATIVE_UNKNOWN_KEY_FAILS_CLOSED', false, err.message);
}

// TEST 4: Automated Handoff Generator generates 100% verified hashes
function generateAutomatedHandoffTable(receiptPaths) {
  const rows = [];
  for (const rPath of receiptPaths) {
    const fullRPath = path.resolve(repoRoot, rPath);
    const receipt = JSON.parse(fs.readFileSync(fullRPath, 'utf8'));
    for (const [k, meta] of Object.entries(receipt.artifacts || {})) {
      const fullArtPath = path.resolve(repoRoot, meta.path);
      const actualSha = getSha(fullArtPath);
      if (actualSha !== meta.sha256) {
        throw new Error(`INTEGRITY_ERROR: ${meta.path} hash mismatch`);
      }
      rows.push({
        receipt: path.basename(rPath),
        artifact_key: k,
        path: meta.path,
        sha256: actualSha,
        size_bytes: meta.size_bytes
      });
    }
  }
  return rows;
}

try {
  const sampleReceipts = [
    '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step1d_starlight_booking/CAPTURE_RECEIPT_STARLIGHT_BOOKING_FLOW.json',
    '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step1c_starlight/CAPTURE_RECEIPT_STARLIGHT_THU_3_PHIM_VIET.json',
    '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step1c_starlight/CAPTURE_RECEIPT_STARLIGHT_CT_U22.json'
  ];
  const table = generateAutomatedHandoffTable(sampleReceipts);
  assertTest(
    'H_04_AUTOMATED_HANDOFF_GENERATION',
    table.length === 9 && table.every(r => r.sha256 && r.sha256.length === 64),
    'Động cơ tự động sinh bảng handoff từ receipt/đĩa hoạt động 100% chính xác (9/9 items verified).'
  );
} catch (err) {
  assertTest('H_04_AUTOMATED_HANDOFF_GENERATION', false, err.message);
}

console.log(`\n${passCount === testCount ? '🟢' : '❌'} [SUMMARY-069E] ${passCount}/${testCount} tests PASSED.`);
process.exit(passCount === testCount ? 0 : 1);
