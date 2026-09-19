const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function sha256(strOrBuf) {
  return crypto.createHash('sha256').update(strOrBuf).digest('hex');
}

const repoRoot = path.resolve(__dirname, '..');

function detectDistrict(addressStr) {
  const s = addressStr.toLowerCase();
  if (s.includes('hải châu')) return 'Hải Châu';
  if (s.includes('thanh khê')) return 'Thanh Khê';
  if (s.includes('sơn trà')) return 'Sơn Trà';
  if (s.includes('ngũ hành sơn')) return 'Ngũ Hành Sơn';
  if (s.includes('liên chiểu') || s.includes('hòa khánh') || s.includes('nguyễn sinh sắc') || s.includes('phạm như xương') || s.includes('ngô văn sở')) return 'Liên Chiểu';
  if (s.includes('bạch đằng') || s.includes('nguyễn văn linh') || s.includes('tiểu la') || s.includes('phan đăng lưu') || s.includes('đống đa')) return 'Hải Châu';
  if (s.includes('điện biên phủ') || s.includes('hùng vương') || s.includes('nguyễn đức trung') || s.includes('lý thái tổ')) return 'Thanh Khê';
  if (s.includes('ngô quyền')) return 'Sơn Trà';
  return 'Đà Nẵng';
}

function canonicalizeAllCaptures() {
  console.log('🔄 [CANONICALIZER-103] Bắt đầu Canonicalize và Hợp nhất Chi Nhánh Độc Nhất...');

  const sourcesToCheck = [
    { targetId: 'TARGET_101_METIZ_OFFICIAL', dir: '05_DEAL_AND_AFFILIATE/batch_capture_101/captures_101/TARGET_101_METIZ_OFFICIAL', brand: 'Metiz Cinema' },
    { targetId: 'TARGET_101_GALAXY_DANANG_OFFICIAL', dir: '05_DEAL_AND_AFFILIATE/batch_capture_101/captures_101/TARGET_101_GALAXY_DANANG_OFFICIAL', brand: 'Galaxy Cinema' },
    { targetId: 'TARGET_101_PHELA_OFFICIAL', dir: '05_DEAL_AND_AFFILIATE/batch_capture_101/captures_101/TARGET_101_PHELA_OFFICIAL', brand: 'Phê La' },
    { targetId: 'TARGET_101_GONGCHA_OFFICIAL', dir: '05_DEAL_AND_AFFILIATE/batch_capture_101/captures_101/TARGET_101_GONGCHA_OFFICIAL', brand: 'Gong Cha' },
    { targetId: 'TARGET_101_JOLLIBEE_OFFICIAL', dir: '05_DEAL_AND_AFFILIATE/batch_capture_101/captures_101/TARGET_101_JOLLIBEE_OFFICIAL', brand: 'Jollibee' },

    { targetId: 'TARGET_102_CGV_VINH_TRUNG', dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_CGV_VINH_TRUNG', brand: 'CGV Cinema' },
    { targetId: 'TARGET_102_GALAXY_DANANG', dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_GALAXY_DANANG', brand: 'Galaxy Cinema' },
    { targetId: 'TARGET_102_METIZ_POLICY', dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_METIZ_POLICY', brand: 'Metiz Cinema' },
    { targetId: 'TARGET_102_METIZ_HOME', dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_METIZ_HOME', brand: 'Metiz Cinema' },
    { targetId: 'TARGET_102_LOTTE_CINEMA_DNG', dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_LOTTE_CINEMA_DNG', brand: 'Lotte Cinema' },
    { targetId: 'TARGET_102_PHELA_HOME', dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_PHELA_HOME', brand: 'Phê La' },
    { targetId: 'TARGET_102_GONGCHA_HOME', dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_GONGCHA_HOME', brand: 'Gong Cha' },
    { targetId: 'TARGET_102_GONGCHA_STORES', dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_GONGCHA_STORES', brand: 'Gong Cha' },
    { targetId: 'TARGET_102_THECOFFEEHOUSE_STORES', dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_THECOFFEEHOUSE_STORES', brand: 'The Coffee House' },
    { targetId: 'TARGET_102_KATINAT_HOME', dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_KATINAT_HOME', brand: 'Katinat Saigon Kafe' },
    { targetId: 'TARGET_102_JOLLIBEE_HOME', dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_JOLLIBEE_HOME', brand: 'Jollibee' },
    { targetId: 'TARGET_102_JOLLIBEE_STORES', dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_JOLLIBEE_STORES', brand: 'Jollibee' },
    { targetId: 'TARGET_102_DOMINOS_HOME', dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_DOMINOS_HOME', brand: 'Domino\'s Pizza' },
    { targetId: 'TARGET_102_DOMINOS_STORES', dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_DOMINOS_STORES', brand: 'Domino\'s Pizza' },
    { targetId: 'TARGET_102_LOTTERIA_STORES', dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_LOTTERIA_STORES', brand: 'Lotteria' },
    { targetId: 'TARGET_102_COOPMART_DANANG', dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_COOPMART_DANANG', brand: 'Co.opmart' }
  ];

  // Distinct Da Nang Branch definitions with strict address keys
  const physicalBranches = [
    {
      id: 'COBALT_BRANCH_GALAXY_COOPMART_THANH_KHE',
      brand: 'Galaxy Cinema',
      branch_name: 'Galaxy Cinema — Co.opmart Thanh Khê',
      district: 'Thanh Khê',
      address: 'Tầng 3, TTTM Co.opmart Đà Nẵng - 478 Điện Biên Phủ, Phường Thanh Khê, TP. Đà Nẵng',
      target_id: 'TARGET_101_GALAXY_DANANG_OFFICIAL',
      target_dir: '05_DEAL_AND_AFFILIATE/batch_capture_101/captures_101/TARGET_101_GALAXY_DANANG_OFFICIAL',
      search_phrase: '478 Điện Biên Phủ'
    },
    {
      id: 'COBALT_BRANCH_PHELA_BACH_DANG_HAI_CHAU',
      brand: 'Phê La',
      branch_name: 'Phê La — Bạch Đằng',
      district: 'Hải Châu',
      address: 'Số 36 - 38 đường Bạch Đằng, Phường Hải Châu, TP Đà Nẵng',
      target_id: 'TARGET_101_PHELA_OFFICIAL',
      target_dir: '05_DEAL_AND_AFFILIATE/batch_capture_101/captures_101/TARGET_101_PHELA_OFFICIAL',
      search_phrase: 'Số 36 - 38 đường Bạch Đằng'
    },
    {
      id: 'COBALT_BRANCH_PHELA_NGUYEN_VAN_LINH_HAI_CHAU',
      brand: 'Phê La',
      branch_name: 'Phê La — Nguyễn Văn Linh',
      district: 'Hải Châu',
      address: 'Số 35 - 41 Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng',
      target_id: 'TARGET_101_PHELA_OFFICIAL',
      target_dir: '05_DEAL_AND_AFFILIATE/batch_capture_101/captures_101/TARGET_101_PHELA_OFFICIAL',
      search_phrase: 'Số 35 - 41 Nguyễn Văn Linh'
    },
    {
      id: 'COBALT_BRANCH_CGV_VINH_TRUNG_THANH_KHE',
      brand: 'CGV Cinema',
      branch_name: 'CGV Cinema — Vĩnh Trung Plaza',
      district: 'Thanh Khê',
      address: '255-257 đường Hùng Vương Quận Thanh Khê Tp. Đà Nẵng',
      target_id: 'TARGET_102_CGV_VINH_TRUNG',
      target_dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_CGV_VINH_TRUNG',
      search_phrase: '255-257 đường Hùng Vương'
    },
    {
      id: 'COBALT_BRANCH_GONGCHA_NGUYEN_VAN_LINH_HAI_CHAU',
      brand: 'Gong Cha',
      branch_name: 'Gong Cha — Nguyễn Văn Linh',
      district: 'Hải Châu',
      address: '01 Nguyễn Văn Linh, Phường Bình Hiên, Quận Hải Châu, Đà Nẵng.',
      target_id: 'TARGET_102_GONGCHA_STORES',
      target_dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_GONGCHA_STORES',
      search_phrase: '01 Nguyễn Văn Linh, Phường Bình Hiên'
    },
    {
      id: 'COBALT_BRANCH_JOLLIBEE_VINCOM_SON_TRA',
      brand: 'Jollibee',
      branch_name: 'Jollibee — Vincom Ngô Quyền',
      district: 'Sơn Trà',
      address: 'Tầng 4 Vincom Đà Nẵng, 910A Ngô Quyền, Phường An Hải Bắc, Quận Sơn Trà, Thành Phố Đà Nẵng',
      target_id: 'TARGET_102_JOLLIBEE_STORES',
      target_dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_JOLLIBEE_STORES',
      search_phrase: '910A Ngô Quyền'
    },
    {
      id: 'COBALT_BRANCH_JOLLIBEE_TIEU_LA_HAI_CHAU',
      brand: 'Jollibee',
      branch_name: 'Jollibee — Tiểu La',
      district: 'Hải Châu',
      address: '32 Tiểu La, Phường Hòa Cường Bắc, Quận Hải Châu, Thành Phố Đà Nẵng',
      target_id: 'TARGET_102_JOLLIBEE_STORES',
      target_dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_JOLLIBEE_STORES',
      search_phrase: '32 Tiểu La'
    },
    {
      id: 'COBALT_BRANCH_JOLLIBEE_NGUYEN_DUC_TRUNG_THANH_KHE',
      brand: 'Jollibee',
      branch_name: 'Jollibee — Nguyễn Đức Trung',
      district: 'Thanh Khê',
      address: '47 Nguyễn Đức Trung, Hòa Khê, Thanh Khê, Đà Nẵng, Việt Nam',
      target_id: 'TARGET_102_JOLLIBEE_STORES',
      target_dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_JOLLIBEE_STORES',
      search_phrase: '47 Nguyễn Đức Trung'
    },
    {
      id: 'COBALT_BRANCH_JOLLIBEE_PHAN_DANG_LUU_HAI_CHAU',
      brand: 'Jollibee',
      branch_name: 'Jollibee — Phan Đăng Lưu',
      district: 'Hải Châu',
      address: '126 Phan Đăng Lưu, Phường Hòa Cường Bắc, Quận Hải Châu, Thành Phố Đà nẵng',
      target_id: 'TARGET_102_JOLLIBEE_STORES',
      target_dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_JOLLIBEE_STORES',
      search_phrase: '126 Phan Đăng Lưu'
    },
    {
      id: 'COBALT_BRANCH_JOLLIBEE_PHAM_NHU_XUONG_LIEN_CHIEU',
      brand: 'Jollibee',
      branch_name: 'Jollibee — Phạm Như Xương',
      district: 'Liên Chiểu',
      address: '10 Phạm Như Xương , Phường Hòa Khánh Nam , Quận Liên Chiểu, Thành phố Đà Nẵng',
      target_id: 'TARGET_102_JOLLIBEE_STORES',
      target_dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_JOLLIBEE_STORES',
      search_phrase: '10 Phạm Như Xương'
    },
    {
      id: 'COBALT_BRANCH_JOLLIBEE_LY_THAI_TO_THANH_KHE',
      brand: 'Jollibee',
      branch_name: 'Jollibee — Lý Thái Tổ',
      district: 'Thanh Khê',
      address: '99 Lý Thái Tổ, Phường Thạc Gián, Quận Thanh Khê, Thành Phố Đà Nẵng',
      target_id: 'TARGET_102_JOLLIBEE_STORES',
      target_dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_JOLLIBEE_STORES',
      search_phrase: '99 Lý Thái Tổ'
    },
    {
      id: 'COBALT_BRANCH_JOLLIBEE_DONG_DA_HAI_CHAU',
      brand: 'Jollibee',
      branch_name: 'Jollibee — Đống Đa',
      district: 'Hải Châu',
      address: '254 Đống Đa , P, Thuận Phước , Q. Hải Châu , Tp. Đà Nẵng',
      target_id: 'TARGET_102_JOLLIBEE_STORES',
      target_dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_JOLLIBEE_STORES',
      search_phrase: '254 Đống Đa'
    },
    {
      id: 'COBALT_BRANCH_JOLLIBEE_NGO_VAN_SO_LIEN_CHIEU',
      brand: 'Jollibee',
      branch_name: 'Jollibee — Ngô Văn Sở',
      district: 'Liên Chiểu',
      address: '02 Ngô Văn Sở, Phường Hòa Khánh Bắc, Quận Liên Chiểu, Thành phố Đà Nẵng',
      target_id: 'TARGET_102_JOLLIBEE_STORES',
      target_dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_JOLLIBEE_STORES',
      search_phrase: '02 Ngô Văn Sở'
    },
    {
      id: 'COBALT_BRANCH_JOLLIBEE_MEGA_MARKET_HOA_KHANH',
      brand: 'Jollibee',
      branch_name: 'Jollibee — MM Mega Market Nguyễn Sinh Sắc',
      district: 'Liên Chiểu',
      address: 'Lô L1-01, Tầng 1, TTTM MM Mega Market Đà Nẵng, Đường Nguyễn Sinh Sắc, Phường Hòa Khánh, Thành phố Đà Nẵng',
      target_id: 'TARGET_102_JOLLIBEE_STORES',
      target_dir: '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102/TARGET_102_JOLLIBEE_STORES',
      search_phrase: 'Nguyễn Sinh Sắc'
    }
  ];

  const canonicalCobaltBranches = [];

  for (const b of physicalBranches) {
    const fullDir = path.join(repoRoot, b.target_dir);
    const receipt = JSON.parse(fs.readFileSync(path.join(fullDir, 'capture_receipt.json'), 'utf8'));
    const textPath = path.join(fullDir, 'page.txt');
    const text = fs.readFileSync(textPath, 'utf8');
    const lines = text.split('\n');

    let matchedLineNumber = -1;
    let matchedRawLine = '';
    let matchedOffset = -1;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(b.search_phrase)) {
        matchedLineNumber = i + 1;
        matchedRawLine = lines[i];

        let offset = 0;
        for (let j = 0; j < i; j++) {
          offset += lines[j].length + 1;
        }
        matchedOffset = offset;
        break;
      }
    }

    if (matchedLineNumber === -1) {
      throw new Error(`PHRASE_NOT_FOUND: Search phrase '${b.search_phrase}' not found in ${b.target_id}/page.txt`);
    }

    // Byte-for-byte slice verification
    const sliceCheck = text.slice(matchedOffset, matchedOffset + matchedRawLine.length);
    if (sliceCheck !== matchedRawLine) {
      throw new Error(`SLICE_MISMATCH: Byte-for-byte slice does not match raw line for ${b.id}`);
    }

    canonicalCobaltBranches.push({
      id: b.id,
      brand: b.brand,
      venue_name: b.branch_name,
      address: b.address,
      district: b.district,
      source_url: receipt.source_url,
      evidence_pointer: {
        target_id: b.target_id,
        artifact_path: path.join(b.target_dir, 'page.txt').replace(/\\/g, '/'),
        line_number: matchedLineNumber,
        char_offset: matchedOffset,
        snippet_length: matchedRawLine.length,
        snippet: matchedRawLine,
        snippet_sha256: sha256(matchedRawLine),
        artifact_sha256: receipt.artifacts.page_txt.sha256
      },
      status: 'COBALT_VERIFIED_LOCATION',
      disclaimer: 'Địa điểm chính thức — ưu đãi online chưa đủ dữ kiện; kiểm tra trực tiếp tại quán.'
    });
  }

  // Identify Amber sources (authenticated sources without specific Da Nang address in captured DOM)
  const amberTargets = [
    'TARGET_101_METIZ_OFFICIAL',
    'TARGET_102_METIZ_POLICY',
    'TARGET_102_METIZ_HOME',
    'TARGET_102_LOTTE_CINEMA_DNG',
    'TARGET_102_THECOFFEEHOUSE_STORES',
    'TARGET_102_KATINAT_HOME',
    'TARGET_102_DOMINOS_HOME',
    'TARGET_102_DOMINOS_STORES',
    'TARGET_102_LOTTERIA_STORES',
    'TARGET_102_COOPMART_DANANG'
  ];

  const amberSources = [];
  for (const tid of amberTargets) {
    const candidateDirs = [
      path.join(repoRoot, '05_DEAL_AND_AFFILIATE/batch_capture_101/captures_101', tid),
      path.join(repoRoot, '05_DEAL_AND_AFFILIATE/batch_capture_102/captures_102', tid)
    ];
    for (const d of candidateDirs) {
      if (fs.existsSync(path.join(d, 'capture_receipt.json'))) {
        const rc = JSON.parse(fs.readFileSync(path.join(d, 'capture_receipt.json'), 'utf8'));
        amberSources.push({
          target_id: tid,
          venue_name: rc.venue_name,
          source_url: rc.source_url,
          status: 'OFFICIAL_SOURCE_NO_LOCALITY',
          disclaimer: 'Địa điểm chính thức — ưu đãi online chưa đủ dữ kiện; kiểm tra trực tiếp tại quán.'
        });
        break;
      }
    }
  }

  const manifest = {
    manifest_id: 'CANONICAL_COBALT_MANIFEST_103',
    generated_at: new Date().toISOString(),
    total_unique_cobalt_branches: canonicalCobaltBranches.length,
    total_amber_sources: amberSources.length,
    proven_deals_count: 0,
    cobalt_branches: canonicalCobaltBranches,
    amber_sources: amberSources
  };

  const outPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'canonical_cobalt_branches_103.json');
  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2), 'utf8');

  console.log('======================================================');
  console.log(`💎 Số chi nhánh Cobalt độc nhất sau Canonicalization: ${canonicalCobaltBranches.length}`);
  console.log(`🔶 Số nguồn Amber chính thức: ${amberSources.length}`);
  console.log(`🏷️ Số ưu đãi / Deal: 0 (Bảo vệ Honest Empty State)`);
  console.log(`📄 Manifest: ${outPath}\n`);

  canonicalCobaltBranches.forEach((b, idx) => {
    console.log(`  [${idx + 1}] ${b.venue_name} (${b.district}) -> L${b.evidence_pointer.line_number}, Offset ${b.evidence_pointer.char_offset}`);
  });

  return manifest;
}

if (require.main === module) {
  canonicalizeAllCaptures();
}

module.exports = { canonicalizeAllCaptures };
