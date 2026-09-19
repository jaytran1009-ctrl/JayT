# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EZ-AO
## THIẾT LẬP BUILD STAGING MỚI VÀ TÁI LẬP TÍNH BẤT BIẾN CỦA BUILD MANIFEST

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_EZ_AO_BUILD_IMMUTABILITY_AND_MANIFEST_PARITY_20260901`
**Phiên bản Staging Authoritative:** `v3.483.0-staging.ao`
**Build ID:** `BUILD_JAYT_STAGING_v3.483.0-staging.ao`
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ-AO (Dòng 5018–5040)
**Thời gian phát hành:** 2026-09-01T07:22:58.365Z

---

### I. TIẾP NHẬN PHÁT HIỆN P1 CỦA CEO & NGUYÊN TẮC XỬ LÝ (MANDATE EZ-AO.1)

1. **Phát hiện của CEO:** Sau khi loại bỏ Google Fonts ở EZ-AN, mã băm HTML đổi thành `4d22c0…`, nhưng `JAYT_BUILD_MANIFEST.json` vẫn ghi mã băm cũ `0da209…` dưới cùng version `v3.482.0-staging.ez`. Mặc dù SOT và Served khớp nhau, build manifest đã không còn đại diện cho build đang phục vụ.
2. **Nguyên tắc bất biến (Immutability):** Không được rewrite đè manifest cũ để hợp thức hóa drift. Phải ban hành một build identity staging hoàn toàn mới: `v3.483.0-staging.ao`.
3. **Lưu trữ lịch sử:** `JAYT_BUILD_MANIFEST_v3.482.0-staging.ez.json` được bảo tồn nguyên vẹn làm bằng chứng audit lịch sử.

---

### II. BẢNG ĐỐI SOÁT TUYỆT ĐỐI HASH ARTIFACTS BUILD v3.483.0-staging.ao (MANDATE EZ-AO.2 & EZ-AO.3)

| Artifact | SOT SHA-256 | Served SHA-256 | Manifest SHA-256 | Health SHA-256 | Kết Luận |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **JavaScript** (`jayt_storefront_staging_ey.js`) | `4cec8c6bb30817032a197746653fe65556eac2ba7952713b097a409e062d33da` | `4cec8c6bb30817032a197746653fe65556eac2ba7952713b097a409e062d33da` | `4cec8c6bb30817032a197746653fe65556eac2ba7952713b097a409e062d33da` | `4cec8c6bb30817032a197746653fe65556eac2ba7952713b097a409e062d33da` | **KHỚP 100% TUYỆT ĐỐI** |
| **HTML** (`index.html`) | `0c763b11adeb46a274d720b3292b929689d48097841bead678c83d731b81eb71` | `0c763b11adeb46a274d720b3292b929689d48097841bead678c83d731b81eb71` | `0c763b11adeb46a274d720b3292b929689d48097841bead678c83d731b81eb71` | `0c763b11adeb46a274d720b3292b929689d48097841bead678c83d731b81eb71` | **KHỚP 100% TUYỆT ĐỐI** |

- **Exact Version Target Synchronization (100% Đồng Bộ Version):**
  - Health Endpoint: `v3.483.0-staging.ao`
  - SOT JS Comments & Constants: `v3.483.0-staging.ao`
  - Served JS Comments & Constants: `v3.483.0-staging.ao`
  - HTML Title: `JayT Platform — Tra Cứu Tiện Ích & Bảng Tính Thực Trả (v3.483.0-staging.ao)`
  - HTML Header Tagline: `Nền Tảng Tiện Ích Minh Bạch • v3.483.0-staging.ao`
  - HTML Body Attribute: `data-ledger-version="v3.483.0-staging.ao"`
  - HTML Footer: `v3.483.0-staging.ao`
  - Parity Manifest: `v3.483.0-staging.ao`
  - Release Receipt: `v3.483.0-staging.ao`

---

### III. BỘ FIXTURE KIỂM THỬ TIÊU CỰC MÃ BĂM (NEGATIVE FIXTURES - MANDATE EZ-AO.4)

1. **Negative Fixture 1 (Old Stale Hash):** Thử nghiệm so khớp với hash cũ của EZ-AJ (`0da2091311849797cb0e2c0cc7f60f0674d4d859d936d14cc0bba74af14b1310`) → **BẮT BUỘC FAIL**.
2. **Negative Fixture 2 (Off-by-one HTML Hash):** Đổi 1 ký tự cuối của hash HTML → **BẮT BUỘC FAIL**.
3. **Negative Fixture 3 (Off-by-one JS Hash):** Đổi 1 ký tự cuối của hash JS → **BẮT BUỘC FAIL**.
4. **Negative Fixture 4 (Off-by-one Version String):** Đổi 1 ký tự version (`v3.483.1-staging.ao` vs `v3.483.0-staging.ao`) → **BẮT BUỘC FAIL**.

---

### IV. BẢO TOÀN TRẠNG THÁI FAST LANE VÀ NỀN TẢNG

- **Fast Lane (JetBrains & Figma):** Tiếp tục duy trì `OPEN_EVALUATING` theo chỉ thị EZ-AL đến đúng mốc `>= 2026-09-01T08:28:00Z`.
- **Cohort 15 Nguồn Cung:** 14 candidate `OPEN_EVALUATING` (chưa tier), 1 candidate `INTAKE_FAILED_NO_RAW` (không tier), 0 deal public.
- **Production Status:** **LOCKED `v3.419.0` (`P0_EQ = OPEN`)**.
- **Staging Server:** `http://127.0.0.1:4173/` (`v3.483.0-staging.ao`).
- **T1 Verified Deals:** **0**.
- **Public Vouchers:** **0**.
- **Affiliate Links:** **0 (KHÓA)**.
