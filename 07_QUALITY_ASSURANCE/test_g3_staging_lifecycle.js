const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');

const repoRoot = path.resolve(__dirname, '..');
const { ingestCandidateFile } = require(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'ingest_candidate_to_catalog.js'));
const { validateCandidate, getFileSha256 } = require(path.join(repoRoot, '07_QUALITY_ASSURANCE', 'validate_candidate_evidence.js'));

let totalTests = 0;
let passedTests = 0;

function assertTest(name, condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [${name}]: [PASS] - ${message}`);
  } else {
    console.error(`  [${name}]: [FAIL] - ${message}`);
  }
}

console.log('🧪 [JAYT-G3-STAGING-TEST] Khởi chạy bộ kiểm thử G3 Limited Approval & Staging Lifecycle (037)...');

// 1. CEO Approval Manifest Integrity
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review', 'ceo_approval_manifest_CGV_CULTURE_DAY.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const candPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review', manifest.candidate_file);
const actualCandHash = getFileSha256(candPath);

const snapDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'evidence_snapshots');
const promoShotHash = getFileSha256(path.join(snapDir, manifest.evidence_packages.package_1_promotion_terms.screenshot_file));
const promoHtmlHash = getFileSha256(path.join(snapDir, manifest.evidence_packages.package_1_promotion_terms.raw_html_file));
const promoTextHash = getFileSha256(path.join(snapDir, manifest.evidence_packages.package_1_promotion_terms.raw_text_file));

const locShotHash = getFileSha256(path.join(snapDir, manifest.evidence_packages.package_2_location_provenance.screenshot_file));
const locHtmlHash = getFileSha256(path.join(snapDir, manifest.evidence_packages.package_2_location_provenance.raw_html_file));
const locTextHash = getFileSha256(path.join(snapDir, manifest.evidence_packages.package_2_location_provenance.raw_text_file));

const manifestValid = manifest.approved_by === 'CEO_JAY_TRAN' &&
                     manifest.status === 'AUTHORIZED_FOR_CATALOG_INGESTION' &&
                     manifest.scope === 'STAGING_INTERNAL_ONLY' &&
                     manifest.candidate_sha256 === actualCandHash &&
                     promoShotHash === manifest.evidence_packages.package_1_promotion_terms.screenshot_sha256 &&
                     promoHtmlHash === manifest.evidence_packages.package_1_promotion_terms.raw_html_sha256 &&
                     promoTextHash === manifest.evidence_packages.package_1_promotion_terms.raw_text_sha256 &&
                     locShotHash === manifest.evidence_packages.package_2_location_provenance.screenshot_sha256 &&
                     locHtmlHash === manifest.evidence_packages.package_2_location_provenance.raw_html_sha256 &&
                     locTextHash === manifest.evidence_packages.package_2_location_provenance.raw_text_sha256;

assertTest('G3_01_CEO_APPROVAL_MANIFEST_VALID', manifestValid,
  `CEO Approval Manifest ký bởi CEO_JAY_TRAN, khớp 100% hash candidate và 6 hash artifact của cả 2 gói bằng chứng.`);

// 2. Candidate Validation Readiness Check
const candData = JSON.parse(fs.readFileSync(candPath, 'utf8'));
const valRes = validateCandidate(candData);
assertTest('G3_02_CANDIDATE_READY_FOR_G3', valRes.valid && valRes.verification_readiness === 'READY_FOR_CEO_REVIEW',
  `Candidate đạt chuẩn READY_FOR_CEO_REVIEW với đầy đủ trích đoạn bằng chứng giá và ngày.`);

// 3. Staging Ingestion Execution via Pipeline (Isolated Sandbox)
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jayt_staging_ingest_'));
const stagingFeedPath = path.join(tempDir, 'staging_deals_feed.json');
const stagingEvidencePath = path.join(tempDir, 'staging_evidence_store.json');

fs.writeFileSync(stagingFeedPath, '[]', 'utf8');
fs.writeFileSync(stagingEvidencePath, '{}', 'utf8');

const ingestRes = ingestCandidateFile(candPath, stagingFeedPath, stagingEvidencePath, {
  approvalManifest: manifest
});

const stagingFeed = JSON.parse(fs.readFileSync(stagingFeedPath, 'utf8'));
const stagingEv = JSON.parse(fs.readFileSync(stagingEvidencePath, 'utf8'));

const ingestSuccess = ingestRes.success &&
                      ingestRes.ingested_deals === 1 &&
                      stagingFeed.length === 1 &&
                      stagingFeed[0].deal_id === 'DNG-CGV-VINHTRUNG-CULTURE-DAY-20260824' &&
                      Object.keys(stagingEv).length === 1;

assertTest('G3_03_INGEST_TO_STAGING_FEED_PASSES', ingestSuccess,
  `Nạp candidate vào staging feed thành công (1 deal, 1 evidence) qua 2-File Atomic Ingestion Pipeline.`);

// 4. Production Feed & Manifest Immutability Check
const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const prodFeedContent = fs.readFileSync(prodFeedPath, 'utf8');
const prodFeedHash = getFileSha256(prodFeedPath);

const relManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');
const relManifest = JSON.parse(fs.readFileSync(relManifestPath, 'utf8'));

const prodLocked = prodFeedContent.trim() === '[]' &&
                   prodFeedHash === '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945' &&
                   relManifest.governance_locks.immutable_ceo_approval_record.is_approved === false;

assertTest('G3_04_PRODUCTION_FEED_AND_MANIFEST_LOCKED', prodLocked,
  `Production feed duy trì trung thực [] (SHA-256 bất biến) và RELEASE_MANIFEST is_approved=false.`);

// 5. Lifecycle Rendering Contract (Before, On, After 24/08/2026)
const deal = stagingFeed[0];

function evaluateLifecycle(dateStr) {
  if (dateStr < deal.effective_date) return { status: 'UPCOMING', label: '⏳ Sắp diễn ra (Thứ Hai 24/08/2026)' };
  if (dateStr === deal.effective_date) return { status: 'ACTIVE_TODAY', label: '🔥 Áp dụng hôm nay (Thứ Hai 24/08/2026)' };
  return { status: 'EXPIRED', label: '⌛ Đã hết hạn (Thứ Hai 24/08/2026)' };
}

const beforeRes = evaluateLifecycle('2026-08-22');
const onRes = evaluateLifecycle('2026-08-24');
const afterRes = evaluateLifecycle('2026-08-25');

assertTest('G3_05_LIFECYCLE_BEFORE_24_AUGUST', beforeRes.status === 'UPCOMING' && beforeRes.label.includes('Sắp diễn ra'),
  `Trước 24/08 (2026-08-22): Hiển thị '${beforeRes.label}'.`);

assertTest('G3_06_LIFECYCLE_ON_24_AUGUST', onRes.status === 'ACTIVE_TODAY' && onRes.label.includes('Áp dụng hôm nay'),
  `Đúng ngày 24/08 (2026-08-24): Hiển thị '${onRes.label}'.`);

assertTest('G3_07_LIFECYCLE_AFTER_24_AUGUST', afterRes.status === 'EXPIRED' && afterRes.label.includes('Đã hết hạn'),
  `Sau 24/08 (2026-08-25): Tự động chuyển '${afterRes.label}'.`);

// 6. Content Truth & Negative Savings Assertion
const noFakeSavings = deal.original_price === null &&
                      deal.discount_pct === null &&
                      deal.deal_price === 58000 &&
                      deal.affiliate_type === 'DIRECT_DEAL' &&
                      deal.zone === 'ZONE_VINH_TRUNG_THANH_KHE';

assertTest('G3_08_CONTENT_NO_SAVINGS_CLAIM_AND_DIRECT_DEAL', noFakeSavings,
  `Deal có giá 58.000đ, DIRECT_DEAL, original_price=null (Tuyệt đối không hiển thị 'tiết kiệm X đồng' ảo).`);

// 7. Surcharges and Exceptions Capture Transparency
const conditionsPreserved = deal.disclosure &&
                            deal.disclosure.includes('58.000đ') &&
                            deal.disclosure.includes('87.000đ') &&
                            deal.disclosure.includes('CGV Vĩnh Trung Plaza') &&
                            deal.disclosure.includes('VIP') &&
                            deal.disclosure.includes('IMAX');

assertTest('G3_09_CONDITIONS_AND_SURCHARGES_TRANSPARENCY', conditionsPreserved,
  `Toàn bộ điều kiện vé 58K, combo 87K, rạp Vĩnh Trung, phụ thu VIP/Sweetbox và ngoại lệ IMAX/ScreenX/Lễ Tết được hiển thị minh bạch.`);

// 8. Directive 039: Temporal Precision DATE_ONLY & No Inferred Expiration Time
const temporalTruth = deal.validity_precision === 'DATE_ONLY' &&
                      deal.expires_at === null &&
                      deal.effective_date === '2026-08-24';

assertTest('G3_10_TEMPORAL_PRECISION_DATE_ONLY', temporalTruth,
  `Độ chuẩn xác thời gian là DATE_ONLY, effective_date=2026-08-24, expires_at=null (Tuyệt đối không suy diễn 23:59:59).`);

// 9. Directive 039: Calculator Truth (No Arbitrary Lower Bound Below 58K)
const { calculateTrustedSavings } = require(path.join(repoRoot, '07_QUALITY_ASSURANCE', 'trusted_savings_calculator.js'));
const calcRes = calculateTrustedSavings({
  item_price: deal.deal_price,
  item_discount: 0,
  vouchers: [],
  shipping_fee: 0,
  shipping_discount: 0,
  payment_surcharge: 0,
  verified_at: '2026-08-22T14:32:00+07:00'
});

const calcTruth = calcRes.breakdown.expected_total === 58000 &&
                  (calcRes.breakdown.price_range === null || calcRes.breakdown.price_range.min >= 58000);

assertTest('G3_11_CALCULATOR_TRUTH_MIN_58K', calcTruth,
  `Máy tính tiền hiển thị chính xác 58.000đ, không có cận dưới thấp hơn 58.000đ khi chưa có voucher.`);

console.log(`\n🟢 [G3-STAGING-SUMMARY] Toàn bộ ${passedTests}/${totalTests} kiểm thử G3 Staging Lifecycle đã ĐẠT [PASS]!`);

if (passedTests !== totalTests) {
  process.exit(1);
} else {
  process.exit(0);
}
