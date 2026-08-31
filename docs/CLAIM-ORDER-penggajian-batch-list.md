# CLAIM-ORDER — Penggajian M3: List Batch + Dialog Create

> **Milestone 3 dari 7** untuk modul Penggajian. Tergantung M1 (fondasi).
> Baca [`docs/context/penggajian.md`](context/penggajian.md) dulu.

## Tujuan

Implementasi halaman **list semua batch payroll** + **Dialog "Buat Proses Gaji Baru"** untuk
create batch baru. Entry point dari sidebar sub-grup "Proses Batch".

## Step-by-step

| # | Aksi | File |
|---|---|---|
| 1 | Generated types verify | `src/types/penggajian/batch.ts` (sudah ada — `StatusBatch`, `BatchSearchParams`, `GajiBatchRootResponse`) |
| 2 | Hook `useBatchList(filters)` | `src/hooks/penggajian/useBatchList.ts` |
| 3 | Hook `useCreateBatch` (FormData + binary `fileName`) | `src/hooks/penggajian/useCreateBatch.ts` |
| 4 | Config `batch-list.config.ts` (columns + filters) | `src/config/penggajian/batch-list.config.ts` |
| 5 | Page `/penggajian/batch/page.tsx` (server tipis) | `src/app/(app)/penggajian/batch/page.tsx` |
| 6 | Client `BatchListClient.tsx` | `src/app/(app)/penggajian/batch/batch-list-client.tsx` |
| 7 | Toolbar: filter `periode` (tahun+bulan) + filter `status` | inline |
| 8 | Dialog form "Buat Proses Gaji Baru" | `src/app/(app)/penggajian/batch/create-batch-dialog.tsx` |
| 9 | Zod schema untuk create batch | `src/lib/validations/penggajian/batch.schema.ts` |
| 10 | File upload handling (FormData, `fileName` binary) | dalam `useCreateBatch` |
| 11 | Tests: hooks + dialog submit flow | `*.test.ts` |

## Field Dialog Form

| Field | Type | Source | Required |
|---|---|---|---|
| `Tahun` | number | user input | ✓ |
| `Bulan` | number 01-12 | user input | ✓ |
| `Di Proses Oleh` | text | pre-fill dari session.nama | ✓ |
| `Jabatan Pemroses` | text | pre-fill dari session.jabatan | ✓ |
| `Lampiran Potongan TKK` | file | user upload | ✗ (binary, optional) |

> **Bug label**: UI existing pakai label "Lampiran SK Terminasi" — **salah**. Backend menerima
> file `fileName` yang dipakai untuk upload lampiran potongan TKK. Label form = **"Lampiran Potongan TKK"**.

## Behavior Setelah Create

- Backend return `GajiBatchRootResponse` dengan `id` baru
- Frontend: `router.push(/penggajian/batch/{newId}/setup)` — langsung masuk fase 01
- Success toast "Proses gaji baru berhasil dibuat"

## Build Order

Hooks → Config → Page/Client → Dialog → Tests.

## Definition of Done

- [ ] Halaman `/penggajian/batch` reachable dari sidebar (visible jika role punya salah satu permission `penggajian.*`)
- [ ] Tabel list menampilkan batch dengan filter periode + status
- [ ] Tombol "+ Buat Proses Gaji Baru" buka Dialog form
- [ ] Submit create → redirect ke `/batch/{id}/setup`
- [ ] File upload bekerja (multipart FormData)
- [ ] Build & test green
- [ ] Commit: `feat(penggajian/batch): list + create dialog`

## Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| File upload ukuran besar (>5MB) | Tampilkan warning; biarkan backend validate (jangan tambah client validation berlebihan) |
| FormData vs JSON — proxy.ts harus handle | Verify `/api/proxy/penggajian/batch` route support multipart (lihat proxy.ts pattern existing) |
| State `PENDING` vs `PROSES` setelah create | Default filter = "Aktif" (exclude `FINISHED`) — biar HR fokus ke batch berjalan |

## Lanjut ke M4

Setelah M3 selesai, klaim M4: `docs/CLAIM-ORDER-penggajian-fase-01.md`.