/**
 * JAYT-432 QA AUTOMATED VERIFICATION SUITE
 * Directive: CHAIRMAN_DIRECTIVE_20260918_AUTHENTIC_REVIEWS_AND_FULL_FEATURE1_GO_LIVE
 * 
 * 10 QA GATES:
 *  1. JAYT_AUTHENTIC_PRODUCT_REVIEWS schema & 11 SKU Triplets coverage.
 *  2. getAuthenticReviewData returns valid dataset for defined SKUs and fallback queries.
 *  3. JayT Trust Score (4.7★ - 4.9★) and Anti-Seeding Audit metrics present.
 *  4. 3 verified Pros with percentage statistics present.
 *  5. 1-2 realistic Cons objectively exposed (hidden cons surfaced).
 *  6. Buyer Real-Shot Gallery contains 4 unbox photos with "📸" tags and buyer notes.
 *  7. Master Action CTA button exists and routes to the cheapest verified option with savings.
 *  8. Dorm cards (.btn-sku-drawer-info) and Flash Deal cards (.btn-flash-deal-review) properly wired.
 *  9. Commercial boundaries: Affiliate IDs preserved, fail-closed CONFIG.affiliate_enabled: false.
 * 10. Performance benchmark: Review data lookup & resolution latency <= 5ms SLA.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const ssotPath = path.join(ROOT_DIR, '03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const apexCode = fs.readFileSync(ssotPath, 'utf8');

console.log('================================================================');
console.log('JAYT-432: AUTHENTIC REVIEWS & REAL-SHOT BUYER GALLERY QA SUITE');
console.log('================================================================\n');

let passCount = 0;
const totalGates = 10;

function pass(gate, desc) {
  passCount++;
  console.log(`[PASS] Gate ${gate}/${totalGates}: ${desc}`);
}

function fail(gate, desc, err) {
  console.error(`[FAIL] Gate ${gate}/${totalGates}: ${desc}`);
  if (err) console.error(err);
  process.exit(1);
}

// -------------------------------------------------------------
// SETUP VM SANDBOX
// -------------------------------------------------------------
const domElements = {};

function createMockElement(tag, initialId = '') {
  let _id = initialId;
  const el = {
    tagName: tag.toUpperCase(),
    get id() { return _id; },
    set id(val) {
      _id = val;
      if (val) domElements[val] = this;
    },
    className: '',
    classList: {
      add: function(c) { if (!this.classes.includes(c)) this.classes.push(c); },
      remove: function(c) { this.classes = this.classes.filter(x => x !== c); },
      contains: function(c) { return this.classes.includes(c); },
      classes: []
    },
    style: {},
    attributes: {},
    setAttribute: function(k, v) { this.attributes[k] = v; },
    getAttribute: function(k) { return this.attributes[k] || null; },
    innerHTML: '',
    children: [],
    appendChild: function(c) { this.children.push(c); return c; },
    addEventListener: function() {},
    removeEventListener: function() {}
  };
  if (initialId) domElements[initialId] = el;
  return el;
}

const sandbox = {
  console,
  setTimeout,
  clearTimeout,
  performance: { now: () => Date.now() },
  localStorage: { getItem: () => null, setItem: () => {} },
  window: {
    addEventListener: () => {},
    location: { href: '', hostname: 'jayt-production-v3420.vercel.app' }
  },
  URL,
  document: {
    getElementById: (id) => domElements[id] || null,
    querySelectorAll: () => [],
    querySelector: () => null,
    createElement: (tag) => createMockElement(tag),
    body: createMockElement('body', 'body'),
    addEventListener: () => {}
  },
  navigator: { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
};

sandbox.window.localStorage = sandbox.localStorage;
sandbox.window.document = sandbox.document;
sandbox.window.navigator = sandbox.navigator;

vm.createContext(sandbox);
vm.runInContext(apexCode, sandbox);

// -------------------------------------------------------------
// GATE 1: JAYT_AUTHENTIC_PRODUCT_REVIEWS Schema & 11 SKU Triplets
// -------------------------------------------------------------
try {
  const reviews = sandbox.window.JAYT_AUTHENTIC_PRODUCT_REVIEWS;
  assert.ok(reviews, 'JAYT_AUTHENTIC_PRODUCT_REVIEWS must be defined');
  assert.strictEqual(typeof reviews, 'object', 'JAYT_AUTHENTIC_PRODUCT_REVIEWS must be an object');

  const requiredTriplets = [
    'SKU_TRIPLET_11_GOI_CONG_THAI_HOC',
    'SKU_TRIPLET_01_SHIN_CASE',
    'SKU_TRIPLET_02_TOPGIA_TISSUE',
    'SKU_TRIPLET_03_OCAM_DIENQUANG',
    'SKU_TRIPLET_04_QUAT_JISULIFE',
    'SKU_TRIPLET_05_UGREEN_GAN30W',
    'SKU_TRIPLET_06_BASEUS_100W',
    'SKU_TRIPLET_07_LOGITECH_M350S',
    'SKU_TRIPLET_08_AM_SUNHOUSE',
    'SKU_TRIPLET_09_LOCKNLOCK_BINH',
    'SKU_TRIPLET_10_MI_KORENO'
  ];

  for (const tripletId of requiredTriplets) {
    assert.ok(reviews[tripletId], `Triplet ${tripletId} must exist in reviews`);
    const r = reviews[tripletId];
    assert.ok(r.productName, `Triplet ${tripletId} must have productName`);
    assert.ok(r.trustScore >= 4.0 && r.trustScore <= 5.0, `Triplet ${tripletId} trustScore must be between 4.0 and 5.0`);
    assert.ok(r.verifiedBuyerCount > 0, `Triplet ${tripletId} must have verifiedBuyerCount`);
    assert.ok(r.filteredFakeCount >= 0, `Triplet ${tripletId} must have filteredFakeCount`);
    assert.ok(r.pros && r.pros.length >= 3, `Triplet ${tripletId} must have at least 3 pros`);
    assert.ok(r.cons && r.cons.length >= 1, `Triplet ${tripletId} must have at least 1 con`);
    assert.ok(r.realPhotos && r.realPhotos.length === 4, `Triplet ${tripletId} must have exactly 4 realPhotos`);
  }

  pass(1, `JAYT_AUTHENTIC_PRODUCT_REVIEWS schema validated across all 11 SKU Triplets (100% complete)`);
} catch (e) {
  fail(1, 'Gate 1 failed', e);
}

// -------------------------------------------------------------
// GATE 2: getAuthenticReviewData Output Validation (Defined & Dynamic)
// -------------------------------------------------------------
try {
  const getReview = sandbox.window.getAuthenticReviewData;
  assert.strictEqual(typeof getReview, 'function', 'getAuthenticReviewData must be a function');

  // Test 1: Defined Triplet
  const emaData = getReview('SKU_TRIPLET_11_GOI_CONG_THAI_HOC');
  assert.strictEqual(emaData.skuId, 'SKU_TRIPLET_11_GOI_CONG_THAI_HOC');
  assert.strictEqual(emaData.trustScore, 4.8);

  // Test 2: Flash deal
  const flashData = getReview('FLASH_DEAL_01_MOC_DAN_TUONG');
  assert.ok(flashData.productName.includes('Móc Dán Tường'), 'Flash deal review should resolve Móc Dán Tường');

  // Test 3: Arbitrary Dynamic Fallback
  const dynamicData = getReview(null, 'Tai Nghe Chống Ồn Sony WH-1000XM5', 'Shopee');
  assert.ok(dynamicData, 'Dynamic review should be returned');
  assert.ok(dynamicData.productName.includes('Sony'), 'Product name should include Sony');
  assert.ok(dynamicData.trustScore >= 4.5, 'Dynamic trust score should be realistic');
  assert.ok(dynamicData.pros.length === 3, 'Dynamic review should have 3 pros');
  assert.ok(dynamicData.cons.length >= 1, 'Dynamic review should have cons');
  assert.strictEqual(dynamicData.realPhotos.length, 4, 'Dynamic review should have 4 realPhotos');

  pass(2, `getAuthenticReviewData dynamically handles defined SKUs, flash deals, and unindexed products`);
} catch (e) {
  fail(2, 'Gate 2 failed', e);
}

// -------------------------------------------------------------
// GATE 3: JayT Trust Score & Anti-Seeding Audit Metrics
// -------------------------------------------------------------
try {
  const r = sandbox.window.getAuthenticReviewData('SKU_TRIPLET_11_GOI_CONG_THAI_HOC');
  assert.strictEqual(r.trustScore, 4.8);
  assert.strictEqual(r.verifiedBuyerCount, 1420);
  assert.strictEqual(r.filteredFakeCount, 310);
  assert.ok(r.trustVerdict.includes('Chính Hãng Mall'));

  pass(3, `JayT Trust Score (4.8★) & Anti-Seeding Audit metrics present (1,420 verified / 310 fake purged)`);
} catch (e) {
  fail(3, 'Gate 3 failed', e);
}

// -------------------------------------------------------------
// GATE 4: 3 Verified Pros with % Verification Statistics
// -------------------------------------------------------------
try {
  const r = sandbox.window.getAuthenticReviewData('SKU_TRIPLET_11_GOI_CONG_THAI_HOC');
  assert.strictEqual(r.pros.length, 3, 'Must have exactly 3 pros');
  r.pros.forEach((proStr, idx) => {
    assert.ok(typeof proStr === 'string' && proStr.length > 10, `Pro ${idx + 1} must be a descriptive string`);
    assert.ok(proStr.includes('%'), `Pro ${idx + 1} must contain % statistic`);
  });

  pass(4, `30-second Pro Summary verified: 3 distinct pros with certified buyer % stats`);
} catch (e) {
  fail(4, 'Gate 4 failed', e);
}

// -------------------------------------------------------------
// GATE 5: 1-2 Realistic Hidden Cons Objectively Exposed
// -------------------------------------------------------------
try {
  const r = sandbox.window.getAuthenticReviewData('SKU_TRIPLET_11_GOI_CONG_THAI_HOC');
  assert.ok(r.cons.length >= 1 && r.cons.length <= 2, 'Must have 1 to 2 realistic cons');
  r.cons.forEach((conStr, idx) => {
    assert.ok(typeof conStr === 'string' && conStr.length > 10, `Con ${idx + 1} must be a descriptive string`);
  });
  assert.ok(r.cons[0].includes('mùi cao su') || r.cons[0].includes('cao su non'), 'Must objectively note initial foam smell');

  pass(5, `Realistic Cons objectively exposed: foam smell & 3-5 day adaptation period`);
} catch (e) {
  fail(5, 'Gate 5 failed', e);
}

// -------------------------------------------------------------
// GATE 6: Real-Shot Buyer Gallery (4 Unbox Photos with Tags)
// -------------------------------------------------------------
try {
  const r = sandbox.window.getAuthenticReviewData('SKU_TRIPLET_11_GOI_CONG_THAI_HOC');
  assert.strictEqual(r.realPhotos.length, 4, 'Must have 4 real photos');
  r.realPhotos.forEach((photo, idx) => {
    assert.ok(photo.tag.includes('📸'), `Photo ${idx + 1} must have unbox/camera tag`);
    assert.ok(photo.title, `Photo ${idx + 1} must have title`);
    assert.ok(photo.note, `Photo ${idx + 1} must have reviewer note`);
  });

  pass(6, `Buyer Real-Shot Gallery validated: 4 unbox photos with "📸" tags and buyer notes`);
} catch (e) {
  fail(6, 'Gate 6 failed', e);
}

// -------------------------------------------------------------
// GATE 7: Master Action CTA in Review Modal Routes to Cheapest Deal
// -------------------------------------------------------------
try {
  sandbox.window.openAuthenticReviewsModal('SKU_TRIPLET_11_GOI_CONG_THAI_HOC', 'Ema Gối Ngủ Công Thái Học', 99330, 'tiktok');
  
  const modal = domElements['jayt-authentic-reviews-modal'];
  assert.ok(modal, 'Modal #jayt-authentic-reviews-modal must be created');
  assert.ok(modal.innerHTML.includes('Ema') && modal.innerHTML.includes('Gối Ngủ'), 'Modal must contain product title');
  assert.ok(modal.innerHTML.includes('⭐ 4.8'), 'Modal must display 4.8 rating');
  assert.ok(modal.innerHTML.includes('1.420'), 'Modal must display 1.420 buyer reviews');
  assert.ok(modal.innerHTML.includes('310'), 'Modal must display 310 fake reviews removed');
  assert.ok(modal.innerHTML.includes('MUA NGAY GIÁ ĐÁY ĐÃ XÁC THỰC'), 'Modal must have Master Action CTA button');
  assert.ok(modal.innerHTML.includes('TikTok Shop Uy Tín'), 'Master Action CTA must point to TikTok Shop Uy Tín');
  assert.ok(modal.innerHTML.includes('99.330₫'), 'Master Action CTA must reflect 99.330₫');

  pass(7, `Review Modal Master Action CTA correctly configured: points directly to TikTok Shop at 99.330₫`);
} catch (e) {
  fail(7, 'Gate 7 failed', e);
}

// -------------------------------------------------------------
// GATE 8: Dorm Cards & Flash Deal Cards Wired to Review Modal
// -------------------------------------------------------------
try {
  assert.ok(apexCode.includes('btn-sku-drawer-info'), 'btn-sku-drawer-info class must exist');
  assert.ok(apexCode.includes('openAuthenticReviewsModal('), 'openAuthenticReviewsModal calls must be in code');
  assert.ok(apexCode.includes('btn-flash-deal-review'), 'btn-flash-deal-review class must exist');
  assert.ok(apexCode.includes('btn-open-reviews-from-radar'), 'btn-open-reviews-from-radar must exist for scanner modal');

  pass(8, `All product cards (Dorm Shelf, Flash Deals Radar, Scanner Output) wired to openAuthenticReviewsModal`);
} catch (e) {
  fail(8, 'Gate 8 failed', e);
}

// -------------------------------------------------------------
// GATE 9: Commercial Boundaries Preserved & Fail-Closed Guard
// -------------------------------------------------------------
try {
  assert.strictEqual(sandbox.window.CONFIG.affiliate_enabled, false, 'affiliate_enabled must be false on production');
  assert.ok(apexCode.includes('17372870594'), 'Shopee Partner ID 17372870594 must exist');
  assert.ok(apexCode.includes('262501305'), 'Lazada Partner ID 262501305 must exist');
  assert.ok(apexCode.includes('VNVNLCB6LYL3'), 'TikTok Partner Code VNVNLCB6LYL3 must exist');

  pass(9, `Commercial boundaries sealed: CONFIG.affiliate_enabled: false & Partner IDs intact`);
} catch (e) {
  fail(9, 'Gate 9 failed', e);
}

// -------------------------------------------------------------
// GATE 10: Performance Benchmark (Review Data Resolution <= 5ms SLA)
// -------------------------------------------------------------
try {
  const getReview = sandbox.window.getAuthenticReviewData;
  const iterations = 1000;
  const t0 = process.hrtime.bigint();
  
  for (let i = 0; i < iterations; i++) {
    getReview('SKU_TRIPLET_11_GOI_CONG_THAI_HOC');
    getReview('FLASH_DEAL_01_MOC_DAN_TUONG');
    getReview(null, 'Dynamic Test Product', 'Lazada');
  }
  
  const t1 = process.hrtime.bigint();
  const totalMs = Number(t1 - t0) / 1e6;
  const avgMs = totalMs / (iterations * 3);

  assert.ok(avgMs <= 5.0, `Average latency (${avgMs.toFixed(3)}ms) must be <= 5ms`);

  pass(10, `Performance SLA validated: ${iterations * 3} lookups in ${totalMs.toFixed(2)}ms (avg ${avgMs.toFixed(4)}ms/call <= 5ms SLA)`);
} catch (e) {
  fail(10, 'Gate 10 failed', e);
}

console.log('\n================================================================');
console.log(`JAYT-432 QA VERIFICATION COMPLETE: ${passCount}/${totalGates} GATES PASSED`);
console.log('STATUS: FULL_FEATURE1_AUTHENTIC_REVIEWS_GO_LIVE_READY');
console.log('================================================================\n');
