# Layar Daftar, DataTable, Delete UX, Tree

> **Muat modul ini untuk:** kerja halaman daftar entitas, `<DataTable>`/toolbar/pagination,
> sticky header, table states, filtering, dialog hapus, entitas tree (organisasi/jabatan).
> Berisi §7 (list screens), §8 (delete UX), §11 (tree entities).
> **Sumber:** CONTEXT §List-screen anatomy/§Table states/§DataTable filtering/§Delete UX/§Tree entities/§Parent picker.

---

## 7. Layar daftar (17 entitas Master) — CONTEXT §List-screen anatomy / §Table states / §DataTable filtering

### 7.1 Anatomi (opsi A)

- **Toolbar tipis** (`<DataTableToolbar>`, DI LUAR tabel, di atasnya): kiri = filter combobox +
  search; kanan = **"+ Tambah"** (Tirta Blue solid, teks putih).
- **Density medium:** tinggi baris ≥44px, target 15–25 baris muat tanpa scroll di laptop.
  **Zebra striping** halus + **hover** baris jelas.
- **Aksi baris** di kolom kanan: **ikon Edit + Hapus langsung** (BUKAN menu `⋮`; hanya 2 aksi).
  Ikon ≥20px, area sentuh ≥40px. **Klik di mana saja pada baris = buka Edit**; ikon Hapus →
  `<ConfirmDeleteDialog>`.
- **Footer paginasi** (`<DataTablePagination>`): kiri "Menampilkan {a}–{b} dari {total}", kanan
  pemilih ukuran **10/20/50** (batas API size 1–100) + kontrol halaman. Tetap mounted lintas state.

### 7.2 Tiga potong komponen (tiap entitas hanya inject `columns` + config filter)

- **`<DataTableToolbar>`** — zona kontrol di atas tabel (combobox filter + "Tambah"). Bukan
  filter di header kolom.
- **`<DataTable>`** — presentasi baris + sort via klik header; tanpa UI filter.
- **`<DataTablePagination>`** — footer: nav halaman + page-size + total.

### 7.3 Sticky header (WAJIB — modifikasi shadcn)

Header tabel shadcn bawaan TIDAK sticky. `<DataTable>` HARUS bikin `<TableHeader>` **sticky di
atas** saat body di-scroll:
- `position: sticky; top: 0` pada header.
- **Latar solid** = token `--card`/`--muted` (bukan transparan) agar baris di bawah tak tembus.
- **z-index** di atas baris + **garis/subtle shadow** pemisah bawah.
- Bungkus tabel dalam **wrapper ber-`max-height` + `overflow-auto` sendiri** (bukan scroll
  seluruh halaman) agar `sticky top-0` punya konteks scroll benar.
- Class Tailwind persis diformalkan saat implementasi; header pakai token latar solid = card.

### 7.4 Table states (map 1:1 ke sinyal Query, semua ringan)

| Sinyal Query | Tampilan |
|---|---|
| `isPending` (belum ada data) | **Skeleton rows** meniru kolom — **pure CSS** (`animate-pulse`, div kosong, nol JS/lib). Hanya di `isPending`, tak per-paginasi. |
| `isPlaceholderData` (ganti page/filter) | Baris lama tetap, **dim ~opacity 50% + spinner kecil di toolbar** — tanpa skeleton (nol flicker). |
| `isError` | **Panel merah inline** di area tabel + tombol **"Coba lagi"** → `refetch()`. Toolbar hidup (filter tak hilang). BUKAN toast. |
| `data.length === 0` | **Empty state** bedakan: *belum ada data* (aksi **"+ Tambah"**) vs *filter kosong* (aksi **"Reset filter"**). |

`<DataTableToolbar>` & `<DataTablePagination>` tetap mounted lintas semua state — hanya region
baris yang bertukar. Empty/error = markup statis (satu ikon lucide + teks + maks satu tombol);
spinner = CSS `animate-spin`. **DILARANG** Lottie/animated-SVG/ilustrasi bundle.

### 7.5 Filtering — combobox-of-id + URL state

- Filter utama = **combobox**, bukan free-text. Opsi dari `/master/{entity}/list`; nilai dikirim
  = **id** opsi (mis. pilih "IPA Selatan" → `?organisasiId=42`, bukan teksnya). Cocok untuk
  entitas ber-FK (profesi←organisasi/jabatan/grade, apd/alat-kerja←profesi, grade←level,
  sanksi←jenis-sp). Free-text debounced = minoritas, hanya entitas flat butuh cari-nama.
- **URL = satu-satunya sumber kebenaran** state tabel; simpan **id**
  (`?page=&size=&sortBy=&sortDirection=&organisasiId=42`); combobox baca id balik & render label.
  → back/forward, refresh (tak reset), bookmark/share jalan. Sort = klik header.
- **Perilaku combobox (toolbar filter DAN form FK):** fetch `/list` **sekali**, cache per-entitas,
  filter **client-side in-memory** (instan, tanpa request per keystroke). `/list` tak punya param
  search (unpaginated by design). Cache **dibagi**: organisasi list melayani toolbar filter +
  form FK profesi → satu fetch. Tree (organisasi/jabatan) render **flat dengan path/indent**.

---

## 8. Delete UX — `<ConfirmDeleteDialog>` (CONTEXT §Delete UX)

Satu komponen **reusable, entity-agnostic** (AlertDialog) dipakai identik 17 entitas.
Props: `title` / `itemLabel` / `onConfirm`. User harus mengetik **kata konstan `HAPUS`**
(bukan nama baris — agar generik) untuk mengaktifkan tombol Hapus.

- **Tanpa optimistic removal** — baris hilang hanya setelah Backend 200.
- **409 (dipakai entitas lain):** dialog **tetap terbuka** + pesan merah inline menjelaskan
  *kenapa* (mis. "Tidak bisa dihapus: dipakai oleh 4 Grade") — pakai reason Backend bila ada,
  JANGAN toast generik.
- **Sukses** → dialog tutup + toast sukses + refetch tabel.

---

## 11. Tree entities — flat table + parent picker (CONTEXT §Tree entities / §Parent picker)

`organisasi` & `jabatan` self-referencing (`parentId`), tapi Backend serve **flat list +
`parentId`** (tanpa endpoint tree-traversal).

- **List page pakai `<DataTable>` sama** — tanpa widget tree. Hierarki = kolom **"Parent"**
  (nama parent, di-resolve dari `parentId` via cache `/list`) + **filter per-parent** via
  toolbar combobox.
- **Parent picker (di form)** = **Combobox sama**, opsi **flat dengan path/indent**.
  **Cegah cycle client-side sebelum submit:** saat edit node, **node itu + semua turunannya
  di-disable** (client hitung subtree dari payload `/list` ter-cache) → tak bisa reparent ke
  anak sendiri. Saat **create** node belum punya turunan → semua opsi valid + pilihan
  "**Tanpa parent (root)**". Backend tetap validasi cycle (defense-in-depth).
