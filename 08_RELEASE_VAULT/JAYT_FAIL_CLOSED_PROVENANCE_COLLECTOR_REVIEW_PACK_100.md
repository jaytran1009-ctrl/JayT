# GÓI HỒ SƠ BỘ THU THẬP NGUỒN GỐC AN TOÀN (FAIL-CLOSED COLLECTOR): `JAYT-100-FAIL-CLOSED-PROVENANCE-COLLECTOR`

> **Tuyên ngôn North Star**: JayT không phải sổ tay nhập chi tiêu. JayT là **Community Deal Discovery Engine** cho sinh viên và dân văn phòng Đà Nẵng:  
> *“Biết hôm nay đi đâu, ăn gì, mua gì đáng tiền; có thể kiểm tra nhanh và rủ nhóm ngay.”*

---

## 1. THIẾT KẾ & BẢO ĐẢM BỘ THU THẬP AN TOÀN `safe_provenance_collector_100.js`

Bộ thu thập mới [`05_DEAL_AND_AFFILIATE/safe_provenance_collector_100.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/05_DEAL_AND_AFFILIATE/safe_provenance_collector_100.js) thay thế hoàn toàn collector bị cô lập trong batch 099 với 5 bất biến bắt buộc:

1. **Response HTTP Thật (< 400)**: Phải có đối tượng phản hồi mạng thực tế từ server đích với mã trạng thái hợp lệ. Không bao giờ mặc định mã 200 khi không có response.
2. **DOM & Text Thật**: Kiểm tra `rawHtml.length >= 50` và `rawText.length >= 20`. Nếu trang rỗng hoặc trang lỗi trắng, ném ngoại lệ fail-closed ngay lập tức.
3. **Ảnh Chụp Màn Hình Thật**: Bắt buộc sinh ảnh `.png` hợp lệ với dung lượng $\ge 1000$ bytes.
4. **Ghi Raw Bytes Nguyên Trạng**: Tuyệt đối không chèn metadata tổng hợp, không ghép chuỗi fallback vào `page.txt` hay `page.html`.
5. **Thất Bại Chỉ Emit `FAILED_CAPTURE`**: Khi gặp bất kỳ lỗi mạng, timeout hoặc DOM rỗng, hệ thống tự động xóa sạch các file rác dở dang và chỉ ghi duy nhất `capture_failed_receipt.json` với `status: "FAILED_CAPTURE"`.

---

## 2. KẾT QUẢ KIỂM THỬ ĐƠN VỊ & KỊCH BẢN GIẢ ĐỊNH (5/5 PASS)

Bộ kiểm thử [`test_fail_closed_collector_100.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_fail_closed_collector_100.js) chạy trên máy chủ HTTP cô lập đã vượt qua 100%:

- `TEST_01_POSITIVE_CAPTURE_AUTHENTIC_200_AND_DOM`: **PASS** (Thu thập raw bytes & receipt `CAPTURE_AUTHENTICATED` thành công khi trang trả về 200 OK + full DOM).
- `TEST_02_NEGATIVE_FAIL_CLOSED_ON_HTTP_404`: **PASS** (Chặn đứng, không tạo artifact raw, ghi `FAILED_CAPTURE` khi server trả về HTTP 404).
- `TEST_03_NEGATIVE_FAIL_CLOSED_ON_EMPTY_DOM`: **PASS** (Chặn đứng khi DOM trả về rỗng).
- `TEST_04_NEGATIVE_FAIL_CLOSED_ON_HTTP_500`: **PASS** (Chặn đứng khi server gặp sự cố 500).
- `TEST_05_NEGATIVE_FAIL_CLOSED_ON_NETWORK_TIMEOUT`: **PASS** (Chặn đứng khi không kết nối được mạng).

---

## 3. ĐẶC TẢ TRẠNG THÁI 18 ĐỊA ĐIỂM COBALT LỊCH SỬ
- **Phân loại chính xác**: 18 địa điểm Cobalt còn lại được định nghĩa là **"artifact-backed historical locations"** dựa trên capture đã kiểm toán trong các batch trước (088a/088b/088c/088d).
- **Quy chế vận hành**: Đây chưa phải cam kết rằng các quán đang mở cửa trong thời gian thực hôm nay; hệ thống kiểm soát trạng thái bằng cơ chế TTL và disclaimer: *“Quán hoạt động; ưu đãi online chưa đủ dữ liệu.”*
- **Khu vực Ngũ Hành Sơn**: Tiếp tục duy trì `0 địa điểm Cobalt` (`WATCHLIST_ONLY_NO_COBALT_EVIDENCE`) cho tới khi có mẻ quét thực tế thành công bằng `safe_provenance_collector_100.js`.

---

## 4. KẾT QUẢ KIỂM THỬ HỆ THỐNG TOÀN DIỆN (59/59 PASS)

- [`test_fail_closed_collector_100.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_fail_closed_collector_100.js): **5/5 PASS**
- [`test_provenance_containment_099a.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_provenance_containment_099a.js): **17/17 PASS**
- [`test_project_memory_consistency.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_project_memory_consistency.js): **10/10 PASS**
- [`test_customer_journey_north_star_096.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự%20Án%20Giá%20Trị%20Cộng%20Đồng/07_QUALITY_ASSURANCE/test_customer_journey_north_star_096.js): **12/12 PASS**
- [`test_network_airgap_and_strict_mem07_093b.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự Án Giá Trị Cộng Đồng/07_QUALITY_ASSURANCE/test_network_airgap_and_strict_mem07_093b.js): **5/5 PASS**
- [`test_semantic_and_memory_correction_093a.js`](file:///d:/Công%20Việc%20MMO/OPC%20JayT/JayT-Dự Án Giá Trị Cộng Đồng/07_QUALITY_ASSURANCE/test_semantic_and_memory_correction_093a.js): **10/10 PASS**

---

## 5. KỶ LUẬT KHÓA SẢN XUẤT BẤT BIẾN
- **Không phát hành Release Candidate trong 100** (`RELEASE_CANDIDATE_100.json` không tồn tại).
- **Khóa sản xuất tuyệt đối**: `05_DEAL_AND_AFFILIATE/deals_feed.json: []` (0 bytes), `08_RELEASE_VAULT/RELEASE_MANIFEST.json` có `is_approved: false`.
- **Không sửa đổi candidate lịch sử 094 / 094A / 094B**.
