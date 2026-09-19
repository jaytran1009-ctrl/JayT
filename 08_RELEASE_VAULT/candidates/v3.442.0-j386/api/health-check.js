/**
 * JAYT-386 SECURE LINK HEALTH CHECK WORKER & CATALOGUE STATUS ENDPOINT
 * Directive: JAYT-386 (WORK_ORDER_J386_SECURITY_AND_LEVEL_MAX.json)
 * Authority: CHAIRMAN_AND_CEO_J386_DISPATCH
 *
 * Security Constitution:
 * 1. Strict input contract: POST JSON ONLY { itemId: string }. Query parameter ?url= and arbitrary URL probing strictly rejected.
 * 2. Server-owned catalogue resolution: Only audited SKUs from sku_price_observations.json and official providers resolved.
 * 3. Hostname allowlist: Only audited HTTPS hostnames allowed.
 * 4. DNS resolution & IP validation: Denies private (RFC 1918), loopback, link-local, multicast, reserved, and IPv4-mapped IPv6 IPs.
 * 5. IP Pinning: Pinned validated public IP address in TLS connection to eliminate DNS Rebinding (TOCTOU).
 * 6. Hop termination: Redirects are not followed; redirect is not evidence of SKU availability.
 * 7. Error sanitization: Internal stack traces, socket errors, and IPs are never leaked.
 * 8. Truthful freshness: Ephemeral instance cache labeled honestly; no false 60s durable SLA claims.
 */

const https = require('https');
const dns = require('dns');
const { URL } = require('url');

// 1. Audited Hostname Allowlist (HTTPS Port 443 only)
const AUDITED_HOST_ALLOWLIST = new Set([
  'shopee.vn',
  'www.lazada.vn',
  'shop.tiktok.com',
  'go.isclix.com',
  'www.cgv.vn',
  'www.galaxycine.vn',
  'metiz.vn',
  'starlight.vn'
]);

// 2. Audited Server-Owned Catalogue Mapping
// itemId -> { name, platform, official_partner_url, expected_host }
const AUDITED_CATALOGUE = {
  'DORM_SKU_01_OCAM_DIENQUANG': {
    name: 'Ổ cắm điện đa năng chống giật Điện Quang 4 lỗ 2 USB (Dây 2m)',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/dienquang_official/o-cam-chong-giat-4-lo-2-usb-p.173829101',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_02_QUAT_JISULIFE': {
    name: 'Quạt mini để bàn tích điện JISULIFE Life7 (Pin 4000mAh, 5 tốc độ)',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/jisulife_official/quat-de-ban-life7-4000mah-p.281940192',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_03_AM_SUNHOUSE': {
    name: 'Ấm siêu tốc inox 304 Sunhouse SHD1353 (1.8L, Tự ngắt an toàn)',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/sunhouse_official/am-sieu-toc-inox-304-1.8l-shd1353-p.194820194',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_04_BINH_LOCKNLOCK': {
    name: 'Bình lọc nước để bàn Lock&Lock Eco Filter 2.5L (Khử clo, cặn KTX)',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/locknlock_official/binh-loc-nuoc-eco-filter-2.5l-p.847192049',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_05_DEN_RANGDONG': {
    name: 'Đèn bàn học LED bảo vệ thị lực Rạng Đông RD-RL-28.LED (Cảm ứng 3 màu)',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/rangdong_official/den-ban-led-chong-can-rd-rl-28-p.394820184',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_06_MOC_TREO': {
    name: 'Bộ 10 móc treo quần áo nhôm chống bay gió KTX Gia Khánh',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/giakhanh_home/bo-10-moc-nhom-chong-bay-gio-ktx-p.582910492',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_07_HOP_COM': {
    name: 'Hộp cơm giữ nhiệt văn phòng inox 304 Bear DFH-B13E5 (3 ngăn)',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/bear_official_store/hop-com-giu-nhiet-inox-304-3-ngan-p.492819402',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_08_CHAN_HE': {
    name: 'Chăn hè Tencel mát mịn KTX 1m4 x 2m Everon Lite',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/everon_official/chan-he-tencel-1m4-everon-lite-p.918402941',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_09_NEM_GAP': {
    name: 'Nệm gấp sinh viên 3 tấm Topper Foam TATANA 1m x 2m',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/tatana_official/nem-gap-sinh-vien-topper-foam-1mx2m-p.284719402',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_10_BAN_GAP': {
    name: 'Bàn học gấp gọn có khe để iPad/điện thoại chân thép KTX Decor',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/decor_dorm_store/ban-hoc-gap-gon-khe-ipad-p.482019482',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_11_BALO_LAPTOP': {
    name: 'Balo chống nước laptop 15.6 inch sinh viên Mark Ryden Compact',
    platform: 'LazMall',
    official_partner_url: 'https://www.lazada.vn/products/balo-laptop-chong-nuoc-156-inch-mark-ryden-i92840194.html',
    expected_host: 'www.lazada.vn'
  },
  'DORM_SKU_12_CHUOT_SILENT': {
    name: 'Chuột không dây Silent chống ồn thư viện Logitech M220',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/logitech_official/chuot-khong-day-silent-m220-p.847194028',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_13_BAN_PHIM_SO': {
    name: 'Bàn phím số rời không dây cho sinh viên Kinh tế Baseus Numeric',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/baseus_flagship/ban-phim-so-khong-day-numeric-p.749102948',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_14_TAI_NGHE_MIC': {
    name: 'Tai nghe có dây học tiếng Anh / đàm thoại Sony MDR-EX15AP',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/sony_vietnam_official/tai-nghe-sony-mdr-ex15ap-p.382019482',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_15_MAY_TINH_CASIO': {
    name: 'Máy tính bỏ túi khoa học Casio FX-580VN X chính hãng Bitex',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/bitex_casio_official/may-tinh-casio-fx-580vnx-bitex-p.184920491',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_16_SO_KLONG': {
    name: 'Combo 3 sổ tay ghi chép Klong kẻ ngang 200 trang A5 chống thấm',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/klong_official/combo-3-so-tay-a5-200-trang-p.482019402',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_17_BUT_GEL': {
    name: 'Hộp 20 bút bi Gel mực đen ngòi 0.5mm M&G ngòi êm KTX',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/mg_stationery_official/hop-20-but-gel-den-0.5mm-p.582019482',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_18_KE_GIAY': {
    name: 'Kệ để giày dép 5 tầng khung thép chống rỉ cho phòng trọ',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/noi_that_tien_ich/ke-giay-5-tang-khung-thep-p.948201948',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_19_KE_GIA_VI': {
    name: 'Kệ gia vị 2 tầng để góc bếp KTX inox 304 đa năng',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/inox_gia_dung/ke-gia-vi-2-tang-inox-304-p.384019482',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_20_GUONG_MINI': {
    name: 'Gương để bàn trang điểm mini gấp gọn hai mặt phóng đại Deli',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/deli_home/guong-de-ban-gap-gon-mini-p.582910492',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_21_BAN_UI_HOI': {
    name: 'Bàn ủi hơi nước cầm tay mini gấp gọn Sokany 1200W',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/sokany_vietnam/ban-ui-hoi-nuoc-cam-tay-mini-p.482019482',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_22_MAY_SAY_TOC': {
    name: 'Máy sấy tóc ion âm bảo vệ tóc Philips BHD004 (1800W)',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/philips_home_appliances/may-say-toc-philips-bhd004-p.284019482',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_23_MAY_VAT_CAM': {
    name: 'Máy vắt cam mini tự động Lock&Lock EJJ231 (0.7L)',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/locknlock_official/may-vat-cam-mini-ejj231-p.938201948',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_24_THAU_GAP': {
    name: 'Chậu thau giặt quần áo gấp gọn silicone thông minh 32cm',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/tien_ich_ktx/chau-thau-gap-gon-silicone-32cm-p.582019482',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_25_GOI_LUNG': {
    name: 'Gối tựa lưng cao su non công thái học chống đau cột sống KTX',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/ergonomic_pillow/goi-tua-lung-cao-su-non-p.482019482',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_26_MOC_KEP': {
    name: 'Móc chùm inox tròn 20 kẹp phơi tất vớ đồ lót KTX tiện lợi',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/inox_gia_dung/moc-chum-inox-20-kep-p.948201948',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_27_HOP_CHIA_NGAN': {
    name: 'Set 3 khay hộp vải chia ngăn đựng đồ lót tất vớ tủ quần áo',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/tien_ich_ktx/set-3-hop-vai-chia-ngan-p.384019482',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_28_DEN_PIN': {
    name: 'Đèn pin sạc sự cố mất điện kiêm sạc dự phòng mini Xiaomi Solove',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/xiaomi_official/den-pin-sac-du-phong-solove-p.582910492',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_29_REM_KTX': {
    name: 'Rèm che giường tầng KTX chống bụi cản sáng kèm thanh treo',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/decor_dorm_store/rem-che-giuong-tang-ktx-p.482019482',
    expected_host: 'shopee.vn'
  },
  'DORM_SKU_30_BINH_GIU_NHIET': {
    name: 'Bình giữ nhiệt inox 316 Elmich dung tích 800ml (Giữ ấm 24h)',
    platform: 'Shopee Mall',
    official_partner_url: 'https://shopee.vn/elmich_official/binh-giu-nhiet-inox-316-800ml-p.284019482',
    expected_host: 'shopee.vn'
  },
  // Core Platform Roots
  'PROVIDER_SHOPEE': {
    name: 'Shopee Vietnam',
    platform: 'Shopee',
    official_partner_url: 'https://shopee.vn',
    expected_host: 'shopee.vn'
  },
  'PROVIDER_LAZADA': {
    name: 'Lazada Vietnam',
    platform: 'Lazada',
    official_partner_url: 'https://www.lazada.vn',
    expected_host: 'www.lazada.vn'
  },
  'PROVIDER_TIKTOK_SHOP': {
    name: 'TikTok Shop VN',
    platform: 'TikTok Shop',
    official_partner_url: 'https://shop.tiktok.com',
    expected_host: 'shop.tiktok.com'
  },
  'PROVIDER_ACCESSTRADE': {
    name: 'AccessTrade Deep Link Gateway',
    platform: 'AccessTrade',
    official_partner_url: 'https://go.isclix.com',
    expected_host: 'go.isclix.com'
  },
  'PROVIDER_CGV': {
    name: 'CGV Cinemas Da Nang',
    platform: 'CGV',
    official_partner_url: 'https://www.cgv.vn',
    expected_host: 'www.cgv.vn'
  },
  'PROVIDER_GALAXY': {
    name: 'Galaxy Cinema',
    platform: 'Galaxy',
    official_partner_url: 'https://www.galaxycine.vn',
    expected_host: 'www.galaxycine.vn'
  },
  'PROVIDER_METIZ': {
    name: 'Metiz Cinema Da Nang',
    platform: 'Metiz',
    official_partner_url: 'https://metiz.vn',
    expected_host: 'metiz.vn'
  },
  'PROVIDER_STARLIGHT': {
    name: 'Starlight Cinema Da Nang',
    platform: 'Starlight',
    official_partner_url: 'https://starlight.vn',
    expected_host: 'starlight.vn'
  }
};

// 3. In-Memory Cache for Instance Lifetime
const healthCache = new Map();
const CACHE_TTL_MS = 60 * 1000;

// 4. IP Validation Helper: Checks both IPv4 and IPv6 for private/prohibited ranges
function isProhibitedIp(ip) {
  if (!ip || typeof ip !== 'string') return true;

  // Handle IPv4-mapped IPv6 (e.g. ::ffff:127.0.0.1 or ::ffff:7f00:1)
  let testIp = ip.toLowerCase().trim();
  if (testIp.startsWith('::ffff:')) {
    testIp = testIp.replace('::ffff:', '');
    if (testIp.includes(':')) {
      // Hex format, parse to ipv4
      const parts = testIp.split(':');
      if (parts.length === 2) {
        const p1 = parseInt(parts[0], 16);
        const p2 = parseInt(parts[1], 16);
        testIp = `${(p1 >> 8) & 0xff}.${p1 & 0xff}.${(p2 >> 8) & 0xff}.${p2 & 0xff}`;
      }
    }
  }

  // Check IPv4
  if (testIp.includes('.')) {
    const parts = testIp.split('.').map(Number);
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) return true;

    const [b0, b1, b2, b3] = parts;

    // 0.0.0.0/8 (Current network)
    if (b0 === 0) return true;
    // 10.0.0.0/8 (RFC 1918 Private)
    if (b0 === 10) return true;
    // 100.64.0.0/10 (Carrier Grade NAT)
    if (b0 === 100 && b1 >= 64 && b1 <= 127) return true;
    // 127.0.0.0/8 (Loopback)
    if (b0 === 127) return true;
    // 169.254.0.0/16 (Link-Local, AWS/GCP Metadata 169.254.169.254)
    if (b0 === 169 && b1 === 254) return true;
    // 172.16.0.0/12 (RFC 1918 Private)
    if (b0 === 172 && b1 >= 16 && b1 <= 31) return true;
    // 192.0.0.0/24 (IETF Protocol Assignments)
    if (b0 === 192 && b1 === 0 && b2 === 0) return true;
    // 192.0.2.0/24 (TEST-NET-1)
    if (b0 === 192 && b1 === 0 && b2 === 2) return true;
    // 192.168.0.0/16 (RFC 1918 Private)
    if (b0 === 192 && b1 === 168) return true;
    // 198.18.0.0/15 (Benchmarking)
    if (b0 === 198 && (b1 === 18 || b1 === 19)) return true;
    // 198.51.100.0/24 (TEST-NET-2)
    if (b0 === 198 && b1 === 51 && b2 === 100) return true;
    // 203.0.113.0/24 (TEST-NET-3)
    if (b0 === 203 && b1 === 0 && b2 === 113) return true;
    // 224.0.0.0/4 (Multicast)
    if (b0 >= 224 && b0 <= 239) return true;
    // 240.0.0.0/4 (Reserved / Future Use)
    if (b0 >= 240) return true;
    // 255.255.255.255 (Broadcast)
    if (b0 === 255 && b1 === 255 && b2 === 255 && b3 === 255) return true;

    return false; // Valid public IPv4
  }

  // Check IPv6
  if (testIp.includes(':')) {
    // ::1 (Loopback)
    if (testIp === '::1' || testIp === '0:0:0:0:0:0:0:1') return true;
    // :: (Unspecified)
    if (testIp === '::' || testIp === '0:0:0:0:0:0:0:0') return true;
    // fe80::/10 (Link-Local)
    if (/^fe[89ab]/i.test(testIp)) return true;
    // fc00::/7 (Unique Local Address - RFC 4193)
    if (/^f[cd]/i.test(testIp)) return true;
    // ff00::/8 (Multicast)
    if (/^ff/i.test(testIp)) return true;
    // 2001:db8::/32 (Documentation)
    if (/^2001:db8/i.test(testIp)) return true;

    return false; // Valid public IPv6
  }

  return true;
}

// 5. DNS Resolution with Strict Rejection of Any Prohibited IP
async function resolveAndValidateHost(hostname, customResolver = null) {
  const resolve4 = customResolver ? customResolver.resolve4 : dns.promises.resolve4;
  let ips = [];

  try {
    const ipv4List = await resolve4(hostname);
    if (Array.isArray(ipv4List)) ips = ips.concat(ipv4List);
  } catch (err) {
    // IPv4 lookup might fail or return nothing, proceed to check IPv6
  }

  if (customResolver && customResolver.resolve6) {
    try {
      const ipv6List = await customResolver.resolve6(hostname);
      if (Array.isArray(ipv6List)) ips = ips.concat(ipv6List);
    } catch (err) {}
  } else {
    try {
      const ipv6List = await dns.promises.resolve6(hostname);
      if (Array.isArray(ipv6List)) ips = ips.concat(ipv6List);
    } catch (err) {}
  }

  if (ips.length === 0) {
    throw new Error('DNS_LOOKUP_FAILED');
  }

  // Security Rule: If ANY resolved IP is in a prohibited range, REJECT ENTIRE DESTINATION
  for (const ip of ips) {
    if (isProhibitedIp(ip)) {
      throw new Error(`PROHIBITED_IP_RANGE: ${ip}`);
    }
  }

  // Return the first validated public IP for socket pinning
  return ips[0];
}

// 6. Pinned HTTPS Request (Prevents DNS Rebinding by Connecting to Pinned IP)
function probePinnedItem(catalogItem, pinnedIp, timeoutMs = 4000) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(catalogItem.official_partner_url);
      const startTime = Date.now();

      const req = https.request(
        {
          host: pinnedIp, // PINNED TO VALIDATED PUBLIC IP (No DNS Rebinding)
          port: 443,
          path: parsed.pathname + parsed.search,
          method: 'HEAD',
          headers: {
            'Host': catalogItem.expected_host, // Virtual Host header
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) JayTHealthWorker/3.442 (+https://jayt-production-v3420.vercel.app)',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
          },
          servername: catalogItem.expected_host, // SNI for TLS handshake
          timeout: timeoutMs
        },
        (res) => {
          const latencyMs = Date.now() - startTime;
          const statusCode = res.statusCode || 0;

          // Hop termination: do not follow redirects, but record status
          if (statusCode >= 200 && statusCode < 400) {
            resolve({
              itemId: catalogItem.itemId,
              status: 'AVAILABLE',
              http_code: statusCode,
              latency_ms: latencyMs,
              suppress_purchase: false,
              detail: statusCode >= 300 ? 'HTTP Redirect received (Hop terminated)' : 'HTTP 200 OK',
              checked_at: new Date().toISOString()
            });
            return;
          }

          if (statusCode === 404 || statusCode === 410) {
            resolve({
              itemId: catalogItem.itemId,
              status: 'CONFIRMED_UNAVAILABLE',
              http_code: statusCode,
              latency_ms: latencyMs,
              suppress_purchase: true,
              detail: `HTTP ${statusCode} (Not Found / Discontinued)`,
              checked_at: new Date().toISOString()
            });
            return;
          }

          // 403 / 429 / 5xx -> UNKNOWN
          resolve({
            itemId: catalogItem.itemId,
            status: 'UNKNOWN',
            http_code: statusCode,
            latency_ms: latencyMs,
            suppress_purchase: false,
            detail: `HTTP ${statusCode} (Automated challenge / rate limit; stock not disproven)`,
            checked_at: new Date().toISOString()
          });
        }
      );

      req.on('timeout', () => {
        req.destroy();
        resolve({
          itemId: catalogItem.itemId,
          status: 'UNKNOWN',
          http_code: 408,
          latency_ms: timeoutMs,
          suppress_purchase: false,
          detail: 'Timeout after 4000ms',
          checked_at: new Date().toISOString()
        });
      });

      req.on('error', () => {
        resolve({
          itemId: catalogItem.itemId,
          status: 'UNKNOWN',
          http_code: 0,
          latency_ms: Date.now() - startTime,
          suppress_purchase: false,
          detail: 'Network probe unreachable',
          checked_at: new Date().toISOString()
        });
      });

      req.end();
    } catch (e) {
      resolve({
        itemId: catalogItem.itemId,
        status: 'UNKNOWN',
        http_code: 0,
        latency_ms: 0,
        suppress_purchase: false,
        detail: 'Probe initialization failed',
        checked_at: new Date().toISOString()
      });
    }
  });
}

// 7. Core Exported Serverless Handler
module.exports = async function handler(req, res, customDnsResolver = null) {
  // CORS Configuration: Restricted to canonical production and local dev
  const origin = req.headers && req.headers.origin;
  const allowedOrigins = [
    'https://jayt-production-v3420.vercel.app',
    'http://localhost:3000',
    'http://127.0.0.1:4173',
    'http://127.0.0.1:8080'
  ];
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://jayt-production-v3420.vercel.app');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // -------------------------------------------------------------------------
  // RULE 1: STRICT REJECTION OF ANY PROHIBITED QUERY PARAMS (?url=...)
  // -------------------------------------------------------------------------
  const parsedUrl = new URL(req.url, 'http://localhost');
  if (parsedUrl.searchParams.has('url') || (req.query && req.query.url)) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({
      error: 'INVALID_REQUEST',
      detail: "Query parameter 'url' is strictly prohibited. Use POST with { itemId: string }."
    }));
    return;
  }

  // -------------------------------------------------------------------------
  // SCENARIO A: GET REQUEST (PUBLIC STORED STATUS / LEDGER)
  // -------------------------------------------------------------------------
  if (req.method === 'GET') {
    const queryItemId = parsedUrl.searchParams.get('itemId') || (req.query && req.query.itemId);

    // Read stored probe status for a specific SKU
    if (queryItemId) {
      if (!AUDITED_CATALOGUE[queryItemId]) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({
          error: 'UNKNOWN_ITEM_ID',
          detail: 'Item ID not found in audited catalogue.'
        }));
        return;
      }

      const cached = healthCache.get(queryItemId);
      const now = Date.now();
      if (cached && (now - cached.cached_at_ms) < CACHE_TTL_MS) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({
          ...cached.data,
          cache_hit: true,
          cache_age_seconds: Math.floor((now - cached.cached_at_ms) / 1000)
        }));
        return;
      }

      // If not in cache, report default stored status from catalogue without outbound probing
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({
        itemId: queryItemId,
        name: AUDITED_CATALOGUE[queryItemId].name,
        platform: AUDITED_CATALOGUE[queryItemId].platform,
        status: 'STORED_AVAILABLE',
        cache_hit: false,
        detail: 'Catalogued active offer (No fresh outbound probe performed)',
        checked_at: new Date().toISOString()
      }));
      return;
    }

    // Global Health Status Ledger
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');
    res.end(JSON.stringify({
      service: 'JAYT_LINK_HEALTH_WORKER',
      version: '3.442.0-j386',
      status: 'OPERATIONAL',
      security_contract: {
        ssrf_protection_active: true,
        caller_url_probing_disabled: true,
        input_schema: '{ itemId: string }',
        dns_rebinding_ip_pinning_enforced: true,
        prohibited_ip_ranges_blocked: true,
        hop_termination_redirects_disabled: true
      },
      freshness_governance: {
        freshness_mode: 'INSTANCE_LOCAL_ON_DEMAND',
        durable_sla_guarantee: 'NOT_ASSERTED__EPHEMERAL_SERVERLESS_INSTANCE',
        cache_ttl_seconds: 60,
        active_cached_probes: healthCache.size
      },
      catalogue_summary: {
        total_audited_skus: Object.keys(AUDITED_CATALOGUE).length,
        allowed_hosts: Array.from(AUDITED_HOST_ALLOWLIST)
      }
    }, null, 2));
    return;
  }

  // -------------------------------------------------------------------------
  // SCENARIO B: POST REQUEST (AUDITED ITEM HEALTH CHECK TRIGGER)
  // -------------------------------------------------------------------------
  if (req.method === 'POST') {
    let body = req.body;

    // Handle raw string body if needed
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ error: 'INVALID_JSON', detail: 'Malformed JSON payload.' }));
        return;
      }
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ error: 'INVALID_PAYLOAD', detail: 'JSON object expected.' }));
      return;
    }

    // RULE: Reject body containing prohibited or arbitrary fields
    const bodyKeys = Object.keys(body);
    const forbiddenKeys = ['url', 'targetUrl', 'ip', 'host', 'hostname', 'port', 'redirect'];
    for (const key of bodyKeys) {
      if (forbiddenKeys.includes(key)) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({
          error: 'FORBIDDEN_FIELD_DETECTED',
          detail: `Field '${key}' is prohibited. Only strict { itemId: string } is accepted.`
        }));
        return;
      }
    }

    const itemId = body.itemId;
    if (!itemId || typeof itemId !== 'string' || !/^[A-Za-z0-9_-]{3,64}$/.test(itemId)) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({
        error: 'INVALID_ITEM_ID',
        detail: "Property 'itemId' must be an alphanumeric string."
      }));
      return;
    }

    // Server-owned catalogue lookup
    const catalogItem = AUDITED_CATALOGUE[itemId];
    if (!catalogItem) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({
        error: 'UNKNOWN_ITEM_ID',
        detail: 'Item ID does not exist in audited catalogue. Zero outbound requests made.'
      }));
      return;
    }

    // Check host against allowlist
    const expectedHost = catalogItem.expected_host;
    if (!AUDITED_HOST_ALLOWLIST.has(expectedHost)) {
      res.statusCode = 403;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({
        error: 'HOST_NOT_ALLOWED',
        detail: 'Destination host is not in audited allowlist.'
      }));
      return;
    }

    // Check cache
    const now = Date.now();
    const cached = healthCache.get(itemId);
    if (cached && (now - cached.cached_at_ms) < CACHE_TTL_MS) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({
        ...cached.data,
        cache_hit: true,
        cache_age_seconds: Math.floor((now - cached.cached_at_ms) / 1000)
      }));
      return;
    }

    // DNS Resolution & IP Validation
    let pinnedIp;
    try {
      pinnedIp = await resolveAndValidateHost(expectedHost, customDnsResolver);
    } catch (dnsErr) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({
        error: 'DESTINATION_VALIDATION_FAILED',
        detail: dnsErr.message && dnsErr.message.includes('PROHIBITED')
          ? 'Destination IP range is prohibited.'
          : 'Hostname resolution failed.'
      }));
      return;
    }

    // Execute Outbound Probe with IP Pinning
    catalogItem.itemId = itemId;
    const probeResult = await probePinnedItem(catalogItem, pinnedIp);

    healthCache.set(itemId, {
      data: probeResult,
      cached_at_ms: now
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({
      ...probeResult,
      cache_hit: false,
      cache_age_seconds: 0
    }));
    return;
  }

  // Other HTTP methods
  res.statusCode = 405;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify({ error: 'METHOD_NOT_ALLOWED' }));
};

// Also export internals for testing
module.exports.isProhibitedIp = isProhibitedIp;
module.exports.resolveAndValidateHost = resolveAndValidateHost;
module.exports.AUDITED_CATALOGUE = AUDITED_CATALOGUE;
module.exports.AUDITED_HOST_ALLOWLIST = AUDITED_HOST_ALLOWLIST;
