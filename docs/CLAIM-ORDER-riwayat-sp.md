# Claim Order — Riwayat Surat Peringatan (Fase 2)

> Papan pantau untuk agen implementer. Sumber kebenaran status = **beads (`bd`)**, bukan file ini.
> Alur per issue: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.

**Tujuan.** Tambah halaman **Riwayat Surat Peringatan** (`/kepegawaian/data/{id}/riwayat/sp`) ke
konsol riwayat pegawai yang sudah ada. Full CRUD (tabel + filter + form Sheet + hapus).
File SP ditangani inline per baris (bukan LampiranCard). Fase 2 dari epic riwayat.

**Keputusan terkunci:** `docs/context/kepegawaian-riwayat-sp.md` §K-SP1–K-SP7.
Jangan re-litigasi.

**File yang berubah:**

1. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/layout.tsx` — aktifkan SP di rail + tambah PAGE_TITLES entry
2. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/sp/page.tsx` — **baru** (tabel + viewer file)
3. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/sp/sp-form-sheet.tsx` — **baru** (form multipart + cascade)

---

## Keputusan desain (hasil grill — DIKUNCI, jangan re-litigasi)

1. **Kolom tabel:** `No | Nomor SP | Jenis SP | Tgl SP | Sanksi | Tgl Mulai | Tgl Selesai | Notes | File | Aksi`
2. **File handling:** kolom File = ikon viewer bersyarat per baris. **Tidak ada LampiranCard.** Endpoint: `GET /riwayat/sp/{id}/file`
3. **Filter:** `nomorSp` (text) + `jenisSpId` (combobox fetch `/master/jenis-sp/list`). Tidak ada filter hardcoded.
4. **Cascade form:** pilih Jenis SP → `GET /master/sanksi/jenis-sp/{jenisSpId}` → populate Sanksi. Sanksi disabled sebelum Jenis SP dipilih.
5. **Edit file:** `fileName` tidak dikirim → BE pertahankan file lama. File baru → replace.
6. **Klik baris = no-op.** Tidak ada `onRowClick`, tidak ada `?sel=`. Aksi hanya lewat kolom Aksi + kolom File.
7. **Content-type: `multipart/form-data`** untuk POST dan PUT — gunakan `FormData`, bukan `JSON.stringify`. Jangan pakai `src/lib/api/client.ts`.

---

## Pemetaan sel tabel → `RiwayatSpQuery`

| Kolom | Sumber |
|---|---|
| No | `(page-1) * size + i + 1` via `cell(item, i)` pattern |
| Nomor SP | `row.nomorSp` |
| Jenis SP | `row.jenisSp?.keterangan ?? "—"` |
| Tgl SP | `formatDate(row.tanggalSp)` |
| Sanksi | `row.sanksi?.keterangan ?? "—"` |
| Tgl Mulai | `formatDate(row.tanggalMulai)` |
| Tgl Selesai | `formatDate(row.tanggalSelesai)` |
| Notes | `row.notes ?? "—"` |
| File | ikon bersyarat: `row.fileName` ada? → tombol viewer/unduh. Lihat K-SP2 |

**Tipe:** `src/types/kepegawaian/riwayat.ts`
- Query: `RiwayatSpQuery` (L151) — field `jenisSp: JenisSpMiniResponse`, `sanksi: SanksiMiniResponse`, `fileName`, `mimeType`
- Post: `RiwayatSpPostRequest` (L325) — required: `nomorSp`, `pegawaiId`, `organisasiId`, `jabatanId`, `tanggalSp`, `jenisSpId`, `sanksiId`, `tanggalMulai`, `tanggalSelesai`, `penandaTangan`, `jabatanPenandaTangan`
- Put: `RiwayatSpPutRequest` (L177) — required: sama
- Page: `PageResultPageRiwayatSpQuery` (L413)

**Endpoint CRUD:**
- List: `GET    /kepegawaian/riwayat/sp/pegawai/{pegawaiId}` — filter: `nomorSp`, `jenisSpId`
- Detail: `GET   /kepegawaian/riwayat/sp/{id}`
- Create: `POST  /kepegawaian/riwayat/sp` — **multipart/form-data**
- Update: `PUT   /kepegawaian/riwayat/sp/{id}` — **multipart/form-data**
- Delete: `DELETE /kepegawaian/riwayat/sp/{id}`
- File:   `GET   /kepegawaian/riwayat/sp/{id}/file`

---

## Prasyarat (baca sebelum ngoding)

1. `docs/context/kepegawaian-riwayat-sp.md` — **keputusan SP-1 s.d. SP-7** (baca semua)
2. `docs/context/kepegawaian-riwayat.md` §K1–K12 — shared infra: RBAC, pola filter URL, header
3. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/sk/page.tsx` — template tabel (mirip, tanpa LampiranCard)
4. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/sk/sk-form-sheet.tsx` — template form Sheet
5. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/layout.tsx` — rail SP harus diaktifkan di sini
6. `src/components/lampiran-card.tsx` — **tidak dipakai** di SP, tapi baca untuk memahami perbedaan pola file

---

## Urutan claim

### 1. `kepegawaian-fe-rmwi` — SP A: `tabel + filter + rail activation`

**← depends on:** — (siap diklaim, Fase 1 + SK sudah selesai)

**A. Layout**
- [x] Update `riwayat/layout.tsx`:
  - Rail item `sp`: ubah `href: "#"` → `href: "./sp"`, `active: false` → `active: true`, hapus `soon: true`
  - Tambah `sp: "Riwayat Surat Peringatan"` ke `PAGE_TITLES`

**B. Route**
- [x] Buat `riwayat/sp/page.tsx` — `"use client"`
- [x] Query: `GET /kepegawaian/riwayat/sp/pegawai/{pegawaiId}` — `staleTime: 30_000`, `placeholderData: keepPreviousData`
- [x] Paging via `fromPage()` / `toApiParams()`
- [x] `isPending` → skeleton · `isPlaceholderData` → dim · `isError` → panel inline

**C. Tabel**
- [x] 9 kolom data + Aksi (K-SP1) — copy struktur `SK_COLUMNS`, sesuaikan field
- [x] Kolom `No` pakai `cell(item, i)` pattern — offset paging
- [x] Kolom `File`:
  - `row.fileName` ada → render tombol ikon (mis. `<FileText />` dari lucide)
  - `onClick`: baca `row.mimeType` → `application/pdf` / `image/*` → buka `window.open(url, "_blank")` · lain-lain → trigger unduh via `<a href download>`
  - URL: `/api/proxy/kepegawaian/riwayat/sp/${row.id}/file`
  - `row.fileName` null → render `"—"`
- [x] **Tidak ada** `onRowClick`, tidak ada `selectedRowId`, tidak ada `?sel=`

**D. Toolbar**
- [x] `nomorSp` → `<DataTableToolbar searchFields=[{name:"nomorSp", label:"Nomor SP"}]>`
- [x] `jenisSpId` → combobox fetch `/api/proxy/master/jenis-sp/list`
  - Gunakan pola `useFkOptions` atau fetch manual — **bukan** hardcoded
  - Value: `item.id` (integer, kirim ke BE sebagai string query param)
  - Label: `item.nama` (sesuai tipe `JenisSpMiniResponse`)
- [x] Reset + Tambah SP di kanan
- [x] `hasActive = !!(nomorSp || jenisSpId)`

**E. Tutup**
- [x] `bun run build` · `bunx biome check` · ✅ ~~`bd close kepegawaian-fe-rmwi`~~ **✅ Closed**

---

### 2. `kepegawaian-fe-i4v9` — SP B: `form Sheet (multipart) + hapus`

**← depends on:** `kepegawaian-fe-rmwi` selesai ✅

**A. Form Sheet**
- [x] Buat `riwayat/sp/sp-form-sheet.tsx` — `"use client"`
- [x] Pakai RHF + Zod (`zodResolver`) — pola identik form SK, **tapi fetch via FormData**
- [x] Zod schema required: `nomorSp`, `jenisSpId`, `sanksiId`, `tanggalSp`, `tanggalMulai`, `tanggalSelesai`, `organisasiId`, `jabatanId`, `penandaTangan`, `jabatanPenandaTangan`
- [x] Field 1: `nomorSp` = `<FieldText>`
- [x] Field 2: `jenisSpId` = combobox fetch `/master/jenis-sp/list` (value: id, label: nama)
  - `onChange`: reset `sanksiId` ke undefined
- [x] Field 3: `sanksiId` = combobox fetch `/master/sanksi/jenis-sp/{jenisSpId}` (cascade)
  - **disabled** jika `jenisSpId` belum dipilih
  - Re-fetch ketika `jenisSpId` berubah
  - Value: `item.id`, Label: `item.keterangan`
- [x] Field 4–6: `tanggalSp`, `tanggalMulai`, `tanggalSelesai` = date picker (3-col grid)
- [x] Field 7: `organisasiId` = `<FieldFk>` via `/master/organisasi/list`
- [x] Field 8: `jabatanId` = `<FieldFk>` via `/master/jabatan/list`
- [x] Field 9–10: `penandaTangan`, `jabatanPenandaTangan` = `<FieldText>` (2-col grid)
- [x] Field 11: `sanksiNotes` = `<FieldText>` (opsional)
- [x] Field 12: `tanggalEksekusiSanksi` = date picker (opsional)
- [x] Field 13: **File SP** — `<input type="file">` opsional
  - Pada Edit: tampilkan nama file lama (`detailQuery.data.fileName`) sebagai label di atas input
  - `ref` via `useRef<HTMLInputElement>`
- [x] Field 14: `notes` = `<FieldTextarea>` (opsional)
- [x] Mount Sheet **sekali** di level page — tidak ada Sheet per baris

**B. Submit logic — WAJIB: multipart/form-data**
- [x] Gunakan `FormData` — **bukan** `JSON.stringify`
- [x] POST: `fetch("/api/proxy/kepegawaian/riwayat/sp", { method: "POST", body: fd })`
- [x] PUT: `fetch("/api/proxy/kepegawaian/riwayat/sp/${editingId}", { method: "PUT", body: fd })`
- [x] Sukses → `toast.success(...)` + `qc.invalidateQueries(["riwayat-sp", pegawaiId])` + close Sheet
- [x] Error BE → `setError("root", { message: ... })` — **bukan** toast
- [x] Dialog tetap terbuka saat error (konsisten K9 shared infra)

**C. Prefill Edit**
- [x] Pada edit: fetch `GET /kepegawaian/riwayat/sp/{editingId}` → `SingleResultRiwayatSpQuery`
- [x] Prefill semua field termasuk `jenisSpId` + trigger fetch sanksi cascade
- [x] Tampilkan `detailQuery.data.fileName` sebagai label informatif di atas input file

**D. Hapus**
- [x] `<ConfirmDeleteDialog>` — `DELETE /kepegawaian/riwayat/sp/{id}`
- [x] 409 → dialog tetap terbuka, alasan inline
- [x] Tidak ada optimistic removal — tunggu 200, lalu `invalidateQueries`

**E. Tutup**
- [x] `bun run build` · `bunx biome check` · ✅ ~~`bd close kepegawaian-fe-i4v9`~~ **✅ Closed**

---

## Definition of Done

- [ ] Rail item "Riwayat Surat Peringatan" aktif (bukan non-aktif / "Segera") dan ter-navigate ke `/riwayat/sp`
- [ ] `PAGE_TITLES.sp` ada di layout → header menampilkan `"Riwayat Surat Peringatan — [NIPAM] (Nama)"`
- [ ] Tabel SP: 9 kolom data + kolom File + Aksi
- [ ] Kolom File: viewer/unduh bersyarat per mimeType; `"—"` jika tidak ada file
- [ ] Filter + paging seluruhnya lewat URL `searchParams`; tidak ada `?sel=`
- [ ] CRUD SP jalan end-to-end via `multipart/form-data`
- [ ] Cascade Jenis SP → Sanksi: sanksi disabled sebelum jenis SP dipilih, re-fetch saat ganti
- [ ] Form Edit: nama file lama tampil, file baru opsional
- [ ] `bun run test` · `bun run build` · `bunx biome check` — semua hijau
- [ ] `npx gitnexus analyze` + `/graphify . --update` + `bd dolt push` + `git push`

---

## Invarian yang tak boleh dilanggar

- **Tipe generated** (`src/types/**`) TIDAK diedit manual
- **`src/components/ui/*`** TIDAK disentuh — zona regenerable shadcn
- **Unauthorized = unmount** (`null`), bukan `disabled` atau CSS-hide
- **Toast hanya untuk hasil mutasi** — gagal load pakai panel inline "Coba lagi"
- **`gcTime: Infinity` / `staleTime: Infinity` dilarang**
- **Warna lewat design token** (`--primary`, `--muted-foreground`), bukan hex/`oklch()` inline
- **Jangan rename simbol dengan find-replace** — pakai `gitnexus_rename`
- **Jangan pakai `src/lib/api/client.ts`** untuk mutasi SP — gunakan `fetch` langsung dengan `FormData`
- Error di luar scope → **buka issue baru**, jangan diperbaiki ad-hoc
