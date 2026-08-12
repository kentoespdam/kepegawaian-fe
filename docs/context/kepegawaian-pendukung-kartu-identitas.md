# Konteks: Data Pendukung — Kartu Identitas

> Delta kategori. Baca [kepegawaian-pendukung.md](kepegawaian-pendukung.md) (shared infra, P1–P8) dulu.
> **Muat file ini hanya bila menyentuh `pendukung/kartu-identitas/`.**
> Claim order: [CLAIM-ORDER-pendukung.md](../CLAIM-ORDER-pendukung.md) (Fase 2)

**Keputusan KI1 — Tabel kompak (6 kolom) + badge "Kadaluarsa" komputasi.**

`No | Jenis Kartu | Nomor | Tgl Terima | Masa Berlaku | Aksi`

- **Jenis Kartu** = kolom identitas (`jenisKartuNama`, weight 600).
- **Nomor** = `nomorKartu` (tabular-nums).
- **Masa Berlaku** = `tanggalExpired` (formatDate); bila terisi dan **`tanggalExpired < hari ini`**
  → tampil **badge "Kadaluarsa"** (teks + tone destructive, a11y bukan warna saja).
  Komputasi murni klien — tidak ada field status dari BE.
- `tanggalTerima` = `tanggalTerima`; `notes` → hanya di form (jarang terisi).
- ⚠️ Kategori ini **tidak tampil di Dashboard** (Page 1) — murni baru di konsol Data Pendukung.
- **Aksi** = ikon Edit + Hapus, paling kanan, dibungkus `<Can entity="pegawai">`.

**Keputusan KI2 — Filter toolbar (2).**

- `jenisKartuId` — combobox **`/master/jenis-kitas/list`** (entity master bernama legacy
  `jenis-kitas`, seed: KTP/SIM/NPWP/dll; `JenisKitasListResponse {id, nama}`) → param `jenisKartuId`
- `nomorKartu` — teks debounced ("Cari Nomor") → param `nomorKartu`
- Tombol **Reset filter**

**Keputusan KI3 — Form Sheet (6 field, `nik` tersembunyi).**

| Label | Request field | Required | Kontrol |
|---|---|---|---|
| — (tersembunyi) | `nik` | ✅ | diisi otomatis dari NIK header session — **bukan `biodataId`** (anomali P6; nilainya sama) |
| Jenis Kartu | `jenisKartuId` | ✅ FE (BE opsional) | `FKCombobox` `/master/jenis-kitas/list` |
| Nomor Kartu | `nomorKartu` | ✅ (min 1) | input teks (tabular-nums display) |
| Tanggal Terima | `tanggalTerima` | — | input date |
| Masa Berlaku | `tanggalExpired` | — | input date (opsional — KTP seumur hidup) |
| Catatan | `notes` | — | textarea |

- **Cross-field (Zod, terkunci):** bila `tanggalTerima` **dan** `tanggalExpired` keduanya terisi →
  `tanggalExpired > tanggalTerima` (error di Masa Berlaku).
- Footer sticky Batal/Simpan; error inline; setelah 200 `invalidateQueries`.

**Pemetaan sel tabel → `KartuIdentitasQuery`:**

| Kolom | Sumber |
|---|---|
| No | index baris + offset paging |
| Jenis Kartu | `jenisKartuNama` (fallback `jenisKartuId`) |
| Nomor | `nomorKartu` |
| Tgl Terima | `tanggalTerima` |
| Masa Berlaku | `tanggalExpired` + badge "Kadaluarsa" bila < hari ini |
| Aksi | Edit + Hapus |

**Endpoint list:**

| Operasi | Endpoint |
|---|---|
| List | `GET /profil/kartu-identitas?biodataId=<nik>` — filter: `jenisKartuId`, `nomorKartu` |
| Detail | `GET /profil/kartu-identitas/{id}` |
| Create | `POST /profil/kartu-identitas` (**body pakai `nik`**) |
| Update | `PUT /profil/kartu-identitas/{id}` (**body pakai `nik`**) |
| Delete | `DELETE /profil/kartu-identitas/{id}` |
| Lampiran | `/profil/kartu-identitas/lampiran/{id}` · `/{id}/file`, `POST /profil/kartu-identitas/lampiran` (ref `KARTU_IDENTITAS` — lihat P5 + spike) |

**Types:** `src/types/profil/kartu-identitas.ts` — `KartuIdentitasQuery`,
`KartuIdentitasPostRequest`/`PutRequest`, `KartuIdentitasSearchParams`.
Master combobox: `src/types/master/jenis-kitas.ts` — `JenisKitasListResponse`.
