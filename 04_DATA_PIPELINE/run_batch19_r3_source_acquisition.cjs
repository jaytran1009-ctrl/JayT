/**
 * BATCH 19 - WORK ORDER J358-R3: OFFER-SPECIFIC SOURCE ACQUISITION & PROVENANCE REPLAY
 * Authority: Quyết định cổng CEO JAYT-358-R2 & Dispatch J358-R3
 * 
 * Rules & Policy:
 * 1. Acquire offer-specific official first-party pages into batch_19_r3_offer_specific_vault.
 * 2. Reject legal footers, generic store locators, homepage catalogs, current calendar year, or image filenames as Da Nang/validity proof.
 * 3. Enforce J358-R2 fail-closed validation: all 5 dimensions (title, price/benefit, conditions, validity/recurrence, locality) must be proven by verbatim UTF-8 raw byte spans.
 * 4. Zero VERIFIED is an acceptable truthful outcome.
 * 5. Do not rewrite R1/R2 artifacts; emit R3 deliverables with SHA-256 sidecars.
 * 6. Zero staging hydration, zero production mutation.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = 'D:/Công Việc MMO/OPC JayT/JayT-Dự Án Giá Trị Cộng Đồng';
const VAULT_DIR = path.join(ROOT, '06_TRUST_AND_EVIDENCE', 'batch_19_r3_offer_specific_vault');
const MATRIX_PATH = path.join(VAULT_DIR, 'CLAIM_PROVENANCE_MATRIX_R3.json');

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function normalizeHtmlEntities(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x111;/g, 'đ')
    .replace(/&#x110;/g, 'Đ')
    .replace(/&aacute;/g, 'á')
    .replace(/&Aacute;/g, 'Á')
    .replace(/&agrave;/g, 'à')
    .replace(/&Agrave;/g, 'À')
    .replace(/&atilde;/g, 'ã')
    .replace(/&Atilde;/g, 'Ã')
    .replace(/&eacute;/g, 'é')
    .replace(/&Eacute;/g, 'É')
    .replace(/&ecirc;/g, 'ê')
    .replace(/&Ecirc;/g, 'Ê')
    .replace(/&iacute;/g, 'í')
    .replace(/&Iacute;/g, 'Í')
    .replace(/&igrave;/g, 'ì')
    .replace(/&Igrave;/g, 'Ì')
    .replace(/&oacute;/g, 'ó')
    .replace(/&Oacute;/g, 'Ó')
    .replace(/&ocirc;/g, 'ô')
    .replace(/&Ocirc;/g, 'Ô')
    .replace(/&uacute;/g, 'ú')
    .replace(/&Uacute;/g, 'Ú')
    .replace(/&yacute;/g, 'ý')
    .replace(/&Yacute;/g, 'Ý')
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&#x1EBF;/g, 'ế')
    .replace(/&#xE0;/g, 'à')
    .replace(/&#xE1;/g, 'á')
    .replace(/&#xE3;/g, 'ã')
    .replace(/&#x1EAF;/g, 'ắ')
    .replace(/&#x1EB7;/g, 'ặ')
    .replace(/&#x1ED1;/g, 'ố')
    .replace(/&#x1B0;/g, 'ư')
    .replace(/&#xF4;/g, 'ô')
    .replace(/&#x1EB7;/g, 'ặ')
    .replace(/&#x1EB9;/g, 'ẹ')
    .replace(/&#x1ED9;/g, 'ộ')
    .replace(/&#x1EF1;/g, 'ự')
    .replace(/&#x301;/g, '́');
}

function findRawByteSpan(rawBuf, rawSubstr) {
  if (!rawSubstr) return null;
  const str = rawBuf.toString('utf8');
  const charIdx = str.indexOf(rawSubstr);
  if (charIdx === -1) return null;

  const startByte = Buffer.byteLength(str.substring(0, charIdx), 'utf8');
  const spanLengthBytes = Buffer.byteLength(rawSubstr, 'utf8');
  const endByte = startByte + spanLengthBytes;

  let count = 0;
  let pos = 0;
  while ((pos = str.indexOf(rawSubstr, pos)) !== -1) {
    count++;
    pos += rawSubstr.length;
  }

  return {
    raw_substring: rawSubstr,
    normalized_text: normalizeHtmlEntities(rawSubstr),
    start_byte_offset: startByte,
    end_byte_offset: endByte,
    byte_length: spanLengthBytes,
    occurrence_count: count
  };
}

async function fetchOfferLeaf(url, leafId) {
  const cleanId = leafId.replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase();
  const rawPath = path.join(VAULT_DIR, `${cleanId}.leaf.raw.html`);
  const metaPath = path.join(VAULT_DIR, `${cleanId}.leaf.meta.json`);

  let body = '';
  let status = 0;
  let finalUrl = url;
  let headers = {};
  let capturedAtUtc = new Date().toISOString();
  let isFetchFailed = false;
  let isSoft404 = false;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      capturedAtUtc = new Date().toISOString();
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7'
        },
        redirect: 'follow',
        signal: AbortSignal.timeout(20000)
      });
      status = res.status;
      finalUrl = res.url || url;
      const allowed = ['content-type', 'date', 'server', 'etag', 'last-modified', 'content-length'];
      res.headers.forEach((v, k) => {
        if (allowed.includes(k.toLowerCase())) headers[k.toLowerCase()] = v;
      });
      body = await res.text();

      // Soft 404 detection
      if (finalUrl.includes('/404') || finalUrl.includes('aspxerrorpath') || finalUrl.includes('page-not-found')) {
        isSoft404 = true;
      }
      break;
    } catch (e) {
      if (attempt === 3) {
        status = 502;
        body = `<!-- FETCH_FAILED: ${url} - ${e.message} -->`;
        isFetchFailed = true;
      } else {
        await new Promise(r => setTimeout(r, 1500));
      }
    }
  }

  const buf = Buffer.from(body, 'utf8');
  fs.writeFileSync(rawPath, buf);
  const hash = sha256(buf);

  const meta = {
    leaf_id: cleanId,
    requested_url: url,
    final_url: finalUrl,
    http_status: status,
    is_fetch_failed: isFetchFailed,
    is_soft_404: isSoft404,
    captured_at_utc: capturedAtUtc,
    bytes: buf.length,
    sha256: hash,
    sanitized_headers: headers
  };
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), 'utf8');

  return { buf, meta, rawPath, metaPath };
}

const CANDIDATE_DEFINITIONS_R3 = [
  {
    b19_id: 'B19_STARLIGHT_U22_WEEKDAY',
    brand: 'Starlight Cinema',
    source_url: 'https://starlight.vn/uu-dai/ct-u22-rap-starlight-1047.html',
    leaf_id: 'r3_starlight_u22_program',
    claims: {
      title: 'CT U22 RẠP STARLIGHT',
      price: 'Đồng gi&aacute; v&eacute; 45k/v&eacute; khi mua tại quầy từ thứ 2 đến thứ 5!',
      conditions: 'Độ tuổi dưới 22',
      validity_or_recurrence: 'từ thứ 2 đến thứ 5!',
      da_nang_locality: null // Footer company registration rejected per Req 18
    },
    locality_nature: 'FOOTER_COMPANY_REGISTRATION',
    calendar_validity_specified: false
  },
  {
    b19_id: 'B19_STARLIGHT_U22_WEEKEND',
    brand: 'Starlight Cinema',
    source_url: 'https://starlight.vn/uu-dai/ct-u22-rap-starlight-1047.html',
    leaf_id: 'r3_starlight_u22_program',
    claims: {
      title: 'CT U22 RẠP STARLIGHT',
      price: '&Aacute;p dụng tại c&aacute;c rạp Quy Nhơn, Đ&agrave; Nẵng d&agrave;nh cho kh&aacute;ch h&agrave;ng U22 l&agrave; 55k/v&eacute;',
      conditions: 'Độ tuổi dưới 22',
      validity_or_recurrence: null, // "Thứ 6 - Chủ Nhật năm 2026" claim unproven (source published 11/03/2025, no 2026 expiry span)
      da_nang_locality: 'Đ&agrave; Nẵng'
    },
    locality_nature: 'EXPLICIT_BODY_OFFER_CLAUSE',
    calendar_validity_specified: false
  },
  {
    b19_id: 'B19_STARLIGHT_THU_3_PHIM_VIET',
    brand: 'Starlight Cinema',
    source_url: 'https://starlight.vn/uu-dai/thu-3-phim-viet-1046.html',
    leaf_id: 'r3_starlight_thu_3_phim_viet',
    claims: {
      title: 'THỨ 3 PHIM VIỆT',
      price: '-&Aacute;p dụng gi&aacute; : 45 k cho tất cả c&aacute;c phim Việt v&agrave;o ng&agrave;y thứ 3 h&agrave;ng tuần.',
      conditions: 'mua v&eacute; c&aacute;c phim Việt Nam',
      validity_or_recurrence: 'v&agrave;o ng&agrave;y thứ 3 h&agrave;ng tuần',
      da_nang_locality: null // Footer only, rejected per Req 18
    },
    locality_nature: 'FOOTER_COMPANY_REGISTRATION',
    calendar_validity_specified: false
  },
  {
    b19_id: 'B19_TPC_COMBO_VU_LAN_315K',
    brand: 'The Pizza Company',
    source_url: 'https://thepizzacompany.vn/combo-vu-lan-an-lanh-22662',
    leaf_id: 'r3_tpc_combo_vu_lan_22662',
    claims: {
      title: 'Combo Vu Lan An L&#xE0;nh',
      price: '315.000đ',
      conditions: '01 Pizza Rau Củ/ Phô Mai',
      validity_or_recurrence: null, // Undated promotional campaign
      da_nang_locality: null // Store dropdown list rejected per Req 18 & 25
    },
    locality_nature: 'STORE_LOCATOR_DROPDOWN_REJECTED',
    calendar_validity_specified: false
  },
  {
    b19_id: 'B19_TPC_COMBO_COT_MAM_KEO_479K',
    brand: 'The Pizza Company',
    source_url: 'https://thepizzacompany.vn/combo-cot-mam-keo',
    leaf_id: 'r3_tpc_combo_cot_mam_keo',
    claims: {
      title: 'Combo &quot;C&#x1ED1;t&quot; M&#x1EAF;m K&#x1EB9;o',
      price: '479.000đ',
      conditions: '1 Pizza Hải Sản Calamari Xốt Nước Mắm',
      validity_or_recurrence: null,
      da_nang_locality: null
    },
    locality_nature: 'STORE_LOCATOR_DROPDOWN_REJECTED',
    calendar_validity_specified: false
  },
  {
    b19_id: 'B19_TPC_COMBO_COT_MAI_MAN_599K',
    brand: 'The Pizza Company',
    source_url: 'https://thepizzacompany.vn/combo-cot-mai-man',
    leaf_id: 'r3_tpc_combo_cot_mai_man',
    claims: {
      title: 'Combo &quot;C&#x1ED1;t&quot; M&#xE3;i M&#x1EB7;n',
      price: '599.000đ',
      conditions: '1 Pizza Hải Sản Calamari Xốt Nước Mắm',
      validity_or_recurrence: null,
      da_nang_locality: null
    },
    locality_nature: 'STORE_LOCATOR_DROPDOWN_REJECTED',
    calendar_validity_specified: false
  },
  {
    b19_id: 'B19_TPC_BOGO_PEPSI_15L',
    brand: 'The Pizza Company',
    source_url: 'https://thepizzacompany.vn/mua-1-tang-1-nuoc',
    leaf_id: 'r3_tpc_mua_1_tang_1_nuoc',
    claims: {
      title: 'Mua 1 T&#x1EB7;ng 1 N&#x1B0;&#x1EDB;c',
      price: '50.000đ',
      conditions: 'Tặng 1 Chai Pepsi PET 1.5L',
      validity_or_recurrence: null,
      da_nang_locality: null
    },
    locality_nature: 'STORE_LOCATOR_DROPDOWN_REJECTED',
    calendar_validity_specified: false
  },
  {
    b19_id: 'B19_TPC_BO_DOI_NHU_Y_169K',
    brand: 'The Pizza Company',
    source_url: 'https://thepizzacompany.vn/bo-doi-nhu-y-combo-1-21386',
    leaf_id: 'r3_tpc_bo_doi_nhu_y_combo_1',
    claims: {
      title: 'B&#x1ED9; &#x110;&#xF4;i Nh&#x1B0; &quot;Y&#x301;&quot; Combo 1',
      price: '169.000đ',
      conditions: '01 Pizza Truyền Thống, Cỡ Nhỏ',
      validity_or_recurrence: null,
      da_nang_locality: null
    },
    locality_nature: 'STORE_LOCATOR_DROPDOWN_REJECTED',
    calendar_validity_specified: false
  },
  {
    b19_id: 'B19_GONGCHA_MEMBER_POLICY',
    brand: 'Gong Cha',
    source_url: 'https://gongcha.com.vn/chinh-sach-thanh-vien/',
    leaf_id: 'r3_gongcha_member_policy',
    claims: {
      title: 'CHÍNH SÁCH THÀNH VIÊN ỨNG DỤNG GONG CHA VN',
      price: '10,000 vnđ = 1 Lá trà',
      conditions: 'Nhận voucher miễn phí 1 thức uống size M trên menu vào ngày sinh nhật',
      validity_or_recurrence: null,
      da_nang_locality: null // 0 mentions of Da Nang
    },
    locality_nature: 'ABSENT_IN_SOURCE',
    calendar_validity_specified: false
  },
  {
    b19_id: 'B19_KATINAT_APP_LOYALTY',
    brand: 'Katinat Saigon Kafe',
    source_url: 'https://katinat.vn/katinat-chinh-thuc-ra-mat-ung-dung-kung-thanh-vien-khong-gioi-han/',
    leaf_id: 'r3_katinat_app_loyalty',
    claims: {
      title: 'KATINAT CHÍNH THỨC RA MẮT ỨNG DỤNG',
      price: 'Nhận Voucher ưu đãi 30k cho đơn tối thiểu 60k (từ 25/04 &#8211; 09/05)',
      conditions: 'ứng dụng thành viên &amp; đặt món dành riêng cho Katies',
      validity_or_recurrence: null, // Expired May 2024
      da_nang_locality: null // Store in HCMC, 0 Da Nang
    },
    locality_nature: 'ABSENT_IN_SOURCE',
    calendar_validity_specified: false,
    is_expired: true
  }
];

async function runR3SourceAcquisition() {
  console.log('======================================================================');
  console.log('=== WORK ORDER J358-R3: SOURCE ACQUISITION & PROVENANCE REPLAY ===');
  console.log('======================================================================\n');

  if (!fs.existsSync(VAULT_DIR)) {
    fs.mkdirSync(VAULT_DIR, { recursive: true });
  }

  // Group by unique leaf URLs to avoid duplicate fetches
  const uniqueUrls = new Map();
  for (const def of CANDIDATE_DEFINITIONS_R3) {
    if (!uniqueUrls.has(def.leaf_id)) {
      uniqueUrls.set(def.leaf_id, def.source_url);
    }
  }

  console.log(`Fetching ${uniqueUrls.size} unique offer-specific source pages into R3 vault...`);
  const leafBuffers = {};
  const leafMetas = {};

  for (const [leafId, url] of uniqueUrls.entries()) {
    console.log(`  -> Fetching ${leafId} from ${url}...`);
    const res = await fetchOfferLeaf(url, leafId);
    leafBuffers[leafId] = res.buf;
    leafMetas[leafId] = res.meta;
    console.log(`     Status: ${res.meta.http_status} | Bytes: ${res.meta.bytes} | SHA: ${res.meta.sha256.substring(0, 16)}...`);
  }

  console.log('\nReplaying 10 candidates through J358-R3 provenance gate...');

  const matrixR3 = {
    matrix_id: 'CLAIM_PROVENANCE_MATRIX_R3',
    work_order_id: 'J358-R3-OFFER-SPECIFIC-SOURCE-ACQUISITION',
    executed_at_utc: new Date().toISOString(),
    authority: 'Quyết định cổng CEO JAYT-358-R2 & Dispatch J358-R3',
    purpose: 'Acquire offer-specific official evidence for the 10 Batch 19 HELD candidates without weakening the R2 provenance gate.',
    vault_directory: VAULT_DIR,
    summary: {
      total_candidates_evaluated: CANDIDATE_DEFINITIONS_R3.length,
      provenance_verified_count: 0,
      provenance_held_count: 0,
      shortfall_policy_enforced: true,
      truthful_outcome_rule: 'Zero VERIFIED is an acceptable truthful outcome; no inferences permitted.'
    },
    items: []
  };

  for (const def of CANDIDATE_DEFINITIONS_R3) {
    console.log(`>>> Evaluating ${def.b19_id} (${def.brand})...`);

    const rawBuf = leafBuffers[def.leaf_id];
    const meta = leafMetas[def.leaf_id];

    const dims = {};
    let allProven = true;
    const missing = [];

    for (const [dimKey, targetSubstr] of Object.entries(def.claims)) {
      if (!targetSubstr) {
        dims[dimKey] = {
          raw_substring: null,
          normalized_text: null,
          start_byte_offset: null,
          end_byte_offset: null,
          is_proven: false,
          reason: 'Lacks verbatim UTF-8 raw span in offer-specific source leaf'
        };
        allProven = false;
        missing.push(dimKey);
      } else {
        const span = findRawByteSpan(rawBuf, targetSubstr);
        if (!span) {
          dims[dimKey] = {
            raw_substring: targetSubstr,
            normalized_text: null,
            start_byte_offset: null,
            end_byte_offset: null,
            is_proven: false,
            reason: 'Target substring could not be matched in raw source buffer'
          };
          allProven = false;
          missing.push(dimKey);
        } else {
          dims[dimKey] = {
            raw_substring: span.raw_substring,
            normalized_text: span.normalized_text,
            start_byte_offset: span.start_byte_offset,
            end_byte_offset: span.end_byte_offset,
            byte_length: span.byte_length,
            occurrence_count: span.occurrence_count,
            is_proven: true
          };
        }
      }
    }

    let finalStatus = 'HELD';
    let heldReason = '';

    if (def.is_expired) {
      finalStatus = 'HELD';
      heldReason = 'HELD__TERMS_EXPIRED_IN_SOURCE: Campaign validity span expired in May 2024';
    } else if (def.locality_nature === 'STORE_LOCATOR_DROPDOWN_REJECTED') {
      finalStatus = 'HELD';
      heldReason = 'HELD__STORE_LOCATOR_NOT_OFFER_BINDING: Listing Da Nang in store selector does not state offer applies there (Req 25); missing promotional validity span (Req 26)';
    } else if (def.locality_nature === 'FOOTER_COMPANY_REGISTRATION') {
      finalStatus = 'HELD';
      heldReason = 'HELD__LOCALITY_FOOTER_ONLY: Da Nang appears only in corporate legal footer registration (Req 18); missing Da Nang offer binding';
    } else if (def.locality_nature === 'ABSENT_IN_SOURCE') {
      finalStatus = 'HELD';
      heldReason = 'HELD__LOCALITY_ABSENT_IN_SOURCE: Zero occurrences of Da Nang in source page';
    } else if (!dims.validity_or_recurrence.is_proven) {
      finalStatus = 'HELD';
      heldReason = 'HELD__VALIDITY_CALENDAR_YEAR_UNPROVEN: Source leaf published 11/03/2025 lacks asserted 2026 calendar validity span';
    } else if (allProven) {
      finalStatus = 'VERIFIED';
      heldReason = null;
    } else {
      finalStatus = 'HELD';
      heldReason = `HELD__UNPROVEN_DIMENSIONS: Missing [${missing.join(', ')}]`;
    }

    if (finalStatus === 'VERIFIED') {
      matrixR3.summary.provenance_verified_count++;
      console.log(`  -> [VERIFIED] ${def.b19_id}`);
    } else {
      matrixR3.summary.provenance_held_count++;
      console.log(`  -> [HELD] ${def.b19_id}: ${heldReason}`);
    }

    matrixR3.items.push({
      b19_id: def.b19_id,
      brand: def.brand,
      leaf_id: def.leaf_id,
      source_url: meta.requested_url,
      final_url: meta.final_url,
      http_status: meta.http_status,
      source_raw_sha256: meta.sha256,
      source_raw_bytes: meta.bytes,
      captured_at_utc: meta.captured_at_utc,
      locality_nature: def.locality_nature,
      all_dimensions_proven: allProven,
      provenance_status: finalStatus,
      held_reason: heldReason,
      dimensions: dims
    });
  }

  const matrixJson = JSON.stringify(matrixR3, null, 2);
  fs.writeFileSync(MATRIX_PATH, matrixJson, 'utf8');

  const matrixHash = sha256(Buffer.from(matrixJson, 'utf8'));
  const sidecarContent = `${matrixHash}  CLAIM_PROVENANCE_MATRIX_R3.json\n`;
  fs.writeFileSync(MATRIX_PATH + '.sha256', sidecarContent, 'utf8');

  console.log('\n======================================================================');
  console.log(`R3 MATRIX WRITTEN: ${matrixR3.summary.provenance_verified_count} VERIFIED, ${matrixR3.summary.provenance_held_count} HELD`);
  console.log(`Matrix SHA-256: ${matrixHash}`);
  console.log('Sidecar written:', MATRIX_PATH + '.sha256');
  console.log('======================================================================');

  return { matrixR3, matrixHash };
}

if (require.main === module) {
  runR3SourceAcquisition();
}

module.exports = {
  runR3SourceAcquisition,
  findRawByteSpan,
  normalizeHtmlEntities,
  CANDIDATE_DEFINITIONS_R3
};
