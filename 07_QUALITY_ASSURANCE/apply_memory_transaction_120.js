/**
 * JAYT PROJECT MEMORY TRANSACTION RUNNER (120)
 * Directive: JAYT-120-EMOTIONAL-UTILITY-AND-REAL-RETENTION
 */

const { applyProjectMemoryTransaction067 } = require('./memory_transaction_manager_057');

const section4Content = '| **Trạng Thái Emotional Utility & Real Retention 120** | `RETENTION_ENGINE_ACTIVE` | Hoàn tất Release 120 - (1) Tự động nhận diện khung giờ theo thời gian thực của máy khách hàng, thu gọn Time Dock thành dải compact với nút "Đổi khung giờ ⏱️", giảm quá tải nhận thức đầu trang; (2) Chuẩn hóa Proximity Text nghiêm ngặt: chỉ nói "gần bạn tại [Quận]" khi người dùng đã chọn Quận cụ thể, mặc định "tại Đà Nẵng", không ngụ ý GPS; (3) Tinh gọn Decision Card: Giá trị cốt lõi, 1 điều kiện then chốt nhất, thời hạn, phạm vi địa điểm và bộ 3 CTA rõ ràng; (4) Return Experience: Tự động lưu trạng thái khi bấm xem nguồn và hiển thị banner chào mừng tương tác khi quay lại trang kèm nút Chia bill / Lập kèo nhanh; (5) Bổ sung nguồn cung lấp High Gap (CGV Zalopay 50% suất trưa 12h-13h, KFC Xô Hợp Cạ 189k tan ca) nâng độ phủ hành động lên 10/25 ô (40.0%); (6) Chuẩn hóa Design System CSS tokens, focus-visible WCAG AA và responsive 3 viewports (390px, 768px, 1440px); (7) 128/128 QA test assertions pass; (8) Deploy Live Vercel Production với 100% SHA-256 byte parity đối soát 7 tệp SOT. |';

const section5Content = `### Mục Tiêu JAYT-120 (EMOTIONAL UTILITY & REAL RETENTION)

1. **Mục Tiêu**: Giảm tải nhận thức đầu trang bằng Auto-slot detection và Compact Time Dock, chuẩn hóa Decision Card tinh gọn với 1 điều kiện then chốt, xây dựng trải nghiệm trở về (Return Experience) tương tác, bổ sung nguồn cung có đối soát lấp các High Gap đạt 40% độ phủ hành động, hoàn thiện Design System đạt chuẩn WCAG AA và kiểm thử responsive trên 390px/768px/1440px.
2. **Phạm Vi**: \`03_SOURCE_OF_TRUTH/daily_supply_feed_120.json\`, \`03_SOURCE_OF_TRUTH/jayt_apex_interface.js\`, \`03_SOURCE_OF_TRUTH/index.html\`, \`05_DEAL_AND_AFFILIATE/supply_gap_board_120.json\`, \`05_DEAL_AND_AFFILIATE/run_retention_supply_extractor_120.js\`, \`07_QUALITY_ASSURANCE/test_emotional_utility_and_retention_120.js\`, \`07_QUALITY_ASSURANCE/deploy_live_vercel_beta_120.js\`, \`08_RELEASE_VAULT/DEPLOYMENT_RECEIPT_120.json\`, \`08_RELEASE_VAULT/JAYT_120_RETENTION_AND_UTILITY_REVIEW_PACK.md\`.
3. **Bộ Quy Chuẩn Cốt Lõi 120**:
   - **Tự Động Chọn Khung Giờ & Compact Time Dock**: Tự động chọn khung giờ theo giờ hệ thống của khách hàng (\`getAutoSlotFromCurrentTime()\`), thu gọn Time Dock thành dải compact với toggle \`Đổi khung giờ ⏱️\`.
   - **Quy Chuẩn Địa Điểm Nghiêm Ngặt**: Chỉ dùng cụm từ "gần bạn tại [Quận]" khi \`state.selectedDistrict !== 'ALL'\`. Mặc định dùng "tại Đà Nẵng", tuyệt đối không ngụ ý có GPS tracking.
   - **Tinh Gọn Decision Card**: Mỗi thẻ hiển thị Giá trị cốt lõi (🎁/💵/🚌/✨), Một điều kiện then chốt nhất (📌 \`primary_condition\`), Thời hạn (🗓️ \`validity\`), Phạm vi địa điểm (🏢 \`scope\`), CTA mở nguồn kèm nút \`Chia bill 🧮\` và \`Lập kèo 👥\`.
   - **Trải Nghiệm Trở Về (Return Experience)**: Ghi nhận sự kiện khi khách mở nguồn đối soát sang website thương hiệu (\`jayt_last_viewed_offer\`). Khi khách quay lại, hiển thị banner tương tác: *"Bạn vừa xem điều kiện của [Thương hiệu - Tên ưu đãi]. Sẵn sàng lập kèo hoặc chia bill?"* kèm nút hành động tức thì.
   - **Lấp Khoảng Trống Nguồn Cung (High Gap Supply)**:
     - Bổ sung \`DEAL_120_CGV_ZALOPAY_50K\` (Giảm 50% suất trưa 12h-13h qua Zalopay).
     - Bổ sung \`MENU_120_KFC_XO_HOP_CA_189K\` (Combo gà nhóm 189k tan ca / tối).
     - Nâng độ phủ hành động lên **10/25 ô (40.0%)**.
   - **Design System & WCAG AA**: CSS tokens chuẩn hóa, focus rings \`outline: 2.5px solid #10B981\`, touch target tối thiểu 44px, kiểm thử hoàn hảo trên 3 viewports: Mobile 390px, Tablet 768px, Desktop 1440px.
4. **Khóa Sản Xuất**: Duy trì trạng thái đóng băng thương mại 100% - \`deals_feed.json: []\`, \`is_approved: false\`.`;

const section6Log = '| `2026-08-25T23:48:00+07:00` | `JAYT-120-EMOTIONAL-UTILITY-AND-REAL-RETENTION` | Hoàn thiện Emotional Utility & Real Retention - (1) Tự động nhận diện khung giờ theo giờ thực, thu gọn Time Dock thành dải compact giảm tải nhận thức; (2) Chuẩn hóa Proximity Text nghiêm ngặt, không ngụ ý GPS; (3) Tinh gọn Decision Card với 1 điều kiện then chốt; (4) Xây dựng Return Experience tương tác với banner lập kèo/chia bill khi quay lại; (5) Bổ sung deal trưa CGV Zalopay 50% và menu KFC Xô 189k, nâng độ phủ lên 10/25 ô (40.0%); (6) Chuẩn hóa Design System WCAG AA trên Mobile 390px, Tablet 768px, Desktop 1440px; (7) 128/128 QA assertions pass; (8) Deploy Live Vercel Production với 100% SHA-256 byte parity đối soát 7 tệp SOT. | [`DEPLOYMENT_RECEIPT_120.json`](08_RELEASE_VAULT/DEPLOYMENT_RECEIPT_120.json) | `test_emotional_utility_and_retention_120.js` (128/128 PASS) | **IMPLEMENTED — PENDING CEO AUDIT** |';

const result = applyProjectMemoryTransaction067({
  version: '3.237.0',
  workOrder: 'JAYT-120-EMOTIONAL-UTILITY-AND-REAL-RETENTION',
  workOrderDescription: 'Auto-slot detection & Compact Time Dock; Strict location phrasing; Streamlined Decision Cards with 1 critical condition; Return experience interactive banner; High gap supply 40% coverage; Design system WCAG AA; Live Vercel parity 100%',
  headerStatusLine: '120: IMPLEMENTED — PENDING CEO AUDIT (EMOTIONAL UTILITY & REAL RETENTION · AUTO-SLOT DETECTION · COMPACT TIME DOCK · STREAMLINED DECISION CARDS · RETURN EXPERIENCE BANNER · 40% ACTIONABLE COVERAGE · DESIGN SYSTEM WCAG AA · VERCEL LIVE PARITY 100% · PRODUCTION LOCKED)',
  section4Row: section4Content,
  section5CriteriaText: section5Content,
  section6LogEntry: section6Log
});

console.log('TRANSACTION_120_RESULT:', result.finalHash);
