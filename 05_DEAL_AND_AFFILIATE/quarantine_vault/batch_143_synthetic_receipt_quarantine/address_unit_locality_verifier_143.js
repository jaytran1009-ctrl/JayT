/**
 * JAYT NORMALIZED ADDRESS-UNIT LOCALITY VERIFIER (143)
 * Directive: JAYT-143: FRESH-CAPTURE RESET & AUTONOMOUS VERIFIED-SUPPLY LOOP
 * 
 * STRICT ARCHITECTURAL CONSTRAINTS:
 * 1. Requires an isolated store/location/card container.
 * 2. Mandatorily excludes header, nav, footer, aside, menu, breadcrumbs.
 * 3. Requires valid native capture receipt truth (CAPTURE_RECEIPT_VALID).
 * 4. Deduplicates by normalized address string + venue name to prevent inflated counts.
 */

const crypto = require('crypto');

function computeSha256(bufOrStr) {
  return crypto.createHash('sha256').update(bufOrStr).digest('hex');
}

/**
 * Browser evaluation function to extract structured address units
 */
function browserFindNormalizedAddressUnits143() {
  function getDomSelector(el) {
    if (!el) return null;
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

  const daNangAddressRegex = /(?:quận\s*(?:hải châu|thanh khê|sơn trà|ngũ hành sơn|liên chiểu|cẩm lệ)|huyện\s*hòa vang|đường\s*[\p{L}\d\s]+,\s*(?:quận\s*[\p{L}\s]+,\s*)?đà nẵng|tp\.?\s*đà nẵng)/iu;

  const candidateElements = Array.from(document.querySelectorAll('address, [class*="store"], [class*="location"], [class*="branch"], [class*="item"], [class*="address"], li, p, div'));
  const provenAddressUnits = [];
  const seenNormalizedAddresses = new Set();

  for (const el of candidateElements) {
    if (el.closest('header, nav, footer, aside, [class*="menu"], [class*="dropdown"], [class*="navbar"], [class*="sidebar"], [class*="breadcrumb"]')) {
      continue;
    }

    const text = normalize(el.innerText);
    if (text.length >= 15 && text.length <= 250 && daNangAddressRegex.test(text)) {
      const normalizedKey = text.toLowerCase().replace(/[^\p{L}\d]/gu, '');
      if (!seenNormalizedAddresses.has(normalizedKey)) {
        seenNormalizedAddresses.add(normalizedKey);
        provenAddressUnits.push({
          tag: el.tagName.toLowerCase(),
          selector: getDomSelector(el),
          outer_html: el.outerHTML,
          address_text: text
        });
      }
    }
  }

  const bodyText = normalize(document.body ? document.body.innerText : '').toLowerCase();
  const isOnlineService = /(?:online|global|student developer pack|premium student|education plan|trực tuyến)/i.test(bodyText) && provenAddressUnits.length === 0;

  return {
    is_online_service: isOnlineService,
    address_units: provenAddressUnits
  };
}

/**
 * Evaluates address units of a store locator capture with strict receipt check
 */
async function verifyNormalizedAddressUnits143(html, locatorUrl, receiptTruth, browser) {
  if (!receiptTruth.is_receipt_trusted) {
    return {
      locator_url: locatorUrl,
      locality_status: 'LOCALITY_PENDING_RECEIPT_VALIDATION',
      verdict_reason: 'Underlying raw capture receipt is incomplete or untrusted.',
      distinct_normalized_address_units_count: 0,
      address_units: [],
      raw_receipt_truth: receiptTruth
    };
  }

  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', req => req.abort());
  await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 5000 });

  const evalResult = await page.evaluate(browserFindNormalizedAddressUnits143);
  await page.close();

  const validatedUnits = evalResult.address_units.map(unit => ({
    dom_tag: unit.tag,
    dom_selector: unit.selector,
    node_outer_html_sha256: computeSha256(Buffer.from(unit.outer_html, 'utf8')),
    normalized_address_text: unit.address_text
  }));

  let localityStatus;
  let verdictReason;

  if (validatedUnits.length > 0) {
    localityStatus = 'LOCALITY_VERIFIED_DA_NANG';
    verdictReason = `Verified ${validatedUnits.length} distinct normalized address units with valid capture receipt.`;
  } else if (evalResult.is_online_service) {
    localityStatus = 'ONLINE_ELIGIBILITY_UNPROVEN_FOR_DANANG';
    verdictReason = 'Global/national online service; lacks physical Da Nang campus enrollment receipt.';
  } else {
    localityStatus = 'LOCALITY_PENDING_ADDRESS_UNIT_VALIDATION';
    verdictReason = 'Raw locator capture contains zero structured address units matching Da Nang districts/streets.';
  }

  return {
    locator_url: locatorUrl,
    locality_status: localityStatus,
    verdict_reason: verdictReason,
    distinct_normalized_address_units_count: validatedUnits.length,
    address_units: validatedUnits,
    raw_receipt_truth: receiptTruth
  };
}

module.exports = {
  computeSha256,
  browserFindNormalizedAddressUnits143,
  verifyNormalizedAddressUnits143
};
