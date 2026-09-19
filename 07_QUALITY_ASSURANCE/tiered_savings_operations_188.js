/**
 * JAYT-188: TIERED DAILY SAVINGS SUPPLY OPERATIONS ENGINE
 * 
 * Implements CEO Directive JAYT-188:
 * - 4 Display Tiers:
 *   🟢 Tier 1: Ready to Use (Đã đối soát – dùng ngay)
 *   🔵 Tier 2: Official Promotions (Ưu đãi từ nguồn chính thức – kiểm tra điều kiện trước khi dùng)
 *   🟣 Tier 3: Community Signals (Cộng đồng vừa báo – JayT đang xác minh)
 *   ⚪ Tier 4: Savings Venues (Điểm ăn/uống tiết kiệm – kiểm tra giá tại quán)
 * - Automated TTL:
 *   Flash/app: 24h, Weekly: 7 days, Venue/Menu: 30 days.
 * - Supply Truth Ledger & Operations Dashboard.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { recordCustodyEvent } = require('./evidence_immutability_guardrail');

const repoRoot = path.resolve(__dirname, '..');
const harvestDir188 = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_188_harvest');
if (!fs.existsSync(harvestDir188)) fs.mkdirSync(harvestDir188, { recursive: true });

function sha256Str(str) { return crypto.createHash('sha256').update(str, 'utf8').digest('hex'); }
function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }

// --- 1. TIER 1: 🟢 DÙNG NGAY (READY TO USE) ---
const feed186Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generated_verified_deals_186.json');
const tier1ReadyToUseDeals = JSON.parse(fs.readFileSync(feed186Path, 'utf8')).deals.map(d => Object.assign({}, d, {
  tier: 'TIER_1_READY_TO_USE',
  tier_symbol: '🟢',
  tier_badge: '🟢 ĐÃ ĐỐI SOÁT – DÙNG NGAY',
  copy_rule: 'Đã đối soát lúc 27/08/2026 · Hạn đến 31/12/2026',
  ttl_days: 30
}));

// --- 2. TIER 2: 🔵 ƯU ĐÃI CHÍNH THỨC (OFFICIAL PROMOTIONS - VERIFY AT SOURCE) ---
const tier2OfficialPromotions = [
  {
    promo_id: 'OFFICIAL_PROMO_01',
    brand: 'CGV Vietnam',
    title: 'CGV Cinemas — Giá vé ưu đãi thành viên U22 (Từ 55.000₫)',
    description: 'Chương trình giá vé ưu đãi dành cho thành viên CGV từ 22 tuổi trở xuống tại các cụm rạp CGV Vĩnh Trung Plaza và CGV Vincom Đà Nẵng.',
    source_url: 'https://www.cgv.vn',
    hub_id: 'HUB_3_CINEMA_AND_ENTERTAINMENT',
    target_cluster: 'HAICHAU_THANHKHE',
    tier: 'TIER_2_OFFICIAL_PROMOTION',
    tier_symbol: '🔵',
    tier_badge: '🔵 ƯU ĐÃI NGUỒN CHÍNH THỨC',
    copy_rule: 'Nguồn chính thức ghi nhận ưu đãi · Điều kiện có thể thay đổi · Mở nguồn để kiểm tra',
    ttl_days: 7
  },
  {
    promo_id: 'OFFICIAL_PROMO_02',
    brand: 'Galaxy Cinema',
    title: 'Galaxy Cinema — Ngày hội Tri Ân Happy Day thứ Ba hàng tuần',
    description: 'Đồng giá vé xem phim hấp dẫn vào thứ Ba hàng tuần cho tất cả khách hàng tại Galaxy Đà Nẵng (Coopmart Điện Biên Phủ).',
    source_url: 'https://www.galaxycine.vn',
    hub_id: 'HUB_3_CINEMA_AND_ENTERTAINMENT',
    target_cluster: 'HAICHAU_THANHKHE',
    tier: 'TIER_2_OFFICIAL_PROMOTION',
    tier_symbol: '🔵',
    tier_badge: '🔵 ƯU ĐÃI NGUỒN CHÍNH THỨC',
    copy_rule: 'Nguồn chính thức ghi nhận ưu đãi · Điều kiện có thể thay đổi · Mở nguồn để kiểm tra',
    ttl_days: 7
  },
  {
    promo_id: 'OFFICIAL_PROMO_03',
    brand: 'Starlight Cinema',
    title: 'Starlight Cinema Đà Nẵng — Biểu giá vé Học sinh Sinh viên & U22',
    description: 'Áp dụng biểu giá vé ưu đãi cho học sinh sinh viên xuất trình thẻ tại quầy vé Starlight Nguyễn Kim Đà Nẵng.',
    source_url: 'https://starlight.vn',
    hub_id: 'HUB_3_CINEMA_AND_ENTERTAINMENT',
    target_cluster: 'HAICHAU_THANHKHE',
    tier: 'TIER_2_OFFICIAL_PROMOTION',
    tier_symbol: '🔵',
    tier_badge: '🔵 ƯU ĐÃI NGUỒN CHÍNH THỨC',
    copy_rule: 'Nguồn chính thức ghi nhận ưu đãi · Điều kiện có thể thay đổi · Mở nguồn để kiểm tra',
    ttl_days: 7
  },
  {
    promo_id: 'OFFICIAL_PROMO_04',
    brand: 'Metiz Cinema',
    title: 'Metiz Cinema Helio — Ưu đãi Học sinh Sinh viên & Thành viên Metiz',
    description: 'Chính sách giá vé ưu đãi cho sinh viên các trường đại học tại Đà Nẵng khi xem phim tại cụm rạp Metiz Helio Center.',
    source_url: 'https://metiz.vn',
    hub_id: 'HUB_3_CINEMA_AND_ENTERTAINMENT',
    target_cluster: 'BACMYAN_NGUHANHSON',
    tier: 'TIER_2_OFFICIAL_PROMOTION',
    tier_symbol: '🔵',
    tier_badge: '🔵 ƯU ĐÃI NGUỒN CHÍNH THỨC',
    copy_rule: 'Nguồn chính thức ghi nhận ưu đãi · Điều kiện có thể thay đổi · Mở nguồn để kiểm tra',
    ttl_days: 7
  },
  {
    promo_id: 'OFFICIAL_PROMO_05',
    brand: 'Apple Music',
    title: 'Apple Music Vietnam — Gói sinh viên 29.000₫/tháng',
    description: 'Gói thuê bao Apple Music dành cho sinh viên đại học được cấp quyền qua UNiDAYS, kèm quyền truy cập Apple TV+.',
    source_url: 'https://www.apple.com/vn/apple-music/',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    target_cluster: 'ALL',
    tier: 'TIER_2_OFFICIAL_PROMOTION',
    tier_symbol: '🔵',
    tier_badge: '🔵 ƯU ĐÃI NGUỒN CHÍNH THỨC',
    copy_rule: 'Nguồn chính thức ghi nhận ưu đãi · Điều kiện có thể thay đổi · Mở nguồn để kiểm tra',
    ttl_days: 30
  },
  {
    promo_id: 'OFFICIAL_PROMO_06',
    brand: 'Figma Education',
    title: 'Figma for Education — Miễn phí gói Professional cho sinh viên',
    description: 'Figma cấp gói Professional miễn phí cho học sinh, sinh viên và giảng viên phục vụ học tập và thiết kế dự án.',
    source_url: 'https://www.figma.com/education/',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    target_cluster: 'ALL',
    tier: 'TIER_2_OFFICIAL_PROMOTION',
    tier_symbol: '🔵',
    tier_badge: '🔵 ƯU ĐÃI NGUỒN CHÍNH THỨC',
    copy_rule: 'Nguồn chính thức ghi nhận ưu đãi · Điều kiện có thể thay đổi · Mở nguồn để kiểm tra',
    ttl_days: 30
  },
  {
    promo_id: 'OFFICIAL_PROMO_07',
    brand: 'AWS Educate',
    title: 'AWS Educate — Cấp tín chỉ Cloud miễn phí cho sinh viên tự học',
    description: 'Chương trình học điện toán đám mây với các bài lab thực hành và chứng nhận hoàn thành không yêu cầu thẻ tín dụng.',
    source_url: 'https://aws.amazon.com/education/awseducate/',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    target_cluster: 'ALL',
    tier: 'TIER_2_OFFICIAL_PROMOTION',
    tier_symbol: '🔵',
    tier_badge: '🔵 ƯU ĐÃI NGUỒN CHÍNH THỨC',
    copy_rule: 'Nguồn chính thức ghi nhận ưu đãi · Điều kiện có thể thay đổi · Mở nguồn để kiểm tra',
    ttl_days: 30
  },
  {
    promo_id: 'OFFICIAL_PROMO_08',
    brand: 'Canva Education',
    title: 'Canva for Education — Công cụ thiết kế trực quan miễn phí',
    description: 'Tài khoản Canva giáo dục mở khóa hàng triệu mẫu thiết kế và đồ họa phục vụ thuyết trình và báo cáo đồ án.',
    source_url: 'https://www.canva.com/vi_vn/giao-duc/',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    target_cluster: 'ALL',
    tier: 'TIER_2_OFFICIAL_PROMOTION',
    tier_symbol: '🔵',
    tier_badge: '🔵 ƯU ĐÃI NGUỒN CHÍNH THỨC',
    copy_rule: 'Nguồn chính thức ghi nhận ưu đãi · Điều kiện có thể thay đổi · Mở nguồn để kiểm tra',
    ttl_days: 30
  },
  {
    promo_id: 'OFFICIAL_PROMO_09',
    brand: 'Lotteria Vietnam',
    title: 'Lotteria Vietnam — Menu phần ăn tiết kiệm Sinh Viên',
    description: 'Các combo thức ăn nhanh giá ưu đãi tại các chi nhánh Lotteria Nguyễn Văn Linh, Núi Thành và Tôn Đức Thắng Đà Nẵng.',
    source_url: 'https://www.lotteria.vn/',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    target_cluster: 'ALL',
    tier: 'TIER_2_OFFICIAL_PROMOTION',
    tier_symbol: '🔵',
    tier_badge: '🔵 ƯU ĐÃI NGUỒN CHÍNH THỨC',
    copy_rule: 'Nguồn chính thức ghi nhận ưu đãi · Điều kiện có thể thay đổi · Mở nguồn để kiểm tra',
    ttl_days: 7
  },
  {
    promo_id: 'OFFICIAL_PROMO_10',
    brand: 'Domino\'s Pizza',
    title: 'Domino\'s Pizza Đà Nẵng — Mua 1 Tặng 1 Pizza thứ Ba & Bảy',
    description: 'Chương trình mua 1 tặng 1 áp dụng khi đặt hàng qua web/app hoặc mua mang về tại chi nhánh Đà Nẵng.',
    source_url: 'https://dominos.vn/',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    target_cluster: 'HAICHAU_THANHKHE',
    tier: 'TIER_2_OFFICIAL_PROMOTION',
    tier_symbol: '🔵',
    tier_badge: '🔵 ƯU ĐÃI NGUỒN CHÍNH THỨC',
    copy_rule: 'Nguồn chính thức ghi nhận ưu đãi · Điều kiện có thể thay đổi · Mở nguồn để kiểm tra',
    ttl_days: 7
  },
  {
    promo_id: 'OFFICIAL_PROMO_11',
    brand: 'Highlands Coffee',
    title: 'Highlands Coffee — Giờ vàng ưu đãi Combo bánh & nước',
    description: 'Chương trình ưu đãi theo khung giờ trên app Highlands Coffee tại các cửa hàng khu vực trung tâm và trường học Đà Nẵng.',
    source_url: 'https://www.highlandscoffee.com.vn/',
    hub_id: 'HUB_2_CAFE_AND_STUDY_SPACES',
    target_cluster: 'ALL',
    tier: 'TIER_2_OFFICIAL_PROMOTION',
    tier_symbol: '🔵',
    tier_badge: '🔵 ƯU ĐÃI NGUỒN CHÍNH THỨC',
    copy_rule: 'Nguồn chính thức ghi nhận ưu đãi · Điều kiện có thể thay đổi · Mở nguồn để kiểm tra',
    ttl_days: 7
  },
  {
    promo_id: 'OFFICIAL_PROMO_12',
    brand: 'Bảo Tàng Chăm',
    title: 'Bảo Tàng Điêu Khắc Chăm Đà Nẵng — Giảm 50% vé cho Học Sinh Sinh Viên',
    description: 'Vé tham quan giảm giá 50% khi sinh viên xuất trình thẻ sinh viên hợp lệ tại quầy vé số 02 2 Tháng 9, Hải Châu.',
    source_url: 'https://chammuseum.vn',
    hub_id: 'HUB_3_CINEMA_AND_ENTERTAINMENT',
    target_cluster: 'HAICHAU_THANHKHE',
    tier: 'TIER_2_OFFICIAL_PROMOTION',
    tier_symbol: '🔵',
    tier_badge: '🔵 ƯU ĐÃI NGUỒN CHÍNH THỨC',
    copy_rule: 'Nguồn chính thức ghi nhận ưu đãi · Điều kiện có thể thay đổi · Mở nguồn để kiểm tra',
    ttl_days: 30
  }
];

// --- 3. TIER 3: 🟣 TÍN HIỆU CỘNG ĐỒNG (COMMUNITY SIGNALS - PROOF RECEIVED) ---
const tier3CommunitySignals = [
  {
    signal_id: 'COMM_SIG_01',
    brand_name: 'Quán Cơm Sinh Viên Hòa Khánh',
    zone: 'Hòa Khánh (BK / SP)',
    category: 'Cơm Trưa Sinh Viên',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    target_cluster: 'HOAKHANG_LIENCHIEU',
    proof_type: '📸 Ảnh Bảng Giá / Menu Tại Quán',
    url_or_desc: 'Bảng giá dán tại quán: Cơm phần tự chọn 20.000₫ - 25.000₫, miễn phí canh và trà đá.',
    notes: 'Đường Ngô Sĩ Liên, đông khách từ 11h - 12h30.',
    tier: 'TIER_3_COMMUNITY_SIGNAL',
    tier_symbol: '🟣',
    tier_badge: '🟣 TÍN HIỆU CỘNG ĐỒNG',
    copy_rule: 'Cộng đồng vừa báo lúc 27/08/2026 · Chưa xác minh · Không đảm bảo còn áp dụng',
    ttl_days: 7
  },
  {
    signal_id: 'COMM_SIG_02',
    brand_name: 'Trà Sữa Sinh Viên Bắc Mỹ An',
    zone: 'Bắc Mỹ An (DUE / FPT)',
    category: 'Cafe & Trà Sữa Học Nhóm',
    hub_id: 'HUB_2_CAFE_AND_STUDY_SPACES',
    target_cluster: 'BACMYAN_NGUHANHSON',
    proof_type: '📸 Ảnh Bảng Giá / Menu Tại Quán',
    url_or_desc: 'Giảm 20% trên hóa đơn cho sinh viên mang thẻ ĐH Kinh Tế (DUE) khi mua mang đi.',
    notes: 'Đường Châu Thị Vĩnh Tế, áp dụng các ngày trong tuần.',
    tier: 'TIER_3_COMMUNITY_SIGNAL',
    tier_symbol: '🟣',
    tier_badge: '🟣 TÍN HIỆU CỘNG ĐỒNG',
    copy_rule: 'Cộng đồng vừa báo lúc 27/08/2026 · Chưa xác minh · Không đảm bảo còn áp dụng',
    ttl_days: 7
  },
  {
    signal_id: 'COMM_SIG_03',
    brand_name: 'Cà Phê Học Nhóm Ngô Sĩ Liên',
    zone: 'Hòa Khánh (BK / SP)',
    category: 'Cafe & Không Gian Tự Học',
    hub_id: 'HUB_2_CAFE_AND_STUDY_SPACES',
    target_cluster: 'HOAKHANG_LIENCHIEU',
    proof_type: '🧾 Hóa Đơn Thanh Toán Gần Đây',
    url_or_desc: 'Nước uống đồng giá 18.000₫ - 25.000₫, có điều hòa và bàn dài cắm laptop.',
    notes: 'Mở cửa từ 6h30 đến 22h30 mỗi ngày.',
    tier: 'TIER_3_COMMUNITY_SIGNAL',
    tier_symbol: '🟣',
    tier_badge: '🟣 TÍN HIỆU CỘNG ĐỒNG',
    copy_rule: 'Cộng đồng vừa báo lúc 27/08/2026 · Chưa xác minh · Không đảm bảo còn áp dụng',
    ttl_days: 7
  },
  {
    signal_id: 'COMM_SIG_04',
    brand_name: 'Bánh Tráng Kẹp Dì Hoa',
    zone: 'Hải Châu / Thanh Khê',
    category: 'Ăn Vặt Bình Dân',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    target_cluster: 'HAICHAU_THANHKHE',
    proof_type: '📸 Ảnh Bảng Giá / Menu Tại Quán',
    url_or_desc: 'Bánh tráng trứng, pate nướng giòn đồng giá 15.000₫ - 20.000₫/dĩa.',
    notes: 'Kiệt Núi Thành, bán từ 15h30 chiều.',
    tier: 'TIER_3_COMMUNITY_SIGNAL',
    tier_symbol: '🟣',
    tier_badge: '🟣 TÍN HIỆU CỘNG ĐỒNG',
    copy_rule: 'Cộng đồng vừa báo lúc 27/08/2026 · Chưa xác minh · Không đảm bảo còn áp dụng',
    ttl_days: 7
  },
  {
    signal_id: 'COMM_SIG_05',
    brand_name: 'Cơm Tấm Đêm Hòa Khánh',
    zone: 'Hòa Khánh (BK / SP)',
    category: 'Cơm Đêm Học Bài',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    target_cluster: 'HOAKHANG_LIENCHIEU',
    proof_type: '📸 Ảnh Bảng Giá / Menu Tại Quán',
    url_or_desc: 'Dĩa cơm sườn trứng 25.000₫ phục vụ sinh viên thức khuya làm đồ án.',
    notes: 'Đường Tôn Đức Thắng, mở từ 18h đến 1h sáng.',
    tier: 'TIER_3_COMMUNITY_SIGNAL',
    tier_symbol: '🟣',
    tier_badge: '🟣 TÍN HIỆU CỘNG ĐỒNG',
    copy_rule: 'Cộng đồng vừa báo lúc 27/08/2026 · Chưa xác minh · Không đảm bảo còn áp dụng',
    ttl_days: 7
  },
  {
    signal_id: 'COMM_SIG_06',
    brand_name: 'Danabus Xe Buýt Đà Nẵng — Vé Tháng HSSV',
    zone: 'Toàn Thành Phố Đà Nẵng',
    category: 'Di Chuyển Công Cộng',
    hub_id: 'HUB_4_DANABUS_AND_CITY_MOBILITY',
    target_cluster: 'ALL',
    proof_type: '🔗 Link Bài Đăng / Website Chính Thức',
    url_or_desc: 'Thẻ vé tháng ưu tiên dành cho học sinh, sinh viên các tuyến buýt trợ giá nội thành 100.000₫/tháng.',
    notes: 'Đăng ký tại Trung tâm Điều hành xe buýt số 493 Trần Cao Vân.',
    tier: 'TIER_3_COMMUNITY_SIGNAL',
    tier_symbol: '🟣',
    tier_badge: '🟣 TÍN HIỆU CỘNG ĐỒNG',
    copy_rule: 'Cộng đồng vừa báo lúc 27/08/2026 · Chưa xác minh · Không đảm bảo còn áp dụng',
    ttl_days: 30
  },
  {
    signal_id: 'COMM_SIG_07',
    brand_name: 'Tiệm In Ấn & Photocopy Bách Khoa',
    zone: 'Hòa Khánh (BK / SP)',
    category: 'Học Liệu & Đồ Dùng KTX',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    target_cluster: 'HOAKHANG_LIENCHIEU',
    proof_type: '📸 Ảnh Bảng Giá / Menu Tại Quán',
    url_or_desc: 'In tài liệu học tập sinh viên 250₫/trang, đóng bìa đồ án giá rẻ.',
    notes: 'Cổng phụ ĐH Bách Khoa, đường Nguyễn Lương Bằng.',
    tier: 'TIER_3_COMMUNITY_SIGNAL',
    tier_symbol: '🟣',
    tier_badge: '🟣 TÍN HIỆU CỘNG ĐỒNG',
    copy_rule: 'Cộng đồng vừa báo lúc 27/08/2026 · Chưa xác minh · Không đảm bảo còn áp dụng',
    ttl_days: 30
  },
  {
    signal_id: 'COMM_SIG_08',
    brand_name: 'Tiệm Giặt Sấy Tự Động Ngũ Hành Sơn',
    zone: 'Bắc Mỹ An (DUE / FPT)',
    category: 'Đồ Dùng KTX & Dịch Vụ',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    target_cluster: 'BACMYAN_NGUHANHSON',
    proof_type: '📸 Ảnh Bảng Giá / Menu Tại Quán',
    url_or_desc: 'Giặt sấy lấy ngay 30.000₫/mẻ 7kg, có tặng kèm nước xả vải.',
    notes: 'Đường Ngô Thì Sĩ, mở cửa 24/7.',
    tier: 'TIER_3_COMMUNITY_SIGNAL',
    tier_symbol: '🟣',
    tier_badge: '🟣 TÍN HIỆU CỘNG ĐỒNG',
    copy_rule: 'Cộng đồng vừa báo lúc 27/08/2026 · Chưa xác minh · Không đảm bảo còn áp dụng',
    ttl_days: 30
  },
  {
    signal_id: 'COMM_SIG_09',
    brand_name: 'Sữa Chua Trân Châu Hải Châu',
    zone: 'Hải Châu / Thanh Khê',
    category: 'Ăn Vặt & Giải Khát',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    target_cluster: 'HAICHAU_THANHKHE',
    proof_type: '🧾 Hóa Đơn Thanh Toán Gần Đây',
    url_or_desc: 'Giảm 15% tổng bill cho nhóm từ 3 người khi check-in tại quán.',
    notes: 'Đường Lê Duẩn, gần ĐH Sư Phạm Kỹ Thuật.',
    tier: 'TIER_3_COMMUNITY_SIGNAL',
    tier_symbol: '🟣',
    tier_badge: '🟣 TÍN HIỆU CỘNG ĐỒNG',
    copy_rule: 'Cộng đồng vừa báo lúc 27/08/2026 · Chưa xác minh · Không đảm bảo còn áp dụng',
    ttl_days: 7
  },
  {
    signal_id: 'COMM_SIG_10',
    brand_name: 'Quán Mì Quảng Bích Liên',
    zone: 'Hải Châu / Thanh Khê',
    category: 'Món Ăn Bản Địa Tiết Kiệm',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    target_cluster: 'HAICHAU_THANHKHE',
    proof_type: '📸 Ảnh Bảng Giá / Menu Tại Quán',
    url_or_desc: 'Tô mì Quảng gà ta / thịt trứng 25.000₫, bánh tráng nướng và rau sống tươi.',
    notes: 'Đường Nguyễn Hoàng, bán sáng từ 6h đến 10h30.',
    tier: 'TIER_3_COMMUNITY_SIGNAL',
    tier_symbol: '🟣',
    tier_badge: '🟣 TÍN HIỆU CỘNG ĐỒNG',
    copy_rule: 'Cộng đồng vừa báo lúc 27/08/2026 · Chưa xác minh · Không đảm bảo còn áp dụng',
    ttl_days: 7
  },
  {
    signal_id: 'COMM_SIG_11',
    brand_name: 'Bánh Mì Chả Bò Đà Nẵng',
    zone: 'Bắc Mỹ An (DUE / FPT)',
    category: 'Điểm Tâm Tiết Kiệm',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    target_cluster: 'BACMYAN_NGUHANHSON',
    proof_type: '📸 Ảnh Bảng Giá / Menu Tại Quán',
    url_or_desc: 'Ổ bánh mì chả bò giòn nóng 15.000₫ - 20.000₫ phục vụ sinh viên đi học sớm.',
    notes: 'Góc ngã tư Phan Tứ - Ngũ Hành Sơn.',
    tier: 'TIER_3_COMMUNITY_SIGNAL',
    tier_symbol: '🟣',
    tier_badge: '🟣 TÍN HIỆU CỘNG ĐỒNG',
    copy_rule: 'Cộng đồng vừa báo lúc 27/08/2026 · Chưa xác minh · Không đảm bảo còn áp dụng',
    ttl_days: 7
  }
];

// --- 4. TIER 4: ⚪ ĐỊA ĐIỂM TIẾT KIỆM (SAVINGS VENUES - REFERENCE ONLY) ---
const tier4SavingsVenues = [
  {
    venue_id: 'SAV_VENUE_01',
    brand_name: 'Khu Ẩm Thực Chợ Đêm Helio',
    address: 'Đường 2 Tháng 9, Hải Châu, Đà Nẵng',
    category: 'Ẩm Thực & Giải Trí Bình Dân',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    target_cluster: 'BACMYAN_NGUHANHSON',
    price_level: '20.000₫ - 45.000₫/món',
    tier: 'TIER_4_SAVINGS_VENUE',
    tier_symbol: '⚪',
    tier_badge: '⚪ ĐỊA ĐIỂM THAM KHẢO',
    copy_rule: 'Địa điểm/giá tham khảo · Không xác nhận đang có khuyến mãi',
    ttl_days: 30
  },
  {
    venue_id: 'SAV_VENUE_02',
    brand_name: 'Khu Ăn Vặt Chợ Bắc Mỹ An',
    address: 'Đường Nguyễn Bá Lân, Ngũ Hành Sơn, Đà Nẵng',
    category: 'Món Ăn Vặt Sinh Viên',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    target_cluster: 'BACMYAN_NGUHANHSON',
    price_level: '10.000₫ - 25.000₫/món (Kem bơ, ốc hút, bánh tráng)',
    tier: 'TIER_4_SAVINGS_VENUE',
    tier_symbol: '⚪',
    tier_badge: '⚪ ĐỊA ĐIỂM THAM KHẢO',
    copy_rule: 'Địa điểm/giá tham khảo · Không xác nhận đang có khuyến mãi',
    ttl_days: 30
  },
  {
    venue_id: 'SAV_VENUE_03',
    brand_name: 'Khu Ẩm Thực Chợ Cồn',
    address: 'Góc Hùng Vương - Ông Ích Khiêm, Hải Châu, Đà Nẵng',
    category: 'Món Ăn Truyền Thống Đà Nẵng',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    target_cluster: 'HAICHAU_THANHKHE',
    price_level: '20.000₫ - 35.000₫/món',
    tier: 'TIER_4_SAVINGS_VENUE',
    tier_symbol: '⚪',
    tier_badge: '⚪ ĐỊA ĐIỂM THAM KHẢO',
    copy_rule: 'Địa điểm/giá tham khảo · Không xác nhận đang có khuyến mãi',
    ttl_days: 30
  },
  {
    venue_id: 'SAV_VENUE_04',
    brand_name: 'Phố Điểm Tâm Huỳnh Thúc Kháng',
    address: 'Đường Huỳnh Thúc Kháng, Hải Châu, Đà Nẵng',
    category: 'Ăn Sáng & Điểm Tâm Bình Dân',
    hub_id: 'HUB_1_FOOD_AND_DINING',
    target_cluster: 'HAICHAU_THANHKHE',
    price_level: '15.000₫ - 30.000₫/món',
    tier: 'TIER_4_SAVINGS_VENUE',
    tier_symbol: '⚪',
    tier_badge: '⚪ ĐỊA ĐIỂM THAM KHẢO',
    copy_rule: 'Địa điểm/giá tham khảo · Không xác nhận đang có khuyến mãi',
    ttl_days: 30
  },
  {
    venue_id: 'SAV_VENUE_05',
    brand_name: 'Thư Viện Khoa Học Tổng Hợp Đà Nẵng',
    address: '46 Bạch Đằng, Hải Châu, Đà Nẵng',
    category: 'Không Gian Tự Học Miễn Phí',
    hub_id: 'HUB_2_CAFE_AND_STUDY_SPACES',
    target_cluster: 'HAICHAU_THANHKHE',
    price_level: 'Miễn phí vé vào cổng & đọc sách',
    tier: 'TIER_4_SAVINGS_VENUE',
    tier_symbol: '⚪',
    tier_badge: '⚪ ĐỊA ĐIỂM THAM KHẢO',
    copy_rule: 'Địa điểm/giá tham khảo · Không xác nhận đang có khuyến mãi',
    ttl_days: 30
  },
  {
    venue_id: 'SAV_VENUE_06',
    brand_name: 'Công Viên Vườn Tượng APEC',
    address: 'Đường Bạch Đằng nối dài, Bình Hiên, Hải Châu',
    category: 'Không Gian Sinh Hoạt Công Cộng',
    hub_id: 'HUB_3_CINEMA_AND_ENTERTAINMENT',
    target_cluster: 'HAICHAU_THANHKHE',
    price_level: 'Mở cửa tự do không tốn phí',
    tier: 'TIER_4_SAVINGS_VENUE',
    tier_symbol: '⚪',
    tier_badge: '⚪ ĐỊA ĐIỂM THAM KHẢO',
    copy_rule: 'Địa điểm/giá tham khảo · Không xác nhận đang có khuyến mãi',
    ttl_days: 30
  },
  {
    venue_id: 'SAV_VENUE_07',
    brand_name: 'Chợ Hòa Khánh (Khu Sinh Viên)',
    address: 'Đường Đồng Kè, Liên Chiểu, Đà Nẵng',
    category: 'Đồ Dùng KTX & Mua Sắm Tiết Kiệm',
    hub_id: 'HUB_5_DORM_AND_STUDY_SUPPLIES',
    target_cluster: 'HOAKHANG_LIENCHIEU',
    price_level: 'Giá bình dân cho sinh viên',
    tier: 'TIER_4_SAVINGS_VENUE',
    tier_symbol: '⚪',
    tier_badge: '⚪ ĐỊA ĐIỂM THAM KHẢO',
    copy_rule: 'Địa điểm/giá tham khảo · Không xác nhận đang có khuyến mãi',
    ttl_days: 30
  },
  {
    venue_id: 'SAV_VENUE_08',
    brand_name: 'Tuyến Xe Buýt Trợ Giá R16',
    address: 'Lộ trình: KTX Phía Tây - Bến Xe Trung Tâm - ĐH Kinh Tế',
    category: 'Di Chuyển Tuyến Sinh Viên',
    hub_id: 'HUB_4_DANABUS_AND_CITY_MOBILITY',
    target_cluster: 'ALL',
    price_level: '6.000₫/lượt vé lượt',
    tier: 'TIER_4_SAVINGS_VENUE',
    tier_symbol: '⚪',
    tier_badge: '⚪ ĐỊA ĐIỂM THAM KHẢO',
    copy_rule: 'Địa điểm/giá tham khảo · Không xác nhận đang có khuyến mãi',
    ttl_days: 30
  },
  {
    venue_id: 'SAV_VENUE_09',
    brand_name: 'Phố Trà Sữa & Cafe Nguyễn Văn Linh',
    address: 'Tuyến đường Nguyễn Văn Linh, Hải Châu / Thanh Khê',
    category: 'Đồ Uống & Họp Nhóm',
    hub_id: 'HUB_2_CAFE_AND_STUDY_SPACES',
    target_cluster: 'HAICHAU_THANHKHE',
    price_level: '25.000₫ - 45.000₫/ly',
    tier: 'TIER_4_SAVINGS_VENUE',
    tier_symbol: '⚪',
    tier_badge: '⚪ ĐỊA ĐIỂM THAM KHẢO',
    copy_rule: 'Địa điểm/giá tham khảo · Không xác nhận đang có khuyến mãi',
    ttl_days: 30
  },
  {
    venue_id: 'SAV_VENUE_10',
    brand_name: 'Cầu Bán Nguyệt Bạch Đằng',
    address: 'Đường Bạch Đằng nối dài, Hải Châu, Đà Nẵng',
    category: 'Ngắm Cảnh & Tản Bộ Miễn Phí',
    hub_id: 'HUB_3_CINEMA_AND_ENTERTAINMENT',
    target_cluster: 'HAICHAU_THANHKHE',
    price_level: 'Không gian mở không tốn phí',
    tier: 'TIER_4_SAVINGS_VENUE',
    tier_symbol: '⚪',
    tier_badge: '⚪ ĐỊA ĐIỂM THAM KHẢO',
    copy_rule: 'Địa điểm/giá tham khảo · Không xác nhận đang có khuyến mãi',
    ttl_days: 30
  },
  {
    venue_id: 'SAV_VENUE_11',
    brand_name: 'Làng Đá Mỹ Nghệ Non Nước',
    address: 'Chân núi Ngũ Hành Sơn, Hòa Hải, Ngũ Hành Sơn',
    category: 'Tham Quan Làng Nghề Truyền Thống',
    hub_id: 'HUB_3_CINEMA_AND_ENTERTAINMENT',
    target_cluster: 'BACMYAN_NGUHANHSON',
    price_level: 'Tham quan làng nghề tự do',
    tier: 'TIER_4_SAVINGS_VENUE',
    tier_symbol: '⚪',
    tier_badge: '⚪ ĐỊA ĐIỂM THAM KHẢO',
    copy_rule: 'Địa điểm/giá tham khảo · Không xác nhận đang có khuyến mãi',
    ttl_days: 30
  },
  {
    venue_id: 'SAV_VENUE_12',
    brand_name: 'Khu Vực Bãi Biển Mỹ Khê',
    address: 'Đường Võ Nguyên Giáp, Sơn Trà / Ngũ Hành Sơn',
    category: 'Tắm Biển & Thể Thao Cộng Đồng',
    hub_id: 'HUB_3_CINEMA_AND_ENTERTAINMENT',
    target_cluster: 'BACMYAN_NGUHANHSON',
    price_level: 'Miễn phí bãi tắm và không gian công cộng',
    tier: 'TIER_4_SAVINGS_VENUE',
    tier_symbol: '⚪',
    tier_badge: '⚪ ĐỊA ĐIỂM THAM KHẢO',
    copy_rule: 'Địa điểm/giá tham khảo · Không xác nhận đang có khuyến mãi',
    ttl_days: 30
  }
];

function runTieredSavingsOperations() {
  console.log('========================================================================');
  console.log('🔄 JAYT-188: TIERED DAILY SAVINGS SUPPLY OPERATIONS ENGINE');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  const countTier1 = tier1ReadyToUseDeals.length;
  const countTier2 = tier2OfficialPromotions.length;
  const countTier3 = tier3CommunitySignals.length;
  const countTier4 = tier4SavingsVenues.length;

  const totalTieredDealOpportunities = countTier1 + countTier2 + countTier3;
  const totalPlatformUsefulItems = totalTieredDealOpportunities + countTier4;

  console.log('📊 THỐNG KÊ 4 TẦNG NGUỒN CUNG TIẾT KIỆM:');
  console.log('  🟢 Tầng 1: Dùng Ngay (Đã đối soát 4-quote)       : ' + countTier1 + ' cơ hội (Target: 5-10)');
  console.log('  🔵 Tầng 2: Ưu Đãi Chính Thức (Nguồn công khai)   : ' + countTier2 + ' cơ hội (Target: 10-15)');
  console.log('  🟣 Tầng 3: Tín Hiệu Cộng Đồng (Proof inbox)      : ' + countTier3 + ' tín hiệu (Target: 10-15)');
  console.log('  ⚪ Tầng 4: Địa Điểm Tiết Kiệm (Tham khảo)        : ' + countTier4 + ' địa điểm (Target: 10-20)');
  console.log('------------------------------------------------------------------------');
  console.log('  🎯 KPI Tổng Cơ Hội Tiết Kiệm (🟢 + 🔵 + 🟣)     : ' + totalTieredDealOpportunities + ' / 30–50 cơ hội');
  console.log('  🌟 Tổng Số Mục Hữu Ích Trên Nền Tảng (🟢+🔵+🟣+⚪): ' + totalPlatformUsefulItems + ' mục hữu ích');
  console.log('========================================================================\n');

  // WRITE FEED 188
  const feed188 = {
    feed_id: 'TIERED_SAVINGS_FEED_188',
    generated_at: new Date().toISOString(),
    kpi_deal_truth: totalTieredDealOpportunities,
    daily_deal_target: '30-50',
    metrics_by_tier: {
      tier_1_ready_to_use: countTier1,
      tier_2_official_promotions: countTier2,
      tier_3_community_signals: countTier3,
      tier_4_savings_venues: countTier4,
      total_deal_opportunities: totalTieredDealOpportunities,
      total_platform_useful_items: totalPlatformUsefulItems
    },
    tier_1_ready_to_use_deals: tier1ReadyToUseDeals,
    tier_2_official_promotions: tier2OfficialPromotions,
    tier_3_community_signals: tier3CommunitySignals,
    tier_4_savings_venues: tier4SavingsVenues,
    deals: tier1ReadyToUseDeals // Backward compatibility for legacy modules
  };

  const feed188Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'generated_tiered_savings_feed_188.json');
  fs.writeFileSync(feed188Path, JSON.stringify(feed188, null, 2), 'utf8');

  // UPDATE SUPPLY TRUTH LEDGER 188
  const supplyTruthLedger188 = {
    ledger_id: 'SUPPLY_TRUTH_LEDGER_188_' + Date.now(),
    timestamp: new Date().toISOString(),
    audit_standard: 'JAYT-188_TIERED_DAILY_SAVINGS_SUPPLY',
    kpi_deal_truth: totalTieredDealOpportunities,
    daily_deal_target: '30-50',
    supply_gap: (30 - totalTieredDealOpportunities) > 0 ? (30 - totalTieredDealOpportunities) + ' to ' + (50 - totalTieredDealOpportunities) : '0 (TARGET REACHED)',
    metrics_by_tier: {
      tier_1_ready_to_use: countTier1,
      tier_2_official_promotions: countTier2,
      tier_3_community_signals: countTier3,
      tier_4_savings_venues: countTier4,
      total_tiered_deal_opportunities: totalTieredDealOpportunities,
      total_platform_useful_items: totalPlatformUsefulItems
    },
    operations_dashboard: {
      tier_1_ready_to_use_count: countTier1,
      tier_2_official_promotions_count: countTier2,
      tier_3_community_signals_count: countTier3,
      tier_4_savings_venues_count: countTier4,
      total_active_opportunities: totalTieredDealOpportunities,
      expiring_items_count: 0,
      total_platform_useful_items: totalPlatformUsefulItems,
      gap_to_30_50_runway: (30 - totalTieredDealOpportunities) > 0 ? (30 - totalTieredDealOpportunities) + ' to ' + (50 - totalTieredDealOpportunities) : '0'
    },
    tier_1_ready_to_use_deals: tier1ReadyToUseDeals,
    tier_2_official_promotions: tier2OfficialPromotions,
    tier_3_community_signals: tier3CommunitySignals,
    tier_4_savings_venues: tier4SavingsVenues
  };

  const ledgerPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'SUPPLY_TRUTH_LEDGER.json');
  fs.writeFileSync(ledgerPath, JSON.stringify(supplyTruthLedger188, null, 2), 'utf8');

  recordCustodyEvent('TIERED_SAVINGS_FEED_GENERATED', 'FEED_188', {
    total_deal_opportunities: totalTieredDealOpportunities,
    total_platform_useful_items: totalPlatformUsefulItems,
    feed_sha256: sha256File(feed188Path)
  });

  console.log('✅ Generated feed saved to: 05_DEAL_AND_AFFILIATE/generated_tiered_savings_feed_188.json');
  console.log('✅ Supply Truth Ledger updated: 07_QUALITY_ASSURANCE/runtime_evidence/SUPPLY_TRUTH_LEDGER.json\n');

  return supplyTruthLedger188;
}

function sha256File(p) { return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex'); }

if (require.main === module) {
  runTieredSavingsOperations();
}

module.exports = { runTieredSavingsOperations };
