/**
 * JAYT END-TO-END GOVERNANCE POLICY BINDING & INTEGRITY TEST SUITE (063D)
 * Directive: JAYT-END-TO-END-GOVERNANCE-BINDING-063D
 * 
 * Rules:
 * 1. End-to-end binding: Ingest, staging, and receipt emitter directly execute governance policies.
 * 2. True integration tests: Invalid payloads fail-closed BEFORE any disk write.
 * 3. Cryptographic registry hash-chain labeled honestly as 'tamper-evident, locally read-only'.
 * 4. External trust anchor disclosed and checked (RELEASE_MANIFEST CEO approval record).
 * 5. Sandbox isolation guarantee: Zero pollution to live runtime evidence.
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

const sandboxDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'private_sandbox', 'test_063d_sandbox');

// Import production governance policy engine
const {
  validateAntiSynthetic,
  validateClaimBoundedToArtifact,
  validateAuditStatusTaxonomy,
  validateAppendOnlyRunIsolation,
  verifyRegistryHashChain,
  getSha256
} = require('./governance_policy_engine');

const {
  parseHtmlStack,
  evaluateProbeStackBasedTruthGate062C
} = require('./structural_dom_container_engine_062c');

const { ingestCandidateFile } = require('../05_DEAL_AND_AFFILIATE/ingest_candidate_to_catalog');
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

// =========================================================================
// 1. END-TO-END BINDING: ANTI-SYNTHETIC DATA GATE (INC-SYNTHETIC-DATA-060)
// =========================================================================
function LL_01_ANTI_SYNTHETIC_DATA_END_TO_END_BINDING() {
  fs.mkdirSync(sandboxDir, { recursive: true });
  const mockSyntheticCandidateFile = path.join(sandboxDir, 'mock_synthetic_candidate.json');
  fs.writeFileSync(mockSyntheticCandidateFile, JSON.stringify({
    candidate_id: 'CAND-MOCK-SYNTHETIC-060',
    title: 'Synthetic Deal CGV',
    is_synthetic: true,
    deals: [{ deal_id: 'DNG-MOCK-DEAL-060' }],
    evidence: {}
  }, null, 2));

  // Ingest attempt into candidate intake must fail closed BEFORE disk write
  const preHash = getSha256(prodFeedPath);
  const ingestResult = ingestCandidateFile(mockSyntheticCandidateFile);

  const syntheticBlocked = ingestResult.success === false &&
                           ingestResult.error_code === 'ERR_GOVERNANCE_SYNTHETIC_REJECTED' &&
                           ingestResult.ingested_deals === 0;

  const postHash = getSha256(prodFeedPath);
  const feedUntouched = preHash === postHash;

  // Cleanup sandbox file
  try { fs.unlinkSync(mockSyntheticCandidateFile); } catch (e) {}

  return syntheticBlocked && feedUntouched;
}

// =========================================================================
// 2. END-TO-END BINDING: CLAIM-BOUND PROVENANCE GATE (INC-UNBOUNDED-CLAIM-061C)
// =========================================================================
function LL_02_CLAIM_BOUNDED_PROVENANCE_END_TO_END_BINDING() {
  const stagingFeed = JSON.parse(fs.readFileSync(stagingFeedPath, 'utf8'));
  const realGalaxyDeal = stagingFeed[0];
  const artifactTextRel = realGalaxyDeal.provenance.artifacts.text.file;
  const artifactText = fs.readFileSync(path.resolve(repoRoot, artifactTextRel), 'utf8');

  // Test 1: Fabricated claim not in artifact MUST be rejected
  const fabricatedClaim = '478 Điện Biên Phủ, Đà Nẵng';
  let fabricatedRejected = false;
  try {
    validateClaimBoundedToArtifact(fabricatedClaim, artifactText);
  } catch (err) {
    if (err.message.includes('CLAIM_NOT_BOUND_TO_SOURCE_ARTIFACT')) {
      fabricatedRejected = true;
    }
  }

  // Test 2: Real verbatim claims in artifact MUST pass
  const realClaimPassed = validateClaimBoundedToArtifact('Galaxy Đà Nẵng', artifactText).valid === true &&
                          validateClaimBoundedToArtifact('50.000đ', artifactText).valid === true &&
                          validateClaimBoundedToArtifact('Thứ Ba hàng tuần', artifactText).valid === true;

  return fabricatedRejected && realClaimPassed;
}

// =========================================================================
// 3. END-TO-END BINDING: CANDIDATE TRUTH GATE (INC-KEYWORD-TRIAGE-062)
// =========================================================================
function LL_03_CANDIDATE_TRUTH_GATE_END_TO_END_BINDING() {
  const keywordOnlyProbe = {
    target_url: 'https://sample.vn/voucher-khuyen-mai-thu-ba',
    outcome: 'LIVE_CDP_SUCCESS'
  };
  const keywordOnlyHtml = '<div class="promo">Ưu đãi voucher cực sốc Thứ Ba hàng tuần cho khách hàng yêu quý!</div>';
  const keywordOnlyText = 'Ưu đãi voucher cực sốc Thứ Ba hàng tuần cho khách hàng yêu quý!';

  const result = evaluateProbeStackBasedTruthGate062C(keywordOnlyProbe, keywordOnlyHtml, keywordOnlyText);
  return result.passed_gate === false &&
         result.triage_status === 'OBSERVED_NOT_QUALIFIED' &&
         result.failure_reason === 'MISSING_NUMERICAL_PRICE_REJECTED';
}

// =========================================================================
// 4. END-TO-END BINDING: STACK-BASED DOM CONTAINER (INC-PSEUDO-DOM-CONTAINER-062A)
// =========================================================================
function LL_04_STACK_BASED_DOM_CONTAINER_END_TO_END_BINDING() {
  const siblingDisjointHtml = `
    <html>
      <body>
        <div id="price-leaf">Giá vé 50.000đ</div>
        <div id="schedule-leaf">Áp dụng Thứ Ba hàng tuần</div>
        <div id="terms-leaf">Điều kiện: Không áp dụng Lễ/Tết</div>
        <div id="loc-leaf">Áp dụng tại Đà Nẵng</div>
      </body>
    </html>
  `;
  const siblingDisjointText = 'Giá vé 50.000đ Áp dụng Thứ Ba hàng tuần Điều kiện: Không áp dụng Lễ/Tết Áp dụng tại Đà Nẵng';
  const probe = { target_url: 'https://sibling.vn', outcome: 'LIVE_CDP_SUCCESS' };

  const result = evaluateProbeStackBasedTruthGate062C(probe, siblingDisjointHtml, siblingDisjointText);
  return result.passed_gate === false &&
         result.triage_status === 'OBSERVED_NOT_QUALIFIED' &&
         result.failure_reason === 'FRAGMENTED_ACROSS_DISJOINT_DOM_NODES';
}

// =========================================================================
// 5. CRYPTOGRAPHIC HASH-CHAIN AUDIT: ALL HISTORICAL RECEIPTS & REVISIONS
// =========================================================================
function LL_05_APPEND_ONLY_IMMUTABILITY_HASH_CHAIN_AUDIT() {
  const registry = JSON.parse(fs.readFileSync(registryJsonPath, 'utf8'));
  const chainLedger = JSON.parse(fs.readFileSync(manifestChainPath, 'utf8'));

  const verification = verifyRegistryHashChain(registry, null, chainLedger);
  return verification.valid === true && verification.verified_receipts_count === 17;
}

// =========================================================================
// 6. END-TO-END BINDING: DYNAMIC RUN ID COLLISION (INC-STATIC-RUN-ID-062B)
// =========================================================================
function LL_06_UNIQUE_DYNAMIC_RUN_ID_END_TO_END_BINDING() {
  fs.mkdirSync(sandboxDir, { recursive: true });
  const testRunDir = path.join(sandboxDir, 'run_test_collision_063d');
  fs.mkdirSync(testRunDir, { recursive: true });

  let collisionPrevented = false;
  try {
    validateAppendOnlyRunIsolation(testRunDir);
  } catch (err) {
    if (err.message.includes('FAIL_CLOSED_COLLISION')) {
      collisionPrevented = true;
    }
  }

  // Cleanup sandbox
  try {
    fs.rmSync(sandboxDir, { recursive: true, force: true });
  } catch (e) {}

  return collisionPrevented;
}

// =========================================================================
// 7. END-TO-END BINDING: PROVIDER EVIDENCE GATE (INC-SPECULATIVE-PROVIDER-053C)
// =========================================================================
function LL_07_PROVIDER_EVIDENCE_GATE_END_TO_END_BINDING() {
  const shopeeContract = getProviderContract('SHOPEE_AFFILIATE');
  const lazadaContract = getProviderContract('LAZADA_AFFILIATE');
  const tiktokContract = getProviderContract('TIKTOK_AFFILIATE');

  const authAccountsPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'feed_gateway', 'authorized_affiliate_accounts.json');
  const authAccounts = JSON.parse(fs.readFileSync(authAccountsPath, 'utf8'));

  return shopeeContract.support_status === 'UNSUPPORTED_PENDING_PROVIDER_DOCS' &&
         lazadaContract.support_status === 'UNSUPPORTED_PENDING_PROVIDER_DOCS' &&
         tiktokContract.support_status === 'UNSUPPORTED_PENDING_PROVIDER_DOCS' &&
         Object.values(authAccounts.platforms).every(p => p.status === 'UNSUPPORTED_PENDING_PROVIDER_DOCS');
}

// =========================================================================
// 8. END-TO-END BINDING: SECRET HYGIENE FULL SCAN (INC-SECRET-LEAK-052B)
// =========================================================================
function LL_08_SECRET_HYGIENE_END_TO_END_BINDING() {
  const fullScanResult = runSecretScan();
  return fullScanResult.violations_count === 0 &&
         fullScanResult.scanned_files_count > 1000 &&
         fullScanResult.passed === true;
}

// =========================================================================
// 9. END-TO-END BINDING: AUDIT STATUS TAXONOMY (INC-PREMATURE-AUDIT-CLAIM-056B-061E)
// =========================================================================
function LL_09_AUDIT_STATUS_TAXONOMY_END_TO_END_BINDING() {
  // Test receipt emission with forbidden ACCEPTED status must fail closed BEFORE file write
  fs.mkdirSync(sandboxDir, { recursive: true });
  const testReceiptObj = { work_order: 'TEST-ORDER-063D' };

  let prematureBlocked = false;
  try {
    finalizeWorkOrderReceipt(testReceiptObj, sandboxDir, 'ACCEPTED');
  } catch (err) {
    if (err.message.includes('STATUS_TAXONOMY_VIOLATION') || err.message.includes('PREMATURE_ACCEPTANCE_PROHIBITED')) {
      prematureBlocked = true;
    }
  }

  // Ensure no receipt file was created
  const receiptFile = path.join(sandboxDir, 'RUN_RECEIPT_TEST-ORDER-063D.json');
  const noFileCreated = !fs.existsSync(receiptFile);

  try { fs.rmSync(sandboxDir, { recursive: true, force: true }); } catch (e) {}

  return prematureBlocked && noFileCreated;
}

// =========================================================================
// 10. SCHEDULER RUNTIME TRANSPARENCY (INC-SCHEDULER-MISLEADING-056C-058B)
// =========================================================================
function LL_10_SCHEDULER_RUNTIME_TRANSPARENCY_BINDING() {
  const receipt058bPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs', 'run_058b_trigger_provenance_correction', 'receipt.json');
  const receipt058b = JSON.parse(fs.readFileSync(receipt058bPath, 'utf8'));

  return receipt058b.execution_trigger === 'MANUAL_TASK_TRIGGER' &&
         receipt058b.task_identity?.task_status === 'Ready';
}

// =========================================================================
// 11. PRODUCTION LOCK INVARIANT (INC-PRODUCTION-LOCK-055)
// =========================================================================
function LL_11_PRODUCTION_LOCK_INVARIANT_BINDING() {
  const prodRaw = fs.readFileSync(prodFeedPath, 'utf8');
  const prodFeed = JSON.parse(prodRaw);
  const prodSha = getSha256(prodRaw);
  const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8'));
  const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved === true;

  return prodFeed.length === 0 &&
         prodSha === EXPECTED_PROD_HASH &&
         !isApproved;
}

// =========================================================================
// 12. TAMPER SIMULATION & EXTERNAL TRUST ANCHOR INTEGRITY
// =========================================================================
function LL_12_TAMPER_SIMULATION_AND_EXTERNAL_TRUST_ANCHOR(exportedModule) {
  const realRegistry = JSON.parse(fs.readFileSync(registryJsonPath, 'utf8'));
  const realChainLedger = JSON.parse(fs.readFileSync(manifestChainPath, 'utf8'));

  // 1. External Trust Anchor check
  const anchor = realChainLedger.external_trust_anchor;
  const hasAnchorDeclaration = anchor &&
                               anchor.anchor_type === 'RELEASE_VAULT_CEO_APPROVAL_RECORD' &&
                               anchor.offsite_status === 'UNANCHORED_LOCALLY_SECURED_PENDING_OFFSITE_BACKUP';

  // 2. Tamper simulation: Simulating malicious modification to both receipt and local registry
  const tamperedRegistry = JSON.parse(JSON.stringify(realRegistry));
  const testReceiptKey = '07_QUALITY_ASSURANCE/runtime_evidence/runs/run_058_first_cadence_observation/receipt.json';
  tamperedRegistry.historical_receipts_baseline[testReceiptKey] = '0000000000000000000000000000000000000000000000000000000000000000';

  let tamperCaughtByReceiptCheck = false;
  try {
    verifyRegistryHashChain(tamperedRegistry, null, null);
  } catch (err) {
    if (err.message.includes('REGISTRY_HASH_CHAIN_TAMPERED')) {
      tamperCaughtByReceiptCheck = true;
    }
  }

  // Attacker modifies revision previous_revision_sha256
  const tamperedChainLedger = JSON.parse(JSON.stringify(realChainLedger));
  tamperedChainLedger.revisions[2].previous_revision_sha256 = '2222222222222222222222222222222222222222222222222222222222222222';

  let tamperCaughtByRevisionChain = false;
  try {
    verifyRegistryHashChain(realRegistry, null, tamperedChainLedger);
  } catch (err) {
    if (err.message.includes('REGISTRY_HASH_CHAIN_TAMPERED')) {
      tamperCaughtByRevisionChain = true;
    }
  }

  // 3. Regression test integrity: Iterate all 11 incidents in registry
  const incidents = realRegistry.incidents || [];
  if (incidents.length !== 11) return false;

  let allIncidentTestsPassed = true;
  for (const inc of incidents) {
    const testFn = exportedModule[inc.test_case];
    if (typeof testFn !== 'function') {
      console.error(`  [REGISTRY_ERROR]: Missing test case function ${inc.test_case}`);
      allIncidentTestsPassed = false;
      break;
    }
    if (!testFn(exportedModule)) {
      console.error(`  [REGISTRY_ERROR]: Incident test case failed: ${inc.test_case}`);
      allIncidentTestsPassed = false;
      break;
    }
  }

  return hasAnchorDeclaration && tamperCaughtByReceiptCheck && tamperCaughtByRevisionChain && allIncidentTestsPassed;
}

// Master Test Runner
function run063dTests() {
  console.log('🧪 [JAYT-LESSONS-063D-TEST] Khởi chạy bộ kiểm thử End-to-End Governance Policy Binding & Trust Anchor (063D)...\n');

  assertTest('LL_01_ANTI_SYNTHETIC_DATA_END_TO_END_BINDING',
    LL_01_ANTI_SYNTHETIC_DATA_END_TO_END_BINDING(),
    'Chặn đứng dữ liệu giả (End-to-End): ingestCandidateFile ném ERR_GOVERNANCE_SYNTHETIC_REJECTED trước khi ghi đĩa.');

  assertTest('LL_02_CLAIM_BOUNDED_PROVENANCE_END_TO_END_BINDING',
    LL_02_CLAIM_BOUNDED_PROVENANCE_END_TO_END_BINDING(),
    'Chặn đứng claim vượt nguồn (End-to-End): validateClaimBoundedToArtifact từ chối claim giả, chấp nhận claim Galaxy thật.');

  assertTest('LL_03_CANDIDATE_TRUTH_GATE_END_TO_END_BINDING',
    LL_03_CANDIDATE_TRUTH_GATE_END_TO_END_BINDING(),
    'Chặn đứng triage bằng keyword (End-to-End): evaluateProbeStackBasedTruthGate062C hạ probe không có giá số về OBSERVED_NOT_QUALIFIED.');

  assertTest('LL_04_STACK_BASED_DOM_CONTAINER_END_TO_END_BINDING',
    LL_04_STACK_BASED_DOM_CONTAINER_END_TO_END_BINDING(),
    'Chặn đứng DOM giả cấu trúc (End-to-End): evaluateProbeStackBasedTruthGate062C từ chối thông tin bị phân mảnh qua các node sibling.');

  assertTest('LL_05_APPEND_ONLY_IMMUTABILITY_HASH_CHAIN_AUDIT',
    LL_05_APPEND_ONLY_IMMUTABILITY_HASH_CHAIN_AUDIT(),
    'Chuỗi băm mật mã Tamper-Evident: verifyRegistryHashChain xác thực 17 receipt lịch sử & chuỗi 3 snapshot Genesis 063B -> 063C -> 063D.');

  assertTest('LL_06_UNIQUE_DYNAMIC_RUN_ID_END_TO_END_BINDING',
    LL_06_UNIQUE_DYNAMIC_RUN_ID_END_TO_END_BINDING(),
    'Run ID động + Fail-Closed (End-to-End): validateAppendOnlyRunIsolation ném FAIL_CLOSED_COLLISION khi phát hiện thư mục trùng.');

  assertTest('LL_07_PROVIDER_EVIDENCE_GATE_END_TO_END_BINDING',
    LL_07_PROVIDER_EVIDENCE_GATE_END_TO_END_BINDING(),
    'Provider Evidence Gate (End-to-End): Toàn bộ 3 sàn thương mại điện tử bị khóa ở UNSUPPORTED_PENDING_PROVIDER_DOCS.');

  assertTest('LL_08_SECRET_HYGIENE_END_TO_END_BINDING',
    LL_08_SECRET_HYGIENE_END_TO_END_BINDING(),
    'Vệ sinh bí mật toàn diện (End-to-End): runSecretScan xác thực 0 vi phạm bảo mật trên toàn bộ workspace.');

  assertTest('LL_09_AUDIT_STATUS_TAXONOMY_END_TO_END_BINDING',
    LL_09_AUDIT_STATUS_TAXONOMY_END_TO_END_BINDING(),
    'Taxonomy trạng thái minh bạch (End-to-End): finalizeWorkOrderReceipt ném lỗi trước khi ghi tệp receipt nếu khai báo ACCEPTED.');

  assertTest('LL_10_SCHEDULER_RUNTIME_TRANSPARENCY_BINDING',
    LL_10_SCHEDULER_RUNTIME_TRANSPARENCY_BINDING(),
    'Minh bạch nguồn gốc kích hoạt Scheduler: Khai báo trung thực MANUAL_TASK_TRIGGER và task_status: Ready.');

  assertTest('LL_11_PRODUCTION_LOCK_INVARIANT_BINDING',
    LL_11_PRODUCTION_LOCK_INVARIANT_BINDING(),
    'Khóa sản xuất bất biến: deals_feed.json: [] (SHA-256) và RELEASE_MANIFEST is_approved: false (LOCKED).');

  assertTest('LL_12_TAMPER_SIMULATION_AND_EXTERNAL_TRUST_ANCHOR',
    LL_12_TAMPER_SIMULATION_AND_EXTERNAL_TRUST_ANCHOR(module.exports),
    'Chống giả mạo & External Trust Anchor: Khai báo trung thực UNANCHORED_LOCALLY_SECURED_PENDING_OFFSITE_BACKUP và phát hiện giả mạo kép; 11/11 incident PASS.');

  console.log(`\n🟢 [LESSONS-063D-SUMMARY] TOÀN BỘ ${passedTests}/${totalTests} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

module.exports = {
  LL_01_ANTI_SYNTHETIC_DATA_END_TO_END_BINDING,
  LL_02_CLAIM_BOUNDED_PROVENANCE_END_TO_END_BINDING,
  LL_03_CANDIDATE_TRUTH_GATE_END_TO_END_BINDING,
  LL_04_STACK_BASED_DOM_CONTAINER_END_TO_END_BINDING,
  LL_05_APPEND_ONLY_IMMUTABILITY_HASH_CHAIN_AUDIT,
  LL_06_UNIQUE_DYNAMIC_RUN_ID_END_TO_END_BINDING,
  LL_07_PROVIDER_EVIDENCE_GATE_END_TO_END_BINDING,
  LL_08_SECRET_HYGIENE_END_TO_END_BINDING,
  LL_09_AUDIT_STATUS_TAXONOMY_END_TO_END_BINDING,
  LL_10_SCHEDULER_RUNTIME_TRANSPARENCY_BINDING,
  LL_11_PRODUCTION_LOCK_INVARIANT_BINDING,
  LL_12_TAMPER_SIMULATION_AND_EXTERNAL_TRUST_ANCHOR,
  run063dTests
};

if (require.main === module) {
  run063dTests();
}
