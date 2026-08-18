# BE-REQUIREMENT — Persetujuan Cuti: Bridge Identitas + Flag Approver

> Permintaan ke tim **Backend** hasil grill 2026-08-18 (ADR-0041, `docs/context/cuti.md` CU-18).
> Dua item, keduanya prasyarat agar halaman Persetujuan Cuti bekerja untuk role `USER`
> (supervisor) dan menu tersembunyi untuk staf.

| Item | Nilai |
|------|-------|
| Tanggal | 2026-08-18 |
| ADR | [ADR-0041](../adr/0041-persetujuan-cuti-gate-approver.md) |
| Modul | `pegawai` (bridge) · `account`/`auth` (flag) |
| Status | OPEN |

---

## R1 — Bridge identitas: resolve `$id` → pegawai by principal

### Masalah

FE memanggil `GET /pegawai/{$id}` (di `getPegawaiSession()`) dengan asumsi
**`Appwrite $id = pegawaiId`** (ADR-0006). Faktanya akun diprovisioning **by NIPAM**
(`POST /system/users` body `{ id?, nipam, nama, password, roles }` — lihat
`AuthPostRequest`), sehingga untuk sebagian user `$id` ≠ `pegawaiId` → `GET /pegawai/{$id}`
mengembalikan **404** → FE menampilkan "Akun ini tidak terhubung ke data pegawai" di
**Dashboard, Pengajuan, dan Persetujuan** (satu fungsi, tiga halaman).

Repro: user login `890300426` (NIPAM, jabatan supervisor) → semua halaman self-service
menampilkan empty state "Akun ini tidak terhubung ke data pegawai".

Catatan: endpoint fallback `GET /pegawai/{nipam}/nipam` **sudah ada** di backend, tapi FE
tidak bisa memakainya — saat lookup `$id` gagal, FE tidak punya nilai NIPAM (NIPAM hanya ada
di record pegawai yang gagal di-fetch). Chicken-egg.

### Permintaan

Buat `GET /pegawai/{$id}` (atau endpoint self baru, mis. `GET /pegawai/me`) **resolve
berdasarkan principal**, bukan sekadar primary-key lookup:

- Saat `$id` = `pegawaiId` → perilaku sekarang (tidak berubah).
- Saat `$id` ≠ `pegawaiId` → backend memetakan `$id` ke pegawai via data provisioning
  (join Appwrite user ↔ pegawai by NIPAM), lalu kembalikan `PegawaiResponseDetail` yang sama.
- Tetap 404 hanya jika principal benar-benar bukan pegawai (akun admin murni) — FE mengandalkan
  404 untuk empty state "tidak terhubung" di Dashboard/Pengajuan.

### Acceptance

- [ ] User ber-NIPAM `890300426` (supervisor) memanggil `GET /pegawai/{$id}` → 200 + `PegawaiResponseDetail` miliknya (bukan 404).
- [ ] Akun non-pegawai (admin murni) tetap 404.
- [ ] Tidak ada regresi untuk user yang `$id`-nya sudah = `pegawaiId`.

---

## R2 — Flag `isCutiApprover` di `GET /account/me`

### Masalah

Menu & halaman Persetujuan Cuti harus **approver-only** (reversal CU-10): hanya pegawai yang
berada dalam rantai approval cuti (punya anak buah) yang melihat menu; staf tidak.

Tidak bisa pakai permission `CUTI:APPROVE`: rantai approval bersifat **posisional**
(`picSaatIni` = jabatan approver dari struktur jabatan), dan supervisor ber-role `USER` yang
tidak memegang `CUTI:APPROVE` tetap harus bisa menyetujui.

### Permintaan

Tambah field boolean di respons `GET /account/me` (envelope `SingleResult`, data saat ini
`{ id, name, roles, permissions }`):

```json
{
  "status": 200,
  "data": {
    "id": "123",
    "name": "Budi Santoso",
    "roles": ["USER"],
    "permissions": ["PEGAWAI:READ", "PROFIL:READ", "CUTI:READ", "..."],
    "isCutiApprover": true
  }
}
```

Semantik `isCutiApprover`: **posisional** — principal berada dalam rantai approval cuti
sebagai approver potensial (punya bawahan yang mengaju kepadanya / muncul sebagai
`picSaatIni` untuk setidaknya satu jabatan), **bukan** bergantung pada jumlah pengajuan
PENDING saat ini (approver dengan nol antrian tetap `true`).

Nama field bisa disesuaikan (mis. `isApprover` / `isCutiApprover`) — FE butuh nilai boolean
yang menyatakan status approver cuti principal.

### Acceptance

- [ ] `GET /account/me` mengembalikan `isCutiApprover: true` untuk supervisor/kepala yang punya bawahan (contoh: NIPAM `890300426`).
- [ ] `isCutiApprover: false` untuk jabatan staf tanpa bawahan.
- [ ] Nilai tidak berubah hanya karena tidak ada pengajuan PENDING di tahun berjalan.

---

## Catatan implementasi FE (referensi)

- `getPegawaiSession()` (FE) **tidak berubah** — tetap `GET /pegawai/{$id}`.
- `getAccountSession()` (FE, `src/lib/auth/accountSession.ts`) meneruskan
  `isCutiApprover` → root layout `(app)/layout.tsx` → `AppShell` (hide menu) dan
  `cuti/persetujuan/page.tsx` (guard `forbidden()`).
- Tipe di-sync via `bun run spec:sync` → `src/types/account/me.ts` (generated).
