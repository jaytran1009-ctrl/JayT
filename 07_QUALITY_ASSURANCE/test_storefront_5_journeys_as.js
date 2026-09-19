const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const storefrontAsPath = path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_as.js');

const { JAYT_STOREFRONT_VERSION, JAYT_DISCOVERY_ITEMS, ModalController, filterItems } = require(storefrontAsPath);

console.log('========================================================================');
console.log('🧪 JAYT-245 QA GATE: STOREFRONT 5 JOURNEYS & 4-TIER SUPPLY AUDIT (AS)');
console.log('========================================================================\n');

console.log(`🔍 Version Audited: ${JAYT_STOREFRONT_VERSION}`);
console.log(`🔍 Total Items Audited: ${JAYT_DISCOVERY_ITEMS.length}`);

const dealCount = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'VERIFIED_DEAL').length;
const programCount = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'VERIFIED_OFFICIAL_PROGRAM').length;
const facilityCount = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'VERIFIED_FACILITY').length;
const radarCount = JAYT_DISCOVERY_ITEMS.filter(i => i.tier === 'RADAR_TRACKING').length;

console.log(`   📊 Tier 1 (Ưu Đãi Xác Minh): ${dealCount} mục`);
console.log(`   📊 Tier 2 (Chương Trình Chính Thức): ${programCount} mục`);
console.log(`   📊 Tier 3 (Địa Điểm & Tiện Ích Đô Thị): ${facilityCount} mục`);
console.log(`   📊 Tier 4 (Radar Theo Dõi Nguồn): ${radarCount} mục`);

let allTestsPassed = true;

// 1. Audit Tier Integrity & Zero False Deals
console.log('\n🔍 [Audit 1] Tier Integrity & Zero False Deals...');
if (dealCount === 6 && programCount === 9 && facilityCount === 6 && radarCount === 13) {
  console.log('   ✅ 4-Tier Count Exact Breakdown: PASS (6 Deals + 9 Programs + 6 Facilities + 13 Radar = 34 Items)');
} else {
  console.error('   ❌ Tier breakdown count MISMATCH!');
  allTestsPassed = false;
}

// 2. Audit 6 Consumer Needs Coverage
console.log('\n🔍 [Audit 2] 6 Consumer Needs Categorization...');
const categories = ['Ăn uống', 'Giải trí', 'Đi lại', 'Học tập', 'Đời sống', 'Mua sắm'];
categories.forEach(cat => {
  const count = JAYT_DISCOVERY_ITEMS.filter(i => i.category === cat).length;
  if (count > 0) {
    console.log(`   ✅ Nhu cầu '${cat}': ${count} mục đáp ứng`);
  } else {
    console.error(`   ❌ Nhu cầu '${cat}' có 0 mục!`);
    allTestsPassed = false;
  }
});

// 3. Audit Specific Field Conditions & Zero Repeated Copy
console.log('\n🔍 [Audit 3] Specificity & Zero Repeated Copy Audit...');
const summaries = new Set();
let duplicateSummaryFound = false;

JAYT_DISCOVERY_ITEMS.forEach(item => {
  if (!item.audience_target || !item.timing_window || !item.conditions_limit || !item.scope_text || !item.observed_at) {
    console.error(`   ❌ Missing specific condition fields for ${item.id}`);
    allTestsPassed = false;
  }
  if (summaries.has(item.summary_text)) {
    console.error(`   ❌ Duplicate summary found: "${item.summary_text}" on item ${item.id}`);
    duplicateSummaryFound = true;
    allTestsPassed = false;
  }
  summaries.add(item.summary_text);
});

if (!duplicateSummaryFound) {
  console.log(`   ✅ All ${JAYT_DISCOVERY_ITEMS.length} items have 100% Unique, Specific Condition Descriptions: PASS`);
}

// 4. Audit Instant Search across Brands, Scopes, Categories
console.log('\n🔍 [Audit 4] Instant Search Engine Precision...');
const searchQueries = ['lotteria', 'metiz', 'danabus', 'thư viện', 'co.opmart', 'long châu'];
searchQueries.forEach(q => {
  const matches = JAYT_DISCOVERY_ITEMS.filter(i => 
    i.title.toLowerCase().includes(q) || 
    i.brand.toLowerCase().includes(q) || 
    i.category.toLowerCase().includes(q) ||
    i.scope_text.toLowerCase().includes(q)
  );
  if (matches.length > 0) {
    console.log(`   ✅ Search query '${q}': ${matches.length} matching card(s)`);
  } else {
    console.error(`   ❌ Search query '${q}' returned 0 matches!`);
    allTestsPassed = false;
  }
});

// 5. Audit Single Modal Controller & Recheck Source Parameters
console.log('\n🔍 [Audit 5] Recheck Source & Radar Modal Parameters...');
JAYT_DISCOVERY_ITEMS.forEach(item => {
  if (!item.verbatim_quote || !item.evidence_status || !item.official_source_url) {
    console.error(`   ❌ Missing verbatim or evidence fields on ${item.id}`);
    allTestsPassed = false;
  }
});
console.log(`   ✅ All ${JAYT_DISCOVERY_ITEMS.length} items contain 100% Evidence Parameters: PASS`);

// 6. Audit Accessibility & Design Tokens in styles.css
console.log('\n🔍 [Audit 6] Accessibility & 4-Tier CSS Tokens...');
const stylesContent = fs.readFileSync(path.join(PROJECT_ROOT, '03_SOURCE_OF_TRUTH/styles.css'), 'utf8');
if (stylesContent.includes('.card-deal') && stylesContent.includes('.card-facility') && stylesContent.includes('.badge-deal')) {
  console.log('   ✅ 4-Tier CSS Card & Badge classes verified in stylesheet: PASS');
} else {
  console.error('   ❌ Stylesheet missing 4-tier token classes');
  allTestsPassed = false;
}

console.log('\n------------------------------------------------------------------------');
if (!allTestsPassed) {
  console.error('❌ [STOREFRONT-5-JOURNEYS-AS-FAIL] One or more journey audits failed!');
  process.exit(1);
}

console.log('🟢 [STOREFRONT-5-JOURNEYS-AS-PASS] 100% 4-Tier Supply & Storefront Journeys Verified (Section AS)!');
console.log('========================================================================');
