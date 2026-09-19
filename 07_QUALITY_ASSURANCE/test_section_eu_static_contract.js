/**
 * JAYT PLATFORM SECTION EU STATIC CONTRACT & PROVENANCE SCANNER TEST SUITE
 * Governing Directive: JAYT-245 Section EU (Lines 3752-3780)
 * Version: v3.475.0-staging.eu
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;

function it(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✕ ${name}: ${err.message}`);
    throw err;
  }
}

console.log('\n🧪 RUNNING JAYT SECTION EU STATIC CONTRACT & PROVENANCE SCANNER (v3.475.0-staging.eu)...\n');

// 1. Source of Truth & Manifest Parity
console.log('--- Suite 1: Source of Truth & Baseline Manifests ---');
it('JAYT_PUBLIC_COUNT_LEDGER_EU.json exists and contains 50 items', () => {
  const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_EU.json'), 'utf8'));
  assert.strictEqual(ledger.items.length, 50);
  assert.strictEqual(ledger.version, 'v3.475.0-staging.eu');
});

it('JAYT_WALLET_LEDGER_EU.json exists with neutral portal identity state', () => {
  const wallet = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_WALLET_LEDGER_EU.json'), 'utf8'));
  assert.strictEqual(wallet.wallet_three_lanes.lane_a_public_verified.active_count, 0);
  assert.strictEqual(wallet.wallet_three_lanes.lane_b_app_checkout_personalized.active_count, 10);
  assert.strictEqual(wallet.wallet_three_lanes.lane_b_app_checkout_personalized.state, 'PORTAL_IDENTITY_UNVERIFIED');
  assert.strictEqual(wallet.wallet_three_lanes.lane_c_radar_monitoring.active_count, 3);
  assert.strictEqual(wallet.wallet_three_lanes.lane_c_radar_monitoring.state, 'RADAR_UNVERIFIED');
});

it('03_SOURCE_OF_TRUTH/index.html matches Ledger SHA-256 fingerprint', () => {
  const ledgerBuf = fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_EU.json'));
  const ledgerSha = crypto.createHash('sha256').update(ledgerBuf).digest('hex');
  const indexHtml = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/index.html'), 'utf8');
  assert.ok(indexHtml.includes(ledgerSha), 'index.html must contain exact ledger SHA256');
  assert.ok(indexHtml.includes('jayt_storefront_staging_eu.js'), 'index.html must reference jayt_storefront_staging_eu.js');
});

it('staging_deploy_eu files exist with perfect SOT parity', () => {
  const sotJs = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_eu.js'), 'utf8');
  const stgJs = fs.readFileSync(path.join(ROOT, 'staging_deploy_eu/jayt_storefront_staging_eu.js'), 'utf8');
  assert.strictEqual(sotJs, stgJs, 'staging JS must match SOT JS byte-for-byte');
});

// 2. Deal Discovery Engine & 4 Situational Routes
console.log('\n--- Suite 2: Deal Discovery Engine & 4 Situational Action Chips ---');
const jsCode = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_eu.js'), 'utf8');

it('Contains 4 Situational Action Chips with accurate data attributes', () => {
  assert.ok(jsCode.includes('data-situational-route="AN_GI_GAN_DAY"'), 'Must have Ăn gần đây chip');
  assert.ok(jsCode.includes('data-situational-route="DI_CHOI_TOI_NAY"'), 'Must have Đi chơi tối nay chip');
  assert.ok(jsCode.includes('data-situational-route="DI_CHUYEN_TIET_KIEM"'), 'Must have Di chuyển tiết kiệm chip');
  assert.ok(jsCode.includes('data-situational-route="DO_KTX_HOC_TAP"'), 'Must have Đồ KTX & học tập chip');
});

it('Contains Time Slot and Campus Zone filters and clear button', () => {
  assert.ok(jsCode.includes('data-time-filter="SANG"'), 'Must have time filter');
  assert.ok(jsCode.includes('data-campus-filter="HOA_KHANH"'), 'Must have campus filter');
  assert.ok(jsCode.includes('id="btn-clear-discovery-filters"'), 'Must have clear button');
});

// 3. Local-First Decision Calculator
console.log('\n--- Suite 3: Local-First Decision Calculator ---');
it('Calculator has input fields, output display, validation, reset button, and disclaimer', () => {
  assert.ok(jsCode.includes('id="calc-item-price"'), 'Must have price input');
  assert.ok(jsCode.includes('id="res-total-amount"'), 'Must have total display');
  assert.ok(jsCode.includes('id="btn-calc-reset"'), 'Must have reset button');
  assert.ok(jsCode.includes('Số tiền không được là số âm'), 'Must validate negative numbers');
  assert.ok(jsCode.includes('Đây là công cụ tính toán do bạn tự nhập số liệu'), 'Must have disclaimer');
});

// 4. Strict Neutral Portal Validation & Zero Self-Authored Provenance
console.log('\n--- Suite 4: Lane B & Lane C Neutral Portal Identity Validator ---');
const walletLedger = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_WALLET_LEDGER_EU.json'), 'utf8'));

it('Validates all 10 Lane B records are clean portal identities without orphan timestamps', () => {
  const records = walletLedger.wallet_three_lanes.lane_b_app_checkout_personalized.records;
  assert.strictEqual(records.length, 10);
  records.forEach(r => {
    assert.ok(r.merchant_subject, 'Must have merchant_subject');
    assert.ok(r.canonical_action_url.startsWith('https://'), 'Must have canonical HTTPS url');
    assert.strictEqual(r.action_type, 'CHECK_IN_OFFICIAL_APP_OR_CHECKOUT');
    assert.strictEqual(r.account_dependent, true);
    assert.strictEqual(r.evidence_state, 'PORTAL_IDENTITY_UNVERIFIED');
    assert.strictEqual(r.source_identity_observed_at, undefined, 'Must NOT contain self-authored timestamp');
    assert.strictEqual(r.identity_freshness, undefined, 'Must NOT contain self-authored freshness label');
  });
});

it('Validates all 3 Lane C records are neutral radar sources without orphan review dates', () => {
  const records = walletLedger.wallet_three_lanes.lane_c_radar_monitoring.records;
  assert.strictEqual(records.length, 3);
  records.forEach(r => {
    assert.ok(r.source_to_follow, 'Must have source_to_follow');
    assert.ok(r.canonical_action_url.startsWith('https://'), 'Must have canonical HTTPS url');
    assert.strictEqual(r.radar_state, 'RADAR_UNVERIFIED');
    assert.strictEqual(r.last_observed_at, undefined, 'Must NOT contain unreceipted last_observed_at');
    assert.strictEqual(r.next_review_due, undefined, 'Must NOT contain unreceipted next_review_due');
  });
});

// 5. Runtime Provenance & Claim Scanner (Negative Token Check)
console.log('\n--- Suite 5: Runtime Provenance & Claim Scanner ---');
const FORBIDDEN_TOKENS = [
  'Đối soát danh tính',
  'VERIFIED_ACTIVE_MERCHANT_IDENTITY',
  'đối soát:',
  'kênh đối soát',
  'Mua 1 Tặng 1',
  'Happy Lunch',
  'U22',
  'Ngày Tri Ân',
  'voucher đổi thưởng',
  'mã quà tặng',
  'vé sinh viên',
  'giảm 50k',
  'giảm 100k',
  '5.000đ',
  'freeship',
  'còn lượt',
  'hết hạn sau',
  'CGV Vĩnh Trung & Vincom Đà Nẵng',
  'Helio Center Đà Nẵng',
  'Coopmart Đà Nẵng'
];

it('Scans JS rendered voucher view against Forbidden Provenance & Claim Lexicon', () => {
  const voucherFuncMatch = jsCode.match(/function renderVoucherHubView\(\)[\s\S]*?\n  function/);
  assert.ok(voucherFuncMatch, 'renderVoucherHubView function must exist');
  const voucherCode = voucherFuncMatch[0];

  FORBIDDEN_TOKENS.forEach(token => {
    const hasToken = voucherCode.toLowerCase().includes(token.toLowerCase());
    assert.strictEqual(hasToken, false, `Forbidden provenance/claim token found in renderVoucherHubView: "${token}"`);
  });
});

it('Verifies Lane B count label is "Kênh để tự kiểm"', () => {
  assert.ok(jsCode.includes('Kênh để tự kiểm'), 'Must use neutral label "Kênh để tự kiểm"');
  assert.ok(!jsCode.includes('Kênh đối soát'), 'Must NOT use unbacked "Kênh đối soát"');
});

// 6. AccessTrade Quarantine & Zero Affiliate Invariant
console.log('\n--- Suite 6: AccessTrade Quarantine & Zero Affiliate Links ---');
it('Zero occurrence of go.isclix in entire codebase runtime', () => {
  assert.ok(!jsCode.includes('go.isclix'), 'SOT JS must not contain go.isclix');
  const indexHtml = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/index.html'), 'utf8');
  assert.ok(!indexHtml.includes('go.isclix'), 'index.html must not contain go.isclix');
});

console.log(`\n🎉 ALL ${passedTests}/${totalTests} STATIC CONTRACT & PROVENANCE SCANNER TESTS PASSED PERFECTLY!\n`);