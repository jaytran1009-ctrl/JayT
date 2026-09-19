/**
 * JAYT-438 QA AUTOMATED VERIFICATION SUITE
 * Directive: CHAIRMAN_DIRECTIVE_20260918_FIX_VOUCHER_RADAR_ROUTING_AND_ZERO_JUNK_SEARCH (JAYT-438)
 *
 * 10 QA GATES:
 *  Gate 1: Zero banned search queries in codebase ("kho voucher", "voucher giam gia", "freeship", "an uong", "vật dụng sinh viên").
 *  Gate 2: Slot 00:00 (Săn Đêm) routes to Shopee Voucher Portal https://shopee.vn/m/ma-giam-gia (App: shopeevn://voucher_wallet?partner=17372870594).
 *  Gate 3: Slot 11:30 (Cơm Trưa) routes to ShopeeFood Đà Nẵng https://shopeefood.vn/da-nang (App: shopeevn://nowfood).
 *  Gate 4: Slot 16:30 (Xe Ôm Tan Tầm) routes to Xanh SM https://xanhsm.com (App: xanhsm://).
 *  Gate 5: Slot 20:00 (Live/Video) routes to Shopee Live https://shopee.vn/m/shopee-live (App: shopeevn://live?partner=17372870594).
 *  Gate 6: openPreDropVoucherStash routes 100% to Whitelist portals (Shopee, Lazada, TikTok), ZERO search queries.
 *  Gate 7: openGoldenHourRadarVoucher function exists and correctly delegates for all 4 slots.
 *  Gate 8: Commercial boundary: Partner IDs locked 100% (17372870594, 262501305, VNVNLCB6LYL3), CONFIG.affiliate_enabled: false.
 *  Gate 9: ZQA 6-Gate Autonomous toolchain (scripts/verify_autonomous_gates.cjs) passes 100%.
 *  Gate 10: Client execution & calculation SLA <= 5ms.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');
const { execSync } = require('child_process');
const { performance } = require('perf_hooks');

const ROOT_DIR = path.resolve(__dirname, '..');
const ssotPath = path.join(ROOT_DIR, '03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const apexCode = fs.readFileSync(ssotPath, 'utf8');

console.log('================================================================');
console.log('  JAYT-438 QA TEST SUITE: VOUCHER RADAR ROUTING & ZERO JUNK SEARCH');
console.log('  Directive: CHAIRMAN_DIRECTIVE_20260918_FIX_VOUCHER_RADAR_ROUTING');
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

// SETUP VM SANDBOX
let dispatchedEvents = [];

const sandbox = {
  console,
  setTimeout: (fn) => { fn(); return 1; },
  clearTimeout: () => {},
  setInterval: (fn) => { fn(); return 1; },
  clearInterval: () => {},
  performance: { now: () => Date.now() },
  localStorage: { getItem: () => null, setItem: () => {} },
  window: {
    addEventListener: () => {},
    location: {
      _href: '',
      get href() { return this._href; },
      set href(val) {
        this._href = val;
        dispatchedEvents.push({ type: 'location.href', url: val });
      },
      hostname: 'jayt-production-v3420.vercel.app'
    },
    open: (url) => { dispatchedEvents.push({ type: 'window.open', url }); }
  },
  document: {
    getElementById: () => null,
    querySelectorAll: () => [],
    querySelector: () => null,
    createElement: () => ({ style: {}, appendChild: () => {}, removeChild: () => {}, click: () => {} }),
    body: { appendChild: () => {}, removeChild: () => {} },
    addEventListener: () => {}
  },
  navigator: { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)' }
};

sandbox.window.localStorage = sandbox.localStorage;
sandbox.window.document = sandbox.document;
sandbox.window.navigator = sandbox.navigator;

vm.createContext(sandbox);
vm.runInContext(apexCode, sandbox);

// -------------------------------------------------------------------
// GATE 1: ZERO BANNED SEARCH QUERIES IN CODEBASE
// -------------------------------------------------------------------
try {
  const BANNED_JUNK_TERMS = ['kho voucher', 'voucher giam gia', 'freeship', 'an uong', 'vật dụng sinh viên'];
  const srcLines = apexCode.split('\n');
  let violation = null;

  for (let i = 0; i < srcLines.length; i++) {
    const line = srcLines[i];
    if (line.includes('searchQuery') || line.includes('keyword=') || line.includes('catalog/?q=') || line.includes('search?q=')) {
      for (const term of BANNED_JUNK_TERMS) {
        if (line.toLowerCase().includes(term) && !line.includes('BANNED_PATTERNS') && !line.includes('isGarbageQuery')) {
          violation = `Line ${i + 1}: ${line.trim()}`;
          break;
        }
      }
    }
    if (violation) break;
  }

  assert.strictEqual(violation, null, `Banned search query detected: ${violation}`);
  pass(1, 'Zero banned search queries in codebase ("kho voucher", "voucher giam gia", "freeship", "an uong", "vật dụng sinh viên")');
} catch (e) {
  fail(1, 'Zero banned search queries check failed', e);
}

// -------------------------------------------------------------------
// GATE 2: SLOT 00:00 (SĂN ĐÊM) SHOPEE VOUCHER PORTAL ROUTING
// -------------------------------------------------------------------
try {
  const radar = sandbox.window.JAYT_GOLDEN_HOURS_RADAR;
  const slot0 = radar.find(s => s.id === 'HOUR_0000');
  assert.ok(slot0, 'Slot HOUR_0000 must exist');
  assert.strictEqual(slot0.stashUrl, 'https://shopee.vn/m/ma-giam-gia', 'Slot HOUR_0000 stashUrl must be official Shopee voucher portal');
  assert.ok(slot0.deepLinkUrl.includes('shopeevn://voucher_wallet'), 'Slot HOUR_0000 deep link must be voucher_wallet');
  assert.ok(slot0.deepLinkUrl.includes('17372870594'), 'Slot HOUR_0000 deep link must wrap Shopee partner ID 17372870594');

  dispatchedEvents = [];
  sandbox.window.openGoldenHourRadarVoucher('HOUR_0000');
  const dispatched = dispatchedEvents.map(e => e.url).join(' ');
  assert.ok(dispatched.includes('shopeevn://voucher_wallet') || dispatched.includes('shopee.vn/m/ma-giam-gia'), 'Dispatched event must target Shopee voucher portal');
  assert.ok(!dispatched.includes('search'), 'Dispatched event must NOT contain search query');

  pass(2, 'Slot 00:00 (Săn Đêm) routes to Shopee Voucher Portal https://shopee.vn/m/ma-giam-gia (App: shopeevn://voucher_wallet?partner=17372870594)');
} catch (e) {
  fail(2, 'Slot 00:00 routing check failed', e);
}

// -------------------------------------------------------------------
// GATE 3: SLOT 11:30 (CƠM TRƯA) SHOPEEFOOD ĐÀ NẴNG ROUTING
// -------------------------------------------------------------------
try {
  const radar = sandbox.window.JAYT_GOLDEN_HOURS_RADAR;
  const slot1 = radar.find(s => s.id === 'HOUR_1130');
  assert.ok(slot1, 'Slot HOUR_1130 must exist');
  assert.strictEqual(slot1.stashUrl, 'https://shopeefood.vn/da-nang', 'Slot HOUR_1130 stashUrl must be ShopeeFood Đà Nẵng');
  assert.ok(slot1.deepLinkUrl.includes('shopeevn://nowfood'), 'Slot HOUR_1130 deep link must be shopeevn://nowfood');

  dispatchedEvents = [];
  sandbox.window.openGoldenHourRadarVoucher('HOUR_1130');
  const dispatched = dispatchedEvents.map(e => e.url).join(' ');
  assert.ok(dispatched.includes('shopeevn://nowfood') || dispatched.includes('shopeefood.vn/da-nang'), 'Dispatched event must target ShopeeFood Đà Nẵng');
  assert.ok(!dispatched.includes('search'), 'Dispatched event must NOT contain search query');

  pass(3, 'Slot 11:30 (Cơm Trưa) routes to ShopeeFood Đà Nẵng https://shopeefood.vn/da-nang (App: shopeevn://nowfood)');
} catch (e) {
  fail(3, 'Slot 11:30 routing check failed', e);
}

// -------------------------------------------------------------------
// GATE 4: SLOT 16:30 (XE ÔM TAN TẦM) XANH SM ROUTING
// -------------------------------------------------------------------
try {
  const radar = sandbox.window.JAYT_GOLDEN_HOURS_RADAR;
  const slot2 = radar.find(s => s.id === 'HOUR_1630');
  assert.ok(slot2, 'Slot HOUR_1630 must exist');
  assert.strictEqual(slot2.stashUrl, 'https://xanhsm.com', 'Slot HOUR_1630 stashUrl must be Xanh SM');
  assert.ok(slot2.deepLinkUrl.includes('xanhsm://'), 'Slot HOUR_1630 deep link must be xanhsm://');

  dispatchedEvents = [];
  sandbox.window.openGoldenHourRadarVoucher('HOUR_1630');
  const dispatched = dispatchedEvents.map(e => e.url).join(' ');
  assert.ok(dispatched.includes('xanhsm://') || dispatched.includes('xanhsm.com'), 'Dispatched event must target Xanh SM');
  assert.ok(!dispatched.includes('search'), 'Dispatched event must NOT contain search query');

  pass(4, 'Slot 16:30 (Xe Ôm Tan Tầm) routes to Xanh SM https://xanhsm.com (App: xanhsm://)');
} catch (e) {
  fail(4, 'Slot 16:30 routing check failed', e);
}

// -------------------------------------------------------------------
// GATE 5: SLOT 20:00 (LIVE/VIDEO) SHOPEE LIVE ROUTING
// -------------------------------------------------------------------
try {
  const radar = sandbox.window.JAYT_GOLDEN_HOURS_RADAR;
  const slot3 = radar.find(s => s.id === 'HOUR_2000');
  assert.ok(slot3, 'Slot HOUR_2000 must exist');
  assert.strictEqual(slot3.stashUrl, 'https://shopee.vn/m/shopee-live', 'Slot HOUR_2000 stashUrl must be Shopee Live portal');
  assert.ok(slot3.deepLinkUrl.includes('shopeevn://live'), 'Slot HOUR_2000 deep link must be shopeevn://live');
  assert.ok(slot3.deepLinkUrl.includes('17372870594'), 'Slot HOUR_2000 deep link must wrap Shopee partner ID 17372870594');

  dispatchedEvents = [];
  sandbox.window.openGoldenHourRadarVoucher('HOUR_2000');
  const dispatched = dispatchedEvents.map(e => e.url).join(' ');
  assert.ok(dispatched.includes('shopeevn://live') || dispatched.includes('shopee.vn/m/shopee-live'), 'Dispatched event must target Shopee Live');
  assert.ok(!dispatched.includes('search'), 'Dispatched event must NOT contain search query');

  pass(5, 'Slot 20:00 (Live/Video) routes to Shopee Live https://shopee.vn/m/shopee-live (App: shopeevn://live?partner=17372870594)');
} catch (e) {
  fail(5, 'Slot 20:00 routing check failed', e);
}

// -------------------------------------------------------------------
// GATE 6: openPreDropVoucherStash ZERO SEARCH QUERIES
// -------------------------------------------------------------------
try {
  dispatchedEvents = [];
  sandbox.window.openPreDropVoucherStash('shopee');
  sandbox.window.openPreDropVoucherStash('tiktok');
  sandbox.window.openPreDropVoucherStash('lazada');

  const allUrls = dispatchedEvents.map(e => e.url);
  assert.ok(allUrls.length >= 3, 'Must trigger pre-drop navigation events');

  for (const u of allUrls) {
    assert.ok(!u.includes('keyword='), `Pre-drop URL must NOT contain keyword search: ${u}`);
    assert.ok(!u.includes('search?'), `Pre-drop URL must NOT contain search: ${u}`);
  }

  const joined = allUrls.join(' ');
  assert.ok(joined.includes('shopee.vn/m/ma-giam-gia') || joined.includes('shopeevn://voucher_wallet'), 'Shopee hub mapped');
  assert.ok(joined.includes('tiktok.com') || joined.includes('snssdk1180://ec/coupon'), 'TikTok hub mapped');
  assert.ok(joined.includes('lazada.vn/voucher') || joined.includes('lazada://voucher'), 'Lazada hub mapped');

  pass(6, 'openPreDropVoucherStash routes 100% to Whitelist portals (Shopee, Lazada, TikTok) with zero search queries');
} catch (e) {
  fail(6, 'openPreDropVoucherStash check failed', e);
}

// -------------------------------------------------------------------
// GATE 7: openGoldenHourRadarVoucher EXPORT & DELEGATION
// -------------------------------------------------------------------
try {
  const fn = sandbox.window.openGoldenHourRadarVoucher;
  assert.strictEqual(typeof fn, 'function', 'openGoldenHourRadarVoucher must be a function exported to window');

  const html = sandbox.window.renderJaytChronoCalendarHtml();
  assert.ok(html.includes('openGoldenHourRadarVoucher'), 'renderJaytChronoCalendarHtml must wire openGoldenHourRadarVoucher');

  pass(7, 'openGoldenHourRadarVoucher function verified and wired in Golden Hour card markup');
} catch (e) {
  fail(7, 'openGoldenHourRadarVoucher check failed', e);
}

// -------------------------------------------------------------------
// GATE 8: COMMERCIAL BOUNDARY & AFFILIATE ATTRIBUTION LOCK
// -------------------------------------------------------------------
try {
  assert.ok(apexCode.includes('17372870594'), 'Shopee Partner ID 17372870594 must be present');
  assert.ok(apexCode.includes('262501305'), 'Lazada Partner ID 262501305 must be present');
  assert.ok(apexCode.includes('VNVNLCB6LYL3'), 'TikTok Shop Partner ID VNVNLCB6LYL3 must be present');
  assert.ok(apexCode.includes('affiliate_enabled: false'), 'CONFIG.affiliate_enabled must be false fail-closed');

  pass(8, 'Commercial boundary: Partner IDs locked 100% (17372870594, 262501305, VNVNLCB6LYL3) & CONFIG.affiliate_enabled: false');
} catch (e) {
  fail(8, 'Commercial boundary check failed', e);
}

// -------------------------------------------------------------------
// GATE 9: BAN KIỂM ĐỊNH KỸ TRỊ ZQA 6-GATE CI/CD EXECUTION
// -------------------------------------------------------------------
try {
  const zqaScript = path.join(ROOT_DIR, 'scripts/verify_autonomous_gates.cjs');
  const output = execSync(`node "${zqaScript}"`, { cwd: ROOT_DIR, encoding: 'utf8' });
  assert.ok(output.includes('BAN KIỂM ĐỊNH KỸ TRỊ ZQA: 6/6 CỔNG THÔNG QUA (BUILD GREEN)'), 'ZQA must pass 6/6 gates');

  pass(9, 'ZQA 6-Gate Autonomous toolchain (scripts/verify_autonomous_gates.cjs) executed: 6/6 GATES PASS');
} catch (e) {
  fail(9, 'ZQA CI/CD toolchain execution failed', e);
}

// -------------------------------------------------------------------
// GATE 10: CLIENT LATENCY SLA (<= 5ms)
// -------------------------------------------------------------------
try {
  const iterations = 100;
  const tStart = performance.now();
  for (let i = 0; i < iterations; i++) {
    sandbox.window.getGoldenHourCountdownInfo();
    sandbox.window.renderJaytChronoCalendarHtml();
  }
  const tEnd = performance.now();
  const avgMs = (tEnd - tStart) / iterations;

  console.log(`  Average calculation & render latency: ${avgMs.toFixed(3)}ms`);
  assert.ok(avgMs <= 5.0, `Latency ${avgMs.toFixed(3)}ms must be <= 5.0ms SLA`);

  pass(10, `Client performance SLA passed (Average latency: ${avgMs.toFixed(3)}ms <= 5ms limit)`);
} catch (e) {
  fail(10, 'Client latency SLA check failed', e);
}

// SUMMARY
console.log('\n================================================================');
console.log(`  RESULT: ${passCount}/${totalGates} GATES PASSED (JAYT-438 FULL COMPLIANCE)`);
console.log('================================================================\n');
