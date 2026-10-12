# 0049. Async Report Export & Polling Architecture

## Status
Accepted

## Context
Aplikasi membutuhkan fitur export laporan ke Excel untuk berbagai jenis data (DUK, DNP, Mutasi, dll). Karena laporan bisa berskala besar, backend mengeksekusinya secara asinkron. Backend menyediakan tiga *endpoint* dengan pola generik:
1. `POST /laporan/kepegawaian/{jenis}/export` -> Mengembalikan `jobId`.
2. `GET /laporan/kepegawaian/jobs/{jobId}` -> Polling status job (`PENDING`, `PROCESSING`, `COMPLETED`, `FAILED`).
3. `GET /laporan/kepegawaian/jobs/{jobId}/download` -> Download file binary hasil laporan.

Tantangannya adalah memastikan UX saat export tetap interaktif dan tidak memblokir user (non-blocking) karena proses *generate* file di sisi *server* bisa memakan waktu.

## Decision
1. **Global Async Polling:** Kami mengimplementasikan pola UX *Non-blocking Global Toast*. Saat user men-trigger export, sebuah notifikasi (toast) muncul menandakan job sedang diproses.
2. **Background Execution:** User bebas berpindah halaman (navigasi) selama proses polling berjalan di *background*.
3. **Completion Action:** Saat API mengembalikan status `COMPLETED`, toast akan diperbarui menjadi sukses dan menampilkan tombol "Download" yang terhubung ke endpoint `/download`.
4. **Navigation Structure:** Navigasi modul laporan diletakkan pada sub-menu di *sidebar* utama di bawah "Laporan Kepegawaian", seperti `Laporan Kepegawaian > DUK` dan `Laporan Kepegawaian > DNP`. Laporan struktural yang hanya memiliki fitur export langsung akan divisualisasikan dengan deskripsi singkat dan tombol aksi pada halaman utamanya.

## Consequences
- Memerlukan mekanisme global state (atau toast persistensi seperti `sonner`) agar polling tetap hidup dan tidak terputus meskipun rute URL halaman berubah.
- Memberikan UX yang modern dan responsif, tetapi membutuhkan pembersihan memori (clearInterval) yang tepat jika job dibatalkan atau selesai.
