# ADR-0042 — Persetujuan Cuti: Unifikasi View dengan readWriteStatus Filter

**Tanggal:** 2026-08-19
**Status:** Accepted
**Revisi:** 2026-08-19 — approvalCutiStatus wajib (BE 400 jika tidak dikirim)

---

## Konteks

Halaman persetujuan cuti saat ini terdiri dari dua route terpisah:

- `/cuti/persetujuan` — view "menunggu", backend filter `approvalCutiStatus=PENDING`
- `/cuti/persetujuan/riwayat` — view "riwayat", client-side filter exclude PENDING

Masalah:

1. **Dua halaman untuk satu tabel** — user harus navigasi antar halaman untuk melihat data yang sudah vs belum diproses. UX friction.
2. **Client-side filtering untuk riwayat** — backend tidak mendukung multi-value `approvalCutiStatus`. Filter dilakukan di frontend, artinya semua data tetap di-fetch lalu difilter manual.
3. **`readWriteStatus` sudah tersedia** — backend endpoint `GET /cuti/pengajuan/approval` sudah support param `readWriteStatus` (enum: `NONE`, `READ`, `WRITE`). Field ini secara natural memisahkan "belum diproses" (WRITE) dari "sudah diproses" (READ).
4. **`approvalCutiStatus` wajib** — backend return 400 jika param ini tidak dikirim, meskipun spec bilang `required: false` dengan `default: "PENDING"`.

---

## Keputusan

1. **Satu halaman `/cuti/persetujuan`** dengan dua dropdown filter: `approvalCutiStatus` + `readWriteStatus`. Hapus route `/cuti/persetujuan/riwayat`.
2. **`approvalCutiStatus` dropdown** — wajib dikirim ke backend (default `PENDING`). 5 opsi: Menunggu, Disetujui, Ditolak, Dikonfirmasi, Dibatalkan. Tanpa opsi "Semua" (backend hanya terima satu nilai).
3. **`readWriteStatus` dropdown** — opsional. 2 opsi: "Belum Diproses" (WRITE), "Sudah Diproses" (READ). Placeholder "Semua" (tidak kirim param).
4. **Route lama di-redirect** — `/cuti/persetujuan/riwayat` redirect ke `/cuti/persetujuan?readWriteStatus=READ`.
5. **Backend filter** — gunakan `approvalCutiStatus` + `readWriteStatus` sebagai query param. Tidak ada client-side filtering.

---

## Alasan

1. **`approvalCutiStatus` wajib karena BE 400.** Spec bilang `required: false` tapi implementasi BE galak — selalu kirim.
2. **`readWriteStatus` adalah pemisah alami.** `WRITE` = baris yang bisa diapa-apakan (approve/reject), `READ` = baris yang sudah diproses.
3. **Satu halaman = UX lebih baik.** Tidak perlu navigasi antar halaman. Dropdown filter cukup untuk switching view.
4. **Backend sudah support.** Endpoint `GET /cuti/pengajuan/approval` menerima kedua param.

---

## Konsekuensi

- **Route dihapus:** `/cuti/persetujuan/riwayat` redirect ke `/cuti/persetujuan?readWriteStatus=READ`.
- **Perubahan FE:**
  - `persetujuan-page-client.tsx` — hapus dual view logic, tambah 2 dropdown filter, selalu kirim `approvalCutiStatus`
  - `persetujuan-page-client.test.tsx` — update test sesuai flow baru
  - `riwayat/page.tsx` — redirect
- **Tidak terpengaruh:** Detail dialog, approval mutation, sidebar, auth guard.
- **Backend:** Tidak perlu perubahan. Kedua param sudah didukung.
