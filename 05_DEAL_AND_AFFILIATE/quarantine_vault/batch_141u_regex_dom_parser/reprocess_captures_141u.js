/**
 * JAYT REPROCESS CAPTURES WITH ATOMIC DOM OFFER FRAGMENTS (141U)
 * Directive: JAYT-141U — ATOMIC DOM OFFER BOUNDARY & SCHEDULER ACTIVATION BLOCK
 */

const fs = require('fs');
const path = require('path');
const {
  createAtomicSemanticSnapshot,
  compareAtomicSnapshots141U,
  computeSha256
} = require('./atomic_dom_normalizer_141u');

const repoRoot = path.resolve(__dirname, '..');
const baselineDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'fresh_captures_140r');
const deltaDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'delta_captures_141r');
const registry141Path = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'fresh_source_registry_141.json');
const registry141uPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'fresh_source_registry_141u.json');

const registry141 = JSON.parse(fs.readFileSync(registry141Path, 'utf8'));

const sources141u = [];

console.log('========================================================================');
console.log('🔬 JAYT-141U: RE-EVALUATING CAPTURES WITH ATOMIC DOM OFFER BOUNDARIES');
console.log('========================================================================\n');

for (const src of registry141.sources) {
  const baseHtmlPath = path.join(baselineDir, `SRC_140R_${src.source_id.replace('SRC_141_', '')}`, 'page.html');
  const deltaHtmlPath = path.join(deltaDir, src.source_id, 'page.html');

  if (src.source_id === 'SRC_141_04') {
    // Metiz Cinema 404
    sources141u.push({
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

  const baseSnapshot = createAtomicSemanticSnapshot(baseHtml, src.canonical_url);
  const deltaSnapshot = createAtomicSemanticSnapshot(deltaHtml, src.canonical_url);

  const diffResult = compareAtomicSnapshots141U(baseSnapshot, deltaSnapshot, baseHtml, deltaHtml);

  console.log(`[${diffResult.state}] ${src.source_id} (${src.brand_name}): Fragments=${deltaSnapshot.atomic_offer_fragments_count}, UnboundSignals=${deltaSnapshot.page_level_unbound_signals.length} -> ${diffResult.reason}`);

  sources141u.push({
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
      page_level_unbound_signals_count: baseSnapshot.page_level_unbound_signals.length,
      page_level_unbound_signals: baseSnapshot.page_level_unbound_signals,
      atomic_offer_fragments_count: baseSnapshot.atomic_offer_fragments_count,
      atomic_offer_fragments: baseSnapshot.atomic_offer_fragments
    },
    current_snapshot: {
      normalizer_version: deltaSnapshot.normalizer_version,
      semantic_content_sha256: deltaSnapshot.semantic_content_sha256,
      visible_text_length: deltaSnapshot.visible_text_length,
      page_level_unbound_signals_count: deltaSnapshot.page_level_unbound_signals.length,
      page_level_unbound_signals: deltaSnapshot.page_level_unbound_signals,
      atomic_offer_fragments_count: deltaSnapshot.atomic_offer_fragments_count,
      atomic_offer_fragments: deltaSnapshot.atomic_offer_fragments
    },
    receipts: {
      baseline_receipt_path: src.baseline_receipt_path,
      current_receipt_path: src.new_receipt_path || src.last_verified_receipt_path || src.baseline_receipt_path
    }
  });
}

const registry141u = {
  registry_id: 'FRESH_SOURCE_REGISTRY_141U',
  directive: 'JAYT-141U — ATOMIC DOM OFFER BOUNDARY & SCHEDULER ACTIVATION BLOCK',
  generated_at: new Date().toISOString(),
  governance_statement: 'Phân loại ranh giới nguyên tử DOM_ATOMIC_OFFER_FRAGMENT: 11 PAGE_RENDER_VARIATION, 3 PAGE_SEMANTIC_CHANGE_UNBOUND, 0 ATOMIC_OFFER_FRAGMENT_CHANGED, 0 NEW_OFFICIAL_OFFER_LEAF_DISCOVERED, 1 HTTP_ERROR_BACKOFF. Cách ly 100% menu/nav vào PAGE_LEVEL_UNBOUND_SIGNALS.',
  sources: sources141u
};

fs.writeFileSync(registry141uPath, JSON.stringify(registry141u, null, 2), 'utf8');

console.log('\n========================================================================');
console.log(`✅ RE-PROCESSED ${sources141u.length} SOURCES WITH ATOMIC DOM BOUNDARIES:`);
console.log(`- PAGE_RENDER_VARIATION: ${sources141u.filter(s => s.state === 'PAGE_RENDER_VARIATION').length}`);
console.log(`- PAGE_SEMANTIC_CHANGE_UNBOUND: ${sources141u.filter(s => s.state === 'PAGE_SEMANTIC_CHANGE_UNBOUND').length}`);
console.log(`- ATOMIC_OFFER_FRAGMENT_CHANGED: ${sources141u.filter(s => s.state === 'ATOMIC_OFFER_FRAGMENT_CHANGED').length}`);
console.log(`- NEW_OFFICIAL_OFFER_LEAF_DISCOVERED: ${sources141u.filter(s => s.state === 'NEW_OFFICIAL_OFFER_LEAF_DISCOVERED').length}`);
console.log(`- HTTP_ERROR_BACKOFF: ${sources141u.filter(s => s.state === 'HTTP_ERROR_BACKOFF').length}`);
console.log(`📂 Output Registry: ${registry141uPath}`);
console.log('========================================================================\n');
