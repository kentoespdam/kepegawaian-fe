# Konteks: Riwayat Pegawai — Riwayat Surat Peringatan

> Delta kategori. Baca [kepegawaian-riwayat.md](kepegawaian-riwayat.md) (shared infra, K1–K12) dulu.
> **Muat file ini hanya bila menyentuh `riwayat/sp/`.**
> Claim order: [CLAIM-ORDER-riwayat-sp.md](../CLAIM-ORDER-riwayat-sp.md)
> Keputusan dikunci: grilling 2026-07-30

**Keputusan SP-1 — Kolom tabel.**

`No | Nomor SP | Jenis SP | Tgl SP | Sanksi | Tgl Mulai | Tgl Selesai | Notes | File | Aksi`

| Kolom | Isi | Sumber |
|---|---|---|
| No | nomor urut berjalan | `(page-1) * size + i + 1` |
| Nomor SP | string | `row.nomorSp` |
| Jenis SP | label | `row.jenisSp?.keterangan ?? "—"` |
| Tgl SP | tanggal | `formatDate(row.tanggalSp)` |
| Sanksi | label | `row.sanksi?.keterangan ?? "—"` |
| Tgl Mulai | tanggal | `formatDate(row.tanggalMulai)` |
| Tgl Selesai | tanggal | `formatDate(row.tanggalSelesai)` |
| Notes | teks | `row.notes ?? "—"` |
| File | ikon viewer bersyarat | lihat K-SP2 |
| Aksi | ✎ Edit + 🗑 Hapus | kolom terakhir (DataTable default) |

Ditolak: kolom `sanksiNotes`, `tanggalEksekusiSanksi`, `penandaTangan`, `jabatanPenandaTangan` —
terlalu sempit untuk scan cepat HR; tetap tersedia di form Edit.

**Keputusan SP-2 — File SP: inline, bukan LampiranCard.**

SP punya **satu file per baris**, tersimpan inline di response (`fileName`, `mimeType`).
Tidak ada subsistem `POST /kepegawaian/lampiran` untuk SP — endpoint terpisah `GET /kepegawaian/riwayat/sp/{id}/file`.

Karena itu: **tidak ada kartu Lampiran** di bawah tabel (berbeda dari SK dan Mutasi).

Kolom **File** di tabel = satu tombol/ikon bersyarat (aturan sama seperti K5 shared infra):

| `mimeType` | Perilaku |
|---|---|
| `application/pdf` atau `image/*` | buka viewer in-app |
| lain-lain | langsung unduh berkas |
| `fileName` null/kosong | tampil `"—"`, tidak ada tombol |

Sumber berkas: `GET /kepegawaian/riwayat/sp/{id}/file`.

**Keputusan SP-3 — Filter toolbar.**

```
[Cari Nomor SP]  [Pilih Jenis SP ▾]  [Reset]  [+ Tambah SP]
```

- `nomorSp` → text search
- `jenisSp` → combobox **fetch** `/api/proxy/master/jenis-sp/list` (dynamic — **bukan** hardcoded enum seperti `JENIS_SK_OPTIONS`)
- Filter `jenisSpId` (integer id) dikirim ke BE query param
- Reset + Tambah SP di kanan — konsisten dengan pola SK/Mutasi

Ditolak: `<Select>` static — Jenis SP adalah master entity dinamis, bukan enum terkunci di BE.

**Keputusan SP-4 — Cascade Jenis SP → Sanksi di form.**

Di form Tambah/Edit: memilih **Jenis SP** mengubah opsi Sanksi yang tersedia (hanya sanksi yang
terhubung ke jenis SP tersebut).

Endpoint cascade: `GET /master/sanksi/jenis-sp/{jenisSpId}` → `ListResultSanksiJenisSpList`

`SanksiJenisSpList`: `{ id, kode, keterangan, jenisSp, potTkk, ... }` — `id` sebagai value combobox,
`keterangan` sebagai label.

Perilaku:
- Sebelum `jenisSpId` dipilih → sanksi combobox **disabled**
- Reset `jenisSpId` → reset `sanksiId` juga (tidak boleh sanksi orphan)
- Pola sama seperti cascade Organisasi → Jabatan di form Tambah Pegawai

Tidak ada BE change — endpoint `/master/sanksi/jenis-sp/{id}` sudah ada dan berisi shape yang cukup.

**Keputusan SP-5 — Edit: file lama dipertahankan jika tidak diganti.**

Konfirmasi BE: `PUT /kepegawaian/riwayat/sp/{id}`:
- `fileName` **tidak dikirim** (field absen dari FormData) → BE **mempertahankan file lama**
- `fileName` **hadir** → replace file lama

Implementasi form Edit:
- Tampilkan nama file lama (`row.fileName`) jika ada — label informatif, bukan preview
- `<input type="file">` opsional di bawahnya
- Jika user tidak pilih file baru → **jangan** append `fileName` ke FormData
- Jika user pilih file baru → append `fd.append("fileName", file)`

**Keputusan SP-6 — Klik baris = no-op.**

SP tidak punya LampiranCard (K-SP2), sehingga tidak ada panel yang bergantung pada baris terpilih.
Override K4 (shared infra) **tidak berlaku** — K4 hanya untuk tabel dengan kartu/panel bergantung baris.

Konsekuensi:
- Tidak ada `onRowClick` di `<DataTable>`
- Tidak ada `?sel=` di URL
- Tidak ada `selectedRowId` / `selectedRow` state

Aksi baris:
- Kolom **Aksi**: ✎ Edit → Sheet, 🗑 Hapus → `<ConfirmDeleteDialog>`
- Kolom **File**: tombol bersyarat langsung di cell — `row.id` + `row.mimeType` sudah tersedia di baris

**Keputusan SP-7 — Content-type: `multipart/form-data` untuk semua mutasi SP.**

`POST /kepegawaian/riwayat/sp` dan `PUT /kepegawaian/riwayat/sp/{id}` keduanya menggunakan pola
Springdoc `@ModelAttribute` (spec: `"in": "query"` dengan schema object berisi field binary).
Realitanya: **seluruh request harus dikirim sebagai `multipart/form-data`**, bukan JSON.

Berbeda dari SK / Mutasi / Kontrak yang murni JSON.

Konsekuensi implementasi wajib dipahami:

- Gunakan `FormData` — `fd.append("nomorSp", value)` per field
- File: `fd.append("fileName", file)` — hanya jika user memilih file
- `fetch` langsung (bukan `src/lib/api/client.ts` yang selalu `JSON.stringify`)
- Tidak set `Content-Type` header manual — browser auto-set boundary multipart
- `proxy.ts` meneruskan body via `rewrite` apa adanya — sudah terbukti untuk lampiran (spike K9 Fase 1)

> ⚠️ Ini satu-satunya **form entity** non-JSON di codebase. Jangan copy pola fetch JSON dari form SK/Mutasi.

---

## Pemetaan `RiwayatSpQuery` → sel tabel

| Sel | Sumber |
|---|---|
| No | `(page-1) * size + i + 1` |
| Nomor SP | `row.nomorSp` |
| Jenis SP | `row.jenisSp?.keterangan ?? "—"` |
| Tgl SP | `formatDate(row.tanggalSp)` |
| Sanksi | `row.sanksi?.keterangan ?? "—"` |
| Tgl Mulai | `formatDate(row.tanggalMulai)` |
| Tgl Selesai | `formatDate(row.tanggalSelesai)` |
| Notes | `row.notes ?? "—"` |
| File | ikon bersyarat — `row.fileName`, `row.mimeType`, `row.id` |

## Urutan field di form Sheet (atas → bawah)

| # | Field | Type | Zod | Sumber data |
|---|---|---|---|---|
| 1 | Nomor SP | text | required | input bebas |
| 2 | Jenis SP | combobox FK | required | `GET /master/jenis-sp/list` |
| 3 | Sanksi | combobox FK (cascade) | required | `GET /master/sanksi/jenis-sp/{jenisSpId}` |
| 4 | Tanggal SP | date picker | required | — |
| 5 | Tanggal Mulai | date picker | required | — |
| 6 | Tanggal Selesai | date picker | required | — |
| 7 | **[Cari Penanda Tangan]** | tombol → modal picker | — | — |
| 7a | ↳ Penanda Tangan | read-only text display | required\* | autofill dari picker |
| 7b | ↳ Jabatan Penanda Tangan | read-only text display | required\* | autofill dari picker |
| 7c | ↳ `organisasiId` | hidden (RHF `setValue`) | required | autofill dari picker |
| 7d | ↳ `jabatanId` | hidden (RHF `setValue`) | required | autofill dari picker |
| 8 | Catatan Sanksi | textarea | optional | — |
| 9 | Tgl. Eksekusi Sanksi | date picker | optional | — |
| 10 | File SP | file input | optional | upload ke POST/PUT |
| 11 | Notes | textarea | optional | — |

\* required via Zod refine: validasi bahwa `organisasiId` dan `jabatanId` terisi (set oleh picker),
bukan via user input langsung. Error jika tombol picker belum digunakan: `"Pilih penanda tangan terlebih dahulu"`.

`pegawaiId` = hidden, dari URL param — tidak dirender di form.

## Types

`src/types/kepegawaian/riwayat.ts`:
- `RiwayatSpQuery` L151
- `RiwayatSpPostRequest` L325 — required: `nomorSp`, `pegawaiId`, `organisasiId`, `jabatanId`, `tanggalSp`, `jenisSpId`, `sanksiId`, `tanggalMulai`, `tanggalSelesai`, `penandaTangan`, `jabatanPenandaTangan`
- `RiwayatSpPutRequest` L177 — required: sama
- `PageResultPageRiwayatSpQuery` L413

## Endpoint CRUD

| Aksi | Endpoint | Content-type |
|---|---|---|
| List | `GET /kepegawaian/riwayat/sp/pegawai/{pegawaiId}` — filter: `nomorSp`, `jenisSpId` | — |
| Detail | `GET /kepegawaian/riwayat/sp/{id}` | — |
| Create | `POST /kepegawaian/riwayat/sp` | **multipart/form-data** |
| Update | `PUT /kepegawaian/riwayat/sp/{id}` | **multipart/form-data** |
| Delete | `DELETE /kepegawaian/riwayat/sp/{id}` | — |
| File | `GET /kepegawaian/riwayat/sp/{id}/file` | — |

## Endpoint master (cascade & combobox)

| Kebutuhan | Endpoint |
|---|---|
| Jenis SP list (filter + form) | `GET /master/jenis-sp/list` |
| Sanksi by jenisSp (cascade form) | `GET /master/sanksi/jenis-sp/{jenisSpId}` |
| Sanksi all (fallback Edit — jenisSp sudah terpilih) | `GET /master/sanksi/list` |
| Organisasi | `GET /master/organisasi/list` |
| Jabatan | `GET /master/jabatan/list` |

**Keputusan SP-8 — Penanda Tangan: wajib via picker pegawai, tidak ada input manual.**

Form tidak menyediakan combobox Organisasi/Jabatan maupun text input bebas untuk Penanda Tangan.
Sebagai gantinya: satu tombol **"Cari Penanda Tangan"** membuka modal search pegawai.

Endpoint picker: `GET /pegawai/list?nama={q}&nipam={q}&statusKerja=KARYAWAN_AKTIF&size=20`
Response: `PegawaiListResponse { id, nipam, nama, organisasi: {id, nama}, jabatan: {id, nama} }`
— endpoint sudah ada, **tidak perlu BE requirement**.

Autofill saat pegawai dipilih:

| Form field | Diisi dari |
|---|---|
| `organisasiId` | `pegawai.organisasi.id` (hidden, dikirim via FormData) |
| `jabatanId` | `pegawai.jabatan.id` (hidden, dikirim via FormData) |
| `penandaTangan` | `pegawai.nama` (read-only display) |
| `jabatanPenandaTangan` | `pegawai.jabatan.nama` (read-only display) |

Desain modal:
- Search input tunggal → dikirim ke `?nama={q}&nipam={q}` sekaligus
- Search-as-you-type, debounce 300ms, trigger ≥2 karakter
- Kolom hasil: NIPAM · Nama · Jabatan · Organisasi
- Klik baris → pilih & tutup modal
- State picker disimpan di form sebagai `selectedPegawai` (bukan bagian Zod schema — hanya untuk display)
- `organisasiId`, `jabatanId` di-set via `setValue` RHF saat picker memilih

Edit mode prefill: tampilkan `row.penandaTangan` + `row.jabatanPenandaTangan` sebagai read-only display;
tombol "Ganti Penanda Tangan" membuka picker kembali.

Komponen: **lokal** di dalam `sp-form-sheet.tsx` (bukan shared component) — extract hanya jika
form lain butuh picker yang sama.

**Belum terkunci:** — (kosong). Semua pertanyaan desain SP tertutup.
