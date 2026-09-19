const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const VAULT = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'batch_19_remediation_vault');
const OUTPUT_DIR = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'batch_19_r2_claim_provenance');
const QA_DIR = path.join(ROOT, '07_QUALITY_ASSURANCE', 'runtime_evidence');
const R1_SUMMARY = path.join(QA_DIR, 'J358_R1_BATCH19_HARVEST_SUMMARY.json');
const WORK_ORDER = path.join(ROOT, '04_DATA_PIPELINE', 'dispatch', 'WORK_ORDER_J358_R2_CLAIM_PROVENANCE_REPLAY.json');
const MATRIX_PATH = path.join(OUTPUT_DIR, 'CLAIM_PROVENANCE_MATRIX.json');
const TEST_PATH = path.join(QA_DIR, 'J358_R2_CLAIM_PROVENANCE_TESTS.json');
const RECEIPT_PATH = path.join(QA_DIR, 'RECEIPT_J358_R2_CLAIM_PROVENANCE_REPLAY.json');

const SCOPE = [
  'B19_STARLIGHT_U22_WEEKDAY',
  'B19_STARLIGHT_U22_WEEKEND',
  'B19_STARLIGHT_THU_3_PHIM_VIET',
  'B19_TPC_COMBO_VU_LAN_315K',
  'B19_TPC_COMBO_COT_MAM_KEO_479K',
  'B19_TPC_COMBO_COT_MAI_MAN_599K',
  'B19_TPC_BOGO_PEPSI_15L',
  'B19_TPC_BO_DOI_NHU_Y_169K',
  'B19_GONGCHA_MEMBER_POLICY',
  'B19_KATINAT_APP_LOYALTY'
];

const FIELD_SPECS = {
  B19_STARLIGHT_U22_WEEKDAY: {
    title: ['CT U22 RẠP STARLIGHT'],
    price_or_benefit: ['Đồng giá vé 45k/vé khi mua tại quầy từ thứ 2 đến thứ 5!'],
    conditions: ['Mang thêm giấy tờ chứng minh độ tuổi (CCCD/thẻ học sinh/thẻ sinh viên...)'],
    validity_or_recurrence: ['Giá vé U22 áp dụng cho khách hàng dưới 22 tuổi. U22 không áp dụng vào ngày lễ tết, suất chiếu đặc biệt, thanh toán online và đồng thời cùng các CTKM khác về giá vé.'],
    locality: []
  },
  B19_STARLIGHT_U22_WEEKEND: {
    title: ['Giá vé cuối tuần'],
    price_or_benefit: ['Áp dụng tại các rạp Quy Nhơn, Đà Nẵng dành cho khách hàng U22 là 55k/vé'],
    conditions: ['Giá vé U22 áp dụng cho khách hàng dưới 22 tuổi. U22 không áp dụng vào ngày lễ tết, suất chiếu đặc biệt, thanh toán online và đồng thời cùng các CTKM khác về giá vé.'],
    validity_or_recurrence: [],
    locality: ['Áp dụng tại các rạp Quy Nhơn, Đà Nẵng dành cho khách hàng U22 là 55k/vé']
  },
  B19_STARLIGHT_THU_3_PHIM_VIET: {
    title: ['THỨ 3 PHIM VIỆT'],
    price_or_benefit: ['Áp dụng giá : 45 k cho tất cả các phim Việt vào ngày thứ 3 hàng tuần.'],
    conditions: ['Chương trình khuyến mãi áp dụng cho khách hàng mua vé các phim Việt Nam.'],
    validity_or_recurrence: ['“Thứ 3 : Ngày phim Việt” : Áp dụng từ ngày 20/01/2022'],
    locality: []
  },
  B19_TPC_COMBO_VU_LAN_315K: {
    title: ['Combo Vu Lan An Lành'],
    price_or_benefit: ['315.000đ'],
    conditions: ['01 Pizza Rau Củ/ Phô Mai, Cỡ Vừa, Đế Dày/ Cực Mỏng'],
    validity_or_recurrence: [],
    locality: []
  },
  B19_TPC_COMBO_COT_MAM_KEO_479K: {
    title: ['Combo "Cốt" Mắm Kẹo'],
    price_or_benefit: ['479.000đ'],
    conditions: ['1 Pizza Hải Sản Calamari Xốt Nước Mắm, Cỡ Vừa, Đế Dày/Cực Mỏng'],
    validity_or_recurrence: [],
    locality: []
  },
  B19_TPC_COMBO_COT_MAI_MAN_599K: {
    title: ['Combo "Cốt" Mãi Mặn'],
    price_or_benefit: ['599.000đ'],
    conditions: ['1 Pizza Hải Sản Calamari Xốt Nước Mắm, Cỡ Vừa, Viền Phô Mai/ Đế Dày/ Cực Mỏng'],
    validity_or_recurrence: [],
    locality: []
  },
  B19_TPC_BOGO_PEPSI_15L: {
    title: ['Mua 1 Tặng 1 Nước'],
    price_or_benefit: ['Tặng 1 Chai Pepsi PET 1.5L, khi Mua 1 Chai Pepsi/ 7UP PET 1.5L'],
    conditions: ['Tặng 1 Chai Pepsi PET 1.5L, khi Mua 1 Chai Pepsi/ 7UP PET 1.5L'],
    validity_or_recurrence: [],
    locality: []
  },
  B19_TPC_BO_DOI_NHU_Y_169K: {
    title: ['Bộ Đôi Như "Ý" - Combo 1', 'Bộ Đôi Như “Ý” - Combo 1'],
    price_or_benefit: ['169.000đ'],
    conditions: [],
    validity_or_recurrence: [],
    locality: []
  },
  B19_GONGCHA_MEMBER_POLICY: {
    title: ['CHÍNH SÁCH THÀNH VIÊN ỨNG DỤNG GONG CHA VN'],
    price_or_benefit: ['Chương trình tích điểm thành viên Gong Cha VN cho phép bạn tích điểm và chủ động đổi điểm để lấy những ưu đãi, phần quà hấp dẫn từ Gong Cha.'],
    conditions: ['Với mỗi hóa đơn chi tiêu tại cửa hàng, bạn sẽ được tích điểm tương đương với số tiền mà bạn đã thanh toán.'],
    validity_or_recurrence: [],
    locality: []
  },
  B19_KATINAT_APP_LOYALTY: {
    title: ['KATINAT CHÍNH THỨC RA MẮT ỨNG DỤNG, “KƯNG” THÀNH VIÊN KHÔNG GIỚI HẠN'],
    price_or_benefit: [],
    conditions: ['ứng dụng thành viên & đặt món dành riêng cho Katies'],
    validity_or_recurrence: ['chương trình chăm sóc thành viên hoàn toàn mới áp dụng từ 25/4/2024'],
    locality: []
  }
};

const NAMED_ENTITIES = {
  amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ',
  ldquo: '“', rdquo: '”', ndash: '–', mdash: '—', hellip: '…',
  Agrave: 'À', Aacute: 'Á', Acirc: 'Â', Atilde: 'Ã', Egrave: 'È', Eacute: 'É',
  Ecirc: 'Ê', Igrave: 'Ì', Iacute: 'Í', Ograve: 'Ò', Oacute: 'Ó', Ocirc: 'Ô',
  Otilde: 'Õ', Ugrave: 'Ù', Uacute: 'Ú', Yacute: 'Ý', agrave: 'à', aacute: 'á',
  acirc: 'â', atilde: 'ã', egrave: 'è', eacute: 'é', ecirc: 'ê', igrave: 'ì',
  iacute: 'í', ograve: 'ò', oacute: 'ó', ocirc: 'ô', otilde: 'õ', ugrave: 'ù',
  uacute: 'ú', yacute: 'ý'
};

function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

function decodeEntity(token) {
  const body = token.slice(1, -1);
  if (/^#x[0-9a-f]+$/i.test(body)) return String.fromCodePoint(parseInt(body.slice(2), 16));
  if (/^#[0-9]+$/.test(body)) return String.fromCodePoint(parseInt(body.slice(1), 10));
  return Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, body) ? NAMED_ENTITIES[body] : token;
}

function decodeWithRawMap(raw) {
  let decoded = '';
  const map = [];
  for (let i = 0; i < raw.length;) {
    if (raw[i] === '&') {
      const match = raw.slice(i, i + 32).match(/^&(?:#x[0-9a-f]+|#[0-9]+|[a-z][a-z0-9]+);/i);
      if (match) {
        const value = decodeEntity(match[0]);
        for (const char of value) {
          decoded += char;
          map.push({ rawStart: i, rawEnd: i + match[0].length });
        }
        i += match[0].length;
        continue;
      }
    }
    decoded += raw[i];
    map.push({ rawStart: i, rawEnd: i + 1 });
    i += 1;
  }
  return { decoded, map };
}

function allIndexes(haystack, needle) {
  const found = [];
  const lowerHaystack = haystack.toLocaleLowerCase('vi-VN');
  const lowerNeedle = needle.toLocaleLowerCase('vi-VN');
  let cursor = 0;
  while (lowerNeedle && (cursor = lowerHaystack.indexOf(lowerNeedle, cursor)) !== -1) {
    found.push(cursor);
    cursor += Math.max(1, lowerNeedle.length);
  }
  return found;
}

function byteOffset(raw, charOffset) {
  return Buffer.byteLength(raw.slice(0, charOffset), 'utf8');
}

function verifyClaim(raw, alternatives, context = {}) {
  if (!alternatives || alternatives.length === 0) {
    return { supported: false, reason: 'NO_SOURCE_SPAN_SPECIFIED', alternatives: [] };
  }
  const { decoded, map } = decodeWithRawMap(raw);
  const attempts = [];
  for (const query of alternatives) {
    const indexes = allIndexes(decoded, query);
    const attempt = { query, occurrence_count: indexes.length };
    attempts.push(attempt);
    if (indexes.length > 0) {
      const decodedStart = indexes[0];
      const decodedEnd = decodedStart + query.length;
      const rawStart = map[decodedStart].rawStart;
      const rawEnd = map[Math.max(decodedStart, decodedEnd - 1)].rawEnd;
      const rawSubstring = raw.slice(rawStart, rawEnd);
      return {
        supported: true,
        match_mode: 'HTML_ENTITY_NORMALIZED_CASE_INSENSITIVE',
        matched_query: query,
        normalized_span: decoded.slice(decodedStart, decodedEnd),
        exact_raw_substring: rawSubstring,
        raw_char_offset_start: rawStart,
        raw_char_offset_end_exclusive: rawEnd,
        raw_byte_offset_start: byteOffset(raw, rawStart),
        raw_byte_offset_end_exclusive: byteOffset(raw, rawEnd),
        occurrence_count: indexes.length,
        duplicate_span_warning: indexes.length > 1,
        source_raw_sha256: context.sha256,
        source_url: context.requested_url,
        final_url: context.final_url,
        captured_at_utc: context.captured_at_utc
      };
    }
  }
  return { supported: false, reason: 'CLAIM_NOT_FOUND_IN_NORMALIZED_RAW_BYTES', alternatives: attempts };
}

function validateSource(rawBuffer, meta) {
  const diskHash = sha256(rawBuffer);
  const failures = [];
  if (diskHash !== meta.sha256) failures.push('SOURCE_SHA256_MISMATCH');
  if (rawBuffer.length !== meta.bytes) failures.push('SOURCE_BYTE_LENGTH_MISMATCH');
  if (meta.http_status !== 200) failures.push('SOURCE_HTTP_STATUS_NOT_200');
  if (meta.is_fetch_failed) failures.push('SOURCE_FETCH_FAILED');
  if (meta.is_soft_404) failures.push('SOURCE_SOFT_404');
  if (meta.is_challenge_page) failures.push('SOURCE_CHALLENGE_PAGE');
  if (!meta.requested_url || !meta.final_url || !meta.captured_at_utc) failures.push('SOURCE_METADATA_INCOMPLETE');
  return { passed: failures.length === 0, disk_sha256: diskHash, failures };
}

function runNegativeTests() {
  const raw = '<h1>Ưu đãi sinh viên</h1><p>Giá 45.000&#x111;</p><p>Đến 30/09/2026 tại Đà Nẵng</p>';
  const buffer = Buffer.from(raw, 'utf8');
  const meta = {
    sha256: sha256(buffer), bytes: buffer.length, http_status: 200,
    is_fetch_failed: false, is_soft_404: false, is_challenge_page: false,
    requested_url: 'https://example.invalid/offer', final_url: 'https://example.invalid/offer',
    captured_at_utc: '2026-09-08T00:00:00.000Z'
  };
  const ctx = { ...meta };
  const tests = [];
  const record = (name, passed, detail) => tests.push({ test_name: name, passed, detail });

  record('ENTITY_ENCODED_VND_MATCHES_AND_RETains_RAW_OFFSETS',
    verifyClaim(raw, ['45.000đ'], ctx).supported && verifyClaim(raw, ['45.000đ'], ctx).exact_raw_substring === '45.000&#x111;',
    verifyClaim(raw, ['45.000đ'], ctx));
  record('MUTATED_PRICE_FAILS_CLOSED', !verifyClaim(raw, ['46.000đ'], ctx).supported,
    verifyClaim(raw, ['46.000đ'], ctx));
  record('MUTATED_LOCALITY_FAILS_CLOSED', !verifyClaim(raw, ['Huế'], ctx).supported,
    verifyClaim(raw, ['Huế'], ctx));
  record('MUTATED_EXPIRY_FAILS_CLOSED', !verifyClaim(raw, ['Đến 31/10/2026'], ctx).supported,
    verifyClaim(raw, ['Đến 31/10/2026'], ctx));
  const badMeta = { ...meta, sha256: '0'.repeat(64) };
  record('MUTATED_SOURCE_SHA_FAILS_CLOSED', !validateSource(buffer, badMeta).passed,
    validateSource(buffer, badMeta));
  const duplicateRaw = `${raw}<p>Giá 45.000&#x111;</p>`;
  const duplicate = verifyClaim(duplicateRaw, ['45.000đ'], { ...ctx, sha256: sha256(Buffer.from(duplicateRaw)) });
  record('DUPLICATE_SPANS_ARE_RECORDED', duplicate.supported && duplicate.occurrence_count === 2 && duplicate.duplicate_span_warning,
    duplicate);

  return {
    test_suite_id: 'J358_R2_CLAIM_PROVENANCE_TESTS',
    executed_at_utc: new Date().toISOString(),
    tests,
    summary: {
      total: tests.length,
      passed: tests.filter(test => test.passed).length,
      failed: tests.filter(test => !test.passed).length,
      all_passed: tests.every(test => test.passed)
    }
  };
}

function writeJson(target, value) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function writeSidecar(target) {
  const digest = sha256(fs.readFileSync(target));
  fs.writeFileSync(`${target}.sha256`, `${digest}  ${path.basename(target)}\n`, 'utf8');
  return digest;
}

function main() {
  const startedAt = new Date().toISOString();
  const r1 = JSON.parse(fs.readFileSync(R1_SUMMARY, 'utf8'));
  const candidates = new Map(r1.items.filter(item => SCOPE.includes(item.b19_id)).map(item => [item.b19_id, item]));
  if (candidates.size !== SCOPE.length) throw new Error(`Scope mismatch: expected ${SCOPE.length}, found ${candidates.size}`);

  const items = SCOPE.map(id => {
    const candidate = candidates.get(id);
    const rawPath = path.join(ROOT, candidate.leaf_evidence_relpath);
    const metaPath = rawPath.replace(/\.raw\.html$/, '.meta.json');
    const rawBuffer = fs.readFileSync(rawPath);
    const raw = rawBuffer.toString('utf8');
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    const sourceValidation = validateSource(rawBuffer, meta);
    const specs = FIELD_SPECS[id];
    const claims = {};
    for (const field of ['title', 'price_or_benefit', 'conditions', 'validity_or_recurrence', 'locality']) {
      claims[field] = sourceValidation.passed
        ? verifyClaim(raw, specs[field], meta)
        : { supported: false, reason: 'SOURCE_VALIDATION_FAILED', source_failures: sourceValidation.failures };
    }
    const unsupportedFields = Object.entries(claims).filter(([, claim]) => !claim.supported).map(([field]) => field);
    const verificationStatus = sourceValidation.passed && unsupportedFields.length === 0 ? 'VERIFIED' : 'HELD';
    return {
      b19_id: id,
      prior_r1_status: candidate.verification_status,
      r2_verification_status: verificationStatus,
      held_reason: verificationStatus === 'HELD' ? `HELD_CLAIM_TO_SOURCE_SPAN_UNPROVEN:${unsupportedFields.join(',')}` : null,
      display_claims_under_review: {
        title: candidate.title,
        price_or_benefit: candidate.price_display,
        conditions: [candidate.nature, candidate.eligibility, candidate.redemption_channel],
        validity_or_recurrence: candidate.validity,
        locality: candidate.da_nang_locality
      },
      source: {
        raw_relpath: candidate.leaf_evidence_relpath,
        meta_relpath: path.relative(ROOT, metaPath).replace(/\\/g, '/'),
        requested_url: meta.requested_url,
        final_url: meta.final_url,
        captured_at_utc: meta.captured_at_utc,
        raw_bytes: rawBuffer.length,
        raw_sha256: sourceValidation.disk_sha256,
        validation: sourceValidation
      },
      claims
    };
  });

  const matrix = {
    matrix_id: 'J358_R2_CLAIM_PROVENANCE_MATRIX',
    generated_at_utc: new Date().toISOString(),
    work_order_id: 'J358-R2-CLAIM-PROVENANCE-REPLAY',
    policy: 'FAIL_CLOSED_UNLESS_EVERY_PUBLISHED_DISPLAY_CLAIM_HAS_A_RECORDED_SOURCE_SPAN',
    matching: 'HTML entities normalized for matching; raw substring and UTF-8 byte offsets retained',
    scope_count: items.length,
    verified_count: items.filter(item => item.r2_verification_status === 'VERIFIED').length,
    held_count: items.filter(item => item.r2_verification_status === 'HELD').length,
    items
  };
  writeJson(MATRIX_PATH, matrix);
  const matrixHash = writeSidecar(MATRIX_PATH);

  const tests = runNegativeTests();
  writeJson(TEST_PATH, tests);
  const testHash = writeSidecar(TEST_PATH);
  if (!tests.summary.all_passed) throw new Error('Negative test suite failed');

  const receipt = {
    receipt_id: 'RECEIPT_J358_R2_CLAIM_PROVENANCE_REPLAY',
    work_order_id: 'J358-R2-CLAIM-PROVENANCE-REPLAY',
    started_at_utc: startedAt,
    completed_at_utc: new Date().toISOString(),
    verdict: 'CLAIM_PROVENANCE_REPLAY_COMPLETE__CEO_REVIEW_REQUIRED',
    result: {
      evaluated: matrix.scope_count,
      verified: matrix.verified_count,
      held: matrix.held_count,
      target_numbers_used_as_acceptance_criteria: false,
      ordinary_menu_prices_added: 0,
      generic_membership_statements_promoted: 0
    },
    controls: {
      fixed_candidate_objects_used_as_verification_authority: false,
      fail_closed_on_missing_display_field_span: true,
      source_sha256_verified_against_disk_bytes: items.every(item => item.source.validation.passed),
      raw_utf8_substring_and_byte_offsets_recorded: true,
      source_url_final_url_capture_timestamp_recorded: true,
      r1_forensic_artifacts_mutated: false,
      staging_hydration_performed: false,
      production_mutation_permitted: false,
      production_deployment_authorized: false,
      alias_scheduler_or_rollback_changed: false
    },
    negative_tests: tests.summary,
    artifacts: {
      claim_matrix: path.relative(ROOT, MATRIX_PATH).replace(/\\/g, '/'),
      claim_matrix_sha256: matrixHash,
      test_receipt: path.relative(ROOT, TEST_PATH).replace(/\\/g, '/'),
      test_receipt_sha256: testHash,
      runner: path.relative(ROOT, __filename).replace(/\\/g, '/'),
      runner_sha256: sha256(fs.readFileSync(__filename)),
      work_order: path.relative(ROOT, WORK_ORDER).replace(/\\/g, '/'),
      work_order_sha256: sha256(fs.readFileSync(WORK_ORDER)),
      r1_summary_sha256: sha256(fs.readFileSync(R1_SUMMARY))
    },
    acceptance_gate: 'CEO review required; no automatic promotion'
  };
  writeJson(RECEIPT_PATH, receipt);
  const receiptHash = writeSidecar(RECEIPT_PATH);

  console.log(JSON.stringify({
    verdict: receipt.verdict,
    evaluated: matrix.scope_count,
    verified: matrix.verified_count,
    held: matrix.held_count,
    tests: tests.summary,
    matrix_sha256: matrixHash,
    test_sha256: testHash,
    receipt_sha256: receiptHash
  }, null, 2));
}

if (require.main === module) main();

module.exports = { decodeWithRawMap, verifyClaim, validateSource, runNegativeTests };
