# CONTEXT-MAP — Kepegawaian FE (Perumdam Tirta Satria)

**Multi-context root.** This file holds the **shared core**: the ubiquitous language + the
resolved decisions that **every module reuses** (auth, proxy, data fetching, accessibility, RBAC
mechanism, app shell, form engine, theming…). Per-module **deltas** — the entity data and quirks
that belong to one module only — live in `docs/context/<modul>.md`. **Load only the delta your
task touches**; this core is always in scope.

> **For agents/skills:** read **this file first**. If a task touches a specific module, then also
> read that module's `docs/context/<modul>.md`. If a per-module file doesn't exist yet, proceed
> with the core only (the module hasn't been grilled). System-wide ADRs live in `docs/adr/`.
> The presence of this `CONTEXT-MAP.md` at the root is what signals a multi-context repo.

## Context map (modul → file → load when)

| Konteks | File | Muat untuk | Status |
|---|---|---|---|
| **Core (shared)** | `CONTEXT-MAP.md` (ini) | Bahasa + konvensi lintas-modul | **selalu** |
| **Master** | [`docs/context/master.md`](docs/context/master.md) | Data referensi / master-data (17 entitas CRUD) | ✅ grilling round 1 |
| **Kepegawaian** | [`docs/context/kepegawaian.md`](docs/context/kepegawaian.md) | 3 page (Dashboard/Data/Terminasi), identitas→record pegawai | ✅ grilling round 1 |
| Cuti | `docs/context/cuti.md` | Pengajuan & saldo cuti | ⏳ belum di-grill |
| Penggajian | `docs/context/penggajian.md` | Payroll | ⏳ belum di-grill |
| Laporan | `docs/context/laporan.md` | Pelaporan/rekap | ⏳ belum di-grill |
| Sistem | `docs/context/sistem.md` | Manajemen role, pengaturan | ⏳ belum di-grill |

> **✅ Resolved (grilling kepegawaian) — `riwayat` = sub-area, bukan modul.** Riwayat
> (SK/mutasi/kontrak/SP/terminasi) adalah **sub-area di dalam kepegawaian**, dikonsumsi oleh page
> Dashboard & Terminasi — **bukan** modul ke-7. Rail app-shell tetap **6 modul** (master,
> kepegawaian, cuti, laporan, penggajian, sistem). Lihat [`docs/context/kepegawaian.md`](docs/context/kepegawaian.md).

> **Scope catatan:** DESIGN (spec turunan, `DESIGN.md` + `docs/design/*.md`) masih memakai index
> tunggal berbasis-concern §1–§19; **belum** dipecah per-modul. Referensi silang "CONTEXT §X" di
> DESIGN tetap valid — lihat tabel pemetaan di stub `CONTEXT.md`.

---

## Glossary (shared)

- **Kepegawaian** — the HR/staffing domain of Perumdam Tirta Satria (a regional water utility, PDAM). The app is its front office.
- **Backend / Kepegawaian API** — the Spring Boot REST API at `http://192.168.1.211:8080`. Consumes a Bearer JWT on every call; does **not** issue one.
- **Proxy** — the Next.js `proxy.ts` edge middleware that is the *only* thing allowed to talk to the Backend. Resolves the session, mints/caches the Appwrite JWT, and forwards `/api/proxy/*` upstream via `rewrite` with `Bearer` attached server-side. Hides the internal IP from the browser.
- **Identity bridge** — how a user's Appwrite identity becomes a Backend-accepted JWT. Resolved: the Backend trusts Appwrite-issued JWTs; `proxy.ts` mints the Appwrite JWT and forwards it as `Bearer`.
- **Appwrite Session module** (`lib/auth/appwriteSession`) — the single module that *owns* what an Appwrite session **is**: the session cookie names (the `Secure` primary `a_session_<projectId>` **and** its non-`Secure` `_legacy` fallback), the Appwrite base URL + `X-Appwrite-Project` header, the authenticated-request primitive (attach `Cookie: <name>=<value>`), plus `readSession` / `fetchAccount` / `mintJWT` and the token-cookie policy. Both `proxy.ts` and the DAL `verifySession` are thin callers of it — session knowledge lives in **one** place, not duplicated across the two files. `readSession(get)` takes an injected cookie-lookup so the module imports neither `next/server` nor `next/headers` (unit-testable).
- **Modul** — one functional area of the app (master, kepegawaian, cuti, penggajian, laporan, sistem). Each owns a Tier-1 rail icon (`### App shell`) and — once grilled — a `docs/context/<modul>.md` delta. The **Master module** (reference/master-data) is defined in [`docs/context/master.md`](docs/context/master.md).

## Naming — "proxy" means one thing here (mail-fe pattern)

Since we adopted the **mail-fe pattern**, there is **one** proxy, not two: the Next.js `proxy.ts` middleware does *both* the route guard *and* the data forwarding. There is **no** separate `app/api/**/route.ts` route-handler layer.

- **`proxy.ts`** — Next.js 16's renamed middleware (was `middleware.ts`); `export default function proxy()`. Runs on the **Node.js runtime** (for `fetch`-mint + in-memory dedup `Map`; *not* JWE crypto — see `### Identity bridge` correction). Two jobs: (1) **route guard** — redirect unauth → `/login`, auth-away-from `/login`; (2) **data path** — `rewrite` `/api/proxy/*` to the Backend with a server-minted `Bearer`.
- **`/api/proxy/*`** — the client-facing URL prefix the browser calls; it is *rewritten* (not handled) by `proxy.ts`. The browser never sees the internal IP.
When a doc/issue says "proxy", it means `proxy.ts` — the single edge file.

## Endpoint conventions (uniform across CRUD entities)

Shape is uniform across every module's CRUD entities. Each module declares its **prefix** in its
own context file (Master → `/master`, see [`docs/context/master.md`](docs/context/master.md)); the
verbs/paths below are the shared contract. All go through `/api/proxy/*`, rewritten by `proxy.ts`
with `Bearer`.

- `GET /{module}/{entity}` — paginated + filtered: `page`, `size` (1..100), `sortBy`, `sortDirection` (asc|desc), plus per-field query filters.
- `GET /{module}/{entity}/list` — unpaginated, for dropdowns.
- `GET /{module}/{entity}/{id}` — detail.
- `POST /{module}/{entity}` — create.
- `PUT /{module}/{entity}/{id}` — update.
- `DELETE /{module}/{entity}/{id}` — delete.

---

## Resolved decisions (shared core)

### Identity bridge — Appwrite JWT minted & cached in `proxy.ts` (mail-fe pattern)
The Backend accepts and validates Appwrite-issued JWTs. Flow: browser → `proxy.ts` → Backend. `proxy.ts` resolves the session and forwards the Appwrite JWT as `Bearer` server-side; the internal IP never reaches the browser.

> **Correction (2026-07-07) — cookie-forwarding, not JWE-decrypt.** This section (and ADR-0001)
> originally described mail-fe's **JWE session decryption**. The code does **not** decrypt anything
> and there is no `jose`/JWE dependency: the Appwrite session cookie value is **forwarded verbatim**
> as a `Cookie:` header to mint (`POST /v1/account/jwt`) and to verify (`GET /v1/account`). The
> lifecycle (hot/cold path, dedup, hardenings) stands; only "how the session is read" is corrected
> below. This knowledge now lives in the **Appwrite Session module** (see Glossary).

**Two Appwrite session cookies (browser reality).** Appwrite sets the session as **two** cookies:
`a_session_<projectId>` (**`Secure; SameSite=None`**) and `a_session_<projectId>_legacy` (**no
`Secure` flag**, an HTTP fallback for browsers/contexts that reject the first). **Over plain HTTP
the browser silently drops the `Secure` one and keeps only `_legacy`** — so any reader that looks up
only the primary name finds nothing and bounces the user to `/login` with no error (this was the
login bug). The Appwrite Session module therefore reads **both names** (primary, then `_legacy`).
Dev = HTTP so `_legacy` is what survives; prod = HTTPS so the `Secure` primary is accepted.

**JWT lifecycle (adopted from the production `mail-fe/proxy.ts`, with 4 hardenings):**
- **Two app cookies (distinct from the pair above).** The Appwrite **session** cookie (source of truth, sent by Appwrite) + `token` = a cached httpOnly cookie holding the current Appwrite JWT, `maxAge` set from the JWT `exp`. The `token` cookie is `secure` **only in production** (dev runs HTTP).
- **Hot path (≈99% of requests, zero network):** read the `token` cookie → decode its `exp` (base64, *no* signature verify, *no* Appwrite call) → if still valid past the refresh buffer, attach `Bearer` and `rewrite`. Pure CPU, microseconds.
- **Cold path (≈once per JWT lifetime per user):** `token` missing/near-expiry → forward the session cookie verbatim to `POST /v1/account/jwt` to mint → `Set-Cookie: token`. At ~4 mints/hour/user this uses ~0.07% of Appwrite's 120/60s rate limit.
- **Dedup cache:** a short-TTL in-memory `Map` (≈5s) collapses concurrent mints when several requests fire at once (e.g. a dashboard hitting 6 endpoints).
- **Trade-off accepted:** the JWT *does* live in a browser httpOnly cookie (`token`), not purely server-side. Acceptable because it's httpOnly+secure(prod)+sameSite, short-lived, and this is the same battle-tested production pattern.

**4 hardenings over raw mail-fe (see [ADR 0001](docs/adr/0001-jwt-minted-and-forwarded-in-proxy.md)):**
1. **Pin `proxy.ts` to the Node.js runtime** *(originally for JWE `compactDecrypt`; corrected — no JWE decrypt exists, kept for `fetch`-mint + in-memory dedup `Map`)*.
2. **`try/catch` fail-safe** — if minting throws, redirect to `/login`, never emit a 500. Because *all* API traffic flows through `proxy.ts`, an unguarded throw would take every API down at once.
3. **Clear the `token` cookie on logout** (not just the session cookie) — else a still-`exp`-valid `token` could be replayed for up to one JWT lifetime after logout.
4. **Refresh buffer ≈30s and `duration: 3600`** — a 30s buffer (vs mail-fe's 10s) protects against slow-backend requests arriving after expiry; a 1-hour mint duration means 4× fewer cold-path mints.

### Auth scope (release 1) — login, logout, route protection, change password
In scope: **/login** (email+password → Appwrite → httpOnly session cookie), **logout**, **route protection**, and **change password** on a profile page. Out of scope for release 1: **self-registration** (accounts are created by admin/HR — an internal PDAM app, no public signup) and **forgot-password email reset** (deferred; if Appwrite SMTP is later configured it can be added, otherwise admin resets). Change-password may migrate into the `sistem` module in a later grilling but is acceptable in the profile page for now (visual + placement locked in `### Profile page`).

### Route protection — two layers (Appwrite session, mail-fe proxy)
Protection is **two layers**. With the mail-fe pattern the data path *is* `proxy.ts`, so the guard and the forwarder are the same file — but the DAL is still needed for pages:
- **Layer 1 — `proxy.ts`, at the edge/Node runtime:** for **page navigations**, checks presence of the Appwrite session cookie and redirects to `/login` if missing (and redirects an already-authenticated user away from `/login`). For **`/api/proxy/*` data requests**, it is *authoritative* — no valid session ⇒ no JWT minted ⇒ the `rewrite` never carries a `Bearer`, so the Backend request is rejected. A page that slips past the matcher still cannot fetch data.
- **Layer 2 — DAL `verifySession()`, authoritative for pages:** calls Appwrite `account.get()` on the server, wrapped in React `cache()` (deduped per request). Invoked at the top of **every protected page (server component)** before rendering; on failure it triggers `unauthorized()` / redirect. This is the real gate for *rendering* protected content. Role checks (when needed) use `forbidden()` the same way. (There are no separate route-handlers to guard — data forwarding lives entirely in `proxy.ts`.)

### Session expiry mid-use — distinguish JWT expiry (silent refresh) from session/refresh-token expiry (redirect)
Two different expiries, two different behaviours. The user must **never** see a broken table just because a short-lived JWT lapsed; they **only** get bounced to `/login` when the underlying Appwrite session itself is gone.

- **JWT (`token` cookie) expired → silent, invisible refresh in `proxy.ts`.** When an `/api/proxy/*` request arrives and the cached `token` is missing/past the refresh buffer, `proxy.ts` takes the **cold path** — forward the still-valid Appwrite session cookie → `POST /v1/account/jwt` to mint a fresh JWT → `Set-Cookie: token` → forward with the new `Bearer`. The browser sees **one normal 200**; no toast, no redirect, no user-visible event. This is the common case and is fully handled by the existing JWT lifecycle above.
- **Appwrite session (the "refresh token") expired/revoked → toast + redirect to `/login`.** When the cold path *cannot* mint (session cookie missing or Appwrite rejects the mint), there is no way to recover in place. `proxy.ts` responds to the `/api/proxy/*` call with **401** (and, for a page navigation, redirects to `/login` per Layer 1).
- **Client-side 401 handling (single, centralized).** One global handler in the QueryClient (`QueryCache`/`MutationCache` `onError`) catches **401** from any `/api/proxy/*` response → **one calm toast** "Sesi berakhir, silakan masuk kembali" (deduped by a flag so simultaneous failing queries don't stack toasts) → clear the Query cache → redirect to **`/login?next=<pathname+search>`**. After a successful login the app returns the user to that exact URL (table filters live in the URL, so context is preserved). This is *not* handled per-`useQuery` — it lives in one place.
- **Status-code contract (locked).** **401** = session gone → toast + `/login`. **403** = authenticated but unauthorized → `forbidden` page per RBAC (never a login bounce). **409** = data conflict (e.g. delete with dependents) → inline per Delete UX. Only 401 triggers the session-expiry flow.

### Data fetching — client TanStack Query v5 through `/api/proxy/*`, with memory guardrails
CRUD tables fetch **client-side with TanStack Query v5** (not RSC-reads-searchParams, not a hybrid prefetch), hitting the `/api/proxy/*` prefix that `proxy.ts` rewrites with `Bearer`. Chosen after studying Query's memory model — it is the *lightest* option, not the heaviest, because Query is a self-evicting cache, not accumulated React state.

- **Table = client component `useQuery`.** `queryKey` carries the URL `searchParams` (`page/size/sortBy/sortDirection/{fk}Id`), so every state change is one query. `placeholderData: keepPreviousData` keeps the old page visible while the next loads (`isPlaceholderData` marks the transition) → **no layout shift** on pagination/filter.
- **CRUD = `useMutation` + `queryClient.invalidateQueries`.** After a 200 the affected table query is invalidated → auto-refetch (matches the Delete rule: refetch after success, no optimistic removal).
- **Combobox `/list` = a query with long `staleTime`**, cache **shared** by `queryKey` so the toolbar filter and the form FK dropdown fetch once (the "query cache" the combobox section already relies on).
- **Memory guardrails (mandatory, from TanStack Query v5 docs):**
  - `gcTime` = default **5 min**: when a table's component unmounts (leave the page), its cache is **garbage-collected** — nothing accumulates across entities. At any instant only *one table + the comboboxes currently open* are live.
  - **`staleTime`** ≈ 30s for tables, ≈5 min for `/list` (reference lists change rarely).
  - **Forbidden:** `gcTime: Infinity`; holding large row arrays in `useState`/React Context (that, not Query, is what bloats browser memory). Query owns the cache; components read from it.
- **Rationale vs alternatives:** RSC-only means a full navigation (skeleton flash) per pagination and no client `/list` cache; the hybrid prefetch adds `dehydrate`/`HydrationBoundary` boilerplate per entity — more code, more bug surface, against "simple, minimal bugs". Client Query gives smooth pagination + shared `/list` cache + auto-eviction with the least machinery.

### Accessibility & contrast — prinsip global (±70% pengguna lansia)
**Populasi pengguna Perumdam Tirta Satria ± 70% berusia lanjut**, jadi keterbacaan bukan sekadar estetika tapi **syarat fungsional**. Prinsip ini menular ke SEMUA komponen (tabel, form, sidebar, top bar, tombol, toast), bukan hanya layar daftar:
- **Kontras teks minimal WCAG AA+**: teks utama pada latar ≥ **7:1** (target AAA), teks sekunder/muted ≥ **4.5:1**. Token `--muted-foreground` TIDAK boleh terlalu pucat — nilai abu harus lolos 4.5:1 di atas latar barisnya (termasuk baris zebra/hover). Aksen **Evergreen (hijau pinus)** `--primary oklch(0.48 0.09 158)` dipakai untuk aksen/aksi (AA 6.07:1), TIDAK untuk teks tubuh kecil di atas putih kecuali lolos kontras.
- **Ukuran & target sentuh**: font tubuh **≥ 16px terkunci** (base body = `--text-body` 1rem; presbyopia 35+, jangan 12–15px), baris tabel & tombol tinggi ≥ **44px** area klik. Ikon aksi (Edit/Hapus) minimal **20px** dengan padding sehingga area sentuhnya ≥ 40px. Skala ukuran lengkap di `### Typography`.
- **Jangan andalkan warna saja**: status/severity (mis. Ringan/Sedang/Berat, sukses/gagal) selalu disertai **teks/label atau ikon**, bukan cuma warna — mengakomodasi buta warna & katarak.
- **Focus ring jelas** (keyboard & tremor tangan): ring tebal kontras di setiap kontrol interaktif, jangan dihilangkan.
- Ini diformalkan jadi checklist di DESIGN.md (kontras token, ukuran font, tinggi baris, focus ring) dan wajib dicek saat implementasi tiap komponen.

### Typography — satu family Inter, di-self-host, dioptimalkan untuk keterbacaan lansia
Seluruh UI memakai **satu typeface: Inter** — sans-serif humanis dengan bentuk huruf terbuka yang dirancang untuk layar. Dipilih karena legibilitas lansia (populasi ±70% orang tua, lihat `### Accessibility & contrast`): huruf yang mudah tertukar dibedakan jelas (`l` vs `1` vs `I`, `O` vs `0`, `rn` vs `m`), sehingga kode/nama/angka data referensi tidak salah baca.
- **Self-hosted via `next/font`** (Next mengunduh & menyajikan font dari origin sendiri — **nol request eksternal ke Google saat runtime**, cepat & privat, sesuai preferensi ringan/tanpa slop). `display: swap` + fallback metrics → **nol layout-shift**.
- **Angka tabular wajib di tabel** (`font-feature-settings: "tnum"` / `tabular-nums`) untuk kolom angka (mis. potong TKK %, level) agar digit rata vertikal & mudah dibandingkan mata lansia.
- **Skala berat terbatas:** 400 body, 500 label, 600 heading/tombol. **Dilarang** berat ≤300 (thin/light) — goresan tipis buruk untuk penglihatan lansia; ini melengkapi aturan ukuran ≥16px di `### Accessibility & contrast`.
- **Satu family saja** (bukan pasangan heading+body) — lebih ringan, konsisten, dan menghindari slop. Geist & font-sistem ditolak (legibilitas/angka tabular & konsistensi lintas-OS kalah tipis).

**Skala ukuran (base 16px terkunci — presbyopia 35+, WCAG SC 1.4.12; riset usia + Baymard). Sumber lengkap `docs/design/visual-foundation.md §3.2–§3.5.**
| Token | Ukuran | Line-height | Pakai |
|---|---|---|---|
| `--text-xs` | 0.75rem (12px) | 1.333 | metadata SAJA (timestamp, hint) — jangan untuk teks yang harus dibaca |
| `--text-sm` | **1rem (16px)** | 1.5 | **BODY** — di-override dari default Tailwind 0.875rem (14px) → 1rem, jadi semua `text-sm` mengalir sebagai body 16px |
| `--text-base` | 1rem (16px) | 1.5 | heading dibedakan lewat **berat** (600), bukan ukuran |
| `--text-body` | 1rem (16px) | `--leading-body` 1.6 | base `body{}` |

- **Line-length prosa ≤ 75ch** (Baymard); tabel & form tidak dibatasi (data padat).
- **Letter-spacing:** normal untuk body; `tracking-wider` (0.05em) HANYA untuk header all-caps.
- **Token semantik `@theme` (Tailwind v4)** — bukan utility per-px tebar:
  ```css
  @theme inline {
    --text-xs: 0.75rem; --text-sm: 1rem; --text-base: 1rem;
    --text-body: 1rem; --leading-body: 1.6;
  }
  @layer base { body { font-size: var(--text-body); line-height: var(--leading-body); } }
  ```
  `body{font-size:15px}` lama = hardcoded, sudah dimigrasi ke `var(--text-body)`. Stack komponen bersama (`data-table*`, `crud-form`, `entity-form-modal`, `master-client`, `ui/table`) mewarisi via cascade `text-sm`→16px. Nol `font-size`/`text-[..px]` hardcoded di stack (gate grep). Status pilot: `dqx.8.1/.2` selesai, `dqx.8.3` fan-out QA regresi pending.

### List-screen anatomy — toolbar tipis + tabel medium-density + sticky header
Semua halaman daftar CRUD memakai satu anatomi (opsi A yang disetujui), dirender lewat `<DataTable>` bersama (untuk Master ini berlaku ke ke-17 entitasnya — lihat [`docs/context/master.md`](docs/context/master.md)):
- **Toolbar tipis**: kiri = 1 input **search** (debounced → param server `search`/filter, lihat `### DataTable filtering`); kanan = tombol primer **"+ Tambah"** (Evergreen/hijau pinus solid, teks putih, kontras tinggi).
- **Density medium**: tinggi baris nyaman (≥44px) — bukan compact bengkak, bukan longgar boros; target 15–25 baris muat tanpa scroll di laptop. **Zebra striping** halus antar-baris untuk memandu mata pengguna lansia; **hover** baris jelas.
- **Aksi baris** di kolom paling kanan: **ikon Edit + Hapus langsung** (bukan menu `⋮` titik-tiga — hanya 2 aksi, klik langsung lebih cepat, hemat 1 klik, tanpa slop). Ikon ≥20px, area sentuh ≥40px. **Klik di mana saja pada baris** = buka Edit (Dialog/Sheet sesuai `### CRUD form presentation` & Heavy-form layout di delta modul); ikon Hapus → `<ConfirmDeleteDialog>` (409 tetap inline, lihat `### Delete UX`).
  - **Pengecualian sempit — tabel dengan panel/kartu detail bergantung baris:** bila di halaman itu ada panel atau kartu yang isinya milik **satu baris** (bukan milik halaman), maka **klik-baris = pilih baris** (baris terpilih di-highlight, id-nya masuk `searchParams`) dan Edit hanya lewat ikon ✎. Kolom Aksi tetap ikon langsung — pengecualian ini **tidak** membuka pintu untuk menu `⋮`. Contoh: Data Pegawai (baris → `RingkasanPanel`) dan Riwayat Pegawai (baris → kartu Lampiran, karena `GET /kepegawaian/lampiran/list/{ref}/{refId}` butuh `refId` baris).
- **Footer paginasi**: kiri info "Menampilkan {a}–{b} dari {total}", kanan pemilih ukuran (10/20/50, sesuai batas API size 1–100) + kontrol halaman. `<DataTablePagination>` tetap mounted melintasi semua table-state.

**Sticky header (WAJIB, modifikasi komponen shadcn):** header tabel bawaan shadcn TIDAK sticky. `<DataTable>` HARUS memodifikasi `<TableHeader>` agar **sticky di atas** saat body di-scroll (`position: sticky; top: 0`), dengan **latar solid** (bukan transparan, agar baris di bawahnya tidak tembus) + **z-index** di atas baris + garis/subtle shadow pemisah bawah. Ini penting untuk pengguna lansia: nama kolom selalu terlihat saat menelusuri daftar panjang, mengurangi disorientasi. Pola implementasi: bungkus tabel dalam wrapper ber-`max-height`/scroll sendiri (bukan scroll seluruh halaman) supaya `sticky top-0` punya konteks scroll yang benar; header pakai token latar solid yang sama dengan permukaan card. Spesifik teknis (class Tailwind, wrapper overflow) diformalkan di DESIGN.md.

### Table states — loading / paginating / error / empty (map 1:1 to Query state), all lightweight
Each visible state maps to exactly one TanStack Query signal, so there is no guesswork and no bespoke state juggling:
- **`isPending`** (no data yet) → **skeleton rows** mimicking the columns.
- **`isPlaceholderData`** (changing page/filter, previous rows still shown via `keepPreviousData`) → the old rows stay, **dimmed (~opacity 50%) with a small spinner in the toolbar** — **no** skeleton, so no flicker/layout-shift.
- **`isError`** → an **inline red panel** inside the table area + a **"Coba lagi"** button wired to `refetch()`; the toolbar stays alive (filters not lost). Never a bare toast for a failed table load.
- success but **`data.length === 0`** → an **empty state** that distinguishes *no data yet* (primary action **"+ Tambah"**) from *filter returned nothing* (action **"Reset filter"**).

The `<DataTableToolbar>` and `<DataTablePagination>` stay mounted through all of these — only the row region swaps.

**Lightness rule (mandatory):** these state components must be **cheap** — skeleton is **pure CSS** (`animate-pulse`, empty divs, zero JS/lib), empty & error are **static markup** (one lucide icon + text + at most one button) — **no** Lottie/animated-SVG/illustration bundles. Spinner is CSS `animate-spin` on a small lucide icon. Skeleton renders **only** on `isPending`, never per-pagination. State components add ~0 to the bundle and never re-render heavily.

### CRUD form presentation — Dialog default, Sheet for heavy forms, mounted once per page
The Create/Edit form renders in a **Dialog** for the short-form majority (2–6 fields: golongan, level, most entities) — fast, keeps the table visible behind it. The few heavy forms (per each module's delta — for Master: **sanksi**, **profesi**) upgrade to a **Sheet** (right drawer) for room. Both are the same `<CrudForm>` primitive in a different container.

**Performance rule (mandatory):** the form container is mounted **once at page level**, its open state + current row lifted to the page (`editing` state) — NEVER one `<Dialog>`/`<Sheet>` per table row. The shadcn data-table row-actions example nests a menu per row; the row action must only call `setEditing(row)`, not instantiate a dialog. Base UI Dialog/Sheet content is lazy by default (not in the DOM until `open`; `keepMounted` defaults to `false`), so idle cost ≈ zero and page-open stays fast. FK dropdown `/list` calls fire on **form-open**, not on table render, so opening a CRUD page = a single paginated GET.

**Visual grammar (locked — one `<CrudForm>` body, two containers):** single column, **label-on-top** (never left-aligned inline labels) — most readable for elderly and identical on mobile/desktop. Fields are large per `### Accessibility & contrast` (input height ≥44px, label ≥16px, clear focus ring). A **pinned action footer**: secondary **Batal** left, primary **Simpan** (Evergreen/hijau pinus, white text) right; in the heavy Sheet the footer is **sticky** so Simpan is always reachable without scrolling to the bottom. On submit the button enters a loading state (spinner + "Menyimpan…") and disables to prevent double-submit. **Errors render inline inside the form** (Zod field errors under their field; a submit-level error sits above the footer) — never a toast for validation. The heavy Sheet keeps the same single-column body but adds the capitalised section headers + switch list from the module's Heavy-form layout. Two-column and horizontal-label layouts were rejected (zigzag eye-path / dual mobile pattern).

### DataTable filtering — combobox-of-id filters + URL state
CRUD filtering is driven primarily by **comboboxes**, not a free-text box: options come from `/{module}/{entity}/list`, and the value sent to the backend is the option's **id** (e.g. picking "IPA Selatan" sends `?organisasiId=42`, not the text). This fits FK-filtered entities (the concrete FK graph per module lives in its delta). A debounced free-text filter is the minority case, only for flat entities that need name search.

All table state is synced to the **URL as the single source of truth** — but it stores the **id** (`?page=&size=&sortBy=&sortDirection=&organisasiId=42`), and the combobox reads the id back from the URL and renders its label. This keeps browser back/forward, refresh (no reset), and bookmark/share working, and the page reads `searchParams` → one request per change. Sort is via header click.

**Filter controls live OUTSIDE the table.** The search/combobox UI is NOT column-header filters inside the table; it is a separate **`<DataTableToolbar>`** component sitting **above** the table — cleaner and easier to understand. The table primitive splits into three shared pieces every entity composes:
- **`<DataTableToolbar>`** — control zone above the table: searchable filter comboboxes + the "Tambah" button. Not attached to column headers.
- **`<DataTable>`** — pure row presentation + sort via header click; contains no filter UI.
- **`<DataTablePagination>`** — footer: page nav + page-size + total count.
Each entity injects only its `columns` and toolbar filter config.

**Combobox behavior (used in toolbar filters AND form FK dropdowns):** fetch `/{module}/{entity}/list` **once**, cache it per-entity (query cache), and search/filter **client-side** in memory — instant, no request per keystroke. `/list` has no search param (it's unpaginated by design), so client filtering is the intended model; even hundreds of rows are a small payload. The cache is **shared**: the same list serves both the toolbar filter and a form FK dropdown → one fetch. Tree entities render flat in the combobox (with path/indent) for filtering; choosing a *parent* on create is a separate concern (see the tree entity's delta).

### Tree entities — flat table with a "Parent" column
Self-referencing (`parentId`) entities are served by the backend as a **flat list + `parentId`**, with no tree-traversal/lazy-children endpoint. So their list pages use the **same `<DataTable>`** as every other entity — no bespoke tree widget. Hierarchy is shown as a plain **"Parent" column** (the parent's name, resolved from `parentId` via the shared `/list` cache) and is **filterable per-parent** through a toolbar combobox. Rationale: an expand/collapse tree or a split tree-panel would need per-node server support that doesn't exist and would break standard pagination — heavier and more bug-prone, against "simple, minimal bugs". The genuinely tree-specific concern (preventing cycles) lives in the **parent picker inside the form**, not in the table. (Which entities are trees lives in each module's delta.)

### Parent picker in form — flat combobox that disables the subtree
Choosing a parent for a tree entity reuses the **same Combobox** as everywhere else (toolbar filters, FK dropdowns) — no bespoke tree-picker. Options render **flat with path/indent**. Cycle prevention is done **client-side before submit**: when editing a node, the node **itself and all its descendants are disabled** (the client computes the subtree from the already-cached `/list` payload), so a node can never be reparented under its own child. On **create** the node has no descendants yet → every option is valid, plus a "**Tanpa parent (root)**" choice. The backend still validates against cycles as **defense-in-depth**, but the FE prevents the mistake up front instead of surfacing a post-submit 400.

### Delete UX — reusable `<ConfirmDeleteDialog>`, type `HAPUS`, structured 409
Deletes are guarded by a single **reusable, entity-agnostic** `<ConfirmDeleteDialog>` (an AlertDialog) used identically by every CRUD entity. It takes `title` / `itemLabel` / `onConfirm` and requires the user to type the **constant word `HAPUS`** (not the row's name, so it generalizes without knowing the entity) to enable the Hapus button. **No optimistic removal** — the row is removed only after the backend returns 200. On a **409 (referenced by other entities)** the dialog **stays open** and shows an inline red message explaining *why* — e.g. "Tidak bisa dihapus: dipakai oleh 4 Grade" — using the backend's reason where available, never a generic toast. Success → dialog closes, success toast, table refetch.

### RBAC — Appwrite Labels + central per-entity×per-action permission map
Authorization is **role-based**, but roles are defined by the user *later* — release 1 builds the **mechanism**, not a hardcoded role list. The FE never hardcodes `"admin"`; it reads roles from the session and checks a central map.

- **Role source — Appwrite Labels.** A user's roles = their Appwrite `labels` array (e.g. `["hr","viewer"]`), which arrives **free inside `account.get()`** (already called by the DAL) — zero extra network. The user assigns labels per-user via the Appwrite console/API. Read behind a single helper `getRoles(session)` so the source can later swap to Teams without touching callers.
- **Permission map — per-entity × per-action.** One central file (e.g. `lib/auth/permissions.ts`) maps `role → entity → action[]`, where action ∈ `view | create | update | delete`. A `*` entity key is the per-role default. Example:
  ```
  PERMISSIONS = {
    hr:     { golongan: ['view','create','update','delete'], organisasi: ['view'], /* ... */ },
    viewer: { '*': ['view'] },
  }
  ```
- **Single check API.** Everything calls `can(roles, action, entity)` — never `role === 'admin'`. This one signature is fixed from day one so the map can grow finer without changing call sites.
- **Enforcement (defense in depth).** UI: **unmount** (do NOT render — not CSS-hide/disable) Tambah/Edit/Hapus when `!can(...)`. Page/render: DAL calls `forbidden()` (→ `forbidden.tsx`) when a role lacks `view` on an entity. Data: `proxy.ts` is the hard gate — a request the role can't perform is rejected server-side, so an absent button is convenience, not the security boundary.
- **UI enforcement rule (locked) — unmount, don't disable.** Unauthorized actions are **never rendered** (component returns `null`), not shown greyed-out or via `display:none`. Rationale: (1) cleanest for elderly — UI shows only what the user can actually do, zero disabled-grey clutter (disabled buttons are low-contrast, against `### Accessibility & contrast`); (2) lighter — the element, its handlers, and its state never enter the React tree, so idle cost is zero; (3) can't be "un-hidden" via inspect-element like a CSS-hidden node.
  - **Tambah** not rendered when `!can(create)`. The row **Aksi column** is not rendered at all when the role has neither `update` nor `delete`; when it has only one, only that icon renders.
  - **Row-click-to-Edit** (per `### List-screen anatomy`) is disabled when `!can(update)` — the row stays readable but non-interactive.
  - An entity the role can't `view` **does not appear in the sidebar** at all (per `### App shell`) — not rendered as a sub-item; and a module group with no view-able entity is not rendered at all. Not shown-then-forbidden; DAL `forbidden()` is only the safety net for a directly-typed URL.
  - Applied consistently across all entities via one small render helper `<Can action entity>…</Can>` that renders `null` when the check fails.
- **Release 1 seeds no real roles** — the map ships with a sane default (e.g. a write role + a read-only `viewer` via `*`), and the user fills in the actual per-label matrix. Managing roles through a UI is deferred to the `sistem` module.

### App shell — single-tier sidebar (collapsible-to-icon; modules as collapsible groups, entities as sub-items)
The dashboard frame is a **single-tier collapsible-to-icon left sidebar** — the shadcn **sidebar-07** pattern on Base UI. It **replaces** the earlier two-tier sidebar-09 (rationale for the reversal: [ADR 0005](docs/adr/0005-sidebar-07-collapsible.md)). Install via `npx shadcn add sidebar` (Base UI) — **do not hand-write it**; that install also pulls in the `collapsible` + `tooltip` primitives. Full detail in [`docs/design/app-shell.md`](docs/design/app-shell.md) §6.
- **Modules = collapsible groups; entities = sub-items** (the `NavMain` shape): each module (master, kepegawaian, cuti, laporan, penggajian, sistem) is one accordion group whose entities are text sub-items. **Icons live only on the module-group row**, not on entities.
- **All view-able groups default OPEN** (most legible for elderly users — no hidden menus). Users may collapse a group, but group open/closed state is **not persisted** — every load returns to all-open (so an elderly user can never permanently "lose" a menu).
- **Collapse-to-icon** (whole sidebar → icon rail): default **expanded**; collapse state **is persisted** (`SidebarProvider` cookie, across sessions). When collapsed only **module icons** show (the old rail reappears) with hover tooltips. Because the default never changes on its own, navigation stays constant for users who don't opt into collapse. `SidebarTrigger` lives in the **top bar, far left** (§12 loosened: a nav toggle is a layout control, not a forbidden feature).
- **RBAC:** entities the role can't `view` are not rendered as sub-items; a **module group with no view-able entity at all is not rendered** (no empty groups). Release 1 → sidebar shows **Master** (17 entities) + **Kepegawaian** (3 entities: Dashboard, Data Pegawai, Terminasi) modules, both open. The other four modules (cuti, laporan, penggajian, sistem) have no entities yet so they don't appear. A module appears automatically once its entities are grilled & wired.
- **Header** = app logo/name "Kepegawaian" (shrinks to initial/icon when collapsed). **Footer empty** — the user menu stays in the **top bar** (§12), it does **not** move into the sidebar footer.

**60:30:10:** content surface = 60% (white/near-white), the sidebar = 30% (neutral), Evergreen (hijau pinus) = 10% accent (active module/entity, primary buttons, focus rings).

Responsive — **mobile-friendly is mandatory, not an afterthought** (staff open this on phones): narrow screens use the `sidebar` primitive's **built-in off-canvas** behavior (Sheet slide-in behind the hamburger = `SidebarTrigger`); tapping an entity closes the drawer and navigates. The content area goes full-width. Accept the built-in behavior as-is — the only tuning is **menu row height ≥44px** (`SidebarMenuButton`) for elderly users. **DataTables degrade gracefully on mobile**: horizontal scroll within the table region (toolbar + pagination stay fixed/stacked, not scrolled off), tap targets ≥44px, the toolbar filter comboboxes and "Tambah" stack vertically. Dialog forms stay usable at small width; heavy Sheet forms become full-width on mobile. Keep the shell **lightweight** — no heavy nav animations. Every screen is verified at a ~375px viewport as an acceptance criterion.### Theming — light + dark mode, both active via `next-themes` toggle

Release 1 supports **both light and dark modes**. A `next-themes` toggle in the UserMenu switches between themes. All colors are authored as OKLCH design tokens via Tailwind v4 `@theme` + shadcn CSS variables (`--background`, `--foreground`, `--primary`, …) — **never** hardcoded hex/`oklch(...)` literals inside components. The `.dark { … }` block in `globals.css` is fully populated with dark token values.

> **⚠️ Status palet:** Palet saat ini memakai **Evergreen (hijau pinus)** `--primary: oklch(0.48 0.09 158)` sebagai aksen untuk pengembangan. Nilai ini **masih dalam proses pengajuan** ke atasan — lihat [`docs/color-rationale.md`](docs/color-rationale.md) yang mengusulkan **Tirta Blue** (`oklch(0.55 0.13 235)`). Warna dark mode juga akan menyesuaikan setelah light theme final. Palet final ditentukan setelah pengajuan disetujui.

**Palette 60:30:10 — evidence-based "A-refined" (dioptimalkan untuk ±70% pengguna lansia).** Riset menua-mata (lensa menguning menyerap biru, kontras & diskriminasi biru-hijau turun, saturasi tinggi di area luas melelahkan, TAPI mata tua butuh kontras teks LEBIH tinggi) mengarahkan penyesuaian nilai — struktur 60:30:10 tetap. Rasional lengkap + sumber di **`docs/color-rationale.md`** (bahan pengajuan ke atasan).
- **60% canvas** — abu-abu kebiruan netral (bukan putih hangat): `--background: oklch(0.94 0.005 250)` (~#EDEFF2). Latar sengaja digelapkan agar card putih (100% white) 'mengambang' — memberikan elevation visual jelas untuk audiens 35+. **Nilai implementasi sementara** — menyimpang dari usulan `color-rationale.md` (off-white hangat `oklch(0.99 0.008 85)`); akan difinalisasi saat palet disetujui.
- **30% struktur** — netral hangat nyaris tanpa chroma: `--card/--muted/--secondary` netral hangat; **border dinaikkan kontrasnya** agar garis tabel/zebra/pemisah terlihat (hindari pastel-ke-pastel yang menyatu di mata tua).
- **10% aksen** — Evergreen (hijau pinus) **sementara** `--primary: oklch(0.48 0.09 158)` HANYA di area kecil (tombol primer, item aktif, focus ring); `--ring` sama, `--primary-dark: oklch(0.36 0.08 158)`. **⚠️ Status: masih dalam proses pengajuan** — lihat note palet di atas.
- **Teks kontras-tinggi (bukan pucat):** `--foreground: oklch(0.22 0.01 260)` (target AAA ≥7:1); `--muted-foreground: oklch(0.4 0.01 260)` (dinaikkan dari abu pucat, tetap ≥4.5:1 di atas semua permukaan termasuk baris zebra/hover).
- **Semantik — jangan bergantung pada sumbu biru↔hijau (yang rusak di mata tua), SELALU + ikon/teks:** `--destructive` merah; `--success: oklch(0.52 0.1 195)` **teal** (digeser jauh dari hue primary hijau agar tak tertukar); `--warning` amber. Tiap-tiap punya pasangan `-foreground`.
- Nilai implementasi ini (palet **Evergreen** sementara di `globals.css :root` + `.dark`) lolos contrast-gate; angka di atas adalah baseline implementasi yang akan difinalisasi saat pengajuan palet disetujui.

### Top bar — breadcrumb minimal + menu pengguna (nama/email/theme/Keluar)
Top bar app-shell (sticky, di atas setiap halaman) berisi breadcrumb rata-kiri + menu pengguna rata-kanan. Hanya dua hal: **tidak ada** kotak pencarian atau lonceng notifikasi di rilis 1 (kontrol tanpa API pendukung = slop; sisakan ruang). Menu pengguna berisi nama/email, item **Profil**, **toggle tema** (light/dark lewat `next-themes`), dan **Keluar**.
- **Breadcrumb** `{Modul} / {Entitas}` (mis. "Master / Sanksi") sekaligus jadi judul halaman — halaman TIDAK mengulang `<h1>` besar. Di mobile menciut ke nama entitas aktif + hamburger `[≡]`.
- **Menu pengguna** = tombol avatar-inisial → menu kecil berisi **nama + email** (dari DAL `account.get()`, tanpa fetch tambahan), pembatas, lalu dua aksi: **"Profil"** (→ `/profil`, lihat `### Profile page`) dan **"Keluar"** (logout → hapus cookie `token` & sesi → `/login`).
- **Rilis 1: sumber nama/email = Appwrite `account.get()`.** Satu-satunya halaman akun adalah `/profil` (info akun read-only + ganti password); tak ada pengaturan lain di rilis 1.
- **CATATAN LANJUTAN (modul kepegawaian) — ✅ identity bridge sudah diresolusi:** menu pengguna nanti diperkaya menampilkan **nama, jabatan & posisi** yang di-fetch dari **endpoint pegawai** (bukan lagi hanya dari `account.get()`). Bridge-nya **bukan** lewat email: `session.$id` (Appwrite) **= `pegawaiId`**, dipakai langsung ke `GET /pegawai/{$id}` — via fungsi opt-in **`getPegawaiSession()`** (`cache()`-wrapped), sementara `verifySession()` tetap murni 1-fetch. Ini menjelaskan kenapa struktur menu pengguna dibuat sebagai komponen tersendiri yang menerima data identitas — sumber datanya bisa diperkaya tanpa membongkar top bar. Detail lengkap: [ADR-0006](docs/adr/0006-pegawai-session-identity-bridge.md) + [`docs/context/kepegawaian.md`](docs/context/kepegawaian.md).

### Form engine — React Hook Form + Zod via shadcn `<Field />` (satu `<CrudForm>`)
Semua form CRUD memakai **React Hook Form (RHF) v7 + Zod** (`zodResolver`), dirender lewat komponen **shadcn `<Field />`** (di v4 `<Field />` sudah dipisah dari state library, jadi kompatibel dengan Base UI apa pun engine-nya). Dipilih di atas TanStack Form / native Server Actions karena paling stabil, paling ringan (uncontrolled/ref-based, ~9kB, re-render minimal), dan paling mudah untuk junior dev (pola `useForm({ resolver: zodResolver(schema) })` + `handleSubmit` ada di setiap contoh shadcn). Rincian trade-off ada di **ADR 0002**.
- **DRY:** satu primitive **`<CrudForm>`** memegang seluruh boilerplate RHF (wiring resolver, submit, pemetaan error backend, `isSubmitting`). Tiap entitas hanya menyuplai **skema Zod + daftar field** — bukan logika form sendiri-sendiri.
- **KISS:** field berat (mis. sanksi 8 switch, profesi FK — lihat delta modul) hanyalah deskriptor field, bukan form khusus. Junior cukup menulis skema Zod, tidak menyentuh mekanik form.
- **Alur:** skema Zod per-entitas → `zodResolver` → RHF `useForm` → markup `<Field>` → input/switch/combobox Base UI.
- Skema Zod jadi satu-satunya sumber kebenaran validasi client; wajib selaras dengan `required`/`minLength`/`minimum` di OpenAPI backend tiap entitas.

### Notifications — one global Sonner toaster, bottom-right, action-results only
A single global `<Toaster>` (**sonner**, Base UI-compatible, lightweight) mounted once in the root layout, positioned **bottom-right**. Toasts are strictly for **action (mutation) results**, never for data-load status:
- **Success** (create/update/delete returned 200) → green check toast, **auto-dismiss ≈3s** ("Tersimpan" / "Terhapus").
- **Action error** (a mutation failed) → red toast, **manually dismissible** (stays until closed), with the backend reason where available.
- **Data-load failure is NOT a toast.** A failed table/query load uses the **inline "Coba lagi" panel** inside the table region (see the table-states rule) — so the user keeps filter context and can retry; a transient toast would lose both.
- **Rule of thumb:** toast = feedback on *something the user just did*; inline UI = status of *data being displayed*. This prevents toast floods (e.g. several queries failing at once) and keeps the two channels unambiguous. Delete's 409 stays inline in its dialog (per Delete UX), not a toast.

### Dashboard landing — welcome page, extensible for future modules
Login lands on a **welcome page** (route `/` or `/dashboard`), **not** straight into a table:
- **Greeting header:** "Selamat datang, {nama}" + a one-line context (release 1: "Modul Master · data referensi"). Name comes from the DAL `account.get()` already in hand — no extra fetch.
- **Shortcut grid:** cards linking to the active-scope entities (release 1 = the 17 Master CRUD entities; content in [`docs/context/master.md`](docs/context/master.md)). Static cards, **no per-entity count queries** (honest for release 1 — no invented pegawai statistics = no AI slop; and lightweight — the landing does ~0 data fetching).
- **Extensible by design:** the area **below** the shortcuts is a deliberate **slot reserved for future modules** (kepegawaian, cuti, penggajian, laporan) — real stat cards / summaries land here once those modules exist. Release 1 leaves it empty or with a subtle "akan hadir" placeholder; the layout is built so adding a stats row later needs no restructure.
- **Lightness:** cards are static markup (lucide icon + label), no charts/widgets/count-fetches in release 1.

### Login page — split layout, animated brand panel (CSS-only), minimal form
The **/login** screen is a **two-column split**:
- **Left = brand panel** in Evergreen (hijau pinus): logo + "Perumdam Tirta Satria" + short tagline. This panel carries a **living background** so login feels alive without weight.
- **Right = form card** on a neutral-white surface: email + password + a single **Masuk** button (Evergreen/hijau pinus). **No** signup link, **no** "lupa sandi" link in release 1 (out of auth scope). Inline field validation; a failed login shows one inline error above the button (never a bare toast).
- **60:30:10 respected:** the green brand panel is the ~30–40% side column, form area is the 60% neutral surface, Evergreen button/focus rings are the 10% accent — the green is confined to one column, not the whole screen.
- **Split ratio ≈ 45:55** (brand left : form right) on desktop ≥1024px. Brand panel carries logo + "PERUMDAM TIRTA SATRIA" + "Sistem Kepegawaian" + tagline "Melayani dengan Sepenuh Hati".
- **Elderly-first form (±70% lansia):** large, high-contrast fields (label ≥16px, input height ≥44px, clear focus ring), generous spacing, password field has a **reveal toggle (👁)** so seniors can verify what they typed. Fields comfortably lead so the form never feels cramped.
- **Help affordance:** a quiet "Butuh bantuan? Hubungi admin" line below the button (no self-service reset in release 1 — out of auth scope).

**Background animation — CSS-only, water motif, mandatory lightness.** The brand panel's background is a slow-drifting Tirta-Blue **gradient** ("water" motion) using pure CSS `@keyframes` — **zero JavaScript, zero library, zero image files, ~0 KB** added to the bundle. Animate only GPU-cheap properties (`background-position`/`transform`/`opacity`), loop ≈12–20s, subtle. **MUST honor `prefers-reduced-motion: reduce`** → freeze to a static gradient for motion-sensitive users. No `<canvas>`/requestAnimationFrame, no particle libs, no animated SVG/Lottie. The animation lives **only** in the brand panel; the form column stays perfectly still for legibility.

**Mobile:** the brand panel collapses to a compact header (logo + name, same drifting gradient, shorter) stacked above the form; single column at ~375px. Form remains full and usable.

### Profile page — one `/profil` route, account info + change password (release 1)
Change-password (in auth scope, see `### Auth scope`) lives on a dedicated **`/profil` page**, reached from a new **"Profil"** item in the top-bar user menu (which today holds only nama/email/Keluar — see `### Top bar`). Not a dialog: change-password needs 3 fields + validation + a clear success/failure state, so a full page reads better for elderly users. The page is **two stacked cards**:
- **Card 1 — "Informasi Akun" (read-only):** nama, email, peran, sourced from the DAL `account.get()` already in hand (no extra fetch). Not editable in release 1 (accounts are managed by admin/HR — internal PDAM app).
- **Card 2 — "Ganti Password" (form):** 3 fields — password lama, password baru, konfirmasi password baru — each with the same **reveal toggle (👁)** as login. Calls Appwrite `updatePassword(new, old)`. **Zod validation:** baru ≠ lama, konfirmasi = baru, minimum length; errors render **inline** (per the form grammar in `### CRUD form presentation`), never a bare toast. Success → success toast "Password berhasil diganti" + form reset. The primary button is **Ganti Password** (Evergreen/hijau pinus), bottom-right of the card.
- **Fields are elderly-first** (height ≥44px, label ≥16px, clear focus ring) — identical to login. Single column, label-on-top.
- **Migration note:** this page may later fold into the `sistem` module (per `### Auth scope`); the route/component is built standalone so that move is a relocation, not a rewrite.

### UI component base — Base UI (not Radix) [ADR-0004](docs/adr/0004-base-ui-as-shadcn-default.md)
shadcn is initialized with **Base UI** (`npx shadcn init -b base`), not Radix. Rationale: lighter/more modern architecture from the same team, and the direction shadcn defaults to as of 2026-07. Trade-off accepted: Base UI is newer as the default (~1 month), so agents must verify component props against the **Base UI** docs/registry, not Radix (prop names differ, e.g. `keepMounted` vs Radix `forceMount`). All shadcn `add` commands pull from the Base UI registry.
