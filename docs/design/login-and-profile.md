# Login Page & Profile Page

> **Muat modul ini untuk:** kerja halaman `/login` (brand panel + form + animasi air) atau
> `/profil` (info akun + ganti password). Berisi §14 (login), §15 (profil).
> **Sumber:** CONTEXT §Login page/§Profile page. Alur auth/logout ada di [auth-proxy.md](./auth-proxy.md).

---

## 14. Login page (CONTEXT §Login page)

Two-column split.

```
┌──────────────────────────┬────────────────────────────────┐
│  ~~~~~ (gradient air ~~~~ │        Masuk                    │
│  ~~~~~  drift 12–20s) ~~~ │                                 │
│                          │  Email                          │
│   [logo]                 │  [___________________]          │
│   PERUMDAM               │  Password               👁      │
│   TIRTA SATRIA           │  [___________________]          │
│   Sistem Kepegawaian     │                                 │
│   "Melayani dengan       │  [  Masuk  ] (Tirta Blue)       │
│    Sepenuh Hati"         │  Butuh bantuan? Hubungi admin   │
│      ~45%                │            ~55%                 │
└──────────────────────────┴────────────────────────────────┘
```

- **Kiri = brand panel** Tirta Blue: logo + "PERUMDAM TIRTA SATRIA" + "Sistem Kepegawaian" +
  tagline "Melayani dengan Sepenuh Hati". **Rasio split ≈ 45:55** (brand : form) di desktop ≥1024px.
- **Kanan = form card** (permukaan netral): email + password + satu tombol **Masuk** (Tirta Blue).
  **Tanpa** link signup, **tanpa** "lupa sandi" (di luar scope rilis 1). Validasi field inline;
  login gagal → satu error inline di atas tombol (JANGAN toast telanjang).
- **60:30:10:** panel biru = kolom ~30–40%, area form = 60% netral, tombol/ring = 10% aksen —
  biru terkurung di satu kolom.
- **Form elderly-first:** field besar high-contrast (label ≥15–16px, input ≥44px, focus ring
  jelas), spacing lega, password ada **reveal toggle (👁)**.
- **Help affordance:** baris tenang "Butuh bantuan? Hubungi admin" di bawah tombol.

### 14.1 Animasi background — CSS-only, motif air (WAJIB ringan)

- Gradient Tirta-Blue drift-lambat ("gerak air") pakai **pure CSS `@keyframes`** — **nol JS, nol
  lib, nol file gambar, ~0 KB**.
- Animate HANYA properti murah GPU (`background-position`/`transform`/`opacity`), loop ≈12–20s, halus.
- **WAJIB honor `prefers-reduced-motion: reduce`** → beku ke gradient statis.
- **DILARANG** `<canvas>`/requestAnimationFrame, particle lib, animated SVG/Lottie.
- Animasi HANYA di brand panel; kolom form diam sempurna (legibilitas).

### 14.2 Mobile

Brand panel menciut ke header ringkas (logo + nama, gradient drift sama, lebih pendek) di atas
form; single column ~375px. Form tetap penuh & usable.

---

## 15. Profile page — `/profil` (CONTEXT §Profile page)

Ganti-password (dalam scope auth) di halaman **`/profil`**, dicapai dari item **"Profil"** di menu
pengguna top bar. Bukan dialog (butuh 3 field + validasi + state sukses/gagal → halaman penuh lebih
baik untuk lansia). **Dua kartu bertumpuk:**

- **Card 1 — "Informasi Akun" (read-only):** nama, email, peran — dari DAL `account.get()`
  (tanpa fetch tambah). Tak editable rilis 1 (akun dikelola admin/HR).
- **Card 2 — "Ganti Password" (form):** 3 field — password lama, password baru, konfirmasi baru —
  tiap-tiap **reveal toggle (👁)**. Panggil Appwrite `updatePassword(new, old)`. **Zod:** baru ≠
  lama, konfirmasi = baru, minimum length; error **inline** (grammar §10.3), JANGAN toast telanjang.
  Sukses → toast "Password berhasil diganti" + reset form. Tombol primer **Ganti Password**
  (Tirta Blue), kanan-bawah kartu.
- Field elderly-first (≥44px, label ≥15px, focus ring), single column label-on-top.
- **Migration note:** kelak bisa lipat ke modul `sistem`; dibangun standalone → relokasi, bukan rewrite.
