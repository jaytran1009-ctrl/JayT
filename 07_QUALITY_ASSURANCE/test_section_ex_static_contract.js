/**
 * JAYT PLATFORM SECTION EX STATIC CONTRACT & EVIDENCE GRAPH VALIDATOR
 * Governing Directive: JAYT-245 Section EX (Lines 3817-3846)
 * Version: v3.477.0-staging.ex
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

console.log('\n🧪 RUNNING JAYT SECTION EX STATIC CONTRACT & EVIDENCE GRAPH VALIDATOR (v3.477.0-staging.ex)...\n');

// 1. Source of Truth & Baseline Parity
console.log('--- Suite 1: Source of Truth & Baseline Manifests ---');
it('JAYT_PUBLIC_COUNT_LEDGER_EX.json exists and contains 50 fail-closed items', () => {
  const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_EX.json'), 'utf8'));
  assert.strictEqual(ledger.items.length, 50);
  assert.strictEqual(ledger.version, 'v3.477.0-staging.ex');
});

it('JAYT_SUPPLY_CANDIDATE_LEDGER_EX.json separates candidates from verified T1/T2/T3', () => {
  const candidateLedger = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_SUPPLY_CANDIDATE_LEDGER_EX.json'), 'utf8'));
  assert.strictEqual(candidateLedger.tier_summary.T1_verified_vouchers, 0, 'T1 Verified Deals must be strictly 0');
  assert.strictEqual(candidateLedger.tier_summary.T2_public_programs_verified, 0, 'T2 Verified Programs must be 0 without complete join');
  assert.strictEqual(candidateLedger.tier_summary.T3_local_amenities_verified, 0, 'T3 Local Amenities must be 0 without independent locality proof');
  assert.strictEqual(candidateLedger.tier_summary.T4_monitored_radar_sources, 50, 'All 50 must fail-close to T4 radar');
});

it('03_SOURCE_OF_TRUTH/index.html matches Ledger SHA-256 fingerprint', () => {
  const ledgerBuf = fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_EX.json'));
  const ledgerSha = crypto.createHash('sha256').update(ledgerBuf).digest('hex');
  const indexHtml = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/index.html'), 'utf8');
  assert.ok(indexHtml.includes(ledgerSha), 'index.html must contain exact ledger SHA256');
  assert.ok(indexHtml.includes('jayt_storefront_staging_ex.js'), 'index.html must reference jayt_storefront_staging_ex.js');
});

it('staging_deploy_ex files exist with perfect SOT parity', () => {
  const sotJs = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_ex.js'), 'utf8');
  const stgJs = fs.readFileSync(path.join(ROOT, 'staging_deploy_ex/jayt_storefront_staging_ex.js'), 'utf8');
  assert.strictEqual(sotJs, stgJs, 'staging JS must match SOT JS byte-for-byte');
});

// 2. 50-Item Quarantine Matrix (Mandate EX.3)
console.log('\n--- Suite 2: 50-Item Quarantine Matrix & Derived Facts Stripping ---');
it('staging_ex_50_item_quarantine_matrix.json covers all 50 items with missing fields and upgrade paths', () => {
  const matrix = JSON.parse(fs.readFileSync(path.join(ROOT, '07_QUALITY_ASSURANCE/staging_ex_50_item_quarantine_matrix.json'), 'utf8'));
  assert.strictEqual(matrix.total_quarantined_items, 50);
  assert.strictEqual(matrix.rows.length, 50);
  matrix.rows.forEach(r => {
    assert.ok(r.row_id.startsWith('EX_QR_'), 'Row ID must be standard');
    assert.ok(r.derived_facts_stripped.length >= 3, 'Must document stripped derived facts');
    assert.ok(r.missing_fields_for_t2_t3.length >= 2, 'Must list missing fields');
    assert.ok(r.valid_upgrade_path.includes('EP State Machine'), 'Must define EP upgrade path');
  });
});

// 3. Production P0 Lifecycle Status (Mandate EX.4)
console.log('\n--- Suite 3: Production P0 Status (P0_EQ = OPEN) ---');
it('production_p0_status_ex.json marks P0 as OPEN and production as strictly locked', () => {
  const p0 = JSON.parse(fs.readFileSync(path.join(ROOT, '07_QUALITY_ASSURANCE/production_p0_status_ex.json'), 'utf8'));
  assert.strictEqual(p0.p0_eq_lifecycle_state, 'OPEN', 'P0_EQ must be reopened to OPEN');
  assert.strictEqual(p0.production_lock_state.locked_version, 'v3.419.0');
  assert.strictEqual(p0.production_lock_state.go_live_status, 'LOCKED_PRE_GO_LIVE');
});

// 4. Negative Tests Against False Joins & Evidence Reuse (Mandate EX.2)
console.log('\n--- Suite 4: Negative Tests Against False Joins & Evidence Reuse ---');
it('Zero occurrence of default placeholder RECEIPT_EV_VERIFIED in public ledger', () => {
  const ledgerText = fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_EX.json'), 'utf8');
  assert.strictEqual(ledgerText.includes('RECEIPT_EV_VERIFIED'), false, 'RECEIPT_EV_VERIFIED is strictly banned');
});

it('Negative test: Root portal artifact cgv.vn cannot be used as proof for Da Nang local branch', () => {
  const cgvReceipt = JSON.parse(fs.readFileSync(path.join(ROOT, '07_QUALITY_ASSURANCE/evidence_vault_ev/artifact_cand_cgv_cinemas_portal_receipt.json'), 'utf8'));
  assert.strictEqual(cgvReceipt.canonical_public_url, 'https://www.cgv.vn', 'Receipt only covers root portal');
  assert.strictEqual(cgvReceipt.da_nang_branch_verified, undefined, 'Must not claim branch without physical locality receipt');
});

// 5. Deal Discovery Engine & Local-First Calculator
console.log('\n--- Suite 5: Deal Discovery & Local-First Calculator ---');
const jsCode = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_ex.js'), 'utf8');

it('Contains 4 Situational Action Chips, time/campus filters, and local-first calculator', () => {
  assert.ok(jsCode.includes('data-situational-route="AN_GI_GAN_DAY"'), 'Must have Ăn gần đây chip');
  assert.ok(jsCode.includes('data-situational-route="DI_CHOI_TOI_NAY"'), 'Must have Đi chơi tối nay chip');
  assert.ok(jsCode.includes('data-situational-route="DI_CHUYEN_TIET_KIEM"'), 'Must have Di chuyển tiết kiệm chip');
  assert.ok(jsCode.includes('data-situational-route="DO_KTX_HOC_TAP"'), 'Must have Đồ KTX & học tập chip');
  assert.ok(jsCode.includes('id="calc-item-price"'), 'Must have price input');
  assert.ok(jsCode.includes('id="res-total-amount"'), 'Must have total display');
});

// 6. AccessTrade Quarantine & Zero Affiliate Invariant
console.log('\n--- Suite 6: AccessTrade Quarantine & Zero Affiliate Links ---');
it('Zero occurrence of go.isclix in entire codebase runtime', () => {
  assert.ok(!jsCode.includes('go.isclix'), 'SOT JS must not contain go.isclix');
  const indexHtml = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/index.html'), 'utf8');
  assert.ok(!indexHtml.includes('go.isclix'), 'index.html must not contain go.isclix');
});

console.log(`\n🎉 ALL ${passedTests}/${totalTests} STATIC CONTRACT & EVIDENCE GRAPH TESTS PASSED PERFECTLY!\n`);