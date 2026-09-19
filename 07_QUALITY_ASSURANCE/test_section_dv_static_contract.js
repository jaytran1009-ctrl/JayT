/**
 * SECTION DV — STATIC CONTRACT, FIELD EVIDENCE, CANDIDATE COHORT & AFFILIATE CATALOG VALIDATOR
 * Governing: JAYT-245 Section DV (Lines 2983-3003)
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PROJECT_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const storefrontPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_dv.js');
const indexPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/index.html');
const snapshotPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_dv_journey_count_snapshot.json');
const matrixPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_dv_field_evidence_matrix.json');
const manifestDVPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/evidence_vault_dv/EVIDENCE_MANIFEST_DV.json');
const candidatePath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_SUPPLY_CANDIDATE_COHORT_DV.json');
const affiliatePath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_AFFILIATE_RESEARCH_PORTFOLIO_OFFLINE.json');
const scorecardPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_dv_supply_scorecard.json');

console.log('========================================================================');
console.log('🛡️  SECTION DV — STATIC CONTRACT, FIELD EVIDENCE & COHORT VALIDATOR');
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
const dvModule = require(storefrontPath);
const items = dvModule.JAYT_DISCOVERY_ITEMS;
const walletEntries = dvModule.JAYT_WALLET_ENTRIES;

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

// Test 11: Field-Level Evidence Matrix DV Structure
const matrixData = JSON.parse(fs.readFileSync(matrixPath, 'utf8'));
assertTest('Field Evidence Matrix DV exists with candidate entities', matrixData.matrix && matrixData.matrix.length >= 4);

// Test 12: Evidence Vault Manifest DV Verification
const manifestDV = JSON.parse(fs.readFileSync(manifestDVPath, 'utf8'));
assertTest('Evidence Manifest DV exists with 12 total artifact records (5 reused baseline + 7 direct live captures)', manifestDV.artifacts && manifestDV.artifacts.length === 12);

// Test 13: All 12 Artifact Files Exist on Disk with Matching SHA-256 and Sizes
let allFilesMatch = true;
manifestDV.artifacts.forEach(entry => {
  const filePath = path.join(PROJECT_ROOT, entry.relative_path);
  if (!fs.existsSync(filePath)) {
    allFilesMatch = false;
    return;
  }
  const fileBuf = fs.readFileSync(filePath);
  const hash = crypto.createHash('sha256').update(fileBuf).digest('hex');
  if (hash !== entry.sha256 || fileBuf.length !== entry.byte_size) {
    allFilesMatch = false;
  }
});
assertTest('100% of raw artifact files exist on disk in DV vault with matching SHA-256 & byte size', allFilesMatch);

// Test 14: Reused Artifacts Retain DS Origin Timestamps
const r16aArt = manifestDV.artifacts.find(a => a.candidate_id === 'CAND_BUS_R16A');
assertTest('Reused artifact CAND_BUS_R16A retains original DS fetch timestamp (2026-08-30T07:08:10.372Z)', r16aArt && r16aArt.original_fetched_at_utc === '2026-08-30T07:08:10.372Z');

// Test 15: Direct Captures Have Live Timestamps and Proper Lineage
const tngoArt = manifestDV.artifacts.find(a => a.candidate_id === 'CAND_TNGO_BIKE');
assertTest('Direct capture CAND_TNGO_BIKE has DIRECT_LIVE_CAPTURE_SECTION_DV lineage', tngoArt && tngoArt.reuse_lineage === 'DIRECT_LIVE_CAPTURE_SECTION_DV');

// Test 16: Candidate Cohort DV (30 Candidates across 6 Needs)
const cohortDV = JSON.parse(fs.readFileSync(candidatePath, 'utf8'));
assertTest('Candidate Cohort DV monitors exactly 30 candidates', cohortDV.total_candidates === 30 && cohortDV.candidates.length === 30);
assertTest('Cohort DV covers all 6 community need categories', Object.keys(cohortDV.categories_breakdown).length === 6);

// Test 17: Offline Read-Only Affiliate Research Catalog Verification
const affiliateCatalog = JSON.parse(fs.readFileSync(affiliatePath, 'utf8'));
assertTest('Offline Affiliate Catalog exists with zero-write security contract', affiliateCatalog.security_contract && affiliateCatalog.security_contract.affiliate_write_enabled === false);
assertTest('Affiliate catalog has 0 tracking params and 0 cookies/tokens stored', affiliateCatalog.security_contract.tracking_params_present === false && affiliateCatalog.security_contract.cookies_or_tokens_stored === false);

// Test 18: Scorecard DV Stage Breakdown
const scorecardData = JSON.parse(fs.readFileSync(scorecardPath, 'utf8'));
assertTest('Scorecard shows DISCOVERY_LEAD is 1', scorecardData.scorecard.DISCOVERY_LEAD === 1);
assertTest('Scorecard shows CAPTURE_RETRY_REQUIRED is 1', scorecardData.scorecard.CAPTURE_RETRY_REQUIRED === 1);
assertTest('Scorecard shows CANONICAL_SOURCE_FOUND is 4', scorecardData.scorecard.CANONICAL_SOURCE_FOUND === 4);
assertTest('Scorecard shows CAPTURE_PENDING is 8', scorecardData.scorecard.CAPTURE_PENDING === 8);
assertTest('Scorecard shows PUBLIC_TOTAL_ACTIVE is 50', scorecardData.scorecard.PUBLIC_TOTAL_ACTIVE === 50);
assertTest('Scorecard shows T1_DEAL_ELIGIBLE is 0 (Fail-closed)', scorecardData.scorecard.T1_DEAL_ELIGIBLE === 0);

// Test 19: HTML Content Verifications
const htmlContent = fs.readFileSync(indexPath, 'utf8');
const scriptMatches = htmlContent.match(/<script src="jayt_storefront_staging_dv\.js"><\/script>/g) || [];
assertTest('Single script reference in index.html (no duplicates)', scriptMatches.length === 1);
assertTest('Hero CTA primary solid is present', htmlContent.includes('btn-hero-primary-solid'));
assertTest('Version string is v3.450.0-staging.dv', htmlContent.includes('v3.450.0-staging.dv'));
assertTest('Drawer element #jayt-drawer-root exists in HTML', htmlContent.includes('id="jayt-drawer-root"'));
assertTest('Dragon Bridge unverified schedule claim (21:00) is quarantined', !htmlContent.includes('21:00') && !htmlContent.includes('Phun lửa & nước'));
assertTest('Dragon Bridge ticker uses neutral official fallback', htmlContent.includes('Xem thông tin điểm đến và thông báo hiện hành tại cổng chính thức'));
assertTest('Curated Editorial Rail grid exists in HTML', htmlContent.includes('editorial-curated-grid'));

console.log('\n------------------------------------------------------------------------');
console.log(`📊 Result: ${passedTests} / ${totalTests} Tests Passed`);
console.log('------------------------------------------------------------------------\n');

// Copy test file to QA directory in workspace
const qaDest = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/test_section_dv_static_contract.js');
fs.copyFileSync(__filename, qaDest);
console.log(`✅ Saved QA test script -> ${qaDest}`);

if (passedTests === totalTests) {
  console.log('🎉 SECTION DV STATIC & COHORT INTEGRITY PASS (37/37)\n');
  process.exit(0);
} else {
  console.error('💥 SECTION DV STATIC CONTRACT FAILED!\n');
  process.exit(1);
}
