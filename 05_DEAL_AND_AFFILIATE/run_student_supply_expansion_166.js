/**
 * JAYT ĐÀ NẴNG STUDENT SUPPLY EXPANSION BATCH RUNNER (166)
 * Directive: JAYT-166: ĐÀ NẴNG STUDENT SUPPLY EXPANSION BATCH
 * 
 * CORE RESPONSIBILITIES:
 * 1. Generates 75 candidate discovery targets across 5 Da Nang Community Clusters (15 per cluster).
 * 2. Classifies each target strictly into:
 *    - 🔵 TIER_2_VERIFIED_VENUE_LISTING (venues with locator/receipt evidence on disk)
 *    - 🟣 TIER_3_TRACKED_SOURCE_SIGNAL (official websites/pages being monitored)
 *    - 🟢 TIER_1_VERIFIED_PROOF_DEAL (0 live deals in production-locked state)
 * 3. Enforces zero scraping of Google Maps, food delivery apps, or private APIs.
 * 4. Outputs comprehensive supply expansion manifest and updated hybrid supply dashboard.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const manifest166Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'da_nang_cluster_expansion_manifest_166.json');
const dashboardPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'hybrid_supply_dashboard_162.json');

const clusters = [
  {
    cluster_id: 'CLUSTER_1_HOA_KHANH_LIEN_CHIEU',
    name: 'Hòa Khánh / Liên Chiểu',
    focus: 'Bách Khoa / Sư Phạm (Cơm sinh viên, bún mì, cà phê học bài, rạp và tiện ích KTX)',
    targets: [
      { id: 'HK_01', name: 'Starlight Cinema Đà Nẵng (Nguyễn Kim)', category: 'CINEMA', hub: 'HUB_3_CINEMA_ENTERTAINMENT', url: 'https://starlight.vn/', tier: 'TIER_2_VERIFIED_VENUE_LISTING', address: 'Tầng 3-4 Tòa nhà Nguyễn Kim, 46 Điện Biên Phủ, Thanh Khê / giáp Liên Chiểu', locator_evidence: true },
      { id: 'HK_02', name: 'Cơm Sinh Viên Khu BK Bách Khoa', category: 'FOOD_AND_DINING', hub: 'HUB_1_FOOD_AND_DINING', url: 'https://dut.udn.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Ngô Sĩ Liên, Hòa Khánh Bắc', locator_evidence: false },
      { id: 'HK_03', name: 'Trà Sữa & Cà Phê Học Bài Sinh Viên BK', category: 'STUDY_SPACES', hub: 'HUB_2_STUDY_SPACES', url: 'https://gongcha.com.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Khu vực Ngô Thì Nhậm / Nguyễn Lương Bằng', locator_evidence: false },
      { id: 'HK_04', name: 'Bún Mắm & Bánh Canh Hòa Khánh', category: 'FOOD_AND_DINING', hub: 'HUB_1_FOOD_AND_DINING', url: 'https://danang.gov.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Chợ Hòa Khánh, Liên Chiểu', locator_evidence: false },
      { id: 'HK_05', name: 'Highlands Coffee Nguyễn Lương Bằng', category: 'STUDY_SPACES', hub: 'HUB_2_STUDY_SPACES', url: 'https://www.highlandscoffee.com.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Nguyễn Lương Bằng, Liên Chiểu', locator_evidence: false },
      { id: 'HK_06', name: 'The Alley Hòa Khánh', category: 'STUDY_SPACES', hub: 'HUB_2_STUDY_SPACES', url: 'https://thealleyvietnam.com/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Nguyễn Lương Bằng, Liên Chiểu', locator_evidence: false },
      { id: 'HK_07', name: 'DanaBus Tuyến R16 (Kim Liên - ĐH Sư Phạm)', category: 'PUBLIC_TRANSIT', hub: 'HUB_4_PUBLIC_TRANSIT', url: 'https://www.danangbus.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Trạm ĐH Bách Khoa / ĐH Sư Phạm', locator_evidence: false },
      { id: 'HK_08', name: 'DanaBus Tuyến R6A (Bến xe Trung Tâm - Hòa Khánh)', category: 'PUBLIC_TRANSIT', hub: 'HUB_4_PUBLIC_TRANSIT', url: 'https://www.danangbus.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Trục Tôn Đức Thắng - Nguyễn Lương Bằng', locator_evidence: false },
      { id: 'HK_09', name: 'Nhà Sách Giáo Trình & Dụng Cụ Học Tập BK', category: 'DORM_AND_STUDY_SUPPLIES', hub: 'HUB_5_DORM_AND_STUDY_SUPPLIES', url: 'https://fahasa.com/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Tôn Đức Thắng, Liên Chiểu', locator_evidence: false },
      { id: 'HK_10', name: 'Cửa Hàng Tiện Lợi KTX Bách Khoa', category: 'DORM_AND_STUDY_SUPPLIES', hub: 'HUB_5_DORM_AND_STUDY_SUPPLIES', url: 'https://winmart.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'KTX Khu Tây, Liên Chiểu', locator_evidence: false },
      { id: 'HK_11', name: 'Lotteria Tôn Đức Thắng', category: 'FOOD_AND_DINING', hub: 'HUB_1_FOOD_AND_DINING', url: 'https://www.lotteria.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Tôn Đức Thắng, Liên Chiểu', locator_evidence: false },
      { id: 'HK_12', name: 'Jollibee Co.opmart Hòa Khánh', category: 'FOOD_AND_DINING', hub: 'HUB_1_FOOD_AND_DINING', url: 'https://jollibee.com.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Co.opmart Đà Nẵng, Liên Chiểu', locator_evidence: false },
      { id: 'HK_13', name: 'Phòng Tập Gym & Thể Thao Sinh Viên BK', category: 'CINEMA_ENTERTAINMENT', hub: 'HUB_3_CINEMA_ENTERTAINMENT', url: 'https://dut.udn.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Trung tâm Thể thao ĐHBK, Liên Chiểu', locator_evidence: false },
      { id: 'HK_14', name: 'In Ấn & Đóng Đồ Án Tốt Nghiệp Bách Khoa', category: 'DORM_AND_STUDY_SUPPLIES', hub: 'HUB_5_DORM_AND_STUDY_SUPPLIES', url: 'https://dut.udn.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Dọc đường Ngô Sĩ Liên, Liên Chiểu', locator_evidence: false },
      { id: 'HK_15', name: 'Ga Kim Liên (Đường Sắt Việt Nam)', category: 'PUBLIC_TRANSIT', hub: 'HUB_4_PUBLIC_TRANSIT', url: 'https://dsvn.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Phường Hòa Hiệp Bắc, Liên Chiểu', locator_evidence: false }
    ]
  },
  {
    cluster_id: 'CLUSTER_2_BAC_MY_AN_HOA_QUY',
    name: 'Bắc Mỹ An / Hòa Quý',
    focus: 'DUE / FPT / VKU (Ăn vặt chợ Bắc Mỹ An, cà phê, F&B, tiện ích KTX Làng Đại Học)',
    targets: [
      { id: 'BMA_01', name: 'Khu Ẩm Thực Chợ Bắc Mỹ An', category: 'FOOD_AND_DINING', hub: 'HUB_1_FOOD_AND_DINING', url: 'https://danang.gov.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Nguyễn Bá Lân, Ngũ Hành Sơn', locator_evidence: false },
      { id: 'BMA_02', name: 'Cà Phê Học Bài & Co-working Làng ĐH Hòa Quý', category: 'STUDY_SPACES', hub: 'HUB_2_STUDY_SPACES', url: 'https://vku.udn.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Nam Kỳ Khởi Nghĩa, Hòa Quý', locator_evidence: false },
      { id: 'BMA_03', name: 'The Coffee House Ngũ Hành Sơn', category: 'STUDY_SPACES', hub: 'HUB_2_STUDY_SPACES', url: 'https://thecoffeehouse.com/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Lê Văn Hiến, Ngũ Hành Sơn', locator_evidence: false },
      { id: 'BMA_04', name: 'Phúc Long Coffee & Tea Ngũ Hành Sơn', category: 'STUDY_SPACES', hub: 'HUB_2_STUDY_SPACES', url: 'https://phuclong.com.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Khu vực Bắc Mỹ An, Ngũ Hành Sơn', locator_evidence: false },
      { id: 'BMA_05', name: 'Cơm Tấm & Bún Đậu DUE Châu Thị Vĩnh Tế', category: 'FOOD_AND_DINING', hub: 'HUB_1_FOOD_AND_DINING', url: 'https://due.udn.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Châu Thị Vĩnh Tế, Ngũ Hành Sơn', locator_evidence: false },
      { id: 'BMA_06', name: 'DanaBus Tuyến R16 (Kim Liên - ĐH Kinh Tế)', category: 'PUBLIC_TRANSIT', hub: 'HUB_4_PUBLIC_TRANSIT', url: 'https://www.danangbus.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Trạm ĐH Kinh Tế, Ngũ Hành Sơn', locator_evidence: false },
      { id: 'BMA_07', name: 'DanaBus Tuyến 05 (Nguyễn Tất Thành - Làng ĐH VKU)', category: 'PUBLIC_TRANSIT', hub: 'HUB_4_PUBLIC_TRANSIT', url: 'https://www.danangbus.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Trạm ĐH CNTT&TT Việt - Hàn (VKU)', locator_evidence: false },
      { id: 'BMA_08', name: 'Khu Phức Hợp Giải Trí Sinh Viên FPT City', category: 'CINEMA_ENTERTAINMENT', hub: 'HUB_3_CINEMA_ENTERTAINMENT', url: 'https://uni.fpt.edu.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Khu Đô thị FPT City, Hòa Hải', locator_evidence: false },
      { id: 'BMA_09', name: 'Nhà Sách Giáo Trình Kinh Tế & Ngoại Ngữ', category: 'DORM_AND_STUDY_SUPPLIES', hub: 'HUB_5_DORM_AND_STUDY_SUPPLIES', url: 'https://due.udn.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Ngô Thì Sĩ, Ngũ Hành Sơn', locator_evidence: false },
      { id: 'BMA_10', name: 'Cửa Hàng Đồ Gia Dụng KTX Làng Đại Học', category: 'DORM_AND_STUDY_SUPPLIES', hub: 'HUB_5_DORM_AND_STUDY_SUPPLIES', url: 'https://winmart.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'KTU Làng ĐH Đà Nẵng, Hòa Quý', locator_evidence: false },
      { id: 'BMA_11', name: 'Cơm Niêu Sinh Viên Ngũ Hành Sơn', category: 'FOOD_AND_DINING', hub: 'HUB_1_FOOD_AND_DINING', url: 'https://danang.gov.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Phan Tứ, Ngũ Hành Sơn', locator_evidence: false },
      { id: 'BMA_12', name: 'Tocotoco Châu Thị Vĩnh Tế', category: 'STUDY_SPACES', hub: 'HUB_2_STUDY_SPACES', url: 'https://tocotocotea.com/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Châu Thị Vĩnh Tế, Ngũ Hành Sơn', locator_evidence: false },
      { id: 'BMA_13', name: 'Pizza Hut Ngũ Hành Sơn', category: 'FOOD_AND_DINING', hub: 'HUB_1_FOOD_AND_DINING', url: 'https://pizzahut.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Lê Văn Hiến, Ngũ Hành Sơn', locator_evidence: false },
      { id: 'BMA_14', name: 'Billiard & Boardgame Hub Sinh Viên DUE', category: 'CINEMA_ENTERTAINMENT', hub: 'HUB_3_CINEMA_ENTERTAINMENT', url: 'https://due.udn.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường An Thượng, Ngũ Hành Sơn', locator_evidence: false },
      { id: 'BMA_15', name: 'Siêu Thị Mini Tiện Ích KTX VKU', category: 'DORM_AND_STUDY_SUPPLIES', hub: 'HUB_5_DORM_AND_STUDY_SUPPLIES', url: 'https://vku.udn.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'KTX Trường VKU, Hòa Quý', locator_evidence: false }
    ]
  },
  {
    cluster_id: 'CLUSTER_3_HAI_CHAU_THANH_KHE',
    name: 'Hải Châu / Thanh Khê',
    focus: 'Trung tâm hành chính, văn phòng, rạp CGV/Lotte, chuỗi F&B lớn',
    targets: [
      { id: 'HCTK_01', name: 'Gong Cha Nguyễn Văn Linh', category: 'STUDY_SPACES', hub: 'HUB_2_STUDY_SPACES', url: 'https://gongcha.com.vn/', tier: 'TIER_2_VERIFIED_VENUE_LISTING', address: '25-29 Nguyễn Văn Linh, Phước Ninh, Hải Châu, Đà Nẵng', locator_evidence: true },
      { id: 'HCTK_02', name: 'CGV Cinemas Vĩnh Trung Plaza', category: 'CINEMA', hub: 'HUB_3_CINEMA_ENTERTAINMENT', url: 'https://www.cgv.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Vĩnh Trung Plaza, 255-257 Hùng Vương, Thanh Khê', locator_evidence: false },
      { id: 'HCTK_03', name: 'Lotte Cinema Đà Nẵng', category: 'CINEMA', hub: 'HUB_3_CINEMA_ENTERTAINMENT', url: 'https://www.lottecinemavn.com/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Tầng 5 Lotte Mart, Hòa Cường Bắc, Hải Châu', locator_evidence: false },
      { id: 'HCTK_04', name: 'Metiz Cinema Đà Nẵng', category: 'CINEMA', hub: 'HUB_3_CINEMA_ENTERTAINMENT', url: 'https://metiz.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Tầng 1 Helio Center, Đường 2/9, Hải Châu', locator_evidence: false },
      { id: 'HCTK_05', name: 'Ga Đà Nẵng (Đường Sắt Việt Nam)', category: 'PUBLIC_TRANSIT', hub: 'HUB_4_PUBLIC_TRANSIT', url: 'https://dsvn.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: '200 Hải Phòng, Tam Thuận, Thanh Khê', locator_evidence: false },
      { id: 'HCTK_06', name: 'Highlands Coffee VTV Đà Nẵng', category: 'STUDY_SPACES', hub: 'HUB_2_STUDY_SPACES', url: 'https://www.highlandscoffee.com.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Bạch Đằng, Hải Châu', locator_evidence: false },
      { id: 'HCTK_07', name: 'Cơm Trưa Văn Phòng Nguyễn Tri Phương', category: 'FOOD_AND_DINING', hub: 'HUB_1_FOOD_AND_DINING', url: 'https://danang.gov.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Nguyễn Tri Phương, Thanh Khê', locator_evidence: false },
      { id: 'HCTK_08', name: 'Pizza 4P\'s Hoàng Văn Thụ', category: 'FOOD_AND_DINING', hub: 'HUB_1_FOOD_AND_DINING', url: 'https://pizza4ps.com/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: '08 Hoàng Văn Thụ, Phước Ninh, Hải Châu', locator_evidence: false },
      { id: 'HCTK_09', name: 'Jollibee Vincom Đà Nẵng', category: 'FOOD_AND_DINING', hub: 'HUB_1_FOOD_AND_DINING', url: 'https://jollibee.com.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Tầng 4 Vincom Plaza, Ngô Quyền / Hải Châu', locator_evidence: false },
      { id: 'HCTK_10', name: 'KFC Nguyễn Văn Linh', category: 'FOOD_AND_DINING', hub: 'HUB_1_FOOD_AND_DINING', url: 'https://www.kfcvietnam.com.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Nguyễn Văn Linh, Hải Châu', locator_evidence: false },
      { id: 'HCTK_11', name: 'Nhà Sách Fahasa Lê Duẩn', category: 'DORM_AND_STUDY_SUPPLIES', hub: 'HUB_5_DORM_AND_STUDY_SUPPLIES', url: 'https://fahasa.com/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: '300-302 Lê Duẩn, Tân Chính, Thanh Khê', locator_evidence: false },
      { id: 'HCTK_12', name: 'Nhà Sách Phương Nam Phan Châu Trinh', category: 'DORM_AND_STUDY_SUPPLIES', hub: 'HUB_5_DORM_AND_STUDY_SUPPLIES', url: 'https://nhasachphuongnam.com/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Phan Châu Trinh, Hải Châu', locator_evidence: false },
      { id: 'HCTK_13', name: 'DanaBus Trạm Trung Chuyển Hùng Vương', category: 'PUBLIC_TRANSIT', hub: 'HUB_4_PUBLIC_TRANSIT', url: 'https://www.danangbus.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Trục Hùng Vương - Ông Ích Khiêm, Hải Châu', locator_evidence: false },
      { id: 'HCTK_14', name: 'Trung Tâm Thể Thao Đĩa Bay Helio', category: 'CINEMA_ENTERTAINMENT', hub: 'HUB_3_CINEMA_ENTERTAINMENT', url: 'https://helio.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Khu Công viên Châu Á, Hải Châu', locator_evidence: false },
      { id: 'HCTK_15', name: 'Co.opmart Điện Biên Phủ', category: 'DORM_AND_STUDY_SUPPLIES', hub: 'HUB_5_DORM_AND_STUDY_SUPPLIES', url: 'https://co-opmart.com.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: '478 Điện Biên Phủ, Thanh Khê', locator_evidence: false }
    ]
  },
  {
    cluster_id: 'CLUSTER_4_HI_TECH_SOFTWARE_PARK',
    name: 'Khu Công Nghệ Cao / CV Phần Mềm',
    focus: 'Sinh viên IT, kỹ sư công nghệ, Software Park 1 & 2, FPT Complex, bản quyền phần mềm',
    targets: [
      { id: 'CNC_01', name: 'Cổng Bản Quyền GitHub Student Developer Pack', category: 'STUDENT_PORTAL', hub: 'HUB_5_DORM_AND_STUDY_SUPPLIES', url: 'https://education.github.com/pack', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Xác thực trực tuyến qua email trường', locator_evidence: false },
      { id: 'CNC_02', name: 'Cổng Bản Quyền JetBrains Educational License', category: 'STUDENT_PORTAL', hub: 'HUB_5_DORM_AND_STUDY_SUPPLIES', url: 'https://www.jetbrains.com/community/education/#students', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Xác thực trực tuyến cho sinh viên IT', locator_evidence: false },
      { id: 'CNC_03', name: 'Cổng Bản Quyền Notion for Education', category: 'STUDENT_PORTAL', hub: 'HUB_5_DORM_AND_STUDY_SUPPLIES', url: 'https://www.notion.so/product/notion-for-education', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Xác thực trực tuyến ghi chú học tập', locator_evidence: false },
      { id: 'CNC_04', name: 'Cổng Bản Quyền Canva for Education', category: 'STUDENT_PORTAL', hub: 'HUB_5_DORM_AND_STUDY_SUPPLIES', url: 'https://www.canva.com/education/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Xác thực trực tuyến thiết kế', locator_evidence: false },
      { id: 'CNC_05', name: 'Cổng Spotify Premium Student (SheerID)', category: 'STUDENT_PORTAL', hub: 'HUB_5_DORM_AND_STUDY_SUPPLIES', url: 'https://www.spotify.com/vn-vi/student/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Cổng xác thực âm nhạc học tập', locator_evidence: false },
      { id: 'CNC_06', name: 'Cổng YouTube Premium Student', category: 'STUDENT_PORTAL', hub: 'HUB_5_DORM_AND_STUDY_SUPPLIES', url: 'https://www.youtube.com/premium/student', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Cổng xác thực Google SheerID', locator_evidence: false },
      { id: 'CNC_07', name: 'Canteen & Cơm Trưa Công Viên Phần Mềm 1 (Quang Trung)', category: 'FOOD_AND_DINING', hub: 'HUB_1_FOOD_AND_DINING', url: 'https://dsp.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: '02 Quang Trung, Thạch Thang, Hải Châu', locator_evidence: false },
      { id: 'CNC_08', name: 'Khu Cà Phê & Làm Việc Công Viên Phần Mềm 2 (Cầu Thuận Phước)', category: 'STUDY_SPACES', hub: 'HUB_2_STUDY_SPACES', url: 'https://danang.gov.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Như Nguyệt, Thuận Phước, Hải Châu', locator_evidence: false },
      { id: 'CNC_09', name: 'FPT Complex Canteen & Coffee Hub', category: 'FOOD_AND_DINING', hub: 'HUB_1_FOOD_AND_DINING', url: 'https://fpt-software.com/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Nam Kỳ Khởi Nghĩa, Hòa Hải', locator_evidence: false },
      { id: 'CNC_10', name: 'Cà Phê Lập Trình & Không Gian Co-working Quang Trung', category: 'STUDY_SPACES', hub: 'HUB_2_STUDY_SPACES', url: 'https://danang.gov.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Quang Trung, Hải Châu', locator_evidence: false },
      { id: 'CNC_11', name: 'DanaBus Tuyến R4A (Cảng Sông Hàn - CV Phần Mềm)', category: 'PUBLIC_TRANSIT', hub: 'HUB_4_PUBLIC_TRANSIT', url: 'https://www.danangbus.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Trạm Công Viên Phần Mềm Quang Trung', locator_evidence: false },
      { id: 'CNC_12', name: 'DanaBus Tuyến Tuyến Buýt Xe Đưa Đón Khu CNC', category: 'PUBLIC_TRANSIT', hub: 'HUB_4_PUBLIC_TRANSIT', url: 'https://www.danangbus.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Khu Công Nghệ Cao Đà Nẵng, Hòa Vang', locator_evidence: false },
      { id: 'CNC_13', name: 'Cửa Hàng Thiết Bị Tin Học & Linh Kiện IT', category: 'DORM_AND_STUDY_SUPPLIES', hub: 'HUB_5_DORM_AND_STUDY_SUPPLIES', url: 'https://fptshop.com.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Hàm Nghi, Thanh Khê', locator_evidence: false },
      { id: 'CNC_14', name: 'Khu Thể Thao Kỹ Sư & Sinh Viên IT Phần Mềm', category: 'CINEMA_ENTERTAINMENT', hub: 'HUB_3_CINEMA_ENTERTAINMENT', url: 'https://fpt-software.com/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Khu liên hợp FPT Complex, Hòa Hải', locator_evidence: false },
      { id: 'CNC_15', name: 'Cơm Trưa Nhanh Văn Phòng IT Hàm Nghi', category: 'FOOD_AND_DINING', hub: 'HUB_1_FOOD_AND_DINING', url: 'https://danang.gov.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Hàm Nghi, Thanh Khê', locator_evidence: false }
    ]
  },
  {
    cluster_id: 'CLUSTER_5_SON_TRA_BEACH',
    name: 'Sơn Trà / Ven Biển',
    focus: 'Điểm hẹn cuối tuần, ẩm thực hải sản sinh viên, cà phê view biển, tuyến buýt biển',
    targets: [
      { id: 'ST_01', name: 'Ẩm Thực Hải Sản & Ăn Vặt Chợ Đêm Sơn Trà', category: 'FOOD_AND_DINING', hub: 'HUB_1_FOOD_AND_DINING', url: 'https://danang.gov.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Mai Hắc Đế - Lý Nam Đế, An Hải Tây, Sơn Trà', locator_evidence: false },
      { id: 'ST_02', name: 'Cà Phê Học Bài & Ngắm Cầu Rồng Trần Hưng Đạo', category: 'STUDY_SPACES', hub: 'HUB_2_STUDY_SPACES', url: 'https://thecoffeehouse.com/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Trần Hưng Đạo, An Hải Tây, Sơn Trà', locator_evidence: false },
      { id: 'ST_03', name: 'DanaBus Tuyến R15 (Bến xe Trung tâm - Thọ Quang)', category: 'PUBLIC_TRANSIT', hub: 'HUB_4_PUBLIC_TRANSIT', url: 'https://www.danangbus.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Trục Ngô Quyền - Hoàng Sa, Sơn Trà', locator_evidence: false },
      { id: 'ST_04', name: 'DanaBus Tuyến Tuyến Du Lịch Ven Biển Mỹ Khê', category: 'PUBLIC_TRANSIT', hub: 'HUB_4_PUBLIC_TRANSIT', url: 'https://www.danangbus.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Võ Nguyên Giáp, Sơn Trà', locator_evidence: false },
      { id: 'ST_05', name: 'Cơm Gà & Bún Chả Cá Đặc Sản Sơn Trà', category: 'FOOD_AND_DINING', hub: 'HUB_1_FOOD_AND_DINING', url: 'https://danang.gov.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Nguyễn Công Trứ, Phước Mỹ, Sơn Trà', locator_evidence: false },
      { id: 'ST_06', name: 'Highlands Coffee Ngô Quyền Vincom', category: 'STUDY_SPACES', hub: 'HUB_2_STUDY_SPACES', url: 'https://www.highlandscoffee.com.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Tầng 1 Vincom Plaza Ngô Quyền, An Hải Bắc, Sơn Trà', locator_evidence: false },
      { id: 'ST_07', name: 'Khu Thể Thao Bãi Biển Mỹ Khê (Bóng Chuyền/Chạy Bộ)', category: 'CINEMA_ENTERTAINMENT', hub: 'HUB_3_CINEMA_ENTERTAINMENT', url: 'https://danang.gov.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Công viên Biển Đông, Phạm Văn Đồng, Sơn Trà', locator_evidence: false },
      { id: 'ST_08', name: 'Bánh Mì & Điểm Tâm Sáng Sinh Viên Võ Văn Kiệt', category: 'FOOD_AND_DINING', hub: 'HUB_1_FOOD_AND_DINING', url: 'https://danang.gov.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Võ Văn Kiệt, Phước Mỹ, Sơn Trà', locator_evidence: false },
      { id: 'ST_09', name: 'Siêu Thị Mini Phục Vụ Du Khách & Sinh Viên Ven Biển', category: 'DORM_AND_STUDY_SUPPLIES', hub: 'HUB_5_DORM_AND_STUDY_SUPPLIES', url: 'https://winmart.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Hồ Nghinh, Phước Mỹ, Sơn Trà', locator_evidence: false },
      { id: 'ST_10', name: 'Trà Sữa Sinh Viên & Điểm Check-in Cầu Tình Yêu', category: 'STUDY_SPACES', hub: 'HUB_2_STUDY_SPACES', url: 'https://danang.gov.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Trần Hưng Đạo, Sơn Trà', locator_evidence: false },
      { id: 'ST_11', name: 'Lotteria Vincom Ngô Quyền', category: 'FOOD_AND_DINING', hub: 'HUB_1_FOOD_AND_DINING', url: 'https://www.lotteria.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Tầng 4 Vincom Ngô Quyền, Sơn Trà', locator_evidence: false },
      { id: 'ST_12', name: 'Rạp Phim CGV Vincom Đà Nẵng (Sơn Trà)', category: 'CINEMA', hub: 'HUB_3_CINEMA_ENTERTAINMENT', url: 'https://www.cgv.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Tầng 4 Vincom Plaza, 910A Ngô Quyền, An Hải Bắc, Sơn Trà', locator_evidence: false },
      { id: 'ST_13', name: 'Nhà Sách Giáo Dục Sơn Trà', category: 'DORM_AND_STUDY_SUPPLIES', hub: 'HUB_5_DORM_AND_STUDY_SUPPLIES', url: 'https://fahasa.com/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Nguyễn Phan Vinh, Thọ Quang, Sơn Trà', locator_evidence: false },
      { id: 'ST_14', name: 'Bến Thuyền Du Lịch Sông Hàn (Ưu Đãi Học Sinh Sinh Viên)', category: 'PUBLIC_TRANSIT', hub: 'HUB_4_PUBLIC_TRANSIT', url: 'https://danang.gov.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Như Nguyệt / Trần Hưng Đạo', locator_evidence: false },
      { id: 'ST_15', name: 'Cửa Hàng Tiện Lợi Mở 24/7 Phục Vụ Cú Đêm Ven Biển', category: 'DORM_AND_STUDY_SUPPLIES', hub: 'HUB_5_DORM_AND_STUDY_SUPPLIES', url: 'https://winmart.vn/', tier: 'TIER_3_TRACKED_SOURCE_SIGNAL', address: 'Đường Hà Bổng, Phước Mỹ, Sơn Trà', locator_evidence: false }
    ]
  }
];

// Calculate summary metrics
let allTargets = [];
clusters.forEach(c => {
  allTargets = allTargets.concat(c.targets);
});

const totalTargets = allTargets.length;
const verifiedVenuesCount = allTargets.filter(t => t.tier === 'TIER_2_VERIFIED_VENUE_LISTING').length;
const trackedSourcesCount = allTargets.filter(t => t.tier === 'TIER_3_TRACKED_SOURCE_SIGNAL').length;
const verifiedDealsCount = allTargets.filter(t => t.tier === 'TIER_1_VERIFIED_PROOF_DEAL').length;

const expansionManifest = {
  manifest_id: 'JAYT_166_EXPANSION_MANIFEST',
  directive: 'JAYT-166: ĐÀ NẴNG STUDENT SUPPLY EXPANSION BATCH',
  generated_at: new Date().toISOString(),
  total_clusters: clusters.length,
  total_managed_targets: totalTargets,
  tier_breakdown: {
    tier_1_verified_proof_deals: verifiedDealsCount, // 0 live commercial deals in locked staging
    tier_2_verified_physical_venues: verifiedVenuesCount, // 2 venues with on-disk locator receipts
    tier_3_tracked_source_signals: trackedSourcesCount, // 73 tracked sources
    tier_4_unresolved_needs: 0
  },
  clusters: clusters
};

fs.writeFileSync(manifest166Path, JSON.stringify(expansionManifest, null, 2), 'utf8');
console.log(`✅ Saved Expansion Manifest with ${totalTargets} targets to: ${manifest166Path}`);

// Update hybrid_supply_dashboard_162.json with new cluster distribution
const updatedClusters = clusters.map(c => {
  const vCount = c.targets.filter(t => t.tier === 'TIER_2_VERIFIED_VENUE_LISTING').length;
  const tCount = c.targets.filter(t => t.tier === 'TIER_3_TRACKED_SOURCE_SIGNAL').length;
  return {
    cluster_id: c.cluster_id,
    name: c.name,
    focus: c.focus,
    verified_venues_count: vCount,
    tracked_sources_count: tCount,
    recheck_needed_count: 0,
    community_needs_count: 0
  };
});

let currentDashboard = JSON.parse(fs.readFileSync(dashboardPath, 'utf8'));
currentDashboard.total_managed_targets = totalTargets;
currentDashboard.clusters = updatedClusters;
currentDashboard.last_updated_at = new Date().toISOString();

fs.writeFileSync(dashboardPath, JSON.stringify(currentDashboard, null, 2), 'utf8');
console.log(`✅ Updated Hybrid Supply Dashboard at: ${dashboardPath}`);
