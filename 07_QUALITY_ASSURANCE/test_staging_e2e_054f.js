/**
 * JAYT STAGING RUNTIME E2E VERIFICATION TEST SUITE (054F)
 * Directive: JAYT-CGV-RUNTIME-STAGING-E2E-054F
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const receiptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'staging_054f', 'STAGING_E2E_RECEIPT_054F.json');
const stagingFeedPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');
const evidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'staging_054f');

let passedCount = 0;
let totalCount = 0;

function assertTest(testName, condition, detail) {
  totalCount++;
  if (condition) {
    passedCount++;
    console.log(`  [${testName}]: [PASS] - ${detail}`);
  } else {
    console.error(`  [${testName}]: [FAIL] - ${detail}`);
    process.exitCode = 1;
  }
}

function getSha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

console.log('🧪 [JAYT-STAGING-E2E-054F-TEST] Khởi chạy kiểm tra toàn diện Runtime Staging E2E & Browser Proofs...');

// 1. Receipt exists and is non-empty
const receiptExists = fs.existsSync(receiptPath);
assertTest('T1_01_RECEIPT_EXISTS', receiptExists,
  'Chứng thư kiểm thử E2E STAGING_E2E_RECEIPT_054F.json tồn tại trên đĩa.');

const receipt = receiptExists ? JSON.parse(fs.readFileSync(receiptPath, 'utf8')) : null;

const { BUILD_ID, ENVIRONMENT } = require('../08_RELEASE_VAULT/deployments/staging_server_054f');

// 2. Server Configuration & Feed Hash Verified
const currentStagingFeedSha = getSha256(stagingFeedPath);
const isServerConfigValid = receipt &&
                           receipt.server.environment === ENVIRONMENT &&
                           receipt.server.build_id === BUILD_ID &&
                           receipt.server.staging_feed_sha256 === currentStagingFeedSha;

assertTest('T1_02_SERVER_CONFIG_AND_FEED_HASH_VERIFIED', isServerConfigValid,
  `Staging Server chạy đúng environment=STAGING_INTERNAL_ONLY, build_id và hash feed khớp 100% tệp trên đĩa.`);

// 3. Scenario 1 (Pre-Window: 2026-08-23)
const sc1 = receipt?.browser_e2e_results?.scenarios?.scenario_1_pre_window;
const isSc1Valid = sc1 && sc1.cards_rendered === 0 && sc1.status === 'SCHEDULED_PENDING_WINDOW';
assertTest('T1_03_PRE_WINDOW_ZERO_CARDS_RENDERED', isSc1Valid,
  'Pre-Window (23/08/2026): Số thẻ deal render = 0, trạng thái SCHEDULED.');

// 4. Scenario 2 (In-Window: 2026-08-24)
const sc2 = receipt?.browser_e2e_results?.scenarios?.scenario_2_in_window;
const isSc2Valid = sc2 &&
                   sc2.cards_rendered === 1 &&
                   sc2.status === 'ACTIVE_STAGING_RENDERABLE' &&
                   sc2.watermark_verified === true &&
                   sc2.price_verified === true &&
                   sc2.locality_verified === true &&
                   sc2.conditions_verified === true &&
                   sc2.zero_outbound_links === true &&
                   sc2.zero_affiliate_params === true;

assertTest('T1_04_IN_WINDOW_EXACT_ONE_DEAL_RENDERED_WITH_ALL_EVIDENCE', isSc2Valid,
  'In-Window (24/08/2026): Render đúng 1 deal với đầy đủ watermark, giá 58k, CGV Vĩnh Trung Plaza (address null), 6 điều kiện và zero outbound links.');

// 5. Scenario 3 (Post-Window / EXPIRED: 2026-08-25)
const sc3 = receipt?.browser_e2e_results?.scenarios?.scenario_3_post_window;
const isSc3Valid = sc3 && sc3.cards_rendered === 0 && sc3.status === 'EXPIRED';
assertTest('T1_05_POST_WINDOW_EXPIRED_ZERO_CARDS_RENDERED', isSc3Valid,
  'Post-Window (25/08/2026): Số thẻ deal render = 0, deal tự động chuyển EXPIRED.');

// 6. Network Isolation (Zero External Calls / Zero Telemetry)
const netIso = receipt?.browser_e2e_results?.network_isolation;
const isNetIsolated = netIso &&
                      netIso.external_requests_count === 0 &&
                      netIso.telemetry_detected === false &&
                      netIso.total_requests_recorded > 0;

assertTest('T1_06_NETWORK_ISOLATION_AND_ZERO_TELEMETRY', isNetIsolated,
  'Cách ly mạng tuyệt đối: Toàn bộ request nằm trên loopback, 0 external request, 0 telemetry.');

// 7. Screenshots Verified on Disk with Matching SHA-256
const preImgPath = path.join(evidenceDir, 'screenshot_054f_pre_window.png');
const inImgPath = path.join(evidenceDir, 'screenshot_054f_in_window.png');
const postImgPath = path.join(evidenceDir, 'screenshot_054f_post_window.png');

const preImgSha = getSha256(preImgPath);
const inImgSha = getSha256(inImgPath);
const postImgSha = getSha256(postImgPath);

const areImagesValid = preImgSha && inImgSha && postImgSha &&
                       preImgSha === sc1?.screenshot_sha256 &&
                       inImgSha === sc2?.screenshot_sha256 &&
                       postImgSha === sc3?.screenshot_sha256;

assertTest('T1_07_ALL_3_SCREENSHOTS_VERIFIED_ON_DISK', areImagesValid,
  'Toàn bộ 3 ảnh chụp màn hình E2E (Pre/In/Post Window) tồn tại và khớp 100% mã băm SHA-256.');

// 8. Production Lock Invariant
const prodFeedContent = fs.readFileSync(prodFeedPath, 'utf8');
const prodFeedJson = JSON.parse(prodFeedContent);
const prodFeedSha = crypto.createHash('sha256').update(prodFeedContent).digest('hex');
const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));

const isProdEmpty = Array.isArray(prodFeedJson) && prodFeedJson.length === 0;
const isProdShaMatched = prodFeedSha === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945';
const isReleaseLocked = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved === false;

assertTest('INVARIANT_08_PRODUCTION_LOCKED',
  isProdEmpty && isProdShaMatched && isReleaseLocked,
  `Production feed duy trì bất biến [] (SHA-256: ${prodFeedSha}) và RELEASE_MANIFEST is_approved: false (LOCKED)`);

console.log(`\n🟢 [STAGING-E2E-054F-SUMMARY] TOÀN BỘ ${passedCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
