# CLAIM-ORDER — Login Auto-Domain Email

> **Issue:** kepegawaian-fe-n545
> **Grilling date:** 2026-08-19
> **Status:** Ready for implementation

## Summary

Ubah form login agar field email menggunakan textbox biasa. Jika input tidak mengandung `@`, otomatis tambahkan `@{DEFAULT_EMAIL_DOMAIN}` dari environment. Jika sudah ada `@`, kirim apa adanya ke BE.

## Key Decisions

| # | Decision | Choice |
|---|----------|--------|
| 1 | Field type | `type="text"` (bukan `type="email"`) |
| 2 | Email detection | Ada `@` → kirim apa adanya; tidak ada `@` → append domain |
| 3 | Transform location | `onSubmit` di form (sebelum `login.mutate()`) |
| 4 | Env sourcing | `DEFAULT_EMAIL_DOMAIN` di-pass dari server `page.tsx` → prop |
| 5 | Env kosong | Fail fast — tidak render form, tampilkan error |
| 6 | UX transform | Invisible (tidak ada indikasi visual) |
| 7 | Placeholder | `"Masukkan email atau NIPAM"` |

## Claim Order

### Step 1 — `src/app/login/page.tsx`

Baca `process.env.DEFAULT_EMAIL_DOMAIN` di server component. Kalau kosong/null, render error message (bukan form). Kalau ada, pass ke `<LoginForm defaultDomain={...} />`.

```tsx
// Pseudocode
export default function LoginPage() {
  const defaultDomain = process.env.DEFAULT_EMAIL_DOMAIN;
  if (!defaultDomain) {
    return <div>Konfigurasi default email domain belum diatur</div>;
  }
  return <LoginForm defaultDomain={defaultDomain} />;
}
```

**Verify:** `bun run build` — pastikan server component compile.

### Step 2 — `src/app/login/login-form.tsx`

1. Tambah prop `defaultDomain: string` ke `LoginForm`.
2. Ubah Zod schema: `email: z.string().min(1, "Email wajib diisi")` — **hapus** `.email()`.
3. Ubah `<Input type="email">` → `<Input type="text">`.
4. Ubah placeholder ke `"Masukkan email atau NIPAM"`.
5. Tambah transform di `onSubmit`:
   ```tsx
   onSubmit={handleSubmit((data) => {
     const email = data.email.includes("@") ? data.email : `${data.email}@${defaultDomain}`;
     login.mutate({ email, password: data.password });
   })}
   ```

**Verify:** `bun run test` — pastikan tidak ada test login yang break.

### Step 3 — Verify

1. `bun run test` — all green
2. `bun run build` — clean build
3. `bunx biome check` — zero lint errors

## Files Changed

| File | Change |
|------|--------|
| `src/app/login/page.tsx` | Baca env, pass prop, fail-fast check |
| `src/app/login/login-form.tsx` | Schema, type, placeholder, transform, prop |

## Files NOT Changed

| File | Why |
|------|-----|
| `useLogin.ts` | Tetap murni kirim `{ email, password }` |
| Backend | Tidak ada perubahan |
