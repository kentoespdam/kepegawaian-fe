# Konteks: kepegawaian §Page 4 — Data Penggunaan Hak Cuti (K-C1–K-C7)

> Delta modul. Baca [CONTEXT-MAP.md](../../CONTEXT-MAP.md) (inti bersama) dan
> [kepegawaian-riwayat.md](kepegawaian-riwayat.md) §K1–K12 (shared infra rail/RBAC/URL) dulu.
> **Muat file ini hanya bila menyentuh `data/[pegawaiId]/riwayat/cuti/**` (kategori cuti konsol Riwayat).**
> Papan pantau: [CLAIM-ORDER-riwayat-cuti.md](../CLAIM-ORDER-riwayat-cuti.md).

## Status grill

Grilling 2026-07-31. Keputusan K-C1–K-C7 di bawah **terkunci** — jangan re-litigasi.
Keputusan 12 di `kepegawaian-riwayat.md` (read-only, Fase 2) tetap berlaku sebagai landasan;
file ini adalah delta per-kategori yang memperdalamnya.

## K-C1 — Lokasi & aktivasi rail

Route: `data/[pegawaiId]/riwayat/cuti/` (ADR-0013 route-per-kategori).
Rail item "Data Penggunaan Hak Cuti" di `riwayat/layout.tsx` sudah ada sejak Fase 1 (badge
"Segera", `href: "#"`) — tinggal diaktifkan: `href: "./cuti"`, `active: true`, hapus `soon: true`,
tambah entry `cuti` ke `PAGE_TITLES` (judul header: **"Riwayat Cuti"** — bahasa pengguna, bukan
label legacy rail).

## K-C2 — Read-only total (K12 dipertahankan)

Tidak ada tombol `+`, tidak ada kolom Aksi, tidak ada klik-baris → edit/hapus, tidak ada form.
Alasan (dari K12): state machine `approvalCutiStatus` milik modul cuti, request tulis bawa
`csrfToken` tanpa mekanisme mint di FE, dan klaim cuti punya bentuk request sendiri. Halaman ini
murni baca; menulis dari konsol riwayat = menyelundupkan alur approval ke tempat yang bukan
rumahnya.

## K-C3 — Filter: tahun saja (bulan di-drop)

Permintaan awal user: "filter bulan & tahun". Setelah grill, **bulan di-drop**: endpoint
`GET /cuti/pengajuan/{pegawaiId}/pegawai` **tidak punya param `bulan`** (hanya `tahun`,
`approvalCutiStatus`, `jenisPengajuanCuti`). Keputusan user: cukup tahun, tanpa perubahan backend.

- **Default**: tahun berjalan (2026).
- **Rentang**: 5 tahun (tahun berjalan − 4 .. tahun berjalan) via dropdown/select.
- `tahun` hidup di `searchParams` (`?tahun=2026&page=…&size=…`) — aturan URL = sumber kebenaran.
- Bila bulan dibutuhkan nanti: data tahunan per pegawai sedikit (<20 baris), tinggal filter
  client-side di atas satu fetch tahun — biaya balik ≈ nol.

## K-C4 — Tabel penggunaan (semua status + kolom badge)

Sumber: `GET /cuti/pengajuan/{pegawaiId}/pegawai` (`operationId: index_3`) + `?tahun=` + paging.
Bentuk: `PageResultPageCutiPengajuanResponse` → `PageCutiPengajuanResponse` (konten
`CutiPengajuanResponse` / `CutiPengajuanMiniResponse`).

Kolom (keputusan user — **semua status** ditampilkan, bukan hanya APPROVED/CONFIRMED):

| Kolom | Sumber |
|---|---|
| No | `cell(item, i)` pattern (offset paging) |
| Periode | `formatDate(tanggalMulai) – formatDate(tanggalSelesai)` satu sel |
| Jenis Cuti | `jenisCuti?.nama` + `subJenisCuti?.nama` (sub jenis di bawah, label kecil) |
| Jumlah Hari Kerja | `jumlahHariKerja` (tabular-nums) |
| Status | `approvalCutiStatus` → **badge berlabel** (ikon/warna + teks, a11y) |

Sort default: `tanggalMulai desc` (terbaru di atas). Status badge memakai label enum — reuse
`src/lib/enum-labels.ts`; bila `StatusApproval` belum ada di sana, tambahkan di file itu (bukan
hardcode di page). **Tidak ada** `onRowClick`, tidak ada `?sel=`, tidak ada kolom Lampiran
(lampiran bukan bagian kategori cuti).

## K-C5 — Strip informasi: 3 kartu dari `GET /cuti/kuota` index

Sumber: `GET /cuti/kuota?pegawaiId={id}&tahun={tahun}` (`operationId: index_1`) →
`SingleResultCutiKuotaPegawaiResponse` → `CutiKuotaPegawaiResponse { page, additional }`.

Kartu (keputusan user — **3 angka**):

| Kartu | Nilai |
|---|---|
| Kuota Cuti | `kuota + kuotaTambahan` (gabung — keputusan user) |
| Diambil | `kuotaTerpakai` |
| Sisa | `sisaKuota` |

> ⚠️ **Verifikasi wajib (spike kecil, bukan asumsi):** bentuk respons `CutiKuotaPegawaiResponse`
> punya `page` (paged) + `additional` (array). Buka 1 request nyata untuk memastikan baris kuota
> tahun terpilih ada di `page.content[0]` atau `additional[0]` (atau keduanya). Ambil baris
> `tahun === tahun terpilih` dari container mana pun yang terisi.

- Tak ada record kuota untuk tahun itu → kartu tampil `—`/0 + keterangan "Belum ada kuota tahun ini".
- Skeleton saat `isPending`; strip ikut `tahun` terpilih (refetch saat ganti tahun).

## K-C6 — RBAC (mengikuti K10, tidak diubah)

Gate halaman: `can(roles, "view", "pegawai")` → `forbidden()`. Tanpa tombol tulis → tidak ada
`<Can action="create|update|delete">` sama sekali. Prasyarat yang sama dengan kategori lain:
`hr: { "*": ALL }` di `src/lib/auth/permissions.ts` (bila belum ada).

## K-C7 — State & empty

- `isPending` → skeleton rows · `isPlaceholderData` → dim + spinner toolbar · `isError` → panel
  inline "Coba lagi" (bukan toast).
- Tabel kosong → empty state standar (per CONTEXT-MAP table-states).
- Strip kuota gagal/404 → inline `—`, **bukan** toast, bukan error yang memblokir tabel.

---

## Sumber & tipe

| Endpoint | Tipe (generated) |
|---|---|
| `GET /cuti/pengajuan/{pegawaiId}/pegawai?tahun&page&size&sortBy&sortDirection` | `src/types/cuti/pengajuan.ts` — `PageResultPageCutiPengajuanResponse`, `CutiPengajuanResponse` |
| `GET /cuti/kuota?pegawaiId&tahun` | `src/types/cuti/kuota.ts` — `CutiKuotaPegawaiResponse`, `CutiKuotaResponse` |
| Header pegawai | `GET /pegawai/{id}/session` (sudah di-fetch di `riwayat/layout.tsx`, gratis) |

**Template kode:** `riwayat/sk/page.tsx` (tabel read-only terdekat, tanpa LampiranCard) dan
`riwayat/layout.tsx` (aktivasi rail). **Tidak** memakai `src/lib/api/client.ts` (BASE master) —
pakai `fetch("/api/proxy/cuti/…")` langsung, pola yang sudah ada di page-page riwayat.
