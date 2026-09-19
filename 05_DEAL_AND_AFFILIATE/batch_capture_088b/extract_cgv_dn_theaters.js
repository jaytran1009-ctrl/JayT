const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..', '..');
const htmlPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088a', 'captures_088a', 'TARGET_088A_BR_107', 'page.html');
const htmlBuf = fs.readFileSync(htmlPath);
const html = htmlBuf.toString('utf8');
const parentSha = crypto.createHash('sha256').update(htmlBuf).digest('hex');

const regex = /<a\b[^>]*href=["']([^"']*(?:vinh-trung|vincom-da-nang|mm-da-nang)[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
let m;
const targets = [];
while ((m = regex.exec(html)) !== null) {
  const literalHref = m[1];
  const offset = m.index;
  const rawText = m[2].replace(/<[^>]+>/g, '').trim();

  let resolved = literalHref;
  let rule = 'ABSOLUTE_URL_PRESERVED';
  if (literalHref.startsWith('/')) {
    resolved = 'https://www.cgv.vn' + literalHref;
    rule = 'RELATIVE_ROOT_RESOLVED_AGAINST_BASE_DOMAIN';
  }

  targets.push({
    target_id: `TARGET_088B_CGV_DN_${String(targets.length + 1).padStart(3, '0')}`,
    brand: 'CGV Cinemas',
    sector: 'CINEMA',
    theater_name: rawText,
    resolved_url: resolved,
    lineage: {
      parent_artifact_path: '05_DEAL_AND_AFFILIATE/batch_capture_088a/captures_088a/TARGET_088A_BR_107/page.html',
      parent_artifact_sha256: parentSha,
      literal_href: literalHref,
      link_offset: offset,
      resolution_rule: rule,
      selection_reason: `Trích xuất từ thẻ <a> chứa ${rawText} tại offset ${offset} trong DOM của TARGET_088A_BR_107 (CGV cinox site)`
    }
  });
}

console.log(`🎯 Tìm thấy ${targets.length} rạp CGV tại Đà Nẵng trong DOM:`);
console.log(JSON.stringify(targets, null, 2));

const outPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088b', 'cgv_danang_theaters_088b.json');
fs.writeFileSync(outPath, JSON.stringify(targets, null, 2), 'utf8');
