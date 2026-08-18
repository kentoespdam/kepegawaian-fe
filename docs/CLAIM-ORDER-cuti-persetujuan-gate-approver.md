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

### Step 1 — Sync tipe `/account/me`

- [ ] `bun run spec:sync` → `src/types/account/me.ts` (generated) — field `isCutiApprover: boolean`
      di `MeResponse` (sesuai kontrak BE R2). Jangan edit manual.

### Step 2 — `src/lib/auth/accountSession.ts`

- [ ] `getAccountSession()`: baca `body.data?.isCutiApprover ?? false` → return
      `{ roles, permissions, isCutiApprover }`. Fallback `false` saat error (pola fallback yang ada).
- [ ] Update caller yang mengonsumsi return shape bila tipe eksplisit (cek typecheck).

### Step 3 — `(app)/layout.tsx`

- [ ] Teruskan `isCutiApprover` dari `getAccountSession()` → prop baru di `<AppShell>`.

### Step 4 — `src/components/app-shell.tsx` (gate menu)

File: `src/components/app-shell.tsx`

- [ ] Prop baru `isCutiApprover: boolean`.
- [ ] Item `persetujuan` di `MODULES` (grup `cuti`) → gate dinamis: tampil **hanya saat**
      `isCutiApprover`. **JANGAN ubah** item `pengajuan` (gate `null` tetap) & `kuota`
      (`CUTI:WRITE` tetap). Ponytail: diff minimal, tanpa abstraksi baru.
- [ ] Perhatikan `MODULE_ENTITY_MAP` (breadcrumb) & `filterVisibleEntities` — pastikan
      item tersembunyi juga tidak aktif lewat breadcrumb.

### Step 5 — `cuti/persetujuan/page.tsx` (guard forbidden)

File: `src/app/(app)/cuti/persetujuan/page.tsx`

- [ ] Panggil `getAccountSession()` → `if (!isCutiApprover) forbidden()` (pola ADR-0001/CU-1:
      unmount, bukan hide). `getPegawaiSession()` tetap untuk `pegawaiId` — empty state
      "tidak terhubung" tetap sebagai defensive fallback (D5).

### Step 6 — Test

- [ ] Verifikasi `persetujuan-page-client.test.tsx` tetap hijau (tak berubah).
- [ ] Tambah test guard bila ada pola test server-component/forbidden di proyek (mis.
      layout/page guard); kalau tidak ada pola → catat verifikasi manual di checklist.
- [ ] Verifikasi sidebar: staf (flag false) tidak melihat item; approver (true) melihat.

### Step 7 — Quality gates & ship

- [ ] `bun run build` (zero error), `bunx biome check`, `bun run test`.
- [ ] `npx gitnexus analyze` + `detect-changes` — scope hanya cuti/persetujuan + accountSession
      + app-shell + layout + docs cuti.
- [ ] `/graphify --update` (via skill graphify).
- [ ] Update MD ini (tandai selesai) → `bd close kepegawaian-fe-utco` →
      commit `<type>: cuti: ...` → `git pull --rebase` → `bd dolt push` → `git push` → verify.
