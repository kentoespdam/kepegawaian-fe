# 7. Ukuran file = trigger tinjauan per-kategori, bukan hard gate

Date: 2026-07-24
Status: Accepted

## Konteks

`coding-rules.md` §1 semula memerintahkan **"Max ~120 baris per file, bila lewat WAJIB pecah"**
secara seragam untuk semua file `.ts`/`.tsx`. Audit berbukti (175 file `src/`, exclude
`components/ui/` generated) membongkar tiga masalah:

1. **Angka buta terhadap isi.** `tambah-form.tsx` = 335 baris, tapi 27 di antaranya adalah
   `<Field>` form yang kohesif; logika & tipe **sudah** diangkat ke `hooks.ts`/`schema.ts`/
   `field-renderers.tsx`. Hanya 19 baris logic, 39 baris JSX. Memecahnya lagi hanya melahirkan
   `part1`/`part2` yang selalu diedit bareng. LOC tak bisa membedakan "27 field kohesif" dari
   "3 tanggung jawab tercampur".

2. **Aturan melawan arsitekturnya sendiri.** §18 memerintahkan konsolidasi DRY ke shared
   primitive (`<DataTable>` 313, `<CrudForm>` 127). Konsolidasi **sengaja** menghasilkan file
   besar — itu fitur, bukan bug. Lalu §1 memerintahkan memecahnya kembali. Kontradiksi langsung.

3. **Pelanggar teratas adalah type-files.** `riwayat.ts` (446), `_shared.ts` (428),
   `pegawai.ts` (366) — DTO cerminan backend, nol logika. Memecahnya hanya memperdalam import
   graph tanpa gain keterbacaan.

Statistik hand-written (exclude generated): median **42**, p90 **147**, p95 **177**, max **446**;
**16% file > 120 baris**.

Sudut **biaya konteks AI agent** (motivasi utama revisi ini): over-split menaikkan jumlah
tool-call `Read`, memperdalam import graph yang harus ditelusuri, dan memfragmentasi konteks —
menaikkan konsumsi token & error-rate agen. Aturan "120" seragam mengoptimalkan mata manusia
sambil membebani agen.

## Keputusan

Ukuran file adalah **trigger tinjauan**, bukan gate wajib-pecah. Ambang per-kategori:

| Kategori | Ambang | Alasan |
|---|---|---|
| `components/ui/*` (generated) | **exempt total** | §3 melarang edit manual |
| `src/types/*` (DTO) | **exempt** (soft ~400) | deklaratif, nol logika |
| `src/config/*` (config) | **exempt** (soft ~200) | deklaratif |
| shared primitive | **~250** | konsolidasi DRY sengaja besar (§18) |
| komponen | **~180** (≈p95) | di atas ini biasanya >1 tanggung jawab |
| hook / lib (logika) | **~120** | di sini baris = kompleksitas nyata |

**Kriteria pecah = SRP, bukan angka:** pecah HANYA bila file punya >1 alasan untuk berubah
(mis. fetch vs render vs tipe). Bila lewat ambang **tapi kohesif satu tanggung jawab** → biarkan.

**Anti-fragmentasi (mengikat):** DILARANG memecah file hanya untuk mengejar angka. Memotong satu
unit kohesif jadi 2+ file yang selalu diedit bareng menaikkan biaya konteks agen tanpa gain baca.

Enforcement = **manual + review checklist** (Biome 2.2 tak punya rule `max-lines` native; hard
gate CI akan menghasilkan noise exception untuk kerja sah seperti form 27 field).

## Konsekuensi

**Positif.** Aturan berhenti melawan §18. Type/config tak lagi dihukum sia-sia. Agen tak lagi
didorong fragmentasi yang boros token. Limit ketat difokuskan ke tempat baris benar-benar =
kompleksitas (hook/lib).

**Negatif / risiko.** "Kohesif satu tanggung jawab" bersifat judgment — bisa disalahgunakan untuk
membiarkan file gemuk yang sebenarnya campur. Mitigasi: ambang tetap jadi lampu kuning yang
memaksa tinjauan sadar. Tanpa enforcement otomatis, tetap ada risiko drift — diterima sebagai
trade-off vs noise CI.

**Kenapa ADR:** revisi ini **melonggarkan** limit dan meng-exempt type-files — berlawanan dengan
intuisi umum "file kecil selalu lebih baik". Tanpa konteks ini, agen/kontributor masa depan
kemungkinan besar akan "memperbaiki" `tambah-form.tsx` 335 baris kembali ke limit ketat dan
memecah primitive — churn yang justru merugikan.
