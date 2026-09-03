# Claim Order — REVISI #2 Tambah Pegawai (hasil periksa-ulang grill 2026-07-27)

> Papan pantau untuk agen implementer. **Sumber kebenaran status = beads (`bd`)**, bukan file ini.
> File ini = **urutan claim** + **checklist** + **pointer keputusan terkunci**.
> Keputusan lengkap ada di [`CLAIM-ORDER-data-pegawai-crud.md`](./CLAIM-ORDER-data-pegawai-crud.md) → section **REVISI #2**.
> Jangan pakai TodoWrite/markdown lain untuk tracking — pakai `bd`.
>
> Alur per issue: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.

**Konteks.** Empat deviasi ditemukan saat periksa-ulang implementasi "Tambah Data Pegawai" vs keputusan
terkunci. Semua sudah dikunci (REVISI #2 poin 1–5). Ini urutan eksekusinya.

## Issue

| # | Issue | Prioritas | Cakupan | Status awal |
|---|---|---|---|---|
| 1 | `kepegawaian-fe-5f6` | P1 bug | `statusPegawai` wajib — tutup lubang validasi early-return | open |
| 2 | `kepegawaian-fe-mm8` | P1 bug | Golongan FK label kosong di 3 site (labelFn) | open |
| 3 | `kepegawaian-fe-xvz` | P1 bug | `statusKerja` wajib + default `KARYAWAN_AKTIF` + dependency ke `statusPegawai` | open |
| 4 | `kepegawaian-fe-k06` | P2 task | Fetch enum `statusPegawai`/`statusKerja` dari API (label-only), ganti `ENUMS` hardcoded | open |

**Urutan.** P1 dulu (1→2→3), lalu P2 (4). `k06` **paling akhir** — ia me-refactor sumber opsi enum
di `tambah-form.tsx` + `data-pegawai-toolbar.tsx`; kerjakan setelah logika wajib/default `statusKerja`
(`xvz`) terkunci supaya tidak tabrakan edit di file yang sama & invariant "konstanta bisnis tetap literal" terjaga.

**Overlap file (hati-hati saat paralel):**
- `schema.ts` — disentuh **5f6** (statusPegawai) & **xvz** (statusKerja). Bisa satu agen borong keduanya.
- `tambah-form.tsx` — disentuh **mm8** (golongan labelFn :40), **xvz** (default+onSubmit+FieldSelect statusKerja), **k06** (ganti ENUMS→hook).
- `data-pegawai-toolbar.tsx` — disentuh **mm8** (:127, :194) & **k06** (STATUS_OPTIONS, POPOVER_FILTERS, chip).

---

## Prasyarat (baca sebelum ngoding)

1. [`CLAIM-ORDER-data-pegawai-crud.md`](./CLAIM-ORDER-data-pegawai-crud.md) → **REVISI #2** (keputusan lengkap + rasional).
2. [`docs/design/coding-rules.md`](./design/coding-rules.md) — aturan wajib (baris ≤120).
3. `src/types/_shared.ts` — `StatusKepegawaian`, `StatusBerhenti`, `EnumOption`, `ListResultEnumOption` (**generated, JANGAN diedit**).
4. `src/app/(app)/kepegawaian/data/tambah/hooks.ts` — pola `usePajakOptions()` (template hook fetch untuk `k06`).
5. bd memories: `9x2` (FK autoselect edit), `combobox-grade-kosong` (labelFn grade — analog `mm8`).
6. **`gitnexus_impact` WAJIB** sebelum edit tiap symbol; **`gitnexus_detect_changes`** sebelum commit (per CLAUDE.md).

---

## 1. `kepegawaian-fe-5f6` — `statusPegawai` WAJIB (P1)
**← depends on:** — (ready)

- [x] `schema.ts`: `statusPegawai` → `z.string().min(1, "Pilih status pegawai")`.
- [x] `schema.ts` `superRefine` (~baris 35): **HAPUS** cabang `!vals.statusPegawai` dari early-return; sisakan hanya `=== "NON_PEGAWAI"`.
- [x] `tambah-form.tsx` FieldSelect "Status Pegawai" → tambah prop `required` (asterisk UI selaras Zod).
- [x] Verifikasi: submit status kosong → error inline per-field, **bukan** toast error mentah (`errors.root`).
- [x] Quality gate: `tsc --noEmit` + `biome check` ✅.
- [x] `bd close kepegawaian-fe-5f6` ✅.

## 2. `kepegawaian-fe-mm8` — Golongan FK label kosong (P1)
**← depends on:** — (ready; independen dari 5f6)

- [x] Samakan **3 site** → `useFkOptions("golongan", (i) => `${String(i.golongan ?? "")} - ${String(i.pangkat ?? "")}`)`:
  - [x] `tambah-form.tsx` (dropdown Tambah)
  - [x] `data-pegawai-toolbar.tsx` (dropdown filter popover)
  - [x] `data-pegawai-toolbar.tsx` (chip label filter aktif)
- [x] `value` tetap `String(i.id)`. Format label golongan **dikunci = `"golongan - pangkat"`**.
- [x] ⛔ JANGAN sentuh `useFkOptions.ts` / `fk-combobox.tsx` — tidak disentuh ✅.
- [x] Quality gate: `tsc --noEmit` + `biome check` ✅.
- [x] `bd close kepegawaian-fe-mm8` ✅.

## 3. `kepegawaian-fe-xvz` — `statusKerja` wajib + default + dependency (P1)
**← depends on:** `kepegawaian-fe-5f6` (pola wajib sama; hindari konflik edit `schema.ts`)

- [x] `tambah-form.tsx`: `defaultValues` → tambah `statusKerja: "KARYAWAN_AKTIF"`.
- [x] `tambah-form.tsx` FieldSelect "Status Kerja" → tandai `required` (asterisk).
- [x] `schema.ts` `superRefine`: cek wajib `statusKerja` diletakkan **SETELAH** early-return `=== "NON_PEGAWAI"` → auto-skip untuk NON_PEGAWAI.
- [x] `tambah-form.tsx` `onSubmit`: kirim `statusKerja` **hanya bila `!isNonPegawai`** (jangan kirim nilai default saat NON_PEGAWAI).
- [x] Verifikasi: NON_PEGAWAI → field statusKerja tetap tersembunyi & tak ada di payload.
- [x] Quality gate: `tsc --noEmit` + `biome check` ✅.
- [x] `bd close kepegawaian-fe-xvz` ✅.

## 4. `kepegawaian-fe-k06` — Enum dari API (label-only) (P2)
**← depends on:** `kepegawaian-fe-xvz` (refactor file yang sama; kerjakan setelah default/wajib statusKerja terkunci)

- [x] Bikin 2 hook di `tambah/hooks.ts` pola `usePajakOptions()` — **tanpa tipe baru**, reuse `EnumOption`/`ListResultEnumOption`:
  - [x] `useStatusPegawaiOptions()` → `GET /master/status-pegawai/list`; map `value=String(id)`, `label=String(nama)`.
  - [x] `useStatusKerjaOptions()` → `GET /master/status-kerja/list`; map `value=String(id)`, `label=String(nama)`.
- [x] Ganti pemakaian:
  - [x] `tambah-form.tsx` — 2 FieldSelect (statusPegawai, statusKerja) pakai hook, bukan `ENUMS.*`.
  - [x] `edit-gaji-sheet.tsx` — juga pakai hook untuk statusPegawai.
  - [x] `data-pegawai-toolbar.tsx` — `STATUS_OPTIONS`, `POPOVER_FILTERS` statusKerja, chip labels dari hook.
- [x] Hapus `ENUMS.statusPegawai` & `ENUMS.statusKerja` dari `constants.ts`. Enum lain **TETAP literal**.
- [x] ⚠️ **KONSTANTA BISNIS TETAP LITERAL:** default `KARYAWAN_AKTIF`, tab-filter, exemption `=== "NON_PEGAWAI"` — tidak di-derive.
- [x] Quality gate: `tsc --noEmit` + `biome check` ✅.
- [x] `bd close kepegawaian-fe-k06` ✅.

---

## Definition of Done (gelombang REVISI #2)

- [ ] **5f6**: `statusPegawai` kosong ditolak inline (bukan error mentah BE); asterisk = Zod ditegakkan.
- [ ] **mm8**: dropdown & chip golongan menampilkan `"golongan - pangkat"` di 3 site; tak ada baris blank.
- [ ] **xvz**: pegawai baru muncul di tab yang benar setelah create; NON_PEGAWAI tak mengirim `statusKerja`.
- [ ] **k06**: `ENUMS.statusPegawai`/`statusKerja` terhapus; label dari API; konstanta bisnis & schema exemption tak berubah; tak ada tipe baru.
- [ ] `tsc --noEmit` & `biome check` lolos di tiap issue.

## Invarian (jangan dilanggar)

- **Tipe generated** (`_shared.ts`, `pegawai.ts`) TIDAK diedit manual.
- ⛔ `useFkOptions.ts` / `fk-combobox.tsx` TIDAK disentuh — masalah golongan = caller data-shape.
- Konstanta bisnis enum (default/tab-filter/exemption) **tetap literal**, tak di-derive dari fetch (`k06`).
- Aturan NON_PEGAWAI (relax-3-FK + statusKerja optional-hidden) = keputusan FE sengaja — jangan diselaraskan ke tipe.
