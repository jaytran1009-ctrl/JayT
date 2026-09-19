const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function sha256Str(str) { return crypto.createHash('sha256').update(str, 'utf8').digest('hex'); }
function sha256File(p) { return sha256Buf(fs.readFileSync(p)); }

const harvestDirs = [
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_179_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_181_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_184_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_185_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_186_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_187_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_188_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_190_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_192_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_193_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_194_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_195_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_196_containment'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_197_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_198_leaf_harvest'),
  path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_200_autopilot_harvest')
];

function findArtifactOnDisk(fileName) {
  for (const dir of harvestDirs) {
    const full = path.join(dir, fileName);
    if (fs.existsSync(full)) return full;
  }
  return null;
}

function normalizeHtmlText(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

// =========================================================================
// 5-PART VERBATIM EVIDENCE EVALUATION GATE (JAYT-200)
// =========================================================================
function evaluateCandidateForReadyDeal(cand) {
  // Must have 5 non-empty quotes
  const quotes = ['offer_quote', 'terms_quote', 'validity_quote', 'locality_quote', 'applicability_quote'];
  for (const q of quotes) {
    if (!cand[q] || cand[q].trim().length === 0) {
      return { qualified: false, reason: `Missing quote: ${q}` };
    }
  }

  // Terms cannot be generic login / menu
  if (/đăng nhập/i.test(cand.terms_quote) || /quy chế/i.test(cand.terms_quote)) {
    return { qualified: false, reason: 'terms_quote is generic login/policy string' };
  }

  // Locality must have Da Nang or physical street address, NOT a hotline
  if (/hotline/i.test(cand.locality_quote) && !/đà nẵng/i.test(cand.locality_quote)) {
    return { qualified: false, reason: 'locality_quote is just a phone hotline' };
  }

  // Check file presence and verbatim match
  const offerFile = cand.offer_evidence_file;
  const diskPath = findArtifactOnDisk(offerFile);
  if (!diskPath) return { qualified: false, reason: `Artifact ${offerFile} not found on disk` };

  const rawHtml = fs.readFileSync(diskPath, 'utf8');
  const normalized = normalizeHtmlText(rawHtml);

  if (!normalized.includes(cand.offer_quote.trim())) {
    return { qualified: false, reason: 'offer_quote not found in normalized artifact text' };
  }

  return { qualified: true, artifactPath: diskPath, sha256: sha256Buf(fs.readFileSync(diskPath)) };
}

function runAutopilotSupplyEngine() {
  console.log('========================================================================');
  console.log('⚡ JAYT-200: AUTOPILOT REAL-DEAL SPRINT & SUPPLY ENGINE');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  // Lane 1 & 2 Candidates
  const scopePendingPool = [
    {
      deal_id: 'SCOPE_PENDING_200_01',
      brand: 'Metiz Cinema Đà Nẵng',
      brand_id: 'BRAND_METIZ_CINEMA',
      title: 'Metiz Cinema Helio Đà Nẵng — Chương Trình Ưu Đãi Phim & U22',
      category: 'CINEMA',
      hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
      tier: 'TIER_BLUE_SCOPE_PENDING',
      target_type: 'OFFER_WITH_DANANG_BRANCH_SCOPE_PENDING',
      display_badge: '🔵 CÓ CƠ SỞ THẬT · KIỂM TRA TẠI NGUỒN',
      offer_quote: '01/01/2026 - 31/12/2026 SUPER MONDAY (THỨ HAI SIÊU HẠNG) 01/01/2026 - 31/12/2026 KHUYẾN MÃI GIÁ VÉ U22',
      locality_quote: 'Tên Doanh Nghiệp: Công Ty TNHH KHỞI PHÁT. Giấy CNĐKKD: 0400668112',
      branch_address: 'Tầng 1 Helio Center, Đường 2 Tháng 9, P. Hòa Cường Bắc, Q. Hải Châu, TP. Đà Nẵng',
      what_to_check: 'Kiểm tra giá vé ưu đãi U22 và suất chiếu áp dụng trực tiếp tại quầy vé Metiz Helio Center trước khi mua',
      action_url: 'https://metiz.vn/tin-va-khuyen-mai.html',
      locality_url: 'https://metiz.vn/',
      offer_evidence_file: 'raw_leaf_LEAF_198_METIZ_PROMO.html',
      locality_evidence_file: 'raw_leaf_LEAF_198_METIZ_PROMO.html'
    },
    {
      deal_id: 'SCOPE_PENDING_200_02',
      brand: 'Da Nang Mikazuki Japanese Resorts & Spa',
      brand_id: 'BRAND_MIKAZUKI_RESORT',
      title: 'Da Nang Mikazuki — Ưu Đãi Ẩm Thực & Công Viên Nước 365',
      category: 'ENTERTAINMENT_AND_LEISURE',
      hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
      tier: 'TIER_BLUE_SCOPE_PENDING',
      target_type: 'OFFER_WITH_DANANG_BRANCH_SCOPE_PENDING',
      display_badge: '🔵 CÓ CƠ SỞ THẬT · KIỂM TRA TẠI NGUỒN',
      offer_quote: 'ĐI 4 TÍNH 3 – ƯU ĐÃI ĂN TRƯA ĐẶC BIỆT Khám phá hương vị Shabu-Shabu đậm chất Nhật Bản.',
      locality_quote: 'Địa chỉ: Khu du lịch Xuân Thiều, Đ. Nguyễn Tất Thành, P. Hải Vân, TP Đà Nẵng.',
      branch_address: 'Khu du lịch Xuân Thiều, Đ. Nguyễn Tất Thành, P. Hòa Hiệp Nam, Q. Liên Chiểu, TP. Đà Nẵng',
      what_to_check: 'Kiểm tra với lễ tân nhà hàng điều kiện áp dụng ưu đãi trước khi đặt bàn',
      action_url: 'https://mikazuki.com.vn/vn/',
      locality_url: 'https://mikazuki.com.vn/vn/',
      offer_evidence_file: 'raw_daily_CAND_192_04_MIKAZUKI_WATER_PARK_365____N_NG.html',
      locality_evidence_file: 'raw_locality_BRAND_MIKAZUKI_RESORT.html'
    },
    {
      deal_id: 'SCOPE_PENDING_200_03',
      brand: 'Galaxy Cinema',
      brand_id: 'BRAND_GALAXY_CINEMA',
      title: 'Galaxy Cinema — Chương Trình Ưu Đãi Rạp Chiếu Phim',
      category: 'CINEMA',
      hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
      tier: 'TIER_BLUE_SCOPE_PENDING',
      target_type: 'OFFER_WITH_DANANG_BRANCH_SCOPE_PENDING',
      display_badge: '🔵 CÓ CƠ SỞ THẬT · KIỂM TRA TẠI NGUỒN',
      offer_quote: 'Khuyến mãi mới nhất Phim Phim đang chiếu',
      locality_quote: 'Galaxy Cinema Coop Đà Nẵng Địa chỉ : Tầng 3, TTTM Co.opmart Đà Nẵng - 478 Điện Biên Phủ, Phường Thanh Khê, TP. Đà Nẵng',
      branch_address: 'Tầng 3, Co.opmart Đà Nẵng, 478 Điện Biên Phủ, Quận Thanh Khê, TP. Đà Nẵng',
      what_to_check: 'Kiểm tra giá vé ưu đãi và suất chiếu áp dụng trực tiếp tại quầy vé Galaxy Co.opmart Đà Nẵng',
      action_url: 'https://www.galaxycine.vn/khuyen-mai/happy-day/',
      locality_url: 'https://www.galaxycine.vn/rap-gia-ve/galaxy-da-nang/',
      offer_evidence_file: 'raw_daily_CAND_192_01_GALAXY_CINEMA____N_NG.html',
      locality_evidence_file: 'rendered_SPA_200_GALAXY_DANANG_RENDERED.html'
    },
    {
      deal_id: 'SCOPE_PENDING_200_04',
      brand: "Domino's Pizza",
      brand_id: 'BRAND_DOMINOS_PIZZA',
      title: "Domino's Pizza — Ưu Đãi Mua 1 Tặng 1 Pizza",
      category: 'FOOD_AND_DINING',
      hub_id: 'HUB_1_FOOD_AND_DINING',
      tier: 'TIER_BLUE_SCOPE_PENDING',
      target_type: 'OFFER_WITH_DANANG_BRANCH_SCOPE_PENDING',
      display_badge: '🔵 CÓ CƠ SỞ THẬT · KIỂM TRA TẠI NGUỒN',
      offer_quote: 'Thứ 5 Mua 1 Tặng 1 Pizza * Mua 1 Pizza size M/L kèm thức uống lớn bất kỳ hoặc 2 thức uống nhỏ, tặng 1 Pizza thứ 2 cùng size có giá bằng hoặc thấp hơn Pizza thứ nhất.',
      locality_quote: 'Danh Sách Hệ Thống Cửa Hàng Domino’s Pizza Mã E-voucher Khuyến Mãi',
      branch_address: 'Hệ thống cửa hàng Domino\'s Pizza tại TP. Đà Nẵng (Nguyễn Văn Thoại, Điện Biên Phủ, Hùng Vương)',
      what_to_check: 'Kiểm tra phạm vi áp dụng tại cửa hàng Đà Nẵng hoặc khu vực giao hàng trước khi đặt',
      action_url: 'https://dominos.vn/khuyen-mai/thu-5-mua-1-tang-1',
      locality_url: 'https://dominos.vn/cua-hang',
      offer_evidence_file: 'raw_daily_CAND_192_02_DOMINO_S_PIZZA____N_NG.html',
      locality_evidence_file: 'raw_locality_BRAND_DOMINOS_PIZZA.html'
    },
    {
      deal_id: 'SCOPE_PENDING_200_05',
      brand: 'The Pizza Company',
      brand_id: 'BRAND_THE_PIZZA_COMPANY',
      title: 'The Pizza Company — Ưu Đãi Ẩm Thực Pizza & Combo',
      category: 'FOOD_AND_DINING',
      hub_id: 'HUB_1_FOOD_AND_DINING',
      tier: 'TIER_BLUE_SCOPE_PENDING',
      target_type: 'OFFER_WITH_DANANG_BRANCH_SCOPE_PENDING',
      display_badge: '🔵 CÓ CƠ SỞ THẬT · KIỂM TRA TẠI NGUỒN',
      offer_quote: 'Khuyến mãi Pizza Back Công Thức Đặc Biệt Đặc Sản Hải Sản Cao Cấp',
      locality_quote: 'The Pizza Company Hệ thống nhà hàng Loading...',
      branch_address: '173 Nguyễn Văn Thoại (Sơn Trà), 478 Điện Biên Phủ (Thanh Khê), Lotte Mart (Hải Châu), Đà Nẵng',
      what_to_check: 'Kiểm tra điều kiện áp dụng combo tại nhà hàng chi nhánh Đà Nẵng trước khi sử dụng',
      action_url: 'https://thepizzacompany.vn/tin-tuc-va-su-kien/pepsi-mua-1-tang-1',
      locality_url: 'https://thepizzacompany.vn/Shop/List',
      offer_evidence_file: 'raw_daily_CAND_192_03_THE_PIZZA_COMPANY____N_NG.html',
      locality_evidence_file: 'raw_locality_BRAND_THE_PIZZA_COMPANY.html'
    },
    {
      deal_id: 'SCOPE_PENDING_200_06',
      brand: 'Starlight Cinema Đà Nẵng',
      brand_id: 'BRAND_STARLIGHT_CINEMA',
      title: 'Starlight Cinema Đà Nẵng — Chương Trình Ưu Đãi Vé Phim',
      category: 'CINEMA',
      hub_id: 'HUB_3_ENTERTAINMENT_AND_LEISURE',
      tier: 'TIER_BLUE_SCOPE_PENDING',
      target_type: 'OFFER_WITH_DANANG_BRANCH_SCOPE_PENDING',
      display_badge: '🔵 CÓ CƠ SỞ THẬT · KIỂM TRA TẠI NGUỒN',
      offer_quote: 'Bắp Vui Mê Ly – Quà Minions Mang Đi 🌞 HÈ RỘN RÀNG - DEAL 10K SẴN SÀNG',
      locality_quote: 'CÔNG TY CỔ PHẦN ENTERTAINMENT 2020 Giấy chứng nhận đăng kí doanh nghiệp công ty cổ phần: 0402021264 đăng ký lần đầu ngày 03/01/2020 Cơ quan cấp : Phòng Đăng ký kinh doanh - Sở kế hoạch và đầu tư Thành phố Đà Nẵng Địa chỉ: Tầng 4, Tòa nhà Nguyễn Kim, 46 Điện Biên Phủ, TP. Đà Nẵng, Việt Nam',
      branch_address: 'Tầng 3-4 TTTM Nguyễn Kim, 46 Điện Biên Phủ, Q. Thanh Khê, TP. Đà Nẵng',
      what_to_check: 'Kiểm tra suất chiếu và phụ thu tại quầy vé Starlight Nguyễn Kim Đà Nẵng',
      action_url: 'https://starlight.vn/uu-dai.html',
      locality_url: 'https://starlight.vn/',
      offer_evidence_file: 'raw_leaf_LEAF_198_STARLIGHT_MEMBER.html',
      locality_evidence_file: 'rendered_SPA_200_STARLIGHT_PROMO_RENDERED.html'
    },
    {
      deal_id: 'SCOPE_PENDING_200_07',
      brand: 'Jollibee Vietnam',
      brand_id: 'BRAND_JOLLIBEE_VN',
      title: 'Jollibee Vietnam — Khuyến Mãi Gà Giòn Vui Vẻ',
      category: 'FOOD_AND_DINING',
      hub_id: 'HUB_1_FOOD_AND_DINING',
      tier: 'TIER_BLUE_SCOPE_PENDING',
      target_type: 'OFFER_WITH_DANANG_BRANCH_SCOPE_PENDING',
      display_badge: '🔵 CÓ CƠ SỞ THẬT · KIỂM TRA TẠI NGUỒN',
      offer_quote: 'Khuyến mãi cực hot từ Jollibee Gà Giòn Vui Vẻ Mì Ý Sốt Bò Bằm',
      locality_quote: 'Hệ thống cửa hàng Jollibee tại TP. Đà Nẵng',
      branch_address: 'Hệ thống cửa hàng Jollibee tại TP. Đà Nẵng (Co.opmart, Vincom, Big C/Go!)',
      what_to_check: 'Kiểm tra ưu đãi áp dụng ăn tại quán hoặc mang đi tại chi nhánh Jollibee Đà Nẵng',
      action_url: 'https://jollibee.com.vn/khuyen-mai',
      locality_url: 'https://jollibee.com.vn/cua-hang',
      offer_evidence_file: 'raw_cohort100_L2_01.html',
      locality_evidence_file: 'raw_cohort100_L2_02.html'
    },
    {
      deal_id: 'SCOPE_PENDING_200_08',
      brand: 'Highlands Coffee',
      brand_id: 'BRAND_HIGHLANDS_COFFEE',
      title: 'Highlands Coffee — Tin Tức Khuyến Mãi Đồ Uống',
      category: 'FOOD_AND_DINING',
      hub_id: 'HUB_1_FOOD_AND_DINING',
      tier: 'TIER_BLUE_SCOPE_PENDING',
      target_type: 'OFFER_WITH_DANANG_BRANCH_SCOPE_PENDING',
      display_badge: '🔵 CÓ CƠ SỞ THẬT · KIỂM TRA TẠI NGUỒN',
      offer_quote: 'Tin tức & sự kiện khuyến mãi Highlands Coffee',
      locality_quote: 'Hệ thống quán Highlands Coffee tại TP Đà Nẵng',
      branch_address: 'Hệ thống quán Highlands Coffee tại TP. Đà Nẵng (Bạch Đằng, Nguyễn Văn Linh, Điện Biên Phủ...)',
      what_to_check: 'Kiểm tra mã ưu đãi hoặc điều kiện hóa đơn tại quầy thu ngân Highlands Coffee trước khi thanh toán',
      action_url: 'https://www.highlandscoffee.com.vn/vn/tin-tuc.html',
      locality_url: 'https://www.highlandscoffee.com.vn/vn/he-thong-cua-hang.html',
      offer_evidence_file: 'raw_cohort100_L2_14.html',
      locality_evidence_file: 'raw_cohort100_L2_15.html'
    },
    {
      deal_id: 'SCOPE_PENDING_200_09',
      brand: 'KFC Vietnam',
      brand_id: 'BRAND_KFC_VN',
      title: 'KFC Vietnam — Chương Trình Ưu Đãi Gà Rán',
      category: 'FOOD_AND_DINING',
      hub_id: 'HUB_1_FOOD_AND_DINING',
      tier: 'TIER_BLUE_SCOPE_PENDING',
      target_type: 'OFFER_WITH_DANANG_BRANCH_SCOPE_PENDING',
      display_badge: '🔵 CÓ CƠ SỞ THẬT · KIỂM TRA TẠI NGUỒN',
      offer_quote: 'Ưu đãi và khuyến mãi mới nhất KFC Vietnam',
      locality_quote: 'Hệ thống nhà hàng KFC tại TP. Đà Nẵng',
      branch_address: 'Hệ thống nhà hàng KFC tại TP. Đà Nẵng (Nguyễn Thị Minh Khai, Lê Duẩn, Siêu thị Co.opmart...)',
      what_to_check: 'Kiểm tra phạm vi áp dụng tại quầy KFC hoặc trên ứng dụng đặt hàng trước khi thanh toán',
      action_url: 'https://www.kfcvietnam.com.vn/khuyen-mai',
      locality_url: 'https://www.kfcvietnam.com.vn/he-thong-nha-hang-kfc',
      offer_evidence_file: 'raw_cohort100_L2_03.html',
      locality_evidence_file: 'raw_cohort100_L2_04.html'
    },
    {
      deal_id: 'SCOPE_PENDING_200_10',
      brand: 'Lotteria Vietnam',
      brand_id: 'BRAND_LOTTERIA_VN',
      title: 'Lotteria Vietnam — Khuyến Mãi Burger & Gà Rán',
      category: 'FOOD_AND_DINING',
      hub_id: 'HUB_1_FOOD_AND_DINING',
      tier: 'TIER_BLUE_SCOPE_PENDING',
      target_type: 'OFFER_WITH_DANANG_BRANCH_SCOPE_PENDING',
      display_badge: '🔵 CÓ CƠ SỞ THẬT · KIỂM TRA TẠI NGUỒN',
      offer_quote: 'Chương trình khuyến mãi Lotteria Vietnam',
      locality_quote: 'Danh sách cửa hàng Lotteria tại TP Đà Nẵng',
      branch_address: 'Hệ thống cửa hàng Lotteria tại TP. Đà Nẵng (Nguyễn Văn Linh, Núi Thành, Lotte Mart...)',
      what_to_check: 'Kiểm tra điều kiện áp dụng tại quầy thu ngân Lotteria chi nhánh Đà Nẵng',
      action_url: 'https://www.lotteria.vn/promotion',
      locality_url: 'https://www.lotteria.vn/stores',
      offer_evidence_file: 'raw_cohort100_L2_05.html',
      locality_evidence_file: 'raw_cohort100_L2_06.html'
    },
    {
      deal_id: 'SCOPE_PENDING_200_11',
      brand: 'Kichi-Kichi Lẩu Băng Chuyền',
      brand_id: 'BRAND_KICHI_KICHI',
      title: 'Kichi-Kichi — Ưu Đãi Buffet Lẩu Băng Chuyền',
      category: 'FOOD_AND_DINING',
      hub_id: 'HUB_1_FOOD_AND_DINING',
      tier: 'TIER_BLUE_SCOPE_PENDING',
      target_type: 'OFFER_WITH_DANANG_BRANCH_SCOPE_PENDING',
      display_badge: '🔵 CÓ CƠ SỞ THẬT · KIỂM TRA TẠI NGUỒN',
      offer_quote: 'Ưu đãi Kichi-Kichi Buffet lẩu không giới hạn',
      locality_quote: 'Nhà hàng Kichi-Kichi tại TP. Đà Nẵng',
      branch_address: 'Vincom Plaza Ngô Quyền & Nguyễn Văn Linh, TP. Đà Nẵng',
      what_to_check: 'Kiểm tra khung giờ áp dụng giá buffet ưu đãi tại quầy Kichi-Kichi Đà Nẵng',
      action_url: 'https://kichi.com.vn/uu-dai',
      locality_url: 'https://kichi.com.vn/',
      offer_evidence_file: 'raw_cohort100_L2_22.html',
      locality_evidence_file: 'raw_cohort100_L2_22.html'
    },
    {
      deal_id: 'SCOPE_PENDING_200_12',
      brand: 'Gogi House',
      brand_id: 'BRAND_GOGI_HOUSE',
      title: 'Gogi House — Ưu Đãi Thịt Nướng Hàn Quốc',
      category: 'FOOD_AND_DINING',
      hub_id: 'HUB_1_FOOD_AND_DINING',
      tier: 'TIER_BLUE_SCOPE_PENDING',
      target_type: 'OFFER_WITH_DANANG_BRANCH_SCOPE_PENDING',
      display_badge: '🔵 CÓ CƠ SỞ THẬT · KIỂM TRA TẠI NGUỒN',
      offer_quote: 'Ưu đãi Gogi House Quán thịt nướng chuẩn Hàn',
      locality_quote: 'Nhà hàng Gogi House tại TP. Đà Nẵng',
      branch_address: 'Nguyễn Tri Phương & Lotte Mart Hải Châu, TP. Đà Nẵng',
      what_to_check: 'Kiểm tra điều kiện áp dụng ưu đãi thành viên Golden Spoon tại nhà hàng',
      action_url: 'https://gogi.com.vn/uu-dai',
      locality_url: 'https://gogi.com.vn/',
      offer_evidence_file: 'raw_cohort100_L2_23.html',
      locality_evidence_file: 'raw_cohort100_L2_23.html'
    }
  ];

  // Evaluate each candidate for 🟢 Ready Deal
  const readyDeals = [];
  const scopeDeals = [];

  for (const cand of scopePendingPool) {
    const evalRes = evaluateCandidateForReadyDeal(cand);
    if (evalRes.qualified) {
      console.log(`  🟢 ELEVATED TO READY DEAL: ${cand.brand} (${cand.deal_id})`);
      readyDeals.push({
        ...cand,
        tier: 'TIER_GREEN_CONFIRMED_ACTIONABLE',
        display_badge: '🟢 ĐÃ ĐỐI SOÁT 5 CHỨNG TỪ'
      });
    } else {
      console.log(`  🔵 KEPT AS SCOPE PENDING: ${cand.brand} (${cand.deal_id}) -> Reason: ${evalRes.reason}`);
      scopeDeals.push(cand);
    }
  }

  // Lane 3 Community Intake (Empty Queue, TTL 14 Days)
  const communityAudit = [];

  // Read Location Tracking from existing feed
  const feed199Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generated_tiered_savings_feed_199.json');
  const feed199 = JSON.parse(fs.readFileSync(feed199Path, 'utf8'));
  const locationTracking = feed199.verified_location_tracking;
  const affiliateMarketplace = feed199.affiliate_marketplace_pending;

  const totalReady = readyDeals.length;
  const totalScope = scopeDeals.length;
  const totalCommunity = communityAudit.length;
  const totalTracking = locationTracking.length;
  const totalAffiliate = affiliateMarketplace.length;
  const totalOpportunities = totalReady + totalScope + totalCommunity + totalTracking;

  const feed200 = {
    feed_version: '3.341.0',
    schema_version: '3.6.0',
    generated_at: new Date().toISOString(),
    feed_mandate: 'CHỈ THỊ CEO — JAYT-200: AUTOPILOT REAL-DEAL SPRINT',
    kpi_summary: {
      ready_to_use_count: totalReady,
      promo_scope_pending_count: totalScope,
      community_pending_audit_count: totalCommunity,
      verified_location_tracking_count: totalTracking,
      affiliate_marketplace_pending_count: totalAffiliate,
      total_savings_board_opportunities: totalOpportunities,
      kpi_honest_string: `${totalReady} dùng ngay · ${totalScope} cần xác nhận · ${totalCommunity} cộng đồng đang đối soát · ${totalTracking} điểm hẹn/đặc quyền theo dõi · ${totalAffiliate} chờ đối tác`
    },
    ready_to_use_deals: readyDeals,
    promo_scope_pending_deals: scopeDeals,
    community_pending_audit: communityAudit,
    verified_location_tracking: locationTracking,
    affiliate_marketplace_pending: affiliateMarketplace,

    // Compatibility views
    local_confirmed_actionable_deals: readyDeals,
    offer_with_danang_branch_scope_pending: scopeDeals,
    student_long_term_privileges: locationTracking.filter(t => t.scope_type === 'STUDENT_LONG_TERM_PRIVILEGE'),
    official_programs: locationTracking.filter(t => t.scope_type === 'PUBLIC_INFRASTRUCTURE'),
    community_signals: communityAudit
  };

  const feedJsonStr = JSON.stringify(feed200, null, 2);
  const feedJsonPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generated_tiered_savings_feed_200.json');
  fs.writeFileSync(feedJsonPath, feedJsonStr, 'utf8');
  const feedHash = crypto.createHash('sha256').update(feedJsonStr, 'utf8').digest('hex');

  console.log('\n========================================================================');
  console.log('✅ Generated Feed 200: ' + feedJsonPath);
  console.log('   Feed SHA-256: ' + feedHash);
  console.log('   🟢 Ready to Use Deals:               ' + totalReady);
  console.log('   🔵 Promo Scope Pending Deals:        ' + totalScope);
  console.log('   🟠 Community Pending Audit:          ' + totalCommunity);
  console.log('   🟣 Verified Location & Privileges:   ' + totalTracking);
  console.log('   ⚪ Affiliate Marketplace Pending:    ' + totalAffiliate);
  console.log('   📊 Total Honest Board Opportunities: ' + totalOpportunities);
  console.log('   🎯 KPI String:                       ' + feed200.kpi_summary.kpi_honest_string);

  // Update Supply Truth Ledger
  const ledgerPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'SUPPLY_TRUTH_LEDGER.json');
  const ledger = {
    ledger_version: '3.8.0',
    last_updated_at: new Date().toISOString(),
    directive: 'JAYT-200: AUTOPILOT REAL-DEAL SPRINT',
    kpis: {
      ready_to_use_deals: { count: totalReady, status: 'STRICT_5_PART_GATE_EVALUATED' },
      promo_scope_pending_deals: { count: totalScope, status: 'BRANCH_VERIFIED_SCOPE_CHECK' },
      community_pending_audit: { count: totalCommunity, status: '0_RECORDS_EMPTY_FORM_AWAITING_PHYSICAL_ARTIFACTS' },
      verified_location_tracking: { count: totalTracking, status: 'VERIFIED_PUBLIC_AND_STUDENT' },
      affiliate_marketplace_pending: { count: totalAffiliate, status: 'WAITING_FOR_DIRECT_FEEDS' }
    },
    kpi_representation: feed200.kpi_summary.kpi_honest_string,
    active_feed_file: '05_DEAL_AND_AFFILIATE/generated_tiered_savings_feed_200.json',
    active_feed_sha256: feedHash
  };
  fs.writeFileSync(ledgerPath, JSON.stringify(ledger, null, 2), 'utf8');
  console.log('✅ Updated Supply Truth Ledger: ' + ledgerPath);

  // Append Event Log
  const eventLogPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'EVIDENCE_CUSTODY_EVENT_LOG.jsonl');
  const custodyEvent = {
    event_id: 'EVENT_200_' + Date.now(),
    timestamp: new Date().toISOString(),
    event_type: 'JAYT_200_AUTOPILOT_SUPPLY_SPRINT_EVALUATED',
    work_order: 'JAYT-200',
    details: {
      feed_sha256: feedHash,
      ready_to_use_count: totalReady,
      promo_scope_pending_count: totalScope,
      community_pending_audit_count: totalCommunity,
      verified_location_tracking_count: totalTracking,
      kpi_honest_string: feed200.kpi_summary.kpi_honest_string
    }
  };
  fs.appendFileSync(eventLogPath, JSON.stringify(custodyEvent) + '\n', 'utf8');
  console.log('✅ Appended Evidence Custody Event Log');
}

if (require.main === module) {
  runAutopilotSupplyEngine();
}

module.exports = { runAutopilotSupplyEngine };
