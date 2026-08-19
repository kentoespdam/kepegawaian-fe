# CLAIM ORDER — Klaim Cuti (CU-22 s/d CU-33)

> **Modul:** Cuti — Klaim Cuti
> **Grill:** 2026-08-19
> **Keputusan terkunci:** CU-22 s/d CU-33, ADR-0044
>
> Alur per issue: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.

---

## Context Files

| File | Keterangan |
|------|------------|
| `docs/context/cuti.md` | CU-22 s/d CU-33 — keputusan klaim cuti |
| `docs/adr/0044-klaim-cuti-self-service-range-picker.md` | ADR klaim cuti |
| `docs/api/cuti/api.json` | Backend spec — `POST /cuti/pengajuan/klaim`, `POST /cuti/approval/klaim` |
| `src/types/cuti/pengajuan.ts` | `CutiPengajuanKlaimPostRequest`, `KlaimCuti`, `isClaimed` |
| `src/app/(app)/cuti/pengajuan/pengajuan-page-client.tsx` | Existing pengajuan page |

---

## Urutan Claim

### Issue 1 — Badge + Filter di Tabel Pengajuan ✅

**Depends on:** — (siap diklaim)

- [x] Tambah kolom **badge** di tabel pengajuan: tampilkan `PENGAJUAN` atau `KLAIM` berdasarkan `jenisPengajuanCuti`
- [x] Badge menggunakan variant warna berbeda (misal: primary untuk PENGAJUAN, secondary untuk KLAIM)
- [x] Tambah **filter dropdown** `jenisPengajuanCuti` di toolbar (opsi: Semua / Pengajuan / Klaim)
- [x] Filter URL-driven: `?tahun=...&jenisPengajuanCuti=...`
- [x] Pastikan query param `jenisPengajuanCuti` dikirim ke backend
- [x] `bun run build` — zero error

### Issue 2 — Tombol Klaim + Form Range Picker ✅

**Depends on:** Issue 1 selesai

- [x] Tombol **"Klaim"** di kolom Aksi — muncul jika:
  - `approvalCutiStatus === "APPROVED"`
  - `isClaimed !== true`
  - `jenisPengajuanCuti === "PENGAJUAN_CUTI"`
- [x] Klik "Klaim" → buka **Sheet (drawer kanan)** dengan form klaim
- [x] **Form fields:**
  - Info Pengajuan Asal (read-only): Jenis Cuti, Periode, Jumlah Hari
  - Tanggal Mulai Klaim (date picker, required)
  - Tanggal Selesai Klaim (date picker, required)
  - Jumlah Hari Klaim (read-only, calculated)
  - Keterangan (textarea, optional)
- [x] **Validasi:**
  - Tanggal Mulai ≥ `tanggalMulai` pengajuan asal
  - Tanggal Mulai ≤ `tanggalSelesai` pengajuan asal
  - Tanggal Selesai ≥ Tanggal Mulai Klaim
  - Tanggal Selesai ≤ `tanggalSelesai` pengajuan asal
- [x] **Default:** Mulai = `tanggalMulai`, Selesai = `tanggalSelesai` (full range)
- [x] Generate `listHari` client-side dari range (expand ke array tanggal)
- [x] Submit → `POST /cuti/pengajuan/klaim` via `useMutation`
- [x] Toast sukses/gagal → `invalidateQueries` → tutup Sheet
- [x] `bun run build` — zero error

### Issue 3 — Cancel Klaim PENDING ✅

**Depends on:** Issue 2 selesai

- [x] Tombol **"Batalkan"** di kolom Aksi untuk record `KLAIM_CUTI` dengan status `PENDING`
- [x] Konfirmasi dialog sebelum eksekusi (polosama seperti CU-9)
- [x] Endpoint: `DELETE /cuti/pengajuan/{id}`
- [x] `invalidateQueries` → update tabel
- [x] `bun run build` — zero error

### Issue 4 — Handling `isClaimed` + REJECTED Reset ✅

**Depends on:** Issue 2 selesai

- [x] Pastikan tombol Klaim **tidak muncul** jika `isClaimed === true`
- [x] Pastikan tombol Klaim **muncul** jika `isClaimed === false` dan status APPROVED
- [x] Handle kasus klaim REJECTED — `isClaimed` reset → tombol Klaim muncul kembali
- [x] `bun run build` — zero error

### Issue 5 — Unit Tests ✅

**Depends on:** Issue 2 selesai

- [x] Test badge rendering (PENGAJUAN vs KLAIM)
- [x] Test filter dropdown `jenisPengajuanCuti`
- [x] Test tombol Klaim visibility (APPROVED + !isClaimed)
- [ ] Test form validation (tanggal dalam rentang pengajuan asal)
- [ ] Test `listHari` generation dari range
- [x] `bun run test` — all green

---

## Quality Gate (per issue)

- [x] `bun run build` — zero error
- [x] `bunx biome check` — zero lint error
- [x] `bun run test` — all green (setelah Issue 5)

---

## Endpoint yang Dipakai

| Operasi | Endpoint | Body |
|---------|----------|------|
| Klaim cuti | `POST /cuti/pengajuan/klaim` | `CutiPengajuanKlaimPostRequest` |
| Update klaim | `PUT /cuti/pengajuan/klaim/{id}` | `CutiPengajuanKlaimPostRequest` |
| Batalkan klaim | `DELETE /cuti/pengajuan/{id}` | — |
| Approval klaim | `POST /cuti/approval/klaim` | `CutiApprovalPostRequest` |
