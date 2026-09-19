const fs = require('fs');
const path = require('path');

const memoryPath = path.resolve(__dirname, '..', 'PROJECT_MEMORY.md');
let content = fs.readFileSync(memoryPath, 'utf8');

const signOffEntry = `
---

## 🏛️ TRANSACTION RECORD: v3.280.0-EXECUTIVE-SIGN-OFF (2026-08-26T17:30:00+07:00)
- **Directive**: \`QUYẾT ĐỊNH PHÊ DUYỆT NGHIỆM THU & PHÁT HÀNH CHÍNH THỨC (EXECUTIVE SIGN-OFF)\`
- **Status**: \`OFFICIAL_PRODUCTION_RELEASE_APPROVED\`
- **Sign-off Authority**: Tổng Giám Đốc JayT Đà Nẵng
- **Production Live URL**: \`https://deploy-ten-xi-48.vercel.app/\`
- **Audit Verification**: \`105/105 TEST SUITES PASSED (100%)\`
- **Five Invariant Constitutional Core Values**:
  1. *Tính trung thực dữ liệu tuyệt đối (Strict Physical Provenance)*: 100% ưu đãi/mức giá đối soát byte-for-byte SHA-256; 0 deal ảo; 0 giá gạch chân phán bừa.
  2. *Giá trị thật cho cộng đồng sinh viên Đà Nẵng*: Phục vụ chính xác 3 cụm trường (Hòa Khánh, Hải Châu, Ngũ Hành Sơn); thời gian ra quyết định <= 3s.
  3. *Đẳng cấp trải nghiệm người dùng Top 1 thế giới (Apple/Linear Standard)*: Triệt tiêu dead whitespace, khóa Button Rule of 3 (Emerald #059669, Amber #D97706, Subtle), Tactile Elevation 3 lớp, CLS = 0.
  4. *Hiệu năng tương tác tức thời (Kinetic In-Memory Engine)*: Tính toán giỏ hàng trên RAM máy khách <= 30ms, 0 request mạng giật lag.
  5. *Minh bạch Affiliate & Giám sát 24/7*: Gắn nhãn #JayTAffiliate, Deep-Link mở thẳng App sàn, tự động đối soát 18 cơ sở mỗi 24 giờ.
- **Post-Launch Governance Protocol**:
  - *Data Ops*: Quét rà soát 18 cơ sở mỗi 24h, tự ngắt hiển thị nếu phát hiện thay đổi chính sách chưa đối soát.
  - *Frontend Core*: Duy trì phản hồi tương tác <= 100ms, giữ Console Error 0%.
  - *Product Ops*: Theo dõi tỷ lệ chuyển đổi xuất Vé Kèo Zalo tại Hòa Khánh, Hải Châu, Ngũ Hành Sơn.
`;

content = content.trim() + '\n' + signOffEntry;
fs.writeFileSync(memoryPath, content, 'utf8');
console.log('✅ Applied immutable Executive Sign-off transaction record to PROJECT_MEMORY.md');
