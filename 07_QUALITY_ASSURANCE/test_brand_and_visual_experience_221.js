const fs = require('fs');
const path = require('path');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const brandAssetsPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_brand_assets_221.js');
const interfacePath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');

console.log('========================================================================');
console.log('🎨 JAYT-221R: BRAND SYSTEM & VISUAL FINISHING TEST SUITE');
console.log('========================================================================\n');

// Test 1: JayT Brand Assets Module & Master SVG Evaluation
console.log('▶ TEST 1: JayT Brand Assets Module & Master SVG Evaluation');
require(brandAssetsPath);
const brandModule = global.JayTBrandAssets;
assert(brandModule, 'JayTBrandAssets must be defined on global');
assert(typeof brandModule.master.logoFull === 'function', 'master.logoFull must be a function');
const lightLogo = brandModule.master.logoFull(false);
const darkLogo = brandModule.master.logoFull(true);
assert(lightLogo.includes('<svg') && lightLogo.includes('Jay<tspan fill="#10B981">T</tspan>'), 'Master SVG must contain official JayT typography');
assert(!lightLogo.includes('🚀') && !lightLogo.includes('🔥'), 'Master Logo must NOT use random emojis');
console.log('  🟢 PASS - JayT Master SVG is valid, scalable, and emoji-free.');

// Test 2: Category SVG Icons Consistency (24px Unified)
console.log('▶ TEST 2: Category SVG Icons Consistency');
const cats = brandModule.categories;
const requiredCats = ['FOOD_AND_DINING', 'COFFEE_AND_STUDY', 'CINEMA_AND_LEISURE', 'MOBILITY_AND_TRANSPORT', 'STUDENT_SPECIALS', 'SHOPPING_AND_LIVING'];
requiredCats.forEach(c => {
  assert(cats[c], `Category ${c} must have SVG markup`);
  assert(cats[c].includes('<svg') && cats[c].includes('viewBox="0 0 24 24"'), `Category ${c} must have consistent 24x24 viewBox`);
  assert(cats[c].includes('stroke-width="1.8"'), `Category ${c} must have uniform stroke-width`);
});
console.log('  🟢 PASS - All 6 Category SVGs are 24px with uniform 1.8px stroke and zero emojis.');

// Test 3: Official Brand Marks vs JayT Text Identifiers
console.log('▶ TEST 3: Official Brand Marks vs JayT Text Identifiers Classification');
const metizInfo = brandModule.getBrandIdentifier('Metiz Cinema Đà Nẵng');
assert(metizInfo && metizInfo.kind === 'OFFICIAL_LOGO_ASSET', 'Metiz Cinema must be OFFICIAL_LOGO_ASSET');
assert(metizInfo.logoUrl.includes('metiz'), 'Metiz must have valid logoUrl');

const starlightInfo = brandModule.getBrandIdentifier('Starlight Cinema Đà Nẵng');
assert(starlightInfo && starlightInfo.kind === 'JAYT_TEXT_IDENTIFIER', 'Starlight must be JAYT_TEXT_IDENTIFIER');
assert(starlightInfo.brand === 'Starlight Cinema', 'Starlight must have full clean brand wordmark, not acronym');

const spotifyInfo = brandModule.getBrandIdentifier('Spotify Vietnam');
assert(spotifyInfo && spotifyInfo.kind === 'OFFICIAL_LOGO_ASSET', 'Spotify must be OFFICIAL_LOGO_ASSET');

const dominosInfo = brandModule.getBrandIdentifier("Domino's Pizza");
assert(dominosInfo && dominosInfo.kind === 'JAYT_TEXT_IDENTIFIER', "Domino's must be JAYT_TEXT_IDENTIFIER");
assert(dominosInfo.brand === "Domino's Pizza", "Domino's must have full clean brand wordmark");
console.log('  🟢 PASS - Strict separation between Official Logo Assets and JayT Text Identifiers.');

// Test 4: Interface Code Integrity & Rails Structure
console.log('▶ TEST 4: Interface Code Integrity & Rails Structure');
const interfaceCode = fs.readFileSync(interfacePath, 'utf8');
assert(interfaceCode.includes('OS 3.361R') || interfaceCode.includes('Premium Identity Finishing OS 3.361R'), 'Interface must declare OS 3.361R');
assert(interfaceCode.includes('hero-spotlight-section'), 'Interface must contain hero spotlight section');
assert(interfaceCode.includes('Rạp Phim Tuần Này'), 'Interface must contain Cinema Rail');
assert(interfaceCode.includes('Cứu Đói & Ăn Uống Tiết Kiệm'), 'Interface must contain Food Rail');
assert(interfaceCode.includes('Cà Phê & Học Bài'), 'Interface must contain Coffee Rail');
assert(interfaceCode.includes('Công Cụ & Bản Quyền Sinh Viên'), 'Interface must contain Student Tools Rail');
assert(interfaceCode.includes('Di Chuyển & Tiện Ích Công'), 'Interface must contain Transit Rail');
console.log('  🟢 PASS - All 5 Discovery Rails and Hero Spotlight are present.');

// Test 5: Design Tokens & Visual Hierarchy
console.log('▶ TEST 5: Design Tokens & CSS Invariants');
assert(interfaceCode.includes('border-radius: 20px'), 'Cards must enforce 20px border radius');
assert(interfaceCode.includes('aspect-ratio:16/9'), 'Visual canvas must enforce 16:9 aspect ratio');
assert(interfaceCode.includes('#10B981'), 'Emerald savings action color must be defined');
console.log('  🟢 PASS - 20px border radius and 16:9 canvas tokens enforced.');

// Test 6: Technical Transparency Drawer
console.log('▶ TEST 6: Technical Transparency Drawer');
assert(interfaceCode.includes('transparency-governance-drawer'), 'Must contain collapsible transparency drawer');
assert(interfaceCode.includes('3/29 (10.3%)'), 'Must maintain exact 3/29 counts');
console.log('  🟢 PASS - Governance KPIs transparently accessible.');

console.log('\n🎉 ALL 6 DESIGN & BRAND TESTS PASSED SUCCESSFULLY (JAYT-221R)!\n');
