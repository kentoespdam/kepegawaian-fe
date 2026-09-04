# ADR-0046 — Penggajian: Simplifikasi Endpoint Verifikasi Menjadi Single Endpoint & Komponen Generic Reusable

**Tanggal:** 2026-09-04  
**Status:** Accepted

---

## Konteks

Sebelumnya, workflow payroll di backend Spring Boot mengekspos endpoint verifikasi terpisah per fase:
- Fase 02: `PATCH /penggajian/batch/{id}/verify1` dengan `phase: "WAIT_VERIFICATION_PHASE_1"`
- Fase 03: `PATCH /penggajian/batch/{id}/verify2` dengan `phase: "WAIT_VERIFICATION_PHASE_2"`
- Fase 04: `PATCH /penggajian/batch/{id}/accept` dengan `phase: "WAIT_APPROVAL"`
- Reprocess: `PATCH /penggajian/batch/{id}/reprocess` dengan `phase: targetPhase` (dihitung FE via `getReprocessPhase`)

Pendekatan lama memaksa frontend mengetahui dan mengelola state machine phase secara eksplisit.
Backend kini telah menyederhanakan arsitektur pemrosesan:
1. Endpoint maju disatukan menjadi **1 endpoint**: `PATCH /penggajian/batch/{id}/verify`. Backend secara cerdas mendeteksi fase batch saat ini dan memajukannya ke fase berikutnya.
2. Parameter `phase` dibuang dari request body.
3. Request body `verify` cukup berisi `{ id, nama, jabatan }`.
4. Request body `reprocess` cukup berisi `{ id }`, dan backend otomatis menentukan target rollback.

---

## Keputusan

1. **Single Endpoint Verifikasi**:
   - Ganti pemanggilan `/verify1`, `/verify2`, `/accept` dengan endpoint tunggal: `PATCH /penggajian/batch/{id}/verify`.
   - Request body verifikasi: `{ id: batchId, nama: userName, jabatan: jabatanName }`.

2. **Single Endpoint Reprocess Tanpa Phase**:
   - `PATCH /penggajian/batch/{id}/reprocess` hanya mengirim `{ id: batchId }`.
   - Hapus utilitas kalkulasi phase di FE (`src/lib/utils/penggajian-reprocess.ts`).

3. **Komponen Generic & Reusable**:
   - Buat `<VerifyButton>` (`src/components/penggajian/verify-button.tsx`) yang membungkus trigger button dan modal konfirmasi `<AlertDialog>`.
   - Buat `<ReprocessButton>` (`src/components/penggajian/reprocess-button.tsx`) yang juga membungkus trigger button dan modal konfirmasi `<AlertDialog>`.
   - Kedua komponen bersifat self-contained (mengelola dialog state sendiri), menerima `batchId`, opsi label, styling, dan callback `onSuccess`.
   - Konsumen di 4 halaman fase (`/proses-gaji`, `/verifikasi`, `/tambahan`, `/persetujuan`) tinggal memasang komponen generic tersebut tanpa boilerplate modal/handler inline.

---

## Konsekuensi

### Positif
- **KISS & DRY**: Menghilangkan duplikasi kode dialog konfirmasi dan mutation handler di 4 halaman client penggajian.
- **Dekopling State Machine**: FE tidak lagi menyimpan logika aturan transisi `phase` — jika ada penyesuaian aturan state di backend, FE tidak terdampak.
- **Pemeliharaan Mudah**: Komponen `<VerifyButton>` dan `<ReprocessButton>` teruji secara terisolasi via unit test dan dapat digunakan di halaman manapun yang membutuhkan aksi batch.

### Negatif / Trade-off
- Perlu memastikan backend sudah menerapkan endpoint `/verify` sebelum deployment frontend ke environment terkait.

---

## Referensi
- [`docs/context/penggajian.md`](../context/penggajian.md)
- [ADR-0016: Modul Penggajian RBAC & Workflow](0016-penggajian-sub-modul-rbac-workflow.md)
- [ADR-0045: Standalone Phase Pages with Period-Based Filtering](0045-penggajian-standalone-phase-pages.md)
