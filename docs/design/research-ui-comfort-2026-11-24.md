# Riset kenyamanan UI untuk penggunaan lama

**Tanggal riset:** 24 November 2026  
**Cakupan:** Aplikasi administrasi kepegawaian Perumdam Tirta Satria, dengan pengguna internal termasuk pegawai berusia lebih tua.

## Ringkasan

Kenyamanan untuk sesi panjang bukan hanya persoalan mengganti warna. Sumber yang ditinjau mendukung keterbacaan, kontrol yang jelas, tata letak yang tetap berfungsi saat diperbesar, dan pengurangan beban pencarian serta gangguan. WCAG menetapkan baseline aksesibilitas; beberapa keputusan proyek—misalnya body 16px dan target kontrol 44px—lebih kuat dari minimum WCAG dan layak dipertahankan sebagai kebijakan produk.

Palet sekarang sudah punya fondasi masuk akal: light mode memakai teks gelap pada kanvas off-white, card lebih terang, kontrol punya border, dan hijau Evergreen menjadi aksen. Prioritas berikutnya adalah memastikan perbedaan permukaan dan state benar-benar terbaca pada seluruh komponen, mengurangi kepadatan lewat hierarki dan progressive disclosure, serta mengecek layar nyata dengan pegawai yang mengerjakan tugas rutin. Dark mode sebaiknya tetap menjadi pilihan pengguna; bukti tentang polaritas tampilan berasal dari tugas dan sampel tertentu, sehingga tidak membenarkan pemaksaan satu tema untuk semua.

## Konteks proyek dan token saat ini

`CONTEXT-MAP.md` menyebut aplikasi internal HR/kepegawaian dan memperkirakan sekitar 70% pengguna berusia lebih tua. Angka ini diperlakukan sebagai asumsi konteks proyek, bukan data populasi yang divalidasi dalam riset ini. `docs/design/visual-foundation.md` menargetkan body 16px, kontras teks utama 7:1, teks sekunder 4.5:1, target kontrol 44px, dan label/icon untuk status. Ini adalah keputusan desain proyek; WCAG sendiri menetapkan kontras normal 4.5:1 AA dan target minimum 24×24 CSS px AA, sementara 44×44 px adalah kriteria AAA dengan pengecualian.

Token tema yang dibaca dari `src/app/globals.css`:

| Peran | Light | Dark |
|---|---|---|
| Kanvas | `oklch(0.94 0.008 85)` | `oklch(0.13 0.01 160)` |
| Teks utama | `oklch(0.22 0.01 260)` | `oklch(0.93 0.01 100)` |
| Card/popover | `oklch(0.995 0.004 85)` | card `0.22`, popover `0.25` (chroma `.01`, hue `160`) |
| Muted / secondary | muted `0.95`, secondary `0.91` (chroma sekitar `.01`, hue `85`) | muted `0.26`, secondary `0.29` (chroma `.01`, hue `160`) |
| Teks sekunder | `oklch(0.38 0.01 260)` | `oklch(0.73 0.01 100)` |
| Border / input | lightness `0.8` / `0.6` | lightness `0.38` / `0.56` |
| Aksen primer | Evergreen `oklch(0.48 0.09 158)` | Evergreen `oklch(0.62 0.09 158)` |
| Baris tabel | stripe `0.965`, hover `0.925`, selected `0.89` | stripe `0.25`, hover `0.31`, selected `0.34` |

Nilai ringkas di tabel mempertahankan chroma dan hue dari deklarasi CSS. Nilai OKLCH bukan rasio kontras; kontras harus dihitung dari hasil warna ter-render, pada pasangan foreground/background tiap state. Dokumentasi visual foundation mencatat state semantik status harus membawa teks/icon, bukan warna saja.

## Rekomendasi berprioritas

### P0 — Validasi keterbacaan pada halaman tugas nyata

1. Jalankan sesi evaluasi singkat dengan pegawai yang benar-benar memakai aplikasi, termasuk pengguna lebih tua dan pengguna dengan kacamata/zoom sistem. Pilih alur padat: mencari pegawai, membaca tabel, mengubah data, dan mengonfirmasi tindakan. WAI menyarankan keterlibatan pengguna selama siklus desain/pengembangan dan pengujian aksesibilitas; standar otomatis saja tidak menangkap seluruh masalah penggunaan.
2. Uji light dan dark mode pada monitor kantor dan pencahayaan aktual. Catat keberhasilan tugas, kesalahan, waktu sebagai metrik pendukung, kebutuhan memperbesar tampilan, serta kenyamanan yang dirasakan setelah tugas. Jangan menyimpulkan “lebih nyaman” hanya dari selera warna atau satu sesi.
3. Audit screenshot/state untuk teks muted, placeholder, disabled, focus, error, selected row, dan hover. WCAG meminta 4.5:1 untuk teks normal AA, 3:1 untuk teks besar; komponen visual dan state cue yang dibutuhkan harus 3:1 terhadap warna bersebelahan. Teks placeholder tetap perlu terbaca sebagai teks.

### P1 — Kurangi beban visual tanpa mengecilkan informasi

1. Pertahankan body dan sel tabel pada 16px sebagai default proyek. Hindari mengecilkan tabel untuk memuat lebih banyak data; gunakan pemilihan kolom, filter yang terlihat, pencarian, pagination, atau detail per baris untuk mengurangi informasi simultan.
2. Pertahankan hierarki yang dapat dipindai: judul halaman, ringkasan konteks, label bagian yang spesifik, toolbar terpisah dari tabel, dan kata kerja tombol yang eksplisit. Literatur WAI untuk pengguna lebih tua menyebut heading membantu pencarian visual, label yang jelas, serta halaman yang ramai/berisi hal tidak relevan dapat mengganggu. Sumber ini merupakan sintesis literatur lama, bukan eksperimen baru pada aplikasi ini.
3. Beri ruang antar kelompok kontrol dan antar seksi, tetapi jangan menambah card/border dekoratif untuk setiap field. Bedakan panel melalui kombinasi surface, jarak, dan heading; pertahankan kontras teks tinggi. Ini rekomendasi desain untuk mengurangi kompetisi visual, bukan nilai spacing yang diwajibkan standar. Progressive disclosure cocok untuk detail/form lanjutan yang padat; jangan sembunyikan navigasi utama yang oleh keputusan proyek memang tetap terlihat.
4. Untuk tabel, jaga keterbacaan baris dan header saat scroll, buat aksi baris mudah dikenali, dan jangan mengandalkan ikon tanpa label untuk aksi yang jarang/fatal. Gunakan sticky header bila membantu konteks, tetapi periksa agar fokus keyboard tidak tertutup.

### P1 — Kontrol, kontras, dan respons zoom

1. Pertahankan target tombol/form sekitar 44px yang sudah dijadikan kebijakan proyek. WCAG 2.2 AA minimum adalah 24×24 CSS px dengan pengecualian; 44×44 px terdapat pada AAA. Jadi 44px merupakan margin aksesibilitas yang sengaja dipilih proyek, bukan klaim bahwa AA mewajibkannya.
2. Buat batas input, selected state, dan focus ring bisa dibedakan tanpa harus menebak. Jangan menghapus outline. Untuk komponen dan indikator state yang dibutuhkan untuk mengenali atau mengoperasikan antarmuka, cek rasio non-teks minimal 3:1 terhadap warna sekitar sesuai kriteria WCAG 1.4.11. Ambang ini tidak otomatis berlaku untuk setiap dekorasi atau warna hover yang tidak menyampaikan informasi penting.
3. Gunakan teks plus ikon/bentuk untuk status sukses, peringatan, error, atau pilihan; hindari warna sebagai satu-satunya pembeda (WCAG 1.4.1).
4. Verifikasi text resize 200%, zoom/reflow, dan text-spacing override. WCAG 1.4.12 mengharuskan tidak ada kehilangan konten/fungsi saat pengguna menerapkan line-height 1.5×, jarak paragraf 2×, letter spacing .12em, dan word spacing .16em. Angka itu adalah kondisi override yang harus ditahan layout, bukan ukuran default yang wajib dipasang. Untuk konten biasa, reflow pada lebar 320 CSS px; tabel data dua dimensi dapat menjadi pengecualian, tetapi scroll horizontal sebaiknya tetap terbatas pada grid, bukan seluruh halaman.
5. Hindari tinggi tetap yang memotong label, placeholder, pesan validasi, dan judul ketika ukuran teks berubah. Pastikan teks yang dipendekkan punya cara untuk dilihat penuh.

### P2 — Warna, surface, dan dark mode

1. Pertahankan light mode sebagai default yang tenang: off-white hangat untuk kanvas, card sedikit lebih terang, struktur section melalui muted/secondary yang halus, dan Evergreen sebagai aksen terbatas. Studi eksperimen visual acuity dan proofreading menemukan keuntungan polaritas positif (teks gelap di latar terang) pada sampel dewasa muda dan lebih tua, tetapi hanya menguji tugas tertentu. Ini mendukung default light sebagai hipotesis praktis, bukan bukti bahwa light selalu lebih nyaman.
2. Jangan menambah banyak warna aksen atau memberi setiap panel warna sendiri. Gunakan hue terutama untuk makna (aksi utama, status), sedangkan hierarki area dibentuk dengan nilai surface, garis, dan jarak. Pastikan tinted selected row tetap mempunyai indikator tambahan seperti checkbox/fokus/teks bila status pilihan penting.
3. Pertahankan dark mode sebagai pilihan preferensi/lingkungan dan audit kontrasnya terpisah; token yang lolos di light tidak otomatis lolos di dark. Lakukan uji pada kondisi ruangan redup dan terang. Sumber yang ditinjau tidak membuktikan dark mode dapat mencegah kelelahan mata.
4. Input border light saat ini `oklch(0.6 0.012 85)` dan dark `oklch(0.56 0.01 160)` punya lightness yang lebih tegas dibanding border umum. Ini arah yang baik untuk affordance, namun hasil nyata perlu dicek pada tombol, select, date picker, field disabled, serta browser/monitor aktual. Hindari mengubah token global hanya berdasar tabel nilai tanpa audit pasangan aktual.

### P2 — Kenyamanan kerja di luar CSS

NIOSH menyarankan monitor eksternal kira-kira sejauh lengan, bagian atas pada atau di bawah tinggi mata, mengurangi silau, menyesuaikan brightness/contrast, dan istirahat dari layar. Ini faktor workstation yang relevan untuk sesi panjang, tetapi bukan masalah yang bisa diselesaikan dengan palet aplikasi. Beri panduan singkat kepada pengguna/admin untuk mengatur monitor dan mengambil jeda; jangan munculkan reminder yang menginterupsi pekerjaan tanpa kebutuhan operasional.

## Bukti dan batas penerapan

### Standar yang kuat

- WCAG 2.2 normatif memberi ambang yang dapat diuji untuk kontras, target, zoom/reflow, focus-visible, dan adaptasi text spacing. Panduan Understanding WAI menjelaskan maksud/penerapan kriterianya, tetapi bukan teks normatif itu sendiri.
- WCAG 2.2 AA: teks normal minimal 4.5:1 (teks besar 3:1); informasi tidak boleh bergantung pada warna saja; target minimum 24×24 CSS px dengan pengecualian; konten harus dapat diperbesar sampai 200% tanpa kehilangan konten/fungsi; teks spacing dapat dioverride tanpa kehilangan konten/fungsi. Target 44px untuk proyek lebih tinggi daripada minimum AA.

### Riset dan pedoman yang lebih terbatas

- WAI Older Users mengumpulkan temuan lintas literatur tentang penglihatan, ketangkasan, ingatan, konsentrasi, dan informasi berlebih. Halaman tersebut memperingatkan dirinya sebagai pengantar; sebagian data prevalensi/klaim lama dan berasal dari negara berbeda. Gunakan untuk membentuk hipotesis, jangan memindahkan statistiknya ke populasi pegawai Indonesia.
- Eksperimen polaritas 2013 menguji visual acuity dan proofreading, bukan kerja HR sepanjang hari. Hasilnya menguntungkan light polarity, tetapi tidak cukup untuk menyatakan light mode universal.
- Eye-tracking aplikasi pada orang dewasa lebih tua menemukan ukuran teks/piktogram memengaruhi visual search dan ukuran lebih besar meningkatkan keterbacaan dalam konteks eksperimen. Jangan menyalin nilai piksel peneliti sebagai aturan universal karena ukuran layar, jarak pandang, dan aplikasi berbeda.
- NIOSH memberi panduan ergonomi kerja; implementasinya tergantung perangkat, pencahayaan, kebijakan kerja, dan kondisi individu.

## Sumber

Diakses 24 November 2026.

1. W3C, [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/), khususnya SC 1.4.3, 1.4.4, 1.4.10, 1.4.11, 1.4.12, 1.4.1, 2.4.7, 2.5.8, dan 2.5.5. Standar normatif.
2. W3C WAI, [Understanding SC 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
3. W3C WAI, [Understanding SC 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
4. W3C WAI, [Understanding SC 1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html).
5. W3C WAI, [Understanding SC 1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow).
6. W3C WAI, [Understanding SC 1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html).
7. W3C WAI, [Developing Websites for Older People: How WCAG 2.0 Applies](https://www.w3.org/WAI/older-users/developing/) dan [Web Accessibility for Older Users: A Literature Review](https://www.w3.org/TR/wai-age-literature/). Sumber sintesis/literatur lama, dipakai untuk konteks kualitatif.
8. W3C WAI, [Involving Users in Web Projects for Better, Easier Accessibility](https://www.w3.org/WAI/planning/involving-users/).
9. Piepenbrock, Mayr, Mund, & Buchner (2013), [Positive display polarity is advantageous for both younger and older adults](https://pubmed.ncbi.nlm.nih.gov/23654206/), *Ergonomics* 56(7), 1116–1124. Eksperimen primer.
10. Hou & Hu (2023; terbit daring 2021), [Designing Combinations of Pictogram and Text Size for Icons: Effects ... on Older Adults' Visual Search Performance](https://pubmed.ncbi.nlm.nih.gov/34970924/), *Human Factors* 65(8), 1577–1595. Eksperimen primer.
11. NIOSH/CDC (2020), [Working from Home: How to Optimize Your Work Environment and Stay Healthy](https://www.cdc.gov/niosh/bulletin/2020/working-from-home.html).
12. NIOSH/CDC, [Computer Workstation Checklist](https://www.cdc.gov/niosh/media/pdfs/Computer-Workstation-Checklist.pdf).
