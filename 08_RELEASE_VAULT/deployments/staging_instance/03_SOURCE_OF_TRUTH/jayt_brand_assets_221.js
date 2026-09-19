/**
 * JAYT BRAND DESIGN SYSTEM & SVG ASSETS (JAYT-221R)
 * Master Brand Wordmark, 24px Category SVGs & Strict Brand Mark / Text Identifier Classification
 */
(function(root) {
  'use strict';

  // --- 1. JAYT MASTER BRAND SVGS ---
  const JAYT_MASTER_SVGS = {
    // Full Primary Logo (Wordmark + Pin/Spark Symbol)
    logoFull: (isDark = false) => `
      <svg width="152" height="38" viewBox="0 0 152 38" fill="none" xmlns="http://www.w3.org/2000/svg" class="jayt-master-logo">
        <defs>
          <linearGradient id="jayt-grad-pin" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#10B981" />
            <stop offset="100%" stop-color="#047857" />
          </linearGradient>
          <linearGradient id="jayt-grad-spark" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#FCD34D" />
            <stop offset="100%" stop-color="#F59E0B" />
          </linearGradient>
        </defs>
        <!-- Icon: Pin + Savings Spark -->
        <g transform="translate(3, 3)">
          <rect width="32" height="32" rx="10" fill="url(#jayt-grad-pin)" />
          <path d="M16 7C12.686 7 10 9.686 10 13C10 17.5 16 25 16 25C16 25 22 17.5 22 13C22 9.686 19.314 7 16 7Z" fill="white" fill-opacity="0.25" />
          <path d="M17 10L12 16H16L15 22L20 15H16L17 10Z" fill="url(#jayt-grad-spark)" />
        </g>
        <!-- Typography: JayT Đà Nẵng -->
        <text x="44" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Inter', 'Segoe UI', sans-serif" font-weight="900" font-size="20" letter-spacing="-0.5px" fill="${isDark ? '#FFFFFF' : '#0F172A'}">Jay<tspan fill="#10B981">T</tspan></text>
        <text x="90" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Inter', 'Segoe UI', sans-serif" font-weight="700" font-size="10.5" letter-spacing="0.8px" fill="${isDark ? '#94A3B8' : '#64748B'}">ĐÀ NẴNG</text>
      </svg>
    `,

    // Compact App Icon (32x32)
    appIcon: `
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="jayt-app-icon">
        <defs>
          <linearGradient id="jayt-icon-bg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#10B981" />
            <stop offset="100%" stop-color="#047857" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="10" fill="url(#jayt-icon-bg)" />
        <path d="M17 6L11 15H16L15 24L21 14H16L17 6Z" fill="#FCD34D" />
      </svg>
    `
  };

  // --- 2. UNIFIED CATEGORY SVG ICONS (24px Box, 1.8px Stroke, Uniform Geometry, Zero Emojis) ---
  const CATEGORY_SVGS = {
    // Dining / Cứu đói trưa
    FOOD_AND_DINING: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="jayt-cat-svg">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
        <line x1="6" y1="1" x2="6" y2="4"></line>
        <line x1="10" y1="1" x2="10" y2="4"></line>
        <line x1="14" y1="1" x2="14" y2="4"></line>
      </svg>
    `,
    // Coffee & Study / Cà phê & học nhóm
    COFFEE_AND_STUDY: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="jayt-cat-svg">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
        <line x1="6" y1="2" x2="6" y2="4"></line>
        <line x1="10" y1="2" x2="10" y2="4"></line>
        <line x1="14" y1="2" x2="14" y2="4"></line>
      </svg>
    `,
    // Cinema & Entertainment / Rạp phim tuần này
    CINEMA_AND_LEISURE: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="jayt-cat-svg">
        <rect x="2" y="4" width="20" height="16" rx="3"></rect>
        <path d="M7 4v16"></path>
        <path d="M17 4v16"></path>
        <path d="M2 12h20"></path>
        <path d="M2 8h5"></path>
        <path d="M2 16h5"></path>
        <path d="M17 8h5"></path>
        <path d="M17 16h5"></path>
      </svg>
    `,
    // Mobility & Transit / Đi lại & Di chuyển
    MOBILITY_AND_TRANSPORT: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="jayt-cat-svg">
        <rect x="3" y="4" width="18" height="13" rx="3"></rect>
        <path d="M16 2v2"></path>
        <path d="M8 2v2"></path>
        <path d="M3 11h18"></path>
        <circle cx="7.5" cy="18.5" r="2.5"></circle>
        <circle cx="16.5" cy="18.5" r="2.5"></circle>
      </svg>
    `,
    // Student Tools & Licenses / Công cụ & Bản quyền sinh viên
    STUDENT_SPECIALS: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="jayt-cat-svg">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
      </svg>
    `,
    // Dorm & Living / Đồ KTX & Mua sắm
    SHOPPING_AND_LIVING: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="jayt-cat-svg">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
      </svg>
    `
  };

  // --- 3. BRAND IDENTIFIER REGISTRY (STRICT CLASSIFICATION: OFFICIAL LOGO ASSET VS JAYT TEXT IDENTIFIER) ---
  // If logoUrl is present with provenance -> kind: "OFFICIAL_LOGO_ASSET"
  // If logoUrl is null -> kind: "JAYT_TEXT_IDENTIFIER", clean typographic wordmark without fake acronyms
  const BRAND_IDENTIFIERS = {
    // Cinema
    "Metiz Cinema Đà Nẵng": {
      brand: "Metiz Cinema",
      kind: "OFFICIAL_LOGO_ASSET",
      logoUrl: "assets/real-verified-assets/metiz-cinema-official-logo.png",
      label: "Official logo asset",
      bgGradient: "linear-gradient(135deg, #1E1B4B, #312E81)",
      accentColor: "#A5B4FC"
    },
    "Starlight Cinema Đà Nẵng": {
      brand: "Starlight Cinema",
      kind: "JAYT_TEXT_IDENTIFIER",
      logoUrl: null,
      label: "JayT text identifier",
      bgGradient: "linear-gradient(135deg, #78350F, #B45309)",
      accentColor: "#FDE68A"
    },
    "Galaxy Cinema Đà Nẵng": {
      brand: "Galaxy Cinema",
      kind: "JAYT_TEXT_IDENTIFIER",
      logoUrl: null,
      label: "JayT text identifier",
      bgGradient: "linear-gradient(135deg, #1E293B, #0284C7)",
      accentColor: "#38BDF8"
    },
    "CGV Vĩnh Trung Plaza": {
      brand: "CGV Cinemas",
      kind: "OFFICIAL_LOGO_ASSET",
      logoUrl: "assets/real-verified-assets/cgv-cinemas-official-logo.png",
      label: "Official logo asset",
      bgGradient: "linear-gradient(135deg, #450A0A, #DC2626)",
      accentColor: "#FECACA"
    },

    // Student Tools
    "Spotify Vietnam": {
      brand: "Spotify",
      kind: "OFFICIAL_LOGO_ASSET",
      logoUrl: "assets/real-verified-assets/spotify-student-official-logo.png",
      label: "Official logo asset",
      bgGradient: "linear-gradient(135deg, #064E3B, #10B981)",
      accentColor: "#6EE7B7"
    },
    "Microsoft Education": {
      brand: "Microsoft 365",
      kind: "OFFICIAL_LOGO_ASSET",
      logoUrl: "assets/real-verified-assets/microsoft-education-official.png",
      label: "Official logo asset",
      bgGradient: "linear-gradient(135deg, #1E3A8A, #2563EB)",
      accentColor: "#93C5FD"
    },
    "Figma for Education": {
      brand: "Figma",
      kind: "OFFICIAL_LOGO_ASSET",
      logoUrl: "assets/real-verified-assets/figma-education-official-badge.png",
      label: "Official logo asset",
      bgGradient: "linear-gradient(135deg, #18181B, #3F3F46)",
      accentColor: "#A78BFA"
    },
    "Amazon Web Services": {
      brand: "AWS Educate",
      kind: "OFFICIAL_LOGO_ASSET",
      logoUrl: "assets/real-verified-assets/aws-educate-official-badge.png",
      label: "Official logo asset",
      bgGradient: "linear-gradient(135deg, #1C1917, #D97706)",
      accentColor: "#FDE68A"
    },

    // Public Utilities
    "Cổng Dịch Vụ Công Đà Nẵng": {
      brand: "Cổng DVC Đà Nẵng",
      kind: "OFFICIAL_LOGO_ASSET",
      logoUrl: "assets/real-verified-assets/dvc-danang-official-emblem.png",
      label: "Official logo asset",
      bgGradient: "linear-gradient(135deg, #1E3A8A, #2563EB)",
      accentColor: "#BFDBFE"
    },
    "Xe Buýt Danabus Đà Nẵng": {
      brand: "DanaBus Đà Nẵng",
      kind: "JAYT_TEXT_IDENTIFIER",
      logoUrl: null,
      label: "JayT text identifier",
      bgGradient: "linear-gradient(135deg, #064E3B, #059669)",
      accentColor: "#6EE7B7"
    },

    // Food & Dining
    "Domino's Pizza": {
      brand: "Domino's Pizza",
      kind: "JAYT_TEXT_IDENTIFIER",
      logoUrl: null,
      label: "JayT text identifier",
      bgGradient: "linear-gradient(135deg, #0C4A6E, #0284C7)",
      accentColor: "#BAE6FD"
    },
    "Popeyes Louisiana Kitchen": {
      brand: "Popeyes",
      kind: "JAYT_TEXT_IDENTIFIER",
      logoUrl: null,
      label: "JayT text identifier",
      bgGradient: "linear-gradient(135deg, #7C2D12, #EA580C)",
      accentColor: "#FED7AA"
    },
    "Cơm Gà Bà Buội Đà Nẵng": {
      brand: "Cơm Gà Bà Buội",
      kind: "JAYT_TEXT_IDENTIFIER",
      logoUrl: null,
      label: "JayT text identifier",
      bgGradient: "linear-gradient(135deg, #78350F, #B45309)",
      accentColor: "#FDE68A"
    },
    "Bánh Tráng Cuốn Thịt Heo Đại Lộc": {
      brand: "Bánh Tráng Đại Lộc",
      kind: "JAYT_TEXT_IDENTIFIER",
      logoUrl: null,
      label: "JayT text identifier",
      bgGradient: "linear-gradient(135deg, #14532D, #15803D)",
      accentColor: "#BBF7D0"
    },
    "Mì Quảng Bà Mua": {
      brand: "Mì Quảng Bà Mua",
      kind: "JAYT_TEXT_IDENTIFIER",
      logoUrl: null,
      label: "JayT text identifier",
      bgGradient: "linear-gradient(135deg, #713F12, #CA8A04)",
      accentColor: "#FEF08A"
    },

    // Coffee & Study
    "Highlands Coffee Đà Nẵng": {
      brand: "Highlands Coffee",
      kind: "JAYT_TEXT_IDENTIFIER",
      logoUrl: null,
      label: "JayT text identifier",
      bgGradient: "linear-gradient(135deg, #431407, #9A3412)",
      accentColor: "#FED7AA"
    },
    "The Coffee House": {
      brand: "The Coffee House",
      kind: "JAYT_TEXT_IDENTIFIER",
      logoUrl: null,
      label: "JayT text identifier",
      bgGradient: "linear-gradient(135deg, #7C2D12, #EA580C)",
      accentColor: "#FFEDD5"
    },
    "Phúc Long Coffee & Tea": {
      brand: "Phúc Long",
      kind: "JAYT_TEXT_IDENTIFIER",
      logoUrl: null,
      label: "JayT text identifier",
      bgGradient: "linear-gradient(135deg, #064E3B, #059669)",
      accentColor: "#A7F3D0"
    },
    "Katinat Saigon Kafe": {
      brand: "Katinat Saigon Kafe",
      kind: "JAYT_TEXT_IDENTIFIER",
      logoUrl: null,
      label: "JayT text identifier",
      bgGradient: "linear-gradient(135deg, #1C1917, #78716C)",
      accentColor: "#E7E5E4"
    },
    "Chè Liên Đà Nẵng": {
      brand: "Chè Liên Đà Nẵng",
      kind: "JAYT_TEXT_IDENTIFIER",
      logoUrl: null,
      label: "JayT text identifier",
      bgGradient: "linear-gradient(135deg, #1E1B4B, #4338CA)",
      accentColor: "#C7D2FE"
    },
    "Zone Six Coffee 24/7": {
      brand: "Zone Six Coffee 24/7",
      kind: "JAYT_TEXT_IDENTIFIER",
      logoUrl: null,
      label: "JayT text identifier",
      bgGradient: "linear-gradient(135deg, #312E81, #4338CA)",
      accentColor: "#C7D2FE"
    },
    "Autodesk Education": {
      brand: "Autodesk Education",
      kind: "JAYT_TEXT_IDENTIFIER",
      logoUrl: null,
      label: "JayT text identifier",
      bgGradient: "linear-gradient(135deg, #0C4A6E, #0284C7)",
      accentColor: "#38BDF8"
    },
    "GitHub Education": {
      brand: "GitHub Education",
      kind: "JAYT_TEXT_IDENTIFIER",
      logoUrl: null,
      label: "JayT text identifier",
      bgGradient: "linear-gradient(135deg, #18181B, #3F3F46)",
      accentColor: "#E4E4E7"
    },
    "Notion for Education": {
      brand: "Notion for Education",
      kind: "JAYT_TEXT_IDENTIFIER",
      logoUrl: null,
      label: "JayT text identifier",
      bgGradient: "linear-gradient(135deg, #27272A, #52525B)",
      accentColor: "#FAFAFA"
    },
    "Xe Đạp Công Cộng TNGo Đà Nẵng": {
      brand: "TNGo Đà Nẵng",
      kind: "JAYT_TEXT_IDENTIFIER",
      logoUrl: null,
      label: "JayT text identifier",
      bgGradient: "linear-gradient(135deg, #064E3B, #059669)",
      accentColor: "#6EE7B7"
    },
    "Cơm Tấm Bà Lang": {
      brand: "Cơm Tấm Bà Lang",
      kind: "JAYT_TEXT_IDENTIFIER",
      logoUrl: null,
      label: "JayT text identifier",
      bgGradient: "linear-gradient(135deg, #78350F, #B45309)",
      accentColor: "#FDE68A"
    },
    "Bún Bò Bà Diệu": {
      brand: "Bún Bò Bà Diệu",
      kind: "JAYT_TEXT_IDENTIFIER",
      logoUrl: null,
      label: "JayT text identifier",
      bgGradient: "linear-gradient(135deg, #78350F, #B45309)",
      accentColor: "#FDE68A"
    }
  };

  root.JayTBrandAssets = {
    master: JAYT_MASTER_SVGS,
    categories: CATEGORY_SVGS,
    brandIdentifiers: BRAND_IDENTIFIERS,
    getBrandIdentifier: (brandName) => {
      if (!brandName) return null;
      for (const [k, v] of Object.entries(BRAND_IDENTIFIERS)) {
        if (brandName.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(brandName.toLowerCase())) {
          return v;
        }
      }
      return {
        brand: brandName,
        kind: "JAYT_TEXT_IDENTIFIER",
        logoUrl: null,
        label: "JayT text identifier",
        bgGradient: "linear-gradient(135deg, #1E293B, #334155)",
        accentColor: "#94A3B8"
      };
    }
  };

})(typeof window !== 'undefined' ? window : global);
