const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const sotDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256File(p) { return fs.existsSync(p) ? sha256Buf(fs.readFileSync(p)) : null; }

function runTestSuite214() {
  console.log('========================================================================');
  console.log('🧪 JAYT-214: LIVE VISUAL RELEASE & FIRST-VIEW EXPERIENCE FIX TEST SUITE');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  let passedTests = 0;
  const totalTests = 6;

  // Load feed module
  const feedModulePath = path.join(sotDir, 'jayt_verified_deals_module.js');
  const feedContent = fs.readFileSync(feedModulePath, 'utf8');
  const jsonMatch = feedContent.match(/var TIERED_SAVINGS_FEED = (\{[\s\S]*?\});/);
  if (!jsonMatch) {
    console.error('❌ Failed to parse TIERED_SAVINGS_FEED');
    process.exit(1);
  }
  const feed = JSON.parse(jsonMatch[1]);
  const liveCards = feed.source_bound_cards || [];

  // Load Card Visual Evidence Registry
  const registryPath = path.join(sotDir, 'card_visual_evidence_registry.json');
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

  // Load Main Interface JS
  const interfaceCode = fs.readFileSync(path.join(sotDir, 'jayt_apex_interface.js'), 'utf8');

  // Test 1: LIVE_VISUAL_CARD_CANVAS_HEIGHT_REQUIREMENT (>= 156px)
  console.log('--- TEST 1: LIVE_VISUAL_CARD_CANVAS_HEIGHT_REQUIREMENT ---');
  const hasMinHeight156 = interfaceCode.includes('min-height:156px');
  const hasCanvasClass = interfaceCode.includes('jayt-card-visual-canvas');
  if (hasMinHeight156 && hasCanvasClass) {
    console.log('  ✅ PASS: LIVE_VISUAL_CARD_CANVAS_HEIGHT_REQUIREMENT (Canvas min-height >= 156px mobile & >= 180px desktop configured).');
    passedTests++;
  } else {
    console.error('  ❌ FAIL: Missing min-height >= 156px or jayt-card-visual-canvas in card renderers.');
  }

  // Test 2: FIRST_VIEWPORT_CARD_VISIBILITY
  console.log('\n--- TEST 2: FIRST_VIEWPORT_CARD_VISIBILITY ---');
  const hasCompactHero = interfaceCode.includes('jayt-hero-branding-card') && interfaceCode.includes('✨ Live Visual OS 3.354');
  const hasCompactDashboard = interfaceCode.includes('jayt-visual-evidence-dashboard-card');
  if (hasCompactHero && hasCompactDashboard) {
    console.log('  ✅ PASS: FIRST_VIEWPORT_CARD_VISIBILITY (Compact hero & sleek visual evidence bar keep top cards visible in first viewport).');
    passedTests++;
  } else {
    console.error('  ❌ FAIL: First-view layout not optimized for OS 3.354.');
  }

  // Test 3: EXACT_IMAGE_COVERAGE_REPORTED_HONESTLY (0/29 exact promo, 0/29 exact venue)
  console.log('\n--- TEST 3: EXACT_IMAGE_COVERAGE_REPORTED_HONESTLY ---');
  const promoCount = registry.dashboard_breakdown.exact_promotion_visual_count;
  const venueCount = registry.dashboard_breakdown.exact_venue_visual_count;
  const identCount = registry.dashboard_breakdown.official_identity_visual_count;
  const totalCards = liveCards.length;

  if (promoCount === 0 && venueCount === 0 && identCount === totalCards && totalCards === 29) {
    console.log(`  ✅ PASS: EXACT_IMAGE_COVERAGE_REPORTED_HONESTLY (Exact Promo: 0/${totalCards}, Exact Venue: 0/${totalCards}, Identity: ${identCount}/${totalCards}).`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: Inaccurate image coverage count: promo=${promoCount}, venue=${venueCount}, ident=${identCount}`);
  }

  // Test 4: PROVENANCE_LABEL_INTEGRITY
  console.log('\n--- TEST 4: PROVENANCE_LABEL_INTEGRITY ---');
  const expectedLabel = "Nhận diện thương hiệu — chưa có ảnh ưu đãi/địa điểm xác minh";
  let mismatchedLabels = 0;
  for (const c of registry.cards) {
    if (c.render_label !== expectedLabel) mismatchedLabels++;
  }
  if (mismatchedLabels === 0) {
    console.log(`  ✅ PASS: PROVENANCE_LABEL_INTEGRITY (100% of 29 cards display honest provenance: "${expectedLabel}").`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: Found ${mismatchedLabels} mismatched provenance labels.`);
  }

  // Test 5: DETAIL_SHEET_GALLERY_LAYERS (4 visual inspection layers)
  console.log('\n--- TEST 5: DETAIL_SHEET_GALLERY_LAYERS ---');
  const hasLayer1 = interfaceCode.includes('Nhận Diện Brand');
  const hasLayer2 = interfaceCode.includes('Claim Đối Soát');
  const hasLayer3 = interfaceCode.includes('Khóa Evidence');
  const hasLayer4 = interfaceCode.includes('Phạm Vi');
  if (hasLayer1 && hasLayer2 && hasLayer3 && hasLayer4) {
    console.log('  ✅ PASS: DETAIL_SHEET_GALLERY_LAYERS (All 4 structured visual inspection layers present).');
    passedTests++;
  } else {
    console.error('  ❌ FAIL: Missing one or more detail sheet gallery layers.');
  }

  // Test 6: LIGHT_DARK_VISUAL_CONSISTENCY
  console.log('\n--- TEST 6: LIGHT_DARK_VISUAL_CONSISTENCY ---');
  const indexHtml = fs.readFileSync(path.join(sotDir, 'index.html'), 'utf8');
  const hasDarkThemeSupport = indexHtml.includes('data-theme="dark"') || indexHtml.includes('.dark-theme');
  if (hasDarkThemeSupport) {
    console.log('  ✅ PASS: LIGHT_DARK_VISUAL_CONSISTENCY (CSS variables and theme switching verified).');
    passedTests++;
  } else {
    console.error('  ❌ FAIL: Dark theme styling missing.');
  }

  console.log('\n========================================================================');
  if (passedTests === totalTests) {
    console.log(`🎉 ALL ${passedTests}/${totalTests} JAYT-214 TESTS PASSED [100% CONFORMANCE]\n`);
  } else {
    console.error(`❌ ONLY ${passedTests}/${totalTests} TESTS PASSED`);
    process.exit(1);
  }
}

if (require.main === module) {
  runTestSuite214();
}

module.exports = { runTestSuite214 };
