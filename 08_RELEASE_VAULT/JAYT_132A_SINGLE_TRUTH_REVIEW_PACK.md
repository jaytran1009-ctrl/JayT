# 🎓 EXECUTIVE REVIEW PACK: JAYT-132A — SINGLE TRUTH, REAL DECISION, DAILY RETENTION

**Phiên bản hệ thống**: `v3.250.0`  
**Chỉ thị điều hành**: `JAYT-132A-SINGLE-TRUTH-REAL-DECISION`  
**Trạng thái điều hành**: `IMPLEMENTED — PENDING CEO AUDIT`  
**Production Live URL**: [https://deploy-ten-xi-48.vercel.app](https://deploy-ten-xi-48.vercel.app)  
**Ngày phát hành**: 26/08/2026

---

## 1. BẢNG ĐỐI SOÁT XUNG ĐỘT SSOT NỘI BỘ TRƯỚC VÀ SAU WAVE 132A

| Thành Phần SSOT | Hiện Trạng Xung Đột Trước 132A (Lỗi nền tảng) | Trạng Thái Hợp Nhất Sau 132A (Đã giải quyết 100%) |
|---|---|---|
| **`customer_journey_north_star.json`** | Ghi dòng mâu thuẫn: *“chưa có deal thương mại live hôm nay”* (v2.0.0) | Đã xóa 100% dòng mâu thuẫn; nâng cấp lên v3.0.0 (`JAYT_CUSTOMER_JOURNEY_NORTH_STAR_132A`); tích hợp trọn vẹn **Four Canonical Status Model** (5 `ACTIVE_VERIFIED`, 2 `POLICY_REFERENCE`, 26 `WATCHLIST_RECHECK`, 8 `MENU_REFERENCE`). |
| **`daily_supply_feed_126.json`** | Ghi 5 ưu đãi rạp còn hạn nhưng chưa đồng bộ định danh canonical status với North Star | Nâng cấp lên v132.1.0 (`JAYT-132A-SINGLE-TRUTH-REAL-DECISION`); gán trường `canonical_status` khớp 1-to-1 với North Star và Evidence Ledger. |
| **`EVIDENCE_LEDGER_BATCH_132.json`** | Lưu 15 supply records theo cấu trúc cũ | Chuyển đổi sang `LEDGER_BATCH_132A_SINGLE_TRUTH` với đầy đủ băm SHA-256, TTL, phân bổ 4 canonical statuses. |
| **Giao diện Menu F&B (`jayt_apex_interface.js`)** | Có nguy cơ bị người dùng hiểu lầm giá menu là "deal giảm giá" | Gán nhãn cứng **`📋 GIÁ THAM KHẢO (MENU NIÊM YẾT)`** cho KFC, Jollibee, GoGi, Phê La, Phúc Long, Gong Cha; xóa sạch từ ngữ "deal", "giảm". |
| **Địa điểm Watchlist chưa có deal** | Chưa có câu tuyên bố trách nhiệm rõ ràng trên từng thẻ địa điểm | Bổ sung nhãn bắt buộc: *“Địa điểm hoạt động — ưu đãi chưa được đối soát; kiểm tra tại quầy/app.”* |

---

## 2. MA TRẬN 4 HÀNH TRÌNH × DỮ LIỆU THẬT × TRẠNG THÁI CHỨNG CỨ

```text
                                MA TRẬN HỢP NHẤT BỐN HÀNH TRÌNH
┌──────────────────────────────┬────────────────────────────┬────────────────────┬────────────────────────────────┐
│ Hành Trình Khách Hàng        │ Dữ Liệu Thật Đang Có       │ Canonical Status   │ Bằng Chứng Xác Thực            │
├──────────────────────────────┼────────────────────────────┼────────────────────┼────────────────────────────────┤
│ 1. Lịch rạp 7 ngày           │ CGV Payday 30k, Metiz U22  │ ACTIVE_VERIFIED    │ capture DOM chính thức, TTL    │
│                              │ Metiz Happy Day, Starlight │ POLICY_REFERENCE   │ chính sách thành viên tại rạp  │
│                              │ Lịch rạp tháng tới         │ WATCHLIST_RECHECK  │ danh bạ cụm rạp Đà Nẵng        │
├──────────────────────────────┼────────────────────────────┼────────────────────┼────────────────────────────────┤
│ 2. So sánh giá thực trả      │ KFC Dzựt Deal 88k, JB 73k  │ MENU_REFERENCE     │ menu niêm yết chính hãng       │
│                              │ Giỏ hàng tự nhập           │ LOCAL_CALCULATOR   │ người dùng tự nhập giỏ hàng    │
│                              │ So sánh đa app             │ INSUFFICIENT_DATA  │ 0 claim app rẻ nhất            │
├──────────────────────────────┼────────────────────────────┼────────────────────┼────────────────────────────────┤
│ 3. Radar gần cụm sống        │ Hòa Khánh (BK/SP), DUE     │ WATCHLIST_RECHECK  │ 26 địa chỉ store locator       │
│                              │ DanaBus 6k trước 21:00     │ POLICY_REFERENCE   │ lộ trình Sở GTVT Đà Nẵng       │
├──────────────────────────────┼────────────────────────────┼────────────────────┼────────────────────────────────┤
│ 4. Kèo nhóm / Happy hour     │ GoGi Combo 529k (~176k)    │ MENU_REFERENCE     │ thực đơn combo nhóm niêm yết   │
│                              │ KFC Xô Hợp Cạ 189k (~63k)  │ MENU_REFERENCE     │ thực đơn combo nhóm niêm yết   │
└──────────────────────────────┴────────────────────────────┴────────────────────┴────────────────────────────────┘
```

---

## 3. DANH SÁCH CÁC CLAIM ĐÃ BỊ LOẠI BỎ VÌ THIẾU EVIDENCE

1. ❌ **Loại bỏ tuyên bố "App ShopeeFood / GrabFood / BeFood rẻ hơn"**: Chưa có feed giao đồ ăn được cấp quyền -> Chuyển thành Chế độ 2 (Máy tính cục bộ) và Chế độ 3 (Cảnh báo chưa đủ dữ liệu).
2. ❌ **Loại bỏ từ "Deal / Giảm giá" trên thực đơn niêm yết**: KFC Dzựt Deal 88k, Jollibee 73k, GoGi 529k là combo thực đơn niêm yết, không phải chương trình giảm giá đột xuất -> Chuyển thành nhãn `📋 GIÁ THAM KHẢO (MENU NIÊM YẾT)`.
3. ❌ **Loại bỏ "Dự báo ưu đãi tháng tới"**: Rạp chưa công bố lịch tháng tới -> Chuyển thành nhãn `👁️ ĐANG THEO DÕI THÁNG TỚI (WATCHLIST)`.
4. ❌ **Loại bỏ phương án xe buýt đêm**: DanaBus chỉ chạy đến 21:00 -> Sau 21:00 hiển thị cảnh báo di chuyển an toàn bằng xe cá nhân hoặc ứng dụng gọi xe công nghệ.

---

## 4. KIỂM ĐỊNH NGỮ CẢNH 5 KHUNG GIỜ TRÊN LIVE PRODUCTION

- **07:30 (Ăn sáng / Đồ thiết yếu)**: DanaBus 6k, Jollibee 73k, Highlands Coffee JCB. *(0 phim đêm, 0 lẩu nướng GoGi)*.
- **11:05 (Cứu đói trưa)**: KFC Dzựt Deal 88k (Giá tham khảo), Jollibee 73k, CGV ZaloPay suất trưa 12h-13h. *(0 phim đêm, 0 xô gà tiệc, 0 DanaBus)*.
- **14:30 (Cà phê / Học nhóm chiều)**: Starlight Combo 10k, Phê La 55k, Gong Cha 53k. *(0 đồ ăn trưa, 0 nướng tối)*.
- **17:30 (Tan học / Tan ca)**: Metiz U22 45k, DanaBus 6k về nhà, KFC Xô Hợp Cạ 189k. *(0 cà phê sáng)*.
- **20:00 (Kèo tối & Xem phim)**: CGV Payday 30k / VNPAY BOGO, Metiz U22 45k, GoGi House 529k. *(0 xe buýt sau 21h)*.

---

## 5. LỘ TRÌNH BATCH KẾ TIẾP (NEXT BATCH ROADMAP)
- **Batch F&B Local**: Thu thập thêm 10 quán ăn sinh viên giá ≤35k quanh khu ĐH Bách Khoa (Hòa Khánh) và ĐH Kinh Tế (Ngũ Hành Sơn) với menu đối soát thực địa.
- **Batch Cinema Weekly Refresh**: Recheck chu kỳ khuyến mãi đầu tháng 9 của CGV, Metiz và Starlight.
- **Batch Delivery Integration**: Khảo sát tài liệu kết nối chính thức của các đối tác giao hàng khi có chính sách mở.

---

## 6. HỒ SƠ & BẰNG CHỨNG LIVE ĐÃ NIÊM PHONG
- **Biên nhận**: `08_RELEASE_VAULT/DEPLOYMENT_RECEIPT_132A.json`
- **Sổ cái chứng cứ**: `06_TRUST_AND_EVIDENCE/evidence_records/EVIDENCE_LEDGER_BATCH_132.json`
- **Test suite SSOT**: `07_QUALITY_ASSURANCE/test_single_truth_and_ssot_sync_132a.js` (**24/24 PASS**)
- **Test suite Quyết định**: `07_QUALITY_ASSURANCE/test_student_decision_os_132.js` (**33/33 PASS**)
- **Test suite Governance**: `07_QUALITY_ASSURANCE/test_daily_memory_and_lessons_loop_130.js` (**20/20 PASS**)
- **15 Ảnh Puppeteer Live**: 6 Viewports, 5 Slots, 4 Destinations lưu tại `07_QUALITY_ASSURANCE/runtime_evidence/live_beta_132a/`.
