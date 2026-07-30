# Claim Order — Riwayat Kontrak Kerja

> Papan pantau untuk agen implementer. Sumber kebenaran status = **beads (`bd`)**, bukan file ini.
> Alur per issue: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.

**Tujuan.** Tambah halaman **Riwayat Kontrak Kerja** (`/kepegawaian/data/{id}/riwayat/kontrak`) ke
konsol riwayat pegawai yang sudah ada. Full CRUD (tabel + filter + form Sheet + hapus).
**Tanpa lampiran.** Jika `statusPegawai ≠ KONTRAK` → read-only (tombol aksi disembunyikan).

**Keputusan terkunci:** Hasil grill — lihat riwayat percakapan (2026-07-30).
Jangan re-litigasi.

**Prasyarat BE (BLOCKING):** `GET /pegawai/{id}/session` harus menyertakan `statusPegawai`.
Lihat `docs/BE-REQUIREMENT-riwayat-kontrak-status-pegawai.md`.

**File yang berubah:**

1. `src/lib/riwayat-constants.ts` — tambah `JENIS_AKSI_KONTRAK_OPTIONS` + `labelAksiKontrak()`
2. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/layout.tsx` — aktifkan rail item kontrak + PAGE_TITLES
3. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/kontrak/page.tsx` — **baru** (tabel + filter + read-only gate + form + hapus)
4. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/kontrak/kontrak-form-sheet.tsx` — **baru** (form Sheet)

---

## Keputusan desain (hasil grill — DIKUNCI, jangan re-litigasi)

1. **Label aksi kontrak:** `PERPANJANGAN` → "Perpanjangan Kontrak", `PENGANGKATAN` → "Pengangkatan Kontrak", `TERMINASI` → "Terminasi Kontrak".
2. **Kolom tabel:** `No | Nomor Kontrak | Jenis Aksi | Tgl. SK | Mulai | Selesai | Notes`.
3. **Filter:** `nomorKontrak` (text) saja — sesuai `RiwayatSearchParams` (tidak ada filter jenis kontrak di API).
4. **Read-only saat status ≠ KONTRAK:** Sembunyikan tombol "+ Tambah Kontrak" di toolbar + ikon Edit/Hapus di baris.
   **Tanpa banner/notice** — cukup hilangkan tombol saja.
5. **Form fields:**
   - **NIPAM & Nama:** auto-fill dari session, **tapi editable**.
   - **Nomor Kontrak:** text required.
   - **Jenis Aksi:** `<Select>` dari `JENIS_AKSI_KONTRAK_OPTIONS`.
   - **Tgl. SK:** date picker required.
   - **Tanggal Mulai:** date picker required.
   - **Tanggal Selesai:** date picker optional.
   - **Golongan:** FK combobox `/master/golongan/list`. **Hanya muncul saat CREATE dengan `PENGANGKATAN`**.
     Selain itu (EDIT / PERPANJANGAN / TERMINASI) — tidak ada field Golongan.
   - **Gaji Pokok:** number input optional.
   - **isLatest:** checkbox "Kontrak Terbaru".
   - **Notes:** textarea optional.
6. **Tidak ada lampiran** — kontrak tidak punya berkas lampiran (keputusan domain).
7. **RBAC:** ikut preseden — `can(roles, "view", "pegawai")` (page) + `<Can entity="pegawai">` per aksi.
8. **Klik baris = PILIH** (`?sel=id`) — konsisten dengan riwayat lain.

---

## Pemetaan sel tabel → `RiwayatKontrakQuery`

| Kolom | Sumber |
|---|---|
| No | index baris + offset paging — via `cell(item, i)` pattern sudah ada |
| Nomor Kontrak | `row.nomorKontrak` |
| Jenis Aksi | `row.jenisKontrak` → `labelAksiKontrak()` |
| Tgl. SK | `formatDate(row.tanggalSk)` |
| Mulai | `formatDate(row.tanggalMulai)` |
| Selesai | `formatDate(row.tanggalSelesai)` |
| Notes | `row.notes` |

**Tipe:** `src/types/kepegawaian/riwayat.ts`
- Query: `RiwayatKontrakQuery` (L267)
- Post: `RiwayatKontrakPostRequest` (L504) — required: `pegawaiId`, `nipam`, `nama`, `nomorKontrak`, `tanggalSk`, `tanggalMulai`, `golonganId`
- Put: `RiwayatKontrakPutRequest` (L460) — required: sama
- Page: `PageResultPageRiwayatKontrakQuery` (L514)

**Filter API (dari `RiwayatSearchParams`):**
- List: `GET /kepegawaian/riwayat/kontrak/pegawai/{pegawaiId}` — filter: `nomorKontrak`
- Detail: `GET /kepegawaian/riwayat/kontrak/{id}`
- Create: `POST /kepegawaian/riwayat/kontrak`
- Update: `PUT /kepegawaian/riwayat/kontrak/{id}`
- Delete: `DELETE /kepegawaian/riwayat/kontrak/{id}`

---

## Prasyarat (baca sebelum ngoding)

1. `docs/BE-REQUIREMENT-riwayat-kontrak-status-pegawai.md` — BE harus deploy dulu
2. `docs/context/kepegawaian-riwayat.md` §Page 4 — Keputusan 1–12 (shared infra, RBAC, lampiran)
3. `docs/context/kepegawaian-riwayat-kontrak.md` — konteks delta kategori kontrak
4. `CLAIM-ORDER-riwayat-sk.md` — template implementasi terbaru (tabel + form flat, tanpa lampiran)
5. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/sk/page.tsx` — template page (mirror untuk kontrak, tanpa lampiran)
6. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/sk/sk-form-sheet.tsx` — pola form Sheet
7. `src/lib/riwayat-constants.ts` — tambah `JENIS_AKSI_KONTRAK_OPTIONS` + `labelAksiKontrak()` di sini

---

## Urutan claim

### 1. Kontrak A — Label helper + Rail activation

**← depends on:** — (siap diklaim setelah BE deploy `statusPegawai` di session)

**A. Helper**
- [x] Tambah `JENIS_AKSI_KONTRAK_OPTIONS` ke `src/lib/riwayat-constants.ts`
  ```ts
  export const JENIS_AKSI_KONTRAK_OPTIONS: { value: string; label: string }[] = [
    { value: "PERPANJANGAN", label: "Perpanjangan Kontrak" },
    { value: "PENGANGKATAN", label: "Pengangkatan Kontrak" },
    { value: "TERMINASI", label: "Terminasi Kontrak" },
  ];
  ```
- [x] Tambah `labelAksiKontrak()` — mirror `labelJenisMutasi()` / `labelJenisSk()`
  ```ts
  export function labelAksiKontrak(s: unknown): string {
    if (s == null || s === "") return "—";
    return JENIS_AKSI_KONTRAK_OPTIONS.find((o) => o.value === s)?.label ?? String(s);
  }
  ```

**B. Route / Rail**
- [x] Update `riwayat/layout.tsx`:
  - Tambah `"kontrak": "Riwayat Kontrak Kerja"` ke `PAGE_TITLES`
  - Update rail item `kontrak`:
    ```ts
    { id: "kontrak", label: "Riwayat Kontrak Kerja", href: "./kontrak", active: true }
    ```
    (dari `href: "#"`, `active: false`, `soon: true`)

**C. Tutup**
- [x] `bun run test` · `bun run build` · `bunx biome check` · ✅

---

### 2. Kontrak B — Tabel + Filter + Pagination + Read-only Gate

**← depends on:** Kontrak A ✅

**A. Page scaffold**
- [x] Buat folder `riwayat/kontrak/`
- [x] Buat `riwayat/kontrak/page.tsx` — `"use client"`, mirror `sk/page.tsx` tapi:
  - **Tanpa `LampiranCard`** — tidak ada card lampiran di bawah tabel
- [x] Query: `GET /kepegawaian/riwayat/kontrak/pegawai/{pegawaiId}`
  - `staleTime: 30_000`, `placeholderData: keepPreviousData`
- [x] Paging via `fromPage()` / `toApiParams()`
- [ ] `isPending` → skeleton · `isPlaceholderData` → dim · `isError` → panel inline

**B. Tabel**
- [ ] 7 kolom: `No | Nomor Kontrak | Jenis Aksi | Tgl. SK | Mulai | Selesai | Notes`
- [ ] Kolom `No` pakai `cell(item, i)` pattern — offset paging
- [ ] `labelAksiKontrak()` untuk kolom Jenis Aksi
- [ ] `val()` dan `rp()` helper panen dari `sk/page.tsx` — tidak ditulis ulang

**C. Read-only gate (statusPegawai ≠ KONTRAK)**
- [ ] ⏳ **Ditunda — BE belum deploy `statusPegawai` di session endpoint.** Lihat `docs/BE-REQUIREMENT-riwayat-kontrak-status-pegawai.md`
- [ ] Jika `statusPegawai` tersedia di `layout.tsx` (dari `sessionQuery.data?.statusPegawai`):
  - **Opsi:** pass sebagai props ke `children` via cloneElement/context, **atau** query ulang di page
  - **Rekomendasi:** query ulang saja `useQuery([...])` di page untuk `statusPegawai` — lebih sederhana
- [ ] ⏳ Gate toolbar: jika `statusPegawai !== "KONTRAK"`, jangan render tombol "+ Tambah Kontrak"
- [ ] ⏳ Gate aksi baris: jika `statusPegawai !== "KONTRAK"`, jangan render ikon Edit/Hapus di `<DataTable>`
- [ ] ⏳ **Hanya sembunyikan tombol — tanpa banner/notice**

**D. State**
- [x] Filter `nomorKontrak` (text)
- [x] `searchParams` = satu-satunya sumber kebenaran filter + paging
- [x] Klik baris = pilih → `?sel={id}` (onRowClick / selectedRowId / getRowId)

**E. Tutup**
- [x] `bun run build` · `bunx biome check` · ✅

---

### 3. Kontrak C — Form Sheet + Hapus

**← depends on:** Kontrak B ✅

**A. Form Sheet**
- [x] Buat `riwayat/kontrak/kontrak-form-sheet.tsx` — mirror `sk-form-sheet.tsx`
- [x] Pakai RHF + Zod (`zodResolver`)
- [x] Zod schema:
  - Required: `jenisKontrak`, `nipam`, `nama`, `nomorKontrak`, `tanggalSk`, `tanggalMulai`
  - Optional: `tanggalSelesai`, `golonganId`, `gajiPokok`, `isLatest`, `notes`
  - **Catatan:** `golonganId` di PostRequest/PutRequest required (`number, min 1`) tapi opsional di Zod — detail query tidak return golongan, jadi edit butuh opsional
- [x] **Form fields:**
  - `NIPAM` — `<FieldText>` editable (prefilled dari session)
  - `Nama` — `<FieldText>` editable (prefilled dari session)
  - `Nomor Kontrak` — `<FieldText>` required
  - `Jenis Aksi` — `<Select>` dari `JENIS_AKSI_KONTRAK_OPTIONS`
  - `Tgl. SK` — date picker required
  - `Tanggal Mulai` — date picker required
  - `Tanggal Selesai` — date picker optional
  - `Golongan` — `<FieldFk>` via `useFkOptions("golongan", ...)`
    - **Hanya render jika:** `jenisKontrak === "PENGANGKATAN"` **SAAT CREATE** (`editingId === null`)
    - **Saat EDIT:** field Golongan tidak ditampilkan
  - `Gaji Pokok` — `<FieldText type="text">` optional
  - `isLatest` — `<Checkbox>` "Kontrak Terbaru"
  - `Notes` — `<FieldTextarea>` optional
- [x] Mount Sheet **sekali** di level page — tidak ada Sheet per baris
- [x] Pada edit: fetch `GET /kepegawaian/riwayat/kontrak/{id}` untuk prefill
- [x] POST/PUT → toast sonner sukses · invalidate `["riwayat-kontrak", pegawaiId]`
- [x] Error BE → tampilkan di form (`setError("root", ...)`) — bukan toast
- [x] **OnSubmit logic untuk golongan:**
  - Golongan selalu ditampilkan (types BE bilang required)
  - `// ponytail` comment: conditional per jenisKontrak + mode CREATE ditunda sampai BE konfirmasi
  - Skip `golonganId` di payload hanya jika falsy

**B. Hapus**
- [x] `<ConfirmDeleteDialog>` — `DELETE /kepegawaian/riwayat/kontrak/{id}`
- [x] 409 → dialog tetap terbuka, alasan inline
- [x] Tidak ada optimistic removal — tunggu 200, lalu invalidate

**C. Tutup**
- [x] `bun run test` · `bun run build` · `bunx biome check` · ✅

---

## Definition of Done

- [ ] Rail item "Riwayat Kontrak Kerja" aktif dan ter-navigate ke `/riwayat/kontrak`
- [ ] Tabel Kontrak: 7 kolom, format tanggal, label aksi kontrak
- [ ] Filter `nomorKontrak` + paging + row-select seluruhnya lewat URL `searchParams`
- [ ] Read-only gate bekerja: pegawai non-KONTRAK tidak melihat tombol tambah/edit/hapus
- [ ] CRUD Kontrak jalan end-to-end
- [ ] Golongan hanya muncul di form saat CREATE + PENGANGKATAN
- [ ] `bun run test` · `bun run build` · `bunx biome check` — semua hijau
- [ ] `npx gitnexus analyze` + `/graphify . --update` + `bd dolt push` + `git push`

---

## Invarian yang tak boleh dilanggar

- **Tipe generated** (`src/types/**`) TIDAK diedit manual — jalankan ulang `docs/api/extract-types.js`
- **`src/components/ui/*`** TIDAK disentuh — zona regenerable shadcn
- **Unauthorized = unmount** (`null`), bukan `disabled` atau CSS-hide
- **Toast hanya untuk hasil mutasi** — gagal load data pakai panel inline "Coba lagi"
- **`gcTime: Infinity` / `staleTime: Infinity` dilarang**
- **Warna lewat design token** (`--primary`, `--muted-foreground`), bukan hex/`oklch()` inline
- **Jangan rename simbol dengan find-replace** — pakai `gitnexus_rename`
- Error di luar scope → **buka issue baru**, jangan diperbaiki ad-hoc
- **Tidak ada lampiran** — kontrak tidak punya berkas lampiran
