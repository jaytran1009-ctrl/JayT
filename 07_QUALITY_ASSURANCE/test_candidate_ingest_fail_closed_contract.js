const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');
const { spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const ingestPipelineJs = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'ingest_candidate_to_catalog.js');
const { ingestCandidateFile } = require(ingestPipelineJs);

const liveFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const metizCandidatePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review', 'candidate_18_CAND-DNG-METIZ-U22-REAL.json');

console.log('🧪 [JAYT-INGEST-SAFETY-TEST] Khởi chạy bộ kiểm thử An Toàn Ingestion Pipeline & True 2-File Atomic 2PC (029A)...');

let allPassed = true;
function assertTest(name, condition, detail = '') {
  console.log(`  [${name}]: [${condition ? 'PASS' : 'FAIL'}]${detail ? ' - ' + detail : ''}`);
  if (!condition) allPassed = false;
}

function getSha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

const liveFeedPreHash = getSha256(liveFeedPath);
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jayt_ingest_safety_test_'));

try {
  const isolatedFeedPath = path.join(tempDir, 'test_deals_feed.json');
  const isolatedEvidencePath = path.join(tempDir, 'test_evidence_store.json');
  fs.writeFileSync(isolatedFeedPath, JSON.stringify([], null, 2), 'utf8');
  fs.writeFileSync(isolatedEvidencePath, JSON.stringify({}, null, 2), 'utf8');

  const preFeedHash = getSha256(isolatedFeedPath);
  const preEvidenceHash = getSha256(isolatedEvidencePath);

  // ---------------------------------------------------------------------------
  // [INGEST_01] Real Candidate Metiz with UNCONFIRMED_AT_CAPTURE_TIME is Blocked
  // ---------------------------------------------------------------------------
  const res1 = ingestCandidateFile(metizCandidatePath, isolatedFeedPath, isolatedEvidencePath);
  const postFeedHash1 = getSha256(isolatedFeedPath);
  const postEvidenceHash1 = getSha256(isolatedEvidencePath);
  const feedContent1 = JSON.parse(fs.readFileSync(isolatedFeedPath, 'utf8'));

  assertTest(
    'INGEST_01_REAL_METIZ_UNCONFIRMED_BLOCKED',
    res1.success === false &&
    res1.error_code === 'ERR_UNCONFIRMED_TEMPORAL_VALIDITY' &&
    preFeedHash === postFeedHash1 &&
    preEvidenceHash === postEvidenceHash1 &&
    feedContent1.length === 0,
    `Refusal: ${res1.message}`
  );

  // ---------------------------------------------------------------------------
  // [INGEST_02] Synthetic Fixture with UNCONFIRMED_AT_CAPTURE_TIME is Blocked
  // ---------------------------------------------------------------------------
  const fixtureCandidatePath = path.join(tempDir, 'candidate_synthetic_unconfirmed.json');
  const syntheticData = {
    evidence: {
      "EVID_SYNTHETIC": {
        deal_id: "DNG-SYNTHETIC-01",
        source_url: "https://metiz.vn/promo",
        source_type: "OFFICIAL_PROMOTION_ANNOUNCEMENT",
        recorded_by: "JAYT_DESK_REVIEW_PUBLIC_SOURCE",
        verification_status: "NEEDS_RECHECK",
        temporal_validity: "UNCONFIRMED_AT_CAPTURE_TIME",
        expiry_basis: "NOT_OBSERVED_ON_CAPTURED_PROMOTION_PAGE",
        checked_at: new Date().toISOString(),
        captured_at: new Date().toISOString(),
        notes: "Test synthetic"
      }
    },
    deals: [
      {
        deal_id: "DNG-SYNTHETIC-01",
        title: "Deal Chưa Rõ Thời Hạn",
        merchant: "Metiz Cinema",
        zone: "ZONE_HELIO_METIZ",
        category: "local_entertainment",
        need_collection: "general",
        budget_tier: "under_100k",
        group_size: "1_person",
        contextual_reason: "Test",
        taxonomy: "PROBING",
        affiliate_type: "DIRECT_DEAL",
        source_url: "https://metiz.vn/promo",
        evidence_ref: "EVID_SYNTHETIC",
        disclosure: "Test",
        lifecycle_status: "PROBING",
        category_scope: "LOCAL_EXPERIENCE"
      }
    ]
  };
  fs.writeFileSync(fixtureCandidatePath, JSON.stringify(syntheticData, null, 2), 'utf8');

  const res2 = ingestCandidateFile(fixtureCandidatePath, isolatedFeedPath, isolatedEvidencePath);
  const postFeedHash2 = getSha256(isolatedFeedPath);
  const feedContent2 = JSON.parse(fs.readFileSync(isolatedFeedPath, 'utf8'));

  assertTest(
    'INGEST_02_FIXTURE_WITH_UNCONFIRMED_TEMPORAL_BLOCKED',
    res2.success === false &&
    res2.error_code === 'ERR_UNCONFIRMED_TEMPORAL_VALIDITY' &&
    preFeedHash === postFeedHash2 &&
    feedContent2.length === 0,
    `Refusal: ${res2.message}`
  );

  // ---------------------------------------------------------------------------
  // [INGEST_03] Positive Deal Attempt without CEO Approval Manifest is Blocked
  // ---------------------------------------------------------------------------
  const candidateReadyForReview = {
    candidate_id: "CAND-TEST-READY-03",
    merchant: "Metiz Cinema Đà Nẵng",
    title: "Vé 2D 55K U22",
    category: "local_entertainment",
    category_scope: "LOCAL_EXPERIENCE",
    affiliate_type: "DIRECT_DEAL",
    source_url: "https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html",
    artifact_source_url: "https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html",
    captured_at: new Date().toISOString(),
    artifact_screenshot: "metiz_u22_official_promo_capture.png",
    artifact_screenshot_hash: "5c563aebfe78b487fdcf2f1c1f13e7c07ea447a52aff5873320d549b6d034ea7",
    artifact_text_dump: "metiz_u22_official_promo_text.txt",
    artifact_text_hash: "c17418d5d44c7c92a154dd894a06249f3d5fbd7cab8b30366375abdcf73b59b0",
    extracted_claims: {
      price_snippet: "55.000đ",
      conditions_snippet: "thành viên Metiz Cinema từ 22 tuổi trở xuống",
      expiry_snippet: "thứ Ba đến thứ Năm"
    },
    observed_price_or_offer: "55.000đ",
    observed_conditions: "thành viên Metiz Cinema từ 22 tuổi trở xuống",
    expiry_basis: "Áp dụng Thứ Ba đến Thứ Năm",
    verification_readiness: "READY_FOR_CEO_REVIEW"
  };
  const candidateReadyFile = path.join(tempDir, 'candidate_ready_no_approval.json');
  fs.writeFileSync(candidateReadyFile, JSON.stringify(candidateReadyForReview, null, 2), 'utf8');

  const res3 = ingestCandidateFile(candidateReadyFile, isolatedFeedPath, isolatedEvidencePath);
  const postFeedHash3 = getSha256(isolatedFeedPath);
  assertTest(
    'INGEST_03_PASS_WITHOUT_CEO_APPROVAL_BLOCKED',
    res3.success === false &&
    res3.error_code === 'ERR_CEO_APPROVAL_REQUIRED' &&
    preFeedHash === postFeedHash3,
    `Refusal: ${res3.message}`
  );

  // ---------------------------------------------------------------------------
  // [INGEST_04a] Fault Injection Phase 1 Crash Rollback Proof
  // ---------------------------------------------------------------------------
  const mockApproval = {
    work_order: "JAYT-TEST-001",
    candidate_id: "CAND-TEST-READY-03",
    approved_by: "CEO_JAY_TRAN",
    status: "AUTHORIZED_FOR_CATALOG_INGESTION"
  };

  const res4a = ingestCandidateFile(candidateReadyFile, isolatedFeedPath, isolatedEvidencePath, {
    approvalManifest: mockApproval,
    simulate_evidence_write_failure: true
  });

  const postFeedHash4a = getSha256(isolatedFeedPath);
  const postEvidenceHash4a = getSha256(isolatedEvidencePath);

  assertTest(
    'INGEST_04a_FAULT_INJECTION_PHASE1_CRASH_ROLLED_BACK',
    res4a.success === false &&
    res4a.error_code === 'ERR_INGESTION_ROLLBACK' &&
    preFeedHash === postFeedHash4a &&
    preEvidenceHash === postEvidenceHash4a,
    `Phase 1 rollback verified: Feed and evidence store byte-for-byte identical to pre-test state.`
  );

  // ---------------------------------------------------------------------------
  // [INGEST_04b] True 2-File Atomic Recovery: Crash AFTER Feed Swap Rollback Proof
  // ---------------------------------------------------------------------------
  const res4b = ingestCandidateFile(candidateReadyFile, isolatedFeedPath, isolatedEvidencePath, {
    approvalManifest: mockApproval,
    simulate_post_feed_swap_failure: true
  });

  const postFeedHash4b = getSha256(isolatedFeedPath);
  const postEvidenceHash4b = getSha256(isolatedEvidencePath);
  const feedContent4b = JSON.parse(fs.readFileSync(isolatedFeedPath, 'utf8'));

  assertTest(
    'INGEST_04b_POST_FEED_SWAP_FAILURE_RESTORED_FROM_BACKUP',
    res4b.success === false &&
    res4b.error_code === 'ERR_INGESTION_ROLLBACK' &&
    preFeedHash === postFeedHash4b &&
    preEvidenceHash === postEvidenceHash4b &&
    feedContent4b.length === 0,
    `True 2-File Atomic Recovery verified: Feed was restored from backup after simulated crash before evidence commit.`
  );

  // ---------------------------------------------------------------------------
  // [INGEST_05] Real Ingest CLI Subprocess Exits with Non-Zero Exit Code 1
  // ---------------------------------------------------------------------------
  const proc = spawnSync('node', [
    ingestPipelineJs,
    '--candidate', metizCandidatePath,
    '--target-feed', isolatedFeedPath,
    '--target-evidence', isolatedEvidencePath
  ], { encoding: 'utf8' });

  const postFeedHash5 = getSha256(isolatedFeedPath);
  const feedContent5 = JSON.parse(fs.readFileSync(isolatedFeedPath, 'utf8'));

  assertTest(
    'INGEST_05_CLI_SUBPROCESS_NON_ZERO_EXIT',
    proc.status === 1 &&
    proc.stdout.includes('REJECTED_UNCONFIRMED_TEMPORAL_VALIDITY') &&
    preFeedHash === postFeedHash5 &&
    feedContent5.length === 0,
    `Exit Code: ${proc.status}, Output contains refusal message`
  );

  // ---------------------------------------------------------------------------
  // [INGEST_06] Live Catalog Deals Feed Zero-Mutation Invariant Proof
  // ---------------------------------------------------------------------------
  const liveFeedPostHash = getSha256(liveFeedPath);
  const liveDeals = JSON.parse(fs.readFileSync(liveFeedPath, 'utf8'));

  assertTest(
    'INGEST_06_LIVE_CATALOG_ZERO_MUTATION_PROOF',
    liveFeedPreHash === liveFeedPostHash &&
    liveDeals.length === 0 &&
    liveFeedPostHash === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945',
    `Live deals_feed.json remained untouched []. SHA-256: ${liveFeedPostHash}`
  );

} finally {
  try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch {}
}

console.log('\n' + (allPassed ? '🟢' : '❌') + ' [INGEST-SAFETY-SUMMARY] Toàn bộ ' + (allPassed ? '7/7' : 'bài') + ' kiểm thử An Toàn Ingestion Pipeline & True 2-File Atomic Recovery đã ' + (allPassed ? 'ĐẠT [PASS]' : 'THẤT BẠI [FAIL]') + '!');

if (!allPassed) {
  process.exit(1);
} else {
  process.exit(0);
}
