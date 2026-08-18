# Konteks: Modul Cuti Pegawai

> **Scope:** File ini mencakup keputusan domain untuk **`/cuti/**`** — modul mandiri
> dengan sub-menu Kuota Cuti, Pengajuan Cuti, dan Persetujuan Cuti.
>
> Baca [CONTEXT-MAP.md](../../CONTEXT-MAP.md) (inti bersama) lebih dulu.
> File ini adalah konteks khusus modul cuti — **jangan** digabung ke `kepegawaian-riwayat-cuti.md`
> (yang itu adalah konsol riwayat per-pegawai, read-only, berbeda entiti).

## Status grill

Grilling 2026-08-18. Keputusan **CU-1 – CU-14** di bawah **terkunci** — jangan re-litigasi.

---

## Terminologi (Ubiquitous Language)

| Term | Definisi Kanonik |
|------|-----------------|
| **Kuota Cuti** | Jatah hari cuti tahunan yang diberikan kepada seorang pegawai oleh SDM. Terdiri dari `kuota` (dasar) + `kuotaTambahan` (bonus). |
| **Kuota Terpakai** | Jumlah hari kerja cuti yang telah diambil dan berstatus `APPROVED` atau `CONFIRMED` dalam tahun bersangkutan (`kuotaTerpakai`). |
| **Sisa Kuota** | Hari cuti yang masih bisa diambil = Kuota Total − Kuota Terpakai (`sisaKuota`). Dihitung oleh backend. |
| **Jenis Cuti** | Kategori cuti (Cuti Tahunan, Cuti Sakit, Cuti Ibadah, dll.). Ada yang punya sub-jenis (berantai). |
| **Sub-Jenis Cuti** | Turunan dari Jenis Cuti (contoh: Ibadah Haji, Ibadah Umroh di bawah Cuti Ibadah). |
| **ParentId (Jenis Cuti)** | `parentId` pada `CutiJenisMiniResponse` — id parent jenis cuti dalam pohon `CutiJenis` ber-induk. **Riil di `GET /cuti/jenis/list`** (di-select langsung dari kolom `parent_id`; `null` = **root**) dan di `subJenisCuti` pengajuan (= id `jenisCuti` baris yang sama, hasil join). Mini lain **tidak** membawa `parentId` riil: `parent` di `/cuti/jenis/*` → `null` (parent dari parent tidak di-select query), `jenisCuti` di pengajuan → `null` (jenis root). **Jangan** pakai `parentId === null` sebagai penanda "data rusak" — untuk itu pakai `parent == null` (di `/cuti/jenis/*`) atau `subJenisCuti == null` (di pengajuan). Relasi valid per baris pengajuan: `subJenisCuti.parentId === jenisCuti.id`. |
| **Pengajuan Cuti** | Permintaan formal pegawai untuk mengambil cuti dalam rentang tanggal tertentu. Dibuat oleh pegawai untuk diri sendiri. |
| **Klaim Cuti** | Jenis pengajuan khusus — pegawai mengklaim hari-hari spesifik dari sebuah pengajuan yang sudah ada (`KLAIM_CUTI`). Beda dari `PENGAJUAN_CUTI`. |
| **Approval Chain** | Rantai persetujuan multi-level: Atasan → SDM → Direksi. Dikelola backend (`picSaatIni` = jabatan approver saat ini). |
| **ApprovalStatus** | Enum: `PENDING \| APPROVED \| CONFIRMED \| REJECTED \| CANCELED \| RETURNED`. |
| **ReadWriteStatus** | Enum endpoint `/approval`: `NONE \| READ \| WRITE` — menandai apakah user yang login punya hak aksi atas sebuah record. |
| **Persetujuan** | Halaman di mana approver (Atasan/SDM/Direksi) melihat dan memutuskan pengajuan yang menunggu aksi mereka. |
| **Admin/HRD** | Role yang dapat mengakses & mengelola Kuota Cuti (gate `CUTI:WRITE`). Sebelumnya disebut "SDM" — diganti 2026-08-18. |
| **Kuota Tahun Sebelumnya** | Baris `CutiKuotaResponse` tahun − 1 dari tahun yang difilter, dikembalikan backend di `data.kuotaTahunSebelumnya` pada index `GET /cuti/kuota` — dipakai grid carry-over (CU-15). Bukan pengganti `sisaKuota` per baris. |

---

## CU-1 — Struktur Route & Layout

Route modul cuti berada di `(app)/cuti/` tanpa layout khusus — navigasi memakai
sidebar global di `AppShell` (modul "Cuti").

```
/cuti/kuota        — Kuota Cuti (Admin/HRD only)
/cuti/pengajuan    — Pengajuan Cuti (semua pegawai)
/cuti/persetujuan  — Persetujuan Cuti (semua bisa lihat, konten per-role)
```

> Sub-sidebar lateral pernah ada di `(app)/cuti/layout.tsx` (pola riwayat/pendukung)
> tapi dihapus karena duplikat dengan entri modul "Cuti" di sidebar global AppShell.

Item "Kuota Cuti" di sidebar **hanya tampil untuk role Admin/HRD** (gate `CUTI:WRITE`).
Route-nya tetap di-guard `forbidden()` di page — **unmount, bukan hide/disable**
(ADR-0001 RBAC pattern). Pengajuan & Persetujuan selalu tampil.

> **Reversal (2026-08-18):** keputusan awal "item Kuota Cuti selalu tampil + RBAC
> hanya di page" dibatalkan — user meminta menu disembunyikan untuk non-Admin/HRD.
> Gate memakai permission `CUTI:WRITE` (bukan hardcode nama role) sesuai FE-GUIDE §7.

---

## CU-2 — Kuota Cuti: RBAC & Akses

Halaman `/cuti/kuota` hanya dapat diakses oleh role **Admin/HRD** — gate
`hasPermission(permissions, PERMISSION.CUTI_WRITE)` → `forbidden()` di server
component level. Entri sidebar memakai gate yang sama (`CUTI:WRITE`), jadi
non-Admin/HRD tidak melihat menu "Kuota Cuti" (CU-1).

Semua operasi (CRUD + Import) hanya tersedia untuk Admin/HRD. Pegawai lain yang
mencoba akses URL langsung mendapat halaman `forbidden`.

---

## CU-3 — Kuota Cuti: Grid Carry-Over Dua Tahun (revisi 2026-08-18)

Sumber: `GET /cuti/kuota` (envelope `PageResult` — lihat CU-15) dengan filter default
**tahun berjalan**. **Satu baris per pegawai** — data tahun filter (Y) dari `page.content`,
data tahun sebelumnya (Y−1) dari `kuotaTahunSebelumnya` (match by `pegawaiId`).

**Kolom grid:**
| Kolom | Sumber |
|-------|--------|
| NIPAM | `pegawai.nipam` |
| Nama Pegawai | `pegawai.nama` |
| Status Pegawai | `pegawai.statusPegawai` → `labelStatus()` |
| Jabatan | `pegawai.jabatan` |
| Kuota {Y} | `kuota + kuotaTambahan` (baris tahun filter di `page.content`) |
| Terpakai {Y} | `kuotaTerpakai` |
| Sisa {Y} | `sisaKuota` |
| Kuota {Y−1} | `kuota + kuotaTambahan` (baris tahun filter − 1 di `kuotaTahunSebelumnya`) |
| Terpakai {Y−1} | `kuotaTerpakai` |
| Sisa {Y−1} | `sisaKuota` |
| Aksi | Edit · Hapus |

Header dinamis: `{Y}` = tahun filter (contoh "Kuota 2026"), `{Y−1}` = tahun filter − 1
("Kuota 2025"). Pegawai tanpa baris tahun sebelumnya → kolom Y−1 tampil "—".
Kolom lama yang **dihapus**: No, Tahun, Tambahan, Expired.

**Filter toolbar:**
- Select Tahun (default tahun berjalan, rentang 5 tahun)
- Input pencarian Nama/NIPAM (query param `nama` / `nipam`)

URL = sumber kebenaran: `?tahun=2026&nama=&page=&size=`

**Filter toolbar:**
- Select Tahun (default tahun berjalan, rentang 5 tahun)
- Input pencarian Nama/NIPAM (query param `nama` / `nipam`)

URL = sumber kebenaran: `?tahun=2026&nama=&page=&size=`

---

## CU-4 — Kuota Cuti: CRUD

**Tambah** (`POST /cuti/kuota`): Form sheet dengan field:
- Pegawai (FK picker dari `/pegawai/list`) — required
- Tahun — required (minimum 2000)
- Kuota (hari dasar) — optional
- Kuota Tambahan — optional
- Sisa Kuota — optional (backend dapat menghitung, tapi bisa di-override)
- Expired (date) — **required**

**Edit** (`PUT /cuti/kuota/{id}`): Form sheet sama dengan Tambah, field pre-filled.

**Hapus** (`DELETE /cuti/kuota/{id}`): `<ConfirmDeleteDialog>` — type `HAPUS`, handle 409 inline.

Semua mutation: `useMutation` + `invalidateQueries(["cuti-kuota"])`. Toast untuk hasil mutasi.
Jangan optimistic removal.

---

## CU-5 — Kuota Cuti: Import Batch

**Download Template:** `GET /cuti/kuota/template` → download file langsung (respons binary).
Tombol "Unduh Template" di toolbar.

**Upload:** `POST /cuti/kuota/import` (`multipart/form-data`):
- Field `file`: file Excel/CSV
- Field `tahun`: integer (required, ≥ 2000)

Flow: user pilih file + pilih tahun → submit → backend proses → respons `SavedResultString`
berisi summary (misal: "Berhasil import 50 baris, 2 baris gagal").
Summary ditampilkan di toast atau inline info panel setelah upload selesai.

UI: Dialog upload terpisah dari sheet CRUD — tombol "Import" di toolbar, membuka dialog modal
dengan input file + select tahun.

---

## CU-6 — Pengajuan Cuti: Scope & RBAC

Halaman `/cuti/pengajuan` dapat diakses oleh **semua pegawai yang login**.

Pegawai hanya melihat dan mengajukan cuti untuk **diri sendiri** (menggunakan `pegawaiId` dari
session — `getPegawaiSession()`). Tidak ada picker pegawai lain.

---

## CU-7 — Pengajuan Cuti: Tabel

Sumber: `GET /cuti/pengajuan/{pegawaiId}/pegawai` (path: `pegawaiId` dari session).

**Kolom:**
| Kolom | Sumber |
|-------|--------|
| No | offset paging |
| Jenis Cuti | `jenisCuti?.nama` + sub-jenis (label kecil di bawah) |
| Periode | `formatDate(tanggalMulai) – formatDate(tanggalSelesai)` |
| Jumlah Hari Kerja | `jumlahHariKerja` (tabular-nums) |
| Status | `approvalCutiStatus` → badge berlabel via `enum-labels.ts` |
| Aksi | Cancel (hanya jika status `PENDING`) |

Filter: Tahun saja (default tahun berjalan). URL-driven.
Strip info 3 kartu (Kuota/Diambil/Sisa) dari `GET /cuti/kuota?pegawaiId&tahun` — pola sudah
ada di `kepegawaian-riwayat-cuti.md` K-C5.

---

## CU-8 — Pengajuan Cuti: Form Tambah & Edit

Form ditampilkan sebagai **Sheet (drawer kanan)** — konsisten dengan pola CrudForm proyek.

**Field form:**
1. **Jenis Cuti** (combobox, required) — **hanya root**: item `parentId == null` dari
   `GET /cuti/jenis/list` (response `ListResultCutiJenisMiniResponse`). Sub-jenis tidak ikut.
2. **Sub-Jenis Cuti** (combobox, conditional — hanya tampil jika jenis terpilih punya anak):
   item `parentId === jenisCutiId`, **di-filter client-side** dari flat list yang sama (CU-16).
   Query berantai `?parentId=` tidak dipakai lagi.
3. **Tanggal Mulai** (date picker) — required
4. **Tanggal Selesai** (date picker) — required; harus ≥ Tanggal Mulai
5. **Jumlah Hari** (read-only, calculated: `tanggalSelesai - tanggalMulai + 1`)
6. **Jumlah Hari Kerja** (read-only, fetched: saat kedua tanggal terisi →
   `GET /cuti/pengajuan/{tanggalMulai}/{tanggalSelesai}/total-hari-kerja` → auto-fill)
7. **Alasan** (textarea) — required
8. **Informasi Pegawai** (read-only): Nama, NIPAM, Jabatan dari session — ditampilkan
   di atas form sebagai konteks, bukan input.

**`csrfToken`**: Di-mint oleh `proxy.ts` — dikirim otomatis lewat header / ada mekanisme yang
sudah ada di proyek. Implementer wajib cek bagaimana token ini dibuat di mutasi lain yang sudah
ada (misal: form-form di kepegawaian).

Edit (`PUT /cuti/pengajuan/{id}`): field sama, pre-filled. Hanya bisa edit jika status `PENDING`.

---

## CU-9 — Pengajuan Cuti: Cancel (Pembatalan)

Pegawai hanya bisa **cancel** pengajuan yang masih berstatus `PENDING`.
Endpoint: `DELETE /cuti/pengajuan/{id}` (`operationId: pembatalan`).

UI: Tombol "Batalkan" di kolom Aksi baris tabel — hanya render jika `approvalCutiStatus === "PENDING"`.
Konfirmasi dialog sebelum eksekusi (bukan `<ConfirmDeleteDialog>` standar — pakai dialog
sederhana dengan kalimat "Batalkan pengajuan cuti ini?" karena tidak ada input teks HAPUS).

---

## CU-10 — Persetujuan Cuti: Scope & Tab

Halaman `/cuti/persetujuan` dapat diakses oleh **semua pegawai yang login**.

Konten bersumber dari `GET /cuti/pengajuan/approval` yang wajib kirim:
- `picSaatIniId` = `pegawaiId` dari session
- `tahun` = tahun terpilih
- `approvalCutiStatus` = sesuai tab aktif

**Dua tab:**
- **"Menunggu"** — filter `approvalCutiStatus=PENDING`
- **"Riwayat Persetujuan"** — filter `approvalCutiStatus=APPROVED,CONFIRMED,REJECTED,...`
  (semua status non-PENDING; atau dipisah per-query jika perlu)

Jika pegawai biasa (tidak dalam rantai approval) → backend mengembalikan list kosong.
Tampilkan empty state standar tanpa error.

---

## CU-11 — Persetujuan Cuti: Tabel & Kolom

Sumber: `GET /cuti/pengajuan/approval` → `PageResultPageCutiApprovalChainResponse`
→ `CutiApprovalChainResponse { id, approvalLevel, readWriteStatus, refCuti }`.

`refCuti` bertipe `CutiPengajuanMiniResponse` — berisi data pengajuan lengkap.

**Kolom tabel (tab Menunggu):**
| Kolom | Sumber |
|-------|--------|
| No | offset paging |
| Nama Pegawai | `refCuti.nama` |
| Jenis Cuti | `refCuti.jenisCuti?.nama` + sub-jenis |
| Periode | `formatDate(refCuti.tanggalMulai) – formatDate(refCuti.tanggalSelesai)` |
| Jumlah Hari Kerja | `refCuti.jumlahHariKerja` |
| Status | `refCuti.approvalCutiStatus` → badge |
| Aksi | Tombol "Setujui" + "Tolak" (hanya jika `readWriteStatus === "WRITE"`) |

Tab "Riwayat": kolom sama, tanpa tombol Aksi.

---

## CU-12 — Persetujuan Cuti: Aksi Approve/Reject

**Approve:** `POST /cuti/approval` dengan body `CutiApprovalPostRequest`:
```
{ csrfToken, cutiId, approverId, approvalLevel, approvalStatus: "APPROVED", notes }
```

**Reject:** `POST /cuti/approval` dengan `approvalStatus: "REJECTED"`.

**UX flow:**
1. Klik "Setujui" atau "Tolak" di kolom Aksi
2. Konfirmasi dialog muncul: wajib isi `notes` (catatan/alasan) untuk **keduanya**
3. Submit → `useMutation` → toast sukses/gagal → `invalidateQueries`

Dialog konfirmasi: satu komponen `<ApprovalConfirmDialog>` yang menerima prop `action: "APPROVE" | "REJECT"`.

**`approverId`** = `pegawaiId` dari session.
**`approvalLevel`** = `refCuti.approvalLevel` atau dari `CutiApprovalChainResponse.approvalLevel`.

> ⚠️ Perlu spike kecil: verifikasi dari response `CutiApprovalChainResponse` field mana
> yang menjadi `approvalLevel` untuk request approve. Lihat `approvalLevel` di
> `CutiApprovalChainResponse` vs `CutiPengajuanMiniResponse`.

---

## CU-13 — State Handling (Semua Halaman)

Mengikuti pattern proyek (CONTEXT-MAP §table-states):
- `isPending` → skeleton rows
- `isPlaceholderData` → dim + spinner toolbar
- `isError` → panel inline "Coba lagi" (bukan toast)
- Empty table → empty state standar
- Mutation error → toast (satu-satunya toast)

---

## CU-15 — Kontrak Index Kuota: PageResult + `kuotaTahunSebelumnya` (2026-08-18)

Backend `rewrite/master-cqrs` mengubah kontrak index `GET /cuti/kuota`:

- Envelope `SingleResult` → **`PageResult`** (tanpa `message`/`errors`).
- `data.additional` → **`data.kuotaTahunSebelumnya`** (baris tahun − 1) — `additional` hilang total.
- Tidak ada data → **HTTP 200 + page kosong** (bukan 404).

Keputusan FE (hasil grill 2026-08-18):
1. `kuotaTahunSebelumnya` dipakai **grid carry-over** di `/cuti/kuota` (CU-3 revisi).
2. **K-C5** (strip 3 kartu di `pengajuan` & `riwayat/cuti`): baca `page.content` saja
   (baris tahun terpilih, filter `pegawaiId`+`tahun` → ≤1 baris) — pencarian `additional`
   dan handling `isNotFound` dihapus. Strip **mengabaikan** `kuotaTahunSebelumnya`.
3. Detail `/{id}` & `/{pegawaiId}/{tahun}/sisa` **tetap** `SingleResult` + 404 — tidak berubah.
4. Tipe di-sync via `bun run spec:sync` (spec live backend) → `src/types/cuti/kuota.ts`
   (generated — jangan diedit manual). `PageResultCutiKuotaPegawaiResponse = PageEnvelope<unknown>`
   tidak merepresentasikan shape (`data` = `{ page, kuotaTahunSebelumnya }`) → pakai cast
   inline `as { data: CutiKuotaPegawaiResponse }` seperti pola K-C5.

> Keputusan FE atas kontrak ini tercatat di **ADR-0040 FE** (`docs/adr/0040-grid-kuota-carry-over-dua-tahun.md`).

---

## CU-16 — List Jenis Cuti: Response Mini + `parentId` + Rule Combo (2026-08-18)

Backend `rewrite/master-cqrs` mengubah `GET /cuti/jenis/list`:

- Response **`ListResultCutiJenisResponse` → `ListResultCutiJenisMiniResponse`** — item
  `CutiJenisResponse` (objek penuh + `parent` nested) → **`CutiJenisMiniResponse`**
  (`{id, nama, parentId}`) langsung. `parentId` diambil dari kolom `parent_id` — **riil**,
  `null` hanya jika jenis tsb. **root**.
- Mini nested di endpoint lain (`/cuti/jenis` index/detail → field `parent`; pengajuan →
  `jenisCuti`/`subJenisCuti`) **tidak** mendapat `parentId` riil (parent tidak di-select
  query) — lihat glossary **ParentId (Jenis Cuti)**. **Jangan** pakai `parentId === null`
  sebagai penanda "data rusak" — untuk itu pakai `parent == null` / `subJenisCuti == null`.
- Envelope tetap `ListResult` (`{data: [...]}`) — hanya item type yang berubah.

Keputusan FE (hasil grill 2026-08-18):
1. **Rule combo (form pengajuan):** combo **Jenis Cuti** menampilkan item `parentId == null`
   (root saja — sub-jenis TIDAK ikut); combo **Sub-Jenis Cuti** menampilkan item
   `parentId === jenisCutiId` (turunan langsung dari jenis terpilih). Filter **client-side**
   dari SATU fetch flat `/cuti/jenis/list` — query berantai `?parentId=` **dihapus** (CU-8
   tetap: sub-jenis kosong → field disembunyikan).
2. Cast response memakai tipe generated baru `ListResultCutiJenisMiniResponse`.
3. Tanpa ADR — perubahan aditif, didokumentasikan di FE-CONTRACT
   (`docs/frontend/FE-CONTRACT-cuti-jenis-mini-parentid.md`).

---

## CU-14 — Fetch Pattern

Semua fetch cuti menggunakan `fetch("/api/proxy/cuti/…")` langsung — **bukan** `src/lib/api/client.ts`
(BASE master). Pola ini sudah ada di page-page riwayat.

`queryKey` selalu menyertakan semua params yang mempengaruhi hasil:
- Kuota: `["cuti-kuota", tahun, nama, nipam, page, size]`
- Pengajuan: `["cuti-pengajuan", pegawaiId, tahun, page, size]`
- Persetujuan: `["cuti-persetujuan", pegawaiId, tahun, tab, page, size]`

`staleTime: 30_000`, `gcTime: 300_000` (5 menit). Bukan Infinity.

---

## Endpoint Ringkasan

| Operasi | Endpoint | Body/Params |
|---------|----------|-------------|
| List kuota | `GET /cuti/kuota` | `?tahun&nama&nipam&page&size` → `PageResult` (`page` + `kuotaTahunSebelumnya`) |
| Detail kuota | `GET /cuti/kuota/{id}` | — |
| Tambah kuota | `POST /cuti/kuota` | `CutiKuotaPostRequest` |
| Edit kuota | `PUT /cuti/kuota/{id}` | `CutiKuotaPutRequest` |
| Hapus kuota | `DELETE /cuti/kuota/{id}` | — |
| Download template | `GET /cuti/kuota/template` | — |
| Import batch | `POST /cuti/kuota/import` | `multipart/form-data { tahun, file }` |
| List pengajuan (self) | `GET /cuti/pengajuan/{pegawaiId}/pegawai` | `?tahun&page&size` |
| Detail pengajuan | `GET /cuti/pengajuan/{id}` | — |
| Tambah pengajuan | `POST /cuti/pengajuan` | `CutiPengajuanPostRequest` |
| Edit pengajuan | `PUT /cuti/pengajuan/{id}` | `CutiPengajuanPutRequest` |
| Batalkan pengajuan | `DELETE /cuti/pengajuan/{id}` | — |
| Total hari kerja | `GET /cuti/pengajuan/{tglMulai}/{tglSelesai}/total-hari-kerja` | — |
| List jenis cuti | `GET /cuti/jenis/list` | `?parentId&nama` → `ListResultCutiJenisMiniResponse` (`{id, nama, parentId}` riil; `null` = root) |
| Kuota strip (self) | `GET /cuti/kuota?pegawaiId&tahun` | — |
| List approval | `GET /cuti/pengajuan/approval` | `?tahun&picSaatIniId&approvalCutiStatus&page&size` |
| Aksi approval | `POST /cuti/approval` | `CutiApprovalPostRequest` |

---

## Invarian

- **Unauthorized = unmount** (`null`/`forbidden()`), bukan disabled/CSS-hide
- **Toast hanya untuk mutasi** — gagal fetch pakai inline panel
- **Tipe generated** (`src/types/cuti/**`) tidak diedit manual
- **`src/components/ui/*`** tidak disentuh
- **`gcTime: Infinity` / `staleTime: Infinity` dilarang**
- **Warna via design token** — bukan hex/`oklch()` inline
- **Jangan pakai `src/lib/api/client.ts`** — fetch langsung ke `/api/proxy/cuti/…`
