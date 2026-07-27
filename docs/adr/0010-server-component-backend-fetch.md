# 10. Server component fetch backend langsung (mint di server, reuse cookie `token`)

Date: 2026-07-27
Status: Accepted

## Konteks

`getPegawaiSession()` (ADR-0006) adalah **fetch data server-side pertama** di codebase ini.
Semua panggilan `/api/proxy/*` lain berjalan client-side (`useQuery`), di mana URL relatif
resolve ke origin browser dan cookie sesi ter-attach otomatis. Agen eksekusi ADR-0006 menyalin
pola itu ke konteks server:

```ts
const res = await fetch(`/api/proxy/pegawai/${user.$id}`);   // URL relatif, di server
```

Ini **selalu gagal** — dua kegagalan independen, salah satu saja fatal:

1. **URL relatif di server** — `fetch` Node tak punya origin untuk me-resolve `/api/proxy/...`
   → `throw` → masuk `catch` → `pegawai: null`.
2. **Cookie tak diteruskan** — `/api/proxy/*` dilayani `src/proxy.ts` (Next.js **middleware**,
   bukan route handler). Fetch telanjang tak membawa cookie sesi → `resolveToken` di middleware
   tak menemukan sesi → **401** → `!res.ok` → `pegawai: null`.

Akibatnya Dashboard **selalu** merender empty-state "Akun ini tidak terhubung ke data pegawai",
persis seperti akun non-pegawai — bug diam yang tampak seperti "fitur belum jalan".

Middleware `/api/proxy` dirancang untuk request HTTP nyata lewat edge. Server component tidak
lewat edge; ia butuh jalur sendiri ke backend.

## Keputusan

**Server component memanggil backend Spring Boot LANGSUNG** (`BACKEND_URL`), bukan lewat
`/api/proxy`. Mencerminkan cara `fetchAccount()` sudah bicara langsung ke Appwrite.

**Sumber JWT: reuse cookie `token` dulu (hot path), mint hanya kalau kadaluarsa.** Logika ini
sudah ada persis di `resolveToken()` (`proxy.ts`) → **diekstrak** ke `appwriteSession.ts` (pemilik
identitas sesi), dipakai dua tempat. Menghapus duplikasi, bukan menambah kode.

Alur di `getPegawaiSession()`:

1. `verifySession()` (identitas Appwrite, tak berubah).
2. Baca sesi via `cookies()` + `readSession`; ambil JWT via `resolveToken` yang diekstrak
   (decode `exp` cookie `token`, valid → pakai; kadaluarsa/kosong → `mintJWT`).
3. `fetch(\`${BACKEND_URL}/pegawai/${id}\`, { headers: { Authorization: \`Bearer ${jwt}\` } })`.
4. 404/!ok/throw → `pegawai: null` → empty-state (kontrak ADR-0006 tetap).

## Konsekuensi

**Positif.**
- Empty-state kembali berarti "akun bukan pegawai" saja, bukan menutupi kegagalan transport.
- Tanpa self-HTTP hop ke middleware sendiri; tanpa rekonstruksi origin (dev `localhost:3000`
  vs domain prod).
- `resolveToken` jadi milik satu modul; `proxy.ts` jadi thin caller — konsisten dengan
  ADR-0001 (Appwrite Session module memiliki primitive identitas).
- Hot path nol-network saat cookie `token` masih valid.

**Negatif / trade-off yang diterima.**
- **Server component tak bisa `set` cookie.** Di cold path (token kadaluarsa), mint token baru
  **tak bisa dipersist balik** ke cookie dari dalam server component. Efek: pada window
  kadaluarsa, Dashboard mint baru **tiap render** sampai request proxy client-side berikutnya
  (section Dashboard pakai `useQuery` → lewat middleware) me-refresh cookie `token`.
  Diterima karena: (a) Dashboard selalu memicu fetch client-side yang me-refresh cookie hampir
  seketika setelah render pertama; (b) `mintCache` (TTL 5s) sudah men-dedup ledakan mint per-sesi.
  Ditandai `ponytail:` di kode.

**Tinjau ulang jika:** banyak server component lain butuh fetch backend (maka pertimbangkan
helper `serverFetch(path)` bersama yang membungkus resolve-JWT + `BACKEND_URL`), atau window
mint-tiap-render terbukti membebani Appwrite (maka persist token via route handler / server action).

File terkait:
- `src/lib/auth/appwriteSession.ts` — tujuan ekstrak `resolveToken` + `REFRESH_BUFFER`
- `src/proxy.ts` — jadi thin caller `resolveToken`
- `src/lib/auth/pegawaiSession.ts` — fetch backend langsung (diperbaiki oleh agen eksekusi)
