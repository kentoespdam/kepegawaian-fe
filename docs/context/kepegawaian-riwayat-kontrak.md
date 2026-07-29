# Konteks: Riwayat Pegawai — Riwayat Kontrak Kerja

> Delta kategori. Baca [kepegawaian-riwayat.md](kepegawaian-riwayat.md) (shared infra, K1–K12) dulu.
> **Muat file ini hanya bila menyentuh `riwayat/kontrak/`.**

⏳ **Belum di-grill.** Context ini belum ada — domain kontrak kerja belum didiskusikan.

Ketika siap, jalankan `/grill-with-docs` untuk kategori Riwayat Kontrak Kerja.

## Yang sudah diketahui dari shared file

- **Endpoint list:** `GET /kepegawaian/riwayat/kontrak/pegawai/{pegawaiId}`
- **Filter:** `nomorKontrak` saja (lihat K6 di `kepegawaian-riwayat.md`)
- **Types:** `RiwayatKontrakQuery`, `RiwayatKontrakPostRequest`, `RiwayatKontrakPutRequest` (di `riwayat.ts`)
- **Lampiran:** kontrak **tidak punya** berkas lampiran (lihat K5 di shared file)
- **RBAC:** ikut `can(roles, "view", "pegawai")` (lihat K10)
