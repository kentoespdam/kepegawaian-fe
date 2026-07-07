# Notifikasi — Satu Sonner Toaster

> **Muat modul ini untuk:** keputusan kapan memakai toast vs UI inline, konvensi sonner.
> Berisi §16.
> **Sumber:** CONTEXT §Notifications. Terkait: table states inline di [list-and-tables.md](./list-and-tables.md) §7.4.

---

## 16. Notifikasi — satu Sonner toaster (CONTEXT §Notifications)

Satu global `<Toaster>` (**sonner**, Base UI-compatible, ringan) di root layout, **bottom-right**.
Toast HANYA untuk **hasil aksi (mutation)**, tak pernah untuk status muat data.

| Kejadian | Toast |
|---|---|
| Sukses create/update/delete (200) | Hijau + check, **auto-dismiss ≈3s** ("Tersimpan"/"Terhapus") |
| Aksi (mutation) gagal | Merah, **manual dismiss** (tetap sampai ditutup), pakai reason Backend bila ada |
| **Muat data gagal** | **BUKAN toast** → panel "Coba lagi" inline di region tabel (§7.4) |

**Rule of thumb:** toast = feedback *hal yang baru user lakukan*; inline UI = status *data yang
ditampilkan*. Cegah toast flood. 409 Delete tetap inline di dialog (§8).
