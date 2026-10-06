# 0048. Self-Service Riwayat Penggajian dan Preview Slip Gaji di Dashboard Kepegawaian

- **Status:** Accepted
- **Context:** Menambahkan kapabilitas bagi pegawai untuk melihat riwayat penggajian pribadi dan mengunduh/preview slip gaji PDF dari dashboard pegawai.
- **Decision:**
  1. Menggunakan endpoint backend `GET /penggajian/batch/master/self` untuk riwayat batch gaji per user session (token-bound identity) dan `GET /penggajian/batch/master/{id}/slip-gaji` untuk PDF slip gaji.
  2. Menambahkan method `getRiwayatPenggajianSelf` dan `downloadSlipGaji` di `src/lib/api/penggajian-client.ts`.
  3. Mengintegrasikan riwayat gaji pada `src/config/dashboard-sections.tsx` (section `penggajian`) dengan paginasi standar dan kolom lengkap (`periode`, `namaJabatan`, `gajiPokok`, `penghasilanKotor`, `totalPotongan`, `pembulatan`, `penghasilanBersih`, `totalAddTambahan`, `penghasilanBersihFinal`, dan tombol aksi "Lihat Slip Gaji").
  4. Menambahkan helper `formatPeriode(periode)` di `src/lib/kepegawaian-formatters.ts` untuk memformat periode bulan & tahun dalam bahasa Indonesia.
  5. Menggunakan modal dialog `SlipGajiPreviewDialog` yang memanfaatkan pustaka `react-pdf` via komponen `src/components/pdf-viewer.tsx`.
- **Consequences:** Pegawai dapat mengakses riwayat penggajian dan slip gaji secara mandiri tanpa memerlukan permission admin payroll; proses cetak/preview aman dan responsif.
