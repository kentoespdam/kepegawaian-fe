# Konteks modul: `kepegawaian`

> Delta modul. Baca [CONTEXT-MAP.md](../../CONTEXT-MAP.md) (inti bersama) dulu.
> Modul ini **mengonsumsi** resource `pegawai` (lihat [pegawai.md](pegawai.md)) + `kepegawaian`,
> `profil`, `penggajian`. Ia **menyajikan** data lintas-resource untuk page di bawah menu sidebar
> "Kepegawaian" — plus (sejak Page 4) **CRUD riwayat** atas resource `kepegawaian/riwayat/*`.

> **File ini = tulang punggung modul** (Ringkas + identity bridge + Page 2/3 + Status).
> Dua page besar dipecah ke berkas sendiri demi hemat token — **muat hanya yang disentuh**:
>
> | Kalau menyentuh… | Muat |
> |---|---|
> | Dashboard Pegawai (§Page 1) | [`kepegawaian-dashboard.md`](kepegawaian-dashboard.md) |
> | Konsol Riwayat per-pegawai (§Page 4, Keputusan 1–12) | [`kepegawaian-riwayat.md`](kepegawaian-riwayat.md) |
> | Page 2 / Page 3 / identitas / status | file ini saja — cukup |

## Ringkas

Menu **Kepegawaian** = grup sidebar dengan **3 item sidebar** (Dashboard, Data, Terminasi).
Bukan collection master (tanpa `/master/{entity}`), bukan resource tunggal — melainkan
**komposisi view** atas resource yang sudah ada. Page 4 (Riwayat Pegawai) **bukan item sidebar** —
ia sub-route drill-down dari Data Pegawai.

| Page | Route | Audiens | Gate |
|---|---|---|---|
| **Dashboard Pegawai** | `(app)/kepegawaian/dashboard` | setiap pegawai (data diri) | terbuka semua login |
| **Data Pegawai** | `(app)/kepegawaian/data` | HR/admin | `hasPermission(permissions, PERMISSION.PEGAWAI_READ, roles)` |
| **Riwayat Pegawai** | `(app)/kepegawaian/data/[pegawaiId]/riwayat/[kategori]` | HR/admin | (lihat [kepegawaian-riwayat.md](kepegawaian-riwayat.md)) |
| **Terminasi Pegawai** | `(app)/kepegawaian/terminasi` | HR/admin | `hasPermission(permissions, PERMISSION.PEGAWAI_READ, roles)` |

> **Resolusi open-question `riwayat`** (CONTEXT-MAP): **riwayat = sub-area di dalam kepegawaian**,
> BUKAN modul ke-7. Dashboard memakai riwayat karier + disiplin; Terminasi memakai riwayat/terminasi.
> Rail tetap **6 modul**.

## Identitas → record pegawai (identity bridge kepegawaian)

Lihat [ADR-0006](../adr/0006-pegawai-session-identity-bridge.md). Ringkas:

- `session.$id` (Appwrite) **= `pegawaiId`** — dipakai langsung, tanpa lookup.
- `nipam` + `nik` **diambil dari** `GET /pegawai/{$id}` → `PegawaiResponseDetail.nipam` &
  `.biodata.nik`. **Bukan** diturunkan dari prefix email (asumsi konvensi email ditolak — lihat ADR).
- Fungsi baru **`getPegawaiSession()`** (`src/lib/auth/pegawaiSession.ts`), `cache()`-wrapped,
  **opt-in**: `verifySession()` tetap murni 1-fetch identitas Appwrite. Hanya page yang butuh data
  pegawai memanggil `getPegawaiSession()` → bayar fetch kedua **saat perlu saja**.
- Toleransi non-pegawai: `GET /pegawai/{$id}` 404 → `pegawai: null` → **empty-state** ramah
  ("Akun ini tidak terhubung ke data pegawai"), bukan error. Empty state dirender di
  **client** (server pass data nullable) — pola sama dengan `/cuti/pengajuan` (CU-6) sejak
  2026-08-18.

Fan-out `$id`/`nik` ke endpoint:

| Butuh | Endpoint | Kunci |
|---|---|---|
| Ringkasan / detail pegawai | `/pegawai/{$id}` , `/pegawai/{$id}/ringkasan` | `$id` |
| Riwayat karier | `/kepegawaian/riwayat/{sk\|mutasi\|kontrak}/pegawai/{$id}` | `$id` |
| Riwayat disiplin (SP) | `/kepegawaian/riwayat/sp/pegawai/{$id}` | `$id` |
| Slip gaji | `/penggajian/batch/master/pegawai/{$id}` | `$id` |
| Dashboard biodata | `/profil/biodata/{nik}/dashboard` | `nik` (string) |
| Biodata CRUD | `/profil/biodata/{nik}` | `nik` (string) |
| Data keluarga | `/profil/keluarga?biodataId={nik}` | `nik` |

## Page 1 — Dashboard Pegawai (self-edit biodata)

→ Dipecah ke [**`kepegawaian-dashboard.md`**](kepegawaian-dashboard.md): 9 field self-edit
(`PATCH /profil/biodata/{nik}`), approval tracking `changedStatus`, layout 2 panel + accordion
(ADR-[0011](../adr/0011-dashboard-two-panel-accordion.md)/[0012](../adr/0012-dashboard-self-edit-biodata.md)),
10 section panel kanan.

## Page 2 — Data Pegawai (3 tab)

Tabel banyak-pegawai untuk HR. Tab beralih sumber:

| Tab | Endpoint | Filter |
|---|---|---|
| **Aktif** | `/pegawai` | `statusKerja=KARYAWAN_AKTIF` |
| **Non-aktif** | `/pegawai` | `statusKerja=BERHENTI_OR_KELUAR` (+`DIRUMAHKAN` bila perlu) |
| **Non-pegawai** | `/profil/biodata` | `isPegawai=false` |

> **Pensiun BUKAN tab di sini.** `/pegawai` tak punya filter `tmtPensiun≤today`; semua urusan pensiun
> dipusatkan di page Terminasi. Menaruhnya di dua tempat = duplikasi + istilah kabur.

## Page 3 — Terminasi Pegawai (2 tab)

> **Istilah "Terminasi"** = payung semua bentuk berhenti — pensiun (normal) **maupun** diberhentikan.
> `alasanTerminasi` (entity master) yang membedakan sebab. Calon Pensiun & Sudah Terminasi = **dua fase
> garis waktu yang sama**: pegawai bergerak dari "akan pensiun" → begitu di-SK → "sudah terminasi".

| Tab | Endpoint | Filter |
|---|---|---|
| **Calon Pensiun** | `/kepegawaian/riwayat/terminasi/calon-pensiun` | `tahunPensiun` (dropdown tahun, default berjalan) |
| **Sudah Terminasi** | `/kepegawaian/riwayat/terminasi` | `tahunTerminasi` (dropdown) + kolom & filter `alasanTerminasi` (`alasanTerminasiId`) |

## Page 4 — Riwayat Pegawai (drill-down per-pegawai, konsol CRUD)

→ Dipecah ke [**`kepegawaian-riwayat.md`**](kepegawaian-riwayat.md): Keputusan 1–12 lengkap
(scope CRUD bertahap, route per kategori → [ADR-0013](../adr/0013-riwayat-route-per-kategori.md),
entry point, kolom Aksi, kartu Lampiran, filter, form Mutasi, bentuk tabel, upload, RBAC,
kunci identitas, cuti Fase 2). Papan pantau implementasi:
[`CLAIM-ORDER-riwayat-pegawai.md`](../CLAIM-ORDER-riwayat-pegawai.md).

## Status

- ✅ Grilling round 1 selesai (identitas, 3 page, gating, istilah). Keputusan terkunci di doc ini + ADR-0006.
- ✅ **Grilling round 2** (2026-08-14) — Terminasi: fitur tambah terminasi pegawai. Keputusan terkunci di [`CLAIM-ORDER-terminasi-tambah.md`](../CLAIM-ORDER-terminasi-tambah.md). Issue: `kepegawaian-fe-9uqt`.
- ✅ **W1** — Generate tipe (`kepegawaian-fe-0is`) & verifikasi backend batch (`kepegawaian-fe-oqp`).
- ✅ **W2** — `getPegawaiSession()` (`kepegawaian-fe-djv`), Data Pegawai 3 tab (`kepegawaian-fe-hnc`), Terminasi 2 tab (`kepegawaian-fe-vfe`).
- ✅ **W3** — Dashboard Pegawai read-only 5 section (`kepegawaian-fe-tvr`).
- 🔄 **W5** — Dashboard re-layout 2 panel + accordion (ADR-0011). Grilling round 2 selesai; layout terkunci di [kepegawaian-dashboard.md](kepegawaian-dashboard.md) + ADR-0011. Implementasi = beads issue (delegasi agen).
- ✅ **W4** — Sidebar grup Kepegawaian + 3 sub-item (`kepegawaian-fe-9cm`).
- ✅ **Epic tutup** — `kepegawaian-fe-a2e` closed.
- ✅ **Sync tipe** — `PegawaiTableResponse` (table flat) & `PegawaiResponseSession` (session ringan) tersedia di `src/types/pegawai/pegawai.ts`.
- ✅ **Modul baru** — `laporanKepegawaian` terdaftar di generator, tipe di `src/types/laporan/kepegawaian.ts`.
- ✅ **changedStatus** — endpoint dashboard migrasi ke `GET /profil/biodata/{nik}/dashboard`, badge "Menunggu" + tooltip di title "Data Pribadi". Tipe di-generate via `extract-types.js`.
  - ⏳ Alur approval penuh dari admin (review + approve/reject) masih menyusul.
- ✅ **Tooltip fix** — `TooltipTrigger` Base UI render sbg `<button>` secara default, bentrok dengan `AccordionTrigger` (juga `<button>`). Fix: `render={<span />}` agar valid HTML. Lihat `section-left-panel.tsx`.
- ⏳ Dashboard masih membutuhkan backend nyata untuk data lives.
- 🔄 **Riwayat Pegawai (Page 4)** — desain terkunci ([kepegawaian-riwayat.md](kepegawaian-riwayat.md) + ADR-0013). Implementasi = epic `kepegawaian-fe-7eo5` (anak `.1`–`.6`).
