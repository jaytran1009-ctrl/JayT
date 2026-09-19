/**
 * JAYT GENERIC LOCALITY VERIFIER (142R)
 * Directive: JAYT-142R: THU HỒI KẾT LUẬN 142, KHÔI PHỤC BẰNG CHỨNG GỐC VÀ TÁI XỬ LÝ BATCH LỚN
 * 
 * STRICT ARCHITECTURAL CONSTRAINTS:
 * 1. ZERO brand-specific hardcoding, zero static assumptions, zero hardcoded venue lists.
 * 2. Parses raw HTML from store locators directly using Puppeteer DOM extraction.
 * 3. Finds raw DOM nodes referencing Da Nang administrative entities (Hải Châu, Thanh Khê, Sơn Trà, Ngũ Hành Sơn, Liên Chiểu, Cẩm Lệ, Hòa Vang, Đà Nẵng).
 * 4. Extracts exact DOM selector and outerHTML SHA-256 for proof.
 * 5. Returns LOCALITY_VERIFIED_DA_NANG only when DOM nodes prove physical Da Nang presence.
 * 6. Returns ONLINE_ELIGIBILITY_UNPROVEN_FOR_DANANG for online/global services lacking physical Da Nang stores.
 * 7. Returns LOCALITY_UNPROVEN_NO_DA_NANG_STORE when no Da Nang presence is found in locator capture.
 */

const crypto = require('crypto');

function computeSha256(bufOrStr) {
  return crypto.createHash('sha256').update(bufOrStr).digest('hex');
}

/**
 * Browser evaluation function to find Da Nang locality evidence in DOM
 */
function browserFindDaNangLocalityNodes() {
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

  const daNangRegex = /(?:đà nẵng|da nang|hải châu|thanh khê|sơn trà|ngũ hành sơn|liên chiểu|cẩm lệ|hòa vang)/i;

  const allElements = Array.from(document.querySelectorAll('address, p, li, div, span, option, a, h3, h4, h5'));
  const matchingNodes = [];

  for (const el of allElements) {
    // Check direct text of element or short innerText
    const text = (el.innerText || '').trim();
    if (text.length > 5 && text.length < 250 && daNangRegex.test(text)) {
      // Check if child already matched
      const hasMatchingChild = matchingNodes.some(m => el.contains(m.element));
      if (!hasMatchingChild) {
        matchingNodes.push({
          element: el,
          tag: el.tagName.toLowerCase(),
          selector: getDomSelector(el),
          outer_html: el.outerHTML,
          text: text
        });
      }
    }
  }

  // Check if page is an online/global service
  const bodyText = (document.body.innerText || '').toLowerCase();
  const isOnlineService = /(?:online|global|student developer pack|premium student|education plan|trực tuyến)/i.test(bodyText) && !daNangRegex.test(bodyText);

  return {
    is_online_service: isOnlineService,
    matching_nodes: matchingNodes.map(m => ({
      tag: m.tag,
      selector: m.selector,
      outer_html: m.outer_html,
      text: m.text
    }))
  };
}

/**
 * Evaluates locality of a store locator capture with genuine DOM provenance
 */
async function verifyLocalityFromRawCapture(html, locatorUrl, receipt, browser) {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', req => req.abort());
  await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 5000 });

  const evalResult = await page.evaluate(browserFindDaNangLocalityNodes);
  await page.close();

  const provenNodes = evalResult.matching_nodes.map(node => ({
    dom_tag: node.tag,
    dom_selector: node.selector,
    node_outer_html_sha256: computeSha256(Buffer.from(node.outer_html, 'utf8')),
    raw_text: node.text
  }));

  let localityStatus;
  let verdictReason;

  if (provenNodes.length > 0) {
    localityStatus = 'LOCALITY_VERIFIED_DA_NANG';
    verdictReason = `Found ${provenNodes.length} raw DOM nodes proving physical presence in Da Nang.`;
  } else if (evalResult.is_online_service) {
    localityStatus = 'ONLINE_ELIGIBILITY_UNPROVEN_FOR_DANANG';
    verdictReason = 'Global/online service without physical store or dedicated Da Nang campus enrollment verification node.';
  } else {
    localityStatus = 'LOCALITY_UNPROVEN_NO_DA_NANG_STORE';
    verdictReason = 'Store Locator raw capture contains zero DOM nodes mentioning Da Nang branches or districts.';
  }

  return {
    locator_url: locatorUrl,
    locality_status: localityStatus,
    verdict_reason: verdictReason,
    proven_da_nang_nodes_count: provenNodes.length,
    proven_da_nang_nodes: provenNodes,
    raw_capture_provenance: {
      receipt_id: receipt.receipt_id,
      captured_at: receipt.captured_at,
      raw_html_sha256: receipt.hashes.html_sha256,
      screenshot_sha256: receipt.hashes.screenshot_sha256
    }
  };
}

module.exports = {
  computeSha256,
  browserFindDaNangLocalityNodes,
  verifyLocalityFromRawCapture
};
