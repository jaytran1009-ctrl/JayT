# 🛡️ BẢN CÔNG BỐ CÔ LẬP VÀ XỬ LÝ SAI PHẠM ĐỢT 156 (CONTAINMENT DISCLOSURE)

**Kính gửi:** **Tổng Giám Đốc (CEO) & Ban Kiểm Toán Độc Lập JayT Đà Nẵng**  
**Chỉ thị tham chiếu:** `CHỈ THỊ CEO — JAYT-157: XÓA SUY DIỄN LOCALITY, TÁCH CHUỖI BẰNG CHỨNG VÀ TÌM DEAL DÙNG ĐƯỢC`  
**Trạng thái quản trị:** 🛑 **`CONTAINMENT_SEALED — UNTRUSTED_DERIVED_ARTIFACT_ISOLATED`**  
**Thời gian lập:** 27/08/2026 — 12:47 (Giờ Đà Nẵng)

---

## I. NGUYÊN NHÂN VÀ PHẠM VI CÔ LẬP ĐỢT 156

1. **Lỗi gán locality suy diễn (Synthetic Locality Basis):**
   - Đợt 156 đã sử dụng mã lệnh tự gán cứng chuỗi địa chỉ/cơ sở (static brand mapping) cho Galaxy Cinema, Highlands Coffee, Domino's Pizza, Spotify, Canva thay vì trích xuất từ dữ liệu vật lý của trang capture.
   - Việc kiểm thử lại chính chuỗi tự sinh này là lỗi kiểm toán vòng tròn (circular verification).
2. **Tuyên bố sai lệch về chất lượng nguồn cung (False Zero-Noise Claim):**
   - 19/23 liên kết re-capture trong đợt 156 vẫn là `NON_OFFER_PAGE_OR_SHELL` hoặc các CTA điều hướng như "Combo Bán Chạy", "Mã E-voucher", "Get template", "Discover more".
   - Việc gọi danh sách này là "100% không có noise" là không đúng sự thật dữ liệu.
3. **Nhầm lẫn địa giới hành chính:**
   - VinWonders Nam Hội An thuộc tỉnh Quảng Nam (khu vực lân cận) bị gán nhãn là ưu đãi Đà Nẵng.

---

## II. DANH MỤC HIỆN VẬT BỊ CÔ LẬP VÀ MÃ BĂM ĐĨA THỰC TẾ

| Đường Dẫn Tệp Artifact | Phân Loại Độ Tin Cậy | Lý Do Không Đạt Chuẩn SSOT |
|---|:---:|---|
| `05_DEAL_AND_AFFILIATE/runs/RUN_20260827_123712_44ed2d/RUN_MANIFEST.json` | 🔴 **`UNTRUSTED_DERIVED_ARTIFACT`** | Chứa `locality_basis` tự gán và các liên kết shell/template được gọi là high-signal. |
| `05_DEAL_AND_AFFILIATE/discovery_lineage_ledger_156.json` | 🔴 **`UNTRUSTED_DERIVED_ARTIFACT`** | Sổ ledger chứa các bản ghi suy diễn locality và các CTA điều hướng không phải deal thật. |
| **66 Thư Mục Raw Capture trong `RUN_20260827_123712_44ed2d/`** | 🟢 **`TRUSTED_PHYSICAL_CAPTURES_PRESERVED`** | Toàn bộ 43 `ROOT_` và 23 `LEAF_` (`page.html`, `page.png`, `page.txt`, `receipt.json`) được bảo tồn nguyên vẹn trên đĩa. |

---

## III. KỶ LUẬT CHUYỂN TIẾP CHO JAYT-157

1. Cấm tuyệt đối việc sử dụng bất kỳ ledger, manifest, điểm số hay locality basis nào từ 154, 155, 156 để làm căn cứ staging/production.
2. Thiết lập mô hình 3-Artifact Relational Evidence Chain:
   - `offer_artifact` (Giá/giảm + điều kiện + thời hạn)
   - `scope_artifact` (Điều khoản phạm vi áp dụng trích từ nguồn)
   - `branch_artifact` (Bằng chứng chi nhánh/cơ sở Đà Nẵng đang hoạt động)
3. Chỉ gắn nhãn `APPLICABILITY_TO_DANANG_PROVEN` khi cả 3 artifact trên có hash và URL vật lý chứng minh được liên kết.
