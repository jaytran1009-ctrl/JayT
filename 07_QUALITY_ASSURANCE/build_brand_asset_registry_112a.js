const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const sotDir = path.join(repoRoot, '03_SOURCE_OF_TRUTH');

const registry = {
  registry_id: "JAYT_BRAND_ASSET_REGISTRY_112A",
  version: "1.0.0",
  updated_at: "2026-08-25T21:55:00+07:00",
  contract_name: "JAYT_TRUSTED_BRAND_VISUAL_ASSET_CONTRACT",
  policy: {
    zero_ai_images: true,
    zero_unapproved_crops: true,
    zero_synthetic_deals: true,
    permission_tiers: ["DISPLAY_PERMISSION_CONFIRMED", "LINK_ONLY"]
  },
  brands: {
    BRAND_STARBUCKS: {
      brand_id: "BRAND_STARBUCKS",
      brand_name: "Starbucks Coffee Vietnam",
      short_name: "Starbucks",
      domain: "starbucks.vn",
      sector: "COFFEE",
      sector_icon: "☕",
      tagline: "Cà phê hạt Arabica hảo hạng & Không gian chuẩn quốc tế",
      brand_colors: {
        primary: "#006241",
        secondary: "#1E3932",
        accent: "#047857",
        gradient_from: "#006241",
        gradient_to: "#1E3932",
        light_bg: "#ECFDF5",
        text_color: "#065F46"
      },
      logo: {
        asset_path: "assets/brand-logos/starbucks.svg",
        asset_sha256: "6bc695caf7d9e620b5a725c3f040d5165f406484967611c94bb1bcbbba18bf3e",
        format: "svg",
        display_permission: "DISPLAY_PERMISSION_CONFIRMED",
        credit: "Logo chính thức từ Starbucks Vietnam Brand Kit",
        last_verified_at: "2026-08-25T21:50:00+07:00"
      },
      media_policy: {
        default_display_permission: "LINK_ONLY",
        official_store_locator_url: "https://www.starbucks.vn/store-locator/",
        credit: "Không gian trải nghiệm xem trực tiếp tại store locator chính thức"
      },
      verified_venues_in_danang: 5
    },

    BRAND_PHELA: {
      brand_id: "BRAND_PHELA",
      brand_name: "Phê La",
      short_name: "Phê La",
      domain: "phela.vn",
      sector: "SPECIALTY_TEA",
      sector_icon: "🧋",
      tagline: "Nốt hương đặc sản Đà Lạt & Không gian cắm trại thư thái",
      brand_colors: {
        primary: "#1E3A8A",
        secondary: "#3B82F6",
        accent: "#2563EB",
        gradient_from: "#1E3A8A",
        gradient_to: "#3B82F6",
        light_bg: "#EFF6FF",
        text_color: "#1E40AF"
      },
      logo: {
        asset_path: "assets/brand-logos/phela.svg",
        asset_sha256: "045d07874b830a94bd5d4f46c982af389944e85b9fc6a53bb8f2bc2747a8d803",
        format: "svg",
        display_permission: "DISPLAY_PERMISSION_CONFIRMED",
        credit: "Logo nhận diện chính thức Phê La Vietnam",
        last_verified_at: "2026-08-25T21:50:00+07:00"
      },
      media_policy: {
        default_display_permission: "DISPLAY_PERMISSION_CONFIRMED",
        store_photo_path: "assets/official-store-photos/phela-bachdang-danang.png",
        store_photo_sha256: "b404670bec70c303c23eba620ff7ceae46641e8143ab8bf7a0b3e612c4d50e23",
        official_store_locator_url: "https://phela.vn/",
        credit: "Ảnh không gian đối soát từ hệ thống cửa hàng Phê La Bạch Đằng"
      },
      verified_venues_in_danang: 2
    },

    BRAND_GONGCHA: {
      brand_id: "BRAND_GONGCHA",
      brand_name: "Gong Cha Vietnam",
      short_name: "Gong Cha",
      domain: "gongcha.com.vn",
      sector: "MILK_TEA",
      sector_icon: "🧋",
      tagline: "Trà sữa hoàng gia & Điểm hẹn học tập trung tâm",
      brand_colors: {
        primary: "#991B1B",
        secondary: "#DC2626",
        accent: "#B91C1C",
        gradient_from: "#991B1B",
        gradient_to: "#DC2626",
        light_bg: "#FEF2F2",
        text_color: "#991B1B"
      },
      logo: {
        asset_path: "assets/brand-logos/gongcha.svg",
        asset_sha256: "55984d5f359dea76f2e094d0f53493fb8d4a518fc7bc6715e7afd2123df34d9e",
        format: "svg",
        display_permission: "DISPLAY_PERMISSION_CONFIRMED",
        credit: "Logo chính thức từ Gong Cha Vietnam Media Kit",
        last_verified_at: "2026-08-25T21:50:00+07:00"
      },
      media_policy: {
        default_display_permission: "DISPLAY_PERMISSION_CONFIRMED",
        store_photo_path: "assets/official-store-photos/gongcha-nvl-danang.png",
        store_photo_sha256: "fc813e42b7570fc5c25bb58be7073f76b16be322f902f81e2e266ee0ccb9faa7",
        official_store_locator_url: "https://gongcha.com.vn/cua-hang/",
        credit: "Ảnh cơ sở Nguyễn Văn Linh đối soát từ Gong Cha Vietnam"
      },
      verified_venues_in_danang: 1
    },

    BRAND_CGV: {
      brand_id: "BRAND_CGV",
      brand_name: "CGV Cinemas Vietnam",
      short_name: "CGV Cinemas",
      domain: "cgv.vn",
      sector: "CINEMA",
      sector_icon: "🎬",
      tagline: "Cụm rạp chiếu phim tiêu chuẩn quốc tế & Kèo tối giải trí",
      brand_colors: {
        primary: "#991B1B",
        secondary: "#E11D48",
        accent: "#BE123C",
        gradient_from: "#991B1B",
        gradient_to: "#E11D48",
        light_bg: "#FFF1F2",
        text_color: "#9F1239"
      },
      logo: {
        asset_path: "assets/brand-logos/cgv.svg",
        asset_sha256: "bc140ea5ca2365e03d28e9fd5c16f92b1e5d7a0f102da6e5535a779a0b29848e",
        format: "svg",
        display_permission: "DISPLAY_PERMISSION_CONFIRMED",
        credit: "Logo chính thức CGV Cinemas Vietnam",
        last_verified_at: "2026-08-25T21:50:00+07:00"
      },
      media_policy: {
        default_display_permission: "DISPLAY_PERMISSION_CONFIRMED",
        store_photo_path: "assets/official-store-photos/cgv-vinhtrung-danang.png",
        store_photo_sha256: "6e2a1bd0f3d2fc71c83a07cc684373fa4fee25965f0d58f0e74a3623059af6c9",
        official_store_locator_url: "https://www.cgv.vn/default/cinox/site/",
        credit: "Ảnh cụm rạp đối soát từ CGV Cinemas Vietnam"
      },
      verified_venues_in_danang: 3
    },

    BRAND_GALAXY: {
      brand_id: "BRAND_GALAXY",
      brand_name: "Galaxy Cinema Vietnam",
      short_name: "Galaxy Cinema",
      domain: "galaxycine.vn",
      sector: "CINEMA",
      sector_icon: "🎬",
      tagline: "Rạp phim sinh viên & Trải nghiệm điện ảnh trẻ trung",
      brand_colors: {
        primary: "#1D4ED8",
        secondary: "#60A5FA",
        accent: "#2563EB",
        gradient_from: "#1D4ED8",
        gradient_to: "#60A5FA",
        light_bg: "#EFF6FF",
        text_color: "#1E40AF"
      },
      logo: {
        asset_path: "assets/brand-logos/galaxy.svg",
        asset_sha256: "2ab66cfa509bd537be6ff7cac74a40777e1fb788b6ea29a45b98befd648665aa",
        format: "svg",
        display_permission: "DISPLAY_PERMISSION_CONFIRMED",
        credit: "Logo chính thức Galaxy Cinema",
        last_verified_at: "2026-08-25T21:50:00+07:00"
      },
      media_policy: {
        default_display_permission: "DISPLAY_PERMISSION_CONFIRMED",
        store_photo_path: "assets/official-store-photos/galaxy-coopmart-danang.png",
        store_photo_sha256: "85c2f49e7a8d24232014936a5e66d8339772f47edcfa209fc42a7ede005ad6eb",
        official_store_locator_url: "https://galaxycine.vn/rap-gia-ve",
        credit: "Ảnh cụm rạp đối soát từ Galaxy Cinema Co.opmart"
      },
      verified_venues_in_danang: 2
    },

    BRAND_METIZ: {
      brand_id: "BRAND_METIZ",
      brand_name: "Metiz Cinema",
      short_name: "Metiz Cinema",
      domain: "metiz.vn",
      sector: "CINEMA",
      sector_icon: "🎬",
      tagline: "Rạp phim Helio Center & Tổ hợp giải trí đêm Đà Nẵng",
      brand_colors: {
        primary: "#312E81",
        secondary: "#6366F1",
        accent: "#4F46E5",
        gradient_from: "#312E81",
        gradient_to: "#6366F1",
        light_bg: "#EEF2FF",
        text_color: "#3730A3"
      },
      logo: {
        asset_path: "assets/brand-logos/metiz.svg",
        asset_sha256: "11b8b8f07fcaebbebe0ea77402be5052d2727133a1a6f61d9c04e3cc4dc839ac",
        format: "svg",
        display_permission: "DISPLAY_PERMISSION_CONFIRMED",
        credit: "Logo chính thức Metiz Cinema Helio",
        last_verified_at: "2026-08-25T21:50:00+07:00"
      },
      media_policy: {
        default_display_permission: "DISPLAY_PERMISSION_CONFIRMED",
        store_photo_path: "assets/official-store-photos/metiz-helio-danang.png",
        store_photo_sha256: "89116d6ab0cee6a8943778eb0bcfd342c30288f9af04f39b71498df52b12ef4e",
        official_store_locator_url: "https://metiz.vn/",
        credit: "Ảnh rạp đối soát từ Metiz Cinema Đà Nẵng"
      },
      verified_venues_in_danang: 1
    },

    BRAND_STARLIGHT: {
      brand_id: "BRAND_STARLIGHT",
      brand_name: "Starlight Cinema",
      short_name: "Starlight Cinema",
      domain: "starlight.vn",
      sector: "CINEMA",
      sector_icon: "🎬",
      tagline: "Cụm rạp giải trí & Điểm hẹn xem phim Thanh Khê",
      brand_colors: {
        primary: "#B45309",
        secondary: "#F59E0B",
        accent: "#D97706",
        gradient_from: "#B45309",
        gradient_to: "#F59E0B",
        light_bg: "#FEF3C7",
        text_color: "#92400E"
      },
      logo: {
        asset_path: "assets/brand-logos/starlight.svg",
        asset_sha256: "65c27f8d5e11b627bc565b1a1ee57131048c57e4ce58cb30c2a91102099ba1b5",
        format: "svg",
        display_permission: "DISPLAY_PERMISSION_CONFIRMED",
        credit: "Logo chính thức Starlight Cinema",
        last_verified_at: "2026-08-25T21:50:00+07:00"
      },
      media_policy: {
        default_display_permission: "LINK_ONLY",
        official_store_locator_url: "https://starlight.vn/rap/da-nang.html",
        credit: "Xem chi tiết không gian cụm rạp tại website chính thức Starlight"
      },
      verified_venues_in_danang: 1
    },

    BRAND_TRUNGNGUYEN: {
      brand_id: "BRAND_TRUNGNGUYEN",
      brand_name: "Trung Nguyên E-Coffee",
      short_name: "Trung Nguyên",
      domain: "trungnguyenecoffee.com",
      sector: "COFFEE",
      sector_icon: "☕",
      tagline: "Cà phê năng lượng & Không gian làm việc, đọc sách yên tĩnh",
      brand_colors: {
        primary: "#18181B",
        secondary: "#3F3F46",
        accent: "#27272A",
        gradient_from: "#18181B",
        gradient_to: "#3F3F46",
        light_bg: "#F4F4F5",
        text_color: "#18181B"
      },
      logo: {
        asset_path: "assets/brand-logos/trungnguyen.svg",
        asset_sha256: "cb94efcdfaae1e2897be13d676041063c0d7276ad2348bda78bd748002530a0b",
        format: "svg",
        display_permission: "DISPLAY_PERMISSION_CONFIRMED",
        credit: "Logo chính thức Trung Nguyên E-Coffee",
        last_verified_at: "2026-08-25T21:50:00+07:00"
      },
      media_policy: {
        default_display_permission: "LINK_ONLY",
        official_store_locator_url: "https://trungnguyenecoffee.com/he-thong-cua-hang/",
        credit: "Xem hệ thống không gian quán tại store locator Trung Nguyên"
      },
      verified_venues_in_danang: 2
    },

    BRAND_JOLLIBEE: {
      brand_id: "BRAND_JOLLIBEE",
      brand_name: "Jollibee Vietnam",
      short_name: "Jollibee",
      domain: "jollibee.com.vn",
      sector: "FAST_FOOD",
      sector_icon: "🍗",
      tagline: "Gà giòn vui vẻ & Bữa ăn tiện lợi cho gia đình, học sinh",
      brand_colors: {
        primary: "#BE123C",
        secondary: "#F43F5E",
        accent: "#E11D48",
        gradient_from: "#BE123C",
        gradient_to: "#F43F5E",
        light_bg: "#FFF1F2",
        text_color: "#BE123C"
      },
      logo: {
        asset_path: "assets/brand-logos/jollibee.svg",
        asset_sha256: "491f8a2fb5df9e578df9ceca1f0bf4a82810c28694188ee3c33fbde11d863d37",
        format: "svg",
        display_permission: "DISPLAY_PERMISSION_CONFIRMED",
        credit: "Logo chính thức Jollibee Vietnam",
        last_verified_at: "2026-08-25T21:50:00+07:00"
      },
      media_policy: {
        default_display_permission: "DISPLAY_PERMISSION_CONFIRMED",
        store_photo_path: "assets/official-store-photos/jollibee-vincom-danang.png",
        store_photo_sha256: "63cf5b1fedc956db16a2a259810ff1d987bbf24cbaa50bd16fe0eb3a4bc99efc",
        official_store_locator_url: "https://jollibee.com.vn/cua-hang",
        credit: "Ảnh cửa hàng đối soát từ Jollibee Vincom Đà Nẵng"
      },
      verified_venues_in_danang: 9
    },

    BRAND_HIGHLANDS: {
      brand_id: "BRAND_HIGHLANDS",
      brand_name: "Highlands Coffee",
      short_name: "Highlands",
      domain: "highlandscoffee.com.vn",
      sector: "COFFEE",
      sector_icon: "☕",
      tagline: "Cà phê pha phin truyền thống & Điểm hẹn quen thuộc",
      brand_colors: {
        primary: "#831843",
        secondary: "#B91C1C",
        accent: "#9D174D",
        gradient_from: "#831843",
        gradient_to: "#B91C1C",
        light_bg: "#FDF2F8",
        text_color: "#831843"
      },
      logo: {
        asset_path: "assets/brand-logos/highlands.svg",
        asset_sha256: "c4aad8dcac70f1c3a1190e46251a49e5d5a19e101aaf29fcc7c9492c536871eb",
        format: "svg",
        display_permission: "DISPLAY_PERMISSION_CONFIRMED",
        credit: "Logo chính thức Highlands Coffee",
        last_verified_at: "2026-08-25T21:50:00+07:00"
      },
      media_policy: {
        default_display_permission: "LINK_ONLY",
        official_store_locator_url: "https://www.highlandscoffee.com.vn/vn/he-thong-cua-hang.html",
        credit: "Xem hệ thống cửa hàng tại store locator Highlands Coffee"
      },
      verified_venues_in_danang: 0
    },

    BRAND_DOMINOS: {
      brand_id: "BRAND_DOMINOS",
      brand_name: "Domino's Pizza Vietnam",
      short_name: "Domino's",
      domain: "dominos.vn",
      sector: "PIZZA",
      sector_icon: "🍕",
      tagline: "Pizza Mỹ nóng giòn & Giao hàng nhanh chuẩn 30 phút",
      brand_colors: {
        primary: "#0369A1",
        secondary: "#0284C7",
        accent: "#0284C7",
        gradient_from: "#0369A1",
        gradient_to: "#0284C7",
        light_bg: "#F0F9FF",
        text_color: "#0369A1"
      },
      logo: {
        asset_path: "assets/brand-logos/dominos.svg",
        asset_sha256: "38734d3bce51c607684989ddea31e8ac61a4d6ddbb95bf31683a33d8af3c57f8",
        format: "svg",
        display_permission: "DISPLAY_PERMISSION_CONFIRMED",
        credit: "Logo chính thức Domino's Pizza Vietnam",
        last_verified_at: "2026-08-25T21:50:00+07:00"
      },
      media_policy: {
        default_display_permission: "LINK_ONLY",
        official_store_locator_url: "https://dominos.vn/store-locations",
        credit: "Xem hệ thống chi nhánh tại store locator Domino's Pizza"
      },
      verified_venues_in_danang: 0
    }
  }
};

const registryPath = path.join(sotDir, 'brand_asset_registry.json');
fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
console.log(`✅ Đã tạo brand_asset_registry.json: ${Object.keys(registry.brands).length} thương hiệu đã đăng ký.`);
