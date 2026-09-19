/**
 * JAYT OFFICIAL BRAND IDENTITY ASSETS SYSTEM (v3.372.0 - JAYT-225R6)
 * Strict Brand Identity Truth Engine: Direct Official Portal Logos & Verified Provenance
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.JayTBrandAssets = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const MASTER_BRAND = {
    brand_id: 'BRAND_JAYT_MASTER',
    brand_name: 'JayT Đà Nẵng',
    tagline: 'Nền tảng Săn Kèo & Tiết Kiệm Đà Nẵng',
    colors: {
      primary: '#059669',
      accent: '#10B981',
      dark: '#0B0F19',
      light: '#FFFFFF'
    },
    logoMark: function(isDark) {
      return '<svg width="28" height="28" viewBox="0 0 240 240" fill="none"><rect width="240" height="240" rx="48" fill="#059669"/><text x="120" y="165" font-family="-apple-system, sans-serif" font-weight="900" font-size="140" fill="#FFF" text-anchor="middle">J</text></svg>';
    },
    logoFull: function(isDark) {
      return '<div style="display:flex; align-items:center; gap:8px;"><div style="width:28px; height:28px; border-radius:8px; background:#059669; color:#FFF; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:16px;">J</div><span style="font-weight:900; font-size:18px; color:' + (isDark ? '#FFF' : '#0F172A') + '; letter-spacing:-0.5px;">Jay<span style="color:#059669;">T</span> Đà Nẵng</span></div>';
    }
  };

  const BRAND_REGISTRY = {
    "BRAND_METIZ": {
        "brand_id": "BRAND_METIZ",
        "brand_name": "Metiz Cinema Đà Nẵng",
        "official_portal_url": "https://metiz.vn",
        "direct_asset_url": "https://metiz.vn/Content/img/logo.png",
        "logo_file": "assets/real-verified-assets/metiz-cinema-official-logo.png",
        "logo_sha256": "102d862405505932cc66a2ddf1c6cd777ffe4eb716a8ed41c15074b2ec123a36",
        "rights_basis": "METIZ_CINEMA_OFFICIAL_PORTAL_HEADER",
        "kind": "OFFICIAL_LOGO_ASSET",
        "bg_gradient": "linear-gradient(135deg, #1C1917, #7F1D1D)",
        "captured_at": "2026-08-28T13:14:00.000Z",
        "verified_at": "2026-08-28"
    },
    "BRAND_STARLIGHT": {
        "brand_id": "BRAND_STARLIGHT",
        "brand_name": "Starlight Cinema Đà Nẵng",
        "official_portal_url": "https://starlight.vn",
        "direct_asset_url": "https://starlight.vn/Content/img/logo.png",
        "logo_file": "assets/real-verified-assets/starlight-cinema-official-logo.png",
        "logo_sha256": "943c3351325e5a134cc4ff9091d34237a3c25ad975405b41339119a42100babd",
        "rights_basis": "STARLIGHT_CINEMA_OFFICIAL_PORTAL_HEADER",
        "kind": "OFFICIAL_LOGO_ASSET",
        "bg_gradient": "linear-gradient(135deg, #78350F, #B45309)",
        "captured_at": "2026-08-28T13:14:00.000Z",
        "verified_at": "2026-08-28"
    },
    "BRAND_GALAXY": {
        "brand_id": "BRAND_GALAXY",
        "brand_name": "Galaxy Cinema Đà Nẵng",
        "official_portal_url": "https://www.galaxycine.vn",
        "direct_asset_url": "https://www.galaxycine.vn/_next/static/media/galaxy-logo-mobile.074abeac.png",
        "logo_file": "assets/real-verified-assets/galaxy-cinema-official-logo.png",
        "logo_sha256": "dc3db847aa61fb10db827661b2484d01d1274113fe68b8f92975a0e814307d1b",
        "rights_basis": "GALAXY_CINEMA_OFFICIAL_PORTAL_HEADER",
        "kind": "OFFICIAL_LOGO_ASSET",
        "bg_gradient": "linear-gradient(135deg, #1E293B, #C2410C)",
        "captured_at": "2026-08-28T13:14:00.000Z",
        "verified_at": "2026-08-28"
    },
    "BRAND_CGV": {
        "brand_id": "BRAND_CGV",
        "brand_name": "CGV Vĩnh Trung Plaza",
        "official_portal_url": "https://www.cgv.vn",
        "direct_asset_url": "https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png",
        "logo_file": "assets/real-verified-assets/cgv-cinemas-official-logo.png",
        "logo_sha256": "276d57e73212547aa588b1a20ff5ba58cc4a4f2f6a560501d36486bdfe1fc194",
        "rights_basis": "CGV_VIETNAM_WEB_PORTAL",
        "kind": "OFFICIAL_LOGO_ASSET",
        "bg_gradient": "linear-gradient(135deg, #18181B, #991B1B)",
        "captured_at": "2026-08-28T13:14:00.000Z",
        "verified_at": "2026-08-28"
    },
    "BRAND_DOMINOS": {
        "brand_id": "BRAND_DOMINOS",
        "brand_name": "Domino's Pizza",
        "official_portal_url": "https://dominos.vn",
        "direct_asset_url": "https://dominos.vn/img/logo/domino-horizontal-dark.svg",
        "logo_file": "assets/real-verified-assets/dominos-pizza-official-logo.svg",
        "logo_sha256": "ef7116b3fc91a19f024a43780a1103498bcd7b2aa1f9b887aaeaba166a6c8470",
        "rights_basis": "DOMINOS_VIETNAM_OFFICIAL_PORTAL_HEADER",
        "kind": "OFFICIAL_LOGO_ASSET",
        "bg_gradient": "linear-gradient(135deg, #0C4A6E, #0369A1)",
        "captured_at": "2026-08-28T13:15:00.000Z",
        "verified_at": "2026-08-28"
    },
    "BRAND_POPEYES": {
        "brand_id": "BRAND_POPEYES",
        "brand_name": "Popeyes Louisiana Kitchen",
        "official_portal_url": "https://popeyes.vn",
        "direct_asset_url": "https://popeyes.vn/ (DOM Header SVG)",
        "logo_file": "assets/real-verified-assets/popeyes-official-logo.svg",
        "logo_sha256": "dd56c9d562d0676844a94ae8d25d08582b7ff9f365c68a2315be1f19215c4f3e",
        "rights_basis": "POPEYES_VIETNAM_OFFICIAL_PORTAL_HEADER",
        "kind": "OFFICIAL_LOGO_ASSET",
        "bg_gradient": "linear-gradient(135deg, #7C2D12, #EA580C)",
        "captured_at": "2026-08-28T13:16:00.000Z",
        "verified_at": "2026-08-28"
    },
    "BRAND_SPOTIFY": {
        "brand_id": "BRAND_SPOTIFY",
        "brand_name": "Spotify Vietnam",
        "official_portal_url": "https://www.spotify.com/vn-vi/student/",
        "direct_asset_url": "Spotify Developer / Press Kit",
        "logo_file": "assets/real-verified-assets/spotify-student-official-logo.png",
        "logo_sha256": "8b46920614ab8b5064fa29c171936d6e2a37406f0c3c287ae2400951b465b0fe",
        "rights_basis": "SPOTIFY_DEVELOPER_PRESS_KIT",
        "kind": "OFFICIAL_LOGO_ASSET",
        "bg_gradient": "linear-gradient(135deg, #052E16, #14532D)",
        "captured_at": "2026-08-28T13:00:00.000Z",
        "verified_at": "2026-08-28"
    },
    "BRAND_FIGMA": {
        "brand_id": "BRAND_FIGMA",
        "brand_name": "Figma for Education",
        "official_portal_url": "https://www.figma.com/education/",
        "direct_asset_url": "Figma Education Kit",
        "logo_file": "assets/real-verified-assets/figma-education-official-badge.png",
        "logo_sha256": "150197655b72e22285f4c9d96855f09ffb8f4d51ea316397a0f88adeaafd916d",
        "rights_basis": "FIGMA_EDUCATION_MEDIA_KIT",
        "kind": "OFFICIAL_LOGO_ASSET",
        "bg_gradient": "linear-gradient(135deg, #1E1B4B, #3B0764)",
        "captured_at": "2026-08-28T13:00:00.000Z",
        "verified_at": "2026-08-28"
    },
    "BRAND_AWS": {
        "brand_id": "BRAND_AWS",
        "brand_name": "Amazon Web Services",
        "official_portal_url": "https://aws.amazon.com/education/awseducate/",
        "direct_asset_url": "AWS Educate Portal",
        "logo_file": "assets/real-verified-assets/aws-educate-official-badge.png",
        "logo_sha256": "bf572d19f9062f2d23e5eed63309003e877d2de200c61589372a0903536a4a56",
        "rights_basis": "AWS_EDUCATE_PORTAL_BADGE",
        "kind": "OFFICIAL_LOGO_ASSET",
        "bg_gradient": "linear-gradient(135deg, #0F172A, #1E293B)",
        "captured_at": "2026-08-28T13:00:00.000Z",
        "verified_at": "2026-08-28"
    },
    "BRAND_MICROSOFT": {
        "brand_id": "BRAND_MICROSOFT",
        "brand_name": "Microsoft Education",
        "official_portal_url": "https://www.microsoft.com/vi-vn/education/products/office",
        "direct_asset_url": "Microsoft Education Brand Kit",
        "logo_file": "assets/real-verified-assets/microsoft-education-official.png",
        "logo_sha256": "112fec798b78aa02e102a724b5cb1990c0f909bc1d8b7b1fa256eab41bbc0960",
        "rights_basis": "MICROSOFT_EDUCATION_BRAND_PORTAL",
        "kind": "OFFICIAL_LOGO_ASSET",
        "bg_gradient": "linear-gradient(135deg, #0F172A, #1E293B)",
        "captured_at": "2026-08-28T13:00:00.000Z",
        "verified_at": "2026-08-28"
    }
};

  const BRAND_NAME_MAP = {
    'Metiz Cinema Đà Nẵng': 'BRAND_METIZ',
    'Metiz Cinema': 'BRAND_METIZ',
    'Starlight Cinema Đà Nẵng': 'BRAND_STARLIGHT',
    'Starlight Cinema': 'BRAND_STARLIGHT',
    'Galaxy Cinema Đà Nẵng': 'BRAND_GALAXY',
    'Galaxy Cinema': 'BRAND_GALAXY',
    'CGV Vĩnh Trung Plaza': 'BRAND_CGV',
    'CGV Cinemas': 'BRAND_CGV',
    "Domino's Pizza": 'BRAND_DOMINOS',
    'Domino Pizza': 'BRAND_DOMINOS',
    'Popeyes Louisiana Kitchen': 'BRAND_POPEYES',
    'Popeyes': 'BRAND_POPEYES',
    'Spotify Vietnam': 'BRAND_SPOTIFY',
    'Spotify': 'BRAND_SPOTIFY',
    'Microsoft Education': 'BRAND_MICROSOFT',
    'Microsoft': 'BRAND_MICROSOFT',
    'Figma for Education': 'BRAND_FIGMA',
    'Figma': 'BRAND_FIGMA',
    'Amazon Web Services': 'BRAND_AWS',
    'AWS Educate': 'BRAND_AWS'
  };

  const CATEGORY_SVGS = {
    "ALL_NEARBY": "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polygon points=\"16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76\"></polygon></svg>",
    "FOOD_AND_DINING": "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M18 8h1a4 4 0 0 1 0 8h-1\"></path><path d=\"M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z\"></path></svg>",
    "COFFEE_AND_STUDY": "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M17 8h1a4 4 0 1 1 0 8h-1\"></path><path d=\"M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z\"></path></svg>",
    "CINEMA_AND_LEISURE": "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"3\"></rect><path d=\"M7 4v16\"></path><path d=\"M17 4v16\"></path></svg>",
    "MOBILITY_AND_TRANSPORT": "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"13\" rx=\"3\"></rect><circle cx=\"7.5\" cy=\"18.5\" r=\"2.5\"></circle><circle cx=\"16.5\" cy=\"18.5\" r=\"2.5\"></circle></svg>",
    "STUDENT_SPECIALS": "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M22 10v6M2 10l10-5 10 5-10 5z\"></path><path d=\"M6 12v5c3 3 9 3 12 0v-5\"></path></svg>",
    "ONLINE_TOOLS": "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"></line></svg>"
};

  function getBrandIdentifier(brandName) {
    if (!brandName) {
      return {
        brand_id: 'BRAND_NEUTRAL',
        brand: 'Địa điểm xác minh',
        logoUrl: null,
        kind: 'NEUTRAL_TYPOGRAPHY',
        bgGradient: 'linear-gradient(135deg, #1E1B4B, #2E1065)'
      };
    }

    const brandId = BRAND_NAME_MAP[brandName] || BRAND_NAME_MAP[brandName.trim()];
    if (brandId && BRAND_REGISTRY[brandId]) {
      const b = BRAND_REGISTRY[brandId];
      return {
        brand_id: b.brand_id,
        brand: b.brand_name,
        logoUrl: b.logo_file,
        sha256: b.logo_sha256,
        kind: b.kind,
        bgGradient: b.bg_gradient,
        portalUrl: b.official_portal_url
      };
    }

    return {
      brand_id: 'BRAND_NEUTRAL_LOCATION',
      brand: brandName,
      logoUrl: null,
      kind: 'NEUTRAL_TYPOGRAPHY',
      bgGradient: 'linear-gradient(135deg, #1E1B4B, #2E1065)'
    };
  }

  return {
    master: MASTER_BRAND,
    registry: BRAND_REGISTRY,
    categories: CATEGORY_SVGS,
    getBrandIdentifier: getBrandIdentifier
  };
});
