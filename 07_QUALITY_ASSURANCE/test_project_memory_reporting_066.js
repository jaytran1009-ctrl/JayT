/**
 * JAYT PROJECT MEMORY REPORTING & TRANSACTION TEST SUITE (066)
 * Directive: JAYT-PROJECT-MEMORY-REPORTING-066
 * 
 * Rules:
 * 1. All 15 Incident Rules Verified.
 * 2. Mandatory 5-Point Governance Handover Block.
 * 3. Prohibit ACCEPTED / VERIFIED / CEO APPROVED without explicit CEO confirmation.
 * 4. All PROJECT_MEMORY.md updates strictly via memory_transaction_manager_057.js.
 * 5. 100% Hash Chain Audit across 22 historical receipts and 9 snapshot revisions.
 * 6. Production Lock Invariant.
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

const sandboxDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'private_sandbox', 'test_066_sandbox');

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
  writeCandidateFile
} = require('../05_DEAL_AND_AFFILIATE/ingest_candidate_to_catalog');

const {
  deployStagingFeed061F
} = require('./staging_timeboxed_engine_061f');

const {
  finalizeWorkOrderReceipt,
  generateGovernanceHandoverBlock066,
  applyProjectMemoryTransaction066
} = require('./memory_transaction_manager_057');

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
function MEM_REP_01_ANTI_SYNTHETIC_DATA() {
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
function MEM_REP_02_CLAIM_BOUNDED_PROVENANCE() {
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
function MEM_REP_03_CANDIDATE_TRUTH_GATE() {
  const res = evaluateProbeStackBasedTruthGate062C({ target_url: 'https://test.vn', outcome: 'LIVE_CDP_SUCCESS' }, '<div>Ưu đãi</div>', 'Ưu đãi');
  return res.passed_gate === false && res.triage_status === 'OBSERVED_NOT_QUALIFIED';
}

// 4. Stack DOM Container
function MEM_REP_04_STACK_DOM_CONTAINER() {
  const disjoint = '<div>Giá 50.000đ</div><div>Thứ Ba</div>';
  const res = evaluateProbeStackBasedTruthGate062C({ target_url: 'https://test.vn', outcome: 'LIVE_CDP_SUCCESS' }, disjoint, 'Giá 50.000đ Thứ Ba');
  return res.passed_gate === false;
}

// 5. Hash Chain Verification (22 receipts & 9 revisions)
function MEM_REP_05_APPEND_ONLY_HASH_CHAIN() {
  const registry = JSON.parse(fs.readFileSync(registryJsonPath, 'utf8'));
  const chainLedger = JSON.parse(fs.readFileSync(manifestChainPath, 'utf8'));
  const ver = verifyRegistryHashChain(registry, null, chainLedger);
  return ver.valid === true &&
         ver.verified_receipts_count === 22 &&
         chainLedger.revisions.length === 9;
}

// 6. Dual-File Collision Guard
function MEM_REP_06_DYNAMIC_RUN_ID_COLLISION() {
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
function MEM_REP_07_PROVIDER_EVIDENCE_GATE() {
  return getProviderContract('SHOPEE_AFFILIATE').support_status === 'UNSUPPORTED_PENDING_PROVIDER_DOCS';
}

// 8. Secret Hygiene
function MEM_REP_08_SECRET_HYGIENE() {
  return runSecretScan().violations_count === 0;
}

// 9. Status Taxonomy
function MEM_REP_09_AUDIT_STATUS_TAXONOMY() {
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
function MEM_REP_10_SCHEDULER_RUNTIME_TRANSPARENCY() {
  const rPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058b_trigger_provenance_correction', 'receipt.json');
  return JSON.parse(fs.readFileSync(rPath, 'utf8')).execution_trigger === 'MANUAL_TASK_TRIGGER';
}

// 11. Production Lock Invariant
function MEM_REP_11_PRODUCTION_LOCK_INVARIANT() {
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const rel = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  return JSON.parse(prodRaw).length === 0 &&
         getSha256(prodRaw) === EXPECTED_PROD_HASH &&
         !rel.governance_locks?.immutable_ceo_approval_record?.is_approved;
}

// 12. Strict Deep Promotion URL Filter
function MEM_REP_12_DEEP_PROMOTION_URL_INTEGRITY() {
  const mockLinks = [
    { href: 'https://jollibee.com.vn/khuyen-mai#contentarea', text: 'Skip' },
    { href: 'https://dominos.vn/khuyen-mai/combo-mua-1-tang-1', text: 'Mua 1 tặng 1' }
  ];
  const filtered = filterStrictDeepPromotionUrls(mockLinks, 'dominos.vn');
  return filtered.length === 1 && filtered[0].lead_url === 'https://dominos.vn/khuyen-mai/combo-mua-1-tang-1';
}

// 13. Exact Host & Subdomain Allowlist + Pre-filters + PROMOTION_LEADS Taxonomy
function MEM_REP_13_EXACT_HOST_AND_LEAD_TAXONOMY() {
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

// 14. Consolidated Batch Gate
function MEM_REP_14_CONSOLIDATED_BATCH_GATE() {
  const { BATCH_14_CONSOLIDATED_BATCH_GATE_SELF_VERIFICATION } = require('./test_acquisition_batch_gate_065');
  return BATCH_14_CONSOLIDATED_BATCH_GATE_SELF_VERIFICATION();
}

// 15. Reporting Handover & Transaction Mandate (Rule 15 / 066)
function MEM_REP_15_REPORTING_HANDOVER_AND_TRANSACTION_MANDATE() {
  // Test 15A: Handover block contains all 5 required elements
  const block = generateGovernanceHandoverBlock066({
    version: '3.88.0',
    workOrder: 'JAYT-PROJECT-MEMORY-REPORTING-066',
    status: 'IMPLEMENTED_PENDING_CEO_AUDIT',
    consistencyTestResult: '10/10 PASS'
  });

  const hasVersion = block.includes('3.88.0');
  const hasSha = block.includes('Mã băm toàn vẹn (SHA-256 Sau Cập Nhật)');
  const hasWorkOrder = block.includes('JAYT-PROJECT-MEMORY-REPORTING-066');
  const hasLink = block.includes('[PROJECT_MEMORY.md](<D:\\Công Việc MMO\\OPC JayT\\JayT-Dự Án Giá Trị Cộng Đồng\\PROJECT_MEMORY.md:1>)');
  const hasTestResult = block.includes('10/10 PASS');

  // Test 15B: Attempt to self-declare ACCEPTED via applyProjectMemoryTransaction066 -> MUST FAIL
  let selfAcceptedBlocked = false;
  try {
    applyProjectMemoryTransaction066({
      version: '3.99.0',
      workOrder: 'JAYT-UNAUTHORIZED-ACCEPT-099',
      workOrderDescription: 'Illegal',
      headerStatusLine: 'JAYT-UNAUTHORIZED-ACCEPT-099: ACCEPTED'
    });
  } catch (e) {
    if (e.message.includes('STATUS_TAXONOMY_VIOLATION')) {
      selfAcceptedBlocked = true;
    }
  }

  return hasVersion && hasSha && hasWorkOrder && hasLink && hasTestResult && selfAcceptedBlocked;
}

// Master Test Runner
function run066Tests() {
  console.log('🧪 [JAYT-REPORTING-066-TEST] Khởi chạy bộ kiểm thử Reporting Handover & Transaction Mandate (066)...\n');

  assertTest('MEM_REP_01_ANTI_SYNTHETIC_DATA', MEM_REP_01_ANTI_SYNTHETIC_DATA(), 'Chặn đứng dữ liệu giả (Fail-Closed).');
  assertTest('MEM_REP_02_CLAIM_BOUNDED_PROVENANCE', MEM_REP_02_CLAIM_BOUNDED_PROVENANCE(), 'Bắt buộc artifact text (Fail-Closed).');
  assertTest('MEM_REP_03_CANDIDATE_TRUTH_GATE', MEM_REP_03_CANDIDATE_TRUTH_GATE(), 'Truth Gate Candidate default OBSERVED_NOT_QUALIFIED.');
  assertTest('MEM_REP_04_STACK_DOM_CONTAINER', MEM_REP_04_STACK_DOM_CONTAINER(), 'Từ chối DOM disjoint.');
  assertTest('MEM_REP_05_APPEND_ONLY_HASH_CHAIN', MEM_REP_05_APPEND_ONLY_HASH_CHAIN(), 'Chuỗi băm 22 receipt & 9 revision snapshot khớp 100%.');
  assertTest('MEM_REP_06_DYNAMIC_RUN_ID_COLLISION', MEM_REP_06_DYNAMIC_RUN_ID_COLLISION(), 'Collision guard kép bảo vệ an toàn.');
  assertTest('MEM_REP_07_PROVIDER_EVIDENCE_GATE', MEM_REP_07_PROVIDER_EVIDENCE_GATE(), 'Provider gate khóa chặt.');
  assertTest('MEM_REP_08_SECRET_HYGIENE', MEM_REP_08_SECRET_HYGIENE(), 'Secret hygiene 0 vi phạm.');
  assertTest('MEM_REP_09_AUDIT_STATUS_TAXONOMY', MEM_REP_09_AUDIT_STATUS_TAXONOMY(), 'Status taxonomy cấm AI tự ghi ACCEPTED.');
  assertTest('MEM_REP_10_SCHEDULER_RUNTIME_TRANSPARENCY', MEM_REP_10_SCHEDULER_RUNTIME_TRANSPARENCY(), 'Scheduler khai báo trung thực trigger.');
  assertTest('MEM_REP_11_PRODUCTION_LOCK_INVARIANT', MEM_REP_11_PRODUCTION_LOCK_INVARIANT(), 'Production lock duy trì [] và is_approved: false.');
  assertTest('MEM_REP_12_DEEP_PROMOTION_URL_INTEGRITY', MEM_REP_12_DEEP_PROMOTION_URL_INTEGRITY(), 'Rule 12: Bộ lọc Strict Deep Promotion URL loại bỏ fragment, login, nav và trùng lặp.');
  assertTest('MEM_REP_13_EXACT_HOST_AND_LEAD_TAXONOMY', MEM_REP_13_EXACT_HOST_AND_LEAD_TAXONOMY(), 'Rule 13: Exact Host & Subdomain Allowlist, Pre-filter seller/policy/non-Da Nang, PROMOTION_LEADS taxonomy.');
  assertTest('MEM_REP_14_CONSOLIDATED_BATCH_GATE', MEM_REP_14_CONSOLIDATED_BATCH_GATE(), 'Rule 14: Động cơ Batch Gate 10 bước tự kiểm tra nội bộ.');
  assertTest('MEM_REP_15_REPORTING_HANDOVER_AND_TRANSACTION_MANDATE', MEM_REP_15_REPORTING_HANDOVER_AND_TRANSACTION_MANDATE(), 'Rule 15: Khối bàn giao quản trị 5 điểm & Cập nhật Transaction Manager bắt buộc.');

  console.log(`\n🟢 [REPORTING-066-SUMMARY] TOÀN BỘ ${passedTests}/${totalTests} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);

  if (passedTests !== totalTests) process.exit(1);
}

module.exports = {
  MEM_REP_01_ANTI_SYNTHETIC_DATA,
  MEM_REP_02_CLAIM_BOUNDED_PROVENANCE,
  MEM_REP_03_CANDIDATE_TRUTH_GATE,
  MEM_REP_04_STACK_DOM_CONTAINER,
  MEM_REP_05_APPEND_ONLY_HASH_CHAIN,
  MEM_REP_06_DYNAMIC_RUN_ID_COLLISION,
  MEM_REP_07_PROVIDER_EVIDENCE_GATE,
  MEM_REP_08_SECRET_HYGIENE,
  MEM_REP_09_AUDIT_STATUS_TAXONOMY,
  MEM_REP_10_SCHEDULER_RUNTIME_TRANSPARENCY,
  MEM_REP_11_PRODUCTION_LOCK_INVARIANT,
  MEM_REP_12_DEEP_PROMOTION_URL_INTEGRITY,
  MEM_REP_13_EXACT_HOST_AND_LEAD_TAXONOMY,
  MEM_REP_14_CONSOLIDATED_BATCH_GATE,
  MEM_REP_15_REPORTING_HANDOVER_AND_TRANSACTION_MANDATE,
  run066Tests
};

if (require.main === module) {
  run066Tests();
}
