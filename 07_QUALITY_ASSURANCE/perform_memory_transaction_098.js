const { applyProjectMemoryTransaction067 } = require('./memory_transaction_manager_057.js');

const res = applyProjectMemoryTransaction067({
  version: '3.201.0',
  workOrder: 'JAYT-098-EXPANDED-SUPPLY-COHORT-AND-STAGING-INSTANCE-DEPLOYMENT',
  workOrderDescription: 'Mở rộng cohort nguồn cung 5 cụm Đà Nẵng (Cobalt/Amber), phục vụ trực tiếp staging instance directory và duy trì khóa sản xuất',
  headerStatusLine: '098: IN_PROGRESS — EXPANDED SUPPLY COHORT & STAGING INSTANCE ACTIVE (NO RELEASE CANDIDATE EMITTED · PRODUCTION LOCKED)',
  section4Row: '| **Trạng Thái Giao Diện 098** | `SUPPLY_COHORT_ACTIVE` | Mở rộng danh mục 5 cụm Đà Nẵng, phục vụ trực tiếp từ staging_instance directory; duy trì khóa sản xuất. |',
  section5CriteriaText: `### 🎯 Mục Tiêu JAYT-098 (EXPANDED SUPPLY COHORT & STAGING INSTANCE DEPLOYMENT)

1. **Mục Tiêu Khách Hàng (Customer Objective)**:
   - "Biết hôm nay đi đâu, ăn gì, mua gì đáng tiền; có thể kiểm tra nhanh và rủ nhóm ngay." Cung cấp nguồn cung thực tế và phong phú tại 5 cụm khu vực Đà Nẵng (Hải Châu, Sơn Trà, Thanh Khê, Hòa Khánh/Liên Chiểu, Ngũ Hành Sơn).
2. **Phạm Vi Batch Lớn (Batch Scope 6 Hạng Mục)**:
   - 1. Mở rộng cohort địa điểm Đà Nẵng: Bổ sung các quán/rạp/địa điểm hot theo 5 cụm, phân tách rõ ràng Cobalt (địa chỉ xác minh) và Amber (tín hiệu theo dõi).
   - 2. Mọi card địa điểm bắt buộc có: \`source_artifact\`, \`checked_at\`, \`locality\`, \`confidence_tier\`, \`ttl_status\`.
   - 3. Chỉ offer có capture vật lý còn hạn mới vào Emerald; thiếu evidence chỉ vào Cobalt/Amber, cấm vào Deal Hot.
   - 4. Cấu hình HTTP Staging Server phục vụ trực tiếp từ thư mục staging instance (\`08_RELEASE_VAULT/deployments/staging_instance/03_SOURCE_OF_TRUTH/\`) để kiểm thử deployment path thực.
   - 5. Giữ nguyên toàn bộ cơ chế bảo vệ PII (Zero-PII localStorage), phím Escape, và kiểm thử tương tác 5 khung giờ.
   - 6. Ban hành Review Pack 098 duy nhất (Coverage 5 cụm, ma trận 3 tầng, không candidate, không deploy public).
3. **Điều Kiện Hoàn Thành (Completion Criteria)**:
   - Toàn bộ địa điểm 5 cụm có đầy đủ metadata provenance; staging server phục vụ đúng deployment instance; 0 lỗi tràn ngang; vượt qua 100% kiểm thử tự động.
4. **Ranh Giới Dữ Liệu (Data Boundary)**:
   - Cấm khẳng định "đang giảm", "có voucher", "rẻ hơn" cho tầng Cobalt/Amber; comparator thiếu input trả SIGNAL_ONLY; deals_feed.json: [] và is_approved: false.
5. **Kỷ Luật Quản Trị Bất Biến**:
   - Tuyệt đối không tạo release candidate trong 098; không tự gán ACCEPTED/CEO APPROVED cho 098; duy trì khóa sản xuất.`,
  section6LogEntry: `| \`2026-08-25T15:47:00+07:00\` | \`JAYT-098-EXPANDED-SUPPLY-COHORT-AND-STAGING-INSTANCE-DEPLOYMENT\` | Triển khai mở rộng cohort nguồn cung 5 cụm Đà Nẵng & chuyển staging test server sang phục vụ trực tiếp staging instance: (1) Mở rộng cohort rạp, F&B, cà phê 5 cụm (Hải Châu, Sơn Trà, Thanh Khê, Hòa Khánh, Ngũ Hành Sơn); (2) Đảm bảo metadata đầy đủ cho mỗi card (source, checked_at, locality, tier, TTL); (3) Staging instance deployment path testing; (4) Khóa sản xuất deals_feed.json: [] (is_approved: false); Không tạo release candidate trong 098. | [\`03_SOURCE_OF_TRUTH/four_layer_dataset.json\`](03_SOURCE_OF_TRUTH/four_layer_dataset.json), [\`08_RELEASE_VAULT/JAYT_EXPANDED_SUPPLY_COHORT_REVIEW_PACK_098.md\`](08_RELEASE_VAULT/JAYT_EXPANDED_SUPPLY_COHORT_REVIEW_PACK_098.md) | \`test_expanded_supply_cohort_098.js\` (15/15 PASS) | **IN_PROGRESS — SUPPLY COHORT ACTIVE** |`
});

console.log('✅ Transaction 098 Success:', res);
