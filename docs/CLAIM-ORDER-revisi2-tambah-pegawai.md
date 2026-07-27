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

- [ ] `gitnexus_impact({target:"schema", direction:"upstream"})` — laporkan blast radius sebelum edit.
- [ ] `schema.ts`: `statusPegawai` → `z.string().min(1, "Pilih status pegawai")`.
- [ ] `schema.ts` `superRefine` (~baris 35): **HAPUS** cabang `!vals.statusPegawai` dari early-return; sisakan hanya `=== "NON_PEGAWAI"`.
- [ ] `tambah-form.tsx:221` FieldSelect "Status Pegawai" → tambah prop `required` (asterisk UI selaras Zod).
- [ ] Verifikasi: submit status kosong → error inline per-field, **bukan** toast error mentah (`errors.root`).
- [ ] `gitnexus_detect_changes()` sebelum commit.
- [ ] Quality gate: `bun run tsc --noEmit` + `bunx biome check` ✅.
- [ ] `bd close kepegawaian-fe-5f6` — commit & push.

## 2. `kepegawaian-fe-mm8` — Golongan FK label kosong (P1)
**← depends on:** — (ready; independen dari 5f6)

- [ ] `gitnexus_impact` pada pemanggil `useFkOptions("golongan")`.
- [ ] Samakan **3 site** → `useFkOptions("golongan", (i) => `${String(i.golongan ?? "")} - ${String(i.pangkat ?? "")}`)`:
  - [ ] `tambah-form.tsx:40` (dropdown Tambah)
  - [ ] `data-pegawai-toolbar.tsx:127` (dropdown filter popover)
  - [ ] `data-pegawai-toolbar.tsx:194` (chip label filter aktif)
- [ ] `value` tetap `String(i.id)`. Format label golongan **dikunci = `"golongan - pangkat"`**.
- [ ] ⛔ JANGAN sentuh `useFkOptions.ts` / `fk-combobox.tsx` — ini caller data-shape (sekelas `9x2`/`y2h`).
- [ ] `gitnexus_detect_changes()` sebelum commit.
- [ ] Quality gate: `tsc --noEmit` + `biome check` ✅.
- [ ] `bd close kepegawaian-fe-mm8` — commit & push.

## 3. `kepegawaian-fe-xvz` — `statusKerja` wajib + default + dependency (P1)
**← depends on:** `kepegawaian-fe-5f6` (pola wajib sama; hindari konflik edit `schema.ts`)

- [ ] `gitnexus_impact({target:"schema", direction:"upstream"})`.
- [ ] `tambah-form.tsx:30`: `defaultValues` → tambah `statusKerja: "KARYAWAN_AKTIF"`.
- [ ] `tambah-form.tsx:275-281` FieldSelect "Status Kerja" → tandai `required` (asterisk).
- [ ] `schema.ts` `superRefine`: cek wajib `statusKerja` diletakkan **SETELAH** early-return `=== "NON_PEGAWAI"` → auto-skip untuk NON_PEGAWAI.
- [ ] `tambah-form.tsx` `onSubmit` (~baris 85): kirim `statusKerja` **hanya bila `!isNonPegawai`** (jangan kirim nilai default saat NON_PEGAWAI).
- [ ] Verifikasi: create pegawai (non-NON_PEGAWAI) → baris langsung muncul di tab Aktif setelah redirect (tak jatuh ke status limbo).
- [ ] Verifikasi: NON_PEGAWAI → field statusKerja tetap tersembunyi & tak ada di payload.
- [ ] `gitnexus_detect_changes()` sebelum commit.
- [ ] Quality gate: `tsc --noEmit` + `biome check` ✅.
- [ ] `bd close kepegawaian-fe-xvz` — commit & push.

## 4. `kepegawaian-fe-k06` — Enum dari API (label-only) (P2)
**← depends on:** `kepegawaian-fe-xvz` (refactor file yang sama; kerjakan setelah default/wajib statusKerja terkunci)

- [ ] `gitnexus_impact` pada `ENUMS` + pemanggilnya.
- [ ] Bikin 2 hook di `tambah/hooks.ts` pola `usePajakOptions()` — **tanpa tipe baru**, reuse `EnumOption`/`ListResultEnumOption` (`_shared.ts:347-352`):
  - [ ] `useStatusPegawaiOptions()` → `GET /master/status-pegawai/list`; map `value=String(id)`, `label=String(nama)`.
  - [ ] `useStatusKerjaOptions()` → `GET /master/status-kerja/list`; map `value=String(id)`, `label=String(nama)`.
- [ ] Ganti pemakaian:
  - [ ] `tambah-form.tsx` — 2 FieldSelect (statusPegawai, statusKerja) pakai hook, bukan `ENUMS.*`.
  - [ ] `data-pegawai-toolbar.tsx` — `STATUS_OPTIONS` (:57-64), `POPOVER_FILTERS` statusKerja (:32-45), chip `statusPegawaiLabel` (:76-86).
- [ ] Hapus `ENUMS.statusPegawai` & `ENUMS.statusKerja` dari `constants.ts:30-47`. Enum lain (`jenisKelamin`/`agama`/`statusKawin`/`golonganDarah`) **TETAP literal**.
- [ ] ⚠️ **KONSTANTA BISNIS TETAP LITERAL, jangan derive dari fetch:** default `KARYAWAN_AKTIF`, tab-filter (`data-pegawai-client.tsx:17-18`), exemption `=== "NON_PEGAWAI"` di schema.
- [ ] **Invariant:** nilai konstanta FE (`KARYAWAN_AKTIF`, dll) harus tetap ada di daftar enum BE — kalau BE hapus/rename, row bisa invisible lagi (regresi `xvz`).
- [ ] Verifikasi: dropdown & filter memuat label dari API; row baru tetap muncul di tab setelah create.
- [ ] `gitnexus_detect_changes()` sebelum commit.
- [ ] Quality gate: `tsc --noEmit` + `biome check` ✅.
- [ ] `bd close kepegawaian-fe-k06` — commit & push.

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
