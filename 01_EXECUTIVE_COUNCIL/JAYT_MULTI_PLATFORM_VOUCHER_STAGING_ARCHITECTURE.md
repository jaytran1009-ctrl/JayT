# KIẾN TRÚC KỸ THUẬT: HỆ THỐNG VOUCHER ĐA SÀN & SO SÁNH GIÁ HYPERLOCAL (MAGIAMGIA PRO STAGING)

**Mã văn kiện:** `JAYT_MULTI_PLATFORM_VOUCHER_STAGING_ARCHITECTURE`  
**Thời điểm ban hành:** 15/09/2026  
**Thẩm quyền ban hành:** CEO Codex (Compliance Gatekeeper) & Chủ tịch Tập đoàn JayT Corp  
**Phạm vi áp dụng:** Môi trường Thử nghiệm & Đối soát Staging (Staging Sandbox Only)  
**Trạng thái tuân thủ:** `STAGING_SCOPE_RATIFIED__PRODUCTION_COMMERCIAL_INVARIANTS_HELD`

---

## I. TỔNG QUAN CHIẾN LƯỢC & MÔ HÌNH HOẠT ĐỘNG

Hệ thống săn deal & tổng hợp voucher đa sàn JayT được định vị theo mô hình **Magiamgia Pro kết hợp Công cụ So sánh Giá Hyperlocal Đà Nẵng**:
1. **Nhiệm vụ cốt lõi:** Cung cấp thông tin voucher, chiết khấu và ưu đãi chính hãng từ 4 nền tảng (Shopee, Lazada, TikTok Shop, Accesstrade) cho 120.000 sinh viên và 200.000 dân văn phòng tại Đà Nẵng.
2. **Nguyên tắc kỹ trị:** Dữ liệu ưu đãi phải có xuất xứ kỹ thuật minh bạch (Data Provenance), không suy diễn mã giảm giá, không tạo giá gạch ảo, và không công bố cam kết vượt quá thẩm quyền như "mã sâu nhất".

---

## II. ĐẶC TẢ ADAPTER 4 NỀN TẢNG & RANH GIỚI TUÂN THỦ (PROVIDER SPECIFICATIONS)

```
                  [ JAYT MULTI-PLATFORM STAGING ENGINE ]
                                    │
    ┌───────────────────┬───────────┴───────────┬───────────────────┐
    ▼                   ▼                       ▼                   ▼
[ SHOPEE ADAPTER ]  [ ACCESSTRADE ADAPTER ] [ TIKTOK SHOP ADAPTER ] [ LAZADA ADAPTER ]
(Portal Export CSV) (Datafeed REST API)     (Affiliate API)         (Publisher Open API)
 Status: ACTIVE      Status: ACTIVE API      Status: DISABLED        Status: RESTRICTED
 Provenance: Băm     Provenance: Token API   Lý do: Chờ App OAuth   Lý do: Voucher API
 Ledger Block #0     Schema: Giá, link, ảnh  Phê duyệt Scope         thuộc Seller tool
```

### 1. Shopee Ingress Engine
- **Cơ chế thu thập:** Tệp xuất Product Offer Export CSV chính thức từ Cổng Tiếp thị Shopee Việt Nam (`affiliate.shopee.vn`).
- **Tài khoản định danh:** Operator Account ID `17372870594`.
- **Ranh giới:** Cấm tuyệt đối bot scraping, crawler hoặc giả lập click. Toàn bộ bản ghi phải neo mã băm SHA-256 vào Sổ cái Xuất xứ (Provenance Ledger).
- **Trạng thái adapter:** `ACTIVE_PORTAL_VERIFIED`.

### 2. AccessTrade Datafeed Ingress Engine
- **Cơ chế thu thập:** Kết nối chính thức qua [AccessTrade Datafeeds API](https://developers.accesstrade.vn/api-publisher-vietnamese/lay-thong-tin-datafeeds).
- **Trường dữ liệu bắt buộc:** Giá niêm yết, tỷ lệ chiết khấu, giá khuyến mãi, URL ảnh sản phẩm, URL sản phẩm sạch và thời gian cập nhật.
- **Ranh giới:** Chỉ thu thập các chiến dịch (campaigns) còn hiệu lực và được phê duyệt cho Publisher ID của JayT.
- **Trạng thái adapter:** `ACTIVE_API_TOKEN_VERIFIED`.

### 3. TikTok Shop Affiliate Ingress Engine
- **Cơ chế thu thập:** Kết nối qua [TikTok Affiliate Integration API](https://partner.tiktokshop.com/docv2/page/affiliate-integration).
- **Ranh giới nghiêm ngặt:** Affiliate API mặc định **KHÔNG HOẠT ĐỘNG** nếu App chưa được phê duyệt chính thức và cấp đúng phạm vi quyền (OAuth Scope) cùng Access Token hợp lệ.
- **Trạng thái adapter:** `DISABLED_PENDING_APP_AUTHORIZATION`.

### 4. Lazada Publisher Ingress Engine
- **Cơ chế thu thập:** Phân hệ [Lazada Open Platform](https://open.lazada.com/apps/doc/getting_started).
- **Ranh giới nghiêm ngặt:** Lazada Voucher API hiện tại là công cụ dành riêng cho Nhà bán hàng (Seller Tool); **chưa được coi là nguồn dữ liệu hợp lệ cho Affiliate Publisher** nếu chưa có thỏa thuận Publisher App Authorization riêng biệt.
- **Trạng thái adapter:** `RESTRICTED_PENDING_PUBLISHER_APP_KEY`.

---

## III. NGUYÊN TẮC SO SÁNH GIÁ & ĐỐI SOÁT ƯU ĐÃI

1. **Cấm cam kết "Mã sâu nhất":** Hệ thống chỉ so sánh những ưu đãi **đồng thời thỏa mãn điều kiện và còn hiệu lực** tại thời điểm kiểm tra (`observed_at`).
2. **Thuật toán xếp tầng (Dynamic Stack Calculation):**
   - Chỉ tính toán dựa trên các trường có căn cứ: Giá gốc, Mã giảm giá ngành hàng/shop, và Phí vận chuyển tiêu chuẩn.
   - Không tự nội suy voucher thanh toán ví nếu người dùng chưa chọn ví thanh toán cụ thể.
3. **Cảnh báo tính thời điểm:** Mọi hiển thị ưu đãi đều phải đi kèm nhãn thời gian đối soát và disclaimer biến động giá trên sàn.

---

## IV. BẢO TOÀN RANH GIỚI THƯƠNG MẠI & SẢN XUẤT (PRODUCTION INVARIANTS)

1. **Hàm điều hướng `dispatchSmartAffiliate()`:**
   - Tiếp tục duy trì vai trò là **Hàng rào an toàn không điều hướng (Non-dispatching sandbox guard)**.
   - Tuyệt đối không phát Partner IDs (`17372870594`, `262501305`, `VNVNLCB6LYL3`) vào browser bundle trên Production khi chưa có Dual-Key ủy quyền.
2. **Cờ phát hành thương mại:** `affiliate_enabled: false` trên Production Canonical (`https://jayt-production-v3420.vercel.app/`).
3. **Niêm phong đĩa cứng:**
   - Baseline Static Pipeline Seal: Duy trì **24/24 PASS TUYỆT ĐỐI**.
   - Feed Toolchain Seal: Duy trì **5/5 PASS TUYỆT ĐỐI**.
   - Tệp `deploy/deals_feed.json` (chứa 2 rạp chiếu phim đã xác minh) bảo lưu nguyên vẹn trạng thái niêm phong cho đến khi có chứng từ mới được ký duyệt.
