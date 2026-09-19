/**
 * PROCESS BATCH 070 CANDIDATES INTAKE
 * Directive: JAYT-HIGH-THROUGHPUT-OPERATIONS-070A
 */

const fs = require('fs');
const path = require('path');
const { processCandidateIntake } = require('../05_DEAL_AND_AFFILIATE/candidate_intake_pipeline_069d');
const { validateCandidate } = require('./validate_candidate_evidence');

const repoRoot = path.resolve(__dirname, '..');

// 1. Starlight U22 Candidate Descriptor
const starlightU22Desc = {
  candidate_id: 'CAND-DNG-STARLIGHT-U22-2026',
  evidence_id: 'EVID_CAND-DNG-STARLIGHT-U22-2026',
  deal_id: 'DNG-STARLIGHT-U22-2026',
  deal_title: 'Starlight Cinema — Vé U22 Đồng Giá 45K (T2-T5 Mua Tại Quầy)',
  merchant: 'Starlight Cinema Đà Nẵng',
  category: 'local_entertainment',
  source_url: 'https://starlight.vn/tin-tuc/ct-u22-rap-starlight.html',
  captured_at_utc: '2026-08-24T05:01:21.000Z',
  runtime_run_id: 'RUN_STARLIGHT_U22_069_STEP1C',
  purchase_channel: 'AT_COUNTER',
  membership_required: true,
  observed_price_or_offer: '45k/vé',
  deal_price: 45000,
  effective_date: '2026-01-01',
  expires_at: '2026-12-31',
  days_of_week: [1, 2, 3, 4],
  claim_summary: 'LOCALLY_CAPTURED_SOURCE_LINKED: Capture xác nhận Ưu đãi thành viên U22 đồng giá 45k/vé từ Thứ 2 đến Thứ 5 tại quầy Starlight Cinema Đà Nẵng.',
  observed_conditions: 'Độ tuổi dưới 22, mang CCCD/thẻ học sinh/sinh viên. Mua trực tiếp tại quầy từ Thứ 2 đến Thứ 5. Không áp dụng ngày lễ Tết, suất chiếu đặc biệt, thanh toán online.',
  notes: 'Locality có nguồn: Tầng 4, Tòa nhà Nguyễn Kim, 46 Điện Biên Phủ, TP. Đà Nẵng, Việt Nam.',
  location_provenance_claim: 'Tầng 4, Tòa nhà Nguyễn Kim, 46 Điện Biên Phủ, TP. Đà Nẵng, Việt Nam',
  exceptions_disclosed: 'Không áp dụng vào ngày lễ Tết, suất chiếu đặc biệt, thanh toán online.',
  revision_id: 'REV_070_STARLIGHT_U22_INTAKE',
  raw_artifacts: {
    png_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step1c_starlight/starlight_ct_u22_capture.png',
    html_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step1c_starlight/starlight_ct_u22_capture.html',
    txt_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step1c_starlight/starlight_ct_u22_capture.txt',
    receipt_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step1c_starlight/CAPTURE_RECEIPT_STARLIGHT_CT_U22.json'
  },
  snapshot_names: {
    png: 'starlight_u22_official_promo_capture.png',
    html: 'starlight_u22_official_promo_raw.html',
    txt: 'starlight_u22_official_promo_text.txt',
    receipt: 'capture_receipt_STARLIGHT_U22.json'
  },
  extracted_claims: {
    price_snippet: 'Đồng giá vé 45k/vé khi mua tại quầy từ thứ 2 đến thứ 5!',
    conditions_snippet: 'Giá vé U22 áp dụng cho khách hàng dưới 22 tuổi. U22 không áp dụng vào ngày lễ tết, suất chiếu đặc biệt, thanh toán online và đồng thời cùng các CTKM khác về giá vé.'
  },
  output_candidate_filename: 'candidate_46_CAND-DNG-STARLIGHT-U22-2026.json',
  output_dossier_filename: 'dossier_CAND-DNG-STARLIGHT-U22-2026.md',
  dossier_markdown: `# EVIDENCE DOSSIER: CAND-DNG-STARLIGHT-U22-2026

## 1. Thông Tin Định Danh Candidate
- **Candidate ID**: \`CAND-DNG-STARLIGHT-U22-2026\`
- **Deal ID**: \`DNG-STARLIGHT-U22-2026\`
- **Tiêu đề**: Starlight Cinema — Vé U22 Đồng Giá 45K (T2-T5 Mua Tại Quầy)
- **Đơn vị cung cấp**: Starlight Cinema Đà Nẵng
- **Trạng thái hiện tại**: \`READY_FOR_CEO_REVIEW\` (Chờ CEO xét duyệt Candidate Staging)
- **Kênh mua hàng**: \`AT_COUNTER\` (Mua trực tiếp tại quầy rạp Starlight Cinema)

## 2. Thông Số Deal & Điều Kiện Áp Dụng
- **Giá vé quan sát**: 45.000 đồng / vé 2D (T2 đến T5)
- **Lịch áp dụng**: Thứ Hai đến Thứ Năm hàng tuần
- **Thời hạn chương trình**: \`01/01/2026 - 31/12/2026\`
- **Điều kiện thành viên**: Dành cho khách hàng dưới 22 tuổi (xuất trình CCCD / thẻ HSSV tại quầy)
- **Ngoại lệ công bố**: Không áp dụng vào các ngày lễ, Tết, suất chiếu đặc biệt, thanh toán online

## 3. Xác Thực Địa Bàn (Locality Scope)
- **Phạm vi nguồn**: *"Tầng 4, Tòa nhà Nguyễn Kim, 46 Điện Biên Phủ, TP. Đà Nẵng, Việt Nam"*
- **Pháp nhân chủ quản**: CÔNG TY CỔ PHẦN ENTERTAINMENT 2020 (GPKD: \`0402021264\`)

## 4. Danh Mục Artifacts & Snapshot Lineage
- **Receipt**: \`capture_receipt_STARLIGHT_U22.json\`
- **PNG Screenshot**: \`starlight_u22_official_promo_capture.png\`
- **HTML DOM**: \`starlight_u22_official_promo_raw.html\`
- **Raw Text**: \`starlight_u22_official_promo_text.txt\`
- **Thời điểm kiểm tra (UTC)**: \`2026-08-24T05:01:21.000Z\`
`
};

// 2. Starlight Thứ 3 Phim Việt Descriptor
const starlightThu3Desc = {
  candidate_id: 'CAND-DNG-STARLIGHT-THU3-PHIM-VIET-2026',
  evidence_id: 'EVID_CAND-DNG-STARLIGHT-THU3-PHIM-VIET-2026',
  deal_id: 'DNG-STARLIGHT-THU3-PHIM-VIET-2026',
  deal_title: 'Starlight Cinema — Thứ 3 Ngày Phim Việt Đồng Giá 45K (Mua Tại Quầy)',
  merchant: 'Starlight Cinema Đà Nẵng',
  category: 'local_entertainment',
  source_url: 'https://starlight.vn/tin-tuc/thu-3-phim-viet.html',
  captured_at_utc: '2026-08-24T05:01:21.000Z',
  runtime_run_id: 'RUN_STARLIGHT_THU3_069_STEP1C',
  purchase_channel: 'AT_COUNTER',
  membership_required: false,
  observed_price_or_offer: '45 k',
  deal_price: 45000,
  effective_date: '2026-01-01',
  expires_at: '2026-12-31',
  days_of_week: [2],
  claim_summary: 'LOCALLY_CAPTURED_SOURCE_LINKED: Capture xác nhận Thứ 3 Ngày Phim Việt đồng giá 45k cho tất cả phim Việt vào Thứ 3 hàng tuần tại Starlight Cinema.',
  observed_conditions: 'Áp dụng giá 45k cho tất cả các phim Việt vào ngày Thứ 3 hàng tuần. Không áp dụng đồng thời CTKM khác, không áp dụng suất chiếu đặc biệt (Sneak Show), không áp dụng ngày lễ Tết. Áp dụng cho mọi đối tượng khách hàng.',
  notes: 'Locality có nguồn: Tầng 4, Tòa nhà Nguyễn Kim, 46 Điện Biên Phủ, TP. Đà Nẵng, Việt Nam.',
  location_provenance_claim: 'Tầng 4, Tòa nhà Nguyễn Kim, 46 Điện Biên Phủ, TP. Đà Nẵng, Việt Nam',
  exceptions_disclosed: 'Không áp dụng cho suất chiếu đặc biệt, không áp dụng ngày lễ Tết.',
  revision_id: 'REV_070_STARLIGHT_THU3_INTAKE',
  raw_artifacts: {
    png_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step1c_starlight/starlight_thu_3_phim_viet_capture.png',
    html_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step1c_starlight/starlight_thu_3_phim_viet_capture.html',
    txt_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step1c_starlight/starlight_thu_3_phim_viet_capture.txt',
    receipt_path: '05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step1c_starlight/CAPTURE_RECEIPT_STARLIGHT_THU_3_PHIM_VIET.json'
  },
  snapshot_names: {
    png: 'starlight_thu3_official_promo_capture.png',
    html: 'starlight_thu3_official_promo_raw.html',
    txt: 'starlight_thu3_official_promo_text.txt',
    receipt: 'capture_receipt_STARLIGHT_THU3.json'
  },
  extracted_claims: {
    price_snippet: '-Áp dụng giá : 45 k cho tất cả các phim Việt vào ngày thứ 3 hàng tuần.',
    conditions_snippet: '-Chương trình không áp dụng đồng thời cùng các CTKM khác, không áp dụng cho Suất chiếu đặc biệt (Sneak Show), Không áp dụng vào ngày lễ tết.'
  },
  output_candidate_filename: 'candidate_47_CAND-DNG-STARLIGHT-THU3-PHIM-VIET-2026.json',
  output_dossier_filename: 'dossier_CAND-DNG-STARLIGHT-THU3-PHIM-VIET-2026.md',
  dossier_markdown: `# EVIDENCE DOSSIER: CAND-DNG-STARLIGHT-THU3-PHIM-VIET-2026

## 1. Thông Tin Định Danh Candidate
- **Candidate ID**: \`CAND-DNG-STARLIGHT-THU3-PHIM-VIET-2026\`
- **Deal ID**: \`DNG-STARLIGHT-THU3-PHIM-VIET-2026\`
- **Tiêu đề**: Starlight Cinema — Thứ 3 Ngày Phim Việt Đồng Giá 45K (Mua Tại Quầy)
- **Đơn vị cung cấp**: Starlight Cinema Đà Nẵng
- **Trạng thái hiện tại**: \`READY_FOR_CEO_REVIEW\` (Chờ CEO xét duyệt Candidate Staging)
- **Kênh mua hàng**: \`AT_COUNTER\` (Mua trực tiếp tại quầy rạp Starlight Cinema)

## 2. Thông Số Deal & Điều Kiện Áp Dụng
- **Giá vé quan sát**: 45.000 đồng / vé 2D (Tất cả phim Việt)
- **Lịch áp dụng**: Thứ Ba hàng tuần
- **Thời hạn chương trình**: \`01/01/2026 - 31/12/2026\`
- **Đối tượng áp dụng**: Tất cả mọi đối tượng khách hàng
- **Ngoại lệ công bố**: Không áp dụng vào các ngày lễ, Tết, suất chiếu đặc biệt (Sneak Show)

## 3. Xác Thực Địa Bàn (Locality Scope)
- **Phạm vi nguồn**: *"Tầng 4, Tòa nhà Nguyễn Kim, 46 Điện Biên Phủ, TP. Đà Nẵng, Việt Nam"*
- **Pháp nhân chủ quản**: CÔNG TY CỔ PHẦN ENTERTAINMENT 2020 (GPKD: \`0402021264\`)

## 4. Danh Mục Artifacts & Snapshot Lineage
- **Receipt**: \`capture_receipt_STARLIGHT_THU3.json\`
- **PNG Screenshot**: \`starlight_thu3_official_promo_capture.png\`
- **HTML DOM**: \`starlight_thu3_official_promo_raw.html\`
- **Raw Text**: \`starlight_thu3_official_promo_text.txt\`
- **Thời điểm kiểm tra (UTC)**: \`2026-08-24T05:01:21.000Z\`
`
};

console.log('🔄 Bắt đầu intake các candidate mới...');
const res46 = processCandidateIntake(starlightU22Desc);
const res47 = processCandidateIntake(starlightThu3Desc);

console.log(`\n✅ Kết quả intake:`);
console.log(`  Candidate 46: ${res46.candidate_id} (${res46.status})`);
console.log(`  Candidate 47: ${res47.candidate_id} (${res47.status})`);
