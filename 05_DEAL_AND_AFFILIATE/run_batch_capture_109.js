/**
 * JAYT BATCH CAPTURE RUNNER (109)
 * Directive: JAYT-109-OFFICIAL-OFFER-LEAF-EXTRACTION
 * Captures leaf promo pages and evaluates the 4 strict criteria:
 *  1. Nêu rõ ưu đãi cụ thể (Specific Offer)
 *  2. Nêu rõ điều kiện áp dụng (Terms & Conditions)
 *  3. Nêu rõ thời hạn / hạn dùng (Validity / Expiry)
 *  4. Nêu rõ phạm vi áp dụng (Scope / Đà Nẵng or Nationwide Applicability)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const repoRoot = path.resolve(__dirname, '..');
const candidatePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_109', 'extracted_candidate_leaves.json');
const outputBaseDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_109', 'captures_109');

fs.mkdirSync(outputBaseDir, { recursive: true });

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const candidateData = JSON.parse(fs.readFileSync(candidatePath, 'utf8'));
const leaves = candidateData.leaves;

console.log(`🌐 [BATCH-CAPTURE-109] Khởi chạy thu thập ${leaves.length} promo leaf pages...`);

function evaluateOfferCriteria(text, brand, leafUrl) {
  const lower = text.toLowerCase();

  // Criteria 1: Specific Offer
  const offerRegexes = [
    /(?:giảm|ưu đãi|tặng|combo|đồng giá|giá chỉ|chỉ từ|miễn phí|voucher|hoàn tiền|chiết khấu)\s+[\d\.,]+(?:k|đ|%|nghìn|đồng)?/i,
    /(?:combo|phần ăn|vé xem phim|bắp nước|thành viên|u22|học sinh|sinh viên|thứ 3|thứ 4|ngày hội|happy hour)/i
  ];
  const hasOffer = offerRegexes.some(r => r.test(text));

  // Criteria 2: Terms & Conditions
  const termsKeywords = ['điều kiện', 'áp dụng khi', 'lưu ý', 'thể lệ', 'quy định', 'không áp dụng chung', 'mỗi khách hàng', 'khi mua', 'chương trình'];
  const hasTerms = termsKeywords.some(kw => lower.includes(kw));

  // Criteria 3: Validity / Expiry
  const dateRegexes = [
    /(?:từ ngày|đến ngày|áp dụng từ|hạn dùng|hạn sử dụng|thời gian áp dụng|ngày \d{1,2}\/\d{1,2}|tháng \d{1,2}\/\d{4}|\d{4}|thứ [2-7]|chủ nhật|hằng tuần|hàng tuần|mỗi ngày)/i,
    /(?:202[4-6]|\d{1,2}[\/\.-]\d{1,2}[\/\.-]\d{2,4})/
  ];
  const hasValidity = dateRegexes.some(r => r.test(text));

  // Criteria 4: Scope & Locality (Đà Nẵng or Toàn quốc / Hệ thống)
  const isCinema = /cinema|cgv|galaxy|metiz|lotte|starlight/i.test(brand);
  const scopeKeywords = ['toàn quốc', 'toàn hệ thống', 'tất cả các rạp', 'tất cả rạp', 'tất cả chi nhánh', 'tất cả cửa hàng', 'áp dụng tại', 'đà nẵng', 'da nang', 'khu vực'];
  const hasScope = scopeKeywords.some(kw => lower.includes(kw));

  // Special cinema rule: Must prove applicability in Da Nang or Nationwide
  let daNangProven = false;
  if (isCinema) {
    daNangProven = lower.includes('đà nẵng') || lower.includes('da nang') || lower.includes('toàn quốc') || lower.includes('toàn hệ thống') || lower.includes('tất cả các rạp') || lower.includes('tất cả rạp');
  } else {
    daNangProven = hasScope || lower.includes('toàn quốc') || lower.includes('hệ thống') || lower.includes('đà nẵng');
  }

  // Extract candidate quote snippets
  let offerQuote = '';
  let termsQuote = '';
  let validityQuote = '';
  let scopeQuote = '';

  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 10);
  for (const line of lines) {
    if (!offerQuote && offerRegexes[0].test(line)) offerQuote = line.substring(0, 150);
    if (!termsQuote && termsKeywords.some(k => line.toLowerCase().includes(k))) termsQuote = line.substring(0, 150);
    if (!validityQuote && dateRegexes[0].test(line)) validityQuote = line.substring(0, 150);
    if (!scopeQuote && scopeKeywords.some(k => line.toLowerCase().includes(k))) scopeQuote = line.substring(0, 150);
  }

  const all4Passed = hasOffer && hasTerms && hasValidity && (isCinema ? daNangProven : hasScope);

  return {
    criteria_1_specific_offer: { passed: hasOffer, quote: offerQuote || null },
    criteria_2_terms: { passed: hasTerms, quote: termsQuote || null },
    criteria_3_validity: { passed: hasValidity, quote: validityQuote || null },
    criteria_4_scope_and_danang: { passed: daNangProven, quote: scopeQuote || null },
    all_4_criteria_met: all4Passed,
    recommended_status: all4Passed ? 'OFFER_CANDIDATE_FOR_CEO_REVIEW' : 'INCOMPLETE_SOURCE_WATCHLIST'
  };
}

async function captureAllLeaves() {
  let browser = null;
  const results = [];

  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    });

    for (let i = 0; i < leaves.length; i++) {
      const leaf = leaves[i];
      const leafDir = path.join(outputBaseDir, leaf.leaf_id);
      fs.mkdirSync(leafDir, { recursive: true });

      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      await page.setViewport({ width: 1280, height: 800 });

      let captured = false;
      let finalUrl = leaf.leaf_url;
      let pageText = '';
      let pageHtml = '';
      let errorMsg = null;
      const timestamp = new Date().toISOString();

      try {
        console.log(`[${i + 1}/${leaves.length}] Đang tải ${leaf.leaf_id}: ${leaf.leaf_url} ...`);
        const response = await page.goto(leaf.leaf_url, { waitUntil: 'domcontentloaded', timeout: 12000 });
        finalUrl = page.url();

        await new Promise(r => setTimeout(r, 1000));

        pageText = await page.evaluate(() => document.body ? document.body.innerText : '');
        pageHtml = await page.content();

        // Check if page was blocked by login or app download
        const lowerText = pageText.toLowerCase();
        const isAuthBlocked = lowerText.includes('đăng nhập để tiếp tục') || lowerText.includes('vui lòng đăng nhập') || lowerText.includes('tải ứng dụng để xem');

        if (isAuthBlocked) {
          throw new Error('BLOCKED_BY_APP_OR_AUTH');
        }

        if (pageText && pageText.trim().length > 30) {
          captured = true;
          // Save page text
          const textPath = path.join(leafDir, 'page.txt');
          fs.writeFileSync(textPath, pageText, 'utf8');

          // Save page html
          const htmlPath = path.join(leafDir, 'page.html');
          fs.writeFileSync(htmlPath, pageHtml, 'utf8');

          // Save screenshot
          const screenshotPath = path.join(leafDir, 'screenshot.png');
          await page.screenshot({ path: screenshotPath, fullPage: false });

          const textSha = sha256(Buffer.from(pageText, 'utf8'));
          const screenshotBuf = fs.readFileSync(screenshotPath);
          const screenshotSha = sha256(screenshotBuf);

          const evaluation = evaluateOfferCriteria(pageText, leaf.brand, finalUrl);

          const meta = {
            leaf_id: leaf.leaf_id,
            source_target_id: leaf.source_target_id,
            brand: leaf.brand,
            category: leaf.category,
            anchor_text: leaf.anchor_text,
            source_url: leaf.leaf_url,
            final_url: finalUrl,
            captured_at: timestamp,
            status: 'CAPTURED_SUCCESS',
            http_status: response ? response.status() : 200,
            text_bytes: Buffer.byteLength(pageText, 'utf8'),
            text_sha256: textSha,
            screenshot_bytes: screenshotBuf.length,
            screenshot_sha256: screenshotSha,
            evidence_path: `05_DEAL_AND_AFFILIATE/batch_capture_109/captures_109/${leaf.leaf_id}/page.txt`,
            evaluation,
            review_classification: evaluation.recommended_status,
            error: null
          };

          fs.writeFileSync(path.join(leafDir, 'metadata.json'), JSON.stringify(meta, null, 2), 'utf8');
          console.log(`  -> ✅ ${evaluation.recommended_status}: ${leaf.leaf_id} (${textSha.substring(0, 16)}...)`);
          results.push(meta);
        } else {
          throw new Error('Nội dung trang trống hoặc dưới ngưỡng ký tự tối thiểu');
        }
      } catch (err) {
        errorMsg = err.message;
        const isAuth = err.message === 'BLOCKED_BY_APP_OR_AUTH';
        console.warn(`  -> ⚠️ ${isAuth ? 'BLOCKED_BY_APP_OR_AUTH' : 'CAPTURE_FAILED'}: ${leaf.leaf_id} (${err.message})`);
        const meta = {
          leaf_id: leaf.leaf_id,
          source_target_id: leaf.source_target_id,
          brand: leaf.brand,
          category: leaf.category,
          anchor_text: leaf.anchor_text,
          source_url: leaf.leaf_url,
          final_url: finalUrl,
          captured_at: timestamp,
          status: isAuth ? 'BLOCKED_BY_APP_OR_AUTH' : 'CAPTURE_FAILED',
          evidence_path: null,
          evaluation: null,
          review_classification: isAuth ? 'BLOCKED_BY_APP_OR_AUTH' : 'INCOMPLETE_SOURCE_WATCHLIST',
          error: errorMsg
        };
        fs.writeFileSync(path.join(leafDir, 'metadata.json'), JSON.stringify(meta, null, 2), 'utf8');
        results.push(meta);
      } finally {
        await page.close();
      }
    }
  } finally {
    if (browser) await browser.close();
  }

  // Generate Manifest 109
  const completeReviewCandidates = results.filter(r => r.review_classification === 'OFFER_CANDIDATE_FOR_CEO_REVIEW');
  const incompleteWatchlist = results.filter(r => r.review_classification === 'INCOMPLETE_SOURCE_WATCHLIST');
  const blockedAppAuth = results.filter(r => r.review_classification === 'BLOCKED_BY_APP_OR_AUTH');

  const manifest109 = {
    manifest_id: 'OFFICIAL_OFFER_LEAF_MANIFEST_109',
    work_order: 'JAYT-109-OFFICIAL-OFFER-LEAF-EXTRACTION',
    generated_at: new Date().toISOString(),
    governance_statement: 'Toàn bộ các leaf page được trích xuất từ 26 capture nguồn 108R. Chỉ phân loại OFFER_CANDIDATE_FOR_CEO_REVIEW khi thỏa mãn 4 tiêu chí cụ thể (Ưu đãi, Điều kiện, Hạn dùng, Phạm vi Đà Nẵng / Toàn quốc). Các mục thiếu điều kiện được giữ INCOMPLETE_SOURCE_WATCHLIST. Tuyệt đối không tự động phát hành deal hay cấp quyền production.',
    summary_metrics: {
      total_leaves_crawled: results.length,
      total_offer_candidates_for_ceo_review: completeReviewCandidates.length,
      total_incomplete_source_watchlist: incompleteWatchlist.length,
      total_blocked_by_app_or_auth: blockedAppAuth.length
    },
    offer_candidates_for_ceo_review: completeReviewCandidates,
    incomplete_source_watchlist: incompleteWatchlist,
    blocked_by_app_or_auth: blockedAppAuth
  };

  const manifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'official_offer_leaf_manifest_109.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest109, null, 2), 'utf8');

  console.log(`\n======================================================`);
  console.log(`✅ Hoàn tất Batch Capture 109! Đã ghi: ${manifestPath}`);
  console.log(`  - Offer Candidates for Review: ${manifest109.summary_metrics.total_offer_candidates_for_ceo_review}`);
  console.log(`  - Incomplete Watchlist: ${manifest109.summary_metrics.total_incomplete_source_watchlist}`);
  console.log(`  - Blocked by App/Auth: ${manifest109.summary_metrics.total_blocked_by_app_or_auth}`);
}

captureAllLeaves().catch(err => {
  console.error('Fatal batch capture error 109:', err);
  process.exit(1);
});
