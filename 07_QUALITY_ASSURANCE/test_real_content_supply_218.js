const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const sotDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');
const { verifyRealContentSupply } = require('./verify_real_content_supply_218');

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256File(p) { return fs.existsSync(p) ? sha256Buf(fs.readFileSync(p)) : null; }

function runTestSuite218() {
  console.log('========================================================================');
  console.log('🧪 JAYT-218: REAL CONTENT SUPPLY TEST SUITE');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  let passedTests = 0;
  const totalTests = 6;

  const registry = JSON.parse(fs.readFileSync(path.join(sotDir, 'card_visual_evidence_registry.json'), 'utf8'));
  const cards = registry.cards || [];

  // Test 1: VERIFIED_EXACT_ASSETS_INCREASED_ABOVE_MILESTONE
  console.log('--- TEST 1: VERIFIED_EXACT_ASSETS_INCREASED_ABOVE_MILESTONE ---');
  const exactCount = registry.dashboard_breakdown.verified_exact_visuals_count;
  if (exactCount >= 6) {
    console.log(`  ✅ PASS: VERIFIED_EXACT_ASSETS_INCREASED_ABOVE_MILESTONE (Verified: ${exactCount}/29 >= 6).`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: Verified exact count is ${exactCount}, less than 6.`);
  }

  // Test 2: EXACT_PROMOTION_VISUALS_COUNT
  console.log('\n--- TEST 2: EXACT_PROMOTION_VISUALS_COUNT (MIN >= 3) ---');
  const promoCards = cards.filter(c => c.tier === 'TIER_BLUE_OFFICIAL' && c.visual_kind === 'VERIFIED_EXACT');
  if (promoCards.length >= 3) {
    console.log(`  ✅ PASS: EXACT_PROMOTION_VISUALS_COUNT (Found ${promoCards.length} verified promotion visuals >= 3).`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: Found only ${promoCards.length} verified promo visuals.`);
  }

  // Test 3: EXACT_VENUE_VISUALS_COUNT
  console.log('\n--- TEST 3: EXACT_VENUE_VISUALS_COUNT (MIN >= 3) ---');
  const venueCards = cards.filter(c => c.tier === 'TIER_PURPLE_VERIFIED_VENUE' && c.visual_kind === 'VERIFIED_EXACT');
  if (venueCards.length >= 3) {
    console.log(`  ✅ PASS: EXACT_VENUE_VISUALS_COUNT (Found ${venueCards.length} verified venue visuals >= 3).`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: Found only ${venueCards.length} verified venue visuals.`);
  }

  // Test 4: PHYSICAL_BYTE_INTEGRITY_AND_SHA256
  console.log('\n--- TEST 4: PHYSICAL_BYTE_INTEGRITY_AND_SHA256 ---');
  let validHashes = 0;
  for (const c of cards) {
    if (c.visual_kind === 'VERIFIED_EXACT') {
      const assetPath = path.join(sotDir, c.asset_file_or_embed_url);
      const computedSha = sha256File(assetPath);
      if (computedSha && computedSha === c.asset_sha256) {
        validHashes++;
      }
    }
  }
  if (validHashes === exactCount && exactCount > 0) {
    console.log(`  ✅ PASS: PHYSICAL_BYTE_INTEGRITY_AND_SHA256 (All ${validHashes}/${exactCount} verified files match SHA-256).`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: Only ${validHashes}/${exactCount} files matched SHA-256.`);
  }

  // Test 5: ZERO_SYNTHETIC_OVERCLAIMS
  console.log('\n--- TEST 5: ZERO_SYNTHETIC_OVERCLAIMS ---');
  const interfaceCode = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');
  const forbidden1 = interfaceCode.includes('OFFICIAL PROVENANCE ASSET · JAYT-215');
  const forbidden2 = interfaceCode.includes('Địa điểm thực địa đối soát') || interfaceCode.includes('ĐỊA ĐIỂM THỰC ĐỊA ĐỐI SOÁT');

  if (!forbidden1 && !forbidden2) {
    console.log('  ✅ PASS: ZERO_SYNTHETIC_OVERCLAIMS (0 forbidden synthetic claims).');
    passedTests++;
  } else {
    console.error('  ❌ FAIL: Forbidden synthetic claims found.');
  }

  // Test 6: RELEASE_GATE_STATUS
  console.log('\n--- TEST 6: RELEASE_GATE_STATUS ---');
  const gateRes = verifyRealContentSupply();
  if (gateRes.status === 'VERIFIED AND LIVE') {
    console.log(`  ✅ PASS: RELEASE_GATE_STATUS (Status is "${gateRes.status}").`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: Release gate returned ${gateRes.status}`);
  }

  console.log('\n========================================================================');
  if (passedTests === totalTests) {
    console.log(`🎉 ALL ${passedTests}/${totalTests} JAYT-218 TESTS PASSED [100% CONFORMANCE]\n`);
  } else {
    console.error(`❌ ONLY ${passedTests}/${totalTests} TESTS PASSED`);
    process.exit(1);
  }
}

if (require.main === module) {
  runTestSuite218();
}

module.exports = { runTestSuite218 };
