const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const evidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_197_harvest');
if (!fs.existsSync(evidenceDir)) fs.mkdirSync(evidenceDir, { recursive: true });

function sha256(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }

const cohort100Targets = [
  // ==========================================
  // LANE 1: RẠP PHIM, VUI CHƠI & ĐIỂM ĐẾN ĐÀ NẴNG (25 NGUỒN)
  // ==========================================
  { id: 'L1_01', name: 'Metiz Cinema Đà Nẵng', category: 'ENTERTAINMENT', url: 'https://metiz.vn/tin-va-khuyen-mai.html', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_02', name: 'Metiz Cinema Trang Chủ', category: 'ENTERTAINMENT', url: 'https://metiz.vn/', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_03', name: 'Starlight Cinema Đà Nẵng', category: 'ENTERTAINMENT', url: 'https://starlight.vn/uu-dai.html', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_04', name: 'Starlight Cinema Thứ 3 Phim Việt', category: 'ENTERTAINMENT', url: 'https://starlight.vn/uu-dai/thu-3-phim-viet-1046.html', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_05', name: 'Galaxy Cinema Đà Nẵng', category: 'ENTERTAINMENT', url: 'https://www.galaxycine.vn/khuyen-mai/happy-day/', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_06', name: 'Galaxy Cinema Rạp Đà Nẵng', category: 'ENTERTAINMENT', url: 'https://www.galaxycine.vn/rap-gia-ve/galaxy-da-nang/', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_07', name: 'CGV Vincom Đà Nẵng', category: 'ENTERTAINMENT', url: 'https://www.cgv.vn/default/cinox/site/cgv-vincom-da-nang', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_08', name: 'CGV Vĩnh Trung Plaza Đà Nẵng', category: 'ENTERTAINMENT', url: 'https://www.cgv.vn/default/cinox/site/cgv-vinh-trung-plaza', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_09', name: 'Lotte Cinema Đà Nẵng', category: 'ENTERTAINMENT', url: 'https://www.lottecinemavn.com/', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_10', name: 'Da Nang Mikazuki Resorts & Spa', category: 'ENTERTAINMENT', url: 'https://mikazuki.com.vn/vn/', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_11', name: 'Mikazuki Water Park 365', category: 'ENTERTAINMENT', url: 'https://mikazuki.com.vn/vn/water-park-365.html', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_12', name: 'Helio Center Đà Nẵng', category: 'ENTERTAINMENT', url: 'https://helio.vn/', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_13', name: 'Sun World Ba Na Hills', category: 'ENTERTAINMENT', url: 'https://banahills.sunworld.vn/', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_14', name: 'Asia Park Công Viên Châu Á', category: 'ENTERTAINMENT', url: 'https://asiapark.sunworld.vn/', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_15', name: 'Bảo Tàng Điêu Khắc Chăm Đà Nẵng', category: 'ENTERTAINMENT', url: 'https://chammuseum.vn/', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_16', name: 'Bảo Tàng Mỹ Thuật Đà Nẵng', category: 'ENTERTAINMENT', url: 'https://dnfam.vn/', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_17', name: 'Bảo Tàng Đà Nẵng', category: 'ENTERTAINMENT', url: 'https://baotangdanang.vn/', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_18', name: 'Danh Thắng Ngũ Hành Sơn', category: 'ENTERTAINMENT', url: 'https://nguhanhson.org/', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_19', name: 'Công Viên Suối Khoáng Nóng Núi Thần Tài', category: 'ENTERTAINMENT', url: 'https://nuithantai.vn/', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_20', name: 'Khu Du Lịch Suối Mơ Đà Nẵng', category: 'ENTERTAINMENT', url: 'https://danangfantasticcity.com/', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_21', name: 'Cung Văn Hóa Thiếu Nhi Đà Nẵng', category: 'ENTERTAINMENT', url: 'https://cungthieunhidanang.vn/', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_22', name: 'Nhà Hát Trưng Vương Đà Nẵng', category: 'ENTERTAINMENT', url: 'https://nhahattrungvuong.vn/', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_23', name: 'Du Thuyền Sông Hàn Đà Nẵng', category: 'ENTERTAINMENT', url: 'https://danangfantasticcity.com/du-thuyen-song-han', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_24', name: 'Bãi Biển Mỹ Khê Đà Nẵng', category: 'ENTERTAINMENT', url: 'https://danang.gov.vn/', lane: 'LANE_1_ENTERTAINMENT' },
  { id: 'L1_25', name: 'Bán Đảo Sơn Trà Đà Nẵng', category: 'ENTERTAINMENT', url: 'https://bqlsontra.danang.gov.vn/', lane: 'LANE_1_ENTERTAINMENT' },

  // ==========================================
  // LANE 2: ĂN UỐNG & CHUỖI F&B CÓ CHI NHÁNH ĐÀ NẴNG (25 NGUỒN)
  // ==========================================
  { id: 'L2_01', name: 'Jollibee Vietnam Khuyến Mãi', category: 'FOOD_AND_DINING', url: 'https://jollibee.com.vn/khuyen-mai', lane: 'LANE_2_FOOD' },
  { id: 'L2_02', name: 'Jollibee Hệ Thống Cửa Hàng', category: 'FOOD_AND_DINING', url: 'https://jollibee.com.vn/cua-hang', lane: 'LANE_2_FOOD' },
  { id: 'L2_03', name: 'KFC Vietnam Ưu Đãi', category: 'FOOD_AND_DINING', url: 'https://www.kfcvietnam.com.vn/khuyen-mai', lane: 'LANE_2_FOOD' },
  { id: 'L2_04', name: 'KFC Vietnam Cửa Hàng', category: 'FOOD_AND_DINING', url: 'https://www.kfcvietnam.com.vn/he-thong-nha-hang-kfc', lane: 'LANE_2_FOOD' },
  { id: 'L2_05', name: 'Lotteria Vietnam Khuyến Mãi', category: 'FOOD_AND_DINING', url: 'https://www.lotteria.vn/promotion', lane: 'LANE_2_FOOD' },
  { id: 'L2_06', name: 'Lotteria Vietnam Cửa Hàng', category: 'FOOD_AND_DINING', url: 'https://www.lotteria.vn/stores', lane: 'LANE_2_FOOD' },
  { id: 'L2_07', name: 'Domino\'s Pizza Khuyến Mãi', category: 'FOOD_AND_DINING', url: 'https://dominos.vn/khuyen-mai/thu-5-mua-1-tang-1', lane: 'LANE_2_FOOD' },
  { id: 'L2_08', name: 'Domino\'s Pizza Danh Sách Cửa Hàng', category: 'FOOD_AND_DINING', url: 'https://dominos.vn/cua-hang', lane: 'LANE_2_FOOD' },
  { id: 'L2_09', name: 'The Pizza Company Khuyến Mãi', category: 'FOOD_AND_DINING', url: 'https://thepizzacompany.vn/tin-tuc-va-su-kien/pepsi-mua-1-tang-1', lane: 'LANE_2_FOOD' },
  { id: 'L2_10', name: 'The Pizza Company Hệ Thống Nhà Hàng', category: 'FOOD_AND_DINING', url: 'https://thepizzacompany.vn/Shop/List', lane: 'LANE_2_FOOD' },
  { id: 'L2_11', name: 'Pizza Hut Vietnam Khuyến Mãi', category: 'FOOD_AND_DINING', url: 'https://pizzahut.vn/khuyen-mai', lane: 'LANE_2_FOOD' },
  { id: 'L2_12', name: 'Popeyes Vietnam Khuyến Mãi', category: 'FOOD_AND_DINING', url: 'https://popeyes.vn/khuyen-mai.html', lane: 'LANE_2_FOOD' },
  { id: 'L2_13', name: 'Texas Chicken Vietnam', category: 'FOOD_AND_DINING', url: 'https://texaschicken.vn/', lane: 'LANE_2_FOOD' },
  { id: 'L2_14', name: 'Highlands Coffee Khuyến Mãi', category: 'FOOD_AND_DINING', url: 'https://www.highlandscoffee.com.vn/vn/tin-tuc.html', lane: 'LANE_2_FOOD' },
  { id: 'L2_15', name: 'Highlands Coffee Cửa Hàng Đà Nẵng', category: 'FOOD_AND_DINING', url: 'https://www.highlandscoffee.com.vn/vn/he-thong-cua-hang.html', lane: 'LANE_2_FOOD' },
  { id: 'L2_16', name: 'Phúc Long Coffee & Tea', category: 'FOOD_AND_DINING', url: 'https://phuclong.com.vn/khuyen-mai', lane: 'LANE_2_FOOD' },
  { id: 'L2_17', name: 'Phúc Long Hệ Thống Cửa Hàng', category: 'FOOD_AND_DINING', url: 'https://phuclong.com.vn/he-thong-cua-hang-phuc-long', lane: 'LANE_2_FOOD' },
  { id: 'L2_18', name: 'The Coffee House Khuyến Mãi', category: 'FOOD_AND_DINING', url: 'https://thecoffeehouse.com/', lane: 'LANE_2_FOOD' },
  { id: 'L2_19', name: 'Cộng Cà Phê Đà Nẵng', category: 'FOOD_AND_DINING', url: 'https://congcaphe.com/stores', lane: 'LANE_2_FOOD' },
  { id: 'L2_20', name: 'Gong Cha Vietnam', category: 'FOOD_AND_DINING', url: 'https://gongcha.com.vn/tin-tuc-khuyen-mai/', lane: 'LANE_2_FOOD' },
  { id: 'L2_21', name: 'TocoToco Tea Khuyến Mãi', category: 'FOOD_AND_DINING', url: 'https://tocotocotea.com/khuyen-mai/', lane: 'LANE_2_FOOD' },
  { id: 'L2_22', name: 'Kichi-Kichi Lẩu Băng Chuyền', category: 'FOOD_AND_DINING', url: 'https://kichi.com.vn/uu-dai', lane: 'LANE_2_FOOD' },
  { id: 'L2_23', name: 'Gogi House Quán Thịt Nướng Hàn Quốc', category: 'FOOD_AND_DINING', url: 'https://gogi.com.vn/uu-dai', lane: 'LANE_2_FOOD' },
  { id: 'L2_24', name: 'Golden Spoon Ưu Đãi Thành Viên', category: 'FOOD_AND_DINING', url: 'https://goldenspoon.com.vn/', lane: 'LANE_2_FOOD' },
  { id: 'L2_25', name: 'Pizza 4P\'s Đà Nẵng', category: 'FOOD_AND_DINING', url: 'https://pizza4ps.com/location/da-nang/', lane: 'LANE_2_FOOD' },

  // ==========================================
  // LANE 3: XE BUÝT, DU LỊCH & TIỆN ÍCH CÔNG CỘNG (20 NGUỒN)
  // ==========================================
  { id: 'L3_01', name: 'DanaBus Trang Chủ', category: 'PUBLIC_TRANSIT', url: 'https://danangbus.vn/', lane: 'LANE_3_TRANSIT' },
  { id: 'L3_02', name: 'DanaBus Tin Tức Tuyến', category: 'PUBLIC_TRANSIT', url: 'https://danangbus.vn/tin-tuc/tin-tuc-16.html', lane: 'LANE_3_TRANSIT' },
  { id: 'L3_03', name: 'Đường Sắt Việt Nam DSVN', category: 'PUBLIC_TRANSIT', url: 'https://dsvn.vn/#/', lane: 'LANE_3_TRANSIT' },
  { id: 'L3_04', name: 'Xe Đạp Công Cộng TNGo', category: 'PUBLIC_TRANSIT', url: 'https://tngo.vn/', lane: 'LANE_3_TRANSIT' },
  { id: 'L3_05', name: 'Cổng Thông Tin Thành Phố Đà Nẵng', category: 'PUBLIC_SERVICE', url: 'https://danang.gov.vn/', lane: 'LANE_3_TRANSIT' },
  { id: 'L3_06', name: 'Cổng Du Lịch Danang FantasticCity', category: 'TOURISM', url: 'https://danangfantasticcity.com/', lane: 'LANE_3_TRANSIT' },
  { id: 'L3_07', name: 'Thư Viện Khoa Học Tổng Hợp Đà Nẵng', category: 'PUBLIC_SERVICE', url: 'https://thuvien.danang.gov.vn/', lane: 'LANE_3_TRANSIT' },
  { id: 'L3_08', name: 'Cảng Hàng Không Quốc Tế Đà Nẵng', category: 'PUBLIC_TRANSIT', url: 'https://danangairport.vn/', lane: 'LANE_3_TRANSIT' },
  { id: 'L3_09', name: 'Bến Xe Trung Tâm Đà Nẵng', category: 'PUBLIC_TRANSIT', url: 'https://danang.gov.vn/', lane: 'LANE_3_TRANSIT' },
  { id: 'L3_10', name: 'Cổng Dịch Vụ Công TP. Đà Nẵng', category: 'PUBLIC_SERVICE', url: 'https://dichvucong.danang.gov.vn/', lane: 'LANE_3_TRANSIT' },
  { id: 'L3_11', name: 'Đại Học Đà Nẵng', category: 'EDUCATION', url: 'https://udn.vn/', lane: 'LANE_3_TRANSIT' },
  { id: 'L3_12', name: 'Trường Đại Học Bách Khoa ĐHĐN', category: 'EDUCATION', url: 'http://dut.udn.vn/', lane: 'LANE_3_TRANSIT' },
  { id: 'L3_13', name: 'Trường Đại Học Kinh Tế ĐHĐN', category: 'EDUCATION', url: 'https://due.udn.vn/', lane: 'LANE_3_TRANSIT' },
  { id: 'L3_14', name: 'Trường Đại Học Sư Phạm ĐHĐN', category: 'EDUCATION', url: 'https://ued.udn.vn/', lane: 'LANE_3_TRANSIT' },
  { id: 'L3_15', name: 'Trường Đại Học Ngoại Ngữ ĐHĐN', category: 'EDUCATION', url: 'https://ufl.udn.vn/', lane: 'LANE_3_TRANSIT' },
  { id: 'L3_16', name: 'Trường Đại Học Duy Tân', category: 'EDUCATION', url: 'https://duytan.edu.vn/', lane: 'LANE_3_TRANSIT' },
  { id: 'L3_17', name: 'Trường Đại Học Sư Phạm Kỹ Thuật ĐHĐN', category: 'EDUCATION', url: 'http://ute.udn.vn/', lane: 'LANE_3_TRANSIT' },
  { id: 'L3_18', name: 'Trường Đại Học FPT Đà Nẵng', category: 'EDUCATION', url: 'https://dnuni.fpt.edu.vn/', lane: 'LANE_3_TRANSIT' },
  { id: 'L3_19', name: 'Trung Tâm Phát Triển Phần Mềm ĐHĐN', category: 'EDUCATION', url: 'https://sdc.udn.vn/', lane: 'LANE_3_TRANSIT' },
  { id: 'L3_20', name: 'Trung Tâm Thể Thao Đà Nẵng', category: 'PUBLIC_SERVICE', url: 'https://danang.gov.vn/', lane: 'LANE_3_TRANSIT' },

  // ==========================================
  // LANE 4: PHẦN MỀM, HỌC TẬP & DỊCH VỤ SỐ CHO SINH VIÊN (20 NGUỒN)
  // ==========================================
  { id: 'L4_01', name: 'GitHub Student Developer Pack', category: 'SOFTWARE', url: 'https://education.github.com/pack', lane: 'LANE_4_STUDENT_SOFTWARE' },
  { id: 'L4_02', name: 'Notion for Education', category: 'SOFTWARE', url: 'https://www.notion.so/product/notion-for-education', lane: 'LANE_4_STUDENT_SOFTWARE' },
  { id: 'L4_03', name: 'Figma for Education', category: 'SOFTWARE', url: 'https://www.figma.com/education/', lane: 'LANE_4_STUDENT_SOFTWARE' },
  { id: 'L4_04', name: 'Canva for Education', category: 'SOFTWARE', url: 'https://www.canva.com/education/', lane: 'LANE_4_STUDENT_SOFTWARE' },
  { id: 'L4_05', name: 'Microsoft 365 Education', category: 'SOFTWARE', url: 'https://www.microsoft.com/vi-vn/education/products/office', lane: 'LANE_4_STUDENT_SOFTWARE' },
  { id: 'L4_06', name: 'Adobe Creative Cloud Student', category: 'SOFTWARE', url: 'https://www.adobe.com/creativecloud/buy/students.html', lane: 'LANE_4_STUDENT_SOFTWARE' },
  { id: 'L4_07', name: 'Spotify Premium Student', category: 'SOFTWARE', url: 'https://www.spotify.com/vn-vi/student/', lane: 'LANE_4_STUDENT_SOFTWARE' },
  { id: 'L4_08', name: 'JetBrains Free Educational License', category: 'SOFTWARE', url: 'https://www.jetbrains.com/community/education/#students', lane: 'LANE_4_STUDENT_SOFTWARE' },
  { id: 'L4_09', name: 'YouTube Premium Student', category: 'SOFTWARE', url: 'https://www.youtube.com/premium/student', lane: 'LANE_4_STUDENT_SOFTWARE' },
  { id: 'L4_10', name: 'Apple Music Student Vietnam', category: 'SOFTWARE', url: 'https://www.apple.com/vn/apple-music/', lane: 'LANE_4_STUDENT_SOFTWARE' },
  { id: 'L4_11', name: 'Autodesk Education Free Access', category: 'SOFTWARE', url: 'https://www.autodesk.com/education/edu-software/overview', lane: 'LANE_4_STUDENT_SOFTWARE' },
  { id: 'L4_12', name: 'AWS Educate', category: 'SOFTWARE', url: 'https://aws.amazon.com/education/awseducate/', lane: 'LANE_4_STUDENT_SOFTWARE' },
  { id: 'L4_13', name: 'Google Cloud for Students', category: 'SOFTWARE', url: 'https://cloud.google.com/edu/students', lane: 'LANE_4_STUDENT_SOFTWARE' },
  { id: 'L4_14', name: 'Coursera for Campus', category: 'SOFTWARE', url: 'https://www.coursera.org/for-university-and-college-students', lane: 'LANE_4_STUDENT_SOFTWARE' },
  { id: 'L4_15', name: 'Grammarly for Education', category: 'SOFTWARE', url: 'https://www.grammarly.com/edu', lane: 'LANE_4_STUDENT_SOFTWARE' },
  { id: 'L4_16', name: 'MATLAB Student License', category: 'SOFTWARE', url: 'https://www.mathworks.com/academia/student_version.html', lane: 'LANE_4_STUDENT_SOFTWARE' },
  { id: 'L4_17', name: 'Tableau for Students', category: 'SOFTWARE', url: 'https://www.tableau.com/academic/students', lane: 'LANE_4_STUDENT_SOFTWARE' },
  { id: 'L4_18', name: 'Apple Education Store Vietnam', category: 'SOFTWARE', url: 'https://www.apple.com/vn-edu/store', lane: 'LANE_4_STUDENT_SOFTWARE' },
  { id: 'L4_19', name: 'Samsung Student Store Vietnam', category: 'SOFTWARE', url: 'https://www.samsung.com/vn/offer/student-program/', lane: 'LANE_4_STUDENT_SOFTWARE' },
  { id: 'L4_20', name: 'UNiDAYS Vietnam Portal', category: 'SOFTWARE', url: 'https://www.myunidays.com/', lane: 'LANE_4_STUDENT_SOFTWARE' },

  // ==========================================
  // LANE 5: AFFILIATE / MARKETPLACE CHỜ KẾT NỐI (10 NGUỒN)
  // ==========================================
  { id: 'L5_01', name: 'Shopee Vietnam', category: 'MARKETPLACE', url: 'https://shopee.vn/', lane: 'LANE_5_AFFILIATE_PENDING' },
  { id: 'L5_02', name: 'Lazada Vietnam', category: 'MARKETPLACE', url: 'https://www.lazada.vn/', lane: 'LANE_5_AFFILIATE_PENDING' },
  { id: 'L5_03', name: 'Tiki Vietnam', category: 'MARKETPLACE', url: 'https://tiki.vn/', lane: 'LANE_5_AFFILIATE_PENDING' },
  { id: 'L5_04', name: 'Traveloka Vietnam', category: 'MARKETPLACE', url: 'https://www.traveloka.com/vi-vn/', lane: 'LANE_5_AFFILIATE_PENDING' },
  { id: 'L5_05', name: 'Klook Vietnam', category: 'MARKETPLACE', url: 'https://www.klook.com/vi/', lane: 'LANE_5_AFFILIATE_PENDING' },
  { id: 'L5_06', name: 'Agoda Vietnam', category: 'MARKETPLACE', url: 'https://www.agoda.com/vi-vn/', lane: 'LANE_5_AFFILIATE_PENDING' },
  { id: 'L5_07', name: 'Grab Vietnam', category: 'MARKETPLACE', url: 'https://www.grab.com/vn/', lane: 'LANE_5_AFFILIATE_PENDING' },
  { id: 'L5_08', name: 'Be Group Vietnam', category: 'MARKETPLACE', url: 'https://be.com.vn/', lane: 'LANE_5_AFFILIATE_PENDING' },
  { id: 'L5_09', name: 'ShopeeFood Vietnam', category: 'MARKETPLACE', url: 'https://shopeefood.vn/', lane: 'LANE_5_AFFILIATE_PENDING' },
  { id: 'L5_10', name: 'Accesstrade Vietnam', category: 'MARKETPLACE', url: 'https://accesstrade.vn/', lane: 'LANE_5_AFFILIATE_PENDING' }
];

async function runCohort100Harvest() {
  console.log('========================================================================');
  console.log('🌐 JAYT-197: MASSIVE 100-SOURCE COHORT HARVEST ENGINE');
  console.log('   Total Targets: ' + cohort100Targets.length + ' official sources across 5 Lanes');
  console.log('   Timestamp:     ' + new Date().toISOString());
  console.log('========================================================================\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const results = [];
  const CONCURRENCY = 4;

  for (let i = 0; i < cohort100Targets.length; i += CONCURRENCY) {
    const chunk = cohort100Targets.slice(i, i + CONCURRENCY);
    const chunkPromises = chunk.map(async (target) => {
      const targetResult = {
        id: target.id,
        name: target.name,
        category: target.category,
        lane: target.lane,
        requested_url: target.url,
        final_url: null,
        http_status: 0,
        status: 'INCONCLUSIVE',
        raw_file: null,
        sha256: null,
        text_sample: '',
        harvested_at: new Date().toISOString(),
        error: null
      };

      try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        await page.setViewport({ width: 1280, height: 800 });

        const res = await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
        targetResult.http_status = res ? res.status() : 200;
        targetResult.final_url = page.url();

        const htmlContent = await page.content();
        const rawFileName = `raw_cohort100_${target.id}.html`;
        const rawFilePath = path.join(evidenceDir, rawFileName);
        fs.writeFileSync(rawFilePath, htmlContent, 'utf8');

        targetResult.raw_file = rawFileName;
        targetResult.sha256 = sha256(Buffer.from(htmlContent, 'utf8'));

        const bodyText = await page.evaluate(() => document.body ? document.body.innerText : '');
        targetResult.text_sample = bodyText.replace(/\s+/g, ' ').trim().substring(0, 200);
        targetResult.status = 'CAPTURED';

        await page.close();
        console.log(`  ✅ [${target.id}] ${target.name} (${targetResult.http_status}) -> ${rawFileName} (${targetResult.sha256.substring(0, 16)}...)`);
      } catch (err) {
        targetResult.status = 'INCONCLUSIVE';
        targetResult.error = err.message;
        console.log(`  ⚠️ [${target.id}] ${target.name} -> INCONCLUSIVE: ${err.message}`);
      }

      return targetResult;
    });

    const chunkResults = await Promise.all(chunkPromises);
    results.push(...chunkResults);
  }

  await browser.close();

  // Summary by Lane
  const laneStats = {};
  cohort100Targets.forEach(t => {
    if (!laneStats[t.lane]) laneStats[t.lane] = { total: 0, captured: 0, inconclusive: 0 };
    laneStats[t.lane].total++;
  });
  results.forEach(r => {
    if (r.status === 'CAPTURED') laneStats[r.lane].captured++;
    else laneStats[r.lane].inconclusive++;
  });

  const totalCaptured = results.filter(r => r.status === 'CAPTURED').length;
  const totalInconclusive = results.filter(r => r.status === 'INCONCLUSIVE').length;

  const harvestReport = {
    harvest_id: 'COHORT100_' + Date.now(),
    timestamp: new Date().toISOString(),
    total_sources: cohort100Targets.length,
    total_captured: totalCaptured,
    total_inconclusive: totalInconclusive,
    lane_summary: laneStats,
    results: results
  };

  const reportPath = path.join(evidenceDir, 'COHORT_100_HARVEST_REPORT_197.json');
  fs.writeFileSync(reportPath, JSON.stringify(harvestReport, null, 2), 'utf8');

  console.log('\n========================================================================');
  console.log('📄 Saved Cohort 100 Harvest Report: ' + path.relative(repoRoot, reportPath));
  console.log(`🎉 Total Successfully Captured:     ${totalCaptured}/${cohort100Targets.length}`);
  console.log(`⚠️ Total Marked Inconclusive:       ${totalInconclusive}/${cohort100Targets.length}`);
  console.log('========================================================================');
}

if (require.main === module) {
  runCohort100Harvest().catch(err => {
    console.error('Fatal Harvest Error:', err);
    process.exit(1);
  });
}

module.exports = { runCohort100Harvest, cohort100Targets };
