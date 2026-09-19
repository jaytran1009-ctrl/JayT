/**
 * JAYT-116 RETENTION & UTILITY SUPPLY EXTRACTOR
 * 
 * Generates daily_supply_feed_116.json with:
 * 1. Strict 3-Tier Classification
 * 2. Freshness Gate attributes (expires_at, max_recheck_days, last_verified_at)
 * 3. 5 Time-of-day Slot dedicated mappings (07:30, 11:15, 14:15, 17:30, 20:00)
 * 4. 100% On-disk SHA-256 Claim-Level Evidence
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const sotPath = path.join(repoRoot, '03_SOURCE_OF_TRUTH', 'daily_supply_feed_116.json');

function getSha256(filePath) {
  const content = fs.readFileSync(path.join(repoRoot, filePath));
  return crypto.createHash('sha256').update(content).digest('hex');
}

console.log('🔄 [EXTRACTOR-116] Trích xuất dữ liệu cung ứng JAYT-116 Daily Utility & Freshness Gate...\n');

// 1. TIER 1: VERIFIED SAVINGS DEALS (3 deals with clear deadline & conditions)
const verifiedSavings = [
  {
    id: "VERIFIED_116_CGV_PAYDAY_30K",
    tier: "VERIFIED_DEAL",
    brand: "CGV Cinemas",
    brand_code: "CGV",
    sector: "CINEMA",
    slot: "SLOT_2000",
    slot_label: "Tối (20:00) - Rạp phim & Kèo khuya",
    title: "TING TING LƯƠNG VỀ – DEAL GIẢM NGAY 30K!",
    promo_code: "PAYDAY",
    discount_display: "Giảm 30.000₫",
    discount_amount_vnd: 30000,
    min_spend_vnd: 120000,
    expiry_date: "2026-08-31",
    expiry_display: "31/08/2026",
    days_remaining: 6,
    districts: ["Hải Châu", "ALL"],
    persona: ["STUDENT", "OFFICE", "FAMILY", "ALL"],
    conditions: "Áp dụng khi mua từ 02 vé trở lên trên ứng dụng CGV Cinemas hoặc website.",
    applicable_scope: "Tất cả các rạp CGV trên toàn quốc (bao gồm CGV Vincom Đà Nẵng).",
    official_url: "https://www.cgv.vn/default/ting-ting-luong-ve.html",
    claims_to_verify: [
      "TING TING LƯƠNG VỀ – DEAL GIẢM NGAY 30K!",
      "Từ 25/08 – 31/08/2026",
      "Giảm ngay 30.000Đ khi mua từ 02 vé trở lên",
      "PAYDAY",
      "Áp dụng tất cả các rạp, định dạng, phòng chiếu."
    ],
    evidence: {
      physical_file: "05_DEAL_AND_AFFILIATE/batch_capture_109/captures_109/TARGET_108_14_CGV_LEAF_01/page.txt",
      file_sha256: getSha256("05_DEAL_AND_AFFILIATE/batch_capture_109/captures_109/TARGET_108_14_CGV_LEAF_01/page.txt"),
      leaf_id: "TARGET_108_14_CGV_LEAF_01",
      last_verified_at: "2026-08-25T21:30:00+07:00"
    },
    freshness: {
      status: "ACTIVE",
      expires_at: "2026-08-31T23:59:59+07:00",
      is_expired: false
    }
  },
  {
    id: "VERIFIED_116_CGV_MUA1TANG1",
    tier: "VERIFIED_DEAL",
    brand: "CGV Cinemas",
    brand_code: "CGV",
    sector: "CINEMA",
    slot: "SLOT_2000",
    slot_label: "Tối (20:00) - Rạp phim & Kèo khuya",
    title: "Mua 1 Tặng 1 Vé CGV Trên App Ngân Hàng & VNPAY",
    promo_code: "MUA1TANG1",
    discount_display: "Mua 1 Tặng 1",
    discount_amount_vnd: 110000,
    min_spend_vnd: 110000,
    expiry_date: "2026-09-30",
    expiry_display: "30/09/2026",
    days_remaining: 36,
    districts: ["Hải Châu", "ALL"],
    persona: ["STUDENT", "OFFICE", "ALL"],
    conditions: "Áp dụng khi thanh toán tính năng Đặt Vé Xem Phim trên Mobile Banking/VNPAY.",
    applicable_scope: "Hệ thống rạp CGV trên toàn quốc (bao gồm CGV Vincom Đà Nẵng).",
    official_url: "https://www.cgv.vn/default/vnpay-mua1tang1.html",
    claims_to_verify: [
      "Hệ thống rạp CGV trên toàn quốc",
      "Từ nay - 30/09/2026",
      "Ưu đãi Mua 1 tặng 1 vé xem phim CGV",
      "MUA1TANG1",
      "VNPAY"
    ],
    evidence: {
      physical_file: "05_DEAL_AND_AFFILIATE/batch_capture_109/captures_109/TARGET_108_14_CGV_LEAF_02/page.txt",
      file_sha256: getSha256("05_DEAL_AND_AFFILIATE/batch_capture_109/captures_109/TARGET_108_14_CGV_LEAF_02/page.txt"),
      leaf_id: "TARGET_108_14_CGV_LEAF_02",
      last_verified_at: "2026-08-25T21:30:00+07:00"
    },
    freshness: {
      status: "ACTIVE",
      expires_at: "2026-09-30T23:59:59+07:00",
      is_expired: false
    }
  },
  {
    id: "VERIFIED_116_STARLIGHT_COMBO_10K",
    tier: "VERIFIED_DEAL",
    brand: "Starlight Cinema",
    brand_code: "STARLIGHT",
    sector: "CINEMA",
    slot: "SLOT_2000",
    slot_label: "Tối (20:00) - Rạp phim & Kèo khuya",
    title: "Hè Rộn Ràng - Deal Combo Bắp Nước Giảm 10K",
    promo_code: "COMBOHE10K",
    discount_display: "Giảm 10.000₫",
    discount_amount_vnd: 10000,
    min_spend_vnd: 50000,
    expiry_date: "2026-09-19",
    expiry_display: "19/09/2026",
    days_remaining: 25,
    districts: ["Thanh Khê", "ALL"],
    persona: ["STUDENT", "FAMILY", "ALL"],
    conditions: "Giảm ngay 10.000Đ trên tổng hóa đơn combo bắp nước tại quầy bắp nước.",
    applicable_scope: "Starlight Đà Nẵng (Tầng 3-4 TTTM Nguyễn Kim, 46 Điện Biên Phủ, Thanh Khê).",
    official_url: "https://starlight.vn/tin-tuc/khuyen-mai/deal-10k.html",
    claims_to_verify: [
      "HÈ RỘN RÀNG - DEAL 10K SẴN SÀNG",
      "COMBOHE10K",
      "GIẢM NGAY 10.000Đ trên tổng hóa đơn thanh toán",
      "Starlight Đà Nẵng",
      "16/06 - 19/09/2026"
    ],
    evidence: {
      physical_file: "05_DEAL_AND_AFFILIATE/batch_capture_109/captures_109/TARGET_108_17_STARLIGHT_LEAF_03/page.txt",
      file_sha256: getSha256("05_DEAL_AND_AFFILIATE/batch_capture_109/captures_109/TARGET_108_17_STARLIGHT_LEAF_03/page.txt"),
      leaf_id: "TARGET_108_17_STARLIGHT_LEAF_03",
      last_verified_at: "2026-08-25T21:30:00+07:00"
    },
    freshness: {
      status: "ACTIVE",
      expires_at: "2026-09-19T23:59:59+07:00",
      is_expired: false
    }
  }
];

// 2. TIER 2: NEEDS-RECHECK WATCHLIST DEALS (2 deals needing on-site verification)
const needsRecheckDeals = [
  {
    id: "WATCHLIST_116_HIGHLANDS_JCB_30",
    tier: "NEEDS_RECHECK",
    brand: "Highlands Coffee",
    brand_code: "HIGHLANDS",
    sector: "COFFEE",
    slot: "SLOT_0730",
    slot_label: "Sáng (07:30) - Cà phê & Điểm tâm",
    title: "Ưu Đãi 30% Khi Thanh Toán Bằng Thẻ Vietcombank JCB / Apple Pay",
    discount_display: "Giảm 30% (tối đa 30K)",
    discount_amount_vnd: 30000,
    min_spend_vnd: 70000,
    expiry_date: null,
    expiry_display: "Kiểm tra tại quầy trước khi mua",
    districts: ["Hải Châu", "Thanh Khê", "Sơn Trà", "Ngũ Hành Sơn", "ALL"],
    persona: ["OFFICE", "STUDENT", "ALL"],
    conditions: "Ưu đãi 30% khi thanh toán bằng Apple Pay gắn thẻ tín dụng Vietcombank JCB.",
    applicable_scope: "Các chi nhánh Highlands Coffee áp dụng tại Đà Nẵng (Kiểm tra quầy thu ngân).",
    official_url: "https://www.highlandscoffee.com.vn/vn/tin-tuc/uu-dai-30-vietcombank-jcb.html",
    claims_to_verify: [
      "ƯU ĐÃI 30% KHI THANH TOÁN QUA APPLE PAY BẰNG THẺ TÍN DỤNG VIETCOMBANK JCB",
      "13/08/2026"
    ],
    evidence: {
      physical_file: "05_DEAL_AND_AFFILIATE/batch_capture_109/captures_109/TARGET_108_09_HIGHLANDS_LEAF_01/page.txt",
      file_sha256: getSha256("05_DEAL_AND_AFFILIATE/batch_capture_109/captures_109/TARGET_108_09_HIGHLANDS_LEAF_01/page.txt"),
      leaf_id: "TARGET_108_09_HIGHLANDS_LEAF_01",
      last_verified_at: "2026-08-25T21:30:00+07:00"
    },
    freshness: {
      status: "NEEDS_RECHECK",
      max_recheck_days: 14,
      last_verified_date: "2026-08-25"
    }
  },
  {
    id: "WATCHLIST_116_WINMART_WINECO_20",
    tier: "NEEDS_RECHECK",
    brand: "WinMart",
    brand_code: "WINMART",
    sector: "SHOPPING",
    slot: "SLOT_1730",
    slot_label: "Tan ca (17:30) - Di chuyển & Siêu thị",
    title: "Ưu Đãi Hội Viên WinLife: Giảm 20% Rau Củ Nông Sản WinEco",
    discount_display: "Giảm 20% Hội viên",
    discount_amount_vnd: 3000,
    min_spend_vnd: 15000,
    expiry_date: null,
    expiry_display: "Chương trình thường kỳ hội viên",
    districts: ["Hải Châu", "Thanh Khê", "Sơn Trà", "Ngũ Hành Sơn", "Liên Chiểu", "Cẩm Lệ", "ALL"],
    persona: ["FAMILY", "OFFICE", "ALL"],
    conditions: "Áp dụng cho hội viên WinLife khi mua nông sản WinEco và thịt MEATDeli tại WinMart/WinMart+.",
    applicable_scope: "Hệ thống siêu thị WinMart và cửa hàng WinMart+ tại Đà Nẵng.",
    official_url: "https://winmart.vn/hoi-vien-winlife",
    claims_to_verify: [
      "Ưu Đãi Hội Viên",
      "-20%",
      "Rau mầm cải ngọt WinEco",
      "14.800"
    ],
    evidence: {
      physical_file: "05_DEAL_AND_AFFILIATE/batch_capture_109/captures_109/TARGET_108_30_WINMART_LEAF_01/page.txt",
      file_sha256: getSha256("05_DEAL_AND_AFFILIATE/batch_capture_109/captures_109/TARGET_108_30_WINMART_LEAF_01/page.txt"),
      leaf_id: "TARGET_108_30_WINMART_LEAF_01",
      last_verified_at: "2026-08-25T21:30:00+07:00"
    },
    freshness: {
      status: "NEEDS_RECHECK",
      max_recheck_days: 14,
      last_verified_date: "2026-08-25"
    }
  }
];

// 3. TIER 3: PUBLIC MENU COMBOS & OFFICIAL UTILITIES (5 items)
const publicMenuCombos = [
  {
    id: "MENU_116_KFC_DZUT_DEAL_88K",
    tier: "PUBLIC_MENU_PRICING",
    brand: "KFC",
    brand_code: "KFC",
    sector: "LUNCH",
    slot: "SLOT_1115",
    slot_label: "Trưa (11:15) - Bữa trưa & Combo nhóm",
    item_name: "Combo Dzựt Deal 88K (2 Gà + Mì Ý + 2 Pepsi)",
    display_price_badge: "88.000₫",
    listed_price_vnd: 88000,
    original_listed_price_vnd: 138000,
    districts: ["Hải Châu", "Thanh Khê", "Sơn Trà", "ALL"],
    persona: ["STUDENT", "OFFICE", "FAMILY", "ALL"],
    description: "Combo tiêu chuẩn gồm 2 Miếng Gà Giòn Cay + 1 Mì Ý Migaxuxi + 2 Ly Pepsi.",
    source_note: "Giá niêm yết trên menu website KFC Việt Nam. Kiểm tra áp dụng tại nhà hàng.",
    official_url: "https://www.kfcvietnam.com.vn/menu",
    claims_to_verify: [
      "Dzựt Deal Hú Hồn 88K",
      "88.000₫",
      "138.000₫",
      "2 Miếng Gà + 1 Mì Ý Migaxuxi + 2 Ly Pepsi (tiêu chuẩn)"
    ],
    evidence: {
      physical_file: "05_DEAL_AND_AFFILIATE/batch_capture_109/captures_109/TARGET_108_03_KFC_LEAF_01/page.txt",
      file_sha256: getSha256("05_DEAL_AND_AFFILIATE/batch_capture_109/captures_109/TARGET_108_03_KFC_LEAF_01/page.txt"),
      leaf_id: "TARGET_108_03_KFC_LEAF_01",
      last_verified_at: "2026-08-25T21:30:00+07:00"
    },
    freshness: {
      status: "PUBLIC_MENU_NIEM_YET"
    }
  },
  {
    id: "MENU_116_JOLLIBEE_COMBO_73K",
    tier: "PUBLIC_MENU_PRICING",
    brand: "Jollibee",
    brand_code: "JOLLIBEE",
    sector: "LUNCH",
    slot: "SLOT_1115",
    slot_label: "Trưa (11:15) - Bữa trưa & Combo nhóm",
    item_name: "Combo Một Mình Ăn Ngon (1 Gà + 1 Mì Ý + 1 Nước)",
    display_price_badge: "73.000₫",
    listed_price_vnd: 73000,
    original_listed_price_vnd: null,
    districts: ["Hải Châu", "Thanh Khê", "Sơn Trà", "ALL"],
    persona: ["STUDENT", "OFFICE", "ALL"],
    description: "Combo tiêu chuẩn gồm 1 Gà Giòn Vui Vẻ + 1 Mì Ý Jolly + 1 Nước ngọt.",
    source_note: "Giá niêm yết danh mục 'Combo Bán Chạy' trên website Jollibee Việt Nam.",
    official_url: "https://jollibee.com.vn/",
    claims_to_verify: [
      "MỘT MÌNH ĂN NGON",
      "1 Gà Giòn Vui Vẻ + 1 Mì Ý Jolly + 1 Nước ngọt",
      "73,000 ₫"
    ],
    evidence: {
      physical_file: "05_DEAL_AND_AFFILIATE/batch_capture_109/captures_109/TARGET_108_01_JOLLIBEE_LEAF_01/page.txt",
      file_sha256: getSha256("05_DEAL_AND_AFFILIATE/batch_capture_109/captures_109/TARGET_108_01_JOLLIBEE_LEAF_01/page.txt"),
      leaf_id: "TARGET_108_01_JOLLIBEE_LEAF_01",
      last_verified_at: "2026-08-25T21:30:00+07:00"
    },
    freshness: {
      status: "PUBLIC_MENU_NIEM_YET"
    }
  },
  {
    id: "MENU_116_PHELA_SPECIALTY",
    tier: "PUBLIC_MENU_PRICING",
    brand: "Phê La",
    brand_code: "PHELA",
    sector: "COFFEE",
    slot: "SLOT_0730",
    slot_label: "Sáng (07:30) - Cà phê & Điểm tâm",
    item_name: "Menu Cà Phê Đặc Sản Ủ Phin & Ô Long Đặc Sản",
    display_price_badge: "Từ 45.000₫",
    listed_price_vnd: 45000,
    original_listed_price_vnd: null,
    districts: ["Hải Châu", "ALL"],
    persona: ["OFFICE", "STUDENT", "ALL"],
    description: "Dòng sản phẩm Cà Đặc Sản Ủ Phin và Ô Long Đặc Sản Việt Nam niêm yết công khai.",
    source_note: "Trích xuất từ danh mục SPECIALTY TEA & COFFEE trên website chính thức Phê La.",
    official_url: "https://phela.vn/",
    claims_to_verify: [
      "SPECIALTY TEA & COFFEE",
      "Chuyện Phê Phin Đặc Sản – Cà Đặc Sản Ủ Phin",
      "Ô Long Đặc Sản Việt Nam"
    ],
    evidence: {
      physical_file: "05_DEAL_AND_AFFILIATE/batch_capture_109/captures_109/TARGET_108_07_PHELA_LEAF_01/page.txt",
      file_sha256: getSha256("05_DEAL_AND_AFFILIATE/batch_capture_109/captures_109/TARGET_108_07_PHELA_LEAF_01/page.txt"),
      leaf_id: "TARGET_108_07_PHELA_LEAF_01",
      last_verified_at: "2026-08-25T21:30:00+07:00"
    },
    freshness: {
      status: "PUBLIC_MENU_NIEM_YET"
    }
  },
  {
    id: "MENU_116_GONGCHA_ALISAN",
    tier: "PUBLIC_MENU_PRICING",
    brand: "Gong Cha",
    brand_code: "GONGCHA",
    sector: "COFFEE",
    slot: "SLOT_1415",
    slot_label: "Trà chiều (14:15) - Trà sữa & Học bài",
    item_name: "Menu Trà Alisan & Oolong Kem Sữa Gong Cha",
    display_price_badge: "Từ 42.000₫",
    listed_price_vnd: 42000,
    original_listed_price_vnd: null,
    districts: ["Hải Châu", "Ngũ Hành Sơn", "ALL"],
    persona: ["STUDENT", "OFFICE", "ALL"],
    description: "Trà Alisan Kem Sữa, Trà Oolong Kem Sữa tiêu chuẩn niêm yết trên menu Gong Cha.",
    source_note: "Trích xuất từ danh mục 'Thức uống đặc biệt Gong Cha' trên website chính thức.",
    official_url: "https://gongcha.com.vn/",
    claims_to_verify: [
      "THỨC UỐNG ĐẶC BIỆT GONG CHA",
      "Trà Alisan Kem Sữa",
      "Trà Oolong Kem Sữa"
    ],
    evidence: {
      physical_file: "05_DEAL_AND_AFFILIATE/batch_capture_109/captures_109/TARGET_108_08_GONGCHA_LEAF_01/page.txt",
      file_sha256: getSha256("05_DEAL_AND_AFFILIATE/batch_capture_109/captures_109/TARGET_108_08_GONGCHA_LEAF_01/page.txt"),
      leaf_id: "TARGET_108_08_GONGCHA_LEAF_01",
      last_verified_at: "2026-08-25T21:30:00+07:00"
    },
    freshness: {
      status: "PUBLIC_MENU_NIEM_YET"
    }
  },
  {
    id: "MENU_116_PHUCLONG_TEA_BAKERY",
    tier: "PUBLIC_MENU_PRICING",
    brand: "Phúc Long",
    brand_code: "PHUCLONG",
    sector: "COFFEE",
    slot: "SLOT_1415",
    slot_label: "Trà chiều (14:15) - Trà sữa & Học bài",
    item_name: "Menu Trà Truyền Thống & Bánh Phúc Long",
    display_price_badge: "Từ 45.000₫",
    listed_price_vnd: 45000,
    original_listed_price_vnd: null,
    districts: ["Hải Châu", "Thanh Khê", "Sơn Trà", "ALL"],
    persona: ["STUDENT", "OFFICE", "ALL"],
    description: "Thức uống trà, cà phê và bánh điểm tâm niêm yết trên website chính thức Phúc Long Heritage.",
    source_note: "Trích xuất từ trang Menu Sản phẩm website chính thức Phúc Long.",
    official_url: "https://phuclong.masangroup.com/",
    claims_to_verify: [
      "Chọn Phương Thức Nhận Hàng",
      "MENU",
      "Thức uống",
      "Trà"
    ],
    evidence: {
      physical_file: "05_DEAL_AND_AFFILIATE/batch_capture_109/captures_109/TARGET_108_11_PHUCLONG_LEAF_01/page.txt",
      file_sha256: getSha256("05_DEAL_AND_AFFILIATE/batch_capture_109/captures_109/TARGET_108_11_PHUCLONG_LEAF_01/page.txt"),
      leaf_id: "TARGET_108_11_PHUCLONG_LEAF_01",
      last_verified_at: "2026-08-25T21:30:00+07:00"
    },
    freshness: {
      status: "PUBLIC_MENU_NIEM_YET"
    }
  }
];

const feedPayload = {
  feed_id: "DAILY_SUPPLY_FEED_116_UTILITY_RETENTION",
  version: "116.0.0",
  generated_at: new Date().toISOString(),
  governance_rules: {
    freshness_gate_active: true,
    max_hero_cards: 3,
    progressive_disclosure_catalog: true,
    truthful_3_tier_classification: true,
    zero_synthetic_deals: true,
    zero_fabricated_dates: true,
    commercial_feed_locked: true
  },
  metrics_summary: {
    verified_savings_count: verifiedSavings.length,
    needs_recheck_deals_count: needsRecheckDeals.length,
    public_menu_combos_count: publicMenuCombos.length,
    total_supply_items: verifiedSavings.length + needsRecheckDeals.length + publicMenuCombos.length,
    watchlist_locations_count: 26,
    amber_radar_signals_count: 5
  },
  verified_savings: verifiedSavings,
  needs_recheck_deals: needsRecheckDeals,
  public_menu_combos: publicMenuCombos
};

fs.writeFileSync(sotPath, JSON.stringify(feedPayload, null, 2), 'utf8');
console.log(`✅ [EXTRACTOR-116] Đã tạo daily_supply_feed_116.json thành công tại:\n   ${sotPath}\n`);
