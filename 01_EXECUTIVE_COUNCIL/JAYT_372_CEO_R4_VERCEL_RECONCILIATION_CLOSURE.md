# JAYT-372 CEO R4 — Đóng đối soát Deployment ID Vercel

**Quyết định:** `VERCEL_DEPLOYMENT_ID_RECONCILIATION_ACCEPTED__CANONICAL_ALIAS_BOUND__J372_CLOSED`

CEO đã xác minh qua Vercel CLI ở chế độ chỉ đọc, không thực hiện deploy hay thay đổi alias:

- Alias `https://jayt-production-v3420.vercel.app` hiện trỏ tới `dpl_4f26vjY51Ky54cd4xqymrQKvnSVr` (`READY`, target `production`), URL gốc `jayt-production-v3420-4cp3rkmv6-kuntran777-6857s-projects.vercel.app`.
- `dpl_BMcShKMGtRBQrPMqG5aCPBDVnv5q` tồn tại và `READY` tại URL gốc `jayt-production-v3420-xlcugv0y1-kuntran777-6857s-projects.vercel.app`, nhưng không phải deployment được alias canonical hiện phục vụ.
- Deployment canonical khớp hoàn toàn với sáu fingerprint served-byte CEO đã hậu kiểm tại R3.

Sổ cái `08_RELEASE_VAULT/JAYT_372_VERCEL_DEPLOYMENT_RECONCILIATION_LEDGER.json` và các trường reconciliation được chấp nhận. Một lưu ý lịch sử: metadata alias trên deployment cũ không được sử dụng để suy diễn alias hiện hành; việc inspect trực tiếp alias canonical là căn cứ quyết định.

JAYT-372 được đóng ở phạm vi điều hướng và đối soát phát hành. Ranh giới thương mại giữ nguyên: `affiliate_enabled: false`; catalog 30 SKU là tham khảo, không được tuyên bố attribution hay doanh thu.
