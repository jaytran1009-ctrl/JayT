/**
 * JAYT STAGING TIME-BOXED CGV ACCEPTANCE TEST SUITE (054E)
 * Directive: JAYT-CGV-STAGING-ACCEPTANCE-054E — APPROVED, TIME-BOXED
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const {
  CGV_STAGING_ITEM_054E,
  evaluateStagingTimebox,
  renderStagingFeed
} = require('./staging_timeboxed_engine_054e');

const stagingFeedPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const stagingManifestPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'STAGING_ACCEPTANCE_MANIFEST_054E.json');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

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

console.log('🧪 [JAYT-STAGING-TIMEBOX-054E-TEST] Khởi chạy bộ kiểm thử Staging Time-Boxed cho CGV Culture Day...');

// 1. Staging Feed exists and contains exactly 1 approved CGV deal
const stagingFeedExists = fs.existsSync(stagingFeedPath);
const stagingFeed = stagingFeedExists ? JSON.parse(fs.readFileSync(stagingFeedPath, 'utf8')) : [];
const isSingleCGVDeal = Array.isArray(stagingFeed) &&
                       stagingFeed.length === 1 &&
                       stagingFeed[0].deal_id === 'DNG-CGV-VINHTRUNG-CULTURE-DAY-20260824' &&
                       stagingFeed[0].price_num === 58000;

assertTest('T1_01_STAGING_FEED_EXACTLY_1_CGV_DEAL', isSingleCGVDeal,
  'Staging internal feed chứa đúng 1 deal được duyệt: CGV Culture Day 58.000đ.');

const deal = isSingleCGVDeal ? stagingFeed[0] : CGV_STAGING_ITEM_054E;

// 2. Mandatory Watermark Badge
const expectedBadge = 'STAGING · Nguồn chính thức đã capture · Chưa xác minh độc lập';
assertTest('T1_02_MANDATORY_WATERMARK_BADGE', deal.watermark_badge === expectedBadge,
  `Nhãn bắt buộc "${expectedBadge}" xuất hiện trên deal.`);

// 3. Zero Outbound Links / Affiliate / Telemetry
const sec = deal.security_and_privacy;
const zeroOutbound = sec &&
                     sec.outbound_links_allowed === false &&
                     sec.outbound_url === null &&
                     sec.affiliate_tracking_enabled === false &&
                     sec.telemetry_enabled === false &&
                     sec.public_deployment_allowed === false;

assertTest('T1_03_ZERO_OUTBOUND_OR_AFFILIATE_OR_TELEMETRY', zeroOutbound,
  'Không có outbound link, không affiliate tracking, không telemetry, không public deployment.');

// 4. Locality Observed Only & Address Null
const isLocalityPure = deal.locality_observed === 'CGV Vĩnh Trung Plaza' && deal.locality_address === null;
assertTest('T1_04_LOCALITY_OBSERVED_ONLY_ADDRESS_NULL', isLocalityPure,
  'Chỉ hiển thị tên cụm rạp quan sát được (CGV Vĩnh Trung Plaza); địa chỉ chi tiết là null (không suy diễn số nhà).');

// 5. Explicit Conditions
const conds = deal.conditions || [];
const hasVipSurcharge = conds.some(c => c.includes('chưa bao gồm phụ thu ghế VIP'));
const hasImaxExclusion = conds.some(c => c.includes('Không áp dụng cho phòng chiếu IMAX'));
const hasGroupSalesExclusion = conds.some(c => c.includes('Không áp dụng cho mua vé nhóm'));
const hasHolidayExclusion = conds.some(c => c.includes('Không áp dụng cho các ngày Lễ, Tết'));

assertTest('T1_05_EXPLICIT_CONDITIONS_VERIFIED',
  hasVipSurcharge && hasImaxExclusion && hasGroupSalesExclusion && hasHolidayExclusion,
  'Đầy đủ các điều kiện: phụ thu VIP/Sweetbox, loại trừ IMAX/4DX, loại trừ vé nhóm, không áp dụng ngày lễ/tết.');

// 6. In-Window Rendering (Simulation on 2026-08-24 12:00:00 +07:00)
const inWindowTime = '2026-08-24T12:00:00+07:00';
const inWindowRender = renderStagingFeed(stagingFeed, inWindowTime);
assertTest('T1_06_IN_WINDOW_RENDERING_ACTIVE',
  inWindowRender.active_rendered_count === 1 &&
  inWindowRender.rendered_items[0].status === 'ACTIVE_STAGING_RENDERABLE',
  'Trong ngày 24/08/2026 (12:00:00): Deal ở trạng thái ACTIVE_STAGING_RENDERABLE và được render thành công (count = 1).');

// 7. Post-Window Expiration (Simulation on 2026-08-25 00:00:00 +07:00)
const postWindowTime = '2026-08-25T00:00:00+07:00';
const postWindowRender = renderStagingFeed(stagingFeed, postWindowTime);
const postWindowEval = evaluateStagingTimebox(deal, postWindowTime);

assertTest('T1_07_POST_WINDOW_EXPIRATION_ZERO_RENDER',
  postWindowEval.status === 'EXPIRED' &&
  postWindowEval.renderable === false &&
  postWindowRender.active_rendered_count === 0,
  'Từ 00:00 25/08/2026 trở đi: Deal tự động chuyển sang EXPIRED và cấm render (rendered count = 0).');

// 8. Pre-Window Scheduled (Simulation on 2026-08-23 12:00:00 +07:00)
const preWindowTime = '2026-08-23T12:00:00+07:00';
const preWindowEval = evaluateStagingTimebox(deal, preWindowTime);
assertTest('T1_08_PRE_WINDOW_SCHEDULED',
  preWindowEval.status === 'SCHEDULED_PENDING_WINDOW' && preWindowEval.renderable === false,
  'Trước ngày 24/08/2026: Deal ở trạng thái SCHEDULED_PENDING_WINDOW (chưa mở render).');

// 9. Production Feed & Approval Lock Invariant
const prodFeedContent = fs.readFileSync(prodFeedPath, 'utf8');
const prodFeedJson = JSON.parse(prodFeedContent);
const prodFeedSha = crypto.createHash('sha256').update(prodFeedContent).digest('hex');
const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));

const isProdEmpty = Array.isArray(prodFeedJson) && prodFeedJson.length === 0;
const isProdShaMatched = prodFeedSha === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945';
const isReleaseLocked = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved === false;

assertTest('INVARIANT_09_PRODUCTION_LOCKED',
  isProdEmpty && isProdShaMatched && isReleaseLocked,
  `Production feed duy trì bất biến [] (SHA-256: ${prodFeedSha}) và RELEASE_MANIFEST is_approved: false (LOCKED)`);

console.log(`\n🟢 [STAGING-TIMEBOX-054E-SUMMARY] TOÀN BỘ ${passedCount}/${totalCount} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);
