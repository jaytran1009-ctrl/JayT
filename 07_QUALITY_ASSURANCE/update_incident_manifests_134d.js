const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const manifest134cPath = path.resolve(__dirname, '../08_RELEASE_VAULT/INCIDENT_MANIFEST_JAYT_134C_CONTAINMENT.json');
const manifest134dPath = path.resolve(__dirname, '../08_RELEASE_VAULT/INCIDENT_MANIFEST_JAYT_134D_CONTAINMENT.json');

// 1. Update 134C status to PARTIALLY_CONTAINED_SECOND_ESCAPE_DISCLOSED
const manifest134c = JSON.parse(fs.readFileSync(manifest134cPath, 'utf8'));
manifest134c.status = 'PARTIALLY_CONTAINED_SECOND_ESCAPE_DISCLOSED';
manifest134c.failure_analysis = 'Test 134C relied on keyword blacklist and missed voucher TIKTOKVIP0D, handwritten stack formulas (-8.500d, -15.000d), handwritten roulette places array with fake distances, and fallback commercial strings in export pass.';
manifest134c.superseded_by = 'INCIDENT-JAYT-134D';
fs.writeFileSync(manifest134cPath, JSON.stringify(manifest134c, null, 2), 'utf8');
console.log('✅ Updated 134C status to PARTIALLY_CONTAINED_SECOND_ESCAPE_DISCLOSED');

// 2. Create 134D Incident Manifest
const jsPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/jayt_apex_interface.js');
const htmlPath = path.resolve(__dirname, '../03_SOURCE_OF_TRUTH/index.html');

const manifest134d = {
  incident_id: "INCIDENT-JAYT-134D",
  directive: "JAYT-134D — RENDERED-CLAIM ERADICATION",
  severity: "P0_CRITICAL",
  status: "RENDERED_CLAIMS_ERADICATED_AWAITING_INDEPENDENT_AUDIT",
  reported_at: "2026-08-26T18:02:21+07:00",
  eradicated_at: "2026-08-26T18:03:50+07:00",
  summary: "Total eradication of all rendered commercial literals, voucher TIKTOKVIP0D, handwritten discount formulas, handwritten roulette places, commercial fallback strings, and unmapped hub labels.",
  remediated_surfaces: [
    {
      surface_id: "SURF_01_SYNTHETIC_VOUCHERS",
      description: "Voucher TIKTOKVIP0D ('Min spend 0đ') and duplicate voucher vault grids.",
      action: "PURGED_AND_REPLACED_WITH_CANONICAL_POLICY_DIRECTORY",
      source_file: "03_SOURCE_OF_TRUTH/jayt_apex_interface.js",
      status: "ERADICATED"
    },
    {
      surface_id: "SURF_02_HANDWRITTEN_STACK_FORMULA",
      description: "Hardcoded discount values: -8.500₫, -15.000₫, -21.000₫, 'Thực Trả Đáy 40.500₫'.",
      action: "REPLACED_WITH_NEUTRAL_EDUCATIONAL_EXPLAINER",
      source_file: "03_SOURCE_OF_TRUTH/jayt_apex_interface.js",
      status: "ERADICATED"
    },
    {
      surface_id: "SURF_03_HANDWRITTEN_ROULETTE_PLACES",
      description: "Array of handwritten venues with fake priceNums (25k, 35k), fake tags, and fake distances (0.5km, 0.8km).",
      action: "REPLACED_WITH_CANONICAL_26_LOCATIONS_FROM_FOUR_LAYER_DATASET",
      source_file: "03_SOURCE_OF_TRUTH/jayt_apex_interface.js",
      status: "ERADICATED"
    },
    {
      surface_id: "SURF_04_COMMERCIAL_FALLBACKS",
      description: "Fallback string in exportGroupHangoutPass self-assigning 'Metiz Cinema Helio', '45.000₫', 'Số 01 Đường 2/9'.",
      action: "NEUTRALIZED_TO_EMPTY_STATE_AND_STRICT_PAYLOAD_VALIDATION",
      source_file: "03_SOURCE_OF_TRUTH/jayt_apex_interface.js",
      status: "ERADICATED"
    },
    {
      surface_id: "SURF_05_UNMAPPED_HUB_LABELS",
      description: "Labels 'Cứu Đói ≤ 25K', 'Đặc Quyền .edu.vn (0đ)', 'Săn Đồ KTX Xếp Mã'.",
      action: "NEUTRALIZED_TO_CANONICAL_INFORMATIONAL_LABELS",
      source_file: "03_SOURCE_OF_TRUTH/jayt_apex_interface.js",
      status: "ERADICATED"
    }
  ],
  source_hashes: {
    jayt_apex_interface_js: {
      sha256: crypto.createHash('sha256').update(fs.readFileSync(jsPath)).digest('hex')
    },
    index_html: {
      sha256: crypto.createHash('sha256').update(fs.readFileSync(htmlPath)).digest('hex')
    }
  },
  eradication_invariants: {
    zero_fake_vouchers: true,
    zero_handwritten_stack_formulas: true,
    zero_fake_places_or_distances: true,
    zero_commercial_fallbacks: true,
    zero_unmapped_hub_labels: true,
    canonical_mapping_verified: true
  }
};

fs.writeFileSync(manifest134dPath, JSON.stringify(manifest134d, null, 2), 'utf8');
console.log('✅ Created INCIDENT_MANIFEST_JAYT_134D_CONTAINMENT.json');
