const { applyProjectMemoryTransaction067 } = require('./memory_transaction_manager_057.js');

const res = applyProjectMemoryTransaction067({
  version: '3.208.0',
  workOrder: 'JAYT-103R-ONE-SCREEN-UX-CONSOLIDATION',
  workOrderDescription: 'Thực hiện One-Screen UX Consolidation: Gộp 1 dock ngang duy nhất 5 pill; Dropdown quận tại Header; Giữ duy nhất 1 lối vào Chia Bill mở Bottom Sheet; Viewport mobile tinh gọn (Header -> Dock -> Hero -> 2 Cobalt -> Community Signal); Expandable Watchlist 14 Cobalt; 0 deal giả; Khóa sản xuất tuyệt đối',
  headerStatusLine: '103R: IN_PROGRESS — ONE SCREEN UX CONSOLIDATION (SINGLE UNIFIED DOCK · 1 SPLIT BILL ENTRY · CONSOLIDATED VIEWPORT · 14 COBALT BRANCHES · 0 DEALS CLAIMED · PRODUCTION LOCKED)',
  section4Row: '| **Trạng Thái Giao Diện 103R** | `UX_CONSOLIDATED_ACTIVE` | Đã hoàn thành One-Screen UX Consolidation: Gộp 1 dock ngang duy nhất 5 pill; Dropdown quận tại header; 1 lối vào Chia Bill duy nhất mở bottom sheet; Viewport mobile tinh gọn; 14 chi nhánh Cobalt độc nhất; 0 Deal/Voucher giả; Khóa sản xuất tuyệt đối. |',
  section5CriteriaText: `### 🎯 Mục Tiêu JAYT-103R (ONE SCREEN UX CONSOLIDATION)

1. **Mục Tiêu Khách Hàng (Customer Objective)**:
   - "Một màn hình, một nhịp trải nghiệm": Người dùng mobile vào trang thấy ngay thông tin tinh gọn, không bị ngợp bởi danh sách dài; Khám phá địa điểm gần mình theo thời điểm trong ngày và chia tiền nhóm nhanh chóng với 1 chạm.
2. **Phạm Vi Tinh Gọn Giao Diện (7 Chỉ Thị Nghiêm Ngặt)**:
   - 1. Gộp time-slot và category thành 1 dock ngang duy nhất (\`apex-time-of-day-dock\`) gồm đúng 5 pill: 07:30, 11:15, 14:15, 17:30, 21:00; Bộ chọn quận đặt tại dropdown Header (\`#select-hub-district\`).
   - 2. Giữ duy nhất 1 lối vào Chia Bill: Bento CTA (\`#btn-open-calc-sheet\`) mở bottom sheet (\`#calc-bottom-sheet-overlay\`); Xóa section calculator dài và toàn bộ sticky calculator/footer overlay.
   - 3. Rút gọn viewport mobile đầu tiên: Header -> Unified Dock -> Hero Bento -> 2 Cobalt gần/ngữ cảnh nhất -> Community Signal; Danh sách 14 Cobalt mở rộng đặt sau nút "📂 Xem thêm 14 địa điểm Cobalt & Nguồn theo dõi ↓".
   - 4. Hero CTA minh bạch: "Khám phá địa điểm gần bạn ↓", không mô phỏng deal/voucher giả.
   - 5. Hiển thị 14 Cobalt theo quận và monogram thương hiệu với nhãn trung thực: "Địa điểm chính thức — ưu đãi online chưa đủ dữ kiện; kiểm tra trực tiếp tại quán."
   - 6. Bộ kiểm thử chống hồi quy: Đúng 1 dock, đúng 1 calculator entry point, 0 sticky calculator overlay, 0 tràn ngang mobile, 0 ảnh lỗi.
   - 7. Khóa sản xuất tuyệt đối deals_feed.json: [] (is_approved: false); Không tạo release candidate trong 103R.
3. **Điều Kiện Hoàn Thành (Completion Criteria)**:
   - Tất cả kiểm thử chống hồi quy và 9 suite QA PASS 100%; Visual evidence thật từ staging_instance (375px, 768px, 1440px).
4. **Ranh Giới Dữ Liệu (Data Boundary)**:
   - Cấm bịa đặt voucher/deal để làm đẹp UI; Hero duy trì Honest Empty State; deals_feed.json: [] và is_approved: false.
5. **Kỷ Luật Quản Trị Bất Biến**:
   - Không tạo release candidate trong 103R; không tự nhận ACCEPTED BY CEO cho 103R; duy trì khóa sản xuất.`,
  section6LogEntry: `| \`2026-08-25T16:34:00+07:00\` | \`JAYT-103R-ONE-SCREEN-UX-CONSOLIDATION\` | Hoàn thành One-Screen UX Consolidation: Gộp 1 dock ngang duy nhất 5 pill; Dropdown quận tại header; 1 lối vào Chia Bill mở Bottom Sheet; Rút gọn first viewport mobile; Expandable 14 Cobalt; Khóa sản xuất deals_feed.json: [] (is_approved: false); Không tạo candidate 103R. | [\`05_DEAL_AND_AFFILIATE/canonical_cobalt_branches_103.json\`](05_DEAL_AND_AFFILIATE/canonical_cobalt_branches_103.json), [\`08_RELEASE_VAULT/JAYT_ONE_SCREEN_UX_CONSOLIDATION_REVIEW_PACK_103R.md\`](08_RELEASE_VAULT/JAYT_ONE_SCREEN_UX_CONSOLIDATION_REVIEW_PACK_103R.md) | \`test_one_screen_ux_consolidation_103r.js\` (21/21 PASS) | **IN_PROGRESS — ONE SCREEN UX CONSOLIDATED** |`
});

console.log('✅ Transaction 103R Success:', res);
