/**
 * JAYT BATCH REVIEW PACK GENERATOR (086)
 * Directive: JAYT-REAL-SUPPLY-SPRINT-086
 *
 * Reads batch_manifest_086.json + batch_classification_086.json
 * and generates a single comprehensive review document for CEO.
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');
const captureDir = path.join(__dirname, 'captures');
const manifestPath = path.join(captureDir, 'batch_manifest_086.json');
const classificationPath = path.join(captureDir, 'batch_classification_086.json');
const outputPath = path.join(repoRoot, '08_RELEASE_VAULT', 'BATCH_CAPTURE_REVIEW_PACK_086.md');

function main() {
  if (!fs.existsSync(manifestPath) || !fs.existsSync(classificationPath)) {
    console.error('❌ Manifest or classification not found. Run collector and classifier first.');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const classification = JSON.parse(fs.readFileSync(classificationPath, 'utf8'));

  const successEntries = classification.entries.filter(e => e.classification === 'CAPTURE_SUCCESS');
  const partialEntries = classification.entries.filter(e => e.classification === 'CAPTURE_PARTIAL');
  const failedEntries = classification.entries.filter(e => e.classification === 'CAPTURE_FAILED');
  const blockedEntries = classification.entries.filter(e => e.classification === 'CAPTURE_BLOCKED');

  // Build detailed table
  let table = '| # | Thương Hiệu | Ngành | Domain | HTTP | PNG | HTML | TXT | Receipt | Phân Loại |\n';
  table += '|---|-------------|-------|--------|------|-----|------|-----|---------|----------|\n';

  for (const entry of classification.entries) {
    const checkOrX = (val) => val ? '✅' : '❌';
    const classIcon = entry.classification === 'CAPTURE_SUCCESS' ? '✅ SUCCESS' :
                      entry.classification === 'CAPTURE_PARTIAL' ? '⚠️ PARTIAL' :
                      entry.classification === 'CAPTURE_BLOCKED' ? '🚫 BLOCKED' : '❌ FAILED';

    table += `| ${entry.index} | ${entry.brand} | ${entry.sector} | ${entry.domain} | ${entry.http_status || '—'} | ${checkOrX(entry.artifacts.png)} | ${checkOrX(entry.artifacts.html)} | ${checkOrX(entry.artifacts.text)} | ${checkOrX(entry.artifacts.receipt)} | ${classIcon} |\n`;
  }

  // Build sector summary
  const sectorMap = {};
  for (const entry of classification.entries) {
    if (!sectorMap[entry.sector]) sectorMap[entry.sector] = { total: 0, success: 0, failed: 0 };
    sectorMap[entry.sector].total++;
    if (entry.classification === 'CAPTURE_SUCCESS') sectorMap[entry.sector].success++;
    else sectorMap[entry.sector].failed++;
  }

  let sectorTable = '| Ngành | Tổng | Thành Công | Thất Bại/Bị Chặn |\n';
  sectorTable += '|-------|------|-----------|------------------|\n';
  for (const [sector, data] of Object.entries(sectorMap)) {
    sectorTable += `| ${sector} | ${data.total} | ${data.success} | ${data.failed} |\n`;
  }

  // Build failure details
  let failureDetails = '';
  const failures = [...failedEntries, ...blockedEntries, ...partialEntries];
  if (failures.length > 0) {
    failureDetails = '## Các Nguồn Thất Bại / Bị Chặn\n\n';
    for (const entry of failures) {
      failureDetails += `- **${entry.brand}** (${entry.domain}): ${entry.classification} — ${entry.reason}\n`;
    }
  }

  const md = `# Batch Capture Review Pack 086 — Chrome CDP Thật

> **Run ID**: \`${manifest.run_id}\`  
> **Phương thức**: Puppeteer CDP Headless (Chrome thật)  
> **Viewport**: ${manifest.viewport.width}×${manifest.viewport.height}  
> **Thời gian**: ${manifest.started_at} → ${manifest.completed_at}  

---

## Tổng Quan

| Metric | Giá Trị |
|:---|:---|
| **Tổng nguồn quét** | ${manifest.total_seeds} URL từ 5 ngành |
| **Capture thành công** | ${successEntries.length} |
| **Capture thất bại** | ${failedEntries.length} |
| **Bị chặn/CAPTCHA** | ${blockedEntries.length} |
| **Thiếu artifact** | ${partialEntries.length} |
| **Production** | \`deals_feed.json: []\` (khóa) |

---

## Tổng Quan Theo Ngành

${sectorTable}

---

## Bảng Kết Quả Chi Tiết

${table}

---

${failureDetails}

---

## Bước Tiếp Theo Đề Xuất

1. **CEO review** từng capture SUCCESS — xem PNG + HTML + text thật trên đĩa.
2. **Xác định nguồn có ưu đãi active** → chuyển thành candidate với evidence gốc.
3. **Capture lại** các URL PARTIAL (thiếu artifact).
4. **Chiến lược bổ sung** cho URL BLOCKED/FAILED (manual check, API, thay URL khác).
5. **Production giữ \`[]\`** cho đến khi CEO duyệt batch candidate.

---

## Evidence Trên Đĩa

Toàn bộ capture lưu tại:
\`\`\`
05_DEAL_AND_AFFILIATE/batch_capture_086/captures/<domain>/
├── screenshot.png      (Full-page screenshot 390px)
├── page.html           (Raw DOM HTML)
├── page.txt            (innerText extract)
└── capture_receipt.json (SHA-256 receipt + metadata)
\`\`\`

Manifest tổng hợp: \`05_DEAL_AND_AFFILIATE/batch_capture_086/captures/batch_manifest_086.json\`
`;

  fs.writeFileSync(outputPath, md, 'utf8');
  console.log(`📄 [REVIEW-PACK] Generated: ${outputPath}`);
  return { outputPath, successCount: successEntries.length };
}

if (require.main === module) {
  main();
}

module.exports = { main };
