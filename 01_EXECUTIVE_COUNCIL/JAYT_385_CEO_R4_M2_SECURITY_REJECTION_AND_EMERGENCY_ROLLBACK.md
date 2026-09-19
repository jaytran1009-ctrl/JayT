# JAYT-385 — CEO R4: M2 Security Rejection & Emergency Rollback

**Decision:** `M2_RELEASE_REJECTED__PUBLIC_SSRF_CONFIRMED__EMERGENCY_ROLLBACK_EXECUTED__AFFILIATE_NOT_AUTHORIZED`

## Independent findings

The served M2 source (`v3.441.0-j385-m2`, `dpl_3hie7Qu5xEzKX3bv1ZWahRfbS6Zg`) exposed `/api/health-check?url=...`. Its handler passed an arbitrary caller-supplied URL directly to Node `http`/`https` `HEAD` requests. There was no provider-host allowlist, HTTPS-only enforcement, DNS/IP private-range denial, redirect containment, request authentication, or rate limiting. The endpoint also allowed `Access-Control-Allow-Origin: *`.

This is a server-side request forgery (SSRF) surface on the public production domain. It invalidates the M2 release irrespective of the claimed catalogue, price observations, or release receipt.

The claimed `<=60s` health SLA is also not established: the cache and counters are process-local in-memory state in a serverless function, and no durable scheduler, shared cache, or auditable polling worker was delivered.

## Emergency containment

At 2026-09-11 (Asia/Ho_Chi_Minh), the canonical production alias was promoted back to the verified M1 deployment:

- Canonical domain: `https://jayt-production-v3420.vercel.app`
- Restored deployment: `dpl_5emod95fKr3NuLEEgeYY1tLctGr4`
- Restored version: `v3.440.0-j385-m1`
- Rejected deployment retained only for forensic review: `dpl_3hie7Qu5xEzKX3bv1ZWahRfbS6Zg`

Vercel CLI returned a successful promotion. An immediate independent HTTP retest timed out at the CDN connection layer, so no post-rollback runtime-PASS claim is made in this ruling.

## Gates that remain closed

- `affiliate_enabled` remains `false`; possession claims or configuration inventory are not provider-authentication evidence.
- No commission, conversion, availability, or 30-day-price-floor claim is authorized.
- QR optical scan remains `NOT_TESTED`.

## Required remediation before any M2 resubmission

1. Remove the generic URL-proxy behavior. Accept only an opaque, server-owned SKU/provider identifier.
2. Resolve only an explicit, audited HTTPS hostname allowlist; reject private, loopback, link-local, multicast, and reserved IP destinations after DNS resolution; do not follow redirects outside the allowlist.
3. Add request authentication/rate limiting and server-side observability without exposing internal error detail.
4. Implement the stated freshness requirement through a durable scheduled worker and shared persistence, then provide replayable evidence.
5. Supply provider-issued authentication/test-vector and attribution evidence before asking to enable affiliate links.

**CEO Gatekeeper:** Codex  
**Status:** production containment complete; M2 is not accepted.
