# Claim Order — Konsol Data Pendukung per-pegawai (Fase 1: Data Pendidikan + Lampiran)

> Papan pantau untuk agen implementer. Sumber kebenaran status = **beads (`bd`)**, bukan file ini.
> Alur per issue: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.

**Tujuan.** Dari halaman **Data Pegawai** (`/kepegawaian/data`, 3 tab), HR bisa masuk ke **konsol
data pendukung satu pegawai** — mirror konsol Riwayat (ADR-0013) tapi atas resource `/profil/*`:
header identitas, rail kiri **"Kategori Data Pendukung"** berisi 6 item (Data Pendidikan ·
Pengalaman Kerja · Keahlian · Pelatihan · Kartu Identitas · Keluarga), tabel kategori aktif, dan
card **Lampiran** di bawahnya. **Fase 1 = kategori Data Pendidikan saja, tapi tuntas** (tabel +
filter + CRUD + lampiran). 5 kategori lain = Fase 2, railnya sudah dirender tapi non-aktif.

**Epic:** `kepegawaian-fe-fnfh` (Data Pendukung — konsol CRUD per-pegawai, dibuat 2026-08-12;
child issues `fnfh.1` scaffold · `.4` tabel · `.2` form · `.3` lampiran · `.8` BE-gap · `.5`
spike-filter-keluarga · `.11/.10/.6/.9/.7` Fase 2) ·
**Keputusan terkunci:** `docs/context/kepegawaian-pendukung.md` §Page 5, Keputusan P1–P8 +
`docs/adr/0014-data-pendukung-konsol-profil.md`.

**File yang berubah (Fase 1):**

1. `src/app/(app)/kepegawaian/data/[pegawaiId]/pendukung/layout.tsx` — **baru** (header + rail)
2. `src/app/(app)/kepegawaian/data/[pegawaiId]/pendukung/page.tsx` — **baru** (redirect → `./pendidikan`)
3. `src/app/(app)/kepegawaian/data/[pegawaiId]/pendukung/pendidikan/page.tsx` — **baru** (tabel + filter + form + lampiran + RBAC)
4. `src/app/(app)/kepegawaian/data/[pegawaiId]/pendukung/pendidikan/pendidikan-form-sheet.tsx` — **baru**
5. `src/app/(app)/kepegawaian/data/ringkasan-panel.tsx` — tombol "Data Pendukung" (**di 2 tempat**)
6. `src/app/(app)/kepegawaian/data/data-pegawai-client.tsx` — wire `onPendukung`
7. `src/components/lampiran-card.tsx` — prop `hideDelete` (default false, backward-compatible)

Tidak menyentuh: `data-table.tsx` (widening `Column.cell` sudah ada), `permissions.ts`
(`hr: {"*": ALL}` sudah ada).

---

## Keputusan desain (hasil grill 2026-08-12 — DIKUNCI, jangan re-litigasi)

1. **Konsol terpisah dari Riwayat** — data keadaan sekarang (`/profil/*`) vs kejadian
   (`/kepegawaian/riwayat/*`). Bukan item sidebar.
2. **Route per kategori**: `data/[pegawaiId]/pendukung/{layout,page,kategori/page}`.
   Segmen statis `tambah` tidak konflik dengan `[pegawaiId]`.
   → **[ADR-0014](adr/0014-data-pendukung-konsol-profil.md)**.
3. **Entry point** = tombol ke-4 "Data Pendukung" di action row `RingkasanPanel`. Row itu
   **duplikat** di dua tempat dalam file yang sama.
4. **CRUD penuh semua 6, tanpa approval.** Request schema tidak memuat `disetujui`; BE yang
   mengelola. Konsol admin.
5. **Kunci data** = `biodataId` (= NIK), gratis dari header session (`GET /pegawai/{id}/session`).
   ⚠️ `KartuIdentitasPostRequest` memakai field `nik`, bukan `biodataId`.
6. **Klik baris = PILIH** (`?sel=id`) + **kartu Lampiran** semua 6 kategori, tanpa approval.
   `(ref, refId)` = (`PROFIL_*`/`KARTU_IDENTITAS`, id baris terpilih) — tanpa penurunan.
7. **Form = Sheet** semua kategori (pola `sheet-form-pattern.md`); mount sekali per page,
   `editing` state di-lift; dilarang satu Sheet per baris.
8. **RBAC**: gate `can(roles,"view","pegawai")` + `<Can … entity="pegawai">` per aksi
   (preseden Keputusan 10 riwayat). `hr: {"*": ALL}` sudah ada.

---

## Prasyarat (baca sebelum ngoding)

1. `docs/design/coding-rules.md` — aturan wajib, file ≤ ~120 baris
2. `docs/context/kepegawaian-pendukung.md` §Page 5 — Keputusan P1–P8 + `kepegawaian-pendukung-pendidikan.md` (D1–D5), sumber kebenaran desain
3. `docs/adr/0014-data-pendukung-konsol-profil.md` — kenapa konsol kedua + route-per-kategori
4. `docs/context/kepegawaian-riwayat.md` §Page 4 — preseden pola (K1–K12) yang dimirror
5. `docs/adr/0013-reusable-lampiran-components.md` — komponen lampiran shared
6. `CONTEXT-MAP.md` — glosarium (Data Pendukung, Biodata), list-screen anatomy, sheet-form-pattern
7. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/layout.tsx` — template layout + rail
   (copy-paste sadar, ganti item/ikon/judul)
8. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/{sk,mutasi}/page.tsx` — template tabel+form+lampiran
9. `src/components/lampiran-card.tsx`, `lampiran-upload-modal.tsx` — reuse (URL parametrizable)
10. `src/types/profil/{pendidikan,…}.ts` — tipe generated (jangan diedit manual)
11. `src/lib/paging.ts` — `fromPage()` / `toApiParams()`

---

## Urutan claim

### A. `pendukung.scaffold` — route scaffold + header + rail + tombol entry

**← depends on:** — ✅ SELESAI (2026-08-12, fnfh.1)

- [x] `gitnexus_impact({target: "RingkasanPanel", direction: "upstream"})` — blast radius LOW: 1 caller (`DataPegawaiClient`)
- [x] `pendukung/layout.tsx` — client component; copy struktur riwayat `layout.tsx`
- [x] Query header: `useQuery({ queryKey: ["pegawai-session", pegawaiId], staleTime: 5 * 60_000 })`
      → `/api/proxy/pegawai/{id}/session`; 404/`!ok` = panel inline, bukan toast
- [x] Rail "Kategori Data Pendukung" page-local, **6 item urut**: Data Pendidikan · Pengalaman
      Kerja · Keahlian · Pelatihan · Kartu Identitas · Keluarga; hanya "Data Pendidikan" aktif,
      5 lainnya non-aktif + badge "Segera" (ikon lucide: `GraduationCap` · `Briefcase` · `Award` ·
      `BookOpen` · `CreditCard` · `Users`); back-arrow → `/kepegawaian/data`
- [x] Target sentuh item rail ≥44px (h-11) — mandat lansia
- [x] `pendukung/page.tsx` → `redirect("./pendidikan")`
- [x] Tombol "Data Pendukung" di `ringkasan-panel.tsx` → `/kepegawaian/data/{id}/pendukung/pendidikan`
      — ditambah di KEDUA salinan action row (cabang `isPending` **dan** render final)
- [x] Verifikasi `/kepegawaian/data/tambah` masih ter-resolve ke `tambah/` — build output mengonfirmasi
- [x] `gitnexus_detect_changes()` · `bun run build` · `bunx biome check` · `bd close fnfh.1`

---

### B. `pendukung.spike-lampiran` — SPIKE: bentuk URL lampiran `/profil/*` + multipart

**← depends on:** — (paralel, P1 — dahulukan agar tak memblokir E)

- [x] ✅ **SELESAI (2026-08-12, dari OpenAPI `docs/api/profil/api.json`)** — pemetaan URL final di
      `kepegawaian-pendukung.md` P5 (tabel per entity): 2 pola list (`/lampiran/{refId}/list`
      untuk pendidikan & pengalaman-kerja; `/{refId}/lampiran` untuk pelatihan, keahlian,
      kartu-identitas, keluarga); detail/file/delete seragam (`/lampiran/{id}` = **lampiranId**, list
      = **refId**); upload `POST /profil/{entity}/lampiran`. Response = `LampiranProfilQuery[]`.
      Catatan: ada `POST /profil/lampiran/accept` — tidak dipakai (P5 tanpa approval).
- [ ] Konfirmasi runtime (opsional, saat E): boundary multipart lewat `proxy.ts` utuh untuk base
      `/profil/*` (riwayat sudah membuktikan `rewrite` tidak menyentuh body — risiko rendah)
- [ ] `bd close pendukung.spike-lampiran`

---

### C. `pendukung.pendidikan.tabel` — tabel Data Pendidikan + filter + pagination

**← depends on:** `pendukung.scaffold` — ✅ SELESAI (2026-08-12, fnfh.4)

- [x] Query `/api/proxy/profil/pendidikan?biodataId=<nik>`; `staleTime: 30_000`, gcTime default 5 menit,
      `placeholderData: keepPreviousData` — **`Infinity` dilarang**
- [x] Paging via `fromPage()` / `toApiParams()`; `nik` dari cache session layout (queryKey sama →
      satu fetch, tanpa re-fetch)
- [x] `isPending`→skeleton · `isPlaceholderData`→dim · `isError`→panel inline (**bukan toast**)
- [x] Kolom **D1 (terkunci)**: `No | Jenjang | Institusi | Jurusan | Kota | Tahun | IPK | Gelar | Status | Aksi`
      — Tahun komposit `Masuk–Lulus`; Gelar komposit `Depan Belakang`; **Status** = badge
      "Terakhir" (`isLatest`) — badge "Disetujui"/"Belum" ditunda (menunggu BE-requirement #1,
      additive) — Aksi = Edit + Hapus via handler kondisional (unmount bila tanpa akses, P8)
- [x] Filter toolbar **D2 (terkunci)**: `institusi` (teks, "Cari Institusi") + `jenjangId`
      (combobox `/master/jenjang-pendidikan/list` via `useFkOptions`) + reset; empty-filter state
      juga menyediakan Reset (`isFiltered`/`onResetFilter`)
- [x] `searchParams` = satu-satunya sumber kebenaran; reload URL memulihkan state
- [x] Klik baris = pilih → `?sel={id}` (pola riwayat)
- [x] `gitnexus_detect_changes()` · `bun run build` · `bunx biome check` · `bd close fnfh.4`

---

### D. `pendukung.pendidikan.form` — form Sheet Pendidikan + hapus

**← depends on:** `pendukung.pendidikan.tabel` — ✅ SELESAI (2026-08-12, fnfh.2)

- [x] Satu `<Sheet>` di-mount sekali di level page, oper state `editing` — dilarang per baris
- [x] Form Sheet **D5 (terkunci)** — RHF + Zod (`zodResolver`); field: `jenjangPendidikanId`
      (FK combobox, required), `institusi` (required), `jurusan`, `kota`, `gelarDepan`,
      `gelarBelakang`, `tahunMasuk`, `isLulus` (checkbox), `tahunLulus`, `gpa` (IPK, Zod 0–4),
      `isLatest` (checkbox "Pendidikan Terakhir")
      — **Cross-field**: `isLulus` dicentang → `tahunLulus` wajib (superRefine); tidak dicentang →
      `tahunLulus` dikosongkan (tidak dikirim); rentang tahun 1950–berjalan + gpa regex 2 desimal
- [x] ⚠️ Jebakan FK (`normalizeFk()`): map nested `{jenjangPendidikan,id}` → `jenjangPendidikanId`
- [x] Hapus pakai `<ConfirmDeleteDialog>` (ketik `HAPUS`); **409 → dialog tetap terbuka**, alasan inline
- [x] **Dilarang optimistic removal** — tunggu 200, lalu `invalidateQueries`
- [x] Toast sonner **hanya** untuk hasil mutasi; Simpan disabled sampai `nik` session tersedia
- [x] `gitnexus_detect_changes()` · `bun run build` · `bunx biome check` · `bd close fnfh.2`

---

### E. `pendukung.pendidikan.lampiran` — card Lampiran Pendidikan

**← depends on:** `pendukung.pendidikan.tabel`, `pendukung.spike-lampiran` — ✅ SELESAI (2026-08-12, fnfh.3)

- [x] Card kedua di bawah tabel: judul "Lampiran", tombol `+`, tabel
      `No | File | Keterangan | Aksi`, empty state "No Data" (via `LampiranCard` shared)
- [x] `(ref, refId)` = (`PROFIL_PENDIDIKAN`, id baris terpilih `?sel`)
- [x] URL dari hasil spike B (P5): list `/lampiran/{refId}/list`, upload `POST …/lampiran`,
      delete `/lampiran/{id}`, view `/lampiran/{id}/file` — di-supply ke `LampiranCard`
- [x] **Tanpa kolom Status lampiran** — approval lampiran ditolak eksplisit (P5).
      Status **record** (badge Disetujui) hidup di tabel, bukan di kartu lampiran
- [x] View: `pdf` & `image/*` → viewer in-app; tipe lain → langsung download (`window.open`)
- [x] Upload: **nol validasi klien**; tampilkan pesan error BE apa adanya
- [x] Hapus pakai `<ConfirmDeleteDialog>`; RBAC: upload gated `hideUpload`, hapus gated `hideDelete`
      (prop baru di `LampiranCard`, default false — backward-compatible untuk riwayat)
- [x] `gitnexus_detect_changes()` · `bun run build` · `bunx biome check` · `bd close fnfh.3`

---

### Fase 2 — 5 kategori lain (pola Fase 1, satu claim per kategori)

Urutan saran (FK ke master paling sedikit dulu, supaya cepat menang): **Pengalaman Kerja** ·
**Kartu Identitas** · **Keahlian** · **Pelatihan** · **Keluarga**.

> ✅ **Pengalaman Kerja SELESAI (2026-08-12, fnfh.11)** — `pendukung/pengalaman-kerja/{page,
> pengalaman-kerja-form-sheet}.tsx` + rail di-aktifkan di `layout.tsx`. W1–W4 semua jalan: tabel 6
> kolom (Periode komposit `–sekarang`), filter 2 teks, form 7 field (cross-field `tahunKeluar ≥
> tahunMasuk`), lampiran `/lampiran/{refId}/list` (spike B).
>
> ✅ **Keahlian SELESAI (2026-08-12, fnfh.10)** — `pendukung/keahlian/{page,
> keahlian-form-sheet}.tsx` + rail di-aktifkan. K1–K3 jalan: tabel 8 kolom (**Status badge
> Disetujui/Belum = override user 2026-08-12**, `KeahlianQuery` sudah memuat `disetujui`), filter 1
> combobox `jenisKeahlianId`, form 6 field (FK combobox, select kualifikasi, form tak sentuh
> status), lampiran list pola `/{refId}/lampiran` (spike B).
>
> ✅ **Kartu Identitas SELESAI (2026-08-12, fnfh.9)** — `pendukung/kartu-identitas/{page,
> kartu-identitas-form-sheet}.tsx` + rail di-aktifkan. KI1–KI3 jalan: tabel 6 kolom + badge
> "Kadaluarsa" komputasi klien (tanggal lokal, bukan UTC), filter `jenisKartuId` (master
> `jenis-kitas`) + `nomorKartu`, form 6 field (**request pakai `nik`, bukan `biodataId`** — P6,
> FieldDate, cross-field `tanggalExpired > tanggalTerima`), lampiran list pola `/{refId}/lampiran`.

> **Semua 6 kategori sudah di-grill (2026-08-12)** — detail di `docs/context/kepegawaian-pendukung-*.md`
> (D1–D5 pendidikan + BE-requirement, W1–W4 pengalaman-kerja, K1–K3 keahlian, PL1–PL3 pelatihan,
> KI1–KI3 kartu-identitas, K1–K3 keluarga).
> ⚠️ **Claim spike filter keluarga** (mapping enum→angka) **wajib** sebelum filter Hubungan dianggap jadi.
> ⚠️ **Claim spike lampiran `/profil/*`** (bentuk URL list per entity) mendahului semua kartu Lampiran.

- [x] **Grill per kategori dulu** (Pengalaman Kerja sudah — W1–W4 terkunci di context file)
- [x] Rail item kategori di-aktifkan di `pendukung/layout.tsx` (badge "Segera" dihapus) — pengalaman-kerja ✅
- [x] `pendukung/{kategori}/page.tsx` + form-sheet + lampiran — clone Fase 1, ganti entity — pengalaman-kerja ✅
- [x] ⚠️ Pengalaman Kerja: lampiran bentuk `/lampiran/{id}/list` (sama pendidikan) — pakai hasil spike B ✅
- [x] ⚠️ Kartu Identitas: request pakai field **`nik`** (bukan `biodataId`) — P6 ✅
- [x] ⚠️ Keahlian: tabel menampilkan `disetujui` (override user — kolom Status); form **tidak** menyentuhnya (P4) ✅
- [ ] Per kategori berikutnya: `gitnexus_detect_changes()` · `bun run build` · `bunx biome check` · `bd close`

---

## Definition of Done

- [x] Tombol "Data Pendukung" muncul di `RingkasanPanel` (loading **dan** loaded) dan membuka konsol
- [x] Header menampilkan NIPAM + nama dari `/pegawai/{id}/session`
- [x] Rail 6 item utuh; 1 aktif, 5 non-aktif + badge "Segera" (Fase 1)
- [x] Tabel Pendidikan + filter + paging + row-select seluruhnya lewat URL `searchParams`
- [x] CRUD Pendidikan jalan end-to-end; combobox FK ter-autoselect saat edit (`normalizeFk`)
- [x] Card Lampiran: upload / view / download / hapus jalan (URL sesuai hasil spike B)
- [ ] 5 kategori lain mengikuti pola yang sama (Fase 2 — issue fnfh.11/.10/.6/.9/.7)
- [x] `bun run build` · `bunx biome check` — hijau; `bun run test` hijau (4 gagal = bug pre-existing `kepegawaian-fe-ggvr` pdf-viewer)
- [x] `npx gitnexus analyze` + `/graphify . --update` + `bd dolt push` + `git push`

---

## Invarian yang tak boleh dilanggar

- **Tipe generated** (`src/types/**`) TIDAK diedit manual — regenerate via `docs/api/extract-types.js`
- **`src/components/ui/*`** TIDAK disentuh — zona regenerable shadcn; kustomisasi lewat `className`
  dari call-site atau wrapper tipis di luar `ui/`
- **Tak bikin route `/api/proxy/...` baru** — catch-all `proxy.ts` sudah menangani JSON;
  pengecualian hanya bila spike B membuktikan multipart `/profil/*` butuh handler khusus
- **Unauthorized = unmount**, bukan `disabled` atau CSS-hide
- **Toast hanya untuk hasil mutasi** — gagal load data pakai panel inline "Coba lagi"
- **`gcTime: Infinity` / `staleTime: Infinity` dilarang**
- **Warna lewat design token** (`--primary`, `--muted-foreground`), bukan hex/`oklch()` inline
- **Jangan rename simbol dengan find-replace** — pakai `gitnexus_rename`
- **URL lampiran `/profil/*` hanya dari hasil spike B** — jangan meniru `/kepegawaian/lampiran/*` mentah
- Error di luar scope → **buka issue baru**, jangan diperbaiki ad-hoc
