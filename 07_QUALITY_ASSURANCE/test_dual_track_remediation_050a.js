/**
 * JAYT DUAL-TRACK REMEDIATION TEST SUITE (050A)
 * Directive: JAYT-DUAL-TRACK-REMEDIATION-050A
 *
 * Tests:
 * - Negative: missing credentials → UNCONFIGURED
 * - Negative: missing price → REJECTED_INCOMPLETE
 * - Negative: missing expiry → REJECTED_INCOMPLETE
 * - Negative: missing affiliate URL → REJECTED_INCOMPLETE
 * - Negative: demo/synthetic payload → REJECTED
 * - Negative: empty-string proof hash → REJECTED
 * - Negative: unconfirmed merchant (synthetic markers) → REJECTED
 * - Positive: complete real-shaped raw item → RAW_PROVIDER_PAYLOAD (not auto-rendered)
 * - Invariant: production feed = [] and is_approved = false
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const repoRoot = path.resolve(__dirname, '..');

const { OnlineFeedAdapter } = require('../05_DEAL_AND_AFFILIATE/feed_gateway/adapter_interface');
const { validateMerchantIntake, EMPTY_STRING_SHA256 } = require('../05_DEAL_AND_AFFILIATE/merchant_intake/merchant_intake_validator');
const sampleFixture = require('../05_DEAL_AND_AFFILIATE/merchant_intake/sample_intake_template.json');

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

console.log('🧪 [JAYT-REMEDIATION-050A-TEST] Khởi chạy bộ kiểm thử Khắc Phục Hạ Tầng Song Mã 050A...');

// ═══════════════════════════════════════════════════════════
// TRACK 1: ONLINE FEED GATEWAY NEGATIVE TESTS
// ═══════════════════════════════════════════════════════════

// [TEST 1]: Missing credentials → UNCONFIGURED status, 0 items
const unconfiguredAdapter = new OnlineFeedAdapter('ACCESSTRADE_VN', 'ACCESSTRADE');
const unconfiguredCreds = unconfiguredAdapter.getCredentials();
assertTest(
  'T1_01_MISSING_CREDENTIALS_UNCONFIGURED',
  unconfiguredCreds.configured === false && unconfiguredCreds.status === 'UNCONFIGURED',
  'Adapter trả về UNCONFIGURED khi thiếu API credentials trong environment'
);

// [TEST 2]: Missing price → REJECTED_INCOMPLETE
const adapterForValidation = new OnlineFeedAdapter('SHOPEE_AFFILIATE', 'SHOPEE');
const { validated: v2, rejected: r2 } = adapterForValidation.normalizeAndValidate([
  { id: 'deal_1', name: 'Valid Deal Title', start_time: '2026-09-01', end_time: '2026-09-30', affiliate_url: 'https://example.com/aff' }
  // missing discounted_price and original_price
]);
assertTest(
  'T1_02_MISSING_PRICE_REJECTED',
  v2.length === 0 && r2.length === 1 && r2[0].status === 'REJECTED_INCOMPLETE' && r2[0].missing_fields.includes('discounted_price'),
  'Item thiếu mức giá bị từ chối REJECTED_INCOMPLETE — không được tự điền giá mặc định'
);

// [TEST 3]: Missing expiry → REJECTED_INCOMPLETE
const { validated: v3, rejected: r3 } = adapterForValidation.normalizeAndValidate([
  { id: 'deal_2', name: 'Valid Deal Title', discounted_price: 50000, original_price: 100000, affiliate_url: 'https://example.com/aff' }
  // missing start_time, end_time
]);
assertTest(
  'T1_03_MISSING_EXPIRY_REJECTED',
  v3.length === 0 && r3.length === 1 && r3[0].missing_fields.includes('start_time') && r3[0].missing_fields.includes('end_time'),
  'Item thiếu hạn dùng bị từ chối REJECTED_INCOMPLETE — không được tự điền thời gian mặc định'
);

// [TEST 4]: Missing affiliate URL → REJECTED_INCOMPLETE
const { validated: v4, rejected: r4 } = adapterForValidation.normalizeAndValidate([
  { id: 'deal_3', name: 'Valid Deal Title', discounted_price: 50000, original_price: 100000, start_time: '2026-09-01', end_time: '2026-09-30' }
  // missing affiliate_url
]);
assertTest(
  'T1_04_MISSING_AFFILIATE_URL_REJECTED',
  v4.length === 0 && r4.length === 1 && r4[0].missing_fields.includes('affiliate_url'),
  'Item thiếu affiliate_url bị từ chối REJECTED_INCOMPLETE — không được tự tạo URL affiliate giả'
);

// [TEST 5]: Complete raw item → validated but with RAW_PROVIDER_PAYLOAD status (not auto-rendered)
const { validated: v5, rejected: r5 } = adapterForValidation.normalizeAndValidate([
  {
    id: 'deal_complete', name: 'Real Deal From Provider', discounted_price: 50000, original_price: 100000,
    currency: 'VND',
    min_spend: 0,
    user_eligibility: 'All Users',
    payment_method: 'All Methods',
    rules: ['Rule 1'],
    start_time: new Date(Date.now() + 3600000).toISOString(),
    end_time: new Date(Date.now() + 86400000 * 30).toISOString(),
    affiliate_url: 'https://real-provider.com/track?deal=123'
  }
]);
assertTest(
  'T1_05_COMPLETE_ITEM_RAW_PROVIDER_PAYLOAD',
  v5.length === 1 && r5.length === 0 && v5[0].governance_status === 'RAW_PROVIDER_PAYLOAD' && v5[0].volatile_flag === true,
  'Item đầy đủ được chấp nhận với trạng thái RAW_PROVIDER_PAYLOAD — tuyệt đối không tự render ra production'
);

// [TEST 6]: No default fill-in verification — validated item must NOT contain fabricated values
const validatedItem = v5[0];
const noFabricatedConditions = validatedItem.conditions.user_eligibility === 'All Users' &&
                                validatedItem.conditions.payment_method === 'All Methods' &&
                                validatedItem.conditions.transparent_rules.length === 1;
assertTest(
  'T1_06_ZERO_DEFAULT_FILLIN_VERIFICATION',
  noFabricatedConditions && validatedItem.voucher_code === null,
  'Item hợp lệ nhận đúng giá trị do provider cung cấp — không bị adapter tự gán giá trị mặc định suy diễn'
);

// ═══════════════════════════════════════════════════════════
// TRACK 2: MERCHANT INTAKE NEGATIVE TESTS
// ═══════════════════════════════════════════════════════════

// [TEST 7]: Demo/synthetic fixture is now REJECTED
const fixtureValidation = validateMerchantIntake(sampleFixture);
assertTest(
  'T2_07_DEMO_SYNTHETIC_FIXTURE_REJECTED',
  fixtureValidation.valid === false && fixtureValidation.status === 'REJECTED_INCOMPLETE' &&
  fixtureValidation.errors.some(e => e.includes('SYNTHETIC') || e.includes('DEMO')),
  'Fixture mẫu SYNTHETIC_NOT_EVIDENCE bị validator từ chối triệt để — không được coi là dữ liệu merchant thật'
);

// [TEST 8]: Empty-string proof hash rejected
const emptyHashPayload = {
  intake_id: 'INTAKE_TEST_HASH', merchant_name: 'Real Merchant', brand_id: 'REAL',
  danang_branches: [{ branch_name: 'Real Branch', street_address: '123 Real St', district: 'Hải Châu' }],
  contact_person: { full_name: 'Nguyễn Thị Test', role: 'Manager', email_or_phone: 'test@real.vn' },
  written_proof: { proof_type: 'SIGNED_PARTNERSHIP_FORM', document_title: 'Real Doc', document_sha256: EMPTY_STRING_SHA256, signed_date: '2026-08-20' },
  deal_name: 'Real Deal', base_price: 100000, promotional_price: 50000,
  applicable_surcharges: [], transparent_conditions: ['Điều kiện thật'],
  valid_from: '2026-09-01', valid_to: '2026-09-30', channel_type: 'DIRECT_DEAL', no_affiliate: true
};
const hashValidation = validateMerchantIntake(emptyHashPayload);
assertTest(
  'T2_08_EMPTY_PROOF_HASH_REJECTED',
  hashValidation.valid === false && hashValidation.errors.some(e => e.includes('EMPTY_PROOF_HASH')),
  'Chứng từ có hash SHA-256 rỗng (hash của empty string) bị từ chối — bắt buộc phải có tài liệu thật'
);

// [TEST 9]: Zero price rejected
const zeroPricePayload = {
  ...emptyHashPayload,
  written_proof: { ...emptyHashPayload.written_proof, document_sha256: 'a'.repeat(64) },
  base_price: 0, promotional_price: 0
};
const priceValidation = validateMerchantIntake(zeroPricePayload);
assertTest(
  'T2_09_ZERO_PRICE_REJECTED',
  priceValidation.valid === false && priceValidation.errors.some(e => e.includes('lớn hơn 0')),
  'Biểu mẫu với giá = 0 bị từ chối — không được coi là deal có giá trị thực'
);

// [TEST 10]: Unconfirmed merchant (synthetic markers in contact) → REJECTED
const syntheticContactPayload = {
  ...emptyHashPayload,
  written_proof: { ...emptyHashPayload.written_proof, document_sha256: 'a'.repeat(64) },
  base_price: 100000, promotional_price: 50000,
  contact_person: { full_name: '[SYNTHETIC] Fake Contact', role: 'Test', email_or_phone: 'test@fake.vn' }
};
const contactValidation = validateMerchantIntake(syntheticContactPayload);
assertTest(
  'T2_10_SYNTHETIC_CONTACT_REJECTED',
  contactValidation.valid === false && contactValidation.errors.some(e => e.includes('SYNTHETIC_CONTACT')),
  'Biểu mẫu có người liên hệ chứa dấu hiệu [SYNTHETIC] bị từ chối'
);

// [TEST 11]: Complete REAL-shaped merchant payload → READY_FOR_CANDIDATE_GATE (not auto-rendered)
const realShapedPayload = {
  intake_id: 'INTAKE_REAL_001', merchant_name: 'Công Ty XYZ', brand_id: 'XYZ',
  danang_branches: [{ branch_name: 'Chi Nhánh Hải Châu', street_address: '456 Nguyễn Văn Linh', district: 'Hải Châu' }],
  contact_person: { full_name: 'Trần Văn An', role: 'Quản lý', email_or_phone: '0905123456' },
  written_proof: { proof_type: 'BRANCH_MANAGER_CONFIRMATION', document_title: 'Xác nhận biểu giá', document_sha256: 'b'.repeat(64), signed_date: '2026-08-20' },
  deal_name: 'Combo ưu đãi mùa hè', base_price: 200000, promotional_price: 150000,
  applicable_surcharges: [{ fee_name: 'VAT', amount: 15000, condition: 'Tính trên tổng bill' }],
  transparent_conditions: ['Áp dụng cho đơn từ 2 người trở lên', 'Không kết hợp khuyến mãi khác'],
  valid_from: '2026-09-01', valid_to: '2026-09-30', channel_type: 'DIRECT_DEAL', no_affiliate: true
};
const realValidation = validateMerchantIntake(realShapedPayload);
assertTest(
  'T2_11_REAL_SHAPED_PAYLOAD_READY_FOR_GATE',
  realValidation.valid === true && realValidation.status === 'READY_FOR_CANDIDATE_GATE' && realValidation.danang_verified === true,
  'Biểu mẫu hoàn chỉnh (không synthetic, không demo) đạt READY_FOR_CANDIDATE_GATE — chờ CEO duyệt trước khi render'
);

// ═══════════════════════════════════════════════════════════
// PRODUCTION INVARIANT
// ═══════════════════════════════════════════════════════════

// [TEST 12]: Production feed = [] and is_approved = false
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
const prodHash = crypto.createHash('sha256').update(prodRaw).digest('hex');
const releaseManifest = JSON.parse(fs.readFileSync(path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json'), 'utf8'));
const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? releaseManifest.is_approved;

assertTest(
  'INVARIANT_12_PRODUCTION_LOCKED',
  prodRaw.trim() === '[]' && prodHash === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945' && isApproved === false,
  `Production feed duy trì bất biến [] (SHA-256: ${prodHash}) và RELEASE_MANIFEST is_approved: false (LOCKED)`
);

if (passCount === testCount && testCount > 0) {
  console.log(`\n🟢 [REMEDIATION-050A-SUMMARY] TOÀN BỘ ${passCount}/${testCount} KIỂM THỬ KHẮC PHỤC ĐÃ ĐẠT [PASS]!\n`);
} else {
  console.error(`\n❌ [REMEDIATION-050A-SUMMARY] KIỂM THỬ THẤT BẠI: ${passCount}/${testCount} PASS!\n`);
  process.exitCode = 1;
}
