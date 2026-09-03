# Claim Order — Riwayat Cuti (Data Penggunaan Hak Cuti, read-only)

> Papan pantau untuk agen implementer. Sumber kebenaran status = **beads (`bd`)**, bukan file ini.
> Alur per issue: `bd show kepegawaian-fe-efwv` → `bd update kepegawaian-fe-efwv --claim` → kerja →
> quality gate → `bd close kepegawaian-fe-efwv`.

**Tujuan.** Tambah halaman **Riwayat Cuti** (`/kepegawaian/data/{id}/riwayat/cuti`) ke konsol
riwayat pegawai yang sudah ada: tabel penggunaan hak cuti + strip 3 kartu info (Kuota · Diambil ·
Sisa). **Read-only total** — tidak ada CUD. Fase 2 dari epic riwayat (Keputusan 12).

**Keputusan terkunci:** `docs/context/kepegawaian-riwayat-cuti.md` §K-C1–K-C7 + `kepegawaian-riwayat.md` K12.
Jangan re-litigasi.

**File yang berubah:**

1. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/layout.tsx` — aktifkan rail cuti + PAGE_TITLES entry
2. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/cuti/page.tsx` — **baru** (tabel + toolbar tahun + strip 3 kartu)

---

## Keputusan desain (hasil grill — DIKUNCI, jangan re-litigasi)

1. **Kolom tabel:** `No | Periode | Jenis Cuti | Jumlah Hari Kerja | Status` — badge **SEMUA** status (6 state).
2. **Filter:** **tahun saja** (bulan di-drop — backend tak punya param bulan). Default tahun berjalan, rentang 5 tahun. `tahun` di URL `searchParams`.
3. **Strip info:** `GET /cuti/kuota?pegawaiId&tahun` → 3 kartu: **Kuota** = `kuota + kuotaTambahan` · **Diambil** = `kuotaTerpakai` · **Sisa** = `sisaKuota`.
4. **Tidak ada** tombol `+`, tidak ada kolom Aksi, tidak ada klik-baris/`?sel=`, tidak ada form, tidak ada Lampiran.
5. **Fetch:** `fetch("/api/proxy/cuti/…")` langsung — **jangan** `src/lib/api/client.ts` (BASE master).
6. **RBAC:** gate `can(roles, "view", "pegawai")` → `forbidden()` (K10); tanpa `<Can>` tulis.

---

## Pemetaan sel tabel → `CutiPengajuanResponse` (`src/types/cuti/pengajuan.ts`)

| Kolom | Sumber |
|---|---|
| No | `cell(item, i)` pattern (offset paging) |
| Periode | `formatDate(tanggalMulai) – formatDate(tanggalSelesai)` satu sel |
| Jenis Cuti | `jenisCuti?.nama` + `subJenisCuti?.nama` (sub jenis di bawah, label kecil) |
| Jumlah Hari Kerja | `jumlahHariKerja` (tabular-nums) |
| Status | `approvalCutiStatus` → badge berlabel (ikon/warna + teks) via `src/lib/enum-labels.ts` |

**Endpoint:**
- Tabel: `GET /api/proxy/cuti/pengajuan/{pegawaiId}/pegawai?tahun={tahun}&page=&size=&sortBy=tanggalMulai&sortDirection=desc`
- Strip: `GET /api/proxy/cuti/kuota?pegawaiId={id}&tahun={tahun}`
- Header: `GET /pegawai/{id}/session` (sudah di-fetch di `riwayat/layout.tsx` — gratis)

**Tipe (generated, jangan diedit):**
- `src/types/cuti/pengajuan.ts` — `PageResultPageCutiPengajuanResponse`, `CutiPengajuanResponse`
- `src/types/cuti/kuota.ts` — `CutiKuotaPegawaiResponse { page, additional }`, `CutiKuotaResponse`

> ⚠️ **K-C5 merevisi sumber strip K12** (`/cuti/kuota/{id}/{tahun}/sisa` → `/cuti/kuota` index).
> Kalau ada kontradiksi dengan tabel "Sumber data" K12, yang berlaku **K-C5**.

---

## Prasyarat (baca sebelum ngoding)

1. `docs/context/kepegawaian-riwayat-cuti.md` — **keputusan K-C1–K-C7** (baca semua)
2. `docs/context/kepegawaian-riwayat.md` §K1–K12 — shared infra: RBAC, pola filter URL, header, state
3. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/sk/page.tsx` — template tabel riwayat terdekat (SK = CRUD; ambil pola tabel/filter/paging saja, hilangkan Aksi/form/Lampiran)
4. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/layout.tsx` — rail cuti diaktifkan di sini
5. `src/lib/enum-labels.ts` — cek apakah `StatusApproval` (6 state) sudah punya label; belum → tambahkan di file itu (bukan hardcode di page)
6. `src/lib/paging.ts` — `fromPage()` / `toApiParams()` untuk paging

---

## Urutan claim

### `kepegawaian-fe-efwv` — A: tabel + toolbar tahun + strip 3 kartu + rail activation

**← depends on:** — (siap diklaim; Fase 1 + SK + SP selesai, rail cuti masih "Segera")

**A. Layout** ✅
- [x] Update `riwayat/layout.tsx`:
  - Rail item `cuti`: ubah `href: "#"` → `href: "./cuti"`, hapus `soon: true`
  - Tambah `cuti: "Riwayat Cuti"` ke `PAGE_TITLES`
  - Cabang disabled item dihapus (semua 5 kategori sudah aktif — dead code)

**B. Route** ✅
- [x] Buat `riwayat/cuti/page.tsx` — `"use client"`
- [x] Query tabel: `GET /api/proxy/cuti/pengajuan/{pegawaiId}/pegawai` — `queryKey` bawa `searchParams` (`tahun`, `page`, `size`), `staleTime: 30_000`, `placeholderData: keepPreviousData`
- [x] Paging via `fromPage()` / `toApiParams()` — pola page riwayat lain (sort default `tanggalMulai desc`)
- [x] `isPending` → skeleton · `isPlaceholderData` → dim · `isError` → panel inline "Coba lagi"
- [x] Gate RBAC `can(roles, "view", "pegawai")` → `forbidden()` (K-C6) — import dari `@/lib/auth/can` (bukan barrel server-only)

**C. Toolbar tahun** ✅
- [x] Select tahun: rentang 5 tahun (tahun berjalan − 4 .. tahun berjalan), default tahun berjalan
- [x] Ganti tahun → `router.replace` update `searchParams` (URL = sumber kebenaran) → refetch otomatis
- [x] Reset (jika perlu): kembalikan `tahun` ke default; guard URL rusak (`?tahun=abc` → tahun berjalan)

**D. Tabel** ✅
- [x] 5 kolom data (K-C4) — copy struktur tabel dari `sk/page.tsx`, sesuaikan field
- [x] Kolom `No` pakai `cell(item, i)` pattern
- [x] Kolom `Periode`: satu sel `formatDate(tanggalMulai) – formatDate(tanggalSelesai)`
- [x] Kolom `Jenis Cuti`: `jenisCuti?.nama` + sub jenis di bawah
- [x] Kolom `Status`: badge berlabel via `enum-labels.ts` (tambah `StatusApproval` label + tone)
- [x] **Tidak ada** `onRowClick`, tidak ada Aksi column, tidak ada `?sel=`

**E. Strip 3 kartu** ✅
- [x] Query strip: `GET /api/proxy/cuti/kuota?pegawaiId={id}&tahun={tahun}` — `queryKey: ["cuti-kuota", pegawaiId, tahun]`
- [x] ⚠️ **Verifikasi container respons**: request nyata tidak bisa dilakukan dari sesi ini (butuh auth). Implementasi defensif: baca **kedua** container (`page.content` ∪ `additional`), ambil baris `tahun === tahun terpilih` — diuji via unit test mock kedua bentuk (K-C5)
- [x] Render 3 kartu: Kuota (`(kuota ?? 0) + (kuotaTambahan ?? 0)`) · Diambil (`kuotaTerpakai ?? 0`) · Sisa (`sisaKuota ?? 0`) — **null-safe** (semua field opsional)
- [x] Tak ada record → kartu `—`/0 + "Belum ada kuota tahun ini"; `isPending` → skeleton; `isError` → inline `—` (bukan toast, jangan blokir tabel)

**F. Tutup** ✅
- [x] `bun run build` · `bunx biome check` · `bun run test` (cuti 9/9) — semua hijau; 4 gagal `pdf-viewer.test.tsx` = **pre-existing** (diverifikasi via git stash), issue baru diajukan
- [x] `npx gitnexus analyze` + `/graphify . --update`
- [x] `bd close kepegawaian-fe-efwv` · commit · `bd dolt push` · `git push`

---

## Definition of Done

- [x] Rail "Data Penggunaan Hak Cuti" aktif, navigate ke `/riwayat/cuti`, tanpa badge "Segera"
- [x] `PAGE_TITLES.cuti` ada → header `"Riwayat Cuti — [NIPAM] (Nama)"`
- [x] Tabel: 5 kolom, semua status tampil sebagai badge berlabel
- [x] Filter tahun: default tahun berjalan, rentang 5 tahun, URL-driven, refetch on change
- [x] Strip 3 kartu (Kuota / Diambil / Sisa) dari `GET /cuti/kuota` — container dibaca defensif (`page.content` ∪ `additional`), unit-tested
- [x] Tidak ada tombol `+`, kolom Aksi, klik-baris, form, hapus, Lampiran — read-only total
- [x] `bun run test` (cuti 9/9) · `bun run build` · `bunx biome check` — semua hijau
- [x] `npx gitnexus analyze` + `/graphify . --update` + `bd dolt push` + `git push` — up to date

---

## Invarian yang tak boleh dilanggar

- **Tipe generated** (`src/types/**`) TIDAK diedit manual
- **`src/components/ui/*`** TIDAK disentuh — zona regenerable shadcn
- **Unauthorized = unmount** (`null`), bukan `disabled` atau CSS-hide
- **Toast hanya untuk hasil mutasi** — gagal load pakai panel inline "Coba lagi"
- **`gcTime: Infinity` / `staleTime: Infinity` dilarang**
- **Warna lewat design token** (`--primary`, `--muted-foreground`), bukan hex/`oklch()` inline
- **Jangan pakai `src/lib/api/client.ts`** untuk fetch cuti — gunakan `fetch` langsung ke `/api/proxy/cuti/…`
- Error di luar scope → **buka issue baru**, jangan diperbaiki ad-hoc
