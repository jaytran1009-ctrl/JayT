/**
 * CREATE & VALIDATE METIZ CANDIDATES (069-STEP2C)
 * Directive: JAYT-069-STEP2C — METIZ CANDIDATE PREPARATION (CEO AUTHORIZED)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const freshEvidenceDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'batch_069_step2b_fresh_metiz');
const pendingDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review');

function getSha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

const superMondayReceiptPath = path.join(freshEvidenceDir, 'FRESH_CAPTURE_RECEIPT_METIZ_SUPER_MONDAY.json');
const u22ReceiptPath = path.join(freshEvidenceDir, 'FRESH_CAPTURE_RECEIPT_METIZ_U22.json');
const validityReceiptPath = path.join(freshEvidenceDir, 'FRESH_CAPTURE_RECEIPT_METIZ_PROMOTIONS_LISTING_VALIDITY.json');
const locationReceiptPath = path.join(freshEvidenceDir, 'FRESH_CAPTURE_RECEIPT_METIZ_DIA_CHI.json');

const superMondayReceiptSha = getSha256(superMondayReceiptPath);
const u22ReceiptSha = getSha256(u22ReceiptPath);
const validityReceiptSha = getSha256(validityReceiptPath);
const locationReceiptSha = getSha256(locationReceiptPath);

// 1. Candidate 42: Metiz Super Monday
const candidate42 = {
  evidence: {
    "EVID_CAND-DNG-METIZ-SUPER-MONDAY-REAL": {
      deal_id: "DNG-METIZ-SUPER-MONDAY-REAL",
      source_url: "https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html",
      source_type: "OFFICIAL_PROMOTION_ANNOUNCEMENT",
      recorded_by: "JAYT_DESK_REVIEW_PUBLIC_SOURCE",
      verification_status: "READY_FOR_CEO_REVIEW",
      verification_readiness: "READY_FOR_CEO_REVIEW",
      evidence_status: "LOCALLY_CAPTURED_SOURCE_LINKED",
      verification_level: "NOT_INDEPENDENTLY_VERIFIED",
      temporal_validity: "CONFIRMED_ANNUAL_2026",
      checked_at: "2026-08-24T06:32:50.311Z",
      captured_at: "2026-08-24T06:32:50.311Z",
      claim_summary: "LOCALLY_CAPTURED_SOURCE_LINKED: Fresh capture 069-Step2B xác nhận Super Monday 55.000đ/vé 2D vào Thứ Hai hàng tuần (01/01/2026 - 31/12/2026). Kênh mua: AT_COUNTER.",
      source_specificity: "PUBLIC_OFFICIAL_WEBSITE",
      observed_price_or_offer: "55.000 đồng/ vé 2D",
      observed_conditions: "Chương trình áp dụng cho thành viên Metiz Cinema. Vui lòng xuất trình thẻ thành viên trước khi mua vé. Áp dụng cho hình thức mua vé trực tiếp tại rạp. Giá vé áp dụng cho ghế thường, ghế VIP và ghế đôi. Không áp dụng vào các ngày lễ, Tết, suất chiếu đặc biệt, suất chiếu sớm.",
      expiry_basis: "EXPLICIT_PROMOTION_DATE_IN_CAPTURE",
      capture_file: "fresh_metiz_super_monday_capture.png",
      evidence_content_hash: "5b443193bd1407a811e9f239f22fc4c5ee7bcfbe77464e1616209653859dcf3e",
      artifact_mime_type: "image/png",
      artifact_text_dump: "fresh_metiz_super_monday_capture.txt",
      artifact_text_hash: "a7a568b0ad7d7031606e79e9c9bf679c33dc1f3500e36cd377cf4fe2d0ce203c",
      artifact_html_dump: "fresh_metiz_super_monday_capture.html",
      artifact_html_hash: "c58ccb9e6eae5517961dad4efc74e7ef3d796dc64c0a0dda03e707d29b7345c4",
      capture_receipt_ref: "05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/FRESH_CAPTURE_RECEIPT_METIZ_SUPER_MONDAY.json",
      capture_receipt_hash: superMondayReceiptSha,
      capture_method: "AUTOMATED_PUBLIC_BROWSER_CAPTURE",
      capture_tool: "chrome_headless_cdp_anonymous",
      missing_evidence_fields: [],
      notes: "Fresh capture bất biến 069-Step2B. Locality có nguồn: Metiz Cinema Đà Nẵng; hướng dẫn vào Helio Center từ đường 2/9.",
      volatility_tag: null,
      location_provenance_claim: "Metiz Cinema Đà Nẵng; hướng dẫn vào Helio Center từ đường 2/9",
      purchase_channel: "AT_COUNTER",
      extracted_claims: {
        price_snippet: "55.000 đồng/ vé 2D",
        validity_snippet: "01/01/2026 - 31/12/2026",
        conditions_snippet: "xuất trình thẻ thành viên trước khi mua vé... áp dụng cho hình thức mua vé trực tiếp tại rạp"
      },
      candidate_id: "CAND-DNG-METIZ-SUPER-MONDAY-REAL",
      evidence_id: "EVID_CAND-DNG-METIZ-SUPER-MONDAY-REAL",
      content_class: "PROMOTION_DETAIL",
      active_revision_id: "REV_069_STEP2B_FRESH_CAPTURE"
    }
  },
  deals: [
    {
      deal_id: "DNG-METIZ-SUPER-MONDAY-REAL",
      title: "Metiz Cinema — Super Monday Đồng Giá 55K (Mua Tại Quầy)",
      merchant: "Metiz Cinema Đà Nẵng",
      category: "local_entertainment",
      need_collection: "general",
      budget_tier: "under_100k",
      duration_mins: null,
      group_size: "1_person",
      contextual_reason: "Metiz Cinema — Super Monday Đồng Giá 55K (Mua Tại Quầy)",
      observed_price: "55.000 đồng/ vé 2D",
      deal_price: 55000,
      original_price: null,
      discount_pct: null,
      effective_date: "2026-01-01",
      expires_at: "2026-12-31",
      days_of_week: [1],
      start_minutes: null,
      end_minutes: null,
      persona: null,
      taxonomy: "PROBING",
      affiliate_type: "DIRECT_DEAL",
      source_url: "https://metiz.vn/promotion/super-monday-thu-hai-sieu-hang-2.html",
      evidence_ref: "EVID_CAND-DNG-METIZ-SUPER-MONDAY-REAL",
      disclosure: "Thông tin được quan sát trực tiếp từ trang chính thức. Chưa qua xác minh độc lập bên thứ ba (NOT_INDEPENDENTLY_VERIFIED).",
      lifecycle_status: "READY_FOR_CEO_REVIEW",
      render_eligible: false,
      verified_at: "2026-08-24T06:32:50.311Z",
      category_scope: "LOCAL_EXPERIENCE",
      volatility_tag: null,
      purchase_channel: "AT_COUNTER",
      membership_required: true,
      locality_scope: "Metiz Cinema Đà Nẵng; hướng dẫn vào Helio Center từ đường 2/9",
      exceptions_disclosed: "Không áp dụng vào các ngày lễ, Tết, suất chiếu đặc biệt, suất chiếu sớm."
    }
  ],
  evidence_revisions: {
    current_revision_id: "REV_069_STEP2B_FRESH_CAPTURE",
    revisions: [
      {
        revision_id: "REV_069_STEP2B_FRESH_CAPTURE",
        revision_order: 1,
        captured_at: "2026-08-24T06:32:50.311Z",
        evidence_status: "LOCALLY_CAPTURED_SOURCE_LINKED",
        verification_readiness: "READY_FOR_CEO_REVIEW",
        verification_level: "NOT_INDEPENDENTLY_VERIFIED",
        capture_receipt_ref: "05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/FRESH_CAPTURE_RECEIPT_METIZ_SUPER_MONDAY.json",
        capture_receipt_hash: superMondayReceiptSha,
        content_class: "PROMOTION_DETAIL",
        notes: "Fresh capture bất biến 069-Step2B. Locality có nguồn: Metiz Cinema Đà Nẵng; hướng dẫn vào Helio Center từ đường 2/9."
      }
    ]
  }
};

// 2. Candidate 43: Metiz U22
const candidate43 = {
  evidence: {
    "EVID_CAND-DNG-METIZ-U22-REAL": {
      deal_id: "DNG-METIZ-U22-REAL",
      source_url: "https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html",
      source_type: "OFFICIAL_PROMOTION_ANNOUNCEMENT",
      recorded_by: "JAYT_DESK_REVIEW_PUBLIC_SOURCE",
      verification_status: "READY_FOR_CEO_REVIEW",
      verification_readiness: "READY_FOR_CEO_REVIEW",
      evidence_status: "LOCALLY_CAPTURED_SOURCE_LINKED",
      verification_level: "NOT_INDEPENDENTLY_VERIFIED",
      temporal_validity: "CONFIRMED_ANNUAL_2026",
      checked_at: "2026-08-24T06:32:56.027Z",
      captured_at: "2026-08-24T06:32:56.027Z",
      claim_summary: "LOCALLY_CAPTURED_SOURCE_LINKED: Fresh capture 069-Step2B xác nhận Ưu đãi U22 55.000đ/vé 2D từ Thứ Ba đến Thứ Năm hàng tuần (01/01/2026 - 31/12/2026). Kênh mua: AT_COUNTER.",
      source_specificity: "PUBLIC_OFFICIAL_WEBSITE",
      observed_price_or_offer: "55.000đ",
      observed_conditions: "Chương trình chỉ áp dụng cho thành viên Metiz Cinema, dưới 22 tuổi trở xuống. Vui lòng xuất trình thẻ thành viên & căn cước công dân trước khi mua vé để được giá ưu đãi. Áp dụng cho hình thức mua vé trực tiếp tại quầy. Giá vé áp dụng cho ghế thường, ghế VIP. Không áp dụng vào các ngày lễ, Tết, suất chiếu đặc biệt, suất chiếu sớm.",
      expiry_basis: "EXPLICIT_PROMOTION_DATE_IN_CAPTURE",
      capture_file: "fresh_metiz_u22_capture.png",
      evidence_content_hash: "7a36e2db47ab6a7a09536632a801ea21a5cc1d7b3d1f68de12808daa8d37501c",
      artifact_mime_type: "image/png",
      artifact_text_dump: "fresh_metiz_u22_capture.txt",
      artifact_text_hash: "c17418d5d44c7c92a154dd894a06249f3d5fbd7cab8b30366375abdcf73b59b0",
      artifact_html_dump: "fresh_metiz_u22_capture.html",
      artifact_html_hash: "3ccdae8330dba6e9b0690c5290eefa3080a1f784c7325be66aa6a9c55ab94ca1",
      capture_receipt_ref: "05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/FRESH_CAPTURE_RECEIPT_METIZ_U22.json",
      capture_receipt_hash: u22ReceiptSha,
      capture_method: "AUTOMATED_PUBLIC_BROWSER_CAPTURE",
      capture_tool: "chrome_headless_cdp_anonymous",
      missing_evidence_fields: [],
      notes: "Fresh capture bất biến 069-Step2B. Locality có nguồn: Metiz Cinema Đà Nẵng; hướng dẫn vào Helio Center từ đường 2/9.",
      volatility_tag: null,
      location_provenance_claim: "Metiz Cinema Đà Nẵng; hướng dẫn vào Helio Center từ đường 2/9",
      purchase_channel: "AT_COUNTER",
      extracted_claims: {
        price_snippet: "55.000đ",
        validity_snippet: "01/01/2026 - 31/12/2026",
        conditions_snippet: "thành viên Metiz Cinema, dưới 22 tuổi trở xuống... xuất trình thẻ thành viên & căn cước công dân... áp dụng cho hình thức mua vé trực tiếp tại quầy"
      },
      candidate_id: "CAND-DNG-METIZ-U22-REAL",
      evidence_id: "EVID_CAND-DNG-METIZ-U22-REAL",
      content_class: "PROMOTION_DETAIL",
      active_revision_id: "REV_069_STEP2B_FRESH_CAPTURE"
    }
  },
  deals: [
    {
      deal_id: "DNG-METIZ-U22-REAL",
      title: "Metiz Cinema — Giá Vé U22 Đồng Giá 55K (Mua Tại Quầy)",
      merchant: "Metiz Cinema Đà Nẵng",
      category: "local_entertainment",
      need_collection: "general",
      budget_tier: "under_100k",
      duration_mins: null,
      group_size: "1_person",
      contextual_reason: "Metiz Cinema — Giá Vé U22 Đồng Giá 55K (Mua Tại Quầy)",
      observed_price: "55.000đ",
      deal_price: 55000,
      original_price: null,
      discount_pct: null,
      effective_date: "2026-01-01",
      expires_at: "2026-12-31",
      days_of_week: [2, 3, 4],
      start_minutes: null,
      end_minutes: null,
      persona: null,
      taxonomy: "PROBING",
      affiliate_type: "DIRECT_DEAL",
      source_url: "https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html",
      evidence_ref: "EVID_CAND-DNG-METIZ-U22-REAL",
      disclosure: "Thông tin được quan sát trực tiếp từ trang chính thức. Chưa qua xác minh độc lập bên thứ ba (NOT_INDEPENDENTLY_VERIFIED).",
      lifecycle_status: "READY_FOR_CEO_REVIEW",
      render_eligible: false,
      verified_at: "2026-08-24T06:32:56.027Z",
      category_scope: "LOCAL_EXPERIENCE",
      volatility_tag: null,
      purchase_channel: "AT_COUNTER",
      membership_required: true,
      age_restriction: "<= 22 tuổi (yêu cầu CCCD)",
      locality_scope: "Metiz Cinema Đà Nẵng; hướng dẫn vào Helio Center từ đường 2/9",
      exceptions_disclosed: "Không áp dụng vào các ngày lễ, Tết, suất chiếu đặc biệt, suất chiếu sớm."
    }
  ],
  evidence_revisions: {
    current_revision_id: "REV_069_STEP2B_FRESH_CAPTURE",
    revisions: [
      {
        revision_id: "REV_069_STEP2B_FRESH_CAPTURE",
        revision_order: 1,
        captured_at: "2026-08-24T06:32:56.027Z",
        evidence_status: "LOCALLY_CAPTURED_SOURCE_LINKED",
        verification_readiness: "READY_FOR_CEO_REVIEW",
        verification_level: "NOT_INDEPENDENTLY_VERIFIED",
        capture_receipt_ref: "05_DEAL_AND_AFFILIATE/raw_evidence/batch_069_step2b_fresh_metiz/FRESH_CAPTURE_RECEIPT_METIZ_U22.json",
        capture_receipt_hash: u22ReceiptSha,
        content_class: "PROMOTION_DETAIL",
        notes: "Fresh capture bất biến 069-Step2B. Locality có nguồn: Metiz Cinema Đà Nẵng; hướng dẫn vào Helio Center từ đường 2/9."
      }
    ]
  }
};

const cand42Path = path.join(pendingDir, 'candidate_42_CAND-DNG-METIZ-SUPER-MONDAY-REAL.json');
const cand43Path = path.join(pendingDir, 'candidate_43_CAND-DNG-METIZ-U22-REAL.json');

fs.writeFileSync(cand42Path, JSON.stringify(candidate42, null, 2), 'utf8');
fs.writeFileSync(cand43Path, JSON.stringify(candidate43, null, 2), 'utf8');

console.log(`✅ Đã tạo Candidate 42: ${cand42Path}`);
console.log(`✅ Đã tạo Candidate 43: ${cand43Path}`);
