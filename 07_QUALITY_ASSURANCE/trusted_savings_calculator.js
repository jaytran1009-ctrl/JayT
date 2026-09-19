/**
 * JAYT CORP — TRUSTED SAVINGS CALCULATOR ENGINE
 * WORK ORDER: JAYT-TRUSTED-SAVINGS-CALCULATOR-032
 * 
 * Formula:
 *   Subtotal (Tạm tính món)
 * - Item Discount (Giảm giá món)
 * - Valid Voucher (Giảm voucher sau min_spend, max_cap, stacking)
 * + Shipping Fee (Phí ship)
 * - Shipping Discount (Ưu đãi phí ship)
 * + Payment Surcharge (Phụ phí thanh toán nếu có)
 * = Expected Payable (Bạn dự kiến trả - Min 0đ)
 */

function calculateTrustedSavings(params) {
  const {
    item_price = 0,
    item_discount = 0,
    vouchers = [],
    shipping_fee = 0,
    shipping_discount = 0,
    payment_surcharge = 0,
    user_account_tier = 'EXISTING_USER', // 'NEW_USER', 'EXISTING_USER', 'UNKNOWN'
    payment_method = 'DEFAULT',          // 'SHOPEEPAY', 'CARD', 'COD', etc.
    verified_at = null,
    deal_conditions = [],
    unconfirmed_fields = [],
    affiliate_type = 'NO_AFFILIATE'
  } = params;

  const logs = [];
  const applied_vouchers = [];
  let mode = 'VERIFIED_EXACT'; // 'VERIFIED_EXACT' or 'ESTIMATED_RANGE'
  const unconfirmed_conditions = [...unconfirmed_fields];

  // 1. Tạm tính món & Giảm giá món
  const base_price = Math.max(0, Math.round(item_price));
  const direct_discount = Math.min(base_price, Math.max(0, Math.round(item_discount)));
  const subtotal_after_item_discount = base_price - direct_discount;

  // 2. Voucher Evaluation (Min-Spend, Max-Cap, Stacking, Expiry, User Tier, Payment Method)
  let total_voucher_discount = 0;
  const nowTime = Date.now();

  // Sort vouchers by discount value descending
  const sortedVouchers = [...vouchers].sort((a, b) => (b.discount_value || 0) - (a.discount_value || 0));

  let stacking_locked = false;

  for (const v of sortedVouchers) {
    const vName = v.code || v.name || 'VOUCHER';
    
    // Check Expiry
    if (v.expires_at) {
      const expTime = new Date(v.expires_at).getTime();
      if (!isNaN(expTime) && nowTime > expTime) {
        logs.push(`Voucher '${vName}' đã hết hạn vào lúc ${v.expires_at}. Bị loại bỏ.`);
        continue;
      }
    }

    // Check Account Tier Requirement
    if (v.required_account_tier && v.required_account_tier === 'NEW_USER') {
      if (user_account_tier !== 'NEW_USER') {
        logs.push(`Voucher '${vName}' chỉ áp dụng cho tài khoản mới (NEW_USER). Tài khoản hiện tại: '${user_account_tier}'. Bị loại bỏ.`);
        continue;
      }
    }

    // Check Payment Method Requirement
    if (v.required_payment_method && v.required_payment_method !== payment_method) {
      logs.push(`Voucher '${vName}' yêu cầu phương thức thanh toán '${v.required_payment_method}' (Hiện tại: '${payment_method}'). Bị loại bỏ.`);
      continue;
    }

    // Check Min Spend
    const minSpend = v.min_spend || 0;
    if (subtotal_after_item_discount < minSpend) {
      logs.push(`Voucher '${vName}' yêu cầu đơn tối thiểu ${minSpend.toLocaleString('vi-VN')}đ (Đơn hiện tại: ${subtotal_after_item_discount.toLocaleString('vi-VN')}đ). Không đủ điều kiện.`);
      continue;
    }

    // Check Stacking Rule
    const allowsStacking = v.allows_stacking === true;
    if (stacking_locked) {
      logs.push(`Voucher '${vName}' không thể áp dụng do voucher trước đó không cho phép cộng dồn (No Stacking).`);
      continue;
    }

    // Calculate Discount Amount
    let discountAmt = 0;
    if (v.discount_type === 'PERCENTAGE') {
      const percent = Math.min(100, Math.max(0, v.discount_percent || 0));
      discountAmt = Math.round(subtotal_after_item_discount * (percent / 100));
      if (v.max_discount && discountAmt > v.max_discount) {
        logs.push(`Voucher '${vName}' giảm ${percent}% vượt mức tối đa ${v.max_discount.toLocaleString('vi-VN')}đ -> Giảm tối đa ${v.max_discount.toLocaleString('vi-VN')}đ.`);
        discountAmt = v.max_discount;
      }
    } else {
      discountAmt = Math.round(v.discount_value || 0);
      if (v.max_discount && discountAmt > v.max_discount) {
        discountAmt = v.max_discount;
      }
    }

    // Cap discount at remaining subtotal
    discountAmt = Math.min(subtotal_after_item_discount - total_voucher_discount, discountAmt);
    if (discountAmt > 0) {
      total_voucher_discount += discountAmt;
      applied_vouchers.push({
        code: vName,
        discount_applied: discountAmt,
        allows_stacking: allowsStacking
      });

      if (!allowsStacking) {
        stacking_locked = true;
      }
    }
  }

  // 3. Shipping & Surcharge Calculation
  const actual_ship = Math.max(0, Math.round(shipping_fee));
  const ship_disc = Math.min(actual_ship, Math.max(0, Math.round(shipping_discount)));
  const final_shipping = actual_ship - ship_disc;
  const surcharge = Math.max(0, Math.round(payment_surcharge));

  // 4. Expected Total (Min 0đ, No Negative)
  const expected_total = Math.max(0, (subtotal_after_item_discount - total_voucher_discount) + final_shipping + surcharge);

  // 5. Mode & Evidence Bound Range Determination (Directive JAYT-CALCULATOR-EVIDENCE-BOUND-039C)
  const has_missing_evidence = unconfirmed_conditions.length > 0 || !verified_at;
  const is_user_entered = params.is_user_input === true || !verified_at;
  
  let price_range = null;
  let estimation_status = 'VERIFIED_EXACT';
  let estimation_message = '🟢 TỔNG CHÍNH XÁC ĐÃ XÁC MINH';

  function validateBound(bound) {
    if (!bound || typeof bound !== 'object') return false;
    const { amount, evidence_ref, artifact_hash, conditions, checked_at, calculation_scope } = bound;
    if (typeof amount !== 'number' || isNaN(amount) || amount < 0) return false;
    if (typeof evidence_ref !== 'string' || !evidence_ref.trim()) return false;
    if (typeof artifact_hash !== 'string' || !/^[a-f0-9]{64}$/i.test(artifact_hash)) return false;
    if (!Array.isArray(conditions) || conditions.length === 0 || !conditions.every(c => typeof c === 'string' && c.trim())) return false;
    if (typeof checked_at !== 'string' || !/^\d{4}-\d{2}-\d{2}T/.test(checked_at)) return false;
    if (typeof calculation_scope !== 'string' || !calculation_scope.trim()) return false;
    return true;
  }

  if (params.evidenced_range && typeof params.evidenced_range === 'object') {
    const range = params.evidenced_range;
    const lower = range.lower_bound || range.min_bound;
    const upper = range.upper_bound || range.max_bound;

    const isLowerValid = validateBound(lower);
    const isUpperValid = validateBound(upper);
    const isScopeMatched = isLowerValid && isUpperValid && (lower.calculation_scope === upper.calculation_scope);
    const isAmountOrderValid = isLowerValid && isUpperValid && (lower.amount <= upper.amount);

    if (isLowerValid && isUpperValid && isScopeMatched && isAmountOrderValid) {
      mode = 'EVIDENCE_BOUND_RANGE';
      price_range = {
        min: lower.amount,
        max: upper.amount,
        calculation_scope: lower.calculation_scope,
        display: `${lower.amount.toLocaleString('vi-VN')}đ ~ ${upper.amount.toLocaleString('vi-VN')}đ`,
        evidence_proven: true,
        lower_bound: lower,
        upper_bound: upper
      };
      estimation_status = 'EVIDENCE_BOUND_RANGE';
      estimation_message = `🟡 KHOẢNG GIÁ ĐÃ XÁC THỰC BẰNG CHỨNG (${price_range.display})`;
    } else {
      mode = 'UNVERIFIED_ESTIMATE';
      price_range = null;
      estimation_status = 'MISSING_EVIDENCE';
      estimation_message = 'Chưa thể ước tính: thiếu phí/voucher có chứng cứ hoặc không cùng phạm vi tính toán.';
    }
  } else if (has_missing_evidence) {
    mode = 'UNVERIFIED_ESTIMATE';
    price_range = null;
    estimation_status = 'MISSING_EVIDENCE';
    estimation_message = 'Chưa thể ước tính: thiếu phí/voucher có chứng cứ.';
  } else {
    mode = 'VERIFIED_EXACT';
    price_range = null;
    estimation_status = 'VERIFIED_EXACT';
    estimation_message = '🟢 TỔNG CHÍNH XÁC ĐÃ XÁC MINH';
  }

  const user_input_label = is_user_entered ? 'Người dùng tự nhập — JayT chưa xác minh' : 'Dữ liệu đã được kiểm chứng độc lập';

  return {
    mode, // 'VERIFIED_EXACT' | 'EVIDENCE_BOUND_RANGE' | 'UNVERIFIED_ESTIMATE'
    estimation_status,
    estimation_message,
    user_input_label,
    breakdown: {
      item_price: base_price,
      item_discount: direct_discount,
      subtotal_after_item_discount,
      voucher_discount: total_voucher_discount,
      applied_vouchers,
      shipping_fee: actual_ship,
      shipping_discount: ship_disc,
      net_shipping: final_shipping,
      payment_surcharge: surcharge,
      expected_total: expected_total,
      price_range: price_range
    },
    metadata: {
      verified_at: verified_at || 'CHƯA_XÁC_MINH_THỜI_ĐIỂM',
      applied_conditions: deal_conditions,
      unconfirmed_conditions: unconfirmed_conditions,
      warning: is_user_entered ? 'Người dùng tự nhập — JayT chưa xác minh.' : 'Voucher có thể thay đổi theo tài khoản, số lượng hoặc khung giờ flash-sale.',
      action_cta: 'Mở nguồn để kiểm tra lần cuối',
      affiliate_label: affiliate_type === 'AFFILIATE_LINK' ? 'Affiliate' : 'Không affiliate',
      logs: logs
    }
  };
}

module.exports = { calculateTrustedSavings };
