# 1. JWT minted, cached, and forwarded inside `proxy.ts` (mail-fe pattern)

Date: 2026-07-06
Status: Accepted — **corrected 2026-07-07** (see "Correction" below)

> **Correction (2026-07-07).** This ADR was written describing mail-fe's **JWE session
> decryption** (`compactDecrypt`) on the cold path. The implementation does **not** decrypt
> anything and there is no `jose`/JWE dependency: the Appwrite session is an httpOnly cookie
> whose value is **forwarded verbatim** as a `Cookie:` header to `POST /v1/account/jwt` to mint,
> and to `GET /v1/account` to verify — **cookie-forwarding**, not JWE-decrypt. The decision
> (single `proxy.ts` owns the identity bridge; hot/cold path; dedup cache; the 4 hardenings) still
> holds; only the "how the session is read" mechanism differs. Hardening #1 (Node.js runtime) was
> justified by JWE crypto that doesn't exist, so it is **no longer load-bearing** for that reason
> (see revised note below). Cookie identity, base URL, and the authenticated-request primitive are
> now owned by the **Appwrite Session module** (`lib/auth/appwriteSession`, see
> [CONTEXT-MAP `### Identity bridge`](../../CONTEXT-MAP.md)) rather than duplicated across
> `proxy.ts` and the DAL.

## Context

The Kepegawaian Backend (Spring Boot) accepts and validates **Appwrite-issued JWTs** as
`Bearer` tokens but does not issue them. The browser authenticates against Appwrite and holds
an httpOnly session cookie. Something on the Next.js side must turn that Appwrite session into
a short-lived JWT on every Backend call.

Two candidate architectures were on the table:

1. **Next.js-official DAL pattern** — an optimistic `proxy.ts` (session-cookie presence only)
   plus a Data Access Layer `verifySession()` (`account.get()`, React `cache()`), with data
   forwarding done by `app/api/**/route.ts` route-handlers that each mint/attach the JWT.
2. **The production `mail-fe/proxy.ts` pattern** — a single `proxy.ts` that resolves the
   session, mints/caches the Appwrite JWT in an httpOnly `token` cookie, and `rewrite`s
   `/api/proxy/*` upstream with the `Bearer` attached. No route-handler layer.

The user runs the mail-fe pattern in production and wanted it here, but was unsure about its
**server load** and **future risk**. We analysed both.

**Load.** The hot path (≈99% of requests) reads the `token` cookie and *decodes* its
`exp` claim — base64, no signature verification, no network — then attaches `Bearer` and
rewrites. Pure CPU, microseconds. The cold path (≈once per JWT lifetime per user) forwards the
session cookie verbatim to Appwrite `POST /v1/account/jwt` once. At ~4 mints/hour/user this is
~0.07% of Appwrite's 120/60s per-user rate limit. This is **lighter** than the DAL pattern,
which does an `account.get()` network call on every protected navigation.

The real risks are implementation-cleanliness, not load, and each has a cheap mitigation.

## Decision

Adopt the **mail-fe `proxy.ts` pattern**: a single `proxy.ts` does both route-guarding and
data forwarding; the Appwrite JWT is minted server-side and cached in an httpOnly `token`
cookie; `/api/proxy/*` is `rewrite`n upstream with `Bearer`. No `app/api/**/route.ts` data
layer.

Adopt it **with four hardenings** over the raw pattern:

1. **Pin `proxy.ts` to the Node.js runtime.** *(Original rationale: JWE `compactDecrypt` needs
   it. Corrected 2026-07-07 — there is no JWE decrypt, so this is no longer required for crypto.
   Node runtime is still used because `proxy.ts` mints via `fetch` and manages an in-memory dedup
   `Map`; revisit if pure-edge deployment is wanted.)*
2. **`try/catch` fail-safe** — a mint failure redirects to `/login`, never a 500. Because all
   API traffic flows through `proxy.ts`, an unguarded throw would down every API at once.
3. **Clear the `token` cookie on logout** (not just the session cookie) — otherwise a still
   `exp`-valid `token` could be replayed for up to one JWT lifetime after logout.
4. **Refresh buffer ≈30s and mint `duration: 3600`** — 30s (vs mail-fe's 10s) covers slow
   Backend requests that would otherwise arrive after expiry; 1-hour mints cut cold-path
   frequency 4×.

Page rendering is still guarded by a **DAL `verifySession()`** (`account.get()` in React
`cache()`) at the top of every protected server component — the authoritative gate for
*rendering*, while `proxy.ts` is the authoritative gate for *data*.

## Consequences

**Positive.** Near-zero network I/O per request; well under Appwrite rate limits; one file owns
the identity bridge (simpler mental model than route-handlers + DAL for data); battle-tested in
the user's production `mail-fe`.

**Negative / accepted trade-offs.**
- The JWT lives in a **browser httpOnly cookie** (`token`), not purely server-side. Accepted:
  httpOnly + secure + sameSite, short-lived, cleared on logout.
- `proxy.ts` is a **single point of failure** for all API traffic — mitigated by the fail-safe
  `try/catch`; a bug there has a wide blast radius, so it needs the most careful review and
  tests of any file in the app.
- Must run on the **Node.js runtime**, forgoing pure-edge deployment.

**Revisit if:** Appwrite rate limits change, the Backend stops trusting Appwrite JWTs, or we
need edge-only deployment.
