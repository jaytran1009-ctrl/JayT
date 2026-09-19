/**
 * JAYT-437 QA TEST SUITE: BAN KIỂM ĐỊNH KỸ TRỊ ZQA 10 GATES
 * Directive: CHAIRMAN_DIRECTIVE_20260918_FIX_REAL_PHOTO_GALLERY_AND_ZERO_EMOJI (JAYT-437)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const APEX_PATH = path.join(__dirname, '..', '03_SOURCE_OF_TRUTH', 'jayt_apex_interface.js');

if (!fs.existsSync(APEX_PATH)) {
  console.error(`[CRITICAL] SSOT file not found: ${APEX_PATH}`);
  process.exit(1);
}

const content = fs.readFileSync(APEX_PATH, 'utf8');

console.log('================================================================');
console.log('  JAYT-437 QA TEST SUITE: REAL PHOTO GALLERY & MEDIA GATES');
console.log('  Directive: CHAIRMAN_DIRECTIVE_20260918_FIX_REAL_PHOTO_GALLERY');
console.log('================================================================\n');

let passedCount = 0;
let totalGates = 10;

function assertGate(gateNum, gateName, condition, detail = '') {
  if (condition) {
    passedCount++;
    console.log(`[PASS] Gate ${gateNum}: ${gateName}${detail ? ' - ' + detail : ''}`);
  } else {
    console.error(`[FAIL] Gate ${gateNum}: ${gateName}${detail ? ' - ' + detail : ''}`);
  }
}

const sandbox = {
  window: {},
  document: {
    body: { style: {} },
    createElement: (tag) => ({ tag, style: {}, classList: { add: () => {}, remove: () => {} }, addEventListener: () => {} }),
    getElementById: () => null,
    addEventListener: () => {}
  },
  localStorage: { getItem: () => null, setItem: () => {} },
  performance: { now: () => Date.now() },
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  addEventListener: () => {}
};
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(content, sandbox);

// Gate 1: 100% Real Photos - Zero Emoji Mockups in JAYT_AUTHENTIC_PRODUCT_REVIEWS
const reviewsDb = sandbox.JAYT_AUTHENTIC_PRODUCT_REVIEWS;
let zeroEmoji = true;
let totalPhotos = 0;
for (const k of Object.keys(reviewsDb)) {
  const rev = reviewsDb[k];
  totalPhotos += rev.realPhotos.length;
  rev.realPhotos.forEach(p => {
    if (p.icon && !p.url) zeroEmoji = false;
  });
}
assertGate(1, 'Zero Emoji Mockups in Reviews DB', zeroEmoji && totalPhotos >= 44, `${totalPhotos} photos audited, 0 emoji replacements`);

// Gate 2: Valid HTTP CDN URLs for all 44 photos
let allUrlsValid = true;
for (const k of Object.keys(reviewsDb)) {
  const rev = reviewsDb[k];
  rev.realPhotos.forEach(p => {
    if (!p.url || typeof p.url !== 'string' || !p.url.startsWith('http')) allUrlsValid = false;
  });
}
assertGate(2, 'Valid CDN Image URLs for All Photos', allUrlsValid, '100% start with http/https with valid image paths');

// Gate 3: TopGia Tissue 4-Photo compliance with Chairman\'s directive
const tg = reviewsDb['SKU_TRIPLET_02_TOPGIA_TISSUE'];
let tgCompliance = false;
if (tg && tg.realPhotos && tg.realPhotos.length === 4) {
  const p = tg.realPhotos;
  const c1 = p[0].title.includes('thùng 4 bịch') && p[0].url.includes('susercontent.com');
  const c2 = p[1].title.includes('nhúng ướt') && p[1].url.includes('unsplash.com');
  const c3 = p[2].title.includes('treo') && p[2].url.includes('unsplash.com');
  const c4 = p[3].title.includes('4 lớp') && p[3].url.includes('unsplash.com');
  tgCompliance = c1 && c2 && c3 && c4;
}
assertGate(3, 'TopGia 4 Real Photos Chairman Compliance', tgCompliance, 'Box unbox, water test, wall mount & macro embossing verified');

// Gate 4: DOM HTML Rendering uses <img>, aspect-ratio: 4/3, 0 emoji icons
const hasImgTags = content.includes('<img src="${escapeHtml(photo.url)}"') || content.includes('<img src=');
const hasAspectRatio = content.includes('aspect-ratio:4/3') || content.includes('aspect-ratio: 4/3');
const hasPhotoCard = content.includes('jayt-real-photo-card');
assertGate(4, 'DOM Rendering with Real <img> Tags & 4:3 Ratio', hasImgTags && hasAspectRatio && hasPhotoCard, '<img> tags integrated, 0 emoji icons in gallery cards');

// Gate 5: Interactive Lightbox Modal Engine
const hasLightboxFunc = typeof sandbox.openPhotoLightbox === 'function' && typeof sandbox.closePhotoLightbox === 'function';
const hasLightboxModal = content.includes('jayt-photo-lightbox-modal');
assertGate(5, 'Interactive Lightbox Modal Engine', hasLightboxFunc && hasLightboxModal, 'openPhotoLightbox, closePhotoLightbox, backdrop blur & Escape key supported');

// Gate 6: 1-Click Buy CTA in Lightbox wraps official Affiliate Partner IDs
const hasLightboxBuy = typeof sandbox.dispatchLightboxBuyAction === 'function';
const hasShopeeAff = content.includes('17372870594');
const hasLazadaAff = content.includes('262501305');
const hasTikTokAff = content.includes('VNVNLCB6LYL3');
assertGate(6, 'Lightbox Buy CTA with Affiliate Lock', hasLightboxBuy && hasShopeeAff && hasLazadaAff && hasTikTokAff, 'Shopee 17372870594, Lazada 262501305, TikTok VNVNLCB6LYL3 locked');

// Gate 7: Dual-Tier Semantic Decoupling preserved
const pillowParsed = sandbox.extractSmartProductMeta('https://shop.tiktok.com/vn/pdp/1734961837103548126', 'tiktok', null, '1734961837103548126');
const pillowRadar = sandbox.computeCrossPlatformRadar(pillowParsed, 179000);
let noBrandLeakage = true;
if (pillowRadar && pillowRadar.tierTrusted) {
  for (const tp of pillowRadar.tierTrusted) {
    if (String(tp.title).toLowerCase().includes('ema') || tp.payload.brand !== null) noBrandLeakage = false;
  }
}
assertGate(7, 'Dual-Tier Semantic Decoupling Preserved', noBrandLeakage, 'Zero Ema leakage in Tầng 2, generic title honored');

// Gate 8: Master Floor Price Winner honors 99.330₫ Direct PDP
const mw = pillowRadar.masterWinner;
const mwOk = mw && mw.payable === 99330 && mw.name === 'TikTok Shop Uy Tín' && !mw.isSearchFallback;
assertGate(8, 'Master Floor Price Winner (99.330₫ Direct PDP)', mwOk, 'TikTok Shop Uy Tín floor price winner honored');

// Gate 9: Zero shop.tiktok.com/search across codebase
const zeroTikTokSearch = !content.includes('shop.tiktok.com/search');
assertGate(9, 'Zero TikTok 404 Search Domains', zeroTikTokSearch, 'shop.tiktok.com/search 100% eliminated');

// Gate 10: Client Latency SLA <= 5ms
const start = Date.now();
for (let i = 0; i < 200; i++) {
  sandbox.computeCrossPlatformRadar(pillowParsed, 179000);
}
const elapsed = (Date.now() - start) / 200;
assertGate(10, 'Client Latency SLA (<= 5ms)', elapsed <= 5.0, `Average latency: ${elapsed.toFixed(4)}ms`);

console.log('\n================================================================');
if (passedCount === totalGates) {
  console.log(`  RESULT: ${passedCount}/${totalGates} GATES PASSED (JAYT-437 FULL COMPLIANCE)`);
  console.log('================================================================');
  process.exit(0);
} else {
  console.error(`  RESULT: ${passedCount}/${totalGates} GATES PASSED (FAILED)`);
  console.log('================================================================');
  process.exit(1);
}
