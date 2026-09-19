/**
 * JAYT EXPANDED BATCH CAPTURE RUNNER (137)
 * Directive: JAYT-137 — VERIFIED SUPPLY EXPANSION & GENERIC COMPILER CERTIFICATION
 * 
 * Mandate:
 * - Real browser capture via Puppeteer across 5 cohorts (>= 100 leaf pages).
 * - Saves page.html, page.txt, screenshot.png, metadata.json, and SHA-256.
 * - ZERO login/CAPTCHA bypass. Network/bot errors recorded cleanly as BLOCKED_OR_ERROR.
 * - ZERO fake offline caches or fallback content.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const batchDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_137');
const capturesDir = path.join(batchDir, 'captures_137');

if (!fs.existsSync(capturesDir)) {
  fs.mkdirSync(capturesDir, { recursive: true });
}

function getSha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const SEED_TARGETS_137 = [
  // =========================================================================
  // COHORT 1: RẠP PHIM ĐÀ NẴNG (15 Targets)
  // =========================================================================
  {
    target_id: 'TARGET_137_C1_01',
    cohort: 'COHORT_1_CINEMA_DANANG',
    name: 'CGV Cinemas - Trang Ưu Đãi Tổng',
    url: 'https://www.cgv.vn/default/newsoffer/'
  },
  {
    target_id: 'TARGET_137_C1_02',
    cohort: 'COHORT_1_CINEMA_DANANG',
    name: 'CGV Cinemas - Deal Mua 1 Tặng 1 VNPAY VietinBank',
    url: 'https://www.cgv.vn/default/newsoffer/cgv-vnpay-vietin/'
  },
  {
    target_id: 'TARGET_137_C1_03',
    cohort: 'COHORT_1_CINEMA_DANANG',
    name: 'CGV Cinemas - Thứ 4 Vui Vẻ Happy Wednesday',
    url: 'https://www.cgv.vn/default/newsoffer/happy-wednesday/'
  },
  {
    target_id: 'TARGET_137_C1_04',
    cohort: 'COHORT_1_CINEMA_DANANG',
    name: 'CGV Cinemas - Chi Nhánh CGV Vĩnh Trung Plaza Đà Nẵng',
    url: 'https://www.cgv.vn/default/cinox/site/cgv-vinh-trung-plaza'
  },
  {
    target_id: 'TARGET_137_C1_05',
    cohort: 'COHORT_1_CINEMA_DANANG',
    name: 'CGV Cinemas - Chi Nhánh CGV Vincom Đà Nẵng',
    url: 'https://www.cgv.vn/default/cinox/site/cgv-vincom-da-nang'
  },
  {
    target_id: 'TARGET_137_C1_06',
    cohort: 'COHORT_1_CINEMA_DANANG',
    name: 'CGV Cinemas - Chi Nhánh CGV MM Supercenter Đà Nẵng',
    url: 'https://www.cgv.vn/default/cinox/site/cgv-mm-supercenter-da-nang'
  },
  {
    target_id: 'TARGET_137_C1_07',
    cohort: 'COHORT_1_CINEMA_DANANG',
    name: 'Starlight Cinema - Trang Khuyến Mãi',
    url: 'https://starlight.vn/khuyen-mai.html'
  },
  {
    target_id: 'TARGET_137_C1_08',
    cohort: 'COHORT_1_CINEMA_DANANG',
    name: 'Starlight Cinema - Ưu Đãi Combo Hè 10K',
    url: 'https://starlight.vn/uu-dai/%F0%9F%8C%9E-he-ron-rang-deal-10k-san-sang-%F0%9F%8C%9E-1064.html'
  },
  {
    target_id: 'TARGET_137_C1_09',
    cohort: 'COHORT_1_CINEMA_DANANG',
    name: 'Starlight Cinema - Ngày Tri Ân Thứ 3',
    url: 'https://starlight.vn/uu-dai/ngay-tri-an---thu-3-vui-ve-1033.html'
  },
  {
    target_id: 'TARGET_137_C1_10',
    cohort: 'COHORT_1_CINEMA_DANANG',
    name: 'Starlight Cinema - Rạp Starlight Đà Nẵng',
    url: 'https://starlight.vn/cum-rap/starlight-da-nang.html'
  },
  {
    target_id: 'TARGET_137_C1_11',
    cohort: 'COHORT_1_CINEMA_DANANG',
    name: 'Metiz Cinema Đà Nẵng - Trang Khuyến Mãi',
    url: 'https://metiz.vn/khuyen-mai/'
  },
  {
    target_id: 'TARGET_137_C1_12',
    cohort: 'COHORT_1_CINEMA_DANANG',
    name: 'Metiz Cinema Đà Nẵng - Giá Vé và Địa Chỉ Rạp',
    url: 'https://metiz.vn/gia-ve/'
  },
  {
    target_id: 'TARGET_137_C1_13',
    cohort: 'COHORT_1_CINEMA_DANANG',
    name: 'Galaxy Cinema - Rạp Galaxy Đà Nẵng',
    url: 'https://www.galaxycine.vn/rap-gia-ve/galaxy-da-nang/'
  },
  {
    target_id: 'TARGET_137_C1_14',
    cohort: 'COHORT_1_CINEMA_DANANG',
    name: 'Galaxy Cinema - Trang Khuyến Mãi Ưu Đãi',
    url: 'https://www.galaxycine.vn/khuyen-mai/'
  },
  {
    target_id: 'TARGET_137_C1_15',
    cohort: 'COHORT_1_CINEMA_DANANG',
    name: 'Lotte Cinema Đà Nẵng - Trang Rạp Chi Nhánh',
    url: 'https://www.lottecinemavn.com/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=4&cinemaID=6001'
  },

  // =========================================================================
  // COHORT 2: F&B SINH VIÊN / VĂN PHÒNG ĐÀ NẴNG (35 Targets)
  // =========================================================================
  {
    target_id: 'TARGET_137_C2_01',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'KFC Vietnam - Ưu Đãi Khuyến Mãi',
    url: 'https://kfcvietnam.com.vn/khuyen-mai'
  },
  {
    target_id: 'TARGET_137_C2_02',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'KFC Vietnam - Danh Sách Nhà Hàng Đà Nẵng',
    url: 'https://kfcvietnam.com.vn/he-thong-nha-hang-kfc'
  },
  {
    target_id: 'TARGET_137_C2_03',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Jollibee Vietnam - Trang Khuyến Mãi',
    url: 'https://jollibee.com.vn/khuyen-mai'
  },
  {
    target_id: 'TARGET_137_C2_04',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Jollibee Vietnam - Cửa Hàng Đà Nẵng',
    url: 'https://jollibee.com.vn/cua-hang'
  },
  {
    target_id: 'TARGET_137_C2_05',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Lotteria Vietnam - Khuyến Mãi',
    url: 'https://www.lotteria.vn/khuyen-mai'
  },
  {
    target_id: 'TARGET_137_C2_06',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Lotteria Vietnam - Cửa Hàng Đà Nẵng',
    url: 'https://www.lotteria.vn/cua-hang'
  },
  {
    target_id: 'TARGET_137_C2_07',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Domino’s Pizza Vietnam - Khuyến Mãi Hot',
    url: 'https://dominos.vn/khuyen-mai'
  },
  {
    target_id: 'TARGET_137_C2_08',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Domino’s Pizza Vietnam - Cửa Hàng Nguyễn Văn Linh Đà Nẵng',
    url: 'https://dominos.vn/danh-sach-cua-hang'
  },
  {
    target_id: 'TARGET_137_C2_09',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Highlands Coffee - Trang Chủ & Khuyến Mãi',
    url: 'https://www.highlandscoffee.com.vn/vn/tin-tuc-su-kien.html'
  },
  {
    target_id: 'TARGET_137_C2_10',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Highlands Coffee - Quán Cà Phê Đà Nẵng',
    url: 'https://www.highlandscoffee.com.vn/vn/he-thong-quan-ca-phe.html'
  },
  {
    target_id: 'TARGET_137_C2_11',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Phê La - Hệ Thống Cửa Hàng Đà Nẵng',
    url: 'https://phela.vn/he-thong-cua-hang/'
  },
  {
    target_id: 'TARGET_137_C2_12',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Phê La - Tin Tức & Khuyến Mãi',
    url: 'https://phela.vn/tin-tuc/'
  },
  {
    target_id: 'TARGET_137_C2_13',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Phúc Long Coffee & Tea - Khuyến Mãi',
    url: 'https://phuclong.com.vn/khuyen-mai'
  },
  {
    target_id: 'TARGET_137_C2_14',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Phúc Long Coffee & Tea - Chi Nhánh Đà Nẵng',
    url: 'https://phuclong.com.vn/he-thong-cua-hang-phuc-long'
  },
  {
    target_id: 'TARGET_137_C2_15',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Gong Cha Vietnam - Khuyến Mãi',
    url: 'https://gongcha.com.vn/tin-tuc-khuyen-mai/'
  },
  {
    target_id: 'TARGET_137_C2_16',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Gong Cha Vietnam - Cửa Hàng Đà Nẵng',
    url: 'https://gongcha.com.vn/cua-hang/'
  },
  {
    target_id: 'TARGET_137_C2_17',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'The Coffee House - Khuyến Mãi',
    url: 'https://thecoffeehouse.com/pages/tin-tuc-khuyen-mai'
  },
  {
    target_id: 'TARGET_137_C2_18',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'The Coffee House - Cửa Hàng Đà Nẵng',
    url: 'https://thecoffeehouse.com/pages/danh-sach-cua-hang'
  },
  {
    target_id: 'TARGET_137_C2_19',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Dookki Vietnam - Khuyến Mãi Buffet Tokpokki',
    url: 'https://dookkivietnam.com/'
  },
  {
    target_id: 'TARGET_137_C2_20',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Gogi House (Golden Gate) - Ưu Đãi Thịt Nướng Hàn Quốc',
    url: 'https://gogi.com.vn/uu-dai'
  },
  {
    target_id: 'TARGET_137_C2_21',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Gogi House - Nhà Hàng Đà Nẵng',
    url: 'https://gogi.com.vn/dia-diem'
  },
  {
    target_id: 'TARGET_137_C2_22',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Kichi Kichi - Ưu Đãi Lẩu Băng Chuyền',
    url: 'https://kichi.com.vn/uu-dai'
  },
  {
    target_id: 'TARGET_137_C2_23',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Kichi Kichi - Nhà Hàng Đà Nẵng',
    url: 'https://kichi.com.vn/dia-diem'
  },
  {
    target_id: 'TARGET_137_C2_24',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Pizza Hut Vietnam - Khuyến Mãi',
    url: 'https://pizzahut.vn/khuyen-mai'
  },
  {
    target_id: 'TARGET_137_C2_25',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Pizza Hut Vietnam - Nhà Hàng Đà Nẵng',
    url: 'https://pizzahut.vn/danh-sach-cua-hang'
  },
  {
    target_id: 'TARGET_137_C2_26',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Texas Chicken Vietnam - Ưu Đãi Gà Rán',
    url: 'https://texaschicken.vn/khuyen-mai'
  },
  {
    target_id: 'TARGET_137_C2_27',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Bake Cheese Tart Vietnam - Khuyến Mãi',
    url: 'https://cheesetart.vn/'
  },
  {
    target_id: 'TARGET_137_C2_28',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Tous Les Jours Vietnam - Cửa Hàng & Bánh',
    url: 'https://www.tljus.com/'
  },
  {
    target_id: 'TARGET_137_C2_29',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Paris Baguette Vietnam - Bánh Tươi',
    url: 'https://parisbaguette.com.vn/'
  },
  {
    target_id: 'TARGET_137_C2_30',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Cộng Cà Phê - Danh Sách Quán Đà Nẵng',
    url: 'https://congcaphe.com/stores'
  },
  {
    target_id: 'TARGET_137_C2_31',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Cộng Cà Phê - Câu Chuyện & Thực Đơn',
    url: 'https://congcaphe.com/story'
  },
  {
    target_id: 'TARGET_137_C2_32',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Morico - Contemporary Japanese',
    url: 'https://morico.life/'
  },
  {
    target_id: 'TARGET_137_C2_33',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Baskin Robbins Vietnam - Ưu Đãi Kem',
    url: 'https://baskinrobbins.vn/'
  },
  {
    target_id: 'TARGET_137_C2_34',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'Golden Gate - The Golden Spoon Khuyến Mãi',
    url: 'https://thegoldenspoon.com.vn/'
  },
  {
    target_id: 'TARGET_137_C2_35',
    cohort: 'COHORT_2_FNB_DANANG',
    name: 'WinMart - Cẩm Nang Mua Sắm & Khuyến Mãi',
    url: 'https://winmart.vn/'
  },

  // =========================================================================
  // COHORT 3: ĐI LẠI VÀ TIỆN ÍCH ĐÀ NẴNG (15 Targets)
  // =========================================================================
  {
    target_id: 'TARGET_137_C3_01',
    cohort: 'COHORT_3_TRANSIT_UTILITIES',
    name: 'DanaBus - Hệ Thống Xe Buýt Công Cộng Đà Nẵng',
    url: 'https://danangbus.vn/'
  },
  {
    target_id: 'TARGET_137_C3_02',
    cohort: 'COHORT_3_TRANSIT_UTILITIES',
    name: 'DanaBus - Biểu Giá Vé Xe Buýt Trợ Giá',
    url: 'https://danangbus.vn/bieu-gia-ve.html'
  },
  {
    target_id: 'TARGET_137_C3_03',
    cohort: 'COHORT_3_TRANSIT_UTILITIES',
    name: 'DanaBus - Lộ Trình Tuyến Xe Buýt',
    url: 'https://danangbus.vn/lo-trinh-tuyen.html'
  },
  {
    target_id: 'TARGET_137_C3_04',
    cohort: 'COHORT_3_TRANSIT_UTILITIES',
    name: 'Sở Giao Thông Vận Tải TP Đà Nẵng',
    url: 'https://sgtvt.danang.gov.vn/'
  },
  {
    target_id: 'TARGET_137_C3_05',
    cohort: 'COHORT_3_TRANSIT_UTILITIES',
    name: 'Cổng Dịch Vụ Công Đà Nẵng',
    url: 'https://dichvucong.danang.gov.vn/'
  },
  {
    target_id: 'TARGET_137_C3_06',
    cohort: 'COHORT_3_TRANSIT_UTILITIES',
    name: 'Công ty Cấp Nước Đà Nẵng (Dawaco)',
    url: 'https://dawaco.com.vn/'
  },
  {
    target_id: 'TARGET_137_C3_07',
    cohort: 'COHORT_3_TRANSIT_UTILITIES',
    name: 'Công ty Điện Lực Đà Nẵng (PC Đà Nẵng)',
    url: 'https://pcdanang.cpc.vn/'
  },
  {
    target_id: 'TARGET_137_C3_08',
    cohort: 'COHORT_3_TRANSIT_UTILITIES',
    name: 'VNPT Đà Nẵng - Gói Cước Sinh Viên',
    url: 'https://vnpt.com.vn/khach-hang-ca-nhan/di-dong'
  },
  {
    target_id: 'TARGET_137_C3_09',
    cohort: 'COHORT_3_TRANSIT_UTILITIES',
    name: 'Viettel Telecom - Gói Cước Sinh Viên & Khuyến Mãi',
    url: 'https://vietteltelecom.vn/di-dong'
  },
  {
    target_id: 'TARGET_137_C3_10',
    cohort: 'COHORT_3_TRANSIT_UTILITIES',
    name: 'MobiFone - Khuyến Mãi & Gói Cước Sinh Viên',
    url: 'https://www.mobifone.vn/'
  },
  {
    target_id: 'TARGET_137_C3_11',
    cohort: 'COHORT_3_TRANSIT_UTILITIES',
    name: 'Trung Tâm Quản Lý Hạ Tầng Đô Thị Đà Nẵng',
    url: 'https://qlhtdt.danang.gov.vn/'
  },
  {
    target_id: 'TARGET_137_C3_12',
    cohort: 'COHORT_3_TRANSIT_UTILITIES',
    name: 'Bến Xe Trung Tâm Đà Nẵng',
    url: 'https://benxedanang.com.vn/'
  },
  {
    target_id: 'TARGET_137_C3_13',
    cohort: 'COHORT_3_TRANSIT_UTILITIES',
    name: 'Ga Đường Sắt Đà Nẵng - Tổng Công Ty ĐSVN',
    url: 'https://dsvn.vn/'
  },
  {
    target_id: 'TARGET_137_C3_14',
    cohort: 'COHORT_3_TRANSIT_UTILITIES',
    name: 'Cảng Hàng Không Quốc Tế Đà Nẵng',
    url: 'https://danangairportterminal.vn/'
  },
  {
    target_id: 'TARGET_137_C3_15',
    cohort: 'COHORT_3_TRANSIT_UTILITIES',
    name: 'Hội Sinh Viên TP Đà Nẵng',
    url: 'https://thanhdoandanang.org.vn/'
  },

  // =========================================================================
  // COHORT 4: ƯU ĐÃI SINH VIÊN SỐ & GIÁO DỤC CHÍNH THỨC (20 Targets)
  // =========================================================================
  {
    target_id: 'TARGET_137_C4_01',
    cohort: 'COHORT_4_DIGITAL_STUDENT_DEALS',
    name: 'GitHub Education - Student Developer Pack',
    url: 'https://education.github.com/pack'
  },
  {
    target_id: 'TARGET_137_C4_02',
    cohort: 'COHORT_4_DIGITAL_STUDENT_DEALS',
    name: 'Spotify Vietnam - Spotify Premium Sinh Viên',
    url: 'https://www.spotify.com/vn-vi/student/'
  },
  {
    target_id: 'TARGET_137_C4_03',
    cohort: 'COHORT_4_DIGITAL_STUDENT_DEALS',
    name: 'Notion - Notion for Education Free Plus Plan',
    url: 'https://www.notion.so/product/notion-for-education'
  },
  {
    target_id: 'TARGET_137_C4_04',
    cohort: 'COHORT_4_DIGITAL_STUDENT_DEALS',
    name: 'Apple Vietnam - Giá Ưu Đãi Cho Giáo Dục',
    url: 'https://www.apple.com/vn-edu/store'
  },
  {
    target_id: 'TARGET_137_C4_05',
    cohort: 'COHORT_4_DIGITAL_STUDENT_DEALS',
    name: 'JetBrains - Free Educational Licenses for Students',
    url: 'https://www.jetbrains.com/community/education/#students'
  },
  {
    target_id: 'TARGET_137_C4_06',
    cohort: 'COHORT_4_DIGITAL_STUDENT_DEALS',
    name: 'Canva - Canva for Education',
    url: 'https://www.canva.com/education/'
  },
  {
    target_id: 'TARGET_137_C4_07',
    cohort: 'COHORT_4_DIGITAL_STUDENT_DEALS',
    name: 'Figma - Figma for Education Free Professional',
    url: 'https://www.figma.com/education/'
  },
  {
    target_id: 'TARGET_137_C4_08',
    cohort: 'COHORT_4_DIGITAL_STUDENT_DEALS',
    name: 'Microsoft 365 - Microsoft Office 365 Free for Students',
    url: 'https://www.microsoft.com/vi-vn/education/products/office'
  },
  {
    target_id: 'TARGET_137_C4_09',
    cohort: 'COHORT_4_DIGITAL_STUDENT_DEALS',
    name: 'YouTube Vietnam - Gói YouTube Premium Học Sinh Sinh Viên',
    url: 'https://www.youtube.com/premium/student'
  },
  {
    target_id: 'TARGET_137_C4_10',
    cohort: 'COHORT_4_DIGITAL_STUDENT_DEALS',
    name: 'Adobe Vietnam - Creative Cloud Cho Sinh Viên',
    url: 'https://www.adobe.com/vn_vi/creativecloud/buy/students.html'
  },
  {
    target_id: 'TARGET_137_C4_11',
    cohort: 'COHORT_4_DIGITAL_STUDENT_DEALS',
    name: 'Autodesk - Free Student Software Access',
    url: 'https://www.autodesk.com/education/edu-software/overview'
  },
  {
    target_id: 'TARGET_137_C4_12',
    cohort: 'COHORT_4_DIGITAL_STUDENT_DEALS',
    name: 'Coursera - Coursera for Students',
    url: 'https://www.coursera.org/for-university-and-college-students'
  },
  {
    target_id: 'TARGET_137_C4_13',
    cohort: 'COHORT_4_DIGITAL_STUDENT_DEALS',
    name: 'AWS Educate - Free Cloud Training for Students',
    url: 'https://aws.amazon.com/education/awseducate/'
  },
  {
    target_id: 'TARGET_137_C4_14',
    cohort: 'COHORT_4_DIGITAL_STUDENT_DEALS',
    name: 'Google Cloud Skills Boost for Students',
    url: 'https://www.cloudskillsboost.google/'
  },
  {
    target_id: 'TARGET_137_C4_15',
    cohort: 'COHORT_4_DIGITAL_STUDENT_DEALS',
    name: 'Overleaf - LaTeX Collaborative Writing for Education',
    url: 'https://www.overleaf.com/edu'
  },
  {
    target_id: 'TARGET_137_C4_16',
    cohort: 'COHORT_4_DIGITAL_STUDENT_DEALS',
    name: 'Grammarly for Education',
    url: 'https://www.grammarly.com/edu'
  },
  {
    target_id: 'TARGET_137_C4_17',
    cohort: 'COHORT_4_DIGITAL_STUDENT_DEALS',
    name: 'Wolfram Alpha Pro for Students',
    url: 'https://www.wolframalpha.com/pro-for-students/'
  },
  {
    target_id: 'TARGET_137_C4_18',
    cohort: 'COHORT_4_DIGITAL_STUDENT_DEALS',
    name: 'Namecheap - Free .me Domain for GitHub Students',
    url: 'https://nc.me/'
  },
  {
    target_id: 'TARGET_137_C4_19',
    cohort: 'COHORT_4_DIGITAL_STUDENT_DEALS',
    name: 'DigitalOcean - Hatch & Student Credit',
    url: 'https://www.digitalocean.com/'
  },
  {
    target_id: 'TARGET_137_C4_20',
    cohort: 'COHORT_4_DIGITAL_STUDENT_DEALS',
    name: 'Tableau for Students Free License',
    url: 'https://www.tableau.com/academic/students'
  },

  // =========================================================================
  // COHORT 5: ĐỊA ĐIỂM HOT & CƠ SỞ ĐÀ NẴNG (20 Targets)
  // =========================================================================
  {
    target_id: 'TARGET_137_C5_01',
    cohort: 'COHORT_5_HOT_DANANG_VENUES',
    name: 'Trường Đại Học Bách Khoa - ĐH Đà Nẵng',
    url: 'http://dut.udn.vn/'
  },
  {
    target_id: 'TARGET_137_C5_02',
    cohort: 'COHORT_5_HOT_DANANG_VENUES',
    name: 'Trường Đại Học Sư Phạm - ĐH Đà Nẵng',
    url: 'https://ued.udn.vn/'
  },
  {
    target_id: 'TARGET_137_C5_03',
    cohort: 'COHORT_5_HOT_DANANG_VENUES',
    name: 'Trường Đại Học Kinh Tế - ĐH Đà Nẵng',
    url: 'https://due.udn.vn/'
  },
  {
    target_id: 'TARGET_137_C5_04',
    cohort: 'COHORT_5_HOT_DANANG_VENUES',
    name: 'Trường ĐH Công Nghệ Thông Tin & Truyền Thông Việt - Hàn (VKU)',
    url: 'https://vku.udn.vn/'
  },
  {
    target_id: 'TARGET_137_C5_05',
    cohort: 'COHORT_5_HOT_DANANG_VENUES',
    name: 'Trường Đại Học Duy Tân',
    url: 'https://duytan.edu.vn/'
  },
  {
    target_id: 'TARGET_137_C5_06',
    cohort: 'COHORT_5_HOT_DANANG_VENUES',
    name: 'Trường Đại Học Ngoại Ngữ - ĐH Đà Nẵng',
    url: 'https://ufl.udn.vn/'
  },
  {
    target_id: 'TARGET_137_C5_07',
    cohort: 'COHORT_5_HOT_DANANG_VENUES',
    name: 'Thư Viện Khoa Học Tổng Hợp Đà Nẵng',
    url: 'http://thuvien.danang.gov.vn/'
  },
  {
    target_id: 'TARGET_137_C5_08',
    cohort: 'COHORT_5_HOT_DANANG_VENUES',
    name: 'Helio Center Đà Nẵng - Trung Tâm Giải Trí',
    url: 'https://helio.vn/'
  },
  {
    target_id: 'TARGET_137_C5_09',
    cohort: 'COHORT_5_HOT_DANANG_VENUES',
    name: 'Bảo Tàng Điêu Khắc Chăm Đà Nẵng',
    url: 'http://chammuseum.vn/'
  },
  {
    target_id: 'TARGET_137_C5_10',
    cohort: 'COHORT_5_HOT_DANANG_VENUES',
    name: 'Bảo Tàng Đà Nẵng',
    url: 'https://baotangdanang.vn/'
  },
  {
    target_id: 'TARGET_137_C5_11',
    cohort: 'COHORT_5_HOT_DANANG_VENUES',
    name: 'Bảo Tàng Mỹ Thuật Đà Nẵng',
    url: 'https://baotangmythuatdanang.vn/'
  },
  {
    target_id: 'TARGET_137_C5_12',
    cohort: 'COHORT_5_HOT_DANANG_VENUES',
    name: 'Cổng Thông Tin Điện Tử Thành Phố Đà Nẵng',
    url: 'https://danang.gov.vn/'
  },
  {
    target_id: 'TARGET_137_C5_13',
    cohort: 'COHORT_5_HOT_DANANG_VENUES',
    name: 'Cung Thiếu Nhi Đà Nẵng',
    url: 'http://cungthieunhidanang.org.vn/'
  },
  {
    target_id: 'TARGET_137_C5_14',
    cohort: 'COHORT_5_HOT_DANANG_VENUES',
    name: 'Nhà Hát Tuồng Nguyễn Hiển Dĩnh Đà Nẵng',
    url: 'http://nhahattuongdanang.vn/'
  },
  {
    target_id: 'TARGET_137_C5_15',
    cohort: 'COHORT_5_HOT_DANANG_VENUES',
    name: 'Co.opmart Đà Nẵng - Siêu Thị Bình Ổn Giá',
    url: 'http://co-opmart.com.vn/'
  },
  {
    target_id: 'TARGET_137_C5_16',
    cohort: 'COHORT_5_HOT_DANANG_VENUES',
    name: 'GO! Đà Nẵng (Big C Cũ) - Trung Tâm Thương Mại',
    url: 'https://go-vietnam.vn/'
  },
  {
    target_id: 'TARGET_137_C5_17',
    cohort: 'COHORT_5_HOT_DANANG_VENUES',
    name: 'MM Mega Market Đà Nẵng',
    url: 'https://online.mmvietnam.com/'
  },
  {
    target_id: 'TARGET_137_C5_18',
    cohort: 'COHORT_5_HOT_DANANG_VENUES',
    name: 'Vincom Plaza Ngô Quyền Đà Nẵng',
    url: 'https://vincom.com.vn/vincom-plaza-ngo-quyen'
  },
  {
    target_id: 'TARGET_137_C5_19',
    cohort: 'COHORT_5_HOT_DANANG_VENUES',
    name: 'Trung Tâm Xúc Tiến Du Lịch Đà Nẵng (Danang Fantasticity)',
    url: 'https://danangfantasticity.com/'
  },
  {
    target_id: 'TARGET_137_C5_20',
    cohort: 'COHORT_5_HOT_DANANG_VENUES',
    name: 'Công Viên Suối Khoáng Nóng Núi Thần Tài Đà Nẵng',
    url: 'https://nuithantai.vn/'
  }
];

async function captureTarget(browser, target) {
  const targetDir = path.join(capturesDir, target.target_id);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36');

  let httpStatus = 0;
  let finalUrl = target.url;
  let captureStatus = 'OK';
  let errorMessage = null;

  try {
    const response = await page.goto(target.url, {
      waitUntil: 'networkidle2',
      timeout: 15000
    });

    if (response) {
      httpStatus = response.status();
      finalUrl = response.url();
    }
  } catch (err) {
    captureStatus = 'ERROR';
    errorMessage = err.message;
  }

  let htmlContent = '';
  let textContent = '';

  try {
    htmlContent = await page.content();
    textContent = await page.evaluate(() => {
      // Clean visible text from DOM
      const scripts = document.querySelectorAll('script, style, noscript, svg');
      scripts.forEach(s => s.remove());
      return document.body ? document.body.innerText : '';
    });
  } catch (e) {
    if (!errorMessage) errorMessage = e.message;
  }

  const htmlPath = path.join(targetDir, 'page.html');
  const txtPath = path.join(targetDir, 'page.txt');
  const shotPath = path.join(targetDir, 'screenshot.png');
  const metaPath = path.join(targetDir, 'metadata.json');

  fs.writeFileSync(htmlPath, htmlContent || '', 'utf8');
  fs.writeFileSync(txtPath, textContent || '', 'utf8');

  try {
    await page.screenshot({ path: shotPath, fullPage: false });
  } catch (e) {
    fs.writeFileSync(shotPath, Buffer.alloc(0));
  }

  await page.close();

  const metadata = {
    target_id: target.target_id,
    cohort: target.cohort,
    target_name: target.name,
    source_url: target.url,
    final_url: finalUrl,
    http_status: httpStatus,
    capture_status: captureStatus,
    captured_at: new Date().toISOString(),
    error_message: errorMessage,
    html_sha256: getSha256(fs.readFileSync(htmlPath)),
    text_sha256: getSha256(fs.readFileSync(txtPath)),
    screenshot_sha256: getSha256(fs.readFileSync(shotPath))
  };

  fs.writeFileSync(metaPath, JSON.stringify(metadata, null, 2), 'utf8');
  return metadata;
}

async function runBatchCapture137() {
  console.log('========================================================================');
  console.log('🌐 JAYT-137: RUNNING EXPANDED BATCH CAPTURE (105 TARGETS / 5 COHORTS)');
  console.log('========================================================================\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const results = [];
  const concurrency = 4;

  for (let i = 0; i < SEED_TARGETS_137.length; i += concurrency) {
    const chunk = SEED_TARGETS_137.slice(i, i + concurrency);
    const promises = chunk.map(target => {
      console.log(`⏳ Capturing [${target.cohort}] ${target.target_id}: ${target.name} (${target.url})`);
      return captureTarget(browser, target);
    });

    const chunkResults = await Promise.all(promises);
    results.push(...chunkResults);
  }

  await browser.close();

  const okCount = results.filter(r => r.capture_status === 'OK' && r.http_status < 400).length;
  const blockedCount = results.length - okCount;

  console.log('\n========================================================================');
  console.log('📊 BATCH CAPTURE 137 SUMMARY:');
  console.log(`- Total targets captured: ${results.length} / 105`);
  console.log(`- Successful captures (HTTP < 400): ${okCount}`);
  console.log(`- Blocked / Error / Network issues: ${blockedCount}`);
  console.log(`- Output directory: ${capturesDir}`);
  console.log('========================================================================\n');
}

runBatchCapture137().catch(err => {
  console.error('❌ Batch capture failed:', err);
  process.exit(1);
});
