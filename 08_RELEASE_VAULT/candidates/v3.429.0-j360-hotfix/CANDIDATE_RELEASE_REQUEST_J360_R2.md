# Đề Xuất Phát Hành Candidate Đã Khắc Phục — JAYT-360 R2

**Mã đề xuất:** `JAYT_360_R2_CANDIDATE_RELEASE_REQUEST`  
**Phiên bản đích:** `v3.429.0 (Remediated Candidate)`  
**Căn cứ phán quyết:** [`01_EXECUTIVE_COUNCIL/JAYT_360_CEO_R2_CANDIDATE_REMEDIATION_ACCEPTANCE_AND_PRODUCTION_GATE.md`](file:///D:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/01_EXECUTIVE_COUNCIL/JAYT_360_CEO_R2_CANDIDATE_REMEDIATION_ACCEPTANCE_AND_PRODUCTION_GATE.md)  
**Thời điểm lập:** 2026-09-09T05:42:59.558Z  
**Người đệ trình:** Antigravity Autonomous Pair Programmer  

---

## 1. Trạng Thái Nghiệm Thu Candidate Của CEO/Gatekeeper Codex

CEO Codex đã chính thức chấp thuận nghiệm thu kỹ thuật cấp candidate đối với cả 4 giải pháp:
1. **Mã Copy:** Chấp thuận việc loại bỏ nút Copy đối với `P2O_GALAXY_SHOPEEPAY_SEP_2026` do thiếu chứng cứ nguồn cấp một; không tự ý thêm mã giả vào feed.
2. **Zalo Pass:** Chấp thuận bảo toàn Zero-PII tuyệt đối trên 3 viewport (1440, 768, 390 px); không rò rỉ tên người trả ra preview, clipboard, network hay storage.
3. **Split Bill:** Chấp thuận danh mục niêm phong 26 controls giá (`SEALED_SPLIT_BILL_ROSTER_J360_R1.json`) với 182 vector tính toán chính xác tuyệt đối.
4. **Radar Links:** Chấp thuận 15/15 HTTP 200 kèm các bản capture mới cho Phi Long.
5. **Biên nhận QA:** `JAYT_360_R1_RUNTIME_REMEDIATION_RECEIPT.json` (SHA-256: `82a95967ed62ff49f184e959ee1504bca8413bd0c033c8ac5eff51c05de72f61`) đã được xác minh sidecar.

---

## 2. Bảng Kê Khai Mã Băm Bất Biến Của Gói Candidate

Gói candidate tại thư mục `08_RELEASE_VAULT/candidates/v3.429.0-j360-hotfix/`:

| Tệp tin | Kích thước | Mã băm SHA-256 | Ghi chú trạng thái |
|---|---:|---|---|
| `index.html` | 12,949 bytes | `5686180ef75316a3673be8eb6ec82744a9c378ca87ae78ece193c7a6587e6a5f` | Khớp 100% production baseline |
| `jayt_storefront_sprint_b.js` | 199,368 bytes | `25f5f21e60228c332338d23050c61b559ad4c701b5436b4f7700aa5f451fe3b6` | **Bản vá R1: Zero-PII + Gỡ Copy + 26 controls** |
| `styles.css` | 69,273 bytes | `500d04a2cec4e87374d1a7e029f8fd31bb0394a0bdb150b210539ed46c783a49` | Khớp 100% production baseline |
| `registry.json` | 48,336 bytes | `817cb9d4c66e3afaf84f1c55db97ee6e22cd72f8d82a6083b01d5c99b38f860b` | Khớp 100% 87 mục (24 civic + 63 commercial) |
| `deals_feed.json` | 37,405 bytes | `82b1e571432adf4d6cdc0c5edda41ba8213d3644ba2eb4dbd3b1034453229f03` | Khớp 100% hotfix baseline (`PRODUCTION_SERVED_VERIFIED`) |
| `candidate_manifest.json` | 3557 bytes | `7d074d0e8bdf0ac7e9854d905fe109bf1ec0ccef3844c69ead1dfefffac9b4dd` | Niêm phong đầy đủ metadata |

---

## 3. Mục Tiêu Triển Khai Vercel & Tài Khoản Ủy Quyền

- **Tài khoản chủ dự án (Authorized Owner Session):** `kuntran777-6857` (Session đang active tại Antigravity).
- **Vercel Project ID:** `prj_YzcODtsWLzPWaIVItzd4K6QEWERm` (Dự án: `jayt-storefront`).
- **Production Alias đích:** `https://jayt-production-v3420.vercel.app`.
- **Deployment hiện thời:** `dpl_3H3kpJdSN8FiYGDKVqSks2YHDhkJ` (v3.429.0 hotfix nhãn môi trường).

---

## 4. Kế Hoạch Rollback Dự Phòng Đã Được Đo Lường

- **Standby cấp 1 (Tức thời):** Deployment `dpl_3H3kpJdSN8FiYGDKVqSks2YHDhkJ` (Hotfix v3.429.0 hiện tại). RTO khôi phục đo lường thực tế: **8,040 ms (8.04 giây)**.
- **Standby cấp 2 (Dài hạn):** Deployment `dpl_5PUrAGqBthMJjrcHZSc3nCoUf1YL` (v3.428.0). RTO rollback đo lường thực tế: **11,284 ms (11.28 giây)**.
- **Biên nhận diễn tập thực nghiệm:** `07_QUALITY_ASSURANCE/runtime_evidence/JAYT_360_HOTFIX_AND_ROLLBACK_DRILL_RECEIPT.json` (SHA-256: `1aaab9edf4ca1aee9d684467fec386b5d1473d4a71b8d079b19481cc8f55a388`).
- **Lệnh rollback khẩn cấp (nếu phát sinh sự cố sau promote):**
  ```bash
  npx vercel alias set dpl_3H3kpJdSN8FiYGDKVqSks2YHDhkJ jayt-production-v3420.vercel.app
  ```

---

## 5. Cam Kết Ranh Giới Bất Biến

- **Không tự ý deploy:** Antigravity chờ chỉ thị cấp quyền triển khai chính thức từ CEO/Gatekeeper và Chủ tịch Hội đồng.
- **Khóa chặt v3.430.0:** Phiên bản v3.430.0 tuyệt đối không được phát hành.
- **Khóa chặt Batch 19:** Tiếp tục duy trì chính sách trung thực thiếu hụt (0 VERIFIED / 10 HELD); không hydrat hóa dữ liệu vào staging feed.
- **Tái kiểm toán độc lập sau deploy:** Ngay khi được cấp quyền deploy và hoàn tất thăng hạng alias, bộ kiểm toán `audit_jayt_360_live.cjs` sẽ được chạy trực tiếp trên production để xác thực live runtime đạt 100% PASS.
