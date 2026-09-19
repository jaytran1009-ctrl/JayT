'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const SCOPE_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'JAYT_335_BATCH_15_P2_TARGETED_INGRESS_SCOPE.json');
const VAULT = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'batch_15_p2_vault');
const CATALOG_PATHS = [
  path.join(ROOT, 'staging_workspace_j328', 'approved_commercial_cards.json'),
  path.join(ROOT, 'staging_workspace_j328', 'JAYT_333_COMMERCIAL_PILOT_CATALOG.json')
];
const RECEIPT_PATH = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'JAYT_335_BATCH_15_P2_INGRESS_RECEIPT.json');
const SENSITIVE_HEADER = /cookie|authorization|token|secret|set-cookie/i;

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function safeName(value) {
  return value.replace(/[^A-Z0-9_\-]/gi, '_');
}

function sanitizeHeaders(headers) {
  const clean = {};
  for (const [key, value] of headers.entries()) {
    if (!SENSITIVE_HEADER.test(key)) clean[key.toLowerCase()] = value;
  }
  return clean;
}

function decodeEntities(value) {
  const named = {
    amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ',
    agrave: 'à', aacute: 'á', acirc: 'â', atilde: 'ã',
    egrave: 'è', eacute: 'é', ecirc: 'ê',
    igrave: 'ì', iacute: 'í',
    ograve: 'ò', oacute: 'ó', ocirc: 'ô', otilde: 'õ',
    ugrave: 'ù', uacute: 'ú', yacute: 'ý',
    Agrave: 'À', Aacute: 'Á', Acirc: 'Â', Atilde: 'Ã',
    Egrave: 'È', Eacute: 'É', Ecirc: 'Ê',
    Igrave: 'Ì', Iacute: 'Í', Ograve: 'Ò', Oacute: 'Ó', Ocirc: 'Ô', Otilde: 'Õ',
    Ugrave: 'Ù', Uacute: 'Ú', Yacute: 'Ý'
  };
  return value
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (_, entity) => {
      if (entity[0] === '#') {
        const hex = entity[1].toLowerCase() === 'x';
        return String.fromCodePoint(parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10));
      }
      return named[entity] || named[entity.toLowerCase()] || _;
    })
    .replace(/\\u([0-9a-f]{4})/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/\\\//g, '/');
}

function normalizedText(html) {
  return decodeEntities(html)
    .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, ' $1 ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .normalize('NFC')
    .replace(/\s+/g, ' ')
    .trim()
    .toLocaleLowerCase('vi');
}

function spanPresent(text, span) {
  return text.includes(decodeEntities(span).normalize('NFC').replace(/\s+/g, ' ').trim().toLocaleLowerCase('vi'));
}

function makeCard(target, capture) {
  return {
    card_id: target.candidate_id,
    sku_id: target.candidate_id,
    type: 'LOCAL_OFFER_PROGRAM',
    brand_id: target.candidate_id.includes('PHILONG') ? 'phi_long' : 'galaxy_cinema',
    brand_name: target.brand_name,
    title: target.title,
    source_url: target.source_url,
    commercial_surface: target.commercial_surface,
    voucher_tier: target.voucher_tier,
    validity: target.validity,
    conditions: target.conditions,
    captured_at: capture.captured_at_utc,
    geographic_scope: {
      da_nang_applicable: 'VERIFIED',
      verification_basis: 'INHERITED_BRAND_PRESENCE_OR_DIRECT_OFFER_LOCALITY',
      scope_note: target.locality_note
    },
    disclaimer: target.voucher_tier === 'APP_HIDDEN_CODE'
      ? 'Voucher phải được nhận trực tiếp trong ứng dụng ShopeePay chính thức, có thể hết ngân sách trước hạn. JayT không phát hành mã và không bảo đảm khả dụng.'
      : 'Thông tin đối soát tại thời điểm thu thập; ưu đãi chỉ áp dụng cho điều kiện, model và tồn kho được nguồn chính thức công bố.',
    affiliate_url: null,
    provenance: {
      raw_file: capture.raw_file,
      headers_file: capture.headers_file,
      raw_sha256: capture.raw_sha256,
      source_raw_sha256: capture.raw_sha256,
      captured_at_utc: capture.captured_at_utc,
      final_url: capture.final_url
    },
    claims_audit: {
      cheapest_claim: false,
      stock_guaranteed: false,
      savings_guaranteed: false,
      affiliate_link: false,
      synthetic_voucher_code: false
    },
    render_permitted: true,
    approval_status: 'PUBLIC_APPROVED_STAGING_ONLY',
    approval_authority: 'CHAIRMAN / CEO — JAYT-335',
    scope: 'STAGING_ONLY'
  };
}

async function capture(target, runDirRel, runDir) {
  const result = {
    candidate_id: target.candidate_id,
    requested_url: target.source_url,
    status: 'CAPTURE_FAILED__QUARANTINE',
    captured_at_utc: new Date().toISOString(),
    expected_text_spans: target.expected_text_spans,
    span_results: []
  };
  try {
    const response = await fetch(target.source_url, {
      redirect: 'follow',
      headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) JayT/335 Evidence Capture' },
      signal: AbortSignal.timeout(30000)
    });
    const raw = Buffer.from(await response.arrayBuffer());
    const finalUrl = new URL(response.url);
    const requestedUrl = new URL(target.source_url);
    const base = safeName(target.candidate_id);
    const rawName = `${base}.raw.html`;
    const headersName = `${base}.headers.json`;
    const rawPath = path.join(runDir, rawName);
    const headersPath = path.join(runDir, headersName);
    const cleanHeaders = {
      captured_at_utc: result.captured_at_utc,
      requested_url: target.source_url,
      final_url: response.url,
      http_status: response.status,
      response_headers: sanitizeHeaders(response.headers)
    };
    fs.writeFileSync(rawPath, raw);
    fs.writeFileSync(headersPath, JSON.stringify(cleanHeaders, null, 2) + '\n');
    const text = normalizedText(raw.toString('utf8'));
    result.http_status = response.status;
    result.final_url = response.url;
    result.raw_bytes = raw.length;
    result.raw_sha256 = sha256(raw);
    result.raw_file = path.posix.join(runDirRel, rawName);
    result.headers_file = path.posix.join(runDirRel, headersName);
    result.same_origin = finalUrl.origin === requestedUrl.origin;
    result.span_results = target.expected_text_spans.map(span => ({ span, found: spanPresent(text, span) }));
    result.all_spans_found = result.span_results.every(item => item.found);
    result.status = response.status === 200 && result.same_origin && result.all_spans_found && raw.length > 0
      ? 'REAL_BYTES_VERIFIED__PUBLIC_APPROVED_STAGING_ONLY'
      : 'CAPTURED_BUT_VALIDATION_FAILED__QUARANTINE';
  } catch (error) {
    result.error = error.message;
  }
  return result;
}

(async () => {
  const scope = JSON.parse(fs.readFileSync(SCOPE_PATH, 'utf8'));
  if (!scope.gate.capture_authorized || scope.gate.production_deploy_permitted || scope.targets.length !== 4) {
    throw new Error('JAYT-335 scope guard rejected configuration');
  }
  const ids = scope.targets.map(item => item.candidate_id);
  if (new Set(ids).size !== 4 || scope.held_candidates.some(id => ids.includes(id))) {
    throw new Error('Target/held boundary violation');
  }
  fs.mkdirSync(VAULT, { recursive: true });
  const resumeLatest = process.argv.includes('--resume-latest');
  const existingRuns = fs.readdirSync(VAULT, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && entry.name.startsWith('run_'))
    .map(entry => ({ name: entry.name, mtime: fs.statSync(path.join(VAULT, entry.name)).mtimeMs }))
    .sort((a, b) => b.mtime - a.mtime);
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
  const runName = resumeLatest && existingRuns.length ? existingRuns[0].name : `run_${stamp}_${crypto.randomBytes(3).toString('hex')}`;
  const runDir = path.join(VAULT, runName);
  const runDirRel = path.posix.join('06_TRUST_AND_EVIDENCE', 'batch_15_p2_vault', runName);
  if (!resumeLatest) fs.mkdirSync(runDir, { recursive: false });

  const results = [];
  for (const target of scope.targets) {
    const base = safeName(target.candidate_id);
    const rawPath = path.join(runDir, `${base}.raw.html`);
    const headersPath = path.join(runDir, `${base}.headers.json`);
    if (resumeLatest && fs.existsSync(rawPath) && fs.existsSync(headersPath)) {
      const raw = fs.readFileSync(rawPath);
      const headers = JSON.parse(fs.readFileSync(headersPath, 'utf8'));
      const text = normalizedText(raw.toString('utf8'));
      const requested = new URL(target.source_url);
      const finalUrl = new URL(headers.final_url);
      const spanResults = target.expected_text_spans.map(span => ({ span, found: spanPresent(text, span) }));
      const allSpansFound = spanResults.every(item => item.found);
      results.push({
        candidate_id: target.candidate_id,
        requested_url: target.source_url,
        captured_at_utc: headers.captured_at_utc,
        expected_text_spans: target.expected_text_spans,
        http_status: headers.http_status,
        final_url: headers.final_url,
        raw_bytes: raw.length,
        raw_sha256: sha256(raw),
        raw_file: path.posix.join(runDirRel, `${base}.raw.html`),
        headers_file: path.posix.join(runDirRel, `${base}.headers.json`),
        same_origin: requested.origin === finalUrl.origin,
        span_results: spanResults,
        all_spans_found: allSpansFound,
        status: headers.http_status === 200 && requested.origin === finalUrl.origin && allSpansFound && raw.length > 0
          ? 'REAL_BYTES_VERIFIED__PUBLIC_APPROVED_STAGING_ONLY'
          : 'CAPTURED_BUT_VALIDATION_FAILED__QUARANTINE'
      });
    } else if (resumeLatest) {
      results.push({
        candidate_id: target.candidate_id,
        requested_url: target.source_url,
        status: 'CAPTURE_FAILED__NO_RAW_FILES_FROM_AUTHORIZED_RUN',
        expected_text_spans: target.expected_text_spans,
        span_results: [],
        all_spans_found: false
      });
    } else {
      results.push(await capture(target, runDirRel, runDir));
    }
  }

  const catalogs = CATALOG_PATHS.map(file => JSON.parse(fs.readFileSync(file, 'utf8')));
  const approved = results.filter(item => item.status === 'REAL_BYTES_VERIFIED__PUBLIC_APPROVED_STAGING_ONLY');
  const approvedCards = approved.map(item => makeCard(scope.targets.find(target => target.candidate_id === item.candidate_id), item));
  const addedCounts = [];

  for (let index = 0; index < CATALOG_PATHS.length; index++) {
    const catalogPath = CATALOG_PATHS[index];
    const catalog = catalogs[index];
    const existingIds = new Set(catalog.map(card => card.card_id || card.sku_id));
    const newCards = approvedCards.filter(card => !existingIds.has(card.card_id));
    const backupName = path.basename(catalogPath) + '.pre-jayt-335.json';
    if (!fs.existsSync(path.join(runDir, backupName))) fs.copyFileSync(catalogPath, path.join(runDir, backupName));
    fs.writeFileSync(catalogPath, JSON.stringify([...catalog, ...newCards], null, 2) + '\n');
    addedCounts.push(newCards.length);
  }
  const finalCatalogs = CATALOG_PATHS.map(file => JSON.parse(fs.readFileSync(file, 'utf8')));
  const scopedHydratedCounts = finalCatalogs.map(catalog => {
    const finalIds = new Set(catalog.map(card => card.card_id || card.sku_id));
    return ids.filter(id => finalIds.has(id)).length;
  });

  const receipt = {
    receipt_id: 'JAYT_335_BATCH_15_P2_INGRESS_RECEIPT',
    generated_at_utc: new Date().toISOString(),
    scope_sha256: sha256(fs.readFileSync(SCOPE_PATH)),
    run_directory: runDirRel,
    authorized_target_count: 4,
    verified_count: approved.length,
    hydrated_new_card_count_this_execution: Math.min(...addedCounts),
    hydrated_scope_card_count: Math.min(...scopedHydratedCounts),
    staging_catalog_counts_before: catalogs.map(item => item.length),
    staging_catalog_counts_after: catalogs.map((item, index) => item.length + addedCounts[index]),
    held_candidates_untouched: scope.held_candidates,
    production_mutations: 0,
    production_deploy_permitted: false,
    results,
    verdict: approved.length === 4 && Math.min(...scopedHydratedCounts) === 4
      ? 'FOUR_OF_FOUR_VERIFIED_AND_HYDRATED_STAGING_ONLY'
      : 'PARTIAL_OR_FAILED__ONLY_VERIFIED_ITEMS_HYDRATED'
  };
  fs.writeFileSync(path.join(runDir, 'JAYT_335_CAPTURE_AND_VALIDATION_RECEIPT.json'), JSON.stringify(receipt, null, 2) + '\n');
  fs.writeFileSync(RECEIPT_PATH, JSON.stringify(receipt, null, 2) + '\n');
  console.log(JSON.stringify(receipt, null, 2));
  if (approved.length !== 4) process.exitCode = 1;
})().catch(error => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
