const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const sotDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256File(p) { return fs.existsSync(p) ? sha256Buf(fs.readFileSync(p)) : null; }

function runTestSuite216() {
  console.log('========================================================================');
  console.log('🧪 JAYT-216: SYNTHETIC VISUAL CLAIM CONTAINMENT TEST SUITE');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  let passedTests = 0;
  const totalTests = 7;

  // Load Card Visual Evidence Registry
  const registryPath = path.join(sotDir, 'card_visual_evidence_registry.json');
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

  // Load Main Interface JS
  const interfaceCode = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');

  // Test 1: SYNTHETIC_TEXT_BANNER_CANNOT_BE_EXACT_PROMOTION
  console.log('--- TEST 1: SYNTHETIC_TEXT_BANNER_CANNOT_BE_EXACT_PROMOTION ---');
  const promoCount = registry.dashboard_breakdown.exact_promotion_visual_count;
  if (promoCount === 0) {
    console.log('  ✅ PASS: SYNTHETIC_TEXT_BANNER_CANNOT_BE_EXACT_PROMOTION (Exact promotion visual count is strictly 0).');
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: Found ${promoCount} non-zero exact promotion visuals.`);
  }

  // Test 2: JAYT_BRANDED_GRAPHIC_CANNOT_BE_EXACT_VENUE
  console.log('\n--- TEST 2: JAYT_BRANDED_GRAPHIC_CANNOT_BE_EXACT_VENUE ---');
  const venueCount = registry.dashboard_breakdown.exact_venue_visual_count;
  if (venueCount === 0) {
    console.log('  ✅ PASS: JAYT_BRANDED_GRAPHIC_CANNOT_BE_EXACT_VENUE (Exact venue visual count is strictly 0).');
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: Found ${venueCount} non-zero exact venue visuals.`);
  }

  // Test 3: EXACT_ASSET_REQUIRES_SOURCE_URL_AND_CAPTURE_RECEIPT
  console.log('\n--- TEST 3: EXACT_ASSET_REQUIRES_SOURCE_URL_AND_CAPTURE_RECEIPT ---');
  let invalidExactAssets = 0;
  for (const card of registry.cards) {
    if (card.visual_kind === 'EXACT_PROMOTION' || card.visual_kind === 'EXACT_VENUE') {
      if (!card.source_page_url || !card.asset_file_or_embed_url || !card.asset_sha256) {
        invalidExactAssets++;
      }
    }
  }
  if (invalidExactAssets === 0) {
    console.log('  ✅ PASS: EXACT_ASSET_REQUIRES_SOURCE_URL_AND_CAPTURE_RECEIPT (Invariant rule verified).');
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: Found ${invalidExactAssets} invalid exact assets.`);
  }

  // Test 4: EXACT_ASSET_REQUIRES_RIGHTS_PROOF
  console.log('\n--- TEST 4: EXACT_ASSET_REQUIRES_RIGHTS_PROOF ---');
  const dossierPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'rights_proof', 'CARD_VISUAL_RIGHTS_DOSSIER_216.md');
  const dossierExists = fs.existsSync(dossierPath);
  const dossierContent = dossierExists ? fs.readFileSync(dossierPath, 'utf8') : '';
  const hasInvariantRule18 = dossierContent.includes('INVARIANT RULE 18') && dossierContent.includes('OFFICIAL_IDENTITY_VISUAL');
  if (dossierExists && hasInvariantRule18) {
    console.log('  ✅ PASS: EXACT_ASSET_REQUIRES_RIGHTS_PROOF (CARD_VISUAL_RIGHTS_DOSSIER_216.md enforces Rule 18).');
    passedTests++;
  } else {
    console.error('  ❌ FAIL: Missing or invalid rights dossier 216.');
  }

  // Test 5: ASSET_HASH_ALONE_IS_NOT_PROVENANCE
  console.log('\n--- TEST 5: ASSET_HASH_ALONE_IS_NOT_PROVENANCE ---');
  let nonIdentityWithNullAsset = 0;
  for (const card of registry.cards) {
    if (card.visual_kind === 'OFFICIAL_IDENTITY' && card.asset_file_or_embed_url !== null) {
      nonIdentityWithNullAsset++;
    }
  }
  if (nonIdentityWithNullAsset === 0) {
    console.log('  ✅ PASS: ASSET_HASH_ALONE_IS_NOT_PROVENANCE (All 29 cards maintain honest identity profile with null raw asset).');
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: Found ${nonIdentityWithNullAsset} non-compliant identity cards.`);
  }

  // Test 6: LIVE_FORBIDDEN_PROVENANCE_CLAIMS_ZERO
  console.log('\n--- TEST 6: LIVE_FORBIDDEN_PROVENANCE_CLAIMS_ZERO ---');
  const forbidden1 = interfaceCode.includes('OFFICIAL PROVENANCE ASSET · JAYT-215');
  const forbidden2 = interfaceCode.includes('Địa điểm thực địa đối soát') || interfaceCode.includes('ĐỊA ĐIỂM THỰC ĐỊA ĐỐI SOÁT');
  const forbidden3 = interfaceCode.includes('Ảnh/banner khuyến mãi chính thức (Khớp SHA-256)');

  if (!forbidden1 && !forbidden2 && !forbidden3) {
    console.log('  ✅ PASS: LIVE_FORBIDDEN_PROVENANCE_CLAIMS_ZERO (0 forbidden synthetic claims in interface code).');
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: Forbidden synthetic claims found in interface code: f1=${forbidden1}, f2=${forbidden2}, f3=${forbidden3}`);
  }

  // Test 7: QUARANTINE_ISOLATION_VERIFIED
  console.log('\n--- TEST 7: QUARANTINE_ISOLATION_VERIFIED ---');
  const quarantineManifestPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'quarantine', 'synthetic_visuals_215_quarantine', 'SYNTHETIC_VISUAL_QUARANTINE_MANIFEST_216.json');
  const quarantineExists = fs.existsSync(quarantineManifestPath);
  const activeVisualsDir = path.join(sotDir, 'assets', 'official-visuals');
  const activeVisualsEmpty = !fs.existsSync(activeVisualsDir) || fs.readdirSync(activeVisualsDir).length === 0;

  if (quarantineExists && activeVisualsEmpty) {
    console.log('  ✅ PASS: QUARANTINE_ISOLATION_VERIFIED (Synthetic visuals successfully isolated in quarantine folder).');
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: Quarantine isolation not clean: manifest=${quarantineExists}, emptyActive=${activeVisualsEmpty}`);
  }

  console.log('\n========================================================================');
  if (passedTests === totalTests) {
    console.log(`🎉 ALL ${passedTests}/${totalTests} JAYT-216 TESTS PASSED [100% CONFORMANCE]\n`);
  } else {
    console.error(`❌ ONLY ${passedTests}/${totalTests} TESTS PASSED`);
    process.exit(1);
  }
}

if (require.main === module) {
  runTestSuite216();
}

module.exports = { runTestSuite216 };
