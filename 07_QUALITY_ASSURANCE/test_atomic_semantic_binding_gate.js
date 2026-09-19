const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PROJECT_ROOT = 'd:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';

console.log('========================================================================');
console.log('🛡️ JAYT-245 QA GATE: ATOMIC FIELD-LEVEL SEMANTIC BINDING VALIDATOR');
console.log('========================================================================\n');

/**
 * Validates an atomic claim against its raw payload.
 * Every single field (title, brand, condition, scope, etc.) must be an atomic claim.
 */
function validateAtomicClaim(claim, rawText, expectedSha256) {
  const errors = [];

  if (!claim.claim_type) errors.push('Missing claim_type');
  if (!claim.verbatim_quote || typeof claim.verbatim_quote !== 'string' || claim.verbatim_quote.length === 0) {
    errors.push('Missing or invalid verbatim_quote');
  }
  if (typeof claim.start_offset !== 'number' || typeof claim.end_offset !== 'number' || claim.start_offset < 0 || claim.end_offset <= claim.start_offset) {
    errors.push(`Invalid character offsets [${claim.start_offset}, ${claim.end_offset}]`);
  }
  if (claim.raw_payload_sha256 !== expectedSha256) {
    errors.push(`Payload SHA-256 mismatch in claim: expected ${expectedSha256}, got ${claim.raw_payload_sha256}`);
  }

  // Exact character slice invariant
  const extractedSlice = rawText.slice(claim.start_offset, claim.end_offset);
  if (extractedSlice !== claim.verbatim_quote) {
    errors.push(`Character slice mismatch at [${claim.start_offset}, ${claim.end_offset}]: expected "${claim.verbatim_quote}", found "${extractedSlice}"`);
  }

  return {
    pass: errors.length === 0,
    errors: errors
  };
}

/**
 * Validates a complete atomic semantic binding record.
 */
function validateAtomicSemanticRecord(record, rootDir) {
  const issues = [];
  const payloadPath = path.join(rootDir, record.final_raw_payload_file);

  if (!fs.existsSync(payloadPath)) {
    return { pass: false, issues: [`Raw payload file not found: ${record.final_raw_payload_file}`] };
  }

  const rawBytes = fs.readFileSync(payloadPath);
  const computedHash = crypto.createHash('sha256').update(rawBytes).digest('hex');
  if (computedHash !== record.pre_normalization_sha256) {
    issues.push(`Raw payload hash mismatch: recorded ${record.pre_normalization_sha256}, computed ${computedHash}`);
  }

  const rawText = rawBytes.toString('utf8');

  if (!Array.isArray(record.atomic_claims) || record.atomic_claims.length === 0) {
    issues.push('Record has no atomic_claims array');
  } else {
    record.atomic_claims.forEach((c, idx) => {
      const claimRes = validateAtomicClaim(c, rawText, record.pre_normalization_sha256);
      if (!claimRes.pass) {
        issues.push(`Claim #${idx + 1} (${c.claim_type}) failed: ${claimRes.errors.join('; ')}`);
      }
    });
  }

  return {
    pass: issues.length === 0,
    issues: issues
  };
}

// ----------------------------------------------------------------------
// PART A: SELF-TESTING FIXTURES
// ----------------------------------------------------------------------
console.log('🧪 Part A: Running Atomic Semantic Gate Fixtures...');

const mockText = '<html><head><title>Metiz Cinema Da Nang</title></head><body>Welcome to Metiz</body></html>';
const mockHash = crypto.createHash('sha256').update(mockText).digest('hex');
const mockTmpDir = path.join(PROJECT_ROOT, '07_QUALITY_ASSURANCE', '.tmp_semantic_fixtures');
if (!fs.existsSync(mockTmpDir)) fs.mkdirSync(mockTmpDir, { recursive: true });
const mockFile = path.join(mockTmpDir, 'mock_semantic.txt');
fs.writeFileSync(mockFile, mockText, 'utf8');

const titleQuote = 'Metiz Cinema Da Nang';
const titleStart = mockText.indexOf(titleQuote);
const titleEnd = titleStart + titleQuote.length;

const benefitQuote = 'Welcome to Metiz';
const benefitStart = mockText.indexOf(benefitQuote);
const benefitEnd = benefitStart + benefitQuote.length;

// Valid Record Fixture
const validRecord = {
  final_raw_payload_file: path.relative(PROJECT_ROOT, mockFile),
  pre_normalization_sha256: mockHash,
  atomic_claims: [
    {
      claim_type: 'PAGE_TITLE',
      verbatim_quote: titleQuote,
      start_offset: titleStart,
      end_offset: titleEnd,
      raw_payload_sha256: mockHash
    },
    {
      claim_type: 'SERVICE_BENEFIT',
      verbatim_quote: benefitQuote,
      start_offset: benefitStart,
      end_offset: benefitEnd,
      raw_payload_sha256: mockHash
    }
  ]
};
const resValid = validateAtomicSemanticRecord(validRecord, PROJECT_ROOT);
if (!resValid.pass) {
  console.error('❌ FIXTURE FAILED: Valid atomic record failed!', resValid);
  process.exit(1);
}
console.log('   ✅ Fixture 1 (Valid Atomic Claims): PASS');

// Invalid Record Fixture (Unbound synthetic claim with bad offset)
const invalidRecord = {
  final_raw_payload_file: path.relative(PROJECT_ROOT, mockFile),
  pre_normalization_sha256: mockHash,
  atomic_claims: [
    {
      claim_type: 'UNBOUND_SYNTHETIC_CONDITION',
      verbatim_quote: 'Giam 50% cho sinh vien', // DOES NOT EXIST IN RAW TEXT
      start_offset: 0,
      end_offset: 22,
      raw_payload_sha256: mockHash
    }
  ]
};
const resInvalid = validateAtomicSemanticRecord(invalidRecord, PROJECT_ROOT);
if (resInvalid.pass) {
  console.error('❌ FIXTURE FAILED: Unbound synthetic claim was NOT caught by gate!');
  process.exit(1);
}
console.log('   ✅ Fixture 2 (Unbound Synthetic Claim): FAIL-CLOSED (Caught mismatch)');

// Cleanup tmp
fs.rmSync(mockTmpDir, { recursive: true, force: true });
console.log('   🟢 Part A Unit Fixtures: 100% PASS.\n');

// ----------------------------------------------------------------------
// PART B: VALIDATING ACTIVE ATOMIC STAGING RECORDS
// ----------------------------------------------------------------------
console.log('🔍 Part B: Auditing Staging Atomic Records...');

const stagingDir = path.join(PROJECT_ROOT, 'content_pipeline', 'staging_candidates', 'atomic_semantic_binding_records');
if (fs.existsSync(stagingDir)) {
  const records = fs.readdirSync(stagingDir).filter(f => f.endsWith('.json'));
  records.forEach(rf => {
    const rPath = path.join(stagingDir, rf);
    const recData = JSON.parse(fs.readFileSync(rPath, 'utf8'));
    const auditRes = validateAtomicSemanticRecord(recData, PROJECT_ROOT);
    if (!auditRes.pass) {
      console.error(`❌ Record ${rf} FAILED:`, auditRes.issues);
      process.exit(1);
    }
    console.log(`   ✅ Staging Record ${rf} (${recData.target_id}): PASS (${recData.atomic_claims.length} claims verified)`);
  });
}

console.log('\n🟢 [ATOMIC-SEMANTIC-GATE-PASS] 100% Atomic Field Claims Verified Against Raw Payloads!');
