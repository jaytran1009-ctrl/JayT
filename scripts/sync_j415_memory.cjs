const fs = require('fs');
const path = require('path');

const WS1 = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const WS2 = 'd:/Công Việc MMO/OPC JayT/JayT-Dự-Án-Giá-Trị-Cộng-Đồng';

const entry = `
<!-- TRANSACTION START: TX_20260917_HOTFIX_PDP_DEADLINK_AND_PRICE_PARITY_RATIFIED -->
### SỰ KIỆN: KHẮC PHỤC TRIỆT ĐỂ LỖI LINK 404 LAZADA, LỆCH GIÁ THỜI GIAN THỰC VÀ NGHẼN APP TRÊN MESSENGER/ZALO WEBVIEW THEO CHỈ THỊ KHẨN CỦA CHỦ TỊCH HĐQT
- **Thời gian ghi nhận:** 2026-09-17T15:40:00+07:00
- **Mã định danh giao dịch:** \`TX_20260917_HOTFIX_PDP_DEADLINK_AND_PRICE_PARITY_RATIFIED\`
- **Người phê duyệt & Ban hành:** Chủ tịch HĐQT Tập đoàn JayT Corp & CEO Codex
- **Đơn vị trực tiếp thi hành:** Khối Kỹ Thuật Hệ Thống Antigravity
- **Sắc lệnh căn cứ:** \`CHAIRMAN_DIRECTIVE_20260917_HOTFIX_PDP_DEADLINK_AND_PRICE_PARITY\`
- **Văn kiện điều hành:** \`01_EXECUTIVE_COUNCIL/JAYT_415_CEO_HOTFIX_PDP_DEADLINK_AND_PRICE_PARITY_DISPATCH.md\`
- **Lệnh điều phối tác chiến:** \`04_DATA_PIPELINE/dispatch/WORK_ORDER_J415_HOTFIX_PDP_DEADLINK_AND_PRICE_PARITY.json\`
- **Tệp biên nhận kiểm định:** \`07_QUALITY_ASSURANCE/runtime_evidence/JAYT_415_HOTFIX_DEADLINK_AND_PRICE_PARITY_RECEIPT.json\`
- **URL Triển Khai Production Canonical:** \`https://jayt-production-v3420.vercel.app\`
- **Vercel Production Deployment ID:** \`dpl_BcRBMyZMwqNjFqYkBzCHe5j3Xdiw\` (State: READY, Aliased)
- **Thông Số Bundle Sản Phẩm:**
  - File: \`03_SOURCE_OF_TRUTH/jayt_apex_interface.js\`
  - Kích thước: \`841,281 bytes\`
  - SHA-256: \`4d4a5026ecfb24454caec28e9e09ae2412de3188b79be3473ac4eb39e9ef7fbe\`
  - Parity: 100% remote-to-local bit-parity trên Vercel Canonical Production
- **Nội dung khắc phục & kết quả kỹ trị:**
  1. **Quét sạch link chết (Deadlink Elimination):**
     - Loại bỏ toàn bộ regex URL giả lập \`i...-s...\` trên Lazada và mã số giả lập trên TikTok Shop.
     - 100% (10/10) sản phẩm Lazada và 4/4 sản phẩm TikTok chưa có gian hàng Mall chính thức được cấu hình minh bạch \`available: false\`, \`pdpUrl: undefined\`, nút bấm khóa cứng \`🔒 Chưa Có Link Chính Hãng\` (\`disabled\`), tuyệt đối không dẫn link 404 hoặc tìm kiếm rác.
  2. **Khắc phục lệch giá hiển thị (Price Parity):**
     - Khăn giấy TopGia (\`DORM_SKU_FEED_01_23552060269\`): Căn chỉnh giá sàn từ \`103.750₫\` (thay vì 125.000₫).
     - Củ sạc Ugreen GaN 30W (\`DORM_SKU_FEED_06_28818204493\`): Căn chỉnh giá sàn từ \`202.500₫\` (thay vì 225.000₫).
     - Bổ sung ghi chú minh bạch dưới bảng đối soát trong Modal: *"💡 Ghi chú từ JayT: Giá thực tế có thể giảm sâu hơn tùy hạng thành viên và khung giờ Flash Sale của sàn."*
  3. **Cơ chế Webview Breakout trên Messenger/Zalo:**
     - Nhận diện chính xác in-app browser thông qua \`isMessengerOrZaloWebview()\` (\`FBAN\`, \`FBAV\`, \`FB_IAB\`, \`Zalo\`, \`ZaloTheme\`).
     - Tự động hiển thị thanh thông báo cảnh báo dính trên đầu trang nhắc nhở mở trình duyệt ngoài.
     - Khi bấm nhận ưu đãi trong Webview: Tự động sao chép mã voucher vào clipboard và hiển thị modal hướng dẫn 2 bước mở Safari/Chrome (kèm Android Chrome Intent \`intent://...\`).
  4. **Kỷ luật an toàn & Niêm phong:**
     - 24/24 Static Pipeline Seal PASS TUYỆT ĐỐI.
     - 5/5 W8 Toolchain Seal PASS_TOOLCHAIN_SEAL.
     - 5/5 J415 Test Suite PASS 100%.
     - Duy trì \`CONFIG.affiliate_enabled: false\` fail-closed bảo vệ thương hiệu.
<!-- TRANSACTION END: TX_20260917_HOTFIX_PDP_DEADLINK_AND_PRICE_PARITY_RATIFIED -->
`;

const mem1 = path.join(WS1, 'PROJECT_MEMORY.md');
const mem2 = path.join(WS2, 'PROJECT_MEMORY.md');

fs.appendFileSync(mem1, entry);
fs.writeFileSync(mem2, fs.readFileSync(mem1));
console.log('Appended and synced PROJECT_MEMORY.md on WS1 and WS2');

// Also sync work order, receipt, and dispatch md
const filesToSync = [
  '04_DATA_PIPELINE/dispatch/WORK_ORDER_J415_HOTFIX_PDP_DEADLINK_AND_PRICE_PARITY.json',
  '07_QUALITY_ASSURANCE/runtime_evidence/JAYT_415_HOTFIX_DEADLINK_AND_PRICE_PARITY_RECEIPT.json',
  '01_EXECUTIVE_COUNCIL/JAYT_415_CEO_HOTFIX_PDP_DEADLINK_AND_PRICE_PARITY_DISPATCH.md'
];

for (const f of filesToSync) {
  const p1 = path.join(WS1, f);
  const p2 = path.join(WS2, f);
  fs.writeFileSync(p2, fs.readFileSync(p1));
  console.log('Synced to WS2:', f);
}
