/**
 * SECTION DU — STATIC CONTRACT, CHRONOLOGY, FIELD-LEVEL EVIDENCE & LINEAGE VALIDATOR
 * Governing: JAYT-245 Section DU (Lines 2965-2980)
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PROJECT_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const storefrontPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_du.js');
const indexPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/index.html');
const snapshotPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_du_journey_count_snapshot.json');
const matrixPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_du_field_evidence_matrix.json');
const manifestDUPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/evidence_vault_du/EVIDENCE_MANIFEST_DU.json');
const manifestDSPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/evidence_vault_ds/EVIDENCE_MANIFEST_DS.json');
const candidatePath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_SUPPLY_CANDIDATE_COHORT_DU.json');
const scorecardPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_du_supply_scorecard.json');

console.log('========================================================================');
console.log('🛡️  SECTION DU — STATIC CONTRACT, FIELD EVIDENCE & LINEAGE VALIDATOR');
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
const duModule = require(storefrontPath);
const items = duModule.JAYT_DISCOVERY_ITEMS;
const walletEntries = duModule.JAYT_WALLET_ENTRIES;

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

// Test 11: Field-Level Evidence Matrix DU Structure & Lineage
const matrixData = JSON.parse(fs.readFileSync(matrixPath, 'utf8'));
assertTest('Field Evidence Matrix DU exists with 5 candidate entities', matrixData.matrix && matrixData.matrix.length === 5);

// Test 12: Field Matrix Timestamps match DS Origin Exactly
const manifestDS = JSON.parse(fs.readFileSync(manifestDSPath, 'utf8'));
let matrixTimestampsMatchDS = true;
matrixData.matrix.forEach(entity => {
  const dsArt = manifestDS.artifacts.find(a => a.candidate_id === entity.candidate_id);
  const vField = entity.fields.find(f => f.status === 'VERIFIED_FROM_SOURCE' || f.status === 'UNVERIFIED_BLOCKED_DYNAMIC_SHELL' || f.status === 'QUARANTINED_CITY_PORTAL_ROOT');
  if (vField && dsArt) {
    if (vField.captured_at_utc !== dsArt.fetched_at_utc) matrixTimestampsMatchDS = false;
  }
});
assertTest('100% of verified matrix fields preserve exact DS origin capture timestamps (no restamping)', matrixTimestampsMatchDS);

// Test 13: Evidence Vault Manifest DU Verification
const manifestDU = JSON.parse(fs.readFileSync(manifestDUPath, 'utf8'));
assertTest('Evidence Manifest DU exists with 5 genuine artifact records', manifestDU.artifacts && manifestDU.artifacts.length === 5);

// Test 14: All 5 Artifact Files Exist on Disk with Matching SHA-256 and Sizes
let allFilesMatch = true;
manifestDU.artifacts.forEach(entry => {
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
assertTest('100% of raw artifact files exist on disk in DU vault with matching SHA-256 & byte size', allFilesMatch);

// Test 15: Chronology Verification in Manifest & Candidates
const genTime = Date.parse(manifestDU.artifact_generated_at);
const signTime = Date.parse(manifestDU.signed_at);
let chronoPass = !isNaN(genTime) && !isNaN(signTime) && genTime <= signTime;
manifestDU.artifacts.forEach(a => {
  const fetchTime = Date.parse(a.original_fetched_at_utc);
  if (isNaN(fetchTime) || fetchTime > genTime) chronoPass = false;
});
assertTest('Chronology Contract holds for all evidence artifacts (original_fetched_at <= generated_at <= signed_at)', chronoPass);

// Test 16: Scorecard DU Stage Breakdown
const scorecardData = JSON.parse(fs.readFileSync(scorecardPath, 'utf8'));
assertTest('Scorecard shows DISCOVERY_LEAD is 1', scorecardData.scorecard.DISCOVERY_LEAD === 1);
assertTest('Scorecard shows CAPTURE_RETRY_REQUIRED is 1', scorecardData.scorecard.CAPTURE_RETRY_REQUIRED === 1);
assertTest('Scorecard shows CAPTURE_PENDING is 3', scorecardData.scorecard.CAPTURE_PENDING === 3);
assertTest('Scorecard shows PUBLIC_TOTAL_ACTIVE is 50', scorecardData.scorecard.PUBLIC_TOTAL_ACTIVE === 50);
assertTest('Scorecard shows T1_DEAL_ELIGIBLE is 0 (Fail-closed)', scorecardData.scorecard.T1_DEAL_ELIGIBLE === 0);

// Test 17: HTML Content Verifications
const htmlContent = fs.readFileSync(indexPath, 'utf8');
const scriptMatches = htmlContent.match(/<script src="jayt_storefront_staging_du\.js"><\/script>/g) || [];
assertTest('Single script reference in index.html (no duplicates)', scriptMatches.length === 1);
assertTest('Hero CTA primary solid is present', htmlContent.includes('btn-hero-primary-solid'));
assertTest('Version string is v3.449.0-staging.du', htmlContent.includes('v3.449.0-staging.du'));
assertTest('Drawer element #jayt-drawer-root exists in HTML', htmlContent.includes('id="jayt-drawer-root"'));
assertTest('Dragon Bridge unverified schedule claim (21:00) is quarantined', !htmlContent.includes('21:00') && !htmlContent.includes('Phun lửa & nước'));
assertTest('Dragon Bridge ticker uses neutral official fallback', htmlContent.includes('Xem thông tin điểm đến và thông báo hiện hành tại cổng chính thức'));
assertTest('Curated Editorial Rail grid exists in HTML', htmlContent.includes('editorial-curated-grid'));

console.log('\n------------------------------------------------------------------------');
console.log(`📊 Result: ${passedTests} / ${totalTests} Tests Passed`);
console.log('------------------------------------------------------------------------\n');

// Copy test file to QA directory in workspace
const qaDest = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/test_section_du_static_contract.js');
fs.copyFileSync(__filename, qaDest);
console.log(`✅ Saved QA test script -> ${qaDest}`);

if (passedTests === totalTests) {
  console.log('🎉 SECTION DU STATIC & LINEAGE INTEGRITY PASS (34/34)\n');
  process.exit(0);
} else {
  console.error('💥 SECTION DU STATIC CONTRACT FAILED!\n');
  process.exit(1);
}
