# Konteks: Data Pendukung — Keluarga

> Delta kategori. Baca [kepegawaian-pendukung.md](kepegawaian-pendukung.md) (shared infra, P1–P8) dulu.
> **Muat file ini hanya bila menyentuh `pendukung/keluarga/`.**
> Claim order: [CLAIM-ORDER-pendukung.md](../CLAIM-ORDER-pendukung.md) (Fase 2)

**Keputusan K1 — Tabel FLAT (13 kolom data) — kategori flat ke-2 di konsol ini (setelah Pelatihan).**

`No | Nama | Hubungan | Jenis Kelamin | Agama | Tgl Lahir | Tempat Lahir | NIK | Tanggungan | Pendidikan | Status Pendidikan | Status Kawin | Notes | Aksi`

- **Nama** = kolom identitas (`nama`, weight 600).
- **Hubungan** = label enum via formatter `hubunganKeluarga()` (panen dari
  `section-right-panel.tsx` — Suami/Istri/Ayah/Ibu/Anak/Saudara).
- **Jenis Kelamin / Agama** = label enum (`labelJk()`, `labelAgama()` — sudah ada di `enum-labels.ts`).
- **NIK** = `nik` anggota keluarga (tabular-nums; opsional → "—").
- **Tanggungan / Status Kawin** = badge berteks "Ya"/"—" (bool).
- **Pendidikan** = `jenjangPendidikan.nama`; **Status Pendidikan** = label
  Belum Sekolah/Sekolah/Selesai.
- **Notes** = truncate + tooltip `title`.
- ⚠️ Konsekuensi diterima: tabel lebar + scroll horizontal dalam region tabel.
- **Aksi** = ikon Edit + Hapus, paling kanan, dibungkus `<Can entity="pegawai">`.

**Keputusan K2 — Filter: Hubungan Keluarga (select enum → angka) — DENGAN SPIKE WAJIB.**

BE hanya menerima `hubunganKeluarga?: number` dan `jenisKelamin?: number` (int32) padahal data
berupa enum string — **mapping angka↔enum TIDAK terdokumentasi**. Keputusan user: render filter
**Hubungan Keluarga** (select enum) yang mengirim nilai angka.

- ⚠️ **Spike WAJIB sebelum feature dianggap jadi** (claim khusus, pola spike lampiran): filter
  dengan kandidat angka pada request nyata (`?hubunganKeluarga=0..5`), bandingkan hasil dengan
  isi response; temukan mapping yang benar; **catat mapping terverifikasi di file ini**.
- ✅ **Spike SELESAI (`fnfh.5`, 2026-08-12) — mapping TERVERIFIKASI via request nyata**
  (`GET /profil/keluarga?biodataId=<nik>&hubunganKeluarga=<n>`, backend `192.168.1.211:8080`):

  | int32 | enum | konfirmasi |
  |---|---|---|
  | `0` | `SUAMI` | pegawai 268 (nik `3302111906880001`): filter 0 → 1 baris SUAMI ✓ |
  | `1` | `ISTRI` | pegawai 268: filter 1 → 1 baris ISTRI ✓ |
  | `2` | `AYAH` | pegawai 199 (nik `3302031808750003`): filter 2 → AYAH ✓ |
  | `3` | `IBU` | pegawai 199: filter 3 → IBU ✓ |
  | `4` | `ANAK` | pegawai 268: filter 4 → 2 baris ANAK ✓ |
  | `5` | `SAUDARA` | pegawai 199: filter 5 → SAUDARA ✓ |

  = **urutan 0-indexed enum di OpenAPI** (`SUAMI, ISTRI, AYAH, IBU, ANAK, SAUDARA`).
  Filter FE kirim `hubunganKeluarga` sebagai angka hasil mapping ini (kandidat 0..5 selain di atas
  mengembalikan 0 baris — diuji `6`, `7` → kosong, aman).
- **Fallback terkunci:** bila spike gagal menentukan mapping → **filter dihapus** (toolbar hanya
  "+ Tambah"), anomali dicatat, dan kalau HR butuh filter → BE-requirement kecil (minta BE terima
  string enum atau dokumentasikan angka).
- `jenisKelamin` (angka) **tidak** dirender — YAGNI.

**Keputusan K3 — Form Sheet (12 field).**

| Label | Request field | Required | Kontrol |
|---|---|---|---|
| Nama | `nama` | ✅ (min 1) | input teks |
| NIK Anggota | `nik` | — | input teks (tabular-nums) |
| Jenis Kelamin | `jenisKelamin` | ✅ | select Laki-laki/Perempuan (enum `LAKI_LAKI\|PEREMPUAN`) |
| Agama | `agama` | ✅ | select (enum `Agama`, label via `labelAgama()`) |
| Hubungan Keluarga | `hubunganKeluarga` | ✅ | select Suami/Istri/Ayah/Ibu/Anak/Saudara |
| Tempat Lahir | `tempatLahir` | ✅ (min 1) | input teks |
| Tanggal Lahir | `tanggalLahir` | ✅ (date) | input date |
| Tanggungan? | `tanggungan` | ✅ (bool) | checkbox |
| Pendidikan | `pendidikanId` | — | `FKCombobox` `/master/jenjang-pendidikan/list` |
| Status Pendidikan | `statusPendidikan` | — | select Belum Sekolah/Sekolah/Selesai |
| Sudah Kawin? | `statusKawin` | ✅ (bool) | checkbox |
| Catatan | `notes` | — | textarea |

- **Tidak ada cross-field validation** — `statusPendidikan` boleh ada tanpa `pendidikanId` dan
  sebaliknya (keputusan HR).
- `biodataId` dari `nik` header session (P6) — bukan field form.
- Footer sticky Batal/Simpan; error inline; setelah 200 `invalidateQueries`.

**Pemetaan sel tabel → `ProfilKeluargaQuery`:**

| Kolom | Sumber |
|---|---|
| No | index baris + offset paging |
| Nama | `nama` (primary) |
| Hubungan | `hubunganKeluarga` → label |
| Jenis Kelamin | `jenisKelamin` → label |
| Agama | `agama` → label |
| Tgl Lahir / Tempat Lahir | `tanggalLahir` / `tempatLahir` |
| NIK | `nik` |
| Tanggungan | `tanggungan` → badge |
| Pendidikan | `jenjangPendidikan.nama` |
| Status Pendidikan | `statusPendidikan` → label |
| Status Kawin | `statusKawin` → badge |
| Notes | `notes` (truncate + title) |
| Aksi | Edit + Hapus |

**Endpoint list:**

| Operasi | Endpoint |
|---|---|
| List | `GET /profil/keluarga?biodataId=<nik>` — filter: `hubunganKeluarga` (angka, spike K2) |
| Detail | `GET /profil/keluarga/{id}` |
| Create | `POST /profil/keluarga` |
| Update | `PUT /profil/keluarga/{id}` |
| Delete | `DELETE /profil/keluarga/{id}` |
| Lampiran | `/profil/keluarga/lampiran/{id}` · `/{id}/file`, `POST /profil/keluarga/lampiran` (ref `PROFIL_KELUARGA` — lihat P5 + spike) |

**Types:** `src/types/profil/keluarga.ts` — `ProfilKeluargaQuery`,
`ProfilKeluargaPostRequest`/`PutRequest`, `HubunganKeluarga`, `StatusPendidikanKeluarga`,
`KeluargaSearchParams`.
