/**
 * SECTION DM — STATIC CONTRACT & DAILY DISCOVERY VALIDATOR
 * Governing: JAYT-245 Section DM (Lines 2767-2800)
 */
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const storefrontPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_dm.js');
const indexPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/index.html');

console.log('========================================================================');
console.log('🛡️  SECTION DM — STATIC CONTRACT & DAILY DISCOVERY VALIDATOR');
console.log('========================================================================\n');

let passedTests = 0;
let totalTests = 0;

function assertTest(desc, condition) {
  totalTests++;
  if (condition) {
    console.log(`✅ PASS [${totalTests}]: ${desc}`);
    passedTests++;
  } else {
    console.error(`❌ FAIL [${totalTests}]: ${desc}`);
  }
}

// 1. Load JS Module
const dmModule = require(storefrontPath);
const items = dmModule.JAYT_DISCOVERY_ITEMS;
const walletEntries = dmModule.JAYT_WALLET_ENTRIES;

// Test 1: Total discovery items count
assertTest('Total discovery items equals 50', items.length === 50);

// Test 2: Tier 1 count is strictly 0 (Fail-closed)
const t1Items = items.filter(i => i.tier_level === 'TIER_1_DEAL');
assertTest('Tier 1 Verified Deals count is strictly 0 (Fail-Closed Gate)', t1Items.length === 0);

// Test 3: Tier 2 Official Programmes count
const t2Items = items.filter(i => i.tier_level === 'TIER_2_PROGRAMME');
assertTest('Tier 2 Official Programmes count is 20', t2Items.length === 20);

// Test 4: Tier 3 Utilities count
const t3Items = items.filter(i => i.tier_level === 'TIER_3_UTILITY');
assertTest('Tier 3 Verified Utilities count is 18', t3Items.length === 18);

// Test 5: Tier 4 Radars count
const t4Items = items.filter(i => i.tier_level === 'TIER_4_RADAR');
assertTest('Tier 4 Radars count is 12', t4Items.length === 12);

// Test 6: Zero unverified deal claims across all 50 items
const itemsWithPrices = items.filter(i => i.deal_price || i.original_price || i.savings_percent || i.total_payable || i.deal_cond || i.verbatim_quote || i.timing_window || i.conditions_limit);
assertTest('Zero unverified price/quote/condition fields across all 50 items', itemsWithPrices.length === 0);

// Test 7: Wallet total entries = 13
assertTest('Wallet total entries equals 13', walletEntries.length === 13);

// Test 8: Wallet LANE_DUNG_NGAY is 0 (Fail-closed)
const dungNgayEntries = walletEntries.filter(e => e.lane === 'LANE_DUNG_NGAY');
assertTest('Wallet LANE_DUNG_NGAY is strictly 0 (Fail-Closed Mandate)', dungNgayEntries.length === 0);

// Test 9: Wallet official portals count = 10
const officialWalletEntries = walletEntries.filter(e => e.lane === 'LANE_CONG_CHINH_THUC');
assertTest('Wallet LANE_CONG_CHINH_THUC count is 10', officialWalletEntries.length === 10);

// Test 10: Wallet radar count = 3
const radarWalletEntries = walletEntries.filter(e => e.lane === 'LANE_THEO_DOI');
assertTest('Wallet LANE_THEO_DOI count is 3', radarWalletEntries.length === 3);

// Test 11: Zero unverified claims/badges across wallet entries
const walletWithUnverifiedCopy = walletEntries.filter(e => 
  (e.lane_badge && (e.lane_badge.includes('BẰNG CHỨNG HỢP LỆ') || e.lane_badge.includes('DÙNG NGAY'))) ||
  (e.action_button_label && e.action_button_label.includes('đăng ký đặc quyền')) ||
  (e.evidence_status && (e.evidence_status.includes('Cập nhật định kỳ') || e.evidence_status.includes('✓ Nguồn đối soát')))
);
assertTest('Zero unverified claims/badges across all 13 wallet entries', walletWithUnverifiedCopy.length === 0);

// Test 12: Clean Provenance Copy across Discovery Items
const itemsWithClaimInflation = items.filter(i => 
  i.evidence_status && (i.evidence_status.includes('✓ Nguồn đối soát') || i.evidence_status.includes('Cập nhật định kỳ'))
);
assertTest('Clean provenance copy without inflation across all 50 items', itemsWithClaimInflation.length === 0);

// Test 13: Asset Quarantine - Bảo tàng Đà Nẵng must NOT use Cham Museum photo
const btDaNang = items.find(i => i.item_id === 'PLACE_BAO_TANG_DA_NANG');
assertTest('Bảo tàng Đà Nẵng has NO mismatched Cham Museum photo (visual_asset_url === null)', btDaNang && btDaNang.visual_asset_url === null);

// Test 14: Asset Matching - Bảo tàng Chăm has Cham Museum photo
const btCham = items.find(i => i.item_id === 'PLACE_BAO_TANG_CHAM');
assertTest('Bảo tàng Điêu khắc Chăm correctly has Cham Museum photo', btCham && btCham.visual_asset_url === 'assets/images/danang_real_photo_cham_museum.jpg');

// Test 15: HTML only references jayt_storefront_staging_dm.js once
const htmlContent = fs.readFileSync(indexPath, 'utf8');
const scriptMatches = htmlContent.match(/<script src="jayt_storefront_staging_dm\.js"><\/script>/g) || [];
assertTest('Single script reference in index.html (no duplicates)', scriptMatches.length === 1);

// Test 16: Hero CTA Hierarchy in HTML
assertTest('Hero CTA primary solid is present', htmlContent.includes('btn-hero-primary-solid'));
assertTest('Hero CTA secondary outline is present', htmlContent.includes('btn-hero-secondary-outline'));
assertTest('Hero CTA tertiary ghost is present', htmlContent.includes('btn-hero-tertiary-ghost'));

// Test 17: Version string in HTML
assertTest('Version string is v3.441.0-staging.dm', htmlContent.includes('v3.441.0-staging.dm'));

// Test 18: Drawer element exists in HTML
assertTest('Drawer element #jayt-drawer-root exists in HTML', htmlContent.includes('id="jayt-drawer-root"'));

// Test 19: Dragon Bridge Hero photo attribution explicitly states 1200x800px without false 4K claim
assertTest('Dragon bridge photo attribution explicitly states 1200x800px', htmlContent.includes('1200x800px') && !htmlContent.includes('4K Master'));

console.log('\n------------------------------------------------------------------------');
console.log(`📊 Result: ${passedTests} / ${totalTests} Tests Passed`);
console.log('------------------------------------------------------------------------\n');

// Copy test file to QA directory in workspace
const qaDest = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/test_section_dm_static_contract.js');
fs.copyFileSync(__filename, qaDest);
console.log(`✅ Saved QA test script -> ${qaDest}`);

if (passedTests === totalTests) {
  console.log('🎉 SECTION DM STATIC CONTRACT INTEGRITY PASS (19/19)\n');
  process.exit(0);
} else {
  console.error('💥 SECTION DM STATIC CONTRACT FAILED!\n');
  process.exit(1);
}
