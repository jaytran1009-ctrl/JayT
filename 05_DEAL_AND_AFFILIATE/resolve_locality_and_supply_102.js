const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function sha256(strOrBuf) {
  return crypto.createHash('sha256').update(strOrBuf).digest('hex');
}

const repoRoot = path.resolve(__dirname, '..');
const batch101Dir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_101', 'captures_101');
const batch102Dir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_102', 'captures_102');

function parseLocalityFromTarget(targetDir, targetId) {
  const receiptPath = path.join(targetDir, 'capture_receipt.json');
  if (!fs.existsSync(receiptPath)) {
    const failedReceiptPath = path.join(targetDir, 'capture_failed_receipt.json');
    if (fs.existsSync(failedReceiptPath)) {
      const fr = JSON.parse(fs.readFileSync(failedReceiptPath, 'utf8'));
      return {
        target_id: targetId,
        status: 'FAILED_CAPTURE',
        error: fr.error_message || 'Capture failed',
        classification: 'UNRESOLVED_FAILED_CAPTURE'
      };
    }
    return {
      target_id: targetId,
      status: 'MISSING_RECEIPT',
      classification: 'UNRESOLVED_FAILED_CAPTURE'
    };
  }

  const receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8'));
  const textPath = path.join(targetDir, 'page.txt');
  const text = fs.readFileSync(textPath, 'utf8');

  // Search for Da Nang street patterns in authentic raw text
  const lines = text.split('\n');
  const extractedAddresses = [];

  const dnRegex = /(đà nẵng|da nang)/i;
  const streetKeywords = /(đường|phố|số|tầng|tttm|quận|phường|hải châu|thanh khê|sơn trà|ngũ hành sơn|liên chiểu|cẩm lệ|hòa khánh|điện biên phủ|bạch đằng|nguyễn văn linh|hùng vương|ngô quyền|lê duẩn|2 tháng 9)/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (dnRegex.test(line) && streetKeywords.test(line) && line.length >= 15 && line.length <= 300) {
      const lineOffset = text.indexOf(lines[i]);
      extractedAddresses.push({
        line_number: i + 1,
        char_offset: lineOffset,
        snippet: line,
        snippet_sha256: sha256(line)
      });
    }
  }

  // Deduplicate snippets
  const uniqueAddresses = [];
  const seenSnippets = new Set();
  for (const addr of extractedAddresses) {
    if (!seenSnippets.has(addr.snippet)) {
      seenSnippets.add(addr.snippet);
      uniqueAddresses.push(addr);
    }
  }

  let classification = 'OFFICIAL_SOURCE_NO_LOCALITY';
  if (uniqueAddresses.length > 0) {
    classification = 'VERIFIED_LOCATION';
  }

  return {
    target_id: targetId,
    venue_name: receipt.venue_name,
    source_url: receipt.source_url,
    sector: receipt.sector,
    http_status: receipt.http_response.status,
    captured_at: receipt.captured_at,
    artifacts: receipt.artifacts,
    extracted_addresses: uniqueAddresses,
    locality_count: uniqueAddresses.length,
    classification: classification,
    promotion_status: 'PROMOTION_UNPROVEN',
    promotion_disclaimer: 'Địa điểm chính thức — ưu đãi online chưa đủ dữ kiện; kiểm tra trực tiếp tại quán.'
  };
}

function runResolution() {
  console.log('🔍 [RESOLVER-102] Khởi chạy trích xuất Locality & Phân loại Cung 102...\n');

  const resolutionReport = {
    report_id: 'RESOLUTION_REPORT_102_LOCALITY_AND_SUPPLY',
    generated_at: new Date().toISOString(),
    inputs: [
      '05_DEAL_AND_AFFILIATE/batch_capture_101',
      '05_DEAL_AND_AFFILIATE/batch_capture_102'
    ],
    summary_metrics: {
      total_targets_analyzed: 0,
      authenticated_sources: 0,
      failed_sources: 0,
      verified_locations_cobalt: 0,
      official_sources_no_locality_amber: 0,
      proven_promotions_count: 0,
      unproven_promotions_count: 0
    },
    cobalt_candidates_audited: [],
    amber_sources_audited: [],
    failed_sources_audited: []
  };

  const allTargetDirs = [];

  // Batch 101
  if (fs.existsSync(batch101Dir)) {
    for (const t of fs.readdirSync(batch101Dir)) {
      allTargetDirs.push({ dir: path.join(batch101Dir, t), id: t });
    }
  }

  // Batch 102
  if (fs.existsSync(batch102Dir)) {
    for (const t of fs.readdirSync(batch102Dir)) {
      allTargetDirs.push({ dir: path.join(batch102Dir, t), id: t });
    }
  }

  for (const item of allTargetDirs) {
    resolutionReport.summary_metrics.total_targets_analyzed++;
    const res = parseLocalityFromTarget(item.dir, item.id);

    if (res.status === 'FAILED_CAPTURE' || res.status === 'MISSING_RECEIPT') {
      resolutionReport.summary_metrics.failed_sources++;
      resolutionReport.failed_sources_audited.push(res);
    } else {
      resolutionReport.summary_metrics.authenticated_sources++;
      if (res.classification === 'VERIFIED_LOCATION') {
        resolutionReport.summary_metrics.verified_locations_cobalt++;
        resolutionReport.cobalt_candidates_audited.push(res);
      } else {
        resolutionReport.summary_metrics.official_sources_no_locality_amber++;
        resolutionReport.amber_sources_audited.push(res);
      }
      resolutionReport.summary_metrics.unproven_promotions_count++;
    }
  }

  const outPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'locality_and_supply_resolution_102.json');
  fs.writeFileSync(outPath, JSON.stringify(resolutionReport, null, 2), 'utf8');

  console.log('======================================================');
  console.log(`📊 Tổng mục tiêu phân tích: ${resolutionReport.summary_metrics.total_targets_analyzed}`);
  console.log(`✅ Nguồn Authenticated: ${resolutionReport.summary_metrics.authenticated_sources}`);
  console.log(`❌ Nguồn Thất bại (Fail-Closed): ${resolutionReport.summary_metrics.failed_sources}`);
  console.log(`💎 Địa điểm đủ điều kiện Cobalt (VERIFIED_LOCATION): ${resolutionReport.summary_metrics.verified_locations_cobalt}`);
  console.log(`🔶 Nguồn chính thức chưa có Locality chi tiết (OFFICIAL_SOURCE_NO_LOCALITY): ${resolutionReport.summary_metrics.official_sources_no_locality_amber}`);
  console.log(`🏷️ Ưu đãi đủ bằng chứng: ${resolutionReport.summary_metrics.proven_promotions_count}`);
  console.log(`⚠️ Ưu đãi chưa đủ dữ kiện (PROMOTION_UNPROVEN): ${resolutionReport.summary_metrics.unproven_promotions_count}`);
  console.log(`📄 Báo cáo: ${outPath}\n`);

  return resolutionReport;
}

if (require.main === module) {
  runResolution();
}

module.exports = { runResolution };
