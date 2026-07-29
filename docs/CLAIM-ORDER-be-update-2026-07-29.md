# ✅ Claim Order — BE API Update 2026-07-29 (Pegawai & Penggajian)

> ✅ **SELESAI.** Kedua issue sudah closed dan di-commit.
> Lihat `bd show kepegawaian-fe-slzs` dan `bd show kepegawaian-fe-6fsr` untuk detail.

**Konteks.** BE merilis update response shape untuk dua modul (2026-07-29).
Types di-regenerate via `docs/api/extract-types.js` dan sudah di-sync ke `src/types/`.
File ini mencatat claim order dan implikasi per issue yang lahir dari update tersebut.

**Sumber kebenaran perubahan:** `git diff src/types/` setelah `node docs/api/extract-types.js`.

---

## Ringkasan Perubahan BE

### Modul `pegawai`

| Endpoint baru | Response | Dipakai oleh |
|---|---|---|
| `GET /pegawai/{id}/mutasi-context` | `PegawaiResponseMutasiContext` — `{ id, nipam, nama, golongan, organisasi, jabatan, profesi }` (semua `RefMiniResponse`) | Form Mutasi (6fsr) — blok Data Pegawai read-only |

### Modul `penggajian`

| Perubahan | Sebelum | Sesudah |
|---|---|---|
| `DasarGajiResponse` placement | shared (`_shared.ts`) | local (`penggajian/dasar-gaji.ts`) |
| Wrapper paged dasar-gaji | `SingleResultPageDasarGajiResponse = Envelope<Page<T>>` | `PageResultPageDasarGajiResponse = PageEnvelope<T>` |
| `DetailDasarGajiResponse.dasarGaji` | `DasarGajiResponse` (5 field penuh) | `DasarGajiMiniResponse` (2 field: `id` + `deskripsi`) |
| Lookup gaji form mutasi | `SingleResultDetailDasarGaji` (entity JPA, ada field audit) | `SingleResultDetailDasarGajiNominal = Envelope<{ nominal? }>` |
| Wrapper paged detail-dasar-gaji | `SingleResultPageDetailDasarGajiResponse` | `PageResultPageDetailDasarGajiResponse = PageEnvelope<T>` |
| Raw entity | `DasarGaji`, `DetailDasarGaji` (ada) | **Dihapus** — tidak boleh dipakai |
| Re-export batch save | `SavedResultString` | `SavedResultListLong` |

---

## Urutan Claim

### 1. ✅ `kepegawaian-fe-slzs` — penggajian: sync tipe BE update

**Status:** ✅ **CLOSED** (`closed_at: 2026-07-29T07:50:02Z`)
**Depends on:** — (tidak ada)
**Prioritas:** P1 · Preventif — modul penggajian belum dibangun, tapi tipe sudah berubah.

- [x] `bd update kepegawaian-fe-slzs --claim`
- [x] Audit consumer tipe lama:
  ```bash
  grep -rn "DasarGajiResponse\|SingleResultDetailDasarGaji\b\|DasarGaji\b\|DetailDasarGaji\b" \
    src/ --include="*.ts" --include="*.tsx"
  ```
  → **Hasil: nol baris di luar `src/types/`** ✅
- [x] Audit import dari `_shared` yang sebut `DasarGaji`:
  ```bash
  grep -rn "from.*_shared" src/ --include="*.ts" --include="*.tsx" | grep -i "dasar"
  ```
  → **Hasil: nol** ✅
- [x] Catat temuan ke `bd update kepegawaian-fe-slzs --notes="..."`
- [x] Bila ada consumer stale → rename via `gitnexus_rename` (jangan find-replace) → **tidak ada**
- [x] `bun run build` — zero error tipe ✅
- [x] `bunx biome check` — zero lint ✅
- [x] `bd close kepegawaian-fe-slzs` ✅

> **Anchor tipe untuk implementer penggajian (catat sebelum mulai modul):**
> - Tabel paged: `PageResultPageDasarGajiResponse` / `PageResultPageDetailDasarGajiResponse`
> - Lookup gaji form: `SingleResultDetailDasarGajiNominal` → akses via `response.data.nominal`
> - Import `DasarGajiResponse` dari `penggajian/dasar-gaji` (bukan `_shared`)
> - Raw entity `DasarGaji` / `DetailDasarGaji` sudah **tidak ada** di types

---

### 2. ✅ `kepegawaian-fe-6fsr` — Conditional Mutasi form fields by jenisMutasi

**Status:** ✅ **CLOSED** (`closed_at: 2026-07-29T07:55:00Z`)
**Depends on:** `slzs` selesai dahulu
**Prioritas:** P1 · **Blocker BE sudah RESOLVED per update ini.**

> Blocker lama (saat issue dibuat): endpoint `mutasi-context` dan cascade profesi/jabatan belum live.
> Status sekarang: keduanya sudah tersedia per BE update 2026-07-29.

**Prasyarat baca sebelum ngoding:**

1. `docs/context/kepegawaian-riwayat.md` — Keputusan 7 & 7b (struktur form, reset semantics)
2. `docs/BE-REQUIREMENT-form-mutasi.md` — requirement BE yang sudah terpenuhi
3. `src/app/(app)/kepegawaian/data/tambah/tambah-form.tsx` — preseden cascade + reset
4. `src/components/fk-combobox.tsx` — preseden FK trap `normalizeFk()` (memory `9x2`)

**A. Data Pegawai block (read-only)**

- [x] `gitnexus_impact({target: "mutasi-form-sheet", direction: "upstream"})`
- [x] Query `GET /pegawai/{id}/mutasi-context`:
  - Type: `src/types/pegawai/pegawai.ts:344` — `PegawaiResponseMutasiContext`
  - Fields: `{ id, nipam, nama, golongan, organisasi, jabatan, profesi }` (semua `RefMiniResponse`)
  - `queryKey: ["pegawai-mutasi-context", pegawaiId]`, `staleTime: 5 * 60_000`
  - `isPending` → skeleton · `isError` → **inline retry (bukan toast)**
- [x] Render 6 field read-only: NIPAM, Nama, Golongan, Unit Kerja, Jabatan, Profesi
- [x] Block ini berfungsi ganda sebagai nilai "Lama" yang dikirim ke BE (`*LamaId`)

**B. Base fields (selalu visible)**

- [x] Jenis Mutasi (select/enum), Nomor SK, Tanggal SK, TMT Berlaku
- [x] `updateMaster` checkbox — **tanpa validasi, tanpa dialog, tanpa warning kondisional**, default unchecked
- [x] Notes textarea
- [x] `jenisSk` derived otomatis dari `jenisMutasi` — **tidak ada `<select>` untuk field ini**:

  | `jenisMutasi` | `jenisSk` |
  |---|---|
  | `PENGANGKATAN_PERTAMA` | `SK_CAPEG` |
  | `MUTASI_LOKER` | `SK_MUTASI` |
  | `MUTASI_JABATAN` | `SK_JABATAN` |
  | `MUTASI_GOLONGAN` | `SK_KENAIKAN_PANGKAT_GOLONGAN` |
  | `MUTASI_GAJI` | `SK_PENYESUAIAN_GAJI` |
  | `MUTASI_GAJI_BERKALA` | `SK_KENAIKAN_GAJI_BERKALA` |
  | `TERMINASI` | `SK_PENSIUN` |

**C. Conditional sections (switch on `jenisMutasi`)**

- [x] `PENGANGKATAN_PERTAMA` / `TERMINASI` → base only, tidak ada section tambahan
- [x] `MUTASI_LOKER` / `MUTASI_JABATAN` → fieldset cascade:
  - Unit Kerja combobox → `GET /master/jabatan/organisasi/{id}` → Jabatan combobox → `GET /master/profesi/jabatan/{id}` → Profesi combobox
  - Ikut preseden `tambah-form.tsx` untuk pattern cascade + reset downstream
- [x] `MUTASI_GOLONGAN` → fieldset:
  - Golongan select, MKG Tahun, MKG Bulan, Kenaikan Berikutnya (date)
  - MKGB Tahun, MKGB Bulan
  - **TANPA** Gaji Pokok (downstream salary process, bukan form ini)
- [x] `MUTASI_GAJI` / `MUTASI_GAJI_BERKALA` → semua field `MUTASI_GOLONGAN` + Gaji Pokok:
  - Tombol search → `GET /penggajian/detail-dasar-gaji/{golonganId}/{masaKerja}`
  - Response: `SingleResultDetailDasarGajiNominal` → ambil `response.data.nominal`
  - Bila 404/error → **field dikosongkan**, HR bisa isi manual (tidak blok submit)

**D. Reset semantics (Keputusan 7b)**

- [x] `jenisMutasi` change → field section yang disembunyikan di-clear: `setValue(field, undefined)`
- [x] Mirror pola `onOrgChange` di `tambah-form.tsx`

**E. Quality gate**

- [x] Split file bila > ~120 baris (pisah: form-fields, form-schema, form-sheet)
- [x] `gitnexus_detect_changes()` — pastikan scope hanya menyentuh file form mutasi
- [x] `bun run build` · `bunx biome check` ✅
- [x] `bd close kepegawaian-fe-6fsr` ✅

---

## ✅ Definition of Done

- [x] Form Sheet Mutasi merender blok Data Pegawai (6 field read-only) dari `mutasi-context`
- [x] `jenisMutasi` change muncul/hilangkan section yang benar — 5 varian diverifikasi
- [x] Cascade Unit Kerja → Jabatan → Profesi bekerja di `MUTASI_LOKER` / `MUTASI_JABATAN`
- [x] Lookup Gaji Pokok mengambil `data.nominal` dari `detail-dasar-gaji/{golonganId}/{masaKerja}`
- [x] `jenisSk` ter-derive otomatis dari `jenisMutasi` (7 mapping), tidak ada UI control untuk field ini
- [x] Field section tersembunyi ter-reset saat `jenisMutasi` berganti
- [x] `bun run build` + `bunx biome check` — hijau ✅

---

## Invarian (jangan dilanggar)

- **Types generated** (`src/types/**`) TIDAK diedit manual — regenerate via `docs/api/extract-types.js`
- **Import `DasarGajiResponse`** dari `penggajian/dasar-gaji`, **bukan** dari `_shared`
- **Raw entity `DasarGaji` / `DetailDasarGaji`** sudah tidak ada di types — jangan dipakai
- **Toast hanya untuk hasil mutasi** — gagal load `mutasi-context` pakai inline retry
- **`jenisSk` = derived field** — tidak pernah di-input user, tidak perlu `<select>`
- **`updateMaster` = checkbox polos** — tanpa validasi, tanpa dialog, tanpa warning kondisional
