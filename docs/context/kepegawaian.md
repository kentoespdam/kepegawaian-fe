# Konteks modul: `kepegawaian`

> Delta modul. Baca [CONTEXT-MAP.md](../../CONTEXT-MAP.md) (inti bersama) dulu.
> Modul ini **mengonsumsi** resource `pegawai` (lihat [pegawai.md](pegawai.md)) + `kepegawaian`,
> `profil`, `penggajian`. Ia **menyajikan** data lintas-resource untuk page di bawah menu sidebar
> "Kepegawaian" — plus (sejak Page 4) **CRUD riwayat** atas resource `kepegawaian/riwayat/*`.

## Ringkas

Menu **Kepegawaian** = grup sidebar dengan **3 item sidebar** (Dashboard, Data, Terminasi).
Bukan collection master (tanpa `/master/{entity}`), bukan resource tunggal — melainkan
**komposisi view** atas resource yang sudah ada. Page 4 (Riwayat Pegawai) **bukan item sidebar** —
ia sub-route drill-down dari Data Pegawai.

| Page | Route | Audiens | Gate |
|---|---|---|---|
| **Dashboard Pegawai** | `(app)/kepegawaian/dashboard` | setiap pegawai (data diri) | terbuka semua login |
| **Data Pegawai** | `(app)/kepegawaian/data` | HR/admin | `can(roles,"view","pegawai")` |
| **Riwayat Pegawai** | `(app)/kepegawaian/data/[pegawaiId]/riwayat/[kategori]` | HR/admin | (lihat §Page 4) |
| **Terminasi Pegawai** | `(app)/kepegawaian/terminasi` | HR/admin | `can(roles,"view","pegawai")` |

> **Resolusi open-question `riwayat`** (CONTEXT-MAP): **riwayat = sub-area di dalam kepegawaian**,
> BUKAN modul ke-7. Dashboard memakai riwayat karier + disiplin; Terminasi memakai riwayat/terminasi.
> Rail tetap **6 modul**.

## Identitas → record pegawai (identity bridge kepegawaian)

Lihat [ADR-0006](../adr/0006-pegawai-session-identity-bridge.md). Ringkas:

- `session.$id` (Appwrite) **= `pegawaiId`** — dipakai langsung, tanpa lookup.
- `nipam` + `nik` **diambil dari** `GET /pegawai/{$id}` → `PegawaiResponseDetail.nipam` &
  `.biodata.nik`. **Bukan** diturunkan dari prefix email (asumsi konvensi email ditolak — lihat ADR).
- Fungsi baru **`getPegawaiSession()`** (`src/lib/auth/pegawaiSession.ts`), `cache()`-wrapped,
  **opt-in**: `verifySession()` tetap murni 1-fetch identitas Appwrite. Hanya page yang butuh data
  pegawai memanggil `getPegawaiSession()` → bayar fetch kedua **saat perlu saja**.
- Toleransi non-pegawai: `GET /pegawai/{$id}` 404 → `pegawai: null` → **empty-state** ramah
  ("Akun ini tidak terhubung ke data pegawai"), bukan error.

Fan-out `$id`/`nik` ke endpoint:

| Butuh | Endpoint | Kunci |
|---|---|---|
| Ringkasan / detail pegawai | `/pegawai/{$id}` , `/pegawai/{$id}/ringkasan` | `$id` |
| Riwayat karier | `/kepegawaian/riwayat/{sk\|mutasi\|kontrak}/pegawai/{$id}` | `$id` |
| Riwayat disiplin (SP) | `/kepegawaian/riwayat/sp/pegawai/{$id}` | `$id` |
| Slip gaji | `/penggajian/batch/master/pegawai/{$id}` | `$id` |
| Dashboard biodata | `/profil/biodata/{nik}/dashboard` | `nik` (string) |
| Biodata CRUD | `/profil/biodata/{nik}` | `nik` (string) |
| Data keluarga | `/profil/keluarga?biodataId={nik}` | `nik` |

## Page 1 — Dashboard Pegawai (self-edit biodata)

Profil diri sendiri, difilter ke `$id` (aman by-design → tak perlu permission khusus).

**Edit biodata self-service** dibuka untuk **satu** endpoint: `PATCH /profil/biodata/{nik}` (biodata
diri sendiri) — lihat [ADR-0012](../adr/0012-dashboard-self-edit-biodata.md). Tombol "Edit Profil" di
accordion "Data Pribadi" membuka Dialog + `CrudForm`. Aman by-design: `nik` diambil dari **sesi**
(`getPegawaiSession()`, ADR-0006), bukan input user → tak bisa mengedit biodata orang lain, jadi RBAC
berlapis tak jadi prasyarat untuk scope sempit ini.

- **9 field editable** = tepat `BiodataPatchRequest`: `nama`, `alamat`, `jenisKelamin`, `tempatLahir`,
  `tanggalLahir`, `agama`, `statusKawin`, `ibuKandung`, `telp`. Validasi zod: **hanya `nama` wajib**;
  `telp` format-check bila diisi; sisanya optional.
- **NIK read-only** (`disabled` di form) — hanya admin yang boleh ubah karena NIK = ID di BE; bukan
  bagian `BiodataPatchRequest`.
- **Pendidikan Terakhir** dikecualikan dari form (via menu "tambah pendidikan" — belum ada);
  ditampilkan read-only sebagai `{tingkat} — {jurusan} — {institusi} — {tahunLulus}` via
  `PendidikanDashboard`.
- **Ibu Kandung, Telp, Email, Kode Pajak** ditampilkan di read view.

### Approval tracking — `changedStatus`

Dashboard memakai endpoint `GET /profil/biodata/{nik}/dashboard` → `BiodataDashboardResponse`
yang punya field `changedStatus?: boolean`. Fungsinya:

- `changedStatus: true` → ada perubahan biodata dari user yang **sedang menunggu approval admin**.
- Ditampilkan sebagai **Badge outline kuning "Menunggu"** (+ ikon `Clock`) di samping judul
  AccordionTrigger "Data Pribadi" pada panel kiri.
- **Tooltip hover:** "Perubahan biodata sedang menunggu persetujuan admin".
- **Tombol "Edit Profil" disembunyikan** saat `changedStatus=true` — user tak bisa membuka dialog
  edit selama ada perubahan pending, untuk mencegah tumpuk-tindih multiple pending changes.
- Hanya berlaku untuk **biodata level dashboard** (sub-entitas seperti keluarga/pendidikan/dll.
  belum ditampilkan — ditunda ke iterasi berikutnya).
- Tipe sudah di-generate via `extract-types.js` → `BiodataDashboardResponse.changedStatus` di
  `src/types/profil/biodata.ts`.

> ⚠️ **Alur approval ini sebelumnya "ditunda"** di ADR-0012. Sekarang BE sudah menyediakan
> `changedStatus` di endpoint `/dashboard` dan FE menampilkan indikatornya. Alur approval penuh
> (review + approve/reject dari admin) masih menyusul.

Alur berat yang **tetap ditunda** (bukan bagian rilis ini): `PATCH /pegawai/{id}/profil`, `/gaji`, dan
alur `profil-update` approval penuh (review + approve/reject dari admin) — menyusul bila edit lintas-pegawai (HR) butuh RBAC nyata.

> **Update — `changedStatus` sudah live.** Indikator approval (badge "Menunggu") sudah tampil di dashboard
> saat BE mengembalikan `changedStatus: true`. Alur review admin masih menyusul.

### Layout: 2 panel + accordion (revisi round 2 — lihat [ADR-0011](../adr/0011-dashboard-two-panel-accordion.md))

Ganti dari single stacked column ke **2 panel** di `≥lg` (1024px), **menumpuk** (kiri lalu kanan)
di bawah `lg`. Keduanya pakai **Base UI Accordion** (`src/components/ui/accordion.tsx`, ADR-0004).
Mengikuti pola dashboard legacy (gambar referensi) tapi mengecualikan data tanpa backend.

**Proporsi & kerapian (optimasi round 3 — golden ratio + planogram, lihat ADR-0011 §Addendum):**

- **Rasio kolom `≥lg` = 38% / 62%** (`lg:grid-cols-[38fr_62fr]`), bukan 45/55 atau 50/50. Panel
  kanan (tabel 4–6 kolom) lebih lega, panel kiri (field 2-kolom ringkas) cukup 38% — asimetri φ.
- **Panel kiri accordion pakai `multiple`, default hanya "Data Pribadi" terbuka** — konsisten dengan
  panel kanan (satu section pertama terbuka), tak lagi ikut default single-collapse Base UI.
- **Identitas hanya 1×.** Header atas cukup `"Dashboard Pegawai"` tanpa subtitle nama/NIPAM;
  identitas lengkap (foto + nama + NIPAM + jabatan) hanya di header panel kiri (satu titik fokus,
  eye-level planogram).

**Coloring semantik + spacing + afordansi (optimasi round 4 — lihat ADR-0011 §Addendum round 4):**

- **Padding panel kanan = panel kiri.** `<Accordion>` panel kanan diberi `px-5 py-1` (sebelumnya
  hanya panel kiri punya sejak W6) → data tak lagi mepet ke tepi card; tabel dapat ruang napas.
- **Card-in-card diratakan** via prop opt-in `bare` di `DataTable` (additive, default `false`):
  saat panel kanan me-render tabel di dalam accordion, kirim `bare` supaya tabel tak menggambar
  border/shadow/card sendiri → body accordion tak lagi terkesan "terpotong". Konsumen `DataTable`
  lain (page master, data, terminasi) **tak berubah** (default preservasi perilaku).
- **Afordansi trigger accordion diperkuat** via **className call-site** (BUKAN edit `accordion.tsx` —
  file generate shadcn dilarang diedit, overwrite-risk): satu konstanta className di folder dashboard
  di-pass ke tiap `<AccordionTrigger>` → cue resting jelas (hover bg + chevron ter-tint + padding
  horizontal), tak cuma `hover:underline`. Scope dashboard-only.
- **Warna semantik ~10–20% (60:30:10, reuse token OKLCH `globals.css`):** aksen brand
  `bg-primary/10 text-primary` di avatar header (focal point); badge status semantik (Status Kerja
  Aktif→`success`, Berhenti→`destructive`/`muted`, Dirumahkan→`warning`); section SP tint
  `warning`/`destructive`; kolom Penghasilan Bersih `font-semibold text-foreground`. Bukan menambah
  warna baru — hanya mengonsumsi token yang sudah ada.

**Panel KIRI — "Detail Pegawai"** (accordion):

- **Header identitas** (selalu tampil, di atas accordion): foto profil (read-only dari
  `GET /profil/biodata/{id}/foto-profil`, field `fotoProfil`) + nama + NIPAM + jabatan.
- **Data Pribadi** (accordion item) — biodata dari `GET /profil/biodata/{nik}/dashboard`
  → `BiodataDashboardResponse`. Field `changedStatus` memunculkan badge "Menunggu" di title.
- **Data Kepegawaian** (accordion item) — status, jabatan, organisasi, golongan, grade, tmt*,
  masa kerja, gaji pokok, dari `/pegawai/{$id}`.

**Panel KANAN — "Riwayat"** (accordion, **multi-open + lazy fetch**, section pertama terbuka).
Data tiap section di-fetch **hanya saat dibuka**. Urutan mengikuti gambar referensi:

1. **Data Keluarga** — `/profil/keluarga?biodataId={nik}`.
2. **Data Pendidikan** — `/profil/pendidikan?biodataId={nik}`.
3. **Data Pengalaman Kerja** — `/profil/pengalaman-kerja?biodataId={nik}`.
4. **Data Keahlian** — `/profil/keahlian?biodataId={nik}`.
5. **Data Pelatihan** — `/profil/pelatihan?biodataId={nik}`.
6. **Riwayat Mutasi** — `/kepegawaian/riwayat/mutasi/pegawai/{$id}`.
7. **Riwayat SK** — `/kepegawaian/riwayat/sk/pegawai/{$id}`.
8. **Riwayat Kontrak** — `/kepegawaian/riwayat/kontrak/pegawai/{$id}`.
9. **Riwayat Penggajian** — slip bulanan dari `/penggajian/batch/master/pegawai/{$id}`.
   Kolom: Periode · Gaji Pokok · Penghasilan Kotor · Potongan · Pajak · Penghasilan Bersih.
   Pakai **`penghasilanBersihFinal`**. **Sembunyikan** `*2` / `pembulatan2` / `isDifferent`
   (artefak proses verifikasi batch, bukan urusan pegawai).
   > ⚠️ **Known-limitation:** endpoint tak punya filter status batch → tak bisa jamin hanya periode
   > *accepted* yang tampil. **Tanya backend + verifikasi sebelum go-live** (periode draft/belum-final
   > tak boleh bocor ke pegawai).
10. **Riwayat Disiplin / SP** — `/kepegawaian/riwayat/sp/pegawai/{$id}`. Section **terpisah** di
    **akhir** (hak pegawai untuk tahu; ditampilkan, tidak disembunyikan — sesuai keputusan round 1).
    TIDAK digabung ke riwayat kerja.

**Section list** (Keluarga, Pendidikan, Mutasi, SK, dst.) pakai `<DataTable>` +
`<DataTablePagination>` reusable (pola halaman daftar lain), **default page size 5**.

> **Skip:** **Data Rekening Bank** (di gambar referensi) — tidak ada endpoint/type. Ditunda sampai
> backend tersedia. **Foto upload** juga ditunda; iterasi ini foto **read-only** saja.

## Page 2 — Data Pegawai (3 tab)

Tabel banyak-pegawai untuk HR. Tab beralih sumber:

| Tab | Endpoint | Filter |
|---|---|---|
| **Aktif** | `/pegawai` | `statusKerja=KARYAWAN_AKTIF` |
| **Non-aktif** | `/pegawai` | `statusKerja=BERHENTI_OR_KELUAR` (+`DIRUMAHKAN` bila perlu) |
| **Non-pegawai** | `/profil/biodata` | `isPegawai=false` |

> **Pensiun BUKAN tab di sini.** `/pegawai` tak punya filter `tmtPensiun≤today`; semua urusan pensiun
> dipusatkan di page Terminasi. Menaruhnya di dua tempat = duplikasi + istilah kabur.

## Page 3 — Terminasi Pegawai (2 tab)

> **Istilah "Terminasi"** = payung semua bentuk berhenti — pensiun (normal) **maupun** diberhentikan.
> `alasanTerminasi` (entity master) yang membedakan sebab. Calon Pensiun & Sudah Terminasi = **dua fase
> garis waktu yang sama**: pegawai bergerak dari "akan pensiun" → begitu di-SK → "sudah terminasi".

| Tab | Endpoint | Filter |
|---|---|---|
| **Calon Pensiun** | `/kepegawaian/riwayat/terminasi/calon-pensiun` | `tahunPensiun` (dropdown tahun, default berjalan) |
| **Sudah Terminasi** | `/kepegawaian/riwayat/terminasi` | `tahunTerminasi` (dropdown) + kolom & filter `alasanTerminasi` (`alasanTerminasiId`) |

## Page 4 — Riwayat Pegawai (drill-down per-pegawai, konsol CRUD)

> **Bukan item sidebar.** Drill-down dari Page 2 (Data Pegawai) untuk **satu** pegawai.
> Berbeda dari panel kanan Dashboard (Page 1) yang **read-only, akordeon, self-service** —
> Page 4 adalah **konsol kerja HR**: satu kategori per layar, filter di toolbar, aksi baris, Lampiran.

**Keputusan 1 — Scope: CRUD penuh, bertahap.**
Tambah/ubah/hapus riwayat + kelola Lampiran (BE POST/PUT/DELETE + `/kepegawaian/lampiran/*` sudah ada).
Fase 1 = **Mutasi saja, tapi tuntas** (tabel kaya + filter + CRUD + Lampiran); kategori lain menyusul
dengan pola yang sama. Read-only ditolak: tanpa CRUD page ini cuma menduplikasi panel kanan Dashboard.

> ⚠️ Konsekuensi: `SectionRightPanel` **tidak bisa dipakai ulang apa adanya** — kolomnya jauh lebih
> tipis (mutasi: Jenis · Organisasi · Jabatan · TMT) daripada spek (SK komposit + pasangan Lama/Baru + Aksi).
> Yang dipanen dari sana: formatter `jenisSk()`, `jenisMutasi()`, `rp()`, `formatDate()`, pola `SectionConf`.

**Keputusan 2 — Route per kategori.** → [ADR-0013](../adr/0013-riwayat-route-per-kategori.md)

```
app/(app)/kepegawaian/data/
├─ page.tsx                    (existing, 3 tab)
├─ tambah/                     (existing — segmen statis menang atas [pegawaiId], tidak bentrok)
└─ [pegawaiId]/riwayat/
   ├─ layout.tsx               header NIPAM + nama, rail "Kategori" (page-local)
   ├─ page.tsx                 redirect → ./mutasi
   └─ mutasi/page.tsx          fase 1   (kontrak|sk|sp/ menyusul)
```

URL contoh: `/kepegawaian/data/123/riwayat/mutasi?nomorSk=820&page=2`

Alasan: filter **wajib** hidup di `searchParams` (aturan terkunci CONTEXT-MAP). Satu route berbagi
untuk semua kategori membuat `nomorSk` / `jenisMutasi` / `nomorSp` / `nomorKontrak` bertabrakan dan
bocor antar-kategori. Rail Kategori = **navigasi `<Link>` nyata**, bukan akordeon/tab state.
Pengiriman bertahap jadi natural: tambah satu folder per kategori.

Ditolak: satu route + `?kategori=` (namespacing filter jadi rumit); menjadikan
`/kepegawaian/data/[pegawaiId]` sebagai "page detail pegawai" penuh dengan riwayat sebagai tab
(memperkenalkan konsep baru yang belum ada + memaksa `RingkasanPanel` pindah/diduplikasi).

**Keputusan 3 — Entry point: tombol "Riwayat" di `RingkasanPanel`.**

Alur: klik baris di tabel Data Pegawai → panel Ringkasan muncul di kanan → klik **Riwayat**
→ `router.push("/kepegawaian/data/{id}/riwayat/mutasi")`. Tombol ke-3 sebaris dengan
"Edit Profil" & "Edit Gaji".

Alasan: `onRowClick` di `/kepegawaian/data` **sudah terpakai** untuk memilih pegawai
(`setSelectedId` → `RingkasanPanel`), jadi drill-down tak bisa numpang klik baris.
Panel Ringkasan sudah memegang `pegawaiId` yang pasti + `nik`, dan baris aksinya sudah jadi
tempat kanonik untuk aksi per-pegawai.

Ditolak: ikon aksi per baris (menabrak aturan CONTEXT-MAP "aksi baris = Edit + Hapus, tanpa
menu titik-tiga" + melebarkan tabel yang sudah punya 11 filter); NIPAM sebagai link (jebakan
salah-klik baris-vs-sel, melanggar mandat target sentuh ≥44px untuk pengguna lansia);
dua-duanya sekaligus (dua pintu, nol kemampuan baru).

> ⚠️ Catatan implementasi: baris aksi di `ringkasan-panel.tsx` **terduplikasi** — sekali di
> cabang `isPending` (di-gate `showActions`) dan sekali di render akhir. Tombol harus ditambah
> di **dua** tempat, kalau tidak ia hilang saat panel sedang memuat.

**Keputusan 4 — Kolom Aksi = ikon Edit + Hapus; klik-baris = PILIH (bukan Edit).**

Menu `⋯` screenshot **ditolak** — CONTEXT-MAP §170 mengunci "ikon Edit + Hapus langsung, bukan
menu `⋮`". Kolom Aksi = 2 ikon (≥20px, sentuh ≥40px): Edit → Sheet, Hapus → `<ConfirmDeleteDialog>`.

Tapi setengah aturan §170 yang lain — "**klik di mana saja pada baris = buka Edit**" —
**di-override di page ini**: klik baris = **pilih baris**, kartu **Lampiran** di bawah memuat
lampiran baris itu.

Alasan override (bukan pelanggaran diam-diam): lampiran hanya bisa diambil lewat
`GET /kepegawaian/lampiran/list/{ref}/{refId}` — **butuh `refId`**, tak ada endpoint lampiran
per-pegawai. Jadi kartu Lampiran secara struktural milik **satu baris**, bukan milik pegawai;
harus ada konsep "baris terpilih". Polanya sudah ada persis di Page 2
(`onRowClick` → `selectedRowId` → `RingkasanPanel`), jadi ini konsistensi lokal, bukan konsep baru.

Aturan §170 tetap berlaku default untuk tabel master & tabel lain. Pengecualiannya sempit:
**tabel yang punya panel/kartu detail bergantung baris**.

> ⚠️ Konsekuensi: `refId` baris terpilih perlu ikut `searchParams` (mis. `?sel=123`) supaya
> reload/back tidak kehilangan konteks Lampiran — konsisten dengan "URL = sumber kebenaran".

**Keputusan 5 — Kartu Lampiran: unggah/lihat/unduh/hapus. Approval TIDAK dibuat.**

Kolom: `No | File | Keterangan | Aksi`. Aksi = **Lihat** + **Hapus** (unduh bukan tombol terpisah —
lihat aturan viewer di bawah). Tombol `+ Unggah` di kanan-atas kartu.

**Approval ditolak untuk page ini** — bukan ditunda karena RBAC, tapi karena **tidak relevan**:
konsol ini hanya diakses admin/HR, dan HR tidak menyetujui berkasnya sendiri. `POST /kepegawaian/lampiran/accept`
tetap ada di BE (dipakai alur `profil/*` self-service pegawai, di mana HR-lah yang menyetujui),
tapi **tidak dipanggil dari Page 4**. Konsekuensi: **tidak ada kolom Status** di kartu ini —
field `disetujui` / `disetujuiOleh` / `tanggalDisetujui` di `LampiranSkQuery` diabaikan di sini.

**Aturan "Lihat" — viewer bersyarat tipe file:**

| `mimeType` | Perilaku tombol Lihat |
|---|---|
| `application/pdf` | buka viewer in-app (dokumen tampil) |
| `image/*` | buka viewer in-app (gambar tampil) |
| lain-lain | **langsung unduh berkas** — tanpa viewer, tanpa dialog |

Satu tombol, dua perilaku — pengguna lansia tidak perlu memilih antara "lihat" dan "unduh";
sistem yang memutuskan. Sumber berkas: `GET /kepegawaian/lampiran/file/{jenis}/{id}`.

> ⚠️ **Ini upload pertama di codebase.** `grep FormData|type="file"|multipart` di seluruh `src/` = **nol hasil**;
> semua mutasi selama ini JSON. `LampiranSkPostRequest.fileName` bertipe `binary` → `multipart/form-data`.
> `proxy.ts` memakai `rewrite` (bukan `fetch` manual, lihat komentar `ponytail:` di baris 48), jadi body
> diteruskan apa adanya — **harus diverifikasi nyata**, bukan diasumsikan. Batas tipe & ukuran unggah
> masih TBD.

**Kunci lampiran = SK, bukan baris mutasi.** `ref` bertipe `JenisSk` (9 literal SK), jadi
`(ref, refId)` = **(jenis SK, id SK)** — bukan id baris mutasi. Bukti: `GET /riwayat/mutasi/pegawai/{id}`
menyediakan filter `riwayatSkId`, artinya baris mutasi memang punya id SK yang **berbeda** dari id
barisnya sendiri. Untungnya keduanya sudah ada di row: `row.skMutasi.id` + `row.skMutasi.jenisSk`
(`RiwayatMutasiQuery.skMutasi: RiwayatSkQuery`) — tak perlu fetch tambahan.

Konsekuensi yang harus disadari: **dua baris mutasi yang berbagi SK yang sama akan berbagi lampiran
yang sama.** Judul kartu karenanya menyebut SK-nya (`Lampiran — SK 820/2821/2020`), bukan "Lampiran
baris ini". `?sel=` di URL menyimpan **id baris mutasi** (identitas baris yang stabil & terlihat di
tabel); `ref`/`refId` diturunkan dari `row.skMutasi`. Sisa yang perlu dikonfirmasi ke BE hanyalah
apakah `skMutasi.id` benar-benar terisi di response list.

Taksonomi kategori lain: **SP tidak ikut subsistem ini** (punya `fileName`/`mimeType` inline +
`GET /riwayat/sp/{id}/file`); **Kontrak tidak punya berkas sama sekali**; Terminasi memakai
`lampiranSkTerminasi` tunggal, bukan list. Jadi kartu Lampiran **hanya muncul di kategori Mutasi & SK**.

> ⚠️ Spec `POST /kepegawaian/lampiran` mendeklarasikan `LampiranSkPostRequest` sebagai **query
> parameter** (`in: query`) padahal isinya field `binary` — ini kekhasan Springdoc untuk
> `@ModelAttribute`; realitanya `multipart/form-data`. Generator tipe menyalin spec apa adanya,
> jadi **jangan percaya `in: query`** — verifikasi dengan request nyata.

**Keputusan 6 — Filter: endpoint per-pegawai MENERIMA filter, tapi tiap kategori beda set.**

Terverifikasi dari `docs/api/kepegawaian/api.json` (bukan dari tipe generate — `RiwayatSearchParams`
adalah gabungan semua kategori dan **menyesatkan** kalau dipakai apa adanya per-page):

| Kategori | Filter yang benar-benar diterima (di luar `page`/`size`/`sortBy`/`sortDirection`) |
|---|---|
| **mutasi** | `pegawaiId`, `riwayatSkId`, `nomorSk`, `jenisMutasi`, `organisasiId`, `namaOrganisasi`, `jabatanId`, `namaJabatan`, `organisasiLamaId`, `namaOrganisasiLama`, `jabatanLamaId`, `namaJabatanLama` |
| sk | `pegawaiId`, `nomorSk`, `jenisSk`, `golonganId` |
| kontrak | `pegawaiId`, `nomorKontrak` |
| sp | `pegawaiId`, `nomorSp`, `jenisSpId` |

Toolbar screenshot ("Cari SK" + "Pilih Jenis Mutasi" + reset) **terpenuhi persis** oleh
`nomorSk` + `jenisMutasi`. Fase 1 hanya merender dua filter itu — sisanya (organisasi/jabatan
lama & baru) tersedia di BE tapi **tidak dirender**: satu pegawai jarang punya puluhan baris mutasi,
jadi filter tambahan = kolom mati untuk pengguna lansia. YAGNI, bisa ditambah kalau nanti diminta.

⚠️ Set filter yang berbeda per kategori **memperkuat Keputusan 2** (route per kategori): satu route
bersama harus menyaring `searchParams` per kategori secara manual — persis kerumitan yang dihindari.

**Keputusan 7 — Form Mutasi: satu Sheet, 2 bagian, apa adanya. Tanpa validasi rantai riwayat.**

`RiwayatMutasiPostRequest` = **dua entitas dalam satu tulis**: seluruh isi `RiwayatSkPostRequest`
(±12 field) + field mutasi (±10). Jadi satu Sheet (heavy form per CONTEXT-MAP) dengan 2 grup:
**Surat Keputusan** (`nomorSk*`, `jenisSk*`, `tanggalSk*`, `tmtBerlaku*`, `gajiPokok`, `mkgTahun/Bulan`,
`kenaikanBerikutnya`, `mkgbTahun/Bulan`, `notes`) dan **Perubahan** (`jenisMutasi*`, lalu pasangan
`golonganLamaId`→`golonganId`, `organisasiLamaId`→`organisasiId`, `jabatanLamaId`→`jabatanId`,
`profesiLamaId`→`profesiId`, `tanggalBerakhir`).

**Field Lama: prefill dari data pegawai saat ini, tetap bisa diubah.** Tidak dikunci read-only —
HR perlu backfill riwayat lampau (mutasi 2019 punya golongan lama yang bukan golongan hari ini).

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

**Keputusan 9 — Unggah lampiran: tanpa validasi klien. BE yang memvalidasi.**

`<input type="file">` **tanpa `accept`, tanpa cek `file.size`**. Berkas dikirim apa adanya; bila BE
menolak (413/415/400), pesan error BE ditampilkan apa adanya — konsisten dengan pola "mutasi gagal →
toast berisi pesan BE" yang sudah dipakai di seluruh aplikasi. Frontend tidak menebak-nebak aturan
yang tidak ada di spec.

Konsekuensi yang diterima sadar: pengguna baru tahu berkasnya ditolak **setelah** unggahan selesai.
Mitigasi yang tetap wajib (ini bukan validasi, ini state handling — lihat CONTEXT-MAP §state):
tombol Unggah `disabled` + label "Mengunggah…" selama `isPending`, dan dialog tetap terbuka saat
gagal agar berkas tidak perlu dipilih ulang.

> ⚠️ **Sisa risiko teknis, bukan keputusan desain — harus dibuktikan lebih dulu di implementasi.**
> `proxy.ts` meneruskan lewat `NextResponse.rewrite` (baris 49–63): header di-clone, body **tidak
> disentuh**, jadi secara teori `multipart/form-data` + boundary lolos utuh. Belum pernah dijalankan
> — nol `FormData` di seluruh `src/`. Langkah pertama issue unggah = **spike**: POST satu berkas nyata
> ke `/api/proxy/kepegawaian/lampiran`, pastikan BE menerimanya. Kalau `rewrite` merusak body/boundary,
> barulah pertimbangkan route handler khusus di `app/api/` (saat ini direktori itu tidak ada sama sekali).
> Catatan tambahan: `api` client di `src/lib/api/client.ts` ber-`BASE = "/api/proxy/master"` dan selalu
> `JSON.stringify` — **tidak bisa dipakai** untuk unggah; pakai `fetch` langsung seperti yang sudah
> dilakukan `section-right-panel.tsx` untuk endpoint kepegawaian.

**Keputusan 10 — RBAC ditunda (lagi). Page 4 ikut role ADMIN/HR lewat entity `pegawai` yang sudah ada.**

Matriks RBAC per-entity belum dirancang, dan Page 4 **tidak** dijadikan pemicu untuk merancangnya.
Gate-nya ikut preseden yang sudah ship: `data/tambah/page.tsx` melakukan tulis lintas-pegawai dengan
`can(roles, "create", "pegawai")`. Page 4 memakai kunci entity yang sama.

| Titik | Gate |
|---|---|
| `[pegawaiId]/riwayat/**/page.tsx` | `can(roles, "view", "pegawai")` → `forbidden()` |
| Tombol **+ Tambah Mutasi** | `<Can action="create" entity="pegawai">` |
| Ikon ✎ / 🗑 di kolom Aksi | `<Can action="update" \| "delete" entity="pegawai">` |
| Unggah / hapus lampiran | ikut `update` / `delete` `"pegawai"` |

**Satu baris yang tetap harus ditambah:** `can()` melakukan `PERMISSIONS[role.toLowerCase()]`, jadi
label Appwrite `HR` **tidak akan cocok apa pun** selama `PERMISSIONS` cuma punya `admin` dan `viewer`
— HR bakal kena `forbidden()`. Supaya "ikut ADMIN/HR" benar-benar berlaku:
`hr: { "*": ALL }` di `src/lib/auth/permissions.ts`, sejajar `admin`. Bukan matriks, satu baris.

**Kenapa ADR-0012 tidak jadi blocker.** ADR-0012 menulis *"Tinjau ulang jika: muncul kebutuhan edit
lintas-pegawai (HR) → butuh RBAC nyata"*. Kenyataannya kebutuhan itu **sudah lewat tanpa ditinjau**:
`/kepegawaian/data/tambah`, Terminasi, dan 15 page master semuanya sudah ship sebagai tulis
lintas-pegawai di atas wildcard `admin: {"*": ALL}`. Utang RBAC itu utang seluruh aplikasi, bukan
utang Page 4 — memblokir fitur ini demi model yang belum punya peminta = menghukum halaman yang
kebetulan datang terakhir. Karena itu **tidak ada ADR** untuk keputusan ini: tidak ada trade-off baru
yang dipilih, hanya preseden yang diikuti.

Biaya membalik nanti ≈ nol: `can()` sudah `perms[entity] ?? perms["*"]`, jadi saat matriks asli
dirancang, mengganti `"pegawai"` → `"riwayat"` di page + `<Can>` adalah find-replace di satu direktori,
tanpa menyentuh page lain.

**Rail "Kategori" (page-local, bukan sidebar)** — konsisten dengan resolusi "rail tetap 6 modul":

| Item rail | Sumber | Fase |
|---|---|---|
| Data Mutasi | `/kepegawaian/riwayat/mutasi/pegawai/{pegawaiId}` | 1 |
| Riwayat Kontrak Kerja | `/kepegawaian/riwayat/kontrak/pegawai/{pegawaiId}` | 2 |
| Riwayat Surat Keputusan | `/kepegawaian/riwayat/sk/pegawai/{pegawaiId}` | 2 |
| Riwayat Surat Peringatan | `/kepegawaian/riwayat/sp/pegawai/{pegawaiId}` | 2 |
| Data Penggunaan Hak Cuti | `/cuti/pengajuan/{pegawaiId}/pegawai` (+ `/cuti/kuota/{pegawaiId}/{tahun}/sisa`) — **read-only** | 2 |

**Gate:** `can(roles, "view", "pegawai")` (page) + `<Can … entity="pegawai">` per aksi — lihat
Keputusan 10. Prasyarat implementasi: tambah `hr: { "*": ALL }` ke `PERMISSIONS`.

**Keputusan 11 — Kunci identitas = `pegawaiId` numerik, tanpa konversi. Header dari
`GET /pegawai/{id}/session`.**

Tidak ada pertanyaan `pegawaiId` vs `nik` yang tersisa untuk Fase 1: BE sudah memutuskannya.
`/profil/*` di-key `biodataId=${nik}`; **seluruh** `/kepegawaian/riwayat/{mutasi,sk,kontrak,sp}/pegawai/{id}`
di-key `{id}` int64. Rail Fase 1 & 2 semuanya jatuh di sisi kedua → route Keputusan 2
(`data/[pegawaiId]/riwayat/…`) langsung cocok, nol konversi. Kategori **cuti** juga: `/cuti/pengajuan/{pegawaiId}/pegawai` di-key int64 yang sama (Keputusan 12) →
`nik` tidak dibutuhkan satu rail item pun. Ia tetap ikut gratis di payload header.

**Tab Non-pegawai bukan lubang.** Sempat dikira tombol Riwayat bisa memancarkan NIK ke URL karena
`getRowId` = `id ?? nik`. Ternyata tidak: di `data-pegawai-client.tsx` **`onRowClick` dan
`RingkasanPanel` sama-sama di-gate `isPegawaiTab`** — di tab `nonpegawai` baris tak bisa dipilih dan
panelnya tak dirender, jadi tombol Riwayat (Keputusan 3, hidup di dalam `RingkasanPanel`) tak pernah
ada di sana. `?? nik` hanya dipakai sebagai React key. **`selectedId` selalu `pegawai.id` numerik.**
Tidak ada guard baru yang perlu ditulis.

**Header — sumber: `GET /pegawai/{id}/session`** (`operationId: findSession`, ada di spec, **belum
dipakai di `src/` sama sekali**) → `PegawaiResponseSession { id, nipam, nik, nama, jabatan, organisasi }`.
Cukup untuk `Data Mutasi Pegawai [730700326] (YULIAWATY, S.Sos.)`, plus `nik` gratis bila kategori
cuti nanti membutuhkannya.

| Ditolak | Alasan |
|---|---|
| `getPegawaiSession()` (session login) | Di-key `user.$id` = **peninjau**, bukan param URL. Page 4 = HR melihat pegawai lain → header salah orang. `session` di repo ini berarti dua hal; ini yang bukan. |
| `["ringkasan", pegawaiId]` (reuse cache tabel) | Soft-nav memang 0 fetch, tapi hard-refresh menarik **35 field untuk memakai 2** — beban BE sia-sia. Keputusan user: hemat BE > hemat 1 request. |
| `?nipam=…&nama=…` di query string | URL kotor, nama bisa basi/di-tamper saat di-share, tiap linker wajib bawa 2 param. |

Bentuk: `useQuery({ queryKey: ["pegawai-session", pegawaiId], staleTime: 5 * 60_000 })` — header
jarang berubah, `staleTime` panjang, bukan `Infinity`. 404/!ok → panel inline "Pegawai tidak
ditemukan" (bukan toast; aturan §Anti-Examples).

**Keputusan 12 — Rail "Data Penggunaan Hak Cuti" = Fase 2, read-only. Tanpa tombol +, tanpa kolom
Aksi.**

Baris rail lama (`modul cuti — belum dibangun | ⏳ TBD`) **salah** dan sudah dikoreksi di tabel di
atas. Yang benar-benar belum dibangun adalah **page**-nya: `src/app/(app)/cuti/` tidak ada, dan
`app-shell.tsx:47` mendaftarkan grup nav `{ id: "cuti", label: "Cuti", entities: [] }` yang masih
kosong. Tapi kontraknya sudah lengkap — `src/types/cuti/{approval,jenis,kuota,pengajuan}.ts` sudah
digenerate dan 18 path `/cuti/*` ada di spec. Jadi ini pertanyaan scope, bukan feasibility.

**Sumber data:**

| Kebutuhan | Endpoint | Bentuk |
|---|---|---|
| Tabel penggunaan | `GET /cuti/pengajuan/{pegawaiId}/pegawai` (`operationId: index_3`) | `CutiPengajuanMiniResponse`, paged |
| Strip kuota sisa | `GET /cuti/kuota/{pegawaiId}/{tahun}/sisa` (`showByPegawai`) | `SingleResultCutiKuotaSisa` |

Kolom: `tanggalMulai`–`tanggalSelesai` (satu sel periode), `jenisCuti`/`subJenisCuti`,
`jumlahHariKerja`, `approvalCutiStatus`. Filter yang tersedia bila nanti diperlukan: `tahun`,
`approvalCutiStatus`, `jenisPengajuanCuti` — Fase 2 cukup `tahun`.

**Kenapa read-only, bukan CRUD seperti Mutasi:**

1. **State machine milik orang lain.** `approvalCutiStatus` punya 6 state
   (`PENDING|APPROVED|CONFIRMED|REJECTED|CANCELED|RETURNED`) plus `approvalLevel` dan `picSaatIni`.
   Menulis dari konsol riwayat berarti konsol ini jadi pintu masuk alur approval cuti — itu modul
   `cuti`, bukan riwayat pegawai. Sejalan dengan Keputusan 5 yang sudah membuang approval lampiran.
2. **`csrfToken` di request tulis.** `CutiPengajuanPostRequest`/`PutRequest`/`KlaimPostRequest`
   semuanya membawa field `csrfToken` yang **tidak dipakai bagian app manapun** — belum ada
   mekanisme mint/refresh-nya di FE. Read path tidak menyentuhnya. Kalau nanti modul cuti dibangun,
   masalah ini diselesaikan sekali di sana, bukan dua kali.
3. **Klaim cuti punya bentuk sendiri.** `CutiPengajuanKlaimPostRequest { refCutiId, listHari, … }`
   ≠ pengajuan biasa → satu `<CrudForm>` tak menutup keduanya.

**Fase 2, bukan Fase 1.** Fase 1 sudah berisi Mutasi CRUD penuh + Lampiran + spike multipart.
Menambah query/tabel/route cuti ke batch pertama memperbesar risiko tanpa menambah nilai — rail
item lain (kontrak/sk/sp) juga Fase 2 dan bentuknya lebih dekat ke Mutasi.

**Di Fase 1 rail item cuti tetap dirender tapi non-aktif** (sama perlakuan dengan kontrak/sk/sp) —
rail harus utuh 5 item sesuai screenshot sejak hari pertama; yang belum ada hanyalah tujuannya.

| Ditolak | Alasan |
|---|---|
| Drop dari rail Page 4 | Menyimpang dari screenshot legacy; HR kehilangan konteks cuti saat menelaah satu pegawai. |
| Fase 1 | Membengkakkan batch pertama yang sudah berisi CRUD + subsistem upload pertama. |
| CRUD penuh | Menyeret alur approval + `csrfToken` + bentuk klaim ke konsol riwayat. Milik modul `cuti`. |

**Belum terkunci:** — (kosong). Semua pertanyaan desain tertutup.
(Verifikasi multipart lewat `proxy.ts` = spike di Keputusan 9, bukan pertanyaan desain. RBAC tulis =
ditunda secara sadar di Keputusan 10. Kunci identitas = tertutup di Keputusan 11. Scope cuti =
tertutup di Keputusan 12.)

## Status

- ✅ Grilling round 1 selesai (identitas, 3 page, gating, istilah). Keputusan terkunci di doc ini + ADR-0006.
- ✅ **W1** — Generate tipe (`kepegawaian-fe-0is`) & verifikasi backend batch (`kepegawaian-fe-oqp`).
- ✅ **W2** — `getPegawaiSession()` (`kepegawaian-fe-djv`), Data Pegawai 3 tab (`kepegawaian-fe-hnc`), Terminasi 2 tab (`kepegawaian-fe-vfe`).
- ✅ **W3** — Dashboard Pegawai read-only 5 section (`kepegawaian-fe-tvr`).
- 🔄 **W5** — Dashboard re-layout 2 panel + accordion (ADR-0011). Grilling round 2 selesai; layout terkunci di §Page 1 + ADR-0011. Implementasi = beads issue (delegasi agen).
- ✅ **W4** — Sidebar grup Kepegawaian + 3 sub-item (`kepegawaian-fe-9cm`).
- ✅ **Epic tutup** — `kepegawaian-fe-a2e` closed.
- ✅ **Sync tipe** — `PegawaiTableResponse` (table flat) & `PegawaiResponseSession` (session ringan) tersedia di `src/types/pegawai/pegawai.ts`.
- ✅ **Modul baru** — `laporanKepegawaian` terdaftar di generator, tipe di `src/types/laporan/kepegawaian.ts`.
- ✅ **changedStatus** — endpoint dashboard migrasi ke `GET /profil/biodata/{nik}/dashboard`, badge "Menunggu" + tooltip di title "Data Pribadi". Tipe di-generate via `extract-types.js`.
  - ⏳ Alur approval penuh dari admin (review + approve/reject) masih menyusul.
- ✅ **Tooltip fix** — `TooltipTrigger` Base UI render sbg `<button>` secara default, bentrok dengan `AccordionTrigger` (juga `<button>`). Fix: `render={<span />}` agar valid HTML. Lihat `section-left-panel.tsx`.
- ⏳ Dashboard masih membutuhkan backend nyata untuk data lives.
