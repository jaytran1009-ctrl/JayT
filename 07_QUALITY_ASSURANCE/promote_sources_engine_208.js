const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

const harvestDirs = [
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_198_leaf_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_200_autopilot_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_201_actionable_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_197_harvest')
];

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256Str(str) { return crypto.createHash('sha256').update(str, 'utf8').digest('hex'); }
function sha256File(p) { return fs.existsSync(p) ? sha256Buf(fs.readFileSync(p)) : null; }

function findArtifactPath(fileName) {
  for (const dir of harvestDirs) {
    const full = path.join(dir, fileName);
    if (fs.existsSync(full)) return full;
  }
  return null;
}

function normalize(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();
}

console.log('========================================================================');
console.log('🚀 JAYT-208: PROMOTE SOURCES ENGINE (REAL SAVINGS FROM VERIFIED LEAVES)');
console.log('   Timestamp: ' + new Date().toISOString());
console.log('========================================================================\n');

const PROMOTED_SAVINGS_DEFINITIONS = [
  // --- 🔵 NHÓM 1: RẠP PHIM & GIẢI TRÍ (ƯU ĐÃI CHÍNH THỨC) ---
  {
    claim_id: 'CLM_208_01_METIZ_MEMBER',
    brand: 'Metiz Cinema Đà Nẵng',
    category: 'CINEMA_AND_LEISURE',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    tier: 'TIER_BLUE_OFFICIAL',
    display_badge: '🔵 Ưu đãi chính thức · trích nguyên văn nguồn',
    source_url: 'https://metiz.vn/tin-va-khuyen-mai.html',
    evidence_file: 'raw_cohort100_L1_01.html',
    exact_verbatim_quote: 'QUÀ MỪNG LÊN HẠNG - ƯU ĐÃI THÀNH VIÊN METIZ 2026',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 7
  },
  {
    claim_id: 'CLM_208_02_METIZ_SUPER_MONDAY',
    brand: 'Metiz Cinema Đà Nẵng',
    category: 'CINEMA_AND_LEISURE',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    tier: 'TIER_BLUE_OFFICIAL',
    display_badge: '🔵 Ưu đãi chính thức · trích nguyên văn nguồn',
    source_url: 'https://metiz.vn/tin-va-khuyen-mai.html',
    evidence_file: 'raw_cohort100_L1_01.html',
    exact_verbatim_quote: 'SUPER MONDAY (THỨ HAI SIÊU HẠNG)',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 7
  },
  {
    claim_id: 'CLM_208_03_STARLIGHT_PROMO',
    brand: 'Starlight Cinema Đà Nẵng',
    category: 'CINEMA_AND_LEISURE',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    tier: 'TIER_BLUE_OFFICIAL',
    display_badge: '🔵 Ưu đãi chính thức · trích nguyên văn nguồn',
    source_url: 'https://starlight.vn/uu-dai.html',
    evidence_file: 'raw_cohort100_L1_03.html',
    exact_verbatim_quote: 'Các Ưu Đãi Khi Xem Phim Tại Rạp Phim Starlight',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 7
  },
  {
    claim_id: 'CLM_208_04_STARLIGHT_TUE',
    brand: 'Starlight Cinema Đà Nẵng',
    category: 'CINEMA_AND_LEISURE',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    tier: 'TIER_BLUE_OFFICIAL',
    display_badge: '🔵 Ưu đãi chính thức · trích nguyên văn nguồn',
    source_url: 'https://starlight.vn/tin-tuc/thu-3-phim-viet.html',
    evidence_file: 'raw_cohort100_L1_04.html',
    exact_verbatim_quote: 'THỨ 3 PHIM VIỆT',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 7
  },

  // --- 🔵 NHÓM 2: ĂN UỐNG & KÈO NHÓM (ƯU ĐÃI CHÍNH THỨC) ---
  {
    claim_id: 'CLM_208_05_DOMINOS_DISCOUNT',
    brand: 'Domino\'s Pizza',
    category: 'FOOD_AND_DINING',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    tier: 'TIER_BLUE_OFFICIAL',
    display_badge: '🔵 Ưu đãi chính thức · trích nguyên văn nguồn',
    source_url: 'https://dominos.vn/khuyen-mai',
    evidence_file: 'raw_actionable_HARVEST_201_DOMINOS_GIAM_70_PIZZA_2.html',
    exact_verbatim_quote: 'giảm 70% cho Pizza thứ 2 cùng size có giá bằng hoặc thấp hơn Pizza thứ nhất',
    captured_at: '2026-08-27T14:02:55.860Z',
    freshness_ttl_days: 7
  },
  {
    claim_id: 'CLM_208_06_DOMINOS_DAILY',
    brand: 'Domino\'s Pizza',
    category: 'FOOD_AND_DINING',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    tier: 'TIER_BLUE_OFFICIAL',
    display_badge: '🔵 Ưu đãi chính thức · trích nguyên văn nguồn',
    source_url: 'https://dominos.vn/khuyen-mai',
    evidence_file: 'raw_leaf_LEAF_200_DOMINOS_PROMO.html',
    exact_verbatim_quote: 'Khuyến Mãi Hấp Dẫn Mỗi Ngày | Domino’s Pizza',
    captured_at: '2026-08-27T13:42:00.000Z',
    freshness_ttl_days: 7
  },

  // --- 🔵 NHÓM 3: TIẾT KIỆM HỌC TẬP & BẢN QUYỀN SINH VIÊN (ƯU ĐÃI CHÍNH THỨC) ---
  {
    claim_id: 'CLM_208_07_MICROSOFT_FREE',
    brand: 'Microsoft Education',
    category: 'STUDY_AND_DIGITAL',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    tier: 'TIER_BLUE_OFFICIAL',
    display_badge: '🔵 Ưu đãi chính thức · trích nguyên văn nguồn',
    source_url: 'https://www.microsoft.com/vi-vn/education/products/office',
    evidence_file: 'raw_cohort100_L4_05.html',
    exact_verbatim_quote: 'Microsoft Office 365 miễn phí dành cho trường học | Microsoft Education',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 7
  },
  {
    claim_id: 'CLM_208_08_SPOTIFY_STUDENT',
    brand: 'Spotify Vietnam',
    category: 'STUDY_AND_DIGITAL',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    tier: 'TIER_BLUE_OFFICIAL',
    display_badge: '🔵 Ưu đãi chính thức · trích nguyên văn nguồn',
    source_url: 'https://www.spotify.com/vn-vi/student/',
    evidence_file: 'raw_cohort100_L4_07.html',
    exact_verbatim_quote: 'Premium dành cho Sinh viên - Spotify (VN)',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 7
  },
  {
    claim_id: 'CLM_208_09_FIGMA_FREE',
    brand: 'Figma for Education',
    category: 'STUDY_AND_DIGITAL',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    tier: 'TIER_BLUE_OFFICIAL',
    display_badge: '🔵 Ưu đãi chính thức · trích nguyên văn nguồn',
    source_url: 'https://www.figma.com/education/',
    evidence_file: 'raw_cohort100_L4_03.html',
    exact_verbatim_quote: 'Figma for Education | Free Tools for the Classroom',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 7
  },
  {
    claim_id: 'CLM_208_10_AUTODESK_FREE',
    brand: 'Autodesk Education',
    category: 'STUDY_AND_DIGITAL',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    tier: 'TIER_BLUE_OFFICIAL',
    display_badge: '🔵 Ưu đãi chính thức · trích nguyên văn nguồn',
    source_url: 'https://www.autodesk.com/education/edu-software/overview',
    evidence_file: 'raw_cohort100_L4_11.html',
    exact_verbatim_quote: 'Autodesk Student Access to Education Downloads',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 7
  },
  {
    claim_id: 'CLM_208_11_AWS_EDUCATE',
    brand: 'AWS Educate',
    category: 'STUDY_AND_DIGITAL',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    tier: 'TIER_BLUE_OFFICIAL',
    display_badge: '🔵 Ưu đãi chính thức · trích nguyên văn nguồn',
    source_url: 'https://aws.amazon.com/vi/education/awseducate/',
    evidence_file: 'raw_cohort100_L4_12.html',
    exact_verbatim_quote: 'AWS Educate - Kỹ năng đám mây dành cho giáo dục- AWS',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 7
  },
  {
    claim_id: 'CLM_208_12_TABLEAU_STUDENTS',
    brand: 'Tableau for Students',
    category: 'STUDY_AND_DIGITAL',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    tier: 'TIER_BLUE_OFFICIAL',
    display_badge: '🔵 Ưu đãi chính thức · trích nguyên văn nguồn',
    source_url: 'https://www.tableau.com/academic/students',
    evidence_file: 'raw_cohort100_L4_17.html',
    exact_verbatim_quote: 'Tableau for Students | Tableau',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 7
  },

  // --- 🟣 TIER PURPLE: NGUỒN CHÍNH THỨC ĐÃ GHI NHẬN (TRANG THƯƠNG HIỆU, ĐỊA ĐIỂM, CỔNG DỊCH VỤ) ---
  {
    claim_id: 'CLM_208_13_GALAXY_DANANG',
    brand: 'Galaxy Cinema Đà Nẵng',
    category: 'CINEMA_AND_LEISURE',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    tier: 'TIER_PURPLE_RECORDED',
    display_badge: '🟣 Nguồn chính thức đã ghi nhận',
    source_url: 'https://www.galaxycine.vn/rap-gia-ve/galaxy-da-nang/',
    evidence_file: 'raw_actionable_HARVEST_201_GALAXY_DANANG_BRANCH.html',
    exact_verbatim_quote: 'Lịch Chiếu Phim Rạp Galaxy Cinema Coop Đà Nẵng',
    captured_at: '2026-08-27T14:02:55.860Z',
    freshness_ttl_days: 30
  },
  {
    claim_id: 'CLM_208_14_GALAXY_SYSTEM',
    brand: 'Galaxy Cinema',
    category: 'CINEMA_AND_LEISURE',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    tier: 'TIER_PURPLE_RECORDED',
    display_badge: '🟣 Nguồn chính thức đã ghi nhận',
    source_url: 'https://www.galaxycine.vn/khuyen-mai/happy-day/',
    evidence_file: 'raw_actionable_HARVEST_201_GALAXY_HAPPY_DAY.html',
    exact_verbatim_quote: 'Hệ Thống Rạp Chiếu Phim Hiện Đại',
    captured_at: '2026-08-27T14:02:55.860Z',
    freshness_ttl_days: 30
  },
  {
    claim_id: 'CLM_208_15_DOOKKI',
    brand: 'Dookki Vietnam',
    category: 'FOOD_AND_DINING',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    tier: 'TIER_PURPLE_RECORDED',
    display_badge: '🟣 Nguồn chính thức đã ghi nhận',
    source_url: 'https://dookkivietnam.com/',
    evidence_file: 'raw_actionable_HARVEST_201_DOOKKI_VIETNAM.html',
    exact_verbatim_quote: 'Dookki Vi\u1ec7t Nam',
    captured_at: '2026-08-27T14:02:55.860Z',
    freshness_ttl_days: 30
  },
  {
    claim_id: 'CLM_208_16_KFC',
    brand: 'KFC Vietnam',
    category: 'FOOD_AND_DINING',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    tier: 'TIER_PURPLE_RECORDED',
    display_badge: '🟣 Nguồn chính thức đã ghi nhận',
    source_url: 'https://www.kfcvietnam.com.vn/khuyen-mai',
    evidence_file: 'raw_cohort100_L2_03.html',
    exact_verbatim_quote: 'Đặt Hàng Món Gà Rán KFC | KFC Việt Nam',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 30
  },
  {
    claim_id: 'CLM_208_17_HIGHLANDS',
    brand: 'Highlands Coffee',
    category: 'FOOD_AND_DINING',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    tier: 'TIER_PURPLE_RECORDED',
    display_badge: '🟣 Nguồn chính thức đã ghi nhận',
    source_url: 'https://www.highlandscoffee.com.vn/vn/tin-tuc.html',
    evidence_file: 'raw_cohort100_L2_14.html',
    exact_verbatim_quote: 'Tin tức | Highlands Coffee',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 30
  },
  {
    claim_id: 'CLM_208_18_KICHI',
    brand: 'Kichi-Kichi',
    category: 'FOOD_AND_DINING',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    tier: 'TIER_PURPLE_RECORDED',
    display_badge: '🟣 Nguồn chính thức đã ghi nhận',
    source_url: 'https://kichi.com.vn/uu-dai',
    evidence_file: 'raw_cohort100_L2_22.html',
    exact_verbatim_quote: 'Kichi-Kichi | Buffet Lẩu Băng Chuyền',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 30
  },
  {
    claim_id: 'CLM_208_19_GOGI',
    brand: 'Gogi House',
    category: 'FOOD_AND_DINING',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    tier: 'TIER_PURPLE_RECORDED',
    display_badge: '🟣 Nguồn chính thức đã ghi nhận',
    source_url: 'https://gogi.com.vn/uu-dai',
    evidence_file: 'raw_cohort100_L2_23.html',
    exact_verbatim_quote: 'Gogi House | Quán Thịt Nướng Hàn Quốc',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 30
  },
  {
    claim_id: 'CLM_208_20_MIKAZUKI',
    brand: 'Da Nang Mikazuki',
    category: 'CINEMA_AND_LEISURE',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    tier: 'TIER_PURPLE_RECORDED',
    display_badge: '🟣 Nguồn chính thức đã ghi nhận',
    source_url: 'https://mikazuki.com.vn/',
    evidence_file: 'raw_cohort100_L1_10.html',
    exact_verbatim_quote: 'Da Nang Mikazuki Japanese Resorts and Spa | Official Website',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 30
  },
  {
    claim_id: 'CLM_208_21_NOTION',
    brand: 'Notion for Education',
    category: 'STUDY_AND_DIGITAL',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    tier: 'TIER_PURPLE_RECORDED',
    display_badge: '🟣 Nguồn chính thức đã ghi nhận',
    source_url: 'https://www.notion.com/product/notion-for-education',
    evidence_file: 'raw_cohort100_L4_02.html',
    exact_verbatim_quote: 'Notion for Education',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 30
  },
  {
    claim_id: 'CLM_208_22_DANABUS',
    brand: 'DanaBus Đà Nẵng',
    category: 'PUBLIC_TRANSIT',
    hub_id: 'HUB_4_PUBLIC_TRANSIT',
    tier: 'TIER_PURPLE_RECORDED',
    display_badge: '🟣 Nguồn chính thức đã ghi nhận',
    source_url: 'https://danangbus.vn/',
    evidence_file: 'raw_cohort100_L3_01.html',
    exact_verbatim_quote: 'Danangbus.vn',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 30
  },
  {
    claim_id: 'CLM_208_23_TNGO',
    brand: 'TNGo Đà Nẵng',
    category: 'PUBLIC_TRANSIT',
    hub_id: 'HUB_4_PUBLIC_TRANSIT',
    tier: 'TIER_PURPLE_RECORDED',
    display_badge: '🟣 Nguồn chính thức đã ghi nhận',
    source_url: 'https://tngo.vn/',
    evidence_file: 'raw_cohort100_L3_04.html',
    exact_verbatim_quote: 'TNGo - Xe đạp công nghệ số',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 30
  },
  {
    claim_id: 'CLM_208_24_DANANG_LIBRARY',
    brand: 'Thư Viện Khoa Học Tổng Hợp Đà Nẵng',
    category: 'STUDY_AND_DIGITAL',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    tier: 'TIER_PURPLE_RECORDED',
    display_badge: '🟣 Nguồn chính thức đã ghi nhận',
    source_url: 'http://thuvien.danang.gov.vn/',
    evidence_file: 'raw_cohort100_L3_07.html',
    exact_verbatim_quote: 'THƯ VIỆN ĐÀ NẴNG',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 30
  },
  {
    claim_id: 'CLM_208_25_CHAM_MUSEUM',
    brand: 'Bảo Tàng Điêu Khắc Chăm Đà Nẵng',
    category: 'CINEMA_AND_LEISURE',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    tier: 'TIER_PURPLE_RECORDED',
    display_badge: '🟣 Nguồn chính thức đã ghi nhận',
    source_url: 'http://chammuseum.danang.vn/',
    evidence_file: 'raw_cohort100_L1_15.html',
    exact_verbatim_quote: 'Bảo tàng Điêu khắc Chăm Đà Nẵng',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 30
  },
  {
    claim_id: 'CLM_208_26_DANANG_MUSEUM',
    brand: 'Bảo Tàng Lịch Sử Đà Nẵng',
    category: 'CINEMA_AND_LEISURE',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    tier: 'TIER_PURPLE_RECORDED',
    display_badge: '🟣 Nguồn chính thức đã ghi nhận',
    source_url: 'http://baotangdanang.vn/',
    evidence_file: 'raw_cohort100_L1_17.html',
    exact_verbatim_quote: 'Bảo tàng Đà Nẵng',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 30
  },
  {
    claim_id: 'CLM_208_27_NGU_HANH_SON',
    brand: 'Danh Thắng Ngũ Hành Sơn',
    category: 'CINEMA_AND_LEISURE',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    tier: 'TIER_PURPLE_RECORDED',
    display_badge: '🟣 Nguồn chính thức đã ghi nhận',
    source_url: 'http://nguhanhson.org.vn/',
    evidence_file: 'raw_cohort100_L1_18.html',
    exact_verbatim_quote: 'Ban Quản Lý Di tích Danh thắng Ngũ Hành Sơn',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 30
  },
  {
    claim_id: 'CLM_208_28_CHILDREN_PALACE',
    brand: 'Cung Thiếu Nhi Đà Nẵng',
    category: 'CINEMA_AND_LEISURE',
    hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
    tier: 'TIER_PURPLE_RECORDED',
    display_badge: '🟣 Nguồn chính thức đã ghi nhận',
    source_url: 'https://cungthieunhidanang.vn/',
    evidence_file: 'raw_cohort100_L1_21.html',
    exact_verbatim_quote: 'Cung Thiếu Nhi Đà Nẵng',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 30
  },
  {
    claim_id: 'CLM_208_29_PUBLIC_SERVICES',
    brand: 'Cổng Dịch Vụ Công Đà Nẵng',
    category: 'STUDY_AND_DIGITAL',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    tier: 'TIER_PURPLE_RECORDED',
    display_badge: '🟣 Nguồn chính thức đã ghi nhận',
    source_url: 'https://dichvucong.danang.gov.vn/',
    evidence_file: 'raw_cohort100_L3_10.html',
    exact_verbatim_quote: 'Cổng Dịch vụ công',
    captured_at: '2026-08-27T10:54:05.524Z',
    freshness_ttl_days: 30
  }
];

function generatePromotedSavingsFeed208() {
  const verifiedCards = [];
  const claimLedgerEntries = [];

  for (let i = 0; i < PROMOTED_SAVINGS_DEFINITIONS.length; i++) {
    const def = PROMOTED_SAVINGS_DEFINITIONS[i];
    const diskPath = findArtifactPath(def.evidence_file);
    if (!diskPath) {
      console.warn(`  ⚠️ Artifact file not found: ${def.evidence_file} (Excluding)`);
      continue;
    }

    const rawContent = fs.readFileSync(diskPath, 'utf8');
    const diskSha256 = sha256File(diskPath);
    const cleanContent = rawContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

    const normRaw = normalize(rawContent);
    const normClean = normalize(cleanContent);
    const normQuote = normalize(def.exact_verbatim_quote);

    if (!normRaw.includes(normQuote) && !normClean.includes(normQuote)) {
      console.warn(`  ⚠️ Quote not found in artifact: "${def.exact_verbatim_quote}" in ${def.evidence_file} (Excluding)`);
      continue;
    }

    const card = {
      deal_id: def.claim_id,
      claim_id: def.claim_id,
      brand: def.brand,
      title: def.exact_verbatim_quote,
      category: def.category,
      hub_id: def.hub_id,
      tier: def.tier,
      display_badge: def.display_badge,
      offer_quote: def.exact_verbatim_quote,
      source_url: def.source_url,
      evidence_file: def.evidence_file,
      evidence_sha256: diskSha256,
      captured_at: def.captured_at,
      freshness_ttl_days: def.freshness_ttl_days
    };

    verifiedCards.push(card);

    claimLedgerEntries.push({
      claim_id: def.claim_id,
      brand: def.brand,
      quote: def.exact_verbatim_quote,
      tier: def.tier,
      category: def.category,
      source_url: def.source_url,
      evidence_file: def.evidence_file,
      evidence_sha256: diskSha256,
      captured_at: def.captured_at,
      status: 'VERIFIED_CLAIM_SAFE'
    });

    console.log(`  ✅ [PROMOTED ${verifiedCards.length}]: ${def.brand} (${def.tier}) -> "${def.exact_verbatim_quote}" (SHA: ${diskSha256.substring(0, 12)}...)`);
  }

  const blueDeals = verifiedCards.filter(r => r.tier === 'TIER_BLUE_OFFICIAL');
  const purpleSources = verifiedCards.filter(r => r.tier === 'TIER_PURPLE_RECORDED');
  const greenDeals = [];

  const headlineString = `Hôm nay: 0 🟢 · ${blueDeals.length} 🔵 ưu đãi chính thức · ${purpleSources.length} 🟣 nguồn chính thức đã ghi nhận`;

  console.log(`\n  🎯 Total Promoted Cards: ${verifiedCards.length} (${blueDeals.length} 🔵 Ưu đãi + ${purpleSources.length} 🟣 Nguồn ghi nhận)`);

  const feed208 = {
    feed_metadata: {
      feed_version: '3.15.0',
      feed_code: 'JAYT_PROMOTED_SAVINGS_FEED_208',
      generated_at: new Date().toISOString(),
      governance_mandate: 'CHỈ THỊ CEO — JAYT-208: PROMOTE SOURCES INTO REAL SAVINGS',
      city: 'Đà Nẵng'
    },
    strategic_kpi_summary: {
      total_cards: verifiedCards.length,
      green_confirmed_count: 0,
      blue_official_count: blueDeals.length,
      purple_venue_count: purpleSources.length,
      headline_kpi_string: headlineString,
      policy_compliance: '100%_CLAIM_SAFE_SOURCE_PROMOTED'
    },
    source_bound_cards: verifiedCards,
    blue_official_offers: blueDeals,
    purple_verified_venues: purpleSources,
    green_confirmed_deals: [],
    orange_flash_deals: [],
    white_community_radar: []
  };

  const feed208Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generated_promoted_savings_feed_208.json');
  fs.writeFileSync(feed208Path, JSON.stringify(feed208, null, 2), 'utf8');

  const feedSha208 = sha256Str(JSON.stringify(feed208, null, 2));
  console.log('✅ Saved Promoted Savings Feed 208: ' + feed208Path);
  console.log('   Feed SHA-256: ' + feedSha208);
  console.log('   Headline:     ' + headlineString);

  // Save Claim Ledger 208
  const ledgerEntriesPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'CLAIM_LEDGER_208.json');
  fs.writeFileSync(ledgerEntriesPath, JSON.stringify({
    ledger_version: '2.0.0',
    generated_at: new Date().toISOString(),
    total_claims: claimLedgerEntries.length,
    blue_claims: blueDeals.length,
    purple_claims: purpleSources.length,
    claims: claimLedgerEntries
  }, null, 2), 'utf8');
  console.log('✅ Saved Claim Ledger 208: ' + ledgerEntriesPath);

  // Update Supply Truth Ledger
  const ledgerPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'SUPPLY_TRUTH_LEDGER.json');
  let ledger = {};
  if (fs.existsSync(ledgerPath)) ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));

  ledger.ledger_version = '3.15.0';
  ledger.last_updated = new Date().toISOString();
  ledger.last_work_order = 'JAYT-208';
  ledger.latest_feed_file = '05_DEAL_AND_AFFILIATE/generated_promoted_savings_feed_208.json';
  ledger.latest_feed_sha256 = feedSha208;
  ledger.current_counts = {
    total_cards: verifiedCards.length,
    green_confirmed_deals: 0,
    blue_official_offers: blueDeals.length,
    purple_recorded_sources: purpleSources.length,
    headline_string: headlineString
  };

  fs.writeFileSync(ledgerPath, JSON.stringify(ledger, null, 2), 'utf8');
  console.log('✅ Updated Supply Truth Ledger: ' + ledgerPath);

  return feed208;
}

if (require.main === module) {
  generatePromotedSavingsFeed208();
}

module.exports = { generatePromotedSavingsFeed208, PROMOTED_SAVINGS_DEFINITIONS };
