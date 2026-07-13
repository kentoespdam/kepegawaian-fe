# Monitoring — Master Module Fully Typed

Epic: **`kepegawaian-fe-8ir`** — *Master module fully typed (eliminate `Record<string, unknown>`)*
Tujuan: seluruh modul master typed, memakai tipe hasil generate di `docs/api/master/types/` yang disalin ke `src/types/master/`.

> Cara pakai: centang `[x]` saat sebuah issue **selesai** (`bd close <id>`). Kolom "Blok" = harus selesai lebih dulu.
> Sumber kebenaran tetap beads — sinkronkan via `bd ready` / `bd blocked` / `bd show <id>`.

---

## Progres keseluruhan

`3 / 9 selesai`

- [ ] **3 / 9 issue closed** (Gelombang 0 selesai)

---

## Gelombang 0 — Fondasi tipe ✅

- [x] **`cu9`** · 1/9 · P1 · *Copy 22 file tipe + `_shared.ts` → `src/types/master/`; hapus stray `src/types/golongan.ts`; JANGAN sentuh `auth.ts`*
- [x] **`u8a`** · 2/9 · P1 · *Buat hand-written `src/types/master/_computed.ts` — `Computed` (6 field `_*Name`) + `Resolved<T> = T & Partial<Computed>`*
- [x] **`cu1`** · 9/9 · P2 · *Docs-only: ADR 0003 (generic `EntityConfig`) + koreksi `docs/context/master.md`* — boleh paralel, tanpa blocker kode

## Gelombang 1 — Konsumen tipe (butuh `cu9` / `u8a`)

- [ ] **`qyy`** · 4/9 · P2 · Blok: `cu9` · *`useResource<TQuery, TReq = TQuery>` — type payload create/update*
- [ ] **`7pk`** · 8/9 · P2 · Blok: `cu9` · *`useEnum` typed helper untuk 5 entity enum (status-pegawai, status-kerja, jenis-mutasi, jenis-sk, jenis-kontrak); TIDAK ubah call site lintas-modul*
- [ ] **`m11`** · 3/9 · P2 · Blok: `cu9`, `u8a` · *`master-config.ts`: generic `EntityConfig<TQuery,TReq>` + `makeConfig`; map di-widen; tanpa switch*
- [ ] **`l4a`** · 5/9 · P2 · Blok: `cu9`, `u8a` · *`useMasterTable`: type opts, fkLookup, `resolvedItems: Resolved<TQuery>[]`*

## Gelombang 2 — Bergantung pada Gelombang 1

- [ ] **`193`** · 6/9 · P2 · Blok: `cu9`, `m11` · *`crud-form.tsx`: generic `CrudForm<TValues extends FieldValues>`; cast pindah ke call site*
- [ ] **`i9k`** · 7/9 · P2 · Blok: `cu9`, `qyy` · *Refactor sanksi-form & profesi-form ke zod+rhf; `z.coerce.number()` fix bug id string→number*

---

## Graf ketergantungan

```
cu9 ──┬─► qyy ─► i9k
      ├─► 7pk
      ├─► m11 ─► 193
      └─► l4a
u8a ──┴─► m11 (juga), l4a (juga)
cu1  (mandiri, docs-only)
```

## Catatan penting untuk agent pelaksana

- **Baca dulu** `node_modules/next/dist/docs/` sebelum tulis kode — versi Next.js ini punya breaking changes.
- File tipe hasil generate membawa header `JANGAN diedit manual` — perlakukan read-only juga di `src/types/master/`. Bila spec berubah: jalankan ulang generator ke `docs/`, lalu copy — bukan edit tangan.
- `extract-types.js` = external tool, JANGAN diubah.
- Wajib `gitnexus_impact` sebelum edit simbol; `gitnexus_detect_changes` sebelum commit; rename via `gitnexus_rename` (bukan find-and-replace).
- Model baca vs tulis sanksi berbeda: read `SanksiQuery.jenisSp` (nested object) ≠ write `SanksiPostRequest.jenisSpId: number` (flat int64) — dasar fix bug `i9k`.

## Perintah cepat

```bash
bd ready                 # apa yang bisa dikerjakan sekarang
bd blocked               # apa yang masih terhalang + penghalangnya
bd show kepegawaian-fe-cu9
bd update kepegawaian-fe-cu9 --claim
bd close kepegawaian-fe-cu9
```
