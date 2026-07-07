# docs/design — Rujukan Desain Modular

Spesifikasi DESIGN dipecah per-domain untuk **lazy-load** (progressive disclosure): agen
implementasi memuat **hanya** file yang relevan dengan task → hemat token, hindari context rot.

**Mulai dari:** [`../../DESIGN.md`](../../DESIGN.md) (index + cara pakai) lalu
[`coding-rules.md`](./coding-rules.md) (aturan wajib coding).

| File | § | Isi ringkas |
|---|---|---|
| [coding-rules.md](./coding-rules.md) | — | Aturan dasar coding (WAJIB dibaca lebih dulu) |
| [architecture.md](./architecture.md) | §0, §17–§19 | Stack, endpoint & taxonomy, build strategy, Base UI, peta ketertelusuran |
| [visual-foundation.md](./visual-foundation.md) | §1–§3 | Palet/token OKLCH, aksesibilitas lansia, tipografi |
| [auth-proxy.md](./auth-proxy.md) | §4 | Auth, `proxy.ts`, sesi/JWT, proteksi rute, kontrak status |
| [data-fetching.md](./data-fetching.md) | §5 | TanStack Query v5 + memory guardrails |
| [app-shell.md](./app-shell.md) | §6, §12, §13 | Sidebar-09, top bar, landing |
| [list-and-tables.md](./list-and-tables.md) | §7, §8, §11 | DataTable, delete UX, tree entities |
| [forms.md](./forms.md) | §10 | `<CrudForm>` RHF+Zod, heavy-form |
| [rbac.md](./rbac.md) | §9 | `can()`, `<Can>`, permissions map |
| [login-and-profile.md](./login-and-profile.md) | §14, §15 | Login & profil |
| [notifications.md](./notifications.md) | §16 | Konvensi sonner |

> Penomoran §1–§19 sengaja dipertahankan sebagai anchor stabil lintas file agar referensi silang
> tetap valid. Sumber tiap § (CONTEXT/ADR) → lihat Lampiran di [architecture.md](./architecture.md).
