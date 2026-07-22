# Claim Order — Migrasi App Shell ke sidebar-07 (single-tier collapsible)

> Papan pantau **migrasi** untuk agen implementer. Sumber kebenaran status = **beads (`bd`)**,
> bukan file ini. File ini = **urutan claim** + **checklist** biar mudah dibaca sekilas.
> Jangan pakai TodoWrite/markdown lain untuk tracking — pakai `bd`.
>
> Alur per issue: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.
> `bd ready` HANYA memunculkan issue yang blocker-nya tuntas — **selalu tanya `bd ready` dulu**.

**Kenapa migrasi ini ada.** Navigasi lama = **sidebar-09 dua-tier manual** (rail ikon modul +
panel Tier-2 entitas, di-hand-code di `src/components/app-shell.tsx` dengan `<nav>` + `<Sheet>`
sendiri). Diganti ke pola shadcn **sidebar-07 single-tier collapsible-to-icon**:

```
Modul   = grup collapsible (accordion)     ┐ single sidebar
Entitas = sub-item teks di bawah grup      ┘ collapse → rail ikon
```

Pemicu & trade-off (pembalikan "rail tak pernah collapse") terkunci di
[`docs/adr/0005-sidebar-07-collapsible.md`](./adr/0005-sidebar-07-collapsible.md). RBAC sudah
prune menu per user, jadi single-tier tak sesak.

**Parent issue:** `kepegawaian-fe-fkc` (feature) — tutup otomatis saat 4 sub-task closed.

**Desain terkunci** di [`docs/design/app-shell.md`](./design/app-shell.md) §6 (shell) + §12 (top bar)
dan [`docs/design/rbac.md`](./design/rbac.md) §9 (visibilitas). Baca sebelum ngoding.

---

## Prasyarat (baca sebelum ngoding)

1. [`docs/design/app-shell.md`](./design/app-shell.md) §6+§12 — spec shell sidebar-07 terkunci (WAJIB).
2. [`docs/adr/0005-sidebar-07-collapsible.md`](./adr/0005-sidebar-07-collapsible.md) — keputusan & trade-off.
3. [`docs/adr/0004-base-ui-as-shadcn-default.md`](./adr/0004-base-ui-as-shadcn-default.md) — **primitif = Base UI, bukan Radix**; verifikasi prop names ke Base UI docs.
4. [`docs/design/rbac.md`](./design/rbac.md) §9 — aturan penyembunyian sidebar (entitas & grup kosong).
5. [`CONTEXT-MAP.md`](../CONTEXT-MAP.md) §App shell — ringkasan inti + konvensi RBAC.
6. `node_modules/next/dist/docs/` untuk API Next.js (versi ini breaking — jangan asumsi training data).
7. **GitNexus (utamakan ini, bukan grep/find):** `gitnexus_impact` sebelum edit simbol;
   `gitnexus_detect_changes` sebelum commit. **WAJIB pass `repo:"kepegawaian-fe"`**. Index stale → `npx gitnexus analyze` dulu.

---

## Urutan claim

`bd ready` hanya memunculkan issue yang blocker-nya tuntas. Ikuti urutan **berantai** ini (2→3→4 masing-masing di-block pendahulunya).

### 1. `kepegawaian-fe-9uu` — Install primitif shadcn sidebar (Base UI)
**← depends on:** — (ready duluan)

- [ ] Jalankan `npx shadcn add sidebar` — project pakai `style: base-nova` + `@base-ui/react` → output otomatis varian Base UI.
- [ ] Konfirmasi 3 file muncul di `src/components/ui/`: `sidebar.tsx`, `collapsible.tsx`, `tooltip.tsx` (install sidebar menarik collapsible + tooltip).
- [ ] Verifikasi import path = `@base-ui` (bukan `@radix-ui`) & prop names ke **Base UI docs**.
- [ ] **JANGAN sentuh** `app-shell.tsx` di step ini. `npm run build` lolos (primitif ter-import bersih). `bd close`.

### 2. `kepegawaian-fe-1wr` — Tulis ulang `app-shell.tsx` ke struktur sidebar-07
**← depends on:** `9uu`

- [ ] `gitnexus_impact({target:"AppShell", direction:"upstream", repo:"kepegawaian-fe"})` — lapor blast radius (breadcrumb, layout, MODULE_ENTITY_MAP consumer).
- [ ] Bungkus shell dgn `SidebarProvider`; `Sidebar` pakai `collapsible="icon"`.
- [ ] `SidebarHeader` = logo/nama **"Kepegawaian"** (menciut ke inisial/ikon saat collapsed).
- [ ] `SidebarContent`: map `MODULES` → grup `Collapsible` (pola NavMain): `SidebarMenuButton` grup (dengan **ikon lucide**) → `CollapsibleContent` berisi `SidebarMenuSub` entitas (**sub-item teks, TANPA ikon**).
- [ ] `SidebarFooter` **KOSONG**. `UserMenu` **TETAP di top bar** — jangan pindah ke footer.
- [ ] `SidebarTrigger` di top bar **paling kiri, sebelum breadcrumb**. **HAPUS** tombol hamburger manual + `<Sheet>` manual (diganti off-canvas bawaan).
- [ ] **Pertahankan** `export MODULE_ENTITY_MAP` & `RolesProvider`. Breadcrumb + UserMenu top bar tetap.
- [ ] `gitnexus_detect_changes({repo:"kepegawaian-fe"})` + typecheck. `bd close`.

### 3. `kepegawaian-fe-kqw` — Wire RBAC + persist collapse / non-persist grup
**← depends on:** `1wr`

- [ ] **Entitas:** filter `can(roles,"view",e.id)` → gagal = tak dirender sbg sub-item.
- [ ] **Grup modul:** 0 entitas ter-view → grup **TAK dirender sama sekali** (bukan grup kosong). Rilis 1 efektif hanya grup **Master** muncul.
- [ ] **Grup buka/tutup:** default **semua grup ter-view terbuka**; **TIDAK di-persist** (pakai `defaultOpen` Collapsible; jangan simpan ke cookie/localStorage — tiap load balik semua-terbuka).
- [ ] **Collapse-to-icon:** default **expanded**; **DI-persist** via mekanisme cookie bawaan `SidebarProvider` (`sidebar_state`). **Jangan bikin persist manual.**
- [ ] `gitnexus_detect_changes` + typecheck. `bd close`.

### 4. `kepegawaian-fe-11s` — Responsif ≥44px, verifikasi 375px, build+lint
**← depends on:** `kqw`

- [ ] Tinggi baris `SidebarMenuButton` **≥44px** (satu-satunya tuning wajib atas bawaan) demi lansia.
- [ ] Off-canvas mobile = bawaan `sidebar` (Sheet di balik `SidebarTrigger`); tap entitas → tutup drawer + navigasi.
- [ ] DataTable degrade: scroll horizontal region tabel, tap target ≥44px.
- [ ] **Verifikasi manual di viewport ~375px** = acceptance criterion.
- [ ] `npm run build` + lint lolos tanpa error baru. `bd close`.

---

## Definition of Done (tiap issue)

- [ ] Sesuai desain di `docs/design/app-shell.md` §6+§12 & ADR 0005 (bukan improvisasi).
- [ ] Primitif = **Base UI** (ADR 0004); prop names diverifikasi ke Base UI docs, bukan Radix.
- [ ] Baris ≤120; logika ke `src/hooks/`; RBAC via `can()` — tak ada `role === 'admin'` hardcode.
- [ ] `gitnexus_impact` sebelum edit, `gitnexus_detect_changes` sebelum commit — selalu `repo:"kepegawaian-fe"`.
- [ ] Quality gate lolos (`bunx tsc --noEmit`, `bunx biome check`, `npm run build`).
- [ ] `bd close`. **Commit + push = tugas manager saat tutup sesi**, bukan agen.

---

## Invarian yang tak boleh dilanggar

- **Install dari shadcn, JANGAN tulis sidebar manual.** `npx shadcn add sidebar` (Base UI).
- **User menu tetap di top bar**, SidebarFooter kosong.
- **SidebarTrigger di top bar** (kontrol layout ≠ fitur terlarang search/notif/tema di §12).
- **Collapse-to-icon di-persist; buka/tutup grup TIDAK.** Default konstan = jaminan lansia (ADR 0005).
- **Grup modul tanpa entitas ter-view tak dirender** (bukan grup kosong). RBAC via `can()`.
- **Pertahankan `MODULE_ENTITY_MAP`** — breadcrumb & consumer lain bergantung padanya.
