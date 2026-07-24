# Claim Order — Scroll-X bocor ke page (tabel terpotong & UserMenu hilang)

> Papan pantau untuk agen implementer. Sumber kebenaran status = **beads (`bd`)**,
> bukan file ini. File ini = **urutan claim** + **checklist** biar mudah dibaca sekilas.
> Jangan pakai TodoWrite/markdown lain untuk tracking — pakai `bd`.
>
> Alur: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.

**Kenapa issue ini ada.** Scrollbar horizontal muncul di **seluruh page**, bukan di kartu tabel.
Akibatnya (1) tabel terpotong di tepi kanan, dan (2) saat sidebar **expand**, konten tergeser
melewati viewport sehingga **UserMenu di pojok kanan atas ikut terpotong/hilang**. Tiga gejala,
**satu akar**.

**Akar.** Rantai flex shell tak bisa menyusut. `SidebarProvider` (flex, w-full) →
`SidebarInset` (flex-1) → div konten (flex-1) → kartu tabel. Dua flex-child tengah **tak punya
`min-w-0`**, jadi default `min-width:auto` — menolak mengecil di bawah lebar intrinsik isinya.
Sel tabel `whitespace-nowrap` (`data-table.tsx:249`) memaksa lebar ~1900px ke seluruh rantai →
scrollbar lompat ke page, dan `overflow-auto` kartu tabel (`data-table.tsx:198`) tak pernah aktif
karena kartu sudah selebar isinya.

**Fix di akar = 1 file.** `app-shell.tsx` dipakai semua halaman (master, data-pegawai, terminasi),
jadi satu perbaikan menyembuhkan semuanya. **JANGAN** sentuh `data-table.tsx` (`overflow-auto`
sudah benar) dan **JANGAN** sentuh `src/components/ui/sidebar.tsx` (file generate `shadcn` —
kalau di-reinstall lewat script, editan hilang). `SidebarInset` sudah meneruskan `className` lewat
`cn()` (`sidebar.tsx:286`), jadi override dari `app-shell` sah.

---

## Prasyarat (baca sebelum ngoding)

1. [`docs/design/app-shell.md`](./design/app-shell.md) — spec shell (§6 shell, §12 top bar).
2. **GitNexus (utamakan, bukan grep):** `gitnexus_impact({target:"AppShell", direction:"upstream"})`
   sebelum edit; `gitnexus_detect_changes()` sebelum commit. Pass `repo:"kepegawaian-fe"`.
3. Konfirmasi CSS: flex-child butuh `min-w-0` agar `overflow-auto` anaknya aktif — ini bug flexbox
   klasik, bukan kustomisasi tema.

---

## Urutan claim

Satu issue, tanpa rantai.

### `kepegawaian-fe-z1f` — min-w-0 di rantai flex shell (P1, bug)
**← depends on:** — (ready)

- [x] `gitnexus_impact({target:"AppShell", direction:"upstream", repo:"kepegawaian-fe"})` — lapor blast radius (harusnya LOW, 1 caller: AppLayout).
- [x] Tambah `min-w-0` ke `<SidebarInset>` (`app-shell.tsx:146`) via prop `className`.
- [x] Tambah `min-w-0` ke div konten `flex-1 overflow-y-auto p-6` (`app-shell.tsx:165`).
- [x] **JANGAN** ubah `src/components/ui/sidebar.tsx` (file generate shadcn).
- [x] **JANGAN** ubah `data-table.tsx` — `overflow-auto` di `:198` sudah benar.
- [ ] Verifikasi manual: scrollbar-x muncul **di kartu tabel**, bukan page (halaman Data Pegawai).
- [ ] Verifikasi: tabel **utuh** saat sidebar collapse **dan** expand.
- [ ] Verifikasi: UserMenu pojok kanan atas **terlihat penuh** di kedua state.
- [x] `gitnexus_detect_changes()` — pastikan hanya AppShell terdampak.
- [x] `npm run build` lolos. `bd close kepegawaian-fe-z1f`.

---

## Definition of Done

- [ ] Scrollbar-x di kartu tabel, bukan page.
- [ ] Tabel utuh di collapse & expand.
- [ ] UserMenu tak terpotong di kedua state.
- [ ] `ui/sidebar.tsx` & `data-table.tsx` tak tersentuh.
- [ ] `npm run build` hijau, `git push` sukses.
