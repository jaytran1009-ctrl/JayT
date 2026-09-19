'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const resultsDirectory = path.join(__dirname, 'results');
const registerPath = path.join(resultsDirectory, 'W4_ROUND1_FIELD_TEST_REGISTER.json');
const receiptPath = path.join(ROOT, '07_QUALITY_ASSURANCE', 'runtime_evidence', 'W4_FIELD_ROUND1_INGEST_VALIDATION_RECEIPT.json');
const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
const allowedResultKeys = new Set(['session_code', 'segment', 'consent', 'lunch_calculator', 'ktx_stack', 'spotify_danabus', 'privacy_issue', 'optional_anonymized_feedback']);
const piiPatterns = [/\b\d{9,11}\b/u, /[\w.+-]+@[\w.-]+\.[a-z]{2,}/iu, /\b(?:ngân hàng|tài khoản|bank account|cccd|căn cước)\b/iu];

const register = JSON.parse(fs.readFileSync(registerPath, 'utf8'));
const allowedSessions = new Map(register.sessions.map((session) => [session.session_code, session.segment]));
const resultFiles = fs.readdirSync(resultsDirectory)
  .filter((file) => /^W4-(?:S|O)-\d{2}\.json$/u.test(file))
  .sort();
const results = [];
const failures = [];

for (const file of resultFiles) {
  const bytes = fs.readFileSync(path.join(resultsDirectory, file));
  let record;
  try { record = JSON.parse(bytes.toString('utf8')); } catch { failures.push(`${file}:INVALID_JSON`); continue; }
  if (Object.keys(record).some((key) => !allowedResultKeys.has(key))) failures.push(`${file}:UNAPPROVED_FIELD`);
  if (!allowedSessions.has(record.session_code)) failures.push(`${file}:UNKNOWN_SESSION_CODE`);
  if (allowedSessions.get(record.session_code) !== record.segment) failures.push(`${file}:SEGMENT_MISMATCH`);
  if (!['yes', 'no'].includes(record.consent)) failures.push(`${file}:INVALID_CONSENT`);
  if (record.consent !== 'yes' && ['lunch_calculator', 'ktx_stack', 'spotify_danabus'].some((key) => record[key] != null)) failures.push(`${file}:TASK_RECORDED_WITHOUT_CONSENT`);
  const feedback = record.optional_anonymized_feedback || '';
  if (piiPatterns.some((pattern) => pattern.test(feedback))) failures.push(`${file}:POSSIBLE_PII_IN_FEEDBACK`);
  results.push({ file, sha256: sha256(bytes), session_code: record.session_code, consent: record.consent });
}

const receipt = {
  receipt_id: 'W4_FIELD_ROUND1_INGEST_VALIDATION_RECEIPT',
  audited_at_utc: new Date().toISOString(),
  expected_slots: register.sessions.length,
  result_files_found: resultFiles.length,
  accepted_results: failures.length === 0 ? results.length : 0,
  result_hashes: results,
  failures,
  audit_status: failures.length ? 'FAIL__FIELD_RESULT_SCHEMA_OR_PRIVACY_VIOLATION' : (resultFiles.length ? 'PASS__CONSENTED_ANONYMOUS_RESULTS_READY_FOR_RESEARCH_SYNTHESIS' : 'READY__NO_CONSENTED_RESULTS_RECORDED'),
  production_mutation_authorized: false,
  affiliate_enabled: false
};
fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2) + '\n');
console.log(JSON.stringify(receipt, null, 2));
process.exitCode = failures.length ? 1 : 0;
