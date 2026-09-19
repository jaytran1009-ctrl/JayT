# CÔNG BỐ KIỂM TOÁN VÀ CÔ LẬP DỮ LIỆU ĐỊA ĐIỂM (DISCLOSURE BATCH 111A)
**Mã Công Bố**: `JAYT-DISCLOSURE-111A-CONTAINMENT`  
**Chỉ thị điều phối**: `JAYT-111A-EXPANSION-CONTAINMENT-AND-REAL-LOCALITY-CAPTURE`  
**Thời điểm công bố**: `2026-08-25T20:15:00+07:00`  
**Trạng thái**: `AUDIT_FAIL_CLOSED_AND_CONTAINED`  

---

## 1. PHÁT HIỆN KIỂM TOÁN TỪ CEO VỀ BATCH 111
Trong đợt kiểm toán độc lập của CEO đối với Batch 111, hệ thống đã ghi nhận các điểm chưa đạt chuẩn sự thật dữ liệu:
1. **Dữ liệu hard-code**: Script `generate_expanded_venues_111.js` ghi trực tiếp 82 địa điểm mở rộng vào dataset thay vì bóc tách từ raw capture nguồn thật.
2. **Evidence Hash giả định**: Trường `artifact_sha256` của 82 địa điểm mới được sinh từ chuỗi `sha256(tên quán + địa chỉ)`, không phải hash của artifact vật lý trên đĩa.
3. **Quyền hiển thị ảnh**: 6 ảnh được gắn nhãn ảnh chính thức là ảnh crop/screenshot từ Batch 107, chưa đủ điều kiện `DISPLAY_PERMISSION_CONFIRMED`.
4. **Kiểm thử lỏng lẻo**: Test suite 111 chỉ kiểm tra sự tồn tại của trường dữ liệu, không đối soát hash vật lý hay quan hệ địa chỉ trên đĩa.

---

## 2. HÀNH ĐỘNG CÔ LẬP & KHẮC PHỤC TRIỆT ĐỂ (BATCH 111A)
Thực thi nghiêm ngặt chỉ thị `JAYT-111A`, Antigravity đã triển khai các chốt chặn fail-closed:

1. **Cô lập 100% (82 địa điểm mới)**:
   - Toàn bộ 82 địa điểm chưa có raw artifact đã bị rút khỏi Source of Truth (`four_layer_dataset.json`) và chuyển vào kho cách ly: `05_DEAL_AND_AFFILIATE/quarantined_venues_111a.json`.
2. **Khôi phục Beta về 18 địa điểm Canonical chuẩn xác**:
   - Toàn bộ 18 địa điểm hiển thị trên Beta đều có physical raw capture artifact (`page.txt`) trên đĩa, có SHA-256 đối soát khớp 100% và trích đoạn địa chỉ (quote) nguyên văn.
3. **Xóa bỏ 100% ảnh crop/unapproved**:
   - Toàn bộ 18 địa điểm hiển thị trên giao diện đều sử dụng **Monogram chuẩn thương hiệu** và nút dẫn về nguồn chính thức, tuân thủ tuyệt đối chính sách ảnh Batch 107.
4. **Xây dựng Real Locality Capture Engine**:
   - Khởi tạo `05_DEAL_AND_AFFILIATE/real_locality_capture_engine_111a.js` với 25 mục tiêu store locator chính hãng tại Đà Nẵng, phục vụ thu thập thực tế theo batch lớn (>= 25 điểm/batch).
5. **Thiết lập QA Guardrail Chống Hash Giả Định**:
   - Bộ test `test_expansion_containment_and_real_locality_111a.js` kiểm tra cưỡng chế: CẤM toàn bộ synthetic hash `sha256(name+addr)`; bắt buộc mọi `artifact_sha256` phải khớp byte-for-byte với file vật lý trên đĩa.

---

## 3. CHỈ SỐ MINH BẠCH SAU CÔ LẬP
- **Tổng số địa điểm Cobalt hiển thị trên Beta**: **18 địa điểm** (100% có raw artifact vật lý on-disk).
- **Tổng số địa điểm trong kho cách ly (Quarantine)**: **82 địa điểm**.
- **Số ảnh hiển thị**: **0 ảnh** (100% Monogram thương hiệu).
- **Khóa Thương Mại Production**: `deals_feed.json: []`, `is_approved: false`, 0 affiliate links.
