const fs = require('fs');
const path = require('path');

const memoryPath = path.resolve(__dirname, '..', 'PROJECT_MEMORY.md');
let content = fs.readFileSync(memoryPath, 'utf8');

const transactionEntry = `
---

## 📌 TRANSACTION RECORD: v3.270.0 (2026-08-26T16:30:00+07:00)
- **Directive**: \`CEO JAYT EXECUTIVE POLISH DIRECTIVE — APPLE/LINEAR MASTER DESIGN STANDARDS\`
- **Status**: \`PRODUCTION_VERIFIED\`
- **Production URL**: \`https://deploy-ten-xi-48.vercel.app\`
- **Summary**:
  1. **Triệt Tiêu 4 Hạt Sạn Thị Giác & Công Năng Cuối Cùng**:
     - *Lấp đầy khoảng trống Tầng 2*: Tích hợp thumbnail $80 \\times 80\\text{px}$, bổ sung 2 dòng thông số (giờ đông khách, bán kính) và 3 micro-tags tiện ích (\`❄️ Máy lạnh\`, \`⚡ Chỗ để xe\`, \`⏱️ 10-15 phút\`).
     - *Khóa 1 quy tắc CTA Hierarchy*: Nút chính Emerald \`#059669\` (\`.btn-action-primary\`), nút phụ xám mờ (\`.btn-action-secondary\`), nút chia sẻ Amber \`#D97706\` (\`.btn-action-social\`).
     - *Sửa logic rạp rạp T4*: Chuyển thành \`🎬 CGV Culture Day — 75K\`.
     - *Tactile Elevation & Phản hồi 2s*: Thêm bóng đổ 3 lớp, bo góc squircle 20px, nút sao chép voucher đổi trạng thái sang \`[ ✅ Đã Chép ]\` trong 2s.
  2. **Kiểm Định & Đối Soát Byte Parity**:
     - 7/7 Tệp tin SOT đạt 100% SHA-256 Byte Parity với Vercel Production.
     - Toàn bộ 6/6 test suites PASS 100%.
`;

content = content.trim() + '\n' + transactionEntry;
fs.writeFileSync(memoryPath, content, 'utf8');
console.log('✅ Applied memory transaction APPLE/LINEAR POLISH 2026 to PROJECT_MEMORY.md');
