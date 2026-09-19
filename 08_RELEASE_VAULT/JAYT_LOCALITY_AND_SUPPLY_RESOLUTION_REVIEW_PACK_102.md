# GÓI HỒ SƠ TỔNG HỢP ĐỐI SOÁT ĐỊA GIỚI & NGUỒN CUNG: `JAYT-102-LOCALITY-AND-SUPPLY-RESOLUTION`

> **Tuyên ngôn North Star**: JayT không phải sổ tay nhập chi tiêu. JayT là **Community Deal Discovery Engine** cho sinh viên và dân văn phòng Đà Nẵng:  
> *“Biết hôm nay đi đâu, ăn gì, mua gì đáng tiền; có thể kiểm tra nhanh và rủ nhóm ngay.”*

---

## 1. TỔNG QUAN PHÂN GIẢI NGUỒN CUNG (BATCH 101 & 102 — 30 MỤC TIÊU)

Hệ thống đã hoàn tất phân giải dữ liệu toàn diện trên **30 mục tiêu** quét bằng bộ thu thập an toàn `safe_provenance_collector_100.js`:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ BẢNG TỔNG HỢP PHÂN TẦNG NGUỒN CUNG 102 (SUPPLY RESOLUTION)                             │
├─────────────────────────────────────────────────────────┬──────────────┬───────────────┤
│ Phân Tầng Dữ Liệu                                       │ Số Lượng     │ Tỷ Lệ         │
├─────────────────────────────────────────────────────────┼──────────────┼───────────────┤
│ Tổng mục tiêu phân tích (Total Targets Analyzed)        │ 30           │ 100%          │
│ Nguồn Authenticated (HTTP 200 + Raw DOM + PNG)          │ 21           │ 70.0%         │
│ Nguồn Thất bại (Fail-Closed: 403 / 404 / Empty DOM)     │ 9            │ 30.0%         │
├─────────────────────────────────────────────────────────┼──────────────┼───────────────┤
│ 💎 Ứng viên Cobalt đủ điều kiện (VERIFIED_LOCATION)     │ 7 mục tiêu   │ Địa chỉ thật  │
│ 🔶 Nguồn chính thức chưa có Locality chi tiết           │ 14 mục tiêu  │ Amber Tier    │
│ 🏷️ Ưu đãi đủ điều kiện kiểm toán (PROVEN_PROMOTION)    │ 0 ưu đãi     │ Không tự bịa  │
│ ⚠️ Ưu đãi chưa đủ dữ kiện (PROMOTION_UNPROVEN)          │ 21 nguồn     │ Hiển thị web  │
└─────────────────────────────────────────────────────────┴──────────────┴───────────────┘
```

- **Báo cáo chi tiết JSON**: [`05_DEAL_AND_AFFILIATE/locality_and_supply_resolution_102.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/05_DEAL_AND_AFFILIATE/locality_and_supply_resolution_102.json).

---

## 2. BẢNG TRÍCH XUẤT ĐỊA GIỚI THỰC TẾ (7 ỨNG VIÊN COBALT CÓ HASH & OFFSET NGUỒN)

Toàn bộ địa chỉ được trích xuất trực tiếp từ raw DOM `page.txt` nguyên trạng, cấm suy diễn từ tên target hay dropdown:

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ DANH SÁCH 7 ỨNG VIÊN COBALT CÓ ĐỐI SOÁT ĐỊA CHỈ ĐÀ NẴNG CỤ THỂ                                                    │
├───────────────────────────────────┬───────────────┬────────────┬─────────────┬───────────────────────────────────┤
│ Mã Mục Tiêu & Thương Hiệu         │ Quận / Cụm    │ Dòng (L)   │ Offset (B)  │ Trích Đoạn Raw Text Đích Thực     │
├───────────────────────────────────┼───────────────┼────────────┼─────────────┼───────────────────────────────────┤
│ 1. TARGET_102_CGV_VINH_TRUNG      │ Thanh Khê     │ L53        │ 443 B       │ 255-257 đường Hùng Vương Quận     │
│    (CGV Vĩnh Trung Plaza)         │               │            │             │ Thanh Khê Tp. Đà Nẵng             │
├───────────────────────────────────┼───────────────┼────────────┼─────────────┼───────────────────────────────────┤
│ 2. TARGET_101_GALAXY_DANANG_OFFIC │ Thanh Khê     │ L13        │ 115 B       │ Tầng 3, TTTM Co.opmart Đà Nẵng -  │
│    (Galaxy Cinema Đà Nẵng)        │               │            │             │ 478 Điện Biên Phủ, Phường Thanh   │
│                                   │               │            │             │ Khê, TP. Đà Nẵng                  │
├───────────────────────────────────┼───────────────┼────────────┼─────────────┼───────────────────────────────────┤
│ 3. TARGET_102_GALAXY_DANANG       │ Thanh Khê     │ L13        │ 115 B       │ Tầng 3, TTTM Co.opmart Đà Nẵng -  │
│    (Galaxy Cinema Đà Nẵng 102)    │               │            │             │ 478 Điện Biên Phủ, Phường Thanh   │
│                                   │               │            │             │ Khê, TP. Đà Nẵng                  │
├───────────────────────────────────┼───────────────┼────────────┼─────────────┼───────────────────────────────────┤
│ 4. TARGET_101_PHELA_OFFICIAL      │ Hải Châu      │ L88        │ 2,789 B     │ Số 36 - 38 đường Bạch Đằng,       │
│    (Phê La Bạch Đằng)             │               │            │             │ Phường Hải Châu, TP Đà Nẵng       │
│    (Phê La Nguyễn Văn Linh)       │ Hải Châu      │ L92        │ 2,872 B     │ Số 35 - 41 Nguyễn Văn Linh,       │
│                                   │               │            │             │ Quận Hải Châu, Đà Nẵng            │
├───────────────────────────────────┼───────────────┼────────────┼─────────────┼───────────────────────────────────┤
│ 5. TARGET_102_PHELA_HOME          │ Hải Châu      │ L88, L92   │ 2,789 B...  │ Đồng bộ trích xuất 2 chi nhánh    │
│    (Phê La Home 102)              │               │            │             │ Bạch Đằng & Nguyễn Văn Linh       │
├───────────────────────────────────┼───────────────┼────────────┼─────────────┼───────────────────────────────────┤
│ 6. TARGET_102_GONGCHA_STORES      │ Hải Châu      │ L80        │ 1,313 B     │ 01 Nguyễn Văn Linh, Phường Bình   │
│    (Gong Cha Nguyễn Văn Linh)     │               │            │             │ Hiên, Quận Hải Châu, Đà Nẵng.     │
├───────────────────────────────────┼───────────────┼────────────┼─────────────┼───────────────────────────────────┤
│ 7. TARGET_102_JOLLIBEE_STORES     │ Sơn Trà / HC/ │ L376       │ 12,292 B    │ Tầng 4 Vincom Đà Nẵng, 910A Ngô   │
│    (Jollibee Store Locator)       │ Thanh Khê /   │ L628       │ 22,396 B    │ Quyền, P. An Hải Bắc, Q. Sơn Trà  │
│                                   │ Liên Chiểu    │ L712       │ 25,869 B    │ 32 Tiểu La, P. Hòa Cường Bắc, HC  │
│                                   │               │ L790       │ 29,067 B    │ 47 Nguyễn Đức Trung, Thanh Khê    │
│                                   │               │ L915       │ 33,420 B    │ 10 Phạm Như Xương, Liên Chiểu     │
│                                   │               │ L1438      │ 52,305 B    │ MM Mega Market, Hòa Khánh         │
└───────────────────────────────────┴───────────────┴────────────┴─────────────┴───────────────────────────────────┘
```

---

## 3. PHÂN ĐỊNH 3 TẦNG HIỂN THỊ TRÊN GIAO DIỆN STAGING
1. **Tầng Cobalt (Địa Điểm Xác Minh)**:
   - Các địa điểm có trích xuất địa chỉ thực tế từ raw DOM được gắn cờ chờ CEO phê duyệt để nâng cấp vào danh sách Cobalt chính thức.
   - 18 địa điểm lịch sử tiếp tục hiển thị với disclaimer trung thực: *“Địa điểm từng được ghi nhận từ nguồn chính thức; vui lòng kiểm tra trạng thái hiện tại tại nguồn.”*
2. **Tầng Amber (Nguồn Chính Thức Theo Dõi)**:
   - 14 nguồn thương hiệu chính thức (Metiz, Domino's, The Coffee House, Katinat, Lotteria, Co.opmart...) hiển thị với nhãn:
   > *“Địa điểm chính thức — ưu đãi online chưa đủ dữ kiện; kiểm tra trực tiếp tại quán.”*
3. **Tầng Deal Hot (Ưu Đãi Thương Mại)**:
   - **0 ưu đãi được xác nhận**. Cấm tuyệt đối việc tự bịa mã giảm, voucher, hay giá net khi trang chính thức chỉ hiển thị thông tin rạp/quán chung.

---

## 4. KẾT QUẢ KIỂM THỬ HỆ THỐNG TOÀN DIỆN (96/96 PASS)

- [`test_locality_and_supply_resolution_102.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_locality_and_supply_resolution_102.js): **19/19 PASS** *(Kiểm tra toàn bộ 30 captures, line/offset address hashes, Puppeteer browser E2E)*
- [`test_controlled_live_provenance_101.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_controlled_live_provenance_101.js): **18/18 PASS**
- [`test_fail_closed_collector_100.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_fail_closed_collector_100.js): **5/5 PASS**
- [`test_provenance_containment_099a.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_provenance_containment_099a.js): **17/17 PASS**
- [`test_project_memory_consistency.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_project_memory_consistency.js): **10/10 PASS**
- [`test_customer_journey_north_star_096.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_customer_journey_north_star_096.js): **12/12 PASS**
- [`test_network_airgap_and_strict_mem07_093b.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự Án Giá Trị Cộng Đồng/07_QUALITY_ASSURANCE/test_network_airgap_and_strict_mem07_093b.js): **5/5 PASS**
- [`test_semantic_and_memory_correction_093a.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự Án Giá Trị Cộng Đồng/07_QUALITY_ASSURANCE/test_semantic_and_memory_correction_093a.js): **10/10 PASS**

---

## 5. KỶ LUẬT KHÓA SẢN XUẤT BẤT BIẾN
- **Không phát hành Release Candidate trong 102** (`RELEASE_CANDIDATE_102.json` không tồn tại).
- **Khóa sản xuất tuyệt đối**: `05_DEAL_AND_AFFILIATE/deals_feed.json: []` (0 bytes), `08_RELEASE_VAULT/RELEASE_MANIFEST.json` có `is_approved: false`.
- **Không sửa đổi candidate lịch sử 094 / 094A / 094B**.
