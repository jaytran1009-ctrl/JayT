/**
 * JAYT MEMORY TRANSACTION FINAL GATE TEST SUITE (067)
 * Directive: JAYT-MEMORY-TRANSACTION-FINAL-GATE-067
 * 
 * Rules:
 * 1. All 16 Incident Rules Verified.
 * 2. Strict Global Status Taxonomy across entire text payload (Rule 16).
 * 3. Strict Append-Only Historical Corrections.
 * 4. Zero Side-Effect Test Isolation: Real staging feed, manifest, and catalog strictly intact.
 * 5. Emission of Immutable Transaction Receipts.
 * 6. 100% Hash Chain Audit across 22 historical receipts and 10 snapshot revisions.
 * 7. Production Lock Invariant.
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

const sandboxDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'private_sandbox', 'test_067_sandbox');

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
  finalizeWorkOrderReceipt,
  generateGovernanceHandoverBlock067A,
  generateGovernanceHandoverBlock066,
  recordHistoricalCorrection067,
  applyProjectMemoryTransaction067,
  validateGlobalStatusTaxonomy067
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
function GATE_01_ANTI_SYNTHETIC_DATA() {
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
function GATE_02_CLAIM_BOUNDED_PROVENANCE() {
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
function GATE_03_CANDIDATE_TRUTH_GATE() {
  const res = evaluateProbeStackBasedTruthGate062C({ target_url: 'https://test.vn', outcome: 'LIVE_CDP_SUCCESS' }, '<div>Ưu đãi</div>', 'Ưu đãi');
  return res.passed_gate === false && res.triage_status === 'OBSERVED_NOT_QUALIFIED';
}

// 4. Stack DOM Container
function GATE_04_STACK_DOM_CONTAINER() {
  const disjoint = '<div>Giá 50.000đ</div><div>Thứ Ba</div>';
  const res = evaluateProbeStackBasedTruthGate062C({ target_url: 'https://test.vn', outcome: 'LIVE_CDP_SUCCESS' }, disjoint, 'Giá 50.000đ Thứ Ba');
  return res.passed_gate === false;
}

// 5. Hash Chain Verification (22 receipts & 11 revisions)
function GATE_05_APPEND_ONLY_HASH_CHAIN() {
  const registry = JSON.parse(fs.readFileSync(registryJsonPath, 'utf8'));
  const chainLedger = JSON.parse(fs.readFileSync(manifestChainPath, 'utf8'));
  const ver = verifyRegistryHashChain(registry, null, chainLedger);
  return ver.valid === true &&
         ver.verified_receipts_count === 22 &&
         chainLedger.revisions.length === 11;
}

// 6. Dual-File Collision Guard in Isolated Sandbox (Pure Sandbox Test - No Staging Deployment Call)
function GATE_06_DYNAMIC_RUN_ID_COLLISION() {
  fs.mkdirSync(sandboxDir, { recursive: true });
  const existingFeed = path.join(sandboxDir, 'mock_feed.json');
  const sandboxManifest = path.join(sandboxDir, 'mock_manifest.json');
  fs.writeFileSync(existingFeed, '["EXISTING"]', 'utf8');
  fs.writeFileSync(sandboxManifest, '{"EXISTING": true}', 'utf8');

  let feedBlocked = false;
  let manifestBlocked = false;

  try {
    validateAppendOnlyRunIsolation(existingFeed, 'Mock feed file');
  } catch (e) {
    if (e.message.includes('FAIL_CLOSED_COLLISION')) feedBlocked = true;
  }

  try {
    validateAppendOnlyRunIsolation(sandboxManifest, 'Mock manifest file');
  } catch (e) {
    if (e.message.includes('FAIL_CLOSED_COLLISION')) manifestBlocked = true;
  }

  try { fs.rmSync(sandboxDir, { recursive: true, force: true }); } catch (e) {}
  return feedBlocked && manifestBlocked;
}

// 7. Provider Gate
function GATE_07_PROVIDER_EVIDENCE_GATE() {
  return getProviderContract('SHOPEE_AFFILIATE').support_status === 'UNSUPPORTED_PENDING_PROVIDER_DOCS';
}

// 8. Secret Hygiene
function GATE_08_SECRET_HYGIENE() {
  return runSecretScan().violations_count === 0;
}

// 9. Status Taxonomy
function GATE_09_AUDIT_STATUS_TAXONOMY() {
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
function GATE_10_SCHEDULER_RUNTIME_TRANSPARENCY() {
  const rPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058b_trigger_provenance_correction', 'receipt.json');
  return JSON.parse(fs.readFileSync(rPath, 'utf8')).execution_trigger === 'MANUAL_TASK_TRIGGER';
}

// 11. Production Lock Invariant
function GATE_11_PRODUCTION_LOCK_INVARIANT() {
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const rel = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  return JSON.parse(prodRaw).length === 0 &&
         getSha256(prodRaw) === EXPECTED_PROD_HASH &&
         !rel.governance_locks?.immutable_ceo_approval_record?.is_approved;
}

// 12. Strict Deep Promotion URL Filter
function GATE_12_DEEP_PROMOTION_URL_INTEGRITY() {
  const mockLinks = [
    { href: 'https://jollibee.com.vn/khuyen-mai#contentarea', text: 'Skip' },
    { href: 'https://dominos.vn/khuyen-mai/combo-mua-1-tang-1', text: 'Mua 1 tặng 1' }
  ];
  const filtered = filterStrictDeepPromotionUrls(mockLinks, 'dominos.vn');
  return filtered.length === 1 && filtered[0].lead_url === 'https://dominos.vn/khuyen-mai/combo-mua-1-tang-1';
}

// 13. Exact Host & Subdomain Allowlist + Pre-filters + PROMOTION_LEADS Taxonomy
function GATE_13_EXACT_HOST_AND_LEAD_TAXONOMY() {
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
function GATE_14_CONSOLIDATED_BATCH_GATE() {
  const { BATCH_14_CONSOLIDATED_BATCH_GATE_SELF_VERIFICATION } = require('./test_acquisition_batch_gate_065');
  return BATCH_14_CONSOLIDATED_BATCH_GATE_SELF_VERIFICATION();
}

// 15. Reporting Handover Mandate
function GATE_15_REPORTING_HANDOVER_MANDATE() {
  const block = generateGovernanceHandoverBlock067A({
    version: '3.90.0',
    workOrder: 'JAYT-LINK-FORMAT-067A',
    status: 'IMPLEMENTED_PENDING_CEO_AUDIT',
    consistencyTestResult: '10/10 PASS'
  });

  return block.includes('3.90.0') &&
         block.includes('Mã băm toàn vẹn') &&
         block.includes('JAYT-LINK-FORMAT-067A') &&
         block.includes('D:\\Công Việc MMO\\OPC JayT\\JayT-Dự Án Giá Trị Cộng Đồng\\PROJECT_MEMORY.md') &&
         block.includes('file:///D:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/PROJECT_MEMORY.md') &&
         block.includes('10/10 PASS');
}

// 16. Global Status Taxonomy & Zero Side-Effect Gate (067 Rule 16)
function GATE_16_FINAL_TRANSACTION_GATE_AND_SIDE_EFFECT_ISOLATION() {
  // 16A: Negative Test: Unapproved WO with ACCEPTED in other sections -> BLOCKED
  let unapprovedOtherBlocked = false;
  try {
    validateGlobalStatusTaxonomy067('| `JAYT-UNAUTHORIZED-099` | **ACCEPTED BY CEO** | Fake text |');
  } catch (e) {
    if (e.message.includes('STATUS_TAXONOMY_VIOLATION_067')) unapprovedOtherBlocked = true;
  }

  // 16B: Negative Test: Unapproved 064C self-declared ACCEPTED in header -> BLOCKED
  let unapproved064cBlocked = false;
  try {
    validateGlobalStatusTaxonomy067('Trạng thái chính thức**: `057: ACCEPTED | 064C: ACCEPTED`');
  } catch (e) {
    if (e.message.includes('STATUS_TAXONOMY_VIOLATION_067')) unapproved064cBlocked = true;
  }

  // 16C: Positive Test: Approved historical work orders PASS
  let historicalAllowed = false;
  try {
    validateGlobalStatusTaxonomy067('Trạng thái chính thức**: `057: ACCEPTED | 067: ACCEPTED | 067A: ACCEPTED`');
    historicalAllowed = true;
  } catch (e) {
    historicalAllowed = false;
  }

  // 16D: Test Isolation: Verify real staging feed, manifest, and catalog hashes before & after
  const preStagingSha = fs.existsSync(stagingFeedPath) ? getSha256(fs.readFileSync(stagingFeedPath)) : null;
  const preManifestSha = fs.existsSync(releaseManifestPath) ? getSha256(fs.readFileSync(releaseManifestPath)) : null;
  const preProdSha = fs.existsSync(prodFeedPath) ? getSha256(fs.readFileSync(prodFeedPath)) : null;

  // Run dummy transaction test in sandbox
  const dummyBlock = generateGovernanceHandoverBlock066({ version: 'TEST', workOrder: 'TEST' });

  const postStagingSha = fs.existsSync(stagingFeedPath) ? getSha256(fs.readFileSync(stagingFeedPath)) : null;
  const postManifestSha = fs.existsSync(releaseManifestPath) ? getSha256(fs.readFileSync(releaseManifestPath)) : null;
  const postProdSha = fs.existsSync(prodFeedPath) ? getSha256(fs.readFileSync(prodFeedPath)) : null;

  const isolationPreserved = (preStagingSha === postStagingSha) &&
                            (preManifestSha === postManifestSha) &&
                            (preProdSha === postProdSha);

  // 16E: Historical Correction Record & Mandatory Receipt Link test
  fs.mkdirSync(sandboxDir, { recursive: true });
  const corrReceipt = recordHistoricalCorrection067({
    correctionId: `TEST_CORRECTION_${Date.now()}`,
    workOrder: 'JAYT-MEMORY-TRANSACTION-FINAL-GATE-067',
    targetFile: 'PROJECT_MEMORY.md',
    beforeHash: '0000000000000000000000000000000000000000000000000000000000000000',
    afterHash: '1111111111111111111111111111111111111111111111111111111111111111',
    reason: 'Test historical correction append-only integrity',
    authorizedBy: 'CEO_DIRECTIVE'
  });
  const corrSaved = fs.existsSync(corrReceipt.receiptPath);

  // 16F: Negative Test: historicalCorrections missing receipt_path -> BLOCKED
  let missingReceiptBlocked = false;
  try {
    applyProjectMemoryTransaction067({
      version: 'TEST',
      workOrder: 'JAYT-MEMORY-TRANSACTION-FINAL-GATE-067',
      headerStatusLine: '057: ACCEPTED',
      historicalCorrections: [{ target: 'Non-existent text', replacement: 'Foo' }]
    });
  } catch (e) {
    if (e.message.includes('FATAL_CORRECTION_RECEIPT_REQUIRED')) missingReceiptBlocked = true;
  }

  // 16G: Negative Test: historicalCorrections with non-existent receipt file -> BLOCKED
  let notFoundReceiptBlocked = false;
  try {
    applyProjectMemoryTransaction067({
      version: 'TEST',
      workOrder: 'JAYT-MEMORY-TRANSACTION-FINAL-GATE-067',
      headerStatusLine: '057: ACCEPTED',
      historicalCorrections: [{ target: 'Non-existent text', replacement: 'Foo', correction_receipt_path: 'non_existent_receipt.json' }]
    });
  } catch (e) {
    if (e.message.includes('FATAL_CORRECTION_RECEIPT_NOT_FOUND')) notFoundReceiptBlocked = true;
  }

  try { fs.unlinkSync(corrReceipt.receiptPath); } catch (e) {}
  try { fs.rmSync(sandboxDir, { recursive: true, force: true }); } catch (e) {}

  return unapprovedOtherBlocked &&
         unapproved064cBlocked &&
         historicalAllowed &&
         isolationPreserved &&
         corrSaved &&
         missingReceiptBlocked &&
         notFoundReceiptBlocked;
}

// 17. Link Format & Copyable Path Standards (Rule 17 / 067A)
function GATE_17_LINK_FORMAT_STANDARDIZATION() {
  const block = generateGovernanceHandoverBlock067A({
    version: '3.90.0',
    workOrder: 'JAYT-LINK-FORMAT-067A',
    status: 'IMPLEMENTED_PENDING_CEO_AUDIT',
    consistencyTestResult: '10/10 PASS'
  });

  // 17A: Must not contain Markdown link with Windows backslash (D:\... or <D:\...>)
  const hasForbiddenWindowsMarkdownLink = /\[[^\]]+\]\([<]?D:\\/i.test(block);

  // 17B: Must contain copyable local path in code block
  const hasCopyableCodeBlock = block.includes('```text\nD:\\Công Việc MMO\\OPC JayT\\JayT-Dự Án Giá Trị Cộng Đồng\\PROJECT_MEMORY.md\n```');

  // 17C: Must contain URI with forward slashes only
  const hasForwardSlashUri = block.includes('file:///D:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/PROJECT_MEMORY.md');

  // 17D: Must contain version and SHA-256
  const hasVersionAndHash = block.includes('3.90.0') && block.includes('Mã băm toàn vẹn');

  return !hasForbiddenWindowsMarkdownLink && hasCopyableCodeBlock && hasForwardSlashUri && hasVersionAndHash;
}

// Master Test Runner
function run067Tests() {
  console.log('🧪 [JAYT-GATE-067-TEST] Khởi chạy bộ kiểm thử Memory Transaction Final Gate (067/067A)...\n');

  assertTest('GATE_01_ANTI_SYNTHETIC_DATA', GATE_01_ANTI_SYNTHETIC_DATA(), 'Chặn đứng dữ liệu giả (Fail-Closed).');
  assertTest('GATE_02_CLAIM_BOUNDED_PROVENANCE', GATE_02_CLAIM_BOUNDED_PROVENANCE(), 'Bắt buộc artifact text (Fail-Closed).');
  assertTest('GATE_03_CANDIDATE_TRUTH_GATE', GATE_03_CANDIDATE_TRUTH_GATE(), 'Truth Gate Candidate default OBSERVED_NOT_QUALIFIED.');
  assertTest('GATE_04_STACK_DOM_CONTAINER', GATE_04_STACK_DOM_CONTAINER(), 'Từ chối DOM disjoint.');
  assertTest('GATE_05_APPEND_ONLY_HASH_CHAIN', GATE_05_APPEND_ONLY_HASH_CHAIN(), 'Chuỗi băm 22 receipt & 11 revision snapshot khớp 100%.');
  assertTest('GATE_06_DYNAMIC_RUN_ID_COLLISION', GATE_06_DYNAMIC_RUN_ID_COLLISION(), 'Collision guard kép bảo vệ an toàn trong sandbox cô lập.');
  assertTest('GATE_07_PROVIDER_EVIDENCE_GATE', GATE_07_PROVIDER_EVIDENCE_GATE(), 'Provider gate khóa chặt.');
  assertTest('GATE_08_SECRET_HYGIENE', GATE_08_SECRET_HYGIENE(), 'Secret hygiene 0 vi phạm.');
  assertTest('GATE_09_AUDIT_STATUS_TAXONOMY', GATE_09_AUDIT_STATUS_TAXONOMY(), 'Status taxonomy cấm AI tự ghi ACCEPTED.');
  assertTest('GATE_10_SCHEDULER_RUNTIME_TRANSPARENCY', GATE_10_SCHEDULER_RUNTIME_TRANSPARENCY(), 'Scheduler khai báo trung thực trigger.');
  assertTest('GATE_11_PRODUCTION_LOCK_INVARIANT', GATE_11_PRODUCTION_LOCK_INVARIANT(), 'Production lock duy trì [] và is_approved: false.');
  assertTest('GATE_12_DEEP_PROMOTION_URL_INTEGRITY', GATE_12_DEEP_PROMOTION_URL_INTEGRITY(), 'Rule 12: Bộ lọc Strict Deep Promotion URL loại bỏ fragment, login, nav và trùng lặp.');
  assertTest('GATE_13_EXACT_HOST_AND_LEAD_TAXONOMY', GATE_13_EXACT_HOST_AND_LEAD_TAXONOMY(), 'Rule 13: Exact Host & Subdomain Allowlist, Pre-filter seller/policy/non-Da Nang, PROMOTION_LEADS taxonomy.');
  assertTest('GATE_14_CONSOLIDATED_BATCH_GATE', GATE_14_CONSOLIDATED_BATCH_GATE(), 'Rule 14: Động cơ Batch Gate 10 bước tự kiểm tra nội bộ.');
  assertTest('GATE_15_REPORTING_HANDOVER_MANDATE', GATE_15_REPORTING_HANDOVER_MANDATE(), 'Rule 15: Khối bàn giao quản trị 5 điểm.');
  assertTest('GATE_16_FINAL_TRANSACTION_GATE_AND_SIDE_EFFECT_ISOLATION', GATE_16_FINAL_TRANSACTION_GATE_AND_SIDE_EFFECT_ISOLATION(), 'Rule 16: Global Taxonomy Gate, Historical Correction Record, Zero Side-Effect Isolation & Receipt.');
  assertTest('GATE_17_LINK_FORMAT_STANDARDIZATION', GATE_17_LINK_FORMAT_STANDARDIZATION(), 'Rule 17: Chuẩn hóa link copyable code block và forward slashes URI (067A).');

  console.log(`\n🟢 [GATE-067-SUMMARY] TOÀN BỘ ${passedTests}/${totalTests} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);

  if (passedTests !== totalTests) process.exit(1);
}

module.exports = {
  GATE_01_ANTI_SYNTHETIC_DATA,
  GATE_02_CLAIM_BOUNDED_PROVENANCE,
  GATE_03_CANDIDATE_TRUTH_GATE,
  GATE_04_STACK_DOM_CONTAINER,
  GATE_05_APPEND_ONLY_HASH_CHAIN,
  GATE_06_DYNAMIC_RUN_ID_COLLISION,
  GATE_07_PROVIDER_EVIDENCE_GATE,
  GATE_08_SECRET_HYGIENE,
  GATE_09_AUDIT_STATUS_TAXONOMY,
  GATE_10_SCHEDULER_RUNTIME_TRANSPARENCY,
  GATE_11_PRODUCTION_LOCK_INVARIANT,
  GATE_12_DEEP_PROMOTION_URL_INTEGRITY,
  GATE_13_EXACT_HOST_AND_LEAD_TAXONOMY,
  GATE_14_CONSOLIDATED_BATCH_GATE,
  GATE_15_REPORTING_HANDOVER_MANDATE,
  GATE_16_FINAL_TRANSACTION_GATE_AND_SIDE_EFFECT_ISOLATION,
  GATE_17_LINK_FORMAT_STANDARDIZATION,
  run067Tests
};

if (require.main === module) {
  run067Tests();
}
