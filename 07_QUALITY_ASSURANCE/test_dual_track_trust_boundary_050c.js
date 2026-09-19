/**
 * JAYT DUAL-TRACK TRUST BOUNDARY TEST SUITE (050C)
 * Directive: JAYT-TRACK1-TRUST-BOUNDARY-050C
 *
 * Verification:
 * - Reject any payload containing TEST_ONLY, DEMO_ONLY, SYNTHETIC markers in Track 1.
 * - Enforce registered provider allowlist (REGISTERED_PROVIDERS).
 * - Enforce HTTPS on provider API endpoints (reject http://).
 * - Byte-for-byte raw snapshot SHA-256 hash & provenance audit metadata on RAW_PROVIDER_PAYLOAD.
 * - Track 2 merchant intake validator maintains synthetic/test rejection.
 * - Production invariant: deals_feed.json === [] and is_approved === false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const repoRoot = path.resolve(__dirname, '..');

const {
  OnlineFeedAdapter,
  REGISTERED_PROVIDERS,
  containsSyntheticOrTestMarker
} = require('../05_DEAL_AND_AFFILIATE/feed_gateway/adapter_interface');
const { validateMerchantIntake } = require('../05_DEAL_AND_AFFILIATE/merchant_intake/merchant_intake_validator');

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

console.log('🧪 [JAYT-TRUST-BOUNDARY-050C-TEST] Khởi chạy bộ kiểm thử Ranh Giới Tin Cậy Track 1 (050C)...');

// Helper to create a pristine, valid deal shape from a registered provider
function getPristineRealShapedPayload() {
  const futureStart = new Date(Date.now() + 3600000).toISOString();
  const futureEnd = new Date(Date.now() + 86400000 * 30).toISOString();
  return {
    id: 'SHOPEE_PROMO_88921',
    name: 'Voucher Giảm 30% Đơn Hàng Mua Sắm Gia Dụng',
    original_price: 200000,
    discounted_price: 140000,
    discount_rate: 30,
    currency: 'VND',
    voucher_code: 'HOME30OFF',
    min_spend: 100000,
    user_eligibility: 'Tất cả tài khoản hợp lệ',
    payment_method: 'Ví ShopeePay hoặc Thẻ Ngân Hàng',
    rules: ['Áp dụng cho danh mục gia dụng', 'Số lượng có hạn trong ngày'],
    start_time: futureStart,
    end_time: futureEnd,
    affiliate_url: 'https://affiliate.shopee.vn/track?offer_id=88921'
  };
}

const registeredAdapter = new OnlineFeedAdapter('SHOPEE_AFFILIATE', 'SHOPEE');

// ═══════════════════════════════════════════════════════════
// 1. GATE 0: REJECTION OF TEST_ONLY / DEMO_ONLY / SYNTHETIC MARKERS (050C)
// ═══════════════════════════════════════════════════════════

// [TEST 1]: Payload with test_notice / TEST_ONLY marker rejected
const testNoticePayload = {
  ...getPristineRealShapedPayload(),
  test_notice: 'TEST_ONLY_NOT_EVIDENCE'
};
const { validated: v1, rejected: r1 } = registeredAdapter.normalizeAndValidate([testNoticePayload]);
assertTest(
  'T1_01_TEST_MARKER_IN_NOTICE_REJECTED',
  v1.length === 0 && r1.length === 1 && r1[0].status === 'REJECTED_INCOMPLETE' &&
  r1[0].violations.some(v => v.includes('REJECTED_TEST_OR_SYNTHETIC')),
  'Payload chứa nhãn test_notice / TEST_ONLY bị từ chối triệt để — không được vào RAW_PROVIDER_PAYLOAD'
);

// [TEST 2]: Payload with demo_notice / DEMO_ONLY marker rejected
const demoNoticePayload = {
  ...getPristineRealShapedPayload(),
  demo_notice: 'DEMO_ONLY_NOT_FOR_RENDER'
};
const { validated: v2, rejected: r2 } = registeredAdapter.normalizeAndValidate([demoNoticePayload]);
assertTest(
  'T1_02_DEMO_MARKER_IN_NOTICE_REJECTED',
  v2.length === 0 && r2.length === 1 && r2[0].status === 'REJECTED_INCOMPLETE' &&
  r2[0].violations.some(v => v.includes('REJECTED_TEST_OR_SYNTHETIC')),
  'Payload chứa nhãn demo_notice / DEMO_ONLY bị từ chối triệt để'
);

// [TEST 3]: Payload with synthetic marker in deal name rejected
const syntheticNamePayload = {
  ...getPristineRealShapedPayload(),
  name: '[SYNTHETIC] Deal Giả Định Không Phải Thật'
};
const { validated: v3, rejected: r3 } = registeredAdapter.normalizeAndValidate([syntheticNamePayload]);
assertTest(
  'T1_03_SYNTHETIC_MARKER_IN_NAME_REJECTED',
  v3.length === 0 && r3.length === 1 && r3[0].status === 'REJECTED_INCOMPLETE' &&
  r3[0].violations.some(v => v.includes('REJECTED_TEST_OR_SYNTHETIC')),
  'Deal có tên chứa dấu hiệu [SYNTHETIC] bị từ chối triệt để'
);

// [TEST 4]: Payload with synthetic marker in ID rejected
const syntheticIdPayload = {
  ...getPristineRealShapedPayload(),
  id: 'SYNTHETIC_DEAL_001'
};
const { validated: v4, rejected: r4 } = registeredAdapter.normalizeAndValidate([syntheticIdPayload]);
assertTest(
  'T1_04_SYNTHETIC_MARKER_IN_ID_REJECTED',
  v4.length === 0 && r4.length === 1 && r4[0].status === 'REJECTED_INCOMPLETE' &&
  r4[0].violations.some(v => v.includes('REJECTED_TEST_OR_SYNTHETIC')),
  'Deal có ID chứa dấu hiệu SYNTHETIC bị từ chối triệt để'
);

// [TEST 5]: Payload with synthetic marker in rules rejected
const syntheticRulesPayload = {
  ...getPristineRealShapedPayload(),
  rules: ['Quy tắc giả định [SYNTHETIC]']
};
const { validated: v5, rejected: r5 } = registeredAdapter.normalizeAndValidate([syntheticRulesPayload]);
assertTest(
  'T1_05_SYNTHETIC_MARKER_IN_RULES_REJECTED',
  v5.length === 0 && r5.length === 1 && r5[0].status === 'REJECTED_INCOMPLETE' &&
  r5[0].violations.some(v => v.includes('REJECTED_TEST_OR_SYNTHETIC')),
  'Deal có rules chứa dấu hiệu giả định bị từ chối triệt để'
);

// ═══════════════════════════════════════════════════════════
// 2. PROVIDER ALLOWLIST & HTTPS ENDPOINT ENFORCEMENT (050C)
// ═══════════════════════════════════════════════════════════

// [TEST 6]: Unregistered provider rejected in getCredentials()
const unregisteredAdapter = new OnlineFeedAdapter('UNREGISTERED_ROGUE_PROVIDER', 'ROGUE');
const unregCreds = unregisteredAdapter.getCredentials();
assertTest(
  'T1_06_UNREGISTERED_PROVIDER_CREDS_REJECTED',
  unregCreds.configured === false && unregCreds.status === 'UNREGISTERED_PROVIDER' &&
  unregCreds.reason.includes('TRUST_BOUNDARY_VIOLATION'),
  'Provider không thuộc danh sách đăng ký cho phép (allowlist) bị chặn khởi tạo credentials'
);

// [TEST 7]: Unregistered provider rejected in normalizeAndValidate()
const { validated: v7, rejected: r7 } = unregisteredAdapter.normalizeAndValidate([getPristineRealShapedPayload()]);
assertTest(
  'T1_07_UNREGISTERED_PROVIDER_VALIDATE_REJECTED',
  v7.length === 0 && r7.length === 1 && r7[0].status === 'REJECTED_UNREGISTERED_PROVIDER',
  'Dữ liệu từ provider chưa đăng ký bị chặn 100% khi đi qua bộ chuẩn hóa'
);

// [TEST 8]: Insecure HTTP endpoint rejected in getCredentials()
const prevEnvKey = process.env.ACCESSTRADE_API_KEY;
const prevEnvSecret = process.env.ACCESSTRADE_API_SECRET;
const prevEnvEndpoint = process.env.ACCESSTRADE_API_ENDPOINT;

process.env.ACCESSTRADE_API_KEY = 'mock_key';
process.env.ACCESSTRADE_API_SECRET = 'mock_secret';
process.env.ACCESSTRADE_API_ENDPOINT = 'http://api.accesstrade.vn/v1/deals'; // INSECURE HTTP

const accesstradeAdapter = new OnlineFeedAdapter('ACCESSTRADE_VN', 'ACCESSTRADE');
const httpCreds = accesstradeAdapter.getCredentials();
assertTest(
  'T1_08_INSECURE_HTTP_ENDPOINT_REJECTED',
  httpCreds.configured === false && httpCreds.status === 'INSECURE_ENDPOINT_REJECTED' &&
  httpCreds.reason.includes('must strictly use HTTPS protocol'),
  'Endpoint API dạng HTTP không an toàn bị từ chối INSECURE_ENDPOINT_REJECTED'
);

// [TEST 9]: Valid HTTPS endpoint accepted for registered provider
process.env.ACCESSTRADE_API_ENDPOINT = 'https://api.accesstrade.vn/v1/deals'; // SECURE HTTPS
const httpsCreds = accesstradeAdapter.getCredentials();
assertTest(
  'T1_09_REGISTERED_PROVIDER_HTTPS_CREDS_CONFIGURED',
  httpsCreds.configured === true && httpsCreds.status === 'CONFIGURED' &&
  httpsCreds.endpoint.startsWith('https://'),
  'Provider đã đăng ký kèm endpoint HTTPS hợp lệ đạt trạng thái CONFIGURED'
);

// Clean up env vars
delete process.env.ACCESSTRADE_API_KEY;
delete process.env.ACCESSTRADE_API_SECRET;
delete process.env.ACCESSTRADE_API_ENDPOINT;
if (prevEnvKey) process.env.ACCESSTRADE_API_KEY = prevEnvKey;
if (prevEnvSecret) process.env.ACCESSTRADE_API_SECRET = prevEnvSecret;
if (prevEnvEndpoint) process.env.ACCESSTRADE_API_ENDPOINT = prevEnvEndpoint;

// ═══════════════════════════════════════════════════════════
// 3. RAW SNAPSHOT HASH & PROVENANCE AUDIT INTEGRITY (050C)
// ═══════════════════════════════════════════════════════════

// [TEST 10]: Pristine real-shaped payload transitions with exact SHA-256 hash & provenance audit
const pristineRaw = getPristineRealShapedPayload();
const expectedHash = crypto.createHash('sha256').update(JSON.stringify(pristineRaw)).digest('hex');

const { validated: v10, rejected: r10 } = registeredAdapter.normalizeAndValidate([pristineRaw]);
assertTest(
  'T1_10_VALID_PAYLOAD_WITH_PROVENANCE_AND_HASH',
  v10.length === 1 && r10.length === 0 &&
  v10[0].governance_status === 'RAW_PROVIDER_PAYLOAD' &&
  v10[0].raw_payload_sha256 === expectedHash &&
  v10[0].provenance_audit?.trust_boundary_verified === true &&
  v10[0].provenance_audit?.provider_id === 'SHOPEE_AFFILIATE' &&
  v10[0].provenance_audit?.endpoint_protocol === 'HTTPS' &&
  v10[0].provenance_audit?.raw_payload_sha256 === expectedHash,
  `Payload thô chuyển sang RAW_PROVIDER_PAYLOAD kèm mã băm SHA-256 nguyên bản (${expectedHash}) và provenance audit đầy đủ`
);

// [TEST 11]: Schema compliance of validated item
const item = v10[0];
const hasAllRequiredFields = (
  typeof item.feed_provider === 'string' &&
  typeof item.external_deal_id === 'string' &&
  typeof item.item_name === 'string' &&
  typeof item.original_price === 'number' && item.original_price > 0 &&
  typeof item.discounted_price === 'number' && item.discounted_price > 0 &&
  typeof item.currency === 'string' &&
  typeof item.conditions === 'object' &&
  typeof item.valid_from === 'string' &&
  typeof item.valid_to === 'string' &&
  item.affiliate_tracking_url.startsWith('https://') &&
  item.affiliate_disclosure === 'AFFILIATE_LINK' &&
  item.volatile_flag === true &&
  /^[a-f0-9]{64}$/.test(item.raw_payload_sha256) &&
  typeof item.ingestion_timestamp === 'string' &&
  typeof item.provenance_audit === 'object'
);
assertTest(
  'T1_11_SCHEMA_CONFORMANCE_VERIFIED',
  hasAllRequiredFields,
  'Item chuẩn hóa tuân thủ 100% cấu trúc và kiểu dữ liệu của online_deal_feed.schema.json'
);

// ═══════════════════════════════════════════════════════════
// 4. TRACK 2: MERCHANT INTAKE VALIDATION REMAINS LOCKED
// ═══════════════════════════════════════════════════════════

// [TEST 12]: Track 2 synthetic fixture rejected
const sampleFixture = require('../05_DEAL_AND_AFFILIATE/merchant_intake/sample_intake_template.json');
const intakeValidation = validateMerchantIntake(sampleFixture);
assertTest(
  'T2_12_TRACK2_MERCHANT_INTAKE_SYNTHETIC_REJECTED',
  intakeValidation.valid === false && intakeValidation.status === 'REJECTED_INCOMPLETE',
  'Track 2 Direct Merchant Intake duy trì chặn 100% fixture synthetic / demo'
);

// ═══════════════════════════════════════════════════════════
// 5. PRODUCTION LOCK INVARIANT
// ═══════════════════════════════════════════════════════════

// [TEST 13]: Production feed = [] and is_approved = false
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
const prodHash = crypto.createHash('sha256').update(prodRaw).digest('hex');
const releaseManifest = JSON.parse(fs.readFileSync(path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json'), 'utf8'));
const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? releaseManifest.is_approved;

assertTest(
  'INVARIANT_13_PRODUCTION_FEED_EMPTY_AND_LOCKED',
  prodRaw.trim() === '[]' && prodHash === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945' && isApproved === false,
  `Production feed duy trì bất biến [] (SHA-256: ${prodHash}) và RELEASE_MANIFEST is_approved: false (LOCKED)`
);

if (passCount === testCount && testCount > 0) {
  console.log(`\n🟢 [TRUST-BOUNDARY-050C-SUMMARY] TOÀN BỘ ${passCount}/${testCount} KIỂM THỬ RANH GIỚI TIN CẬY 050C ĐÃ ĐẠT [PASS]!\n`);
} else {
  console.error(`\n❌ [TRUST-BOUNDARY-050C-SUMMARY] KIỂM THỬ THẤT BẠI: ${passCount}/${testCount} PASS!\n`);
  process.exitCode = 1;
}
