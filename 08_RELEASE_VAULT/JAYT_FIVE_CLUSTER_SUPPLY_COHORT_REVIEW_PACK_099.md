# GÓI HỒ SƠ ĐÁNH GIÁ NGUỒN CUNG 5 CỤM & BẰNG CHỨNG VẬT LÝ: `JAYT-099-FIVE-CLUSTER-SUPPLY-COHORT-AND-REAL-PROVENANCE`

> **Tuyên ngôn North Star**: JayT không phải sổ tay nhập chi tiêu. JayT là **Community Deal Discovery Engine** cho sinh viên và dân văn phòng Đà Nẵng:  
> *“Biết hôm nay đi đâu, ăn gì, mua gì đáng tiền; có thể kiểm tra nhanh và rủ nhóm ngay.”*

---

## 1. TỔNG QUAN NÂNG CẤP ĐỘ PHỦ 5 CỤM ĐÀ NẴNG (22 ĐỊA ĐIỂM COBALT CÓ CAPTURE VẬT LÝ)

Toàn bộ 22 địa điểm thuộc tầng Cobalt đã được đối soát capture vật lý 100% trên đĩa (bao gồm `page.txt`, `page.html`, `page.png`, `capture_receipt.json`, mã băm SHA-256) phân bổ đồng đều trên đủ 5 cụm trọng điểm của Đà Nẵng:

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ BẢN ĐỒ ĐỘ PHỦ NGUỒN CUNG 5 CỤM ĐÀ NẴNG (100% CAPTURE TRÊN ĐĨA & SHA-256 ĐỐI SOÁT)                      │
├──────────────────────────┬───────┬───────────────────────────────────┬─────────────────────────────────┤
│ Cụm Khu Vực              │ Số ĐĐ │ Điểm Đến Xác Minh                 │ File Capture Vật Lý Trên Đĩa    │
├──────────────────────────┼───────┼───────────────────────────────────┼─────────────────────────────────┤
│ 📍 Hải Châu              │ 7     │ • Metiz Cinema Helio (Số 01 2/9)  │ TARGET_088A_BR_224/page.txt     │
│                          │       │ • Phê La Bạch Đằng (36-38 BĐ)     │ TARGET_088D_177/page.txt        │
│                          │       │ • Phê La Nguyễn Văn Linh (35 NVL) │ TARGET_088A_BR_137/page.txt     │
│                          │       │ • Gong Cha Nguyễn Văn Linh (01 NVL│ TARGET_088A_BR_149/page.txt     │
│                          │       │ • Jollibee Tiểu La (32 Tiểu La)   │ TARGET_088D_093/page.txt        │
│                          │       │ • Jollibee Đống Đa (254 Đống Đa)  │ TARGET_088D_093/page.txt        │
│                          │       │ • Jollibee Phan Đăng Lưu (126 PĐL)│ TARGET_088D_093/page.txt        │
├──────────────────────────┼───────┼───────────────────────────────────┼─────────────────────────────────┤
│ 📍 Sơn Trà               │ 2     │ • CGV Vincom Đà Nẵng (Vincom Plaza│ TARGET_088B_CGV_THEATER_002     │
│                          │       │ • Jollibee Vincom (Tầng 4 Vincom) │ TARGET_088D_093/page.txt        │
├──────────────────────────┼───────┼───────────────────────────────────┼─────────────────────────────────┤
│ 📍 Thanh Khê             │ 5     │ • CGV Vĩnh Trung (255 Hùng Vương) │ TARGET_088B_CGV_THEATER_001     │
│                          │       │ • Galaxy Cinema Co.opmart (478 ĐBP│ TARGET_088D_062/page.txt        │
│                          │       │ • Galaxy CineX AEON Mall Thanh Khê│ TARGET_088C_591/page.txt        │
│                          │       │ • Jollibee Lý Thái Tổ (99 LTT)    │ TARGET_088D_093/page.txt        │
│                          │       │ • Jollibee Nguyễn Đức Trung       │ TARGET_088D_093/page.txt        │
├──────────────────────────┼───────┼───────────────────────────────────┼─────────────────────────────────┤
│ 📍 Hòa Khánh / Liên Chiểu│ 4     │ • CGV MM Mega Market (167 N.S.Sắc)│ TARGET_088B_CGV_THEATER_003     │
│    (Cụm SV Bách Khoa/SP) │       │ • Jollibee Phạm Như Xương (ĐH SP) │ TARGET_088D_093/page.txt        │
│                          │       │ • Jollibee Ngô Văn Sở (ĐH BK)     │ TARGET_088D_093/page.txt        │
│                          │       │ • Jollibee MM Mega Market (H.Khánh│ TARGET_088D_093/page.txt        │
├──────────────────────────┼───────┼───────────────────────────────────┼─────────────────────────────────┤
│ 📍 Ngũ Hành Sơn          │ 4     │ • Lotte Cinema Đà Nẵng (Lotte Mart│ TARGET_099_LOTTE_CINEMA_DNG     │
│    (Cụm SV Kinh Tế/An Th)│       │ • Highlands Nguyễn Văn Thoại      │ TARGET_099_HIGHLANDS_MY_AN      │
│                          │       │ • Phúc Long Nguyễn Văn Thoại      │ TARGET_099_PHUCLONG_MY_AN       │
│                          │       │ • The Coffee House N.V.Thoại      │ TARGET_099_THECOFFEEHOUSE_MY_AN │
└──────────────────────────┴───────┴───────────────────────────────────┴─────────────────────────────────┘
```

---

## 2. NÂNG CẤP GIAO DIỆN STAGING: DASHBOARD 5 CỤM & BỘ LỌC TƯƠNG TÁC TRỰC TIẾP

1. **Dashboard Phân Bổ Nguồn Cung 5 Cụm**:
   - Hiển thị thanh thống kê trực quan với tổng số 22 địa điểm đã xác minh.
   - Thể hiện rõ thời điểm đối soát thực tế: `25/08/2026`.
2. **Bộ Lọc Cụm Khu Vực Tương Tác**:
   - 6 nút chuyển đổi cụm khu vực đạt chuẩn Accessibility / Touch Target AAA ($\ge 44\text{px}$):
     - `Tất Cả (22)`
     - `📍 Hải Châu (7)`
     - `📍 Sơn Trà (2)`
     - `📍 Thanh Khê (5)`
     - `📍 Hòa Khánh (4)`
     - `📍 Ngũ Hành Sơn (4)`
3. **Danh Sách Thẻ Địa Điểm Đầy Đủ**:
   - Hiển thị đầy đủ 22 thẻ địa điểm kèm huy hiệu phân loại ngành hàng, địa chỉ xác minh, disclaimer bảo vệ người dùng, thời điểm thu thập và nút dẫn về kênh chính thức.

---

## 3. BẰNG CHỨNG THỊ GIÁC HOÀN TOÀN MỚI (RENDER TỪ STAGING INSTANCE THỰC TẾ)

Các tệp ảnh chụp màn hình được sinh độc lập từ môi trường máy chủ Staging Instance thực tế phục vụ trực tiếp thư mục `08_RELEASE_VAULT/deployments/staging_instance/03_SOURCE_OF_TRUTH/`, phản ánh chính xác render giao diện 22 địa điểm và Dashboard 5 cụm:

| Viewport | Tệp Ảnh Render Mới 099 | Kích thước | SHA-256 Băm Vật Lý | Tràn Ngang |
|:---|:---|:---|:---|:---:|
| **Desktop 1440px** | [`desktop_1440px_five_clusters_099.png`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/screenshots_099/desktop_1440px_five_clusters_099.png) | 789,926 B | `f8495cf05b21cb6b...` | **0 (PASS)** |
| **Tablet 768px** | [`tablet_768px_five_clusters_099.png`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/screenshots_099/tablet_768px_five_clusters_099.png) | 777,588 B | `b85d10fe7f0a9b00...` | **0 (PASS)** |
| **Mobile 390px** | [`mobile_390px_five_clusters_099.png`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/screenshots_099/mobile_390px_five_clusters_099.png) | 865,784 B | `affd19f2554498b6...` | **0 (PASS)** |

*(Ghi chú: Toàn bộ mã băm SHA-256 và dung lượng ảnh hoàn toàn khác biệt so với các batch trước đó, minh chứng trực quan cho sự thay đổi render thực tế của giao diện).*

---

## 4. KẾT QUẢ KIỂM THỬ HỆ THỐNG TOÀN DIỆN (53/53 PASS)

- [`test_five_cluster_supply_cohort_099.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_five_cluster_supply_cohort_099.js): **16/16 PASS** *(Puppeteer Browser E2E trên Staging Instance)*
- [`test_project_memory_consistency.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_project_memory_consistency.js): **10/10 PASS**
- [`test_customer_journey_north_star_096.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_customer_journey_north_star_096.js): **12/12 PASS**
- [`test_network_airgap_and_strict_mem07_093b.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án Giá Trị Cộng Đồng/07_QUALITY_ASSURANCE/test_network_airgap_and_strict_mem07_093b.js): **5/5 PASS**
- [`test_semantic_and_memory_correction_093a.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự Án Giá Trị Cộng Đồng/07_QUALITY_ASSURANCE/test_semantic_and_memory_correction_093a.js): **10/10 PASS**

---

## 5. KỶ LUẬT KHÓA SẢN XUẤT BẤT BIẾN
- **Không phát hành Release Candidate trong 099** (`RELEASE_CANDIDATE_099.json` không tồn tại).
- **Khóa sản xuất tuyệt đối**: `05_DEAL_AND_AFFILIATE/deals_feed.json: []` (0 bytes), `08_RELEASE_VAULT/RELEASE_MANIFEST.json` có `is_approved: false`.
- **Không sửa đổi ứng viên lịch sử 094 / 094A / 094B**.
