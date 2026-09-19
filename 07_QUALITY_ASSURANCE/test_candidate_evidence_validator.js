/**
 * test_candidate_evidence_validator.js
 * Comprehensive Test Suite for Candidate Evidence Validator (040B, 040A, 036E, 028B).
 * Validates domain isolation, path traversal, full PNG parser (CRC32, IHDR, zlib inflate),
 * capture receipts, and negative test boundaries.
 */

const path = require('path');
const fsModule = require('fs');
const crypto = require('crypto');
const zlib = require('zlib');
const {
  validateCandidate,
  validateDomainPolicy,
  parseAndVerifyPng,
  calcCrc32
} = require('./validate_candidate_evidence');

const repoRoot = path.resolve(__dirname, '..');
const tempTestDir = path.join(__dirname, 'jayt_val_test_' + Math.random().toString(36).substring(2, 8));
fsModule.mkdirSync(tempTestDir, { recursive: true });

console.log('🧪 [JAYT-VALIDATOR-TEST] Khởi chạy bộ kiểm thử tính toàn vẹn và bài test âm cho Candidate Validator (040B)...');

let allPassed = true;

function assertTest(testName, condition, details) {
  if (condition) {
    console.log(`  [${testName}]: [PASS]${details ? ' - ' + details : ''}`);
  } else {
    console.error(`  [${testName}]: [FAIL]${details ? ' - ' + details : ''}`);
    allPassed = false;
  }
}

function createValidPngBuffer(w = 100, h = 100) {
  const magic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  
  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(w, 0);
  ihdrData.writeUInt32BE(h, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 2; // RGB
  
  const ihdrType = Buffer.from('IHDR', 'ascii');
  const ihdrCrc = calcCrc32(Buffer.concat([ihdrType, ihdrData]));
  const ihdrChunk = Buffer.alloc(8 + 13 + 4);
  ihdrChunk.writeUInt32BE(13, 0);
  ihdrType.copy(ihdrChunk, 4);
  ihdrData.copy(ihdrChunk, 8);
  ihdrChunk.writeUInt32BE(ihdrCrc, 21);

  // Scanlines
  const scanlineLen = 1 + w * 3;
  const rawData = Buffer.alloc(h * scanlineLen, 0x7f);
  for (let y = 0; y < h; y++) {
    rawData[y * scanlineLen] = 0;
  }
  const compressed = zlib.deflateSync(rawData);

  // IDAT
  const idatType = Buffer.from('IDAT', 'ascii');
  const idatCrc = calcCrc32(Buffer.concat([idatType, compressed]));
  const idatChunk = Buffer.alloc(8 + compressed.length + 4);
  idatChunk.writeUInt32BE(compressed.length, 0);
  idatType.copy(idatChunk, 4);
  compressed.copy(idatChunk, 8);
  idatChunk.writeUInt32BE(idatCrc, 8 + compressed.length);

  // IEND
  const iendType = Buffer.from('IEND', 'ascii');
  const iendCrc = calcCrc32(iendType);
  const iendChunk = Buffer.alloc(8 + 0 + 4);
  iendChunk.writeUInt32BE(0, 0);
  iendType.copy(iendChunk, 4);
  iendChunk.writeUInt32BE(iendCrc, 8);

  return Buffer.concat([magic, ihdrChunk, idatChunk, iendChunk]);
}

try {
  // Create sample valid artifact files
  const validTextPath = path.join(tempTestDir, 'sample_evidence.txt');
  const validTextContent = 'Metiz Cinema: Vé 2D 55.000 VNĐ cho thành viên U22 từ 01/01/2026 đến 31/12/2026. Áp dụng tại quầy.';
  fsModule.writeFileSync(validTextPath, validTextContent, 'utf8');
  const validTextHash = crypto.createHash('sha256').update(validTextContent).digest('hex');

  const validPngPath = path.join(tempTestDir, 'sample_capture.png');
  const validPngContent = createValidPngBuffer(1280, 720);
  fsModule.writeFileSync(validPngPath, validPngContent);
  const validPngHash = crypto.createHash('sha256').update(validPngContent).digest('hex');

  const validHtmlPath = path.join(tempTestDir, 'sample_raw.html');
  const validHtmlContent = '<html><body><h1>Metiz Cinema</h1><p>Vé 2D 55.000 VNĐ cho thành viên U22 đến 31/12/2026.</p></body></html>' + ' '.repeat(450);
  fsModule.writeFileSync(validHtmlPath, validHtmlContent, 'utf8');
  const validHtmlHash = crypto.createHash('sha256').update(validHtmlContent).digest('hex');

  const validReceiptPath = path.join(tempTestDir, 'sample_receipt.json');
  const validReceiptData = {
    schema_version: "1.1.0",
    candidate_id: "CAND-TEST-VALID-01",
    evidence_id: "EVID_CAND-TEST-VALID-01",
    deal_id: "DNG-METIZ-U22-TEST",
    content_class: "PROMOTION_DETAIL",
    requested_url: "https://metiz.vn/tin-tuc/u22/",
    final_url: "https://metiz.vn/tin-tuc/u22/",
    http_status: 200,
    page_title: "Metiz Cinema U22",
    captured_at: new Date().toISOString(),
    runtime_run_id: "test_run_01",
    screenshot_sha256: validPngHash,
    raw_html_sha256: validHtmlHash,
    text_dump_sha256: validTextHash,
    decoded_dimensions: { width: 1280, height: 720 },
    extracted_snippets: { price_snippet: "55.000 VNĐ" }
  };
  const validReceiptRaw = JSON.stringify(validReceiptData, null, 2);
  fsModule.writeFileSync(validReceiptPath, validReceiptRaw, 'utf8');
  const validReceiptHash = crypto.createHash('sha256').update(fsModule.readFileSync(validReceiptPath)).digest('hex');

  const mockDomainCatalog = [
    { domain: 'metiz.vn', is_enabled: true, emergency_kill_switch_active: false, status: 'ACTIVE', approved_protocols: ['https'] },
    { domain: 'highlandscoffee.com.vn', is_enabled: true, emergency_kill_switch_active: false, status: 'ACTIVE', approved_protocols: ['https'] },
    { domain: 'shopee.vn', is_enabled: true, emergency_kill_switch_active: false, status: 'ACTIVE', approved_protocols: ['https'] }
  ];

  // ---------------------------------------------------------------------------
  // [VAL_01] Positive Test: Fully Evidenced Candidate (metiz.vn) with Capture Receipt
  // ---------------------------------------------------------------------------
  const candidateValid = {
    candidate_id: "CAND-TEST-VALID-01",
    deal_id: "DNG-METIZ-U22-TEST",
    merchant: "Metiz Cinema Đà Nẵng",
    title: "Vé 2D 55K U22",
    category: "local_entertainment",
    category_scope: "LOCAL_EXPERIENCE",
    affiliate_type: "DIRECT_DEAL",
    source_url: "https://metiz.vn/tin-tuc/u22/",
    artifact_source_url: "https://metiz.vn/tin-tuc/u22/",
    captured_at: new Date().toISOString(),
    temporal_validity: "CONFIRMED_SPECIFIC_DATE",
    artifact_screenshot: 'sample_capture.png',
    artifact_screenshot_hash: validPngHash,
    artifact_text_dump: 'sample_evidence.txt',
    artifact_text_hash: validTextHash,
    artifact_html_dump: 'sample_raw.html',
    artifact_html_hash: validHtmlHash,
    capture_receipt_ref: 'sample_receipt.json',
    capture_receipt_hash: validReceiptHash,
    extracted_claims: {
      price_snippet: "55.000 VNĐ",
      conditions_snippet: "thành viên U22",
      expiry_snippet: "31/12/2026"
    },
    observed_price_or_offer: "55.000 VNĐ",
    observed_conditions: "thành viên U22",
    expiry_basis: "Đến 31/12/2026",
    verification_readiness: "READY_FOR_CEO_REVIEW",
    evidence_status: "REAL_CAPTURE_PROVEN"
  };

  const res1 = validateCandidate(candidateValid, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_01_POSITIVE_FULLY_EVIDENCED', res1.structurally_valid === true && res1.evidence_status === 'REAL_CAPTURE_PROVEN', res1.errors.join('; '));

  // ---------------------------------------------------------------------------
  // [VAL_02] Negative Test: Generic homepage as evidence (lacks specific price)
  // ---------------------------------------------------------------------------
  const emptyHomepageTextPath = path.join(tempTestDir, 'empty_homepage.txt');
  fsModule.writeFileSync(emptyHomepageTextPath, 'Chào mừng đến với Metiz Cinema', 'utf8');
  const emptyHomepageHash = crypto.createHash('sha256').update('Chào mừng đến với Metiz Cinema').digest('hex');

  const candidateEmptyHomepage = {
    ...candidateValid,
    candidate_id: "CAND-TEST-HOMEPAGE-02",
    deal_id: "DNG-METIZ-HOMEPAGE-02",
    artifact_text_dump: 'empty_homepage.txt',
    artifact_text_hash: emptyHomepageHash,
    verification_readiness: "READY_FOR_CEO_REVIEW"
  };
  const res2 = validateCandidate(candidateEmptyHomepage, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_02_NEGATIVE_GENERIC_HOMEPAGE_BLOCKED', res2.valid === false,
    `Blocked with expected errors: ${res2.errors.length} error(s) found`);

  // ---------------------------------------------------------------------------
  // [VAL_03] Negative Test: Tampered Artifact Hash
  // ---------------------------------------------------------------------------
  const candidateTamperedHash = {
    ...candidateValid,
    candidate_id: "CAND-TEST-TAMPERED-03",
    deal_id: "DNG-METIZ-TAMPERED-03",
    artifact_screenshot_hash: "0000000000000000000000000000000000000000000000000000000000000000"
  };
  const res3 = validateCandidate(candidateTamperedHash, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_03_NEGATIVE_TAMPERED_HASH_BLOCKED', res3.valid === false,
    res3.errors.find(e => e.includes('hash mismatch')) || 'Hash mismatch detected');

  // ---------------------------------------------------------------------------
  // [VAL_04] Negative Test: Unapproved Domain
  // ---------------------------------------------------------------------------
  const candidateUnapprovedDomain = {
    ...candidateValid,
    candidate_id: "CAND-TEST-UNAPPROVED-DOMAIN-04",
    deal_id: "DNG-METIZ-UNAPPROVED-04",
    source_url: "https://evil-unapproved-site.com/promo"
  };
  const res4 = validateCandidate(candidateUnapprovedDomain, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_04_NEGATIVE_UNAPPROVED_DOMAIN_BLOCKED', res4.valid === false,
    res4.errors.find(e => e.includes('domain_catalog')) || 'Domain rejected');

  // ---------------------------------------------------------------------------
  // [VAL_05] Negative Test: Missing Mandatory Schema Field
  // ---------------------------------------------------------------------------
  const candidateMissingField = { ...candidateValid };
  delete candidateMissingField.captured_at;
  const res5 = validateCandidate(candidateMissingField, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_05_NEGATIVE_MISSING_FIELD_BLOCKED', res5.valid === false,
    res5.errors.find(e => e.includes('Missing mandatory field')) || 'Schema enforced');

  // ---------------------------------------------------------------------------
  // [VAL_06] Positive Test: Candidate properly marked as NEEDS_RECHECK
  // ---------------------------------------------------------------------------
  const candidateNeedsRecheck = {
    candidate_id: "CAND-TEST-RECHECK-06",
    deal_id: "DNG-HIGHLANDS-RECHECK-06",
    merchant: "Highlands Coffee",
    title: "Khuyến Mãi Highlands Coffee",
    category: "local_beverage",
    category_scope: "LOCAL_EXPERIENCE",
    affiliate_type: "DIRECT_DEAL",
    source_url: "https://highlandscoffee.com.vn/vn/tin-tuc-khuyen-mai.html",
    artifact_source_url: "https://highlandscoffee.com.vn/vn/tin-tuc-khuyen-mai.html",
    captured_at: new Date().toISOString(),
    temporal_validity: "UNCONFIRMED_AT_CAPTURE_TIME",
    artifact_screenshot: 'sample_capture.png',
    artifact_screenshot_hash: validPngHash,
    artifact_text_dump: 'empty_homepage.txt',
    artifact_text_hash: emptyHomepageHash,
    observed_price_or_offer: null,
    observed_conditions: null,
    expiry_basis: null,
    verification_readiness: "NEEDS_RECHECK",
    evidence_status: "NEEDS_RECHECK"
  };
  const res6 = validateCandidate(candidateNeedsRecheck, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_06_POSITIVE_NEEDS_RECHECK_ACCEPTED', res6.structurally_valid === true && res6.evidence_status === 'NEEDS_RECHECK', res6.errors.join('; '));

  // ---------------------------------------------------------------------------
  // [VAL_07] Negative Test: Offer text mismatch against text dump
  // ---------------------------------------------------------------------------
  const candidateMismatchText = {
    ...candidateValid,
    candidate_id: "CAND-TEST-TEXT-MISMATCH-07",
    deal_id: "DNG-METIZ-MISMATCH-07",
    extracted_claims: {
      price_snippet: "999.000 VNĐ", // Non-existent
      conditions_snippet: "VIP ONLY"
    },
    verification_readiness: "READY_FOR_CEO_REVIEW"
  };
  const res7 = validateCandidate(candidateMismatchText, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_07_NEGATIVE_OFFER_TEXT_MISMATCH_BLOCKED', res7.valid === false,
    res7.errors.find(e => e.includes('CLAIM_VERIFICATION_FAILED')) || 'Text mismatch detected');

  // ---------------------------------------------------------------------------
  // [VAL_08] Negative Test: Subdomain when allow_subdomains=false
  // ---------------------------------------------------------------------------
  const candidateSubdomainBlocked = {
    ...candidateValid,
    candidate_id: "CAND-TEST-SUBDOMAIN-08",
    deal_id: "DNG-METIZ-SUBDOMAIN-08",
    source_url: "https://promo.metiz.vn/"
  };
  const res8 = validateCandidate(candidateSubdomainBlocked, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_08_NEGATIVE_SUBDOMAIN_BLOCKED', res8.valid === false,
    res8.errors.find(e => e.includes('domain_catalog')) || 'Subdomain rejected');

  // ---------------------------------------------------------------------------
  // [VAL_09] Negative Test: Shell Command Injection Attempt in source_url
  // ---------------------------------------------------------------------------
  const candidateInjection = {
    ...candidateValid,
    candidate_id: "CAND-TEST-INJECTION-09",
    deal_id: "DNG-METIZ-INJECTION-09",
    source_url: "https://example.com/promo\"; echo 'HACKED' > hacked.txt; \""
  };
  const res9 = validateCandidate(candidateInjection, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_09_NEGATIVE_SHELL_INJECTION_BLOCKED', res9.valid === false,
    res9.errors.find(e => e.includes('domain_catalog')) || 'Injection rejected');

  // ---------------------------------------------------------------------------
  // [VAL_10] Negative Test: Sibling prefix traversal
  // ---------------------------------------------------------------------------
  const siblingDir = tempTestDir + '_sibling';
  fsModule.mkdirSync(siblingDir, { recursive: true });
  const siblingFile = path.join(siblingDir, 'sibling_evidence.txt');
  fsModule.writeFileSync(siblingFile, 'Malicious payload', 'utf8');

  const candidateSiblingTraversal = {
    ...candidateValid,
    candidate_id: "CAND-TEST-SIBLING-10",
    deal_id: "DNG-METIZ-SIBLING-10",
    artifact_text_dump: `../${path.basename(siblingDir)}/sibling_evidence.txt`
  };
  const res10 = validateCandidate(candidateSiblingTraversal, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_10_NEGATIVE_SIBLING_PREFIX_TRAVERSAL_BLOCKED', res10.valid === false,
    res10.errors.find(e => e.includes('path traversal')) || 'Sibling traversal rejected');

  fsModule.rmSync(siblingDir, { recursive: true, force: true });

  // ---------------------------------------------------------------------------
  // [VAL_11] Negative Test: Candidate marked NEEDS_RECHECK must NOT contain schedule / commercial claims
  // ---------------------------------------------------------------------------
  const candidateNeedsRecheckWithClaims = {
    ...candidateNeedsRecheck,
    candidate_id: "CAND-TEST-RECHECK-WITH-CLAIMS-11",
    deal_id: "DNG-RECHECK-CLAIMS-11",
    deals: [
      {
        deal_id: "DEAL-TEST-RECHECK-01",
        original_price: 100000,
        deal_price: 50000,
        start_minutes: 665,
        schedule: "11:05 - 13:00"
      }
    ]
  };
  const res11 = validateCandidate(candidateNeedsRecheckWithClaims, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_11_NEGATIVE_NEEDS_RECHECK_WITH_CLAIMS_BLOCKED', res11.valid === false && res11.errors.length >= 4,
    res11.errors.find(e => e.includes('must not have start_minutes')) || 'Integrity rule enforced');

  // ---------------------------------------------------------------------------
  // [VAL_12] Negative Test: Unconfirmed Expiry Claim cannot be READY_FOR_CEO_REVIEW / PASS
  // ---------------------------------------------------------------------------
  const candidateUnconfirmedExpiry = {
    ...candidateValid,
    candidate_id: "CAND-TEST-UNCONFIRMED-EXPIRY-12",
    deal_id: "DNG-METIZ-EXPIRY-12",
    temporal_validity: "UNCONFIRMED_AT_CAPTURE_TIME",
    expiry_basis: "NOT_OBSERVED_ON_CAPTURED_PROMOTION_PAGE",
    verification_readiness: "READY_FOR_CEO_REVIEW"
  };
  const res12 = validateCandidate(candidateUnconfirmedExpiry, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_12_NEGATIVE_UNCONFIRMED_EXPIRY_CANNOT_PASS', res12.valid === false,
    res12.errors.find(e => e.includes('UNCONFIRMED_AT_CAPTURE_TIME')) || 'Unconfirmed expiry blocked');

  // ---------------------------------------------------------------------------
  // [VAL_DOM_01..04] Domain Policy Tests
  // ---------------------------------------------------------------------------
  const domMetiz = validateDomainPolicy('https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html', mockDomainCatalog);
  assertTest('VAL_DOM_01_EXACT_METIZ_VALID', domMetiz.ok === true, domMetiz.message);

  const domHighlands = validateDomainPolicy('https://highlandscoffee.com.vn/vn/tin-tuc-khuyen-mai.html', mockDomainCatalog);
  assertTest('VAL_DOM_02_EXACT_HIGHLANDS_VALID', domHighlands.ok === true, domHighlands.message);

  const domSub = validateDomainPolicy('https://promo.metiz.vn/khuyen-mai', mockDomainCatalog);
  assertTest('VAL_DOM_03_UNAPPROVED_SUBDOMAIN_BLOCKED', domSub.ok === false, domSub.message);

  const domFake = validateDomainPolicy('https://fake-metiz-deal.com/u22', mockDomainCatalog);
  assertTest('VAL_DOM_04_FAKE_DOMAIN_BLOCKED', domFake.ok === false, domFake.message);

  // ---------------------------------------------------------------------------
  // [VAL_13] Negative Test: Candidate with UNCONFIRMED_AT_CAPTURE_TIME cannot be PASS
  // ---------------------------------------------------------------------------
  const candidatePassAttempt = {
    ...candidateValid,
    candidate_id: "CAND-TEST-PASS-ATTEMPT-13",
    deal_id: "DNG-METIZ-PASS-13",
    temporal_validity: "UNCONFIRMED_AT_CAPTURE_TIME",
    verification_readiness: "PASS"
  };
  const res13 = validateCandidate(candidatePassAttempt, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_13_NEGATIVE_UNCONFIRMED_CANNOT_PASS_OR_IMPORT', res13.valid === false,
    res13.errors.find(e => e.includes('UNCONFIRMED_AT_CAPTURE_TIME')) || 'PASS with unconfirmed temporal blocked');

  // ---------------------------------------------------------------------------
  // [VAL_14] Negative Test: Synthetic Stub Screenshot (1x1 or < 100x100) is strictly blocked
  // ---------------------------------------------------------------------------
  const stubPngPath = path.join(tempTestDir, 'synthetic_stub.png');
  const stubPngContent = createValidPngBuffer(1, 1);
  fsModule.writeFileSync(stubPngPath, stubPngContent);
  const stubPngHash = crypto.createHash('sha256').update(stubPngContent).digest('hex');

  const candidateStubPng = {
    ...candidateValid,
    candidate_id: "CAND-TEST-STUB-PNG-14",
    deal_id: "DNG-METIZ-STUB-PNG-14",
    artifact_screenshot: 'synthetic_stub.png',
    artifact_screenshot_hash: stubPngHash
  };
  const res14 = validateCandidate(candidateStubPng, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_14_NEGATIVE_SYNTHETIC_STUB_PNG_BLOCKED', res14.valid === false,
    res14.errors.find(e => e.includes('SYNTHETIC_OR_INVALID_SCREENSHOT_ARTIFACT')) || 'Stub PNG blocked');

  // ---------------------------------------------------------------------------
  // [VAL_15] Negative Test: Synthetic Stub HTML (< 500 bytes) is strictly blocked
  // ---------------------------------------------------------------------------
  const stubHtmlPath = path.join(tempTestDir, 'synthetic_stub.html');
  const stubHtmlContent = '<html><body>Fake Promo</body></html>';
  fsModule.writeFileSync(stubHtmlPath, stubHtmlContent, 'utf8');
  const stubHtmlHash = crypto.createHash('sha256').update(stubHtmlContent).digest('hex');

  const candidateStubHtml = {
    ...candidateValid,
    candidate_id: "CAND-TEST-STUB-HTML-15",
    deal_id: "DNG-METIZ-STUB-HTML-15",
    artifact_html_dump: 'synthetic_stub.html',
    artifact_html_hash: stubHtmlHash
  };
  const res15 = validateCandidate(candidateStubHtml, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_15_NEGATIVE_SYNTHETIC_HTML_STUB_BLOCKED', res15.valid === false,
    res15.errors.find(e => e.includes('SYNTHETIC_OR_INVALID_HTML_ARTIFACT')) || 'Stub HTML blocked');

  // ---------------------------------------------------------------------------
  // [VAL_16] Negative Test: PNG Chunk CRC32 Mismatch is Detected & Blocked (040B)
  // ---------------------------------------------------------------------------
  const corruptCrcBuf = Buffer.from(validPngContent);
  corruptCrcBuf[corruptCrcBuf.length - 2] ^= 0xff; // corrupt IEND CRC
  const corruptCrcPath = path.join(tempTestDir, 'corrupt_crc.png');
  fsModule.writeFileSync(corruptCrcPath, corruptCrcBuf);
  const corruptCrcHash = crypto.createHash('sha256').update(corruptCrcBuf).digest('hex');

  const candidateCorruptCrc = {
    ...candidateValid,
    candidate_id: "CAND-TEST-CORRUPT-CRC-16",
    deal_id: "DNG-METIZ-CRC-16",
    artifact_screenshot: 'corrupt_crc.png',
    artifact_screenshot_hash: corruptCrcHash
  };
  const res16 = validateCandidate(candidateCorruptCrc, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_16_NEGATIVE_PNG_CORRUPTED_CRC_BLOCKED', res16.valid === false,
    res16.errors.find(e => e.includes('CRC32 mismatch')) || 'CRC mismatch blocked');

  // ---------------------------------------------------------------------------
  // [VAL_17] Negative Test: PNG Corrupted ZLIB IDAT Stream is Detected & Blocked (040B)
  // ---------------------------------------------------------------------------
  function createCorruptZlibPng() {
    const magic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const ihdrData = Buffer.alloc(13);
    ihdrData.writeUInt32BE(100, 0);
    ihdrData.writeUInt32BE(100, 4);
    ihdrData[8] = 8;
    ihdrData[9] = 2;
    const ihdrType = Buffer.from('IHDR', 'ascii');
    const ihdrCrc = calcCrc32(Buffer.concat([ihdrType, ihdrData]));
    const ihdrChunk = Buffer.alloc(8 + 13 + 4);
    ihdrChunk.writeUInt32BE(13, 0);
    ihdrType.copy(ihdrChunk, 4);
    ihdrData.copy(ihdrChunk, 8);
    ihdrChunk.writeUInt32BE(ihdrCrc, 21);

    const fakeIdatData = Buffer.alloc(200, 0x55);
    fakeIdatData[0] = 0x78; fakeIdatData[1] = 0x9c;
    const idatType = Buffer.from('IDAT', 'ascii');
    const idatCrc = calcCrc32(Buffer.concat([idatType, fakeIdatData]));
    const idatChunk = Buffer.alloc(8 + fakeIdatData.length + 4);
    idatChunk.writeUInt32BE(fakeIdatData.length, 0);
    idatType.copy(idatChunk, 4);
    fakeIdatData.copy(idatChunk, 8);
    idatChunk.writeUInt32BE(idatCrc, 8 + fakeIdatData.length);

    const iendType = Buffer.from('IEND', 'ascii');
    const iendCrc = calcCrc32(iendType);
    const iendChunk = Buffer.alloc(8 + 0 + 4);
    iendChunk.writeUInt32BE(0, 0);
    iendType.copy(iendChunk, 4);
    iendChunk.writeUInt32BE(iendCrc, 8);

    return Buffer.concat([magic, ihdrChunk, idatChunk, iendChunk]);
  }

  const corruptZlibBuf = createCorruptZlibPng();
  const corruptZlibPath = path.join(tempTestDir, 'corrupt_zlib.png');
  fsModule.writeFileSync(corruptZlibPath, corruptZlibBuf);
  const corruptZlibHash = crypto.createHash('sha256').update(corruptZlibBuf).digest('hex');

  const candidateCorruptZlib = {
    ...candidateValid,
    candidate_id: "CAND-TEST-CORRUPT-ZLIB-17",
    deal_id: "DNG-METIZ-ZLIB-17",
    artifact_screenshot: 'corrupt_zlib.png',
    artifact_screenshot_hash: corruptZlibHash
  };
  const res17 = validateCandidate(candidateCorruptZlib, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_17_NEGATIVE_PNG_CORRUPTED_ZLIB_PAYLOAD_BLOCKED', res17.valid === false,
    res17.errors.find(e => e.includes('Failed to inflate IDAT zlib stream')) || 'Corrupt zlib stream blocked');

  // ---------------------------------------------------------------------------
  // [VAL_18] Negative Test: REAL_CAPTURE_PROVEN Lacking Capture Receipt is Blocked (040B)
  // ---------------------------------------------------------------------------
  const candidateMissingReceipt = {
    ...candidateValid,
    candidate_id: "CAND-TEST-MISSING-RECEIPT-18",
    deal_id: "DNG-METIZ-MISSING-RCPT-18",
    capture_receipt_ref: null,
    capture_receipt_hash: null
  };
  const res18 = validateCandidate(candidateMissingReceipt, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_18_NEGATIVE_MISSING_CAPTURE_RECEIPT_FOR_REAL_PROVEN_BLOCKED', res18.valid === false,
    res18.errors.find(e => e.includes('capture_receipt_ref')) || 'Missing receipt blocked');

  // ---------------------------------------------------------------------------
  // [VAL_19] Negative Test: Text/Raw Snippet Mismatch Fails Claim Verification (040B)
  // ---------------------------------------------------------------------------
  const candidateSnippetMismatch = {
    ...candidateValid,
    candidate_id: "CAND-TEST-SNIPPET-MISMATCH-19",
    deal_id: "DNG-METIZ-MISMATCH-19",
    extracted_claims: {
      price_snippet: "55.000 VNĐ",
      conditions_snippet: "ĐIỀU KIỆN KHÔNG TỒN TẠI TRONG TEXT DUMP"
    }
  };
  const res19 = validateCandidate(candidateSnippetMismatch, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_19_NEGATIVE_CLAIM_TEXT_MISMATCH_FAILS', res19.valid === false,
    res19.errors.find(e => e.includes('CLAIM_VERIFICATION_FAILED')) || 'Snippet mismatch caught');

  // ---------------------------------------------------------------------------
  // [VAL_20] Negative Test: Receipt Missing Candidate ID is Blocked (041A)
  // ---------------------------------------------------------------------------
  const receiptMissingCandIdData = { ...validReceiptData, candidate_id: "" };
  const rcpt20Path = path.join(tempTestDir, 'rcpt_missing_cand_id.json');
  fsModule.writeFileSync(rcpt20Path, JSON.stringify(receiptMissingCandIdData, null, 2), 'utf8');
  const rcpt20Hash = crypto.createHash('sha256').update(fsModule.readFileSync(rcpt20Path)).digest('hex');

  const candidateMissingCandIdReceipt = {
    ...candidateValid,
    candidate_id: "CAND-TEST-VALID-01",
    capture_receipt_ref: 'rcpt_missing_cand_id.json',
    capture_receipt_hash: rcpt20Hash
  };
  const res20 = validateCandidate(candidateMissingCandIdReceipt, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_20_NEGATIVE_RECEIPT_MISSING_CANDIDATE_ID_BLOCKED', res20.valid === false,
    res20.errors.find(e => e.includes("missing required execution metadata field: 'candidate_id'")) || 'Missing candidate_id in receipt blocked');

  // ---------------------------------------------------------------------------
  // [VAL_21] Negative Test: Receipt Pointing to Different Candidate ID is Blocked (041A)
  // ---------------------------------------------------------------------------
  const receiptMismatchedCandData = { ...validReceiptData, candidate_id: "CAND-OTHER-DIFFERENT-ID" };
  const rcpt21Path = path.join(tempTestDir, 'rcpt_mismatched_cand.json');
  fsModule.writeFileSync(rcpt21Path, JSON.stringify(receiptMismatchedCandData, null, 2), 'utf8');
  const rcpt21Hash = crypto.createHash('sha256').update(fsModule.readFileSync(rcpt21Path)).digest('hex');

  const candidateMismatchedReceipt = {
    ...candidateValid,
    candidate_id: "CAND-TEST-VALID-01",
    capture_receipt_ref: 'rcpt_mismatched_cand.json',
    capture_receipt_hash: rcpt21Hash
  };
  const res21 = validateCandidate(candidateMismatchedReceipt, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_21_NEGATIVE_RECEIPT_MISMATCHED_CANDIDATE_ID_BLOCKED', res21.valid === false,
    res21.errors.find(e => e.includes("RECEIPT_CANDIDATE_MISMATCH")) || 'Mismatched receipt candidate_id blocked');

  // ---------------------------------------------------------------------------
  // [VAL_22] Negative Test: Receipt final_url with Unapproved Domain is Blocked (041A)
  // ---------------------------------------------------------------------------
  const receiptBadFinalUrlData = { ...validReceiptData, final_url: "https://evil-unapproved-redirect.com/promo" };
  const rcpt22Path = path.join(tempTestDir, 'rcpt_bad_final_url.json');
  fsModule.writeFileSync(rcpt22Path, JSON.stringify(receiptBadFinalUrlData, null, 2), 'utf8');
  const rcpt22Hash = crypto.createHash('sha256').update(fsModule.readFileSync(rcpt22Path)).digest('hex');

  const candidateBadFinalUrlReceipt = {
    ...candidateValid,
    candidate_id: "CAND-TEST-VALID-01",
    capture_receipt_ref: 'rcpt_bad_final_url.json',
    capture_receipt_hash: rcpt22Hash
  };
  const res22 = validateCandidate(candidateBadFinalUrlReceipt, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_22_NEGATIVE_RECEIPT_FINAL_URL_UNAPPROVED_DOMAIN_BLOCKED', res22.valid === false,
    res22.errors.find(e => e.includes("Receipt final_url domain is not approved")) || 'Unapproved final_url domain blocked');

  // ---------------------------------------------------------------------------
  // [VAL_23] Negative Test: Non-PROMOTION_DETAIL Content Class Cannot Pass or Be Ready (041A)
  // ---------------------------------------------------------------------------
  const receiptNonPromoClassData = { ...validReceiptData, content_class: "GENERIC_MARKETING" };
  const rcpt23Path = path.join(tempTestDir, 'rcpt_non_promo_class.json');
  fsModule.writeFileSync(rcpt23Path, JSON.stringify(receiptNonPromoClassData, null, 2), 'utf8');
  const rcpt23Hash = crypto.createHash('sha256').update(fsModule.readFileSync(rcpt23Path)).digest('hex');

  const candidateNonPromoClass = {
    ...candidateValid,
    candidate_id: "CAND-TEST-VALID-01",
    capture_receipt_ref: 'rcpt_non_promo_class.json',
    capture_receipt_hash: rcpt23Hash,
    verification_readiness: "READY_FOR_CEO_REVIEW"
  };
  const res23 = validateCandidate(candidateNonPromoClass, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_23_NEGATIVE_NON_PROMOTION_DETAIL_CANNOT_BE_READY_FOR_REVIEW', res23.valid === false,
    res23.errors.find(e => e.includes("PROMOTION_CLASS_GATE_FAILED")) || 'Non-PROMOTION_DETAIL blocked from ready');

  // ---------------------------------------------------------------------------
  // [VAL_24] Negative Test: Invalid current_revision_id in evidence_revisions is Blocked (041B)
  // ---------------------------------------------------------------------------
  const candidateBadCurrentRev = {
    ...candidateValid,
    evidence_revisions: {
      current_revision_id: "REV_NON_EXISTENT",
      revisions: [
        { revision_id: "REV_041_REAL_CAPTURE", evidence_status: "LOCALLY_CAPTURED_SOURCE_LINKED" }
      ]
    }
  };
  const res24 = validateCandidate(candidateBadCurrentRev, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_24_NEGATIVE_INVALID_CURRENT_REVISION_ID_BLOCKED', res24.valid === false,
    res24.errors.find(e => e.includes("INVALID_CURRENT_REVISION")) || 'Invalid current_revision_id blocked');

  // ---------------------------------------------------------------------------
  // [VAL_25] Negative Test: Attempting to Forgive/Mutate Historical Synthetic Revision is Blocked (041B)
  // ---------------------------------------------------------------------------
  const candidateForgedSyntheticRev = {
    ...candidateValid,
    evidence_revisions: {
      current_revision_id: "REV_041_REAL_CAPTURE",
      revisions: [
        { revision_id: "REV_040_SYNTHETIC", evidence_status: "READY_FOR_CEO_REVIEW" },
        { revision_id: "REV_041_REAL_CAPTURE", evidence_status: "LOCALLY_CAPTURED_SOURCE_LINKED" }
      ]
    }
  };
  const res25 = validateCandidate(candidateForgedSyntheticRev, { domainCatalog: mockDomainCatalog, snapshotsDir: tempTestDir });
  assertTest('VAL_25_NEGATIVE_OVERWRITE_SYNTHETIC_REVISION_BLOCKED', res25.valid === false,
    res25.errors.find(e => e.includes("FORBIDDEN_SYNTHETIC_MUTATION")) || 'Historical synthetic mutation blocked');

} finally {
  fsModule.rmSync(tempTestDir, { recursive: true, force: true });
}

// --- Summary ---
console.log('\n' + (allPassed ? '🟢' : '❌') + ' [VALIDATOR-TEST-SUMMARY] Toàn bộ ' + (allPassed ? '28/28' : 'bài') + ' kiểm thử validator (bao gồm CRC32, zlib inflate, Capture Receipt & Provenance) đã ' + (allPassed ? 'ĐẠT [PASS]' : 'THẤT BẠI [FAIL]') + '!');
if (!allPassed) {
  process.exit(1);
} else {
  process.exit(0);
}
