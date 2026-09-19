/**
 * JAYT PROJECT MEMORY TRANSACTION RUNNER (125)
 * Directive: JAYT-125-NIGHT-PLAN-AND-VISUAL-TRUTH
 */

const { applyProjectMemoryTransaction067 } = require('./memory_transaction_manager_057');

const section4Content = '| **Trạng Thái Night Plan & Visual Truth 125** | `NIGHT_PLAN_ACTIVE` | Hoàn tất Release 125 - (1) Biến Hero slot 20:00 thành lộ trình buổi tối có trình tự thời gian (18:00 Ăn tối GoGi ➔ 20:00 Xem phim CGV ➔ 22:30 Về nhà an toàn); (2) Bổ sung điều kiện "trước 21:00" cho DanaBus và tích hợp tab hướng dẫn di chuyển sau 21:00 trung thực (xe cá nhân / app gọi xe không voucher ảo); (3) Xây dựng widget tương tác "Lập Kèo Tối Nay" tính nhanh tổng chi phí & chia đầu người; (4) Minh bạch 100% Visual Truth: Render ảnh bối cảnh thực tế cho 3 điểm flagship (CGV, GoGi, Phê La) và duy trì Vector Monogram Treatment cho các điểm còn lại; (5) 97/97 QA assertions pass; (6) Deploy Live Vercel Production với 100% SHA-256 byte parity. |';

const section5Content = `### Mục Tiêu JAYT-125 (NIGHT PLAN & VISUAL TRUTH)

- **Mục Tiêu**: Hoàn thiện trải nghiệm lộ trình buổi tối có trình tự (Night Journey Timeline: Ăn tối ➔ Xem phim ➔ Về nhà), bổ sung tab di chuyển trung thực sau 21:00, xây dựng công cụ tương tác "Lập Kèo Tối Nay", minh bạch 100% Visual Truth giữa ảnh bối cảnh thực tế cho 3 điểm flagship và monogram treatment cho các điểm còn lại, kiểm thử tự động 97/97 pass và triển khai Live Vercel Production.
- **Phạm Vi**: \`03_SOURCE_OF_TRUTH/daily_supply_feed_125.json\`, \`03_SOURCE_OF_TRUTH/brand_asset_registry.json\`, \`03_SOURCE_OF_TRUTH/jayt_apex_interface.js\`, \`03_SOURCE_OF_TRUTH/index.html\`, \`05_DEAL_AND_AFFILIATE/supply_gap_board_125.json\`, \`05_DEAL_AND_AFFILIATE/run_retention_supply_extractor_125.js\`, \`07_QUALITY_ASSURANCE/test_night_plan_and_visual_truth_125.js\`, \`07_QUALITY_ASSURANCE/deploy_live_vercel_beta_125.js\`, \`08_RELEASE_VAULT/DEPLOYMENT_RECEIPT_125.json\`, \`08_RELEASE_VAULT/JAYT_125_NIGHT_PLAN_REVIEW_PACK.md\`.
- **Bộ Quy Chuẩn Cốt Lõi 125**:
  - **Lộ Trình Buổi Tối Có Trình Tự (Night Journey Stepper)**:
    - Chặng 1 (18:00 - 19:30): 🥩 GoGi House (Ăn tối nướng nhóm ~176k/người).
    - Chặng 2 (20:00 - 22:30): 🎬 CGV Cinemas (Xem phim suất tối tiết kiệm 30k-110k).
    - Chặng 3 (22:30+): 🚗 Về nhà an toàn (DanaBus trước 21h / Hướng dẫn xe cá nhân, gọi xe sau 21h).
  - **Điều Kiện DanaBus & Tab Di Chuyển Khuya Trung Thực (Late-Night Guidance)**:
    - Tab 1: "🚌 Trước 21:00 (DanaBus 6k)" - Biểu giá trợ giá nội đô.
    - Tab 2: "🚗 Sau 21:00 (Gọi xe / Tự đi)" - Cảnh báo xe buýt ngưng chạy, khuyến nghị chủ động xe cá nhân hoặc ứng dụng gọi xe (Grab/Xanh SM/Be), minh bạch không có voucher ảo.
  - **Công Cụ Tương Tác Cục Bộ "Lập Kèo Tối Nay" (Night Plan Simulator)**:
    - Khách chọn số người (2-5) và lộ trình (Ăn tối + Xem phim hoặc Chỉ xem phim đêm).
    - Hệ thống tính toán ngay chi phí nhóm và chi phí chia đều trên từng người.
  - **Minh Bạch 100% Visual Truth (Visual Asset Truth)**:
    - 3 điểm flagship được render ảnh bối cảnh thực tế: CGV Cinemas, GoGi House, Phê La.
    - Toàn bộ điểm đến khác duy trì Vector Monogram Treatment rõ ràng.
- **Khóa Sản Xuất**: Duy trì trạng thái đóng băng thương mại 100% - \`is_commercial_published: false\`, \`status: PENDING_CEO_REVIEW\`.`;

const section6Log = '| `2026-08-26T00:30:00+07:00` | `JAYT-125-NIGHT-PLAN-AND-VISUAL-TRUTH` | Hoàn thiện Night Plan & Visual Truth - (1) Stepper lộ trình tối 3 chặng; (2) Điều kiện DanaBus trước 21h và tab di chuyển khuya sau 21h trung thực; (3) Widget tương tác Lập Kèo Tối Nay; (4) Visual Truth: render ảnh thực tế cho 3 điểm flagship (CGV, GoGi, Phê La) & Monogram Treatment cho các điểm còn lại; (5) 97/97 QA assertions pass; (6) Deploy Live Vercel Production với 100% SHA-256 byte parity. | [`DEPLOYMENT_RECEIPT_125.json`](08_RELEASE_VAULT/DEPLOYMENT_RECEIPT_125.json) | `test_night_plan_and_visual_truth_125.js` (97/97 PASS) | **IMPLEMENTED — PENDING CEO AUDIT** |';

const result = applyProjectMemoryTransaction067({
  version: '3.242.0',
  workOrder: 'JAYT-125-NIGHT-PLAN-AND-VISUAL-TRUTH',
  workOrderDescription: 'Night Plan & Visual Truth: Chronological evening journey stepper, honest late-night mobility guidance, interactive night planner widget, 3 flagship visual assets, 100% Live Vercel parity',
  headerStatusLine: '125: IMPLEMENTED — PENDING CEO AUDIT (NIGHT PLAN & VISUAL TRUTH · EVENING JOURNEY TIMELINE · HONEST LATE-NIGHT TRANSIT GUIDANCE · INTERACTIVE NIGHT PLAN SIMULATOR · 3 FLAGSHIP EDITORIAL ASSETS · VERCEL LIVE PARITY 100% · PRODUCTION LOCKED)',
  section4Row: section4Content,
  section5CriteriaText: section5Content,
  section6LogEntry: section6Log
});

console.log('TRANSACTION_125_RESULT:', result.finalHash);
