# GÓI HỒ SƠ CÔ LẬP NGUỒN GỐC & KIỂM TOÁN 18 ĐỊA ĐIỂM COBALT: `JAYT-099A-PROVENANCE-CONTAINMENT`

> **Tuyên ngôn North Star**: JayT không phải sổ tay nhập chi tiêu. JayT là **Community Deal Discovery Engine** cho sinh viên và dân văn phòng Đà Nẵng:  
> *“Biết hôm nay đi đâu, ăn gì, mua gì đáng tiền; có thể kiểm tra nhanh và rủ nhóm ngay.”*

---

## 1. CÔNG BỐ SỰ CỐ SYNTHETIC CAPTURE & CÁC BIỆN PHÁP CÔ LẬP TOÀN DIỆN

Theo chỉ thị của CEO, biên lai công bố append-only [`DISCLOSURE_RECEIPT_099_SYNTHETIC_CAPTURE_CONTAINMENT.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/08_RELEASE_VAULT/DISCLOSURE_RECEIPT_099_SYNTHETIC_CAPTURE_CONTAINMENT.json) đã được ban hành với các nội dung trung thực:

1. **Cô lập 100% Artifacts**: Toàn bộ thư mục `05_DEAL_AND_AFFILIATE/batch_capture_099` đã được niêm phong và chuyển vào `05_DEAL_AND_AFFILIATE/quarantine_vault_099_synthetic_capture_incident/batch_capture_099`.
2. **Hạ Cấp 4 Địa Điểm**: Lotte Cinema, Highlands Nguyễn Văn Thoại, Phúc Long Nguyễn Văn Thoại, The Coffee House Nguyễn Văn Thoại đã bị hạ từ `COBALT_VERIFIED_LOCATION` xuống `BRAND_MONITORED_ONLY` (Amber Tier) và loại hoàn toàn khỏi danh sách địa điểm xác minh.
3. **Hiệu Chỉnh Số Liệu Độ Phủ**:
   - Số địa điểm Cobalt xác minh: **18 địa điểm** (đã đối soát bằng chứng vật lý lịch sử 100% trên đĩa).
   - Ngũ Hành Sơn: **0 địa điểm Cobalt** (`WATCHLIST_ONLY_NO_COBALT_EVIDENCE`).
4. **Quy Định Collector Fail-Closed**: Mọi bộ thu thập dữ liệu trong tương lai nếu không có live HTTP response / live DOM / screenshot thực $\rightarrow$ trả về `FAILED_CAPTURE`; tuyệt đối không ghi metadata vào raw artifact và không default HTTP 200.

---

## 2. BẢN ĐỒ ĐỘ PHỦ 18 ĐỊA ĐIỂM COBALT ĐÃ KIỂM TOÁN THỰC TẾ TRÊN ĐĨA

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ BẢN ĐỒ 18 ĐỊA ĐIỂM COBALT KIỂM TOÁN THỰC TẾ (100% RAW EVIDENCE & SHA-256 HỢP LỆ TRÊN ĐĨA)              │
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
│ 📍 Ngũ Hành Sơn          │ 0     │ (Khu vực đang theo dõi — Chưa có  │ WATCHLIST_ONLY_NO_COBALT_EVIDENC│
│                          │       │ raw browser capture trên đĩa)     │                                 │
└──────────────────────────┴───────┴───────────────────────────────────┴─────────────────────────────────┘
```

---

## 3. BẰNG CHỨNG THỊ GIÁC STAGING 099A (RENDER CHÍNH XÁC 18 ĐỊA ĐIỂM)

| Viewport | Tệp Ảnh Render 099A | Kích thước | SHA-256 Băm Vật Lý | Tràn Ngang |
|:---|:---|:---|:---|:---:|
| **Desktop 1440px** | [`desktop_1440px_containment_099a.png`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/screenshots_099a/desktop_1440px_containment_099a.png) | 757,744 B | `9897ff4cc9426217...` | **0 (PASS)** |
| **Tablet 768px** | [`tablet_768px_containment_099a.png`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/screenshots_099a/tablet_768px_containment_099a.png) | 756,077 B | `bfdbda194f9fd7bf...` | **0 (PASS)** |
| **Mobile 390px** | [`mobile_390px_containment_099a.png`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/screenshots_099a/mobile_390px_containment_099a.png) | 835,386 B | `efad30c5ffe6e123...` | **0 (PASS)** |

---

## 4. KẾT QUẢ KIỂM THỬ HỆ THỐNG TOÀN DIỆN (54/54 PASS)

- [`test_provenance_containment_099a.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_provenance_containment_099a.js): **17/17 PASS** *(Bao gồm negative test collector fail-closed & quarantine validation)*
- [`test_project_memory_consistency.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_project_memory_consistency.js): **10/10 PASS**
- [`test_customer_journey_north_star_096.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_customer_journey_north_star_096.js): **12/12 PASS**
- [`test_network_airgap_and_strict_mem07_093b.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự Án Giá Trị Cộng Đồng/07_QUALITY_ASSURANCE/test_network_airgap_and_strict_mem07_093b.js): **5/5 PASS**
- [`test_semantic_and_memory_correction_093a.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự Án Giá Trị Cộng Đồng/07_QUALITY_ASSURANCE/test_semantic_and_memory_correction_093a.js): **10/10 PASS**

---

## 5. KỶ LUẬT KHÓA SẢN XUẤT BẤT BIẾN
- **Không phát hành Release Candidate trong 099A** (`RELEASE_CANDIDATE_099A.json` không tồn tại).
- **Khóa sản xuất tuyệt đối**: `05_DEAL_AND_AFFILIATE/deals_feed.json: []` (0 bytes), `08_RELEASE_VAULT/RELEASE_MANIFEST.json` có `is_approved: false`.
- **Không sửa đổi ứng viên lịch sử 094 / 094A / 094B**.
