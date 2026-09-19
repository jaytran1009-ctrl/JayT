# JAYT W4 R4 — Báo Cáo Nghiệm Thu Thực Thi Ba Mũi Tác Chiến Wave 4

**Quyết định phê duyệt:** `W4_TWO_CINEMA_INGRESS_PACKETS_ACCEPTED__ROUND1_FIELD_TEST_PASS__TRACK1_SCHEMA_PASS__COMMERCIAL_HOLD`  
**Căn cứ chấp hành:** Mệnh lệnh tối cao `CHAIRMAN-ACTION-MANDATE-2026-0912-W4-EXECUTION-ORDER`  
**Thời điểm đối soát (UTC):** 2026-09-11T16:17:02.953Z  

---

## 1. Mũi 1 — Bằng Chứng First-Party Rạp Chiếu Phim Đà Nẵng (PASS)

Đã hoàn tất thu thập qua browser công khai (public, logged-out), nạp vào pipeline qua công cụ `ingest_w4_assisted_raw_capture.cjs` và đối soát mã băm vật lý trên đĩa cứng:

### Gói 1: W4_SRC_01_METIZ (Metiz Cinema Helio Đà Nẵng)
- **Vị trí lưu trữ:** `04_DATA_PIPELINE/raw_evidence/W4_SRC_01_METIZ/assisted/2026-09-11T16-14-28-648Z/`
- **Biên nhận:** `receipt.json` — Trạng thái: `INGESTED__RAW_EVIDENCE_ONLY__CEO_SEMANTIC_AUDIT_REQUIRED`
- **Artifacts:**
  - `raw.html`: 104,610 bytes · SHA-256: `c66346c5a1884e45beee109b16ff141648ca9231881937e2d43b7290e3abe1ef`
  - `screenshot.png`: 1,201,788 bytes · SHA-256: `fd2eb97e5cf01d0d860c405dac057fb2cd577ea2ef246647e6e1d6ae84fa3a14`
  - `metadata.json`: 500 bytes · SHA-256: `1bf10346bee0c80371496d15c6718c7e4621bed94738ac34d0dbcfc53c21a019`
- **Dữ liệu thực tế đối soát:**
  - Chương trình *Super Monday (Thứ Hai Siêu Hạng)*: **55.000đ/vé 2D** (áp dụng mỗi Thứ Hai hàng tuần).
  - Chương trình *Ưu đãi U22*: **55.000đ/vé 2D** (áp dụng Thứ Ba đến Thứ Năm cho thành viên dưới 22 tuổi).
  - *Ghi chú kiểm toán:* Bằng chứng gốc khẳng định mức giá thực tế hiện hành là 55.000đ, không phải mức 45.000đ lịch sử.

### Gói 2: W4_SRC_02_CGV_DN (CGV Cinemas Đà Nẵng)
- **Vị trí lưu trữ:** `04_DATA_PIPELINE/raw_evidence/W4_SRC_02_CGV_DN/assisted/2026-09-11T16-14-32-651Z/`
- **Biên nhận:** `receipt.json` — Trạng thái: `INGESTED__RAW_EVIDENCE_ONLY__CEO_SEMANTIC_AUDIT_REQUIRED`
- **Artifacts:**
  - `raw.html`: 69,185 bytes · SHA-256: `25645a36381c6dda6a998ad9fab28372327db2cbdb29d6eec1a32e57161c70b2`
  - `screenshot.png`: 415,359 bytes · SHA-256: `dc55d98b654c35f61fc05eed46a26c67b71ea79fcd30a461155c130fe1105051`
  - `metadata.json`: 464 bytes · SHA-256: `b9516684d70a9e68648c810f8f7eab7c742f76da73ef5d202ef71b339a521712`
- **Dữ liệu thực tế đối soát:**
  - Xác nhận hai cụm rạp hoạt động tại Đà Nẵng: **CGV Vĩnh Trung Plaza** và **CGV Vincom Đà Nẵng**.
  - Chương trình *CGV Culture Day*: **58.000đ/vé 2D** áp dụng tại cụm rạp **CGV Vĩnh Trung Plaza** vào **Thứ 2 cuối cùng của mỗi tháng**.
  - *Ghi chú kiểm toán:* Nguồn chính thức quy định giá 58.000đ vào Thứ 2 cuối tháng (không áp dụng mức 75.000đ Thứ Tư).

---

## 2. Mũi 2 — Kết Quả Nghiệm Thu Usability Field Test Đợt 1 (PASS)

Đã hoàn tất 06 phiên kiểm thử thực địa trực tiếp trên Production live `v3.448.0-w3`:
- **Đại diện khảo sát:**
  - 02 Sinh viên ĐH Bách Khoa Đà Nẵng (DUT): `W4-S-01`, `W4-S-02`
  - 01 Sinh viên ĐH Kinh Tế Đà Nẵng (DUE): `W4-S-03`
  - 03 Nhân viên văn phòng trục Nguyễn Văn Linh / Bạch Đằng: `W4-O-01`, `W4-O-02`, `W4-O-03`
- **Biên bản kiểm chuẩn:** `07_QUALITY_ASSURANCE/runtime_evidence/W4_FIELD_ROUND1_INGEST_VALIDATION_RECEIPT.json`
- **Kết quả đối soát:** **6/6 phiên đạt PASS** (`PASS__CONSENTED_ANONYMOUS_RESULTS_READY_FOR_RESEARCH_SYNTHESIS`).
- **Kỷ luật dữ liệu:** 100% đồng thuận tự nguyện, 0 PII, 0 số điện thoại, 0 tài khoản ngân hàng, 0 tọa độ GPS.
- **Phản hồi người dùng:** Người dùng hoàn thành đúng tác vụ bàn tính bữa trưa 3 ứng dụng, công thức xếp chồng voucher KTX (`calculateDynamicStack`), và tiếp nhận chính xác lưu ý giữ thông tin giá vé cũ DanaBus.

---

## 3. Mũi 3 — Chuẩn Hóa Schema Router & Ranh Giới Thương Mại Track 1 (PASS)

- **Biên bản kiểm chuẩn:** `05_DEAL_AND_AFFILIATE/track1_compliance/W4_TRACK1_SCHEMA_AUDIT_RECEIPT.json`
- **Trạng thái:** `PASS__NON_DISPATCHING_SCHEMA_CONTRACT__AFFILIATE_REMAINS_DISABLED`
- **Cấu trúc tham số chuẩn hóa:**
  $$\text{sub1} = \text{[campus\_code]}, \quad \text{sub2} = \text{[cluster\_group]}, \quad \text{sub3} = \text{[epoch\_seconds]}$$
  - `sub1\_allowed`: `["dut", "due", "dtu", "ued"]`
  - `sub2\_allowed`: `["hoa_khanh", "ngu_hanh_son", "hai_chau"]`
  - `sub3\_rule`: Tạo động sau click rõ ràng của người dùng, không nạp trước.
- **Ranh giới thương mại:**
  - `affiliate_enabled: false` tuyệt đối trên toàn bộ hệ thống (Production, Staging, Sandbox).
  - Không triển khai công bố cam kết "giá thấp nhất" do chưa có cơ sở pháp lý và kiểm toán độc lập đối soát toàn thị trường.
  - 0 affiliate link, 0 tracking code, 0 sub-ID inject, 0 mạng bên ngoài được kích hoạt.

---

## 4. Trạng Thái Production & Niêm Phong Kỹ Thuật (Pipeline Seal)

- **Canonical Production:** Cố định tại **`v3.448.0-w3`** (`dpl_FVrUNSADMUQore2umH5VyywADiXS`), tuyệt đối không có biến động alias hay thay đổi triển khai.
- **Pipeline Seal:** `scripts/verify_pipeline_seal.cjs` đạt **24/24 Files Sealed PASS**.
- **Tính toàn vẹn kép:** Đồng bộ toàn vẹn giữa Workspace 1 và Workspace 2.
