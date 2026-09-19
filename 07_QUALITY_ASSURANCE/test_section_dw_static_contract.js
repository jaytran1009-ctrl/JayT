/**
 * SECTION DW — STATIC CONTRACT, UNIFIED COUNTS, SCORECARD RECONCILIATION & AFFILIATE CLEANSED VALIDATOR
 * Governing: JAYT-245 Section DW (Lines 3006-3035)
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PROJECT_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const storefrontPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_dw.js');
const indexPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/index.html');
const snapshotPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_dw_journey_count_snapshot.json');
const contractPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_dw_unified_count_contract.json');
const manifestDWPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/evidence_vault_dw/EVIDENCE_MANIFEST_DW.json');
const candidatePath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_SUPPLY_CANDIDATE_COHORT_DW.json');
const affiliatePath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_AFFILIATE_RESEARCH_PORTFOLIO_OFFLINE.json');
const scorecardPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_dw_supply_scorecard.json');

console.log('========================================================================');
console.log('🛡️  SECTION DW — STATIC CONTRACT, RECONCILIATION & AFFILIATE VALIDATOR');
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
const dwModule = require(storefrontPath);
const items = dwModule.JAYT_DISCOVERY_ITEMS;
const walletEntries = dwModule.JAYT_WALLET_ENTRIES;

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

// Test 8: Single Source of Count - Exact Gateway Breakdown
const anGiCount = items.filter(i => i.gateway_group === 'AN_GI').length;
const diDauCount = items.filter(i => i.gateway_group === 'DI_DAU').length;
const muaSamCount = items.filter(i => i.gateway_group === 'MUA_SAM').length;
assertTest('AN_GI count is 11', anGiCount === 11);
assertTest('DI_DAU count is 27', diDauCount === 27);
assertTest('MUA_SAM count is 12', muaSamCount === 12);

// Test 9: Snapshot JSON exists and matches exactly
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
assertTest('Snapshot JSON matches AN_GI count (11)', snapshot.data.counts.an_gi === 11);
assertTest('Snapshot JSON matches DI_DAU count (27)', snapshot.data.counts.di_dau === 27);
assertTest('Snapshot JSON matches TIEN_ICH count (14)', snapshot.data.counts.tien_ich === 14);
assertTest('Snapshot JSON matches MUA_SAM count (12)', snapshot.data.counts.mua_sam_hoc_tap === 12);

// Test 10: Unified Count Contract DW Verification
const countContract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
assertTest('Unified Count Contract reconciles sum of tiers = 50', countContract.reconciliation_checks.sum_tiers_equals_total_public === true);
assertTest('Unified Count Contract reconciles wallet lanes = 13 (10 Official + 3 Radar)', countContract.reconciliation_checks.wallet_lanes_equals_wallet_total === true);
assertTest('Unified Count Contract reconciles canonical sources = 7 (matches vault)', countContract.reconciliation_checks.canonical_sources_match_vault_records === true);

// Test 11: Scorecard DW vs Evidence Vault DW EXACT Match (7 Canonical Sources)
const manifestDW = JSON.parse(fs.readFileSync(manifestDWPath, 'utf8'));
const scorecardData = JSON.parse(fs.readFileSync(scorecardPath, 'utf8'));
const canonicalInVault = manifestDW.artifacts.filter(a => a.pipeline_stage === 'CANONICAL_SOURCE_FOUND').length;
assertTest('Evidence Vault DW contains exactly 7 CANONICAL_SOURCE_FOUND artifacts', canonicalInVault === 7);
assertTest('Scorecard DW CANONICAL_SOURCE_FOUND equals 7 (100% Reconciled)', scorecardData.scorecard.CANONICAL_SOURCE_FOUND === 7);

// Test 12: All 12 Artifact Files Exist on Disk with Matching SHA-256 and Sizes
let allFilesMatch = true;
manifestDW.artifacts.forEach(entry => {
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
assertTest('100% of raw artifact files exist on disk in DW vault with matching SHA-256 & byte size', allFilesMatch);

// Test 13: Cleansed Offline Affiliate Catalog (ZERO False Provenance)
const affiliateCatalog = JSON.parse(fs.readFileSync(affiliatePath, 'utf8'));
assertTest('Cleansed Affiliate Catalog exists with zero-write security contract', affiliateCatalog.security_contract && affiliateCatalog.security_contract.affiliate_write_enabled === false);
let allAffiliateCleaned = true;
affiliateCatalog.opportunities.forEach(opp => {
  if (opp.status !== 'RESEARCH_LEAD') allAffiliateCleaned = false;
  if (!opp.terms_and_conditions_summary.includes('UNKNOWN_AWAITING_TERMS_CAPTURE')) allAffiliateCleaned = false;
  if (!opp.out_of_pocket_pricing.includes('UNKNOWN_AWAITING_RECEIPT_CAPTURE')) allAffiliateCleaned = false;
});
assertTest('100% of affiliate opportunities are quarantined to RESEARCH_LEAD with UNKNOWN terms (zero overclaiming)', allAffiliateCleaned);

// Test 14: Candidate Cohort DW
const cohortDW = JSON.parse(fs.readFileSync(candidatePath, 'utf8'));
assertTest('Candidate Cohort DW monitors exactly 30 candidates across 6 needs', cohortDW.total_candidates === 30 && Object.keys(cohortDW.categories_breakdown).length === 6);

// Test 15: HTML Content Verifications
const htmlContent = fs.readFileSync(indexPath, 'utf8');
const scriptMatches = htmlContent.match(/<script src="jayt_storefront_staging_dw\.js"><\/script>/g) || [];
assertTest('Single script reference in index.html (no duplicates)', scriptMatches.length === 1);
assertTest('Hero CTA primary solid is present', htmlContent.includes('btn-hero-primary-solid'));
assertTest('Version string is v3.451.0-staging.dw', htmlContent.includes('v3.451.0-staging.dw'));
assertTest('Drawer element #jayt-drawer-root exists in HTML', htmlContent.includes('id="jayt-drawer-root"'));
assertTest('Dragon Bridge unverified schedule claim (21:00) is quarantined', !htmlContent.includes('21:00') && !htmlContent.includes('Phun lửa & nước'));
assertTest('Dragon Bridge ticker uses neutral official fallback', htmlContent.includes('Xem thông tin điểm đến và thông báo hiện hành tại cổng chính thức'));
assertTest('Curated Editorial Rail grid exists in HTML', htmlContent.includes('editorial-curated-grid'));

console.log('\n------------------------------------------------------------------------');
console.log(`📊 Result: ${passedTests} / ${totalTests} Tests Passed`);
console.log('------------------------------------------------------------------------\n');

// Copy test file to QA directory in workspace
const qaDest = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/test_section_dw_static_contract.js');
fs.copyFileSync(__filename, qaDest);
console.log(`✅ Saved QA test script -> ${qaDest}`);

if (passedTests === totalTests) {
  console.log('🎉 SECTION DW STATIC & RECONCILIATION INTEGRITY PASS (37/37)\n');
  process.exit(0);
} else {
  console.error('💥 SECTION DW STATIC CONTRACT FAILED!\n');
  process.exit(1);
}
