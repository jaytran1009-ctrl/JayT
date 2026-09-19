const fs = require('fs');
const path = require('path');

const baseVault = '06_TRUST_AND_EVIDENCE/batch_13_locator_vault';
const runDirs = fs.readdirSync(baseVault)
  .filter(d => d.startsWith('run_') && fs.statSync(path.join(baseVault, d)).isDirectory())
  .sort();
const latestRun = runDirs[runDirs.length - 1];
const vault = path.join(baseVault, latestRun);
console.log('Using run vault:', vault);

const summary = JSON.parse(fs.readFileSync(path.join(vault, 'HARVEST_SUMMARY_REPORT.json')));
const locs = JSON.parse(fs.readFileSync(path.join(vault, 'LOCATIONS_DA_NANG_VERIFIED.json')));

let out = '';
out += `### BẢNG ĐỐI SOÁT ${locs.length} ĐỊA ĐIỂM TRUY NGUYÊN ĐƯỢC (TỰ ĐỘNG SINH TỪ JSON — RUN: ${latestRun})\n\n`;
out += '| STT | Thương hiệu | Mã cơ sở | Tên cơ sở | Địa chỉ nguyên văn (Chứng cứ trích xuất) | Địa chỉ hiển thị chuẩn hóa | Nguồn / Pointer / Offset | Tích điểm | Đổi quà | Trạng thái chung |\n';
out += '|---|---|---|---|---|---|---|---|---|---|\n';

locs.forEach((l, idx) => {
  const p = l.provenance;
  const audit = l.policy_audit;
  let ptr = '';
  if (p.source_type === 'JSON_API') {
    ptr = p.source_pointer + ' (Trang ' + p.source_page + ')';
  } else if (p.source_type === 'HTML_SPAN') {
    ptr = 'Byte ' + p.byte_offset + ' (dài ' + p.byte_length + 'B)';
  } else {
    ptr = p.source_pointer + ' (Byte ' + p.byte_offset + ')';
  }

  const earn = audit.earning_status || 'N/A';
  const redm = audit.redemption_status || 'N/A';
  const overall = audit.overall_status || 'UNVERIFIED';
  const displayAddr = l.display_address || l.verbatim_address;

  out += '| ' + (idx + 1) + ' | ' + l.brand_id + ' | ' + (l.store_code || 'null') + ' | ' + l.name + ' | ' + l.verbatim_address + ' | ' + displayAddr + ' | ' + ptr + ' | ' + earn + ' | ' + redm + ' | ' + overall + ' |\n';
});

out += '\n### BẢNG MA TRẬN 10 THƯƠNG HIỆU & TÌNH TRẠNG THU THẬP (COMPLETENESS MATRIX)\n\n';
out += '| Thương hiệu | Trạng thái lượt này | Kiểm tra lượt này (Checked this run) | Trạng thái quan sát (Observed status) | Thời điểm quan sát | Tham chiếu chứng cứ | Mức độ đầy đủ | Số cơ sở xác minh |\n';
out += '|---|---|:---:|---|---|---|---|:---:|\n';

Object.values(summary.brand_completeness_matrix).forEach(b => {
  const checked = b.checked_this_run ? 'CÓ (LIVE)' : 'KHÔNG (OFFLINE)';
  const observedSt = b.observed_status || 'N/A';
  const observedAt = b.observed_at || 'N/A';
  const evidenceRef = b.evidence_reference || 'N/A';
  out += '| ' + b.brand_id + ' | ' + b.status + ' | ' + checked + ' | ' + observedSt + ' | ' + observedAt + ' | ' + evidenceRef + ' | ' + b.completeness + ' | ' + b.locations_count + ' |\n';
});

fs.writeFileSync('06_TRUST_AND_EVIDENCE/batch_13_locator_vault/GENERATED_TABLES.md', out, 'utf8');
console.log('Successfully generated GENERATED_TABLES.md');
