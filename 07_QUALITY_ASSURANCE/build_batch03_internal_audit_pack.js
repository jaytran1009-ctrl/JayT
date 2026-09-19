/*
 * JAYT-273 internal-only audit-pack builder.
 * It never changes the source ledger, public registry, feed, storefront, or deployment files.
 */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const trustRoot = path.join(root, '06_TRUST_AND_EVIDENCE');
const reportPath = path.join(trustRoot, 'JAYT_BATCH_03_COUNCIL_JAYT256_CLASSIFICATION_REPORT.json');
const vaultRoot = path.join(trustRoot, 'batch_03_intake_vault');
const dossierRoot = path.join(vaultRoot, 'audit_dossiers');
const queuePath = path.join(trustRoot, 'JAYT_BATCH_03_REENTRY_QUEUE.json');
const harnessPath = path.join(__dirname, 'batch03_internal_render_harness.html');

const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const writeJson = (filePath, value) => fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

function extractedText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function sourceSpan(bodyText, officialName) {
  const normalizedName = (officialName || '').toLowerCase();
  const index = normalizedName ? bodyText.toLowerCase().indexOf(normalizedName) : -1;
  const start = index >= 0 ? Math.max(0, index - 120) : 0;
  return bodyText.slice(start, start + 480);
}

function titleFromHtml(html) {
  const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  return title ? extractedText(title[1]).slice(0, 240) : null;
}

function main() {
  const report = readJson(reportPath);
  if (report.canonical_invariants.deals_feed_content !== '[]' || !report.canonical_invariants.staging_render_blocked) {
    throw new Error('JAYT-273 refuses to build: public-surface invariant is not intact.');
  }

  const evidenceItems = report.items.filter((item) => item.admissionState === 'EVIDENCE_COMPLETE_INTERNAL_HELD');
  const heldItems = report.items.filter((item) => item.admissionState === 'HELD_NEW_COHORT_REQUIRED');
  if (evidenceItems.length !== 8 || heldItems.length !== 20) {
    throw new Error(`Unexpected council matrix: ${evidenceItems.length} held-evidence and ${heldItems.length} re-entry items.`);
  }

  fs.mkdirSync(dossierRoot, { recursive: true });
  const summaries = [];
  for (const item of evidenceItems) {
    const evidence = item.evidence_captured;
    const bodyPath = path.join(vaultRoot, evidence.body_file);
    const body = fs.readFileSync(bodyPath);
    const actualHash = sha256(body);
    if (actualHash !== evidence.body_sha256) {
      throw new Error(`${item.target_id}: raw body SHA-256 mismatch.`);
    }
    const html = body.toString('utf8');
    const text = extractedText(html);
    const dossier = {
      dossier_id: `JAYT-273-${item.target_id}-AUDIT-DOSSIER`,
      governing_order: 'JAYT-273 — DOSSIER AUDIT SUBMISSION & STAGING RENDER HARNESS PREPARATION',
      scope: 'INTERNAL_CEO_AUDIT_ONLY',
      target_id: item.target_id,
      cluster: item.cluster,
      official_name: item.official_name || null,
      proposed_tier: item.contentTier,
      admission_state: 'EVIDENCE_COMPLETE_INTERNAL_HELD',
      public_approved: false,
      candidate_status: 'NOT_A_CANDIDATE',
      render_permitted: false,
      source: {
        authorized_source_url: item.authorized_source_url,
        http_status: evidence.http_status,
        captured_at_utc: evidence.captured_at_utc,
        raw_body_file: evidence.body_file,
        raw_body_sha256: actualHash,
        raw_body_bytes: body.byteLength,
        html_title: titleFromHtml(html),
        supporting_text_span: sourceSpan(text, item.official_name),
        supporting_text_note: 'Literal text extracted from the captured body for review; it is not a JayT claim or a public-content authorization.'
      },
      claim_constraints: {
        no_pricing_claim: true,
        no_voucher_or_discount_claim: true,
        no_affiliate_or_tracking_link: true,
        no_buy_or_conversion_cta: true,
        no_public_render_without_named_ceo_public_approval: true
      },
      required_ceo_decision: 'Named item-level PUBLIC_APPROVED record with a separate staging release scope, or retain as internal held evidence.'
    };
    const dossierPath = path.join(dossierRoot, `${item.target_id}_AUDIT_DOSSIER.json`);
    writeJson(dossierPath, dossier);
    summaries.push({
      target_id: dossier.target_id,
      official_name: dossier.official_name,
      proposed_tier: dossier.proposed_tier,
      dossier_file: path.relative(root, dossierPath).replace(/\\/g, '/'),
      raw_body_sha256: actualHash,
      public_approved: false
    });
  }

  const reentryQueue = {
    queue_id: 'JAYT-273-BATCH03-REENTRY-QUEUE',
    scope: 'INTERNAL_REENTRY_PLANNING_ONLY',
    generated_from: 'COUNCIL_BATCH03_JAYT256_CLASSIFICATION_REPORT',
    auto_retry_permitted: false,
    public_approved_count: 0,
    items: heldItems.map((item) => ({
      target_id: item.target_id,
      cluster: item.cluster,
      authorized_source_url: item.authorized_source_url,
      tier: 'T4_RADAR',
      state: 'HELD_NEW_COHORT_REQUIRED',
      prior_failure: item.quarantine_info.reason,
      reentry_condition: 'A separate append-only CEO intake authorization must define a new scope, timebox, and capture controls.',
      render_permitted: false,
      public_approved: false
    }))
  };
  writeJson(queuePath, reentryQueue);

  const rows = summaries.map((item) => `<tr><td>${escapeHtml(item.target_id)}</td><td>${escapeHtml(item.official_name || 'Unspecified')}</td><td>${escapeHtml(item.proposed_tier)}</td><td><code>${escapeHtml(item.raw_body_sha256)}</code></td><td>HELD — NOT PUBLIC</td></tr>`).join('');
  const harness = `<!doctype html>
<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>JayT Batch 03 — Internal Review Harness</title>
<style>body{font:16px/1.5 system-ui,sans-serif;margin:2rem;color:#172033;background:#f7f8fa}main{max-width:1100px;margin:auto;background:white;padding:2rem;border-radius:12px}h1{margin-top:0}.notice{padding:1rem;background:#fff4d6;border-left:4px solid #a35b00}table{width:100%;border-collapse:collapse;margin-top:1.25rem}th,td{padding:.75rem;border-bottom:1px solid #dce1e7;text-align:left;vertical-align:top}code{font-size:.75rem;overflow-wrap:anywhere}.lock{font-weight:700;color:#8a1c1c}</style></head>
<body><main><h1>Batch 03 Internal Review Harness</h1><p class="notice">This local file is not linked from the JayT storefront and does not perform network requests. It is a review template only.</p><p class="lock">PUBLIC_APPROVED: 0/28 · Feed mutation: prohibited · Render to public DOM: prohibited · Affiliate: locked · Production: locked.</p>
<table><thead><tr><th>ID</th><th>Tên hồ sơ</th><th>Tier đề xuất</th><th>SHA-256 raw body</th><th>Trạng thái</th></tr></thead><tbody>${rows}</tbody></table>
<p>Any public rendering requires a named CEO item-level approval and a separate staging release scope.</p></main></body></html>`;
  fs.writeFileSync(harnessPath, harness, 'utf8');

  process.stdout.write(JSON.stringify({
    pass: true,
    dossiers_created: summaries.length,
    reentry_queue_items: reentryQueue.items.length,
    public_approved_count: 0,
    harness: path.relative(root, harnessPath).replace(/\\/g, '/')
  }, null, 2));
}

main();
