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

File terkait:
- `docs/context/kepegawaian.md` — §Page 1 direvisi ke layout ini
- `src/components/ui/accordion.tsx` — komponen Base UI Accordion baru (dibuat agen eksekusi)
- `src/app/(app)/kepegawaian/dashboard/dashboard-client.tsx` — re-layout 2 panel
- `src/app/(app)/kepegawaian/dashboard/section-*.tsx` — dipecah/ditambah per section, lazy-fetch
