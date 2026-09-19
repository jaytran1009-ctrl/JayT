# Raw Portal Exports Vault (First-Party Evidence Preservation)

Thư mục này dùng để lưu trữ nguyên trạng các tệp xuất dữ liệu gốc (First-Party Export) từ Cổng Tiếp thị Shopee (`affiliate.shopee.vn` hoặc `affiliate.shopee.sg`), bao gồm:
- **Product Offer Feed (CSV / JSON)**
- **Custom Link Batch Export (CSV / Excel / JSON)**
- **Conversion / Validated Order Report (CSV)**

---

## NGUYÊN TẮC BẢO QUẢN BẤT BIẾN (IMMUTABLE PRESERVATION)

1. **Không sửa đổi bit (Bit-for-Bit Preservation)**:
   - Giữ nguyên vẹn định dạng, encoding UTF-8, dấu phân cách, và dữ liệu gốc do sàn xuất ra.
   - Tuyệt đối không chỉnh sửa thủ công, không định dạng lại ngày tháng, không bù cột bị thiếu.
2. **Mã băm toàn vẹn (SHA-256 Companion)**:
   - Mỗi tệp xuất gốc `<filename>.csv` bắt buộc phải có tệp `<filename>.csv.sha256` đi kèm được tạo ngay khi tiếp nhận.
3. **Sổ cái xuất xứ (Provenance Ledger)**:
   - Lưu trữ metadata trong sổ cái:
     * `original_filename`: Tên tệp do sàn xuất hoặc người vận hành lưu.
     * `exporter_account`: `tritran1009` (Partner ID: `17372870594`).
     * `export_timestamp_utc`: Thời điểm xuất dữ liệu ghi nhận từ sàn.
     * `portal_endpoint`: Đường dẫn chức năng trên cổng (ví dụ: `/offer/product-offer` hoặc `/offer/custom-link`).
     * `file_sha256`: Mã băm đĩa vật lý của tệp gốc.
4. **Không suy diễn dữ liệu (Zero Synthetic Imputation)**:
   - Parser chỉ nhận các cột thực sự hiện diện trong tệp.
   - Nếu tệp thiếu giá hoặc voucher, giá trị tương ứng là `null` với cờ `imputed: false`.
