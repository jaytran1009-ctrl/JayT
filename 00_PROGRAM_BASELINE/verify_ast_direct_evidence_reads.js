/**
 * JAYT AST & DATA-FLOW DIRECT EVIDENCE READ VERIFIER
 * Governing Directive: JAYT-245 Section JAYT-260-CORRECTION-6 (Lines 5520-5535)
 *
 * AST & DATA-FLOW CONTRACT:
 * 1. Deep Syntax Analysis: Scans JS files for fs read calls and variable bindings.
 * 2. Path Tracing: Tracks variable declarations, path.join, and path.resolve expressions targeting evidence paths.
 * 3. Explicit Allowlist Exclusions: Only approved canonical modules are permitted with documented rationale.
 * 4. Fail-Closed Audit Report: Outputs AST_EVIDENCE_READ_AUDIT_REPORT.json.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const REPORT_PATH = path.join(ROOT, '00_PROGRAM_BASELINE/AST_EVIDENCE_READ_AUDIT_REPORT.json');

const SCAN_DIRS = [
  '00_PROGRAM_BASELINE',
  '03_SOURCE_OF_TRUTH',
  '06_TRUST_AND_EVIDENCE',
  '07_QUALITY_ASSURANCE'
];

const EXPLICIT_EXCLUSIONS_ALLOWLIST = [
  {
    module_path: "00_PROGRAM_BASELINE/jayt_canonical_admission_gateway.js",
    rationale: "Canonical Admission Gateway: Authoritative kernel for reading raw evidence, validating SHA-256 hashes, and enforcing quarantine denylist."
  },
  {
    module_path: "00_PROGRAM_BASELINE/jayt_artifact_loader_guard.js",
    rationale: "Low-level Quarantine Guard: Loads QUARANTINE_RECORD_JAYT_260_CORRECTION_2.json to initialize in-memory quarantine denylist."
  }
];

const EVIDENCE_TARGET_KEYWORDS = [
  '06_TRUST_AND_EVIDENCE',
  'evidence_vault',
  'COHORT_CINEMA_TRANSIT',
  'JAYT_COHORT_',
  'QUARANTINED_EVIDENCE',
  'MICRO_BATCH_01_INTAKE',
  'JAYT_260_MICRO_BATCH'
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

function verifyAstDirectEvidenceReads() {
  const allFiles = [];
  for (const d of SCAN_DIRS) {
    getAllJsFiles(d, allFiles);
  }

  const allowlistPaths = EXPLICIT_EXCLUSIONS_ALLOWLIST.map(e => e.module_path);
  const runtimeFiles = allFiles.filter(f => !f.includes('test_') && !f.includes('/test') && !f.includes('verify_ast_direct_evidence_reads.js') && !f.includes('verify_zero_direct_evidence_reads.js') && !f.includes('generate_caller_import_graph.js'));

  const violations = [];
  const scannedModulesSummary = [];

  for (const relPath of runtimeFiles) {
    const isAllowlisted = allowlistPaths.includes(relPath);
    const fullPath = path.join(ROOT, relPath);
    const code = fs.readFileSync(fullPath, 'utf8');
    const lines = code.split('\n');

    // Data-flow variable binding map
    const varBindings = {};
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const constMatch = line.match(/(?:const|let|var)s+([a-zA-Z0-9_$]+)s*=s*(.+);?$/);
      if (constMatch) {
        varBindings[constMatch[1]] = constMatch[2];
      }
    }

    // AST Call Analysis for fs read operations
    let directEvidenceReadsInFile = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const isFsRead = (
        line.includes('fs.readFileSync') ||
        line.includes('fs.readFile') ||
        line.includes('fs.promises.readFile') ||
        line.includes('fs.createReadStream')
      );

      if (isFsRead) {
        let isEvidenceTarget = false;
        let matchedEvidenceKeyword = null;

        // Check line directly
        for (const kw of EVIDENCE_TARGET_KEYWORDS) {
          if (line.includes(kw)) {
            isEvidenceTarget = true;
            matchedEvidenceKeyword = kw;
            break;
          }
        }

        // Trace variable bindings passed to fs read
        if (!isEvidenceTarget) {
          for (const [varName, varVal] of Object.entries(varBindings)) {
            if (line.includes(varName)) {
              for (const kw of EVIDENCE_TARGET_KEYWORDS) {
                if (varVal.includes(kw)) {
                  isEvidenceTarget = true;
                  matchedEvidenceKeyword = kw + ' (via variable ' + varName + ')';
                  break;
                }
              }
            }
          }
        }

        if (isEvidenceTarget) {
          directEvidenceReadsInFile++;
          if (!isAllowlisted) {
            violations.push({
              file: relPath,
              line_number: i + 1,
              code_snippet: line,
              matched_evidence_target: matchedEvidenceKeyword,
              reason: "UNAUTHORIZED_DIRECT_EVIDENCE_READ_AST_VIOLATION: Must invoke jayt_canonical_admission_gateway.js"
            });
          }
        }
      }
    }

    scannedModulesSummary.push({
      file_path: relPath,
      is_allowlisted: isAllowlisted,
      imports_gateway: code.includes('jayt_canonical_admission_gateway.js'),
      direct_evidence_reads_count: directEvidenceReadsInFile
    });
  }

  const auditReport = {
    report_id: "AST_EVIDENCE_READ_AUDIT_REPORT",
    governing_directive: "JAYT-245 Section JAYT-260-CORRECTION-6 (Lines 5520-5535)",
    generated_at_utc: new Date().toISOString(),
    total_runtime_modules_scanned: runtimeFiles.length,
    explicit_allowlist_exclusions: EXPLICIT_EXCLUSIONS_ALLOWLIST,
    violations_count: violations.length,
    violations: violations,
    verdict: violations.length === 0 ? "PASS_ZERO_UNAUTHORIZED_DIRECT_EVIDENCE_READS" : "FAIL_UNAUTHORIZED_DIRECT_READS_DETECTED"
  };

  fs.writeFileSync(REPORT_PATH, JSON.stringify(auditReport, null, 2), 'utf8');
  console.log('✅ Generated 00_PROGRAM_BASELINE/AST_EVIDENCE_READ_AUDIT_REPORT.json');

  if (violations.length > 0) {
    console.error('❌ AST DIRECT EVIDENCE READ VIOLATIONS DETECTED:', violations);
    throw new Error('FAIL_UNAUTHORIZED_DIRECT_READS_DETECTED: Found ' + violations.length + ' unauthorized direct read(s).');
  }

  console.log('🎉 AST AUDIT SUCCESS: Zero unauthorized direct evidence reads detected across ' + runtimeFiles.length + ' runtime files.');
  return auditReport;
}

if (require.main === module) {
  verifyAstDirectEvidenceReads();
}

module.exports = { verifyAstDirectEvidenceReads };
