# Claim Order — Terminasi: Tambah Terminasi Pegawai

> Papan pantau untuk agen implementer. Sumber kebenaran status = **beads (`bd`)**, bukan file ini.
> Alur per issue: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.

**Issue:** `kepegawaian-fe-9uqt`

> **Status (2026-08-14 — sesi coding):** ✅ SELESAI. Revisi grill sesi 2 (multipart
> FormData, `jenisSk` hardcode, file input) sudah diterapkan di `terminasi-form-sheet.tsx`.
> Test baru `terminasi-form-sheet.test.tsx` mengunci submit multipart (JSON → 415).

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
   otomatis. User hanya melengkapi field SK (`nomorSk`, `tanggalSk`, `tmtBerlaku`) dan
   memilih `alasanTerminasiId`.
4. **AlasanTerminasi:** fetch dari `GET /master/alasan-berhenti/list` — tidak hardcode. Filter
   dropdown di tab "Sudah Terminasi" juga diupdate dari hardcode → backend.
5. **Upload file SK:** opsional — field `fileName` binary dikirim bareng `FormData` (ikuti pola SP).
6. **Form container:** Sheet dari kanan — konsisten dengan form riwayat lainnya (SP, SK, Mutasi).
7. ~~Content-type: `application/json`~~ **DIREVISI (grill sesi 2, 2026-08-14):** Content-type =
   **`multipart/form-data`** (`@ModelAttribute`, ikuti pola SP persis). Mengirim JSON → **HTTP 415**.
   Referensi: `FE-CONTRACT-file-endpoints.md` §2.1, `FE-CONTRACT-kepegawaian-riwayat-write.md` §5.
8. **`jenisSk` hardcode `SK_PENSIUN`** — tidak ditampilkan ke user, set di `defaultValues` RHF.
   Hapus `JENIS_SK_OPTIONS` dan `<FieldFk>` jenisSk dari form. Contract: `jenisSk` terminasi **selalu**
   `SK_PENSIUN` (FE-CONTRACT-kepegawaian-riwayat-write.md §5).
9. **Field noise TIDAK ada di DTO:** `gajiPokok`, `mkgTahun`, `mkgBulan`, `kenaikanBerikutnya`,
   `mkgbTahun`, `mkgbBulan`, `updateMaster` **sudah dihapus BE dari spec** — jangan dikirim.
   Types telah di-regenerate dan mencerminkan ini (`riwayat.ts` diupdate 2026-08-14).
10. **Scope tetap POST saja** — Edit (`PUT`) & Hapus = issue terpisah meski BE sudah siap.
11. **Profil lampiran URL fix** = issue terpisah (inkonsistensi `listUrl` pendidikan/pengalaman-kerja).
12. **Fix endpoint lampiran SK/Mutasi** = issue terpisah urgent (`/kepegawaian/lampiran` →
    `/kepegawaian/lampiran-sk` per FE-CONTRACT-file-endpoints.md §2.1).

---

## Pemetaan field form → `RiwayatTerminasiPostRequest` (multipart/form-data)

> **Content-Type: `multipart/form-data`** — jangan set manual, biarkan browser. Ikuti pola SP.

| Field UI | Field FormData | Sumber | Wajib? |
|---|---|---|---|
| Pegawai (combobox search) | `pegawaiId`, `nipam`, `nama` | Pick dari `/pegawai?statusKerja=KARYAWAN_AKTIF` | ✅ |
| Organisasi | `organisasiId` | Auto dari data pegawai terpilih | ✅ |
| Jabatan | `jabatanId` | Auto dari data pegawai terpilih | ✅ |
| Alasan Terminasi | `alasanTerminasiId` | Combobox fetch `/master/alasan-berhenti/list` | ✅ |
| Nomor SK | `nomorSk` | Text input | ✅ |
| ~~Jenis SK~~ | `jenisSk` | **Hardcode `SK_PENSIUN` di `defaultValues`** — tidak ditampilkan | ✅ (hidden) |
| Tanggal SK | `tanggalSk` | Date picker | ✅ |
| TMT Berlaku | `tmtBerlaku` | Date picker | ✅ |
| Golongan | `golonganId` | Auto dari data pegawai (opsional) | ❌ |
| File SK | `fileName` (binary file part) | `<input type="file">` via `useRef` | ❌ |
| Notes | `notes` | Textarea | ❌ |

> Tipe: `src/types/kepegawaian/riwayat.ts` → `RiwayatTerminasiPostRequest` (L302), `AlasanBerhentiResponse` (L80).

---

## Endpoint

| Aksi | Method | URL | Binding |
|---|---|---|---|
| List alasan terminasi | `GET` | `/master/alasan-berhenti/list` | — |
| Cari pegawai aktif | `GET` | `/pegawai/list?search={q}&statusKerja=KARYAWAN_AKTIF` | — |
| Tambah terminasi | `POST` | `/kepegawaian/riwayat/terminasi` | `multipart/form-data` |

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
- [x] Fetch `GET /api/proxy/master/alasan-berhenti/list` → array `AlasanBerhentiResponse[]`
  - `useQuery`, `staleTime: 5 * 60_000` (master data jarang berubah)
  - Pattern: `{ id, nama }` — ikuti pola `useFkOptions` yang sudah ada di project
- [x] Ganti `<select>` filter alasan hardcode di `terminasi-client.tsx` → options dari fetch
  - Loading: disable + placeholder "Memuat..."
  - Error: fallback opsi kosong (tidak crash)

**B. Buat `terminasi-form-sheet.tsx` — `"use client"`**
- [x] Buat file baru: `src/app/(app)/kepegawaian/terminasi/terminasi-form-sheet.tsx`
- [x] Props: `open: boolean`, `onOpenChange: (open: boolean) => void`, `initialPegawai?: PegawaiResponse | null`
  - `initialPegawai` diisi saat user klik baris Calon Pensiun (pre-fill)
  - `null` / `undefined` = form kosong (via tombol header)

**C. Picker Pegawai (komponen di dalam Sheet)**
- [x] State: `pickerQuery`, combobox input atau mini modal search
- [x] Fetch: `GET /api/proxy/pegawai?statusKerja=KARYAWAN_AKTIF&nama={q}&size=10`
  - Debounce 300ms, trigger jika ≥2 karakter
- [x] Hasil: tabel mini (NIPAM · Nama · Jabatan · Organisasi)
- [x] Klik baris → `setValue` ke `pegawaiId`, `nipam`, `nama`, `organisasiId`, `jabatanId`, `golonganId`
- [x] Display read-only pegawai terpilih di bawah picker

**D. Zod schema + form fields**
- [x] Schema wajib: `pegawaiId`, `nipam`, `nama`, `organisasiId`, `jabatanId`, `alasanTerminasiId`, `nomorSk`, `tanggalSk`, `tmtBerlaku`
- [x] Schema opsional: `golonganId`, `notes`
- [x] `jenisSk` **TIDAK masuk schema** — hardcode `"SK_PENSIUN"` di `defaultValues` RHF, tidak ditampilkan (implementasi: langsung `fd.append("jenisSk", "SK_PENSIUN")` di submit)
- [x] Field `alasanTerminasiId` = combobox reuse data fetch dari step A
- [x] Field `nomorSk` = text input
- [x] Field `tanggalSk` + `tmtBerlaku` = date picker
- [x] Field `notes` = textarea opsional
- [x] **File input:** `useRef<HTMLInputElement>` + `<Input ref={fileRef} type="file" />` + guard 5 MB (ikuti pola SP L23, L62, L208–212)

**E. Pre-fill dari `initialPegawai`**
- [x] `useEffect` saat `initialPegawai` berubah → `reset({ pegawaiId, nipam, nama, organisasiId, jabatanId, golonganId })`
- [x] Display read-only nama pegawai terpilih (dari `initialPegawai.biodata?.nama`)
- [x] `organisasiId` dari `initialPegawai.organisasi?.id`; `jabatanId` dari `initialPegawai.jabatan?.id`

**F. Submit — `POST /api/proxy/kepegawaian/riwayat/terminasi`**
- [x] **Gunakan `FormData`** (bukan `JSON.stringify`) — ikuti pola SP `sp-form-sheet.tsx` L214–236
- [x] `fd.append("pegawaiId", String(values.pegawaiId))` — semua field append ke FormData
- [x] `fd.append("jenisSk", "SK_PENSIUN")` — hardcode
- [x] File: `if (fileRef.current?.files?.[0]) fd.append("fileName", fileRef.current.files[0])`
- [x] Validasi file size ≤ 5 MB sebelum submit (guard client-side, SP L209–212)
- [x] **JANGAN set `Content-Type`** — browser auto-set boundary multipart
- [x] Sukses → `toast.success("Terminasi berhasil disimpan")` + `qc.invalidateQueries` (kedua tab: calon-pensiun + terminasi) + `onClose()`
- [x] Error BE → `setError("root", { message: ... })` + `toast.error(...)` (ikuti SP L246–250); Sheet tetap terbuka
- [x] 409 duplikat → pesan BE: `"Terminasi is already exist"`

**G. Wire ke `terminasi-client.tsx`**
- [x] State: `sheetOpen`, `prefillPegawai` di `TerminasiClient`
- [x] Tombol "Tambah Terminasi" di header → `setSheetOpen(true)`, `setPrefillPegawai(null)`
- [x] Kolom Aksi di tab "Calon Pensiun": tombol ikon per baris → `setSheetOpen(true)`, `setPrefillPegawai(row)`
- [x] Mount `<TerminasiFormSheet>` **sekali** di level page (bukan per baris)

**H. Quality gate**
- [x] `bun run build` — zero error
- [x] `bunx biome check` — zero lint error
- [x] `bun run test` — tidak ada test yang pecah
- [x] `bd close kepegawaian-fe-9uqt`

---

## Definition of Done

- [x] Tombol "Tambah Terminasi" di header page selalu terlihat (tidak bergantung tab aktif)
- [x] Klik tombol → Sheet terbuka dengan picker pegawai kosong
- [x] Klik baris di tab "Calon Pensiun" → Sheet terbuka dengan data pegawai pre-fill
- [x] Picker pegawai: search live, debounce 300ms, hanya `KARYAWAN_AKTIF`
- [x] Setelah pilih pegawai: nama, NIPAM, organisasi, jabatan tampil sebagai read-only
- [x] Field wajib tervalidasi via Zod + RHF sebelum submit
- [x] AlasanTerminasi: fetch dari backend, bukan hardcode
- [x] Filter "Alasan Terminasi" di tab "Sudah Terminasi": fetch dari backend, bukan hardcode
- [x] `jenisSk` tidak ditampilkan di form — hardcode `SK_PENSIUN` di payload
- [x] File input opsional: `<input type="file">`, guard 5 MB, dikirim via FormData
- [x] Submit pakai `multipart/form-data` (FormData, tanpa set Content-Type manual)
- [x] POST sukses → toast + kedua tab invalidate + Sheet tutup
- [x] POST gagal → error inline di form + toast.error, Sheet tetap terbuka
- [x] `bun run test` · `bun run build` · `bunx biome check` — semua hijau
- [x] `npx gitnexus analyze` + `bd dolt push` + `git push`

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
