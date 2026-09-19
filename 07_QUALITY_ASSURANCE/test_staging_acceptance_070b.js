/**
 * JAYT STAGING ACCEPTANCE & AUDIT TEST SUITE (070B)
 * Directive: JAYT-070B — BATCH-1 REMEDIATION & STAGING AUTHORIZATION
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const stagingFeedPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const prodStatusPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', 'DEPLOYMENT_STATUS.json');
const batchReceiptPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'CEO_BATCH_DECISION_RECEIPT_070B.json');
const quarantineManifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_070b_starlight_unsupported', 'QUARANTINE_MANIFEST_070B.json');
const cgvOverridePath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'cgv_status_override_070b.json');
const pendingDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review');

function getSha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

let passed = 0;
let failed = 0;

function assertTest(name, condition, message) {
  if (condition) {
    console.log(`  [${name}]: [PASS] - ${message}`);
    passed++;
  } else {
    console.error(`  [${name}]: [FAIL] - ${message}`);
    failed++;
  }
}

console.log('🧪 [JAYT-STAGING-070B-TEST] Bắt đầu kiểm thử nghiệm thu Staging Batch 070B...');

// Test 1: Staging Feed has exactly 3 deals
const stagingFeed = JSON.parse(fs.readFileSync(stagingFeedPath, 'utf8'));
assertTest('STG_01_FEED_HAS_EXACTLY_3_DEALS', stagingFeed.length === 3, `Staging feed có đúng 3 deal (${stagingFeed.length}/3)`);

// Test 2: Deals cover Monday to Thursday
const dealIds = stagingFeed.map(d => d.deal_id);
const hasMon = dealIds.includes('DNG-METIZ-SUPER-MONDAY-2026');
const hasTueGalaxy = dealIds.includes('DNG-GALAXY-HAPPY-DAY-WEEKLY-TUESDAY-061F');
const hasTueThuMetiz = dealIds.includes('DNG-METIZ-U22-2026');
assertTest('STG_02_COVERED_DAYS_MON_THU', hasMon && hasTueGalaxy && hasTueThuMetiz, 'Deals phủ trọn vẹn từ Thứ Hai đến Thứ Năm (4 ngày tuần)');

// Test 3: Channel is transparent AT_COUNTER for Metiz deals
const metizDeals = stagingFeed.filter(d => d.merchant.includes('Metiz'));
const metizAtCounter = metizDeals.every(d => d.purchase_channel === 'AT_COUNTER');
assertTest('STG_03_PURCHASE_CHANNEL_AT_COUNTER', metizAtCounter && metizDeals.length === 2, 'Toàn bộ 2 deal Metiz ghi nhận rõ purchase_channel: AT_COUNTER');

// Test 4: Expiry date enforcement for Metiz deals (2026-12-31)
const validExpiry = metizDeals.every(d => d.expires_at === '2026-12-31T23:59:59+07:00');
assertTest('STG_04_METIZ_ANNUAL_EXPIRY_ENFORCED', validExpiry && metizDeals.length === 2, 'Cả 2 deal Metiz có hạn dùng tường minh đến hết 31/12/2026');

// Test 5: CEO Batch Decision Receipt Integrity
const batchReceipt = JSON.parse(fs.readFileSync(batchReceiptPath, 'utf8'));
const candidate44Sha = getSha256(path.join(repoRoot, batchReceipt.approved_candidates[0].candidate_file));
const candidate45Sha = getSha256(path.join(repoRoot, batchReceipt.approved_candidates[1].candidate_file));
const shaMatch = candidate44Sha === batchReceipt.approved_candidates[0].candidate_sha256 &&
                 candidate45Sha === batchReceipt.approved_candidates[1].candidate_sha256;
assertTest('STG_05_CEO_BATCH_RECEIPT_INTEGRITY', shaMatch, 'Mã băm SHA-256 trong CEO Batch Receipt khớp 100% tệp candidate trên đĩa');

// Test 6: Starlight Candidates Quarantined and Manifested
const quarantineManifest = JSON.parse(fs.readFileSync(quarantineManifestPath, 'utf8'));
const starlightPending46 = fs.existsSync(path.join(pendingDir, 'candidate_46_CAND-DNG-STARLIGHT-U22-2026.json'));
const starlightPending47 = fs.existsSync(path.join(pendingDir, 'candidate_47_CAND-DNG-STARLIGHT-THU3-PHIM-VIET-2026.json'));
assertTest('STG_06_STARLIGHT_QUARANTINE_VERIFIED', !starlightPending46 && !starlightPending47 && quarantineManifest.items.length === 4, 'Starlight candidates đã bị cô lập an toàn sang quarantine vault và xóa khỏi pending');

// Test 7: CGV Status Override Verified
const cgvOverride = JSON.parse(fs.readFileSync(cgvOverridePath, 'utf8'));
assertTest('STG_07_CGV_STATUS_OVERRIDE_VERIFIED', cgvOverride.rendering_rule === 'DO_NOT_RENDER_OUTSIDE_2026_08_24', 'Status override của CGV được ghi nhận: không render ngoài ngày 24/08/2026');

// Test 8: Production Locked
const prodFeed = JSON.parse(fs.readFileSync(prodFeedPath, 'utf8').replace(/^\uFEFF/, ''));
assertTest('STG_08_PRODUCTION_LOCKED', prodFeed.length === 0, `Production tuyệt đối bị khóa: deals_feed.json=[] (${prodFeed.length} records)`);

console.log(`\n======================================================`);
console.log(`🟢 [STAGING-SUMMARY] Kết quả kiểm thử: ${passed}/${passed + failed} PASS!`);
if (failed > 0) {
  process.exit(1);
}
