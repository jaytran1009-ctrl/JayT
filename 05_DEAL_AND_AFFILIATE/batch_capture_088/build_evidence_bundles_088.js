const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..', '..');
const dir088 = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088', 'captures_088');
const manifest088Path = path.join(dir088, 'batch_manifest_088.json');
const manifest088 = JSON.parse(fs.readFileSync(manifest088Path, 'utf8'));

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

console.log(`📊 [BUNDLE-BUILDER-088] Đang xây dựng Evidence Bundles định kỳ & có hạn từ ${manifest088.results.length} captures 088...`);

// Helper to read text and hash
function getArtifactTextAndHash(targetId) {
  const txtPath = path.join(dir088, targetId, 'page.txt');
  if (!fs.existsSync(txtPath)) return null;
  const buf = fs.readFileSync(txtPath);
  return {
    path: path.relative(repoRoot, txtPath).replace(/\\/g, '/'),
    hash: sha256(buf),
    text: buf.toString('utf8')
  };
}

const bundles = [];

// BUNDLE 1: Metiz Cinema - Khuyến Mãi Giá Vé U22 Định Kỳ (Thứ 3 - Thứ 5)
const metizU22 = getArtifactTextAndHash('TARGET_088_151');
if (metizU22) {
  bundles.push({
    bundle_id: 'BUNDLE_088_METIZ_U22_RECURRING',
    brand: 'Metiz Cinema',
    sector: 'CINEMA',
    title: 'Giá vé 2D 55.000đ dành cho thành viên U22 (Thứ Ba đến Thứ Năm)',
    tier: 'RECURRING_POLICY_CANDIDATE',
    validity_type: 'RECURRING_POLICY',
    freshness: {
      checked_at: '2026-08-25T12:45:00+07:00',
      recheck_due_at: '2026-09-25T12:45:00+07:00'
    },
    pieces: {
      price_and_terms: {
        quote: 'Áp dụng giá vé 2D chỉ 55.000đ cho thành viên Metiz Cinema từ 22 tuổi trở xuống, đối với mọi suất chiếu tại Metiz Cinema.',
        artifact_path: metizU22.path,
        artifact_sha256: metizU22.hash
      },
      recurrence_rule: {
        quote: 'chương trình được ưu đãi tất cả các ngày trong tuần từ thứ Ba đến thứ Năm.',
        artifact_path: metizU22.path,
        artifact_sha256: metizU22.hash
      },
      redemption_channel: {
        quote: 'Áp dụng cho hình thức mua vé trực tiếp tại quầy.',
        artifact_path: metizU22.path,
        artifact_sha256: metizU22.hash
      },
      conditions: {
        quote: 'Chương trình chỉ áp dụng cho thành viên Metiz Cinema, dưới 22 tuổi trở xuống. Vui lòng xuất trình thẻ thành viên & căn cước công dân trước khi mua vé để được giá ưu đãi & tích lũy điểm thưởng.',
        artifact_path: metizU22.path,
        artifact_sha256: metizU22.hash
      },
      locality_danang: {
        quote: 'Hotline: 0236 3630 689',
        artifact_path: metizU22.path,
        artifact_sha256: metizU22.hash
      }
    }
  });
}

// BUNDLE 2: CGV Cinemas - Deal Giảm 30K Lương Về (Có Hạn 25/08 - 31/08/2026)
const cgvPayday = getArtifactTextAndHash('TARGET_088_175');
if (cgvPayday) {
  bundles.push({
    bundle_id: 'BUNDLE_088_CGV_PAYDAY_30K_TIME_BOUNDED',
    brand: 'CGV Cinemas',
    sector: 'CINEMA',
    title: 'Deal Ting Ting Lương Về: Giảm ngay 30.000đ khi mua từ 2 vé (Mã PAYDAY)',
    tier: 'TIME_BOUNDED_CANDIDATE',
    validity_type: 'SPECIFIC_EXPIRATION',
    valid_from: '2026-08-25',
    valid_to: '2026-08-31',
    pieces: {
      price_and_discount: {
        quote: 'Giảm ngay 30.000Đ khi mua từ 02 vé trở lên',
        artifact_path: cgvPayday.path,
        artifact_sha256: cgvPayday.hash
      },
      time_bounded_validity: {
        quote: 'Từ 25/08 – 31/08/2026, thành viên CGV đặt vé trên Website/App CGV',
        artifact_path: cgvPayday.path,
        artifact_sha256: cgvPayday.hash
      },
      redemption_channel: {
        quote: 'Mua vé trực tuyến qua Web/App CGV',
        artifact_path: cgvPayday.path,
        artifact_sha256: cgvPayday.hash
      },
      promo_code: {
        quote: 'Nhập hoặc chọn mã “PAYDAY”, Áp dụng để được giảm ngay 30.000Đ.',
        artifact_path: cgvPayday.path,
        artifact_sha256: cgvPayday.hash
      },
      conditions: {
        quote: 'Chỉ áp dụng cho giao dịch từ 02 vé xem phim trở lên tại web/app CGV',
        artifact_path: cgvPayday.path,
        artifact_sha256: cgvPayday.hash
      },
      locality_danang: {
        quote: 'Áp dụng tất cả các rạp, định dạng, phòng chiếu.',
        artifact_path: cgvPayday.path,
        artifact_sha256: cgvPayday.hash
      }
    }
  });
}

// BUNDLE 3: CGV Membership - Chính Sách Điểm Thưởng & Ưu Đãi Thành Viên Định Kỳ
const cgvMember = getArtifactTextAndHash('TARGET_088_104');
if (cgvMember) {
  bundles.push({
    bundle_id: 'BUNDLE_088_CGV_MEMBERSHIP_RECURRING',
    brand: 'CGV Cinemas',
    sector: 'CINEMA',
    title: 'Chương trình Hội viên CGV Membership: Tích lũy điểm và quà tặng sinh nhật',
    tier: 'RECURRING_POLICY_CANDIDATE',
    validity_type: 'RECURRING_POLICY',
    freshness: {
      checked_at: '2026-08-25T12:45:00+07:00',
      recheck_due_at: '2026-09-25T12:45:00+07:00'
    },
    pieces: {
      policy_summary: {
        quote: 'CHƯƠNG TRÌNH ĐIỂM THƯỞNG',
        artifact_path: cgvMember.path,
        artifact_sha256: cgvMember.hash
      },
      member_tiers: {
        quote: 'Chương trình bao gồm 5 đối tượng thành viên FanC | Thân thiết | Elite | CGV VIP và CGV VVIP với những quyền lợi và mức ưu đãi khác nhau.',
        artifact_path: cgvMember.path,
        artifact_sha256: cgvMember.hash
      },
      points_rule: {
        quote: '1 điểm = 1.000 VND, có giá trị như tiền mặt, được dùng để mua vé xem phim, thức uống/ combo tương ứng tại CGV và đổi voucher ưu đãi trên CGV Reward.',
        artifact_path: cgvMember.path,
        artifact_sha256: cgvMember.hash
      },
      redemption_channel: {
        quote: 'ĐĂNG NHẬP/ ĐĂNG KÝ',
        artifact_path: cgvMember.path,
        artifact_sha256: cgvMember.hash
      },
      locality_danang: {
        quote: 'RẠP CGV',
        artifact_path: cgvMember.path,
        artifact_sha256: cgvMember.hash
      }
    }
  });
}

// BUNDLE 4: Metiz Cinema - Chính Sách Ưu Đãi Thành Viên M-Gold & M-Diamond 2026
const metizMember = getArtifactTextAndHash('TARGET_088_150');
if (metizMember) {
  bundles.push({
    bundle_id: 'BUNDLE_088_METIZ_MEMBER_2026_POLICY',
    brand: 'Metiz Cinema',
    sector: 'CINEMA',
    title: 'Chính sách ưu đãi thành viên Metiz Cinema 2026 (Vé miễn phí & quà tặng sinh nhật)',
    tier: 'RECURRING_POLICY_CANDIDATE',
    validity_type: 'RECURRING_POLICY',
    freshness: {
      checked_at: '2026-08-25T12:45:00+07:00',
      recheck_due_at: '2026-12-31T23:59:59+07:00'
    },
    pieces: {
      policy_summary: {
        quote: 'QUÀ MỪNG LÊN HẠNG - ƯU ĐÃI THÀNH VIÊN METIZ 2026',
        artifact_path: metizMember.path,
        artifact_sha256: metizMember.hash
      },
      discount_rule: {
        quote: 'Tích lũy điểm 7% giá trị giao dịch tại quầy vé & quầy bắp nước.',
        artifact_path: metizMember.path,
        artifact_sha256: metizMember.hash
      },
      birthday_benefit: {
        quote: 'Tặng 01 vé xem phim (Allday - Hạn sử dụng 1 tháng) vào tháng sinh nhật.',
        artifact_path: metizMember.path,
        artifact_sha256: metizMember.hash
      },
      redemption_channel: {
        quote: 'Được mua vé tại quầy dành cho khách hàng VIP (Quầy Guest Services).',
        artifact_path: metizMember.path,
        artifact_sha256: metizMember.hash
      },
      locality_danang: {
        quote: 'Khách hàng nhận Quà mừng lên hạng tại rạp Metiz Cinema.',
        artifact_path: metizMember.path,
        artifact_sha256: metizMember.hash
      }
    }
  });
}

// BUNDLE 5: Gong Cha Vietnam - Chính Sách Tích Điểm Thành Viên Định Kỳ
const gongChaMember = getArtifactTextAndHash('TARGET_088_113');
const gongChaStores = getArtifactTextAndHash('TARGET_088_178');
if (gongChaMember && gongChaStores) {
  bundles.push({
    bundle_id: 'BUNDLE_088_GONGCHA_MEMBERSHIP_RECURRING',
    brand: 'Gong Cha Vietnam',
    sector: 'COFFEE_TEA',
    title: 'Chính sách tích điểm thành viên ứng dụng Gong Cha VN (Quy đổi ưu đãi)',
    tier: 'RECURRING_POLICY_CANDIDATE',
    validity_type: 'RECURRING_POLICY',
    freshness: {
      checked_at: '2026-08-25T12:45:00+07:00',
      recheck_due_at: '2026-09-25T12:45:00+07:00'
    },
    pieces: {
      policy_summary: {
        quote: 'CHÍNH SÁCH THÀNH VIÊN ỨNG DỤNG GONG CHA VN',
        artifact_path: gongChaMember.path,
        artifact_sha256: gongChaMember.hash
      },
      points_rule: {
        quote: 'Chương trình tích điểm thành viên Gong Cha VN cho phép bạn tích điểm và chủ động đổi điểm để lấy những ưu đãi, phần quà hấp dẫn từ Gong Cha. Với mỗi hóa đơn chi tiêu tại cửa hàng, bạn sẽ được tích điểm tương đương với số tiền mà bạn đã thanh toán.',
        artifact_path: gongChaMember.path,
        artifact_sha256: gongChaMember.hash
      },
      redemption_channel: {
        quote: 'ỨNG DỤNG GONG CHA VN',
        artifact_path: gongChaMember.path,
        artifact_sha256: gongChaMember.hash
      },
      locality_danang: {
        quote: 'Đà Nẵng',
        artifact_path: gongChaStores.path,
        artifact_sha256: gongChaStores.hash
      }
    }
  });
}

// BUNDLE 6: Phê La - Mạng Lưới Cửa Hàng Trực Tiếp Đà Nẵng
const pheLaStores = getArtifactTextAndHash('TARGET_088_112');
if (pheLaStores) {
  bundles.push({
    bundle_id: 'BUNDLE_088_PHELA_STORE_NETWORK',
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
      locality_bach_dang: {
        quote: 'Số 36 - 38 đường Bạch Đằng, Phường Hải Châu, TP Đà Nẵng',
        artifact_path: pheLaStores.path,
        artifact_sha256: pheLaStores.hash
      },
      locality_nguyen_van_linh: {
        quote: 'Số 35 - 41 Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng',
        artifact_path: pheLaStores.path,
        artifact_sha256: pheLaStores.hash
      },
      hotline: {
        quote: 'Số điện thoại: 1900 3013',
        artifact_path: pheLaStores.path,
        artifact_sha256: pheLaStores.hash
      }
    }
  });
}

console.log(`\n🎉 Đã xây dựng thành công ${bundles.length} Linked Evidence Bundles!`);
const tierCounts = {};
bundles.forEach(b => tierCounts[b.tier] = (tierCounts[b.tier] || 0) + 1);
console.log('Phân bố theo Tier:');
console.log(tierCounts);

const bundleManifest = {
  manifest_id: 'EVIDENCE_BUNDLES_MANIFEST_088',
  built_at: new Date().toISOString(),
  total_bundles: bundles.length,
  tier_summary: tierCounts,
  bundles: bundles
};

const outManifestPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'batch_capture_088', 'evidence_bundles_088.json');
fs.writeFileSync(outManifestPath, JSON.stringify(bundleManifest, null, 2), 'utf8');
console.log(`💾 Evidence Bundles 088 saved to: ${outManifestPath}`);
