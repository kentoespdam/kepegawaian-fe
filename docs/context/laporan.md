# Laporan Module Context

Dokumen ini berisi keputusan spesifik dan konvensi untuk modul Laporan.
Baca `CONTEXT-MAP.md` untuk arsitektur utama.

## Async Export UX

Banyak laporan di-generate secara asinkron dari backend (misal: DUK, DNP). Konvensi UX-nya adalah **Non-blocking Global Toast**.
1. **Trigger:** User menekan tombol "Export" pada halaman spesifik laporan.
2. **Notifikasi:** Muncul global toast (misal: "Memproses laporan DUK...") dengan *loading spinner*.
3. **Polling:** UI melakukan polling ke `/laporan/kepegawaian/jobs/{jobId}` tanpa memblokir layar. User bebas menavigasi menu lain.
4. **Selesai:** Toast berubah wujud menjadi "Laporan Selesai" dengan aksi tombol "Download".

## Navigation

- Modul laporan ditempatkan pada *sidebar* utama dengan grup label "Laporan Kepegawaian".
- Setiap jenis laporan (seperti DUK, DNP, Mutasi) dikelompokkan sebagai sub-menu di dalam grup tersebut.
- Halaman utama dari sebuah laporan spesifik (seperti `/laporan/duk`) secara minimal berisi judul, deskripsi laporan, dan *action button* (tombol Export).
