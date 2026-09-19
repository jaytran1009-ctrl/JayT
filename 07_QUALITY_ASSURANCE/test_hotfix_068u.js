/**
 * JAYT DETERMINISTIC HOTFIX TEST — 068U
 * Directive: JAYT-TIMEZONE-AND-MEMORY-LINEAGE-REMEDIATION-068U
 * 
 * Tests:
 * 1. formatAsiaHoChiMinh converts UTC 2026-08-24T04:00:16Z → 2026-08-24T11:00:16+07:00
 * 2. formatAsiaHoChiMinh converts UTC 2026-08-23T16:44:12Z → 2026-08-23T23:44:12+07:00 (original 068S bug)
 * 3. recordHistoricalCorrection067 rejects "PENDING_TRANSACTION" as after_sha256
 * 4. recordHistoricalCorrection067 rejects "NOT_A_HASH" as before_sha256
 * 5. recordHistoricalCorrection067 accepts valid 64-char hex hashes
 */

const path = require('path');
const { formatAsiaHoChiMinh, SHA256_HEX_REGEX, recordHistoricalCorrection067 } = require('./memory_transaction_manager_057');

let passed = 0;
let failed = 0;

function assert(testId, condition, msg) {
  if (condition) {
    console.log(`  [${testId}]: [PASS] - ${msg}`);
    passed++;
  } else {
    console.log(`  [${testId}]: [FAIL] - ${msg}`);
    failed++;
  }
}

console.log('🧪 [JAYT-068U-HOTFIX-TEST] Khởi chạy bộ kiểm thử hotfix timezone & SHA validation...\n');

// Test 1: UTC 2026-08-24T04:00:16Z → local 2026-08-24T11:00:16+07:00
const utc1 = new Date('2026-08-24T04:00:16Z');
const result1 = formatAsiaHoChiMinh(utc1);
assert('TZ_01_UTC_TO_LOCAL_068T_BUG', result1 === '2026-08-24T11:00:16+07:00',
  `UTC 2026-08-24T04:00:16Z → expected 2026-08-24T11:00:16+07:00, got ${result1}`);

// Test 2: UTC 2026-08-23T16:44:12Z → local 2026-08-23T23:44:12+07:00
const utc2 = new Date('2026-08-23T16:44:12Z');
const result2 = formatAsiaHoChiMinh(utc2);
assert('TZ_02_UTC_TO_LOCAL_068S_BUG', result2 === '2026-08-23T23:44:12+07:00',
  `UTC 2026-08-23T16:44:12Z → expected 2026-08-23T23:44:12+07:00, got ${result2}`);

// Test 3: Day rollover — UTC 2026-08-24T20:30:00Z → local 2026-08-25T03:30:00+07:00
const utc3 = new Date('2026-08-24T20:30:00Z');
const result3 = formatAsiaHoChiMinh(utc3);
assert('TZ_03_DAY_ROLLOVER', result3 === '2026-08-25T03:30:00+07:00',
  `UTC 2026-08-24T20:30:00Z → expected 2026-08-25T03:30:00+07:00, got ${result3}`);

// Test 4: SHA256_HEX_REGEX accepts valid 64-char hex
const validHash = 'a376b45d2114b8090066dac87fa7f707c5b0f81fea4ad6b2aa170008de9dec6d';
assert('SHA_04_VALID_HASH_ACCEPTED', SHA256_HEX_REGEX.test(validHash),
  `Valid 64-char hex accepted: ${validHash.slice(0, 16)}...`);

// Test 5: SHA256_HEX_REGEX rejects "PENDING_TRANSACTION"
assert('SHA_05_PENDING_REJECTED', !SHA256_HEX_REGEX.test('PENDING_TRANSACTION'),
  '"PENDING_TRANSACTION" correctly rejected by regex');

// Test 6: SHA256_HEX_REGEX rejects short hex
assert('SHA_06_SHORT_HEX_REJECTED', !SHA256_HEX_REGEX.test('abcdef1234'),
  'Short hex string correctly rejected');

// Test 7: recordHistoricalCorrection067 rejects PENDING_TRANSACTION as after_sha256
let test7Error = null;
try {
  recordHistoricalCorrection067({
    correctionId: 'TEST-INVALID-HASH-AFTER-068U',
    workOrder: 'JAYT-TEST-068U',
    targetFile: 'PROJECT_MEMORY.md',
    beforeHash: validHash,
    afterHash: 'PENDING_TRANSACTION',
    reason: 'Test: should be rejected'
  });
} catch (e) {
  test7Error = e.message;
}
assert('SHA_07_RECORD_REJECTS_PENDING_AFTER', 
  test7Error && test7Error.includes('INVALID_AFTER_HASH'),
  `recordHistoricalCorrection067 threw INVALID_AFTER_HASH: ${test7Error ? test7Error.slice(0, 80) : 'NO ERROR'}`);

// Test 8: recordHistoricalCorrection067 rejects NOT_A_HASH as before_sha256
let test8Error = null;
try {
  recordHistoricalCorrection067({
    correctionId: 'TEST-INVALID-HASH-BEFORE-068U',
    workOrder: 'JAYT-TEST-068U',
    targetFile: 'PROJECT_MEMORY.md',
    beforeHash: 'NOT_A_HASH',
    afterHash: validHash,
    reason: 'Test: should be rejected'
  });
} catch (e) {
  test8Error = e.message;
}
assert('SHA_08_RECORD_REJECTS_INVALID_BEFORE',
  test8Error && test8Error.includes('INVALID_BEFORE_HASH'),
  `recordHistoricalCorrection067 threw INVALID_BEFORE_HASH: ${test8Error ? test8Error.slice(0, 80) : 'NO ERROR'}`);

console.log(`\n${failed === 0 ? '🟢' : '🔴'} [068U-HOTFIX-TEST-SUMMARY] ${passed}/${passed + failed} PASS, ${failed} FAIL`);

if (failed > 0) {
  process.exit(1);
}
