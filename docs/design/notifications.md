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

### Form-sheet mutation failure — double channel (toast + inline root)

Untuk **sheet/dialog form** (edit-profil, edit-gaji, tambah pegawai, riwayat kontrak/mutasi/SP/SK,
change-password), gagal simpan (POST/PUT/PATCH) memakai **dua kanal sekaligus** dengan pesan yang
sama:

| Kanal | Peran | Catatan |
|---|---|---|
| `toast.error(msg)` | Global, bottom-right | Merah, **manual dismiss** (tetap sampai ditutup), reason Backend bila ada |
| `setError("root", { message: msg })` | Kontekstual di dalam form | Render `errors.root` dekat tombol simpan; tetap terlihat selama sheet terbuka |

Bukan redundan: toast = peringatan global yang tidak hilang sampai ditutup; inline root = konteks
di titik aksi (form tidak tertutup, user langsung melihat pesan di tempat). Keduanya memakai literal
pesan yang sama.

Pola baku (try/catch submit):

```ts
} catch (e: unknown) {
	const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
	toast.error(msg);
	setError("root", { message: msg });
}
```

Variasi `change-password-form.tsx`: kanal sama lewat `useMutation` `onError` (bukan try/catch) —
`toast.error(e.message)` + `setError("root", ...)`; `e.message` aman karena TanStack Query mengetik
`e` sebagai `Error` dan hook selalu `throw new Error(...)`.

Tetap berlaku: **muat data gagal** BUKAN toast (inline saja, §7.4); 409 delete tetap inline di
dialog (§8); satu toast per aksi — jangan tambah toast lain dalam satu submit.
