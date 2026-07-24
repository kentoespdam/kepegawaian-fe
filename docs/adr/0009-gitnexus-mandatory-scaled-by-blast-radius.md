# 9. Ritual gitnexus/graphify diskalakan oleh blast-radius, bukan wajib tiap edit

Date: 2026-07-24
Status: Accepted

## Konteks

`coding-rules.md` §0 & §11 memerintahkan urutan **WAJIB** sebelum **setiap** sentuhan kode:
`gitnexus` (query/context/impact) → `graphify` → `context7` → plan → koding, dengan
**"DILARANG grep buta / baca file acak sebagai cara pertama"** dan **"sebelum mengedit
fungsi/class/method: impact analysis"**. Ritual berlaku seragam — one-liner, typo, dan edit
`proxy.ts` diperlakukan sama.

Dua masalah keras terbukti:

1. **Jalur wajib bisa basi diam-diam.** Saat audit ini: index gitnexus di commit `7aba539`
   (2833 simbol), git HEAD di `0c2f090` — **3 commit di depan**. Commit terbaru justru
   `refactor(tambah-form): pecah file` — file inti yang baru dipecah **tidak** tercermin di index.
   Agen yang patuh "gitnexus dulu" mendapat caller/callee **usang** pada file yang paling baru
   berubah. Escape hatch rule sendiri ("index basi? `analyze` dulu") berarti ritup wajib membengkak
   jadi *re-index 317 file → query → context → impact → context7 → plan → koding* **sebelum tiap
   edit**.

2. **Rule memajaki sumber daya yang ADR-0007 baru lindungi.** ADR-0007 menjadikan "biaya konteks
   AI agent" nilai desain mengikat (anti-fragmentasi: jangan boroskan token/Read agen). Ritual
   gitnexus seragam adalah pajak token + wall-clock persis atas sumber daya itu. Untuk edit
   1-baris, ceremony sering lebih mahal dari sekadar membaca file. Rule bertentangan dengan
   prinsip yang baru dinyatakan sibling-nya.

3. **Ambang lama tak terukur.** "Pahami dulu, jangan grep buta" = judgment, tak checkable — dosa
   yang sama dengan §1 lama (ADR-0007). Agen tak bisa menentukan objektif kapan cukup.

Nilai tool tidak diragukan pada kerja blast-radius tinggi (edit `proxy.ts`, shared primitive,
`can()`): di situ impact analysis mencegah bug lintas-modul. Kelemahannya adalah **WAJIB seragam**,
bukan tool-nya.

## Keputusan

Skalakan ritual berdasarkan **blast-radius**, dengan trigger **objektif & grep-checkable**:

**`gitnexus impact` WAJIB bila target edit memenuhi salah satu:**
- **fan-in ≥ 2** — di-import oleh ≥2 modul (`grep -rl "import.*Nama"`), ATAU
- berada di **permukaan kritis bernama**: `proxy.ts`, DAL/`verifySession`, `can()`/RBAC,
  shared primitive (`<DataTable>`, `<CrudForm>`, `<ConfirmDeleteDialog>`, `<Can>`, `useResource`),
  atau `src/hooks/*`.

**Di bawah ambang** (edit 1-file lokal, config glue per-entitas, typo, rename lokal):
baca file langsung + grep terarah **SAH sebagai langkah pertama**; gitnexus opsional.

- **graphify → on-demand**, keluar dari jalur wajib per-edit. Dipakai hanya saat onboarding
  spec/modul baru atau refactor lintas-domain (mis. memetakan `docs/api/*/api.json`).
- **Larangan "grep buta" dilonggarkan** jadi anjuran: larangan keras hanya berlaku saat memetakan
  flow tak dikenal berskala luas. Untuk edit di bawah ambang, grep terarah + baca file = jalur
  pertama yang sah.
- **Index basi?** Bila edit memicu ambang WAJIB dan index tertinggal dari HEAD → `npx gitnexus
  analyze` dulu. Bila di bawah ambang → tak relevan, lanjut.

## Konsekuensi

**Positif.** Ritual selaras dengan ADR-0007 — token agen tak dibakar untuk edit yang blast-radius-
nya nol. Trigger objektif (fan-in / daftar surface) menggantikan judgment tak terukur. gitnexus
tetap wajib persis di tempat ia berharga (permukaan shared/keamanan). Bahaya index-basi dibatasi
ke kasus yang memang butuh peta.

**Negatif / risiko.** "fan-in ≥2" butuh satu grep untuk dicek — beban kecil, tapi bukan nol. Simbol
yang diam-diam tumbuh jadi shared bisa sempat waktu masih di-treat lokal sampai caller ke-2 muncul
(mitigasi: daftar surface kritis menangkap yang paling berbahaya tanpa bergantung count). Melonggar-
kan larangan grep bisa disalahgunakan agen untuk skip pemahaman pada kerja yang sebetulnya luas
(mitigasi: ambang surface + fan-in justru memaksa gitnexus di kasus itu).

**Kenapa ADR:** ini **melonggarkan** workflow yang ditulis WAJIB tegas dan menghidupkan grep yang
tadinya dilarang — berlawanan dengan intuisi "selalu pahami dvia peta kode dulu". Tanpa konteks
bukti index-basi + tax-token, agen/kontributor masa depan hampir pasti akan mengembalikannya ke
"WAJIB selalu". Relasi: memperluas prinsip biaya-konteks ADR-0007 ke domain workflow.
