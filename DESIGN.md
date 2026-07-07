# DESIGN — Kepegawaian FE (Perumdam Tirta Satria) — INDEX

Rujukan desain tunggal untuk **Autentikasi + modul Master** (grilling round 1). Ini **file index
ramping** (progressive disclosure): muat HANYA modul yang relevan dengan task Anda untuk menghemat
token — **jangan** muat semuanya sekaligus. Setiap spec diturunkan dari `CONTEXT.md`,
`docs/color-rationale.md`, dan ADR di `docs/adr/`. **Tidak ada nilai karangan.**

> **Sifat dokumen:** rujukan desain, bukan kode. Nilai OKLCH = **baseline**, boleh di-fine-tune
> **ASAL lolos gate kontras** (visual-foundation.md §2). Sebelum menulis kode: baca
> [coding-rules.md](./docs/design/coding-rules.md), verifikasi prop ke **Base UI** (bukan Radix),
> dan baca `node_modules/next/dist/docs/`.

---

## Cara pakai (untuk agen implementasi)

1. **Selalu** baca dulu [`docs/design/coding-rules.md`](./docs/design/coding-rules.md) — aturan dasar coding (wajib).
2. **Hampir selalu** baca [`docs/design/visual-foundation.md`](./docs/design/visual-foundation.md) — palet/token, gate aksesibilitas, tipografi dipakai lintas UI.
3. Muat **hanya** modul domain yang menyentuh task Anda dari peta di bawah.

## Peta modul (§ → file)

| Modul | §  | Muat untuk |
|---|---|---|
| [architecture.md](./docs/design/architecture.md) | §0, §17, §18, §19 | Orientasi awal: stack terkunci, endpoint & taxonomy 22 entitas, strategi file, Base UI vs Radix, peta ketertelusuran |
| [visual-foundation.md](./docs/design/visual-foundation.md) | §1, §2, §3 | **Setiap** pekerjaan UI: palet/token OKLCH, checklist aksesibilitas lansia, tipografi Inter |
| [auth-proxy.md](./docs/design/auth-proxy.md) | §4 | Auth, `proxy.ts`, sesi/JWT, proteksi rute, session expiry, kontrak status 401/403/409 |
| [data-fetching.md](./docs/design/data-fetching.md) | §5 | TanStack Query v5, query keys, invalidation, memory guardrails |
| [app-shell.md](./docs/design/app-shell.md) | §6, §12, §13 | Layout global: sidebar-09 dua-tier, top bar/breadcrumb, landing/dashboard |
| [list-and-tables.md](./docs/design/list-and-tables.md) | §7, §8, §11 | Halaman daftar, `<DataTable>`/toolbar/pagination, sticky header, table states, filtering, delete dialog, entitas tree |
| [forms.md](./docs/design/forms.md) | §10 | Form CRUD apa pun: `<CrudForm>` RHF+Zod, Dialog vs Sheet, heavy-form sanksi/profesi |
| [rbac.md](./docs/design/rbac.md) | §9 | Otorisasi: `can()`, `<Can>`, `permissions.ts`, aturan unmount |
| [login-and-profile.md](./docs/design/login-and-profile.md) | §14, §15 | Halaman `/login` (brand + animasi air) & `/profil` (info akun + ganti password) |
| [notifications.md](./docs/design/notifications.md) | §16 | Konvensi toast sonner vs UI inline |

> **Penomoran §1–§19 stabil** lintas file — referensi silang seperti "(§9)" atau "(Delete UX §8)"
> tetap valid; gunakan tabel di atas untuk memetakan § ke file. Peta ketertelusuran § → sumber
> CONTEXT/ADR ada di [architecture.md](./docs/design/architecture.md) (Lampiran).

## Dokumen sumber (baca bila butuh dasar keputusan)

- `CONTEXT.md` — ubiquitous language + semua keputusan yang sudah diresolusi (sumber kebenaran; DESIGN diturunkan darinya).
- `docs/color-rationale.md` — justifikasi WCAG/mata-lansia untuk tiap nilai OKLCH.
- `docs/adr/0001-jwt-minted-and-forwarded-in-proxy.md` — pola `proxy.ts` + 4 hardening.
- `docs/adr/0002-react-hook-form-zod-for-crud-forms.md` — pilihan RHF+Zod via `<CrudForm>`.
