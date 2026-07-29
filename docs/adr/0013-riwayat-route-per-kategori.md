# 13. Page Riwayat per-pegawai: route per kategori + rail page-local

Date: 2026-07-29
Status: Accepted

## Konteks

HR butuh konsol riwayat **satu pegawai** dari `/kepegawaian/data` — mirror sistem legacy
*"Data Mutasi Pegawai [730700326] (YULIAWATY, S.Sos.)"*: header identitas, rail kiri **Kategori**
berisi 5 item (Data Mutasi · Data Penggunaan Hak Cuti · Riwayat Kontrak Kerja · Riwayat Surat
Keputusan · Riwayat Surat Peringatan), tabel kategori aktif, dan card **Lampiran** di bawahnya.

Repo ini **sudah punya preseden untuk kasus "banyak view dalam satu halaman"**, dan semuanya pakai
tab dalam satu route:

- `/kepegawaian/data` — 3 tab (Pegawai · Non-pegawai · Semua)
- `/kepegawaian/terminasi` — 2 tab

Navigasi rail satu-satunya di aplikasi ada di `app-shell` (sidebar global, ADR-0005). Belum pernah
ada rail **page-local**. Jadi memilih route-per-kategori + rail page-local = menyimpang dari dua
pola mapan sekaligus.

Tiap kategori punya bentuk data yang **tidak sebangun**: `RiwayatMutasiQuery` (21 field, sel
komposit, pasangan Lama/Baru), `RiwayatKontrakQuery` (9 field datar), `RiwayatSpQuery` (sanksi +
penanda tangan + file), `RiwayatSkQuery`, dan cuti (`CutiPengajuanMiniResponse`, endpoint modul
lain). Kolom, filter, form, dan endpoint berbeda seluruhnya — yang sama hanya header dan rail.

## Keputusan

**Satu route per kategori di bawah layout bersama**, bukan tab:

```
app/(app)/kepegawaian/data/[pegawaiId]/riwayat/
├── layout.tsx        # header identitas + rail Kategori (page-local)
├── page.tsx          # redirect → ./mutasi
└── mutasi/page.tsx   # Fase 1
    (kontrak/ · sk/ · sp/ · cuti/ menyusul di Fase 2)
```

Rail = **page-local di `layout.tsx`**, bukan tambahan pada sidebar `app-shell`.

**Alasan user (dikutip):** *"setiap kategory mempunyai routenya sendiri agar tidak bercampur yang
akhirnya rumit."*

**4 keputusan turunan yang ikut terkunci:**

1. **Kunci identitas = `pegawaiId` int64**, nol konversi. Segmen dinamis `[pegawaiId]`. Segmen
   statis `tambah` yang sudah ada **tidak** konflik — Next.js: statis menang atas dinamis.
2. **Header dari `GET /pegawai/{id}/session`** (`PegawaiResponseSession`, 6 field). **Bukan**
   `getPegawaiSession()` — itu di-key ke peninjau yang login, akan menampilkan orang yang salah.
   **Bukan** reuse cache `ringkasan` — 35 field untuk memakai 2.
3. **Rail merender 5 item sejak Fase 1**, 4 di antaranya non-aktif. Bentuk navigasi final terlihat
   utuh sejak rilis pertama; Fase 2 hanya mengisi route.
4. **Fase 1 = kategori Mutasi saja, tapi tuntas** (tabel + filter + CRUD + lampiran). Kontrak/SK/SP
   menyusul; cuti read-only.

**Alternatif yang ditolak:**

- *Tab dalam satu route* (pola `/kepegawaian/data` & `/terminasi`). Ditolak user. Lima tabel dengan
  kolom/filter/form/endpoint berbeda dalam satu berkas → state tercampur, dan aturan ≤ ~120 baris
  per file (`docs/design/coding-rules.md`) praktis mustahil dipenuhi. Deep-link ke satu kategori
  juga hilang.
- *Rail diangkat ke sidebar `app-shell`.* Ditolak — sidebar itu navigasi global lintas-modul; rail
  ini ter-scope ke **satu** `pegawaiId` dan tak punya makna di luar konteks tersebut.
- *Query param `?kategori=mutasi` pada satu page.* Ditolak — deep-link dapat, tapi pemisahan berkas
  tidak; masalah "bercampur" tetap ada.
- *Route sejajar `/kepegawaian/riwayat/[pegawaiId]/...` (di luar `data/`).* Ditolak — memutus
  hubungan induk-anak dengan Data Pegawai, padahal satu-satunya entry point ada di sana.

## Konsekuensi

**Positif.**
- Tiap kategori = satu berkas kecil, sesuai batas ~120 baris; tak ada state lintas-kategori.
- Deep-link & tombol back browser bekerja per kategori.
- Fase 2 = **menambah folder**, nol perubahan pada kategori yang sudah jalan.
- Header di-fetch sekali di `layout.tsx`, dipakai ulang seluruh kategori.

**Negatif / trade-off yang diterima.**
- **Pola navigasi ketiga di aplikasi** (sidebar global · tab · rail page-local). Pembaca masa depan
  wajib diarahkan ke ADR ini — karena itu ADR ini ada.
- **Rail harus dibuat dari nol**; tak ada primitive yang bisa dipanen. Mitigasi: dibatasi ke
  `layout.tsx`, tidak diangkat jadi komponen bersama sampai ada konsumen kedua (YAGNI).
- **Satu request tambahan** untuk header (`/pegawai/{id}/session`). Mitigasi: payload 6 field,
  `staleTime: 5 * 60_000`.
- **4 item rail non-aktif** terlihat sejak Fase 1 — janji fitur yang belum ada. Diterima sengaja:
  bentuk navigasi legacy dipertahankan, dan user memang minta bertahap.

**Tinjau ulang jika:** muncul konsumen kedua rail page-local (angkat jadi komponen bersama), atau
kategori menyusut jadi ≤ 2 (tab jadi lebih murah).

## File terkait

- `docs/context/kepegawaian.md` — §Page 4, Keputusan 1–12 (sumber kebenaran desain lengkap)
- `docs/CLAIM-ORDER-riwayat-pegawai.md` — urutan claim + Definition of Done
- `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/{layout,page}.tsx` — baru
- `src/app/(app)/kepegawaian/data/ringkasan-panel.tsx` — tombol entry (ada di **2** salinan action row)
- `src/components/data-table.tsx` — widening additive `Column<T>.cell` (CRITICAL, pola ADR-0012)
- `src/types/pegawai/pegawai.ts:293` — `PegawaiResponseSession`
- `src/types/kepegawaian/riwayat.ts:214` — `RiwayatMutasiQuery`

Delegasi implementasi: beads epic `kepegawaian-fe-7eo5` + anak `.1`–`.6`. Manager tak ngoding `src/`.
