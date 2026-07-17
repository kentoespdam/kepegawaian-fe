# 4. Base UI sebagai default shadcn (pengganti Radix)

Date: 2026-07-17
Status: Accepted

## Konteks

shadcn/ui v4 menawarkan dua pilihan sebagai primitive UI library saat inisialisasi proyek:
**Radix** (stabil, sudah bertahun-hun) dan **Base UI** (baru, dari maintainer yang sama —
Tim MUI/Material UI). Keduanya menyediakan komponen headless (Dialog, Sheet, DropdownMenu,
Command, dll.) yang dipanggil dari output `npx shadcn add`.

Dua kandidat:

1. **Radix UI** — foundation historis shadcn sejak versi pertama. Dokumentasi & ekosistem sangat
   matang, contoh berlimpah. Tapi: prop naming kadang tidak intuitif, bundle relatif lebih besar,
   dan secara arsitektural lebih tua.
2. **Base UI** — primitif headless baru dari MUI, arsitektur lebih modern & ringan. Dirancang
   sebagai penerus ideologis Radix dengan API yang lebih bersih. shadcn v4 menjadikannya default
   (per 2026-07). Tapi: lebih baru (~1 bulan sebagai default shadcn), sehingga dokumentasi &
   contoh lebih sedikit, dan prop names berbeda dari Radix.

Kriteria: **ringan, modern, dan selaras dengan arah shadcn (official default)**.

## Keputusan

Pakai **Base UI** sebagai primitive headless library. Inisialisasi: `npx shadcn init -b base`.
Semua komponen shadcn ditambahkan via `npx shadcn add` — outputnya otomatis menggunakan Base UI
import.

## Konsekuensi

**Positif.**
- Lebih ringan & modern dari Radix; dikelola oleh tim MUI yang sama.
- Default resmi shadcn per pertengahan 2026 — selaras dengan arah ekosistem.
- API lebih bersih (mis. `keepMounted`, bukan Radix `forceMount`).

**Negatif / trade-off yang diterima.**
- Dokumentasi & community examples lebih sedikit karena Base UI masih baru sebagai default
  shadcn — agent AI harus memverifikasi prop names terhadap **Base UI docs**, bukan Radix.
- Jika Base UI berubah API di masa depan, migrasi mungkin diperlukan; diterima karena
  shadcn mengabstraksi sebagian besar perbedaan.

**Tinjau ulang jika:** Base UI dihentikan/migrasi ke library lain, atau terjadi breaking change
besar yang tidak tertangani shadcn adapter layer.

File terkait:
- `components.json` — konfigurasi shadcn (mencatat `base` sebagai UI library)
- Setiap komponen di `src/components/ui/*.tsx` — Base UI import path
