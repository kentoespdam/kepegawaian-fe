# Claim Order — Terminasi: Tambah Terminasi Pegawai

> Papan pantau untuk agen implementer. Sumber kebenaran status = **beads (`bd`)**, bukan file ini.
> Alur per issue: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.

**Issue:** `kepegawaian-fe-9uqt`

**Tujuan.** Tambah tombol **"Tambah Terminasi"** di header page `/kepegawaian/terminasi` yang
membuka Sheet form untuk mengubah status pegawai aktif menjadi terminasi — mencakup semua jenis:
pensiun normal, pengunduran diri, pemberhentian dengan/tanpa hormat, meninggal dunia, dsb.
Jenis terminasi ditentukan oleh `alasanTerminasi` (entity master dari backend — tidak hardcode).

**Scope:** Hanya **POST** (tambah). Edit & Hapus = issue berikutnya.

---

## Keputusan desain (hasil grill 2026-08-14 — DIKUNCI, jangan re-litigasi)

1. **Tombol "Tambah Terminasi"** ada di header page (bukan dalam tab) — selalu terlihat.
2. **Dual-entry pegawai:** combobox search di form (filter `statusKerja=KARYAWAN_AKTIF`) **atau** klik
   baris di tab "Calon Pensiun" → Sheet terbuka dengan data pegawai sudah pre-fill.
3. **Pre-fill dari Calon Pensiun:** `nama`, `nipam`, `organisasi`, `jabatan`, `golongan` terisi
   otomatis. User hanya melengkapi field SK (`nomorSk`, `jenisSk`, `tanggalSk`, `tmtBerlaku`) dan
   memilih `alasanTerminasiId`.
4. **AlasanTerminasi:** fetch dari `GET /master/alasan-berhenti/list` — tidak hardcode. Filter
   dropdown di tab "Sudah Terminasi" juga diupdate dari hardcode → backend.
5. **Upload file SK:** opsional (field `fileName`).
6. **Form container:** Sheet dari kanan — konsisten dengan form riwayat lainnya (SP, SK, Mutasi).
7. **Content-type:** `application/json` untuk POST terminasi (bukan multipart — `fileName` di
   request type adalah nama file string, bukan binary upload — konfirmasi dari tipe generated).

---

## Pemetaan field form → `RiwayatTerminasiPostRequest`

| Field UI | Field Request | Sumber | Wajib? |
|---|---|---|---|
| Pegawai (combobox search) | `pegawaiId`, `nipam`, `nama` | Pick dari `/pegawai?statusKerja=KARYAWAN_AKTIF` | ✅ |
| Organisasi | `organisasiId` | Auto dari data pegawai terpilih | ✅ |
| Jabatan | `jabatanId` | Auto dari data pegawai terpilih | ✅ |
| Alasan Terminasi | `alasanTerminasiId` | Combobox fetch `/master/alasan-berhenti/list` | ✅ |
| Nomor SK | `nomorSk` | Text input | ✅ |
| Jenis SK | `jenisSk` | Select enum `JenisSk` | ✅ |
| Tanggal SK | `tanggalSk` | Date picker | ✅ |
| TMT Berlaku | `tmtBerlaku` | Date picker | ✅ |
| Golongan | `golonganId` | Auto dari data pegawai (opsional) | ❌ |
| Notes | `notes` | Textarea | ❌ |

> Tipe: `src/types/kepegawaian/riwayat.ts` → `RiwayatTerminasiPostRequest` (L302), `AlasanBerhentiResponse` (L80).

---

## Endpoint

| Aksi | Method | URL |
|---|---|---|
| List alasan terminasi | `GET` | `/master/alasan-berhenti/list` |
| Cari pegawai aktif | `GET` | `/pegawai?statusKerja=KARYAWAN_AKTIF&nama={q}&size=10` |
| Tambah terminasi | `POST` | `/kepegawaian/riwayat/terminasi` |

---

## Prasyarat (baca sebelum ngoding)

1. `docs/context/kepegawaian.md` §Page 3 — terminasi sebagai payung semua bentuk berhenti
2. `docs/context/kepegawaian-riwayat-sp.md` — pola form Sheet + picker pegawai (mirip secara struktur)
3. `src/app/(app)/kepegawaian/terminasi/terminasi-client.tsx` — file yang diubah (tombol + filter)
4. `src/hooks/useTerminasiTable.ts` — hook yang diubah (filter alasan dari backend)
5. `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/sp/sp-form-sheet.tsx` — **template** pola Sheet + picker pegawai
6. `src/types/kepegawaian/riwayat.ts` — tipe `RiwayatTerminasiPostRequest` (L302)
7. `src/types/_shared.ts` — tipe `JenisSk` (enum)

---

## Urutan claim

### 1. `kepegawaian-fe-9uqt` — Form Sheet tambah terminasi + update filter alasan ke backend

**← depends on:** — (siap diklaim langsung)

**A. Update filter alasan di `terminasi-client.tsx` + `useTerminasiTable.ts`**
- [ ] Fetch `GET /api/proxy/master/alasan-berhenti/list` → array `AlasanBerhentiResponse[]`
  - `useQuery`, `staleTime: 5 * 60_000` (master data jarang berubah)
  - Pattern: `{ id, nama }` — ikuti pola `useFkOptions` yang sudah ada di project
- [ ] Ganti `<select>` filter alasan hardcode di `terminasi-client.tsx` → options dari fetch
  - Loading: disable + placeholder "Memuat..."
  - Error: fallback opsi kosong (tidak crash)

**B. Buat `terminasi-form-sheet.tsx` — `"use client"`**
- [ ] Buat file baru: `src/app/(app)/kepegawaian/terminasi/terminasi-form-sheet.tsx`
- [ ] Props: `open: boolean`, `onOpenChange: (open: boolean) => void`, `initialPegawai?: PegawaiResponse | null`
  - `initialPegawai` diisi saat user klik baris Calon Pensiun (pre-fill)
  - `null` / `undefined` = form kosong (via tombol header)

**C. Picker Pegawai (komponen di dalam Sheet)**
- [ ] State: `pickerQuery`, combobox input atau mini modal search
- [ ] Fetch: `GET /api/proxy/pegawai?statusKerja=KARYAWAN_AKTIF&nama={q}&size=10`
  - Debounce 300ms, trigger jika ≥2 karakter
- [ ] Hasil: tabel mini (NIPAM · Nama · Jabatan · Organisasi)
- [ ] Klik baris → `setValue` ke `pegawaiId`, `nipam`, `nama`, `organisasiId`, `jabatanId`, `golonganId`
- [ ] Display read-only pegawai terpilih di bawah picker

**D. Zod schema + form fields**
- [ ] Schema wajib: `pegawaiId`, `nipam`, `nama`, `organisasiId`, `jabatanId`, `alasanTerminasiId`, `nomorSk`, `jenisSk`, `tanggalSk`, `tmtBerlaku`
- [ ] Schema opsional: `golonganId`, `notes`
- [ ] Field `alasanTerminasiId` = combobox reuse data fetch dari step A
- [ ] Field `jenisSk` = Select dengan opsi dari enum `JenisSk` (dari `_shared.ts`)
- [ ] Field `nomorSk` = text input
- [ ] Field `tanggalSk` + `tmtBerlaku` = date picker
- [ ] Field `notes` = textarea opsional

**E. Pre-fill dari `initialPegawai`**
- [ ] `useEffect` saat `initialPegawai` berubah → `reset({ pegawaiId, nipam, nama, organisasiId, jabatanId, golonganId })`
- [ ] Display read-only nama pegawai terpilih (dari `initialPegawai.biodata?.nama`)
- [ ] `organisasiId` dari `initialPegawai.organisasi?.id`; `jabatanId` dari `initialPegawai.jabatan?.id`

**F. Submit — `POST /api/proxy/kepegawaian/riwayat/terminasi`**
- [ ] Content-Type: `application/json` (`JSON.stringify(data)`)
- [ ] Sukses → `toast.success("Terminasi berhasil disimpan")` + `qc.invalidateQueries` (kedua tab: calon-pensiun + terminasi) + `onOpenChange(false)`
- [ ] Error BE → `setError("root", { message: ... })` — bukan toast; Sheet tetap terbuka

**G. Wire ke `terminasi-client.tsx`**
- [ ] State: `sheetOpen`, `prefillPegawai` di `TerminasiClient`
- [ ] Tombol "Tambah Terminasi" di header → `setSheetOpen(true)`, `setPrefillPegawai(null)`
- [ ] Kolom Aksi di tab "Calon Pensiun": tombol ikon per baris → `setSheetOpen(true)`, `setPrefillPegawai(row)`
- [ ] Mount `<TerminasiFormSheet>` **sekali** di level page (bukan per baris)

**H. Quality gate**
- [ ] `bun run build` — zero error
- [ ] `bunx biome check` — zero lint error
- [ ] `bun run test` — tidak ada test yang pecah
- [ ] `bd close kepegawaian-fe-9uqt`

---

## Definition of Done

- [ ] Tombol "Tambah Terminasi" di header page selalu terlihat (tidak bergantung tab aktif)
- [ ] Klik tombol → Sheet terbuka dengan picker pegawai kosong
- [ ] Klik baris di tab "Calon Pensiun" → Sheet terbuka dengan data pegawai pre-fill
- [ ] Picker pegawai: search live, debounce 300ms, hanya `KARYAWAN_AKTIF`
- [ ] Setelah pilih pegawai: nama, NIPAM, organisasi, jabatan tampil sebagai read-only
- [ ] Field wajib tervalidasi via Zod + RHF sebelum submit
- [ ] AlasanTerminasi: fetch dari backend, bukan hardcode
- [ ] Filter "Alasan Terminasi" di tab "Sudah Terminasi": fetch dari backend, bukan hardcode
- [ ] POST sukses → toast + kedua tab invalidate + Sheet tutup
- [ ] POST gagal → error inline di form, Sheet tetap terbuka
- [ ] `bun run test` · `bun run build` · `bunx biome check` — semua hijau
- [ ] `npx gitnexus analyze` + `bd dolt push` + `git push`

---

## Invarian yang tak boleh dilanggar

- **Tipe generated** (`src/types/**`) TIDAK diedit manual
- **`src/components/ui/*`** TIDAK disentuh — zona regenerable shadcn
- **Unauthorized = unmount** (`null`), bukan `disabled` atau CSS-hide
- **Toast hanya untuk hasil mutasi** — gagal load pakai panel inline "Coba lagi"
- **`gcTime: Infinity` / `staleTime: Infinity` dilarang**
- **Sheet dimount sekali** di level page — bukan per baris
- **Tidak ada optimistic removal** — tunggu 200 sebelum invalidate
- Warna lewat design token (`--primary`, `--muted-foreground`), bukan hex/`oklch()` inline
- Jangan rename simbol dengan find-replace — pakai `gitnexus_rename`
- Error di luar scope → buka issue baru, jangan diperbaiki ad-hoc
