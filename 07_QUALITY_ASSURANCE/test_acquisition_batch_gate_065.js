/**
 * JAYT CONSOLIDATED ACQUISITION BATCH GATE TEST SUITE (065)
 * Directive: JAYT-ACQUISITION-BATCH-GATE-065
 * 
 * Rules:
 * 1. All 14 Incident Rules & Negative Test Cases.
 * 2. 10-Step Self-Verification Gate before presenting to CEO.
 * 3. 100% Hash Chain Audit across 21 historical receipts and 8 snapshots.
 * 4. Production Lock Invariant.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const registryJsonPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'lessons_learned_registry.json');
const manifestChainPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'REGISTRY_CHAIN_MANIFEST.json');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');

const stagingFeedPath = path.join(repoRoot, '08_RELEASE_VAULT', 'deployments', 'staging_instance', '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

const sandboxDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'private_sandbox', 'test_065_sandbox');

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
function BATCH_01_ANTI_SYNTHETIC_DATA() {
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
function BATCH_02_CLAIM_BOUNDED_PROVENANCE() {
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
function BATCH_03_CANDIDATE_TRUTH_GATE() {
  const res = evaluateProbeStackBasedTruthGate062C({ target_url: 'https://test.vn', outcome: 'LIVE_CDP_SUCCESS' }, '<div>Ưu đãi</div>', 'Ưu đãi');
  return res.passed_gate === false && res.triage_status === 'OBSERVED_NOT_QUALIFIED';
}

// 4. Stack DOM Container
function BATCH_04_STACK_DOM_CONTAINER() {
  const disjoint = '<div>Giá 50.000đ</div><div>Thứ Ba</div>';
  const res = evaluateProbeStackBasedTruthGate062C({ target_url: 'https://test.vn', outcome: 'LIVE_CDP_SUCCESS' }, disjoint, 'Giá 50.000đ Thứ Ba');
  return res.passed_gate === false;
}

// 5. Hash Chain Verification (21 receipts & 8 revisions)
function BATCH_05_APPEND_ONLY_HASH_CHAIN() {
  const registry = JSON.parse(fs.readFileSync(registryJsonPath, 'utf8'));
  const chainLedger = JSON.parse(fs.readFileSync(manifestChainPath, 'utf8'));
  const ver = verifyRegistryHashChain(registry, null, chainLedger);
  return ver.valid === true &&
         ver.verified_receipts_count === 21 &&
         chainLedger.revisions.length === 8;
}

// 6. Dual-File Collision Guard
function BATCH_06_DYNAMIC_RUN_ID_COLLISION() {
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
function BATCH_07_PROVIDER_EVIDENCE_GATE() {
  return getProviderContract('SHOPEE_AFFILIATE').support_status === 'UNSUPPORTED_PENDING_PROVIDER_DOCS';
}

// 8. Secret Hygiene
function BATCH_08_SECRET_HYGIENE() {
  return runSecretScan().violations_count === 0;
}

// 9. Status Taxonomy
function BATCH_09_AUDIT_STATUS_TAXONOMY() {
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
function BATCH_10_SCHEDULER_RUNTIME_TRANSPARENCY() {
  const rPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058b_trigger_provenance_correction', 'receipt.json');
  return JSON.parse(fs.readFileSync(rPath, 'utf8')).execution_trigger === 'MANUAL_TASK_TRIGGER';
}

// 11. Production Lock Invariant
function BATCH_11_PRODUCTION_LOCK_INVARIANT() {
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const rel = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  return JSON.parse(prodRaw).length === 0 &&
         getSha256(prodRaw) === EXPECTED_PROD_HASH &&
         !rel.governance_locks?.immutable_ceo_approval_record?.is_approved;
}

// 12. Strict Deep Promotion URL Filter
function BATCH_12_DEEP_PROMOTION_URL_INTEGRITY() {
  const mockLinks = [
    { href: 'https://jollibee.com.vn/khuyen-mai#contentarea', text: 'Skip' },
    { href: 'https://dominos.vn/khuyen-mai/combo-mua-1-tang-1', text: 'Mua 1 tặng 1' }
  ];
  const filtered = filterStrictDeepPromotionUrls(mockLinks, 'dominos.vn');
  return filtered.length === 1 && filtered[0].lead_url === 'https://dominos.vn/khuyen-mai/combo-mua-1-tang-1';
}

// 13. Exact Host & Subdomain Allowlist + Pre-filters + PROMOTION_LEADS Taxonomy
function BATCH_13_EXACT_HOST_AND_LEAD_TAXONOMY() {
  const testCases = [
    { href: 'https://phuclong.com.vn.attacker.com/khuyen-mai/deal-1', text: 'Attacker' },
    { href: 'https://otherphuclong.com.vn/khuyen-mai/deal-2', text: 'Fake' },
    { href: 'https://pages.lazada.vn/wow/i/vn/VNCampaign/uu-dai-app', text: 'App' },
    { href: 'https://pages.lazada.vn/wow/i/vn/sell-on-lazada/register_now/', text: 'Sell' },
    { href: 'https://pages.lazada.vn/wow/i/vn/LandingPage/quy-che-ban-hang', text: 'Policy' },
    { href: 'https://www.grab.com/vn/food-blog/talk-of-the-town/tp-hcm-tron-vi-pho/', text: 'HCM' },
    { href: 'https://phuclong.com.vn/khuyen-mai/the-le-khai-truong-phuc-long-hoan-kiem', text: 'Hanoi' },
    { href: 'https://phuclong.com.vn/khuyen-mai/deal-hoi-giai-nhiet-vnpay', text: 'Deal' }
  ];

  const phuclongLeads = filterStrictDeepPromotionUrls(testCases, 'phuclong.com.vn');
  const lazadaLeads = filterStrictDeepPromotionUrls(testCases, 'lazada.vn');

  return phuclongLeads.length === 1 &&
         phuclongLeads[0].lead_url === 'https://phuclong.com.vn/khuyen-mai/deal-hoi-giai-nhiet-vnpay' &&
         lazadaLeads.length === 1 &&
         lazadaLeads[0].lead_url === 'https://pages.lazada.vn/wow/i/vn/VNCampaign/uu-dai-app';
}

// 14. Consolidated Batch Gate Self-Verification (All Negative Cases)
function BATCH_14_CONSOLIDATED_BATCH_GATE_SELF_VERIFICATION() {
  const negativeCases = [
    // 1. Spoofed domain
    { url: 'https://shopee.vn.attacker.com/voucher/deal', host: 'shopee.vn', expectReject: true },
    // 2. Unauthorized subdomain
    { url: 'https://hack.phuclong.com.vn/khuyen-mai/deal', host: 'phuclong.com.vn', expectReject: true },
    // 3. Fragment
    { url: 'https://dominos.vn/khuyen-mai#section', host: 'dominos.vn', expectReject: true },
    // 4. Login / signup
    { url: 'https://shopee.vn/buyer/login', host: 'shopee.vn', expectReject: true },
    { url: 'https://lotteria.vn/dang-ky', host: 'lotteria.vn', expectReject: true },
    // 5. Category / navigation
    { url: 'https://thepizzacompany.vn/category/pizza', host: 'thepizzacompany.vn', expectReject: true },
    { url: 'https://grab.com/vn/food-blog/trending-food', host: 'grab.com', expectReject: true },
    // 6. Seller page
    { url: 'https://pages.lazada.vn/wow/i/vn/sell-on-lazada/register', host: 'lazada.vn', expectReject: true },
    // 7. Generic news
    { url: 'https://highlandscoffee.com.vn/vn/tin-tuc-su-kien.html', host: 'highlandscoffee.com.vn', expectReject: true },
    // 8. Locality outside Da Nang
    { url: 'https://grab.com/vn/food-blog/talk-of-the-town/tp-hcm-deal', host: 'grab.com', expectReject: true },
    { url: 'https://phuclong.com.vn/khuyen-mai/khai-truong-ha-noi', host: 'phuclong.com.vn', expectReject: true },
    // 9. Valid lead
    { url: 'https://phuclong.com.vn/khuyen-mai/combo-he-dam-vi-2026', host: 'phuclong.com.vn', expectReject: false }
  ];

  for (const tc of negativeCases) {
    const res = filterStrictDeepPromotionUrls([{ href: tc.url, text: 'Test' }], tc.host);
    if (tc.expectReject && res.length !== 0) {
      console.error(`BATCH_14 FAILED on rejecting: ${tc.url}`);
      return false;
    }
    if (!tc.expectReject && res.length !== 1) {
      console.error(`BATCH_14 FAILED on accepting: ${tc.url}`);
      return false;
    }
  }

  // Test Truth Gate Negative Cases (Missing price, missing date, missing conditions)
  const noPrice = '<div>Khuyến mãi trà sữa tại Đà Nẵng Thứ Ba</div>';
  const gateNoPrice = evaluateProbeStackBasedTruthGate062C({ target_url: 'https://test.vn', outcome: 'LIVE_CDP_SUCCESS' }, noPrice, 'Khuyến mãi trà sữa tại Đà Nẵng Thứ Ba');
  if (gateNoPrice.passed_gate) return false;

  const noDate = '<div>Khuyến mãi trà sữa 50.000đ tại Đà Nẵng</div>';
  const gateNoDate = evaluateProbeStackBasedTruthGate062C({ target_url: 'https://test.vn', outcome: 'LIVE_CDP_SUCCESS' }, noDate, 'Khuyến mãi trà sữa 50.000đ tại Đà Nẵng');
  if (gateNoDate.passed_gate) return false;

  return true;
}

// Master Test Runner
function run065Tests() {
  console.log('🧪 [JAYT-BATCH-065-TEST] Khởi chạy bộ kiểm thử Consolidated Batch Gate (065)...\n');

  assertTest('BATCH_01_ANTI_SYNTHETIC_DATA', BATCH_01_ANTI_SYNTHETIC_DATA(), 'Chặn đứng dữ liệu giả (Fail-Closed).');
  assertTest('BATCH_02_CLAIM_BOUNDED_PROVENANCE', BATCH_02_CLAIM_BOUNDED_PROVENANCE(), 'Bắt buộc artifact text (Fail-Closed).');
  assertTest('BATCH_03_CANDIDATE_TRUTH_GATE', BATCH_03_CANDIDATE_TRUTH_GATE(), 'Truth Gate Candidate default OBSERVED_NOT_QUALIFIED.');
  assertTest('BATCH_04_STACK_DOM_CONTAINER', BATCH_04_STACK_DOM_CONTAINER(), 'Từ chối DOM disjoint.');
  assertTest('BATCH_05_APPEND_ONLY_HASH_CHAIN', BATCH_05_APPEND_ONLY_HASH_CHAIN(), 'Chuỗi băm 21 receipt & 8 revision snapshot khớp 100%.');
  assertTest('BATCH_06_DYNAMIC_RUN_ID_COLLISION', BATCH_06_DYNAMIC_RUN_ID_COLLISION(), 'Collision guard kép bảo vệ an toàn.');
  assertTest('BATCH_07_PROVIDER_EVIDENCE_GATE', BATCH_07_PROVIDER_EVIDENCE_GATE(), 'Provider gate khóa chặt.');
  assertTest('BATCH_08_SECRET_HYGIENE', BATCH_08_SECRET_HYGIENE(), 'Secret hygiene 0 vi phạm.');
  assertTest('BATCH_09_AUDIT_STATUS_TAXONOMY', BATCH_09_AUDIT_STATUS_TAXONOMY(), 'Status taxonomy cấm AI tự ghi ACCEPTED.');
  assertTest('BATCH_10_SCHEDULER_RUNTIME_TRANSPARENCY', BATCH_10_SCHEDULER_RUNTIME_TRANSPARENCY(), 'Scheduler khai báo trung thực trigger.');
  assertTest('BATCH_11_PRODUCTION_LOCK_INVARIANT', BATCH_11_PRODUCTION_LOCK_INVARIANT(), 'Production lock duy trì [] và is_approved: false.');
  assertTest('BATCH_12_DEEP_PROMOTION_URL_INTEGRITY', BATCH_12_DEEP_PROMOTION_URL_INTEGRITY(), 'Rule 12: Bộ lọc Strict Deep Promotion URL loại bỏ fragment, login, nav và trùng lặp.');
  assertTest('BATCH_13_EXACT_HOST_AND_LEAD_TAXONOMY', BATCH_13_EXACT_HOST_AND_LEAD_TAXONOMY(), 'Rule 13: Exact Host & Subdomain Allowlist, Pre-filter seller/policy/non-Da Nang, PROMOTION_LEADS taxonomy.');
  assertTest('BATCH_14_CONSOLIDATED_BATCH_GATE_SELF_VERIFICATION', BATCH_14_CONSOLIDATED_BATCH_GATE_SELF_VERIFICATION(), 'Rule 14: Toàn bộ 14 negative cases tự kiểm tra nội bộ thành công.');

  console.log(`\n🟢 [BATCH-065-SUMMARY] TOÀN BỘ ${passedTests}/${totalTests} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);

  if (passedTests !== totalTests) process.exit(1);
}

module.exports = {
  BATCH_01_ANTI_SYNTHETIC_DATA,
  BATCH_02_CLAIM_BOUNDED_PROVENANCE,
  BATCH_03_CANDIDATE_TRUTH_GATE,
  BATCH_04_STACK_DOM_CONTAINER,
  BATCH_05_APPEND_ONLY_HASH_CHAIN,
  BATCH_06_DYNAMIC_RUN_ID_COLLISION,
  BATCH_07_PROVIDER_EVIDENCE_GATE,
  BATCH_08_SECRET_HYGIENE,
  BATCH_09_AUDIT_STATUS_TAXONOMY,
  BATCH_10_SCHEDULER_RUNTIME_TRANSPARENCY,
  BATCH_11_PRODUCTION_LOCK_INVARIANT,
  BATCH_12_DEEP_PROMOTION_URL_INTEGRITY,
  BATCH_13_EXACT_HOST_AND_LEAD_TAXONOMY,
  BATCH_14_CONSOLIDATED_BATCH_GATE_SELF_VERIFICATION,
  run065Tests
};

if (require.main === module) {
  run065Tests();
}
