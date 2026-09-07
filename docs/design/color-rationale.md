# Pemilihan Warna Antarmuka Aplikasi Kepegawaian — Dasar & Justifikasi

**Untuk:** Pengajuan & alasan pemilihan warna ke atasan
**Aplikasi:** Sistem Kepegawaian — Perumdam Tirta Satria
**Tanggal:** 2026-07-06 (diperbarui 2026-07-17)
**Status:** Usulan untuk disetujui — **implementasi dev: Evergreen (hijau)**

---

## 1. Ringkasan Eksekutif

Kami mengusulkan skema warna antarmuka yang **bukan sekadar pilihan estetika**, melainkan
keputusan **fungsional berbasis riset**. Alasan utamanya: **± 70% pengguna aplikasi ini adalah
pegawai berusia lanjut (orang tua).** Mata yang menua memiliki keterbatasan fisiologis yang nyata
(dijelaskan di bawah), sehingga kontras dan keterbacaan menjadi **kebutuhan operasional** — bukan
hanya soal "bagus dipandang". Skema yang salah membuat pegawai cepat lelah, salah input, dan
lambat bekerja; skema yang tepat menurunkan kelelahan mata dan kesalahan.

Kami mengusulkan identitas **Tirta Blue** (biru khas air/PDAM) sebagai warna utama merek, namun
menempatkannya secara cerdas — sebagai **aksen**, bukan sebagai warna teks kecil — sesuai temuan
riset tentang mata lansia. Sementara menunggu persetujuan, implementasi dev memakai
**Evergreen (hijau pinus)** sebagai aksen sementara (lihat §4 — 10% Aksen).

Prinsip penataan: **aturan 60:30:10** (60% warna dasar/kanvas, 30% warna pendukung/struktur,
10% warna aksen) — standar desain profesional untuk komposisi yang tenang dan tidak melelahkan.

---

## 2. Mengapa Warna Penting untuk Pengguna Lansia (Dasar Fisiologis)

Temuan dari literatur kesehatan mata dan aksesibilitas:

1. **Lensa mata menguning seiring usia.** Lensa yang menua menyerap lebih banyak cahaya **biru**.
   Akibatnya warna biru terlihat lebih redup dan **kemampuan membedakan warna pada sumbu
   biru–hijau menurun** lebih cepat dibanding sumbu merah–hijau. → *Kita tidak boleh mengandalkan
   perbedaan biru vs hijau untuk menyampaikan informasi penting.*

2. **Mata tua menerima jauh lebih sedikit cahaya.** Retina orang berusia 60 tahun menerima
   sekitar **sepertiga** cahaya dibanding orang berusia 20 tahun. → *Teks harus berkontras tinggi;
   abu-abu pucat yang "estetik" justru tidak terbaca.*

3. **Silau (glare) meningkat.** Putih murni yang sangat terang di area luas menyilaukan dan
   melelahkan. → *Kanvas memakai putih-hangat (off-white), bukan putih murni menyala.*

4. **Saturasi tinggi di area luas melelahkan, tetapi teks butuh kontras tinggi.** Maka: warna
   berjenuh-rendah untuk area besar (dinding/latar), warna kuat hanya untuk aksen kecil, dan
   kontras tinggi khusus untuk teks. Ini persis yang dijembatani oleh aturan 60:30:10.

**Kesimpulan riset:** struktur 60:30:10 tetap dipertahankan, tetapi **nilai warnanya disetel**
menjadi lebih hangat dan berkontras lebih tinggi ("A-refined") agar ramah mata lansia.

---

## 3. Standar Aksesibilitas yang Kami Ikuti (WCAG)

Kami menyelaraskan pilihan warna dengan pedoman **WCAG** (standar aksesibilitas web internasional):

| Kriteria | Isi | Target kami |
|----------|-----|-------------|
| SC 1.4.3 (AA) | Kontras teks minimal **4.5:1** | Wajib lulus untuk semua teks |
| SC 1.4.6 (AAA) | Kontras teks tinggi **7:1** | Target untuk teks utama |
| SC 1.4.1 | **Jangan bergantung pada warna saja** | Status selalu + ikon/teks |
| SC 1.4.4 | Teks dapat diperbesar | Ukuran font dasar ≥ 15–16px |

Poin **1.4.1** sangat penting bagi kita: karena mata lansia lemah membedakan biru–hijau, setiap
status (mis. tingkat sanksi Ringan/Sedang/Berat, berhasil/gagal) **selalu** ditandai dengan
**ikon + teks**, tidak hanya dengan warna.

---

## 4. Skema Warna yang Diusulkan (60:30:10 "A-refined")

Nilai warna ditulis dalam format **OKLCH** (ruang warna modern yang lebih presisi secara persepsi).
Angka teknis disertakan untuk tim pengembang; yang penting bagi persetujuan adalah **maksud** tiap warna.

### 60% — Kanvas / Latar utama
- **Usulan: Off-white hangat**, bukan putih menyala: `oklch(0.99 0.008 85)`
- **Implementasi dev:** Abu-abu kebiruan netral `oklch(0.94 0.005 250)` (~#EDEFF2) — latar
  sengaja digelapkan agar card putih 'mengambang' memberikan elevation visual jelas.
- *Alasan:* mengurangi silau untuk mata lansia; terasa bersih namun tidak melelahkan.

  > **Catatan:** Nilai implementasi berbeda dari usulan dan bersifat sementara — akan
  > diselaraskan saat palet final disetujui.

### 30% — Struktur (sidebar, kartu, header tabel, panel)
- **Netral hangat**: `oklch(0.965 0.006 85)`
- **Garis/border dinaikkan kontrasnya**: `oklch(0.86 0.008 85)`
- *Alasan:* garis tabel, striping baris, dan pemisah harus terlihat jelas — bukan pastel samar
  yang menyatu di mata yang lelah.

### 10% — Aksen (identitas merek)
- **Usulan: Tirta Blue**: `oklch(0.55 0.13 235)` — untuk tombol utama, item aktif, dan cincin fokus.
- **Implementasi dev: Evergreen (hijau pinus)**: `oklch(0.48 0.09 158)` — dipakai sementara
  menunggu persetujuan palet final.
- *Alasan:* mempertahankan identitas air/PDAM. Karena hanya dipakai di area kecil, biru pekat
  justru aman dan menarik perhatian ke aksi penting. **Tidak** dipakai untuk teks kecil di atas putih.

  > **Catatan:** Jika Tirta Blue disetujui, implementasi akan mengganti `--primary` dan `--ring`
  > ke nilai biru. Semua komponen menggunakan token CSS — perubahan cukup di `globals.css`, nol
  > perubahan komponen.

### Teks — kontras tinggi (bukan abu pucat)
- **Teks utama**: `oklch(0.22 0.01 260)` — target AAA ≥ 7:1.
- **Teks sekunder**: `oklch(0.42 0.01 260)` — tetap ≥ 4.5:1, dinaikkan dari abu pucat.

### Warna status (selalu + ikon/teks, tidak mengandalkan biru↔hijau)
- **Merah (bahaya/hapus)**: `oklch(0.52 0.20 25)`
- **Hijau/Teal (berhasil)**: `oklch(0.52 0.1 195)` — digeser ke teal agar tak tertukar dengan biru
  (usulan awal: `oklch(0.50 0.15 150)`).
- **Amber (peringatan)**: `oklch(0.68 0.15 75)`

---

## 5. Manfaat yang Diharapkan

- **Lebih sedikit kelelahan mata** bagi pegawai senior selama bekerja seharian.
- **Lebih sedikit kesalahan input** karena teks & garis terbaca jelas.
- **Kepatuhan standar aksesibilitas** (WCAG) — nilai tambah bagi instansi pemerintah/perumda.
- **Identitas merek terjaga** — Tirta Blue tetap menjadi warna khas aplikasi.
- **Mode gelap sudah aktif** — `.dark` token terisi, toggle via `next-themes` di UserMenu.
  Warna dark mode akan menyesuaikan saat light theme final disetujui.

---

## 6. Sumber Rujukan

- W3C Web Accessibility Initiative (WAI) — *Developing Web Content for Older People / WCAG & aging.*
- National Institutes of Health (NIH) — *The Aging Eye* (perubahan lensa & sensitivitas cahaya).
- Sherwin-Williams — *Color and the Aging Eye* (persepsi warna pada lansia).
- *Elderly-Centric Chromatics* (Taylor & Francis) — riset warna untuk populasi lanjut usia.
- Vispero / TPGi — *Ageism in Design / accessibility for older users.*
- Bureau of Internet Accessibility (BOIA) — *Creating Accessible Content for Older Adults.*
- Salesforce UX (Medium) — praktik kontras & keterbacaan.
- WCAG 2.1 — Success Criteria 1.4.1, 1.4.3, 1.4.4, 1.4.6.

---

*Catatan teknis: nilai OKLCH di atas adalah baseline usulan. Implementasi dev saat ini memakai
nilai yang berbeda (lihat §4 — sub-bagian 60% Kanvas & 10% Aksen). Semua nilai — baik usulan
maupun implementasi — wajib lolos gate kontras (AA ≥ 4.5:1, target AAA ≥ 7:1 untuk teks utama).
Palet final diformalkan setelah pengajuan disetujui.*
