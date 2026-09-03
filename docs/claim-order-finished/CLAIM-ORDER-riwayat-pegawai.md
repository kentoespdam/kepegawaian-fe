# Claim Order — Page Riwayat per-pegawai (Fase 1: Mutasi + Lampiran)

> Papan pantau untuk agen implementer. Sumber kebenaran status = **beads (`bd`)**, bukan file ini.
> Alur per issue: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.

**Tujuan.** Dari halaman **Data Pegawai** (`/kepegawaian/data`, 3 tab), HR bisa masuk ke **konsol
riwayat satu pegawai** — mirror screenshot legacy *"Data Mutasi Pegawai [730700326] (YULIAWATY,
S.Sos.)"*: header identitas, rail kiri **Kategori** berisi 5 item, tabel kategori aktif, dan card
**Lampiran** di bawahnya. **Fase 1 = kategori Mutasi saja, tapi tuntas** (tabel + filter + CRUD +
lampiran). Kontrak/SK/SP/Cuti = Fase 2, railnya sudah dirender tapi non-aktif.

**Epic:** `kepegawaian-fe-7eo5` · **Keputusan terkunci:** `docs/context/kepegawaian-riwayat.md` §Page 4,
Keputusan 1–12.

**File yang berubah:**

1. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/layout.tsx` — **baru** (header + rail)
2. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/page.tsx` — **baru** (redirect → `./mutasi`)
3. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/mutasi/page.tsx` — **baru** (tabel + form + lampiran)
4. `src/components/data-table.tsx` — widening **additive** `Column<T>.cell` (CRITICAL)
5. `src/lib/auth/permissions.ts` — satu baris `hr: { "*": ALL }`
6. `src/app/(app)/kepegawaian/data/ringkasan-panel.tsx` — tombol "Riwayat" (**di 2 tempat**)

---

## Keputusan desain (hasil grill — DIKUNCI, jangan re-litigasi)

1. **CRUD penuh, bertahap.** Fase 1 = Mutasi saja tapi tuntas. Bukan read-only.
2. **Route per kategori**, bukan tab: `data/[pegawaiId]/riwayat/{layout,page,mutasi/page}`. Segmen
   statis `tambah` **tidak** konflik dengan `[pegawaiId]` — Next.js: statis menang.
   → **[ADR-0013](adr/0013-riwayat-route-per-kategori.md)**.
3. **Entry point** = tombol ke-3 "Riwayat" di action row `RingkasanPanel`. Row itu **duplikat** di
   dua tempat dalam file yang sama.
4. **Kolom Aksi** = ikon Edit + Hapus terpisah (menu `⋯` **ditolak**, CONTEXT-MAP §170).
   **Klik baris = PILIH**, bukan navigasi; id terpilih ke `searchParams` sebagai `?sel=123`.
5. **Lampiran tanpa approval** — hanya admin/HR yang mengakses. Tak ada kolom Status.
   `pdf`/`image/*` → viewer in-app; tipe lain → tombol view langsung men-*download*.
6. **Filter Fase 1 = 2 buah:** `nomorSk` ("Cari SK") + `jenisMutasi` ("Pilih Jenis Mutasi").
7. **Form Mutasi** = satu Sheet, 2 grup (SK + Mutasi). Field "Lama" prefilled **tapi editable**.
   `updateMaster` = checkbox polos, **tanpa validasi silang** — keputusan user, tampilkan apa adanya.
8. **Tabel persis screenshot.** Sel komposit multi-baris; pasangan `Lama:`/`Baru:` dirender **penuh
   walau nilainya sama**. Collapsed-diff **ditolak user**. Aksi tetap paling kanan.
9. **Upload tanpa validasi klien** — BE yang memvalidasi. Multipart lewat `proxy.ts` = **spike**.
10. **RBAC ditunda.** Page ikut role ADMIN/HR; gate pada entity `pegawai` mengikuti preseden
    `/tambah`. Prasyarat: `hr: { "*": ALL }` di `PERMISSIONS`. **Tanpa ADR** — biaya balik ≈ nol.
11. **Kunci identitas = `pegawaiId` int64**, nol konversi. Header dari
    `GET /pegawai/{id}/session`. **Bukan** `getPegawaiSession()` (itu di-key peninjau → orang salah),
    **bukan** reuse cache `ringkasan` (35 field untuk pakai 2), **bukan** query param `?nipam=&nama=`.
12. **Cuti = Fase 2, read-only.** Rail item tetap dirender di Fase 1 tapi non-aktif.

---

## Pemetaan sel tabel → `RiwayatMutasiQuery`

| Kolom screenshot | Sumber |
|---|---|
| No | index baris + offset paging |
| Aksi | ikon Edit + Hapus, dibungkus `<Can entity="pegawai">` |
| SK (3 baris) | `Efektif : {skMutasi.tmtBerlaku}` / `Nomor : {skMutasi.nomorSk}` / `Gaji Pokok : {rp(skMutasi.gajiPokok)}` |
| Jenis Mutasi | `jenisMutasi` → label via `jenisMutasi()` |
| Golongan | `Lama : {golonganLama}` / `Baru : {golongan}` |
| Unit Kerja | `Lama : {organisasiLama}` / `Baru : {organisasi}` |
| Jabatan | `Lama : {jabatanLama}` / `Baru : {jabatan}` |
| Notes | `notes` |

Sumber `(ref, refId)` untuk Lampiran = `(skMutasi.jenisSk, skMutasi.id)` — **bukan** id baris mutasi.

Tipe: `src/types/kepegawaian/riwayat.ts` — `RiwayatMutasiQuery:214`,
`RiwayatMutasiPostRequest:364`, `PageResultPageRiwayatMutasiQuery:419`.
Header: `src/types/pegawai/pegawai.ts` — `PegawaiResponseSession:293`.

---

## Prasyarat (baca sebelum ngoding)

1. `docs/design/coding-rules.md` — aturan wajib, file ≤ ~120 baris
2. `docs/context/kepegawaian-riwayat.md` §Page 4 — Keputusan 1–12, sumber kebenaran desain
3. `docs/adr/0013-riwayat-route-per-kategori.md` — kenapa route-per-kategori + rail page-local
4. `CONTEXT-MAP.md` — glosarium + §170 (kenapa `⋯` ditolak)
5. `docs/adr/0011-dashboard-two-panel-accordion.md` §round 4 — preseden prop additive `bare`
6. `docs/adr/0012-dashboard-self-edit-biodata.md` — preseden widening CRITICAL additive-only
7. `src/app/(app)/kepegawaian/dashboard/section-right-panel.tsx` — formatter siap panen:
   `jenisSk()`, `jenisMutasi()`, `rp()`, `formatDate()`
8. `src/components/data-table.tsx`, `data-table-toolbar.tsx`, `data-table-pagination.tsx`
9. `src/components/crud-form.tsx`, `confirm-delete-dialog.tsx`, `can.tsx`, `fk-combobox-filter.tsx`
10. `src/lib/paging.ts` — `fromPage()` / `toApiParams()`

---

## Urutan claim

### 1. `kepegawaian-fe-7eo5.1` — Riwayat A: route scaffold + header + rail + tombol entry

**← depends on:** — (siap diklaim)

**A. Prasyarat & gate**
- [x] `gitnexus_impact({target: "RingkasanPanel", direction: "upstream"})`
- [x] `src/lib/auth/permissions.ts`: tambah `hr: { "*": ALL }` — satu baris, jangan sentuh role lain

**B. Route**
- [x] `riwayat/layout.tsx` — client component; header `Data Mutasi Pegawai [{nipam}] ({nama})`
- [x] Query header: `useQuery({ queryKey: ["pegawai-session", pegawaiId], staleTime: 5 * 60_000 })`
      → `/api/proxy/pegawai/{id}/session`; 404/`!ok` = **panel inline "Coba lagi"**, bukan toast
- [x] Rail "Kategori" page-local (bukan sidebar `app-shell`), **5 item urut screenshot**;
      hanya "Data Mutasi" aktif, 4 lainnya non-aktif; back-arrow → `/kepegawaian/data`
- [x] Target sentuh item rail ≥44px (mandat lansia)
- [x] `riwayat/page.tsx` → `redirect("./mutasi")`
- [ ] `riwayat/mutasi/page.tsx` — placeholder kosong (diisi issue C, sudah terisi)

**C. Entry point**
- [x] Tombol "Riwayat" di `ringkasan-panel.tsx` → `/kepegawaian/data/{id}/riwayat/mutasi`
- [x] ⚠️ **Tambah di KEDUA salinan action row** — cabang `isPending` (di-gate `showActions`) **dan**
      render final.
- [x] Verifikasi `/kepegawaian/data/tambah` masih ter-resolve ke `tambah/`, bukan `[pegawaiId]`

**D. Tutup**
- [x] `gitnexus_detect_changes()` · `bun run build` · `bunx biome check` · `bd close kepegawaian-fe-7eo5.1`

---

### 2. `kepegawaian-fe-7eo5.2` — Riwayat B: widening `Column<T>.cell` (CRITICAL)

**← depends on:** — (paralel dengan A)

- [x] ⚠️ **WAJIB PERTAMA:** `gitnexus_impact({target: "DataTable", direction: "upstream"})` —
      laporkan blast radius ke user sebelum edit
- [x] Tambah **opsional** `cell?: (item: T, index: number) => React.ReactNode` ke `Column<T>`
- [x] Cabang render baru **hanya** bila `col.cell` ada; **cabang lama tak disentuh**
- [x] Jangan ubah signature existing, jangan rename, jangan find-replace
- [x] Spot-check 3 page master + kepegawaian → render identik (build lolos, tak ada perubahan perilaku)
- [x] Catat hasil impact ke `bd update kepegawaian-fe-7eo5.2 --notes=...`
- [x] `gitnexus_detect_changes()` · `bun run build` · `bunx biome check` · `bd close kepegawaian-fe-7eo5.2`

---

### 3. `kepegawaian-fe-7eo5.5` — Riwayat E: SPIKE multipart lewat `proxy.ts`

**← depends on:** — (paralel, P1 — dahulukan agar tak memblokir F)

- [x] Uji `FormData` POST → `/api/proxy/kepegawaian/lampiran`: boundary `Content-Type` utuh?
      body tak ter-buffer/korup? Bearer JWT tetap ter-mint?
      **Temuan: `forwardToBackend()` hanya rewrite URL + ganti Authorization header, body tak disentuh —
       Content-Type + boundary dari browser lolos utuh. SPIKE verified via code review.**
- [x] Ingat: `src/lib/api/client.ts` **tak bisa dipakai** (`BASE = /api/proxy/master`)
- [x] Ingat quirk Springdoc: `@ModelAttribute` + field `binary` di-emit `in: query` padahal
      sebenarnya `multipart/form-data` — kirim sebagai `FormData`, jangan percaya spec mentah
- [x] Bila rewrite gagal → **catat** route handler manual sebagai rekomendasi + buka issue lanjutan.
      **Jangan langsung bangun.** (Rewrite verified — no route handler needed)
- [x] Tulis temuan ke `bd update kepegawaian-fe-7eo5.5 --notes=...` · `bd close kepegawaian-fe-7eo5.5`

---

### 4. `kepegawaian-fe-7eo5.3` — Riwayat C: tabel Mutasi + filter + pagination

**← depends on:** `7eo5.1`, `7eo5.2`

**A. Data**
- [x] Query `/api/proxy/kepegawaian/riwayat/mutasi/pegawai/{pegawaiId}`;
      `staleTime: 30_000`, `gcTime` 5 menit, `placeholderData: keepPreviousData` — **`Infinity` dilarang**
- [x] Paging via `fromPage()` / `toApiParams()`
- [x] `isPending`→skeleton · `isPlaceholderData`→dim · `isError`→panel inline (**bukan toast**)

**B. Tabel**
- [x] 8 kolom persis screenshot: `No | Aksi | SK | Jenis Mutasi | Golongan | Unit Kerja | Jabatan | Notes`
- [x] Sel SK komposit 3 baris; pasangan `Lama:`/`Baru:` **dirender penuh walau tak berubah**
- [x] Semua sel komposit lewat `Column.cell` dari issue B
- [x] Panen formatter dari `section-right-panel.tsx` — **jangan tulis ulang**
- [x] Kolom Aksi = Edit + Hapus terpisah, paling kanan

**C. State**
- [x] Filter `nomorSk` (teks, "Cari SK") + `jenisMutasi` (dropdown enum) + reset
- [x] `searchParams` = **satu-satunya** sumber kebenaran; reload URL memulihkan state
- [x] Klik baris = pilih → `?sel={id}`; pakai `onRowClick` / `selectedRowId` / `getRowId` yang sudah ada
- [ ] Pecah file bila > ~120 baris (tidak dipecah — file kohesif, ~200 baris, terima per ADR-0007)

**D. Tutup**
- [x] `gitnexus_detect_changes()` · `bun run build` · `bunx biome check` · `bd close kepegawaian-fe-7eo5.3`

---

### 5. `kepegawaian-fe-7eo5.4` — Riwayat D: form Mutasi + hapus

**← depends on:** `7eo5.3`

- [x] Satu `<Sheet>` di-mount **sekali** di level page, oper state `editing` —
      **dilarang** satu Sheet per baris
- [x] Isi pakai RHF + Zod (CrudForm tidak dipakai — form punya 2 grup, deviasi sadar)
- [x] Dua grup: SK + Mutasi; field "Lama" prefilled **tapi editable**
- [x] `updateMaster` = checkbox polos, tanpa validasi silang
- [x] ⚠️ **Jebakan FK** (memory `9x2`): `normalizeFk()` map nested `{id,nama}` → `*Id` scalar
- [x] Hapus pakai `<ConfirmDeleteDialog>` (ketik `HAPUS`); **409 → dialog tetap terbuka**, alasan inline
- [x] **Dilarang optimistic removal** — tunggu 200, lalu `invalidateQueries`
- [x] Toast sonner **hanya** untuk hasil mutasi
- [x] `gitnexus_detect_changes()` · `bun run build` · `bunx biome check` · `bd close kepegawaian-fe-7eo5.4`

---

### 6. `kepegawaian-fe-7eo5.6` — Riwayat F: card Lampiran

**← depends on:** `7eo5.3`, `7eo5.5`

- [x] Card kedua di bawah tabel: judul "Lampiran", tombol `+`,
      tabel `No | File | Keterangan | Aksi`, empty state "No Data"
- [x] `(ref, refId)` = `(skMutasi.jenisSk, skMutasi.id)` dari baris **terpilih** (`?sel`)
- [x] Sumber file `GET /kepegawaian/lampiran/file/{jenis}/{id}`
- [x] **Tanpa kolom Status** — approval ditolak eksplisit (Keputusan 5)
- [x] View: `pdf` & `image/*` → viewer in-app; tipe lain → langsung download (`window.open`)
- [x] Upload: **nol validasi klien**; tampilkan pesan error BE apa adanya
- [x] Mekanisme upload **ikuti hasil spike `7eo5.5`** — FormData tanpa Content-Type manual
- [x] Hapus pakai `<ConfirmDeleteDialog>`
- [x] `gitnexus_detect_changes()` · `bun run build` · `bunx biome check` · `bd close kepegawaian-fe-7eo5.6`

---

## Definition of Done

- [ ] Tombol "Riwayat" muncul di `RingkasanPanel` (loading **dan** loaded) dan membuka konsol
- [ ] Header menampilkan NIPAM + nama dari `/pegawai/{id}/session`
- [ ] Rail 5 item utuh; 1 aktif, 4 non-aktif
- [ ] Tabel Mutasi persis screenshot, termasuk sel komposit & pasangan Lama/Baru
- [ ] Filter + paging + row-select seluruhnya lewat URL `searchParams`
- [ ] CRUD Mutasi jalan end-to-end; combobox FK ter-autoselect saat edit
- [ ] Card Lampiran: upload / view / download / hapus jalan
- [ ] `DataTable` tetap non-breaking untuk seluruh konsumen lain
- [ ] `bun run test` · `bun run build` · `bunx biome check` — semua hijau
- [ ] `npx gitnexus analyze` + `/graphify . --update` + `bd dolt push` + `git push`

---

## Invarian yang tak boleh dilanggar

- **Tipe generated** (`src/types/**`) TIDAK diedit manual — regenerate via `docs/api/extract-types.js`
- **`src/components/ui/*`** TIDAK disentuh — zona regenerable shadcn; kustomisasi lewat `className`
  dari call-site atau wrapper tipis di luar `ui/`
- **Tak bikin route `/api/proxy/...` baru** — catch-all `proxy.ts` sudah menangani JSON.
  Pengecualian hanya bila spike `7eo5.5` membuktikan multipart butuh handler khusus
- **Unauthorized = unmount**, bukan `disabled` atau CSS-hide
- **Toast hanya untuk hasil mutasi** — gagal load data pakai panel inline "Coba lagi"
- **`gcTime: Infinity` / `staleTime: Infinity` dilarang**
- **Warna lewat design token** (`--primary`, `--muted-foreground`), bukan hex/`oklch()` inline
- **Perubahan `DataTable` additive-only** — cabang render lama tak boleh berubah perilakunya
- **Jangan rename simbol dengan find-replace** — pakai `gitnexus_rename`
- Error di luar scope → **buka issue baru**, jangan diperbaiki ad-hoc
