# CONTEXT — Kepegawaian FE (Perumdam Tirta Satria) — REDIRECT

> **Dokumen ini sudah dipecah (multi-context).** Isi lama (ubiquitous language + semua keputusan
> yang sudah diresolusi untuk Autentikasi + Master) kini terbagi dua supaya tidak "meledak" saat
> modul berikutnya (kepegawaian, riwayat, cuti, penggajian, laporan, sistem) mulai di-grill:
>
> 1. **[`CONTEXT-MAP.md`](CONTEXT-MAP.md)** — **inti** (selalu dibaca): glossary, konvensi
>    endpoint generik `/{module}/{entity}`, dan SEMUA keputusan lintas-modul (auth/proxy, data
>    fetching, RBAC, app shell, tabel, form, delete, tema, dsb.). **Baca ini dulu.**
> 2. **[`docs/context/<modul>.md`](docs/context/)** — **delta per-modul** (dibaca on-demand bila
>    task menyentuh modul itu). Round 1: **[`docs/context/master.md`](docs/context/master.md)**.
>
> Bila file per-modul belum ada, lanjut dengan inti saja. ADR sistem tetap di
> [`docs/adr/`](docs/adr/). DESIGN.md tetap index §1–§19 tunggal (belum dipecah).

## Peta seksi lama → lokasi baru

Referensi silang berformat "CONTEXT §Nama-seksi" tetap valid — cari namanya di tabel ini.

| Seksi lama (CONTEXT.md) | Lokasi baru |
|---|---|
| Glossary | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — Glossary |
| Naming — "proxy" means one thing | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — Naming |
| Endpoint conventions | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### Endpoint conventions` (generik `/{module}/{entity}`) + prefix `/master` di [`master.md`](docs/context/master.md) |
| Entity taxonomy (Master) | [`docs/context/master.md`](docs/context/master.md) — Entity taxonomy |
| Identity bridge (JWT + 4 hardening) | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### Identity bridge` |
| Auth scope | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### Auth scope` |
| Route protection — two layers | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### Route protection` |
| Session expiry mid-use | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### Session expiry` |
| Data fetching + memory guardrails | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### Data fetching` |
| Accessibility & contrast | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### Accessibility & contrast` |
| Typography | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### Typography` |
| List-screen anatomy + sticky header | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### List-screen anatomy` |
| Table states | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### Table states` |
| Master build strategy | [`docs/context/master.md`](docs/context/master.md) — Master build strategy |
| CRUD form presentation | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### CRUD form presentation` |
| DataTable filtering | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### DataTable filtering` |
| Delete UX | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### Delete UX` |
| Tree entities | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### Tree entities` (pola) + entitas tree Master di [`master.md`](docs/context/master.md) |
| Parent picker in form | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### Parent picker` (pola) + penerapan Master di [`master.md`](docs/context/master.md) |
| RBAC | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### RBAC` |
| App shell — two-tier sidebar | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### App shell` |
| Theming + palette | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### Theming` |
| Top bar | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### Top bar` |
| Form engine (RHF + Zod) | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### Form engine` |
| Heavy-form layout | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### Heavy-form layout` (pola) + sanksi/profesi di [`master.md`](docs/context/master.md) |
| Notifications | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### Notifications` |
| Dashboard landing | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### Dashboard landing` (pola) + 17 kartu di [`master.md`](docs/context/master.md) |
| Login page | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### Login page` |
| Profile page | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### Profile page` |
| UI component base (Base UI) | [`CONTEXT-MAP.md`](CONTEXT-MAP.md) — `### UI component base` |

> **Riwayat versi tunggal:** isi asli file ini ada di git history (sebelum pemecahan multi-context,
> bd `kepegawaian-fe-fs6`).
