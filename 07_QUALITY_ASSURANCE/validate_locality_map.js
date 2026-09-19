const fs = require('fs');
const path = require('path');

function validateLocalityMap(mapData) {
  const errors = [];

  if (!mapData || typeof mapData !== 'object') {
    return { valid: false, errors: ['Locality map must be a non-empty object.'] };
  }

  // 1. Check Integrity Rules
  if (!mapData.integrity_rules || mapData.integrity_rules.no_auto_gps !== true) {
    errors.push('Locality map must declare integrity_rules.no_auto_gps: true.');
  }

  // 2. Check Layer 1
  if (!mapData.layer_1_clusters_and_personas || !mapData.layer_1_clusters_and_personas.STUDENT || !mapData.layer_1_clusters_and_personas.OFFICE_TECH) {
    errors.push('Locality map Layer 1 must contain STUDENT and OFFICE_TECH personas.');
  }

  // 3. Check Layer 2
  if (!Array.isArray(mapData.layer_2_temporal_lifestyle_triggers) || mapData.layer_2_temporal_lifestyle_triggers.length < 4) {
    errors.push('Locality map Layer 2 must contain at least 4 lifestyle triggers.');
  } else {
    for (const trig of mapData.layer_2_temporal_lifestyle_triggers) {
      const trigStr = JSON.stringify(trig);
      if (trigStr.includes('giảm 20K') || trigStr.includes('15K–35K') || trigStr.includes('mã 0đ')) {
        errors.push(`Trigger '${trig.trigger_id}' contains unverified market pricing claims.`);
      }
    }
  }

  // 4. Check Layer 3 Locations (STRICT COORDINATE VERIFICATION CONTRACT)
  if (!Array.isArray(mapData.layer_3_locations_registry) || mapData.layer_3_locations_registry.length === 0) {
    errors.push('Locality map Layer 3 must contain a non-empty locations registry.');
  } else {
    for (const loc of mapData.layer_3_locations_registry) {
      if (!loc.location_id || !loc.name || !loc.district) {
        errors.push(`Location is missing required fields (location_id, name, district).`);
        continue;
      }

      if (loc.coordinates !== null) {
        // Must have full proof artifacts
        if (loc.verification_status !== 'LOCATION_VERIFIED_VIA_OFFICIAL_CAPTURE') {
          errors.push(`Location '${loc.location_id}' has non-null coordinates but verification_status is '${loc.verification_status}'. Must be 'LOCATION_VERIFIED_VIA_OFFICIAL_CAPTURE'.`);
        }
        if (!loc.coordinate_evidence_ref || typeof loc.coordinate_evidence_ref !== 'string') {
          errors.push(`Location '${loc.location_id}' has coordinates but lacks 'coordinate_evidence_ref'.`);
        }
        if (!loc.coordinate_source_url || !loc.coordinate_source_url.startsWith('https://')) {
          errors.push(`Location '${loc.location_id}' has coordinates but lacks valid HTTPS 'coordinate_source_url'.`);
        }
        if (!loc.coordinate_artifact_hash || !/^[a-f0-9]{64}$/i.test(loc.coordinate_artifact_hash)) {
          errors.push(`Location '${loc.location_id}' has coordinates but lacks valid 64-char SHA-256 'coordinate_artifact_hash'.`);
        }
        if (!loc.coordinate_checked_at || isNaN(new Date(loc.coordinate_checked_at).getTime())) {
          errors.push(`Location '${loc.location_id}' has coordinates but lacks valid ISO 'coordinate_checked_at'.`);
        }
        if (typeof loc.coordinates.lat !== 'number' || typeof loc.coordinates.lng !== 'number') {
          errors.push(`Location '${loc.location_id}' has invalid coordinates (lat/lng must be numbers).`);
        }
      } else {
        // When coordinates are null, must use reference_area
        if (loc.verification_status !== 'LOCATION_UNVERIFIED') {
          errors.push(`Location '${loc.location_id}' has null coordinates but verification_status is not 'LOCATION_UNVERIFIED'.`);
        }
        if (!loc.reference_area) {
          errors.push(`Location '${loc.location_id}' is unverified and must define 'reference_area'.`);
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = { validateLocalityMap };
