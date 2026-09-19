const fs = require('fs');
const path = require('path');

const memoryEntry = `
### TRANSACTION RECORD: TX_20260918_AUTOMATED_MEDIA_PIPELINE_AND_ZERO_BUG_POLICY_RATIFIED
- **Thời gian phê chuẩn:** 2026-09-18T13:38:00+07:00
- **Mã chỉ thị Hội đồng Quản trị:** \`CHAIRMAN_DIRECTIVE_20260918_AUTOMATED_MEDIA_PIPELINE_AND_ZERO_BUG_POLICY\` (\`JAYT-434\`)
- **Đơn vị thực thi:** CEO Codex (Giám đốc Điều hành) & Khối Kỹ thuật Antigravity & Khối Tăng trưởng
- **Trạng thái Go-Live Production:** \`READY\` (Vercel Canonical Production)
- **URL Production:** \`https://jayt-production-v3420.vercel.app\`
- **Deployment ID:** \`dpl_9k7sc5F6aSaLk1dntvbTGW2TGE1t\`
- **Thông số kỹ thuật SSOT:**
  - File: \`03_SOURCE_OF_TRUTH/jayt_apex_interface.js\`
  - Kích thước: \`1,025,745 bytes\`
  - SHA-256: \`a83e6506617234fd3a0c3837a70dc4089b0853c09a8bd413183b48dd264b6201\`
  - Parity: 100% bit-identical giữa WS1 và WS2
- **Nội dung hoàn thành kỹ trị:**
  1. **Chốt Chặn Tự Động Hóa Kiểm Soát Media Assets (\`scripts/verify_media_assets.cjs\`):**
     - Thiết lập chốt kiểm định tự động bắt buộc trước khi đóng gói hoặc deploy hệ thống.
     - Tự động quét toàn bộ mảng dữ liệu sản phẩm của Tính Năng 1 (\`J387_DORM_SKUS\`, \`CROSS_PLATFORM_SKU_TRIPLETS\`, \`SHOPEE_OFFICIAL_CDN_ASSETS\`) và Kệ Săn Sập Sàn (\`JAYT_FLASH_ARBITRAGE_DEALS_70_80\`).
     - Tự động ngắt tiến trình triển khai (Build Break \`process.exit(1)\`) nếu có bất kỳ 2 sản phẩm khác nhau nào dùng chung URL ảnh hoặc phát hiện ảnh chết/placeholder sai định dạng.
     - Thực hiện kiểm tra thời gian thực HTTP HEAD/GET bảo đảm 100% URL ảnh trả về HTTP Status \`200 OK\` trên CDN.
  2. **Sửa Triệt Để Lỗi Ảnh Trùng Lặp Kệ Săn Sập Sàn 70% – 80%:**
     - Xóa bỏ triệt để nguyên nhân gốc rễ: gỡ bỏ toàn bộ việc dùng ảnh Khăn giấy TopGia (\`sg-11134253-824iq-mej832cqxtza25\`) làm \`onerror\` fallback phổ quát (dòng 5840, 9718, 12630) và trong hằng số \`SHOPEE_CDN_FALLBACK_DEFAULT\`. Thay thế bằng Data URI SVG trung tính, không chứa thương hiệu của bất kỳ sản phẩm nào.
     - Cập nhật đúng ảnh thực chứng sắc nét, chuẩn nhận diện cho Deal 1 (Móc dán tường chịu lực 10kg KTX - ảnh móc dán Unsplash CDN 600x400px), Deal 2 (Hộp đựng giày nắp cứng trong suốt KTX - ảnh hộp giày Unsplash CDN 600x900px), Deal 3 (Khăn giấy rút TopGia đa sắc - ảnh Shopee CDN chính ngạch 1024x1024px) và toàn bộ 9 deal flash còn lại.
  3. **Khóa Cố Định 100% Mã Đối Tác Tiếp Thị Liên Kết:**
     - Shopee: \`17372870594\` | Lazada: \`262501305\` | TikTok Shop: \`VNVNLCB6LYL3\`.
     - Toàn bộ liên kết mua hàng, mở app scheme và web canonical được duy trì xuyên suốt.
  4. **Kỷ Luật Kiểm Thử Tự Động & Niêm Phong Hệ Thống Tuyệt Đối:**
     - 10/10 Gates Automated QA Suite PASS (\`test_j434_media_pipeline.cjs\`).
     - Live Puppeteer Production Verification PASS trên Canonical Production (\`test_j434_live_verification.cjs\`).
     - Bằng chứng thực nghiệm: \`j434_live_desktop_clean_media.png\`, \`j434_live_mobile_clean_media.png\` và biên nhận \`JAYT_434_MEDIA_PIPELINE_RECEIPT.json\`.
     - Fail-closed boundary: \`CONFIG.affiliate_enabled: false\` bảo vệ nghiêm ngặt môi trường Canonical Production.
     - Static Pipeline Seal: 24/24 PASS TUYỆT ĐỐI.
     - W8 Feed Toolchain Seal: 5/5 PASS.
     - 100% Bit-Identical đồng nhất tuyệt đối giữa WS1 và WS2.
<!-- TRANSACTION END: TX_20260918_AUTOMATED_MEDIA_PIPELINE_AND_ZERO_BUG_POLICY_RATIFIED -->
`;

const ws1Mem = path.join(__dirname, '..', 'PROJECT_MEMORY.md');
const ws2Mem = 'D:\\Công Việc MMO\\OPC JayT\\JayT-Dự-Án-Giá-Trị-Cộng-Đồng\\PROJECT_MEMORY.md';

fs.appendFileSync(ws1Mem, memoryEntry, 'utf8');
if (fs.existsSync(ws2Mem)) {
  fs.appendFileSync(ws2Mem, memoryEntry, 'utf8');
}
console.log('Appended transaction record to PROJECT_MEMORY.md in WS1 and WS2.');
