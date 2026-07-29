# Konteks: `kepegawaian` §Page 1 — Dashboard Pegawai

> Delta modul. Baca [CONTEXT-MAP.md](../../CONTEXT-MAP.md) (inti bersama) dulu.
> Bagian dari [kepegawaian.md](kepegawaian.md) — baca itu untuk Ringkas + identity bridge.
> **Muat file ini hanya bila menyentuh Dashboard Pegawai** (`(app)/kepegawaian/dashboard`).

## Page 1 — Dashboard Pegawai (self-edit biodata)

Profil diri sendiri, difilter ke `$id` (aman by-design → tak perlu permission khusus).

**Edit biodata self-service** dibuka untuk **satu** endpoint: `PATCH /profil/biodata/{nik}` (biodata
diri sendiri) — lihat [ADR-0012](../adr/0012-dashboard-self-edit-biodata.md). Tombol "Edit Profil" di
accordion "Data Pribadi" membuka Dialog + `CrudForm`. Aman by-design: `nik` diambil dari **sesi**
(`getPegawaiSession()`, ADR-0006), bukan input user → tak bisa mengedit biodata orang lain, jadi RBAC
berlapis tak jadi prasyarat untuk scope sempit ini.

- **9 field editable** = tepat `BiodataPatchRequest`: `nama`, `alamat`, `jenisKelamin`, `tempatLahir`,
  `tanggalLahir`, `agama`, `statusKawin`, `ibuKandung`, `telp`. Validasi zod: **hanya `nama` wajib**;
  `telp` format-check bila diisi; sisanya optional.
- **NIK read-only** (`disabled` di form) — hanya admin yang boleh ubah karena NIK = ID di BE; bukan
  bagian `BiodataPatchRequest`.
- **Pendidikan Terakhir** dikecualikan dari form (via menu "tambah pendidikan" — belum ada);
  ditampilkan read-only sebagai `{tingkat} — {jurusan} — {institusi} — {tahunLulus}` via
  `PendidikanDashboard`.
- **Ibu Kandung, Telp, Email, Kode Pajak** ditampilkan di read view.

### Approval tracking — `changedStatus`

Dashboard memakai endpoint `GET /profil/biodata/{nik}/dashboard` → `BiodataDashboardResponse`
yang punya field `changedStatus?: boolean`. Fungsinya:

- `changedStatus: true` → ada perubahan biodata dari user yang **sedang menunggu approval admin**.
- Ditampilkan sebagai **Badge outline kuning "Menunggu"** (+ ikon `Clock`) di samping judul
  AccordionTrigger "Data Pribadi" pada panel kiri.
- **Tooltip hover:** "Perubahan biodata sedang menunggu persetujuan admin".
- **Tombol "Edit Profil" disembunyikan** saat `changedStatus=true` — user tak bisa membuka dialog
  edit selama ada perubahan pending, untuk mencegah tumpuk-tindih multiple pending changes.
- Hanya berlaku untuk **biodata level dashboard** (sub-entitas seperti keluarga/pendidikan/dll.
  belum ditampilkan — ditunda ke iterasi berikutnya).
- Tipe sudah di-generate via `extract-types.js` → `BiodataDashboardResponse.changedStatus` di
  `src/types/profil/biodata.ts`.

> ⚠️ **Alur approval ini sebelumnya "ditunda"** di ADR-0012. Sekarang BE sudah menyediakan
> `changedStatus` di endpoint `/dashboard` dan FE menampilkan indikatornya. Alur approval penuh
> (review + approve/reject dari admin) masih menyusul.

Alur berat yang **tetap ditunda** (bukan bagian rilis ini): `PATCH /pegawai/{id}/profil`, `/gaji`, dan
alur `profil-update` approval penuh (review + approve/reject dari admin) — menyusul bila edit lintas-pegawai (HR) butuh RBAC nyata.

> **Update — `changedStatus` sudah live.** Indikator approval (badge "Menunggu") sudah tampil di dashboard
> saat BE mengembalikan `changedStatus: true`. Alur review admin masih menyusul.

### Layout: 2 panel + accordion (revisi round 2 — lihat [ADR-0011](../adr/0011-dashboard-two-panel-accordion.md))

Ganti dari single stacked column ke **2 panel** di `≥lg` (1024px), **menumpuk** (kiri lalu kanan)
di bawah `lg`. Keduanya pakai **Base UI Accordion** (`src/components/ui/accordion.tsx`, ADR-0004).
Mengikuti pola dashboard legacy (gambar referensi) tapi mengecualikan data tanpa backend.

**Proporsi & kerapian (optimasi round 3 — golden ratio + planogram, lihat ADR-0011 §Addendum):**

- **Rasio kolom `≥lg` = 38% / 62%** (`lg:grid-cols-[38fr_62fr]`), bukan 45/55 atau 50/50. Panel
  kanan (tabel 4–6 kolom) lebih lega, panel kiri (field 2-kolom ringkas) cukup 38% — asimetri φ.
- **Panel kiri accordion pakai `multiple`, default hanya "Data Pribadi" terbuka** — konsisten dengan
  panel kanan (satu section pertama terbuka), tak lagi ikut default single-collapse Base UI.
- **Identitas hanya 1×.** Header atas cukup `"Dashboard Pegawai"` tanpa subtitle nama/NIPAM;
  identitas lengkap (foto + nama + NIPAM + jabatan) hanya di header panel kiri (satu titik fokus,
  eye-level planogram).

**Coloring semantik + spacing + afordansi (optimasi round 4 — lihat ADR-0011 §Addendum round 4):**

- **Padding panel kanan = panel kiri.** `<Accordion>` panel kanan diberi `px-5 py-1` (sebelumnya
  hanya panel kiri punya sejak W6) → data tak lagi mepet ke tepi card; tabel dapat ruang napas.
- **Card-in-card diratakan** via prop opt-in `bare` di `DataTable` (additive, default `false`):
  saat panel kanan me-render tabel di dalam accordion, kirim `bare` supaya tabel tak menggambar
  border/shadow/card sendiri → body accordion tak lagi terkesan "terpotong". Konsumen `DataTable`
  lain (page master, data, terminasi) **tak berubah** (default preservasi perilaku).
- **Afordansi trigger accordion diperkuat** via **className call-site** (BUKAN edit `accordion.tsx` —
  file generate shadcn dilarang diedit, overwrite-risk): satu konstanta className di folder dashboard
  di-pass ke tiap `<AccordionTrigger>` → cue resting jelas (hover bg + chevron ter-tint + padding
  horizontal), tak cuma `hover:underline`. Scope dashboard-only.
- **Warna semantik ~10–20% (60:30:10, reuse token OKLCH `globals.css`):** aksen brand
  `bg-primary/10 text-primary` di avatar header (focal point); badge status semantik (Status Kerja
  Aktif→`success`, Berhenti→`destructive`/`muted`, Dirumahkan→`warning`); section SP tint
  `warning`/`destructive`; kolom Penghasilan Bersih `font-semibold text-foreground`. Bukan menambah
  warna baru — hanya mengonsumsi token yang sudah ada.

**Panel KIRI — "Detail Pegawai"** (accordion):

- **Header identitas** (selalu tampil, di atas accordion): foto profil (read-only dari
  `GET /profil/biodata/{id}/foto-profil`, field `fotoProfil`) + nama + NIPAM + jabatan.
- **Data Pribadi** (accordion item) — biodata dari `GET /profil/biodata/{nik}/dashboard`
  → `BiodataDashboardResponse`. Field `changedStatus` memunculkan badge "Menunggu" di title.
- **Data Kepegawaian** (accordion item) — status, jabatan, organisasi, golongan, grade, tmt*,
  masa kerja, gaji pokok, dari `/pegawai/{$id}`.

**Panel KANAN — "Riwayat"** (accordion, **multi-open + lazy fetch**, section pertama terbuka).
Data tiap section di-fetch **hanya saat dibuka**. Urutan mengikuti gambar referensi:

1. **Data Keluarga** — `/profil/keluarga?biodataId={nik}`.
2. **Data Pendidikan** — `/profil/pendidikan?biodataId={nik}`.
3. **Data Pengalaman Kerja** — `/profil/pengalaman-kerja?biodataId={nik}`.
4. **Data Keahlian** — `/profil/keahlian?biodataId={nik}`.
5. **Data Pelatihan** — `/profil/pelatihan?biodataId={nik}`.
6. **Riwayat Mutasi** — `/kepegawaian/riwayat/mutasi/pegawai/{$id}`.
7. **Riwayat SK** — `/kepegawaian/riwayat/sk/pegawai/{$id}`.
8. **Riwayat Kontrak** — `/kepegawaian/riwayat/kontrak/pegawai/{$id}`.
9. **Riwayat Penggajian** — slip bulanan dari `/penggajian/batch/master/pegawai/{$id}`.
   Kolom: Periode · Gaji Pokok · Penghasilan Kotor · Potongan · Pajak · Penghasilan Bersih.
   Pakai **`penghasilanBersihFinal`**. **Sembunyikan** `*2` / `pembulatan2` / `isDifferent`
   (artefak proses verifikasi batch, bukan urusan pegawai).
   > ⚠️ **Known-limitation:** endpoint tak punya filter status batch → tak bisa jamin hanya periode
   > *accepted* yang tampil. **Tanya backend + verifikasi sebelum go-live** (periode draft/belum-final
   > tak boleh bocor ke pegawai).
10. **Riwayat Disiplin / SP** — `/kepegawaian/riwayat/sp/pegawai/{$id}`. Section **terpisah** di
    **akhir** (hak pegawai untuk tahu; ditampilkan, tidak disembunyikan — sesuai keputusan round 1).
    TIDAK digabung ke riwayat kerja.

**Section list** (Keluarga, Pendidikan, Mutasi, SK, dst.) pakai `<DataTable>` +
`<DataTablePagination>` reusable (pola halaman daftar lain), **default page size 5**.

> **Skip:** **Data Rekening Bank** (di gambar referensi) — tidak ada endpoint/type. Ditunda sampai
> backend tersedia. **Foto upload** juga ditunda; iterasi ini foto **read-only** saja.
