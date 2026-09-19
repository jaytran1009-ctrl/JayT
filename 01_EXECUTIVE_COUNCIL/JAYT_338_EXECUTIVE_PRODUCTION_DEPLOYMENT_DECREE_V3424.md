# SẮC LỆNH PHÁT HÀNH CHÍNH THỨC M4: JAYT-338

**Mã văn bản:** `JAYT-338 — EXECUTIVE PRODUCTION DEPLOYMENT DECREE v3.424.0 (51 CARDS)`  
**Phạm vi được phê duyệt:** 24 thẻ công ích + 27 thẻ thương mại = 51 thẻ  
**Production domain:** `https://jayt-production-v3420.vercel.app`  
**Quyết định:** `APPROVED__DEPLOYMENT_AUTHORIZED`

Chủ tịch Tập đoàn phê duyệt điều chỉnh phạm vi M4 Production v3.424.0 thành 51 thẻ sạch và cấp quyền triển khai nguyên khối bundle đã niêm phong theo Tờ trình JAYT-337.

## Fingerprint bắt buộc

- Candidate Manifest: `543d6f7b8c8769f515b9dc88c996e054a8d8b7e27b3ce1718f958f78bfcaadfd`
- Storefront Bundle: `0c200c4d5e82c746c16286ae459b8f67c4df6154ed7615efe245a397b3d292dc`
- Registry 51 thẻ: `bab51db53f5f34934c539968484a2f8055f3fa61786db608b91b9db9349b40c6`
- Preflight Receipt: `c991db62504c59dc25a8818c8be301e3500c4ff04bf1b0badf9533048b65aa34`
- Rollback Manifest v3.423.0: `e1cf772d21b987bbc1193e74bbd3f484fac6c0e4500013b99567efcf33a0d6d6`

## Điều kiện hậu kiểm

Sau deploy, hệ thống phải trả HTTP 200, render đúng 51 thẻ trên 1440/768/390px, không console/runtime error, không overflow, không affiliate/tracking và `deals_feed.json` tiếp tục là `[]`. Nếu bất kỳ cổng nào thất bại, kích hoạt rollback xác định về deployment v3.423.0 `dpl_9Gug4BDaBDxzpUXXAv1HrGAcLZmA`.
