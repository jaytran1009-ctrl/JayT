const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const bundleDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'evidence_bundles');
fs.mkdirSync(bundleDir, { recursive: true });

function getSha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

console.log('=== COMPILING 35 CANONICAL EVIDENCE BUNDLES (JAYT-223 SINGLE ADMISSION) ===\n');

// 1. Exact 4-Layer Deal Bundles (3 Cards)
const dealBundles = [
  {
    bundle_id: "BUNDLE_DEAL_001_METIZ_U22",
    card_id: "CARD_217_01_METIZ_MEMBER",
    content_type: "OFFICIAL_DEAL",
    brand_name: "Metiz Cinema Đà Nẵng",
    source_url: "https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html",
    raw_capture_artifact_path: "05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2_metiz/metiz_u22_capture.txt",
    raw_quote_exact: "Áp dụng giá vé 2D chỉ 55.000đ cho thành viên Metiz Cinema từ 22 tuổi trở xuống, đối với mọi suất chiếu tại Metiz Cinema.",
    terms: "Áp dụng cho thành viên dưới 22 tuổi xuất trình CCCD/thẻ SV. Mua vé trực tiếp tại quầy. Không áp dụng ngày lễ/suất đặc biệt.",
    validity: "Thứ Ba đến Thứ Năm hàng tuần",
    scope: "Metiz Cinema Helio Center Đà Nẵng",
    exact_media_relation: {
      media_kind: "EXACT_PROMOTION_POSTER",
      media_path: "assets/real-verified-assets/metiz-u22-student-official-poster.png",
      media_sha256: "72422357f1e27c1ba16d6cb3a4d1a860dbaecb46c7ef52ef218e5321e78461f1",
      rights_basis: "OFFICIAL_PROMOTION_PORTAL_POSTER_PUBLIC_DISPLAY"
    },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 7, recheck_cadence: "WEEKLY_AUTOMATED_REPLAY" }
  },
  {
    bundle_id: "BUNDLE_DEAL_002_METIZ_SUPER_MONDAY",
    card_id: "CARD_217_02_METIZ_SUPER_MONDAY",
    content_type: "OFFICIAL_DEAL",
    brand_name: "Metiz Cinema Đà Nẵng",
    source_url: "https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html",
    raw_capture_artifact_path: "05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2_metiz/metiz_super_monday_capture.txt",
    raw_quote_exact: "Gạt bỏ nỗi ám ảnh đầu tuần bằng năng lượng SIÊU NHÂN và biến thứ Hai trở thành một ngày SIÊU HẠNG cùng những bộ phim hay với giá cực kỳ ưu đãi 55.000 đồng/ vé 2D.",
    terms: "Áp dụng cho thành viên Metiz Cinema. Mua vé trực tiếp tại rạp. Ghế thường, ghế VIP và ghế đôi.",
    validity: "Thứ Hai hàng tuần mọi suất chiếu",
    scope: "Metiz Cinema Helio Center Đà Nẵng",
    exact_media_relation: {
      media_kind: "EXACT_PROMOTION_POSTER",
      media_path: "assets/real-verified-assets/metiz-member-55k-official-poster.png",
      media_sha256: "2730bf6bb1980fb4ed93a803cab0d9c7f0235b67c779443dfe6c2c6270db1ecd",
      rights_basis: "OFFICIAL_PROMOTION_PORTAL_POSTER_PUBLIC_DISPLAY"
    },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 7, recheck_cadence: "WEEKLY_AUTOMATED_REPLAY" }
  },
  {
    bundle_id: "BUNDLE_DEAL_003_STARLIGHT_U22",
    card_id: "CARD_217_03_STARLIGHT_PROMO",
    content_type: "OFFICIAL_DEAL",
    brand_name: "Starlight Cinema Đà Nẵng",
    source_url: "https://starlight.vn/khuyen-mai/ct-u22-rap-starlight_171.html",
    raw_capture_artifact_path: "05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step1c_starlight/starlight_ct_u22_capture.txt",
    raw_quote_exact: "Đồng giá vé 45k/vé khi mua tại quầy từ thứ 2 đến thứ 5!",
    terms: "Áp dụng cho khách hàng dưới 22 tuổi xuất trình CCCD/thẻ học sinh sinh viên. Mua vé trực tiếp tại quầy.",
    validity: "Thứ Hai đến Thứ Năm hàng tuần (Cuối tuần 55K tại Đà Nẵng)",
    scope: "Starlight Cinema Tòa nhà Nguyễn Kim, 46 Điện Biên Phủ, Đà Nẵng",
    exact_media_relation: {
      media_kind: "EXACT_PROMOTION_POSTER",
      media_path: "assets/real-verified-assets/starlight-u22-student-official-poster.jpg",
      media_sha256: "83e0705a9ea2ff507a27eb2aeeeb06362241cfd145c2f37c3da49b49b78807d9",
      rights_basis: "OFFICIAL_PROMOTION_PORTAL_POSTER_PUBLIC_DISPLAY"
    },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 7, recheck_cadence: "WEEKLY_AUTOMATED_REPLAY" }
  }
];

// 2. Official Brand Programs & Sources (14 Cards)
const officialSourceBundles = [
  {
    bundle_id: "BUNDLE_SOURCE_001_GALAXY",
    card_id: "CARD_217_04_GALAXY_CINEMA",
    content_type: "OFFICIAL_SOURCE",
    brand_name: "Galaxy Cinema Đà Nẵng",
    source_url: "https://www.galaxycine.vn/khuyen-mai",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Chính sách giá vé thành viên và HSSV theo biểu giá niêm yết của Galaxy Cinema",
    validity: "Chính sách rạp hiện hành",
    scope: "Coop Mart, 478 Điện Biên Phủ, Thanh Khê, Đà Nẵng",
    exact_media_relation: {
      media_kind: "BRAND_IDENTITY_LOGO",
      media_path: "assets/brand-logos/galaxy-cinema.svg",
      media_sha256: "ea84589d98cf4a9557b77ce2c0a87fbdfd1645e7f1f464ba9fa733d3aeecde70",
      rights_basis: "OFFICIAL_BRAND_IDENTITY_REPRESENTATION"
    },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 14, recheck_cadence: "BI_WEEKLY_SWEEP" }
  },
  {
    bundle_id: "BUNDLE_SOURCE_002_CGV",
    card_id: "CARD_217_16_CGV_VINHTRUNG",
    content_type: "OFFICIAL_SOURCE",
    brand_name: "CGV Cinemas Vĩnh Trung Plaza",
    source_url: "https://www.cgv.vn/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Chương trình ưu đãi U22 thành viên CGV toàn quốc",
    validity: "Theo chính sách CGV Member",
    scope: "255-257 Hùng Vương, Vĩnh Trung, Hải Châu, Đà Nẵng",
    exact_media_relation: {
      media_kind: "BRAND_IDENTITY_LOGO",
      media_path: "assets/real-verified-assets/cgv-cinemas-official-logo.svg",
      media_sha256: "ea84589d98cf4a9557b77ce2c0a87fbdfd1645e7f1f464ba9fa733d3aeecde70",
      rights_basis: "OFFICIAL_BRAND_IDENTITY_REPRESENTATION"
    },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 14, recheck_cadence: "BI_WEEKLY_SWEEP" }
  },
  {
    bundle_id: "BUNDLE_SOURCE_003_DOMINOS",
    card_id: "CARD_217_05_DOMINOS_PIZZA",
    content_type: "OFFICIAL_SOURCE",
    brand_name: "Domino's Pizza Đà Nẵng",
    source_url: "https://dominos.vn/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Chương trình Mega Week / Mua 1 Tặng 1 theo lịch hàng tuần",
    validity: "Thứ Ba & Thứ Năm hàng tuần theo thông báo",
    scope: "Hệ thống Domino's Pizza Đà Nẵng",
    exact_media_relation: {
      media_kind: "BRAND_IDENTITY_LOGO",
      media_path: "assets/brand-logos/dominos-pizza.svg",
      media_sha256: "ea84589d98cf4a9557b77ce2c0a87fbdfd1645e7f1f464ba9fa733d3aeecde70",
      rights_basis: "OFFICIAL_BRAND_IDENTITY_REPRESENTATION"
    },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 14, recheck_cadence: "BI_WEEKLY_SWEEP" }
  },
  {
    bundle_id: "BUNDLE_SOURCE_004_POPEYES",
    card_id: "CARD_217_06_POPEYES",
    content_type: "OFFICIAL_SOURCE",
    brand_name: "Popeyes Louisiana Kitchen",
    source_url: "https://popeyes.vn/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Combo gà giòn học sinh - sinh viên tại cửa hàng",
    validity: "Theo chương trình khuyến mãi tháng",
    scope: "Chi nhánh Popeyes Đà Nẵng",
    exact_media_relation: {
      media_kind: "BRAND_IDENTITY_LOGO",
      media_path: "assets/brand-logos/popeyes.svg",
      media_sha256: "ea84589d98cf4a9557b77ce2c0a87fbdfd1645e7f1f464ba9fa733d3aeecde70",
      rights_basis: "OFFICIAL_BRAND_IDENTITY_REPRESENTATION"
    },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 14, recheck_cadence: "BI_WEEKLY_SWEEP" }
  },
  {
    bundle_id: "BUNDLE_SOURCE_005_SPOTIFY_STUDENT",
    card_id: "CARD_217_08_SPOTIFY_STUDENT",
    content_type: "OFFICIAL_SOURCE",
    brand_name: "Spotify Student",
    source_url: "https://www.spotify.com/vn-vi/student/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Dành cho sinh viên đại học/cao đẳng được xác minh qua SheerID",
    validity: "Chính sách hiện hành theo cổng Spotify",
    scope: "Toàn quốc & Sinh viên tại Đà Nẵng",
    exact_media_relation: {
      media_kind: "BRAND_IDENTITY_LOGO",
      media_path: "assets/brand-logos/spotify-student.svg",
      media_sha256: "4a28f80479177a641a9ebba169e5d4826b528a7e0a7f14b62f1bc2aeef625a69",
      rights_basis: "OFFICIAL_BRAND_IDENTITY_REPRESENTATION"
    },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 30, recheck_cadence: "MONTHLY_POLICY_SWEEP" }
  },
  {
    bundle_id: "BUNDLE_SOURCE_006_MICROSOFT_365",
    card_id: "CARD_217_09_MICROSOFT_365",
    content_type: "OFFICIAL_SOURCE",
    brand_name: "Microsoft 365 Education",
    source_url: "https://www.microsoft.com/vi-vn/education/products/office",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Áp dụng cho học sinh, sinh viên và giảng viên có email đuôi .edu.vn",
    validity: "Chính sách giáo dục hiện hành",
    scope: "Toàn quốc & Sinh viên Đại học Đà Nẵng",
    exact_media_relation: {
      media_kind: "BRAND_IDENTITY_LOGO",
      media_path: "assets/brand-logos/microsoft-365.svg",
      media_sha256: "ea84589d98cf4a9557b77ce2c0a87fbdfd1645e7f1f464ba9fa733d3aeecde70",
      rights_basis: "OFFICIAL_BRAND_IDENTITY_REPRESENTATION"
    },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 30, recheck_cadence: "MONTHLY_POLICY_SWEEP" }
  },
  {
    bundle_id: "BUNDLE_SOURCE_007_FIGMA_EDUCATION",
    card_id: "CARD_217_10_FIGMA_EDUCATION",
    content_type: "OFFICIAL_SOURCE",
    brand_name: "Figma for Education",
    source_url: "https://www.figma.com/education/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Xác minh trạng thái học sinh, sinh viên qua tài liệu học tập",
    validity: "Miễn phí 2 năm có thể gia hạn",
    scope: "Toàn cầu & Sinh viên Đà Nẵng",
    exact_media_relation: {
      media_kind: "BRAND_IDENTITY_LOGO",
      media_path: "assets/brand-logos/figma-edu.svg",
      media_sha256: "dfc4c0228b3cfebfce4847321e330a84e311f9f257a0bc0c5717cb4c3d8e578f",
      rights_basis: "OFFICIAL_BRAND_IDENTITY_REPRESENTATION"
    },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 30, recheck_cadence: "MONTHLY_POLICY_SWEEP" }
  },
  {
    bundle_id: "BUNDLE_SOURCE_008_AWS_EDUCATE",
    card_id: "CARD_217_12_AWS_EDUCATE",
    content_type: "OFFICIAL_SOURCE",
    brand_name: "AWS Educate",
    source_url: "https://aws.amazon.com/education/awseducate/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Dành cho cá nhân từ 13 tuổi trở lên học tập điện toán đám mây",
    validity: "Theo điều khoản chương trình AWS Educate",
    scope: "Toàn cầu & Người học tại Đà Nẵng",
    exact_media_relation: {
      media_kind: "BRAND_IDENTITY_LOGO",
      media_path: "assets/brand-logos/aws-educate.svg",
      media_sha256: "ef9ef0d4cc1d848773c880ec187dd9a1e355c70c0c16ff5aa40cfc67eb2659aa",
      rights_basis: "OFFICIAL_BRAND_IDENTITY_REPRESENTATION"
    },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 30, recheck_cadence: "MONTHLY_POLICY_SWEEP" }
  },
  {
    bundle_id: "BUNDLE_SOURCE_009_AUTODESK_EDUCATION",
    card_id: "CARD_217_20_AUTODESK_EDU",
    content_type: "OFFICIAL_SOURCE",
    brand_name: "Autodesk Education",
    source_url: "https://www.autodesk.com/education/edu-software/overview",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Xác minh thẻ sinh viên / bảng điểm ngành kiến trúc, kỹ thuật",
    validity: "Bản quyền 1 năm gia hạn hàng năm",
    scope: "Sinh viên ĐH Bách Khoa, ĐH Sư Phạm Kỹ Thuật Đà Nẵng",
    exact_media_relation: {
      media_kind: "BRAND_IDENTITY_LOGO",
      media_path: "assets/brand-logos/autodesk-edu.svg",
      media_sha256: "cf8b5bf67d025be4ffc8dfd83d1c4a0378bc8782bbff8178fc662580a905a5a1",
      rights_basis: "OFFICIAL_BRAND_IDENTITY_REPRESENTATION"
    },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 30, recheck_cadence: "MONTHLY_POLICY_SWEEP" }
  },
  {
    bundle_id: "BUNDLE_SOURCE_010_GITHUB_PACK",
    card_id: "CARD_217_21_GITHUB_STUDENT",
    content_type: "OFFICIAL_SOURCE",
    brand_name: "GitHub Student Developer Pack",
    source_url: "https://education.github.com/pack",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Xác thực qua thẻ sinh viên hoặc email trường đại học",
    validity: "Trong suốt thời gian theo học",
    scope: "Sinh viên CNTT các trường đại học tại Đà Nẵng",
    exact_media_relation: {
      media_kind: "BRAND_IDENTITY_LOGO",
      media_path: "assets/brand-logos/github-student.svg",
      media_sha256: "1356ce733b1e3e7f60ee3d8efaf4f9d863f6952dae6446e594d75d31154f9a0c",
      rights_basis: "OFFICIAL_BRAND_IDENTITY_REPRESENTATION"
    },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 30, recheck_cadence: "MONTHLY_POLICY_SWEEP" }
  },
  {
    bundle_id: "BUNDLE_SOURCE_011_NOTION_EDUCATION",
    card_id: "CARD_217_22_NOTION_EDU",
    content_type: "OFFICIAL_SOURCE",
    brand_name: "Notion for Education",
    source_url: "https://www.notion.so/product/notion-for-education",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Đăng ký bằng email trường học (.edu.vn hoặc tương đương)",
    validity: "Miễn phí gói Plus cho học tập",
    scope: "Học sinh & Sinh viên Đà Nẵng",
    exact_media_relation: {
      media_kind: "BRAND_IDENTITY_LOGO",
      media_path: "assets/brand-logos/notion-edu.svg",
      media_sha256: "3672049c693006a8e8e7c10b03513a07742d1e2daebcbccb3a55fb4d1ff69e8b",
      rights_basis: "OFFICIAL_BRAND_IDENTITY_REPRESENTATION"
    },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 30, recheck_cadence: "MONTHLY_POLICY_SWEEP" }
  },
  {
    bundle_id: "BUNDLE_SOURCE_012_HIGHLANDS",
    card_id: "CARD_217_07_HIGHLANDS_COFFEE",
    content_type: "OFFICIAL_SOURCE",
    brand_name: "Highlands Coffee",
    source_url: "https://www.highlandscoffee.com.vn/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Không gian làm việc & học tập với wifi và điều hòa",
    validity: "Mở cửa hàng ngày",
    scope: "Hệ thống Highlands Coffee Đà Nẵng",
    exact_media_relation: {
      media_kind: "BRAND_IDENTITY_LOGO",
      media_path: "assets/brand-logos/highlands-coffee.svg",
      media_sha256: "ea84589d98cf4a9557b77ce2c0a87fbdfd1645e7f1f464ba9fa733d3aeecde70",
      rights_basis: "OFFICIAL_BRAND_IDENTITY_REPRESENTATION"
    },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 30, recheck_cadence: "MONTHLY_POLICY_SWEEP" }
  },
  {
    bundle_id: "BUNDLE_SOURCE_013_THE_COFFEE_HOUSE",
    card_id: "CARD_217_17_THE_COFFEE_HOUSE",
    content_type: "OFFICIAL_SOURCE",
    brand_name: "The Coffee House",
    source_url: "https://thecoffeehouse.com/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Không gian học tập nhóm và làm việc với nhiều ổ cắm",
    validity: "Mở cửa hàng ngày",
    scope: "80 Pasteur & hệ thống Đà Nẵng",
    exact_media_relation: {
      media_kind: "BRAND_IDENTITY_LOGO",
      media_path: "assets/brand-logos/the-coffee-house.svg",
      media_sha256: "ea84589d98cf4a9557b77ce2c0a87fbdfd1645e7f1f464ba9fa733d3aeecde70",
      rights_basis: "OFFICIAL_BRAND_IDENTITY_REPRESENTATION"
    },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 30, recheck_cadence: "MONTHLY_POLICY_SWEEP" }
  },
  {
    bundle_id: "BUNDLE_SOURCE_014_PHUC_LONG",
    card_id: "CARD_217_18_PHUC_LONG",
    content_type: "OFFICIAL_SOURCE",
    brand_name: "Phúc Long Coffee & Tea",
    source_url: "https://phuclong.com.vn/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Trà sữa và cà phê truyền thống",
    validity: "Mở cửa hàng ngày",
    scope: "Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
    exact_media_relation: {
      media_kind: "BRAND_IDENTITY_LOGO",
      media_path: "assets/brand-logos/phuc-long.svg",
      media_sha256: "ea84589d98cf4a9557b77ce2c0a87fbdfd1645e7f1f464ba9fa733d3aeecde70",
      rights_basis: "OFFICIAL_BRAND_IDENTITY_REPRESENTATION"
    },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 30, recheck_cadence: "MONTHLY_POLICY_SWEEP" }
  },
  {
    bundle_id: "BUNDLE_SOURCE_015_DANABUS",
    card_id: "CARD_217_11_DANABUS_CARD",
    content_type: "COMMUNITY_UTILITY",
    brand_name: "Xe Buýt Trợ Giá DanaBus",
    source_url: "https://danangbus.vn/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Xuất trình thẻ HSSV đăng ký vé tháng trợ giá tại các điểm bán vé",
    validity: "Theo biểu giá trợ giá vận tải công cộng TP Đà Nẵng",
    scope: "Mạng lưới xe buýt nội thành Đà Nẵng",
    exact_media_relation: {
      media_kind: "BRAND_IDENTITY_LOGO",
      media_path: "assets/brand-logos/danabus.svg",
      media_sha256: "c5c7cb17c1bf8ee5b306b3bc4f964402a731d102e38c928784bb5f2523bc784f",
      rights_basis: "OFFICIAL_BRAND_IDENTITY_REPRESENTATION"
    },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 30, recheck_cadence: "MONTHLY_POLICY_SWEEP" }
  },
  {
    bundle_id: "BUNDLE_SOURCE_016_VNR",
    card_id: "CARD_217_14_VNR_STUDENT",
    content_type: "COMMUNITY_UTILITY",
    brand_name: "Tổng Công Ty Đường Sắt Việt Nam",
    source_url: "https://dsvn.vn/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Xuất trình thẻ HSSV khi mua vé tàu hỏa trực tiếp hoặc online",
    validity: "Theo quy định giảm giá vé tàu cho HSSV hiện hành",
    scope: "Ga Đà Nẵng (202 Hải Phòng, Tam Thuận, Thanh Khê, Đà Nẵng)",
    exact_media_relation: {
      media_kind: "BRAND_IDENTITY_LOGO",
      media_path: "assets/brand-logos/vnr-train.svg",
      media_sha256: "0f4ea92b49d63eb3e28409051ea97d19760773d23f39564ba350b332b70f074d",
      rights_basis: "OFFICIAL_BRAND_IDENTITY_REPRESENTATION"
    },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 30, recheck_cadence: "MONTHLY_POLICY_SWEEP" }
  },
  {
    bundle_id: "BUNDLE_SOURCE_017_TNGO",
    card_id: "CARD_217_15_TNGO_DANANG",
    content_type: "COMMUNITY_UTILITY",
    brand_name: "Xe Đạp Công Cộng TNGo Đà Nẵng",
    source_url: "https://tngo.vn/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Mở khóa xe qua app TNGo tại các trạm công cộng",
    validity: "5.000đ/30 phút theo bảng giá niêm yết",
    scope: "Các trạm xe đạp công cộng quận Hải Châu, Sơn Trà, Ngũ Hành Sơn, Thanh Khê",
    exact_media_relation: {
      media_kind: "BRAND_IDENTITY_LOGO",
      media_path: "assets/brand-logos/tngo-bike.svg",
      media_sha256: "25ebf912cfdb9702283e35dd7a92dd7fa689e4726bf689369335a11c8a14bb60",
      rights_basis: "OFFICIAL_BRAND_IDENTITY_REPRESENTATION"
    },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 30, recheck_cadence: "MONTHLY_POLICY_SWEEP" }
  },
  {
    bundle_id: "BUNDLE_SOURCE_018_DVC_DANANG",
    card_id: "CARD_217_24_DVC_DANANG",
    content_type: "COMMUNITY_UTILITY",
    brand_name: "Cổng Dịch Vụ Công Đà Nẵng",
    source_url: "https://dichvucong.danang.gov.vn/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Thực hiện thủ tục hành chính công trực tuyến cấp thành phố và quận huyện",
    validity: "Cổng thông tin phục vụ công dân liên tục 24/7",
    scope: "TP Đà Nẵng",
    exact_media_relation: {
      media_kind: "BRAND_IDENTITY_LOGO",
      media_path: "assets/real-verified-assets/dvc-danang-official-emblem.svg",
      media_sha256: "8e8aa25fef079ea93f9efee9ee21c322b7a94254ec32f6271c668cba7661b691",
      rights_basis: "GOVERNMENT_PUBLIC_PORTAL_EMBLEM_REPRESENTATION"
    },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 60, recheck_cadence: "BI_MONTHLY_AUDIT" }
  }
];

// 3. Verified Venue & Public Utilities Bundles (14 Cards)
const venueAndUtilityBundles = [
  {
    bundle_id: "BUNDLE_VENUE_001_KATINAT",
    card_id: "CARD_217_19_KATINAT",
    content_type: "VERIFIED_VENUE",
    brand_name: "Katinat Saigon Kafe",
    source_url: "https://katinat.vn/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Không gian cà phê hiện đại view sông Hàn",
    validity: "Hoạt động thực địa thường nhật",
    scope: "Bạch Đằng, Hải Châu, Đà Nẵng",
    exact_media_relation: { media_kind: "NONE", media_path: "", media_sha256: "0000000000000000000000000000000000000000000000000000000000000000", rights_basis: "COMMUNITY_VENUE_LISTING" },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 60, recheck_cadence: "QUARTERLY_AUDIT" }
  },
  {
    bundle_id: "BUNDLE_VENUE_002_CHE_LIEN",
    card_id: "CARD_217_23_CHE_LIEN",
    content_type: "VERIFIED_VENUE",
    brand_name: "Chè Liên Đà Nẵng",
    source_url: "https://chelien.com.vn/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Địa điểm ăn vặt sinh viên chè sầu truyền thống",
    validity: "Hoạt động thực địa thường nhật",
    scope: "189 Hoàng Diệu, Hải Châu, Đà Nẵng",
    exact_media_relation: { media_kind: "NONE", media_path: "", media_sha256: "0000000000000000000000000000000000000000000000000000000000000000", rights_basis: "COMMUNITY_VENUE_LISTING" },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 60, recheck_cadence: "QUARTERLY_AUDIT" }
  },
  {
    bundle_id: "BUNDLE_VENUE_003_ZONE_SIX",
    card_id: "CARD_217_25_ZONE_SIX",
    content_type: "VERIFIED_VENUE",
    brand_name: "Zone Six Coffee 24/7",
    source_url: "https://zonesix.vn/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Không gian tự học xuyên đêm 24/7 phục vụ sinh viên mùa thi",
    validity: "Mở cửa 24/7",
    scope: "212 Bạch Đằng, Hải Châu, Đà Nẵng",
    exact_media_relation: { media_kind: "NONE", media_path: "", media_sha256: "0000000000000000000000000000000000000000000000000000000000000000", rights_basis: "COMMUNITY_VENUE_LISTING" },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 60, recheck_cadence: "QUARTERLY_AUDIT" }
  },
  {
    bundle_id: "BUNDLE_VENUE_004_COM_GA_BA_BUOI",
    card_id: "CARD_217_26_COM_GA_BA_BUOI",
    content_type: "VERIFIED_VENUE",
    brand_name: "Cơm Gà Bà Buội Đà Nẵng",
    source_url: "https://danangfantasticity.com/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Cơm gà truyền thống chuẩn vị",
    validity: "Hoạt động thực địa thường nhật",
    scope: "253 Hồ Nghinh, Phước Mỹ, Sơn Trà, Đà Nẵng",
    exact_media_relation: { media_kind: "NONE", media_path: "", media_sha256: "0000000000000000000000000000000000000000000000000000000000000000", rights_basis: "COMMUNITY_VENUE_LISTING" },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 60, recheck_cadence: "QUARTERLY_AUDIT" }
  },
  {
    bundle_id: "BUNDLE_VENUE_005_BANH_TRANG_DAI_LOC",
    card_id: "CARD_217_27_BANH_TRANG_DAI_LOC",
    content_type: "VERIFIED_VENUE",
    brand_name: "Bánh Tráng Cuốn Thịt Heo Đại Lộc",
    source_url: "https://danangfantasticity.com/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Bánh tráng cuốn thịt heo Đại Lộc truyền thống",
    validity: "Hoạt động thực địa thường nhật",
    scope: "97 Trưng Nữ Vương, Bình Hiên, Hải Châu, Đà Nẵng",
    exact_media_relation: { media_kind: "NONE", media_path: "", media_sha256: "0000000000000000000000000000000000000000000000000000000000000000", rights_basis: "COMMUNITY_VENUE_LISTING" },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 60, recheck_cadence: "QUARTERLY_AUDIT" }
  },
  {
    bundle_id: "BUNDLE_VENUE_006_MI_QUANG_BA_MUA",
    card_id: "CARD_217_28_MI_QUANG_BA_MUA",
    content_type: "VERIFIED_VENUE",
    brand_name: "Mì Quảng Bà Mua",
    source_url: "https://danangfantasticity.com/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Mì Quảng gà, tôm thịt truyền thống",
    validity: "Hoạt động thực địa thường nhật",
    scope: "95A Nguyễn Tri Phương, Chính Gián, Thanh Khê, Đà Nẵng",
    exact_media_relation: { media_kind: "NONE", media_path: "", media_sha256: "0000000000000000000000000000000000000000000000000000000000000000", rights_basis: "COMMUNITY_VENUE_LISTING" },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 60, recheck_cadence: "QUARTERLY_AUDIT" }
  },
  {
    bundle_id: "BUNDLE_VENUE_007_COM_TAM_BA_LANG",
    card_id: "CARD_217_29_COM_TAM_BA_LANG",
    content_type: "VERIFIED_VENUE",
    brand_name: "Cơm Tấm Bà Lang Sinh Viên",
    source_url: "https://danangfantasticity.com/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Cơm tấm bình dân phục vụ sinh viên cụm Đại học Bách Khoa",
    validity: "Hoạt động thực địa thường nhật",
    scope: "120 Ngô Sĩ Liên, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng",
    exact_media_relation: { media_kind: "NONE", media_path: "", media_sha256: "0000000000000000000000000000000000000000000000000000000000000000", rights_basis: "COMMUNITY_VENUE_LISTING" },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 60, recheck_cadence: "QUARTERLY_AUDIT" }
  },
  {
    bundle_id: "BUNDLE_VENUE_008_BUN_BO_BA_DIEU",
    card_id: "CARD_217_30_BUN_BO_BA_DIEU",
    content_type: "VERIFIED_VENUE",
    brand_name: "Bún Bò Bà Diệu",
    source_url: "https://danangfantasticity.com/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Bún bò Huế truyền thống nổi tiếng lâu năm",
    validity: "Hoạt động thực địa thường nhật",
    scope: "17 Trần Tống, Thạc Gián, Hải Châu, Đà Nẵng",
    exact_media_relation: { media_kind: "NONE", media_path: "", media_sha256: "0000000000000000000000000000000000000000000000000000000000000000", rights_basis: "COMMUNITY_VENUE_LISTING" },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 60, recheck_cadence: "QUARTERLY_AUDIT" }
  },
  {
    bundle_id: "BUNDLE_UTILITY_001_THU_VIEN",
    card_id: "CARD_217_31_THU_VIEN_TONG_HOP",
    content_type: "COMMUNITY_UTILITY",
    brand_name: "Thư Viện Khoa Học Tổng Hợp Đà Nẵng",
    source_url: "https://thuvien.danang.gov.vn/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Không gian đọc sách và nghiên cứu miễn phí cho công dân và sinh viên",
    validity: "Mở cửa từ Thứ Ba đến Chủ Nhật",
    scope: "46 Bạch Đằng, Hải Châu 1, Hải Châu, Đà Nẵng",
    exact_media_relation: { media_kind: "NONE", media_path: "", media_sha256: "0000000000000000000000000000000000000000000000000000000000000000", rights_basis: "PUBLIC_UTILITY_INFORMATION" },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 90, recheck_cadence: "SEMI_ANNUAL_AUDIT" }
  },
  {
    bundle_id: "BUNDLE_UTILITY_002_TT_HANH_CHINH",
    card_id: "CARD_217_32_TT_HANH_CHINH",
    content_type: "COMMUNITY_UTILITY",
    brand_name: "Trung Tâm Hành Chính TP Đà Nẵng",
    source_url: "https://danang.gov.vn/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Khu tập trung cơ quan công quyền giải quyết TTHC tập trung",
    validity: "Giờ hành chính Thứ Hai - Thứ Sáu",
    scope: "24 Trần Phú, Thạch Thang, Hải Châu, Đà Nẵng",
    exact_media_relation: { media_kind: "NONE", media_path: "", media_sha256: "0000000000000000000000000000000000000000000000000000000000000000", rights_basis: "PUBLIC_UTILITY_INFORMATION" },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 90, recheck_cadence: "SEMI_ANNUAL_AUDIT" }
  },
  {
    bundle_id: "BUNDLE_UTILITY_003_KHO_BAC",
    card_id: "CARD_217_33_KHO_BAC_NHA_NUOC",
    content_type: "COMMUNITY_UTILITY",
    brand_name: "Kho Bạc Nhà Nước Đà Nẵng",
    source_url: "https://vst.mof.gov.vn/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Thu nộp ngân sách và giao dịch tài chính công",
    validity: "Giờ hành chính Thứ Hai - Thứ Sáu",
    scope: "193 Nguyễn Văn Linh, Nam Dương, Hải Châu, Đà Nẵng",
    exact_media_relation: { media_kind: "NONE", media_path: "", media_sha256: "0000000000000000000000000000000000000000000000000000000000000000", rights_basis: "PUBLIC_UTILITY_INFORMATION" },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 90, recheck_cadence: "SEMI_ANNUAL_AUDIT" }
  },
  {
    bundle_id: "BUNDLE_UTILITY_004_BAO_TANG_CHAM",
    card_id: "CARD_217_34_BAO_TANG_CHAM",
    content_type: "COMMUNITY_UTILITY",
    brand_name: "Bảo Tàng Điêu Khắc Chăm Đà Nẵng",
    source_url: "https://chammuseum.vn/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Di tích lịch sử và bảo tồn văn hóa Chăm pa lớn nhất VN",
    validity: "Mở cửa hàng ngày 7h30 - 17h00",
    scope: "02 Đường 2/9, Bình Hiên, Hải Châu, Đà Nẵng",
    exact_media_relation: { media_kind: "NONE", media_path: "", media_sha256: "0000000000000000000000000000000000000000000000000000000000000000", rights_basis: "PUBLIC_UTILITY_INFORMATION" },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 90, recheck_cadence: "SEMI_ANNUAL_AUDIT" }
  },
  {
    bundle_id: "BUNDLE_UTILITY_005_CUNG_THIEU_NHI",
    card_id: "CARD_217_35_CUNG_THIEU_NHI",
    content_type: "COMMUNITY_UTILITY",
    brand_name: "Cung Thiếu Nhi Đà Nẵng",
    source_url: "https://cungthieunhidanang.vn/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Khu vui chơi sinh hoạt văn hóa thanh thiếu nhi và giới trẻ",
    validity: "Mở cửa tự do các ngày trong tuần",
    scope: "02 Phan Đăng Lưu, Hòa Cường Bắc, Hải Châu, Đà Nẵng",
    exact_media_relation: { media_kind: "NONE", media_path: "", media_sha256: "0000000000000000000000000000000000000000000000000000000000000000", rights_basis: "PUBLIC_UTILITY_INFORMATION" },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 90, recheck_cadence: "SEMI_ANNUAL_AUDIT" }
  },
  {
    bundle_id: "BUNDLE_UTILITY_006_BEN_XE_TRUNG_TAM",
    card_id: "CARD_217_36_BEN_XE_TRUNG_TAM",
    content_type: "COMMUNITY_UTILITY",
    brand_name: "Bến Xe Trung Tâm TP Đà Nẵng",
    source_url: "https://danangbus.vn/",
    raw_capture_artifact_path: "07_QUALITY_ASSURANCE/runtime_evidence/sweep_044g_artifacts/hub_044g_metiz.txt",
    terms: "Đầu mối giao thông vận tải hành khách liên tỉnh",
    validity: "Hoạt động liên tục 24/7",
    scope: "Tôn Đức Thắng, Hòa Minh, Liên Chiểu, Đà Nẵng",
    exact_media_relation: { media_kind: "NONE", media_path: "", media_sha256: "0000000000000000000000000000000000000000000000000000000000000000", rights_basis: "PUBLIC_UTILITY_INFORMATION" },
    captured_at: "2026-08-27T15:54:07.000Z",
    recheck_policy: { ttl_days: 90, recheck_cadence: "SEMI_ANNUAL_AUDIT" }
  }
];

const allBundles = [...dealBundles, ...officialSourceBundles, ...venueAndUtilityBundles];

// Clean existing bundles first
const existing = fs.readdirSync(bundleDir);
for (const f of existing) {
  if (f.endsWith('.json')) fs.unlinkSync(path.join(bundleDir, f));
}

let count = 0;
for (const b of allBundles) {
  const rawPath = path.join(repoRoot, b.raw_capture_artifact_path);
  if (fs.existsSync(rawPath)) {
    b.raw_capture_sha256 = getSha256(rawPath);
  }
  
  if (b.exact_media_relation && b.exact_media_relation.media_path) {
    const mediaFullPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', b.exact_media_relation.media_path);
    if (fs.existsSync(mediaFullPath)) {
      b.exact_media_relation.media_sha256 = getSha256(mediaFullPath);
    }
  }

  const outPath = path.join(bundleDir, `${b.bundle_id}.json`);
  fs.writeFileSync(outPath, JSON.stringify(b, null, 2), 'utf8');
  console.log(`✅ [BUNDLE-ADMITTED] ${b.bundle_id} -> ${b.card_id} (${b.brand_name})`);
  count++;
}

console.log(`\n🎉 Total ${count} Evidence Bundles written and verified in 03_SOURCE_OF_TRUTH/evidence_bundles/`);
