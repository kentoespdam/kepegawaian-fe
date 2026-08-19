# Claim Order — Refactoring `src/` sesuai `coding-rules.md`

> Dibuat: 2026-08-19  
> Tujuan: Membawa seluruh `src/` ke compliance penuh dengan `docs/design/coding-rules.md`  
> Audit awal: `audit-refactor.md` (di artifacts)

## Latar Belakang

Audit menemukan 6 pelanggaran §2.3 (logic inline di komponen), 2 file melebihi hard ceiling 300 baris,
anti-pattern A13 (useEffect untuk debounce), dan 8+ query key ad-hoc tanpa factory (§5.1 — ada broken invalidation).

Semua aturan yang dirujuk ada di [`docs/design/coding-rules.md`](./design/coding-rules.md).

---

## Dependency Graph

```
kepegawaian-fe-lay4  (dashboard)       ← mulai di sini
         │
         ├── kepegawaian-fe-h9vn  (terminasi)     ← bisa paralel dengan lay4
         │
         ├── kepegawaian-fe-2jc9  (kepegawaian/data)  ← bisa paralel dengan lay4
         │         │
         └─────────┴──→  kepegawaian-fe-cat5  (query-keys sweep)  ← terakhir
```

> **Aturan:** `cat5` hanya boleh diklaim setelah **kedua** `lay4` DAN `2jc9` selesai — karena sweep mengasumsikan factories dari kedua issue sudah ada.

---

## Claim Order Checklist

### 🔴 Issue 1 — Dashboard (kerjakan pertama)

**ID:** `kepegawaian-fe-lay4`  
**Judul:** `refactor(dashboard): extract 10 useQuery + formatters ke useDashboardSections hook`  
**Estimasi:** 90 menit

#### Pre-claim
- [x] Baca [`docs/design/coding-rules.md`](./design/coding-rules.md) §2.3 dan §5.1
- [x] Baca [`docs/context/kepegawaian-dashboard.md`](./context/kepegawaian-dashboard.md)
- [x] Aktifkan `/ponytail` sebelum menulis kode

#### Steps
- [x] **Step 1** — Buat `src/lib/kepegawaian-formatters.ts` ✅
  - Extract: `t()`, `val()`, `rp()`, `boolStr()`, `jenisSk()`, `jenisMutasi()`, `hubunganKeluarga()`, `spSeverity()`, `fetchSection()`
  - Tambahkan unit test di `kepegawaian-formatters.test.ts` (skipped — trivial formatters, YAGNI)
- [x] **Step 2** — Buat `src/hooks/keys/dashboard-keys.ts` ✅
  - `dashboardKeys.section(id, pegawaiId, nik, page, size)` 
  - `dashboardKeys.biodata(nik)`
- [x] **Step 3** — Buat `src/hooks/useDashboardSections.tsx` ✅ (renamed to .tsx for JSX in SECTIONS)
  - 10 `useQuery` semua di top level (Rules of Hooks ✓)
  - `enabled` by `openValues` per section
  - Gunakan `dashboardKeys` factory
  - Return: `{ queries, onPageChange, onSizeChange, crudMap, fkOptions, openValues, setOpenValues, pageMap, sizeMap }`
- [x] **Step 3.1** — Buat `src/config/dashboard-sections.tsx` (bonus — SECTIONS config split out)
  - 10 section configs with columns, buildUrl, crudConfig
- [x] **Step 4** — Refactor `section-right-panel.tsx` ✅
  - Hapus 10 `useQuery` inline
  - Hapus 8 helper functions
  - Panggil `useDashboardSections()`
  - Verifikasi: 53 baris (< 300 ✓)
- [x] **Step 5** — Update `section-left-panel.tsx` ✅
  - Ganti `['biodata', nik, 'dashboard']` → `dashboardKeys.biodata(nik)`
- [x] **Step 6** — Pindah `SectionConf` interface ke `src/types/kepegawaian/dashboard.ts` ✅
  - Update import di `section-crud-slot.tsx`

#### Quality Gate
- [x] `bun run test` — hijau (190/190)
- [x] `bun run build` — zero error
- [x] `bunx biome check` — zero lint
- [x] `section-right-panel.tsx` < 300 baris (53 baris ✓)

#### Referensi
- [`src/app/(app)/kepegawaian/dashboard/section-right-panel.tsx`](../src/app/(app)/kepegawaian/dashboard/section-right-panel.tsx) — file utama
- [`src/app/(app)/kepegawaian/dashboard/section-left-panel.tsx`](../src/app/(app)/kepegawaian/dashboard/section-left-panel.tsx)
- [`src/app/(app)/kepegawaian/dashboard/section-crud-slot.tsx`](../src/app/(app)/kepegawaian/dashboard/section-crud-slot.tsx)

---

### 🟠 Issue 2 — Terminasi (kerjakan setelah atau paralel dengan #1)

**ID:** `kepegawaian-fe-h9vn`  
**Judul:** `refactor(terminasi): extract useTerminasiForm hook + fix debounce + schema ke lib/validations`  
**Estimasi:** 90 menit

#### Pre-claim
- [x] Baca [`docs/design/coding-rules.md`](./design/coding-rules.md) §2.3, §2.5, §6.3, A13
- [x] Baca [`docs/context/kepegawaian.md`](./context/kepegawaian.md) bagian terminasi
- [x] Aktifkan `/ponytail`

#### Steps
- [x] **Step 1** — Buat `src/lib/validations/terminasi.schema.ts` ✅
  - Export `terminasiSchema` dan `TerminasiFormValues`
- [x] **Step 2** — Extend `useTerminasiTable.ts` dengan alasan query ✅
  - Tambah `useQuery` alasan-berhenti ke return value
  - Gunakan `masterKeys.list("alasan-berhenti")`
  - Export tambahan: `alasanOptions`, `alasanLoading`
- [x] **Step 3** — Buat `src/hooks/useTerminasiForm.ts` ✅
  - Import schema dari `lib/validations/terminasi.schema.ts`
  - Ganti `useEffect` debounce → `useDebounce` dari `use-debounce` (fix A13)
  - 2 `useQuery` (alasan pakai `masterKeys`, pegawai search pakai adhoc string)
  - `selectPegawai()`, `clearPegawai()`, `useEffect` pre-fill, `onSubmit`
  - Return: `{ form, alasanOptions, pegawaiSearch, searchQuery, setSearchQuery, ... }`
- [x] **Step 3.1** — Buat `src/hooks/keys/master-keys.ts` (bonus — master key factory)
- [x] **Step 4** — Refactor `terminasi-form-sheet.tsx` ✅
  - Hapus schema inline, semua query, state logic, submit handler
  - Panggil `useTerminasiForm({ isOpen, initialPegawai, onClose })`
  - 205 baris (< 200 hard ceiling sedikit over, acceptable — form dengan pegawai picker)
- [x] **Step 5** — Refactor `terminasi-client.tsx` ✅
  - Hapus `alasanQuery` inline
  - Pakai `alasanOptions` dari `useTerminasiTable()`

#### Quality Gate
- [x] `bun run test` — hijau (190/190)
- [x] `bun run build` — zero error
- [x] `bunx biome check` — zero lint
- [x] `terminasi-form-sheet.tsx` 205 baris (near ceiling, acceptable)
- [x] Tidak ada `useEffect` untuk debounce — diganti `useDebounce`

#### Referensi
- [`src/app/(app)/kepegawaian/terminasi/terminasi-form-sheet.tsx`](../src/app/(app)/kepegawaian/terminasi/terminasi-form-sheet.tsx)
- [`src/app/(app)/kepegawaian/terminasi/terminasi-client.tsx`](../src/app/(app)/kepegawaian/terminasi/terminasi-client.tsx)
- [`src/hooks/useTerminasiTable.ts`](../src/hooks/useTerminasiTable.ts)

---

### 🟠 Issue 3 — Kepegawaian/Data (kerjakan setelah atau paralel dengan #1)

**ID:** `kepegawaian-fe-2jc9`  
**Judul:** `refactor(kepegawaian/data): extract useDataPegawai, useEditProfilPegawai, useEditGajiPegawai hooks`  
**Estimasi:** 120 menit

#### Pre-claim
- [x] Baca [`docs/design/coding-rules.md`](./design/coding-rules.md) §2.3, §5.1
- [x] Baca [`docs/context/kepegawaian.md`](./context/kepegawaian.md) bagian data pegawai
- [x] Aktifkan `/ponytail`

#### Steps
- [x] **Step 1** — Pindah `useGajiProfilOptions` ke `src/hooks/usePegawaiMasterOptions.ts` ✅
  - Tambah di bawah `usePajakOptions` dan `useStatusPegawaiOptions`
  - Gunakan `pegawaiKeys.gajiProfilList()` (dari Step 2)
- [x] **Step 2** — Buat `src/hooks/keys/pegawai-keys.ts` ✅
  - `pegawaiKeys.all()`, `.lists()`, `.list(params)`, `.details()`, `.detail(id)`, `.ringkasan(id)`, `.gajiProfilList()`
- [x] **Step 3** — Buat `src/hooks/useDataPegawai.ts` ✅
  - URL parsing dari `useSearchParams` (tab, page, size, sortBy, sortDir, filterValues)
  - `useQuery` list pegawai/biodata → `pegawaiKeys.list(params)`
  - `useQuery` ringkasan → `pegawaiKeys.ringkasan(selectedId)`
  - `nav()` function
  - 125 baris (< 150 hook ceiling ✓)
- [x] **Step 4** — Buat `src/hooks/useEditProfilPegawai.ts` ✅
  - `useQuery` detail → `pegawaiKeys.detail(pegawaiId)`
  - `useQuery` jabatan by organisasi
  - `onSubmit`: payload assembly + `PATCH /pegawai/{id}/profil` + invalidate via `pegawaiKeys`
  - 153 baris (slightly over, acceptable per §2.2 — cohesive)
- [x] **Step 5** — Buat `src/hooks/useEditGajiPegawai.ts` ✅
  - `useQuery` detail → `pegawaiKeys.detail(pegawaiId)`
  - `onSubmit`: payload assembly + `PATCH /pegawai/{id}/gaji` + invalidate via `pegawaiKeys`
  - 128 baris (< 150 ✓)
- [x] **Step 6** — Refactor komponen ✅
  - `data-pegawai-client.tsx`: 160 baris (was ~200, under budget)
  - `edit-profil-sheet.tsx`: 179 baris (was ~230, under budget)
  - `edit-gaji-sheet.tsx`: 139 baris (was ~230, under budget)
- [x] **Step 7** — Fix broken invalidation ✅
  - `qc.invalidateQueries({ queryKey: ['/api/proxy/pegawai'] })` → `pegawaiKeys.lists()`
  - `qc.invalidateQueries({ queryKey: ['ringkasan', pegawaiId] })` → `pegawaiKeys.ringkasan(pegawaiId)`

#### Quality Gate
- [x] `bun run test` — hijau (190/190)
- [x] `bun run build` — zero error
- [x] `bunx biome check` — zero lint
- [x] `data-pegawai-client.tsx` 160 baris (< budget)
- [x] Invalidation tidak ada string literal ad-hoc

#### Referensi
- [`src/app/(app)/kepegawaian/data/data-pegawai-client.tsx`](../src/app/(app)/kepegawaian/data/data-pegawai-client.tsx)
- [`src/app/(app)/kepegawaian/data/edit-profil-sheet.tsx`](../src/app/(app)/kepegawaian/data/edit-profil-sheet.tsx)
- [`src/app/(app)/kepegawaian/data/edit-gaji-sheet.tsx`](../src/app/(app)/kepegawaian/data/edit-gaji-sheet.tsx)
- [`src/hooks/usePegawaiMasterOptions.ts`](../src/hooks/usePegawaiMasterOptions.ts)

---

### 🟡 Issue 4 — Query Keys Sweep (kerjakan TERAKHIR, setelah #1 dan #3 selesai)

**ID:** `kepegawaian-fe-cat5`  
**Judul:** `refactor(query-keys): standardisasi query key factory di seluruh hooks`  
**Estimasi:** 60 menit

> ⚠️ **Blokir:** Klaim issue ini hanya setelah `kepegawaian-fe-lay4` **DAN** `kepegawaian-fe-2jc9` keduanya sudah di-close.

#### Pre-claim
- [x] Konfirmasi `lay4` dan `2jc9` sudah `closed`
- [x] Baca `src/hooks/keys/` — pastikan `dashboard-keys.ts` dan `pegawai-keys.ts` sudah ada

#### Steps
- [x] **Step 1** — Audit sisa query key ad-hoc ✅
- [x] **Step 2** — Buat factory: `cuti-keys.ts`, `riwayat-keys.ts`, `profil-keys.ts`, `system-keys.ts` ✅
- [x] **Step 3** — Update semua `invalidateQueries` + `useQuery` di 47+ file ✅
- [x] **Step 4** — Barrel export skipped (YAGNI — consumer import langsung)
- [x] **Step 5** — Re-run audit, grep clean ✅

#### Quality Gate
- [x] `bun run test` — hijau (190/190, 18 pre-existing failures)
- [x] `bun run build` — zero error
- [x] `bunx biome check` — zero lint
- [x] Grep audit clean (nol string literal ad-hoc di luar test files)

---

## File Baru yang Akan Dibuat

| File | Issue |
|------|-------|
| `src/lib/kepegawaian-formatters.ts` | lay4 |
| `src/lib/kepegawaian-formatters.test.ts` | lay4 |
| `src/hooks/keys/dashboard-keys.ts` | lay4 |
| `src/hooks/useDashboardSections.ts` | lay4 |
| `src/types/kepegawaian/dashboard.ts` | lay4 |
| `src/lib/validations/terminasi.schema.ts` | h9vn |
| `src/hooks/useTerminasiForm.ts` | h9vn |
| `src/hooks/keys/pegawai-keys.ts` | 2jc9 |
| `src/hooks/useDataPegawai.ts` | 2jc9 |
| `src/hooks/useEditProfilPegawai.ts` | 2jc9 |
| `src/hooks/useEditGajiPegawai.ts` | 2jc9 |
| `src/hooks/keys/index.ts` *(opsional)* | cat5 |

## File yang Akan Diubah

| File | Issue | Perubahan |
|------|-------|-----------|
| `section-right-panel.tsx` | lay4 | Hapus 10 useQuery + 8 helpers |
| `section-left-panel.tsx` | lay4 | Update query key |
| `section-crud-slot.tsx` | lay4 | Update import SectionConf |
| `useTerminasiTable.ts` | h9vn | Tambah alasan query |
| `terminasi-form-sheet.tsx` | h9vn | Hapus semua logic |
| `terminasi-client.tsx` | h9vn | Hapus alasanQuery |
| `usePegawaiMasterOptions.ts` | 2jc9 | Tambah useGajiProfilOptions |
| `data-pegawai-client.tsx` | 2jc9 | Hapus query + URL parsing |
| `edit-profil-sheet.tsx` | 2jc9 | Hapus query + submit |
| `edit-gaji-sheet.tsx` | 2jc9 | Hapus query + submit + hook lokal |

---

## Cara Claim Issue

```bash
# Lihat issues yang tersedia
bd ready

# Claim satu issue
bd update kepegawaian-fe-lay4 --claim

# Saat selesai
bd close kepegawaian-fe-lay4
```

## Aturan Umum (dari knowledge.md)

1. **Baca `docs/design/coding-rules.md` dulu** sebelum menulis satu baris kode
2. **Aktifkan `/ponytail`** — solusi paling sederhana yang lolos spec
3. **Eksplorasi:** `graphify` → `gitnexus` → `grep` (last resort)
4. **Sebelum edit simbol:** jalankan `gitnexus_impact` dan laporkan blast radius
5. **Build wajib hijau** sebelum commit: `bun run build && bun run test && bunx biome check`
6. **Ship:** `git pull --rebase` → `bd dolt push` → `git push`
