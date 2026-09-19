/**
 * JAYT THREE-COHORT REAL-SUPPLY WORKER ENGINE (151)
 * Directive: JAYT-151: THREE-COHORT REAL-SUPPLY RECOVERY
 * 
 * CORE ARCHITECTURAL INVARIANTS:
 * 1. Honest Origin: Strictly and transparently labeled as MANUAL_TRIGGERED. Zero scheduler theatre.
 * 2. Host Status: SCHEDULER_BLOCKED_ON_THIS_HOST recorded in manifest.
 * 3. Multi-Cohort Coverage: Processes targets across Cohort A (Cinema/Entertainment), Cohort B (F&B/Coffee), and Cohort C (Transit/Student).
 * 4. Immutable Run Directory: runs/RUN_YYYYMMDD_HHMMSS_<nonce>/
 * 5. Strict Receipt & Taxonomy Parity:
 *    - Network failure / Invalid receipt / 404 / Anti-bot ALWAYS classified as ERROR_OR_BLOCKED_SOURCE and marked SOURCE_PATH_STALE.
 * 6. DOM-Lineage Dynamic Discovery:
 *    - Parent receipt SHA-256 and parent final URL.
 *    - Specific CSS selector of content root (rejects generic 'div', 'body', 'html').
 *    - SHA-256 hash of FULL content root outerHTML (no truncation).
 *    - Specific anchor selector, raw href, canonical URL, non-empty anchor text (>= 3 chars), outerHTML hash.
 *    - Rejects any item failing strict lineage with DISCOVERY_LINEAGE_INSUFFICIENT.
 * 7. Strict Negative Filter: rejects .js, .css, media, fonts, API endpoints, nav/footer/sidebar links, category indices.
 * 8. Reconciliation Invariance: initial_count + newly_discovered = final_count.
 * 9. Hard-locked Production: deals_feed.json = [], is_approved = false.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');
const { captureSingleUrlNative } = require('./native_event_capture_harness_143r');
const { verifyStrictRawCaptureReceipt143R } = require('./strict_receipt_truth_verifier_143r');
const { parseStrictSemanticRootLeaf143R } = require('./strict_semantic_root_dom_parser_143r');
const { verifyNormalizedAddressUnits143R } = require('./address_unit_locality_verifier_143r');

const repoRoot = path.resolve(__dirname, '..');
const lockFilePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'worker_151.lock');
const runsLogDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'scheduler_runs');
const memoryFilePath = path.join(repoRoot, 'PROJECT_MEMORY.md');
const registryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'autonomous_schedule_registry_151.json');
const runsBaseDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'runs');

const DEFAULT_BATCH_CAP_PER_COHORT = 10;
const LOCK_TTL_MS = 30 * 60 * 1000; // 30 minutes TTL

function generateImmutableRunId() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  const dateStr = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const timeStr = `${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
  const nonce = crypto.randomBytes(3).toString('hex');
  return `RUN_${dateStr}_${timeStr}_${nonce}`;
}

function acquireLock() {
  fs.mkdirSync(runsLogDir, { recursive: true });
  const now = Date.now();

  if (fs.existsSync(lockFilePath)) {
    try {
      const lockData = JSON.parse(fs.readFileSync(lockFilePath, 'utf8'));
      const lockAge = now - new Date(lockData.acquired_at).getTime();

      let isProcessAlive = false;
      if (lockData.pid) {
        try {
          process.kill(lockData.pid, 0);
          isProcessAlive = true;
        } catch (_) {
          isProcessAlive = false;
        }
      }

      if (isProcessAlive && lockAge < LOCK_TTL_MS) {
        console.error(`⚠️ [SUPPLY-LOCK-151] Active worker already running (PID: ${lockData.pid}, Age: ${Math.round(lockAge / 1000)}s). Aborting concurrent run.`);
        return { acquired: false, reason: 'CONCURRENT_EXECUTION_BLOCKED' };
      }

      const staleReceipt = {
        incident: 'STALE_LOCK_RECOVERED',
        recovered_at: new Date().toISOString(),
        previous_lock_data: lockData,
        stale_reason: !isProcessAlive ? 'PROCESS_DEAD' : 'TTL_EXPIRED'
      };
      fs.writeFileSync(
        path.join(runsLogDir, `INCIDENT_STALE_LOCK_${now}.json`),
        JSON.stringify(staleReceipt, null, 2),
        'utf8'
      );
      console.log(`ℹ️ [SUPPLY-LOCK-151] Stale lock recovered (Reason: ${staleReceipt.stale_reason}).`);
    } catch (_) {}
  }

  const newLock = {
    worker_identifier: 'JAYT_THREE_COHORT_SUPPLY_WORKER_151',
    pid: process.pid,
    acquired_at: new Date().toISOString()
  };
  fs.writeFileSync(lockFilePath, JSON.stringify(newLock, null, 2), 'utf8');
  return { acquired: true };
}

function releaseLock() {
  if (fs.existsSync(lockFilePath)) {
    try {
      fs.unlinkSync(lockFilePath);
    } catch (_) {}
  }
}

function readMemoryStrict() {
  if (!fs.existsSync(memoryFilePath)) {
    return {
      version: 'MEMORY_VERSION_UNPROVEN',
      sha256: 'MEMORY_SHA256_UNPROVEN',
      is_valid: false
    };
  }

  try {
    const content = fs.readFileSync(memoryFilePath, 'utf8');
    const versionMatch = content.match(/(?:Version|TRANSACTION:[^\(]*\()\s*([0-9]+\.[0-9]+\.[0-9]+)/i);
    const version = versionMatch ? versionMatch[1] : 'MEMORY_VERSION_UNPROVEN';
    const sha = crypto.createHash('sha256').update(content).digest('hex');

    return {
      version,
      sha256: sha,
      is_valid: version !== 'MEMORY_VERSION_UNPROVEN'
    };
  } catch (_) {
    return {
      version: 'MEMORY_VERSION_UNPROVEN',
      sha256: 'MEMORY_SHA256_UNPROVEN',
      is_valid: false
    };
  }
}

/**
 * Strict Negative Filter for URL Link Discovery
 */
function isRejectedByNegativeFilter(rawUrl, parentUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return { rejected: true, reason: 'EMPTY_URL' };

  try {
    const parsed = new URL(rawUrl, parentUrl);
    const parentParsed = new URL(parentUrl);

    // Hostname check
    if (parsed.hostname !== parentParsed.hostname) {
      return { rejected: true, reason: 'CROSS_DOMAIN_OR_EXTERNAL' };
    }

    const pathname = parsed.pathname.toLowerCase();

    // Forbidden file extensions
    const forbiddenExts = [
      '.js', '.mjs', '.cjs', '.ts', '.css', '.scss', '.less',
      '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico', '.bmp', '.tiff',
      '.woff', '.woff2', '.ttf', '.eot', '.otf',
      '.pdf', '.zip', '.tar', '.gz', '.rar', '.7z',
      '.json', '.xml', '.yaml', '.yml', '.csv', '.txt',
      '.mp4', '.mp3', '.avi', '.mov', '.webm', '.ogg',
      '.map', '.wasm'
    ];
    for (const ext of forbiddenExts) {
      if (pathname.endsWith(ext) || pathname.includes(`${ext}?`)) {
        return { rejected: true, reason: `STATIC_FILE_EXTENSION_${ext.toUpperCase()}` };
      }
    }

    // Forbidden API, Auth, Checkout, and system paths
    const forbiddenPaths = [
      '/api/', '/v1/', '/v2/', '/v3/', '/graphql',
      '/cdn-cgi/', '/wp-json/', '/wp-admin/', '/admin/',
      '/auth/', '/oauth/', '/login', '/logout', '/register', '/signin', '/signup',
      '/cart', '/checkout', '/payment', '/gio-hang', '/thanh-toan',
      '/privacy', '/terms', '/dieu-khoan', '/chinh-sach', '/quy-dinh',
      '/contact', '/lien-he', '/about', '/ve-chung-toi', '/gioi-thieu'
    ];
    for (const p of forbiddenPaths) {
      if (pathname === p || pathname.startsWith(p) || pathname.endsWith(p)) {
        return { rejected: true, reason: `SYSTEM_OR_NAV_PATH_${p}` };
      }
    }

    // Generic category / index paths without specific leaf slug
    const genericIndexPaths = [
      '/khuyen-mai', '/khuyen-mai/', '/uu-dai', '/uu-dai/',
      '/promotions', '/promotions/', '/offers', '/offers/',
      '/tin-tuc', '/tin-tuc/', '/events', '/events/',
      '/danh-muc', '/danh-muc/', '/category', '/category/'
    ];
    if (genericIndexPaths.includes(pathname) || pathname === '/' || pathname === '') {
      return { rejected: true, reason: 'GENERIC_INDEX_OR_CATEGORY_ROOT' };
    }

    return { rejected: false, canonicalUrl: parsed.origin + parsed.pathname };
  } catch (err) {
    return { rejected: true, reason: 'INVALID_URL_SYNTAX' };
  }
}

/**
 * DOM-Lineage Dynamic Discovery
 */
async function extractContentRootLineageLinks(browser, htmlContent, pageUrl, parentReceiptPath, brandId, brandName, cohort151) {
  if (!htmlContent || typeof htmlContent !== 'string') return { valid_discovered: [], rejected_candidates: [] };

  const validDiscovered = [];
  const rejectedCandidates = [];

  let parentReceiptSha = 'RECEIPT_SHA_UNPROVEN';
  if (fs.existsSync(parentReceiptPath)) {
    parentReceiptSha = crypto.createHash('sha256').update(fs.readFileSync(parentReceiptPath)).digest('hex');
  }

  const page = await browser.newPage();
  try {
    await page.setRequestInterception(true);
    page.on('request', req => req.abort());
    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded', timeout: 5000 });

    const rawLinkData = await page.evaluate(() => {
      const contentRootCandidate = document.querySelector('article, [class*="post-detail"], [class*="article-content"], [class*="promo-detail"], [class*="news-detail"], [class*="event-detail"], [class*="entry-content"], main [class*="content"]');
      
      if (!contentRootCandidate) {
        return { error: 'NO_SPECIFIC_SEMANTIC_CONTENT_ROOT' };
      }

      const rootTag = contentRootCandidate.tagName.toLowerCase();
      const rootClass = (contentRootCandidate.className || '').toString().trim();
      const rootId = (contentRootCandidate.id || '').toString().trim();

      let specificSelector = rootTag;
      if (rootId) {
        specificSelector += `#${rootId}`;
      } else if (rootClass) {
        specificSelector += `.${rootClass.split(/\s+/).slice(0, 2).join('.')}`;
      }

      if (specificSelector === 'div' || specificSelector === 'body' || specificSelector === 'html') {
        return { error: 'GENERIC_ROOT_SELECTOR_DISALLOWED' };
      }

      const rootOuterHtml = contentRootCandidate.outerHTML || '';
      const anchorNodes = Array.from(contentRootCandidate.querySelectorAll('a[href]'));
      const promoKeywords = ['khuyen-mai', 'uu-dai', 'tin-tuc', 'promotions', 'offers', 'deal', 'events', 'combo', 'student', 've-thang', 'tuyen-xe', 've-tau'];

      const results = [];

      for (let i = 0; i < anchorNodes.length; i++) {
        const a = anchorNodes[i];

        if (a.closest('header, footer, nav, aside, menu, [class*="header"], [class*="footer"], [class*="nav"], [class*="sidebar"], [class*="menu"]')) {
          continue;
        }

        const rawHref = (a.getAttribute('href') || '').trim();
        if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('javascript:') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) {
          continue;
        }

        const anchorText = (a.innerText || a.textContent || '').trim().replace(/\s+/g, ' ');
        const outerHtml = a.outerHTML || '';

        let anchorSelector = `a[href="${rawHref}"]`;
        if (a.id) anchorSelector = `a#${a.id}`;
        else if (a.className) anchorSelector = `a.${(a.className || '').toString().trim().split(/\s+/)[0]}`;

        const lowerHref = rawHref.toLowerCase();
        const lowerText = anchorText.toLowerCase();
        const hasKeyword = promoKeywords.some(kw => lowerHref.includes(kw) || lowerText.includes(kw));

        if (hasKeyword) {
          results.push({
            raw_href: rawHref,
            anchor_text: anchorText,
            anchor_selector: anchorSelector,
            outer_html: outerHtml,
            content_root_selector: specificSelector,
            content_root_full_html: rootOuterHtml
          });
        }
      }

      return { links: results };
    });

    if (rawLinkData.error) {
      return { valid_discovered: [], rejected_candidates: [{ reason: rawLinkData.error }] };
    }

    for (const rawItem of (rawLinkData.links || [])) {
      if (!rawItem.anchor_text || rawItem.anchor_text.length < 3) {
        rejectedCandidates.push({
          raw_href: rawItem.raw_href,
          reason: 'DISCOVERY_LINEAGE_INSUFFICIENT_EMPTY_OR_SHORT_ANCHOR_TEXT'
        });
        continue;
      }

      if (rawItem.content_root_selector === 'div' || rawItem.content_root_selector === 'body' || rawItem.content_root_selector === 'html') {
        rejectedCandidates.push({
          raw_href: rawItem.raw_href,
          reason: 'DISCOVERY_LINEAGE_INSUFFICIENT_GENERIC_ROOT_SELECTOR'
        });
        continue;
      }

      const filterRes = isRejectedByNegativeFilter(rawItem.raw_href, pageUrl);
      if (filterRes.rejected) {
        rejectedCandidates.push({
          raw_href: rawItem.raw_href,
          reason: filterRes.reason
        });
        continue;
      }

      const rootFullHash = crypto.createHash('sha256').update(rawItem.content_root_full_html).digest('hex');
      const outerHtmlHash = crypto.createHash('sha256').update(rawItem.outer_html).digest('hex');
      const canonical = filterRes.canonicalUrl;
      const linkHash = crypto.createHash('sha256').update(canonical).digest('hex').substring(0, 12);

      validDiscovered.push({
        canonical_url: canonical,
        raw_href: rawItem.raw_href,
        brand_id: brandId,
        brand_name: brandName,
        cohort_151: cohort151,
        link_hash: linkHash,
        parent_source_url: pageUrl,
        parent_receipt_sha256: parentReceiptSha,
        content_root_selector: rawItem.content_root_selector,
        content_root_hash: rootFullHash,
        anchor_selector: rawItem.anchor_selector,
        anchor_text: rawItem.anchor_text,
        outer_html_hash: outerHtmlHash,
        discovered_at: new Date().toISOString()
      });
    }
  } catch (_) {
  } finally {
    await page.close();
  }

  const seen = new Set();
  const dedupedValid = validDiscovered.filter(d => {
    if (seen.has(d.canonical_url) || d.canonical_url === pageUrl) return false;
    seen.add(d.canonical_url);
    return true;
  });

  return {
    valid_discovered: dedupedValid,
    rejected_candidates: rejectedCandidates
  };
}

/**
 * Main Three-Cohort Supply Engine Runner 151
 */
async function runSupplyEngine151(options = {}) {
  const isSmoke = Boolean(options.isSmoke);
  const capPerCohort = options.capPerCohort || (isSmoke ? 1 : DEFAULT_BATCH_CAP_PER_COHORT);
  const executionOrigin = 'MANUAL_TRIGGERED';

  console.log('========================================================================');
  console.log(`🚀 JAYT-151: RUNNING THREE-COHORT REAL-SUPPLY ENGINE (${isSmoke ? 'SMOKE_RUN' : 'FULL_THREE_COHORT_BATCH'})`);
  console.log(`- Transparent Execution Origin: ${executionOrigin}`);
  console.log(`- Host Scheduler Status: SCHEDULER_BLOCKED_ON_THIS_HOST`);
  console.log(`- Cap Per Cohort: ${capPerCohort} due items`);
  console.log('========================================================================\n');

  const lockRes = acquireLock();
  if (!lockRes.acquired) {
    console.error('❌ Lock acquisition failed.');
    return { status: 'LOCKED_CONCURRENT_BLOCKED', exit_code: 1 };
  }

  const runId = generateImmutableRunId();
  const runOutputDir = path.join(runsBaseDir, runId);
  fs.mkdirSync(runOutputDir, { recursive: true });
  console.log(`📁 Immutable Run Directory: ${runOutputDir}`);

  try {
    // 1. Read Project Memory Strictly
    const memory = readMemoryStrict();
    console.log(`📖 Read Memory: Version=${memory.version}, SHA=${memory.sha256.substring(0, 12)}...`);
    if (!memory.is_valid) {
      throw new Error(`Project Memory validation failed: ${memory.version}`);
    }

    // 2. Load Registry & Select Due Items across the 3 Cohorts
    if (!fs.existsSync(registryPath)) {
      throw new Error(`Schedule registry not found at: ${registryPath}`);
    }
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    const initialRegistryCount = registry.items.length;
    const now = Date.now();

    const dueFilter = item => {
      const dueTime = new Date(item.next_check_due).getTime();
      const isDue = now >= dueTime;
      const isBackoffActive = item.backoff_until ? now < new Date(item.backoff_until).getTime() : false;
      return isDue && !isBackoffActive;
    };

    const cohortAItems = registry.items.filter(i => i.cohort_151 === 'COHORT_A_CINEMA_ENTERTAINMENT' && dueFilter(i)).slice(0, capPerCohort);
    const cohortBItems = registry.items.filter(i => i.cohort_151 === 'COHORT_B_FNB_COFFEE' && dueFilter(i)).slice(0, capPerCohort);
    const cohortCItems = registry.items.filter(i => i.cohort_151 === 'COHORT_C_TRANSIT_STUDENT' && dueFilter(i)).slice(0, capPerCohort);

    const selectedItems = [...cohortAItems, ...cohortBItems, ...cohortCItems];
    console.log(`📋 Selected Targets: Cohort A (${cohortAItems.length}) + Cohort B (${cohortBItems.length}) + Cohort C (${cohortCItems.length}) = Total ${selectedItems.length} items`);

    if (selectedItems.length === 0) {
      console.log('ℹ️ Zero items currently due across all 3 cohorts.');
      const idleReceipt = {
        run_id: runId,
        worker_identifier: 'JAYT_THREE_COHORT_SUPPLY_WORKER_151',
        execution_mode: 'THREE_COHORT_MANUAL_BATCH',
        execution_origin: executionOrigin,
        host_scheduler_status: 'SCHEDULER_BLOCKED_ON_THIS_HOST',
        executed_at: new Date().toISOString(),
        items_processed: 0,
        reconciliation: {
          registry_initial_count: initialRegistryCount,
          new_valid_discovered_count: 0,
          rejected_filtered_count: 0,
          registry_final_count: initialRegistryCount,
          is_reconciled: true
        },
        run_directory: runOutputDir,
        exit_code: 0
      };
      fs.writeFileSync(path.join(runsLogDir, `RECEIPT_${runId}.json`), JSON.stringify(idleReceipt, null, 2), 'utf8');
      return { status: 'IDLE_NO_ITEMS_DUE', exit_code: 0, run_id: runId };
    }

    // 3. Launch Certified Native Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const executionResults = [];
    let totalNewDiscovered = 0;
    let totalRejectedCandidates = 0;

    for (let i = 0; i < selectedItems.length; i++) {
      const item = selectedItems[i];
      const itemFolder = path.join(runOutputDir, item.item_id);
      console.log(`[${i + 1}/${selectedItems.length}] [${item.cohort_151}] Processing ${item.item_id} (${item.brand_name}) -> ${item.url}`);

      const targetDef = {
        capture_id: item.item_id,
        brand_id: item.brand_id,
        brand_name: item.brand_name,
        category: item.category,
        cohort: item.queue_cohort,
        cohort_151: item.cohort_151,
        target_type: item.target_type,
        url: item.url
      };

      // Step A: Native Event Capture
      const captureRes = await captureSingleUrlNative(browser, targetDef, itemFolder, runId);

      // Step B: Strict Receipt & Disk Hash Verification
      const verifiedReceipt = verifyStrictRawCaptureReceipt143R(itemFolder);

      // Step C: Semantic Root Parsing
      let semanticParse = { has_content_root: false, root_tag: null, offer_title: null, price_extracted: null, validity_extracted: null };
      let rawHtml = '';
      if (fs.existsSync(path.join(itemFolder, 'page.html'))) {
        rawHtml = fs.readFileSync(path.join(itemFolder, 'page.html'), 'utf8');
        semanticParse = await parseStrictSemanticRootLeaf143R(rawHtml, verifiedReceipt.final_url || item.url, verifiedReceipt, browser);
      }

      // Step D: Locality Unit Check (for locators or store pages)
      let localityRes = { locality_status: 'LOCALITY_PENDING_ADDRESS_UNIT_VALIDATION', distinct_normalized_address_units_count: 0 };
      if (item.queue_cohort === 'COHORT_A_LOCALITY') {
        localityRes = await verifyNormalizedAddressUnits143R(rawHtml, verifiedReceipt.final_url || item.url, verifiedReceipt, browser);
      }

      // Step E: 6-Step Taxonomy Classification (Enforcing Directive 151: receipt invalid / network fail / anti-bot / 404 is ALWAYS ERROR_OR_BLOCKED_SOURCE)
      let classification = 'UNKNOWN';
      const isHttpError = typeof verifiedReceipt.http_status === 'number' && verifiedReceipt.http_status >= 400;
      const isNetworkFail = !verifiedReceipt.is_receipt_trusted;

      let pageText = '';
      if (fs.existsSync(path.join(itemFolder, 'page.txt'))) {
        pageText = fs.readFileSync(path.join(itemFolder, 'page.txt'), 'utf8');
      }
      const isAntiBotOrErrorText = /attention required|cloudflare|verify you are human|access denied|404 not found|trang không tồn tại|403 forbidden|oops!/i.test(pageText);

      if (isHttpError || isNetworkFail || isAntiBotOrErrorText) {
        classification = 'ERROR_OR_BLOCKED_SOURCE';
      } else if (!semanticParse.has_content_root) {
        classification = 'NON_OFFER_PAGE_OR_SHELL';
      } else if (!semanticParse.price_extracted || !semanticParse.validity_extracted) {
        classification = 'INCOMPLETE_OFFER_EVIDENCE';
      } else if (item.queue_cohort === 'COHORT_A_LOCALITY' && localityRes.locality_status !== 'LOCALITY_VERIFIED_DA_NANG') {
        classification = 'SCOPE_UNPROVEN';
      } else {
        classification = 'EVIDENCE_COMPLETE_FOR_REVIEW';
      }

      // Step F: Precise DOM-Lineage Discovery
      let itemDiscoveredCount = 0;
      if (verifiedReceipt.is_receipt_trusted && !isHttpError && rawHtml) {
        const receiptJsonPath = path.join(itemFolder, 'receipt.json');
        const discoveryRes = await extractContentRootLineageLinks(browser, rawHtml, verifiedReceipt.final_url || item.url, receiptJsonPath, item.brand_id, item.brand_name, item.cohort_151);
        totalRejectedCandidates += discoveryRes.rejected_candidates.length;

        for (const disc of discoveryRes.valid_discovered) {
          const exists = registry.items.some(r => r.url === disc.canonical_url);
          if (!exists) {
            const newItemId = `DISC_${item.brand_id}_${disc.link_hash}`;
            registry.items.push({
              item_id: newItemId,
              brand_id: disc.brand_id,
              brand_name: disc.brand_name,
              category: item.category,
              url: disc.canonical_url,
              target_type: 'DISCOVERED_OFFER_LEAF',
              queue_cohort: 'COHORT_B_OFFERS',
              cohort_151: disc.cohort_151,
              scan_interval_hours: 24,
              last_checked_at: null,
              next_check_due: new Date().toISOString(),
              backoff_until: null,
              last_http_status: null,
              last_classification: 'DISCOVERED_PENDING_CAPTURE',
              consecutive_failures: 0,
              lineage: {
                origin: 'DYNAMIC_DOM_LINEAGE_DISCOVERY',
                parent_source_url: disc.parent_source_url,
                parent_receipt_sha256: disc.parent_receipt_sha256,
                content_root_selector: disc.content_root_selector,
                content_root_hash: disc.content_root_hash,
                anchor_selector: disc.anchor_selector,
                anchor_text: disc.anchor_text,
                outer_html_hash: disc.outer_html_hash,
                discovered_at: disc.discovered_at
              }
            });
            totalNewDiscovered++;
            itemDiscoveredCount++;
          }
        }
      }

      // Step G: Update item in registry & Source Repair (Workstream 4)
      const itemInReg = registry.items.find(r => r.item_id === item.item_id);
      if (itemInReg) {
        itemInReg.last_checked_at = new Date().toISOString();
        itemInReg.last_http_status = verifiedReceipt.http_status;
        itemInReg.last_classification = classification;

        if (classification === 'ERROR_OR_BLOCKED_SOURCE') {
          itemInReg.consecutive_failures = (itemInReg.consecutive_failures || 0) + 1;
          itemInReg.last_classification = 'SOURCE_PATH_STALE';
          itemInReg.backoff_until = new Date(now + 7 * 24 * 60 * 60 * 1000).toISOString();
          itemInReg.next_check_due = new Date(now + 7 * 24 * 60 * 60 * 1000).toISOString();
        } else {
          itemInReg.consecutive_failures = 0;
          itemInReg.backoff_until = null;
          const intervalMs = (itemInReg.scan_interval_hours || 24) * 60 * 60 * 1000;
          itemInReg.next_check_due = new Date(now + intervalMs).toISOString();
        }
      }

      executionResults.push({
        item_id: item.item_id,
        brand_name: item.brand_name,
        cohort_151: item.cohort_151,
        requested_url: item.url,
        final_url: verifiedReceipt.final_url,
        receipt_status: verifiedReceipt.status,
        http_status: verifiedReceipt.http_status,
        is_trusted: verifiedReceipt.is_receipt_trusted,
        has_content_root: semanticParse.has_content_root,
        offer_title: semanticParse.offer_title,
        price_extracted: semanticParse.price_extracted,
        validity_extracted: semanticParse.validity_extracted,
        locality_status: localityRes.locality_status,
        classification,
        new_links_discovered_from_this_item: itemDiscoveredCount,
        html_sha256: verifiedReceipt.fresh_hashes?.html_sha256,
        artifact_folder: itemFolder
      });
    }

    await browser.close();

    // 4. Strict Reconciliation Invariance
    const finalRegistryCount = registry.items.length;
    const isReconciled = (initialRegistryCount + totalNewDiscovered === finalRegistryCount);
    if (!isReconciled) {
      throw new Error(`FAIL-CLOSED: Reconciliation Invariance Broken! initial(${initialRegistryCount}) + discovered(${totalNewDiscovered}) != final(${finalRegistryCount})`);
    }

    registry.last_updated_at = new Date().toISOString();
    registry.total_items = finalRegistryCount;
    registry.stale_sources_count = registry.items.filter(i => i.last_classification === 'SOURCE_PATH_STALE').length;
    fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');

    // 5. Staging Gate Evaluation
    const evidenceCompleteCount = executionResults.filter(r => r.classification === 'EVIDENCE_COMPLETE_FOR_REVIEW').length;
    let stagingDecision = 'CONTINUE_ACQUISITION';
    let progressMilestone = '0/10';

    if (evidenceCompleteCount >= 10) {
      stagingDecision = 'STAGING_PROPOSAL_READY';
      progressMilestone = '10/10';
    } else if (evidenceCompleteCount >= 5) {
      stagingDecision = 'PROGRESS_REVIEW_READY';
      progressMilestone = '5/10';
    }

    // 6. Emit Run Manifest & Worker Receipt
    const runManifest = {
      run_id: runId,
      worker_identifier: 'JAYT_THREE_COHORT_SUPPLY_WORKER_151',
      directive: 'JAYT-151: THREE-COHORT REAL-SUPPLY RECOVERY',
      execution_mode: 'THREE_COHORT_MANUAL_BATCH',
      execution_origin: executionOrigin,
      host_scheduler_status: 'SCHEDULER_BLOCKED_ON_THIS_HOST',
      executed_at: new Date().toISOString(),
      run_directory: runOutputDir,
      project_memory_verified: memory,
      reconciliation: {
        registry_initial_count: initialRegistryCount,
        new_valid_discovered_count: totalNewDiscovered,
        rejected_filtered_count: totalRejectedCandidates,
        registry_final_count: finalRegistryCount,
        invariance_formula: `${initialRegistryCount} + ${totalNewDiscovered} = ${finalRegistryCount}`,
        is_reconciled: isReconciled
      },
      cohort_summary: {
        COHORT_A_CINEMA_ENTERTAINMENT: executionResults.filter(r => r.cohort_151 === 'COHORT_A_CINEMA_ENTERTAINMENT').length,
        COHORT_B_FNB_COFFEE: executionResults.filter(r => r.cohort_151 === 'COHORT_B_FNB_COFFEE').length,
        COHORT_C_TRANSIT_STUDENT: executionResults.filter(r => r.cohort_151 === 'COHORT_C_TRANSIT_STUDENT').length
      },
      summary: {
        items_processed: executionResults.length,
        trusted_receipts: executionResults.filter(r => r.is_trusted).length,
        unproven_receipts: executionResults.filter(r => !r.is_trusted).length,
        new_leaf_urls_discovered: totalNewDiscovered,
        rejected_candidates_filtered: totalRejectedCandidates,
        total_registered_targets_now: finalRegistryCount,
        total_stale_sources_in_registry: registry.stale_sources_count,
        classification_breakdown: {
          EVIDENCE_COMPLETE_FOR_REVIEW: executionResults.filter(r => r.classification === 'EVIDENCE_COMPLETE_FOR_REVIEW').length,
          INCOMPLETE_OFFER_EVIDENCE: executionResults.filter(r => r.classification === 'INCOMPLETE_OFFER_EVIDENCE').length,
          SCOPE_UNPROVEN: executionResults.filter(r => r.classification === 'SCOPE_UNPROVEN').length,
          NON_OFFER_PAGE_OR_SHELL: executionResults.filter(r => r.classification === 'NON_OFFER_PAGE_OR_SHELL').length,
          ERROR_OR_BLOCKED_SOURCE: executionResults.filter(r => r.classification === 'ERROR_OR_BLOCKED_SOURCE').length
        }
      },
      automated_staging_gate_evaluation: {
        decision_verdict: stagingDecision,
        progress_milestone: progressMilestone,
        evidence_complete_count: evidenceCompleteCount,
        threshold_required: 10
      },
      captures: executionResults,
      governance_lock: {
        is_approved: false,
        production_feed: 'deals_feed.json: []',
        status: 'PRODUCTION_LOCKED_PENDING_CEO_APPROVAL'
      },
      exit_code: 0
    };

    fs.writeFileSync(path.join(runOutputDir, 'RUN_MANIFEST.json'), JSON.stringify(runManifest, null, 2), 'utf8');

    const workerReceiptPath = path.join(runsLogDir, `RECEIPT_${runId}.json`);
    fs.writeFileSync(workerReceiptPath, JSON.stringify(runManifest, null, 2), 'utf8');

    console.log('\n========================================================================');
    console.log(`✅ THREE-COHORT SUPPLY ENGINE 151 BATCH COMPLETED: ${executionResults.length} processed.`);
    console.log(`- Run ID: ${runId}`);
    console.log(`- Cohort A: ${runManifest.cohort_summary.COHORT_A_CINEMA_ENTERTAINMENT} | Cohort B: ${runManifest.cohort_summary.COHORT_B_FNB_COFFEE} | Cohort C: ${runManifest.cohort_summary.COHORT_C_TRANSIT_STUDENT}`);
    console.log(`- Transparent Origin: ${executionOrigin}`);
    console.log(`- Host Scheduler Status: SCHEDULER_BLOCKED_ON_THIS_HOST`);
    console.log(`- Reconciliation: ${initialRegistryCount} + ${totalNewDiscovered} = ${finalRegistryCount} (100% MATCH)`);
    console.log(`- Staging Gate: ${stagingDecision} (${progressMilestone})`);
    console.log(`- Receipt Path: ${workerReceiptPath}`);
    console.log('========================================================================\n');

    return {
      status: 'SUCCESS',
      exit_code: 0,
      run_id: runId,
      run_output_dir: runOutputDir,
      run_manifest: runManifest,
      worker_receipt_path: workerReceiptPath
    };
  } finally {
    releaseLock();
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);
  let isSmoke = false;
  let capPerCohort = DEFAULT_BATCH_CAP_PER_COHORT; // 10 per cohort = 30 max or custom

  if (args.includes('--smoke') || args.includes('--run-once')) {
    isSmoke = true;
    capPerCohort = 1;
  }

  const capIdx = args.indexOf('--cap-per-cohort');
  if (capIdx !== -1 && args[capIdx + 1]) {
    capPerCohort = parseInt(args[capIdx + 1], 10);
  }

  runSupplyEngine151({ capPerCohort, isSmoke }).then(res => {
    process.exit(res.exit_code);
  });
}

module.exports = {
  generateImmutableRunId,
  acquireLock,
  releaseLock,
  readMemoryStrict,
  isRejectedByNegativeFilter,
  extractContentRootLineageLinks,
  runSupplyEngine151
};
