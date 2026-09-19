const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ws1 = path.resolve(__dirname, '..');
const ws2 = 'D:\\Công Việc MMO\\OPC JayT\\JayT-Dự-Án-Giá-Trị-Cộng-Đồng';

const filesToSync = [
  '03_SOURCE_OF_TRUTH/jayt_apex_interface.js',
  'deploy/jayt_apex_interface.js',
  'deploy/public/jayt_apex_interface.js',
  'scripts/verify_media_assets.cjs',
  'scripts/verify_autonomous_gates.cjs',
  'scripts/verify_pipeline_seal.cjs',
  '07_QUALITY_ASSURANCE/test_j434_media_pipeline.cjs',
  '07_QUALITY_ASSURANCE/test_j434_live_verification.cjs',
  '07_QUALITY_ASSURANCE/test_j435_autonomous_gates.cjs',
  '07_QUALITY_ASSURANCE/test_j435_live_verification.cjs',
  '07_QUALITY_ASSURANCE/runtime_evidence/j434_live_desktop_clean_media.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/j434_live_mobile_clean_media.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/JAYT_434_MEDIA_PIPELINE_RECEIPT.json',
  '07_QUALITY_ASSURANCE/runtime_evidence/j435_live_desktop_pdp_radar.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/j435_live_mobile_pdp_radar.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/JAYT_435_AUTONOMOUS_GATES_RECEIPT.json',
  '07_QUALITY_ASSURANCE/test_j436_zqa_gates.cjs',
  '07_QUALITY_ASSURANCE/test_j436_live_verification.cjs',
  '07_QUALITY_ASSURANCE/runtime_evidence/j436_live_desktop_tier2_radar.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/j436_live_mobile_tier2_radar.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/JAYT_436_ZQA_RECEIPT.json',
  '07_QUALITY_ASSURANCE/test_j437_media_gallery_gates.cjs',
  '07_QUALITY_ASSURANCE/test_j437_live_verification.cjs',
  '07_QUALITY_ASSURANCE/runtime_evidence/j437_live_desktop_real_photo_gallery.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/j437_live_mobile_real_photo_gallery.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/j437_live_mobile_photo_lightbox.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/JAYT_437_MEDIA_GALLERY_RECEIPT.json',
  '07_QUALITY_ASSURANCE/test_j438_voucher_routing_gates.cjs',
  '07_QUALITY_ASSURANCE/test_j438_live_verification.cjs',
  '07_QUALITY_ASSURANCE/runtime_evidence/j438_live_desktop_voucher_radar.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/j438_live_mobile_voucher_radar.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/JAYT_438_VOUCHER_RADAR_RECEIPT.json',
  'scripts/verify_link_health.cjs',
  '07_QUALITY_ASSURANCE/test_j439_shopee_video_gates.cjs',
  '07_QUALITY_ASSURANCE/test_j439_live_verification.cjs',
  '07_QUALITY_ASSURANCE/runtime_evidence/j439_live_desktop_shopee_video.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/j439_live_mobile_shopee_video.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/JAYT_439_SHOPEE_VIDEO_RECEIPT.json',
  '07_QUALITY_ASSURANCE/test_autonomous_opc_gates.cjs',
  '07_QUALITY_ASSURANCE/test_j441_live_verification.cjs',
  '07_QUALITY_ASSURANCE/runtime_evidence/j441_live_desktop_review_engine.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/j441_live_mobile_review_engine.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/JAYT_441_AUTONOMOUS_REVIEW_RECEIPT.json',
  '07_QUALITY_ASSURANCE/test_j442_live_verification.cjs',
  '07_QUALITY_ASSURANCE/runtime_evidence/j442_live_desktop_tiktok_winner.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/j442_live_mobile_tiktok_winner.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/JAYT_442_TIKTOK_LIVE_PROBE_RECEIPT.json',
  '07_QUALITY_ASSURANCE/test_click_integrity.cjs',
  '07_QUALITY_ASSURANCE/test_j443_live_verification.cjs',
  '07_QUALITY_ASSURANCE/runtime_evidence/j443_live_desktop_case_winner.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/j443_live_mobile_case_winner.png',
  '07_QUALITY_ASSURANCE/test_j444_live_verification.cjs',
  '07_QUALITY_ASSURANCE/runtime_evidence/j444_live_desktop_case_winner.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/j444_live_mobile_case_winner.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/JAYT_444_MARTIAL_LAW_RECEIPT.json',
  '07_QUALITY_ASSURANCE/test_j445_live_verification.cjs',
  '07_QUALITY_ASSURANCE/runtime_evidence/j445_live_desktop_embedded_modal.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/j445_live_mobile_embedded_modal.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/JAYT_445_MODAL_DECISION_RECEIPT.json',
  '.github/workflows/jayt_cadence_cloud_cron.yml',
  'scripts/cloud_danang_cadence_sweeper.cjs',
  'api/resolve-link.js',
  'api/affiliate-webhook.js',
  'deploy/api/resolve-link.js',
  'deploy/api/affiliate-webhook.js',
  'deploy/vercel.json',
  '07_QUALITY_ASSURANCE/test_j447_cloud_migration_gates.cjs',
  '07_QUALITY_ASSURANCE/test_j447_live_verification.cjs',
  '07_QUALITY_ASSURANCE/runtime_evidence/j447_live_desktop_cloud_modal.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/j447_live_mobile_cloud_modal.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/JAYT_447_CLOUD_MIGRATION_RECEIPT.json',
  '07_QUALITY_ASSURANCE/runtime_evidence/JAYT_CADENCE_CLOUD_SWEEP_RECEIPT.json',
  'deploy/jayt_apex_interface.js.sha256',
  '07_QUALITY_ASSURANCE/test_codex_5point_acceptance_gates.cjs',
  '07_QUALITY_ASSURANCE/test_j448_codex_live_acceptance.cjs',
  '07_QUALITY_ASSURANCE/runtime_evidence/j448_live_desktop_codex_modal.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/j448_live_mobile_codex_modal.png',
  '07_QUALITY_ASSURANCE/runtime_evidence/JAYT_CODEX_5POINT_GATES_RECEIPT.json',
  '07_QUALITY_ASSURANCE/runtime_evidence/JAYT_448_CODEX_ACCEPTANCE_RECEIPT.json',
  '07_QUALITY_ASSURANCE/zqa-contract-map.json',
  '07_QUALITY_ASSURANCE/test_playwright_cross_browser.cjs',
  'scripts/run_watchdog_drill.cjs',
  'scripts/verify_route_identity_matrix.cjs',
  'scripts/verify_image_provenance.cjs',
  'scripts/verify_live_artifact.cjs',
  'scripts/build_jayt_feature1_evidence_pack_v2.cjs',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/RELEASE_MANIFEST.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/zqa-result.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/zqa-contract-map.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/route-matrix.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/modal-state-stress-report.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/review-math-report.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/image-integrity-report.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/image-provenance-report.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/cross-browser-report.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/cross-browser-runtime.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/cadence-cloud-report.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/watchdog-drill-report.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/parity-report.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/live-artifact-verification.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/known-issues.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/commit.txt',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/deployment.txt',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/README_ACCEPTANCE.md',
  '07_QUALITY_ASSURANCE/evidence/cross-browser-report.json',
  '07_QUALITY_ASSURANCE/evidence/cross-browser-runtime.json',
  '07_QUALITY_ASSURANCE/evidence/image-integrity-report.json',
  '07_QUALITY_ASSURANCE/evidence/image-provenance-report.json',
  '07_QUALITY_ASSURANCE/evidence/live-artifact-verification.json',
  '07_QUALITY_ASSURANCE/evidence/modal-state-stress-report.json',
  '07_QUALITY_ASSURANCE/evidence/route-matrix.json',
  '07_QUALITY_ASSURANCE/evidence/watchdog-drill-report.json',
  '07_QUALITY_ASSURANCE/evidence/zqa-result.json',
  'scripts/build_final_closure_pack.cjs',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/FINAL_CLOSURE/review-math-closure.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/FINAL_CLOSURE/github-cloud-runs.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/FINAL_CLOSURE/watchdog-cloud-closure.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/FINAL_CLOSURE/deployment-lineage.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/FINAL_CLOSURE/known-issues-final.json',
  'scripts/build_authenticity_pack.cjs',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/FINAL_CLOSURE/AUTHENTICITY/review-authenticity-benchmark.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/FINAL_CLOSURE/AUTHENTICITY/review-benchmark-verification.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/FINAL_CLOSURE/AUTHENTICITY/github-run-verification.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/FINAL_CLOSURE/AUTHENTICITY/git-commit-identity.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/FINAL_CLOSURE/AUTHENTICITY/canonical-production-authority.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/FINAL_CLOSURE/AUTHENTICITY/ceo-matrix-canonical.json',
  'JAYT_FEATURE1_RELEASE_EVIDENCE_PACK_V2/FINAL_CLOSURE/AUTHENTICITY/authenticity-verdict.json',
  'PROJECT_MEMORY.md'
];

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

console.log('=== SYNCING WS1 -> WS2 AND VERIFYING BIT-IDENTICAL PARITY ===');
let allMatch = true;

for (const rel of filesToSync) {
  const p1 = path.join(ws1, rel);
  const p2 = path.join(ws2, rel);
  const dir = path.dirname(p2);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(p1, p2);

  const h1 = sha256(fs.readFileSync(p1));
  const h2 = sha256(fs.readFileSync(p2));
  const match = (h1 === h2);
  if (!match) allMatch = false;
  console.log('[PARITY] ' + rel + ' -> ' + (match ? 'BIT-IDENTICAL MATCH' : 'MISMATCH!'));
}

console.log('Dual-Workspace Parity Verdict: ' + (allMatch ? '100% BIT-IDENTICAL MATCH' : 'FAILED'));
if (!allMatch) process.exit(1);
