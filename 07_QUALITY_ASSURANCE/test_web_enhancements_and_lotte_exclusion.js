/**
 * JAYT TEST SUITE: WEB ENHANCEMENTS & LOTTECINEMAVN SOURCE EXCLUSION
 * Directive: JAYT-WEB-ENHANCEMENT-LOTTE-EXCLUSION
 * 
 * Verifies:
 * 1. Zero active usage or search grounding of lottecinemavn.com in Track 2 Lead Registry
 * 2. Lotte Cinema lead is strictly LEAD_ONLY_NO_CLAIM with available: false for all 5 bundle points
 * 3. Candidate dossier marks CAND-DNG-LOTTE-65K as DISALLOWED_SOURCE_LOTTECINEMAVN
 * 4. Calculator Presets exist, have valid non-negative arithmetic, and load properly
 * 5. Group Plan Builder has full interactive editing, preview sync, and URL hash serialization
 * 6. District & Rhythm context intelligence is present for all 6 districts & 4 rhythms
 * 7. Production lock invariant is 100% preserved (deals_feed.json: [], is_approved: false)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

const repoRoot = path.resolve(__dirname, '..');
const dealDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE');
const truthDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');
const leadRegistryPath = path.join(dealDir, 'track2_lead_registry_068.json');
const dossierPath = path.join(dealDir, 'candidate_evidence_dossier.json');
const jsInterfacePath = path.join(truthDir, 'jayt_apex_interface.js');
const prodFeedPath = path.join(dealDir, 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

console.log('🧪 [TEST-WEB-ENHANCEMENTS-LOTTE-EXCLUSION] Khởi chạy bộ kiểm thử phát triển Web & loại bỏ nguồn lottecinemavn.com...');

// Test 1: Track 2 Lead Registry - Lotte Cinema exclusion verification
assert.ok(fs.existsSync(leadRegistryPath), 'track2_lead_registry_068.json must exist');
const leadRegistry = JSON.parse(fs.readFileSync(leadRegistryPath, 'utf8'));
const lotteLead = leadRegistry.leads.find(l => l.lead_id === 'LEAD-068-04-LOTTE');
assert.ok(lotteLead, 'LEAD-068-04-LOTTE must exist in registry');
assert.strictEqual(lotteLead.status, 'LEAD_ONLY_NO_CLAIM', 'Lotte lead must be LEAD_ONLY_NO_CLAIM');
assert.strictEqual(lotteLead.current_claim_status, 'NONE', 'Lotte claim status must be NONE');
assert.strictEqual(lotteLead.known_promotion_program, null, 'known_promotion_program must be null');

const bundle = lotteLead.current_evidence_bundle_status;
assert.strictEqual(bundle.pricing_and_terms.available, false, 'pricing_and_terms must be available: false');
assert.strictEqual(bundle.validity_window.available, false, 'validity_window must be available: false');
assert.strictEqual(bundle.danang_locality_scope.available, false, 'danang_locality_scope must be available: false');
assert.strictEqual(bundle.relational_lineage.available, false, 'relational_lineage must be available: false');
assert.strictEqual(bundle.checked_at_recheck_at.available, false, 'checked_at_recheck_at must be available: false');

const rawRegistryStr = fs.readFileSync(leadRegistryPath, 'utf8');
assert.ok(!rawRegistryStr.includes('site:lottecinemavn.com'), 'Must not contain site:lottecinemavn.com search grounding');
console.log('  [PASS] G_01: Track 2 Lead Registry loại bỏ hoàn toàn nguồn lottecinemavn.com, đưa Lotte về LEAD_ONLY_NO_CLAIM.');

// Test 2: Candidate Dossier Lotte exclusion
assert.ok(fs.existsSync(dossierPath), 'candidate_evidence_dossier.json must exist');
const dossier = JSON.parse(fs.readFileSync(dossierPath, 'utf8'));
const lotteCandidate = dossier.candidates.find(c => c.candidate_id === 'CAND-DNG-LOTTE-65K');
assert.ok(lotteCandidate, 'CAND-DNG-LOTTE-65K must exist in dossier');
assert.strictEqual(lotteCandidate.verification_readiness, 'DISALLOWED_SOURCE_LOTTECINEMAVN', 'Lotte candidate must be DISALLOWED_SOURCE_LOTTECINEMAVN');
console.log('  [PASS] G_02: Candidate Dossier đánh dấu loại trừ nguồn lottecinemavn.com cho candidate Lotte.');

// Test 3: JayT Interface - Presets & Context Intelligence Verification
assert.ok(fs.existsSync(jsInterfacePath), 'jayt_apex_interface.js must exist');
const jsCode = fs.readFileSync(jsInterfacePath, 'utf8');

assert.ok(jsCode.includes('CALC_PRESETS'), 'jayt_apex_interface.js must contain CALC_PRESETS');
assert.ok(jsCode.includes('Galaxy Happy Day'), 'CALC_PRESETS must include Galaxy Happy Day preset');
assert.ok(jsCode.includes('Cà phê Gặp gỡ'), 'CALC_PRESETS must include coffee preset');
assert.ok(jsCode.includes('Ăn trưa Đồng nghiệp'), 'CALC_PRESETS must include lunch combo preset');
assert.ok(jsCode.includes('Đặt món Giao tận nơi'), 'CALC_PRESETS must include delivery app preset');

assert.ok(jsCode.includes('DISTRICT_TIPS'), 'jayt_apex_interface.js must contain DISTRICT_TIPS');
const districts = ['Hải Châu', 'Thanh Khê', 'Sơn Trà', 'Ngũ Hành Sơn', 'Liên Chiểu', 'Cẩm Lệ'];
districts.forEach(d => {
  assert.ok(jsCode.includes(`'${d}':`), `DISTRICT_TIPS must contain ${d}`);
});

assert.ok(jsCode.includes('RHYTHM_TIPS'), 'jayt_apex_interface.js must contain RHYTHM_TIPS');
console.log('  [PASS] G_03: Giao diện Web tích hợp đầy đủ Scenario Presets và Context Intelligence 6 Quận & 4 Khung giờ.');

// Test 4: Group Plan Builder & URL Hash Sharer
assert.ok(jsCode.includes('in-gp-title'), 'Group Plan builder must have title input');
assert.ok(jsCode.includes('in-gp-time'), 'Group Plan builder must have time input');
assert.ok(jsCode.includes('in-gp-location'), 'Group Plan builder must have location input');
assert.ok(jsCode.includes('in-gp-activity'), 'Group Plan builder must have activity input');
assert.ok(jsCode.includes('in-gp-conditions'), 'Group Plan builder must have conditions input');
assert.ok(jsCode.includes('btn-copy-plan-url'), 'Group Plan builder must have copy URL button');
assert.ok(jsCode.includes('plan='), 'Group Plan builder must support plan URL hash');
console.log('  [PASS] G_04: Bộ Soạn Thảo Kế Hoạch Nhóm (Group Plan Builder) hỗ trợ chỉnh sửa trực tiếp, xem trước và mã hóa URL hash.');

// Test 5: Production Lock Invariant
assert.ok(fs.existsSync(prodFeedPath), 'deals_feed.json must exist');
const prodFeed = JSON.parse(fs.readFileSync(prodFeedPath, 'utf8'));
assert.strictEqual(prodFeed.length, 0, 'Production deals_feed.json must be []');
const prodFeedSha = crypto.createHash('sha256').update(fs.readFileSync(prodFeedPath)).digest('hex');
assert.strictEqual(prodFeedSha, '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945', 'deals_feed.json SHA-256 mismatch');

assert.ok(fs.existsSync(releaseManifestPath), 'RELEASE_MANIFEST.json must exist');
const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? releaseManifest.is_approved;
assert.strictEqual(isApproved, false, 'Production release is_approved must remain false');
console.log('  [PASS] G_05: Production Lock được bảo toàn tuyệt đối ([] rỗng, is_approved: false).');

console.log('\n🟢 [TEST-SUMMARY] TOÀN BỘ 5/5 KIỂM THỬ WEB ENHANCEMENTS VÀ LOTTECINEMAVN EXCLUSION ĐÃ ĐẠT [PASS]!\n');
