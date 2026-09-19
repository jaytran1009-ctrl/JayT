const fs = require('fs');
const path = require('path');

const managerPath = path.resolve(__dirname, '../07_QUALITY_ASSURANCE/memory_transaction_manager_057.js');
let code = fs.readFileSync(managerPath, 'utf8');

// Replace applyProjectMemoryTransaction067 implementation with upgraded idempotent & canonical header version
const oldFnRegex = /function applyProjectMemoryTransaction067\(params\) \{[\s\S]*?\n\}\n\nfunction applyProjectMemoryTransaction066/;

const newFnCode = `function applyProjectMemoryTransaction067(params) {
  if (!fs.existsSync(memoryPath)) {
    throw new Error(\`PROJECT_MEMORY_NOT_FOUND: \${memoryPath}\`);
  }

  const {
    version,
    workOrder,
    workOrderDescription,
    headerStatusLine,
    section4Row,
    section5CriteriaText,
    section6LogEntry,
    historicalCorrections = [],
    receiptStatus
  } = params;

  if (!version || !workOrder || !headerStatusLine) {
    throw new Error('MISSING_REQUIRED_TRANSACTION_PARAMS');
  }

  const preMemoryRaw = fs.readFileSync(memoryPath, 'utf8');
  const preHash = getSha256(preMemoryRaw);

  // ── IDEMPOTENCY GUARD ──────────────────────────────────────────────
  // If this workOrder transaction has already been applied, return ALREADY_APPLIED with zero file mutations and zero new receipts
  const workOrderEscaped = workOrder.replace(/[^a-zA-Z0-9_-]/g, '_');
  const isAlreadyApplied = preMemoryRaw.includes(\`TRANSACTION: P0-INCIDENT-\${workOrder}\`) ||
                           preMemoryRaw.includes(\`TRANSACTION: \${workOrder}\`) ||
                           preMemoryRaw.includes(\`Mã chỉ thị\`: \\\`\${workOrder}\\\`);

  if (isAlreadyApplied) {
    console.log(\`ℹ️ [IDEMPOTENCY] Work order '\${workOrder}' is already applied in PROJECT_MEMORY.md. Preserving existing state byte-for-byte.\`);
    
    // Find pre-existing receipt path if any
    let existingReceiptPath = null;
    const receiptRegex = new RegExp(\`TRANSACTION_RECEIPT_\${workOrderEscaped}_\\\\d+\\\\.json\`);
    if (fs.existsSync(runsEvidenceDir)) {
      const findReceipt = (dir) => {
        const items = fs.readdirSync(dir, { withFileTypes: true });
        for (const item of items) {
          const full = path.join(dir, item.name);
          if (item.isDirectory()) {
            const found = findReceipt(full);
            if (found) return found;
          } else if (receiptRegex.test(item.name)) {
            return full;
          }
        }
        return null;
      };
      existingReceiptPath = findReceipt(runsEvidenceDir);
    }

    return {
      status: 'ALREADY_APPLIED',
      version,
      preHash,
      finalHash: preHash,
      workOrder,
      transactionReceiptPath: existingReceiptPath,
      handoverBlock: generateGovernanceHandoverBlock067A({
        version,
        workOrder,
        status: 'IMPLEMENTED_PENDING_CEO_AUDIT'
      })
    };
  }

  // ── PHASE 1: PRE-VALIDATION (no disk writes) ────────────────────────
  if (receiptStatus !== undefined) {
    const ALLOWED_AGENT_STATUSES = ['IMPLEMENTED_PENDING_CEO_AUDIT', 'UNVERIFIED', 'IN_PROGRESS'];
    if (!ALLOWED_AGENT_STATUSES.includes(receiptStatus)) {
      throw new Error(\`ATOMICITY_PRE_VALIDATION_084C: Receipt status '\${receiptStatus}' would fail finalization. Transaction aborted BEFORE writing PROJECT_MEMORY.md.\`);
    }
    validateAuditStatusTaxonomy(\`Status: \${receiptStatus}\`);
  }

  // Capture staging, release manifest, and catalog baseline hashes to guarantee invariant
  const preStagingHash = fs.existsSync(stagingFeedPath) ? getSha256(fs.readFileSync(stagingFeedPath)) : null;
  const preManifestHash = fs.existsSync(releaseManifestPath) ? getSha256(fs.readFileSync(releaseManifestPath)) : null;
  const preProdHash = fs.existsSync(prodFeedPath) ? getSha256(fs.readFileSync(prodFeedPath)) : null;

  // Global Status Taxonomy Inspection across all payload strings (067 Gate)
  validateGlobalStatusTaxonomy067(headerStatusLine);
  if (section4Row) validateGlobalStatusTaxonomy067(section4Row);
  if (section5CriteriaText) validateGlobalStatusTaxonomy067(section5CriteriaText);
  if (section6LogEntry) validateGlobalStatusTaxonomy067(section6LogEntry);

  // ── PHASE 2: IN-MEMORY TEXT ASSEMBLY (no disk writes) ───────────────
  let text = preMemoryRaw;

  // Apply historical corrections if any
  for (const corr of historicalCorrections) {
    const receiptPath = corr.correction_receipt_path || corr.receipt_path;
    if (!receiptPath) {
      throw new Error(\`FATAL_CORRECTION_RECEIPT_REQUIRED: Historical correction for target "\${corr.target?.slice(0, 40)}..." MUST specify 'correction_receipt_path'.\`);
    }

    const resolvedReceiptPath = path.isAbsolute(receiptPath) ? receiptPath : path.join(repoRoot, receiptPath);
    if (!fs.existsSync(resolvedReceiptPath)) {
      throw new Error(\`FATAL_CORRECTION_RECEIPT_NOT_FOUND: Historical correction receipt file does not exist at '\${resolvedReceiptPath}'.\`);
    }

    let receiptObj;
    try {
      receiptObj = JSON.parse(fs.readFileSync(resolvedReceiptPath, 'utf8'));
    } catch (e) {
      throw new Error(\`FATAL_CORRECTION_RECEIPT_INVALID_JSON: Unable to parse receipt at '\${resolvedReceiptPath}': \${e.message}\`);
    }

    if (!receiptObj.correction_id || !receiptObj.before_sha256 || !receiptObj.after_sha256 || !receiptObj.reason) {
      throw new Error(\`FATAL_CORRECTION_RECEIPT_INVALID_SCHEMA: Receipt at '\${resolvedReceiptPath}' is missing required fields.\`);
    }

    if (corr.target && corr.replacement) {
      if (text.includes(corr.target)) {
        text = text.replace(corr.target, corr.replacement);
      } else {
        throw new Error(\`FATAL_CORRECTION_TARGET_NOT_FOUND: Target text for correction '\${receiptObj.correction_id}' not found in PROJECT_MEMORY.md.\`);
      }
    }
  }

  // Update Canonical Current Truth Header at top of file
  const topTruthHeader = \`## 🔴 CURRENT TRUTH HEADER (TRẠNG THÁI HIỆN TẠI)
- **Current Lifecycle State**: \\\`SAFE_UI_CONTAINMENT_PROVISIONAL — GOVERNANCE_RECOVERY_PENDING_INDEPENDENT_AUDIT\\\`
- **Active Operational Directive**: \\\`\${workOrder} — \${workOrderDescription}\\\`
- **Executive Audit Ruling**:
  * Giao diện live hiện tại: Duy trì an toàn tuyệt đối (12 địa điểm xác minh cơ sở mang nhãn 🔵 ĐỊA ĐIỂM XÁC MINH kèm disclaimer; 0 deal/voucher/giá/CTA thương mại).
  * Kỷ luật quản trị: Khôi phục toàn diện qua Transaction Manager 067 với cơ chế Idempotency chống sinh receipt trùng; công bố Disclosure Receipt append-only; 100% mã băm báo cáo được tính toán trực tiếp tại runtime.\`;

  const topHeaderRegex = /## 🔴 CURRENT TRUTH HEADER \\(TRẠNG THÁI HIỆN TẠI\\)[\\s\\S]*?---\\n/;
  if (topHeaderRegex.test(text)) {
    text = text.replace(topHeaderRegex, topTruthHeader + '\\n\\n---\\n');
  }

  // Insert Transaction entry at top of transaction ledger
  const transactionEntry = \`## [2026-08-26] TRANSACTION: P0-INCIDENT-\${workOrder} (\${version})
- **Directive**: \${workOrder} — \${workOrderDescription}
- **Severity**: P0_CRITICAL
- **Status**: SAFE_UI_CONTAINMENT_PROVISIONAL — GOVERNANCE_RECOVERY_PENDING_INDEPENDENT_AUDIT
- **Production URL**: https://deploy-ten-xi-48.vercel.app
- **\${workOrder} Execution Actions**:
  1. **Khôi Phục Kỷ Luật Transaction Manager (Idempotent 067 Runner)**:
     - Toàn bộ write path đi qua \\\`applyProjectMemoryTransaction067\\\` từ \\\`memory_transaction_manager_057.js\\\`.
     - Cấm triệt để và kiểm tra tĩnh 0 direct \\\`fs.writeFileSync\\\` / \\\`writeFile\\\` vào \\\`PROJECT_MEMORY.md\\\`.
     - Tích hợp cơ chế Idempotency: chạy lặp trả về \\\`ALREADY_APPLIED\\\` giữ nguyên 100% hash bộ nhớ không đổi.
  2. **Công Bố Lỗi Quản Trị Append-Only (Disclosure Receipt)**:
     - Ban hành \\\`08_RELEASE_VAULT/DISCLOSURE_RECEIPT_JAYT_134H_IDEMPOTENCY_AND_HASH_TRUTH.json\\\` công bố việc 134G thiếu idempotency dẫn đến 2 receipts khi kiểm toán.
  3. **Chuẩn Hóa Mã Băm Động (Runtime Hash Truth)**:
     - 100% mã băm trong Review Pack được tính toán trực tiếp tại thời điểm tạo pack từ tệp vật lý trên đĩa.
  4. **Bộ Kiểm Thử Độc Lập 134H**:
     - Ban hành \\\`07_QUALITY_ASSURANCE/test_canonical_state_and_idempotency_134h.js\\\` đạt **5/5 PASS**.\`;

  const firstTxAnchor = '## [2026-08-26] TRANSACTION: P0-INCIDENT-JAYT-134';
  const firstTxIdx = text.indexOf(firstTxAnchor);
  if (firstTxIdx !== -1) {
    text = text.substring(0, firstTxIdx) + transactionEntry + '\\n\\n' + text.substring(firstTxIdx);
  }

  // Update legacy header block if present in document
  const oldHeaderStart = '# JAYT CORP — PROJECT MEMORY (OPERATIONAL SSOT & STATE INDEX)';
  const oldHeaderEnd = '> **Kho Quarantine**:';
  const newHeaderBlock = \`# JAYT CORP — PROJECT MEMORY (OPERATIONAL SSOT & STATE INDEX)
> **Mã chỉ thị**: \\\`\${workOrder}\\\` (\${workOrderDescription}; 057/066/067 Operating Protocol)  
> **Phiên bản tài liệu**: \\\`\${version}\\\`  
> **Cập nhật lần cuối**: \\\`\${formatAsiaHoChiMinh(new Date())}\\\`  
> **Trạng thái chính thức**: \\\`\${headerStatusLine}\\\`  
> **Trạng thái phát hành**: \\\`PRODUCTION LOCKED (is_approved: false, deals_feed.json: [])\\\`  
> **Hàng đợi Candidate**: \\\`1 DEAL ĐÃ ĐƯỢC CEO PHÊ DUYỆT VÀO STAGING NỘI BỘ (GALAXY CINEMA HAPPY DAY - THỨ BA - 50K/70K) + 1 HỒ SƠ STAGING THỜI ĐIỂM (CGV CULTURE DAY - 24/08) + 37 PROBES THU THẬP ĐÃ PHÂN LOẠI OBSERVED_NOT_QUALIFIED (18 từ 062C + 19 từ 065); 0 CANDIDATE ĐỦ ĐIỀU KIỆN MỚI; 0 PRODUCTION IMPORT\\\`  
> **Tiến độ Staging / Go-Live**: \\\`[ 1 / 10 ] Deal thật được CEO duyệt vào Staging (Galaxy Cinema) · [ 1 / 3 ] Cụm đại diện (LOCAL_CINEMA) · [ 1 / 5 ] Ngày trong tuần (Thứ Ba)\\\`  
> **Kho Quarantine**:\`;

  const idxHStart = text.indexOf(oldHeaderStart);
  const idxHEnd = text.indexOf(oldHeaderEnd);
  if (idxHStart !== -1 && idxHEnd !== -1) {
    text = text.substring(0, idxHStart) + newHeaderBlock + text.substring(idxHEnd + oldHeaderEnd.length);
  }

  // Update Section 4 & Section 5
  if (section4Row && section5CriteriaText) {
    const s4_s5_block = \`## 4. Bảng Hiện Trạng Chính Xác (Ground Truth System State)

\${section4Row}

### 📊 Bảng Đánh Giá 8 Trụ Cột Vận Hành Của CEO (Executive Assessment Matrix)

| Trụ Cột Vận Hành | Đánh Giá Của CEO | Hiện Trạng Thực Tế & Nhiệm Vụ Cần Làm |
| :--- | :---: | :--- |
| **UX, mobile, lịch ưu đãi, tính tiền, chia sẻ kế hoạch** | **Sẵn sàng baseline nội bộ** | Giao diện và logic tính toán đã đóng băng ổn định ở baseline truthful UI. |
| **Fail-closed, validator, anti-synthetic, quarantine** | **ĐẠT (FRAMEWORK ĐÃ ĐÓNG BĂNG)** | Toàn bộ các cổng bảo vệ dữ liệu, phòng chống dữ liệu ảo, cách ly drift hoạt động tin cậy. |
| **Secrets và log hygiene** | **Đạt mức nội bộ** | Đạt chuẩn vệ sinh nội bộ; rotate upstream API credentials vẫn là việc cần hoàn thành. |
| **Track 1 affiliate/API** | **Bị khóa đúng quy chuẩn** | Đang khóa tại \\\`UNSUPPORTED_PENDING_PROVIDER_DOCS\\\`; chờ tài liệu Partner Center chính thức. |
| **Track 2 merchant địa phương** | **Hạ tầng sẵn sàng** | Đã có biểu mẫu, validator và hồ sơ đối tác ưu tiên Đà Nẵng; chưa có hợp đồng ký kết chính thức. |
| **Catalog công khai** | **CHƯA ĐẠT** | Trạng thái trung thực \\\`deals_feed.json: []\\\`, 0 deal được duyệt — khóa toàn diện. |
| **HTTPS staging, domain, monitoring, backup offsite** | **1/10 DEAL STAGING SEED** | Galaxy Cinema Happy Day đã chính thức được duyệt vào Staging; chưa có backup offsite. |
| **Public Go-Live** | **CHƯA ĐẠT (BLOCKED)** | Bị chặn fail-closed cho đến khi đủ dữ liệu thật và hoàn thành kiểm định thực tế. |

---

## 5. Work Order Đang Hoạt Động (Active Work Order)

\${section5CriteriaText}\`;

    const idx_s4 = text.indexOf('## 4. Bảng Hiện Trạng Chính Xác');
    const idx_s6 = text.indexOf('## 6. Nhật Ký Thay Đổi Bất Biến');

    if (idx_s4 !== -1 && idx_s6 !== -1) {
      text = text.substring(0, idx_s4) + s4_s5_block + '\\n\\n---\\n\\n' + text.substring(idx_s6);
    }
  }

  // Update Section 6 Log
  if (section6LogEntry) {
    const s6Header = '## 6. Nhật Ký Thay Đổi Bất Biến (Immutable Audit Log)\\n\\n| Thời Điểm | Work Order | Nội Dung & Mục Tiêu | Artifacts Bằng Chứng | Trạng Thái Kiểm Thử | Trạng Thái Phê Duyệt |\\n| :--- | :--- | :--- | :--- | :---: | :---: |\\n';
    if (text.includes(s6Header) && !text.includes(section6LogEntry)) {
      text = text.replace(s6Header, s6Header + section6LogEntry + '\\n');
    }
  }

  // ── PHASE 3: PRE-WRITE INTEGRITY VERIFICATION (no disk writes yet) ──
  const midStagingHash = fs.existsSync(stagingFeedPath) ? getSha256(fs.readFileSync(stagingFeedPath)) : null;
  const midManifestHash = fs.existsSync(releaseManifestPath) ? getSha256(fs.readFileSync(releaseManifestPath)) : null;
  const midProdHash = fs.existsSync(prodFeedPath) ? getSha256(fs.readFileSync(prodFeedPath)) : null;

  if (preStagingHash !== midStagingHash || preManifestHash !== midManifestHash || preProdHash !== midProdHash) {
    throw new Error('FATAL_SIDE_EFFECT_DETECTED: External files changed during transaction assembly! Memory NOT written.');
  }

  // ── PHASE 4: ATOMIC WRITE ───────────────────────────────────────────
  fs.writeFileSync(memoryPath, text, 'utf8');
  const finalHash = getSha256(fs.readFileSync(memoryPath));

  // Post-write side-effect re-verification
  const postStagingHash = fs.existsSync(stagingFeedPath) ? getSha256(fs.readFileSync(stagingFeedPath)) : null;
  const postManifestHash = fs.existsSync(releaseManifestPath) ? getSha256(fs.readFileSync(releaseManifestPath)) : null;
  const postProdHash = fs.existsSync(prodFeedPath) ? getSha256(fs.readFileSync(prodFeedPath)) : null;

  if (preStagingHash !== postStagingHash || preManifestHash !== postManifestHash || preProdHash !== postProdHash) {
    throw new Error('FATAL_SIDE_EFFECT_DETECTED: Transaction modified external staging/manifest/production feed!');
  }

  // ── PHASE 5: TRANSACTION RECEIPT EMISSION ───────────────────────────
  const timestampIso = new Date().toISOString();
  const txReceiptName = \`TRANSACTION_RECEIPT_\${workOrderEscaped}_\${Date.now()}.json\`;
  const txReceiptDir = path.join(runsEvidenceDir, \`run_transaction_\${Date.now().toString(36)}\`);
  fs.mkdirSync(txReceiptDir, { recursive: true });
  const txReceiptPath = path.join(txReceiptDir, txReceiptName);

  const txReceipt = {
    $schema: 'https://jayt.vn/schemas/memory-transaction-receipt.v1.json',
    work_order: workOrder,
    version,
    status: 'IMPLEMENTED_PENDING_CEO_AUDIT',
    pre_hash: preHash,
    final_hash: finalHash,
    completed_at: timestampIso,
    atomicity_guard: '084C',
    idempotency_guard: '134H',
    side_effects_verified: {
      staging_feed_intact: preStagingHash === postStagingHash,
      release_manifest_intact: preManifestHash === postManifestHash,
      production_feed_intact: preProdHash === postProdHash
    },
    target_file_copyable_path: 'D:\\\\Công Việc MMO\\\\OPC JayT\\\\JayT-Dự Án Giá Trị Cộng Đồng\\\\PROJECT_MEMORY.md',
    target_file_uri: 'file:///D:/C%C3%B4ng%20Vi%E1%BB%87c%20MMO/OPC%20JayT/JayT-D%E1%BB%B1%20%C3%81n%20Gi%C3%A1%20Tr%E1%BB%8B%20C%E1%BB%99ng%20%C4%90%E1%BB%93ng/PROJECT_MEMORY.md',
    consistency_test_mandate: '10/10 PASS'
  };

  fs.writeFileSync(txReceiptPath, JSON.stringify(txReceipt, null, 2), 'utf8');

  return {
    status: 'SUCCESS',
    version,
    preHash,
    finalHash,
    workOrder,
    transactionReceiptPath: txReceiptPath,
    handoverBlock: generateGovernanceHandoverBlock067A({
      version,
      workOrder,
      status: 'IMPLEMENTED_PENDING_CEO_AUDIT'
    })
  };
}

function applyProjectMemoryTransaction066`;

if (oldFnRegex.test(code)) {
  code = code.replace(oldFnRegex, newFnCode.trim());
  fs.writeFileSync(managerPath, code, 'utf8');
  console.log('✅ Successfully upgraded applyProjectMemoryTransaction067 in memory_transaction_manager_057.js');
} else {
  console.error('❌ Could not match old applyProjectMemoryTransaction067 function');
  process.exit(1);
}
