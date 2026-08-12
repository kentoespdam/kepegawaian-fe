# Konteks: Data Pendukung — Pengalaman Kerja

> Delta kategori. Baca [kepegawaian-pendukung.md](kepegawaian-pendukung.md) (shared infra, P1–P8) dulu.
> **Muat file ini hanya bila menyentuh `pendukung/pengalaman-kerja/`.**
> Claim order: [CLAIM-ORDER-pendukung.md](../CLAIM-ORDER-pendukung.md) (Fase 2)

**Keputusan W1 — `typePerusahaan` = teks bebas (bukan enum, bukan master).**

Kontrak BE (`PengalamanKerjaQuery.typePerusahaan: string`) tidak mendefinisikan enum dan tidak ada
master entity `jenis-perusahaan`. Input form = teks polos; kirim apa adanya. Select hardcoded
ditolak (risiko bentrok nilai legacy + nilai lama tak terwakili saat edit); master baru ditolak
(berat untuk satu field kecil). **Tanpa kerja BE** untuk kategori ini.

**Keputusan W2 — Tabel kompak (6 kolom).**

`No | Perusahaan | Jabatan | Lokasi | Periode | Aksi`

- **Perusahaan** = kolom identitas baris (`namaPerusahaan`, weight 600).
- **Periode** = sel komposit `tahunMasuk–tahunKeluar` (mis. `2015–2019`); bila `tahunKeluar`
  kosong → `2015–sekarang` (asumsi: masih bekerja — BE tidak punya flag "current job").
- `typePerusahaan` dan `notes` **tidak** jadi kolom: type teks bebas tidak standar, notes paragraf
  panjang; keduanya tetap tersimpan dan tampil di form saat edit (YAGNI).
- **Aksi** = ikon Edit + Hapus, paling kanan, dibungkus `<Can entity="pegawai">`.

**Keputusan W3 — Filter toolbar (2, keduanya teks).**

- `namaPerusahaan` — teks debounced ("Cari Perusahaan") → param `namaPerusahaan`
- `jabatan` — teks debounced ("Cari Jabatan") → param `jabatan`
- Tombol **Reset filter**
- Tidak ada FK master → tidak ada combobox. Filter lain tidak tersedia di BE selain ini.

**Keputusan W4 — Form Sheet (7 field, tanpa checkbox "Masih Bekerja").**

| Label | Request field | Required | Kontrol |
|---|---|---|---|
| Nama Perusahaan | `namaPerusahaan` | ✅ (min 1) | input teks |
| Jenis Perusahaan | `typePerusahaan` | — | input teks bebas (W1) |
| Jabatan | `jabatan` | — | input teks |
| Lokasi | `lokasi` | — | input teks |
| Tahun Masuk | `tahunMasuk` | — | input number (Zod int, rentang waras) |
| Tahun Keluar | `tahunKeluar` | — | input number + **hint** "kosongkan bila masih bekerja" |
| Catatan | `notes` | — | textarea |

- **Cross-field (Zod, terkunci):** bila `tahunMasuk` **dan** `tahunKeluar` terisi →
  `tahunKeluar ≥ tahunMasuk` (error di field Tahun Keluar). `tahunKeluar` kosong = masih bekerja.
- Tanpa checkbox "Masih Bekerja" — state klien murni tanpa dukungan BE, YAGNI; hint kecil cukup.
- `biodataId` dari `nik` header session (P6), bukan field form.
- Footer sticky Batal/Simpan; error inline; setelah 200 `invalidateQueries`.

**Pemetaan sel tabel → `PengalamanKerjaQuery`:**

| Kolom | Sumber |
|---|---|
| No | index baris + offset paging |
| Perusahaan | `namaPerusahaan` (primary) |
| Jabatan | `jabatan` |
| Lokasi | `lokasi` |
| Periode | `tahunMasuk`–`tahunKeluar` (komposit; `…–sekarang` bila keluar kosong) |
| Aksi | Edit + Hapus |

**Endpoint list:**

| Operasi | Endpoint |
|---|---|
| List | `GET /profil/pengalaman-kerja?biodataId=<nik>` — filter: `namaPerusahaan`, `jabatan` |
| Detail | `GET /profil/pengalaman-kerja/{id}` |
| Create | `POST /profil/pengalaman-kerja` |
| Update | `PUT /profil/pengalaman-kerja/{id}` |
| Delete | `DELETE /profil/pengalaman-kerja/{id}` |
| Lampiran | `/profil/pengalaman-kerja/lampiran/{id}/list` · `/detail` · `/file`, `POST /profil/pengalaman-kerja/lampiran` (ref `PROFIL_PENGALAMAN_KERJA` — lihat P5 + spike) |

**Types:** `src/types/profil/pengalaman-kerja.ts` — `PengalamanKerjaQuery`,
`PengalamanKerjaPostRequest`/`PutRequest`, `PengalamanKerjaSearchParams`.
