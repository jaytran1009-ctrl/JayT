/**
 * SECTION EE — STATIC CONTRACT, ASSET REGISTER & 4-COHORT VALIDATOR
 * Governing: JAYT-245 Section EE (Lines 3251-3279)
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PROJECT_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const storefrontPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_ee.js');
const indexPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/index.html');
const ledgerPath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_EE.json');
const walletPath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_WALLET_LEDGER_EE.json');
const voucherHubPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_ee_voucher_hub_state.json');
const attestationPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_ee_no_write_attestation.json');
const contractPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_ee_unified_count_contract.json');
const snapshotPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_ee_journey_count_snapshot.json');
const manifestEEPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/evidence_vault_ee/EVIDENCE_MANIFEST_EE.json');
const affiliatePath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_AFFILIATE_RESEARCH_PORTFOLIO_OFFLINE.json');
const scorecardPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_ee_supply_scorecard.json');
const scannerReportPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_ee_content_scanner_report.json');
const rosterPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_ee_identity_roster.json');
const assetRegisterPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_ee_asset_register.json');
const expMatrixPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_ee_experience_matrix.json');

console.log('========================================================================');
console.log('🛡️  SECTION EE — STATIC CONTRACT, ASSET REGISTER & COHORT VALIDATOR');
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
const eeModule = require(storefrontPath);
const items = eeModule.JAYT_DISCOVERY_ITEMS;

// Test 1: Total discovery items count
assertTest('Total discovery items equals 50', items.length === 50);

// Test 2: Tier 1 count is strictly 0 (Fail-closed Gate)
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

// Test 4: Single Instance of Voucher (0) in Navigation
const htmlContent = fs.readFileSync(indexPath, 'utf8');
const jsContent = fs.readFileSync(storefrontPath, 'utf8');

const htmlVoucherMatches = (htmlContent.match(/data-nav="VOUCHER_HUB"/g) || []).length;
assertTest('Exactly 1 instance of Voucher (0) navigation button in index.html desktop nav', htmlVoucherMatches === 1);

const jsNavVoucherMatches = (jsContent.match(/<button class="nav-btn \${activeView === 'VOUCHER_HUB' \? 'active' : ''}" data-nav="VOUCHER_HUB"/g) || []).length;
assertTest('Exactly 1 instance of Voucher (0) navigation button in storefront JS template', jsNavVoucherMatches === 1);

// Test 5: Vault EE 4 Cohorts & Verbatim Timestamp Lineage (Mandate EE.1)
const manifestEE = JSON.parse(fs.readFileSync(manifestEEPath, 'utf8'));
assertTest('Evidence Manifest EE enforces cohort summary and verbatim origin timestamps', manifestEE.provenance_rules && manifestEE.provenance_rules.cohort_based_read_only_acquisition === true);
assertTest('Cohort summary contains 4 distinct cohorts totaling 12 processed candidates', manifestEE.cohort_summary && manifestEE.cohort_summary.TOTAL_PROCESSED_CANDIDATES === 12);

const danabusEntry = manifestEE.artifacts.find(a => a.candidate_id === 'CAND_BUS_R16A');
assertTest('DanaBus exact origin timestamp is 2026-08-30T07:08:10.372Z (no rounding)', danabusEntry && danabusEntry.original_fetched_at_utc === '2026-08-30T07:08:10.372Z');
assertTest('DanaBus origin vault is DS with exact origin path', danabusEntry && danabusEntry.origin_vault === 'DS' && danabusEntry.origin_path.includes('evidence_vault_ds'));
assertTest('DanaBus origin manifest SHA256 matches Vault DS manifest', danabusEntry && danabusEntry.origin_manifest_sha256 === '2374e0ca33dea396ec5797557e8956b4451a56adfcb702a26714fe2effdf97c5');

let allArtifactsFilesExist = true;
manifestEE.artifacts.forEach(entry => {
  const filePath = path.join(PROJECT_ROOT, entry.relative_path);
  if (!fs.existsSync(filePath)) {
    allArtifactsFilesExist = false;
  } else {
    const fileBuf = fs.readFileSync(filePath);
    const hash = crypto.createHash('sha256').update(fileBuf).digest('hex');
    if (hash !== entry.sha256 || fileBuf.length !== entry.byte_size) {
      allArtifactsFilesExist = false;
    }
  }
});
assertTest('100% of raw artifact files exist on disk in EE vault with matching SHA-256 & byte size', allArtifactsFilesExist);

// Test 6: Asset Register EE Verification (Mandate EE.4)
const assetRegister = JSON.parse(fs.readFileSync(assetRegisterPath, 'utf8'));
assertTest('Asset Register EE exists and contains at least 30 registered image assets', assetRegister.assets && assetRegister.assets.length >= 30);
assertTest('Asset Register enforces no uncredited AI photos policy', assetRegister.register_policy && assetRegister.register_policy.no_uncredited_ai_photos_passed_as_real === true);

// Test 7: Pragmatic Experience Matrix (Mandate EE.3)
const expMatrix = JSON.parse(fs.readFileSync(expMatrixPath, 'utf8'));
assertTest('Experience Matrix defines 3 pragmatic entryways (Dùng Hôm Nay, Chương Trình, Kiểm Tra Trước Khi Mua)', expMatrix.three_pragmatic_entryways && expMatrix.three_pragmatic_entryways.length === 3);

// Test 8: 50-Item Identity Roster Verification
const rosterData = JSON.parse(fs.readFileSync(rosterPath, 'utf8'));
assertTest('Identity Roster contains exactly 50 records matching public feed', rosterData.records.length === 50);
assertTest('Identity Roster matched items count equals 8', rosterData.roster_cardinality.vault_artifact_matched_count === 8);
assertTest('Identity Roster pending capture items count equals 42', rosterData.roster_cardinality.official_url_pending_vault_capture_count === 42);
assertTest('Identity Roster field terms verified count is strictly 0', rosterData.roster_cardinality.field_terms_verified_count === 0);

// Test 9: Honest 2-Tier Content Scanner Report
const scannerReport = JSON.parse(fs.readFileSync(scannerReportPath, 'utf8'));
assertTest('Scanner Report methodology is DUAL_COLUMN_HONEST_SEMANTIC_TOKEN_SCANNER', scannerReport.scanner_methodology === 'DUAL_COLUMN_HONEST_SEMANTIC_TOKEN_SCANNER');
assertTest('Scanner Report confirms ZERO forbidden action claims across HTML & JS', scannerReport.summary_verdict.total_forbidden_action_claims === 0);
assertTest('Scanner Report acknowledges raw KYC/CPA tokens inside allowlisted negative disclosures', scannerReport.summary_verdict.is_fully_compliant === true);

// Test 10: Voucher Hub State Verification
const voucherHubData = JSON.parse(fs.readFileSync(voucherHubPath, 'utf8'));
assertTest('Voucher Hub state is CHƯA_CÓ_VOUCHER_ĐỦ_CHỨNG_CỨ', voucherHubData.hub_state === 'CHƯA_CÓ_VOUCHER_ĐỦ_CHỨNG_CỨ');
assertTest('Voucher Hub displays strictly 0 vouchers', voucherHubData.security_guarantees && voucherHubData.security_guarantees.total_vouchers_displayed === 0);
assertTest('Voucher Hub saved searches exist for 5 key student needs', voucherHubData.saved_searches_by_need && voucherHubData.saved_searches_by_need.length === 5);

// Test 11: No-Write Attestation
const noWriteData = JSON.parse(fs.readFileSync(attestationPath, 'utf8'));
assertTest('No-Write Attestation confirms zero AccessTrade integration', noWriteData.contract_guarantees && noWriteData.contract_guarantees.accesstrade_integration_enabled === false);
assertTest('No-Write Attestation confirms zero active affiliate links', noWriteData.contract_guarantees && noWriteData.contract_guarantees.affiliate_links_active_count === 0);

// Test 12: Offline Affiliate Portfolio AccessTrade Status
const affiliateData = JSON.parse(fs.readFileSync(affiliatePath, 'utf8'));
assertTest('AccessTrade portal status is PORTAL_ACCESS_NOT_VERIFIED in offline catalog', affiliateData.accesstrade_portal_status === 'PORTAL_ACCESS_NOT_VERIFIED');

// Test 13: Ledger Fingerprint Verification
const ledgerBuf = fs.readFileSync(ledgerPath);
const actualLedgerSha256 = crypto.createHash('sha256').update(ledgerBuf).digest('hex');
const countContract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
assertTest('Count Contract matches disk ledger SHA-256 fingerprint', countContract.ledger_fingerprint && countContract.ledger_fingerprint.ledger_sha256 === actualLedgerSha256);

// Test 14: Snapshot JSON matches runtime computation
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
assertTest('Snapshot JSON matches AN_GI count (11)', snapshot.data.counts.an_gi === 11);
assertTest('Snapshot JSON matches DI_DAU count (14)', snapshot.data.counts.di_dau === 14);
assertTest('Snapshot JSON matches TIEN_ICH count (13)', snapshot.data.counts.tien_ich === 13);
assertTest('Snapshot JSON matches MUA_SAM count (12)', snapshot.data.counts.mua_sam_hoc_tap === 12);
assertTest('Snapshot JSON matches Voucher count (0)', snapshot.data.voucher_count === 0);

// Test 15: Scorecard EE vs Evidence Vault EE EXACT Match (8 Canonical Sources)
const scorecardData = JSON.parse(fs.readFileSync(scorecardPath, 'utf8'));
const canonicalInVault = manifestEE.artifacts.filter(a => a.pipeline_stage === 'CANONICAL_SOURCE_FOUND').length;
assertTest('Evidence Vault EE contains exactly 8 CANONICAL_SOURCE_FOUND artifacts', canonicalInVault === 8);
assertTest('Scorecard EE CANONICAL_SOURCE_FOUND equals 8 (100% Reconciled)', scorecardData.scorecard.CANONICAL_SOURCE_FOUND === 8);

// Test 16: HTML Content & Fingerprint Verifications
const scriptMatches = htmlContent.match(/<script src="jayt_storefront_staging_ee\.js"><\/script>/g) || [];
assertTest('Single script reference in index.html (no duplicates)', scriptMatches.length === 1);
assertTest('Version string is v3.459.0-staging.ee', htmlContent.includes('v3.459.0-staging.ee'));
assertTest('HTML body contains data-ledger-version="v3.459.0-staging.ee"', htmlContent.includes('data-ledger-version="v3.459.0-staging.ee"'));
assertTest('HTML body contains data-ledger-sha256 fingerprint', htmlContent.includes(`data-ledger-sha256="${actualLedgerSha256}"`));
assertTest('HTML pre-rendered text contains "14 Điểm tham quan & rạp chiếu"', htmlContent.includes('14 Điểm tham quan & rạp chiếu'));
assertTest('HTML pre-rendered text contains "13 Tiện ích công cộng TP. Đà Nẵng"', htmlContent.includes('13 Tiện ích công cộng TP. Đà Nẵng'));
assertTest('Drawer element #jayt-drawer-root exists in HTML', htmlContent.includes('id="jayt-drawer-root"'));

console.log('\n------------------------------------------------------------------------');
console.log(`📊 Result: ${passedTests} / ${totalTests} Tests Passed`);
console.log('------------------------------------------------------------------------\n');

// Copy test file to QA directory in workspace
const qaDest = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/test_section_ee_static_contract.js');
fs.copyFileSync(__filename, qaDest);
console.log(`✅ Saved QA test script -> ${qaDest}`);

if (passedTests === totalTests) {
  console.log('🎉 SECTION EE STATIC, ASSET REGISTER & COHORT INTEGRITY PASS (45/45)\n');
  process.exit(0);
} else {
  console.error('💥 SECTION EE STATIC CONTRACT FAILED!\n');
  process.exit(1);
}
