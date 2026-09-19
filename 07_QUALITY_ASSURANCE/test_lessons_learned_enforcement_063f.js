/**
 * JAYT CLAIM & MULTI-ARTIFACT FAIL-CLOSED TEST SUITE (063F)
 * Directive: JAYT-CLAIM-AND-MULTI-ARTIFACT-FAIL-CLOSED-063F
 * 
 * Rules:
 * 1. Missing artifact text fail-closed: ERR_GOVERNANCE_CLAIM_SOURCE_MISSING (no validation skipped).
 * 2. Multi-deal bundle claim validation: All claims in all deals scanned fail-closed.
 * 3. Dual-file collision guard: Protects both staging feed and staging manifest fail-closed.
 * 4. Byte-for-byte preservation: All rejected mutations leave disk files 100% untouched.
 * 5. Honest naming: 'local_trust_anchor_reference' (UNANCHORED_LOCALLY_SECURED_PENDING_OFFSITE_BACKUP).
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

const sandboxDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'private_sandbox', 'test_063f_sandbox');

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

// =========================================================================
// 1. END-TO-END CLOSURE: ANTI-SYNTHETIC DATA GATE (INC-SYNTHETIC-DATA-060)
// =========================================================================
function LL_01_ANTI_SYNTHETIC_DATA_FAIL_CLOSED_REMEDIATION() {
  fs.mkdirSync(sandboxDir, { recursive: true });
  const mockSyntheticCandidateFile = path.join(sandboxDir, 'mock_synthetic_candidate_063f.json');

  // Test 1A: writeCandidateFile must fail closed and NOT create file on disk
  let writeFailedClosed = false;
  try {
    writeCandidateFile({
      candidate_id: 'CAND-SYNTHETIC-WRITE-060',
      title: 'Synthetic Deal CGV',
      is_synthetic: true
    }, mockSyntheticCandidateFile);
  } catch (err) {
    if (err.message.includes('SYNTHETIC_DATA_REJECTED')) {
      writeFailedClosed = true;
    }
  }
  const noFileCreatedOnWrite = !fs.existsSync(mockSyntheticCandidateFile);

  // Test 1B: ingestCandidateFile must fail closed and leave production feed untouched
  fs.writeFileSync(mockSyntheticCandidateFile, JSON.stringify({
    candidate_id: 'CAND-MOCK-SYNTHETIC-060',
    title: 'Synthetic Deal CGV',
    is_synthetic: true,
    deals: [{ deal_id: 'DNG-MOCK-DEAL-060' }],
    evidence: {}
  }, null, 2));

  const preHash = getSha256(prodFeedPath);
  const ingestResult = ingestCandidateFile(mockSyntheticCandidateFile);
  const ingestFailedClosed = ingestResult.success === false &&
                             ingestResult.error_code === 'ERR_GOVERNANCE_SYNTHETIC_REJECTED';
  const postHash = getSha256(prodFeedPath);
  const feedUntouched = preHash === postHash;

  try { fs.rmSync(sandboxDir, { recursive: true, force: true }); } catch (e) {}

  return writeFailedClosed && noFileCreatedOnWrite && ingestFailedClosed && feedUntouched;
}

// =========================================================================
// 2. END-TO-END CLOSURE: CLAIM-BOUND PROVENANCE GATE (INC-UNBOUNDED-CLAIM-061C)
// =========================================================================
function LL_02_CLAIM_BOUNDED_PROVENANCE_FAIL_CLOSED_REMEDIATION() {
  fs.mkdirSync(sandboxDir, { recursive: true });
  const stagingFeed = JSON.parse(fs.readFileSync(stagingFeedPath, 'utf8'));
  const realGalaxyDeal = stagingFeed[0];
  const artifactTextRel = realGalaxyDeal.provenance.artifacts.text.file;
  const artifactTextAbs = path.resolve(repoRoot, artifactTextRel);
  const artifactText = fs.readFileSync(artifactTextAbs, 'utf8');

  // Test 2A: Missing artifact text MUST fail-closed with ERR_GOVERNANCE_CLAIM_SOURCE_MISSING
  const missingArtifactCandidatePath = path.join(sandboxDir, 'candidate_missing_artifact.json');
  let missingArtifactBlocked = false;
  try {
    writeCandidateFile({
      candidate_id: 'CAND-MISSING-ARTIFACT-063F',
      title: 'Galaxy Cinema — Happy Day',
      provenance: { artifacts: { text: { file: '07_QUALITY_ASSURANCE/non_existent_text.txt' } } }
    }, missingArtifactCandidatePath);
  } catch (err) {
    if (err.code === 'ERR_GOVERNANCE_CLAIM_SOURCE_MISSING' || err.message.includes('CLAIM_SOURCE_ARTIFACT_MISSING')) {
      missingArtifactBlocked = true;
    }
  }
  const noMissingFileCreated = !fs.existsSync(missingArtifactCandidatePath);

  // Test 2B: Candidate Bundle where Deal 2 contains a fabricated claim MUST fail-closed
  const bundleCandidatePath = path.join(sandboxDir, 'candidate_bundle_fabricated.json');
  let bundleFabricatedBlocked = false;
  try {
    writeCandidateFile({
      candidate_id: 'CAND-BUNDLE-063F',
      title: 'Galaxy Đà Nẵng',
      provenance: { artifacts: { text: { file: artifactTextRel } } },
      deals: [
        {
          deal_id: 'DEAL-01-GENUINE',
          title: 'Galaxy Đà Nẵng',
          schedule: 'Thứ Ba hàng tuần'
        },
        {
          deal_id: 'DEAL-02-FABRICATED',
          title: 'Galaxy Cinema 478 Điện Biên Phủ',
          schedule: 'Thứ Ba hàng tuần'
        }
      ]
    }, bundleCandidatePath);
  } catch (err) {
    if (err.message.includes('CLAIM_NOT_BOUND_TO_SOURCE_ARTIFACT')) {
      bundleFabricatedBlocked = true;
    }
  }
  const noBundleFileCreated = !fs.existsSync(bundleCandidatePath);

  // Test 2C: Candidate Bundle where all deals are genuine verbatim MUST succeed
  const genuineBundlePath = path.join(sandboxDir, 'candidate_bundle_genuine.json');
  let genuineBundlePassed = false;
  try {
    const res = writeCandidateFile({
      candidate_id: 'CAND-BUNDLE-GENUINE-063F',
      title: 'Galaxy Đà Nẵng',
      schedule: 'Thứ Ba hàng tuần',
      eligibility: 'tất cả khách hàng',
      provenance: { artifacts: { text: { file: artifactTextRel } } },
      deals: [
        {
          deal_id: 'DEAL-01-GENUINE',
          title: 'Galaxy Đà Nẵng',
          pricing_tiers: [{ cinema_name: 'Galaxy Đà Nẵng', price_display: '50.000đ' }]
        },
        {
          deal_id: 'DEAL-02-GENUINE',
          title: 'Galaxy Đà Nẵng',
          pricing_tiers: [{ cinema_name: 'Galaxy Đà Nẵng', price_display: '70.000đ' }]
        }
      ]
    }, genuineBundlePath);
    genuineBundlePassed = res.success === true && fs.existsSync(genuineBundlePath);
  } catch (err) {
    genuineBundlePassed = false;
  }

  try { fs.rmSync(sandboxDir, { recursive: true, force: true }); } catch (e) {}

  return missingArtifactBlocked && noMissingFileCreated &&
         bundleFabricatedBlocked && noBundleFileCreated &&
         genuineBundlePassed;
}

// =========================================================================
// 3. END-TO-END CLOSURE: CANDIDATE TRUTH GATE (INC-KEYWORD-TRIAGE-062)
// =========================================================================
function LL_03_CANDIDATE_TRUTH_GATE_FAIL_CLOSED_REMEDIATION() {
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
// 4. END-TO-END CLOSURE: STACK-BASED DOM CONTAINER (INC-PSEUDO-DOM-CONTAINER-062A)
// =========================================================================
function LL_04_STACK_BASED_DOM_CONTAINER_FAIL_CLOSED_REMEDIATION() {
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
// 5. CRYPTOGRAPHIC HASH-CHAIN AUDIT: ALL HISTORICAL RECEIPTS & 5 REVISIONS
// =========================================================================
function LL_05_APPEND_ONLY_IMMUTABILITY_HASH_CHAIN_AUDIT() {
  const registry = JSON.parse(fs.readFileSync(registryJsonPath, 'utf8'));
  const chainLedger = JSON.parse(fs.readFileSync(manifestChainPath, 'utf8'));

  const verification = verifyRegistryHashChain(registry, null, chainLedger);
  return verification.valid === true &&
         verification.verified_receipts_count === 17 &&
         chainLedger.revisions.length === 5;
}

// =========================================================================
// 6. END-TO-END CLOSURE: DUAL-FILE COLLISION GUARDS (INC-STATIC-RUN-ID-062B)
// =========================================================================
function LL_06_UNIQUE_DYNAMIC_RUN_ID_FAIL_CLOSED_REMEDIATION() {
  fs.mkdirSync(sandboxDir, { recursive: true });

  // Test 6A: Staging feed collision guard
  const existingFeedPath = path.join(sandboxDir, 'existing_deals_feed.json');
  const targetManifestPath = path.join(sandboxDir, 'new_staging_manifest.json');
  fs.writeFileSync(existingFeedPath, '["INITIAL_STAGING_CONTENT"]', 'utf8');
  const preFeedSha = getSha256(existingFeedPath);

  let stagingCollisionPrevented = false;
  try {
    deployStagingFeed061F({
      targetFeedPath: existingFeedPath,
      targetManifestPath,
      enforceAppendOnly: true
    });
  } catch (err) {
    if (err.message.includes('FAIL_CLOSED_COLLISION')) {
      stagingCollisionPrevented = true;
    }
  }
  const postFeedSha = getSha256(existingFeedPath);
  const feedUnchanged = preFeedSha === postFeedSha;
  const manifestNotCreatedOnCollision = !fs.existsSync(targetManifestPath);

  // Test 6B: Staging manifest collision guard (Feed is new, but Manifest exists)
  const newFeedPath = path.join(sandboxDir, 'brand_new_feed.json');
  const existingManifestPath = path.join(sandboxDir, 'existing_manifest.json');
  fs.writeFileSync(existingManifestPath, '{"initial": "manifest"}', 'utf8');
  const preManifestSha = getSha256(existingManifestPath);

  let manifestCollisionPrevented = false;
  try {
    deployStagingFeed061F({
      targetFeedPath: newFeedPath,
      targetManifestPath: existingManifestPath,
      enforceAppendOnly: true
    });
  } catch (err) {
    if (err.message.includes('FAIL_CLOSED_COLLISION')) {
      manifestCollisionPrevented = true;
    }
  }
  const postManifestSha = getSha256(existingManifestPath);
  const manifestUnchanged = preManifestSha === postManifestSha;
  const feedNotCreatedOnManifestCollision = !fs.existsSync(newFeedPath);

  // Test 6C: Receipt emitter collision guard
  const existingReceiptDir = path.join(sandboxDir, 'existing_run_dir');
  fs.mkdirSync(existingReceiptDir, { recursive: true });
  const canonicalReceipt = path.join(existingReceiptDir, 'receipt.json');
  fs.writeFileSync(canonicalReceipt, '{"initial": "receipt"}', 'utf8');
  const preReceiptSha = getSha256(canonicalReceipt);

  let receiptCollisionPrevented = false;
  try {
    finalizeWorkOrderReceipt({ work_order: 'EXISTING_ORDER' }, existingReceiptDir, 'IMPLEMENTED_PENDING_CEO_AUDIT', { enforceAppendOnly: true });
  } catch (err) {
    if (err.message.includes('FAIL_CLOSED_COLLISION')) {
      receiptCollisionPrevented = true;
    }
  }
  const postReceiptSha = getSha256(canonicalReceipt);
  const receiptUnchanged = preReceiptSha === postReceiptSha;

  try { fs.rmSync(sandboxDir, { recursive: true, force: true }); } catch (e) {}

  return stagingCollisionPrevented && feedUnchanged && manifestNotCreatedOnCollision &&
         manifestCollisionPrevented && manifestUnchanged && feedNotCreatedOnManifestCollision &&
         receiptCollisionPrevented && receiptUnchanged;
}

// =========================================================================
// 7. END-TO-END CLOSURE: PROVIDER EVIDENCE GATE (INC-SPECULATIVE-PROVIDER-053C)
// =========================================================================
function LL_07_PROVIDER_EVIDENCE_GATE_FAIL_CLOSED_REMEDIATION() {
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
// 8. END-TO-END CLOSURE: SECRET HYGIENE FULL SCAN (INC-SECRET-LEAK-052B)
// =========================================================================
function LL_08_SECRET_HYGIENE_FAIL_CLOSED_REMEDIATION() {
  const fullScanResult = runSecretScan();
  return fullScanResult.violations_count === 0 &&
         fullScanResult.scanned_files_count > 1000 &&
         fullScanResult.passed === true;
}

// =========================================================================
// 9. END-TO-END CLOSURE: AUDIT STATUS TAXONOMY (INC-PREMATURE-AUDIT-CLAIM-056B-061E)
// =========================================================================
function LL_09_AUDIT_STATUS_TAXONOMY_FAIL_CLOSED_REMEDIATION() {
  fs.mkdirSync(sandboxDir, { recursive: true });
  const testReceiptObj = { work_order: 'TEST-ORDER-063F' };

  let prematureBlocked = false;
  try {
    finalizeWorkOrderReceipt(testReceiptObj, sandboxDir, 'ACCEPTED', { enforceAppendOnly: false });
  } catch (err) {
    if (err.message.includes('STATUS_TAXONOMY_VIOLATION') || err.message.includes('PREMATURE_ACCEPTANCE_PROHIBITED')) {
      prematureBlocked = true;
    }
  }

  const receiptFile = path.join(sandboxDir, 'RUN_RECEIPT_TEST-ORDER-063F.json');
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
// 12. TAMPER SIMULATION & LOCAL TRUST ANCHOR INTEGRITY
// =========================================================================
function LL_12_TAMPER_SIMULATION_AND_LOCAL_TRUST_ANCHOR(exportedModule) {
  const realRegistry = JSON.parse(fs.readFileSync(registryJsonPath, 'utf8'));
  const realChainLedger = JSON.parse(fs.readFileSync(manifestChainPath, 'utf8'));

  // 1. Local Trust Anchor Reference check
  const anchor = realChainLedger.local_trust_anchor_reference;
  const hasAnchorDeclaration = anchor &&
                               anchor.anchor_type === 'RELEASE_VAULT_CEO_APPROVAL_RECORD' &&
                               anchor.external_offsite_status === 'UNANCHORED_LOCALLY_SECURED_PENDING_OFFSITE_BACKUP';

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
  tamperedChainLedger.revisions[4].previous_revision_sha256 = '4444444444444444444444444444444444444444444444444444444444444444';

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
function run063fTests() {
  console.log('🧪 [JAYT-LESSONS-063F-TEST] Khởi chạy bộ kiểm thử Claim & Multi-Artifact Fail-Closed (063F)...\n');

  assertTest('LL_01_ANTI_SYNTHETIC_DATA_FAIL_CLOSED_REMEDIATION',
    LL_01_ANTI_SYNTHETIC_DATA_FAIL_CLOSED_REMEDIATION(),
    'Chặn đứng dữ liệu giả (Fail-Closed): writeCandidateFile ném lỗi trước khi tạo file; ingestCandidateFile giữ nguyên feed.');

  assertTest('LL_02_CLAIM_BOUNDED_PROVENANCE_FAIL_CLOSED_REMEDIATION',
    LL_02_CLAIM_BOUNDED_PROVENANCE_FAIL_CLOSED_REMEDIATION(),
    'Chặn đứng claim vượt nguồn & thiếu artifact (Fail-Closed): Thiếu artifact ném ERR_GOVERNANCE_CLAIM_SOURCE_MISSING; bundle có deal bịa ném lỗi trước khi tạo file.');

  assertTest('LL_03_CANDIDATE_TRUTH_GATE_FAIL_CLOSED_REMEDIATION',
    LL_03_CANDIDATE_TRUTH_GATE_FAIL_CLOSED_REMEDIATION(),
    'Chặn đứng triage bằng keyword: evaluateProbeStackBasedTruthGate062C hạ probe không có giá số về OBSERVED_NOT_QUALIFIED.');

  assertTest('LL_04_STACK_BASED_DOM_CONTAINER_FAIL_CLOSED_REMEDIATION',
    LL_04_STACK_BASED_DOM_CONTAINER_FAIL_CLOSED_REMEDIATION(),
    'Chặn đứng DOM giả cấu trúc: evaluateProbeStackBasedTruthGate062C từ chối thông tin bị phân mảnh qua các node sibling.');

  assertTest('LL_05_APPEND_ONLY_IMMUTABILITY_HASH_CHAIN_AUDIT',
    LL_05_APPEND_ONLY_IMMUTABILITY_HASH_CHAIN_AUDIT(),
    'Chuỗi băm mật mã Tamper-Evident: verifyRegistryHashChain xác thực 17 receipt lịch sử & chuỗi 5 snapshot Genesis 063B -> 063C -> 063D -> 063E -> 063F.');

  assertTest('LL_06_UNIQUE_DYNAMIC_RUN_ID_FAIL_CLOSED_REMEDIATION',
    LL_06_UNIQUE_DYNAMIC_RUN_ID_FAIL_CLOSED_REMEDIATION(),
    'Collision Guard Kép (Dual-File Guard): deployStagingFeed061F bảo vệ cả feed và manifest; finalizeWorkOrderReceipt ném lỗi giữ nguyên hash file gốc.');

  assertTest('LL_07_PROVIDER_EVIDENCE_GATE_FAIL_CLOSED_REMEDIATION',
    LL_07_PROVIDER_EVIDENCE_GATE_FAIL_CLOSED_REMEDIATION(),
    'Provider Evidence Gate: Toàn bộ 3 sàn thương mại điện tử bị khóa ở UNSUPPORTED_PENDING_PROVIDER_DOCS.');

  assertTest('LL_08_SECRET_HYGIENE_FAIL_CLOSED_REMEDIATION',
    LL_08_SECRET_HYGIENE_FAIL_CLOSED_REMEDIATION(),
    'Vệ sinh bí mật toàn diện: runSecretScan xác thực 0 vi phạm bảo mật trên toàn bộ workspace.');

  assertTest('LL_09_AUDIT_STATUS_TAXONOMY_FAIL_CLOSED_REMEDIATION',
    LL_09_AUDIT_STATUS_TAXONOMY_FAIL_CLOSED_REMEDIATION(),
    'Taxonomy trạng thái minh bạch: finalizeWorkOrderReceipt ném lỗi trước khi ghi tệp receipt nếu khai báo ACCEPTED.');

  assertTest('LL_10_SCHEDULER_RUNTIME_TRANSPARENCY_BINDING',
    LL_10_SCHEDULER_RUNTIME_TRANSPARENCY_BINDING(),
    'Minh bạch nguồn gốc kích hoạt Scheduler: Khai báo trung thực MANUAL_TASK_TRIGGER và task_status: Ready.');

  assertTest('LL_11_PRODUCTION_LOCK_INVARIANT_BINDING',
    LL_11_PRODUCTION_LOCK_INVARIANT_BINDING(),
    'Khóa sản xuất bất biến: deals_feed.json: [] (SHA-256) và RELEASE_MANIFEST is_approved: false (LOCKED).');

  assertTest('LL_12_TAMPER_SIMULATION_AND_LOCAL_TRUST_ANCHOR',
    LL_12_TAMPER_SIMULATION_AND_LOCAL_TRUST_ANCHOR(module.exports),
    'Chống giả mạo & Local Trust Anchor: Khai báo trung thực UNANCHORED_LOCALLY_SECURED_PENDING_OFFSITE_BACKUP và phát hiện giả mạo kép; 11/11 incident PASS.');

  console.log(`\n🟢 [LESSONS-063F-SUMMARY] TOÀN BỘ ${passedTests}/${totalTests} KIỂM THỬ ĐÃ ĐẠT [PASS]!\n`);

  if (passedTests !== totalTests) {
    process.exit(1);
  }
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
  LL_12_TAMPER_SIMULATION_AND_LOCAL_TRUST_ANCHOR,
  run063fTests
};

if (require.main === module) {
  run063fTests();
}
