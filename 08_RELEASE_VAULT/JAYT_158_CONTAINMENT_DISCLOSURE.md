# 🛡️ BẢN CÔNG BỐ CÔ LẬP VÀ XỬ LÝ SAI PHẠM ĐỢT 158 (CONTAINMENT DISCLOSURE)

**Kính gửi:** **Tổng Giám Đốc (CEO) & Ban Kiểm Toán Độc Lập JayT Đà Nẵng**  
**Chỉ thị tham chiếu:** `CHỈ THỊ CEO — JAYT-159: DỪNG CLAIM CỨNG, TÁCH TEST DATA VÀ KÍCH HOẠT HYBRID SUPPLY TRUNG THỰC`  
**Trạng thái quản trị:** 🛑 **`CONTAINMENT_SEALED — UNTRUSTED_DERIVED_ARTIFACT_ISOLATED`**  
**Thời gian lập:** 27/08/2026 — 13:11 (Giờ Đà Nẵng)

---

## I. NGUYÊN NHÂN VÀ PHẠM VI CÔ LẬP ĐỢT 158

1. **Lỗi gán nhãn `ACTIVE` khi chưa có bằng chứng snapshot/receipt vật lý:**
   - Đợt 158 đã tự gán cứng trạng thái `ACTIVE` cho 5 chương trình ưu đãi sinh viên trực tuyến (GitHub, JetBrains, Spotify, Notion, Canva) kèm mức giá và quyền lợi cụ thể mà chưa thực hiện capture vật lý độc lập từ URL chính thức.
2. **Nhiễm bẩn dữ liệu kiểm thử vào kho vận hành (Test-Data Contamination):**
   - Bộ kiểm thử `test_hybrid_supply_158.js` đã tự động ghi dữ liệu mẫu ("Quán Cơm Sinh Viên BK") trực tiếp vào kho lưu trữ vận hành (`community_proof_intake_158.json` và `community_audit_tickets_158.json`), vi phạm nguyên tắc cách ly môi trường kiểm thử.
3. **Sử dụng chuỗi fallback khi thiếu mã băm thực:**
   - Xuất hiện chuỗi `RECEIPT_SHA_VERIFIED` thay vì mã băm SHA-256 tính trực tiếp từ buffer tệp biên nhận trên đĩa.

---

## II. DANH MỤC HIỆN VẬT BỊ CÔ LẬP VÀ MÃ BĂM ĐĨA THỰC TẾ

| Đường Dẫn Tệp Artifact | Phân Loại Độ Tin Cậy | Lý Do Không Đạt Chuẩn SSOT |
|---|:---:|---|
| `05_DEAL_AND_AFFILIATE/online_student_benefits_158.json` | 🔴 **`UNTRUSTED_DERIVED_ARTIFACT`** | Khẳng định trạng thái `ACTIVE` và quyền lợi cụ thể mà không có snapshot receipt vật lý. |
| `05_DEAL_AND_AFFILIATE/autonomous_schedule_registry_158.json` | 🔴 **`UNTRUSTED_DERIVED_ARTIFACT`** | Sổ đăng ký dẫn xuất từ các claim `ACTIVE` chưa được kiểm chứng. |
| `05_DEAL_AND_AFFILIATE/hybrid_supply_dashboard_158.json` | 🔴 **`UNTRUSTED_DERIVED_ARTIFACT`** | Bảng điều khiển chứa số liệu từ dữ liệu chưa được capture độc lập. |
| `05_DEAL_AND_AFFILIATE/community_proof_intake_158.json` | 🔴 **`UNTRUSTED_DERIVED_ARTIFACT`** | Bị nhiễm bẩn dữ liệu kiểm thử giả định trong quá trình chạy test suite 158. |
| `05_DEAL_AND_AFFILIATE/community_audit_tickets_158.json` | 🔴 **`UNTRUSTED_DERIVED_ARTIFACT`** | Bị nhiễm bẩn ticket kiểm thử do test runner ghi trực tiếp. |
| `05_DEAL_AND_AFFILIATE/runs/RUN_20260827_125359_9224b6/RUN_MANIFEST.json` | 🔴 **`UNTRUSTED_DERIVED_ARTIFACT`** | Chứa manifest với các claim chưa có bằng chứng physical capture. |

---

## III. KỶ LUẬT CHUYỂN TIẾP CHO JAYT-159

1. **Cách ly tuyệt đối môi trường kiểm thử (Isolated Fixtures):**
   - Mọi kiểm thử chỉ được thực thi trên thư mục `07_QUALITY_ASSURANCE/fixtures/`, tuyệt đối không được ghi vào tệp vận hành.
   - Đối soát mã băm byte-for-byte đảm bảo kho vận hành hoàn toàn bất biến trước và sau khi test chạy.
2. **Quy trình thu thập chứng từ vật lý thực (Puppeteer Physical Capture):**
   - Tiến hành quét Puppeteer vật lý độc lập cho từng URL ưu đãi sinh viên để thu thập `page.html`, `page.png`, `page.txt`, và `receipt.json`.
   - Nếu không đủ bằng chứng: bắt buộc gắn nhãn `ONLINE_BENEFIT_SOURCE_TO_CHECK` và chỉ cung cấp nút "Mở nguồn chính thức ↗", cấm đưa ra claim về giá hay tỷ lệ giảm.
3. **Kho tiếp nhận cộng đồng rỗng sạch (Clean Operational Intake Store):**
   - Khởi tạo kho `community_proof_intake_159.json` với `total_signals: 0, signals: []`, 0 dữ liệu demo/test.
4. **Cấm tuyệt đối mọi chuỗi fallback/placeholder:**
   - 100% mã băm phải là SHA-256 64 ký tự hex tính trực tiếp từ đĩa; không dùng bất kỳ chuỗi đại diện nào.
