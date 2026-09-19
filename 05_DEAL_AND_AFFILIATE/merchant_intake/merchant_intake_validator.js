/**
 * JAYT MERCHANT INTAKE VALIDATOR
 * Directive: JAYT-DUAL-TRACK-REMEDIATION-050A
 * 
 * Validates direct local merchant submissions against JayT's 4 core truth conditions:
 * 1. Explicit base & promotional price (both must be > 0).
 * 2. Transparent conditions & surcharges.
 * 3. Verified Da Nang locality (specific branch address, no [SYNTHETIC] markers).
 * 4. Verified validity period & signed proof document (non-empty-string hash).
 *
 * CRITICAL RULES (050A Remediation):
 * - Reject ANY payload containing demo_notice or SYNTHETIC_NOT_EVIDENCE or DEMO_ONLY markers.
 * - Reject empty-string SHA-256 hash (e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855).
 * - Reject [SYNTHETIC] markers anywhere in merchant_name, branch, contact, or deal_name.
 * - Missing any required field → REJECTED_INCOMPLETE, never auto-fill defaults.
 */

const EMPTY_STRING_SHA256 = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

function containsSyntheticMarker(value) {
  if (typeof value !== 'string') return false;
  const lower = value.toLowerCase();
  return lower.includes('[synthetic]') ||
         lower.includes('synthetic_not_evidence') ||
         lower.includes('test_only_not_evidence') ||
         lower.includes('test_only') ||
         lower.includes('demo_only_not_for_render') ||
         lower.includes('demo_only') ||
         lower.includes('giả định');
}

function validateMerchantIntake(intakeRecord) {
  const errors = [];

  if (!intakeRecord) {
    return { valid: false, errors: ['Bản ghi tiếp nhận rỗng.'], status: 'REJECTED_INCOMPLETE' };
  }

  // GATE 0: Reject demo/synthetic/test payloads unconditionally
  if (intakeRecord.demo_notice && containsSyntheticMarker(intakeRecord.demo_notice)) {
    errors.push('REJECTED_SYNTHETIC_OR_DEMO: Payload chứa nhãn demo_notice bị cấm — không được coi là dữ liệu merchant thật.');
  }
  if (intakeRecord.test_notice && containsSyntheticMarker(intakeRecord.test_notice)) {
    errors.push('REJECTED_SYNTHETIC_OR_DEMO: Payload chứa nhãn test_notice bị cấm — không được coi là dữ liệu merchant thật.');
  }
  if (containsSyntheticMarker(intakeRecord.merchant_name)) {
    errors.push('REJECTED_SYNTHETIC_MERCHANT: Tên đối tác chứa dấu hiệu [SYNTHETIC] hoặc giả định.');
  }
  if (containsSyntheticMarker(intakeRecord.deal_name)) {
    errors.push('REJECTED_SYNTHETIC_DEAL: Tên chương trình chứa dấu hiệu [SYNTHETIC] hoặc giả định.');
  }

  // 1. Brand & Branches in Da Nang
  if (!intakeRecord.merchant_name || !intakeRecord.brand_id) {
    errors.push('Thiếu tên thương hiệu hoặc mã định danh đối tác.');
  }
  if (!Array.isArray(intakeRecord.danang_branches) || intakeRecord.danang_branches.length === 0) {
    errors.push('Bắt buộc phải có ít nhất 1 địa chỉ chi nhánh cụ thể tại Đà Nẵng.');
  } else {
    for (const b of intakeRecord.danang_branches) {
      if (!b.street_address || !b.district) {
        errors.push(`Chi nhánh ${b.branch_name || 'chưa đặt tên'} thiếu địa chỉ hoặc quận/huyện tại Đà Nẵng.`);
      }
      if (containsSyntheticMarker(b.branch_name) || containsSyntheticMarker(b.street_address)) {
        errors.push(`REJECTED_SYNTHETIC_BRANCH: Chi nhánh "${b.branch_name || ''}" chứa dấu hiệu giả định.`);
      }
    }
  }

  // 2. Contact Person & Written Proof
  if (!intakeRecord.contact_person?.full_name || !intakeRecord.contact_person?.email_or_phone) {
    errors.push('Thiếu thông tin người đại diện xác nhận từ đối tác.');
  }
  if (containsSyntheticMarker(intakeRecord.contact_person?.full_name)) {
    errors.push('REJECTED_SYNTHETIC_CONTACT: Người liên hệ chứa dấu hiệu giả định.');
  }

  // Written proof hash validation — reject empty-string hash
  if (!intakeRecord.written_proof?.document_sha256 || !/^[a-f0-9]{64}$/.test(intakeRecord.written_proof.document_sha256)) {
    errors.push('Thiếu mã băm SHA-256 của văn bản/chứng từ xác nhận.');
  } else if (intakeRecord.written_proof.document_sha256 === EMPTY_STRING_SHA256) {
    errors.push('REJECTED_EMPTY_PROOF_HASH: Mã băm SHA-256 là hash của chuỗi rỗng — không phải chứng từ thật.');
  }

  // 3. Price & Surcharges — both must be explicitly > 0
  if (typeof intakeRecord.base_price !== 'number' || typeof intakeRecord.promotional_price !== 'number') {
    errors.push('Mức giá gốc hoặc giá ưu đãi không hợp lệ.');
  } else if (intakeRecord.base_price <= 0 || intakeRecord.promotional_price <= 0) {
    errors.push('Giá gốc và giá ưu đãi đều phải lớn hơn 0 — không được dùng giá mặc định.');
  } else if (intakeRecord.promotional_price > intakeRecord.base_price) {
    errors.push('Giá ưu đãi không được lớn hơn giá gốc.');
  }

  // 4. Conditions & Locality
  if (!Array.isArray(intakeRecord.transparent_conditions) || intakeRecord.transparent_conditions.length === 0) {
    errors.push('Thiếu danh sách điều kiện áp dụng minh bạch.');
  } else {
    for (const c of intakeRecord.transparent_conditions) {
      if (containsSyntheticMarker(c)) {
        errors.push('REJECTED_SYNTHETIC_CONDITIONS: Điều kiện áp dụng chứa dấu hiệu giả định.');
        break;
      }
    }
  }

  // 5. Validity Dates
  if (!intakeRecord.valid_from || !intakeRecord.valid_to) {
    errors.push('Thiếu ngày bắt đầu hoặc ngày kết thúc hiệu lực.');
  } else {
    const fromDate = new Date(intakeRecord.valid_from);
    const toDate = new Date(intakeRecord.valid_to);
    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime()) || fromDate > toDate) {
      errors.push('Khoảng thời gian hiệu lực không hợp lệ.');
    }
  }

  // 6. Channel Integrity
  if (intakeRecord.channel_type !== 'DIRECT_DEAL' || intakeRecord.no_affiliate !== true) {
    errors.push('Deal đối tác địa phương bắt buộc phải là DIRECT_DEAL (no_affiliate: true).');
  }

  return {
    valid: errors.length === 0,
    errors,
    intake_id: intakeRecord.intake_id,
    deal_name: intakeRecord.deal_name,
    danang_verified: Array.isArray(intakeRecord.danang_branches) && intakeRecord.danang_branches.length > 0 &&
                     !intakeRecord.danang_branches.some(b => containsSyntheticMarker(b.branch_name)),
    status: errors.length === 0 ? 'READY_FOR_CANDIDATE_GATE' : 'REJECTED_INCOMPLETE'
  };
}

module.exports = {
  validateMerchantIntake,
  containsSyntheticMarker,
  EMPTY_STRING_SHA256
};
