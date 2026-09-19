# HỒ SƠ HỘI ĐỒNG LIÊN BỘ — JAYT SECTION EZ-AI
## CEO BROWSER VERDICT — VERSION DRIFT FIX & SLA VERDICT QUARANTINE

**Mã hồ sơ:** `COUNCIL_REVIEW_PACK_EZ_AI_VERSION_FIX_AND_VERDICT_QUARANTINE_20260901`
**Phiên bản Staging SOT:** `v3.482.0-staging.ez`
**Chỉ thị chỉ đạo:** JAYT-245 Mục EZ-AI (Dòng 4889–4922)
**Thời gian lập hồ sơ:** 2026-09-01T05:22:01.040Z

---

### I. CEO BROWSER REVIEW VERDICT

CEO đã trực tiếp kiểm Savings Lab v2 và ban hành: `UX_ACCEPTED_SAVINGS_LAB_V2_BEHAVIOR_ONLY`.

Chấp nhận các hành vi sau:
- Solo/Group hoạt động; Group tự đặt 2 người
- Kết quả tính đúng (giá 100K, ship 20K, giảm 10%, voucher 5K → thực trả 105K, chia hai 52.5K)
- Reset hoạt động đúng
- Disclaimer hiển thị; console không warning/error
- Mobile 390 không tràn ngang

**KHÔNG chấp nhận:** zero network tuyệt đối, performance, toàn bộ WCAG, production readiness, version/release.

---

### II. P0 VERSION IDENTITY DRIFT — ĐÃ SỬA

| Vị trí | Trước (DRIFT) | Sau (FIXED) |
| :--- | :---: | :---: |
| Health endpoint | `v3.481.0-staging.ez` | `v3.482.0-staging.ez` |
| SOT JS comment (line 3) | `v3.480.0-staging.ez` | `v3.482.0-staging.ez` |
| SOT JS ledger_version (line 48) | `v3.480.0-staging.ez` | `v3.482.0-staging.ez` |
| SOT JS version field (line 557) | `v3.480.0-staging.ez` | `v3.482.0-staging.ez` |
| HTML title | `v3.480.0-staging.ez` | `v3.482.0-staging.ez` |
| HTML data-ledger-version | `v3.480.0-staging.ez` | `v3.482.0-staging.ez` |
| HTML header tagline | `v3.480.0-staging.ez` | `v3.482.0-staging.ez` |
| HTML footer | `v3.480.0-staging.ez` | `v3.482.0-staging.ez` |

**Cách sửa:** Tất cả 8 vị trí đã được thống nhất về `v3.482.0-staging.ez`. Không thay đổi hành vi Savings Lab.

**SOT JS SHA-256:** `2de8b41242f0d7182f7596e06816d85722f4a71a96673c400178e61af55039fc`
**SOT HTML SHA-256:** `0da2091311849797cb0e2c0cc7f60f0674d4d859d936d14cc0bba74af14b1310`
**Parity:** `PERFECT_MATCH_ZERO_DRIFT`

---

### III. SLA VERDICT SỚM — ĐÃ CÁCH LY

| Ứng viên | Verdict cũ (sai) | Lý do cách ly | Trạng thái mới |
| :--- | :--- | :--- | :--- |
| JetBrains | T4 early verdict lúc 08:54Z | Tự mâu thuẫn: ghi "CORE_FIELDS_COMPLETE" nhưng thiếu action_url → T4 | **OPEN_EVALUATING** |
| Figma | T2 early verdict lúc 08:54Z | Phần của batch chung có JetBrains thiếu fields — lỗi quy trình | **OPEN_EVALUATING** |

SLA close: `2026-09-01T08:28:00Z`. Tại/sau thời điểm đó, verdict phải dựa trên evidence đã capture: T2 chỉ nếu đủ field T2; thiếu thì T4/HELD/CLOSED. Ghi lý do theo field thiếu, không dùng nhãn "core complete".

---

### IV. STAGING & CONTAINMENT

| Chỉ số | Giá trị |
| :--- | :--- |
| Staging Version | `v3.482.0-staging.ez` |
| Parity | `PERFECT_MATCH_ZERO_DRIFT` |
| Production | **LOCKED `v3.419.0`** |
| Savings Lab v2 UX | `UX_ACCEPTED_SAVINGS_LAB_V2_BEHAVIOR_ONLY` |
| Version Identity | **PENDING CEO BROWSER RECHECK** |
| T1 Verified Vouchers | **0** |
| Public T2 Docs | **1** (GitHub Education Pilot) |
| External Links DOM | **1** |
| Affiliate Activation | **false** |

---

### V. LỆNH TÁI LẬP KIỂM ĐỊNH CHO CEO

```powershell
# 1. Kiểm tra health version (phải là v3.482.0-staging.ez)
Invoke-RestMethod -Uri http://127.0.0.1:4173/health

# 2. Kiểm tra browser version (phải khớp health)
# Mở http://127.0.0.1:4173/ → title, header, footer phải hiển thị v3.482.0-staging.ez

# 3. Chạy QA suite
node "07_QUALITY_ASSURANCE/test_ez_ai_version_fix_and_verdict_quarantine_qa.js"
```
