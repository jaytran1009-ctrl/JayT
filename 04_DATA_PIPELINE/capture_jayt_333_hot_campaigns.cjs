const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const QUEUE = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'JAYT_333_HOT_CAMPAIGN_N_PLUS_1_QUEUE.json');
const VAULT = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'jayt_333_hot_campaign_vault');
const queue = JSON.parse(fs.readFileSync(QUEUE, 'utf8'));
const candidateArgIndex = process.argv.indexOf('--candidate');
const candidateFilter = candidateArgIndex >= 0 ? process.argv[candidateArgIndex + 1] : null;
const selectedCandidates = candidateFilter
  ? queue.candidates.filter(candidate => candidate.candidate_id === candidateFilter)
  : queue.candidates;
if (selectedCandidates.length === 0) throw new Error(`Candidate not found: ${candidateFilter}`);
const RESULT = path.join(VAULT, candidateFilter
  ? `${candidateFilter}.targeted-capture-result.json`
  : 'JAYT_333_HOT_CAMPAIGN_CAPTURE_RESULT.json');

const sha256 = buffer => crypto.createHash('sha256').update(buffer).digest('hex');
const forbiddenHeaders = /cookie|authorization|token|set-cookie/i;
const normalize = text => text.normalize('NFC').replace(/\s+/g, ' ').trim().toLocaleLowerCase('vi');

function sanitizeHeaders(headers) {
  const clean = {};
  for (const [key, value] of headers.entries()) {
    if (!forbiddenHeaders.test(key)) clean[key] = value;
  }
  return clean;
}

function findSpan(raw, span) {
  if (!span) return { declared: null, found: null, byte_offset_utf8: null };
  const exactIndex = raw.indexOf(span);
  if (exactIndex >= 0) {
    return { declared: span, found: span, byte_offset_utf8: Buffer.byteLength(raw.slice(0, exactIndex), 'utf8') };
  }
  const normalizedRaw = normalize(raw);
  const normalizedSpan = normalize(span);
  const normalizedIndex = normalizedRaw.indexOf(normalizedSpan);
  return { declared: span, found: normalizedIndex >= 0 ? normalizedSpan : null, byte_offset_utf8: null };
}

async function capture(candidate) {
  const id = candidate.candidate_id;
  const capturedAt = new Date().toISOString();
  const artifactStem = candidateFilter ? `${id}.leaf` : id;
  try {
    const response = await fetch(candidate.official_url, {
      redirect: 'follow',
      headers: { 'user-agent': 'Mozilla/5.0 JAYT-Operator-Verified/1.0', accept: 'text/html,application/xhtml+xml' },
      signal: AbortSignal.timeout(30000)
    });
    const bytes = Buffer.from(await response.arrayBuffer());
    const rawPath = path.join(VAULT, `${artifactStem}.raw.html`);
    const headersPath = path.join(VAULT, `${artifactStem}.headers.json`);
    fs.writeFileSync(rawPath, bytes);
    fs.writeFileSync(headersPath, JSON.stringify({
      candidate_id: id,
      requested_url: candidate.official_url,
      final_url: response.url,
      http_status: response.status,
      captured_at_utc: capturedAt,
      response_headers: sanitizeHeaders(response.headers),
      raw_sha256: sha256(bytes),
      raw_bytes: bytes.length
    }, null, 2) + '\n');
    const raw = bytes.toString('utf8');
    const evidence = [candidate.supporting_span, candidate.condition_span, candidate.validity_span]
      .filter(Boolean).map(span => findSpan(raw, span));
    const allSpansFound = evidence.every(item => item.found !== null);
    const noCommercialDuplication = candidate.tier === 'LOCALITY_EVIDENCE_ONLY'
      || candidate.status.includes('DO_NOT_DUPLICATE')
      || id.includes('DANABUS');
    return {
      candidate_id: id,
      requested_url: candidate.official_url,
      final_url: response.url,
      http_status: response.status,
      raw_file: path.relative(ROOT, rawPath).replaceAll('\\', '/'),
      headers_file: path.relative(ROOT, headersPath).replaceAll('\\', '/'),
      raw_sha256: sha256(bytes),
      raw_bytes: bytes.length,
      evidence,
      all_declared_spans_found: allSpansFound,
      commercial_duplicate_blocked: noCommercialDuplication,
      verdict: response.ok && allSpansFound
        ? (noCommercialDuplication ? 'EVIDENCE_COMPLETE__DEDUP_BLOCKED' : 'EVIDENCE_COMPLETE__AWAITING_ITEM_LEVEL_APPROVAL')
        : 'QUARANTINE__HTTP_OR_SPAN_MISMATCH'
    };
  } catch (error) {
    return { candidate_id: id, requested_url: candidate.official_url, verdict: 'QUARANTINE__CAPTURE_FAILED', error: error.message };
  }
}

(async () => {
  fs.mkdirSync(VAULT, { recursive: true });
  const results = [];
  for (const candidate of selectedCandidates) results.push(await capture(candidate));
  const report = {
    report_name: 'JAYT_333_HOT_CAMPAIGN_CAPTURE_RESULT',
    generated_at_utc: new Date().toISOString(),
    capture_method: 'CONTROLLED_ONE_SHOT_UNAUTHENTICATED_GET',
    results,
    metrics: {
      targets: results.length,
      evidence_complete: results.filter(item => item.verdict.startsWith('EVIDENCE_COMPLETE')).length,
      awaiting_approval: results.filter(item => item.verdict === 'EVIDENCE_COMPLETE__AWAITING_ITEM_LEVEL_APPROVAL').length,
      dedup_blocked: results.filter(item => item.verdict === 'EVIDENCE_COMPLETE__DEDUP_BLOCKED').length,
      quarantined: results.filter(item => item.verdict.startsWith('QUARANTINE')).length
    },
    safeguards: {
      synthetic_bytes_created: false,
      affiliate_links_activated: 0,
      production_mutated: false
    }
  };
  fs.writeFileSync(RESULT, JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
})().catch(error => { console.error(error); process.exitCode = 1; });
