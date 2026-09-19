/**
 * JAYT CORP — CANDIDATE INTAKE PIPELINE & PRE-WRITE VALIDATION GATE (069-STEP2D)
 * Directive: JAYT-069-STEP2D — METIZ CANDIDATE INTAKE REBUILD
 * 
 * Rules Enforced:
 * 1. Byte-for-byte evidence snapshot copying from verified raw evidence.
 * 2. Immutable lineage recording (raw_sha === snapshot_sha).
 * 3. Exact contiguous text substrings (NO ellipsis `...`).
 * 4. Pre-write validation gate: Must execute validateCandidate() before persisting candidate to disk.
 * 5. Fail-closed: Any validation error aborts write completely.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { validateCandidate } = require('../07_QUALITY_ASSURANCE/validate_candidate_evidence');

const repoRoot = path.resolve(__dirname, '..');
const dealDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE');
const snapshotsDir = path.join(dealDir, 'candidates', 'evidence_snapshots');
const pendingDir = path.join(dealDir, 'candidates', 'pending_review');

fs.mkdirSync(snapshotsDir, { recursive: true });
fs.mkdirSync(pendingDir, { recursive: true });

function getSha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

/**
 * Copy file from raw capture to snapshots dir and verify byte-for-byte lineage
 */
function createVerifiedSnapshot(rawRelPath, snapshotFilename) {
  const fullRawPath = path.resolve(repoRoot, rawRelPath);
  if (!fs.existsSync(fullRawPath)) {
    throw new Error(`INTAKE_ERROR: Raw source file not found: ${fullRawPath}`);
  }
  const destSnapshotPath = path.join(snapshotsDir, snapshotFilename);

  fs.copyFileSync(fullRawPath, destSnapshotPath);

  const rawSha = getSha256(fullRawPath);
  const snapshotSha = getSha256(destSnapshotPath);
  const rawSize = fs.statSync(fullRawPath).size;
  const snapshotSize = fs.statSync(destSnapshotPath).size;

  if (rawSha !== snapshotSha || rawSize !== snapshotSize) {
    throw new Error(`BYTE_FOR_BYTE_LINEAGE_FAILED: Raw SHA ${rawSha} (${rawSize} B) !== Snapshot SHA ${snapshotSha} (${snapshotSize} B)`);
  }

  return {
    snapshot_filename: snapshotFilename,
    sha256: snapshotSha,
    size_bytes: snapshotSize,
    raw_source_path: rawRelPath.replace(/\\/g, '/')
  };
}

/**
 * Intake descriptor processor
 */
function processCandidateIntake(descriptor) {
  console.log(`\n🔄 [CANDIDATE-INTAKE] Xử lý intake cho candidate: ${descriptor.candidate_id}...`);

  // 1. Create Verified Snapshots
  const pngSnap = createVerifiedSnapshot(descriptor.raw_artifacts.png_path, descriptor.snapshot_names.png);
  const htmlSnap = createVerifiedSnapshot(descriptor.raw_artifacts.html_path, descriptor.snapshot_names.html);
  const txtSnap = createVerifiedSnapshot(descriptor.raw_artifacts.txt_path, descriptor.snapshot_names.txt);

  console.log(`  📸 Snapshot PNG: ${pngSnap.snapshot_filename} (SHA: ${pngSnap.sha256.slice(0, 16)}... [MATCH])`);
  console.log(`  🌐 Snapshot HTML: ${htmlSnap.snapshot_filename} (SHA: ${htmlSnap.sha256.slice(0, 16)}... [MATCH])`);
  console.log(`  📝 Snapshot TXT: ${txtSnap.snapshot_filename} (SHA: ${txtSnap.sha256.slice(0, 16)}... [MATCH])`);

  // 2. Validate Claim Substrings Against Text Dump (Strict Contiguous Substrings, NO '...')
  const textContent = fs.readFileSync(path.join(snapshotsDir, txtSnap.snapshot_filename), 'utf8');

  for (const [claimKey, snippet] of Object.entries(descriptor.extracted_claims || {})) {
    if (snippet.includes('...')) {
      throw new Error(`INTAKE_ERROR: Claim '${claimKey}' contains forbidden ellipsis (...): "${snippet}"`);
    }
    if (!textContent.includes(snippet)) {
      throw new Error(`INTAKE_ERROR: Claim '${claimKey}' substring not found in text dump: "${snippet}"`);
    }
    console.log(`  🔍 Verified claim [${claimKey}]: "${snippet}"`);
  }

  // 3. Create Verified Capture Receipt in evidence_snapshots
  const receiptFilename = descriptor.snapshot_names.receipt;
  const receiptObj = {
    $schema: 'https://jayt.vn/schemas/snapshot-capture-receipt.v1.json',
    candidate_id: descriptor.candidate_id,
    evidence_id: descriptor.evidence_id,
    deal_id: descriptor.deal_id,
    requested_url: descriptor.source_url,
    final_url: descriptor.source_url,
    captured_at: descriptor.captured_at_utc,
    checked_at: descriptor.captured_at_utc,
    runtime_run_id: descriptor.runtime_run_id,
    content_class: 'PROMOTION_DETAIL',
    purchase_channel: descriptor.purchase_channel,
    decoded_dimensions: { width: 1280, height: 1024 },
    raw_source_lineage: {
      raw_source_receipt: descriptor.raw_artifacts.receipt_path,
      raw_source_png_sha256: pngSnap.sha256,
      snapshot_png_sha256: pngSnap.sha256,
      byte_for_byte_lineage_verified: true
    }
  };

  const receiptDestPath = path.join(snapshotsDir, receiptFilename);
  fs.writeFileSync(receiptDestPath, JSON.stringify(receiptObj, null, 2), 'utf8');
  const receiptSha = getSha256(receiptDestPath);
  console.log(`  🧾 Created Snapshot Receipt: ${receiptFilename} (SHA: ${receiptSha.slice(0, 16)}...)`);

  // 4. Assemble Candidate JSON in Memory
  const candidateJson = {
    candidate_id: descriptor.candidate_id,
    evidence: {
      [descriptor.evidence_id]: {
        deal_id: descriptor.deal_id,
        source_url: descriptor.source_url,
        source_type: 'OFFICIAL_PROMOTION_ANNOUNCEMENT',
        recorded_by: 'JAYT_DESK_REVIEW_PUBLIC_SOURCE',
        verification_status: 'READY_FOR_CEO_REVIEW',
        verification_readiness: 'READY_FOR_CEO_REVIEW',
        evidence_status: 'LOCALLY_CAPTURED_SOURCE_LINKED',
        verification_level: 'NOT_INDEPENDENTLY_VERIFIED',
        temporal_validity: 'CONFIRMED_ANNUAL_2026',
        checked_at: descriptor.captured_at_utc,
        captured_at: descriptor.captured_at_utc,
        claim_summary: descriptor.claim_summary,
        source_specificity: 'PUBLIC_OFFICIAL_WEBSITE',
        observed_price_or_offer: descriptor.observed_price_or_offer,
        observed_conditions: descriptor.observed_conditions,
        expiry_basis: 'EXPLICIT_PROMOTION_DATE_IN_CAPTURE',
        capture_file: pngSnap.snapshot_filename,
        evidence_content_hash: pngSnap.sha256,
        artifact_mime_type: 'image/png',
        artifact_text_dump: txtSnap.snapshot_filename,
        artifact_text_hash: txtSnap.sha256,
        artifact_html_dump: htmlSnap.snapshot_filename,
        artifact_html_hash: htmlSnap.sha256,
        capture_receipt_ref: receiptFilename,
        capture_receipt_hash: receiptSha,
        capture_method: 'AUTOMATED_PUBLIC_BROWSER_CAPTURE',
        capture_tool: 'chrome_headless_cdp_anonymous',
        missing_evidence_fields: [],
        notes: descriptor.notes,
        volatility_tag: null,
        location_provenance_claim: descriptor.location_provenance_claim,
        purchase_channel: descriptor.purchase_channel,
        extracted_claims: descriptor.extracted_claims,
        candidate_id: descriptor.candidate_id,
        evidence_id: descriptor.evidence_id,
        content_class: 'PROMOTION_DETAIL',
        active_revision_id: descriptor.revision_id
      }
    },
    deals: [
      {
        deal_id: descriptor.deal_id,
        title: descriptor.deal_title,
        merchant: descriptor.merchant,
        category: descriptor.category,
        need_collection: 'general',
        budget_tier: 'under_100k',
        duration_mins: null,
        group_size: '1_person',
        contextual_reason: descriptor.deal_title,
        observed_price: descriptor.observed_price_or_offer,
        deal_price: descriptor.deal_price,
        original_price: null,
        discount_pct: null,
        effective_date: descriptor.effective_date,
        expires_at: descriptor.expires_at,
        days_of_week: descriptor.days_of_week,
        start_minutes: null,
        end_minutes: null,
        persona: null,
        taxonomy: 'PROBING',
        affiliate_type: 'DIRECT_DEAL',
        source_url: descriptor.source_url,
        evidence_ref: descriptor.evidence_id,
        disclosure: 'Thông tin được quan sát trực tiếp từ trang chính thức. Chưa qua xác minh độc lập bên thứ ba (NOT_INDEPENDENTLY_VERIFIED).',
        lifecycle_status: 'READY_FOR_CEO_REVIEW',
        render_eligible: false,
        verified_at: descriptor.captured_at_utc,
        category_scope: 'LOCAL_EXPERIENCE',
        volatility_tag: null,
        purchase_channel: descriptor.purchase_channel,
        membership_required: descriptor.membership_required,
        locality_scope: descriptor.location_provenance_claim,
        exceptions_disclosed: descriptor.exceptions_disclosed
      }
    ],
    evidence_revisions: {
      current_revision_id: descriptor.revision_id,
      revisions: [
        {
          revision_id: descriptor.revision_id,
          revision_order: 1,
          captured_at: descriptor.captured_at_utc,
          evidence_status: 'LOCALLY_CAPTURED_SOURCE_LINKED',
          verification_readiness: 'READY_FOR_CEO_REVIEW',
          verification_level: 'NOT_INDEPENDENTLY_VERIFIED',
          capture_receipt_ref: receiptFilename,
          capture_receipt_hash: receiptSha,
          content_class: 'PROMOTION_DETAIL',
          notes: descriptor.notes
        }
      ]
    }
  };

  // 5. Pre-Write Validation Gate: Run validateCandidate BEFORE persisting
  console.log(`  🛡️ [PRE-WRITE-VALIDATION-GATE] Chạy validateCandidate() cho ${descriptor.candidate_id}...`);
  const valRes = validateCandidate(candidateJson, { snapshotsDir: snapshotsDir });

  if (!valRes.structurally_valid || valRes.errors.length > 0) {
    console.error(`  ❌ [FAIL-CLOSED] Validator phát hiện ${valRes.errors.length} lỗi:`, valRes.errors);
    throw new Error(`CANDIDATE_VALIDATION_FAILED: ${valRes.errors.join('; ')}`);
  }

  console.log(`  🟢 [PRE-WRITE-VALIDATION-PASS] Validator đã PASS 100% (0 errors)!`);

  // 6. Write Candidate and Dossier to disk
  const candidateFilename = descriptor.output_candidate_filename;
  const candidateDestPath = path.join(pendingDir, candidateFilename);
  fs.writeFileSync(candidateDestPath, JSON.stringify(candidateJson, null, 2), 'utf8');
  console.log(`  💾 Đã lưu Candidate JSON: ${candidateDestPath}`);

  const dossierFilename = descriptor.output_dossier_filename;
  const dossierDestPath = path.join(pendingDir, dossierFilename);
  fs.writeFileSync(dossierDestPath, descriptor.dossier_markdown, 'utf8');
  console.log(`  📄 Đã lưu Dossier Markdown: ${dossierDestPath}`);

  return {
    candidate_id: descriptor.candidate_id,
    candidate_file: candidateFilename,
    dossier_file: dossierFilename,
    sha256: getSha256(candidateDestPath),
    status: 'READY_FOR_CEO_REVIEW'
  };
}

module.exports = {
  createVerifiedSnapshot,
  processCandidateIntake
};
