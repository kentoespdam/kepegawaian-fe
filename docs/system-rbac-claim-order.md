# Claim Order — System API & Profil Update RBAC

> Grill session: 2026-08-13  
> Kontrak: `docs/FE-CONTRACT-profil-update-rbac.md`  
> Seed V31 sudah live di BE.

---

## Urutan Kerjakan (dependency order)

```
kepegawaian-fe-sd9y  ← KERJAKAN DULU (fondasi, semua issue lain bergantung ini)
        │
        ├── kepegawaian-fe-s5bd  (bisa paralel setelah sd9y selesai)
        ├── kepegawaian-fe-mice  (bisa paralel setelah sd9y selesai)
        └── kepegawaian-fe-6ljl  (bisa paralel setelah sd9y selesai)
```

---

## Issue 1 — WAJIB PERTAMA

### `kepegawaian-fe-sd9y` — auth: additive permission layer ✅

**Files yang dibuat/diubah:**

- [x] `src/types/auth.ts` — tambah `AccountMeResponse`
- [x] `src/lib/auth/permissions.ts` — ganti `PERMISSIONS` → `const PERMISSION + type Permission` (PERMISSIONS lama dipertahankan untuk `can()` legacy: Can/sanksi-manager)
- [x] `src/lib/auth/can.ts` — tambah `hasPermission(perms, p)`
- [x] `src/lib/auth/accountSession.ts` — **FILE BARU** — fetch `GET /account/me`
- [x] `src/lib/auth/index.ts` — export baru: `hasPermission`, `getAccountSession`, `AccountMeResponse`, `PERMISSION`
- [x] `src/hooks/useAuth.tsx` — **FILE BARU** — extend dari useRoles, shim `useRoles()`
- [x] `src/hooks/useRoles.tsx` — dijadikan re-export dari useAuth (7 call site lama tetap jalan)
- [x] `src/app/(app)/layout.tsx` — `Promise.all([verifySession(), getAccountSession()])`
- [x] `src/components/app-shell.tsx` — prop `permissions`, gate → `hasPermission`, nilai gate → BE string, `<AuthProvider>`

**Verifikasi:**
- [x] `bun run test` — existing tests tetap hijau (118/118)
- [x] `bun run build` — zero error
- [x] Sidebar tampil sama seperti sebelumnya untuk ADMIN (semua menu visible)

---

## Issue 2 — Paralel setelah sd9y

### `kepegawaian-fe-s5bd` — profil: split useBiodataMutation ✅

**Files yang dibuat/diubah:**

- [x] `src/hooks/useSelfBiodataMutation.ts` — **FILE BARU** — `PATCH /profil` (masuk approval queue)
- [x] `src/hooks/useAdminBiodataMutation.ts` — **FILE BARU** — `PATCH /admin/profil/{nik}` (langsung stable)
- [x] `src/hooks/useBiodataMutation.ts` — hapus
- [x] `src/types/profil/biodata-patch.ts` — **FILE BARU** — `BiodataPatchRequest` hand-written (generator tak bisa: path satu-segmen `/profil` di-skip `domainOf`)
- [x] `src/app/(app)/kepegawaian/dashboard/section-left-panel.tsx` — pakai `useSelfBiodataMutation` (dashboard = self-service, keputusan user 2026-08-13)

> ⚠️ Deviasi dari plan: plan menugaskan `useAdminBiodataMutation` ke dashboard, tapi dashboard fetch dari `getPegawaiSession()` (self-service). Per contract §5, self → `PATCH /profil`. Konfirmasi user: **self hook untuk dashboard, admin hook untuk halaman admin (`kepegawaian/data/{pegawaiId}/pendukung/*`)**.

**Verifikasi:**
- [x] Edit biodata di dashboard → `PATCH /profil` → masuk approval queue (PENDING)
- [x] `useAdminBiodataMutation` siap dipakai halaman admin pendukung

---

## Issue 3 — Paralel setelah sd9y

### `kepegawaian-fe-mice` — profil: halaman approval antrian ✅

**Files yang dibuat:**

- [x] `src/app/(app)/profil/approval/page.tsx` — server component, gate `PROFIL:APPROVE`
- [x] `src/app/(app)/profil/approval/approval-client.tsx` — tabel + dialog detail + diff

**Komponen di dalam approval-client.tsx:**
- [x] Tabel list `ProfileUpdateQuery[]` dengan filter PENDING default
- [x] `flattenForDiff(obj, prefix)` — recursive flatten untuk diff renderer
- [x] Dialog detail: header (nama/nipam/jabatan/reqDate/tableName), tabel diff 3 kolom
- [x] Tombol Approve + Reject — gated `hasPermission(permissions, PERMISSION.PROFIL_APPROVE)`
- [x] Sidebar entry: tambah ke MODULES (grup profil baru)

**Verifikasi:**
- [x] ADMIN/HRD dapat akses `/profil/approval`
- [x] User tanpa PROFIL:APPROVE → `forbidden()` (404)
- [x] Diff menampilkan field yang berubah dengan highlight
- [x] Approve → status APPROVED, row hilang dari filter PENDING

---

## Issue 4 — Paralel setelah sd9y

### `kepegawaian-fe-6ljl` — sistem: manajemen role & user ✅

**Files yang dibuat:**

- [x] `src/app/(app)/sistem/roles/page.tsx` — gate `SYSTEM:MANAGE_ROLE`
- [x] `src/app/(app)/sistem/roles/roles-client.tsx` — tabel role + assign/revoke permission
- [x] `src/app/(app)/sistem/users/page.tsx` — gate `SYSTEM:MANAGE_USER`
- [x] `src/app/(app)/sistem/users/users-client.tsx` — tabel user + assign role + toggle status

**Sidebar:**
- [x] Isi `entities: []` di modul sistem dengan dua entry baru (roles + users)

**Verifikasi:**
- [x] Toggle permission di role → POST/DELETE `/system/roles/{roleId}/permissions/{permName}`
- [x] Assign role ke user → PATCH `/system/users/pref/{id}` (body: `PrefRole[]`, sesuai api.json)
- [x] User tanpa SYSTEM:MANAGE_ROLE/USER → 404

---

## Context yang Perlu Dibaca Sebelum Coding

| Issue | Baca ini dulu |
|-------|---------------|
| sd9y | `docs/FE-CONTRACT-profil-update-rbac.md`, `src/lib/auth/pegawaiSession.ts`, `CONTEXT-MAP.md` |
| s5bd | `docs/FE-CONTRACT-profil-update-rbac.md §Endpoint split`, `src/hooks/useBiodataMutation.ts` |
| mice | `docs/FE-CONTRACT-profil-update-rbac.md`, `src/types/profil/profil-update.ts`, `knowledge.md §9` |
| 6ljl | `docs/api/system/api.json`, `src/types/system/*.ts`, `knowledge.md §9` |

## Types yang Sudah Generated ✅

```
src/types/system/roles.ts
src/types/system/users.ts
src/types/system/permissions.ts
src/types/profil/profil-update.ts
docs/api/system/module.json
```
