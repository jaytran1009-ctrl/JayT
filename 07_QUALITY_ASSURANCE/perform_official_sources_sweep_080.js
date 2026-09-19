/**
 * JAYT OFFICIAL SOURCES DEEP SWEEP (080)
 * Deep sweep of public promotion endpoints of 16 target brands/platforms.
 * Captures raw HTML responses, hashes, headers and classifies into 5-dimension Evidence Bundles.
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const sweepEvidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_080');
fs.mkdirSync(sweepEvidenceDir, { recursive: true });

const TARGET_SOURCES = [
  { id: 'SRC_CGV_DANANG', brand: 'CGV Cinemas Đà Nẵng', category: 'CINEMA', url: 'https://cgv.vn/default/cinox/site/cgv-vinh-trung-plaza' },
  { id: 'SRC_CGV_CULTURE_DAY', brand: 'CGV Culture Day Promo', category: 'CINEMA', url: 'https://www.cgv.vn/default/movies/offers' },
  { id: 'SRC_GALAXY_DANANG', brand: 'Galaxy Cinema Đà Nẵng', category: 'CINEMA', url: 'https://galaxycine.vn/khuyen-mai' },
  { id: 'SRC_METIZ_DANANG', brand: 'Metiz Cinema Đà Nẵng', category: 'CINEMA', url: 'https://metiz.vn/tin-tuc-khuyen-mai/' },
  { id: 'SRC_STARLIGHT_DANANG', brand: 'Starlight Cinema Đà Nẵng', category: 'CINEMA', url: 'https://starlight.vn/khuyen-mai.html' },
  { id: 'SRC_JOLLIBEE_PROMO', brand: 'Jollibee Việt Nam', category: 'FAST_FOOD', url: 'https://jollibee.com.vn/khuyen-mai' },
  { id: 'SRC_LOTTERIA_PROMO', brand: 'Lotteria Việt Nam', category: 'FAST_FOOD', url: 'https://lotteria.vn/khuyen-mai' },
  { id: 'SRC_KFC_PROMO', brand: 'KFC Việt Nam', category: 'FAST_FOOD', url: 'https://kfcvietnam.com.vn/khuyen-mai' },
  { id: 'SRC_HIGHLANDS_PROMO', brand: 'Highlands Coffee', category: 'COFFEE_TEA', url: 'https://highlandscoffee.com.vn/vn/tin-tuc-su-kien.html' },
  { id: 'SRC_PHELA_DANANG', brand: 'Phê La Đà Nẵng', category: 'COFFEE_TEA', url: 'https://phela.vn/' },
  { id: 'SRC_KATINAT_DANANG', brand: 'Katinat Saigon Kafe', category: 'COFFEE_TEA', url: 'https://katinat.vn/' },
  { id: 'SRC_THE_COFFEE_HOUSE', brand: 'The Coffee House', category: 'COFFEE_TEA', url: 'https://thecoffeehouse.com/pages/khuyen-mai' },
  { id: 'SRC_GONG_CHA_DANANG', brand: 'Gong Cha Đà Nẵng', category: 'COFFEE_TEA', url: 'https://gongcha.com.vn/tin-tuc-khuyen-mai/' },
  { id: 'SRC_XANH_SM_DANANG', brand: 'Xanh SM Đà Nẵng', category: 'MOBILITY', url: 'https://xanhsm.com/tin-tuc/' },
  { id: 'SRC_GRAB_VN_PROMO', brand: 'Grab Việt Nam', category: 'MOBILITY', url: 'https://grab.com/vn/promotions/' },
  { id: 'SRC_SHOPEEFOOD_DANANG', brand: 'ShopeeFood Đà Nẵng', category: 'FOOD_DELIVERY', url: 'https://shopeefood.vn/da-nang' }
];

function fetchProbe(source) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    try {
      const parsed = new URL(source.url);
      const isHttps = parsed.protocol === 'https:';
      const client = isHttps ? https : http;

      const req = client.get(source.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7'
        },
        timeout: 10000
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          const latencyMs = Date.now() - startTime;
          const sha256 = crypto.createHash('sha256').update(data, 'utf8').digest('hex');
          
          // Save raw body to evidence folder
          const rawFileName = `${source.id}_raw_${Date.now()}.html`;
          const rawFilePath = path.join(sweepEvidenceDir, rawFileName);
          fs.writeFileSync(rawFilePath, data, 'utf8');

          resolve({
            id: source.id,
            brand: source.brand,
            category: source.category,
            url: source.url,
            statusCode: res.statusCode,
            headers: res.headers,
            latencyMs,
            bodyLength: Buffer.byteLength(data, 'utf8'),
            sha256,
            rawFilePathRel: path.relative(repoRoot, rawFilePath).replace(/\\/g, '/'),
            snippet: data.substring(0, 500).replace(/\s+/g, ' ').trim()
          });
        });
      });

      req.on('error', (err) => {
        resolve({
          id: source.id,
          brand: source.brand,
          category: source.category,
          url: source.url,
          statusCode: 0,
          error: err.message,
          latencyMs: Date.now() - startTime,
          bodyLength: 0,
          sha256: null,
          rawFilePathRel: null
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          id: source.id,
          brand: source.brand,
          category: source.category,
          url: source.url,
          statusCode: 0,
          error: 'TIMEOUT_10000MS',
          latencyMs: Date.now() - startTime,
          bodyLength: 0,
          sha256: null,
          rawFilePathRel: null
        });
      });
    } catch (err) {
      resolve({
        id: source.id,
        brand: source.brand,
        category: source.category,
        url: source.url,
        statusCode: 0,
        error: err.message,
        latencyMs: Date.now() - startTime,
        bodyLength: 0,
        sha256: null,
        rawFilePathRel: null
      });
    }
  });
}

async function runDeepSweep() {
  console.log(`🌐 [JAYT-DEEP-SWEEP-080] Bắt đầu quét 16 nguồn chính thức (${TARGET_SOURCES.length} endpoints)...\n`);

  const results = [];
  for (const src of TARGET_SOURCES) {
    process.stdout.write(`  [SWEEP] Đang quét ${src.brand} (${src.url})... `);
    const res = await fetchProbe(src);
    results.push(res);
    console.log(`Status: ${res.statusCode} (${res.bodyLength} bytes, ${res.latencyMs}ms)`);
  }

  // Audit and evaluate 5 dimensions
  const summary = {
    timestamp: new Date().toISOString(),
    totalSources: results.length,
    http200Count: results.filter(r => r.statusCode === 200).length,
    redirectOrErrorCount: results.filter(r => r.statusCode !== 200).length,
    qualifiedEvidenceBundles: [],
    monitoringRadarSignals: []
  };

  results.forEach(r => {
    // 5-Dimension Gate:
    // Dimension 1: Price / discount explicitly present
    // Dimension 2: Explicit conditions
    // Dimension 3: Explicit validity date
    // Dimension 4: Da Nang scope verified
    // Dimension 5: Raw snapshot persisted on disk
    if (r.statusCode === 200 && r.bodyLength > 500 && r.rawFilePathRel) {
      summary.monitoringRadarSignals.push({
        id: r.id,
        brand: r.brand,
        category: r.category,
        url: r.url,
        statusCode: r.statusCode,
        sha256: r.sha256,
        rawFile: r.rawFilePathRel,
        status: 'MONITORING_RADAR_SIGNAL',
        note: 'Đã lưu snapshot thô trên đĩa; cần trích xuất chi tiết từng chiến dịch theo bằng chứng đối soát.'
      });
    } else {
      summary.monitoringRadarSignals.push({
        id: r.id,
        brand: r.brand,
        category: r.category,
        url: r.url,
        statusCode: r.statusCode,
        error: r.error || 'NON_200_RESPONSE',
        status: 'MONITORING_RADAR_SIGNAL',
        note: 'Không có nội dung HTTP 200 trực tiếp; tiếp tục theo dõi radar.'
      });
    }
  });

  const reportPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_080', 'SWEEP_080_AUDIT_REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify(summary, null, 2), 'utf8');

  console.log(`\n======================================================`);
  console.log(`📊 [SWEEP-080-SUMMARY]`);
  console.log(`- Tổng nguồn quét: ${summary.totalSources}`);
  console.log(`- HTTP 200 thành công: ${summary.http200Count}`);
  console.log(`- Báo cáo kiểm toán lưu tại: ${path.relative(repoRoot, reportPath)}`);
  console.log(`- Trạng thái catalog: DUY TRÌ KHÓA [] (Zero synthetic conversion)\n`);
}

runDeepSweep();
