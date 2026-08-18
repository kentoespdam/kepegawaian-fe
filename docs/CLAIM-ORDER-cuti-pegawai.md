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

### Issue A — Infrastruktur: Layout + Route Stub + Sidebar

**Depends on:** —  (paling awal, kerjakan dulu)

**Scope:**
- [ ] Tambah entri "Cuti" ke sidebar utama (`app-shell.tsx` atau komponen sidebar)
- [ ] Buat `src/app/(app)/cuti/layout.tsx`:
  - Sub-sidebar lateral dengan 3 item: Kuota Cuti, Pengajuan Cuti, Persetujuan Cuti
  - Kuota Cuti: link ke `/cuti/kuota` — item tetap tampil, RBAC di-handle di page-nya
  - Pola: ikuti `kepegawaian/terminasi/layout.tsx` atau layout sub-menu yang sudah ada
- [ ] Buat `src/app/(app)/cuti/page.tsx` — redirect `permanentRedirect("/cuti/pengajuan")`
- [ ] Verifikasi routing: `/cuti`, `/cuti/kuota`, `/cuti/pengajuan`, `/cuti/persetujuan` terdaftar
- [ ] `bun run build` — zero error

**DoD:**
- Navigasi ke `/cuti` redirect ke `/cuti/pengajuan`
- Sub-sidebar muncul dengan 3 item, active state highlight sesuai route
- `bun run build` clean

---

### Issue B — Kuota Cuti: Tabel + Filter + CRUD Sheet

**Depends on:** Issue A selesai

**Scope:**
- [ ] `src/app/(app)/cuti/kuota/page.tsx`:
  - Server component — `verifySession()` + `getAccountSession()`
  - Gate RBAC: `can(roles, "manage", "kuota-cuti")` → `forbidden()` jika bukan SDM
  - Render `<KuotaPageClient />`
- [ ] `src/app/(app)/cuti/kuota/kuota-page-client.tsx`:
  - Query: `GET /api/proxy/cuti/kuota` — queryKey `["cuti-kuota", tahun, nama, nipam, page, size]`
  - `staleTime: 30_000`, `gcTime: 300_000`, `placeholderData: keepPreviousData`
  - Toolbar: Select Tahun (rentang 5 tahun, default tahun berjalan) + search Nama/NIPAM
  - URL = sumber kebenaran (`tahun`, `nama`, `nipam`, `page`, `size` di searchParams)
  - Kolom: No · Nama Pegawai · NIPAM · Tahun · Kuota · Tambahan · Terpakai · Sisa · Expired · Aksi
  - Tombol "+ Tambah" → Sheet form Tambah
  - Aksi row: Edit (sheet) · Hapus (`<ConfirmDeleteDialog>`)
  - State: isPending → skeleton · isPlaceholderData → dim · isError → inline retry
- [ ] Form Sheet (Tambah + Edit):
  - Field: Pegawai picker (FK `/pegawai/list`), Tahun, Kuota, Kuota Tambahan, Sisa Kuota, Expired
  - Zod schema: `pegawaiId` required, `tahun` required (≥2000), `expired` required
  - Edit mode: pre-fill dari data row
  - `POST /cuti/kuota` / `PUT /cuti/kuota/{id}` → toast sukses/gagal → invalidate
- [ ] Hapus: `DELETE /cuti/kuota/{id}` → `<ConfirmDeleteDialog>` (type HAPUS) → handle 409 inline
- [ ] `bun run build` · `bunx biome check` · `bun run test`

**DoD:**
- SDM dapat melihat tabel kuota, filter tahun + nama/NIPAM berfungsi
- CRUD (tambah/edit/hapus) berfungsi + toast sukses/gagal
- Non-SDM mendapat `forbidden()` saat akses `/cuti/kuota`

---

### Issue C — Kuota Cuti: Import Batch + Download Template

**Depends on:** Issue B selesai

**Scope:**
- [ ] Tambah tombol "Unduh Template" di toolbar Kuota:
  - Klik → `GET /api/proxy/cuti/kuota/template` → trigger download (pakai `window.open` atau anchor `download`)
- [ ] Dialog Import:
  - Tombol "Import" di toolbar → buka modal dialog
  - Field: Select Tahun (integer, ≥2000) + File input (accept Excel/CSV)
  - Submit → `POST /api/proxy/cuti/kuota/import` (multipart/form-data)
  - Response `SavedResultString.data` berisi summary → tampilkan di info panel dalam dialog
  - Sukses → tutup dialog + invalidate query kuota + toast ringkas
  - Error → tampilkan error dalam dialog (jangan toast; user perlu baca detail)
- [ ] `bun run build` · `bunx biome check`

**DoD:**
- Download template memicu file download
- Upload file + tahun → summary sukses/gagal ditampilkan
- Tabel refresh setelah import sukses

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
