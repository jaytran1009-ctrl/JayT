const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const harvestDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_200_autopilot_harvest');
if (!fs.existsSync(harvestDir)) fs.mkdirSync(harvestDir, { recursive: true });

function sha256Str(str) { return crypto.createHash('sha256').update(str, 'utf8').digest('hex'); }
function sha256Buf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }

function fetchUrl(url, timeoutMs = 12000) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(url);
      const client = parsed.protocol === 'https:' ? https : http;
      const req = client.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'vi-VN,vi;q=0.9,en;q=0.8'
        },
        timeout: timeoutMs
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          let nextUrl = res.headers.location;
          if (nextUrl.startsWith('/')) {
            nextUrl = parsed.origin + nextUrl;
          }
          return fetchUrl(nextUrl, timeoutMs).then(resolve);
        }
        let chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => {
          const bodyBuf = Buffer.concat(chunks);
          resolve({ status: res.statusCode, body: bodyBuf.toString('utf8'), rawBuf: bodyBuf, url });
        });
      });
      req.on('error', (err) => resolve({ status: 500, error: err.message, url }));
      req.on('timeout', () => { req.destroy(); resolve({ status: 408, error: 'TIMEOUT', url }); });
    } catch (e) {
      resolve({ status: 500, error: e.message, url });
    }
  });
}

// Deep Leaf Targets to Harvest for Autopilot Sprint 200
const deepTargets = [
  // Metiz Cinema Leaf Articles
  { id: 'LEAF_200_METIZ_HELIO_INFO', url: 'https://helio.vn/vi/rap-chieu-phim-metiz-cinema-da-nang/' },
  { id: 'LEAF_200_METIZ_ALL_PROMOS', url: 'https://metiz.vn/tin-va-khuyen-mai.html' },
  { id: 'LEAF_200_METIZ_ABOUT', url: 'https://metiz.vn/gioi-thieu.html' },

  // Starlight Cinema Leaf Articles
  { id: 'LEAF_200_STARLIGHT_PROMOS', url: 'https://starlight.vn/uu-dai.html' },
  { id: 'LEAF_200_STARLIGHT_DANANG_INFO', url: 'https://starlight.vn/rap-chieu-phim/starlight-da-nang.html' },

  // DanaBus Leaf Pricing & Target Rules
  { id: 'LEAF_200_DANABUS_VE_THANG', url: 'https://danangbus.vn/tin-tuc/huong-dan-dang-ky-ve-thang-xe-buyt-da-nang.html' },
  { id: 'LEAF_200_DANABUS_CHINH_SACH', url: 'https://danangbus.vn/chinh-sach-gia-ve.html' },

  // DSVN Student Policy
  { id: 'LEAF_200_DSVN_POLICY', url: 'https://dsvn.vn/#/thongtindatcho' },

  // Mikazuki Leaf Promos
  { id: 'LEAF_200_MIKAZUKI_WATERPARK', url: 'https://mikazuki.com.vn/vn/water-park-365.html' },
  { id: 'LEAF_200_MIKAZUKI_PROMO_LIST', url: 'https://mikazuki.com.vn/vn/special-offers.html' },

  // Domino's & Pizza Company Promos
  { id: 'LEAF_200_DOMINOS_PROMO', url: 'https://dominos.vn/khuyen-mai' },
  { id: 'LEAF_200_THE_PIZZA_COMPANY_PROMO', url: 'https://thepizzacompany.vn/promotions' },

  // Galaxy Cinema Co.opmart Da Nang
  { id: 'LEAF_200_GALAXY_DANANG_PRICES', url: 'https://www.galaxycine.vn/rap-gia-ve/galaxy-da-nang/' },
  { id: 'LEAF_200_GALAXY_HAPPY_DAY', url: 'https://www.galaxycine.vn/khuyen-mai/happy-day/' },

  // Fast Food & Beverage Chains
  { id: 'LEAF_200_JOLLIBEE_PROMO', url: 'https://jollibee.com.vn/khuyen-mai' },
  { id: 'LEAF_200_HIGHLANDS_PROMO', url: 'https://www.highlandscoffee.com.vn/vn/tin-tuc.html' },
  { id: 'LEAF_200_KFC_PROMO', url: 'https://www.kfcvietnam.com.vn/khuyen-mai' },
  { id: 'LEAF_200_LOTTERIA_PROMO', url: 'https://lotteria.vn/khuyen-mai' }
];

async function runAutopilotHarvest200() {
  console.log('========================================================================');
  console.log('🌐 JAYT-200: AUTOPILOT DEEP LEAF HARVESTER (LANES 1 & 2)');
  console.log('   Timestamp: ' + new Date().toISOString());
  console.log('========================================================================\n');

  const harvestReport = {
    harvest_id: 'HARVEST_200_' + Date.now(),
    timestamp: new Date().toISOString(),
    total_targets: deepTargets.length,
    successful_captures: 0,
    inconclusive_captures: 0,
    records: []
  };

  for (let i = 0; i < deepTargets.length; i++) {
    const t = deepTargets[i];
    console.log(`[${i + 1}/${deepTargets.length}] Fetching ${t.id} -> ${t.url}`);
    const res = await fetchUrl(t.url);

    if (res.status === 200 && res.body && res.body.trim().length > 200) {
      const fileName = `raw_leaf_${t.id}.html`;
      const filePath = path.join(harvestDir, fileName);
      fs.writeFileSync(filePath, res.body, 'utf8');
      const sha = sha256Str(res.body);

      harvestReport.successful_captures++;
      harvestReport.records.push({
        id: t.id,
        url: t.url,
        final_url: res.url,
        status: 'CAPTURED_HTTP_200',
        file_name: fileName,
        file_path: path.relative(repoRoot, filePath),
        sha256: sha,
        bytes: Buffer.byteLength(res.body, 'utf8')
      });
      console.log(`  ✅ SUCCESS: ${fileName} (${sha.substring(0, 16)}... | ${res.body.length} chars)`);
    } else {
      harvestReport.inconclusive_captures++;
      harvestReport.records.push({
        id: t.id,
        url: t.url,
        status: 'INCONCLUSIVE_HTTP_' + (res.status || 'ERROR'),
        error: res.error || 'Body too short or non-200'
      });
      console.log(`  ⚠️ INCONCLUSIVE: HTTP ${res.status} (${res.error || 'Short body'})`);
    }
  }

  const reportPath = path.join(harvestDir, 'AUTOPILOT_DEEP_LEAF_REPORT_200.json');
  fs.writeFileSync(reportPath, JSON.stringify(harvestReport, null, 2), 'utf8');
  console.log(`\n📄 Autopilot Harvest Report saved to: ${path.relative(repoRoot, reportPath)}`);
  console.log(`   Captured: ${harvestReport.successful_captures}/${harvestReport.total_targets}`);
  console.log(`   Inconclusive: ${harvestReport.inconclusive_captures}/${harvestReport.total_targets}`);
}

if (require.main === module) {
  runAutopilotHarvest200().catch(err => {
    console.error('Fatal Harvest Error:', err);
    process.exit(1);
  });
}

module.exports = { runAutopilotHarvest200, deepTargets };
