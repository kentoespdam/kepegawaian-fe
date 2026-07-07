# Autentikasi & `proxy.ts`

> **Muat modul ini untuk:** kerja auth, `proxy.ts`, sesi, JWT, proteksi rute, session expiry,
> login/logout flow, kontrak status code. Berisi §4.
> **Sumber:** CONTEXT §Identity bridge/§Route protection/§Session expiry/§Auth scope + ADR 0001.
> **⚠️ `proxy.ts` = single point of failure semua trafik API — review & test paling ketat di app.**

---

## 4. Autentikasi & `proxy.ts` (ADR 0001, CONTEXT §Identity bridge/Route protection/Session expiry)

### 4.1 Identity bridge — satu `proxy.ts` (pola mail-fe)

Ada **SATU** proxy: `proxy.ts` (rename dari `middleware.ts` di Next 16; `export default
function proxy()`; **Node.js runtime**). Dua tugas: (1) route guard, (2) data forwarding
`/api/proxy/*` → Backend via `rewrite` dengan `Bearer` di-attach server-side. **Tidak ada**
lapisan `app/api/**/route.ts`.

**Dua cookie:**
- `mail_session`-equiv = sesi Appwrite terenkripsi (JWE) — sumber kebenaran.
- `token` = httpOnly cookie berisi Appwrite JWT saat ini, `maxAge` dari `exp` JWT.

**Hot path (~99%, nol network):** baca cookie `token` → decode `exp` (base64, TANPA verify
tanda tangan, TANPA panggil Appwrite) → jika valid melewati refresh buffer → attach `Bearer`
+ `rewrite`. Pure CPU.

**Cold path (~1×/masa-JWT/user):** `token` hilang/mendekati-expiry → dekripsi `mail_session`
→ `POST /v1/account/jwt` → `Set-Cookie: token`. ~4 mint/jam/user = ~0.07% rate-limit Appwrite.

**Dedup cache:** `Map` in-memory TTL ~5s untuk collapse dekripsi/mint konkuren (mis. dashboard
memukul beberapa endpoint), dibersihkan via `event.waitUntil`.

**4 hardening (ADR 0001) — WAJIB:**
1. **Pin Node.js runtime** (JWE `compactDecrypt` butuh Node) — verifikasi saat setup.
2. **`try/catch` fail-safe** — mint gagal → redirect `/login`, JANGAN 500 (semua trafik API
   lewat sini; throw tak terjaga = semua API tumbang serentak).
3. **Hapus cookie `token` saat logout** (bukan cuma sesi) — cegah replay JWT sampai 1 masa-JWT.
4. **Refresh buffer ≈30s + mint `duration: 3600`** — buffer 30s lindungi request lambat;
   mint 1 jam → 4× lebih jarang cold path.

> **Blast radius:** `proxy.ts` = single point of failure untuk semua trafik API. WAJIB review
> & test paling ketat di seluruh app.

### 4.2 Proteksi rute — dua lapis

- **Layer 1 — `proxy.ts`:** navigasi halaman → cek keberadaan cookie sesi, redirect `/login`
  bila hilang (dan redirect user ter-auth menjauh dari `/login`). Request `/api/proxy/*` →
  **otoritatif**: tanpa sesi valid ⇒ tak ada JWT ⇒ `rewrite` tak bawa `Bearer` ⇒ Backend tolak.
- **Layer 2 — DAL `verifySession()`:** `account.get()` di server, dibungkus React `cache()`
  (dedup per-request), dipanggil di puncak SETIAP protected server component sebelum render;
  gagal → `unauthorized()`/redirect. Cek peran → `forbidden()`.

### 4.3 Session expiry mid-use — dua expiry, dua perilaku

- **JWT (`token`) expired → refresh senyap di `proxy.ts`** (cold path). Browser lihat **satu
  200 normal** — tanpa toast/redirect. Kasus umum.
- **Sesi Appwrite (`mail_session`) expired/dicabut → toast + redirect `/login`.** Cold path
  gagal mint (sesi hilang / JWE gagal / Appwrite tolak) → `proxy.ts` balas `/api/proxy/*`
  dengan **401** (navigasi halaman → redirect `/login` per Layer 1).
- **Handler 401 client (terpusat, SATU tempat):** di QueryClient (`QueryCache`/`MutationCache`
  `onError`) → satu toast tenang **"Sesi berakhir, silakan masuk kembali"** (dedup via flag agar
  tak menumpuk) → clear Query cache → redirect **`/login?next=<pathname+search>`**. Setelah login
  sukses → kembali ke URL persis itu (filter tabel ada di URL → konteks terjaga). BUKAN per-`useQuery`.

### 4.4 Kontrak status code (TERKUNCI)

| Status | Arti | Aksi |
|---|---|---|
| **401** | Sesi hilang | Toast + `/login?next=` (§4.3) |
| **403** | Ter-auth tapi tak berwenang | Halaman `forbidden` (RBAC §9) — JANGAN bounce login |
| **409** | Konflik data (mis. hapus dengan dependent) | Inline di dialog (Delete UX §8) |

### 4.5 Scope auth rilis 1

**In:** `/login` (email+password → Appwrite → cookie sesi httpOnly), logout, proteksi rute,
ganti password di `/profil`. **Out:** self-registration (akun dibuat admin/HR), forgot-password
email reset (ditunda). Ganti-password bisa pindah ke modul `sistem` nanti; kini di `/profil`.
