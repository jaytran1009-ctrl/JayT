/**
 * JAYT PROJECT MEMORY TRANSACTION RUNNER (106)
 * Directive: JAYT-106-OFFICIAL-STORE-PHOTO-PROVENANCE
 */

const { applyProjectMemoryTransaction067 } = require('./memory_transaction_manager_057');

const section4Content = `| **Trạng Thái Giao Diện 106** | \`UX_OFFICIAL_STORE_PROVENANCE_ACTIVE\` | Đã hoàn tất JAYT-106-OFFICIAL-STORE-PHOTO-PROVENANCE: (1) Gỡ bỏ toàn bộ ảnh AI khỏi render của card địa điểm và hero có ngữ cảnh cửa hàng; (2) Thu thập và trích xuất 6 ảnh thật từ website/store locator chính thức (Galaxy Co.opmart, CGV Vĩnh Trung, Phê La Bạch Đằng, Gong Cha NVL, Jollibee Vincom, Metiz Helio) với đầy đủ source_url, captured_at, SHA-256 và quyền hiển thị; (3) 12 địa điểm chưa có quyền phân phối ảnh áp dụng nghiêm ngặt fallback Monogram + nút 'Xem không gian tại kênh chính thức ↗' (0 copy ảnh trôi nổi); (4) Gắn nhãn 'Ảnh từ kênh chính thức — chỉ xác nhận không gian/địa điểm, không xác nhận giá hoặc ưu đãi'; (5) Khóa sản xuất \`deals_feed.json: []\` (\`is_approved: false\`). |`;

const section5Content = `### 🎯 Mục Tiêu JAYT-106 (OFFICIAL STORE PHOTO PROVENANCE)

1. **Mục Tiêu Khách Hàng (Customer Objective)**:
   - Trải nghiệm khám phá địa điểm trung thực, tin cậy tuyệt đối: hình ảnh gắn với cửa hàng phải là ảnh thật từ website chính thức của thương hiệu; địa điểm chưa có ảnh phân phối được điều hướng thẳng về kênh chính thức, không hiển thị ảnh AI gây hiểu nhầm không gian thật.
2. **Phạm Vi Kỹ Thuật & Quản Trị Bản Quyền (Technical Scope)**:
   - 1. Gỡ 100% ảnh AI khỏi render card địa điểm và Hero Media Zone.
   - 2. Thu thập và đối soát ảnh thật từ kênh chính thức (Galaxy, CGV, Phê La, Gong Cha, Jollibee, Metiz) lưu tại \`assets/official-store-photos/\` kèm \`05_DEAL_AND_AFFILIATE/official_store_photo_manifest_106.json\`.
   - 3. Tuyệt đối không lấy ảnh Google Maps, review cá nhân, Facebook/TikTok của bên thứ ba hoặc ảnh không rõ quyền. Nơi chưa có quyền: dùng Monogram thương hiệu + nút "Xem không gian tại kênh chính thức ↗".
   - 4. Gắn nhãn minh bạch: "Ảnh từ kênh chính thức — chỉ xác nhận không gian/địa điểm, không xác nhận giá hoặc ưu đãi".
   - 5. Khóa sản xuất \`deals_feed.json: []\` (\`is_approved: false\`); Candidate Freeze active; 0 external network requests.
3. **Điều Kiện Hoàn Thành (Completion Criteria)**:
   - Toàn bộ suite QA và kiểm thử 106 PASS 100%; 0 Broken images; Visual evidence chụp lại từ staging instance sạch sẽ ở 375px, 768px, 1440px.
4. **Ranh Giới Dữ Liệu (Data Boundary)**:
   - 18 chi nhánh xác minh từ nguồn, không phải ưu đãi; không phát hành voucher/deal; \`deals_feed.json: []\` và \`is_approved: false\`.
5. **Kỷ Luật Quản Trị Bất Biến**:
   - Cập nhật bộ nhớ duy nhất qua \`applyProjectMemoryTransaction067\`; không tạo release candidate; không tự nhận ACCEPTED BY CEO.`;

const section6Log = `| \`2026-08-25T17:53:00+07:00\` | \`JAYT-106-OFFICIAL-STORE-PHOTO-PROVENANCE\` | Đối Soát Ảnh Thật Kênh Chính Thức 106: (1) Gỡ 100% ảnh AI khỏi card địa điểm & hero; (2) Tích hợp 6 thumbnail ảnh thật có provenance; (3) Fallback Monogram + link kênh chính thức cho 12 địa điểm; (4) Khóa sản xuất \`deals_feed.json: []\` và \`is_approved: false\`. | [\`03_SOURCE_OF_TRUTH/jayt_apex_interface.js\`](03_SOURCE_OF_TRUTH/jayt_apex_interface.js), [\`05_DEAL_AND_AFFILIATE/official_store_photo_manifest_106.json\`](05_DEAL_AND_AFFILIATE/official_store_photo_manifest_106.json), [\`07_QUALITY_ASSURANCE/test_official_store_photo_provenance_106.js\`](07_QUALITY_ASSURANCE/test_official_store_photo_provenance_106.js) | \`test_official_store_photo_provenance_106.js\` | **IMPLEMENTED — PENDING CEO AUDIT** |`;

const result = applyProjectMemoryTransaction067({
  version: '3.213.0',
  workOrder: 'JAYT-106-OFFICIAL-STORE-PHOTO-PROVENANCE',
  workOrderDescription: 'Gỡ bỏ 100% ảnh AI khỏi card địa điểm & hero; xác lập manifest ảnh thật từ kênh chính thức (Galaxy, CGV, Phê La, Gong Cha, Jollibee, Metiz) với SHA-256; áp dụng fallback Monogram + Xem không gian tại kênh chính thức; khóa sản xuất',
  headerStatusLine: '106: IMPLEMENTED — PENDING CEO AUDIT (OFFICIAL STORE PHOTO PROVENANCE · 6 AUTHENTIC STORE PHOTOS · FALLBACK BRAND MONOGRAMS · ZERO AI STOREFRONT PHOTOS · 18 SOURCED LOCATIONS · PRODUCTION LOCKED)',
  section4Row: section4Content,
  section5CriteriaText: section5Content,
  section6LogEntry: section6Log
});

console.log('✅ TRANSACTION_106_SUCCESSFUL');
console.log('FINAL_MEMORY_HASH:', result.finalHash);
console.log('TRANSACTION_RECEIPT:', result.transactionReceiptPath);
console.log('HANDOVER_BLOCK:\n' + result.handoverBlock);
