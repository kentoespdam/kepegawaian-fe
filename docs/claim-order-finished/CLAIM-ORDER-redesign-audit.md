# Claim Order — Redesign Audit Fixes (a11y + login animation + 404)

> Papan pantau untuk agen implementer. Sumber kebenaran status = **beads (`bd`)**,
> bukan file ini. File ini = **urutan claim** + **checklist** biar mudah dibaca sekilas.
> Jangan pakai TodoWrite/markdown lain untuk tracking — pakai `bd`.
>
> Alur: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.

**Sumber:** Redesign audit 2026-08-19 — audit checklist redesign skill terhadap
codebase yang sudah ada design system locked.

**Prioritas:** C1-C3 dari audit (Critical/High accessibility + broken feature).

---

## Prasyarat (baca sebelum ngoding)

1. `CONTEXT-MAP.md` — §Login page (animasi air), §Accessibility & contrast, §Typography.
2. `docs/design/coding-rules.md` — §4 (styling & design tokens).
3. `docs/design/visual-foundation.md` — §2 (checklist aksesibilitas).
4. `docs/design/login-and-profile.md` — §14 (login page spec, animasi water).
5. GitNexus — `gitnexus_impact` sebelum edit; `gitnexus_detect_changes` sebelum commit.

---

## Peta ketergantungan

```
kepegawaian-fe-7ocu  login animation fix + reduced-motion (no dependency)
      │
kepegawaian-fe-g1t0  skip-to-content link (independent — different files)
      │
kepegawaian-fe-6oev  custom 404 page (independent — new file)
```

`bd ready` memunculkan issue yang blocker-nya tuntas. **Kerjakan `7ocu` dulu** (fix
broken feature + a11y, 1 file), lalu `g1t0` dan `6oev` (independent, bisa paralel).

---

## Urutan claim

### 1. `kepegawaian-fe-7ocu` — Fix broken water animation + reduced-motion (BUG+A11Y, P1)
**← depends on:** — (ready)

- [ ] Baca `docs/design/login-and-profile.md` §14.1 (spec animasi air).
- [ ] Baca `src/app/globals.css` — verifikasi `@keyframes water` ada tapi `--animate-water`
      tidak ada di `@theme`.
- [ ] Tambah `--animate-water: water 16s ease-in-out infinite;` ke `@theme inline` block
      di `globals.css`.
- [ ] Tambah `@media (prefers-reduced-motion: reduce)` override setelah `@keyframes water`:
      ```css
      @media (prefers-reduced-motion: reduce) {
        .animate-water {
          animation: none;
        }
      }
      ```
- [ ] Verifikasi: login page brand panel menampilkan gradient drift animation.
- [ ] Verifikasi: toggle `prefers-reduced-motion: reduce` di devtools → gradient statis.
- [ ] `gitnexus_impact` sebelum edit; `gitnexus_detect_changes` sebelum commit.
- [ ] `bun run build` lolos + `bunx biome check` zero error.
- [ ] `bd close kepegawaian-fe-7ocu`.

### 2. `kepegawaian-fe-g1t0` — Tambah skip-to-content link (A11Y, P1)
**← depends on:** — (ready, independent)

- [ ] Baca `src/app/layout.tsx` — identifikasi posisi insert (sebelum `<Providers>`).
- [ ] Baca `src/components/app-shell.tsx` — identifikasi div konten utama.
- [ ] Tambah skip link di `layout.tsx`:
      ```tsx
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lg"
      >
        Langsung ke konten
      </a>
      ```
- [ ] Tambah `id="main-content"` + `tabIndex={-1}` ke div konten di `app-shell.tsx`.
- [ ] Verifikasi: Tab dari awal halaman → skip link visible on focus → Enter →
      fokus ke konten, skip sidebar.
- [ ] `gitnexus_impact` pada `AppShell` + `RootLayout` sebelum edit.
- [ ] `bun run build` lolos + `bunx biome check` zero error.
- [ ] `bd close kepegawaian-fe-g1t0`.

### 3. `kepegawaian-fe-6oev` — Buat custom not-found page (FEATURE, P2)
**← depends on:** — (ready, independent)

- [ ] Buat `src/app/not-found.tsx` — server component.
- [ ] Isi: ikon `FileX2`, heading "Halaman tidak ditemukan", deskripsi, tombol
      "Kembali ke Beranda" → `<Link href="/">`.
- [ ] Style: bg-background, text-foreground, token OKLCH (matching design system).
- [ ] Verifikasi: akses `/path-tidak-ada` → tampil branded 404.
- [ ] Tombol navigasi ke `/` berfungsi.
- [ ] `bun run build` lolos.
- [ ] `bd close kepegawaian-fe-6oev`.

---

## Definition of Done

- [ ] Login brand panel animasi air berfungsi (gradient drift ~16s).
- [ ] `prefers-reduced-motion: reduce` → gradient statis, no animation.
- [ ] Skip-to-content link: visible on focus, skip sidebar, lands on main content.
- [ ] Custom 404 page branded dengan navigasi kembali.
- [ ] `bun run build` hijau.
- [ ] `bunx biome check` zero error.
- [ ] `bun run test` all green.
- [ ] Semua issues di-beads sudah `CLOSED`.
- [ ] Git push sukses.
