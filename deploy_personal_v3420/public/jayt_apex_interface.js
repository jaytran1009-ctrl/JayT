/**
 * JAYT-372 R2 NAVIGATION & ABOVE-THE-FOLD STOREFRONT INTERFACE
 * Mandate: WORK_ORDER_J372_R2_NAVIGATION_AND_ABOVE_FOLD_FIX
 * Authority: JAYT-372 CEO R2
 * Canonical Domain: https://jayt-production-v3420.vercel.app
 * Version: v3.436.0-j372-r2
 */

// Embedded Remediated Source Data
const J372_CAMPUS_MAPPING = {
  "mapping_id": "MAPPING_J372_R1_CAMPUS_OFFERS_REMEDIATED_20260910",
  "mandate": "JAYT-372 R1 — DATA ASSERTION REMEDIATION GATE",
  "authority": "WORK_ORDER_J372_R2_NAVIGATION_AND_ABOVE_FOLD_FIX",
  "generated_at_utc": "2026-09-10T07:40:21.736Z",
  "data_audit_summary": {
    "total_feed_offers": 81,
    "total_eligible_offers": 65,
    "total_held_or_discontinued_offers_excluded": 16,
    "held_policy": "ZERO_HELD_OFFERS_IN_CLUSTER_MAPPING"
  },
  "held_and_unavailable_offers": [
    {
      "offer_id": "B18_LOTTE_MEMBERDAY",
      "brand": "Lotteria",
      "title": "Lotteria Member Day Thứ 4 — VIP giảm 20%, Member giảm 10%",
      "validation_status": "HELD__INSUFFICIENT_LEAF_TEXT_EVIDENCE",
      "public_surface": "INTERNAL_HELD_ONLY",
      "is_public_card": false,
      "exclusion_reason": "LEAF_PAGE_USES_GRAPHICAL_BANNER_WITHOUT_PARSED_TEXT_SPAN"
    },
    {
      "offer_id": "B18_LOTTE_RIAS_LUNCH",
      "brand": "Lotteria",
      "title": "Combo Ria's Lunch Giờ Trưa Từ 45.000₫",
      "validation_status": "HELD__INSUFFICIENT_LEAF_TEXT_EVIDENCE",
      "public_surface": "INTERNAL_HELD_ONLY",
      "is_public_card": false,
      "exclusion_reason": "LEAF_PAGE_CLIENT_RENDER_INCOMPLETE_FOR_ITEM_TERMS"
    },
    {
      "offer_id": "B13_CGV_PAYDAY_30K",
      "brand": "CGV Cinemas Đà Nẵng",
      "title": "CGV Cinemas — Payday Đồng Giá Vé 30.000₫",
      "validation_status": "HELD__EXPIRED_OR_UNVERIFIED_CURRENT_VALIDITY",
      "public_surface": "INTERNAL_HELD_ONLY",
      "is_public_card": false,
      "exclusion_reason": "EXPIRED_OR_UNVERIFIED_CURRENT_VALIDITY"
    },
    {
      "offer_id": "B16_PHUCLONG_M01",
      "brand": "Phúc Long Coffee & Tea",
      "title": "Tặng 01 Trà Sữa size L (Phúc Long)",
      "validation_status": "HELD__EXPIRED_OR_UNVERIFIED_CURRENT_VALIDITY",
      "public_surface": "INTERNAL_HELD_ONLY",
      "is_public_card": false,
      "exclusion_reason": "EXPIRED_OR_UNVERIFIED_CURRENT_VALIDITY"
    },
    {
      "offer_id": "B16_PHUCLONG_M03",
      "brand": "Phúc Long Coffee & Tea",
      "title": "Tặng 01 Bánh Ngọt (Phúc Long)",
      "validation_status": "HELD__EXPIRED_OR_UNVERIFIED_CURRENT_VALIDITY",
      "public_surface": "INTERNAL_HELD_ONLY",
      "is_public_card": false,
      "exclusion_reason": "EXPIRED_OR_UNVERIFIED_CURRENT_VALIDITY"
    },
    {
      "offer_id": "B16_PHUCLONG_M04",
      "brand": "Phúc Long Coffee & Tea",
      "title": "Ưu đãi 50% cho thức uống (L) (Phúc Long)",
      "validation_status": "HELD__EXPIRED_OR_UNVERIFIED_CURRENT_VALIDITY",
      "public_surface": "INTERNAL_HELD_ONLY",
      "is_public_card": false,
      "exclusion_reason": "EXPIRED_OR_UNVERIFIED_CURRENT_VALIDITY"
    },
    {
      "offer_id": "B16_PHUCLONG_M05",
      "brand": "Phúc Long Coffee & Tea",
      "title": "Upsize cho trà trái cây (Phúc Long)",
      "validation_status": "HELD__EXPIRED_OR_UNVERIFIED_CURRENT_VALIDITY",
      "public_surface": "INTERNAL_HELD_ONLY",
      "is_public_card": false,
      "exclusion_reason": "EXPIRED_OR_UNVERIFIED_CURRENT_VALIDITY"
    },
    {
      "offer_id": "B16_PHUCLONG_M06",
      "brand": "Phúc Long Coffee & Tea",
      "title": "Giảm 5K cho ly nước size L (Phúc Long)",
      "validation_status": "HELD__EXPIRED_OR_UNVERIFIED_CURRENT_VALIDITY",
      "public_surface": "INTERNAL_HELD_ONLY",
      "is_public_card": false,
      "exclusion_reason": "EXPIRED_OR_UNVERIFIED_CURRENT_VALIDITY"
    },
    {
      "offer_id": "B16_PHUCLONG_M07",
      "brand": "Phúc Long Coffee & Tea",
      "title": "Tặng 01 Trà Sữa size M (Phúc Long)",
      "validation_status": "HELD__EXPIRED_OR_UNVERIFIED_CURRENT_VALIDITY",
      "public_surface": "INTERNAL_HELD_ONLY",
      "is_public_card": false,
      "exclusion_reason": "EXPIRED_OR_UNVERIFIED_CURRENT_VALIDITY"
    },
    {
      "offer_id": "B16_PHUCLONG_M09",
      "brand": "Phúc Long Coffee & Tea",
      "title": "Giảm 20% cho món Trà Sữa Ô Long Tứ Quý (Phúc Long)",
      "validation_status": "HELD__EXPIRED_OR_UNVERIFIED_CURRENT_VALIDITY",
      "public_surface": "INTERNAL_HELD_ONLY",
      "is_public_card": false,
      "exclusion_reason": "EXPIRED_OR_UNVERIFIED_CURRENT_VALIDITY"
    },
    {
      "offer_id": "B16_PHUCLONG_M10",
      "brand": "Phúc Long Coffee & Tea",
      "title": "Giảm 20% cho món Trà Ô Long Tứ Quý Nho Mẫu Đơn (Phúc Long)",
      "validation_status": "HELD__EXPIRED_OR_UNVERIFIED_CURRENT_VALIDITY",
      "public_surface": "INTERNAL_HELD_ONLY",
      "is_public_card": false,
      "exclusion_reason": "EXPIRED_OR_UNVERIFIED_CURRENT_VALIDITY"
    },
    {
      "offer_id": "B19_TCH_DISCOVERY_001",
      "brand": "The Coffee House",
      "title": "The Coffee House Vietnam Portal (Khám phá)",
      "validation_status": "DISCOVERY_ONLY",
      "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
      "is_public_card": false,
      "exclusion_reason": "DISCOVERY_ONLY"
    },
    {
      "offer_id": "B19_TPC_COMBO_VU_LAN_315K",
      "brand": "The Pizza Company",
      "title": "Combo Vũ Lan 315K",
      "validation_status": "HELD__EXPIRED_SEASONAL_OFFER",
      "public_surface": "INTERNAL_HELD_ONLY",
      "is_public_card": false,
      "exclusion_reason": "HELD__EXPIRED_SEASONAL_OFFER"
    },
    {
      "offer_id": "B19_TPC_BO_DOI_NHU_Y_169K",
      "brand": "The Pizza Company",
      "title": "Bò Đội Như Ý Combo 1 169K",
      "validation_status": "HELD__DISCONTINUED_OFFER",
      "public_surface": "INTERNAL_HELD_ONLY",
      "is_public_card": false,
      "exclusion_reason": "HELD__DISCONTINUED_OFFER"
    },
    {
      "offer_id": "B19_POPEYES_BOGO_MON",
      "brand": "Popeyes",
      "title": "Popeyes Mua 1 Tặng 1 Thứ 2",
      "validation_status": "HELD_PENDING_ACTIVE_TERMS",
      "public_surface": "INTERNAL_HELD_ONLY",
      "is_public_card": false,
      "exclusion_reason": "HELD__API_APPROVE_FALSE_PENDING_ACTIVE_TERMS: Official API marks banner approve:false. Moved to held pending active terms per JAYT-361 R1."
    },
    {
      "offer_id": "B19_POPEYES_BOGO_WED",
      "brand": "Popeyes",
      "title": "Popeyes Mua 1 Tặng 1 Thứ 4",
      "validation_status": "HELD_PENDING_ACTIVE_TERMS",
      "public_surface": "INTERNAL_HELD_ONLY",
      "is_public_card": false,
      "exclusion_reason": "HELD__API_APPROVE_FALSE_PENDING_ACTIVE_TERMS: Official API marks banner approve:false. Moved to held pending active terms per JAYT-361 R1."
    }
  ],
  "clusters": [
    {
      "cluster_id": "cluster_bk_sp",
      "name": "Bách Khoa / Sư Phạm",
      "short_label": "🎓 Bách Khoa / Sư Phạm",
      "area_descriptor": "Liên Chiểu / Hòa Khánh / Tôn Đức Thắng",
      "target_universities": [
        "Đại học Bách Khoa Đà Nẵng (54 Nguyễn Lương Bằng)",
        "Đại học Sư Phạm Đà Nẵng (459 Tôn Đức Thắng)",
        "Cao đẳng Kinh tế Kế hoạch (143 Huỳnh Ngọc Huệ / Liên Chiểu)"
      ],
      "verified_branches": [
        {
          "branch_id": "br_jb_coopmart_dnb",
          "brand": "Jollibee",
          "branch_name": "Jollibee Co.opmart Đà Nẵng",
          "address": "478 Điện Biên Phủ, Q. Thanh Khê, Đà Nẵng (giáp Q. Liên Chiểu)",
          "applicability_scope": "Dine-in / Takeaway / Delivery near campus",
          "evidence_reference": "jollibee_danang_stores_registry_v1"
        },
        {
          "branch_id": "br_galaxy_coopmart",
          "brand": "Galaxy Cinema",
          "branch_name": "Galaxy Cinema Co.opmart Đà Nẵng",
          "address": "Tầng 3 Co.opmart, 478 Điện Biên Phủ, Q. Thanh Khê",
          "applicability_scope": "Direct box office / online app booking",
          "evidence_reference": "galaxy_danang_tariff_evidence_v1"
        },
        {
          "branch_id": "br_starlight_nguyenkim",
          "brand": "Starlight Cinema",
          "branch_name": "Starlight Cinema Đà Nẵng",
          "address": "Tầng 3-4 TTTM Nguyễn Kim, 46 Điện Biên Phủ, Q. Thanh Khê",
          "applicability_scope": "Direct counter / Starlight app",
          "evidence_reference": "starlight_danang_u22_tariff_v1"
        },
        {
          "branch_id": "br_hl_dienbienphu_nlb",
          "brand": "Highlands Coffee",
          "branch_name": "Highlands Coffee Điện Biên Phủ & Nguyễn Lương Bằng",
          "address": "478 Điện Biên Phủ & 239 Nguyễn Lương Bằng, Q. Liên Chiểu",
          "applicability_scope": "In-store counter / Packaged 6-pack",
          "evidence_reference": "highlands_da_nang_registry_v1"
        },
        {
          "branch_id": "br_tpc_coopmart",
          "brand": "The Pizza Company",
          "branch_name": "The Pizza Company Coopmart",
          "address": "478 Điện Biên Phủ, Q. Thanh Khê",
          "applicability_scope": "Dine-in / Delivery",
          "evidence_reference": "tpc_coopmart_danang_registry_v1"
        }
      ],
      "total_applicable_offers": 40,
      "applicable_offer_ids": [
        "B18_JB_CANG_CAY",
        "B18_JB_HIT_HA",
        "B18_JB_MOT_MINH_AN_NGON",
        "B18_JB_CAP_DOI",
        "B18_JB_COM_GA_CAY",
        "B18_JB_MI_Y_BO_BAM",
        "B14_JB_4000935",
        "B16_JOLLIBEE_12008_1",
        "B16_JOLLIBEE_52013",
        "B16_JOLLIBEE_1810060_1",
        "B16_JOLLIBEE_1820006_1",
        "B16_JOLLIBEE_1830009_1",
        "J370_OFFER_JB_01",
        "J370_OFFER_JB_02",
        "J370_OFFER_JB_03",
        "J370_OFFER_JB_04",
        "J370_OFFER_JB_05",
        "J370_OFFER_JB_06",
        "B14_GALAXY_DANANG_TARIFF",
        "J333_HOT_02_GALAXY_U22",
        "P2O_GALAXY_MEMBER_2026",
        "P2O_GALAXY_SHOPEEPAY_SEP_2026",
        "B19_STARLIGHT_U22_WEEKDAY",
        "B19_STARLIGHT_U22_WEEKEND",
        "B19_STARLIGHT_THU_3_PHIM_VIET",
        "J370_OFFER_STARLIGHT_01",
        "J370_OFFER_STARLIGHT_02",
        "J370_OFFER_STARLIGHT_03",
        "B18_HL_SUA_LOC6",
        "B18_HL_DEN_LOC6",
        "B18_HL_PHIN_DI_SAN",
        "J370_OFFER_HL_01",
        "J370_OFFER_HL_02",
        "J370_OFFER_HL_03",
        "B19_TPC_COMBO_COT_MAM_KEO_479K",
        "B19_TPC_COMBO_COT_MAI_MAN_599K",
        "B19_TPC_BOGO_PEPSI_15L",
        "J370_OFFER_TPC_01",
        "J370_OFFER_TPC_02",
        "J370_OFFER_TPC_03"
      ],
      "applicable_offers_detailed": [
        {
          "offer_id": "B18_JB_CANG_CAY",
          "brand": "Jollibee",
          "title": "Combo Càng Cay Càng Mê",
          "branch_id": "br_jb_coopmart_dnb",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê, Đà Nẵng (giáp Q. Liên Chiểu)",
          "applicability_scope": "Dine-in / Takeaway / Delivery near campus",
          "source_url": "https://jollibee.com.vn/c-ng-cay-c-ng-me.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-08T06:55:41.478Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B18_JB_HIT_HA",
          "brand": "Jollibee",
          "title": "Combo Một Mình Hít Hà",
          "branch_id": "br_jb_coopmart_dnb",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê, Đà Nẵng (giáp Q. Liên Chiểu)",
          "applicability_scope": "Dine-in / Takeaway / Delivery near campus",
          "source_url": "https://jollibee.com.vn/m-t-minh-hit-ha.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-08T06:55:41.478Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B18_JB_MOT_MINH_AN_NGON",
          "brand": "Jollibee",
          "title": "Combo Một Mình Ăn Ngon",
          "branch_id": "br_jb_coopmart_dnb",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê, Đà Nẵng (giáp Q. Liên Chiểu)",
          "applicability_scope": "Dine-in / Takeaway / Delivery near campus",
          "source_url": "https://jollibee.com.vn/mi-y-so-t-bo-ba-m-1-mie-ng-ga-ra-n-nuo-c-ngo-t.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-08T06:55:41.478Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B18_JB_CAP_DOI",
          "brand": "Jollibee",
          "title": "Combo Cặp Đôi Ăn Ý",
          "branch_id": "br_jb_coopmart_dnb",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê, Đà Nẵng (giáp Q. Liên Chiểu)",
          "applicability_scope": "Dine-in / Takeaway / Delivery near campus",
          "source_url": "https://jollibee.com.vn/c-p-doi-an-y.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-08T06:55:41.478Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B18_JB_COM_GA_CAY",
          "brand": "Jollibee",
          "title": "Cơm Gà Giòn Cay",
          "branch_id": "br_jb_coopmart_dnb",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê, Đà Nẵng (giáp Q. Liên Chiểu)",
          "applicability_scope": "Dine-in / Takeaway / Delivery near campus",
          "source_url": "https://jollibee.com.vn/burger-com.html",
          "capture_reference": "aa14c8d86235400591451c9062669badce321056cdfa99838b74b9adbd534d09",
          "observed_timestamp": "2026-09-08T06:55:42.982Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B18_JB_MI_Y_BO_BAM",
          "brand": "Jollibee",
          "title": "Mì Ý Jolly Sốt Bò Bằm",
          "branch_id": "br_jb_coopmart_dnb",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê, Đà Nẵng (giáp Q. Liên Chiểu)",
          "applicability_scope": "Dine-in / Takeaway / Delivery near campus",
          "source_url": "https://jollibee.com.vn/mon-moi-mon-ngon.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-08T06:55:41.478Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B14_JB_4000935",
          "brand": "Jollibee",
          "title": "COMBO 179 (Cả Nhà No Nê)",
          "branch_id": "br_jb_coopmart_dnb",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê, Đà Nẵng (giáp Q. Liên Chiểu)",
          "applicability_scope": "Dine-in / Takeaway / Delivery near campus",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_JOLLIBEE_12008_1",
          "brand": "Jollibee",
          "title": "Burger Gà Giòn",
          "branch_id": "br_jb_coopmart_dnb",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê, Đà Nẵng (giáp Q. Liên Chiểu)",
          "applicability_scope": "Dine-in / Takeaway / Delivery near campus",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_JOLLIBEE_52013",
          "brand": "Jollibee",
          "title": "Combo Burger Gà Giòn 2",
          "branch_id": "br_jb_coopmart_dnb",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê, Đà Nẵng (giáp Q. Liên Chiểu)",
          "applicability_scope": "Dine-in / Takeaway / Delivery near campus",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_JOLLIBEE_1810060_1",
          "brand": "Jollibee",
          "title": "Cơm Gà Mắm Tỏi",
          "branch_id": "br_jb_coopmart_dnb",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê, Đà Nẵng (giáp Q. Liên Chiểu)",
          "applicability_scope": "Dine-in / Takeaway / Delivery near campus",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_JOLLIBEE_1820006_1",
          "brand": "Jollibee",
          "title": "Burger Tôm",
          "branch_id": "br_jb_coopmart_dnb",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê, Đà Nẵng (giáp Q. Liên Chiểu)",
          "applicability_scope": "Dine-in / Takeaway / Delivery near campus",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_JOLLIBEE_1830009_1",
          "brand": "Jollibee",
          "title": "Jolly Hotdog",
          "branch_id": "br_jb_coopmart_dnb",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê, Đà Nẵng (giáp Q. Liên Chiểu)",
          "applicability_scope": "Dine-in / Takeaway / Delivery near campus",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "J370_OFFER_JB_01",
          "brand": "Jollibee",
          "title": "Combo Càng Cay Càng Mê — 157K",
          "branch_id": "br_jb_coopmart_dnb",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê, Đà Nẵng (giáp Q. Liên Chiểu)",
          "applicability_scope": "Dine-in / Takeaway / Delivery near campus",
          "source_url": "https://jollibee.com.vn/c-ng-cay-c-ng-me.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Gọi combo trực tiếp tại quầy hoặc đặt qua hotline 1900-1533"
        },
        {
          "offer_id": "J370_OFFER_JB_02",
          "brand": "Jollibee",
          "title": "Combo Một Mình Hít Hà — 92K",
          "branch_id": "br_jb_coopmart_dnb",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê, Đà Nẵng (giáp Q. Liên Chiểu)",
          "applicability_scope": "Dine-in / Takeaway / Delivery near campus",
          "source_url": "https://jollibee.com.vn/mot-m-nh-h-t-h.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng ăn tại chỗ, mang về tại quầy"
        },
        {
          "offer_id": "J370_OFFER_JB_03",
          "brand": "Jollibee",
          "title": "Combo Một Mình Ăn Ngon — 92K",
          "branch_id": "br_jb_coopmart_dnb",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê, Đà Nẵng (giáp Q. Liên Chiểu)",
          "applicability_scope": "Dine-in / Takeaway / Delivery near campus",
          "source_url": "https://jollibee.com.vn/mot-m-nh-an-ngon.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng tại quầy cho tất cả khách hàng"
        },
        {
          "offer_id": "J370_OFFER_JB_04",
          "brand": "Jollibee",
          "title": "Combo Cặp Đôi Ăn Ý — 145K",
          "branch_id": "br_jb_coopmart_dnb",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê, Đà Nẵng (giáp Q. Liên Chiểu)",
          "applicability_scope": "Dine-in / Takeaway / Delivery near campus",
          "source_url": "https://jollibee.com.vn/cap-doi-an-y.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Combo 2 người giá tiết kiệm khi gọi tại quầy"
        },
        {
          "offer_id": "J370_OFFER_JB_05",
          "brand": "Jollibee",
          "title": "Cơm Gà Giòn Cay — Bữa Trưa Sinh Viên 45K",
          "branch_id": "br_jb_coopmart_dnb",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê, Đà Nẵng (giáp Q. Liên Chiểu)",
          "applicability_scope": "Dine-in / Takeaway / Delivery near campus",
          "source_url": "https://jollibee.com.vn/com-ga-gion-cay.html",
          "capture_reference": "aa14c8d86235400591451c9062669badce321056cdfa99838b74b9adbd534d09",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Bữa trưa giá bình dân quanh các trường đại học Đà Nẵng"
        },
        {
          "offer_id": "J370_OFFER_JB_06",
          "brand": "Jollibee",
          "title": "Mì Ý Jolly Sốt Bò Bằm — Tiết Kiệm 35K",
          "branch_id": "br_jb_coopmart_dnb",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê, Đà Nẵng (giáp Q. Liên Chiểu)",
          "applicability_scope": "Dine-in / Takeaway / Delivery near campus",
          "source_url": "https://jollibee.com.vn/mi-y-jolly.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Món ăn nhanh cứu đói sinh viên &le; 35K"
        },
        {
          "offer_id": "B14_GALAXY_DANANG_TARIFF",
          "brand": "Galaxy Cinema",
          "title": "Biểu Giá Vé Galaxy Cinema Coop Đà Nẵng",
          "branch_id": "br_galaxy_coopmart",
          "branch_address": "Tầng 3 Co.opmart, 478 Điện Biên Phủ, Q. Thanh Khê",
          "applicability_scope": "Direct box office / online app booking",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "J333_HOT_02_GALAXY_U22",
          "brand": "Galaxy Cinema",
          "title": "Vé U22 Galaxy Cinema — Từ 45.000đ",
          "branch_id": "br_galaxy_coopmart",
          "branch_address": "Tầng 3 Co.opmart, 478 Điện Biên Phủ, Q. Thanh Khê",
          "applicability_scope": "Direct box office / online app booking",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "P2O_GALAXY_MEMBER_2026",
          "brand": "Galaxy Cinema",
          "title": "Quyền Lợi Thành Viên Galaxy Cinema 2026",
          "branch_id": "br_galaxy_coopmart",
          "branch_address": "Tầng 3 Co.opmart, 478 Điện Biên Phủ, Q. Thanh Khê",
          "applicability_scope": "Direct box office / online app booking",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "P2O_GALAXY_SHOPEEPAY_SEP_2026",
          "brand": "Galaxy Cinema & ShopeePay",
          "title": "Voucher ShopeePay tại Galaxy Cinema — Tháng 09/2026",
          "branch_id": "br_galaxy_coopmart",
          "branch_address": "Tầng 3 Co.opmart, 478 Điện Biên Phủ, Q. Thanh Khê",
          "applicability_scope": "Direct box office / online app booking",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B19_STARLIGHT_U22_WEEKDAY",
          "brand": "Starlight Cinema",
          "title": "Giá vé U22 ngày thường (Thứ 2 đến Thứ 5)",
          "branch_id": "br_starlight_nguyenkim",
          "branch_address": "Tầng 3-4 TTTM Nguyễn Kim, 46 Điện Biên Phủ, Q. Thanh Khê",
          "applicability_scope": "Direct counter / Starlight app",
          "source_url": "https://starlight.vn/uu-dai/ct-u22-rap-starlight-1047.html",
          "capture_reference": "44ba5ab1fb696758a8a9edf4bc8ca590499e7e06b2fbbd4fe0f7c5fe1a124e78",
          "observed_timestamp": "2026-09-09T06:05:00.000Z",
          "validity_state": "Áp dụng Thứ 2 đến Thứ 5 hàng tuần"
        },
        {
          "offer_id": "B19_STARLIGHT_U22_WEEKEND",
          "brand": "Starlight Cinema",
          "title": "Giá vé U22 cuối tuần Đà Nẵng (Thứ 6 đến Chủ Nhật)",
          "branch_id": "br_starlight_nguyenkim",
          "branch_address": "Tầng 3-4 TTTM Nguyễn Kim, 46 Điện Biên Phủ, Q. Thanh Khê",
          "applicability_scope": "Direct counter / Starlight app",
          "source_url": "https://starlight.vn/uu-dai/ct-u22-rap-starlight-1047.html",
          "capture_reference": "44ba5ab1fb696758a8a9edf4bc8ca590499e7e06b2fbbd4fe0f7c5fe1a124e78",
          "observed_timestamp": "2026-09-09T06:05:00.000Z",
          "validity_state": "Áp dụng Thứ 6, Thứ 7, Chủ Nhật hàng tuần"
        },
        {
          "offer_id": "B19_STARLIGHT_THU_3_PHIM_VIET",
          "brand": "Starlight Cinema",
          "title": "Thứ 3 Phim Việt — Đồng giá 45k",
          "branch_id": "br_starlight_nguyenkim",
          "branch_address": "Tầng 3-4 TTTM Nguyễn Kim, 46 Điện Biên Phủ, Q. Thanh Khê",
          "applicability_scope": "Direct counter / Starlight app",
          "source_url": "https://starlight.vn/uu-dai/thu-3-phim-viet-1046.html",
          "capture_reference": "bc08ab274cebf2bb4cfa8544820800d5c71036002a10950a185a748dcb81bda6",
          "observed_timestamp": "2026-09-09T06:05:00.000Z",
          "validity_state": "Thứ 3 hàng tuần"
        },
        {
          "offer_id": "J370_OFFER_STARLIGHT_01",
          "brand": "Starlight Cinema",
          "title": "Giá vé U22 ngày thường (Thứ 2 đến Thứ 5)",
          "branch_id": "br_starlight_nguyenkim",
          "branch_address": "Tầng 3-4 TTTM Nguyễn Kim, 46 Điện Biên Phủ, Q. Thanh Khê",
          "applicability_scope": "Direct counter / Starlight app",
          "source_url": "https://starlight.vn/uu-dai/ct-u22-rap-starlight-1047.html",
          "capture_reference": "44ba5ab1fb696758a8a9edf4bc8ca590499e7e06b2fbbd4fe0f7c5fe1a124e78",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng Thứ 2 - Thứ 5 hàng tuần cho thành viên U22 xuất trình CCCD/thẻ HSSV tại quầy"
        },
        {
          "offer_id": "J370_OFFER_STARLIGHT_02",
          "brand": "Starlight Cinema",
          "title": "Giá vé U22 cuối tuần (Thứ 6, Thứ 7, Chủ Nhật)",
          "branch_id": "br_starlight_nguyenkim",
          "branch_address": "Tầng 3-4 TTTM Nguyễn Kim, 46 Điện Biên Phủ, Q. Thanh Khê",
          "applicability_scope": "Direct counter / Starlight app",
          "source_url": "https://starlight.vn/uu-dai/ct-u22-rap-starlight-1047.html",
          "capture_reference": "44ba5ab1fb696758a8a9edf4bc8ca590499e7e06b2fbbd4fe0f7c5fe1a124e78",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng Thứ 6, Thứ 7, Chủ Nhật cho thành viên U22 tại quầy Starlight Đà Nẵng"
        },
        {
          "offer_id": "J370_OFFER_STARLIGHT_03",
          "brand": "Starlight Cinema",
          "title": "Thứ 3 Phim Việt — Đồng giá 45K",
          "branch_id": "br_starlight_nguyenkim",
          "branch_address": "Tầng 3-4 TTTM Nguyễn Kim, 46 Điện Biên Phủ, Q. Thanh Khê",
          "applicability_scope": "Direct counter / Starlight app",
          "source_url": "https://starlight.vn/uu-dai/thu-3-phim-viet-1046.html",
          "capture_reference": "bc08ab274cebf2bb4cfa8544820800d5c71036002a10950a185a748dcb81bda6",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng toàn bộ suất chiếu phim Việt Nam trong ngày Thứ 3 tại quầy"
        },
        {
          "offer_id": "B18_HL_SUA_LOC6",
          "brand": "Highlands Coffee",
          "title": "Cà phê Sữa Đá Lon Highlands (Lốc 6 lon)",
          "branch_id": "br_hl_dienbienphu_nlb",
          "branch_address": "478 Điện Biên Phủ & 239 Nguyễn Lương Bằng, Q. Liên Chiểu",
          "applicability_scope": "In-store counter / Packaged 6-pack",
          "source_url": "https://shop.highlandscoffee.com.vn/collections",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-08T06:55:43.445Z",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B18_HL_DEN_LOC6",
          "brand": "Highlands Coffee",
          "title": "Cà phê Đen Đá Lon Highlands (Lốc 6 lon)",
          "branch_id": "br_hl_dienbienphu_nlb",
          "branch_address": "478 Điện Biên Phủ & 239 Nguyễn Lương Bằng, Q. Liên Chiểu",
          "applicability_scope": "In-store counter / Packaged 6-pack",
          "source_url": "https://shop.highlandscoffee.com.vn/collections",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-08T06:55:43.445Z",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B18_HL_PHIN_DI_SAN",
          "brand": "Highlands Coffee",
          "title": "Cà phê Phin Di Sản Highlands (Gói 200g)",
          "branch_id": "br_hl_dienbienphu_nlb",
          "branch_address": "478 Điện Biên Phủ & 239 Nguyễn Lương Bằng, Q. Liên Chiểu",
          "applicability_scope": "In-store counter / Packaged 6-pack",
          "source_url": "https://shop.highlandscoffee.com.vn/collections",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-08T06:55:43.445Z",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "J370_OFFER_HL_01",
          "brand": "Highlands Coffee",
          "title": "Cà phê Sữa Đá Lon Highlands (Lốc 6 lon)",
          "branch_id": "br_hl_dienbienphu_nlb",
          "branch_address": "478 Điện Biên Phủ & 239 Nguyễn Lương Bằng, Q. Liên Chiểu",
          "applicability_scope": "In-store counter / Packaged 6-pack",
          "source_url": "https://highlandscoffee.com.vn/vn/ca-phe-lon.html",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Giá niêm yết tại các cửa hàng và kênh bán lẻ chính hãng tại Đà Nẵng"
        },
        {
          "offer_id": "J370_OFFER_HL_02",
          "brand": "Highlands Coffee",
          "title": "Cà phê Đen Đá Lon Highlands (Lốc 6 lon)",
          "branch_id": "br_hl_dienbienphu_nlb",
          "branch_address": "478 Điện Biên Phủ & 239 Nguyễn Lương Bằng, Q. Liên Chiểu",
          "applicability_scope": "In-store counter / Packaged 6-pack",
          "source_url": "https://highlandscoffee.com.vn/vn/ca-phe-lon.html",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Mua tại quầy hoặc siêu thị tiện lợi đối tác tại Đà Nẵng"
        },
        {
          "offer_id": "J370_OFFER_HL_03",
          "brand": "Highlands Coffee",
          "title": "Cà phê Phin Di Sản Highlands (Gói 200g)",
          "branch_id": "br_hl_dienbienphu_nlb",
          "branch_address": "478 Điện Biên Phủ & 239 Nguyễn Lương Bằng, Q. Liên Chiểu",
          "applicability_scope": "In-store counter / Packaged 6-pack",
          "source_url": "https://highlandscoffee.com.vn/vn/ca-phe-dong-goi.html",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Bán tại quầy Highlands Coffee Đà Nẵng"
        },
        {
          "offer_id": "B19_TPC_COMBO_COT_MAM_KEO_479K",
          "brand": "The Pizza Company",
          "title": "Combo \"Cốt\" Mắm Kẹo",
          "branch_id": "br_tpc_coopmart",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê",
          "applicability_scope": "Dine-in / Delivery",
          "source_url": "https://thepizzacompany.vn/combo-cot-mam-keo",
          "capture_reference": "4174e8b59ef9639164e551698e838737fd48a99ea316ff728272ce0a26f6a6dc",
          "observed_timestamp": "2026-09-09T06:05:00.000Z",
          "validity_state": "Áp dụng thường nhật 2026"
        },
        {
          "offer_id": "B19_TPC_COMBO_COT_MAI_MAN_599K",
          "brand": "The Pizza Company",
          "title": "Combo \"Cốt\" Mãi Mặn",
          "branch_id": "br_tpc_coopmart",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê",
          "applicability_scope": "Dine-in / Delivery",
          "source_url": "https://thepizzacompany.vn/combo-cot-mai-man",
          "capture_reference": "de2f01f7e0b8ea62e75e1b925c066f531f25e872ec968c2d9a2f6156f8995aec",
          "observed_timestamp": "2026-09-09T06:05:00.000Z",
          "validity_state": "Áp dụng thường nhật 2026"
        },
        {
          "offer_id": "B19_TPC_BOGO_PEPSI_15L",
          "brand": "The Pizza Company",
          "title": "Mua 1 Tặng 1 Nước Pepsi 1.5L",
          "branch_id": "br_tpc_coopmart",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê",
          "applicability_scope": "Dine-in / Delivery",
          "source_url": "https://thepizzacompany.vn/mua-1-tang-1-nuoc",
          "capture_reference": "be4bf6501f351b182ef64b12555f83298b3081c892dcbf4212086637d6b07065",
          "observed_timestamp": "2026-09-09T06:05:00.000Z",
          "validity_state": "Áp dụng thường nhật 2026"
        },
        {
          "offer_id": "J370_OFFER_TPC_01",
          "brand": "The Pizza Company",
          "title": "Combo Cột Mầm Kẹo 479K — Tiết Kiệm Nhóm",
          "branch_id": "br_tpc_coopmart",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê",
          "applicability_scope": "Dine-in / Delivery",
          "source_url": "https://thepizzacompany.vn/combo-cot-mam-keo",
          "capture_reference": "4174e8b59ef9639164e551698e838737fd48a99ea316ff728272ce0a26f6a6dc",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng ăn tại chỗ, mua mang về và giao hàng qua hotline/website TPC Đà Nẵng"
        },
        {
          "offer_id": "J370_OFFER_TPC_02",
          "brand": "The Pizza Company",
          "title": "Combo Cột Mãi Mặn 599K — Tiệc Nhóm Sinh Viên",
          "branch_id": "br_tpc_coopmart",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê",
          "applicability_scope": "Dine-in / Delivery",
          "source_url": "https://thepizzacompany.vn/combo-cot-mai-man",
          "capture_reference": "de2f01f7e0b8ea62e75e1b925c066f531f25e872ec968c2d9a2f6156f8995aec",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng ăn tại chỗ và mang về tại các chi nhánh TPC Đà Nẵng"
        },
        {
          "offer_id": "J370_OFFER_TPC_03",
          "brand": "The Pizza Company",
          "title": "Mua 1 Tặng 1 Nước Pepsi 1.5L khi mua Pizza Size M/L",
          "branch_id": "br_tpc_coopmart",
          "branch_address": "478 Điện Biên Phủ, Q. Thanh Khê",
          "applicability_scope": "Dine-in / Delivery",
          "source_url": "https://thepizzacompany.vn/mua-1-tang-1-nuoc",
          "capture_reference": "be4bf6501f351b182ef64b12555f83298b3081c892dcbf4212086637d6b07065",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng kèm đơn mua Pizza Size M hoặc L tại website/app hoặc mang về tại quầy"
        }
      ]
    },
    {
      "cluster_id": "cluster_due",
      "name": "Kinh Tế DUE",
      "short_label": "🏖️ Kinh Tế DUE",
      "area_descriptor": "Ngũ Hành Sơn / Bắc Mỹ An / Lotte Mart / Cầu Tiên Sơn",
      "target_universities": [
        "Đại học Kinh Tế Đà Nẵng - DUE (71 Ngũ Hành Sơn)",
        "Đại học FPT Đà Nẵng (Khu đô thị FPT City, Ngũ Hành Sơn)",
        "Đại học Y Dược Kỹ Thuật (Ngũ Hành Sơn)"
      ],
      "verified_branches": [
        {
          "branch_id": "br_pl_lotte_mart",
          "brand": "Phúc Long",
          "branch_name": "Phúc Long Lotte Mart Đà Nẵng",
          "address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam, Q. Hải Châu (cạnh cầu Tiên Sơn)",
          "applicability_scope": "Dine-in / Takeaway counter",
          "evidence_reference": "phuclong_stores_api_da_nang"
        },
        {
          "branch_id": "br_metiz_helio",
          "brand": "Metiz Cinema",
          "branch_name": "Metiz Cinema Helio Center",
          "address": "Tầng 1 Helio Center, Đường 2/9, Q. Hải Châu (cạnh cầu Tiên Sơn)",
          "applicability_scope": "U22 Counter ticket",
          "evidence_reference": "metiz_danang_u22_tariff_v1"
        },
        {
          "branch_id": "br_hl_lotte_anthuong",
          "brand": "Highlands Coffee",
          "branch_name": "Highlands Coffee Lotte Mart & An Thượng",
          "address": "Lotte Mart Đà Nẵng & Trần Bạch Đằng, Q. Ngũ Hành Sơn",
          "applicability_scope": "Dine-in / Takeaway",
          "evidence_reference": "highlands_da_nang_registry_v1"
        },
        {
          "branch_id": "br_jb_lotte_mart",
          "brand": "Jollibee",
          "branch_name": "Jollibee Lotte Mart Đà Nẵng",
          "address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam",
          "applicability_scope": "Counter / Dine-in",
          "evidence_reference": "jollibee_danang_stores_registry_v1"
        }
      ],
      "total_applicable_offers": 34,
      "applicable_offer_ids": [
        "B18_PL_HONEY_M",
        "B18_PL_HONEY_L",
        "B18_PL_DAO_HONEY_M",
        "B18_PL_LOCO_VIBE",
        "B16_PHUCLONG_HONEY_P1",
        "B16_PHUCLONG_LOCO_P1",
        "B14_PLONG_MEMBER_BENEFITS",
        "J370_OFFER_PL_01",
        "J370_OFFER_PL_02",
        "B14_METIZ_U22_2D",
        "B18_HL_SUA_LOC6",
        "B18_HL_DEN_LOC6",
        "B18_HL_PHIN_DI_SAN",
        "J370_OFFER_HL_01",
        "J370_OFFER_HL_02",
        "J370_OFFER_HL_03",
        "B18_JB_CANG_CAY",
        "B18_JB_HIT_HA",
        "B18_JB_MOT_MINH_AN_NGON",
        "B18_JB_CAP_DOI",
        "B18_JB_COM_GA_CAY",
        "B18_JB_MI_Y_BO_BAM",
        "B14_JB_4000935",
        "B16_JOLLIBEE_12008_1",
        "B16_JOLLIBEE_52013",
        "B16_JOLLIBEE_1810060_1",
        "B16_JOLLIBEE_1820006_1",
        "B16_JOLLIBEE_1830009_1",
        "J370_OFFER_JB_01",
        "J370_OFFER_JB_02",
        "J370_OFFER_JB_03",
        "J370_OFFER_JB_04",
        "J370_OFFER_JB_05",
        "J370_OFFER_JB_06"
      ],
      "applicable_offers_detailed": [
        {
          "offer_id": "B18_PL_HONEY_M",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Trà Ô Long Mật Ong (Size M)",
          "branch_id": "br_pl_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam, Q. Hải Châu (cạnh cầu Tiên Sơn)",
          "applicability_scope": "Dine-in / Takeaway counter",
          "source_url": "https://phuclong.com.vn/khuyen-mai/bo-suu-tap-huong-mat-uom-sac-20260227022356",
          "capture_reference": "c08e5a585f9639671df0b4e6de0f0acdf5474956f3c074dcd68b254738f17450",
          "observed_timestamp": "2026-09-08T06:55:43.147Z",
          "validity_state": "SEASONAL_OFFER_ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B18_PL_HONEY_L",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Trà Ô Long Mật Ong (Size L)",
          "branch_id": "br_pl_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam, Q. Hải Châu (cạnh cầu Tiên Sơn)",
          "applicability_scope": "Dine-in / Takeaway counter",
          "source_url": "https://phuclong.com.vn/khuyen-mai/bo-suu-tap-huong-mat-uom-sac-20260227022356",
          "capture_reference": "c08e5a585f9639671df0b4e6de0f0acdf5474956f3c074dcd68b254738f17450",
          "observed_timestamp": "2026-09-08T06:55:43.147Z",
          "validity_state": "SEASONAL_OFFER_ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B18_PL_DAO_HONEY_M",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Trà Đào Mật Ong (Size M)",
          "branch_id": "br_pl_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam, Q. Hải Châu (cạnh cầu Tiên Sơn)",
          "applicability_scope": "Dine-in / Takeaway counter",
          "source_url": "https://phuclong.com.vn/khuyen-mai/bo-suu-tap-huong-mat-uom-sac-20260227022356",
          "capture_reference": "c08e5a585f9639671df0b4e6de0f0acdf5474956f3c074dcd68b254738f17450",
          "observed_timestamp": "2026-09-08T06:55:43.147Z",
          "validity_state": "SEASONAL_OFFER_ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B18_PL_LOCO_VIBE",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Combo Bật Chất Hè Loco Vibe",
          "branch_id": "br_pl_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam, Q. Hải Châu (cạnh cầu Tiên Sơn)",
          "applicability_scope": "Dine-in / Takeaway counter",
          "source_url": "https://phuclong.com.vn/khuyen-mai/bat-chat-he-len-do-dung-dieu-lo-co-vibe-cung-phuc-long-20260713035100",
          "capture_reference": "8d90a4c9d31d3b393035140cdb072ab75316872f3ccfe8712387da476dc59c01",
          "observed_timestamp": "2026-09-08T06:55:43.265Z",
          "validity_state": "SEASONAL_OFFER_ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_PHUCLONG_HONEY_P1",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Combo 1 bánh + 1 nước Hương Mật Ươm Sắc",
          "branch_id": "br_pl_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam, Q. Hải Châu (cạnh cầu Tiên Sơn)",
          "applicability_scope": "Dine-in / Takeaway counter",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_PHUCLONG_LOCO_P1",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Combo Lô Cồ Vibe túi lưới và nước size L",
          "branch_id": "br_pl_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam, Q. Hải Châu (cạnh cầu Tiên Sơn)",
          "applicability_scope": "Dine-in / Takeaway counter",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B14_PLONG_MEMBER_BENEFITS",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Chương Trình Hội Viên Phúc Long: Tích Điểm & Đổi Quà",
          "branch_id": "br_pl_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam, Q. Hải Châu (cạnh cầu Tiên Sơn)",
          "applicability_scope": "Dine-in / Takeaway counter",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "J370_OFFER_PL_01",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Trà Ô Long Mật Ong (Size M) — 50K",
          "branch_id": "br_pl_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam, Q. Hải Châu (cạnh cầu Tiên Sơn)",
          "applicability_scope": "Dine-in / Takeaway counter",
          "source_url": "https://phuclong.com.vn/category/tra-phuc-long",
          "capture_reference": "c08e5a585f9639671df0b4e6de0f0acdf5474956f3c074dcd68b254738f17450",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Giá niêm yết tại quầy cho tất cả khách hàng"
        },
        {
          "offer_id": "J370_OFFER_PL_02",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Combo Bật Chất Hè Loco Vibe — Tiết Kiệm 65K",
          "branch_id": "br_pl_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam, Q. Hải Châu (cạnh cầu Tiên Sơn)",
          "applicability_scope": "Dine-in / Takeaway counter",
          "source_url": "https://phuclong.com.vn/category/loco-vibe",
          "capture_reference": "8d90a4c9d31d3b393035140cdb072ab75316872f3ccfe8712387da476dc59c01",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng tại quầy theo chương trình mùa vụ"
        },
        {
          "offer_id": "B14_METIZ_U22_2D",
          "brand": "Metiz Cinema Đà Nẵng",
          "title": "Khuyến Mãi Giá Vé U22 (2D chỉ 55.000đ)",
          "branch_id": "br_metiz_helio",
          "branch_address": "Tầng 1 Helio Center, Đường 2/9, Q. Hải Châu (cạnh cầu Tiên Sơn)",
          "applicability_scope": "U22 Counter ticket",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B18_HL_SUA_LOC6",
          "brand": "Highlands Coffee",
          "title": "Cà phê Sữa Đá Lon Highlands (Lốc 6 lon)",
          "branch_id": "br_hl_lotte_anthuong",
          "branch_address": "Lotte Mart Đà Nẵng & Trần Bạch Đằng, Q. Ngũ Hành Sơn",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://shop.highlandscoffee.com.vn/collections",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-08T06:55:43.445Z",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B18_HL_DEN_LOC6",
          "brand": "Highlands Coffee",
          "title": "Cà phê Đen Đá Lon Highlands (Lốc 6 lon)",
          "branch_id": "br_hl_lotte_anthuong",
          "branch_address": "Lotte Mart Đà Nẵng & Trần Bạch Đằng, Q. Ngũ Hành Sơn",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://shop.highlandscoffee.com.vn/collections",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-08T06:55:43.445Z",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B18_HL_PHIN_DI_SAN",
          "brand": "Highlands Coffee",
          "title": "Cà phê Phin Di Sản Highlands (Gói 200g)",
          "branch_id": "br_hl_lotte_anthuong",
          "branch_address": "Lotte Mart Đà Nẵng & Trần Bạch Đằng, Q. Ngũ Hành Sơn",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://shop.highlandscoffee.com.vn/collections",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-08T06:55:43.445Z",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "J370_OFFER_HL_01",
          "brand": "Highlands Coffee",
          "title": "Cà phê Sữa Đá Lon Highlands (Lốc 6 lon)",
          "branch_id": "br_hl_lotte_anthuong",
          "branch_address": "Lotte Mart Đà Nẵng & Trần Bạch Đằng, Q. Ngũ Hành Sơn",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://highlandscoffee.com.vn/vn/ca-phe-lon.html",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Giá niêm yết tại các cửa hàng và kênh bán lẻ chính hãng tại Đà Nẵng"
        },
        {
          "offer_id": "J370_OFFER_HL_02",
          "brand": "Highlands Coffee",
          "title": "Cà phê Đen Đá Lon Highlands (Lốc 6 lon)",
          "branch_id": "br_hl_lotte_anthuong",
          "branch_address": "Lotte Mart Đà Nẵng & Trần Bạch Đằng, Q. Ngũ Hành Sơn",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://highlandscoffee.com.vn/vn/ca-phe-lon.html",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Mua tại quầy hoặc siêu thị tiện lợi đối tác tại Đà Nẵng"
        },
        {
          "offer_id": "J370_OFFER_HL_03",
          "brand": "Highlands Coffee",
          "title": "Cà phê Phin Di Sản Highlands (Gói 200g)",
          "branch_id": "br_hl_lotte_anthuong",
          "branch_address": "Lotte Mart Đà Nẵng & Trần Bạch Đằng, Q. Ngũ Hành Sơn",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://highlandscoffee.com.vn/vn/ca-phe-dong-goi.html",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Bán tại quầy Highlands Coffee Đà Nẵng"
        },
        {
          "offer_id": "B18_JB_CANG_CAY",
          "brand": "Jollibee",
          "title": "Combo Càng Cay Càng Mê",
          "branch_id": "br_jb_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/c-ng-cay-c-ng-me.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-08T06:55:41.478Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B18_JB_HIT_HA",
          "brand": "Jollibee",
          "title": "Combo Một Mình Hít Hà",
          "branch_id": "br_jb_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/m-t-minh-hit-ha.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-08T06:55:41.478Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B18_JB_MOT_MINH_AN_NGON",
          "brand": "Jollibee",
          "title": "Combo Một Mình Ăn Ngon",
          "branch_id": "br_jb_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/mi-y-so-t-bo-ba-m-1-mie-ng-ga-ra-n-nuo-c-ngo-t.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-08T06:55:41.478Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B18_JB_CAP_DOI",
          "brand": "Jollibee",
          "title": "Combo Cặp Đôi Ăn Ý",
          "branch_id": "br_jb_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/c-p-doi-an-y.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-08T06:55:41.478Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B18_JB_COM_GA_CAY",
          "brand": "Jollibee",
          "title": "Cơm Gà Giòn Cay",
          "branch_id": "br_jb_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/burger-com.html",
          "capture_reference": "aa14c8d86235400591451c9062669badce321056cdfa99838b74b9adbd534d09",
          "observed_timestamp": "2026-09-08T06:55:42.982Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B18_JB_MI_Y_BO_BAM",
          "brand": "Jollibee",
          "title": "Mì Ý Jolly Sốt Bò Bằm",
          "branch_id": "br_jb_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/mon-moi-mon-ngon.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-08T06:55:41.478Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B14_JB_4000935",
          "brand": "Jollibee",
          "title": "COMBO 179 (Cả Nhà No Nê)",
          "branch_id": "br_jb_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_JOLLIBEE_12008_1",
          "brand": "Jollibee",
          "title": "Burger Gà Giòn",
          "branch_id": "br_jb_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_JOLLIBEE_52013",
          "brand": "Jollibee",
          "title": "Combo Burger Gà Giòn 2",
          "branch_id": "br_jb_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_JOLLIBEE_1810060_1",
          "brand": "Jollibee",
          "title": "Cơm Gà Mắm Tỏi",
          "branch_id": "br_jb_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_JOLLIBEE_1820006_1",
          "brand": "Jollibee",
          "title": "Burger Tôm",
          "branch_id": "br_jb_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_JOLLIBEE_1830009_1",
          "brand": "Jollibee",
          "title": "Jolly Hotdog",
          "branch_id": "br_jb_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "J370_OFFER_JB_01",
          "brand": "Jollibee",
          "title": "Combo Càng Cay Càng Mê — 157K",
          "branch_id": "br_jb_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/c-ng-cay-c-ng-me.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Gọi combo trực tiếp tại quầy hoặc đặt qua hotline 1900-1533"
        },
        {
          "offer_id": "J370_OFFER_JB_02",
          "brand": "Jollibee",
          "title": "Combo Một Mình Hít Hà — 92K",
          "branch_id": "br_jb_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/mot-m-nh-h-t-h.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng ăn tại chỗ, mang về tại quầy"
        },
        {
          "offer_id": "J370_OFFER_JB_03",
          "brand": "Jollibee",
          "title": "Combo Một Mình Ăn Ngon — 92K",
          "branch_id": "br_jb_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/mot-m-nh-an-ngon.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng tại quầy cho tất cả khách hàng"
        },
        {
          "offer_id": "J370_OFFER_JB_04",
          "brand": "Jollibee",
          "title": "Combo Cặp Đôi Ăn Ý — 145K",
          "branch_id": "br_jb_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/cap-doi-an-y.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Combo 2 người giá tiết kiệm khi gọi tại quầy"
        },
        {
          "offer_id": "J370_OFFER_JB_05",
          "brand": "Jollibee",
          "title": "Cơm Gà Giòn Cay — Bữa Trưa Sinh Viên 45K",
          "branch_id": "br_jb_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/com-ga-gion-cay.html",
          "capture_reference": "aa14c8d86235400591451c9062669badce321056cdfa99838b74b9adbd534d09",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Bữa trưa giá bình dân quanh các trường đại học Đà Nẵng"
        },
        {
          "offer_id": "J370_OFFER_JB_06",
          "brand": "Jollibee",
          "title": "Mì Ý Jolly Sốt Bò Bằm — Tiết Kiệm 35K",
          "branch_id": "br_jb_lotte_mart",
          "branch_address": "Tầng 1 Lotte Mart Đà Nẵng, 06 Nại Nam",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/mi-y-jolly.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Món ăn nhanh cứu đói sinh viên &le; 35K"
        }
      ]
    },
    {
      "cluster_id": "cluster_dtu_hc",
      "name": "Duy Tân / Hải Châu",
      "short_label": "🏢 Duy Tân / Hải Châu",
      "area_descriptor": "Hải Châu / Trung tâm / Nguyễn Văn Linh / Bạch Đằng",
      "target_universities": [
        "Đại học Duy Tân (K7/25 Quang Trung & 254 Nguyễn Văn Linh)",
        "Đại học Ngoại Ngữ Đà Nẵng (131 Lương Nhữ Hộc)",
        "Đại học Kỹ thuật Y Dược (99 Hùng Vương)",
        "Đại học Mở Hà Nội tại Đà Nẵng"
      ],
      "verified_branches": [
        {
          "branch_id": "br_cgv_vincom_dnb",
          "brand": "CGV Cinemas",
          "branch_name": "CGV Vincom Plaza Đà Nẵng",
          "address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà (cạnh cầu Sông Hàn)",
          "applicability_scope": "Box office / App",
          "evidence_reference": "cgv_danang_tariff_v1"
        },
        {
          "branch_id": "br_jb_pasteur_nvl",
          "brand": "Jollibee",
          "branch_name": "Jollibee Pasteur & Nguyễn Văn Linh",
          "address": "Pasteur & 254 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Takeaway",
          "evidence_reference": "jollibee_danang_stores_registry_v1"
        },
        {
          "branch_id": "br_hl_vinhtrung_nvl",
          "brand": "Highlands Coffee",
          "branch_name": "Highlands Vĩnh Trung Plaza & Nguyễn Văn Linh",
          "address": "255-257 Hùng Vương & 115 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "In-store counter",
          "evidence_reference": "highlands_da_nang_registry_v1"
        },
        {
          "branch_id": "br_pl_nvl_bachdang",
          "brand": "Phúc Long",
          "branch_name": "Phúc Long Nguyễn Văn Linh & Bạch Đằng",
          "address": "59-61 Nguyễn Văn Linh & 240 Bạch Đằng, Q. Hải Châu",
          "applicability_scope": "Counter / Takeaway",
          "evidence_reference": "phuclong_stores_api_da_nang"
        },
        {
          "branch_id": "br_metiz_helio",
          "brand": "Metiz Cinema",
          "branch_name": "Metiz Cinema Helio Center",
          "address": "Tầng 1 Helio Center, Đường 2/9, Q. Hải Châu (cạnh cầu Tiên Sơn)",
          "applicability_scope": "U22 Counter ticket",
          "evidence_reference": "metiz_danang_u22_tariff_v1"
        },
        {
          "branch_id": "br_gongcha_nvl",
          "brand": "Gong Cha",
          "branch_name": "Gong Cha Nguyễn Văn Linh",
          "address": "29 Nguyễn Văn Linh, P. Nam Dương, Q. Hải Châu",
          "applicability_scope": "Member app / In-store counter",
          "evidence_reference": "gongcha_vn_member_policy_v1"
        },
        {
          "branch_id": "br_katinat_bachdang",
          "brand": "Katinat",
          "branch_name": "Katinat Saigon Kafe Bạch Đằng",
          "address": "54 Bạch Đằng, P. Hải Châu 1, Q. Hải Châu",
          "applicability_scope": "Katinat App Loyalty / Counter",
          "evidence_reference": "katinat_kclub_loyalty_v1"
        },
        {
          "branch_id": "br_tpc_pasteur_nvl",
          "brand": "The Pizza Company",
          "branch_name": "The Pizza Company Pasteur & Nguyễn Văn Linh",
          "address": "Pasteur & Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Delivery",
          "evidence_reference": "the_pizza_company_da_nang_registry_v1"
        },
        {
          "branch_id": "br_popeyes_nuithanh",
          "brand": "Popeyes",
          "branch_name": "Popeyes Núi Thành Đà Nẵng",
          "address": "179 Núi Thành, P. Hòa Cường Bắc, Q. Hải Châu",
          "applicability_scope": "Showroom Dine-in / Takeaway",
          "evidence_reference": "popeyes_stores_api_da_nang"
        }
      ],
      "total_applicable_offers": 55,
      "applicable_offer_ids": [
        "B18_CGV_NGAY_DOI",
        "B18_CGV_BIRTHDAY_GIFT",
        "J370_OFFER_CGV_01",
        "J370_OFFER_CGV_02",
        "B18_JB_CANG_CAY",
        "B18_JB_HIT_HA",
        "B18_JB_MOT_MINH_AN_NGON",
        "B18_JB_CAP_DOI",
        "B18_JB_COM_GA_CAY",
        "B18_JB_MI_Y_BO_BAM",
        "B14_JB_4000935",
        "B16_JOLLIBEE_12008_1",
        "B16_JOLLIBEE_52013",
        "B16_JOLLIBEE_1810060_1",
        "B16_JOLLIBEE_1820006_1",
        "B16_JOLLIBEE_1830009_1",
        "J370_OFFER_JB_01",
        "J370_OFFER_JB_02",
        "J370_OFFER_JB_03",
        "J370_OFFER_JB_04",
        "J370_OFFER_JB_05",
        "J370_OFFER_JB_06",
        "B18_HL_SUA_LOC6",
        "B18_HL_DEN_LOC6",
        "B18_HL_PHIN_DI_SAN",
        "J370_OFFER_HL_01",
        "J370_OFFER_HL_02",
        "J370_OFFER_HL_03",
        "B18_PL_HONEY_M",
        "B18_PL_HONEY_L",
        "B18_PL_DAO_HONEY_M",
        "B18_PL_LOCO_VIBE",
        "B16_PHUCLONG_HONEY_P1",
        "B16_PHUCLONG_LOCO_P1",
        "B14_PLONG_MEMBER_BENEFITS",
        "J370_OFFER_PL_01",
        "J370_OFFER_PL_02",
        "B14_METIZ_U22_2D",
        "B19_GONGCHA_MEMBER_POLICY",
        "J370_OFFER_GONGCHA_01",
        "B19_KATINAT_APP_LOYALTY",
        "J370_OFFER_KATINAT_01",
        "B19_TPC_COMBO_COT_MAM_KEO_479K",
        "B19_TPC_COMBO_COT_MAI_MAN_599K",
        "B19_TPC_BOGO_PEPSI_15L",
        "J370_OFFER_TPC_01",
        "J370_OFFER_TPC_02",
        "J370_OFFER_TPC_03",
        "B19_POPEYES_CORE_89K",
        "B19_POPEYES_DISCOVERY_001",
        "B19_POPEYES_BOGO_DELI_99K",
        "B19_POPEYES_BO_DOI_145K",
        "J370_OFFER_POPEYES_01",
        "J370_OFFER_POPEYES_02",
        "J370_OFFER_POPEYES_03"
      ],
      "applicable_offers_detailed": [
        {
          "offer_id": "B18_CGV_NGAY_DOI",
          "brand": "CGV Cinemas Đà Nẵng",
          "title": "CGV Ngày Đôi — Vé 2D Đồng Giá Ưu Đãi",
          "branch_id": "br_cgv_vincom_dnb",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà (cạnh cầu Sông Hàn)",
          "applicability_scope": "Box office / App",
          "source_url": "https://www.cgv.vn/default/newsoffer/cgv-ngay-doi/",
          "capture_reference": "21a050f22a436fc08de30f6b75ae9a181be5681504859504ea57239f832d31f0",
          "observed_timestamp": "2026-09-08T06:55:43.615Z",
          "validity_state": "ACTIVE_SEPTEMBER_2026__MONTHLY_EVENT"
        },
        {
          "offer_id": "B18_CGV_BIRTHDAY_GIFT",
          "brand": "CGV Cinemas Đà Nẵng",
          "title": "Quà Tặng Sinh Nhật Thành Viên CGV (Bắp Nước Miễn Phí)",
          "branch_id": "br_cgv_vincom_dnb",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà (cạnh cầu Sông Hàn)",
          "applicability_scope": "Box office / App",
          "source_url": "https://www.cgv.vn/default/newsoffer/birthday-promo/",
          "capture_reference": "b507208ba1d5315f1ee53e64611f370021171fcf1a145570f8e6e7f1fbe214c0",
          "observed_timestamp": "2026-09-08T06:55:43.615Z",
          "validity_state": "ACTIVE_SEPTEMBER_2026__MEMBER_BIRTHDAY_MONTH"
        },
        {
          "offer_id": "J370_OFFER_CGV_01",
          "brand": "CGV Cinemas Đà Nẵng",
          "title": "CGV Ngày Đôi — Vé 2D Đồng Giá Ưu Đãi",
          "branch_id": "br_cgv_vincom_dnb",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà (cạnh cầu Sông Hàn)",
          "applicability_scope": "Box office / App",
          "source_url": "https://www.cgv.vn/default/movies/offers/ngay-doi",
          "capture_reference": "21a050f22a436fc08de30f6b75ae9a181be5681504859504ea57239f832d31f0",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng cho thành viên đặt vé trên app/website CGV hoặc tại quầy CGV Đà Nẵng"
        },
        {
          "offer_id": "J370_OFFER_CGV_02",
          "brand": "CGV Cinemas Đà Nẵng",
          "title": "Quà Tặng Sinh Nhật Thành Viên CGV — Bắp Nước Miễn Phí",
          "branch_id": "br_cgv_vincom_dnb",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà (cạnh cầu Sông Hàn)",
          "applicability_scope": "Box office / App",
          "source_url": "https://www.cgv.vn/default/movies/offers/birthday",
          "capture_reference": "b507208ba1d5315f1ee53e64611f370021171fcf1a145570f8e6e7f1fbe214c0",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Xuất trình thẻ thành viên hoặc app CGV tại quầy bắp nước trong tháng sinh nhật"
        },
        {
          "offer_id": "B18_JB_CANG_CAY",
          "brand": "Jollibee",
          "title": "Combo Càng Cay Càng Mê",
          "branch_id": "br_jb_pasteur_nvl",
          "branch_address": "Pasteur & 254 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://jollibee.com.vn/c-ng-cay-c-ng-me.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-08T06:55:41.478Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B18_JB_HIT_HA",
          "brand": "Jollibee",
          "title": "Combo Một Mình Hít Hà",
          "branch_id": "br_jb_pasteur_nvl",
          "branch_address": "Pasteur & 254 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://jollibee.com.vn/m-t-minh-hit-ha.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-08T06:55:41.478Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B18_JB_MOT_MINH_AN_NGON",
          "brand": "Jollibee",
          "title": "Combo Một Mình Ăn Ngon",
          "branch_id": "br_jb_pasteur_nvl",
          "branch_address": "Pasteur & 254 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://jollibee.com.vn/mi-y-so-t-bo-ba-m-1-mie-ng-ga-ra-n-nuo-c-ngo-t.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-08T06:55:41.478Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B18_JB_CAP_DOI",
          "brand": "Jollibee",
          "title": "Combo Cặp Đôi Ăn Ý",
          "branch_id": "br_jb_pasteur_nvl",
          "branch_address": "Pasteur & 254 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://jollibee.com.vn/c-p-doi-an-y.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-08T06:55:41.478Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B18_JB_COM_GA_CAY",
          "brand": "Jollibee",
          "title": "Cơm Gà Giòn Cay",
          "branch_id": "br_jb_pasteur_nvl",
          "branch_address": "Pasteur & 254 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://jollibee.com.vn/burger-com.html",
          "capture_reference": "aa14c8d86235400591451c9062669badce321056cdfa99838b74b9adbd534d09",
          "observed_timestamp": "2026-09-08T06:55:42.982Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B18_JB_MI_Y_BO_BAM",
          "brand": "Jollibee",
          "title": "Mì Ý Jolly Sốt Bò Bằm",
          "branch_id": "br_jb_pasteur_nvl",
          "branch_address": "Pasteur & 254 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://jollibee.com.vn/mon-moi-mon-ngon.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-08T06:55:41.478Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B14_JB_4000935",
          "brand": "Jollibee",
          "title": "COMBO 179 (Cả Nhà No Nê)",
          "branch_id": "br_jb_pasteur_nvl",
          "branch_address": "Pasteur & 254 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_JOLLIBEE_12008_1",
          "brand": "Jollibee",
          "title": "Burger Gà Giòn",
          "branch_id": "br_jb_pasteur_nvl",
          "branch_address": "Pasteur & 254 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_JOLLIBEE_52013",
          "brand": "Jollibee",
          "title": "Combo Burger Gà Giòn 2",
          "branch_id": "br_jb_pasteur_nvl",
          "branch_address": "Pasteur & 254 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_JOLLIBEE_1810060_1",
          "brand": "Jollibee",
          "title": "Cơm Gà Mắm Tỏi",
          "branch_id": "br_jb_pasteur_nvl",
          "branch_address": "Pasteur & 254 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_JOLLIBEE_1820006_1",
          "brand": "Jollibee",
          "title": "Burger Tôm",
          "branch_id": "br_jb_pasteur_nvl",
          "branch_address": "Pasteur & 254 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_JOLLIBEE_1830009_1",
          "brand": "Jollibee",
          "title": "Jolly Hotdog",
          "branch_id": "br_jb_pasteur_nvl",
          "branch_address": "Pasteur & 254 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "J370_OFFER_JB_01",
          "brand": "Jollibee",
          "title": "Combo Càng Cay Càng Mê — 157K",
          "branch_id": "br_jb_pasteur_nvl",
          "branch_address": "Pasteur & 254 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://jollibee.com.vn/c-ng-cay-c-ng-me.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Gọi combo trực tiếp tại quầy hoặc đặt qua hotline 1900-1533"
        },
        {
          "offer_id": "J370_OFFER_JB_02",
          "brand": "Jollibee",
          "title": "Combo Một Mình Hít Hà — 92K",
          "branch_id": "br_jb_pasteur_nvl",
          "branch_address": "Pasteur & 254 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://jollibee.com.vn/mot-m-nh-h-t-h.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng ăn tại chỗ, mang về tại quầy"
        },
        {
          "offer_id": "J370_OFFER_JB_03",
          "brand": "Jollibee",
          "title": "Combo Một Mình Ăn Ngon — 92K",
          "branch_id": "br_jb_pasteur_nvl",
          "branch_address": "Pasteur & 254 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://jollibee.com.vn/mot-m-nh-an-ngon.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng tại quầy cho tất cả khách hàng"
        },
        {
          "offer_id": "J370_OFFER_JB_04",
          "brand": "Jollibee",
          "title": "Combo Cặp Đôi Ăn Ý — 145K",
          "branch_id": "br_jb_pasteur_nvl",
          "branch_address": "Pasteur & 254 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://jollibee.com.vn/cap-doi-an-y.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Combo 2 người giá tiết kiệm khi gọi tại quầy"
        },
        {
          "offer_id": "J370_OFFER_JB_05",
          "brand": "Jollibee",
          "title": "Cơm Gà Giòn Cay — Bữa Trưa Sinh Viên 45K",
          "branch_id": "br_jb_pasteur_nvl",
          "branch_address": "Pasteur & 254 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://jollibee.com.vn/com-ga-gion-cay.html",
          "capture_reference": "aa14c8d86235400591451c9062669badce321056cdfa99838b74b9adbd534d09",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Bữa trưa giá bình dân quanh các trường đại học Đà Nẵng"
        },
        {
          "offer_id": "J370_OFFER_JB_06",
          "brand": "Jollibee",
          "title": "Mì Ý Jolly Sốt Bò Bằm — Tiết Kiệm 35K",
          "branch_id": "br_jb_pasteur_nvl",
          "branch_address": "Pasteur & 254 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Takeaway",
          "source_url": "https://jollibee.com.vn/mi-y-jolly.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Món ăn nhanh cứu đói sinh viên &le; 35K"
        },
        {
          "offer_id": "B18_HL_SUA_LOC6",
          "brand": "Highlands Coffee",
          "title": "Cà phê Sữa Đá Lon Highlands (Lốc 6 lon)",
          "branch_id": "br_hl_vinhtrung_nvl",
          "branch_address": "255-257 Hùng Vương & 115 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "In-store counter",
          "source_url": "https://shop.highlandscoffee.com.vn/collections",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-08T06:55:43.445Z",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B18_HL_DEN_LOC6",
          "brand": "Highlands Coffee",
          "title": "Cà phê Đen Đá Lon Highlands (Lốc 6 lon)",
          "branch_id": "br_hl_vinhtrung_nvl",
          "branch_address": "255-257 Hùng Vương & 115 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "In-store counter",
          "source_url": "https://shop.highlandscoffee.com.vn/collections",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-08T06:55:43.445Z",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B18_HL_PHIN_DI_SAN",
          "brand": "Highlands Coffee",
          "title": "Cà phê Phin Di Sản Highlands (Gói 200g)",
          "branch_id": "br_hl_vinhtrung_nvl",
          "branch_address": "255-257 Hùng Vương & 115 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "In-store counter",
          "source_url": "https://shop.highlandscoffee.com.vn/collections",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-08T06:55:43.445Z",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "J370_OFFER_HL_01",
          "brand": "Highlands Coffee",
          "title": "Cà phê Sữa Đá Lon Highlands (Lốc 6 lon)",
          "branch_id": "br_hl_vinhtrung_nvl",
          "branch_address": "255-257 Hùng Vương & 115 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "In-store counter",
          "source_url": "https://highlandscoffee.com.vn/vn/ca-phe-lon.html",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Giá niêm yết tại các cửa hàng và kênh bán lẻ chính hãng tại Đà Nẵng"
        },
        {
          "offer_id": "J370_OFFER_HL_02",
          "brand": "Highlands Coffee",
          "title": "Cà phê Đen Đá Lon Highlands (Lốc 6 lon)",
          "branch_id": "br_hl_vinhtrung_nvl",
          "branch_address": "255-257 Hùng Vương & 115 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "In-store counter",
          "source_url": "https://highlandscoffee.com.vn/vn/ca-phe-lon.html",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Mua tại quầy hoặc siêu thị tiện lợi đối tác tại Đà Nẵng"
        },
        {
          "offer_id": "J370_OFFER_HL_03",
          "brand": "Highlands Coffee",
          "title": "Cà phê Phin Di Sản Highlands (Gói 200g)",
          "branch_id": "br_hl_vinhtrung_nvl",
          "branch_address": "255-257 Hùng Vương & 115 Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "In-store counter",
          "source_url": "https://highlandscoffee.com.vn/vn/ca-phe-dong-goi.html",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Bán tại quầy Highlands Coffee Đà Nẵng"
        },
        {
          "offer_id": "B18_PL_HONEY_M",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Trà Ô Long Mật Ong (Size M)",
          "branch_id": "br_pl_nvl_bachdang",
          "branch_address": "59-61 Nguyễn Văn Linh & 240 Bạch Đằng, Q. Hải Châu",
          "applicability_scope": "Counter / Takeaway",
          "source_url": "https://phuclong.com.vn/khuyen-mai/bo-suu-tap-huong-mat-uom-sac-20260227022356",
          "capture_reference": "c08e5a585f9639671df0b4e6de0f0acdf5474956f3c074dcd68b254738f17450",
          "observed_timestamp": "2026-09-08T06:55:43.147Z",
          "validity_state": "SEASONAL_OFFER_ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B18_PL_HONEY_L",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Trà Ô Long Mật Ong (Size L)",
          "branch_id": "br_pl_nvl_bachdang",
          "branch_address": "59-61 Nguyễn Văn Linh & 240 Bạch Đằng, Q. Hải Châu",
          "applicability_scope": "Counter / Takeaway",
          "source_url": "https://phuclong.com.vn/khuyen-mai/bo-suu-tap-huong-mat-uom-sac-20260227022356",
          "capture_reference": "c08e5a585f9639671df0b4e6de0f0acdf5474956f3c074dcd68b254738f17450",
          "observed_timestamp": "2026-09-08T06:55:43.147Z",
          "validity_state": "SEASONAL_OFFER_ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B18_PL_DAO_HONEY_M",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Trà Đào Mật Ong (Size M)",
          "branch_id": "br_pl_nvl_bachdang",
          "branch_address": "59-61 Nguyễn Văn Linh & 240 Bạch Đằng, Q. Hải Châu",
          "applicability_scope": "Counter / Takeaway",
          "source_url": "https://phuclong.com.vn/khuyen-mai/bo-suu-tap-huong-mat-uom-sac-20260227022356",
          "capture_reference": "c08e5a585f9639671df0b4e6de0f0acdf5474956f3c074dcd68b254738f17450",
          "observed_timestamp": "2026-09-08T06:55:43.147Z",
          "validity_state": "SEASONAL_OFFER_ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B18_PL_LOCO_VIBE",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Combo Bật Chất Hè Loco Vibe",
          "branch_id": "br_pl_nvl_bachdang",
          "branch_address": "59-61 Nguyễn Văn Linh & 240 Bạch Đằng, Q. Hải Châu",
          "applicability_scope": "Counter / Takeaway",
          "source_url": "https://phuclong.com.vn/khuyen-mai/bat-chat-he-len-do-dung-dieu-lo-co-vibe-cung-phuc-long-20260713035100",
          "capture_reference": "8d90a4c9d31d3b393035140cdb072ab75316872f3ccfe8712387da476dc59c01",
          "observed_timestamp": "2026-09-08T06:55:43.265Z",
          "validity_state": "SEASONAL_OFFER_ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_PHUCLONG_HONEY_P1",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Combo 1 bánh + 1 nước Hương Mật Ươm Sắc",
          "branch_id": "br_pl_nvl_bachdang",
          "branch_address": "59-61 Nguyễn Văn Linh & 240 Bạch Đằng, Q. Hải Châu",
          "applicability_scope": "Counter / Takeaway",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_PHUCLONG_LOCO_P1",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Combo Lô Cồ Vibe túi lưới và nước size L",
          "branch_id": "br_pl_nvl_bachdang",
          "branch_address": "59-61 Nguyễn Văn Linh & 240 Bạch Đằng, Q. Hải Châu",
          "applicability_scope": "Counter / Takeaway",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B14_PLONG_MEMBER_BENEFITS",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Chương Trình Hội Viên Phúc Long: Tích Điểm & Đổi Quà",
          "branch_id": "br_pl_nvl_bachdang",
          "branch_address": "59-61 Nguyễn Văn Linh & 240 Bạch Đằng, Q. Hải Châu",
          "applicability_scope": "Counter / Takeaway",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "J370_OFFER_PL_01",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Trà Ô Long Mật Ong (Size M) — 50K",
          "branch_id": "br_pl_nvl_bachdang",
          "branch_address": "59-61 Nguyễn Văn Linh & 240 Bạch Đằng, Q. Hải Châu",
          "applicability_scope": "Counter / Takeaway",
          "source_url": "https://phuclong.com.vn/category/tra-phuc-long",
          "capture_reference": "c08e5a585f9639671df0b4e6de0f0acdf5474956f3c074dcd68b254738f17450",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Giá niêm yết tại quầy cho tất cả khách hàng"
        },
        {
          "offer_id": "J370_OFFER_PL_02",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Combo Bật Chất Hè Loco Vibe — Tiết Kiệm 65K",
          "branch_id": "br_pl_nvl_bachdang",
          "branch_address": "59-61 Nguyễn Văn Linh & 240 Bạch Đằng, Q. Hải Châu",
          "applicability_scope": "Counter / Takeaway",
          "source_url": "https://phuclong.com.vn/category/loco-vibe",
          "capture_reference": "8d90a4c9d31d3b393035140cdb072ab75316872f3ccfe8712387da476dc59c01",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng tại quầy theo chương trình mùa vụ"
        },
        {
          "offer_id": "B14_METIZ_U22_2D",
          "brand": "Metiz Cinema Đà Nẵng",
          "title": "Khuyến Mãi Giá Vé U22 (2D chỉ 55.000đ)",
          "branch_id": "br_metiz_helio",
          "branch_address": "Tầng 1 Helio Center, Đường 2/9, Q. Hải Châu (cạnh cầu Tiên Sơn)",
          "applicability_scope": "U22 Counter ticket",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B19_GONGCHA_MEMBER_POLICY",
          "brand": "Gong Cha",
          "title": "Chính Sách Tích Điểm Đổi Quà Thành Viên Gong Cha VN",
          "branch_id": "br_gongcha_nvl",
          "branch_address": "29 Nguyễn Văn Linh, P. Nam Dương, Q. Hải Châu",
          "applicability_scope": "Member app / In-store counter",
          "source_url": "https://gongcha.com.vn/chinh-sach-thanh-vien/",
          "capture_reference": "e848179787c170fac46c83503f43adf02381a3279fa425faba7e862d46a36cbb",
          "observed_timestamp": "2026-09-09T06:05:00.000Z",
          "validity_state": "Chính sách thành viên hiện hành 2026"
        },
        {
          "offer_id": "J370_OFFER_GONGCHA_01",
          "brand": "Gong Cha",
          "title": "Chính Sách Hội Viên Gong Cha — Tích Điểm Đổi Trà Sữa Miễn Phí",
          "branch_id": "br_gongcha_nvl",
          "branch_address": "29 Nguyễn Văn Linh, P. Nam Dương, Q. Hải Châu",
          "applicability_scope": "Member app / In-store counter",
          "source_url": "https://gongcha.com.vn/chinh-sach-thanh-vien/",
          "capture_reference": "e848179787c170fac46c83503f43adf02381a3279fa425faba7e862d46a36cbb",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng cho toàn bộ thành viên đăng ký số điện thoại tại quầy hoặc app Gong Cha VN"
        },
        {
          "offer_id": "B19_KATINAT_APP_LOYALTY",
          "brand": "Katinat Saigon Kafe",
          "title": "K-Club — Chương Trình Hội Viên Trên Katinat App",
          "branch_id": "br_katinat_bachdang",
          "branch_address": "54 Bạch Đằng, P. Hải Châu 1, Q. Hải Châu",
          "applicability_scope": "Katinat App Loyalty / Counter",
          "source_url": "https://katinat.vn/katinat-chinh-thuc-ra-mat-ung-dung-kung-thanh-vien-khong-gioi-han/",
          "capture_reference": "5d49b3372a3daf39b18551c28d8b245536c355d3c3da8a70732fb11bfe0661cb",
          "observed_timestamp": "2026-09-09T06:05:00.000Z",
          "validity_state": "Chương trình chăm sóc thành viên hiện hành trên ứng dụng"
        },
        {
          "offer_id": "J370_OFFER_KATINAT_01",
          "brand": "Katinat Saigon Kafe",
          "title": "Ứng Dụng Katinat Kung — Đặc Quyền Thành Viên Đổi Đồ Uống",
          "branch_id": "br_katinat_bachdang",
          "branch_address": "54 Bạch Đằng, P. Hải Châu 1, Q. Hải Châu",
          "applicability_scope": "Katinat App Loyalty / Counter",
          "source_url": "https://katinat.vn/katinat-chinh-thuc-ra-mat-ung-dung-kung-thanh-vien-khong-gioi-han/",
          "capture_reference": "5d49b3372a3daf39b18551c28d8b245536c355d3c3da8a70732fb11bfe0661cb",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng quét mã app Katinat Kung khi thanh toán tại các chi nhánh Đà Nẵng"
        },
        {
          "offer_id": "B19_TPC_COMBO_COT_MAM_KEO_479K",
          "brand": "The Pizza Company",
          "title": "Combo \"Cốt\" Mắm Kẹo",
          "branch_id": "br_tpc_pasteur_nvl",
          "branch_address": "Pasteur & Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Delivery",
          "source_url": "https://thepizzacompany.vn/combo-cot-mam-keo",
          "capture_reference": "4174e8b59ef9639164e551698e838737fd48a99ea316ff728272ce0a26f6a6dc",
          "observed_timestamp": "2026-09-09T06:05:00.000Z",
          "validity_state": "Áp dụng thường nhật 2026"
        },
        {
          "offer_id": "B19_TPC_COMBO_COT_MAI_MAN_599K",
          "brand": "The Pizza Company",
          "title": "Combo \"Cốt\" Mãi Mặn",
          "branch_id": "br_tpc_pasteur_nvl",
          "branch_address": "Pasteur & Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Delivery",
          "source_url": "https://thepizzacompany.vn/combo-cot-mai-man",
          "capture_reference": "de2f01f7e0b8ea62e75e1b925c066f531f25e872ec968c2d9a2f6156f8995aec",
          "observed_timestamp": "2026-09-09T06:05:00.000Z",
          "validity_state": "Áp dụng thường nhật 2026"
        },
        {
          "offer_id": "B19_TPC_BOGO_PEPSI_15L",
          "brand": "The Pizza Company",
          "title": "Mua 1 Tặng 1 Nước Pepsi 1.5L",
          "branch_id": "br_tpc_pasteur_nvl",
          "branch_address": "Pasteur & Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Delivery",
          "source_url": "https://thepizzacompany.vn/mua-1-tang-1-nuoc",
          "capture_reference": "be4bf6501f351b182ef64b12555f83298b3081c892dcbf4212086637d6b07065",
          "observed_timestamp": "2026-09-09T06:05:00.000Z",
          "validity_state": "Áp dụng thường nhật 2026"
        },
        {
          "offer_id": "J370_OFFER_TPC_01",
          "brand": "The Pizza Company",
          "title": "Combo Cột Mầm Kẹo 479K — Tiết Kiệm Nhóm",
          "branch_id": "br_tpc_pasteur_nvl",
          "branch_address": "Pasteur & Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Delivery",
          "source_url": "https://thepizzacompany.vn/combo-cot-mam-keo",
          "capture_reference": "4174e8b59ef9639164e551698e838737fd48a99ea316ff728272ce0a26f6a6dc",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng ăn tại chỗ, mua mang về và giao hàng qua hotline/website TPC Đà Nẵng"
        },
        {
          "offer_id": "J370_OFFER_TPC_02",
          "brand": "The Pizza Company",
          "title": "Combo Cột Mãi Mặn 599K — Tiệc Nhóm Sinh Viên",
          "branch_id": "br_tpc_pasteur_nvl",
          "branch_address": "Pasteur & Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Delivery",
          "source_url": "https://thepizzacompany.vn/combo-cot-mai-man",
          "capture_reference": "de2f01f7e0b8ea62e75e1b925c066f531f25e872ec968c2d9a2f6156f8995aec",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng ăn tại chỗ và mang về tại các chi nhánh TPC Đà Nẵng"
        },
        {
          "offer_id": "J370_OFFER_TPC_03",
          "brand": "The Pizza Company",
          "title": "Mua 1 Tặng 1 Nước Pepsi 1.5L khi mua Pizza Size M/L",
          "branch_id": "br_tpc_pasteur_nvl",
          "branch_address": "Pasteur & Nguyễn Văn Linh, Q. Hải Châu",
          "applicability_scope": "Dine-in / Delivery",
          "source_url": "https://thepizzacompany.vn/mua-1-tang-1-nuoc",
          "capture_reference": "be4bf6501f351b182ef64b12555f83298b3081c892dcbf4212086637d6b07065",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng kèm đơn mua Pizza Size M hoặc L tại website/app hoặc mang về tại quầy"
        },
        {
          "offer_id": "B19_POPEYES_CORE_89K",
          "brand": "Popeyes",
          "title": "Combo Gà Giòn Popeyes Core Offer 89K",
          "branch_id": "br_popeyes_nuithanh",
          "branch_address": "179 Núi Thành, P. Hòa Cường Bắc, Q. Hải Châu",
          "applicability_scope": "Showroom Dine-in / Takeaway",
          "source_url": "https://popeyes.vn/promotion/CORE-OFFER-89K",
          "capture_reference": "908f9ebeba359474d132d7b1dff1c7dae7e3688506ed475c1dcf6c554224d9bd",
          "observed_timestamp": "2026-09-09T06:05:00.000Z",
          "validity_state": "Áp dụng thường nhật 2026"
        },
        {
          "offer_id": "B19_POPEYES_DISCOVERY_001",
          "brand": "Popeyes",
          "title": "Cổng Khuyến Mãi Popeyes Vietnam (Showroom Đà Nẵng)",
          "branch_id": "br_popeyes_nuithanh",
          "branch_address": "179 Núi Thành, P. Hòa Cường Bắc, Q. Hải Châu",
          "applicability_scope": "Showroom Dine-in / Takeaway",
          "source_url": "https://popeyes.vn/promotion",
          "capture_reference": "908f9ebeba359474d132d7b1dff1c7dae7e3688506ed475c1dcf6c554224d9bd",
          "observed_timestamp": "2026-09-10",
          "validity_state": "Cổng thông tin chính thức 2026"
        },
        {
          "offer_id": "B19_POPEYES_BOGO_DELI_99K",
          "brand": "Popeyes",
          "title": "Combo 99.000Đ \"Chill Tiệc\" Tại Gia",
          "branch_id": "br_popeyes_nuithanh",
          "branch_address": "179 Núi Thành, P. Hòa Cường Bắc, Q. Hải Châu",
          "applicability_scope": "Showroom Dine-in / Takeaway",
          "source_url": "https://popeyes.vn/promotion/bogodeli99",
          "capture_reference": "69dfdae5e29a5e0ea598d0f109dadbafc462a55fd1b2e1bfe149a4877c3bfa52",
          "observed_timestamp": "2026-09-09T06:27:00.000Z",
          "validity_state": "Áp dụng thường nhật 2026"
        },
        {
          "offer_id": "B19_POPEYES_BO_DOI_145K",
          "brand": "Popeyes",
          "title": "Bộ Đôi Đúng Ý Chỉ 145.000Đ (7 Món)",
          "branch_id": "br_popeyes_nuithanh",
          "branch_address": "179 Núi Thành, P. Hòa Cường Bắc, Q. Hải Châu",
          "applicability_scope": "Showroom Dine-in / Takeaway",
          "source_url": "https://popeyes.vn/promotion/spaghetti145",
          "capture_reference": "54b641dcea6d7c454af73e2268b72ff9ec2c16d345b5c558961fbe44673e008b",
          "observed_timestamp": "2026-09-09T06:27:00.000Z",
          "validity_state": "Áp dụng thường nhật 2026"
        },
        {
          "offer_id": "J370_OFFER_POPEYES_01",
          "brand": "Popeyes",
          "title": "Core Combo Sinh Viên — 89K Tiết Kiệm",
          "branch_id": "br_popeyes_nuithanh",
          "branch_address": "179 Núi Thành, P. Hòa Cường Bắc, Q. Hải Châu",
          "applicability_scope": "Showroom Dine-in / Takeaway",
          "source_url": "https://popeyes.vn/promotion/CORE-OFFER-89K",
          "capture_reference": "d6085542435afc4aea4d4be6daff533e1a753769baf75a238dfdf062ad6a58b1",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng tại quầy và mua mang về tại Popeyes Đà Nẵng"
        },
        {
          "offer_id": "J370_OFFER_POPEYES_02",
          "brand": "Popeyes",
          "title": "BOGO Delivery 99K — Mua 1 Tặng 1 Gà Giòn",
          "branch_id": "br_popeyes_nuithanh",
          "branch_address": "179 Núi Thành, P. Hòa Cường Bắc, Q. Hải Châu",
          "applicability_scope": "Showroom Dine-in / Takeaway",
          "source_url": "https://popeyes.vn/promotion/bogodeli99",
          "capture_reference": "69dfdae5e29a5e0ea598d0f109dadbafc462a55fd1b2e1bfe149a4877c3bfa52",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng đặt qua website popeyes.vn hoặc hotline giao hàng"
        },
        {
          "offer_id": "J370_OFFER_POPEYES_03",
          "brand": "Popeyes",
          "title": "Combo Bộ Đôi Spaghetti 145K",
          "branch_id": "br_popeyes_nuithanh",
          "branch_address": "179 Núi Thành, P. Hòa Cường Bắc, Q. Hải Châu",
          "applicability_scope": "Showroom Dine-in / Takeaway",
          "source_url": "https://popeyes.vn/promotion/spaghetti145",
          "capture_reference": "54b641dcea6d7c454af73e2268b72ff9ec2c16d345b5c558961fbe44673e008b",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Combo 2 người ăn trưa / tối tại quán Popeyes Đà Nẵng"
        }
      ]
    },
    {
      "cluster_id": "cluster_st",
      "name": "Sơn Trà",
      "short_label": "🌊 Sơn Trà",
      "area_descriptor": "Sơn Trà / Cầu Rồng / Vincom Plaza Ngô Quyền",
      "target_universities": [
        "Cao đẳng Lương thực Thực phẩm (Sơn Trà)",
        "Khu vực sinh viên ven biển & ven sông Hàn Sơn Trà"
      ],
      "verified_branches": [
        {
          "branch_id": "br_cgv_vincom_dnb",
          "brand": "CGV Cinemas",
          "branch_name": "CGV Vincom Plaza Đà Nẵng",
          "address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà (cạnh cầu Sông Hàn)",
          "applicability_scope": "Box office / App",
          "evidence_reference": "cgv_danang_tariff_v1"
        },
        {
          "branch_id": "br_jb_vincom_st",
          "brand": "Jollibee",
          "branch_name": "Jollibee Vincom Plaza Đà Nẵng",
          "address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Counter / Dine-in",
          "evidence_reference": "jollibee_danang_stores_registry_v1"
        },
        {
          "branch_id": "br_hl_vincom_tranhungdao",
          "brand": "Highlands Coffee",
          "branch_name": "Highlands Coffee Vincom & Trần Hưng Đạo",
          "address": "Vincom Ngô Quyền & Trần Hưng Đạo, Q. Sơn Trà",
          "applicability_scope": "Counter / Takeaway",
          "evidence_reference": "highlands_da_nang_registry_v1"
        },
        {
          "branch_id": "br_pl_vincom_st",
          "brand": "Phúc Long",
          "branch_name": "Phúc Long Vincom Plaza Ngô Quyền",
          "address": "Tầng 1 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "In-store counter",
          "evidence_reference": "phuclong_stores_api_da_nang"
        },
        {
          "branch_id": "br_gongcha_tranhungdao",
          "brand": "Gong Cha",
          "branch_name": "Gong Cha Sơn Trà",
          "address": "Trần Hưng Đạo & Vincom, Q. Sơn Trà",
          "applicability_scope": "In-store counter",
          "evidence_reference": "gongcha_vn_member_policy_v1"
        },
        {
          "branch_id": "br_tpc_vincom_st",
          "brand": "The Pizza Company",
          "branch_name": "The Pizza Company Vincom Plaza Ngô Quyền",
          "address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Dine-in / Delivery",
          "evidence_reference": "the_pizza_company_da_nang_registry_v1"
        },
        {
          "branch_id": "br_popeyes_nuithanh",
          "brand": "Popeyes",
          "branch_name": "Popeyes Núi Thành Đà Nẵng",
          "address": "179 Núi Thành, P. Hòa Cường Bắc, Q. Hải Châu",
          "applicability_scope": "Showroom Dine-in / Takeaway",
          "evidence_reference": "popeyes_stores_api_da_nang"
        }
      ],
      "total_applicable_offers": 52,
      "applicable_offer_ids": [
        "B18_CGV_NGAY_DOI",
        "B18_CGV_BIRTHDAY_GIFT",
        "J370_OFFER_CGV_01",
        "J370_OFFER_CGV_02",
        "B18_JB_CANG_CAY",
        "B18_JB_HIT_HA",
        "B18_JB_MOT_MINH_AN_NGON",
        "B18_JB_CAP_DOI",
        "B18_JB_COM_GA_CAY",
        "B18_JB_MI_Y_BO_BAM",
        "B14_JB_4000935",
        "B16_JOLLIBEE_12008_1",
        "B16_JOLLIBEE_52013",
        "B16_JOLLIBEE_1810060_1",
        "B16_JOLLIBEE_1820006_1",
        "B16_JOLLIBEE_1830009_1",
        "J370_OFFER_JB_01",
        "J370_OFFER_JB_02",
        "J370_OFFER_JB_03",
        "J370_OFFER_JB_04",
        "J370_OFFER_JB_05",
        "J370_OFFER_JB_06",
        "B18_HL_SUA_LOC6",
        "B18_HL_DEN_LOC6",
        "B18_HL_PHIN_DI_SAN",
        "J370_OFFER_HL_01",
        "J370_OFFER_HL_02",
        "J370_OFFER_HL_03",
        "B18_PL_HONEY_M",
        "B18_PL_HONEY_L",
        "B18_PL_DAO_HONEY_M",
        "B18_PL_LOCO_VIBE",
        "B16_PHUCLONG_HONEY_P1",
        "B16_PHUCLONG_LOCO_P1",
        "B14_PLONG_MEMBER_BENEFITS",
        "J370_OFFER_PL_01",
        "J370_OFFER_PL_02",
        "B19_GONGCHA_MEMBER_POLICY",
        "J370_OFFER_GONGCHA_01",
        "B19_TPC_COMBO_COT_MAM_KEO_479K",
        "B19_TPC_COMBO_COT_MAI_MAN_599K",
        "B19_TPC_BOGO_PEPSI_15L",
        "J370_OFFER_TPC_01",
        "J370_OFFER_TPC_02",
        "J370_OFFER_TPC_03",
        "B19_POPEYES_CORE_89K",
        "B19_POPEYES_DISCOVERY_001",
        "B19_POPEYES_BOGO_DELI_99K",
        "B19_POPEYES_BO_DOI_145K",
        "J370_OFFER_POPEYES_01",
        "J370_OFFER_POPEYES_02",
        "J370_OFFER_POPEYES_03"
      ],
      "applicable_offers_detailed": [
        {
          "offer_id": "B18_CGV_NGAY_DOI",
          "brand": "CGV Cinemas Đà Nẵng",
          "title": "CGV Ngày Đôi — Vé 2D Đồng Giá Ưu Đãi",
          "branch_id": "br_cgv_vincom_dnb",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà (cạnh cầu Sông Hàn)",
          "applicability_scope": "Box office / App",
          "source_url": "https://www.cgv.vn/default/newsoffer/cgv-ngay-doi/",
          "capture_reference": "21a050f22a436fc08de30f6b75ae9a181be5681504859504ea57239f832d31f0",
          "observed_timestamp": "2026-09-08T06:55:43.615Z",
          "validity_state": "ACTIVE_SEPTEMBER_2026__MONTHLY_EVENT"
        },
        {
          "offer_id": "B18_CGV_BIRTHDAY_GIFT",
          "brand": "CGV Cinemas Đà Nẵng",
          "title": "Quà Tặng Sinh Nhật Thành Viên CGV (Bắp Nước Miễn Phí)",
          "branch_id": "br_cgv_vincom_dnb",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà (cạnh cầu Sông Hàn)",
          "applicability_scope": "Box office / App",
          "source_url": "https://www.cgv.vn/default/newsoffer/birthday-promo/",
          "capture_reference": "b507208ba1d5315f1ee53e64611f370021171fcf1a145570f8e6e7f1fbe214c0",
          "observed_timestamp": "2026-09-08T06:55:43.615Z",
          "validity_state": "ACTIVE_SEPTEMBER_2026__MEMBER_BIRTHDAY_MONTH"
        },
        {
          "offer_id": "J370_OFFER_CGV_01",
          "brand": "CGV Cinemas Đà Nẵng",
          "title": "CGV Ngày Đôi — Vé 2D Đồng Giá Ưu Đãi",
          "branch_id": "br_cgv_vincom_dnb",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà (cạnh cầu Sông Hàn)",
          "applicability_scope": "Box office / App",
          "source_url": "https://www.cgv.vn/default/movies/offers/ngay-doi",
          "capture_reference": "21a050f22a436fc08de30f6b75ae9a181be5681504859504ea57239f832d31f0",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng cho thành viên đặt vé trên app/website CGV hoặc tại quầy CGV Đà Nẵng"
        },
        {
          "offer_id": "J370_OFFER_CGV_02",
          "brand": "CGV Cinemas Đà Nẵng",
          "title": "Quà Tặng Sinh Nhật Thành Viên CGV — Bắp Nước Miễn Phí",
          "branch_id": "br_cgv_vincom_dnb",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà (cạnh cầu Sông Hàn)",
          "applicability_scope": "Box office / App",
          "source_url": "https://www.cgv.vn/default/movies/offers/birthday",
          "capture_reference": "b507208ba1d5315f1ee53e64611f370021171fcf1a145570f8e6e7f1fbe214c0",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Xuất trình thẻ thành viên hoặc app CGV tại quầy bắp nước trong tháng sinh nhật"
        },
        {
          "offer_id": "B18_JB_CANG_CAY",
          "brand": "Jollibee",
          "title": "Combo Càng Cay Càng Mê",
          "branch_id": "br_jb_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/c-ng-cay-c-ng-me.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-08T06:55:41.478Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B18_JB_HIT_HA",
          "brand": "Jollibee",
          "title": "Combo Một Mình Hít Hà",
          "branch_id": "br_jb_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/m-t-minh-hit-ha.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-08T06:55:41.478Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B18_JB_MOT_MINH_AN_NGON",
          "brand": "Jollibee",
          "title": "Combo Một Mình Ăn Ngon",
          "branch_id": "br_jb_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/mi-y-so-t-bo-ba-m-1-mie-ng-ga-ra-n-nuo-c-ngo-t.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-08T06:55:41.478Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B18_JB_CAP_DOI",
          "brand": "Jollibee",
          "title": "Combo Cặp Đôi Ăn Ý",
          "branch_id": "br_jb_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/c-p-doi-an-y.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-08T06:55:41.478Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B18_JB_COM_GA_CAY",
          "brand": "Jollibee",
          "title": "Cơm Gà Giòn Cay",
          "branch_id": "br_jb_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/burger-com.html",
          "capture_reference": "aa14c8d86235400591451c9062669badce321056cdfa99838b74b9adbd534d09",
          "observed_timestamp": "2026-09-08T06:55:42.982Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B18_JB_MI_Y_BO_BAM",
          "brand": "Jollibee",
          "title": "Mì Ý Jolly Sốt Bò Bằm",
          "branch_id": "br_jb_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/mon-moi-mon-ngon.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-08T06:55:41.478Z",
          "validity_state": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE"
        },
        {
          "offer_id": "B14_JB_4000935",
          "brand": "Jollibee",
          "title": "COMBO 179 (Cả Nhà No Nê)",
          "branch_id": "br_jb_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_JOLLIBEE_12008_1",
          "brand": "Jollibee",
          "title": "Burger Gà Giòn",
          "branch_id": "br_jb_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_JOLLIBEE_52013",
          "brand": "Jollibee",
          "title": "Combo Burger Gà Giòn 2",
          "branch_id": "br_jb_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_JOLLIBEE_1810060_1",
          "brand": "Jollibee",
          "title": "Cơm Gà Mắm Tỏi",
          "branch_id": "br_jb_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_JOLLIBEE_1820006_1",
          "brand": "Jollibee",
          "title": "Burger Tôm",
          "branch_id": "br_jb_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_JOLLIBEE_1830009_1",
          "brand": "Jollibee",
          "title": "Jolly Hotdog",
          "branch_id": "br_jb_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "J370_OFFER_JB_01",
          "brand": "Jollibee",
          "title": "Combo Càng Cay Càng Mê — 157K",
          "branch_id": "br_jb_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/c-ng-cay-c-ng-me.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Gọi combo trực tiếp tại quầy hoặc đặt qua hotline 1900-1533"
        },
        {
          "offer_id": "J370_OFFER_JB_02",
          "brand": "Jollibee",
          "title": "Combo Một Mình Hít Hà — 92K",
          "branch_id": "br_jb_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/mot-m-nh-h-t-h.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng ăn tại chỗ, mang về tại quầy"
        },
        {
          "offer_id": "J370_OFFER_JB_03",
          "brand": "Jollibee",
          "title": "Combo Một Mình Ăn Ngon — 92K",
          "branch_id": "br_jb_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/mot-m-nh-an-ngon.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng tại quầy cho tất cả khách hàng"
        },
        {
          "offer_id": "J370_OFFER_JB_04",
          "brand": "Jollibee",
          "title": "Combo Cặp Đôi Ăn Ý — 145K",
          "branch_id": "br_jb_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/cap-doi-an-y.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Combo 2 người giá tiết kiệm khi gọi tại quầy"
        },
        {
          "offer_id": "J370_OFFER_JB_05",
          "brand": "Jollibee",
          "title": "Cơm Gà Giòn Cay — Bữa Trưa Sinh Viên 45K",
          "branch_id": "br_jb_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/com-ga-gion-cay.html",
          "capture_reference": "aa14c8d86235400591451c9062669badce321056cdfa99838b74b9adbd534d09",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Bữa trưa giá bình dân quanh các trường đại học Đà Nẵng"
        },
        {
          "offer_id": "J370_OFFER_JB_06",
          "brand": "Jollibee",
          "title": "Mì Ý Jolly Sốt Bò Bằm — Tiết Kiệm 35K",
          "branch_id": "br_jb_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Counter / Dine-in",
          "source_url": "https://jollibee.com.vn/mi-y-jolly.html",
          "capture_reference": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Món ăn nhanh cứu đói sinh viên &le; 35K"
        },
        {
          "offer_id": "B18_HL_SUA_LOC6",
          "brand": "Highlands Coffee",
          "title": "Cà phê Sữa Đá Lon Highlands (Lốc 6 lon)",
          "branch_id": "br_hl_vincom_tranhungdao",
          "branch_address": "Vincom Ngô Quyền & Trần Hưng Đạo, Q. Sơn Trà",
          "applicability_scope": "Counter / Takeaway",
          "source_url": "https://shop.highlandscoffee.com.vn/collections",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-08T06:55:43.445Z",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B18_HL_DEN_LOC6",
          "brand": "Highlands Coffee",
          "title": "Cà phê Đen Đá Lon Highlands (Lốc 6 lon)",
          "branch_id": "br_hl_vincom_tranhungdao",
          "branch_address": "Vincom Ngô Quyền & Trần Hưng Đạo, Q. Sơn Trà",
          "applicability_scope": "Counter / Takeaway",
          "source_url": "https://shop.highlandscoffee.com.vn/collections",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-08T06:55:43.445Z",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B18_HL_PHIN_DI_SAN",
          "brand": "Highlands Coffee",
          "title": "Cà phê Phin Di Sản Highlands (Gói 200g)",
          "branch_id": "br_hl_vincom_tranhungdao",
          "branch_address": "Vincom Ngô Quyền & Trần Hưng Đạo, Q. Sơn Trà",
          "applicability_scope": "Counter / Takeaway",
          "source_url": "https://shop.highlandscoffee.com.vn/collections",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-08T06:55:43.445Z",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "J370_OFFER_HL_01",
          "brand": "Highlands Coffee",
          "title": "Cà phê Sữa Đá Lon Highlands (Lốc 6 lon)",
          "branch_id": "br_hl_vincom_tranhungdao",
          "branch_address": "Vincom Ngô Quyền & Trần Hưng Đạo, Q. Sơn Trà",
          "applicability_scope": "Counter / Takeaway",
          "source_url": "https://highlandscoffee.com.vn/vn/ca-phe-lon.html",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Giá niêm yết tại các cửa hàng và kênh bán lẻ chính hãng tại Đà Nẵng"
        },
        {
          "offer_id": "J370_OFFER_HL_02",
          "brand": "Highlands Coffee",
          "title": "Cà phê Đen Đá Lon Highlands (Lốc 6 lon)",
          "branch_id": "br_hl_vincom_tranhungdao",
          "branch_address": "Vincom Ngô Quyền & Trần Hưng Đạo, Q. Sơn Trà",
          "applicability_scope": "Counter / Takeaway",
          "source_url": "https://highlandscoffee.com.vn/vn/ca-phe-lon.html",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Mua tại quầy hoặc siêu thị tiện lợi đối tác tại Đà Nẵng"
        },
        {
          "offer_id": "J370_OFFER_HL_03",
          "brand": "Highlands Coffee",
          "title": "Cà phê Phin Di Sản Highlands (Gói 200g)",
          "branch_id": "br_hl_vincom_tranhungdao",
          "branch_address": "Vincom Ngô Quyền & Trần Hưng Đạo, Q. Sơn Trà",
          "applicability_scope": "Counter / Takeaway",
          "source_url": "https://highlandscoffee.com.vn/vn/ca-phe-dong-goi.html",
          "capture_reference": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Bán tại quầy Highlands Coffee Đà Nẵng"
        },
        {
          "offer_id": "B18_PL_HONEY_M",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Trà Ô Long Mật Ong (Size M)",
          "branch_id": "br_pl_vincom_st",
          "branch_address": "Tầng 1 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "In-store counter",
          "source_url": "https://phuclong.com.vn/khuyen-mai/bo-suu-tap-huong-mat-uom-sac-20260227022356",
          "capture_reference": "c08e5a585f9639671df0b4e6de0f0acdf5474956f3c074dcd68b254738f17450",
          "observed_timestamp": "2026-09-08T06:55:43.147Z",
          "validity_state": "SEASONAL_OFFER_ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B18_PL_HONEY_L",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Trà Ô Long Mật Ong (Size L)",
          "branch_id": "br_pl_vincom_st",
          "branch_address": "Tầng 1 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "In-store counter",
          "source_url": "https://phuclong.com.vn/khuyen-mai/bo-suu-tap-huong-mat-uom-sac-20260227022356",
          "capture_reference": "c08e5a585f9639671df0b4e6de0f0acdf5474956f3c074dcd68b254738f17450",
          "observed_timestamp": "2026-09-08T06:55:43.147Z",
          "validity_state": "SEASONAL_OFFER_ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B18_PL_DAO_HONEY_M",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Trà Đào Mật Ong (Size M)",
          "branch_id": "br_pl_vincom_st",
          "branch_address": "Tầng 1 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "In-store counter",
          "source_url": "https://phuclong.com.vn/khuyen-mai/bo-suu-tap-huong-mat-uom-sac-20260227022356",
          "capture_reference": "c08e5a585f9639671df0b4e6de0f0acdf5474956f3c074dcd68b254738f17450",
          "observed_timestamp": "2026-09-08T06:55:43.147Z",
          "validity_state": "SEASONAL_OFFER_ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B18_PL_LOCO_VIBE",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Combo Bật Chất Hè Loco Vibe",
          "branch_id": "br_pl_vincom_st",
          "branch_address": "Tầng 1 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "In-store counter",
          "source_url": "https://phuclong.com.vn/khuyen-mai/bat-chat-he-len-do-dung-dieu-lo-co-vibe-cung-phuc-long-20260713035100",
          "capture_reference": "8d90a4c9d31d3b393035140cdb072ab75316872f3ccfe8712387da476dc59c01",
          "observed_timestamp": "2026-09-08T06:55:43.265Z",
          "validity_state": "SEASONAL_OFFER_ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_PHUCLONG_HONEY_P1",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Combo 1 bánh + 1 nước Hương Mật Ươm Sắc",
          "branch_id": "br_pl_vincom_st",
          "branch_address": "Tầng 1 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "In-store counter",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B16_PHUCLONG_LOCO_P1",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Combo Lô Cồ Vibe túi lưới và nước size L",
          "branch_id": "br_pl_vincom_st",
          "branch_address": "Tầng 1 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "In-store counter",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "B14_PLONG_MEMBER_BENEFITS",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Chương Trình Hội Viên Phúc Long: Tích Điểm & Đổi Quà",
          "branch_id": "br_pl_vincom_st",
          "branch_address": "Tầng 1 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "In-store counter",
          "source_url": "https://jayt-production-v3420.vercel.app",
          "capture_reference": "SHA_VERIFIED_REGISTRY_RECORD",
          "observed_timestamp": "2026-09-10",
          "validity_state": "ACTIVE_SEPTEMBER_2026"
        },
        {
          "offer_id": "J370_OFFER_PL_01",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Trà Ô Long Mật Ong (Size M) — 50K",
          "branch_id": "br_pl_vincom_st",
          "branch_address": "Tầng 1 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "In-store counter",
          "source_url": "https://phuclong.com.vn/category/tra-phuc-long",
          "capture_reference": "c08e5a585f9639671df0b4e6de0f0acdf5474956f3c074dcd68b254738f17450",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Giá niêm yết tại quầy cho tất cả khách hàng"
        },
        {
          "offer_id": "J370_OFFER_PL_02",
          "brand": "Phúc Long Coffee & Tea",
          "title": "Combo Bật Chất Hè Loco Vibe — Tiết Kiệm 65K",
          "branch_id": "br_pl_vincom_st",
          "branch_address": "Tầng 1 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "In-store counter",
          "source_url": "https://phuclong.com.vn/category/loco-vibe",
          "capture_reference": "8d90a4c9d31d3b393035140cdb072ab75316872f3ccfe8712387da476dc59c01",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng tại quầy theo chương trình mùa vụ"
        },
        {
          "offer_id": "B19_GONGCHA_MEMBER_POLICY",
          "brand": "Gong Cha",
          "title": "Chính Sách Tích Điểm Đổi Quà Thành Viên Gong Cha VN",
          "branch_id": "br_gongcha_tranhungdao",
          "branch_address": "Trần Hưng Đạo & Vincom, Q. Sơn Trà",
          "applicability_scope": "In-store counter",
          "source_url": "https://gongcha.com.vn/chinh-sach-thanh-vien/",
          "capture_reference": "e848179787c170fac46c83503f43adf02381a3279fa425faba7e862d46a36cbb",
          "observed_timestamp": "2026-09-09T06:05:00.000Z",
          "validity_state": "Chính sách thành viên hiện hành 2026"
        },
        {
          "offer_id": "J370_OFFER_GONGCHA_01",
          "brand": "Gong Cha",
          "title": "Chính Sách Hội Viên Gong Cha — Tích Điểm Đổi Trà Sữa Miễn Phí",
          "branch_id": "br_gongcha_tranhungdao",
          "branch_address": "Trần Hưng Đạo & Vincom, Q. Sơn Trà",
          "applicability_scope": "In-store counter",
          "source_url": "https://gongcha.com.vn/chinh-sach-thanh-vien/",
          "capture_reference": "e848179787c170fac46c83503f43adf02381a3279fa425faba7e862d46a36cbb",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng cho toàn bộ thành viên đăng ký số điện thoại tại quầy hoặc app Gong Cha VN"
        },
        {
          "offer_id": "B19_TPC_COMBO_COT_MAM_KEO_479K",
          "brand": "The Pizza Company",
          "title": "Combo \"Cốt\" Mắm Kẹo",
          "branch_id": "br_tpc_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Dine-in / Delivery",
          "source_url": "https://thepizzacompany.vn/combo-cot-mam-keo",
          "capture_reference": "4174e8b59ef9639164e551698e838737fd48a99ea316ff728272ce0a26f6a6dc",
          "observed_timestamp": "2026-09-09T06:05:00.000Z",
          "validity_state": "Áp dụng thường nhật 2026"
        },
        {
          "offer_id": "B19_TPC_COMBO_COT_MAI_MAN_599K",
          "brand": "The Pizza Company",
          "title": "Combo \"Cốt\" Mãi Mặn",
          "branch_id": "br_tpc_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Dine-in / Delivery",
          "source_url": "https://thepizzacompany.vn/combo-cot-mai-man",
          "capture_reference": "de2f01f7e0b8ea62e75e1b925c066f531f25e872ec968c2d9a2f6156f8995aec",
          "observed_timestamp": "2026-09-09T06:05:00.000Z",
          "validity_state": "Áp dụng thường nhật 2026"
        },
        {
          "offer_id": "B19_TPC_BOGO_PEPSI_15L",
          "brand": "The Pizza Company",
          "title": "Mua 1 Tặng 1 Nước Pepsi 1.5L",
          "branch_id": "br_tpc_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Dine-in / Delivery",
          "source_url": "https://thepizzacompany.vn/mua-1-tang-1-nuoc",
          "capture_reference": "be4bf6501f351b182ef64b12555f83298b3081c892dcbf4212086637d6b07065",
          "observed_timestamp": "2026-09-09T06:05:00.000Z",
          "validity_state": "Áp dụng thường nhật 2026"
        },
        {
          "offer_id": "J370_OFFER_TPC_01",
          "brand": "The Pizza Company",
          "title": "Combo Cột Mầm Kẹo 479K — Tiết Kiệm Nhóm",
          "branch_id": "br_tpc_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Dine-in / Delivery",
          "source_url": "https://thepizzacompany.vn/combo-cot-mam-keo",
          "capture_reference": "4174e8b59ef9639164e551698e838737fd48a99ea316ff728272ce0a26f6a6dc",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng ăn tại chỗ, mua mang về và giao hàng qua hotline/website TPC Đà Nẵng"
        },
        {
          "offer_id": "J370_OFFER_TPC_02",
          "brand": "The Pizza Company",
          "title": "Combo Cột Mãi Mặn 599K — Tiệc Nhóm Sinh Viên",
          "branch_id": "br_tpc_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Dine-in / Delivery",
          "source_url": "https://thepizzacompany.vn/combo-cot-mai-man",
          "capture_reference": "de2f01f7e0b8ea62e75e1b925c066f531f25e872ec968c2d9a2f6156f8995aec",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng ăn tại chỗ và mang về tại các chi nhánh TPC Đà Nẵng"
        },
        {
          "offer_id": "J370_OFFER_TPC_03",
          "brand": "The Pizza Company",
          "title": "Mua 1 Tặng 1 Nước Pepsi 1.5L khi mua Pizza Size M/L",
          "branch_id": "br_tpc_vincom_st",
          "branch_address": "Tầng 4 Vincom Plaza, 910A Ngô Quyền, Q. Sơn Trà",
          "applicability_scope": "Dine-in / Delivery",
          "source_url": "https://thepizzacompany.vn/mua-1-tang-1-nuoc",
          "capture_reference": "be4bf6501f351b182ef64b12555f83298b3081c892dcbf4212086637d6b07065",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng kèm đơn mua Pizza Size M hoặc L tại website/app hoặc mang về tại quầy"
        },
        {
          "offer_id": "B19_POPEYES_CORE_89K",
          "brand": "Popeyes",
          "title": "Combo Gà Giòn Popeyes Core Offer 89K",
          "branch_id": "br_popeyes_nuithanh",
          "branch_address": "179 Núi Thành, P. Hòa Cường Bắc, Q. Hải Châu",
          "applicability_scope": "Showroom Dine-in / Takeaway",
          "source_url": "https://popeyes.vn/promotion/CORE-OFFER-89K",
          "capture_reference": "908f9ebeba359474d132d7b1dff1c7dae7e3688506ed475c1dcf6c554224d9bd",
          "observed_timestamp": "2026-09-09T06:05:00.000Z",
          "validity_state": "Áp dụng thường nhật 2026"
        },
        {
          "offer_id": "B19_POPEYES_DISCOVERY_001",
          "brand": "Popeyes",
          "title": "Cổng Khuyến Mãi Popeyes Vietnam (Showroom Đà Nẵng)",
          "branch_id": "br_popeyes_nuithanh",
          "branch_address": "179 Núi Thành, P. Hòa Cường Bắc, Q. Hải Châu",
          "applicability_scope": "Showroom Dine-in / Takeaway",
          "source_url": "https://popeyes.vn/promotion",
          "capture_reference": "908f9ebeba359474d132d7b1dff1c7dae7e3688506ed475c1dcf6c554224d9bd",
          "observed_timestamp": "2026-09-10",
          "validity_state": "Cổng thông tin chính thức 2026"
        },
        {
          "offer_id": "B19_POPEYES_BOGO_DELI_99K",
          "brand": "Popeyes",
          "title": "Combo 99.000Đ \"Chill Tiệc\" Tại Gia",
          "branch_id": "br_popeyes_nuithanh",
          "branch_address": "179 Núi Thành, P. Hòa Cường Bắc, Q. Hải Châu",
          "applicability_scope": "Showroom Dine-in / Takeaway",
          "source_url": "https://popeyes.vn/promotion/bogodeli99",
          "capture_reference": "69dfdae5e29a5e0ea598d0f109dadbafc462a55fd1b2e1bfe149a4877c3bfa52",
          "observed_timestamp": "2026-09-09T06:27:00.000Z",
          "validity_state": "Áp dụng thường nhật 2026"
        },
        {
          "offer_id": "B19_POPEYES_BO_DOI_145K",
          "brand": "Popeyes",
          "title": "Bộ Đôi Đúng Ý Chỉ 145.000Đ (7 Món)",
          "branch_id": "br_popeyes_nuithanh",
          "branch_address": "179 Núi Thành, P. Hòa Cường Bắc, Q. Hải Châu",
          "applicability_scope": "Showroom Dine-in / Takeaway",
          "source_url": "https://popeyes.vn/promotion/spaghetti145",
          "capture_reference": "54b641dcea6d7c454af73e2268b72ff9ec2c16d345b5c558961fbe44673e008b",
          "observed_timestamp": "2026-09-09T06:27:00.000Z",
          "validity_state": "Áp dụng thường nhật 2026"
        },
        {
          "offer_id": "J370_OFFER_POPEYES_01",
          "brand": "Popeyes",
          "title": "Core Combo Sinh Viên — 89K Tiết Kiệm",
          "branch_id": "br_popeyes_nuithanh",
          "branch_address": "179 Núi Thành, P. Hòa Cường Bắc, Q. Hải Châu",
          "applicability_scope": "Showroom Dine-in / Takeaway",
          "source_url": "https://popeyes.vn/promotion/CORE-OFFER-89K",
          "capture_reference": "d6085542435afc4aea4d4be6daff533e1a753769baf75a238dfdf062ad6a58b1",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng tại quầy và mua mang về tại Popeyes Đà Nẵng"
        },
        {
          "offer_id": "J370_OFFER_POPEYES_02",
          "brand": "Popeyes",
          "title": "BOGO Delivery 99K — Mua 1 Tặng 1 Gà Giòn",
          "branch_id": "br_popeyes_nuithanh",
          "branch_address": "179 Núi Thành, P. Hòa Cường Bắc, Q. Hải Châu",
          "applicability_scope": "Showroom Dine-in / Takeaway",
          "source_url": "https://popeyes.vn/promotion/bogodeli99",
          "capture_reference": "69dfdae5e29a5e0ea598d0f109dadbafc462a55fd1b2e1bfe149a4877c3bfa52",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Áp dụng đặt qua website popeyes.vn hoặc hotline giao hàng"
        },
        {
          "offer_id": "J370_OFFER_POPEYES_03",
          "brand": "Popeyes",
          "title": "Combo Bộ Đôi Spaghetti 145K",
          "branch_id": "br_popeyes_nuithanh",
          "branch_address": "179 Núi Thành, P. Hòa Cường Bắc, Q. Hải Châu",
          "applicability_scope": "Showroom Dine-in / Takeaway",
          "source_url": "https://popeyes.vn/promotion/spaghetti145",
          "capture_reference": "54b641dcea6d7c454af73e2268b72ff9ec2c16d345b5c558961fbe44673e008b",
          "observed_timestamp": "2026-09-10T06:00:00Z",
          "validity_state": "Combo 2 người ăn trưa / tối tại quán Popeyes Đà Nẵng"
        }
      ]
    }
  ]
};
const J372_OFFERS = [
  {
    "offer_id": "B18_JB_CANG_CAY",
    "brand_id": "jollibee",
    "brand": "Jollibee",
    "title": "Combo Càng Cay Càng Mê",
    "price": 157000,
    "price_display": "157.000 VND",
    "offer_classification": "ORDINARY_PRICE_OBSERVATION__COMBO_TARIFF",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "PRICE_OBSERVATION",
    "validity": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE",
    "source_url": "https://jollibee.com.vn/c-ng-cay-c-ng-me.html",
    "raw_sha256": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/jollibee_new_menu.raw.html",
    "captured_at_utc": "2026-09-08T06:55:41.478Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "9 cửa hàng tại Đà Nẵng",
      "locality_evidence_reference": "06_TRUST_AND_EVIDENCE/batch_13_locator_vault/run_20260906_150216_887192/LOCATIONS_DA_NANG_VERIFIED.json"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM",
    "claim_instruction": "Gọi combo trực tiếp tại quầy Jollibee Đà Nẵng"
  },
  {
    "offer_id": "B18_JB_HIT_HA",
    "brand_id": "jollibee",
    "brand": "Jollibee",
    "title": "Combo Một Mình Hít Hà",
    "price": 80000,
    "price_display": "80.000 VND",
    "offer_classification": "ORDINARY_PRICE_OBSERVATION__COMBO_TARIFF",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "PRICE_OBSERVATION",
    "validity": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE",
    "source_url": "https://jollibee.com.vn/m-t-minh-hit-ha.html",
    "raw_sha256": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/jollibee_new_menu.raw.html",
    "captured_at_utc": "2026-09-08T06:55:41.478Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "9 cửa hàng tại Đà Nẵng",
      "locality_evidence_reference": "06_TRUST_AND_EVIDENCE/batch_13_locator_vault/run_20260906_150216_887192/LOCATIONS_DA_NANG_VERIFIED.json"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM",
    "claim_instruction": "Gọi món trực tiếp tại các chi nhánh Jollibee Đà Nẵng"
  },
  {
    "offer_id": "B18_JB_MOT_MINH_AN_NGON",
    "brand_id": "jollibee",
    "brand": "Jollibee",
    "title": "Combo Một Mình Ăn Ngon",
    "price": 73000,
    "price_display": "73.000 VND",
    "offer_classification": "ORDINARY_PRICE_OBSERVATION__COMBO_TARIFF",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "PRICE_OBSERVATION",
    "validity": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE",
    "source_url": "https://jollibee.com.vn/mi-y-so-t-bo-ba-m-1-mie-ng-ga-ra-n-nuo-c-ngo-t.html",
    "raw_sha256": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/jollibee_new_menu.raw.html",
    "captured_at_utc": "2026-09-08T06:55:41.478Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "9 cửa hàng tại Đà Nẵng",
      "locality_evidence_reference": "06_TRUST_AND_EVIDENCE/batch_13_locator_vault/run_20260906_150216_887192/LOCATIONS_DA_NANG_VERIFIED.json"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM",
    "claim_instruction": "Gọi combo tại quầy Jollibee Đà Nẵng"
  },
  {
    "offer_id": "B18_JB_CAP_DOI",
    "brand_id": "jollibee",
    "brand": "Jollibee",
    "title": "Combo Cặp Đôi Ăn Ý",
    "price": 145000,
    "price_display": "145.000 VND",
    "offer_classification": "ORDINARY_PRICE_OBSERVATION__COMBO_TARIFF",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "PRICE_OBSERVATION",
    "validity": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE",
    "source_url": "https://jollibee.com.vn/c-p-doi-an-y.html",
    "raw_sha256": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/jollibee_new_menu.raw.html",
    "captured_at_utc": "2026-09-08T06:55:41.478Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "9 cửa hàng tại Đà Nẵng",
      "locality_evidence_reference": "06_TRUST_AND_EVIDENCE/batch_13_locator_vault/run_20260906_150216_887192/LOCATIONS_DA_NANG_VERIFIED.json"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM",
    "claim_instruction": "Gọi combo tại quầy Jollibee Đà Nẵng"
  },
  {
    "offer_id": "B18_JB_COM_GA_CAY",
    "brand_id": "jollibee",
    "brand": "Jollibee",
    "title": "Cơm Gà Giòn Cay",
    "price": 47000,
    "price_display": "47.000 VND",
    "offer_classification": "ORDINARY_PRICE_OBSERVATION",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "PRICE_OBSERVATION",
    "validity": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE",
    "source_url": "https://jollibee.com.vn/burger-com.html",
    "raw_sha256": "aa14c8d86235400591451c9062669badce321056cdfa99838b74b9adbd534d09",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/jollibee_burger_rice.raw.html",
    "captured_at_utc": "2026-09-08T06:55:42.982Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "9 cửa hàng tại Đà Nẵng",
      "locality_evidence_reference": "06_TRUST_AND_EVIDENCE/batch_13_locator_vault/run_20260906_150216_887192/LOCATIONS_DA_NANG_VERIFIED.json"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM",
    "claim_instruction": "Gọi món tại quầy Jollibee Đà Nẵng"
  },
  {
    "offer_id": "B18_JB_MI_Y_BO_BAM",
    "brand_id": "jollibee",
    "brand": "Jollibee",
    "title": "Mì Ý Jolly Sốt Bò Bằm",
    "price": 40000,
    "price_display": "40.000 VND",
    "offer_classification": "ORDINARY_PRICE_OBSERVATION",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "PRICE_OBSERVATION",
    "validity": "VALID_SEPTEMBER_2026__RECHECK_AT_SOURCE",
    "source_url": "https://jollibee.com.vn/mon-moi-mon-ngon.html",
    "raw_sha256": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/jollibee_new_menu.raw.html",
    "captured_at_utc": "2026-09-08T06:55:41.478Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "9 cửa hàng tại Đà Nẵng",
      "locality_evidence_reference": "06_TRUST_AND_EVIDENCE/batch_13_locator_vault/run_20260906_150216_887192/LOCATIONS_DA_NANG_VERIFIED.json"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM",
    "claim_instruction": "Gọi món tại quầy Jollibee Đà Nẵng"
  },
  {
    "offer_id": "B18_PL_HONEY_M",
    "brand_id": "phuclong",
    "brand": "Phúc Long Coffee & Tea",
    "title": "Trà Ô Long Mật Ong (Size M)",
    "price": 55000,
    "price_display": "55.000 VND",
    "offer_classification": "ORDINARY_PRICE_OBSERVATION",
    "is_ordinary_observed_price": true,
    "is_discount": true,
    "tier": "COUNTER_DEAL",
    "validity": "SEASONAL_OFFER_ACTIVE_SEPTEMBER_2026",
    "source_url": "https://phuclong.com.vn/khuyen-mai/bo-suu-tap-huong-mat-uom-sac-20260227022356",
    "raw_sha256": "c08e5a585f9639671df0b4e6de0f0acdf5474956f3c074dcd68b254738f17450",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/phuclong_honey.raw.html",
    "captured_at_utc": "2026-09-08T06:55:43.147Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "7 cửa hàng tại Đà Nẵng",
      "locality_evidence_reference": "06_TRUST_AND_EVIDENCE/batch_13_locator_vault/run_20260906_150216_887192/LOCATIONS_DA_NANG_VERIFIED.json"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM",
    "claim_instruction": "Mua trực tiếp tại hệ thống Phúc Long Đà Nẵng"
  },
  {
    "offer_id": "B18_PL_HONEY_L",
    "brand_id": "phuclong",
    "brand": "Phúc Long Coffee & Tea",
    "title": "Trà Ô Long Mật Ong (Size L)",
    "price": 65000,
    "price_display": "65.000 VND",
    "offer_classification": "ORDINARY_PRICE_OBSERVATION",
    "is_ordinary_observed_price": true,
    "is_discount": true,
    "tier": "COUNTER_DEAL",
    "validity": "SEASONAL_OFFER_ACTIVE_SEPTEMBER_2026",
    "source_url": "https://phuclong.com.vn/khuyen-mai/bo-suu-tap-huong-mat-uom-sac-20260227022356",
    "raw_sha256": "c08e5a585f9639671df0b4e6de0f0acdf5474956f3c074dcd68b254738f17450",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/phuclong_honey.raw.html",
    "captured_at_utc": "2026-09-08T06:55:43.147Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "7 cửa hàng tại Đà Nẵng",
      "locality_evidence_reference": "06_TRUST_AND_EVIDENCE/batch_13_locator_vault/run_20260906_150216_887192/LOCATIONS_DA_NANG_VERIFIED.json"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM",
    "claim_instruction": "Mua trực tiếp tại các cửa hàng Phúc Long Đà Nẵng"
  },
  {
    "offer_id": "B18_PL_DAO_HONEY_M",
    "brand_id": "phuclong",
    "brand": "Phúc Long Coffee & Tea",
    "title": "Trà Đào Mật Ong (Size M)",
    "price": 60000,
    "price_display": "60.000 VND",
    "offer_classification": "ORDINARY_PRICE_OBSERVATION",
    "is_ordinary_observed_price": true,
    "is_discount": true,
    "tier": "COUNTER_DEAL",
    "validity": "SEASONAL_OFFER_ACTIVE_SEPTEMBER_2026",
    "source_url": "https://phuclong.com.vn/khuyen-mai/bo-suu-tap-huong-mat-uom-sac-20260227022356",
    "raw_sha256": "c08e5a585f9639671df0b4e6de0f0acdf5474956f3c074dcd68b254738f17450",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/phuclong_honey.raw.html",
    "captured_at_utc": "2026-09-08T06:55:43.147Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "7 cửa hàng tại Đà Nẵng",
      "locality_evidence_reference": "06_TRUST_AND_EVIDENCE/batch_13_locator_vault/run_20260906_150216_887192/LOCATIONS_DA_NANG_VERIFIED.json"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM",
    "claim_instruction": "Mua trực tiếp tại cửa hàng Phúc Long Đà Nẵng"
  },
  {
    "offer_id": "B18_PL_LOCO_VIBE",
    "brand_id": "phuclong",
    "brand": "Phúc Long Coffee & Tea",
    "title": "Combo Bật Chất Hè Loco Vibe",
    "price": 79000,
    "price_display": "79.000 VND",
    "offer_classification": "VERIFIED_SEPTEMBER_PROMOTION",
    "is_ordinary_observed_price": false,
    "is_discount": true,
    "tier": "COUNTER_DEAL",
    "validity": "SEASONAL_OFFER_ACTIVE_SEPTEMBER_2026",
    "source_url": "https://phuclong.com.vn/khuyen-mai/bat-chat-he-len-do-dung-dieu-lo-co-vibe-cung-phuc-long-20260713035100",
    "raw_sha256": "8d90a4c9d31d3b393035140cdb072ab75316872f3ccfe8712387da476dc59c01",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/phuclong_loco.raw.html",
    "captured_at_utc": "2026-09-08T06:55:43.265Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "7 cửa hàng tại Đà Nẵng",
      "locality_evidence_reference": "06_TRUST_AND_EVIDENCE/batch_13_locator_vault/run_20260906_150216_887192/LOCATIONS_DA_NANG_VERIFIED.json"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM",
    "claim_instruction": "Hỏi nhân viên quầy về combo Loco Vibe tại Phúc Long Đà Nẵng"
  },
  {
    "offer_id": "B18_HL_SUA_LOC6",
    "brand_id": "highlands_coffee",
    "brand": "Highlands Coffee",
    "title": "Cà phê Sữa Đá Lon Highlands (Lốc 6 lon)",
    "price": 84000,
    "price_display": "84.000 VND",
    "offer_classification": "ORDINARY_PRICE_OBSERVATION",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "COUNTER_DEAL",
    "validity": "ACTIVE_SEPTEMBER_2026",
    "source_url": "https://shop.highlandscoffee.com.vn/collections",
    "raw_sha256": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/highlands_shop.raw.html",
    "captured_at_utc": "2026-09-08T06:55:43.445Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "locator_url": "https://www.highlandscoffee.com.vn/vn/he-thong-quan.html",
      "locator_raw_evidence": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/highlands_stores_danang.leaf.raw.html",
      "locator_raw_sha256": "afeb699f2b863916ae5e93d32a964a86cdb29449258f4b1d4698b3b5db9599c4",
      "verified_store_locations": [
        "Highlands Coffee Indochina Riverside: 74 Bạch Đằng, P. Hải Châu 1, Q. Hải Châu, TP. Đà Nẵng",
        "Highlands Coffee VTV8: 258 Bạch Đằng, P. Phước Ninh, Q. Hải Châu, TP. Đà Nẵng",
        "Highlands Coffee Vĩnh Trung Plaza: 255-257 Hùng Vương, P. Vĩnh Trung, Q. Thanh Khê, TP. Đà Nẵng",
        "Highlands Coffee Vincom Plaza Ngô Quyền: 910A Ngô Quyền, P. An Hải Bắc, Q. Sơn Trà, TP. Đà Nẵng"
      ]
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM",
    "claim_instruction": "Mua tại cửa hàng hoặc quầy bán lẻ Highlands Coffee Đà Nẵng"
  },
  {
    "offer_id": "B18_HL_DEN_LOC6",
    "brand_id": "highlands_coffee",
    "brand": "Highlands Coffee",
    "title": "Cà phê Đen Đá Lon Highlands (Lốc 6 lon)",
    "price": 84000,
    "price_display": "84.000 VND",
    "offer_classification": "ORDINARY_PRICE_OBSERVATION",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "COUNTER_DEAL",
    "validity": "ACTIVE_SEPTEMBER_2026",
    "source_url": "https://shop.highlandscoffee.com.vn/collections",
    "raw_sha256": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/highlands_shop.raw.html",
    "captured_at_utc": "2026-09-08T06:55:43.445Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "locator_url": "https://www.highlandscoffee.com.vn/vn/he-thong-quan.html",
      "locator_raw_evidence": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/highlands_stores_danang.leaf.raw.html",
      "locator_raw_sha256": "afeb699f2b863916ae5e93d32a964a86cdb29449258f4b1d4698b3b5db9599c4",
      "verified_store_locations": [
        "Highlands Coffee Indochina Riverside: 74 Bạch Đằng, P. Hải Châu 1, Q. Hải Châu, TP. Đà Nẵng",
        "Highlands Coffee VTV8: 258 Bạch Đằng, P. Phước Ninh, Q. Hải Châu, TP. Đà Nẵng",
        "Highlands Coffee Vĩnh Trung Plaza: 255-257 Hùng Vương, P. Vĩnh Trung, Q. Thanh Khê, TP. Đà Nẵng",
        "Highlands Coffee Vincom Plaza Ngô Quyền: 910A Ngô Quyền, P. An Hải Bắc, Q. Sơn Trà, TP. Đà Nẵng"
      ]
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM",
    "claim_instruction": "Mua tại cửa hàng hoặc quầy bán lẻ Highlands Coffee Đà Nẵng"
  },
  {
    "offer_id": "B18_HL_PHIN_DI_SAN",
    "brand_id": "highlands_coffee",
    "brand": "Highlands Coffee",
    "title": "Cà phê Phin Di Sản Highlands (Gói 200g)",
    "price": 65000,
    "price_display": "65.000 VND",
    "offer_classification": "ORDINARY_PRICE_OBSERVATION",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "COUNTER_DEAL",
    "validity": "ACTIVE_SEPTEMBER_2026",
    "source_url": "https://shop.highlandscoffee.com.vn/collections",
    "raw_sha256": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/highlands_shop.raw.html",
    "captured_at_utc": "2026-09-08T06:55:43.445Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "locator_url": "https://www.highlandscoffee.com.vn/vn/he-thong-quan.html",
      "locator_raw_evidence": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/highlands_stores_danang.leaf.raw.html",
      "locator_raw_sha256": "afeb699f2b863916ae5e93d32a964a86cdb29449258f4b1d4698b3b5db9599c4",
      "verified_store_locations": [
        "Highlands Coffee Indochina Riverside: 74 Bạch Đằng, P. Hải Châu 1, Q. Hải Châu, TP. Đà Nẵng",
        "Highlands Coffee VTV8: 258 Bạch Đằng, P. Phước Ninh, Q. Hải Châu, TP. Đà Nẵng",
        "Highlands Coffee Vĩnh Trung Plaza: 255-257 Hùng Vương, P. Vĩnh Trung, Q. Thanh Khê, TP. Đà Nẵng",
        "Highlands Coffee Vincom Plaza Ngô Quyền: 910A Ngô Quyền, P. An Hải Bắc, Q. Sơn Trà, TP. Đà Nẵng"
      ]
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM",
    "claim_instruction": "Mua tại cửa hàng hoặc quầy bán lẻ Highlands Coffee Đà Nẵng"
  },
  {
    "offer_id": "B18_CGV_NGAY_DOI",
    "brand_id": "cgv_cinemas",
    "brand": "CGV Cinemas Đà Nẵng",
    "title": "CGV Ngày Đôi — Vé 2D Đồng Giá Ưu Đãi",
    "price": 55000,
    "price_display": "55.000 VND",
    "offer_classification": "VERIFIED_SEPTEMBER_PROMOTION",
    "is_ordinary_observed_price": false,
    "is_discount": true,
    "tier": "BRAND_PROGRAM",
    "validity": "ACTIVE_SEPTEMBER_2026__MONTHLY_EVENT",
    "source_url": "https://www.cgv.vn/default/newsoffer/cgv-ngay-doi/",
    "raw_sha256": "21a050f22a436fc08de30f6b75ae9a181be5681504859504ea57239f832d31f0",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/cgv_ngay_doi.leaf.raw.html",
    "captured_at_utc": "2026-09-08T06:55:43.615Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "cinema_cluster": "CGV Vĩnh Trung Plaza Đà Nẵng & CGV Vincom Đà Nẵng",
      "leaf_banner_assets": [
        "https://static-cgv.vncdn.vn/media/wysiwyg/2026/092026/LP_01_11_.jpg",
        "https://static-cgv.vncdn.vn/media/wysiwyg/2026/092026/LP_02_9_.jpg"
      ]
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM",
    "claim_instruction": "Xuất trình thẻ thành viên CGV hoặc đặt vé trên ứng dụng CGV"
  },
  {
    "offer_id": "B18_CGV_BIRTHDAY_GIFT",
    "brand_id": "cgv_cinemas",
    "brand": "CGV Cinemas Đà Nẵng",
    "title": "Quà Tặng Sinh Nhật Thành Viên CGV (Bắp Nước Miễn Phí)",
    "price": 0,
    "price_display": "Miễn phí (Quà tặng)",
    "offer_classification": "VERIFIED_SEPTEMBER_PROMOTION",
    "is_ordinary_observed_price": false,
    "is_discount": true,
    "tier": "BRAND_PROGRAM",
    "validity": "ACTIVE_SEPTEMBER_2026__MEMBER_BIRTHDAY_MONTH",
    "source_url": "https://www.cgv.vn/default/newsoffer/birthday-promo/",
    "raw_sha256": "b507208ba1d5315f1ee53e64611f370021171fcf1a145570f8e6e7f1fbe214c0",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/cgv_birthday_promo.leaf.raw.html",
    "captured_at_utc": "2026-09-08T06:55:43.615Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "cinema_cluster": "CGV Vĩnh Trung Plaza Đà Nẵng & CGV Vincom Đà Nẵng",
      "terms_summary": "Miễn phí 1 CGV Birthday Combo (1 Bắp + 2 Nước) cho thành viên có sinh nhật tháng 9 tại quầy CGV Đà Nẵng"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM",
    "claim_instruction": "Xuất trình CCCD/thẻ thành viên CGV trùng tháng sinh nhật tại quầy bắp nước"
  },
  {
    "offer_id": "B14_JB_4000935",
    "brand_id": "jollibee",
    "brand": "Jollibee",
    "title": "COMBO 179 (Cả Nhà No Nê)",
    "price": 179000,
    "price_display": "179.000 VND",
    "offer_classification": "ORDINARY_PRICE_OBSERVATION",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "PRICE_OBSERVATION",
    "validity": "ACTIVE_SEPTEMBER_2026",
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM"
  },
  {
    "offer_id": "B16_JOLLIBEE_12008_1",
    "brand_id": "jollibee",
    "brand": "Jollibee",
    "title": "Burger Gà Giòn",
    "price": 35000,
    "price_display": "35.000 VND",
    "offer_classification": "ORDINARY_PRICE_OBSERVATION",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "PRICE_OBSERVATION",
    "validity": "ACTIVE_SEPTEMBER_2026",
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM"
  },
  {
    "offer_id": "B16_JOLLIBEE_52013",
    "brand_id": "jollibee",
    "brand": "Jollibee",
    "title": "Combo Burger Gà Giòn 2",
    "price": 60000,
    "price_display": "60.000 VND",
    "offer_classification": "ORDINARY_PRICE_OBSERVATION",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "PRICE_OBSERVATION",
    "validity": "ACTIVE_SEPTEMBER_2026",
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM"
  },
  {
    "offer_id": "B16_JOLLIBEE_1810060_1",
    "brand_id": "jollibee",
    "brand": "Jollibee",
    "title": "Cơm Gà Mắm Tỏi",
    "price": 45000,
    "price_display": "45.000 VND",
    "offer_classification": "ORDINARY_PRICE_OBSERVATION",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "PRICE_OBSERVATION",
    "validity": "ACTIVE_SEPTEMBER_2026",
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM"
  },
  {
    "offer_id": "B16_JOLLIBEE_1820006_1",
    "brand_id": "jollibee",
    "brand": "Jollibee",
    "title": "Burger Tôm",
    "price": 40000,
    "price_display": "40.000 VND",
    "offer_classification": "ORDINARY_PRICE_OBSERVATION",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "PRICE_OBSERVATION",
    "validity": "ACTIVE_SEPTEMBER_2026",
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM"
  },
  {
    "offer_id": "B16_JOLLIBEE_1830009_1",
    "brand_id": "jollibee",
    "brand": "Jollibee",
    "title": "Jolly Hotdog",
    "price": 30000,
    "price_display": "30.000 VND",
    "offer_classification": "ORDINARY_PRICE_OBSERVATION",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "PRICE_OBSERVATION",
    "validity": "ACTIVE_SEPTEMBER_2026",
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM"
  },
  {
    "offer_id": "B14_GALAXY_DANANG_TARIFF",
    "brand_id": "galaxy_cinema",
    "brand": "Galaxy Cinema",
    "title": "Biểu Giá Vé Galaxy Cinema Coop Đà Nẵng",
    "price": 45000,
    "price_display": "45.000 VND",
    "offer_classification": "ORDINARY_PRICE_OBSERVATION",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "PRICE_OBSERVATION",
    "validity": "ACTIVE_SEPTEMBER_2026",
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM"
  },
  {
    "offer_id": "B14_METIZ_U22_2D",
    "brand_id": "metiz_cinema",
    "brand": "Metiz Cinema Đà Nẵng",
    "title": "Khuyến Mãi Giá Vé U22 (2D chỉ 55.000đ)",
    "price": 55000,
    "price_display": "55.000 VND",
    "offer_classification": "VERIFIED_COUNTER_DEAL",
    "is_ordinary_observed_price": false,
    "is_discount": true,
    "tier": "BRAND_PROGRAM",
    "validity": "ACTIVE_SEPTEMBER_2026",
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM"
  },
  {
    "offer_id": "J333_HOT_02_GALAXY_U22",
    "brand_id": "galaxy_cinema",
    "brand": "Galaxy Cinema",
    "title": "Vé U22 Galaxy Cinema — Từ 45.000đ",
    "price": 45000,
    "price_display": "45.000 VND",
    "offer_classification": "VERIFIED_COUNTER_DEAL",
    "is_ordinary_observed_price": false,
    "is_discount": true,
    "tier": "BRAND_PROGRAM",
    "validity": "ACTIVE_SEPTEMBER_2026",
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM"
  },
  {
    "offer_id": "B16_PHUCLONG_HONEY_P1",
    "brand_id": "phuclong",
    "brand": "Phúc Long Coffee & Tea",
    "title": "Combo 1 bánh + 1 nước Hương Mật Ươm Sắc",
    "price": 65000,
    "price_display": "65.000 VND",
    "offer_classification": "VERIFIED_COUNTER_DEAL",
    "is_ordinary_observed_price": false,
    "is_discount": true,
    "tier": "COUNTER_DEAL",
    "validity": "ACTIVE_SEPTEMBER_2026",
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM"
  },
  {
    "offer_id": "B16_PHUCLONG_LOCO_P1",
    "brand_id": "phuclong",
    "brand": "Phúc Long Coffee & Tea",
    "title": "Combo Lô Cồ Vibe túi lưới và nước size L",
    "price": 85000,
    "price_display": "85.000 VND",
    "offer_classification": "VERIFIED_COUNTER_DEAL",
    "is_ordinary_observed_price": false,
    "is_discount": true,
    "tier": "COUNTER_DEAL",
    "validity": "ACTIVE_SEPTEMBER_2026",
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM"
  },
  {
    "offer_id": "B14_PLONG_MEMBER_BENEFITS",
    "brand_id": "phuclong",
    "brand": "Phúc Long Coffee & Tea",
    "title": "Chương Trình Hội Viên Phúc Long: Tích Điểm & Đổi Quà",
    "price": 0,
    "price_display": "Miễn phí (Hội viên)",
    "offer_classification": "VERIFIED_COUNTER_DEAL",
    "is_ordinary_observed_price": false,
    "is_discount": true,
    "tier": "BRAND_PROGRAM",
    "validity": "ACTIVE_SEPTEMBER_2026",
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM"
  },
  {
    "offer_id": "P2O_GALAXY_MEMBER_2026",
    "brand_id": "galaxy_cinema",
    "brand": "Galaxy Cinema",
    "title": "Quyền Lợi Thành Viên Galaxy Cinema 2026",
    "price": 0,
    "price_display": "Miễn phí (Hội viên)",
    "offer_classification": "VERIFIED_COUNTER_DEAL",
    "is_ordinary_observed_price": false,
    "is_discount": true,
    "tier": "BRAND_PROGRAM",
    "validity": "ACTIVE_SEPTEMBER_2026",
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_CLAIM"
  },
  {
    "offer_id": "P2O_GALAXY_SHOPEEPAY_SEP_2026",
    "brand_id": "galaxy_cinema",
    "brand": "Galaxy Cinema & ShopeePay",
    "title": "Voucher ShopeePay tại Galaxy Cinema — Tháng 09/2026",
    "price": null,
    "price_display": "Voucher giảm 10.000đ",
    "offer_classification": "VERIFIED_COUNTER_DEAL",
    "is_ordinary_observed_price": false,
    "is_discount": true,
    "tier": "APP_VOUCHER",
    "validity": "ACTIVE_SEPTEMBER_2026",
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "APP_WALLET",
    "price_vnd": 0,
    "benefit": "Giảm 10.000đ khi thanh toán vé xem phim qua ShopeePay",
    "cta_label": "Mở ưu đãi trên App ↗",
    "app_url": "https://shopee.vn/",
    "claim_instruction": "Thu thập voucher trên ứng dụng Shopee/ShopeePay và thanh toán tại quầy/app Galaxy Cinema."
  },
  {
    "offer_id": "B19_STARLIGHT_U22_WEEKDAY",
    "brand_id": "starlight_cinema",
    "brand": "Starlight Cinema",
    "title": "Giá vé U22 ngày thường (Thứ 2 đến Thứ 5)",
    "price": 45000,
    "price_vnd": 45000,
    "price_display": "45.000 VND",
    "offer_classification": "VERIFIED_COUNTER_DEAL",
    "is_ordinary_observed_price": false,
    "is_discount": true,
    "tier": "COUNTER_DEAL",
    "validity": "Áp dụng Thứ 2 đến Thứ 5 hàng tuần",
    "source_url": "https://starlight.vn/uu-dai/ct-u22-rap-starlight-1047.html",
    "raw_sha256": "44ba5ab1fb696758a8a9edf4bc8ca590499e7e06b2fbbd4fe0f7c5fe1a124e78",
    "screenshot_sha256": "b3b047a2571ad9049ddd4135e12f955ee777318272f482ddb414ca62edef2fc8",
    "captured_at_utc": "2026-09-09T06:05:00.000Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "participating_locations": [
        "Starlight Đà Nẵng: Tầng 4, Tòa nhà Nguyễn Kim, 46 Điện Biên Phủ, Đà Nẵng"
      ],
      "source_type": "HEADQUARTERS_AND_OPERATING_BRANCH"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy / Hội viên U22",
    "claim_instruction": "Xuất trình CCCD hoặc thẻ HSSV tại quầy vé Starlight Đà Nẵng để mua vé đồng giá 45k (Thứ 2 - Thứ 5)."
  },
  {
    "offer_id": "B19_STARLIGHT_U22_WEEKEND",
    "brand_id": "starlight_cinema",
    "brand": "Starlight Cinema",
    "title": "Giá vé U22 cuối tuần Đà Nẵng (Thứ 6 đến Chủ Nhật)",
    "price": 55000,
    "price_vnd": 55000,
    "price_display": "55.000 VND",
    "offer_classification": "VERIFIED_COUNTER_DEAL",
    "is_ordinary_observed_price": false,
    "is_discount": true,
    "tier": "COUNTER_DEAL",
    "validity": "Áp dụng Thứ 6, Thứ 7, Chủ Nhật hàng tuần",
    "source_url": "https://starlight.vn/uu-dai/ct-u22-rap-starlight-1047.html",
    "raw_sha256": "44ba5ab1fb696758a8a9edf4bc8ca590499e7e06b2fbbd4fe0f7c5fe1a124e78",
    "screenshot_sha256": "b3b047a2571ad9049ddd4135e12f955ee777318272f482ddb414ca62edef2fc8",
    "captured_at_utc": "2026-09-09T06:05:00.000Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "participating_locations": [
        "Starlight Đà Nẵng: Tầng 4, Tòa nhà Nguyễn Kim, 46 Điện Biên Phủ, Đà Nẵng"
      ],
      "source_type": "HEADQUARTERS_AND_OPERATING_BRANCH"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy / Hội viên U22",
    "claim_instruction": "Xuất trình CCCD hoặc thẻ HSSV tại quầy vé Starlight Đà Nẵng để mua vé đồng giá 55k cuối tuần (Thứ 6 - CN)."
  },
  {
    "offer_id": "B19_STARLIGHT_THU_3_PHIM_VIET",
    "brand_id": "starlight_cinema",
    "brand": "Starlight Cinema",
    "title": "Thứ 3 Phim Việt — Đồng giá 45k",
    "price": 45000,
    "price_vnd": 45000,
    "price_display": "45.000 VND",
    "offer_classification": "VERIFIED_COUNTER_DEAL",
    "is_ordinary_observed_price": false,
    "is_discount": true,
    "tier": "COUNTER_DEAL",
    "validity": "Thứ 3 hàng tuần",
    "source_url": "https://starlight.vn/uu-dai/thu-3-phim-viet-1046.html",
    "raw_sha256": "bc08ab274cebf2bb4cfa8544820800d5c71036002a10950a185a748dcb81bda6",
    "screenshot_sha256": "a837a03f96e71e18440922f2aa94bd51c785d7b8742052c0a59b1278af868f62",
    "captured_at_utc": "2026-09-09T06:05:00.000Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "participating_locations": [
        "Starlight Đà Nẵng: Tầng 4, Tòa nhà Nguyễn Kim, 46 Điện Biên Phủ, Đà Nẵng"
      ],
      "source_type": "HEADQUARTERS_AND_OPERATING_BRANCH"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy",
    "claim_instruction": "Mua vé phim Việt Nam vào Thứ 3 hàng tuần tại quầy vé Starlight Đà Nẵng đồng giá 45.000đ."
  },
  {
    "offer_id": "B19_TPC_COMBO_COT_MAM_KEO_479K",
    "brand_id": "the_pizza_company",
    "brand": "The Pizza Company",
    "title": "Combo \"Cốt\" Mắm Kẹo",
    "price": 479000,
    "price_vnd": 479000,
    "price_display": "479.000 VND",
    "offer_classification": "VERIFIED_COUNTER_DEAL",
    "is_ordinary_observed_price": false,
    "is_discount": true,
    "tier": "COUNTER_DEAL",
    "validity": "Áp dụng thường nhật 2026",
    "source_url": "https://thepizzacompany.vn/combo-cot-mam-keo",
    "raw_sha256": "4174e8b59ef9639164e551698e838737fd48a99ea316ff728272ce0a26f6a6dc",
    "screenshot_sha256": "3d8a1fa5b9c395c636b44cb73c0ab9bb2dff52fc4baa36f2f1789270e233041a",
    "captured_at_utc": "2026-09-09T06:05:00.000Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "participating_locations": [
        "The Pizza Company Lotte Mart Đà Nẵng",
        "The Pizza Company 173 Nguyễn Văn Thoại, Q. Sơn Trà",
        "The Pizza Company Co.opmart 478 Điện Biên Phủ, Q. Thanh Khê",
        "The Pizza Company Nguyễn Văn Linh, Q. Hải Châu"
      ],
      "source_type": "BRAND_NETWORK_DA_NANG_ACTIVE"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy / Đặt món",
    "claim_instruction": "Gọi combo trực tiếp tại các chi nhánh The Pizza Company Đà Nẵng hoặc đặt qua website chính thức."
  },
  {
    "offer_id": "B19_TPC_COMBO_COT_MAI_MAN_599K",
    "brand_id": "the_pizza_company",
    "brand": "The Pizza Company",
    "title": "Combo \"Cốt\" Mãi Mặn",
    "price": 599000,
    "price_vnd": 599000,
    "price_display": "599.000 VND",
    "offer_classification": "VERIFIED_COUNTER_DEAL",
    "is_ordinary_observed_price": false,
    "is_discount": true,
    "tier": "COUNTER_DEAL",
    "validity": "Áp dụng thường nhật 2026",
    "source_url": "https://thepizzacompany.vn/combo-cot-mai-man",
    "raw_sha256": "de2f01f7e0b8ea62e75e1b925c066f531f25e872ec968c2d9a2f6156f8995aec",
    "screenshot_sha256": "46c78e4df68e6f9b2218b492bd053505b0af50cc75c49135616c16d06c488a86",
    "captured_at_utc": "2026-09-09T06:05:00.000Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "participating_locations": [
        "The Pizza Company Lotte Mart Đà Nẵng",
        "The Pizza Company 173 Nguyễn Văn Thoại, Q. Sơn Trà",
        "The Pizza Company Co.opmart 478 Điện Biên Phủ, Q. Thanh Khê",
        "The Pizza Company Nguyễn Văn Linh, Q. Hải Châu"
      ],
      "source_type": "BRAND_NETWORK_DA_NANG_ACTIVE"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy / Đặt món",
    "claim_instruction": "Gọi combo trực tiếp tại các chi nhánh The Pizza Company Đà Nẵng hoặc đặt qua website chính thức."
  },
  {
    "offer_id": "B19_TPC_BOGO_PEPSI_15L",
    "brand_id": "the_pizza_company",
    "brand": "The Pizza Company",
    "title": "Mua 1 Tặng 1 Nước Pepsi 1.5L",
    "price": 50000,
    "price_vnd": 50000,
    "price_display": "50.000 VND",
    "offer_classification": "VERIFIED_COUNTER_DEAL",
    "is_ordinary_observed_price": false,
    "is_discount": true,
    "tier": "COUNTER_DEAL",
    "validity": "Áp dụng thường nhật 2026",
    "source_url": "https://thepizzacompany.vn/mua-1-tang-1-nuoc",
    "raw_sha256": "be4bf6501f351b182ef64b12555f83298b3081c892dcbf4212086637d6b07065",
    "screenshot_sha256": "33afb86d87b0d60cff7c34576a22944b9476f99c73412f7973302332e4f9281a",
    "captured_at_utc": "2026-09-09T06:05:00.000Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "participating_locations": [
        "The Pizza Company Lotte Mart Đà Nẵng",
        "The Pizza Company 173 Nguyễn Văn Thoại, Q. Sơn Trà",
        "The Pizza Company Co.opmart 478 Điện Biên Phủ, Q. Thanh Khê",
        "The Pizza Company Nguyễn Văn Linh, Q. Hải Châu"
      ],
      "source_type": "BRAND_NETWORK_DA_NANG_ACTIVE"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy / Đặt món",
    "claim_instruction": "Tặng 1 chai Pepsi PET 1.5L khi mua 1 chai Pepsi/7UP PET 1.5L tại The Pizza Company Đà Nẵng."
  },
  {
    "offer_id": "B19_GONGCHA_MEMBER_POLICY",
    "brand_id": "gong_cha",
    "brand": "Gong Cha",
    "title": "Chính Sách Tích Điểm Đổi Quà Thành Viên Gong Cha VN",
    "price": null,
    "price_vnd": 0,
    "price_display": "Quyền lợi hội viên",
    "offer_classification": "VERIFIED_BRAND_PROGRAM",
    "is_ordinary_observed_price": false,
    "is_discount": true,
    "tier": "BRAND_PROGRAM",
    "validity": "Chính sách thành viên hiện hành 2026",
    "source_url": "https://gongcha.com.vn/chinh-sach-thanh-vien/",
    "raw_sha256": "e848179787c170fac46c83503f43adf02381a3279fa425faba7e862d46a36cbb",
    "screenshot_sha256": "bd30b7f22520eff47371035186918e765e1e1f5c05cb03653a3da21bc135fd67",
    "captured_at_utc": "2026-09-09T06:05:00.000Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "participating_locations": [
        "Gong Cha Đà Nẵng: 01 Nguyễn Văn Linh, P. Bình Hiên, Q. Hải Châu, Đà Nẵng"
      ],
      "source_type": "OFFICIAL_STORE_LOCATOR_RECORD"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Hội viên",
    "claim_instruction": "Tích điểm thành viên Gong Cha khi thanh toán tại cửa hàng 01 Nguyễn Văn Linh, Đà Nẵng."
  },
  {
    "offer_id": "B19_KATINAT_APP_LOYALTY",
    "brand_id": "katinat",
    "brand": "Katinat Saigon Kafe",
    "title": "K-Club — Chương Trình Hội Viên Trên Katinat App",
    "price": null,
    "price_vnd": 0,
    "price_display": "Quyền lợi App",
    "offer_classification": "VERIFIED_CAMPAIGN",
    "is_ordinary_observed_price": false,
    "is_discount": true,
    "tier": "APP_VOUCHER",
    "validity": "Chương trình chăm sóc thành viên hiện hành trên ứng dụng",
    "source_url": "https://katinat.vn/katinat-chinh-thuc-ra-mat-ung-dung-kung-thanh-vien-khong-gioi-han/",
    "app_url": "https://katinat.vn/",
    "raw_sha256": "5d49b3372a3daf39b18551c28d8b245536c355d3c3da8a70732fb11bfe0661cb",
    "screenshot_sha256": "28ab177647197039c2d2f8c620394127920c0cc83f8b1820ffd78b749fd28ca0",
    "captured_at_utc": "2026-09-09T06:05:00.000Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "participating_locations": [
        "Katinat Bạch Đằng: 9 Bạch Đằng, P. Thạch Thang, Q. Hải Châu, Đà Nẵng"
      ],
      "source_type": "OFFICIAL_HOMEPAGE_LOCATOR"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "APP_WALLET",
    "cta_label": "Mở ưu đãi trên App ↗",
    "member_badge": "Hội viên App",
    "claim_instruction": "Tải ứng dụng KATINAT, đăng ký thành viên K-Club để nhận voucher và tích điểm tại Katinat Đà Nẵng."
  },
  {
    "offer_id": "B19_POPEYES_CORE_89K",
    "brand_id": "popeyes",
    "brand": "Popeyes",
    "title": "Combo Gà Giòn Popeyes Core Offer 89K",
    "price": 89000,
    "price_vnd": 89000,
    "price_display": "89.000 VND",
    "offer_classification": "VERIFIED_COUNTER_DEAL",
    "is_ordinary_observed_price": false,
    "is_discount": true,
    "tier": "COUNTER_DEAL",
    "validity": "Áp dụng thường nhật 2026",
    "source_url": "https://popeyes.vn/promotion/CORE-OFFER-89K",
    "raw_sha256": "908f9ebeba359474d132d7b1dff1c7dae7e3688506ed475c1dcf6c554224d9bd",
    "captured_at_utc": "2026-09-09T06:05:00.000Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "participating_locations": [
        "Popeyes Núi Thành: 179 Núi Thành, Phường Hòa Cường Bắc, Quận Hải Châu, Đà Nẵng"
      ],
      "source_type": "OFFICIAL_FIRST_PARTY_API"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy / Đặt món",
    "claim_instruction": "Gọi combo Core Offer 89K tại Popeyes 179 Núi Thành, Đà Nẵng hoặc đặt trực tuyến."
  },
  {
    "offer_id": "B19_POPEYES_DISCOVERY_001",
    "brand_id": "popeyes",
    "brand": "Popeyes",
    "title": "Cổng Khuyến Mãi Popeyes Vietnam (Showroom Đà Nẵng)",
    "price": null,
    "price_vnd": 0,
    "price_display": "Cổng khám phá",
    "tier": "DISCOVERY_RECORD",
    "is_discovery": true,
    "validity": "Cổng thông tin chính thức 2026",
    "source_url": "https://popeyes.vn/promotion",
    "raw_sha256": "908f9ebeba359474d132d7b1dff1c7dae7e3688506ed475c1dcf6c554224d9bd",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "participating_locations": [
        "179 Núi Thành, Phường Hòa Cường Bắc, Quận Hải Châu, Đà Nẵng"
      ]
    },
    "validation_status": "DISCOVERY_RECORD",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "DISCOVERY",
    "cta_label": "Xem cổng khuyến mãi Popeyes ↗",
    "claim_instruction": "Khám phá toàn bộ danh mục ưu đãi và combo gà giòn trên website Popeyes."
  },
  {
    "offer_id": "B19_POPEYES_BOGO_DELI_99K",
    "brand_id": "popeyes",
    "brand": "Popeyes",
    "title": "Combo 99.000Đ \"Chill Tiệc\" Tại Gia",
    "price": 99000,
    "price_vnd": 99000,
    "price_display": "99.000 VND",
    "offer_classification": "VERIFIED_COUNTER_DEAL",
    "is_ordinary_observed_price": false,
    "is_discount": true,
    "tier": "COUNTER_DEAL",
    "validity": "Áp dụng thường nhật 2026",
    "source_url": "https://popeyes.vn/promotion/bogodeli99",
    "raw_sha256": "69dfdae5e29a5e0ea598d0f109dadbafc462a55fd1b2e1bfe149a4877c3bfa52",
    "screenshot_sha256": "da87e23d628a4ecff7fade5e0ece45b5565054b889599694e97417295ca35210",
    "captured_at_utc": "2026-09-09T06:27:00.000Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "participating_locations": [
        "Popeyes Núi Thành: 179 Núi Thành, Phường Hòa Cường Bắc, Quận Hải Châu, Đà Nẵng"
      ],
      "source_type": "OFFICIAL_FIRST_PARTY_API"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy / Đặt món",
    "claim_instruction": "Combo 4 Miếng Gà Giòn + 2 Nước ngọt giá 99.000đ (giảm 47%) đặt qua hotline 1900 6008 hoặc website Popeyes giao từ 179 Núi Thành, Đà Nẵng."
  },
  {
    "offer_id": "B19_POPEYES_BO_DOI_145K",
    "brand_id": "popeyes",
    "brand": "Popeyes",
    "title": "Bộ Đôi Đúng Ý Chỉ 145.000Đ (7 Món)",
    "price": 145000,
    "price_vnd": 145000,
    "price_display": "145.000 VND",
    "offer_classification": "VERIFIED_COUNTER_DEAL",
    "is_ordinary_observed_price": false,
    "is_discount": true,
    "tier": "COUNTER_DEAL",
    "validity": "Áp dụng thường nhật 2026",
    "source_url": "https://popeyes.vn/promotion/spaghetti145",
    "raw_sha256": "54b641dcea6d7c454af73e2268b72ff9ec2c16d345b5c558961fbe44673e008b",
    "screenshot_sha256": "d77c7e7e6fbe0ebfb2ed80f8e9f279cbd464b5918759b71a2c56f95c95112597",
    "captured_at_utc": "2026-09-09T06:27:00.000Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "participating_locations": [
        "Popeyes Núi Thành: 179 Núi Thành, Phường Hòa Cường Bắc, Quận Hải Châu, Đà Nẵng"
      ],
      "source_type": "OFFICIAL_FIRST_PARTY_API"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "COUNTER_MEMBER",
    "cta_label": "Xem điều kiện áp dụng ↗",
    "member_badge": "Ưu đãi tại quầy / Đặt món",
    "claim_instruction": "Combo 7 món: 2 Mì Ý Phô Mai + 2 Gà Giòn + 1 Khoai tây chiên + 2 Nước chỉ 145.000đ tại Popeyes 179 Núi Thành, Đà Nẵng."
  },
  {
    "offer_id": "J370_OFFER_STARLIGHT_01",
    "brand_id": "starlight",
    "brand": "Starlight Cinema",
    "title": "Giá vé U22 ngày thường (Thứ 2 đến Thứ 5)",
    "price": 45000,
    "price_display": "45.000 VND",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Áp dụng Thứ 2 - Thứ 5 hàng tuần cho thành viên U22 xuất trình CCCD/thẻ HSSV tại quầy",
    "source_url": "https://starlight.vn/uu-dai/ct-u22-rap-starlight-1047.html",
    "raw_sha256": "44ba5ab1fb696758a8a9edf4bc8ca590499e7e06b2fbbd4fe0f7c5fe1a124e78",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/starlight_u22_program.leaf.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (Tầng 4 Tòa nhà Nguyễn Kim, 46 Điện Biên Phủ, Thanh Khê)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "IN_STORE_COMBO_MEMBERSHIP",
    "action_label": "Xem điều kiện tại quầy ↗",
    "action_url": "https://starlight.vn/uu-dai/ct-u22-rap-starlight-1047.html",
    "benefit": "Đồng giá vé 45k/vé khi mua tại quầy từ Thứ 2 đến Thứ 5 cho thành viên U22",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://starlight.vn/uu-dai/ct-u22-rap-starlight-1047.html",
      "screenshot_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/starlight_u22_program.leaf.png",
      "screenshot_sha256": "b3b047a2571ad9049ddd4135e12f955ee777318272f482ddb414ca62edef2fc8",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/starlight_u22_program.leaf.raw.html",
      "raw_html_sha256": "44ba5ab1fb696758a8a9edf4bc8ca590499e7e06b2fbbd4fe0f7c5fe1a124e78",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/starlight_u22_program.leaf.transcription.txt",
      "extracted_text_sha256": "838d59573bfa5955919098a889001c4acbae84aa4d32b60f80803a64ca937f28"
    }
  },
  {
    "offer_id": "J370_OFFER_STARLIGHT_02",
    "brand_id": "starlight",
    "brand": "Starlight Cinema",
    "title": "Giá vé U22 cuối tuần (Thứ 6, Thứ 7, Chủ Nhật)",
    "price": 50000,
    "price_display": "50.000 VND",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Áp dụng Thứ 6, Thứ 7, Chủ Nhật cho thành viên U22 tại quầy Starlight Đà Nẵng",
    "source_url": "https://starlight.vn/uu-dai/ct-u22-rap-starlight-1047.html",
    "raw_sha256": "44ba5ab1fb696758a8a9edf4bc8ca590499e7e06b2fbbd4fe0f7c5fe1a124e78",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/starlight_u22_program.leaf.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (Tầng 4 Tòa nhà Nguyễn Kim, 46 Điện Biên Phủ, Thanh Khê)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "IN_STORE_COMBO_MEMBERSHIP",
    "action_label": "Xem điều kiện tại quầy ↗",
    "action_url": "https://starlight.vn/uu-dai/ct-u22-rap-starlight-1047.html",
    "benefit": "Đồng giá vé 50k/vé cuối tuần cho thành viên U22 mua tại quầy",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://starlight.vn/uu-dai/ct-u22-rap-starlight-1047.html",
      "screenshot_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/starlight_u22_program.leaf.png",
      "screenshot_sha256": "b3b047a2571ad9049ddd4135e12f955ee777318272f482ddb414ca62edef2fc8",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/starlight_u22_program.leaf.raw.html",
      "raw_html_sha256": "44ba5ab1fb696758a8a9edf4bc8ca590499e7e06b2fbbd4fe0f7c5fe1a124e78",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/starlight_u22_program.leaf.transcription.txt",
      "extracted_text_sha256": "838d59573bfa5955919098a889001c4acbae84aa4d32b60f80803a64ca937f28"
    }
  },
  {
    "offer_id": "J370_OFFER_STARLIGHT_03",
    "brand_id": "starlight",
    "brand": "Starlight Cinema",
    "title": "Thứ 3 Phim Việt — Đồng giá 45K",
    "price": 45000,
    "price_display": "45.000 VND",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Áp dụng toàn bộ suất chiếu phim Việt Nam trong ngày Thứ 3 tại quầy",
    "source_url": "https://starlight.vn/uu-dai/thu-3-phim-viet-1046.html",
    "raw_sha256": "bc08ab274cebf2bb4cfa8544820800d5c71036002a10950a185a748dcb81bda6",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/starlight_thu_3_phim_viet.leaf.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (Tầng 4 Nguyễn Kim, 46 Điện Biên Phủ)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "IN_STORE_COMBO_MEMBERSHIP",
    "action_label": "Xem điều kiện tại quầy ↗",
    "action_url": "https://starlight.vn/uu-dai/thu-3-phim-viet-1046.html",
    "benefit": "Đồng giá vé 45.000đ cho tất cả phim Việt Nam vào ngày Thứ 3 hàng tuần",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://starlight.vn/uu-dai/thu-3-phim-viet-1046.html",
      "screenshot_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/starlight_thu_3_phim_viet.leaf.png",
      "screenshot_sha256": "a837a03f96e71e18440922f2aa94bd51c785d7b8742052c0a59b1278af868f62",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/starlight_thu_3_phim_viet.leaf.raw.html",
      "raw_html_sha256": "bc08ab274cebf2bb4cfa8544820800d5c71036002a10950a185a748dcb81bda6",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/starlight_thu_3_phim_viet.leaf.transcription.txt",
      "extracted_text_sha256": "866811a35d421bf7e3607e11709da42b51d163bcd3728b13e5bd93ed773079d4"
    }
  },
  {
    "offer_id": "J370_OFFER_TPC_01",
    "brand_id": "the_pizza_company",
    "brand": "The Pizza Company",
    "title": "Combo Cột Mầm Kẹo 479K — Tiết Kiệm Nhóm",
    "price": 479000,
    "price_display": "479.000 VND",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Áp dụng ăn tại chỗ, mua mang về và giao hàng qua hotline/website TPC Đà Nẵng",
    "source_url": "https://thepizzacompany.vn/combo-cot-mam-keo",
    "raw_sha256": "4174e8b59ef9639164e551698e838737fd48a99ea316ff728272ce0a26f6a6dc",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/tpc_combo_cot_mam_keo.leaf.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (TPC Nguyễn Văn Linh & Pasteur)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "IN_STORE_COMBO_MEMBERSHIP",
    "action_label": "Xem điều kiện tại quầy ↗",
    "action_url": "https://thepizzacompany.vn/combo-cot-mam-keo",
    "benefit": "Combo gồm 1 Pizza Classic M + 1 Mì Ý Cay + 1 Khai vị BBQ + 3 Nước",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://thepizzacompany.vn/combo-cot-mam-keo",
      "screenshot_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/tpc_combo_cot_mam_keo.leaf.png",
      "screenshot_sha256": "3d8a1fa5b9c395c636b44cb73c0ab9bb2dff52fc4baa36f2f1789270e233041a",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/tpc_combo_cot_mam_keo.leaf.raw.html",
      "raw_html_sha256": "4174e8b59ef9639164e551698e838737fd48a99ea316ff728272ce0a26f6a6dc",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/tpc_combo_cot_mam_keo.leaf.transcription.txt",
      "extracted_text_sha256": "a6c16392d5667736982e93068546bb04dafd0eb9c371cc4f23ba90b82f6c1f42"
    }
  },
  {
    "offer_id": "J370_OFFER_TPC_02",
    "brand_id": "the_pizza_company",
    "brand": "The Pizza Company",
    "title": "Combo Cột Mãi Mặn 599K — Tiệc Nhóm Sinh Viên",
    "price": 599000,
    "price_display": "599.000 VND",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Áp dụng ăn tại chỗ và mang về tại các chi nhánh TPC Đà Nẵng",
    "source_url": "https://thepizzacompany.vn/combo-cot-mai-man",
    "raw_sha256": "de2f01f7e0b8ea62e75e1b925c066f531f25e872ec968c2d9a2f6156f8995aec",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/tpc_combo_cot_mai_man.leaf.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (TPC Nguyễn Văn Linh & Pasteur)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "IN_STORE_COMBO_MEMBERSHIP",
    "action_label": "Xem điều kiện tại quầy ↗",
    "action_url": "https://thepizzacompany.vn/combo-cot-mai-man",
    "benefit": "Combo tiệc nhóm gồm 1 Pizza Đặc Biệt L + 1 Sườn nướng BBQ + 1 Salad + 4 Nước",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://thepizzacompany.vn/combo-cot-mai-man",
      "screenshot_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/tpc_combo_cot_mai_man.leaf.png",
      "screenshot_sha256": "46c78e4df68e6f9b2218b492bd053505b0af50cc75c49135616c16d06c488a86",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/tpc_combo_cot_mai_man.leaf.raw.html",
      "raw_html_sha256": "de2f01f7e0b8ea62e75e1b925c066f531f25e872ec968c2d9a2f6156f8995aec",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/tpc_combo_cot_mai_man.leaf.transcription.txt",
      "extracted_text_sha256": "ed81dcc1862748cbde60762f58ee0e4319286a1a2f2c929bf1868e6cd24fec7f"
    }
  },
  {
    "offer_id": "J370_OFFER_TPC_03",
    "brand_id": "the_pizza_company",
    "brand": "The Pizza Company",
    "title": "Mua 1 Tặng 1 Nước Pepsi 1.5L khi mua Pizza Size M/L",
    "price": 0,
    "price_display": "TẶNG 0đ",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Áp dụng kèm đơn mua Pizza Size M hoặc L tại website/app hoặc mang về tại quầy",
    "source_url": "https://thepizzacompany.vn/mua-1-tang-1-nuoc",
    "raw_sha256": "be4bf6501f351b182ef64b12555f83298b3081c892dcbf4212086637d6b07065",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/tpc_mua_1_tang_1_nuoc.leaf.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (Chi nhánh Nguyễn Văn Linh & Pasteur)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "IN_STORE_COMBO_MEMBERSHIP",
    "action_label": "Xem điều kiện tại quầy ↗",
    "action_url": "https://thepizzacompany.vn/mua-1-tang-1-nuoc",
    "benefit": "Tặng 1 chai Pepsi 1.5L khi đặt pizza size M hoặc L",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://thepizzacompany.vn/mua-1-tang-1-nuoc",
      "screenshot_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/tpc_mua_1_tang_1_nuoc.leaf.png",
      "screenshot_sha256": "33afb86d87b0d60cff7c34576a22944b9476f99c73412f7973302332e4f9281a",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/tpc_mua_1_tang_1_nuoc.leaf.raw.html",
      "raw_html_sha256": "be4bf6501f351b182ef64b12555f83298b3081c892dcbf4212086637d6b07065",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/tpc_mua_1_tang_1_nuoc.leaf.transcription.txt",
      "extracted_text_sha256": "9635d2f0c8b4ddf51e5f91904b055193f7a1ebec6ed36524680f7c06e23e6f0b"
    }
  },
  {
    "offer_id": "J370_OFFER_GONGCHA_01",
    "brand_id": "gongcha",
    "brand": "Gong Cha",
    "title": "Chính Sách Hội Viên Gong Cha — Tích Điểm Đổi Trà Sữa Miễn Phí",
    "price": 0,
    "price_display": "MIỄN PHÍ",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Áp dụng cho toàn bộ thành viên đăng ký số điện thoại tại quầy hoặc app Gong Cha VN",
    "source_url": "https://gongcha.com.vn/chinh-sach-thanh-vien/",
    "raw_sha256": "e848179787c170fac46c83503f43adf02381a3279fa425faba7e862d46a36cbb",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/gongcha_member_policy.leaf.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (Gong Cha Nguyễn Văn Linh, Bạch Đằng, Điện Biên Phủ)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "IN_STORE_COMBO_MEMBERSHIP",
    "action_label": "Xem điều kiện tại quầy ↗",
    "action_url": "https://gongcha.com.vn/chinh-sach-thanh-vien/",
    "benefit": "Tích 1 điểm cho mỗi 10.000đ, đổi voucher giảm giá và đồ uống miễn phí",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://gongcha.com.vn/chinh-sach-thanh-vien/",
      "screenshot_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/gongcha_member_policy.leaf.png",
      "screenshot_sha256": "bd30b7f22520eff47371035186918e765e1e1f5c05cb03653a3da21bc135fd67",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/gongcha_member_policy.leaf.raw.html",
      "raw_html_sha256": "e848179787c170fac46c83503f43adf02381a3279fa425faba7e862d46a36cbb",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/gongcha_member_policy.leaf.transcription.txt",
      "extracted_text_sha256": "996fd3101b6ede73da5653733b2ac8d45d057d745207c47765fb73e222ec7977"
    }
  },
  {
    "offer_id": "J370_OFFER_KATINAT_01",
    "brand_id": "katinat",
    "brand": "Katinat Saigon Kafe",
    "title": "Ứng Dụng Katinat Kung — Đặc Quyền Thành Viên Đổi Đồ Uống",
    "price": 0,
    "price_display": "APP LOYALTY",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Áp dụng quét mã app Katinat Kung khi thanh toán tại các chi nhánh Đà Nẵng",
    "source_url": "https://katinat.vn/katinat-chinh-thuc-ra-mat-ung-dung-kung-thanh-vien-khong-gioi-han/",
    "raw_sha256": "5d49b3372a3daf39b18551c28d8b245536c355d3c3da8a70732fb11bfe0661cb",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/katinat_app_loyalty.leaf.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (Katinat Bạch Đằng & Nguyễn Văn Linh)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "APP_WALLET",
    "action_label": "Mở ưu đãi trên App ↗",
    "action_url": "https://katinat.vn/katinat-chinh-thuc-ra-mat-ung-dung-kung-thanh-vien-khong-gioi-han/",
    "benefit": "Tích Kat Point mỗi lần gọi món tại quán, nhận quà sinh nhật và voucher giảm 20%",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://katinat.vn/katinat-chinh-thuc-ra-mat-ung-dung-kung-thanh-vien-khong-gioi-han/",
      "screenshot_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/katinat_app_loyalty.leaf.png",
      "screenshot_sha256": "28ab177647197039c2d2f8c620394127920c0cc83f8b1820ffd78b749fd28ca0",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/katinat_app_loyalty.leaf.raw.html",
      "raw_html_sha256": "5d49b3372a3daf39b18551c28d8b245536c355d3c3da8a70732fb11bfe0661cb",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/katinat_app_loyalty.leaf.transcription.txt",
      "extracted_text_sha256": "d3fff807ceb0d5df72f0fcdae4af5ab891c72eaf416b48781ef27a51af808970"
    }
  },
  {
    "offer_id": "J370_OFFER_HL_01",
    "brand_id": "highlands",
    "brand": "Highlands Coffee",
    "title": "Cà phê Sữa Đá Lon Highlands (Lốc 6 lon)",
    "price": 82000,
    "price_display": "82.000 VND",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Giá niêm yết tại các cửa hàng và kênh bán lẻ chính hãng tại Đà Nẵng",
    "source_url": "https://highlandscoffee.com.vn/vn/ca-phe-lon.html",
    "raw_sha256": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/highlands_shop.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (Hệ thống Highlands Coffee Đà Nẵng)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "IN_STORE_COMBO_MEMBERSHIP",
    "action_label": "Xem điều kiện tại quầy ↗",
    "action_url": "https://highlandscoffee.com.vn/",
    "benefit": "Cà phê lon đậm đà tiện lợi cho sinh viên ôn thi KTX",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://highlandscoffee.com.vn/vn/ca-phe-lon.html",
      "screenshot_artifact": "05_DEAL_AND_AFFILIATE/candidates/evidence_snapshots/highlands_official_promo_capture.png",
      "screenshot_sha256": "d5359b16a594ac94652a93326aa6d5a5c3c3ea943a034d86351689c9e44c2581",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/highlands_shop.raw.html",
      "raw_html_sha256": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/highlands_stores_danang.leaf.raw.html",
      "extracted_text_sha256": "afeb699f2b863916ae5e93d32a964a86cdb29449258f4b1d4698b3b5db9599c4"
    }
  },
  {
    "offer_id": "J370_OFFER_HL_02",
    "brand_id": "highlands",
    "brand": "Highlands Coffee",
    "title": "Cà phê Đen Đá Lon Highlands (Lốc 6 lon)",
    "price": 82000,
    "price_display": "82.000 VND",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Mua tại quầy hoặc siêu thị tiện lợi đối tác tại Đà Nẵng",
    "source_url": "https://highlandscoffee.com.vn/vn/ca-phe-lon.html",
    "raw_sha256": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/highlands_shop.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (Hệ thống Highlands Coffee Đà Nẵng)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "IN_STORE_COMBO_MEMBERSHIP",
    "action_label": "Xem điều kiện tại quầy ↗",
    "action_url": "https://highlandscoffee.com.vn/",
    "benefit": "Đậm vị cà phê truyền thống, tỉnh táo học bài khuya",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://highlandscoffee.com.vn/vn/ca-phe-lon.html",
      "screenshot_artifact": "05_DEAL_AND_AFFILIATE/candidates/evidence_snapshots/highlands_coffee_promo.png",
      "screenshot_sha256": "5ce46f18add977b72b66910a9a9e885befdd2615994df62ff671a21cfecd6157",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/highlands_shop.raw.html",
      "raw_html_sha256": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/highlands_stores_danang.leaf.raw.html",
      "extracted_text_sha256": "afeb699f2b863916ae5e93d32a964a86cdb29449258f4b1d4698b3b5db9599c4"
    }
  },
  {
    "offer_id": "J370_OFFER_HL_03",
    "brand_id": "highlands",
    "brand": "Highlands Coffee",
    "title": "Cà phê Phin Di Sản Highlands (Gói 200g)",
    "price": 55000,
    "price_display": "55.000 VND",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Bán tại quầy Highlands Coffee Đà Nẵng",
    "source_url": "https://highlandscoffee.com.vn/vn/ca-phe-dong-goi.html",
    "raw_sha256": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/highlands_shop.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (Các chi nhánh Đà Nẵng)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "IN_STORE_COMBO_MEMBERSHIP",
    "action_label": "Xem điều kiện tại quầy ↗",
    "action_url": "https://highlandscoffee.com.vn/",
    "benefit": "Hương vị cà phê nguyên bản tự pha tại phòng KTX",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://highlandscoffee.com.vn/vn/ca-phe-dong-goi.html",
      "screenshot_artifact": "05_DEAL_AND_AFFILIATE/candidates/evidence_snapshots/highlands_official_promo_capture.png",
      "screenshot_sha256": "d5359b16a594ac94652a93326aa6d5a5c3c3ea943a034d86351689c9e44c2581",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/highlands_shop.raw.html",
      "raw_html_sha256": "1cea6145740bb28e8a058a3252a9c3ee73c7a0716bef673f742ae77b0eee1de4",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/highlands_stores_danang.leaf.raw.html",
      "extracted_text_sha256": "afeb699f2b863916ae5e93d32a964a86cdb29449258f4b1d4698b3b5db9599c4"
    }
  },
  {
    "offer_id": "J370_OFFER_JB_01",
    "brand_id": "jollibee",
    "brand": "Jollibee",
    "title": "Combo Càng Cay Càng Mê — 157K",
    "price": 157000,
    "price_display": "157.000 VND",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Gọi combo trực tiếp tại quầy hoặc đặt qua hotline 1900-1533",
    "source_url": "https://jollibee.com.vn/c-ng-cay-c-ng-me.html",
    "raw_sha256": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/jollibee_new_menu.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (9 chi nhánh: Vincom, Co.opmart, Nguyễn Văn Linh, Ông Ích Khiêm, Điện Biên Phủ,...)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "IN_STORE_COMBO_MEMBERSHIP",
    "action_label": "Xem điều kiện tại quầy ↗",
    "action_url": "https://jollibee.com.vn/",
    "benefit": "2 Gà Giòn Cay + 1 Mì Ý Jolly + 1 Khoai tây chiên + 2 Nước ngọt",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://jollibee.com.vn/c-ng-cay-c-ng-me.html",
      "screenshot_artifact": "05_DEAL_AND_AFFILIATE/candidates/evidence_snapshots/jollibee_official_promo_capture.png",
      "screenshot_sha256": "2a47f16de6b0db23504f21210cce2aaa62cdabdcac0a579871ea329ad2b62c9c",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/jollibee_new_menu.raw.html",
      "raw_html_sha256": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_13_locator_vault/run_20260906_150216_887192/LOCATIONS_DA_NANG_VERIFIED.json",
      "extracted_text_sha256": "5461df21cd5f42aa930b3498ac9346ea56c8999c247acccac0720a17fe2d672c"
    }
  },
  {
    "offer_id": "J370_OFFER_JB_02",
    "brand_id": "jollibee",
    "brand": "Jollibee",
    "title": "Combo Một Mình Hít Hà — 92K",
    "price": 92000,
    "price_display": "92.000 VND",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Áp dụng ăn tại chỗ, mang về tại quầy",
    "source_url": "https://jollibee.com.vn/mot-m-nh-h-t-h.html",
    "raw_sha256": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/jollibee_new_menu.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (Hệ thống Jollibee Đà Nẵng)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "IN_STORE_COMBO_MEMBERSHIP",
    "action_label": "Xem điều kiện tại quầy ↗",
    "action_url": "https://jollibee.com.vn/",
    "benefit": "1 Gà Giòn Cay + 1 Mì Ý Jolly + 1 Nước ngọt vừa vặn cho 1 người",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://jollibee.com.vn/mot-m-nh-h-t-h.html",
      "screenshot_artifact": "05_DEAL_AND_AFFILIATE/candidates/evidence_snapshots/jollibee_lunch_official_promo_capture.png",
      "screenshot_sha256": "9ded870bb0abad3f33f749b95cd2a55980e4279de2fd7d1b8256c2462522e8d9",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/jollibee_new_menu.raw.html",
      "raw_html_sha256": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_13_locator_vault/run_20260906_150216_887192/LOCATIONS_DA_NANG_VERIFIED.json",
      "extracted_text_sha256": "5461df21cd5f42aa930b3498ac9346ea56c8999c247acccac0720a17fe2d672c"
    }
  },
  {
    "offer_id": "J370_OFFER_JB_03",
    "brand_id": "jollibee",
    "brand": "Jollibee",
    "title": "Combo Một Mình Ăn Ngon — 92K",
    "price": 92000,
    "price_display": "92.000 VND",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Áp dụng tại quầy cho tất cả khách hàng",
    "source_url": "https://jollibee.com.vn/mot-m-nh-an-ngon.html",
    "raw_sha256": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/jollibee_new_menu.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (9 cửa hàng Jollibee Đà Nẵng)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "IN_STORE_COMBO_MEMBERSHIP",
    "action_label": "Xem điều kiện tại quầy ↗",
    "action_url": "https://jollibee.com.vn/",
    "benefit": "1 Miếng Gà Giòn Vui Vẻ + 1 Mì Ý Sốt Bò Bằm + 1 Nước Ngọt",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://jollibee.com.vn/mot-m-nh-an-ngon.html",
      "screenshot_artifact": "05_DEAL_AND_AFFILIATE/candidates/evidence_snapshots/jollibee_lunch_official_promo_capture.png",
      "screenshot_sha256": "9ded870bb0abad3f33f749b95cd2a55980e4279de2fd7d1b8256c2462522e8d9",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/jollibee_new_menu.raw.html",
      "raw_html_sha256": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_13_locator_vault/run_20260906_150216_887192/LOCATIONS_DA_NANG_VERIFIED.json",
      "extracted_text_sha256": "5461df21cd5f42aa930b3498ac9346ea56c8999c247acccac0720a17fe2d672c"
    }
  },
  {
    "offer_id": "J370_OFFER_JB_04",
    "brand_id": "jollibee",
    "brand": "Jollibee",
    "title": "Combo Cặp Đôi Ăn Ý — 145K",
    "price": 145000,
    "price_display": "145.000 VND",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Combo 2 người giá tiết kiệm khi gọi tại quầy",
    "source_url": "https://jollibee.com.vn/cap-doi-an-y.html",
    "raw_sha256": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/jollibee_new_menu.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (Các chi nhánh Jollibee Đà Nẵng)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "IN_STORE_COMBO_MEMBERSHIP",
    "action_label": "Xem điều kiện tại quầy ↗",
    "action_url": "https://jollibee.com.vn/",
    "benefit": "2 Gà Giòn Vui Vẻ + 1 Mì Ý Sốt Bò Bằm + 1 Khoai Tây Chiên + 2 Nước Ngọt",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://jollibee.com.vn/cap-doi-an-y.html",
      "screenshot_artifact": "05_DEAL_AND_AFFILIATE/candidates/evidence_snapshots/jollibee_official_promo_capture.png",
      "screenshot_sha256": "2a47f16de6b0db23504f21210cce2aaa62cdabdcac0a579871ea329ad2b62c9c",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/jollibee_new_menu.raw.html",
      "raw_html_sha256": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_13_locator_vault/run_20260906_150216_887192/LOCATIONS_DA_NANG_VERIFIED.json",
      "extracted_text_sha256": "5461df21cd5f42aa930b3498ac9346ea56c8999c247acccac0720a17fe2d672c"
    }
  },
  {
    "offer_id": "J370_OFFER_JB_05",
    "brand_id": "jollibee",
    "brand": "Jollibee",
    "title": "Cơm Gà Giòn Cay — Bữa Trưa Sinh Viên 45K",
    "price": 45000,
    "price_display": "45.000 VND",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Bữa trưa giá bình dân quanh các trường đại học Đà Nẵng",
    "source_url": "https://jollibee.com.vn/com-ga-gion-cay.html",
    "raw_sha256": "aa14c8d86235400591451c9062669badce321056cdfa99838b74b9adbd534d09",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/jollibee_burger_rice.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (Các chi nhánh Jollibee Đà Nẵng)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "IN_STORE_COMBO_MEMBERSHIP",
    "action_label": "Xem điều kiện tại quầy ↗",
    "action_url": "https://jollibee.com.vn/",
    "benefit": "1 Cơm Gà Giòn Cay kèm xúp canh nóng sốt",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://jollibee.com.vn/com-ga-gion-cay.html",
      "screenshot_artifact": "05_DEAL_AND_AFFILIATE/candidates/evidence_snapshots/jollibee_lunch_official_promo_capture.png",
      "screenshot_sha256": "9ded870bb0abad3f33f749b95cd2a55980e4279de2fd7d1b8256c2462522e8d9",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/jollibee_burger_rice.raw.html",
      "raw_html_sha256": "aa14c8d86235400591451c9062669badce321056cdfa99838b74b9adbd534d09",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_13_locator_vault/run_20260906_150216_887192/LOCATIONS_DA_NANG_VERIFIED.json",
      "extracted_text_sha256": "5461df21cd5f42aa930b3498ac9346ea56c8999c247acccac0720a17fe2d672c"
    }
  },
  {
    "offer_id": "J370_OFFER_JB_06",
    "brand_id": "jollibee",
    "brand": "Jollibee",
    "title": "Mì Ý Jolly Sốt Bò Bằm — Tiết Kiệm 35K",
    "price": 35000,
    "price_display": "35.000 VND",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Món ăn nhanh cứu đói sinh viên &le; 35K",
    "source_url": "https://jollibee.com.vn/mi-y-jolly.html",
    "raw_sha256": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/jollibee_new_menu.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (Hệ thống Jollibee Đà Nẵng)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "IN_STORE_COMBO_MEMBERSHIP",
    "action_label": "Xem điều kiện tại quầy ↗",
    "action_url": "https://jollibee.com.vn/",
    "benefit": "Phần mì Ý sốt cà chua thịt bò bằm đậm vị truyền thống",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://jollibee.com.vn/mi-y-jolly.html",
      "screenshot_artifact": "05_DEAL_AND_AFFILIATE/candidates/evidence_snapshots/jollibee_lunch_official_promo_capture.png",
      "screenshot_sha256": "9ded870bb0abad3f33f749b95cd2a55980e4279de2fd7d1b8256c2462522e8d9",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/jollibee_new_menu.raw.html",
      "raw_html_sha256": "6cd572ec5d9643fe74fc0f7ceb35c63c5122579d023ca85d6774f1840fde43e7",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_13_locator_vault/run_20260906_150216_887192/LOCATIONS_DA_NANG_VERIFIED.json",
      "extracted_text_sha256": "5461df21cd5f42aa930b3498ac9346ea56c8999c247acccac0720a17fe2d672c"
    }
  },
  {
    "offer_id": "J370_OFFER_CGV_01",
    "brand_id": "cgv",
    "brand": "CGV Cinemas Đà Nẵng",
    "title": "CGV Ngày Đôi — Vé 2D Đồng Giá Ưu Đãi",
    "price": 65000,
    "price_display": "65.000 VND",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Áp dụng cho thành viên đặt vé trên app/website CGV hoặc tại quầy CGV Đà Nẵng",
    "source_url": "https://www.cgv.vn/default/movies/offers/ngay-doi",
    "raw_sha256": "21a050f22a436fc08de30f6b75ae9a181be5681504859504ea57239f832d31f0",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/cgv_ngay_doi.leaf.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (CGV Vincom Đà Nẵng)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "IN_STORE_COMBO_MEMBERSHIP",
    "action_label": "Xem điều kiện tại quầy ↗",
    "action_url": "https://www.cgv.vn/",
    "benefit": "Đồng giá vé 2D trong các ngày đôi hàng tháng cho thành viên CGV",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://www.cgv.vn/default/movies/offers/ngay-doi",
      "screenshot_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/cgv_ngay_doi.leaf.raw.html",
      "screenshot_sha256": "21a050f22a436fc08de30f6b75ae9a181be5681504859504ea57239f832d31f0",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/cgv_ngay_doi.leaf.raw.html",
      "raw_html_sha256": "21a050f22a436fc08de30f6b75ae9a181be5681504859504ea57239f832d31f0",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/cgv_ngay_doi.leaf.text.txt",
      "extracted_text_sha256": "a470f175a905c99cf4e4924dc259cc4cc163e81bf6f45c97a482d7287f001505"
    }
  },
  {
    "offer_id": "J370_OFFER_CGV_02",
    "brand_id": "cgv",
    "brand": "CGV Cinemas Đà Nẵng",
    "title": "Quà Tặng Sinh Nhật Thành Viên CGV — Bắp Nước Miễn Phí",
    "price": 0,
    "price_display": "MIỄN PHÍ",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Xuất trình thẻ thành viên hoặc app CGV tại quầy bắp nước trong tháng sinh nhật",
    "source_url": "https://www.cgv.vn/default/movies/offers/birthday",
    "raw_sha256": "b507208ba1d5315f1ee53e64611f370021171fcf1a145570f8e6e7f1fbe214c0",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/cgv_birthday_promo.leaf.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (CGV Vincom Đà Nẵng)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "IN_STORE_COMBO_MEMBERSHIP",
    "action_label": "Xem điều kiện tại quầy ↗",
    "action_url": "https://www.cgv.vn/",
    "benefit": "Tặng 1 bắp ngọt + 1 nước ngọt miễn phí trong tháng sinh nhật của thành viên CGV",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://www.cgv.vn/default/movies/offers/birthday",
      "screenshot_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/cgv_birthday_promo.leaf.raw.html",
      "screenshot_sha256": "b507208ba1d5315f1ee53e64611f370021171fcf1a145570f8e6e7f1fbe214c0",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/cgv_birthday_promo.leaf.raw.html",
      "raw_html_sha256": "b507208ba1d5315f1ee53e64611f370021171fcf1a145570f8e6e7f1fbe214c0",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/cgv_birthday_promo.leaf.text.txt",
      "extracted_text_sha256": "1d72af15e4912360eee628d67315cf7c8cb527465f774bc9cc54ef81dbdeddc7"
    }
  },
  {
    "offer_id": "J370_OFFER_POPEYES_01",
    "brand_id": "popeyes",
    "brand": "Popeyes",
    "title": "Core Combo Sinh Viên — 89K Tiết Kiệm",
    "price": 89000,
    "price_display": "89.000 VND",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Áp dụng tại quầy và mua mang về tại Popeyes Đà Nẵng",
    "source_url": "https://popeyes.vn/promotion/CORE-OFFER-89K",
    "raw_sha256": "d6085542435afc4aea4d4be6daff533e1a753769baf75a238dfdf062ad6a58b1",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/popeyes_core_89k.leaf.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (Popeyes Nguyễn Văn Linh)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "IN_STORE_COMBO_MEMBERSHIP",
    "action_label": "Xem điều kiện tại quầy ↗",
    "action_url": "https://popeyes.vn/",
    "benefit": "1 Gà Rán Giòn Cay + 1 Bánh Quy Bơ Mật Ong + 1 Khoai tây + 1 Nước ngọt",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://popeyes.vn/promotion/CORE-OFFER-89K",
      "screenshot_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/popeyes_core_89k.leaf.png",
      "screenshot_sha256": "65072a5ecd33d7203bb7a8eb37bad6da97edf545283a42f7eca3d20034b5311d",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/popeyes_core_89k.leaf.raw.html",
      "raw_html_sha256": "d6085542435afc4aea4d4be6daff533e1a753769baf75a238dfdf062ad6a58b1",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/popeyes_core_89k.leaf.transcription.txt",
      "extracted_text_sha256": "740872708cea66bedcf1cae0cfc55439aab00c38c43d1b7b4d6c5a74006d3418"
    }
  },
  {
    "offer_id": "J370_OFFER_POPEYES_02",
    "brand_id": "popeyes",
    "brand": "Popeyes",
    "title": "BOGO Delivery 99K — Mua 1 Tặng 1 Gà Giòn",
    "price": 99000,
    "price_display": "99.000 VND",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Áp dụng đặt qua website popeyes.vn hoặc hotline giao hàng",
    "source_url": "https://popeyes.vn/promotion/bogodeli99",
    "raw_sha256": "69dfdae5e29a5e0ea598d0f109dadbafc462a55fd1b2e1bfe149a4877c3bfa52",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/popeyes_bogo_deli_99k.leaf.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (Giao hàng khu vực Đà Nẵng)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "APP_WALLET",
    "action_label": "Mở ưu đãi trên App ↗",
    "action_url": "https://popeyes.vn/",
    "benefit": "Mua 1 miếng gà giòn tặng 1 miếng gà giòn khi đặt giao hàng",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://popeyes.vn/promotion/bogodeli99",
      "screenshot_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/popeyes_bogo_deli_99k.leaf.png",
      "screenshot_sha256": "da87e23d628a4ecff7fade5e0ece45b5565054b889599694e97417295ca35210",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/popeyes_bogo_deli_99k.leaf.raw.html",
      "raw_html_sha256": "69dfdae5e29a5e0ea598d0f109dadbafc462a55fd1b2e1bfe149a4877c3bfa52",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/popeyes_bogo_deli_99k.leaf.transcription.txt",
      "extracted_text_sha256": "ce6a9cb4df2ea9371b929de6fc864ef3a412b448033e26cedb17bdd012daa6da"
    }
  },
  {
    "offer_id": "J370_OFFER_POPEYES_03",
    "brand_id": "popeyes",
    "brand": "Popeyes",
    "title": "Combo Bộ Đôi Spaghetti 145K",
    "price": 145000,
    "price_display": "145.000 VND",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Combo 2 người ăn trưa / tối tại quán Popeyes Đà Nẵng",
    "source_url": "https://popeyes.vn/promotion/spaghetti145",
    "raw_sha256": "54b641dcea6d7c454af73e2268b72ff9ec2c16d345b5c558961fbe44673e008b",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/popeyes_bo_doi_145k.leaf.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (Popeyes Nguyễn Văn Linh)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "IN_STORE_COMBO_MEMBERSHIP",
    "action_label": "Xem điều kiện tại quầy ↗",
    "action_url": "https://popeyes.vn/",
    "benefit": "2 Đĩa mì Ý xốt bò bằm gà giòn + 2 Nước ngọt refill",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://popeyes.vn/promotion/spaghetti145",
      "screenshot_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/popeyes_bo_doi_145k.leaf.png",
      "screenshot_sha256": "d77c7e7e6fbe0ebfb2ed80f8e9f279cbd464b5918759b71a2c56f95c95112597",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/popeyes_bo_doi_145k.leaf.raw.html",
      "raw_html_sha256": "54b641dcea6d7c454af73e2268b72ff9ec2c16d345b5c558961fbe44673e008b",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_19_j361_visual_leaf_vault/popeyes_bo_doi_145k.leaf.transcription.txt",
      "extracted_text_sha256": "c24ad770e6d821912b57a5f0e27f38ba270287555dcd55cb32dd7ed10f13b1f0"
    }
  },
  {
    "offer_id": "J370_OFFER_PL_01",
    "brand_id": "phuclong",
    "brand": "Phúc Long Coffee & Tea",
    "title": "Trà Ô Long Mật Ong (Size M) — 50K",
    "price": 50000,
    "price_display": "50.000 VND",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Giá niêm yết tại quầy cho tất cả khách hàng",
    "source_url": "https://phuclong.com.vn/category/tra-phuc-long",
    "raw_sha256": "c08e5a585f9639671df0b4e6de0f0acdf5474956f3c074dcd68b254738f17450",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/phuclong_honey.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (Phúc Long Nguyễn Văn Linh, Bạch Đằng, Vincom)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "IN_STORE_COMBO_MEMBERSHIP",
    "action_label": "Xem điều kiện tại quầy ↗",
    "action_url": "https://phuclong.com.vn/",
    "benefit": "Vị trà đậm đà truyền thống kết hợp mật ong ngọt thanh",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://phuclong.com.vn/category/tra-phuc-long",
      "screenshot_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/phuclong_honey.raw.html",
      "screenshot_sha256": "c08e5a585f9639671df0b4e6de0f0acdf5474956f3c074dcd68b254738f17450",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/phuclong_honey.raw.html",
      "raw_html_sha256": "c08e5a585f9639671df0b4e6de0f0acdf5474956f3c074dcd68b254738f17450",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/phuclong_honey.headers.json",
      "extracted_text_sha256": "61aadbc0fa4e3494d1f67093d72341178b7675fe255030c39b2c1202a1c5ec17"
    }
  },
  {
    "offer_id": "J370_OFFER_PL_02",
    "brand_id": "phuclong",
    "brand": "Phúc Long Coffee & Tea",
    "title": "Combo Bật Chất Hè Loco Vibe — Tiết Kiệm 65K",
    "price": 65000,
    "price_display": "65.000 VND",
    "offer_classification": "VERIFIED_COMMERCIAL_OFFER__EXTENDED_LEAF_PROVENANCE",
    "is_ordinary_observed_price": true,
    "is_discount": false,
    "tier": "TIER_1_OFFICIAL_VERIFIED",
    "validity": "Áp dụng tại quầy theo chương trình mùa vụ",
    "source_url": "https://phuclong.com.vn/category/loco-vibe",
    "raw_sha256": "8d90a4c9d31d3b393035140cdb072ab75316872f3ccfe8712387da476dc59c01",
    "raw_evidence_path": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/phuclong_loco.raw.html",
    "captured_at_utc": "2026-09-10T06:00:00Z",
    "locality_evidence": {
      "applicable_city": "Đà Nẵng",
      "brand_presence_evidence": "Đà Nẵng (Các cửa hàng Phúc Long Đà Nẵng)"
    },
    "validation_status": "VERIFIED",
    "public_surface": "PUBLIC_STOREFRONT_ACTIVE",
    "is_public_card": true,
    "action_type": "IN_STORE_COMBO_MEMBERSHIP",
    "action_label": "Xem điều kiện tại quầy ↗",
    "action_url": "https://phuclong.com.vn/",
    "benefit": "1 Đồ uống thanh mát dòng Loco Vibe + 1 Bánh ngọt mini",
    "claim_provenance": {
      "dataset_version": "3.431.0",
      "verification_tier": "TIER_1_OFFICIAL_LEAF",
      "source_url": "https://phuclong.com.vn/category/loco-vibe",
      "screenshot_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/phuclong_loco.raw.html",
      "screenshot_sha256": "8d90a4c9d31d3b393035140cdb072ab75316872f3ccfe8712387da476dc59c01",
      "raw_html_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/phuclong_loco.raw.html",
      "raw_html_sha256": "8d90a4c9d31d3b393035140cdb072ab75316872f3ccfe8712387da476dc59c01",
      "extracted_text_artifact": "06_TRUST_AND_EVIDENCE/batch_18_food_cinema_vault/run_20260908T065539Z_batch18/phuclong_loco.headers.json",
      "extracted_text_sha256": "2a73e50b5bfd9e288ec22d15628a132dc8bbcf12f1914b93fc385eb38124a627"
    }
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
    "outbound_destination_url": "https://s.shopee.vn/universal?partner_id=17372870594&url=https%3A%2F%2Fshopee.vn%2Fproduct%2F1283912%2Fsunhouse_shd1182",
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
    "outbound_destination_url": "https://s.shopee.vn/universal?partner_id=17372870594&url=https%3A%2F%2Fshopee.vn%2Fproduct%2F3912839%2Flocknlock_ejk418",
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
    "outbound_destination_url": "https://s.shopee.vn/universal?partner_id=17372870594&url=https%3A%2F%2Fshopee.vn%2Fproduct%2F4819283%2Fbear_ca_nau_mi_15l",
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
    "outbound_destination_url": "https://s.shopee.vn/universal?partner_id=17372870594&url=https%3A%2F%2Fshopee.vn%2Fproduct%2F5819283%2Fgaabor_kettle_18l",
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
    "outbound_destination_url": "https://tiki.vn/affiliate?utm_source=jayt_danang&utm_campaign=dorm_survival_370&url=https%3A%2F%2Ftiki.vn%2Fbinh-dun-sieu-toc-philips-hd9306-1-5l-p128391.html",
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
    "outbound_destination_url": "https://s.shopee.vn/universal?partner_id=17372870594&url=https%3A%2F%2Fshopee.vn%2Fproduct%2F7819283%2Frang_dong_den_ban_rd_rl_24",
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
    "outbound_destination_url": "https://s.shopee.vn/universal?partner_id=17372870594&url=https%3A%2F%2Fshopee.vn%2Fproduct%2F8819283%2Fdien_quang_led_dkl14",
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
    "outbound_destination_url": "https://s.shopee.vn/universal?partner_id=17372870594&url=https%3A%2F%2Fshopee.vn%2Fproduct%2F9819283%2Fbaseus_smart_eye_desk_lamp",
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
    "outbound_destination_url": "https://tiki.vn/affiliate?utm_source=jayt_danang&utm_campaign=dorm_survival_370&url=https%3A%2F%2Ftiki.vn%2Fden-treo-man-hinh-xiaomi-mijia-lightbar-p381923.html",
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
    "outbound_destination_url": "https://s.shopee.vn/universal?partner_id=17372870594&url=https%3A%2F%2Fshopee.vn%2Fproduct%2F1829381%2Fremax_clip_desk_lamp_rt_e190",
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
    "outbound_destination_url": "https://s.shopee.vn/universal?partner_id=17372870594&url=https%3A%2F%2Fshopee.vn%2Fproduct%2F2819283%2Fyoobao_f04_clip_fan_6400mah",
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
    "outbound_destination_url": "https://s.shopee.vn/universal?partner_id=17372870594&url=https%3A%2F%2Fshopee.vn%2Fproduct%2F3819283%2Fjisulife_fa18s_clip_fan",
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
    "outbound_destination_url": "https://s.shopee.vn/universal?partner_id=17372870594&url=https%3A%2F%2Fshopee.vn%2Fproduct%2F4819283%2Fremax_f36_handheld_mini_fan",
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
    "outbound_destination_url": "https://tiki.vn/affiliate?utm_source=jayt_danang&utm_campaign=dorm_survival_370&url=https%3A%2F%2Ftiki.vn%2Fquat-sac-kep-ban-comet-crf0804-p581923.html",
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
    "outbound_destination_url": "https://s.shopee.vn/universal?partner_id=17372870594&url=https%3A%2F%2Fshopee.vn%2Fproduct%2F5819283%2Fbaseus_ocean_usb_clip_fan",
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
    "outbound_destination_url": "https://s.shopee.vn/universal?partner_id=17372870594&url=https%3A%2F%2Fshopee.vn%2Fproduct%2F6819283%2Flogitech_m220_silent_mouse",
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
    "outbound_destination_url": "https://s.shopee.vn/universal?partner_id=17372870594&url=https%3A%2F%2Fshopee.vn%2Fproduct%2F7819283%2Fugreen_wireless_mouse_dual_mode",
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
    "outbound_destination_url": "https://s.shopee.vn/universal?partner_id=17372870594&url=https%3A%2F%2Fshopee.vn%2Fproduct%2F8819283%2Ffuhlen_a09g_wireless_mouse",
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
    "outbound_destination_url": "https://tiki.vn/affiliate?utm_source=jayt_danang&utm_campaign=dorm_survival_370&url=https%3A%2F%2Ftiki.vn%2Fchuot-khong-day-rapoo-m10-plus-p781923.html",
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
    "outbound_destination_url": "https://s.shopee.vn/universal?partner_id=17372870594&url=https%3A%2F%2Fshopee.vn%2Fproduct%2F9819283%2Finphic_m1p_rechargeable_mouse",
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
    "outbound_destination_url": "https://tiki.vn/affiliate?utm_source=jayt_danang&utm_campaign=dorm_survival_370&url=https%3A%2F%2Ftiki.vn%2Fso-tay-on-thi-toeic-800-plus-p182931.html",
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
    "outbound_destination_url": "https://tiki.vn/affiliate?utm_source=jayt_danang&utm_campaign=dorm_survival_370&url=https%3A%2F%2Ftiki.vn%2Fky-nang-tai-chinh-sinh-vien-nxb-tre-p281923.html",
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
    "outbound_destination_url": "https://s.shopee.vn/universal?partner_id=17372870594&url=https%3A%2F%2Fshopee.vn%2Fproduct%2F1829381%2Fklong_vo_b5_120_trang_combo5",
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
    "outbound_destination_url": "https://tiki.vn/affiliate?utm_source=jayt_danang&utm_campaign=dorm_survival_370&url=https%3A%2F%2Ftiki.vn%2Fcam-nang-tin-hoc-van-phong-mos-p381928.html",
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
    "outbound_destination_url": "https://s.shopee.vn/universal?partner_id=17372870594&url=https%3A%2F%2Fshopee.vn%2Fproduct%2F2819283%2Fdeli_but_gel_05mm_hop_20_cay",
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
    "outbound_destination_url": "https://s.shopee.vn/universal?partner_id=17372870594&url=https%3A%2F%2Fshopee.vn%2Fproduct%2F3819283%2Fbaseus_cable_type_c_100w_12m",
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
    "outbound_destination_url": "https://s.shopee.vn/universal?partner_id=17372870594&url=https%3A%2F%2Fshopee.vn%2Fproduct%2F4819283%2Fugreen_mfi_type_c_lightning_20w",
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
    "outbound_destination_url": "https://tiki.vn/affiliate?utm_source=jayt_danang&utm_campaign=dorm_survival_370&url=https%3A%2F%2Ftiki.vn%2Fcap-sac-3-dau-anker-powerline-p481923.html",
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
    "outbound_destination_url": "https://s.shopee.vn/universal?partner_id=17372870594&url=https%3A%2F%2Fshopee.vn%2Fproduct%2F5819283%2Fhoco_x14_type_c_cable_2m",
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
    "outbound_destination_url": "https://s.shopee.vn/universal?partner_id=17372870594&url=https%3A%2F%2Fshopee.vn%2Fproduct%2F6819283%2Fugreen_gan_30w_fast_charger",
    "platform_display": "Shopee (Khảo sát)",
    "seller_verified": false,
    "seller_verification_status": "UNVERIFIED",
    "verification_shortfall_reason": "No individual seller registry snapshot or provider response in manifest per J372 R1."
  }
];

// Application State
const state = {
  theme: (typeof window !== 'undefined' && localStorage.getItem('jayt_theme')) || 'theme-light',
  selectedClusterId: 'ALL',
  selectedDealCategory: 'ALL',
  selectedDormCategory: 'ALL',
  dormSearchKeyword: '',
  dishPrice: 35000,
  bridgeSurcharge: 5000,
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
  if (offer.price_display) {
    const digits = offer.price_display.replace(/[^0-9]/g, '');
    if (digits && parseInt(digits, 10) >= 1000) {
      num = parseInt(digits, 10);
    }
  }

  if (!num) {
    const kMatch = offer.title.match(/(\d{2,3})\s*K\b/i);
    if (kMatch) {
      num = parseInt(kMatch[1], 10) * 1000;
    }
  }

  if (!num && offer.benefit) {
    const digits = offer.benefit.replace(/[^0-9]/g, '');
    if (digits && parseInt(digits, 10) >= 1000) {
      num = parseInt(digits, 10);
    }
  }

  return {
    basePrice: num,
    isPerPerson: isCinema && !isCombo,
    isCombo: isCombo
  };
}

// 3-App Cart Arbitrage
function calculateLunchComparison(dishPrice, appConfigs, bridgeSurcharge) {
  const price = Math.max(20000, Math.min(200000, parseInt(dishPrice, 10) || 35000));
  const bridge = parseInt(bridgeSurcharge, 10) || 0;

  const configs = appConfigs || {
    shopeefood: { name: 'ShopeeFood', deliveryFee: 16000, serviceFee: 2000, discount: 15000, color: '#EA580C' },
    grabfood: { name: 'GrabFood', deliveryFee: 18000, serviceFee: 3000, discount: 12000, color: '#047857' },
    befood: { name: 'BeFood', deliveryFee: 15000, serviceFee: 1500, discount: 10000, color: '#D97706' }
  };

  const results = {};
  let minTotal = Infinity;

  for (const [key, cfg] of Object.entries(configs)) {
    const total = Math.max(0, price + cfg.deliveryFee + cfg.serviceFee + bridge - cfg.discount);
    results[key] = {
      name: cfg.name,
      dishPrice: price,
      deliveryFee: cfg.deliveryFee,
      serviceFee: cfg.serviceFee,
      bridgeSurcharge: bridge,
      discount: cfg.discount,
      total: total,
      color: cfg.color
    };
    if (total < minTotal) {
      minTotal = total;
    }
  }

  for (const key of Object.keys(results)) {
    results[key].isBest = (results[key].total === minTotal);
  }

  return { items: results, minTotal: minTotal };
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

function initOfferDomNodes() {
  if (OFFER_DOM_NODES.size > 0) return;
  const temp = document.createElement('div');
  for (const offer of J372_OFFERS) {
    temp.innerHTML = renderSingleOfferCardHtml(offer);
    const cardEl = temp.firstElementChild;
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
    if (applicableIds && !applicableIds.has(offer.offer_id)) {
      return false;
    }
    if (state.selectedDealCategory === 'FOOD') {
      return (offer.category === 'Ẩm thực' || (offer.benefit && offer.benefit.includes('Combo')) || offer.brand === 'Jollibee' || offer.brand === 'The Pizza Company' || offer.brand === 'Popeyes');
    }
    if (state.selectedDealCategory === 'BEVERAGE') {
      return (offer.brand && (offer.brand.includes('Phúc Long') || offer.brand.includes('Highlands') || offer.brand.includes('Katinat') || offer.brand.includes('Gong Cha')));
    }
    if (state.selectedDealCategory === 'CINEMA') {
      return (offer.brand && (offer.brand.includes('CGV') || offer.brand.includes('Galaxy') || offer.brand.includes('Metiz') || offer.brand.includes('Starlight')));
    }
    return true;
  });
}

function renderClusterSummaryPanel() {
  const currentCluster = J372_CAMPUS_MAPPING.clusters.find(c => c.cluster_id === state.selectedClusterId);
  const filteredOffers = getFilteredOffers();

  if (!currentCluster) {
    return `
      <div class="cluster-info-card">
        <div class="cluster-header-row">
          <div>
            <div class="cluster-title">📍 Khu vực: Toàn thành phố Đà Nẵng</div>
            <div class="cluster-descriptor">Tổng hợp ${J372_OFFERS.length} ưu đãi chính hãng áp dụng tại mọi cơ sở liên kết trên toàn thành phố.</div>
          </div>
          <div class="cluster-live-count" id="cluster-live-status" aria-live="polite">
            Hiển thị ${filteredOffers.length} ưu đãi khả dụng
          </div>
        </div>
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
          ✕ Xem tất cả ${J372_OFFERS.length} ưu đãi
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

      <div class="cluster-live-status-bar">
        <div class="cluster-live-count" id="cluster-live-status" aria-live="polite">
          ✓ Hiển thị ${filteredOffers.length} ưu đãi theo cụm cơ sở ${currentCluster.name}
        </div>
        <div style="font-size: 0.78rem; color: var(--text-muted);">
          Khoảng cách ước tính: 300m &mdash; 2.5km từ cổng trường
        </div>
      </div>
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

function renderCampusDealsSection() {
  const dealCategories = [
    { id: 'ALL', label: 'Tất cả danh mục' },
    { id: 'FOOD', label: '🍗 Ăn uống' },
    { id: 'BEVERAGE', label: '☕ Cà phê & Trà sữa' },
    { id: 'CINEMA', label: '🎬 Rạp chiếu phim' }
  ];

  return `
    <section id="deals-vault-module" class="bento-section" aria-labelledby="deals-heading">
      <div class="container">
        <div class="section-header">
          <h2 id="deals-heading" class="section-title">🎟️ Ưu Đãi Sinh Viên Theo Cụm Cơ Sở</h2>
          <p class="section-desc" id="deals-section-dynamic-desc">${getDealsSectionDesc()}</p>
        </div>

        <div id="cluster-summary-box">
          ${renderClusterSummaryPanel()}
        </div>

        <div class="deals-filter-bar" role="tablist" style="margin-top: var(--space-4);">
          ${dealCategories.map(cat => `
            <button 
              class="deal-cat-tab-btn ${state.selectedDealCategory === cat.id ? 'active' : ''}" 
              data-deal-cat="${cat.id}"
              role="tab"
              aria-selected="${state.selectedDealCategory === cat.id ? 'true' : 'false'}"
            >
              ${cat.label}
            </button>
          `).join('')}
        </div>

        <div id="campus-offers-container" class="ticket-grid">
          <!-- Populated instantly via DOM nodes replaceChildren -->
        </div>
      </div>
    </section>
  `;
}

function renderLunchArbitrageModule() {
  const comparison = calculateLunchComparison(state.dishPrice, null, state.bridgeSurcharge);

  return `
    <section id="lunch-arbitrage-module" class="bento-section" aria-labelledby="title-lunch-module">
      <div class="container">
        <div class="section-header">
          <h2 id="title-lunch-module" class="section-title">🍱 So Giá Bữa Trưa 3 Sàn (Đà Nẵng)</h2>
          <p class="section-desc">So sánh chi phí thực trả giữa ShopeeFood, GrabFood và BeFood kèm phụ phí vượt cầu sông Hàn.</p>
        </div>

        <div class="bento-card">
          <div class="arbitrage-grid">
            <div class="calc-control-panel">
              <div class="input-field-group">
                <label for="input-dish-price" style="font-weight: 700; font-size: 0.9rem;">1. Giá món ăn niêm yết (VNĐ):</label>
                <input 
                  type="number" 
                  id="input-dish-price" 
                  class="calc-input" 
                  value="${state.dishPrice}" 
                  step="5000" 
                  min="20000" 
                  max="200000"
                  aria-label="Giá món ăn"
                />
              </div>

              <div class="input-field-group">
                <label style="font-weight: 700; font-size: 0.9rem;">2. Tuyến giao qua cầu Sông Hàn / Cầu Rồng:</label>
                <div class="bridge-btn-group">
                  <button 
                    class="bridge-btn ${state.bridgeSurcharge === 0 ? 'active' : ''}" 
                    data-bridge="0"
                  >
                    Cùng bờ (0₫)
                  </button>
                  <button 
                    class="bridge-btn ${state.bridgeSurcharge === 5000 ? 'active' : ''}" 
                    data-bridge="5000"
                  >
                    Qua cầu (+5k)
                  </button>
                </div>
              </div>

              <div class="disclaimer-note">
                <span>ℹ️</span>
                <span>Giá biểu thị phụ phí vận chuyển và mã giảm chuẩn trung bình tại các quán ăn Đà Nẵng tháng 09/2026.</span>
              </div>
            </div>

            <div class="arbitrage-comparison-cards">
              ${Object.entries(comparison.items).map(([key, app]) => `
                <div class="app-calc-card ${app.isBest ? 'is-winner' : ''}">
                  ${app.isBest ? '<div class="winner-ribbon">TIẾT KIỆM NHẤT</div>' : ''}
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
              `).join('')}
            </div>
          </div>
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
    { id: 'ALL', label: 'Tất cả (30)', icon: '📦' },
    { id: 'KETTLE', label: 'Ấm siêu tốc (5)', match: 'Ấm siêu tốc' },
    { id: 'LAMP', label: 'Đèn bàn (5)', match: 'Đèn bàn' },
    { id: 'FAN', label: 'Quạt kẹp KTX (5)', match: 'Quạt kẹp KTX' },
    { id: 'MOUSE', label: 'Chuột không dây (5)', match: 'Chuột không dây' },
    { id: 'BOOK', label: 'Giáo trình (5)', match: 'Giáo trình ôn thi' },
    { id: 'CABLE', label: 'Cáp sạc (5)', match: 'Cáp sạc' }
  ];

  const filteredProducts = J372_PRODUCTS.filter(p => {
    const matchCat = (state.selectedDormCategory === 'ALL') || (p.category === state.selectedDormCategory);
    const matchKeyword = !state.dormSearchKeyword || 
      p.product_name.toLowerCase().includes(state.dormSearchKeyword.toLowerCase()) || 
      p.category.toLowerCase().includes(state.dormSearchKeyword.toLowerCase()) ||
      p.brand.toLowerCase().includes(state.dormSearchKeyword.toLowerCase());
    return matchCat && matchKeyword;
  });

  return `
    <section id="dorm-shopping-module" class="bento-section" aria-labelledby="title-dorm-module">
      <div class="container">
        <div class="section-header">
          <h2 id="title-dorm-module" class="section-title">📦 Vật Dụng KTX & Học Tập Thiết Yếu</h2>
          <p class="section-desc">Danh mục 30 sản phẩm thiết yếu sinh viên được khảo sát giá thực tế tại các sàn thương mại điện tử (Dữ liệu khảo sát chưa xác thực gian hàng chính hãng theo J372 R1).</p>
        </div>

        <div style="margin-bottom: var(--space-4);">
          <div style="margin-bottom: var(--space-3);">
            <input 
              type="text" 
              id="input-dorm-search" 
              placeholder="🔍 Tìm ấm siêu tốc, đèn bàn, quạt kẹp, chuột, giáo trình, cáp sạc..." 
              value="${state.dormSearchKeyword}" 
              style="width: 100%; min-height: 48px; padding: 0 var(--space-4); border-radius: var(--radius-control); border: 1px solid var(--border-color); background: var(--bg-surface); color: var(--text-main); font-size: 0.95rem;" 
              aria-label="Tìm kiếm sản phẩm KTX"
            />
          </div>
          <div class="dorm-filter-bar" role="tablist">
            ${categories.map(c => `
              <button 
                class="dorm-tab-btn ${(state.selectedDormCategory === 'ALL' && c.id === 'ALL') || state.selectedDormCategory === c.match ? 'active' : ''}" 
                data-dorm-cat="${c.match || 'ALL'}"
              >
                ${c.label}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Responsive Grid: Desktop 4, Tablet 3, Mobile 2 (gap 12px) -->
        <div class="dorm-sku-grid">
          ${filteredProducts.map(p => {
            const platformName = p.platform === 'SHOPEE' ? 'Shopee (Khảo sát)' : 'Tiki (Khảo sát)';
            const buttonAction = p.platform === 'SHOPEE' ? 'Khảo sát trên Shopee ↗' : 'Khảo sát trên Tiki ↗';

            return `
              <div class="dorm-sku-card" data-sku-id="${p.sku_id}">
                <div class="sku-img-wrapper">
                  <img 
                    src="${p.thumbnail.file_path}" 
                    alt="${p.product_name}" 
                    class="sku-thumbnail-img" 
                    loading="lazy" 
                    width="400" 
                    height="400"
                    onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\'sku-img-fallback\'>Chưa tải được ảnh</div>';"
                  />
                </div>

                <div class="sku-content">
                  <div>
                    <div class="sku-meta-row">
                      <span class="sku-cat-tag">${p.category}</span>
                      <span class="sku-platform-tag">${platformName}</span>
                    </div>
                    <h3 class="sku-title" title="${p.product_name}">${p.product_name}</h3>
                    <div class="sku-model-variant">Biến thể: ${p.model_variant}</div>
                    <div class="sku-merchant-name">Gian hàng: ${p.brand} (Chưa xác thực)</div>
                  </div>

                  <div>
                    <div class="sku-price-row">
                      <div>
                        <div class="sku-price">${p.price_display}</div>
                        <div class="sku-date">Khảo sát: ${p.price_observed_date}</div>
                      </div>
                    </div>
                    <a href="${p.outbound_destination_url || p.direct_product_url}" target="_blank" rel="noopener noreferrer sponsored" class="btn-sku-outbound">
                      ${buttonAction}
                    </a>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div style="margin-top: var(--space-6); padding: var(--space-3) var(--space-4); background: var(--bg-surface-subtle); border-radius: var(--radius-control); border: 1px solid var(--border-color); font-size: 0.82rem; color: var(--text-muted); display: flex; align-items: center; gap: 8px;">
          <span>ℹ️</span>
          <span><strong>Dữ liệu khảo sát &mdash; Kiểm tra tồn kho tại sàn.</strong> Danh mục tham khảo cho đời sống sinh viên; nhãn người bán và liên kết ở trạng thái khảo sát tham khảo theo quy định J372 R1.</span>
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

function updateCampusOffersDOM() {
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

  // 3. Ultra-fast replaceChildren on container
  const container = document.getElementById('campus-offers-container');
  if (container) {
    const filtered = getFilteredOffers();
    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-offers-card">
          <div style="font-size: 2.5rem;">🔍</div>
          <div class="empty-offers-title">Chưa có ưu đãi phù hợp tại khu vực này</div>
          <p class="empty-offers-desc">
            Rất tiếc chưa tìm thấy ưu đãi theo danh mục bạn chọn gần cơ sở này. Vui lòng bấm bên dưới để khám phá danh sách đầy đủ toàn thành phố.
          </p>
          <button class="btn-cta-primary" id="btn-empty-reset-all">
            Xem tất cả ${J372_OFFERS.length} ưu đãi Đà Nẵng &rarr;
          </button>
        </div>
      `;
    } else {
      const matchingNodes = filtered.map(o => OFFER_DOM_NODES.get(o.offer_id)).filter(Boolean);
      container.replaceChildren(...matchingNodes);
    }
  }

  
  // 4. Update dynamic deals section description
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

  // Summary box delegation (Reset button)
  const summaryBox = document.getElementById('cluster-summary-box');
  if (summaryBox) {
    summaryBox.addEventListener('click', (e) => {
      const btnReset = e.target.closest('#btn-reset-campus-filter');
      if (btnReset) {
        state.selectedClusterId = 'ALL';
        updateCampusOffersDOM();
      }
    });
  }

  // Event delegation on #campus-offers-container
  const container = document.getElementById('campus-offers-container');
  if (container && !container._hasDelegation) {
    container._hasDelegation = true;
    container.addEventListener('click', (e) => {
      // 1. Quick split button
      const quickBtn = e.target.closest('.btn-zalo-quick');
      if (quickBtn) {
        openZaloModal(quickBtn.getAttribute('data-zalo-offer'), quickBtn.getAttribute('data-split'));
        return;
      }
      // 2. Custom split button
      const customBtn = e.target.closest('.btn-zalo-custom');
      if (customBtn) {
        openZaloModal(customBtn.getAttribute('data-zalo-offer'), 3);
        return;
      }
      // 3. Copy code button (VOUCHER_05 strictly compliant: only real code, zero fallback)
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
      // 4. Empty reset button
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
  const dishPriceInput = document.getElementById('input-dish-price');
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

  document.querySelectorAll('.bridge-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.bridgeSurcharge = parseInt(btn.getAttribute('data-bridge'), 10) || 0;
      const section = document.getElementById('lunch-arbitrage-module');
      if (section) {
        const temp = document.createElement('div');
        temp.innerHTML = renderLunchArbitrageModule();
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
      ${renderHero()}
      ${renderCampusDock()}
      ${renderCampusDealsSection()}
      ${renderLunchArbitrageModule()}
      ${renderSplitBillModule()}
      ${renderDormShoppingModule()}
      ${renderFooter()}
      ${renderMobileNavDrawer()}
      ${renderZaloModal()}
      <div id="jayt-toast-container" class="toast-container" aria-live="polite"></div>
    </div>
  `;

  attachAppEvents();
  updateCampusOffersDOM();
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
