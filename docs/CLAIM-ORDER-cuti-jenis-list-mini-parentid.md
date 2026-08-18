# Claim Order — Cuti: Kontrak `GET /cuti/jenis/list` → `ListResultCutiJenisMiniResponse` + Rule Combo `parentId`

> **Konteks:** Backend `rewrite/master-cqrs` mengubah response `GET /cuti/jenis/list` — item
> `CutiJenisResponse` (objek penuh + `parent` nested) → **`CutiJenisMiniResponse`**
> (`{id, nama, parentId}`) langsung. `parentId` riil dari kolom `parent_id` (null = root).
> Dokumen kontrak: `docs/frontend/FE-CONTRACT-cuti-jenis-mini-parentid.md`.
> Keputusan grill 2026-08-18: `docs/context/cuti.md` **CU-16**. Tanpa ADR (aditif).
> Issue: `bd show kepegawaian-fe-jumr`.

## Konteks

| Item | Nilai |
|------|-------|
| Endpoint | `GET /cuti/jenis/list` — envelope `ListResult` tetap, item → `CutiJenisMiniResponse` |
| `parentId` | Riil di `/cuti/jenis/list`. Mini nested di `/cuti/jenis/*` & pengajuan **tidak** — `null` bukan penanda rusak (glossary **ParentId (Jenis Cuti)**) |
| Tipe generated | `src/types/cuti/jenis.ts` — `ListResultCutiJenisMiniResponse` (baru, via `node docs/api/extract-types.js`) |
| Konsumen FE | `src/app/(app)/cuti/pengajuan/pengajuan-form-sheet.tsx` (+ test) — satu-satunya pemakai list ini |
| Relasi valid | `subJenisCuti.parentId === jenisCuti.id` (per baris pengajuan) |

## Aturan (knowledge.md / coding-rules)

- **WAJIB** baca `docs/design/coding-rules.md` + aktifkan `/ponytail` sebelum menulis kode.
- Explore: graphify → gitnexus → grep (last resort). `gitnexus_impact` sebelum edit simbol.
- Tipe generated (`src/types/**`) **tidak diedit manual** — regenerate via script.
- `bun run build` zero-error, `bunx biome check` bersih, `bun run test` hijau.
- Update graph (gitnexus analyze) sebelum commit; commit & push sesuai protokol.

## Urutan Kerja

### Step 1 — `docs/api/cuti/api.json`

- [x] Tambah schema `ListResultCutiJenisMiniResponse` — salin `ListResultCutiJenisResponse`,
      ganti `data.items.$ref` → `#/components/schemas/CutiJenisMiniResponse`.
- [x] Re-point response 200 `GET /cuti/jenis/list`: `$ref` → `ListResultCutiJenisMiniResponse`.
- [x] `CutiJenisMiniResponse` schema sudah punya `parentId` (working tree) — verifikasi.

### Step 2 — Regenerate tipe

- [x] `node docs/api/extract-types.js` → `src/types/cuti/jenis.ts` (type `ListResultCutiJenisMiniResponse`
      = `Envelope<CutiJenisMiniResponse[]>`) + `src/types/_shared.ts` (`parentId` di `CutiJenisMiniResponse`).
      Jangan edit manual — hasil regenerate menggantikan edit manual yang ada.

### Step 3 — `pengajuan-form-sheet.tsx` (rule combo CU-16)

File: `src/app/(app)/cuti/pengajuan/pengajuan-form-sheet.tsx`

- [x] Import & cast → `ListResultCutiJenisMiniResponse`.
- [x] Satu fetch flat list (hapus `subJenisQuery` `?parentId=`):
      - Combo **Jenis Cuti** = `data.filter((i) => i.parentId == null)` → `{value, label}`.
      - Combo **Sub-Jenis** = derive client-side `data.filter((i) => i.parentId === jenisCutiId)`.
      - CU-8 tetap: `subJenisOptions.length > 0` → tampilkan field; loading cukup `jenisQuery.isPending`.
- [x] Update komentar "tanpa parentId" yang sudah usang.

### Step 4 — Test

File: `src/app/(app)/cuti/pengajuan/pengajuan-form-sheet.test.tsx`

- [x] Mock flat list ber-`parentId`: root `{id:1, parentId:null}`, `{id:2, parentId:null}` +
      sub-jenis `{id:11, parentId:2}` (dll).
- [x] Hapus branch mock `/cuti/jenis/list?parentId`.
- [x] Assert sub-jenis ("Ibadah Haji") **tidak** muncul sebagai option combo jenis.
- [x] Assert alur berantai tetap: pilih "Cuti Ibadah" → sub-jenis muncul → POST body benar.

### Step 5 — Quality gates & ship

- [x] `bun run build` (zero error), `bunx biome check`, `bun run test`.
- [x] `npx gitnexus analyze` + `detect-changes` — scope hanya cuti/pengajuan + docs cuti.
- [x] Commit `<type>: cuti: ...` → `git pull --rebase` → `bd dolt push` → `git push` → verify.
