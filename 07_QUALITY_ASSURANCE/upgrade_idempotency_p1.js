const fs = require('fs');
const path = require('path');

const managerPath = path.resolve(__dirname, '../07_QUALITY_ASSURANCE/memory_transaction_manager_057.js');
let code = fs.readFileSync(managerPath, 'utf8');

const targetOld = `  if (isAlreadyApplied) {
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
  }`;

const targetNew = `  if (isAlreadyApplied) {
    console.log(\`ℹ️ [IDEMPOTENCY] Work order '\${workOrder}' is already recorded in PROJECT_MEMORY.md. Validating runtime receipt lineage...\`);
    
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

    if (!existingReceiptPath || !fs.existsSync(existingReceiptPath)) {
      throw new Error(\`FATAL_IDEMPOTENCY_RECEIPT_NOT_FOUND: Work order '\${workOrder}' is referenced in PROJECT_MEMORY.md but no valid TRANSACTION_RECEIPT exists on disk.\`);
    }

    let receiptObj;
    try {
      receiptObj = JSON.parse(fs.readFileSync(existingReceiptPath, 'utf8'));
    } catch (err) {
      throw new Error(\`FATAL_IDEMPOTENCY_RECEIPT_CORRUPTED: Unable to parse receipt at '\${existingReceiptPath}': \${err.message}\`);
    }

    if (receiptObj.work_order !== workOrder) {
      throw new Error(\`FATAL_IDEMPOTENCY_RECEIPT_MISMATCH: Receipt work_order '\${receiptObj.work_order}' does not match requested '\${workOrder}'.\`);
    }

    if (receiptObj.final_hash !== preHash) {
      throw new Error(\`FATAL_IDEMPOTENCY_HASH_MISMATCH: Memory current hash '\${preHash}' does not match receipt final_hash '\${receiptObj.final_hash}'. State corrupted.\`);
    }

    console.log(\`✅ [IDEMPOTENCY-HARDENED] Verified receipt lineage for '\${workOrder}'. Byte-for-byte state preserved.\`);

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
  }`;

if (code.includes(targetOld)) {
  code = code.replace(targetOld, targetNew);
  fs.writeFileSync(managerPath, code, 'utf8');
  console.log('✅ Successfully upgraded Idempotency Guard to Governance P1 in memory_transaction_manager_057.js');
} else {
  console.error('❌ Could not find targetOld in memory_transaction_manager_057.js');
  process.exit(1);
}
