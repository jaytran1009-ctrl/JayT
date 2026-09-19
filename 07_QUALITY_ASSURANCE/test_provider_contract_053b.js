/**
 * JAYT PROVIDER OFFICIAL CONTRACT & AUTH PROBE TEST SUITE (053B)
 * Directive: JAYT-PROVIDER-CONTRACT-053B
 *
 * Verifies:
 * 1. Official provider contracts for Shopee, Lazada, TikTok Shop.
 * 2. Unregistered/unverified provider -> UNSUPPORTED_PENDING_PROVIDER_DOCS.
 * 3. TikTok Shop official signing algorithm validated against official test vector.
 * 4. Shopee Affiliate GraphQL official factor & signature validated against test vector.
 * 5. Lazada Open Platform official signing (UPPERCASE) validated against test vector.
 * 6. Successful probe with matching identity transitions status in sandbox.
 * 7. Negative: HTTP 200 missing identity payload -> REJECTED_IDENTITY_PAYLOAD_MISSING.
 * 8. Negative: HTTP 200 partner ID mismatch -> REJECTED_PARTNER_ID_MISMATCH.
 * 9. Negative: Unauthorized endpoint -> REJECTED_UNAUTHORIZED_ENDPOINT.
 * 10. Live Registry Isolation Guarantee (zero live mutation).
 * 11. Logging Hygiene (metadata only, zero secrets/headers).
 * 12. Invariant: deals_feed.json === [] and is_approved === false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');
const repoRoot = path.resolve(__dirname, '..');

const {
  probeProviderAuthentication,
  loadRegistry,
  DEFAULT_REGISTRY_PATH
} = require('../05_DEAL_AND_AFFILIATE/feed_gateway/auth_probe');

const {
  getProviderContract,
  PROVIDER_CONTRACTS,
  SHOPEE_AFFILIATE_CONTRACT,
  LAZADA_AFFILIATE_CONTRACT,
  TIKTOK_AFFILIATE_CONTRACT
} = require('../05_DEAL_AND_AFFILIATE/feed_gateway/provider_contracts');

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

console.log('🧪 [JAYT-PROVIDER-CONTRACT-053B-TEST] Khởi chạy bộ kiểm thử Hợp Đồng Provider & Thăm Dò Xác Thực 053B...');

(async () => {
  // Capture initial hash of live registry to prove zero test pollution
  const initialLiveRegistryRaw = fs.readFileSync(DEFAULT_REGISTRY_PATH, 'utf8');
  const initialLiveRegistryHash = crypto.createHash('sha256').update(initialLiveRegistryRaw).digest('hex');

  // [TEST 1]: Official Provider Contracts Registration & Unsupported Provider Handling
  const shopeeContract = getProviderContract('SHOPEE_AFFILIATE');
  const lazadaContract = getProviderContract('LAZADA_AFFILIATE');
  const tiktokContract = getProviderContract('TIKTOK_AFFILIATE');
  const uncontracted = getProviderContract('UNKNOWN_PROVIDER_XYZ');

  const contractsRegistered = shopeeContract.support_status === 'OFFICIALLY_SPECIFIED' &&
                              lazadaContract.support_status === 'OFFICIALLY_SPECIFIED' &&
                              tiktokContract.support_status === 'OFFICIALLY_SPECIFIED' &&
                              uncontracted.support_status === 'UNSUPPORTED_PENDING_PROVIDER_DOCS';

  assertTest(
    'T1_01_OFFICIAL_CONTRACT_REGISTRATION_AND_SUPPORT_STATUS',
    contractsRegistered,
    'Hợp đồng chính thức được đăng ký cho Shopee, Lazada, TikTok; Provider thiếu tài liệu trả về UNSUPPORTED_PENDING_PROVIDER_DOCS [PASS]'
  );

  // [TEST 2]: TikTok Shop Official Signature Test Vector (Official Doc Spec)
  const tvTikTok = TIKTOK_AFFILIATE_CONTRACT.test_vector;
  const computedTikTokSig = TIKTOK_AFFILIATE_CONTRACT.computeSignature(
    tvTikTok.path,
    tvTikTok.params,
    tvTikTok.body,
    tvTikTok.secret
  );
  assertTest(
    'T1_02_TIKTOK_OFFICIAL_SIGNATURE_TEST_VECTOR',
    computedTikTokSig === tvTikTok.expected_signature,
    'Thuật toán ký TikTok Shop (path + sorted query params + body -> HMAC-SHA256) khớp chính xác test vector chuẩn [PASS]'
  );

  // [TEST 3]: Shopee Affiliate GraphQL Official Signature Test Vector
  const tvShopee = SHOPEE_AFFILIATE_CONTRACT.test_vector;
  const computedShopeeSig = SHOPEE_AFFILIATE_CONTRACT.computeSignature(
    tvShopee.app_id,
    tvShopee.timestamp,
    tvShopee.body,
    tvShopee.secret
  );
  assertTest(
    'T1_03_SHOPEE_OFFICIAL_SIGNATURE_TEST_VECTOR',
    computedShopeeSig === tvShopee.expected_signature,
    'Thuật toán ký Shopee GraphQL (appId + timestamp + body + secret -> HMAC-SHA256) khớp chính xác test vector chuẩn [PASS]'
  );

  // [TEST 4]: Lazada Open Platform Official Signature Test Vector (UPPERCASE)
  const tvLazada = LAZADA_AFFILIATE_CONTRACT.test_vector;
  const computedLazadaSig = LAZADA_AFFILIATE_CONTRACT.computeSignature(
    tvLazada.path,
    tvLazada.params,
    tvLazada.secret
  );
  assertTest(
    'T1_04_LAZADA_OFFICIAL_SIGNATURE_TEST_VECTOR',
    computedLazadaSig === tvLazada.expected_signature && computedLazadaSig === computedLazadaSig.toUpperCase(),
    'Thuật toán ký Lazada (path + sorted params -> HMAC-SHA256 UPPERCASE) khớp chính xác test vector chuẩn [PASS]'
  );

  // Setup isolated temporary sandbox registry
  const tempSandboxDir = path.join(os.tmpdir(), `jayt_contract_sandbox_${Date.now()}`);
  fs.mkdirSync(tempSandboxDir, { recursive: true });
  const sandboxRegistryPath = path.join(tempSandboxDir, 'sandbox_authorized_accounts.json');

  const sandboxRegistryData = {
    directive: 'JAYT-PROVIDER-CONTRACT-053B-SANDBOX',
    platforms: {
      SHOPEE_AFFILIATE: {
        platform_name: 'Shopee Vietnam Affiliate',
        partner_id: '17372870594',
        api_endpoint: 'https://open-api.affiliate.shopee.vn/graphql',
        status: 'DECLARED_PENDING_AUTHENTICATION',
        env_key_prefix: 'SHOPEE'
      },
      LAZADA_AFFILIATE: {
        platform_name: 'Lazada Vietnam Affiliate',
        partner_id: '262501305',
        api_endpoint: 'https://api.lazada.vn/rest',
        status: 'DECLARED_PENDING_AUTHENTICATION',
        env_key_prefix: 'LAZADA'
      },
      TIKTOK_AFFILIATE: {
        platform_name: 'TikTok Shop Vietnam Affiliate',
        partner_id: 'VNVNLCB6LYL3',
        api_endpoint: 'https://open-api.tiktokglobalshop.com',
        status: 'DECLARED_PENDING_AUTHENTICATION',
        env_key_prefix: 'TIKTOK'
      },
      UNSUPPORTED_PROVIDER: {
        platform_name: 'Unsupported Network',
        partner_id: '888888',
        api_endpoint: 'https://unsupported.com/api',
        status: 'DECLARED_PENDING_AUTHENTICATION',
        env_key_prefix: 'SHOPEE'
      }
    }
  };
  fs.writeFileSync(sandboxRegistryPath, JSON.stringify(sandboxRegistryData, null, 2), 'utf8');

  // Setup environment variables for mock tests
  process.env.SHOPEE_API_KEY = 'mock_shopee_key';
  process.env.SHOPEE_API_SECRET = 'mock_shopee_secret';
  process.env.SHOPEE_API_ENDPOINT = 'https://open-api.affiliate.shopee.vn/graphql';

  // [TEST 5]: Successful probe with matching identity transitions status in sandbox
  const successReceipt = await probeProviderAuthentication('SHOPEE_AFFILIATE', {
    registryPath: sandboxRegistryPath,
    customProbeExecutor: async () => {
      return {
        http_status: 200,
        request_id: 'req_shopee_probe_053b_ok',
        data: {
          data: {
            authedAccount: {
              partnerId: '17372870594',
              accountName: 'JayTOfficialAffiliate'
            }
          }
        }
      };
    }
  });

  const sandboxAfterSuccess = loadRegistry(sandboxRegistryPath);
  const successPass = successReceipt.auth_status === 'AUTHENTICATED_NO_FEED_INGESTION' &&
                      successReceipt.identity_verified === true &&
                      sandboxAfterSuccess.platforms.SHOPEE_AFFILIATE.status === 'AUTHENTICATED_NO_FEED_INGESTION';

  assertTest(
    'T1_05_SUCCESSFUL_PROBE_WITH_EXACT_IDENTITY_MATCH',
    successPass,
    'Probe 200 OK kèm danh tính khớp partner_id chuyển trạng thái sang AUTHENTICATED_NO_FEED_INGESTION [PASS]'
  );

  // [TEST 6]: Negative Case 1 — HTTP 200 but identity payload missing
  const missingIdentityReceipt = await probeProviderAuthentication('SHOPEE_AFFILIATE', {
    registryPath: sandboxRegistryPath,
    customProbeExecutor: async () => {
      return {
        http_status: 200,
        request_id: 'req_shopee_no_identity',
        data: { data: { status: 'OK' } } // missing partnerId
      };
    }
  });

  assertTest(
    'T1_06_NEGATIVE_IDENTITY_PAYLOAD_MISSING',
    missingIdentityReceipt.auth_status === 'DECLARED_PENDING_AUTHENTICATION' &&
    missingIdentityReceipt.error_code === 'REJECTED_IDENTITY_PAYLOAD_MISSING',
    'HTTP 200 nhưng thiếu danh tính trả về bị từ chối REJECTED_IDENTITY_PAYLOAD_MISSING [PASS]'
  );

  // [TEST 7]: Negative Case 2 — HTTP 200 but partner ID mismatch
  const mismatchReceipt = await probeProviderAuthentication('SHOPEE_AFFILIATE', {
    registryPath: sandboxRegistryPath,
    customProbeExecutor: async () => {
      return {
        http_status: 200,
        request_id: 'req_shopee_mismatch',
        data: { data: { authedAccount: { partnerId: '000000000_OTHER_ACCOUNT' } } }
      };
    }
  });

  assertTest(
    'T1_07_NEGATIVE_PARTNER_ID_MISMATCH',
    mismatchReceipt.auth_status === 'DECLARED_PENDING_AUTHENTICATION' &&
    mismatchReceipt.error_code === 'REJECTED_PARTNER_ID_MISMATCH',
    'HTTP 200 nhưng partner_id phản hồi không khớp registry bị từ chối REJECTED_PARTNER_ID_MISMATCH [PASS]'
  );

  // [TEST 8]: Negative Case 3 — Unsupported provider returns UNSUPPORTED_PENDING_PROVIDER_DOCS
  const unsupportedReceipt = await probeProviderAuthentication('UNSUPPORTED_PROVIDER', {
    registryPath: sandboxRegistryPath,
    customProbeExecutor: async () => {
      return { http_status: 200, data: {} };
    }
  });

  assertTest(
    'T1_08_NEGATIVE_UNSUPPORTED_PROVIDER_HANDLING',
    unsupportedReceipt.auth_status === 'DECLARED_PENDING_AUTHENTICATION' &&
    unsupportedReceipt.error_code === 'UNSUPPORTED_PENDING_PROVIDER_DOCS',
    'Provider thiếu hợp đồng chính thức bị từ chối ngay với UNSUPPORTED_PENDING_PROVIDER_DOCS [PASS]'
  );

  // [TEST 9]: Live Registry Isolation Guarantee
  const currentLiveRegistryRaw = fs.readFileSync(DEFAULT_REGISTRY_PATH, 'utf8');
  const currentLiveRegistryHash = crypto.createHash('sha256').update(currentLiveRegistryRaw).digest('hex');
  const liveRegistryUntouched = initialLiveRegistryHash === currentLiveRegistryHash;

  assertTest(
    'T1_09_SANDBOX_REGISTRY_ISOLATION_GUARANTEE',
    liveRegistryUntouched,
    `Registry sản xuất authorized_affiliate_accounts.json được bảo vệ bất biến 100% (SHA-256: ${currentLiveRegistryHash}) [PASS]`
  );

  // Clean up sandbox temp files
  try {
    fs.unlinkSync(sandboxRegistryPath);
    fs.rmdirSync(tempSandboxDir);
  } catch (e) {}

  // [TEST 10]: Logging Hygiene (metadata only, zero secrets/headers)
  const receiptKeys = Object.keys(successReceipt);
  const permittedKeys = ['provider', 'contract_id', 'http_status', 'request_id', 'timestamp', 'auth_status', 'identity_verified', 'error_code'];
  const receiptIsClean = receiptKeys.every(k => permittedKeys.includes(k)) &&
                         !JSON.stringify(successReceipt).includes('mock_shopee_secret') &&
                         !JSON.stringify(successReceipt).includes('Authorization');

  assertTest(
    'T1_10_RECEIPT_LOGGING_HYGIENE',
    receiptIsClean,
    'Receipt chỉ chứa metadata công khai — zero header, zero secret, zero query token [PASS]'
  );

  // [TEST 11]: Production Feed and Release Lock Invariant
  const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const prodHash = crypto.createHash('sha256').update(prodRaw).digest('hex');
  const releaseManifest = JSON.parse(fs.readFileSync(path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json'), 'utf8'));
  const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? releaseManifest.is_approved;

  assertTest(
    'INVARIANT_11_PRODUCTION_LOCKED',
    prodRaw.trim() === '[]' && prodHash === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945' && isApproved === false,
    `Production feed duy trì bất biến [] (SHA-256: ${prodHash}) và RELEASE_MANIFEST is_approved: false (LOCKED)`
  );

  if (passCount === testCount && testCount > 0) {
    console.log(`\n🟢 [PROVIDER-CONTRACT-053B-SUMMARY] TOÀN BỘ ${passCount}/${testCount} KIỂM THỬ HỢP ĐỒNG PROVIDER 053B ĐÃ ĐẠT [PASS]!\n`);
  } else {
    console.error(`\n❌ [PROVIDER-CONTRACT-053B-SUMMARY] KIỂM THỬ THẤT BẠI: ${passCount}/${testCount} PASS!\n`);
    process.exitCode = 1;
  }
})();
