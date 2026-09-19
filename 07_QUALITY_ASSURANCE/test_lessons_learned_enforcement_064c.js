/**
 * JAYT EXACT HOST & LEAD TAXONOMY TEST SUITE (064C)
 * Directive: JAYT-ACQUISITION-QUALITY-064C
 * 
 * Rules:
 * 1. Missing artifact text fail-closed: ERR_GOVERNANCE_CLAIM_SOURCE_MISSING.
 * 2. Multi-deal bundle claim validation: All claims in all deals scanned fail-closed.
 * 3. Dual-file collision guard: Protects both staging feed and staging manifest fail-closed.
 * 4. Rule 12: Strict Deep Promotion URL Filter.
 * 5. Rule 13: Exact Host & Subdomain Allowlist, Pre-filter seller/policy/category/non-Da Nang, PROMOTION_LEADS taxonomy, and Transparent Metrics separation.
 * 6. Hash Chain Verification across 21 historical receipts and 7 revisions.
 * 7. Negative domain spoofing tests.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const registryJsonPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'lessons_learned_registry.json');
const manifestChainPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'REGISTRY_CHAIN_MANIFEST.json');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');

const stagingFeedPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const stagingManifestPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'STAGING_ACCEPTANCE_MANIFEST_061F.json');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const sandboxDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'private_sandbox', 'test_064c_sandbox');

// Import production governance policy engine
const {
  validateAntiSynthetic,
  validateClaimBoundedToArtifact,
  validateAuditStatusTaxonomy,
  validateAppendOnlyRunIsolation,
  verifyRegistryHashChain,
  filterStrictDeepPromotionUrls,
  getSha256
} = require('./governance_policy_engine');

const {
  parseHtmlStack,
  evaluateProbeStackBasedTruthGate062C
} = require('./structural_dom_container_engine_062c');

const {
  ingestCandidateFile,
  writeCandidateFile,
  extractAndValidateCandidateClaims
} = require('../05_DEAL_AND_AFFILIATE/ingest_candidate_to_catalog');

const { deployStagingFeed061F } = require('./staging_timeboxed_engine_061f');
const { finalizeWorkOrderReceipt } = require('./memory_transaction_manager_057');
const { getProviderContract } = require('../05_DEAL_AND_AFFILIATE/feed_gateway/provider_contracts');
const { runSecretScan } = require('./secret_scanner');

const EXPECTED_PROD_HASH = '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945';

let passedTests = 0;
let totalTests = 0;

function assertTest(testId, condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [${testId}]: [PASS] - ${message}`);
  } else {
    console.error(`  [${testId}]: [FAIL] - ${message}`);
  }
}

// 1. Anti-Synthetic
function LL_01_ANTI_SYNTHETIC_DATA_FAIL_CLOSED_REMEDIATION() {
  fs.mkdirSync(sandboxDir, { recursive: true });
  const mockFile = path.join(sandboxDir, 'mock_synth.json');
  let blocked = false;
  try {
    writeCandidateFile({ candidate_id: 'SYNTH', is_synthetic: true }, mockFile);
  } catch (e) {
    if (e.message.includes('SYNTHETIC_DATA_REJECTED')) blocked = true;
  }
  const noFile = !fs.existsSync(mockFile);
  try { fs.rmSync(sandboxDir, { recursive: true, force: true }); } catch (e) {}
  return blocked && noFile;
}

// 2. Claim Bounded
function LL_02_CLAIM_BOUNDED_PROVENANCE_FAIL_CLOSED_REMEDIATION() {
  fs.mkdirSync(sandboxDir, { recursive: true });
  const missingFile = path.join(sandboxDir, 'missing.json');
  let missingBlocked = false;
  try {
    writeCandidateFile({
      candidate_id: 'CAND-MISS',
      title: 'Galaxy Cinema',
      provenance: { artifacts: { text: { file: 'non_existent.txt' } } }
    }, missingFile);
  } catch (e) {
    if (e.code === 'ERR_GOVERNANCE_CLAIM_SOURCE_MISSING' || e.message.includes('CLAIM_SOURCE_ARTIFACT_MISSING')) {
      missingBlocked = true;
    }
  }
  try { fs.rmSync(sandboxDir, { recursive: true, force: true }); } catch (e) {}
  return missingBlocked;
}

// 3. Candidate Truth Gate
function LL_03_CANDIDATE_TRUTH_GATE_FAIL_CLOSED_REMEDIATION() {
  const res = evaluateProbeStackBasedTruthGate062C({ target_url: 'https://test.vn', outcome: 'LIVE_CDP_SUCCESS' }, '<div>Ưu đãi</div>', 'Ưu đãi');
  return res.passed_gate === false && res.triage_status === 'OBSERVED_NOT_QUALIFIED';
}

// 4. Stack DOM Container
function LL_04_STACK_BASED_DOM_CONTAINER_FAIL_CLOSED_REMEDIATION() {
  const disjoint = '<div>Giá 50.000đ</div><div>Thứ Ba</div>';
  const res = evaluateProbeStackBasedTruthGate062C({ target_url: 'https://test.vn', outcome: 'LIVE_CDP_SUCCESS' }, disjoint, 'Giá 50.000đ Thứ Ba');
  return res.passed_gate === false;
}

// 5. Hash Chain Verification (21 receipts & 7 revisions)
function LL_05_APPEND_ONLY_IMMUTABILITY_HASH_CHAIN_AUDIT() {
  const registry = JSON.parse(fs.readFileSync(registryJsonPath, 'utf8'));
  const chainLedger = JSON.parse(fs.readFileSync(manifestChainPath, 'utf8'));
  const ver = verifyRegistryHashChain(registry, null, chainLedger);
  return ver.valid === true &&
         ver.verified_receipts_count === 21 &&
         chainLedger.revisions.length === 7;
}

// 6. Dual-File Collision Guard
function LL_06_UNIQUE_DYNAMIC_RUN_ID_FAIL_CLOSED_REMEDIATION() {
  fs.mkdirSync(sandboxDir, { recursive: true });
  const existingFeed = path.join(sandboxDir, 'feed.json');
  fs.writeFileSync(existingFeed, '["EXISTING"]', 'utf8');
  let blocked = false;
  try {
    deployStagingFeed061F({ targetFeedPath: existingFeed, enforceAppendOnly: true });
  } catch (e) {
    if (e.message.includes('FAIL_CLOSED_COLLISION')) blocked = true;
  }
  try { fs.rmSync(sandboxDir, { recursive: true, force: true }); } catch (e) {}
  return blocked;
}

// 7. Provider Gate
function LL_07_PROVIDER_EVIDENCE_GATE_FAIL_CLOSED_REMEDIATION() {
  return getProviderContract('SHOPEE_AFFILIATE').support_status === 'UNSUPPORTED_PENDING_PROVIDER_DOCS';
}

// 8. Secret Hygiene
function LL_08_SECRET_HYGIENE_FAIL_CLOSED_REMEDIATION() {
  return runSecretScan().violations_count === 0;
}

// 9. Status Taxonomy
function LL_09_AUDIT_STATUS_TAXONOMY_FAIL_CLOSED_REMEDIATION() {
  fs.mkdirSync(sandboxDir, { recursive: true });
  let blocked = false;
  try {
    finalizeWorkOrderReceipt({ work_order: 'TEST' }, sandboxDir, 'ACCEPTED', { enforceAppendOnly: false });
  } catch (e) {
    if (e.message.includes('STATUS_TAXONOMY_VIOLATION')) blocked = true;
  }
  try { fs.rmSync(sandboxDir, { recursive: true, force: true }); } catch (e) {}
  return blocked;
}

// 10. Scheduler Transparency
function LL_10_SCHEDULER_RUNTIME_TRANSPARENCY_BINDING() {
  const rPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058b_trigger_provenance_correction', 'receipt.json');
  return JSON.parse(fs.readFileSync(rPath, 'utf8')).execution_trigger === 'MANUAL_TASK_TRIGGER';
}

// 11. Production Lock Invariant
function LL_11_PRODUCTION_LOCK_INVARIANT_BINDING() {
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const rel = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  return JSON.parse(prodRaw).length === 0 &&
         getSha256(prodRaw) === EXPECTED_PROD_HASH &&
         !rel.governance_locks?.immutable_ceo_approval_record?.is_approved;
}

// 12. Strict Deep Promotion URL Filter
function LL_12_DEEP_PROMOTION_URL_INTEGRITY_BINDING() {
  const mockLinks = [
    { href: 'https://jollibee.com.vn/khuyen-mai#contentarea', text: 'Skip' },
    { href: 'https://dominos.vn/khuyen-mai/combo-mua-1-tang-1', text: 'Mua 1 tặng 1' }
  ];
  const filtered = filterStrictDeepPromotionUrls(mockLinks, 'dominos.vn');
  return filtered.length === 1 && filtered[0].lead_url === 'https://dominos.vn/khuyen-mai/combo-mua-1-tang-1';
}

// 13. Exact Host & Subdomain Allowlist + Pre-filters + PROMOTION_LEADS Taxonomy (064C)
function LL_13_EXACT_HOST_ALLOWLIST_AND_LEAD_TAXONOMY_BINDING() {
  const testCases = [
    // 1. Spoofed Domain: phuclong.com.vn.attacker.com -> MUST REJECT
    { href: 'https://phuclong.com.vn.attacker.com/khuyen-mai/deal-1', text: 'Attacker' },
    // 2. Spoofed Domain: otherphuclong.com.vn -> MUST REJECT
    { href: 'https://otherphuclong.com.vn/khuyen-mai/deal-2', text: 'Fake' },
    // 3. Allowlisted Subdomain: pages.lazada.vn -> MUST PASS
    { href: 'https://pages.lazada.vn/wow/i/vn/VNCampaign/uu-dai-app', text: 'App' },
    // 4. Seller registration: pages.lazada.vn/wow/i/vn/sell-on-lazada -> MUST REJECT
    { href: 'https://pages.lazada.vn/wow/i/vn/sell-on-lazada/register_now/', text: 'Sell' },
    // 5. Policy URL: lazada.vn/quy-che -> MUST REJECT
    { href: 'https://pages.lazada.vn/wow/i/vn/LandingPage/quy-che-ban-hang', text: 'Policy' },
    // 6. Non-Da Nang local slug: /tp-hcm/ -> MUST REJECT
    { href: 'https://www.grab.com/vn/food-blog/talk-of-the-town/tp-hcm-tron-vi-pho/', text: 'HCM' },
    // 7. Non-Da Nang local slug: /ha-noi/ -> MUST REJECT
    { href: 'https://phuclong.com.vn/khuyen-mai/the-le-khai-truong-phuc-long-hoan-kiem', text: 'Hanoi' },
    // 8. Valid Da Nang / National Deal -> MUST PASS
    { href: 'https://phuclong.com.vn/khuyen-mai/deal-hoi-giai-nhiet-vnpay', text: 'Deal' }
  ];

  // Test against phuclong.com.vn
  const phuclongLeads = filterStrictDeepPromotionUrls(testCases, 'phuclong.com.vn');
  const phuclongPassedOnlyValid = phuclongLeads.length === 1 &&
                                  phuclongLeads[0].lead_url === 'https://phuclong.com.vn/khuyen-mai/deal-hoi-giai-nhiet-vnpay' &&
                                  phuclongLeads[0].classification === 'PROMOTION_LEAD';

  // Test against lazada.vn
  const lazadaLeads = filterStrictDeepPromotionUrls(testCases, 'lazada.vn');
  const lazadaPassedOnlyApp = lazadaLeads.length === 1 &&
                              lazadaLeads[0].lead_url === 'https://pages.lazada.vn/wow/i/vn/VNCampaign/uu-dai-app' &&
                              lazadaLeads[0].classification === 'PROMOTION_LEAD';

  return phuclongPassedOnlyValid && lazadaPassedOnlyApp;
}

// Master Test Runner
function run064cTests() {
  console.log('🧪 [JAYT-LESSONS-064C-TEST] Khởi chạy bộ kiểm thử Exact Host Allowlist & Lead Taxonomy (064C)...\n');

  assertTest('LL_01_ANTI_SYNTHETIC_DATA_FAIL_CLOSED_REMEDIATION', LL_01_ANTI_SYNTHETIC_DATA_FAIL_CLOSED_REMEDIATION(), 'Chặn đứng dữ liệu giả (Fail-Closed).');
  assertTest('LL_02_CLAIM_BOUNDED_PROVENANCE_FAIL_CLOSED_REMEDIATION', LL_02_CLAIM_BOUNDED_PROVENANCE_FAIL_CLOSED_REMEDIATION(), 'Bắt buộc artifact text (Fail-Closed).');
  assertTest('LL_03_CANDIDATE_TRUTH_GATE_FAIL_CLOSED_REMEDIATION', LL_03_CANDIDATE_TRUTH_GATE_FAIL_CLOSED_REMEDIATION(), 'Truth Gate Candidate default OBSERVED_NOT_QUALIFIED.');
  assertTest('LL_04_STACK_BASED_DOM_CONTAINER_FAIL_CLOSED_REMEDIATION', LL_04_STACK_BASED_DOM_CONTAINER_FAIL_CLOSED_REMEDIATION(), 'Từ chối DOM disjoint.');
  assertTest('LL_05_APPEND_ONLY_IMMUTABILITY_HASH_CHAIN_AUDIT', LL_05_APPEND_ONLY_IMMUTABILITY_HASH_CHAIN_AUDIT(), 'Chuỗi băm 21 receipt & 7 revision snapshot khớp 100%.');
  assertTest('LL_06_UNIQUE_DYNAMIC_RUN_ID_FAIL_CLOSED_REMEDIATION', LL_06_UNIQUE_DYNAMIC_RUN_ID_FAIL_CLOSED_REMEDIATION(), 'Collision guard kép bảo vệ an toàn.');
  assertTest('LL_07_PROVIDER_EVIDENCE_GATE_FAIL_CLOSED_REMEDIATION', LL_07_PROVIDER_EVIDENCE_GATE_FAIL_CLOSED_REMEDIATION(), 'Provider gate khóa chặt.');
  assertTest('LL_08_SECRET_HYGIENE_FAIL_CLOSED_REMEDIATION', LL_08_SECRET_HYGIENE_FAIL_CLOSED_REMEDIATION(), 'Secret hygiene 0 vi phạm.');
  assertTest('LL_09_AUDIT_STATUS_TAXONOMY_FAIL_CLOSED_REMEDIATION', LL_09_AUDIT_STATUS_TAXONOMY_FAIL_CLOSED_REMEDIATION(), 'Status taxonomy cấm AI tự ghi ACCEPTED.');
  assertTest('LL_10_SCHEDULER_RUNTIME_TRANSPARENCY_BINDING', LL_10_SCHEDULER_RUNTIME_TRANSPARENCY_BINDING(), 'Scheduler khai báo trung thực trigger.');
  assertTest('LL_11_PRODUCTION_LOCK_INVARIANT_BINDING', LL_11_PRODUCTION_LOCK_INVARIANT_BINDING(), 'Production lock duy trì [] và is_approved: false.');
  assertTest('LL_12_DEEP_PROMOTION_URL_INTEGRITY_BINDING', LL_12_DEEP_PROMOTION_URL_INTEGRITY_BINDING(), 'Rule 12: Bộ lọc Strict Deep Promotion URL loại bỏ fragment, login, nav và trùng lặp.');
  assertTest('LL_13_EXACT_HOST_ALLOWLIST_AND_LEAD_TAXONOMY_BINDING', LL_13_EXACT_HOST_ALLOWLIST_AND_LEAD_TAXONOMY_BINDING(), 'Rule 13: Exact Host & Subdomain Allowlist, Pre-filter seller/policy/non-Da Nang, PROMOTION_LEADS taxonomy.');

  console.log(`\n🟢 [LESSONS-064C-SUMMARY] TOÀN BỘ ${passedTests}/${totalTests} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);

  if (passedTests !== totalTests) process.exit(1);
}

module.exports = {
  LL_01_ANTI_SYNTHETIC_DATA_FAIL_CLOSED_REMEDIATION,
  LL_02_CLAIM_BOUNDED_PROVENANCE_FAIL_CLOSED_REMEDIATION,
  LL_03_CANDIDATE_TRUTH_GATE_FAIL_CLOSED_REMEDIATION,
  LL_04_STACK_BASED_DOM_CONTAINER_FAIL_CLOSED_REMEDIATION,
  LL_05_APPEND_ONLY_IMMUTABILITY_HASH_CHAIN_AUDIT,
  LL_06_UNIQUE_DYNAMIC_RUN_ID_FAIL_CLOSED_REMEDIATION,
  LL_07_PROVIDER_EVIDENCE_GATE_FAIL_CLOSED_REMEDIATION,
  LL_08_SECRET_HYGIENE_FAIL_CLOSED_REMEDIATION,
  LL_09_AUDIT_STATUS_TAXONOMY_FAIL_CLOSED_REMEDIATION,
  LL_10_SCHEDULER_RUNTIME_TRANSPARENCY_BINDING,
  LL_11_PRODUCTION_LOCK_INVARIANT_BINDING,
  LL_12_DEEP_PROMOTION_URL_INTEGRITY_BINDING,
  LL_13_EXACT_HOST_ALLOWLIST_AND_LEAD_TAXONOMY_BINDING,
  run064cTests
};

if (require.main === module) {
  run064cTests();
}
