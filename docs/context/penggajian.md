# Konteks modul: `penggajian`

> Delta modul. Baca [CONTEXT-MAP.md](../../CONTEXT-MAP.md) (inti bersama) dulu.
> Modul ini **mengkonsolidasikan proses payroll bulanan** untuk Perumdam Tirta Satria —
> dari setup komponen master hingga persetujuan akhir slip gaji. Resource backend: `penggajian/*`
> (lihat `docs/api/penggajian/api.json`).

> **Status:** ✅ grilling selesai 2026-08-31. Implementasi bertahap per milestone
> (lihat papan pantau [`docs/CLAIM-ORDER-penggajian-*.md`](../CLAIM-ORDER-penggajian-*.md)).

## Ringkas

Modul **Penggajian** = grup sidebar dengan **2 sub-grup**: **Setup** (5 master CRUD) dan
**Proses Batch** (workflow 4 fase). Bukan module flat seperti Master (17 entitas homogen),
melainkan **2 domain yang dibedakan secara tegas**: konfigurasi vs eksekusi.

| Sub-grup | Item Sidebar | Ikon | Audiens | Gate RBAC |
|---|---|---|---|---|
| **Setting** | `Setting Komponen Gaji` | ⚙️ | Staf SDM | `penggajian.setup` |
| | `Setting Pendapatan Non Pajak` | ⚙️ | Staf SDM | `penggajian.setup` |
| | `Setting Tunjangan` | ⚙️ | Staf SDM | `penggajian.setup` |
| | `Setting Lain-lain` | ⚙️ | Staf SDM | `penggajian.setup` |
| | `Setting Ref Potongan TKK` | ⚙️ | Staf SDM | `penggajian.setup` |
| **Proses Batch** | `01. Proses Gaji Bulanan` | ≡ | semua role (konten adaptif) | per-fase (lihat bawah) |
| | `02. Verifikasi Gapok, Tunjangan & Potongan` | ≡ | Manager SDM | `verify1` |
| | `03. Tambah Komponen Gaji` | ≡ | Spv/Staf Keuangan | `tambahan` |
| | `04. Persetujuan Akhir` | ≡ | Manager Keuangan | `approve` |

> **Resolusi open-question struktur**: proses payroll dipisah jadi **2 sub-grup** (bukan flat
> 8-item atau 1 grup besar) karena perbedaan domain — setup adalah CRUD master (jarang disentuh),
> sedangkan proses batch adalah workflow multi-fase (rutin bulanan). Lihat [ADR-0016 (akan dibuat)]
> untuk konteks lengkap.

## State Machine Workflow Proses Batch

Backend (`batch-root-controller`) menyediakan state machine payroll berikut:

```
PENDING → PROSES → WAIT_VERIFICATION_PHASE_1 → WAIT_VERIFICATION_PHASE_2 → WAIT_APPROVAL → FINISHED
                                                          ↓
                                                        FAILED (rollback via /rollback)
```

| Fase | Route | Aksi Backend | Peran |
|---|---|---|---|
| **01 Seting & Proses Gaji** | `/penggajian/proses-gaji` | `POST /penggajian/batch`, `PATCH /penggajian/batch/{id}/reprocess` | Staf SDM |
| **02 Verifikasi Tahap 1** | `/penggajian/verifikasi` | `PATCH /penggajian/batch/{id}/verify1` | Manager SDM |
| **03 Tambahan Komponen** | `/penggajian/tambahan` | `POST /penggajian/batch/master/proses`, `PATCH /penggajian/batch/{id}/verify2`, `DELETE /penggajian/batch/master/proses/{id}/rollback` | Spv/Staf Keuangan |
| **04 Persetujuan Akhir** | `/penggajian/persetujuan` | `PATCH /penggajian/batch/{id}/accept`, `PATCH /penggajian/batch/master/upload/{id}` | Direktur Utama / Manager Keuangan |

> **Catatan krusial**: Urutan fase **harus sama dengan urutan user**, karena setiap fase
> membaca output fase sebelumnya. Step `03 Tambahan` **tidak menampilkan data** sampai
> `02 Verifikasi` selesai. Step `04` tidak aktif sampai `03` selesai. UI encode ini via
> **step locking** di rail stepper (gabungan status backend + permission user).

## Route Map

```
app/(app)/penggajian/
├── layout.tsx                            # (jika perlu shared shell)
├── page.tsx                              # landing — redirect ke setup atau batch
│
├── setup/                                # SUB-GRUP: Setup Master
│   ├── komponen/page.tsx                 # parent-child Profil → Komponen (?profilId=)
│   ├── pendapatan-non-pajak/page.tsx     # flat CRUD
│   ├── tunjangan/page.tsx                # flat CRUD + filter by jenis
│   ├── parameter-setting/page.tsx        # flat CRUD (label UI: "Lain-lain")
│   └── potongan-tkk/page.tsx             # flat CRUD
│
├── proses-gaji/page.tsx                  # 01. Proses Gaji Bulanan (filter: text period + status)
├── verifikasi/page.tsx                   # 02. Verifikasi Gapok, Tunjangan & Potongan (filter: year + month + search)
├── tambahan/page.tsx                     # 03. Tambah Komponen Gaji (filter: year + month + search)
└── persetujuan/page.tsx                  # 04. Persetujuan Akhir (filter: year + month + search)
```

> **Resolusi arsitektur (2026-09-02):** Halaman fase batch diubah dari nested `[id]` menjadi
> standalone dengan filter periode (tahun+bulan). Batch lookup by period, bukan by ID.
> Lihat ADR-0017 (akan dibuat) untuk konteks lengkap.
>
> **Standarisasi Filter Periode (2026-09-03):**
> Filter periode pada fase `02. Verifikasi` dan `03. Tambahan` menggunakan shared global hook
> `usePeriodeFilter` (`src/hooks/usePeriodeFilter.ts`) dan shared component `PeriodeSelect` (`src/components/periode-filter.tsx`).
> Filter periode disinkronkan ke URL query parameter `?year=YYYY&month=MM` (misal: `?year=2026&month=09`)
> sebagai single source of truth saat halaman di-reload, dengan fallback otomatis ke periode berjalan.
> Tampilan dropdown bulan menyajikan nama bulan murni dalam bahasa Indonesia (Januari–Desember) pada trigger maupun menu,
> dengan pengiriman filter tetap berupa nilai dua digit (`01`–`12`).
>
> **Standarisasi Shared Panel Penggajian (2026-09-03):**
> Panel kiri (tabel pegawai per organisasi) dan panel kanan (rincian gaji komponen pemasukan & potongan)
> telah distandarisasi menjadi shared global components:
> 1. `PegawaiOrganisasiTable` (`src/components/pegawai-organisasi-table.tsx`): Menangani wrapper tabel,
>    pencarian terintegrasi, grouping organisasi, header sticky, baris subheader unit, dan highlighting pegawai terpilih.
>    Mendukung `variant="verifikasi"` dan `variant="tambahan"`.
> 2. `RincianGajiPanel` (`src/components/rincian-gaji-panel.tsx`): Menampilkan rincian komponen gaji (Pemasukan & Potongan),
>    subtotal kalkulasi Rupiah, dan dialog tambah/hapus komponen interaktif yang dapat diaktifkan via prop `canEdit`.


## RBAC Granular per Fase (4 permission)

| Role | `setup` | `verify1` | `tambahan` | `approve` |
|---|---|---|---|---|
| `staf-sdm` | ✓ | ✗ | ✗ | ✗ |
| `manager-sdm` | ✗ | ✓ | ✗ | ✗ |
| `staf-keuangan` | ✗ | ✗ | ✓ | ✗ |
| `manager-keuangan` | ✗ | ✗ | ✗ | ✓ |
| `admin` | ✓ | ✓ | ✓ | ✓ |
| `viewer` | view-only semua fase | | | |

**Enforcement**: step di rail stepper **enabled** = (status backend sesuai fase) AND (user
punya permission untuk fase tsb). Step yang tidak accessible = **greyed-out dengan tooltip
"Belum saatnya" atau "Tidak memiliki akses"** (unmount ditolak di sini karena step lain
berguna sebagai visualisasi state machine).

## Endpoint Conventions

Modul ini menggunakan shape endpoint standar (lihat CONTEXT-MAP §Endpoint conventions) dengan
prefix **`/penggajian`**:

| Verb | Pattern | Kegunaan |
|---|---|---|
| GET | `/penggajian/{entity}` | list paginated (untuk tabel admin) |
| GET | `/penggajian/{entity}/list` | unpaginated (untuk combobox FK / picker parent) |
| GET | `/penggajian/{entity}/{id}` | detail |
| POST | `/penggajian/{entity}` | create |
| PUT | `/penggajian/{entity}/{id}` | update |
| DELETE | `/penggajian/{entity}/{id}` | delete |

> **Contoh konkret `profil`**: `GET /penggajian/profil` = list paginated (untuk tabel admin jika
> nanti ada halaman admin terpisah), `GET /penggajian/profil/list` = list unpaginated (untuk
> panel kiri di `/setup/komponen` & combobox FK di form lain). Keduanya return shape berbeda
> (`PageEnvelope` vs `Envelope<T[]>`) — lihat `src/types/_shared.ts`.

**Special endpoints** (batch workflow):

Semua endpoint PATCH batch mewajibkan header `Content-Type: application/json` dan payload `requestBody` berformat JSON (`GajiBatchRootProcessRequest`):
```json
{
  "id": "string (batchRootId)",
  "nama": "string (nama user pemroses/verifikator/approver)",
  "jabatan": "string (jabatan user pemroses/verifikator/approver)",
  "phase": "StatusBatch (target phase atau status saat ini)"
}
```

> **Aturan Kalkulasi Parameter `phase` pada Reprocess (`/reprocess`):**
> Nilai `phase = status sekarang - 1`. Khusus saat status batch sekarang = `WAIT_VERIFICATION_PHASE_1`, nilai target `phase = "PENDING"`.
> - `WAIT_APPROVAL` → target `phase: "WAIT_VERIFICATION_PHASE_2"`
> - `WAIT_VERIFICATION_PHASE_2` → target `phase: "WAIT_VERIFICATION_PHASE_1"`
> - `WAIT_VERIFICATION_PHASE_1`, `PROSES`, `PENDING`, `FAILED` → target `phase: "PENDING"`

| Verb | Pattern | Payload / Form | Kegunaan |
|---|---|---|---|
| POST | `/penggajian/batch` | FormData (`fileName` potongan TKK + field `tahun`, `bulan`, `diProsesOleh`, `jabatanPemroses`) | create batch baru |
| GET | `/penggajian/batch/{id}` | - | detail batch (status, info pemroses/verifikator/penyetuju) |
| PATCH | `/penggajian/batch/{id}/verify1` | `GajiBatchRootProcessRequest` (`phase: WAIT_VERIFICATION_PHASE_1`) | Manager SDM verifikasi tahap 1 (transisi ke `WAIT_VERIFICATION_PHASE_2`) |
| PATCH | `/penggajian/batch/{id}/verify2` | `GajiBatchRootProcessRequest` (`phase: WAIT_VERIFICATION_PHASE_2`) | Spv/Staf Keuangan verifikasi tahap 2 (transisi ke `WAIT_APPROVAL`) |
| PATCH | `/penggajian/batch/{id}/accept` | `GajiBatchRootProcessRequest` (`phase: WAIT_APPROVAL`) | Direktur Utama / Manager Keuangan approve final (transisi ke `FINISHED`) |
| PATCH | `/penggajian/batch/{id}/reprocess` | `GajiBatchRootProcessRequest` (`phase: targetPhase`) | Proses ulang batch mundur 1 tahap |
| PATCH | `/penggajian/batch/master/upload/{rootBatchId}` | `GajiBatchRootProcessRequest` | Kirim & upload slip gaji pegawai |
| GET | `/penggajian/batch/master/download/table-gaji/{rootBatchId}` | - | download table gaji |
| GET | `/penggajian/batch/master/download/potongan-gaji/{rootBatchId}` | - | download potongan gaji |
| DELETE | `/penggajian/batch/master/proses/{rootBatchId}/rollback` | - | rollback semua potongan & tambahan ke status awal |

## Entity & Pattern Khas

### 1. Setup Komponen Gaji (parent-child pattern)

`/penggajian/setup/komponen` = halaman setup master komponen. UI: **2 panel berdampingan**:

- **Panel kiri**: daftar Profil Gaji (`No`, `Nama`, `Aksi`) — `<DataTable>` ringkas
- **Panel kanan**: daftar Komponen Gaji Pegawai untuk profil yang dipilih (`Aksi`, `Urut`, `Kode`,
  `Nama`, `Jenis Gaji`, `Nilai`, `Formula`) — `<DataTable>` penuh + paging

**Endpoint mapping**:
- **Panel kiri** (`useProfilList`) → `GET /penggajian/profil/list` (unpaginated, sesuai pola
  combobox-of-id FK di CONTEXT-MAP §DataTable filtering). Cache per-entity di query cache —
  dipakai juga oleh FK combobox di form entitas lain.
- **Panel kanan** (`useKomponenByProfil`) → `GET /penggajian/komponen/{profilId}/profil`
- **Formula shortcuts** → `GET /penggajian/komponen/{profilId}/kode` (available kode)
- **Urut auto-fill** → `GET /penggajian/komponen/{profilId}/profil/urut` (next urutan)

**Formula Editor**: dialog Tambah/Edit Komponen dilengkapi `<FormulaEditor>` — textarea auto-grow
+ shortcut buttons (operator `+-*/()` + available kode chips by jenis). Hook `useKomponenForm`
mengelola state, fetch kode/urut, auto-fill urut (create mode), exclude kode sendiri (edit mode),
dan `appendKode`/`formatFormula` pure functions (testable).

**State**: `?profilId=N` di URL sebagai single source of truth. Klik baris kiri → set `profilId`
di URL → panel kanan fetch komponen untuk profil tsb. Konsisten dengan preseden Data Pegawai
→ Ringkasan Panel (CONTEXT-MAP §DataTable filtering).

### 2. Halaman List Batch (`/penggajian/proses-gaji`)

Tabel daftar batch dengan filter default by `periode` (combobox tahun+bulan) dan `status` (combobox
status backend).

**Aksi Tabel (`<DataTable>` Kolom Aksi)**:
- **Proses Ulang (`PATCH /penggajian/batch/{id}/reprocess`)**:
  - Syarat Status: Hanya aktif untuk batch berstatus **`PENDING`** atau **`FAILED`**.
  - Syarat RBAC: Membutuhkan permission `PENGGAJIAN:PROCESS`, `PENGGAJIAN:WRITE`, atau `PENGGAJIAN:SETUP` (atau role `ADMIN`).
  - UX: Menggunakan modal konfirmasi ringan (`<AlertDialog>`) sebelum mengeksekusi request.
- **Hapus (`DELETE /penggajian/batch/{id}`)**:
  - Syarat Status: Boleh untuk semua status **selain `FINISHED`** (dan bukan saat `PROSES`).
  - Syarat RBAC: Membutuhkan permission `PENGGAJIAN:DELETE` (atau role `ADMIN`).
  - UX: Menggunakan `<ConfirmDeleteDialog>` standar (pengguna wajib mengetik `"HAPUS"`).

Toolbar: tombol **"+ Buat Proses Gaji Baru"** → Dialog form dengan field:

- `Tahun` (number, required)
- `Bulan` (number 01-12, required)
- `Di Proses Oleh` (text, pre-filled dari session)
- `Jabatan Pemroses` (text, pre-filled dari profil user)
- `Lampiran Potongan TKK` (file upload — backend `fileName` binary)

> **Bug label terdokumentasi**: UI existing salah melabeli field sebagai "Lampiran SK Terminasi"
> padahal backend menerima file **Potongan TKK** (lihat `GajiBatchRootPostRequest.fileName`).
> Revisi: label form = **"Lampiran Potongan TKK"**.

### 3. Fase 01: Proses Gaji Bulanan (`/penggajian/proses-gaji`)

Halaman standalone untuk manajemen batch penggajian:
- Tabel batch dengan filter `periode` dan `status`.
- Tombol **"+ Buat Proses Gaji Baru"** (Form dialog upload file potongan TKK + info session pemroses).
- Aksi baris: **Proses Ulang** (`PATCH /penggajian/batch/{id}/reprocess` dengan payload `GajiBatchRootProcessRequest`) dan **Hapus** (`DELETE /penggajian/batch/{id}`).
- Shortcut link fase (02, 03, 04) dengan query params `?year=YYYY&month=MM`.

### 4. Fase 02: Verifikasi Tahap 1 (`/penggajian/verifikasi`)

Halaman standalone read-only breakdown:
- UI **2 kolom**: kiri = `<PegawaiOrganisasiTable>` (grouped by organisasi), kanan = `<RincianGajiPanel>` (komponen gaji pemasukan & potongan per pegawai).
- Toolbar atas: filter periode (`PeriodeSelect`), tombol **Download Table Gaji**, tombol **Proses Ulang** (mundur ke `PENDING`), dan tombol **Verifikasi Tahap 1**.
- Eksekusi Verifikasi: `PATCH /penggajian/batch/{id}/verify1` dengan body `GajiBatchRootProcessRequest` (`phase: "WAIT_VERIFICATION_PHASE_1"`) via modal konfirmasi `<AlertDialog>`. Status berubah ke `WAIT_VERIFICATION_PHASE_2`.

### 5. Fase 03: Tambahan Komponen Gaji (`/penggajian/tambahan`)

Halaman standalone read + write:
- UI **2 kolom**: tabel pegawai + panel rincian dengan kemampuan tambah/hapus komponen tambahan per pegawai.
- Tambah komponen: `POST /penggajian/batch/master/proses`.
- Upload potongan: `POST /penggajian/batch/master/proses/upload/{rootBatchId}`.
- Rollback: `DELETE /penggajian/batch/master/proses/{rootBatchId}/rollback` (via modal konfirmasi).
- Toolbar atas: tombol **Proses Ulang** (`PATCH /penggajian/batch/{id}/reprocess` dengan `phase: "WAIT_VERIFICATION_PHASE_1"`) dan tombol **Verifikasi Tahap 2** (`PATCH /penggajian/batch/{id}/verify2` dengan body `GajiBatchRootProcessRequest`, `phase: "WAIT_VERIFICATION_PHASE_2"`) via modal konfirmasi `<AlertDialog>`. Status berubah ke `WAIT_APPROVAL`.

### 6. Fase 04: Persetujuan Akhir (`/penggajian/persetujuan`)

Halaman standalone rekapitulasi eksekutif & approval:
- UI **2 kolom**: kiri = `<PegawaiOrganisasiTable variant="persetujuan">` (dengan kolom take-home pay, total potongan, pembulatan, subtotal per unit kerja), kanan = `<RincianGajiPanel>` (read-only).
- Toolbar atas:
  - **Download Table Gaji**: `GET /penggajian/batch/master/download/table-gaji/{id}`.
  - **Proses Ulang**: `PATCH /penggajian/batch/{id}/reprocess` dengan `phase: "WAIT_VERIFICATION_PHASE_2"` via modal konfirmasi `<AlertDialog>`.
  - **Kirim Slip Gaji**: `PATCH /penggajian/batch/master/upload/{id}` via modal konfirmasi `<AlertDialog>`.
  - **Setujui**: `PATCH /penggajian/batch/{id}/accept` dengan body `GajiBatchRootProcessRequest` (`phase: "WAIT_APPROVAL"`) via modal konfirmasi `<AlertDialog>`. Setelah disetujui, status menjadi `FINISHED` dan terkunci.

## Tipe Generated

Semua tipe sudah di-generate di `src/types/penggajian/` (jangan diedit manual):

- `dasar-gaji.ts` — gapok by periode
- `detail-dasar-gaji.ts` — gapok detail by golongan + masa kerja
- `phdp.ts` — Pengahasiln Dasar Perhitungan Pajak
- `profil.ts` — profil gaji
- `komponen.ts` — komponen gaji (PEMASUKAN/POTONGAN, REF)
- `tunjangan.ts` — master tunjangan (grouped by jenis)
- `pendapatan-non-pajak.ts` — PNP
- `potongan-tkk.ts` — referensi potongan TKK
- `parameter-setting.ts` — parameter konfigurasi
- `batch.ts` — batch root + master proses (state machine)
- `batch-master.ts` — tambahan komponen per batch

> Regenerate dengan: `node docs/api/extract-types.js` (lihat `docs/api/penggajian/`).

## Pola Code (sama dengan project)

| Aspek | Aturan |
|---|---|
| Pages | Server component tipis → client component (konsisten dengan master) |
| Tables | `<DataTable>` + `<DataTableToolbar>` + `<DataTablePagination>` |
| Forms | `<CrudForm>` + Zod schema per entity — DRY via shared primitive |
| Mutations | `useMutation` + `invalidateQueries` — no optimistic removal |
| Delete | `<ConfirmDeleteDialog>` — type `HAPUS` to enable |
| RBAC | `can(roles, action, entity)` — unmount untuk unauthorized (step rail: greyed-out, BUKAN unmount) |
| Data fetching | Client TanStack Query via `/api/proxy/*` |
| File upload | via FormData (binary `fileName`), bukan JSON |

## Papan Pantau Implementasi

| Milestone | File | Status |
|---|---|---|
| M1 Fondasi | `docs/CLAIM-ORDER-penggajian-fondasi.md` | ✅ Done |
| M2 Setup Master | `docs/CLAIM-ORDER-penggajian-setup-master.md` | ✅ Done |
| M3 List Batch + Dialog Create | `docs/CLAIM-ORDER-penggajian-batch-list.md` | ✅ Done |
| M4 Fase 01 Seting | `docs/CLAIM-ORDER-penggajian-fase-01.md` | ✅ Done |
| M5 Fase 02 Verifikasi | `docs/CLAIM-ORDER-penggajian-fase-02.md` | ✅ Done |
| M6 Fase 03 Tambahan | `docs/CLAIM-ORDER-penggajian-fase-03.md` | ✅ Done |
| M7 Fase 04 Persetujuan | `docs/CLAIM-ORDER-penggajian-fase-04.md` | ✅ Done |
| M8 Formula Editor | `docs/CLAIM-ORDER-penggajian-formula-editor.md` | ✅ Done |

> ADR-0016 sudah dibuat di `docs/adr/0016-penggajian-sub-modul-rbac-workflow.md`.