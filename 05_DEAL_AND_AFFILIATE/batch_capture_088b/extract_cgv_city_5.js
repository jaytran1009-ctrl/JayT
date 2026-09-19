const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..', '..');
const htmlPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088a', 'captures_088a', 'TARGET_088A_BR_107', 'page.html');
const htmlBuf = fs.readFileSync(htmlPath);
const html = htmlBuf.toString('utf8');
const parentSha = crypto.createHash('sha256').update(htmlBuf).digest('hex');

const regex = /<li\s+class=["']cgv_city_5["'][^>]*>[\s\S]*?site\(['"]([^'"]+)['"][\s\S]*?>([^<]+)<\/span>/gi;
let m;
const targets = [];
while ((m = regex.exec(html)) !== null) {
  const literalHref = m[1];
  const offset = m.index;
  const theaterName = m[2].trim();

  targets.push({
    target_id: `TARGET_088B_CGV_THEATER_${String(targets.length + 1).padStart(3, '0')}`,
    brand: 'CGV Cinemas',
    sector: 'CINEMA',
    theater_name: theaterName,
    resolved_url: literalHref,
    lineage: {
      parent_artifact_path: '05_DEAL_AND_AFFILIATE/batch_capture_088a/captures_088a/TARGET_088A_BR_107/page.html',
      parent_artifact_sha256: parentSha,
      literal_href: literalHref,
      link_offset: offset,
      resolution_rule: 'EXACT_ONCLICK_SITE_URL_FROM_CITY_5_DANANG',
      selection_reason: `Trích xuất từ thẻ onclick="site('${literalHref}')" của rạp ${theaterName} tại offset ${offset} trong DOM CGV Cinox Site`
    }
  });
}

console.log(`🎯 Tìm thấy ${targets.length} rạp CGV tại Đà Nẵng từ cgv_city_5:`);
targets.forEach(t => console.log(`  + [${t.target_id}] ${t.theater_name} -> ${t.resolved_url} (Offset: ${t.lineage.link_offset})`));

const outPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088b', 'selected_cgv_danang_theaters_088b.json');
fs.writeFileSync(outPath, JSON.stringify(targets, null, 2), 'utf8');
