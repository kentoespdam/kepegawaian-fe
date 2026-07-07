# RBAC — Appwrite Labels + peta terpusat

> **Muat modul ini untuk:** kerja otorisasi/permission, `can()`, `<Can>`, `lib/auth/permissions.ts`,
> penyembunyian aksi berbasis peran, `forbidden()`. Berisi §9.
> **Sumber:** CONTEXT §RBAC. Lihat juga proteksi rute di [auth-proxy.md](./auth-proxy.md) §4.2.

---

## 9. RBAC — Appwrite Labels + peta terpusat (CONTEXT §RBAC)

Otorisasi **role-based**; peran didefinisikan user nanti. Rilis 1 bangun **mekanisme**, bukan
daftar peran hardcoded. FE tak pernah hardcode `"admin"`.

- **Sumber peran = Appwrite Labels.** `labels` array datang **gratis di `account.get()`** (sudah
  dipanggil DAL) — nol network ekstra. Dibaca lewat satu helper `getRoles(session)` (agar bisa
  swap ke Teams tanpa sentuh caller).
- **Peta permission** — satu file `lib/auth/permissions.ts`: `role → entity → action[]`,
  action ∈ `view | create | update | delete`. Key entity `*` = default per-role.
  ```
  PERMISSIONS = {
    hr:     { golongan: ['view','create','update','delete'], organisasi: ['view'], /* … */ },
    viewer: { '*': ['view'] },
  }
  ```
- **Satu API cek:** `can(roles, action, entity)` — TAK PERNAH `role === 'admin'`. Signature
  dikunci sejak hari 1.
- **Enforcement (defense in depth):**
  - **UI: unmount** (return `null`) — BUKAN CSS-hide/disable — via helper `<Can action entity>`.
    Tombol absen = kenyamanan, bukan batas keamanan.
  - **Page/render:** DAL `forbidden()` → `forbidden.tsx` saat peran tak punya `view`.
  - **Data:** `proxy.ts` = gate keras (request tak berwenang ditolak server-side).
- **Aturan unmount (TERKUNCI — jangan disable):**
  - **Tambah** tak dirender saat `!can(create)`.
  - **Kolom Aksi** tak dirender sama sekali bila peran tak punya `update` maupun `delete`;
    bila hanya satu, hanya ikon itu dirender.
  - **Klik-baris-ke-Edit** nonaktif saat `!can(update)` (baris tetap terbaca, non-interaktif).
  - Entitas yang tak bisa `view` **tak muncul di Tier-2 sidebar**; DAL `forbidden()` = jaring
    pengaman untuk URL yang diketik langsung.
- **Rilis 1 tak seed peran nyata** — peta ship default masuk-akal (write role + `viewer` via `*`);
  user isi matriks per-label. Kelola peran lewat UI = ditunda ke modul `sistem`.
