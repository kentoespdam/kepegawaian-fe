# CLAIM-ORDER — Penggajian M5: Fase 02 Verifikasi Tahap 1

> **Milestone 5 dari 7** untuk modul Penggajian. Tergantung M4 (layout + stepper rail).
> Baca [`docs/context/penggajian.md`](context/penggajian.md) dulu.

## Tujuan

Implementasi **fase 02 Verifikasi Tahap 1**: Manager SDM memverifikasi hasil batch dari fase01
sebelum masuk ke fase03 (Tambahan oleh Keuangan).

## Step-by-step

| # | Aksi | File |
|---|---|---|
| 1 | Server tipis + permission check `penggajian.verify1` | `src/app/(app)/penggajian/batch/[id]/verifikasi-1/page.tsx` |
| 2 | Client `Verifikasi1Client.tsx` | `src/app/(app)/penggajian/batch/[id]/verifikasi-1/verifikasi-1-client.tsx` |
| 3 | Hook `useVerify1(batchId)` (PATCH /batch/{id}/verify1) | `src/hooks/penggajian/useVerify1.ts` |
| 4 | Tabel kiri: daftar pegawai grouped-by-organisasi (read-only, sama seperti fase03) | reuse komponen dari M4 |
| 5 | Panel kanan: rincian gaji grouped-by-jenis (read-only) | reuse dari M4 |
| 6 | Toolbar atas: tombol **Verifikasi** (primary) | inline |
| 7 | State: `?pegawaiId=N` (selected employee) | reuse pola dari M4 |
| 8 | Tests | `*.test.ts` |

> **Read-only penuh**: tidak ada tombol tambah/edit/hapus di fase ini. Bedanya dengan fase03
> hanya di toolbar (ada tombol Verifikasi) dan tidak ada dialog tambah komponen.

## Backend

- `GET /penggajian/batch/master/pegawai/{pegawaiId}` — read rincian
- `PATCH /penggajian/batch/{id}/verify1` — aksi verifikasi (batch-level)

## Build Order

Hook → Page/Client → Toolbar tombol Verifikasi → Tests.

## Definition of Done

- [x] Halaman `/penggajian/batch/[id]/verifikasi-1` reachable hanya untuk role `manager-sdm` / `admin`
- [x] Step rail: fase ini enabled hanya jika status batch = `WAIT_VERIFICATION_PHASE_1`
- [x] Tombol Verifikasi → PATCH → sukses → redirect ke fase 03 (`/tambahan`)
- [x] Tidak ada tombol tambah/edit/hapus di tabel
- [x] Tests green
- [x] Commit: `feat(penggajian/batch/fase-02): verifikasi tahap 1`

## Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Tombol Verifikasi di-klik 2x | Disable button saat `isPending` mutation |
| State belum `WAIT_VERIFICATION_PHASE_1` saat user masuk | Show inline warning + disable tombol; backend ultimate gate |

## Lanjut ke M6

Setelah M5 selesai, klaim M6: `docs/CLAIM-ORDER-penggajian-fase-03.md`.