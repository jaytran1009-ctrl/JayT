const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const tx = `
<!-- TRANSACTION START: TX_20260918_UPGRADE_ADVISORY_ENGINE_AND_DANANG_GO_LIVE_RATIFIED -->
### SỰ KIỆN: NÂNG CẤP TÍNH NĂNG DÁN LINK THÀNH TRỢ LÝ TRỌNG TÀI MUA SẮM THÔNG MINH (JAYT BUYING ADVISORY ENGINE) CHO THỊ TRƯỜNG ĐÀ NẴNG
- **Thời gian ghi nhận:** 2026-09-17T22:45:00+07:00
- **Mã định danh giao dịch:** \`TX_20260918_UPGRADE_ADVISORY_ENGINE_AND_DANANG_GO_LIVE_RATIFIED\`
- **Người phê duyệt & Ban hành:** Chủ tịch HĐQT Tập đoàn JayT Corp & CEO Codex
- **Đơn vị trực tiếp thi hành:** Khối Kỹ Thuật Hệ Thống Antigravity
- **Sắc lệnh căn cứ:** \`CHAIRMAN_DIRECTIVE_20260918_UPGRADE_ADVISORY_ENGINE_AND_DANANG_GO_LIVE\` (JAYT-421)
- **Văn kiện điều hành:** \`01_EXECUTIVE_COUNCIL/JAYT_421_CEO_ADVISORY_ENGINE_DISPATCH.md\`
- **Lệnh điều phối tác chiến:** \`04_DATA_PIPELINE/dispatch/WORK_ORDER_J421_ADVISORY_ENGINE.json\`
- **Tệp biên nhận kiểm định:** \`07_QUALITY_ASSURANCE/runtime_evidence/JAYT_421_ADVISORY_ENGINE_RECEIPT.json\`
- **Ảnh bằng chứng iPhone:** 
  - \`07_QUALITY_ASSURANCE/runtime_evidence/j421_live_advisory_engine_iphone.png\`
  - \`07_QUALITY_ASSURANCE/runtime_evidence/j421_live_inline_advisory_iphone.png\`
  - \`07_QUALITY_ASSURANCE/runtime_evidence/j421_live_advisory_bottom_iphone.png\`
  - \`07_QUALITY_ASSURANCE/runtime_evidence/j421_live_advisory_pillars_iphone.png\`
- **URL Triển Khai Production Canonical:** \`https://jayt-production-v3420.vercel.app\`
- **Vercel Production Deployment ID:** \`dpl_8cB7NfpLsLbZwFYANwhv8J5eDnb5\` (State: READY, Aliased)
- **Thông Số Bundle Sản Phẩm:**
  - File: \`03_SOURCE_OF_TRUTH/jayt_apex_interface.js\`
  - Kích thước: \`893,696 bytes\`
  - SHA-256: \`4ee2bca752f2099e77c922f237829e54dc612d39b40fca9439b629e67cf39948\`
  - Parity: 100% remote-to-local bit-parity trên Vercel Canonical Production
- **Nội dung hoàn thành kỹ trị:**
  1. **Nâng cấp Hộp Cố Vấn Tác Chiến (JayT Buying Advisory Engine):** Tích hợp khối lời khuyên và phán quyết trọng tài ngay dưới 2 tầng so sánh (Tầng 1: Mall, Tầng 2: Shop Uy Tín).
  2. **Trụ cột 1 - Phán Quyết Đánh Đổi Trực Diện:** Định lượng tiền chênh lệch và quy đổi chi phí thiết thực sinh viên Đà Nẵng (tiết kiệm 17.780₫ ≈ 1 bữa ăn sáng sinh viên Hòa Khánh: bún chả cá, bánh mì thịt chả / xôi). Phán quyết khách quan: Đồ Tech/Điện tử/Mỹ phẩm khuyên mua Mall (bảo hành 12-24M, an toàn mạch); Đồ tiêu hao KTX/phụ kiện/thời trang khuyên mua Shop Uy Tín (>5.000 bán, 4.9★, tiết kiệm tiền mặt). Kèm ma trận đối soát 5 tiêu chuẩn chuyên sâu.
  3. **Trụ cột 2 - Mẹo Áp Mã Kép Giờ Vàng:** Gợi ý khung giờ vàng 11h30 trưa và 20h00 tối săn mã Live/Video 15%–20%, công thức áp mã kép 3 tầng (Mã Shop + Mã Sàn Video/Live 15%-20% + Freeship Xtra 0đ) cấn trừ giá đáy.
  4. **Trụ cột 3 - Cảnh Báo Vận Chuyển Đà Nẵng:** Cảnh báo cước ship liên tỉnh 22k–35k từ Hà Nội/TP.HCM về Đà Nẵng, hướng dẫn gom đơn KTX (Bách Khoa, Kinh Tế, Sư Phạm, Hòa Khánh, Ngũ Hành Sơn) để kích hoạt Freeship Xtra 0đ, ưu tiên kho miền Trung giao 24h-48h.
  5. **100% Bọc Partner IDs:** Shopee (17372870594), Lazada (262501305), TikTok Shop (VNVNLCB6LYL3) bọc tự động trên toàn bộ nút CTA của Tầng 1 và Tầng 2.
  6. **Kỷ luật & Niêm phong:** Đo kiểm độ trễ siêu tốc 0.080ms (<= 5ms << 800ms SLA). Duy trì fail-closed \`CONFIG.affiliate_enabled: false\`. 24/24 Static Pipeline Seal PASS TUYỆT ĐỐI, 5/5 W8 Toolchain Seal PASS_TOOLCHAIN_SEAL, 100% WS1-WS2 Bit-Parity.
<!-- TRANSACTION END: TX_20260918_UPGRADE_ADVISORY_ENGINE_AND_DANANG_GO_LIVE_RATIFIED -->
`;

const ws1Mem = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng/PROJECT_MEMORY.md';
const ws2Mem = 'd:/Công Việc MMO/OPC JayT/JayT-Dự-Án-Giá-Trị-Cộng-Đồng/PROJECT_MEMORY.md';

function appendTx(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('TX_20260918_UPGRADE_ADVISORY_ENGINE_AND_DANANG_GO_LIVE_RATIFIED')) {
    content = content.trimEnd() + '\n' + tx;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Appended TX to ${filePath}`);
  } else {
    console.log(`TX already exists in ${filePath}`);
  }
  const hash = crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
  const shaFile = filePath + '.sha256';
  fs.writeFileSync(shaFile, hash + '  ' + path.basename(filePath) + '\n', 'utf8');
  console.log(`Updated ${shaFile} -> ${hash}`);
}

appendTx(ws1Mem);
appendTx(ws2Mem);
