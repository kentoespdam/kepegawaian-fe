# Konteks: Data Pendukung — Data Pendidikan

> Delta kategori. Baca [kepegawaian-pendukung.md](kepegawaian-pendukung.md) (shared infra, P1–P8) dulu.
> **Muat file ini hanya bila menyentuh `pendukung/pendidikan/`.**
> Claim order: [CLAIM-ORDER-pendukung.md](../CLAIM-ORDER-pendukung.md) (Fase 1)
> BE requirement (blocking badge "Disetujui"): [BE-REQUIREMENT-pendukung-pendidikan.md](../BE-REQUIREMENT-pendukung-pendidikan.md)

**Keputusan D1 — Tabel kompak (10 kolom).**

`No | Jenjang | Institusi | Jurusan | Kota | Tahun | IPK | Gelar | Status | Aksi`

- **Institusi** = kolom identitas baris (weight 600, `text-foreground`) — preseden "kolom identitas
  baris" CONTEXT-MAP.
- **Tahun** = sel komposit `Masuk–Lulus` (mis. `2010–2015`); tampil salah satu bila yang lain kosong.
- **IPK** = `gpa` (tabular-nums; `—` bila kosong).
- **Gelar** = komposit `gelarDepan gelarBelakang` (mis. `Dr. Ir. S.T.`); `—` bila keduanya kosong.
- **Status** = badge berteks (a11y: bukan warna saja):
  - **"Terakhir"** bila `isLatest === true` (badge accent/primary)
  - **"Disetujui"** bila `disetujui === true` (badge success) / **"Belum"** bila `false`
- **Aksi** = ikon Edit + Hapus, paling kanan, dibungkus `<Can entity="pegawai">`.
- Kolom flat 12 **ditolak user** (lebar + scroll horizontal terus-menerus untuk pengguna lansia).
  Tahun & Gelar digabung — semua data tetap terlihat.

**Keputusan D2 — Filter toolbar (2): Institusi + Jenjang.**

- `institusi` — teks debounced ("Cari Institusi") → param `institusi`
- `jenjangId` — combobox dari `/master/jenjang-pendidikan/list` → param `jenjangId`
- Tombol **Reset filter** (empty-state "filter kosong" juga menyediakannya)
- ⚠️ Pemetaan nama: **filter** pakai `jenjangId`; **form** pakai `jenjangPendidikanId` — nilainya
  sama (id jenjang), nama berbeda per kontrak BE. `normalizeFk()` hanya berlaku di form.
- Filter lain yang tersedia BE (`jurusan`, `tahunMasuk`, `tahunLulus`, `gelarDepan/Belakang`,
  `isLatest`, `kota`, `gpa`) **tidak dirender** — YAGNI, preseden Keputusan 6 riwayat.

**Keputusan D3 — `disetujui` = auto-true oleh BE; FE hanya baca.**

Request schema tidak memuat field status. Saat HR create/update, BE set `disetujui=true` (+
`tanggalDisetujui`, `disetujuiOleh`). FE menampilkan badge dari response.
⚠️ **Blocking:** field `disetujui` **belum ada** di `PendidikanQuery` → [BE-REQUIREMENT #1](../BE-REQUIREMENT-pendukung-pendidikan.md).
Sampai BE selesai: tabel dirender tanpa badge "Disetujui" (badge "Terakhir" tetap jalan), lalu
badge ditambah setelah tipe di-regenerate — perubahan additive, tidak merombak tabel.

**Keputusan D4 — `isLatest` di-normalisasi BE (satu-true per `biodataId`).**

FE cukup mengirim checkbox "Pendidikan Terakhir" (`isLatest`) di form. BE menjamin ≤ 1 record
`true` per pegawai (transaksional). Sinkron `biodata.pendidikanTerakhirId` menunggu jawaban BE
(BE-REQUIREMENT #2). Badge "Terakhir" di tabel membaca `isLatest` apa adanya.

**Keputusan D5 — Form Sheet (satu `<Sheet>`, mount sekali di page, `editing` state di-lift).**

Field (label → request field → tipe input):

| Label | Request field | Required | Kontrol |
|---|---|---|---|
| Jenjang Pendidikan | `jenjangPendidikanId` | ✅ (min 1) | `FKCombobox` `/master/jenjang-pendidikan/list` (label `nama`) |
| Institusi | `institusi` | ✅ | input teks |
| Jurusan | `jurusan` | — | input teks |
| Kota | `kota` | — | input teks |
| Gelar Depan | `gelarDepan` | — | input teks |
| Gelar Belakang | `gelarBelakang` | — | input teks |
| Tahun Masuk | `tahunMasuk` | — | input number (Zod int, rentang waras ~1950–tahun berjalan) |
| Lulus? | `isLulus` | — | checkbox |
| Tahun Lulus | `tahunLulus` | ⚠️ lihat aturan | input number |
| IPK | `gpa` | — | input number (Zod: 0–4, 2 desimal) |
| Pendidikan Terakhir | `isLatest` | — | checkbox |

- **Cross-field (Zod, aturan terkunci):** bila `isLulus` dicentang → `tahunLulus` **wajib** diisi;
  saat `isLulus` tidak dicentang, `tahunLulus` dikosongkan (tidak dikirim).
- `biodataId` diisi dari `nik` header session (P6) — bukan field form.
- Error inline Zod per field; error submit di atas footer; footer sticky Batal/Simpan
  ("Menyimpan…" saat submit) — pola sheet-form-pattern.
- Setelah 200: `invalidateQueries` tabel + list combobox bila perlu.

**Pemetaan sel tabel → `PendidikanQuery`:**

| Kolom | Sumber |
|---|---|
| No | index baris + offset paging |
| Jenjang | `jenjangPendidikan.nama` (fallback `jenjangId`) — badge "Terakhir" menempel di sini bila `isLatest` |
| Institusi | `institusi` (primary) |
| Jurusan | `jurusan` |
| Kota | `kota` |
| Tahun | `tahunMasuk`–`tahunLulus` (komposit) |
| IPK | `gpa` |
| Gelar | `gelarDepan` + `gelarBelakang` (komposit) |
| Status | badge `isLatest` ("Terakhir") + `disetujui` ("Disetujui"/"Belum") |
| Aksi | Edit + Hapus |

**Endpoint list:**

| Operasi | Endpoint |
|---|---|
| List | `GET /profil/pendidikan?biodataId=<nik>` — filter: `institusi`, `jenjangId` |
| Detail | `GET /profil/pendidikan/{id}` |
| Create | `POST /profil/pendidikan` |
| Update | `PUT /profil/pendidikan/{id}` |
| Delete | `DELETE /profil/pendidikan/{id}` |
| Lampiran | `/profil/pendidikan/lampiran/{id}/list` · `/detail` · `/file`, `POST /profil/pendidikan/lampiran` (lihat P5 + spike) |

**Types:** `src/types/profil/pendidikan.ts` — `PendidikanPostRequest`/`PutRequest`; `PendidikanQuery`
di `src/types/_shared.ts` (akan bertambah field `disetujui` dkk. setelah BE-requirement #1 + regenerate).
