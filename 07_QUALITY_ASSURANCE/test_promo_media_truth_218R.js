const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const sotDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256File(p) { return fs.existsSync(p) ? sha256Buf(fs.readFileSync(p)) : null; }

function runTestSuite218R() {
  console.log('========================================================================');
  console.log('🧪 JAYT-218R: PROMO MEDIA TRUTH TEST SUITE');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  let passedTests = 0;
  const totalTests = 6;

  const registry = JSON.parse(fs.readFileSync(path.join(sotDir, 'card_visual_evidence_registry.json'), 'utf8'));
  const cards = registry.cards || [];

  // Test 1: EXACT_PROMOTION_VISUALS_INCREASED
  console.log('--- TEST 1: EXACT_PROMOTION_VISUALS_INCREASED ---');
  const exactPromoCards = cards.filter(c => c.visual_kind === 'EXACT_PROMOTION');
  if (exactPromoCards.length === 3) {
    console.log(`  ✅ PASS: EXACT_PROMOTION_VISUALS_INCREASED (Found ${exactPromoCards.length}/29 verified promo posters).`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: Found ${exactPromoCards.length} promo posters instead of 3.`);
  }

  // Test 2: EXACT_VENUE_VISUALS_TRUTHFUL
  console.log('\n--- TEST 2: EXACT_VENUE_VISUALS_TRUTHFUL (NO LOGO OVERCLAIM) ---');
  const exactVenueCards = cards.filter(c => c.visual_kind === 'EXACT_VENUE');
  if (exactVenueCards.length === 0) {
    console.log('  ✅ PASS: EXACT_VENUE_VISUALS_TRUTHFUL (Exact venue visuals is 0/29 - truthfully awaiting scout field photos).');
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: Exact venue count is ${exactVenueCards.length} - logos must not be called venue photos.`);
  }

  // Test 3: OFFICIAL_IDENTITY_ASSETS_CLASSIFIED
  console.log('\n--- TEST 3: OFFICIAL_IDENTITY_ASSETS_CLASSIFIED ---');
  const identCards = cards.filter(c => c.visual_kind === 'OFFICIAL_IDENTITY_ASSET');
  if (identCards.length === 6) {
    console.log(`  ✅ PASS: OFFICIAL_IDENTITY_ASSETS_CLASSIFIED (Found ${identCards.length}/29 official brand logos/emblems).`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: Found ${identCards.length} identity assets instead of 6.`);
  }

  // Test 4: JAYT_IDENTITY_VISUALS_CLASSIFIED
  console.log('\n--- TEST 4: JAYT_IDENTITY_VISUALS_CLASSIFIED ---');
  const jaytCards = cards.filter(c => c.visual_kind === 'IDENTITY_VISUAL');
  if (jaytCards.length === 20) {
    console.log(`  ✅ PASS: JAYT_IDENTITY_VISUALS_CLASSIFIED (Found ${jaytCards.length}/29 standard identity canvases).`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: Found ${jaytCards.length} JayT identity visuals instead of 20.`);
  }

  // Test 5: PHYSICAL_BYTE_INTEGRITY_AND_SHA256
  console.log('\n--- TEST 5: PHYSICAL_BYTE_INTEGRITY_AND_SHA256 ---');
  let validHashes = 0;
  let totalWithFile = 0;
  for (const c of cards) {
    if (c.asset_file_or_embed_url) {
      totalWithFile++;
      const assetPath = path.join(sotDir, c.asset_file_or_embed_url);
      const computedSha = sha256File(assetPath);
      if (computedSha && computedSha === c.asset_sha256) {
        validHashes++;
      }
    }
  }
  if (validHashes === 9 && totalWithFile === 9) {
    console.log(`  ✅ PASS: PHYSICAL_BYTE_INTEGRITY_AND_SHA256 (All ${validHashes}/9 visual assets match SHA-256 on disk).`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: Only ${validHashes}/${totalWithFile} files matched SHA-256.`);
  }

  // Test 6: ZERO_SYNTHETIC_OVERCLAIMS
  console.log('\n--- TEST 6: ZERO_SYNTHETIC_OVERCLAIMS ---');
  const interfaceCode = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');
  const forbidden1 = interfaceCode.includes('OFFICIAL PROVENANCE ASSET · JAYT-215');
  const forbidden2 = interfaceCode.includes('Địa điểm thực địa đối soát') || interfaceCode.includes('ĐỊA ĐIỂM THỰC ĐỊA ĐỐI SOÁT');

  if (!forbidden1 && !forbidden2) {
    console.log('  ✅ PASS: ZERO_SYNTHETIC_OVERCLAIMS (0 forbidden synthetic claims).');
    passedTests++;
  } else {
    console.error('  ❌ FAIL: Forbidden synthetic claims found.');
  }

  console.log('\n========================================================================');
  if (passedTests === totalTests) {
    console.log(`🎉 ALL ${passedTests}/${totalTests} JAYT-218R TESTS PASSED [100% CONFORMANCE]\n`);
  } else {
    console.error(`❌ ONLY ${passedTests}/${totalTests} TESTS PASSED`);
    process.exit(1);
  }
}

if (require.main === module) {
  runTestSuite218R();
}

module.exports = { runTestSuite218R };
