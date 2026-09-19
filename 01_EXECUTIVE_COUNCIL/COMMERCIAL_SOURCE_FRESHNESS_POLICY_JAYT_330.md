# CHÍNH SÁCH ĐỘ TƯƠI VÀ VÒNG ĐỜI DỮ LIỆU THƯƠNG MẠI (JAYT-330)
## COMMERCIAL SOURCE FRESHNESS & TTL POLICY — JAYT-330-R4

- **Cơ quan ban hành:** Executive Council / Ban Thẩm định Niềm tin & Dữ liệu (Data & Trust) & Ban Sản phẩm (Product)
- **Căn cứ pháp lý:** Quyết định điều hành `JAYT-330-R4: COMMERCIAL STAGING STABILIZATION WORK ORDER`
- **Ngày ban hành:** 2026-09-07T05:30:00Z
- **Phạm vi áp dụng:** Khu vực thử nghiệm thương mại Staging (`http://127.0.0.1:4176/`)
- **Hiệu lực Sản xuất (Production):** TUYỆT ĐỐI KHÔNG (Production bị phong tỏa tại `v3.422.0`)

---

### 1. NGUYÊN TẮC CỐT LÕI (CORE INVARIANTS)

1. **Hiển thị trung thực mốc thời gian (Verbatim Timestamp Contract):**
   Mọi thẻ quan sát giá và menu thương mại bắt buộc phải hiển thị rõ ràng thời điểm ghi nhận nguồn gốc thông qua nhãn nguyên văn:
   `"Thời điểm theo HTTP Date của nguồn: <captured_at>"` với định dạng chuẩn ISO 8601 có múi giờ.
2. **Không tự suy đoán hoặc che giấu độ trễ (No Invented Freshness):**
   Nghiêm cấm tự động làm mới tem thời gian hoặc gán nhãn "giá hiện hành" khi chưa có bằng chứng thu thập thực tế từ HTTP response gốc.
3. **Cảnh báo độ trễ trực quan (Stale-State Warning UX):**
   Khi khoảng cách thời gian giữa thời điểm hiện tại và thời điểm thu thập vượt ngưỡng tươi mới (`Fresh TTL`), giao diện bắt buộc phải kích hoạt nhãn cảnh báo trực quan để người dùng và kiểm thử viên nhận biết tính biến động.
4. **Cơ chế giữ/thu hồi an toàn (Fail-Closed Removal & Hold):**
   Khi dữ liệu vượt quá ngưỡng hết hạn (`Hold TTL`), hoặc khi địa chỉ nguồn trả về mã lỗi (404/410/5xx) hoặc có sai lệch cấu trúc nghiêm trọng (drift), thẻ phải được tự động cô lập (`STALE_QUARANTINED / HOLD`), không được tiếp tục hiển thị trên luồng công khai cho đến khi được kiểm chứng lại.
5. **Bất biến không tự đột biến dữ liệu (Zero Auto-Mutation Invariant):**
   Tất cả các trình kiểm tra độ tươi (freshness auditor) chỉ được chạy ở chế độ ĐỌC (read-only). Không được phép tự động ghi đè, sửa đổi giá, hoặc cập nhật thẻ vào kho dữ liệu khi chưa qua quy trình thẩm định độc lập của Hội đồng.

---

### 2. MA TRẬN PHÂN LOẠI ĐỘ BIẾN ĐỘNG & THỜI GIAN HIỆU LỰC (TTL MATRIX)

Dựa trên bản chất ngành hàng và tần suất thay đổi chính sách bán hàng của các đối tác quan sát trong Batch 14, chính sách xác lập 4 phân lớp dữ liệu:

| Phân lớp (Category) | Ngành hàng / Đối tượng | Nhãn hàng đại diện trong Batch 14 | Ngưỡng tươi mới (`FRESH_TTL`) | Ngưỡng cảnh báo (`STALE_WARNING_TTL`) | Ngưỡng cô lập / rút (`HOLD_TTL`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Class A: Thực đơn & Combo F&B** | Thức ăn nhanh, combo khuyến mãi ngắn hạn | **Jollibee** (9 sản phẩm combo/gà/mì) | **7 ngày** | **8 – 14 ngày** | **> 14 ngày** |
| **Class B: Giá vé rạp chiếu phim** | Vé xem phim, phụ thu suất chiếu, giá từ | **Galaxy Cinema, Metiz Cinema** (2 cụm rạp) | **7 ngày** | **8 – 14 ngày** | **> 14 ngày** |
| **Class C: Linh kiện & Phụ kiện Công nghệ** | USB, chuột, bàn phím, màn hình, SSD, RAM | **Phi Long Tech, Điện Máy Xanh** (10 sản phẩm) | **14 ngày** | **15 – 30 ngày** | **> 30 ngày** |
| **Class D: Chính sách Hội viên & Tích điểm** | Thể lệ tích lũy điểm, đổi quà, danh sách cửa hàng | **Phúc Long** (`LOCAL_MEMBER_BENEFIT`) | **30 ngày** | **31 – 90 ngày** | **> 90 ngày** (hoặc theo hạn thể lệ) |

---

### 3. QUY TRÌNH XỬ LÝ TRẠNG THÁI VÒNG ĐỜI (LIFECYCLE STATES)

```
[ THU THẬP NGUỒN ]
        │
        ▼
   ┌─────────┐   Tuổi <= FRESH_TTL
   │  FRESH  │ ──────────────────────► Hiển thị chuẩn, disclaimer giá quan sát
   └────┬────┘
        │ Tuổi > FRESH_TTL && <= HOLD_TTL
        ▼
┌───────────────┐
│ STALE_WARNING │ ───────────────────► Hiển thị kèm Badge cảnh báo màu cam:
└───────┬───────┘                      "⚠️ Dữ liệu cần đối soát: Đã ghi nhận > [X] ngày"
        │ Tuổi > HOLD_TTL hoặc Nguồn lỗi / Drift
        ▼
┌───────────────┐
│ EXPIRED_HOLD  │ ───────────────────► Fail-closed: Ẩn khỏi giao diện hiển thị,
└───────────────┘                      chuyển vào Quarantine Vault chờ thẩm định
```

#### Chi tiết quy chuẩn hiển thị từng trạng thái:
1. **Trạng thái `FRESH` (Đạt độ tươi):**
   - Hiển thị đầy đủ thông tin: Tên sản phẩm, Nguồn khảo sát, Giá quan sát, Thời điểm thu thập.
   - Disclaimer chuẩn: *"Giá quan sát tại thời điểm thu thập — không cam kết giá hiện hành hay còn hàng."*
2. **Trạng thái `STALE_WARNING` (Cần đối soát):**
   - Giữ nguyên thông tin đã xác thực.
   - Bổ sung huy hiệu cảnh báo độ trễ:
     - Background: `#451a03` / Viền: `#b45309` / Chữ: `#fbbf24` (Độ tương phản đạt chuẩn WCAG AA).
     - Nội dung: `"⚠️ DỮ LIỆU CẦN ĐỐI SOÁT — Bản ghi thu thập cách đây hơn [N] ngày. Giá hoặc tình trạng hàng có thể đã thay đổi tại điểm bán."`
3. **Trạng thái `EXPIRED_HOLD` (Hết hạn / Cô lập):**
   - Thẻ bị rút khỏi feed `commercial_test.html` tại Staging.
   - Trình điều phối ghi nhận vào báo cáo audit định kỳ `COMMERCIAL_FRESHNESS_AUDIT_REPORT.json` với trạng thái `HELD_FOR_REVERIFICATION`.
   - Cấm tự ý sửa giá trực tiếp vào file catalog mà phải tạo một capture batch mới (như Batch 15) tuân thủ đầy đủ quy trình xác thực chứng cứ thô.

---

### 4. QUY TRÌNH KIỂM TOÁN TỰ ĐỘNG KHÔNG ĐỘT BIẾN (READ-ONLY AUDIT RUNNER)

1. Trình kiểm toán `04_DATA_PIPELINE/audit_commercial_freshness.cjs` chạy định kỳ hoặc theo yêu cầu công việc.
2. Trình kiểm toán quét toàn bộ 22 thẻ được duyệt trong `staging_workspace_j328/approved_commercial_cards.json`.
3. Kiểm tra tính hợp lệ của trường `captured_at`, tính toán số ngày đã trôi qua so với thời gian chạy (`delta_days`).
4. Đối chiếu URL nguồn khảo sát (`source_url` / `provenance.item_url`) với các tiêu chí an toàn (không tracking, không affiliate).
5. Xuất báo cáo tổng kết tại `07_QUALITY_ASSURANCE/runtime_evidence/COMMERCIAL_FRESHNESS_AUDIT_REPORT.json`.
6. Toàn bộ quá trình chạy hoàn toàn ở quyền ĐỌC (Read-Only), không thực hiện bất kỳ thao tác ghi đè nào lên catalog hay sổ cái.

---

### 5. TRÁCH NHIỆM & PHÊ DUYỆT

- **Ban Sản phẩm (Product & UX):** Chịu trách nhiệm bảo đảm tính minh bạch của nhãn thời gian và trải nghiệm người dùng không gây hiểu nhầm.
- **Ban Thẩm định Niềm tin & Dữ liệu (Data & Trust):** Duy trì ma trận TTL, xác thực tính nguyên vẹn của gói chấp thuận `BATCH_14_CATALOG_ACCEPTANCE_PACKAGE.json` (SHA-256: `4daadbcd4115d0d878dc66410173629cee8590dd8e7069416579c6767be0b9b0`).
- **Ban Đảm bảo Chất lượng (QA):** Kiểm thử tự động và thủ công việc thực thi chính sách, không cấp chứng nhận khi còn trạng thái vi phạm.
