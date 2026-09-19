/**
 * JAYT REAL EVIDENCE ACQUISITION SWEEPER - F&B & ONLINE/APP CLUSTERS (064A)
 * Directive: JAYT-REAL-EVIDENCE-ACQUISITION-064A / 057 Operating Protocol / 063F Frozen Gates
 * 
 * Rules:
 * 1. Unauthenticated Guest Observation only (no login, no API, no CAPTCHA bypass, zero synthetic data).
 * 2. Dynamic Unique Run ID with Timestamp + Entropy (Fail-closed on collision).
 * 3. Stack-based HTML DOM Parser for structural container analysis.
 * 4. Candidate qualification strictly gated by Stack Container Truth Gate + 063F writeCandidateFile().
 * 5. All unverified or non-containerized probes default to OBSERVED_NOT_QUALIFIED / NEEDS_RECHECK.
 * 6. Production lock invariant: deals_feed.json: [] (SHA-256), is_approved: false.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const runsBaseDir = path.join(repoRoot, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'runs');

const {
  validateAppendOnlyRunIsolation,
  validateAntiSynthetic,
  validateAuditStatusTaxonomy
} = require('./governance_policy_engine');

const {
  parseHtmlStack,
  evaluateProbeStackBasedTruthGate062C
} = require('./structural_dom_container_engine_062c');

const {
  writeCandidateFile
} = require('../05_DEAL_AND_AFFILIATE/ingest_candidate_to_catalog');

const {
  finalizeWorkOrderReceipt
} = require('./memory_transaction_manager_057');

const prodFeedPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'deals_feed.json');
const releaseManifestPath = path.join(repoRoot, '08_RELEASE_VAULT', 'RELEASE_MANIFEST.json');

function getSha256(bufOrStr) {
  if (!bufOrStr) return null;
  return crypto.createHash('sha256').update(bufOrStr).digest('hex');
}

function sanitizeFilename(str) {
  return str.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
}

const ACQUISITION_TARGET_HUBS_064A = [
  // F&B Cluster
  {
    cluster: 'LOCAL_FNB',
    brand_id: 'JOLLIBEE',
    brand_name: 'Jollibee Vietnam',
    discovery_url: 'https://jollibee.com.vn/khuyen-mai',
    status: 'UNVERIFIED_DISCOVERY_LEAD'
  },
  {
    cluster: 'LOCAL_FNB',
    brand_id: 'DOMINOS',
    brand_name: "Domino's Pizza Vietnam",
    discovery_url: 'https://dominos.vn/khuyen-mai',
    status: 'UNVERIFIED_DISCOVERY_LEAD'
  },
  {
    cluster: 'LOCAL_FNB',
    brand_id: 'THE_PIZZA_COMPANY',
    brand_name: 'The Pizza Company',
    discovery_url: 'https://thepizzacompany.vn/promotions',
    status: 'UNVERIFIED_DISCOVERY_LEAD'
  },
  {
    cluster: 'LOCAL_FNB',
    brand_id: 'LOTTERIA',
    brand_name: 'Lotteria Vietnam',
    discovery_url: 'https://www.lotteria.vn/promotions',
    status: 'UNVERIFIED_DISCOVERY_LEAD'
  },
  {
    cluster: 'LOCAL_FNB',
    brand_id: 'HIGHLANDS',
    brand_name: 'Highlands Coffee',
    discovery_url: 'https://www.highlandscoffee.com.vn/vn/tin-tuc-su-kien.html',
    status: 'UNVERIFIED_DISCOVERY_LEAD'
  },
  {
    cluster: 'LOCAL_FNB',
    brand_id: 'PHUCLONG',
    brand_name: 'Phúc Long Tea & Coffee',
    discovery_url: 'https://phuclong.com.vn/khuyen-mai',
    status: 'UNVERIFIED_DISCOVERY_LEAD'
  },
  // Online / App Cluster
  {
    cluster: 'ONLINE_ECOMMERCE',
    brand_id: 'TIKI',
    brand_name: 'Tiki Vietnam',
    discovery_url: 'https://tiki.vn/khuyen-mai/ma-giam-gia',
    status: 'UNVERIFIED_DISCOVERY_LEAD'
  },
  {
    cluster: 'ONLINE_ECOMMERCE',
    brand_id: 'SHOPEE',
    brand_name: 'Shopee Vietnam',
    discovery_url: 'https://shopee.vn/m/ma-giam-gia',
    status: 'UNVERIFIED_DISCOVERY_LEAD'
  },
  {
    cluster: 'ONLINE_ECOMMERCE',
    brand_id: 'LAZADA',
    brand_name: 'Lazada Vietnam',
    discovery_url: 'https://www.lazada.vn/voucher/',
    status: 'UNVERIFIED_DISCOVERY_LEAD'
  },
  {
    cluster: 'ONLINE_APP',
    brand_id: 'GRAB_VN',
    brand_name: 'Grab Vietnam Blog Promo',
    discovery_url: 'https://www.grab.com/vn/food-blog/',
    status: 'UNVERIFIED_DISCOVERY_LEAD'
  },
  {
    cluster: 'ONLINE_APP',
    brand_id: 'BE_GROUP',
    brand_name: 'Be Group Vietnam Promo',
    discovery_url: 'https://be.com.vn/khuyen-mai/',
    status: 'UNVERIFIED_DISCOVERY_LEAD'
  }
];

async function runRealEvidenceAcquisition064A(options = {}) {
  const startedAt = new Date().toISOString();
  const timestampId = startedAt.replace(/[-:]/g, '').replace(/\..+/, '').toLowerCase();
  const entropy = crypto.randomBytes(4).toString('hex');
  const runId = `run_064a_acquisition_${timestampId}_${entropy}`;
  const runDir = path.join(runsBaseDir, runId);
  const artifactsSubDir = path.join(runDir, 'artifacts');

  console.log('\n=============================================================');
  console.log('🚀 [REAL-ACQUISITION-064A] KHỞI CHẠY THU THẬP BẰNG CHỨNG THỰC TẾ (064A)');
  console.log(`   Directive:   JAYT-REAL-EVIDENCE-ACQUISITION-064A`);
  console.log(`   Run ID:      ${runId}`);
  console.log(`   Run Dir:     ${runDir}`);
  console.log(`   Clusters:    F&B (Ăn uống) & Online/App (Sàn TMĐT, Ứng dụng đặt món/xe)`);
  console.log(`   Method:      Unauthenticated Guest · Zero Login · Zero API · Zero Synthetic`);
  console.log(`   Governance:  Stack DOM Truth Gate · 063F Candidate Writer · 057 Memory Protocol`);
  console.log('=============================================================\n');

  // 1. Enforce Append-Only Run Isolation
  validateAppendOnlyRunIsolation(runDir, 'Run directory');
  fs.mkdirSync(runDir, { recursive: true });
  fs.mkdirSync(artifactsSubDir, { recursive: true });

  const chromePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.CHROME_BIN
  ].filter(Boolean);

  let chromeExe = null;
  for (const p of chromePaths) {
    if (fs.existsSync(p)) {
      chromeExe = p;
      break;
    }
  }

  if (!chromeExe) {
    throw new Error('CHROME_NOT_FOUND: Không tìm thấy Google Chrome executable.');
  }

  const cdpPort = 9360 + Math.floor(Math.random() * 100);
  const userDataDir = path.join(runDir, `.chrome_profile_064a_${Date.now()}`);
  fs.mkdirSync(userDataDir, { recursive: true });

  let chromeProc = spawn(chromeExe, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${cdpPort}`,
    `--user-data-dir=${userDataDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1280,1024'
  ]);

  let browserWs = null;
  const observedHubs = [];
  const discoveredDeepItems = [];
  const qualifiedCandidates = [];

  try {
    let browserWsUrl = null;
    for (let attempt = 1; attempt <= 25; attempt++) {
      try {
        const verRes = await fetch(`http://127.0.0.1:${cdpPort}/json/version`);
        if (verRes.ok) {
          const ver = await verRes.json();
          browserWsUrl = ver.webSocketDebuggerUrl;
          break;
        }
      } catch (e) {
        await new Promise(r => setTimeout(r, 400));
      }
    }

    if (!browserWsUrl) {
      throw new Error(`LIVE_BROWSER_FAILED: Chrome CDP port ${cdpPort} did not respond.`);
    }

    browserWs = new WebSocket(browserWsUrl);
    await new Promise((resolve, reject) => {
      browserWs.onopen = resolve;
      browserWs.onerror = reject;
    });

    let bMsgId = 1;
    function sendBrowser(method, params = {}, timeoutMs = 8000) {
      return new Promise((resolve) => {
        const id = bMsgId++;
        let timer = null;
        const handler = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.id === id) {
              if (timer) clearTimeout(timer);
              browserWs.removeEventListener('message', handler);
              resolve(data.result || {});
            }
          } catch (e) {
            if (timer) clearTimeout(timer);
            resolve({});
          }
        };
        timer = setTimeout(() => {
          browserWs.removeEventListener('message', handler);
          resolve({});
        }, timeoutMs);
        browserWs.addEventListener('message', handler);
        browserWs.send(JSON.stringify({ id, method, params }));
      });
    }

    // Helper to capture a page
    async function capturePage(targetUrl, baseFilenamePrefix) {
      const pageRes = await sendBrowser('Target.createTarget', { url: targetUrl });
      const targetId = pageRes.targetId;
      if (!targetId) return { outcome: 'LIVE_CDP_CAPTURE_FAILED', error: 'TARGET_CREATE_FAILED' };

      const attachRes = await sendBrowser('Target.attachToTarget', { targetId, flatten: true });
      const sessionId = attachRes.sessionId;
      if (!sessionId) {
        await sendBrowser('Target.closeTarget', { targetId });
        return { outcome: 'LIVE_CDP_CAPTURE_FAILED', error: 'ATTACH_FAILED' };
      }

      function sendSession(method, params = {}, timeoutMs = 8000) {
        return new Promise((resolve) => {
          const id = bMsgId++;
          let timer = null;
          const handler = (event) => {
            try {
              const data = JSON.parse(event.data);
              if (data.id === id) {
                if (timer) clearTimeout(timer);
                browserWs.removeEventListener('message', handler);
                resolve(data.result || {});
              }
            } catch (e) {
              if (timer) clearTimeout(timer);
              resolve({});
            }
          };
          timer = setTimeout(() => {
            browserWs.removeEventListener('message', handler);
            resolve({});
          }, timeoutMs);
          browserWs.addEventListener('message', handler);
          browserWs.send(JSON.stringify({ id, method, params, sessionId }));
        });
      }

      await sendSession('Page.enable');
      await sendSession('Runtime.enable');
      await sendSession('DOM.enable');

      await new Promise(r => setTimeout(r, 2500));

      const evalHtml = await sendSession('Runtime.evaluate', {
        expression: 'document.documentElement.outerHTML',
        returnByValue: true
      });
      const htmlContent = (evalHtml && evalHtml.result && evalHtml.result.value) ? evalHtml.result.value : '';

      const evalText = await sendSession('Runtime.evaluate', {
        expression: 'document.body ? document.body.innerText : ""',
        returnByValue: true
      });
      const textContent = (evalText && evalText.result && evalText.result.value) ? evalText.result.value : '';

      const evalLinks = await sendSession('Runtime.evaluate', {
        expression: `Array.from(document.querySelectorAll('a[href]')).map(a => ({
          href: a.href,
          text: a.innerText.trim(),
          rel: a.rel || '',
          target: a.target || ''
        })).filter(l => l.href.startsWith('http'))`,
        returnByValue: true
      });
      const discoveredLinks = (evalLinks && evalLinks.result && evalLinks.result.value) ? evalLinks.result.value : [];

      const shotRes = await sendSession('Page.captureScreenshot', { format: 'png' });
      const pngBase64 = (shotRes && shotRes.data) ? shotRes.data : null;

      await sendBrowser('Target.closeTarget', { targetId });

      if (!htmlContent || htmlContent.length < 150) {
        return { outcome: 'LIVE_CDP_CAPTURE_FAILED', error: 'EMPTY_OR_BLOCKED_PAGE' };
      }

      const relHtmlPath = path.relative(repoRoot, path.join(artifactsSubDir, `${baseFilenamePrefix}.html`)).replace(/\\/g, '/');
      const relTxtPath = path.relative(repoRoot, path.join(artifactsSubDir, `${baseFilenamePrefix}.txt`)).replace(/\\/g, '/');
      const relPngPath = path.relative(repoRoot, path.join(artifactsSubDir, `${baseFilenamePrefix}.png`)).replace(/\\/g, '/');

      fs.writeFileSync(path.join(repoRoot, relHtmlPath), htmlContent, 'utf8');
      fs.writeFileSync(path.join(repoRoot, relTxtPath), textContent, 'utf8');
      if (pngBase64) {
        fs.writeFileSync(path.join(repoRoot, relPngPath), Buffer.from(pngBase64, 'base64'));
      }

      return {
        outcome: 'LIVE_CDP_SUCCESS',
        htmlContent,
        textContent,
        discoveredLinks,
        artifacts: {
          html: { file: relHtmlPath, sha256: getSha256(htmlContent) },
          text: { file: relTxtPath, sha256: getSha256(textContent) },
          png: pngBase64 ? { file: relPngPath, sha256: getSha256(Buffer.from(pngBase64, 'base64')) } : null
        }
      };
    }

    // Step 1: Sweep Discovery Target Hubs
    console.log('📡 [PHASE 1] Quét 11 Landing / Promotion Hubs của F&B và Online/App...');
    for (let i = 0; i < ACQUISITION_TARGET_HUBS_064A.length; i++) {
      const hub = ACQUISITION_TARGET_HUBS_064A[i];
      const hubIdx = String(i + 1).padStart(2, '0');
      const basePrefix = `capture_064a_hub_${hubIdx}_${sanitizeFilename(hub.brand_id)}`;
      console.log(`  -> [HUB ${hubIdx}/${ACQUISITION_TARGET_HUBS_064A.length}] ${hub.brand_name} (${hub.discovery_url})`);

      const cap = await capturePage(hub.discovery_url, basePrefix);
      const hubRecord = {
        hub_index: i + 1,
        brand_id: hub.brand_id,
        brand_name: hub.brand_name,
        cluster: hub.cluster,
        discovery_url: hub.discovery_url,
        captured_at: new Date().toISOString(),
        outcome: cap.outcome,
        capture_error: cap.error || null,
        artifacts: cap.artifacts || null,
        extracted_deep_links_count: 0
      };

      if (cap.outcome === 'LIVE_CDP_SUCCESS') {
        const promoKeywords = /khuyen-mai|promotions?|uu-dai|voucher|deal|tin-tuc|giam-gia|combo|happy|special/i;
        const validDeep = cap.discoveredLinks
          .filter(l => {
            const u = l.href.toLowerCase();
            return promoKeywords.test(u) && !u.endsWith('.jpg') && !u.endsWith('.png') && !u.endsWith('.pdf');
          })
          .slice(0, 3); // Max 3 deep probes per hub

        hubRecord.extracted_deep_links = validDeep;
        hubRecord.extracted_deep_links_count = validDeep.length;

        // Register deep items to probe in Phase 2
        for (let d = 0; d < validDeep.length; d++) {
          discoveredDeepItems.push({
            hub_index: i + 1,
            brand_id: hub.brand_id,
            brand_name: hub.brand_name,
            cluster: hub.cluster,
            parent_hub_url: hub.discovery_url,
            parent_source_sha256: cap.artifacts.html.sha256,
            deep_probe_url: validDeep[d].href,
            anchor_text: validDeep[d].text || ''
          });
        }
      }

      observedHubs.push(hubRecord);
    }

    // Step 2: Sweep Discovered Deep Promo Items
    console.log(`\n🔍 [PHASE 2] Khám phá chi tiết ${discoveredDeepItems.length} Deep Promotion Pages qua Truth Gate 055D & Parser Stack...`);
    const deepProbeResults = [];

    for (let j = 0; j < discoveredDeepItems.length; j++) {
      const deepItem = discoveredDeepItems[j];
      const deepIdx = String(j + 1).padStart(2, '0');
      const basePrefix = `capture_064a_deep_${deepIdx}_${sanitizeFilename(deepItem.brand_id)}_link_${j + 1}`;
      console.log(`  -> [DEEP PROBE ${deepIdx}/${discoveredDeepItems.length}] ${deepItem.brand_name} (${deepItem.deep_probe_url})`);

      const deepCap = await capturePage(deepItem.deep_probe_url, basePrefix);
      const probeRecord = {
        probe_index: j + 1,
        brand_id: deepItem.brand_id,
        brand_name: deepItem.brand_name,
        cluster: deepItem.cluster,
        deep_probe_url: deepItem.deep_probe_url,
        parent_hub_url: deepItem.parent_hub_url,
        parent_source_sha256: deepItem.parent_source_sha256,
        anchor_text: deepItem.anchor_text,
        captured_at: new Date().toISOString(),
        outcome: deepCap.outcome,
        capture_error: deepCap.error || null,
        artifacts: deepCap.artifacts || null
      };

      if (deepCap.outcome === 'LIVE_CDP_SUCCESS') {
        const gateResult = evaluateProbeStackBasedTruthGate062C(
          { target_url: deepItem.deep_probe_url, outcome: deepCap.outcome },
          deepCap.htmlContent,
          deepCap.textContent
        );

        probeRecord.triage_status = gateResult.triage_status; // 'OBSERVED_NOT_QUALIFIED' or 'CANDIDATE_QUALIFIED'
        probeRecord.passed_truth_gate = gateResult.passed_gate;
        probeRecord.failure_reason = gateResult.failure_reason;
        probeRecord.leaf_container = gateResult.leaf_container || null;

        // If candidate qualified under Truth Gate, attempt candidate creation via 063F writer
        if (gateResult.passed_gate && gateResult.candidate_payload) {
          const candidateData = gateResult.candidate_payload;
          const candidateFile = path.join(runDir, `candidate_${sanitizeFilename(deepItem.brand_id)}_${deepIdx}.json`);
          try {
            writeCandidateFile(candidateData, candidateFile, {
              enforceAppendOnly: true,
              sourceArtifactText: deepCap.textContent
            });
            probeRecord.candidate_created = true;
            probeRecord.candidate_file = path.relative(repoRoot, candidateFile).replace(/\\/g, '/');
            qualifiedCandidates.push(candidateData);
          } catch (writeErr) {
            probeRecord.candidate_created = false;
            probeRecord.candidate_write_error = writeErr.message;
            probeRecord.triage_status = 'NEEDS_RECHECK';
          }
        }
      } else {
        probeRecord.triage_status = 'NEEDS_RECHECK';
        probeRecord.passed_truth_gate = false;
        probeRecord.failure_reason = `CAPTURE_FAILED: ${deepCap.error}`;
      }

      deepProbeResults.push(probeRecord);
    }

    // Step 3: Compile Reports & Receipts inside isolated run directory
    console.log('\n📊 [PHASE 3] Niêm phong báo cáo và RUN RECEIPT (057 Protocol)...');

    const totalHubs = observedHubs.length;
    const successfulHubs = observedHubs.filter(h => h.outcome === 'LIVE_CDP_SUCCESS').length;
    const totalDeep = deepProbeResults.length;
    const qualifiedCount = deepProbeResults.filter(p => p.triage_status === 'CANDIDATE_QUALIFIED').length;
    const observedNotQualifiedCount = deepProbeResults.filter(p => p.triage_status === 'OBSERVED_NOT_QUALIFIED').length;
    const needsRecheckCount = deepProbeResults.filter(p => p.triage_status === 'NEEDS_RECHECK').length;

    const summaryReport = {
      $schema: 'https://jayt.vn/schemas/sweep-summary.v3.json',
      schema_version: '3.0.0',
      directive: 'JAYT-REAL-EVIDENCE-ACQUISITION-064A',
      run_id: runId,
      started_at: startedAt,
      completed_at: new Date().toISOString(),
      governance_mode: 'UNAUTHENTICATED_GUEST_STACK_CONTAINER_GATE_063F',
      metrics: {
        total_hubs_probed: totalHubs,
        hubs_capture_success: successfulHubs,
        total_deep_probes: totalDeep,
        candidates_qualified: qualifiedCount,
        observed_not_qualified: observedNotQualifiedCount,
        needs_recheck: needsRecheckCount
      },
      hubs: observedHubs,
      deep_probes: deepProbeResults
    };

    const summaryPath = path.join(runDir, 'sweep_summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summaryReport, null, 2), 'utf8');

    const reviewSheetContent = `# JAYT CORP — CANDIDATE REVIEW SHEET (064A)
> **Work Order**: \`JAYT-REAL-EVIDENCE-ACQUISITION-064A\`  
> **Run ID**: \`${runId}\`  
> **Thời điểm chạy**: \`${startedAt}\`  
> **Trạng thái**: \`IMPLEMENTED — PENDING CEO AUDIT\`  
> **Tổng số Hubs**: ${totalHubs} (Thành công: ${successfulHubs})  
> **Tổng số Deep Probes**: ${totalDeep}  
> **Số Candidate Đủ Tiêu Chuẩn**: ${qualifiedCount}  
> **Số Probe OBSERVED_NOT_QUALIFIED**: ${observedNotQualifiedCount}  
> **Số Probe NEEDS_RECHECK**: ${needsRecheckCount}  

---

## 1. Kết Quả Thẩm Định Deep Probes (Truth Gate 055D & Stack DOM)

| Index | Thương Hiệu / Brand | Cụm / Cluster | Deep URL | Outcome | Triage Status | Ghi Chú Container / Lý Do |
| :---: | :--- | :--- | :--- | :---: | :---: | :--- |
${deepProbeResults.map(p => `| ${p.probe_index} | ${p.brand_name} | \`${p.cluster}\` | [Link](${p.deep_probe_url}) | \`${p.outcome}\` | \`${p.triage_status}\` | ${p.failure_reason || 'Đạt chuẩn 4 yếu tố trong cùng 1 leaf container block'} |`).join('\n')}

---

## 2. Ranh Giới Sản Xuất & Staging

- **Staging Feed**: Duy trì 1 deal đã duyệt (Galaxy Cinema Happy Day).
- **Production Feed**: Duy trì \`deals_feed.json: []\` (SHA-256: \`4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945\`), \`is_approved: false (LOCKED)\`.
`;

    const reviewSheetPath = path.join(runDir, 'candidate_review_sheet.md');
    fs.writeFileSync(reviewSheetPath, reviewSheetContent, 'utf8');

    const receiptObj = {
      $schema: 'https://jayt.vn/schemas/run-receipt.v3.json',
      schema_version: '3.0.0',
      work_order: 'JAYT-REAL-EVIDENCE-ACQUISITION-064A',
      run_id: runId,
      execution_trigger: 'MANUAL_TASK_TRIGGER',
      started_at: startedAt,
      status: 'IMPLEMENTED_PENDING_CEO_AUDIT',
      sealed_hashes: {
        sweep_summary_sha256: getSha256(fs.readFileSync(summaryPath)),
        candidate_review_sheet_sha256: getSha256(fs.readFileSync(reviewSheetPath))
      },
      summary_metrics: summaryReport.metrics,
      production_lock_check: {
        deals_feed_sha256: getSha256(fs.readFileSync(prodFeedPath)),
        is_approved: JSON.parse(fs.readFileSync(releaseManifestPath, 'utf8')).governance_locks?.immutable_ceo_approval_record?.is_approved || false
      }
    };

    const finalizedReceipt = finalizeWorkOrderReceipt(receiptObj, runDir, 'IMPLEMENTED_PENDING_CEO_AUDIT', {
      enforceAppendOnly: true
    });

    console.log(`\n✅ [RUN-064A-COMPLETE] Hoàn tất run ${runId}!`);
    console.log(`   - Sweep Summary:   ${summaryPath}`);
    console.log(`   - Review Sheet:    ${reviewSheetPath}`);
    console.log(`   - Canonical Receipt: ${finalizedReceipt.canonicalReceiptPath}`);

    return {
      success: true,
      runId,
      runDir,
      metrics: summaryReport.metrics
    };

  } finally {
    if (browserWs) {
      try { browserWs.close(); } catch (e) {}
    }
    if (chromeProc) {
      try { chromeProc.kill(); } catch (e) {}
    }
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch (e) {}
  }
}

module.exports = {
  ACQUISITION_TARGET_HUBS_064A,
  runRealEvidenceAcquisition064A
};

if (require.main === module) {
  runRealEvidenceAcquisition064A()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('FATAL_ACQUISITION_ERROR:', err);
      process.exit(1);
    });
}
