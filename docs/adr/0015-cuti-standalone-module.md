# ADR-0015 — Modul Cuti: Sub-modul Mandiri vs. Ekstensi Kepegawaian

**Tanggal:** 2026-08-18
**Status:** Accepted

---

## Konteks

Sistem sudah memiliki tampilan **Riwayat Cuti** (`/kepegawaian/data/{id}/riwayat/cuti`) —
read-only, tertanam di konsol riwayat per-pegawai, bagian dari modul `kepegawaian/`.

Fitur baru yang diminta mencakup tiga alur interaktif: Kuota Cuti (CRUD + import oleh SDM),
Pengajuan Cuti (self-service pegawai), dan Persetujuan Cuti (approval chain multi-level).
Ketiganya punya state machine, mutation, dan RBAC yang berbeda dari riwayat per-pegawai.

**Pertanyaan:** Apakah fitur baru ini diletakkan di dalam `kepegawaian/` (sebagai halaman baru),
atau dijadikan modul mandiri `cuti/` di root `(app)/`?

---

## Keputusan

Fitur Cuti Pegawai diimplementasikan sebagai **modul mandiri** di `(app)/cuti/` dengan tiga
sub-route:

- `/cuti/kuota` — Kuota Cuti (SDM only, CRUD + batch import)
- `/cuti/pengajuan` — Pengajuan Cuti (semua pegawai, self-service)
- `/cuti/persetujuan` — Persetujuan Cuti (semua bisa akses, konten per approval role)

---

## Alasan

1. **Domain berbeda.** Modul `kepegawaian/` berisi data master pegawai dan riwayat per-individu.
   Cuti melibatkan interaksi antara banyak pegawai (approval chain), kuota SDM-managed,
   dan workflow multi-pihak — bukan sekadar data per-pegawai.

2. **RBAC berbeda.** Kuota Cuti hanya untuk SDM. Persetujuan hanya untuk approver dalam rantai.
   Pengajuan untuk semua. Jika diletakkan di `kepegawaian/`, gate RBAC akan mencemari
   halaman kepegawaian yang punya gate berbeda.

3. **Roadmap sudah pisahkan.** `knowledge.md §4` domain modules mendaftar `cuti/` sebagai
   modul tersendiri (status: ⏳ Belum).

4. **Sudah ada preseden riwayat-cuti.** Halaman `riwayat/cuti` (read-only per-pegawai) tetap
   di `kepegawaian/` — itu benar karena konteksnya adalah konsol satu pegawai. Modul `cuti/`
   yang baru adalah alur operasional antar-pegawai.

---

## Konsekuensi

- Sidebar mendapat entri baru "Cuti" sejajar dengan "Kepegawaian" dan "Master"
- Layout `(app)/cuti/layout.tsx` baru diperlukan (sub-sidebar lateral)
- Tidak ada duplikasi kode antara `riwayat/cuti` (read-only) dan `cuti/` (operasional) —
  keduanya adalah halaman berbeda dengan tujuan berbeda
- `docs/context/cuti.md` menjadi dokumen konteks untuk `(app)/cuti/**`
- `docs/context/kepegawaian-riwayat-cuti.md` tetap berlaku untuk `kepegawaian/data/[id]/riwayat/cuti`
