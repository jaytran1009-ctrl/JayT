/**
 * JAYT COMMUNITY SAVINGS COHORT SWEEP (077R1) — ZERO HARD-CODED CLASSIFICATION
 * Directive: JAYT-077R1-SWEEP-ENGINE-FIX
 * 
 * Rules:
 * 1. ZERO hardcoded classification by source_id.
 * 2. Every probe output strictly reflects HTTP probe results as NETWORK_PROBE_METADATA_ONLY.
 * 3. Pre-existing verified staging references are strictly isolated and not inferred from probes.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');
const http = require('http');

const repoRoot = path.resolve(__dirname, '..');
const runDirName = `run_cohort_sweep_077r1_${Date.now()}`;
const runDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', runDirName);
fs.mkdirSync(runDir, { recursive: true });

function getSha256(bufOrStr) {
  const buf = Buffer.isBuffer(bufOrStr) ? bufOrStr : Buffer.from(bufOrStr, 'utf8');
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const SOURCES_32 = [
  // 1. Rạp chiếu phim Đà Nẵng (5)
  { id: 'SRC_01_CGV', brand: 'CGV Cinemas Đà Nẵng', category: 'CINEMA', url: 'https://www.cgv.vn/default/cinox/site/cgv-vinh-trung-plaza' },
  { id: 'SRC_02_GALAXY', brand: 'Galaxy Cinema Đà Nẵng', category: 'CINEMA', url: 'https://www.galaxycine.vn/khuyen-mai' },
  { id: 'SRC_03_METIZ', brand: 'Metiz Cinema Đà Nẵng', category: 'CINEMA', url: 'https://metiz.vn/khuyen-mai/' },
  { id: 'SRC_04_LOTTE_CINEMA', brand: 'Lotte Cinema Đà Nẵng', category: 'CINEMA', url: 'https://www.lottecinemavn.com/LCHS/Contents/Event/Event-List.aspx' },
  { id: 'SRC_05_STARLIGHT', brand: 'Starlight Cinema Đà Nẵng', category: 'CINEMA', url: 'https://starlight.vn/khuyen-mai.html' },

  // 2. F&B Ăn Nhanh & Pizza (5)
  { id: 'SRC_06_JOLLIBEE', brand: 'Jollibee Việt Nam', category: 'FAST_FOOD', url: 'https://jollibee.com.vn/khuyen-mai' },
  { id: 'SRC_07_LOTTERIA', brand: 'Lotteria Việt Nam', category: 'FAST_FOOD', url: 'https://www.lotteria.vn/khuyen-mai' },
  { id: 'SRC_08_KFC', brand: 'KFC Việt Nam', category: 'FAST_FOOD', url: 'https://www.kfcvietnam.com.vn/khuyen-mai' },
  { id: 'SRC_09_DOMINOS', brand: 'Domino\'s Pizza VN', category: 'FAST_FOOD', url: 'https://dominos.vn/khuyen-mai' },
  { id: 'SRC_10_PIZZA_HUT', brand: 'Pizza Hut VN', category: 'FAST_FOOD', url: 'https://pizzahut.vn/khuyen-mai' },

  // 3. Cà phê & Trà Sữa (7)
  { id: 'SRC_11_HIGHLANDS', brand: 'Highlands Coffee', category: 'COFFEE_TEA', url: 'https://www.highlandscoffee.com.vn/vn/tin-tuc-khuyen-mai.html' },
  { id: 'SRC_12_PHELA', brand: 'Phê La', category: 'COFFEE_TEA', url: 'https://phela.vn/' },
  { id: 'SRC_13_KATINAT', brand: 'Katinat Saigon Kafe', category: 'COFFEE_TEA', url: 'https://katinat.vn/' },
  { id: 'SRC_14_THE_COFFEE_HOUSE', brand: 'The Coffee House', category: 'COFFEE_TEA', url: 'https://thecoffeehouse.com/pages/tin-tuc-khuyen-mai' },
  { id: 'SRC_15_GONG_CHA', brand: 'Gong Cha Việt Nam', category: 'COFFEE_TEA', url: 'https://gongcha.com.vn/khuyen-mai/' },
  { id: 'SRC_16_PHUC_LONG', brand: 'Phúc Long Coffee & Tea', category: 'COFFEE_TEA', url: 'https://phuclong.com.vn/khuyen-mai' },
  { id: 'SRC_17_STARBUCKS', brand: 'Starbucks Vietnam', category: 'COFFEE_TEA', url: 'https://starbucks.vn/' },

  // 4. Di chuyển & Trải nghiệm (5)
  { id: 'SRC_18_XANH_SM', brand: 'Xanh SM', category: 'MOBILITY', url: 'https://www.xanhsm.com/khuyen-mai/' },
  { id: 'SRC_19_GRAB_PROMO', brand: 'Grab Việt Nam Promotions', category: 'MOBILITY', url: 'https://www.grab.com/vn/promotions/' },
  { id: 'SRC_20_BE_APP', brand: 'Be Group Khuyến Mại', category: 'MOBILITY', url: 'https://be.com.vn/khuyen-mai/' },
  { id: 'SRC_21_KLOOK_VN', brand: 'Klook Việt Nam', category: 'EXPERIENCE', url: 'https://www.klook.com/vi/promo/vietnam' },
  { id: 'SRC_22_TRAVELOKA', brand: 'Traveloka VN', category: 'EXPERIENCE', url: 'https://www.traveloka.com/vi-vn/promotion' },

  // 5. Sàn TMĐT & Giao Đồ Ăn (8)
  { id: 'SRC_23_SHOPEE_VOUCHERS', brand: 'Shopee Mã Giảm Giá', category: 'ECOMMERCE', url: 'https://shopee.vn/m/ma-giam-gia' },
  { id: 'SRC_24_LAZADA_PROMO', brand: 'Lazada Khuyến Mãi', category: 'ECOMMERCE', url: 'https://www.lazada.vn/' },
  { id: 'SRC_25_TIKTOK_SHOP', brand: 'TikTok Shop VN', category: 'ECOMMERCE', url: 'https://www.tiktok.com/tag/tiktokshop' },
  { id: 'SRC_26_TIKI_PROMO', brand: 'Tiki Khuyến Mãi', category: 'ECOMMERCE', url: 'https://tiki.vn/khuyen-mai' },
  { id: 'SRC_27_SHOPEEFOOD_DNG', brand: 'ShopeeFood Đà Nẵng', category: 'FOOD_DELIVERY', url: 'https://shopeefood.vn/da-nang' },
  { id: 'SRC_28_GRABFOOD_DNG', brand: 'GrabFood Đà Nẵng', category: 'FOOD_DELIVERY', url: 'https://food.grab.com/vn/vi/' },
  { id: 'SRC_29_BEFOOD_DNG', brand: 'BeFood Đà Nẵng', category: 'FOOD_DELIVERY', url: 'https://be.com.vn/dich-vu/be-food/' },
  { id: 'SRC_30_SHOPEE_AFF_PORTAL', brand: 'Shopee Partner Center', category: 'AFFILIATE_PORTAL', url: 'https://affiliate.shopee.vn/' },
  { id: 'SRC_31_LAZADA_AFF_PORTAL', brand: 'Lazada Partner Center', category: 'AFFILIATE_PORTAL', url: 'https://lazada.vn/affiliate' },
  { id: 'SRC_32_TIKTOK_AFF_PORTAL', brand: 'TikTok Creator Marketplace', category: 'AFFILIATE_PORTAL', url: 'https://creator.tiktok.com/' }
];

console.log(`🚀 [JAYT-077R1-SWEEP] Bắt đầu quét thăm dò 32 nguồn công khai (Thuần túy Probe Metadata)...`);

function fetchUrl(url, timeoutMs = 6000) {
  return new Promise((resolve) => {
    try {
      const u = new URL(url);
      const client = u.protocol === 'https:' ? https : http;
      const req = client.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7'
        },
        timeout: timeoutMs
      }, (res) => {
        let data = '';
        res.on('data', chunk => {
          if (data.length < 50000) data += chunk;
        });
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            bodyLength: data.length,
            sha256: getSha256(data)
          });
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({ statusCode: 408, headers: {}, bodyLength: 0, sha256: getSha256('') });
      });

      req.on('error', (err) => {
        resolve({ statusCode: 0, error: err.message, headers: {}, bodyLength: 0, sha256: getSha256('') });
      });
    } catch (e) {
      resolve({ statusCode: -1, error: e.message, headers: {}, bodyLength: 0, sha256: getSha256('') });
    }
  });
}

/**
 * STRICT PROBE CLASSIFIER (ZERO HARDCODED ID CHECKS)
 * Classifies solely based on HTTP network response status.
 * Every source without verified disk bundle is classified as NETWORK_PROBE_METADATA_ONLY.
 */
function classifyProbeResponse(code) {
  if (code >= 200 && code < 300) {
    return {
      probe_status: 'PROBE_ACCESSIBLE_HTTP_200',
      governance_classification: 'NETWORK_PROBE_METADATA_ONLY',
      radar_scope: 'DISCOVERY_RADAR_ONLY',
      deal_candidate_eligible: false,
      reason: `Trang web phản hồi HTTP ${code}. Cần thu thập đầy đủ HTML/PNG/bảng giá và receipt độc lập trên đĩa để thẩm định deal.`
    };
  }
  if (code >= 300 && code < 400) {
    return {
      probe_status: `PROBE_REDIRECT_HTTP_${code}`,
      governance_classification: 'NETWORK_PROBE_METADATA_ONLY',
      radar_scope: 'DISCOVERY_RADAR_ONLY',
      deal_candidate_eligible: false,
      reason: `Trang web chuyển hướng (HTTP ${code}). Không thể trích xuất deal từ URL chuyển hướng khi thiếu bằng chứng đích.`
    };
  }
  if (code === 403 || code === 429) {
    return {
      probe_status: `PROBE_BLOCKED_HTTP_${code}`,
      governance_classification: 'NETWORK_PROBE_METADATA_ONLY',
      radar_scope: 'DISCOVERY_RADAR_BLOCKED',
      deal_candidate_eligible: false,
      reason: `Trang web chặn quét tự động (HTTP ${code}). Tuân thủ nghiêm ngặt nguyên tắc 0 bypass CAPTCHA.`
    };
  }
  if (code === 404) {
    return {
      probe_status: 'PROBE_NOT_FOUND_HTTP_404',
      governance_classification: 'NETWORK_PROBE_METADATA_ONLY',
      radar_scope: 'DISCOVERY_RADAR_DEAD_ROUTE',
      deal_candidate_eligible: false,
      reason: 'URL đích không tồn tại (HTTP 404). Tuyệt đối không suy diễn deal từ URL lỗi.'
    };
  }
  return {
    probe_status: `PROBE_FAILED_HTTP_${code}`,
    governance_classification: 'NETWORK_PROBE_METADATA_ONLY',
    radar_scope: 'DISCOVERY_RADAR_UNAVAILABLE',
    deal_candidate_eligible: false,
    reason: `Lỗi kết nối hoặc timeout (Mã: ${code}).`
  };
}

(async () => {
  const results = [];
  const statusCounts = {};

  for (let i = 0; i < SOURCES_32.length; i++) {
    const src = SOURCES_32[i];
    process.stdout.write(`  [${i + 1}/${SOURCES_32.length}] Thăm dò mạng: ${src.brand}... `);
    const fetchRes = await fetchUrl(src.url, 5000);
    const probeClass = classifyProbeResponse(fetchRes.statusCode);

    statusCounts[probeClass.probe_status] = (statusCounts[probeClass.probe_status] || 0) + 1;

    // Save individual probe metadata receipt
    const receiptFile = `probe_receipt_${src.id.toLowerCase()}.json`;
    const receiptPath = path.join(runDir, receiptFile);
    fs.writeFileSync(receiptPath, JSON.stringify({
      source_id: src.id,
      brand: src.brand,
      category: src.category,
      url: src.url,
      http_status: fetchRes.statusCode,
      body_length_bytes: fetchRes.bodyLength,
      body_sha256: fetchRes.sha256,
      probe_classification: probeClass,
      probed_at: new Date().toISOString()
    }, null, 2), 'utf8');

    results.push({
      ...src,
      http_status: fetchRes.statusCode,
      body_length_bytes: fetchRes.bodyLength,
      body_sha256: fetchRes.sha256,
      receipt_file: receiptFile,
      ...probeClass
    });

    console.log(`HTTP ${fetchRes.statusCode} -> [${probeClass.probe_status}]`);
  }

  // Save full cohort sweep JSON
  const sweepJsonPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'COMMUNITY_SAVINGS_COHORT_SWEEP_077R1.json');
  fs.writeFileSync(sweepJsonPath, JSON.stringify({
    work_order: 'JAYT-077R1-SWEEP-ENGINE-FIX',
    swept_at: new Date().toISOString(),
    total_sources: SOURCES_32.length,
    status_summary: statusCounts,
    all_outputs_classified_as: 'NETWORK_PROBE_METADATA_ONLY',
    zero_hardcoded_id_rules_enforced: true,
    evidence_run_dir: runDirName,
    sources: results
  }, null, 2), 'utf8');

  console.log(`\n🎉 [COHORT-SWEEP-077R1-SUCCESS] Hoàn tất thăm dò 32 nguồn (100% NETWORK_PROBE_METADATA_ONLY):`);
  console.log(`   JSON Evidence: ${sweepJsonPath}`);
  console.log(`   Status Summary:`, statusCounts);
})();
