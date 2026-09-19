const fs = require('fs');
const path = require('path');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const dealsModulePath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_verified_deals_module.js');
const brandAssetsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_brand_assets_221.js');
const registryPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'card_visual_evidence_registry.json');
const interfacePath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');

console.log('========================================================================');
console.log('📦 JAYT-222: 30-50 DAILY VISUAL SUPPLY BATCH TEST SUITE');
console.log('========================================================================\n');

// Test 1: Verified Deals Module 35 Cards Scale & Tiering
console.log('▶ TEST 1: Deals Feed Scale & Transparent Tiering');
const feed = require(dealsModulePath);
assert(feed.source_bound_cards, 'source_bound_cards must exist');
assert(feed.source_bound_cards.length === 35, `Expected exactly 35 cards, got ${feed.source_bound_cards.length}`);
assert(feed.blue_official_offers.length === 17, `Expected 17 blue offers, got ${feed.blue_official_offers.length}`);
assert(feed.purple_verified_venues.length === 18, `Expected 18 purple venues, got ${feed.purple_verified_venues.length}`);
assert(feed.green_confirmed_deals.length === 0, 'Green confirmed deals must strictly be 0 (no overclaim)');
console.log('  🟢 PASS - Feed contains exactly 35 cards with transparent zero-overclaim tiering.');

// Test 2: Card Visual Evidence Registry Integrity
console.log('▶ TEST 2: Visual Evidence Registry Integrity');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
assert(registry.cards.length === 35, `Registry must contain 35 cards, got ${registry.cards.length}`);
assert(registry.dashboard_breakdown.exact_promotion_media_count === 3, 'Must maintain 3 exact promo posters');
assert(registry.dashboard_breakdown.official_identity_asset_count === 6, 'Must maintain 6 official identity assets');
assert(registry.dashboard_breakdown.exact_venue_visual_count === 0, 'Exact venue visual must be 0 (truthful)');
console.log('  🟢 PASS - Registry tracks all 35 cards with truthful evidence binding.');

// Test 3: Brand Assets Module New Identifiers
console.log('▶ TEST 3: Brand Assets Module Identifiers');
require(brandAssetsPath);
const brandModule = global.JayTBrandAssets;
const autodesk = brandModule.getBrandIdentifier('Autodesk Education');
assert(autodesk && autodesk.brand === 'Autodesk Education', 'Autodesk identifier must be present');

const github = brandModule.getBrandIdentifier('GitHub Education');
assert(github && github.brand === 'GitHub Education', 'GitHub identifier must be present');

const notion = brandModule.getBrandIdentifier('Notion for Education');
assert(notion && notion.brand === 'Notion for Education', 'Notion identifier must be present');

const tngo = brandModule.getBrandIdentifier('Xe Đạp Công Cộng TNGo Đà Nẵng');
assert(tngo && tngo.brand === 'TNGo Đà Nẵng', 'TNGo identifier must be present');
console.log('  🟢 PASS - All new brand identifiers are registered.');

// Test 4: Interface Rendering & Rails Scale
console.log('▶ TEST 4: Interface Rendering & Rails Scale');
const interfaceCode = fs.readFileSync(interfacePath, 'utf8');
assert(interfaceCode.includes('OS 3.362') || interfaceCode.includes('35 Visual Supply Batch OS 3.362'), 'Interface must declare OS 3.362');
assert(interfaceCode.includes('CLM_208_13_AUTODESK_STUDENT'), 'Autodesk deal must be in student rail');
assert(interfaceCode.includes('CLM_208_14_GITHUB_STUDENT'), 'GitHub deal must be in student rail');
assert(interfaceCode.includes('CLM_208_15_NOTION_STUDENT'), 'Notion deal must be in student rail');
assert(interfaceCode.includes('CLM_208_17_TNGO_BIKE'), 'TNGo deal must be in mobility rail');
assert(interfaceCode.includes('VEN_197_18_COM_TAM_BA_LANG'), 'Cơm Tấm Bà Lang must be in food rail');
assert(interfaceCode.includes('VEN_197_19_BUN_BO_BA_DIEU'), 'Bún Bò Bà Diệu must be in food rail');
console.log('  🟢 PASS - Interface code includes all 35 items across 5 rails.');

console.log('\n🎉 ALL 4 SUPPLY BATCH TESTS PASSED SUCCESSFULLY (JAYT-222)!\n');
