# 6. Identitas sesi → record pegawai (`$id = pegawaiId`, augmentasi opt-in)

Date: 2026-07-22
Status: Accepted

## Konteks

Modul kepegawaian butuh menghubungkan identitas login (Appwrite) ke record pegawai agar Dashboard
Pegawai bisa menampilkan data diri (kepegawaian, riwayat, biodata, keluarga, slip gaji). Beberapa
endpoint keyed by `pegawaiId` (`$id`), sebagian by `nik` (biodata/keluarga), sebagian butuh `nipam`.

Dua asumsi awal ditinjau ulang selama grilling:

1. **"`$id` = nipam"** → **dikoreksi**: `session.$id` **= `pegawaiId`** langsung.
2. **"nipam = prefix email sebelum `@`"** → **ditolak**. `GET /pegawai/{$id}` mengembalikan
   `PegawaiResponseDetail` yang **sudah** memuat `nipam` (field) **dan** `biodata.nik` (field).
   Menurunkan nipam dari email berarti berasumsi email = `{nipam}@domain` — kalau email
   `budi@corp.id` tapi nipam `2019.0451`, prefix email **salah**. Data master adalah sumber otoritatif.

Ketegangan tambahan: `verifySession()` dipanggil di **puncak setiap** server component terproteksi
(React `cache()`-wrapped, saat ini 1 round-trip ke `GET /v1/account`). Menambahkan fetch pegawai
di dalamnya membebani **semua** halaman — termasuk yang tak butuh data pegawai (master, cuti, dll).

## Keputusan

**`session.$id` = `pegawaiId`, dipakai langsung.** `nipam` + `nik` diambil dari `GET /pegawai/{$id}`
(`.nipam`, `.biodata.nik`) — **bukan** dari prefix email. Derivasi email dibuang.

**Augmentasi pegawai jadi opt-in lewat fungsi terpisah**, bukan diperluas ke `verifySession()`:

- `verifySession()` **tetap murni** — 1-fetch identitas Appwrite, dipakai semua halaman.
- Fungsi baru **`getPegawaiSession()`** (`src/lib/auth/pegawaiSession.ts`), juga `cache()`-wrapped:
  memanggil `verifySession()` lalu `GET /pegawai/{$id}`. Hanya page kepegawaian yang memanggilnya →
  fetch kedua **hanya saat perlu**.
- Bentuk return: `{ user: AppwriteUser; pegawai: PegawaiResponseDetail | null; nipam: string | null;
  nik: string | null }`. `GET /pegawai/{$id}` 404 → `pegawai: null` → **empty-state** (akun
  non-pegawai, mis. admin murni), bukan error.

## Konsekuensi

**Positif.**
- Satu sumber kebenaran nipam/nik (data master), tanpa asumsi konvensi email yang rapuh.
- `verifySession()` tetap murah untuk ~90% halaman; hanya kepegawaian bayar fetch kedua.
- Toleransi non-pegawai menyatu bersih dengan empty-state (tak ada jalur error khusus).
- `cache()` men-dedup fetch pegawai dalam satu render.

**Negatif / trade-off yang diterima.**
- Dua fungsi sesi (`verifySession` vs `getPegawaiSession`) — pemanggil harus tahu mana yang dipakai.
  Diterima demi tak membebani halaman non-kepegawaian.
- `$id = pegawaiId` **mengikat** skema penamaan akun Appwrite ke id backend. Kalau kelak akun dibuat
  tanpa menyetel `$id = pegawaiId`, bridge putus. Diterima karena penyediaan akun sudah dikontrol
  internal; empty-state menampung akun yang bukan pegawai.

**Tinjau ulang jika:** penyediaan akun berubah sehingga `$id` tak lagi dijamin = pegawaiId (maka
butuh lookup by nipam via `/pegawai/{nipam}/nipam` sebagai fallback), atau banyak halaman non-kepegawaian
ternyata butuh nik/nipam (maka pertimbangkan pindah augmentasi ke `verifySession` atau cache di prefs).

File terkait:
- `src/lib/auth/pegawaiSession.ts` — fungsi baru (ditulis oleh agent eksekusi)
- `src/lib/auth/verifySession.ts` — tetap tak berubah (tetap murni)
- `docs/context/kepegawaian.md` — pemakaian di 3 page
- `docs/context/pegawai.md` — resource yang dikonsumsi
