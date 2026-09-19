/**
 * JAYT COMMUNITY PROOF-OF-DEAL INTAKE & FRESHNESS ENGINE (158)
 * Directive: JAYT-158: HYBRID LOCAL SUPPLY ENGINE
 * 
 * CORE RULES:
 * 1. Community signals start strictly at SOURCE_SIGNAL_ONLY.
 * 2. Mandatory 1-round verification before promoting to 🟢 VERIFIED_PROOF_DEAL.
 * 3. TTL: Community proof expires after 14 days without re-confirmation.
 * 4. Venue listing recheck after 30 days.
 * 5. Zero personal PII: Strips exact GPS, phone numbers, and submitter identity.
 * 6. Upvote/Downvote creates audit tickets, zero direct automated data mutation.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
const intakeJsonPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'community_proof_intake_158.json');
const auditTicketsPath = path.join(repoRoot, '05_DEAL_AND_AFFILIATE', 'community_audit_tickets_158.json');

const VALID_CLUSTERS = [
  'CLUSTER_1_HOA_KHANH_LIEN_CHIEU',
  'CLUSTER_2_BAC_MY_AN_HOA_QUY',
  'CLUSTER_3_HAI_CHAU_THANH_KHE',
  'CLUSTER_4_HI_TECH_SOFTWARE_PARK',
  'CLUSTER_5_SON_TRA_BEACH'
];

const COMMUNITY_PROOF_TTL_DAYS = 14;
const VENUE_LISTING_RECHECK_DAYS = 30;

function initIntakeStore() {
  if (!fs.existsSync(intakeJsonPath)) {
    const initialData = {
      intake_id: 'COMMUNITY_PROOF_INTAKE_158',
      directive: 'JAYT-158: HYBRID LOCAL SUPPLY ENGINE',
      version: '1.0.0',
      last_evaluated_at: new Date().toISOString(),
      total_signals: 0,
      signals: []
    };
    fs.writeFileSync(intakeJsonPath, JSON.stringify(initialData, null, 2), 'utf8');
  }
  if (!fs.existsSync(auditTicketsPath)) {
    const initialTickets = {
      tickets_id: 'COMMUNITY_AUDIT_TICKETS_158',
      total_tickets: 0,
      tickets: []
    };
    fs.writeFileSync(auditTicketsPath, JSON.stringify(initialTickets, null, 2), 'utf8');
  }
}

/**
 * Submit a community proof signal with strict privacy stripping
 */
function submitCommunitySignal(rawPayload) {
  initIntakeStore();
  const intakeData = JSON.parse(fs.readFileSync(intakeJsonPath, 'utf8'));

  if (!rawPayload.venue_name || typeof rawPayload.venue_name !== 'string' || rawPayload.venue_name.trim().length < 2) {
    throw new Error('INVALID_VENUE_NAME: Tên quán hoặc địa điểm phải có ít nhất 2 ký tự');
  }

  if (!VALID_CLUSTERS.includes(rawPayload.coarse_cluster_id)) {
    throw new Error(`INVALID_CLUSTER: Cụm không hợp lệ. Phải thuộc một trong 5 cụm Đà Nẵng: ${VALID_CLUSTERS.join(', ')}`);
  }

  const now = new Date();
  const expiresAt = new Date(now.getTime() + COMMUNITY_PROOF_TTL_DAYS * 24 * 60 * 60 * 1000);

  // Strip phone numbers from text
  const cleanDescription = (rawPayload.deal_description || '').replace(/(?:\+84|0)\d{9,10}/g, '[PHONE_REDACTED]');
  const cleanVenueName = rawPayload.venue_name.trim().replace(/(?:\+84|0)\d{9,10}/g, '');

  const proofContent = `${rawPayload.proof_type}_${cleanVenueName}_${rawPayload.proof_base64 || rawPayload.proof_url || 'MANUAL'}`;
  const proofHash = crypto.createHash('sha256').update(proofContent).digest('hex');
  const signalId = `COMM_SIG_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${crypto.randomBytes(3).toString('hex')}`;

  const newSignal = {
    signal_id: signalId,
    venue_name: cleanVenueName,
    coarse_cluster_id: rawPayload.coarse_cluster_id,
    deal_description: cleanDescription,
    reported_price: rawPayload.reported_price ? String(rawPayload.reported_price).trim() : null,
    proof_type: rawPayload.proof_type || 'MANUAL_REPORT',
    proof_hash: proofHash,
    submitted_at: now.toISOString(),
    expires_at: expiresAt.toISOString(),
    status: 'SOURCE_SIGNAL_ONLY', // Strict start at SOURCE_SIGNAL_ONLY
    reliability_tier: 'TIER_3_TRACKED_SOURCE',
    reliability_badge: '🟣 Nguồn đang theo dõi',
    upvotes: 0,
    downvotes: 0,
    verification_round_passed: false,
    audit_notes: 'Tín hiệu vừa ghi nhận từ cộng đồng, chờ đối soát vòng 1.'
  };

  intakeData.signals.push(newSignal);
  intakeData.total_signals = intakeData.signals.length;
  intakeData.last_evaluated_at = now.toISOString();

  fs.writeFileSync(intakeJsonPath, JSON.stringify(intakeData, null, 2), 'utf8');
  console.log(`✅ [COMMUNITY-INTAKE] Recorded community signal: ${signalId} (${cleanVenueName}) -> TIER_3_TRACKED_SOURCE`);
  return newSignal;
}

/**
 * Freshness & Anti-Fraud TTL Evaluator
 */
function evaluateFreshnessAndTTL() {
  initIntakeStore();
  const intakeData = JSON.parse(fs.readFileSync(intakeJsonPath, 'utf8'));
  const now = Date.now();
  let updatedCount = 0;

  for (const sig of intakeData.signals) {
    const expireTime = new Date(sig.expires_at).getTime();

    if (now > expireTime && sig.status !== 'EXPIRED') {
      sig.status = 'EXPIRED';
      sig.reliability_tier = 'TIER_3_TRACKED_SOURCE';
      sig.reliability_badge = '🟣 Đã quá hạn đối soát (Cần xác nhận lại)';
      sig.audit_notes = `Hết hạn đối soát sau ${COMMUNITY_PROOF_TTL_DAYS} ngày kể từ lúc gửi.`;
      updatedCount++;
    }
  }

  intakeData.last_evaluated_at = new Date().toISOString();
  fs.writeFileSync(intakeJsonPath, JSON.stringify(intakeData, null, 2), 'utf8');
  return { evaluated_count: intakeData.signals.length, expired_count: updatedCount };
}

/**
 * Record user feedback vote as an audit ticket (Anti-fraud)
 */
function recordVoteFeedback(signalId, voteType, reason) {
  initIntakeStore();
  const ticketsData = JSON.parse(fs.readFileSync(auditTicketsPath, 'utf8'));
  const now = new Date();

  const ticketId = `TICKET_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}_${crypto.randomBytes(3).toString('hex')}`;
  const ticket = {
    ticket_id: ticketId,
    signal_id: signalId,
    vote_type: voteType === 'UPVOTE' ? 'UPVOTE' : 'DOWNVOTE',
    reason: (reason || '').substring(0, 200),
    created_at: now.toISOString(),
    status: 'PENDING_ADMIN_REVIEW'
  };

  ticketsData.tickets.push(ticket);
  ticketsData.total_tickets = ticketsData.tickets.length;
  fs.writeFileSync(auditTicketsPath, JSON.stringify(ticketsData, null, 2), 'utf8');
  console.log(`🎫 [AUDIT-TICKET] Recorded feedback ticket: ${ticketId} for ${signalId}`);
  return ticket;
}

module.exports = {
  VALID_CLUSTERS,
  COMMUNITY_PROOF_TTL_DAYS,
  VENUE_LISTING_RECHECK_DAYS,
  initIntakeStore,
  submitCommunitySignal,
  evaluateFreshnessAndTTL,
  recordVoteFeedback
};
