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

## Entity taxonomy — 15 CRUD + 5 reference lists

**Entitas CRUD (15)** — masing-masing punya halaman Master penuh (list + form + delete),
dirender lewat shared primitives (lihat `### Master build strategy` di bawah):

`golongan`, `grade`, `jabatan`, `organisasi`, `profesi`, `sanksi`, `level`, `jenjang-pendidikan`,
`jenis-keahlian`, `jenis-kitas`, `jenis-pelatihan`, `jenis-sp`, `alasan-berhenti`, `hari-libur`,
`rumah-dinas`.

> **`apd` & `alat-kerja` BUKAN entitas CRUD berhalaman.** Endpoint keduanya di-nested di bawah
> profesi (`/master/profesi/{profesiId}/apd`) dan hanya di-surface sebagai kolom badge inline di
> tabel `profesi` — lihat `### apd & alat-kerja` di bawah.

**Reference lists (5, read-only, TANPA halaman Master di rilis 1)** — hanya dikonsumsi sebagai
sumber `/list` oleh modul lain, tidak dapat di-CRUD dari UI Master:

`jenis-kontrak`, `jenis-mutasi`, `jenis-sk`, `status-kerja`, `status-pegawai`.

> Total ±20 entitas referensi = 15 CRUD + 5 reference (di luar apd/alat-kerja yang kini nested di
> profesi). Yang punya **halaman** hanya 15.

### Graf FK & bentuk (khas Master)

- **Tree (`parentId`, hierarki):** `organisasi`, `jabatan`.
- **FK-dependent (dropdown `/list` dari entitas lain):**
  - `profesi` → (`organisasi`, `jabatan`, `grade`)
  - `grade` → `level`
  - `sanksi` → `jenis-sp`
- **Nested di profesi (path param, bukan FK dropdown):** `apd` & `alat-kerja` hidup di bawah
  `/master/profesi/{profesiId}/…` — profesiId ada di URL, bukan di body. Bukan entitas berhalaman.
- Sisanya entitas datar (flat) tanpa FK.

Graf FK inilah yang membuat **combobox-of-id filter** (`### DataTable filtering` di core) relevan
di Master: mis. memfilter `profesi` per `organisasiId`. Value yang dikirim ke backend = **id**
opsi, bukan teksnya.

## Master build strategy — 15 typed pages di atas shared primitives

Tiap entitas Master punya **halaman sendiri** (file page konkret per-entitas, bukan 1 dynamic
route) + form sendiri (sanksi/profesi bespoke, sisanya generic lewat `<EntityFormModal>`).
DRY dipaksa lewat **shared primitives** yang tiap entitas compose (semua didefinisikan di core):
`<DataTable>` + `<DataTableToolbar>` + `<DataTablePagination>`, `<CrudForm>`,
`<ConfirmDeleteDialog>`, `<Can>`, hook proxy/`useResource`, helper API client bertipe. Duplikasi
hanya di **glue tipis per-entitas** (columns + skema Zod + config toolbar) — tak pernah di logika
table/fetch/CRUD. Ke-15 entitas CRUD memakai anatomi layar daftar & presentasi form yang sama.

**Fully typed (ADR 0003 + Gelombang 2).** Tipe OpenAPI tiap entitas di-generate ke
`src/types/master/` (tipe `apd`/`alat-kerja` disatukan ke `profesi.ts` — `ApdRow`, `AlatKerjaRow`,
`ApdPostRequest {nama}`, dst.), ditambah `_computed.ts` untuk field hasil
resolve FK (`_organisasiName`, `_jabatanName`, dll. — 6 field `_*Name`).

`EntityConfig<TItem, TReq>` generik meniadakan `Record<string, unknown>` di level config.
Map entitas di-widen tanpa switch, di-factory oleh `makeConfig`. Lapisan di atasnya:

- **`src/config/master-entity-types.ts`** — type-level map `MasterEntityTypes` yang memetakan
  setiap `MasterEntityName` ke `{ TItem, TPage, TReq, TList }` dari tipe entitas konkret.
- **`MasterPageClient<TEntity>`** (`master-client.tsx`) — generic component yang menerima
  literal entity name sebagai prop, infer `TItem`/`TPage`/`TReq` dari `MasterEntityTypes`, dan
  me-wire `useResource<TPage, TReq>` + `EntityConfig<TItem, TReq>` + `<DataTable>` secara typed.
- **15 halaman per-entitas** (`src/app/(app)/master/{entity}/page.tsx`) — server component
  tipis yang panggil `verifySession()` + `can()`, lalu render `<MasterPageClient entity="…" />`
  dengan literal entity name. Dynamic route `[entity]/page.tsx` dihapus — Next.js 404 untuk
  rute tak dikenal.

Dengan arsitektur ini, **`Record<string, unknown>` direduksi ke titik-titik bridge** — aliran
data utama (list via `useResource<TPage>`, submit via `handleSubmit<TReq>`) sudah typed.
Cast `as unknown as EntityConfig<TItem, TReq>` hanya terjadi di satu titik — lookup config
dari map — karena TypeScript belum bisa narrow mapped type per-key. State `editing`/`deleting`
dan bridge `<EntityFormModal>` masih memakai `Record<string, unknown>` untuk kompatibilitas
mundur.

**Ekstraksi komponen (kepatuhan max lines ~120):**
- `sanksi-schema.ts` — schema Zod + tipe + defaults untuk sanksi (diekstrak dari `sanksi-form.tsx`)
- `profesi-schema.ts` — schema Zod + tipe + defaults untuk profesi (diekstrak dari `profesi-form.tsx`)
- `master-switch.tsx` — reusable switch boolean (diekstrak dari `sanksi-form.tsx`)
- `useFkOptions` helper lokal di `profesi-form.tsx` — mereduksi duplikasi 3 FK query jadi
  3 baris.

**Biome compliance:** `bunx biome check --write --unsafe` telah dijalankan dengan zero issues.
`useLiteralKeys` otomatis diterapkan untuk page entity single-word (mis. `config.golongan` tanpa
bracket). Entity hyphenated (`jenjang-pendidikan`, dll.) tetap pakai bracket.

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

**Co-location:** file form & schema heavy-form diletakkan di folder entity masing-masing
(`profesi/form.tsx`, `profesi/schema.ts`, `sanksi/form.tsx`, `sanksi/schema.ts`), bukan di
parent `master/`. Keputusan ini di-ADR-kan di CONTEXT.md §Pattern — form entity-specific
bersama page entity, bukan shared component.

### `profesi` — dua section IDENTITAS + DETAIL, banyak FK
- **IDENTITAS:** field identitas profesi (kode, nama, dst.).
- **DETAIL:** FK ke `organisasi`, `jabatan`, `grade` (tiga FK dropdown, `/list`, combobox-of-id),
  plus atribut detail lainnya.
- Section header kapital (IDENTITAS / DETAIL) memisah blok di dalam Sheet single-column.

### `apd` & `alat-kerja` — badge column inline di tabel `profesi` (nested route)
`apd` dan `alat-kerja` **BUKAN entity berhalaman**. Endpoint keduanya di-nested di bawah profesi:
`POST/PUT/DELETE /master/profesi/{profesiId}/apd[/{id}]` (idem `alat-kerja`). `profesiId` ada di
**path**, body cuma `{nama}`. Keduanya hanya hidup sebagai kolom badge inline di tabel `profesi`.

- **Sumber data badge = baris list itu sendiri.** `PageResultPageProfesiDetail` sudah membawa
  `apdList: ApdRow[]` + `alatKerjaList: AlatKerjaRow[]` per baris → badge render langsung, **tanpa
  fetch per-baris**. (Agent WAJIB verifikasi runtime: bila list ternyata DTO ringan tanpa dua array
  itu, hentikan & flag — JANGAN bikin fallback detail-fetch per baris tanpa bukti butuh. YAGNI.)
- **Dua kolom** di `profesi.config.tsx` (`APD`, `Alat Kerja`), tiap sel = komponen client
  mandiri `<BadgeManager entity="apd|alat-kerja" profesiId={row.id} items={row.apdList} />` via
  `cell: (item) => ReactNode`. `MasterPageClient` **tidak disentuh** (seam via config column).
  Config ini **sudah** menyuplai `profesiId={item.id}` — tak perlu diubah.
- **Layout sel:** badge (`<Badge>` existing) berderet, tiap badge punya ikon edit + tombol ✕ hapus,
  diikuti tombol **`+`** di ujung kolom untuk tambah.
- **Tambah/edit = Dialog kecil** (1 field `nama`, RHF+Zod, pola ADR-0002). **Hapus =
  `ConfirmDeleteDialog`** existing ("Hapus \"<nama>\"?"). Bukan toast-undo, bukan hapus senyap.
- **Mutasi:** `<BadgeManager>` pakai `useBadgeMutations(entity, profesiId)` yang hit **composite
  path** `profesi/${profesiId}/${entity}` lewat `api.create/update/remove`. Body hanya `{nama}`
  (profesiId TIDAK di body — ada di path). Setelah sukses **invalidate HANYA query `["profesi"]`**
  supaya baris tabel (dan badge-nya) refresh — tidak ada lagi query `[entity]` untuk di-invalidate.
  - create: `api.create(\`profesi/${profesiId}/apd\`, {nama})`
  - update: `api.update(\`profesi/${profesiId}/apd\`, id, {nama})`
  - remove: `api.remove(\`profesi/${profesiId}/apd\`, id)`
  - `proxy.ts` & `api/client.ts` **tidak perlu diubah** — rewrite bekerja di kedalaman path apa pun
    dan `entity` diinterpolasi mentah ke URL, jadi string komposit langsung jalan.
- **RBAC = ikut `profesi`.** `+`/edit digating `can(roles,"update","profesi")`, ✕ oleh
  `can(roles,"delete","profesi")`. Karena sel = client component tanpa `roles` di scope, konsumsi
  `RolesContext` + `useRoles()` (sudah ada di `AppShell`) di `<BadgeManager>`.

## Dashboard shortcut grid — 15 kartu Master

Bagian **shortcut grid** landing (lihat `### Dashboard landing` di core) untuk rilis 1 = **15
kartu** menuju 15 entitas Master CRUD (klik → tabel entitas). Kartu **statis** (ikon lucide +
label), **tanpa query count per-entitas** (nol statistik karangan, ringan). `apd`/`alat-kerja` &
5 reference list TIDAK berkartu (tak punya halaman). Greeting/shell di grid tetap milik core;
hanya isi kartu = delta Master ini.
