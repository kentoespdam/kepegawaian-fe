# Claim Order: Formula Editor dengan Shortcut Buttons

> Issue: `kepegawaian-fe-wwkj`
> Modul: `penggajian/setup/komponen`
> Status: ⏳ Belum diklaim

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

- [ ] Tambah method `listKode<T>(profilId: string)` → `GET /penggajian/komponen/{profilId}/kode`
- [ ] Tambah method `getUrut<T>(profilId: string)` → `GET /penggajian/komponen/{profilId}/profil/urut`
- [ ] File: `src/lib/api/penggajian-client.ts`

### Step 2: Buat hook `useKomponenForm`

- [ ] Fetch available kode on dialog open (`staleTime: 0`)
- [ ] Fetch urutan on dialog open (auto-fill)
- [ ] State: form fields (kode, nama, jenisGaji, nilai, formula, urut)
- [ ] Logic: append to formula + on-blur smart format
- [ ] Logic: exclude current komponen kode when editing
- [ ] File: `src/hooks/penggajian/useKomponenForm.ts`

### Step 3: Buat komponen `FormulaEditor`

- [ ] `<Textarea>` auto-grow untuk formula input
- [ ] On-blur smart format (regex: operator/kurung → 1 spasi)
- [ ] Operator buttons: `(`, `)`, `*`, `/`, `+`, `-`
- [ ] Available Kode buttons: grouped by jenis, chip style, scrollable `max-h-36`
- [ ] Tampilkan `kode + nama` di tombol, append hanya `kode`
- [ ] File: `src/components/formula-editor.tsx`

### Step 4: Update dialog form di `komponen-client.tsx`

- [ ] Lebar dialog: `sm:max-w-xl`
- [ ] Tambah field Formula (gunakan `<FormulaEditor>`)
- [ ] Tambah field Urutan (auto-fill, user bisa override)
- [ ] Layout: Jenis Gaji + Urutan (2 kolom), Nilai full-width
- [ ] Wire create + edit mode (pre-fill saat edit)
- [ ] File: `src/app/(app)/penggajian/setup/komponen/komponen-client.tsx`

### Step 5: Unit test hook `useKomponenForm`

- [ ] Test: append to formula
- [ ] Test: on-blur smart format
- [ ] Test: exclude current kode when editing
- [ ] Test: auto-fill urutan
- [ ] File: `src/hooks/penggajian/useKomponenForm.test.ts`

### Step 6: Quality gate & commit

- [ ] `bun run test` — all green
- [ ] `bun run build` — zero error
- [ ] `bunx biome check` — zero lint error
- [ ] `bd close kepegawaian-fe-wwkj`
- [ ] Commit: `feat(penggajian/komponen): add formula editor with shortcut buttons`
