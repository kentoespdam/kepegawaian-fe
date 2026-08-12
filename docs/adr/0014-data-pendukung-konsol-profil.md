# 14. Konsol Data Pendukung per-pegawai: route per kategori + rail page-local (resource `/profil/*`)

Date: 2026-08-12
Status: Accepted

## Konteks

HR butuh konsol CRUD untuk **data pendukung (profil) satu pegawai** — mirror konsol Riwayat
(Page 4): header identitas, rail kiri **Kategori** berisi 6 item (Data Pendidikan · Pengalaman
Kerja · Keahlian · Pelatihan · Kartu Identitas · Keluarga), tabel kategori aktif, card **Lampiran**
di bawahnya.

Bedanya dengan Page 4, sumber datanya bukan `/kepegawaian/riwayat/*` (di-key `pegawaiId` int64),
melainkan resource **`/profil/*`** yang di-key **`biodataId`** (= NIK pegawai). Keenam kategori
sudah punya endpoint CRUD + sub-endpoint lampiran (`/profil/{entity}/lampiran/*`) dan nilai `ref`
resmi di union `JenisProfilUpdate` (`PROFIL_PENDIDIKAN`, `PROFIL_PENGALAMAN_KERJA`,
`PROFIL_KEAHLIAN`, `PROFIL_PELATIHAN`, `KARTU_IDENTITAS`, `PROFIL_KELUARGA`).

Preseden **ADR-0013** sudah menetapkan pola route-per-kategori + rail page-local untuk Riwayat.
Page 1 (Dashboard) menampilkan 5 dari 6 kategori ini **read-only** dalam accordion kanan — konsol
ini adalah versi kerja HR.

## Keputusan

**Konsol kedua yang bermirror ADR-0013**, bukan perluasan rail Riwayat:

```
app/(app)/kepegawaian/data/[pegawaiId]/pendukung/
├── layout.tsx        # header identitas + rail "Kategori Data Pendukung" (page-local)
├── page.tsx          # redirect → ./pendidikan
└── pendidikan/page.tsx   # Fase 1
    (pengalaman-kerja/ · keahlian/ · pelatihan/ · kartu-identitas/ · keluarga/ menyusul)
```

**8 keputusan turunan yang ikut terkunci:**

1. **Konsol terpisah dari Riwayat.** Data Pendukung = data **keadaan sekarang** (profil);
   Riwayat = **kejadian/perjalanan karier**. Rail Riwayat berjudul "Kategori Riwayat" dan
   halaman-halamannya di-key `pegawaiId`; mencampur 6 item profil di sana membuat label jadi
   janggal dan namespace filter (`biodataId` vs `pegawaiId`) bercampur — justru kerumitan yang
   ADR-0013 hindari.
2. **Segmen URL `pendukung`** (bukan `profil`): `profil` sudah berarti route akun login
   (`/profil`, ganti password) di FE. URL contoh:
   `/kepegawaian/data/123/pendukung/pendidikan?institusi=UGM&page=2`.
3. **Entry point = tombol ke-4 "Data Pendukung"** di action row `RingkasanPanel` (sebaris
   Edit Profil · Edit Gaji · Riwayat). `onRowClick` sudah terpakai untuk memilih baris, dan
   panel Ringkasan sudah memegang `pegawaiId` + `nik`.
4. **CRUD penuh keenam kategori, tanpa alur approval.** Konsol admin: HR menulis langsung.
   Request schema keahlian memang **tidak memuat** field `disetujui` — BE yang mengelola status;
   FE tidak mereplikasi self-service approval (preseden Keputusan 5 riwayat).
5. **Kunci data = `biodataId`** (= NIK), diambil gratis dari `GET /pegawai/{id}/session`
   (payload yang sama dengan header layout) — **nol fetch tambahan**. Catatan inkonsistensi BE:
   `KartuIdentitasPostRequest` menyebut field kuncinya `nik`, kategori lain `biodataId`; nilainya
   sama, tinggal dipetakan per-form.
6. **Klik baris = PILIH** (`?sel=id`) + **kartu Lampiran** untuk **semua 6 kategori**
   (upload/lihat/hapus, tanpa approval) — pola Keputusan 4 & 5 riwayat; komponen `LampiranCard`
   shared sudah parametrizable (`listUrl/uploadUrl/deleteUrl/viewUrl`).
7. **Form = Sheet untuk semua kategori** (pola `docs/design/sheet-form-pattern.md`), label-on-top,
   footer sticky Batal/Simpan. Satu wadah di seluruh konsol = satu mental model untuk pengguna
   lansia.
8. **RBAC: gate pada entity `pegawai`** persis Keputusan 10 riwayat — page
   `can(roles,"view","pegawai")` → `forbidden()`, per-aksi `<Can … entity="pegawai">`.
   `hr: { "*": ALL }` sudah ada di `PERMISSIONS` (bukan prasyarat baru). Tanpa ADR tambahan.

**Alternatif yang ditolak:**

- *Digabung ke rail Riwayat (11 item).* Ditolak — dua domain berbeda (keadaan vs kejadian),
  kunci data berbeda, namespace filter bercampur.
- *Segmen `profil`.* Ditolak — bentrok dengan route `/profil` (akun login).
- *Konsol read-only.* Ditolak — menduplikasi accordion kanan Dashboard (argumen Keputusan 1
  riwayat); HR butuh menulis.
- *Dialog untuk form pendek (Keahlian, Kartu Identitas).* Ditolak — dua pola wadah dalam satu
  konsol; penghematan mikroskopis (Sheet & Dialog berbagi primitive yang sama).
- *Membuat kunci RBAC baru `pendukung`.* Ditolak — utang matriks tanpa manfaat; konsol hanya
  diakses role yang sudah punya `"*": ALL` (`admin`/`hr`).

## Konsekuensi

**Positif.**
- Tiap kategori = satu berkas kecil (batas ~120 baris `docs/design/coding-rules.md`); tak ada
  state lintas-kategori.
- Fase 2 = **menambah folder**, nol perubahan pada kategori yang sudah jalan.
- Satu pola navigasi yang **sudah punya preseden** (ADR-0013) — bukan pola navigasi baru.
- Header di-fetch sekali di `layout.tsx`, dipakai ulang seluruh kategori; `nik` gratis untuk
  `biodataId`.

**Negatif / trade-off yang diterima.**
- **Konsol kedua** dengan rail page-local — pembaca masa depan wajib diarahkan ke ADR ini
  (+ ADR-0013). Mitigasi: rail kedua dibuat dengan copy-paste sadar dari riwayat; belum
  diangkat jadi komponen bersama sampai ada konsumen ketiga (YAGNI).
- **Bentuk URL lampiran `/profil/*` berbeda antar-entity** (`/lampiran/{id}/list` untuk
  pendidikan & pengalaman-kerja vs `/lampiran/{id}` untuk lainnya) dan **berbeda dari
  `/kepegawaian/lampiran/*`** — semantik `{id}` (refId vs lampiranId) **wajib diverifikasi
  dengan request nyata (spike)** sebelum implementasi kartu Lampiran.
- **Kartu identitas vs biodata naming** — field kunci `nik` vs `biodataId` di request schema
  (lihat Keputusan 5).

**Tinjau ulang jika:** muncul konsumen ketiga rail page-local (angkat jadi komponen bersama),
atau kategori menyusut ≤ 2 (tab jadi lebih murah).

## File terkait

- `docs/context/kepegawaian-pendukung.md` — §Page 5, Keputusan P1–P8 (sumber kebenaran desain)
- `docs/CLAIM-ORDER-pendukung.md` — urutan claim + Definition of Done
- `src/app/(app)/kepegawaian/data/[pegawaiId]/pendukung/{layout,page}.tsx` — baru
- `src/app/(app)/kepegawaian/data/ringkasan-panel.tsx` — tombol entry (di **2** salinan action row)
- `src/types/profil/{pendidikan,pengalaman-kerja,keahlian,pelatihan,kartu-identitas,keluarga}.ts` — tipe generated (jangan diedit manual)
- `src/components/lampiran-card.tsx` — reuse (URL parametrizable, sudah terbukti di riwayat)
- `src/lib/auth/permissions.ts` — `hr: { "*": ALL }` sudah ada

Delegasi implementasi: beads epic (buat saat implementasi dimulai) + anak per claim; lihat
`docs/CLAIM-ORDER-pendukung.md`. Manager tak ngoding `src/`.
