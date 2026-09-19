/**
 * INTEGRATION TEST SUITE: CANDIDATE INTAKE REBUILD & VALIDATOR PASS (069-STEP2D)
 * Directive: JAYT-069-STEP2D — METIZ CANDIDATE INTAKE REBUILD
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { processCandidateIntake } = require('../05_DEAL_AND_AFFILIATE/candidate_intake_pipeline_069d');
const { validateCandidate } = require('./validate_candidate_evidence');

const repoRoot = path.resolve(__dirname, '..');
const pendingDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review');

function assertTest(name, condition, message) {
  if (!condition) {
    console.error(`  [${name}]: [FAIL] - ${message}`);
    process.exit(1);
  }
  console.log(`  [${name}]: [PASS] - ${message}`);
}

console.log('🧪 [TEST-069-STEP2D] Khởi chạy bộ kiểm thử Candidate Intake Integration & Pre-Write Gate...');

function cleanupTempFiles() {
  const sDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'evidence_snapshots');
  if (fs.existsSync(sDir)) {
    for (const f of fs.readdirSync(sDir)) {
      if (f.startsWith('tmp_test_')) {
        fs.unlinkSync(path.join(sDir, f));
      }
    }
  }
}

// 1. Negative Test: Ellipsis (...) in claims rejected
cleanupTempFiles();
let ellipsisBlocked = false;
try {
  processCandidateIntake({
    candidate_id: 'CAND-TEST-ELLIPSIS',
    evidence_id: 'EVID_CAND-TEST-ELLIPSIS',
    deal_id: 'DNG-TEST-ELLIPSIS',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    captured_at_utc: '2026-08-24T06:32:50.311Z',
    raw_artifacts: {
      png_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/fresh_metiz_super_monday_capture.png',
      html_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/fresh_metiz_super_monday_capture.html',
      txt_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/fresh_metiz_super_monday_capture.txt',
      receipt_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/FRESH_CAPTURE_RECEIPT_METIZ_SUPER_MONDAY.json'
    },
    snapshot_names: {
      png: 'tmp_test_ellipsis.png',
      html: 'tmp_test_ellipsis.html',
      txt: 'tmp_test_ellipsis.txt',
      receipt: 'tmp_test_ellipsis.json'
    },
    extracted_claims: {
      conditions_snippet: 'thành viên Metiz... mua trực tiếp'
    }
  });
} catch (e) {
  if (e.message.includes('forbidden ellipsis (...)')) {
    ellipsisBlocked = true;
  }
} finally {
  cleanupTempFiles();
}
assertTest('INTAKE_01_NEGATIVE_ELLIPSIS_BLOCKED', ellipsisBlocked,
  'Claim snippet chứa dấu ba chấm (...) bị chặn đứng fail-closed trước khi ghi candidate.');

// 2. Negative Test: Substring mismatch rejected
cleanupTempFiles();
let substringMismatchBlocked = false;
try {
  processCandidateIntake({
    candidate_id: 'CAND-TEST-SUBSTRING',
    evidence_id: 'EVID_CAND-TEST-SUBSTRING',
    deal_id: 'DNG-TEST-SUBSTRING',
    source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
    captured_at_utc: '2026-08-24T06:32:50.311Z',
    raw_artifacts: {
      png_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/fresh_metiz_super_monday_capture.png',
      html_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/fresh_metiz_super_monday_capture.html',
      txt_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/fresh_metiz_super_monday_capture.txt',
      receipt_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/FRESH_CAPTURE_RECEIPT_METIZ_SUPER_MONDAY.json'
    },
    snapshot_names: {
      png: 'tmp_test_sub.png',
      html: 'tmp_test_sub.html',
      txt: 'tmp_test_sub.txt',
      receipt: 'tmp_test_sub.json'
    },
    extracted_claims: {
      price_snippet: '10.000 đồng không tồn tại trong text'
    }
  });
} catch (e) {
  if (e.message.includes('substring not found in text dump')) {
    substringMismatchBlocked = true;
  }
} finally {
  cleanupTempFiles();
}
assertTest('INTAKE_02_NEGATIVE_SUBSTRING_MISMATCH_BLOCKED', substringMismatchBlocked,
  'Claim snippet không phải substring nguyên văn trong text dump bị chặn fail-closed.');

// 3. Positive Intake: Metiz Super Monday Candidate
const superMondayDescriptor = {
  candidate_id: 'CAND-DNG-METIZ-SUPER-MONDAY-2026',
  evidence_id: 'EVID_CAND-DNG-METIZ-SUPER-MONDAY-2026',
  deal_id: 'DNG-METIZ-SUPER-MONDAY-2026',
  deal_title: 'Metiz Cinema — Super Monday Đồng Giá 55K (Mua Tại Quầy)',
  merchant: 'Metiz Cinema Đà Nẵng',
  category: 'local_entertainment',
  source_url: 'https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html',
  captured_at_utc: '2026-08-24T06:32:50.311Z',
  runtime_run_id: 'RUN_METIZ_SUPER_MONDAY_069_STEP2B',
  purchase_channel: 'AT_COUNTER',
  membership_required: true,
  observed_price_or_offer: '55.000 đồng/ vé 2D',
  deal_price: 55000,
  effective_date: '2026-01-01',
  expires_at: '2026-12-31',
  days_of_week: [1],
  claim_summary: 'LOCALLY_CAPTURED_SOURCE_LINKED: Fresh capture xác nhận Super Monday 55.000 đồng/ vé 2D Thứ Hai hàng tuần tại quầy rạp Metiz Cinema Đà Nẵng.',
  observed_conditions: 'Chương trình áp dụng cho thành viên Metiz Cinema. Vui lòng xuất trình thẻ thành viên trước khi mua vé để được giá ưu đãi & tích lũy điểm thưởng. Một khách hàng có thể mua nhiều vé. Áp dụng cho hình thức mua vé trực tiếp tại rạp.',
  notes: 'Locality có nguồn: Metiz Cinema Đà Nẵng; hướng dẫn vào Helio Center từ đường 2/9.',
  location_provenance_claim: 'Metiz Cinema Đà Nẵng; hướng dẫn vào Helio Center từ đường 2/9',
  exceptions_disclosed: 'Không áp dụng vào các ngày lễ, Tết, suất chiếu đặc biệt, suất chiếu sớm.',
  revision_id: 'REV_069_STEP2D_INTAKE',
  raw_artifacts: {
    png_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/fresh_metiz_super_monday_capture.png',
    html_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/fresh_metiz_super_monday_capture.html',
    txt_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/fresh_metiz_super_monday_capture.txt',
    receipt_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/FRESH_CAPTURE_RECEIPT_METIZ_SUPER_MONDAY.json'
  },
  snapshot_names: {
    png: 'metiz_super_monday_official_promo_capture.png',
    html: 'metiz_super_monday_official_promo_raw.html',
    txt: 'metiz_super_monday_official_promo_text.txt',
    receipt: 'capture_receipt_METIZ_SUPER_MONDAY.json'
  },
  extracted_claims: {
    price_snippet: '55.000 đồng/ vé 2D',
    conditions_snippet: 'Áp dụng cho hình thức mua vé trực tiếp tại rạp.'
  },
  output_candidate_filename: 'candidate_44_CAND-DNG-METIZ-SUPER-MONDAY-2026.json',
  output_dossier_filename: 'dossier_CAND-DNG-METIZ-SUPER-MONDAY-2026.md',
  dossier_markdown: `# EVIDENCE DOSSIER: CAND-DNG-METIZ-SUPER-MONDAY-2026

## 1. Thông Tin Định Danh Candidate
- **Candidate ID**: \`CAND-DNG-METIZ-SUPER-MONDAY-2026\`
- **Deal ID**: \`DNG-METIZ-SUPER-MONDAY-2026\`
- **Tiêu đề**: Metiz Cinema — Super Monday Đồng Giá 55K (Mua Tại Quầy)
- **Đơn vị cung cấp**: Metiz Cinema Đà Nẵng
- **Trạng thái hiện tại**: \`READY_FOR_CEO_REVIEW\` (Chờ CEO xét duyệt Candidate Staging)
- **Kênh mua hàng**: \`AT_COUNTER\` (Mua trực tiếp tại quầy rạp Metiz Cinema)

## 2. Thông Số Deal & Điều Kiện Áp Dụng
- **Giá vé quan sát**: 55.000 đồng/ vé 2D (Ghế thường, VIP, ghế đôi)
- **Lịch áp dụng**: Thứ Hai mỗi tuần
- **Thời hạn chương trình**: \`01/01/2026 - 31/12/2026\`
- **Điều kiện thành viên**: Bắt buộc có thẻ thành viên Metiz Cinema (xuất trình trước khi mua vé)
- **Số lượng vé**: 1 khách hàng có thể mua nhiều vé
- **Ngoại lệ công bố**: Không áp dụng vào các ngày lễ, Tết, suất chiếu đặc biệt, suất chiếu sớm

## 3. Xác Thực Địa Bàn (Locality Scope)
- **Phạm vi nguồn**: *"Metiz Cinema Đà Nẵng; hướng dẫn vào Helio Center từ đường 2/9"*
- **Pháp nhân chủ quản**: Công Ty TNHH KHỞI PHÁT (GPKD: \`0400668112\`)

## 4. Danh Mục Artifacts & Snapshot Lineage
- **Receipt**: \`capture_receipt_METIZ_SUPER_MONDAY.json\`
- **PNG Screenshot**: \`metiz_super_monday_official_promo_capture.png\` (SHA: \`5b443193bd1407a811e9f239f22fc4c5ee7bcfbe77464e1616209653859dcf3e\`)
- **HTML DOM**: \`metiz_super_monday_official_promo_raw.html\` (SHA: \`c58ccb9e6eae5517961dad4efc74e7ef3d796dc64c0a0dda03e707d29b7345c4\`)
- **Raw Text**: \`metiz_super_monday_official_promo_text.txt\` (SHA: \`a7a568b0ad7d7031606e79e9c9bf679c33dc1f3500e36cd377cf4fe2d0ce203c\`)
- **Thời điểm kiểm tra (UTC)**: \`2026-08-24T06:32:50.311Z\`
`
};

const res44 = processCandidateIntake(superMondayDescriptor);
assertTest('INTAKE_03_SUPER_MONDAY_VALIDATION_PASS', res44.status === 'READY_FOR_CEO_REVIEW',
  'Candidate 44 (Metiz Super Monday) vượt qua toàn bộ kiểm thử validateCandidate() và được ghi đĩa an toàn.');

// 4. Positive Intake: Metiz U22 Candidate
const u22Descriptor = {
  candidate_id: 'CAND-DNG-METIZ-U22-2026',
  evidence_id: 'EVID_CAND-DNG-METIZ-U22-2026',
  deal_id: 'DNG-METIZ-U22-2026',
  deal_title: 'Metiz Cinema — Giá Vé U22 Đồng Giá 55K (Mua Tại Quầy)',
  merchant: 'Metiz Cinema Đà Nẵng',
  category: 'local_entertainment',
  source_url: 'https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html',
  captured_at_utc: '2026-08-24T06:32:56.027Z',
  runtime_run_id: 'RUN_METIZ_U22_069_STEP2B',
  purchase_channel: 'AT_COUNTER',
  membership_required: true,
  observed_price_or_offer: '55.000đ',
  deal_price: 55000,
  effective_date: '2026-01-01',
  expires_at: '2026-12-31',
  days_of_week: [2, 3, 4],
  claim_summary: 'LOCALLY_CAPTURED_SOURCE_LINKED: Fresh capture xác nhận Ưu đãi U22 55.000đ/vé 2D từ Thứ Ba đến Thứ Năm hàng tuần tại quầy rạp Metiz Cinema Đà Nẵng.',
  observed_conditions: 'Chương trình chỉ áp dụng cho thành viên Metiz Cinema, dưới 22 tuổi trở xuống. Vui lòng xuất trình thẻ thành viên & căn cước công dân trước khi mua vé để được giá ưu đãi & tích lũy điểm thưởng. Áp dụng cho hình thức mua vé trực tiếp tại quầy. Giá vé áp dụng cho ghế thường, ghế VIP.',
  notes: 'Locality có nguồn: Metiz Cinema Đà Nẵng; hướng dẫn vào Helio Center từ đường 2/9.',
  location_provenance_claim: 'Metiz Cinema Đà Nẵng; hướng dẫn vào Helio Center từ đường 2/9',
  exceptions_disclosed: 'Không áp dụng vào các ngày lễ, Tết, suất chiếu đặc biệt, suất chiếu sớm.',
  revision_id: 'REV_069_STEP2D_INTAKE',
  raw_artifacts: {
    png_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/fresh_metiz_u22_capture.png',
    html_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/fresh_metiz_u22_capture.html',
    txt_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/fresh_metiz_u22_capture.txt',
    receipt_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/FRESH_CAPTURE_RECEIPT_METIZ_U22.json'
  },
  snapshot_names: {
    png: 'metiz_u22_official_promo_capture.png',
    html: 'metiz_u22_official_promo_raw.html',
    txt: 'metiz_u22_official_promo_text.txt',
    receipt: 'capture_receipt_METIZ_U22.json'
  },
  extracted_claims: {
    price_snippet: 'Áp dụng giá vé 2D chỉ 55.000đ',
    conditions_snippet: 'Áp dụng cho hình thức mua vé trực tiếp tại quầy.'
  },
  output_candidate_filename: 'candidate_45_CAND-DNG-METIZ-U22-2026.json',
  output_dossier_filename: 'dossier_CAND-DNG-METIZ-U22-2026.md',
  dossier_markdown: `# EVIDENCE DOSSIER: CAND-DNG-METIZ-U22-2026

## 1. Thông Tin Định Danh Candidate
- **Candidate ID**: \`CAND-DNG-METIZ-U22-2026\`
- **Deal ID**: \`DNG-METIZ-U22-2026\`
- **Tiêu đề**: Metiz Cinema — Giá Vé U22 Đồng Giá 55K (Mua Tại Quầy)
- **Đơn vị cung cấp**: Metiz Cinema Đà Nẵng
- **Trạng thái hiện tại**: \`READY_FOR_CEO_REVIEW\` (Chờ CEO xét duyệt Candidate Staging)
- **Kênh mua hàng**: \`AT_COUNTER\` (Mua trực tiếp tại quầy rạp Metiz Cinema)

## 2. Thông Số Deal & Điều Kiện Áp Dụng
- **Giá vé quan sát**: 55.000đ / vé 2D (Ghế thường, ghế VIP)
- **Lịch áp dụng**: Tất cả các ngày trong tuần từ Thứ Ba đến Thứ Năm
- **Thời hạn chương trình**: \`01/01/2026 - 31/12/2026\`
- **Giới hạn độ tuổi**: Thành viên Metiz Cinema dưới 22 tuổi (sinh từ năm 2004 trở về sau)
- **Giấy tờ yêu cầu**: Xuất trình thẻ thành viên & CMND/CCCD trước khi mua vé
- **Ngoại lệ công bố**: Không áp dụng vào các ngày lễ, Tết, suất chiếu đặc biệt, suất chiếu sớm

## 3. Xác Thực Địa Bàn (Locality Scope)
- **Phạm vi nguồn**: *"Metiz Cinema Đà Nẵng; hướng dẫn vào Helio Center từ đường 2/9"*
- **Pháp nhân chủ quản**: Công Ty TNHH KHỞI PHÁT (GPKD: \`0400668112\`)

## 4. Danh Mục Artifacts & Snapshot Lineage
- **Receipt**: \`capture_receipt_METIZ_U22.json\`
- **PNG Screenshot**: \`metiz_u22_official_promo_capture.png\` (SHA: \`7a36e2db47ab6a7a09536632a801ea21a5cc1d7b3d1f68de12808daa8d37501c\`)
- **HTML DOM**: \`metiz_u22_official_promo_raw.html\` (SHA: \`3ccdae8330dba6e9b0690c5290eefa3080a1f784c7325be66aa6a9c55ab94ca1\`)
- **Raw Text**: \`metiz_u22_official_promo_text.txt\` (SHA: \`c17418d5d44c7c92a154dd894a06249f3d5fbd7cab8b30366375abdcf73b59b0\`)
- **Thời điểm kiểm tra (UTC)**: \`2026-08-24T06:32:56.027Z\`
`
};

const res45 = processCandidateIntake(u22Descriptor);
assertTest('INTAKE_04_U22_VALIDATION_PASS', res45.status === 'READY_FOR_CEO_REVIEW',
  'Candidate 45 (Metiz U22) vượt qua toàn bộ kiểm thử validateCandidate() và được ghi đĩa an toàn.');

// 5. Run full disk audit via validateCandidate
const cand44Path = path.join(pendingDir, 'candidate_44_CAND-DNG-METIZ-SUPER-MONDAY-2026.json');
const cand45Path = path.join(pendingDir, 'candidate_45_CAND-DNG-METIZ-U22-2026.json');

const cand44Data = JSON.parse(fs.readFileSync(cand44Path, 'utf8'));
const cand45Data = JSON.parse(fs.readFileSync(cand45Path, 'utf8'));

const errs44 = validateCandidate(cand44Data);
const errs45 = validateCandidate(cand45Data);

assertTest('INTAKE_05_DISK_CANDIDATE_44_VALIDATOR_ZERO_ERRORS', errs44.structurally_valid && errs44.errors.length === 0,
  `Candidate 44 trên đĩa chạy validateCandidate() trả về 0 lỗi. (Thực tế: ${errs44.errors.length} lỗi: ${errs44.errors.join(', ')})`);

assertTest('INTAKE_06_DISK_CANDIDATE_45_VALIDATOR_ZERO_ERRORS', errs45.structurally_valid && errs45.errors.length === 0,
  `Candidate 45 trên đĩa chạy validateCandidate() trả về 0 lỗi. (Thực tế: ${errs45.errors.length} lỗi: ${errs45.errors.join(', ')})`);

console.log('\n🟢 [SUMMARY-069-STEP2D] TOÀN BỘ 6/6 KIỂM THỬ INTAKE INTEGRATION ĐÃ ĐẠT [PASS]!');
