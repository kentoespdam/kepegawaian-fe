# Konteks: Riwayat Pegawai — Riwayat Surat Peringatan

> Delta kategori. Baca [kepegawaian-riwayat.md](kepegawaian-riwayat.md) (shared infra, K1–K12) dulu.
> **Muat file ini hanya bila menyentuh `riwayat/sp/`.**

⏳ **Belum di-grill.** Context ini belum ada — domain surat peringatan belum didiskusikan.

Ketika siap, jalankan `/grill-with-docs` untuk kategori Riwayat Surat Peringatan.

## Yang sudah diketahui dari shared file

- **Endpoint list:** `GET /kepegawaian/riwayat/sp/pegawai/{pegawaiId}`
- **Filter:** `nomorSp`, `jenisSpId` (lihat K6 di `kepegawaian-riwayat.md`)
- **Types:** `RiwayatSpQuery`, `RiwayatSpPostRequest` (di `riwayat.ts`)
- **Lampiran:** SP punya `fileName`/`mimeType` **inline** + `GET /riwayat/sp/{id}/file` — **berbeda** dari subsistem Lampiran (lihat K5 di shared file)
- **RBAC:** ikut `can(roles, "view", "pegawai")` (lihat K10)
