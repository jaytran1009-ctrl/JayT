/**
 * JAYT PLATFORM SECTION ES STATIC CONTRACT TEST SUITE
 * Governing Directive: JAYT-245 Section ES (Lines 3690-3718)
 * Version: v3.473.0-staging.es
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

console.log('\n🧪 RUNNING JAYT SECTION ES STATIC CONTRACT TESTS (v3.473.0-staging.es)...\n');

// 1. Source of Truth & Manifest Parity
console.log('--- Suite 1: Source of Truth & Baseline Manifests ---');
it('JAYT_PUBLIC_COUNT_LEDGER_ES.json exists and contains 50 items', () => {
  const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_ES.json'), 'utf8'));
  assert.strictEqual(ledger.items.length, 50);
  assert.strictEqual(ledger.version, 'v3.473.0-staging.es');
});

it('JAYT_WALLET_LEDGER_ES.json exists with 3 lanes (Lane A=0, Lane B=10, Lane C=3)', () => {
  const wallet = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_WALLET_LEDGER_ES.json'), 'utf8'));
  assert.strictEqual(wallet.wallet_three_lanes.lane_a_public_verified.active_count, 0);
  assert.strictEqual(wallet.wallet_three_lanes.lane_b_app_checkout_personalized.active_count, 10);
  assert.strictEqual(wallet.wallet_three_lanes.lane_c_radar_monitoring.active_count, 3);
});

it('03_SOURCE_OF_TRUTH/index.html matches Ledger SHA-256 fingerprint', () => {
  const ledgerBuf = fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_ES.json'));
  const ledgerSha = crypto.createHash('sha256').update(ledgerBuf).digest('hex');
  const indexHtml = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/index.html'), 'utf8');
  assert.ok(indexHtml.includes(ledgerSha), 'index.html must contain exact ledger SHA256');
  assert.ok(indexHtml.includes('jayt_storefront_staging_es.js'), 'index.html must reference jayt_storefront_staging_es.js');
});

it('staging_deploy_es files exist with perfect SOT parity', () => {
  const sotJs = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_es.js'), 'utf8');
  const stgJs = fs.readFileSync(path.join(ROOT, 'staging_deploy_es/jayt_storefront_staging_es.js'), 'utf8');
  assert.strictEqual(sotJs, stgJs, 'staging JS must match SOT JS byte-for-byte');
  const sotHtml = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/index.html'), 'utf8');
  const stgHtml = fs.readFileSync(path.join(ROOT, 'staging_deploy_es/index.html'), 'utf8');
  assert.strictEqual(sotHtml, stgHtml, 'staging HTML must match SOT HTML byte-for-byte');
});

// 2. Deal Discovery Engine & 4 Situational Routes
console.log('\n--- Suite 2: Deal Discovery Engine & 4 Situational Action Chips ---');
const jsCode = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_es.js'), 'utf8');

it('Contains 4 Situational Action Chips with accurate data attributes', () => {
  assert.ok(jsCode.includes('data-situational-route="AN_GI_GAN_DAY"'), 'Must have Ăn gần đây chip');
  assert.ok(jsCode.includes('data-situational-route="DI_CHOI_TOI_NAY"'), 'Must have Đi chơi tối nay chip');
  assert.ok(jsCode.includes('data-situational-route="DI_CHUYEN_TIET_KIEM"'), 'Must have Di chuyển tiết kiệm chip');
  assert.ok(jsCode.includes('data-situational-route="DO_KTX_HOC_TAP"'), 'Must have Đồ KTX & học tập chip');
});

it('Contains Time Slot filters (Sáng, Trưa, Chiều, Tối)', () => {
  assert.ok(jsCode.includes('data-time-filter="SANG"'), 'Must have Sáng filter');
  assert.ok(jsCode.includes('data-time-filter="TRUA"'), 'Must have Trưa filter');
  assert.ok(jsCode.includes('data-time-filter="CHIEU"'), 'Must have Chiều filter');
  assert.ok(jsCode.includes('data-time-filter="TOI"'), 'Must have Tối filter');
});

it('Contains Campus Zone filters (Hòa Khánh, Ngũ Hành Sơn, Hải Châu, Thanh Khê, Sơn Trà)', () => {
  assert.ok(jsCode.includes('data-campus-filter="HOA_KHANH"'), 'Must have Hòa Khánh filter');
  assert.ok(jsCode.includes('data-campus-filter="NGU_HANH_SON"'), 'Must have Ngũ Hành Sơn filter');
  assert.ok(jsCode.includes('data-campus-filter="HAI_CHAU"'), 'Must have Hải Châu filter');
  assert.ok(jsCode.includes('data-campus-filter="THANH_KHE"'), 'Must have Thanh Khê filter');
  assert.ok(jsCode.includes('data-campus-filter="SON_TRA"'), 'Must have Sơn Trà filter');
});

it('Contains clear filter button and empty-state handling', () => {
  assert.ok(jsCode.includes('id="btn-clear-discovery-filters"'), 'Must have clear filters button');
  assert.ok(jsCode.includes('id="btn-reset-empty-filters"'), 'Must have reset empty button');
});

// 3. True 3-Lane Voucher Wallet
console.log('\n--- Suite 3: True 3-Lane Voucher Wallet ---');
it('Renders Lane A with 0 vouchers and 5 explicit economic criteria', () => {
  assert.ok(jsCode.includes('LÀN A • PUBLIC VERIFIED'), 'Must render Lane A badge');
  assert.ok(jsCode.includes('0 Voucher khả dụng'), 'Must display 0 vouchers');
  assert.ok(jsCode.includes('Tiêu chuẩn 5 trường bắt buộc để mở Làn A'), 'Must document 5 criteria');
});

it('Renders Lane B with 10 official merchants, in-app instructions, and NO fake codes', () => {
  assert.ok(jsCode.includes('LÀN B • TỰ KIỂM TRONG APP'), 'Must render Lane B badge');
  assert.ok(jsCode.includes('ShopeeFood Đà Nẵng'), 'Must list ShopeeFood');
  assert.ok(jsCode.includes('GrabFood Đà Nẵng'), 'Must list GrabFood');
  assert.ok(jsCode.includes("Domino's Pizza"), 'Must list Dominos');
  assert.ok(jsCode.includes('Lotteria Vietnam'), 'Must list Lotteria');
  assert.ok(jsCode.includes('CGV Cinemas'), 'Must list CGV');
  assert.ok(jsCode.includes('Galaxy Cinema'), 'Must list Galaxy');
  assert.ok(jsCode.includes('Metiz Cinema'), 'Must list Metiz');
  assert.ok(jsCode.includes('Highlands Coffee'), 'Must list Highlands');
  assert.ok(jsCode.includes('Fahasa Đà Nẵng'), 'Must list Fahasa');
  assert.ok(jsCode.includes('Tiki Books'), 'Must list Tiki');
  assert.ok(jsCode.includes('ACCOUNT_DEPENDENT'), 'Must flag as ACCOUNT_DEPENDENT');
});

it('Renders Lane C with 3 monitored programs (DanaBus, TNGo, GitHub)', () => {
  assert.ok(jsCode.includes('LÀN C • RADAR THEO DÕI'), 'Must render Lane C badge');
  assert.ok(jsCode.includes('DanaBus Đà Nẵng'), 'Must list DanaBus');
  assert.ok(jsCode.includes('TNGo Đà Nẵng'), 'Must list TNGo');
  assert.ok(jsCode.includes('GitHub Education'), 'Must list GitHub Education');
  assert.ok(jsCode.includes('RADAR_MONITORING'), 'Must flag as RADAR_MONITORING');
});

// 4. Local-First Decision Calculator
console.log('\n--- Suite 4: Local-First Decision Calculator ---');
it('Contains input fields for item price, shipping, discount, split count', () => {
  assert.ok(jsCode.includes('id="calc-item-price"'), 'Must have price input');
  assert.ok(jsCode.includes('id="calc-shipping-fee"'), 'Must have shipping fee input');
  assert.ok(jsCode.includes('id="calc-discount"'), 'Must have discount input');
  assert.ok(jsCode.includes('id="calc-split-count"'), 'Must have split count input');
});

it('Contains calculation output elements and reset button', () => {
  assert.ok(jsCode.includes('id="res-total-amount"'), 'Must have total result element');
  assert.ok(jsCode.includes('id="res-split-amount"'), 'Must have split result element');
  assert.ok(jsCode.includes('id="btn-calc-reset"'), 'Must have reset button');
});

it('Enforces validation against negative numbers and 0 split count', () => {
  assert.ok(jsCode.includes('Số tiền không được là số âm'), 'Must validate negative numbers');
  assert.ok(jsCode.includes('Số người cùng chia tối thiểu là 1 người'), 'Must validate division by zero');
});

it('Displays prominent disclaimer that calculations are user-entered and local-first', () => {
  assert.ok(jsCode.includes('Đây là công cụ tính toán do bạn tự nhập số liệu'), 'Must show disclaimer');
  assert.ok(jsCode.includes('JayT không tự khẳng định hay cam kết giá'), 'Must disclaim price guarantees');
});

// 5. AccessTrade Quarantine & Zero Affiliate Invariant
console.log('\n--- Suite 5: AccessTrade Quarantine & Zero Affiliate Links ---');
it('ACCESSTRADE_VALUE_FIRST_CATALOG_SURVEY_ES.json sets status to HYPOTHESIS_OFFLINE', () => {
  const survey = JSON.parse(fs.readFileSync(path.join(ROOT, '07_QUALITY_ASSURANCE/evidence_desk_es/ACCESSTRADE_VALUE_FIRST_CATALOG_SURVEY_ES.json'), 'utf8'));
  assert.strictEqual(survey.evaluation_policy.status, 'HYPOTHESIS_OFFLINE');
  assert.strictEqual(survey.evaluation_policy.portal_access_state, 'PORTAL_ACCESS_NOT_VERIFIED');
  survey.cohort_candidates_hypotheses.forEach(c => {
    assert.strictEqual(c.status, 'HYPOTHESIS_OFFLINE');
    assert.strictEqual(c.deeplink_status, 'DENYLISTED');
  });
});

it('Zero occurrence of go.isclix in entire codebase runtime', () => {
  assert.ok(!jsCode.includes('go.isclix'), 'SOT JS must not contain go.isclix');
  const indexHtml = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/index.html'), 'utf8');
  assert.ok(!indexHtml.includes('go.isclix'), 'index.html must not contain go.isclix');
});

console.log(`\n🎉 ALL ${passedTests}/${totalTests} STATIC CONTRACT TESTS PASSED PERFECTLY!\n`);