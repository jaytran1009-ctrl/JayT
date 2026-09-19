# JAYT PROVIDER DOCUMENTATION HYGIENE DISCLOSURE (072A)

**Mã văn kiện**: \`JAYT-PROVIDER-DOCS-HYGIENE-072A\`  
**Chỉ thị điều hành**: \`JAYT-072A — PROVIDER DOCUMENTATION HYGIENE\`  
**Thời điểm ban hành**: 2026-08-24T15:00:00+07:00  
**Trạng thái quản trị**: \`APPEND_ONLY_GOVERNANCE_DISCLOSURE\`

---

## 1. PHÂN LOẠI TRẠNG THÁI ĐỐI TÁC AFFILIATE (PROVIDER CANDIDATE STATUS)

1. **Shopee Vietnam Affiliate**: Chỉ là **\`PROVIDER_CANDIDATE\`**, **chưa phải nhà cung cấp đã được xác thực (UNVERIFIED_PROVIDER)**.
2. **Lazada Affiliate & TikTok Shop Affiliate**: Tương tự, chỉ là **\`PROVIDER_CANDIDATE\`**.
3. **Mã Định Danh Khai Báo (`partner_id`)**: Các mã `partner_id` (ví dụ: `17372870594` của Shopee, `262501305` của Lazada, `VNVNLCB6LYL3` của TikTok) chỉ là định danh khai báo từ phía người dùng, **hoàn toàn không chứng minh quyền truy cập Open API, token hay phân quyền của tài khoản**.

---

## 2. VÔ HIỆU HÓA CÁC ĐẶC TẢ CHƯA CÓ LINEAGE TÀI LIỆU CHÍNH THỨC

Mọi giả định, ví dụ về endpoint (như `https://open-api.affiliate.shopee.vn/graphql`), GraphQL schema, payload JSON mẫu, hoặc công thức ký xác thực (signature formula) được nêu ra trước đây mà chưa có tệp tài liệu chính thức từ cổng Partner Center lưu trên đĩa đều được dứt khoát gắn nhãn:

$$\mathbf{UNVERIFIED\_NOT\_IMPLEMENTABLE}$$

- **Nghiêm cấm thi hành**: Tuyệt đối không sử dụng tệp contract [`shopee_affiliate_contract.js`](05_DEAL_AND_AFFILIATE/feed_gateway/provider_contracts/shopee_affiliate_contract.js) hiện hữu để thực hiện probe mạng, ký request hay fetch dữ liệu thật.
- **Rào chắn kỹ thuật**: Toàn bộ contract giữ nguyên trạng thái `UNSUPPORTED_PENDING_PROVIDER_DOCS`.

---

## 3. ĐIỀU KIỆN MỞ KHÓA KỸ THUẬT TIẾP THEO

Antigravity chỉ được phép xây dựng contract, bộ tạo chữ ký (signing generator) và probe xác thực khi thỏa mãn đủ 3 điều kiện:

1. **Tài liệu chính thức từ Partner Center**: CEO/Human Operator đăng nhập Partner Center và cung cấp tài liệu kỹ thuật chính thức (PDF/HTML/text) lưu vào repo kèm SHA-256.
2. **Đặc tả route & chữ ký rõ ràng**: Văn bản chính thức nêu rõ HTTP Method, URL, thuật toán ký (HMAC-SHA256, timestamp format, header name), và response schema.
3. **Test Vector / Response Mẫu**: Test vector chính thức do Partner Center công bố để xây dựng unit test không phụ thuộc network.

*(Lưu ý: Không gửi Secret Key hay Mật khẩu vào đoạn chat; credentials chỉ được cấu hình qua biến môi trường cục bộ khi probe thật).*

---

## 4. BẢO TOÀN TRẠNG THÁI HỆ THỐNG

- **Production Feed**: \`deals_feed.json: []\` (\`is_approved: false\`).
- **Staging Feed**: 3 deals thật (Galaxy Happy Day + Metiz Super Monday + Metiz U22) đạt chuẩn 100% Cross-Layer Lineage Gate.
- **Track 2 Pipeline**: Lưu trữ an toàn, không outreach.
- **UI / Framework**: Giữ nguyên trạng 100%.
