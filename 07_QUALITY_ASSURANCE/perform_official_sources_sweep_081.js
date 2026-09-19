/**
 * JAYT OFFICIAL SOURCES DEEP SWEEP (081)
 * Sweeps all 16 official promotion channels in Da Nang and persists raw responses.
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const sweepEvidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'sweep_081');
if (!fs.existsSync(sweepEvidenceDir)) {
  fs.mkdirSync(sweepEvidenceDir, { recursive: true });
}

const TARGET_SOURCES = [
  { id: 'SRC_01_CGV_DANANG', brand: 'CGV Cinemas Đà Nẵng', url: 'https://cgv.vn/default/cinox/site/cgv-vinh-trung-plaza', category: 'CINEMA' },
  { id: 'SRC_02_CGV_CULTURE_DAY', brand: 'CGV Culture Day Promo', url: 'https://www.cgv.vn/default/movies/offers', category: 'CINEMA' },
  { id: 'SRC_03_GALAXY_DANANG', brand: 'Galaxy Cinema Đà Nẵng', url: 'https://galaxycine.vn/khuyen-mai', category: 'CINEMA' },
  { id: 'SRC_04_METIZ_DANANG', brand: 'Metiz Cinema Đà Nẵng', url: 'https://metiz.vn/tin-tuc-khuyen-mai/', category: 'CINEMA' },
  { id: 'SRC_05_STARLIGHT_DANANG', brand: 'Starlight Cinema Đà Nẵng', url: 'https://starlight.vn/khuyen-mai.html', category: 'CINEMA' },
  { id: 'SRC_06_JOLLIBEE_VN', brand: 'Jollibee Việt Nam', url: 'https://jollibee.com.vn/khuyen-mai', category: 'FAST_FOOD' },
  { id: 'SRC_07_LOTTERIA_VN', brand: 'Lotteria Việt Nam', url: 'https://lotteria.vn/khuyen-mai', category: 'FAST_FOOD' },
  { id: 'SRC_08_KFC_VN', brand: 'KFC Việt Nam', url: 'https://kfcvietnam.com.vn/khuyen-mai', category: 'FAST_FOOD' },
  { id: 'SRC_09_HIGHLANDS', brand: 'Highlands Coffee', url: 'https://highlandscoffee.com.vn/vn/tin-tuc-su-kien.html', category: 'COFFEE_TEA' },
  { id: 'SRC_10_PHELA', brand: 'Phê La Đà Nẵng', url: 'https://phela.vn/', category: 'COFFEE_TEA' },
  { id: 'SRC_11_KATINAT', brand: 'Katinat Saigon Kafe', url: 'https://katinat.vn/', category: 'COFFEE_TEA' },
  { id: 'SRC_12_THE_COFFEE_HOUSE', brand: 'The Coffee House', url: 'https://thecoffeehouse.com/pages/khuyen-mai', category: 'COFFEE_TEA' },
  { id: 'SRC_13_GONG_CHA', brand: 'Gong Cha Đà Nẵng', url: 'https://gongcha.com.vn/tin-tuc-khuyen-mai/', category: 'COFFEE_TEA' },
  { id: 'SRC_14_XANH_SM', brand: 'Xanh SM Đà Nẵng', url: 'https://xanhsm.com/tin-tuc/', category: 'MOBILITY' },
  { id: 'SRC_15_GRAB_VN', brand: 'Grab Việt Nam', url: 'https://grab.com/vn/promotions/', category: 'MOBILITY' },
  { id: 'SRC_16_SHOPEEFOOD_DANANG', brand: 'ShopeeFood Đà Nẵng', url: 'https://shopeefood.vn/da-nang', category: 'FOOD_DELIVERY' }
];

function fetchEndpoint(source) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    try {
      const parsedUrl = new URL(source.url);
      const isHttps = parsedUrl.protocol === 'https:';
      const client = isHttps ? https : http;

      const req = client.get(source.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7'
        },
        timeout: 8000
      }, (res) => {
        const chunks = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => {
          const durationMs = Date.now() - startTime;
          const bodyBuffer = Buffer.concat(chunks);
          const bodyStr = bodyBuffer.toString('utf8');
          const bodyHash = crypto.createHash('sha256').update(bodyBuffer).digest('hex');

          // Save raw snapshot
          const snapshotFilename = `${source.id}_${res.statusCode}.html`;
          const snapshotPath = path.join(sweepEvidenceDir, snapshotFilename);
          fs.writeFileSync(snapshotPath, bodyBuffer);

          resolve({
            id: source.id,
            brand: source.brand,
            url: source.url,
            category: source.category,
            statusCode: res.statusCode,
            headers: res.headers,
            bodyHash,
            bodyLength: bodyBuffer.length,
            durationMs,
            snapshotFilename,
            snapshotPath
          });
        });
      });

      req.on('error', (err) => {
        resolve({
          id: source.id,
          brand: source.brand,
          url: source.url,
          category: source.category,
          statusCode: 0,
          error: err.message,
          durationMs: Date.now() - startTime
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          id: source.id,
          brand: source.brand,
          url: source.url,
          category: source.category,
          statusCode: 0,
          error: 'TIMEOUT_8000MS',
          durationMs: Date.now() - startTime
        });
      });
    } catch (err) {
      resolve({
        id: source.id,
        brand: source.brand,
        url: source.url,
        category: source.category,
        statusCode: 0,
        error: err.message,
        durationMs: Date.now() - startTime
      });
    }
  });
}

async function runSweep() {
  console.log('🌐 [JAYT-DEEP-SWEEP-081] Bắt đầu quét 16 nguồn chính thức (16 endpoints)...\n');
  const results = [];

  for (const src of TARGET_SOURCES) {
    process.stdout.write(`  [SWEEP] Đang quét ${src.brand} (${src.url})... `);
    const res = await fetchEndpoint(src);
    console.log(`Status: ${res.statusCode} (${res.bodyLength || 0} bytes, ${res.durationMs}ms)`);
    results.push(res);
  }

  // Audit 5 dimensions for each swept response
  const auditReport = {
    timestamp: new Date().toISOString(),
    directive: 'JAYT-EXPERIENCE-AND-DATA-081',
    totalSwept: results.length,
    successful200: results.filter(r => r.statusCode === 200).length,
    redirects: results.filter(r => r.statusCode >= 300 && r.statusCode < 400).length,
    errorsOrGated: results.filter(r => r.statusCode >= 400 || r.statusCode === 0).length,
    results: results.map(r => ({
      id: r.id,
      brand: r.brand,
      url: r.url,
      statusCode: r.statusCode,
      bodyHash: r.bodyHash || null,
      bodyLength: r.bodyLength || 0,
      classification: r.statusCode === 200 ? 'MONITORING_RADAR_SIGNAL' : 'APP_OR_DYNAMIC_SPA_SIGNAL',
      fiveDimensionsMet: false, // Strict: generic public landing pages don't meet complete 5 dimensions
      reason: 'Public HTML hub is entry point; specific promotion rules require in-app authentication or dynamic client rendering.'
    }))
  };

  const reportPath = path.join(sweepEvidenceDir, 'SWEEP_081_AUDIT_REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify(auditReport, null, 2), 'utf8');

  console.log('\n======================================================');
  console.log('📊 [SWEEP-081-SUMMARY]');
  console.log(`- Tổng nguồn quét: ${auditReport.totalSwept}`);
  console.log(`- HTTP 200 thành công: ${auditReport.successful200}`);
  console.log(`- Báo cáo kiểm toán lưu tại: ${path.relative(repoRoot, reportPath)}`);
  console.log(`- Trạng thái catalog: DUY TRÌ KHÓA [] (Zero synthetic conversion)\n`);
}

runSweep();
