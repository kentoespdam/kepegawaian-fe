# 5. Sidebar-07 collapsible-to-icon (pengganti sidebar-09 dua-tier)

Date: 2026-07-22
Status: Accepted

## Konteks

App shell awalnya dikunci sebagai **sidebar-09 dua-tier** (rail ikon modul permanen +
panel Tier-2 entitas), dengan constraint kuat: **rail tak pernah collapse** — demi
populasi lansia (±70%), navigasi harus konstan dan selalu terlihat.

Dua hal menggeser dasar keputusan itu:

1. **RBAC sudah terpasang.** Menu di-*prune* per peran: entitas tak-`view` tak dirender,
   grup modul tanpa entitas ter-view tak dirender. Jumlah item yang tampil per user jauh
   lebih sedikit dari asumsi awal — tekanan "butuh dua-tier agar tak sesak" berkurang.
2. **User ingin pola sidebar-07** (single-tier, collapsible-to-icon) — pola shadcn yang
   lebih standar, lebih ringan, dan built-in (persist cookie, off-canvas mobile, tooltip).

Ketegangan: sidebar-07 menawarkan collapse, sedangkan constraint lama melarang collapse.

## Keputusan

Pindah ke **sidebar-07 single-tier**. **Modul = grup collapsible; entitas = sub-item.**
Dipasang via `npx shadcn add sidebar` (Base UI, lihat [ADR 0004](./0004-base-ui-as-shadcn-default.md)) —
**bukan tulis manual**.

Constraint "rail tak pernah collapse" **dilonggarkan, bukan dihapus**:

- **Collapse-to-icon** default **expanded**; state collapse **di-persist** (cookie bawaan
  `SidebarProvider`). Karena default tak berubah sendiri, user yang tak memilih collapse
  melihat navigasi konstan — jaminan lansia tetap terpenuhi. Collapse jadi **opt-in**.
- **Grup buka/tutup** default **semua-terbuka**, dan **TIDAK di-persist** — tiap load balik
  ke semua-terbuka, mencegah lansia "kehilangan" menu secara permanen.

## Konsekuensi

**Positif.**
- Pola shadcn standar & ringan; fitur built-in (persist, off-canvas mobile, tooltip) gratis.
- RBAC + single-tier = menu ringkas per user tanpa panel kedua.
- Constraint lansia dipertahankan lewat *default*, bukan lewat pelarangan fitur.

**Negatif / trade-off yang diterima.**
- Membalik keputusan sidebar-09 yang sudah dikunci — dokumen (app-shell.md §6, CONTEXT-MAP,
  rbac.md §9) harus diselaraskan.
- Satu axis (modul selalu terlihat sebagai rail permanen) hilang saat expanded; digantikan
  grup accordion. Diterima karena RBAC menekan jumlah item.

**Tinjau ulang jika:** jumlah entitas per user membengkak lagi sampai single-tier terasa
sesak, atau feedback lansia menunjukkan collapse/accordion membingungkan meski default aman.

File terkait:
- `docs/design/app-shell.md` §6 — spec detail shell
- `CONTEXT-MAP.md` §App shell — ringkasan inti
- `docs/design/rbac.md` §9 — aturan penyembunyian sidebar
- `src/components/app-shell.tsx` — implementasi (ditulis ulang oleh agent eksekusi)
