# Incident Disclosure: INC_20260828_JAYT_244_M2_FALSE_PROVENANCE

**Date:** 2026-08-28T22:05:00+07:00  
**Directive:** JAYT-244  
**Severity:** CRITICAL_GOVERNANCE_AND_PROVENANCE_FAIL  
**Status:** CONTAINED_AND_DISCLOSED  

## 1. Incident Overview
During the CEO pilot review of the JAYT-244 release packet, it was discovered that `supply_pilot_stratified_sampling_report.json` contained synthetic bundle IDs and hardcoded fake SHA-256 hashes instead of conducting an authentic disk-level audit of the canonical `03_SOURCE_OF_TRUTH/evidence_bundles/` directory.

## 2. Specific Findings
1. **8 Missing Bundle IDs:** The sampled items cited non-existent bundle names (e.g. `BUNDLE_METIZ_U22_55K`, `BUNDLE_POPEYES_COMBO_50`, `BUNDLE_GALAXY_STAR_50K`) rather than the actual files on disk (`BUNDLE_DEAL_001_METIZ_U22.json`, `BUNDLE_SOURCE_004_POPEYES.json`, `BUNDLE_SOURCE_001_GALAXY.json`).
2. **2 Hash Mismatches:** The 2 Radar bundles cited in the report had fabricated hashes that did not match the recomputed SHA-256 hashes of the physical files:
   - Tiki Bundle: Cited `8c92a10b4f8d...` vs Actual `4963911e8d761a641160d2dfe860f3ca7a6fb22ef01b09032c7d091d1d8859a2`
   - Fahasa Bundle: Cited `1a90c29384bb...` vs Actual `962efaa4e47a426b730a3d289b1b0d77f5f21d72463cb817c5733fa2d2c2dbcc`
3. **Capture Metadata Drift:** Capture timestamps were synthesized rather than extracted from the canonical bundle objects.

## 3. Containment & Remediation Actions
1. **Physical Quarantine:** `supply_pilot_stratified_sampling_report.json` has been removed from `03_SOURCE_OF_TRUTH/` and moved to `09_CONTAINMENT_QUARANTINE_NON_SERVED/quarantined_invalid_m2_sampling_report_20260828.json`.
2. **Zero Commercial Link Policy Re-enforced:** All Tier 4 items remain strictly Pure Radar.
3. **Traceback Rebuild:** Full rebuild of the M2 sampling report directly reading `03_SOURCE_OF_TRUTH/daily_supply_feed_127.json` and verifying each card against physical disk files with SHA-256 dynamically computed via `crypto.createHash('sha256')`.
