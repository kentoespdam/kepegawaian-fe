# Claim Order — profil/approval: diff preview mengikuti field form per entity

**Issue:** `kepegawaian-fe-nje4`
**Tanggal grill:** 2026-08-14
**Estimasi:** 1 wave · ~45 menit

---

## Konteks

Dialog approval di `/profil/approval` menampilkan diff perubahan profil pegawai.
Saat ini diff bersifat **generic** (flat-dump semua key JSON via `flattenForDiff`).
Target: diff **field-by-field sesuai form POST/PUT** masing-masing entity, hanya tampilkan field
yang relevan (whitelist), dengan label yang sudah di-humanize dalam Bahasa Indonesia.

**File tunggal yang diubah:**
`src/app/(app)/profil/approval/approval-client.tsx`

**Blast-radius:** Rendah — file lokal, tidak di-import modul lain.

---

## Referensi

| Apa | Di mana |
|-----|---------|
| File target | `src/app/(app)/profil/approval/approval-client.tsx` |
| Type definitions | `src/types/profil/profil-update.ts` |
| Shared request types | `src/types/_shared.ts` (baris 372–562) |
| Query schemas (API) | `docs/api/profil/api.json` — PendidikanQuery, PelatihanQuery, KeahlianQuery, KartuIdentitasQuery, ProfilKeluargaQuery, BiodataQuery, PengalamanKerjaQuery |
| Form label references | `*-form-sheet.tsx` di `kepegawaian/data/[pegawaiId]/pendukung/*/` |
| Coding rules | `docs/design/coding-rules.md` |
| Konteks domain | `docs/context/kepegawaian-pendukung.md` |

---

## Keputusan Grill

| # | Pertanyaan | Keputusan |
|---|-----------|-----------|
| 1 | Komponen target | `approval-client.tsx` — dialog diff |
| 2 | Mode preview | Diff field-by-field, urutan & label ikut form POST/PUT |
| 3 | Filter field | Whitelist — hanya field yang ada di form |
| 4 | LAMPIRAN | `fileName` + `notes` saja |
| 5 | FK resolution | Konvensi: key `*Id` → coba `*Nama` dulu, fallback raw value; jika value adalah object → ambil `.nama` |
| 6 | INSERT/DELETE | Selalu dua kolom; sisi kosong tampil `—` |

---

## Claim Order

### Wave 1 — Implementasi (satu file)

- [ ] **Baca file target** — pahami struktur `approval-client.tsx` saat ini
- [ ] **Jalankan impact analysis** — `npx gitnexus impact flattenForDiff -d upstream -r kepegawaian-fe`
      (ekspektasi: blast-radius rendah, lokal)
- [ ] **Tambah `FIELD_MAP`** — const inline di `approval-client.tsx`, setelah imports

  ```ts
  type FieldDef = { key: string; label: string }
  const FIELD_MAP: Record<string, FieldDef[]> = {
    BIODATA: [
      { key: 'nik', label: 'NIK' },
      { key: 'nama', label: 'Nama' },
      { key: 'jenisKelamin', label: 'Jenis Kelamin' },
      { key: 'tempatLahir', label: 'Tempat Lahir' },
      { key: 'tanggalLahir', label: 'Tanggal Lahir' },
      { key: 'alamat', label: 'Alamat' },
      { key: 'telp', label: 'Telp' },
      { key: 'agama', label: 'Agama' },
      { key: 'ibuKandung', label: 'Ibu Kandung' },
      { key: 'pendidikanTerakhirId', label: 'Pend. Terakhir' },
      { key: 'golonganDarah', label: 'Gol. Darah' },
      { key: 'statusKawin', label: 'Status Kawin' },
      { key: 'notes', label: 'Catatan' },
    ],
    PENDIDIKAN: [
      { key: 'jenjangPendidikan', label: 'Jenjang' },
      { key: 'institusi', label: 'Institusi' },
      { key: 'jurusan', label: 'Jurusan' },
      { key: 'kota', label: 'Kota' },
      { key: 'gelarDepan', label: 'Gelar Depan' },
      { key: 'gelarBelakang', label: 'Gelar Belakang' },
      { key: 'tahunMasuk', label: 'Tahun Masuk' },
      { key: 'gpa', label: 'IPK' },
      { key: 'isLulus', label: 'Lulus' },
      { key: 'tahunLulus', label: 'Tahun Lulus' },
      { key: 'isLatest', label: 'Pendidikan Terakhir' },
    ],
    PELATIHAN: [
      { key: 'jenisPelatihanId', label: 'Jenis Pelatihan' },
      { key: 'nama', label: 'Nama' },
      { key: 'lembaga', label: 'Lembaga' },
      { key: 'tanggalMulai', label: 'Tgl Mulai' },
      { key: 'tanggalSelesai', label: 'Tgl Selesai' },
      { key: 'lulus', label: 'Lulus' },
      { key: 'nilai', label: 'Nilai' },
      { key: 'ikatanDinas', label: 'Ikatan Dinas' },
      { key: 'tanggalAkhirIkatan', label: 'Tgl Akhir Ikatan' },
      { key: 'notes', label: 'Catatan' },
    ],
    KELUARGA: [
      { key: 'nama', label: 'Nama' },
      { key: 'nik', label: 'NIK' },
      { key: 'jenisKelamin', label: 'Jenis Kelamin' },
      { key: 'agama', label: 'Agama' },
      { key: 'hubunganKeluarga', label: 'Hubungan' },
      { key: 'tempatLahir', label: 'Tempat Lahir' },
      { key: 'tanggalLahir', label: 'Tgl Lahir' },
      { key: 'tanggungan', label: 'Tanggungan' },
      { key: 'statusKawin', label: 'Status Kawin' },
      { key: 'pendidikanId', label: 'Pendidikan' },
      { key: 'statusPendidikan', label: 'Status Pendidikan' },
      { key: 'notes', label: 'Catatan' },
    ],
    KEAHLIAN: [
      { key: 'jenisKeahlian', label: 'Jenis Keahlian' },
      { key: 'kualifikasi', label: 'Tingkat Kemampuan' },
      { key: 'sertifikasi', label: 'Sertifikasi' },
      { key: 'institusi', label: 'Institusi' },
      { key: 'tahun', label: 'Tahun' },
      { key: 'masaBerlaku', label: 'Masa Berlaku' },
    ],
    KARTU_IDENTITAS: [
      { key: 'jenisKartuId', label: 'Jenis Kartu' },
      { key: 'nomorKartu', label: 'Nomor Kartu' },
      { key: 'tanggalTerima', label: 'Tgl Terima' },
      { key: 'tanggalExpired', label: 'Masa Berlaku' },
      { key: 'notes', label: 'Catatan' },
    ],
    PENGALAMAN_KERJA: [
      { key: 'namaPerusahaan', label: 'Nama Perusahaan' },
      { key: 'typePerusahaan', label: 'Jenis' },
      { key: 'jabatan', label: 'Jabatan' },
      { key: 'lokasi', label: 'Lokasi' },
      { key: 'tahunMasuk', label: 'Tahun Masuk' },
      { key: 'tahunKeluar', label: 'Tahun Keluar' },
      { key: 'notes', label: 'Catatan' },
    ],
    LAMPIRAN: [
      { key: 'fileName', label: 'File' },
      { key: 'notes', label: 'Catatan' },
    ],
  }
  ```

- [ ] **Tambah `resolveValue` helper** — gantikan `flattenForDiff`:

  ```ts
  function resolveValue(obj: Record<string, unknown>, key: string): unknown {
    // FK convention: key berakhiran 'Id' → coba key.replace(/Id$/, 'Nama')
    if (key.endsWith('Id')) {
      const nameKey = key.replace(/Id$/, 'Nama')
      const nameVal = obj[nameKey]
      if (nameVal !== null && nameVal !== undefined) return nameVal
    }
    // Nilai berupa object (mis. jenjangPendidikan = { id, nama }) → ambil .nama
    const val = obj[key]
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      const nested =
        (val as Record<string, unknown>).nama ??
        (val as Record<string, unknown>).name
      if (nested !== undefined) return nested
    }
    return val
  }
  ```

- [ ] **Ganti logika `diffRows`** — hapus `flattenForDiff` call, ganti dengan:

  ```ts
  const fields = FIELD_MAP[detail.profileUpdate?.tableName ?? ''] ?? []
  const prev = (detail.previousRevision ?? {}) as Record<string, unknown>
  const latest = (detail.latestRevision ?? {}) as Record<string, unknown>

  const diffRows = fields.map(({ key, label }) => ({
    label,
    before: resolveValue(prev, key),
    after: resolveValue(latest, key),
  }))
  ```

- [ ] **Update diff table render** — ganti `row.key` → `row.label`, dan perbaiki null display:

  ```tsx
  <td className="px-3 py-1.5 font-mono text-xs">{row.label}</td>
  <td className="px-3 py-1.5">
    {row.before == null || row.before === '' ? '—' : String(row.before)}
  </td>
  <td className="px-3 py-1.5 font-medium">
    {row.after == null || row.after === '' ? '—' : String(row.after)}
  </td>
  ```

  > `== null` (double-equal) menangkap baik `null` maupun `undefined`.

- [ ] **Hapus `flattenForDiff`** — fungsi tidak dipakai lagi, hapus seluruh definisinya

- [ ] **Quality gates:**
  - `bunx biome check` — zero lint errors
  - `bun run build` — clean build

- [ ] **Session close:**
  - `npx gitnexus analyze`
  - `/graphify . --update` (via skill)
  - `git add docs/ .beads/`
  - `git commit -m "feat: profil/approval: diff preview mengikuti field form per entity"`
  - `git pull --rebase && bd dolt push && git push`

---

## Peringatan

> **JANGAN** pecah file hanya karena `FIELD_MAP` besar — ini deklaratif, kohesif satu tanggung jawab,
> dan sesuai ADR-0007 (ukuran bukan hard gate). `approval-client.tsx` boleh melewati ambang ~180 baris.

> **Edge case `pendidikanTerakhirId` (BIODATA):** server kembalikan object `pendidikanTerakhir`
> (bukan `pendidikanTerakhirNama`). `resolveValue` akan fallback ke raw ID — acceptable untuk iterasi 1.
> Jika user melaporkan masih tampil ID, buat issue follow-up untuk extend `resolveValue` agar handle
> nested object dengan key berbeda.
