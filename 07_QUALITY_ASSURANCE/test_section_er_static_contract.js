const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PROJECT_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const storefrontPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_er.js');
const indexPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/index.html');
const slatePath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/visual_slate.html');
const cssPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/styles.css');
const ledgerPath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_ER.json');
const walletPath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_WALLET_LEDGER_ER.json');
const voucherHubPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_er_voucher_hub_state.json');
const attestationPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_er_no_write_attestation.json');
const contractPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_er_unified_count_contract.json');
const manifestERPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/evidence_vault_er/EVIDENCE_MANIFEST_ER.json');
const githubArtifactV2Path = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/evidence_vault_er/artifact_cand_github_education_docs_v2.md');
const githubReceiptPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/evidence_vault_er/artifact_cand_github_education_docs_v2_receipt.json');
const proposedFactsPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/evidence_desk_er/PROPOSED_FACTS_REGISTRY_ER.json');
const discoveryPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/evidence_desk_er/DISCOVERY_REGISTRY_ER.json');
const rosterPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_er_identity_roster.json');
const assetRegisterPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_er_asset_register.json');
const quarantinePath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_er_quarantine_manifest.json');
const runtimeTablePath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_er_runtime_asset_table.json');
const ownershipRecordPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_er_asset_ownership_record.json');
const factLedgerPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_er_fact_ledger.json');
const accessTradeDenylistPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_er_accesstrade_denylist.json');

console.log('========================================================================');
console.log('🛡️  SECTION ER — STATIC CONTRACT & DEAL DISCOVERY ENGINE VALIDATOR');
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
const erModule = require(storefrontPath);
const items = erModule.JAYT_DISCOVERY_ITEMS;

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

// Test 4: 3-Lane Voucher Wallet Definition (Mandate ER.2)
assertTest('JAYT_WALLET_LEDGER_ER.json exists on disk', fs.existsSync(walletPath));
const walletData = JSON.parse(fs.readFileSync(walletPath, 'utf8'));
assertTest('Wallet Ledger defines Lane A (Public Verified = 0)', walletData.three_lanes_definition && walletData.three_lanes_definition.lane_a.active_count === 0);
assertTest('Wallet Ledger defines Lane B (In-app Personalized = 10)', walletData.three_lanes_definition && walletData.three_lanes_definition.lane_b.active_count === 10);
assertTest('Wallet Ledger defines Lane C (Radar Monitoring = 3)', walletData.three_lanes_definition && walletData.three_lanes_definition.lane_c.active_count === 3);

// Test 5: AccessTrade Denylist & Research-to-Revenue Isolation (Mandate ER.5)
assertTest('AccessTrade Denylist file exists on disk', fs.existsSync(accessTradeDenylistPath));
const denylistData = JSON.parse(fs.readFileSync(accessTradeDenylistPath, 'utf8'));
assertTest('AccessTrade Denylist confirms legacy affiliate cards are DENIED', denylistData.denylisted_components.legacy_admitted_affiliate_cards === 'DENIED');
assertTest('AccessTrade Denylist confirms go.isclix deeplinks are DENIED', denylistData.denylisted_components.go_isclix_deeplinks === 'DENIED');
assertTest('AccessTrade Denylist confirms PORTAL_ACCESS_NOT_VERIFIED maintained', denylistData.research_to_revenue_status.portal_access_state === 'PORTAL_ACCESS_NOT_VERIFIED');
assertTest('Total active affiliate links on staging is strictly 0', denylistData.research_to_revenue_status.total_active_affiliate_links_on_staging === 0);

// Test 6: GitHub Docs Artifact v2 and Capture Receipt (Mandate EP/EQ/ER)
assertTest('Raw artifact v2 file exists on disk', fs.existsSync(githubArtifactV2Path));
assertTest('Capture receipt file exists on disk', fs.existsSync(githubReceiptPath));

const githubBuf = fs.readFileSync(githubArtifactV2Path);
const actualGithubSha256 = crypto.createHash('sha256').update(githubBuf).digest('hex');
const receiptData = JSON.parse(fs.readFileSync(githubReceiptPath, 'utf8'));

assertTest('Capture receipt HTTP status equals 200', receiptData.http_status === 200);
assertTest('Capture receipt raw_byte_sha256 exactly matches artifact disk SHA-256', receiptData.raw_byte_sha256 === actualGithubSha256);
assertTest('Capture receipt confirms zero account/secret required', receiptData.account_or_secret_required === false);

// Test 7: Proposed Facts 12-Point Schema Verification
const proposedFactsData = JSON.parse(fs.readFileSync(proposedFactsPath, 'utf8'));
assertTest('Proposed Facts Registry records exactly 2 facts for GitHub Education', proposedFactsData.total_proposed_facts === 2);

const REQUIRED_12_FIELDS = [
  'fact_id',
  'candidate_id',
  'tier',
  'exact_final_url',
  'artifact_id',
  'artifact_sha256',
  'field_name',
  'field_value',
  'verbatim_quote',
  'raw_locator_replay',
  'subject_geography_scope',
  'eligibility_conditions'
];

let all12FieldsPresent = true;
let allVerbatimQuotesMatchedInArtifact = true;
const artifactText = githubBuf.toString('utf8');

proposedFactsData.facts.forEach(f => {
  REQUIRED_12_FIELDS.forEach(req => {
    if (!f[req] || f[req] === '') all12FieldsPresent = false;
  });
  if (!artifactText.includes(f.verbatim_quote)) {
    console.error(`❌ Verbatim quote not found in artifact for fact ${f.fact_id}`);
    allVerbatimQuotesMatchedInArtifact = false;
  }
});

assertTest('All proposed facts contain all mandatory 12 fields non-null', all12FieldsPresent);
assertTest('All proposed facts verbatim quotes match exactly inside artifact text (Locator Replay Pass)', allVerbatimQuotesMatchedInArtifact);
assertTest('All proposed facts have public_display_allowed = false (Fail-closed Gate)', proposedFactsData.facts.every(f => f.public_display_allowed === false));

// Test 8: Cleaned Discovery Registry ER
const discoveryData = JSON.parse(fs.readFileSync(discoveryPath, 'utf8'));
assertTest('Cleaned Discovery Registry records exactly 6 dossiers', discoveryData.total_discovery_dossiers === 6);
assertTest('Discovery Registry policy confirms unbacked narratives cleaned', discoveryData.unbacked_narratives_cleaned === true);

// Test 9: Evidence Manifest ER
const manifestER = JSON.parse(fs.readFileSync(manifestERPath, 'utf8'));
assertTest('Evidence Manifest ER records total_discovery_dossiers_evaluated = 6', manifestER.summary.total_discovery_dossiers_evaluated === 6);
assertTest('Evidence Manifest ER records captured_artifacts_with_receipt_count = 1', manifestER.summary.captured_artifacts_with_receipt_count === 1);
assertTest('Evidence Manifest ER records field_facts_verified_in_runtime_storefront = 0', manifestER.summary.field_facts_verified_in_runtime_storefront === 0);

// Test 10: Fact Ledger ER
const factLedger = JSON.parse(fs.readFileSync(factLedgerPath, 'utf8'));
assertTest('Fact Ledger ER records evaluated_citation_facts_count = 2', factLedger.fact_ledger_policy.evaluated_citation_facts_count === 2);
assertTest('Fact Ledger ER records strictly 0 verified field facts on runtime storefront', factLedger.verified_field_facts.length === 0);

// Test 11: Quarantine Manifest & Complete Isolation of 12 JPEGs
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

// Test 12: Complete Purge of False Provenance / Photographer CC Tokens & Injected Badges
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

// Test 13: Single Instance of Voucher (0) in Navigation
const htmlVoucherMatches = (htmlContent.match(/data-nav="VOUCHER_HUB"/g) || []).length;
assertTest('Exactly 1 instance of Voucher (0) navigation button in index.html desktop nav', htmlVoucherMatches === 1);

const jsNavVoucherMatches = (jsContent.match(/<button class="nav-btn \${activeView === 'VOUCHER_HUB' \? 'active' : ''}" data-nav="VOUCHER_HUB"/g) || []).length;
assertTest('Exactly 1 instance of Voucher (0) navigation button in storefront JS template', jsNavVoucherMatches === 1);

// Test 14: Asset Ownership Record ER
const ownershipRecord = JSON.parse(fs.readFileSync(ownershipRecordPath, 'utf8'));
assertTest('Asset Ownership Record documents exactly 4 runtime SVGs with INTERNAL_STAGING_VECTOR_DRAFT', ownershipRecord.runtime_svg_records && ownershipRecord.runtime_svg_records.length === 4);
assertTest('All runtime SVGs have creator and approver recorded', ownershipRecord.runtime_svg_records.every(r => r.creator && r.approver));

// Test 15: Runtime Asset Audit Table ER
const runtimeTable = JSON.parse(fs.readFileSync(runtimeTablePath, 'utf8'));
assertTest('Runtime Asset Table documents exactly 4 runtime image elements with verified SVGs', runtimeTable.runtime_elements && runtimeTable.runtime_elements.length === 4);
assertTest('All runtime assets have permission_status = INTERNAL_STAGING_VECTOR_DRAFT', runtimeTable.runtime_elements.every(e => e.permission_status === 'INTERNAL_STAGING_VECTOR_DRAFT'));
assertTest('All runtime assets have truthful alt and credit strings', runtimeTable.runtime_elements.every(e => e.effective_alt.includes('Đồ họa minh họa') && e.effective_credit === '🎨 Đồ họa JayT'));

// Test 16: 50-Item Identity Roster Verification
const rosterData = JSON.parse(fs.readFileSync(rosterPath, 'utf8'));
assertTest('Identity Roster contains exactly 50 records matching public feed', rosterData.records.length === 50);
assertTest('Identity Roster verified field facts count equals 0', rosterData.roster_cardinality.verified_field_facts_count === 0);

// Test 17: Voucher Hub State Verification
const voucherHubData = JSON.parse(fs.readFileSync(voucherHubPath, 'utf8'));
assertTest('Voucher Hub state is CHƯA_CÓ_VOUCHER_ĐỦ_CHỨNG_CỨ', voucherHubData.hub_state === 'CHƯA_CÓ_VOUCHER_ĐỦ_CHỨNG_CỨ');
assertTest('Voucher Hub displays strictly 0 vouchers', voucherHubData.security_guarantees && voucherHubData.security_guarantees.total_vouchers_displayed === 0);
assertTest('Voucher Hub saved searches exist for 5 key student needs', voucherHubData.saved_searches_by_need && voucherHubData.saved_searches_by_need.length === 5);

// Test 18: No-Write Attestation
const noWriteData = JSON.parse(fs.readFileSync(attestationPath, 'utf8'));
assertTest('No-Write Attestation confirms zero AccessTrade integration', noWriteData.contract_guarantees && noWriteData.contract_guarantees.accesstrade_integration_enabled === false);
assertTest('No-Write Attestation confirms zero active affiliate links', noWriteData.contract_guarantees && noWriteData.contract_guarantees.affiliate_links_active_count === 0);
assertTest('No-Write Attestation confirms zero quarantined JPEGs active in runtime', noWriteData.contract_guarantees && noWriteData.contract_guarantees.quarantined_jpegs_active_in_runtime === 0);
assertTest('No-Write Attestation confirms zero photographer CC strings active in runtime', noWriteData.contract_guarantees && noWriteData.contract_guarantees.photographer_cc_strings_in_runtime === 0);
assertTest('No-Write Attestation confirms zero unverified injected facts in runtime', noWriteData.contract_guarantees && noWriteData.contract_guarantees.unverified_injected_facts_in_runtime === 0);

// Test 19: Ledger Fingerprint Verification
const ledgerBuf = fs.readFileSync(ledgerPath);
const actualLedgerSha256 = crypto.createHash('sha256').update(ledgerBuf).digest('hex');
const countContract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
assertTest('Count Contract matches disk ledger SHA-256 fingerprint', countContract.ledger_fingerprint && countContract.ledger_fingerprint.ledger_sha256 === actualLedgerSha256);

// Test 20: HTML Content & Fingerprint Verifications
const scriptMatches = htmlContent.match(/<script src="jayt_storefront_staging_er\.js"><\/script>/g) || [];
assertTest('Single script reference in index.html (no duplicates)', scriptMatches.length === 1);
assertTest('Version string is v3.472.0-staging.er', htmlContent.includes('v3.472.0-staging.er'));
assertTest('HTML body contains data-ledger-version="v3.472.0-staging.er"', htmlContent.includes('data-ledger-version="v3.472.0-staging.er"'));
assertTest('HTML body contains data-ledger-sha256 fingerprint', htmlContent.includes(`data-ledger-sha256="${actualLedgerSha256}"`));
assertTest('HTML pre-rendered text contains "14 Điểm tham quan & rạp chiếu"', htmlContent.includes('14 Điểm tham quan & rạp chiếu'));
assertTest('HTML pre-rendered text contains "13 Tiện ích công cộng TP. Đà Nẵng"', htmlContent.includes('13 Tiện ích công cộng TP. Đà Nẵng'));
assertTest('Drawer element #jayt-drawer-root exists in HTML', htmlContent.includes('id="jayt-drawer-root"'));

console.log('\n------------------------------------------------------------------------');
console.log(`📊 Result: ${passedTests} / ${totalTests} Tests Passed`);
console.log('------------------------------------------------------------------------\n');

if (passedTests === totalTests) {
  console.log('🎉 SECTION ER STATIC & DEAL DISCOVERY ENGINE TESTS PASS (100%)\n');
  process.exit(0);
} else {
  console.error('💥 SECTION ER STATIC CONTRACT FAILED!\n');
  process.exit(1);
}
