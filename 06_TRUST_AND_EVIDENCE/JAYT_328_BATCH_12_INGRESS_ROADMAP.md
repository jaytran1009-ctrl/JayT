# JAYT-328 Batch 12 — Hồ Sơ Đối Soát Bằng Chứng, Điều Kiện Local & Khảo Sát Giá Radar (Bản Hiệu Chỉnh V10)

Ngày cập nhật: 06/09/2026 (Giờ Việt Nam).  
Tình trạng: **Hồ sơ nghiên cứu, kiểm toán nội dung & đối soát bằng chứng nội bộ**.  
Phê chuẩn Staging: **PUBLIC_APPROVED_STAGING_ONLY** cho ba hồ sơ: `B12_13` (Chuột Logitech M170), `B12_15` (USB Kingston 64GB) và `B12_05` (Quyền lợi hội viên Phúc Long) trên cổng thử nghiệm nội bộ `:4176`.  
Khóa vận hành Production: `deals_feed.json = []`, `affiliate_url = null`, baseline `v3.422.0 / 24 thẻ` giữ nguyên 100%, không deploy Production.

---

## 1. Quyết Định Phê Chuẩn Staging-Only Của Hội Đồng (Council Approval)

Căn cứ biên bản thẩm định ngày 06/09/2026, Hội đồng (Cố vấn) đã ban hành quyết định:
- **Trạng thái cấp phép:** `PUBLIC_APPROVED_STAGING_ONLY`.
- **Phạm vi áp dụng:** Duy nhất khu vực thử nghiệm nội bộ Staging (`http://127.0.0.1:4176/commercial_test.html`). **Tuyệt đối không cấp phép cho Production.**
- **Hồ sơ được phê chuẩn đợt 1 (Giá quan sát):**
  - `B12_13` (Chuột Logitech M170 - 210.000 VNĐ)
  - `B12_15` (USB Kingston 64GB - 290.000 VNĐ, P/N DTX/64GB)
  - Mã băm hồ sơ ứng viên: `3a817adb931938b62ee41f5d24e2b037cb2aa59780b291955904e45ea6696f9a`.
- **Hồ sơ được phê chuẩn đợt 2 (Quyền lợi hội viên):**
  - `B12_05` (Chương trình hội viên Phúc Long: Tích điểm & Đổi quà ly nước)
  - Mã băm hồ sơ ứng viên: `791180d61b712eebf2d9bd4f75210c5745901895c0b14c216012b8950843d2cb`.
- **Hồ sơ lưu trữ chính thức:** [`06_TRUST_AND_EVIDENCE/radar_price_vault/STAGING_APPROVED_PRICE_RECORDS.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/06_TRUST_AND_EVIDENCE/radar_price_vault/STAGING_APPROVED_PRICE_RECORDS.json) (SHA-256 `750f08b90ba6990f394243831d815ae446f97ef2748d04110a3208b9d17f59a3`).

---

## 2. Nghiệm Thu DOM Browser Thật 3 Thẻ Staging (QA Receipt)

Biên bản nghiệm thu trình duyệt Chromium qua Puppeteer đã được lưu tại [`staging_workspace_j328/STAGING_B12_05_MEMBER_BENEFIT_RECEIPT.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/staging_workspace_j328/STAGING_B12_05_MEMBER_BENEFIT_RECEIPT.json) (SHA-256 `a99e5fc005c88d0da8f76767a99fa4e0972103dea5ed193dce84c88511be5e87`):

### 2.1. Tổng Quan Hiển Thị
- **Tổng số thẻ nạp thực tế trên DOM:** Đúng **3 thẻ** (2 thẻ giá quan sát + 1 thẻ quyền lợi hội viên).
- **Phân định component:** Dùng component quyền lợi riêng biệt (`LOCAL_MEMBER_BENEFIT`), tuyệt đối không ép chương trình tích điểm thành giá bán hay voucher.

### 2.2. Chi Tiết Thẩm Định Từng Thẻ
1. **Thẻ B12_13 (Chuột Logitech M170):**
   - Giá hiển thị: `210.000 VNĐ`. Nút `Mở nguồn khảo sát` (`dienmayxanh.com`). VAT (Ẩn), Kho (Ẩn), P/N (Ẩn). **PASS**.
2. **Thẻ B12_15 (USB Kingston 64GB):**
   - Giá hiển thị: `290.000 VNĐ`. P/N `DTX/64GB`. Nút `Mở nguồn khảo sát` (`philong.com.vn`). VAT (Ẩn), Kho (Ẩn). **PASS**.
3. **Thẻ B12_05 (Hội viên Phúc Long):**
   - Badge: `DỮ LIỆU THỬ NGHIỆM ĐỐI SOÁT — QUYỀN LỢI HỘI VIÊN`.
   - Tiêu đề & Thương hiệu: `Chương Trình Hội Viên Phúc Long: Tích Điểm & Đổi Quà Ly Nước` | `Phúc Long Coffee & Tea`.
   - Mục Tích điểm: `10.000 đồng chi tiêu = 1 điểm tích lũy / khả dụng`. Ngoại lệ: *"Ngoại trừ cửa hàng tại Sân Bay, Winmart, Winmart+, WiN, Preminum"*. Ghi chú điểm bán: Chi nhánh Sân bay Đà Nẵng không tích điểm.
   - Mục Đổi quà: `100 điểm khả dụng = 1 ly nước miễn phí tùy chọn size vừa (M)`. Ngoại lệ: *"Ngoại trừ Phúc Long Sân Bay Tân Sơn Nhất, Winmart, Winmart+, WiN, Phúc Long Premium Xuân Thủy"*. Ghi chú điểm bán: Chưa xác nhận từ nguồn; không suy đoán quyền đổi quà tại Sân bay Đà Nẵng.
   - Thời hạn & Điều kiện: Hạn điểm 1 năm. Không áp dụng chung với hình thức phi tiền mặt và khuyến mãi khác.
   - 5 Địa chỉ đề xuất tại Đà Nẵng: Lotte Mart (Nại Nam), Nguyễn Văn Linh, Trần Hưng Đạo, Xô Viết Nghệ Tĩnh, Mega Market (Nguyễn Sinh Sắc) dùng nguyên dữ liệu nguồn.
   - Nút mở điều khoản an toàn: `Mở điều khoản hội viên` (`https://phuclong.com.vn/hoi-vien/...`, `rel="noopener noreferrer"`, `target="_blank"`, aria-label đầy đủ). **PASS**.

### 2.3. Hỗ Trợ Tiếp Cận Bàn Phím (Keyboard Tab Accessibility)
- Phím `Tab` duyệt tuần tự qua đúng 3 nút nguồn theo thứ tự:
  1. Nút mở nguồn `B12_13` (Điện Máy XANH).
  2. Nút mở nguồn `B12_15` (Phi Long).
  3. Nút mở điều khoản `B12_05` (Phúc Long).
- Trạng thái: **PASS**.

### 2.4. Đa Khung Nhìn (Responsive Viewports) & An Ninh
- Desktop (1440x900px), Tablet (768x1024px), Mobile (390x844px): Không tràn khung ngang (`has_overflow = false`).
- Cảnh báo bất thường (`unexpected_warnings`): 0.
- Lỗi bất thường (`unexpected_errors`): 0.
- Lỗi trang (`page_errors`): 0.
- Token tracking / affiliate cấm: 0 (kiểm tra toàn bộ DOM).
- `all_passed`: true.

---

## 3. Tình Trạng Hồ Sơ Metiz Cinema (`B12_03`)

Hồ sơ Metiz tiếp tục duy trì trạng thái tạm giữ `HELD__AWAITING_LOCAL_PHYSICAL_LOCATION_AND_VALIDITY_PROOF`:
- Đã rút lại các suy diễn về "địa điểm duy nhất tại Helio" và "hiệu lực thường niên đương nhiên".
- Ghi nhận thông tin còn thiếu: Thiếu trang chính thức công bố danh sách rạp; thiếu xác nhận tình trạng hiệu lực áp dụng tại quầy năm 2026.
- Độc lập tiến độ: Không để hồ sơ Metiz cản trở các ứng viên độc lập khác.

---

## 4. Kế Hoạch Trọng Tâm Tiếp Theo (Auto-Chained N+1 Work Order)

Chuyển trọng tâm khảo sát sang **Jollibee Vietnam (`B12_09`)**:
1. Khảo sát trang lá chi tiết của menu combo bữa ăn tiết kiệm trên `jollibee.com.vn`.
2. Đảm bảo thu nạp trực tiếp qua đường dẫn sạch, không đi qua mạng lưới tracking trung gian.
3. Thu nạp raw HTML, response headers sạch và xác định byte offset cho các thành phần combo và giá quan sát.

---

## 5. Bảng Tổng Hợp Trạng Thái Batch 12

| Mã Hồ Sơ | Đối Tượng Khảo Sát | Trạng Thái Hiện Tại | Tình Trạng Bằng Chứng & Quyết Định |
|---|---|---|---|
| `B12_13` | Chuột Logitech M170 | `PUBLIC_APPROVED_STAGING_ONLY` | Giá 210.000đ, Puppeteer QA PASS (Thẻ 1) |
| `B12_15` | Kingston Exodia 64GB | `PUBLIC_APPROVED_STAGING_ONLY` | Giá 290.000đ, P/N DTX/64GB, Puppeteer QA PASS (Thẻ 2) |
| `B12_05` | Hội viên Phúc Long | `PUBLIC_APPROVED_STAGING_ONLY` | Quyền lợi hội viên, 5 cơ sở ĐN, Puppeteer QA PASS (Thẻ 3) |
| `B12_09` | Jollibee Combo | `IN_PROGRESS__LEAF_PROBING` | Chuyển trọng tâm khảo sát trang lá combo sạch |
| `B12_03` | Metiz Cinema U22 | `HELD__AWAITING_PROOF` | Đã rút kết luận suy diễn, giữ tạm hoãn |
| `B12_16/18` | Đèn & Balo học sinh | `PROPOSED_ONLY` | Giữ trạng thái đề xuất, đóng băng phạm vi |
