/**
 * SECTION DH — STATIC CONTRACT & PROVENANCE VALIDATOR
 * Governing: JAYT-245 Section DH (Lines 2646-2666)
 */
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const storefrontPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_dh.js');
const indexPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/index.html');

console.log('========================================================================');
console.log('🛡️  SECTION DH — STATIC CONTRACT & PROVENANCE VALIDATOR');
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
const dhModule = require(storefrontPath);
const items = dhModule.JAYT_DISCOVERY_ITEMS;

// Test 1: Total items count
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

// Test 7: Asset Quarantine - Bảo tàng Đà Nẵng must NOT use Cham Museum photo
const btDaNang = items.find(i => i.item_id === 'PLACE_BAO_TANG_DA_NANG');
assertTest('Bảo tàng Đà Nẵng has NO mismatched Cham Museum photo (visual_asset_url === null)', btDaNang && btDaNang.visual_asset_url === null);

// Test 8: Asset Matching - Bảo tàng Chăm has Cham Museum photo
const btCham = items.find(i => i.item_id === 'PLACE_BAO_TANG_CHAM');
assertTest('Bảo tàng Điêu khắc Chăm correctly has Cham Museum photo', btCham && btCham.visual_asset_url === 'assets/images/danang_real_photo_cham_museum.jpg');

// Test 9: Asset Matching - Phố Huỳnh Thúc Kháng has Mì Quảng photo
const htk = items.find(i => i.item_id === 'PLACE_PHO_AM_THUC_HUYNH_THUC_KHANG');
assertTest('Phố Huỳnh Thúc Kháng correctly has Mì Quảng photo', htk && htk.visual_asset_url === 'assets/images/danang_real_photo_mi_quang.jpg');

// Test 10: Asset Matching - DanaBus has Han River Bridge photo
const danabus = items.find(i => i.item_id === 'FACILITY_DANABUS');
assertTest('DanaBus correctly has Cầu Sông Hàn photo', danabus && danabus.visual_asset_url === 'assets/images/danang_real_photo_han_river_bridge.jpg');

// Test 11: Asset Matching - Thư viện KHTH has Bạch Đằng photo
const lib = items.find(i => i.item_id === 'FACILITY_THU_VIEN_TONG_HOP');
assertTest('Thư viện KHTH correctly has Bạch Đằng photo', lib && lib.visual_asset_url === 'assets/images/danang_real_photo_bach_dang.jpg');

// Test 12: HTML only references jayt_storefront_staging_dh.js once
const htmlContent = fs.readFileSync(indexPath, 'utf8');
const scriptMatches = htmlContent.match(/<script src="jayt_storefront_staging_dh\.js"><\/script>/g) || [];
assertTest('Single script reference in index.html (no duplicates)', scriptMatches.length === 1);

// Test 13: Hero CTA in HTML reflects fail-closed state
assertTest('Hero CTA reflects "Xem ưu đãi & cổng đang kiểm"', htmlContent.includes('🏛️ Xem ưu đãi & cổng đang kiểm &rarr;'));

// Test 14: Version string in HTML
assertTest('Version string is v3.437.0-staging.dh', htmlContent.includes('v3.437.0-staging.dh'));

console.log('\n------------------------------------------------------------------------');
console.log(`📊 Result: ${passedTests} / ${totalTests} Tests Passed`);
console.log('------------------------------------------------------------------------\n');

// Copy test file to QA directory in workspace
const qaDest = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/test_section_dh_static_contract.js');
fs.copyFileSync(__filename, qaDest);
console.log(`✅ Saved QA test script -> ${qaDest}`);

if (passedTests === totalTests) {
  console.log('🎉 SECTION DH STATIC CONTRACT INTEGRITY PASS (14/14)\n');
  process.exit(0);
} else {
  console.error('💥 SECTION DH STATIC CONTRACT FAILED!\n');
  process.exit(1);
}
