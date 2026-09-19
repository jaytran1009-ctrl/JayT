/**
 * JAYT PROJECT MEMORY TRANSACTION: MANDATORY GATE & RECONCILIATION
 * Directive: JAYT-CONTEXT-AND-LESSONS-MANDATORY-GATE
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {
  applyProjectMemoryTransaction067,
  recordHistoricalCorrection067
} = require('./memory_transaction_manager_057');

const repoRoot = path.resolve(__dirname, '..');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');

function getSha(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

const currentMemorySha = getSha(memoryPath);

// 1. Create Append-Only Correction Receipt

const corrResult = recordHistoricalCorrection067({
  correctionId: '069D_STARLIGHT_EVIDENCE_RECONCILIATION',
  workOrder: 'JAYT-CONTEXT-AND-LESSONS-MANDATORY-GATE',
  targetFile: 'PROJECT_MEMORY.md',
  beforeHash: currentMemorySha,
  afterHash: currentMemorySha,
  reason: 'EVIDENCE RECONCILIATION & STATUS DOWNGRADE: (1) Đối soát toàn diện 30 artifacts vật lý thuộc 10 receipts thu thập (Starlight, Lotteria, Phê La, Booking Flow); 100% khớp byte-for-byte và SHA-256 với tệp JSON Receipt trên đĩa. (2) Khảo sát thực tế luồng đặt vé Starlight Đà Nẵng (46 Điện Biên Phủ) cho thấy rạp có lịch chiếu thật. Tuy nhiên, ưu đãi U22 (45k) và Thứ 3 Phim Việt (45k) theo thể lệ là chương trình áp dụng tại quầy (không áp dụng tự động trên phiên đặt vé web công khai nặc danh). Do đó, Starlight Cinema chưa đủ điều kiện tạo Candidate hay Staging Deal và được hạ/duy trì trạng thái ở mức LEAD_ONLY_NO_CLAIM (NEEDS_RECHECK). (3) Bảo toàn nguyên vẹn Staging baseline 061F (1 deal Galaxy Happy Day, 1 cụm, 1 ngày), hàng đợi candidate 13 hồ sơ lịch sử NEEDS_RECHECK, 0 candidate mới, production feed deals_feed.json duy trì [] và is_approved: false.',
  authorizedBy: 'AGENT_EVIDENCE_RECONCILIATION'
});

const relativeCorrPath = path.relative(repoRoot, corrResult.receiptPath).replace(/\\/g, '/');

// 2. Prepare Section 4 Row
const section4Content = [
  '| **`JAYT-CONTEXT-AND-LESSONS-MANDATORY-GATE`** ',
  '| **IMPLEMENTED — PENDING CEO AUDIT (MANDATORY LESSONS GATE ENFORCED · 069D RECONCILED)** ',
  '| - **Quy Trình Bắt Buộc 3 Khâu**: Trước khi làm (nạp Memory + Lessons + xác định ranh giới/cấm đoán); Trong khi làm (chỉ dùng dữ kiện/hash đọc từ đĩa, cấm tự nhận 5/5, cấm tự tạo candidate/staging/CEO receipt); Sau khi làm (ghi register append-only, transaction Memory, chạy test và bàn giao 5 điểm).<br>',
  '- **Đối Soát Minh Bạch 069D**: Ban hành `' + path.basename(corrResult.receiptPath) + '` đối soát 100% (30/30) artifacts vật lý khớp byte-for-byte với file JSON receipt trên đĩa.<br>',
  '- **Hạ Trạng Thái Starlight**: Do ưu đãi U22 (45k) và Thứ 3 Phim Việt (45k) áp dụng tại quầy và chưa hiển thị giá chiết khấu trên phiên web nặc danh, Starlight Cinema chính thức duy trì ở **`LEAD_ONLY_NO_CLAIM` (NEEDS_RECHECK)**.<br>',
  '- **Bảo Toàn Bất Biến**: Tiến độ Go-Live thực tế bảo toàn `1/10 staging deal`, `1/3 cụm`, `1/5 ngày`; production feed duy trì `[]` (`is_approved: false`). |'
].join('');

// 3. Prepare Section 5 Text
const section5Text = [
  '**Work Order**: `JAYT-CONTEXT-AND-LESSONS-MANDATORY-GATE` (Mandatory Context, Lessons Gate & Evidence Reconciliation)  \n',
  '**Mục tiêu chiến lược**: Thiết lập quy tắc điều hành bắt buộc 3 khâu (Trước/Trong/Sau), thực hiện đối soát vật lý 30/30 artifacts receipt 069D, và hạ trạng thái Starlight xuống `LEAD_ONLY_NO_CLAIM` per strict anti-hallucination.\n\n',
  '### 1. Cam Kết Quy Trình Điều Hành Bắt Buộc (Mandatory Gate Contract)\n',
  '- **Trước khi làm**: Luôn nạp `PROJECT_MEMORY.md`, `LESSONS_LEARNED_REGISTER.md` và `lessons_learned_registry.json`; nêu rõ phạm vi, điều cấm và production lock.\n',
  '- **Trong khi làm**: Chỉ dùng dữ kiện/SHA-256 đọc trực tiếp từ đĩa; cấm tự tạo candidate, staging deploy hay CEO receipt.\n',
  '- **Sau khi làm**: Ban hành receipt/correction append-only, cập nhật transaction qua `applyProjectMemoryTransaction067`, chạy test suites.\n\n',
  '### 2. Hồ Sơ Đối Soát Bằng Chứng 069D (Reconciliation & Correction)\n',
  '- **Correction Receipt**: [`' + path.basename(corrResult.receiptPath) + '`](' + relativeCorrPath + ').\n',
  '- **Kết quả Thẩm định**: Starlight Cinema duy trì **`LEAD_ONLY_NO_CLAIM` (NEEDS_RECHECK)** do thiếu chứng minh giá hiện hành trong giỏ hàng web.\n',
  '- **Tiến độ Hệ thống**: 1/10 staging deal (Galaxy baseline 061F), 0 new candidates, production locked `[]` (`is_approved: false`).\n'
].join('');

// 4. Prepare Section 6 Text
const section6Text = [
  '### Giao dịch MANDATORY-GATE: Quy Trình Bắt Buộc & Đối Soát 069D (`JAYT-CONTEXT-AND-LESSONS-MANDATORY-GATE`)\n',
  '- **Ngày thực hiện**: `2026-08-24T13:08:50+07:00`\n',
  '- **Thực hiện**: Antigravity Operational Protocol Controller.\n',
  '- **Lineage & State**: Đã ban hành correction receipt `' + path.basename(corrResult.receiptPath) + '`; 30/30 artifact checks verified.\n',
  '- **Trạng thái**: Tiến độ Go-Live thực tế `1/10 staging deal`, `1/3 cụm`, `1/5 ngày`; production locked `[]` (`is_approved: false`).\n'
].join('');

const headerStatus = '057: ACCEPTED (OPERATING PROTOCOL) | MANDATORY-GATE: IMPLEMENTED — PENDING CEO AUDIT (LESSONS GATE ENFORCED · 069D RECONCILED) | 069-STEP1D: IMPLEMENTED — PENDING CEO AUDIT (STARLIGHT CURRENT PRICE INSPECTED) | 069C: IMPLEMENTED — PENDING CEO AUDIT (RECEIPT LINEAGE CLARIFIED) | 069B: IMPLEMENTED — PENDING CEO AUDIT (AUTHORIZATION ATTRIBUTION DISCLOSURE) | 069A: IMPLEMENTED — PENDING CEO AUDIT (069A CONTAINMENT IMPLEMENTED; UI CHANGES: UNREVIEWED_OUT_OF_SCOPE — KHÔNG THUỘC RELEASE SCOPE) | 069.1: REJECTED (SYNTHETIC CLAIMS & UNAUTHORIZED CEO APPROVAL — QUARANTINED IN BATCH_069A) | 068U: ACCEPTED BY CEO (TIMEZONE BUG FIXED + SHA VALIDATION + DISCONTINUITY DISCLOSED) | 068R: ACCEPTED BY CEO (LEAD-ONLY REGISTRY: 10 LEAD RADAR TRUNG THỰC) | 068T: REJECTED (PROCESS BYPASS — SUPERSEDED BY 068U) | 068: CORRECTED (SEE 068R) | 067A: ACCEPTED BY CEO (MEMORY / GOVERNANCE / LINK FORMAT FROZEN) | 067: ACCEPTED BY CEO (MEMORY TRANSACTION FINAL GATE & ZERO SIDE-EFFECT ISOLATION) | PRODUCTION: LOCKED';

console.log('🔄 Đang áp dụng Memory Transaction JAYT-CONTEXT-AND-LESSONS-MANDATORY-GATE...');
const txResult = applyProjectMemoryTransaction067({
  version: '3.103.0',
  workOrder: 'JAYT-CONTEXT-AND-LESSONS-MANDATORY-GATE',
  workOrderDescription: 'Quy Trình Điều Hành Bắt Buộc & Đối Soát Bằng Chứng 069D',
  headerStatusLine: headerStatus,
  section4Row: section4Content,
  section5CriteriaText: section5Text,
  section6LogEntry: section6Text,
  historicalCorrections: [
    {
      target: '069D Starlight Evidence Reconciliation',
      correction_receipt_path: relativeCorrPath
    }
  ]
});

console.log('✅ Giao dịch MANDATORY-GATE thành công:');
console.log(`  New Version: ${txResult.version}`);
