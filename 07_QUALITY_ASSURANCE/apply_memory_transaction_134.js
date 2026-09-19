const fs = require('fs');
const path = require('path');

const memoryPath = path.resolve(__dirname, '..', 'PROJECT_MEMORY.md');
let content = fs.readFileSync(memoryPath, 'utf8');

const transactionEntry = `
---

## 📌 TRANSACTION RECORD: v3.256.0 (2026-08-26T14:30:00+07:00)
- **Directive**: \`JAYT-134 — ALL-DEPARTMENTS CUSTOMER EXCELLENCE REVIEW\`
- **Status**: \`READY_FOR_CEO_AUDIT\`
- **Summary**:
  1. **Thiết lập cơ chế điều hành All-Departments Customer Excellence Review**:
     - 10 Giám đốc chức năng (CPO, CDO, CX Lead, Chief Data/Trust Officer, Head of Deal Ops, CTO, QA Director, Commercial Director, Privacy Officer, COO) đồng loạt đánh giá 5 hành trình khách hàng.
     - Tuân thủ nguyên tắc điều hành: Không chấm điểm dựa trên test PASS hay số file tạo ra; không tự nhận 10/10 khi nguồn cung F&B/Delivery còn khoảng trống.
  2. **Bảng điểm liên phòng ban thực tế**:
     - *Hành trình 1 (Rạp phim)*: \`7.5/10\` (Beta hữu ích, 5 deal xác thực có leaf file, thiếu showtimes theo ngày).
     - *Hành trình 2 (Delivery)*: \`4.5/10\` (Chế độ máy tính cục bộ tự nhập, thiếu API giỏ hàng real-time).
     - *Hành trình 3 (Nearby)*: \`6.5/10\` (5 Cụm 26 địa điểm + lọc 5 khung giờ, thiếu khoảng cách routing thực).
     - *Hành trình 4 (F&B)*: \`5.5/10\` (9 Menu niêm yết, thiếu deal live F&B do toàn bộ candidate 132D bị cách ly).
     - *Hành trình 5 (Trust & CX)*: \`8.5/10\` (Zero-PII / Zero-GPS / Zero-Login, Empty state trung thực, Local feedback).
     - **Điểm trung bình toàn diện**: \`6.5/10\` (Chính thức xác định điểm nghẽn: NGUỒN CUNG F&B VÀ DELIVERY THẬT).
  3. **Đánh giá bản Canvas 133**: Đạt 5/5 tiêu chí kiểm tra của CEO.
  4. **Kế hoạch tiếp theo**: Khởi động \`JAYT-135\` (F&B Ground Evidence) và \`JAYT-136\` (Dynamic Delivery Calculator Pro).
`;

content = content.trim() + '\n' + transactionEntry;
fs.writeFileSync(memoryPath, content, 'utf8');
console.log('✅ Applied memory transaction JAYT-134 to PROJECT_MEMORY.md');
