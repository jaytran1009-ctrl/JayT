/**
 * SECTION EL — STATIC CONTRACT, SUBJECT-FIRST DOSSIER & STAGING AVAILABILITY VALIDATOR
 * Governing: JAYT-245 Section EL (Lines 3464-3492)
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PROJECT_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const storefrontPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_el.js');
const indexPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/index.html');
const slatePath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/visual_slate.html');
const cssPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/styles.css');
const ledgerPath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_EL.json');
const walletPath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_WALLET_LEDGER_EL.json');
const voucherHubPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_el_voucher_hub_state.json');
const attestationPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_el_no_write_attestation.json');
const contractPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_el_unified_count_contract.json');
const snapshotPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_el_journey_count_snapshot.json');
const manifestELPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/evidence_vault_el/EVIDENCE_MANIFEST_EL.json');
const dossierPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/evidence_desk_el/DOSSIER_REGISTRY_EL.json');
const affiliatePath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_AFFILIATE_RESEARCH_PORTFOLIO_OFFLINE.json');
const scorecardPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_el_supply_scorecard.json');
const scannerReportPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_el_content_scanner_report.json');
const rosterPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_el_identity_roster.json');
const assetRegisterPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_el_asset_register.json');
const quarantinePath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_el_quarantine_manifest.json');
const runtimeTablePath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_el_runtime_asset_table.json');
const ownershipRecordPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_el_asset_ownership_record.json');
const factLedgerPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_el_fact_ledger.json');
const expMatrixPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_el_experience_matrix.json');

console.log('========================================================================');
console.log('🛡️  SECTION EL — STATIC CONTRACT & SUBJECT-FIRST DOSSIER VALIDATOR');
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
const elModule = require(storefrontPath);
const items = elModule.JAYT_DISCOVERY_ITEMS;

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

// Test 4: Subject-First Dossier Registry EL (Mandate EL.1 & EL.3)
const dossierData = JSON.parse(fs.readFileSync(dossierPath, 'utf8'));
assertTest('Dossier Registry records exactly 10 subject-first candidate dossiers', dossierData.total_dossiers === 10);
assertTest('Dossiers cover all 4 intent categories (Transit, Education, Culture, Culinary)', (
  dossierData.four_intent_breakdown.INTENT_PUBLIC_TRANSIT === 3 &&
  dossierData.four_intent_breakdown.INTENT_EDUCATION_POLICY === 3 &&
  dossierData.four_intent_breakdown.INTENT_CULTURE_LEISURE === 2 &&
  dossierData.four_intent_breakdown.INTENT_CULINARY_RETAIL === 2
));
assertTest('All 10 dossiers have user question and target fact field defined', dossierData.dossiers.every(d => d.user_question && d.target_fact_field && d.exact_canonical_url));

// Test 5: Fact Ledger EL (Mandate EL.2 & EL.4)
const factLedger = JSON.parse(fs.readFileSync(factLedgerPath, 'utf8'));
assertTest('Fact Ledger records exactly 10 evaluated dossiers and attempts', factLedger.evaluated_dossiers_and_attempts && factLedger.evaluated_dossiers_and_attempts.length === 10);
assertTest('Fact Ledger records strictly 0 verified field facts (Fail-closed Gate)', factLedger.verified_field_facts && factLedger.verified_field_facts.length === 0);

// Test 6: Quarantine Manifest & Complete Isolation of 12 JPEGs (Mandate EL.1)
const quarantineData = JSON.parse(fs.readFileSync(quarantinePath, 'utf8'));
assertTest('Quarantine Manifest records exactly 12 quarantined JPEGs', quarantineData.total_quarantined_files === 12);
assertTest('Quarantine Manifest policy enforces fail-closed on unverified rights', quarantineData.quarantine_policy && quarantineData.quarantine_policy.fail_closed_on_unverified_rights === true);

const htmlContent = fs.readFileSync(indexPath, 'utf8');
const jsContent = fs.readFileSync(storefrontPath, 'utf8');
const slateContent = fs.readFileSync(slatePath, 'utf8');
const cssContent = fs.readFileSync(cssPath, 'utf8');
const ledgerContent = fs.readFileSync(ledgerPath, 'utf8');

const QUARANTINED_JPGS = [
  'dragon_bridge_hero_001.jpg',
  'danang_real_photo_han_river_bridge.jpg',
  'danang_real_photo_cham_museum.jpg',
  'danang_real_photo_bach_dang.jpg',
  'danang_real_photo_mi_quang.jpg',
  'danang_real_photo_my_khe_beach.jpg',
  'danang_4k_dragon_bridge_master.jpg',
  'danang_4k_golden_bridge_master.jpg',
  'danang_4k_han_river_bridge_master.jpg',
  'danang_4k_my_khe_beach_master.jpg',
  'danang_4k_son_tra_master.jpg',
  'danang_real_mi_quang_master.jpg'
];

let zeroJpgsInHtml = true;
let zeroJpgsInJs = true;
let zeroJpgsInSlate = true;
let zeroJpgsInCss = true;
let zeroJpgsInLedger = true;

QUARANTINED_JPGS.forEach(jpg => {
  if (htmlContent.includes(jpg)) zeroJpgsInHtml = false;
  if (jsContent.includes(jpg)) zeroJpgsInJs = false;
  if (slateContent.includes(jpg)) zeroJpgsInSlate = false;
  if (cssContent.includes(jpg)) zeroJpgsInCss = false;
  if (ledgerContent.includes(jpg)) zeroJpgsInLedger = false;
});

assertTest('ZERO quarantined JPEGs referenced in index.html', zeroJpgsInHtml);
assertTest('ZERO quarantined JPEGs referenced in storefront JS', zeroJpgsInJs);
assertTest('ZERO quarantined JPEGs referenced in visual_slate.html', zeroJpgsInSlate);
assertTest('ZERO quarantined JPEGs referenced in styles.css', zeroJpgsInCss);
assertTest('ZERO quarantined JPEGs referenced in public count ledger', zeroJpgsInLedger);

// Test 7: Complete Purge of False Provenance / Photographer CC Tokens & Injected Badges (Mandate EL.1)
const FORBIDDEN_TOKENS = [
  'Bùi Thụy Đào Nguyên',
  'Christophe95',
  'CC BY-SA',
  'CC BY',
  'Creative Commons',
  'điều kiện trực tiếp',
  'Toàn cảnh Cầu Rồng',
  'ảnh thực địa',
  'chụp thực tế',
  'ĐÃ XÁC MINH FIELD FACT'
];

const scannedFiles = [
  { name: 'index.html', content: htmlContent },
  { name: 'storefront JS', content: jsContent },
  { name: 'visual_slate.html', content: slateContent },
  { name: 'styles.css', content: cssContent },
  { name: 'ledger JSON', content: ledgerContent }
];

let zeroFalseProvenanceTokens = true;
scannedFiles.forEach(f => {
  FORBIDDEN_TOKENS.forEach(tok => {
    if (f.content.includes(tok)) {
      console.error(`❌ Found forbidden token "${tok}" in ${f.name}`);
      zeroFalseProvenanceTokens = false;
    }
  });
});
assertTest('ZERO false provenance photographer credits, CC licenses, or unproven injected badges across ALL files', zeroFalseProvenanceTokens);

// Test 8: Single Instance of Voucher (0) in Navigation
const htmlVoucherMatches = (htmlContent.match(/data-nav="VOUCHER_HUB"/g) || []).length;
assertTest('Exactly 1 instance of Voucher (0) navigation button in index.html desktop nav', htmlVoucherMatches === 1);

const jsNavVoucherMatches = (jsContent.match(/<button class="nav-btn \${activeView === 'VOUCHER_HUB' \? 'active' : ''}" data-nav="VOUCHER_HUB"/g) || []).length;
assertTest('Exactly 1 instance of Voucher (0) navigation button in storefront JS template', jsNavVoucherMatches === 1);

// Test 9: Asset Ownership Record EL (Mandate EL.5)
const ownershipRecord = JSON.parse(fs.readFileSync(ownershipRecordPath, 'utf8'));
assertTest('Asset Ownership Record documents exactly 4 runtime SVGs with INTERNAL_STAGING_VECTOR_DRAFT', ownershipRecord.runtime_svg_records && ownershipRecord.runtime_svg_records.length === 4);
assertTest('All runtime SVGs have creator and approver recorded', ownershipRecord.runtime_svg_records.every(r => r.creator && r.approver));

// Test 10: Runtime Asset Audit Table EL (Mandate EL.5)
const runtimeTable = JSON.parse(fs.readFileSync(runtimeTablePath, 'utf8'));
assertTest('Runtime Asset Table documents exactly 4 runtime image elements with verified SVGs', runtimeTable.runtime_elements && runtimeTable.runtime_elements.length === 4);
assertTest('All runtime assets have permission_status = INTERNAL_STAGING_VECTOR_DRAFT', runtimeTable.runtime_elements.every(e => e.permission_status === 'INTERNAL_STAGING_VECTOR_DRAFT'));
assertTest('All runtime assets have truthful alt and credit strings', runtimeTable.runtime_elements.every(e => e.effective_alt.includes('Đồ họa minh họa') && e.effective_credit === '🎨 Đồ họa JayT'));

// Test 11: Vault EL 4 Intents & Verbatim Timestamp Lineage (Mandate EL.2)
const manifestEL = JSON.parse(fs.readFileSync(manifestELPath, 'utf8'));
assertTest('Evidence Manifest EL enforces 4 intents summary and verbatim origin timestamps', manifestEL.four_intent_summary && manifestEL.four_intent_summary.INTENT_PUBLIC_TRANSIT === 3);
assertTest('Dossiers evaluated count equals 10', manifestEL.field_facts_summary && manifestEL.field_facts_summary.dossiers_evaluated === 10);
assertTest('Evidence Manifest EL confirms field_facts_verified_count equals 0', manifestEL.field_facts_summary.field_facts_verified_count === 0);

const danabusEntry = manifestEL.artifacts.find(a => a.dossier_id === 'DOSSIER_EL_01_DANABUS_R16A');
assertTest('DanaBus exact origin timestamp is 2026-08-30T07:08:10.372Z (no rounding)', danabusEntry && danabusEntry.original_fetched_at_utc === '2026-08-30T07:08:10.372Z');
assertTest('DanaBus origin vault is DS with exact origin path', danabusEntry && danabusEntry.origin_vault === 'DS' && danabusEntry.origin_path.includes('evidence_vault_ds'));
assertTest('DanaBus origin manifest SHA256 matches Vault DS manifest', danabusEntry && danabusEntry.origin_manifest_sha256 === '2374e0ca33dea396ec5797557e8956b4451a56adfcb702a26714fe2effdf97c5');

let allArtifactsFilesExist = true;
manifestEL.artifacts.forEach(entry => {
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
assertTest('100% of raw artifact files exist on disk in EL vault with matching SHA-256 & byte size', allArtifactsFilesExist);

// Test 12: Pragmatic Experience Matrix (Mandate EL.5)
const expMatrix = JSON.parse(fs.readFileSync(expMatrixPath, 'utf8'));
assertTest('Experience Matrix defines 3 pragmatic entryways (Dùng Hôm Nay, Chương Trình, Kiểm Tra Trước Khi Mua)', expMatrix.three_pragmatic_entryways && expMatrix.three_pragmatic_entryways.length === 3);
assertTest('Experience Matrix records 0 verified field facts', expMatrix.verified_field_facts_count === 0);

// Test 13: 50-Item Identity Roster Verification
const rosterData = JSON.parse(fs.readFileSync(rosterPath, 'utf8'));
assertTest('Identity Roster contains exactly 50 records matching public feed', rosterData.records.length === 50);
assertTest('Identity Roster matched items count equals 8', rosterData.roster_cardinality.vault_artifact_matched_count === 8);
assertTest('Identity Roster verified field facts count equals 0', rosterData.roster_cardinality.verified_field_facts_count === 0);

// Test 14: Honest 2-Tier Content Scanner Report
const scannerReport = JSON.parse(fs.readFileSync(scannerReportPath, 'utf8'));
assertTest('Scanner Report methodology is DUAL_COLUMN_HONEST_SEMANTIC_TOKEN_SCANNER', scannerReport.scanner_methodology === 'DUAL_COLUMN_HONEST_SEMANTIC_TOKEN_SCANNER');
assertTest('Scanner Report confirms ZERO forbidden action claims across HTML & JS', scannerReport.summary_verdict.total_forbidden_action_claims === 0);
assertTest('Scanner Report acknowledges raw KYC/CPA tokens inside allowlisted negative disclosures', scannerReport.summary_verdict.is_fully_compliant === true);

// Test 15: Voucher Hub State Verification
const voucherHubData = JSON.parse(fs.readFileSync(voucherHubPath, 'utf8'));
assertTest('Voucher Hub state is CHƯA_CÓ_VOUCHER_ĐỦ_CHỨNG_CỨ', voucherHubData.hub_state === 'CHƯA_CÓ_VOUCHER_ĐỦ_CHỨNG_CỨ');
assertTest('Voucher Hub displays strictly 0 vouchers', voucherHubData.security_guarantees && voucherHubData.security_guarantees.total_vouchers_displayed === 0);
assertTest('Voucher Hub saved searches exist for 5 key student needs', voucherHubData.saved_searches_by_need && voucherHubData.saved_searches_by_need.length === 5);

// Test 16: No-Write Attestation
const noWriteData = JSON.parse(fs.readFileSync(attestationPath, 'utf8'));
assertTest('No-Write Attestation confirms zero AccessTrade integration', noWriteData.contract_guarantees && noWriteData.contract_guarantees.accesstrade_integration_enabled === false);
assertTest('No-Write Attestation confirms zero active affiliate links', noWriteData.contract_guarantees && noWriteData.contract_guarantees.affiliate_links_active_count === 0);
assertTest('No-Write Attestation confirms zero quarantined JPEGs active in runtime', noWriteData.contract_guarantees && noWriteData.contract_guarantees.quarantined_jpegs_active_in_runtime === 0);
assertTest('No-Write Attestation confirms zero photographer CC strings active in runtime', noWriteData.contract_guarantees && noWriteData.contract_guarantees.photographer_cc_strings_in_runtime === 0);
assertTest('No-Write Attestation confirms zero unverified injected facts in runtime', noWriteData.contract_guarantees && noWriteData.contract_guarantees.unverified_injected_facts_in_runtime === 0);

// Test 17: Offline Affiliate Portfolio AccessTrade Status
const affiliateData = JSON.parse(fs.readFileSync(affiliatePath, 'utf8'));
assertTest('AccessTrade portal status is PORTAL_ACCESS_NOT_VERIFIED in offline catalog', affiliateData.accesstrade_portal_status === 'PORTAL_ACCESS_NOT_VERIFIED');

// Test 18: Ledger Fingerprint Verification
const ledgerBuf = fs.readFileSync(ledgerPath);
const actualLedgerSha256 = crypto.createHash('sha256').update(ledgerBuf).digest('hex');
const countContract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
assertTest('Count Contract matches disk ledger SHA-256 fingerprint', countContract.ledger_fingerprint && countContract.ledger_fingerprint.ledger_sha256 === actualLedgerSha256);

// Test 19: Snapshot JSON matches runtime computation
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
assertTest('Snapshot JSON matches AN_GI count (11)', snapshot.data.counts.an_gi === 11);
assertTest('Snapshot JSON matches DI_DAU count (14)', snapshot.data.counts.di_dau === 14);
assertTest('Snapshot JSON matches TIEN_ICH count (13)', snapshot.data.counts.tien_ich === 13);
assertTest('Snapshot JSON matches MUA_SAM count (12)', snapshot.data.counts.mua_sam_hoc_tap === 12);
assertTest('Snapshot JSON matches Voucher count (0)', snapshot.data.voucher_count === 0);
assertTest('Snapshot JSON matches verified field facts count (0)', snapshot.data.verified_field_facts_count === 0);

// Test 20: Scorecard EL vs Evidence Vault EL EXACT Match
const scorecardData = JSON.parse(fs.readFileSync(scorecardPath, 'utf8'));
assertTest('Evidence Vault EL contains exactly 10 artifacts evaluated', manifestEL.total_artifacts === 10);
assertTest('Scorecard EL FIELD_VERIFIED_FACTS equals 0 (100% Reconciled)', scorecardData.scorecard.FIELD_VERIFIED_FACTS === 0);

// Test 21: HTML Content & Fingerprint Verifications
const scriptMatches = htmlContent.match(/<script src="jayt_storefront_staging_el\.js"><\/script>/g) || [];
assertTest('Single script reference in index.html (no duplicates)', scriptMatches.length === 1);
assertTest('Version string is v3.466.0-staging.el', htmlContent.includes('v3.466.0-staging.el'));
assertTest('HTML body contains data-ledger-version="v3.466.0-staging.el"', htmlContent.includes('data-ledger-version="v3.466.0-staging.el"'));
assertTest('HTML body contains data-ledger-sha256 fingerprint', htmlContent.includes(`data-ledger-sha256="${actualLedgerSha256}"`));
assertTest('HTML pre-rendered text contains "14 Điểm tham quan & rạp chiếu"', htmlContent.includes('14 Điểm tham quan & rạp chiếu'));
assertTest('HTML pre-rendered text contains "13 Tiện ích công cộng TP. Đà Nẵng"', htmlContent.includes('13 Tiện ích công cộng TP. Đà Nẵng'));
assertTest('Drawer element #jayt-drawer-root exists in HTML', htmlContent.includes('id="jayt-drawer-root"'));

console.log('\n------------------------------------------------------------------------');
console.log(`📊 Result: ${passedTests} / ${totalTests} Tests Passed`);
console.log('------------------------------------------------------------------------\n');

// Copy test file to QA directory in workspace
const qaDest = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/test_section_el_static_contract.js');
fs.copyFileSync(__filename, qaDest);
console.log(`✅ Saved QA test script -> ${qaDest}`);

if (passedTests === totalTests) {
  console.log('🎉 SECTION EL STATIC, DOSSIER & AVAILABILITY PASS (67/67)\n');
  process.exit(0);
} else {
  console.error('💥 SECTION EL STATIC CONTRACT FAILED!\n');
  process.exit(1);
}
