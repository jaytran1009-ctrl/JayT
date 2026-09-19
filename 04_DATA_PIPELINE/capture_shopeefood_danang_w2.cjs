'use strict';

/**
 * Retired by JAYT-394: ShopeeFood Da Nang evidence capture.
 *
 * This collector never bypasses a WAF, CAPTCHA, login wall or origin allowlist.
 * It writes no evidence unless one rendered first-party container contains all
 * four semantic predicates and every disk re-read verification passes.
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// JAYT-394 decouples Wave 2 from automated delivery-platform scraping.
// This guard is intentionally checked before launching a browser or requesting a URL.
const CAPTURE_DISABLED_BY_J394 = true;

const TARGET_URL = 'https://shopeefood.vn/da-nang';
const ALLOWED_HOST = 'shopeefood.vn';
const EVIDENCE_DIR = path.resolve(__dirname, '../06_TRUST_AND_EVIDENCE/w2/shopeefood');
const HEADER_ALLOWLIST = ['content-type', 'date', 'server', 'etag', 'last-modified', 'cache-control'];
const WAF_MARKERS = [
  'cf-browser-verification', 'cf-chl-', 'attention required!', 'just a moment',
  'captcha', 'access denied', 'đăng nhập để tiếp tục'
];

const PREDICATES = {
  scope_quote: [/Đà\s*Nẵng/iu],
  service_quote: [/Đặt\s*món\s*trực\s*tuyến/iu, /Đặt\s*món/iu, /Giao\s*đồ\s*ăn/iu, /Giao\s*món\s*tận\s*nơi/iu],
  terms_quote: [/giờ\s*hoạt\s*động/iu, /thời\s*gian\s*hoạt\s*động/iu, /mở\s*cửa/iu],
  validity_quote: [/\b2026\b/u, /đang\s*hoạt\s*động/iu, /cập\s*nhật/iu]
};

function sha256(bytes) {
  return crypto.createHash('sha256').update(bytes).digest('hex');
}

function timestampFileSafe(timestamp) {
  return timestamp.replace(/[:.]/g, '-');
}

function requireCleanNavigation(response, finalUrl, renderedHtml) {
  if (!response || response.status() !== 200) {
    throw new Error(`PREWRITE_HTTP_STATUS_NOT_200:${response ? response.status() : 'NO_RESPONSE'}`);
  }
  const final = new URL(finalUrl);
  if (final.protocol !== 'https:' || final.hostname !== ALLOWED_HOST) {
    throw new Error(`PREWRITE_ORIGIN_NOT_ALLOWED:${finalUrl}`);
  }
  const normalized = renderedHtml.toLowerCase();
  const marker = WAF_MARKERS.find((item) => normalized.includes(item));
  if (marker) throw new Error(`PREWRITE_WAF_OR_LOGIN_MARKER:${marker}`);
}

function firstMatchedQuote(html, patterns) {
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[0]) return match[0];
  }
  return null;
}

function offsetFor(buffer, quote) {
  const quoteBuffer = Buffer.from(quote, 'utf8');
  const start = buffer.indexOf(quoteBuffer);
  if (start < 0) return null;
  const end = start + quoteBuffer.length;
  if (buffer.subarray(start, end).toString('utf8') !== quote) return null;
  return { verbatim_quote: quote, start_byte_offset: start, end_byte_offset: end, byte_length: quoteBuffer.length };
}

async function findScopedContainer(page) {
  return page.evaluate((predicateDefinitions) => {
    const findQuote = (html, patterns) => {
      for (const source of patterns) {
        const match = html.match(new RegExp(source, 'iu'));
        if (match && match[0]) return match[0];
      }
      return null;
    };
    const selectorFor = (element) => {
      if (element.id) return `#${CSS.escape(element.id)}`;
      const classes = [...element.classList].slice(0, 2).map((name) => `.${CSS.escape(name)}`).join('');
      return `${element.tagName.toLowerCase()}${classes}`;
    };
    const candidates = [...document.querySelectorAll('main, [role="main"], article, section, div')]
      .filter((element) => element.outerHTML && element.outerHTML.length >= 80)
      .map((element) => ({ element, html: element.outerHTML }))
      .map(({ element, html }) => {
        const quotes = Object.fromEntries(Object.entries(predicateDefinitions).map(([key, patterns]) => [key, findQuote(html, patterns)]));
        return { element, html, quotes };
      })
      .filter((candidate) => Object.values(candidate.quotes).every(Boolean))
      .sort((a, b) => a.html.length - b.html.length);
    if (!candidates.length) return null;
    const result = candidates[0];
    return { selector: selectorFor(result.element), outer_html: result.html, quotes: result.quotes };
  }, Object.fromEntries(Object.entries(PREDICATES).map(([key, patterns]) => [key, patterns.map((pattern) => pattern.source)])));
}

function sanitizedHeaders(headers) {
  return Object.fromEntries(HEADER_ALLOWLIST.filter((header) => headers[header]).map((header) => [header, headers[header]]));
}

async function capture() {
  if (CAPTURE_DISABLED_BY_J394) {
    throw new Error('J394_SHOPEEFOOD_AUTOMATED_CAPTURE_DISABLED__USER_DRIVEN_COMPARATOR_ONLY');
  }
  const browser = await puppeteer.launch({ headless: true, args: ['--disable-dev-shm-usage'] });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36');

    const response = await page.goto(TARGET_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    const finalUrl = page.url();
    const renderedHtml = await page.content();
    requireCleanNavigation(response, finalUrl, renderedHtml);

    const container = await findScopedContainer(page);
    if (!container) throw new Error('SEMANTIC_GATE_NO_SINGLE_CONTAINER_WITH_ALL_FOUR_PREDICATES');

    const containerBuffer = Buffer.from(container.outer_html, 'utf8');
    const quoteOffsets = Object.fromEntries(Object.entries(container.quotes).map(([key, quote]) => [key, offsetFor(containerBuffer, quote)]));
    if (Object.values(quoteOffsets).some((offset) => !offset)) {
      throw new Error('SEMANTIC_GATE_UTF8_OFFSET_OR_SLICE_PARITY_FAILED');
    }

    const timestamp = new Date().toISOString();
    const tag = timestampFileSafe(timestamp);
    const htmlBuffer = Buffer.from(renderedHtml, 'utf8');
    const screenshotBuffer = await page.screenshot({ fullPage: true, type: 'png' });
    const files = {
      rawHtml: `shopeefood_danang_w2_${tag}.html`,
      containerHtml: `shopeefood_danang_w2_container_${tag}.html`,
      screenshot: `shopeefood_danang_w2_${tag}.png`,
      receipt: 'W2_SHOPEEFOOD_DANANG_RECEIPT.json'
    };

    fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
    fs.writeFileSync(path.join(EVIDENCE_DIR, files.rawHtml), htmlBuffer);
    fs.writeFileSync(path.join(EVIDENCE_DIR, files.containerHtml), containerBuffer);
    fs.writeFileSync(path.join(EVIDENCE_DIR, files.screenshot), screenshotBuffer);

    const disk = Object.fromEntries(Object.entries({ rawHtml: files.rawHtml, containerHtml: files.containerHtml, screenshot: files.screenshot }).map(([key, fileName]) => {
      const bytes = fs.readFileSync(path.join(EVIDENCE_DIR, fileName));
      return [key, { file_name: fileName, size_bytes: bytes.length, sha256: sha256(bytes) }];
    }));
    const rereadContainer = fs.readFileSync(path.join(EVIDENCE_DIR, files.containerHtml));
    for (const offset of Object.values(quoteOffsets)) {
      if (rereadContainer.subarray(offset.start_byte_offset, offset.end_byte_offset).toString('utf8') !== offset.verbatim_quote) {
        throw new Error('POSTWRITE_CONTAINER_QUOTE_REPLAY_FAILED');
      }
    }

    const receipt = {
      receipt_id: 'W2_SHOPEEFOOD_DANANG_RECEIPT',
      capture_id: `CAP_W2_SHOPEEFOOD_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
      requested_url: TARGET_URL,
      final_navigated_url: finalUrl,
      captured_at_utc: timestamp,
      http_status: response.status(),
      response_headers: sanitizedHeaders(response.headers()),
      pre_write_gate: { status_200: true, allowed_origin: true, waf_or_login_bypass_used: false },
      container_scope: { selector: container.selector, sha256: disk.containerHtml.sha256, quote_offset_basis: 'UTF-8 bytes of container artifact' },
      artifacts: disk,
      four_quote_predicates: quoteOffsets,
      serving_boundary: { staging_only: true, production_authorized: false, affiliate_enabled: false },
      audit_status: 'PASS__FIRST_PARTY_CONTAINER_SCOPED_EVIDENCE_READY_FOR_CEO_AUDIT'
    };
    fs.writeFileSync(path.join(EVIDENCE_DIR, files.receipt), JSON.stringify(receipt, null, 2) + '\n', 'utf8');
    console.log(JSON.stringify({ audit_status: receipt.audit_status, receipt: path.relative(process.cwd(), path.join(EVIDENCE_DIR, files.receipt)), artifacts: disk }, null, 2));
  } finally {
    await browser.close();
  }
}

capture().catch((error) => {
  console.error(`CAPTURE_REJECTED:${error.message}`);
  process.exitCode = 1;
});
