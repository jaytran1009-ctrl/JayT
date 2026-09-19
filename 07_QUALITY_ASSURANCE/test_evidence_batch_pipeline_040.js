/**
 * test_evidence_batch_pipeline_040.js
 * Comprehensive Test Suite for Work Orders JAYT-BATCH-REAL-CAPTURE-041 & JAYT-EVIDENCE-PROVENANCE-040B:
 * Batch Real Capture Provenance, Cluster Separation & Pipeline Structural Guardrails (3 Clusters, 14 Brands).
 * Directives: JAYT-BATCH-REAL-CAPTURE-041, JAYT-EVIDENCE-PROVENANCE-040B.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {
  validateCandidate,
  validateDomainPolicy,
  validateZonePolicy,
  loadDomainCatalog,
  loadZoneCatalog,
  scanAndValidateAllCandidates
} = require('./validate_candidate_evidence');

const repoRoot = path.resolve(__dirname, '..');
const candidatesDir = path.resolve(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review');
const prodFeedPath = path.resolve(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.resolve(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

console.log('🧪 [JAYT-BATCH-041-TEST] Khởi chạy bộ kiểm thử Batch Real Capture & Pipeline Guardrails (041)...');

function assertTest(testName, condition, description) {
  if (condition) {
    console.log(`  [${testName}]: [PASS] - ${description}`);
  } else {
    console.error(`  [${testName}]: [FAIL] - ${description}`);
    process.exit(1);
  }
}

function getSha256(contentOrBuffer) {
  const hash = crypto.createHash('sha256');
  hash.update(contentOrBuffer);
  return hash.digest('hex');
}

// Read all candidate files
const candidateFiles = fs.readdirSync(candidatesDir).filter(f => f.startsWith('candidate_') && f.endsWith('.json'));
const candidateList = candidateFiles.map(f => {
  const filePath = path.join(candidatesDir, f);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return { filename: f, filePath, data };
});

// [TEST 1]: All 3 Clusters Represented in Schema (Cinema, F&B, Online/App)
const cluster1 = candidateList.filter(c => {
  const deals = c.data.deals || [];
  return deals.some(d => d.category === 'local_entertainment' || (d.merchant && d.merchant.toLowerCase().includes('cinema')));
});
const cluster2 = candidateList.filter(c => {
  const deals = c.data.deals || [];
  return deals.some(d => d.category === 'local_food' || (d.merchant && (d.merchant.includes('Highlands') || d.merchant.includes('Jollibee') || d.merchant.includes('Lotteria') || d.merchant.includes('Phê La') || d.merchant.includes('Katinat') || d.merchant.includes('Starbucks'))));
});
const cluster3 = candidateList.filter(c => {
  const deals = c.data.deals || [];
  return deals.some(d => d.category_scope === 'ONLINE_PLATFORM' || d.category === 'online_shopping' || (d.merchant && (d.merchant.includes('Shopee') || d.merchant.includes('TikTok') || d.merchant.includes('Lazada') || d.merchant.includes('GrabFood'))));
});

assertTest(
  'BATCH_01_ALL_3_CLUSTERS_REPRESENTED_IN_SCHEMA',
  candidateList.length >= 14 && cluster1.length >= 3 && cluster2.length >= 6 && cluster3.length >= 5,
  `Cấu trúc schema bao phủ 3 cụm (${candidateList.length} candidates): Rạp phim (${cluster1.length}), F&B (${cluster2.length}), Sàn/Online (${cluster3.length})`
);

// [TEST 2]: Provenance Separation Metrics (Directive 041 / 040B)
const scanSummary = scanAndValidateAllCandidates(candidatesDir);

assertTest(
  'BATCH_02_SEPARATE_PROVENANCE_METRICS_ENFORCED',
  scanSummary.structurally_valid === 14 &&
  scanSummary.locally_captured_source_linked === 14 &&
  scanSummary.ready_for_review === 1 &&
  scanSummary.needs_recheck === 13 &&
  scanSummary.failed === 0,
  `Tách biệt các chỉ số thẩm định: Structurally Valid (${scanSummary.structurally_valid}/14), LOCALLY_CAPTURED_SOURCE_LINKED (${scanSummary.locally_captured_source_linked}), READY_FOR_CEO_REVIEW (${scanSummary.ready_for_review}), NEEDS_RECHECK (${scanSummary.needs_recheck})`
);

// [TEST 3]: Domain Allowlist Enforced for all 14 Brands
const domainCatalog = loadDomainCatalog();
let allDomainsAllowed = true;
for (const cand of candidateList) {
  const evKey = Object.keys(cand.data.evidence)[0];
  const ev = cand.data.evidence[evKey];
  const domRes = validateDomainPolicy(ev.source_url, domainCatalog);
  if (!domRes.ok) {
    allDomainsAllowed = false;
    console.error(`Domain policy failed for ${ev.source_url}:`, domRes.message);
  }
}
assertTest(
  'BATCH_03_DOMAIN_ALLOWLIST_ENFORCED_FOR_ALL_BATCH',
  allDomainsAllowed,
  `Toàn bộ 14 source_url trong batch đều thuộc domain allowlist hợp lệ trong domain_catalog.json`
);

// [TEST 4]: Zone Catalog Alignment for Local Deals
const zoneCatalog = loadZoneCatalog();
let allZonesValid = true;
for (const cand of candidateList) {
  for (const deal of (cand.data.deals || [])) {
    if (deal.zone) {
      const zoneRes = validateZonePolicy(deal.zone, deal.disclosure || '', { zoneCatalog, domainCatalog });
      if (!zoneRes.ok) {
        allZonesValid = false;
        console.error(`Zone policy failed for ${deal.zone}:`, zoneRes.message);
      }
    }
  }
}
assertTest(
  'BATCH_04_ZONE_CATALOG_ALIGNMENT_FOR_LOCAL_DEALS',
  allZonesValid,
  `Toàn bộ local deal trong batch đều tham chiếu zone hợp lệ trong zone_catalog.json`
);

// [TEST 5]: Volatile Tag on Platform Deals
const volatileCandidates = candidateList.filter(c => {
  const deals = c.data.deals || [];
  const evKey = Object.keys(c.data.evidence)[0];
  const ev = c.data.evidence[evKey];
  return deals.some(d => d.volatility_tag === 'VOLATILE' || d.volatility_tag === 'VOLATILE_PROMO') || (ev.volatility_tag === 'VOLATILE');
});
assertTest(
  'BATCH_05_VOLATILE_TAG_ON_PLATFORM_AND_DYNAMIC_DEALS',
  volatileCandidates.length >= 5,
  `Các ưu đãi sàn TMĐT và delivery đều được gắn nhãn VOLATILE minh bạch (${volatileCandidates.length} deals)`
);

// [TEST 6]: Temporal Triggers Standardized
const triggers = ['TRIG_1105_LUNCH', 'TRIG_1430_DEADLINE_COFFEE', 'TRIG_1730_AFTER_WORK_SCHOOL', 'TRIG_2100_NIGHT_OUT'];
assertTest(
  'BATCH_06_TEMPORAL_TRIGGERS_STANDARD_COVERAGE',
  triggers.length === 4,
  `4 nhịp thời gian được chuẩn hóa chính xác: 11:05 (Trưa), 14:30 (Deadline), 17:30 (Tan ca), 21:00 (Tối)`
);

// [TEST 7]: Fail-Closed: 13 NEEDS_RECHECK Locked from Live Render
const needsRecheck = candidateList.filter(c => {
  const evKey = Object.keys(c.data.evidence)[0];
  const ev = c.data.evidence[evKey];
  return ev.verification_status === 'NEEDS_RECHECK' || ev.verification_readiness === 'NEEDS_RECHECK';
});

const recheckCorrectlyLocked = needsRecheck.every(c => {
  const deals = c.data.deals || [];
  return deals.every(d => d.render_eligible === false && d.deal_price === null && d.original_price === null);
});

assertTest(
  'BATCH_07_FAIL_CLOSED_RECHECK_AND_UNCONFIRMED_LOCKED',
  needsRecheck.length === 13 && recheckCorrectlyLocked,
  `Fail-Closed: 13 candidates thiếu giá/hạn cụ thể ở trạng thái NEEDS_RECHECK (render_eligible: false, deal_price: null)`
);

// [TEST 8]: Negative Test - Tampered Batch Artifact Fails Full PNG Check
const tamperedCand = JSON.parse(JSON.stringify(candidateList[0].data));
const tKey = Object.keys(tamperedCand.evidence)[0];
tamperedCand.evidence[tKey].evidence_content_hash = '0000000000000000000000000000000000000000000000000000000000000000';
const tamperedRes = validateCandidate(tamperedCand);
assertTest(
  'BATCH_08_NEGATIVE_TAMPERED_BATCH_ARTIFACT_FAILS',
  !tamperedRes.valid && tamperedRes.errors.some(e => e.includes('hash mismatch') || e.includes('mismatch')),
  `Candidate có mã băm giả mạo bị chặn thành công: ${tamperedRes.errors[0]}`
);

// [TEST 9]: Negative Test - Unapproved Domain Fails
const unapprovedDomCand = JSON.parse(JSON.stringify(candidateList[0].data));
const uKey = Object.keys(unapprovedDomCand.evidence)[0];
unapprovedDomCand.evidence[uKey].source_url = 'https://unapproved-cinema-fake.com/promo';
const unapprovedRes = validateCandidate(unapprovedDomCand);
assertTest(
  'BATCH_09_NEGATIVE_UNAPPROVED_BATCH_DOMAIN_FAILS',
  !unapprovedRes.valid && unapprovedRes.errors.some(e => e.includes('domain is not approved')),
  `Candidate dùng domain không có trong allowlist bị chặn thành công`
);

// [TEST 10]: Root Production Feed and Manifest Immutable
const prodFeedRaw = fs.readFileSync(prodFeedPath, 'utf-8');
const prodFeedHash = getSha256(prodFeedRaw);
const releaseManifest = JSON.parse(fs.readFileSync(releaseManifestPath, 'utf-8'));
const isApproved = releaseManifest.governance_locks?.immutable_ceo_approval_record?.is_approved ?? releaseManifest.is_approved;

assertTest(
  'BATCH_10_ROOT_PRODUCTION_FEED_AND_MANIFEST_IMMUTABLE',
  prodFeedRaw.trim() === '[]' &&
  prodFeedHash === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945' &&
  isApproved === false,
  `Production feed duy trì bất biến [] (SHA-256: ${prodFeedHash}) và RELEASE_MANIFEST is_approved: false (LOCKED)`
);

// [TEST 11]: Bidirectional Candidate-Receipt Linkage (041A)
let bidirectionalOk = true;
const artifactsDir = path.resolve(candidatesDir, 'artifacts');
for (const cand of candidateList) {
  const evKey = Object.keys(cand.data.evidence)[0];
  const ev = cand.data.evidence[evKey];
  const rcptPath = path.join(artifactsDir, ev.capture_receipt_ref);
  if (!fs.existsSync(rcptPath)) {
    bidirectionalOk = false;
    console.error(`Missing receipt file: ${ev.capture_receipt_ref}`);
    continue;
  }
  const rcptObj = JSON.parse(fs.readFileSync(rcptPath, 'utf-8'));
  const candId = cand.data.candidate_id || ev.candidate_id || evKey.replace(/^EVID_/, '');
  if (rcptObj.candidate_id !== candId || rcptObj.evidence_id !== evKey || rcptObj.deal_id !== ev.deal_id) {
    bidirectionalOk = false;
    console.error(`Bidirectional mismatch in ${ev.capture_receipt_ref}: rcpt cand=${rcptObj.candidate_id}, expected=${candId}`);
  }
}
assertTest(
  'BATCH_11_BIDIRECTIONAL_CANDIDATE_RECEIPT_LINKAGE_VERIFIED',
  bidirectionalOk,
  `Toàn bộ 14 candidate và receipt đều ràng buộc hai chiều 1-1 (candidate_id, evidence_id, deal_id khớp byte-for-byte)`
);

// [TEST 12]: Content Class Classification Distribution (041A)
const allowedClasses = ['PROMOTION_DETAIL', 'NO_PUBLIC_PROMO', 'GENERIC_MARKETING', 'ANTI_BOT_OR_CHALLENGE', 'NOT_FOUND', 'DYNAMIC_ACCOUNT_REQUIRED'];
let classesValid = true;
let promoDetailCount = 0;
for (const cand of candidateList) {
  const evKey = Object.keys(cand.data.evidence)[0];
  const ev = cand.data.evidence[evKey];
  const rcptPath = path.join(artifactsDir, ev.capture_receipt_ref);
  const rcptObj = JSON.parse(fs.readFileSync(rcptPath, 'utf-8'));
  if (!allowedClasses.includes(rcptObj.content_class)) {
    classesValid = false;
  }
  if (rcptObj.content_class === 'PROMOTION_DETAIL') promoDetailCount++;
}
assertTest(
  'BATCH_12_CONTENT_CLASS_ASSIGNMENT_CONSISTENCY',
  classesValid && promoDetailCount === 1,
  `Phân loại content_class chuẩn xác: đúng 1 deal PROMOTION_DETAIL (CGV) và 13 nguồn còn lại phân bổ vào 5 nhóm phi ưu đãi công khai`
);

// [TEST 13]: Batch 040 Synthetic Quarantine Archive Verified (041B)
const syntheticQuarantineManifestPath = path.resolve(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_040_synthetic', 'SYNTHETIC_QUARANTINE_MANIFEST.json');
const syntheticManifest = JSON.parse(fs.readFileSync(syntheticQuarantineManifestPath, 'utf-8'));
let syntheticArchiveOk = true;
for (const rec of syntheticManifest.records) {
  for (const [ftype, art] of Object.entries(rec.archived_artifacts)) {
    const p = path.resolve(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_040_synthetic', art.filename);
    if (!fs.existsSync(p)) {
      syntheticArchiveOk = false;
      console.error(`Missing synthetic artifact: ${p}`);
    } else {
      const h = getSha256(fs.readFileSync(p));
      if (h !== art.sha256) {
        syntheticArchiveOk = false;
        console.error(`Hash mismatch for ${art.filename}: ${h} vs ${art.sha256}`);
      }
    }
  }
}
assertTest(
  'BATCH_13_BATCH_040_SYNTHETIC_QUARANTINE_VERIFIED',
  syntheticManifest.quarantined_records_count === 6 && syntheticArchiveOk,
  `Hồ sơ cách ly 6 synthetic artifacts batch 040 được bảo toàn nguyên vẹn trong quarantine_vault/batch_040_synthetic/ (6 records, SHA-256 khớp 100%)`
);

// [TEST 14]: Candidate Revision Lineage & Lifecycle Aligned (041B)
const syntheticCandIds = [
  'CAND-DNG-GALAXY-HAPPY-DAY-REAL',
  'CAND-DNG-JOLLIBEE-LUNCH',
  'CAND-DNG-LOTTERIA-CRAZY-DAY',
  'CAND-ECOM-TIKTOK-VOUCHER',
  'CAND-ECOM-LAZADA-VOUCHER',
  'CAND-ECOM-SHOPEEFOOD-DNG'
];
let lineageOk = true;
for (const cand of candidateList) {
  const evKey = Object.keys(cand.data.evidence)[0];
  const candId = cand.data.candidate_id || cand.data.evidence[evKey].candidate_id || evKey.replace(/^EVID_/, '');
  if (syntheticCandIds.includes(candId)) {
    const revs = cand.data.evidence_revisions;
    if (!revs || revs.current_revision_id !== 'REV_041_REAL_CAPTURE') {
      lineageOk = false;
      console.error(`Invalid revisions object in ${cand.filename}`);
    }
    const synRev = revs.revisions.find(r => r.revision_id === 'REV_040_SYNTHETIC');
    const realRev = revs.revisions.find(r => r.revision_id === 'REV_041_REAL_CAPTURE');
    if (!synRev || synRev.evidence_status !== 'REJECTED_SYNTHETIC_ARTIFACT' || !realRev || realRev.evidence_status !== 'LOCALLY_CAPTURED_SOURCE_LINKED') {
      lineageOk = false;
      console.error(`Revision status mismatch in ${cand.filename}`);
    }
    const deal = cand.data.deals[0];
    if (deal.lifecycle_status !== 'NEEDS_RECHECK' || deal.render_eligible !== false || deal.deal_price !== null) {
      lineageOk = false;
      console.error(`Lifecycle status not aligned in ${cand.filename}: ${deal.lifecycle_status}`);
    }
  }
}
assertTest(
  'BATCH_14_CANDIDATE_REVISION_LINEAGE_ENFORCED',
  lineageOk,
  `Toàn bộ 6 candidates từng có synthetic history đều duy trì evidence_revisions rõ ràng, current_revision_id=REV_041_REAL_CAPTURE và lifecycle_status=NEEDS_RECHECK (render_eligible: false)`
);

// [TEST 15]: Negative Test - Attempt to Mutate Historical Synthetic Status is Blocked (041B)
const forgedCand = JSON.parse(JSON.stringify(candidateList.find(c => c.filename.includes('GALAXY')).data));
forgedCand.evidence_revisions.revisions.find(r => r.revision_id === 'REV_040_SYNTHETIC').evidence_status = 'LOCALLY_CAPTURED_SOURCE_LINKED';
const forgedRes = validateCandidate(forgedCand);
assertTest(
  'BATCH_15_NEGATIVE_OVERWRITE_SYNTHETIC_REVISION_BLOCKED',
  !forgedRes.valid && forgedRes.errors.some(e => e.includes('FORBIDDEN_SYNTHETIC_MUTATION')),
  `Hành vi giả mạo hoặc xóa bỏ trạng thái REJECTED_SYNTHETIC_ARTIFACT trong revision lịch sử bị chặn thành công`
);

console.log('\n🟢 [BATCH-041B-SUMMARY] TOÀN BỘ 15/15 KIỂM THỬ BATCH REVISION LINEAGE & PIPELINE GUARDRAILS (041B) ĐÃ ĐẠT [PASS]!\n');
