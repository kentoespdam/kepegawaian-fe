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

> **Re-confirm live (2026-08-18):** dilaporkan ulang dari halaman `/cuti/pengajuan`
> (CU-6: semua pegawai login seharusnya bisa melihat data cuti sendiri). Satu fungsi
> `getPegawaiSession()` → tiga halaman (Dashboard, Pengajuan, Persetujuan) — fix di sini
> memperbaiki ketiganya sekaligus. FE **tidak berubah** (D1, ADR-0041); tidak ada seam FE
> yang bisa mengunci bug ini — NIPAM principal hanya diketahui backend (chicken-egg).

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
- [ ] Halaman `/cuti/pengajuan` user tsb menampilkan list pengajuan & strip kuota miliknya
      (bukan empty state "Akun ini tidak terhubung ke data pegawai"); Dashboard &
      Persetujuan ikut beres (satu fungsi).
- [ ] Akun non-pegawai (admin murni) tetap 404 → empty state dipertahankan.
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

## R3 — `approvalCutiStatus` di `GET /cuti/pengajuan/approval` opsional + default `PENDING`

### Masalah

Spec OpenAPI (`docs/api/cuti/api.json`) menandai query param `approvalCutiStatus` sebagai
`required: true`, tetapi FE **sengaja tidak mengirim** di tab "Riwayat Persetujuan"
(spike CU-10: backend filter status = **1 nilai**, sehingga riwayat = semua status
non-PENDING di-filter client). Jika backend benar-benar mewajibkan param → tab Riwayat
mendapat 400.

### Permintaan

Jadikan `approvalCutiStatus` **opsional dengan default `PENDING`**
(`@RequestParam(required = false, defaultValue = "PENDING")`):

- Tab "Menunggu" tetap mengirim `approvalCutiStatus=PENDING` eksplisit (tidak berubah).
- Tanpa param → filter default `PENDING` (bukan 400).

### Acceptance

- [ ] `GET /cuti/pengajuan/approval?tahun&picSaatIniId` tanpa `approvalCutiStatus` → 200, hanya baris `PENDING`.
- [ ] Dengan `approvalCutiStatus=PENDING` eksplisit → 200, perilaku identik dengan default.
- [ ] Nilai `PENDING/APPROVED/...` lain tetap bekerja seperti sekarang.

> ⚠️ Catatan: dengan default ini, tab "Riwayat Persetujuan" FE (yang tidak mengirim param)
> hanya akan menerima baris `PENDING` → filter client non-PENDING menghasilkan list kosong.
> Keputusan FE menyusul (query per-status / multi-value) — tercatat di `docs/context/cuti.md` CU-10.

---

## R4 — Role `USER` tidak memegang `CUTI:WRITE` (gate Kuota Cuti)

### Masalah

Gate FE halaman & menu **Kuota Cuti** = permission `CUTI:WRITE` ("Kelola jenis/kuota cuti" —
katalog BE). Akun role `USER` (jabatan Supervisor) masih **melihat menu & halaman Kuota Cuti**,
berarti mapping `pref_role_permission` di BE memberi `CUTI:WRITE` ke role `USER`.

Seed matrix terdokumentasi (FE-CONTRACT-profil-update-approval-rbac.md L184, V31+V33+V34+V35):
`USER` = 7 permission (`PEGAWAI:READ`, `PROFIL:READ/UPDATE`, `KEPEGAWAIAN:READ`, `CUTI:READ`,
`PENGGAJIAN:READ`, `LAPORAN:READ`) — **tanpa** `CUTI:WRITE`; `HRD` = 14 termasuk `CUTI:WRITE`.

### Permintaan

- Hapus `CUTI:WRITE` dari mapping role `USER` di `pref_role_permission` (kembalikan sesuai seed matrix).
- Pastikan `CUTI:WRITE` hanya dimiliki role `ADMIN` + `HRD`.

### Acceptance

- [ ] Akun role `USER` (supervisor) tidak melihat item menu "Kuota Cuti"; akses langsung `/cuti/kuota` → 404 (FE `forbidden()`).
- [ ] Akun `HRD` & `ADMIN` tetap melihat menu & halaman Kuota Cuti (CRUD + Import jalan).
- [ ] Tidak ada regresi pengajuan/persetujuan cuti (endpoint cuti lain terbuka sesuai rantai posisional).

---

## Catatan implementasi FE (referensi)

- `getPegawaiSession()` (FE) **tidak berubah** — tetap `GET /pegawai/{$id}`.
- `getAccountSession()` (FE, `src/lib/auth/accountSession.ts`) meneruskan
  `isCutiApprover` → root layout `(app)/layout.tsx` → `AppShell` (hide menu) dan
  `cuti/persetujuan/page.tsx` (guard `forbidden()`).
- Tipe di-sync via `bun run spec:sync` → `src/types/account/me.ts` (generated).
