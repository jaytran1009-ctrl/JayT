# JAYT PROGRAM: HƯỚNG DẪN BẮT ĐẦU DUY NHẤT (START HERE AZ/BA/BB)

**Phiên bản chỉ thị hiện hành:** [JAYT-245 — Tổng Chỉ Thị CEO Duy Nhất Về Vận Hành Và Go-Live JayT (Mục BB)](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md)  
**Thời gian cập nhật:** 2026-08-29T12:31:00+07:00  
**Quy tắc tối cao:** **UPGRADE-ONLY — KHÔNG XÂY LẠI TỪ ĐẦU, KHÔNG XÓA DỮ LIỆU CŨ, KHÔNG DEPLOY PRODUCTION KHI CHƯA CÓ PHÁN QUYẾT CEO.**

## CURRENT TRUTH HEADER — JAYT-277 (03/09/2026)

Phần này là con trỏ vận hành mới nhất và **ghi đè các bảng trạng thái lịch sử mâu thuẫn bên dưới**.

- Đọc [JAYT_CURRENT_STATE_BY.json](JAYT_CURRENT_STATE_BY.json) trước mọi thao tác.
- JAYT-274: 8 dossier Batch 03 đều `HELD`; không có `PUBLIC_APPROVED` mới vì raw body không chứng minh đúng trang lá hiện hành.
- JAYT-275: Batch 03B có 3 đề xuất trang lá tĩnh; 25 mục vẫn `HELD_FOR_RESEARCH`.
- JAYT-276: quota micro-capture 3/3 đã tiêu thụ và nhận `INTAKE_FAILED__QUARANTINE`; không retry theo lệnh đó.
- JAYT-278: browser đã xác minh identity hiển thị của 3 trang lá; chỉ ingress do operator cung cấp raw byte/header mới có thể chuyển sang evidence-held. Xem `06_TRUST_AND_EVIDENCE/JAYT_278_OPERATOR_VERIFIED_INGRESS.json`.
- JAYT-275 là lớp kiểm soát sourcing cho Batch 03B; Hard Freeze circuit breaker vẫn `ACTIVE` riêng cho `COHORT_15_RUNNER` và `CATALOG_BUILD`.
- Public Staging chỉ có 1 GitHub Pilot; Production `v3.419.0` khóa; `deals_feed.json = []`, voucher = 0, affiliate = false.
- Bằng chứng bắt buộc: `RUNTIME_FREEZE_TRACE_EVIDENCE.log`, `06_TRUST_AND_EVIDENCE/JAYT_274_ITEM_LEVEL_AUDIT_VERDICT.json`, `06_TRUST_AND_EVIDENCE/JAYT_BATCH_03B_LEAF_PAGE_PROPOSALS.json`, và `06_TRUST_AND_EVIDENCE/batch_03b_micro_capture_vault/JAYT_276_MICRO_CAPTURE_MANIFEST.json`.

---

## 1. Thứ Tự Đọc Bắt Buộc Cho Mọi Chat Mới (Mandatory Reading Order)

Khi bắt đầu một phiên làm việc mới hoặc tiếp quản nhiệm vụ, agent/kỹ sư **bắt buộc** phải đọc theo đúng thứ tự 6 bước sau:

1. **Bước 1:** Đọc file này ([START_HERE_AZ.md](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/START_HERE_AZ.md)) để nắm quy tắc và thứ tự điều phối.
2. **Bước 2:** Đọc con trỏ hiện trạng mới nhất [JAYT_CURRENT_STATE_BB.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_CURRENT_STATE_BT.json) để xác định chính xác Production, các Staging và Candidate UI mới nhất.
3. **Bước 3:** Đọc phả hệ phát hành [JAYT_RELEASE_LINEAGE_AZ.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_RELEASE_LINEAGE_AZ.json) và biên nhận đối soát [JAYT_WORKSPACE_RECONCILIATION_RECEIPT_BB.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_WORKSPACE_RECONCILIATION_RECEIPT_BT.json).
4. **Bước 4:** Tra cứu danh mục hạ tầng [JAYT_PLATFORM_CATALOG_AZ.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/JAYT_PLATFORM_CATALOG_AZ.json) để biết vị trí chính xác của từng module/ledger/source.
5. **Bước 5:** Đọc mục mới nhất trong [JAYT-245](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/00_PROGRAM_BASELINE/../02_CEO_DIRECTIVES/JAYT-245_TONG_CHI_THI_CEO_DUY_NHAT_VAN_HANH_JAYT.md) để nắm lệnh của CEO.
6. **Bước 6:** Đọc biên nhận phát hành [staging_release_receipt_v34221_staging_bb.json](file:///d:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/07_QUALITY_ASSURANCE/staging_release_receipt_v34221_staging_bb.json) trước khi thao tác.

---

## 2. Bảng Tóm Tắt Hiện Trạng Vận Hành (State Truth BB)

| Hạng Mục | Phiên Bản | Địa Chỉ Triển Khai Thực Tế | Trạng Thái Quản Trị & State Truth |
|---|---|---|---|
| **Production Live** | `v3.419.0` | [https://deploy-ten-xi-48.vercel.app](https://deploy-ten-xi-48.vercel.app) | **KHÓA AN TOÀN 100% — BASELINE ROLLBACK** |
| **Current Design Candidate** | `v3.426.0-staging.bt` | [https://jayt-storefront-staging-bt.vercel.app](https://jayt-storefront-staging-bt.vercel.app) | **ACTIVE REVIEW DESIGN CANDIDATE** |
| **Staging AY (Lưu Audit)** | `v3.422.0-staging.ay` | [https://jayt-storefront-staging-ay.vercel.app](https://jayt-storefront-staging-ay.vercel.app) | False-Provenance / Isolated from promotion |
| **Nguồn Cung Public Theo Tầng** | 33 mục | 1 Deal xác minh + 15 Nguồn chính thức + 13 Radar | **1 Field-Certified (CGV VNPAY), 32 Pending Field-Certification (AU)** |
| **Hàng Quarantined** | 1 mục | `DEAL_120_CGV_ZALOPAY_12H` | Cô lập trong hồ sơ cách ly (`NO_FIELD_LEVEL_EVIDENCE`) |
| **Workspace Reconciliation** | 15.973 files | `JAYT_WORKSPACE_RECONCILIATION_RECEIPT_BB.json` | 15973/15973 Tracked, 0 Missing, 1152 Quarantined assets |
| **Cổng M3 Affiliate** | 0 link / 0 campaign | Cổng AccessTrade | Duy trì `PORTAL_ACCESS_NOT_VERIFIED` |

---

## 3. Quy Tắc Nâng Cấp Bất Biến (Upgrade-Only Invariants)

1. **Cấm Viết Lại Từ Đầu / Cấm Thay Thế File Gốc:** Mọi thay đổi phải là bản vá/migration có cơ sở xuất phát rõ ràng từ phiên bản trước.
2. **Cấm Deploy Production Trực Tiếp:** Chỉ triển khai lên URL staging độc lập; Production `v3.419.0` chỉ được thay đổi khi có phán quyết bằng văn bản của CEO.
3. **Phản Ánh Đúng Sự Thật Dữ Liệu:** 1 Field-Certified duy nhất (`CGV VNPAY BOGO`), 32 mục còn lại hiển thị nhãn trung thực `Nguồn chính thức — đang rà soát theo field`.
4. **Bảo Toàn Lịch Sử Tuyệt Đối:** Không xóa, không đổi tên các file manifest AN, registry AN, các receipt và các hồ sơ cô lập cũ.
5. **Một Báo Cáo Tiếng Việt Duy Nhất:** Antigravity chỉ nộp một báo cáo tổng hợp tiếng Việt mỗi ngày theo mẫu 6 phần ở Mục F.
