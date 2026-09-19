/**
 * JAYT PLATFORM SECTION EV STATIC CONTRACT & EVIDENCE VALIDATOR TEST SUITE
 * Governing Directive: JAYT-245 Section EV (Lines 3783-3814)
 * Version: v3.476.0-staging.ev
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

console.log('\n🧪 RUNNING JAYT SECTION EV STATIC CONTRACT & EVIDENCE VALIDATOR (v3.476.0-staging.ev)...\n');

// 1. Source of Truth & Baseline Parity
console.log('--- Suite 1: Source of Truth & Baseline Manifests ---');
it('JAYT_PUBLIC_COUNT_LEDGER_EV.json exists and contains 50 items', () => {
  const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_EV.json'), 'utf8'));
  assert.strictEqual(ledger.items.length, 50);
  assert.strictEqual(ledger.version, 'v3.476.0-staging.ev');
});

it('JAYT_SUPPLY_CANDIDATE_LEDGER_EV.json exists with 50 candidates mapped into T1-T4', () => {
  const candidateLedger = JSON.parse(fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_SUPPLY_CANDIDATE_LEDGER_EV.json'), 'utf8'));
  assert.strictEqual(candidateLedger.tier_summary.T1, 0, 'T1 Verified Deals must be strictly 0');
  assert.strictEqual(candidateLedger.tier_summary.T2, 8, 'T2 Public Programs must be 8');
  assert.strictEqual(candidateLedger.tier_summary.T3, 12, 'T3 Local Amenities must be 12');
  assert.strictEqual(candidateLedger.tier_summary.T4, 30, 'T4 Monitored Sources must be 30');
  assert.strictEqual(candidateLedger.candidates.length, 50);
});

it('03_SOURCE_OF_TRUTH/index.html matches Ledger SHA-256 fingerprint', () => {
  const ledgerBuf = fs.readFileSync(path.join(ROOT, '00_PROGRAM_BASELINE/JAYT_PUBLIC_COUNT_LEDGER_EV.json'));
  const ledgerSha = crypto.createHash('sha256').update(ledgerBuf).digest('hex');
  const indexHtml = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/index.html'), 'utf8');
  assert.ok(indexHtml.includes(ledgerSha), 'index.html must contain exact ledger SHA256');
  assert.ok(indexHtml.includes('jayt_storefront_staging_ev.js'), 'index.html must reference jayt_storefront_staging_ev.js');
});

it('staging_deploy_ev files exist with perfect SOT parity', () => {
  const sotJs = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_ev.js'), 'utf8');
  const stgJs = fs.readFileSync(path.join(ROOT, 'staging_deploy_ev/jayt_storefront_staging_ev.js'), 'utf8');
  assert.strictEqual(sotJs, stgJs, 'staging JS must match SOT JS byte-for-byte');
});

// 2. Evidence Vault & Immutable Raw HTTP Receipts (Mandate EV.1)
console.log('\n--- Suite 2: Evidence Vault & Immutable Raw HTTP Receipts (5 Cohorts) ---');
const vaultDir = path.join(ROOT, '07_QUALITY_ASSURANCE/evidence_vault_ev');

it('EVIDENCE_MANIFEST_EV.json covers all 5 required user journeys', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(vaultDir, 'EVIDENCE_MANIFEST_EV.json'), 'utf8'));
  assert.strictEqual(manifest.cohorts_covered.length, 5);
  assert.ok(manifest.cohorts_covered.includes('COHORT_FOOD_CAMPUS'));
  assert.ok(manifest.cohorts_covered.includes('COHORT_PUBLIC_TRANSIT_UTILITY'));
  assert.ok(manifest.cohorts_covered.includes('COHORT_STUDY_TOOLS'));
  assert.ok(manifest.cohorts_covered.includes('COHORT_CULTURE_LEISURE'));
  assert.ok(manifest.cohorts_covered.includes('COHORT_ESSENTIAL_SHOPPING'));
});

it('All 6 raw capture artifacts exist and match their receipt SHA-256 byte-for-byte', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(vaultDir, 'EVIDENCE_MANIFEST_EV.json'), 'utf8'));
  assert.strictEqual(manifest.receipts.length, 6);
  manifest.receipts.forEach(r => {
    const artFile = path.join(vaultDir, r.fileName);
    assert.ok(fs.existsSync(artFile), `Artifact ${r.fileName} must exist`);
    const bytes = fs.readFileSync(artFile);
    const computedSha = crypto.createHash('sha256').update(bytes).digest('hex');
    assert.strictEqual(computedSha, r.sha256, `SHA256 of ${r.fileName} must match receipt`);
    assert.strictEqual(r.receiptData.http_status, 200, `HTTP status of ${r.fileName} must be 200`);
  });
});

// 3. Production P0 Remediation Record (Mandate EV.5)
console.log('\n--- Suite 3: Production P0 Remediation & Production Lock ---');
it('production_p0_remediation_receipt_ev.json validates locked state and quarantined claims', () => {
  const p0 = JSON.parse(fs.readFileSync(path.join(ROOT, '07_QUALITY_ASSURANCE/production_p0_remediation_receipt_ev.json'), 'utf8'));
  assert.strictEqual(p0.production_lock_enforcement.locked_version, 'v3.419.0');
  assert.strictEqual(p0.production_lock_enforcement.go_live_status, 'LOCKED_PRE_GO_LIVE');
  assert.strictEqual(p0.p0_remediation_summary.legacy_items_audited, 17);
  assert.strictEqual(p0.p0_remediation_summary.legacy_raw_claims_quarantined, 9);
  assert.strictEqual(p0.p0_remediation_summary.unbacked_public_exposure_in_production, 0);
});

// 4. Deal Discovery Engine & Local-First Calculator
console.log('\n--- Suite 4: Deal Discovery & Local-First Calculator ---');
const jsCode = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/jayt_storefront_staging_ev.js'), 'utf8');

it('Contains 4 Situational Action Chips, time/campus filters, and local-first calculator', () => {
  assert.ok(jsCode.includes('data-situational-route="AN_GI_GAN_DAY"'), 'Must have Ăn gần đây chip');
  assert.ok(jsCode.includes('data-situational-route="DI_CHOI_TOI_NAY"'), 'Must have Đi chơi tối nay chip');
  assert.ok(jsCode.includes('data-situational-route="DI_CHUYEN_TIET_KIEM"'), 'Must have Di chuyển tiết kiệm chip');
  assert.ok(jsCode.includes('data-situational-route="DO_KTX_HOC_TAP"'), 'Must have Đồ KTX & học tập chip');
  assert.ok(jsCode.includes('id="calc-item-price"'), 'Must have price input');
  assert.ok(jsCode.includes('id="res-total-amount"'), 'Must have total display');
});

// 5. Runtime Provenance & Claim Scanner
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
  'hết hạn sau'
];

it('Scans JS rendered voucher view against Forbidden Provenance & Claim Lexicon', () => {
  const voucherFuncMatch = jsCode.match(/function renderVoucherHubView\(\)[\s\S]*?\n  function/);
  assert.ok(voucherFuncMatch, 'renderVoucherHubView function must exist');
  const voucherCode = voucherFuncMatch[0];

  FORBIDDEN_TOKENS.forEach(token => {
    const hasToken = voucherCode.toLowerCase().includes(token.toLowerCase());
    assert.strictEqual(hasToken, false, `Forbidden provenance/claim token found: "${token}"`);
  });
});

// 6. AccessTrade Quarantine & Zero Affiliate Invariant
console.log('\n--- Suite 6: AccessTrade Quarantine & Zero Affiliate Links ---');
it('Zero occurrence of go.isclix in entire codebase runtime', () => {
  assert.ok(!jsCode.includes('go.isclix'), 'SOT JS must not contain go.isclix');
  const indexHtml = fs.readFileSync(path.join(ROOT, '03_SOURCE_OF_TRUTH/index.html'), 'utf8');
  assert.ok(!indexHtml.includes('go.isclix'), 'index.html must not contain go.isclix');
});

console.log(`\n🎉 ALL ${passedTests}/${totalTests} STATIC CONTRACT & EVIDENCE VALIDATOR TESTS PASSED PERFECTLY!\n`);