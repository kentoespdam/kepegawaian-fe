# Refactor Tracker — Amplop Generic & Query-Param Filter Types

Parent beads: **kepegawaian-fe-oon** — Generic `Envelope<T>`/`PageEnvelope<T>`/`Page<T>` di `extract-types.js` (deteksi by-structure) + query-param filter types.

Tracker ini adalah papan monitoring untuk agent yang mengerjakan sisa pekerjaan.
**Aturan klaim:** ambil issue paling atas yang `open` & tidak diblokir → `bd update <id> --claim` → kerjakan → centang checklist di bawah → `bd close <id>` → `git push` + `bd dolt push`.

---

## Status ringkas

| # | Beads | Judul | Scope | Depends on | Status |
|---|-------|-------|-------|-----------|--------|
| 0 | oon | Generic amplop collapse (Candidate 1) | extract-types.js | — | ✅ DONE (uncommitted) |
| 1 | bo3 | Repoint `src/lib/api/types.ts` → `_shared.ts` | runtime | — | ⬜ open |
| 2 | c8z | `client.ts handle()` narrowing union | runtime | bo3 | ⛔ blocked |
| 3 | 05q | Verifikasi `Page<T>` optional + quality gates | runtime | bo3, c8z | ⛔ blocked |
| 4 | 5eo | Candidate 2: query-param filter types | extract-types.js | — (perlu grill desain) | ⬜ open |

---

## Urutan klaim (claim order)

1. **bo3** — repoint types.ts (tidak diblokir, mulai dari sini)
2. **c8z** — narrowing client.ts (setelah bo3)
3. **05q** — verifikasi + quality gates (setelah bo3 & c8z)
4. **5eo** — Candidate 2 (independen, tapi **grill desain dengan user dulu**)

---

## Konteks yang sudah dikunci (JANGAN diubah tanpa konfirmasi user)

- **Deteksi BY-STRUCTURE, bukan by-name.** Wrapper dikenali dari bentuk set-properti, bukan nama tipe.
- **`Envelope<T>` = discriminated union 2-cabang (inline `never`):**
  - 2xx: `{ status, statusText?, message, data: T, errors?: never, timestamp? }`
  - error: `{ status, statusText?, message?, data?: never, errors: string \| string[], timestamp? }`
- **`errors: string \| string[]`** (Q3 — error masa depan tak selalu array).
- **`PageEnvelope<T>` sengaja OMIT `errors`/`message`** — backend selalu balikan pageable dengan `content: []`, tak pernah errors/message → tak butuh union.
- **`Page<T>` generated = semua field OPTIONAL** (spec-faithful). Ini beda dari runtime lama (`src/lib/api/types.ts`) yang semua required. Pemakai field Page harus null-safe.
- **Tujuan narrowing (Q2 user):** saat akses error, `body.errors` TANPA `?.` — cabang error dinarrow lewat `res.ok`/status.
- **Sync policy:** generator tetap tulis ke `docs/api/master/types/` (2-space, `./_shared`). Sync manual ke `src/types/` (tab, `../_shared`) lalu `npx biome check --write src/types/`. `docs/api` di-IGNORE biome.
- **DeletedResult** sudah dibetulkan: `data` `String` (bukan `{}`) → `Envelope<string>`.

## Sumber kebenaran generated (sudah landed di working tree)

- `src/types/_shared.ts` — `HttpStatusText`, `Envelope<T>` (union), `Page<T>`, `PageEnvelope<T>`, dsb.
- `src/types/master/*.ts` (22 file) — wrapper per-entity kini alias generic.

---

## Checklist per issue

### bo3 — Repoint `src/lib/api/types.ts`
- [ ] Hapus interface `ApiEnvelope<T>` & `Page<T>` hand-written di `src/lib/api/types.ts`
- [ ] Re-export dari `@/types/_shared`: `Envelope`, `Page`, `PageEnvelope` (+ alias `ApiEnvelope` bila importer masih pakai nama itu)
- [ ] Pastikan importer langsung tetap kompilasi: `paging.ts`, `master-entity-types.ts`, `master-config.ts`, `client.ts`
- [ ] `npx tsc --noEmit` hijau
- [ ] `bd close kepegawaian-fe-bo3` → push

### c8z — `client.ts handle()` narrowing
- [ ] Narrow union di `handle<T>()`: cabang `!res.ok` akses `body.errors` tanpa `?.`; cabang ok `return body.data`
- [ ] Pertahankan `ApiError(status, message)` & branch 204
- [ ] `npx tsc --noEmit` hijau
- [ ] `bd close kepegawaian-fe-c8z` → push

### 05q — Verifikasi `Page<T>` optional + gates
- [ ] Telusuri akses field Page (`.content/.number/.totalElements/.first/.last/.totalPages/.numberOfElements/.size/.empty`) di `src/` → null-safe
- [ ] Cek: `paging.ts` (fromPage), `useResource.ts`, `useMasterTable.ts`, `master-client.tsx`
- [ ] `npx tsc --noEmit` hijau
- [ ] `npx biome check src/` bersih
- [ ] `npm test` (vitest) hijau
- [ ] `bd close kepegawaian-fe-05q` → push

### 5eo — Candidate 2: query-param filter types
- [ ] **Grill desain dengan user** (naming, optionality, generic `PageQuery<T>` vs per-entity, mana yang di-hoist)
- [ ] `plan()` step 1: berhenti membuang `parameters` GET
- [ ] Pisahkan path param `id`(int64) dari query params
- [ ] Hoist param pagination berulang (`page`/`size`/`sortBy`/`sortDirection`) ke `_shared.ts`
- [ ] Emit tipe filter per-entity ke `docs/api/master/types/`
- [ ] Tambah test di `extract-types.test.ts`
- [ ] Sync manual ke `src/types/` + `biome check --write`
- [ ] `npx tsc --noEmit` + `npm test` hijau
- [ ] `bd close kepegawaian-fe-5eo` → push
