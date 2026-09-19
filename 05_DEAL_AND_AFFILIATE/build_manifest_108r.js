const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const fourLayerPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'four_layer_dataset.json');
const batchSummaryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_108', 'batch_108_capture_summary.json');
const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'community_discovery_signals_manifest_108.json');

const fourLayer = JSON.parse(fs.readFileSync(fourLayerPath, 'utf8'));
const batchSummary = JSON.parse(fs.readFileSync(batchSummaryPath, 'utf8'));

const cobaltVenues = fourLayer.layer_2_watchlist.verified_locations.map(v => ({
  id: v.id,
  brand: v.brand,
  sector: v.sector,
  district: v.district,
  venue_name: v.venue_name,
  street_address: v.street_address,
  official_source_url: v.official_source_url,
  status: v.confidence_tier,
  status_disclaimer: v.status_disclaimer,
  evidence_pointer: v.evidence_pointer
}));

// Build 32 discovery items from capture results
const captureMap = {};
batchSummary.results.forEach(r => {
  captureMap[r.target_id] = r;
});

const NEUTRAL_SEEDS = [
  {
    id: 'TARGET_108_01_JOLLIBEE',
    brand: 'Jollibee Vietnam',
    category: 'LUNCH',
    neutral_title: 'Kênh Thông Tin Thực Đơn & Cửa Hàng Jollibee',
    summary: 'Thông tin hệ thống cửa hàng và thực đơn gà rán, mì Ý, burger chính hãng.',
    source_url: 'https://jollibee.com.vn/'
  },
  {
    id: 'TARGET_108_02_LOTTERIA',
    brand: 'Lotteria Vietnam',
    category: 'LUNCH',
    neutral_title: 'Kênh Thông Tin Cửa Hàng & Món Ăn Lotteria',
    summary: 'Thông tin hệ thống chuỗi cửa hàng thức ăn nhanh Lotteria tại Việt Nam.',
    source_url: 'https://www.lotteria.vn/'
  },
  {
    id: 'TARGET_108_03_KFC',
    brand: 'KFC Vietnam',
    category: 'LUNCH',
    neutral_title: 'Kênh Thông Tin Thực Đơn & Dịch Vụ KFC',
    summary: 'Trang thông tin thực đơn gà rán truyền thống và combo dịch vụ của KFC Vietnam.',
    source_url: 'https://www.kfcvietnam.com.vn/'
  },
  {
    id: 'TARGET_108_04_KICHI',
    brand: 'Kichi-Kichi',
    category: 'LUNCH',
    neutral_title: 'Kênh Thông Tin Lẩu Băng Chuyền Kichi-Kichi',
    summary: 'Trang giới thiệu chuỗi lẩu băng chuyền và danh sách nhà hàng Kichi-Kichi.',
    source_url: 'https://kichi.com.vn/'
  },
  {
    id: 'TARGET_108_05_GOGI',
    brand: 'Gogi House',
    category: 'LUNCH',
    neutral_title: 'Kênh Thông Tin Thịt Nướng Hàn Quốc Gogi House',
    summary: 'Trang thông tin nhà hàng thịt nướng chuẩn vị Hàn Quốc Gogi House.',
    source_url: 'https://gogi.com.vn/'
  },
  {
    id: 'TARGET_108_06_COM_NIEU_NHA_DO',
    brand: 'Cơm Niêu Nhà Đỏ',
    category: 'LUNCH',
    neutral_title: 'Kênh Thông Tin Ẩm Thực Cơm Niêu Nhà Đỏ Đà Nẵng',
    summary: 'Cổng thông tin ẩm thực truyền thống cơm niêu tại Đà Nẵng.',
    source_url: 'https://comnieunhado.com/'
  },
  {
    id: 'TARGET_108_07_PHELA',
    brand: 'Phê La',
    category: 'COFFEE_TEA',
    neutral_title: 'Kênh Giới Thiệu Ô Long Đặc Sản Phê La',
    summary: 'Trang giới thiệu câu chuyện thương hiệu và các dòng trà ô long đặc sản Phê La.',
    source_url: 'https://phela.vn/'
  },
  {
    id: 'TARGET_108_08_GONGCHA',
    brand: 'Gong Cha Vietnam',
    category: 'COFFEE_TEA',
    neutral_title: 'Kênh Thông Tin Trà Sữa & Cửa Hàng Gong Cha',
    summary: 'Trang thông tin chính hãng về các dòng trà sữa và hệ thống cửa hàng Gong Cha.',
    source_url: 'https://gongcha.com.vn/'
  },
  {
    id: 'TARGET_108_09_HIGHLANDS',
    brand: 'Highlands Coffee',
    category: 'COFFEE_TEA',
    neutral_title: 'Kênh Thông Tin Cà Phê & Điểm Hẹn Highlands Coffee',
    summary: 'Trang thông tin sản phẩm cà phê, freeze và chuỗi quán Highlands Coffee.',
    source_url: 'https://www.highlandscoffee.com.vn/'
  },
  {
    id: 'TARGET_108_10_TCH',
    brand: 'The Coffee House',
    category: 'COFFEE_TEA',
    neutral_title: 'Kênh Thông Tin Không Gian Cà Phê The Coffee House',
    summary: 'Trang giới thiệu không gian cà phê làm việc và thực đơn đồ uống The Coffee House.',
    source_url: 'https://thecoffeehouse.com/'
  },
  {
    id: 'TARGET_108_11_PHUCLONG',
    brand: 'Phúc Long Coffee & Tea',
    category: 'COFFEE_TEA',
    neutral_title: 'Kênh Thông Tin Trà & Cà Phê Truyền Thống Phúc Long',
    summary: 'Trang thông tin sản phẩm trà, cà phê đóng gói và thức uống pha chế Phúc Long.',
    source_url: 'https://phuclong.com.vn/'
  },
  {
    id: 'TARGET_108_12_KATINAT',
    brand: 'Katinat Saigon Kafe',
    category: 'COFFEE_TEA',
    neutral_title: 'Kênh Thông Tin Không Gian & Đồ Uống Katinat',
    summary: 'Trang giới thiệu phong cách không gian thưởng thức và đồ uống Katinat Saigon Kafe.',
    source_url: 'https://katinat.vn/'
  },
  {
    id: 'TARGET_108_13_GALAXY',
    brand: 'Galaxy Cinema',
    category: 'CINEMA',
    neutral_title: 'Kênh Lịch Chiếu & Cụm Rạp Galaxy Cinema',
    summary: 'Trang tra cứu lịch chiếu phim và thông tin cụm rạp Galaxy Cinema trên toàn quốc.',
    source_url: 'https://galaxycine.vn/'
  },
  {
    id: 'TARGET_108_14_CGV',
    brand: 'CGV Cinemas',
    category: 'CINEMA',
    neutral_title: 'Kênh Lịch Chiếu & Rạp Chiếu Phim CGV Cinemas',
    summary: 'Trang tra cứu thông tin phim đang chiếu, sắp chiếu và cụm rạp CGV Cinemas.',
    source_url: 'https://www.cgv.vn/'
  },
  {
    id: 'TARGET_108_15_METIZ',
    brand: 'Metiz Cinema',
    category: 'CINEMA',
    neutral_title: 'Kênh Lịch Chiếu & Phòng Chiếu Phim Metiz Cinema',
    summary: 'Trang thông tin lịch chiếu và phòng chiếu phim tiêu chuẩn quốc tế tại Helio Đà Nẵng.',
    source_url: 'https://metiz.vn/'
  },
  {
    id: 'TARGET_108_16_LOTTE_CINEMA',
    brand: 'Lotte Cinema',
    category: 'CINEMA',
    neutral_title: 'Kênh Lịch Chiếu & Cụm Rạp Lotte Cinema',
    summary: 'Trang tra cứu lịch chiếu phim và hệ thống rạp chiếu Lotte Cinema tại Việt Nam.',
    source_url: 'https://www.lottecinemavn.com/'
  },
  {
    id: 'TARGET_108_17_STARLIGHT',
    brand: 'Starlight Cinema',
    category: 'CINEMA',
    neutral_title: 'Kênh Lịch Chiếu & Trung Tâm Giải Trí Starlight',
    summary: 'Trang thông tin giải trí điện ảnh và lịch chiếu cụm rạp Starlight Cinema.',
    source_url: 'https://starlight.vn/'
  },
  {
    id: 'TARGET_108_18_CGV_U22',
    brand: 'CGV Cinemas Vietnam',
    category: 'CINEMA',
    neutral_title: 'Kênh Chính Sách Khách Hàng Thành Viên CGV Cinemas',
    summary: 'Trang quy định và quyền lợi dành cho tài khoản thành viên xem phim CGV.',
    source_url: 'https://www.cgv.vn/'
  },
  {
    id: 'TARGET_108_19_XANH_SM',
    brand: 'Xanh SM',
    category: 'MOBILITY',
    neutral_title: 'Kênh Dịch Vụ Vận Chuyển Xe Điện Xanh SM',
    summary: 'Trang thông tin dịch vụ di chuyển taxi và xe máy thuần điện VinFast của Xanh SM.',
    source_url: 'https://www.xanhsm.com/'
  },
  {
    id: 'TARGET_108_20_GRAB',
    brand: 'Grab Vietnam',
    category: 'MOBILITY',
    neutral_title: 'Kênh Dịch Vụ Di Chuyển & Đặt Xe Grab',
    summary: 'Cổng thông tin các dịch vụ đặt xe máy GrabBike và taxi GrabCar tại Việt Nam.',
    source_url: 'https://www.grab.com/vn/'
  },
  {
    id: 'TARGET_108_21_BE',
    brand: 'Be Group',
    category: 'MOBILITY',
    neutral_title: 'Kênh Dịch Vụ Vận Tải Công Nghệ Be Group',
    summary: 'Trang thông tin ứng dụng tiêu dùng đa dịch vụ và vận tải beBike, beCar.',
    source_url: 'https://be.com.vn/'
  },
  {
    id: 'TARGET_108_22_DANABUS',
    brand: 'DanaBus Đà Nẵng',
    category: 'MOBILITY',
    neutral_title: 'Kênh Tra Cứu Tuyến Xe Buýt Trợ Giá DanaBus',
    summary: 'Cổng thông tin mạng lưới các tuyến xe buýt công cộng nội đô thành phố Đà Nẵng.',
    source_url: 'https://danangbus.vn/'
  },
  {
    id: 'TARGET_108_23_TNGO',
    brand: 'TNGo Xe Đạp',
    category: 'MOBILITY',
    neutral_title: 'Kênh Dịch Vụ Xe Đạp Đô Thị Công Cộng TNGo',
    summary: 'Trang thông tin các trạm thuê xe đạp đô thị công cộng tiện lợi tại Đà Nẵng.',
    source_url: 'https://tngo.vn/'
  },
  {
    id: 'TARGET_108_24_SHOPEEFOOD',
    brand: 'ShopeeFood',
    category: 'MOBILITY',
    neutral_title: 'Kênh Đặt Món Giao Tận Nơi ShopeeFood',
    summary: 'Cổng dịch vụ giao đồ ăn và thức uống nhanh chóng tại các quận Đà Nẵng.',
    source_url: 'https://shopeefood.vn/'
  },
  {
    id: 'TARGET_108_25_COOPMART',
    brand: 'Co.opmart',
    category: 'SHOPPING',
    neutral_title: 'Kênh Mua Sắm Siêu Thị Co.opmart Đà Nẵng',
    summary: 'Trang thông tin hàng tiêu dùng và hệ thống siêu thị Co.opmart tại Đà Nẵng.',
    source_url: 'https://co-opmart.com.vn/'
  },
  {
    id: 'TARGET_108_26_MM_MEGA',
    brand: 'MM Mega Market',
    category: 'SHOPPING',
    neutral_title: 'Kênh Trung Tâm Mua Sắm MM Mega Market',
    summary: 'Trang thông tin trung tâm bán buôn và bán lẻ thực phẩm MM Mega Market.',
    source_url: 'https://mmvietnam.com/'
  },
  {
    id: 'TARGET_108_27_GO_DANANG',
    brand: 'GO! Vietnam',
    category: 'SHOPPING',
    neutral_title: 'Kênh Siêu Thị & Đại Siêu Thị GO! Đà Nẵng',
    summary: 'Trang thông tin chuỗi đại siêu thị GO! phục vụ nhu cầu mua sắm gia đình.',
    source_url: 'https://go-vietnam.vn/'
  },
  {
    id: 'TARGET_108_28_VINCOM',
    brand: 'Vincom Plaza',
    category: 'SHOPPING',
    neutral_title: 'Kênh Trung Tâm Thương Mại Vincom Plaza Đà Nẵng',
    summary: 'Trang thông tin tiện ích mua sắm, ẩm thực và giải trí tại TTTM Vincom Plaza.',
    source_url: 'https://vincom.com.vn/'
  },
  {
    id: 'TARGET_108_29_LOTTE_MART',
    brand: 'Lotte Mart',
    category: 'SHOPPING',
    neutral_title: 'Kênh Siêu Thị Trực Tuyến Lotte Mart Đà Nẵng',
    summary: 'Trang thông tin danh mục hàng hóa và trung tâm mua sắm Lotte Mart.',
    source_url: 'https://www.lottemart.com.vn/'
  },
  {
    id: 'TARGET_108_30_WINMART',
    brand: 'WinMart+',
    category: 'SHOPPING',
    neutral_title: 'Kênh Chuỗi Cửa Hàng Tiện Ích WinMart+',
    summary: 'Trang thông tin chuỗi siêu thị và cửa hàng tiện lợi WinMart+ tại khu dân cư.',
    source_url: 'https://winmart.vn/'
  },
  {
    id: 'TARGET_108_31_CHO_CON',
    brand: 'Cổng TT Đà Nẵng - Chợ Cồn',
    category: 'SHOPPING',
    neutral_title: 'Kênh Giới Thiệu Chợ Truyền Thống Chợ Cồn',
    summary: 'Trang thông tin văn hóa ẩm thực và điểm tham quan mua sắm Chợ Cồn Đà Nẵng.',
    source_url: 'https://danang.gov.vn/'
  },
  {
    id: 'TARGET_108_32_CHO_HAN',
    brand: 'Cổng TT Đà Nẵng - Chợ Hàn',
    category: 'SHOPPING',
    neutral_title: 'Kênh Giới Thiệu Điểm Mua Sắm Du Lịch Chợ Hàn',
    summary: 'Trang thông tin đặc sản và điểm đến du lịch mua sắm truyền thống Chợ Hàn.',
    source_url: 'https://danang.gov.vn/'
  }
];

const discoveryItems = NEUTRAL_SEEDS.map(s => {
  const cap = captureMap[s.id];
  const isCaptured = cap && cap.status === 'CAPTURED_SUCCESS';

  return {
    signal_id: s.id,
    brand: s.brand,
    category: s.category,
    signal_title: s.neutral_title,
    signal_summary: s.summary,
    source_url: s.source_url,
    observed_at: cap ? cap.captured_at : new Date().toISOString(),
    signal_status: isCaptured ? 'SIGNAL_ONLY' : 'UNCAPTURED_DISCOVERY_SEED',
    verified_deal: false,
    evidence_pointer: isCaptured ? {
      target_id: cap.target_id,
      artifact_path: cap.evidence_path,
      artifact_sha256: cap.text_sha256,
      screenshot_sha256: cap.screenshot_sha256,
      captured_at: cap.captured_at
    } : null,
    disclaimer: isCaptured 
      ? 'Tín hiệu quan sát từ trang thông tin chính hãng; không phải ưu đãi thương mại kích hoạt qua JayT.'
      : 'Seed khám phá thương hiệu chưa capture nội dung thực tế; kiểm tra trực tiếp tại kênh chính thức.'
  };
});

const outputManifest = {
  manifest_id: 'COMMUNITY_DISCOVERY_SIGNALS_MANIFEST_108R',
  work_order: 'JAYT-108R-SUPPLY-TRUTH-AND-CANONICALIZATION',
  generated_at: new Date().toISOString(),
  containment_policy: {
    rule_1: 'Toàn bộ 18 địa điểm Cobalt đồng nhất 1-1 với four_layer_dataset.json và evidence_pointer on-disk',
    rule_2: 'Các seed chưa capture có trạng thái UNCAPTURED_DISCOVERY_SEED và evidence_pointer: null',
    rule_3: 'Các mục đã capture có trạng thái SIGNAL_ONLY kèm SHA-256 tệp text và ảnh chụp',
    rule_4: 'Không chứa bất kỳ claim giá, voucher, discount % giả định nào',
    rule_5: 'deals_feed.json: [] và is_approved: false'
  },
  summary_metrics: {
    total_standardized_cobalt_venues: cobaltVenues.length,
    total_discovery_items: discoveryItems.length,
    total_captured_signals: discoveryItems.filter(d => d.signal_status === 'SIGNAL_ONLY').length,
    total_uncaptured_seeds: discoveryItems.filter(d => d.signal_status === 'UNCAPTURED_DISCOVERY_SEED').length
  },
  standardized_cobalt_venues: cobaltVenues,
  public_discovery_signals: discoveryItems
};

fs.writeFileSync(manifestPath, JSON.stringify(outputManifest, null, 2), 'utf8');
console.log('✅ Đã ghi manifest 108R:', manifestPath);
console.log('  Cobalt venues:', outputManifest.summary_metrics.total_standardized_cobalt_venues);
console.log('  Captured signals:', outputManifest.summary_metrics.total_captured_signals);
console.log('  Uncaptured seeds:', outputManifest.summary_metrics.total_uncaptured_seeds);
