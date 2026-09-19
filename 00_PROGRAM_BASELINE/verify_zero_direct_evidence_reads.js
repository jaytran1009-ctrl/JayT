/**
 * JAYT DIRECT EVIDENCE READ AUDIT & FAIL-CLOSED VERIFIER
 * Governing Directive: JAYT-245 Section JAYT-260-CORRECTION-5 (Lines 5504-5517)
 *
 * Scans all runtime codebase files to ensure ZERO direct reads of evidence/vault/ledger artifacts
 * exist outside the Canonical Admission Gateway.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const REPORT_PATH = path.join(ROOT, '00_PROGRAM_BASELINE/DIRECT_EVIDENCE_READ_AUDIT_REPORT.json');

const RUNTIME_DIRS = [
  '00_PROGRAM_BASELINE',
  '03_SOURCE_OF_TRUTH',
  '06_TRUST_AND_EVIDENCE',
  '07_QUALITY_ASSURANCE'
];

const ALLOWED_GATEWAY_MODULES = [
  '00_PROGRAM_BASELINE/jayt_canonical_admission_gateway.js',
  '00_PROGRAM_BASELINE/jayt_artifact_loader_guard.js'
];

const EVIDENCE_PATTERNS = [
  /06_TRUST_AND_EVIDENCE/i,
  /evidence_vault/i,
  /COHORT_CINEMA_TRANSIT/i,
  /JAYT_COHORT_15/i,
  /QUARANTINED_EVIDENCE/i,
  /MICRO_BATCH_01_INTAKE/i
];

function getAllJsFiles(dirPath, fileList = []) {
  const resolved = path.join(ROOT, dirPath);
  if (!fs.existsSync(resolved)) return fileList;

  const entries = fs.readdirSync(resolved, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(resolved, entry.name);
    const relPath = path.relative(ROOT, fullPath).replace(/\\/g, '/');

    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        getAllJsFiles(relPath, fileList);
      }
    } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.cjs'))) {
      fileList.push(relPath);
    }
  }
  return fileList;
}

function verifyZeroDirectEvidenceReads() {
  const allFiles = [];
  for (const d of RUNTIME_DIRS) {
    getAllJsFiles(d, allFiles);
  }

  const runtimeFiles = allFiles.filter(f => !f.includes('test_') && !f.includes('/test') && !f.includes('verify_zero_direct_evidence_reads.js') && !f.includes('generate_caller_import_graph.js'));
  const violations = [];
  const compliantRuntimeModules = [];

  for (const relPath of runtimeFiles) {
    if (ALLOWED_GATEWAY_MODULES.includes(relPath)) {
      continue;
    }

    const content = fs.readFileSync(path.join(ROOT, relPath), 'utf8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check if line performs fs read
      if (line.includes('fs.readFileSync') || line.includes('fs.readFile') || line.includes('fs.createReadStream')) {
        // Check if argument targets evidence
        for (const pattern of EVIDENCE_PATTERNS) {
          if (pattern.test(line)) {
            violations.push({
              file: relPath,
              line_number: i + 1,
              line_content: line.trim(),
              pattern_matched: pattern.toString(),
              reason: "DIRECT_EVIDENCE_READ_FORBIDDEN: Must use jayt_canonical_admission_gateway.js"
            });
          }
        }
      }
    }

    if (content.includes('jayt_canonical_admission_gateway.js')) {
      compliantRuntimeModules.push(relPath);
    }
  }

  const auditReport = {
    report_id: "DIRECT_EVIDENCE_READ_AUDIT_REPORT",
    governing_directive: "JAYT-245 Section JAYT-260-CORRECTION-5 (Lines 5504-5517)",
    generated_at_utc: new Date().toISOString(),
    total_runtime_files_scanned: runtimeFiles.length,
    compliant_gateway_integrations: compliantRuntimeModules,
    violations_count: violations.length,
    violations: violations,
    verdict: violations.length === 0 ? "PASS_ZERO_DIRECT_EVIDENCE_READS" : "FAIL_DIRECT_EVIDENCE_READS_DETECTED"
  };

  fs.writeFileSync(REPORT_PATH, JSON.stringify(auditReport, null, 2), 'utf8');
  console.log('✅ Generated 00_PROGRAM_BASELINE/DIRECT_EVIDENCE_READ_AUDIT_REPORT.json');

  if (violations.length > 0) {
    console.error('❌ DIRECT EVIDENCE READ VIOLATIONS DETECTED:', violations);
    throw new Error('FAIL_DIRECT_EVIDENCE_READS_DETECTED: Found ' + violations.length + ' unauthorized direct read(s).');
  }

  console.log('🎉 AUDIT SUCCESS: Zero unauthorized direct evidence reads detected across ' + runtimeFiles.length + ' runtime files.');
  return auditReport;
}

if (require.main === module) {
  verifyZeroDirectEvidenceReads();
}

module.exports = { verifyZeroDirectEvidenceReads };
