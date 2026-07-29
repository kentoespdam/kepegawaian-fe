# Konteks: Riwayat Pegawai — Data Mutasi

> Delta kategori. Baca [kepegawaian-riwayat.md](kepegawaian-riwayat.md) (shared infra, K1–K12) dulu.
> **Muat file ini hanya bila menyentuh `riwayat/mutasi/`.**
> Claim order: [CLAIM-ORDER-riwayat-pegawai.md](../CLAIM-ORDER-riwayat-pegawai.md)
> ADR: [0013-riwayat-route-per-kategori.md](../adr/0013-riwayat-route-per-kategori.md)

**Keputusan 7 — Form Mutasi: satu Sheet, conditional fields by `jenisMutasi`. Tanpa validasi rantai riwayat.**

`RiwayatMutasiPostRequest` = **dua entitas dalam satu tulis**: seluruh isi `RiwayatSkPostRequest`
(±12 field) + field mutasi (±10). Jadi satu Sheet (heavy form per CONTEXT-MAP).

**Struktur form (top → bottom):**
1. **Data Pegawai** (read-only block): NIPAM, Nama, Golongan, Unit Kerja, Jabatan, Profesi — nilai
   saat ini, dari `GET /pegawai/{id}/mutasi-context`. Berfungsi ganda sebagai **nilai "Lama"** yang
   ikut dikirim (field `*LamaId`). → supersedes Keputusan 11 for form context (layout still uses session).
2. **Data Mutasi** (always visible): Jenis Mutasi, Nomor SK, Tanggal SK, TMT Berlaku, checkbox
   `updateMaster` (full row below TMT), Notes textarea.
3. **Conditional sections** (keyed on `jenisMutasi`):
   - `PENGANGKATAN_PERTAMA` / `TERMINASI`: base only (no additional section)
   - `MUTASI_LOKER` / `MUTASI_JABATAN`: + fieldset "Mutasi Lokasi Kerja / Jabatan" with cascade
     Unit Kerja → Jabatan → Profesi (via `GET /master/jabatan/organisasi/{id}` + `/master/profesi/jabatan/{id}`)
   - `MUTASI_GOLONGAN`: + fieldset "Mutasi Golongan" with Golongan select, nested fieldset "Masa Kerja
     Golongan" (MKG Tahun, MKG Bulan), Kenaikan Berikutnya date, nested fieldset "Masa Kerja Golongan
     Berikutnya" (MKGB Tahun, MKGB Bulan). **NO Gaji Pokok** — downstream salary-adjustment process handles it.
   - `MUTASI_GAJI` / `MUTASI_GAJI_BERKALA`: + all `MUTASI_GOLONGAN` fields + Gaji Pokok (text input with
     search button calling `GET /penggajian/detail-dasar-gaji/{golonganId}/{masaKerja}`, fills from `data.nominal`).

**`jenisSk` derived from `jenisMutasi`** (no UI control): `PENGANGKATAN_PERTAMA` → `SK_CAPEG`,
`MUTASI_LOKER` → `SK_MUTASI`, `MUTASI_JABATAN` → `SK_JABATAN`, `MUTASI_GOLONGAN` → `SK_KENAIKAN_PANGKAT_GOLONGAN`,
`MUTASI_GAJI` → `SK_PENYESUAIAN_GAJI`, `MUTASI_GAJI_BERKALA` → `SK_KENAIKAN_GAJI_BERKALA`, `TERMINASI` → `SK_PENSIUN`.

**Keputusan 7b (reset semantics):** changing `jenisMutasi` → hidden section fields cleared immediately
(`setValue(field, undefined)`), mirroring `onOrgChange` in tambah-form.tsx. State = visible.

**`updateMaster` = checkbox biasa, keputusan HR.** Dirender apa adanya dengan label jelas
("Perbarui data pegawai sesuai mutasi ini"). **Tidak ada validasi, tidak ada dialog konfirmasi,
tidak ada peringatan kondisional** — HR yang memutuskan, sistem tidak menggurui. Default: tidak
dicentang (mengikuti default field opsional BE; tak ada efek samping kecuali diminta).

Konsekuensi yang diterima sadar: rantai riwayat bisa saja tidak nyambung (Baru baris N ≠ Lama baris N+1).
**Itu bukan urusan frontend** — tidak ada validasi lintas-baris yang dibangun.

**Keputusan 8 — Tabel Mutasi: persis screenshot. Sel komposit & pasangan Lama/Baru dirender penuh.**

Kolom (kiri→kanan): `No | SK | Jenis Mutasi | Golongan | Unit Kerja | Jabatan | Notes` + **Aksi**.

| Kolom | Isi | Sumber |
|---|---|---|
| No | nomor urut berjalan (lanjut lintas halaman) | `page * size + i + 1` |
| SK | 3 baris: `Efektif : {tgl}` / `Nomor : {no}` / `Gaji Pokok : {rp}` | `row.skMutasi.tmtBerlaku`, `.nomorSk`, `.gajiPokok` |
| Jenis Mutasi | label enum | `row.jenisMutasi` → formatter `jenisMutasi()` |
| Golongan | 2 baris: `Lama : …` / `Baru : …` | `row.golonganLama` / `row.golongan` |
| Unit Kerja | 2 baris `Lama:`/`Baru:` | `row.organisasiLama?.nama ?? row.namaOrganisasiLama` / idem non-lama |
| Jabatan | 2 baris `Lama:`/`Baru:` | `row.jabatanLama` / `row.jabatan` |
| Notes | teks | `row.notes` |

**Pasangan tetap dirender penuh walau nilainya sama** (screenshot memang begitu: Golongan `Lama : II/a`
/ `Baru : II/a` pada mutasi jabatan). Nilai kosong → `—`. Alasan: HR membaca tabel ini sebagai
**salinan lembar SK**, bukan sebagai diff; menyembunyikan yang tak berubah membuat baris terlihat
"hilang data". Profesi (`profesiLama`/`profesi`) ada di data tapi **tidak dirender** — tidak ada di
screenshot dan tidak ada kolomnya; kalau nanti diminta, tinggal tambah kolom ke-4 berpola sama.

Konsekuensi yang diterima: baris tinggi (≈3 baris teks), 7 kolom + Aksi. Untuk pengguna lansia ini
justru menguntungkan (target sentuh besar, label eksplisit `Lama :`/`Baru :` bukan panah simbolik),
tapi **lebar** jadi ketat — `<td>` di `DataTable` ber-`whitespace-nowrap`, jadi tiap baris di dalam sel
harus `<div>` sendiri (bukan `<br/>` di satu string), dan label kecil di-mute (`text-xs
text-muted-foreground`) sementara nilainya normal.

Dua temuan kode yang mengikat implementasi:

1. **`Column<T>.cell` sudah `(item) => ReactNode`** — sel multi-baris **tidak** butuh primitive baru.
2. **Tapi kolom `No` butuh index, dan `cell` tidak menerimanya.** `DataTable` sudah punya `i` di
   `data.map((item, i) => …)` tetapi memanggil `col.cell(item)` saja. Perubahan minimal:
   `cell?: (item: T, index: number) => React.ReactNode` + teruskan `i` — **backward-compatible penuh**,
   nol call-site existing yang berubah. Offset halaman dihitung di closure config (`page`/`size` sudah
   ada di client). Ini satu-satunya sentuhan ke shared primitive; **wajib `gitnexus_impact` sebelum edit.**

**Aksi tetap di kolom paling kanan, bukan kolom ke-2 seperti screenshot.** `DataTable` meng-append
`<th>Aksi</th>` otomatis di akhir (`hasActions`) dan posisinya tidak dapat dikonfigurasi. Memindahnya
= mengubah primitive yang dipakai 15+ entity master demi satu tabel → ditolak. Isinya tetap ikon
langsung (✎ Edit, 🗑 Hapus) sesuai Keputusan 4, bukan menu `⋯`.

## Pemetaan `RiwayatMutasiQuery` → sel tabel

| Sel | Sumber |
|---|---|
| No | `(page-1) * size + i + 1` |
| SK (3 baris) | `skMutasi.tmtBerlaku` / `skMutasi.nomorSk` / `skMutasi.gajiPokok` |
| Jenis Mutasi | `jenisMutasi` → `labelJenisMutasi()` |
| Golongan | `golonganLama?.golongan` / `golongan?.golongan` |
| Unit Kerja | `namaOrganisasiLama ?? organisasiLama?.nama` / `namaOrganisasi ?? organisasi?.nama` |
| Jabatan | `namaJabatanLama ?? jabatanLama?.nama` / `namaJabatan ?? jabatan?.nama` |
| Notes | `notes` |
| Lampiran `(ref, refId)` | `(skMutasi.jenisSk, skMutasi.id)` — **bukan** id baris mutasi |

**Types:** `src/types/kepegawaian/riwayat.ts`
- `RiwayatMutasiQuery` L214
- `RiwayatMutasiPostRequest` L364
- `PageResultPageRiwayatMutasiQuery` L419

**Endpoint list:** `GET /kepegawaian/riwayat/mutasi/pegawai/{pegawaiId}`
**Filter dirender:** `nomorSk` (text) + `jenisMutasi` (select) — lihat K6 di shared file
