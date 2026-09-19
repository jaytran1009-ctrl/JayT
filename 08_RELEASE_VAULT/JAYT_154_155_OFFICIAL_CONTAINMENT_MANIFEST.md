# 🛡️ SỔ BÀN GIAO CÔ LẬP VÀ PHỤC HỒI QUẢN TRỊ CHÍNH THỨC 154–155

**Kính gửi:** **Tổng Giám Đốc (CEO) & Ban Kiểm Toán Độc Lập JayT Đà Nẵng**  
**Chỉ thị tham chiếu:** `CHỈ THỊ CEO — JAYT-156: SỬA TẬN GỐC CONTAINMENT VÀ TÁI LẬP BATCH ĐÀ NẴNG HIGH-SIGNAL`  
**Trạng thái quản trị:** 🛑 **`CONTAINMENT_SEALED — MUTATIONS_ISOLATED`**  
**Thời gian lập:** 27/08/2026 — 12:32 (Giờ Đà Nẵng)

---

## I. MỤC ĐÍCH VÀ NGUYÊN TẮC CÔ LẬP

Nhằm sửa chữa tận gốc sự cố can thiệp sau chạy (post-run mutation) tại đợt 154 và cơ chế chọn leaf chưa lọc sạch noise tại đợt 155, tài liệu này niêm phong toàn diện tình trạng của toàn bộ các artifact dẫn xuất và vật lý gốc theo nguyên tắc append-only:

1. **Tuyệt đối không xóa lịch sử:** Giữ nguyên vẹn toàn bộ 73 capture vật lý đợt 154 và 76 capture vật lý đợt 155.
2. **Cách ly dán nhãn \`UNTRUSTED_DERIVED_ARTIFACT\`:** Toàn bộ manifest và ledger dẫn xuất đã bị can thiệp hoặc chứa dữ liệu non-Da Nang bị tước bỏ tư cách Nguồn Sự Thật (SSOT).
3. **Minh bạch mã băm SHA-256:** Cung cấp mã băm đĩa thực tế để phục vụ kiểm toán độc lập.

---

## II. BẢNG DANH MỤC CÔ LẬP VÀ ĐÁNH GIÁ ĐỘ TIN CẬY (CONTAINMENT AUDIT)

| Đường Dẫn Tệp Artifact | Phân Loại Độ Tin Cậy | Lý Do & Phạm Vi Không Đạt Chuẩn SSOT |
|---|:---:|---|
| \`05_DEAL_AND_AFFILIATE/runs/RUN_20260827_120833_ff006b/RUN_MANIFEST.json\` | 🔴 **\`UNTRUSTED_DERIVED_ARTIFACT\`** | Post-run mutation: Các số liệu đối soát bị sửa đổi sau khi scan hoàn tất nhằm ép khớp công thức. |
| \`05_DEAL_AND_AFFILIATE/discovery_lineage_ledger_154.json\` | 🔴 **\`UNTRUSTED_DERIVED_ARTIFACT\`** | Post-run mutation: Ledger bị can thiệp sau chạy. |
| \`05_DEAL_AND_AFFILIATE/runs/RUN_20260827_121924_fa6e08/RUN_MANIFEST.json\` | 🔴 **\`UNTRUSTED_DERIVED_ARTIFACT\`** | Cơ chế chọn leaf non-Da Nang (Thanh Hóa, Đồng Hới, Đan Phượng) và menu/pricing bị lọt vào selected batch. |
| \`05_DEAL_AND_AFFILIATE/discovery_lineage_ledger_155.json\` | 🔴 **\`UNTRUSTED_DERIVED_ARTIFACT\`** | Ledger 155 sinh ra từ bộ lọc chưa loại trừ triệt để địa phương ngoài phạm vi phục vụ Đà Nẵng. |
| \`05_DEAL_AND_AFFILIATE/runs/RUN_20260827_120833_ff006b/RECOVERED_AUDIT_MANIFEST_154.json\` | 🟡 **\`DERIVED_RECOVERY_ARTIFACT_FROM_PHYSICAL_RECEIPTS\`** | Artifact phục hồi dẫn xuất từ 73 receipt vật lý gốc trên đĩa (không phải manifest nguyên bản ban đầu). |
| **73 Thư Mục Raw Capture trong \`RUN_20260827_120833_ff006b/\`** | 🟢 **\`TRUSTED_PHYSICAL_CAPTURES_PRESERVED\`** | 44 thư mục \`ROOT_\` + 29 thư mục \`LEAF_\` chứa đầy đủ \`page.html\`, \`page.png\`, \`page.txt\`, \`receipt.json\` nguyên vẹn. |
| **76 Thư Mục Raw Capture trong \`RUN_20260827_121924_fa6e08/\`** | 🟢 **\`TRUSTED_PHYSICAL_CAPTURES_PRESERVED\`** | 46 thư mục \`ROOT_\` + 30 thư mục \`LEAF_\` chứa đầy đủ \`page.html\`, \`page.png\`, \`page.txt\`, \`receipt.json\` nguyên vẹn. |

---

## III. KẾT LUẬN QUẢN TRỊ

Toàn bộ các chiến dịch nguồn cung tiếp theo (bắt đầu từ JAYT-156) được cấm chỉ định kế thừa bất kỳ phán quyết, điểm số relevance, hay danh sách candidate nào từ `154` và `155`. Hệ thống thực hiện quét mới hoàn toàn với bộ lọc Đà Nẵng nghiêm ngặt.
