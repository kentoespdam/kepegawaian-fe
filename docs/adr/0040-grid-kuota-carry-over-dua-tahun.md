# ADR-0040 — Grid Kuota Carry-Over Dua Tahun (index PageResult + `kuotaTahunSebelumnya`)

**Tanggal:** 2026-08-18
**Status:** Accepted

> **Hubungan dengan ADR-0040 backend (`rewrite/master-cqrs`):** backend punya ADR-0040
> sendiri ("cuti-kuota-index-pagerequest-dengan-kuota-tahun-sebelumnya") yang memutuskan
> bentuk kontrak index. ADR ini adalah **keputusan FE** atas kontrak tersebut — bagaimana
> halaman `/cuti/kuota` memakainya. Keduanya berdiri di repo masing-masing.

---

## Konteks

Backend `rewrite/master-cqrs` mengubah kontrak index `GET /cuti/kuota`:

- Envelope `SingleResult` → **`PageResult`** (tanpa `message`/`errors`)
- `data.additional` → **`data.kuotaTahunSebelumnya`** (baris kuota tahun − 1 untuk pegawai
  di halaman ini); `additional` hilang total
- Tidak ada data → **HTTP 200 + page kosong** (bukan 404)

Grid kuota lama menampilkan satu baris per (pegawai, tahun): kolom Tahun, Kuota, Tambahan,
Terpakai, Sisa, Expired. Admin/HRD perlu melihat konteks **carry-over** — sisa tahun lalu
di samping kuota tahun berjalan — untuk memutuskan penambahan kuota.

**Pertanyaan:** bagaimana FE menampilkan data dua tahun (Y dan Y−1) tanpa menambah fetch?

Alternatif yang dipertimbangkan:

1. **Fetch `/{pegawaiId}/{tahun}/sisa` per baris** — N+1 fetch, dan endpoint itu hanya
   return `{ sisaCutiTahunIni, sisaCutiTahunLalu }` (tanpa `kuota`/`kuotaTerpakai`).
2. **Fetch detail `/{id}` per baris** — N+1, dan `id` kuota tahun lalu tidak diketahui.
3. **Pakai `kuotaTahunSebelumnya` dari index** (sudah tersedia di satu envelope) —
   gratis, satu fetch, data lengkap (`CutiKuotaResponse` utuh).

---

## Keputusan

Grid `/cuti/kuota` menjadi **satu baris per pegawai** dengan dua blok kolom tahun:

| Kolom | Sumber |
|-------|--------|
| NIPAM | `pegawai.nipam` |
| Nama Pegawai | `pegawai.nama` |
| Status Pegawai | `pegawai.statusPegawai` → `labelStatus()` |
| Jabatan | `pegawai.jabatan` |
| Kuota/Terpakai/Sisa `{Y}` | baris tahun filter di `page.content` |
| Kuota/Terpakai/Sisa `{Y−1}` | baris tahun filter − 1 di `kuotaTahunSebelumnya` (match by `pegawaiId`) |
| Aksi | Edit · Hapus |

- **Kuota = `kuota + kuotaTambahan`**; Terpakai = `kuotaTerpakai`; Sisa = `sisaKuota` (apa adanya).
- Header dinamis: `{Y}` = tahun filter (mis. "Kuota 2026"), `{Y−1}` = tahun filter − 1.
- Pegawai tanpa baris tahun sebelumnya → kolom Y−1 tampil **"—"**.
- Kolom lama dihapus: No, Tahun, Tambahan, Expired.
- Terkait: strip **K-C5** (pengajuan & riwayat/cuti) baca `page.content` saja — `additional`
  hilang total dan index tak pernah 404 lagi, sehingga handling `isNotFound` dihapus.

---

## Alasan

1. **Satu fetch.** `kuotaTahunSebelumnya` sudah dikirim backend di envelope yang sama —
   tidak ada N+1. Endpoint `/sisa` tidak memadai (tanpa `kuota`/`kuotaTerpakai`).
2. **Satu baris per pegawai = bentuk natural.** Kuota adalah entitas per (pegawai, tahun);
   dengan filter tahun, satu pegawai ≤ 1 baris per tahun di `page.content` maupun
   `kuotaTahunSebelumnya`.
3. **Konsisten dengan kontrak baru.** "Selalu 200 + page kosong" → empty state cukup
   `page.content.length === 0`; tidak ada jalur 404 yang harus ditangani khusus.
4. **Kolom Tahun redundan.** Header dinamis sudah membawa tahun — kolom Tahun lama dihapus.

---

## Konsekuensi

- Grid hanya menampilkan pegawai yang punya baris di `page.content` (tahun filter).
  Pegawai yang hanya punya kuota tahun lalu (belum ada kuota Y) **tidak muncul** — ini
  di luar scope carry-over view; kalau dibutuhkan, itu fitur terpisah.
- Angka "Kuota" (kuota + tambahan) konsisten antara grid kuota dan strip K-C5.
- `PageResultCutiKuotaPegawaiResponse = PageEnvelope<unknown>` (artefak generator) tidak
  merepresentasikan shape `{ page, kuotaTahunSebelumnya }` → FE memakai cast inline
  `as { data: CutiKuotaPegawaiResponse }` (pola yang sama dengan K-C5).
- Keputusan kontrak selengkapnya: `docs/context/cuti.md` CU-3 (revisi) & CU-15;
  dokumen kontrak `docs/frontend/FE-CONTRACT-cuti-kuota-index.md`.
