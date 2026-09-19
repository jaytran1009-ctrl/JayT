# VĂN KIỆN ĐIỀU HÀNH & LỆNH TÁC CHIẾN CẤP CAO: THIẾT LẬP VÒNG LẶP KIỂM ĐỊNH TÁC CHIẾN 120 PHÚT CHO TÍNH NĂNG 1 & CHUẨN BỊ GO-LIVE TOÀN THÀNH PHỐ ĐÀ NẴNG

- **Mã Hiệu Ban Hành:** `JAYT_402_CEO_120_MIN_TACTICAL_STRESS_TEST_DISPATCH`
- **Căn Cứ Pháp Lý & Chỉ Đạo:** `CHAIRMAN_DIRECTIVE_20260916_2_HOUR_STRESS_TEST_AND_EXPANSION_DISPATCH`
- **Cơ Quan Ban Hành:** Giám Đốc Điều Hành (CEO Codex)
- **Đơn Vị Chấp Hành Hỏa Tốc:** Toàn Bộ Khối Kỹ Thuật Antigravity
- **Thời Gian Thi Hành:** 120 Phút Liên Tục (4 Chu Kỳ 30 Phút)
- **Đối Tượng Phục Vụ:** 320.000 Sinh Viên & Nhân Viên Văn Phòng Tại 4 Phân Vùng TP. Đà Nẵng
- **Trạng Thái Triển Khai:** **ACTIVE_TACTICAL_STRESS_TEST**

---

## I. MỤC TIÊU CHIẾN LƯỢC: AFFILIATE VALUE-FIRST

Mọi lượt click mua sắm chỉ tạo ra hoa hồng bền vững khi người dùng Đà Nẵng thực sự tiết kiệm được tiền tươi thóc thật:
1. **Bóc tách voucher ẩn:** Đưa giỏ hàng về giá đáy mà người dùng không thể tự mò trong hàng ngàn mã rối mắt.
2. **Hợp đồng Bộ Ba Định Danh (`CROSS_PLATFORM_SKU_TRIPLETS`):** Đối soát trung thực giữa Shopee Mall, LazMall, TikTok Shop Mall.
3. **Dòng tiền tự động:** Bọc Partner IDs chính danh (Shopee `17372870594`, Lazada `262501305`, TikTok Shop `VNVNLCB6LYL3`) khi chuyển đổi thành công.

---

## II. PHÂN RÃ 4 CHU KỲ KIỂM ĐỊNH 120 PHÚT

1. **Chu kỳ 1 (Phút 00 – 30): Rà soát 100% Deep-link & App Scheme sàn**
   - File kiểm thử: `07_QUALITY_ASSURANCE/test_cycle_01_deeplink_scheme.cjs`
   - Khớp đúng tham số biến thể (`modelId`, `skuId`, `variant_id`), bọc đúng Partner IDs, fallback web mượt sau 1.2s.

2. **Chu kỳ 2 (Phút 30 – 60): Đối soát Giá thực trả 3 sàn & Liveness 18 Voucher**
   - File kiểm thử: `07_QUALITY_ASSURANCE/test_cycle_02_price_and_voucher_liveness.cjs`
   - Sai lệch giá $\le 1\%$, 13 voucher `CLAIMABLE` dẫn ví 1-chạm không gõ tay, 5 voucher `PROMO_CODE` sao chép $\le 5\text{ms}$.

3. **Chu kỳ 3 (Phút 60 – 90): Đo kiểm UI/UX Mobile (390px) & Độ nhạy thao tác**
   - File kiểm thử: `07_QUALITY_ASSURANCE/test_cycle_03_mobile_ux_touch_feel.cjs`
   - 100% Touch targets $\ge 44\text{px}$, CLS = 0, zero horizontal overflow, WebAudio & Haptic micro-feedback.

4. **Chu kỳ 4 (Phút 90 – 120): Stress-test thời gian thực, Liveness & Nghiệm thu**
   - File kiểm thử: `07_QUALITY_ASSURANCE/test_cycle_04_realtime_stress_and_closing.cjs`
   - Fallback minh bạch khi thiếu link PDP, 4 khung giờ vàng Flash Sale Đà Nẵng, niêm phong toàn vẹn 24/24 static seal và 5/5 W8 toolchain seal.

---

## III. CAM KẾT KỶ LUẬT AN TOÀN

- Tiếp tục duy trì `CONFIG.affiliate_enabled: false` trên Canonical Production trong suốt đợt chạy thử 120 phút.
- Duy trì 100% Bit-Parity giữa WS1 và WS2.
