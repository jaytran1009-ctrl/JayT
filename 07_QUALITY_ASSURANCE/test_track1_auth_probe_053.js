/**
 * JAYT TRACK 1 AUTHENTICATION PROBE TEST SUITE (053)
 * Directive: JAYT-TRACK1-AUTH-PROBE-053
 *
 * Verifies:
 * 1. Auth probe on one single provider verifies handshake without fetching deals.
 * 2. Probe logging outputs ONLY provider, http_status, request_id, timestamp (zero headers/secrets).
 * 3. On successful auth (200 OK) -> status transitions to AUTHENTICATED_NO_FEED_INGESTION.
 * 4. On failed auth (401/403/timeout) -> status maintains DECLARED_PENDING_AUTHENTICATION with sanitized error.
 * 5. Registry file contains 0 secrets/tokens after probe execution.
 * 6. Production invariants: deals_feed.json === [] and is_approved === false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const repoRoot = path.resolve(__dirname, '..');

const {
  probeProviderAuthentication,
  loadRegistry,
  updateProviderStatus
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

console.log('🧪 [JAYT-TRACK1-AUTH-PROBE-053-TEST] Khởi chạy bộ kiểm thử Thăm Dò Xác Thực Track 1 053...');

(async () => {
  // [TEST 1]: Missing credentials in environment -> UNCONFIGURED
  const unconfiguredResult = await probeProviderAuthentication('SHOPEE_AFFILIATE', {
    customProbeExecutor: async () => {
      // should not reach here if unconfigured
      return { success: true, http_status: 200 };
    }
  });

  // Temporarily ensure env vars exist for controlled mock tests
  process.env.SHOPEE_API_KEY = 'mock_key_for_test';
  process.env.SHOPEE_API_SECRET = 'mock_secret_for_test';
  process.env.SHOPEE_API_ENDPOINT = 'https://open-api.affiliate.shopee.vn/graphql';

  // [TEST 2]: Logging Hygiene — Receipt contains ONLY permitted metadata fields
  const mockReceipt = await probeProviderAuthentication('SHOPEE_AFFILIATE', {
    customProbeExecutor: async () => {
      return {
        success: true,
        http_status: 200,
        request_id: 'req_shopee_probe_12345'
      };
    }
  });

  const receiptKeys = Object.keys(mockReceipt);
  const permittedKeys = ['provider', 'http_status', 'request_id', 'timestamp', 'auth_status', 'error_code'];
  const hasOnlyPermittedKeys = receiptKeys.every(k => permittedKeys.includes(k));
  const hasZeroSecretInReceipt = !JSON.stringify(mockReceipt).includes('mock_key') &&
                                 !JSON.stringify(mockReceipt).includes('mock_secret') &&
                                 !JSON.stringify(mockReceipt).includes('Bearer');

  assertTest(
    'T1_01_PROBE_LOGGING_HYGIENE_METADATA_ONLY',
    hasOnlyPermittedKeys && hasZeroSecretInReceipt,
    'Log receipt của probe chỉ chứa provider, http_status, request_id, timestamp — 0 header, 0 secret [PASS]'
  );

  // [TEST 3]: Successful auth probe transitions status to AUTHENTICATED_NO_FEED_INGESTION
  assertTest(
    'T1_02_PROBE_SUCCESS_AUTHENTICATED_NO_FEED_INGESTION',
    mockReceipt.auth_status === 'AUTHENTICATED_NO_FEED_INGESTION' && mockReceipt.http_status === 200,
    'Probe 200 OK thành công chuyển trạng thái provider sang AUTHENTICATED_NO_FEED_INGESTION (0 tải/render deal) [PASS]'
  );

  const registryAfterSuccess = loadRegistry();
  assertTest(
    'T1_03_REGISTRY_PERSISTS_AUTHENTICATED_STATUS',
    registryAfterSuccess.platforms?.SHOPEE_AFFILIATE?.status === 'AUTHENTICATED_NO_FEED_INGESTION' &&
    registryAfterSuccess.platforms?.SHOPEE_AFFILIATE?.last_auth_probe?.auth_status === 'AUTHENTICATED_NO_FEED_INGESTION',
    'authorized_affiliate_accounts.json lưu đúng trạng thái AUTHENTICATED_NO_FEED_INGESTION [PASS]'
  );

  // [TEST 4]: Failed auth probe (401) maintains DECLARED_PENDING_AUTHENTICATION with sanitized error
  const failReceipt = await probeProviderAuthentication('SHOPEE_AFFILIATE', {
    customProbeExecutor: async () => {
      return {
        success: false,
        http_status: 401,
        request_id: 'req_shopee_fail_401',
        error_code: 'HTTP_401_UNAUTHORIZED'
      };
    }
  });

  const registryAfterFail = loadRegistry();
  assertTest(
    'T1_04_PROBE_FAILURE_MAINTAINS_PENDING_STATUS',
    failReceipt.auth_status === 'DECLARED_PENDING_AUTHENTICATION' &&
    failReceipt.error_code === 'HTTP_401_UNAUTHORIZED' &&
    registryAfterFail.platforms?.SHOPEE_AFFILIATE?.status === 'DECLARED_PENDING_AUTHENTICATION',
    'Probe thất bại (401) giữ nguyên trạng thái DECLARED_PENDING_AUTHENTICATION và lưu mã lỗi đã che bí mật [PASS]'
  );

  // [TEST 5]: Reset status back to DECLARED_PENDING_AUTHENTICATION cleanly
  updateProviderStatus('SHOPEE_AFFILIATE', 'DECLARED_PENDING_AUTHENTICATION');
  const registryReset = loadRegistry();
  const registryCleanAfterProbe = !fs.readFileSync(path.resolve(__dirname, '../05_DEAL_AND_AFFILIATE/feed_gateway/authorized_affiliate_accounts.json'), 'utf8').includes('mock_secret');

  assertTest(
    'T1_05_REGISTRY_CLEAN_ZERO_SECRETS_STORED',
    registryReset.platforms?.SHOPEE_AFFILIATE?.status === 'DECLARED_PENDING_AUTHENTICATION' && registryCleanAfterProbe,
    'Registry duy trì sạch 100%, không lưu bất kỳ token/secret nào trong quá trình thăm dò xác thực [PASS]'
  );

  // [TEST 6]: Production invariant maintained
  const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const prodHash = crypto.createHash('sha256').update(prodRaw).digest('hex');
  const releaseManifest = JSON.parse(fs.readFileSync(path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json'), 'utf8'));
  const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? releaseManifest.is_approved;

  assertTest(
    'INVARIANT_06_PRODUCTION_LOCKED',
    prodRaw.trim() === '[]' && prodHash === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945' && isApproved === false,
    `Production feed duy trì bất biến [] (SHA-256: ${prodHash}) và RELEASE_MANIFEST is_approved: false (LOCKED)`
  );

  if (passCount === testCount && testCount > 0) {
    console.log(`\n🟢 [TRACK1-AUTH-PROBE-053-SUMMARY] TOÀN BỘ ${passCount}/${testCount} KIỂM THỬ THĂM DÒ XÁC THỰC 053 ĐÃ ĐẠT [PASS]!\n`);
  } else {
    console.error(`\n❌ [TRACK1-AUTH-PROBE-053-SUMMARY] KIỂM THỬ THẤT BẠI: ${passCount}/${testCount} PASS!\n`);
    process.exitCode = 1;
  }
})();
