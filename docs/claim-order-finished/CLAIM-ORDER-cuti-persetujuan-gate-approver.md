# Claim Order — Cuti: Persetujuan Gate Approver (CU-18/ADR-0041)

> **Konteks:** Reversal CU-10 — menu & halaman Persetujuan Cuti **hanya untuk approver**
> (punya anak buah). Staf/non-approver: menu disembunyikan + akses langsung → `forbidden()`.
> Keputusan grill 2026-08-18: `docs/context/cuti.md` **CU-18** + glossary (Approver /
> Non-Approver (Staf)) · ADR: [`docs/adr/0041-persetujuan-cuti-gate-approver.md`](adr/0041-persetujuan-cuti-gate-approver.md).
> Permintaan BE: [`docs/BE-REQUIREMENT-persetujuan-cuti-approver-dan-bridge.md`](BE-REQUIREMENT-persetujuan-cuti-approver-dan-bridge.md).
> Issue: FE `bd show kepegawaian-fe-utco` (P1, `ready-for-agent`) · BE `bd show kepegawaian-fe-raiy` (P0, `needs-triage`).

## Konteks

| Item | Nilai |
|------|-------|
| Masalah | User NIPAM `890300426` (supervisor) dapat "Akun ini tidak terhubung ke data pegawai" — bridge putus (`$id` ≠ `pegawaiId`; provisioning by NIPAM). Staf juga masih melihat menu Persetujuan. |
| Root cause | Identity bridge (ADR-0006) + CU-10 "semua bisa lihat, konten per-role". Chain approval **posisional** (`picSaatIni`), bukan permission — `USER` role tidak pegang `CUTI:APPROVE`. |
| Keputusan | D1 bridge = BE resolve by principal · D2 menu approver-only (flag `isCutiApprover`) · D3 page `forbidden()` · D4 flag numpang `GET /account/me` · D5 empty state "tidak terhubung" dipertahankan (defensive) |
| Dependency | FE **diblokir** BE `kepegawaian-fe-raiy` (flag + bridge live). Siapkan FE; verifikasi penuh setelah BE. |
| Tidak berubah | Pengajuan Cuti (CU-6), Dashboard, Kuota Cuti (`CUTI:WRITE`) |

## Aturan (knowledge.md / coding-rules)

- **WAJIB** baca `docs/design/coding-rules.md` + aktifkan `/ponytail` sebelum menulis kode.
- Explore: graphify → gitnexus → grep (last resort). `gitnexus_impact` sebelum edit simbol.
- Tipe generated (`src/types/**`) **tidak diedit manual** — regenerate via `bun run spec:sync`.
- `bun run build` zero-error, `bunx biome check` bersih, `bun run test` hijau.
- Update graph (gitnexus analyze + `/graphify --update`) sebelum commit; commit & push sesuai protokol.

## Urutan Kerja

### Step 1 — Sync tipe `/account/me` ✅

- [x] `src/types/account/me.ts` (generated) — field `isCutiApprover?: boolean` di `MeResponse`
      (edit `docs/api/auth/api.json` → `node docs/api/extract-types.js`; kontrak BE R2).

### Step 2 — `src/lib/auth/accountSession.ts` ✅

- [x] `getAccountSession()`: baca `body.data?.isCutiApprover ?? false` → return
      `{ roles, permissions, isCutiApprover }` (type `AccountSession`). Fallback `false` saat error.
- [x] Additive — 13 caller hanya destructure `{roles}`/`{permissions}`; `tsc`/build hijau.

### Step 3 — `(app)/layout.tsx` ✅

- [x] Teruskan `isCutiApprover` dari `getAccountSession()` (catch fallback `false`) → prop `<AppShell>`.

### Step 4 — `src/components/app-shell.tsx` (gate menu) ✅

- [x] Prop baru `isCutiApprover: boolean`.
- [x] Item `persetujuan` (gate `null`) di-filter: tampil **hanya saat** `isCutiApprover` —
      satu baris filter di `visibleModules`. Item `pengajuan` & `kuota` tidak berubah.
- [x] Breadcrumb aman: non-approver kena `forbidden()` di page, tak pernah render.

### Step 5 — `cuti/persetujuan/page.tsx` (guard forbidden) ✅

- [x] `Promise.all([verifySession(), getAccountSession()])` → `if (!isCutiApprover) forbidden()`
      (pola kuota/page.tsx). `getPegawaiSession()` tetap → empty state defensif (D5).

### Step 6 — Test ✅

- [x] `persetujuan-page-client.test.tsx` tetap hijau (tak berubah).
- [x] Tidak ada pola test server-component/forbidden di proyek → verifikasi manual
      (guard = 1 baris, pola identik kuota/page.tsx yang sudah live).
- [x] `bun run test` — 181 lulus (27 file).

### Step 7 — Quality gates & ship ✅

- [x] `bun run build` (zero error), `bunx biome check` (341 file, bersih), `bun run test` (181).
- [x] `npx gitnexus analyze` + `detect-changes` — scope sesuai: persetujuan/page, layout,
      app-shell, accountSession, types/account/me + docs cuti. (Risk "critical" krn fan-in
      `getAccountSession` — additive, semua caller tetap valid.)
- [x] `/graphify --update` (via skill graphify).
- [x] Update MD ini → `bd close kepegawaian-fe-utco` → commit `feat(cuti): ...` →
      `git pull --rebase` → `bd dolt push` → `git push` → verify.
