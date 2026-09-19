const fs = require('fs');
const path = require('path');

const WS1 = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const WS2 = 'd:/Công Việc MMO/OPC JayT/JayT-Dự-Án-Giá-Trị-Cộng-Đồng';

const entry = `
<!-- TRANSACTION START: TX_20260917_REALTIME_CONTROL_PLANE_AND_DYNAMIC_INGESTION_RATIFIED -->
### SỰ KIỆN: XÂY DỰNG CÔNG CỤ TỰ ĐỘNG KIỂM SOÁT THỜI GIAN THỰC (REAL-TIME SENTINEL), BIÊN ĐỘ GIÁ ĐỘNG VÀ QUY TRÌNH NẠP DỮ LIỆU ĐỘNG CHO CÔNG TY OPC JAYT
- **Thời gian ghi nhận:** 2026-09-17T15:50:00+07:00
- **Mã định danh giao dịch:** \`TX_20260917_REALTIME_CONTROL_PLANE_AND_DYNAMIC_INGESTION_RATIFIED\`
- **Người phê duyệt & Ban hành:** Chủ tịch HĐQT Tập đoàn JayT Corp & CEO Codex
- **Đơn vị trực tiếp thi hành:** Khối Kỹ Thuật Hệ Thống Antigravity
- **Sắc lệnh căn cứ:** \`CHAIRMAN_DIRECTIVE_20260917_REALTIME_CONTROL_PLANE_AND_DYNAMIC_INGESTION\`
- **Văn kiện điều hành:** \`01_EXECUTIVE_COUNCIL/JAYT_416_CEO_REALTIME_CONTROL_PLANE_DISPATCH.md\`
- **Lệnh điều phối tác chiến:** \`04_DATA_PIPELINE/dispatch/WORK_ORDER_J416_REALTIME_CONTROL_PLANE_AND_DYNAMIC_INGESTION.json\`
- **Tệp biên nhận kiểm định:** \`07_QUALITY_ASSURANCE/runtime_evidence/JAYT_416_REALTIME_CONTROL_PLANE_RECEIPT.json\`
- **URL Triển Khai Production Canonical:** \`https://jayt-production-v3420.vercel.app\`
- **Vercel Production Deployment ID:** \`dpl_Ca1uQV1xYPYmjVUrwjZsEA6kH1kf\` (State: READY, Aliased)
- **Thông Số Bundle Sản Phẩm:**
  - File: \`03_SOURCE_OF_TRUTH/jayt_apex_interface.js\`
  - Kích thước: \`844,809 bytes\`
  - SHA-256: \`b3cfe0f6706f4538cd7c64058a6a27ae0d78cf37eb815a508d47596a28d0744f\`
  - Parity: 100% remote-to-local bit-parity trên Vercel Canonical Production
- **Nội dung hoàn thành kỹ trị:**
  1. **Cỗ máy Real-Time Sentinel (\`scripts/realtime_pdp_sentinel.cjs\`):** Quét liveness 15 phút/lần, tự động phát hiện 404, khóa cứng \`available: false\`, nhãn \`[🔒 Chưa Có Link Chính Hãng]\`, cấm hoàn toàn redirect 404.
  2. **Biên độ giá động thông minh (\`formatDynamicPriceRange\`):** Hiển thị trực quan: *"Giá tham khảo 125.000₫ · Săn tại sàn: chỉ từ 81.250₫ – 103.750₫ khi áp mã"* trên thẻ KTX, modal đối chiếu 3 sàn và modal WebView Breaker.
  3. **Quy trình nạp dữ liệu động không sửa code (Dynamic Ingestion Pipeline):** Cổng nạp \`scripts/dynamic_ingest_pdp.cjs\` tự động bóc tách ID sản phẩm, bọc mã đối tác chính thức (Shopee \`17372870594\`, Lazada \`262501305\`, TikTok Shop \`VNVNLCB6LYL3\`), ghi nhận vào \`dynamic_sku_registry.json\`; client runtime tự động fetch và hợp nhất mà không sửa code tĩnh.
  4. **Tối ưu hóa WebView Breaker:** Nhận diện Messenger/Zalo, banner ghim trên cùng, modal hướng dẫn 2 bước, tự động copy voucher, tích hợp biên độ giá động và nút Android Chrome Intent.
  5. **Kỷ luật an toàn & Niêm phong:** 24/24 Static Pipeline Seal PASS TUYỆT ĐỐI, 5/5 W8 Toolchain Seal PASS, 5/5 J416 Tests PASS, duy trì \`CONFIG.affiliate_enabled: false\` fail-closed.
<!-- TRANSACTION END: TX_20260917_REALTIME_CONTROL_PLANE_AND_DYNAMIC_INGESTION_RATIFIED -->
`;

const mem1 = path.join(WS1, 'PROJECT_MEMORY.md');
const mem2 = path.join(WS2, 'PROJECT_MEMORY.md');

fs.appendFileSync(mem1, entry);
fs.writeFileSync(mem2, fs.readFileSync(mem1));
console.log('Appended and synced PROJECT_MEMORY.md on WS1 and WS2');

// Sync governance files
const filesToSync = [
  '04_DATA_PIPELINE/dispatch/WORK_ORDER_J416_REALTIME_CONTROL_PLANE_AND_DYNAMIC_INGESTION.json',
  '07_QUALITY_ASSURANCE/runtime_evidence/JAYT_416_REALTIME_CONTROL_PLANE_RECEIPT.json',
  '01_EXECUTIVE_COUNCIL/JAYT_416_CEO_REALTIME_CONTROL_PLANE_DISPATCH.md'
];

for (const f of filesToSync) {
  const p1 = path.join(WS1, f);
  const p2 = path.join(WS2, f);
  fs.writeFileSync(p2, fs.readFileSync(p1));
  console.log('Synced to WS2:', f);
}
