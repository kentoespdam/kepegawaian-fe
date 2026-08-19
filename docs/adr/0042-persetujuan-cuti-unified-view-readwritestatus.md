# ADR-0042 — Persetujuan Cuti: Unifikasi View dengan readWriteStatus Filter

**Tanggal:** 2026-08-19
**Status:** Accepted

---

## Konteks

Halaman persetujuan cuti saat ini terdiri dari dua route terpisah:

- `/cuti/persetujuan` — view "menunggu", backend filter `approvalCutiStatus=PENDING`
- `/cuti/persetujuan/riwayat` — view "riwayat", client-side filter exclude PENDING

Masalah:

1. **Dua halaman untuk satu tabel** — user harus navigasi antar halaman untuk melihat data yang sudah vs belum diproses. UX friction.
2. **Filter `approvalStatus` di toolbar** — nilai status sudah ditampilkan di kolom tabel. Filter ini redundan dan menambah clutter toolbar.
3. **Client-side filtering untuk riwayat** — backend tidak mendukung multi-value `approvalCutiStatus`. Filter dilakukan di frontend, artinya semua data tetap di-fetch lalu difilter manual.
4. **`readWriteStatus` sudah tersedia** — backend endpoint `GET /cuti/pengajuan/approval` sudah support param `readWriteStatus` (enum: `NONE`, `READ`, `WRITE`). Field ini secara natural memisahkan "belum diproses" (WRITE) dari "sudah diproses" (READ).

---

## Keputusan

1. **Satu halaman `/cuti/persetujuan`** dengan dropdown `readWriteStatus` sebagai filter utama. Hapus route `/cuti/persetujuan/riwayat`.
2. **Hapus filter `approvalStatus`** dari toolbar. Status tetap ditampilkan di kolom tabel.
3. **Dropdown `readWriteStatus`** memiliki 2 opsi:
   - "Belum Diproses" → `readWriteStatus=WRITE`
   - "Sudah Diproses" → `readWriteStatus=READ`
   - Placeholder "Semua" → tidak kirim param (tampilkan semua)
   - `NONE` dikecualikan karena user tidak bisa akses baris itu.
4. **Default view: `WRITE`** — saat halaman dibuka tanpa param `readWriteStatus` di URL, default ke `WRITE` (Belum Diproses). Ini action view, user paling sering approve/reject.
5. **Backend filter** — gunakan `readWriteStatus` sebagai query param ke backend. Tidak ada client-side filtering.
6. **Route lama di-redirect** — `/cuti/persetujuan/riwayat` dihapus, redirect ke `/cuti/persetujuan`.

---

## Alasan

1. **`readWriteStatus` adalah pemisah alami.** `WRITE` = baris yang bisa diapa-apakan (approve/reject), `READ` = baris yang sudah diproses. Lebih jelas dari `approvalCutiStatus` yang punya 6 nilai.
2. **Satu halaman = UX lebih baik.** Tidak perlu navigasi antar halaman. Dropdown filter cukup untuk switching view.
3. **Backend sudah support.** Endpoint `GET /cuti/pengajuan/approval` menerima `readWriteStatus` sebagai optional query param. Tidak perlu perubahan backend.
4. **Hapus redundansi.** `approvalStatus` di toolbar redundan dengan kolom Status di tabel. Mengurangi clutter.
5. **Default `WRITE` = langsung ke yang perlu dikerjakan.** User approver paling sering membuka halaman ini untuk approve/reject, bukan untuk melihat riwayat.

---

## Konsekuensi

- **Route dihapus:** `/cuti/persetujuan/riwayat` tidak ada lagi. Sidebar tidak punya link ke route ini (sudah tidak ada sebelumnya).
- **Perubahan FE:**
  - `persetujuan-page-client.tsx` — hapus dual view logic, ganti ke `readWriteStatus` filter, hapus `STATUS_OPTIONS` dan `approvalStatus` state
  - `persetujuan-page-client.test.tsx` — update test sesuai flow baru
  - `riwayat/page.tsx` — redirect ke `/cuti/persetujuan`
- **Tidak terpengaruh:** Detail dialog, approval mutation, sidebar, auth guard.
- **Backend:** Tidak perlu perubahan. `readWriteStatus` sudah didukung.
