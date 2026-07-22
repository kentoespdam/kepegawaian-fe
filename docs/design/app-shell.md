# App Shell — Sidebar, Top Bar, Dashboard

> **Muat modul ini untuk:** kerja layout global, sidebar/navigasi, top bar/breadcrumb, menu
> pengguna, halaman landing/dashboard. Berisi §6 (shell sidebar-07), §12 (top bar), §13 (landing).
> **Sumber:** CONTEXT §App shell/§Top bar/§Dashboard landing.

---

## 6. App shell — single-tier sidebar-07 (CONTEXT §App shell)

Pola shadcn **sidebar-07** ("collapsible to icons") di Base UI. **Menggantikan sidebar-09
dua-tier** (lihat [ADR 0005](../adr/0005-sidebar-07-collapsible.md) untuk alasan pembalikan).
Primitif dipasang via `npx shadcn add sidebar` (Base UI) — **JANGAN tulis manual**; install ini
turut menambah primitif `collapsible` + `tooltip`.

```
┌────────────────────┬──────────────────────────────────────────┐        collapsed:
│ ▪ Kepegawaian      │ [≡] Master / Sanksi          [avatar ▾]   │ topbar  ┌──┬─────────
│────────────────────│──────────────────────────────────────────│         │ ▪│ …
│ ▾ ◱ MASTER         │  ┌─ Toolbar ──────────────────────────┐   │         │◱ │ Master/…
│      Golongan      │  │ [🔍 cari]              [+ Tambah]   │   │         │  │  ┌─Tool
│      Grade         │  └────────────────────────────────────┘   │         │  │  …ikon
│      Jabatan       │  ┌─ DataTable (header sticky) ────────┐   │         │  │  modul
│      Profesi       │  │ Kode  Keterangan  Parent   [✎] [🗑]│   │         │  │  saja
│      Sanksi …      │  │ …zebra…                            │   │         └──┴─────────
│                    │  └────────────────────────────────────┘   │
└────────────────────┴──────────────────────────────────────────┘
   Sidebar (grup)                 Content (60%)
   collapse → ikon
```

- **Satu sidebar single-tier.** `SidebarHeader` = logo/nama "Kepegawaian" (menciut ke inisial/ikon
  saat collapsed). `SidebarContent` = daftar **grup modul collapsible** (pola `NavMain`).
  `SidebarFooter` kosong — **user menu TETAP di top bar** (§12), tidak pindah ke footer.
- **Modul = grup collapsible; entitas = sub-item.** Tiap modul (master, kepegawaian, …) satu grup
  accordion; entitasnya jadi sub-item teks di bawahnya. **Ikon hanya di baris grup modul**, entitas
  tanpa ikon.
- **Default semua grup yang bisa di-view TERBUKA** (paling ramah lansia — tak ada menu tersembunyi).
  User boleh menutup grup, tapi state buka/tutup grup **TIDAK di-persist**: tiap load balik ke
  semua-terbuka (mencegah lansia "kehilangan" menu permanen).
- **Collapse-to-icon** (seluruh sidebar → rail ikon): default **expanded**; state collapse
  **di-persist** (cookie bawaan `SidebarProvider`, antar sesi). Saat collapsed hanya **ikon modul**
  yang tampil (= rail lama muncul kembali) + tooltip label saat hover. Karena default tak pernah
  berubah sendiri, navigasi tetap konstan untuk user yang tak memilih collapse. **`SidebarTrigger`
  ada di top bar kiri, sebelum breadcrumb** (§12 dilonggarkan: toggle-nav ≠ fitur terlarang).
- **RBAC:** entitas yang tak bisa di-`view` tak dirender sebagai sub-item; **grup modul tanpa
  entitas ter-view sama sekali → tak dirender** (bukan grup kosong). Rilis 1 → sidebar hanya
  menampilkan grup **Master** terbuka; 5 modul lain (kepegawaian/cuti/laporan/penggajian/sistem)
  belum punya entitas → belum muncul (info fitur-mendatang ada di dashboard landing §13, bukan di
  sidebar). Modul otomatis muncul saat entitasnya di-grill & di-wire.
- **60:30:10:** konten = 60% (near-white), sidebar = 30% (netral), Tirta Blue = 10% (modul/entitas
  aktif, tombol primer, focus ring).

**Responsif (WAJIB, bukan afterthought — staff buka di HP):**
- Layar sempit → perilaku **off-canvas bawaan** `sidebar` (Sheet slide-in di balik hamburger =
  `SidebarTrigger`); tap entitas → tutup drawer + navigasi. Konten full-width. Terima bawaan apa
  adanya — satu-satunya tuning: **tinggi baris menu ≥44px** (`SidebarMenuButton`) demi lansia.
- **DataTable degrade anggun:** scroll horizontal di region tabel (toolbar + pagination tetap,
  tak ikut ter-scroll); tap target ≥44px; toolbar combobox + "Tambah" menumpuk vertikal.
- Dialog form tetap usable; Sheet berat → full-width di mobile.
- **Verifikasi ~375px** = acceptance criterion tiap layar. Shell ringan, tanpa animasi nav berat.

---

## 12. Top bar (CONTEXT §Top bar)

Sticky, di atas tiap halaman. Isi: **`SidebarTrigger` (paling kiri) + breadcrumb + menu pengguna
kanan**. **TIDAK ADA** kotak pencarian, lonceng notifikasi, atau toggle tema di rilis 1 — larangan
ini soal *fitur*; `SidebarTrigger` adalah *kontrol layout* (toggle collapse sidebar / hamburger
mobile), bukan fitur, jadi diperbolehkan.

- **`SidebarTrigger`** di ujung kiri: toggle collapse-to-icon di desktop, hamburger off-canvas di
  mobile (perilaku bawaan primitif `sidebar`).
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
