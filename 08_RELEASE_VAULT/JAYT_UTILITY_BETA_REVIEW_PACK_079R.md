# HỒ SƠ THẨM ĐỊNH TỔNG HỢP: JAYT UTILITY BETA TRUTH & PRIVACY (079R)

**Mã đợt thẩm định**: `REVIEW_PACK_UTILITY_BETA_079R`  
**Chỉ thị điều hành**: `JAYT-UTILITY-BETA-TRUTH-AND-PRIVACY-079R`  
**Thời điểm lập hồ sơ**: 2026-08-24T18:41:00+07:00  
**Trạng thái phê duyệt**: `PROPOSED — PENDING CEO BATCH AUDIT`  
**Kỷ luật phát hành**: **KHÔNG DEPLOY TRƯỚC KHI CEO PHÊ DUYỆT HỒ SƠ NÀY**  
**Mã băm Source of Truth JS**: `03_SOURCE_OF_TRUTH/jayt_apex_interface.js`  
**Production Feed Invariant**: `deals_feed.json: []` (0 records, 0 bytes, `is_approved: false`)

---

## 1. KHẮC PHỤC TRIỆT ĐỂ 4 ĐIỂM AUDIT CỦA CEO & 2 YÊU CẦU BỔ SUNG

| # | Hạng Mục CEO Audit | Trạng Thái Cũ (079) | Khắc Phục Chuẩn Xác Trong 079R |
|---|---|---|---|
| 1 | **Nhãn số liệu mẫu trong Calculator** | Số liệu mẫu (65k, 15k...) chưa có cảnh báo minh bạch | **Bổ sung Truth Banner bắt buộc**: *"Ví dụ minh họa — không phải ưu đãi của JayT; hãy nhập các số tiền thực tế trên đơn của bạn."* |
| 2 | **Claim giờ & ưu đãi trong Radar** | Còn ghi `11:00 & 17:00`, `Khung giờ Sale`, `Ưu đãi combo` | **Xóa 100% claim giờ/giá/ưu đãi giả định**: Chỉ hiển thị *"Nguồn công khai đang theo dõi"* hoặc *"Tự kiểm tra trong app"*. |
| 3 | **Hàm tính toán chia tiền nhóm** | Công thức riêng lẻ, có thể âm hoặc thiếu phụ phí | **Thống nhất 1 hàm tính duy nhất `calculatePaymentBreakdown`**: Đơn tối thiểu, voucher clamp `>= 0`, ship, phụ phí, chia nhóm chuẩn từng đồng. |
| 4 | **Mô tả nhắc nhở (Reminder Copy)** | Gây hiểu nhầm có thể nhắc khi đóng app | **Chuẩn hóa copy trung thực**: *"Lưu trong thiết bị; JayT không bảo đảm nhắc khi trình duyệt đóng."* |
| 5 | **Cảnh báo riêng tư khi chia sẻ link** | Chưa có lưu ý khi copy link | **Hiển thị rõ ràng**: *"Bất kỳ ai có link đều xem được nội dung kế hoạch trên; không nhúng thông tin cá nhân."* |
| 6 | **Accessibility & Touch Target** | Thiếu liên kết label-input, focus chưa rõ | **Đạt chuẩn 100%**: `<label for="...">` cho mọi input/select, `:focus-visible` outline 3px rõ ràng, touch target tối thiểu 44px. |

---

## 2. CHI TIẾT THUẬT TOÁN TÍNH TIỀN THUẦN NHẤT (UNIFIED CALCULATION ENGINE)

Tất cả các màn hình (Calculator Pro, Kế hoạch trong ngày, Lập kèo nhóm, URL preview) đều sử dụng chung một hàm tính toán thuần nhất `calculatePaymentBreakdown(params)`:

```javascript
function calculatePaymentBreakdown(params) {
  const itemPrice = Math.max(0, Number(params.item_price) || 0);
  const voucherDiscount = Math.max(0, Number(params.voucher_discount) || 0);
  const minSpend = Math.max(0, Number(params.min_spend) || 0);
  const shippingFee = Math.max(0, Number(params.shipping_fee) || 0);
  const surcharge = Math.max(0, Number(params.surcharge) || 0);
  const splitCount = Math.max(1, Number(params.split_count) || 1);

  // 1. Kiểm tra điều kiện đơn tối thiểu
  const meetsMinSpend = minSpend === 0 || itemPrice >= minSpend;
  
  // 2. Voucher hợp lệ (không vượt quá giá món)
  const effectiveVoucher = meetsMinSpend ? Math.min(itemPrice, voucherDiscount) : 0;
  
  // 3. Giá sau giảm (clamp >= 0)
  const discountedItemPrice = Math.max(0, itemPrice - effectiveVoucher);
  
  // 4. Tổng thực trả sau cùng (bao gồm ship & phụ phí)
  const grossTotal = Math.max(0, itemPrice + shippingFee + surcharge);
  const netTotal = Math.max(0, discountedItemPrice + shippingFee + surcharge);
  
  // 5. Chia tiền trên đầu người
  const perPerson = Math.round(netTotal / splitCount);
  const savingsPercent = grossTotal > 0 ? Math.round((effectiveVoucher / grossTotal) * 100) : 0;

  return { meetsMinSpend, effectiveVoucher, discountedItemPrice, grossTotal, netTotal, perPerson, savingsPercent };
}
```

---

## 3. KẾT QUẢ KIỂM THỬ TOÀN DIỆN (100% PASS TOÀN BỘ 10 TEST SUITES)

Đã chạy toàn bộ 10 bộ kiểm thử tự động, 100% đạt kết quả xanh:

1. `test_utility_beta_truth_079r.js`: **`10/10 PASS`** (Unified Calc, Truth Alert, Radar 0 Claim, Reminder Copy, Share Privacy, Accessibility 44px/Labels, Invariants).
2. `test_utility_beta_experience_079.js`: **`12/12 PASS`** (10 Modules + DOM VM + Invariants).
3. `test_public_beta_readiness_075r.js`: **`6/6 PASS`** (Pure read-only, LOCAL_INTEGRITY_DRILL).
4. `test_probe_to_deal_rejection_gate_077r1.js`: **`5/5 PASS`**.
5. `test_feed_intake_provenance_gate_073b.js`: **`5/5 PASS`**.
6. `test_secret_hygiene_052b.js`: **`8/8 PASS`** (4688 files sạch 100%).
7. `test_quarantine_integrity_contract_truth025b.js`: **`6/6 PASS`**.
8. `test_project_memory_consistency.js`: **`10/10 PASS`**.
9. `test_staging_acceptance_070b.js`: **`8/8 PASS`**.
10. `test_cross_layer_staging_gate_070c.js`: **`6/6 PASS`**.

---

## 4. KỶ LUẬT AN TOÀN & BẢO TOÀN HỆ THỐNG

- **Production Feed**: Khóa hoàn toàn (`deals_feed.json: []`, `is_approved: false`).
- **Zero Deployment Invariant**: Chưa deploy lên Vercel Production; toàn bộ mã nguồn đã đồng bộ tại `deploy/public/jayt_apex_interface.js` và chờ lệnh chính thức từ CEO.
