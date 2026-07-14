# Monitoring — Master Module Fully Typed ✅

Epic: **`kepegawaian-fe-8ir`** — *Master module fully typed (eliminate `Record<string, unknown>`)*
Tujuan: seluruh modul master typed, memakai tipe hasil generate di `docs/api/master/types/` yang disalin ke `src/types/master/`.

> **Status: ✅ SELESAI — Semua gelombang closed + 17 typed pages.**

---

## Progres keseluruhan

`✅ 9 / 9 selesai` + **bonus: 17 typed pages**

---

## Gelombang 0 — Fondasi tipe ✅

- [x] **`cu9`** · 1/9 · P1 · *Copy 22 file tipe + `_shared.ts` → `src/types/master/`; hapus stray `src/types/golongan.ts`*
- [x] **`u8a`** · 2/9 · P1 · *Buat hand-written `src/types/master/_computed.ts` — `Computed` (6 field `_*Name`) + `Resolved<T>`*
- [x] **`cu1`** · 9/9 · P2 · *Docs-only: ADR 0003 + koreksi `docs/context/master.md`*

## Gelombang 1 — Konsumen tipe ✅

- [x] **`qyy`** · 4/9 · P2 · *`useResource<TQuery, TReq = TQuery>`*
- [x] **`7pk`** · 8/9 · P2 · *`useEnum` typed helper untuk 5+1 entity enum* (ditambah `jenis-sp`)
- [x] **`m11`** · 3/9 · P2 · *`EntityConfig<TQuery,TReq>` + `makeConfig`*
- [x] **`l4a`** · 5/9 · P2 · *`useMasterTable`: type opts, fkLookup, `Resolved<TQuery>[]`*

## Gelombang 2 — Halaman typed per-entitas ✅

- [x] **`193`** · 6/9 · P2 · *`crud-form.tsx`: generic `CrudForm<TValues>`*
- [x] **`i9k`** · 7/9 · P2 · *Refactor sanksi-form & profesi-form ke zod+rhf*

## Bonus — 17 typed pages + type-level map (post-epic) ✅

- [x] **`master-entity-types.ts`** — type-level map `MasterEntityTypes` (17 entity → `TItem`/`TPage`/`TReq`/`TList`)
- [x] **`MasterPageClient<TEntity>`** — generic component dengan inference dari type map
- [x] **17 halaman per-entitas** — server component tipis, literal entity name, auth guard
- [x] **Hapus `[entity]/page.tsx`** — dynamic route dihapus
- [x] **Fix field API** — golongan/grade/hari-libur: API response tidak punya `nama`
- [x] **Ekstraksi komponen** — master-switch, sanksi-schema, profesi-schema (kepatuhan ≤120 baris)
- [x] **useEnum + `jenis-sp`** — integrasi ke `sanksi-form.tsx`
- [x] **Biome compliance** — `bunx biome check` zero issues ✅

---

## Graf ketergantungan

```
cu9 ──┬─► qyy ─► i9k
      ├─► 7pk ──► (ditambah jenis-sp) ──► sanksi-form
      ├─► m11 ──► 193 ──► master-entity-types.ts ──► 17 typed pages
      └─► l4a
u8a ──┴─► m11, l4a
cu1  (mandiri)
```

## Catatan penting untuk agent pelaksana

- **Baca dulu** `node_modules/next/dist/docs/` sebelum tulis kode — versi Next.js ini punya breaking changes.
- File tipe hasil generate membawa header `JANGAN diedit manual` — perlakukan read-only.
- Wajib `gitnexus_impact` sebelum edit simbol; `gitnexus_detect_changes` sebelum commit.
- Model baca vs tulis sanksi berbeda: read `SanksiQuery.jenisSp` (nested object) ≠ write `SanksiPostRequest.jenisSpId: number`.
- Dynamic route `[entity]/page.tsx` sudah dihapus — jangan gunakan `useParams()` untuk lookup entity.
- Master page baru = 1 file server component + otomatis terdaftar di `master-entity-types.ts` + `master-config.ts`.

## Perintah cepat

```bash
bd ready                 # apa yang bisa dikerjakan sekarang
bd show kepegawaian-fe-8ir  # detail epic
```
