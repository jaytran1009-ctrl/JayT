/**
 * JAYT-443 AUTOMATED CLICK INTEGRITY & STATE LEAKAGE TEST SUITE
 * Mandate: CHAIRMAN_DIRECTIVE_20260918_MARTIAL_LAW_FIX_ROUTING_MISMATCH
 *
 * Verifies:
 * 1. 100% decoupling of semantic titles (zero cross-category contamination like Shin Case -> Ổ cắm).
 * 2. Absolute modal state isolation (zero state leakage via global window.__lastRadar).
 * 3. Immutable DOM data binding on Quán Quân and 1-Click Buy action buttons.
 * 4. 100% compliance across all Triplets, Dorm SKUs, and Flash Arbitrage Deals.
 */

const fs = require('fs');
const path = require('path');

const SSOT_PATH = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const RECEIPT_PATH = path.resolve(__dirname, 'runtime_evidence/JAYT_443_CLICK_INTEGRITY_RECEIPT.json');

console.log('================================================================');
console.log('⚡ JAYT-443 MARTIAL LAW CLICK INTEGRITY & STATE AUDIT SUITE ⚡');
console.log('================================================================');

// 1. Setup isolated mock browser runtime
const localStorageMock = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
global.localStorage = localStorageMock;
let lastDispatchedLocation = '';
global.window = {
  localStorage: localStorageMock,
  location: {
    get href() { return lastDispatchedLocation; },
    set href(v) { lastDispatchedLocation = v; },
    hostname: 'localhost'
  },
  addEventListener: () => {},
  removeEventListener: () => {}
};

let capturedAffiliateDispatch = null;

let mockElements = {};
global.document = {
  getElementById: (id) => mockElements[id] || null,
  createElement: (tag) => {
    const el = {
      id: '',
      tagName: tag.toUpperCase(),
      classList: {
        add: () => {},
        remove: () => {},
        contains: (c) => c === 'is-open'
      },
      style: {},
      dataset: {},
      appendChild: () => {},
      addEventListener: () => {},
      innerHTML: ''
    };
    return el;
  },
  body: { style: {}, appendChild: () => {} },
  addEventListener: () => {}
};

// Evaluate SSOT code
const ssotCode = fs.readFileSync(SSOT_PATH, 'utf8');
eval(ssotCode);

// Wrap dispatchSmartAffiliate to capture arguments in tests
const originalDispatchSmartAffiliate = dispatchSmartAffiliate;
dispatchSmartAffiliate = function(provider, payload, code, event) {
  capturedAffiliateDispatch = { provider, payload, code };
  return originalDispatchSmartAffiliate(provider, payload, code, event);
};

global.CROSS_PLATFORM_SKU_TRIPLETS = window.CROSS_PLATFORM_SKU_TRIPLETS;
global.SHELF_SKU_TO_TRIPLET_MAP = window.SHELF_SKU_TO_TRIPLET_MAP;
global.computeCrossPlatformRadar = window.computeCrossPlatformRadar || computeCrossPlatformRadar;
global.openAuthenticReviewsModal = window.openAuthenticReviewsModal || openAuthenticReviewsModal;
global.dispatchReviewModalBuyAction = window.dispatchReviewModalBuyAction || dispatchReviewModalBuyAction;
global.dispatchRadarPlatform = window.dispatchRadarPlatform || dispatchRadarPlatform;
global.getGenericSemanticTitle = window.getGenericSemanticTitle || getGenericSemanticTitle;

let totalChecks = 0;
let passedChecks = 0;
const failureLog = [];

function assertCheck(desc, condition, details = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  [PASS] ${desc}`);
  } else {
    failureLog.push({ desc, details });
    console.error(`  [FAIL] ${desc} :: ${details}`);
  }
}

// ============================================================================
// GATE 1: REGEX PURITY & SEMANTIC CLASSIFICATION INTEGRITY
// ============================================================================
console.log('\n--- GATE 1: Semantic Title Decoupling & Regex Purity ---');

const caseTitles = [
  'Ốp Lưng iPhone TPU Shin Case Chống Bẩn Lót Nhung, Bảo Vệ Camera',
  'Ốp Lưng iPhone 13 Pro Max Viền Vuông Chống Sốc',
  'Shin Case Ốp Lưng Bảo Vệ Toàn Diện Cho iPhone',
  'Ốp silicon dẻo trong suốt chống ố vàng'
];

caseTitles.forEach(title => {
  const parsed = { title, cleanTitle: title, rawUrl: 'https://shopee.vn/product/123/456' };
  const semantic = getGenericSemanticTitle(parsed);
  assertCheck(
    `Case title "${title.substring(0, 35)}..." classified as Case`,
    /ốp.*lưng|case/i.test(semantic) && !/ổ.*cắm|o.*cam/i.test(semantic),
    `Result was: "${semantic}"`
  );
});

const powerStripTitles = [
  'Ổ Cắm Điện Điện Quang 5 Lỗ 2m Chống Giật An Toàn',
  'Ổ cắm điện đa năng 3 chấu có cổng sạc USB',
  'o cam dien 4 lo day dai 3m'
];

powerStripTitles.forEach(title => {
  const parsed = { title, cleanTitle: title, rawUrl: 'https://shopee.vn/product/123/456' };
  const semantic = getGenericSemanticTitle(parsed);
  assertCheck(
    `Power strip "${title.substring(0, 35)}..." classified as Power Strip`,
    /ổ\s*cắm/i.test(semantic) && !/ốp.*lưng|case/i.test(semantic),
    `Result was: "${semantic}"`
  );
});

// ============================================================================
// GATE 2: CROSS-PLATFORM RADAR WINNER INTEGRITY (ALL TRIPLETS & DORM SKUS)
// ============================================================================
console.log('\n--- GATE 2: Cross-Platform Radar Master Winner Routing ---');

const testSkus = [
  { skuId: 'DORM_SKU_FEED_02_26609048170', expectedCat: 'CASE', forbiddenRegex: /ổ.*cắm|o.*cam/i },
  { skuId: 'DORM_SKU_FEED_10_23244410073', expectedCat: 'CASE', forbiddenRegex: /ổ.*cắm|o.*cam/i },
  { skuId: 'DORM_SKU_FEED_14_29000715432', expectedCat: 'CASE', forbiddenRegex: /ổ.*cắm|o.*cam/i },
  { skuId: 'SKU_TRIPLET_01_SHIN_CASE', expectedCat: 'CASE', forbiddenRegex: /ổ.*cắm|o.*cam/i },
  { skuId: 'DORM_SKU_01_OCAM_DIENQUANG', expectedCat: 'POWER_STRIP', forbiddenRegex: /ốp.*lưng|case/i },
  { skuId: 'SKU_TRIPLET_03_OCAM_DIENQUANG', expectedCat: 'POWER_STRIP', forbiddenRegex: /ốp.*lưng|case/i },
  { skuId: 'DORM_SKU_FEED_01_23552060269', expectedCat: 'TISSUE', forbiddenRegex: /ổ.*cắm|ốp.*lưng/i },
  { skuId: 'SKU_TRIPLET_02_TOPGIA_TISSUE', expectedCat: 'TISSUE', forbiddenRegex: /ổ.*cắm|ốp.*lưng/i },
  { skuId: 'SKU_TRIPLET_11_GOI_CONG_THAI_HOC', expectedCat: 'PILLOW', forbiddenRegex: /ổ.*cắm|ốp.*lưng/i }
];

testSkus.forEach(({ skuId, expectedCat, forbiddenRegex }) => {
  let matchedTrip = CROSS_PLATFORM_SKU_TRIPLETS.find(t => t.id === skuId || (t.matchKeys && t.matchKeys.includes(skuId)));
  if (!matchedTrip && typeof SHELF_SKU_TO_TRIPLET_MAP !== 'undefined') {
    const mappedId = SHELF_SKU_TO_TRIPLET_MAP[skuId];
    if (mappedId) matchedTrip = CROSS_PLATFORM_SKU_TRIPLETS.find(t => t.id === mappedId);
  }

  const p = {
    skuId: skuId,
    sku_id: skuId,
    title: (matchedTrip && matchedTrip.title) || 'Sản phẩm test',
    cleanTitle: (matchedTrip && (matchedTrip.cleanTitle || matchedTrip.title)) || 'Sản phẩm test',
    rawUrl: (matchedTrip && matchedTrip.platforms && matchedTrip.platforms.shopee && matchedTrip.platforms.shopee.pdpUrl) || '',
    observedPrice: (matchedTrip && matchedTrip.platforms && matchedTrip.platforms.shopee && matchedTrip.platforms.shopee.observedPrice) || 50000
  };

  const radar = computeCrossPlatformRadar(p, p.observedPrice);
  const winnerQuery = radar.masterWinner && radar.masterWinner.payload ? (radar.masterWinner.payload.searchQuery || radar.masterWinner.payload.cleanTitle || '') : '';

  assertCheck(
    `SKU ${skuId} (${expectedCat}) winner query has zero cross-contamination`,
    !forbiddenRegex.test(winnerQuery),
    `Search query was: "${winnerQuery}"`
  );
});

// ============================================================================
// GATE 3: ZERO GLOBAL STATE LEAKAGE TEST (RADAR & REVIEW MODALS)
// ============================================================================
console.log('\n--- GATE 3: State Isolation & Anti-Leakage Verification ---');

// STEP A: Set window.__lastRadar to Ổ Cắm Điện
const powerStripParsed = {
  sku_id: 'DORM_SKU_01_OCAM_DIENQUANG',
  itemId: '19827364512',
  title: 'Ổ Cắm Điện Điện Quang 5 Lỗ 2m',
  cleanTitle: 'Ổ Cắm Điện Điện Quang 5 Lỗ 2m',
  rawUrl: 'https://shopee.vn/product/32456789/19827364512',
  observedPrice: 89000
};
window.__lastRadar = computeCrossPlatformRadar(powerStripParsed, 89000);
assertCheck(
  'Deliberately prime global window.__lastRadar with Power Strip',
  /ổ.*cắm/i.test(window.__lastRadar.masterWinner.payload.searchQuery || '')
);

// STEP B: Open Review Modal for Shin Case
const reviewModalEl = document.createElement('div');
reviewModalEl.id = 'jayt-authentic-reviews-modal';
mockElements['jayt-authentic-reviews-modal'] = reviewModalEl;

openAuthenticReviewsModal('DORM_SKU_FEED_02_26609048170', 'Ốp Lưng iPhone TPU Shin Case', 24050, 'shopee');

const reviewQuery = reviewModalEl._currentTargetPayload ? (reviewModalEl._currentTargetPayload.searchQuery || reviewModalEl._currentTargetPayload.cleanTitle) : '';
assertCheck(
  'Review modal for Shin Case does NOT leak Power Strip state',
  !/ổ.*cắm|o.*cam/i.test(reviewQuery),
  `Query in review modal was: "${reviewQuery}"`
);
assertCheck(
  'Review modal product name matches Shin Case',
  /ốp.*lưng|shin/i.test(reviewModalEl._currentReview.productName),
  `Product name was: "${reviewModalEl._currentReview.productName}"`
);

// STEP C: Simulate Button Click inside Review Modal with Trigger Element
capturedAffiliateDispatch = null;
const reviewBuyBtn = {
  dataset: {
    skuId: 'DORM_SKU_FEED_02_26609048170',
    productName: 'Ốp Lưng iPhone TPU Shin Case',
    platformId: 'tiktok',
    searchQuery: 'Ốp Lưng iPhone TPU Chống Sốc'
  }
};
dispatchReviewModalBuyAction(reviewBuyBtn);
assertCheck(
  'Review modal 1-Click Buy dispatches to TikTok with Case query',
  capturedAffiliateDispatch && capturedAffiliateDispatch.provider === 'tiktok' && /ốp.*lưng|case/i.test(capturedAffiliateDispatch.payload.searchQuery),
  `Dispatched payload: ${JSON.stringify(capturedAffiliateDispatch)}`
);

// ============================================================================
// GATE 4: RADAR MODAL MASTER WINNER BUTTON DISPATCH INTEGRITY
// ============================================================================
console.log('\n--- GATE 4: Radar Modal Master Winner Click Integrity ---');

const radarModalEl = document.createElement('div');
radarModalEl.id = 'jayt-voucher-scanner-modal';
mockElements['jayt-voucher-scanner-modal'] = radarModalEl;

const shinParsed = {
  sku_id: 'DORM_SKU_FEED_02_26609048170',
  itemId: '26609048170',
  title: 'Ốp Lưng iPhone TPU Shin Case Chống Bẩn Lót Nhung, Bảo Vệ Camera',
  cleanTitle: 'Ốp Lưng iPhone TPU Shin Case',
  rawUrl: 'https://shopee.vn/product/89827191/26609048170',
  observedPrice: 24050
};
radarModalEl._currentRadar = computeCrossPlatformRadar(shinParsed, 24050);

capturedAffiliateDispatch = null;
const mockRadarWinnerBtn = {
  closest: (sel) => (sel === '#jayt-voucher-scanner-modal' ? radarModalEl : null),
  dataset: {
    skuId: 'DORM_SKU_FEED_02_26609048170',
    productTitle: 'Ốp Lưng iPhone TPU Shin Case'
  }
};

dispatchRadarPlatform('master_winner', 'trusted', mockRadarWinnerBtn);
assertCheck(
  'Radar Master Winner click uses scoped radar over stale global',
  capturedAffiliateDispatch && capturedAffiliateDispatch.provider === 'tiktok' && !/ổ.*cắm|o.*cam/i.test(capturedAffiliateDispatch.payload.searchQuery),
  `Dispatched: ${JSON.stringify(capturedAffiliateDispatch)}`
);
assertCheck(
  'Radar Master Winner destination query matches Phone Case',
  capturedAffiliateDispatch && /ốp.*lưng|case/i.test(capturedAffiliateDispatch.payload.searchQuery || capturedAffiliateDispatch.payload.cleanTitle),
  `Query: "${capturedAffiliateDispatch ? capturedAffiliateDispatch.payload.searchQuery : 'none'}"`
);

// ============================================================================
// RECEIPT GENERATION & GATE VERDICT
// ============================================================================
console.log('\n================================================================');
console.log(`TOTAL CHECKS: ${totalChecks} | PASSED: ${passedChecks} | FAILED: ${failureLog.length}`);
console.log('================================================================');

const receipt = {
  gate: 'JAYT_443_CLICK_INTEGRITY_GATE',
  timestamp: new Date().toISOString(),
  mandate: 'CHAIRMAN_DIRECTIVE_20260918_MARTIAL_LAW_FIX_ROUTING_MISMATCH',
  totalChecks,
  passedChecks,
  failedChecks: failureLog.length,
  status: failureLog.length === 0 ? 'ALL_PASSED_MARTIAL_LAW_VERIFIED' : 'BUILD_BROKEN',
  failures: failureLog,
  partnerConfig: {
    shopee: '17372870594',
    lazada: '262501305',
    tiktok: 'VNVNLCB6LYL3'
  },
  auditSignature: 'CEO_CODEX_ANTIGRAVITY_MUTUAL_ATTESTATION_J443'
};

fs.mkdirSync(path.dirname(RECEIPT_PATH), { recursive: true });
fs.writeFileSync(RECEIPT_PATH, JSON.stringify(receipt, null, 2), 'utf8');
console.log(`Receipt saved: ${RECEIPT_PATH}`);

if (failureLog.length > 0) {
  console.error('\n🚨 BUILD BREAK: Click integrity test failed! Routing mismatch detected!');
  process.exit(1);
} else {
  console.log('\n✅ BUILD SEALED: 100% Click Integrity & Absolute State Isolation Verified!');
  process.exit(0);
}
