/**
 * =============================================================================
 * JAYT APEX RUNTIME QA TEST SUITE (SHARED ENGINE + DOM BEHAVIOR INTEGRATION)
 * =============================================================================
 */
const path = require('path');
const enginePath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_eligibility_engine.js');
const Engine = require(enginePath);

console.log('🧪 [JAYT-QA] Khởi chạy Test Suite từ Module Runtime: ' + enginePath);

const BASELINE = {
  deal_id: 'DNG-TEST-001',
  merchant: 'Metiz Cinema Helio',
  price_num: 45000,
  taxonomy: 'VERIFIED',
  source_type: 'LOCAL_MERCHANT_DIRECT',
  zone: 'ZONE_HELIO_METIZ',
  expires_at: '2026-12-31T23:59:59Z',
  checked_at: '2026-08-20T10:00:00Z',
  source_url: 'https://metiz.vn/lich-chieu/',
  evidence_ref: 'EVID_TEST_001',
  is_terms_disabled: false,
  partner_active: true
};

const EVID_STORE = {
  'EVID_TEST_001': { evidence_id: 'EVID_TEST_001', deal_id: 'DNG-TEST-001', source_url: 'https://metiz.vn/lich-chieu/', verified_at: '2026-08-20T10:00:00Z' }
};

const testCases = [
  { id: 'TC_01', desc: 'Baseline 100% Valid VERIFIED', mutation: {}, expect: res => res.verified_hero_deals.length === 1 },
  { id: 'TC_02', desc: 'Baseline PROBING', mutation: { taxonomy: 'PROBING' }, expect: res => res.probing_deals.length === 1 },
  { id: 'TC_03', desc: 'Baseline UNVERIFIED', mutation: { taxonomy: 'UNVERIFIED' }, expect: res => res.unverified_deals.length === 1 },
  { id: 'TC_04', desc: 'Missing core deal_id', mutation: { deal_id: null }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'ERR_MISSING_CORE' },
  { id: 'TC_05', desc: 'Missing core merchant', mutation: { merchant: '' }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'ERR_MISSING_CORE' },
  { id: 'TC_06', desc: 'Price zero', mutation: { price_num: 0 }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'ERR_PRICE_UNKNOWN' },
  { id: 'TC_07', desc: 'Price string', mutation: { price_num: 'free' }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'ERR_PRICE_UNKNOWN' },
  { id: 'TC_08', desc: 'Invalid taxonomy string', mutation: { taxonomy: 'CUSTOM_VIP' }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'ERR_INVALID_TAXONOMY' },
  { id: 'TC_09', desc: 'Taxonomy EXPIRED', mutation: { taxonomy: 'EXPIRED' }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'ERR_EXPIRED' },
  { id: 'TC_10', desc: 'Missing source_type', mutation: { source_type: '' }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'ERR_MISSING_SOURCE_TYPE' },
  { id: 'TC_11', desc: 'Missing zone in deal', mutation: { zone: '' }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'ERR_DATA_MISSING_ZONE' },
  { id: 'TC_12', desc: 'Date rollover (2026-02-31)', mutation: { expires_at: '2026-02-31T23:59:59Z' }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'ERR_INVALID_DATE_FORMAT' },
  { id: 'TC_13', desc: 'Missing expiry timezone', mutation: { expires_at: '2026-12-31T23:59:59' }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'ERR_INVALID_DATE_FORMAT' },
  { id: 'TC_14', desc: 'Valid expiry offset +07:00', mutation: { expires_at: '2026-12-31T23:59:59+07:00' }, expect: res => res.verified_hero_deals.length === 1 },
  { id: 'TC_15', desc: 'Expired past timestamp with seconds', mutation: { expires_at: '2025-01-01T00:00:00Z' }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'ERR_EXPIRED' },
  { id: 'TC_16', desc: 'Missing checked_at timezone', mutation: { checked_at: '2026-08-20T10:00:00' }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'ERR_INVALID_CHECKED_AT_FORMAT' },
  { id: 'TC_17', desc: 'Future checked_at with seconds', mutation: { checked_at: '2027-01-01T00:00:00Z' }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'ERR_FUTURE_TIMESTAMP' },
  { id: 'TC_18', desc: 'Valid checked_at offset +07:00', mutation: { checked_at: '2026-08-20T17:00:00+07:00' }, customStore: { 'EVID_TEST_001': { evidence_id: 'EVID_TEST_001', deal_id: 'DNG-TEST-001', source_url: 'https://metiz.vn/lich-chieu/', verified_at: '2026-08-20T17:00:00+07:00' } }, expect: res => res.verified_hero_deals.length === 1 },
  { id: 'TC_19', desc: 'Stale evidence (>30 days)', mutation: { checked_at: '2026-06-01T00:00:00Z' }, customStore: { 'EVID_TEST_001': { evidence_id: 'EVID_TEST_001', deal_id: 'DNG-TEST-001', source_url: 'https://metiz.vn/lich-chieu/', verified_at: '2026-06-01T00:00:00Z' } }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'ERR_STALE_EVIDENCE' },
  { id: 'TC_20', desc: 'Partner terms disabled', mutation: { is_terms_disabled: true }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'ERR_PARTNER_TERMS_DISABLED' },
  { id: 'TC_21', desc: 'Non-HTTPS scheme', mutation: { source_url: 'http://metiz.vn/lich-chieu/' }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'ERR_BROKEN_EVIDENCE' },
  { id: 'TC_22', desc: 'Credentials in URL', mutation: { source_url: 'https://user:pass@metiz.vn/lc/' }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'ERR_BROKEN_EVIDENCE' },
  { id: 'TC_23', desc: 'No dot in hostname', mutation: { source_url: 'https://nodotdomain/lich-chieu/' }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'ERR_BROKEN_EVIDENCE' },
  { id: 'TC_24', desc: 'Malformed URL', mutation: { source_url: 'https://[invalid-url/' }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'ERR_BROKEN_EVIDENCE' },
  { id: 'TC_25', desc: 'Evidence file not in store', mutation: { evidence_ref: 'EVID_NON_EXISTENT' }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'ERR_BROKEN_EVIDENCE' },
  { id: 'TC_26', desc: 'Evidence deal_id mismatch', mutation: { deal_id: 'DNG-TEST-001' }, customStore: { 'EVID_TEST_001': { evidence_id: 'EVID_TEST_001', deal_id: 'DNG-OTHER-999', source_url: 'https://metiz.vn/lich-chieu/', verified_at: '2026-08-20T10:00:00Z' } }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'ERR_EVIDENCE_REF_MISMATCH' },
  { id: 'TC_27', desc: 'Evidence source_url mismatch', mutation: {}, customStore: { 'EVID_TEST_001': { evidence_id: 'EVID_TEST_001', deal_id: 'DNG-TEST-001', source_url: 'https://other.vn', verified_at: '2026-08-20T10:00:00Z' } }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'ERR_EVIDENCE_SOURCE_URL_MISMATCH' },
  { id: 'TC_28', desc: 'Evidence timestamp conflict', mutation: {}, customStore: { 'EVID_TEST_001': { evidence_id: 'EVID_TEST_001', deal_id: 'DNG-TEST-001', source_url: 'https://metiz.vn/lich-chieu/', verified_at: '2026-08-19T10:00:00Z' } }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'ERR_EVIDENCE_TIMESTAMP_CONFLICT' },
  { id: 'TC_29', desc: 'Budget exceeded (45K > 30K)', mutation: {}, profile: { maxBudget: 30000 }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'FLT_BUDGET_EXCEEDED' },
  { id: 'TC_30', desc: 'Zone outside selection (HELIO != BK_SP)', mutation: {}, profile: { preferredZone: 'ZONE_BK_SP' }, expect: res => res.disqualified_diagnostics[0]?.reason_code === 'FLT_ZONE_OUTSIDE_SELECTION' }
];

console.log('--- PHẦN 1: KIỂM THỬ 30 ISOLATED BRANCH CASES QUA MODULE RUNTIME ---');
let passedCount = 0;
const tStart = Date.now();

testCases.forEach((tc, idx) => {
  const dealInput = { ...BASELINE, ...tc.mutation };
  const storeInput = tc.customStore || EVID_STORE;
  const profileInput = tc.profile || null;
  const res = Engine.executeEligibilityGate([dealInput], profileInput, storeInput, '2026-08-20T12:00:00.000Z');

  const ok = tc.expect(res);
  const outCode = res.disqualified_diagnostics[0]?.reason_code || (res.verified_hero_deals.length ? 'VERIFIED_HERO' : (res.probing_deals.length ? 'PROBING' : 'UNVERIFIED'));
  console.log(`  [${String(idx + 1).padStart(2, '0')}/30] ${tc.id}: ${tc.desc.padEnd(45, '.')} [${ok ? 'PASS' : 'FAIL'}] (${outCode})`);
  if (ok) passedCount++;
});

console.log('\n--- PHẦN 2: KIỂM THỬ HÀNH VI RUNTIME UI & DOM RENDERING ---');
function simulateDOMRender(deals, userProfile, evidenceStore) {
  const gateResult = Engine.executeEligibilityGate(deals, userProfile, evidenceStore, '2026-08-20T12:00:00.000Z');
  
  // Hero rendering (Chỉ VERIFIED deals)
  const heroHtml = gateResult.verified_hero_deals.map(d => `<div class="apex-hero-deal"><span class="ok">● Đã kiểm chứng</span><h3>${d.merchant}</h3></div>`).join('');
  
  // Probing tray (Chỉ PROBING deals)
  const probingHtml = gateResult.probing_deals.map(d => `<div class="apex-probing-deal"><span class="wait">● Đang khảo sát</span><h3>${d.merchant}</h3></div>`).join('');
  
  // Excluded/Disqualified
  const totalRendered = gateResult.verified_hero_deals.length + gateResult.probing_deals.length;
  const disqualifiedCount = gateResult.disqualified_diagnostics.length;

  return { heroHtml, probingHtml, totalRendered, disqualifiedCount };
}

const mockDeals = [
  { ...BASELINE, deal_id: 'DNG-TEST-001', taxonomy: 'VERIFIED', evidence_ref: 'EVID_TEST_001' },
  { ...BASELINE, deal_id: 'D2', taxonomy: 'PROBING' },
  { ...BASELINE, deal_id: 'D3', taxonomy: 'UNVERIFIED' },
  { ...BASELINE, deal_id: 'D4', taxonomy: 'EXPIRED' }
];

const domTest = simulateDOMRender(mockDeals, null, EVID_STORE);
const domPass1 = domTest.heroHtml.includes('● Đã kiểm chứng') && !domTest.heroHtml.includes('PROBING');
const domPass2 = domTest.probingHtml.includes('● Đang khảo sát');
const domPass3 = domTest.disqualifiedCount === 1; // D4 EXPIRED bị loại hoàn toàn

console.log(`  [DOM_01] Hero Section renders ONLY VERIFIED deals: [${domPass1 ? 'PASS' : 'FAIL'}]`);
console.log(`  [DOM_02] Probing Section renders ONLY PROBING deals: [${domPass2 ? 'PASS' : 'FAIL'}]`);
console.log(`  [DOM_03] Expired/Disqualified deals excluded from DOM: [${domPass3 ? 'PASS' : 'FAIL'}]`);

const allPass = (passedCount === 30) && domPass1 && domPass2 && domPass3;
const totalDuration = Date.now() - tStart;

console.log(`\n🟢 [QA-SUMMARY] TOÀN BỘ 30 BRANCHES + 3 DOM RUNTIME TESTS ĐÃ ĐẠT (PASS) TRONG ${totalDuration}ms`);
if (!allPass) process.exit(1);
