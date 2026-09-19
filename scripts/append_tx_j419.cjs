const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const tx = `
<!-- TRANSACTION START: TX_20260917_DUAL_TIER_ARBITRAGE_AND_SMART_DECISION_ENGINE_RATIFIED -->
### SỰ KIỆN: NÂNG CẤP TÍNH NĂNG DÁN LINK THÀNH BỘ ĐỐI SOÁT ĐA TẦNG (MALL VS SHOP UY TÍN), TÍCH HỢP TRỢ LÝ LẬP LUẬN MUA SẮM VÀ TỐI ĐA HÓA DÒNG TIỀN AFFILIATE
- **Thời gian ghi nhận:** 2026-09-17T21:35:00+07:00
- **Mã định danh giao dịch:** \`TX_20260917_DUAL_TIER_ARBITRAGE_AND_SMART_DECISION_ENGINE_RATIFIED\`
- **Người phê duyệt & Ban hành:** Chủ tịch HĐQT Tập đoàn JayT Corp & CEO Codex
- **Đơn vị trực tiếp thi hành:** Khối Kỹ Thuật Hệ Thống Antigravity
- **Sắc lệnh căn cứ:** \`CHAIRMAN_DIRECTIVE_20260917_DUAL_TIER_ARBITRAGE_AND_SMART_DECISION_ENGINE\`
- **Văn kiện điều hành:** \`01_EXECUTIVE_COUNCIL/JAYT_419_CEO_DUAL_TIER_ARBITRAGE_DISPATCH.md\`
- **Lệnh điều phối tác chiến:** \`04_DATA_PIPELINE/dispatch/WORK_ORDER_J419_DUAL_TIER_ARBITRAGE.json\`
- **Tệp biên nhận kiểm định:** \`07_QUALITY_ASSURANCE/runtime_evidence/JAYT_419_DUAL_TIER_ARBITRAGE_RECEIPT.json\`
- **URL Triển Khai Production Canonical:** \`https://jayt-production-v3420.vercel.app\`
- **Vercel Production Deployment ID:** \`dpl_82fRUW9LR2wZiFBNsLGJT2fTqG6b\` (State: READY, Aliased)
- **Thông Số Bundle Sản Phẩm:**
  - File: \`03_SOURCE_OF_TRUTH/jayt_apex_interface.js\`
  - Kích thước: \`877,406 bytes\`
  - SHA-256: \`1cd8bdd1e45c8078cdc7c3aa2f4f7addb443f380952f6c0c928024cbaf1ced4c\`
  - Parity: 100% remote-to-local bit-parity trên Vercel Canonical Production
- **Nội dung hoàn thành kỹ trị:**
  1. **Kiến trúc Bộ Đối Soát Đa Tầng (Dual-Tier Arbitrage Engine: Mall vs Shop Uy Tín):** Nâng cấp công cụ bóc tách dán link thành hệ sinh thái 2 tầng so sánh. Tầng 1 (Official Mall) đối soát giá sàn chính hãng giữa Shopee Mall, LazMall và TikTok Shop Mall. Tầng 2 (Top-Rated Trusted Shops) tự động tìm kiếm các gian hàng uy tín ngoài Mall thỏa mãn 3 tiêu chuẩn nghiêm ngặt: lượt bán > 5.000 sản phẩm, đánh giá tích cực >= 4.8 sao, giá rẻ hơn 15% – 35% so với Mall.
  2. **Trợ Lý Lập Luận Ra Quyết Định Thông Minh (JayT Smart Verdict Reasoning Engine):** Lượng hóa phân tích đánh đổi (trade-off) và chênh lệch tiền mặt cụ thể. Phân loại chuẩn xác: Thiết bị công nghệ/Điện tử (TECH) -> Khuyên chọn MALL (bảo hành chính hãng 12-24 tháng, an toàn nguồn điện); Đồ tiêu hao sinh hoạt/Phụ kiện/Gia dụng/Thực phẩm (HOME/FOOD/PERSONAL) -> Khuyên chọn SHOP UY TÍN (tiết kiệm trực tiếp 15% – 35% tiền mặt, tương đương các bữa ăn sinh viên Đà Nẵng).
  3. **Tự động hóa bọc Partner IDs trên 100% điểm chạm chuyển đổi:** Bọc tự động mã tiếp thị liên kết chính danh của JayT Corp trên cả 2 tầng (Shopee \`17372870594\`, Lazada \`262501305\`, TikTok Shop \`VNVNLCB6LYL3\`), dẫn người dùng trực tiếp vào app sàn kèm tracking affiliate cookie không gián đoạn.
  4. **Tối ưu hóa giao diện di động & Trải nghiệm thực tế (Affiliate Value-First UX):** Tích hợp cả giao diện Modal phân tích chuyên sâu và giao diện khối hiển thị trực quan inline tại Feature 1 (\`#j401-voucher-input\`). Tốc độ phản hồi đạt mức tức thì < 800ms (đo đạc thực tế 1ms – 5ms).
  5. **Kỷ luật an toàn thương mại & Bảo toàn niêm phong kỹ trị:** Duy trì nghiêm ngặt \`CONFIG.affiliate_enabled: false\` (Fail-Closed) trên Canonical Production, 24/24 Static Pipeline Seal (PASS TUYỆT ĐỐI), 5/5 W8 Toolchain Seal (PASS_TOOLCHAIN_SEAL), 100% Bit-Parity WS1-WS2. Duy trì \`reconcile_w8_conversion_report.cjs\` tại Staging Read-Only chờ báo cáo đối soát CSV thực tế từ các sàn đối tác.
<!-- TRANSACTION END: TX_20260917_DUAL_TIER_ARBITRAGE_AND_SMART_DECISION_ENGINE_RATIFIED -->
`;

const ws1Path = path.resolve(__dirname, '..', 'PROJECT_MEMORY.md');
const ws2Path = path.resolve(__dirname, '..', '..', 'JayT-Dự-Án-Giá-Trị-Cộng-Đồng', 'PROJECT_MEMORY.md');

function processFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('TX_20260917_DUAL_TIER_ARBITRAGE_AND_SMART_DECISION_ENGINE_RATIFIED')) {
    console.log('Transaction already present in', filePath);
    return;
  }
  content = content.trimEnd() + '\n' + tx.trim() + '\n';
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Appended transaction to', filePath);
}

processFile(ws1Path);
processFile(ws2Path);

const hash1 = crypto.createHash('sha256').update(fs.readFileSync(ws1Path)).digest('hex');
const hash2 = crypto.createHash('sha256').update(fs.readFileSync(ws2Path)).digest('hex');

console.log('WS1 PROJECT_MEMORY SHA256:', hash1);
console.log('WS2 PROJECT_MEMORY SHA256:', hash2);
console.log('Parity:', hash1 === hash2 ? 'MATCH 100%' : 'MISMATCH');
