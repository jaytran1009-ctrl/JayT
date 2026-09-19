# GÓI HỒ SƠ TỔNG HỢP CANONICALIZATION & GIAO DIỆN PREMIUM UX: `JAYT-103-COBALT-CANONICALIZATION-AND-PREMIUM-UX`

> **Tuyên ngôn North Star**: JayT không phải sổ tay nhập chi tiêu. JayT là **Community Deal Discovery Engine** cho sinh viên và dân văn phòng Đà Nẵng:  
> *“Biết hôm nay đi đâu, ăn gì, mua gì đáng tiền; có thể kiểm tra nhanh và rủ nhóm ngay.”*

---

## 1. KẾT QUẢ CANONICALIZATION NGUỒN CUNG ĐỘC NHẤT (14 CHI NHÁNH COBALT)

Hệ thống đã giải quyết triệt để 3 lỗ hổng quản trị và kiểm toán do CEO chỉ ra:
1. **Khử trùng lặp giữa Batch 101 và 102**: Gộp Galaxy Cinema và Phê La theo khóa `brand + normalized address + final URL`.
2. **Tách đa chi nhánh (Jollibee Disaggregation)**: Tách 9 chi nhánh Jollibee Đà Nẵng độc nhất, loại bỏ hoàn toàn các địa chỉ ngoài Đà Nẵng (Tam Kỳ, Hải Phòng, HCM).
3. **Đối soát Byte-for-Byte Line/Offset**: Đọc trực tiếp `page.txt` trên đĩa, cắt slice `rawText.slice(char_offset, char_offset + snippet_length)` và xác nhận khớp 100% với snippet và mã băm SHA-256.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ DANH SÁCH 14 CHI NHÁNH COBALT ĐỘC NHẤT ĐÃ ĐỐI SOÁT BYTE-FOR-BYTE OFFSET & EVIDENCE POINTER                        │
├───────────────────────────────────┬───────────────┬────────────┬─────────────┬───────────────────────────────────┤
│ Chi Nhánh & Thương Hiệu           │ Quận / Cụm    │ Dòng (L)   │ Offset (B)  │ Địa Chỉ Trích Xuất Nguyên Trạng   │
├───────────────────────────────────┼───────────────┼────────────┼─────────────┼───────────────────────────────────┤
│ 1. Galaxy Cinema — Co.opmart TK   │ Thanh Khê     │ L13        │ 115 B       │ Tầng 3, TTTM Co.opmart Đà Nẵng -  │
│                                   │               │            │             │ 478 Điện Biên Phủ, Thanh Khê      │
├───────────────────────────────────┼───────────────┼────────────┼─────────────┼───────────────────────────────────┤
│ 2. Phê La — Bạch Đằng             │ Hải Châu      │ L88        │ 2,789 B     │ Số 36 - 38 đường Bạch Đằng,       │
│                                   │               │            │             │ Phường Hải Châu, TP Đà Nẵng       │
├───────────────────────────────────┼───────────────┼────────────┼─────────────┼───────────────────────────────────┤
│ 3. Phê La — Nguyễn Văn Linh       │ Hải Châu      │ L92        │ 2,872 B     │ Số 35 - 41 Nguyễn Văn Linh,       │
│                                   │               │            │             │ Quận Hải Châu, Đà Nẵng            │
├───────────────────────────────────┼───────────────┼────────────┼─────────────┼───────────────────────────────────┤
│ 4. CGV Cinema — Vĩnh Trung Plaza  │ Thanh Khê     │ L53        │ 443 B       │ 255-257 đường Hùng Vương Quận     │
│                                   │               │            │             │ Thanh Khê Tp. Đà Nẵng             │
├───────────────────────────────────┼───────────────┼────────────┼─────────────┼───────────────────────────────────┤
│ 5. Gong Cha — Nguyễn Văn Linh     │ Hải Châu      │ L80        │ 1,313 B     │ 01 Nguyễn Văn Linh, Phường Bình   │
│                                   │               │            │             │ Hiên, Quận Hải Châu, Đà Nẵng.     │
├───────────────────────────────────┼───────────────┼────────────┼─────────────┼───────────────────────────────────┤
│ 6. Jollibee — Vincom Ngô Quyền    │ Sơn Trà       │ L375       │ 12,219 B    │ Tầng 4 Vincom Đà Nẵng, 910A Ngô   │
│                                   │               │            │             │ Quyền, P. An Hải Bắc, Q. Sơn Trà  │
├───────────────────────────────────┼───────────────┼────────────┼─────────────┼───────────────────────────────────┤
│ 7. Jollibee — Tiểu La             │ Hải Châu      │ L627       │ 22,349 B    │ 32 Tiểu La, Phường Hòa Cường      │
│                                   │               │            │             │ Bắc, Quận Hải Châu, Đà Nẵng       │
├───────────────────────────────────┼───────────────┼────────────┼─────────────┼───────────────────────────────────┤
│ 8. Jollibee — Nguyễn Đức Trung    │ Thanh Khê     │ L711       │ 25,812 B    │ 47 Nguyễn Đức Trung, Hòa Khê,     │
│                                   │               │            │             │ Thanh Khê, Đà Nẵng                │
├───────────────────────────────────┼───────────────┼────────────┼─────────────┼───────────────────────────────────┤
│ 9. Jollibee — Phan Đăng Lưu       │ Hải Châu      │ L771       │ 28,249 B    │ 126 Phan Đăng Lưu, Phường Hòa     │
│                                   │               │            │             │ Cường Bắc, Quận Hải Châu, Đà Nẵng │
├───────────────────────────────────┼───────────────┼────────────┼─────────────┼───────────────────────────────────┤
│ 10. Jollibee — Phạm Như Xương     │ Liên Chiểu    │ L789       │ 29,012 B    │ 10 Phạm Như Xương, Phường Hòa     │
│                                   │               │            │             │ Khánh Nam, Quận Liên Chiểu        │
├───────────────────────────────────┼───────────────┼────────────┼─────────────┼───────────────────────────────────┤
│ 11. Jollibee — Lý Thái Tổ         │ Thanh Khê     │ L813       │ 29,786 B    │ 99 Lý Thái Tổ, Phường Thạc Gián,  │
│                                   │               │            │             │ Quận Thanh Khê, TP Đà Nẵng        │
├───────────────────────────────────┼───────────────┼────────────┼─────────────┼───────────────────────────────────┤
│ 12. Jollibee — Đống Đa            │ Hải Châu      │ L903       │ 32,996 B    │ 254 Đống Đa, P. Thuận Phước,      │
│                                   │               │            │             │ Quận Hải Châu, Tp. Đà Nẵng        │
├───────────────────────────────────┼───────────────┼────────────┼─────────────┼───────────────────────────────────┤
│ 13. Jollibee — Ngô Văn Sở         │ Liên Chiểu    │ L914       │ 33,368 B    │ 02 Ngô Văn Sở, Phường Hòa Khánh   │
│                                   │               │            │             │ Bắc, Quận Liên Chiểu, TP Đà Nẵng  │
├───────────────────────────────────┼───────────────┼────────────┼─────────────┼───────────────────────────────────┤
│ 14. Jollibee — MM Mega Market     │ Liên Chiểu    │ L1438      │ 52,305 B    │ Lô L1-01, TTTM MM Mega Market,    │
│                                   │               │            │             │ Nguyễn Sinh Sắc, P. Hòa Khánh     │
└───────────────────────────────────┴───────────────┴────────────┴─────────────┴───────────────────────────────────┘
```

- **Manifest chi tiết**: [`05_DEAL_AND_AFFILIATE/canonical_cobalt_branches_103.json`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/05_DEAL_AND_AFFILIATE/canonical_cobalt_branches_103.json).

---

## 2. NÂNG CẤP TRẢI NGHIỆM GIAO DIỆN PREMIUM UX
1. **Category Dock Duy Nhất (Single Unified Dock)**: Loại bỏ các thanh điều hướng phân mảnh, tập trung 5 khung giờ (07:30, 11:15, 14:15, 17:30, 21:00) và bộ lọc quận thông minh.
2. **Monogram Badges Thay Ảnh Lỗi**: Sử dụng monogram thương hiệu chuẩn visual typography hiện đại (`☕ Phê La`, `🧋 Gong Cha`, `🎬 CGV`, `🎬 Galaxy`, `🍗 Jollibee`) thay thế hoàn toàn các placeholder ảnh gãy.
3. **Smart Split Bill Sheet Đơn Nhất**: Bottom sheet tính tiền nhóm mở mượt mà, tính toán chi phí trên mỗi người theo thời gian thực và đóng tức thì khi nhấn phím `Escape`.
4. **Community Signal Thân Thiện (Warm Amber Palette)**: Tông màu Amber thân thiện, tích hợp cơ chế Airgap mạng và làm sạch PII (SĐT, Email, CCCD) trước khi lưu vào localStorage.
5. **Honest Empty State Hero**: Cấm tuyệt đối việc tạo voucher/deal giả; Hero hiển thị trung thực thông điệp định hướng khám phá cộng đồng.

---

## 3. BẰNG CHỨNG THỊ GIÁC STAGING ĐÍCH THỰC (VISUAL EVIDENCE 103)

Ảnh chụp màn hình thực tế từ `staging_instance` lưu tại [`07_QUALITY_ASSURANCE/runtime_evidence/screenshots_103/`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/runtime_evidence/screenshots_103/):
- **Desktop (1440x900)**: `staging_ui_103_desktop_1440.png` (557,832 B, SHA-256: `25bf018b71352814...`)
- **Tablet (768x1024)**: `staging_ui_103_tablet_768.png` (568,896 B, SHA-256: `12ea7bd414c5d00e...`)
- **Mobile (375x812)**: `staging_ui_103_mobile_375.png` (553,698 B, SHA-256: `3e48ba71bd47dacc...`)

---

## 4. KẾT QUẢ KIỂM THỬ HỆ THỐNG TOÀN DIỆN (116/116 PASS)

- [`test_cobalt_canonicalization_and_ux_103.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_cobalt_canonicalization_and_ux_103.js): **20/20 PASS** *(Kiểm tra byte-for-byte slice offset, 14 chi nhánh độc nhất, Premium UX, Puppeteer E2E)*
- [`test_locality_and_supply_resolution_102.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_locality_and_supply_resolution_102.js): **19/19 PASS**
- [`test_controlled_live_provenance_101.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_controlled_live_provenance_101.js): **18/18 PASS**
- [`test_fail_closed_collector_100.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_fail_closed_collector_100.js): **5/5 PASS**
- [`test_provenance_containment_099a.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_provenance_containment_099a.js): **17/17 PASS**
- [`test_project_memory_consistency.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_project_memory_consistency.js): **10/10 PASS**
- [`test_customer_journey_north_star_096.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_customer_journey_north_star_096.js): **12/12 PASS**
- [`test_network_airgap_and_strict_mem07_093b.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự Án Giá Trị Cộng Đồng/07_QUALITY_ASSURANCE/test_network_airgap_and_strict_mem07_093b.js): **5/5 PASS**
- [`test_semantic_and_memory_correction_093a.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự Án Giá Trị Cộng Đồng/07_QUALITY_ASSURANCE/test_semantic_and_memory_correction_093a.js): **10/10 PASS**

---

## 5. KỶ LUẬT KHÓA SẢN XUẤT BẤT BIẾN
- **Không phát hành Release Candidate trong 103** (`RELEASE_CANDIDATE_103.json` không tồn tại).
- **Khóa sản xuất tuyệt đối**: `05_DEAL_AND_AFFILIATE/deals_feed.json: []` (0 bytes), `08_RELEASE_VAULT/RELEASE_MANIFEST.json` có `is_approved: false`.
- **Không sửa đổi candidate lịch sử 094 / 094A / 094B**.
