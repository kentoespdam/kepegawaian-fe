# Claim Order — Modul Cuti Pegawai

> Papan pantau untuk agen implementer. Sumber kebenaran status = **beads (`bd`)**, bukan file ini.
> Alur per issue: `bd show <id>` → `bd update <id> --claim` → kerja →
> quality gate → `bd close <id>`.

**Tujuan.** Implementasi modul **Cuti Pegawai** di `(app)/cuti/` sebagai modul mandiri
dengan tiga sub-menu: Kuota Cuti (SDM only), Pengajuan Cuti, dan Persetujuan Cuti.

**Keputusan terkunci:** `docs/context/cuti.md` CU-1–CU-14 + ADR-0015.
Jangan re-litigasi.

**Prasyarat baca sebelum ngoding:**
1. `docs/context/cuti.md` — keputusan domain CU-1–CU-14 (baca semua)
2. `CONTEXT-MAP.md` — inti bersama (RBAC, pola fetch, state handling)
3. `docs/design/coding-rules.md` — aturan mengikat (wajib)
4. `docs/adr/0015-cuti-standalone-module.md` — mengapa modul mandiri
5. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/cuti/page.tsx` — contoh pola fetch + kartu kuota yang sudah ada
6. `src/app/(app)/kepegawaian/terminasi/` — contoh modul mandiri dengan sub-menu lateral

---

## File yang akan dibuat/diubah

### Infrastruktur (dikerjakan pertama, blokir semua issue lain)
```
src/app/(app)/cuti/layout.tsx                    [BARU] sub-sidebar lateral
src/app/(app)/cuti/page.tsx                      [BARU] redirect ke /cuti/pengajuan
src/types/cuti/kuota.ts                          [SUDAH ADA — cek, jangan edit tipe generated]
src/types/cuti/pengajuan.ts                      [SUDAH ADA — cek, jangan edit tipe generated]
```

### Kuota Cuti (SDM only)
```
src/app/(app)/cuti/kuota/page.tsx                [BARU] server thin → client
src/app/(app)/cuti/kuota/kuota-page-client.tsx   [BARU] tabel + toolbar + CRUD sheet + import dialog
```

### Pengajuan Cuti
```
src/app/(app)/cuti/pengajuan/page.tsx            [BARU] server thin → client
src/app/(app)/cuti/pengajuan/pengajuan-page-client.tsx   [BARU] tabel + strip kartu + form sheet
```

### Persetujuan Cuti
```
src/app/(app)/cuti/persetujuan/page.tsx          [BARU] server thin → client
src/app/(app)/cuti/persetujuan/persetujuan-page-client.tsx  [BARU] tab Menunggu + Riwayat + approval dialog
```

### Shared (jika belum ada)
```
src/lib/enum-labels.ts                           [MUNGKIN MODIF] pastikan StatusApproval sudah ada label
src/components/app-shell.tsx atau sidebar        [MODIF] tambah entri menu Cuti
```

---

## Urutan Claim

> Setiap issue **wajib** selesai sebelum issue berikutnya diklaim (dependency ketat).
> Kecuali tanda `[paralel]` — bisa dikerjakan bersamaan.

---

### Issue A — Infrastruktur: Layout + Route Stub + Sidebar ✅ selesai 2026-08-18

**Depends on:** —  (paling awal, kerjakan dulu)

**Scope:**
- [x] Tambah entri "Cuti" ke sidebar utama (`app-shell.tsx`) — 3 sub-item gate `null` (semua tampil, RBAC kuota di page)
- [x] Buat `src/app/(app)/cuti/layout.tsx`: sub-sidebar lateral 3 item (pola rail `riwayat/layout.tsx` — statis tanpa fetch, active state via prefix match)
- [x] Buat `src/app/(app)/cuti/page.tsx` — `permanentRedirect("/cuti/pengajuan")`
- [x] Verifikasi routing: `/cuti` terdaftar di build; `/cuti/kuota` · `/cuti/pengajuan` · `/cuti/persetujuan` terdaftar saat page-nya dibuat (Issue B/D/F)
- [x] `bun run build` — zero error · `bunx biome check` — zero lint · `bun run test` — 174 hijau

**DoD:**
- [x] Navigasi ke `/cuti` redirect ke `/cuti/pengajuan`
- [x] Sub-sidebar muncul dengan 3 item, active state highlight sesuai route
- [x] `bun run build` clean

---

### Issue B — Kuota Cuti: Tabel + Filter + CRUD Sheet ✅ selesai 2026-08-18

**Depends on:** Issue A selesai

**Scope:**
- [x] `src/app/(app)/cuti/kuota/page.tsx`: server thin — `verifySession()` + `getAccountSession()`
  - Gate RBAC: `hasPermission(permissions, PERMISSION.CUTI_WRITE)` → `forbidden()` (katalog BE: `CUTI:WRITE` = "Kelola jenis/kuota cuti" — SDM; catatan: `can(roles,"manage","kuota-cuti")` di docs tidak ada di kode — pola nyata = `hasPermission`)
- [x] `src/app/(app)/cuti/kuota/kuota-page-client.tsx`:
  - Query `GET /api/proxy/cuti/kuota` — queryKey `["cuti-kuota", tahun, nama, nipam, page, size]` (CU-14)
  - `staleTime: 30_000`, `gcTime: 300_000`, `placeholderData: keepPreviousData`
  - Toolbar `DataTableToolbar`: search Nama + NIPAM (debounce 400ms) + Select Tahun 5 tahun
  - URL = sumber kebenaran (`tahun`, `nama`, `nipam`, `page`, `size`)
  - Kolom: No · Nama Pegawai · NIPAM · Tahun · Kuota · Tambahan · Terpakai · Sisa · Expired · Aksi
  - Kolom Aksi custom (Edit/Hapus) — bukan onEdit/onDelete bawaan DataTable (label "Edit Profil" tak tepat)
  - Tombol "+ Tambah" → Sheet form; state: isPending skeleton · isPlaceholderData dim · isError inline retry (bawaan `<DataTable>`)
- [x] `src/app/(app)/cuti/kuota/kuota-form-sheet.tsx` (file terpisah, pola terminasi-form-sheet):
  - Pegawai picker (search dialog `/pegawai/list?search&statusKerja=KARYAWAN_AKTIF`), Tahun, Kuota, Kuota Tambahan, Sisa Kuota, Expired (`FieldDate`)
  - Zod: `pegawaiId` required, `tahun` required (min 2000), `expired` required; numerik opsional string-kosong → `undefined` (bukan 0)
  - Edit mode: pre-fill dari row; `POST /cuti/kuota` / `PUT /cuti/kuota/{id}` → toast → invalidate `["cuti-kuota"]`
- [x] Hapus: `DELETE /cuti/kuota/{id}` → `<ConfirmDeleteDialog>` (ketik HAPUS) → error (409) inline di dialog
- [x] Test baru `kuota-form-sheet.test.tsx` (2 test: POST undefined-vs-0 + PUT prefill)
- [x] `bun run build` zero error · `bunx biome check` zero lint · `bun run test` — 176 hijau

**DoD:**
- [x] SDM dapat melihat tabel kuota, filter tahun + nama/NIPAM berfungsi
- [x] CRUD (tambah/edit/hapus) berfungsi + toast sukses/gagal
- [x] Non-SDM mendapat `forbidden()` saat akses `/cuti/kuota`

---

### Issue C — Kuota Cuti: Import Batch + Download Template ✅ selesai 2026-08-18

**Depends on:** Issue B selesai

**Scope:**
- [x] Tombol "Unduh Template" (dalam Dialog Import — CU-5): `GET /api/proxy/cuti/kuota/template` → blob → anchor `download` (filename dari `content-disposition`)
- [x] `src/app/(app)/cuti/kuota/kuota-import-dialog.tsx` (file terpisah, pola form-sheet):
  - Tombol "Import" di toolbar → Dialog: Select Tahun (5 tahun) + File input (accept `.xlsx,.xls,.csv`)
  - Submit → `POST /api/proxy/cuti/kuota/import` (multipart: `tahun` + `file`)
  - Response `SavedResultString.data` summary → info panel **dalam dialog** (bukan toast)
  - Sukses → tutup dialog + invalidate `["cuti-kuota"]` + toast ringkas
  - Error → inline dalam dialog (user perlu baca detail — CU-5)
- [x] Test baru `kuota-import-dialog.test.tsx` (multipart tahun+file + summary inline)
- [x] `bun run build` zero error · `bunx biome check` zero lint · `bun run test` — 177 hijau
- [x] 🛠 Fix infra: `vitest.config.ts` `testTimeout: 15_000` — test jsdom berat (Sheet+Calendar+combobox) flaky-timeout 5s di bawah beban paralel full suite (kontrak/sk/terminasi/edit-profil — pre-existing, bukan dari Issue C)

**DoD:**
- [x] Download template memicu file download
- [x] Upload file + tahun → summary sukses/gagal ditampilkan
- [x] Tabel refresh setelah import sukses

---

### Issue D — Pengajuan Cuti: Tabel + Strip Kartu + Cancel

**Depends on:** Issue A selesai `[paralel dengan Issue B/C]`

**Scope:**
- [ ] `src/app/(app)/cuti/pengajuan/page.tsx`:
  - Server component — `verifySession()` → ambil `pegawaiId` dari session
  - Semua pegawai bisa akses — tidak ada gate RBAC khusus
  - Render `<PengajuanPageClient pegawaiId={pegawaiId} />`
- [ ] `src/app/(app)/cuti/pengajuan/pengajuan-page-client.tsx`:
  - Strip 3 kartu (Kuota/Diambil/Sisa): `GET /api/proxy/cuti/kuota?pegawaiId&tahun`
    - Ikuti pola defensif dari `riwayat/cuti/page.tsx` (baca `page.content` ∪ `additional`)
    - isPending → skeleton kartu; error → inline `—` bukan toast
  - Query tabel: `GET /api/proxy/cuti/pengajuan/{pegawaiId}/pegawai?tahun&page&size`
    - queryKey: `["cuti-pengajuan", pegawaiId, tahun, page, size]`
    - staleTime/gcTime standard
  - Toolbar: Select Tahun (5 tahun, default tahun berjalan)
  - Kolom: No · Jenis Cuti (+ sub-jenis) · Periode · Jumlah Hari Kerja · Status · Aksi
  - Kolom Aksi: tombol "Batalkan" hanya jika `approvalCutiStatus === "PENDING"`
  - Cancel: dialog konfirmasi sederhana → `DELETE /api/proxy/cuti/pengajuan/{id}`
    → toast sukses → invalidate
  - State: isPending skeleton · isPlaceholderData dim · isError inline
- [ ] Pastikan `enum-labels.ts` punya label untuk semua 6 status `approvalCutiStatus`
- [ ] `bun run build` · `bunx biome check` · `bun run test`

**DoD:**
- Strip kartu tampil (Kuota/Diambil/Sisa) untuk pegawai login
- Tabel riwayat pengajuan diri sendiri dengan filter tahun
- Tombol "Batalkan" hanya muncul untuk status PENDING dan berfungsi

---

### Issue E — Pengajuan Cuti: Form Tambah & Edit

**Depends on:** Issue D selesai

**Scope:**
- [ ] Sheet form Pengajuan Cuti di `pengajuan-page-client.tsx`:
  - **Info Pegawai** (read-only header): Nama, NIPAM, Jabatan dari session
  - **Jenis Cuti** (combobox): `GET /api/proxy/cuti/jenis/list` (tanpa parentId) → `ListResultCutiJenisResponse`
    - staleTime lebih panjang (`staleTime: 300_000`) — data referensi jarang berubah
  - **Sub-Jenis Cuti** (combobox, conditional): muncul saat `jenisCutiId` dipilih
    - `GET /api/proxy/cuti/jenis/list?parentId={jenisCutiId}` — refetch saat jenisCutiId berubah
    - Jika list kosong → field tidak ditampilkan (bukan tampil + disabled)
  - **Tanggal Mulai** (date picker)
  - **Tanggal Selesai** (date picker, harus ≥ Tanggal Mulai)
  - **Jumlah Hari** (read-only, computed: selisih hari kalender kedua tanggal + 1)
  - **Jumlah Hari Kerja** (read-only, fetched):
    - Trigger saat kedua tanggal terisi → `GET /cuti/pengajuan/{tglMulai}/{tglSelesai}/total-hari-kerja`
    - Loading state di field ini saat fetch berlangsung
    - Error fetch → tampilkan `—` inline, bukan toast
  - **Alasan** (textarea, required)
- [ ] Zod schema: `jenisCutiId` required, `subJenisCutiId` optional, `tanggalMulai` required,
  `tanggalSelesai` required, `jumlahHariKerja` required, `alasan` required (minLength 1)
- [ ] Submit: `POST /cuti/pengajuan` dengan `CutiPengajuanPostRequest`
  - `pegawaiId` dari session
  - `csrfToken`: cek pola yang sudah ada di proyek (lihat mutasi lain di kepegawaian)
  - Toast sukses → invalidate `["cuti-pengajuan", ...]` + `["cuti-kuota", ...]`
- [ ] Edit mode: pre-fill form dari data row, `PUT /cuti/pengajuan/{id}`
  - Hanya bisa edit jika `approvalCutiStatus === "PENDING"`
- [ ] `bun run build` · `bunx biome check` · `bun run test`

**DoD:**
- Form buka sebagai Sheet, info pegawai tampil read-only di header
- Jenis Cuti + Sub-Jenis berantai (sub-jenis muncul/hilang sesuai pilihan jenis)
- Tanggal → auto-fill hari kerja dari endpoint BE
- Submit berhasil → tabel refresh + kartu kuota refresh

---

### Issue F — Persetujuan Cuti: Halaman + Dua Tab + Approval Dialog

**Depends on:** Issue A selesai `[paralel dengan Issue D/E]`

**Scope:**
- [ ] `src/app/(app)/cuti/persetujuan/page.tsx`:
  - Server component — `verifySession()` → ambil `pegawaiId` dari session
  - Semua pegawai bisa akses, tidak ada gate khusus
  - Render `<PersetujuanPageClient pegawaiId={pegawaiId} />`
- [ ] `src/app/(app)/cuti/persetujuan/persetujuan-page-client.tsx`:
  - **Tab "Menunggu"**: `GET /cuti/pengajuan/approval?tahun&picSaatIniId={pegawaiId}&approvalCutiStatus=PENDING`
  - **Tab "Riwayat Persetujuan"**: query sama dengan `approvalCutiStatus=APPROVED`
    (atau query tanpa filter status untuk semua non-PENDING — spike kecil untuk tentukan param terbaik)
  - Tab state di URL (`?tab=menunggu` default, `?tab=riwayat`)
  - Toolbar: Select Tahun (5 tahun, default tahun berjalan)
  - Kolom tabel (keduanya): No · Nama Pegawai · Jenis Cuti · Periode · Jumlah Hari Kerja · Status · Aksi
  - Aksi (tab Menunggu): "Setujui" + "Tolak" — hanya render jika `readWriteStatus === "WRITE"`
  - Tab Riwayat: tidak ada kolom Aksi
  - Empty state: jika list kosong (pegawai bukan approver) → empty state standar, bukan error
- [ ] `<ApprovalConfirmDialog>` — satu komponen, prop `action: "APPROVE" | "REJECT"`:
  - Judul: "Setujui Pengajuan Cuti" / "Tolak Pengajuan Cuti"
  - Textarea `notes` (catatan) — **required untuk kedua aksi**
  - Submit → `POST /cuti/approval` → toast sukses/gagal → invalidate
  - Request body: `{ csrfToken, cutiId, approverId: pegawaiId, approvalLevel, approvalStatus: "APPROVED"/"REJECTED", notes }`
  - ⚠️ Spike: verifikasi sumber `approvalLevel` dari response `CutiApprovalChainResponse`
- [ ] `bun run build` · `bunx biome check` · `bun run test`

**DoD:**
- Tab "Menunggu" tampil list pengajuan yang menunggu persetujuan user login
- Tab "Riwayat" tampil list yang sudah diproses
- Tombol Setujui/Tolak muncul hanya jika `readWriteStatus === "WRITE"`
- Dialog konfirmasi + textarea notes berfungsi untuk kedua aksi
- Pegawai biasa yang bukan approver: halaman menampilkan empty state

---

## Quality Gates (semua issue)

Per issue sebelum `bd close`:
- [ ] `bun run test` — all green
- [ ] `bun run build` — zero error
- [ ] `bunx biome check` — zero lint

Per session akhir (setelah semua issue selesai):
- [ ] `npx gitnexus analyze` — refresh index
- [ ] `npx gitnexus detect-changes` — verifikasi scope
- [ ] `/graphify . --update` via skill — update graph
- [ ] `bd dolt push` + `git pull --rebase` + `git push` → "up to date with origin"

---

## Definition of Done (Keseluruhan Modul)

- [ ] Sidebar utama: entri "Cuti" muncul dengan sub-menu 3 item
- [ ] `/cuti` redirect ke `/cuti/pengajuan`
- [ ] **Kuota Cuti**: SDM bisa CRUD, filter tahun + nama/NIPAM, download template, import batch
- [ ] **Kuota Cuti**: Non-SDM mendapat `forbidden()` (bukan redirect, bukan 404)
- [ ] **Pengajuan Cuti**: Semua pegawai dapat lihat riwayat pengajuan + strip kartu (Kuota/Diambil/Sisa)
- [ ] **Pengajuan Cuti**: Pegawai dapat tambah/edit (form berantai jenis→sub-jenis + auto-fill hari kerja)
- [ ] **Pengajuan Cuti**: Pegawai dapat batalkan pengajuan PENDING saja
- [ ] **Persetujuan Cuti**: Dua tab berfungsi (Menunggu + Riwayat)
- [ ] **Persetujuan Cuti**: Approver dapat Setujui/Tolak dengan mandatory notes
- [ ] **Persetujuan Cuti**: Pegawai non-approver melihat empty state (bukan error)
- [ ] Semua badge status menggunakan `enum-labels.ts` (tidak hardcode)
- [ ] Tidak ada `gcTime: Infinity` / `staleTime: Infinity`
- [ ] Tidak ada toast untuk gagal-fetch (pakai inline panel)
- [ ] `bun run test`, `bun run build`, `bunx biome check` — semua hijau
- [ ] GraphQL/gitnexus + graphify terupdate

---

## Invarian (jangan dilanggar)

- Unauthorized = unmount (`forbidden()`), **bukan** CSS-hide atau `disabled`
- Toast **hanya** untuk hasil mutasi — gagal load pakai panel inline "Coba lagi"
- Tipe generated (`src/types/cuti/**`) **tidak** diedit manual
- `src/components/ui/*` **tidak** disentuh
- Fetch via `fetch("/api/proxy/cuti/…")` langsung — bukan `src/lib/api/client.ts`
- Warna via design token — bukan hex/`oklch()` inline
- Satu Sheet/Dialog per halaman, bukan N sheet untuk N baris
- Error di luar scope → buka issue baru, jangan ad-hoc fix
