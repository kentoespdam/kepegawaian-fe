# Konteks: `kepegawaian` §Page 4 — Riwayat Pegawai (Keputusan 1–12)

> Delta modul. Baca [CONTEXT-MAP.md](../../CONTEXT-MAP.md) (inti bersama) dulu.
> Bagian dari [kepegawaian.md](kepegawaian.md) — baca itu untuk Ringkas + identity bridge.
> **Muat file ini hanya bila menyentuh konsol Riwayat** (`(app)/kepegawaian/data/[pegawaiId]/riwayat/**`).
> Papan pantau implementasi: [CLAIM-ORDER-riwayat-pegawai.md](../CLAIM-ORDER-riwayat-pegawai.md) ·
> ADR: [0013](../adr/0013-riwayat-route-per-kategori.md).

## Page 4 — Riwayat Pegawai (drill-down per-pegawai, konsol CRUD)

> **Bukan item sidebar.** Drill-down dari Page 2 (Data Pegawai) untuk **satu** pegawai.
> Berbeda dari panel kanan Dashboard (Page 1) yang **read-only, akordeon, self-service** —
> Page 4 adalah **konsol kerja HR**: satu kategori per layar, filter di toolbar, aksi baris, Lampiran.

**Keputusan 1 — Scope: CRUD penuh, bertahap.**
Tambah/ubah/hapus riwayat + kelola Lampiran (BE POST/PUT/DELETE + `/kepegawaian/lampiran/*` sudah ada).
Fase 1 = **Mutasi saja, tapi tuntas** (tabel kaya + filter + CRUD + Lampiran); kategori lain menyusul
dengan pola yang sama. Read-only ditolak: tanpa CRUD page ini cuma menduplikasi panel kanan Dashboard.

> ⚠️ Konsekuensi: `SectionRightPanel` **tidak bisa dipakai ulang apa adanya** — kolomnya jauh lebih
> tipis (mutasi: Jenis · Organisasi · Jabatan · TMT) daripada spek (SK komposit + pasangan Lama/Baru + Aksi).
> Yang dipanen dari sana: formatter `jenisSk()`, `jenisMutasi()`, `rp()`, `formatDate()`, pola `SectionConf`.

**Keputusan 2 — Route per kategori.** → [ADR-0013](../adr/0013-riwayat-route-per-kategori.md)

```
app/(app)/kepegawaian/data/
├─ page.tsx                    (existing, 3 tab)
├─ tambah/                     (existing — segmen statis menang atas [pegawaiId], tidak bentrok)
└─ [pegawaiId]/riwayat/
   ├─ layout.tsx               header NIPAM + nama, rail "Kategori" (page-local)
   ├─ page.tsx                 redirect → ./mutasi
   └─ mutasi/page.tsx          fase 1   (kontrak|sk|sp/ menyusul)
```

URL contoh: `/kepegawaian/data/123/riwayat/mutasi?nomorSk=820&page=2`

Alasan: filter **wajib** hidup di `searchParams` (aturan terkunci CONTEXT-MAP). Satu route berbagi
untuk semua kategori membuat `nomorSk` / `jenisMutasi` / `nomorSp` / `nomorKontrak` bertabrakan dan
bocor antar-kategori. Rail Kategori = **navigasi `<Link>` nyata**, bukan akordeon/tab state.
Pengiriman bertahap jadi natural: tambah satu folder per kategori.

Ditolak: satu route + `?kategori=` (namespacing filter jadi rumit); menjadikan
`/kepegawaian/data/[pegawaiId]` sebagai "page detail pegawai" penuh dengan riwayat sebagai tab
(memperkenalkan konsep baru yang belum ada + memaksa `RingkasanPanel` pindah/diduplikasi).

**Keputusan 3 — Entry point: tombol "Riwayat" di `RingkasanPanel`.**

Alur: klik baris di tabel Data Pegawai → panel Ringkasan muncul di kanan → klik **Riwayat**
→ `router.push("/kepegawaian/data/{id}/riwayat/mutasi")`. Tombol ke-3 sebaris dengan
"Edit Profil" & "Edit Gaji".

Alasan: `onRowClick` di `/kepegawaian/data` **sudah terpakai** untuk memilih pegawai
(`setSelectedId` → `RingkasanPanel`), jadi drill-down tak bisa numpang klik baris.
Panel Ringkasan sudah memegang `pegawaiId` yang pasti + `nik`, dan baris aksinya sudah jadi
tempat kanonik untuk aksi per-pegawai.

Ditolak: ikon aksi per baris (menabrak aturan CONTEXT-MAP "aksi baris = Edit + Hapus, tanpa
menu titik-tiga" + melebarkan tabel yang sudah punya 11 filter); NIPAM sebagai link (jebakan
salah-klik baris-vs-sel, melanggar mandat target sentuh ≥44px untuk pengguna lansia);
dua-duanya sekaligus (dua pintu, nol kemampuan baru).

> ⚠️ Catatan implementasi: baris aksi di `ringkasan-panel.tsx` **terduplikasi** — sekali di
> cabang `isPending` (di-gate `showActions`) dan sekali di render akhir. Tombol harus ditambah
> di **dua** tempat, kalau tidak ia hilang saat panel sedang memuat.

**Keputusan 4 — Kolom Aksi = ikon Edit + Hapus; klik-baris = PILIH (bukan Edit).**

Menu `⋯` screenshot **ditolak** — CONTEXT-MAP §170 mengunci "ikon Edit + Hapus langsung, bukan
menu `⋮`". Kolom Aksi = 2 ikon (≥20px, sentuh ≥40px): Edit → Sheet, Hapus → `<ConfirmDeleteDialog>`.

Tapi setengah aturan §170 yang lain — "**klik di mana saja pada baris = buka Edit**" —
**di-override di page ini**: klik baris = **pilih baris**, kartu **Lampiran** di bawah memuat
lampiran baris itu.

Alasan override (bukan pelanggaran diam-diam): lampiran hanya bisa diambil lewat
`GET /kepegawaian/lampiran/list/{ref}/{refId}` — **butuh `refId`**, tak ada endpoint lampiran
per-pegawai. Jadi kartu Lampiran secara struktural milik **satu baris**, bukan milik pegawai;
harus ada konsep "baris terpilih". Polanya sudah ada persis di Page 2
(`onRowClick` → `selectedRowId` → `RingkasanPanel`), jadi ini konsistensi lokal, bukan konsep baru.

Aturan §170 tetap berlaku default untuk tabel master & tabel lain. Pengecualiannya sempit:
**tabel yang punya panel/kartu detail bergantung baris**.

> ⚠️ Konsekuensi: `refId` baris terpilih perlu ikut `searchParams` (mis. `?sel=123`) supaya
> reload/back tidak kehilangan konteks Lampiran — konsisten dengan "URL = sumber kebenaran".

**Keputusan 5 — Kartu Lampiran: unggah/lihat/unduh/hapus. Approval TIDAK dibuat.**

Kolom: `No | File | Keterangan | Aksi`. Aksi = **Lihat** + **Hapus** (unduh bukan tombol terpisah —
lihat aturan viewer di bawah). Tombol `+ Unggah` di kanan-atas kartu.

**Approval ditolak untuk page ini** — bukan ditunda karena RBAC, tapi karena **tidak relevan**:
konsol ini hanya diakses admin/HR, dan HR tidak menyetujui berkasnya sendiri. `POST /kepegawaian/lampiran/accept`
tetap ada di BE (dipakai alur `profil/*` self-service pegawai, di mana HR-lah yang menyetujui),
tapi **tidak dipanggil dari Page 4**. Konsekuensi: **tidak ada kolom Status** di kartu ini —
field `disetujui` / `disetujuiOleh` / `tanggalDisetujui` di `LampiranSkQuery` diabaikan di sini.

**Aturan "Lihat" — viewer bersyarat tipe file:**

| `mimeType` | Perilaku tombol Lihat |
|---|---|
| `application/pdf` | buka viewer in-app (dokumen tampil) |
| `image/*` | buka viewer in-app (gambar tampil) |
| lain-lain | **langsung unduh berkas** — tanpa viewer, tanpa dialog |

Satu tombol, dua perilaku — pengguna lansia tidak perlu memilih antara "lihat" dan "unduh";
sistem yang memutuskan. Sumber berkas: `GET /kepegawaian/lampiran/file/{jenis}/{id}`.

> ⚠️ **Ini upload pertama di codebase.** `grep FormData|type="file"|multipart` di seluruh `src/` = **nol hasil**;
> semua mutasi selama ini JSON. `LampiranSkPostRequest.fileName` bertipe `binary` → `multipart/form-data`.
> `proxy.ts` memakai `rewrite` (bukan `fetch` manual, lihat komentar `ponytail:` di baris 48), jadi body
> diteruskan apa adanya — **harus diverifikasi nyata**, bukan diasumsikan. Batas tipe & ukuran unggah
> masih TBD.

**Kunci lampiran = SK, bukan baris mutasi.** `ref` bertipe `JenisSk` (9 literal SK), jadi
`(ref, refId)` = **(jenis SK, id SK)** — bukan id baris mutasi. Bukti: `GET /riwayat/mutasi/pegawai/{id}`
menyediakan filter `riwayatSkId`, artinya baris mutasi memang punya id SK yang **berbeda** dari id
barisnya sendiri. Untungnya keduanya sudah ada di row: `row.skMutasi.id` + `row.skMutasi.jenisSk`
(`RiwayatMutasiQuery.skMutasi: RiwayatSkQuery`) — tak perlu fetch tambahan.

Konsekuensi yang harus disadari: **dua baris mutasi yang berbagi SK yang sama akan berbagi lampiran
yang sama.** Judul kartu karenanya menyebut SK-nya (`Lampiran — SK 820/2821/2020`), bukan "Lampiran
baris ini". `?sel=` di URL menyimpan **id baris mutasi** (identitas baris yang stabil & terlihat di
tabel); `ref`/`refId` diturunkan dari `row.skMutasi`. Sisa yang perlu dikonfirmasi ke BE hanyalah
apakah `skMutasi.id` benar-benar terisi di response list.

Taksonomi kategori lain: **SP tidak ikut subsistem ini** (punya `fileName`/`mimeType` inline +
`GET /riwayat/sp/{id}/file`); **Kontrak tidak punya berkas sama sekali**; Terminasi memakai
`lampiranSkTerminasi` tunggal, bukan list. Jadi kartu Lampiran **hanya muncul di kategori Mutasi & SK**.

> ⚠️ Spec `POST /kepegawaian/lampiran` mendeklarasikan `LampiranSkPostRequest` sebagai **query
> parameter** (`in: query`) padahal isinya field `binary` — ini kekhasan Springdoc untuk
> `@ModelAttribute`; realitanya `multipart/form-data`. Generator tipe menyalin spec apa adanya,
> jadi **jangan percaya `in: query`** — verifikasi dengan request nyata.

**Keputusan 6 — Filter: endpoint per-pegawai MENERIMA filter, tapi tiap kategori beda set.**

Terverifikasi dari `docs/api/kepegawaian/api.json` (bukan dari tipe generate — `RiwayatSearchParams`
adalah gabungan semua kategori dan **menyesatkan** kalau dipakai apa adanya per-page):

| Kategori | Filter yang benar-benar diterima (di luar `page`/`size`/`sortBy`/`sortDirection`) |
|---|---|
| **mutasi** | `pegawaiId`, `riwayatSkId`, `nomorSk`, `jenisMutasi`, `organisasiId`, `namaOrganisasi`, `jabatanId`, `namaJabatan`, `organisasiLamaId`, `namaOrganisasiLama`, `jabatanLamaId`, `namaJabatanLama` |
| sk | `pegawaiId`, `nomorSk`, `jenisSk`, `golonganId` |
| kontrak | `pegawaiId`, `nomorKontrak` |
| sp | `pegawaiId`, `nomorSp`, `jenisSpId` |

Toolbar screenshot ("Cari SK" + "Pilih Jenis Mutasi" + reset) **terpenuhi persis** oleh
`nomorSk` + `jenisMutasi`. Fase 1 hanya merender dua filter itu — sisanya (organisasi/jabatan
lama & baru) tersedia di BE tapi **tidak dirender**: satu pegawai jarang punya puluhan baris mutasi,
jadi filter tambahan = kolom mati untuk pengguna lansia. YAGNI, bisa ditambah kalau nanti diminta.

⚠️ Set filter yang berbeda per kategori **memperkuat Keputusan 2** (route per kategori): satu route
bersama harus menyaring `searchParams` per kategori secara manual — persis kerumitan yang dihindari.

**Keputusan 7 — Form Mutasi: satu Sheet, conditional fields by `jenisMutasi`. Tanpa validasi rantai riwayat.**

`RiwayatMutasiPostRequest` = **dua entitas dalam satu tulis**: seluruh isi `RiwayatSkPostRequest`
(±12 field) + field mutasi (±10). Jadi satu Sheet (heavy form per CONTEXT-MAP).

**Struktur form (top → bottom):**
1. **Data Pegawai** (read-only block): NIPAM, Nama, Golongan, Unit Kerja, Jabatan, Profesi — nilai
   saat ini, dari `GET /pegawai/{id}/mutasi-context`. Berfungsi ganda sebagai **nilai "Lama"** yang
   ikut dikirim (field `*LamaId`). → supersedes Keputusan 11 for form context (layout still uses session).
2. **Data Mutasi** (always visible): Jenis Mutasi, Nomor SK, Tanggal SK, TMT Berlaku, checkbox
   `updateMaster` (full row below TMT), Notes textarea.
3. **Conditional sections** (keyed on `jenisMutasi`):
   - `PENGANGKATAN_PERTAMA` / `TERMINASI`: base only (no additional section)
   - `MUTASI_LOKER` / `MUTASI_JABATAN`: + fieldset "Mutasi Lokasi Kerja / Jabatan" with cascade
     Unit Kerja → Jabatan → Profesi (via `GET /master/jabatan/organisasi/{id}` + `/master/profesi/jabatan/{id}`)
   - `MUTASI_GOLONGAN`: + fieldset "Mutasi Golongan" with Golongan select, nested fieldset "Masa Kerja
     Golongan" (MKG Tahun, MKG Bulan), Kenaikan Berikutnya date, nested fieldset "Masa Kerja Golongan
     Berikutnya" (MKGB Tahun, MKGB Bulan). **NO Gaji Pokok** — downstream salary-adjustment process handles it.
   - `MUTASI_GAJI` / `MUTASI_GAJI_BERKALA`: + all `MUTASI_GOLONGAN` fields + Gaji Pokok (text input with
     search button calling `GET /penggajian/detail-dasar-gaji/{golonganId}/{masaKerja}`, fills from `data.nominal`).

**`jenisSk` derived from `jenisMutasi`** (no UI control): `PENGANGKATAN_PERTAMA` → `SK_CAPEG`,
`MUTASI_LOKER` → `SK_MUTASI`, `MUTASI_JABATAN` → `SK_JABATAN`, `MUTASI_GOLONGAN` → `SK_KENAIKAN_PANGKAT_GOLONGAN`,
`MUTASI_GAJI` → `SK_PENYESUAIAN_GAJI`, `MUTASI_GAJI_BERKALA` → `SK_KENAIKAN_GAJI_BERKALA`, `TERMINASI` → `SK_PENSIUN`.

**Keputusan 7b (reset semantics):** changing `jenisMutasi` → hidden section fields cleared immediately
(`setValue(field, undefined)`), mirroring `onOrgChange` in tambah-form.tsx. State = visible.

**`updateMaster` = checkbox biasa, keputusan HR.** Dirender apa adanya dengan label jelas
("Perbarui data pegawai sesuai mutasi ini"). **Tidak ada validasi, tidak ada dialog konfirmasi,
tidak ada peringatan kondisional** — HR yang memutuskan, sistem tidak menggurui. Default: tidak
dicentang (mengikuti default field opsional BE; tak ada efek samping kecuali diminta).

Konsekuensi yang diterima sadar: rantai riwayat bisa saja tidak nyambung (Baru baris N ≠ Lama baris N+1).
**Itu bukan urusan frontend** — tidak ada validasi lintas-baris yang dibangun.

**Keputusan 8 — Tabel Mutasi: persis screenshot. Sel komposit & pasangan Lama/Baru dirender penuh.**

Kolom (kiri→kanan): `No | SK | Jenis Mutasi | Golongan | Unit Kerja | Jabatan | Notes` + **Aksi**.

| Kolom | Isi | Sumber |
|---|---|---|
| No | nomor urut berjalan (lanjut lintas halaman) | `page * size + i + 1` |
| SK | 3 baris: `Efektif : {tgl}` / `Nomor : {no}` / `Gaji Pokok : {rp}` | `row.skMutasi.tmtBerlaku`, `.nomorSk`, `.gajiPokok` |
| Jenis Mutasi | label enum | `row.jenisMutasi` → formatter `jenisMutasi()` |
| Golongan | 2 baris: `Lama : …` / `Baru : …` | `row.golonganLama` / `row.golongan` |
| Unit Kerja | 2 baris `Lama:`/`Baru:` | `row.organisasiLama?.nama ?? row.namaOrganisasiLama` / idem non-lama |
| Jabatan | 2 baris `Lama:`/`Baru:` | `row.jabatanLama` / `row.jabatan` |
| Notes | teks | `row.notes` |

**Pasangan tetap dirender penuh walau nilainya sama** (screenshot memang begitu: Golongan `Lama : II/a`
/ `Baru : II/a` pada mutasi jabatan). Nilai kosong → `—`. Alasan: HR membaca tabel ini sebagai
**salinan lembar SK**, bukan sebagai diff; menyembunyikan yang tak berubah membuat baris terlihat
"hilang data". Profesi (`profesiLama`/`profesi`) ada di data tapi **tidak dirender** — tidak ada di
screenshot dan tidak ada kolomnya; kalau nanti diminta, tinggal tambah kolom ke-4 berpola sama.

Konsekuensi yang diterima: baris tinggi (≈3 baris teks), 7 kolom + Aksi. Untuk pengguna lansia ini
justru menguntungkan (target sentuh besar, label eksplisit `Lama :`/`Baru :` bukan panah simbolik),
tapi **lebar** jadi ketat — `<td>` di `DataTable` ber-`whitespace-nowrap`, jadi tiap baris di dalam sel
harus `<div>` sendiri (bukan `<br/>` di satu string), dan label kecil di-mute (`text-xs
text-muted-foreground`) sementara nilainya normal.

Dua temuan kode yang mengikat implementasi:

1. **`Column<T>.cell` sudah `(item) => ReactNode`** — sel multi-baris **tidak** butuh primitive baru.
2. **Tapi kolom `No` butuh index, dan `cell` tidak menerimanya.** `DataTable` sudah punya `i` di
   `data.map((item, i) => …)` tetapi memanggil `col.cell(item)` saja. Perubahan minimal:
   `cell?: (item: T, index: number) => React.ReactNode` + teruskan `i` — **backward-compatible penuh**,
   nol call-site existing yang berubah. Offset halaman dihitung di closure config (`page`/`size` sudah
   ada di client). Ini satu-satunya sentuhan ke shared primitive; **wajib `gitnexus_impact` sebelum edit.**

**Aksi tetap di kolom paling kanan, bukan kolom ke-2 seperti screenshot.** `DataTable` meng-append
`<th>Aksi</th>` otomatis di akhir (`hasActions`) dan posisinya tidak dapat dikonfigurasi. Memindahnya
= mengubah primitive yang dipakai 15+ entity master demi satu tabel → ditolak. Isinya tetap ikon
langsung (✎ Edit, 🗑 Hapus) sesuai Keputusan 4, bukan menu `⋯`.

**Keputusan 9 — Unggah lampiran: tanpa validasi klien. BE yang memvalidasi.**

`<input type="file">` **tanpa `accept`, tanpa cek `file.size`**. Berkas dikirim apa adanya; bila BE
menolak (413/415/400), pesan error BE ditampilkan apa adanya — konsisten dengan pola "mutasi gagal →
toast berisi pesan BE" yang sudah dipakai di seluruh aplikasi. Frontend tidak menebak-nebak aturan
yang tidak ada di spec.

Konsekuensi yang diterima sadar: pengguna baru tahu berkasnya ditolak **setelah** unggahan selesai.
Mitigasi yang tetap wajib (ini bukan validasi, ini state handling — lihat CONTEXT-MAP §state):
tombol Unggah `disabled` + label "Mengunggah…" selama `isPending`, dan dialog tetap terbuka saat
gagal agar berkas tidak perlu dipilih ulang.

> ⚠️ **Sisa risiko teknis, bukan keputusan desain — harus dibuktikan lebih dulu di implementasi.**
> `proxy.ts` meneruskan lewat `NextResponse.rewrite` (baris 49–63): header di-clone, body **tidak
> disentuh**, jadi secara teori `multipart/form-data` + boundary lolos utuh. Belum pernah dijalankan
> — nol `FormData` di seluruh `src/`. Langkah pertama issue unggah = **spike**: POST satu berkas nyata
> ke `/api/proxy/kepegawaian/lampiran`, pastikan BE menerimanya. Kalau `rewrite` merusak body/boundary,
> barulah pertimbangkan route handler khusus di `app/api/` (saat ini direktori itu tidak ada sama sekali).
> Catatan tambahan: `api` client di `src/lib/api/client.ts` ber-`BASE = "/api/proxy/master"` dan selalu
> `JSON.stringify` — **tidak bisa dipakai** untuk unggah; pakai `fetch` langsung seperti yang sudah
> dilakukan `section-right-panel.tsx` untuk endpoint kepegawaian.

**Keputusan 10 — RBAC ditunda (lagi). Page 4 ikut role ADMIN/HR lewat entity `pegawai` yang sudah ada.**

Matriks RBAC per-entity belum dirancang, dan Page 4 **tidak** dijadikan pemicu untuk merancangnya.
Gate-nya ikut preseden yang sudah ship: `data/tambah/page.tsx` melakukan tulis lintas-pegawai dengan
`can(roles, "create", "pegawai")`. Page 4 memakai kunci entity yang sama.

| Titik | Gate |
|---|---|
| `[pegawaiId]/riwayat/**/page.tsx` | `can(roles, "view", "pegawai")` → `forbidden()` |
| Tombol **+ Tambah Mutasi** | `<Can action="create" entity="pegawai">` |
| Ikon ✎ / 🗑 di kolom Aksi | `<Can action="update" \| "delete" entity="pegawai">` |
| Unggah / hapus lampiran | ikut `update` / `delete` `"pegawai"` |

**Satu baris yang tetap harus ditambah:** `can()` melakukan `PERMISSIONS[role.toLowerCase()]`, jadi
label Appwrite `HR` **tidak akan cocok apa pun** selama `PERMISSIONS` cuma punya `admin` dan `viewer`
— HR bakal kena `forbidden()`. Supaya "ikut ADMIN/HR" benar-benar berlaku:
`hr: { "*": ALL }` di `src/lib/auth/permissions.ts`, sejajar `admin`. Bukan matriks, satu baris.

**Kenapa ADR-0012 tidak jadi blocker.** ADR-0012 menulis *"Tinjau ulang jika: muncul kebutuhan edit
lintas-pegawai (HR) → butuh RBAC nyata"*. Kenyataannya kebutuhan itu **sudah lewat tanpa ditinjau**:
`/kepegawaian/data/tambah`, Terminasi, dan 15 page master semuanya sudah ship sebagai tulis
lintas-pegawai di atas wildcard `admin: {"*": ALL}`. Utang RBAC itu utang seluruh aplikasi, bukan
utang Page 4 — memblokir fitur ini demi model yang belum punya peminta = menghukum halaman yang
kebetulan datang terakhir. Karena itu **tidak ada ADR** untuk keputusan ini: tidak ada trade-off baru
yang dipilih, hanya preseden yang diikuti.

Biaya membalik nanti ≈ nol: `can()` sudah `perms[entity] ?? perms["*"]`, jadi saat matriks asli
dirancang, mengganti `"pegawai"` → `"riwayat"` di page + `<Can>` adalah find-replace di satu direktori,
tanpa menyentuh page lain.

**Rail "Kategori" (page-local, bukan sidebar)** — konsisten dengan resolusi "rail tetap 6 modul":

| Item rail | Sumber | Fase |
|---|---|---|
| Data Mutasi | `/kepegawaian/riwayat/mutasi/pegawai/{pegawaiId}` | 1 |
| Riwayat Kontrak Kerja | `/kepegawaian/riwayat/kontrak/pegawai/{pegawaiId}` | 2 |
| Riwayat Surat Keputusan | `/kepegawaian/riwayat/sk/pegawai/{pegawaiId}` | 2 |
| Riwayat Surat Peringatan | `/kepegawaian/riwayat/sp/pegawai/{pegawaiId}` | 2 |
| Data Penggunaan Hak Cuti | `/cuti/pengajuan/{pegawaiId}/pegawai` (+ `/cuti/kuota/{pegawaiId}/{tahun}/sisa`) — **read-only** | 2 |

**Gate:** `can(roles, "view", "pegawai")` (page) + `<Can … entity="pegawai">` per aksi — lihat
Keputusan 10. Prasyarat implementasi: tambah `hr: { "*": ALL }` ke `PERMISSIONS`.

**Keputusan 11 — Kunci identitas = `pegawaiId` numerik, tanpa konversi. Header dari
`GET /pegawai/{id}/session`.**

Tidak ada pertanyaan `pegawaiId` vs `nik` yang tersisa untuk Fase 1: BE sudah memutuskannya.
`/profil/*` di-key `biodataId=${nik}`; **seluruh** `/kepegawaian/riwayat/{mutasi,sk,kontrak,sp}/pegawai/{id}`
di-key `{id}` int64. Rail Fase 1 & 2 semuanya jatuh di sisi kedua → route Keputusan 2
(`data/[pegawaiId]/riwayat/…`) langsung cocok, nol konversi. Kategori **cuti** juga: `/cuti/pengajuan/{pegawaiId}/pegawai` di-key int64 yang sama (Keputusan 12) →
`nik` tidak dibutuhkan satu rail item pun. Ia tetap ikut gratis di payload header.

**Tab Non-pegawai bukan lubang.** Sempat dikira tombol Riwayat bisa memancarkan NIK ke URL karena
`getRowId` = `id ?? nik`. Ternyata tidak: di `data-pegawai-client.tsx` **`onRowClick` dan
`RingkasanPanel` sama-sama di-gate `isPegawaiTab`** — di tab `nonpegawai` baris tak bisa dipilih dan
panelnya tak dirender, jadi tombol Riwayat (Keputusan 3, hidup di dalam `RingkasanPanel`) tak pernah
ada di sana. `?? nik` hanya dipakai sebagai React key. **`selectedId` selalu `pegawai.id` numerik.**
Tidak ada guard baru yang perlu ditulis.

**Header — sumber: `GET /pegawai/{id}/session`** (`operationId: findSession`, ada di spec, **belum
dipakai di `src/` sama sekali**) → `PegawaiResponseSession { id, nipam, nik, nama, jabatan, organisasi }`.
Cukup untuk `Data Mutasi Pegawai [730700326] (YULIAWATY, S.Sos.)`, plus `nik` gratis bila kategori
cuti nanti membutuhkannya.

| Ditolak | Alasan |
|---|---|
| `getPegawaiSession()` (session login) | Di-key `user.$id` = **peninjau**, bukan param URL. Page 4 = HR melihat pegawai lain → header salah orang. `session` di repo ini berarti dua hal; ini yang bukan. |
| `["ringkasan", pegawaiId]` (reuse cache tabel) | Soft-nav memang 0 fetch, tapi hard-refresh menarik **35 field untuk memakai 2** — beban BE sia-sia. Keputusan user: hemat BE > hemat 1 request. |
| `?nipam=…&nama=…` di query string | URL kotor, nama bisa basi/di-tamper saat di-share, tiap linker wajib bawa 2 param. |

Bentuk: `useQuery({ queryKey: ["pegawai-session", pegawaiId], staleTime: 5 * 60_000 })` — header
jarang berubah, `staleTime` panjang, bukan `Infinity`. 404/!ok → panel inline "Pegawai tidak
ditemukan" (bukan toast; aturan §Anti-Examples).

**Keputusan 12 — Rail "Data Penggunaan Hak Cuti" = Fase 2, read-only. Tanpa tombol +, tanpa kolom
Aksi.**

Baris rail lama (`modul cuti — belum dibangun | ⏳ TBD`) **salah** dan sudah dikoreksi di tabel di
atas. Yang benar-benar belum dibangun adalah **page**-nya: `src/app/(app)/cuti/` tidak ada, dan
`app-shell.tsx:47` mendaftarkan grup nav `{ id: "cuti", label: "Cuti", entities: [] }` yang masih
kosong. Tapi kontraknya sudah lengkap — `src/types/cuti/{approval,jenis,kuota,pengajuan}.ts` sudah
digenerate dan 18 path `/cuti/*` ada di spec. Jadi ini pertanyaan scope, bukan feasibility.

**Sumber data:**

| Kebutuhan | Endpoint | Bentuk |
|---|---|---|
| Tabel penggunaan | `GET /cuti/pengajuan/{pegawaiId}/pegawai` (`operationId: index_3`) | `CutiPengajuanMiniResponse`, paged |
| Strip kuota sisa | `GET /cuti/kuota/{pegawaiId}/{tahun}/sisa` (`showByPegawai`) | `SingleResultCutiKuotaSisa` |

Kolom: `tanggalMulai`–`tanggalSelesai` (satu sel periode), `jenisCuti`/`subJenisCuti`,
`jumlahHariKerja`, `approvalCutiStatus`. Filter yang tersedia bila nanti diperlukan: `tahun`,
`approvalCutiStatus`, `jenisPengajuanCuti` — Fase 2 cukup `tahun`.

**Kenapa read-only, bukan CRUD seperti Mutasi:**

1. **State machine milik orang lain.** `approvalCutiStatus` punya 6 state
   (`PENDING|APPROVED|CONFIRMED|REJECTED|CANCELED|RETURNED`) plus `approvalLevel` dan `picSaatIni`.
   Menulis dari konsol riwayat berarti konsol ini jadi pintu masuk alur approval cuti — itu modul
   `cuti`, bukan riwayat pegawai. Sejalan dengan Keputusan 5 yang sudah membuang approval lampiran.
2. **`csrfToken` di request tulis.** `CutiPengajuanPostRequest`/`PutRequest`/`KlaimPostRequest`
   semuanya membawa field `csrfToken` yang **tidak dipakai bagian app manapun** — belum ada
   mekanisme mint/refresh-nya di FE. Read path tidak menyentuhnya. Kalau nanti modul cuti dibangun,
   masalah ini diselesaikan sekali di sana, bukan dua kali.
3. **Klaim cuti punya bentuk sendiri.** `CutiPengajuanKlaimPostRequest { refCutiId, listHari, … }`
   ≠ pengajuan biasa → satu `<CrudForm>` tak menutup keduanya.

**Fase 2, bukan Fase 1.** Fase 1 sudah berisi Mutasi CRUD penuh + Lampiran + spike multipart.
Menambah query/tabel/route cuti ke batch pertama memperbesar risiko tanpa menambah nilai — rail
item lain (kontrak/sk/sp) juga Fase 2 dan bentuknya lebih dekat ke Mutasi.

**Di Fase 1 rail item cuti tetap dirender tapi non-aktif** (sama perlakuan dengan kontrak/sk/sp) —
rail harus utuh 5 item sesuai screenshot sejak hari pertama; yang belum ada hanyalah tujuannya.

| Ditolak | Alasan |
|---|---|
| Drop dari rail Page 4 | Menyimpang dari screenshot legacy; HR kehilangan konteks cuti saat menelaah satu pegawai. |
| Fase 1 | Membengkakkan batch pertama yang sudah berisi CRUD + subsistem upload pertama. |
| CRUD penuh | Menyeret alur approval + `csrfToken` + bentuk klaim ke konsol riwayat. Milik modul `cuti`. |

**Belum terkunci:** — (kosong). Semua pertanyaan desain tertutup.
(Verifikasi multipart lewat `proxy.ts` = spike di Keputusan 9, bukan pertanyaan desain. RBAC tulis =
ditunda secara sadar di Keputusan 10. Kunci identitas = tertutup di Keputusan 11. Scope cuti =
tertutup di Keputusan 12.)
