# Claim order — UI src/app redesign

Issue: `kepegawaian-fe-7kmr`

## Guardrail

- Internal SIMPEG, bukan landing page publik: optimasi keterbacaan, navigasi, state, dan konsistensi.
- Pengguna banyak lansia: body 16px, tap target ≥44px, kontras tinggi, focus ring jelas.
- `Inter` tetap; jangan ganti font karena `CONTEXT-MAP.md` mengunci legibilitas.
- Warna hanya via token Tailwind/shadcn. Jangan hardcode hex/OKLCH di komponen.
- Jangan edit manual `src/components/ui/*`.
- Jangan tambah stat palsu, chart kosong, widget dekoratif, atau motion berat.
- Animasi maksimal CSS ringan yang hormat `prefers-reduced-motion`.

## Context wajib dibaca

- `CONTEXT-MAP.md`
- `docs/context/master.md`
- `docs/context/kepegawaian.md`
- `docs/design/coding-rules.md`
- `docs/design/visual-foundation.md`
- `docs/design/app-shell.md`

## Claim order

### 1. Foundation audit/fix

Files:

- `src/app/globals.css`
- `src/app/layout.tsx`

Checklist:

- [ ] Pastikan token light/dark konsisten dan tetap pakai Evergreen saat ini, kecuali ada keputusan eksplisit pindah ke Tirta Blue.
- [ ] Pastikan `text-sm` = 16px, body `--text-body`, dan tap target global tidak merusak layout.
- [ ] Pastikan skip-link ada dan tidak pakai z-index acak selain kebutuhan aksesibilitas.
- [ ] Jangan tambah dependency/font.

### 2. Shell pass

Files:

- `src/components/app-shell.tsx`
- `src/components/user-menu.tsx` bila perlu

Checklist:

- [ ] Sidebar row tetap ≥44px, active state jelas, tidak hanya warna.
- [ ] Topbar breadcrumb readable di mobile dan desktop.
- [ ] Footer sidebar tidak mengganggu collapse/icon mode.
- [ ] Tidak tambah search/notification feature tanpa backend.

### 3. Table surface pass

Files:

- `src/components/data-table.tsx`
- `src/components/data-table-toolbar.tsx`
- `src/components/data-table-pagination.tsx`

Checklist:

- [ ] Header sticky solid, zebra/hover jelas, table region scroll sendiri.
- [ ] Toolbar stack rapi di 375px.
- [ ] Pagination readable: label Indonesia, tombol punya aria-label, select cukup besar.
- [ ] Empty/error/loading tetap ringan; no Lottie/illustration bundle.
- [ ] Action icon area ≥44px, label/title Indonesia.

### 4. Form surface pass

Files:

- `src/components/crud-form.tsx`
- `src/app/login/login-form.tsx`
- `src/app/(app)/profil/change-password-form.tsx`
- modal/sheet wrappers di `src/app/(app)/master/*` bila perlu

Checklist:

- [ ] Label 16px, input ≥44px, errors pakai `aria-describedby` bila disentuh.
- [ ] Password reveal button area ≥44px.
- [ ] Submit error inline; toast hanya mutation success/error.
- [ ] Footer form tetap reachable.

### 5. Landing/login/profil pass

Files:

- `src/app/login/page.tsx`
- `src/app/(app)/page.tsx`
- `src/app/(app)/profil/page.tsx`
- `src/app/not-found.tsx`

Checklist:

- [ ] Hilangkan komentar dekoratif bila menyentuh file.
- [ ] Copy Indonesia jelas, tanpa jargon AI/marketing.
- [ ] Kartu hanya dipakai saat hierarchy perlu; jangan tambah count palsu.
- [ ] Mobile 375px tidak overflow.

### 6. Page-specific pass

Files:

- `src/app/(app)/kepegawaian/**`
- `src/app/(app)/cuti/**`
- `src/app/(app)/sistem/**`

Checklist:

- [ ] Hanya polish yang belum tercakup shared surfaces.
- [ ] Jangan rewrite flows/data hooks.
- [ ] Jangan resolve bug out-of-scope; buat issue baru.

## Required checks

- [ ] `bunx biome check`
- [ ] `bun run test`
- [ ] `bun run build`
- [ ] Verify browser golden paths: login, landing, master list/form/delete, kepegawaian dashboard, cuti page, profil page, sistem users/roles if permitted.
- [ ] Verify viewport ~375px.
- [ ] `npx gitnexus analyze`
- [ ] `npx gitnexus detect-changes -s unstaged -r kepegawaian-fe`
- [ ] `/graphify . --update`

## Notes

Redesign skill suggestions that conflict with repo context are rejected here: font swap, GSAP/heavy motion, fake stats, public-landing visual gimmicks. This app optimizes trust, speed, and readability.
