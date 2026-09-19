const fs = require('fs');
const path = require('path');

const memoryPath = path.resolve(__dirname, '..', 'PROJECT_MEMORY.md');
let content = fs.readFileSync(memoryPath, 'utf8');

const transactionEntry = `
---

## 📌 TRANSACTION RECORD: v3.257.0 (2026-08-26T14:45:00+07:00)
- **Directive**: \`JAYT-134A — CROSS-FUNCTIONAL SCORE CALIBRATION & CUSTOMER RED TEAM\`
- **Status**: \`READY_FOR_CEO_FINAL_AUDIT\`
- **Summary**:
  1. **Khắc phục 5 lỗi quản trị CEO đã chỉ ra**:
     - Hạ điểm tự chấm của Privacy từ 10.0 xuống 8.5 (không bù đắp cho thiếu data).
     - Đo lường và chứng minh độc lập hiệu năng/dark mode/DOM bằng Puppeteer E2E.
     - Thực hiện kiểm thử tương tác thực tế (click, form, split bill, .ics).
     - Thừa nhận rủi ro thông tin đối với hành trình delivery.
     - Triển khai ma trận hiệu chỉnh chéo giữa 10 phòng ban.
  2. **Hoàn thành 4 bài kiểm thử Customer Red Team E2E trên Live Production**:
     - *Bài 1 (11:05 Hòa Khánh)*: Nhận diện rõ ràng 2 món ăn trưa (KFC, Lotteria) mang nhãn \`📋 GIÁ THAM KHẢO\`, 0 false claim.
     - *Bài 2 (14:30 Ngũ Hành Sơn)*: Cà phê học nhóm hiển thị đúng menu niêm yết (Phê La, Phúc Long, Gong Cha), không có happy hour ảo.
     - *Bài 3 (17:30 Hải Châu)*: Tự chuyển Dark Mode, hiển thị Metiz 45k, CGV Payday 30k; tải thành công tệp \`.ics\` RFC 5545 và mở bảng lập kèo nhóm.
     - *Bài 4 (Delivery Basket)*: Mở máy tính thực trả, nạp giỏ hàng 120k + ship 18k - voucher 25k, tính chuẩn xác thực trả 113.000₫ và chia 2 người 56.500₫.
  3. **Ma trận điểm hiệu chỉnh chéo (Calibrated Scorecard)**:
     - Rạp phim: \`7.5/10\` | Delivery: \`4.0/10\` | Nearby: \`6.5/10\` | F&B: \`5.0/10\` | Trust & CX: \`8.0/10\`
     - **Điểm toàn diện**: \`6.2 / 10\` (Chính thức thống nhất nguồn cung F&B/Delivery là blocker then chốt).
  4. **Kế hoạch hành động liên phòng ban**:
     - \`Deal Ops\` + \`Data Trust\`: Ưu tiên Sprint \`JAYT-135\` (F&B Ground Evidence quanh các làng đại học).
     - \`COO\` + \`CTO\`: Thiết lập script TTL Monitor chạy hàng ngày tự hạ deal hết hạn.
`;

content = content.trim() + '\n' + transactionEntry;
fs.writeFileSync(memoryPath, content, 'utf8');
console.log('✅ Applied memory transaction JAYT-134A to PROJECT_MEMORY.md');
