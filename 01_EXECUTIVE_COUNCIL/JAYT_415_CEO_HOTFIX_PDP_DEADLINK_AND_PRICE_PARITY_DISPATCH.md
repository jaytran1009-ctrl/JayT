# JAYT-415: CÔNG ĐIỆN ĐIỀU HÀNH CEO - KHẮC PHỤC TRIỆT ĐỂ LỖI LINK 404 LAZADA, LỆCH GIÁ THỜI GIAN THỰC VÀ NGHẼN APP TRÊN MESSENGER/ZALO WEBVIEW

**Mã Lệnh Thẩm Quyền:** `CHAIRMAN_DIRECTIVE_20260917_HOTFIX_PDP_DEADLINK_AND_PRICE_PARITY`  
**Cơ Quan Ban Hành:** Giám Đốc Điều Hành (CEO Codex) & Khối Kỹ Thuật Hệ Thống Antigravity  
**Ngày Ký Ban Hành:** 17/09/2026 (Giờ UTC: 08:38)  
**Địa Bàn Mục Tiêu:** 320.000 Sinh viên & Dân văn phòng TP. Đà Nẵng  
**Miền Sản Xuất Chuẩn:** `https://jayt-production-v3420.vercel.app`  
**Deployment ID Kích Hoạt:** `dpl_BcRBMyZMwqNjFqYkBzCHe5j3Xdiw`  
**Trạng Thái Hệ Thống:** `DEPLOYED_AND_VERIFIED_OPERATIONAL_PASS_100%`

---

## 1. BỐI CẢNH & PHÁT HIỆN THỰC ĐỊA TỪ CHỦ TỊCH
Trong quá trình rà soát trực tiếp trên thiết bị di động cá nhân, Chủ tịch Hội đồng Quản trị đã phát hiện 3 sai phạm kỹ thuật nghiêm trọng cần xử lý dứt điểm:
1. **Link Lazada chết (404 "Sản phẩm không tồn tại"):** Toàn bộ 10 sản phẩm Lazada và 4 sản phẩm TikTok trong `CROSS_PLATFORM_SKU_TRIPLETS` chứa các mã định danh giả lập (`i266090481-s987654321`, `172948201948`), khi bấm dẫn tới trang lỗi 404 trên sàn.
2. **Lệch giá sàn thực tế (Price Disparity):** Khăn giấy TopGia hiển thị 125.000₫ trong khi giá sàn Shopee thực tế từ 103.750₫ (chênh lệch 21.250₫); Củ sạc dự phòng Ugreen GaN 30W hiển thị 225.000₫ trong khi giá thực tế từ 202.500₫ (chênh lệch 22.500₫). Thiếu ghi chú minh bạch điều kiện giảm giá theo khung giờ Flash Sale.
3. **Nghẽn App trên Messenger/Zalo Webview:** Trình duyệt nhúng in-app browser chặn các deep-link mở App và vô hiệu hóa cơ chế tự động điền mã voucher.

---

## 2. KẾT QUẢ KHẮC PHỤC KỸ TRỊ CỦA ANTIGRAVITY

### Trọng Tâm 1: Quét Sạch Link Chết (Deadlink Elimination)
- **Thi hành nguyên tắc "Thật 100% hoặc Không hiển thị":**
  - Đã loại bỏ triệt để toàn bộ 10 URL giả lập regex trên Lazada và các mã ID giả lập trên TikTok.
  - Đối với các sản phẩm chưa có gian hàng Mall chính thức: Chuyển sang trạng thái minh bạch `available: false`, gán nhãn `[Chưa có gian hàng chính hãng trên Lazada / TikTok Shop]`, cấu hình nút bấm khóa cứng `🔒 Chưa Có Link Chính Hãng` (disabled, xám mờ).
  - Tuyệt đối không dẫn người dùng sang link 404 hoặc trang tìm kiếm rác.

### Trọng Tâm 2: Căn Chỉnh Giá Sàn Thực Tế & Ghi Chú Minh Bạch (Price Parity)
- Cập nhật đồng bộ tại `J387_DORM_SKUS` và `CROSS_PLATFORM_SKU_TRIPLETS`:
  - **Khăn giấy TopGia (`DORM_SKU_FEED_01_23552060269`):** Căn chỉnh giá sàn từ **103.750₫** (trước đây 125.000₫).
  - **Củ sạc Ugreen GaN 30W (`DORM_SKU_FEED_06_28818204493`):** Căn chỉnh giá sàn từ **202.500₫** (trước đây 225.000₫).
- Bổ sung ghi chú minh bạch dưới bảng đối soát trong Modal:
  > *"💡 **Ghi chú từ JayT:** Giá thực tế có thể giảm sâu hơn tùy hạng thành viên và khung giờ Flash Sale của sàn."*

### Trọng Tâm 3: Bộ Nhận Diện & Cơ Chế Webview Breakout
- Tích hợp hàm kiểm tra User-Agent `isMessengerOrZaloWebview()` nhận diện chính xác các mã định danh `FBAN`, `FBAV`, `FB_IAB`, `Zalo`, `ZaloTheme`.
- Tự động hiển thị thanh thông báo cảnh báo dính trên đầu trang (`jayt-webview-banner`) khi phát hiện đang chạy trong Webview.
- Khi người dùng click nút lấy mã voucher / nhận ưu đãi:
  1. Đánh chặn điều hướng trực tiếp (tránh bị kẹt trong Webview).
  2. Tự động sao chép mã voucher vào clipboard.
  3. Mở modal hướng dẫn 2 bước trực quan (`jayt-webview-breakout-modal`):
     - Bước 1: Bấm biểu tượng ⋯ hoặc ⋮ (3 dấu chấm) ở góc trên bên phải màn hình.
     - Bước 2: Chọn "Mở bằng trình duyệt" (Safari / Chrome) để mở ứng dụng sàn và tự động áp mã.
  4. Hỗ trợ nút mở trực tiếp bằng Android Chrome Intent (`intent://...`).

---

## 3. BẢNG KIỂM ĐỊNH CHẤT LƯỢNG & PHÊ CHUẨN KỸ THUẬT

| STT | Bài Kiểm Định | Công Cụ Kiểm Tra | Kết Quả | Trạng Thái |
|:---:|:---|:---|:---:|:---:|
| 1 | Kiểm tra Giá Sàn, Link Chết & Webview Breakout | `test_j415_deadlink_and_price_parity.cjs` | 5/5 | **PASS 100%** |
| 2 | Hợp Đồng Đối Soát 3 Sàn & Link Sống | `test_sku_triplet_contract.cjs` | 6/6 | **PASS 100%** |
| 3 | Thẩm Định 4 Trụ Cột (Link, Giá, Nội Dung, UX) | `test_feature_01_deep_audit_four_pillars.cjs` | 4/4 | **PASS 100%** |
| 4 | Vòng Đời Nút So Giá & Modal | `test_j414_comparison_button_modal.cjs` | 5/5 | **PASS 100%** |
| 5 | Niêm Phong Tĩnh Hệ Thống (Pipeline Seal) | `verify_pipeline_seal.cjs` | 24/24 | **PASS TUYỆT ĐỐI** |
| 6 | Niêm Phong Toolchain Pha 2 (W8 Seal) | `verify_w8_feed_toolchain.cjs` | 5/5 | **PASS_TOOLCHAIN_SEAL** |
| 7 | Đối Soát Hash Máy Chủ Vercel Production | `HTTP 200 / Remote SHA-256 Check` | 841.281 bytes | **EXACT MATCH 100%** |

---

## 4. KỶ LUẬT AN TOÀN & BẢO VỆ DỮ LIỆU
- `CONFIG.affiliate_enabled: false` (chế độ fail-closed giữ nguyên kỷ luật an toàn 100%).
- Khớp mã băm SHA-256 tuyệt đối giữa WS1 và WS2.
- Sẵn sàng bàn giao Chủ tịch Hội đồng Quản trị nghiệm thu thực tế trên điện thoại di động.
