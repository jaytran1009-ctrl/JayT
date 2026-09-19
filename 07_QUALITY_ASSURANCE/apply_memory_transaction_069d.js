/**
 * JAYT PROJECT MEMORY TRANSACTION RUNNER: 069-STEP1D STARLIGHT PRICE CONFIRMATION
 * Directive: JAYT-069-STEP1D — STARLIGHT CURRENT-PRICE CONFIRMATION
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {
  applyProjectMemoryTransaction067
} = require('./memory_transaction_manager_057');

const repoRoot = path.resolve(__dirname, '..');
const memoryPath = path.join(repoRoot, 'PROJECT_MEMORY.md');

// 1. Prepare Section 4 Row
const section4Content = [
  '| **`JAYT-069-STEP1D-STARLIGHT-PRICE-CONFIRMATION`** ',
  '| **IMPLEMENTED — PENDING CEO AUDIT (STARLIGHT CURRENT PRICE & BOOKING FLOW INSPECTED)** ',
  '| - **Khảo sát Luồng Đặt Vé Live CDP**: Đã thực hiện live browser capture trên luồng đặt vé chính thức của Starlight Cinema (`lich-chieu.html`, `dat-ve.html`) qua Chrome CDP, không đăng nhập, không CAPTCHA bypass.<br>',
  '- **Kết quả Thẩm định Giá Thực Tế**: Rạp Starlight Đà Nẵng tại 46 Điện Biên Phủ đang vận hành lịch chiếu thật (bao gồm phim Việt *"Nghỉ Hè Sợ Nghỉ Hưu"*). Về mặt chính sách: Ưu đãi U22 (45k T2-T5) được quy định rõ trong thể lệ là *"áp dụng khi mua tại quầy, không áp dụng thanh toán online"*; ưu đãi Thứ 3 Phim Việt (45k) áp dụng mọi đối tượng tại quầy/lịch chiếu. Phiên đặt vé online công khai hiển thị giá gốc trước khi xác thực quầy/thành viên.<br>',
  '- **Kỷ luật Giữ Trạng Thái**: Tuân thủ nguyên tắc không suy diễn, Starlight tiếp tục được giữ ở **`LEAD_ONLY_NO_CLAIM`** cho đến khi có bằng chứng giá hiện hành được xác nhận phiên đầy đủ.<br>',
  '- **Bảo toàn Ranh giới Tuyệt đối**: 0 candidate mới, 0 staging deployment, 0 CEO decision receipt, production duy trì khóa (`[]`, `is_approved: false`), tiến độ thực tế bảo toàn `1/10 staging deal`, `1/3 cụm`, `1/5 ngày`. |'
].join('');

// 2. Prepare Section 5 Text
const section5Text = [
  '**Work Order**: `JAYT-069-STEP1D-STARLIGHT-PRICE-CONFIRMATION` (Starlight Current-Price Confirmation)  \n',
  '**Mục tiêu chiến lược**: Kiểm tra giá thực tế và luồng đặt vé tại Starlight Đà Nẵng qua Chrome CDP cho chương trình U22 và Thứ 3 Phim Việt; lưu trữ đầy đủ artifacts và đối soát mã băm SHA-256.\n\n',
  '### 1. Bằng chứng Thực Tế & Artifacts Thu Thập Trên Đĩa\n',
  '- **Lịch chiếu & Suất chiếu Starlight Đà Nẵng**: [`CAPTURE_RECEIPT_STARLIGHT_BOOKING_FLOW.json`](05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step1d_starlight_booking/CAPTURE_RECEIPT_STARLIGHT_BOOKING_FLOW.json) (PNG SHA-256: `c4fe0d48edc85d6433877a24a8ed3b0e201526104e026a005cc677369ddf1c3a`).\n',
  '- **Màn hình Đặt vé Live**: [`CAPTURE_RECEIPT_STARLIGHT_DAT_VE_LIVE.json`](05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step1d_starlight_booking/CAPTURE_RECEIPT_STARLIGHT_DAT_VE_LIVE.json) (PNG SHA-256: `9e0fef0ecdd192373e03f20960f7bc6fab1100aeec36ec6b31b22b2c91c769c7`).\n',
  '- **Chọn ghế & Tính toán Giá**: [`CAPTURE_RECEIPT_STARLIGHT_SEAT_SELECTED_PRICE.json`](05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step1d_starlight_booking/CAPTURE_RECEIPT_STARLIGHT_SEAT_SELECTED_PRICE.json) (PNG SHA-256: `e0c843a0b8235f2a431d1357ed532eb691fd7c18ae580a72d07774f591fb9a7b`).\n\n',
  '### 2. Kết luận Thẩm định\n',
  '- Thể lệ U22 quy định rõ: *"Đồng giá vé 45k/vé khi mua tại quầy từ thứ 2 đến thứ 5! U22 không áp dụng thanh toán online"*. Do đó, luồng online công khai không áp dụng giảm trừ trực tiếp mà cần xác thực CCCD/thẻ HSSV tại quầy.\n',
  '- Thể lệ Thứ 3 Phim Việt: Áp dụng 45k cho tất cả phim Việt vào Thứ 3 hàng tuần.\n',
  '- Quyết định: Giữ **`LEAD_ONLY_NO_CLAIM`**, không tạo candidate/staging/CEO receipt.\n'
].join('');

// 3. Prepare Section 6 Text
const section6Text = [
  '### Giao dịch 069-STEP1D: Khảo Sát Giá Hiện Hành Starlight Đà Nẵng (`JAYT-069-STEP1D-STARLIGHT-PRICE-CONFIRMATION`)\n',
  '- **Ngày thực hiện**: `2026-08-24T13:04:30+07:00`\n',
  '- **Thực hiện**: Antigravity Live CDP Inspector qua Chrome Headless.\n',
  '- **Lineage & State**: Đã lưu 3 bộ artifacts hoàn chỉnh tại `05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step1d_starlight_booking/` kèm receipts SHA-256.\n',
  '- **Trạng thái**: Bảo toàn tuyệt đối tiến độ thật `1/10 staging deal`, `1/3 cụm`, `1/5 ngày`; production locked `[]` (`is_approved: false`).\n'
].join('');

const headerStatus = '057: ACCEPTED (OPERATING PROTOCOL) | 069-STEP1D: IMPLEMENTED — PENDING CEO AUDIT (STARLIGHT CURRENT PRICE INSPECTED) | 069C: IMPLEMENTED — PENDING CEO AUDIT (RECEIPT LINEAGE CLARIFIED) | 069B: IMPLEMENTED — PENDING CEO AUDIT (AUTHORIZATION ATTRIBUTION DISCLOSURE) | 069A: IMPLEMENTED — PENDING CEO AUDIT (069A CONTAINMENT IMPLEMENTED; UI CHANGES: UNREVIEWED_OUT_OF_SCOPE — KHÔNG THUỘC RELEASE SCOPE) | 069.1: REJECTED (SYNTHETIC CLAIMS & UNAUTHORIZED CEO APPROVAL — QUARANTINED IN BATCH_069A) | 068U: ACCEPTED BY CEO (TIMEZONE BUG FIXED + SHA VALIDATION + DISCONTINUITY DISCLOSED) | 068R: ACCEPTED BY CEO (LEAD-ONLY REGISTRY: 10 LEAD RADAR TRUNG THỰC) | 068T: REJECTED (PROCESS BYPASS — SUPERSEDED BY 068U) | 068: CORRECTED (SEE 068R) | 067A: ACCEPTED BY CEO (MEMORY / GOVERNANCE / LINK FORMAT FROZEN) | 067: ACCEPTED BY CEO (MEMORY TRANSACTION FINAL GATE & ZERO SIDE-EFFECT ISOLATION) | PRODUCTION: LOCKED';

console.log('🔄 Đang áp dụng Memory Transaction 069-STEP1D...');
const txResult = applyProjectMemoryTransaction067({
  version: '3.102.0',
  workOrder: 'JAYT-069-STEP1D-STARLIGHT-PRICE-CONFIRMATION',
  workOrderDescription: 'Khảo Sát Giá Hiện Hành Starlight Đà Nẵng',
  headerStatusLine: headerStatus,
  section4Row: section4Content,
  section5CriteriaText: section5Text,
  section6LogEntry: section6Text,
  historicalCorrections: []
});

console.log('✅ Giao dịch 069-STEP1D thành công:');
