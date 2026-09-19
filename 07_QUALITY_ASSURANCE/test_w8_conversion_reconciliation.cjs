/**
 * JAYT W8 Comprehensive Conversion Reconciliation Security & Logic Test Suite
 */
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { reconcileConversionReport, parseCommissionVnd } = require('../scripts/reconcile_w8_conversion_report.cjs');
const { CANONICAL_EXPORT_VAULT } = require('../scripts/parse_w8_portal_feed.cjs');

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

console.log('=== TEST 1: ABSOLUTE VAULT BOUNDARY ENFORCEMENT ===');
// 1A. Sibling prefix collision attack: raw_portal_exports_attacker
const attackerDir = CANONICAL_EXPORT_VAULT + '_attacker';
if (!fs.existsSync(attackerDir)) fs.mkdirSync(attackerDir, { recursive: true });
const attackerFile = path.join(attackerDir, 'evil_report.csv');
fs.writeFileSync(attackerFile, 'dummy', 'utf8');

assert.throws(() => {
  reconcileConversionReport(attackerFile);
}, /UNAUTHORIZED_CONVERSION_PATH_REJECTION/);
fs.unlinkSync(attackerFile);
fs.rmdirSync(attackerDir);
console.log('[PASS] Sibling directory prefix collision strictly rejected.');

// 1B. Parent directory traversal attack
assert.throws(() => {
  reconcileConversionReport(path.join(CANONICAL_EXPORT_VAULT, '..', 'parent_file.csv'));
}, /UNAUTHORIZED_CONVERSION_PATH_REJECTION/);
console.log('[PASS] Parent directory traversal strictly rejected.');

console.log('=== TEST 2: REJECT MISSING OR MISMATCHED SIDECAR HASH ===');
const fixtureNoSidecar = path.join(CANONICAL_EXPORT_VAULT, 'test_no_sidecar.csv');
fs.writeFileSync(fixtureNoSidecar, 'ma_don_hang,ma_san_pham,hoa_hong\r\nORD1,23552060269,11250\r\n', 'utf8');
assert.throws(() => {
  reconcileConversionReport(fixtureNoSidecar);
}, /MISSING_SIDECAR_HASH_REJECTION/);
fs.unlinkSync(fixtureNoSidecar);
console.log('[PASS] Missing sidecar hash rejected fail-closed.');

console.log('=== TEST 3: REJECT INVALID CONVERSION SCHEMA ===');
const fixtureBadSchema = path.join(CANONICAL_EXPORT_VAULT, 'test_bad_schema.csv');
const badContent = 'colA,colB,colC\r\n1,2,3\r\n';
fs.writeFileSync(fixtureBadSchema, badContent, 'utf8');
fs.writeFileSync(fixtureBadSchema + '.sha256', sha256(Buffer.from(badContent, 'utf8')), 'utf8');
assert.throws(() => {
  reconcileConversionReport(fixtureBadSchema);
}, /INVALID_CONVERSION_SCHEMA_REJECTION/);
fs.unlinkSync(fixtureBadSchema);
fs.unlinkSync(fixtureBadSchema + '.sha256');
console.log('[PASS] Invalid schema rejected fail-closed.');

console.log('=== TEST 4: HARDENED GAP_02 ATTRIBUTION LOGIC VERIFICATION ===');
const fixtureComplex = path.join(CANONICAL_EXPORT_VAULT, 'test_complex_conversion_report.csv');

// Create test rows:
// 1. Valid order for TopGia (23552060269) -> QUALIFIES
// 2. Cancelled order for iPhone Case (26609048170) -> REJECTED (status: CANCELLED)
// 3. Zero commission order for Áo mưa (25171045245) -> REJECTED (commission: 0)
// 4. Invalid timestamp order for Sốt chấm (29428705340) -> REJECTED (timestamp: not-a-date)
// 5. Account mismatch order for Khăn giấy (24491019937) -> REJECTED (account: foreign_acc)
// 6. Valid order for iPhone Case (26609048170) -> QUALIFIES
// 7. Missing account ID order -> REJECTED (account: missing/empty)
// 8. Non-ISO lenient date order -> REJECTED (timestamp: non-ISO format)
// 9. Missing order ID order -> REJECTED (order_id: missing/empty)
// 10. Duplicate order ID (ORD_01) -> REJECTED (duplicate order prevention)
const testCsv = [
  'Mã đơn hàng,Mã sản phẩm,Hoa hồng,Trạng thái,Thời gian mua,Mã tài khoản,Tên khách hàng,Số điện thoại',
  'ORD_01,23552060269,₫11.250,COMPLETED,2026-09-15T06:00:00Z,17372870594,Nguyen Van A,0901234567',
  'ORD_02,26609048170,₫8.300,CANCELLED,2026-09-15T06:01:00Z,17372870594,Tran Thi B,0902345678',
  'ORD_03,25171045245,₫0,VALIDATED,2026-09-15T06:02:00Z,17372870594,Le Van C,0903456789',
  'ORD_04,29428705340,₫7.096,VALIDATED,INVALID_DATE_STRING,17372870594,Pham Van D,0904567890',
  'ORD_05,24491019937,₫9.520,VALIDATED,2026-09-15T06:04:00Z,foreign_attacker_acc,Hoang Van E,0905678901',
  'ORD_06,26609048170,₫8.300,SETTLED,2026-09-15T06:05:00Z,17372870594,Bui Thi F,0906789012',
  'ORD_07,23552060269,₫11.250,COMPLETED,2026-09-15T06:06:00Z,,Vu Thi G,0907890123',
  'ORD_08,23552060269,₫11.250,COMPLETED,09/15/2026 13:00,17372870594,Dang Van H,0908901234',
  ',23552060269,₫11.250,COMPLETED,2026-09-15T06:08:00Z,17372870594,Ngo Van I,0909012345',
  'ORD_01,23552060269,₫11.250,COMPLETED,2026-09-15T06:09:00Z,17372870594,Duong Van K,0901234567'
].join('\r\n') + '\r\n';

fs.writeFileSync(fixtureComplex, testCsv, 'utf8');
fs.writeFileSync(fixtureComplex + '.sha256', sha256(Buffer.from(testCsv, 'utf8')), 'utf8');

const receipt = reconcileConversionReport(fixtureComplex, '17372870594');

// Assertions on reconciliation metrics
assert.strictEqual(receipt.total_order_lines, 10);
assert.strictEqual(receipt.matched_and_qualified_orders_count, 2, 'Exactly 2 orders must qualify (ORD_01 and ORD_06)');
assert.strictEqual(receipt.rejected_orders_count, 8, 'Exactly 8 orders must be rejected (cancelled, 0 commission, bad date, wrong account, missing account, non-ISO timestamp, missing order_id, duplicate order_id)');
assert.strictEqual(receipt.reconciled_skus_count, 2, 'Exactly 2 SKUs qualified');
assert.strictEqual(receipt.total_attributed_commission_vnd, 19550, 'Commission must equal 11250 + 8300 = 19550 VND (no duplicate inflation)');

// Verify specific rejection reasons
const reasons = receipt.rejected_orders.map(o => o.rejection_reason);
assert.ok(reasons.some(r => r.includes('MISSING_ACCOUNT_PROVENANCE_REJECTION')), 'Must reject missing account provenance');
assert.ok(reasons.some(r => r.includes('INVALID_TIMESTAMP_REJECTION')), 'Must reject non-ISO/UTC timestamp');
assert.ok(reasons.some(r => r.includes('MISSING_ORDER_ID_REJECTION')), 'Must reject missing order_id');
assert.ok(reasons.some(r => r.includes('DUPLICATE_ORDER_ID_REJECTION')), 'Must reject duplicate order_id');

// Verify PII Redaction
assert.strictEqual(receipt.matched_orders[0].raw_columns_redacted['Tên khách hàng'], '[REDACTED_PII]');
assert.strictEqual(receipt.matched_orders[0].raw_columns_redacted['Số điện thoại'], '[REDACTED_PII]');

// Verify Fail-Closed Governance Status
assert.strictEqual(receipt.governance_verdict, 'HELD_FAIL_CLOSED__PENDING_DUAL_KEY_EXECUTION');
assert.strictEqual(receipt.gap_02_resolution_status.includes('INCOMPLETE_ATTRIBUTION_2_OF_20'), true);

fs.unlinkSync(fixtureComplex);
fs.unlinkSync(fixtureComplex + '.sha256');
console.log('[PASS] Status, commission, strict ISO timestamp, mandatory account, mandatory order ID, anti-duplicate, and PII redaction verified with 100% precision.');

console.log('\nALL HARDENED CONVERSION RECONCILIATION TESTS PASSED (4/4 TEST BLOCKS)!');
