/**
 * JAYT FORENSIC EVIDENCE COLLECTOR (R3 RELATIONAL SCOPE ENGINE)
 * Standards:
 * 1. Single-Session Coherence: Same-session HTML + PNG, single timestamp, byte-bound SHA-256 receipt.
 * 2. Container-Scoped Semantic Extraction: Quotes strictly bound within DOM container UTF-8 byte span.
 * 3. Exact UTF-8 Byte Offsets: Calculated on UTF-8 Buffers, re-sliced and byte-verified.
 * 4. Overlap Prevention: Strict non-overlapping quote byte ranges.
 * 5. Pre-Write Gate: HTTP 200, domain allowlist, anti-WAF check, all quotes confirmed before disk write.
 * 6. Post-Write Verification: Disk re-read asserting exact SHA-256 and byte sizes match in-memory.
 * 7. Governance Boundary: Production deployment and affiliate activation remain strictly false.
 *    Audit status strictly: SUBMITTED_CANDIDATE_FOR_CEO_AUDIT (zero self-awarded PASS).
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const BASE_DIR = path.resolve('D:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng');
const EVIDENCE_DIR = path.join(BASE_DIR, '06_TRUST_AND_EVIDENCE/j392/deals');

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function safeResponseHeaders(headers) {
  const allowed = ['content-type', 'date', 'server', 'etag', 'last-modified', 'cache-control'];
  return Object.fromEntries(allowed.filter(key => headers[key]).map(key => [key, headers[key]]));
}

function verifyNonOverlapping(quotes) {
  const ranges = quotes.map(q => ({
    key: q.key,
    start: q.byte_offset_start,
    end: q.byte_offset_end
  }));

  for (let i = 0; i < ranges.length; i++) {
    for (let j = i + 1; j < ranges.length; j++) {
      const a = ranges[i];
      const b = ranges[j];
      const overlaps = Math.max(a.start, b.start) < Math.min(a.end, b.end);
      if (overlaps) {
        throw new Error(`OVERLAP_VIOLATION: Quote '${a.key}' [${a.start}..${a.end}] overlaps with '${b.key}' [${b.start}..${b.end}]`);
      }
    }
  }
  return true;
}

function extractContainerAndQuotes({ fullBuf, containerHtml, quotesConfig }) {
  const containerBuf = Buffer.from(containerHtml, 'utf8');
  const cStart = fullBuf.indexOf(containerBuf);
  if (cStart === -1) {
    throw new Error('CONTAINER_NOT_FOUND_IN_FULL_HTML: Container outerHTML buffer does not exist in rendered page buffer.');
  }
  const cEnd = cStart + containerBuf.length;

  const quoteResults = {};
  const quoteListForOverlap = [];

  for (const [key, expectedQuote] of Object.entries(quotesConfig)) {
    const qBuf = Buffer.from(expectedQuote, 'utf8');
    const relIdx = containerBuf.indexOf(qBuf);
    if (relIdx === -1) {
      throw new Error(`QUOTE_NOT_FOUND_IN_CONTAINER: Quote '${key}' ("${expectedQuote}") was not found inside container.`);
    }

    const absStart = cStart + relIdx;
    const absEnd = absStart + qBuf.length;

    if (absStart < cStart || absEnd > cEnd) {
      throw new Error(`CONTAINER_BOUNDS_VIOLATION: Quote '${key}' [${absStart}..${absEnd}] extends outside container span [${cStart}..${cEnd}].`);
    }

    // Byte-for-byte re-slice assertion
    const reSliced = fullBuf.subarray(absStart, absEnd);
    if (!reSliced.equals(qBuf)) {
      throw new Error(`BYTE_PARITY_FAILURE: Re-sliced buffer does not match quote buffer for '${key}'.`);
    }

    const quoteEntry = {
      key,
      quote_text: expectedQuote,
      byte_offset_start: absStart,
      byte_offset_end: absEnd,
      byte_length: qBuf.length,
      container_relative_start: relIdx,
      container_relative_end: relIdx + qBuf.length,
      within_container_span: true
    };

    quoteResults[key] = quoteEntry;
    quoteListForOverlap.push(quoteEntry);
  }

  // Enforce zero overlap
  verifyNonOverlapping(quoteListForOverlap);

  return {
    container_byte_span: {
      start: cStart,
      end: cEnd,
      length: containerBuf.length
    },
    quote_byte_offsets: quoteResults
  };
}

async function captureSingleSession({
  browser,
  captureId,
  targetId,
  brandId,
  requestedUrl,
  domainAllowlist,
  containerSelector,
  quotesConfig,
  fileBasename,
  scrollToSelector = true
}) {
  console.log(`\n======================================================`);
  console.log(`[START CAPTURE] ${captureId}`);
  console.log(`  Target: ${targetId} (${brandId})`);
  console.log(`  URL: ${requestedUrl}`);
  console.log(`======================================================`);

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  let firstResponse = null;
  page.on('response', res => {
    if (!firstResponse && res.url() === requestedUrl) {
      firstResponse = res;
    }
  });

  const captureStartUtc = new Date().toISOString();
  const res = await page.goto(requestedUrl, { waitUntil: 'networkidle2', timeout: 45000 });
  const finalUrl = page.url();
  const rawHeaders = res ? res.headers() : {};
  const HEADER_ALLOWLIST = ['content-type', 'date', 'server', 'etag', 'last-modified', 'cache-control'];
  const responseHeaders = {};
  for (const h of HEADER_ALLOWLIST) {
    if (rawHeaders[h]) {
      responseHeaders[h] = rawHeaders[h];
    }
  }

  console.log(`  HTTP Status: ${httpStatus}`);
  console.log(`  Final URL: ${finalUrl}`);

  // PRE-WRITE GATE 1: HTTP Status must equal 200
  if (httpStatus !== 200) {
    await page.close();
    throw new Error(`PRE_WRITE_GATE_FAILED: HTTP status ${httpStatus} !== 200 for ${requestedUrl}`);
  }

  // PRE-WRITE GATE 2: Origin must match allowlist
  const finalHostname = new URL(finalUrl).hostname.toLowerCase();
  const isAllowedDomain = domainAllowlist.some(d => finalHostname === d || finalHostname.endsWith('.' + d));
  if (!isAllowedDomain) {
    await page.close();
    throw new Error(`PRE_WRITE_GATE_FAILED: Final hostname ${finalHostname} not in allowlist [${domainAllowlist.join(', ')}]`);
  }

  // PRE-WRITE GATE 3: Reject WAF challenge or consent wall
  const pageTitle = await page.title();
  const bodyText = await page.evaluate(() => document.body.innerText);
  if (/cloudflare|ddos-guard|challenge-platform|please wait|robot|captcha/i.test(pageTitle) ||
      /verify you are human|unusual traffic/i.test(bodyText.substring(0, 1000))) {
    await page.close();
    throw new Error(`PRE_WRITE_GATE_FAILED: WAF challenge or bot interception detected on ${requestedUrl}`);
  }

  // Scroll into view & unhide animations for optimal visual evidence
  if (scrollToSelector && containerSelector) {
    await page.evaluate(sel => {
      const el = document.querySelector(sel);
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'center' });
        const hidden = el.querySelectorAll('[style*="visibility: hidden"]');
        for (const h of hidden) {
          h.style.visibility = 'visible';
        }
      }
    }, containerSelector);
    // Brief pause for scroll rendering
    await new Promise(r => setTimeout(r, 800));
  }

  // Extract container HTML
  const containerHtml = await page.evaluate(sel => {
    const el = document.querySelector(sel);
    return el ? el.outerHTML : null;
  }, containerSelector);

  if (!containerHtml) {
    await page.close();
    throw new Error(`PRE_WRITE_GATE_FAILED: Container selector '${containerSelector}' not found in DOM.`);
  }

  // Capture rendered HTML and PNG in same session
  const domSnapshotUtc = new Date().toISOString();
  const rawHtml = await page.content();
  const fullBuf = Buffer.from(rawHtml, 'utf8');

  const screenshotUtc = new Date().toISOString();
  const pngBuf = await page.screenshot({ fullPage: false });
  const captureEndUtc = new Date().toISOString();

  await page.close();

  // PRE-WRITE GATE 4: Extract and mathematically verify quotes strictly inside container
  console.log(`  Evaluating container span and quotes...`);
  const extraction = extractContainerAndQuotes({
    fullBuf,
    containerHtml,
    quotesConfig
  });
  console.log(`  Container span: [${extraction.container_byte_span.start} .. ${extraction.container_byte_span.end}] (${extraction.container_byte_span.length} bytes)`);
  for (const [k, q] of Object.entries(extraction.quote_byte_offsets)) {
    console.log(`  Quote '${k}': rel=[${q.container_relative_start}..${q.container_relative_end}] abs=[${q.byte_offset_start}..${q.byte_offset_end}] length=${q.byte_length}`);
  }

  // In-memory hashes
  const memHtmlSha = sha256(fullBuf);
  const memPngSha = sha256(pngBuf);

  // WRITE TO DISK
  if (!fs.existsSync(EVIDENCE_DIR)) {
    fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
  }

  const htmlFilename = `${fileBasename}.html`;
  const pngFilename = `${fileBasename}.png`;
  const htmlPath = path.join(EVIDENCE_DIR, htmlFilename);
  const pngPath = path.join(EVIDENCE_DIR, pngFilename);

  console.log(`  Writing raw HTML to: ${htmlPath}`);
  fs.writeFileSync(htmlPath, fullBuf);
  console.log(`  Writing PNG screenshot to: ${pngPath}`);
  fs.writeFileSync(pngPath, pngBuf);

  // POST-WRITE VERIFICATION: Re-read disk files and assert byte size and SHA-256 parity
  const diskHtml = fs.readFileSync(htmlPath);
  const diskPng = fs.readFileSync(pngPath);
  const diskHtmlSha = sha256(diskHtml);
  const diskPngSha = sha256(diskPng);

  if (diskHtml.length !== fullBuf.length || diskHtmlSha !== memHtmlSha) {
    throw new Error(`POST_WRITE_VERIFICATION_FAILED: HTML disk copy (${diskHtml.length}b, ${diskHtmlSha}) does not match memory (${fullBuf.length}b, ${memHtmlSha})`);
  }
  if (diskPng.length !== pngBuf.length || diskPngSha !== memPngSha) {
    throw new Error(`POST_WRITE_VERIFICATION_FAILED: PNG disk copy (${diskPng.length}b, ${diskPngSha}) does not match memory (${pngBuf.length}b, ${memPngSha})`);
  }
  console.log(`  Post-write disk verification: 100% byte and hash parity confirmed!`);

  return {
    capture_id: captureId,
    target_id: targetId,
    brand_id: brandId,
    requested_url: requestedUrl,
    final_url: finalUrl,
    http_status: httpStatus,
    response_headers: safeResponseHeaders(responseHeaders),
    timing: {
      capture_start_utc: captureStartUtc,
      dom_snapshot_utc: domSnapshotUtc,
      screenshot_utc: screenshotUtc,
      capture_end_utc: captureEndUtc,
      single_session_coherence: true
    },
    container_selector: containerSelector,
    container_byte_span: extraction.container_byte_span,
    quote_byte_offsets: extraction.quote_byte_offsets,
    artifacts: {
      raw_html: {
        file_name: htmlFilename,
        relative_path: `06_TRUST_AND_EVIDENCE/j392/deals/${htmlFilename}`,
        size_bytes: diskHtml.length,
        sha256: diskHtmlSha
      },
      screenshot: {
        file_name: pngFilename,
        relative_path: `06_TRUST_AND_EVIDENCE/j392/deals/${pngFilename}`,
        size_bytes: diskPng.length,
        sha256: diskPngSha,
        dimensions: { width: 1440, height: 900 }
      }
    },
    post_write_html_sha256: diskHtmlSha,
    post_write_png_sha256: diskPngSha,
    non_overlapping_verified: true,
    content_hygiene: {
      verified: true,
      waf_challenge_detected: false,
      issues: []
    }
  };
}

async function runCollector() {
  console.log('Starting JayT Forensic Evidence Collector (R3 Relational Scope Engine)...');
  const runTimestamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, '');

  // Launch standard Puppeteer (no --no-sandbox on Windows)
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1440, height: 900 }
  });

  try {
    // =========================================================================
    // 1. GALAXY CINEMA HAPPY DAY CAPTURE (Container: div.content__data__full)
    // =========================================================================
    const galaxyResult = await captureSingleSession({
      browser,
      captureId: `CAPT_GALAXY_HAPPY_DAY_R3_${runTimestamp}`,
      targetId: 'GALAXY_CINEMA_HAPPY_DAY_DANANG_R3',
      brandId: 'GALAXY_CINEMA',
      requestedUrl: 'https://www.galaxycine.vn/khuyen-mai/happy-day---ve-chi-tu-45k/',
      domainAllowlist: ['galaxycine.vn', 'www.galaxycine.vn'],
      containerSelector: 'div.content__data__full',
      quotesConfig: {
        validity: 'Vào <strong>thứ 3 hàng tuần</strong>',
        offer: 'giá vé <strong>CHỈ TỪ 45K.</strong>',
        scope: 'Galaxy Đà Nẵng',
        terms: 'Áp dụng Thứ Ba hàng tuần cho tất cả khách hàng.'
      },
      fileBasename: `deal_04_galaxy_happy_day_r3_${runTimestamp}`,
      scrollToSelector: true
    });

    const galaxyReceipt = {
      schema_version: '3.0.0-r3',
      work_order_id: 'WORK_ORDER_J392_R3_RELATIONAL_SCOPE_EVIDENCE',
      audit_status: 'SUBMITTED_CANDIDATE_FOR_CEO_AUDIT',
      ...galaxyResult,
      governance: {
        is_approved: false,
        production_deployment_authorized: false,
        production_alias_mutation_authorized: false,
        affiliate_enabled: false,
        destructive_deletion_authorized: false
      }
    };

    const galaxyReceiptPath = path.join(EVIDENCE_DIR, `deal_04_galaxy_happy_day_r3_${runTimestamp}_RECEIPT.json`);
    fs.writeFileSync(galaxyReceiptPath, JSON.stringify(galaxyReceipt, null, 2), 'utf8');
    console.log(`[SAVED] Galaxy Receipt: ${galaxyReceiptPath}`);

    // =========================================================================
    // 2. METIZ CINEMA RELATIONAL SCOPE BUNDLE (Linked Artifacts)
    // =========================================================================

    // ARTIFACT A: Offer Artifact
    const metizOfferResult = await captureSingleSession({
      browser,
      captureId: `CAPT_METIZ_U22_OFFER_R3_${runTimestamp}`,
      targetId: 'METIZ_CINEMA_U22_OFFER_R3',
      brandId: 'METIZ_CINEMA',
      requestedUrl: 'https://metiz.vn/promotion/khuyen-mai-gia-ve-u22-21.html',
      domainAllowlist: ['metiz.vn', 'www.metiz.vn'],
      containerSelector: 'div.blog-item-info',
      quotesConfig: {
        offer: 'Áp dụng giá vé 2D chỉ 55.000đ cho thành viên Metiz Cinema từ 22 tuổi trở xuống, đối với mọi suất chiếu tại Metiz Cinema.',
        terms: 'Chương trình chỉ áp dụng cho thành viên Metiz Cinema, dưới 22 tuổi trở xuống.'
      },
      fileBasename: `metiz_u22_offer_r3_${runTimestamp}`,
      scrollToSelector: true
    });

    // ARTIFACT B: Validity Artifact (Card on tin-va-khuyen-mai.html)
    const metizValidityResult = await captureSingleSession({
      browser,
      captureId: `CAPT_METIZ_U22_VALIDITY_R3_${runTimestamp}`,
      targetId: 'METIZ_CINEMA_U22_VALIDITY_R3',
      brandId: 'METIZ_CINEMA',
      requestedUrl: 'https://metiz.vn/tin-va-khuyen-mai.html',
      domainAllowlist: ['metiz.vn', 'www.metiz.vn'],
      containerSelector: 'div.col-md-6.col-lg-3.blog-item-wrap:has(a[href*="khuyen-mai-gia-ve-u22-21.html"])',
      quotesConfig: {
        offer_link: '/promotion/khuyen-mai-gia-ve-u22-21.html',
        validity_date_range: '01/01/2026 - 31/12/2026',
        card_title: 'KHUYẾN MÃI GIÁ VÉ U22'
      },
      fileBasename: `metiz_u22_validity_r3_${runTimestamp}`,
      scrollToSelector: true
    });

    // ARTIFACT C1: Venue Parking Guide (Official announcement on metiz.vn)
    const metizVenueParkingResult = await captureSingleSession({
      browser,
      captureId: `CAPT_METIZ_VENUE_PARKING_R3_${runTimestamp}`,
      targetId: 'METIZ_CINEMA_VENUE_PARKING_R3',
      brandId: 'METIZ_CINEMA',
      requestedUrl: 'https://metiz.vn/news/huong-dan-loi-vao-khu-vuc-giu-xe-metiz-cinema-2.html',
      domainAllowlist: ['metiz.vn', 'www.metiz.vn'],
      containerSelector: 'div.blog-item-info',
      quotesConfig: {
        title: 'HƯỚNG DẪN LỐI VÀO KHU VỰC GIỮ XE METIZ CINEMA',
        street_29: 'Mặt tiền Metiz đường 2/9',
        venue_helio_entry: 'Lối vào tầng hầm Helio Center:',
        venue_helio_basement: 'di chuyển vào TẦNG HẦM HELIO.'
      },
      fileBasename: `metiz_venue_parking_r3_${runTimestamp}`,
      scrollToSelector: true
    });

    // ARTIFACT C2: Venue Review Article (Official review on metiz.vn with Da Nang address)
    const metizVenueReviewResult = await captureSingleSession({
      browser,
      captureId: `CAPT_METIZ_VENUE_REVIEW_R3_${runTimestamp}`,
      targetId: 'METIZ_CINEMA_VENUE_REVIEW_R3',
      brandId: 'METIZ_CINEMA',
      requestedUrl: 'https://metiz.vn/news/review-rap-metiz-cinema-da-nang-co-that-su-dang-xem-nhu-loi-don-10.html',
      domainAllowlist: ['metiz.vn', 'www.metiz.vn'],
      containerSelector: 'div.blog-item-info',
      quotesConfig: {
        title: 'REVIEW RẠP METIZ CINEMA ĐÀ NẴNG: CÓ THẬT SỰ ĐÁNG XEM NHƯ LỜI ĐỒN',
        overview: 'TỔNG QUAN VỀ RẠP METIZ CINEMA ĐÀ NẴNG',
        address: 'Địa điểm: Số 01 Đường 2 Tháng 9, Hải Châu, Đà Nẵng',
        proximity_helio: 'gần helio nên cũm okie'
      },
      fileBasename: `metiz_venue_review_r3_${runTimestamp}`,
      scrollToSelector: true
    });

    // ARTIFACT C0: Contact Page Reference Candidate (Audited candidate showing lack of explicit venue statement)
    const metizContactRefResult = await captureSingleSession({
      browser,
      captureId: `CAPT_METIZ_CONTACT_REF_R3_${runTimestamp}`,
      targetId: 'METIZ_CINEMA_CONTACT_REF_R3',
      brandId: 'METIZ_CINEMA',
      requestedUrl: 'https://metiz.vn/lien-he.html',
      domainAllowlist: ['metiz.vn', 'www.metiz.vn'],
      containerSelector: 'main.main',
      quotesConfig: {
        hotline: 'Hotline: 02363 630 689',
        email: 'contact@metiz.vn'
      },
      fileBasename: `metiz_contact_ref_r3_${runTimestamp}`,
      scrollToSelector: false
    });

    // METIZ RELATIONAL RECEIPT BINDING ALL LINKED ARTIFACTS
    const metizRelationalReceipt = {
      schema_version: '3.0.0-r3',
      work_order_id: 'WORK_ORDER_J392_R3_RELATIONAL_SCOPE_EVIDENCE',
      audit_status: 'SUBMITTED_CANDIDATE_FOR_CEO_AUDIT',
      brand_id: 'METIZ_CINEMA',
      brand_name: 'Metiz Cinema Helio Da Nang',
      relational_binding_summary: {
        binding_logic: 'Artifact B links directly to Artifact A via /promotion/khuyen-mai-gia-ve-u22-21.html and affirms validity period covering 2026-09-11 (01/01/2026 - 31/12/2026). Artifact C1 and C2 from first-party origin metiz.vn explicitly bind Metiz Cinema to Helio Center and Da Nang address. Candidate C0 (lien-he.html) is provided for complete candidate audit transparency.',
        offer_artifact_captured: true,
        validity_artifact_captured: true,
        venue_artifact_captured: true,
        all_from_first_party_origin: true
      },
      linked_artifacts: {
        artifact_a_offer: metizOfferResult,
        artifact_b_validity: {
          ...metizValidityResult,
          relational_link_to_artifact_a: '/promotion/khuyen-mai-gia-ve-u22-21.html'
        },
        artifact_c1_venue_parking: metizVenueParkingResult,
        artifact_c2_venue_review: metizVenueReviewResult,
        artifact_c0_contact_reference: metizContactRefResult
      },
      governance: {
        is_approved: false,
        production_deployment_authorized: false,
        production_alias_mutation_authorized: false,
        affiliate_enabled: false,
        destructive_deletion_authorized: false
      }
    };

    const metizReceiptPath = path.join(EVIDENCE_DIR, `metiz_relational_scope_r3_${runTimestamp}_RECEIPT.json`);
    fs.writeFileSync(metizReceiptPath, JSON.stringify(metizRelationalReceipt, null, 2), 'utf8');
    console.log(`[SAVED] Metiz Relational Receipt: ${metizReceiptPath}`);

    // MASTER SUMMARY RECEIPT FOR DISPATCH J392 R3
    const masterSummary = {
      schema_version: '3.0.0-r3',
      manifest_id: 'JAYT_392_R3_RELATIONAL_SCOPE_EVIDENCE_SUBMISSION',
      work_order_id: 'WORK_ORDER_J392_R3_RELATIONAL_SCOPE_EVIDENCE',
      compiled_at_utc: new Date().toISOString(),
      audit_status: 'SUBMITTED_CANDIDATE_FOR_CEO_AUDIT',
      authority: 'CEO evidence gate following JAYT-392 R2',
      standards_conformance: {
        single_session_coherence: true,
        container_scoped_extraction: true,
        utf8_buffer_offsets: true,
        non_overlapping_quotes: true,
        pre_write_gate_passed: true,
        post_write_parity_passed: true,
        zero_production_mutation: true
      },
      candidates: {
        galaxy_happy_day: {
          receipt_file: path.relative(BASE_DIR, galaxyReceiptPath).replace(/\\/g, '/'),
          receipt_sha256: sha256(fs.readFileSync(galaxyReceiptPath)),
          html_sha256: galaxyResult.artifacts.raw_html.sha256,
          png_sha256: galaxyResult.artifacts.screenshot.sha256,
          container_byte_span: galaxyResult.container_byte_span
        },
        metiz_relational_scope: {
          receipt_file: path.relative(BASE_DIR, metizReceiptPath).replace(/\\/g, '/'),
          receipt_sha256: sha256(fs.readFileSync(metizReceiptPath)),
          artifact_a_html_sha256: metizOfferResult.artifacts.raw_html.sha256,
          artifact_a_png_sha256: metizOfferResult.artifacts.screenshot.sha256,
          artifact_b_html_sha256: metizValidityResult.artifacts.raw_html.sha256,
          artifact_b_png_sha256: metizValidityResult.artifacts.screenshot.sha256,
          artifact_c1_html_sha256: metizVenueParkingResult.artifacts.raw_html.sha256,
          artifact_c1_png_sha256: metizVenueParkingResult.artifacts.screenshot.sha256,
          artifact_c2_html_sha256: metizVenueReviewResult.artifacts.raw_html.sha256,
          artifact_c2_png_sha256: metizVenueReviewResult.artifacts.screenshot.sha256,
          artifact_c0_html_sha256: metizContactRefResult.artifacts.raw_html.sha256,
          artifact_c0_png_sha256: metizContactRefResult.artifacts.screenshot.sha256
        }
      },
      governance: {
        is_approved: false,
        production_deployment_authorized: false,
        production_alias_mutation_authorized: false,
        affiliate_enabled: false,
        destructive_deletion_authorized: false,
        canonical_production_locked_deployment: 'dpl_EY8hrscg5f1tRCG9WeKsHGfSJXUM',
        canonical_production_version: 'v3.444.0-j388'
      }
    };

    const masterSummaryPath = path.join(EVIDENCE_DIR, `JAYT_392_R3_EVIDENCE_SUBMISSION_SUMMARY_${runTimestamp}.json`);
    fs.writeFileSync(masterSummaryPath, JSON.stringify(masterSummary, null, 2), 'utf8');
    console.log(`[SAVED] Master Summary: ${masterSummaryPath}`);

    // Also write a fixed canonical pointer for easy auditing
    const masterCanonicalPath = path.join(EVIDENCE_DIR, 'JAYT_392_R3_EVIDENCE_SUBMISSION_SUMMARY.json');
    fs.writeFileSync(masterCanonicalPath, JSON.stringify(masterSummary, null, 2), 'utf8');
    console.log(`[SAVED] Canonical Master Summary: ${masterCanonicalPath}`);

    console.log('\n======================================================');
    console.log('ALL R3 RELATIONAL CAPTURES COMPLETED SUCCESSFULLY!');
    console.log('STATUS: SUBMITTED_CANDIDATE_FOR_CEO_AUDIT');
    console.log('======================================================\n');
  } finally {
    await browser.close();
  }
}

runCollector().catch(err => {
  console.error('\nFATAL COLLECTOR ERROR:', err);
  process.exit(1);
});
