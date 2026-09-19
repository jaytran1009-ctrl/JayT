const fs = require('fs');
const path = require('path');
const { validateFieldProvenance, sha256Buffer } = require('./provenance_validator_engine');

/**
 * JAYT-245 SECTION AI: REAL MUTATION TEST & ALL-RENDERED-FIELDS VALIDATOR SUITE
 * Complete audit of all 9 verified items + Manifest-to-Build Parity + 10 adversarial mutations.
 */

console.log('========================================================================');
console.log('🛡️ JAYT-245 QA GATE: REAL MUTATION & ALL-FIELD VALIDATOR SUITE (AI)');
console.log('========================================================================\n');

function runRealMutationSuite() {
  const PROJECT_ROOT = path.resolve(__dirname, '..');
  const DATA_DIR = path.join(PROJECT_ROOT, '04_DATA_PIPELINE');
  const SOT_DIR = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH');
  const MANIFEST_FILE = path.join(DATA_DIR, 'field_provenance_manifest_ai.json');
  const INTERFACE_FILE = path.join(SOT_DIR, 'jayt_apex_interface.js');

  let allPass = true;

  // 1. Audit All 9 Verified Items in Manifest against Real Vault Artifacts
  console.log('🔍 [Phase 1] Auditing All 9 Real Manifest Items against Real Raw Vault...');
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf8'));

  manifest.verified_official_programs.forEach(item => {
    const rcPath = path.join(PROJECT_ROOT, item.receipt_file);
    const rawPath = path.join(PROJECT_ROOT, item.raw_payload_file);

    if (!fs.existsSync(rcPath)) {
      console.error(`   ❌ Receipt missing for ${item.item_id}: ${item.receipt_file}`);
      allPass = false;
      return;
    }
    if (!fs.existsSync(rawPath)) {
      console.error(`   ❌ Raw payload missing for ${item.item_id}: ${item.raw_payload_file}`);
      allPass = false;
      return;
    }

    const rc = JSON.parse(fs.readFileSync(rcPath, 'utf8'));
    const rawBuf = fs.readFileSync(rawPath);

    const valRes = validateFieldProvenance(item, rc, rawBuf);
    if (valRes.valid) {
      console.log(`   ✅ ${item.item_id} ("${item.fields.title.value}" | Brand: "${item.fields.brand.value}"): 100% PASS [Hash: ${item.raw_sha256.substring(0, 16)}..., Bytes: ${rawBuf.length}, UTF16 Offset: ${item.fields.title.offset_start}]`);
    } else {
      console.error(`   ❌ ${item.item_id} failed validator:`, valRes.errors);
      allPass = false;
    }
  });

  // 2. Manifest -> Build Data Parity Check
  console.log('\n🔄 [Phase 2] Auditing Manifest -> Build Data Parity (jayt_apex_interface.js)...');
  const jsContent = fs.readFileSync(INTERFACE_FILE, 'utf8');
  const matchItems = jsContent.match(/const JAYT_DISCOVERY_ITEMS = (\[[\s\S]*?\]);/);
  if (!matchItems) {
    console.error('   ❌ Could not parse JAYT_DISCOVERY_ITEMS in jayt_apex_interface.js');
    allPass = false;
  } else {
    const buildItems = eval(matchItems[1]);
    manifest.verified_official_programs.forEach(mItem => {
      const bItem = buildItems.find(b => b.id === mItem.item_id);
      if (!bItem) {
        console.error(`   ❌ Missing build item for manifest ID ${mItem.item_id}`);
        allPass = false;
        return;
      }
      if (bItem.title !== mItem.fields.title.value) {
        console.error(`   ❌ Title mismatch for ${mItem.item_id}: build "${bItem.title}" vs manifest "${mItem.fields.title.value}"`);
        allPass = false;
      }
      if (bItem.brand !== mItem.fields.brand.value) {
        console.error(`   ❌ Brand mismatch for ${mItem.item_id}: build "${bItem.brand}" vs manifest "${mItem.fields.brand.value}"`);
        allPass = false;
      }
      if (bItem.category !== mItem.fields.category.value) {
        console.error(`   ❌ Category mismatch for ${mItem.item_id}: build "${bItem.category}" vs manifest "${mItem.fields.category.value}"`);
        allPass = false;
      }
      if (bItem.summary_text !== mItem.fields.summary_text.value) {
        console.error(`   ❌ Summary mismatch for ${mItem.item_id}`);
        allPass = false;
      }
    });
    console.log('   ✅ 100% Manifest-to-Build Parity Verified across all 9 verified items!');
  }

  // Base real fixture for mutations (AWS Educate)
  const baseItem = manifest.verified_official_programs.find(i => i.item_id === 'TGT_B_11');
  const baseRc = JSON.parse(fs.readFileSync(path.join(PROJECT_ROOT, baseItem.receipt_file), 'utf8'));
  const baseRawBuf = fs.readFileSync(path.join(PROJECT_ROOT, baseItem.raw_payload_file));

  // 3. Mutation Testing Suite (10 Real Adversarial Mutations on Section AI)
  console.log('\n🧪 [Phase 3] Running 10 Adversarial Mutations on Real Artifacts (Section AI)...');

  // Mutation 1: Acronym Expansion in Brand without Approved Transform (AWS -> Amazon Web Services)
  const mut1 = JSON.parse(JSON.stringify(baseItem));
  mut1.fields.brand.value = 'Amazon Web Services'; // Expanded acronym without transform
  mut1.fields.brand.exact_quote = 'AWS';
  const resMut1 = validateFieldProvenance(mut1, baseRc, baseRawBuf);
  if (!resMut1.valid && resMut1.errors.some(e => e.includes('Brand LITERAL_EXACT mapping failure'))) {
    console.log('   ✅ Mutation 1 (Unproven Acronym Expansion in Brand): REJECTED fail-closed.');
  } else {
    console.error('   ❌ Mutation 1 FAILED to be caught!');
    allPass = false;
  }

  // Mutation 2: Category Outside Approved Allowlist
  const mut2 = JSON.parse(JSON.stringify(baseItem));
  mut2.fields.category.value = 'Bất Hợp Pháp';
  const resMut2 = validateFieldProvenance(mut2, baseRc, baseRawBuf);
  if (!resMut2.valid && resMut2.errors.some(e => e.includes('not in approved allowlist'))) {
    console.log('   ✅ Mutation 2 (Category Outside Allowlist): REJECTED fail-closed.');
  } else {
    console.error('   ❌ Mutation 2 FAILED to be caught!');
    allPass = false;
  }

  // Mutation 3: Non-Existent Source Span in Summary
  const mut3 = JSON.parse(JSON.stringify(baseItem));
  mut3.fields.summary_text.supporting_source_span = 'Non-Existent Synthetic Phantom Span 99999';
  const resMut3 = validateFieldProvenance(mut3, baseRc, baseRawBuf);
  if (!resMut3.valid && resMut3.errors.some(e => e.includes('not found in raw payload'))) {
    console.log('   ✅ Mutation 3 (Non-Existent Source Span in Summary): REJECTED fail-closed.');
  } else {
    console.error('   ❌ Mutation 3 FAILED to be caught!');
    allPass = false;
  }

  // Mutation 4: UTF-16 Code Unit Offset Mismatch
  const mut4 = JSON.parse(JSON.stringify(baseItem));
  mut4.fields.title.offset_start = 9999999;
  const resMut4 = validateFieldProvenance(mut4, baseRc, baseRawBuf);
  if (!resMut4.valid && resMut4.errors.some(e => e.includes('offset mismatch'))) {
    console.log('   ✅ Mutation 4 (UTF-16 Offset Mismatch): REJECTED fail-closed.');
  } else {
    console.error('   ❌ Mutation 4 FAILED to be caught!');
    allPass = false;
  }

  // Mutation 5: Sensitive Header Key set-cookie Present in Receipt
  const rcLeaking = JSON.parse(JSON.stringify(baseRc));
  rcLeaking.redirect_chain[0].headers['set-cookie'] = 'any_token';
  const resMut5 = validateFieldProvenance(baseItem, rcLeaking, baseRawBuf);
  if (!resMut5.valid && resMut5.errors.some(e => e.includes('Sensitive header key "set-cookie" exposed'))) {
    console.log('   ✅ Mutation 5 (Sensitive Header Key "set-cookie" Present): REJECTED fail-closed.');
  } else {
    console.error('   ❌ Mutation 5 FAILED to be caught!');
    allPass = false;
  }

  // Mutation 6: Content-Length Mismatch with Raw Buffer
  const rcLengthMismatch = JSON.parse(JSON.stringify(baseRc));
  rcLengthMismatch.content_length_bytes = 12345;
  const resMut6 = validateFieldProvenance(baseItem, rcLengthMismatch, baseRawBuf);
  if (!resMut6.valid && resMut6.errors.some(e => e.includes('Content-length mismatch'))) {
    console.log('   ✅ Mutation 6 (Content-Length Mismatch): REJECTED fail-closed.');
  } else {
    console.error('   ❌ Mutation 6 FAILED to be caught!');
    allPass = false;
  }

  // Mutation 7: Invalid Offset Convention Declaration
  const mut7 = JSON.parse(JSON.stringify(baseItem));
  mut7.offset_convention = 'arbitrary_fake_offset';
  const resMut7 = validateFieldProvenance(mut7, baseRc, baseRawBuf);
  if (!resMut7.valid && resMut7.errors.some(e => e.includes('Invalid offset convention'))) {
    console.log('   ✅ Mutation 7 (Invalid Offset Convention Declaration): REJECTED fail-closed.');
  } else {
    console.error('   ❌ Mutation 7 FAILED to be caught!');
    allPass = false;
  }

  // Mutation 8: Canonical URL Mismatch
  const mut8 = JSON.parse(JSON.stringify(baseItem));
  mut8.canonical_url = 'https://phishing-domain.fake/pack';
  const resMut8 = validateFieldProvenance(mut8, baseRc, baseRawBuf);
  if (!resMut8.valid && resMut8.errors.some(e => e.includes('Canonical URL mismatch'))) {
    console.log('   ✅ Mutation 8 (Canonical URL Mismatch): REJECTED fail-closed.');
  } else {
    console.error('   ❌ Mutation 8 FAILED to be caught!');
    allPass = false;
  }

  // Mutation 9: Tampered SHA-256
  const rcTampered = JSON.parse(JSON.stringify(baseRc));
  rcTampered.raw_sha256 = '0000000000000000000000000000000000000000000000000000000000000000';
  const resMut9 = validateFieldProvenance(baseItem, rcTampered, baseRawBuf);
  if (!resMut9.valid && resMut9.errors.some(e => e.includes('SHA-256 mismatch'))) {
    console.log('   ✅ Mutation 9 (Tampered SHA-256): REJECTED fail-closed.');
  } else {
    console.error('   ❌ Mutation 9 FAILED to be caught!');
    allPass = false;
  }

  // Mutation 10: Synthetic Pricing Injected into Radar
  const radarMut = {
    item_id: 'TGT_RADAR_01',
    tier: 'RADAR_TRACKING',
    offset_convention: 'utf16_code_unit_offset',
    fields: { price_claim: { value: '99.000 VNĐ' } }
  };
  const resMut10 = validateFieldProvenance(radarMut, baseRc, baseRawBuf);
  if (!resMut10.valid && resMut10.errors.some(e => e.includes('Radar item cannot contain pricing claims'))) {
    console.log('   ✅ Mutation 10 (Synthetic Pricing in Radar): REJECTED fail-closed.');
  } else {
    console.error('   ❌ Mutation 10 FAILED to be caught!');
    allPass = false;
  }

  console.log('------------------------------------------------------------------------');
  if (!allPass) {
    console.error('❌ [REAL-MUTATION-SUITE-FAIL] One or more validations failed!');
    process.exit(1);
  }

  console.log('🟢 [REAL-MUTATION-SUITE-PASS] All 9 Verified Items, Build Parity & 10 Mutations 100% PASSED (Section AI)!');
  console.log('========================================================================');
}

runRealMutationSuite();
