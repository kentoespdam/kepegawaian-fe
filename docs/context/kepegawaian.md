# Konteks modul: `kepegawaian`

> Delta modul. Baca [CONTEXT-MAP.md](../../CONTEXT-MAP.md) (inti bersama) dulu.
> Modul ini **mengonsumsi** resource `pegawai` (lihat [pegawai.md](pegawai.md)) + `kepegawaian`,
> `profil`, `penggajian`. Ia tidak punya CRUD sendiri — ia **menyajikan** data lintas-resource
> untuk 3 page di bawah menu sidebar "Kepegawaian".

## Ringkas

Menu **Kepegawaian** = grup sidebar dengan **3 page**. Bukan collection master (tanpa
`/master/{entity}`), bukan resource tunggal — melainkan **komposisi view** atas resource yang
sudah ada.

| Page | Route | Audiens | Gate |
|---|---|---|---|
| **Dashboard Pegawai** | `(app)/kepegawaian/dashboard` | setiap pegawai (data diri) | terbuka semua login |
| **Data Pegawai** | `(app)/kepegawaian/data` | HR/admin | `can(roles,"view","pegawai")` |
| **Terminasi Pegawai** | `(app)/kepegawaian/terminasi` | HR/admin | `can(roles,"view","pegawai")` |

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
  ("Akun ini tidak terhubung ke data pegawai"), bukan error.

Fan-out `$id`/`nik` ke endpoint:

| Butuh | Endpoint | Kunci |
|---|---|---|
| Ringkasan / detail pegawai | `/pegawai/{$id}` , `/pegawai/{$id}/ringkasan` | `$id` |
| Riwayat karier | `/kepegawaian/riwayat/{sk\|mutasi\|kontrak}/pegawai/{$id}` | `$id` |
| Riwayat disiplin (SP) | `/kepegawaian/riwayat/sp/pegawai/{$id}` | `$id` |
| Slip gaji | `/penggajian/batch/master/pegawai/{$id}` | `$id` |
| Biodata detail | `/profil/biodata/{nik}` | `nik` (string) |
| Data keluarga | `/profil/keluarga?biodataId={nik}` | `nik` |

## Page 1 — Dashboard Pegawai (READ-ONLY)

Profil diri sendiri, difilter ke `$id` (aman by-design → tak perlu permission khusus). **Read-only**
untuk rilis ini — endpoint edit (`PATCH /pegawai/{id}/profil`, `/gaji`, alur `profil-update`
berbasis approval) **tidak** dipasang; menyusul setelah RBAC self-service dirancang. Section:

1. **Detail kepegawaian** — status, jabatan, organisasi, golongan, tmt*, dari `/pegawai/{$id}`.
2. **Riwayat karier** (timeline netral) — SK + Mutasi + Kontrak.
3. **Riwayat Disiplin** — SP (Surat Peringatan) di section **terpisah** (hak pegawai untuk tahu;
   ditampilkan, tidak disembunyikan).
4. **Biodata + Data Keluarga** — `/profil/biodata/{nik}` + `/profil/keluarga?biodataId={nik}`.
5. **Riwayat Penggajian** — slip bulanan dari `/penggajian/batch/master/pegawai/{$id}`.
   Kolom: Periode · Gaji Pokok · Penghasilan Kotor · Potongan · Pajak · Penghasilan Bersih.
   Pakai **`penghasilanBersihFinal`**. **Sembunyikan** `*2` / `pembulatan2` / `isDifferent`
   (artefak proses verifikasi batch, bukan urusan pegawai).
   > ⚠️ **Known-limitation:** endpoint tak punya filter status batch → tak bisa jamin hanya periode
   > *accepted* yang tampil. **Tanya backend + verifikasi sebelum go-live** (periode draft/belum-final
   > tak boleh bocor ke pegawai).

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

## Status

- ✅ Grilling round 1 selesai (identitas, 3 page, gating, istilah). Keputusan terkunci di doc ini + ADR-0006.
- ✅ **W1** — Generate tipe (`kepegawaian-fe-0is`) & verifikasi backend batch (`kepegawaian-fe-oqp`).
- ✅ **W2** — `getPegawaiSession()` (`kepegawaian-fe-djv`), Data Pegawai 3 tab (`kepegawaian-fe-hnc`), Terminasi 2 tab (`kepegawaian-fe-vfe`).
- ✅ **W3** — Dashboard Pegawai read-only 5 section (`kepegawaian-fe-tvr`).
- ✅ **W4** — Sidebar grup Kepegawaian + 3 sub-item (`kepegawaian-fe-9cm`).
- ✅ **Epic tutup** — `kepegawaian-fe-a2e` closed.
- ⏳ Dashboard masih membutuhkan backend nyata untuk data lives. Guard FE `FINISHED` only di penggajian perlu diverifikasi bentuk response (field `status` mungkin belum di-capture di type).
