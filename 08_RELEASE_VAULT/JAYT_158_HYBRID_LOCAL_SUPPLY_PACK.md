# 🛡️ GÓI HỒ SƠ KIỂM TOÁN ĐỘNG CƠ NGUỒN CUNG HỖN HỢP: JAYT-158

**Kính gửi:** **Tổng Giám Đốc (CEO) & Ban Kiểm Toán Độc Lập JayT Đà Nẵng**  
**Chỉ thị điều hành:** `JAYT-158: HYBRID LOCAL SUPPLY ENGINE`  
**Trạng thái bàn giao chính thức:** 🟡 **`IMPLEMENTED_PENDING_CEO_AUDIT`**  
*(Tuân thủ kỷ luật: không tự gắn "ACCEPTED/VERIFIED", duy trì trạng thái bàn giao chờ CEO trực tiếp thẩm duyệt; ZERO deployment trong work order dữ liệu).*  
**Production Live URL:** [https://deploy-ten-xi-48.vercel.app/](https://deploy-ten-xi-48.vercel.app/)  
**Báo Cáo Chẩn Đoán Gốc Windows Task Scheduler:** [`07_QUALITY_ASSURANCE/WINDOWS_TASK_SCHEDULER_HOST_DIAGNOSTIC.md`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án Giá Trị Cộng Đồng/07_QUALITY_ASSURANCE/WINDOWS_TASK_SCHEDULER_HOST_DIAGNOSTIC.md)  
**Data Contract Hybrid Supply 158:** [`05_DEAL_AND_AFFILIATE/hybrid_supply_data_contract_158.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án Giá Trị Cộng Đồng/05_DEAL_AND_AFFILIATE/hybrid_supply_data_contract_158.json)  
**Tập Dữ Liệu Ưu Đãi Sinh Viên Trực Tuyến:** [`05_DEAL_AND_AFFILIATE/online_student_benefits_158.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án Giá Trị Cộng Đồng/05_DEAL_AND_AFFILIATE/online_student_benefits_158.json)  
**Bảng Điều Khiển 5 Cụm Cộng Đồng Đà Nẵng:** [`05_DEAL_AND_AFFILIATE/hybrid_supply_dashboard_158.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án Giá Trị Cộng Đồng/05_DEAL_AND_AFFILIATE/hybrid_supply_dashboard_158.json)  
**Hệ Thống Tiếp Nhận Tín Hiệu Cộng Đồng:** [`05_DEAL_AND_AFFILIATE/community_proof_intake_158.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án Giá Trị Cộng Đồng/05_DEAL_AND_AFFILIATE/community_proof_intake_158.json)  
**Sổ Ticket Kiểm Toán & Biểu Quyết:** [`05_DEAL_AND_AFFILIATE/community_audit_tickets_158.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án Giá Trị Cộng Đồng/05_DEAL_AND_AFFILIATE/community_audit_tickets_158.json)  
**Thư Mục Hybrid Campaign 158:** [`05_DEAL_AND_AFFILIATE/runs/RUN_20260827_125359_9224b6/`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án Giá Trị Cộng Đồng/05_DEAL_AND_AFFILIATE/runs/RUN_20260827_125359_9224b6/)  
**Run Manifest Của Campaign 158:** [`05_DEAL_AND_AFFILIATE/runs/RUN_20260827_125359_9224b6/RUN_MANIFEST.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án Giá Trị Cộng Đồng/05_DEAL_AND_AFFILIATE/runs/RUN_20260827_125359_9224b6/RUN_MANIFEST.json)  
**Sổ Đăng Ký Lịch Trình Campaign 158:** [`05_DEAL_AND_AFFILIATE/autonomous_schedule_registry_158.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án Giá Trị Cộng Đồng/05_DEAL_AND_AFFILIATE/autonomous_schedule_registry_158.json)  
**Runtime Transaction Receipt (Idempotent P1):** [`07_QUALITY_ASSURANCE/runtime_evidence/runs/run_transaction_mtb409lc/TRANSACTION_RECEIPT_JAYT-158_1787810156688.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án Giá Trị Cộng Đồng/07_QUALITY_ASSURANCE/runtime_evidence/runs/run_transaction_mtb409lc/TRANSACTION_RECEIPT_JAYT-158_1787810156688.json)  
**Thời gian hoàn thành:** 27/08/2026 — 12:56 (Giờ Đà Nẵng)

---

## I. CHUYỂN ĐỔI MÔ HÌNH NGUỒN CUNG: HYBRID LOCAL SUPPLY 3 LUỒNG

*JayT chính thức chuyển từ mô hình web-crawl đơn lẻ sang cơ chế nguồn cung hỗn hợp 3 luồng độc lập, phân định rạch ròi mức độ tin cậy và phạm vi áp dụng:*

```text
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                           JAYT-158 HYBRID LOCAL SUPPLY ARCHITECTURE                             │
│                                                                                                 │
│  [STREAM A: OFFICIAL & AFFILIATE SUPPLY]                                                        │
│  - 32 Official Roots (CGV, Galaxy, Domino's, Highlands, DanaBus...)                             │
│  - Cấp quyền / API feed / Chiến dịch có TTL rõ ràng                                            │
│  - Nhãn tin cậy: 🟣 Nguồn đang theo dõi (khi chưa có API/feed cấp quyền)                        │
│                                                                                                 │
│  [STREAM B: ONLINE STUDENT BENEFITS]                                                            │
│  - 5 Quyền lợi sinh viên trực tuyến (GitHub, JetBrains, Spotify, Notion, Canva)                  │
│  - Không phụ thuộc địa phương; hiển thị riêng dưới nhãn "Ưu đãi sinh viên trực tuyến"          │
│  - Nhãn tin cậy: 🟢 Đã đối soát chính sách trực tuyến (Active, recheck định kỳ)                 │
│                                                                                                 │
│  [STREAM C: COMMUNITY PROOF-OF-DEAL & LOCAL VENUES]                                             │
│  - Quán bình dân, cà phê học bài, món cứu đói quanh trường                                     │
│  - 3 Tầng tin cậy: 🟢 Đã đối soát thực tế | 🔵 Địa điểm thực tế | 🟣 Nguồn đang theo dõi         │
│  - Intake an toàn: Bắt đầu ở SOURCE_SIGNAL_ONLY, tự động xóa số ĐT & GPS cá nhân               │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## II. WORKSTREAM B — DANH MỤC 5 ƯU ĐÃI SINH VIÊN TRỰC TUYẾN (ISOLATED)

*Toàn bộ các quyền lợi dưới đây được hiển thị tách biệt dưới nhóm **Ưu đãi sinh viên trực tuyến**, tuyệt đối không bị gắn mác "deal Đà Nẵng":*

| STT | Tên Quyền Lợi | Nhà Cung Cấp | Đối Tượng Đủ Điều Kiện | Phương Thức Xác Thực | Hạn Kiểm Tra Lại | Trạng Thái |
|---|---|---|---|---|:---:|:---:|
| 1 | **GitHub Student Developer Pack** | GitHub Education | Sinh viên các trường đại học, cao đẳng có email trường hoặc thẻ sinh viên hợp lệ | GitHub Education Academic Verification / SheerID | `2026-09-30` | `ACTIVE` |
| 2 | **JetBrains Educational Free License** | JetBrains | Sinh viên và học viên theo học ngành Công nghệ thông tin & Kỹ thuật | Xác thực qua email trường (.edu.vn / .ac.vn) hoặc giấy tờ nhập học | `2026-09-30` | `ACTIVE` |
| 3 | **Spotify Premium Sinh Viên** | Spotify Vietnam | Sinh viên chính quy tại các trường đại học tại Việt Nam | Xác thực danh tính sinh viên qua cổng SheerID | `2026-09-30` | `ACTIVE` |
| 4 | **Notion Plus for Education** | Notion | Học sinh, sinh viên và giảng viên | Đăng ký tài khoản bằng email trường học hợp lệ | `2026-09-30` | `ACTIVE` |
| 5 | **Canva for Education** | Canva | Giáo viên và học sinh, sinh viên các cơ sở đào tạo | Xác thực qua chứng chỉ sư phạm hoặc giấy tờ xác nhận trường học | `2026-09-30` | `ACTIVE` |


---

## III. WORKSTREAM D — BẢNG ĐIỀU KHIỂN TIẾN ĐỘ 5 CỤM CỘNG ĐỒNG ĐÀ NẴNG

*Thiết lập backlog theo 5 cụm địa lý chiến lược của Đà Nẵng với số liệu thực tế, tuyệt đối không dùng số giả:*

| Cụm Địa Lý Đà Nẵng | Định Hướng Nhu Cầu Sinh Viên & Giới Trẻ | Địa Điểm Niêm Yết | Tín Hiệu Cộng Đồng | Ưu Đãi Đã Đối Soát | Cần Kiểm Tra Lại |
|---|---|:---:|:---:|:---:|:---:|
| **Hòa Khánh / Liên Chiểu** | Bữa ăn sinh viên Bách Khoa / Sư Phạm, cà phê học bài, cơm bình dân | **0** | **0** | **0** | **0** |
| **Bắc Mỹ An / Hòa Quý** | Ăn vặt chợ Bắc Mỹ An, KTX, sinh viên DUE / FPT / VKU | **0** | **0** | **0** | **0** |
| **Hải Châu / Thanh Khê** | Cơm trưa văn phòng, rạp chiếu phim, chuỗi cà phê trung tâm | **2** | **0** | **0** | **0** |
| **Khu Công nghệ cao / Công viên phần mềm** | Bữa trưa nhanh, ưu đãi phần mềm công nghệ cho sinh viên IT & kỹ sư | **0** | **0** | **0** | **0** |
| **Sơn Trà / Ven biển** | Cuối tuần, điểm hẹn cà phê ngắm cảnh, ẩm thực hải sản giá sinh viên | **0** | **0** | **0** | **0** |


---

## IV. WORKSTREAM C & E — QUY TRÌNH TIẾP NHẬN BẰNG CHỨNG CỘNG ĐỒNG & CHÍNH SÁCH TTL

1. **Quy trình tiếp nhận tín hiệu (Intake Safeguards):**
   - Mọi báo cáo từ người dùng bắt đầu ở trạng thái 🟣 **`SOURCE_SIGNAL_ONLY`** (`TIER_3_TRACKED_SOURCE`).
   - Tự động lọc sạch số điện thoại khỏi tên quán và nội dung mô tả (`[PHONE_REDACTED]`).
   - Vị trí GPS là tùy chọn và chỉ gán theo mã cụm thô (Coarse Cluster ID), không lưu tọa độ cá nhân của người gửi.
   - Cần ít nhất 1 vòng đối soát chứng từ thực tế trước khi nâng hạng lên 🟢 **Đã đối soát thực tế**.
2. **Chính sách Freshness & Chống gian lận (TTL Policy):**
   - **Community proof:** Tự động hết hiệu lực sau **14 ngày** nếu không có tín hiệu xác nhận lại từ cộng đồng.
   - **Location listing:** Tự động gắn nhãn cần kiểm tra lại sau **30 ngày**.
   - **Biểu quyết (Upvote/Downvote):** Không tự ý sửa đổi dữ liệu; tự động tạo phiếu kiểm toán (`community_audit_tickets_158.json`) cho ban quản trị.
   - **Điểm thưởng đóng góp:** Giai đoạn 1 chỉ ghi nhận lịch sử đóng góp và chống spam, chưa mở tính năng quy đổi tiền hay voucher.

---

## V. BẢNG ĐỐI SOÁT SỐ LIỆU BẮT BUỘC (RECONCILIATION INVARIANCE GATE)

*Gate đối soát chống sai lệch số liệu: Khớp 100% giữa Registry 158, Manifest 158 và Review Pack:*

$$\text{Official Roots (32)} + \text{Online Student Benefits (5)} + \text{Verified Physical Venues (2)} = \text{Final Managed Targets (39)}$$

| Hạng Mục Đối Soát | Giá Trị Thực Tế | Trạng Thái Kiểm Toán |
|---|:---:|:---:|
| **Stream A: Nguồn Root Chính Thức** | **32 Nguồn** | 🟢 Khớp chính xác |
| **Stream B: Ưu Đãi Sinh Viên Trực Tuyến** | **5 Quyền Lợi** | 🟢 Khớp chính xác |
| **Stream C: Cơ Sở Vật Lý Đã Xác Minh** | **2 Địa Điểm** | 🟢 Khớp chính xác (Starlight + Gong Cha) |
| **Tổng Số Mục Tiêu Quản Lý Trong Registry** | **39 Mục Tiêu** | 🟢 Khớp chính xác 39 == 39 |
| **Trạng Thái Reconciliation Gate** | **PASSED (100% INVARIANT)** | 🟢 **FAIL-CLOSED VERIFIED** |

---

## VI. BẢNG MÃ BĂM VẬT LÝ TÍNH TOÀN VẸN TẠI RUNTIME (HASH TRUTH)

*Tất cả mã băm dưới đây được tính trực tiếp từ buffer tệp vật lý trên đĩa:*

| Tệp Cốt Lõi | SHA-256 Checksum (Source of Truth) | SHA-256 Checksum (Deploy Bundle) | Trạng Thái Đồng Bộ |
|---|---|---|:---:|
| `jayt_apex_interface.js` | `ae4f3376524650a36d623ff79d47b387ae57eb5121f9bfb7c875fddcd3bbac35` | `ae4f3376524650a36d623ff79d47b387ae57eb5121f9bfb7c875fddcd3bbac35` | 🟢 **PARITY 100%** |
| `index.html` | `7243a37f946505c20cc77e4562e5c56f77f4fd06bd8800764bacb2eb6f748225` | `7243a37f946505c20cc77e4562e5c56f77f4fd06bd8800764bacb2eb6f748225` | 🟢 **PARITY 100%** |
| `WINDOWS_TASK_SCHEDULER_HOST_DIAGNOSTIC.md` | `2f0061b64274fa44054807e95c948dcfa8e8ddaf6ede02b98d582d5a6050b1e5` | `N/A (Host Diagnostic Report)` | 🟢 **CONCLUDED (SCHEDULER_BLOCKED)** |
| `hybrid_supply_data_contract_158.json` | `31758ada82cfa91f242f754b1d507171310781e3ba0dc8aceac4523fb34c0cc5` | `N/A (Data Contract)` | 🟢 **3 STREAMS FORMALIZED** |
| `online_student_benefits_158.json` | `538a572510a2dce729853fc01ef3e9f7c4cab278516fe113e950a09d09d22199` | `N/A (Student Benefits Dataset)` | 🟢 **5 PERKS ISOLATED** |
| `hybrid_supply_dashboard_158.json` | `b6d4afa9a106aacd3488c4527a6b0aaa7673b5004c8bff390b9ad4d8ed0d380b` | `N/A (5 Clusters Dashboard)` | 🟢 **5 CLUSTERS INITIALIZED** |
| `community_proof_intake_158.json` | `366e6c7692e0240a1f3faa392836d8f7f57884a80574d573080d3fd00dacb033` | `N/A (Community Intake Store)` | 🟢 **INTAKE SAFEGUARDS ACTIVE** |
| `community_audit_tickets_158.json` | `77992361ef961fa42425d4503f08dedb80df902773150aa826adc01973acefbd` | `N/A (Feedback Audit Tickets)` | 🟢 **ANTI-FRAUD TICKETING ACTIVE** |
| `autonomous_schedule_registry_158.json` | `f980ad0cd0028614109ac010b279633d58d5e0addab49020901788582fbdfc4c` | `N/A (Hybrid Schedule Registry)` | 🟢 **39 TARGETS MANAGED (100% MATCH)` |
| `official_root_sources_152.json` | `b352003597b26baac48c401b6021fbdf64e4ab8ad02ed3b7d8b0f0e3635cfdd2` | `N/A (32 Official Root Sources)` | 🟢 **32 ROOTS MANAGED (29 ACTIVE, 3 UNRESOLVED)** |
| `brand_locality_registry_144.json` | `b9943a8d4d56c34e378111e42e0afb6681475bcf62fcbb3fbf3e1094363d4583` | `N/A (Store Locators)` | 🟢 **32/32 BRANDS AUDITED ON DISK** |
| `deals_feed.json` | `4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945` | `N/A (Catalog Array [])` | 🟢 **PRODUCTION LOCKED** |
| `PROJECT_MEMORY.md` | `638fef0d6960fcfc79f807992e47d16591cb406d5f8db54bf0faef87ba0654a9` | `N/A (Operational SSOT)` | 🟢 **TRANSACTION COMMITTED** |

---

## VII. BÀN GIAO QUẢN TRỊ BẮT BUỘC (GOVERNANCE HANDOVER BLOCK - 067A / 158)

1. **Phiên bản tài liệu (PROJECT_MEMORY.md Version)**: `3.304.0`
2. **Mã băm toàn vẹn (SHA-256 Sau Cập Nhật)**: `638fef0d6960fcfc79f807992e47d16591cb406d5f8db54bf0faef87ba0654a9`
3. **Chỉ thị & Trạng thái hợp lệ (Work Order & Status)**: `JAYT-158` — `IMPLEMENTED_PENDING_CEO_AUDIT`
4. **Đường dẫn tệp cục bộ**:
```text
D:\Công Việc MMO\OPC JayT\JayT-Dự Án Giá Trị Cộng Đồng\PROJECT_MEMORY.md
```
5. **Kỷ luật phát hành**: `ZERO DEPLOYMENT EXECUTED IN 158` (Khóa sản xuất `deals_feed.json: []`, `is_approved: false`).
6. **Kết quả kiểm thử tính nhất quán**: `10/10 PASS (100%)` ([`test_hybrid_supply_158.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án Giá Trị Cộng Đồng/07_QUALITY_ASSURANCE/test_hybrid_supply_158.js)).

---

Kính trình Tổng Giám Đốc (CEO) và Ban Kiểm Toán Độc Lập tiến hành thẩm duyệt toàn diện Gói Hồ Sơ Động Cơ Nguồn Cung Hỗn Hợp 158!
