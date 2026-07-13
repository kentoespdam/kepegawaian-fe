# 3. Generic EntityConfig untuk master module yang fully typed

Date: 2026-07-13
Status: Accepted

## Konteks

Modul Master punya 17 entitas CRUD + 5 reference list, masing-masing dengan konfigurasi
endpoint, kolom tabel, dan form. Sebelumnya, konfigurasi per-entitas ditulis dalam bentuk
`Record<string, unknown>` karena tipe per-entitas belum tersedia — mengorbankan type safety
demi fleksibilitas.

Sekarang tipe per-entitas sudah di-generate dari OpenAPI spec (lihat `docs/api/master/types/`
dan `src/types/master/`), sehingga `Record<string, unknown>` bisa dieliminasi.

Dua pendekatan konfigurasi dipertimbangkan:

1. **EntityConfig generik (`EntityConfig<TQuery, TReq>`)** — satu interface generik yang
   menerima tipe query dan request per-entitas. Setiap entitas membuat object config yang
   me-wire tipe masing-masing. Sebuah factory (`makeConfig`) mengurangi boilerplate.
2. **Config per-entitas terpisah tanpa generik** — tiap entitas punya interface config sendiri,
   tidak ada shared type. Lebih eksplisit, tapi duplikasi definisi di 17 entitas.

## Keputusan

Pakai **`EntityConfig<TQuery, TReq>` generik** dengan `makeConfig` factory function.

- `EntityConfig<TQuery, TReq>` mendefinisikan: endpoint, queryKey, nama entitas (untuk label UI),
  kolom tabel default, dan skema Zod untuk form — semuanya bertipe sesuai parameter generik.
- `makeConfig` menerima partial config dan mengisi default (endpoint pattern, queryKey prefix),
  sehingga tiap entitas hanya perlu menyuplai delta-nya.
- Map entitas di `master-config.ts` di-widen ke `Record<string, EntityConfig<unknown, unknown>>`
  atau bentuk setara — tanpa switch statement untuk lookup.

## Konsekuensi

**Positif.**
- `Record<string, unknown>` dihilangkan — semua akses ke data entitas lewat tipe konkret.
- Satu pola konfigurasi untuk 17 entitas: mudah dibaca, di-audit, dan diubah.
- Factory `makeConfig` menjamin konsistensi tanpa sacrifice type safety — entitas hanya suplai
  delta (kolom unik, form schema).
- Map di-widen menghindari switch 17-case; lookup entitas via indexing string key.

**Negatif / trade-off yang diterima.**
- Map yang di-widen ke `EntityConfig<unknown, unknown>` kehilangan type safety per-entitas
  saat indexing — konfigurasi yang sudah typed akan di-cast ke unknown saat dipanggil lewat
  map. Alternatif (switch 17-case) terlalu verbose untuk manfaat type safety yang marginal
  di titik lookup.
- Factory memperkenalkan satu lapisan abstraksi — diterima karena mengurangi boilerplate
  17× lipat.

**Tinjau ulang jika:** jumlah entitas > 30 (map lookup mulai terasa berat), atau jika TypeScript
mendukung mapped type yang mempertahankan type safety per-key tanpa widening.
