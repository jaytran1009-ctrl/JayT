'use strict';
const fs = require('fs');
const path = require('path');

const tx = [
  '<!-- TRANSACTION START: TX_20260918_FIX_DUAL_TIER_NAMING_AND_BRAND_CROSS_MATCH_RATIFIED -->',
  '### SỰ KIỆN: ĐỒNG BỘ HIỂN THỊ TIÊU ĐỀ 2 TẦNG, BÓC TÁCH GIAN HÀNG CHÍNH HÃNG CHÉO SÀN VÀ PHÁT LỆNH GO-LIVE ĐÀ NẴNG (JAYT-428)',
  '- **Thời gian ghi nhận:** 2026-09-18T12:09:00+07:00',
  '- **Mã định danh giao dịch:** `TX_20260918_FIX_DUAL_TIER_NAMING_AND_BRAND_CROSS_MATCH_RATIFIED`',
  '- **Người phê duyệt & Ban hành:** Chủ tịch HĐQT Tập đoàn JayT Corp & CEO Codex',
  '- **Đơn vị trực tiếp thi hành:** Khối Kỹ Thuật Hệ Thống Antigravity & Khối Tăng Trưởng',
  '- **Sắc lệnh căn cứ:** `CHAIRMAN_DIRECTIVE_20260918_FIX_DUAL_TIER_NAMING_AND_BRAND_CROSS_MATCH` (JAYT-428)',
  '- **Tệp biên nhận kiểm định:** `07_QUALITY_ASSURANCE/runtime_evidence/JAYT_428_DUAL_TIER_NAMING_RECEIPT.json`',
  '- **Ảnh bằng chứng runtime:**',
  '  - `07_QUALITY_ASSURANCE/runtime_evidence/j428_live_mobile_dual_tier_title_sync.png`',
  '  - `07_QUALITY_ASSURANCE/runtime_evidence/j428_live_desktop_mall_cross_match.png`',
  '  - `07_QUALITY_ASSURANCE/runtime_evidence/j428_live_desktop_tier2_scrolled.png`',
  '- **URL Triển Khai Production Canonical:** `https://jayt-production-v3420.vercel.app`',
  '- **Vercel Production Deployment ID:** `dpl_4TdWE732TWgzkKYymH3Bbi7HXtXh` (State: READY, Aliased)',
  '- **Thông Số Bundle Sản Phẩm:**',
  '  - File: `03_SOURCE_OF_TRUTH/jayt_apex_interface.js`',
  '  - Kích thước: `925,133 bytes`',
  '  - SHA-256: `baa447615d4e65f0d1c38f25fb5768e289e1589a7be61a5f2844d9c92e696420`',
  '  - Parity: 100% remote-to-local bit-parity trên Vercel Canonical Production',
  '- **Nội dung hoàn thành kỹ trị:**',
  '  1. **Đồng Bộ Hiển Thị Tiêu Đề 2 Tầng Tuyệt Đối:**',
  '     - Tầng 1 (Mall Chính Hãng) và Tầng 2 (Shop Uy Tín) cùng hiển thị đồng nhất Tiêu đề Sản phẩm Cốt lõi: `Ema Gối Ngủ Công Thái Học`.',
  '     - Tên phân loại được hạ cấp thành huy hiệu phụ thứ cấp: `🏷️ Phân loại: Cao Su Non / Thoáng Khí`, không còn ghi đè tên biến thể lên tên sản phẩm.',
  '  2. **Triệt Tiêu 100% Nút Phòng Thủ & Giá Tiết Kiệm 0đ:**',
  '     - Xóa sổ toàn bộ nhãn nút mang tính chất fallback phòng thủ như `[🔍 Tìm Sản Phẩm Tương Đương ↗]` và giá trị tiết kiệm `0đ` / `payable: Infinity`.',
  '     - Chuẩn hóa nút hành động Mall: `🏛️ Mở Shopee Mall Chính Hãng ↗`, `🏛️ Mở LazMall Chính Hãng ↗`, `🏛️ Mở TikTok Shop Mall ↗`.',
  '     - Bóc tách tầng giá ước tính Mall thực tế với `available: true`, đảm bảo luôn hiển thị số tiền tiết kiệm thực tế `> 0đ` và giá thanh toán hợp lý.',
  '  3. **Bóc Tách Gian Hàng Chính Hãng Chéo Sàn (Cross-Platform Brand/Mall Matching):**',
  '     - Nạp thương hiệu `Ema` vào từ điển nhận diện thương hiệu `extractBrandFromText`.',
  '     - Hoàn thiện cấu hình `SKU_TRIPLET_11_GOI_CONG_THAI_HOC`: kích hoạt `available: true` cả 3 sàn (Shopee Mall: 182749102/17349618371, LazMall: 17349618371, TikTok Mall: 1734961837103548126).',
  '     - Chuẩn hóa cú pháp tìm kiếm thương hiệu: `"[Brand] + [Clean Title]"` (`"Ema Gối Công Thái Học"`).',
  '  4. **Bảo Vệ Tuyệt Đối Biên Giới Thương Mại & Pháp Lý:**',
  '     - Khóa cứng Partner ID đối soát: Shopee `17372870594`, Lazada `262501305`, TikTok `VNVNLCB6LYL3`.',
  '     - Duy trì trạng thái fail-closed an toàn: `CONFIG.affiliate_enabled: false`.',
  '     - Zero-Typing Automation (100% tự động hóa, 0 người dùng gõ tay).',
  '  5. **Kỷ Luật Niêm Phong & Đồng Bộ Workspace:**',
  '     - 10/10 Gates Automated QA Test PASS (`test_j428_dual_tier_naming.cjs`).',
  '     - Static Pipeline Seal: 24/24 PASS TUYỆT ĐỐI.',
  '     - W8 Toolchain Seal: 5/5 PASS.',
  '     - 100% Bit-Parity đồng nhất giữa WS1 và WS2.',
  '<!-- TRANSACTION END: TX_20260918_FIX_DUAL_TIER_NAMING_AND_BRAND_CROSS_MATCH_RATIFIED -->',
  ''
].join('\n');

const ws1Mem = path.join('d:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng', 'PROJECT_MEMORY.md');
const ws2Mem = path.join('d:/Công Việc MMO/OPC JayT/JayT-Dự-Án-Giá-Trị-Cộng-Đồng', 'PROJECT_MEMORY.md');

fs.appendFileSync(ws1Mem, tx, 'utf8');
fs.appendFileSync(ws2Mem, tx, 'utf8');
console.log('Appended transaction to WS1 and WS2 PROJECT_MEMORY.md successfully.');
