# CLAIM-ORDER — Penggajian M7: Fase 04 Persetujuan Akhir

> **Milestone 7 dari 7** untuk modul Penggajian. Tergantung M6 (Tambahan).
> Baca [`docs/context/penggajian.md`](context/penggajian.md) dulu.

## Tujuan

Implementasi **fase 04 Verifikasi Tahap 2 & Persetujuan Akhir**: Manager Keuangan memverifikasi
final dan menyetujui batch. Tampilan lebih kaya (kolom eksekutif, subtotal per group, 4 tombol
toolbar).

## Step-by-step

| # | Aksi | File |
|---|---|---|
| 1 | Server tipis + permission check `penggajian.approve` | `src/app/(app)/penggajian/batch/[id]/persetujuan/page.tsx` |
| 2 | Client `PersetujuanClient.tsx` | `src/app/(app)/penggajian/batch/[id]/persetujuan/persetujuan-client.tsx` |
| 3 | Hook `useVerify2(batchId)` | `src/hooks/penggajian/useVerify2.ts` |
| 4 | Hook `useAcceptBatch(batchId)` (PATCH /batch/{id}/accept) | `src/hooks/penggajian/useAcceptBatch.ts` |
| 5 | Hook `useKirimSlipGaji(batchId)` (PATCH /batch/master/upload/{rootBatchId}) | `src/hooks/penggajian/useKirimSlipGaji.ts` |
| 6 | Hook `useReprosesBatch(batchId)` (PATCH /batch/{id}/reprocess) | `src/hooks/penggajian/useReprosesBatch.ts` |
| 7 | Hook `useDownloadTableGaji()` & `useDownloadPotonganGaji()` (CSV download) | `src/hooks/penggajian/useDownloadGaji.ts` |
| 8 | Tabel eksekutif kiri dengan kolom ekstra: Penghasilan, Potongan, Pembulatan, Jumlah Bersih | inline |
| 9 | Subtotal per group organisasi (baris "Total : N Pegawai") di bawah tiap group | inline |
| 10 | Panel kanan: rincian read-only grouped-by-jenis (sama seperti fase02/03) | reuse |
| 11 | Toolbar atas 4 tombol: **Tampilkan** (refresh), **Verifikasi**, **Proses Ulang**, **Kirim Slip Gaji** | inline |
| 12 | Tombol **Setujui** di header (batch-level, primary) | inline |
| 13 | State: `?pegawaiId=N` | URL single source of truth |
| 14 | Tests | `*.test.ts` |

## Toolbar Tombol — Backend Mapping

| Tombol | Backend Endpoint | Akses Role |
|---|---|---|
| Tampilkan | (refresh lokal) | semua |
| Verifikasi | `PATCH /batch/{id}/verify2` | manager-keuangan |
| Proses Ulang | `PATCH /batch/{id}/reprocess` | manager-keuangan |
| Kirim Slip Gaji | `PATCH /batch/master/upload/{rootBatchId}` | manager-keangan |
| Download Table Gaji | `GET /batch/master/download/table-gaji/{rootBatchId}` | manager-keangan |
| Download Potongan Gaji | `GET /batch/master/download/potongan-gaji/{rootBatchId}` | manager-keangan |
| Setujui | `PATCH /batch/{id}/accept` | manager-keangan |

## Build Order

Hooks → Page/Client → Toolbar 4 tombol → Tombol Setujui → Tests.

## Definition of Done

- [x] Halaman reachable hanya untuk role `manager-keuangan` / `admin`
- [x] Step rail: fase ini enabled hanya jika status = `WAIT_APPROVAL`
- [x] Tabel eksekutif: kolom Penghasilan/Potongan/Pembulatan/Jumlah Bersih, subtotal per group
- [x] 4 tombol toolbar berfungsi (Verifikasi/Proses Ulang/Kirim Slip/Download)
- [x] Tombol **Setujui** → PATCH `/accept` → sukses → status `FINISHED` → semua tombol disabled (read-only)
- [x] Tests green
- [x] Commit: `feat(penggajian/batch/fase-04): persetujuan akhir`

## Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Setujui di-klik → status FINISHED → semua disabled | Backend lock; FE lock local state via query cache |
| Download file CSV besar | Backend stream; FE trigger download via `window.location` atau blob |
| Tombol Verifikasi + Setujui rancu (sama-sama "verify") | Label UI: "Verifikasi Tahap 2" untuk verify2, "Setujui" untuk accept (sesuai keputusan P4) |
| Slip gaji gagal terkirim | Backend response 200 = toast "Berhasil"; 4xx/5xx = inline error |

## Penutup Modul

Setelah M7 selesai:
- [x] Update `docs/context/penggajian.md` — tandai semua milestone ✅
- [x] Update `CONTEXT-MAP.md` — tandai Penggajian ✅
- [ ] Commit final: `docs(penggajian): semua milestone selesai` — **todo**
- [ ] `bd dolt push` + `git push` — **todo**