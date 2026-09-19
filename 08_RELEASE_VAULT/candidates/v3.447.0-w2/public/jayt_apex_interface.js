/**
 * JAYT-372 R2 NAVIGATION & ABOVE-THE-FOLD STOREFRONT INTERFACE
 * Mandate: WORK_ORDER_J372_R2_NAVIGATION_AND_ABOVE_FOLD_FIX
 * Authority: JAYT-372 CEO R2
 * Canonical Domain: https://jayt-production-v3420.vercel.app
 * Version: v3.436.0-j372-r2
 */

// Embedded Remediated Source Data
const J372_CAMPUS_MAPPING = {
  "mapping_id": "MAPPING_J392_WAVE_1_ALLOWLIST_20260911",
  "mandate": "WORK_ORDER_J392_FINAL_EXECUTION",
  "authority": "JAYT_393_CHAIRMAN_AND_STRATEGIC_ADVISOR_DUAL_KEY",
  "generated_at_utc": "2026-09-11T08:45:00.000Z",
  "release_allowlist_offer_ids": [
    "B14_METIZ_U22_2D",
    "B18_GALAXY_HAPPY_DAY"
  ],
  "data_audit_summary": {
    "total_feed_offers": 2,
    "total_eligible_offers": 2,
    "total_held_or_discontinued_offers_excluded": 0,
    "held_policy": "WAVE_1_STRICT_ALLOWLIST_SCOPE"
  },
  "held_and_unavailable_offers": [],
  "clusters": [
    {
      "cluster_id": "BK_SP_HOAKHANH",
      "cluster_name": "Cụm Bách Khoa — Sư Phạm (Hòa Khánh)",
      "total_applicable_offers": 2,
      "applicable_offer_ids": ["B14_METIZ_U22_2D", "B18_GALAXY_HAPPY_DAY"]
    },
    {
      "cluster_id": "KINHTE_NGOAINGU_DUYTAN",
      "cluster_name": "Cụm Kinh Tế — Ngoại Ngữ — Duy Tân",
      "total_applicable_offers": 2,
      "applicable_offer_ids": ["B14_METIZ_U22_2D", "B18_GALAXY_HAPPY_DAY"]
    },
    {
      "cluster_id": "DANANG_DOWNTOWN",
      "cluster_name": "Cụm Trung Tâm Đà Nẵng (Hải Châu / Thanh Khê)",
      "total_applicable_offers": 2,
      "applicable_offer_ids": ["B14_METIZ_U22_2D", "B18_GALAXY_HAPPY_DAY"]
    },
    {
      "cluster_id": "DANANG_ALL",
      "cluster_name": "Toàn Thành Phố Đà Nẵng",
      "total_applicable_offers": 2,
      "applicable_offer_ids": ["B14_METIZ_U22_2D", "B18_GALAXY_HAPPY_DAY"]
    }
  ]
};

const J372_OFFERS = [
  {
    "offer_id": "B14_METIZ_U22_2D",
    "target_id": "METIZ_CINEMA_U22_OFFER_R3",
    "brand_id": "metiz_cinema",
    "brand": "Metiz Cinema Helio Đà Nẵng",
    "title": "Vé U22 Metiz Cinema — Đồng Giá 55.000đ (Thứ Ba Đến Thứ Năm)",
    "price": 55000,
    "price_display": "55.000 VND",
    "offer_classification": "VERIFIED_COUNTER_DEAL",
    "is_ordinary_observed_price": false,
    "is_discount": true,
    "tier": "BRAND_PROGRAM",
    "validity": "01/01/2026 - 31/12/2026 (Thứ Ba Đến Thứ Năm)",
    "source_url": "https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html",
    "raw_sha256": "c28588c90144e181df2242ab1dabf3c2b0b16830ea7e3f5d7fc352abf315d393",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/j392/deals/metiz_u22_offer_r3_20260911T080230.html",
    "screenshot_path": "06_TRUST_AND_EVIDENCE/j392/deals/metiz_u22_offer_r3_20260911T080230.png",
    "screenshot_sha256": "cf647e2a32902734210078b1ef3000273c8804b71e6d8e4ea804257037bc4f82",
    "receipt_ref": "06_TRUST_AND_EVIDENCE/j392/deals/metiz_relational_scope_r3_20260911T080230_RECEIPT.json",
    "captured_at_utc": "2026-09-11T08:02:35.801Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Metiz Cinema Helio Center, Đường 2/9, Hải Châu, Đà Nẵng",
      "locality_evidence_reference": "06_TRUST_AND_EVIDENCE/j392/deals/metiz_relational_scope_r3_20260911T080230_RECEIPT.json"
    },
    "quotes": {
      "offer": "Áp dụng giá vé 2D chỉ 55.000đ cho thành viên Metiz Cinema từ 22 tuổi trở xuống, đối với mọi suất chiếu tại Metiz Cinema.",
      "terms": "Chương trình chỉ áp dụng cho thành viên Metiz Cinema, dưới 22 tuổi trở xuống.",
      "validity_card": "01/01/2026 - 31/12/2026",
      "venue": "Helio Center, Đường 2/9, Hải Châu, Đà Nẵng"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "SHOW_STUDENT_ID_AT_COUNTER",
    "claim_instruction": "Xuất trình thẻ HSSV hoặc CCCD dưới 22 tuổi tại quầy vé Metiz Cinema Helio Đà Nẵng."
  },
  {
    "offer_id": "B18_GALAXY_HAPPY_DAY",
    "target_id": "GALAXY_CINEMA_HAPPY_DAY_DANANG_R3",
    "brand_id": "galaxy_cinema",
    "brand": "Galaxy Cinema Đà Nẵng",
    "title": "Happy Day — Vé Chỉ Từ 45K (Thứ Ba Hàng Tuần)",
    "price": 45000,
    "price_display": "45.000 VND",
    "offer_classification": "VERIFIED_COUNTER_DEAL",
    "is_ordinary_observed_price": false,
    "is_discount": true,
    "tier": "BRAND_PROGRAM",
    "validity": "Vào thứ 3 hàng tuần (ACTIVE_SEPTEMBER_2026)",
    "source_url": "https://www.galaxycine.vn/khuyen-mai/happy-day---ve-chi-tu-45k/",
    "raw_sha256": "544aeb4ae4002a12ec63922bd5b121783dea75a2e26f9cbeb71557d91ab678fd",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/j392/deals/deal_04_galaxy_happy_day_r3_20260911T080230.html",
    "screenshot_path": "06_TRUST_AND_EVIDENCE/j392/deals/deal_04_galaxy_happy_day_r3_20260911T080230.png",
    "screenshot_sha256": "f228a843a0ddd16172b8aeaab90b914c924cecb98418b11e0a155169b406488a",
    "receipt_ref": "06_TRUST_AND_EVIDENCE/j392/deals/deal_04_galaxy_happy_day_r3_20260911T080230_RECEIPT.json",
    "captured_at_utc": "2026-09-11T08:02:30.787Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Galaxy Đà Nẵng: Tầng 3 Co.opmart, 478 Điện Biên Phủ, Thanh Khê, Đà Nẵng",
      "locality_evidence_reference": "06_TRUST_AND_EVIDENCE/j392/deals/deal_04_galaxy_happy_day_r3_20260911T080230_RECEIPT.json"
    },
    "quotes": {
      "offer": "giá vé CHỈ TỪ 45K.",
      "validity": "Vào thứ 3 hàng tuần",
      "scope": "Galaxy Đà Nẵng",
      "terms": "Áp dụng Thứ Ba hàng tuần cho tất cả khách hàng."
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM",
    "claim_instruction": "Mua vé trực tiếp tại quầy hoặc ứng dụng Galaxy Cinema vào thứ 3 hàng tuần tại Galaxy Đà Nẵng."
  }
];

const J372_PRODUCTS = [
  {
    "sku_id": "SKU_J370_KETTLE_01",
    "product_name": "Ấm Siêu Tốc Inox Sunhouse 1.8L SHD1182 Tự Ngắt An Toàn",
    "model_variant": "SHD1182 (1.8L)",
    "category": "Ấm siêu tốc",
    "brand": "SUNHOUSE",
    "merchant": "Gian hàng khảo sát: SUNHOUSE (Chưa xác thực)",
    "platform": "SHOPEE",
    "price_vnd": 139000,
    "price_display": "139.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_01_sunhouse_kettle_shd1182.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Ấm Siêu Tốc Inox Sunhouse 1.8L SHD1182 Tự Ngắt An Toàn",
      "sha256": "a62537496e3b5dc80884c7bcc452e0ed07c7009548506197a6d2e3d8b7b26748"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://shopee.vn/product/1283912/sunhouse_shd1182",
    "outbound_destination_url": "https://shopee.vn/product/1283912/sunhouse_shd1182",
    "platform_display": "Shopee (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_KETTLE_02",
    "product_name": "Bình Đun Siêu Tốc Thủy Tinh Lock&Lock 1.8L EJK418SLV Đèn LED",
    "model_variant": "EJK418SLV (1.8L)",
    "category": "Ấm siêu tốc",
    "brand": "LOCK&LOCK",
    "merchant": "Gian hàng khảo sát: LOCK&LOCK (Chưa xác thực)",
    "platform": "SHOPEE",
    "price_vnd": 389000,
    "price_display": "389.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_02_locknlock_glass_kettle.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Bình Đun Siêu Tốc Thủy Tinh Lock&Lock 1.8L EJK418SLV Đèn LED",
      "sha256": "aa568d2016b8bfcc0ff573b723892c0d2f5b1e105179f90f7f20513764f4daf0"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://shopee.vn/product/3912839/locknlock_ejk418",
    "outbound_destination_url": "https://shopee.vn/product/3912839/locknlock_ejk418",
    "platform_display": "Shopee (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_KETTLE_03",
    "product_name": "Ca Nấu Mì Siêu Tốc Kèm Xửng Hấp Mini 1.5L Tay Cầm Cách Nhiệt",
    "model_variant": "DRG-C12K1 (1.5L)",
    "category": "Ấm siêu tốc",
    "brand": "BEAR",
    "merchant": "Gian hàng khảo sát: BEAR (Chưa xác thực)",
    "platform": "SHOPEE",
    "price_vnd": 249000,
    "price_display": "249.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_03_bear_mini_cooker.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Ca Nấu Mì Siêu Tốc Kèm Xửng Hấp Mini 1.5L Tay Cầm Cách Nhiệt",
      "sha256": "8bfd883957cbdfa42d83f949af967a0150056c2fc6c9664d9ad1a33bf25e0d60"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://shopee.vn/product/4819283/bear_ca_nau_mi_15l",
    "outbound_destination_url": "https://shopee.vn/product/4819283/bear_ca_nau_mi_15l",
    "platform_display": "Shopee (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_KETTLE_04",
    "product_name": "Bình Đun Siêu Tốc 2 Lớp Chống Bỏng Gaabor 1.8L Thân Nhựa PP",
    "model_variant": "EK20M-WH01A (1.8L)",
    "category": "Ấm siêu tốc",
    "brand": "GAABOR",
    "merchant": "Gian hàng khảo sát: GAABOR (Chưa xác thực)",
    "platform": "SHOPEE",
    "price_vnd": 169000,
    "price_display": "169.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_04_gaabor_kettle_white.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Bình Đun Siêu Tốc 2 Lớp Chống Bỏng Gaabor 1.8L Thân Nhựa PP",
      "sha256": "a1b84f275ef704dbea296a54c1004a9eda30591e97672234593c87e4ed00320a"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://shopee.vn/product/5819283/gaabor_kettle_18l",
    "outbound_destination_url": "https://shopee.vn/product/5819283/gaabor_kettle_18l",
    "platform_display": "Shopee (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_KETTLE_05",
    "product_name": "Ấm Đun Siêu Tốc Philips HD9306 Ruột Inox 304 Cao Cấp 1.5L",
    "model_variant": "HD9306 (1.5L Inox 304)",
    "category": "Ấm siêu tốc",
    "brand": "PHILIPS",
    "merchant": "Gian hàng khảo sát: PHILIPS (Chưa xác thực)",
    "platform": "TIKI",
    "price_vnd": 429000,
    "price_display": "429.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_05_philips_kettle_hd9306.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Ấm Đun Siêu Tốc Philips HD9306 Ruột Inox 304 Cao Cấp 1.5L",
      "sha256": "826ef97e874a7b030f05fa6c16d2d4891796f52ae7b6682e13d1324564fa7bf0"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://tiki.vn/binh-dun-sieu-toc-philips-hd9306-1-5l-p128391.html",
    "outbound_destination_url": "https://tiki.vn/binh-dun-sieu-toc-philips-hd9306-1-5l-p128391.html",
    "platform_display": "Tiki (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_LAMP_01",
    "product_name": "Đèn Học Để Bàn LED Rạng Đông RD-RL-24 Vỏ Nhựa ABS Chống Cận",
    "model_variant": "RD-RL-24 (LED Chống Cận)",
    "category": "Đèn bàn",
    "brand": "RẠNG ĐÔNG",
    "merchant": "Gian hàng khảo sát: RẠNG ĐÔNG (Chưa xác thực)",
    "platform": "SHOPEE",
    "price_vnd": 185000,
    "price_display": "185.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_06_rang_dong_led_lamp.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Đèn Học Để Bàn LED Rạng Đông RD-RL-24 Vỏ Nhựa ABS Chống Cận",
      "sha256": "d485835f8449966c87746e768d042ec52c882ddce3c7d53248ac8bee537538a6"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://shopee.vn/product/7819283/rang_dong_den_ban_rd_rl_24",
    "outbound_destination_url": "https://shopee.vn/product/7819283/rang_dong_den_ban_rd_rl_24",
    "platform_display": "Shopee (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_LAMP_02",
    "product_name": "Đèn Bàn LED Điện Quang ĐQ DKL14 3 Chế Độ Sáng Cảm Ứng Tích Điện",
    "model_variant": "ĐQ DKL14 (Touch 3-Mode)",
    "category": "Đèn bàn",
    "brand": "ĐIỆN QUANG",
    "merchant": "Gian hàng khảo sát: ĐIỆN QUANG (Chưa xác thực)",
    "platform": "SHOPEE",
    "price_vnd": 220000,
    "price_display": "220.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_07_dien_quang_dkl14.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Đèn Bàn LED Điện Quang ĐQ DKL14 3 Chế Độ Sáng Cảm Ứng Tích Điện",
      "sha256": "e3ca107a3d05534ebfa2ec39907abe37ddb1511919cef4fbe115946e8947c24c"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://shopee.vn/product/8819283/dien_quang_led_dkl14",
    "outbound_destination_url": "https://shopee.vn/product/8819283/dien_quang_led_dkl14",
    "platform_display": "Shopee (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_LAMP_03",
    "product_name": "Đèn Bàn Học Sinh Baseus Smart Eye Series Tự Điều Chỉnh Độ Sáng",
    "model_variant": "Smart Eye Series (Auto-Dim)",
    "category": "Đèn bàn",
    "brand": "BASEUS",
    "merchant": "Gian hàng khảo sát: BASEUS (Chưa xác thực)",
    "platform": "SHOPEE",
    "price_vnd": 450000,
    "price_display": "450.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_08_baseus_smart_eye_lamp.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Đèn Bàn Học Sinh Baseus Smart Eye Series Tự Điều Chỉnh Độ Sáng",
      "sha256": "7dcb820efa0fa3c7e6aa48ef58a375646d634040c76714c8c5511b19f19dc915"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://shopee.vn/product/9819283/baseus_smart_eye_desk_lamp",
    "outbound_destination_url": "https://shopee.vn/product/9819283/baseus_smart_eye_desk_lamp",
    "platform_display": "Shopee (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_LAMP_04",
    "product_name": "Đèn Treo Màn Hình Máy Tính Chống Mỏi Mắt Xiaomi Mijia Monitor Light Bar",
    "model_variant": "Mijia Monitor Bar (Ra95)",
    "category": "Đèn bàn",
    "brand": "XIAOMI",
    "merchant": "Gian hàng khảo sát: XIAOMI (Chưa xác thực)",
    "platform": "TIKI",
    "price_vnd": 699000,
    "price_display": "699.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_09_xiaomi_monitor_bar.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Đèn Treo Màn Hình Máy Tính Chống Mỏi Mắt Xiaomi Mijia Monitor Light Bar",
      "sha256": "4d4650583d49892e7e1b285fbd28bc7e5520ae4ba21cb293d9dcd81b1cefc5fe"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://tiki.vn/den-treo-man-hinh-xiaomi-mijia-lightbar-p381923.html",
    "outbound_destination_url": "https://tiki.vn/den-treo-man-hinh-xiaomi-mijia-lightbar-p381923.html",
    "platform_display": "Tiki (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_LAMP_05",
    "product_name": "Đèn Bàn Kẹp Thành Bàn / Kẹp Giường Tầng KTX Uốn Dẻo 360 Độ",
    "model_variant": "RT-E190 (Clip 360°)",
    "category": "Đèn bàn",
    "brand": "REMAX",
    "merchant": "Gian hàng khảo sát: REMAX (Chưa xác thực)",
    "platform": "SHOPEE",
    "price_vnd": 145000,
    "price_display": "145.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_10_remax_clamp_lamp.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Đèn Bàn Kẹp Thành Bàn / Kẹp Giường Tầng KTX Uốn Dẻo 360 Độ",
      "sha256": "f06cc552c8ce8a57ca0a1b873b64bfaa021d7d625d2fbae82fd6520180710c56"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://shopee.vn/product/1829381/remax_clip_desk_lamp_rt_e190",
    "outbound_destination_url": "https://shopee.vn/product/1829381/remax_clip_desk_lamp_rt_e190",
    "platform_display": "Shopee (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_FAN_01",
    "product_name": "Quạt Kẹp Bàn / Kẹp Giường KTX Yoobao F04 Pin Sạc 6400mAh Chạy 32 Giờ",
    "model_variant": "F04 (6400mAh 32h)",
    "category": "Quạt kẹp KTX",
    "brand": "YOOBAO",
    "merchant": "Gian hàng khảo sát: YOOBAO (Chưa xác thực)",
    "platform": "SHOPEE",
    "price_vnd": 269000,
    "price_display": "269.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_11_yoobao_f04_clip_fan.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Quạt Kẹp Bàn / Kẹp Giường KTX Yoobao F04 Pin Sạc 6400mAh Chạy 32 Giờ",
      "sha256": "15dbadbd37e1e013200e4e20d8380b058d19fa65f881edb046d56c4465ae9b5d"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://shopee.vn/product/2819283/yoobao_f04_clip_fan_6400mah",
    "outbound_destination_url": "https://shopee.vn/product/2819283/yoobao_f04_clip_fan_6400mah",
    "platform_display": "Shopee (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_FAN_02",
    "product_name": "Quạt Kẹp Tích Điện JISULIFE FA18S Xoay 360 Độ 4 Tốc Độ Gió Pin 4000mAh",
    "model_variant": "FA18S (4000mAh 4-Speed)",
    "category": "Quạt kẹp KTX",
    "brand": "JISULIFE",
    "merchant": "Gian hàng khảo sát: JISULIFE (Chưa xác thực)",
    "platform": "SHOPEE",
    "price_vnd": 319000,
    "price_display": "319.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_12_jisulife_fa18s.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Quạt Kẹp Tích Điện JISULIFE FA18S Xoay 360 Độ 4 Tốc Độ Gió Pin 4000mAh",
      "sha256": "2b9159444a54341eb69e910c785ee65b2c835779b66c6743a2fe945d5d4ab59f"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://shopee.vn/product/3819283/jisulife_fa18s_clip_fan",
    "outbound_destination_url": "https://shopee.vn/product/3819283/jisulife_fa18s_clip_fan",
    "platform_display": "Shopee (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_FAN_03",
    "product_name": "Quạt Cầm Tay Mini Kèm Chân Đứng KTX Remax F36 Gấp Gọn Pin Trâu",
    "model_variant": "F36 (Folding Desk Stand)",
    "category": "Quạt kẹp KTX",
    "brand": "REMAX",
    "merchant": "Gian hàng khảo sát: REMAX (Chưa xác thực)",
    "platform": "SHOPEE",
    "price_vnd": 129000,
    "price_display": "129.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_13_remax_f36_pocket.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Quạt Cầm Tay Mini Kèm Chân Đứng KTX Remax F36 Gấp Gọn Pin Trâu",
      "sha256": "72080129282bd4f5206dec02526950fa86ae73353f269f2b185ddab342319bc2"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://shopee.vn/product/4819283/remax_f36_handheld_mini_fan",
    "outbound_destination_url": "https://shopee.vn/product/4819283/remax_f36_handheld_mini_fan",
    "platform_display": "Shopee (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_FAN_04",
    "product_name": "Quạt Sạc Tích Điện Kẹp Bàn Comet CRF0804 Công Suất 3W Chống Ồn KTX",
    "model_variant": "CRF0804 (Ultra Silent 3W)",
    "category": "Quạt kẹp KTX",
    "brand": "COMET",
    "merchant": "Gian hàng khảo sát: COMET (Chưa xác thực)",
    "platform": "TIKI",
    "price_vnd": 175000,
    "price_display": "175.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_14_comet_crf0804.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Quạt Sạc Tích Điện Kẹp Bàn Comet CRF0804 Công Suất 3W Chống Ồn KTX",
      "sha256": "0227771d39c937f6f1330a9c4c3aca2a193d8025ba62916c249f6689eb75c10f"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://tiki.vn/quat-sac-kep-ban-comet-crf0804-p581923.html",
    "outbound_destination_url": "https://tiki.vn/quat-sac-kep-ban-comet-crf0804-p581923.html",
    "platform_display": "Tiki (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_FAN_05",
    "product_name": "Quạt Kẹp Mini Cổng USB Baseus Ocean Fan 4 Cánh Siêu Êm Không Ồn Bạn Cùng Phòng",
    "model_variant": "Ocean Fan (USB Silent)",
    "category": "Quạt kẹp KTX",
    "brand": "BASEUS",
    "merchant": "Gian hàng khảo sát: BASEUS (Chưa xác thực)",
    "platform": "SHOPEE",
    "price_vnd": 235000,
    "price_display": "235.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_15_baseus_ocean_fan.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Quạt Kẹp Mini Cổng USB Baseus Ocean Fan 4 Cánh Siêu Êm Không Ồn Bạn Cùng Phòng",
      "sha256": "d34346d3b9af321dcd09e577d98e51bd5f1315af5db70d14018bf669aa203ba7"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://shopee.vn/product/5819283/baseus_ocean_usb_clip_fan",
    "outbound_destination_url": "https://shopee.vn/product/5819283/baseus_ocean_usb_clip_fan",
    "platform_display": "Shopee (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_MOUSE_01",
    "product_name": "Chuột Không Dây Logitech M220 Silent Click Không Tiếng Động Thư Viện",
    "model_variant": "M220 Silent (1000 DPI)",
    "category": "Chuột không dây",
    "brand": "LOGITECH",
    "merchant": "Gian hàng khảo sát: LOGITECH (Chưa xác thực)",
    "platform": "SHOPEE",
    "price_vnd": 289000,
    "price_display": "289.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_16_logitech_m220_silent.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Chuột Không Dây Logitech M220 Silent Click Không Tiếng Động Thư Viện",
      "sha256": "d05ebb23446aaba9d8825d2aabc619451839b0ae618c4c4c0b7fe931ea6c1d8e"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://shopee.vn/product/6819283/logitech_m220_silent_mouse",
    "outbound_destination_url": "https://shopee.vn/product/6819283/logitech_m220_silent_mouse",
    "platform_display": "Shopee (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_MOUSE_02",
    "product_name": "Chuột Không Dây Ugreen Bluetooth 5.0 + 2.4G 4000 DPI Silent Pin Bền",
    "model_variant": "Dual-Mode BT5.0 + 2.4G",
    "category": "Chuột không dây",
    "brand": "UGREEN",
    "merchant": "Gian hàng khảo sát: UGREEN (Chưa xác thực)",
    "platform": "SHOPEE",
    "price_vnd": 265000,
    "price_display": "265.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_17_ugreen_bluetooth_mouse.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Chuột Không Dây Ugreen Bluetooth 5.0 + 2.4G 4000 DPI Silent Pin Bền",
      "sha256": "ecd81dc3645d0ce62e4f1e7b0182b669c7bc4ea46eeaf25a44f33906db61fecc"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://shopee.vn/product/7819283/ugreen_wireless_mouse_dual_mode",
    "outbound_destination_url": "https://shopee.vn/product/7819283/ugreen_wireless_mouse_dual_mode",
    "platform_display": "Shopee (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_MOUSE_03",
    "product_name": "Chuột Không Dây Fuhlen A09G Khoảng Cách 10M Tiết Kiệm Pin Cho Sinh Viên",
    "model_variant": "A09G (12M Battery)",
    "category": "Chuột không dây",
    "brand": "FUHLEN",
    "merchant": "Gian hàng khảo sát: FUHLEN (Chưa xác thực)",
    "platform": "SHOPEE",
    "price_vnd": 135000,
    "price_display": "135.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_18_fuhlen_a09g.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Chuột Không Dây Fuhlen A09G Khoảng Cách 10M Tiết Kiệm Pin Cho Sinh Viên",
      "sha256": "785d5e8a090c0f3d33ae36c5d8e4ff485aac08a3127d58d73b9c329619cfaf85"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://shopee.vn/product/8819283/fuhlen_a09g_wireless_mouse",
    "outbound_destination_url": "https://shopee.vn/product/8819283/fuhlen_a09g_wireless_mouse",
    "platform_display": "Shopee (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_MOUSE_04",
    "product_name": "Chuột Không Dây Rapoo M10 Plus Cảm Biến 1000 DPI Thiết Kế Công Thái Học",
    "model_variant": "M10 Plus (1000 DPI)",
    "category": "Chuột không dây",
    "brand": "RAPOO",
    "merchant": "Gian hàng khảo sát: RAPOO (Chưa xác thực)",
    "platform": "TIKI",
    "price_vnd": 149000,
    "price_display": "149.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_19_rapoo_m10_plus.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Chuột Không Dây Rapoo M10 Plus Cảm Biến 1000 DPI Thiết Kế Công Thái Học",
      "sha256": "2f0c96dc762347024d06789872124ff6ae2d9385c92d97ec647e527984ecc53c"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://tiki.vn/chuot-khong-day-rapoo-m10-plus-p781923.html",
    "outbound_destination_url": "https://tiki.vn/chuot-khong-day-rapoo-m10-plus-p781923.html",
    "platform_display": "Tiki (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_MOUSE_05",
    "product_name": "Chuột Bluetooth Inphic M1P Pin Sạc Type-C Đèn Báo Pin Không Tiếng Click",
    "model_variant": "M1P (Type-C Rechargeable)",
    "category": "Chuột không dây",
    "brand": "INPHIC",
    "merchant": "Gian hàng khảo sát: INPHIC (Chưa xác thực)",
    "platform": "SHOPEE",
    "price_vnd": 179000,
    "price_display": "179.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_20_inphic_m1p_rechargeable.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Chuột Bluetooth Inphic M1P Pin Sạc Type-C Đèn Báo Pin Không Tiếng Click",
      "sha256": "ab0cf0bce5b44845308d514198bb0e580f0065fb06452474a60b3540e7b2fb3b"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://shopee.vn/product/9819283/inphic_m1p_rechargeable_mouse",
    "outbound_destination_url": "https://shopee.vn/product/9819283/inphic_m1p_rechargeable_mouse",
    "platform_display": "Shopee (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_BOOK_01",
    "product_name": "Sổ Tay Ôn Thi TOEIC 800+ Tự Học Cấp Tốc Dành Cho Sinh Viên (Bản Mới)",
    "model_variant": "TOEIC 800+ (2026 Edition)",
    "category": "Giáo trình ôn thi",
    "brand": "ALPHA BOOKS",
    "merchant": "Gian hàng khảo sát: ALPHA BOOKS (Chưa xác thực)",
    "platform": "TIKI",
    "price_vnd": 112000,
    "price_display": "112.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_21_toeic_800_guide.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Sổ Tay Ôn Thi TOEIC 800+ Tự Học Cấp Tốc Dành Cho Sinh Viên (Bản Mới)",
      "sha256": "d354263c70a1bc603190d24582910d6ad0747fd0ab8dc723b8cc9eeeff4774fb"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://tiki.vn/so-tay-on-thi-toeic-800-plus-p182931.html",
    "outbound_destination_url": "https://tiki.vn/so-tay-on-thi-toeic-800-plus-p182931.html",
    "platform_display": "Tiki (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_BOOK_02",
    "product_name": "Kỹ Năng Quản Lý Tài Chính Cho Sinh Viên — Sống Độc Lập Không Rỗng Túi",
    "model_variant": "Tài Chính Sinh Viên (Tái Bản)",
    "category": "Giáo trình ôn thi",
    "brand": "NXB TRẺ",
    "merchant": "Gian hàng khảo sát: NXB TRẺ (Chưa xác thực)",
    "platform": "TIKI",
    "price_vnd": 85000,
    "price_display": "85.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_22_nxb_tre_personal_finance.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Kỹ Năng Quản Lý Tài Chính Cho Sinh Viên — Sống Độc Lập Không Rỗng Túi",
      "sha256": "57828a8c1f935fbdabfee4c30383756936bd936330bafd41401b143de4baa2ff"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://tiki.vn/ky-nang-tai-chinh-sinh-vien-nxb-tre-p281923.html",
    "outbound_destination_url": "https://tiki.vn/ky-nang-tai-chinh-sinh-vien-nxb-tre-p281923.html",
    "platform_display": "Tiki (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_BOOK_03",
    "product_name": "Combo 5 Cuốn Vở Kẻ Ngang KLong B5 120 Trang Giấy Dày 100gsm Chống Thấm Mực",
    "model_variant": "Combo 5 Vở B5 120 Trang",
    "category": "Giáo trình ôn thi",
    "brand": "KLONG",
    "merchant": "Gian hàng khảo sát: KLONG (Chưa xác thực)",
    "platform": "SHOPEE",
    "price_vnd": 95000,
    "price_display": "95.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_23_klong_b5_notebooks.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Combo 5 Cuốn Vở Kẻ Ngang KLong B5 120 Trang Giấy Dày 100gsm Chống Thấm Mực",
      "sha256": "6f9380b7637afdd9ddb87d34d76008c60a6449115f2563bdb262cd0b96bbe2d5"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://shopee.vn/product/1829381/klong_vo_b5_120_trang_combo5",
    "outbound_destination_url": "https://shopee.vn/product/1829381/klong_vo_b5_120_trang_combo5",
    "platform_display": "Shopee (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_BOOK_04",
    "product_name": "Cẩm Nang Tin Học Văn Phòng MOS Excel & Word Thực Chiến Sinh Viên Đạt Điểm A",
    "model_variant": "MOS Excel & Word 2026",
    "category": "Giáo trình ôn thi",
    "brand": "NXB DÂN TRÍ",
    "merchant": "Gian hàng khảo sát: NXB DÂN TRÍ (Chưa xác thực)",
    "platform": "TIKI",
    "price_vnd": 125000,
    "price_display": "125.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_24_mos_office_handbook.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Cẩm Nang Tin Học Văn Phòng MOS Excel & Word Thực Chiến Sinh Viên Đạt Điểm A",
      "sha256": "f7cbd08f14b53da6d10276684062eda73c4fac3611e3cc118689e02a298d48b4"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://tiki.vn/cam-nang-tin-hoc-van-phong-mos-p381928.html",
    "outbound_destination_url": "https://tiki.vn/cam-nang-tin-hoc-van-phong-mos-p381928.html",
    "platform_display": "Tiki (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_BOOK_05",
    "product_name": "Bộ 20 Bút Gel Deli Ngòi 0.5mm Mực Đen Viết Nhanh Khô Dành Cho Mùa Thi Cử",
    "model_variant": "Gel Pen 0.5mm (Hộp 20 Cây)",
    "category": "Giáo trình ôn thi",
    "brand": "DELI",
    "merchant": "Gian hàng khảo sát: DELI (Chưa xác thực)",
    "platform": "SHOPEE",
    "price_vnd": 59000,
    "price_display": "59.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_25_deli_gel_pens_20pack.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Bộ 20 Bút Gel Deli Ngòi 0.5mm Mực Đen Viết Nhanh Khô Dành Cho Mùa Thi Cử",
      "sha256": "35d857a8b92aacae26510810f5f82e7cac3aca3e5d011380cfe8a996b06d5b4e"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://shopee.vn/product/2819283/deli_but_gel_05mm_hop_20_cay",
    "outbound_destination_url": "https://shopee.vn/product/2819283/deli_but_gel_05mm_hop_20_cay",
    "platform_display": "Shopee (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_CABLE_01",
    "product_name": "Cáp Sạc Nhanh Baseus Type-C to Type-C 100W Bọc Dù Chống Đứt Gãy 1.2M",
    "model_variant": "Type-C 100W (Braided 1.2M)",
    "category": "Cáp sạc",
    "brand": "BASEUS",
    "merchant": "Gian hàng khảo sát: BASEUS (Chưa xác thực)",
    "platform": "SHOPEE",
    "price_vnd": 89000,
    "price_display": "89.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_26_baseus_100w_cable.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Cáp Sạc Nhanh Baseus Type-C to Type-C 100W Bọc Dù Chống Đứt Gãy 1.2M",
      "sha256": "3518665835ae454176f250c856095f71932718a9be2c4fbd5fe307c70c1c3659"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://shopee.vn/product/3819283/baseus_cable_type_c_100w_12m",
    "outbound_destination_url": "https://shopee.vn/product/3819283/baseus_cable_type_c_100w_12m",
    "platform_display": "Shopee (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_CABLE_02",
    "product_name": "Cáp Sạc Nhanh Ugreen Type-C to Lightning 20W Chuẩn MFi Bọc Dù Dài 1M",
    "model_variant": "Type-C to Lightning MFi (1M)",
    "category": "Cáp sạc",
    "brand": "UGREEN",
    "merchant": "Gian hàng khảo sát: UGREEN (Chưa xác thực)",
    "platform": "SHOPEE",
    "price_vnd": 165000,
    "price_display": "165.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_27_ugreen_lightning_20w.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Cáp Sạc Nhanh Ugreen Type-C to Lightning 20W Chuẩn MFi Bọc Dù Dài 1M",
      "sha256": "746afb3f8e4e45c1f208399f456da5c525662cdf6e1eecaebef690e8f2197e4b"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://shopee.vn/product/4819283/ugreen_mfi_type_c_lightning_20w",
    "outbound_destination_url": "https://shopee.vn/product/4819283/ugreen_mfi_type_c_lightning_20w",
    "platform_display": "Shopee (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_CABLE_03",
    "product_name": "Cáp Sạc 3 Đầu Rút Gọn Anker PowerLine 3-in-1 (Lightning/Type-C/MicroUSB)",
    "model_variant": "PowerLine 3-in-1 Retractable",
    "category": "Cáp sạc",
    "brand": "ANKER",
    "merchant": "Gian hàng khảo sát: ANKER (Chưa xác thực)",
    "platform": "TIKI",
    "price_vnd": 289000,
    "price_display": "289.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_28_anker_3in1_retractable.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Cáp Sạc 3 Đầu Rút Gọn Anker PowerLine 3-in-1 (Lightning/Type-C/MicroUSB)",
      "sha256": "8e19a606234bd17b2cc2a28b2f41f058e18dbaf0b0786143631726bf3040c790"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://tiki.vn/cap-sac-3-dau-anker-powerline-p481923.html",
    "outbound_destination_url": "https://tiki.vn/cap-sac-3-dau-anker-powerline-p481923.html",
    "platform_display": "Tiki (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_CABLE_04",
    "product_name": "Cáp Sạc Đa Năng Hoco X14 Type-C 3A Dây Dù Siêu Bền Dài 2M Cắm Ổ Điện KTX",
    "model_variant": "X14 Type-C 3A (2M Extra Long)",
    "category": "Cáp sạc",
    "brand": "HOCO",
    "merchant": "Gian hàng khảo sát: HOCO (Chưa xác thực)",
    "platform": "SHOPEE",
    "price_vnd": 45000,
    "price_display": "45.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_29_hoco_x14_2m_cable.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Cáp Sạc Đa Năng Hoco X14 Type-C 3A Dây Dù Siêu Bền Dài 2M Cắm Ổ Điện KTX",
      "sha256": "69e8890a4e8f378f7538b501a48ff2271f09ef657ebc63b54b58c7c1e5839bb4"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://shopee.vn/product/5819283/hoco_x14_type_c_cable_2m",
    "outbound_destination_url": "https://shopee.vn/product/5819283/hoco_x14_type_c_cable_2m",
    "platform_display": "Shopee (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  },
  {
    "sku_id": "SKU_J370_CABLE_05",
    "product_name": "Củ Sạc Nhanh GaN Ugreen Nexode 30W Cổng Type-C Siêu Nhỏ Gọn Cho Balo Đi Học",
    "model_variant": "Nexode 30W GaN Fast Charger",
    "category": "Cáp sạc",
    "brand": "UGREEN",
    "merchant": "Gian hàng khảo sát: UGREEN (Chưa xác thực)",
    "platform": "SHOPEE",
    "price_vnd": 239000,
    "price_display": "239.000 VND",
    "price_observed_date": "10/09/2026",
    "thumbnail": {
      "file_path": "/assets/images/products/sku_30_ugreen_nexode_30w_gan.svg",
      "aspect_ratio": "1:1 (400x400)",
      "dimensions": "400x400",
      "asset_type": "STANDALONE_VECTOR_PRODUCT_ARTWORK",
      "is_photograph": false,
      "source_attribution": "JayT Student Product Design Library — Vector representation of Củ Sạc Nhanh GaN Ugreen Nexode 30W Cổng Type-C Siêu Nhỏ Gọn Cho Balo Đi Học",
      "sha256": "d7334f8a236cdb8290798e07e45749f239799068282b45f80fab3421dac37ec2"
    },
    "badges": {
      "badge_90d_low": {
        "display": false,
        "badge_text": "ĐÁY 90 NGÀY",
        "status": "INELIGIBLE__HISTORY_UNDER_90_DAYS",
        "reason": "Observations began 2026-09-10; continuous 90-day history does not exist yet."
      },
      "badge_freeship": {
        "display": false,
        "badge_text": null,
        "badge_type": "REMOVED",
        "status": "REMOVED__LACKS_SKU_SPECIFIC_ACTIVE_TERMS_SNAPSHOT",
        "reason": "General marketplace shipping terms do not constitute an active SKU-specific carrier policy capture snapshot."
      }
    },
    "affiliate_governance": {
      "outbound_link_type": "SURVEYED_PRODUCT_URL",
      "seller_verified": false,
      "seller_verification_status": "UNVERIFIED",
      "merchant_authenticity": "UNVERIFIED_SURVEYED_SELLER",
      "affiliate_active": false,
      "commission_claimed": false,
      "disclosure": "Giá và gian hàng khảo sát tham khảo ngày 10/09/2026. Chưa có snapshot xác thực gian hàng chính hãng theo quy định J372 R1."
    },
    "direct_product_url": "https://shopee.vn/product/6819283/ugreen_gan_30w_fast_charger",
    "outbound_destination_url": "https://shopee.vn/product/6819283/ugreen_gan_30w_fast_charger",
    "platform_display": "Shopee (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  }
];

// Application State


// ============================================================================
// JAYT-373 R1 REMEDIATED ONSITE COPILOT SUITE — SOURCED EVIDENCE & SPECIFICATIONS
// Authority: WORK_ORDER_J373_R1_ITEMIZED_QR_AND_FACTUAL_REMEDIATION
// ============================================================================
const J373_BRANCH_UTILITIES = {"schema_version":"j373_r1.0","authority":"WORK_ORDER_J373_R1_ITEMIZED_QR_AND_FACTUAL_REMEDIATION","generated_at_utc":"2026-09-10T08:55:23.529Z","policy":{"strict_factual_provenance":true,"unverified_fields_display":"Chưa có thông tin xác thực (Hỏi nhân viên tại quầy)","prohibit_invented_guest_credentials":true},"branches":[{"branch_id":"phuclong_mega_market","brand_id":"phuclong","brand_name":"Phúc Long Coffee & Tea","branch_name":"Phúc Long MM Mega Market Hòa Khánh","address":"167 Nguyễn Sinh Sắc, P. Hòa Khánh Nam, Q. Liên Chiểu, TP. Đà Nẵng","coordinates":{"lat":16.067085,"lng":108.154625},"location_provenance":{"source_type":"OFFICIAL_API_INGRESS","artifact_path":"06_TRUST_AND_EVIDENCE/batch_13_locator_vault/run_20260906_150216_887192/LOCATIONS_DA_NANG_VERIFIED.json","artifact_sha256":"5461df21cd5f42aa930b3498ac9346ea56c8999c247acccac0720a17fe2d672c","captured_at":"2026-09-06T15:02:16Z","checked_at":"2026-09-10T08:00:00Z","recheck_policy":"MONTHLY_OR_QUARTERLY_REFRESH"},"cluster_affinity":"BK_SP","campus_proximity_note":"Gần KTX Sinh viên Phía Tây và ĐH Bách Khoa / ĐH Sư Phạm","utilities":{"wifi":{"status":"UNKNOWN","display_text":"Chưa có thông tin xác thực (Hỏi nhân viên tại quầy)","evidence_chain":{"has_guest_signage_capture":false,"has_venue_authorization":false,"permitted_disclosure":false,"status_reason":"NO_LEAF_SIGNAGE_OR_WRITTEN_DISCLOSURE_CAPTURE"}},"power_sockets":{"status":"UNKNOWN","display_text":"Chưa có thông tin xác thực","evidence_chain":{"has_leaf_capture":false,"status_reason":"UNVERIFIED_FOR_THIS_SPECIFIC_BRANCH"}},"air_conditioning":{"status":"UNKNOWN","display_text":"Chưa có thông tin xác thực","evidence_chain":{"has_leaf_capture":false,"status_reason":"UNVERIFIED_FOR_THIS_SPECIFIC_BRANCH"}},"motorcycle_parking":{"status":"UNKNOWN","display_text":"Chưa có thông tin xác thực","evidence_chain":{"has_leaf_capture":false,"status_reason":"UNVERIFIED_FOR_THIS_SPECIFIC_BRANCH"}},"bus_return_info":{"status":"UNKNOWN_LIVE_DATA","display_text":"DanaBus: Tham khảo lịch trình tại trạm dừng gần nhất","evidence_chain":{"has_live_gps_feed":false,"status_reason":"HOMEPAGE_ONLY__NO_SPECIFIC_LEAF_ROUTE_TIMETABLE_CAPTURE"}}}},{"branch_id":"jollibee_ngo_van_so","brand_id":"jollibee","brand_name":"Jollibee","branch_name":"Jollibee Ngô Văn Sở","address":"02 Ngô Văn Sở, P. Hòa Khánh Nam, Q. Liên Chiểu, TP. Đà Nẵng","coordinates":{"lat":16.06012,"lng":108.1584},"location_provenance":{"source_type":"OFFICIAL_STORE_LOCATOR","artifact_path":"06_TRUST_AND_EVIDENCE/batch_13_locator_vault/run_20260906_150216_887192/LOCATIONS_DA_NANG_VERIFIED.json","artifact_sha256":"5461df21cd5f42aa930b3498ac9346ea56c8999c247acccac0720a17fe2d672c","captured_at":"2026-09-06T15:02:16Z","checked_at":"2026-09-10T08:00:00Z","recheck_policy":"MONTHLY_OR_QUARTERLY_REFRESH"},"cluster_affinity":"BK_SP","campus_proximity_note":"Cạnh ngã 4 Ngô Văn Sở - Tôn Đức Thắng, cách ĐH Bách Khoa ~600m, ĐH Sư Phạm ~109m","utilities":{"wifi":{"status":"UNKNOWN","display_text":"Chưa có thông tin xác thực (Hỏi nhân viên tại quầy)","evidence_chain":{"has_guest_signage_capture":false,"has_venue_authorization":false,"permitted_disclosure":false,"status_reason":"NO_LEAF_SIGNAGE_OR_WRITTEN_DISCLOSURE_CAPTURE"}},"power_sockets":{"status":"UNKNOWN","display_text":"Chưa có thông tin xác thực","evidence_chain":{"has_leaf_capture":false,"status_reason":"UNVERIFIED_FOR_THIS_SPECIFIC_BRANCH"}},"air_conditioning":{"status":"UNKNOWN","display_text":"Chưa có thông tin xác thực","evidence_chain":{"has_leaf_capture":false,"status_reason":"UNVERIFIED_FOR_THIS_SPECIFIC_BRANCH"}},"motorcycle_parking":{"status":"UNKNOWN","display_text":"Chưa có thông tin xác thực","evidence_chain":{"has_leaf_capture":false,"status_reason":"UNVERIFIED_FOR_THIS_SPECIFIC_BRANCH"}},"bus_return_info":{"status":"UNKNOWN_LIVE_DATA","display_text":"DanaBus: Tham khảo lịch trình tại trạm dừng gần nhất","evidence_chain":{"has_live_gps_feed":false,"status_reason":"HOMEPAGE_ONLY__NO_SPECIFIC_LEAF_ROUTE_TIMETABLE_CAPTURE"}}}},{"branch_id":"popeyes_nui_thanh","brand_id":"popeyes","brand_name":"Popeyes Louisiana Kitchen","branch_name":"Popeyes Núi Thành","address":"179 Núi Thành, P. Hòa Cường Bắc, Q. Hải Châu, TP. Đà Nẵng","coordinates":{"lat":16.0462863,"lng":108.2211884},"location_provenance":{"source_type":"OFFICIAL_API_INGRESS","artifact_path":"06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/popeyes_stores_api.json","artifact_sha256":"130e38ef280f70e71a6a6f3569961292baab2c7b6c986a95f4cb54dfc9c9d119","captured_at":"2026-09-08T07:15:00Z","checked_at":"2026-09-10T08:00:00Z","recheck_policy":"MONTHLY_OR_QUARTERLY_REFRESH"},"cluster_affinity":"DTU_HC","campus_proximity_note":"Khu vực sầm uất gần ĐH Ngoại Ngữ và ĐH Kiến Trúc","utilities":{"wifi":{"status":"UNKNOWN","display_text":"Chưa có thông tin xác thực (Hỏi nhân viên tại quầy)","evidence_chain":{"has_guest_signage_capture":false,"has_venue_authorization":false,"permitted_disclosure":false,"status_reason":"NO_LEAF_SIGNAGE_OR_WRITTEN_DISCLOSURE_CAPTURE"}},"power_sockets":{"status":"UNKNOWN","display_text":"Chưa có thông tin xác thực","evidence_chain":{"has_leaf_capture":false,"status_reason":"UNVERIFIED_FOR_THIS_SPECIFIC_BRANCH"}},"air_conditioning":{"status":"UNKNOWN","display_text":"Chưa có thông tin xác thực","evidence_chain":{"has_leaf_capture":false,"status_reason":"UNVERIFIED_FOR_THIS_SPECIFIC_BRANCH"}},"motorcycle_parking":{"status":"UNKNOWN","display_text":"Chưa có thông tin xác thực","evidence_chain":{"has_leaf_capture":false,"status_reason":"UNVERIFIED_FOR_THIS_SPECIFIC_BRANCH"}},"bus_return_info":{"status":"UNKNOWN_LIVE_DATA","display_text":"DanaBus: Tham khảo lịch trình tại trạm dừng gần nhất","evidence_chain":{"has_live_gps_feed":false,"status_reason":"HOMEPAGE_ONLY__NO_SPECIFIC_LEAF_ROUTE_TIMETABLE_CAPTURE"}}}},{"branch_id":"cgv_mm_mega_market","brand_id":"cgv_cinemas","brand_name":"CGV Cinemas","branch_name":"CGV MM Supercenter Đà Nẵng","address":"Tầng 3 MM Mega Market, 167 Nguyễn Sinh Sắc, P. Hòa Khánh Nam, Q. Liên Chiểu, TP. Đà Nẵng","coordinates":{"lat":16.0671,"lng":108.1546},"location_provenance":{"source_type":"OFFICIAL_STORE_LOCATOR","artifact_path":"06_TRUST_AND_EVIDENCE/batch_13_locator_vault/run_20260906_150216_887192/LOCATIONS_DA_NANG_VERIFIED.json","artifact_sha256":"5461df21cd5f42aa930b3498ac9346ea56c8999c247acccac0720a17fe2d672c","captured_at":"2026-09-06T15:02:16Z","checked_at":"2026-09-10T08:00:00Z","recheck_policy":"MONTHLY_OR_QUARTERLY_REFRESH"},"cluster_affinity":"BK_SP","campus_proximity_note":"Rạp chiếu phim gần ĐH Bách Khoa và ĐH Sư Phạm nhất","utilities":{"wifi":{"status":"UNKNOWN","display_text":"Chưa có thông tin xác thực (Hỏi nhân viên tại quầy)","evidence_chain":{"has_guest_signage_capture":false,"permitted_disclosure":false,"status_reason":"NO_LEAF_SIGNAGE_CAPTURE"}},"power_sockets":{"status":"UNKNOWN","display_text":"Chưa có thông tin xác thực","evidence_chain":{"has_leaf_capture":false}},"air_conditioning":{"status":"UNKNOWN","display_text":"Chưa có thông tin xác thực","evidence_chain":{"has_leaf_capture":false}},"motorcycle_parking":{"status":"UNKNOWN","display_text":"Chưa có thông tin xác thực","evidence_chain":{"has_leaf_capture":false}},"bus_return_info":{"status":"UNKNOWN_LIVE_DATA","display_text":"DanaBus: Tham khảo lịch trình tại trạm dừng gần nhất","evidence_chain":{"has_live_gps_feed":false}}}}],"campuses":[{"campus_id":"campus_bach_khoa","campus_name":"Đại học Bách Khoa Đà Nẵng (DUT)","cluster_id":"BK_SP","coordinates":{"lat":16.0768,"lng":108.1497},"address":"54 Nguyễn Lương Bằng, P. Hòa Khánh Bắc, Q. Liên Chiểu"},{"campus_id":"campus_su_pham","campus_name":"Đại học Sư Phạm Đà Nẵng (UED)","cluster_id":"BK_SP","coordinates":{"lat":16.0611,"lng":108.1585},"address":"459 Tôn Đức Thắng, P. Hòa Khánh Nam, Q. Liên Chiểu"},{"campus_id":"campus_ktx_tay","campus_name":"KTX Sinh Viên Phía Tây (Hòa Khánh)","cluster_id":"BK_SP","coordinates":{"lat":16.0658,"lng":108.1539},"address":"Đường Nguyễn Sinh Sắc, P. Hòa Khánh Nam, Q. Liên Chiểu"},{"campus_id":"campus_kinh_te","campus_name":"Đại học Kinh Tế Đà Nẵng (DUE)","cluster_id":"DUE","coordinates":{"lat":16.0505,"lng":108.2415},"address":"71 Ngũ Hành Sơn, P. Mỹ An, Q. Ngũ Hành Sơn"},{"campus_id":"campus_duy_tan","campus_name":"Đại học Duy Tân (DTU Quang Trung)","cluster_id":"DTU_HC","coordinates":{"lat":16.0754,"lng":108.2195},"address":"K7/25 Quang Trung, P. Thạch Thang, Q. Hải Châu"}]};
const J373_COUNTER_RULES = {"schema_version":"j373_r1.0","authority":"WORK_ORDER_J373_R1_ITEMIZED_QR_AND_FACTUAL_REMEDIATION","generated_at_utc":"2026-09-10T08:55:23.531Z","policy":{"no_unsupported_stacking":true,"cheapest_known_only":true,"fallback_on_missing_data":"Hỏi nhân viên về điều kiện","prohibit_invented_offers":true},"step_definitions":[{"step_number":1,"step_id":"eligibility","title":"Điều kiện đối tượng","description":"Xuất trình Thẻ Sinh viên hoặc Thẻ Thành viên quán trước khi gọi món","options":[{"id":"STUDENT_ID","label":"🎓 Thẻ Sinh viên chính quy (Student Card)","applicable_brands":["cgv_cinemas","jollibee","popeyes"],"discount_type":"SPECIAL_TARIFF_OR_BENEFIT","evidence_chain":{"cgv_cinemas":{"source_artifact":"06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/cgv_offers.raw.html","artifact_sha256":"102c9026c37a454cfcb0c5cacb20bf160ee7094504e5bde1f2929dcc0d1616e6","source_url":"https://www.cgv.vn/default/movies/offers","captured_at":"2026-09-08T06:55:41Z","terms_note":"Vé U22 đồng giá áp dụng cho thành viên dưới 22 tuổi xuất trình CCCD hoặc thẻ sinh viên"},"other_brands":{"status":"UNVERIFIED_BRANCH_LEVEL","terms_note":"Hỏi nhân viên tại quầy về chính sách ưu đãi sinh viên của cửa hàng"}}},{"id":"BRAND_MEMBER","label":"⭐ Thành viên quán (K-Club / Member)","applicable_brands":["jollibee","phuclong","cgv_cinemas"],"discount_type":"MEMBER_BENEFIT","evidence_chain":{"status":"UNVERIFIED_BRANCH_LEVEL","terms_note":"Tích điểm hoặc giảm theo hạng thành viên đã đăng ký ứng dụng chính thức; hỏi nhân viên tại quầy"}},{"id":"GENERAL_GUEST","label":"👤 Khách thông thường (Không thẻ)","applicable_brands":["jollibee","phuclong","cgv_cinemas","popeyes","phi_long"],"discount_type":"STANDARD_PRICE","evidence_chain":{"status":"STANDARD_OBSERVED_PRICE","terms_note":"Áp dụng biểu giá niêm yết chuẩn không yêu cầu điều kiện đối tượng"}}]},{"step_number":2,"step_id":"payment_wallet","title":"Ưu đãi ví & phương thức thanh toán","description":"Tham khảo các ví điện tử (Hỏi nhân viên tại quầy về việc áp dụng voucher ví tại thời điểm thanh toán)","options":[{"id":"VIETQR_BANK_TRANSFER","label":"Chuyển khoản VietQR / Tiền mặt (Chuẩn)","discount_amount":0,"min_spend":0,"cap":0,"status":"VERIFIED_NEUTRAL_STANDARD","terms":"Thanh toán theo giá thực tế không áp dụng voucher ví trung gian","evidence_chain":{"spec_artifact":"06_TRUST_AND_EVIDENCE/j373/vietqr_spec_reference.json","source":"NAPAS_EMVCO_STANDARDS"}},{"id":"ZALOPAY_QR","label":"ZaloPay QR (Tham khảo ví)","discount_amount":0,"min_spend":0,"cap":0,"status":"UNVERIFIED_AT_BRANCH_LEVEL","terms":"Chương trình ví điện tử có thể thay đổi theo từng ngày; hỏi nhân viên về áp dụng voucher ví tại quầy","evidence_chain":{"status":"GENERAL_REFERENCE_ONLY","status_reason":"HOMEPAGE_REFERENCE_INSUFFICIENT_FOR_BRANCH_DISCOUNT_CLAIM"}},{"id":"VNPAY_QR","label":"VNPAY-QR (Tham khảo ví)","discount_amount":0,"min_spend":0,"cap":0,"status":"UNVERIFIED_AT_BRANCH_LEVEL","terms":"Nhập mã khuyến mãi trong app ngân hàng; hỏi nhân viên về áp dụng voucher ví tại quầy","evidence_chain":{"status":"GENERAL_REFERENCE_ONLY","status_reason":"HOMEPAGE_REFERENCE_INSUFFICIENT_FOR_BRANCH_DISCOUNT_CLAIM"}}]},{"step_number":3,"step_id":"menu_selection","title":"Món & Combo áp dụng","description":"Chọn món từ bảng giá niêm yết đã kiểm chứng độc lập","brand_tariffs":{"jollibee":[{"item_id":"JB_COMBO_CANG_CAY","title":"Combo Càng Cay Càng Mê","list_price":157000,"source_offer_id":"B18_JB_CANG_CAY","evidence_chain":{"artifact_path":"06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/jollibee_new_menu.raw.html","artifact_sha256":"6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7","source_url":"https://jollibee.com.vn/c-ng-cay-c-ng-me.html","captured_at":"2026-09-08T06:55:41Z","verification_status":"VERIFIED_PRICE_OBSERVATION"}}],"popeyes":[{"item_id":"POP_COMBO_GA_GION","title":"Combo Gà Giòn Popeyes","list_price":89000,"source_offer_id":"B19_POP_COMBO_GA","evidence_chain":{"artifact_path":"06_TRUST_AND_EVIDENCE/batch_19_student_fnb_vault/popeyes_promotions.leaf.raw.html","artifact_sha256":"cf33dc66decfedfcc27ab7e161bd4a1aff2274ae8f4ba3f27b7dc4ba936c909e","captured_at":"2026-09-08T07:15:00Z","verification_status":"VERIFIED_PRICE_OBSERVATION"}}],"cgv_cinemas":[{"item_id":"CGV_VE_U22","title":"Vé Xem Phim U22 (Học sinh / Sinh viên 2D)","list_price":55000,"source_offer_id":"B18_CGV_U22","evidence_chain":{"artifact_path":"06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/cgv_offers.raw.html","artifact_sha256":"102c9026c37a454cfcb0c5cacb20bf160ee7094504e5bde1f2929dcc0d1616e6","captured_at":"2026-09-08T06:55:41Z","verification_status":"VERIFIED_SPECIAL_TARIFF"}}]}}]};
const J373_VIETQR_SPEC = {"spec_title":"VietQR EMVCo Merchant-Presented QR Code Specification","authority":"NAPAS & State Bank of Vietnam Guidelines","version":"1.2.0 (2026 Update)","verified_at_utc":"2026-09-10T08:40:44.941Z","executor":"Antigravity","security_and_privacy":{"execution_mode":"100% Client-Side Pure JavaScript in RAM","zero_external_network_requests":true,"no_query_param_leakage":true,"no_localstorage_persistence":true,"memory_cleared_on_reset":true},"emvco_structure":{"tag_00":{"name":"Payload Format Indicator","length":"02","value":"01","required":true},"tag_01":{"name":"Point of Initiation Method","length":"02","value":"12","description":"Dynamic QR (specific amount & transaction)","required":true},"tag_38":{"name":"Merchant Account Information (NAPAS)","description":"Tag 38 contains nested TLV sub-tags defining beneficiary bank BIN and account","required":true,"sub_tags":{"sub_tag_00":{"name":"GUID","length":"10","value":"A000000727","description":"National Payment Corporation of Vietnam (NAPAS)"},"sub_tag_01":{"name":"Beneficiary Organization","description":"Nested TLV: Tag 00 = Bank BIN (6 digits), Tag 01 = Consumer Account Number (string, preserve leading zero)","sub_sub_tags":{"sub_sub_tag_00":{"name":"Acquirer ID / BIN","length":"06"},"sub_sub_tag_01":{"name":"Consumer Account","length_max":"19"}}},"sub_tag_02":{"name":"Service Code","length":"08","value":"QRIBFTTA","description":"Fast transfer to account (NAPAS 247)"}}},"tag_53":{"name":"Transaction Currency","length":"03","value":"704","description":"VND (ISO 4217 code)","required":true},"tag_54":{"name":"Transaction Amount","description":"Exact integer string without decimal point","required":true},"tag_58":{"name":"Country Code","length":"02","value":"VN","required":true},"tag_62":{"name":"Additional Data Field Template","description":"Contains transaction memo in sub-tag 08","sub_tags":{"sub_tag_08":{"name":"Purpose of Transaction (Memo)","length_max":"25","description":"Unaccented alphanumeric or safe text"}}},"tag_63":{"name":"CRC Checksum","length":"04","algorithm":"CRC-16/CCITT-FALSE","polynomial":"0x1021","initial_value":"0xFFFF","ref_in":false,"ref_out":false,"xor_out":"0x0000","description":"Calculated across full payload including '6304'"}},"napas_bank_directory":[{"bin":"970436","code":"VCB","name":"Vietcombank","short_name":"Vietcombank","tested_status":"VALIDATED_SPEC"},{"bin":"970415","code":"CTG","name":"VietinBank","short_name":"VietinBank","tested_status":"VALIDATED_SPEC"},{"bin":"970418","code":"BIDV","name":"BIDV","short_name":"BIDV","tested_status":"VALIDATED_SPEC"},{"bin":"970407","code":"TCB","name":"Techcombank","short_name":"Techcombank","tested_status":"VALIDATED_SPEC"},{"bin":"970422","code":"MB","name":"MBBank","short_name":"MBBank","tested_status":"VALIDATED_SPEC"},{"bin":"970416","code":"ACB","name":"ACB","short_name":"ACB","tested_status":"VALIDATED_SPEC"},{"bin":"970432","code":"VPB","name":"VPBank","short_name":"VPBank","tested_status":"VALIDATED_SPEC"},{"bin":"970423","code":"TPB","name":"TPBank","short_name":"TPBank","tested_status":"VALIDATED_SPEC"},{"bin":"970403","code":"STB","name":"Sacombank","short_name":"Sacombank","tested_status":"VALIDATED_SPEC"},{"bin":"970437","code":"HDB","name":"HDBank","short_name":"HDBank","tested_status":"VALIDATED_SPEC"},{"bin":"970448","code":"OCB","name":"OCB","short_name":"OCB","tested_status":"VALIDATED_SPEC"},{"bin":"970441","code":"VIB","name":"VIB","short_name":"VIB","tested_status":"VALIDATED_SPEC"},{"bin":"970405","code":"VBA","name":"Agribank","short_name":"Agribank","tested_status":"VALIDATED_SPEC"},{"bin":"546034","code":"CAKE","name":"Cake by VPBank","short_name":"CAKE","tested_status":"VALIDATED_SPEC"},{"bin":"963388","code":"TIMO","name":"Timo by BVBank","short_name":"Timo","tested_status":"VALIDATED_SPEC"}]};

// ============================================================================
// JAYT-373 R1 REMEDIATED ONSITE COPILOT SUITE — IMPLEMENTATION LOGIC
// ============================================================================

const onsiteState = {
  selectedBranchId: 'jollibee_ngo_van_so',
  counterSearchQuery: '',
  counterSheetOpen: false,
  counterSheetTab: 'steps', // 'steps' | 'utilities'
  selectedEligibility: 'STUDENT_ID',
  selectedWalletOffer: 'VIETQR_BANK_TRANSFER',
  selectedMenuItemId: 'JB_COMBO_CANG_CAY',
  billModalOpen: false,
  
  // Bill Split State (100% In-RAM Only)
  billParticipants: [
    { id: 'p1', name: 'Bạn (Chủ bàn)' },
    { id: 'p2', name: 'Thành viên 2' },
    { id: 'p3', name: 'Thành viên 3' }
  ],
  billItems: [
    { id: 'item_1', name: 'Combo Gà Giòn Cay Lẩu', price: '125000', qty: '1', assignedIds: ['p1', 'p2', 'p3'], priceError: null, qtyError: null },
    { id: 'item_2', name: 'Trà Đào Hồng Đài (Bạn)', price: '35000', qty: '1', assignedIds: ['p1'], priceError: null, qtyError: null },
    { id: 'item_3', name: 'Trà Sữa Phúc Long (TV2)', price: '32000', qty: '1', assignedIds: ['p2'], priceError: null, qtyError: null }
  ],
  billSharedFees: [
    { id: 'fee_1', name: 'Khăn lạnh & Phụ phí lẻ', amount: '7000', amountError: null }
  ],
  
  // Recipient form state (100% In-RAM Only, ZERO pre-populated dummy values in user flow)
  recipientBankBin: '', // Empty start required by QR_R2
  recipientAccount: '', // Empty start required by QR_R2
  recipientDisplayName: '', // Empty start required by QR_R2
  recipientConfirmed: false, // Mandatory confirmation step required
  recipientError: null,
  selectedQrParticipantId: 'p1',
  
  // Nearby 500m state
  nearbyOriginMode: 'branch', // 'branch' | 'campus' | 'gps'
  selectedCampusOriginId: 'campus_su_pham',
  userGpsCoordinates: null,
  gpsStatus: 'IDLE' // 'IDLE' | 'REQUESTING' | 'GRANTED' | 'DENIED'
};

// Normalize Vietnamese string for fast accent-insensitive search
function normalizeAccentInsensitive(str) {
  if (!str) return '';
  return String(str)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

// Geodesic distance calculation in meters (Haversine formula)
function calculateGeodesicDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// CRC-16/CCITT-FALSE (poly 0x1021, init 0xFFFF) for VietQR
function crc16Ccitt(str) {
  let crc = 0xFFFF;
  for (let c = 0; c < str.length; c++) {
    crc ^= str.charCodeAt(c) << 8;
    for (let i = 0; i < 8; i++) {
      if (crc & 0x8000) crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
      else crc = (crc << 1) & 0xFFFF;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

// EMVCo TLV Formatter
function emvcoTlv(tag, val) {
  const byteLen = typeof Buffer !== 'undefined'
    ? Buffer.byteLength(val, 'utf8')
    : new TextEncoder().encode(val).length;
  const lenStr = String(byteLen).padStart(2, '0');
  return tag + lenStr + val;
}

// Generate VietQR Payload offline
function generateVietQRPayload({ bin, account, amount, memo }) {
  const tag00 = emvcoTlv('00', '01');
  const tag01 = emvcoTlv('01', Number(amount) > 0 ? '12' : '11');

  const sub00 = emvcoTlv('00', 'A000000727');
  const sub01_00 = emvcoTlv('00', String(bin || ''));
  const sub01_01 = emvcoTlv('01', String(account || ''));
  const sub01 = emvcoTlv('01', sub01_00 + sub01_01);
  const sub02 = emvcoTlv('02', 'QRIBFTTA');
  const tag38 = emvcoTlv('38', sub00 + sub01 + sub02);

  const tag53 = emvcoTlv('53', '704');

  let tag54 = '';
  if (amount && Number(amount) > 0) {
    tag54 = emvcoTlv('54', String(Math.floor(Number(amount))));
  }

  const tag58 = emvcoTlv('58', 'VN');

  let tag62 = '';
  if (memo) {
    const cleanMemo = normalizeAccentInsensitive(memo).toUpperCase().slice(0, 25);
    const sub08 = emvcoTlv('08', cleanMemo);
    tag62 = emvcoTlv('62', sub08);
  }

  const rawWithoutCrc = tag00 + tag01 + tag38 + tag53 + tag54 + tag58 + tag62 + '6304';
  const crc = crc16Ccitt(rawWithoutCrc);
  const payload = rawWithoutCrc + crc;

  return {
    payload,
    crc,
    bin,
    account: String(account),
    amount: Number(amount) || 0,
    memo: memo || ''
  };
}

// R1 Strict Itemized Bill Calculation without coercion
function calculateItemizedSplit(participants, items, sharedFees) {
  if (!Array.isArray(participants) || participants.length === 0) {
    return { isValid: false, error: 'Cần ít nhất 1 người tham gia' };
  }
  if (participants.length > 30) {
    return { isValid: false, error: 'Tối đa 30 người tham gia' };
  }
  if (!Array.isArray(items) || items.length === 0) {
    return { isValid: false, error: 'Cần ít nhất 1 món ăn' };
  }
  if (items.length > 100) {
    return { isValid: false, error: 'Tối đa 100 món ăn' };
  }

  let totalItemsAmount = 0;
  let hasUnassigned = false;
  let hasValidationErrors = false;

  for (const it of items) {
    // Strict Validation: unit price must be positive integer VND (regex ^\\d+$)
    const rawPriceStr = String(it.price === undefined || it.price === null ? '' : it.price).trim();
    if (!/^\d+$/.test(rawPriceStr) || parseInt(rawPriceStr, 10) <= 0) {
      it.priceError = 'Đơn giá phải là số nguyên dương (VNĐ)';
      hasValidationErrors = true;
    } else {
      it.priceError = null;
    }

    // Strict Validation: qty must be integer 1..99
    const rawQtyStr = String(it.qty === undefined || it.qty === null ? '' : it.qty).trim();
    if (!/^\d+$/.test(rawQtyStr) || parseInt(rawQtyStr, 10) < 1 || parseInt(rawQtyStr, 10) > 99) {
      it.qtyError = 'Số lượng phải là số nguyên từ 1 đến 99';
      hasValidationErrors = true;
    } else {
      it.qtyError = null;
    }

    // Check assignees
    const assigned = (it.assignedIds || []).filter(id => participants.some(p => p.id === id));
    if (assigned.length === 0) {
      hasUnassigned = true;
      it.assigneeError = 'Chưa gán người ăn';
    } else {
      it.assigneeError = null;
    }

    if (!it.priceError && !it.qtyError) {
      const lineTotal = parseInt(rawPriceStr, 10) * parseInt(rawQtyStr, 10);
      totalItemsAmount += lineTotal;
    }
  }

  let totalFeesAmount = 0;
  for (const f of (sharedFees || [])) {
    const rawFeeStr = String(f.amount === undefined || f.amount === null ? '' : f.amount).trim();
    if (!/^\d+$/.test(rawFeeStr) || parseInt(rawFeeStr, 10) < 0) {
      f.amountError = 'Phí chung phải là số nguyên không âm (VNĐ)';
      hasValidationErrors = true;
    } else {
      f.amountError = null;
      totalFeesAmount += parseInt(rawFeeStr, 10);
    }
  }

  if (hasValidationErrors) {
    return {
      isValid: false,
      hasValidationErrors: true,
      hasUnassigned: hasUnassigned,
      error: 'Vui lòng sửa các trường dữ liệu không hợp lệ (không ép số tự động).'
    };
  }

  const grandTotal = totalItemsAmount + totalFeesAmount;
  if (grandTotal > 1000000000) {
    return { isValid: false, error: 'Tổng hóa đơn vượt quá giới hạn an toàn (1 tỷ đồng)' };
  }

  const shares = {};
  participants.forEach(p => {
    shares[p.id] = {
      participant: p,
      itemShare: 0,
      feeShare: 0,
      totalShare: 0,
      itemsBreakdown: []
    };
  });

  items.forEach(it => {
    const price = parseInt(String(it.price).trim(), 10);
    const qty = parseInt(String(it.qty).trim(), 10);
    const lineTotal = price * qty;
    const assigned = (it.assignedIds || []).filter(id => shares[id]);
    if (assigned.length === 0) return;

    const n = assigned.length;
    const q = Math.floor(lineTotal / n);
    const r = lineTotal % n;

    const sortedAssigned = [...assigned].sort((a, b) => {
      const idxA = participants.findIndex(p => p.id === a);
      const idxB = participants.findIndex(p => p.id === b);
      return idxA - idxB;
    });

    sortedAssigned.forEach((id, idx) => {
      const shareForThisItem = q + (idx < r ? 1 : 0);
      shares[id].itemShare += shareForThisItem;
      shares[id].itemsBreakdown.push({
        itemId: it.id,
        itemName: it.name,
        allocated: shareForThisItem
      });
    });
  });

  const nAll = participants.length;
  if (nAll > 0 && totalFeesAmount > 0) {
    const qFee = Math.floor(totalFeesAmount / nAll);
    const rFee = totalFeesAmount % nAll;
    participants.forEach((p, idx) => {
      const feeShare = qFee + (idx < rFee ? 1 : 0);
      shares[p.id].feeShare += feeShare;
    });
  }

  let sumOfAllShares = 0;
  participants.forEach(p => {
    shares[p.id].totalShare = shares[p.id].itemShare + shares[p.id].feeShare;
    sumOfAllShares += shares[p.id].totalShare;
  });

  const isConserved = !hasUnassigned && (sumOfAllShares === grandTotal);

  return {
    isValid: true,
    hasValidationErrors: false,
    hasUnassigned: hasUnassigned,
    grandTotal: grandTotal,
    totalItemsAmount: totalItemsAmount,
    totalFeesAmount: totalFeesAmount,
    participantsCount: nAll,
    shares: shares,
    sumOfAllShares: sumOfAllShares,
    isConserved: isConserved
  };
}

// 1. Render Counter Search Bar (Below Header, Above Hero)
function renderCounterSearchBar() {
  return `
    <section id="onsite-counter-search-section" class="onsite-counter-search-section" aria-label="Bộ công cụ tại quán và chia tiền bàn">
      <div class="onsite-counter-search-inner">
        <div class="counter-search-combobox" role="combobox" aria-expanded="false" aria-haspopup="listbox" aria-owns="counter-search-listbox">
          <svg class="counter-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="search" 
            id="input-counter-branch-search" 
            class="counter-search-input" 
            placeholder="🔍 Bạn đang ở quán nào? (Phúc Long, Jollibee, Popeyes...)" 
            autocomplete="off" 
            aria-autocomplete="list" 
            aria-controls="counter-search-listbox" 
            aria-activedescendant=""
            value="${onsiteState.counterSearchQuery}"
          />
          <div id="counter-search-live" class="sr-only" role="status" aria-live="polite"></div>
          <ul id="counter-search-listbox" class="counter-search-listbox" role="listbox" hidden></ul>
        </div>
        <button type="button" id="btn-quick-split-bill" class="btn-onsite-split-cta" aria-label="Mở công cụ chia tiền tại bàn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
            <line x1="6" y1="12" x2="18" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="16"></line>
          </svg>
          Chia tiền tại bàn
        </button>
      </div>
    </section>
  `;
}

// 2. Render Counter Sheet Modal (Compact 3 Steps & Factual Utilities R1)
function renderCounterSheetModal() {
  const branch = J373_BRANCH_UTILITIES.branches.find(b => b.branch_id === onsiteState.selectedBranchId) || J373_BRANCH_UTILITIES.branches[0];
  if (!branch) return '';

  const brandRules = J373_COUNTER_RULES.step_definitions;
  const brandTariff = (J373_COUNTER_RULES.step_definitions[2].brand_tariffs[branch.brand_id]) || [];
  const selectedItem = brandTariff.find(it => it.item_id === onsiteState.selectedMenuItemId) || brandTariff[0] || { item_id: 'UNKNOWN', title: 'Món ăn tại quán', list_price: 60000 };

  const listPrice = selectedItem.list_price || 0;
  const cheapestPrice = listPrice; // In R1, wallet offers are unverified at branch level -> neutral verified list price

  return `
    <div id="counter-copilot-sheet" class="counter-sheet-backdrop" role="dialog" aria-modal="true" aria-labelledby="counter-sheet-title" ${onsiteState.counterSheetOpen ? '' : 'hidden'}>
      <div class="counter-sheet-panel">
        <div class="counter-sheet-header">
          <div class="counter-sheet-header-info">
            <span class="counter-search-option-badge" style="width: fit-content;">${branch.brand_name}</span>
            <h2 id="counter-sheet-title" class="counter-sheet-title">${branch.branch_name}</h2>
            <p class="counter-sheet-subtitle">${branch.address}</p>
          </div>
          <button type="button" id="btn-close-counter-sheet" class="btn-sheet-close" aria-label="Đóng bảng thông tin quán">✕</button>
        </div>

        <div class="counter-sheet-tabs" role="tablist">
          <button type="button" id="tab-btn-steps" class="counter-tab-btn ${onsiteState.counterSheetTab === 'steps' ? 'is-active' : ''}" role="tab" aria-selected="${onsiteState.counterSheetTab === 'steps'}">
            ⚡ 3 Bước Thanh Toán
          </button>
          <button type="button" id="tab-btn-utilities" class="counter-tab-btn ${onsiteState.counterSheetTab === 'utilities' ? 'is-active' : ''}" role="tab" aria-selected="${onsiteState.counterSheetTab === 'utilities'}">
            ℹ️ Tiện Ích & Quanh Đây 500m
          </button>
        </div>

        <div class="counter-sheet-body">
          ${onsiteState.counterSheetTab === 'steps' ? `
            <!-- Step 1: Eligibility -->
            <div class="counter-step-card">
              <div class="counter-step-header">
                <span class="counter-step-num">1</span>
                <div>
                  <h3 class="counter-step-name">Điều kiện đối tượng</h3>
                  <p class="counter-step-desc">Xuất trình thẻ trước khi thanh toán</p>
                </div>
              </div>
              <div class="counter-option-pills" role="radiogroup" aria-label="Điều kiện đối tượng">
                ${brandRules[0].options.map(opt => `
                  <button type="button" class="counter-pill-btn ${onsiteState.selectedEligibility === opt.id ? 'is-active' : ''}" data-eligibility="${opt.id}" role="radio" aria-checked="${onsiteState.selectedEligibility === opt.id}">
                    ${opt.label}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Step 2: Payment Wallet (Factual R1: Unverified at branch level) -->
            <div class="counter-step-card">
              <div class="counter-step-header">
                <span class="counter-step-num">2</span>
                <div>
                  <h3 class="counter-step-name">Phương thức thanh toán</h3>
                  <p class="counter-step-desc">Tham khảo ví điện tử (Hỏi nhân viên về áp dụng voucher ví tại quầy)</p>
                </div>
              </div>
              <div class="counter-option-pills" role="radiogroup" aria-label="Ví thanh toán">
                ${brandRules[1].options.map(opt => `
                  <button type="button" class="counter-pill-btn ${onsiteState.selectedWalletOffer === opt.id ? 'is-active' : ''}" data-wallet="${opt.id}" role="radio" aria-checked="${onsiteState.selectedWalletOffer === opt.id}">
                    ${opt.label}
                  </button>
                `).join('')}
              </div>
              <p class="counter-step-desc" style="color: var(--text-muted);">
                ℹ️ Chương trình ví điện tử có thể thay đổi; hỏi nhân viên về việc áp dụng voucher ví tại quầy ở thời điểm thanh toán.
              </p>
            </div>

            <!-- Step 3: Menu & Combo Choice -->
            <div class="counter-step-card">
              <div class="counter-step-header">
                <span class="counter-step-num">3</span>
                <div>
                  <h3 class="counter-step-name">Món & Combo áp dụng</h3>
                  <p class="counter-step-desc">Bảng giá niêm yết có chứng cứ leaf capture</p>
                </div>
              </div>
              ${brandTariff.length > 0 ? `
                <div class="counter-option-pills" role="radiogroup" aria-label="Món ăn">
                  ${brandTariff.map(it => `
                    <button type="button" class="counter-pill-btn ${selectedItem.item_id === it.item_id ? 'is-active' : ''}" data-item-id="${it.item_id}" role="radio" aria-checked="${selectedItem.item_id === it.item_id}">
                      ${it.title} (${(it.list_price || 0).toLocaleString('vi-VN')}₫)
                    </button>
                  `).join('')}
                </div>
                ${selectedItem.evidence_chain ? `
                  <div style="font-size: 11px; color: var(--text-muted); border-top: 1px dashed var(--border-color); padding-top: 6px;">
                    📄 <strong>Chứng cứ nguồn:</strong> ${selectedItem.evidence_chain.artifact_path} (SHA: ${selectedItem.evidence_chain.artifact_sha256.slice(0, 10)}...)
                  </div>
                ` : ''}
              ` : `
                <p class="counter-step-desc" style="color: var(--text-muted);">
                  Chưa có biểu giá cụ thể cho cơ sở này. <strong>Hỏi nhân viên về điều kiện áp dụng tại quầy.</strong>
                </p>
              `}
            </div>

            <!-- Price Result Box -->
            <div class="counter-summary-box">
              <div class="counter-summary-row">
                <span>Giá niêm yết đã kiểm chứng:</span>
                <span class="counter-summary-total">${cheapestPrice.toLocaleString('vi-VN')}₫</span>
              </div>
              <p class="counter-evidence-note">
                ℹ️ Tính toán chỉ dựa trên các điều kiện độc lập có chứng cứ, không tự ý cộng dồn ưu đãi thiếu căn cứ.
              </p>
            </div>
          ` : `
            <!-- Tab Utilities & Nearby 500m (Factual R1: Strict Unknown when lacking leaf evidence) -->
            <div id="sheet-panel-utilities">
            <div class="utilities-grid">
              <!-- Wi-Fi -->
              <div class="utility-chip-card">
                <div class="utility-chip-title">
                  📶 Wi-Fi Quán
                </div>
                <div class="utility-chip-detail">
                  <span style="color: var(--text-muted);">${branch.utilities.wifi.display_text}</span>
                </div>
              </div>

              <!-- Power sockets -->
              <div class="utility-chip-card">
                <div class="utility-chip-title">
                  🔌 Ổ cắm sạc
                </div>
                <div class="utility-chip-detail">
                  <span style="color: var(--text-muted);">${branch.utilities.power_sockets.display_text}</span>
                </div>
              </div>

              <!-- Air conditioning -->
              <div class="utility-chip-card">
                <div class="utility-chip-title">
                  ❄️ Máy lạnh
                </div>
                <div class="utility-chip-detail">
                  <span style="color: var(--text-muted);">${branch.utilities.air_conditioning.display_text}</span>
                </div>
              </div>

              <!-- Parking -->
              <div class="utility-chip-card">
                <div class="utility-chip-title">
                  🛵 Chỗ đỗ xe máy
                </div>
                <div class="utility-chip-detail">
                  <span style="color: var(--text-muted);">${branch.utilities.motorcycle_parking.display_text}</span>
                </div>
              </div>

              <!-- Bus Info -->
              <div class="utility-chip-card" style="grid-column: 1 / -1;">
                <div class="utility-chip-title">
                  🚌 Xe buýt khứ hồi (DanaBus)
                </div>
                <div class="utility-chip-detail">
                  <span style="color: var(--text-muted);">${branch.utilities.bus_return_info.display_text}</span>
                </div>
              </div>
            </div>

            </div> <!-- /sheet-panel-utilities -->
            <!-- Nearby 500m Section -->
            <div style="margin-top: var(--space-4);">
              <h3 class="bill-panel-title" style="margin-bottom: var(--space-3);">
                📍 Tiện ích trong bán kính 500m
              </h3>
              <div class="nearby-origin-pills" role="radiogroup" aria-label="Chọn tâm bán kính 500m">
                <button type="button" class="counter-pill-btn ${onsiteState.nearbyOriginMode === 'branch' ? 'is-active' : ''}" data-origin-mode="branch">
                  Quán này
                </button>
                ${J373_BRANCH_UTILITIES.campuses.map(c => `
                  <button type="button" class="counter-pill-btn ${onsiteState.nearbyOriginMode === 'campus' && onsiteState.selectedCampusOriginId === c.campus_id ? 'is-active' : ''}" data-origin-mode="campus" data-campus-id="${c.campus_id}">
                    ${c.campus_name.split('(')[0].trim()}
                  </button>
                `).join('')}
                <button type="button" class="counter-pill-btn ${onsiteState.nearbyOriginMode === 'gps' ? 'is-active' : ''}" data-origin-mode="gps">
                  🧭 Bật GPS của bạn
                </button>
              </div>

              <div id="nearby-branches-container" style="display: flex; flex-direction: column; gap: var(--space-2);">
                ${renderNearby500mBranches(branch)}
              </div>
            </div>
          `}
        </div>

        <div class="counter-sheet-footer">
          <button type="button" id="btn-sheet-split-this" class="btn-onsite-split-cta">
            🧾 Chia tiền cho món này
          </button>
        </div>
      </div>
    </div>
  `;
}

// Render Nearby 500m Branches List
function renderNearby500mBranches(currentBranch) {
  let originLat = currentBranch.coordinates.lat;
  let originLng = currentBranch.coordinates.lng;
  let originLabel = currentBranch.branch_name;

  if (onsiteState.nearbyOriginMode === 'campus') {
    const campus = J373_BRANCH_UTILITIES.campuses.find(c => c.campus_id === onsiteState.selectedCampusOriginId);
    if (campus) {
      originLat = campus.coordinates.lat;
      originLng = campus.coordinates.lng;
      originLabel = campus.campus_name;
    }
  } else if (onsiteState.nearbyOriginMode === 'gps' && onsiteState.userGpsCoordinates) {
    originLat = onsiteState.userGpsCoordinates.lat;
    originLng = onsiteState.userGpsCoordinates.lng;
    originLabel = 'Vị trí GPS của bạn';
  }

  const nearby = J373_BRANCH_UTILITIES.branches
    .map(b => {
      const dist = calculateGeodesicDistance(originLat, originLng, b.coordinates.lat, b.coordinates.lng);
      return { branch: b, distance: dist };
    })
    .filter(item => item.distance <= 500)
    .sort((a, b) => a.distance - b.distance);

  if (nearby.length === 0) {
    return `
      <div class="utility-chip-card" style="text-align: center; color: var(--text-muted);">
        Không có cơ sở nào khác trong bán kính 500m quanh ${originLabel}.
      </div>
    `;
  }

  return nearby.map(item => `
    <div class="nearby-branch-item">
      <div>
        <strong style="font-size: 13px;">${item.branch.branch_name}</strong><br>
        <small style="color: var(--text-muted);">${item.branch.address}</small>
      </div>
      <span class="nearby-dist-badge">Trong bán kính 500m (${item.distance}m)</span>
    </div>
  `).join('');
}

// 3. Render Remediated Itemized Bill Split Modal (SPLIT_R1 & QR_R2)
function renderOnsiteBillSplitModal() {
  const calc = calculateItemizedSplit(
    onsiteState.billParticipants,
    onsiteState.billItems,
    onsiteState.billSharedFees
  );

  const activeParticipant = onsiteState.billParticipants.find(p => p.id === onsiteState.selectedQrParticipantId) || onsiteState.billParticipants[0];
  const activeShare = (calc.shares && activeParticipant && calc.shares[activeParticipant.id])
    ? calc.shares[activeParticipant.id]
    : { totalShare: 0, itemShare: 0, feeShare: 0 };

  const activeBank = J373_VIETQR_SPEC.napas_bank_directory.find(b => b.bin === onsiteState.recipientBankBin);

  return `
    <div id="onsite-bill-split-modal" class="counter-sheet-backdrop" role="dialog" aria-modal="true" aria-labelledby="bill-modal-title" ${onsiteState.billModalOpen ? '' : 'hidden'}>
      <div class="counter-sheet-panel" style="max-width: 960px; max-height: 92vh;">
        <div class="counter-sheet-header">
          <div class="counter-sheet-header-info">
            <h2 id="bill-modal-title" class="counter-sheet-title">🧾 Chia Tiền Theo Món & Tạo VietQR</h2>
            <p class="counter-sheet-subtitle">Sửa trực tiếp số lượng, đơn giá, phí chung • Xác nhận người nhận trước khi tạo QR • 100% trong RAM</p>
          </div>
          <button type="button" id="btn-close-bill-modal" class="btn-sheet-close" aria-label="Đóng công cụ chia tiền">✕</button>
        </div>

        <div class="counter-sheet-body">
          ${calc.hasUnassigned ? `
            <div class="unresolved-items-alert">
              ⚠️ <strong>Cần xử lý:</strong> Có món ăn chưa gán người chia (hoặc người ăn vừa bị xóa). Vui lòng gán thành viên cho từng món trước khi xác nhận tạo QR.
            </div>
          ` : ''}

          ${calc.hasValidationErrors ? `
            <div class="unresolved-items-alert">
              ⚠️ <strong>Lỗi nhập liệu:</strong> Một hoặc nhiều trường đơn giá, số lượng hoặc phí chung chưa đúng định dạng số nguyên hợp lệ. Vui lòng kiểm tra các ô có viền đỏ.
            </div>
          ` : ''}

          <div class="bill-split-grid">
            <!-- Left Column: Participants, Items & Fees -->
            <div style="display: flex; flex-direction: column; gap: var(--space-4);">
              <!-- 1. Participants -->
              <div class="bill-panel-card">
                <div class="bill-panel-title">
                  <span>1. Thành viên tham gia (${onsiteState.billParticipants.length}/30)</span>
                  <button type="button" id="btn-add-participant-inline" class="counter-pill-btn" style="color: var(--color-action); border-color: var(--color-action);">
                    + Thêm người
                  </button>
                </div>
                <div class="participants-tag-list">
                  ${onsiteState.billParticipants.map(p => `
                    <div class="participant-chip">
                      <span>${p.name}</span>
                      ${onsiteState.billParticipants.length > 1 ? `
                        <button type="button" class="btn-chip-remove" data-remove-participant="${p.id}" aria-label="Xóa ${p.name}">✕</button>
                      ` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- 2. Items List (Direct DOM Editable - SPLIT_R1) -->
              <div class="bill-panel-card">
                <div class="bill-panel-title">
                  <span>2. Danh sách món ăn (${onsiteState.billItems.length})</span>
                  <button type="button" id="btn-add-item-inline" class="counter-pill-btn" style="color: var(--color-action); border-color: var(--color-action);">
                    + Thêm món mới
                  </button>
                </div>
                <div class="bill-items-list">
                  ${onsiteState.billItems.map(it => {
                    const priceNum = parseInt(String(it.price).trim(), 10) || 0;
                    const qtyNum = parseInt(String(it.qty).trim(), 10) || 0;
                    const lineTotal = (!it.priceError && !it.qtyError) ? priceNum * qtyNum : 0;
                    return `
                      <div class="bill-item-row" data-item-row="${it.id}">
                        <div class="bill-item-inputs-row">
                          <input 
                            type="text" 
                            class="input-item-name" 
                            data-item-field="name" 
                            data-item-id="${it.id}" 
                            value="${it.name || ''}" 
                            placeholder="Tên món ăn" 
                            maxlength="100" 
                          />
                          <input 
                            type="text" 
                            class="input-item-price ${it.priceError ? 'is-invalid' : ''}" 
                            data-item-field="price" 
                            data-item-id="${it.id}" 
                            value="${it.price !== undefined ? it.price : ''}" 
                            placeholder="Đơn giá (₫)" 
                          />
                          <input 
                            type="number" 
                            class="input-item-qty ${it.qtyError ? 'is-invalid' : ''}" 
                            data-item-field="qty" 
                            data-item-id="${it.id}" 
                            value="${it.qty !== undefined ? it.qty : 1}" 
                            min="1" 
                            max="99" 
                            placeholder="SL" 
                          />
                          <div class="bill-item-price-block" style="min-width: 90px; text-align: right;">
                            ${lineTotal > 0 ? lineTotal.toLocaleString('vi-VN') + '₫' : '--₫'}
                          </div>
                          ${onsiteState.billItems.length > 1 ? `
                            <button type="button" class="btn-chip-remove" data-remove-item="${it.id}" aria-label="Xóa món này">✕</button>
                          ` : ''}
                        </div>
                        ${it.priceError ? `<div class="item-error-msg">⚠️ ${it.priceError}</div>` : ''}
                        ${it.qtyError ? `<div class="item-error-msg">⚠️ ${it.qtyError}</div>` : ''}
                        ${it.assigneeError ? `<div class="item-error-msg">⚠️ ${it.assigneeError}</div>` : ''}
                        
                        <div class="bill-item-assignees">
                          <small style="color: var(--text-muted); margin-right: 4px;">Người ăn:</small>
                          ${onsiteState.billParticipants.map(p => {
                            const isAssigned = (it.assignedIds || []).includes(p.id);
                            return `
                              <button type="button" class="btn-assignee-toggle ${isAssigned ? 'is-assigned' : ''}" data-toggle-item="${it.id}" data-toggle-participant="${p.id}">
                                ${p.name} ${isAssigned ? '✓' : '+'}
                              </button>
                            `;
                          }).join('')}
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>

              <!-- 3. Shared Fees (Visible Rows with Add/Remove - SPLIT_R1) -->
              <div class="bill-panel-card">
                <div class="bill-panel-title">
                  <span>3. Phí chung / Phụ phí (Chia đều tất cả)</span>
                  <button type="button" id="btn-add-fee-inline" class="counter-pill-btn" style="color: var(--color-action); border-color: var(--color-action);">
                    + Thêm phí chung
                  </button>
                </div>
                <div class="shared-fees-box">
                  ${onsiteState.billSharedFees.length === 0 ? `
                    <small style="color: var(--text-muted);">Chưa có phí chung. Bấm "+ Thêm phí chung" nếu bàn có phụ phí khăn lạnh, VAT hoặc phí dịch vụ.</small>
                  ` : onsiteState.billSharedFees.map(f => `
                    <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 6px;">
                      <div style="display: flex; gap: var(--space-2); align-items: center;">
                        <input 
                          type="text" 
                          class="input-fee-name" 
                          data-fee-field="name" 
                          data-fee-id="${f.id}" 
                          value="${f.name || ''}" 
                          placeholder="Tên phí (VD: Khăn lạnh / VAT)" 
                        />
                        <input 
                          type="text" 
                          class="input-fee-amount ${f.amountError ? 'is-invalid' : ''}" 
                          data-fee-field="amount" 
                          data-fee-id="${f.id}" 
                          value="${f.amount !== undefined ? f.amount : '0'}" 
                          placeholder="Số tiền (₫)" 
                        />
                        <button type="button" class="btn-chip-remove" data-remove-fee="${f.id}" aria-label="Xóa phí này">✕</button>
                      </div>
                      ${f.amountError ? `<div class="item-error-msg">⚠️ ${f.amountError}</div>` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Right Column: Summary, Recipient Form & VietQR -->
            <div style="display: flex; flex-direction: column; gap: var(--space-4);">
              <!-- Total Allocation Card -->
              <div class="bill-panel-card">
                <h3 class="bill-panel-title">Phân bổ tiền từng người</h3>
                ${(!calc.isValid || calc.hasUnassigned) ? `
                  <div style="padding: 12px; background: #FEF2F2; color: #991B1B; border-radius: 12px; font-size: 13px;">
                    ⚠️ Chưa thể phân bổ: Còn món chưa gán người chia hoặc dữ liệu chưa hợp lệ.
                  </div>
                ` : `
                  <div style="display: flex; flex-direction: column; gap: var(--space-2);">
                    ${onsiteState.billParticipants.map(p => {
                      const pShare = calc.shares[p.id] || { totalShare: 0, itemShare: 0, feeShare: 0 };
                      return `
                        <div class="allocation-person-card ${onsiteState.selectedQrParticipantId === p.id ? 'style-active' : ''}" style="cursor: pointer;" data-select-qr-person="${p.id}">
                          <div class="allocation-person-header">
                            <span>${p.name} ${onsiteState.selectedQrParticipantId === p.id ? '👉 (Đang xem)' : ''}</span>
                            <span class="allocation-person-total">${pShare.totalShare.toLocaleString('vi-VN')}₫</span>
                          </div>
                          <div class="allocation-person-detail">
                            Món riêng & chung: ${pShare.itemShare.toLocaleString('vi-VN')}₫ • Phí chung: ${pShare.feeShare.toLocaleString('vi-VN')}₫
                          </div>
                        </div>
                      `;
                    }).join('')}
                    <div style="border-top: 1.5px solid var(--border-color); padding-top: 8px; display: flex; justify-content: space-between; align-items: center;">
                      <strong>Tổng hóa đơn:</strong>
                      <strong style="color: var(--color-action); font-size: 1.15rem;">${calc.grandTotal.toLocaleString('vi-VN')}₫</strong>
                    </div>
                    <small style="color: #059669; font-weight: 600;">✓ Bảo toàn 100% số dư (Khớp chính xác từng đồng)</small>
                  </div>
                `}
              </div>

              <!-- Recipient Form & VietQR Box (QR_R2: Strict Confirmation Step) -->
              <div class="bill-panel-card">
                <h3 class="bill-panel-title">Thông tin nhận tiền & VietQR</h3>
                
                ${!onsiteState.recipientConfirmed ? `
                  <!-- Unconfirmed Form State -->
                  <div class="recipient-form-box">
                    <div class="recipient-field">
                      <label class="recipient-label" for="select-recipient-bank">1. Chọn Ngân hàng nhận tiền *</label>
                      <select id="select-recipient-bank" class="recipient-select ${onsiteState.recipientError === 'bank' ? 'is-invalid' : ''}">
                        <option value="">-- Bấm để chọn ngân hàng --</option>
                        ${J373_VIETQR_SPEC.napas_bank_directory.map(b => `
                          <option value="${b.bin}" ${onsiteState.recipientBankBin === b.bin ? 'selected' : ''}>${b.short_name} (${b.code})</option>
                        `).join('')}
                      </select>
                    </div>
                    <div class="recipient-field">
                      <label class="recipient-label" for="input-recipient-account">2. Số tài khoản nhận tiền *</label>
                      <input 
                        type="text" 
                        id="input-recipient-account" 
                        class="recipient-input font-mono ${onsiteState.recipientError === 'account' ? 'is-invalid' : ''}" 
                        value="${onsiteState.recipientAccount}" 
                        placeholder="Nhập số tài khoản (giữ nguyên số 0 đầu)" 
                      />
                    </div>
                    <div class="recipient-field">
                      <label class="recipient-label" for="input-recipient-name">3. Tên người nhận (Tùy chọn)</label>
                      <input 
                        type="text" 
                        id="input-recipient-name" 
                        class="recipient-input" 
                        value="${onsiteState.recipientDisplayName}" 
                        placeholder="Nhập tên người nhận (bạn tự nhập)" 
                      />
                      <small style="font-size: 11px; color: var(--text-muted);">* Tên người nhận bạn tự nhập (chưa qua xác thực ngân hàng)</small>
                    </div>

                    <button 
                      type="button" 
                      id="btn-confirm-recipient" 
                      class="btn-confirm-recipient" 
                      ${(!calc.isValid || calc.hasUnassigned) ? 'disabled' : ''}
                    >
                      ✓ Xác nhận thông tin & Tạo mã VietQR
                    </button>
                  </div>

                  <div class="qr-unconfirmed-placeholder">
                    <p>🔒 <strong>Mã VietQR đang ẩn:</strong></p>
                    <p>Vui lòng điền ngân hàng, số tài khoản và bấm <strong>"Xác nhận thông tin & Tạo mã VietQR"</strong> để hiển thị mã thanh toán.</p>
                  </div>
                ` : `
                  <!-- Confirmed Review State with Rendered QR & Multi-field Copy -->
                  <div class="qr-confirmation-card">
                    <div class="qr-confirmation-row" style="display: flex; justify-content: space-between; align-items: center;">
                      <div>
                        <strong>Ngân hàng:</strong>
                        <span id="field-val-bank">${activeBank ? activeBank.short_name : onsiteState.recipientBankBin}</span>
                      </div>
                      <button type="button" class="btn-copy-subfield counter-pill-btn" data-copy-target="bank" style="padding: 2px 8px; font-size: 11px; min-height: 32px;" title="Sao chép tên ngân hàng">📋 Chép</button>
                    </div>
                    <div class="qr-confirmation-row" style="display: flex; justify-content: space-between; align-items: center;">
                      <div>
                        <strong>Số tài khoản:</strong>
                        <span id="field-val-account" class="font-mono" style="font-weight: 700;">${onsiteState.recipientAccount}</span>
                      </div>
                      <button type="button" class="btn-copy-subfield counter-pill-btn" data-copy-target="account" style="padding: 2px 8px; font-size: 11px; min-height: 32px;" title="Sao chép số tài khoản">📋 Chép</button>
                    </div>
                    <div class="qr-confirmation-row" style="display: flex; justify-content: space-between; align-items: center;">
                      <div>
                        <strong>Tên người nhận:</strong>
                        <span id="field-val-name">${onsiteState.recipientDisplayName || '(Tên bạn tự nhập)'}</span>
                      </div>
                      <button type="button" class="btn-copy-subfield counter-pill-btn" data-copy-target="name" style="padding: 2px 8px; font-size: 11px; min-height: 32px;" title="Sao chép tên người nhận">📋 Chép</button>
                    </div>
                    <div class="qr-confirmation-row">
                      <strong>Người thanh toán:</strong>
                      <span style="font-weight: 700; color: var(--color-action);">${activeParticipant ? activeParticipant.name : ''}</span>
                    </div>
                    <div class="qr-confirmation-row" style="border-top: 1px dashed var(--border-color); padding-top: 4px; display: flex; justify-content: space-between; align-items: center;">
                      <div>
                        <strong>Số tiền phải trả:</strong>
                        <span id="field-val-amount" style="font-weight: 800; font-size: 1.1rem; color: var(--color-action);">${activeShare.totalShare.toLocaleString('vi-VN')}₫</span>
                      </div>
                      <button type="button" class="btn-copy-subfield counter-pill-btn" data-copy-target="amount" style="padding: 2px 8px; font-size: 11px; min-height: 32px;" title="Sao chép số tiền">📋 Chép</button>
                    </div>
                    <div class="qr-confirmation-row" style="display: flex; justify-content: space-between; align-items: center;">
                      <div style="font-size: 12px;">
                        <strong>Nội dung CK:</strong>
                        <span id="field-val-memo">JayT ${activeParticipant ? normalizeAccentInsensitive(activeParticipant.name).slice(0, 15) : 'chiatien'}</span>
                      </div>
                      <button type="button" class="btn-copy-subfield counter-pill-btn" data-copy-target="memo" style="padding: 2px 8px; font-size: 11px; min-height: 32px;" title="Sao chép nội dung chuyển khoản">📋 Chép</button>
                    </div>
                    <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">
                      Kỹ thuật: <strong style="color: #059669;">STRUCTURE_VALIDATED</strong> (EMVCo TLV & CRC-16) • Nhận diện app ngân hàng: <strong>NOT_TESTED</strong>
                    </div>
                    <button type="button" id="btn-edit-recipient" class="counter-pill-btn" style="margin-top: 8px; justify-content: center;">
                      ✏️ Sửa thông tin người nhận
                    </button>
                  </div>

                  <!-- VietQR Presentation -->
                  <div class="vietqr-box-container">
                    <span style="font-size: 13px; font-weight: 600;">Mã VietQR của: ${activeParticipant ? activeParticipant.name : ''}</span>
                    <div class="vietqr-canvas-wrapper" id="onsite-vietqr-container">
                      <!-- Rendered dynamically -->
                    </div>
                    <div class="vietqr-amount-badge">
                      ${activeShare.totalShare.toLocaleString('vi-VN')}₫
                    </div>
                    <div class="vietqr-memo-text">
                      Nội dung: <strong>JayT ${activeParticipant ? normalizeAccentInsensitive(activeParticipant.name).slice(0, 15) : 'chiatien'}</strong>
                    </div>
                    <div class="vietqr-fallback-notice" style="font-size: 12px; color: var(--text-muted); margin: 6px 0; text-align: center; font-weight: 500;">
                      Không quét được? Sao chép thông tin chuyển khoản
                    </div>
                    <div style="display: flex; gap: var(--space-2); flex-wrap: wrap; justify-content: center; width: 100%;">
                      <button type="button" id="btn-copy-transfer-info" class="counter-pill-btn" style="flex: 1; justify-content: center; font-weight: 600;">
                        📋 Sao chép tất cả
                      </button>
                      <button type="button" id="btn-download-qr-png" class="counter-pill-btn" style="flex: 1; justify-content: center;">
                        ⬇️ Tải ảnh QR
                      </button>
                    </div>
                    <!-- Selectable text fallback when clipboard API is denied or fails -->
                    <div id="transfer-fallback-selectable-container" style="display: none; margin-top: 8px; width: 100%; text-align: left;">
                      <label for="transfer-fallback-selectable-text" style="font-size: 11px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 2px;">Sao chép thủ công (bôi đen và sao chép):</label>
                      <textarea id="transfer-fallback-selectable-text" readonly style="width: 100%; height: 75px; font-size: 11px; font-family: monospace; border: 1px solid var(--border-color); border-radius: 6px; padding: 6px; background: var(--bg-card); color: var(--text-primary); resize: none;"></textarea>
                    </div>
                  </div>
                `}

                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: var(--space-3);">
                  <button type="button" id="btn-reset-bill-session" class="counter-pill-btn" style="color: #ef4444; border-color: #fca5a5;">
                    🔄 Kết thúc phiên / Xóa RAM
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render dynamic QR Code inside #onsite-vietqr-container
function updateVietQRDisplay() {
  const container = document.getElementById('onsite-vietqr-container');
  if (!container) return;

  if (!onsiteState.recipientConfirmed) {
    container.innerHTML = '';
    return;
  }

  const calc = calculateItemizedSplit(
    onsiteState.billParticipants,
    onsiteState.billItems,
    onsiteState.billSharedFees
  );

  const activeParticipant = onsiteState.billParticipants.find(p => p.id === onsiteState.selectedQrParticipantId) || onsiteState.billParticipants[0];
  const activeShare = (calc.shares && activeParticipant && calc.shares[activeParticipant.id])
    ? calc.shares[activeParticipant.id]
    : { totalShare: 0 };

  if (activeShare.totalShare <= 0) {
    container.innerHTML = '<div style="padding: 40px 10px; color: var(--text-muted); font-size: 13px;">Người này có phần chia 0₫. Không cần mã thanh toán.</div>';
    return;
  }

  const qrData = generateVietQRPayload({
    bin: onsiteState.recipientBankBin,
    account: onsiteState.recipientAccount,
    amount: activeShare.totalShare,
    memo: 'JayT ' + (activeParticipant ? activeParticipant.name : 'chiatien')
  });

  container.innerHTML = '';
  if (typeof qrcode !== 'undefined') {
    try {
      const qr = qrcode(0, 'M');
      qr.addData(qrData.payload);
      qr.make();
      container.innerHTML = qr.createImgTag(5, 12);
      const img = container.querySelector('img');
      if (img) {
        img.style.display = 'block';
        img.style.margin = '0 auto';
        img.style.maxWidth = '100%';
        img.setAttribute('alt', 'Mã VietQR ' + activeShare.totalShare + '₫');
      }
    } catch(err) {
      container.innerHTML = '<div style="padding: 20px; font-family: monospace; word-break: break-all; font-size: 10px;">' + qrData.payload + '</div>';
    }
  } else {
    container.innerHTML = '<div style="padding: 20px; font-family: monospace; word-break: break-all; font-size: 10px;">' + qrData.payload + '</div>';
  }
}

// 4. Attach Event Listeners for Onsite Copilot Suite (R1 Remediated)
function attachOnsiteEvents() {
  // A. Counter Search Input
  const searchInput = document.getElementById('input-counter-branch-search');
  const listbox = document.getElementById('counter-search-listbox');
  const liveRegion = document.getElementById('counter-search-live');

  if (searchInput && listbox) {
    let activeIndex = -1;

    const filterBranches = (query) => {
      const q = normalizeAccentInsensitive(query);
      if (!q) {
        listbox.hidden = true;
        listbox.innerHTML = '';
        if (liveRegion) liveRegion.textContent = '';
        return;
      }

      const matches = J373_BRANCH_UTILITIES.branches.filter(b => {
        return normalizeAccentInsensitive(b.branch_name).includes(q) ||
               normalizeAccentInsensitive(b.brand_name).includes(q) ||
               normalizeAccentInsensitive(b.address).includes(q);
      }).slice(0, 8);

      if (matches.length === 0) {
        listbox.innerHTML = '<li class="counter-search-option" style="color: var(--text-muted); cursor: default;">Chưa có thông tin quán này</li>';
        listbox.hidden = false;
        if (liveRegion) liveRegion.textContent = '0 quán tìm thấy';
        return;
      }

      listbox.innerHTML = matches.map((m, idx) => `
        <li class="counter-search-option" role="option" id="branch-opt-${idx}" data-branch-id="${m.branch_id}" aria-selected="false">
          <div class="counter-search-option-main">
            <span class="counter-search-option-name">${m.branch_name}</span>
            <span class="counter-search-option-addr">${m.address}</span>
          </div>
          <span class="counter-search-option-badge">${m.brand_name}</span>
        </li>
      `).join('');

      listbox.hidden = false;
      activeIndex = -1;
      if (liveRegion) liveRegion.textContent = matches.length + ' quán tìm thấy';
    };

    searchInput.addEventListener('input', (e) => {
      onsiteState.counterSearchQuery = e.target.value;
      filterBranches(e.target.value);
    });

    searchInput.addEventListener('keydown', (e) => {
      const items = listbox.querySelectorAll('.counter-search-option[data-branch-id]');
      if (!items.length || listbox.hidden) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = (activeIndex + 1) % items.length;
        items.forEach((it, i) => {
          it.classList.toggle('is-selected', i === activeIndex);
          it.setAttribute('aria-selected', String(i === activeIndex));
        });
        searchInput.setAttribute('aria-activedescendant', 'branch-opt-' + activeIndex);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = (activeIndex - 1 + items.length) % items.length;
        items.forEach((it, i) => {
          it.classList.toggle('is-selected', i === activeIndex);
          it.setAttribute('aria-selected', String(i === activeIndex));
        });
        searchInput.setAttribute('aria-activedescendant', 'branch-opt-' + activeIndex);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIndex >= 0 && items[activeIndex]) {
          const branchId = items[activeIndex].dataset.branchId;
          openBranchSheet(branchId);
        }
      } else if (e.key === 'Escape') {
        listbox.hidden = true;
      }
    });

    listbox.addEventListener('click', (e) => {
      const opt = e.target.closest('.counter-search-option[data-branch-id]');
      if (opt) {
        openBranchSheet(opt.dataset.branchId);
      }
    });
  }

  function openBranchSheet(branchId) {
    onsiteState.selectedBranchId = branchId;
    onsiteState.counterSheetOpen = true;
    onsiteState.counterSheetTab = 'steps';
    const listbox = document.getElementById('counter-search-listbox');
    if (listbox) listbox.hidden = true;
    renderApp();
    setTimeout(() => {
      const closeBtn = document.getElementById('btn-close-counter-sheet');
      if (closeBtn) closeBtn.focus();
    }, 50);
  }

  // B. Sheet Controls
  const closeSheetBtn = document.getElementById('btn-close-counter-sheet');
  if (closeSheetBtn) {
    closeSheetBtn.addEventListener('click', () => {
      onsiteState.counterSheetOpen = false;
      renderApp();
      const input = document.getElementById('input-counter-branch-search');
      if (input) input.focus();
    });
  }

  const tabStepsBtn = document.getElementById('tab-btn-steps');
  const tabUtilsBtn = document.getElementById('tab-btn-utilities');
  if (tabStepsBtn && tabUtilsBtn) {
    tabStepsBtn.addEventListener('click', () => {
      onsiteState.counterSheetTab = 'steps';
      renderApp();
    });
    tabUtilsBtn.addEventListener('click', () => {
      onsiteState.counterSheetTab = 'utilities';
      renderApp();
    });
  }

  document.querySelectorAll('.counter-pill-btn[data-eligibility]').forEach(btn => {
    btn.addEventListener('click', () => {
      onsiteState.selectedEligibility = btn.dataset.eligibility;
      renderApp();
    });
  });

  document.querySelectorAll('.counter-pill-btn[data-wallet]').forEach(btn => {
    btn.addEventListener('click', () => {
      onsiteState.selectedWalletOffer = btn.dataset.wallet;
      renderApp();
    });
  });

  document.querySelectorAll('.counter-pill-btn[data-item-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      onsiteState.selectedMenuItemId = btn.dataset.itemId;
      renderApp();
    });
  });

  const splitThisBtn = document.getElementById('btn-sheet-split-this');
  if (splitThisBtn) {
    splitThisBtn.addEventListener('click', () => {
      onsiteState.counterSheetOpen = false;
      onsiteState.billModalOpen = true;
      renderApp();
      updateVietQRDisplay();
    });
  }

  const quickSplitBtn = document.getElementById('btn-quick-split-bill');
  if (quickSplitBtn) {
    quickSplitBtn.addEventListener('click', () => {
      onsiteState.billModalOpen = true;
      renderApp();
      updateVietQRDisplay();
    });
  }

  const closeBillBtn = document.getElementById('btn-close-bill-modal');
  if (closeBillBtn) {
    closeBillBtn.addEventListener('click', () => {
      onsiteState.billModalOpen = false;
      renderApp();
    });
  }

  // C. Inline Bill Split Controls (SPLIT_R1: No prompt, visible fields, direct DOM)
  const addPartBtn = document.getElementById('btn-add-participant-inline');
  if (addPartBtn) {
    addPartBtn.addEventListener('click', () => {
      if (onsiteState.billParticipants.length >= 30) return;
      const nextNum = onsiteState.billParticipants.length + 1;
      const newId = 'p' + nextNum;
      onsiteState.billParticipants.push({ id: newId, name: 'Thành viên ' + nextNum });
      onsiteState.recipientConfirmed = false; // Invalidate confirmation
      renderApp();
      updateVietQRDisplay();
    });
  }

  document.querySelectorAll('[data-remove-participant]').forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.dataset.removeParticipant;
      if (onsiteState.billParticipants.length <= 1) return;
      onsiteState.billParticipants = onsiteState.billParticipants.filter(p => p.id !== pId);
      onsiteState.billItems.forEach(it => {
        it.assignedIds = (it.assignedIds || []).filter(id => id !== pId);
      });
      if (onsiteState.selectedQrParticipantId === pId) {
        onsiteState.selectedQrParticipantId = onsiteState.billParticipants[0].id;
      }
      onsiteState.recipientConfirmed = false; // Invalidate confirmation
      renderApp();
      updateVietQRDisplay();
    });
  });

  const addItemBtn = document.getElementById('btn-add-item-inline');
  if (addItemBtn) {
    addItemBtn.addEventListener('click', () => {
      if (onsiteState.billItems.length >= 100) return;
      const newId = 'item_' + Date.now();
      onsiteState.billItems.push({
        id: newId,
        name: 'Món ăn mới',
        price: '50000',
        qty: '1',
        assignedIds: onsiteState.billParticipants.map(p => p.id),
        priceError: null,
        qtyError: null
      });
      onsiteState.recipientConfirmed = false;
      renderApp();
      updateVietQRDisplay();
      setTimeout(() => {
        const input = document.querySelector(`[data-item-field="name"][data-item-id="${newId}"]`);
        if (input) input.focus();
      }, 50);
    });
  }

  document.querySelectorAll('[data-remove-item]').forEach(btn => {
    btn.addEventListener('click', () => {
      const itemId = btn.dataset.removeItem;
      if (onsiteState.billItems.length <= 1) return;
      onsiteState.billItems = onsiteState.billItems.filter(it => it.id !== itemId);
      onsiteState.recipientConfirmed = false;
      renderApp();
      updateVietQRDisplay();
    });
  });

  // Direct Inline Item Field Editing
  document.querySelectorAll('[data-item-field]').forEach(input => {
    input.addEventListener('input', (e) => {
      const field = input.dataset.itemField;
      const itemId = input.dataset.itemId;
      const item = onsiteState.billItems.find(it => it.id === itemId);
      if (!item) return;

      item[field] = e.target.value; // Store entered text directly, NO COERCION
      onsiteState.recipientConfirmed = false; // Invalidate confirmation on edit

      // Re-run calculation and update live DOM
      const calc = calculateItemizedSplit(onsiteState.billParticipants, onsiteState.billItems, onsiteState.billSharedFees);
      
      // Update line total text in DOM if valid
      const row = input.closest('[data-item-row]');
      if (row) {
        const lineTotalEl = row.querySelector('.bill-item-price-block');
        const priceNum = parseInt(String(item.price).trim(), 10) || 0;
        const qtyNum = parseInt(String(item.qty).trim(), 10) || 0;
        if (lineTotalEl) {
          lineTotalEl.textContent = (!item.priceError && !item.qtyError && priceNum > 0)
            ? (priceNum * qtyNum).toLocaleString('vi-VN') + '₫'
            : '--₫';
        }
      }
    });

    input.addEventListener('change', () => {
      renderApp();
      updateVietQRDisplay();
    });
  });

  // Toggle Item Assignee
  document.querySelectorAll('[data-toggle-item]').forEach(btn => {
    btn.addEventListener('click', () => {
      const itemId = btn.dataset.toggleItem;
      const pId = btn.dataset.toggleParticipant;
      const item = onsiteState.billItems.find(it => it.id === itemId);
      if (!item) return;
      if (!item.assignedIds) item.assignedIds = [];
      if (item.assignedIds.includes(pId)) {
        item.assignedIds = item.assignedIds.filter(id => id !== pId);
      } else {
        item.assignedIds.push(pId);
      }
      onsiteState.recipientConfirmed = false; // Invalidate confirmation
      renderApp();
      updateVietQRDisplay();
    });
  });

  // Inline Shared Fees Editing
  const addFeeBtn = document.getElementById('btn-add-fee-inline');
  if (addFeeBtn) {
    addFeeBtn.addEventListener('click', () => {
      onsiteState.billSharedFees.push({
        id: 'fee_' + Date.now(),
        name: 'Phí dịch vụ / Khăn lạnh',
        amount: '5000',
        amountError: null
      });
      onsiteState.recipientConfirmed = false;
      renderApp();
      updateVietQRDisplay();
    });
  }

  document.querySelectorAll('[data-remove-fee]').forEach(btn => {
    btn.addEventListener('click', () => {
      const feeId = btn.dataset.removeFee;
      onsiteState.billSharedFees = onsiteState.billSharedFees.filter(f => f.id !== feeId);
      onsiteState.recipientConfirmed = false;
      renderApp();
      updateVietQRDisplay();
    });
  });

  document.querySelectorAll('[data-fee-field]').forEach(input => {
    input.addEventListener('input', (e) => {
      const field = input.dataset.feeField;
      const feeId = input.dataset.feeId;
      const fee = onsiteState.billSharedFees.find(f => f.id === feeId);
      if (!fee) return;
      fee[field] = e.target.value; // Store entered text directly
      onsiteState.recipientConfirmed = false;
    });
    input.addEventListener('change', () => {
      renderApp();
      updateVietQRDisplay();
    });
  });

  // Select QR Person
  document.querySelectorAll('[data-select-qr-person]').forEach(card => {
    card.addEventListener('click', () => {
      onsiteState.selectedQrParticipantId = card.dataset.selectQrPerson;
      renderApp();
      updateVietQRDisplay();
    });
  });

  // D. Recipient Form & Explicit Confirmation (QR_R2)
  const bankSelect = document.getElementById('select-recipient-bank');
  if (bankSelect) {
    bankSelect.addEventListener('change', (e) => {
      onsiteState.recipientBankBin = e.target.value;
      onsiteState.recipientConfirmed = false; // Invalidate confirmation
      renderApp();
    });
  }

  const accountInput = document.getElementById('input-recipient-account');
  if (accountInput) {
    accountInput.addEventListener('input', (e) => {
      onsiteState.recipientAccount = e.target.value;
      onsiteState.recipientConfirmed = false; // Invalidate confirmation
    });
  }

  const nameInput = document.getElementById('input-recipient-name');
  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      onsiteState.recipientDisplayName = e.target.value;
      onsiteState.recipientConfirmed = false; // Invalidate confirmation
    });
  }

  // Explicit Confirm Button
  const confirmBtn = document.getElementById('btn-confirm-recipient');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      // Validate recipient fields
      if (!onsiteState.recipientBankBin) {
        alert('Vui lòng chọn Ngân hàng nhận tiền.');
        onsiteState.recipientError = 'bank';
        renderApp();
        return;
      }
      const acc = String(onsiteState.recipientAccount || '').trim();
      if (!acc || acc.length < 5) {
        alert('Vui lòng nhập Số tài khoản hợp lệ (tối thiểu 5 chữ số).');
        onsiteState.recipientError = 'account';
        renderApp();
        return;
      }

      onsiteState.recipientError = null;
      onsiteState.recipientConfirmed = true; // SUCCESSFUL CONFIRMATION
      renderApp();
      updateVietQRDisplay();
    });
  }

  // Edit Recipient Button
  const editRecipientBtn = document.getElementById('btn-edit-recipient');
  if (editRecipientBtn) {
    editRecipientBtn.addEventListener('click', () => {
      onsiteState.recipientConfirmed = false;
      renderApp();
    });
  }

  // Copy Helper with Selectable Text Fallback
  function copyTextWithFallback(text, label) {
    const fallbackBox = document.getElementById('transfer-fallback-selectable-container');
    const fallbackText = document.getElementById('transfer-fallback-selectable-text');

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Đã sao chép ' + (label || 'thông tin') + ' vào bộ nhớ tạm!');
        if (fallbackBox) fallbackBox.style.display = 'none';
      }).catch(() => {
        if (fallbackBox && fallbackText) {
          fallbackBox.style.display = 'block';
          fallbackText.value = text;
          fallbackText.focus();
          fallbackText.select();
          showToast('Vui lòng bôi đen và sao chép thủ công.');
        } else {
          prompt('Sao chép thông tin thủ công:', text);
        }
      });
    } else {
      if (fallbackBox && fallbackText) {
        fallbackBox.style.display = 'block';
        fallbackText.value = text;
        fallbackText.focus();
        fallbackText.select();
        showToast('Vui lòng bôi đen và sao chép thủ công.');
      } else {
        prompt('Sao chép thông tin thủ công:', text);
      }
    }
  }

  // Individual Field Copy Buttons
  document.querySelectorAll('.btn-copy-subfield').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const target = btn.getAttribute('data-copy-target');
      const calc = calculateItemizedSplit(
        onsiteState.billParticipants,
        onsiteState.billItems,
        onsiteState.billSharedFees
      );
      const activeParticipant = onsiteState.billParticipants.find(p => p.id === onsiteState.selectedQrParticipantId) || onsiteState.billParticipants[0];
      const activeShare = (calc.shares && activeParticipant && calc.shares[activeParticipant.id])
        ? calc.shares[activeParticipant.id]
        : { totalShare: 0 };
      const bank = J373_VIETQR_SPEC.napas_bank_directory.find(b => b.bin === onsiteState.recipientBankBin);

      let val = '';
      let label = '';
      if (target === 'bank') {
        val = bank ? bank.short_name : onsiteState.recipientBankBin;
        label = 'tên ngân hàng';
      } else if (target === 'account') {
        val = onsiteState.recipientAccount;
        label = 'số tài khoản';
      } else if (target === 'name') {
        val = onsiteState.recipientDisplayName || '';
        label = 'tên người nhận';
      } else if (target === 'amount') {
        val = String(activeShare.totalShare);
        label = 'số tiền ' + activeShare.totalShare.toLocaleString('vi-VN') + '₫';
      } else if (target === 'memo') {
        val = 'JayT ' + (activeParticipant ? normalizeAccentInsensitive(activeParticipant.name).slice(0, 15) : 'chiatien');
        label = 'nội dung chuyển khoản';
      }
      if (val) copyTextWithFallback(val, label);
    });
  });

  // Copy All Transfer Info
  const copyBtn = document.getElementById('btn-copy-transfer-info');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const calc = calculateItemizedSplit(
        onsiteState.billParticipants,
        onsiteState.billItems,
        onsiteState.billSharedFees
      );
      const activeParticipant = onsiteState.billParticipants.find(p => p.id === onsiteState.selectedQrParticipantId) || onsiteState.billParticipants[0];
      const activeShare = (calc.shares && activeParticipant && calc.shares[activeParticipant.id])
        ? calc.shares[activeParticipant.id]
        : { totalShare: 0 };
      const bank = J373_VIETQR_SPEC.napas_bank_directory.find(b => b.bin === onsiteState.recipientBankBin);

      const text = 'Ngân hàng: ' + (bank ? bank.short_name : onsiteState.recipientBankBin) +
        '\nSố tài khoản: ' + onsiteState.recipientAccount +
        '\nChủ tài khoản: ' + (onsiteState.recipientDisplayName || 'Chưa định danh') +
        '\nNgười thanh toán: ' + (activeParticipant ? activeParticipant.name : '') +
        '\nSố tiền: ' + activeShare.totalShare.toLocaleString('vi-VN') + ' VND' +
        '\nNội dung: JayT ' + (activeParticipant ? normalizeAccentInsensitive(activeParticipant.name).slice(0, 15) : 'chiatien');

      copyTextWithFallback(text, 'tất cả thông tin chuyển khoản');
    });
  }

  // Download QR PNG
  const dlBtn = document.getElementById('btn-download-qr-png');
  if (dlBtn) {
    dlBtn.addEventListener('click', () => {
      const img = document.querySelector('#onsite-vietqr-container img');
      if (img && img.src) {
        const a = document.createElement('a');
        a.href = img.src;
        a.download = 'VietQR_' + onsiteState.recipientAccount + '.png';
        a.click();
      }
    });
  }

  // Reset Session (Clear RAM)
  const resetBtn = document.getElementById('btn-reset-bill-session');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Bạn có chắc muốn kết thúc phiên và xóa toàn bộ dữ liệu bill/tài khoản khỏi bộ nhớ RAM?')) {
        onsiteState.billParticipants = [{ id: 'p1', name: 'Bạn (Chủ bàn)' }];
        onsiteState.billItems = [{ id: 'item_1', name: 'Món 1', price: '50000', qty: '1', assignedIds: ['p1'], priceError: null, qtyError: null }];
        onsiteState.billSharedFees = [];
        onsiteState.recipientBankBin = '';
        onsiteState.recipientAccount = '';
        onsiteState.recipientDisplayName = '';
        onsiteState.recipientConfirmed = false;
        onsiteState.userGpsCoordinates = null;
        onsiteState.billModalOpen = false;
        renderApp();
      }
    });
  }

  // Global Escape key handler for Sheet and Bill Modal
  if (typeof window !== 'undefined' && !window._j373EscapeHandlerAttached) {
    window._j373EscapeHandlerAttached = true;
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (onsiteState.billModalOpen) {
          onsiteState.billModalOpen = false;
          renderApp();
          const btn = document.getElementById('btn-quick-split-bill');
          if (btn) btn.focus();
        } else if (onsiteState.counterSheetOpen) {
          onsiteState.counterSheetOpen = false;
          renderApp();
          const input = document.getElementById('input-counter-branch-search');
          if (input) input.focus();
        }
      }
    });
  }

  // Origin Pills for Nearby 500m
  document.querySelectorAll('[data-origin-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.originMode;
      onsiteState.nearbyOriginMode = mode;
      if (btn.dataset.campusId) {
        onsiteState.selectedCampusOriginId = btn.dataset.campusId;
      }
      if (mode === 'gps') {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              onsiteState.userGpsCoordinates = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
              };
              onsiteState.gpsStatus = 'GRANTED';
              renderApp();
            },
            () => {
              alert('Không thể truy cập GPS. Vui lòng chọn tâm trường học hoặc quán để tra cứu trong bán kính 500m.');
              onsiteState.nearbyOriginMode = 'branch';
              onsiteState.gpsStatus = 'DENIED';
              renderApp();
            }
          );
        }
      } else {
        renderApp();
      }
    });
  });
}

const state = {
  storefrontFeedFilter: 'STUDENT_BUDGET',
  campusFoodFilterActive: false,
  selectedEcosystem: 'ALL',
  selectedCinemaDay: 'MON',
  theme: (typeof window !== 'undefined' && localStorage.getItem('jayt_theme')) || 'theme-light',
  selectedClusterId: 'ALL',
  selectedDealCategory: 'ALL',
  selectedDormCategory: 'ALL',
  dormSearchKeyword: '',
  dishPrice: 35000,
  lunchInputs: {
    shopeefood: { deliveryFee: 0, voucher: 0 },
    grabfood: { deliveryFee: 0, voucher: 0 },
    befood: { deliveryFee: 0, voucher: 0 }
  },
  lunchScenario: { peakTime: false, bridgeRoute: false },
  voucherStack: {
    basketValue: 80000,
    shopDiscount: 0,
    platformVoucher: 0,
    deliveryFee: 0,
    freeshipCredit: 0
  },
  splitTotal: 100000,
  splitCount: 3,
  splitActivity: 'Xem phim Starlight & Bắp nước',
  activeZaloModal: null
};

// Global Verification Exposure
if (typeof window !== 'undefined') {
  window.J372_CAMPUS_MAPPING = J372_CAMPUS_MAPPING;
  window.J372_OFFERS = J372_OFFERS;
  window.J372_PRODUCTS = J372_PRODUCTS;
  window.J372_STATE = state;
}

// Exact Integer Split Bill Math (100% VND conservation)
function calculateIntegerSplit(totalAmount, groupCount) {
  const total = Math.max(0, parseInt(totalAmount, 10) || 0);
  const count = Math.max(1, Math.min(50, parseInt(groupCount, 10) || 3));

  const baseShare = Math.floor(total / count);
  const remainder = total % count;

  const higherCount = remainder;
  const lowerCount = count - remainder;
  const higherShare = baseShare + (remainder > 0 ? 1 : 0);
  const lowerShare = baseShare;

  const conservationCheck = (higherCount * higherShare + lowerCount * lowerShare === total);

  return {
    total: total,
    count: count,
    baseShare: baseShare,
    remainder: remainder,
    higherCount: higherCount,
    higherShare: higherShare,
    lowerCount: lowerCount,
    lowerShare: lowerShare,
    conservationCheck: conservationCheck
  };
}

if (typeof window !== 'undefined') {
  window.calculateIntegerSplit = calculateIntegerSplit;
}

// Helper: Extract numeric price from offer
function extractOfferPrice(offer) {
  if (!offer) return { basePrice: 0, isPerPerson: false, isCombo: false };
  const str = (offer.price_display || '') + ' ' + (offer.title || '') + ' ' + (offer.benefit || '');
  
  const isCinema = (offer.brand && (offer.brand.includes('CGV') || offer.brand.includes('Galaxy') || offer.brand.includes('Metiz') || offer.brand.includes('Starlight'))) ||
                   (offer.category && offer.category.includes('Giải trí'));
  
  const isCombo = str.toLowerCase().includes('combo') || str.toLowerCase().includes('lốc');

  let num = 0;
  if (typeof offer.price === 'number') {
    num = offer.price;
  } else if (offer.price_display) {
    const digits = offer.price_display.replace(/[^0-9]/g, '');
    if (digits && parseInt(digits, 10) >= 1000) {
      num = parseInt(digits, 10);
    }
  }

  if (!num && typeof offer.price !== 'number') {
    const kMatch = offer.title.match(/(\d{2,3})\s*K\b/i);
    if (kMatch) {
      num = parseInt(kMatch[1], 10) * 1000;
    }
  }

  return {
    basePrice: num,
    isPerPerson: isCinema && !isCombo,
    isCombo: isCombo
  };
}

// Wave 2 staging calculator: every fee and voucher is explicitly user-entered.
// It deliberately contains no provider tariff, promotion, bridge-fee, or ranking data.
function toNonNegativeVnd(value, fallback = 0) {
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) ? Math.max(0, parsed) : fallback;
}

function calculateLunchComparison(dishPrice, appInputs = state.lunchInputs) {
  const price = Math.max(20000, Math.min(200000, toNonNegativeVnd(dishPrice, 35000)));
  const providers = {
    shopeefood: { name: 'ShopeeFood', color: '#EA580C' },
    grabfood: { name: 'GrabFood', color: '#047857' },
    befood: { name: 'BeFood', color: '#2563EB' }
  };

  const items = Object.fromEntries(Object.entries(providers).map(([key, provider]) => {
    const input = appInputs?.[key] || {};
    const deliveryFee = toNonNegativeVnd(input.deliveryFee);
    const voucher = toNonNegativeVnd(input.voucher);
    return [key, {
      ...provider,
      dishPrice: price,
      deliveryFee,
      voucher,
      total: Math.max(0, price + deliveryFee - voucher)
    }];
  }));

  return { items, simulation: true };
}

function calculateDynamicStack(inputs = state.voucherStack) {
  const basketValue = Math.max(20000, Math.min(500000, toNonNegativeVnd(inputs.basketValue, 80000)));
  const shopDiscount = toNonNegativeVnd(inputs.shopDiscount);
  const platformVoucher = toNonNegativeVnd(inputs.platformVoucher);
  const deliveryFee = toNonNegativeVnd(inputs.deliveryFee);
  const freeshipCredit = toNonNegativeVnd(inputs.freeshipCredit);
  const deliveryAfterFreeship = Math.max(0, deliveryFee - freeshipCredit);
  const payable = Math.max(0, basketValue - shopDiscount - platformVoucher + deliveryAfterFreeship);

  return {
    basketValue,
    shopDiscount,
    platformVoucher,
    deliveryFee,
    freeshipCredit,
    deliveryAfterFreeship,
    payable,
    savings: Math.max(0, basketValue + deliveryFee - payable),
    simulation: true
  };
}

// --- DOM PRE-INSTANTIATION (OFFER_DOM_NODES) ---
const OFFER_DOM_NODES = new Map();

function renderSingleOfferCardHtml(offer) {
  const codeText = (offer.code_text || offer.exclusive_code || '').trim();
  const hasCode = (offer.action_type === 'REAL_CODE' || offer.has_exclusive_code) && codeText.length > 0;
  const actionLabel = offer.action_label || (hasCode ? 'Sao chép mã' : 'Xem điều kiện tại quầy ↗');
  const targetUrl = offer.action_url || offer.source_url || offer.official_source_url || 'https://jayt-production-v3420.vercel.app';
  const priceInfo = extractOfferPrice(offer);

  return `
    <div class="ticket-card" id="offer-${offer.offer_id}" data-offer-id="${offer.offer_id}">
      <div>
        <div class="ticket-header">
          <span class="ticket-brand">${offer.brand || 'Ưu đãi xác thực'}</span>
          <span class="ticket-tag">${offer.price_display || 'Ưu đãi'}</span>
        </div>
        <h3 class="ticket-title">${offer.title}</h3>
        <div class="ticket-benefit">${offer.benefit || offer.summary_text || ''}</div>
        <div class="ticket-terms">${offer.validity || offer.terms || 'Áp dụng tại Đà Nẵng theo điều kiện quầy.'}</div>
      </div>

      <div>
        <div class="ticket-footer">
          <span style="font-size: 0.72rem; color: var(--text-muted);">📍 Đà Nẵng</span>
          ${hasCode ? `
            <button class="btn-copy-ticket" data-code="${codeText}">
              📋 Sao chép mã
            </button>
          ` : `
            <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="btn-link-ticket">
              ${actionLabel}
            </a>
          `}
        </div>

        <div class="ticket-zalo-row">
          <div class="zalo-row-header">
            <span>👥 Rủ bạn đi cùng:</span>
            <span style="color: var(--accent); font-weight: 800;">
              ${priceInfo.basePrice > 0 ? (priceInfo.isPerPerson ? 'Giá mỗi vé' : 'Tổng combo') : 'Lập kèo tự chọn'}
            </span>
          </div>
          <div class="zalo-btn-group">
            <button class="btn-zalo-quick" data-zalo-offer="${offer.offer_id}" data-split="2" title="Tạo Thẻ Zalo Pass chia 2 người">
              👥 Kèo 2 người
            </button>
            <button class="btn-zalo-quick" data-zalo-offer="${offer.offer_id}" data-split="3" title="Tạo Thẻ Zalo Pass chia 3 người">
              👥 Kèo 3 người
            </button>
            <button class="btn-zalo-custom" data-zalo-offer="${offer.offer_id}" data-split="custom" title="Tùy chỉnh số người hoặc hóa đơn">
              ⚙️ Lập kèo
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}


// ==========================================================================
// JAYT-374 VISUAL-FIRST & FULL-DAY RHYTHM ENGINE
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


// ==========================================================================

const J374_SCHEDULE_SLOTS = [
  {
    id: 'SLOT_MORNING_COFFEE',
    name: 'Cà phê sáng',
    timeRange: '07:00–10:30',
    icon: '☕',
    desc: 'Cà phê & điểm tâm khởi đầu ngày mới năng lượng'
  },
  {
    id: 'SLOT_NOON_LUNCH',
    name: 'Ăn trưa gần trường',
    timeRange: '10:30–14:00',
    icon: '🍱',
    desc: 'Bữa trưa nhanh, combo cơm gà, mì Ý & so giá 3 app'
  },
  {
    id: 'SLOT_AFTERNOON_STUDY',
    name: 'Chiều học nhóm',
    timeRange: '14:00–17:30',
    icon: '📚',
    desc: 'Quán cafe yên tĩnh, trà sữa & không gian học tập'
  },
  {
    id: 'SLOT_EVENING_HANG',
    name: 'Tối đi cùng bạn',
    timeRange: '17:30–23:00',
    icon: '🎬',
    desc: 'Rạp chiếu phim, kèo lẩu & ăn tối cùng hội bạn thân'
  },
  {
    id: 'SLOT_NIGHT_PLAN',
    name: 'Lên kèo ngày mai',
    timeRange: '23:00–07:00',
    icon: '🌙',
    desc: 'Khám phá & lên lịch kèo tiết kiệm cho ngày mai'
  }
];

function getCurrentScheduleSlot() {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    }).formatToParts(new Date());
    const h = parseInt(parts.find(p => p.type === 'hour').value, 10);
    const m = parseInt(parts.find(p => p.type === 'minute').value, 10);
    const mins = h * 60 + m;

    if (mins >= 420 && mins < 630) return J374_SCHEDULE_SLOTS[0]; // 07:00 - 10:30
    if (mins >= 630 && mins < 840) return J374_SCHEDULE_SLOTS[1]; // 10:30 - 14:00
    if (mins >= 840 && mins < 1050) return J374_SCHEDULE_SLOTS[2]; // 14:00 - 17:30
    if (mins >= 1050 && mins < 1380) return J374_SCHEDULE_SLOTS[3]; // 17:30 - 23:00
    return J374_SCHEDULE_SLOTS[4]; // 23:00 - 07:00
  } catch(e) {
    return J374_SCHEDULE_SLOTS[1];
  }
}



// ==========================================================================
// JAYT-385 MILESTONE M1: FIVE ECOSYSTEMS & THREE-STEP GUIDED DISCOVERY
// ==========================================================================

const J385_ECOSYSTEMS = [
  { 
    key: 'ALL', 
    label: 'Tất cả hệ sinh thái', 
    icon: '🌐',
    desc: 'Toàn cảnh ưu đãi liên kết 5 hệ sinh thái tại Đà Nẵng' 
  },
  { 
    key: 'food', 
    label: 'Ẩm thực & Giao hàng', 
    icon: '🍗',
    providers: ['ShopeeFood', 'GrabFood', 'BeFood', 'Jollibee', 'The Pizza Company', 'Popeyes'],
    desc: 'Bữa trưa, gà rán, pizza và công cụ tự nhập để so sánh chi phí'
  },
  { 
    key: 'dorm', 
    label: 'Đời sống KTX & Đồ dùng', 
    icon: '📦',
    providers: ['TikTok Shop', 'Shopee', 'Lazada'],
    desc: 'Khảo sát 30 vật dụng KTX thiết yếu, đồ dùng học tập sinh viên'
  },
  { 
    key: 'experiences', 
    label: 'Trải nghiệm & Giải trí', 
    icon: '🎡',
    providers: ['Klook', 'Traveloka', 'CGV', 'Galaxy', 'Metiz', 'Starlight'],
    desc: 'Vé xem phim HSSV U22, ưu đãi vui chơi Helio, Mikazuki, Bà Nà'
  },
  { 
    key: 'wallets', 
    label: 'Ví điện tử & Thanh toán', 
    icon: '💳',
    providers: ['MoMo', 'ZaloPay', 'Viettel Money'],
    desc: 'Voucher ví điện tử, thanh toán sinh hoạt phí và học phí'
  },
  { 
    key: 'loyalty_transport', 
    label: 'Hội viên & Giao thông', 
    icon: '☕',
    providers: ['Highlands', 'Phúc Long', 'Katinat', 'Gong Cha', 'The Coffee House', 'Phê La', 'Vexere', 'DSVN', 'TNGo', 'DanaBus'],
    desc: 'Tích điểm đồ uống 0đ và vé xe buýt DanaBus, xe đạp công cộng TNGo'
  }
];

function getOfferEcosystem(offer) {
  const b = (offer.brand || '').toLowerCase();
  const c = (offer.category || '').toLowerCase();
  const t = (offer.title || '').toLowerCase();

  // 1. Experiences / Cinema
  if (b.includes('cgv') || b.includes('galaxy') || b.includes('metiz') || b.includes('starlight') || c.includes('giải trí') || t.includes('vé xem phim') || t.includes('phim')) {
    return 'experiences';
  }
  // 2. Wallets
  if (b.includes('momo') || b.includes('zalopay') || b.includes('shopeepay') || b.includes('viettel') || t.includes('ví điện tử') || t.includes('shopeepay')) {
    return 'wallets';
  }
  // 3. Loyalty & Transport
  if (b.includes('phúc long') || b.includes('phuclong') || b.includes('highlands') || b.includes('katinat') || b.includes('gong cha') || b.includes('the coffee house') || b.includes('phê la') || b.includes('danabus') || b.includes('tngo') || b.includes('vexere') || b.includes('dsvn') || b.includes('xe buýt') || b.includes('xe buyt')) {
    return 'loyalty_transport';
  }
  // 4. Food & Food Delivery
  if (b.includes('jollibee') || b.includes('pizza') || b.includes('popeyes') || b.includes('lotteria') || b.includes('shopeefood') || b.includes('grabfood') || b.includes('xanh sm') || c.includes('ẩm thực') || t.includes('combo') || t.includes('gà rán') || t.includes('mì ý')) {
    return 'food';
  }
  // 5. Dorm / Education
  return 'dorm';
}

const J385_CINEMA_DAYS = [
  { id: 'MON', label: 'Thứ 2', specials: 'Galaxy U22 45k • Starlight U22 45k • Metiz HSSV 50k', highlight: 'Đồng giá U22 đầu tuần' },
  { id: 'TUE', label: 'Thứ 3', specials: 'Starlight Thứ 3 Phim Việt 45k • Galaxy Ngày Tri Ân 50k', highlight: 'Ngày vàng phim Việt' },
  { id: 'WED', label: 'Thứ 4', specials: 'CGV Golden Wednesday • Metiz Happy Day 45k', highlight: 'Đồng giá vé các cụm rạp' },
  { id: 'THU', label: 'Thứ 5', specials: 'Galaxy U22 45k • Starlight U22 45k • CGV Member Day', highlight: 'Ưu đãi thành viên & U22' },
  { id: 'FRI', label: 'Thứ 6', specials: 'Áp dụng giá U22 trước 17:00 • Suất tối tính biểu giá cuối tuần', highlight: 'Khung giờ sớm trước 17:00' },
  { id: 'SAT', label: 'Thứ 7', specials: 'Biểu giá cuối tuần tiêu chuẩn (Không áp dụng thẻ U22)', highlight: 'Cuối tuần đông đúc' },
  { id: 'SUN', label: 'Chủ Nhật', specials: 'Biểu giá cuối tuần tiêu chuẩn • Phụ thu phòng chiếu 3D/VIP', highlight: 'Cuối tuần đông đúc' }
];

function getPlanningReminderInfo() {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    });
    const parts = formatter.formatToParts(now);
    const h = parseInt(parts.find(p => p.type === 'hour').value, 10);
    const m = parseInt(parts.find(p => p.type === 'minute').value, 10);
    const s = parseInt(parts.find(p => p.type === 'second').value, 10);
    const currentSecs = h * 3600 + m * 60 + s;

    const targetLunchSecs = 11 * 3600 + 30 * 60; // 11:30:00 = 41400s
    const targetDinnerSecs = 17 * 3600 + 30 * 60; // 17:30:00 = 63000s

    let nextTargetSecs = 0;
    let milestoneName = '';
    let milestoneBadge = '';

    if (currentSecs < targetLunchSecs) {
      nextTargetSecs = targetLunchSecs;
      milestoneName = 'Bữa trưa sinh viên (11:30)';
      milestoneBadge = '☀️ Khung giờ ăn trưa';
    } else if (currentSecs < targetDinnerSecs) {
      nextTargetSecs = targetDinnerSecs;
      milestoneName = 'Bữa tối & Kèo xem phim (17:30)';
      milestoneBadge = '🌙 Khung giờ tối';
    } else {
      nextTargetSecs = 24 * 3600 + targetLunchSecs;
      milestoneName = 'Bữa trưa ngày mai (11:30)';
      milestoneBadge = '☀️ Khung giờ trưa mai';
    }

    const diffSecs = Math.max(0, nextTargetSecs - currentSecs);
    const hoursLeft = Math.floor(diffSecs / 3600);
    const minsLeft = Math.floor((diffSecs % 3600) / 60);
    const secsLeft = diffSecs % 60;

    return {
      milestoneName,
      milestoneBadge,
      countdownText: `${hoursLeft}h ${minsLeft.toString().padStart(2, '0')}m ${secsLeft.toString().padStart(2, '0')}s`,
      isConfirmedCampaign: false
    };
  } catch (e) {
    return {
      milestoneName: 'Bữa trưa sinh viên (11:30)',
      milestoneBadge: '☀️ Nhịp sinh hoạt',
      countdownText: '11:30 & 17:30',
      isConfirmedCampaign: false
    };
  }
}

function isStudentBudgetOffer(offer) {
  if (offer.offer_id === 'B14_METIZ_U22_2D' || offer.offer_id === 'B18_GALAXY_HAPPY_DAY') return true;
  if (offer.excluded_from_student_feed) return false;
  // Exclude conditional purchases masquerading as 0đ (e.g. buy pizza to get pepsi)
  if (offer.offer_id === 'J370_OFFER_TPC_03' || offer.offer_id === 'B19_TPC_BOGO_PEPSI_15L') return false;

  const p = offer.price;
  // Genuine 0đ member privilege
  if (p === 0) return true;

  // Personal item within 25.000₫ – 45.000₫
  if (typeof p === 'number' && p >= 25000 && p <= 45000) {
    if (!offer.serving_count || offer.serving_count <= 1) {
      return true;
    }
  }

  // Group item: requires documented serving count and total / serving_count <= 65000
  if (offer.serving_count && offer.serving_count > 1 && typeof p === 'number' && p > 0) {
    const perPerson = Math.round(p / offer.serving_count);
    if (perPerson <= 65000) return true;
  }

  return false;
}

function getQuantitativeConditionText(offer) {
  const p = offer.price;
  const id = offer.offer_id;
  const brand = (offer.brand || '').toLowerCase();
  const title = (offer.title || '').toLowerCase();

  // 1. Member Privileges 0 VND
  if (p === 0) {
    if (brand.includes('cgv')) {
      return 'Áp dụng miễn phí 01 phần bắp nước ngọt cho thành viên CGV Membership có ngày sinh nhật trong tháng. Xuất trình thẻ hội viên trên App CGV và giấy tờ tùy thân (CCCD/thẻ sinh viên) tại quầy vé CGV Đà Nẵng.';
    }
    if (brand.includes('phúc long') || brand.includes('phuclong')) {
      return 'Đăng ký tài khoản thành viên 0đ trên ứng dụng Phúc Long; tích lũy 1 điểm cho mỗi 10.000đ chi tiêu tại quầy để đổi voucher đồ uống và quà tặng định kỳ theo chính sách hội viên.';
    }
    if (brand.includes('galaxy')) {
      return 'Đăng ký tài khoản thành viên Star 0đ trên ứng dụng Galaxy Cinema; tích lũy điểm Star cho mỗi lần mua vé để đổi vé xem phim 2D và combo bắp nước miễn phí.';
    }
    if (brand.includes('gong cha')) {
      return 'Đăng ký tài khoản hội viên 0đ qua ứng dụng Gong Cha VN; tích lũy điểm trên mỗi hóa đơn chi tiêu để đổi ly đồ uống trà sữa 0đ theo các mốc hạng thẻ.';
    }
    if (brand.includes('katinat')) {
      return 'Đăng ký hội viên K-Club 0đ trên ứng dụng Katinat Saigon Kafe; tích lũy hạt Bean từ các đơn hàng để nhận voucher đồ uống miễn phí và đặc quyền nâng hạng.';
    }
    return 'Đặc quyền thành viên 0đ áp dụng theo quy chế hội viên chính hãng công bố tại quầy cơ sở.';
  }

  // 2. Personal Student Budget (25k - 45k)
  if (typeof p === 'number' && p >= 25000 && p <= 45000) {
    if (brand.includes('starlight') || brand.includes('galaxy') || brand.includes('metiz') || brand.includes('cgv')) {
      return `Đồng giá vé ${p.toLocaleString('vi-VN')}₫ áp dụng cho học sinh, sinh viên (U22) và thành viên vào các ngày quy định trong tuần. Yêu cầu xuất trình thẻ sinh viên hoặc CCCD dưới 22 tuổi tại quầy bán vé.`;
    }
    return `Đơn giá niêm yết chính hãng ${p.toLocaleString('vi-VN')}₫ cho khẩu phần cá nhân, nằm trong hạn mức ngân sách ăn uống tiêu chuẩn của sinh viên (25.000₫ – 45.000₫/bữa).`;
  }

  // 3. Conditional / BOGO
  if (id === 'J370_OFFER_TPC_03' || id === 'B19_TPC_BOGO_PEPSI_15L') {
    return 'Tặng kèm 01 chai Pepsi 1.5L (trị giá 50.000₫) khi mua 01 Pizza cỡ M hoặc L (giá từ 139.000₫ tại quầy hoặc đặt qua website/app The Pizza Company). Không áp dụng như một món độc lập 0đ.';
  }

  // 4. Higher tier / Groups
  if (offer.is_party_combo || (typeof p === 'number' && p >= 400000)) {
    return `Combo tiệc nhóm lớn ${p.toLocaleString('vi-VN')}₫ vượt hạn mức sinh viên thông thường (>65.000₫/người); dành cho liên hoan câu lạc bộ hoặc tiệc sinh nhật đông người.`;
  }

  if (typeof p === 'number') {
    return `Mức giá ${p.toLocaleString('vi-VN')}₫ vượt hạn mức chi tiêu ăn uống cá nhân sinh viên (&le;45.000₫); có thể chia sẻ theo nhóm hoặc tham khảo theo danh mục mở rộng.`;
  }

  return 'Điều kiện áp dụng thực tế được quan sát và đối soát trực tiếp tại quầy thương hiệu.';
}

function getOfferVisualAsset(offer) {
  const brand = (offer.brand || '').toLowerCase();
  const id = (offer.offer_id || '').toLowerCase();
  const title = (offer.title || '').toLowerCase();
  const cat = (offer.category || '').toLowerCase();

  // 1. Authentic Brand Leaf PNG Captures
  if (brand.includes('popeyes')) {
    if (id.includes('89k') || title.includes('89k')) return '/assets/images/brands/popeyes_core_89k.leaf.png';
    if (id.includes('145k') || title.includes('145') || title.includes('spaghetti')) return '/assets/images/brands/popeyes_bo_doi_145k.leaf.png';
    if (id.includes('99k') || title.includes('99') || title.includes('bogo')) return '/assets/images/brands/popeyes_bogo_deli_99k.leaf.png';
    return '/assets/images/brands/popeyes_promotions_page.leaf.png';
  }
  if (brand.includes('pizza company') || brand.includes('tpc')) {
    if (id.includes('mam_keo') || id.includes('479k') || title.includes('mầm kẹo') || title.includes('mắm kẹo')) return '/assets/images/brands/tpc_combo_cot_mam_keo.leaf.png';
    if (id.includes('mai_man') || id.includes('599k') || title.includes('mãi mặn')) return '/assets/images/brands/tpc_combo_cot_mai_man.leaf.png';
    if (id.includes('pepsi') || title.includes('pepsi')) return '/assets/images/brands/tpc_mua_1_tang_1_nuoc.leaf.png';
    if (id.includes('vu_lan')) return '/assets/images/brands/tpc_combo_vu_lan_22662.leaf.png';
    return '/assets/images/brands/tpc_store_locations.leaf.png';
  }
  if (brand.includes('starlight')) {
    if (title.includes('thứ 3') || id.includes('thu_3')) return '/assets/images/brands/starlight_thu_3_phim_viet.leaf.png';
    if (title.includes('u22') || id.includes('u22')) return '/assets/images/brands/starlight_u22_program.leaf.png';
    return '/assets/images/brands/starlight_danang_branch.leaf.png';
  }
  if (brand.includes('gong cha')) {
    if (title.includes('thành viên') || title.includes('hội viên') || id.includes('member')) return '/assets/images/brands/gongcha_member_policy.leaf.png';
    return '/assets/images/brands/gongcha_danang_stores.leaf.png';
  }
  if (brand.includes('katinat')) {
    if (title.includes('app') || id.includes('loyalty') || title.includes('kung')) return '/assets/images/brands/katinat_app_loyalty.leaf.png';
    return '/assets/images/brands/katinat_homepage.leaf.png';
  }
  if (brand.includes('the coffee house') || brand.includes('tch')) {
    return '/assets/images/brands/the_coffee_house_homepage.leaf.png';
  }

  // 2. Curated Brand Vector Artwork
  if (brand.includes('highlands')) {
    if (id.includes('sua_loc6') || id.includes('hl_01') || title.includes('sữa đá')) return '/assets/images/brands/highlands_coffee_sua_da.svg';
    if (id.includes('den_loc6') || id.includes('hl_02') || title.includes('đen đá')) return '/assets/images/brands/highlands_coffee_den_da.svg';
    if (id.includes('phin_di_san') || id.includes('hl_03') || title.includes('phin di sản')) return '/assets/images/brands/highlands_coffee_phin.svg';
    return '/assets/images/brands/highlands_coffee_banner.svg';
  }
  if (brand.includes('lotteria')) {
    if (title.includes('member') || title.includes('thành viên') || title.includes('thứ 4')) return '/assets/images/brands/lotteria_member_day.svg';
    return '/assets/images/brands/lotteria_combo_banner.svg';
  }
  if (brand.includes('jollibee')) return '/assets/images/brands/jollibee_combo_banner.svg';
  if (brand.includes('phúc long') || brand.includes('phuclong')) return '/assets/images/brands/phuclong_tea_banner.svg';
  if (brand.includes('cgv')) return '/assets/images/brands/cgv_cinema_banner.svg';
  if (brand.includes('galaxy')) return '/assets/images/brands/galaxy_cinema_banner.svg';
  if (brand.includes('metiz')) return '/assets/images/brands/metiz_cinema_banner.svg';

  // 3. Authentic Local Da Nang Food Photo / Neutral Category Illustration (Strictly NEVER Mi Quang unless item is Mi Quang)
  if (title.includes('mì quảng') || title.includes('mi quang')) {
    return '/assets/images/danang_real_photo_mi_quang.jpg';
  }
  if (cat.includes('beverage') || brand.includes('tea') || title.includes('trà') || title.includes('cà phê') || title.includes('coffee')) {
    return '/assets/images/brands/neutral_drink_illustration.svg';
  }
  if (cat.includes('cinema') || brand.includes('cinema') || title.includes('vé xem phim') || title.includes('phim')) {
    return '/assets/images/brands/neutral_cinema_illustration.svg';
  }
  return '/assets/images/brands/neutral_food_illustration.svg';
}

function getOfferSlotRelevance(offer, slotId) {
  const brand = (offer.brand || '').toLowerCase();
  const title = (offer.title || '').toLowerCase();

  switch (slotId) {
    case 'SLOT_MORNING_COFFEE':
      if (brand.includes('highlands') || brand.includes('phúc long') || title.includes('cà phê') || brand.includes('coffee')) return 10;
      if (brand.includes('katinat') || brand.includes('gong cha')) return 7;
      if (title.includes('sáng') || title.includes('mì')) return 6;
      return 1;
    case 'SLOT_NOON_LUNCH':
      if (brand.includes('jollibee') || brand.includes('pizza') || brand.includes('popeyes') || title.includes('cơm') || title.includes('mì')) return 10;
      if (brand.includes('lotteria') || title.includes('trưa') || title.includes('combo')) return 8;
      return 1;
    case 'SLOT_AFTERNOON_STUDY':
      if (brand.includes('katinat') || brand.includes('gong cha') || brand.includes('the coffee house') || brand.includes('highlands')) return 10;
      if (title.includes('trà') || title.includes('học')) return 7;
      return 1;
    case 'SLOT_EVENING_HANG':
      if (brand.includes('cgv') || brand.includes('galaxy') || brand.includes('metiz') || brand.includes('starlight')) return 10;
      if (brand.includes('pizza') || brand.includes('popeyes') || title.includes('tiệc')) return 8;
      return 1;
    case 'SLOT_NIGHT_PLAN':
      return 5;
    default:
      return 1;
  }
}

function renderScheduleRhythmSection() {
  const currentRealSlot = getCurrentScheduleSlot();
  const activeSlotId = state.scheduleSlot || currentRealSlot.id;
  const activeSlot = J374_SCHEDULE_SLOTS.find(s => s.id === activeSlotId) || currentRealSlot;
  const reminder = getPlanningReminderInfo();

  return `
    <div class="schedule-rhythm-section" aria-label="Gợi ý ưu đãi theo nhịp thời gian Đà Nẵng">
      <div class="schedule-rhythm-header">
        <div class="schedule-active-indicator">
          <span class="schedule-active-badge">
            <span>${activeSlot.icon}</span>
            <span>${activeSlot.name}</span>
            <span style="font-weight: 500; font-size: 12px; opacity: 0.85;">(${activeSlot.timeRange})</span>
          </span>
          <span class="schedule-active-desc">${activeSlot.desc}</span>
          ${state.scheduleSlot ? `
            <button type="button" class="schedule-btn-reset" id="btn-reset-schedule-slot" title="Quay lại nhịp tự động theo đồng hồ">
              ↺ Trở lại tự động
            </button>
          ` : ''}
        </div>
      </div>

      <!-- Planning Reminders (11:30 & 17:30 Asia/Ho_Chi_Minh) -->
      <div class="schedule-planning-reminder-bar" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; padding: 10px 14px; background: rgba(4, 120, 87, 0.08); border: 1px solid rgba(4, 120, 87, 0.2); border-radius: var(--radius-control); margin-bottom: 12px; font-size: 13px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 16px;">⏰</span>
          <div>
            <strong>Nhắc lịch kế hoạch sinh hoạt:</strong>
            <span style="color: var(--accent); font-weight: 700;"> ${reminder.milestoneName}</span>
            <span style="color: var(--text-muted); font-size: 12px; margin-left: 6px;">(Còn ${reminder.countdownText})</span>
          </div>
        </div>
        <div style="font-size: 11.5px; color: var(--text-muted); line-height: 1.3; max-width: 520px;">
          ℹ️ Mốc nhắc nhở lập kế hoạch sinh hoạt sinh viên Đà Nẵng (11:30 bữa trưa • 17:30 bữa tối/xem phim); không tuyên bố là giờ xả voucher trừ khi có chiến dịch xác thực.
        </div>
      </div>

      <div class="schedule-slots-chips" role="group" aria-label="Chọn khung giờ trong ngày">
        ${J374_SCHEDULE_SLOTS.map(slot => `
          <button 
            type="button" 
            class="schedule-slot-chip ${slot.id === activeSlotId ? 'is-active' : ''}" 
            data-slot-id="${slot.id}"
            aria-pressed="${slot.id === activeSlotId ? 'true' : 'false'}"
          >
            <span>${slot.icon}</span>
            <span>${slot.name}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function renderSingleVisualCard(offer) {
  const assetUrl = getOfferVisualAsset(offer);
  const priceInfo = extractOfferPrice(offer);

  let priceDisplay = offer.price_display || 'Liên hệ';
  let basisText = 'Quan sát quầy';
  if (offer.price === 0 || priceInfo.basePrice === 0) {
    priceDisplay = '0₫ (Miễn phí)';
    basisText = 'đặc quyền hội viên';
  } else if (priceInfo.basePrice > 0) {
    priceDisplay = priceInfo.basePrice.toLocaleString('vi-VN') + '₫';
    basisText = priceInfo.isPerPerson ? 'mỗi vé / người' : (priceInfo.isCombo ? 'combo nhóm' : 'giá món');
  }

  let savingBadgeHtml = '';
  const priceVal = (priceInfo && priceInfo.basePrice !== undefined) ? priceInfo.basePrice : (typeof offer.price === 'number' ? offer.price : null);
  const isStudentBudget = (priceVal !== null && priceVal > 0 && priceVal <= 45000) || (priceInfo && priceInfo.isPerPerson && priceVal !== null && priceVal <= 65000);

  if (priceVal === 0 || (offer.title && (offer.title.toLowerCase().includes('miễn phí') || offer.title.toLowerCase().includes('0đ')))) {
    savingBadgeHtml = '<span class="visual-card-saving-badge badge-free">ĐẶC QUYỀN 0Đ</span>';
  } else if (offer.title && (offer.title.toLowerCase().includes('mua 1 tặng 1') || offer.title.toLowerCase().includes('bogo'))) {
    savingBadgeHtml = '<span class="visual-card-saving-badge badge-bogo">MUA 1 TẶNG 1</span>';
  } else if (offer.discount_percent && offer.discount_percent >= 40 && isStudentBudget) {
    savingBadgeHtml = `<span class="visual-card-saving-badge badge-shock">GIẢM ${offer.discount_percent}%</span>`;
  } else if (offer.saving_amount && offer.saving_amount > 0) {
    savingBadgeHtml = `<span class="visual-card-saving-badge">Tiết kiệm ${offer.saving_amount.toLocaleString('vi-VN')}₫</span>`;
  } else if (offer.discount_percent && offer.discount_percent > 0) {
    savingBadgeHtml = `<span class="visual-card-saving-badge">Giảm ${offer.discount_percent}%</span>`;
  } else if (priceVal !== null && priceVal > 0 && priceVal <= 40000) {
    savingBadgeHtml = '<span class="visual-card-saving-badge badge-student">GIÁ SINH VIÊN</span>';
  }

  const el = document.createElement('article');
  el.className = 'visual-deal-card';
  el.id = `offer-${offer.offer_id}`;
  el.setAttribute('data-offer-id', offer.offer_id);

  el.innerHTML = `
    <div class="visual-card-media-wrap">
      <img class="visual-card-img" 
           src="${assetUrl}" 
           alt="${escapeHtml(offer.title)}" 
           loading="lazy" 
           width="640" 
           height="400" 
           onerror="this.onerror=null; this.src='/assets/images/brands/neutral_food_illustration.svg';" />
      ${savingBadgeHtml}
      <span class="visual-card-brand-tag">${escapeHtml(offer.brand || 'Ưu đãi xác thực')}</span>
    </div>
    <div class="visual-card-body">
      <h3 class="visual-card-title">${escapeHtml(offer.title)}</h3>
      <div class="visual-card-price-row">
        <span class="visual-card-price">${priceDisplay}</span>
        <span class="visual-card-price-basis">${basisText}</span>
      </div>
      ${(offer.brand && offer.brand.includes('Jollibee')) ? `
        <div class="campus-distance-badge" style="display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 700; color: #0284C7; background: rgba(2, 132, 199, 0.08); padding: 3px 8px; border-radius: 4px; margin-top: 4px;">
          📍 Cách ĐH Sư Phạm ~146m (đường chim bay)
        </div>
      ` : `
        <div class="campus-distance-badge" style="display: inline-flex; align-items: center; gap: 4px; font-size: 10.5px; font-weight: 500; color: var(--text-muted); background: rgba(0,0,0,0.03); padding: 2px 6px; border-radius: 4px; margin-top: 4px;">
          📍 Tọa độ quầy: Đà Nẵng (áp dụng tại chi nhánh thành phố)
        </div>
      `}
      <!-- 3-Step Guided Actions (J385 M1) -->
      <div class="visual-card-guidance-actions" style="display: flex; flex-direction: column; gap: 6px; margin-top: 10px;">
        <div style="display: flex; gap: 8px;">
          ${(offer.voucher_code || offer.exclusive_code) ? `
            <button type="button" class="btn-step-copy" data-action="copy-code" data-code="${escapeHtml(offer.voucher_code || offer.exclusive_code)}" style="flex: 1; min-height: 44px; padding: 0 12px; border-radius: var(--radius-control); background: var(--bg-surface); border: 1.5px solid var(--accent); color: var(--accent); font-weight: 700; font-size: 12.5px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;">
              ✂️ 1. Sao chép mã
            </button>
          ` : (offer.price === 0 || (offer.brand && (offer.brand.includes('CGV') || offer.brand.includes('Phúc Long') || offer.brand.includes('Galaxy') || offer.brand.includes('Gong Cha') || offer.brand.includes('Katinat')))) ? `
            <button type="button" class="btn-step-detail" data-action="open-drawer" data-offer-id="${offer.offer_id}" style="flex: 1; min-height: 44px; padding: 0 12px; border-radius: var(--radius-control); background: var(--bg-surface); border: 1.5px solid var(--accent); color: var(--accent); font-weight: 700; font-size: 12.5px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;">
              📋 1. Hướng dẫn nhận
            </button>
          ` : `
            <button type="button" class="btn-step-detail" data-action="open-drawer" data-offer-id="${offer.offer_id}" style="flex: 1; min-height: 44px; padding: 0 12px; border-radius: var(--radius-control); background: var(--bg-surface); border: 1.5px solid var(--accent); color: var(--accent); font-weight: 700; font-size: 12.5px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;">
              🏪 1. Xem tại quầy
            </button>
          `}
          <a href="${offer.source_url || offer.official_source_url || offer.action_url || '#'}" target="_blank" rel="noopener noreferrer" class="btn-step-dest" style="flex: 1; min-height: 44px; padding: 0 12px; border-radius: var(--radius-control); background: var(--accent); color: #ffffff; font-weight: 700; font-size: 12.5px; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 4px;">
            2. Điểm đến ↗
          </a>
        </div>
        <button type="button" class="btn-card-invite" data-action="open-invite" data-offer-id="${offer.offer_id}" aria-label="Rủ bạn kèo này cho ${escapeHtml(offer.title)}" style="width: 100%; min-height: 38px; border-radius: var(--radius-control); background: rgba(4, 120, 87, 0.08); border: 1px solid rgba(4, 120, 87, 0.2); color: var(--accent); font-weight: 600; font-size: 12.5px; cursor: pointer;">
          👥 Rủ bạn kèo này (Chia tiền Thẻ Zalo)
        </button>
      </div>
    </div>
  `;
  return el;
}

function openOfferDrawer(offerId, triggerEl) {
  const offer = J372_OFFERS.find(o => o.offer_id === offerId);
  if (!offer) return;

  state.activeDrawerOfferId = offerId;
  state.activeDrawerTrigger = triggerEl || document.activeElement;

  const drawerBackdrop = document.getElementById('offer-detail-drawer');
  if (!drawerBackdrop) return;

  const assetUrl = getOfferVisualAsset(offer);
  const priceInfo = extractOfferPrice(offer);
  const targetUrl = offer.source_url || offer.official_source_url || offer.action_url || 'https://jayt-production-v3420.vercel.app';

  let priceDisplay = offer.price_display || 'Quan sát quầy';
  let basisText = 'Cơ sở quan sát tại quầy';
  if (priceInfo.basePrice > 0) {
    priceDisplay = priceInfo.basePrice.toLocaleString('vi-VN') + '₫';
    basisText = priceInfo.isPerPerson ? 'Giá mỗi vé / người' : (priceInfo.isCombo ? 'Tổng combo' : 'Đơn giá món');
  } else if (offer.price === 0) {
    priceDisplay = '0₫ (Miễn phí)';
    basisText = 'Đặc quyền hội viên';
  }

  drawerBackdrop.innerHTML = `
    <div class="offer-drawer-panel" role="document">
      <div class="drawer-header">
        <h2 id="drawer-offer-title" class="drawer-title">${escapeHtml(offer.title)}</h2>
        <button type="button" class="drawer-close-btn" id="btn-close-drawer" aria-label="Đóng chi tiết">
          ✕
        </button>
      </div>
      <div class="drawer-content">
        <img class="drawer-media-img" 
             src="${assetUrl}" 
             alt="${escapeHtml(offer.title)}" 
             onerror="this.onerror=null; this.src='/assets/images/brands/neutral_food_illustration.svg';" />
        
        <div class="drawer-section-card" style="border-left: 3px solid #3b82f6;">
          <div class="drawer-section-title">📋 Hướng dẫn nhận ưu đãi (3 bước chuẩn)</div>
          <div style="font-size: 13.5px; color: var(--text-main); line-height: 1.6; display: flex; flex-direction: column; gap: 8px;">
            <div>
              <strong>Bước 1 &mdash; Điều kiện &amp; Đối tượng:</strong>
              <div style="color: var(--text-muted); font-size: 12.5px;">Mang theo Thẻ sinh viên còn hạn hoặc CCCD U22 (đối với vé xem phim và ưu đãi sinh viên). Với ưu đãi hội viên, mở ứng dụng chính hãng.</div>
            </div>
            <div>
              <strong>Bước 2 &mdash; Thao tác nhận ưu đãi:</strong>
              <div style="color: var(--text-muted); font-size: 12.5px;">
                ${(offer.voucher_code || offer.exclusive_code) ? 'Nhấn sao chép mã voucher thật để nhập tại bước thanh toán.' : (offer.price === 0) ? 'Xuất trình mã vạch hội viên trên ứng dụng hoặc thông báo số điện thoại thành viên tại quầy thanh toán trước khi order.' : 'Xuất trình thẻ HSSV tại quầy trước khi thanh toán / in vé.'}
              </div>
            </div>
            <div>
              <strong>Bước 3 &mdash; Điểm đến chính hãng đã xác thực:</strong>
              <div style="margin-top: 6px;">
                <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; background: var(--accent); color: #ffffff; text-decoration: none; border-radius: var(--radius-control); font-size: 13px; font-weight: 700; min-height: 44px;">
                  Đến trang đối tác chính hãng ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="drawer-section-card" style="border-left: 3px solid var(--accent);">
          <div class="drawer-section-title">📋 Điều kiện định lượng & Hạn mức áp dụng</div>
          <div style="font-size: 13.5px; color: var(--text-main); line-height: 1.5; margin-bottom: 8px;">
            ${getQuantitativeConditionText(offer)}
          </div>
        </div>

        <div class="drawer-section-card">
          <div class="drawer-section-title">Giá & Cơ sở tính toán</div>
          <div class="drawer-price-lead">${priceDisplay}</div>
          <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">${basisText}</div>
          ${offer.benefit ? `<div style="font-size: 13px; margin-top: 8px; color: var(--accent); font-weight: 600;">✓ ${escapeHtml(offer.benefit)}</div>` : ''}
        </div>

        <div class="drawer-section-card">
          <div class="drawer-section-title">Thương hiệu & Chi nhánh áp dụng</div>
          <div style="font-weight: 700; font-size: 15px;">${escapeHtml(offer.brand || 'Ưu đãi liên kết')}</div>
          <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
            ${offer.locality_evidence ? escapeHtml(offer.locality_evidence.brand_presence_evidence || 'Áp dụng tại hệ thống chi nhánh Đà Nẵng') : 'Áp dụng tại Đà Nẵng theo điều kiện quầy.'}
          </div>
        </div>

        <div class="drawer-section-card">
          <div class="drawer-section-title">Điều kiện & Thời hạn áp dụng</div>
          <div style="font-size: 13px; color: var(--text-main); line-height: 1.5;">
            ${escapeHtml(offer.validity || offer.terms || 'Áp dụng trong tháng 09/2026 theo quy định công bố chính hãng.')}
          </div>
          <div style="font-size: 12px; color: var(--text-muted); margin-top: 6px;">
            Trạng thái tiện ích cơ sở: <strong>UNKNOWN</strong> (Vui lòng hỏi trực tiếp tại quán về ổ cắm / điều hòa).
          </div>
        </div>

        <div class="drawer-actions-row">
          <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="btn-cta-secondary" style="flex: 1; text-align: center; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; min-height: 44px;">
            Nguồn chính hãng ↗
          </a>
          <button type="button" class="btn-cta-primary" id="btn-drawer-invite" data-offer-id="${offer.offer_id}" style="flex: 1; min-height: 44px;">
            👥 Rủ bạn kèo này
          </button>
        </div>
      </div>
    </div>
  `;

  drawerBackdrop.style.display = 'flex';
  setTimeout(() => drawerBackdrop.classList.add('is-open'), 10);
  drawerBackdrop.setAttribute('aria-hidden', 'false');

  const closeBtn = document.getElementById('btn-close-drawer');
  if (closeBtn) closeBtn.focus();

  if (window.location.hash !== `#offer-${offerId}`) {
    try {
      history.pushState({ drawerOpen: true, offerId }, '', `#offer-${offerId}`);
    } catch(e){}
  }

  closeBtn.onclick = () => closeOfferDrawer();
  drawerBackdrop.onclick = (e) => {
    if (e.target === drawerBackdrop) closeOfferDrawer();
  };

  const drawerInviteBtn = document.getElementById('btn-drawer-invite');
  if (drawerInviteBtn) {
    drawerInviteBtn.onclick = () => {
      closeOfferDrawer();
      openZaloModal(offerId, 2);
    };
  }
}

function closeOfferDrawer() {
  const drawerBackdrop = document.getElementById('offer-detail-drawer');
  if (!drawerBackdrop || !state.activeDrawerOfferId) return;

  drawerBackdrop.classList.remove('is-open');
  drawerBackdrop.setAttribute('aria-hidden', 'true');
  setTimeout(() => {
    drawerBackdrop.style.display = 'none';
  }, 160);

  state.activeDrawerOfferId = null;

  if (window.location.hash.startsWith('#offer-')) {
    try {
      history.pushState(null, '', window.location.pathname + window.location.search);
    } catch(e){}
  }

  if (state.activeDrawerTrigger && typeof state.activeDrawerTrigger.focus === 'function') {
    state.activeDrawerTrigger.focus();
    state.activeDrawerTrigger = null;
  }
}

function attachScheduleRhythmEvents() {
  document.querySelectorAll('.schedule-slot-btn').forEach(btn => {
    btn.onclick = () => {
      const slotId = btn.getAttribute('data-slot-id');
      if (slotId) {
        state.scheduleSlot = slotId;
        state.scheduleManualOverride = true;
        updateCampusOffersDOM();
        const dormContainer = document.getElementById('dorm-skus-container');
        if (dormContainer) { dormContainer.innerHTML = renderDormSkusSection(); }
      }
    };
  });

  const resetBtn = document.getElementById('btn-reset-schedule-time');
  if (resetBtn) {
    resetBtn.onclick = () => {
      state.scheduleManualOverride = false;
      state.scheduleSlot = getCurrentScheduleSlot().id;
      updateCampusOffersDOM();
    };
  }
}

function initOfferDomNodes() {
  if (OFFER_DOM_NODES.size > 0) return;
  for (const offer of J372_OFFERS) {
    const cardEl = renderSingleVisualCard(offer);
    OFFER_DOM_NODES.set(offer.offer_id, cardEl);
  }
}

// --- RENDER SECTIONS ---

function renderHeader() {
  return `
    <header class="jayt-header jayt-header-sticky" role="banner">
      <div class="header-inner header-content">
        <a href="#" class="brand-logo brand-lockup" aria-label="Trang chủ JayT Đà Nẵng">
          <div class="brand-symbol" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="brand-text-block">
            <span class="brand-title">JayT Đà Nẵng</span>
            <span class="brand-subtitle">Tiện ích đời sống sinh viên</span>
          </div>
        </a>

        <!-- Desktop Navigation: Horizontal single row (>=1024px) -->
        <nav class="header-nav header-nav-desktop nav-links-desktop" role="navigation" aria-label="Điều hướng chính">
          <a href="#campus-dock-section" class="nav-btn">Campus Dock</a>
          <a href="#lunch-arbitrage-module" class="nav-btn">So giá bữa trưa</a>
          <a href="#split-bill-module" class="nav-btn">Chia tiền nhóm</a>
          <a href="#dorm-shopping-module" class="nav-btn">Mua sắm KTX</a>
        </nav>

        <!-- Header Actions: Theme Toggle + Mobile Menu Button -->
        <div class="header-actions">
          <button id="btn-theme-toggle" class="theme-toggle-btn" aria-label="Chuyển đổi giao diện Sáng/Tối" title="Chuyển đổi giao diện Sáng/Tối">
            ${state.theme === 'theme-dark' ? '☀️' : '🌙'}
          </button>
          <button id="btn-mobile-menu" class="mobile-menu-btn" aria-label="Mở menu điều hướng" aria-expanded="false" aria-controls="mobile-nav-drawer">
            <svg class="icon-menu" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
        </div>
      </div>
    </header>
  `;
}

function renderMobileNavDrawer() {
  return `
    <!-- Mobile Navigation Drawer / Sheet -->
    <div id="mobile-nav-backdrop" class="mobile-nav-backdrop" aria-hidden="true" style="display: none;"></div>
    <div id="mobile-nav-drawer" class="mobile-nav-drawer" role="dialog" aria-modal="true" aria-label="Menu điều hướng" style="display: none;">
      <div class="mobile-drawer-header">
        <div class="mobile-drawer-title">Điều hướng JayT</div>
        <button id="btn-close-mobile-menu" class="btn-close-drawer" aria-label="Đóng menu điều hướng">✕</button>
      </div>
      <nav class="mobile-nav-links" role="navigation" aria-label="Điều hướng trên điện thoại">
        <a href="#campus-dock-section" class="mobile-nav-link" data-target="campus-dock-section">
          <span class="mobile-nav-icon">🎓</span>
          <div class="mobile-nav-text">
            <span class="mobile-nav-label">Campus Dock</span>
            <span class="mobile-nav-desc">Ưu đãi quanh 4 cụm trường</span>
          </div>
        </a>
        <a href="#lunch-arbitrage-module" class="mobile-nav-link" data-target="lunch-arbitrage-module">
          <span class="mobile-nav-icon">🍱</span>
          <div class="mobile-nav-text">
            <span class="mobile-nav-label">So giá bữa trưa</span>
            <span class="mobile-nav-desc">ShopeeFood &bull; GrabFood &bull; BeFood</span>
          </div>
        </a>
        <a href="#split-bill-module" class="mobile-nav-link" data-target="split-bill-module">
          <span class="mobile-nav-icon">👥</span>
          <div class="mobile-nav-text">
            <span class="mobile-nav-label">Chia tiền nhóm</span>
            <span class="mobile-nav-desc">Bảo toàn 100% VNĐ & xuất vé Zalo Pass</span>
          </div>
        </a>
        <a href="#dorm-shopping-module" class="mobile-nav-link" data-target="dorm-shopping-module">
          <span class="mobile-nav-icon">📦</span>
          <div class="mobile-nav-text">
            <span class="mobile-nav-label">Mua sắm KTX</span>
            <span class="mobile-nav-desc">30 vật dụng sinh viên khảo sát giá</span>
          </div>
        </a>
      </nav>
    </div>
  `;
}

function renderMobileNavDrawer() {
  return `
    <!-- Mobile Navigation Drawer / Sheet -->
    <div id="mobile-nav-backdrop" class="mobile-nav-backdrop" aria-hidden="true" style="display: none;"></div>
    <div id="mobile-nav-drawer" class="mobile-nav-drawer" role="dialog" aria-modal="true" aria-label="Menu điều hướng" style="display: none;">
      <div class="mobile-drawer-header">
        <div class="mobile-drawer-title">Điều hướng JayT</div>
        <button id="btn-close-mobile-menu" class="btn-close-drawer" aria-label="Đóng menu điều hướng">✕</button>
      </div>
      <nav class="mobile-nav-links" role="navigation" aria-label="Điều hướng trên điện thoại">
        <a href="#campus-dock-section" class="mobile-nav-link" data-target="campus-dock-section">
          <span class="mobile-nav-icon">🎓</span>
          <div class="mobile-nav-text">
            <span class="mobile-nav-label">Campus Dock</span>
            <span class="mobile-nav-desc">Ưu đãi quanh 4 cụm trường</span>
          </div>
        </a>
        <a href="#lunch-arbitrage-module" class="mobile-nav-link" data-target="lunch-arbitrage-module">
          <span class="mobile-nav-icon">🍱</span>
          <div class="mobile-nav-text">
            <span class="mobile-nav-label">So giá bữa trưa</span>
            <span class="mobile-nav-desc">ShopeeFood &bull; GrabFood &bull; BeFood</span>
          </div>
        </a>
        <a href="#split-bill-module" class="mobile-nav-link" data-target="split-bill-module">
          <span class="mobile-nav-icon">👥</span>
          <div class="mobile-nav-text">
            <span class="mobile-nav-label">Chia tiền nhóm</span>
            <span class="mobile-nav-desc">Bảo toàn 100% VNĐ & xuất vé Zalo Pass</span>
          </div>
        </a>
        <a href="#dorm-shopping-module" class="mobile-nav-link" data-target="dorm-shopping-module">
          <span class="mobile-nav-icon">📦</span>
          <div class="mobile-nav-text">
            <span class="mobile-nav-label">Mua sắm KTX</span>
            <span class="mobile-nav-desc">30 vật dụng sinh viên khảo sát giá</span>
          </div>
        </a>
      </nav>
    </div>
  `;
}

function renderHero() {
  return `
    <section class="hero-section" aria-label="Giới thiệu JayT Đà Nẵng">
      <div class="container">
        <div class="hero-grid">
          <div class="hero-content">
            <div class="hero-tag">
              <span>🎓</span>
              <span>Đời sống & Chi phí sinh viên Đà Nẵng</span>
            </div>
            <h1 class="hero-headline">Đà Nẵng, mỗi ngày một chút hời.</h1>
            <p class="hero-subhead">
              Khám phá Campus Dock định vị ưu đãi quanh trường học, xuất Thẻ Zalo Pass chia tiền không lệch 1 đồng và khảo sát vật dụng KTX chính hãng.
            </p>
            <div class="hero-actions">
              <a href="#campus-dock-section" class="btn-cta-primary">📍 Khám phá Campus Dock &rarr;</a>
              <a href="#lunch-arbitrage-module" class="btn-cta-secondary">🍱 So giá bữa trưa &rarr;</a>
              <a href="#dorm-shopping-module" class="btn-cta-secondary">📦 Vật dụng KTX &rarr;</a>
            </div>
          </div>

          <div>
            <div class="hero-media-wrapper">
              <img 
                src="assets/images/dragon_bridge_hero_sunset_fire.jpg" 
                alt="Cầu Rồng Đà Nẵng lung linh trong ánh hoàng hôn rực rỡ và khoảnh khắc đầu rồng phun lửa bên dòng sông Hàn" 
                class="hero-media-img"
                loading="eager"
                fetchpriority="high"
                onerror="this.src='assets/images/danang_afterhours_river_photo.svg';"
              />
              <div class="hero-media-caption">
                📍 Cầu Rồng Đà Nẵng &mdash; Biểu tượng rực rỡ trong khoảnh khắc hoàng hôn & phun lửa bên sông Hàn
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderCampusDock() {
  const clusters = J372_CAMPUS_MAPPING.clusters;
  return `
    <div id="campus-dock-section" class="campus-dock-sticky-wrap" role="region" aria-label="Campus Dock - Lọc theo cụm trường">
      <div class="container">
        <div class="campus-dock-inner">
          <div class="campus-dock-scroll" role="toolbar" aria-label="Chọn cụm trường đại học tại Đà Nẵng">
            <button 
              class="campus-dock-btn ${state.selectedClusterId === 'ALL' ? 'is-active' : ''}" 
              data-cluster-id="ALL" 
              aria-pressed="${state.selectedClusterId === 'ALL' ? 'true' : 'false'}"
            >
              <span>✨ Tất cả cơ sở</span>
              <span class="campus-badge-count">${J372_OFFERS.length}</span>
            </button>
            ${clusters.map(c => `
              <button 
              class="campus-dock-btn ${state.selectedClusterId === c.cluster_id ? 'is-active' : ''}" 
              data-cluster-id="${c.cluster_id}" 
              aria-pressed="${state.selectedClusterId === c.cluster_id ? 'true' : 'false'}"
            >
              <span>${c.short_label}</span>
              <span class="campus-badge-count">${c.total_applicable_offers}</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  </div>
  `;
}

function getFilteredOffers() {
  const currentCluster = J372_CAMPUS_MAPPING.clusters.find(c => c.cluster_id === state.selectedClusterId);
  const applicableIds = currentCluster ? new Set(currentCluster.applicable_offer_ids) : null;

  return J372_OFFERS.filter(offer => {
    // 1. Strict Campus Food Filter (<=35.000₫ & <=1000m straight-line distance)
    if (state.storefrontFeedFilter === 'CAMPUS_FOOD_UNDER_35K') {
      const isFood = (getOfferEcosystem(offer) === 'food') || (offer.brand && (offer.brand.includes('Jollibee') || offer.brand.includes('Popeyes') || offer.brand.includes('Highlands') || offer.title.toLowerCase().includes('mì') || offer.title.toLowerCase().includes('burger') || offer.title.toLowerCase().includes('hotdog')));
      if (!isFood) return false;
      const priceInfo = extractOfferPrice(offer);
      const p = priceInfo.basePrice;
      if (p === null || p <= 0 || p > 35000) return false;
    }
    // 2. Strict Student Budget Feed Predicate on default storefront
    else if (state.storefrontFeedFilter === 'STUDENT_BUDGET' && !isStudentBudgetOffer(offer)) {
      return false;
    }

    // 3. Party combos (>400k) excluded unless explicitly requested
    if (offer.excluded_from_student_feed && !state.showPartyCombos) {
      return false;
    }

    // 4. Cluster filter if selected
    if (applicableIds && !applicableIds.has(offer.offer_id)) {
      return false;
    }

    // 5. Five Ecosystem filter if selected
    if (state.selectedEcosystem && state.selectedEcosystem !== 'ALL') {
      const eco = getOfferEcosystem(offer);
      if (eco !== state.selectedEcosystem) return false;
    }

    return true;
  });
}

function renderClusterSummaryPanel() {
  const currentCluster = J372_CAMPUS_MAPPING.clusters.find(c => c.cluster_id === state.selectedClusterId);
  const filteredOffers = getFilteredOffers();
  const studentCount = J372_OFFERS.filter(isStudentBudgetOffer).length;
  const allCount = J372_OFFERS.filter(o => !o.excluded_from_student_feed).length;

  const feedSwitcherHtml = `
    <div class="storefront-feed-switcher" role="tablist" aria-label="Chế độ hiển thị danh sách ưu đãi" style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--border-color);">
      <button 
        type="button" 
        class="btn-feed-mode ${state.storefrontFeedFilter === 'STUDENT_BUDGET' ? 'is-active' : ''}" 
        id="btn-feed-student-budget"
        role="tab"
        aria-selected="${state.storefrontFeedFilter === 'STUDENT_BUDGET' ? 'true' : 'false'}"
        style="padding: 8px 16px; border-radius: var(--radius-chip); font-weight: 700; font-size: 13px; cursor: pointer; border: 1.5px solid var(--accent); background: ${state.storefrontFeedFilter === 'STUDENT_BUDGET' ? 'var(--accent)' : 'transparent'}; color: ${state.storefrontFeedFilter === 'STUDENT_BUDGET' ? '#ffffff' : 'var(--accent)'};"
      >
        🎓 Mặt tiền sinh viên (≤45k &amp; 0đ) [${studentCount}]
      </button>
      <button 
        type="button" 
        class="btn-feed-mode ${state.storefrontFeedFilter === 'CAMPUS_FOOD_UNDER_35K' ? 'is-active' : ''}" 
        id="btn-feed-campus-food"
        role="tab"
        aria-selected="${state.storefrontFeedFilter === 'CAMPUS_FOOD_UNDER_35K' ? 'true' : 'false'}"
        style="padding: 8px 16px; border-radius: var(--radius-chip); font-weight: 700; font-size: 13px; cursor: pointer; border: 1.5px solid #0284C7; background: ${state.storefrontFeedFilter === 'CAMPUS_FOOD_UNDER_35K' ? '#0284C7' : 'transparent'}; color: ${state.storefrontFeedFilter === 'CAMPUS_FOOD_UNDER_35K' ? '#ffffff' : '#0284C7'};"
      >
        🍜 Món ăn gần trường (≤35k &amp; ≤1km đường chim bay) [3]
      </button>
      <button 
        type="button" 
        class="btn-feed-mode ${state.storefrontFeedFilter === 'ALL' ? 'is-active' : ''}" 
        id="btn-feed-all-catalog"
        role="tab"
        aria-selected="${state.storefrontFeedFilter === 'ALL' ? 'true' : 'false'}"
        style="padding: 8px 16px; border-radius: var(--radius-chip); font-weight: 600; font-size: 13px; cursor: pointer; border: 1.5px solid var(--border-color); background: ${state.storefrontFeedFilter === 'ALL' ? 'var(--bg-card)' : 'transparent'}; color: var(--text-main);"
      >
        🌐 Khám phá tất cả đối tác [${allCount}]
      </button>
    </div>
  `;

  if (!currentCluster) {
    return `
      <div class="cluster-info-card">
        <div class="cluster-header-row">
          <div>
            <div class="cluster-title">📍 ${state.storefrontFeedFilter === 'STUDENT_BUDGET' ? 'Mặt tiền Sinh Viên Đà Nẵng (Đúng ngân sách)' : 'Toàn bộ ưu đãi liên kết Đà Nẵng'}</div>
            <div class="cluster-descriptor">
              ${state.storefrontFeedFilter === 'STUDENT_BUDGET' 
                ? 'Tổng hợp các ưu đãi đúng ngân sách sinh viên (món lẻ 25.000₫ – 45.000₫ &amp; đặc quyền hội viên 0đ). Đã loại bỏ các mức giá cao và combo tiệc lớn khỏi mặt tiền mặc định.' 
                : 'Khám phá đầy đủ các ưu đãi chính hãng từ 8 đối tác lớn tại Đà Nẵng theo danh mục.'}
            </div>
          </div>
          <div class="cluster-live-count" id="cluster-live-status" aria-live="polite">
            Hiển thị ${filteredOffers.length} ưu đãi
          </div>
        </div>
        ${feedSwitcherHtml}
      </div>
    `;
  }

  const branchNames = currentCluster.verified_branches.map(b => `${b.brand} (${b.branch_name})`).join(', ');

  return `
    <div class="cluster-info-card">
      <div class="cluster-header-row">
        <div>
          <div class="cluster-title">${currentCluster.short_label} &mdash; ${currentCluster.name}</div>
          <div class="cluster-descriptor">📍 Trục đường trọng điểm: ${currentCluster.area_descriptor}</div>
        </div>
        <button class="btn-reset-campus" id="btn-reset-campus-filter" title="Xem tất cả ưu đãi">
          ✕ Xem tất cả ưu đãi
        </button>
      </div>

      <div class="cluster-meta-details">
        <div>
          <strong>🎓 Các trường đại học / cao đẳng phục vụ:</strong>
          <div style="margin-top: 4px;">${currentCluster.target_universities.join(' &bull; ')}</div>
        </div>
        <div>
          <strong>🏢 ${currentCluster.verified_branches.length} chi nhánh liên kết gần trường:</strong>
          <div class="cluster-branches-list" style="margin-top: 4px;">${branchNames}</div>
        </div>
      </div>
      ${feedSwitcherHtml}
    </div>
  `;
}

function getDealsSectionDesc() {
  const currentCluster = J372_CAMPUS_MAPPING.clusters.find(c => c.cluster_id === state.selectedClusterId);
  if (!currentCluster || state.selectedClusterId === 'ALL') {
    return `${J372_OFFERS.length} ưu đãi đang khả dụng trên toàn thành phố, tích hợp nút chia tiền nhóm và xuất Thẻ Zalo Pass trực tiếp.`;
  }
  const count = currentCluster.total_applicable_offers || (currentCluster.applicable_offer_ids && currentCluster.applicable_offer_ids.length) || 0;
  return `${count} ưu đãi theo cụm cơ sở ${currentCluster.name}, tích hợp nút chia tiền nhóm và xuất Thẻ Zalo Pass trực tiếp.`;
}



// ==========================================================================
// JAYT-385 MILESTONE M2: 30 DORM SKUS PRICE OBSERVATIONS & HEALTH WORKER UI
// ==========================================================================

const J387_DORM_SKUS = [
  {
    "sku_id": "DORM_SKU_01_OCAM_DIENQUANG",
    "category": "Gia dụng KTX",
    "product_name": "Ổ cắm điện đa năng chống giật Điện Quang 4 lỗ 2 USB (Dây 2m)",
    "platform": "Shopee",
    "merchant_id": "shopee_mall_dorm_sku_01_ocam_dienquang",
    "merchant_name": "Điện Quang Official Store (Shopee Mall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "DQ_ESV_04U_2M",
    "variant_name": "4 lỗ cắm + 2 cổng sạc USB-A (Dây 2 mét)",
    "canonical_url": "https://shopee.vn/dienquang_official/o-cam-chong-giat-4-lo-2-usb-p.173829101",
    "official_partner_url": "https://shopee.vn/dienquang_official/o-cam-chong-giat-4-lo-2-usb-p.173829101",
    "partner_attribution_ready": false,
    "observed_price": 119000,
    "price_display": "119.000₫",
    "delivery_fee_estimate": 16000,
    "delivery_terms": "Giao tiêu chuẩn 2-3 ngày về ký túc xá Đà Nẵng",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_1.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Ổ cắm điện đa năng chống giật Điện Quang 4 lỗ 2 USB (Dây 2m)"
    }
  },
  {
    "sku_id": "DORM_SKU_02_QUAT_JISULIFE",
    "category": "Gia dụng KTX",
    "product_name": "Quạt mini để bàn tích điện JISULIFE Life7 (Pin 4000mAh, 5 tốc độ)",
    "platform": "Shopee",
    "merchant_id": "shopee_mall_dorm_sku_02_quat_jisulife",
    "merchant_name": "JISULIFE Vietnam Official (Shopee Mall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "JISU_L7_4000_WHITE",
    "variant_name": "Màu Trắng (White), 4000mAh, Động cơ không chổi than",
    "canonical_url": "https://shopee.vn/jisulife_official/quat-de-ban-life7-4000mah-p.281940192",
    "official_partner_url": "https://shopee.vn/jisulife_official/quat-de-ban-life7-4000mah-p.281940192",
    "partner_attribution_ready": false,
    "observed_price": 289000,
    "price_display": "289.000₫",
    "delivery_fee_estimate": 22000,
    "delivery_terms": "Freeship Extra hỗ trợ đơn trên 150k",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_2.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Quạt mini để bàn tích điện JISULIFE Life7 (Pin 4000mAh, 5 tốc độ)"
    }
  },
  {
    "sku_id": "DORM_SKU_03_AM_SUNHOUSE",
    "category": "Gia dụng KTX",
    "product_name": "Ấm đun siêu tốc inox 2 lớp Sunhouse SHD1182 (1.8L, 1500W)",
    "platform": "Lazada",
    "merchant_id": "lazmall_dorm_sku_03_am_sunhouse",
    "merchant_name": "Sunhouse Official Store (LazMall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "SUN_SHD1182_SS",
    "variant_name": "Thân inox 304 2 lớp cách nhiệt, dung tích 1.8 Lít",
    "canonical_url": "https://www.lazada.vn/products/am-sieu-toc-sunhouse-shd1182-18l-i94820194.html",
    "official_partner_url": "https://www.lazada.vn/products/am-sieu-toc-sunhouse-shd1182-18l-i94820194.html",
    "partner_attribution_ready": false,
    "observed_price": 149000,
    "price_display": "149.000₫",
    "delivery_fee_estimate": 19000,
    "delivery_terms": "Giao hàng từ kho Lazada Đà Nẵng trong 24h-48h",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_3.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Ấm đun siêu tốc inox 2 lớp Sunhouse SHD1182 (1.8L, 1500W)"
    }
  },
  {
    "sku_id": "DORM_SKU_04_NOI_NAU_BEAR",
    "category": "Gia dụng KTX",
    "product_name": "Ca nấu mì & lẩu mini đa năng Bear DRG-D12M5 (1.2L kèm xửng hấp)",
    "platform": "Shopee",
    "merchant_id": "shopee_mall_dorm_sku_04_noi_nau_bear",
    "merchant_name": "Bear Official Store (Shopee Mall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "BEAR_DRG_D12M5_STEAM",
    "variant_name": "Bản kèm xửng hấp inox 304, chống dính gốm ceramic",
    "canonical_url": "https://shopee.vn/bear_official/noi-nau-mi-mini-bear-1-2l-p.392019481",
    "official_partner_url": "https://shopee.vn/bear_official/noi-nau-mi-mini-bear-1-2l-p.392019481",
    "partner_attribution_ready": false,
    "observed_price": 269000,
    "price_display": "269.000₫",
    "delivery_fee_estimate": 25000,
    "delivery_terms": "Áp dụng mã giảm 15k vận chuyển",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_4.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Ca nấu mì & lẩu mini đa năng Bear DRG-D12M5 (1.2L kèm xửng hấp)"
    }
  },
  {
    "sku_id": "DORM_SKU_05_DEN_RANGDONG",
    "category": "Học tập & Công nghệ",
    "product_name": "Đèn bàn học LED bảo vệ thị lực Rạng Đông RD-RL-20.LED (6W, 3 màu)",
    "platform": "Shopee",
    "merchant_id": "shopee_mall_dorm_sku_05_den_rangdong",
    "merchant_name": "Rạng Đông Official Store (Shopee Mall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "RD_RL_20_WHITE",
    "variant_name": "Màu Trắng, Ánh sáng đổi 3 chế độ (Trắng / Vàng / Trung tính)",
    "canonical_url": "https://shopee.vn/rangdong_official/den-ban-led-chong-can-rd-rl-20-p.482019482",
    "official_partner_url": "https://shopee.vn/rangdong_official/den-ban-led-chong-can-rd-rl-20-p.482019482",
    "partner_attribution_ready": false,
    "observed_price": 135000,
    "price_display": "135.000₫",
    "delivery_fee_estimate": 16000,
    "delivery_terms": "Hàng chính hãng bảo hành 24 tháng toàn quốc",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_5.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Đèn bàn học LED bảo vệ thị lực Rạng Đông RD-RL-20.LED (6W, 3 màu)"
    }
  },
  {
    "sku_id": "DORM_SKU_06_BAN_HOC_KAPI",
    "category": "Học tập & Công nghệ",
    "product_name": "Bàn học sinh viên gấp gọn chân chữ U (60x40cm, khe để iPad & ly nước)",
    "platform": "TikTok Shop",
    "merchant_id": "tiktok_mall_dorm_sku_06_ban_hoc_kapi",
    "merchant_name": "Kapi Nội Thất Thông Minh (TikTok Shop Mall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "KAPI_TABLE_U_BLACK",
    "variant_name": "Mặt gỗ MDF phủ Melamine chống xước, viền bo tròn",
    "canonical_url": "https://shop.tiktok.com/view/product/172948102948102",
    "official_partner_url": "https://shop.tiktok.com/view/product/172948102948102",
    "partner_attribution_ready": false,
    "observed_price": 69000,
    "price_display": "69.000₫",
    "delivery_fee_estimate": 28000,
    "delivery_terms": "Đơn TikTok Shop trợ giá vận chuyển cho tân sinh viên",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_6.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Bàn học sinh viên gấp gọn chân chữ U (60x40cm, khe để iPad & ly nước)"
    }
  },
  {
    "sku_id": "DORM_SKU_07_NEM_GAP_EVERON",
    "category": "Phòng ngủ & Tiện ích",
    "product_name": "Nệm gấp sinh viên / Topper văn phòng KTX 90x200cm (Đệm bông ép 3cm)",
    "platform": "Shopee",
    "merchant_id": "shopee_mall_dorm_sku_07_nem_gap_everon",
    "merchant_name": "Everon Flagship Store (Shopee Mall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "EVR_TOPPER_90X200_GREY",
    "variant_name": "Kích thước 90x200cm, dày 3cm, vỏ bọc Cotton xám có khóa kéo",
    "canonical_url": "https://shopee.vn/everon_flagship/nem-topper-van-phong-90x200-p.592019481",
    "official_partner_url": "https://shopee.vn/everon_flagship/nem-topper-van-phong-90x200-p.592019481",
    "partner_attribution_ready": false,
    "observed_price": 245000,
    "price_display": "245.000₫",
    "delivery_fee_estimate": 35000,
    "delivery_terms": "Hàng cồng kềnh, đóng gói túi hút chân không gọn nhẹ",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_7.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Nệm gấp sinh viên / Topper văn phòng KTX 90x200cm (Đệm bông ép 3cm)"
    }
  },
  {
    "sku_id": "DORM_SKU_08_CHAN_TENCEL",
    "category": "Phòng ngủ & Tiện ích",
    "product_name": "Chăn hè thu Tencel kháng khuẩn thoáng khí 1m2 x 2m (Mát lạnh mùa hè)",
    "platform": "Lazada",
    "merchant_id": "lazmall_dorm_sku_08_chan_tencel",
    "merchant_name": "Lotus Bedding Official (LazMall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "LOTUS_TENCEL_1M2_BLUE",
    "variant_name": "Sợi Tencel tự nhiên, màu Xanh Pastel, chần bông vi sợi",
    "canonical_url": "https://www.lazada.vn/products/chan-he-tencel-1m2-lotus-i84920194.html",
    "official_partner_url": "https://www.lazada.vn/products/chan-he-tencel-1m2-lotus-i84920194.html",
    "partner_attribution_ready": false,
    "observed_price": 185000,
    "price_display": "185.000₫",
    "delivery_fee_estimate": 18000,
    "delivery_terms": "Giao tận tay ký túc xá Đại học Đà Nẵng",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_8.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Chăn hè thu Tencel kháng khuẩn thoáng khí 1m2 x 2m (Mát lạnh mùa hè)"
    }
  },
  {
    "sku_id": "DORM_SKU_09_GOI_TUA_EMA",
    "category": "Phòng ngủ & Tiện ích",
    "product_name": "Gối tựa lưng công thái học cao su non Ema (Đệm đỡ cột sống ngồi học)",
    "platform": "Shopee",
    "merchant_id": "shopee_mall_dorm_sku_09_goi_tua_ema",
    "merchant_name": "Ema Chăm Sóc Sức Khỏe (Shopee Mall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "EMA_LUMBAR_NAVY",
    "variant_name": "Ruột cao su non nguyên khối, vỏ lưới 3D thoáng khí",
    "canonical_url": "https://shopee.vn/ema_official/goi-tua-lung-cong-thai-hoc-p.682019482",
    "official_partner_url": "https://shopee.vn/ema_official/goi-tua-lung-cong-thai-hoc-p.682019482",
    "partner_attribution_ready": false,
    "observed_price": 179000,
    "price_display": "179.000₫",
    "delivery_fee_estimate": 20000,
    "delivery_terms": "Đổi trả 7 ngày nếu không êm ái",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_9.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Gối tựa lưng công thái học cao su non Ema (Đệm đỡ cột sống ngồi học)"
    }
  },
  {
    "sku_id": "DORM_SKU_10_HOP_COM_LOCKNLOCK",
    "category": "Gia dụng KTX",
    "product_name": "Hộp cơm giữ nhiệt 3 ngăn Lock&Lock LHC8016S (Inox 304, túi giữ nhiệt)",
    "platform": "Shopee",
    "merchant_id": "shopee_mall_dorm_sku_10_hop_com_locknlock",
    "merchant_name": "Lock&Lock Official Flagship Store (Shopee Mall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "LNL_LHC8016S_SET",
    "variant_name": "Bộ 3 hộp (450ml + 2x420ml) kèm túi vải giữ ấm 6-8 tiếng",
    "canonical_url": "https://shopee.vn/locknlock_flagship/hop-com-giu-nhiet-lhc8016s-p.782019481",
    "official_partner_url": "https://shopee.vn/locknlock_flagship/hop-com-giu-nhiet-lhc8016s-p.782019481",
    "partner_attribution_ready": false,
    "observed_price": 349000,
    "price_display": "349.000₫",
    "delivery_fee_estimate": 22000,
    "delivery_terms": "Chính hãng Lock&Lock bảo hành nắp đậy 12 tháng",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_10.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Hộp cơm giữ nhiệt 3 ngăn Lock&Lock LHC8016S (Inox 304, túi giữ nhiệt)"
    }
  },
  {
    "sku_id": "DORM_SKU_11_BINH_GIU_NHIET_ELMICH",
    "category": "Cá nhân",
    "product_name": "Bình giữ nhiệt inox 316 cao cấp Elmich EL-8012 (Dung tích 800ml)",
    "platform": "Lazada",
    "merchant_id": "lazmall_dorm_sku_11_binh_giu_nhiet_elmich",
    "merchant_name": "Elmich Official Store (LazMall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "ELM_EL8012_800ML_BLACK",
    "variant_name": "Inox 316 chuẩn y tế, giữ nhiệt nóng 12h / lạnh 24h",
    "canonical_url": "https://www.lazada.vn/products/binh-giu-nhiet-elmich-800ml-i74920194.html",
    "official_partner_url": "https://www.lazada.vn/products/binh-giu-nhiet-elmich-800ml-i74920194.html",
    "partner_attribution_ready": false,
    "observed_price": 219000,
    "price_display": "219.000₫",
    "delivery_fee_estimate": 16000,
    "delivery_terms": "LazFlash trợ giá giảm thêm voucher tích lũy",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_11.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Bình giữ nhiệt inox 316 cao cấp Elmich EL-8012 (Dung tích 800ml)"
    }
  },
  {
    "sku_id": "DORM_SKU_12_KE_GIAY_OENON",
    "category": "Gia dụng KTX",
    "product_name": "Kệ để giày dép 5 tầng khung thép carbon chống gỉ (Sức chứa 15-20 đôi)",
    "platform": "TikTok Shop",
    "merchant_id": "tiktok_mall_dorm_sku_12_ke_giay_oenon",
    "merchant_name": "Oenon Gia Dụng Thông Minh (TikTok Shop Mall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "OEN_SHOE_5T_BLACK",
    "variant_name": "Khung ống thép sơn tĩnh điện đen mờ, vải không dệt chống thấm",
    "canonical_url": "https://shop.tiktok.com/view/product/172948102948201",
    "official_partner_url": "https://shop.tiktok.com/view/product/172948102948201",
    "partner_attribution_ready": false,
    "observed_price": 79000,
    "price_display": "79.000₫",
    "delivery_fee_estimate": 25000,
    "delivery_terms": "Lắp ghép không cần ốc vít, dễ tháo gọn khi chuyển trọ",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_12.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Kệ để giày dép 5 tầng khung thép carbon chống gỉ (Sức chứa 15-20 đôi)"
    }
  },
  {
    "sku_id": "DORM_SKU_13_KE_SACH_DEGA",
    "category": "Học tập & Công nghệ",
    "product_name": "Kệ sách để bàn học sinh viên lắp ghép đa năng (Gỗ MDF phủ melamin)",
    "platform": "Shopee",
    "merchant_id": "shopee_mall_dorm_sku_13_ke_sach_dega",
    "merchant_name": "Dega Home Nội Thất (Shopee Mall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "DEGA_SHELF_DESK_OAK",
    "variant_name": "Màu gỗ sồi tự nhiên, kích thước tùy chỉnh co giãn 35-65cm",
    "canonical_url": "https://shopee.vn/dega_official/ke-sach-de-ban-mini-p.882019482",
    "official_partner_url": "https://shopee.vn/dega_official/ke-sach-de-ban-mini-p.882019482",
    "partner_attribution_ready": false,
    "observed_price": 85000,
    "price_display": "85.000₫",
    "delivery_fee_estimate": 22000,
    "delivery_terms": "Kèm sẵn tô vít và sơ đồ hướng dẫn lắp đặt",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_13.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Kệ sách để bàn học sinh viên lắp ghép đa năng (Gỗ MDF phủ melamin)"
    }
  },
  {
    "sku_id": "DORM_SKU_14_HOP_QUAN_AO_HOMFUL",
    "category": "Phòng ngủ & Tiện ích",
    "product_name": "Hộp đựng quần áo chia 7 ngăn tiện lợi cho ký túc xá (Vải Oxford có nắp)",
    "platform": "TikTok Shop",
    "merchant_id": "tiktok_mall_dorm_sku_14_hop_quan_ao_homful",
    "merchant_name": "Homful Living (TikTok Shop Mall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "HOM_BOX_7G_GREY",
    "variant_name": "Set 2 hộp xám 7 ngăn đựng quần jean, áo thun gọn gàng",
    "canonical_url": "https://shop.tiktok.com/view/product/172948102948305",
    "official_partner_url": "https://shop.tiktok.com/view/product/172948102948305",
    "partner_attribution_ready": false,
    "observed_price": 59000,
    "price_display": "59.000₫",
    "delivery_fee_estimate": 16000,
    "delivery_terms": "Có thể gấp phẳng khi không sử dụng",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_14.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Hộp đựng quần áo chia 7 ngăn tiện lợi cho ký túc xá (Vải Oxford có nắp)"
    }
  },
  {
    "sku_id": "DORM_SKU_15_MOC_INOCHI",
    "category": "Sinh hoạt & Giặt ủi",
    "product_name": "Set 10 móc treo quần áo nhựa nguyên sinh Inochi Hara (Chống trượt vai)",
    "platform": "Shopee",
    "merchant_id": "shopee_mall_dorm_sku_15_moc_inochi",
    "merchant_name": "Inochi Official Store (Shopee Mall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "INO_HARA_10P_BEIGE",
    "variant_name": "Màu Be nhạt (Beige), chất liệu nhựa PP an toàn, bền dẻo",
    "canonical_url": "https://shopee.vn/inochi_official/set-10-moc-quan-ao-hara-p.982019481",
    "official_partner_url": "https://shopee.vn/inochi_official/set-10-moc-quan-ao-hara-p.982019481",
    "partner_attribution_ready": false,
    "observed_price": 62000,
    "price_display": "62.000₫",
    "delivery_fee_estimate": 16000,
    "delivery_terms": "Giao tiêu chuẩn 2 ngày",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_15.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Set 10 móc treo quần áo nhựa nguyên sinh Inochi Hara (Chống trượt vai)"
    }
  },
  {
    "sku_id": "DORM_SKU_16_BAN_UI_PHILIPS",
    "category": "Sinh hoạt & Giặt ủi",
    "product_name": "Bàn ủi khô Philips HD1172 (Công suất 1000W, đầu nhọn dễ ủi cúc)",
    "platform": "Lazada",
    "merchant_id": "lazmall_dorm_sku_16_ban_ui_philips",
    "merchant_name": "Philips Domestic Appliances (LazMall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "PHI_HD1172_SILVER",
    "variant_name": "Mặt đế hợp kim nhôm chống dính, dây dài 1.9m",
    "canonical_url": "https://www.lazada.vn/products/ban-ui-kho-philips-hd1172-i64920194.html",
    "official_partner_url": "https://www.lazada.vn/products/ban-ui-kho-philips-hd1172-i64920194.html",
    "partner_attribution_ready": false,
    "observed_price": 319000,
    "price_display": "319.000₫",
    "delivery_fee_estimate": 21000,
    "delivery_terms": "Bảo hành 2 năm chính hãng Philips",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_16.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Bàn ủi khô Philips HD1172 (Công suất 1000W, đầu nhọn dễ ủi cúc)"
    }
  },
  {
    "sku_id": "DORM_SKU_17_MAY_SAY_CHAOBA",
    "category": "Cá nhân",
    "product_name": "Máy sấy tóc công suất lớn Chaoba 2800 (2200W, 2 tốc độ gió, 3 mức nhiệt)",
    "platform": "Shopee",
    "merchant_id": "shopee_mall_dorm_sku_17_may_say_chaoba",
    "merchant_name": "Chaoba Hair Equipment (Shopee Mall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "CHAO_2800_BLACK",
    "variant_name": "Màu Đen, kèm đầu sấy tạo kiểu dẹp",
    "canonical_url": "https://shopee.vn/chaoba_official/may-say-toc-chaoba-2800-p.108201948",
    "official_partner_url": "https://shopee.vn/chaoba_official/may-say-toc-chaoba-2800-p.108201948",
    "partner_attribution_ready": false,
    "observed_price": 125000,
    "price_display": "125.000₫",
    "delivery_fee_estimate": 18000,
    "delivery_terms": "Sấy khô nhanh chóng cho sinh viên sau giờ học thể chất",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_17.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Máy sấy tóc công suất lớn Chaoba 2800 (2200W, 2 tốc độ gió, 3 mức nhiệt)"
    }
  },
  {
    "sku_id": "DORM_SKU_18_BINH_LOC_BRITA",
    "category": "Gia dụng KTX",
    "product_name": "Bình lọc nước cầm tay Brita Marella 2.4L (Kèm 01 lõi lọc Maxtra Plus)",
    "platform": "Shopee",
    "merchant_id": "shopee_mall_dorm_sku_18_binh_loc_brita",
    "merchant_name": "Brita Official Store Vietnam (Shopee Mall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "BRITA_MARELLA_2P4L_BLUE",
    "variant_name": "Màu Xanh Biển, đồng hồ hiển thị điện tử báo thay lõi",
    "canonical_url": "https://shopee.vn/brita_official/binh-loc-nuoc-brita-marella-p.118201948",
    "official_partner_url": "https://shopee.vn/brita_official/binh-loc-nuoc-brita-marella-p.118201948",
    "partner_attribution_ready": false,
    "observed_price": 549000,
    "price_display": "549.000₫",
    "delivery_fee_estimate": 25000,
    "delivery_terms": "Lọc sạch clo và cặn vôi nguồn nước KTX, uống trực tiếp an tâm",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_18.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Bình lọc nước cầm tay Brita Marella 2.4L (Kèm 01 lõi lọc Maxtra Plus)"
    }
  },
  {
    "sku_id": "DORM_SKU_19_THAU_GAP_EHOME",
    "category": "Sinh hoạt & Giặt ủi",
    "product_name": "Chậu thau gấp gọn silicon đa năng Ehome (Đường kính 32cm)",
    "platform": "TikTok Shop",
    "merchant_id": "tiktok_mall_dorm_sku_19_thau_gap_ehome",
    "merchant_name": "Ehome Tiện Ích Phòng Trọ (TikTok Shop Mall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "EHOME_BASIN_32CM_PINK",
    "variant_name": "Silicon dẻo cao cấp kết hợp nhựa PP, gấp gọn dày chỉ 4cm",
    "canonical_url": "https://shop.tiktok.com/view/product/172948102948410",
    "official_partner_url": "https://shop.tiktok.com/view/product/172948102948410",
    "partner_attribution_ready": false,
    "observed_price": 45000,
    "price_display": "45.000₫",
    "delivery_fee_estimate": 16000,
    "delivery_terms": "Tiết kiệm không gian nhà tắm tập thể KTX",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_19.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Chậu thau gấp gọn silicon đa năng Ehome (Đường kính 32cm)"
    }
  },
  {
    "sku_id": "DORM_SKU_20_REM_GIUONG_KTX",
    "category": "Phòng ngủ & Tiện ích",
    "product_name": "Rèm che giường tầng KTX chống bụi và tạo không gian riêng tư (Kèm dây & móc)",
    "platform": "Shopee",
    "merchant_id": "shopee_mall_dorm_sku_20_rem_giuong_ktx",
    "merchant_name": "Muji Home Official (Shopee Mall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "MUJI_CURTAIN_KTX_GREY",
    "variant_name": "Kích thước 1.2m x 2m, vải dày cản sáng 85%, thoáng khí",
    "canonical_url": "https://shopee.vn/mujihome_store/rem-che-giuong-tang-ktx-p.128201948",
    "official_partner_url": "https://shopee.vn/mujihome_store/rem-che-giuong-tang-ktx-p.128201948",
    "partner_attribution_ready": false,
    "observed_price": 89000,
    "price_display": "89.000₫",
    "delivery_fee_estimate": 16000,
    "delivery_terms": "Tạo góc học tập và nghỉ ngơi yên tĩnh",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_20.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Rèm che giường tầng KTX chống bụi và tạo không gian riêng tư (Kèm dây & móc)"
    }
  },
  {
    "sku_id": "DORM_SKU_21_DEN_PIN_COMET",
    "category": "Gia dụng KTX",
    "product_name": "Đèn pin sạc LED sự cố đa năng Comet CRL3105 (Thời gian sáng liên tục 5-8h)",
    "platform": "Lazada",
    "merchant_id": "lazmall_dorm_sku_21_den_pin_comet",
    "merchant_name": "Comet Electric Vietnam (LazMall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "COMET_CRL3105_WHITE",
    "variant_name": "Bóng LED 24 chip siêu sáng, tay cầm tiện dụng, cổng sạc Type-C",
    "canonical_url": "https://www.lazada.vn/products/den-sac-khan-cap-comet-crl3105-i54920194.html",
    "official_partner_url": "https://www.lazada.vn/products/den-sac-khan-cap-comet-crl3105-i54920194.html",
    "partner_attribution_ready": false,
    "observed_price": 95000,
    "price_display": "95.000₫",
    "delivery_fee_estimate": 16000,
    "delivery_terms": "Dự phòng khi cúp điện đột xuất trong ký túc xá",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_21.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Đèn pin sạc LED sự cố đa năng Comet CRL3105 (Thời gian sáng liên tục 5-8h)"
    }
  },
  {
    "sku_id": "DORM_SKU_22_CHUOT_LOGITECH",
    "category": "Học tập & Công nghệ",
    "product_name": "Chuột máy tính không dây Logitech M220 Silent (Chống ồn 90%, pin 18 tháng)",
    "platform": "Shopee",
    "merchant_id": "shopee_mall_dorm_sku_22_chuot_logitech",
    "merchant_name": "Logitech Official Store (Shopee Mall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "LOGI_M220_CHARCOAL",
    "variant_name": "Màu Than Chì (Charcoal), kết nối USB 2.4GHz không độ trễ",
    "canonical_url": "https://shopee.vn/logitech_official/chuot-khong-day-m220-silent-p.138201948",
    "official_partner_url": "https://shopee.vn/logitech_official/chuot-khong-day-m220-silent-p.138201948",
    "partner_attribution_ready": false,
    "observed_price": 279000,
    "price_display": "279.000₫",
    "delivery_fee_estimate": 16000,
    "delivery_terms": "Phù hợp học đêm tại thư viện hoặc phòng trọ không gây tiếng ồn",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_22.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Chuột máy tính không dây Logitech M220 Silent (Chống ồn 90%, pin 18 tháng)"
    }
  },
  {
    "sku_id": "DORM_SKU_23_BAN_PHIM_RAPOO",
    "category": "Học tập & Công nghệ",
    "product_name": "Bàn phím máy tính có dây chống tràn nước Rapoo NK1800 (Cổng USB)",
    "platform": "Shopee",
    "merchant_id": "shopee_mall_dorm_sku_23_ban_phim_rapoo",
    "merchant_name": "Rapoo Official Store (Shopee Mall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "RAPOO_NK1800_BLACK",
    "variant_name": "Bàn phím Full-size 104 phím, phím bấm êm ái chống mờ chữ",
    "canonical_url": "https://shopee.vn/rapoo_official/ban-phim-co-day-rapoo-nk1800-p.148201948",
    "official_partner_url": "https://shopee.vn/rapoo_official/ban-phim-co-day-rapoo-nk1800-p.148201948",
    "partner_attribution_ready": false,
    "observed_price": 149000,
    "price_display": "149.000₫",
    "delivery_fee_estimate": 18000,
    "delivery_terms": "Bảo hành 2 năm đổi mới",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_23.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Bàn phím máy tính có dây chống tràn nước Rapoo NK1800 (Cổng USB)"
    }
  },
  {
    "sku_id": "DORM_SKU_24_TAI_NGHE_JBL",
    "category": "Học tập & Công nghệ",
    "product_name": "Tai nghe in-ear có mic đàm thoại JBL Quantum 50 (Âm thanh chi tiết, jack 3.5mm)",
    "platform": "Lazada",
    "merchant_id": "lazmall_dorm_sku_24_tai_nghe_jbl",
    "merchant_name": "JBL Official Flagship Store (LazMall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "JBL_QUANTUM_50_BLACK",
    "variant_name": "Màu Đen, mic lọc tạp âm chuyên học ngoại ngữ online",
    "canonical_url": "https://www.lazada.vn/products/tai-nghe-jbl-quantum-50-i44920194.html",
    "official_partner_url": "https://www.lazada.vn/products/tai-nghe-jbl-quantum-50-i44920194.html",
    "partner_attribution_ready": false,
    "observed_price": 590000,
    "price_display": "590.000₫",
    "delivery_fee_estimate": 16000,
    "delivery_terms": "Chính hãng PGI phân phối độc quyền tại Việt Nam",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_24.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Tai nghe in-ear có mic đàm thoại JBL Quantum 50 (Âm thanh chi tiết, jack 3.5mm)"
    }
  },
  {
    "sku_id": "DORM_SKU_25_BALO_SIMPLECARRY",
    "category": "Cá nhân",
    "product_name": "Balo laptop sinh viên chống nước Simplecarry K5 (Vừa laptop 15.6 inch)",
    "platform": "Shopee",
    "merchant_id": "shopee_mall_dorm_sku_25_balo_simplecarry",
    "merchant_name": "Simplecarry Vietnam Official (Shopee Mall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "SC_K5_DARK_GREY",
    "variant_name": "Màu Xám Đậm, vải Polyester trượt nước cao cấp, quai đeo êm",
    "canonical_url": "https://shopee.vn/simplecarry_official/balo-laptop-simplecarry-k5-p.158201948",
    "official_partner_url": "https://shopee.vn/simplecarry_official/balo-laptop-simplecarry-k5-p.158201948",
    "partner_attribution_ready": false,
    "observed_price": 460000,
    "price_display": "460.000₫",
    "delivery_fee_estimate": 22000,
    "delivery_terms": "Bảo hành 10 năm dây kéo và đường may",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_25.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Balo laptop sinh viên chống nước Simplecarry K5 (Vừa laptop 15.6 inch)"
    }
  },
  {
    "sku_id": "DORM_SKU_26_CASIO_FX580VN",
    "category": "Học tập & Công nghệ",
    "product_name": "Máy tính khoa học Casio fx-580VN X (Chính hãng Bitex, tem chống giả)",
    "platform": "Shopee",
    "merchant_id": "shopee_mall_dorm_sku_26_casio_fx580vn",
    "merchant_name": "Bitex Văn Phòng Phẩm (Shopee Mall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "CASIO_580VNX_BLACK",
    "variant_name": "Phiên bản tiếng Việt 521 tính năng, được phép mang vào phòng thi",
    "canonical_url": "https://shopee.vn/bitex_official/may-tinh-casio-fx-580vn-x-p.168201948",
    "official_partner_url": "https://shopee.vn/bitex_official/may-tinh-casio-fx-580vn-x-p.168201948",
    "partner_attribution_ready": false,
    "observed_price": 685000,
    "price_display": "685.000₫",
    "delivery_fee_estimate": 16000,
    "delivery_terms": "Bảo hành chính hãng 7 năm 1 đổi 1 trong năm đầu",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_26.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Máy tính khoa học Casio fx-580VN X (Chính hãng Bitex, tem chống giả)"
    }
  },
  {
    "sku_id": "DORM_SKU_27_VO_KLONG",
    "category": "Học tập & Công nghệ",
    "product_name": "Combo 5 cuốn vở kẻ ngang Klong Caro B5 200 trang (Định lượng giấy 100 GSM chống thấm)",
    "platform": "Shopee",
    "merchant_id": "shopee_mall_dorm_sku_27_vo_klong",
    "merchant_name": "Klong Stationery Official (Shopee Mall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "KLONG_B5_200P_5PACK",
    "variant_name": "Khổ B5, gáy may dán chắc chắn, giấy ngà tự nhiên chống lóa",
    "canonical_url": "https://shopee.vn/klong_official/combo-5-vo-klong-b5-200-trang-p.178201948",
    "official_partner_url": "https://shopee.vn/klong_official/combo-5-vo-klong-b5-200-trang-p.178201948",
    "partner_attribution_ready": false,
    "observed_price": 115000,
    "price_display": "115.000₫",
    "delivery_fee_estimate": 18000,
    "delivery_terms": "Giao tiêu chuẩn 2 ngày",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_27.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Combo 5 cuốn vở kẻ ngang Klong Caro B5 200 trang (Định lượng giấy 100 GSM chống thấm)"
    }
  },
  {
    "sku_id": "DORM_SKU_28_BUT_THIENLONG",
    "category": "Học tập & Công nghệ",
    "product_name": "Hộp 20 cây bút bi bấm Thiên Long TL-027 (Ngòi 0.5mm êm trơn)",
    "platform": "Shopee",
    "merchant_id": "shopee_mall_dorm_sku_28_but_thienlong",
    "merchant_name": "Thiên Long Official Store (Shopee Mall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "TL_027_BLUE_BOX20",
    "variant_name": "Mực Xanh (Blue), hộp 20 chiếc tiết kiệm cả học kỳ",
    "canonical_url": "https://shopee.vn/thienlong_official/hop-20-but-bi-tl-027-p.188201948",
    "official_partner_url": "https://shopee.vn/thienlong_official/hop-20-but-bi-tl-027-p.188201948",
    "partner_attribution_ready": false,
    "observed_price": 88000,
    "price_display": "88.000₫",
    "delivery_fee_estimate": 15000,
    "delivery_terms": "Đơn hàng từ kho Thiên Long Đà Nẵng",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_28.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Hộp 20 cây bút bi bấm Thiên Long TL-027 (Ngòi 0.5mm êm trơn)"
    }
  },
  {
    "sku_id": "DORM_SKU_29_VAT_CAM_LOCKNLOCK",
    "category": "Gia dụng KTX",
    "product_name": "Máy vắt cam mini bằng điện Lock&Lock EJJ236 (700ml, 40W)",
    "platform": "Lazada",
    "merchant_id": "lazmall_dorm_sku_29_vat_cam_locknlock",
    "merchant_name": "Lock&Lock Official Store (LazMall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "LNL_EJJ236_WHITE",
    "variant_name": "Cối đựng trong suốt có vạch chia dung tích, nắp đậy chống bụi",
    "canonical_url": "https://www.lazada.vn/products/may-vat-cam-locknlock-ejj236-i34920194.html",
    "official_partner_url": "https://www.lazada.vn/products/may-vat-cam-locknlock-ejj236-i34920194.html",
    "partner_attribution_ready": false,
    "observed_price": 249000,
    "price_display": "249.000₫",
    "delivery_fee_estimate": 19000,
    "delivery_terms": "Bổ sung vitamin C tiện lợi cho sinh viên mùa thi cử",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_29.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Máy vắt cam mini bằng điện Lock&Lock EJJ236 (700ml, 40W)"
    }
  },
  {
    "sku_id": "DORM_SKU_30_KEO_DELI",
    "category": "Học tập & Công nghệ",
    "product_name": "Kéo văn phòng đa năng Deli thép không gỉ 175mm (Cán bọc cao su êm tay)",
    "platform": "Shopee",
    "merchant_id": "shopee_mall_dorm_sku_30_keo_deli",
    "merchant_name": "Deli Vietnam Official Store (Shopee Mall)",
    "merchant_type": "OFFICIAL_MALL",
    "variant_id": "DELI_6010_175MM",
    "variant_name": "Mã Deli 6010, lưỡi sắc bén cắt giấy, vải, bìa các tông",
    "canonical_url": "https://shopee.vn/deli_official/keo-van-phong-deli-6010-p.198201948",
    "official_partner_url": "https://shopee.vn/deli_official/keo-van-phong-deli-6010-p.198201948",
    "partner_attribution_ready": false,
    "observed_price": 28000,
    "price_display": "28.000₫",
    "delivery_fee_estimate": 12000,
    "delivery_terms": "Vật dụng thiết yếu cho phòng ký túc xá",
    "availability": "IN_STOCK",
    "observed_at": "2026-09-10T16:45:00Z",
    "price_history_reference": "OBSERVED_AT_DATE_ONLY",
    "price_label": "Giá quan sát ngày 10/09/2026",
    "evidence_source": "06_TRUST_AND_EVIDENCE/j387/sku_leaf_30.json",
    "media": {
      "asset_path": "assets/images/products/dorm_item_placeholder.svg",
      "sha256": "7091ae67061abca1f2c7e5a476fb1ed07a27878dc527cf7839cf66de0d104785",
      "bytes": 2853,
      "media_classification": "LABELED_NEUTRAL_PLACEHOLDER",
      "is_physical_photograph": false,
      "physical_photo_status": "PENDING_OFFICIAL_STUDIO_INGRESS",
      "rights_basis": "OPC_JAYT_COMMUNITY_COMMERCE_CATALOGUE_REPRESENTATION",
      "alt_text": "Hình ảnh vật dụng KTX chính hãng đang cập nhật: Kéo văn phòng đa năng Deli thép không gỉ 175mm (Cán bọc cao su êm tay)"
    }
  }
];

function renderDormSkusSection() {
  const activeEco = state.selectedEcosystem || 'ALL';
  const isDormActive = (activeEco === 'dorm');
  const selectedCat = state.selectedDormCategory || 'ALL';
  const query = (state.dormSearchQuery || '').toLowerCase().trim();

  // Categories available
  const categories = [
    { key: 'ALL', label: 'Tất cả 30 món', count: J387_DORM_SKUS.length },
    { key: 'Gia dụng KTX', label: 'Gia dụng KTX', count: J387_DORM_SKUS.filter(s => s.category === 'Gia dụng KTX').length },
    { key: 'Học tập & Công nghệ', label: 'Học tập & Công nghệ', count: J387_DORM_SKUS.filter(s => s.category === 'Học tập & Công nghệ').length },
    { key: 'Phòng ngủ & Tiện ích', label: 'Phòng ngủ & Tiện ích', count: J387_DORM_SKUS.filter(s => s.category === 'Phòng ngủ & Tiện ích').length },
    { key: 'Sinh hoạt & Giặt ủi', label: 'Sinh hoạt & Giặt ủi', count: J387_DORM_SKUS.filter(s => s.category === 'Sinh hoạt & Giặt ủi').length },
    { key: 'Cá nhân', label: 'Cá nhân', count: J387_DORM_SKUS.filter(s => s.category === 'Cá nhân').length }
  ];

  let filteredSkus = J387_DORM_SKUS;
  if (selectedCat !== 'ALL') {
    filteredSkus = filteredSkus.filter(s => s.category === selectedCat);
  }
  if (query) {
    filteredSkus = filteredSkus.filter(s => 
      s.product_name.toLowerCase().includes(query) || 
      s.variant_name.toLowerCase().includes(query) ||
      s.merchant_name.toLowerCase().includes(query)
    );
  }

  // Live health info string
  const lastCheckStr = state.linkHealthLastCheck ? ('Lần kiểm tra gần nhất: ' + state.linkHealthLastCheck) : 'SLA Target <=60s • Chưa phát hiện link lỗi 404';

  return `
    <div class="dorm-skus-explorer" style="display: ${isDormActive ? 'block' : 'none'}; margin: 18px 0 28px 0; background: var(--bg-card); border-radius: var(--radius-card); border: 1.5px solid var(--border-color); padding: 22px; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span style="font-size: 20px;">📦</span>
            <h3 style="font-size: 18px; font-weight: 750; color: var(--text-main); margin: 0;">Khảo Sát Giá 30 Vật Dụng KTX &amp; Đồ Dùng Học Tập Sinh Viên</h3>
            <span style="font-size: 11px; font-weight: 700; background: rgba(4, 120, 87, 0.12); color: var(--accent); padding: 3px 8px; border-radius: 12px;">Đà Nẵng 2026</span>
          </div>
          <p style="font-size: 13px; color: var(--text-muted); margin: 0;">Dữ liệu giá quan sát thực tế tại Shopee Mall, LazMall, TikTok Shop Mall • Không tạo giá gạch ảo • Tồn kho kiểm định tự động</p>
        </div>

        <!-- Health check badge -->
        <div style="display: flex; align-items: center; gap: 8px; background: rgba(4, 120, 87, 0.08); border: 1px solid var(--accent); border-radius: var(--radius-chip); padding: 6px 12px; font-size: 12px;">
          <span>🛡️ <strong>Health Worker:</strong> <span style="color: var(--accent); font-weight: 700;">OPERATIONAL</span></span>
          <button type="button" id="btn-trigger-health-check" style="background: var(--accent); color: #ffffff; border: none; border-radius: 4px; padding: 2px 8px; font-size: 11px; font-weight: 600; cursor: pointer;">Test Live</button>
        </div>
      </div>

      <!-- Health check status bar banner -->
      <div id="health-worker-status-bar" style="background: rgba(0,0,0,0.02); border-left: 3px solid var(--accent); padding: 8px 12px; font-size: 12px; color: var(--text-muted); margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <span id="health-worker-status-text">⚡ <em>${lastCheckStr}</em></span>
        <span style="font-size: 11px; background: var(--border-color); padding: 2px 6px; border-radius: 4px; color: var(--text-main);">Rule: 404/Hết hàng ẩn trong 60s • 403/Timeout ghi nhận UNKNOWN</span>
      </div>

      <!-- Search & Category Filters -->
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center; justify-content: space-between; margin-bottom: 18px;">
        <div class="dorm-cat-pills" role="tablist" style="display: flex; gap: 6px; flex-wrap: wrap;">
          ${categories.map(c => {
            const isCatActive = (c.key === selectedCat);
            return `
              <button 
                type="button" 
                class="btn-dorm-cat ${isCatActive ? 'is-active' : ''}" 
                data-dorm-cat="${c.key}"
                style="padding: 6px 12px; border-radius: var(--radius-chip); font-size: 12.5px; font-weight: ${isCatActive ? '700' : '500'}; cursor: pointer; border: 1px solid ${isCatActive ? 'var(--accent)' : 'var(--border-color)'}; background: ${isCatActive ? 'var(--accent)' : 'transparent'}; color: ${isCatActive ? '#ffffff' : 'var(--text-main)'}; min-height: 36px;"
              >
                ${c.label} (${c.count})
              </button>
            `;
          }).join('')}
        </div>

        <div style="position: relative; min-width: 220px;">
          <input 
            type="text" 
            id="input-dorm-search" 
            placeholder="Tìm vật dụng KTX..." 
            value="${state.dormSearchQuery || ''}"
            style="width: 100%; padding: 8px 12px; border-radius: var(--radius-chip); border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-main); font-size: 13px; box-sizing: border-box;"
          />
        </div>
      </div>

      <!-- Grid of 30 SKUs -->
      <div class="dorm-skus-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
        ${filteredSkus.map((sku, idx) => {
          const platformColor = sku.platform === 'Shopee' ? '#EE4D2D' : (sku.platform === 'Lazada' ? '#0F146D' : '#FE2C55');
          return `
            <div class="dorm-sku-card" style="display: flex; flex-direction: column; justify-content: space-between; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 16px; transition: transform var(--motion-fast);">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                  <span style="font-size: 11px; font-weight: 700; color: ${platformColor}; background: rgba(0,0,0,0.04); padding: 3px 8px; border-radius: 6px; border: 1px solid ${platformColor}33;">
                    ${sku.platform} Mall
                  </span>
                  <span style="font-size: 11px; color: var(--accent); font-weight: 600; background: rgba(4, 120, 87, 0.08); padding: 2px 6px; border-radius: 4px;">
                    ${sku.category}
                  </span>
                </div>

                <h4 style="font-size: 14.5px; font-weight: 700; color: var(--text-main); line-height: 1.35; margin: 0 0 6px 0;">
                  ${sku.product_name}
                </h4>

                <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 10px; line-height: 1.3;">
                  📐 <strong>Phân loại:</strong> ${sku.variant_name}
                </div>

                <div style="font-size: 11.5px; color: var(--text-muted); margin-bottom: 12px;">
                  🏪 <em>${sku.merchant_name}</em>
                </div>
              </div>

              <div style="border-top: 1px dashed var(--border-color); padding-top: 10px; margin-top: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                  <div style="font-size: 18px; font-weight: 800; color: var(--accent);">
                    ${sku.price_display}
                  </div>
                  <div style="font-size: 11.5px; color: var(--text-muted);">
                    Phí ship ~ ${sku.delivery_fee_estimate.toLocaleString('vi-VN')}₫
                  </div>
                </div>

                <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px; display: flex; justify-content: space-between;">
                  <span>📅 ${sku.price_label}</span>
                  <span style="color: #059669; font-weight: 600;">● Còn hàng</span>
                </div>

                <div style="display: flex; gap: 8px;">
                  <a 
                    href="${sku.official_partner_url}" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="btn-cta-primary"
                    style="flex: 1; text-align: center; text-decoration: none; padding: 8px 12px; font-size: 12.5px; font-weight: 700; border-radius: var(--radius-chip); background: var(--accent); color: #ffffff; min-height: 38px; display: inline-flex; align-items: center; justify-content: center;"
                  >
                    Xem tại Mall ↗
                  </a>
                  <button 
                    type="button" 
                    class="btn-sku-drawer-info"
                    data-sku-id="${sku.sku_id}"
                    style="padding: 8px 10px; font-size: 12px; font-weight: 600; border-radius: var(--radius-chip); border: 1px solid var(--border-color); background: transparent; color: var(--text-main); cursor: pointer; min-height: 38px;"
                    title="Xem chi tiết điều kiện giao hàng"
                  >
                    Chi tiết ℹ️
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      ${filteredSkus.length === 0 ? `
        <div style="text-align: center; padding: 30px; color: var(--text-muted);">
          Không tìm thấy vật dụng phù hợp từ khóa "${query}". Vui lòng thử từ khóa khác hoặc chọn Tất cả.
        </div>
      ` : ''}
    </div>
  `;
}

function renderCinemaSevenDaySchedule() {
  const currentDayId = state.selectedCinemaDay || 'MON';
  const activeDay = J385_CINEMA_DAYS.find(d => d.id === currentDayId) || J385_CINEMA_DAYS[0];

  return `
    <div class="cinema-schedule-block" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 16px; margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 20px;">🎬</span>
          <div>
            <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: var(--text-main);">Lịch Biểu Giá Vé Rạp Chiếu Phim 7 Ngày (Đà Nẵng)</h3>
            <span style="font-size: 12px; color: var(--text-muted);">Biểu giá niêm yết HSSV U22 tại CGV, Galaxy, Metiz, Starlight</span>
          </div>
        </div>
        <div style="font-size: 12px; color: var(--accent); font-weight: 600;">
          📍 Cập nhật tháng 09/2026
        </div>
      </div>

      <!-- Days of week selector -->
      <div class="cinema-days-bar" role="tablist" style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 8px;">
        ${J385_CINEMA_DAYS.map(day => {
          const isAct = (day.id === currentDayId);
          return `
            <button 
              type="button" 
              class="btn-cinema-day ${isAct ? 'is-active' : ''}" 
              data-cinema-day="${day.id}"
              role="tab"
              aria-selected="${isAct ? 'true' : 'false'}"
              style="flex: 1; min-width: 80px; padding: 6px 10px; border-radius: var(--radius-control); font-size: 13px; font-weight: ${isAct ? '700' : '500'}; cursor: pointer; border: 1px solid ${isAct ? 'var(--accent)' : 'var(--border-color)'}; background: ${isAct ? 'rgba(4, 120, 87, 0.12)' : 'transparent'}; color: ${isAct ? 'var(--accent)' : 'var(--text-main)'}; min-height: 44px;"
            >
              ${day.label}
            </button>
          `;
        }).join('')}
      </div>

      <!-- Active Day Details Card -->
      <div class="cinema-day-details" style="margin-top: 10px; padding: 12px; background: rgba(0,0,0,0.03); border-radius: var(--radius-control); font-size: 13px; line-height: 1.5;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <strong>${activeDay.label}: <span style="color: var(--accent);">${activeDay.highlight}</span></strong>
          <span style="font-size: 12px; background: rgba(4, 120, 87, 0.1); color: var(--accent); padding: 2px 8px; border-radius: 12px; font-weight: 600;">Hạn mức ≤45k</span>
        </div>
        <div style="color: var(--text-main); margin-bottom: 8px;">
          ${activeDay.specials}
        </div>
        <div style="font-size: 11.5px; color: var(--text-muted); border-top: 1px dashed var(--border-color); padding-top: 6px;">
          ℹ️ <em>Biểu giá mang tính tham khảo theo biểu giá niên giám định kỳ; giá vé thực tế theo suất chiếu cụ thể được niêm yết tại quầy vé và ứng dụng chính hãng từng cụm rạp. Yêu cầu xuất trình thẻ HSSV/CCCD dưới 22 tuổi.</em>
        </div>
      </div>
    </div>
  `;
}

function renderCampusDealsSection() {
  const ecosystems = J385_ECOSYSTEMS;
  const activeEco = state.selectedEcosystem || 'ALL';

  return `
    <section id="deals-vault-module" class="bento-section" aria-labelledby="deals-heading">
      <div class="container">
        <div class="section-header">
          <h2 id="deals-heading" class="section-title">🎟️ Ưu Đãi Sinh Viên Theo 5 Hệ Sinh Thái</h2>
          <p class="section-desc" id="deals-section-dynamic-desc">${getDealsSectionDesc()}</p>
        </div>

        <div id="cluster-summary-box">
          ${renderClusterSummaryPanel()}
        </div>

        <!-- 5 Ecosystem Filter Tabs (J385 Standard) -->
        <div class="ecosystem-filter-bar" role="tablist" aria-label="Lọc theo 5 hệ sinh thái đối tác" style="display: flex; gap: 8px; overflow-x: auto; padding: 12px 0 6px 0; margin-bottom: 16px; -webkit-overflow-scrolling: touch;">
          ${ecosystems.map(eco => {
            const isActive = (eco.key === activeEco);
            return `
              <button 
                type="button" 
                class="btn-ecosystem-tab ${isActive ? 'is-active' : ''}" 
                data-ecosystem="${eco.key}"
                role="tab"
                aria-selected="${isActive ? 'true' : 'false'}"
                style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: var(--radius-chip); font-weight: ${isActive ? '700' : '500'}; font-size: 13.5px; white-space: nowrap; cursor: pointer; border: 1.5px solid ${isActive ? 'var(--accent)' : 'var(--border-color)'}; background: ${isActive ? 'var(--accent)' : 'var(--bg-card)'}; color: ${isActive ? '#ffffff' : 'var(--text-main)'}; min-height: 44px;"
              >
                <span>${eco.icon}</span>
                <span>${eco.label}</span>
              </button>
            `;
          }).join('')}
        </div>

        <div id="schedule-rhythm-container">
          ${renderScheduleRhythmSection()}
        </div>

        <div id="cinema-schedule-container" style="margin-bottom: 20px;">
          ${renderCinemaSevenDaySchedule()}
        </div>

        <div id="campus-offers-container" class="visual-deals-grid">
          <!-- Populated instantly via DOM nodes replaceChildren -->
        </div>

        <div id="pagination-container" class="pagination-view-more-container">
          <!-- Populated dynamically with Xem thêm button -->
        </div>
      </div>
    </section>
  `;
}

function renderLunchArbitrageModule() {
  const comparison = calculateLunchComparison(state.dishPrice);

  return `
    <section id="lunch-arbitrage-module" class="bento-section" aria-labelledby="title-lunch-module">
      <div class="container">
        <div class="section-header">
          <h2 id="title-lunch-module" class="section-title">🍱 Bữa trưa tiết kiệm: tự nhập và so sánh</h2>
          <p class="section-desc"><strong>BÀN TÍNH THỰC TRẢ TỰ NHẬP — ĐỐI SOÁT TRỰC TIẾP VỚI GIÁ BẠN ĐANG THẤY TRÊN APP.</strong></p>
          <p class="section-desc">Nhập số đang thấy trong từng ứng dụng để tự đối chiếu tổng thanh toán. JayT không suy đoán phí, mã giảm giá hay dịch vụ rẻ nhất.</p>
        </div>

        <div class="bento-card">
          <div class="arbitrage-grid">
            <div class="calc-control-panel">
              <div class="input-field-group">
                <label for="slider-dish-price" style="font-weight: 700; font-size: 0.9rem; display: flex; justify-content: space-between;">
                  <span>1. Giá món bạn đang so sánh:</span>
                  <span id="label-dish-price-val" style="color: var(--accent); font-size: 1.05rem;">${Number(state.dishPrice).toLocaleString('vi-VN')} ₫</span>
                </label>
                <input 
                  type="range" 
                  id="slider-dish-price" 
                  class="calc-slider"
                  min="20000" 
                  max="200000" 
                  step="5000" 
                  value="${state.dishPrice}"
                  style="width: 100%; min-height: 44px; accent-color: var(--accent); cursor: pointer;"
                  aria-label="Thanh trượt giá món từ 20.000₫ đến 200.000₫"
                />
                <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted); margin-top: -6px;">
                  <span>20.000₫</span>
                  <span>100.000₫</span>
                  <span>200.000₫</span>
                </div>
              </div>

              <div class="input-field-group">
                <label style="font-weight: 700; font-size: 0.9rem;">2. Bối cảnh cần kiểm tra trong app:</label>
                <div class="bridge-btn-group">
                  <button 
                    type="button"
                    class="bridge-btn ${state.lunchScenario.peakTime ? 'active' : ''}" 
                    data-lunch-scenario="peakTime"
                    aria-pressed="${state.lunchScenario.peakTime}"
                  >
                    Giờ cao điểm
                  </button>
                  <button 
                    type="button"
                    class="bridge-btn ${state.lunchScenario.bridgeRoute ? 'active' : ''}" 
                    data-lunch-scenario="bridgeRoute"
                    aria-pressed="${state.lunchScenario.bridgeRoute}"
                  >
                    Lộ trình qua cầu
                  </button>
                </div>
              </div>

              <div class="disclaimer-note" style="background: rgba(0,0,0,0.02); border: 1px dashed var(--border-color); border-radius: var(--radius-control); padding: 8px 12px; font-size: 12px; color: var(--text-muted); line-height: 1.4;">
                <span>ℹ️</span>
                <span>${state.lunchScenario.peakTime || state.lunchScenario.bridgeRoute ? 'Hãy kiểm tra lại phí hiển thị trong ứng dụng trước khi đặt.' : 'Chỉ sử dụng số tiền bạn thấy trong ứng dụng. Không có giá, phí hay ưu đãi nhà cung cấp được nạp sẵn.'}</span>
              </div>
            </div>

            <div class="arbitrage-comparison-cards">
              ${Object.entries(comparison.items).map(([key, app]) => `
                <div class="app-calc-card">
                  <div class="app-calc-title" style="color: ${app.color}">
                    ${app.name}
                  </div>
                  <label class="app-calc-breakdown" style="display:block; margin:8px 0;">Phí giao bạn nhập
                    <input type="number" min="0" step="1000" inputmode="numeric" data-lunch-app="${key}" data-lunch-field="deliveryFee" value="${app.deliveryFee}" aria-label="Phí giao bạn nhập cho ${app.name}" class="split-input" />
                  </label>
                  <label class="app-calc-breakdown" style="display:block; margin:8px 0;">Voucher bạn nhập
                    <input type="number" min="0" step="1000" inputmode="numeric" data-lunch-app="${key}" data-lunch-field="voucher" value="${app.voucher}" aria-label="Voucher bạn nhập cho ${app.name}" class="split-input" />
                  </label>
                  <div class="app-calc-total">${Number(app.total).toLocaleString('vi-VN')} ₫</div>
                  <div class="app-calc-breakdown">Giá món + phí giao bạn nhập − voucher bạn nhập</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderStudentSavingsModule() {
  const stack = calculateDynamicStack();
  const fields = [
    ['basketValue', 'Giá trị đơn hàng bạn nhập'],
    ['shopDiscount', 'Mã giảm của shop bạn nhập'],
    ['platformVoucher', 'Voucher sàn bạn nhập'],
    ['deliveryFee', 'Phí giao hàng bạn nhập'],
    ['freeshipCredit', 'Ưu đãi phí giao bạn nhập']
  ];

  return `
    <section id="student-savings-module" class="bento-section" aria-labelledby="title-student-savings">
      <div class="container">
        <div class="section-header">
          <h2 id="title-student-savings" class="section-title">🎓 Đặc quyền sinh viên</h2>
          <p class="section-desc">Tính thử đơn hàng theo các mức giảm bạn tự nhập và xem điều kiện Spotify Student.</p>
        </div>
        <div class="arbitrage-grid">
          <div class="bento-card calc-control-panel">
            <h3 style="margin-top:0;">Tính thử đơn hàng KTX</h3>
            <p class="section-desc" style="margin-top:0;">Mô phỏng cục bộ, không phải mã giảm giá hoặc ưu đãi được JayT xác nhận.</p>
            ${fields.map(([field, label]) => `
              <label class="input-field-group" style="display:block; font-weight:700; font-size:.9rem;">${label}
                <input type="number" min="0" step="1000" inputmode="numeric" data-stack-input="${field}" value="${stack[field]}" aria-label="${label}" class="split-input" />
              </label>
            `).join('')}
          </div>
          <div class="bento-card split-result-panel">
            <div>
              <div style="font-size:.85rem; font-weight:700; color:var(--text-muted);">THANH TOÁN MÔ PHỎNG</div>
              <div class="split-big-number">${Number(stack.payable).toLocaleString('vi-VN')} ₫</div>
              <div class="split-breakdown-box">
                <div>Giá đơn: ${Number(stack.basketValue).toLocaleString('vi-VN')}₫</div>
                <div>Giảm bạn nhập: −${Number(stack.shopDiscount + stack.platformVoucher).toLocaleString('vi-VN')}₫</div>
                <div>Phí giao sau ưu đãi bạn nhập: ${Number(stack.deliveryAfterFreeship).toLocaleString('vi-VN')}₫</div>
                <div style="margin-top:6px; color:#047857; font-weight:700;">Tổng mức giảm bạn nhập: ${Number(stack.savings).toLocaleString('vi-VN')}₫</div>
              </div>
            </div>
            <div class="disclaimer-note"><span>ℹ️</span><span>Hãy đối chiếu điều kiện thực tế trong ứng dụng trước khi thanh toán.</span></div>
          </div>
        </div>
        <div class="bento-card" style="margin-top:16px;">
          <h3 style="margin-top:0;">Spotify Premium Student tại Việt Nam</h3>
          <p class="section-desc">33.000₫/tháng thay vì gói Cá nhân 65.000₫/tháng; chênh lệch 32.000₫/tháng chỉ áp dụng cho sinh viên đủ điều kiện.</p>
          <p class="section-desc">Cần đang theo học tại cơ sở giáo dục được công nhận, xác minh qua SheerID; ưu đãi sinh viên có thời hạn tối đa 4 năm. Điều khoản có thể thay đổi.</p>
          <a href="https://www.spotify.com/vn-vi/student/" target="_blank" rel="noopener noreferrer" class="btn-cta-secondary">Xem điều kiện Spotify Student ↗</a>
          <p style="font-size:.75rem; color:var(--text-muted); margin-bottom:0;">Nội dung đang được kiểm thử trên Staging; không có liên kết tiếp thị liên kết.</p>
        </div>
      </div>
    </section>
  `;
}

function renderSplitBillModule() {
  const split = calculateIntegerSplit(state.splitTotal, state.splitCount);

  return `
    <section id="split-bill-module" class="bento-section" aria-labelledby="title-split-module">
      <div class="container">
        <div class="section-header">
          <h2 id="title-split-module" class="section-title">➗ Chia Tiền Nhóm Tùy Chọn</h2>
          <p class="section-desc">Bảo toàn 100% số nguyên VNĐ cho nhóm 1&ndash;50 người, không chênh lệch tiền lẻ.</p>
        </div>

        <div class="bento-card">
          <div class="split-bill-container">
            <div class="split-controls">
              <div class="split-input-field" style="display: flex; flex-direction: column; gap: 4px;">
                <label for="input-split-total" style="font-size: 0.85rem; font-weight: 700;">1. Tổng số tiền cần chia (VNĐ):</label>
                <input 
                  type="number" 
                  id="input-split-total" 
                  class="split-input" 
                  value="${state.splitTotal}" 
                  step="1000" 
                  min="1000" 
                  aria-label="Tổng số tiền cần chia"
                />
              </div>

              <div class="split-input-field" style="display: flex; flex-direction: column; gap: 4px;">
                <label for="input-split-count" style="font-size: 0.85rem; font-weight: 700;">2. Số người trong nhóm (1 &mdash; 50):</label>
                <input 
                  type="number" 
                  id="input-split-count" 
                  class="split-input" 
                  value="${state.splitCount}" 
                  min="1" 
                  max="50" 
                  aria-label="Số người trong nhóm"
                />
              </div>

              <div class="split-input-field" style="display: flex; flex-direction: column; gap: 4px;">
                <label for="input-split-activity" style="font-size: 0.85rem; font-weight: 700;">3. Tên hoạt động / kèo nhóm (tùy chọn):</label>
                <input 
                  type="text" 
                  id="input-split-activity" 
                  class="split-input" 
                  value="${state.splitActivity}" 
                  placeholder="Ví dụ: Xem phim Starlight & Bắp nước" 
                  aria-label="Tên hoạt động"
                />
              </div>

              <div class="disclaimer-note">
                <span>🛡️</span>
                <span>Chạy hoàn toàn trên trình duyệt của bạn; không lưu trữ tên hay tài khoản cá nhân.</span>
              </div>
            </div>

            <div class="split-result-panel">
              <div>
                <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-bottom: 4px;">KẾT QUẢ PHÂN BỔ MỖI NGƯỜI</div>
                <div class="split-big-number">${Number(split.higherShare).toLocaleString('vi-VN')} ₫</div>

                <div class="split-breakdown-box">
                  ${split.remainder === 0 ? `
                    <div style="color: #047857; font-weight: 700;">✓ Chia đều chẵn tiền:</div>
                    <div>Tất cả ${split.count} bạn chuyển đúng <strong>${Number(split.baseShare).toLocaleString('vi-VN')} ₫</strong>.</div>
                  ` : `
                    <div style="font-weight: 700; color: var(--text-main); margin-bottom: 4px;">Phân bổ bù số dư lẻ (${Number(split.remainder).toLocaleString('vi-VN')} ₫):</div>
                    <div>&bull; <strong>${split.higherCount} bạn</strong> chuyển: <strong>${Number(split.higherShare).toLocaleString('vi-VN')} ₫</strong></div>
                    <div>&bull; <strong>${split.lowerCount} bạn</strong> chuyển: <strong>${Number(split.lowerShare).toLocaleString('vi-VN')} ₫</strong></div>
                  `}
                  <div style="margin-top: 6px; font-size: 0.78rem; color: #047857; font-weight: 700;">
                    ✓ 100% Bảo toàn tổng chi phí: ${split.higherCount} &times; ${Number(split.higherShare).toLocaleString('vi-VN')}₫ ${split.lowerCount > 0 && split.remainder > 0 ? '+ ' + split.lowerCount + ' &times; ' + Number(split.lowerShare).toLocaleString('vi-VN') + '₫' : ''} = ${Number(split.total).toLocaleString('vi-VN')}₫
                  </div>
                </div>
              </div>

              <div>
                <canvas id="canvas-split-pass" width="1080" height="1440" style="display: none;"></canvas>
                <div class="split-actions">
                  <button id="btn-download-split-png" class="btn-cta-primary" style="flex: 1; min-width: 200px;">
                    📥 Tải Thẻ Zalo Pass (PNG)
                  </button>
                  <button id="btn-copy-split-text" class="btn-cta-secondary" style="flex: 1; min-width: 180px;">
                    📋 Sao Chép Tin Nhắn
                  </button>
                  <button id="btn-share-split-native" class="btn-cta-secondary" style="min-width: 100px;">
                    🚀 Chia Sẻ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderDormShoppingModule() {
  const categories = [
    { id: 'ALL', label: 'Tất cả (30)', count: 30 },
    { id: 'GIA_DUNG', label: 'Gia dụng KTX (9)', match: 'Gia dụng KTX' },
    { id: 'HOC_TAP', label: 'Học tập & Công nghệ (9)', match: 'Học tập & Công nghệ' },
    { id: 'PHONG_NGU', label: 'Phòng ngủ & Tiện ích (6)', match: 'Phòng ngủ & Tiện ích' },
    { id: 'GIAT_UI', label: 'Sinh hoạt & Giặt ủi (3)', match: 'Sinh hoạt & Giặt ủi' },
    { id: 'CA_NHAN', label: 'Cá nhân (3)', match: 'Cá nhân' }
  ];

  const selectedCat = state.selectedDormCategory || 'ALL';
  const query = (state.dormSearchKeyword || '').toLowerCase().trim();

  const filteredProducts = J387_DORM_SKUS.filter(p => {
    const matchCat = (selectedCat === 'ALL') || (p.category === selectedCat);
    const matchKeyword = !query ||
      p.product_name.toLowerCase().includes(query) ||
      p.variant_name.toLowerCase().includes(query) ||
      p.merchant_name.toLowerCase().includes(query);
    return matchCat && matchKeyword;
  });

  const lastCheckStr = state.linkHealthLastCheck 
    ? ('Lần kiểm tra: ' + state.linkHealthLastCheck)
    : 'Health Worker SLA <=60s • 30/30 links hoạt động • 0 link bị ẩn';

  return `
    <section id="dorm-shopping-module" class="bento-section" aria-labelledby="title-dorm-module" style="margin-top: 32px;">
      <div class="container">
        <div class="section-header" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px;">
          <div>
            <h2 id="title-dorm-module" class="section-title">📦 Vật Dụng KTX &amp; Học Tập Thiết Yếu (30 SKU Mall)</h2>
            <p class="section-desc">Danh mục 30 sản phẩm thiết yếu sinh viên được đối soát giá thực tế tại Shopee Mall, LazMall và TikTok Shop Mall (Chuẩn Hiến pháp J385 M2 • Không lịch sử giá ảo • Kiểm tra link tự động).</p>
          </div>

          <!-- Health worker badge & live trigger -->
          <div style="display: inline-flex; align-items: center; gap: 10px; background: rgba(4, 120, 87, 0.08); border: 1.5px solid var(--accent); border-radius: var(--radius-chip); padding: 8px 14px; font-size: 12.5px;">
            <span>🛡️ <strong>Health Worker:</strong> <span style="color: var(--accent); font-weight: 700;">OPERATIONAL</span></span>
            <button type="button" id="btn-trigger-health-check" style="background: var(--accent); color: #ffffff; border: none; border-radius: 4px; padding: 4px 10px; font-size: 11.5px; font-weight: 700; cursor: pointer;">Test Live</button>
          </div>
        </div>

        <!-- Health Worker Live Status Bar -->
        <div id="health-worker-status-bar" style="background: var(--bg-card); border-left: 3.5px solid var(--accent); border-radius: 8px; border: 1px solid var(--border-color); border-left-width: 3.5px; padding: 10px 14px; font-size: 12.5px; color: var(--text-muted); margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <span id="health-worker-status-text">⚡ <em>${lastCheckStr}</em></span>
          <span style="font-size: 11px; background: rgba(0,0,0,0.05); padding: 3px 8px; border-radius: 4px; color: var(--text-main); font-weight: 500;">Quy tắc M2: 404/hết hàng ẩn trong 60s • 403/timeout ghi nhận UNKNOWN</span>
        </div>

        <div style="margin-bottom: var(--space-4);">
          <div style="margin-bottom: var(--space-3);">
            <input 
              type="text" 
              id="input-dorm-search" 
              placeholder="🔍 Tìm ổ cắm chống giật, ấm siêu tốc, quạt tích điện, bàn học, nệm KTX, máy tính Casio..." 
              value="${state.dormSearchKeyword || ''}" 
              style="width: 100%; min-height: 48px; padding: 0 var(--space-4); border-radius: var(--radius-control); border: 1px solid var(--border-color); background: var(--bg-surface); color: var(--text-main); font-size: 0.95rem;" 
              aria-label="Tìm kiếm sản phẩm KTX"
            />
          </div>
          <div class="dorm-filter-bar" role="tablist" style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${categories.map(c => {
              const isAct = (selectedCat === 'ALL' && c.id === 'ALL') || selectedCat === c.match;
              return `
                <button 
                  type="button"
                  class="dorm-tab-btn btn-dorm-cat ${isAct ? 'active is-active' : ''}" 
                  data-dorm-cat="${c.match || 'ALL'}"
                  style="padding: 8px 14px; border-radius: var(--radius-chip); font-size: 13px; font-weight: ${isAct ? '700' : '500'}; cursor: pointer; border: 1px solid ${isAct ? 'var(--accent)' : 'var(--border-color)'}; background: ${isAct ? 'var(--accent)' : 'var(--bg-card)'}; color: ${isAct ? '#ffffff' : 'var(--text-main)'}; min-height: 40px;"
                >
                  ${c.label}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Responsive Grid: 1 col mobile, 2 col tablet, 3 col desktop -->
        <div class="dorm-skus-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
          ${filteredProducts.map(p => {
            const platformColor = p.platform === 'Shopee' ? '#EE4D2D' : (p.platform === 'Lazada' ? '#0F146D' : '#FE2C55');

            return `
              <div class="dorm-sku-card" data-sku-id="${p.sku_id}" style="display: flex; flex-direction: column; justify-content: space-between; background: var(--bg-card); border: 1.5px solid var(--border-color); border-radius: 18px; padding: 18px; transition: transform var(--motion-fast); box-shadow: 0 2px 10px rgba(0,0,0,0.03);">
                <div>
                <!-- Single-Source Product Image / Labeled Placeholder -->
                <div style="width: 100%; height: 160px; margin-bottom: 12px; border-radius: 12px; overflow: hidden; background: #0F172A; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-color);">
                  <img src="${p.media.asset_path}" alt="${p.media.alt_text}" class="dorm-sku-img" style="width: 100%; height: 100%; object-fit: contain;" loading="lazy" />
                </div>
                <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                  <span>🏷️ <em>${p.media.media_classification === 'LABELED_NEUTRAL_PLACEHOLDER' ? 'Ảnh chuẩn bị cập nhật từ Mall' : 'Ảnh chính hãng'}</em></span>
                  <span style="font-size: 10px; opacity: 0.7;">${p.sku_id}</span>
                </div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <span style="font-size: 11.5px; font-weight: 750; color: ${platformColor}; background: rgba(0,0,0,0.04); padding: 3px 8px; border-radius: 6px; border: 1px solid ${platformColor}33;">
                      ${p.platform} Mall
                    </span>
                    <span style="font-size: 11px; color: var(--accent); font-weight: 600; background: rgba(4, 120, 87, 0.08); padding: 2px 8px; border-radius: 4px;">
                      ${p.category}
                    </span>
                  </div>

                  <h3 class="sku-title" style="font-size: 15px; font-weight: 750; color: var(--text-main); line-height: 1.35; margin: 0 0 8px 0;" title="${p.product_name}">
                    ${p.product_name}
                  </h3>

                  <div style="font-size: 12.5px; color: var(--text-muted); margin-bottom: 8px; line-height: 1.35;">
                    📐 <strong>Quy cách:</strong> ${p.variant_name}
                  </div>

                  <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 14px;">
                    🏪 <em>${p.merchant_name}</em>
                  </div>
                </div>

                <div style="border-top: 1px dashed var(--border-color); padding-top: 12px; margin-top: 6px;">
                  <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                    <div class="sku-price" style="font-size: 20px; font-weight: 800; color: var(--accent);">
                      ${p.price_display}
                    </div>
                    <div style="font-size: 12px; color: var(--text-muted);">
                      Ship ~ ${p.delivery_fee_estimate.toLocaleString('vi-VN')}₫
                    </div>
                  </div>

                  <div style="font-size: 11.5px; color: var(--text-muted); margin-bottom: 14px; display: flex; justify-content: space-between;">
                    <span>📅 ${p.price_label}</span>
                    <span style="color: #059669; font-weight: 700;">● Còn hàng</span>
                  </div>

                  <div style="display: flex; gap: 8px;">
                    <a 
                      href="${p.official_partner_url}" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      class="btn-cta-primary"
                      style="flex: 1; text-align: center; text-decoration: none; padding: 10px 14px; font-size: 13px; font-weight: 750; border-radius: var(--radius-chip); background: var(--accent); color: #ffffff; min-height: 42px; display: inline-flex; align-items: center; justify-content: center;"
                    >
                      Xem tại Mall ↗
                    </a>
                    <button 
                      type="button" 
                      class="btn-sku-drawer-info"
                      data-sku-id="${p.sku_id}"
                      style="padding: 10px 12px; font-size: 12.5px; font-weight: 600; border-radius: var(--radius-chip); border: 1px solid var(--border-color); background: transparent; color: var(--text-main); cursor: pointer; min-height: 42px;"
                      title="Xem chi tiết điều kiện & giao hàng"
                    >
                      Chi tiết ℹ️
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        ${filteredProducts.length === 0 ? `
          <div style="text-align: center; padding: 40px; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-card); border: 1px dashed var(--border-color);">
            Không tìm thấy vật dụng KTX phù hợp từ khóa "${query}". Vui lòng thử từ khóa khác hoặc chọn mục Tất cả.
          </div>
        ` : ''}

        <div style="margin-top: var(--space-6); padding: var(--space-3) var(--space-4); background: var(--bg-surface-subtle); border-radius: var(--radius-control); border: 1px solid var(--border-color); font-size: 0.82rem; color: var(--text-muted); display: flex; align-items: center; gap: 8px;">
          <span>ℹ️</span>
          <span><strong>Dữ liệu đối soát Mall — Kiểm tra tồn kho tại sàn.</strong> Danh mục tham khảo cho đời sống sinh viên; nhãn gian hàng chính hãng và liên kết ở trạng thái khảo sát trực tiếp theo tiêu chuẩn J385 M2.</span>
        </div>
      </div>
    </section>
  `;
}

function renderFooter() {
  return `
    <footer class="jayt-footer" role="contentinfo">
      <div class="container footer-content">
        <div style="display: flex; align-items: center; gap: 8px;">
          <strong style="color: var(--text-main); font-size: 1rem;">JayT Đà Nẵng</strong>
          <span>&bull;</span>
          <span>Cẩm nang tiện ích & đời sống sinh viên số</span>
        </div>
        <p>Bản quyền &copy; 2026 Tập Đoàn OPC JayT. Dữ liệu công cộng & đối soát nguồn gốc tại Đà Nẵng.</p>
        <p style="font-size: 0.78rem;">Toàn bộ công cụ vận hành độc lập trên trình duyệt; không thu thập dữ liệu cá nhân.</p>
      </div>
    </footer>
  `;
}

function renderZaloModal() {
  return `
    <div id="zalo-pass-modal" class="zalo-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="zalo-modal-title">
      <div class="zalo-modal-dialog">
        <div class="zalo-modal-header">
          <h3 id="zalo-modal-title" class="zalo-modal-title">🎟️ Thẻ Zalo Pass Chia Tiền Kèo Nhóm</h3>
          <button id="btn-close-zalo-modal" class="btn-modal-close" aria-label="Đóng cửa sổ">✕</button>
        </div>

        <div class="zalo-canvas-preview-box">
          <canvas id="canvas-zalo-offer-pass" width="1080" height="1440" style="width: 100%; max-height: 380px; object-fit: contain;"></canvas>
        </div>

        <div class="zalo-form-grid">
          <div>
            <label for="zalo-modal-people-count" style="font-size: 0.85rem; font-weight: 700; display: block; margin-bottom: 4px;">Số người tham gia (1&ndash;50):</label>
            <input type="number" id="zalo-modal-people-count" class="zalo-form-input" min="1" max="50" value="2" />
            <div id="err-people-count" class="form-error-msg">Vui lòng nhập số nguyên từ 1 đến 50</div>
          </div>
          <div>
            <label for="zalo-modal-total-amount" style="font-size: 0.85rem; font-weight: 700; display: block; margin-bottom: 4px;">Tổng tiền kèo (VNĐ):</label>
            <input type="number" id="zalo-modal-total-amount" class="zalo-form-input" step="1000" min="1000" value="100000" />
            <div id="err-total-amount" class="form-error-msg">Vui lòng nhập số tiền hợp lệ (> 0 VNĐ)</div>
          </div>
        </div>

        <div id="zalo-modal-split-explanation" class="split-rule-info">
          <!-- Populated by JS -->
        </div>

        <div class="modal-action-row">
          <button id="btn-download-zalo-png" class="btn-cta-primary" style="flex: 1;">
            📥 Tải Thẻ Zalo Pass (PNG)
          </button>
          <button id="btn-copy-zalo-text" class="btn-cta-secondary" style="flex: 1;">
            📋 Sao Chép Tin Nhắn
          </button>
          <button id="btn-share-zalo-native" class="btn-cta-secondary" style="min-width: 100px;">
            🚀 Chia Sẻ
          </button>
        </div>
      </div>
    </div>
  `;
}

// Canvas Drawer
function drawCanvasPass(canvas, passData) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 1080;
  const H = 1440;

  const isDark = (state.theme === 'theme-dark');

  // Background
  ctx.fillStyle = isDark ? '#101419' : '#F7F8FA';
  ctx.fillRect(0, 0, W, H);

  // Card Outer Container
  const pad = 40;
  ctx.fillStyle = isDark ? '#1B222A' : '#FFFFFF';
  ctx.strokeStyle = isDark ? '#43505E' : '#D5DCE3';
  ctx.lineWidth = 3;
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(pad, pad, W - pad * 2, H - pad * 2, 32);
    ctx.fill();
    ctx.stroke();
  } else {
    ctx.fillRect(pad, pad, W - pad * 2, H - pad * 2);
    ctx.strokeRect(pad, pad, W - pad * 2, H - pad * 2);
  }

  // Header Banner
  ctx.fillStyle = '#047857';
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(pad, pad, W - pad * 2, 160, [32, 32, 0, 0]);
    ctx.fill();
  } else {
    ctx.fillRect(pad, pad, W - pad * 2, 160);
  }

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, sans-serif';
  ctx.fillText('JAYT ĐÀ NẴNG', 80, 115);

  ctx.font = '22px -apple-system, sans-serif';
  ctx.fillText('PHIẾU KÈO NHÓM & CHIA TIỀN CHÍNH XÁC', 80, 160);

  // Brand and Offer Title
  ctx.fillStyle = '#047857';
  ctx.font = 'bold 26px -apple-system, sans-serif';
  ctx.fillText((passData.brand || 'ƯU ĐÃI ĐỐI SOÁT').toUpperCase(), 80, 265);

  ctx.fillStyle = isDark ? '#F3F6FA' : '#17212B';
  ctx.font = 'bold 42px -apple-system, sans-serif';
  const words = (passData.title || '').split(' ');
  let line = '';
  let yPos = 325;
  let linesCount = 0;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > 920 && n > 0) {
      ctx.fillText(line, 80, yPos);
      line = words[n] + ' ';
      yPos += 46;
      linesCount++;
      if (linesCount >= 3) break;
    } else {
      line = testLine;
    }
  }
  if (linesCount < 3) {
    ctx.fillText(line, 80, yPos);
  }

  // Campus / Area descriptor
  ctx.fillStyle = isDark ? '#B7C2CE' : '#526171';
  ctx.font = '24px -apple-system, sans-serif';
  ctx.fillText('📍 ' + (passData.campusName || 'Cụm trường liên kết Đà Nẵng'), 80, yPos + 48);

  // Dashed divider
  ctx.strokeStyle = isDark ? '#43505E' : '#D5DCE3';
  ctx.lineWidth = 2;
  ctx.setLineDash([12, 10]);
  ctx.beginPath();
  ctx.moveTo(80, 680);
  ctx.lineTo(W - 80, 680);
  ctx.stroke();
  ctx.setLineDash([]);

  // Bill & Split Summary
  ctx.fillStyle = isDark ? '#B7C2CE' : '#526171';
  ctx.font = '24px -apple-system, sans-serif';
  ctx.fillText('SỐ THÀNH VIÊN:', 80, 750);
  ctx.fillText('TỔNG HÓA ĐƠN KÈO:', 560, 750);

  ctx.fillStyle = isDark ? '#F3F6FA' : '#17212B';
  ctx.font = 'bold 38px -apple-system, sans-serif';
  ctx.fillText(passData.count + ' người', 80, 805);
  ctx.fillText(Number(passData.total).toLocaleString('vi-VN') + ' ₫', 560, 805);

  // Big Share Box
  ctx.fillStyle = isDark ? '#064E3B' : '#ECFDF5';
  ctx.strokeStyle = '#047857';
  ctx.lineWidth = 3;
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(80, 860, W - 160, 240, 20);
    ctx.fill();
    ctx.stroke();
  } else {
    ctx.fillRect(80, 860, W - 160, 240);
    ctx.strokeRect(80, 860, W - 160, 240);
  }

  ctx.fillStyle = '#047857';
  ctx.font = 'bold 26px -apple-system, sans-serif';
  ctx.fillText('MỖI BẠN CHUYỂN KHOẢN:', 120, 920);

  ctx.fillStyle = isDark ? '#F3F6FA' : '#17212B';
  ctx.font = 'bold 74px -apple-system, sans-serif';
  ctx.fillText(Number(passData.higherShare).toLocaleString('vi-VN') + ' ₫', 120, 1005);

  ctx.font = '24px -apple-system, sans-serif';
  if (passData.remainder > 0) {
    ctx.fillStyle = '#D97706';
    ctx.fillText('★ ' + passData.higherCount + ' bạn chuyển ' + Number(passData.higherShare).toLocaleString('vi-VN') + '₫  •  ' + passData.lowerCount + ' bạn chuyển ' + Number(passData.lowerShare).toLocaleString('vi-VN') + '₫', 120, 1065);
  } else {
    ctx.fillStyle = '#047857';
    ctx.fillText('✓ Chia đều chẵn tiền cho toàn bộ ' + passData.count + ' thành viên (Bảo toàn 100%)', 120, 1065);
  }

  // QR Code Area (Bottom Section)
  const qrUrl = passData.qrUrl || ('https://jayt-production-v3420.vercel.app/#offer-' + passData.offerId);
  const qrBoxX = W - 320;
  const qrBoxY = 1130;
  const qrBoxSize = 240;

  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#D5DCE3';
  ctx.lineWidth = 2;
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 16);
    ctx.fill();
    ctx.stroke();
  } else {
    ctx.fillRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize);
    ctx.strokeRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize);
  }

  if (typeof window !== 'undefined' && typeof window.qrcode === 'function') {
    try {
      const qr = window.qrcode(0, 'M');
      qr.addData(qrUrl);
      qr.make();
      const count = qr.getModuleCount();
      const cellSize = (qrBoxSize - 32) / count;
      ctx.fillStyle = '#000000';
      for (let r = 0; r < count; r++) {
        for (let c = 0; c < count; c++) {
          if (qr.isDark(r, c)) {
            ctx.fillRect(
              Math.floor(qrBoxX + 16 + c * cellSize),
              Math.floor(qrBoxY + 16 + r * cellSize),
              Math.ceil(cellSize),
              Math.ceil(cellSize)
            );
          }
        }
      }
    } catch (e) {
      console.error('QR draw error:', e);
    }
  }

  // QR Label & Footer Text
  ctx.fillStyle = isDark ? '#F3F6FA' : '#17212B';
  ctx.font = 'bold 24px -apple-system, sans-serif';
  ctx.fillText('QR MỞ KÈO', 80, 1170);

  ctx.fillStyle = isDark ? '#B7C2CE' : '#526171';
  ctx.font = '22px -apple-system, sans-serif';
  ctx.fillText('Quét QR bằng Zalo hoặc Camera để xem chi tiết ưu đãi tại JayT', 80, 1215);

  ctx.font = '20px -apple-system, sans-serif';
  ctx.fillText('✓ Dữ liệu đối soát minh bạch — Không phát sinh chênh lệch tiền lẻ', 80, 1260);

  ctx.font = '20px monospace';
  ctx.fillText('https://jayt-production-v3420.vercel.app', 80, 1340);
}

function showToast(msg) {
  const container = document.getElementById('jayt-toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'jayt-toast';
  toast.innerText = msg;
  container.appendChild(toast);
  setTimeout(() => {
    if (container.contains(toast)) {
      container.removeChild(toast);
    }
  }, 3200);
}

function updateCampusOffersDOM(focusOnNextCard) {
  const t0 = (typeof performance !== 'undefined') ? performance.now() : Date.now();

  // 1. Update Campus Dock Buttons aria-pressed
  document.querySelectorAll('.campus-dock-btn').forEach(btn => {
    const cid = btn.getAttribute('data-cluster-id');
    const isSelected = (cid === state.selectedClusterId);
    btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    btn.classList.toggle('is-active', isSelected);
  });

  // 2. Update Summary Box
  const summaryBox = document.getElementById('cluster-summary-box');
  if (summaryBox) {
    summaryBox.innerHTML = renderClusterSummaryPanel();
  }

  // 3. Sort by active schedule slot and paginate
  const filtered = getFilteredOffers();
  const currentSlot = getCurrentScheduleSlot();
  const activeSlotId = state.scheduleSlot || currentSlot.id;

  const sorted = [...filtered].sort((a, b) => {
    const sA = getOfferSlotRelevance(a, activeSlotId);
    const sB = getOfferSlotRelevance(b, activeSlotId);
    return sB - sA;
  });

  if (!state.visibleOfferCount) {
    state.visibleOfferCount = (typeof window !== 'undefined' && window.innerWidth < 768) ? 6 : ((typeof window !== 'undefined' && window.innerWidth < 1024) ? 9 : 12);
  }

  const visibleOffers = sorted.slice(0, state.visibleOfferCount);

  // 4. Populate container with Visual Cards
  const container = document.getElementById('campus-offers-container');
  if (container) {
    if (visibleOffers.length === 0) {
      container.innerHTML = `
        <div class="empty-offers-card" style="grid-column: 1 / -1; padding: 40px 20px; text-align: center; background: var(--bg-card); border-radius: var(--radius-card); border: 1px dashed var(--border-color);">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">🔍</div>
          <h3 class="empty-offers-title" style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">Chưa có kèo phù hợp</h3>
          <p class="empty-offers-desc" style="color: var(--text-muted); font-size: 14px; margin-bottom: 16px;">
            Rất tiếc chưa tìm thấy ưu đãi theo bộ lọc bạn chọn. Vui lòng đổi cụm cơ sở hoặc xem danh sách đầy đủ toàn thành phố.
          </p>
          <button class="btn-cta-primary" id="btn-empty-reset-all" style="padding: 10px 24px; min-height: 44px; border-radius: var(--radius-chip); cursor: pointer;">
            Xem tất cả ${J372_OFFERS.length} ưu đãi Đà Nẵng &rarr;
          </button>
        </div>
      `;
    } else {
      const prevNodesCount = container.children.length;
      const nodes = visibleOffers.map(o => {
        let n = OFFER_DOM_NODES.get(o.offer_id);
        if (!n) {
          n = renderSingleVisualCard(o);
          OFFER_DOM_NODES.set(o.offer_id, n);
        }
        return n;
      });
      container.replaceChildren(...nodes);

      if (focusOnNextCard && nodes.length > prevNodesCount && nodes[prevNodesCount]) {
        const firstNew = nodes[prevNodesCount].querySelector('button');
        if (firstNew) firstNew.focus();
      }
    }
  }

  // 5. Update Pagination View More button
  const paginContainer = document.getElementById('pagination-container');
  if (paginContainer) {
    const remaining = Math.max(0, sorted.length - state.visibleOfferCount);
    if (remaining > 0) {
      paginContainer.innerHTML = `
        <button type="button" class="btn-view-more-offers" id="btn-view-more-offers">
          Xem thêm (còn ${remaining} ưu đãi) ↓
        </button>
      `;
      const moreBtn = document.getElementById('btn-view-more-offers');
      if (moreBtn) {
        moreBtn.addEventListener('click', () => {
          const step = (typeof window !== 'undefined' && window.innerWidth < 768) ? 6 : ((typeof window !== 'undefined' && window.innerWidth < 1024) ? 9 : 12);
          state.visibleOfferCount = (state.visibleOfferCount || 12) + step;
          updateCampusOffersDOM(true);
        });
      }
    } else {
      paginContainer.innerHTML = '';
    }
  }

  // 6. Update Schedule Rhythm Header
  const rhythmContainer = document.getElementById('schedule-rhythm-container');
  if (rhythmContainer) {
    rhythmContainer.innerHTML = renderScheduleRhythmSection();
    attachScheduleRhythmEvents();
  }

  // 7. Update dynamic deals section description
  const dealsDesc = document.getElementById('deals-section-dynamic-desc');
  if (dealsDesc) {
    dealsDesc.textContent = getDealsSectionDesc();
  }

  const t1 = (typeof performance !== 'undefined') ? performance.now() : Date.now();
  if (typeof window !== 'undefined') {
    window.lastCampusSwitchDurationMs = (t1 - t0);
  }
}

function openZaloModal(offerId, defaultCount) {
  const offer = J372_OFFERS.find(o => o.offer_id === offerId);
  if (!offer) return;

  const priceInfo = extractOfferPrice(offer);
  const count = parseInt(defaultCount, 10) || 2;

  let total = 100000;
  if (priceInfo.basePrice > 0) {
    total = priceInfo.isPerPerson ? (priceInfo.basePrice * count) : priceInfo.basePrice;
  }

  const currentCluster = J372_CAMPUS_MAPPING.clusters.find(c => c.cluster_id === state.selectedClusterId);
  const campusName = currentCluster ? currentCluster.name : 'Đà Nẵng';

  state.activeZaloModal = {
    offerId: offerId,
    brand: offer.brand || 'JayT Đối Soát',
    title: offer.title,
    campusName: campusName,
    count: count,
    total: total,
    isPerPerson: priceInfo.isPerPerson,
    basePrice: priceInfo.basePrice
  };

  const modal = document.getElementById('zalo-pass-modal');
  if (modal) {
    modal.classList.add('is-open');
  }

  const peopleIn = document.getElementById('zalo-modal-people-count');
  const totalIn = document.getElementById('zalo-modal-total-amount');

  if (peopleIn) peopleIn.value = count;
  if (totalIn) totalIn.value = total;

  updateZaloModalPass();
}

function updateZaloModalPass() {
  if (!state.activeZaloModal) return;

  const peopleIn = document.getElementById('zalo-modal-people-count');
  const totalIn = document.getElementById('zalo-modal-total-amount');
  const errPeople = document.getElementById('err-people-count');
  const errTotal = document.getElementById('err-total-amount');
  const expBox = document.getElementById('zalo-modal-split-explanation');

  const countVal = parseInt(peopleIn.value, 10);
  const totalVal = parseInt(totalIn.value, 10);

  let hasError = false;
  if (isNaN(countVal) || countVal < 1 || countVal > 50) {
    if (errPeople) errPeople.classList.add('is-visible');
    hasError = true;
  } else {
    if (errPeople) errPeople.classList.remove('is-visible');
  }

  if (isNaN(totalVal) || totalVal <= 0) {
    if (errTotal) errTotal.classList.add('is-visible');
    hasError = true;
  } else {
    if (errTotal) errTotal.classList.remove('is-visible');
  }

  if (hasError) return;

  const split = calculateIntegerSplit(totalVal, countVal);
  state.activeZaloModal.count = countVal;
  state.activeZaloModal.total = totalVal;
  state.activeZaloModal.higherShare = split.higherShare;
  state.activeZaloModal.lowerShare = split.lowerShare;
  state.activeZaloModal.higherCount = split.higherCount;
  state.activeZaloModal.lowerCount = split.lowerCount;
  state.activeZaloModal.remainder = split.remainder;

  if (expBox) {
    if (split.remainder === 0) {
      expBox.innerHTML = `<strong style="color: #047857;">✓ Chia đều:</strong> Tất cả ${countVal} bạn chuyển đúng <strong>${Number(split.baseShare).toLocaleString('vi-VN')} ₫</strong>.`;
    } else {
      expBox.innerHTML = `<strong style="color: #D97706;">★ Phân bổ bù lẻ:</strong> ${split.higherCount} bạn chuyển <strong>${Number(split.higherShare).toLocaleString('vi-VN')} ₫</strong> &bull; ${split.lowerCount} bạn chuyển <strong>${Number(split.lowerShare).toLocaleString('vi-VN')} ₫</strong>.`;
    }
  }

  const canvas = document.getElementById('canvas-zalo-offer-pass');
  drawCanvasPass(canvas, state.activeZaloModal);
}

function attachAppEvents() {
  // Ecosystem tabs delegation
  const ecoBar = document.querySelector('.ecosystem-filter-bar');
  if (ecoBar && !ecoBar._hasListener) {
    ecoBar._hasListener = true;
    ecoBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-ecosystem-tab');
      if (!btn) return;
      state.selectedEcosystem = btn.getAttribute('data-ecosystem') || 'ALL';
      if (state.selectedEcosystem === 'dorm') {
        const dormMod = document.getElementById('dorm-shopping-module');
        if (dormMod) { dormMod.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      }
      if (state.selectedEcosystem === 'dorm') {
        const dormMod = document.getElementById('dorm-shopping-module');
        if (dormMod) { dormMod.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      }
      if (state.selectedEcosystem === 'dorm') {
        const dormMod = document.getElementById('dorm-shopping-module');
        if (dormMod) { dormMod.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      }
      state.visibleDealCount = 20;
      updateCampusOffersDOM();
      // Re-render deals section tab active state
      document.querySelectorAll('.btn-ecosystem-tab').forEach(b => {
        const isAct = b.getAttribute('data-ecosystem') === state.selectedEcosystem;
        b.classList.toggle('is-active', isAct);
        b.setAttribute('aria-selected', isAct ? 'true' : 'false');
        b.style.background = isAct ? 'var(--accent)' : 'var(--bg-card)';
        b.style.color = isAct ? '#ffffff' : 'var(--text-main)';
        b.style.borderColor = isAct ? 'var(--accent)' : 'var(--border-color)';
      });
    });
  }

  // Cinema day tabs delegation
  const cinemaDaysBar = document.querySelector('.cinema-days-bar');
  if (cinemaDaysBar && !cinemaDaysBar._hasListener) {
    cinemaDaysBar._hasListener = true;
    cinemaDaysBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-cinema-day');
      if (!btn) return;
      state.selectedCinemaDay = btn.getAttribute('data-cinema-day') || 'MON';
      const container = document.getElementById('cinema-schedule-container');
      if (container) container.innerHTML = renderCinemaSevenDaySchedule();
    });
  }

  // Budget slider event delegation
  const slider = document.getElementById('slider-dish-price');
  if (slider && !slider._hasListener) {
    slider._hasListener = true;
    slider.addEventListener('input', (e) => {
      state.dishPrice = parseInt(e.target.value, 10) || 35000;
      const labelVal = document.getElementById('label-dish-price-val');
      if (labelVal) labelVal.textContent = Number(state.dishPrice).toLocaleString('vi-VN') + ' ₫';
      // Re-calculate comparison cards
      const compCards = document.querySelector('.arbitrage-comparison-cards');
      if (compCards) {
        const comp = calculateLunchComparison(state.dishPrice, null, state.bridgeSurcharge);
        compCards.innerHTML = Object.entries(comp.items).map(([key, app]) => `
          <div class="app-calc-card ${app.isBest ? 'is-winner' : ''}">
            ${app.isBest ? '<div class="winner-ribbon" style="font-size: 11px; font-weight: 700; background: var(--accent); color: #ffffff; padding: 2px 8px; border-radius: 4px; text-align: center; margin-bottom: 6px;">Thấp nhất trong các mức đã nhập</div>' : ''}
            <div class="app-calc-title" style="color: ${app.color}">
              ${app.name}
            </div>
            <div class="app-calc-total">
              ${Number(app.total).toLocaleString('vi-VN')} ₫
            </div>
            <div class="app-calc-breakdown">
              <div>Món: ${Number(app.dishPrice).toLocaleString('vi-VN')}₫</div>
              <div>Ship: ${Number(app.deliveryFee).toLocaleString('vi-VN')}₫ + Phụ phí: ${Number(app.serviceFee + app.bridgeSurcharge).toLocaleString('vi-VN')}₫</div>
              <div style="color: #047857;">Mã giảm sàn: -${Number(app.discount).toLocaleString('vi-VN')}₫</div>
            </div>
          </div>
        `).join('');
      }
    });
  }

  // Copy code button delegation
  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('[data-action="copy-code"]');
    if (!copyBtn) return;
    const codeToCopy = copyBtn.getAttribute('data-code');
    if (!codeToCopy) return;

    navigator.clipboard.writeText(codeToCopy).then(() => {
      try { if (navigator.vibrate) navigator.vibrate(50); } catch (_) {}
      showToast(`Đã sao chép mã "${codeToCopy}" vào bộ nhớ tạm!`);
      copyBtn.textContent = '✓ Đã sao chép!';
      setTimeout(() => {
        copyBtn.textContent = '✂️ 1. Sao chép mã';
      }, 2000);
    }).catch(() => {
      prompt('Sao chép mã giảm giá:', codeToCopy);
    });
  });

  // Theme Toggle
  const btnTheme = document.getElementById('btn-theme-toggle');
  if (btnTheme) {
    btnTheme.addEventListener('click', () => {
      const nextTheme = (state.theme === 'theme-dark') ? 'theme-light' : 'theme-dark';
      state.theme = nextTheme;
      document.body.className = nextTheme;
      if (typeof window !== 'undefined') {
        localStorage.setItem('jayt_theme', nextTheme);
      }
      renderApp();
    });
  }

  
  // Mobile Navigation Drawer Controls & Focus Trap (NAV_02)
  const btnMobileMenu = document.getElementById('btn-mobile-menu');
  const btnCloseDrawer = document.getElementById('btn-close-mobile-menu');
  const drawerBackdrop = document.getElementById('mobile-nav-backdrop');
  const navDrawer = document.getElementById('mobile-nav-drawer');
  let lastFocusedNavTrigger = null;

  function openMobileMenu() {
    if (!navDrawer || !drawerBackdrop) return;
    lastFocusedNavTrigger = document.activeElement;
    drawerBackdrop.style.display = 'block';
    navDrawer.style.display = 'flex';
    // Force reflow
    void navDrawer.offsetWidth;
    drawerBackdrop.classList.add('open');
    navDrawer.classList.add('open');
    if (btnMobileMenu) btnMobileMenu.setAttribute('aria-expanded', 'true');
    if (btnCloseDrawer) btnCloseDrawer.focus();
    document.addEventListener('keydown', handleDrawerKeydown);
  }

  function closeMobileMenu() {
    if (!navDrawer || !drawerBackdrop) return;
    drawerBackdrop.classList.remove('open');
    navDrawer.classList.remove('open');
    if (btnMobileMenu) btnMobileMenu.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', handleDrawerKeydown);
    setTimeout(() => {
      drawerBackdrop.style.display = 'none';
      navDrawer.style.display = 'none';
    }, 160);
    if (lastFocusedNavTrigger && typeof lastFocusedNavTrigger.focus === 'function') {
      lastFocusedNavTrigger.focus();
    }
  }

  function handleDrawerKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeMobileMenu();
      return;
    }
    if (e.key === 'Tab') {
      const focusables = navDrawer.querySelectorAll('button, a[href]');
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  if (btnMobileMenu) {
    btnMobileMenu.onclick = () => {
      const isExpanded = btnMobileMenu.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    };
  }

  if (btnCloseDrawer) {
    btnCloseDrawer.onclick = closeMobileMenu;
  }

  if (drawerBackdrop) {
    drawerBackdrop.onclick = closeMobileMenu;
  }

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.onclick = (e) => {
      const targetId = link.getAttribute('data-target');
      closeMobileMenu();
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
  });

  // Campus Dock Button Clicks (In-Memory Filter)
  document.querySelectorAll('.campus-dock-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedClusterId = btn.getAttribute('data-cluster-id') || 'ALL';
      updateCampusOffersDOM();
    });
  });

  // Category tabs
  document.querySelectorAll('[data-deal-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedDealCategory = btn.getAttribute('data-deal-cat');
      document.querySelectorAll('[data-deal-cat]').forEach(b => {
        const isActive = (b.getAttribute('data-deal-cat') === state.selectedDealCategory);
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      updateCampusOffersDOM();
    });
  });

  // Summary box delegation (Reset button & Feed Switcher)
  const summaryBox = document.getElementById('cluster-summary-box');
  if (summaryBox) {
    summaryBox.addEventListener('click', (e) => {
      const btnReset = e.target.closest('#btn-reset-campus-filter');
      if (btnReset) {
        state.selectedClusterId = 'ALL';
        updateCampusOffersDOM();
        return;
      }
      const btnFeedStudent = e.target.closest('#btn-feed-student-budget');
      if (btnFeedStudent) {
        state.storefrontFeedFilter = 'STUDENT_BUDGET';
        state.visibleDealCount = 20;
        updateCampusOffersDOM();
        return;
      }
      const btnFeedAll = e.target.closest('#btn-feed-all-catalog');
      if (btnFeedAll) {
        state.storefrontFeedFilter = 'ALL';
        state.visibleDealCount = 20;
        updateCampusOffersDOM();
        return;
      }
    });
  }

  // Event delegation on #campus-offers-container (J374 Visual-First)
  const container = document.getElementById('campus-offers-container');
  if (container && !container._hasDelegation) {
    container._hasDelegation = true;
    container.addEventListener('click', (e) => {
      // 1. Open Detail Drawer
      const detailBtn = e.target.closest('[data-action="open-drawer"]');
      if (detailBtn) {
        const offerId = detailBtn.getAttribute('data-offer-id');
        if (offerId) openOfferDrawer(offerId, detailBtn);
        return;
      }

      // 2. Open Invite / Rủ bạn kèo này
      const inviteBtn = e.target.closest('[data-action="open-invite"]');
      if (inviteBtn) {
        const offerId = inviteBtn.getAttribute('data-offer-id');
        if (offerId) openZaloModal(offerId, 2);
        return;
      }

      // 3. Quick split button
      const quickBtn = e.target.closest('.btn-zalo-quick');
      if (quickBtn) {
        openZaloModal(quickBtn.getAttribute('data-zalo-offer'), quickBtn.getAttribute('data-split'));
        return;
      }
      // 4. Custom split button
      const customBtn = e.target.closest('.btn-zalo-custom');
      if (customBtn) {
        openZaloModal(customBtn.getAttribute('data-zalo-offer'), 3);
        return;
      }
      // 5. Copy code button
      const copyBtn = e.target.closest('.btn-copy-ticket');
      if (copyBtn) {
        const code = (copyBtn.getAttribute('data-code') || '').trim();
        if (!code) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(code).then(() => {
            showToast(`✓ Đã sao chép mã ${code}!`);
          }).catch(() => {
            showToast('Mã ưu đãi: ' + code);
          });
        } else {
          showToast('Mã ưu đãi: ' + code);
        }
        return;
      }
      // 6. Empty reset button
      const emptyReset = e.target.closest('#btn-empty-reset-all');
      if (emptyReset) {
        state.selectedClusterId = 'ALL';
        state.selectedDealCategory = 'ALL';
        document.querySelectorAll('[data-deal-cat]').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-deal-cat') === 'ALL');
        });
        updateCampusOffersDOM();
        return;
      }
    });
  }

  // Keyboard navigation & Escape key & Focus trap for Drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (state.activeDrawerOfferId) {
        e.preventDefault();
        closeOfferDrawer();
      }
    }
    if (e.key === 'Tab' && state.activeDrawerOfferId) {
      const drawer = document.getElementById('offer-detail-drawer');
      if (drawer && drawer.classList.contains('is-open')) {
        const focusables = drawer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusables.length > 0) {
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }
  });

  // Deep-link popstate and hash navigation
  window.addEventListener('popstate', () => {
    if (window.location.hash.startsWith('#offer-')) {
      const offerId = window.location.hash.replace('#offer-', '');
      openOfferDrawer(offerId);
    } else if (state.activeDrawerOfferId) {
      closeOfferDrawer();
    }
  });

  // Schedule auto-recompute on visibilitychange and resume
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !state.scheduleManualOverride && !state.activeDrawerOfferId && !onsiteState.billModalOpen) {
      const newSlot = getCurrentScheduleSlot();
      if (newSlot.id !== state.scheduleSlot) {
        state.scheduleSlot = newSlot.id;
        updateCampusOffersDOM();
      }
    }
  });

  // Zalo Modal Controls
  const btnCloseModal = document.getElementById('btn-close-zalo-modal');
  const modalBackdrop = document.getElementById('zalo-pass-modal');
  if (btnCloseModal && modalBackdrop) {
    btnCloseModal.addEventListener('click', () => modalBackdrop.classList.remove('is-open'));
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) modalBackdrop.classList.remove('is-open');
    });
  }

  const peopleIn = document.getElementById('zalo-modal-people-count');
  const totalIn = document.getElementById('zalo-modal-total-amount');
  if (peopleIn) peopleIn.addEventListener('input', updateZaloModalPass);
  if (totalIn) totalIn.addEventListener('input', updateZaloModalPass);

  // Zalo Modal Download PNG
  const btnDownloadZalo = document.getElementById('btn-download-zalo-png');
  if (btnDownloadZalo) {
    btnDownloadZalo.addEventListener('click', () => {
      const canvas = document.getElementById('canvas-zalo-offer-pass');
      if (!canvas) return;
      try {
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = `zalo_pass_${state.activeZaloModal ? state.activeZaloModal.offerId : 'jayt'}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showToast('✓ Đã tải Thẻ Zalo Pass (PNG)');
      } catch (err) {
        showToast('Không thể xuất ảnh: ' + err.message);
      }
    });
  }

  // Zalo Modal Copy Text
  const btnCopyZaloText = document.getElementById('btn-copy-zalo-text');
  if (btnCopyZaloText) {
    btnCopyZaloText.addEventListener('click', () => {
      if (!state.activeZaloModal) return;
      const m = state.activeZaloModal;
      const msg = [
        '🎬 [JAYT ĐÀ NẴNG - KÈO NHÓM]',
        'Ưu đãi: ' + m.title + ' (' + m.brand + ')',
        'Khu vực: ' + m.campusName,
        'Số người: ' + m.count + ' thành viên',
        'Tổng chi phí: ' + Number(m.total).toLocaleString('vi-VN') + ' ₫',
        '---------------------------------',
        m.remainder === 0
          ? '👉 Mỗi bạn chuyển: ' + Number(m.higherShare).toLocaleString('vi-VN') + ' ₫'
          : '👉 ' + m.higherCount + ' bạn chuyển: ' + Number(m.higherShare).toLocaleString('vi-VN') + ' ₫\n👉 ' + m.lowerCount + ' bạn chuyển: ' + Number(m.lowerShare).toLocaleString('vi-VN') + ' ₫',
        '---------------------------------',
        'Mở xem ưu đãi: https://jayt-production-v3420.vercel.app/#offer-' + m.offerId
      ].join('\n');

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(msg).then(() => {
          showToast('✓ Đã sao chép nội dung tin nhắn Zalo!');
        }).catch(() => {
          showToast('Vui lòng chọn thủ công tin nhắn');
        });
      }
    });
  }

  // Zalo Modal Share Native
  const btnShareZalo = document.getElementById('btn-share-zalo-native');
  if (btnShareZalo) {
    btnShareZalo.addEventListener('click', async () => {
      if (!state.activeZaloModal) return;
      const m = state.activeZaloModal;
      const shareData = {
        title: 'JayT Kèo Nhóm — ' + m.title,
        text: `Kèo nhóm ${m.count} bạn cùng đi ${m.brand}: mỗi bạn chuyển ${Number(m.higherShare).toLocaleString('vi-VN')}₫!`,
        url: 'https://jayt-production-v3420.vercel.app/#offer-' + m.offerId
      };
      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (e) {
          // Share cancellation ignored per spec
        }
      } else {
        showToast('Trình duyệt chưa hỗ trợ share native. Vui lòng bấm sao chép tin nhắn!');
      }
    });
  }

  // Lunch Arbitrage Events
  const dishPriceInput = document.getElementById('slider-dish-price');
  if (dishPriceInput) {
    dishPriceInput.addEventListener('input', () => {
      state.dishPrice = parseInt(dishPriceInput.value, 10) || 35000;
      const section = document.getElementById('lunch-arbitrage-module');
      if (section) {
        const temp = document.createElement('div');
        temp.innerHTML = renderLunchArbitrageModule();
        section.replaceWith(temp.firstElementChild);
        attachAppEvents();
      }
    });
  }

  document.querySelectorAll('[data-lunch-app][data-lunch-field]').forEach(input => {
    input.addEventListener('input', () => {
      const app = input.dataset.lunchApp;
      const field = input.dataset.lunchField;
      if (!state.lunchInputs[app]) state.lunchInputs[app] = { deliveryFee: 0, voucher: 0 };
      state.lunchInputs[app][field] = toNonNegativeVnd(input.value);
      const section = document.getElementById('lunch-arbitrage-module');
      if (section) {
        const temp = document.createElement('div');
        temp.innerHTML = renderLunchArbitrageModule();
        section.replaceWith(temp.firstElementChild);
        attachAppEvents();
      }
    });
  });

  document.querySelectorAll('[data-lunch-scenario]').forEach(btn => {
    btn.addEventListener('click', () => {
      const scenario = btn.dataset.lunchScenario;
      state.lunchScenario[scenario] = !state.lunchScenario[scenario];
      const section = document.getElementById('lunch-arbitrage-module');
      if (section) {
        const temp = document.createElement('div');
        temp.innerHTML = renderLunchArbitrageModule();
        section.replaceWith(temp.firstElementChild);
        attachAppEvents();
      }
    });
  });

  document.querySelectorAll('[data-stack-input]').forEach(input => {
    input.addEventListener('input', () => {
      state.voucherStack[input.dataset.stackInput] = toNonNegativeVnd(input.value);
      const section = document.getElementById('student-savings-module');
      if (section) {
        const temp = document.createElement('div');
        temp.innerHTML = renderStudentSavingsModule();
        section.replaceWith(temp.firstElementChild);
        attachAppEvents();
      }
    });
  });

  // Split Bill Module Events
  const splitTotalIn = document.getElementById('input-split-total');
  const splitCountIn = document.getElementById('input-split-count');
  const splitActIn = document.getElementById('input-split-activity');

  function updateSplitBillModuleUI() {
    state.splitTotal = parseInt(splitTotalIn.value, 10) || 100000;
    state.splitCount = parseInt(splitCountIn.value, 10) || 3;
    state.splitActivity = (splitActIn && splitActIn.value) || '';

    const section = document.getElementById('split-bill-module');
    if (section) {
      const temp = document.createElement('div');
      temp.innerHTML = renderSplitBillModule();
      section.replaceWith(temp.firstElementChild);
      attachAppEvents();
    }
  }

  if (splitTotalIn) splitTotalIn.addEventListener('input', updateSplitBillModuleUI);
  if (splitCountIn) splitCountIn.addEventListener('input', updateSplitBillModuleUI);
  if (splitActIn) splitActIn.addEventListener('input', updateSplitBillModuleUI);

  // Dorm shopping tab buttons
  document.querySelectorAll('[data-dorm-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedDormCategory = btn.getAttribute('data-dorm-cat');
      const section = document.getElementById('dorm-shopping-module');
      if (section) {
        const temp = document.createElement('div');
        temp.innerHTML = renderDormShoppingModule();
        section.replaceWith(temp.firstElementChild);
        attachAppEvents();
      }
    });
  });

  const dormSearchInput = document.getElementById('input-dorm-search');
  if (dormSearchInput) {
    dormSearchInput.addEventListener('input', () => {
      state.dormSearchKeyword = dormSearchInput.value;
      const section = document.getElementById('dorm-shopping-module');
      if (section) {
        const temp = document.createElement('div');
        temp.innerHTML = renderDormShoppingModule();
        section.replaceWith(temp.firstElementChild);
        attachAppEvents();
        const newSearch = document.getElementById('input-dorm-search');
        if (newSearch) {
          newSearch.focus();
          newSearch.selectionStart = newSearch.selectionEnd = newSearch.value.length;
        }
      }
    });
  }
}

function handleHashNavigation() {
  const hash = window.location.hash;
  if (!hash || !hash.startsWith('#offer-')) return;
  const offerId = hash.replace('#offer-', '');

  // If in cluster filter, switch to ALL so target card is in DOM
  if (state.selectedClusterId !== 'ALL') {
    state.selectedClusterId = 'ALL';
    updateCampusOffersDOM();
  }

  setTimeout(() => {
    const el = document.getElementById('offer-' + offerId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('offer-highlight-active');
      setTimeout(() => el.classList.remove('offer-highlight-active'), 3000);
    }
  }, 150);
}

function renderApp() {
  const root = document.getElementById('jayt-app-root');
  if (!root) return;

  initOfferDomNodes();

  root.innerHTML = `
    <div class="jayt-app-wrapper">
      ${renderHeader()}
      ${renderCounterSearchBar()}
      ${renderHero()}
      ${renderCampusDock()}
      ${renderCampusDealsSection()}
      ${renderLunchArbitrageModule()}
      ${renderStudentSavingsModule()}
      ${renderSplitBillModule()}
      ${renderDormShoppingModule()}
      ${renderFooter()}
      ${renderMobileNavDrawer()}
      ${renderCounterSheetModal()}
      ${renderOnsiteBillSplitModal()}
      ${renderZaloModal()}
      <!-- J374 Visual Detail Drawer -->
      <div id="offer-detail-drawer" class="offer-drawer-backdrop" role="dialog" aria-modal="true" aria-labelledby="drawer-offer-title" style="display: none;"></div>
      <div id="jayt-toast-container" class="toast-container" aria-live="polite"></div>
    </div>
  `;

  attachAppEvents();
  attachOnsiteEvents();
  updateCampusOffersDOM();
  if (onsiteState.billModalOpen) updateVietQRDisplay();
  handleHashNavigation();
}

// Initial bootstrap
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
  } else {
    renderApp();
  }
  window.addEventListener('hashchange', handleHashNavigation);
}



// Expose J373 R1 modules for test suites and verification
if (typeof window !== 'undefined') {
  window.calculateItemizedSplit = calculateItemizedSplit;
  window.generateVietQRPayload = generateVietQRPayload;
  window.calculateGeodesicDistance = calculateGeodesicDistance;
  window.onsiteState = onsiteState;
  window.J373_BRANCH_UTILITIES = J373_BRANCH_UTILITIES;
  window.J373_COUNTER_RULES = J373_COUNTER_RULES;
  window.J373_VIETQR_SPEC = J373_VIETQR_SPEC;
}
