# Claim Order — Data Pegawai: CRUD (Tambah / Edit Profil / Edit Gaji / Filter)

> Papan pantau untuk agen implementer. Sumber kebenaran status = **beads (`bd`)**,
> bukan file ini. File ini = **urutan claim** + **checklist** + **keputusan terkunci**.
> Jangan pakai TodoWrite/markdown lain untuk tracking — pakai `bd`.
>
> Alur per issue: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.

**Tujuan.** Halaman Data Pegawai (kini master-detail display-only) dapat kemampuan
**tambah** (create), **edit profil**, **edit gaji**, dan **filter** — mengikuti kontrak
tipe generated `src/types/pegawai/pegawai.ts` + pola form/mutation yang **sudah ada** di repo.
**Hapus = OUT OF SCOPE** (dilakukan lewat terminasi / riwayat kepegawaian, bukan tombol delete di tabel ini).

**Issue beads:**
| Issue | Cakupan | Status awal |
|---|---|---|
| `kepegawaian-fe-9hk` | Halaman Tambah `/kepegawaian/data/tambah` (CREATE) | ready |
| `kepegawaian-fe-ds5` | Edit Profil + Edit Gaji (2 Sheet, PATCH) | ready |
| `kepegawaian-fe-7h2` | Toolbar filter (Search+Status inline, 8 sisa popover, chip) | **blocked** ← `9hk` (tombol "+ Tambah" merujuk halaman tambah) |

---

## 🔒 Keputusan desain (hasil grill — DIKUNCI, jangan re-litigasi)

| Area | Keputusan |
|---|---|
| **Aksi baris** | ~~2 ikon inline di kolom Aksi~~ → **DIREVISI**, lihat section **REVISI** di bawah. Action edit kini **tombol berlabel di header panel Ringkasan** (tab pegawai), kolom Aksi tabel dilepas. Klik baris tetap select→Ringkasan. |
| **Hapus** | **OUT OF SCOPE** (via terminasi/riwayat). Jangan tambah tombol delete. |
| **CREATE container** | **Halaman terdedikasi** `/kepegawaian/data/tambah`. Seksi Biodata selalu tampil + seksi Kepegawaian **adaptif** by `statusPegawai`. |
| **EDIT container** | **Sheet per aksi** (Profil 17 field / Gaji 9 field). Reuse pola Sheet sanksi/profesi (`sm:max-w-120`). |
| **CREATE endpoint** | **Tunggal `POST /pegawai`**. `isPegawai=false` utk NON_PEGAWAI → BE smart-route (biodata-saja / pegawai penuh). Tak ada percabangan endpoint di FE. |
| **EDIT endpoint** | **2 PATCH**: `PATCH /pegawai/{id}/profil` (17 field) + `PATCH /pegawai/{id}/gaji` (9 field). Submit **`dirtyFields`-only** = PATCH parsial native. |
| **Validasi** | **Zod `superRefine` kondisional by `statusPegawai`** (base tandai FK optional, superRefine paksa wajib sesuai yang ditampilkan). |
| **Filter FK** | param = `xxxId`, tampil = `nama` (combobox + chip). `grade` butuh `labelFn` `(i)=>'Grade '+i.grade`. |

### ⚠️ Aturan wajib field (BACA — ada deviasi sengaja dari tipe)

`PegawaiPostRequest` ≡ `PegawaiPutRequest`, **28 field**. Komen tipe **HANYA metadata**
(`// minLength 1`, `// int64, min 1`, `// date`) — **TIDAK** mendokumentasikan aturan
kondisional apa pun. Sudah diverifikasi vs `api.json` (array `required` = 12 field flat, deskripsi kosong).

**12 field WAJIB menurut kontrak** (tak ber-`?`):
`nik, nama, jenisKelamin, tempatLahir, tanggalLahir, alamat, agama, ibuKandung, nipam, jabatanId, organisasiId, kodePajakId`.

**Aturan implementasi (superRefine):**
- **Status berkepegawaian** (KONTRAK/CAPEG/PEGAWAI/CALON_HONORER/HONORER): wajibkan **12 field kontrak** di atas.
- **NON_PEGAWAI**: **relax** `jabatanId` / `organisasiId` / `kodePajakId` jadi optional **+ sembunyikan seksi Kepegawaian**.

> **🟡 DEVIASI SENGAJA — keputusan FE, bukan dari BE.** Aturan relax-3-FK untuk NON_PEGAWAI
> **tidak ada** di kontrak tipe maupun `api.json` (di sana ke-3 FK ini tampak unconditional-required).
> Ini keputusan **UI/UX sisi FE yang sengaja** dibuat user, karena `POST /pegawai` sudah
> smart-save ke **biodata-saja** saat `isPegawai=false`. Dikonfirmasi user verbatim:
> *"rule NON_PEGAWAI ini memang sengaja aku buat untuk kebutuhan UI/UX di FE dan tidak di dokumentasikan di BE."*
> Jangan "perbaiki" jadi mengikuti tipe — ini disengaja.

---

## Kontrak field (dari `src/types/pegawai/pegawai.ts` — generated, JANGAN diedit)

**`PegawaiPostRequest` / `PegawaiPutRequest` (28 field)** — dipakai halaman Tambah.
Wajib (12): lihat di atas. Optional (16): `telp, pendidikanTerakhirId, golonganDarah, statusKawin,
notes, isPegawai, statusPegawai, statusKerja, profesiId, golonganId, nomorSk, tanggalSk,
tmtBerlakuSk, tmtKontrakSelesai, gajiPokok, email`.

**`PegawaiPatchProfil` (17 field)** — Sheet Edit Profil:
`id`\*, `nipam`\*, `nama`\* wajib; sisanya optional: `jenisKelamin, statusKawin, agama, tempatLahir,
tanggalLahir, alamat, ibuKandung, telp, golonganId, organisasiId, jabatanId, profesiId, email, absensiId`.

**`PegawaiPatchGaji` (9 field)** — Sheet Edit Gaji:
`statusPegawai`\*, `kodePajakId`\*, `gajiProfilId`\* wajib; optional: `tmtKerja, tmtPensiun,
gajiPokok, phdp, isAskes, rumahDinasId`.

> `id/nipam/nama` di PatchProfil = identitas (kirim selalu), bukan bagian dirtyFields editable.

---

## 🧩 Pola repo yang WAJIB direuse (jangan bikin baru)

| Kebutuhan | Precedent nyata | Catatan |
|---|---|---|
| **Mutation** | `src/hooks/useSanksiMutations.ts` | `useMutation` + `qc.invalidateQueries` on success. **TAPI** lihat ⛔ di bawah — jangan pakai `api.*`. |
| **⛔ API client** | `src/lib/api/client.ts` | `BASE = "/api/proxy/master"` — **MASTER-ONLY**. `api.create/update` akan salah kena `/master/pegawai`. **Tak ada `api.patch`.** |
| **→ Ganti dengan** | `ringkasanQuery` di `data-pegawai-client.tsx` | **Raw `fetch`** ke `/api/proxy/pegawai...` (POST create, PATCH profil/gaji). Baca `body.data`, cek `!res.ok`. |
| **Form + FK cascade** | `src/app/(app)/master/profesi/form.tsx` | `useFkOptions(entity, labelFn?)` (lokal, baris 18–32), cascade org→jabatan→grade via `useQuery`+`enabled`, sticky submit footer. |
| **FK combobox** | `src/components/fk-combobox.tsx` | value=`String(id)`, label=`nama`. defaultValues = id skalar string (bd memory `9x2`). |
| **Sheet container** | `src/app/(app)/master/entity-form-modal.tsx` | `<Sheet><SheetContent className="sm:max-w-120 flex flex-col gap-0 p-0">`, `SheetHeader shrink-0`, footer sticky. |
| **Enum select** | `src/config/master/sanksi.config.ts` | `options: [{value,label}]` **hand-authored**. Member enum dari `src/types/_shared.ts` (`JenisKelamin, Agama, StatusKawin, GolonganDarah, StatusKepegawaian, StatusBerhenti`). Tak ada helper enum terpusat. |
| **Toolbar filter** | `src/components/data-table-toolbar.tsx` + `fk-combobox-filter.tsx` | `FKComboboxFilter` sudah ada; param=`xxxId`, tampil=`nama`. |
| **Toast** | `sonner` via `src/components/providers.tsx` | `toast.success("... berhasil ...")` (pola master-client.tsx). |
| **Proxy** | `src/proxy.ts` catch-all `/api/proxy/*` | Auto-forward ke backend — **TAK perlu route.ts baru**. |

### Enum → opsi select (dari `_shared.ts`)
- `JenisKelamin`: LAKI_LAKI, PEREMPUAN
- `Agama`: TIDAK_TAHU, ISLAM, KRISTEN, KATOLIK, HINDU, BUDHA, KONGHUCHU, ALIRAN_KEPERCAYAAN, LAINNYA
- `StatusKawin`: BELUM_KAWIN, KAWIN, JANDA_DUDA, MENIKAH_SEKANTOR, TIDAK_TAHU
- `GolonganDarah`: A, B, AB, O
- `StatusKepegawaian`: KONTRAK, CAPEG, PEGAWAI, CALON_HONORER, HONORER, NON_PEGAWAI
- `StatusBerhenti`: BERHENTI_OR_KELUAR, DIRUMAHKAN, KARYAWAN_AKTIF, LAMARAN_BARU, TAHAP_SELEKSI, DITERIMA, DIREKOMENDASIKAN, DITOLAK

---

## Prasyarat (baca sebelum ngoding)

1. [`docs/design/coding-rules.md`](./design/coding-rules.md) — aturan wajib (baris ≤120).
2. `src/types/pegawai/pegawai.ts` — kontrak (generated, **JANGAN diedit**).
3. `src/app/(app)/master/profesi/form.tsx` — pola form + FK cascade + `useFkOptions`.
4. `src/lib/api/client.ts` — konfirmasi ini master-only (⛔ jangan dipakai utk pegawai).
5. `src/app/(app)/kepegawaian/data/data-pegawai-client.tsx` — pola `ringkasanQuery` (raw fetch) + `nav()` (URL param).
6. bd memories: `9x2` (FK autoselect edit), `grade-kosong` (labelFn grade), `master-config-fields-must-mirror-postrequest`.
7. `node_modules/next/dist/docs/` — **versi Next.js ini breaking** (App Router; halaman baru `tambah`).

---

## Urutan claim

### 1. `kepegawaian-fe-9hk` — Halaman Tambah (CREATE)
**← depends on:** — (ready)

- [x] `gitnexus_impact({target:"DataPegawaiClient", direction:"upstream"})` sebelum edit.
- [x] Buat route `src/app/(app)/kepegawaian/data/tambah/page.tsx` (server) + client form (`tambah-form.tsx`).
- [x] RHF + zodResolver. Base schema: FK `jabatanId/organisasiId/kodePajakId` **optional**; `superRefine` paksa wajib bila `statusPegawai !== "NON_PEGAWAI"`.
- [x] `watch("statusPegawai")` → NON_PEGAWAI **sembunyikan seksi Kepegawaian** + set `isPegawai=false`.
- [x] Seksi Biodata selalu tampil (nik, nama, jenisKelamin, tempatLahir, tanggalLahir, alamat, agama, ibuKandung, nipam + optional biodata).
- [x] FK combobox pakai `useFkOptions` (pola profesi/form.tsx).
- [x] Enum select hand-authored `{value,label}` dari daftar `_shared.ts` di atas.
- [x] Submit = **raw `fetch` POST `/api/proxy/pegawai`** (⛔ BUKAN `api.create`), header JSON, body payload; `values.x || undefined` utk optional kosong.
- [x] Sukses → `toast.success` + `router.push('/kepegawaian/data')` + `qc.invalidateQueries` key tabel pegawai. Error → set error.
- [x] `gitnexus_detect_changes()` sebelum commit.
- [x] Quality gate: `bun run tsc --noEmit` + `bunx biome check` ✅.
- [x] `bd close kepegawaian-fe-9hk` — commit & push.

### 2. `kepegawaian-fe-ds5` — Edit Profil + Edit Gaji (2 Sheet, PATCH)
**← depends on:** — (ready; paralel dgn 9hk)

- [x] `gitnexus_impact({target:"DataPegawaiClient", direction:"upstream"})` — LOW risk.
- [x] Kolom Aksi baris (tab Aktif/Non-aktif): 2 ikon — **Edit Profil** (pensil) + **Edit Gaji** (dompet), tooltip, `e.stopPropagation()`.
- [x] Sheet Edit Profil (`PegawaiPatchProfil`, 17 field) — pola `sm:max-w-120`; header shrink-0; footer sticky.
- [x] Sheet Edit Gaji (`PegawaiPatchGaji`, 9 field) — struktur sama + `gajiProfilId` via raw fetch ke penggajian.
- [x] FK defaults = id skalar string; normalisasi via `String(obj?.id ?? "") || undefined`.
- [x] Submit **HANYA `dirtyFields`** + field identitas wajib (`id/nipam/nama` profil; `statusPegawai/kodePajakId/gajiProfilId` gaji).
- [x] Submit = **raw `fetch` PATCH** `/api/proxy/pegawai/${id}/profil` & `/gaji`.
- [x] Sukses → `toast.success` + `qc.invalidateQueries` tabel + `["ringkasan", id]` + tutup Sheet.
- [x] Loader submit + `"Menyimpan…"` di tiap Sheet.
- [x] Quality gate: `tsc --noEmit` + `biome check` ✅.
- [x] `bd close kepegawaian-fe-ds5` — commit & push.

### 3. `kepegawaian-fe-7h2` — Toolbar filter
**← depends on:** `kepegawaian-fe-9hk` (tombol "+ Tambah" → `/kepegawaian/data/tambah`).

- [x] `gitnexus_impact` — LOW risk.
- [x] Inline primer: **Search** (nama, debounced 400ms) + **Status** (`statusPegawai` select). Semua → URL via `nav()`.
- [x] Popover **"Filter"** (Base UI, controlled open state) utk 7 sisa: `jabatanId, organisasiId, profesiId, golonganId, gradeId, statusKerja, jenisKelamin`. FK via `FKComboboxFilter`; `grade` labelFn `'Grade ' + i.grade`.
- [x] **Chip filter aktif** — bisa dihapus, ditampilkan di baris terpisah di bawah toolbar.
- [x] Tombol **"+ Tambah"** (Tirta Blue solid) kanan → `router.push('/kepegawaian/data/tambah')` via callback.
- [x] Semua param terpantul di URL searchParams & memicu refetch tabel.
- [x] Reuse `useFkOptions` dari `tambah/hooks` (DRY).
- [x] Quality gate: `tsc --noEmit` + `biome check` ✅.
- [x] `bd close kepegawaian-fe-7h2` — commit & push.

---

## Definition of Done

- [ ] **Tambah**: form adaptif; berkepegawaian → 12 field wajib tervalidasi; NON_PEGAWAI → seksi Kepegawaian hilang + 3 FK optional + `isPegawai=false`; POST via raw fetch `/api/proxy/pegawai`; sukses redirect + toast + invalidate.
- [ ] **Edit Profil/Gaji**: 2 Sheet terisi; ubah 1 field → hanya field itu terkirim (PATCH parsial); FK auto-select nilai lama; sukses → toast + invalidate tabel + ringkasan.
- [ ] Aksi baris: ikon `stopPropagation` — klik ikon tak men-trigger row-select.
- [ ] **Filter**: Search+Status inline; 8 filter popover; chip aktif; semua di URL; `+ Tambah` navigasi benar.
- [ ] `tsc --noEmit` & `biome check` lolos di tiap issue.
- [ ] Hapus **tidak** ditambahkan (out of scope).

## 🔄 REVISI (2026-07-24) — Action edit PINDAH ke header panel Ringkasan

> Follow-up setelah `ds5` (Edit Profil + Edit Gaji) COMPLETE. Merevisi keputusan **"Aksi baris"**
> di atas + langkah `ds5` yang menaruh 2 ikon di kolom Aksi tabel. Hasil grill — **DIKUNCI**.
> Scope **tab pegawai (Aktif/Non-aktif) SAJA**. Issue: **`kepegawaian-fe-vsr`**.

**Keputusan:**
1. **Pindah penuh, bukan dua tempat.** Kolom Aksi tabel dilepas untuk tab pegawai; action edit hidup HANYA di panel Ringkasan.
2. **`data-table.tsx` TIDAK diubah** (shared primitive, fan-in ≥2 — non-breaking). Perubahan murni di caller:
   `data-pegawai-client.tsx` berhenti mengoper `onEdit`/`onEditGaji` ke `<DataTable>` saat `isPegawaiTab`
   (baris ~191-192) → `hasActions` jadi false → kolom Aksi hilang otomatis. `onRowClick`/`selectedRowId` TETAP.
3. **2 action** (Hapus tetap out of scope, tak ada `onDelete`): **Edit Profil** (`Pencil`→`setEditProfilId`)
   + **Edit Gaji** (`Wallet`→`setEditGajiId`). Keduanya buka Sheet yang sama seperti `ds5` — hanya pemicunya yang pindah.
4. **Tombol BERLABEL** (ikon + teks: "Edit Profil" / "Edit Gaji") di **header** panel — bukan ikon telanjang.
   Manfaatkan ruang `lg:w-[380px]`. (Di kolom tabel dulu terpaksa ikon-only karena sempit.)
5. **Visibilitas tombol:** tampil saat `selectedId` ada **DAN** query ringkasan **sukses**.
   - **Empty** (`!selectedId`): tak render. — **Loading** (`isPending`): tampil (hanya butuh `selectedId`).
   - **Error**: **SEMBUNYI** — user "Coba lagi" dulu. Mutasi sengaja digate ke sukses-fetch panel (pilihan user).
6. **RBAC:** tak ada — `onEdit`/`onEditGaji` tak digating `can()` (terverifikasi). Tak ada gating yang dibawa.
7. **`e.stopPropagation()`** jadi tak relevan utk tab pegawai (tak ada tombol di baris); guard di `DataTable` generik TETAP untuk caller lain.

**File berubah:** `data-pegawai-client.tsx` (cabut 2 prop action; teruskan handler ke panel) +
`ringkasan-panel.tsx` (terima `onEditProfil`/`onEditGaji`, render 2 tombol di header sesuai state #5).
`data-table.tsx` **TAK disentuh**. Tab Non-pegawai tak berubah.

---

## Invarian yang tak boleh dilanggar

- **Tipe generated** (`src/types/pegawai/pegawai.ts`) TIDAK diedit manual.
- **`paging.ts`** TIDAK berubah.
- **⛔ `api` client (master-only) TIDAK dipakai utk pegawai** — semua mutation pegawai = raw `fetch` ke `/api/proxy/pegawai...`.
- **Tak bikin route `/api/proxy/...` baru** — catch-all `proxy.ts` sudah menangani.
- **Aturan NON_PEGAWAI relax-3-FK = keputusan FE sengaja** — jangan diselaraskan ke tipe.
- **Hapus** tetap out of scope (via terminasi).
- **Prop `DataTable`** yang ada TIDAK dipecahkan (perubahan aksi baris harus non-breaking utk caller lain).
