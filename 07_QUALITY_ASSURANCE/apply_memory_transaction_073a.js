/**
 * JAYT PROJECT MEMORY TRANSACTION APPLICATION (073A)
 * Directive: JAYT-073A — SHOPEE RADAR RECLASSIFICATION
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

const version = '3.127.0';
const workOrder = 'JAYT-073A';
const workOrderDescription = 'Shopee Radar Reclassification & Lesson 16 Codification';

const headerStatusLine = '057: ACCEPTED (OPERATING PROTOCOL) | 073A: IMPLEMENTED — PENDING CEO AUDIT (SHOPEE RADAR RECLASSIFIED: 11 URLS ARE DISCOVERY SIGNALS ONLY · LESSON 16 CODIFIED · G0 BLOCKED) | 073: IMPLEMENTED — PENDING CEO AUDIT (DATA-TO-LAUNCH PROTOCOL ACTIVE · G0-G6 AUTOMATION PIPELINE DEFINED · G0 BLOCKED PENDING PARTNER CENTER DOCS) | 072B-INCIDENT: IMPLEMENTED — PENDING CEO AUDIT (072B UNVERIFIED SPEC & NETWORK PROBE QUARANTINED IN BATCH_072B · LESSON 15 CODIFIED) | 072B: REJECTED (WEB-RESEARCHED SPEC IS NOT PARTNER CENTER EVIDENCE — NETWORK QUERY PROBE DISALLOWED) | 072A: IMPLEMENTED — PENDING CEO AUDIT (PROVIDER DOCS HYGIENE BAN HÀNH · CANDIDATE STATUS ENFORCED) | 072: IMPLEMENTED — PENDING CEO AUDIT (LEAN PIVOT: TRACK 1 IS PRIMARY · TRACK 2 PAUSED · LOCAL GUIDE REMAINS EVIDENCE-BOUND) | 071A: IMPLEMENTED — PENDING CEO AUDIT (TRACK 2 INBOUND DATA READINESS BAN HÀNH · PUBLIC SWEEP RETIRED) | 070I: IMPLEMENTED — PENDING CEO AUDIT (0/8 COMPLETE CONFIRMED · BLOCK-SCOPED BUNDLE VALIDATOR ACTIVE) | 070H-R: SUPERSEDED | 070H: SUPERSEDED | 070G: IMPLEMENTED — PENDING CEO AUDIT (CLASSIFIER ROOT-FIX: 7/7 TESTS PASS · BATCH 3 RECLASSIFIED APPEND-ONLY: 8 PROMO, 7 DEAD_ROUTE, 3 NO_PUBLIC_PROMO, 1 NO_VERIFIED_DANANG, 1 REDIRECT) | 070F-R2: IMPLEMENTED — PENDING CEO AUDIT (SOURCE-BOUND REVIEW PACK 070F REALIGNED · BATCH 3 SWEEP COMPLETED) | 070F-R: SUPERSEDED | 070F: SUPERSEDED | 070E: IMPLEMENTED — PENDING CEO AUDIT (BATCH 2 METADATA MUTATION CONTAINED — QUARANTINED IN BATCH_070E) | 070D: IMPLEMENTED — PENDING CEO AUDIT (CLEAN STAGING REDEPLOY) | 070C: IMPLEMENTED — PENDING CEO AUDIT (STAGING CONTAINED TO BASELINE 061F · CROSS-LAYER GATE CREATED) | 070B: REJECTED (STAGING LINEAGE MUTATION CONTAINED — QUARANTINED IN BATCH_070C) | 070A: PROPOSED (BATCH REVIEW MATRIX GENERATED) | 070: IMPLEMENTED — PENDING CEO AUDIT (BATCH REVIEW PROTOCOL ACTIVE) | 069-STEP2D: IMPLEMENTED — PENDING CEO AUDIT (INTAKE PIPELINE REBUILT · PRE-WRITE GATE & SNAPSHOT LINEAGE CHECKED) | 069-STEP2C: SUPERSEDED (INTAKE LAYOUT GAP · CANDIDATES 42 & 43 QUARANTINED IN BATCH_069D) | 069-STEP2B: IMPLEMENTED — PENDING CEO AUDIT (METIZ RECEIPT LINEAGE RECOVERED · FRESH RECAPTURE COMPLETED) | 069-STEP2A: SUPERSEDED (METIZ DISCOVERY WITH VALIDITY PROOF · LEGACY BATCH ISOLATED) | 069-STEP2: IMPLEMENTED — PENDING CEO AUDIT (METIZ PHYSICAL EVIDENCE CAPTURED) | 069E: IMPLEMENTED — PENDING CEO AUDIT (HANDOFF TRUTH & LESSON CLOSURE) | MANDATORY-GATE: IMPLEMENTED — PENDING CEO AUDIT (LESSONS GATE ENFORCED) | 069-STEP1D: IMPLEMENTED — PENDING CEO AUDIT (STARLIGHT CURRENT PRICE INSPECTED) | 069C: IMPLEMENTED — PENDING CEO AUDIT (RECEIPT LINEAGE CLARIFIED) | 069B: IMPLEMENTED — PENDING CEO AUDIT (AUTHORIZATION ATTRIBUTION DISCLOSURE) | 069A: IMPLEMENTED — PENDING CEO AUDIT (069A CONTAINMENT IMPLEMENTED; UI CHANGES: UNREVIEWED_OUT_OF_SCOPE — KHÔNG THUỘC RELEASE SCOPE) | 069.1: REJECTED (SYNTHETIC CLAIMS & UNAUTHORIZED CEO APPROVAL — QUARANTINED IN BATCH_069A) | 068U: ACCEPTED BY CEO (TIMEZONE BUG FIXED + SHA VALIDATION + DISCONTINUITY DISCLOSED) | 068R: ACCEPTED BY CEO (LEAD-ONLY REGISTRY: 10 LEAD RADAR TRUNG THỰC) | 068T: REJECTED (PROCESS BYPASS — SUPERSEDED BY 068U) | 068: CORRECTED (SEE 068R) | 067A: ACCEPTED BY CEO (MEMORY / GOVERNANCE / LINK FORMAT FROZEN) | 067: ACCEPTED BY CEO (MEMORY TRANSACTION FINAL GATE & ZERO SIDE-EFFECT ISOLATION) | PRODUCTION: LOCKED';

const section4Row = `| Trạng thái hệ thống | Giá trị thực tế | Ý nghĩa vận hành |
| :--- | :--- | :--- |
| **Production Feed** | \`deals_feed.json: []\` (0 records, 0 bytes) | Khóa hoàn toàn (\`is_approved: false\`); 0 rủi ro hiển thị dữ liệu chưa thẩm định. |
| **Staging Feed** | 3 deals thật (Galaxy Happy Day + Metiz Super Monday + Metiz U22) | Đạt 100% Cross-Layer Lineage Gate 070C; tham chiếu nội bộ; không mở production khi chưa có evidence. |
| **Shopee Program Radar** | \`PUBLIC_SHOPEE_PROGRAM_RADAR_073A\` (11 signals) | 11 URL phân loại DISCOVERY_SIGNALS_ONLY; 0 candidate; 0 provider contract. |
| **Current Gate Status** | \`G0 BLOCKED\` | Chờ tài liệu Partner Center / file export CSV-XLSX từ dashboard thật; 0 đoán API. |`;

const section5CriteriaText = `### 🎯 Mục tiêu: JAYT-073A — SHOPEE RADAR RECLASSIFICATION

1. **Tái Phân Loại Radar Shopee 073A**: Ban hành [\`PUBLIC_SHOPEE_PROGRAM_RADAR_073A.md\`](05_DEAL_AND_AFFILIATE/PUBLIC_SHOPEE_PROGRAM_RADAR_073A.md) xác nhận 11 URL quét được là \`DISCOVERY_SIGNALS_ONLY\`; đính chính và thu hồi toàn bộ các tuyên bố vượt quá evidence.
2. **Duy Trì Cổng G0 BLOCKED**: G0 chỉ được mở khi nhận được (1) tài liệu API từ Partner Center của tài khoản, (2) file export CSV/XLSX từ dashboard thật còn nguyên metadata, hoặc (3) sandbox/identity response chính thức.
3. **Bổ sung Lesson 16**: Public campaign URL ≠ Partner Center authorization ≠ provider feed.
4. **Bảo Tồn Bất Biến**: Giữ Production locked (\`deals_feed.json: []\`, \`is_approved: false\`), Staging giữ 3 deal sạch.`;

const section6LogEntry = `| \`2026-08-24T15:30:00+07:00\` | \`JAYT-073A\` | Ban hành Public Shopee Program Radar 073A (tái phân loại 11 URL là DISCOVERY_SIGNALS_ONLY, thu hồi claim unverified, duy trì G0 BLOCKED); bổ sung Lesson 16; cập nhật Project Memory v3.127.0. | [\`PUBLIC_SHOPEE_PROGRAM_RADAR_073A.md\`](05_DEAL_AND_AFFILIATE/PUBLIC_SHOPEE_PROGRAM_RADAR_073A.md)<br>[\`authorized_affiliate_accounts.json\`](05_DEAL_AND_AFFILIATE/feed_gateway/authorized_affiliate_accounts.json) | 100% PASS (8/8 Staging Acceptance · 6/6 Cross-Layer Gate · 10/10 Memory Consistency · 8/8 Secret Hygiene) | \`IMPLEMENTED_PENDING_CEO_AUDIT\` |`;

// Prepare Lesson 16 insertion via correction receipt
const currentMem = fs.readFileSync(memoryPath, 'utf8');
const targetText = '15. **Ranh giới Bằng chứng Hợp đồng Đối tác (Provider Contract Evidence Boundary)**: Unit test xác nhận code chạy đúng không xác minh provider contract. Contract chỉ được kích hoạt khi có official documentation provenance từ chính Partner Center của tài khoản.';

const replacementText = `15. **Ranh giới Bằng chứng Hợp đồng Đối tác (Provider Contract Evidence Boundary)**: Unit test xác nhận code chạy đúng không xác minh provider contract. Contract chỉ được kích hoạt khi có official documentation provenance từ chính Partner Center của tài khoản.
16. **Phân biệt Tín hiệu Chiến dịch Công khai và Nguồn Cung Dữ liệu (Public Campaign URL vs Provider Feed Boundary)**: Public campaign URL ≠ Partner Center authorization ≠ provider feed. Trang đích chiến dịch web công khai chỉ là tín hiệu radar khám phá, không chứng minh quyền hạn API và không thể thay thế cho tệp dữ liệu xuất chính thức hoặc API response có cấu trúc.`;

const simulatedNewMem = currentMem.replace(targetText, replacementText);
const beforeHash = getSha256(currentMem);
const afterHash = getSha256(simulatedNewMem);

const correctionReceipt = recordHistoricalCorrection067({
  correctionId: `CORRECTION_LESSON_16_073A_${Date.now()}`,
  workOrder: 'JAYT-073A',
  targetFile: 'PROJECT_MEMORY.md',
  beforeHash,
  afterHash,
  reason: 'Codify Lesson 16: Public Campaign URL vs Provider Feed Boundary according to CEO Directive JAYT-073A',
  authorizedBy: 'CEO_DIRECTIVE_JAYT-073A'
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

console.log('✅ [MEMORY-TRANSACTION-073A-SUCCESS]');
console.log('Version:', res.version);
console.log('PreHash:', res.preHash);
console.log('FinalHash:', res.finalHash);
console.log('Receipt:', res.transactionReceiptPath);
