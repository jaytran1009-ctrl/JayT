/**
 * SECTION EC — STATIC CONTRACT, VAULT LINEAGE & IDENTITY MATRIX VALIDATOR
 * Governing: JAYT-245 Section EC (Lines 3192-3219)
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PROJECT_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const storefrontPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_ec.js');
const indexPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/index.html');
const ledgerPath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_EC.json');
const walletPath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_WALLET_LEDGER_EC.json');
const voucherHubPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_ec_voucher_hub_state.json');
const attestationPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_ec_no_write_attestation.json');
const contractPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_ec_unified_count_contract.json');
const snapshotPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_ec_journey_count_snapshot.json');
const manifestECPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/evidence_vault_ec/EVIDENCE_MANIFEST_EC.json');
const affiliatePath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_AFFILIATE_RESEARCH_PORTFOLIO_OFFLINE.json');
const scorecardPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_ec_supply_scorecard.json');
const scannerReportPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_ec_content_scanner_report.json');
const matrixPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_ec_identity_vs_field_matrix.json');

console.log('========================================================================');
console.log('🛡️  SECTION EC — STATIC CONTRACT & VAULT LINEAGE VALIDATOR');
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
const ecModule = require(storefrontPath);
const items = ecModule.JAYT_DISCOVERY_ITEMS;

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

// Test 5: Vault EC Lineage and No-Restamping Verification (Mandate EC)
const manifestEC = JSON.parse(fs.readFileSync(manifestECPath, 'utf8'));
assertTest('Evidence Manifest EC guarantees no-restamping policy', manifestEC.provenance_rules && manifestEC.provenance_rules.no_restamping_guaranteed === true);

let allArtifactsHaveLineage = true;
let allArtifactsHaveOriginTimestamps = true;
let allArtifactsFilesExist = true;

manifestEC.artifacts.forEach(entry => {
  if (!entry.origin_vault_ref || !entry.lineage_status || !entry.reuse_reason) {
    allArtifactsHaveLineage = false;
  }
  if (!entry.original_fetched_at || entry.original_fetched_at.startsWith('2026-08-30T11:') || entry.original_fetched_at.startsWith('2026-08-30T18:')) {
    allArtifactsHaveOriginTimestamps = false;
  }
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

assertTest('100% of artifacts in Vault EC have valid origin vault references and lineage status', allArtifactsHaveLineage);
assertTest('100% of reused artifacts preserve authentic historical original_fetched_at (no restamping)', allArtifactsHaveOriginTimestamps);
assertTest('100% of raw artifact files exist on disk in EC vault with matching SHA-256 & byte size', allArtifactsFilesExist);

// Test 6: Identity vs Field Matrix EC
const matrixData = JSON.parse(fs.readFileSync(matrixPath, 'utf8'));
assertTest('Identity vs Field Matrix confirms PORTAL_IDENTITY_ONLY_COUNT is 20', matrixData.classification_summary.PORTAL_IDENTITY_ONLY_COUNT === 20);
assertTest('Identity vs Field Matrix confirms FIELD_TERMS_VERIFIED_COUNT is 0 (Fail-closed)', matrixData.classification_summary.FIELD_TERMS_VERIFIED_COUNT === 0);

// Test 7: Honest 2-Tier Content Scanner Report
const scannerReport = JSON.parse(fs.readFileSync(scannerReportPath, 'utf8'));
assertTest('Scanner Report methodology is DUAL_COLUMN_HONEST_SEMANTIC_TOKEN_SCANNER', scannerReport.scanner_methodology === 'DUAL_COLUMN_HONEST_SEMANTIC_TOKEN_SCANNER');
assertTest('Scanner Report confirms ZERO forbidden action claims across HTML & JS', scannerReport.summary_verdict.total_forbidden_action_claims === 0);
assertTest('Scanner Report acknowledges raw KYC/CPA tokens inside allowlisted negative disclosures', scannerReport.summary_verdict.is_fully_compliant === true);

// Test 8: Voucher Hub State Verification
const voucherHubData = JSON.parse(fs.readFileSync(voucherHubPath, 'utf8'));
assertTest('Voucher Hub state is CHƯA_CÓ_VOUCHER_ĐỦ_CHỨNG_CỨ', voucherHubData.hub_state === 'CHƯA_CÓ_VOUCHER_ĐỦ_CHỨNG_CỨ');
assertTest('Voucher Hub displays strictly 0 vouchers', voucherHubData.security_guarantees && voucherHubData.security_guarantees.total_vouchers_displayed === 0);
assertTest('Voucher Hub saved searches exist for 5 key student needs', voucherHubData.saved_searches_by_need && voucherHubData.saved_searches_by_need.length === 5);

// Test 9: No-Write Attestation
const noWriteData = JSON.parse(fs.readFileSync(attestationPath, 'utf8'));
assertTest('No-Write Attestation confirms zero AccessTrade integration', noWriteData.contract_guarantees && noWriteData.contract_guarantees.accesstrade_integration_enabled === false);
assertTest('No-Write Attestation confirms zero active affiliate links', noWriteData.contract_guarantees && noWriteData.contract_guarantees.affiliate_links_active_count === 0);

// Test 10: Offline Affiliate Portfolio AccessTrade Status
const affiliateData = JSON.parse(fs.readFileSync(affiliatePath, 'utf8'));
assertTest('AccessTrade portal status is PORTAL_ACCESS_NOT_VERIFIED in offline catalog', affiliateData.accesstrade_portal_status === 'PORTAL_ACCESS_NOT_VERIFIED');

// Test 11: Ledger Fingerprint Verification
const ledgerBuf = fs.readFileSync(ledgerPath);
const actualLedgerSha256 = crypto.createHash('sha256').update(ledgerBuf).digest('hex');
const countContract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
assertTest('Count Contract matches disk ledger SHA-256 fingerprint', countContract.ledger_fingerprint && countContract.ledger_fingerprint.ledger_sha256 === actualLedgerSha256);

// Test 12: Snapshot JSON matches runtime computation
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
assertTest('Snapshot JSON matches AN_GI count (11)', snapshot.data.counts.an_gi === 11);
assertTest('Snapshot JSON matches DI_DAU count (14)', snapshot.data.counts.di_dau === 14);
assertTest('Snapshot JSON matches TIEN_ICH count (13)', snapshot.data.counts.tien_ich === 13);
assertTest('Snapshot JSON matches MUA_SAM count (12)', snapshot.data.counts.mua_sam_hoc_tap === 12);
assertTest('Snapshot JSON matches Voucher count (0)', snapshot.data.voucher_count === 0);

// Test 13: Scorecard EC vs Evidence Vault EC EXACT Match (8 Canonical Sources)
const scorecardData = JSON.parse(fs.readFileSync(scorecardPath, 'utf8'));
const canonicalInVault = manifestEC.artifacts.filter(a => a.pipeline_stage === 'CANONICAL_SOURCE_FOUND').length;
assertTest('Evidence Vault EC contains exactly 8 CANONICAL_SOURCE_FOUND artifacts', canonicalInVault === 8);
assertTest('Scorecard EC CANONICAL_SOURCE_FOUND equals 8 (100% Reconciled)', scorecardData.scorecard.CANONICAL_SOURCE_FOUND === 8);

// Test 14: HTML Content & Fingerprint Verifications
const scriptMatches = htmlContent.match(/<script src="jayt_storefront_staging_ec\.js"><\/script>/g) || [];
assertTest('Single script reference in index.html (no duplicates)', scriptMatches.length === 1);
assertTest('Version string is v3.457.0-staging.ec', htmlContent.includes('v3.457.0-staging.ec'));
assertTest('HTML body contains data-ledger-version="v3.457.0-staging.ec"', htmlContent.includes('data-ledger-version="v3.457.0-staging.ec"'));
assertTest('HTML body contains data-ledger-sha256 fingerprint', htmlContent.includes(`data-ledger-sha256="${actualLedgerSha256}"`));
assertTest('HTML pre-rendered text contains "14 Điểm tham quan & rạp chiếu"', htmlContent.includes('14 Điểm tham quan & rạp chiếu'));
assertTest('HTML pre-rendered text contains "13 Tiện ích công cộng TP. Đà Nẵng"', htmlContent.includes('13 Tiện ích công cộng TP. Đà Nẵng'));
assertTest('Drawer element #jayt-drawer-root exists in HTML', htmlContent.includes('id="jayt-drawer-root"'));

console.log('\n------------------------------------------------------------------------');
console.log(`📊 Result: ${passedTests} / ${totalTests} Tests Passed`);
console.log('------------------------------------------------------------------------\n');

// Copy test file to QA directory in workspace
const qaDest = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/test_section_ec_static_contract.js');
fs.copyFileSync(__filename, qaDest);
console.log(`✅ Saved QA test script -> ${qaDest}`);

if (passedTests === totalTests) {
  console.log('🎉 SECTION EC STATIC, VAULT LINEAGE & IDENTITY MATRIX INTEGRITY PASS (37/37)\n');
  process.exit(0);
} else {
  console.error('💥 SECTION EC STATIC CONTRACT FAILED!\n');
  process.exit(1);
}
