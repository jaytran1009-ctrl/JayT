/**
 * JAYT PROJECT MEMORY TRANSACTION RUNNER (108R)
 * Directive: JAYT-108R-SUPPLY-TRUTH-AND-CANONICALIZATION
 */

const { applyProjectMemoryTransaction067 } = require('./memory_transaction_manager_057');

const section4Content = `| **Trạng Thái Giao Diện 108R** | \`UX_SUPPLY_TRUTH_CANONICALIZED\` | Đã hoàn tất JAYT-108R-SUPPLY-TRUTH-AND-CANONICALIZATION: (1) Chuẩn hóa 18 địa điểm Cobalt thành một dataset duy nhất khớp 100% từng ký tự địa chỉ và evidence pointer trích đoạn nguồn có mã băm SHA-256; (2) Thu thập bằng chứng duyệt web thực tế cho 32 discovery targets trong \`05_DEAL_AND_AFFILIATE/batch_capture_108/\` (26 targets thành công đạt \`SIGNAL_ONLY\` kèm SHA-256 tệp text + screenshot, 6 targets giới hạn truy cập giữ nguyên \`UNCAPTURED_DISCOVERY_SEED\` không tuyên bố ưu đãi); (3) Xóa bỏ 100% tiêu đề chứa giá/voucher/điều kiện giả định; (4) Tích hợp bộ test chặn tự động; (5) Giữ nguyên \`deals_feed.json: []\` (\`is_approved: false\`). |`;

const section5Content = `### 🎯 Mục Tiêu JAYT-108R (SUPPLY TRUTH AND CANONICALIZATION)

1. **Mục Tiêu Khách Hàng (Customer Objective)**:
   - Đảm bảo toàn bộ thông tin địa điểm và tín hiệu khám phá tại Đà Nẵng trên JayT đều dựa trên bằng chứng thu thập thực tế (Physical on-disk provenance), không hiển thị giá/voucher giả định cho các seed chưa capture, giữ vững sự tin cậy tuyệt đối của người dùng.
2. **Phạm Vi Kỹ Thuật & Cung Ứng Khám Phá (Technical Scope)**:
   - 1. Chuyển toàn bộ 32 discovery items sang mô hình bằng chứng: 26 mục capture thành công đạt \`SIGNAL_ONLY\` có artifact + hash; 6 mục chưa capture giữ \`UNCAPTURED_DISCOVERY_SEED\`.
   - 2. Tuyệt đối không hiển thị tiêu đề chứa giá, voucher, discount % giả định cho bất kỳ seed nào.
   - 3. Đồng nhất 18 địa điểm Cobalt thành 1 dataset duy nhất giữa \`four_layer_dataset.json\`, \`community_discovery_signals_manifest_108.json\`, và giao diện staging, khớp trích đoạn nguồn và mã băm.
   - 4. Capture thực tế lưu tại \`05_DEAL_AND_AFFILIATE/batch_capture_108/captures_108/\`.
   - 5. Bổ sung test chặn tự động cho 3 điều kiện: Lệch địa chỉ UI/manifest, Observed thiếu artifact, và Seed chứa số tiền trên UI.
   - 6. Khóa sản xuất \`deals_feed.json: []\` (\`is_approved: false\`); Candidate Freeze active; 0 external network requests.
3. **Điều Kiện Hoàn Thành (Completion Criteria)**:
   - Toàn bộ suite QA và kiểm thử 108R PASS 100%; 18 địa điểm giữ nguyên Monogram thương hiệu + outbound link; Visual evidence chụp từ staging instance ở 375px, 768px, 1440px.
4. **Ranh Giới Dữ Liệu (Data Boundary)**:
   - 18 chi nhánh xác minh từ nguồn, không phải ưu đãi; không phát hành voucher/deal; \`deals_feed.json: []\` và \`is_approved: false\`.
5. **Kỷ Luật Quản Trị Bất Biến**:
   - Cập nhật bộ nhớ duy nhất qua \`applyProjectMemoryTransaction067\`; không tạo release candidate; không tự nhận ACCEPTED BY CEO.`;

const section6Log = `| \`2026-08-25T18:21:00+07:00\` | \`JAYT-108R-SUPPLY-TRUTH-AND-CANONICALIZATION\` | Cung Ứng Khám Phá & Đối Soát Nguồn 108R: (1) Chuẩn hóa 18 địa chỉ Cobalt duy nhất có evidence pointer + SHA-256; (2) Capture 32 URLs (26 \`SIGNAL_ONLY\`, 6 \`UNCAPTURED_DISCOVERY_SEED\`); (3) Không có giá/voucher giả định; (4) Test chặn lệch địa chỉ & fake claims; (5) Khóa sản xuất \`deals_feed.json: []\` và \`is_approved: false\`. | [\`03_SOURCE_OF_TRUTH/jayt_apex_interface.js\`](03_SOURCE_OF_TRUTH/jayt_apex_interface.js), [\`05_DEAL_AND_AFFILIATE/community_discovery_signals_manifest_108.json\`](05_DEAL_AND_AFFILIATE/community_discovery_signals_manifest_108.json), [\`07_QUALITY_ASSURANCE/test_community_discovery_supply_108.js\`](07_QUALITY_ASSURANCE/test_community_discovery_supply_108.js) | \`test_community_discovery_supply_108.js\` | **IMPLEMENTED — PENDING CEO AUDIT** |`;

const result = applyProjectMemoryTransaction067({
  version: '3.216.0',
  workOrder: 'JAYT-108R-SUPPLY-TRUTH-AND-CANONICALIZATION',
  workOrderDescription: 'Chuẩn hóa dataset Cobalt duy nhất 18 địa chỉ đối soát trích đoạn nguồn; thu thập capture thật 32 URL discovery seeds (26 SIGNAL_ONLY có SHA-256 tệp + ảnh, 6 UNCAPTURED_DISCOVERY_SEED); loại bỏ claim giá/voucher giả định; khóa sản xuất',
  headerStatusLine: '108R: IMPLEMENTED — PENDING CEO AUDIT (SUPPLY TRUTH & CANONICALIZATION · 18 CANONICAL COBALT VENUES · 26 CAPTURED SIGNALS + 6 UNCAPTURED SEEDS · CONTAINMENT TESTED · PRODUCTION LOCKED)',
  section4Row: section4Content,
  section5CriteriaText: section5Content,
  section6LogEntry: section6Log
});

console.log('✅ TRANSACTION_108R_SUCCESSFUL');
console.log('FINAL_MEMORY_HASH:', result.finalHash);
console.log('TRANSACTION_RECEIPT:', result.transactionReceiptPath);
console.log('HANDOVER_BLOCK:\n' + result.handoverBlock);
