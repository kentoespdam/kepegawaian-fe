# CLAIM-ORDER — Penggajian M6: Fase 03 Tambahan Komponen

> **Milestone 6 dari 7** untuk modul Penggajian. Tergantung M5 (layout + stepper rail + verifikasi pattern).
> Baca [`docs/context/penggajian.md`](context/penggajian.md) dulu.

## Tujuan

Implementasi **fase 03 Tambahan Komponen**: Spv/Staf Keuangan menambahkan komponen gaji di luar
sistem (bonus, lembur, potongan khusus) per-pegawai untuk batch ini.

## Step-by-step

| # | Aksi | File |
|---|---|---|
| 1 | Server tipis + permission check `penggajian.tambahan` | `src/app/(app)/penggajian/batch/[id]/tambahan/page.tsx` |
| 2 | Client `TambahanClient.tsx` | `src/app/(app)/penggajian/batch/[id]/tambahan/tambahan-client.tsx` |
| 3 | Hook `useBatchMasterProses(batchId)` (list) | `src/hooks/penggajian/useBatchMasterProses.ts` |
| 4 | Hook `useCreateBatchMasterProses()` (POST /batch/master/proses) | `src/hooks/penggajian/useCreateBatchMasterProses.ts` |
| 5 | Hook `useDeleteBatchMasterProses()` | `src/hooks/penggajian/useDeleteBatchMasterProses.ts` |
| 6 | Tabel kiri: daftar pegawai grouped-by-organisasi (sama seperti fase02) | reuse dari M5 |
| 7 | Panel kanan: rincian grouped-by-jenis + tombol **"+ Tambah Komponen"** per-jenis | inline |
| 8 | Dialog form "Tambah Komponen Gaji" dengan field: Nama, Jenis Gaji (radio), Nilai | `src/app/(app)/penggajian/batch/[id]/tambahan/_components/tambah-komponen-dialog.tsx` |
| 9 | Zod schema untuk tambah komponen | `src/lib/validations/penggajian/tambahan.schema.ts` |
| 10 | State: `?pegawaiId=N` + `?addJenis=PEMASUKAN` (untuk reopen dialog dgn state) | URL single source of truth |
| 11 | Tests | `*.test.ts` |

## Dialog Form "Tambah Komponen Gaji"

| Field | Type | Required |
|---|---|---|
| `Nama` | text | ✓ |
| `Jenis Gaji` | radio (`-` / `Pemasukan` / `Potongan`) | ✓ |
| `Nilai` | number (default 0) | ✓ |

## Backend

- `POST /penggajian/batch/master/proses` — tambah komponen
- `DELETE /penggajian/batch/master/proses/{id}` — hapus komponen (icon trash di tabel kanan)
- `GET /penggajian/batch/master/proses/{batchMasterId}/master` — list

## Build Order

Hooks → Page/Client → Dialog → Tests.

## Definition of Done

- [x] Halaman reachable hanya untuk role `staf-keuangan` / `admin`
- [x] Step rail: fase ini enabled hanya jika status batch = `WAIT_VERIFICATION_PHASE_1` ATAU `PROSES`
- [x] Tombol "+ Tambah Komponen" → Dialog → submit → success → rincian refresh
- [x] Icon trash di kanan hapus komponen (tunggu 200, sesuai CONTEXT-MAP)
- [x] Tests green
- [x] Commit: `feat(penggajian/batch/fase-03): tambahan komponen`

## Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Dialog tambah tereopen saat refresh | URL `?addJenis=` untuk kontrol state, dialog default close |
| Komponen duplikat (Nama sama) | Backend validate; FE tampilkan error inline |
| Step rail: fase03 enabled padahal fase02 belum selesai | Backend status = gate utama; FE hanya menyembunyikan tapi backend tolak |

## Lanjut ke M7

Setelah M6 selesai, klaim M7: `docs/CLAIM-ORDER-penggajian-fase-04.md`.