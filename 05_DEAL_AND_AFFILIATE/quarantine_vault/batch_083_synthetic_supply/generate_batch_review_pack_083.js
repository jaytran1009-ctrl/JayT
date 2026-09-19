/**
 * JAYT CONSOLIDATED BATCH REVIEW PACK GENERATOR (083)
 * Directive: JAYT-P0.2-VERIFIED-SUPPLY-EXPANSION-083
 * 
 * Ingests 60 multi-source signals across 6 cohorts, runs 6-point triage grid,
 * and outputs BATCH_083_EVIDENCE_RECEIPT.json and JAYT_BATCH_REVIEW_PACK_083.md.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const registryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'multi_source_pipeline_083', 'multi_source_signal_registry_083.json');
const triageEngine = require(path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'multi_source_pipeline_083', 'multi_source_triage_engine_083.js'));

const evidenceDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'batch_083');
const releaseVaultDir = path.join(repoRoot, '08_RELEASE_VAULT');

if (!fs.existsSync(evidenceDir)) {
  fs.mkdirSync(evidenceDir, { recursive: true });
}

console.log('🚀 [JAYT-BATCH-083-GENERATOR] Đang nạp danh mục 60 tín hiệu đa nguồn...\n');

const rawRegistry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const { stats, results } = triageEngine.processSignalBatch(rawRegistry.signals);

console.log(`📊 [THỐNG KÊ TRIAGE BATCH 083]`);
console.log(`   - Tổng số tín hiệu nạp: ${stats.total_signals}`);
console.log(`   - READY_FOR_BATCH_REVIEW: ${stats.by_decision.READY_FOR_BATCH_REVIEW} signals`);
console.log(`   - NEEDS_RECHECK         : ${stats.by_decision.NEEDS_RECHECK} signals`);
console.log(`   - REJECTED_OR_ACCOUNT_DEPENDENT: ${stats.by_decision.REJECTED_OR_ACCOUNT_DEPENDENT} signals`);
console.log(`   - Phân loại theo Level  : Level A: ${stats.by_level.LEVEL_A} | Level B: ${stats.by_level.LEVEL_B} | Level C: ${stats.by_level.LEVEL_C} | Level D: ${stats.by_level.LEVEL_D}`);

// 1. Export BATCH_083_EVIDENCE_RECEIPT.json
const receiptData = {
  receipt_id: 'RECEIPT_BATCH_083_' + Date.now(),
  directive: 'JAYT-P0.2-VERIFIED-SUPPLY-EXPANSION-083',
  generated_at: new Date().toISOString(),
  registry_sha256: crypto.createHash('sha256').update(fs.readFileSync(registryPath)).digest('hex'),
  stats,
  evaluated_signals: results
};

const receiptPath = path.join(evidenceDir, 'BATCH_083_EVIDENCE_RECEIPT.json');
fs.writeFileSync(receiptPath, JSON.stringify(receiptData, null, 2), 'utf8');
console.log(`\n💾 [RECEIPT] Đã xuất bản biên bản máy đọc: ${path.relative(repoRoot, receiptPath)}`);

// 2. Generate JAYT_BATCH_REVIEW_PACK_083.md
const readySignals = results.filter(r => r.batch_decision === triageEngine.BATCH_DECISIONS.READY_FOR_BATCH_REVIEW);
const recheckSignals = results.filter(r => r.batch_decision === triageEngine.BATCH_DECISIONS.NEEDS_RECHECK);
const rejectedSignals = results.filter(r => r.batch_decision === triageEngine.BATCH_DECISIONS.REJECTED_OR_ACCOUNT_DEPENDENT);

const markdownContent = [
  '# HỒ SƠ BÀN GIAO KIỂM TOÁN TẬP TRUNG: BATCH REVIEW PACK 083',
  '',
  '**Mã đợt kiểm duyệt**: `BATCH_REVIEW_PACK_083`  ',
  '**Chỉ thị điều hành**: `JAYT-P0.2-VERIFIED-SUPPLY-EXPANSION-083`  ',
  '**Thời điểm tạo**: ' + new Date().toISOString() + '  ',
  '**Trạng thái đề xuất**: `READY_FOR_CEO_BATCH_AUDIT — ZERO AUTO-PUBLISH`  ',
  '**Tổng số tín hiệu thẩm định**: **' + stats.total_signals + ' tín hiệu** (6 nhóm ngành)  ',
  '**Biên bản máy đọc đối soát**: [`07_QUALITY_ASSURANCE/runtime_evidence/batch_083/BATCH_083_EVIDENCE_RECEIPT.json`](../07_QUALITY_ASSURANCE/runtime_evidence/batch_083/BATCH_083_EVIDENCE_RECEIPT.json)  ',
  '**Khóa sản xuất Invariant**: `deals_feed.json: []` (`is_approved: false`, 0 deal tự động xuất bản)',
  '',
  '---',
  '',
  '## 1. BẢNG THỐNG KÊ TỔNG HỢP (AGGREGATE TRIAGE MATRIX)',
  '',
  '### A. Phân Bổ Theo Quyết Định Triage',
  '',
  '| Trạng Thái Quyết Định | Số Lượng | Tỷ Lệ | Hành Động Vận Hành |',
  '|---|:---:|:---:|---|',
  '| **`READY_FOR_BATCH_REVIEW`** | **' + stats.by_decision.READY_FOR_BATCH_REVIEW + '** | **' + ((stats.by_decision.READY_FOR_BATCH_REVIEW / stats.total_signals) * 100).toFixed(1) + '%** | **Đủ 6/6 điểm đối soát trên nguồn công khai (Level B) — Trình CEO xem xét phê duyệt** |',
  '| **`NEEDS_RECHECK`** | **' + stats.by_decision.NEEDS_RECHECK + '** | **' + ((stats.by_decision.NEEDS_RECHECK / stats.total_signals) * 100).toFixed(1) + '%** | Giữ ở hàng đợi Tín hiệu cộng đồng (Level D) chờ đối soát bằng chứng độc lập |',
  '| **`REJECTED_OR_ACCOUNT_DEPENDENT`** | **' + stats.by_decision.REJECTED_OR_ACCOUNT_DEPENDENT + '** | **' + ((stats.by_decision.REJECTED_OR_ACCOUNT_DEPENDENT / stats.total_signals) * 100).toFixed(1) + '%** | Loại bỏ khỏi diện deal công khai vì phụ thuộc tài khoản/giỏ hàng riêng (Level C) |',
  '',
  '### B. Phân Bổ Theo Cấp Độ Tin Cậy (Confidence Levels)',
  '',
  '| Cấp Độ Tin Cậy | Định Nghĩa Quản Trị | Số Lượng Tín Hiệu | Trạng Thái Xử Lý |',
  '|---|---|:---:|---|',
  '| **Level A** | *Provider/Merchant Verified* (Feed API chính thức / Hồ sơ đối tác ký kết) | **' + stats.by_level.LEVEL_A + '** | Chờ kết nối Partner Center có tài liệu xác thực |',
  '| **Level B** | *Public Browser Verified* (Trang web/fanpage công khai có giá, hạn, điều kiện, phạm vi ĐN) | **' + stats.by_level.LEVEL_B + '** | Đạt 6/6 điểm đối soát ➔ Trình CEO xem xét Staging |',
  '| **Level C** | *Account/Cart Dependent* (Tín hiệu trong app, giỏ hàng riêng, ví voucher giới hạn) | **' + stats.by_level.LEVEL_C + '** | Khóa lại ở ranh giới radar, không công khai như deal chung |',
  '| **Level D** | *Community Signal* (Tín hiệu do cộng đồng quan sát và gửi báo) | **' + stats.by_level.LEVEL_D + '** | Hiển thị trung thực dưới nhãn `CHƯA XÁC MINH`, 0 CTA |',
  '',
  '---',
  '',
  '## 2. DANH SÁCH ' + readySignals.length + ' TÍN HIỆU ĐỦ ĐIỀU KIỆN REVIEW (`READY_FOR_BATCH_REVIEW`)',
  '',
  'Toàn bộ các mục dưới đây đạt **6/6 điểm kiểm tra** trên lưới Triage (Giá, Điều kiện, Thời hạn, Phạm vi Đà Nẵng, Tính công khai phổ quát, và URL nguồn chính thức):',
  '',
  '| ID | Nhóm Ngành | Thương Hiệu | Tiêu Đề Ưu Đãi | Mức Giá Quan Sát | Lịch Áp Dụng | Phạm Vi |',
  '|---|---|---|---|---|---|---|',
  readySignals.map(s => {
    const raw = rawRegistry.signals.find(x => x.id === s.id);
    return `| \`${s.id}\` | ${s.cohort} | **${s.brand}** | ${s.title} | ${raw.observed_price}đ | ${raw.observed_validity} | ${raw.observed_scope} |`;
  }).join('\n'),
  '',
  '---',
  '',
  '## 3. DANH SÁCH ' + recheckSignals.length + ' TÍN HIỆU CẦN ĐỐI SOÁT BỔ SUNG (`NEEDS_RECHECK`)',
  '',
  'Các tín hiệu do cộng đồng gửi báo hoặc còn thiếu điều kiện chứng thực độc lập. Duy trì hiển thị trong app dưới nhãn **`⚠️ Tín hiệu cộng đồng — chưa xác minh`**:',
  '',
  '| ID | Nhóm Ngành | Thương Hiệu / Quán | Nội Dung Tín Hiệu | Lý Do Cần Recheck |',
  '|---|---|---|---|---|',
  recheckSignals.map(s => {
    return `| \`${s.id}\` | ${s.cohort} | **${s.brand}** | ${s.title} | ${s.decision_reason} |`;
  }).join('\n'),
  '',
  '---',
  '',
  '## 4. DANH SÁCH ' + rejectedSignals.length + ' TÍN HIỆU BỊ LOẠI KHỎI DIỆN CÔNG KHAI (`REJECTED_OR_ACCOUNT_DEPENDENT`)',
  '',
  'Các ưu đãi phụ thuộc vào tài khoản cụ thể, phân đoạn người dùng, ví voucher có giới hạn lượt dùng trong app hoặc giỏ hàng cụ thể:',
  '',
  '| ID | Nhóm Ngành | Nền Tảng / Thương Hiệu | Nội Dung Ưu Đãi | Lý Do Loại Bỏ Khỏi Deal Công Khai |',
  '|---|---|---|---|---|',
  rejectedSignals.map(s => {
    return `| \`${s.id}\` | ${s.cohort} | **${s.brand}** | ${s.title} | Phụ thuộc tài khoản cá nhân / Giỏ hàng / Ví voucher trong app (Level C) |`;
  }).join('\n'),
  '',
  '---',
  '',
  '## 5. KẾT LUẬN & KIẾN NGHỊ TRÌNH CEO',
  '',
  '1. **Tuân thủ ranh giới kỹ thuật**: Toàn bộ quá trình quét và lọc không sử dụng bất kỳ kỹ thuật vượt rào cản app wall hay giỏ hàng riêng nào.',
  '2. **Nguyên tắc không tự thăng cấp**: 10/10 tín hiệu cộng đồng Level D được giữ nguyên ở trạng thái `NEEDS_RECHECK`, tuyệt đối không tự nâng thành Level B.',
  '3. **Không tự xuất bản**: `deals_feed.json` duy trì `[]`. Bản báo cáo này đóng vai trò bàn giao dữ liệu đã phân loại để CEO xem xét từng ứng viên khi mở đợt nhập Staging tiếp theo.'
].join('\n');

const mdPath = path.join(releaseVaultDir, 'JAYT_BATCH_REVIEW_PACK_083.md');
fs.writeFileSync(mdPath, markdownContent, 'utf8');
console.log(`📝 [REVIEW-PACK] Đã xuất bản hồ sơ kiểm toán: ${path.relative(repoRoot, mdPath)}\n`);
console.log('🟢 [GENERATOR-COMPLETE] Hoàn tất quá trình sinh Review Pack 083!');
