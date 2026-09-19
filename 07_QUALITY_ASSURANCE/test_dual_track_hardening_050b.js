/**
 * JAYT DUAL-TRACK HARDENING TEST SUITE (050B)
 * Directive: JAYT-DUAL-TRACK-HARDENING-050B
 *
 * Negative tests covering:
 * - HTTP affiliate URL (must be HTTPS)
 * - Invalid dates (start >= end) and expired dates (end in past)
 * - Missing conditions (min_spend, user_eligibility, payment_method, rules)
 * - Missing currency (zero default VND assumption)
 * - Price arithmetic (discounted > original, zero or negative prices)
 * - Mismatched discount rate (> 2% tolerance)
 * - Proper handling of test fixtures marked TEST_ONLY_NOT_EVIDENCE
 * - Production invariant (deals_feed.json === [] & is_approved === false)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const repoRoot = path.resolve(__dirname, '..');

const { OnlineFeedAdapter } = require('../05_DEAL_AND_AFFILIATE/feed_gateway/adapter_interface');
const { validateMerchantIntake, EMPTY_STRING_SHA256 } = require('../05_DEAL_AND_AFFILIATE/merchant_intake/merchant_intake_validator');

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

console.log('🧪 [JAYT-HARDENING-050B-TEST] Khởi chạy bộ kiểm thử Thắt Chặt Dữ Liệu Song Mã 050B...');

const adapter = new OnlineFeedAdapter('SHOPEE_AFFILIATE', 'SHOPEE');

// Helper to create a valid base test fixture payload for mutation testing
function getValidBasePayload() {
  const futureStart = new Date(Date.now() + 3600000).toISOString(); // +1 hour
  const futureEnd = new Date(Date.now() + 86400000 * 30).toISOString(); // +30 days
  return {
    id: 'DEAL_PROMO_001',
    name: 'Gói Ưu Đãi Trải Nghiệm Chuẩn',
    original_price: 100000,
    discounted_price: 70000,
    discount_rate: 30, // 30% discount matches exactly (100k - 70k) / 100k
    currency: 'VND',
    voucher_code: 'TEST30',
    min_spend: 50000,
    user_eligibility: 'Tất cả khách hàng',
    payment_method: 'Mọi hình thức thanh toán',
    rules: ['Áp dụng tại điểm bán chỉ định', 'Không cộng dồn khuyến mãi khác'],
    start_time: futureStart,
    end_time: futureEnd,
    affiliate_url: 'https://secure-partner.vn/affiliate/track?id=TEST_001'
  };
}

// ═══════════════════════════════════════════════════════════
// TRACK 1: ONLINE FEED GATEWAY SEMANTIC & ARITHMETIC TESTS (050B)
// ═══════════════════════════════════════════════════════════

// [TEST 1]: HTTP URL rejected (must be HTTPS)
const httpPayload = { ...getValidBasePayload(), affiliate_url: 'http://insecure-partner.vn/affiliate/track' };
const { validated: v1, rejected: r1 } = adapter.normalizeAndValidate([httpPayload]);
assertTest(
  'T1_01_HTTP_URL_REJECTED',
  v1.length === 0 && r1.length === 1 && r1[0].status === 'REJECTED_INCOMPLETE' &&
  r1[0].violations.some(v => v.includes('HTTPS')),
  'Affiliate URL dạng HTTP không bảo mật bị từ chối REJECTED_INCOMPLETE — bắt buộc HTTPS'
);

// [TEST 2]: Invalid date ordering (start_time >= end_time)
const invalidDateOrderPayload = {
  ...getValidBasePayload(),
  start_time: '2026-10-01T00:00:00Z',
  end_time: '2026-09-01T00:00:00Z'
};
const { validated: v2, rejected: r2 } = adapter.normalizeAndValidate([invalidDateOrderPayload]);
assertTest(
  'T1_02_INVALID_DATE_ORDER_REJECTED',
  v2.length === 0 && r2.length === 1 && r2[0].status === 'REJECTED_INCOMPLETE' &&
  r2[0].violations.some(v => v.includes('start_time must be before end_time')),
  'Thời gian sai thứ tự (start >= end) bị từ chối REJECTED_INCOMPLETE'
);

// [TEST 3]: Expired date (end_time in the past)
const expiredPayload = {
  ...getValidBasePayload(),
  start_time: '2025-01-01T00:00:00Z',
  end_time: '2025-02-01T00:00:00Z'
};
const { validated: v3, rejected: r3 } = adapter.normalizeAndValidate([expiredPayload]);
assertTest(
  'T1_03_EXPIRED_DATE_REJECTED',
  v3.length === 0 && r3.length === 1 && r3[0].status === 'REJECTED_INCOMPLETE' &&
  r3[0].violations.some(v => v.includes('EXPIRED')),
  'Deal đã hết hạn (end_time trong quá khứ) bị từ chối REJECTED_INCOMPLETE'
);

// [TEST 4]: Missing min_spend condition
const missingMinSpendPayload = { ...getValidBasePayload() };
delete missingMinSpendPayload.min_spend;
const { validated: v4, rejected: r4 } = adapter.normalizeAndValidate([missingMinSpendPayload]);
assertTest(
  'T1_04_MISSING_MIN_SPEND_REJECTED',
  v4.length === 0 && r4.length === 1 && r4[0].status === 'REJECTED_INCOMPLETE' &&
  r4[0].violations.some(v => v.includes('min_spend')),
  'Thiếu điều kiện min_spend bị từ chối REJECTED_INCOMPLETE — không được bỏ sót điều kiện giao dịch'
);

// [TEST 5]: Missing user_eligibility condition
const missingEligibilityPayload = { ...getValidBasePayload() };
delete missingEligibilityPayload.user_eligibility;
const { validated: v5, rejected: r5 } = adapter.normalizeAndValidate([missingEligibilityPayload]);
assertTest(
  'T1_05_MISSING_USER_ELIGIBILITY_REJECTED',
  v5.length === 0 && r5.length === 1 && r5[0].status === 'REJECTED_INCOMPLETE' &&
  r5[0].violations.some(v => v.includes('user_eligibility')),
  'Thiếu điều kiện user_eligibility bị từ chối REJECTED_INCOMPLETE'
);

// [TEST 6]: Missing payment_method condition
const missingPaymentMethodPayload = { ...getValidBasePayload() };
delete missingPaymentMethodPayload.payment_method;
const { validated: v6, rejected: r6 } = adapter.normalizeAndValidate([missingPaymentMethodPayload]);
assertTest(
  'T1_06_MISSING_PAYMENT_METHOD_REJECTED',
  v6.length === 0 && r6.length === 1 && r6[0].status === 'REJECTED_INCOMPLETE' &&
  r6[0].violations.some(v => v.includes('payment_method')),
  'Thiếu điều kiện payment_method bị từ chối REJECTED_INCOMPLETE'
);

// [TEST 7]: Missing or empty rules condition
const emptyRulesPayload = { ...getValidBasePayload(), rules: [] };
const { validated: v7, rejected: r7 } = adapter.normalizeAndValidate([emptyRulesPayload]);
assertTest(
  'T1_07_EMPTY_RULES_REJECTED',
  v7.length === 0 && r7.length === 1 && r7[0].status === 'REJECTED_INCOMPLETE' &&
  r7[0].violations.some(v => v.includes('rules')),
  'Thiếu danh sách rules minh bạch bị từ chối REJECTED_INCOMPLETE'
);

// [TEST 8]: Missing currency (zero default VND assumption)
const missingCurrencyPayload = { ...getValidBasePayload() };
delete missingCurrencyPayload.currency;
const { validated: v8, rejected: r8 } = adapter.normalizeAndValidate([missingCurrencyPayload]);
assertTest(
  'T1_08_MISSING_CURRENCY_REJECTED',
  v8.length === 0 && r8.length === 1 && r8[0].status === 'REJECTED_INCOMPLETE' &&
  r8[0].violations.some(v => v.includes('currency')),
  'Thiếu currency do provider cung cấp bị từ chối REJECTED_INCOMPLETE — không tự suy diễn VND'
);

// [TEST 9]: Reversed price (discounted_price > original_price)
const reversedPricePayload = {
  ...getValidBasePayload(),
  original_price: 50000,
  discounted_price: 80000,
  discount_rate: undefined
};
const { validated: v9, rejected: r9 } = adapter.normalizeAndValidate([reversedPricePayload]);
assertTest(
  'T1_09_REVERSED_PRICE_REJECTED',
  v9.length === 0 && r9.length === 1 && r9[0].status === 'REJECTED_INCOMPLETE' &&
  r9[0].violations.some(v => v.includes('discounted_price must be <= original_price')),
  'Giá giảm lớn hơn giá gốc bị từ chối REJECTED_INCOMPLETE'
);

// [TEST 10]: Zero or negative price
const zeroPriceItem = { ...getValidBasePayload(), original_price: 0, discounted_price: 0 };
const { validated: v10, rejected: r10 } = adapter.normalizeAndValidate([zeroPriceItem]);
assertTest(
  'T1_10_ZERO_OR_NEGATIVE_PRICE_REJECTED',
  v10.length === 0 && r10.length === 1 && r10[0].status === 'REJECTED_INCOMPLETE' &&
  r10[0].violations.some(v => v.includes('> 0')),
  'Mức giá <= 0 bị từ chối REJECTED_INCOMPLETE — bắt buộc giá dương có thật'
);

// [TEST 11]: Mismatched discount rate (> 2% tolerance)
const mismatchedDiscountRatePayload = {
  ...getValidBasePayload(),
  original_price: 100000,
  discounted_price: 70000, // actual discount is 30%
  discount_rate: 50 // claimed discount is 50% (deviation = 20% > 2%)
};
const { validated: v11, rejected: r11 } = adapter.normalizeAndValidate([mismatchedDiscountRatePayload]);
assertTest(
  'T1_11_MISMATCHED_DISCOUNT_RATE_REJECTED',
  v11.length === 0 && r11.length === 1 && r11[0].status === 'REJECTED_INCOMPLETE' &&
  r11[0].violations.some(v => v.includes('discount_rate')),
  'Tỷ lệ giảm giá công bố sai lệch so với giá trị số học bị từ chối REJECTED_INCOMPLETE'
);

// [TEST 12]: Complete valid payload → RAW_PROVIDER_PAYLOAD
const validFixture = getValidBasePayload();
const { validated: v12, rejected: r12 } = adapter.normalizeAndValidate([validFixture]);
assertTest(
  'T1_12_VALID_TEST_FIXTURE_IS_RAW_PROVIDER_PAYLOAD',
  v12.length === 1 && r12.length === 0 &&
  v12[0].governance_status === 'RAW_PROVIDER_PAYLOAD' &&
  v12[0].volatile_flag === true &&
  v12[0].affiliate_tracking_url.startsWith('https://') &&
  v12[0].currency === 'VND' &&
  v12[0].conditions.min_spend === 50000,
  'Payload hợp lệ đầy đủ đạt trạng thái RAW_PROVIDER_PAYLOAD — tuyệt đối không tự render ra production'
);

// ═══════════════════════════════════════════════════════════
// TRACK 2: MERCHANT INTAKE VALIDATION (050B)
// ═══════════════════════════════════════════════════════════

// [TEST 13]: Fixtures with TEST_ONLY_NOT_EVIDENCE or SYNTHETIC_NOT_EVIDENCE rejected
const testOnlyIntake = {
  demo_notice: 'TEST_ONLY_NOT_EVIDENCE — DO NOT ACCEPT AS REAL MERCHANT',
  intake_id: 'INTAKE_TEST_ONLY_001',
  merchant_name: 'Nhà Hàng Mẫu Test Only',
  brand_id: 'TEST_BRAND',
  danang_branches: [{ branch_name: 'Chi Nhánh Test', street_address: '123 Test St', district: 'Hải Châu' }],
  contact_person: { full_name: 'Người Test', role: 'Tester', email_or_phone: 'test@test.vn' },
  written_proof: { proof_type: 'SIGNED_FORM', document_title: 'Doc', document_sha256: 'a'.repeat(64), signed_date: '2026-08-01' },
  deal_name: 'Deal Test', base_price: 100000, promotional_price: 70000,
  transparent_conditions: ['Điều kiện test'],
  valid_from: '2026-09-01', valid_to: '2026-09-30', channel_type: 'DIRECT_DEAL', no_affiliate: true
};
const intakeVal = validateMerchantIntake(testOnlyIntake);
assertTest(
  'T2_13_TEST_FIXTURE_NOT_TREATED_AS_REAL_MERCHANT',
  intakeVal.valid === false && intakeVal.status === 'REJECTED_INCOMPLETE' &&
  intakeVal.errors.some(e => e.includes('SYNTHETIC_OR_DEMO') || e.includes('SYNTHETIC')),
  'Biểu mẫu mang nhãn TEST_ONLY_NOT_EVIDENCE bị từ chối triệt để — không được trình CEO như merchant thật'
);

// ═══════════════════════════════════════════════════════════
// PRODUCTION INVARIANT
// ═══════════════════════════════════════════════════════════

// [TEST 14]: Production feed = [] and is_approved = false
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
const prodHash = crypto.createHash('sha256').update(prodRaw).digest('hex');
const releaseManifest = JSON.parse(fs.readFileSync(path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json'), 'utf8'));
const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? releaseManifest.is_approved;

assertTest(
  'INVARIANT_14_PRODUCTION_LOCKED',
  prodRaw.trim() === '[]' && prodHash === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945' && isApproved === false,
  `Production feed duy trì bất biến [] (SHA-256: ${prodHash}) và RELEASE_MANIFEST is_approved: false (LOCKED)`
);

if (passCount === testCount && testCount > 0) {
  console.log(`\n🟢 [HARDENING-050B-SUMMARY] TOÀN BỘ ${passCount}/${testCount} KIỂM THỬ THẮT CHẶT 050B ĐÃ ĐẠT [PASS]!\n`);
} else {
  console.error(`\n❌ [HARDENING-050B-SUMMARY] KIỂM THỬ THẤT BẠI: ${passCount}/${testCount} PASS!\n`);
  process.exitCode = 1;
}
