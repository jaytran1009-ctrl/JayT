/**
 * SECTION EM — STATIC CONTRACT, 16-FIELD ATTEMPT SCHEMA & AVAILABILITY VALIDATOR
 * Governing: JAYT-245 Section EM (Lines 3495-3521)
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PROJECT_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const storefrontPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_em.js');
const indexPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/index.html');
const slatePath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/visual_slate.html');
const cssPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/styles.css');
const ledgerPath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_EM.json');
const walletPath = path.join(PROJECT_ROOT, '00_PROGRAM_BASELINE/JAYT_WALLET_LEDGER_EM.json');
const voucherHubPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_em_voucher_hub_state.json');
const attestationPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_em_no_write_attestation.json');
const contractPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_em_unified_count_contract.json');
const manifestEMPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/evidence_vault_em/EVIDENCE_MANIFEST_EM.json');
const dossierPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/evidence_desk_em/DOSSIER_REGISTRY_EM.json');
const rosterPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_em_identity_roster.json');
const assetRegisterPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_em_asset_register.json');
const quarantinePath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_em_quarantine_manifest.json');
const runtimeTablePath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_em_runtime_asset_table.json');
const ownershipRecordPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_em_asset_ownership_record.json');
const factLedgerPath = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/staging_em_fact_ledger.json');

console.log('========================================================================');
console.log('🛡️  SECTION EM — STATIC CONTRACT & ATTEMPT PROVENANCE VALIDATOR');
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
const emModule = require(storefrontPath);
const items = emModule.JAYT_DISCOVERY_ITEMS;

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

// Test 4: Static-First Dossier Registry EM (Mandate EM.1 & EM.3)
const dossierData = JSON.parse(fs.readFileSync(dossierPath, 'utf8'));
assertTest('Dossier Registry records exactly 8 static-first candidate dossiers', dossierData.total_dossiers === 8);
assertTest('Dossiers cover all 4 intent categories (Transit, Education, Culture, Culinary)', (
  dossierData.four_intent_breakdown.INTENT_PUBLIC_TRANSIT === 3 &&
  dossierData.four_intent_breakdown.INTENT_EDUCATION_POLICY === 2 &&
  dossierData.four_intent_breakdown.INTENT_CULTURE_LEISURE === 2 &&
  dossierData.four_intent_breakdown.INTENT_CULINARY_RETAIL === 1
));
assertTest('All 8 dossiers have inquiry question and target fact field defined', dossierData.dossiers.every(d => d.inquiry_question && d.target_fact_field && d.exact_requested_url));

// Test 5: 16-Field Attempt Schema in Evidence Manifest EM (Mandate EM.1 & EM.2)
const manifestEM = JSON.parse(fs.readFileSync(manifestEMPath, 'utf8'));
const REQUIRED_ATTEMPT_FIELDS = [
  'attempt_id',
  'dossier_id',
  'candidate_id',
  'inquiry_question',
  'exact_requested_url',
  'final_resolved_url',
  'http_status_code',
  'subject_match_verdict',
  'raw_artifact_ref',
  'raw_artifact_sha256',
  'observed_at_utc',
  'extraction_method',
  'closure_status',
  'closure_reason',
  'retry_eligibility',
  'reviewer_decision'
];

assertTest('Evidence Manifest records exactly 8 attempts', manifestEM.attempts.length === 8);

let allAttemptsSchemaValid = true;
manifestEM.attempts.forEach(att => {
  REQUIRED_ATTEMPT_FIELDS.forEach(f => {
    if (att[f] === null || att[f] === undefined || att[f] === '') {
      console.error(`❌ Field ${f} is empty in attempt ${att.attempt_id}`);
      allAttemptsSchemaValid = false;
    }
  });
});
assertTest('All 8 attempts satisfy the 16 required non-null fields schema (Fail-Before-Write Passed)', allAttemptsSchemaValid);

// Test 6: One-to-One Integrity Join Dossier <-> Attempt <-> Artifact on Disk (Mandate EM.2)
let allJoinsValid = true;
dossierData.dossiers.forEach(d => {
  const matchAttempt = manifestEM.attempts.find(a => a.dossier_id === d.dossier_id);
  if (!matchAttempt) {
    allJoinsValid = false;
    console.error(`❌ No matching attempt for dossier ${d.dossier_id}`);
  } else {
    const rawDiskPath = path.join(PROJECT_ROOT, matchAttempt.raw_artifact_ref);
    if (!fs.existsSync(rawDiskPath)) {
      allJoinsValid = false;
      console.error(`❌ Artifact file missing on disk: ${rawDiskPath}`);
    } else {
      const diskBuf = fs.readFileSync(rawDiskPath);
      const diskSha = crypto.createHash('sha256').update(diskBuf).digest('hex');
      if (diskSha !== matchAttempt.raw_artifact_sha256 || diskBuf.length !== matchAttempt.raw_artifact_byte_size) {
        allJoinsValid = false;
        console.error(`❌ SHA-256 or size mismatch for artifact: ${rawDiskPath}`);
      }
    }
  }
});
assertTest('1-to-1 Integrity Join verified across Dossier Registry <-> Attempt Manifest <-> Disk Raw Artifacts', allJoinsValid);

// Test 7: Fact Ledger EM (Mandate EM.2 & EM.4)
const factLedger = JSON.parse(fs.readFileSync(factLedgerPath, 'utf8'));
assertTest('Fact Ledger records exactly 8 evaluated attempts in audit log', factLedger.attempt_provenance_audit_log && factLedger.attempt_provenance_audit_log.length === 8);
assertTest('Fact Ledger records strictly 0 verified field facts (Fail-closed Gate)', factLedger.verified_field_facts && factLedger.verified_field_facts.length === 0);

// Test 8: Quarantine Manifest & Complete Isolation of 12 JPEGs (Mandate EM.1)
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

// Test 9: Complete Purge of False Provenance / Photographer CC Tokens & Injected Badges
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

// Test 10: Single Instance of Voucher (0) in Navigation
const htmlVoucherMatches = (htmlContent.match(/data-nav="VOUCHER_HUB"/g) || []).length;
assertTest('Exactly 1 instance of Voucher (0) navigation button in index.html desktop nav', htmlVoucherMatches === 1);

const jsNavVoucherMatches = (jsContent.match(/<button class="nav-btn \${activeView === 'VOUCHER_HUB' \? 'active' : ''}" data-nav="VOUCHER_HUB"/g) || []).length;
assertTest('Exactly 1 instance of Voucher (0) navigation button in storefront JS template', jsNavVoucherMatches === 1);

// Test 11: Asset Ownership Record EM
const ownershipRecord = JSON.parse(fs.readFileSync(ownershipRecordPath, 'utf8'));
assertTest('Asset Ownership Record documents exactly 4 runtime SVGs with INTERNAL_STAGING_VECTOR_DRAFT', ownershipRecord.runtime_svg_records && ownershipRecord.runtime_svg_records.length === 4);
assertTest('All runtime SVGs have creator and approver recorded', ownershipRecord.runtime_svg_records.every(r => r.creator && r.approver));

// Test 12: Runtime Asset Audit Table EM
const runtimeTable = JSON.parse(fs.readFileSync(runtimeTablePath, 'utf8'));
assertTest('Runtime Asset Table documents exactly 4 runtime image elements with verified SVGs', runtimeTable.runtime_elements && runtimeTable.runtime_elements.length === 4);
assertTest('All runtime assets have permission_status = INTERNAL_STAGING_VECTOR_DRAFT', runtimeTable.runtime_elements.every(e => e.permission_status === 'INTERNAL_STAGING_VECTOR_DRAFT'));
assertTest('All runtime assets have truthful alt and credit strings', runtimeTable.runtime_elements.every(e => e.effective_alt.includes('Đồ họa minh họa') && e.effective_credit === '🎨 Đồ họa JayT'));

// Test 13: 50-Item Identity Roster Verification
const rosterData = JSON.parse(fs.readFileSync(rosterPath, 'utf8'));
assertTest('Identity Roster contains exactly 50 records matching public feed', rosterData.records.length === 50);
assertTest('Identity Roster verified field facts count equals 0', rosterData.roster_cardinality.verified_field_facts_count === 0);

// Test 14: Voucher Hub State Verification
const voucherHubData = JSON.parse(fs.readFileSync(voucherHubPath, 'utf8'));
assertTest('Voucher Hub state is CHƯA_CÓ_VOUCHER_ĐỦ_CHỨNG_CỨ', voucherHubData.hub_state === 'CHƯA_CÓ_VOUCHER_ĐỦ_CHỨNG_CỨ');
assertTest('Voucher Hub displays strictly 0 vouchers', voucherHubData.security_guarantees && voucherHubData.security_guarantees.total_vouchers_displayed === 0);
assertTest('Voucher Hub saved searches exist for 5 key student needs', voucherHubData.saved_searches_by_need && voucherHubData.saved_searches_by_need.length === 5);

// Test 15: No-Write Attestation
const noWriteData = JSON.parse(fs.readFileSync(attestationPath, 'utf8'));
assertTest('No-Write Attestation confirms zero AccessTrade integration', noWriteData.contract_guarantees && noWriteData.contract_guarantees.accesstrade_integration_enabled === false);
assertTest('No-Write Attestation confirms zero active affiliate links', noWriteData.contract_guarantees && noWriteData.contract_guarantees.affiliate_links_active_count === 0);
assertTest('No-Write Attestation confirms zero quarantined JPEGs active in runtime', noWriteData.contract_guarantees && noWriteData.contract_guarantees.quarantined_jpegs_active_in_runtime === 0);
assertTest('No-Write Attestation confirms zero photographer CC strings active in runtime', noWriteData.contract_guarantees && noWriteData.contract_guarantees.photographer_cc_strings_in_runtime === 0);
assertTest('No-Write Attestation confirms zero unverified injected facts in runtime', noWriteData.contract_guarantees && noWriteData.contract_guarantees.unverified_injected_facts_in_runtime === 0);

// Test 16: Ledger Fingerprint Verification
const ledgerBuf = fs.readFileSync(ledgerPath);
const actualLedgerSha256 = crypto.createHash('sha256').update(ledgerBuf).digest('hex');
const countContract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
assertTest('Count Contract matches disk ledger SHA-256 fingerprint', countContract.ledger_fingerprint && countContract.ledger_fingerprint.ledger_sha256 === actualLedgerSha256);

// Test 17: HTML Content & Fingerprint Verifications
const scriptMatches = htmlContent.match(/<script src="jayt_storefront_staging_em\.js"><\/script>/g) || [];
assertTest('Single script reference in index.html (no duplicates)', scriptMatches.length === 1);
assertTest('Version string is v3.467.0-staging.em', htmlContent.includes('v3.467.0-staging.em'));
assertTest('HTML body contains data-ledger-version="v3.467.0-staging.em"', htmlContent.includes('data-ledger-version="v3.467.0-staging.em"'));
assertTest('HTML body contains data-ledger-sha256 fingerprint', htmlContent.includes(`data-ledger-sha256="${actualLedgerSha256}"`));
assertTest('HTML pre-rendered text contains "14 Điểm tham quan & rạp chiếu"', htmlContent.includes('14 Điểm tham quan & rạp chiếu'));
assertTest('HTML pre-rendered text contains "13 Tiện ích công cộng TP. Đà Nẵng"', htmlContent.includes('13 Tiện ích công cộng TP. Đà Nẵng'));
assertTest('Drawer element #jayt-drawer-root exists in HTML', htmlContent.includes('id="jayt-drawer-root"'));

console.log('\n------------------------------------------------------------------------');
console.log(`📊 Result: ${passedTests} / ${totalTests} Tests Passed`);
console.log('------------------------------------------------------------------------\n');

// Copy test file to QA directory in workspace
const qaDest = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE/test_section_em_static_contract.js');
fs.copyFileSync(__filename, qaDest);
console.log(`✅ Saved QA test script -> ${qaDest}`);

if (passedTests === totalTests) {
  console.log('🎉 SECTION EM STATIC, 16-FIELD ATTEMPT SCHEMA & AVAILABILITY PASS (100%)\n');
  process.exit(0);
} else {
  console.error('💥 SECTION EM STATIC CONTRACT FAILED!\n');
  process.exit(1);
}
