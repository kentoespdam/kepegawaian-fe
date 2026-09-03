# Claim Order — Cascade Grade by levelId di Form Profesi

> Papan pantau untuk agen implementer. Sumber kebenaran status = **beads (`bd`)**,
> bukan file ini. File ini = **urutan claim** + **checklist** biar mudah dibaca sekilas.
> Jangan pakai TodoWrite/markdown lain untuk tracking — pakai `bd`.
>
> Alur per issue: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.
> `bd ready` HANYA memunculkan issue yang blocker-nya tuntas — **selalu tanya `bd ready` dulu**.

**Fitur.** Backend response `/list` untuk `jabatan` dan `grade` sekarang membawa `levelId`.
Grade dropdown di form profesi harus menampilkan grade berdasarkan `levelId` dari jabatan
yang dipilih — cascade mirip organisasi→jabatan.

**Keputusan desain (grill):**

1. **levelId source:** Store full jabatan response data, lookup `levelId` saat jabatan berubah.
2. **Grade endpoint:** Pakai `GET /master/grade/list`, filter `levelId` di client (YAGNI filter endpoint).
3. **Grade cascade behavior:** Reset + disabled grade saat jabatan belum terpilih / berubah.

---

## Prasyarat (baca sebelum ngoding)

1. [`docs/design/coding-rules.md`](./design/coding-rules.md) — aturan wajib (baris ≤120).
2. `src/app/(app)/master/profesi/form.tsx` — form profesi yang akan dimodifikasi.
3. `src/types/master/grade.ts` — butuh update `GradeListResponse` tambah `levelId`.
4. `src/types/master/jabatan.ts` — butuh update `JabatanListResponse` tambah `levelId`.
5. `src/components/fk-combobox.tsx` — existing FK combobox (tidak berubah).

---

## Urutan claim (strictly sequential)

`bd ready` hanya memunculkan satu issue pada satu waktu. Ikuti urutan ini.

### 1. `kepegawaian-fe-5y4` — Type sync: tambah `levelId` ke GradeListResponse & JabatanListResponse
**← depends on:** — (ready duluan)

Backend response list grade & jabatan sekarang membawa `levelId`. Sync tipe di `src/types/master/`.

- [x] `src/types/master/grade.ts` — `GradeListResponse`: tambah `levelId?: number`
- [x] `src/types/master/jabatan.ts` — `JabatanListResponse`: tambah `levelId?: number`
- [x] Quality gate: `tsc --noEmit` + biome check
- [x] `bd claim` + `bd close` — commit & push

### 2. `kepegawaian-fe-cq2` — Cascade grade by levelId di form profesi
**← depends on:** `5y4`

- [x] `src/app/(app)/master/profesi/form.tsx`:
  - Store full jabatan response data jadi lookup map `{id → item}` (bukan `{value, label}` aja)
  - Saat jabatan `onChange`: ambil `levelId` dari lookup, simpan ke state `selectedLevelId`
  - Filter `gradeOpts` berdasarkan `selectedLevelId`
  - Reset grade value saat jabatan berubah
  - Disable grade field saat tidak ada jabatan terpilih
- [x] **JANGAN** sentuh `fk-combobox.tsx`, `grade.config.ts`, atau `jabatan.config.ts`
- [x] Quality gate: `tsc --noEmit` + biome check
- [x] `bd claim` + `bd close` — commit & push

---

## Definition of Done (tiap issue)

- [x] Sesuai desain yang sudah digrill (bukan improvisasi).
- [x] Baris ≤120; logika hook via `useMemo`/state lokal.
- [x] `gitnexus_impact` sebelum edit, `gitnexus_detect_changes` sebelum commit.
- [x] Quality gate lolos (`bunx biome check`, `bun run tsc --noEmit`).
- [x] `bd close` + commit + push.

---

## Invarian yang tak boleh dilanggar

- **Tipe generated** (`docs/api/master/types/`) TIDAK disentuh — hanya `src/types/master/` yang disync.
- **`fk-combobox.tsx`** TIDAK berubah — murni perubahan caller-side.
- **`grade.config.ts` / `jabatan.config.ts`** TIDAK berubah.
- **`api/client.ts`** TIDAK berubah.
