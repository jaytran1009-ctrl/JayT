/**
 * JAYT PLATFORM SECTION ET STATIC CONTRACT & CLAIM SCANNER TEST SUITE
 * Governing Directive: JAYT-245 Section ET (Lines 3721-3749)
 * Version: v3.474.0-staging.et
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

console.log('\n🧪 RUNNING JAYT SECTION ET STATIC CONTRACT & CLAIM SCANNER (v3.474.0-staging.et)...\n');

// 1. Source of Truth & Manifest Parity
console.log('--- Suite 1: Source of Truth & Baseline Manifests ---');
it('JAYT_PUBLIC_COUNT_LEDGER_ET.json exists and contains 50 items', () => {
  const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_ET.json'), 'utf8'));
  assert.strictEqual(ledger.items.length, 50);
  assert.strictEqual(ledger.version, 'v3.474.0-staging.et');
});

it('JAYT_WALLET_LEDGER_ET.json exists with 3 lanes and quarantined copy manifest', () => {
  const wallet = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_WALLET_LEDGER_ET.json'), 'utf8'));
  assert.strictEqual(wallet.wallet_three_lanes.lane_a_public_verified.active_count, 0);
  assert.strictEqual(wallet.wallet_three_lanes.lane_b_app_checkout_personalized.active_count, 10);
  assert.strictEqual(wallet.wallet_three_lanes.lane_c_radar_monitoring.active_count, 3);
  assert.strictEqual(wallet.wallet_three_lanes.quarantined_unbacked_copies.length, 10);
});

it('03_SOURCE_OF_TRUTH/index.html matches Ledger SHA-256 fingerprint', () => {
  const ledgerBuf = fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_ET.json'));
  const ledgerSha = crypto.createHash('sha256').update(ledgerBuf).digest('hex');
  const indexHtml = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/index.html'), 'utf8');
  assert.ok(indexHtml.includes(ledgerSha), 'index.html must contain exact ledger SHA256');
  assert.ok(indexHtml.includes('jayt_storefront_staging_et.js'), 'index.html must reference jayt_storefront_staging_et.js');
});

it('staging_deploy_et files exist with perfect SOT parity', () => {
  const sotJs = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_et.js'), 'utf8');
  const stgJs = fs.readFileSync(path.join(ROOT, 'staging_deploy_et/jayt_storefront_staging_et.js'), 'utf8');
  assert.strictEqual(sotJs, stgJs, 'staging JS must match SOT JS byte-for-byte');
});

// 2. Deal Discovery Engine & 4 Situational Routes
console.log('\n--- Suite 2: Deal Discovery Engine & 4 Situational Action Chips ---');
const jsCode = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_et.js'), 'utf8');

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

// 4. Strict Claim-Free Record Metadata Validation
console.log('\n--- Suite 4: Lane B & Lane C Metadata Validator ---');
const walletLedger = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_WALLET_LEDGER_ET.json'), 'utf8'));

it('Validates all 10 Lane B records have complete required metadata', () => {
  const records = walletLedger.wallet_three_lanes.lane_b_app_checkout_personalized.records;
  assert.strictEqual(records.length, 10);
  records.forEach(r => {
    assert.ok(r.merchant_subject, 'Must have merchant_subject');
    assert.ok(r.canonical_action_url.startsWith('https://'), 'Must have canonical HTTPS url');
    assert.strictEqual(r.action_type, 'CHECK_IN_OFFICIAL_APP_OR_CHECKOUT');
    assert.strictEqual(r.account_dependent, true);
    assert.ok(r.source_identity_observed_at, 'Must have observed timestamp');
    assert.strictEqual(r.identity_freshness, 'VERIFIED_ACTIVE_MERCHANT_IDENTITY');
    assert.strictEqual(r.evidence_state, 'PORTAL_IDENTITY_ONLY');
  });
});

it('Validates all 3 Lane C records have complete required metadata', () => {
  const records = walletLedger.wallet_three_lanes.lane_c_radar_monitoring.records;
  assert.strictEqual(records.length, 3);
  records.forEach(r => {
    assert.ok(r.source_to_follow, 'Must have source_to_follow');
    assert.ok(r.canonical_action_url.startsWith('https://'), 'Must have canonical HTTPS url');
    assert.ok(r.last_observed_at, 'Must have last_observed_at');
    assert.ok(r.next_review_due, 'Must have next_review_due');
    assert.strictEqual(r.radar_state, 'RADAR_NO_OFFER_CLAIM');
    assert.strictEqual(r.evidence_state, 'PUBLIC_TRANSIT_OR_COMMUNITY_PORTAL');
  });
});

// 5. Runtime Claim Scanner (Negative Token Check)
console.log('\n--- Suite 5: Runtime Claim Scanner (Zero Unauthorized Promo Claims) ---');
const CLAIM_LEXICON = [
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
  'hết hạn sau'
];

it('Extracts Lane B and Lane C cards and scans against Claim Lexicon', () => {
  const laneBRecords = walletLedger.wallet_three_lanes.lane_b_app_checkout_personalized.records;
  const laneCRecords = walletLedger.wallet_three_lanes.lane_c_radar_monitoring.records;

  const combinedTexts = [
    ...laneBRecords.map(r => `${r.merchant_subject} ${r.instruction_copy}`),
    ...laneCRecords.map(r => `${r.source_to_follow} ${r.instruction_copy}`)
  ].join(' ');

  CLAIM_LEXICON.forEach(token => {
    const hasToken = combinedTexts.toLowerCase().includes(token.toLowerCase());
    assert.strictEqual(hasToken, false, `Forbidden claim token found in Lane B/C: "${token}"`);
  });
});

it('Scans JS rendered voucher view against Claim Lexicon in active DOM code', () => {
  const voucherFuncMatch = jsCode.match(/function renderVoucherHubView\(\)[\s\S]*?\n  function/);
  assert.ok(voucherFuncMatch, 'renderVoucherHubView function must exist');
  const voucherCode = voucherFuncMatch[0];

  CLAIM_LEXICON.forEach(token => {
    const hasToken = voucherCode.toLowerCase().includes(token.toLowerCase());
    assert.strictEqual(hasToken, false, `Forbidden claim token found in renderVoucherHubView: "${token}"`);
  });
});

// 6. AccessTrade Quarantine & Zero Affiliate Invariant
console.log('\n--- Suite 6: AccessTrade Quarantine & Zero Affiliate Links ---');
it('Zero occurrence of go.isclix in entire codebase runtime', () => {
  assert.ok(!jsCode.includes('go.isclix'), 'SOT JS must not contain go.isclix');
  const indexHtml = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/index.html'), 'utf8');
  assert.ok(!indexHtml.includes('go.isclix'), 'index.html must not contain go.isclix');
});

console.log(`\n🎉 ALL ${passedTests}/${totalTests} STATIC CONTRACT & CLAIM SCANNER TESTS PASSED PERFECTLY!\n`);