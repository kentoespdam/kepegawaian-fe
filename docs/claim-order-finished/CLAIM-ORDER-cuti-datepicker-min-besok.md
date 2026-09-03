# Claim Order — Cuti: Rule Min Tanggal Pengajuan (mulai ≥ besok, selesai ≥ mulai)

> **Konteks:** Form pengajuan cuti saat ini bisa submit ke tanggal yang sudah lewat. Rule
> baru (keputusan grill 2026-08-18, **CU-17** di `docs/context/cuti.md`): Tanggal Mulai
> min = **besok** (literal, tanpa skip weekend/libur), Tanggal Selesai min = Tanggal Mulai,
> Zod refine `selesai ≥ mulai`. Edit mode dikecualikan dari guard min-besok (tanggal lama
> tetap valid). FE-only — BE masih menerima tanggal lewat (gap dicatat di CU-17).
> Issue: `bd show kepegawaian-fe-9900`.

## Konteks

| Item | Nilai |
|------|-------|
| Komponen | `FieldDate` (shared, `src/components/field-renderers.tsx`) — tambah prop opsional `min` |
| Konsumen | `src/app/(app)/cuti/pengajuan/pengajuan-form-sheet.tsx` (+ test) |
| Calendar | react-day-picker v9 via `src/components/ui/calendar.tsx` — `disabled={{ before: Date }}` |
| Impact | FieldDate CRITICAL (13 caller) — tapi perubahan **aditif** (prop opsional, default `undefined`) → form lain tak tersentuh |
| Klaim cuti | Belum ada UI FE (hanya endpoint BE) → tidak terpengaruh |

## Aturan (knowledge.md / coding-rules)

- **WAJIB** baca `docs/design/coding-rules.md` + aktifkan `/ponytail` sebelum menulis kode.
- Explore: graphify → gitnexus → grep (last resort). `gitnexus_impact` sebelum edit simbol.
- `bun run build` zero-error, `bunx biome check` bersih, `bun run test` hijau.
- Update graph (gitnexus analyze) sebelum commit; commit & push sesuai protokol.

## Urutan Kerja

### Step 1 — `FieldDate` (shared): prop opsional `min`

File: `src/components/field-renderers.tsx`

- [x] Tambah prop `min?: string` (YYYY-MM-DD) di signature `FieldDate` (default `undefined`).
- [x] Saat `min` ada → `<Calendar disabled={{ before: new Date(`${min}T00:00:00`) }} />`.
      Saat `undefined` → jangan pass `disabled` (perilaku lama identik).
- [x] 14 form lain tidak diubah.

### Step 2 — Wire di form pengajuan

File: `src/app/(app)/cuti/pengajuan/pengajuan-form-sheet.tsx`

- [x] Helper `besok()` → `today + 1` (local midnight, YYYY-MM-DD).
- [x] `<FieldDate label="Tanggal Mulai" min={minMulai} … />`.
- [x] `<FieldDate label="Tanggal Selesai" min={tanggalMulai || minMulai} … />`.

### Step 3 — Zod: refine + guard min-besok

File: `src/app/(app)/cuti/pengajuan/pengajuan-form-sheet.tsx`

- [x] `superRefine`: `tanggalSelesai ≥ tanggalMulai` (selalu, pesan jelas).
- [x] Guard `tanggalMulai ≥ besok` **hanya saat `!editing`** via `setError` di onSubmit
      (edit: tanggal lama valid) — pesan "Tanggal mulai tidak boleh sebelum besok".

### Step 4 — Test

File: `src/app/(app)/cuti/pengajuan/pengajuan-form-sheet.test.tsx`

- [x] `pickTodayInOpenPopover()` → `pickTomorrowInOpenPopover()` (pilih **besok**).
- [x] Alur berantai + POST body tetap benar (jumlahHariKerja mock tetap 3).

### Step 5 — Quality gates & ship

- [x] `bun run build` (zero error), `bunx biome check`, `bun run test`.
- [x] `npx gitnexus analyze` + `detect-changes` — scope hanya form pengajuan + FieldDate.
- [x] Commit `<type>: cuti: …` → `git pull --rebase` → `bd dolt push` → `git push` → verify.
