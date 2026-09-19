const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const leafDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'evidence_198_leaf_harvest');
if (!fs.existsSync(leafDir)) fs.mkdirSync(leafDir, { recursive: true });

function sha256(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }

const deepLeafTargets = [
  // 1. Starlight Cinema Da Nang Deep Leaves
  {
    id: 'LEAF_198_STARLIGHT_PRICES',
    name: 'Starlight Cinema Đà Nẵng — Bảng Giá Vé Chi Nhánh',
    url: 'https://starlight.vn/gia-ve/da-nang.html',
    brand: 'Starlight Cinema Đà Nẵng'
  },
  {
    id: 'LEAF_198_STARLIGHT_MEMBER',
    name: 'Starlight Cinema Đà Nẵng — Ngày Hội Thành Viên Happy Day',
    url: 'https://starlight.vn/uu-dai.html',
    brand: 'Starlight Cinema Đà Nẵng'
  },
  // 2. Metiz Cinema Da Nang Deep Leaves
  {
    id: 'LEAF_198_METIZ_PRICES',
    name: 'Metiz Cinema Helio Đà Nẵng — Bảng Giá Vé & U22',
    url: 'https://metiz.vn/gia-ve/',
    brand: 'Metiz Cinema Đà Nẵng'
  },
  {
    id: 'LEAF_198_METIZ_PROMO',
    name: 'Metiz Cinema Helio Đà Nẵng — Tin & Khuyến Mãi',
    url: 'https://metiz.vn/tin-va-khuyen-mai.html',
    brand: 'Metiz Cinema Đà Nẵng'
  },
  // 3. DanaBus Da Nang Deep Leaves
  {
    id: 'LEAF_198_DANABUS_FARES',
    name: 'DanaBus Đà Nẵng — Biểu Giá Vé Tháng Học Sinh Sinh Viên',
    url: 'https://danangbus.vn/tin-tuc/tin-tuc-16.html',
    brand: 'DanaBus Đà Nẵng'
  },
  {
    id: 'LEAF_198_DANABUS_HOME',
    name: 'DanaBus Đà Nẵng — Mạng Lưới Tuyến Trợ Giá',
    url: 'https://danangbus.vn/',
    brand: 'DanaBus Đà Nẵng'
  },
  // 4. Ga Đà Nẵng DSVN
  {
    id: 'LEAF_198_DSVN_STUDENT',
    name: 'Tổng Công Ty Đường Sắt Việt Nam — Chính Sách Giá Vé Sinh Viên',
    url: 'https://dsvn.vn/#/',
    brand: 'Đường Sắt Việt Nam (Ga Đà Nẵng)'
  },
  // 5. Helio Center Đà Nẵng
  {
    id: 'LEAF_198_HELIO_CENTER',
    name: 'Helio Center Đà Nẵng — Chợ Đêm & Tổ Hợp Giải Trí',
    url: 'https://helio.vn/',
    brand: 'Helio Center Đà Nẵng'
  },
  // 6. Suối Khoáng Nóng Núi Thần Tài
  {
    id: 'LEAF_198_NUI_THAN_TAI',
    name: 'Công Viên Suối Khoáng Nóng Núi Thần Tài — Bảng Giá Dịch Vụ',
    url: 'https://nuithantai.vn/',
    brand: 'Công Viên Suối Khoáng Nóng Núi Thần Tài'
  },
  // 7. Bảo Tàng Điêu Khắc Chăm
  {
    id: 'LEAF_198_CHAM_MUSEUM',
    name: 'Bảo Tàng Điêu Khắc Chăm Đà Nẵng — Giá Vé & Miễn Giảm',
    url: 'https://chammuseum.vn/',
    brand: 'Bảo Tàng Điêu Khắc Chăm Đà Nẵng'
  }
];

async function harvestDeepLeaves() {
  console.log('========================================================================');
  console.log('🌱 JAYT-198: DEEP LEAF HARVESTER (OFFICIAL OFFER SPRINT)');
  console.log('   Total Targets: ' + deepLeafTargets.length + ' official leaf pages');
  console.log('   Timestamp:     ' + new Date().toISOString());
  console.log('========================================================================\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const results = [];

  for (const target of deepLeafTargets) {
    const item = {
      id: target.id,
      name: target.name,
      brand: target.brand,
      url: target.url,
      http_status: 0,
      status: 'INCONCLUSIVE',
      raw_file: null,
      sha256: null,
      text_sample: '',
      harvested_at: new Date().toISOString()
    };

    try {
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      await page.setViewport({ width: 1280, height: 800 });

      const res = await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      item.http_status = res ? res.status() : 200;

      const html = await page.content();
      const rawFileName = `raw_leaf_${target.id}.html`;
      const rawFilePath = path.join(leafDir, rawFileName);
      fs.writeFileSync(rawFilePath, html, 'utf8');

      item.raw_file = rawFileName;
      item.sha256 = sha256(Buffer.from(html, 'utf8'));

      const text = await page.evaluate(() => document.body ? document.body.innerText : '');
      item.text_sample = text.replace(/\s+/g, ' ').trim().substring(0, 300);
      item.status = 'CAPTURED';

      console.log(`  ✅ [${target.id}] ${target.name} (${item.http_status}) -> ${rawFileName} (${item.sha256.substring(0, 16)}...)`);
      await page.close();
    } catch (err) {
      item.status = 'INCONCLUSIVE';
      item.error = err.message;
      console.log(`  ⚠️ [${target.id}] ${target.name} -> INCONCLUSIVE: ${err.message}`);
    }

    results.push(item);
  }

  await browser.close();

  const report = {
    harvest_id: 'DEEP_LEAF_198_' + Date.now(),
    timestamp: new Date().toISOString(),
    total_targets: deepLeafTargets.length,
    captured: results.filter(r => r.status === 'CAPTURED').length,
    inconclusive: results.filter(r => r.status === 'INCONCLUSIVE').length,
    results
  };

  const reportPath = path.join(leafDir, 'DEEP_LEAF_HARVEST_REPORT_198.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

  console.log('\n========================================================================');
  console.log(`📄 Saved Deep Leaf Report: ${path.relative(repoRoot, reportPath)}`);
  console.log(`🎉 Captured: ${report.captured}/${deepLeafTargets.length} | Inconclusive: ${report.inconclusive}`);
  console.log('========================================================================');
}

if (require.main === module) {
  harvestDeepLeaves().catch(err => {
    console.error('Fatal Deep Leaf Error:', err);
    process.exit(1);
  });
}

module.exports = { harvestDeepLeaves, deepLeafTargets };
