const { calculateTrustedSavings } = require('./trusted_savings_calculator.js');

console.log('🧪 [JAYT-CALCULATOR-TEST] Khởi chạy bộ kiểm thử Động Cơ Tính Tiền Thật (032)...');

let allPassed = true;
function assertTest(name, condition, detail = '') {
  console.log(`  [${name}]: [${condition ? 'PASS' : 'FAIL'}]${detail ? ' - ' + detail : ''}`);
  if (!condition) allPassed = false;
}

// ---------------------------------------------------------------------------
// [CALC_01] Verified Exact Total Mode with Full Breakdown
// ---------------------------------------------------------------------------
const res1 = calculateTrustedSavings({
  item_price: 120000,
  item_discount: 20000, // subtotal = 100k
  vouchers: [{
    code: "DISC10K",
    discount_value: 10000,
    min_spend: 50000,
    allows_stacking: true
  }],
  shipping_fee: 25000,
  shipping_discount: 15000, // net shipping = 10k
  payment_surcharge: 0,
  verified_at: "2026-08-22T12:00:00+07:00",
  deal_conditions: ["Thành viên U22", "Đặt qua app"],
  affiliate_type: "NO_AFFILIATE"
});
assertTest(
  'CALC_01_VERIFIED_EXACT_MODE',
  res1.mode === 'VERIFIED_EXACT' &&
  res1.breakdown.subtotal_after_item_discount === 100000 &&
  res1.breakdown.voucher_discount === 10000 &&
  res1.breakdown.net_shipping === 10000 &&
  res1.breakdown.expected_total === 100000, // (100k - 10k) + 10k = 100k
  `Expected: 100.000đ, Got: ${res1.breakdown.expected_total.toLocaleString('vi-VN')}đ`
);

// ---------------------------------------------------------------------------
// [CALC_02_NEGATIVE] Missing Evidence MUST NOT Produce Arithmetic Numeric Range
// ---------------------------------------------------------------------------
const res2 = calculateTrustedSavings({
  item_price: 80000,
  item_discount: 10000,
  unconfirmed_fields: ['shipping_fee', 'payment_method'],
  deal_conditions: ["Ưu đãi giờ vàng"]
});
const noFakeNumericRange = res2.breakdown.price_range === null &&
                           res2.estimation_status === 'MISSING_EVIDENCE' &&
                           res2.estimation_message === 'Chưa thể ước tính: thiếu phí/voucher có chứng cứ.';
assertTest(
  'CALC_02_NEGATIVE_MISSING_EVIDENCE_NO_NUMERIC_RANGE',
  noFakeNumericRange,
  `Missing evidence returns message: "${res2.estimation_message}", price_range: null (No fake arithmetic numbers)`
);

// ---------------------------------------------------------------------------
// [CALC_02b] Valid Evidence-Bound Range Allowed Only When Both Bounds Share Same Scope
// ---------------------------------------------------------------------------
const res2b = calculateTrustedSavings({
  item_price: 58000,
  verified_at: "2026-08-22T14:32:00+07:00",
  evidenced_range: {
    lower_bound: {
      amount: 58000,
      calculation_scope: "SCOPE_CGV_2D_TICKET_PAYABLE",
      evidence_ref: "EVID_CGV_2D_STANDARD_SEAT",
      artifact_hash: "73cae9e1c2b44217bdf55cb666e242229fca9c3b2c7dea0bdb6852a82d412175",
      conditions: ["Ghế tiêu chuẩn 2D", "Ngày Thứ Hai 24/08/2026", "CGV Vĩnh Trung Plaza"],
      checked_at: "2026-08-22T14:32:00+07:00"
    },
    upper_bound: {
      amount: 68000,
      calculation_scope: "SCOPE_CGV_2D_TICKET_PAYABLE",
      evidence_ref: "EVID_CGV_2D_VIP_SEAT",
      artifact_hash: "28451a062c63b942c51106f46d04682f9b484e828ac684cb46920f524585a706",
      conditions: ["Ghế VIP 2D", "Ngày Thứ Hai 24/08/2026", "CGV Vĩnh Trung Plaza"],
      checked_at: "2026-08-22T14:32:00+07:00"
    }
  }
});
assertTest(
  'CALC_02b_EVIDENCE_BOUND_RANGE_VALID_SAME_SCOPE',
  res2b.mode === 'EVIDENCE_BOUND_RANGE' &&
  res2b.breakdown.price_range !== null &&
  res2b.breakdown.price_range.display === '58.000đ ~ 68.000đ' &&
  res2b.breakdown.price_range.calculation_scope === 'SCOPE_CGV_2D_TICKET_PAYABLE' &&
  res2b.breakdown.price_range.evidence_proven === true,
  `Evidence range verified for same scope: ${res2b.breakdown.price_range ? res2b.breakdown.price_range.display : 'null'}`
);

// ---------------------------------------------------------------------------
// [CALC_02c] User-Entered Custom Values Tagged as Unverified by JayT
// ---------------------------------------------------------------------------
const res2c = calculateTrustedSavings({
  item_price: 150000,
  is_user_input: true
});
assertTest(
  'CALC_02c_USER_ENTERED_CUSTOM_VALUES_LABELED',
  res2c.user_input_label === 'Người dùng tự nhập — JayT chưa xác minh',
  `User input label: "${res2c.user_input_label}"`
);

// ---------------------------------------------------------------------------
// [CALC_02d_NEGATIVE] Missing Conditions in Bound -> Rejected Range (price_range: null)
// ---------------------------------------------------------------------------
const res2d = calculateTrustedSavings({
  item_price: 58000,
  verified_at: "2026-08-22T14:32:00+07:00",
  evidenced_range: {
    lower_bound: {
      amount: 58000,
      calculation_scope: "SCOPE_CGV_2D_TICKET_PAYABLE",
      evidence_ref: "EVID_CGV_2D_STANDARD_SEAT",
      artifact_hash: "73cae9e1c2b44217bdf55cb666e242229fca9c3b2c7dea0bdb6852a82d412175",
      conditions: ["Ghế tiêu chuẩn 2D"],
      checked_at: "2026-08-22T14:32:00+07:00"
    },
    upper_bound: {
      amount: 68000,
      calculation_scope: "SCOPE_CGV_2D_TICKET_PAYABLE",
      evidence_ref: "EVID_CGV_2D_VIP_SEAT",
      artifact_hash: "28451a062c63b942c51106f46d04682f9b484e828ac684cb46920f524585a706",
      conditions: [], // EMPTY CONDITIONS -> REJECTED
      checked_at: "2026-08-22T14:32:00+07:00"
    }
  }
});
assertTest(
  'CALC_02d_NEGATIVE_MISSING_CONDITIONS_REJECTED',
  res2d.breakdown.price_range === null && res2d.estimation_status === 'MISSING_EVIDENCE',
  `Empty conditions correctly caused price_range: null`
);

// ---------------------------------------------------------------------------
// [CALC_02e_NEGATIVE] Different Calculation Scope (Ticket vs Combo) -> Rejected Range
// ---------------------------------------------------------------------------
const res2e = calculateTrustedSavings({
  item_price: 58000,
  verified_at: "2026-08-22T14:32:00+07:00",
  evidenced_range: {
    lower_bound: {
      amount: 58000,
      calculation_scope: "SCOPE_CGV_2D_TICKET",
      evidence_ref: "EVID_CGV_TICKET_58K",
      artifact_hash: "73cae9e1c2b44217bdf55cb666e242229fca9c3b2c7dea0bdb6852a82d412175",
      conditions: ["Vé xem phim 2D"],
      checked_at: "2026-08-22T14:32:00+07:00"
    },
    upper_bound: {
      amount: 87000,
      calculation_scope: "SCOPE_CGV_CONCESSION_COMBO", // MISMATCHED SCOPE (Different product) -> REJECTED
      evidence_ref: "EVID_CGV_COMBO_87K",
      artifact_hash: "28451a062c63b942c51106f46d04682f9b484e828ac684cb46920f524585a706",
      conditions: ["Combo 2 nước 1 bắp"],
      checked_at: "2026-08-22T14:32:00+07:00"
    }
  }
});
assertTest(
  'CALC_02e_NEGATIVE_DIFFERENT_CALCULATION_SCOPE_REJECTED',
  res2e.breakdown.price_range === null && res2e.estimation_status === 'MISSING_EVIDENCE',
  `Different calculation scopes (Ticket vs Combo) correctly rejected as a valid range`
);

// ---------------------------------------------------------------------------
// [CALC_02f_NEGATIVE] Tampered Hash or Missing checked_at -> Rejected Range
// ---------------------------------------------------------------------------
const res2f = calculateTrustedSavings({
  item_price: 58000,
  verified_at: "2026-08-22T14:32:00+07:00",
  evidenced_range: {
    lower_bound: {
      amount: 58000,
      calculation_scope: "SCOPE_CGV_2D_TICKET",
      evidence_ref: "EVID_CGV_TICKET_58K",
      artifact_hash: "invalid_short_hash", // INVALID HASH -> REJECTED
      conditions: ["Vé xem phim 2D"],
      checked_at: "2026-08-22T14:32:00+07:00"
    },
    upper_bound: {
      amount: 68000,
      calculation_scope: "SCOPE_CGV_2D_TICKET",
      evidence_ref: "EVID_CGV_VIP_68K",
      artifact_hash: "28451a062c63b942c51106f46d04682f9b484e828ac684cb46920f524585a706",
      conditions: ["Ghế VIP"],
      checked_at: "2026-08-22T14:32:00+07:00"
    }
  }
});
assertTest(
  'CALC_02f_NEGATIVE_INVALID_HASH_REJECTED',
  res2f.breakdown.price_range === null && res2f.estimation_status === 'MISSING_EVIDENCE',
  `Invalid hash correctly caused price_range: null`
);

// ---------------------------------------------------------------------------
// [CALC_03] Min-Spend Requirement Not Met
// ---------------------------------------------------------------------------
const res3 = calculateTrustedSavings({
  item_price: 100000,
  item_discount: 0,
  vouchers: [{
    code: "BIG20K",
    discount_value: 20000,
    min_spend: 150000 // Requires 150k, but cart is only 100k
  }],
  verified_at: "2026-08-22T12:00:00+07:00"
});
assertTest(
  'CALC_03_MIN_SPEND_NOT_MET',
  res3.breakdown.voucher_discount === 0 &&
  res3.breakdown.applied_vouchers.length === 0,
  `Voucher rejected due to min-spend. Total: ${res3.breakdown.expected_total.toLocaleString('vi-VN')}đ`
);

// ---------------------------------------------------------------------------
// [CALC_04] Max Discount Cap Enforced
// ---------------------------------------------------------------------------
const res4 = calculateTrustedSavings({
  item_price: 200000,
  item_discount: 0,
  vouchers: [{
    code: "50PERCENT_MAX30K",
    discount_type: "PERCENTAGE",
    discount_percent: 50, // 50% of 200k = 100k
    max_discount: 30000,  // Max cap 30k
    min_spend: 100000
  }],
  verified_at: "2026-08-22T12:00:00+07:00"
});
assertTest(
  'CALC_04_MAX_DISCOUNT_CAPPED',
  res4.breakdown.voucher_discount === 30000 &&
  res4.breakdown.expected_total === 170000,
  `50% of 200k capped at 30k. Expected Total: 170.000đ`
);

// ---------------------------------------------------------------------------
// [CALC_05] Expired Voucher Strictly Excluded
// ---------------------------------------------------------------------------
const res5 = calculateTrustedSavings({
  item_price: 100000,
  vouchers: [{
    code: "EXPIRED_VOUCHER",
    discount_value: 20000,
    expires_at: "2026-08-21T00:00:00Z" // Expired yesterday
  }],
  verified_at: "2026-08-22T12:00:00+07:00"
});
assertTest(
  'CALC_05_EXPIRED_VOUCHER_EXCLUDED',
  res5.breakdown.voucher_discount === 0 &&
  res5.metadata.logs.some(l => l.includes('đã hết hạn')),
  `Expired voucher was correctly excluded.`
);

// ---------------------------------------------------------------------------
// [CALC_06] Non-Stackable Vouchers Prevent Stacking
// ---------------------------------------------------------------------------
const res6 = calculateTrustedSavings({
  item_price: 200000,
  vouchers: [
    { code: "VOUCHER_A_NO_STACK", discount_value: 50000, allows_stacking: false },
    { code: "VOUCHER_B_STACKABLE", discount_value: 30000, allows_stacking: true }
  ],
  verified_at: "2026-08-22T12:00:00+07:00"
});
assertTest(
  'CALC_06_NON_STACKABLE_VOUCHERS',
  res6.breakdown.voucher_discount === 50000 &&
  res6.breakdown.applied_vouchers.length === 1,
  `Only 1 non-stackable voucher applied. Voucher B rejected.`
);

// ---------------------------------------------------------------------------
// [CALC_07] New User Only Voucher Enforced
// ---------------------------------------------------------------------------
const res7 = calculateTrustedSavings({
  item_price: 100000,
  user_account_tier: "EXISTING_USER",
  vouchers: [{
    code: "NEW_USER_DEAL",
    discount_value: 40000,
    required_account_tier: "NEW_USER"
  }],
  verified_at: "2026-08-22T12:00:00+07:00"
});
assertTest(
  'CALC_07_NEW_USER_ONLY_ENFORCED',
  res7.breakdown.voucher_discount === 0 &&
  res7.metadata.logs.some(l => l.includes('chỉ áp dụng cho tài khoản mới')),
  `New user voucher excluded for existing user.`
);

// ---------------------------------------------------------------------------
// [CALC_08] Shipping Fee, Shipping Discount & Payment Surcharge
// ---------------------------------------------------------------------------
const res8 = calculateTrustedSavings({
  item_price: 100000,
  shipping_fee: 30000,
  shipping_discount: 20000, // Net shipping = 10k
  payment_surcharge: 5000,  // Net surcharge = 5k
  verified_at: "2026-08-22T12:00:00+07:00"
});
assertTest(
  'CALC_08_SHIPPING_AND_SURCHARGE',
  res8.breakdown.net_shipping === 10000 &&
  res8.breakdown.payment_surcharge === 5000 &&
  res8.breakdown.expected_total === 115000,
  `100k item + 10k ship + 5k surcharge = 115.000đ`
);

// ---------------------------------------------------------------------------
// [CALC_09] Non-Negative Total Invariant
// ---------------------------------------------------------------------------
const res9 = calculateTrustedSavings({
  item_price: 50000,
  item_discount: 60000, // Over-discounted
  vouchers: [{ code: "EXTRA", discount_value: 50000 }],
  verified_at: "2026-08-22T12:00:00+07:00"
});
assertTest(
  'CALC_09_NON_NEGATIVE_TOTAL',
  res9.breakdown.expected_total === 0,
  `Total payable is 0đ, never negative.`
);

// ---------------------------------------------------------------------------
// [CALC_10] Mandatory Metadata & Disclosure
// ---------------------------------------------------------------------------
const res10 = calculateTrustedSavings({
  item_price: 90000,
  verified_at: "2026-08-22T12:00:00+07:00",
  deal_conditions: ["Thẻ sinh viên", "Khung giờ 13h-17h"],
  affiliate_type: "AFFILIATE_LINK"
});
assertTest(
  'CALC_10_METADATA_AND_DISCLOSURE',
  res10.metadata.warning.includes('Voucher có thể thay đổi') &&
  res10.metadata.action_cta === 'Mở nguồn để kiểm tra lần cuối' &&
  res10.metadata.affiliate_label === 'Affiliate',
  `Metadata fully transparent.`
);

console.log('\n' + (allPassed ? '🟢' : '❌') + ' [CALCULATOR-TEST-SUMMARY] Toàn bộ ' + (allPassed ? '10/10' : 'bài') + ' kiểm thử Trusted Savings Calculator đã ' + (allPassed ? 'ĐẠT [PASS]' : 'THẤT BẠI [FAIL]') + '!');

if (!allPassed) {
  process.exit(1);
} else {
  process.exit(0);
}
