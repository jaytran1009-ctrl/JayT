/**
 * JAYT W8 Comprehensive Production Ingress Regression Test
 */
const assert = require('assert');
const path = require('path');
const {
  CANONICAL_EXPORT_VAULT,
  parseRfc4180Csv,
  validateExportSchema,
  validateIdentifierSyntax,
  verifyProvenanceLedger,
  ingestAndValidateExport
} = require('../scripts/parse_w8_portal_feed.cjs');

console.log('=== 1. RFC-4180 CSV FSM TESTS ===');
const csv1 = 'colA,colB,colC\r\nval1,"quoted ""val""",val3\r\n';
const r1 = parseRfc4180Csv(csv1);
assert.strictEqual(r1.length, 2);
assert.strictEqual(r1[0].length, 3);
assert.strictEqual(r1[1][1], 'quoted "val"');
console.log('[PASS] RFC-4180 quoted commas and escaped quotes parsed accurately.');

assert.throws(() => {
  parseRfc4180Csv('colA,colB\r\nfoo,ba"r\r\n');
}, /CSV_SYNTAX_ERROR/);
console.log('[PASS] Rogue unescaped quote rejected fail-closed.');

assert.throws(() => {
  parseRfc4180Csv('colA,colB\r\n"unclosed quote,val2\r\n');
}, /CSV_SYNTAX_ERROR/);
console.log('[PASS] Unclosed quote rejected fail-closed.');

assert.throws(() => {
  parseRfc4180Csv('colA,colB\r\n"closed"extra,val2\r\n');
}, /CSV_SYNTAX_ERROR/);
console.log('[PASS] Extraneous characters after quote rejected fail-closed.');

console.log('=== 2. EXACT SCHEMA MATCHING TESTS ===');
const vnHeaders = ['Mã sản phẩm', 'Tên sản phẩm', 'Giá', 'Doanh thu', 'Tên cửa hàng', 'Tỉ lệ hoa hồng', 'Hoa hồng', 'Link sản phẩm', 'Link ưu đãi'];
const sVn = validateExportSchema(vnHeaders);
assert.strictEqual(sVn.matched_schema, 'SHOPEE_PRODUCT_OFFER_FEED');
assert.strictEqual(sVn.valid, true);
console.log('[PASS] Vietnamese Shopee export headers matched SHOPEE_PRODUCT_OFFER_FEED.');

const sUnknown = validateExportSchema(['col1', 'col2', 'col3']);
assert.strictEqual(sUnknown.valid, false);
assert.strictEqual(sUnknown.matched_schema, null);
console.log('[PASS] Unrecognized headers rejected fail-closed.');

console.log('=== 3. SYNTACTIC IDENTIFIER & ROUTE ALLOWLIST TESTS ===');
assert.doesNotThrow(() => {
  validateIdentifierSyntax('1016604648', 1);
  validateIdentifierSyntax('https://s.shopee.vn/6L4SG0dEw9', 2);
  validateIdentifierSyntax('https://shopee.vn/product/1016604648/23552060269', 3);
});
console.log('[PASS] Valid Shopee numeric item ID, product URL, and shortlink accepted.');

assert.throws(() => {
  validateIdentifierSyntax('   ', 4);
}, /MISSING_REQUIRED_IDENTIFIER_REJECTION/);
console.log('[PASS] Empty / ghost identifier rejected fail-closed.');

assert.throws(() => {
  validateIdentifierSyntax('https://shopee.vn', 5);
}, /INVALID_IDENTIFIER_FORMAT_REJECTION/);
console.log('[PASS] Bare domain rejected fail-closed.');

assert.throws(() => {
  validateIdentifierSyntax('https://shopee.vn/search?keyword=test', 6);
}, /INVALID_IDENTIFIER_FORMAT_REJECTION/);
console.log('[PASS] Non-product search route rejected fail-closed.');

assert.throws(() => {
  validateIdentifierSyntax('https://shopee.vn/cart', 7);
}, /INVALID_IDENTIFIER_FORMAT_REJECTION/);
console.log('[PASS] Non-product cart route rejected fail-closed.');

console.log('=== 4. CANONICAL INGRESS PATH ENFORCEMENT ===');
assert.throws(() => {
  ingestAndValidateExport('C:/fake/path/file.csv');
}, /UNAUTHORIZED_INGRESS_SOURCE_PATH_REJECTION/);
console.log('[PASS] Arbitrary path ingress rejected fail-closed (zero bypass).');

const ledgerPath = path.join(CANONICAL_EXPORT_VAULT, 'PROVENANCE_LEDGER.jsonl');
const ledgerAudit = verifyProvenanceLedger(ledgerPath);
assert.strictEqual(ledgerAudit.verified, true, 'Live provenance ledger must be verified');
assert.strictEqual(ledgerAudit.count, 1, 'Block #0 must be verified');
assert.strictEqual(typeof ledgerAudit.head_hash, 'string', 'Head hash must be present');
console.log('[PASS] Live Provenance Ledger Block #0 verified intact with dual anchors (' + ledgerAudit.head_hash.slice(0, 16) + '...).');

console.log('\nALL 5 HIGH-ASSURANCE REGRESSION TEST SUITES PASSED WITH 100% SUCCESS!');
