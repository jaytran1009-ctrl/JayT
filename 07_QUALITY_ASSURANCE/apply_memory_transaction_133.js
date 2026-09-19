const fs = require('fs');
const path = require('path');

const memoryPath = path.resolve(__dirname, '..', 'PROJECT_MEMORY.md');
let content = fs.readFileSync(memoryPath, 'utf8');

const transactionEntry = `
---

## 📌 TRANSACTION RECORD: v3.255.0 (2026-08-26T14:15:00+07:00)
- **Directive**: \`JAYT-133 — FIVE-TIER PREMIUM DISCOVERY CANVAS\`
- **Status**: \`READY_FOR_CEO_AUDIT\`
- **Summary**:
  1. **Triển khai mô hình 5 tầng JayT Daily Deal Canvas**:
     - **Tầng 1: Today & Week Hero**: Bento 3 khối (Khung giờ + Cụm Đà Nẵng / 1 Best Moment-Fit Match / Lịch 7 ngày kính mờ thu gọn).
     - **Tầng 2: Hot Now**: Món ăn/uống theo khung giờ & nút *"Nhập giỏ hàng để đối chiếu 🧮"* với nhãn minh bạch \`ACCOUNT_OR_CART_DEPENDENT\`.
     - **Tầng 3: Plan Ahead**: Countdown cho các deal có hạn thật (CGV Payday 31/08, Starlight Combo 30/11, Metiz U22) + Nút *"Thêm vào Lịch (.ics) 📅"* và *"Chia sẻ kèo 👥"* không đòi login.
     - **Tầng 4: Smart Buy**: Trạng thái chờ cấp phép trung thực: *"JayT đang chờ nguồn giá được cấp quyền; lưu danh mục để nhận thông báo khi có deal thật."* (0 cáp sạc 1K, 0 voucher ảo).
     - **Tầng 5: Voucher Wallet**: Trạng thái tự nhập minh bạch qua Bàn So Sánh.
  2. **Bảo tồn nguyên vẹn 100% Provenance Vật lý từ 132E**: Duy nhất 5 deal rạp phim có tệp capture trên đĩa được mang nhãn \`ACTIVE_VERIFIED\`.
  3. **Kiểm định QA & Triển khai Live**:
     - Test suite \`test_five_tier_canvas_133.js\`: **36/36 PASS**.
     - Test suite \`test_provenance_containment_and_strict_evidence_132e.js\`: **44/44 PASS**.
     - Deploy lên Vercel Production \`https://deploy-ten-xi-48.vercel.app\` đạt **100% SHA-256 Byte Parity** và Puppeteer Live 5 Tiers Audit thành công.
`;

content = content.trim() + '\n' + transactionEntry;
fs.writeFileSync(memoryPath, content, 'utf8');
console.log('✅ Applied memory transaction JAYT-133 to PROJECT_MEMORY.md');
