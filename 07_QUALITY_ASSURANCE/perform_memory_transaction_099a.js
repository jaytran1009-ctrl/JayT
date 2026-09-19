const { applyProjectMemoryTransaction067 } = require('./memory_transaction_manager_057.js');

const res = applyProjectMemoryTransaction067({
  version: '3.203.0',
  workOrder: 'JAYT-099A-PROVENANCE-CONTAINMENT',
  workOrderDescription: 'Cô lập sự cố synthetic capture 099; Ban hành disclosure receipt append-only; Giữ nguyên 18 địa điểm Cobalt đã kiểm toán; Khóa sản xuất tuyệt đối',
  headerStatusLine: '099A: IN_PROGRESS — PROVENANCE CONTAINMENT & AUDITED 18 COBALT VENUES (NO RELEASE CANDIDATE · PRODUCTION LOCKED)',
  section4Row: '| **Trạng Thái Giao Diện 099A** | `PROVENANCE_CONTAINMENT_ACTIVE` | Đã cô lập batch_capture_099 vào quarantine vault; Ban hành disclosure receipt; Giữ 18 địa điểm Cobalt kiểm toán thực tế; Khóa sản xuất tuyệt đối. |',
  section5CriteriaText: `### 🎯 Mục Tiêu JAYT-099A (PROVENANCE CONTAINMENT)

1. **Mục Tiêu Khách Hàng (Customer Objective)**:
   - Bảo vệ sự thật và quyền lợi của người dùng Đà Nẵng: "Không bịa đặt chứng cứ, không tự tạo dữ liệu thay thế browser capture." Cung cấp 18 địa điểm Cobalt đã kiểm toán thực tế và minh bạch trạng thái theo dõi cho Ngũ Hành Sơn.
2. **Phạm Vi Batch Lớn (Batch Scope 6 Hạng Mục)**:
   - 1. Cô lập toàn bộ artifact sinh từ batch_capture_099 vào \`05_DEAL_AND_AFFILIATE/quarantine_vault_099_synthetic_capture_incident/\`.
   - 2. Ban hành biên lai công bố \`08_RELEASE_VAULT/DISCLOSURE_RECEIPT_099_SYNTHETIC_CAPTURE_CONTAINMENT.json\` ghi nhận chi tiết vi phạm synthetic capture.
   - 3. Hạ 4 địa điểm sinh từ batch 099 về BRAND_MONITORED_ONLY / AMBER; Loại khỏi số liệu Cobalt; Ngũ Hành Sơn hiển thị 0 Cobalt (Watchlist Only).
   - 4. Quy định collector fail-closed: Không có response/DOM/screenshot thật => FAILED_CAPTURE; Cấm ghi metadata vào raw artifact; Cấm default HTTP 200.
   - 5. Bổ sung kiểm thử negative phát hiện synthetic capture, HTML tự tạo và HTTP status giả.
   - 6. Duy trì khóa sản xuất tuyệt đối deals_feed.json: [] (is_approved: false); Không tạo release candidate trong 099A.
3. **Điều Kiện Hoàn Thành (Completion Criteria)**:
   - 100% artifact 099 được cô lập; 18 địa điểm Cobalt có capture thật trên đĩa; vượt qua 100% bài kiểm thử tự động.
4. **Ranh Giới Dữ Liệu (Data Boundary)**:
   - Cấm khẳng định "đang giảm", "có voucher", "rẻ hơn" cho tầng Cobalt/Amber; comparator thiếu input trả SIGNAL_ONLY; deals_feed.json: [] và is_approved: false.
5. **Kỷ Luật Quản Trị Bất Biến**:
   - Tuyệt đối không tạo release candidate trong 099A; không tự gán ACCEPTED/CEO APPROVED cho 099A; duy trì khóa sản xuất.`,
  section6LogEntry: `| \`2026-08-25T16:00:00+07:00\` | \`JAYT-099A-PROVENANCE-CONTAINMENT\` | Thực thi cô lập sự cố synthetic capture 099 và kiểm toán 18 địa điểm Cobalt thực tế: (1) Cô lập batch_capture_099 vào quarantine vault; (2) Ban hành disclosure receipt 099; (3) Hạ 4 địa điểm xuống brand signals; (4) Giữ 18 địa điểm Cobalt có capture thực; (5) Negative tests chặn synthetic fallback; (6) Khóa sản xuất deals_feed.json: [] (is_approved: false); Không tạo release candidate trong 099A. | [\`08_RELEASE_VAULT/DISCLOSURE_RECEIPT_099_SYNTHETIC_CAPTURE_CONTAINMENT.json\`](08_RELEASE_VAULT/DISCLOSURE_RECEIPT_099_SYNTHETIC_CAPTURE_CONTAINMENT.json), [\`08_RELEASE_VAULT/JAYT_PROVENANCE_CONTAINMENT_REVIEW_PACK_099A.md\`](08_RELEASE_VAULT/JAYT_PROVENANCE_CONTAINMENT_REVIEW_PACK_099A.md) | \`test_provenance_containment_099a.js\` (17/17 PASS) | **IN_PROGRESS — PROVENANCE CONTAINMENT ACTIVE** |`
});

console.log('✅ Transaction 099A Success:', res);
