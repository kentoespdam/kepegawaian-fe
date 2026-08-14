# Claim Order — Migrasi Infrastruktur Dual-Mode RBAC

| Item | Nilai |
|------|-------|
| Issue | `kepegawaian-fe-da30` — rbac: migrasi infrastruktur dual-mode RBAC ke permission-driven |
| Panduan BE | [FE-GUIDE-dual-mode-rbac.md](../FE-GUIDE-dual-mode-rbac.md) |
| ADR referensi | [ADR-0037](../adr/0037-rbac-permission-per-role-didb-mariadb.md) |
| Kontrak API | [FE-CONTRACT-profil-update-approval-rbac.md](../FE-CONTRACT-profil-update-approval-rbac.md) |
| Status | ✅ **Selesai (2026-08-14)** — semua step dikerjakan, gates hijau, menunggu push |

---

## Konteks

Backend sudah 100% dual-mode RBAC (`hasRole('ADMIN') OR hasAuthority('ENTITY:ACTION')`).
FE sudah punya infrastruktur baru (`hasPermission` + `getAccountSession`) tapi masih ada sisa
legacy (`can()` + matrix hardcode). Tujuan: selesaikan migrasi, buang legacy, tegakkan
ADMIN shortcut sesuai aturan emas FE-GUIDE §7.

### Keputusan yang sudah dikunci (jangan ubah tanpa ADR)

1. **`getAccountSession()`** return `{ roles, permissions }` — `/account/me` sebagai single source of truth
2. **`hasPermission(perms, p, roles?)`** — ADMIN shortcut di sini, bukan di caller
3. **`<Can>` + `can()` + `PERMISSIONS` matrix** — dihapus sepenuhnya
4. **`badge-manager` + `sanksi-manager`** — migrasi ke `hasPermission(permissions, PERMISSION.MASTER_WRITE/DELETE, roles)`
5. **`layout.tsx`** pass `roles` dari `getAccountSession()` ke `AppShell`
6. **`AppShell`** terima `roles` prop, hapus `getRoles(user)` (Appwrite prefs)
7. **Scope**: modul yang sudah ada saja; cuti/penggajian/laporan out of scope

---

## Dependency Map

```
Step 1 (getAccountSession)
  └── Step 2 (hasPermission signature)
        ├── Step 3 (hapus legacy can/PERMISSIONS/<Can>)
        ├── Step 4 (badge-manager + sanksi-manager)
        └── Step 5 (layout.tsx)
              └── Step 6 (AppShell)
                    └── Step 7 (tests)
                          └── Step 8 (hapus orphan import)
```

---

## Claim Order Checklist

### Step 1 — `getAccountSession`: return `roles` + `permissions`
- [x] `src/lib/auth/accountSession.ts`
  - Return type: `Promise<{ roles: string[]; permissions: string[] }>`
  - `roles: body.data?.roles ?? []`
  - `permissions: body.data?.permissions ?? []`
  - Fallback error: `{ roles: [], permissions: [] }`

> **Catatan**: `MeResponse` di `src/types/account/me.ts` sudah punya `roles?: string[]` — tidak perlu ubah tipe.

---

### Step 2 — `hasPermission`: ADMIN shortcut + signature baru
- [x] `src/lib/auth/can.ts`
  - Ubah signature: `hasPermission(perms: string[], p: Permission, roles?: string[]): boolean`
  - Tambah guard baris pertama: `if (roles?.some(r => r.toUpperCase() === 'ADMIN')) return true;`
  - Body lama tetap: `return perms.includes(p);`

---

### Step 3 — Hapus legacy: `can()`, `PERMISSIONS`, `<Can>`
- [x] `src/lib/auth/can.ts` — hapus fungsi `can()`, hapus fungsi `getRoles()`
- [x] `src/lib/auth/permissions.ts` — hapus `export const PERMISSIONS`, hapus `const ALL`, `const VIEW`, type `Action`
- [x] `src/lib/auth/index.ts` — hapus re-export: `can`, `getRoles`, `PERMISSIONS`
- [x] `src/components/can.tsx` — **hapus file**
- [x] `src/hooks/useRoles.tsx` — **hapus file** (shim; caller tersisa — badge/sanksi-manager & 2 test — dimigrasi di Step 4/7)

> **Ekstra di luar checklist (wajib karena legacy dihapus):** `getRoles` juga dipakai `src/app/(app)/profil/page.tsx` → migrasi ke `getAccountSession()`. Shim `useRoles` di `src/hooks/useAuth.tsx` ikut dihapus. Type `Action` di `src/types/auth.ts` menjadi orphan → dihapus (Step 8).

---

### Step 4 — Migrasi `badge-manager` + `sanksi-manager`
- [x] `src/components/badge-manager.tsx`
  - `import { useAuth } from "@/hooks/useAuth";`
  - `const { roles, permissions } = useAuth();`
  - Ganti `can(roles, "update", "profesi")` → `hasPermission(permissions, PERMISSION.MASTER_WRITE, roles)`
  - Ganti `can(roles, "delete", "profesi")` → `hasPermission(permissions, PERMISSION.MASTER_DELETE, roles)`
- [x] `src/components/sanksi-manager.tsx`
  - Sama seperti badge-manager, untuk entity `jenis-sp`
  - Hapus import `can` dan `useRoles`

---

### Step 5 — `layout.tsx`: pass `roles` ke `AppShell`
- [x] `src/app/(app)/layout.tsx`
  - Destructure: `const [user, { roles, permissions }] = await Promise.all([...])`
  - Tambah prop: `<AppShell user={user} roles={roles} permissions={permissions} ...>`

---

### Step 6 — `AppShell`: terima `roles` prop, hapus `getRoles(user)`
- [x] `src/components/app-shell.tsx`
  - Tambah `roles: string[]` ke props interface
  - Hapus `const roles = getRoles(user);`
  - Hapus `import { getRoles } from "@/lib/auth/can";`

> **Ekstra (ditemukan saat eksekusi):** `filterVisibleEntities` di `src/lib/sidebar-utils.ts` memanggil `hasPermission` TANPA roles → ADMIN dengan `permissions` kosong (`/account/me` bisa empty walau ADMIN) akan melihat sidebar kosong. Solusi: `filterVisibleEntities(entities, permissions, roles?)` meneruskan `roles` ke `hasPermission`; AppShell mengirim `roles` prop. Ini kunci agar ADMIN shortcut (Step 2) benar-benar bekerja di sidebar.

---

### Step 7 — Update tests
- [x] `src/lib/auth/permissions.test.ts`
  - Tambah: `hasPermission([], PERMISSION.PEGAWAI_READ, ['ADMIN'])` → `true`
  - Tambah: `hasPermission([], PERMISSION.PEGAWAI_READ, ['HRD'])` → `false`
  - Tambah: `hasPermission([PERMISSION.PEGAWAI_READ], PERMISSION.PEGAWAI_READ)` → `true` (backward-compat)
- [x] `src/lib/sidebar-utils.test.ts` — + test ADMIN shortcut; tidak ada regresi (15 tests)
- [x] Test file yang pakai `RolesProvider` / `useRoles` — `sk/page.test.tsx` & `cuti/page.test.tsx`: import diganti ke `AuthProvider as RolesProvider` dari `@/hooks/useAuth`

---

### Step 8 — Verifikasi orphan import
- [x] `Action` type di `src/types/auth.ts` — orphan setelah `can()/PERMISSIONS/<Can>` dihapus → dihapus (juga dari re-export `src/lib/auth/index.ts`)
- [x] `bunx biome check` — zero lint errors (plus fix suppression `noArrayIndexKey` di `ringkasan-panel.tsx` yang men-block gate)
- [x] `bun run build` — zero TypeScript errors
- [x] `bun run test` — 145 tests all green
- [x] `npx gitnexus analyze` + `detect-changes` — index refresh; scope = seluruh flow gating RBAC (sesuai plan), tanpa modul out-of-scope

---

## Definisi Selesai

- [x] `bun run test` — all green (145)
- [x] `bun run build` — clean
- [x] `bunx biome check` — zero
- [x] `npx gitnexus analyze` + `detect-changes` — index refresh; scope sesuai
- [ ] `/graphify --update` via skill graphify
- [ ] `bd close kepegawaian-fe-da30`
- [ ] `git pull --rebase` → `bd dolt push` → `git push`

---

## Referensi Context

| Topik | Baca |
|-------|------|
| RBAC pattern FE | `docs/FE-GUIDE-dual-mode-rbac.md` §7 Aturan Emas |
| Permission catalog (21 perm) | `docs/FE-GUIDE-dual-mode-rbac.md` §5 |
| Tier 1/2/3 akses | `docs/FE-GUIDE-dual-mode-rbac.md` §4 |
| Error behavior 403/404 | `docs/FE-GUIDE-dual-mode-rbac.md` §6 |
