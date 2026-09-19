/**
 * NEGATIVE & POSITIVE TEST SUITE: CAPTURE-TIME RECEIPT INTEGRITY & CHECKED_AT ENFORCEMENT (069-STEP2B)
 * Rule 20: Metadata bắt buộc phải sinh tại thời điểm capture; cấm backfill receipt.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { validateAndMintReceipt } = require('./perform_metiz_fresh_recapture_069_step2b');

function assertTest(name, condition, message) {
  if (!condition) {
    console.error(`  [${name}]: [FAIL] - ${message}`);
    process.exit(1);
  }
  console.log(`  [${name}]: [PASS] - ${message}`);
}

console.log('🧪 [TEST-069-STEP2B] Khởi chạy bộ kiểm thử tính toàn vẹn Receipt tại thời điểm Capture...');

// 1. Negative Test: Missing checked_at
let missingCheckedAtBlocked = false;
try {
  const invalidReceipt = {
    receipt_id: 'TEST_01',
    purchase_channel: 'AT_COUNTER',
    artifacts: { test: { sha256: 'abc', size_bytes: 10, path: 'test.txt' } }
  };
  validateAndMintReceipt(invalidReceipt, path.join(__dirname, 'tmp_invalid.json'));
} catch (e) {
  if (e.message.includes("Missing or invalid 'checked_at'")) {
    missingCheckedAtBlocked = true;
  }
}
assertTest('R_01_NEGATIVE_MISSING_CHECKED_AT_BLOCKED', missingCheckedAtBlocked,
  'Receipt thiếu checked_at bị chặn đứng fail-closed trước khi ghi đĩa.');

// 2. Negative Test: Non-UTC checked_at (missing Z)
let nonUtcBlocked = false;
try {
  const invalidReceipt = {
    receipt_id: 'TEST_02',
    checked_at: '2026-08-24 13:00:00',
    purchase_channel: 'AT_COUNTER',
    artifacts: { test: { sha256: 'abc', size_bytes: 10, path: 'test.txt' } }
  };
  validateAndMintReceipt(invalidReceipt, path.join(__dirname, 'tmp_invalid.json'));
} catch (e) {
  if (e.message.includes("Missing or invalid 'checked_at'")) {
    nonUtcBlocked = true;
  }
}
assertTest('R_02_NEGATIVE_NON_UTC_TIMESTAMP_BLOCKED', nonUtcBlocked,
  'Receipt có checked_at không theo chuẩn ISO UTC (thiếu Z) bị chặn fail-closed.');

// 3. Negative Test: Missing purchase_channel
let missingChannelBlocked = false;
try {
  const invalidReceipt = {
    receipt_id: 'TEST_03',
    checked_at: '2026-08-24T06:30:00.000Z',
    artifacts: { test: { sha256: 'abc', size_bytes: 10, path: 'test.txt' } }
  };
  validateAndMintReceipt(invalidReceipt, path.join(__dirname, 'tmp_invalid.json'));
} catch (e) {
  if (e.message.includes("Missing 'purchase_channel'")) {
    missingChannelBlocked = true;
  }
}
assertTest('R_03_NEGATIVE_MISSING_PURCHASE_CHANNEL_BLOCKED', missingChannelBlocked,
  'Receipt thiếu purchase_channel bị chặn fail-closed.');

// 4. Negative Test: Missing artifact hash/size
let missingArtifactMetaBlocked = false;
try {
  const invalidReceipt = {
    receipt_id: 'TEST_04',
    checked_at: '2026-08-24T06:30:00.000Z',
    purchase_channel: 'AT_COUNTER',
    artifacts: { test: { path: 'test.txt' } }
  };
  validateAndMintReceipt(invalidReceipt, path.join(__dirname, 'tmp_invalid.json'));
} catch (e) {
  if (e.message.includes("Artifact test missing sha256/size_bytes/path")) {
    missingArtifactMetaBlocked = true;
  }
}
assertTest('R_04_NEGATIVE_MISSING_ARTIFACT_METADATA_BLOCKED', missingArtifactMetaBlocked,
  'Receipt thiếu metadata mã băm hoặc dung lượng của artifact bị chặn fail-closed.');

// 5. Positive Test: Valid Receipt
const validPath = path.join(__dirname, 'tmp_valid_receipt_test.json');
try {
  const validReceipt = {
    receipt_id: 'TEST_05',
    checked_at: '2026-08-24T06:30:00.000Z',
    purchase_channel: 'AT_COUNTER',
    artifacts: { test: { sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', size_bytes: 0, path: 'test.txt' } }
  };
  validateAndMintReceipt(validReceipt, validPath);
  assertTest('R_05_POSITIVE_VALID_RECEIPT_PERSISTED', fs.existsSync(validPath),
    'Receipt hợp lệ được ghi thành công vào đĩa.');
} finally {
  if (fs.existsSync(validPath)) fs.unlinkSync(validPath);
}

console.log('\n🟢 [SUMMARY-069-STEP2B] TOÀN BỘ 5/5 KIỂM THỬ RECEIPT INTEGRITY CONTRACT ĐÃ ĐẠT [PASS]!');
