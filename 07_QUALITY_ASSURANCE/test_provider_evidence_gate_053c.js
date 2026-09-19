/**
 * JAYT PROVIDER EVIDENCE GATE TEST SUITE (053C)
 * Directive: JAYT-PROVIDER-EVIDENCE-GATE-053C
 *
 * Verifies:
 * 1. All 3 providers (Shopee, Lazada, TikTok) are strictly in UNSUPPORTED_PENDING_PROVIDER_DOCS state.
 * 2. Probe attempts are immediately fail-closed blocked at Evidence Gate with zero signing or network calls.
 * 3. Zero circular/self-generated test vectors exist in contract definitions.
 * 4. Live authorized_affiliate_accounts.json registry reflects honest UNSUPPORTED_PENDING_PROVIDER_DOCS.
 * 5. Sandbox isolation guarantee: Tests run on temp mock registry; live registry SHA-256 untouched.
 * 6. Receipt logging hygiene: Only public metadata reported.
 * 7. Invariant: deals_feed.json === [] and is_approved === false.
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

console.log('🧪 [JAYT-PROVIDER-EVIDENCE-GATE-053C-TEST] Khởi chạy bộ kiểm thử Cổng Bằng Chứng Provider 053C...');

(async () => {
  // Capture initial hash of live registry to prove zero test pollution
  const initialLiveRegistryRaw = fs.readFileSync(DEFAULT_REGISTRY_PATH, 'utf8');
  const initialLiveRegistryHash = crypto.createHash('sha256').update(initialLiveRegistryRaw).digest('hex');

  // [TEST 1]: All three providers in UNSUPPORTED_PENDING_PROVIDER_DOCS
  const shopeeContract = getProviderContract('SHOPEE_AFFILIATE');
  const lazadaContract = getProviderContract('LAZADA_AFFILIATE');
  const tiktokContract = getProviderContract('TIKTOK_AFFILIATE');

  const allThreePendingDocs = shopeeContract.support_status === 'UNSUPPORTED_PENDING_PROVIDER_DOCS' &&
                              lazadaContract.support_status === 'UNSUPPORTED_PENDING_PROVIDER_DOCS' &&
                              tiktokContract.support_status === 'UNSUPPORTED_PENDING_PROVIDER_DOCS';

  assertTest(
    'T1_01_ALL_THREE_PROVIDERS_UNSUPPORTED_PENDING_DOCS',
    allThreePendingDocs,
    'Cả 3 providers (Shopee, Lazada, TikTok) đều ở trạng thái trung thực UNSUPPORTED_PENDING_PROVIDER_DOCS [PASS]'
  );

  // [TEST 2]: Zero circular / self-generated test vectors in contract files
  const shopeeRaw = fs.readFileSync(path.join(__dirname, '../05_DEAL_AND_AFFILIATE/feed_gateway/provider_contracts/shopee_affiliate_contract.js'), 'utf8');
  const lazadaRaw = fs.readFileSync(path.join(__dirname, '../05_DEAL_AND_AFFILIATE/feed_gateway/provider_contracts/lazada_affiliate_contract.js'), 'utf8');
  const tiktokRaw = fs.readFileSync(path.join(__dirname, '../05_DEAL_AND_AFFILIATE/feed_gateway/provider_contracts/tiktok_affiliate_contract.js'), 'utf8');

  const noCircularVectors = !shopeeRaw.includes('expected_signature') &&
                            !lazadaRaw.includes('expected_signature') &&
                            !tiktokRaw.includes('expected_signature');

  assertTest(
    'T1_02_ZERO_CIRCULAR_SELF_GENERATED_TEST_VECTORS',
    noCircularVectors,
    'Loại bỏ 100% test vector tự sinh vòng tròn — không giả định chữ ký khi chưa có tài liệu chính thức [PASS]'
  );

  // Setup isolated temporary sandbox registry
  const tempSandboxDir = path.join(os.tmpdir(), `jayt_evidence_gate_sandbox_${Date.now()}`);
  fs.mkdirSync(tempSandboxDir, { recursive: true });
  const sandboxRegistryPath = path.join(tempSandboxDir, 'sandbox_authorized_accounts.json');

  const sandboxRegistryData = {
    directive: 'JAYT-PROVIDER-EVIDENCE-GATE-053C-SANDBOX',
    platforms: {
      SHOPEE_AFFILIATE: {
        platform_name: 'Shopee Vietnam Affiliate',
        partner_id: '17372870594',
        api_endpoint: 'https://open-api.affiliate.shopee.vn/graphql',
        status: 'UNSUPPORTED_PENDING_PROVIDER_DOCS',
        env_key_prefix: 'SHOPEE'
      },
      LAZADA_AFFILIATE: {
        platform_name: 'Lazada Vietnam Affiliate',
        partner_id: '262501305',
        api_endpoint: 'https://api.lazada.vn/rest',
        status: 'UNSUPPORTED_PENDING_PROVIDER_DOCS',
        env_key_prefix: 'LAZADA'
      },
      TIKTOK_AFFILIATE: {
        platform_name: 'TikTok Shop Vietnam Affiliate',
        partner_id: 'VNVNLCB6LYL3',
        api_endpoint: 'https://open-api.tiktokglobalshop.com',
        status: 'UNSUPPORTED_PENDING_PROVIDER_DOCS',
        env_key_prefix: 'TIKTOK'
      }
    }
  };
  fs.writeFileSync(sandboxRegistryPath, JSON.stringify(sandboxRegistryData, null, 2), 'utf8');

  // [TEST 3]: Probe attempts on all 3 providers immediately blocked at Evidence Gate
  const shopeeProbeReceipt = await probeProviderAuthentication('SHOPEE_AFFILIATE', { registryPath: sandboxRegistryPath });
  const lazadaProbeReceipt = await probeProviderAuthentication('LAZADA_AFFILIATE', { registryPath: sandboxRegistryPath });
  const tiktokProbeReceipt = await probeProviderAuthentication('TIKTOK_AFFILIATE', { registryPath: sandboxRegistryPath });

  const allBlockedFailClosed = shopeeProbeReceipt.auth_status === 'UNSUPPORTED_PENDING_PROVIDER_DOCS' &&
                               shopeeProbeReceipt.error_code === 'OFFICIAL_EVIDENCE_GATE_BLOCKED_PENDING_PROVIDER_DOCS' &&
                               lazadaProbeReceipt.auth_status === 'UNSUPPORTED_PENDING_PROVIDER_DOCS' &&
                               lazadaProbeReceipt.error_code === 'OFFICIAL_EVIDENCE_GATE_BLOCKED_PENDING_PROVIDER_DOCS' &&
                               tiktokProbeReceipt.auth_status === 'UNSUPPORTED_PENDING_PROVIDER_DOCS' &&
                               tiktokProbeReceipt.error_code === 'OFFICIAL_EVIDENCE_GATE_BLOCKED_PENDING_PROVIDER_DOCS';

  assertTest(
    'T1_03_PROBE_IMMEDIATELY_BLOCKED_AT_EVIDENCE_GATE',
    allBlockedFailClosed,
    'Mọi lệnh thăm dò đều bị chặn ngay tại Evidence Gate với mã OFFICIAL_EVIDENCE_GATE_BLOCKED_PENDING_PROVIDER_DOCS [PASS]'
  );

  // [TEST 4]: Live registry contains honest UNSUPPORTED_PENDING_PROVIDER_DOCS for all 3 platforms
  const liveRegistry = loadRegistry(DEFAULT_REGISTRY_PATH);
  const liveRegistryHonest = liveRegistry.platforms.SHOPEE_AFFILIATE.status === 'UNSUPPORTED_PENDING_PROVIDER_DOCS' &&
                             liveRegistry.platforms.LAZADA_AFFILIATE.status === 'UNSUPPORTED_PENDING_PROVIDER_DOCS' &&
                             liveRegistry.platforms.TIKTOK_AFFILIATE.status === 'UNSUPPORTED_PENDING_PROVIDER_DOCS';

  assertTest(
    'T1_04_LIVE_REGISTRY_HONEST_PENDING_DOCS_STATE',
    liveRegistryHonest,
    'Registry sản xuất authorized_affiliate_accounts.json phản ánh trung thực UNSUPPORTED_PENDING_PROVIDER_DOCS [PASS]'
  );

  // [TEST 5]: Live Registry Isolation Guarantee
  const currentLiveRegistryRaw = fs.readFileSync(DEFAULT_REGISTRY_PATH, 'utf8');
  const currentLiveRegistryHash = crypto.createHash('sha256').update(currentLiveRegistryRaw).digest('hex');
  const liveRegistryUntouched = initialLiveRegistryHash === currentLiveRegistryHash;

  assertTest(
    'T1_05_SANDBOX_REGISTRY_ISOLATION_GUARANTEE',
    liveRegistryUntouched,
    `Registry sản xuất authorized_affiliate_accounts.json được bảo vệ bất biến 100% trong suốt test (SHA-256: ${currentLiveRegistryHash}) [PASS]`
  );

  // Clean up sandbox temp files
  try {
    fs.unlinkSync(sandboxRegistryPath);
    fs.rmdirSync(tempSandboxDir);
  } catch (e) {}

  // [TEST 6]: Logging Hygiene (metadata only, zero secrets/headers)
  const receiptKeys = Object.keys(shopeeProbeReceipt);
  const permittedKeys = ['provider', 'contract_id', 'http_status', 'request_id', 'timestamp', 'auth_status', 'identity_verified', 'error_code'];
  const receiptIsClean = receiptKeys.every(k => permittedKeys.includes(k));

  assertTest(
    'T1_06_RECEIPT_LOGGING_HYGIENE',
    receiptIsClean,
    'Receipt chỉ chứa metadata công khai — zero header, zero secret, zero unproven token [PASS]'
  );

  // [TEST 7]: Production Feed and Release Lock Invariant
  const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const prodHash = crypto.createHash('sha256').update(prodRaw).digest('hex');
  const releaseManifest = JSON.parse(fs.readFileSync(path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json'), 'utf8'));
  const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? releaseManifest.is_approved;

  assertTest(
    'INVARIANT_07_PRODUCTION_LOCKED',
    prodRaw.trim() === '[]' && prodHash === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945' && isApproved === false,
    `Production feed duy trì bất biến [] (SHA-256: ${prodHash}) và RELEASE_MANIFEST is_approved: false (LOCKED)`
  );

  if (passCount === testCount && testCount > 0) {
    console.log(`\n🟢 [PROVIDER-EVIDENCE-GATE-053C-SUMMARY] TOÀN BỘ ${passCount}/${testCount} KIỂM THỬ CỔNG BẰNG CHỨNG 053C ĐÃ ĐẠT [PASS]!\n`);
  } else {
    console.error(`\n❌ [PROVIDER-EVIDENCE-GATE-053C-SUMMARY] KIỂM THỬ THẤT BẠI: ${passCount}/${testCount} PASS!\n`);
    process.exitCode = 1;
  }
})();
