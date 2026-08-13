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

### `kepegawaian-fe-sd9y` — auth: additive permission layer

**Files yang dibuat/diubah:**

- [ ] `src/types/auth.ts` — tambah `AccountMeResponse`
- [ ] `src/lib/auth/permissions.ts` — ganti `PERMISSIONS` → `const PERMISSION + type Permission`
- [ ] `src/lib/auth/can.ts` — tambah `hasPermission(perms, p)`
- [ ] `src/lib/auth/accountSession.ts` — **FILE BARU** — fetch `GET /account/me`
- [ ] `src/lib/auth/index.ts` — export baru: `hasPermission`, `getAccountSession`, `AccountMeResponse`, `PERMISSION`
- [ ] `src/hooks/useAuth.tsx` — **FILE BARU** — extend dari useRoles, shim `useRoles()`
- [ ] `src/hooks/useRoles.tsx` — hapus setelah `useAuth.tsx` verified (atau jadikan re-export)
- [ ] `src/app/(app)/layout.tsx` — `Promise.all([verifySession(), getAccountSession()])`
- [ ] `src/components/app-shell.tsx` — prop `permissions`, gate → `hasPermission`, nilai gate → BE string, `<AuthProvider>`

**Verifikasi:**
- [ ] `bun run test` — existing tests tetap hijau
- [ ] `bun run build` — zero error
- [ ] Sidebar tampil sama seperti sebelumnya untuk ADMIN (semua menu visible)

---

## Issue 2 — Paralel setelah sd9y

### `kepegawaian-fe-s5bd` — profil: split useBiodataMutation

**Files yang dibuat/diubah:**

- [ ] `src/hooks/useSelfBiodataMutation.ts` — **FILE BARU** — `PATCH /profil`
- [ ] `src/hooks/useAdminBiodataMutation.ts` — **FILE BARU** — `PATCH /admin/profil/{nik}`
- [ ] `src/hooks/useBiodataMutation.ts` — hapus
- [ ] `src/app/(app)/profil/page.tsx` (atau komponen di dalamnya) — pakai `useSelfBiodataMutation`
- [ ] `src/app/(app)/kepegawaian/dashboard/section-left-panel.tsx` — pakai `useAdminBiodataMutation(nik)`

**Verifikasi:**
- [ ] Edit biodata di halaman /profil → masuk approval queue (status PENDING)
- [ ] Edit biodata di dashboard kepegawaian → langsung update (sebagai admin)

---

## Issue 3 — Paralel setelah sd9y

### `kepegawaian-fe-mice` — profil: halaman approval antrian

**Files yang dibuat:**

- [ ] `src/app/(app)/profil/approval/page.tsx` — server component, gate `PROFIL:APPROVE`
- [ ] `src/app/(app)/profil/approval/approval-client.tsx` — tabel + dialog detail + diff

**Komponen di dalam approval-client.tsx:**
- [ ] Tabel list `ProfileUpdateQuery[]` dengan filter PENDING default
- [ ] `flattenForDiff(obj, prefix)` — recursive flatten untuk diff renderer
- [ ] Dialog detail: header (nama/nipam/jabatan/reqDate/tableName), tabel diff 3 kolom
- [ ] Tombol Approve + Reject — gated `hasPermission(permissions, PERMISSION.PROFIL_APPROVE)`
- [ ] Sidebar entry: tambah ke MODULES (grup profil atau sistem)

**Verifikasi:**
- [ ] ADMIN/HRD dapat akses `/profil/approval`
- [ ] User tanpa PROFIL:APPROVE → `forbidden()` (404)
- [ ] Diff menampilkan field yang berubah dengan highlight
- [ ] Approve → status APPROVED, row hilang dari filter PENDING

---

## Issue 4 — Paralel setelah sd9y

### `kepegawaian-fe-6ljl` — sistem: manajemen role & user

**Files yang dibuat:**

- [ ] `src/app/(app)/sistem/roles/page.tsx` — gate `SYSTEM:MANAGE_ROLE`
- [ ] `src/app/(app)/sistem/roles/roles-client.tsx` — tabel role + assign/revoke permission
- [ ] `src/app/(app)/sistem/users/page.tsx` — gate `SYSTEM:MANAGE_USER`
- [ ] `src/app/(app)/sistem/users/users-client.tsx` — tabel user + assign role

**Sidebar:**
- [ ] Isi `entities: []` di modul sistem dengan dua entry baru (roles + users)

**Verifikasi:**
- [ ] Toggle permission di role → POST/DELETE `/system/roles/{roleId}/permissions/{permName}`
- [ ] Assign role ke user → PATCH `/system/users/pref/{id}`
- [ ] User tanpa SYSTEM:MANAGE_ROLE/USER → 404

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
