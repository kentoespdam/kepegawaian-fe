# App Shell — Sidebar, Top Bar, Dashboard

> **Muat modul ini untuk:** kerja layout global, sidebar/navigasi, top bar/breadcrumb, menu
> pengguna, halaman landing/dashboard. Berisi §6 (shell sidebar-09), §12 (top bar), §13 (landing).
> **Sumber:** CONTEXT §App shell/§Top bar/§Dashboard landing.

---

## 6. App shell — two-tier sidebar-09 (CONTEXT §App shell)

Pola shadcn **sidebar-09** ("Collapsible nested sidebars", gaya Mail-app) di Base UI —
**BUKAN** sidebar-07.

```
┌──┬──────────────┬──────────────────────────────────────────┐
│  │ MASTER        │  Master / Sanksi            [avatar ▾]    │ ← top bar sticky
│ ▪│──────────────│──────────────────────────────────────────│
│M │ ‹ Golongan   │  ┌─ Toolbar ──────────────────────────┐  │
│K │   Grade      │  │ [🔍 cari]              [+ Tambah]   │  │
│C │   Jabatan    │  └────────────────────────────────────┘  │
│L │   Organisasi │  ┌─ DataTable (header sticky) ────────┐  │
│P │ ▸ Profesi    │  │ Kode  Keterangan  Parent   [✎] [🗑]│  │
│S │   Sanksi     │  │ …zebra…                            │  │
│  │   …17 entitas│  └────────────────────────────────────┘  │
│  │              │  Menampilkan 1–20 dari 134   [10|20|50]   │
└──┴──────────────┴──────────────────────────────────────────┘
 T1     Tier-2                    Content (60%)
(rail)  (panel, collapsible ‹)
```

- **Tier 1 — icon rail** (kiri, sempit): satu ikon per **modul** (master, kepegawaian, cuti,
  laporan, penggajian, sistem). Modul aktif highlight **Tirta Blue**. **Selalu terlihat** —
  tak pernah collapse (navigasi konstan, penting untuk lansia).
- **Tier 2 — entity panel:** entitas modul aktif saja (Master = 17 CRUD). **Collapsible** via
  toggle `‹` (menyembunyikan panel → melebarkan area konten; rail tetap). Default = expanded.
- **60:30:10:** konten = 60% (near-white), sidebar (rail+panel) = 30% (netral), Tirta Blue =
  10% (modul/entitas aktif, tombol primer, focus ring).
- **Rilis 1:** hanya panel **master** yang di-wire; 5 ikon rail lain hadir tapi panel = stub.

**Responsif (WAJIB, bukan afterthought — staff buka di HP):**
- Layar sempit → sidebar **off-canvas** (rail + panel sembunyi di balik hamburger, slide-in
  sebagai satu drawer Sheet-backed); tap entitas → tutup drawer + navigasi. Konten full-width.
- **DataTable degrade anggun:** scroll horizontal di region tabel (toolbar + pagination tetap,
  tak ikut ter-scroll); tap target ≥44px; toolbar combobox + "Tambah" menumpuk vertikal.
- Dialog form tetap usable; Sheet berat → full-width di mobile.
- **Verifikasi ~375px** = acceptance criterion tiap layar. Shell ringan, tanpa animasi nav berat.

---

## 12. Top bar (CONTEXT §Top bar)

Sticky, di atas tiap halaman. **HANYA** dua hal: breadcrumb kiri + menu pengguna kanan.
**TIDAK ADA** kotak pencarian, lonceng notifikasi, atau toggle tema di rilis 1.

- **Breadcrumb** `Master / {Entitas}` (mis. "Master / Sanksi") = sekaligus judul halaman —
  halaman TIDAK mengulang `<h1>` besar. Mobile → menciut ke nama entitas + hamburger `[≡]`.
- **Menu pengguna** = tombol avatar-inisial → menu: **nama + email** (dari DAL `account.get()`,
  tanpa fetch tambah), pembatas, lalu **"Profil"** (→ `/profil`) & **"Keluar"** (logout →
  hapus cookie `token` & sesi → `/login`).
- **Rilis 1:** sumber nama/email = Appwrite `account.get()`.
- **Catatan lanjutan (modul kepegawaian):** menu pengguna nanti diperkaya nama/jabatan/posisi
  dari endpoint pegawai → dibuat sebagai **komponen tersendiri yang menerima data identitas**
  agar sumber datanya bisa diganti tanpa membongkar top bar.

---

## 13. Landing / dashboard (CONTEXT §Dashboard landing)

Login mendarat di **welcome page** (`/` atau `/dashboard`), BUKAN langsung ke tabel.

- **Greeting:** "Selamat datang, {nama}" + konteks satu baris ("Modul Master · data referensi").
  Nama dari DAL `account.get()` — tanpa fetch tambah.
- **Shortcut grid:** kartu ke 17 entitas Master CRUD (klik → tabel entitas). Kartu **statis, TANPA
  query count per-entitas** (jujur untuk rilis 1, nol statistik pegawai karangan = anti-slop;
  ringan — landing ~0 fetch).
- **Extensible:** area **di bawah** shortcut = slot untuk modul masa depan (kepegawaian, cuti,
  penggajian, laporan). Rilis 1 kosong / placeholder halus "akan hadir"; layout siap tambah
  stats row tanpa restruktur.
- **Ringan:** kartu = markup statis (ikon lucide + label), tanpa chart/widget/count-fetch.
