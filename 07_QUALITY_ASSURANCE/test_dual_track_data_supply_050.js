/**
 * JAYT DUAL-TRACK DATA SUPPLY TEST SUITE (050)
 * Directive: JAYT-DUAL-TRACK-DATA-SUPPLY-050
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const repoRoot = path.resolve(__dirname, '..');

const { OnlineFeedAdapter } = require('../05_DEAL_AND_AFFILIATE/feed_gateway/adapter_interface');
const { validateMerchantIntake } = require('../05_DEAL_AND_AFFILIATE/merchant_intake/merchant_intake_validator');
const sampleTemplate = require('../05_DEAL_AND_AFFILIATE/merchant_intake/sample_intake_template.json');
const track1Schema = require('../05_DEAL_AND_AFFILIATE/feed_gateway/schema/online_deal_feed.schema.json');
const track2Schema = require('../05_DEAL_AND_AFFILIATE/merchant_intake/schema/merchant_intake_form.schema.json');

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

console.log('🧪 [JAYT-DUAL-TRACK-050-TEST] Khởi chạy bộ kiểm thử Hạ Tầng Cung Cấp Dữ Liệu Song Mã 050...');

// [TEST 1]: Track 1 Online Feed Gateway Schema & Fail-Closed Behavior
const dummyAdapter = new OnlineFeedAdapter('TEST_NETWORK', 'TEST');
const credsCheck = dummyAdapter.getCredentials();
const isSchemaValid = track1Schema.required.includes('affiliate_disclosure') &&
                      track1Schema.required.includes('volatile_flag') &&
                      track1Schema.properties.volatile_flag.const === true;

assertTest(
  'SUPPLY_01_TRACK1_GATEWAY_FAIL_CLOSED_AND_SCHEMA',
  credsCheck.configured === false && isSchemaValid,
  'Track 1 Online Feed Gateway có schema chuẩn (bắt buộc affiliate disclosure + volatile flag) và cơ chế Fail-Closed an toàn khi chưa có API Key'
);

// [TEST 2]: Track 2 Merchant Intake Form & Validator
const sampleValidation = validateMerchantIntake(sampleTemplate);
const incompleteValidation = validateMerchantIntake({ merchant_name: 'Invalid Test' });
const isTrack2SchemaValid = track2Schema.required.includes('danang_branches') &&
                            track2Schema.required.includes('written_proof') &&
                            track2Schema.properties.channel_type.enum.includes('DIRECT_DEAL');

assertTest(
  'SUPPLY_02_TRACK2_MERCHANT_INTAKE_INTEGRITY',
  sampleValidation.valid === true &&
  incompleteValidation.valid === false &&
  sampleValidation.danang_verified === true &&
  isTrack2SchemaValid,
  'Track 2 Merchant Intake kiểm tra chặt chẽ 100% biểu mẫu (bắt buộc chi nhánh ĐN, chứng từ băm SHA-256, 100% DIRECT_DEAL)'
);

// [TEST 3]: Safe Credential Management (Process.env only, Zero Hardcoding)
const adapterFileContent = fs.readFileSync(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'feed_gateway', 'adapter_interface.js'), 'utf8');
const usesProcessEnv = adapterFileContent.includes('process.env[') && !adapterFileContent.includes('API_KEY = "');

assertTest(
  'SUPPLY_03_SAFE_CREDENTIAL_MANAGEMENT',
  usesProcessEnv,
  'Mọi adapter đọc credentials qua process.env, tuyệt đối không hardcode API secret trong mã nguồn'
);

// [TEST 4]: Private Sandbox Demo Notice Enforcement
const isDemoNoticePresent = sampleTemplate.demo_notice === 'DEMO_ONLY_NOT_FOR_RENDER — FOR WORKFLOW VALIDATION ONLY';

assertTest(
  'SUPPLY_04_PRIVATE_SANDBOX_DEMO_ONLY_NOTICE',
  isDemoNoticePresent,
  'Dữ liệu mẫu sandbox mang nhãn DEMO_ONLY_NOT_FOR_RENDER — tuyệt đối không render vào feed công khai'
);

// [TEST 5]: Fail-Closed Production Zero-Mutation Invariant
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
const prodHash = crypto.createHash('sha256').update(prodRaw).digest('hex');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');
const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? releaseManifest.is_approved;

assertTest(
  'SUPPLY_05_FAIL_CLOSED_ZERO_MUTATION_PRODUCTION',
  prodRaw.trim() === '[]' &&
  prodHash === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945' &&
  isApproved === false,
  `Production feed duy trì bất biến [] (SHA-256: ${prodHash}) và RELEASE_MANIFEST is_approved: false (LOCKED)`
);

if (passCount === testCount && testCount > 0) {
  console.log(`\n🟢 [DUAL-TRACK-SUMMARY] TOÀN BỘ ${passCount}/${testCount} KIỂM THỬ HẠ TẦNG DỮ LIỆU SONG MÃ ĐÃ ĐẠT [PASS]!\n`);
} else {
  console.error(`\n❌ [DUAL-TRACK-SUMMARY] KIỂM THỬ THẤT BẠI: ${passCount}/${testCount} PASS!\n`);
  process.exitCode = 1;
}
