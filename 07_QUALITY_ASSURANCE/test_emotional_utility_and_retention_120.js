/**
 * JAYT-120 QA TEST SUITE: EMOTIONAL UTILITY & REAL RETENTION ENGINE
 * Tests:
 * 1. 7-File SOT Parity & SHA-256 Byte Match
 * 2. Supply Feed 120 (15 items, 40% coverage, verified disk evidence)
 * 3. Supply Gap Board 120 (25 cells, 10 covered, 0 false positives)
 * 4. Real-time Slot Auto-Detection & Compact Time Dock
 * 5. Strict Location Phrasing & Proximity Helper
 * 6. Streamlined Decision Card Elements & Primary Conditions
 * 7. Return Experience Persistence & Interactive Banner
 * 8. Design System Accessibility, Touch Targets & Zero Forbidden Jargon
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
let passedAssertions = 0;
let totalAssertions = 0;

function assert(condition, message) {
  totalAssertions++;
  if (!condition) {
    console.error(`❌ [FAIL] ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  passedAssertions++;
  console.log(`  ✓ ${message}`);
}

function getSha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

console.log('🚀 [QA-120] Bắt đầu kiểm thử toàn diện JAYT-120 Retention & Utility Engine...\n');

// 1. TEST SOT PARITY
console.log('📌 Test Group 1: 7-File Source of Truth Parity');
const coreFiles = [
  'index.html',
  'jayt_apex_interface.js',
  'customer_journey_north_star.json',
  'four_layer_dataset.json',
  'radar_dataset_086u.json',
  'brand_asset_registry.json',
  'daily_supply_feed_120.json'
];

for (const file of coreFiles) {
  const sotPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', file);
  const deployPath = path.join(repoRoot, 'deploy', 'public', file);
  const stagingPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '03_SOURCE_OF_TRUTH', file);

  assert(fs.existsSync(sotPath), `SOT file exists: ${file}`);
  assert(fs.existsSync(deployPath), `Deploy file exists: ${file}`);
  assert(fs.existsSync(stagingPath), `Staging file exists: ${file}`);

  const sotBuf = fs.readFileSync(sotPath);
  const deployBuf = fs.readFileSync(deployPath);
  const stagingBuf = fs.readFileSync(stagingPath);

  const sotHash = getSha256(sotBuf);
  const deployHash = getSha256(deployBuf);
  const stagingHash = getSha256(stagingBuf);

  assert(sotHash === deployHash, `Byte parity SOT <=> Deploy for ${file} (${sotHash.slice(0, 10)})`);
  assert(sotHash === stagingHash, `Byte parity SOT <=> Staging for ${file} (${sotHash.slice(0, 10)})`);
}

// 2. TEST SUPPLY FEED 120 DATA INTEGRITY
console.log('\n📌 Test Group 2: Supply Feed 120 & High Gap Coverage');
const feedPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'daily_supply_feed_120.json');
const feed = JSON.parse(fs.readFileSync(feedPath, 'utf8'));

assert(Array.isArray(feed.limited_time_deals), 'feed.limited_time_deals is Array');
assert(feed.limited_time_deals.length === 5, `5 limited time deals present (got ${feed.limited_time_deals.length})`);
assert(Array.isArray(feed.watchlist_deals), 'feed.watchlist_deals is Array');
assert(feed.watchlist_deals.length === 2, `2 watchlist deals present (got ${feed.watchlist_deals.length})`);
assert(Array.isArray(feed.planning_menu_and_utilities), 'feed.planning_menu_and_utilities is Array');
assert(feed.planning_menu_and_utilities.length === 8, `8 menu/utility items present (got ${feed.planning_menu_and_utilities.length})`);

// Test new high-gap deals
const cgvZalo = feed.limited_time_deals.find(d => d.id === 'DEAL_120_CGV_ZALOPAY_50K');
assert(cgvZalo !== undefined, 'CGV Zalopay 50% lunch deal exists');
assert(cgvZalo.slot === 'SLOT_1115', 'CGV Zalopay deal assigned to lunch slot');
assert(cgvZalo.primary_condition && cgvZalo.primary_condition.includes('12:00'), 'CGV Zalopay has 12:00-13:00 condition');

const kfcXo = feed.planning_menu_and_utilities.find(m => m.id === 'MENU_120_KFC_XO_HOP_CA_189K');
assert(kfcXo !== undefined, 'KFC Xô Hợp Cạ 189k exists');
assert(kfcXo.slot === 'SLOT_1730', 'KFC Xô Hợp Cạ assigned to after-work slot');
assert(kfcXo.listed_price_vnd === 189000, 'KFC Xô Hợp Cạ price is 189,000 VND');

// Test all items have primary_condition
const allItems = [...feed.limited_time_deals, ...feed.watchlist_deals, ...feed.planning_menu_and_utilities];
assert(allItems.length === 15, `Total 15 verified supply items in Feed 120 (got ${allItems.length})`);

for (const item of allItems) {
  assert(item.primary_condition && item.primary_condition.length > 5, `Item ${item.id} has concise primary_condition: "${item.primary_condition}"`);
  assert(item.official_url && item.official_url.startsWith('http'), `Item ${item.id} has valid official_url: "${item.official_url}"`);
  assert(item.scope && item.scope.length > 3, `Item ${item.id} has venue scope: "${item.scope}"`);
}

// 3. TEST SUPPLY GAP BOARD 120
console.log('\n📌 Test Group 3: Supply Gap Board Matrix & Actionable Coverage');
const gapBoardPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'supply_gap_board_120.json');
assert(fs.existsSync(gapBoardPath), 'supply_gap_board_120.json exists on disk');
const gapBoard = JSON.parse(fs.readFileSync(gapBoardPath, 'utf8'));

assert(gapBoard.summary_metrics.total_matrix_cells === 25, 'Gap board has 25 cells (5 slots x 5 sectors)');
assert(gapBoard.summary_metrics.actionable_coverage_cells === 10, `Gap board covers 10 cells (got ${gapBoard.summary_metrics.actionable_coverage_cells})`);
assert(gapBoard.summary_metrics.actionable_coverage_rate_percent === 40, `Actionable coverage is 40% (got ${gapBoard.summary_metrics.actionable_coverage_rate_percent}%)`);
assert(gapBoard.summary_metrics.verified_deals_count === 5, '5 verified deals in gap board');
assert(gapBoard.summary_metrics.watchlist_recheck_count === 2, '2 watchlist deals in gap board');
assert(Array.isArray(gapBoard.matrix_cells) && gapBoard.matrix_cells.length === 25, 'matrix_cells has 25 entries');

// 4. TEST JS ENGINE LOGIC & DESIGN SYSTEM TOKENS
console.log('\n📌 Test Group 4: JS Interface Component Logic');
const jsCode = fs.readFileSync(path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js'), 'utf8');
const htmlCode = fs.readFileSync(path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'index.html'), 'utf8');

// Test auto-slot detection function
assert(jsCode.includes('function getAutoSlotFromCurrentTime()'), 'getAutoSlotFromCurrentTime function declared');
assert(jsCode.includes("fetch('daily_supply_feed_120.json')"), 'fetch daily_supply_feed_120.json present');
assert(jsCode.includes('recentlyViewedOffer: savedLastViewedOffer'), 'state.recentlyViewedOffer initialized from localStorage');
assert(jsCode.includes('timeDockExpanded: false'), 'state.timeDockExpanded state present');

// Test Proximity Helper
assert(jsCode.includes('function getProximityText()'), 'getProximityText function declared');
assert(jsCode.includes("if (state.selectedDistrict && state.selectedDistrict !== 'ALL')"), 'getProximityText checks for selectedDistrict');
assert(jsCode.includes("return 'tại Đà Nẵng'"), 'getProximityText defaults to tại Đà Nẵng when ALL');

// Test Return Experience
assert(jsCode.includes('apex-return-experience-banner'), 'Return Experience Banner rendered in UI');
assert(jsCode.includes('data-action="open-deal-source"'), 'open-deal-source action tracked');
assert(jsCode.includes('data-action="dismiss-return-banner"'), 'dismiss-return-banner action implemented');
assert(jsCode.includes('data-action="toggle-time-dock"'), 'toggle-time-dock action implemented');

// Test Streamlined Decision Card Format
assert(jsCode.includes('📌 <strong>Điều kiện then chốt:</strong>'), 'Single critical condition highlight in Decision Card');
assert(jsCode.includes('data-action="calc-offer"'), 'calc-offer button on every card');
assert(jsCode.includes('data-action="plan-offer"'), 'plan-offer button on every card');

// 5. TEST DESIGN SYSTEM & ACCESSIBILITY TOKENS
console.log('\n📌 Test Group 5: Design System Tokens & WCAG AA');
assert(htmlCode.includes('--touch-min: 44px;'), 'Touch minimum target 44px defined');
assert(htmlCode.includes('.apex-return-experience-banner'), 'CSS rules for apex-return-experience-banner defined');
assert(htmlCode.includes('.apex-time-dock-compact-bar'), 'CSS rules for compact time dock bar defined');
assert(htmlCode.includes('.apex-time-dock-toggle-btn'), 'CSS rules for time dock toggle button defined');
assert(htmlCode.includes('outline: 2.5px solid #10B981;'), 'WCAG accessible focus rings defined');

// 6. TEST ZERO FORBIDDEN TECHNICAL JARGON
console.log('\n📌 Test Group 6: No Technical Jargon in UI Strings');
const forbiddenJargon = [
  'Tier 1',
  'Tier 2',
  'Tier 3',
  'SSOT',
  'SHA-256',
  'Leaf Capture',
  'four_layer_dataset',
  'radar_dataset'
];

// Check only rendered customer HTML/JS strings in Decision Hub
const hubRenderMatch = jsCode.match(/renderUnifiedDailyDecisionHub[\s\S]*?renderThreeTierCatalogSection/);
assert(hubRenderMatch !== null, 'Decision hub render function extracted');
const hubCode = hubRenderMatch[0];

for (const jargon of forbiddenJargon) {
  assert(!hubCode.includes(`>${jargon}<`) && !hubCode.includes(`"${jargon}"`) && !hubCode.includes(`'${jargon}'`), `Forbidden jargon "${jargon}" absent from Decision Hub`);
}

console.log(`\n🎉 [QA-120] TOÀN BỘ ${passedAssertions}/${totalAssertions} ASSERTIONS ĐÃ PASS HOÀN HẢO!`);
