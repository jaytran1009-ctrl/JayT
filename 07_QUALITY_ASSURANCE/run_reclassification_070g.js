/**
 * JAYT BATCH 3 RECLASSIFICATION ENGINE (070G)
 * Directive: JAYT-070G — CLASSIFIER ROOT-FIX + BATCH 3 RECLASSIFICATION
 * Reads 20 raw receipts directly from disk and applies strict 070G classifier.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { classifySource070g } = require('./batch3_source_classifier_070g');

const repoRoot = path.resolve(__dirname, '..');
const sweepDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'run_070f_r2_batch3_sweep_1787557044584');

function getSha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

const files = fs.readdirSync(sweepDir);
const receiptFiles = files.filter(f => f.startsWith('receipt_') && f.endsWith('.json')).sort();

if (receiptFiles.length !== 20) {
  throw new Error(`FAIL-CLOSED: Expected exactly 20 receipt files, found ${receiptFiles.length}`);
}

const reclassifiedResults = [];

for (let i = 0; i < receiptFiles.length; i++) {
  const rFile = receiptFiles[i];
  const rPath = path.join(sweepDir, rFile);
  const rSha = getSha256(rPath);
  const rData = JSON.parse(fs.readFileSync(rPath, 'utf8'));

  const prefix = rFile.replace('receipt_', '').replace('.json', '');
  const pngFile = `${prefix}_capture.png`;
  const htmlFile = `${prefix}_raw.html`;
  const textFile = `${prefix}_text.txt`;

  const pngPath = path.join(sweepDir, pngFile);
  const htmlPath = path.join(sweepDir, htmlFile);
  const textPath = path.join(sweepDir, textFile);

  if (!fs.existsSync(pngPath) || !fs.existsSync(htmlPath) || !fs.existsSync(textPath)) {
    throw new Error(`FAIL-CLOSED: Missing associated artifacts for ${rFile}`);
  }

  const pngSha = getSha256(pngPath);
  const htmlSha = getSha256(htmlPath);
  const textSha = getSha256(textPath);
  const textContent = fs.readFileSync(textPath, 'utf8');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  // Apply 070G Classifier
  const classificationResult = classifySource070g({
    targetId: rData.target_id,
    brand: rData.brand,
    requestedUrl: rData.requested_url,
    finalUrl: rData.final_url,
    textContent: textContent,
    htmlContent: htmlContent,
    expectedType: rData.expected_source_type || ''
  });

  reclassifiedResults.push({
    index: i + 1,
    target_id: rData.target_id,
    brand: rData.brand,
    domain: rData.domain,
    requested_url: rData.requested_url,
    final_url: rData.final_url,
    checked_at_utc: rData.checked_at,
    receipt_file: rFile,
    receipt_sha256: rSha,
    png_file: pngFile,
    png_sha256: pngSha,
    html_file: htmlFile,
    html_sha256: htmlSha,
    text_file: textFile,
    text_sha256: textSha,
    text_length: textContent.length,
    source_classification: classificationResult.classification,
    triage: classificationResult.triage,
    is_eligible: classificationResult.is_eligible,
    reason: classificationResult.reason,
    snippet: classificationResult.snippet
  });
}

// 1. Write JSON Matrix
const jsonMatrixPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'BATCH_3_DISCOVERY_MATRIX_070G.json');
fs.writeFileSync(jsonMatrixPath, JSON.stringify(reclassifiedResults, null, 2), 'utf8');

// 2. Count statistics
const counts = {};
reclassifiedResults.forEach(r => {
  counts[r.source_classification] = (counts[r.source_classification] || 0) + 1;
});

// 3. Generate Markdown Matrix
let md = `# JAYT BATCH 3 DISCOVERY MATRIX (070G RECLASSIFIED)
**Chỉ thị**: \`JAYT-070G — CLASSIFIER ROOT-FIX + BATCH 3 RECLASSIFICATION\`  
**Thời điểm phân loại**: ${new Date().toISOString()} | **Tổng số nguồn đối soát**: đúng **20/20 receipts trên đĩa**  
**Quy tắc**: \`PREPARATION_DISCOVERY_ONLY\` (0 candidate, 0 staging, 0 CEO receipt)

---

## 1. BẢNG PHÂN LOẠI CẤP ĐỘ NGUỒN CHUẨN HÓA 070G (20 ROWS MATCHING 20 RECEIPTS)

| # | Target ID | Thương Hiệu & Domain | Final URL (CDP) | Phân Loại Cấp Nguồn | Triage | SHA-256 Receipt (Đọc từ đĩa) | Trích Đoạn Bằng Chứng Thực Tế |
|---|---|---|---|:---:|:---:|---|---|
`;

reclassifiedResults.forEach(r => {
  const triageBadge = r.triage === 'RED' ? '🔴 **RED**' : '🟡 **AMBER**';
  md += `| ${r.index} | \`${r.target_id}\` | **${r.brand}** (\`${r.domain}\`) | [${r.final_url.slice(0, 30)}...](${r.final_url}) | \`${r.source_classification}\` | ${triageBadge} | \`${r.receipt_sha256.slice(0, 10)}...\` | ${r.snippet || r.reason} |\n`;
});

md += `\n---

## 2. THỐNG KÊ PHÂN LOẠI NGUỒN BATCH 3 (070G ROOT-CLASSIFICATION)

| Phân Loại Cấp Nguồn | Số Lượng Nguồn | Ý Nghĩa Vận Hành |
|---|:---:|---|
`;

Object.entries(counts).forEach(([k, v]) => {
  md += `| \`${k}\` | **${v}** | ${k === 'DEAD_ROUTE' ? 'Lỗi route 404 / Không tìm thấy trang' : (k === 'PROMO_SOURCE' ? 'Chứa nội dung ưu đãi / khuyến mãi hợp lệ' : (k === 'LOCALITY_SOURCE' ? 'Chứa bằng chứng chi nhánh Đà Nẵng hợp lệ' : (k === 'REDIRECT' ? 'Chuyển hướng về trang chủ rỗng' : 'Chưa có thông tin ưu đãi')))} |\n`;
});

md += `\n---

## 3. BẢNG ĐỐI SOÁT TOÀN DIỆN MÃ BĂM ARTIFACTS GỐC (RULE 18 LINEAGE)

Tất cả mã băm đọc trực tiếp từ đĩa tại \`05_DEAL_AND_AFFILIATE/raw_evidence/run_070f_r2_batch3_sweep_1787557044584/\`:

| # | Target ID | Receipt File | SHA-256 Receipt | PNG SHA-256 | HTML SHA-256 | Text SHA-256 | Checked At (UTC) |
|---|---|---|---|---|---|---|---|
`;

reclassifiedResults.forEach(r => {
  md += `| ${r.index} | \`${r.target_id}\` | \`${r.receipt_file}\` | \`${r.receipt_sha256.slice(0, 10)}...\` | \`${r.png_sha256.slice(0, 10)}...\` | \`${r.html_sha256.slice(0, 10)}...\` | \`${r.text_sha256.slice(0, 10)}...\` | \`${r.checked_at_utc}\` |\n`;
});

md += `\n---

## 4. TIÊU CHÍ MỞ KHÓA BATCH 4 (CANDIDATE INTAKE BUNDLE GATE)

- **Nguyên tắc bất biến**: Candidate chỉ được tạo tại Batch 4 khi một Evidence Bundle liên kết đủ **5 mảnh thực tế**:
  1. \`pricing\` (mức giá cụ thể);
  2. \`terms\` (điều kiện sử dụng);
  3. \`validity\` (thời hạn 2026 tường minh);
  4. \`Da Nang locality\` (bằng chứng địa bàn Đà Nẵng từ \`LOCALITY_SOURCE\` đã xác minh);
  5. \`raw_receipt\` gốc cùng SHA-256 đối soát.
- Nếu thiếu bất kỳ thành phần nào $\rightarrow$ giữ nguyên phân loại \`LEAD_ONLY_NO_CLAIM\`.
`;

const mdPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'BATCH_3_DISCOVERY_MATRIX_070G.md');
fs.writeFileSync(mdPath, md, 'utf8');

console.log(`✅ [BATCH-3-RECLASSIFIED-070G]`);
console.log(`   Markdown: ${mdPath}`);
console.log(`   JSON: ${jsonMatrixPath}`);
console.log(`   Counts:`, counts);
