# VĂN KIỆN ĐIỀU HÀNH & CÔNG VĂN TÁC CHIẾN CẤP CAO: CEO CODEX PHÊ CHUẨN NGHIỆM THU PHIÊN SỬA LỖI J414, KHÓA KỶ CƯƠNG "THẬT 100% HOẶC KHÔNG HIỂN THỊ" VÀ PHÁT LỆNH GO-LIVE TOÀN DIỆN ĐÀ NẴNG (320.000 DÂN CƯ)

- **Mã Hiệu Ban Hành:** `JAYT_415_CEO_RATIFY_J414_FIX_AND_LAUNCH_DANANG_GO_LIVE_DISPATCH`
- **Căn Cứ Pháp Lý & Chỉ Đạo Cấp Cao:** `CHAIRMAN_DIRECTIVE_20260917_RATIFY_J414_FIX_AND_LAUNCH_DANANG_GO_LIVE`
- **Cơ Quan Ban Hành:** Giám Đốc Điều Hành (CEO Codex) & Khối Kỹ Thuật Hệ Thống Antigravity
- **Đơn Vị Chấp Hành:** Toàn Bộ Khối Kỹ Thuật Hệ Thống Antigravity & Khối Vận Hành Tăng Trưởng Cộng Đồng
- **Thời Điểm Kích Hoạt Lệnh:** 15:10:00+07:00 ngày 17/09/2026
- **Trọng Tâm Phục Vụ:** 320.000 Sinh Viên & Nhân Viên Văn Phòng Tại 4 Phân Vùng Trọng Điểm TP. Đà Nẵng
- **Trạng Thái Vận Hành:** **FULL_DANANG_GO_LIVE_ACTIVE**
- **Canonical Production URL:** `https://jayt-production-v3420.vercel.app`
- **Vercel Production Deployment ID:** `dpl_BFAjGC5z7xVb4KwrL59sDzczhEq4` (State: READY, Aliased)
- **Production Bundle Hash:** SHA-256 `1e6d3ee2626c80a853f83e27bf47c3d3e31a35f5e79e73d8fc8102079413a35d` (837,506 bytes)

---

## I. CHUẨN Y NGHIỆM THU KẾT QUẢ KHẮC PHỤC KỸ TRỊ PHIÊN J414

Căn cứ sắc lệnh chuẩn y của Chủ tịch Hội đồng Quản trị Tập đoàn JayT Corp và Biên nhận Kiểm định Nghiệm thu [`07_QUALITY_ASSURANCE/runtime_evidence/JAYT_414_COMPARISON_BUTTON_MODAL_AUDIT_RECEIPT.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/JAYT_414_COMPARISON_BUTTON_MODAL_AUDIT_RECEIPT.json), CEO Codex chính thức phê chuẩn nghiệm thu dứt điểm toàn bộ sự cố nút "⚡ So Giá 3 Sàn":

1. **Khắc phục triệt để đứt gãy ánh xạ SKU (O(1) Direct Lookup):**
   - Đã tích hợp bảng băm O(1) `SHELF_SKU_TO_TRIPLET_MAP` liên kết trực tiếp 100% (20/20) sản phẩm trên kệ KTX (`DORM_SKU_FEED_01_23552060269`..`20`) với Bộ Ba Định Danh (`CROSS_PLATFORM_SKU_TRIPLETS`).
   - Mở rộng toàn diện `matchKeys` trong cả 10 Triplet hợp đồng bao hàm đầy đủ `skuId`, `itemId`, `variant_id`, URL chính hãng và tên sản phẩm, đưa tỷ lệ đối soát thành công từ shelf lên Bộ Ba Định Danh đạt **100% (20/20 sản phẩm)** trong 0ms latency.

2. **Quy tụ luồng hiển thị độc quyền về modal chuẩn `#jayt-voucher-scanner-modal`:**
   - Đã khai tử hoàn toàn modal phụ thiếu CSS (`#jayt-sku-cross-radar-modal`).
   - Bổ sung khả năng xử lý đa hình (polymorphic) cho hàm `openVoucherScannerModal`: nhận diện cả chuỗi SKU ID lẫn đối tượng radar payload.
   - Ép cứng trực tiếp style CSS chống đè layer tuyệt đối:
     ```css
     position: fixed !important;
     inset: 0 !important;
     z-index: 99999 !important;
     display: flex !important;
     align-items: center !important;
     justify-content: center !important;
     background: rgba(0,0,0,0.82) !important;
     backdrop-filter: blur(8px) !important;
     ```

3. **Khóa cứng cuộn trang nền & Đồng bộ trọn bộ 3 cơ chế đóng tức thì:**
   - Tự động áp dụng `document.body.style.overflow = 'hidden'` khi mở modal, triệt tiêu hiện tượng nhảy trang hoặc cuộn nền ngoài ý muốn.
   - Tự động phục hồi `document.body.style.overflow = ''` khi đóng qua `closeVoucherScannerModal()`.
   - Vận hành mượt mà 3 phương thức đóng: Nút bấm ✕, Phím `Escape` bàn phím, và Nhấp vào vùng nền tối backdrop.

4. **Khóa cứng kỷ cương "Thật 100% hoặc Không hiển thị":**
   - Với các SKU đối thủ chưa có gian hàng Mall chính thức, nút CTA được khóa cứng thành:
     ```
     🔒 Chưa Có Link Chính Hãng
     ```
   - Tuyệt đối cấm dẫn link sang trang tìm kiếm chung hay trang chủ; bảo vệ tính minh bạch tối thượng và niềm tin của người dùng.

5. **Bộ chỉ số kỹ trị bất biến được bảo toàn trọn vẹn:**
   - 24/24 Static Pipeline Seals PASS TUYỆT ĐỐI (`scripts/verify_pipeline_seal.cjs`).
   - 5/5 W8 Toolchain Seals PASS (`scripts/verify_w8_feed_toolchain.cjs`).
   - 5/5 J414 Comparison Button & Modal Tests PASS TUYỆT ĐỐI (`07_QUALITY_ASSURANCE/test_j414_comparison_button_modal.cjs`).
   - 4/4 Feature 01 Pillars Tests PASS 100% (`07_QUALITY_ASSURANCE/test_feature_01_deep_audit_four_pillars.cjs`).
   - 6/6 Triplet Contract Tests PASS 100% (`07_QUALITY_ASSURANCE/test_sku_triplet_contract.cjs`).
   - 100% Bit-Parity tuyệt đối giữa hai không gian làm việc WS1 và WS2.
   - Bản triển khai sạch `dpl_BFAjGC5z7xVb4KwrL59sDzczhEq4` đã vận hành ổn định trên Vercel Edge Network.

---

## II. PHÁT LỆNH GO-LIVE TOÀN THÀNH PHỐ ĐÀ NẴNG: CHIẾN THUẬT "GỌNG KÌM SÔNG HÀN"

CEO Codex phát lệnh cho Khối Kỹ Thuật Antigravity và Khối Vận Hành Tăng Trưởng Cộng Đồng kích hoạt chiến dịch tiếp cận 320.000 dân cư tại TP. Đà Nẵng theo lộ trình tác chiến 3 mũi nhọn:

```
                       [CHIẾN THUẬT GỌNG KÌM SÔNG HÀN]
                                      │
        ┌─────────────────────────────┴─────────────────────────────┐
        ▼                                                           ▼
[MŨI 1: BÁCH KHOA HÒA KHÁNH]                                [MŨI 2: TRỤC NGUYỄN VĂN LINH]
(Thứ Hai – Thứ Tư)                                          (Thứ Năm – Thứ Bảy)
• 45.000 Sinh viên (DUT, UED)                              • 200.000 Nhân viên văn phòng
• Kệ KTX Săn Đáy <= 49k (Shopee Live 50%)                  • Trọng tài Pick-up cơm trưa (-20k..30k)
• Nút So Giá 3 Sàn bóc tách mã ẩn                          • So sánh giá sạc GaN, chuột silent 3 sàn
• Zalo Deal Pass PNG chia bill tròn đồng                   • VietQR chia bill chầu nước văn phòng
• Cẩm nang DanaBus KTX 130k/tháng                          • Dòng tiền hoa hồng CPS/CPA lớn
        │                                                           │
        └─────────────────────────────┬─────────────────────────────┘
                                      ▼
                      [MŨI 3: CUỐI TUẦN TOÀN THÀNH PHỐ]
                      (Chủ Nhật)
                      • Lịch Kèo Rạp 7 Ngày (Metiz 45K, Galaxy 50K)
                      • Cashier HUD giảm 10%–15% tại quầy 11 chuỗi F&B
                      • Cụm Hải Châu: 40.000 SV | Cụm Ngũ Hành Sơn: 35.000 SV
```

### 1. Mũi 1 (Thứ Hai – Thứ Tư): Cụm ĐH Bách Khoa & Sư Phạm Tây Bắc Hòa Khánh (~45.000 SV):
- Khởi động chiến dịch bằng Kệ KTX Săn Đáy $\le 49\text{k}$ sử dụng ảnh studio Shopee CDN sắc nét, bóc tách mã Shopee Live 50%, freeship 0đ cho đồ dùng thiết yếu (Khăn giấy Top Gia, ốp lưng Shin Case, mì Koreno, sạc GaN).
- Thúc đẩy công cụ xuất thẻ ảnh Zalo Deal Pass Canvas PNG 1080x1440 chia tiền nhóm tròn đồng để tạo vòng lặp lan tỏa tự nhiên 0 đồng chi phí marketing.
- Phổ biến cẩm nang DanaBus trợ giá học sinh - sinh viên 130.000đ/tháng kết nối KTX Hòa Khánh về trung tâm thành phố.

### 2. Mũi 2 (Thứ Năm – Thứ Bảy): Trục Văn Phòng & Tài Chính Nguyễn Văn Linh (~200.000 NVVP):
- Đánh chiếm phân khúc nhân viên văn phòng bằng công cụ Trọng tài Pick-up cơm trưa tiết kiệm từ 20.000đ – 30.000đ/suất so với giá đặt giao tận nơi trên ShopeeFood, GrabFood, Xanh SM.
- Công cụ so sánh giá sạc GaN 30W/100W, chuột không dây silent Logitech M350S giữa 3 sàn chuẩn xác theo từng phân loại biến thể hàng.
- VietQR Quick Dock chia tiền nước văn phòng tròn đồng không phát sinh chênh lệch tiền lẻ.

### 3. Mũi 3 (Chủ Nhật): Cuối Tuần Giải Trí & F&B Toàn Thành Phố (~75.000 Người Trẻ):
- Kích hoạt phân hệ Lịch Kèo Rạp 7 Ngày với giá vé sinh viên độc quyền (Metiz U22 45K, Galaxy Happy Day 50K).
- Cashier HUD hiển thị mã ưu đãi giảm 10%–15% trực tiếp tại quầy của 11 chuỗi F&B lớn nhất Đà Nẵng (Highlands Bạch Đằng, Phê La Nguyễn Văn Linh, Phúc Long 2 Tháng 9, Katinat...).

---

## III. KỶ LUẬT AN TOÀN FAIL-CLOSED & QUY TRÌNH KÍCH HOẠT THƯƠNG MẠI DUAL-KEY

1. **Duy trì kỷ luật an toàn Fail-Closed:**
   - Tiếp tục khóa cứng cờ an toàn `CONFIG.affiliate_enabled: false` trên Production Canonical trong đợt phát động đầu để bảo vệ an toàn tài khoản đối tác tiếp thị liên kết; hàm `dispatchSmartAffiliate()` điều hướng trực tiếp URL Canonical sạch.
2. **Duy trì module đối soát ở trạng thái Staging Read-Only:**
   - Tệp công cụ `scripts/reconcile_w8_conversion_report.cjs` duy trì ở trạng thái Staging Read-Only thường trực để tiếp nhận tệp CSV đối soát từ các cổng:
     * Shopee Affiliate Portal: Partner ID `17372870594`
     * Lazada Affiliate Portal: Partner ID `262501305`
     * TikTok Shop Affiliate Portal: Partner ID `VNVNLCB6LYL3`
3. **Cơ chế Dual-Key mở cờ thương mại vĩnh viễn:**
   - Khi có đơn hàng phát sinh tự nhiên từ chiến dịch thực địa tại Đà Nẵng, Khối Kỹ thuật Antigravity sẽ tiến hành nạp tệp CSV đối soát, trích xuất mã đơn và tỷ lệ hoa hồng thực tế, lập tờ trình để Chủ tịch HĐQT và CEO Codex cùng ký duyệt mở cờ `affiliate_enabled: true` vĩnh viễn.

---

*Lệnh có hiệu lực thi hành ngay lập tức trên toàn hệ sinh thái.*
