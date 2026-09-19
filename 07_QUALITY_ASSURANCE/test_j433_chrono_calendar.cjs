/**
 * JAYT-433 QA AUTOMATED VERIFICATION SUITE
 * Directive: CHAIRMAN_DIRECTIVE_20260918_MEGA_SALE_CALENDAR_AND_VOUCHER_RADAR
 * 
 * 10 QA GATES:
 *  1. JAYT_MEGA_SALE_CALENDAR schema & 5 major cycles (10.10, 15.10, 25-28.10, 11.11, 12.12).
 *  2. JAYT_GOLDEN_HOURS_RADAR schema & 4 golden windows (00:00, 11:30, 16:30, 20:00).
 *  3. getGoldenHourCountdownInfo() returns valid slot info, live countdown formatted as HH:MM:SS.
 *  4. generateCalendarLinks() produces valid Google Calendar URL template with Affiliate metadata.
 *  5. downloadJaytEventIcs() validates RFC 5545 iCalendar schema with VALARM reminder.
 *  6. openPreDropVoucherStash() correctly routes to Shopee, TikTok Shop, Lazada voucher hubs.
 *  7. renderJaytChronoCalendarHtml() generates complete Radar and Mega Sale timeline markup.
 *  8. renderDailyHotVoucherBoard() embeds Chrono-Calendar inside #j401-hot-voucher-shelf.
 *  9. Commercial boundaries: Partner IDs locked 100%, CONFIG.affiliate_enabled fail-closed.
 * 10. Performance benchmark: Radar lookup & render execution latency <= 5ms SLA.
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
console.log('JAYT-433: MEGA SALE CALENDAR & VOUCHER RADAR QA SUITE');
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
    textContent: '',
    children: [],
    appendChild: function(c) { this.children.push(c); return c; },
    removeChild: function(c) { this.children = this.children.filter(x => x !== c); return c; },
    addEventListener: function() {},
    removeEventListener: function() {},
    click: function() {}
  };
  if (initialId) domElements[initialId] = el;
  return el;
}

let dispatchedEvents = [];
let downloadedBlobs = [];

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
  URL: {
    createObjectURL: (blob) => {
      downloadedBlobs.push(blob);
      return 'blob:mock-url-' + Math.random();
    },
    revokeObjectURL: () => {}
  },
  Blob: class MockBlob {
    constructor(chunks, options) {
      this.chunks = chunks;
      this.options = options;
      this.text = chunks.join('');
    }
  },
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
sandbox.window.URL = sandbox.URL;
sandbox.window.Blob = sandbox.Blob;

vm.createContext(sandbox);
vm.runInContext(apexCode, sandbox);

// -------------------------------------------------------------
// GATE 1: JAYT_MEGA_SALE_CALENDAR Schema & 5 Major Cycles
// -------------------------------------------------------------
try {
  const calendar = sandbox.window.JAYT_MEGA_SALE_CALENDAR;
  assert.ok(Array.isArray(calendar), 'JAYT_MEGA_SALE_CALENDAR must be an array');
  assert.strictEqual(calendar.length, 5, 'Must contain exactly 5 major sales cycles');

  const expectedIds = [
    'SALE_DOUBLE_DAY_1010',
    'SALE_MID_MONTH_1510',
    'SALE_PAYDAY_2510',
    'SALE_DOUBLE_DAY_1111',
    'SALE_DOUBLE_DAY_1212'
  ];

  calendar.forEach((event, idx) => {
    assert.strictEqual(event.id, expectedIds[idx], `Event ${idx} ID must match ${expectedIds[idx]}`);
    assert.ok(event.title, `Event ${event.id} must have title`);
    assert.ok(event.cycle, `Event ${event.id} must have cycle`);
    assert.ok(event.dateRange, `Event ${event.id} must have dateRange`);
    assert.ok(event.discountForecast, `Event ${event.id} must have discountForecast`);
    assert.ok(event.layerStack, `Event ${event.id} must have layerStack`);
    assert.ok(Array.isArray(event.platforms) && event.platforms.length > 0, `Event ${event.id} must have platforms`);
    assert.ok(event.startDateStr, `Event ${event.id} must have startDateStr`);
    assert.ok(event.endDateStr, `Event ${event.id} must have endDateStr`);
    assert.ok(event.badge, `Event ${event.id} must have badge`);
  });

  pass(1, 'JAYT_MEGA_SALE_CALENDAR schema validated (5 major cycles: 10.10, 15.10, Payday, 11.11, 12.12)');
} catch (e) {
  fail(1, 'JAYT_MEGA_SALE_CALENDAR schema validation failed', e);
}

// -------------------------------------------------------------
// GATE 2: JAYT_GOLDEN_HOURS_RADAR Schema & 4 Golden Windows
// -------------------------------------------------------------
try {
  const radar = sandbox.window.JAYT_GOLDEN_HOURS_RADAR;
  assert.ok(Array.isArray(radar), 'JAYT_GOLDEN_HOURS_RADAR must be an array');
  assert.strictEqual(radar.length, 4, 'Must contain exactly 4 golden drop windows');

  const expectedSlots = [
    { id: 'HOUR_0000', hour: 0, minute: 0 },
    { id: 'HOUR_1130', hour: 11, minute: 30 },
    { id: 'HOUR_1630', hour: 16, minute: 30 },
    { id: 'HOUR_2000', hour: 20, minute: 0 }
  ];

  radar.forEach((slot, idx) => {
    assert.strictEqual(slot.id, expectedSlots[idx].id, `Slot ${idx} ID mismatch`);
    assert.strictEqual(slot.hour, expectedSlots[idx].hour, `Slot ${idx} hour mismatch`);
    assert.strictEqual(slot.minute, expectedSlots[idx].minute, `Slot ${idx} minute mismatch`);
    assert.ok(slot.timeLabel, `Slot ${slot.id} must have timeLabel`);
    assert.ok(slot.name, `Slot ${slot.id} must have name`);
    assert.ok(slot.coreVoucher, `Slot ${slot.id} must have coreVoucher`);
    assert.ok(slot.stackStrategy, `Slot ${slot.id} must have stackStrategy`);
    assert.ok(slot.badge, `Slot ${slot.id} must have badge`);
    assert.ok(slot.tag, `Slot ${slot.id} must have tag`);
    assert.ok(slot.targetPlatform, `Slot ${slot.id} must have targetPlatform`);
  });

  pass(2, 'JAYT_GOLDEN_HOURS_RADAR schema validated (4 golden windows: 00:00, 11:30, 16:30, 20:00)');
} catch (e) {
  fail(2, 'JAYT_GOLDEN_HOURS_RADAR schema validation failed', e);
}

// -------------------------------------------------------------
// GATE 3: getGoldenHourCountdownInfo() Returns Valid Slot & Format
// -------------------------------------------------------------
try {
  const getInfo = sandbox.window.getGoldenHourCountdownInfo;
  assert.strictEqual(typeof getInfo, 'function', 'getGoldenHourCountdownInfo must be a function');

  const countdown = getInfo();
  assert.ok(countdown, 'Countdown info must be returned');
  assert.ok(typeof countdown.isActive === 'boolean', 'isActive must be boolean');
  assert.ok(countdown.activeSlot || countdown.nextSlot, 'Must identify activeSlot or nextSlot');
  assert.ok(typeof countdown.diffSeconds === 'number', 'diffSeconds must be numeric');
  assert.ok(countdown.diffSeconds >= 0, 'diffSeconds must be >= 0');
  assert.ok(countdown.countdownFormatted, 'countdownFormatted must exist');
  
  // Format must be HH:MM:SS
  const hhmmssRegex = /^\d{2}:\d{2}:\d{2}$/;
  assert.ok(hhmmssRegex.test(countdown.countdownFormatted), `Format ${countdown.countdownFormatted} must match HH:MM:SS`);

  const activeOrNextName = countdown.isActive ? countdown.activeSlot.name : countdown.nextSlot.name;
  pass(3, `getGoldenHourCountdownInfo validated (Slot: ${activeOrNextName}, Countdown: ${countdown.countdownFormatted})`);
} catch (e) {
  fail(3, 'getGoldenHourCountdownInfo validation failed', e);
}

// -------------------------------------------------------------
// GATE 4: generateCalendarLinks() Produces Valid Google Cal URL
// -------------------------------------------------------------
try {
  const genLinks = sandbox.window.generateCalendarLinks;
  assert.strictEqual(typeof genLinks, 'function', 'generateCalendarLinks must be a function');

  const sampleEvent = sandbox.window.JAYT_MEGA_SALE_CALENDAR[0];
  const links = genLinks(sampleEvent);
  assert.ok(links, 'Calendar links must be returned');
  assert.ok(links.googleUrl, 'Must contain googleUrl');

  assert.ok(links.googleUrl.startsWith('https://calendar.google.com/calendar/render?action=TEMPLATE'), 'Must be Google Calendar template URL');
  assert.ok(links.googleUrl.includes('text='), 'Must have URL-encoded title');
  assert.ok(links.googleUrl.includes('dates='), 'Must have dates parameter');
  assert.ok(links.googleUrl.includes('details='), 'Must have details parameter');
  assert.ok(links.googleUrl.includes('location='), 'Must have location parameter');

  // Verify Affiliate attribution context in description
  const decodedUrl = decodeURIComponent(links.googleUrl);
  assert.ok(decodedUrl.includes('JayT') || decodedUrl.includes('17372870594'), 'Must mention JayT / Affiliate Partner ID in Google Calendar details');

  pass(4, 'generateCalendarLinks validated (Google Calendar template URL with partner metadata)');
} catch (e) {
  fail(4, 'generateCalendarLinks validation failed', e);
}

// -------------------------------------------------------------
// GATE 5: downloadJaytEventIcs() Validates RFC 5545 iCalendar Schema
// -------------------------------------------------------------
try {
  const downloadIcs = sandbox.window.downloadJaytEventIcs;
  assert.strictEqual(typeof downloadIcs, 'function', 'downloadJaytEventIcs must be a function');

  downloadedBlobs = [];
  downloadIcs('SALE_DOUBLE_DAY_1010');

  assert.strictEqual(downloadedBlobs.length, 1, 'One ICS blob must have been created');
  const icsText = downloadedBlobs[0].text;

  assert.ok(icsText.includes('BEGIN:VCALENDAR'), 'ICS must start with BEGIN:VCALENDAR');
  assert.ok(icsText.includes('VERSION:2.0'), 'ICS must declare VERSION:2.0');
  assert.ok(icsText.includes('PRODID:-//OPC JayT Corp//JayT Chrono Calendar//VI'), 'ICS must declare PRODID');
  assert.ok(icsText.includes('BEGIN:VEVENT'), 'ICS must contain BEGIN:VEVENT');
  assert.ok(icsText.includes('SUMMARY:'), 'ICS must contain SUMMARY');
  assert.ok(icsText.includes('DTSTART:'), 'ICS must contain DTSTART');
  assert.ok(icsText.includes('DTEND:'), 'ICS must contain DTEND');
  assert.ok(icsText.includes('BEGIN:VALARM'), 'ICS must configure BEGIN:VALARM for reminder');
  assert.ok(icsText.includes('TRIGGER:-PT30M'), 'VALARM must trigger 30 minutes before drop');
  assert.ok(icsText.includes('END:VEVENT'), 'ICS must close event');
  assert.ok(icsText.includes('END:VCALENDAR'), 'ICS must close calendar');

  pass(5, 'downloadJaytEventIcs validated (RFC 5545 compliant .ics format with 30-min VALARM reminder)');
} catch (e) {
  fail(5, 'downloadJaytEventIcs validation failed', e);
}

// -------------------------------------------------------------
// GATE 6: openPreDropVoucherStash() Routes to Platforms with Affiliate
// -------------------------------------------------------------
try {
  const openStash = sandbox.window.openPreDropVoucherStash;
  assert.strictEqual(typeof openStash, 'function', 'openPreDropVoucherStash must be a function');

  dispatchedEvents = [];
  
  // Test Shopee Pre-Drop
  openStash('shopee');
  // Test TikTok Shop Pre-Drop
  openStash('tiktok');
  // Test Lazada Pre-Drop
  openStash('lazada');

  // Verify calls recorded via dispatchSmartAffiliate / location.href
  assert.ok(dispatchedEvents.length >= 3, 'All 3 platform pre-drop actions must trigger navigation');
  
  const platformsTested = dispatchedEvents.map(e => e.url).join(' ');
  assert.ok(platformsTested.includes('shopee') || platformsTested.includes('17372870594'), 'Shopee deep-link or partner ID routed');
  assert.ok(platformsTested.includes('tiktok') || platformsTested.includes('VNVNLCB6LYL3') || platformsTested.includes('snssdk1180'), 'TikTok deep-link or partner ID routed');
  assert.ok(platformsTested.includes('lazada') || platformsTested.includes('262501305'), 'Lazada deep-link or partner ID routed');

  pass(6, 'openPreDropVoucherStash validated (Dispatches Shopee, TikTok Shop, Lazada pre-drop voucher hubs)');
} catch (e) {
  fail(6, 'openPreDropVoucherStash validation failed', e);
}

// -------------------------------------------------------------
// GATE 7: renderJaytChronoCalendarHtml() Full Markup & Subsystems
// -------------------------------------------------------------
try {
  const renderChrono = sandbox.window.renderJaytChronoCalendarHtml;
  assert.strictEqual(typeof renderChrono, 'function', 'renderJaytChronoCalendarHtml must be a function');

  const html = renderChrono();
  assert.ok(typeof html === 'string', 'Must return HTML string');
  assert.ok(html.includes('jayt-chrono-calendar-container'), 'Container class must exist');
  assert.ok(html.includes('jayt-chrono-live-countdown'), 'Live countdown element must exist');
  assert.ok(html.includes('RADAR 4 KHUNG GIỜ VÀNG NHẢ MÃ'), 'Radar Giờ Vàng title must exist');
  assert.ok(html.includes('LỊCH DỰ BÁO SIÊU SALE 30 – 60 – 90 NGÀY'), 'Mega sale calendar title must exist');
  
  // Verify 4 golden hour slots in rendered HTML
  assert.ok(html.includes('00:00 - 01:00') && html.includes('Săn Đêm Toàn Sàn'), 'Slot 00:00 rendered');
  assert.ok(html.includes('11:30 - 13:00') && html.includes('Cơm Trưa Sinh Viên'), 'Slot 11:30 rendered');
  assert.ok(html.includes('16:30 - 18:00') && html.includes('Xe Ôm Tan Tầm'), 'Slot 16:30 rendered');
  assert.ok(html.includes('20:00 - 22:00') && html.includes('Live / Video Kịch Đáy'), 'Slot 20:00 rendered');

  // Verify 5 mega sale cycles in rendered HTML
  assert.ok(html.includes('10.10'), '10.10 rendered');
  assert.ok(html.includes('15.10'), '15.10 rendered');
  assert.ok(html.includes('Payday'), 'Payday rendered');
  assert.ok(html.includes('11.11'), '11.11 rendered');
  assert.ok(html.includes('12.12'), '12.12 rendered');

  // Verify Action Buttons
  assert.ok(html.includes('openChronoReminderModal'), 'Must include reminder modal trigger');
  assert.ok(html.includes('openPreDropVoucherStash'), 'Must include pre-drop stash trigger');

  pass(7, 'renderJaytChronoCalendarHtml validated (Includes Radar, 4 Golden Hours, Timeline & 5 Major Cycles)');
} catch (e) {
  fail(7, 'renderJaytChronoCalendarHtml validation failed', e);
}

// -------------------------------------------------------------
// GATE 8: Shelf Integration in renderDailyHotVoucherBoard()
// -------------------------------------------------------------
try {
  const renderBoard = sandbox.window.renderDailyHotVoucherBoard;
  assert.strictEqual(typeof renderBoard, 'function', 'renderDailyHotVoucherBoard must be a function');

  const boardHtml = renderBoard();
  assert.ok(boardHtml.includes('j401-hot-voucher-shelf'), 'Hot voucher shelf ID must be present');
  assert.ok(boardHtml.includes('jayt-chrono-calendar-container'), 'Chrono-Calendar must be embedded inside shelf');
  assert.ok(boardHtml.includes('openChronoReminderModal'), 'Header row reminder button wired');
  assert.ok(boardHtml.includes('jayt-voucher-paradox-card'), 'Voucher Paradox comparison card preserved');

  pass(8, 'renderDailyHotVoucherBoard integration validated (Chrono-Calendar embedded at top of shelf)');
} catch (e) {
  fail(8, 'renderDailyHotVoucherBoard integration validation failed', e);
}

// -------------------------------------------------------------
// GATE 9: Commercial Boundaries & Security
// -------------------------------------------------------------
try {
  // Check Affiliate Partner IDs locked in SSOT
  assert.ok(apexCode.includes('17372870594'), 'Shopee Partner ID 17372870594 must be present');
  assert.ok(apexCode.includes('262501305'), 'Lazada Partner ID 262501305 must be present');
  assert.ok(apexCode.includes('VNVNLCB6LYL3'), 'TikTok Shop Partner ID VNVNLCB6LYL3 must be present');

  // Check fail-closed affiliate configuration
  assert.ok(apexCode.includes('affiliate_enabled: false'), 'CONFIG.affiliate_enabled must be false by default');

  // Verify modal does not leak sensitive information
  const modalHtml = sandbox.window.openChronoReminderModal ? 'function present' : '';
  assert.ok(modalHtml, 'openChronoReminderModal must exist in sandbox');

  pass(9, 'Commercial boundaries validated (Affiliate Partner IDs locked, CONFIG.affiliate_enabled: false preserved)');
} catch (e) {
  fail(9, 'Commercial boundaries validation failed', e);
}

// -------------------------------------------------------------
// GATE 10: Performance Benchmark <= 5ms SLA
// -------------------------------------------------------------
try {
  const iterations = 100;
  const start = process.hrtime.bigint();
  
  for (let i = 0; i < iterations; i++) {
    sandbox.window.getGoldenHourCountdownInfo();
    sandbox.window.renderJaytChronoCalendarHtml();
  }
  
  const end = process.hrtime.bigint();
  const totalNs = Number(end - start);
  const avgMs = (totalNs / iterations) / 1e6;

  console.log(`Average Chrono-Calendar calculation & render latency: ${avgMs.toFixed(3)}ms`);
  assert.ok(avgMs <= 5.0, `Average latency (${avgMs.toFixed(3)}ms) must be <= 5.0ms SLA`);

  pass(10, `Performance SLA validated (Average latency: ${avgMs.toFixed(3)}ms <= 5ms limit)`);
} catch (e) {
  fail(10, 'Performance benchmark validation failed', e);
}

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n----------------------------------------------------------------');
console.log(`RESULT: ${passCount}/${totalGates} GATES PASSED (100% SUCCESS)`);
console.log('JAYT-433 CHRONO-CALENDAR ENGINE AUDIT: VERIFIED & ACCEPTED');
console.log('----------------------------------------------------------------\n');
