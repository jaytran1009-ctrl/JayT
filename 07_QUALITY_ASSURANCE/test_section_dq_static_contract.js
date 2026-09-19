/**
 * SECTION DQ — STATIC CONTRACT, TAXONOMY & CANONICAL SUPPLY VALIDATOR
 * Governing: JAYT-245 Section DQ (Lines 2877-2894)
 */
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const storefrontPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_dq.js');
const indexPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/index.html');
const snapshotPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_dq_journey_count_snapshot.json');
const candidatePath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_SUPPLY_CANDIDATE_COHORT_DQ.json');
const scorecardPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_dq_supply_scorecard.json');

console.log('========================================================================');
console.log('🛡️  SECTION DQ — STATIC CONTRACT, TAXONOMY & CANONICAL SUPPLY VALIDATOR');
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
const dqModule = require(storefrontPath);
const items = dqModule.JAYT_DISCOVERY_ITEMS;
const walletEntries = dqModule.JAYT_WALLET_ENTRIES;

// Test 1: Total discovery items count
assertTest('Total discovery items equals 50', items.length === 50);

// Test 2: Tier 1 count is strictly 0 (Fail-closed)
const t1Items = items.filter(i => i.tier_level === 'TIER_1_DEAL');
assertTest('Tier 1 Verified Deals count is strictly 0 (Fail-Closed Gate)', t1Items.length === 0);

// Test 3: Tier 2 Official Programmes count
const t2Items = items.filter(i => i.tier_level === 'TIER_2_PROGRAMME');
assertTest('Tier 2 Official Programmes count is 20', t2Items.length === 20);

// Test 4: Tier 3 Utilities count (Strict Civic Utilities only)
const t3Items = items.filter(i => i.tier_level === 'TIER_3_UTILITY');
assertTest('Tier 3 Verified Utilities count is 14', t3Items.length === 14);

// Test 5: Tier 4 Radars count
const t4Items = items.filter(i => i.tier_level === 'TIER_4_RADAR');
assertTest('Tier 4 Radars count is 16', t4Items.length === 16);

// Test 6: Taxonomy Contract - ZERO F&B items misclassified as TIER_3_UTILITY
const fbUtilityViolations = items.filter(i => i.gateway_group === 'AN_GI' && (i.tier_level === 'TIER_3_UTILITY' || (i.tier_badge && i.tier_badge.includes('TIỆN ÍCH'))));
assertTest('ZERO F&B items misclassified as TIER_3_UTILITY or labeled Tiện ích công cộng', fbUtilityViolations.length === 0);

// Test 7: Asset Quarantine - Phố Ẩm Thực Huỳnh Thúc Kháng has NO mismatched photo
const htk = items.find(i => i.item_id === 'PLACE_PHO_AM_THUC_HUYNH_THUC_KHANG');
assertTest('Huỳnh Thúc Kháng has NO generic dish photo (visual_asset_url === null)', htk && htk.visual_asset_url === null);
assertTest('Huỳnh Thúc Kháng correctly classified as PLACE_CULINARY', htk && htk.content_type === 'PLACE_CULINARY');
assertTest('Huỳnh Thúc Kháng correctly classified as TIER_4_RADAR', htk && htk.tier_level === 'TIER_4_RADAR');

// Test 8: Asset Matching - Bảo tàng Điêu khắc Chăm
const btCham = items.find(i => i.item_id === 'PLACE_BAO_TANG_CHAM');
assertTest('Bảo tàng Điêu khắc Chăm correctly has Cham Museum photo', btCham && btCham.visual_asset_url === 'assets/images/danang_real_photo_cham_museum.jpg');

// Test 9: Single Source of Count - Exact Gateway Breakdown
const anGiCount = items.filter(i => i.gateway_group === 'AN_GI').length;
const diDauCount = items.filter(i => i.gateway_group === 'DI_DAU').length;
const muaSamCount = items.filter(i => i.gateway_group === 'MUA_SAM').length;
assertTest('AN_GI count is 11', anGiCount === 11);
assertTest('DI_DAU count is 27', diDauCount === 27);
assertTest('MUA_SAM count is 12', muaSamCount === 12);

// Test 10: Snapshot JSON exists and matches exactly
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
assertTest('Snapshot JSON matches AN_GI count (11)', snapshot.data.counts.an_gi === 11);
assertTest('Snapshot JSON matches DI_DAU count (27)', snapshot.data.counts.di_dau === 27);
assertTest('Snapshot JSON matches TIEN_ICH count (14)', snapshot.data.counts.tien_ich === 14);
assertTest('Snapshot JSON matches MUA_SAM count (12)', snapshot.data.counts.mua_sam_hoc_tap === 12);

// Test 11: Candidate Ledger & Canonical Source Gate (Section DQ)
const candidateData = JSON.parse(fs.readFileSync(candidatePath, 'utf8'));
const bunChaCa109 = candidateData.candidates.find(c => c.candidate_id === 'CAND_BUN_CHA_CA_109');
assertTest('Bún Chả Cá 109 isolated to DISCOVERY_LEAD', bunChaCa109 && bunChaCa109.pipeline_stage === 'DISCOVERY_LEAD');
assertTest('Bún Chả Cá 109 canonical_source_url is null (No infer from city portal root)', bunChaCa109 && bunChaCa109.canonical_source_url === null);
assertTest('Bún Chả Cá 109 subject_match_verified is false', bunChaCa109 && bunChaCa109.subject_match_verified === false);

// Test 12: Supply Scorecard Separates Stages Clearly
const scorecardData = JSON.parse(fs.readFileSync(scorecardPath, 'utf8'));
assertTest('Scorecard shows DISCOVERY_LEAD is 1', scorecardData.scorecard.DISCOVERY_LEAD === 1);
assertTest('Scorecard shows CANONICAL_SOURCE_FOUND is 4', scorecardData.scorecard.CANONICAL_SOURCE_FOUND === 4);
assertTest('Scorecard shows PUBLIC_TOTAL_ACTIVE is 50', scorecardData.scorecard.PUBLIC_TOTAL_ACTIVE === 50);
assertTest('Scorecard shows T1_DEAL_ELIGIBLE is 0', scorecardData.scorecard.T1_DEAL_ELIGIBLE === 0);

// Test 13: Zero unverified price/quote/condition fields across all 50 items
const itemsWithPrices = items.filter(i => i.deal_price || i.original_price || i.savings_percent || i.total_payable || i.deal_cond || i.verbatim_quote || i.timing_window || i.conditions_limit);
assertTest('Zero unverified price/quote/condition fields across all 50 items', itemsWithPrices.length === 0);

// Test 14: Wallet total entries = 13
assertTest('Wallet total entries equals 13', walletEntries.length === 13);
assertTest('Wallet LANE_DUNG_NGAY is strictly 0 (Fail-Closed Mandate)', walletEntries.filter(e => e.lane === 'LANE_DUNG_NGAY').length === 0);
assertTest('Wallet LANE_CONG_CHINH_THUC count is 10', walletEntries.filter(e => e.lane === 'LANE_CONG_CHINH_THUC').length === 10);
assertTest('Wallet LANE_THEO_DOI count is 3', walletEntries.filter(e => e.lane === 'LANE_THEO_DOI').length === 3);

// Test 15: HTML Content Verifications
const htmlContent = fs.readFileSync(indexPath, 'utf8');
const scriptMatches = htmlContent.match(/<script src="jayt_storefront_staging_dq\.js"><\/script>/g) || [];
assertTest('Single script reference in index.html (no duplicates)', scriptMatches.length === 1);
assertTest('Hero CTA primary solid is present', htmlContent.includes('btn-hero-primary-solid'));
assertTest('Version string is v3.445.0-staging.dq', htmlContent.includes('v3.445.0-staging.dq'));
assertTest('Drawer element #jayt-drawer-root exists in HTML', htmlContent.includes('id="jayt-drawer-root"'));
assertTest('Dragon Bridge unverified schedule claim (21:00) is quarantined', !htmlContent.includes('21:00') && !htmlContent.includes('Phun lửa & nước'));
assertTest('Dragon Bridge ticker uses neutral official fallback', htmlContent.includes('Xem thông tin điểm đến và thông báo hiện hành tại cổng chính thức'));
assertTest('Curated Editorial Rail grid exists in HTML', htmlContent.includes('editorial-curated-grid'));

console.log('\n------------------------------------------------------------------------');
console.log(`📊 Result: ${passedTests} / ${totalTests} Tests Passed`);
console.log('------------------------------------------------------------------------\n');

// Copy test file to QA directory in workspace
const qaDest = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/test_section_dq_static_contract.js');
fs.copyFileSync(__filename, qaDest);
console.log(`✅ Saved QA test script -> ${qaDest}`);

if (passedTests === totalTests) {
  console.log('🎉 SECTION DQ STATIC CONTRACT INTEGRITY PASS (30/30)\n');
  process.exit(0);
} else {
  console.error('💥 SECTION DQ STATIC CONTRACT FAILED!\n');
  process.exit(1);
}
