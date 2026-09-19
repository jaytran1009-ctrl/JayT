const fs = require('fs');
const crypto = require('crypto');

const tx = `
<!-- TRANSACTION START: TX_20260917_RATIFY_J414_FIX_AND_LAUNCH_DANANG_GO_LIVE_RATIFIED -->
### SỰ KIỆN: CHỦ TỊCH HĐQT BAN HÀNH SẮC LỆNH CHUẨN Y KẾT QUẢ SỬA LỖI NÚT "SO GIÁ 3 SÀN", KHÓA KỶ CƯƠNG "THẬT 100% HOẶC KHÔNG HIỂN THỊ" VÀ CEO CODEX PHÁT LỆNH GO-LIVE TOÀN THÀNH PHỐ ĐÀ NẴNG (320.000 DÂN CƯ)
- **Thời gian ghi nhận:** 2026-09-17T15:10:00+07:00
- **Mã định danh giao dịch:** \`TX_20260917_RATIFY_J414_FIX_AND_LAUNCH_DANANG_GO_LIVE_RATIFIED\`
- **Người phê duyệt & Ban hành:** Chủ tịch HĐQT Tập đoàn JayT Corp & CEO Codex
- **Đơn vị trực tiếp thi hành:** Toàn bộ Khối Kỹ Thuật Hệ Thống Antigravity & Khối Vận Hành Tăng Trưởng Cộng Đồng
- **Sắc lệnh căn cứ:** \`CHAIRMAN_DIRECTIVE_20260917_RATIFY_J414_FIX_AND_LAUNCH_DANANG_GO_LIVE\`
- **Văn kiện điều hành:** \`01_EXECUTIVE_COUNCIL/JAYT_415_CEO_RATIFY_J414_FIX_AND_LAUNCH_DANANG_GO_LIVE_DISPATCH.md\`
- **Lệnh điều phối tác chiến:** \`04_DATA_PIPELINE/dispatch/WORK_ORDER_J415_RATIFY_J414_FIX_AND_LAUNCH_DANANG_GO_LIVE.json\`
- **Tệp biên nhận kiểm định:** \`07_QUALITY_ASSURANCE/runtime_evidence/JAYT_414_COMPARISON_BUTTON_MODAL_AUDIT_RECEIPT.json\`
- **URL Triển Khai Production Canonical:** \`https://jayt-production-v3420.vercel.app\`
- **Vercel Production Deployment ID:** \`dpl_BFAjGC5z7xVb4KwrL59sDzczhEq4\` (State: READY, Aliased)
- **Thông Số Bundle Sản Phẩm:**
  - File: \`03_SOURCE_OF_TRUTH/jayt_apex_interface.js\`
  - Kích thước: \`837,506 bytes\`
  - SHA-256: \`1e6d3ee2626c80a853f83e27bf47c3d3e31a35f5e79e73d8fc8102079413a35d\`
  - Parity: 100% remote-to-local bit-parity trên Vercel Canonical Production
- **Nội dung phê chuẩn & phát lệnh tác chiến:**
  1. **Chuẩn y nghiệm thu kết quả kỹ trị phiên J414:**
     - Khắc phục hoàn toàn lỗi nút "⚡ So Giá 3 Sàn": Bổ sung bảng ánh xạ O(1) \`SHELF_SKU_TO_TRIPLET_MAP\` kết nối 100% (20/20) sản phẩm kệ KTX sang Triplet hợp đồng, mở rộng \`matchKeys\` đầy đủ định danh biến thể (\`modelId\`, \`skuId\`, \`variant_id\`).
     - Quy tụ luồng hiển thị về modal chuẩn \`#jayt-voucher-scanner-modal\`, ép cứng CSS \`z-index: 99999 !important; display: flex !important;\`, khóa cuộn trang nền (\`document.body.style.overflow = "hidden"\`) và mở tức thì trong <100ms.
     - Tích hợp mượt mà 3 cơ chế đóng: nút ✕, phím Escape, chạm backdrop ngoài.
     - Khóa cứng nguyên tắc "Thật 100% hoặc Không hiển thị": hiển thị nhãn \`[Chưa Có Link Chính Hãng]\` và khóa nút \`🔒 Chưa Có Link Chính Hãng\` (\`disabled\`) khi đối thủ thiếu gian hàng Mall, tuyệt đối cấm dẫn link tìm kiếm rác.
     - Xác nhận bộ chỉ số kỹ trị: 24/24 Static Pipeline Seal, 5/5 W8 Toolchain Seal, 5/5 J414 Comparison Button Tests PASS, 4/4 Feature 01 Pillars PASS, 100% Bit-Parity giữa WS1 và WS2.
  2. **Kích hoạt chiến dịch Go-Live toàn diện Đà Nẵng — Chiến thuật "Gọng Kìm Sông Hàn" (320.000 dân cư):**
     - *Mũi 1 (Thứ Hai – Thứ Tư):* Cụm ĐH Bách Khoa & Sư Phạm Hòa Khánh (~45.000 SV) qua Kệ KTX giá đáy <= 49k, Shopee Live 50%, cẩm nang DanaBus 130k và Zalo Deal Pass 1080x1440 chia tiền nhóm tròn đồng tạo vòng lặp lan tỏa 0 đồng.
     - *Mũi 2 (Thứ Năm – Thứ Bảy):* Trục Văn Phòng Nguyễn Văn Linh (~200.000 NVVP) bằng Trọng tài Pick-up cơm trưa rẻ hơn 20k–30k/suất, so sánh sạc GaN, chuột silent 3 sàn, VietQR chia bill văn phòng tròn đồng.
     - *Mũi 3 (Chủ Nhật):* Kích hoạt phân hệ Lịch Kèo Rạp 7 Ngày (Metiz 45K, Galaxy 50K) và Cashier HUD giảm 10%–15% tại quầy 11 chuỗi F&B toàn thành phố.
  3. **Kỷ luật an toàn Fail-Closed & Chuẩn bị kích hoạt Affiliate thương mại:**
     - Duy trì nghiêm ngặt \`CONFIG.affiliate_enabled: false\` trên Production Canonical trong đợt phát động đầu để bảo vệ tài khoản đối tác; hàm \`dispatchSmartAffiliate()\` điều hướng URL Canonical sạch.
     - Duy trì \`scripts/reconcile_w8_conversion_report.cjs\` ở trạng thái Staging Read-Only thường trực để tiếp nhận tệp CSV đối soát từ Shopee Portal (\`17372870594\`), Lazada (\`262501305\`), TikTok Shop (\`VNVNLCB6LYL3\`) khi có đơn hàng tự nhiên, làm căn cứ trình Cơ chế Dual-Key ký duyệt mở cờ thương mại \`affiliate_enabled: true\` vĩnh viễn.
<!-- TRANSACTION END: TX_20260917_RATIFY_J414_FIX_AND_LAUNCH_DANANG_GO_LIVE_RATIFIED -->
`;

const paths = [
  'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/PROJECT_MEMORY.md',
  'd:/Công Việc MMO/OPC JayT/JayT-Dự-Án-Giá-Trị-Cộng-Đồng/PROJECT_MEMORY.md'
];

paths.forEach(p => {
  fs.appendFileSync(p, tx, 'utf8');
  console.log('Appended to:', p);
});

const h1 = crypto.createHash('sha256').update(fs.readFileSync(paths[0])).digest('hex');
const h2 = crypto.createHash('sha256').update(fs.readFileSync(paths[1])).digest('hex');
console.log('PROJECT_MEMORY bit-parity:', h1 === h2);
