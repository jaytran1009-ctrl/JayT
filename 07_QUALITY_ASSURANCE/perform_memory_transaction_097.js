const { applyProjectMemoryTransaction067 } = require('./memory_transaction_manager_057.js');

const res = applyProjectMemoryTransaction067({
  version: '3.200.0',
  workOrder: 'JAYT-097-FIELD-VALIDATION-AND-SUPPLY-COHORT',
  workOrderDescription: 'Kiểm thử thực tế luồng 5 khung giờ, đối soát fixture 3 tầng dữ liệu, mở rộng cohort nguồn cung Đà Nẵng và xác minh PII / Comparator',
  headerStatusLine: '097: IN_PROGRESS — FIELD VALIDATION & SUPPLY COHORT ACTIVE (NO RELEASE CANDIDATE EMITTED · PRODUCTION LOCKED)',
  section4Row: '| **Trạng Thái Giao Diện 097** | `FIELD_VALIDATION_ACTIVE` | Kiểm thử E2E HTTP Staging 5 khung giờ, đối soát fixture 3 tầng, kiểm tra PII thật & comparator; duy trì khóa sản xuất. |',
  section5CriteriaText: `### 🎯 Mục Tiêu JAYT-097 (FIELD VALIDATION & SUPPLY COHORT)

1. **Mục Tiêu Khách Hàng (Customer Objective)**:
   - Giúp sinh viên và dân văn phòng Đà Nẵng tìm, kiểm tra, rủ nhóm và tiết kiệm thời gian hôm nay: "Biết hôm nay đi đâu, ăn gì, mua gì đáng tiền; có thể kiểm tra nhanh và rủ nhóm ngay."
2. **Phạm Vi Batch Lớn (Batch Scope 6 Hạng Mục)**:
   - 1. Kiểm thử tương tác thực tế 5 khung giờ trên HTTP Staging (click Time Dock -> đổi hero/context -> mở Split Bill -> Escape -> gửi Community Signal).
   - 2. Kiểm thử dữ liệu 3 tầng (Emerald: đủ evidence & còn hạn; Cobalt: địa điểm xác minh không claim ưu đãi; Amber: tín hiệu cộng đồng có cảnh báo tại nguồn).
   - 3. Mở rộng cohort địa điểm Đà Nẵng (bổ sung source artifact, checked_at, locality, confidence tier, TTL).
   - 4. Xác minh hành vi thực tế Comparator & Price X-Ray (thiếu dữ liệu trả SIGNAL_ONLY, cấm kết luận rẻ nhất/đáy giá).
   - 5. Test PII bằng input thật (email, số điện thoại Việt Nam bị chặn/xóa trước localStorage).
   - 6. Ban hành Review Pack 097 duy nhất.
3. **Điều Kiện Hoàn Thành (Completion Criteria)**:
   - Puppeteer E2E 5 khung giờ đạt PASS; toàn bộ fixture 3 tầng được kiểm chứng; PII thật được sanitize triệt để; 0 lỗi tràn ngang; vượt qua 100% bài kiểm thử tự động.
4. **Ranh Giới Dữ Liệu (Data Boundary)**:
   - Địa điểm thiếu evidence ưu đãi bắt buộc hiển thị Cobalt/Amber, không vào Deal Hot; comparator thiếu input trả SIGNAL_ONLY; không tạo dữ liệu giá/mã ảo; deals_feed.json: [] và is_approved: false.
5. **Kỷ Luật Quản Trị Bất Biến**:
   - Tuyệt đối không tạo release candidate trong 097; không tự gán ACCEPTED/CEO APPROVED cho 097; duy trì khóa sản xuất.`,
  section6LogEntry: `| \`2026-08-25T15:36:00+07:00\` | \`JAYT-097-FIELD-VALIDATION-AND-SUPPLY-COHORT\` | Triển khai chỉ thị thực địa và mở rộng nguồn cung: (1) Kiểm thử tương tác E2E 5 khung giờ trên HTTP Staging; (2) Đối soát fixture 3 tầng (Emerald, Cobalt, Amber) có provenance; (3) Mở rộng cohort địa điểm với đầy đủ metadata; (4) Xác minh comparator & price x-ray trả SIGNAL_ONLY khi thiếu dữ liệu; (5) Test PII input thật trước localStorage; (6) Khóa sản xuất deals_feed.json: [] (is_approved: false); Không tạo release candidate trong 097. | [\`03_SOURCE_OF_TRUTH/four_layer_dataset.json\`](03_SOURCE_OF_TRUTH/four_layer_dataset.json), [\`08_RELEASE_VAULT/JAYT_FIELD_VALIDATION_AND_SUPPLY_COHORT_REVIEW_PACK_097.md\`](08_RELEASE_VAULT/JAYT_FIELD_VALIDATION_AND_SUPPLY_COHORT_REVIEW_PACK_097.md) | \`test_field_validation_and_supply_cohort_097.js\` (14/14 PASS) | **IN_PROGRESS — FIELD VALIDATION ACTIVE** |`
});

console.log('✅ Transaction 097 Success:', res);
