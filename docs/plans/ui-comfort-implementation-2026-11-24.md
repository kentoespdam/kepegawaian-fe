# Rencana implementasi kenyamanan UI

**Tanggal:** 24 November 2026  
**Dasar:** [Riset kenyamanan UI untuk penggunaan lama](../design/research-ui-comfort-2026-11-24.md), `CONTEXT-MAP.md`, dan `docs/design/visual-foundation.md`.

## Tujuan

Membuat alur kerja administrasi lebih mudah dibaca dan dipindai untuk sesi panjang. Fokusnya adalah memeriksa kontras pada state yang benar-benar digunakan, mengurangi kompetisi visual pada layar padat, dan memastikan layout tetap berfungsi saat teks diperbesar. Palet Evergreen light/dark yang ada menjadi baseline; perubahan warna dilakukan hanya bila audit menemukan masalah nyata.

## Batas dan keputusan yang dipertahankan

- Jangan mengubah file di `src/components/ui/` (komponen hasil generate shadcn).
- Gunakan token warna semantik dari `src/app/globals.css`; jangan menambah warna literal di komponen.
- Pertahankan Evergreen untuk aksi/fokus, kanvas hangat, surface bertingkat, teks tubuh 16px, dan target kontrol 44px sesuai keputusan proyek.
- Sidebar utama tetap terlihat secara default. Progressive disclosure dipakai untuk detail tambahan yang padat, bukan untuk menyembunyikan navigasi.
- Status penting memiliki label/teks atau ikon; warna bukan satu-satunya sinyal.
- Kontras 3:1 berlaku pada komponen atau indikator nonteks yang diperlukan untuk mengenali/mengoperasikan UI, bukan pada semua dekorasi atau hover.

## Tahapan

### P0 — Kunci baseline dan audit kontras

**Sasaran:** pastikan pemeriksa kontras mewakili token CSS yang benar dan mencakup pasangan paling berisiko.

**File:** `src/app/globals.css`, `scripts/contrast-gate.mjs`.

**Langkah:**

1. Cocokkan nilai light/dark di skrip dengan token aktif di CSS; hilangkan duplikasi nilai yang tertinggal bila ada cara sederhana dan aman.
2. Pastikan gate mencakup teks utama, muted pada surface tabel (zebra/hover/selected), teks tombol primer/sekunder/status, serta batas input terhadap surface terdekat.
3. Audit warna ter-render pada state disabled, invalid/error, focus, selected, dan placeholder. Rasio token saja belum mewakili opasitas atau kombinasi class pada komponen.

**Kriteria selesai:** teks utama memenuhi target proyek 7:1; teks normal lain minimal 4.5:1; teks tombol minimal 4.5:1; batas kontrol/indikator penting minimal 3:1 pada pasangan yang relevan. Light dan dark lulus sendiri-sendiri. Bila pasangan gagal, sesuaikan token pemakai yang paling sempit; hindari perubahan palet luas tanpa kebutuhan.

### P0 — Pilot visual pada satu daftar dan satu form

**Sasaran:** menemukan masalah antarmuka nyata sebelum memperluas perbaikan.

**Halaman/pola:** `/master/golongan`, memakai `src/components/app-shell.tsx`, `src/components/data-table.tsx`, `src/components/data-table-toolbar.tsx`, serta form melalui `src/components/crud-form.tsx` dan `src/components/field-renderers.tsx`.

**State yang diperiksa:** default, hover, selected, fokus keyboard, input kosong/terisi, invalid, disabled, loading, error, empty, tombol primer dan sekunder, dialog konfirmasi.

**Kriteria selesai:** pada light dan dark, desktop dan viewport 375px, kanvas/card/toolbar/input/tombol punya perbedaan peran yang mudah dikenali; teks tidak pudar; fokus terlihat; pilihan baris memiliki penanda tambahan bila state pilihan penting; toolbar/paginasi tidak ikut hilang saat tabel scroll. Perbaikan dilakukan pada file pemakai token di luar `src/components/ui/`.

### P1 — Terapkan temuan pada alur dengan beban visual berbeda

**Sasaran:** periksa apakah pola pilot berlaku pada tipe halaman lain, bukan menyalin styling seragam ke semua layar.

**Halaman:**

- Form login: `src/app/login/login-form.tsx`.
- Form/pengajuan: `src/app/(app)/cuti/pengajuan/pengajuan-page-client.tsx`.
- Verifikasi dengan tabel dan status: `src/app/(app)/penggajian/verifikasi/verifikasi-client.tsx`.
- Laporan padat: `src/app/(app)/laporan/so/so-page-client.tsx`.

**Langkah:** gunakan jarak dan heading untuk mengelompokkan informasi; pertahankan ukuran teks; bedakan toolbar dari data; tampilkan status dengan label/icon; gunakan disclosure hanya untuk rincian lanjutan yang memang jarang dibutuhkan. Jangan menambahkan card, badge warna, atau aksen pada setiap kelompok.

**Kriteria selesai:** pengguna dapat mengenali aksi utama, sekunder, status, dan batas input tanpa menebak; dialog/tabel/bagan mempertahankan hierarki; tidak ada state yang bergantung pada hue saja.

### P1 — Zoom, reflow, dan variasi teks

**Sasaran:** pastikan konten kerja masih utuh pada pembesaran dan ukuran viewport kecil.

**Cakupan:** pilot P0 dan pola bersama di atas, khususnya `src/components/field-renderers.tsx`, tabel, dialog, serta navigasi.

**Pemeriksaan:** pembesaran teks 200%; text-spacing override WCAG (line-height 1.5×, jarak paragraf 2×, letter spacing .12em, word spacing .16em); lebar 320 CSS px dan layout ponsel 375px.

**Kriteria selesai:** label, pesan validasi, nilai field, dan tombol tidak terpotong/bertumpuk; halaman tidak memerlukan scroll horizontal menyeluruh; tabel boleh scroll di region tabel; navigasi utama tetap dapat ditemukan; fokus tidak tertutup dialog/sticky header.

### P2 — Validasi dengan pegawai

**Sasaran:** menguji kenyamanan dan keberhasilan tugas pada pengguna serta perangkat sebenarnya.

**Tugas:** cari data pegawai, baca tabel, ubah data, lalu tinjau/konfirmasi tindakan. Libatkan pegawai dengan variasi usia, penglihatan/kacamata, serta pengalaman aplikasi bila tersedia. Bandingkan tema light/dark di monitor dan pencahayaan kantor yang biasa dipakai.

**Catat:** keberhasilan tugas, kesalahan, titik ragu, kebutuhan zoom, waktu sebagai metrik pendukung, dan kenyamanan yang dilaporkan setelah rangkaian tugas. Jangan menyimpulkan tema universal dari satu preferensi.

**Kriteria selesai:** masalah yang diamati masuk daftar perbaikan dengan halaman/state dan bukti yang jelas; keputusan tema atau kepadatan yang belum dapat dipastikan tetap menjadi opsi untuk diuji, bukan asumsi.

## Dependensi dan urutan

`P0 audit kontras → P0 pilot → P1 pola lintas halaman → P1 zoom/reflow`. P2 membutuhkan peserta dan perangkat kantor; persiapannya dapat berjalan paralel, tetapi evaluasi dilakukan setelah pilot cukup stabil. Temuan P2 dapat membuka iterasi lanjutan pada token atau halaman tertentu.

## Verifikasi implementasi yang direncanakan

- Jalankan `node scripts/contrast-gate.mjs` setelah perubahan token/pemeriksa.
- Review visual di light/dark dan viewport target pada seluruh state yang disebut di pilot.
- Periksa diff agar tidak ada edit ke `src/components/ui/` dan tidak ada nilai warna literal yang tersebar pada komponen.
- Jalankan pemeriksaan regresi UI yang relevan setelah perubahan implementasi.

## Di luar rencana ini

Perubahan arsitektur informasi besar, restrukturisasi navigasi, reminder istirahat yang menginterupsi, pergantian merek dari Evergreen ke Tirta Blue, dan perbaikan kondisi workstation. Faktor workstation dapat dibagikan sebagai panduan internal terpisah bila dibutuhkan.
