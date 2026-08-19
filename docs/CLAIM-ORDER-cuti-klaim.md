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

### Issue 1 — Badge + Filter di Tabel Pengajuan

**Depends on:** — (siap diklaim)

- [ ] Tambah kolom **badge** di tabel pengajuan: tampilkan `PENGAJUAN` atau `KLAIM` berdasarkan `jenisPengajuanCuti`
- [ ] Badge menggunakan variant warna berbeda (misal: primary untuk PENGAJUAN, secondary untuk KLAIM)
- [ ] Tambah **filter dropdown** `jenisPengajuanCuti` di toolbar (opsi: Semua / Pengajuan / Klaim)
- [ ] Filter URL-driven: `?tahun=...&jenisPengajuanCuti=...`
- [ ] Pastikan query param `jenisPengajuanCuti` dikirim ke backend
- [ ] `bun run build` — zero error

### Issue 2 — Tombol Klaim + Form Range Picker

**Depends on:** Issue 1 selesai

- [ ] Tombol **"Klaim"** di kolom Aksi — muncul jika:
  - `approvalCutiStatus === "APPROVED"`
  - `isClaimed !== true`
  - `jenisPengajuanCuti === "PENGAJUAN_CUTI"`
- [ ] Klik "Klaim" → buka **Sheet (drawer kanan)** dengan form klaim
- [ ] **Form fields:**
  - Info Pengajuan Asal (read-only): Jenis Cuti, Periode, Jumlah Hari
  - Tanggal Mulai Klaim (date picker, required)
  - Tanggal Selesai Klaim (date picker, required)
  - Jumlah Hari Klaim (read-only, calculated)
  - Keterangan (textarea, optional)
- [ ] **Validasi:**
  - Tanggal Mulai ≥ `tanggalMulai` pengajuan asal
  - Tanggal Mulai ≤ `tanggalSelesai` pengajuan asal
  - Tanggal Selesai ≥ Tanggal Mulai Klaim
  - Tanggal Selesai ≤ `tanggalSelesai` pengajuan asal
- [ ] **Default:** Mulai = `tanggalMulai`, Selesai = `tanggalSelesai` (full range)
- [ ] Generate `listHari` client-side dari range (expand ke array tanggal)
- [ ] Submit → `POST /cuti/pengajuan/klaim` via `useMutation`
- [ ] Toast sukses/gagal → `invalidateQueries` → tutup Sheet
- [ ] `bun run build` — zero error

### Issue 3 — Cancel Klaim PENDING

**Depends on:** Issue 2 selesai

- [ ] Tombol **"Batalkan"** di kolom Aksi untuk record `KLAIM_CUTI` dengan status `PENDING`
- [ ] Konfirmasi dialog sebelum eksekusi (polosama seperti CU-9)
- [ ] Endpoint: `DELETE /cuti/pengajuan/{id}`
- [ ] `invalidateQueries` → update tabel
- [ ] `bun run build` — zero error

### Issue 4 — Handling `isClaimed` + REJECTED Reset

**Depends on:** Issue 2 selesai

- [ ] Pastikan tombol Klaim **tidak muncul** jika `isClaimed === true`
- [ ] Pastikan tombol Klaim **muncul** jika `isClaimed === false` dan status APPROVED
- [ ] Handle kasus klaim REJECTED — `isClaimed` reset → tombol Klaim muncul kembali
- [ ] `bun run build` — zero error

### Issue 5 — Unit Tests

**Depends on:** Issue 2 selesai

- [ ] Test badge rendering (PENGAJUAN vs KLAIM)
- [ ] Test filter dropdown `jenisPengajuanCuti`
- [ ] Test tombol Klaim visibility (APPROVED + !isClaimed)
- [ ] Test form validation (tanggal dalam rentang pengajuan asal)
- [ ] Test `listHari` generation dari range
- [ ] `bun run test` — all green

---

## Quality Gate (per issue)

- [ ] `bun run build` — zero error
- [ ] `bunx biome check` — zero lint error
- [ ] `bun run test` — all green (setelah Issue 5)

---

## Endpoint yang Dipakai

| Operasi | Endpoint | Body |
|---------|----------|------|
| Klaim cuti | `POST /cuti/pengajuan/klaim` | `CutiPengajuanKlaimPostRequest` |
| Update klaim | `PUT /cuti/pengajuan/klaim/{id}` | `CutiPengajuanKlaimPostRequest` |
| Batalkan klaim | `DELETE /cuti/pengajuan/{id}` | — |
| Approval klaim | `POST /cuti/approval/klaim` | `CutiApprovalPostRequest` |
