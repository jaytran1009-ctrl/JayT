/**
 * JAYT AUTONOMOUS SUPPLY ENGINE (147)
 * Directive: JAYT-147: KHÔI PHỤC TÍNH TIN CẬY CỦA AUTONOMOUS SUPPLY ENGINE
 * 
 * CORE ARCHITECTURAL INVARIANTS:
 * 1. Windows Task Scheduler: JAYT_AUTONOMOUS_SUPPLY_WORKER_147 with --scheduled-cycle.
 * 2. Strict Process Lock with TTL & Stale Recovery Logging.
 * 3. Immutable Run Directory: runs/RUN_YYYYMMDD_HHMMSS_<nonce>/
 * 4. DOM-Lineage Dynamic Discovery: extracts strictly from inside content_root with complete lineage.
 * 5. Strict Negative Filter: rejects .js, .css, media, fonts, API endpoints, error pages, nav/footer.
 * 6. Reconciliation Invariance: initial_count + newly_discovered = final_count.
 * 7. Error Classification: 404/403/429/timeout/blocked classified as ERROR_OR_BLOCKED_SOURCE.
 * 8. Hard-locked Production: deals_feed.json = [], is_approved = false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');
const { captureSingleUrlNative } = require('./native_event_capture_harness_143r');
const { verifyStrictRawCaptureReceipt143R } = require('./strict_receipt_truth_verifier_143r');
const { parseStrictSemanticRootLeaf143R } = require('./strict_semantic_root_dom_parser_143r');
const { verifyNormalizedAddressUnits143R } = require('./address_unit_locality_verifier_143r');

const repoRoot = path.resolve(__dirname, '..');
const lockFilePath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'worker_147.lock');
const runsLogDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'scheduler_runs');
const memoryFilePath = path.join(repoRoot, 'PROJECT_MEMORY.md');
const registryPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'autonomous_schedule_registry_147.json');
const runsBaseDir = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'runs');

const DEFAULT_BATCH_CAP = 20;
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
        console.error(`⚠️ [SUPPLY-LOCK-147] Active worker already running (PID: ${lockData.pid}, Age: ${Math.round(lockAge / 1000)}s). Aborting concurrent run.`);
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
      console.log(`ℹ️ [SUPPLY-LOCK-147] Stale lock recovered (Reason: ${staleReceipt.stale_reason}).`);
    } catch (_) {}
  }

  const newLock = {
    worker_identifier: 'JAYT_AUTONOMOUS_SUPPLY_WORKER_147',
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

    // Forbidden API and system paths
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

    // Must have meaningful path length
    if (pathname === '/' || pathname === '') {
      return { rejected: true, reason: 'ROOT_INDEX_PATH' };
    }

    return { rejected: false, canonicalUrl: parsed.origin + parsed.pathname };
  } catch (err) {
    return { rejected: true, reason: 'INVALID_URL_SYNTAX' };
  }
}

/**
 * DOM-Lineage Dynamic Discovery
 * Extracts candidate links strictly from inside semantic content_root container.
 */
async function extractContentRootLineageLinks(browser, htmlContent, pageUrl, parentReceiptPath, brandId, brandName) {
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
      // Find content root container (ignore header, footer, nav, aside)
      const contentRootCandidate = document.querySelector('article, main, [class*="content"], [class*="detail"], [class*="promo"], [class*="news"], [class*="uu-dai"]');
      const rootNode = contentRootCandidate || document.body;

      // Extract only <a> tags strictly inside the rootNode
      const anchorNodes = Array.from(rootNode.querySelectorAll('a[href]'));
      const promoKeywords = ['khuyen-mai', 'uu-dai', 'tin-tuc', 'promotions', 'offers', 'deal', 'events', 'combo', 'student'];

      const results = [];

      for (const a of anchorNodes) {
        // Exclude if anchor is inside header, footer, nav, aside
        if (a.closest('header, footer, nav, aside, menu, [class*="header"], [class*="footer"], [class*="nav"]')) {
          continue;
        }

        const rawHref = a.getAttribute('href') || '';
        const hrefTrimmed = rawHref.trim();
        if (!hrefTrimmed || hrefTrimmed.startsWith('#') || hrefTrimmed.startsWith('javascript:') || hrefTrimmed.startsWith('mailto:') || hrefTrimmed.startsWith('tel:')) {
          continue;
        }

        const anchorText = (a.innerText || a.textContent || '').trim().replace(/\s+/g, ' ');
        const outerHtml = a.outerHTML || '';

        // Check if href or text has promo affinity
        const lowerHref = hrefTrimmed.toLowerCase();
        const lowerText = anchorText.toLowerCase();
        const hasKeyword = promoKeywords.some(kw => lowerHref.includes(kw) || lowerText.includes(kw));

        if (hasKeyword) {
          results.push({
            raw_href: hrefTrimmed,
            anchor_text: anchorText,
            outer_html: outerHtml,
            content_root_tag: rootNode.tagName.toLowerCase(),
            content_root_outer: rootNode.outerHTML.substring(0, 500)
          });
        }
      }
      return results;
    });

    for (const rawItem of rawLinkData) {
      const filterRes = isRejectedByNegativeFilter(rawItem.raw_href, pageUrl);
      if (filterRes.rejected) {
        rejectedCandidates.push({
          raw_href: rawItem.raw_href,
          reason: filterRes.reason
        });
      } else {
        const canonical = filterRes.canonicalUrl;
        const linkHash = crypto.createHash('sha256').update(canonical).digest('hex').substring(0, 12);
        const outerHtmlHash = crypto.createHash('sha256').update(rawItem.outer_html).digest('hex');
        const rootHash = crypto.createHash('sha256').update(rawItem.content_root_outer).digest('hex');

        validDiscovered.push({
          canonical_url: canonical,
          raw_href: rawItem.raw_href,
          brand_id: brandId,
          brand_name: brandName,
          link_hash: linkHash,
          parent_source_url: pageUrl,
          parent_receipt_sha256: parentReceiptSha,
          content_root_selector: rawItem.content_root_tag,
          content_root_hash: rootHash,
          anchor_text: rawItem.anchor_text,
          outer_html_hash: outerHtmlHash,
          discovered_at: new Date().toISOString()
        });
      }
    }
  } catch (_) {
  } finally {
    await page.close();
  }

  // Deduplicate discovered
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
 * Main Autonomous Supply Engine Runner 147
 */
async function runSupplyEngine147(options = {}) {
  const isScheduledCycle = Boolean(options.isScheduledCycle);
  const isSmoke = Boolean(options.isSmoke);
  const batchCap = options.limit || (isSmoke ? 2 : DEFAULT_BATCH_CAP);

  console.log('========================================================================');
  console.log(`🚀 JAYT-147: RUNNING AUTONOMOUS SUPPLY ENGINE (${isScheduledCycle ? 'SCHEDULED_CYCLE' : (isSmoke ? 'SMOKE_RUN' : 'MANUAL_BATCH')})`);
  console.log(`- Batch Cap: ${batchCap} due items max`);
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

    // 2. Load Registry & Select Due Items with Cohort Prioritization
    if (!fs.existsSync(registryPath)) {
      throw new Error(`Schedule registry not found at: ${registryPath}`);
    }
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    const initialRegistryCount = registry.items.length;
    const now = Date.now();

    // Filter due items (now >= next_check_due AND (!backoff_until || now >= backoff_until))
    const dueItems = registry.items.filter(item => {
      const dueTime = new Date(item.next_check_due).getTime();
      const isDue = now >= dueTime;
      const isBackoffActive = item.backoff_until ? now < new Date(item.backoff_until).getTime() : false;
      return isDue && !isBackoffActive;
    });

    console.log(`📋 Total targets in registry: ${initialRegistryCount} | Due items: ${dueItems.length}`);

    if (dueItems.length === 0) {
      console.log('ℹ️ Zero items currently due. Standing by for next cycle.');
      const idleReceipt = {
        run_id: runId,
        worker_identifier: 'JAYT_AUTONOMOUS_SUPPLY_WORKER_147',
        execution_mode: isScheduledCycle ? 'SCHEDULED_CYCLE' : 'IDLE_CYCLE',
        executed_at: new Date().toISOString(),
        items_due: 0,
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

    // Priority Cohort Sorting:
    // 1. Cinema Da Nang (Galaxy, CGV, Lotte, Metiz, Starlight)
    // 2. F&B Popular Chains (KFC, Jollibee, Lotteria, Pizza Hut, Domino's, Highlands, Phuc Long, The Coffee House, Gong Cha)
    // 3. Transit & Student Utilities (DanaBus, DSVN, GitHub, Spotify, Notion, Canva)
    // 4. Other/Locators
    const priorityWeight = item => {
      const cat = (item.category || '').toLowerCase();
      const bname = (item.brand_name || '').toLowerCase();
      const isLeaf = item.cohort === 'COHORT_B_OFFERS' || item.target_type?.includes('LEAF');

      if (cat.includes('cinema') || bname.includes('cinema') || bname.includes('starlight')) return isLeaf ? 1 : 4;
      if (cat.includes('f&b') || cat.includes('cà phê') || cat.includes('fast food')) return isLeaf ? 2 : 5;
      if (cat.includes('sinh viên') || cat.includes('di chuyển') || cat.includes('vận tải')) return isLeaf ? 3 : 6;
      return isLeaf ? 7 : 8;
    };

    dueItems.sort((a, b) => priorityWeight(a) - priorityWeight(b));
    const selectedItems = dueItems.slice(0, batchCap);
    console.log(`🎯 Selected & Prioritized ${selectedItems.length} items for this execution.`);

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
      console.log(`[${i + 1}/${selectedItems.length}] Processing ${item.item_id} (${item.brand_name}) -> ${item.url}`);

      const targetDef = {
        capture_id: item.item_id,
        brand_id: item.brand_id,
        brand_name: item.brand_name,
        category: item.category,
        cohort: item.cohort,
        target_type: item.target_type,
        url: item.url
      };

      // Step A: Native Capture
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
      if (item.cohort === 'COHORT_A_LOCALITY') {
        localityRes = await verifyNormalizedAddressUnits143R(rawHtml, verifiedReceipt.final_url || item.url, verifiedReceipt, browser);
      }

      // Step E: 6-Step Taxonomy Classification (Workstream D: Explicit ERROR_OR_BLOCKED_SOURCE)
      let classification = 'UNKNOWN';
      const isHttpError = typeof verifiedReceipt.http_status === 'number' && verifiedReceipt.http_status >= 400;
      const isNetworkFail = !verifiedReceipt.is_receipt_trusted;

      // Check anti-bot / error page in text
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
      } else if (item.cohort === 'COHORT_A_LOCALITY' && localityRes.locality_status !== 'LOCALITY_VERIFIED_DA_NANG') {
        classification = 'SCOPE_UNPROVEN';
      } else {
        classification = 'EVIDENCE_COMPLETE_FOR_REVIEW';
      }

      // Step F: Dynamic DOM-Lineage Discovery (Workstream B)
      let itemDiscoveredCount = 0;
      if (verifiedReceipt.is_receipt_trusted && !isHttpError && rawHtml) {
        const receiptJsonPath = path.join(itemFolder, 'receipt.json');
        const discoveryRes = await extractContentRootLineageLinks(browser, rawHtml, verifiedReceipt.final_url || item.url, receiptJsonPath, item.brand_id, item.brand_name);
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
              cohort: 'COHORT_B_OFFERS',
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

      // Step G: Update item in registry & handle backoff
      const itemInReg = registry.items.find(r => r.item_id === item.item_id);
      if (itemInReg) {
        itemInReg.last_checked_at = new Date().toISOString();
        itemInReg.last_http_status = verifiedReceipt.http_status;
        itemInReg.last_classification = classification;

        if (classification === 'ERROR_OR_BLOCKED_SOURCE') {
          itemInReg.consecutive_failures = (itemInReg.consecutive_failures || 0) + 1;
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

    // 4. Strict Reconciliation Invariance (Workstream C)
    const finalRegistryCount = registry.items.length;
    const isReconciled = (initialRegistryCount + totalNewDiscovered === finalRegistryCount);
    if (!isReconciled) {
      throw new Error(`FAIL-CLOSED: Reconciliation Invariance Broken! initial(${initialRegistryCount}) + discovered(${totalNewDiscovered}) != final(${finalRegistryCount})`);
    }

    registry.last_updated_at = new Date().toISOString();
    registry.total_items = finalRegistryCount;
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
      worker_identifier: 'JAYT_AUTONOMOUS_SUPPLY_WORKER_147',
      directive: 'JAYT-147: KHÔI PHỤC TÍNH TIN CẬY CỦA AUTONOMOUS SUPPLY ENGINE',
      execution_mode: isScheduledCycle ? 'SCHEDULED_CYCLE' : (isSmoke ? 'SMOKE_RUN' : 'MANUAL_BATCH'),
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
      summary: {
        items_processed: executionResults.length,
        trusted_receipts: executionResults.filter(r => r.is_trusted).length,
        unproven_receipts: executionResults.filter(r => !r.is_trusted).length,
        new_leaf_urls_discovered: totalNewDiscovered,
        rejected_candidates_filtered: totalRejectedCandidates,
        total_registered_targets_now: finalRegistryCount,
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
    console.log(`✅ SUPPLY ENGINE 147 CYCLE COMPLETED: ${executionResults.length} processed.`);
    console.log(`- Run ID: ${runId}`);
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
  let limit = 0;
  let isSmoke = false;
  let isScheduledCycle = false;

  if (args.includes('--scheduled-cycle')) {
    isScheduledCycle = true;
    limit = DEFAULT_BATCH_CAP; // Up to 20
  } else if (args.includes('--run-once') || args.includes('--smoke')) {
    isSmoke = true;
    limit = 2;
  }

  const limitIdx = args.indexOf('--limit');
  if (limitIdx !== -1 && args[limitIdx + 1]) {
    limit = parseInt(args[limitIdx + 1], 10);
  }

  runSupplyEngine147({ limit, isSmoke, isScheduledCycle }).then(res => {
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
  runSupplyEngine147
};
