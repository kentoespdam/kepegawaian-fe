# RBAC — Permission-driven (`/account/me` + `hasPermission`)

> **Muat modul ini untuk:** kerja otorisasi/permission, `hasPermission()`, `PERMISSION` catalog,
> `lib/auth/permissions.ts`, penyembunyian aksi berbasis akses, `forbidden()`. Berisi §9.
> **Sumber:** CONTEXT §RBAC + [FE-GUIDE-dual-mode-rbac.md](../FE-GUIDE-dual-mode-rbac.md).
> Lihat juga proteksi rute di [auth-proxy.md](./auth-proxy.md) §4.2.

---

## 9. RBAC — Permission-driven (dual-mode, single source of truth `/account/me`)

Backend dual-mode: `hasRole('ADMIN') OR hasAuthority('ENTITY:ACTION')`. FE **tidak** memutuskan
keamanan — hanya show/hide UI. Keamanan di server.

- **Sumber kebenaran = `GET /account/me`** via `getAccountSession()` (server, cached) →
  `{ roles: string[], permissions: string[] }`. `permissions` = union semua role user saat itu
  (berubah runtime, JANGAN hardcode matriks).
- **Katalog permission** — satu file `lib/auth/permissions.ts`: `const PERMISSION` (21, sinkron
  dengan katalog BE `GET /system/permissions`; anti-drift di-test di `permissions.test.ts`).
- **Satu API cek:** `hasPermission(permissions, PERMISSION.X, roles?)` — TAK PERNAH
  `role === 'admin'` hardcode. Role `ADMIN` otomatis lolos (shortcut di dalam `hasPermission`,
  mencerminkan dual-mode BE) walau list `permissions` kosong.
- **Enforcement (defense in depth):**
  - **UI client: unmount** (return `null`) — BUKAN CSS-hide/disable. Ambil akses via `useAuth()`
    (`{ roles, permissions }`, disuntik `AuthProvider` di AppShell dari `getAccountSession`).
  - **Page server:** `verifySession()` + `getAccountSession()` → `hasPermission(..., roles)`
    gagal → `forbidden()` (`notFound()`).
  - **Sidebar:** `filterVisibleEntities(entities, permissions, roles)` — gate `PERMISSION.*`
    (string/string[] any-of/`null` = semua login).
  - **Data:** `proxy.ts` = gate keras (request tak berwenang ditolak server-side).
- **Aturan unmount (TERKUNCI — jangan disable):**
  - **Tambah/Edit** tak dirender saat `!hasPermission(permissions, PERMISSION.X, roles)`.
  - **Kolom Aksi** tak dirender sama sekali bila user tak punya akses tulis.
  - Entitas yang tak bisa `read` **tak muncul di sidebar**; `forbidden()` = jaring pengaman untuk
    URL yang diketik langsung.
- **Tier akses (FE-GUIDE §4):** read master & referensi = login-only (JANGAN gate permission);
  approval/manajemen (`PROFIL:APPROVE`, `SYSTEM:MANAGE_*`) = permission-only.
- Kelola peran/permission lewat modul `sistem` (UI) — matriks tidak dikunci di FE.
