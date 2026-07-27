# 11. Dashboard Pegawai: layout 2 panel + accordion (mirror legacy)

Date: 2026-07-27
Status: Accepted

## Konteks

Dashboard Pegawai (W3, `kepegawaian-fe-tvr`) dirilis sebagai **single stacked column** berisi 5
SectionCard: Detail kepegawaian, Riwayat karier (SK+Mutasi+Kontrak+SP dalam satu kartu), Biodata+
Keluarga, dan Riwayat Penggajian. Semua di-fetch **eager** saat mount (4 `useQuery` paralel di
`section-karier.tsx`, masing-masing preview page size 5).

Dua masalah:

1. **Skala tak enak.** Dengan menumpuk vertikal, pegawai harus scroll jauh melewati kartu yang
   mungkin kosong untuk mencapai data yang dicari. Tambah section baru (pendidikan, pelatihan, dll.)
   memperparah.
2. **Deviasi dari referensi.** Dashboard legacy yang jadi acuan pakai layout **2 panel** — kiri
   identitas/detail diri, kanan daftar riwayat dalam accordion — plus beberapa section (Pendidikan,
   Pengalaman Kerja, Keahlian, Pelatihan, Foto Profil) yang belum ada di rilis W3.

Karena §Page 1 di [context/kepegawaian.md](../context/kepegawaian.md) **mengunci** layout single-
column secara eksplisit, mengubahnya adalah revisi keputusan yang sudah tercatat — bukan sekadar
tweak CSS. Perlu direkam agar pembaca berikutnya paham kenapa spec berubah.

## Keputusan

**Re-layout Dashboard ke 2 panel + accordion**, mirror dashboard legacy tapi mengecualikan data
tanpa backend.

- **≥lg (1024px):** dua kolom berdampingan. **<lg:** menumpuk, kiri ("Detail Pegawai") lalu kanan
  ("Riwayat").
- **Panel kiri** — header identitas (foto read-only `GET /profil/biodata/{id}/foto-profil` + nama +
  NIPAM + jabatan) selalu tampil, di bawahnya accordion: Data Pribadi (`/profil/biodata/{nik}`) +
  Data Kepegawaian (`/pegawai/{$id}`).
- **Panel kanan** — accordion **multi-open, lazy-fetch** (data section di-fetch hanya saat item
  dibuka; section pertama terbuka default). Urutan mirror gambar: Keluarga → Pendidikan →
  Pengalaman Kerja → Keahlian → Pelatihan → Mutasi → SK → Kontrak → Penggajian, lalu **SP terpisah
  di akhir**.
- **Komponen accordion:** Base UI Accordion baru di `src/components/ui/accordion.tsx` (ikut
  [ADR-0004](0004-base-ui-shadcn-default.md)).
- **Section list** pakai `<DataTable>` + `<DataTablePagination>` reusable, default page size 5.

**Alternatif yang ditolak:**

- *Pertahankan single column, hanya tambah section.* Ditolak — memperburuk masalah scroll #1; tak
  match referensi.
- *Tab, bukan accordion.* Ditolak — user minta mirror gambar (accordion); accordion multi-open
  memungkinkan bandingkan beberapa riwayat sekaligus, tab tidak.
- *Eager-fetch semua section (pola W3).* Ditolak — dengan 10 section, eager mount = 10 request
  saat load walau mayoritas tak dilihat. Lazy-fetch on-expand memangkas beban awal.

**Ruang lingkup yang di-skip (backend belum ada):**

- **Data Rekening Bank** — tidak ada endpoint/type. Ditunda.
- **Foto upload** — iterasi ini foto **read-only** saja; alur unggah menyusul.

## Konsekuensi

**Positif.**
- Match ekspektasi user (dashboard legacy) + skala lebih baik untuk 10+ section.
- Lazy-fetch: load awal hanya fetch panel kiri + 1 section kanan, bukan semua.
- SP tetap section terpisah — konsisten dengan keputusan round 1 (hak pegawai untuk tahu; tak
  disembunyikan, tak digabung ke riwayat kerja).
- DataTable reusable → konsisten dengan halaman daftar lain, tak reinvent tabel manual
  (`section-karier.tsx` lama pakai `<table>` tulisan tangan).

**Negatif / trade-off yang diterima.**
- **Foto & Rekening Bank tampak "hilang" vs referensi** sampai backend siap. Diterima — lebih baik
  skip daripada bikin fitur setengah jalan yang gagal saat dipakai.
- **Lazy-fetch menambah kompleksitas state** (accordion open-state ↔ query enabled). Diterima —
  ditangani `useQuery({ enabled: isOpen })`, pola standar TanStack.
- Read-only tetap; tak ada edit self-service (kontrak §Page 1 tak berubah di sisi itu).

**Tinjau ulang jika:** backend Rekening Bank / foto-upload tersedia (tambah section/alur unggah),
atau jumlah section tumbuh sampai accordion kanan sendiri perlu dikelompokkan/di-search.

## Addendum (2026-07-27) — optimasi kerapian: golden ratio + planogram

Implementasi awal 2-panel terlihat tidak rapi saat dirender. Riset dua prinsip desain
(**golden ratio φ≈1.618** & **planogram**) memetakan 8 temuan; keputusan yang mengubah spec:

- **Rasio kolom 38/62 (`lg:grid-cols-[38fr_62fr]`)**, bukan 45/55 arbitrer yang terlanjur ter-*ship*.
  Panel kanan tabel butuh ruang horizontal; asimetri φ menaruh bobot di kanan. *Mudah dibalik (nilai
  CSS) → tak perlu ADR terpisah, cukup addendum ini.*
- **Panel kiri: `multiple` + default hanya "Data Pribadi" terbuka.** Tanpa `multiple` & tanpa
  default-open, Base UI memakai single-collapse → kolom kiri "kempis" (cuma header) saat load,
  timpang terhadap panel kanan yang sudah buka satu section. Disamakan polanya.
- **Identitas ditampilkan 1×.** Subtitle `{nama} — {nipam}` di header atas dibuang; identitas
  lengkap hanya di header panel kiri (eye-level, satu titik fokus).
- **Bug pagination diperbaiki:** `<option value={5}>` hilang dari `data-table-pagination.tsx` →
  dropdown me-render "10" walau `size` state = 5 (tak ada opsi cocok). Tambah opsi 5.
- **Fibonacci spacing (8→13→21→34 ≈ deret φ), whitespace-grouping alih-alih border ganda, dan
  alignment field-grid** dirapikan (planogram: proximity > garis, 80/20 anti-overcrowding).

Delegasi implementasi: beads **W6** (epic `kepegawaian-fe-o1o`), Manager tak ngoding `src/`.
Issue: `3ls` (bug pagination 🔴) · `gr7` (rasio 38/62) · `2n2` (panel kiri multiple) ·
`098` (buang subtitle) · `atr` (Fibonacci spacing + grouping + alignment) · `ra3` (uji responsif).

File terkait:
- `docs/context/kepegawaian.md` — §Page 1 direvisi ke layout ini
- `src/components/ui/accordion.tsx` — komponen Base UI Accordion baru (dibuat agen eksekusi)
- `src/app/(app)/kepegawaian/dashboard/dashboard-client.tsx` — re-layout 2 panel
- `src/app/(app)/kepegawaian/dashboard/section-*.tsx` — dipecah/ditambah per section, lazy-fetch

## Addendum (2026-07-27) — round 4: coloring semantik + spacing panel kanan + afordansi trigger

Setelah W6, tiga keluhan sisa dari user: (1) dashboard **100% grayscale** padahal
`globals.css` sudah punya token OKLCH semantik lengkap (primary Evergreen, success teal,
warning, destructive) — "apakah tak ada yang bisa dioptimasi, seperti coloring?"; (2) data
panel kanan **mepet** ke container card & body accordion **terkesan terpotong**; (3) trigger
accordion **tak terlihat bisa diklik** (afordansi lemah — satu-satunya cue = `hover:underline`
di atas `border-transparent` + chevron `text-muted-foreground`, tanpa padding horizontal).

Keputusan (semua mengubah tampilan, sebagian menyentuh komponen shared → blast diukur dulu):

- **Padding panel kanan disamakan panel kiri.** Root cause "mepet": `<Accordion>` panel kanan
  (`section-right-panel.tsx`) tak punya `px-5 py-1` yang sudah dipunya panel kiri sejak W6 `atr`
  (asimetri tertinggal). Mirror kelas yang sama → hilangkan mepet + beri tabel ruang napas
  (meredakan "terpotong"). *Blast rendah, file dashboard lokal.*
- **Card-in-card diratakan via prop opt-in `bare` di `DataTable`.** "Terpotong" = `DataTable`
  menggambar card sendiri (`rounded-lg border bg-card shadow-md … max-h-[75vh] p-1`) **di dalam**
  `AccordionContent` yang sudah `overflow-hidden` + tinggi ter-animasi → border ganda flush terbaca
  "terpotong". Fix = tambah prop `bare?: boolean` (default `false`) yang, saat `true`, me-render
  tabel **tanpa** border/shadow/card sendiri. **`DataTable` = simbol CRITICAL (23 konsumen:
  seluruh page master + kepegawaian).** Prop additive + default `false` → 22 caller lain tak
  berubah; hanya panel kanan dashboard kirim `bare`. *Syarat mengikat agen: JANGAN ubah cabang
  render lama; default WAJIB preservasi perilaku sekarang.*
- **Afordansi trigger accordion diperkuat — TANPA mengedit file generate.** `accordion.tsx` ada di
  `src/components/ui/*` = zona regenerable shadcn; mengeditnya berisiko **tertimpa** saat
  `npx shadcn add`/update (aturan baru, lihat [coding-rules §3](../design/coding-rules.md)). Karena
  `AccordionTrigger` sudah merge `cn(<default>, className)`, cue resting (hover background + padding
  horizontal + chevron ter-tint via `**:data-[slot=accordion-trigger-icon]:text-…`) di-**inject lewat
  `className` dari call-site**, bukan diubah di file generate. Semua nilai dipusatkan pada **satu
  konstanta className** di folder dashboard, di-pass ke setiap `<AccordionTrigger className={…}>` di
  `section-left-panel.tsx` & `section-right-panel.tsx`. Efek: scope benar-benar dashboard-only (bukan
  sekadar "LOW blast global"), nol sentuhan `ui/*`.
- **Coloring semantik ~10–20% (planogram 60:30:10, reuse token yang ADA — bukan asal tambah warna):**
  - **Aksen brand di focal point** — avatar header panel kiri `bg-muted` (abu) → `bg-primary/10
    text-primary`. Titik fokus eye-level dapat ~10% aksen brand Evergreen.
  - **Badge status semantik** — "Status Kerja" / "Status Pegawai" jadi badge berwarna via token:
    Aktif → `success`, Berhenti/Keluar → `destructive`/`muted`, Dirumahkan → `warning`. Section
    **SP/Disiplin** diberi tint `warning`/`destructive` (sinyal, bukan dekorasi).
  - **Emphasis Penghasilan Bersih** — kolom hasil akhir slip gaji `font-semibold text-foreground`
    agar menonjol dari kolom antara.
  - Token sumber sudah ada di `globals.css` (`--primary`/`--success`/`--warning`/`--destructive`);
    `DataTable` sudah mewarnai benar (ikon success/destructive, zebra). Rekomendasi hanya
    **mengonsumsi** token, tak menambah warna baru → invariant 60:30:10 & kontras dark-mode terjaga.

Delegasi implementasi: beads **W7** (epic `kepegawaian-fe-o1o`), Manager tak ngoding `src/`.
Blast diukur via `gitnexus_impact`: `DataTable` = CRITICAL (mitigasi: prop additive default-preserve).
Afordansi trigger: **nol perubahan simbol** — hanya className call-site di 2 file dashboard, `ui/*`
tak disentuh (batasan baru: file generate shadcn dilarang diedit, overwrite-risk).

## Addendum (2026-07-27) — bug responsif: tabel lebar jebolkan layout (grid `min-width:auto`)

Setelah render 2-panel, data lebar di panel kanan (mis. nama pelatihan panjang) **mendorong kolom
keluar viewport** → overflow horizontal merusak seluruh halaman.

**Root cause — bukan bug `DataTable`.** `DataTable` sudah punya `overflow-auto`
(`src/components/data-table.tsx:206`); yang salah ada di **grid parent**. Setiap grid item punya
default `min-width: auto` → **menolak menyusut di bawah lebar min-content anaknya**. Track
`lg:grid-cols-[38fr_62fr]` melar melewati jatahnya mengikuti tabel lebar → layout ke-dorong.
`overflow-auto` DataTable tak pernah aktif karena batas lebar **tak pernah turun** dari atas —
tersumbat di grid item paling atas. Rantai: grid item (`min-width:auto` ❌) → card → Accordion →
`AccordionContent`(`overflow-hidden`) → card DataTable (`overflow-auto`, tak pernah nyala).

**Keputusan (dari 3 opsi):** *scroll di dalam tabel* — bukan truncate+tooltip, bukan responsive-
stack. Alasan: paling selaras dengan desain `DataTable` yang **sudah** ber-`overflow-auto`; fix cuma
"membuka keran" yang tersumbat, bukan menambah perilaku baru. Truncate/stack = ubah cell rendering di
komponen 23-konsumen → blast besar untuk bug lokal.

**Fix (root cause, 1 baris, nol perubahan simbol):** tambah `min-w-0` ke kedua grid item di
`dashboard-client.tsx:16` → `className="grid gap-5 lg:grid-cols-[38fr_62fr] lg:items-start [&>*]:min-w-0"`.
`[&>*]:min-w-0` set `min-width:0` pada kedua panel → track `62fr` berhenti melar → batas lebar turun
ke DataTable → `overflow-auto` nyala → scrollbar horizontal muncul **di dalam** kartu tabel, layout
luar utuh. **Tak menyentuh `DataTable`, tak menyentuh `ui/*`.** Issue: `kepegawaian-fe-u8lv` (🔴 P1).
