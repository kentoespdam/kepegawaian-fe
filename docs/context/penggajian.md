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

| Sub-grup | Item Sidebar | Audiens | Gate RBAC |
|---|---|---|---|
| **Setup** | `Komponen Gaji` | Staf SDM | `penggajian.setup` |
| | `Pendapatan Non Pajak` | Staf SDM | `penggajian.setup` |
| | `Tunjangan` | Staf SDM | `penggajian.setup` |
| | `Lain-lain` (parameter setting) | Staf SDM | `penggajian.setup` |
| | `Referensi Potongan TKK` | Staf SDM | `penggajian.setup` |
| **Proses Batch** | `Proses Gaji Bulanan` | semua role (konten adaptif) | per-fase (lihat bawah) |

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
| **01 Seting komponen Gaji** | `/penggajian/batch/[id]/setup` | `POST/PUT /penggajian/komponen` | Staf SDM |
| **02 Verifikasi Tahap 1** | `/penggajian/batch/[id]/verifikasi-1` | `PATCH /penggajian/batch/{id}/verify1` | Manager SDM |
| **03 Tambahan Komponen** | `/penggajian/batch/[id]/tambahan` | `POST /penggajian/batch/master/proses` | Spv/Staf Keuangan |
| **04 Verifikasi Tahap 2 & Persetujuan** | `/penggajian/batch/[id]/persetujuan` | `PATCH /batch/{id}/verify2` + `PATCH /batch/{id}/accept` | Manager Keuangan |

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
└── batch/                                # SUB-GRUP: Proses Batch
    ├── page.tsx                          # list batch + Dialog "Buat Proses Gaji Baru"
    └── [id]/
        ├── layout.tsx                    # header info batch + rail stepper
        ├── setup/page.tsx                # fase 01
        ├── verifikasi-1/page.tsx         # fase 02
        ├── tambahan/page.tsx             # fase 03
        └── persetujuan/page.tsx          # fase 04
```

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

| Verb | Pattern | Kegunaan |
|---|---|---|
| POST | `/penggajian/batch` | create batch + upload lampiran TKK (binary `fileName`) |
| GET | `/penggajian/batch/{id}` | detail batch (status, info pemroses/verifikator/penyetju) |
| PATCH | `/penggajian/batch/{id}/verify1` | Manager SDM verifikasi tahap 1 |
| PATCH | `/penggajian/batch/{id}/verify2` | Manager Keuangan verifikasi tahap 2 |
| PATCH | `/penggajian/batch/{id}/accept` | Manager Keuangan approve final |
| PATCH | `/penggajian/batch/{id}/reprocess` | re-proses setelah koreksi |
| PATCH | `/penggajian/batch/master/upload/{rootBatchId}` | upload lampiran tambahan |
| GET | `/penggajian/batch/master/download/table-gaji/{rootBatchId}` | download table gaji (CSV) |
| GET | `/penggajian/batch/master/download/potongan-gaji/{rootBatchId}` | download potongan gaji |
| DELETE | `/penggajian/batch/master/proses/{rootBatchId}/rollback` | rollback batch |

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

**State**: `?profilId=N` di URL sebagai single source of truth. Klik baris kiri → set `profilId`
di URL → panel kanan fetch komponen untuk profil tsb. Konsisten dengan preseden Data Pegawai
→ Ringkasan Panel (CONTEXT-MAP §DataTable filtering).

### 2. Halaman List Batch (`/penggajian/batch`)

Tabel daftar batch dengan filter default by `periode` (combobox tahun+bulan) dan `status` (combobox
status backend). Toolbar: tombol **"+ Buat Proses Gaji Baru"** → Dialog form dengan field:

- `Tahun` (number, required)
- `Bulan` (number 01-12, required)
- `Di Proses Oleh` (text, pre-filled dari session)
- `Jabatan Pemroses` (text, pre-filled dari profil user)
- `Lampiran Potongan TKK` (file upload — backend `fileName` binary)

> **Bug label terdokumentasi**: UI existing salah melabeli field sebagai "Lampiran SK Terminasi"
> padahal backend menerima file **Potongan TKK** (lihat `GajiBatchRootPostRequest.fileName`).
> Revisi: label form = **"Lampiran Potongan TKK"**.

### 3. Layout Detail Batch (`/penggajian/batch/[id]/layout.tsx`)

Komposisi bersama untuk fase 01–04:

- **Header**: periode, status (badge), total pegawai, tanggal proses
- **Rail stepper vertikal** (kiri atau kanan): 4 fase sebagai `<Link>` nyata. Step enabled/disabled
  mengikuti state backend + permission user
- **Konten**: `{children}` (halaman fase yang aktif)

Step locking: fetch info batch via `GET /penggajian/batch/{id}` sekali di layout, share via
React Context (`BatchContext`) ke 4 halaman fase. **Tidak perlu refetch per fase** — pattern
sama dengan `riwayat/layout.tsx`.

### 4. Fase 02 Verifikasi Tahap 1 (read-only breakdown)

UI: **2 kolom** — kiri = tabel pegawai grouped-by-organisasi (sub-header hijau "01. DIREKSI"
dll), kanan = rincian gaji grouped-by-jenis ("Penghasilan" + "Potongan") per-pegawai yang
dipilih. **Tanpa tombol tambah** (read-only). Tombol **Verifikasi** ada di toolbar header
(batch-level, bukan per-baris). Backend: `PATCH /batch/{id}/verify1`.

### 5. Fase 03 Tambahan Komponen Gaji (read + write)

UI sama persis dengan fase 02, **+ tombol "+ Tambah Komponen"** di panel kanan (per group
jenis). Klik tombol → Dialog form dengan field:

- `Nama` (text, required)
- `Jenis Gaji` (radio: `-` / `Pemasukan` / `Potongan`)
- `Nilai` (number, default 0)

Backend: `POST /penggajian/batch/master/proses`.

### 6. Fase 04 Persetujuan Akhir (read + approve)

UI **lebih kaya dari fase 02/03** — tabel eksekutif kiri dengan kolom tambahan:

- `NIK`, `Nama Pegawai`, `Jabatan`, `Penghasilan` (total), `Potongan` (total), `Pembulatan`,
  `Jumlah Bersih` (take-home pay)

Grouped by organisasi dengan **subtotal per group** di bawahnya. Toolbar atas: tombol **Verifikasi**,
**Proses Ulang**, **Kirim Slip Gaji** (oranye — distribusi slip via WA/email).

Tombol **Setujui** ada di header (batch-level) — `PATCH /batch/{id}/accept`. Setelah klik →
status `FINISHED`, semua tombol disabled (read-only).

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

> ADR-0016 sudah dibuat di `docs/adr/0016-penggajian-sub-modul-rbac-workflow.md`.