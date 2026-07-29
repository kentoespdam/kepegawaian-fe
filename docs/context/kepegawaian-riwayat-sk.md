# Konteks: Riwayat Pegawai — Riwayat Surat Keputusan

> Delta kategori. Baca [kepegawaian-riwayat.md](kepegawaian-riwayat.md) (shared infra, K1–K12) dulu.
> **Muat file ini hanya bila menyentuh `riwayat/sk/`.**
> Claim order: [CLAIM-ORDER-riwayat-sk.md](../CLAIM-ORDER-riwayat-sk.md)
> Keputusan dikunci: grilling 2026-07-29

**Keputusan 13 — Kolom tabel persis screenshot. Aksi di kanan (konsisten DataTable).**

Kolom (kiri→kanan): `No | Nomor SK | Jenis SK | Tgl. SK | Tgl. Berlaku | Golongan | Gaji Pokok | MKG | Kenaikan Berikutnya | MKGB | Notes` + **Aksi**.

| Kolom | Isi | Sumber |
|---|---|---|
| No | nomor urut berjalan | `page * size + i + 1` |
| Nomor SK | string | `row.nomorSk` |
| Jenis SK | label enum | `row.jenisSk` → `labelJenisSk()` (tambah ke `riwayat-constants.ts`) |
| Tgl. SK | tanggal | `formatDate(row.tanggalSk)` |
| Tgl. Berlaku | tanggal | `formatDate(row.tmtBerlaku)` |
| Golongan | string | `row.golongan?.golongan ?? "—"` |
| Gaji Pokok | rupiah | `rp(row.gajiPokok)` |
| MKG | `"X Thn – Y Bln"` | `row.mkgTahun` / `row.mkgBulan` — kosong → `"Thn – Bln"` |
| Kenaikan Berikutnya | tanggal | `formatDate(row.kenaikanBerikutnya)` |
| MKGB | `"X Thn – Y Bln"` | `row.mkgbTahun` / `row.mkgbBulan` — kosong → `"Thn – Bln"` |
| Notes | teks | `row.notes` |

Format MKG/MKGB: `"${mkgTahun ?? ""} Thn – ${mkgBulan ?? ""} Bln"` — render string persis seperti
screenshot, bukan `"—"` walau kosong, karena HR membaca kolom ini di seluruh baris SK.

Ditolak: Aksi di kolom ke-2 seperti screenshot legacy — `DataTable` meng-append Aksi otomatis di
kanan (`hasActions`), memindahnya = sentuhan shared primitive 15+ entity demi satu tabel.

**Keputusan 14 — Filter toolbar: Nomor SK + Jenis SK. Tanpa filter golonganId.**

Filter yang dirender: `nomorSk` (text search "Cari Nomor SK") + `jenisSk` (select dropdown
"Pilih Jenis Surat Kepu...") + tombol reset. Filter `golonganId` tersedia di BE tapi **tidak dirender**
— satu pegawai jarang punya puluhan SK yang perlu difilter per-golongan (YAGNI). Source:
`JENIS_SK_OPTIONS` dari `src/lib/riwayat-constants.ts` (sudah ada, hardcoded — zero fetch).

**Keputusan 15 — Form SK: Sheet, flat, tanpa conditional per `jenisSk`.**

`RiwayatSkPostRequest` punya 9 field opsional (`golonganId`, `gajiPokok`, MKG, MKGB, `updateMaster`,
`notes`) tanpa mapping deterministik `jenisSk → field wajib` di spec. Form flat = zero conditional
logic, HR memutuskan mana yang diisi. Berbeda dari form Mutasi yang punya cascade `jenisMutasi →
fieldset`.

Struktur form (top → bottom):
1. **Jenis SK** — select dropdown `JENIS_SK_OPTIONS`; dipilih bebas oleh HR
2. **Nomor SK** — text input (required)
3. **Tanggal SK** — date picker (required)
4. **TMT Berlaku** — date picker (required)
5. **Golongan** — combobox FK via `/master/golongan/list` (opsional)
6. **Gaji Pokok** — text input biasa (opsional; **bukan** tombol search cascade ke `/penggajian`)
7. **MKG** — dua field: Tahun + Bulan (opsional)
8. **Kenaikan Berikutnya** — date picker (opsional)
9. **MKGB** — dua field: Tahun + Bulan (opsional)
10. **Update Master** — checkbox "Perbarui data master pegawai sesuai SK ini" (opsional, default unchecked)
11. **Notes** — textarea (opsional)

Konsekuensi yang diterima: HR bisa mengisi field MKG untuk `SK_LAINNYA` sekalipun — tidak ada
validasi kondisional. BE yang memvalidasi bila ada constraint bisnis. Frontend tidak menebak.

**Keputusan 16 — Kunci lampiran SK: `ref = row.jenisSk`, `refId = row.id`.**

Berbeda dari Mutasi di mana lampiran di-key ke SK embedded (`row.skMutasi.jenisSk`, `row.skMutasi.id`),
di SK standalone baris itu **sendiri** yang merupakan SK — `ref` dan `refId` diambil langsung dari baris.

Implementasi: thin wrapper `SkLampiranCard` identik polanya dengan `MutasiLampiranCard` (ADR-0013).
Props: `selectedRow: RiwayatSkQuery | null`. Derive: `ref = row.jenisSk`, `refId = row.id`,
`title = "Lampiran — SK {row.nomorSk}"`. Kartu Lampiran muncul di page SK (sama seperti Mutasi).

## Pemetaan `RiwayatSkQuery` → sel tabel

| Sel | Sumber |
|---|---|
| No | `(page-1) * size + i + 1` |
| Nomor SK | `nomorSk` |
| Jenis SK | `jenisSk` → `labelJenisSk()` |
| Tgl. SK | `formatDate(tanggalSk)` |
| Tgl. Berlaku | `formatDate(tmtBerlaku)` |
| Golongan | `golongan?.golongan ?? "—"` |
| Gaji Pokok | `rp(gajiPokok)` |
| MKG | `` `${mkgTahun ?? ""} Thn – ${mkgBulan ?? ""} Bln` `` |
| Kenaikan Berikutnya | `formatDate(kenaikanBerikutnya)` |
| MKGB | `` `${mkgbTahun ?? ""} Thn – ${mkgbBulan ?? ""} Bln` `` |
| Notes | `notes` |
| Lampiran `(ref, refId)` | `(jenisSk, id)` — SK itu sendiri, bukan nested |

**Types:** `src/types/kepegawaian/riwayat.ts`
- `RiwayatSkQuery` L86
- `RiwayatSkPostRequest` L347
- `RiwayatSkPutRequest` L197
- `PageResultPageRiwayatSkQuery` L345

**Endpoint CRUD:**
- List: `GET /kepegawaian/riwayat/sk/pegawai/{pegawaiId}`
- Detail: `GET /kepegawaian/riwayat/sk/{id}`
- Create: `POST /kepegawaian/riwayat/sk`
- Update: `PUT /kepegawaian/riwayat/sk/{id}`
- Delete: `DELETE /kepegawaian/riwayat/sk/{id}`

**Belum terkunci:** — (kosong). Semua pertanyaan desain SK tertutup.
