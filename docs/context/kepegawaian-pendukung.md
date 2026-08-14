# Konteks: kepegawaian §Page 5 — Data Pendukung (Shared Infra: P1–P8)

> Delta modul. Baca [CONTEXT-MAP.md](../../CONTEXT-MAP.md) (inti bersama) dulu.
> Bagian dari [kepegawaian.md](kepegawaian.md) — baca itu untuk Ringkas + identity bridge.
> **Muat file ini hanya bila menyentuh konsol Data Pendukung**
> (`(app)/kepegawaian/data/[pegawaiId]/pendukung/**`). Untuk detail per-kategori, lihat file di bawah.
> Papan pantau implementasi: [CLAIM-ORDER-pendukung.md](../CLAIM-ORDER-pendukung.md) ·
> ADR: [0014](../adr/0014-data-pendukung-konsol-profil.md).

## Page 5 — Data Pendukung (drill-down per-pegawai, konsol CRUD atas `/profil/*`)

> **Bukan item sidebar.** Drill-down dari Page 2 (Data Pegawai) untuk **satu** pegawai — konsol
> kerja HR, sejajar dengan Page 4 (Riwayat). Berbeda dari panel kanan Dashboard (Page 1) yang
> **read-only, akordeon, self-service** — Page 5 adalah versi CRUD.
> Sumber data = resource **`/profil/*`** (di-key `biodataId` = NIK), **bukan** `/kepegawaian/riwayat/*`.

**Keputusan P1 — Scope: konsol terpisah dari Riwayat; CRUD penuh keenam kategori; tanpa approval.**

Data Pendukung berisi data **keadaan sekarang** (profil), Riwayat berisi **kejadian** (karier).
Keduanya beda sifat dan beda kunci data (`biodataId` vs `pegawaiId`) → konsol terpisah, bukan rail
gabungan. Semua 6 kategori = **daftar record per pegawai** dan BE mendukung CRUD penuh semuanya
(tidak ada state machine milik modul lain seperti cuti). Konsol ini untuk **admin/HR** → tulis
langsung; alur self-service approval (field `disetujui` di keahlian) **tidak direplikasi** —
request schema keahlian bahkan tidak memuat field itu, BE yang mengelola.

> ⚠️ Konsekuensi: `SectionRightPanel` (Dashboard) **tidak dipakai ulang apa adanya** — kolomnya
> tipis untuk konsol kerja. Yang dipanen dari sana: pola `SectionConf`, formatter (contoh
> `formatPendidikan()` di `enum-labels.ts`), dan contoh `buildUrl` dengan `?biodataId=${nik}`.

**Keputusan P2 — Route per kategori + rail page-local.** → [ADR-0014](../adr/0014-data-pendukung-konsol-profil.md)

```
app/(app)/kepegawaian/data/
├─ page.tsx                    (existing, 3 tab)
├─ tambah/                     (existing — segmen statis menang atas [pegawaiId])
└─ [pegawaiId]/pendukung/
   ├─ layout.tsx               header NIPAM + nama, rail "Kategori Data Pendukung" (page-local)
   ├─ page.tsx                 redirect → ./pendidikan
   └─ pendidikan/page.tsx      Fase 1   (pengalaman-kerja|keahlian|pelatihan|kartu-identitas|keluarga menyusul)
```

URL contoh: `/kepegawaian/data/123/pendukung/pendidikan?institusi=UGM&page=2`

Alasan = mirror ADR-0013: filter **wajib** hidup di `searchParams` (aturan terkunci CONTEXT-MAP);
satu route bersama membuat filter antar-kategori bertabrakan. Rail Kategori = navigasi `<Link>`
nyata. Segmen statis `tambah` tidak konflik dengan `[pegawaiId]` (Next.js: statis menang).

**Keputusan P3 — Entry point: tombol ke-4 "Data Pendukung" di `RingkasanPanel`.**

Klik baris di tabel Data Pegawai → panel Ringkasan → klik **Data Pendukung**
→ `router.push("/kepegawaian/data/{id}/pendukung/pendidikan")`. Sebaris dengan
Edit Profil · Edit Gaji · Riwayat.

Alasan = sama dengan Keputusan 3 riwayat: `onRowClick` sudah terpakai untuk memilih pegawai;
panel Ringkasan sudah memegang `pegawaiId` yang pasti + `nik`.

> ⚠️ Catatan implementasi: action row di `ringkasan-panel.tsx` **terduplikasi** — sekali di
> cabang `isPending` (di-gate `showActions`) dan sekali di render akhir. Tombol harus ditambah
> di **dua** tempat.

**Keputusan P4 — Kolom Aksi = ikon Edit + Hapus; klik-baris = PILIH (bukan Edit).**

Sama persis dengan Keputusan 4 riwayat: menu `⋯` **ditolak** (CONTEXT-MAP §List-screen anatomy).
Kolom Aksi = 2 ikon (≥20px, sentuh ≥40px): Edit → Sheet, Hapus → `<ConfirmDeleteDialog>`.
**Klik baris = pilih baris** (`?sel={id}` ke `searchParams`), karena kartu Lampiran di bawah
secara struktural milik **satu baris** (`refId`). Aturan §170 tetap berlaku default untuk tabel
lain; pengecualian sempit ini sama dengan riwayat.

**Keputusan P5 — Kartu Lampiran untuk SEMUA 6 kategori; tanpa approval.**

Pola Keputusan 5 riwayat: kolom `No | File | Keterangan | Aksi` (Lihat + Hapus), tombol `+ Unggah`
kanan-atas, **tanpa kolom Status** (HR tidak menyetujui berkas sendiri). Aturan "Lihat" bersyarat
`mimeType`: `pdf`/`image/*` → viewer in-app; lain-lain → langsung download (`window.open`).

Sumber `(ref, refId)` per kategori:

| Kategori | `ref` (JenisProfilUpdate) | `refId` |
|---|---|---|
| Pendidikan | `PROFIL_PENDIDIKAN` | id baris pendidikan |
| Pengalaman Kerja | `PROFIL_PENGALAMAN_KERJA` | id baris pengalaman-kerja |
| Keahlian | `PROFIL_KEAHLIAN` | id baris keahlian |
| Pelatihan | `PROFIL_PELATIHAN` | id baris pelatihan |
| Kartu Identitas | `KARTU_IDENTITAS` | id baris kartu-identitas |
| Keluarga | `PROFIL_KELUARGA` | id baris keluarga |

Berbeda dari riwayat (ref SK, bukan id baris): di `/profil/*` lampiran memang menempel ke **id
baris entity itu sendiri** — jadi `refId` = id baris terpilih (`?sel`), tanpa penurunan.

> ✅ **Spike lampiran selesai (2026-08-12, dari OpenAPI `docs/api/profil/api.json`).** Bentuk URL
> list berbeda antar-entity (2 pola), tapi **detail/file/delete seragam** untuk semua:
>
> | Entity | List (`refId`) | Detail | File | Delete |
> |---|---|---|---|---|
> | Pendidikan | `/lampiran/{refId}/list` | `/lampiran/{id}/detail` | `/lampiran/{id}/file` | `/lampiran/{id}` |
> | Pengalaman Kerja | `/lampiran/{refId}/list` | `/lampiran/{id}/detail` | `/lampiran/{id}/file` | `/lampiran/{id}` |
> | Pelatihan | `/{refId}/lampiran` | `/lampiran/{id}` | `/lampiran/{id}/file` | `/lampiran/{id}` |
> | Keahlian | `/{refId}/lampiran` | `/lampiran/{id}` | `/lampiran/{id}/file` | `/lampiran/{id}` |
> | Kartu Identitas | `/{refId}/lampiran` | `/lampiran/{id}` | `/lampiran/{id}/file` | `/lampiran/{id}` |
> | Keluarga | `/{refId}/lampiran` | `/lampiran/{id}` | `/lampiran/{id}/file` | `/lampiran/{id}` |
>
> (Tabel = path relatif ke `/profil/{entity}`; upload semua entity = `POST /profil/{entity}/lampiran`
> multipart/form-data, body `ref`, `refId`, `fileName` binary, `notes` — quirk Springdoc
> `@ModelAttribute` sama seperti riwayat.)
>
> **Semantik `{id}` terverifikasi dari spec:** di endpoint **List**, `{id}` = **refId** (id baris
> entity, dari `?sel`); di endpoint **Detail/File/Delete**, `{id}` = **lampiranId** (id dari
> response list — `LampiranProfilQuery.id`). List response = `LampiranProfilQuery[]` (array,
> bukan paged), shape: `id` · `ref` · `refId` · `fileName` · `mimeType` · `notes` · `disetujui` ·
> `disetujuiOleh` · `tanggalDisetujui`.
>
> ⚠️ **Catatan tambahan:** ada endpoint shared `GET /profil/lampiran/file/{jenis}/{id}` (jenis =
> enum `JenisProfilUpdate`) dan `POST /profil/lampiran/accept` (approve lampiran,
> `LampiranProfilAcceptRequest {id, ref}`) — **tidak dipakai** di konsol admin (P5: tanpa
> approval), dicatat agar tidak dianggap FE lupa.

**Keputusan P6 — Kunci data: `biodataId` = NIK, gratis dari header session.**

`GET /pegawai/{id}/session` (sudah dipakai layout, `staleTime: 5 * 60_000`) mengembalikan
`nik`. Semua query `/profil/{entity}` memakai `?biodataId=<nik>` + filter + paging — **nol fetch
tambahan**. Route tetap di-key `pegawaiId` int64 (Keputusan 11 riwayat).

> ⚠️ Inkonsistensi BE (dipetakan per-form, nilai sama): `KartuIdentitasPostRequest`/`PutRequest`
> memakai field **`nik`**, entity lain memakai **`biodataId`**.
>
> ⚠️ Kekhasan lain (Keluarga): filter `?hubunganKeluarga=` dan `?jenisKelamin=` di
> `GET /profil/keluarga` bertipe **int32** padahal request/response memakai enum string — mapping
> angka↔enum tidak terdokumentasi; filter Hubungan dirender dengan **spike wajib** (lihat
> [kepegawaian-pendukung-keluarga.md](kepegawaian-pendukung-keluarga.md) K2).

**Keputusan P7 — Form = Sheet untuk semua kategori.**

Pola `docs/design/sheet-form-pattern.md` + `### CRUD form presentation` CONTEXT-MAP: satu kolom,
label-on-top, input ≥44px, footer sticky (Batal kiri · Simpan kanan, loading "Menyimpan…"), error
inline (Zod per-field; error submit di atas footer), **bukan toast** untuk validasi. Sheet
di-mount **sekali** di level page, `editing` state di-lift — dilarang satu Sheet per baris.
FK combobox (jenjang pendidikan, jenis keahlian, jenis pelatihan, jenis kartu, hubungan keluarga)
pakai `/list` cache bersama (staleTime panjang) — pola combobox CONTEXT-MAP.

**Keputusan P8 — RBAC: gate permission `pegawai` (dual-mode, preseden Keputusan 10 riwayat).**

| Titik | Gate |
|---|---|
| `[pegawaiId]/pendukung/**/page.tsx` | `hasPermission(permissions, PERMISSION.PEGAWAI_READ, roles)` → `forbidden()` |
| Tombol **+ Tambah** | `hasPermission(permissions, PERMISSION.PEGAWAI_WRITE, roles)` (unmount) |
| Ikon ✎ / 🗑 di kolom Aksi | ✎ `PERMISSION.PEGAWAI_WRITE` · 🗑 `PERMISSION.PEGAWAI_DELETE` |
| Unggah / hapus lampiran | ikut `PEGAWAI:WRITE` / `PEGAWAI:DELETE` |

Sumber kebenaran = `getAccountSession()` (`/account/me`) — permission HR/ADMIN dari seed BE,
tanpa matriks hardcode. Tidak ada ADR untuk keputusan ini (preseden diikuti; dulu gate pakai
`can()` + `<Can>` di entity `pegawai` — kini `hasPermission()`).

---

## Rail "Kategori Data Pendukung" (page-local, bukan sidebar)

| Item rail | Endpoint list (semua `/api/proxy/profil/*` di-key `?biodataId=<nik>`) | Sumber tipe |
|---|---|---|
| Data Pendidikan | `GET /profil/pendidikan` | `src/types/profil/pendidikan.ts` |
| Pengalaman Kerja | `GET /profil/pengalaman-kerja` | `src/types/profil/pengalaman-kerja.ts` |
| Keahlian | `GET /profil/keahlian` | `src/types/profil/keahlian.ts` |
| Pelatihan | `GET /profil/pelatihan` | `src/types/profil/pelatihan.ts` |
| Kartu Identitas | `GET /profil/kartu-identitas` | `src/types/profil/kartu-identitas.ts` |
| Keluarga | `GET /profil/keluarga` | `src/types/profil/keluarga.ts` |

CRUD + lampiran untuk semua: `POST/PUT/DELETE /profil/{entity}[/{id}]` dan
`/profil/{entity}/lampiran/*` (lihat P5).

**Filter API per kategori** (dari `*SearchParams`; toolbar memilih subset — YAGNI, tambah bila
diminta, preseden Keputusan 6 riwayat):

| Kategori | Filter yang diterima BE (di luar page/size/sort) |
|---|---|
| pendidikan | `biodataId`, `jenjangId`, `gelarDepan`, `gelarBelakang`, `jurusan`, `institusi`, `kota`, `tahunMasuk`, `tahunLulus`, `gpa`, `isLatest` |
| pengalaman-kerja | `biodataId`, `namaPerusahaan`, `jabatan` |
| keahlian | `biodataId`, `jenisKeahlianId`, `disetujui` |
| pelatihan | `biodataId`, `jenisPelatihanId`, `nama`, `lembaga` |
| kartu-identitas | `biodataId`, `jenisKartuId`, `nomorKartu` |
| keluarga | `biodataId`, `hubunganKeluarga` |

**Belum terkunci:** — (kosong). Semua pertanyaan desain shared-infra tertutup.
(Verifikasi URL lampiran = spike di P5, bukan pertanyaan desain. Detail per-kategori — kolom
tabel, field form, master FK — di-grill per-kategori saat implementasi, seperti riwayat.)

---

## Peta context per kategori

> Muat file kategori yang relevan saja — jangan muat semua sekaligus.

| Kategori | Context file | Status |
|---|---|---|
| Data Pendidikan | [`kepegawaian-pendukung-pendidikan.md`](kepegawaian-pendukung-pendidikan.md) | ✅ grilling 2026-08-12 — D1–D5 + [BE-requirement](../BE-REQUIREMENT-pendukung-pendidikan.md) |
| Pengalaman Kerja | [`kepegawaian-pendukung-pengalaman-kerja.md`](kepegawaian-pendukung-pengalaman-kerja.md) | ✅ grilling 2026-08-12 — W1–W4 (tanpa gap BE) |
| Keahlian | [`kepegawaian-pendukung-keahlian.md`](kepegawaian-pendukung-keahlian.md) | ✅ grilling 2026-08-12 — K1–K3 (tanpa gap BE) |
| Pelatihan | [`kepegawaian-pendukung-pelatihan.md`](kepegawaian-pendukung-pelatihan.md) | ✅ grilling 2026-08-12 — PL1–PL3 (tanpa gap BE) |
| Kartu Identitas | [`kepegawaian-pendukung-kartu-identitas.md`](kepegawaian-pendukung-kartu-identitas.md) | ✅ grilling 2026-08-12 — KI1–KI3 (tanpa gap BE) |
| Keluarga | [`kepegawaian-pendukung-keluarga.md`](kepegawaian-pendukung-keluarga.md) | ✅ grilling 2026-08-12 — K1–K3 (filter enum→angka = spike) |
