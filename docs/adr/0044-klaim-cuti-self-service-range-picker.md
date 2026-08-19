# ADR-0044 — Klaim Cuti: Self-Service, Range Picker, Sekali Selesai

**Tanggal:** 2026-08-19
**Status:** Accepted

---

## Konteks

Setelah pengajuan cuti disetujui (APPROVED), pegawai perlu **mengklaim hari-hari aktual** yang diambil. Bisa jadi pegawai mengajukan 5 hari tapi hanya mengambil 2 hari — kuota yang terpotong harus sesuai dengan hari yang benar-benar diambil, bukan hari yang diajukan.

Backend sudah menyediakan endpoint:
- `POST /cuti/pengajuan/klaim` — buat klaim (`CutiPengajuanKlaimPostRequest`)
- `PUT /cuti/pengajuan/klaim/{id}` — update klaim
- `POST /cuti/approval/klaim` — approve klaim

Type `KlaimCuti = "PENGAJUAN_CUTI" | "KLAIM_CUTI"` sudah ada di spec.

---

## Keputusan

### D1 — Self-Service oleh Pegawai

Klaim dilakukan oleh **pegawai sendiri** (self-service), bukan oleh atasan/HRD. Pegawai yang mengajukan cuti juga yang mengklaim hari-hari aktual.

### D2 — Prasyarat: Status APPROVED

Pengajuan cuti harus berstatus **`APPROVED`** agar bisa diklaim. Status lain (PENDING, REJECTED, CANCELED, RETURNED) → tombol Klaim tidak muncul.

### D3 — Range Picker (bukan Multi-Select Calendar)

Pilihan `listHari` menggunakan **range picker** — dua date picker (Tanggal Mulai & Tanggal Selesai) dalam rentang pengajuan asal.

**Mengapa bukan multi-select calendar:**
- Klaim cuti umumnya **berurutan** (tidak meloncat) — misal apply 1–5 Juni, klaim 1–3 Juni
- Range picker lebih cepat untuk use case sequential
- Lebih sederhana secara implementasi

**Default:** Mulai = `tanggalMulai` pengajuan, Selesai = `tanggalSelesai` pengajuan (full range). User tinggal adjust Selesai jika hanya mengambil sebagian.

**Edge case non-sequential:** tidak didukung untuk sekarang. Bisa ditambahkan sebagai follow-up jika dibutuhkan.

### D4 — Sekali Selesai (Tidak Boleh Split)

Klaim harus dilakukan **sekali selesai** — semua hari yang diambil dipilih dalam satu klaim. Tidak boleh split/bertahap.

**Mengapa:** Setelah klaim di-approve, tidak bisa diubah. Jadi harus lengkap dalam satu submit.

### D5 — `isClaimed` sebagai Block Action

Field `isClaimed` pada `CutiPengajuanMiniResponse` berfungsi sebagai **block action**:
- `isClaimed === true` → tombol Klaim tidak muncul (prevent re-claiming)
- `isClaimed === false` → tombol Klaim muncul jika status APPROVED
- Reset ke `false` jika klaim **ditolak (REJECTED)** → boleh klaim ulang

### D6 — Badge di Tabel Pengajuan

Tabel pengajuan menampilkan **semua record** (PENGAJUAN + KLAIM) dengan **badge** per baris untuk membedakan jenis. Filter dropdown `jenisPengajuanCuti` ditambahkan di toolbar.

### D7 — Approval Chain Langsung ke Supervisor SDM

Backend menentukan rantai approval klaim. Default: langsung ke **Supervisor SDM** (bukan multi-level seperti pengajuan asal). Menggunakan endpoint `POST /cuti/approval/klaim`.

---

## Alternatif yang Dipertimbangkan

| Alternatif | Mengapa Ditolak |
|-----------|----------------|
| Multi-select calendar | Over-engineering untuk use case yang umumnya sequential |
| Klaim bertahap (split) | Kompleksitas tracking — kapan semua hari terklaim? |
| Klaim oleh atasan/HRD | Bukan self-service, menambah beban approval |
| Approval multi-level untuk klaim | Terlalu berat untuk konfirmasi hari yang diambil |

---

## Konsekuensi

- **Tabel pengajuan** mendapat kolom badge (PENGAJUAN/KLAIM) + filter dropdown + tombol Klaim
- **Form klaim** baru: Sheet dengan range picker + keterangan optional
- **`isClaimed`** dipakai sebagai gate — reset saat REJECTED
- **Approval klaim** tampil di halaman Persetujuan Cuti (sama seperti approval pengajuan)
- **Endpoint baru** tidak diperlukan — semua sudah ada di backend

---

## Referensi

- `docs/context/cuti.md` — CU-22 s/d CU-33
- `docs/api/cuti/api.json` — `POST /cuti/pengajuan/klaim`, `PUT /cuti/pengajuan/klaim/{id}`, `POST /cuti/approval/klaim`
- `src/types/cuti/pengajuan.ts` — `CutiPengajuanKlaimPostRequest`, `KlaimCuti`
