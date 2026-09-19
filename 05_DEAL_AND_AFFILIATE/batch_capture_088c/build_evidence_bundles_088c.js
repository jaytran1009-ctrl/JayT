const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..', '..');
const dir088 = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088', 'captures_088');
const dir088a = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088a', 'captures_088a');
const dir088b = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088b', 'captures_088b');
const dir088c = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088c', 'captures_088c');

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function getArtifact(baseDir, targetId) {
  const txtPath = path.join(baseDir, targetId, 'page.txt');
  if (!fs.existsSync(txtPath)) return null;
  const buf = fs.readFileSync(txtPath);
  return {
    path: path.relative(repoRoot, txtPath).replace(/\\/g, '/'),
    hash: sha256(buf),
    text: buf.toString('utf8')
  };
}

console.log('📊 [EVIDENCE-BUNDLE-BUILDER-088C] Xây dựng Evidence Bundles mở rộng 088C...');

const bundles = [];

// 1. RECURRING_POLICY_CANDIDATE: Metiz Cinema - Giá Ưu Đãi U22 55.000đ (Thứ Ba đến Thứ Năm)
const metizPolicy = getArtifact(dir088, 'TARGET_088_151');
const metizBranch = getArtifact(dir088a, 'TARGET_088A_BR_224');

if (metizPolicy && metizBranch) {
  bundles.push({
    bundle_id: 'BUNDLE_088C_METIZ_U22_RECURRING',
    brand: 'Metiz Cinema',
    sector: 'CINEMA',
    title: 'Giá ưu đãi 55.000đ dành cho thành viên U22 (Thứ Ba đến Thứ Năm)',
    tier: 'RECURRING_POLICY_CANDIDATE',
    computable_offer: 'Giá ưu đãi 55.000đ/vé (2D)',
    validity_type: 'RECURRING_POLICY',
    freshness: {
      checked_at: '2026-08-25T12:45:00+07:00',
      recheck_due_at: '2026-09-25T12:45:00+07:00'
    },
    pieces: {
      price_quote: {
        quote: 'Áp dụng giá vé 2D chỉ 55.000đ cho thành viên Metiz Cinema từ 22 tuổi trở xuống, đối với mọi suất chiếu tại Metiz Cinema.',
        artifact_path: metizPolicy.path,
        artifact_sha256: metizPolicy.hash
      },
      recurrence_rule: {
        quote: 'chương trình được ưu đãi tất cả các ngày trong tuần từ thứ Ba đến thứ Năm.',
        artifact_path: metizPolicy.path,
        artifact_sha256: metizPolicy.hash
      },
      redemption_channel: {
        quote: 'Áp dụng cho hình thức mua vé trực tiếp tại quầy.',
        artifact_path: metizPolicy.path,
        artifact_sha256: metizPolicy.hash
      },
      conditions: {
        quote: 'Chương trình chỉ áp dụng cho thành viên Metiz Cinema, dưới 22 tuổi trở xuống. Vui lòng xuất trình thẻ thành viên & căn cước công dân trước khi mua vé để được giá ưu đãi & tích lũy điểm thưởng.',
        artifact_path: metizPolicy.path,
        artifact_sha256: metizPolicy.hash
      },
      policy_scope: {
        quote: 'đối với mọi suất chiếu tại Metiz Cinema.',
        artifact_path: metizPolicy.path,
        artifact_sha256: metizPolicy.hash,
        scope_description: 'Áp dụng cho toàn bộ rạp Metiz Cinema'
      },
      danang_branch: {
        quote: 'Địa điểm: Số 01 Đường 2 Tháng 9, Hải Châu, Đà Nẵng',
        artifact_path: metizBranch.path,
        artifact_sha256: metizBranch.hash,
        branch_name: 'Metiz Cinema Đà Nẵng (Số 01 Đường 2/9, Hải Châu, Đà Nẵng)'
      }
    }
  });
}

// 2. TIME_BOUNDED_CANDIDATE: CGV Cinemas - Deal Giảm 30K Lương Về (25/08 - 31/08/2026)
const cgvPaydayPolicy = getArtifact(dir088, 'TARGET_088_175');
const cgvVincomBranch = getArtifact(dir088b, 'TARGET_088B_CGV_THEATER_002');

if (cgvPaydayPolicy && cgvVincomBranch) {
  bundles.push({
    bundle_id: 'BUNDLE_088C_CGV_PAYDAY_30K_TIME_BOUNDED',
    brand: 'CGV Cinemas',
    sector: 'CINEMA',
    title: 'Deal Ting Ting Lương Về: Giảm ngay 30.000đ khi mua từ 2 vé (Mã PAYDAY)',
    tier: 'TIME_BOUNDED_CANDIDATE',
    computable_offer: 'Giảm 30.000đ khi mua từ 2 vé',
    validity_type: 'SPECIFIC_EXPIRATION',
    valid_from: '2026-08-25',
    valid_to: '2026-08-31',
    pieces: {
      price_and_discount: {
        quote: 'Giảm ngay 30.000Đ khi mua từ 02 vé trở lên',
        artifact_path: cgvPaydayPolicy.path,
        artifact_sha256: cgvPaydayPolicy.hash
      },
      time_bounded_validity: {
        quote: 'Từ 25/08 – 31/08/2026, thành viên CGV đặt vé trên Website/App CGV',
        artifact_path: cgvPaydayPolicy.path,
        artifact_sha256: cgvPaydayPolicy.hash
      },
      promo_code: {
        quote: 'Nhập hoặc chọn mã “PAYDAY”, Áp dụng để được giảm ngay 30.000Đ.',
        artifact_path: cgvPaydayPolicy.path,
        artifact_sha256: cgvPaydayPolicy.hash
      },
      redemption_channel: {
        quote: 'Mua vé trực tuyến qua Web/App CGV',
        artifact_path: cgvPaydayPolicy.path,
        artifact_sha256: cgvPaydayPolicy.hash
      },
      conditions: {
        quote: 'Chỉ áp dụng cho giao dịch từ 02 vé xem phim trở lên tại web/app CGV',
        artifact_path: cgvPaydayPolicy.path,
        artifact_sha256: cgvPaydayPolicy.hash
      },
      policy_scope: {
        quote: 'Áp dụng tất cả các rạp, định dạng, phòng chiếu.',
        artifact_path: cgvPaydayPolicy.path,
        artifact_sha256: cgvPaydayPolicy.hash,
        scope_description: 'Áp dụng toàn bộ hệ thống rạp CGV toàn quốc'
      },
      danang_branch: {
        quote: 'Tầng 4, TTTM Vincom Đà Nẵng, đường Ngô Quyền, P.An Hải Bắc, Q.Sơn Trà, TP. Đà Nẵng',
        artifact_path: cgvVincomBranch.path,
        artifact_sha256: cgvVincomBranch.hash,
        branch_name: 'CGV Vincom Đà Nẵng (Tầng 4 Vincom Plaza, Sơn Trà, Đà Nẵng)'
      }
    }
  });
}

// 3. LOYALTY_POLICY_REFERENCE: Galaxy Cinema Membership 2026 (Tích lũy Star & Quà sinh nhật)
const galaxyMemberPolicy = getArtifact(dir088c, 'TARGET_088C_589');
if (galaxyMemberPolicy) {
  bundles.push({
    bundle_id: 'BUNDLE_088C_GALAXY_MEMBERSHIP_2026_LOYALTY',
    brand: 'Galaxy Cinema',
    sector: 'CINEMA',
    title: 'Chương trình Hội viên Galaxy Cinema 2026 (Tích lũy Star & Quà tặng sinh nhật)',
    tier: 'LOYALTY_POLICY_REFERENCE',
    validity_type: 'LOYALTY_POLICY',
    freshness: {
      checked_at: '2026-08-25T13:10:00+07:00',
      recheck_due_at: '2026-12-31T23:59:59+07:00'
    },
    pieces: {
      policy_summary: {
        quote: 'Ưu Đãi Thành Viên Galaxy Cinema 2026',
        artifact_path: galaxyMemberPolicy.path,
        artifact_sha256: galaxyMemberPolicy.hash
      },
      points_rule: {
        quote: 'Điểm tích lũy được gọi là Star. 1 điểm đổi được 1.000 đồng – áp dụng được cho việc thanh toán vé, bắp nước tại Galaxy Cinema.',
        artifact_path: galaxyMemberPolicy.path,
        artifact_sha256: galaxyMemberPolicy.hash
      },
      policy_scope: {
        quote: 'Khách hàng thành viên tích lũy điểm dựa trên giá trị chi tiêu tại Galaxy Cinema (qua ứng dụng Galaxy Cinema & tại rạp), cho cả chi tiêu vé & bắp nước tùy theo hạng thành viên.',
        artifact_path: galaxyMemberPolicy.path,
        artifact_sha256: galaxyMemberPolicy.hash,
        scope_description: 'Áp dụng trên toàn bộ hệ thống rạp và ứng dụng Galaxy Cinema'
      }
    }
  });
}

// 4. LOYALTY_POLICY_REFERENCE: CGV Cinemas Membership
const cgvMemberPolicy = getArtifact(dir088, 'TARGET_088_104');
const cgvVinhTrungBranch = getArtifact(dir088b, 'TARGET_088B_CGV_THEATER_001');

if (cgvMemberPolicy && cgvVinhTrungBranch) {
  bundles.push({
    bundle_id: 'BUNDLE_088C_CGV_MEMBERSHIP_LOYALTY',
    brand: 'CGV Cinemas',
    sector: 'CINEMA',
    title: 'Chương trình Hội viên CGV Membership (Tích lũy điểm thưởng & quà sinh nhật)',
    tier: 'LOYALTY_POLICY_REFERENCE',
    validity_type: 'LOYALTY_POLICY',
    freshness: {
      checked_at: '2026-08-25T12:45:00+07:00',
      recheck_due_at: '2026-09-25T12:45:00+07:00'
    },
    pieces: {
      policy_summary: {
        quote: 'CHƯƠNG TRÌNH ĐIỂM THƯỞNG',
        artifact_path: cgvMemberPolicy.path,
        artifact_sha256: cgvMemberPolicy.hash
      },
      member_tiers: {
        quote: 'Chương trình bao gồm 5 đối tượng thành viên FanC | Thân thiết | Elite | CGV VIP và CGV VVIP với những quyền lợi và mức ưu đãi khác nhau.',
        artifact_path: cgvMemberPolicy.path,
        artifact_sha256: cgvMemberPolicy.hash
      },
      points_rule: {
        quote: '1 điểm = 1.000 VND, có giá trị như tiền mặt, được dùng để mua vé xem phim, thức uống/ combo tương ứng tại CGV và đổi voucher ưu đãi trên CGV Reward.',
        artifact_path: cgvMemberPolicy.path,
        artifact_sha256: cgvMemberPolicy.hash
      },
      policy_scope: {
        quote: 'Quầy Bắp Nước',
        artifact_path: cgvMemberPolicy.path,
        artifact_sha256: cgvMemberPolicy.hash,
        scope_description: 'Áp dụng trên toàn bộ hệ thống CGV'
      },
      danang_branch: {
        quote: '255-257 đường Hùng Vương Quận Thanh Khê Tp. Đà Nẵng',
        artifact_path: cgvVinhTrungBranch.path,
        artifact_sha256: cgvVinhTrungBranch.hash,
        branch_name: 'CGV Vĩnh Trung Plaza Đà Nẵng'
      }
    }
  });
}

// 5. LOYALTY_POLICY_REFERENCE: Metiz Cinema - Ưu Đãi Thành Viên Metiz 2026
const metizMemberPolicy = getArtifact(dir088, 'TARGET_088_150');
if (metizMemberPolicy && metizBranch) {
  bundles.push({
    bundle_id: 'BUNDLE_088C_METIZ_MEMBER_2026_LOYALTY',
    brand: 'Metiz Cinema',
    sector: 'CINEMA',
    title: 'Chính sách ưu đãi thành viên Metiz Cinema 2026 (Tích lũy 7-10% & vé sinh nhật)',
    tier: 'LOYALTY_POLICY_REFERENCE',
    validity_type: 'LOYALTY_POLICY',
    freshness: {
      checked_at: '2026-08-25T12:45:00+07:00',
      recheck_due_at: '2026-12-31T23:59:59+07:00'
    },
    pieces: {
      policy_summary: {
        quote: 'QUÀ MỪNG LÊN HẠNG - ƯU ĐÃI THÀNH VIÊN METIZ 2026',
        artifact_path: metizMemberPolicy.path,
        artifact_sha256: metizMemberPolicy.hash
      },
      discount_rule: {
        quote: 'Tích lũy điểm 7% giá trị giao dịch tại quầy vé & quầy bắp nước.',
        artifact_path: metizMemberPolicy.path,
        artifact_sha256: metizMemberPolicy.hash
      },
      birthday_benefit: {
        quote: 'Tặng 01 vé xem phim (Allday - Hạn sử dụng 1 tháng) vào tháng sinh nhật.',
        artifact_path: metizMemberPolicy.path,
        artifact_sha256: metizMemberPolicy.hash
      },
      policy_scope: {
        quote: 'Khách hàng nhận Quà mừng lên hạng tại rạp Metiz Cinema.',
        artifact_path: metizMemberPolicy.path,
        artifact_sha256: metizMemberPolicy.hash,
        scope_description: 'Áp dụng tại rạp Metiz Cinema'
      },
      danang_branch: {
        quote: 'Địa điểm: Số 01 Đường 2 Tháng 9, Hải Châu, Đà Nẵng',
        artifact_path: metizBranch.path,
        artifact_sha256: metizBranch.hash,
        branch_name: 'Metiz Cinema Đà Nẵng'
      }
    }
  });
}

// 6. LOYALTY_POLICY_REFERENCE: Gong Cha Vietnam - Chính Sách Tích Điểm Thành Viên
const gongChaPolicy = getArtifact(dir088, 'TARGET_088_113');
const gongChaBranch = getArtifact(dir088a, 'TARGET_088A_BR_149');

if (gongChaPolicy && gongChaBranch) {
  bundles.push({
    bundle_id: 'BUNDLE_088C_GONGCHA_MEMBERSHIP_LOYALTY',
    brand: 'Gong Cha Vietnam',
    sector: 'COFFEE_TEA',
    title: 'Chính sách tích điểm thành viên ứng dụng Gong Cha VN (Lá trà & Boba)',
    tier: 'LOYALTY_POLICY_REFERENCE',
    validity_type: 'LOYALTY_POLICY',
    freshness: {
      checked_at: '2026-08-25T12:45:00+07:00',
      recheck_due_at: '2026-09-25T12:45:00+07:00'
    },
    pieces: {
      policy_summary: {
        quote: 'CHÍNH SÁCH THÀNH VIÊN ỨNG DỤNG GONG CHA VN',
        artifact_path: gongChaPolicy.path,
        artifact_sha256: gongChaPolicy.hash
      },
      points_rule: {
        quote: 'Chương trình tích điểm thành viên Gong Cha VN cho phép bạn tích điểm và chủ động đổi điểm để lấy những ưu đãi, phần quà hấp dẫn từ Gong Cha. Với mỗi hóa đơn chi tiêu tại cửa hàng, bạn sẽ được tích điểm tương đương với số tiền mà bạn đã thanh toán.',
        artifact_path: gongChaPolicy.path,
        artifact_sha256: gongChaPolicy.hash
      },
      policy_scope: {
        quote: 'Với mỗi hóa đơn chi tiêu tại cửa hàng, bạn sẽ được tích điểm tương đương với số tiền mà bạn đã thanh toán.',
        artifact_path: gongChaPolicy.path,
        artifact_sha256: gongChaPolicy.hash,
        scope_description: 'Áp dụng trên toàn bộ hệ thống cửa hàng Gong Cha'
      },
      danang_branch: {
        quote: '01 Nguyễn Văn Linh, Phường Bình Hiên, Quận Hải Châu, Đà Nẵng.',
        artifact_path: gongChaBranch.path,
        artifact_sha256: gongChaBranch.hash,
        branch_name: 'Gong Cha Đà Nẵng (Nguyễn Văn Linh)'
      }
    }
  });
}

// 7. SIGNAL_ONLY: Domino's Pizza Vietnam - Khuyến Mãi Định Kỳ (Pending Locality)
const dominosPolicy = getArtifact(dir088c, 'TARGET_088C_287');
if (dominosPolicy) {
  bundles.push({
    bundle_id: 'BUNDLE_088C_DOMINOS_PIZZA_PROMOTIONS',
    brand: "Domino's Pizza",
    sector: 'FNB_FASTFOOD',
    title: "Chính sách ưu đãi định kỳ Domino's Pizza (Thứ 3 Mua 1 Tặng 1)",
    tier: 'SIGNAL_ONLY',
    validity_type: 'PENDING_LOCALITY_LINKAGE',
    freshness: {
      checked_at: '2026-08-25T13:10:00+07:00',
      recheck_due_at: '2026-09-25T13:10:00+07:00'
    },
    pieces: {
      bogo_promo: {
        quote: 'Thứ 3 Mua 1 Tặng 1 Pizza',
        artifact_path: dominosPolicy.path,
        artifact_sha256: dominosPolicy.hash
      },
      bogo_terms: {
        quote: '* Áp dụng vào mỗi Thứ Ba (trừ Ngày lễ/Tết) cho Dùng tại chỗ, Mua mang về & Giao hàng tận nơi.',
        artifact_path: dominosPolicy.path,
        artifact_sha256: dominosPolicy.hash
      }
    }
  });
}

// 8. SIGNAL_ONLY: Phê La - Mạng Lưới Cửa Hàng Trực Tiếp Đà Nẵng
const pheLaBranch = getArtifact(dir088a, 'TARGET_088A_BR_137');
if (pheLaBranch) {
  bundles.push({
    bundle_id: 'BUNDLE_088C_PHELA_STORE_NETWORK',
    brand: 'Phê La',
    sector: 'COFFEE_TEA',
    title: 'Hệ thống cửa hàng chính thức Phê La tại Đà Nẵng (Bạch Đằng & Nguyễn Văn Linh)',
    tier: 'SIGNAL_ONLY',
    validity_type: 'STORE_NETWORK_EVIDENCE',
    freshness: {
      checked_at: '2026-08-25T12:45:00+07:00',
      recheck_due_at: '2026-09-25T12:45:00+07:00'
    },
    pieces: {
      danang_branch_1: {
        quote: 'Số 36 - 38 đường Bạch Đằng, Phường Hải Châu, TP Đà Nẵng',
        artifact_path: pheLaBranch.path,
        artifact_sha256: pheLaBranch.hash
      },
      danang_branch_2: {
        quote: 'Số 35 - 41 Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng',
        artifact_path: pheLaBranch.path,
        artifact_sha256: pheLaBranch.hash
      }
    }
  });
}

// 9. SIGNAL_ONLY: Jollibee Vietnam - Mạng Lưới Cửa Hàng Trực Tiếp Đà Nẵng
const jollibeeBranch = getArtifact(dir088a, 'TARGET_088A_BR_128');
if (jollibeeBranch) {
  bundles.push({
    bundle_id: 'BUNDLE_088C_JOLLIBEE_STORE_NETWORK',
    brand: 'Jollibee Vietnam',
    sector: 'FNB_FASTFOOD',
    title: 'Hệ thống cửa hàng chính thức Jollibee tại Đà Nẵng (Vincom, Tiểu La, Lý Thái Tổ, Đống Đa)',
    tier: 'SIGNAL_ONLY',
    validity_type: 'STORE_NETWORK_EVIDENCE',
    freshness: {
      checked_at: '2026-08-25T12:45:00+07:00',
      recheck_due_at: '2026-09-25T12:45:00+07:00'
    },
    pieces: {
      danang_branch_vincom: {
        quote: 'Tầng 4 Vincom Đà Nẵng , 910A Ngô Quyền, Phường An Hải, Thành Phố Đà Nẵng',
        artifact_path: jollibeeBranch.path,
        artifact_sha256: jollibeeBranch.hash
      },
      danang_branch_tieu_la: {
        quote: '32 Tiểu La, Phường Hòa Cường,Thành phố Đà Nẵng',
        artifact_path: jollibeeBranch.path,
        artifact_sha256: jollibeeBranch.hash
      }
    }
  });
}

console.log(`\n🎉 Đã xây dựng thành công ${bundles.length} Evidence Bundles 088C!`);
const tierSummary = {};
bundles.forEach(b => tierSummary[b.tier] = (tierSummary[b.tier] || 0) + 1);
console.log('Phân bố theo Tier Chuẩn 088C:');
console.log(tierSummary);

const manifest = {
  manifest_id: 'EVIDENCE_BUNDLES_MANIFEST_088C',
  built_at: new Date().toISOString(),
  total_bundles: bundles.length,
  tier_summary: tierSummary,
  bundles: bundles
};

const outPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088c', 'evidence_bundles_088c.json');
fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2), 'utf8');
console.log(`💾 Đã lưu Evidence Bundles 088C tại: ${outPath}`);
