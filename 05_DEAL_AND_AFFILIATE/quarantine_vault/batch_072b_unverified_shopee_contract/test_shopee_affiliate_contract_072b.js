/**
 * DETERMINISTIC UNIT TEST FOR SHOPEE AFFILIATE CONTRACT (072B)
 * Directive: JAYT-LEAN-PIVOT-072
 */

const crypto = require('crypto');
const SHOPEE_AFFILIATE_CONTRACT_072B = require('../05_DEAL_AND_AFFILIATE/feed_gateway/provider_contracts/shopee_affiliate_contract_072b');

let passCount = 0;
let failCount = 0;

function assertTest(name, condition, message) {
  if (condition) {
    console.log(`  [${name}]: [PASS] - ${message}`);
    passCount++;
  } else {
    console.error(`  [${name}]: [FAIL] - ${message}`);
    failCount++;
  }
}

console.log('🧪 [TEST-072B-SHOPEE-CONTRACT] Bắt đầu kiểm thử đơn vị deterministic cho Shopee Contract...');

// Test 1: Contract structure & official endpoint
assertTest('TEST_01_OFFICIAL_ENDPOINT',
  SHOPEE_AFFILIATE_CONTRACT_072B.official_endpoint === 'https://open-api.affiliate.shopee.vn/graphql',
  `Endpoint GraphQL chính xác (${SHOPEE_AFFILIATE_CONTRACT_072B.official_endpoint})`
);

// Test 2: Signature Deterministic Vector Test
const testAppId = '17372870594';
const testSecretKey = 'mock_secret_key_for_deterministic_test_072b';
const testTimestamp = 1787558400;
const testPayload = '{"query":"{ shopOfferV2(page: 0, limit: 1) { nodes { shopId } } }"}';

const baseString = `${testAppId}${testTimestamp}${testPayload}${testSecretKey}`;
const expectedSig = crypto.createHmac('sha256', testSecretKey).update(baseString, 'utf8').digest('hex');

const computedSig = SHOPEE_AFFILIATE_CONTRACT_072B.computeSignature(testAppId, testSecretKey, testTimestamp, testPayload);

assertTest('TEST_02_SIGNATURE_CALCULATION',
  computedSig === expectedSig,
  `Chữ ký HMAC-SHA256 tính toán khớp vector mẫu 100% (${computedSig.slice(0, 16)}...)`
);

// Test 3: Authorization Header Format
const authHeader = SHOPEE_AFFILIATE_CONTRACT_072B.buildAuthorizationHeader(testAppId, testSecretKey, testTimestamp, testPayload);
const expectedHeader = `SHA256 Credential=${testAppId}, Signature=${expectedSig}, Timestamp=${testTimestamp}`;

assertTest('TEST_03_AUTH_HEADER_FORMAT',
  authHeader === expectedHeader,
  `Định dạng header Authorization chuẩn xác (SHA256 Credential=..., Signature=..., Timestamp=...)`
);

// Test 4: Missing Arguments Fail-Closed
let threw = false;
try {
  SHOPEE_AFFILIATE_CONTRACT_072B.computeSignature('', 'secret', 123, '{}');
} catch (e) {
  threw = true;
}
assertTest('TEST_04_FAIL_CLOSED_ON_MISSING_ARGS',
  threw === true,
  'Thiếu tham số bắt buộc kích hoạt fail-closed exception'
);

// Test 5: GraphQL query templates
assertTest('TEST_05_GRAPHQL_QUERIES_EXIST',
  Boolean(SHOPEE_AFFILIATE_CONTRACT_072B.queries.generateShortLink && SHOPEE_AFFILIATE_CONTRACT_072B.queries.productOfferV2),
  'Có sẵn các truy vấn GraphQL chuẩn: generateShortLink, productOfferV2, shopOfferV2'
);

console.log(`\n======================================================`);
console.log(`🟢 [TEST-SUMMARY] Kết quả kiểm thử Shopee Contract: ${passCount}/${passCount + failCount} PASS!`);

if (failCount > 0) {
  process.exit(1);
}
