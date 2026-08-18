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
| **Pengajuan Cuti** | Permintaan formal pegawai untuk mengambil cuti dalam rentang tanggal tertentu. Dibuat oleh pegawai untuk diri sendiri. |
| **Klaim Cuti** | Jenis pengajuan khusus — pegawai mengklaim hari-hari spesifik dari sebuah pengajuan yang sudah ada (`KLAIM_CUTI`). Beda dari `PENGAJUAN_CUTI`. |
| **Approval Chain** | Rantai persetujuan multi-level: Atasan → SDM → Direksi. Dikelola backend (`picSaatIni` = jabatan approver saat ini). |
| **ApprovalStatus** | Enum: `PENDING \| APPROVED \| CONFIRMED \| REJECTED \| CANCELED \| RETURNED`. |
| **ReadWriteStatus** | Enum endpoint `/approval`: `NONE \| READ \| WRITE` — menandai apakah user yang login punya hak aksi atas sebuah record. |
| **Persetujuan** | Halaman di mana approver (Atasan/SDM/Direksi) melihat dan memutuskan pengajuan yang menunggu aksi mereka. |
| **SDM** | Role Sumber Daya Manusia — satu-satunya role yang dapat mengakses Kuota Cuti. |

---

## CU-1 — Struktur Route & Layout

Route modul cuti berada di `(app)/cuti/` dengan sidebar lateral (sub-menu).

```
/cuti/kuota        — Kuota Cuti (SDM only)
/cuti/pengajuan    — Pengajuan Cuti (semua pegawai)
/cuti/persetujuan  — Persetujuan Cuti (semua bisa lihat, konten per-role)
```

Layout `(app)/cuti/layout.tsx` berisi sub-sidebar lateral (pola sama dengan modul lain).
Menu "Kuota Cuti" tetap **tampil** di sidebar, namun route-nya di-guard oleh RBAC
(`forbidden()` jika bukan SDM). **Unmount, bukan hide/disable** (ADR-0001 RBAC pattern).

> **Alternatif yang di-drop:** Menyembunyikan item "Kuota Cuti" dari sidebar jika bukan SDM.
> Ditolak karena pattern proyek adalah unmount content (`null`/`forbidden()`), bukan hide menu.
> Sidebar tetap konsisten untuk semua role.

---

## CU-2 — Kuota Cuti: RBAC & Akses

Halaman `/cuti/kuota` hanya dapat diakses oleh role **SDM**.
Gate: `can(roles, "manage", "kuota-cuti")` → `forbidden()` di server component level.

Semua operasi (CRUD + Import) hanya tersedia untuk SDM. Pegawai lain yang mencoba akses
URL langsung mendapat halaman `forbidden`.

---

## CU-3 — Kuota Cuti: Tabel + Filter

Sumber: `GET /cuti/kuota` dengan filter default **tahun berjalan**.

**Kolom tabel:**
| Kolom | Sumber |
|-------|--------|
| No | offset paging pattern |
| Nama Pegawai | `pegawai.nama` |
| NIPAM | `pegawai.nipam` |
| Tahun | `tahun` |
| Kuota | `kuota` |
| Tambahan | `kuotaTambahan` |
| Terpakai | `kuotaTerpakai` |
| Sisa | `sisaKuota` |
| Expired | `expired` (format tanggal) |
| Aksi | Edit · Hapus |

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
1. **Jenis Cuti** (combobox dari `GET /cuti/jenis/list` tanpa `parentId`) — required
2. **Sub-Jenis Cuti** (combobox dari `GET /cuti/jenis/list?parentId={jenisCutiId}`)
   — conditional: hanya tampil jika Jenis Cuti yang dipilih punya sub-jenis.
   Load saat `jenisCutiId` berubah.
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
| List kuota | `GET /cuti/kuota` | `?tahun&nama&nipam&page&size` |
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
| List jenis cuti | `GET /cuti/jenis/list` | `?parentId` |
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
