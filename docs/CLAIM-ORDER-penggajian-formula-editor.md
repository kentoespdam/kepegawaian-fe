# Claim Order: Formula Editor dengan Shortcut Buttons

> Issue: `kepegawaian-fe-wwkj`
> Modul: `penggajian/setup/komponen`
> Status: ✅ Done

## Konteks

Update form Tambah/Edit Komponen Gaji untuk menambahkan Formula Editor dengan shortcut buttons
(operator + available kode). Dialog dipakai untuk create dan edit.

## Referensi

- Context: `docs/context/penggajian.md` §Entity & Pattern Khas #1
- Types: `src/types/penggajian/komponen.ts`
- Client: `src/app/(app)/penggajian/setup/komponen/komponen-client.tsx`
- API spec: `docs/api/penggajian/api.json` (endpoint `/kode` dan `/urut`)
- Coding rules: `docs/design/coding-rules.md`

## Claim Order (Step-by-Step)

### Step 1: Tambah helper `listKode` dan `getUrut` di penggajian-client

- [x] Tambah method `listKode<T>(profilId: string)` → `GET /penggajian/komponen/{profilId}/kode`
- [x] Tambah method `getUrut<T>(profilId: string)` → `GET /penggajian/komponen/{profilId}/profil/urut`
- [x] File: `src/lib/api/penggajian-client.ts`

### Step 2: Buat hook `useKomponenForm`

- [x] Fetch available kode on dialog open (`staleTime: 0`)
- [x] Fetch urutan on dialog open (auto-fill)
- [x] State: form fields (kode, nama, jenisGaji, nilai, formula, urut)
- [x] Logic: append to formula + on-blur smart format
- [x] Logic: exclude current komponen kode when editing
- [x] File: `src/hooks/penggajian/useKomponenForm.ts`

### Step 3: Buat komponen `FormulaEditor`

- [x] `<Textarea>` auto-grow untuk formula input
- [x] On-blur smart format (regex: operator/kurung → 1 spasi)
- [x] Operator buttons: `(`, `)`, `*`, `/`, `+`, `-`
- [x] Available Kode buttons: grouped by jenis, chip style, scrollable `max-h-36`
- [x] Tampilkan `kode + nama` di tombol, append hanya `kode`
- [x] File: `src/components/formula-editor.tsx`

### Step 4: Update dialog form di `komponen-client.tsx`

- [x] Lebar dialog: `sm:max-w-xl`
- [x] Tambah field Formula (gunakan `<FormulaEditor>`)
- [x] Tambah field Urutan (auto-fill, user bisa override)
- [x] Layout: Jenis Gaji + Urutan (2 kolom), Nilai full-width
- [x] Wire create + edit mode (pre-fill saat edit)
- [x] File: `src/app/(app)/penggajian/setup/komponen/komponen-client.tsx`

### Step 5: Unit test hook `useKomponenForm`

- [x] Test: append to formula
- [x] Test: on-blur smart format
- [x] Test: exclude current kode when editing
- [x] Test: auto-fill urutan
- [x] File: `src/hooks/penggajian/useKomponenForm.test.tsx`

### Step 6: Quality gate & commit

- [x] `bun run test` — all green (237 tests)
- [x] `bun run build` — pre-existing error only (proses_gaji), my files pass tsc
- [x] `bunx biome check` — zero lint error
- [x] `bd close kepegawaian-fe-wwkj`
- [x] Commit: `00eedb7 feat(penggajian): batch workflow, proses gaji, hooks & configs`
