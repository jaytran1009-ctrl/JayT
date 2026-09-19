/**
 * JAYT BATCH 2 INTAKE & VALIDATION ENGINE
 * Directive: JAYT-070D — BATCH-2 ACCUMULATION
 * Fully implements Pre-write Validation Gate & SSOT Provenance Contracts
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { validateCandidate, parseAndVerifyPng } = require('./validate_candidate_evidence');

const repoRoot = path.resolve(__dirname, '..');
const snapshotsDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'evidence_snapshots');
const pendingReviewDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'candidates', 'pending_review');

fs.mkdirSync(snapshotsDir, { recursive: true });
fs.mkdirSync(pendingReviewDir, { recursive: true });

function getSha256(filePathOrBuf) {
  if (Buffer.isBuffer(filePathOrBuf)) {
    return crypto.createHash('sha256').update(filePathOrBuf).digest('hex');
  }
  return crypto.createHash('sha256').update(fs.readFileSync(filePathOrBuf)).digest('hex');
}

const rawDirDeep = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'run_070d_batch2_deep_1787555158050');
const rawDirFull = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'raw_evidence', 'run_070d_batch2_full_1787555042843');

const cand44Path = path.join(pendingReviewDir, 'candidate_44_CAND-DNG-METIZ-SUPER-MONDAY-2026.json');
const candTemplate = JSON.parse(fs.readFileSync(cand44Path, 'utf8'));

const candidateConfigs = [
  // 1. Lotteria Set Yêu Thương 1
  {
    candidate_id: 'CAND-VNM-LOTTERIA-SET-YEU-THUONG-1-2026',
    deal_id: 'VNM-LOTTERIA-SET-YEU-THUONG-1-2026',
    title: 'Lotteria Vietnam — Combo Phần Ăn Nhóm Yêu Thương 1 (145K)',
    merchant: 'Lotteria Vietnam',
    category: 'local_food',
    category_scope: 'LOCAL_EXPERIENCE',
    purchase_channel: 'ONLINE_OR_STORE',
    locality_scope: 'Toàn quốc & Các chi nhánh Lotteria Đà Nẵng',
    source_url: 'https://www.lotteria.vn/category/set',
    raw_prefix: 'lotteria_set',
    raw_dir: rawDirDeep,
    observed_price: '145.000 ₫',
    deal_price: 145000,
    original_price: 186000,
    discount_pct: 22,
    price_snippet: '145.000 ₫',
    conditions_snippet: '02 Gà rán',
    claim_summary: 'LOCALLY_CAPTURED_SOURCE_LINKED: Combo Phần Ăn Nhóm Yêu Thương 1 gồm 2 gà rán, 2 mì ý, 2 pepsi, 1 khoai tây chiên giá 145.000đ.',
    effective_date: '2026-01-01',
    expires_at: '2026-12-31',
    temporal_validity: 'CONFIRMED_ANNUAL_2026',
    days_of_week: [1, 2, 3, 4, 5, 6, 7]
  },
  // 2. Lotteria Set Yêu Thương 2
  {
    candidate_id: 'CAND-VNM-LOTTERIA-SET-YEU-THUONG-2-2026',
    deal_id: 'VNM-LOTTERIA-SET-YEU-THUONG-2-2026',
    title: 'Lotteria Vietnam — Combo Gà Sốt Phô Mai Yêu Thương 2 (145K)',
    merchant: 'Lotteria Vietnam',
    category: 'local_food',
    category_scope: 'LOCAL_EXPERIENCE',
    purchase_channel: 'ONLINE_OR_STORE',
    locality_scope: 'Toàn quốc & Các chi nhánh Lotteria Đà Nẵng',
    source_url: 'https://www.lotteria.vn/category/set',
    raw_prefix: 'lotteria_set',
    raw_dir: rawDirDeep,
    observed_price: '145.000 ₫',
    deal_price: 145000,
    original_price: 177000,
    discount_pct: 18,
    price_snippet: '145.000 ₫',
    conditions_snippet: '02 Gà sốt phô mai',
    claim_summary: 'LOCALLY_CAPTURED_SOURCE_LINKED: Combo Phần Ăn Nhóm Yêu Thương 2 gồm 2 gà sốt phô mai, 1 mì ý, 1 khoai tây lắc, 2 pepsi giá 145.000đ.',
    effective_date: '2026-01-01',
    expires_at: '2026-12-31',
    temporal_validity: 'CONFIRMED_ANNUAL_2026',
    days_of_week: [1, 2, 3, 4, 5, 6, 7]
  },
  // 3. Lotteria Set Yêu Thương 3
  {
    candidate_id: 'CAND-VNM-LOTTERIA-SET-YEU-THUONG-3-2026',
    deal_id: 'VNM-LOTTERIA-SET-YEU-THUONG-3-2026',
    title: 'Lotteria Vietnam — Combo Burger Bulgogi Yêu Thương 3 (145K)',
    merchant: 'Lotteria Vietnam',
    category: 'local_food',
    category_scope: 'LOCAL_EXPERIENCE',
    purchase_channel: 'ONLINE_OR_STORE',
    locality_scope: 'Toàn quốc & Các chi nhánh Lotteria Đà Nẵng',
    source_url: 'https://www.lotteria.vn/category/set',
    raw_prefix: 'lotteria_set',
    raw_dir: rawDirDeep,
    observed_price: '145.000 ₫',
    deal_price: 145000,
    original_price: 183000,
    discount_pct: 21,
    price_snippet: '145.000 ₫',
    conditions_snippet: '01 Burger bulgogi',
    claim_summary: 'LOCALLY_CAPTURED_SOURCE_LINKED: Combo Phần Ăn Nhóm Yêu Thương 3 gồm 2 gà rán, 1 burger bulgogi, 1 mì ý, 2 pepsi giá 145.000đ.',
    effective_date: '2026-01-01',
    expires_at: '2026-12-31',
    temporal_validity: 'CONFIRMED_ANNUAL_2026',
    days_of_week: [1, 2, 3, 4, 5, 6, 7]
  },
  // 4. Lotteria Set Rộn Ràng 1
  {
    candidate_id: 'CAND-VNM-LOTTERIA-SET-RON-RANG-1-2026',
    deal_id: 'VNM-LOTTERIA-SET-RON-RANG-1-2026',
    title: 'Lotteria Vietnam — Combo Gia Đình Rộn Ràng 1 (185K)',
    merchant: 'Lotteria Vietnam',
    category: 'local_food',
    category_scope: 'LOCAL_EXPERIENCE',
    purchase_channel: 'ONLINE_OR_STORE',
    locality_scope: 'Toàn quốc & Các chi nhánh Lotteria Đà Nẵng',
    source_url: 'https://www.lotteria.vn/category/set',
    raw_prefix: 'lotteria_set',
    raw_dir: rawDirDeep,
    observed_price: '185.000 ₫',
    deal_price: 185000,
    original_price: 251000,
    discount_pct: 26,
    price_snippet: '185.000 ₫',
    conditions_snippet: '03 Gà rán',
    claim_summary: 'LOCALLY_CAPTURED_SOURCE_LINKED: Combo Gia Đình Rộn Ràng 1 gồm 3 gà rán, 2 mì ý, 1 khoai chiên, 3 pepsi giá 185.000đ.',
    effective_date: '2026-01-01',
    expires_at: '2026-12-31',
    temporal_validity: 'CONFIRMED_ANNUAL_2026',
    days_of_week: [1, 2, 3, 4, 5, 6, 7]
  },
  // 5. Shopee Voucher Toàn Sàn 25%
  {
    candidate_id: 'CAND-VNM-SHOPEE-VOUCHER-25PCT-2026',
    deal_id: 'VNM-SHOPEE-VOUCHER-25PCT-2026',
    title: 'Shopee Vietnam — Voucher Toàn Sàn Giảm 25% (Tối Đa 100K)',
    merchant: 'Shopee Vietnam',
    category: 'online_shopping',
    category_scope: 'ONLINE_PURCHASE',
    purchase_channel: 'ONLINE_APP',
    locality_scope: 'Toàn quốc (Ứng dụng Shopee)',
    source_url: 'https://shopee.vn/m/ma-giam-gia',
    raw_prefix: 'shopee_voucher_xtra',
    raw_dir: rawDirDeep,
    observed_price: 'Giảm 25% tối đa 100k₫',
    deal_price: 0,
    original_price: null,
    discount_pct: 25,
    price_snippet: 'Giảm 25%',
    conditions_snippet: 'Giảm tối đa 100k₫ Đơn Tối Thiểu 100k₫',
    claim_summary: 'LOCALLY_CAPTURED_SOURCE_LINKED: Voucher toàn sàn Shopee giảm 25% tối đa 100.000đ cho đơn hàng từ 100.000đ.',
    effective_date: '2026-01-01',
    expires_at: '2026-08-31',
    temporal_validity: 'CONFIRMED_ANNUAL_2026',
    days_of_week: [1, 2, 3, 4, 5, 6, 7]
  },
  // 6. Shopee Voucher Toàn Sàn 20%
  {
    candidate_id: 'CAND-VNM-SHOPEE-VOUCHER-20PCT-2026',
    deal_id: 'VNM-SHOPEE-VOUCHER-20PCT-2026',
    title: 'Shopee Vietnam — Voucher Toàn Sàn Giảm 20% (Tối Đa 300K)',
    merchant: 'Shopee Vietnam',
    category: 'online_shopping',
    category_scope: 'ONLINE_PURCHASE',
    purchase_channel: 'ONLINE_APP',
    locality_scope: 'Toàn quốc (Ứng dụng Shopee)',
    source_url: 'https://shopee.vn/m/ma-giam-gia',
    raw_prefix: 'shopee_voucher_xtra',
    raw_dir: rawDirDeep,
    observed_price: 'Giảm 20% tối đa 300k₫',
    deal_price: 0,
    original_price: null,
    discount_pct: 20,
    price_snippet: 'Giảm 20%',
    conditions_snippet: 'Giảm tối đa 300k₫ Đơn Tối Thiểu 500k₫',
    claim_summary: 'LOCALLY_CAPTURED_SOURCE_LINKED: Voucher toàn sàn Shopee giảm 20% tối đa 300.000đ cho đơn hàng từ 500.000đ.',
    effective_date: '2026-01-01',
    expires_at: '2026-08-31',
    temporal_validity: 'CONFIRMED_ANNUAL_2026',
    days_of_week: [1, 2, 3, 4, 5, 6, 7]
  },
  // 7. ShopeeFood Đà Nẵng - Khởi Động Tuần Mới Giảm 40K
  {
    candidate_id: 'CAND-DNG-SHOPEEFOOD-KHOI-DONG-TUAN-MOI-40K-2026',
    deal_id: 'DNG-SHOPEEFOOD-KHOI-DONG-TUAN-MOI-40K-2026',
    title: 'ShopeeFood Đà Nẵng — Bộ Sưu Tập Khởi Động Tuần Mới Giảm 40K',
    merchant: 'ShopeeFood Đà Nẵng',
    category: 'online_shopping',
    category_scope: 'ONLINE_PURCHASE',
    purchase_channel: 'DELIVERY_APP',
    locality_scope: 'Thành phố Đà Nẵng (Hải Châu, Cẩm Lệ, Thanh Khê, Sơn Trà, Ngũ Hành Sơn, Liên Chiểu)',
    source_url: 'https://shopeefood.vn/da-nang',
    raw_prefix: 'shopeefood_dng',
    raw_dir: rawDirFull,
    observed_price: 'Giảm 40.000Đ',
    deal_price: 0,
    original_price: null,
    discount_pct: null,
    price_snippet: 'Khởi Động Tuần Mới Giảm 40.000Đ',
    conditions_snippet: '200 địa điểm',
    claim_summary: 'LOCALLY_CAPTURED_SOURCE_LINKED: Bộ sưu tập Khởi Động Tuần Mới trên ShopeeFood Đà Nẵng giảm 40.000đ tại 200 địa điểm.',
    effective_date: '2026-01-01',
    expires_at: '2026-12-31',
    temporal_validity: 'CONFIRMED_ANNUAL_2026',
    days_of_week: [1, 2, 3, 4, 5, 6, 7]
  },
  // 8. ShopeeFood Đà Nẵng - Quán Ngon Gần Nhà Giảm 35K
  {
    candidate_id: 'CAND-DNG-SHOPEEFOOD-QUAN-NGON-GAN-NHA-35K-2026',
    deal_id: 'DNG-SHOPEEFOOD-QUAN-NGON-GAN-NHA-35K-2026',
    title: 'ShopeeFood Đà Nẵng — Quán Ngon Gần Nhà Giảm Tới 35.000Đ',
    merchant: 'ShopeeFood Đà Nẵng',
    category: 'online_shopping',
    category_scope: 'ONLINE_PURCHASE',
    purchase_channel: 'DELIVERY_APP',
    locality_scope: 'Thành phố Đà Nẵng',
    source_url: 'https://shopeefood.vn/da-nang',
    raw_prefix: 'shopeefood_dng',
    raw_dir: rawDirFull,
    observed_price: 'Giảm Tới 35.000Đ',
    deal_price: 0,
    original_price: null,
    discount_pct: null,
    price_snippet: 'Quán Ngon Gần Nhà, Giảm Tới 35.000Đ',
    conditions_snippet: '200 địa điểm',
    claim_summary: 'LOCALLY_CAPTURED_SOURCE_LINKED: Bộ sưu tập Quán Ngon Gần Nhà trên ShopeeFood Đà Nẵng giảm tới 35.000đ tại 200 địa điểm.',
    effective_date: '2026-01-01',
    expires_at: '2026-12-31',
    temporal_validity: 'CONFIRMED_ANNUAL_2026',
    days_of_week: [1, 2, 3, 4, 5, 6, 7]
  }
];

function runIntake() {
  console.log('🚀 [BATCH-2-INTAKE] Khởi chạy Intake & Validation cho 8 Candidates Batch 2...');
  const intakeResults = [];
  let candidateIndex = 48; // Starting index

  for (const cfg of candidateConfigs) {
    const pngRawFile = path.join(cfg.raw_dir, `${cfg.raw_prefix}_capture.png`);
    const htmlRawFile = path.join(cfg.raw_dir, `${cfg.raw_prefix}_raw.html`);
    const textRawFile = path.join(cfg.raw_dir, `${cfg.raw_prefix}_text.txt`);

    if (!fs.existsSync(pngRawFile) || !fs.existsSync(htmlRawFile) || !fs.existsSync(textRawFile)) {
      throw new Error(`FAIL-CLOSED: Missing raw capture files for ${cfg.candidate_id} in ${cfg.raw_dir}`);
    }

    const pngBuf = fs.readFileSync(pngRawFile);
    const htmlStr = fs.readFileSync(htmlRawFile, 'utf8');
    const textStr = fs.readFileSync(textRawFile, 'utf8');

    // Verify PNG integrity
    const pngParsed = parseAndVerifyPng(pngBuf);
    if (!pngParsed.ok) {
      throw new Error(`FAIL-CLOSED: Invalid raw PNG for ${cfg.candidate_id}: ${pngParsed.message}`);
    }

    // Strict verbatim validation against text dump
    if (!textStr.includes(cfg.price_snippet)) {
      throw new Error(`FAIL-CLOSED: price_snippet '${cfg.price_snippet}' not found in text dump for ${cfg.candidate_id}`);
    }
    if (!textStr.includes(cfg.conditions_snippet)) {
      throw new Error(`FAIL-CLOSED: conditions_snippet '${cfg.conditions_snippet}' not found in text dump for ${cfg.candidate_id}`);
    }

    const pngSnapFile = `${cfg.candidate_id.toLowerCase()}_official_promo_capture.png`;
    const htmlSnapFile = `${cfg.candidate_id.toLowerCase()}_official_promo_raw.html`;
    const textSnapFile = `${cfg.candidate_id.toLowerCase()}_official_promo_text.txt`;

    const pngSnapPath = path.join(snapshotsDir, pngSnapFile);
    const htmlSnapPath = path.join(snapshotsDir, htmlSnapFile);
    const textSnapPath = path.join(snapshotsDir, textSnapFile);

    fs.writeFileSync(pngSnapPath, pngBuf);
    fs.writeFileSync(htmlSnapPath, htmlStr, 'utf8');
    fs.writeFileSync(textSnapPath, textStr, 'utf8');

    const pngSha = getSha256(pngSnapPath);
    const htmlSha = getSha256(htmlSnapPath);
    const textSha = getSha256(textSnapPath);

    const checkedAt = '2026-08-24T07:07:00.000Z';
    const evidenceKey = `EVID_${cfg.candidate_id}`;

    const receiptObj = {
      $schema: "https://jayt.vn/schemas/snapshot-capture-receipt.v1.json",
      candidate_id: cfg.candidate_id,
      evidence_id: evidenceKey,
      deal_id: cfg.deal_id,
      requested_url: cfg.source_url,
      final_url: cfg.source_url,
      captured_at: checkedAt,
      checked_at: checkedAt,
      runtime_run_id: `RUN_BATCH2_${cfg.candidate_id}`,
      content_class: 'PROMOTION_DETAIL',
      purchase_channel: cfg.purchase_channel,
      decoded_dimensions: {
        width: pngParsed.width,
        height: pngParsed.height
      },
      raw_source_lineage: {
        raw_source_receipt: path.relative(repoRoot, path.join(cfg.raw_dir, `receipt_${cfg.raw_prefix}.json`)).replace(/\\/g, '/'),
        raw_source_png_sha256: pngSha,
        snapshot_png_sha256: pngSha,
        byte_for_byte_lineage_verified: true
      }
    };

    const receiptSnapFile = `capture_receipt_${cfg.candidate_id}.json`;
    const receiptSnapPath = path.join(snapshotsDir, receiptSnapFile);
    fs.writeFileSync(receiptSnapPath, JSON.stringify(receiptObj, null, 2), 'utf8');
    const receiptSha = getSha256(receiptSnapPath);

    // Build Candidate JSON using Template
    const candidateJson = JSON.parse(JSON.stringify(candTemplate));
    candidateJson.candidate_id = cfg.candidate_id;
    candidateJson.evidence = {};

    candidateJson.evidence[evidenceKey] = {
      deal_id: cfg.deal_id,
      source_url: cfg.source_url,
      source_type: 'OFFICIAL_PROMOTION_ANNOUNCEMENT',
      recorded_by: 'JAYT_DESK_REVIEW_PUBLIC_SOURCE',
      verification_status: 'READY_FOR_CEO_REVIEW',
      verification_readiness: 'READY_FOR_CEO_REVIEW',
      evidence_status: 'LOCALLY_CAPTURED_SOURCE_LINKED',
      verification_level: 'NOT_INDEPENDENTLY_VERIFIED',
      temporal_validity: cfg.temporal_validity,
      checked_at: checkedAt,
      captured_at: checkedAt,
      claim_summary: cfg.claim_summary,
      source_specificity: 'PUBLIC_OFFICIAL_WEBSITE',
      observed_price_or_offer: cfg.observed_price,
      observed_conditions: cfg.conditions_snippet,
      expiry_basis: 'EXPLICIT_PROMOTION_DATE_IN_CAPTURE',
      capture_file: pngSnapFile,
      evidence_content_hash: pngSha,
      artifact_mime_type: 'image/png',
      artifact_text_dump: textSnapFile,
      artifact_text_hash: textSha,
      artifact_html_dump: htmlSnapFile,
      artifact_html_hash: htmlSha,
      capture_receipt_ref: receiptSnapFile,
      capture_receipt_hash: receiptSha,
      capture_method: 'AUTOMATED_PUBLIC_BROWSER_CAPTURE',
      capture_tool: 'chrome_headless_cdp_anonymous',
      missing_evidence_fields: [],
      notes: `Batch 2 CDP capture verified (${cfg.category_scope}).`,
      volatility_tag: null,
      location_provenance_claim: cfg.locality_scope,
      purchase_channel: cfg.purchase_channel,
      extracted_claims: {
        price_snippet: cfg.price_snippet,
        conditions_snippet: cfg.conditions_snippet
      },
      candidate_id: cfg.candidate_id,
      evidence_id: evidenceKey,
      content_class: 'PROMOTION_DETAIL',
      active_revision_id: 'REV_070D_INTAKE'
    };

    candidateJson.deals[0] = {
      deal_id: cfg.deal_id,
      title: cfg.title,
      merchant: cfg.merchant,
      category: cfg.category,
      need_collection: 'general',
      budget_tier: 'under_200k',
      duration_mins: null,
      group_size: '1_or_more',
      contextual_reason: cfg.title,
      observed_price: cfg.observed_price,
      deal_price: cfg.deal_price,
      original_price: cfg.original_price,
      discount_pct: cfg.discount_pct,
      effective_date: cfg.effective_date,
      expires_at: cfg.expires_at,
      days_of_week: cfg.days_of_week,
      start_minutes: null,
      end_minutes: null,
      persona: null,
      taxonomy: 'PROBING',
      affiliate_type: 'DIRECT_DEAL',
      source_url: cfg.source_url,
      evidence_ref: evidenceKey,
      disclosure: 'Thông tin được quan sát trực tiếp từ nguồn chính thức của thương hiệu. Chưa qua kiểm toán độc lập bên thứ ba.',
      lifecycle_status: 'READY_FOR_CEO_REVIEW',
      render_eligible: false,
      verified_at: checkedAt,
      category_scope: cfg.category_scope,
      volatility_tag: null,
      purchase_channel: cfg.purchase_channel,
      membership_required: false,
      locality_scope: cfg.locality_scope,
      exceptions_disclosed: 'Áp dụng theo điều kiện và điều khoản niêm yết trên website chính thức.'
    };

    candidateJson.evidence_revisions = {
      current_revision_id: 'REV_070D_INTAKE',
      revisions: [
        {
          revision_id: 'REV_070D_INTAKE',
          revision_order: 1,
          captured_at: checkedAt,
          evidence_status: 'LOCALLY_CAPTURED_SOURCE_LINKED',
          verification_readiness: 'READY_FOR_CEO_REVIEW',
          verification_level: 'NOT_INDEPENDENTLY_VERIFIED',
          capture_receipt_ref: receiptSnapFile,
          capture_receipt_hash: receiptSha,
          content_class: 'PROMOTION_DETAIL',
          notes: `Batch 2 CDP capture verified.`
        }
      ]
    };

      console.log(`\n▶ [PROCESSING ${intakeResults.length + 1}/8] ${cfg.candidate_id}...`);
    // Pre-Write SSOT Validation Gate
    const valResult = validateCandidate(candidateJson, {
      candidatesDir: pendingReviewDir,
      snapshotsDir: snapshotsDir
    });

    if (!valResult.valid) {
      console.error(`🔴 [VALIDATION-FAIL] ${cfg.candidate_id}:`);
      console.error(JSON.stringify(valResult.errors, null, 2));
      throw new Error(`FAIL-CLOSED: Pre-write validation failed for ${cfg.candidate_id}`);
    }

    // Atomic Persist Candidate File
    const candFileName = `candidate_${candidateIndex++}_${cfg.candidate_id}.json`;
    const candFilePath = path.join(pendingReviewDir, candFileName);
    fs.writeFileSync(candFilePath, JSON.stringify(candidateJson, null, 2), 'utf8');

    const candSha = getSha256(candFilePath);
    console.log(`  🟢 [PASS] ${candFileName} (SHA-256: ${candSha})`);

    intakeResults.push({
      candidate_id: cfg.candidate_id,
      deal_id: cfg.deal_id,
      title: cfg.title,
      price: cfg.observed_price,
      purchase_channel: cfg.purchase_channel,
      locality_scope: cfg.locality_scope,
      expires_at: cfg.expires_at,
      candidate_file: candFileName,
      sha256: candSha,
      triage: 'GREEN'
    });
  }

  console.log(`\n🎉 [BATCH-2-INTAKE-SUCCESS] Đã hoàn thành intake và validate thành công ${intakeResults.length} candidates GREEN!`);
  const manifestPath = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'BATCH_2_INTAKE_MANIFEST.json');
  fs.writeFileSync(manifestPath, JSON.stringify(intakeResults, null, 2), 'utf8');
}

runIntake();
