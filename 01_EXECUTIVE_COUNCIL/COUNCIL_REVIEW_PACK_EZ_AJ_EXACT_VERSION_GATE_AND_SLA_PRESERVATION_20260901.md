# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EZ-AJ
## KHÔI PHỤC EXACT-VERSION GATE, NEGATIVE FIXTURE VÀ BẢO LƯU SLA FAST LANE

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_EZ_AJ_EXACT_VERSION_GATE_AND_SLA_PRESERVATION_20260901`
**Phiên bản Staging Authoritative:** `v3.482.0-staging.ez`
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ-AJ (Dòng 4925–4959)
**Thời gian lập hồ sơ:** 2026-09-01T05:48:51.933Z

---

### I. TIẾP NHẬN PHÁN QUYẾT CEO TRỰC TIẾP (MANDATE EZ-AJ.1)

CEO đã trực tiếp mở `http://127.0.0.1:4173/` và xác nhận trong browser:
1. **Title, header, footer** cùng hiển thị `v3.482.0-staging.ez`. Health, SOT và served payload đều khớp đúng cùng version này.
2. **Savings Lab v2** hiển thị đủ controls, công thức và disclaimer Local-First.
3. Phép thử CEO nhập: `100.000 + 20.000 − 10% (10.000) − 5.000 = 105.000 VNĐ` (chia hai = `52.500 VNĐ`) cho kết quả đúng chính xác.
4. **Phán quyết:** `STAGING_ACCEPTED_VERSION_IDENTITY_AND_SAVINGS_LAB_V2_BEHAVIOR`.
   - Chấp nhận này chỉ cho identity và hành vi đã kiểm trên staging.
   - Không là Go-Live, không mở content thương mại hay production.

---

### II. BÁC BỎ GÓI "274/274 PASS" VÀ KHÔI PHỤC EXACT-VERSION GATE (MANDATE EZ-AJ.2)

Hội đồng liên bộ nghiêm túc tiếp thu phê bình của CEO về việc nới assertion version thành `startsWith('v3.48')` trong các suite EZ-AE và EZ-AG:
- Đã ghi nhận vi phạm: `QA_VERSION_GATE_INVALIDATED_BY_PREFIX_ASSERTION`.
- Đã thu hồi toàn bộ kết luận dựa trên prefix assertion cũ.

#### Khôi phục 4 nguyên tắc kỷ luật kỹ thuật:
1. **Build Manifest Duy Nhất:** Đã ban hành [`00_PROGRAM_BASELINE/JAYT_BUILD_MANIFEST.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/00_PROGRAM_BASELINE/JAYT_BUILD_MANIFEST.json) làm **single source of truth** cho `expectedVersion = "v3.482.0-staging.ez"`.
2. **Đối Chiếu Bằng Tuyệt Đối (Exact Equality):**
   - `health.version === manifest.expectedVersion` (loại bỏ hoàn toàn `startsWith`).
   - SOT JS comment, `ledger_version`, runtime `version` === `manifest.expectedVersion`.
   - Served JS comment, `ledger_version`, runtime `version` === `manifest.expectedVersion`.
   - HTML title, `data-ledger-version`, `.brand-tagline`, `.footer-note` === `manifest.expectedVersion`.
   - Release receipt và version parity manifest === `manifest.expectedVersion`.
3. **Negative Fixtures (Kiểm Tra Bắt Lỗi Lệch 1 Ký Tự):**
   - Negative Fixture 1: Version lệch patch (`v3.482.1` vs `v3.482.0`) → Bắt buộc FAIL (`AssertionError`).
   - Negative Fixture 2: Version lệch suffix (`.ey` vs `.ez`) → Bắt buộc FAIL (`AssertionError`).
   - Negative Fixture 3: Prefix cũ (`v3.480.0` / `v3.481.0` thỏa mãn prefix `v3.48`) qua exact gate → Bắt buộc FAIL (`AssertionError`).
   - Negative Fixture 4: Health response lệch 1 ký tự → Bắt buộc FAIL (`AssertionError`).
4. **Không Đổi Logic Savings Lab:** Giữ nguyên toàn bộ logic tính toán đã được CEO nghiệm thu.

---

### III. BẢO LƯU SLA FAST LANE (MANDATE EZ-AJ.3)

| Ứng viên | Trạng thái | Mở SLA (UTC) | Đóng SLA (UTC) | Early Verdict | Thẩm định |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **JetBrains Student** | `OPEN_EVALUATING` | 2026-08-31T08:28:00Z | **2026-09-01T08:28:00Z** | `false` | Giữ nội bộ |
| **Figma Education** | `OPEN_EVALUATING` | 2026-08-31T08:28:00Z | **2026-09-01T08:28:00Z** | `false` | Giữ nội bộ |

- **Kỷ luật tuyệt đối:** Cả hai candidate được giữ `OPEN_EVALUATING` cho đến đúng thời điểm `sla_close_utc` (`2026-09-01T08:28:00Z`).
- **Nghiêm cấm:** Không verdict sớm, không public card, không voucher, không giá, không affiliate, không capture mới trước mốc này.
- Hai record verdict sớm cũ tiếp tục bị cách ly tại:
  - `06_TRUST_AND_EVIDENCE/SLA_VERDICT_JETBRAINS_EZ_AH.json.quarantined_ez_ai`
  - `06_TRUST_AND_EVIDENCE/SLA_VERDICT_FIGMA_EZ_AH.json.quarantined_ez_ai`

---

### IV. STAGING & CONTAINMENT INVARIANTS

| Tiêu chí | Trạng thái | Xác nhận |
| :--- | :---: | :--- |
| Single Build Manifest | ✅ | `00_PROGRAM_BASELINE/JAYT_BUILD_MANIFEST.json` (`v3.482.0-staging.ez`) |
| Staging Health Endpoint | ✅ | `http://127.0.0.1:4173/health` -> `v3.482.0-staging.ez` |
| SOT vs Served JS SHA-256 | ✅ | `2de8b41242f0d7182f7596e06816d85722f4a71a96673c400178e61af55039fc` (`PERFECT_MATCH_ZERO_DRIFT`) |
| SOT vs Served HTML SHA-256 | ✅ | `0da2091311849797cb0e2c0cc7f60f0674d4d859d936d14cc0bba74af14b1310` (`PERFECT_MATCH_ZERO_DRIFT`) |
| Browser Visible Version | ✅ | Title, header, footer, `data-ledger-version` đồng nhất `v3.482.0-staging.ez` |
| Production Release | 🔒 | **HOLD `v3.419.0` (`P0_EQ = OPEN`)** |
| T1 Verified Vouchers | 🔒 | **0** |
| Public T2 Cards | 🔒 | **1** (GitHub Education Pilot approved EZ-H) |
| External Public Links | 🔒 | **1** (`https://docs.github.com/...`) |
| Affiliate Activation | 🔒 | **false** (Authority Gate LOCKED) |

---

### V. LỆNH TÁI LẬP KIỂM ĐỊNH CHO CEO

```powershell
# 1. Kiểm tra build manifest
Get-Content "00_PROGRAM_BASELINE/JAYT_BUILD_MANIFEST.json"

# 2. Kiểm tra health endpoint staging
Invoke-RestMethod -Uri http://127.0.0.1:4173/health

# 3. Chạy suite kiểm tra Exact Version Gate & Negative Fixtures
node "07_QUALITY_ASSURANCE/test_ez_aj_exact_version_gate_qa.js"

# 4. Kiểm tra trạng thái Fast Lane Ledger
Get-Content "06_TRUST_AND_EVIDENCE/FAST_LANE_BATCH_PILOT_2_CANDIDATES_SLA_LEDGER_EZ_AE.json"
```
