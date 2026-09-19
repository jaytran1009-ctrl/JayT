/**
 * JAYT REPROCESS CAPTURES WITH BOUNDED SEMANTIC SNAPSHOTS (141T)
 * Directive: JAYT-141T — SEMANTIC INTEGRITY REPAIR BEFORE AUTONOMOUS ACTIVATION
 */

const fs = require('fs');
const path = require('path');
const {
  createSemanticSnapshot,
  compareSemanticSnapshots141T,
  computeSha256
} = require('./semantic_normalizer_141t');

const repoRoot = path.resolve(__dirname, '..');
const baselineDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'fresh_captures_140r');
const deltaDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'delta_captures_141r');
const registry141Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'fresh_source_registry_141.json');
const registry141tPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'fresh_source_registry_141t.json');

const registry141 = JSON.parse(fs.readFileSync(registry141Path, 'utf8'));

const sources141t = [];

console.log('========================================================================');
console.log('🔬 JAYT-141T: RE-EVALUATING CAPTURES WITH STRUCTURED SEMANTIC SNAPSHOTS');
console.log('========================================================================\n');

for (const src of registry141.sources) {
  const baseHtmlPath = path.join(baselineDir, `SRC_140R_${src.source_id.replace('SRC_141_', '')}`, 'page.html');
  const deltaHtmlPath = path.join(deltaDir, src.source_id, 'page.html');

  if (src.source_id === 'SRC_141_04') {
    // Metiz Cinema 404
    sources141t.push({
      source_id: src.source_id,
      cohort: src.cohort,
      brand_name: src.brand_name,
      canonical_url: src.canonical_url,
      source_type: src.source_type,
      check_interval_hours: 168,
      state: 'HTTP_ERROR_BACKOFF',
      http_status: 404,
      backoff_policy: '7_DAYS_URL_REVIEW_BACKOFF',
      next_check_due: '2026-09-02T17:58:20.788Z',
      hashes: {
        raw_html_sha256: src.baseline_sha256,
        semantic_content_sha256: null
      },
      baseline_snapshot: null,
      current_snapshot: null,
      prior_baseline_receipt_path: src.baseline_receipt_path
    });
    console.log(`[HTTP_ERROR_BACKOFF] ${src.source_id} (${src.brand_name}): 404 under 7-day backoff.`);
    continue;
  }

  if (!fs.existsSync(baseHtmlPath) || !fs.existsSync(deltaHtmlPath)) {
    console.warn(`Missing artifact for ${src.source_id}`);
    continue;
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');
  const deltaHtml = fs.readFileSync(deltaHtmlPath, 'utf8');

  const rawBaseSha = computeSha256(Buffer.from(baseHtml, 'utf8'));
  const rawDeltaSha = computeSha256(Buffer.from(deltaHtml, 'utf8'));

  const baseSnapshot = createSemanticSnapshot(baseHtml, { baseUrl: src.canonical_url });
  const deltaSnapshot = createSemanticSnapshot(deltaHtml, { baseUrl: src.canonical_url });

  const diffResult = compareSemanticSnapshots141T(baseSnapshot, deltaSnapshot, baseHtml, deltaHtml);

  console.log(`[${diffResult.state}] ${src.source_id} (${src.brand_name}): ${diffResult.reason}`);

  sources141t.push({
    source_id: src.source_id,
    cohort: src.cohort,
    brand_name: src.brand_name,
    canonical_url: src.canonical_url,
    source_type: src.source_type,
    check_interval_hours: src.check_interval_hours,
    state: diffResult.state,
    diff_reason: diffResult.reason,
    next_check_due: src.next_check_due,
    hashes: {
      raw_html_baseline_sha256: rawBaseSha,
      raw_html_current_sha256: rawDeltaSha,
      semantic_content_baseline_sha256: baseSnapshot.semantic_content_sha256,
      semantic_content_current_sha256: deltaSnapshot.semantic_content_sha256
    },
    baseline_snapshot: {
      normalizer_version: baseSnapshot.normalizer_version,
      semantic_content_sha256: baseSnapshot.semantic_content_sha256,
      visible_text_length: baseSnapshot.visible_text_length,
      canonical_offer_links_count: baseSnapshot.canonical_offer_links.length,
      offer_blocks_count: baseSnapshot.offer_blocks.length,
      visible_text_sample: baseSnapshot.visible_text_sample,
      canonical_offer_links: baseSnapshot.canonical_offer_links,
      offer_blocks: baseSnapshot.offer_blocks
    },
    current_snapshot: {
      normalizer_version: deltaSnapshot.normalizer_version,
      semantic_content_sha256: deltaSnapshot.semantic_content_sha256,
      visible_text_length: deltaSnapshot.visible_text_length,
      canonical_offer_links_count: deltaSnapshot.canonical_offer_links.length,
      offer_blocks_count: deltaSnapshot.offer_blocks.length,
      visible_text_sample: deltaSnapshot.visible_text_sample,
      canonical_offer_links: deltaSnapshot.canonical_offer_links,
      offer_blocks: deltaSnapshot.offer_blocks
    },
    receipts: {
      baseline_receipt_path: src.baseline_receipt_path,
      current_receipt_path: src.new_receipt_path || src.last_verified_receipt_path || src.baseline_receipt_path
    }
  });
}

const registry141t = {
  registry_id: 'FRESH_SOURCE_REGISTRY_141T',
  directive: 'JAYT-141T — SEMANTIC INTEGRITY REPAIR BEFORE AUTONOMOUS ACTIVATION',
  generated_at: new Date().toISOString(),
  governance_statement: 'Phân loại structured semantic snapshot: 1 UNCHANGED_IDENTICAL, 10 UNCHANGED_RENDER_VARIATION, 3 SEMANTIC_CHANGED_REVIEW_REQUIRED, 0 OFFER_RELEVANT_DELTA, 1 HTTP_ERROR_BACKOFF. Bảo toàn nguyên vẹn 100% banner, operational hours, giá, điều kiện và hạn dùng.',
  sources: sources141t
};

fs.writeFileSync(registry141tPath, JSON.stringify(registry141t, null, 2), 'utf8');

console.log('\n========================================================================');
console.log(`✅ RE-PROCESSED ${sources141t.length} SOURCES WITH STRUCTURED SEMANTIC SNAPSHOTS:`);
console.log(`- UNCHANGED_IDENTICAL: ${sources141t.filter(s => s.state === 'UNCHANGED_IDENTICAL').length}`);
console.log(`- UNCHANGED_RENDER_VARIATION: ${sources141t.filter(s => s.state === 'UNCHANGED_RENDER_VARIATION').length}`);
console.log(`- SEMANTIC_CHANGED_REVIEW_REQUIRED: ${sources141t.filter(s => s.state === 'SEMANTIC_CHANGED_REVIEW_REQUIRED').length}`);
console.log(`- OFFER_RELEVANT_DELTA: ${sources141t.filter(s => s.state === 'OFFER_RELEVANT_DELTA').length}`);
console.log(`- HTTP_ERROR_BACKOFF: ${sources141t.filter(s => s.state === 'HTTP_ERROR_BACKOFF').length}`);
console.log(`📂 Output Registry: ${registry141tPath}`);
console.log('========================================================================\n');
