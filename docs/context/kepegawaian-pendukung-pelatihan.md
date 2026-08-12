# Konteks: Data Pendukung — Pelatihan

> Delta kategori. Baca [kepegawaian-pendukung.md](kepegawaian-pendukung.md) (shared infra, P1–P8) dulu.
> **Muat file ini hanya bila menyentuh `pendukung/pelatihan/`.**
> Claim order: [CLAIM-ORDER-pendukung.md](../CLAIM-ORDER-pendukung.md) (Fase 2)

**Keputusan PL1 — Tabel FLAT (semua field jadi kolom) — satu-satunya kategori flat di konsol ini.**

`No | Nama Pelatihan | Jenis | Lembaga | Tgl Mulai | Tgl Selesai | Lulus | Nilai | Ikatan Dinas | Tgl Akhir Ikatan | Notes | Aksi`

- **Nama Pelatihan** = kolom identitas (`nama`, weight 600).
- **Jenis** = `jenisPelatihanNama` (flat di response, bukan nested).
- **Tgl Mulai / Tgl Selesai** = `formatDate` pendek.
- **Lulus** = badge "Lulus"/"—" (`lulus`); **Ikatan Dinas** = badge "Ya"/"—" (`ikatanDinas`).
- **Nilai** = `nilai` (wajib di BE — selalu terisi).
- **Notes** = kolom panjang → **truncate + ellipsis, tooltip `title` untuk isi penuh**.
- ⚠️ **Konsekuensi yang diterima user:** 10 kolom data = tabel lebar dengan **scroll horizontal
  dalam region tabel** (diizinkan per CONTEXT-MAP "DataTables degrade gracefully on mobile");
  toolbar + pagination tetap fixed.
- **Aksi** = ikon Edit + Hapus, paling kanan, dibungkus `<Can entity="pegawai">`.

> Deviasi sadar dari pola kompak kategori lain (pendidikan/pengalaman-kerja/keahlian) — keputusan
> user: semua data terlihat tanpa membuka form.

**Keputusan PL2 — Filter toolbar (3).**

- `nama` — teks debounced ("Cari Pelatihan") → param `nama`
- `jenisPelatihanId` — combobox `/master/jenis-pelatihan/list` → param `jenisPelatihanId`
- `lembaga` — teks debounced ("Cari Lembaga") → param `lembaga`
- Tombol **Reset filter**
- 3 filter = penyimpangan dari preseden 2 filter kategori lain — keputusan user (BE memang
  menerima ketiganya).

**Keputusan PL3 — Form Sheet (10 field) + 2 cross-field Zod.**

| Label | Request field | Required | Kontrol |
|---|---|---|---|
| Jenis Pelatihan | `jenisPelatihanId` | ✅ (min 1) | `FKCombobox` `/master/jenis-pelatihan/list` |
| Nama Pelatihan | `nama` | ✅ (min 1) | input teks |
| Lembaga | `lembaga` | ✅ (min 1) | input teks |
| Tanggal Mulai | `tanggalMulai` | ✅ (date) | input date |
| Tanggal Selesai | `tanggalSelesai` | ✅ (date) | input date |
| Lulus | `lulus` | — | checkbox |
| Nilai | `nilai` | ✅ (min 1) | input teks |
| Ikatan Dinas | `ikatanDinas` | — | checkbox |
| Tanggal Akhir Ikatan | `tanggalAkhirIkatan` | ⚠️ lihat aturan | input date |
| Catatan | `notes` | — | textarea |

- **Cross-field 1:** `tanggalSelesai ≥ tanggalMulai` (keduanya wajib; error di Tanggal Selesai).
- **Cross-field 2 (pola D5 pendidikan):** `ikatanDinas` dicentang → `tanggalAkhirIkatan` **wajib**;
  tidak dicentang → `tanggalAkhirIkatan` dikosongkan (tidak dikirim).
- `biodataId` dari `nik` header session (P6). Footer sticky Batal/Simpan; error inline;
  setelah 200 `invalidateQueries`.

**Pemetaan sel tabel → `PelatihanQuery`:**

| Kolom | Sumber |
|---|---|
| No | index baris + offset paging |
| Nama Pelatihan | `nama` (primary) |
| Jenis | `jenisPelatihanNama` |
| Lembaga | `lembaga` |
| Tgl Mulai / Tgl Selesai | `tanggalMulai` / `tanggalSelesai` |
| Lulus | `lulus` → badge |
| Nilai | `nilai` |
| Ikatan Dinas | `ikatanDinas` → badge |
| Tgl Akhir Ikatan | `tanggalAkhirIkatan` |
| Notes | `notes` (truncate + title) |
| Aksi | Edit + Hapus |

**Endpoint list:**

| Operasi | Endpoint |
|---|---|
| List | `GET /profil/pelatihan?biodataId=<nik>` — filter: `nama`, `jenisPelatihanId`, `lembaga` |
| Detail | `GET /profil/pelatihan/{id}` |
| Create | `POST /profil/pelatihan` |
| Update | `PUT /profil/pelatihan/{id}` |
| Delete | `DELETE /profil/pelatihan/{id}` |
| Lampiran | `/profil/pelatihan/lampiran/{id}` · `/{id}/file`, `POST /profil/pelatihan/lampiran` (ref `PROFIL_PELATIHAN` — lihat P5 + spike) |

**Types:** `src/types/profil/pelatihan.ts` — `PelatihanQuery`, `PelatihanPostRequest`/`PutRequest`,
`PelatihanSearchParams`.
