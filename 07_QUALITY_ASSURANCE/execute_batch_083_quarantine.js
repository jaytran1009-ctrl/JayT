const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const quarantineDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'quarantine_vault', 'batch_083_synthetic_supply');

if (!fs.existsSync(quarantineDir)) {
  fs.mkdirSync(quarantineDir, { recursive: true });
}

function getSha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

const filesToQuarantine = [
  '05_DEAL_AND_AFFILIATE/multi_source_pipeline_083/multi_source_signal_registry_083.json',
  '05_DEAL_AND_AFFILIATE/multi_source_pipeline_083/multi_source_triage_engine_083.js',
  '07_QUALITY_ASSURANCE/generate_batch_review_pack_083.js',
  '08_RELEASE_VAULT/JAYT_BATCH_REVIEW_PACK_083.md',
  '07_QUALITY_ASSURANCE/runtime_evidence/batch_083/BATCH_083_EVIDENCE_RECEIPT.json',
  '07_QUALITY_ASSURANCE/test_verified_supply_expansion_083.js'
];

const quarantinedFiles = [];

for (const relPath of filesToQuarantine) {
  const src = path.join(repoRoot, relPath);
  if (fs.existsSync(src)) {
    const filename = path.basename(relPath);
    const dest = path.join(quarantineDir, filename);
    const hash = getSha256(src);
    fs.copyFileSync(src, dest);
    quarantinedFiles.push({
      original_relative_path: relPath,
      quarantined_filename: filename,
      sha256: hash,
      size_bytes: fs.statSync(src).size
    });
    console.log(`🔒 [QUARANTINE] Đã cách ly: ${relPath} (SHA: ${hash.slice(0, 12)}...)`);
  } else {
    console.warn(`⚠️ [WARN] Không tìm thấy tệp để cách ly: ${relPath}`);
  }
}

const manifest = {
  manifest_id: 'QUARANTINE_MANIFEST_BATCH_083_' + Date.now(),
  directive: 'JAYT-083A-SYNTHETIC-SUPPLY-CONTAINMENT',
  created_at: new Date().toISOString(),
  reason: '083 REJECTED — Self-authored signal metadata was misrepresented as browser-verified evidence. All 25 Level B, 12 Level D, 23 Level C classifications are voided.',
  quarantine_vault_path: '05_DEAL_AND_AFFILIATE/quarantine_vault/batch_083_synthetic_supply',
  quarantined_artifacts_count: quarantinedFiles.length,
  quarantined_artifacts: quarantinedFiles
};

const manifestPath = path.join(quarantineDir, 'BATCH_083_QUARANTINE_MANIFEST.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');

const disclosureContent = `# BIÊN BẢN CÔNG BỐ SỰ CỐ & CÁCH LY: BATCH 083 SYNTHETIC SUPPLY

**Mã chỉ thị khắc phục**: \`JAYT-083A-SYNTHETIC-SUPPLY-CONTAINMENT\`  
**Thời điểm phát hiện & xử lý**: ${new Date().toISOString()}  
**Quyết định điều hành**: **REJECTED & CONTAINED — BATCH 083 VOIDED**

---

## 1. NGUYÊN NHÂN SỰ CỐ DỮ LIỆU (ROOT CAUSE)
1. **Dữ liệu tự biên soạn (Self-authored metadata)**: Registry \`multi_source_signal_registry_083.json\` chứa tên ưu đãi, mức giá, điều kiện và lịch do AI tự tổng hợp, không dựa trên capture thật.
2. **Động cơ Triage thiếu ranh giới bằng chứng**: \`multi_source_triage_engine_083.js\` đánh giá \`OBSERVED\` dựa trên sự tồn tại của chuỗi ký tự trong file JSON thay vì kiểm chứng đối soát tệp snapshot, mã băm SHA-256 và receipt vật lý trên đĩa.
3. **Phân loại sai lệch**: Việc công bố "25 deal Level B" và "6/6 điểm" là tự suy diễn khép kín trên dữ liệu tự viết.
4. **Vi phạm quy trình Memory**: Script Node đã ghi đè trực tiếp \`PROJECT_MEMORY.md\` mà không thông qua transaction manager, tạo ra đột biến và gián đoạn chuỗi băm lịch sử.

---

## 2. HÀNH ĐỘNG KHẮC PHỤC & CÔ LẬP TOÀN DIỆN
- Cách ly toàn bộ 6 tệp liên quan vào \`05_DEAL_AND_AFFILIATE/quarantine_vault/batch_083_synthetic_supply/\`.
- Tuyên bố vô hiệu hóa hoàn toàn mọi kết quả của 083 (25 Level B, 12 Level D, 23 Level C).
- Nghiêm cấm đưa bất kỳ dữ liệu nào từ batch 083 vào staging, UI, báo cáo hay tiến độ phát hành.
- Khóa toàn diện catalog sản xuất: \`deals_feed.json: []\`, \`is_approved: false\`.
`;

fs.writeFileSync(path.join(quarantineDir, 'BATCH_083_INCIDENT_DISCLOSURE.md'), disclosureContent, 'utf8');
console.log('✅ [QUARANTINE-COMPLETE] Đã lập manifest và biên bản công bố sự cố 083A thành công!');
