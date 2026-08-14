# Claim Order — Migrasi Infrastruktur Dual-Mode RBAC

| Item | Nilai |
|------|-------|
| Issue | `kepegawaian-fe-da30` — rbac: migrasi infrastruktur dual-mode RBAC ke permission-driven |
| Panduan BE | [FE-GUIDE-dual-mode-rbac.md](../FE-GUIDE-dual-mode-rbac.md) |
| ADR referensi | [ADR-0037](../adr/0037-rbac-permission-per-role-didb-mariadb.md) |
| Kontrak API | [FE-CONTRACT-profil-update-approval-rbac.md](../FE-CONTRACT-profil-update-approval-rbac.md) |
| Status | 🔲 Belum dimulai |

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
- [ ] `src/lib/auth/accountSession.ts`
  - Return type: `Promise<{ roles: string[]; permissions: string[] }>`
  - `roles: body.data?.roles ?? []`
  - `permissions: body.data?.permissions ?? []`
  - Fallback error: `{ roles: [], permissions: [] }`

> **Catatan**: `MeResponse` di `src/types/account/me.ts` sudah punya `roles?: string[]` — tidak perlu ubah tipe.

---

### Step 2 — `hasPermission`: ADMIN shortcut + signature baru
- [ ] `src/lib/auth/can.ts`
  - Ubah signature: `hasPermission(perms: string[], p: Permission, roles?: string[]): boolean`
  - Tambah guard baris pertama: `if (roles?.some(r => r.toUpperCase() === 'ADMIN')) return true;`
  - Body lama tetap: `return perms.includes(p);`

---

### Step 3 — Hapus legacy: `can()`, `PERMISSIONS`, `<Can>`
- [ ] `src/lib/auth/can.ts` — hapus fungsi `can()`, hapus fungsi `getRoles()`
- [ ] `src/lib/auth/permissions.ts` — hapus `export const PERMISSIONS`, hapus `const ALL`, `const VIEW`, type `Action`
- [ ] `src/lib/auth/index.ts` — hapus re-export: `can`, `getRoles`, `PERMISSIONS`
- [ ] `src/components/can.tsx` — **hapus file**
- [ ] `src/hooks/useRoles.tsx` — **hapus file** (hanya shim re-export, tidak ada caller langsung)

> ⚠️ Sebelum hapus, jalankan `gitnexus_impact` pada `can`, `getRoles`, `PERMISSIONS`, `Can` untuk verifikasi tidak ada caller tersembunyi.

---

### Step 4 — Migrasi `badge-manager` + `sanksi-manager`
- [ ] `src/components/badge-manager.tsx`
  - `import { useAuth } from "@/hooks/useAuth";`
  - `const { roles, permissions } = useAuth();`
  - Ganti `can(roles, "update", "profesi")` → `hasPermission(permissions, PERMISSION.MASTER_WRITE, roles)`
  - Ganti `can(roles, "delete", "profesi")` → `hasPermission(permissions, PERMISSION.MASTER_DELETE, roles)`
- [ ] `src/components/sanksi-manager.tsx`
  - Sama seperti badge-manager, untuk entity `jenis-sp`
  - Hapus import `can` dan `useRoles`

---

### Step 5 — `layout.tsx`: pass `roles` ke `AppShell`
- [ ] `src/app/(app)/layout.tsx`
  - Destructure: `const [user, { roles, permissions }] = await Promise.all([...])`
  - Tambah prop: `<AppShell user={user} roles={roles} permissions={permissions} ...>`

---

### Step 6 — `AppShell`: terima `roles` prop, hapus `getRoles(user)`
- [ ] `src/components/app-shell.tsx`
  - Tambah `roles: string[]` ke props interface
  - Hapus `const roles = getRoles(user);`
  - Hapus `import { getRoles } from "@/lib/auth/can";`

---

### Step 7 — Update tests
- [ ] `src/lib/auth/permissions.test.ts`
  - Tambah: `hasPermission([], PERMISSION.PEGAWAI_READ, ['ADMIN'])` → `true`
  - Tambah: `hasPermission([], PERMISSION.PEGAWAI_READ, ['HRD'])` → `false`
  - Tambah: `hasPermission([PERMISSION.PEGAWAI_READ], PERMISSION.PEGAWAI_READ)` → `true` (backward-compat)
- [ ] `src/lib/sidebar-utils.test.ts` — jalankan, pastikan tidak ada regresi
- [ ] Test file yang pakai `RolesProvider` / `useRoles` — update import bila shim dihapus

---

### Step 8 — Verifikasi orphan import
- [ ] `Action` type di `src/types/auth.ts` — cek apakah masih dipakai; hapus bila orphan
- [ ] `bunx biome check` — zero lint errors
- [ ] `bun run build` — zero TypeScript errors

---

## Definisi Selesai

- [ ] `bun run test` — all green
- [ ] `bun run build` — clean
- [ ] `bunx biome check` — zero
- [ ] `npx gitnexus analyze` + `/graphify --update`
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
