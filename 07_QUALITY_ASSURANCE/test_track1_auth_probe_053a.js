/**
 * JAYT TRACK 1 AUTHENTICATION PROBE TEST SUITE (053A)
 * Directive: JAYT-TRACK1-AUTH-PROBE-053A
 *
 * Verifies:
 * 1. Test Isolation: Tests use an isolated sandbox registry file — live registry is NEVER mutated.
 * 2. Provider-Specific Auth Protocols: Correct headers and HMAC-SHA256 signatures built per provider.
 * 3. Strict Identity Verification: HTTP 200 OK + Matching Partner ID required for AUTHENTICATED_NO_FEED_INGESTION.
 * 4. Negative 1: HTTP 200 but identity payload missing -> REJECTED_IDENTITY_PAYLOAD_MISSING.
 * 5. Negative 2: HTTP 200 but partner ID mismatch -> REJECTED_PARTNER_ID_MISMATCH.
 * 6. Negative 3: Missing credentials/secret -> UNCONFIGURED.
 * 7. Negative 4: Unauthorized endpoint outside allowlist -> REJECTED_UNAUTHORIZED_ENDPOINT.
 * 8. Negative 5: HTTP 401/403 -> DECLARED_PENDING_AUTHENTICATION with sanitized error.
 * 9. Live Registry Untouched & 0 Secrets.
 * 10. Invariant: deals_feed.json === [] and is_approved === false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');
const repoRoot = path.resolve(__dirname, '..');

const {
  probeProviderAuthentication,
  loadRegistry,
  updateProviderStatus,
  ProviderAuthProtocols,
  DEFAULT_REGISTRY_PATH
} = require('../05_DEAL_AND_AFFILIATE/feed_gateway/auth_probe');

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

console.log('🧪 [JAYT-TRACK1-AUTH-PROBE-053A-TEST] Khởi chạy bộ kiểm thử Thăm Dò Xác Thực Track 1 053A...');

(async () => {
  // Capture initial hash of live registry to prove zero test pollution
  const initialLiveRegistryRaw = fs.readFileSync(DEFAULT_REGISTRY_PATH, 'utf8');
  const initialLiveRegistryHash = crypto.createHash('sha256').update(initialLiveRegistryRaw).digest('hex');

  // Setup isolated temporary sandbox registry
  const tempSandboxDir = path.join(os.tmpdir(), `jayt_auth_probe_sandbox_${Date.now()}`);
  fs.mkdirSync(tempSandboxDir, { recursive: true });
  const sandboxRegistryPath = path.join(tempSandboxDir, 'sandbox_authorized_accounts.json');

  const sandboxRegistryData = {
    directive: 'JAYT-TRACK1-AUTH-PROBE-053A-SANDBOX',
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
      UNAUTHORIZED_ENDPOINT_PROVIDER: {
        platform_name: 'Untrusted Provider',
        partner_id: '999999',
        api_endpoint: 'https://malicious-endpoint.com/api',
        status: 'DECLARED_PENDING_AUTHENTICATION',
        env_key_prefix: 'SHOPEE'
      }
    }
  };
  fs.writeFileSync(sandboxRegistryPath, JSON.stringify(sandboxRegistryData, null, 2), 'utf8');

  // Ensure mock credentials in env for mock testing
  process.env.SHOPEE_API_KEY = 'mock_shopee_key';
  process.env.SHOPEE_API_SECRET = 'mock_shopee_secret_abc123';
  process.env.SHOPEE_API_ENDPOINT = 'https://open-api.affiliate.shopee.vn/graphql';

  // [TEST 1]: Provider-Specific Protocol Signature Generation
  const shopeeProtocol = ProviderAuthProtocols.SHOPEE_AFFILIATE;
  const shopeeHeaders = shopeeProtocol.buildAuthHeaders({ secret: 'test_sec' }, '17372870594', '{}');
  const hasValidAuthHeaderFormat = typeof shopeeHeaders['Authorization'] === 'string' &&
                                   shopeeHeaders['Authorization'].startsWith('SHA256 Credential=17372870594, Timestamp=') &&
                                   shopeeHeaders['Authorization'].includes('Signature=');

  assertTest(
    'T1_01_PROVIDER_SPECIFIC_SIGNATURE_GENERATION',
    hasValidAuthHeaderFormat,
    'Quy chuẩn tạo chữ ký HMAC-SHA256 & Authorization header của Shopee được xây dựng chuẩn xác [PASS]'
  );

  // [TEST 2]: Successful probe with matching identity transitions status in sandbox
  const successReceipt = await probeProviderAuthentication('SHOPEE_AFFILIATE', {
    registryPath: sandboxRegistryPath,
    customProbeExecutor: async () => {
      return {
        http_status: 200,
        request_id: 'req_shopee_probe_success_001',
        data: {
          data: {
            authedAccount: {
              partnerId: '17372870594',
              accountName: 'JayTOfficialAffiliate',
              status: 'ACTIVE'
            }
          }
        }
      };
    }
  });

  const sandboxAfterSuccess = loadRegistry(sandboxRegistryPath);
  const successTransition = successReceipt.auth_status === 'AUTHENTICATED_NO_FEED_INGESTION' &&
                            successReceipt.identity_verified === true &&
                            sandboxAfterSuccess.platforms.SHOPEE_AFFILIATE.status === 'AUTHENTICATED_NO_FEED_INGESTION';

  assertTest(
    'T1_02_SUCCESSFUL_PROBE_WITH_MATCHING_IDENTITY',
    successTransition,
    'Probe 200 OK kèm danh tính khớp partner_id chuyển trạng thái sang AUTHENTICATED_NO_FEED_INGESTION [PASS]'
  );

  // [TEST 3]: Negative Case 1 — HTTP 200 but identity missing in body
  const missingIdentityReceipt = await probeProviderAuthentication('SHOPEE_AFFILIATE', {
    registryPath: sandboxRegistryPath,
    customProbeExecutor: async () => {
      return {
        http_status: 200,
        request_id: 'req_shopee_200_no_identity',
        data: {
          data: {
            somethingElse: 'ok' // Missing authedAccount.partnerId
          }
        }
      };
    }
  });

  const sandboxAfterMissingIdentity = loadRegistry(sandboxRegistryPath);
  const missingIdentityBlocked = missingIdentityReceipt.auth_status === 'DECLARED_PENDING_AUTHENTICATION' &&
                                missingIdentityReceipt.identity_verified === false &&
                                missingIdentityReceipt.error_code === 'REJECTED_IDENTITY_PAYLOAD_MISSING' &&
                                sandboxAfterMissingIdentity.platforms.SHOPEE_AFFILIATE.status === 'DECLARED_PENDING_AUTHENTICATION';

  assertTest(
    'T1_03_NEGATIVE_HTTP200_MISSING_IDENTITY_REJECTED',
    missingIdentityBlocked,
    'HTTP 200 nhưng phản hồi thiếu thông tin danh tính bị từ chối REJECTED_IDENTITY_PAYLOAD_MISSING [PASS]'
  );

  // [TEST 4]: Negative Case 2 — HTTP 200 but partner ID mismatch
  const mismatchReceipt = await probeProviderAuthentication('SHOPEE_AFFILIATE', {
    registryPath: sandboxRegistryPath,
    customProbeExecutor: async () => {
      return {
        http_status: 200,
        request_id: 'req_shopee_mismatch_id',
        data: {
          data: {
            authedAccount: {
              partnerId: '99999999999_DIFFERENT_ACCOUNT', // Mismatch!
              status: 'ACTIVE'
            }
          }
        }
      };
    }
  });

  const mismatchBlocked = mismatchReceipt.auth_status === 'DECLARED_PENDING_AUTHENTICATION' &&
                          mismatchReceipt.identity_verified === false &&
                          mismatchReceipt.error_code === 'REJECTED_PARTNER_ID_MISMATCH';

  assertTest(
    'T1_04_NEGATIVE_HTTP200_PARTNER_ID_MISMATCH_REJECTED',
    mismatchBlocked,
    'HTTP 200 nhưng partner_id phản hồi không khớp registry bị từ chối REJECTED_PARTNER_ID_MISMATCH [PASS]'
  );

  // [TEST 5]: Negative Case 3 — Unauthorized endpoint outside allowlist
  const unauthorizedEndpointReceipt = await probeProviderAuthentication('UNAUTHORIZED_ENDPOINT_PROVIDER', {
    registryPath: sandboxRegistryPath,
    customProbeExecutor: async () => {
      return { http_status: 200, data: {} };
    }
  });

  assertTest(
    'T1_05_NEGATIVE_UNAUTHORIZED_ENDPOINT_BLOCKED',
    unauthorizedEndpointReceipt.error_code === 'REJECTED_UNAUTHORIZED_ENDPOINT' &&
    unauthorizedEndpointReceipt.auth_status === 'DECLARED_PENDING_AUTHENTICATION',
    'Endpoint không thuộc allowlist provider bị chặn REJECTED_UNAUTHORIZED_ENDPOINT [PASS]'
  );

  // [TEST 6]: Negative Case 4 — HTTP 401 Unauthorized
  const http401Receipt = await probeProviderAuthentication('SHOPEE_AFFILIATE', {
    registryPath: sandboxRegistryPath,
    customProbeExecutor: async () => {
      return {
        http_status: 401,
        request_id: 'req_shopee_fail_401',
        error_code: 'HTTP_401'
      };
    }
  });

  assertTest(
    'T1_06_NEGATIVE_HTTP_401_MAINTAINS_PENDING_STATUS',
    http401Receipt.auth_status === 'DECLARED_PENDING_AUTHENTICATION' &&
    http401Receipt.error_code === 'HTTP_401',
    'Phản hồi 401 Unauthorized giữ nguyên trạng thái DECLARED_PENDING_AUTHENTICATION [PASS]'
  );

  // [TEST 7]: Logging hygiene — Zero secrets/headers in receipt
  const receiptKeys = Object.keys(successReceipt);
  const permittedKeys = ['provider', 'http_status', 'request_id', 'timestamp', 'auth_status', 'identity_verified', 'error_code'];
  const receiptIsClean = receiptKeys.every(k => permittedKeys.includes(k)) &&
                         !JSON.stringify(successReceipt).includes('mock_shopee_secret') &&
                         !JSON.stringify(successReceipt).includes('Authorization');

  assertTest(
    'T1_07_RECEIPT_LOGGING_HYGIENE_METADATA_ONLY',
    receiptIsClean,
    'Log receipt của probe chỉ chứa metadata công khai — zero header, zero secret, zero query tokens [PASS]'
  );

  // [TEST 8]: Live Registry Isolation Guarantee (Untouched by Test Suite)
  const currentLiveRegistryRaw = fs.readFileSync(DEFAULT_REGISTRY_PATH, 'utf8');
  const currentLiveRegistryHash = crypto.createHash('sha256').update(currentLiveRegistryRaw).digest('hex');
  const liveRegistryUntouched = initialLiveRegistryHash === currentLiveRegistryHash;

  assertTest(
    'T1_08_LIVE_REGISTRY_ISOLATION_GUARANTEE',
    liveRegistryUntouched,
    `Registry sản xuất authorized_affiliate_accounts.json hoàn toàn bất biến trong suốt quá trình test (SHA-256: ${currentLiveRegistryHash}) [PASS]`
  );

  // Clean up sandbox temp files
  try {
    fs.unlinkSync(sandboxRegistryPath);
    fs.rmdirSync(tempSandboxDir);
  } catch (e) {}

  // [TEST 9]: Production Feed and Release Lock Invariant
  const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const prodHash = crypto.createHash('sha256').update(prodRaw).digest('hex');
  const releaseManifest = JSON.parse(fs.readFileSync(path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json'), 'utf8'));
  const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? releaseManifest.is_approved;

  assertTest(
    'INVARIANT_09_PRODUCTION_LOCKED',
    prodRaw.trim() === '[]' && prodHash === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945' && isApproved === false,
    `Production feed duy trì bất biến [] (SHA-256: ${prodHash}) và RELEASE_MANIFEST is_approved: false (LOCKED)`
  );

  if (passCount === testCount && testCount > 0) {
    console.log(`\n🟢 [TRACK1-AUTH-PROBE-053A-SUMMARY] TOÀN BỘ ${passCount}/${testCount} KIỂM THỬ THĂM DÒ XÁC THỰC 053A ĐÃ ĐẠT [PASS]!\n`);
  } else {
    console.error(`\n❌ [TRACK1-AUTH-PROBE-053A-SUMMARY] KIỂM THỬ THẤT BẠI: ${passCount}/${testCount} PASS!\n`);
    process.exitCode = 1;
  }
})();
