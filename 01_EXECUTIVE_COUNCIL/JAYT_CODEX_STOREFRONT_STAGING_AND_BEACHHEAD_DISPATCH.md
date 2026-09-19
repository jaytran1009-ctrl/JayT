# ENGINEERING DISPATCH: TRIỂN KHAI GIAO DIỆN STOREFRONT STAGING VÀ CHUẨN BỊ BỆ PHÓNG HÒA KHÁNH

**Mã văn kiện:** `JAYT_CODEX_STOREFRONT_STAGING_AND_BEACHHEAD_DISPATCH`  
**Thời điểm ban hành:** 15/09/2026  
**Thẩm quyền ban hành:** CEO Codex (Compliance Gatekeeper & Key 2)  
**Kính gửi:** Chủ tịch Hội đồng Quản trị Tập đoàn JayT Corp (Key 1)  
**Đồng kính gửi:** Khối Kỹ thuật & Hạ tầng Hệ thống Antigravity  
**Căn cứ pháp lý:** Chỉ thị Chủ tịch `MY_REQUEST_20260915_STOREFRONT_STAGING_AND_BEACHHEAD_DISPATCH`  
**Trạng thái phê chuẩn:** `STOREFRONT_STAGING_OPERATIONAL__BEACHHEAD_PREPARATION_AUTHORIZED__AFFILIATE_FALSE`

---

## I. XÁC NHẬN NGHIỆM THU ĐĨA CỨNG (GATEKEEPER VERIFICATION)

CEO Codex đã thực thi chuỗi lệnh kiểm định toàn vẹn đĩa cứng độc lập:

```powershell
node scripts/validate_multi_platform_voucher_schema.cjs; node scripts/verify_pipeline_seal.cjs; node scripts/verify_w8_feed_toolchain.cjs
```

**Kết quả kiểm toán:**
1. **Kiểm chuẩn Schema Đa Sàn (`scripts/validate_multi_platform_voucher_schema.cjs`):**
   - Tự kiểm thử (Self-test): **PASS 100%**.
   - Kiểm toán Staging Feed (`05_DEAL_AND_AFFILIATE/deals_feed.json`): **22/22 bản ghi PASS TUYỆT ĐỐI**, đáp ứng 10/10 trường chuẩn hóa.
2. **Baseline Static Pipeline Seal (`scripts/verify_pipeline_seal.cjs`):**
   - **24/24 Static Sealed Files PASS TUYỆT ĐỐI** trên cả hai không gian làm việc (WS1 & WS2).
3. **Feed Toolchain Seal (`scripts/verify_w8_feed_toolchain.cjs`):**
   - **5/5 Files PASS TUYỆT ĐỐI**, xác nhận công cụ bóc tách feed và đối soát chuyển đổi nguyên vẹn.
4. **Workspace Bit-Parity:**
   - Bảo toàn **100% Bit-Identical** giữa WS1 và WS2.

---

## II. PHÊ CHUẨN VẬN HÀNH STOREFRONT STAGING & BỆ PHÓNG HÒA KHÁNH

CEO Codex chính thức phê chuẩn phạm vi tác chiến kỹ thuật cho Khối Antigravity:

### 1. Kết Nối Storefront & Thuật Toán Bóc Tách
- Kích hoạt đầy đủ các khối chức năng trên Storefront:
  * **Hộp bóc tách voucher ẩn (Link Inspector):** Vận hành thuật toán `calculateDynamicStack` ở chế độ Staging Sandbox, cấn trừ 4 tầng mã minh bạch dựa trên dữ liệu thật.
  * **Kệ deal KTX đối soát:** Trình bày rõ ràng giá niêm yết, giá thực tế, tên cửa hàng chính hãng, mốc thời gian đối soát `15/09/2026` và khuyến nghị biến động giá sàn.
  * **Bộ ba tiện ích điểm bán:** Cashier HUD 3 giây ($P_{95} \le 30\text{ms}$), Trọng tài bữa trưa 3 App (tiết kiệm 20k–30k), và VietQR Chia Bill Zalo Pass (chia đều phẳng lẻ).

### 2. Quản Trị Ranh Giới An Toàn Cho Bệ Phóng Hòa Khánh
- **Điều hướng Affiliate:** Hàm `dispatchSmartAffiliate()` tiếp tục vận hành theo chế độ điều hướng URL Canonical Shopee sạch (`https://shopee.vn/product/<shopId>/<itemId>`), **tuyệt đối không chèn Partner ID hoặc tracking parameters vào URL trình duyệt**.
- **Cờ thương mại Production:** Duy trì `affiliate_enabled: false` trên Production Canonical (`https://jayt-production-v3420.vercel.app/`).
- **Phát sinh đơn hàng tự nhiên (Organic Conversion Flywheel):**
  * Khi người dùng thật tại khu vực Hòa Khánh (ĐH Bách Khoa, ĐH Sư Phạm) click các link Canonical và phát sinh giao dịch tự nhiên, hệ thống Shopee Affiliate Portal (Account ID: `17372870594`) sẽ ghi nhận đơn hàng hợp thức.
  * Module `scripts/reconcile_w8_conversion_report.cjs` (duy trì Staging Read-Only) sẵn sàng tiếp nhận tệp CSV báo cáo chuyển đổi này để đối soát độc lập.
  * Khi có báo cáo chuyển đổi đối soát thành công, Hội đồng Quản trị và Codex sẽ kích hoạt ký duyệt Dual-Key Manifest để mở cờ `affiliate_enabled: true` toàn diện!
