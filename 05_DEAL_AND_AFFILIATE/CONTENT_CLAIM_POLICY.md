# CHÍNH SÁCH KIỂM CHỨNG TUYÊN BỐ NỘI DUNG (CONTENT CLAIM & SOURCE VERIFICATION POLICY)

**Mã tài liệu:** `CONTENT_CLAIM_POLICY_2026_V1`  
**Căn cứ pháp lý:**  
- **Luật 75/2025/QH15** (Luật sửa đổi, bổ sung một số điều của Luật Quảng cáo, hiệu lực 01/01/2026).  
- **Luật 122/2025/QH15** (Luật Thương mại điện tử, hiệu lực 01/07/2026).  
- **Luật 91/2025/QH15** (Luật Bảo vệ dữ liệu cá nhân, hiệu lực 01/01/2026).  
**Cấp thẩm quyền:** `CEO_DISPATCH_20260919_JAYT_465_UX_INTERNAL_BEHAVIOR_AND_DANANG_READINESS`

---

## 1. NGUYÊN TẮC CỐT LÕI: CURRENT SOURCE VERIFICATION
Mọi mức giá động, tỷ lệ giảm giá, hoặc quyền lợi ưu đãi hiển thị trên giao diện hoặc trong nội dung truyền thông **BẮT BUỘC** phải có bằng chứng kiểm chứng từ nguồn hiện hành (Current Source Verification):
- **Thời hạn hiệu lực tối đa của bằng chứng:**
  - Deal Flash Sale / Mã theo giờ: Không quá **2 giờ** kể từ lúc quan sát.
  - Deal Ngày / Voucher Sàn: Không quá **24 giờ**.
  - Vé xe, vé rạp cố định: Không quá **7 ngày** (phải kèm đường link trang chủ của đơn vị phát hành).
- **Quy tắc khi hết hạn bằng chứng:** Tự động chuyển trạng thái từ `VERIFIED` sang `ESTIMATED` hoặc `CLAIM_BLOCKED`. Tuyệt đối không giữ nguyên nhãn `VERIFIED` khi nguồn dữ liệu đã cũ.

---

## 2. KỶ LUẬT NGÔN TỪ & DANH MỤC TỪ NGỮ BỊ CẤM (BANNED VOCABULARY)

Theo Điều 8 Luật 75/2025/QH15, nghiêm cấm quảng cáo gian dối hoặc gây nhầm lẫn. Hệ thống áp dụng quy tắc kiểm duyệt từ ngữ tự động:

### 2.1. Cấm Tuyệt Đối (Absolute Prohibition)
- ❌ Cấm dùng: `"Rẻ nhất Việt Nam"`, `"Giá rẻ vô địch"`, `"Số 1 thị trường"`, `"Rẻ nhất quả đất"`.
  - *Thay thế bằng:* `"Giá tốt nhất trong phiên đối soát hôm nay"`, `"Thấp hơn X% so với giá quan sát trung bình 30 ngày"`.
- ❌ Cấm dùng: `"Giảm sốc 90%"`, `"Xả lỗ không giới hạn"` (nếu không có bằng chứng hóa đơn/chính sách xả kho của shop).
  - *Thay thế bằng:* `"Giảm tối đa 80% khi kết hợp 4 tầng voucher (có điều kiện áp dụng)"`.
- ❌ Cấm dùng: `"Miễn phí 100% không điều kiện"` khi thực tế người dùng phải trả tiền ship hoặc đáp ứng min spend.

### 2.2. Quy Tắc Gán Nhãn Hình Ảnh (Image Provenance)
- 📸 **"Ảnh unbox / camera thường"**: CHỈ ĐƯỢC PHÉP HIỂN THỊ khi `asset_provenance_verified = true`.
- 🖼️ **"Ảnh sản phẩm từ nguồn"**: BẮT BUỘC ÁP DỤNG cho tất cả các hình ảnh lấy từ gian hàng của sàn, ảnh catalog, hoặc ảnh chưa xác minh được danh tính người chụp thật.

---

## 3. CÔNG THỨC ÉP ĐÁY 4 TẦNG MINH BẠCH
Khi truyền thông về mức giá tiết kiệm, phải bóc tách đầy đủ cấu trúc 4 tầng:
1. `Tầng 1`: Mức giảm trực tiếp từ giá niêm yết của Shop.
2. `Tầng 2`: Voucher giảm giá của Sàn thương mại điện tử.
3. `Tầng 3`: Mã giảm riêng theo kênh (Video, Livestream, Khung giờ Flash Sale).
4. `Tầng 4`: Hỗ trợ phí vận chuyển (Freeship Xtra / Freeship Max).

Mọi thông điệp phải ghi rõ: **"Giá thực tế có thể thay đổi tùy thuộc vào tài khoản người dùng và số lượng voucher còn lại tại sàn."**
