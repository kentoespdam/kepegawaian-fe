# Grilling Session Protocol (Antigravity)

Aturan ini WAJIB dijalankan oleh AI Agent (`antigravity`) pada saat melakukan sesi `grilling` atau tanya-jawab mendalam dengan pengguna guna memastikan kualitas keputusan dan dokumentasi yang anti-slop.

## 1. Persiapan & Eksekusi
- **Aktifkan Skill Anti-Slop**: Wajib menggunakan prinsip dan skill `/antislop` untuk mencegah penggunaan bahasa generik, template AI slop, dan pertanyaan yang tidak bermakna.
- **Kepatuhan Utama**: Wajib mematuhi seluruh aturan yang terdapat pada `GEMINI.md`.

## 2. Format Tanya-Jawab
- **Satu per Satu**: Ajukan pertanyaan kepada pengguna secara berurutan, wajib 1 pertanyaan pada satu waktu. Dilarang memberikan banyak pertanyaan secara bersamaan.
- **Rekomendasi & Saran Terbaik**: Pada setiap pertanyaan, berikan 1-3 rekomendasi solusi/pilihan dan tentukan 1 opsi sebagai "Saran Terbaik" (*Best Suggestion*).
- **Berbasis Fakta**: Pertanyaan dan saran wajib disusun berdasarkan fakta dan hasil riset nyata, baik dari *codebase* proyek maupun dari internet. Lakukan pengecekan sistem (filesystem, tools) sebelum bertanya, untuk menghindari pertanyaan teoritis yang merupakan "AI Slop".

## 3. Hasil Akhir (Goal)
- **Dokumentasi**: Hasil dari sesi tanya-jawab wajib dirangkum untuk meng-update dokumentasi proyek seperti `CONTEXT.md`, dokumen ADR (Architecture Decision Record), dan referensi sejenis.
- **Implementation Plan (Root Agent)**: Root Agent WAJIB membuat *implementation plan* yang disepakati. Plan disusun dengan *high-level language* yang mendetail, berfokus pada arsitektur dan strategi, tanpa perlu memuat cuplikan kode eksekusi teknis.
- **Delegasi Beads Issue & Checklist**:
  - `beads issues` digunakan untuk menampung *implementation plan*.
  - Wajib dibuatkan file MD terpisah yang berisi *checklist claim order* berdasarkan plan tersebut.
  - **PENTING**: Isi plan disusun secara eksklusif oleh Root Agent. Namun, eksekusi pembuatan `beads issues` ke terminal WAJIB didelegasikan kepada Sub-Agent dengan instruksi text payload yang spesifik. Sub-agent dilarang menyusun plan atau membuat issue secara mandiri (tanpa instruksi spesifik) karena kapasitas penalarannya terbatas dan berisiko tinggi halusinasi.
