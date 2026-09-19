/**
 * SECTION DY — STATIC CONTRACT, RUNTIME FINGERPRINT & DISJOINT PARTITION VALIDATOR
 * Governing: JAYT-245 Section DY (Lines 3068-3095)
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PROJECT_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const storefrontPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_dy.js');
const indexPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/index.html');
const ledgerPath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_DY.json');
const contractPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_dy_unified_count_contract.json');
const snapshotPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_dy_journey_count_snapshot.json');
const manifestDYPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/evidence_vault_dy/EVIDENCE_MANIFEST_DY.json');
const affiliatePath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_AFFILIATE_RESEARCH_PORTFOLIO_OFFLINE.json');
const scorecardPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_dy_supply_scorecard.json');

console.log('========================================================================');
console.log('🛡️  SECTION DY — STATIC CONTRACT & RUNTIME FINGERPRINT VALIDATOR');
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
const dyModule = require(storefrontPath);
const items = dyModule.JAYT_DISCOVERY_ITEMS;

// Test 1: Total discovery items count
assertTest('Total discovery items equals 50', items.length === 50);

// Test 2: Tier 1 count is strictly 0 (Fail-closed)
const t1Items = items.filter(i => i.tier_level === 'TIER_1_DEAL');
assertTest('Tier 1 Verified Deals count is strictly 0 (Fail-Closed Gate)', t1Items.length === 0);

// Test 3: Mathematical Disjoint Partitioning (Sum = 50, Intersections = 0)
const anGiItems = items.filter(i => i.primary_journey === 'AN_GI');
const diDauItems = items.filter(i => i.primary_journey === 'DI_DAU');
const tienIchItems = items.filter(i => i.primary_journey === 'TIEN_ICH');
const muaSamItems = items.filter(i => i.primary_journey === 'MUA_SAM');

assertTest('AN_GI primary partition count is 11', anGiItems.length === 11);
assertTest('DI_DAU primary partition count is 14', diDauItems.length === 14);
assertTest('TIEN_ICH primary partition count is 13', tienIchItems.length === 13);
assertTest('MUA_SAM primary partition count is 12', muaSamItems.length === 12);

const sumJourneys = anGiItems.length + diDauItems.length + tienIchItems.length + muaSamItems.length;
assertTest('Sum of disjoint primary journey partitions equals 50 (11 + 14 + 13 + 12 = 50)', sumJourneys === 50);

const setAnGi = new Set(anGiItems.map(i => i.item_id));
const setDiDau = new Set(diDauItems.map(i => i.item_id));
const setTienIch = new Set(tienIchItems.map(i => i.item_id));
const setMuaSam = new Set(muaSamItems.map(i => i.item_id));

function setInter(a, b) {
  let c = 0;
  for (let x of b) if (a.has(x)) c++;
  return c;
}
const interSum = setInter(setAnGi, setDiDau) + setInter(setAnGi, setTienIch) + setInter(setAnGi, setMuaSam) + setInter(setDiDau, setTienIch) + setInter(setDiDau, setMuaSam) + setInter(setTienIch, setMuaSam);
assertTest('Zero pairwise intersection among all 4 primary journeys (Sets are completely disjoint)', interSum === 0);

// Test 4: Taxonomy Contract - ZERO F&B items misclassified as TIER_3_UTILITY
const fbUtilityViolations = items.filter(i => i.gateway_group === 'AN_GI' && (i.tier_level === 'TIER_3_UTILITY' || (i.tier_badge && i.tier_badge.includes('TIỆN ÍCH'))));
assertTest('ZERO F&B items misclassified as TIER_3_UTILITY or labeled Tiện ích công cộng', fbUtilityViolations.length === 0);

// Test 5: Asset Quarantine - Phố Ẩm Thực Huỳnh Thúc Kháng has NO mismatched photo
const htk = items.find(i => i.item_id === 'PLACE_PHO_AM_THUC_HUYNH_THUC_KHANG');
assertTest('Huỳnh Thúc Kháng has NO generic dish photo (visual_asset_url === null)', htk && htk.visual_asset_url === null);
assertTest('Huỳnh Thúc Kháng correctly classified as PLACE_CULINARY', htk && htk.content_type === 'PLACE_CULINARY');
assertTest('Huỳnh Thúc Kháng correctly classified as TIER_4_RADAR', htk && htk.tier_level === 'TIER_4_RADAR');

// Test 6: Ledger Fingerprint Verification
const ledgerBuf = fs.readFileSync(ledgerPath);
const actualLedgerSha256 = crypto.createHash('sha256').update(ledgerBuf).digest('hex');
const countContract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
assertTest('Count Contract matches disk ledger SHA-256 fingerprint', countContract.ledger_fingerprint && countContract.ledger_fingerprint.ledger_sha256 === actualLedgerSha256);

// Test 7: Snapshot JSON matches runtime computation
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
assertTest('Snapshot JSON matches AN_GI count (11)', snapshot.data.counts.an_gi === 11);
assertTest('Snapshot JSON matches DI_DAU count (14)', snapshot.data.counts.di_dau === 14);
assertTest('Snapshot JSON matches TIEN_ICH count (13)', snapshot.data.counts.tien_ich === 13);
assertTest('Snapshot JSON matches MUA_SAM count (12)', snapshot.data.counts.mua_sam_hoc_tap === 12);

// Test 8: Scorecard DY vs Evidence Vault DY EXACT Match (7 Canonical Sources)
const manifestDY = JSON.parse(fs.readFileSync(manifestDYPath, 'utf8'));
const scorecardData = JSON.parse(fs.readFileSync(scorecardPath, 'utf8'));
const canonicalInVault = manifestDY.artifacts.filter(a => a.pipeline_stage === 'CANONICAL_SOURCE_FOUND').length;
assertTest('Evidence Vault DY contains exactly 7 CANONICAL_SOURCE_FOUND artifacts', canonicalInVault === 7);
assertTest('Scorecard DY CANONICAL_SOURCE_FOUND equals 7 (100% Reconciled)', scorecardData.scorecard.CANONICAL_SOURCE_FOUND === 7);

// Test 9: All 12 Artifact Files Exist on Disk with Matching SHA-256 and Sizes
let allFilesMatch = true;
manifestDY.artifacts.forEach(entry => {
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
assertTest('100% of raw artifact files exist on disk in DY vault with matching SHA-256 & byte size', allFilesMatch);

// Test 10: Cleansed Offline Affiliate Catalog (ZERO False Provenance)
const affiliateCatalog = JSON.parse(fs.readFileSync(affiliatePath, 'utf8'));
assertTest('Cleansed Affiliate Catalog exists with zero-write security contract', affiliateCatalog.security_contract && affiliateCatalog.security_contract.affiliate_write_enabled === false);
let allAffiliateCleaned = true;
affiliateCatalog.opportunities.forEach(opp => {
  if (opp.status !== 'RESEARCH_LEAD') allAffiliateCleaned = false;
  if (!opp.terms_and_conditions_summary.includes('UNKNOWN_AWAITING_TERMS_CAPTURE')) allAffiliateCleaned = false;
  if (!opp.out_of_pocket_pricing.includes('UNKNOWN_AWAITING_RECEIPT_CAPTURE')) allAffiliateCleaned = false;
});
assertTest('100% of affiliate opportunities are quarantined to RESEARCH_LEAD with UNKNOWN terms', allAffiliateCleaned);

// Test 11: HTML Content & Fingerprint Verifications
const htmlContent = fs.readFileSync(indexPath, 'utf8');
const scriptMatches = htmlContent.match(/<script src="jayt_storefront_staging_dy\.js"><\/script>/g) || [];
assertTest('Single script reference in index.html (no duplicates)', scriptMatches.length === 1);
assertTest('Version string is v3.453.0-staging.dy', htmlContent.includes('v3.453.0-staging.dy'));
assertTest('HTML body contains data-ledger-version="v3.453.0-staging.dy"', htmlContent.includes('data-ledger-version="v3.453.0-staging.dy"'));
assertTest('HTML body contains data-ledger-sha256 fingerprint', htmlContent.includes(`data-ledger-sha256="${actualLedgerSha256}"`));
assertTest('HTML pre-rendered text contains "14 Điểm tham quan & rạp chiếu"', htmlContent.includes('14 Điểm tham quan & rạp chiếu'));
assertTest('HTML pre-rendered text contains "13 Tiện ích công cộng TP. Đà Nẵng"', htmlContent.includes('13 Tiện ích công cộng TP. Đà Nẵng'));
assertTest('ZERO occurrences of legacy "27 Điểm tham quan" in HTML', !htmlContent.includes('27 Điểm tham quan'));
assertTest('Drawer element #jayt-drawer-root exists in HTML', htmlContent.includes('id="jayt-drawer-root"'));
assertTest('Dragon Bridge unverified schedule claim (21:00) is quarantined', !htmlContent.includes('21:00') && !htmlContent.includes('Phun lửa & nước'));

console.log('\n------------------------------------------------------------------------');
console.log(`📊 Result: ${passedTests} / ${totalTests} Tests Passed`);
console.log('------------------------------------------------------------------------\n');

// Copy test file to QA directory in workspace
const qaDest = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/test_section_dy_static_contract.js');
fs.copyFileSync(__filename, qaDest);
console.log(`✅ Saved QA test script -> ${qaDest}`);

if (passedTests === totalTests) {
  console.log('🎉 SECTION DY STATIC & RUNTIME FINGERPRINT INTEGRITY PASS (30/30)\n');
  process.exit(0);
} else {
  console.error('💥 SECTION DY STATIC CONTRACT FAILED!\n');
  process.exit(1);
}
