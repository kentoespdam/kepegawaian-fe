# CONTEXT — Modul Master (data referensi)

**Delta modul Master.** Berisi HANYA yang khas Master: taxonomy entitas, prefix `/master`, graf
FK, entitas tree + parent picker, form berat (sanksi/profesi), dan grid shortcut dashboard. Semua
**konvensi lintas-modul** (endpoint shape, data fetching, table states, RBAC, app shell, form
engine, delete UX, dsb.) ada di **[`CONTEXT-MAP.md`](../../CONTEXT-MAP.md)** — baca itu dulu.

> **Status:** grilling round 1 (Autentikasi + Master). Modul Master = data referensi/master-data
> yang dikonsumsi modul-modul lain (kepegawaian, cuti, penggajian…) sebagai sumber `/list`.

## Prefix endpoint — `/master`

Master memakai shape endpoint standar (lihat `### Endpoint conventions` di core) dengan prefix
**`/master`**: `GET /master/{entity}`, `GET /master/{entity}/list`, `GET /master/{entity}/{id}`,
`POST/PUT/DELETE /master/{entity}[/{id}]` — semua lewat `/api/proxy/*`.

## Entity taxonomy — 17 CRUD + 5 reference lists

**Entitas CRUD (17)** — masing-masing punya halaman Master penuh (list + form + delete),
dirender lewat shared primitives (lihat `### Master build strategy` di bawah):

`golongan`, `grade`, `jabatan`, `organisasi`, `profesi`, `sanksi`, `level`, `jenjang-pendidikan`,
`jenis-keahlian`, `jenis-kitas`, `jenis-pelatihan`, `jenis-sp`, `alasan-berhenti`, `alat-kerja`,
`apd`, `hari-libur`, `rumah-dinas`.

**Reference lists (5, read-only, TANPA halaman Master di rilis 1)** — hanya dikonsumsi sebagai
sumber `/list` oleh modul lain, tidak dapat di-CRUD dari UI Master:

`jenis-kontrak`, `jenis-mutasi`, `jenis-sk`, `status-kerja`, `status-pegawai`.

> Total ±22 entitas referensi = 17 CRUD + 5 reference. Angka "22" yang muncul di DESIGN
> (architecture.md §17) merujuk gabungan ini; yang punya **halaman** hanya 17.

### Graf FK & bentuk (khas Master)

- **Tree (`parentId`, hierarki):** `organisasi`, `jabatan`.
- **FK-dependent (dropdown `/list` dari entitas lain):**
  - `profesi` → (`organisasi`, `jabatan`, `grade`)
  - `grade` → `level`
  - `apd` → `profesi`
  - `alat-kerja` → `profesi`
  - `sanksi` → `jenis-sp`
- Sisanya entitas datar (flat) tanpa FK.

Graf FK inilah yang membuat **combobox-of-id filter** (`### DataTable filtering` di core) relevan
di Master: mis. memfilter `profesi` per `organisasiId`, atau `apd` per `profesiId`. Value yang
dikirim ke backend = **id** opsi, bukan teksnya.

## Master build strategy — bespoke files di atas shared primitives (BUKAN engine config-driven)

Tiap entitas Master punya **file konkret sendiri** (page, columns, form) → perbedaan tampilan
per-entitas mudah dibaca & diubah — **bukan** satu engine generik yang digerakkan config. DRY
dipaksa lewat **shared primitives** yang tiap entitas compose (semua didefinisikan di core):
`<DataTable>` + `<DataTableToolbar>` + `<DataTablePagination>`, `<CrudForm>`,
`<ConfirmDeleteDialog>`, `<Can>`, hook proxy/`useResource`, helper API client bertipe. Duplikasi
hanya di **glue tipis per-entitas** (columns + skema Zod + config toolbar) — tak pernah di logika
table/fetch/CRUD. Ke-17 entitas CRUD memakai anatomi layar daftar & presentasi form yang sama.

## Entitas tree — organisasi & jabatan (`parentId`)

`organisasi` dan `jabatan` bersifat **hierarkis** (`parentId`). Implikasi khas Master:
- Di **combobox filter** (toolbar) & **FK dropdown** form, entitas tree ditampilkan **flat dengan
  indent/path** agar bisa dicari cepat (lihat `### DataTable filtering` di core).
- Di **tabel**, boleh menampilkan kolom Parent (nama induk) untuk orientasi.
- Memilih **parent saat create/edit** adalah concern tersendiri → **Parent picker** di bawah.

### Parent picker (create/edit entitas tree)

Saat membuat/menyunting `organisasi`/`jabatan`, field **Parent** memakai picker khusus:
- Opsi mencakup **"Tanpa parent (root)"** (nilai kosong) untuk simpul akar.
- Saat **edit**, picker **men-disable subtree** dari node yang sedang disunting (node itu sendiri
  + semua keturunannya) agar tak tercipta siklus (tak bisa menjadikan anak sebagai induknya).
- Picker merender pohon flat ber-indent (konsisten dengan combobox tree).

## Heavy-form layout — sanksi & profesi (upgrade ke Sheet)

Mayoritas entitas Master = form pendek (2–6 field) → **Dialog** (lihat `### CRUD form
presentation` di core). Dua entitas ini "berat" → **Sheet** (drawer kanan), body single-column
yang sama + tambahan section header & switch list:

### `sanksi` — 3 field inti + 8 switch boolean + 1 field kondisional
- **Inti (3):** kode, keterangan, + FK `jenis-sp` (`### DataTable filtering`/FK).
- **8 switch boolean** (efek sanksi), tiap-tiap berlabel Bahasa Indonesia yang jelas — mis.
  `potTkk` → **"Potong TKK"**, dan tujuh switch efek lain dengan pola label serupa (label
  manusiawi, bukan nama field mentah — untuk keterbacaan lansia).
- **Kondisional:** `jmlPotTkk` (jumlah/persentase potong TKK) hanya muncul & wajib bila switch
  **"Potong TKK"** aktif. Kolom angka pakai `tabular-nums` (lihat `### Typography` di core).
- Footer Sheet sticky (Batal/Simpan) karena form panjang.

### `profesi` — dua section IDENTITAS + DETAIL, banyak FK
- **IDENTITAS:** field identitas profesi (kode, nama, dst.).
- **DETAIL:** FK ke `organisasi`, `jabatan`, `grade` (tiga FK dropdown, `/list`, combobox-of-id),
  plus atribut detail lainnya.
- Section header kapital (IDENTITAS / DETAIL) memisah blok di dalam Sheet single-column.

## Dashboard shortcut grid — 17 kartu Master

Bagian **shortcut grid** landing (lihat `### Dashboard landing` di core) untuk rilis 1 = **17
kartu** menuju 17 entitas Master CRUD (klik → tabel entitas). Kartu **statis** (ikon lucide +
label), **tanpa query count per-entitas** (nol statistik karangan, ringan). 5 reference list
TIDAK berkartu (tak punya halaman). Greeting/shell di grid tetap milik core; hanya isi kartu =
delta Master ini.
