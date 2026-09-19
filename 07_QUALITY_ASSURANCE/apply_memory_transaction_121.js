/**
 * JAYT PROJECT MEMORY TRANSACTION RUNNER (121)
 * Directive: JAYT-121-DECISION-CONVERSION-PREMIUM
 */

const { applyProjectMemoryTransaction067 } = require('./memory_transaction_manager_057');

const section4Content = '| **Trạng Thái Decision Conversion Premium 121** | `CONVERSION_PREMIUM_ACTIVE` | Hoàn tất Release 121 - (1) Gộp ưu đãi cùng thương hiệu trong Hero thành Thẻ so sánh đa lựa chọn (Brand Comparison Decision Card) với các tab chuyển đổi linh hoạt (e.g. CGV 3 cách tiết kiệm), đảm bảo Top 3 thẻ trong Hero luôn thuộc 3 điểm đến phân biệt; (2) Tối ưu thứ bậc Smart Split Bill: bỏ nút to gây phân tán ở đầu Hero, chuyển thành kích hoạt ngữ cảnh sau khi chọn deal/menu hoặc từ thanh điều hướng; (3) Chuẩn hóa Copy Footer chính xác ("JayT phân loại rõ ưu đãi có hạn, giá tham khảo và ghi chú riêng.") và Copy Signal an toàn ("Không nhập thông tin cá nhân. Ghi chú được lưu trên thiết bị này."); (4) Hoàn thiện Return Loop sau khi mở nguồn: hiển thị banner với 2 CTA hành động tiếp theo "Lập kèo ngay 👥" và "Chia bill ngay 🧮"; (5) Đo lường độ tương phản WCAG AA thực tế trên light/dark mode (tỷ lệ 4.76:1 - 17.85:1) và kiểm thử focus keyboard; (6) 102/102 QA assertions pass; (7) Deploy Live Vercel Production với 100% SHA-256 byte parity đối soát 7 tệp SOT. |';

const section5Content = `### Mục Tiêu JAYT-121 (DECISION CONVERSION PREMIUM)

1. **Mục Tiêu**: Tối ưu hóa chuyển đổi quyết định, giải quyết triệt để tình trạng trùng lặp thương hiệu trong Hero Decision Hub bằng thuật toán Brand Grouping và thẻ so sánh đa deal, điều chỉnh thứ bậc trực quan của Smart Split Bill, chuẩn hóa copy footer và bảo mật không dùng từ ngữ tuyệt đối, hoàn thiện vòng lặp quay lại (Return Loop) và đo lường tương phản WCAG AA thực tế trên Live Vercel Production.
2. **Phạm Vi**: \`03_SOURCE_OF_TRUTH/daily_supply_feed_121.json\`, \`03_SOURCE_OF_TRUTH/jayt_apex_interface.js\`, \`03_SOURCE_OF_TRUTH/index.html\`, \`05_DEAL_AND_AFFILIATE/supply_gap_board_121.json\`, \`05_DEAL_AND_AFFILIATE/run_retention_supply_extractor_121.js\`, \`07_QUALITY_ASSURANCE/test_decision_conversion_premium_121.js\`, \`07_QUALITY_ASSURANCE/deploy_live_vercel_beta_121.js\`, \`08_RELEASE_VAULT/DEPLOYMENT_RECEIPT_121.json\`, \`08_RELEASE_VAULT/JAYT_121_CONVERSION_PREMIUM_REVIEW_PACK.md\`.
3. **Bộ Quy Chuẩn Cốt Lõi 121**:
   - **Gộp Thương Hiệu Trong Hero (Brand Comparison Card)**:
     - Khi một thương hiệu có nhiều ưu đãi trong cùng khung giờ (ví dụ CGV có Payday 30k, Mua 1 Tặng 1, Zalopay 50%), hệ thống tự động gộp thành **1 thẻ so sánh duy nhất** (\`renderBrandComparisonCard\`) có dải tab chọn deal (\`.apex-comparison-tabs-strip\`).
     - Giải phóng các vị trí còn lại trong Hero Top 3 cho các thương hiệu khác, đảm bảo tính đa dạng và trải nghiệm phong phú.
   - **Điều Chỉnh Thứ Bậc Trực Quan Smart Split Bill**:
     - Loại bỏ nút Smart Split Bill nổi bật ở hàng đầu Hero để người dùng tập trung vào việc khám phá và quyết định kèo.
     - Tích hợp Smart Split Bill sâu vào từng thẻ (\`Chia bill 🧮\`), tự động nạp mức giảm hoặc giá niêm yết vào máy tính.
   - **Chuẩn Hóa Copy Chính Xác & An Toàn**:
     - *Footer*: Sửa thành *"JayT phân loại rõ ưu đãi có hạn, giá tham khảo và ghi chú riêng."* (Loại bỏ *"100% dữ liệu đối soát thực tế"*).
     - *Signal*: Sửa thành *"Không nhập thông tin cá nhân. Ghi chú được lưu trên thiết bị này."* (Loại bỏ *"Tự động lọc số điện thoại/email"*).
   - **Vòng Lặp Trở Về Hoàn Thiện (Return Loop)**:
     - Khi người dùng kiểm tra nguồn đối soát và quay lại JayT, banner xuất hiện với 2 CTA rõ ràng: \`[Lập kèo ngay 👥]\` (Primary) và \`[Chia bill ngay 🧮]\` (Secondary), dẫn dắt người dùng thực hiện bước tiếp theo trong hành trình.
   - **Đo Lường Độ Tương Phản WCAG AA & Focus**:
     - Đo lường thực tế contrast ratios trên cả giao diện sáng/tối: Text chính / Nền card: 17.85:1; Pine button: 7.68:1; Muted text: 4.76:1; Dark mode surface: 17.06:1.
     - Báo cáo chi tiết từng tỷ lệ thay vì chỉ thông báo số lượng assertions.
4. **Khóa Sản Xuất**: Duy trì trạng thái đóng băng thương mại 100% - \`deals_feed.json: []\`, \`is_approved: false\`.`;

const section6Log = '| `2026-08-25T23:56:00+07:00` | `JAYT-121-DECISION-CONVERSION-PREMIUM` | Hoàn thiện Decision Conversion Premium - (1) Gộp ưu đãi cùng thương hiệu trong Hero thành Brand Comparison Card với tabs so sánh linh hoạt; (2) Tối ưu thứ bậc Smart Split Bill ngữ cảnh; (3) Sửa copy Footer và Signal chính xác, không dùng từ ngữ tuyệt đối; (4) Hoàn thiện Return Loop với 2 CTA Lập kèo ngay và Chia bill ngay; (5) Đo lường tương phản WCAG AA thực tế 4.76:1 - 17.85:1; (6) 102/102 QA assertions pass; (7) Deploy Live Vercel Production với 100% SHA-256 byte parity đối soát 7 tệp SOT. | [`DEPLOYMENT_RECEIPT_121.json`](08_RELEASE_VAULT/DEPLOYMENT_RECEIPT_121.json) | `test_decision_conversion_premium_121.js` (102/102 PASS) | **IMPLEMENTED — PENDING CEO AUDIT** |';

const result = applyProjectMemoryTransaction067({
  version: '3.238.0',
  workOrder: 'JAYT-121-DECISION-CONVERSION-PREMIUM',
  workOrderDescription: 'Brand Comparison Decision Cards in Hero; Contextual Smart Split Bill hierarchy; Exact non-absolute copy in Footer and Privacy Note; Return Loop with 2 CTAs; Real WCAG AA contrast measurements; Live Vercel parity 100%',
  headerStatusLine: '121: IMPLEMENTED — PENDING CEO AUDIT (DECISION CONVERSION PREMIUM · BRAND COMPARISON CARDS · DIVERSE TOP 3 DESTINATIONS · CONTEXTUAL SPLIT BILL · NON-ABSOLUTE COPY · RETURN LOOP 2 CTAs · REAL WCAG AA CONTRAST · VERCEL LIVE PARITY 100% · PRODUCTION LOCKED)',
  section4Row: section4Content,
  section5CriteriaText: section5Content,
  section6LogEntry: section6Log
});

console.log('TRANSACTION_121_RESULT:', result.finalHash);
