/**
 * JAYT CANONICAL CARD NORMALIZER & PROVENANCE ENGINE (141W)
 * Directive: JAYT-141W — CANONICAL CARD DEDUPLICATION & DOMINO’S OFFICIAL LEAF BATCH
 * 
 * STRICT ARCHITECTURAL CONSTRAINTS:
 * 1. Single canonical card per leaf URL (deduplicates nested wrappers, col-*, card-body, h2, img).
 * 2. Re-verifiable CSS selector with 100% outerHTML SHA-256 matching.
 * 3. Dedicated node price extraction with strict currency token boundaries (rejects ambiguous "1 đ").
 * 4. Strict link validation: rejects javascript:, mailto:, #, generic listing indices, external origins.
 * 5. Full field provenance with child node selectors.
 * 6. 5-Tier Delta Classification.
 */

const crypto = require('crypto');
const puppeteer = require('puppeteer');

const NORMALIZER_VERSION = 'v141w_canonical_card_dedup_v1';

function computeSha256(strOrBuf) {
  return crypto.createHash('sha256').update(strOrBuf).digest('hex');
}

function normalizeText(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/[ \t]+/g, ' ')
    .trim();
}

/**
 * Validates and resolves canonical leaf URL
 */
function resolveAndValidateLeafUrl(rawHref, baseUrl) {
  if (!rawHref || typeof rawHref !== 'string') return { valid: false, reason: 'EMPTY_URL' };

  const trimmed = rawHref.trim();

  // Reject invalid protocols and fragments
  if (
    trimmed.startsWith('javascript:') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:') ||
    trimmed.startsWith('#') ||
    trimmed === ''
  ) {
    return { valid: false, reason: 'INVALID_PROTOCOL_OR_FRAGMENT' };
  }

  let absoluteUrl;
  try {
    absoluteUrl = new URL(trimmed, baseUrl).href;
  } catch (err) {
    return { valid: false, reason: 'INVALID_URL_SYNTAX' };
  }

  try {
    const baseObj = new URL(baseUrl);
    const leafObj = new URL(absoluteUrl);

    // Reject generic homepages and root
    if (leafObj.pathname === '/' || leafObj.pathname === '') {
      return { valid: false, reason: 'GENERIC_HOMEPAGE' };
    }

    // Reject generic listing indices
    const genericPaths = ['/khuyen-mai', '/khuyen-mai/', '/uu-dai', '/uu-dai/', '/promotions', '/promotions/'];
    if (genericPaths.includes(leafObj.pathname)) {
      return { valid: false, reason: 'GENERIC_CATEGORY_INDEX' };
    }

    // Check same origin or subdomain
    const isSameOrigin = (leafObj.hostname === baseObj.hostname || leafObj.hostname.endsWith('.' + baseObj.hostname));
    if (!isSameOrigin) {
      return { valid: false, reason: 'EXTERNAL_NON_WHITELISTED_ORIGIN' };
    }

    return {
      valid: true,
      resolved_url: absoluteUrl
    };
  } catch (e) {
    return { valid: false, reason: 'PARSING_ERROR' };
  }
}

/**
 * Validates price token and rejects ambiguous numbers like "1 đ" from "mua 1 tặng 1"
 */
function extractAndValidatePrice(priceText) {
  if (!priceText || typeof priceText !== 'string') return { price: null, flags: [] };

  const norm = normalizeText(priceText);

  // Reject ambiguous patterns like "1 đ", "1đ" if preceded by "tặng" or "mua"
  if (/(?:mua|tặng|thêm)\s*1\s*(?:đ|₫|vnđ|vnd)?/i.test(norm)) {
    return { price: null, flags: ['AMBIGUOUS_NUMERIC_TOKEN'] };
  }

  // Exact complete currency pattern (e.g. 45.000đ, 120.000 VND)
  const currencyMatch = norm.match(/(?:^|\s)\d{1,3}(?:\.\d{3})+\s*(?:đ|₫|vnđ|vnd)(?:\s|$|[.,;!])/i);
  if (currencyMatch) {
    return { price: currencyMatch[0].trim(), flags: ['EXACT_CURRENCY_TOKEN'] };
  }

  // Exact k pattern (e.g. 45k, 99k, 39k)
  const kMatch = norm.match(/(?:^|\s)\d{2,3}\s*[kK](?:\s|$|[.,;!])/i);
  if (kMatch) {
    return { price: kMatch[0].trim(), flags: ['K_NUMERIC_TOKEN'] };
  }

  // Percent discount (e.g. giảm 50%)
  const discountMatch = norm.match(/(?:^|\s)giảm\s*\d{1,2}%(?:\s|$|[.,;!])/i);
  if (discountMatch) {
    return { price: discountMatch[0].trim(), flags: ['PERCENT_DISCOUNT_TOKEN'] };
  }

  // Đồng giá pattern (e.g. đồng giá 39k, đồng giá 45.000đ)
  const dongGiaMatch = norm.match(/(?:^|\s)đồng giá\s*\d+(?:\.\d{3})*k?(?:\s|$|[.,;!])/i);
  if (dongGiaMatch) {
    return { price: dongGiaMatch[0].trim(), flags: ['DONG_GIA_TOKEN'] };
  }

  return { price: null, flags: [] };
}

/**
 * Browser evaluation function executed in browser DOM context
 */
function browserCanonicalCardExtraction(baseUrl) {
  function getDomSelector(el) {
    if (el.id) return '#' + CSS.escape(el.id);
    const path = [];
    let curr = el;
    while (curr && curr.nodeType === Node.ELEMENT_NODE && curr.tagName.toLowerCase() !== 'html') {
      const tag = curr.tagName.toLowerCase();
      let selector = tag;
      if (curr.className && typeof curr.className === 'string' && curr.className.trim()) {
        const firstClass = curr.className.trim().split(/\s+/)[0];
        if (firstClass && !firstClass.includes(':') && !firstClass.includes('[')) {
          selector += '.' + CSS.escape(firstClass);
        }
      }
      if (curr.parentElement) {
        const siblings = Array.from(curr.parentElement.children).filter(c => c.tagName === curr.tagName);
        if (siblings.length > 1) {
          const index = siblings.indexOf(curr) + 1;
          selector += ':nth-of-type(' + index + ')';
        }
      }
      path.unshift(selector);
      curr = curr.parentElement;
    }
    return path.join(' > ');
  }

  function normalize(t) {
    return (t || '').replace(/\s+/g, ' ').trim();
  }

  // 1. Extract Page-Level Unbound Signals (nav, menu, footer, account)
  const unboundElements = Array.from(document.querySelectorAll('nav, header, footer, [class*="menu"], [class*="account"], [class*="login"], [class*="ticket"]'));
  const unboundSignals = [];
  for (const el of unboundElements) {
    const text = normalize(el.innerText);
    if (text && text.length > 2 && text.length < 80) {
      unboundSignals.push(text);
    }
  }

  // 2. Locate container candidates (excluding layout columns, grids, wrappers)
  const allContainers = Array.from(document.querySelectorAll('article, [class*="promo-card"], [class*="card-promo"], [class*="promo-item"], [class*="deal-item"], [class*="news-item"], .card, [data-offer-id]'));
  
  // Filter out containers inside nav/header/footer or layout columns
  const validContainers = allContainers.filter(c => {
    if (c.closest('nav, header, footer, [class*="user-menu"], [class*="account"]')) return false;
    const cls = (c.className || '').toString();
    if (/(?:col-|row|grid|wrapper|container)/i.test(cls) && !/(?:promo|deal|card|offer)/i.test(cls)) return false;
    return true;
  });

  // Filter out nested container duplications: if container A contains container B, keep the inner specific card
  const deduplicatedContainers = validContainers.filter(parent => {
    const parentLink = parent.querySelector('a[href]');
    const parentHref = parentLink ? parentLink.getAttribute('href') : null;
    if (!parentHref) return false;

    const childContainers = validContainers.filter(child => child !== parent && parent.contains(child));
    if (childContainers.length === 0) return true;

    // Discard parent if child has link
    const childHasSameLink = childContainers.some(child => {
      const childLink = child.querySelector('a[href]');
      return childLink && childLink.getAttribute('href') === parentHref;
    });

    return !childHasSameLink;
  });

  const cards = [];
  let index = 0;

  for (const c of deduplicatedContainers) {
    const linkEl = c.querySelector('a[href]');
    const rawHref = linkEl ? linkEl.getAttribute('href') : null;
    
    // Ignore containers without any link or text
    const fullText = normalize(c.innerText);
    if (!fullText || fullText.length < 5) continue;

    index++;
    const selector = getDomSelector(c);
    const outerHtml = c.outerHTML;
    
    // Re-verify selector
    const recheck = Array.from(document.querySelectorAll(selector));
    const revalidationPassed = (recheck.length === 1 && recheck[0] === c);

    // Title extraction
    let title = null;
    let titleProvenance = null;
    const headingEl = c.querySelector('h1, h2, h3, h4, h5, h6, [class*="title"], [class*="name"]');
    if (headingEl) {
      title = normalize(headingEl.innerText);
      titleProvenance = { tag: headingEl.tagName.toLowerCase(), selector: getDomSelector(headingEl), text: title };
    } else {
      title = fullText.substring(0, 80);
      titleProvenance = { tag: c.tagName.toLowerCase(), selector, text: title };
    }

    // Price candidate extraction from dedicated node
    let price = null;
    let priceProvenance = null;
    let priceFlags = [];
    const priceCandidates = Array.from(c.querySelectorAll('[class*="price"], [class*="discount"], [class*="amount"], p, span, h4, h5'));
    for (const pEl of priceCandidates) {
      const pText = pEl.innerText;
      if (!pText) continue;
      if (pEl.classList.contains('terms') || pEl.classList.contains('condition') || pEl.classList.contains('note')) continue;

      if (/(?:mua|tặng|thêm)\s*1\s*(?:đ|₫|vnđ|vnd)?/i.test(pText)) {
        priceFlags.push('AMBIGUOUS_NUMERIC_TOKEN');
        continue;
      }

      const currMatch = pText.match(/(?:^|\s)\d{1,3}(?:\.\d{3})+\s*(?:đ|₫|vnđ|vnd)(?:\s|$|[.,;!])/i);
      const kMatch = pText.match(/(?:^|\s)\d{2,3}\s*[kK](?:\s|$|[.,;!])/i);
      const discountMatch = pText.match(/(?:^|\s)giảm\s*\d{1,2}%(?:\s|$|[.,;!])/i);
      const dgMatch = pText.match(/(?:^|\s)đồng giá\s*\d+(?:\.\d{3})*k?(?:\s|$|[.,;!])/i);

      if (currMatch) {
        price = currMatch[0].trim();
        priceProvenance = { tag: pEl.tagName.toLowerCase(), selector: getDomSelector(pEl), text: price };
        break;
      } else if (kMatch) {
        price = kMatch[0].trim();
        priceProvenance = { tag: pEl.tagName.toLowerCase(), selector: getDomSelector(pEl), text: price };
        break;
      } else if (discountMatch) {
        price = discountMatch[0].trim();
        priceProvenance = { tag: pEl.tagName.toLowerCase(), selector: getDomSelector(pEl), text: price };
        break;
      } else if (dgMatch) {
        price = dgMatch[0].trim();
        priceProvenance = { tag: pEl.tagName.toLowerCase(), selector: getDomSelector(pEl), text: price };
        break;
      }
    }

    // Terms & Operational Hours extraction
    let terms = null;
    let termsProvenance = null;
    const termsCandidates = Array.from(c.querySelectorAll('[class*="terms"], [class*="condition"], [class*="note"], [class*="rule"], p, span, li'));
    const termsRegex = /(?:áp dụng|thời gian|điều kiện|hạn sử dụng|từ ngày|đến ngày|\d{1,2}:\d{2}(?::\d{2})?)/i;
    for (const tEl of termsCandidates) {
      if (termsRegex.test(tEl.innerText.toLowerCase()) && !tEl.classList.contains('price')) {
        terms = normalize(tEl.innerText);
        termsProvenance = { tag: tEl.tagName.toLowerCase(), selector: getDomSelector(tEl), text: terms };
        break;
      }
    }

    // Validity extraction
    let validity = null;
    let validityProvenance = null;
    const validityRegex = /(?:từ ngày|đến ngày|hạn sử dụng|hết hạn|thứ \d|hằng tuần|hàng tuần|\d{1,2}\/\d{1,2}(?:\/\d{4})?)[\s\S]{0,40}/i;
    if (validityRegex.test(fullText.toLowerCase())) {
      const match = fullText.match(validityRegex);
      validity = match ? normalize(match[0]) : null;
      validityProvenance = { tag: c.tagName.toLowerCase(), selector, text: validity };
    }

    // Scope extraction
    let scope = null;
    let scopeProvenance = null;
    const scopeRegex = /(?:đà nẵng|toàn quốc|hệ thống|chi nhánh)/i;
    if (scopeRegex.test(fullText.toLowerCase())) {
      const match = fullText.match(scopeRegex);
      scope = match ? match[0] : null;
      scopeProvenance = { tag: c.tagName.toLowerCase(), selector, text: scope };
    }

    const cardType = (price && rawHref) ? 'CANONICAL_OFFER_CARD' : 'CANONICAL_DISCOVERY_CARD';

    cards.push({
      card_id: `CARD_${index}`,
      card_type: cardType,
      container_selector: selector,
      raw_href: rawHref,
      outer_html: outerHtml,
      revalidation_passed: revalidationPassed,
      visible_text: fullText.substring(0, 300),
      price_flags: priceFlags,
      field_provenance: {
        title: titleProvenance,
        price: priceProvenance,
        terms: termsProvenance,
        validity: validityProvenance,
        scope: scopeProvenance
      }
    });
  }

  // 3. Clean full page visible text
  const cloneBody = document.body.cloneNode(true);
  const scripts = cloneBody.querySelectorAll('script, style, noscript, iframe, svg, [id*="onetrust"], [id*="fb-root"]');
  scripts.forEach(s => s.remove());
  const pageVisibleText = normalize(cloneBody.innerText);

  return {
    page_visible_text: pageVisibleText,
    page_level_unbound_signals: Array.from(new Set(unboundSignals)).slice(0, 20),
    cards
  };
}

/**
 * Creates Structured Canonical Card Snapshot (141W)
 */
async function createCanonicalCardSnapshot(html, baseUrl, browserInstance = null) {
  let shouldCloseBrowser = false;
  let browser = browserInstance;

  if (!browser) {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    shouldCloseBrowser = true;
  }

  try {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', req => req.abort());
    await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 5000 });

    const rawResult = await page.evaluate(browserCanonicalCardExtraction, baseUrl);
    await page.close();

    // Deduplicate by resolved canonical_leaf_url
    const seenLeafUrls = new Set();
    const deduplicatedCards = [];

    for (const card of rawResult.cards) {
      const urlValidation = resolveAndValidateLeafUrl(card.raw_href, baseUrl);
      const leafUrlKey = urlValidation.valid ? urlValidation.resolved_url : `UNRESOLVED_${card.container_selector}`;

      if (seenLeafUrls.has(leafUrlKey)) {
        continue; // Skip duplicate leaf URL inside same source
      }
      seenLeafUrls.add(leafUrlKey);

      const outerHtmlSha = computeSha256(Buffer.from(card.outer_html, 'utf8'));

      deduplicatedCards.push({
        card_id: card.card_id,
        card_type: card.card_type,
        container_selector: card.container_selector,
        outer_html_sha256: outerHtmlSha,
        selector_revalidation_passed: card.revalidation_passed,
        canonical_leaf_url: urlValidation.valid ? urlValidation.resolved_url : null,
        url_validation: urlValidation,
        price_flags: card.price_flags,
        card_visible_text: card.visible_text,
        field_provenance: card.field_provenance
      });
    }

    const snapshotPayload = JSON.stringify({
      version: NORMALIZER_VERSION,
      page_text: rawResult.page_visible_text,
      cards: deduplicatedCards
    });

    const semanticSha256 = computeSha256(Buffer.from(snapshotPayload, 'utf8'));

    return {
      normalizer_version: NORMALIZER_VERSION,
      semantic_content_sha256: semanticSha256,
      visible_text_length: rawResult.page_visible_text.length,
      visible_text_sample: rawResult.page_visible_text.substring(0, 300),
      page_level_unbound_signals: rawResult.page_level_unbound_signals,
      canonical_offer_cards: deduplicatedCards.filter(c => c.card_type === 'CANONICAL_OFFER_CARD'),
      canonical_discovery_cards: deduplicatedCards.filter(c => c.card_type === 'CANONICAL_DISCOVERY_CARD'),
      canonical_offer_cards_count: deduplicatedCards.filter(c => c.card_type === 'CANONICAL_OFFER_CARD').length,
      canonical_discovery_cards_count: deduplicatedCards.filter(c => c.card_type === 'CANONICAL_DISCOVERY_CARD').length
    };
  } finally {
    if (shouldCloseBrowser && browser) {
      await browser.close();
    }
  }
}

/**
 * Compares Canonical Card Semantic Snapshots (141W)
 */
function compareCanonicalCardSnapshots141W(baseSnap, currSnap, rawBaseHtml, rawCurrHtml) {
  if (!baseSnap || !baseSnap.normalizer_version) {
    return {
      state: 'BASELINE_SEMANTIC_REQUIRED',
      reason: 'Missing baseline canonical card snapshot. Baseline establishment required.'
    };
  }

  const rawBaseSha = computeSha256(Buffer.from(rawBaseHtml || '', 'utf8'));
  const rawCurrSha = computeSha256(Buffer.from(rawCurrHtml || '', 'utf8'));

  if (rawBaseSha === rawCurrSha && baseSnap.semantic_content_sha256 === currSnap.semantic_content_sha256) {
    return {
      state: 'PAGE_RENDER_VARIATION',
      sub_state: 'RAW_AND_SEMANTIC_IDENTICAL',
      reason: 'Both raw HTML and canonical card snapshot are 100% byte-for-byte identical.'
    };
  }

  if (baseSnap.semantic_content_sha256 === currSnap.semantic_content_sha256) {
    return {
      state: 'PAGE_RENDER_VARIATION',
      sub_state: 'RAW_JITTER_SEMANTIC_IDENTICAL',
      reason: 'Raw HTML changed due to DOM/nonce/cookie jitter, but canonical card snapshot is 100% identical.'
    };
  }

  // Check if new canonical leaf URLs discovered inside canonical discovery/offer cards
  const baseLeafUrls = new Set([
    ...(baseSnap.canonical_offer_cards || []).map(c => c.canonical_leaf_url),
    ...(baseSnap.canonical_discovery_cards || []).map(c => c.canonical_leaf_url)
  ].filter(Boolean));

  const currLeafUrls = [
    ...(currSnap.canonical_offer_cards || []).map(c => c.canonical_leaf_url),
    ...(currSnap.canonical_discovery_cards || []).map(c => c.canonical_leaf_url)
  ].filter(Boolean);

  const newLeafUrls = currLeafUrls.filter(u => !baseLeafUrls.has(u));

  if (newLeafUrls.length > 0) {
    return {
      state: 'NEW_OFFICIAL_OFFER_LEAF_DISCOVERED',
      reason: `Discovered ${newLeafUrls.length} new canonical offer leaf URLs with deduplicated DOM card provenance.`,
      new_leaf_urls: newLeafUrls
    };
  }

  // Check if canonical offer cards changed
  const baseCardsStr = JSON.stringify(baseSnap.canonical_offer_cards || []);
  const currCardsStr = JSON.stringify(currSnap.canonical_offer_cards || []);

  if (baseCardsStr !== currCardsStr && (baseSnap.canonical_offer_cards.length > 0 || currSnap.canonical_offer_cards.length > 0)) {
    return {
      state: 'CANONICAL_OFFER_CARD_CHANGED',
      reason: 'Canonical offer card changed within verified DOM container.',
      card_diff: {
        prior_count: baseSnap.canonical_offer_cards.length,
        current_count: currSnap.canonical_offer_cards.length
      }
    };
  }

  return {
    state: 'PAGE_SEMANTIC_CHANGE_UNBOUND',
    reason: 'Page text changed outside canonical cards (e.g. copyright/footer/news copy). 0 canonical offer cards changed.'
  };
}

module.exports = {
  NORMALIZER_VERSION,
  computeSha256,
  normalizeText,
  resolveAndValidateLeafUrl,
  extractAndValidatePrice,
  browserCanonicalCardExtraction,
  createCanonicalCardSnapshot,
  compareCanonicalCardSnapshots141W
};
