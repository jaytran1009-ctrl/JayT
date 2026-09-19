/**
 * JAYT HEURISTIC REGEX EVIDENCE READ SCANNER
 * Governing Directive: JAYT-245 Section JAYT-260-CORRECTION-7 (Lines 5538-5553)
 *
 * NOTE: This is a static heuristic regex scanner checking line patterns and variable tokens.
 * It is NOT an AST or dynamic data-flow analysis tool.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const REPORT_PATH = path.join(ROOT, '00_PROGRAM_BASELINE/HEURISTIC_EVIDENCE_READ_SCAN_REPORT.json');

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
    const relPath = path.relative(ROOT, fullPath).replace(/\\\\/g, '/');

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

function runHeuristicEvidenceReadScan() {
  const allFiles = [];
  for (const d of SCAN_DIRS) {
    getAllJsFiles(d, allFiles);
  }

  const allowlistPaths = EXPLICIT_EXCLUSIONS_ALLOWLIST.map(e => e.module_path);
  const runtimeFiles = allFiles.filter(f => !f.includes('test_') && !f.includes('/test') && !f.includes('verify_heuristic_direct_evidence_reads.js') && !f.includes('verify_ast_direct_evidence_reads.js') && !f.includes('verify_zero_direct_evidence_reads.js') && !f.includes('generate_caller_import_graph.js'));

  const detectedPotentialReads = [];

  for (const relPath of runtimeFiles) {
    const isAllowlisted = allowlistPaths.includes(relPath);
    const fullPath = path.join(ROOT, relPath);
    const code = fs.readFileSync(fullPath, 'utf8');
    const lines = code.split('\\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const isFsRead = (
        line.includes('fs.readFileSync') ||
        line.includes('fs.readFile') ||
        line.includes('fs.promises.readFile') ||
        line.includes('fs.createReadStream')
      );

      if (isFsRead) {
        for (const kw of EVIDENCE_TARGET_KEYWORDS) {
          if (line.includes(kw)) {
            if (!isAllowlisted) {
              detectedPotentialReads.push({
                file: relPath,
                line_number: i + 1,
                line_content: line,
                matched_keyword: kw
              });
            }
            break;
          }
        }
      }
    }
  }

  const scanReport = {
    report_id: "HEURISTIC_EVIDENCE_READ_SCAN_REPORT",
    governing_directive: "JAYT-245 Section JAYT-260-CORRECTION-7 (Lines 5538-5553)",
    scanner_type: "HEURISTIC_REGEX_PATTERN_MATCH",
    generated_at_utc: new Date().toISOString(),
    total_runtime_modules_scanned: runtimeFiles.length,
    explicit_allowlist_exclusions: EXPLICIT_EXCLUSIONS_ALLOWLIST,
    unallowlisted_potential_reads_detected: detectedPotentialReads.length,
    details: detectedPotentialReads
  };

  fs.writeFileSync(REPORT_PATH, JSON.stringify(scanReport, null, 2), 'utf8');
  console.log('✅ Generated 00_PROGRAM_BASELINE/HEURISTIC_EVIDENCE_READ_SCAN_REPORT.json (Unallowlisted matches: ' + detectedPotentialReads.length + ')');
  return scanReport;
}

if (require.main === module) {
  runHeuristicEvidenceReadScan();
}

module.exports = { runHeuristicEvidenceReadScan };
