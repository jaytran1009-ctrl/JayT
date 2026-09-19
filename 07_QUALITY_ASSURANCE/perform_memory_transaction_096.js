const { applyProjectMemoryTransaction067 } = require('./memory_transaction_manager_057.js');

const res = applyProjectMemoryTransaction067({
  version: '3.199.0',
  workOrder: 'JAYT-096-CUSTOMER-JOURNEY-NORTH-STAR-AND-COMMUNITY-DISCOVERY',
  workOrderDescription: 'Triển khai toàn diện North Star Customer Journey, 5 thời điểm trong ngày, mô hình 3 tầng dữ liệu và 5 cỗ máy khám phá',
  headerStatusLine: '096: IN_PROGRESS — STAGING DISCOVERY ENGINE IMPLEMENTED (BATCH A-F · NO RELEASE CANDIDATE EMITTED · PRODUCTION LOCKED)',
  section4Row: '| **Trạng Thái Giao Diện 096** | `STAGING_DISCOVERY_ENGINE_ACTIVE` | Triển khai North Star Discovery Engine (5 thời điểm, 3 tầng dữ liệu, 5 cỗ máy khám phá) với 100% dữ liệu đối soát thực tế. |',
  section5CriteriaText: `### 🎯 Mục Tiêu JAYT-096 (CUSTOMER JOURNEY NORTH STAR & COMMUNITY DISCOVERY)

1. **Mục Tiêu Khách Hàng (Customer Objective)**:
   - JayT là Community Deal Discovery Engine cho sinh viên và dân văn phòng Đà Nẵng: "Biết hôm nay đi đâu, ăn gì, mua gì đáng tiền; có thể kiểm tra nhanh và rủ nhóm ngay."
2. **Phạm Vi Batch Lớn (Batch Scope A đến F)**:
   - Triển khai đồng bộ 6 Batch: Batch A (Quản trị bộ nhớ & test cấu trúc work order), Batch B (Kiến trúc trải nghiệm 5 thời điểm 07:30, 11:15, 14:15, 17:30, 21:00), Batch C (Mô hình 3 tầng dữ liệu Xanh / Xanh Dương / Hổ Phách), Batch D (5 cỗ máy theo hành trình), Batch E (Cohort nguồn cung địa phương), Batch F (UX, Trợ năng & Visual Review).
3. **Điều Kiện Hoàn Thành (Completion Criteria)**:
   - Trang chủ hỗ trợ chuyển đổi linh hoạt 5 thời điểm với Hero & CTA theo ngữ cảnh; 3 tầng dữ liệu hiển thị rõ ràng nhãn và disclaimer; 5 cỗ máy vận hành đúng ranh giới trung thực; 100% touch targets >= 44px; vượt qua 100% bài kiểm thử tự động.
4. **Ranh Giới Dữ Liệu (Data Boundary)**:
   - Quán/địa điểm nổi tiếng chưa đủ chứng cứ chỉ xuất hiện ở tầng Xanh Dương (Watchlist) kèm disclaimer kiểm tra tại quán/app; nghiêm cấm các từ ngữ "đang giảm", "có voucher" cho tầng Xanh Dương và Hổ Phách; tuyệt đối không tạo giá/mã ảo.
5. **Kỷ Luật Quản Trị Bất Biến**:
   - Tuyệt đối không tạo release candidate trong work order 096; không tự gán ACCEPTED/CEO APPROVED cho work order 096; duy trì khóa sản xuất deals_feed.json: [] và is_approved: false.`,
  section6LogEntry: `| \`2026-08-25T15:30:00+07:00\` | \`JAYT-096-CUSTOMER-JOURNEY-NORTH-STAR-AND-COMMUNITY-DISCOVERY\` | Triển khai chỉ thị chiến lược Customer Journey North Star & Community Discovery Engine: (1) Ban hành North Star v2.0.0, 11 kịch bản khách hàng, nguyên tắc batch-first và mô hình 3 tầng dữ liệu (Xanh - Xanh Dương - Hổ Phách); (2) Thiết kế bộ chuyển ngữ cảnh 5 thời điểm (07:30, 11:15, 14:15, 17:30, 21:00) với Hero & CTA theo nhu cầu cụ thể; (3) Tích hợp 5 cỗ máy khám phá: Cinema Radar, Local Habit Engine, Cross-App Comparator, E-commerce Price X-Ray, Group Split & Community Pipeline; (4) Khóa sản xuất deals_feed.json: [] (is_approved: false); Không tạo release candidate trong 096. | [\`03_SOURCE_OF_TRUTH/customer_journey_north_star.json\`](03_SOURCE_OF_TRUTH/customer_journey_north_star.json), [\`08_RELEASE_VAULT/JAYT_CUSTOMER_JOURNEY_NORTH_STAR_REVIEW_PACK_096.md\`](08_RELEASE_VAULT/JAYT_CUSTOMER_JOURNEY_NORTH_STAR_REVIEW_PACK_096.md) | \`test_customer_journey_north_star_096.js\` (12/12 PASS) | **IN_PROGRESS — STAGING DISCOVERY ENGINE IMPLEMENTED** |`
});

console.log('✅ Transaction 096 Success:', res);
