# 8. Cakupan `fields[]` vs `PostRequest` dijaga compiler, bukan aturan manual

Date: 2026-07-24
Status: Accepted

## Konteks

`coding-rules.md` §8 memerintahkan **"`fields[]` WAJIB mencerminkan `{Entity}PostRequest`"** — tiap
property request harus punya input (via `fields[]` atau `fkSources[]` untuk `*Id`), atau data
diam-diam hilang saat submit. Aturan ini **lahir dari bug nyata** (`jenis-sp`, kepegawaian-fe-2zb:
`kode` ada di `searchFields` tapi bukan `fields[]` → form hanya kirim `nama`).

Meski aturan ditulis tegas, ia **tetap bisa kebobol** karena murni disiplin manual. Audit issue
kepegawaian-fe-n0k mencoba memverifikasi tiap config secara manual — dan design-note-nya sendiri
mengakui *"banyak false-positive dari FK... WAJIB verifikasi manual"*. Saat sesi riset ini, audit
grep-statis dicoba ulang dengan 3 iterasi dan **tetap gagal andal**: `fields` adalah **argumen
posisional ke-2** `makeConfig(schema, fields, columns, ...)` (`_config-kit.ts:61`), bukan key
`fields:`, sehingga string-matching mustahil membedakannya dari `columns`/`searchFields`.

**Akar masalah = tipe, bukan disiplin.** `makeConfig<TQuery, _TReq = TQuery>` sudah punya parameter
tipe untuk request (`_TReq`) — tapi **mati**: diawali `_`, default ke `TQuery`, dan `fields`
(baris 63: `fields: FormField[]`) tak pernah dibatasi olehnya. Kedua sisi invariant sudah ada
sebagai kode: `{Entity}PostRequest` **di-generate dari OpenAPI** (`docs/api/extract-types.js`) dan
`fields[]` hand-written. Yang hilang hanya ikatan tipe di antara keduanya.

## Keputusan

Hidupkan `_TReq` jadi invariant yang di-*compile-check*:

- `makeConfig<TQuery, TReq>` → `TReq` **wajib** (hapus default `= TQuery`; rename `_TReq` → `TReq`).
- Coverage-set = `{fields[].name} ∪ {fkSources[].field}`.
- Constraint tipe: coverage-set harus **superset dari keys REQUIRED `TReq`**. Kurang satu required
  → **`tsc` error**.
- Property **optional** `TReq` (mis. `potTkk?`, `notes?`) → boleh tak punya input (sah: backend
  pakai default). Ini menjaga invariant tetap tajam, nol noise.
- Tiap config memanggil `makeConfig<XxxQuery, XxxPostRequest>(...)`.

Enforcement pindah **100% ke compiler**. §8 tak lagi butuh audit manual/grep berkala.

## Konsekuensi

**Positif.** Kelas bug "data diam hilang saat submit" ditutup permanen — mustahil menambah config
baru yang kehilangan field required tanpa build gagal. Audit manual berkala (n0k dan penerusnya)
tak diperlukan lagi. Parameter tipe yang tadinya mati jadi load-bearing.

**Negatif / risiko.** Refactor tipe `_config-kit.ts` + update 16 `makeConfig()` call-site sekali
(supply `TReq`). Mapping `*Id` field → property PostRequest (mis. `fkSources[].field = "jenisSpId"`
memenuhi `TReq.jenisSpId`) butuh tipe util yang benar; salah tipe = false error. Field opsional
tetap tak dijaga — diterima sebagai batas sadar (bukan bug-class).

**Kenapa ADR:** ini membalik cara §8 ditegakkan (manual → compiler) dan menghidupkan parameter tipe
yang tampak sengaja dimatikan (`_TReq`). Tanpa konteks ini, kontributor masa depan mungkin
mengembalikan default `= TQuery` "agar tak perlu supply TReq" — membuka kembali kelas bug. Relasi:
supersede pendekatan audit-manual di kepegawaian-fe-n0k; menindaklanjuti kepegawaian-fe-2zb.
