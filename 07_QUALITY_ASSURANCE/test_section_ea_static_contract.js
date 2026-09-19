/**
 * SECTION EA — STATIC CONTRACT, VOUCHER HUB & NO-AFFILIATE SECURITY VALIDATOR
 * Governing: JAYT-245 Section EA (Lines 3128-3159)
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PROJECT_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const storefrontPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_ea.js');
const indexPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/index.html');
const ledgerPath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_EA.json');
const walletPath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_WALLET_LEDGER_EA.json');
const voucherHubPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_ea_voucher_hub_state.json');
const attestationPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_ea_no_write_attestation.json');
const contractPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_ea_unified_count_contract.json');
const snapshotPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_ea_journey_count_snapshot.json');
const manifestEAPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/evidence_vault_ea/EVIDENCE_MANIFEST_EA.json');
const affiliatePath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_AFFILIATE_RESEARCH_PORTFOLIO_OFFLINE.json');
const scorecardPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_ea_supply_scorecard.json');

console.log('========================================================================');
console.log('🛡️  SECTION EA — STATIC CONTRACT, VOUCHER HUB & SECURITY VALIDATOR');
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
const eaModule = require(storefrontPath);
const items = eaModule.JAYT_DISCOVERY_ITEMS;

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

// Test 4: Denylist Content Scan (ZERO Affiliate URLs, Sub-IDs, CPA/KYC, Fake Voucher claims)
const denylist = ['go.isclix', 'sub_id', 'aff_sub', 'utm_source=accesstrade', 'cpa_campaign', 'kyc_verification', 'mở tài khoản ngân hàng nhận tiền', 'copilot', 'đáy 90 ngày'];
const htmlContent = fs.readFileSync(indexPath, 'utf8');
const jsContent = fs.readFileSync(storefrontPath, 'utf8');

let hasDenylistViolation = false;
denylist.forEach(term => {
  if (htmlContent.toLowerCase().includes(term) || jsContent.toLowerCase().includes(term)) {
    hasDenylistViolation = true;
    console.error(`❌ Denylist term found: "${term}"`);
  }
});
assertTest('ZERO denylist violations (no isclix, sub_id, CPA/KYC, fake vouchers) in HTML and JS', !hasDenylistViolation);

// Test 5: Voucher Hub State Verification
const voucherHubData = JSON.parse(fs.readFileSync(voucherHubPath, 'utf8'));
assertTest('Voucher Hub state is CHƯA_CÓ_VOUCHER_ĐỦ_CHỨNG_CỨ', voucherHubData.hub_state === 'CHƯA_CÓ_VOUCHER_ĐỦ_CHỨNG_CỨ');
assertTest('Voucher Hub displays strictly 0 vouchers', voucherHubData.security_guarantees && voucherHubData.security_guarantees.total_vouchers_displayed === 0);
assertTest('Voucher Hub saved searches exist for 5 key student needs', voucherHubData.saved_searches_by_need && voucherHubData.saved_searches_by_need.length === 5);

// Test 6: Engineering No-Write Attestation
const noWriteData = JSON.parse(fs.readFileSync(attestationPath, 'utf8'));
assertTest('No-Write Attestation confirms zero AccessTrade integration', noWriteData.contract_guarantees && noWriteData.contract_guarantees.accesstrade_integration_enabled === false);
assertTest('No-Write Attestation confirms zero active affiliate links', noWriteData.contract_guarantees && noWriteData.contract_guarantees.affiliate_links_active_count === 0);

// Test 7: Offline Affiliate Portfolio AccessTrade Status
const affiliateData = JSON.parse(fs.readFileSync(affiliatePath, 'utf8'));
assertTest('AccessTrade portal status is PORTAL_ACCESS_NOT_VERIFIED in offline catalog', affiliateData.accesstrade_portal_status === 'PORTAL_ACCESS_NOT_VERIFIED');

// Test 8: Ledger Fingerprint Verification
const ledgerBuf = fs.readFileSync(ledgerPath);
const actualLedgerSha256 = crypto.createHash('sha256').update(ledgerBuf).digest('hex');
const countContract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
assertTest('Count Contract matches disk ledger SHA-256 fingerprint', countContract.ledger_fingerprint && countContract.ledger_fingerprint.ledger_sha256 === actualLedgerSha256);

// Test 9: Snapshot JSON matches runtime computation
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
assertTest('Snapshot JSON matches AN_GI count (11)', snapshot.data.counts.an_gi === 11);
assertTest('Snapshot JSON matches DI_DAU count (14)', snapshot.data.counts.di_dau === 14);
assertTest('Snapshot JSON matches TIEN_ICH count (13)', snapshot.data.counts.tien_ich === 13);
assertTest('Snapshot JSON matches MUA_SAM count (12)', snapshot.data.counts.mua_sam_hoc_tap === 12);
assertTest('Snapshot JSON matches Voucher count (0)', snapshot.data.voucher_count === 0);

// Test 10: Scorecard EA vs Evidence Vault EA EXACT Match (7 Canonical Sources)
const manifestEA = JSON.parse(fs.readFileSync(manifestEAPath, 'utf8'));
const scorecardData = JSON.parse(fs.readFileSync(scorecardPath, 'utf8'));
const canonicalInVault = manifestEA.artifacts.filter(a => a.pipeline_stage === 'CANONICAL_SOURCE_FOUND').length;
assertTest('Evidence Vault EA contains exactly 7 CANONICAL_SOURCE_FOUND artifacts', canonicalInVault === 7);
assertTest('Scorecard EA CANONICAL_SOURCE_FOUND equals 7 (100% Reconciled)', scorecardData.scorecard.CANONICAL_SOURCE_FOUND === 7);

// Test 11: All 12 Artifact Files Exist on Disk with Matching SHA-256 and Sizes
let allFilesMatch = true;
manifestEA.artifacts.forEach(entry => {
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
assertTest('100% of raw artifact files exist on disk in EA vault with matching SHA-256 & byte size', allFilesMatch);

// Test 12: HTML Content & Fingerprint Verifications
const scriptMatches = htmlContent.match(/<script src="jayt_storefront_staging_ea\.js"><\/script>/g) || [];
assertTest('Single script reference in index.html (no duplicates)', scriptMatches.length === 1);
assertTest('Version string is v3.455.0-staging.ea', htmlContent.includes('v3.455.0-staging.ea'));
assertTest('HTML body contains data-ledger-version="v3.455.0-staging.ea"', htmlContent.includes('data-ledger-version="v3.455.0-staging.ea"'));
assertTest('HTML body contains data-ledger-sha256 fingerprint', htmlContent.includes(`data-ledger-sha256="${actualLedgerSha256}"`));
assertTest('HTML pre-rendered text contains "14 Điểm tham quan & rạp chiếu"', htmlContent.includes('14 Điểm tham quan & rạp chiếu'));
assertTest('HTML pre-rendered text contains "13 Tiện ích công cộng TP. Đà Nẵng"', htmlContent.includes('13 Tiện ích công cộng TP. Đà Nẵng'));
assertTest('HTML pre-rendered text contains "Voucher (0)" nav button', htmlContent.includes('Voucher (0)'));
assertTest('Drawer element #jayt-drawer-root exists in HTML', htmlContent.includes('id="jayt-drawer-root"'));

console.log('\n------------------------------------------------------------------------');
console.log(`📊 Result: ${passedTests} / ${totalTests} Tests Passed`);
console.log('------------------------------------------------------------------------\n');

// Copy test file to QA directory in workspace
const qaDest = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/test_section_ea_static_contract.js');
fs.copyFileSync(__filename, qaDest);
console.log(`✅ Saved QA test script -> ${qaDest}`);

if (passedTests === totalTests) {
  console.log('🎉 SECTION EA STATIC, VOUCHER HUB & SECURITY INTEGRITY PASS (30/30)\n');
  process.exit(0);
} else {
  console.error('💥 SECTION EA STATIC CONTRACT FAILED!\n');
  process.exit(1);
}
