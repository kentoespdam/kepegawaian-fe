# BE Requirement — Data Pendukung · Pendidikan: tambah `disetujui` di response + normalisasi `isLatest`

**Untuk:** Tim Backend (Spring Boot)
**Dari:** Tim Frontend (`kepegawaian-fe`)
**Tanggal:** 2026-08-12
**Status:** ✅ **SELESAI (2026-08-12)** — perubahan #1 dan #2 sudah diterapkan di BE (field
`disetujui`/`tanggalPengajuan`/`tanggalDisetujui`/`disetujuiOleh` ada di response nyata; `isLatest`
ternormalisasi satu-true per biodataId — diverifikasi via cURL ke `192.168.1.211:8080`). Sisi FE
(fnfh.8): spec di-update, types di-regenerate (`PendidikanQuery` di `_shared.ts`), badge
Disetujui/Belum + Terakhir di tabel pendidikan live.

---

## Ringkasan

FE sedang membangun konsol **Data Pendukung** (`/kepegawaian/data/{pegawaiId}/pendukung/*`) — mirror
konsol Riwayat (ADR-0013/0014), sumber data resource `/profil/*`. Kategori pertama yang dibangun:
**Data Pendidikan** (`/profil/pendidikan`), CRUD penuh + kartu Lampiran, konsol admin/HR.

Hasil grill user (2026-08-12):

1. **Kolom status di tabel**: HR ingin melihat **badge "Disetujui"** dan **badge "Terakhir"** per
   baris pendidikan.
2. **`disetujui` = auto-`true` saat admin menulis** — konsol ini hanya admin/HR; tidak ada alur
   approval (keputusan user: *"karena ini menu admin, tidak perlu ada approval / disetujui = True"*).
3. **`isLatest` = satu-true per pegawai** — flag "pendidikan terakhir" harus dijamin hanya satu
   record `true` per `biodataId`.

| # | Kebutuhan | Prioritas | Blocking? |
|---|-----------|-----------|-----------|
| 1 | Tambah field `disetujui` (+ `tanggalDisetujui`, `disetujuiOleh`) di response `PendidikanQuery`; auto-set `true` saat POST/PUT | **P1** | ✅ Ya (badge) |
| 2 | Normalisasi `isLatest` (satu-`true` per `biodataId`, transaksional) + klarifikasi sinkron `biodata.pendidikanTerakhirId` | **P1** | ⚠️ Sebagian (badge "Terakhir" bisa dari data existing; normalisasi mencegah data rusak saat HR menulis) |

---

## 1. Response `PendidikanQuery` — tambah field `disetujui`

### Situasi saat ini

`GET /profil/pendidikan?biodataId=...` (list & detail) mengembalikan `PendidikanQuery`:

```jsonc
{
  "status": 200,
  "statusText": "200 OK",
  "message": "OK",
  "data": {
    "content": [{
      "id": 501,
      "biodataId": "3273012345678901",
      "biodataNik": "3273012345678901",
      "biodataNama": "ABDUL AZIZ MIFTAHUDDIN, S.Kom.",
      "jenjangId": 4,
      "jenjangPendidikan": { "id": 4, "nama": "S1", "shortName": "S1", "seq": 4, "isStatistik": true },
      "gelarDepan": "Dr.",
      "gelarBelakang": "S.T., M.T.",
      "jurusan": "Teknik Informatika",
      "institusi": "Universitas Gadjah Mada",
      "kota": "Yogyakarta",
      "tahunMasuk": 2010,
      "isLulus": true,
      "tahunLulus": 2015,
      "gpa": 3.72,
      "isLatest": true,
      "changedStatus": "0"
    }]
  }
}
```

**Tidak ada field `disetujui`** — padahal `KeahlianQuery` (entity saudara di modul yang sama,
`/profil/keahlian`) sudah punya `disetujui`, `tanggalPengajuan`, `tanggalDisetujui`, `disetujuiOleh`.
FE tidak bisa menampilkan badge status tanpa field ini.

### Alternatif yang dipertimbangkan (ditolak)

| Alternatif | Alasan ditolak |
|------------|----------------|
| FE menebak status (selalu tampil "Disetujui") | Berbohong ke HR bila ada data lama/import yang `disetujui=false` |
| Fetch `/profil/keahlian`-style endpoint lain | Tidak ada — data pendidikan hanya di `/profil/pendidikan` |
| Tambah field `disetujui` ke request POST/PUT | Tidak diminta — konsol admin auto-approve; request tidak boleh membawa status (FE tidak mengatur approval) |

### Perubahan yang diminta

**Tambah field berikut ke `PendidikanQuery` (response list & detail) — persis pola `KeahlianQuery`:**

| Field | Tipe | Nullable | Keterangan |
|-------|------|----------|------------|
| `disetujui` | `boolean` | ✅ | Status persetujuan record. **Auto-set `true`** saat create/update via POST/PUT dari sisi admin |
| `tanggalPengajuan` | `string` (date-time) | ✅ | Diisi BE saat record dibuat (untuk data lama boleh null) |
| `tanggalDisetujui` | `string` (date-time) | ✅ | Diisi BE saat `disetujui` menjadi `true` |
| `disetujuiOleh` | `string` | ✅ | Identifier user yang menyetujui (dari session/`pegawaiId`) |

**Aturan auto-approve (kunci):**

- `POST /profil/pendidikan` dan `PUT /profil/pendidikan/{id}` → BE **menetapkan `disetujui = true`**
  sendiri. Request body **tidak** memuat field status ini; FE tidak boleh mengirimnya.
- Data yang dibuat/import di luar konsol admin (mis. self-service pegawai) boleh `disetujui=false`
  — FE hanya membaca nilai apa adanya untuk badge.

### Dampak

**FE:**
- Regenerate tipe via `node docs/api/extract-types.js` → `disetujui` dkk. otomatis masuk ke
  `PendidikanQuery` (di `src/types/_shared.ts`)
- Tabel render badge "Disetujui" / "Belum" dari field ini; form **tidak** menyentuhnya
- Kode lain yang membaca `PendidikanQuery` tidak rusak (penambahan field = additive)

**BE:**
- Tambah 4 field di DTO `PendidikanQuery` + mapper
- Auto-set `disetujui=true` di service layer pada create/update (tanpa menunggu field dari request)
- Terdaftar di OpenAPI (`/v3/api-docs`)

---

## 2. Normalisasi `isLatest` (satu-`true` per `biodataId`)

### Situasi saat ini

`PendidikanQuery.isLatest: boolean` sudah ada. **Perilaku BE saat dua record `isLatest=true`**
untuk `biodataId` yang sama **tidak terdokumentasi** — tidak ada jaminan konsistensi.

### Perubahan yang diminta

1. **Normalisasi transaksional:** saat sebuah record di-set `isLatest=true` (via `POST` atau `PUT`),
   BE dalam transaksi yang sama men-set `isLatest=false` untuk **semua record lain** dengan
   `biodataId` yang sama. Hasil akhir selalu ≤ 1 record `true` per `biodataId`.
2. **Kasus delete:** saat record `isLatest=true` dihapus, tidak ada record pengganti otomatis
   (FE/HR yang menentukan berikutnya) — cukup pastikan tidak ada data yang tersisa `true` selain itu.
3. **Klarifikasi sinkron `biodata.pendidikanTerakhirId` (mohon jawaban BE):** `Biodata` punya
   `pendidikanTerakhirId: number` yang menunjuk **jenjang** (`JenjangPendidikanResponse`), bukan
   record pendidikan. Apakah saat `isLatest=true` di-set, BE juga memperbarui
   `biodata.pendidikanTerakhirId` ke `jenjangId` record itu? **Rekomendasi FE: ya, sinkronkan** —
   "pendidikan terakhir" di biodata dipakai laporan/statistik (`isStatistik`). Kalau tidak,
   dua sumber kebenaran bisa berbeda. Keputusan final di tangan BE — FE menyesuaikan diri.

### Alternatif yang dipertimbangkan (ditolak)

| Alternatif | Alasan ditolak |
|------------|----------------|
| FE mengelola manual (HR unset yang lama sendiri) | Rawan dua record `true`; konsol CRUD jadi tidak aman. Keputusan user: **BE yang menormalisasi** |
| Validasi di FE saja | Tidak melindungi tulis dari client lain / API langsung |

---

## Definition of Done (BE)

- [ ] `PendidikanQuery` response punya `disetujui`, `tanggalPengajuan`, `tanggalDisetujui`, `disetujuiOleh`
- [ ] POST/PUT pendidikan auto-set `disetujui=true` (request tidak memuat field status)
- [ ] Normalisasi `isLatest`: ≤ 1 record `true` per `biodataId`, transaksional
- [ ] Jawaban tertulis soal sinkron `biodata.pendidikanTerakhirId` (sinkron atau tidak)
- [ ] Terdaftar di OpenAPI (`/v3/api-docs`)
- [ ] FE regenerate tipe: `node docs/api/extract-types.js` sukses
- [ ] `bun run build` di FE — zero error

## Kontak / referensi FE

| Hal | Lokasi |
|-----|--------|
| Delta kategori (keputusan desain) | `docs/context/kepegawaian-pendukung-pendidikan.md` |
| Shared infra konsol | `docs/context/kepegawaian-pendukung.md` (P1–P8) |
| ADR konsol | `docs/adr/0014-data-pendukung-konsol-profil.md` |
| Tipe pendidikan saat ini | `src/types/_shared.ts` → `PendidikanQuery`; `src/types/profil/pendidikan.ts` |
| Pola field approval yang sudah ada | `src/types/_shared.ts` → `KeahlianQuery` (`disetujui`, `tanggalPengajuan`, `tanggalDisetujui`, `disetujuiOleh`) |
| BE requirement precedent | `docs/BE-REQUIREMENT-riwayat-kontrak-status-pegawai.md` |
