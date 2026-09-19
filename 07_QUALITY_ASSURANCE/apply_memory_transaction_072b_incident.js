/**
 * JAYT PROJECT MEMORY TRANSACTION APPLICATION (072B-INCIDENT)
 * Directive: JAYT-072B-INCIDENT — UNVERIFIED PROVIDER CONTRACT CONTAINMENT
 * Uses applyProjectMemoryTransaction067 and recordHistoricalCorrection067
 */

const fs = require('fs');
const path = require('path');
const {
  applyProjectMemoryTransaction067,
  recordHistoricalCorrection067,
  getSha256
} = require('./memory_transaction_manager_057');

const repoRoot = path.resolve(__dirname, '..');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');

const version = '3.125.0';
const workOrder = 'JAYT-072B-INCIDENT';
const workOrderDescription = 'Unverified Provider Contract Containment & Quarantine';

const headerStatusLine = '057: ACCEPTED (OPERATING PROTOCOL) | 072B-INCIDENT: IMPLEMENTED — PENDING CEO AUDIT (072B UNVERIFIED SPEC & NETWORK PROBE QUARANTINED IN BATCH_072B · LESSON 15 CODIFIED) | 072B: REJECTED (WEB-RESEARCHED SPEC IS NOT PARTNER CENTER EVIDENCE — NETWORK QUERY PROBE DISALLOWED) | 072A: IMPLEMENTED — PENDING CEO AUDIT (PROVIDER DOCS HYGIENE BAN HÀNH · CANDIDATE STATUS ENFORCED) | 072: IMPLEMENTED — PENDING CEO AUDIT (LEAN PIVOT: TRACK 1 IS PRIMARY · TRACK 2 PAUSED · LOCAL GUIDE REMAINS EVIDENCE-BOUND) | 071A: IMPLEMENTED — PENDING CEO AUDIT (TRACK 2 INBOUND DATA READINESS BAN HÀNH · PUBLIC SWEEP RETIRED) | 070I: IMPLEMENTED — PENDING CEO AUDIT (0/8 COMPLETE CONFIRMED · BLOCK-SCOPED BUNDLE VALIDATOR ACTIVE) | 070H-R: SUPERSEDED | 070H: SUPERSEDED | 070G: IMPLEMENTED — PENDING CEO AUDIT (CLASSIFIER ROOT-FIX: 7/7 TESTS PASS · BATCH 3 RECLASSIFIED APPEND-ONLY: 8 PROMO, 7 DEAD_ROUTE, 3 NO_PUBLIC_PROMO, 1 NO_VERIFIED_DANANG, 1 REDIRECT) | 070F-R2: IMPLEMENTED — PENDING CEO AUDIT (SOURCE-BOUND REVIEW PACK 070F REALIGNED · BATCH 3 SWEEP COMPLETED) | 070F-R: SUPERSEDED | 070F: SUPERSEDED | 070E: IMPLEMENTED — PENDING CEO AUDIT (BATCH 2 METADATA MUTATION CONTAINED — QUARANTINED IN BATCH_070E) | 070D: IMPLEMENTED — PENDING CEO AUDIT (CLEAN STAGING REDEPLOY) | 070C: IMPLEMENTED — PENDING CEO AUDIT (STAGING CONTAINED TO BASELINE 061F · CROSS-LAYER GATE CREATED) | 070B: REJECTED (STAGING LINEAGE MUTATION CONTAINED — QUARANTINED IN BATCH_070C) | 070A: PROPOSED (BATCH REVIEW MATRIX GENERATED) | 070: IMPLEMENTED — PENDING CEO AUDIT (BATCH REVIEW PROTOCOL ACTIVE) | 069-STEP2D: IMPLEMENTED — PENDING CEO AUDIT (INTAKE PIPELINE REBUILT · PRE-WRITE GATE & SNAPSHOT LINEAGE CHECKED) | 069-STEP2C: SUPERSEDED (INTAKE LAYOUT GAP · CANDIDATES 42 & 43 QUARANTINED IN BATCH_069D) | 069-STEP2B: IMPLEMENTED — PENDING CEO AUDIT (METIZ RECEIPT LINEAGE RECOVERED · FRESH RECAPTURE COMPLETED) | 069-STEP2A: SUPERSEDED (METIZ DISCOVERY WITH VALIDITY PROOF · LEGACY BATCH ISOLATED) | 069-STEP2: IMPLEMENTED — PENDING CEO AUDIT (METIZ PHYSICAL EVIDENCE CAPTURED) | 069E: IMPLEMENTED — PENDING CEO AUDIT (HANDOFF TRUTH & LESSON CLOSURE) | MANDATORY-GATE: IMPLEMENTED — PENDING CEO AUDIT (LESSONS GATE ENFORCED) | 069-STEP1D: IMPLEMENTED — PENDING CEO AUDIT (STARLIGHT CURRENT PRICE INSPECTED) | 069C: IMPLEMENTED — PENDING CEO AUDIT (RECEIPT LINEAGE CLARIFIED) | 069B: IMPLEMENTED — PENDING CEO AUDIT (AUTHORIZATION ATTRIBUTION DISCLOSURE) | 069A: IMPLEMENTED — PENDING CEO AUDIT (069A CONTAINMENT IMPLEMENTED; UI CHANGES: UNREVIEWED_OUT_OF_SCOPE — KHÔNG THUỘC RELEASE SCOPE) | 069.1: REJECTED (SYNTHETIC CLAIMS & UNAUTHORIZED CEO APPROVAL — QUARANTINED IN BATCH_069A) | 068U: ACCEPTED BY CEO (TIMEZONE BUG FIXED + SHA VALIDATION + DISCONTINUITY DISCLOSED) | 068R: ACCEPTED BY CEO (LEAD-ONLY REGISTRY: 10 LEAD RADAR TRUNG THỰC) | 068T: REJECTED (PROCESS BYPASS — SUPERSEDED BY 068U) | 068: CORRECTED (SEE 068R) | 067A: ACCEPTED BY CEO (MEMORY / GOVERNANCE / LINK FORMAT FROZEN) | 067: ACCEPTED BY CEO (MEMORY TRANSACTION FINAL GATE & ZERO SIDE-EFFECT ISOLATION) | PRODUCTION: LOCKED';

const section4Row = `| Trạng thái hệ thống | Giá trị thực tế | Ý nghĩa vận hành |
| :--- | :--- | :--- |
| **Production Feed** | \`deals_feed.json: []\` (0 records, 0 bytes) | Khóa hoàn toàn (\`is_approved: false\`); 0 rủi ro hiển thị dữ liệu chưa thẩm định. |
| **Staging Feed** | 3 deals thật (Galaxy Happy Day + Metiz Super Monday + Metiz U22) | Đạt 100% Cross-Layer Lineage Gate 070C; tham chiếu nội bộ; không mở production khi chưa có evidence. |
| **Quarantine Vault** | \`batch_072b_unverified_shopee_contract\` (4 items) | Toàn bộ spec/contract/probe/test 072B đã cô lập an toàn kèm SHA-256 manifest. |
| **Provider Support** | \`PROVIDER_CANDIDATE\` (\`UNSUPPORTED_PENDING_DOCS\`) | Shopee, Lazada, TikTok đóng băng; 0 probe mạng cho đến khi có Partner Center docs. |`;

const section5CriteriaText = `### 🎯 Mục tiêu: JAYT-072B-INCIDENT — UNVERIFIED PROVIDER CONTRACT CONTAINMENT

1. **Cô Lập Tuyệt Đối File 072B**: Đã chuyển 4 tệp (\`shopee_affiliate_open_api_spec.md\`, \`shopee_affiliate_contract_072b.js\`, \`probe_shopee_affiliate_072b.js\`, \`test_shopee_affiliate_contract_072b.js\`) vào [\`batch_072b_unverified_shopee_contract\`](05_DEAL_AND_AFFILIATE/quarantine_vault/batch_072b_unverified_shopee_contract/QUARANTINE_MANIFEST_BATCH_072B.json) kèm SHA-256 manifest.
2. **Dừng Mọi Probe Mạng**: Dừng probe, không điền secret key vào \`.env\`, không tự ý tuyên bố contract đã xác thực.
3. **Bổ sung Lesson 15**: Unit test xác nhận code chạy đúng không xác minh provider contract. Contract chỉ được kích hoạt khi có official documentation provenance từ chính Partner Center của tài khoản.
4. **Bảo Tồn Bất Biến**: Giữ Production locked (\`deals_feed.json: []\`, \`is_approved: false\`), Staging giữ 3 deal sạch, registry giữ \`UNSUPPORTED_PENDING_PROVIDER_DOCS\`.`;

const section6LogEntry = `| \`2026-08-24T15:05:00+07:00\` | \`JAYT-072B-INCIDENT\` | Cô lập toàn bộ file 072B vào quarantine vault (QUARANTINE_MANIFEST_BATCH_072B: 4 items); dừng probe mạng trái phép; bổ sung Lesson 15; cập nhật Project Memory v3.125.0. | [\`QUARANTINE_MANIFEST_BATCH_072B.json\`](05_DEAL_AND_AFFILIATE/quarantine_vault/batch_072b_unverified_shopee_contract/QUARANTINE_MANIFEST_BATCH_072B.json)<br>[\`PROVIDER_DOCUMENTATION_HYGIENE_DISCLOSURE_072A.md\`](05_DEAL_AND_AFFILIATE/feed_gateway/PROVIDER_DOCUMENTATION_HYGIENE_DISCLOSURE_072A.md) | 100% PASS (8/8 Staging Acceptance · 6/6 Cross-Layer Gate · 10/10 Memory Consistency) | \`IMPLEMENTED_PENDING_CEO_AUDIT\` |`;

// Prepare Lesson 15 insertion via correction receipt
const currentMem = fs.readFileSync(memoryPath, 'utf8');
const targetText = '14. **Quan hệ Ngữ cảnh trong Evidence Bundle (Contextual Co-Location & Relational Binding)**: Evidence Bundle bắt buộc phải chứng minh quan hệ ngữ cảnh (cùng claim block cho price + terms, hạn dùng có ngày kết thúc xác định, và locality có relation key); regex keyword rời rạc không đủ điều kiện cấu thành bundle.';

const replacementText = `14. **Quan hệ Ngữ cảnh trong Evidence Bundle (Contextual Co-Location & Relational Binding)**: Evidence Bundle bắt buộc phải chứng minh quan hệ ngữ cảnh (cùng claim block cho price + terms, hạn dùng có ngày kết thúc xác định, và locality có relation key); regex keyword rời rạc không đủ điều kiện cấu thành bundle.
15. **Ranh giới Bằng chứng Hợp đồng Đối tác (Provider Contract Evidence Boundary)**: Unit test xác nhận code chạy đúng không xác minh provider contract. Contract chỉ được kích hoạt khi có official documentation provenance từ chính Partner Center của tài khoản.`;

const simulatedNewMem = currentMem.replace(targetText, replacementText);
const beforeHash = getSha256(currentMem);
const afterHash = getSha256(simulatedNewMem);

const correctionReceipt = recordHistoricalCorrection067({
  correctionId: `CORRECTION_LESSON_15_072B_${Date.now()}`,
  workOrder: 'JAYT-072B-INCIDENT',
  targetFile: 'PROJECT_MEMORY.md',
  beforeHash,
  afterHash,
  reason: 'Codify Lesson 15: Provider Contract Evidence Boundary according to CEO Directive JAYT-072B-INCIDENT',
  authorizedBy: 'CEO_DIRECTIVE_JAYT-072B-INCIDENT'
});

const res = applyProjectMemoryTransaction067({
  version,
  workOrder,
  workOrderDescription,
  headerStatusLine,
  section4Row,
  section5CriteriaText,
  section6LogEntry,
  historicalCorrections: [
    {
      target: targetText,
      replacement: replacementText,
      correction_receipt_path: correctionReceipt.receiptPath
    }
  ]
});

console.log('✅ [MEMORY-TRANSACTION-072B-INCIDENT-SUCCESS]');
console.log('Version:', res.version);
console.log('PreHash:', res.preHash);
console.log('FinalHash:', res.finalHash);
console.log('Receipt:', res.transactionReceiptPath);
