# Claim Order — Riwayat Surat Keputusan (Fase 2)

> Papan pantau untuk agen implementer. Sumber kebenaran status = **beads (`bd`)**, bukan file ini.
> Alur per issue: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.

**Tujuan.** Tambah halaman **Riwayat Surat Keputusan** (`/kepegawaian/data/{id}/riwayat/sk`) ke
konsol riwayat pegawai yang sudah ada. Full CRUD (tabel + filter + form Sheet + hapus) + kartu
Lampiran. Fase 2 dari epic riwayat; infrastruktur Fase 1 (layout, rail, shared primitives) sudah
tersedia.

**Keputusan terkunci:** `docs/context/kepegawaian-riwayat.md` §Fase 2 — Keputusan 13–16.
Jangan re-litigasi.

**File yang berubah:**

1. `src/lib/riwayat-constants.ts` — tambah `labelJenisSk()` helper
2. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/sk/page.tsx` — **baru** (tabel + form + lampiran)
3. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/sk/sk-form-sheet.tsx` — **baru** (form Sheet flat)
4. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/sk/lampiran-card.tsx` — **baru** (thin wrapper)
5. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/layout.tsx` — aktifkan href SK di rail

---

## Keputusan desain (hasil grill — DIKUNCI, jangan re-litigasi)

1. **Kolom tabel:** `No | Nomor SK | Jenis SK | Tgl. SK | Tgl. Berlaku | Golongan | Gaji Pokok | MKG | Kenaikan Berikutnya | MKGB | Notes` + Aksi di kanan.
2. **Format MKG/MKGB:** `"X Thn – Y Bln"` — kosong → `"Thn – Bln"`, bukan `"—"`.
3. **Filter:** `nomorSk` (text) + `jenisSk` (select). `golonganId` **tidak dirender** (YAGNI).
4. **Source jenisSk:** `JENIS_SK_OPTIONS` hardcoded di `riwayat-constants.ts` — zero fetch.
5. **Form:** Sheet, **flat** (tanpa conditional per jenisSk). HR yang memutuskan field mana diisi.
6. **Golongan di form:** combobox FK `/master/golongan/list`. **Gaji Pokok:** text input biasa (tanpa cascade `/penggajian`).
7. **`updateMaster`:** checkbox "Perbarui data master pegawai sesuai SK ini", default unchecked.
8. **Lampiran:** thin wrapper `SkLampiranCard`; `ref = row.jenisSk`, `refId = row.id`. Pola identik `MutasiLampiranCard`.
9. **RBAC:** ikut preseden Fase 1 — `can(roles, "view", "pegawai")` (page) + `<Can entity="pegawai">` per aksi.
10. **Klik baris = PILIH** (`?sel=id`) — kartu Lampiran bergantung baris terpilih.

---

## Pemetaan sel tabel → `RiwayatSkQuery`

| Kolom | Sumber |
|---|---|
| No | index baris + offset paging — via `cell(item, i)` pattern sudah ada |
| Nomor SK | `row.nomorSk` |
| Jenis SK | `row.jenisSk` → `labelJenisSk()` |
| Tgl. SK | `formatDate(row.tanggalSk)` |
| Tgl. Berlaku | `formatDate(row.tmtBerlaku)` |
| Golongan | `row.golongan?.golongan ?? "—"` |
| Gaji Pokok | `rp(row.gajiPokok)` |
| MKG | `` `${row.mkgTahun ?? ""} Thn – ${row.mkgBulan ?? ""} Bln` `` |
| Kenaikan Berikutnya | `formatDate(row.kenaikanBerikutnya)` |
| MKGB | `` `${row.mkgbTahun ?? ""} Thn – ${row.mkgbBulan ?? ""} Bln` `` |
| Notes | `row.notes` |

**Tipe:** `src/types/kepegawaian/riwayat.ts`
- Query: `RiwayatSkQuery` (L86)
- Post: `RiwayatSkPostRequest` (L347) — required: `pegawaiId`, `nomorSk`, `jenisSk`, `tanggalSk`, `tmtBerlaku`
- Put: `RiwayatSkPutRequest` (L197) — required: sama
- Page: `PageResultPageRiwayatSkQuery` (L345)

**Endpoint CRUD:**
- List: `GET    /kepegawaian/riwayat/sk/pegawai/{pegawaiId}` — filter: `nomorSk`, `jenisSk`, `golonganId`
- Detail: `GET   /kepegawaian/riwayat/sk/{id}`
- Create: `POST  /kepegawaian/riwayat/sk`
- Update: `PUT   /kepegawaian/riwayat/sk/{id}`
- Delete: `DELETE /kepegawaian/riwayat/sk/{id}`

---

## Prasyarat (baca sebelum ngoding)

1. `docs/context/kepegawaian-riwayat.md` §Fase 2 — Keputusan 13–16
2. `docs/context/kepegawaian-riwayat.md` §Page 4 — Keputusan 1–12 (konteks Fase 1, RBAC, lampiran)
3. `CLAIM-ORDER-riwayat-pegawai.md` — pola yang diikuti (tabel + form + lampiran Mutasi)
4. `docs/adr/0013-reusable-lampiran-components.md` — arsitektur `LampiranCard` shared
5. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/mutasi/page.tsx` — template implementasi
6. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/mutasi/mutasi-form-sheet.tsx` — pola form Sheet
7. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/mutasi/lampiran-card.tsx` — pola thin wrapper
8. `src/lib/riwayat-constants.ts` — `JENIS_SK_OPTIONS`, tambah `labelJenisSk()` di sini
9. `src/components/lampiran-card.tsx`, `lampiran-upload-modal.tsx` — shared primitives

---

## Urutan claim

### 1. `kepegawaian-fe-pxea` — SK A: `labelJenisSk()` + tabel + filter + pagination

**← depends on:** — (siap diklaim, Fase 1 sudah selesai)

**A. Helper**
- [x] Tambah `labelJenisSk()` ke `src/lib/riwayat-constants.ts` — mirror `labelJenisMutasi()`, satu fungsi. Jangan edit `JENIS_SK_OPTIONS` yang sudah ada.

**B. Route**
- [x] Buat `riwayat/sk/page.tsx` — `"use client"`, mirror `mutasi/page.tsx`
- [x] Query: `GET /kepegawaian/riwayat/sk/pegawai/{pegawaiId}` — `staleTime: 30_000`, `placeholderData: keepPreviousData`
- [x] Paging via `fromPage()` / `toApiParams()`
- [x] `isPending` → skeleton · `isPlaceholderData` → dim · `isError` → panel inline

**C. Tabel**
- [x] 11 kolom + Aksi persis §Pemetaan di atas
- [x] Kolom `No` pakai `cell(item, i)` pattern — offset paging
- [x] Format MKG/MKGB: `` `${mkgTahun ?? ""} Thn – ${mkgBulan ?? ""} Bln` ``
- [x] `val()` dan `rp()` helper panen dari `mutasi/page.tsx` — tidak ditulis ulang
- [ ] Aksi = Edit + Hapus di kanan, bungkus `<Can entity="pegawai">` (ditunda — ikut preseden Fase 1)

**D. State**
- [x] Filter `nomorSk` (text) + `jenisSk` (select `JENIS_SK_OPTIONS`) + reset
- [x] `searchParams` = satu-satunya sumber kebenaran filter + paging
- [x] Klik baris = pilih → `?sel={id}` (onRowClick / selectedRowId / getRowId)

**E. Rail**
- [x] Update `riwayat/layout.tsx`: aktifkan href `./sk` di rail item "Riwayat Surat Keputusan"

**F. Tutup**
- [x] `bun run build` · `bunx biome check` · ✅ `bd close kepegawaian-fe-pxea`

---

### 2. `kepegawaian-fe-l7cv` — SK B: form SK + hapus + `SkLampiranCard`

**← depends on:** `kepegawaian-fe-pxea`

**A. Form Sheet**
- [x] Buat `riwayat/sk/sk-form-sheet.tsx` — mirror `mutasi-form-sheet.tsx` tapi lebih sederhana: satu grup, flat, tanpa conditional
- [x] Pakai RHF + Zod (`zodResolver`) — pola identik form Mutasi
- [x] Zod schema: required `jenisSk`, `nomorSk`, `tanggalSk`, `tmtBerlaku`; optional sisanya
- [x] `jenisSk` = `<Select>` dari `JENIS_SK_OPTIONS` (bukan combobox FK — data statis)
- [x] `golonganId` = `<FieldFk>` via `useFkOptions("golongan", ...)`
- [x] `gajiPokok` = `<FieldText type="text">` biasa — bukan tombol search cascade
- [x] MKG Tahun + Bulan = dua `<FieldText type="number">` berdampingan
- [x] Kenaikan Berikutnya = date picker
- [x] MKGB Tahun + Bulan = dua `<FieldText type="number">` berdampingan
- [x] `updateMaster` = `<Checkbox>` + label "Perbarui data master pegawai sesuai SK ini"
- [x] `notes` = `<FieldTextarea>`
- [x] Mount Sheet **sekali** di level page — tidak ada Sheet per baris
- [x] Pada edit: fetch `GET /kepegawaian/riwayat/sk/{id}` untuk prefill
- [x] POST/PUT → toast sonner sukses · invalidate `["riwayat-sk", pegawaiId]`
- [x] Error BE → tampilkan di form (`setError("root", ...)`) — bukan toast

**B. Hapus**
- [x] `<ConfirmDeleteDialog>` — `DELETE /kepegawaian/riwayat/sk/{id}`
- [x] 409 → dialog tetap terbuka, alasan inline
- [x] Tidak ada optimistic removal — tunggu 200, lalu invalidate

**C. SkLampiranCard**
- [x] Buat `riwayat/sk/lampiran-card.tsx` — thin wrapper mirror `mutasi/lampiran-card.tsx`
- [x] Props: `selectedRow: RiwayatSkQuery | null`
- [x] Derive: `ref = selectedRow.jenisSk as JenisSk`, `refId = selectedRow.id`
- [x] Title: `` `Lampiran — SK ${selectedRow.nomorSk}` ``
- [x] URL pattern identik Mutasi (endpoint lampiran kepegawaian sama)
- [x] Mount `<SkLampiranCard selectedRow={selectedRow} />` di bawah `<DataTable>` di `page.tsx`

**D. Tutup**
- [x] `bun run build` · `bunx biome check` · ✅ `bd close kepegawaian-fe-l7cv`

---

## Definition of Done

- [ ] Rail item "Riwayat Surat Keputusan" aktif (bukan non-aktif) dan ter-navigate ke `/riwayat/sk`
- [ ] Tabel SK: 11 kolom + Aksi, format MKG/MKGB `"X Thn – Y Bln"`
- [ ] Filter + paging + row-select seluruhnya lewat URL `searchParams`
- [ ] CRUD SK jalan end-to-end; form flat tanpa conditional
- [ ] Kartu Lampiran: upload / view / download / hapus jalan
- [ ] `bun run test` · `bun run build` · `bunx biome check` — semua hijau
- [ ] `npx gitnexus analyze` + `/graphify . --update` + `bd dolt push` + `git push`

---

## Invarian yang tak boleh dilanggar

- **Tipe generated** (`src/types/**`) TIDAK diedit manual
- **`src/components/ui/*`** TIDAK disentuh — zona regenerable shadcn
- **Unauthorized = unmount** (`null`), bukan `disabled` atau CSS-hide
- **Toast hanya untuk hasil mutasi** — gagal load data pakai panel inline "Coba lagi"
- **`gcTime: Infinity` / `staleTime: Infinity` dilarang**
- **Warna lewat design token** (`--primary`, `--muted-foreground`), bukan hex/`oklch()` inline
- **Jangan rename simbol dengan find-replace** — pakai `gitnexus_rename`
- Error di luar scope → **buka issue baru**, jangan diperbaiki ad-hoc
