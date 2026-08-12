# Konteks: Data Pendukung — Keahlian

> Delta kategori. Baca [kepegawaian-pendukung.md](kepegawaian-pendukung.md) (shared infra, P1–P8) dulu.
> **Muat file ini hanya bila menyentuh `pendukung/keahlian/`.**
> Claim order: [CLAIM-ORDER-pendukung.md](../CLAIM-ORDER-pendukung.md) (Fase 2)

**Keputusan K1 — Tabel kompak (7 kolom), TANPA kolom Status.**

`No | Keahlian | Tingkat | Sertifikasi | Institusi | Tahun | Aksi`

- **Keahlian** = kolom identitas (`jenisKeahlian.nama`, weight 600).
- **Tingkat** = `kualifikasi` → label **Kurang · Baik · Cukup** (nilai enum `KURANG|BAIK|CUKUP`).
- **Sertifikasi** = badge kecil "Ya"/"—" (`sertifikasi` boolean).
- **Institusi** = `institusi`; **Tahun** = `tahun` (tabular-nums).
- **Tidak ada kolom Status/disetujui** — keputusan user: konsol admin = semua auto-disetujui, badge
  jadi noise. `disetujui`/`tanggalPengajuan`/`tanggalDisetujui`/`disetujuiOleh` **tidak dirender
  sama sekali** di kategori ini (berbeda dari pendidikan D3 yang menampilkannya).
- `masaBerlaku` tidak jadi kolom (nilai teks bebas ambigu; tetap di form).
- **Aksi** = ikon Edit + Hapus, paling kanan, dibungkus `<Can entity="pegawai">`.

**Keputusan K2 — Filter toolbar (1 combobox).**

- `jenisKeahlianId` — combobox dari `/master/jenis-keahlian/list` → param `jenisKeahlianId`
- Tombol **Reset filter**
- Tidak ada filter teks bebas (BE tidak menerimanya) dan **tidak ada filter `disetujui`**
  (kolom Status dibuang → filter status YAGNI). Kosong = semua.

**Keputusan K3 — Form Sheet (6 field).**

| Label | Request field | Required | Kontrol |
|---|---|---|---|
| Jenis Keahlian | `keahlianId` | ✅ FE (BE tandai opsional) | `FKCombobox` `/master/jenis-keahlian/list` (label `nama`) |
| Tingkat Kemampuan | `kualifikasi` | ✅ | select enum: Cukup · Baik · Kurang (nilai `CUKUP\|BAIK\|KURANG`) |
| Sertifikasi | `sertifikasi` | — | checkbox |
| Institusi | `institusi` | ✅ (min 1) | input teks |
| Tahun | `tahun` | — | input number (Zod int, min 1970) |
| Masa Berlaku | `masaBerlaku` | — | input **teks bebas** (spec BE `string` tanpa format tanggal) |

- `keahlianId` wajib di FE karena kolom utama tabel butuh nama keahlian; BE menandai opsional —
  FE lebih ketat, aman.
- Tidak ada cross-field validation.
- `biodataId` dari `nik` header session (P6). Footer sticky Batal/Simpan; error inline;
  setelah 200 `invalidateQueries`.

**Pemetaan sel tabel → `KeahlianQuery`:**

| Kolom | Sumber |
|---|---|
| No | index baris + offset paging |
| Keahlian | `jenisKeahlian.nama` (fallback `keahlianId`) |
| Tingkat | `kualifikasi` → Kurang/Baik/Cukup |
| Sertifikasi | `sertifikasi` → badge "Ya"/"—" |
| Institusi | `institusi` |
| Tahun | `tahun` |
| Aksi | Edit + Hapus |

**Endpoint list:**

| Operasi | Endpoint |
|---|---|
| List | `GET /profil/keahlian?biodataId=<nik>` — filter: `jenisKeahlianId` |
| Detail | `GET /profil/keahlian/{id}` |
| Create | `POST /profil/keahlian` |
| Update | `PUT /profil/keahlian/{id}` |
| Delete | `DELETE /profil/keahlian/{id}` |
| Lampiran | `/profil/keahlian/lampiran/{id}` · `/{id}/file`, `POST /profil/keahlian/lampiran` (ref `PROFIL_KEAHLIAN` — lihat P5 + spike) |

**Catatan approval (bukan UI):** `KeahlianQuery` sudah memuat `disetujui` dkk. FE tidak merender
dan tidak mengirimnya. Aturan auto-approve saat admin menulis = keputusan terkunci P4/kuadran
shared-infra; berlaku seragam untuk entitas profil (tertuang di
[BE-REQUIREMENT-pendukung-pendidikan.md](../BE-REQUIREMENT-pendukung-pendidikan.md) #1) — tanpa
gap BE khusus keahlian.

**Types:** `src/types/profil/keahlian.ts` — `KeahlianQuery`, `KeahlianPostRequest`/`PutRequest`,
`TingkatKemampuan`, `KeahlianSearchParams`.
