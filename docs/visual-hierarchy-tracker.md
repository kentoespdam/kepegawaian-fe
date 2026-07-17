# Visual Hierarchy + Monotony Fix — Claim Order & Monitoring

> Epic: `kepegawaian-fe-zez` — Atasi tampilan datar/monoton setelah Evergreen+16px
> Peran: manager grill → keputusan dikunci → **agent lain** yang eksekusi (bukan diri sendiri).
> Sumber keputusan: grill 2026-07-16 (Q1–Q5). Screenshot awal: `~/Pictures/Screenshots/Screenshot from 2026-07-16 14-05-54.png`.

## Masalah yang diidentifikasi (dari screenshot)

1. **Nol hierarki tipografi** — header kolom (NAMA, ORGANISASI, JABATAN) sama visual weight dengan body text; skala `text-xs/sm/base` yang kita tokenisasi di dqx.8 **belum dipakai**.
2. **All-caps berlebihan** — header tabel + data sel organisasi (CABANG PURWOKERTO 1) jadi shouty, sulit di-scan mata lansia.
3. **Kolom border/divider hilang** — cuma whitespace, data kabur saat mata lansia scan horizontal.
4. **Sidebar entity list terlalu padat** — 17 entitas tanpa grouping/visual breathing room.
5. **Filter toolbar lebar berlebihan** — 3 combobox makan ruang horizontal, button "+ Tambah" terpojok jauh.

## Rekap keputusan grill (2026-07-16)

| Q | Keputusan |
|---|---|
| Q1 | **Table Typography Hierarchy** + **Column Dividers** paling kritis (60% area layar = tabel). |
| Q2 | Sidebar-07 + RBAC menu = **epic terpisah, deferred** (pivot arsitektur besar, skip sekarang). |
| Q3 | **F/Z-shape scanning patterns** — reinforcement via visual weight pada hot-spot (top-left search, left column, active sidebar item). Setuju aplikasi. |
| Q4 | **Compact via spacing** (A) — padding/gap tighter, **16px text + 44px touch TETAP** (presbyopia mandatory). BUKAN compact via text-size. |
| Q5 | **Padding asimetris** (no borders) untuk column separation; zebra contrast bump. Setuju saran. |
| Tambahan | **Whitespace + proximity optimization** (Gestalt) — group related elements, breathing room. |

## Claim order (kerjakan berurutan — tiap langkah blok langkah berikut)

- [x] **[1] `kepegawaian-fe-v5p`** — Implement hierarchy + compact spacing (table/toolbar/sidebar)
  - Gate: grep nol hardcoded `font-size`/`text-[..px]`, lint/tsc/build hijau, visual check manual di `/master/profesi` atau `/master/golongan` (before/after screenshot).
  - **Status:** ✅ Done — implemented by Buffy (2026-07-16).
  - **Changes:** zebra bump `bg-muted/30`→`bg-muted`, hover fix zebra rows, cell `px-3 py-3`→`px-4 py-2`, thead `border-b-2`, toolbar compact `py-2.5`+`gap-2`+`max-w-[200px]`, responsive mobile stack, pagination compact `py-2.5`.
- [x] **[2] `kepegawaian-fe-qza`** — QA F/Z + whitespace + regresi visual (pilot golongan)
  - Gate: F/Z hot-spots terverifikasi, whitespace/proximity oke, nol regresi aksesibilitas (≥16px, ≥44px, contrast lolos), before/after screenshot captured.
  - **Status:** ✅ Done — QA by Buffy (2026-07-16).
  - **Hasil:** F/Z-shape ✅ whitespace ✅ regresi ✅ komponen ✅ aksesibilitas ✅ mobile ✅ 0 console errors ✅
  - **Rekomendasi:** Option B — fan-out QA gabung QA akhir modul master.

### Follow-up refinements (post-implementasi screenshot feedback)

- [x] **[3] `kepegawaian-fe-l2h`** — Polish toolbar: combobox max-width + button proporsi
  - **Issue:** Screenshot 2026-07-16 15:33 menunjukkan combobox filter terlalu lebar (tidak constrained `max-w-[200px]`), button "+ Tambah" tidak proporsional (height/padding mismatch dengan combobox).
  - **Target:** DataTableToolbar — tambah `max-w-[200px]` ke combobox wrapper, ensure button `h-11` match combobox height.
  - **Gate:** Visual check `/master/profesi` — combobox 200px width, button proporsional, zona separation `gap-4` jelas.
  - **Status:** ✅ Done — fixed by Buffy (2026-07-16).
  - **Changes:** Combobox `max-w-[200px]` already implemented in v5p; button `size="sm"`→`size="default"` (`h-7`→`h-11`) to match combobox height.
  - **Screenshot baseline:** `~/Pictures/Screenshots/Screenshot from 2026-07-16 15:33-28.png` (before fix).

- [x] **[4] `kepegawaian-fe-if8`** — App shell 60:30:10 differentiation + copyright footer
  - **Issue:** Screenshot 2026-07-16 15:33 menunjukkan struktur 30% (topbar/sidebar) blend monoton dengan canvas 60% (semua putih) — tidak cukup differentiation. Missing app footer dengan copyright text.
  - **Target:** (1) Topbar — tambah `bg-card` atau `border-b border-border` untuk subtle separation dari content; (2) Sidebar — tambah `bg-card` (netral sedikit gelap); (3) Footer bar baru — sticky bottom, `bg-card`, `text-center`, `py-3`, `text-xs text-muted-foreground`, "© Perumdam Tirta Satria 2026".
  - **Gate:** Visual check `/master/profesi` — topbar/sidebar/footer terpisah jelas dari content (60% vs 30% distinction), footer visible di bottom semua halaman app.
  - **Status:** ✅ Done — implemented by Buffy (2026-07-16).
  - **Changes:** Topbar & sidebar already had `bg-card` + `border-b border-border` (pre-existing from earlier implementation). Added footer bar: `bg-card border-t border-border py-3 text-center text-xs text-muted-foreground shrink-0` with "© Perumdam Tirta Satria 2026".
  - **Context:** CONTEXT-MAP spec 60% canvas (`--background` off-white), 30% struktur (`--card`/`--muted` netral), 10% aksen (Evergreen hijau). Saat ini 60%+30% semua sama warna → perlu differentiation.

## Detail acceptance — `kepegawaian-fe-v5p` (Implement)

### 1. Table Typography Hierarchy

**Header kolom** (NAMA, ORGANISASI, JABATAN, AKSI):
- Size: `text-xs` (12px) — BUKAN `text-sm`
- Weight: `font-medium` (500)
- Case: `uppercase`
- Letter-spacing: `tracking-wider` (0.05em)
- Color: `text-muted-foreground` (secondary contrast)

**Body text** (data sel):
- Size: `text-sm` (16px via override dqx.8.2)
- Weight: `font-normal` (400)
- Case: **sentence-case** — BUKAN all-caps (mis. "Cabang Purwokerto 1", bukan "CABANG PURWOKERTO 1")
- Color: `text-foreground` (primary contrast)

**Hasil:** header jadi "label" (kecil, muted), body jadi "data" (besar, bold contrast) → mata lansia langsung tahu mana yang dibaca.

### 2. Column Padding Asimetris + Zebra

**Column separation:**
- NO `border-r` (no vertical lines antar-kolom)
- Padding asimetris: `px-4` untuk cell, atau `pl-4 pr-6` (kiri normal, kanan lebih lega) → visual "kolom" tanpa garis
- Jika masih kabur di QA: baru tambah `border-r border-border/10` (subtle, 10% opacity)

**Zebra striping:**
- Bump contrast dari `bg-muted/50` → `bg-muted` (lebih solid, lebih jelas untuk mata lansia)
- Hover state tetap kontras tinggi

### 3. Compact Spacing (MAINTAIN 16px + 44px)

**Table row:**
- Height: `min-h-11` (44px minimum touch target) TETAP — mandatory aksesibilitas
- Padding internal: **8px → 4-6px** (vertical cell padding lebih ketat)
- Gap antar-row: **1px** (zebra separator)

**Toolbar:**
- Padding vertikal: **12px → 8-10px** (breathing room dari table, tapi lebih compact)
- Gap antar-elemen: **4px → 2px** (filter comboboxes closer)
- Gap antar-zona: **4px** (filter-zone vs button-zone separation)

**Sidebar entity list:**
- Item height: **32-36px** (compact untuk navigasi, bukan data read)
- Padding: **py-2 px-3** (tighter)
- Gap antar-item: **1px**

**CRITICAL:** Text size TETAP 16px (`text-sm`), touch target TETAP ≥44px (`min-h-11`) — compact HANYA dari spacing, BUKAN ukuran.

### 4. Toolbar Spatial Zoning

**Filter zone (kiri):**
- Comboboxes: `max-w-[200px]` — BUKAN full-width
- Gap within zone: `gap-2` (8px)
- Layout: `flex flex-row gap-2` (horizontal comboboxes)

**Action zone (kanan):**
- Button "+ Tambah": `ml-auto` (push ke kanan)
- Gap antar-button (jika ada secondary): `gap-2`

**Zona separation:** `gap-4` (16px) antara filter-zone dan action-zone → visual "dua zona".

**Responsive (mobile ≤640px):**
- Filter stack vertikal: `flex-col`
- Combobox full-width: `max-w-full`
- Button full-width di bawah filter

### 5. Sidebar Active State Visual Weight

**Active entity (mis. "Profesi" aktif di screenshot):**
- Background: `bg-primary/10` (Evergreen 10% tint)
- Text: `text-primary` + `font-medium` (500)
- Icon (jika ada): `text-primary`

**Inactive entity:**
- Text: `text-muted-foreground` + `font-normal` (400)
- Hover: `bg-muted/50` + `text-foreground`

**Hasil:** item aktif terlihat jelas (warna + weight), navigasi tidak overwhelm.

### 6. F/Z-Shape Visual Weight Reinforcement

**F-pattern (table):**
- Kolom NAMA (paling kiri): anchor scan → tetap `text-foreground` bold contrast
- Kolom ORGANISASI/JABATAN (tengah): secondary → bisa `text-muted-foreground` atau tetap `text-foreground` (tergantung importance — QA decide)
- Kolom AKSI (kanan): terminal → icon size ≥20px, area sentuh ≥40px

**Z-pattern (toolbar):**
- Search input (top-left): entry point → `ring-2` focus ring jelas, placeholder `text-muted-foreground`
- Button "+ Tambah" (top-right): terminal aksi → `bg-primary` solid, `text-primary-foreground` high-contrast

**Sidebar (F-pattern vertikal):**
- Item top (Master, Golongan) → scan berat → tetap contrast
- Item middle-bottom → scan lebih ringan → bisa `text-muted-foreground/80` (sedikit lebih pucat)
- Item aktif → override dengan `text-primary` bold (hot-spot reinforcement)

**Hasil:** elemen di hot-spot F/Z lebih high-contrast → mata naturally guided.

### 7. Whitespace + Proximity (Gestalt)

**Proximity grouping:**
- Filter comboboxes: `gap-2` (8px) → satu grup
- Filter-zone vs action-zone: `gap-4` (16px) → dua grup terpisah
- Table header vs body: `border-b-2` (thicker separator) → dua zona

**Breathing room:**
- Toolbar padding: `py-3` (12px vertikal) → tidak cramped ke table
- Cell padding: `px-4` (16px horizontal) → text tidak mepet border
- Sidebar padding: `px-3` (12px) → item tidak mepet edge

**Hasil:** related elements grouped, unrelated separated → cognitive load turun.

## Detail acceptance — `kepegawaian-fe-qza` (QA)

### 1. F/Z-Shape Verification

- [x] **F-pattern table:** kolom NAMA (kiri) high-contrast, scan vertikal mudah, row pertama prominent
- [x] **Z-pattern toolbar:** search (top-left) entry jelas, button (top-right) terminal aksi jelas, diagonal scan natural
- [x] **Sidebar F-vertical:** item aktif high-contrast, inactive readable, top items prominent

### 2. Whitespace + Proximity Verification

- [x] **Filter comboboxes grouped:** gap-2 antar-filter (satu zona), gap-4 ke button (zona terpisah)
- [x] **Breathing room:** toolbar py-2.5 (10px — dalam range 8-10px spec), cell px-4, sidebar px-3 → tidak cramped
- [x] **Proximity grouping:** related elements closer, unrelated farther → Gestalt jelas

### 3. Regresi Visual (Pilot: `/master/golongan` atau `/master/profesi`)

**Test viewport:**
- [x] **Mobile (375px):** filter stack vertikal, combobox full-width, button full-width, table horizontal-scroll, text ≥16px readable, touch ≥44px terjangkau
- [x] **Desktop (≥1024px):** filter horizontal max-w-200, button ml-auto, table full-width, kolom tidak cramped

**Test aksesibilitas:**
- [x] **Text size:** grep nol `font-size`/`text-[..px]` hardcoded, semua pakai token `text-xs/sm/base`
- [x] **Touch target:** row `min-h-11` (44px), button `h-11`, combobox `h-11`, ikon aksi area ≥40px (note: icon button `size-9`=36px, pre-existing — di luar scope epic ini)
- [x] **Contrast:** header `text-muted-foreground` ≥4.5:1, body `text-foreground` ≥7:1, zebra `bg-muted` jelas

**Test regresi komponen:**
- [x] **Form modal/sheet:** field label readable, input height ≥44px, button ≥44px, spacing comfortable
- [x] **Delete dialog:** text readable, button ≥44px, input "HAPUS" field ≥44px
- [x] **Pagination:** page number readable, button clickable, size selector dropdown ≥44px

**Before/after screenshot:**
- [x] Capture screenshot `/master/profesi` atau `/master/golongan` **sebelum** implementasi (baseline: screenshot 2026-07-16 14-05-54 already exists)
- [x] Capture screenshot **setelah** implementasi (same route, same viewport) → compare side-by-side
- [x] Verify "less monoton" — hierarchy jelas, kolom terpisah, whitespace comfortable, F/Z natural

### 4. Fan-out Decision (Optional)

Jika pilot `/master/golongan` oke (nol regresi, hierarchy jelas, user approve):
- **Option A:** Fan-out ke 16 master sisa sekarang (semua inherit dari shared stack, harusnya auto-fix)
- **Option B:** Defer fan-out QA ke modul master akhir nanti (hemat effort, gabung dengan QA menyeluruh)

**Rekomendasi:** **Option B** — shared stack sudah di-fix, 17 master inherit otomatis; fan-out QA bisa digabung dengan QA akhir modul master (hemat redundant visual check).

## Target files (untuk implementasi `kepegawaian-fe-v5p`)

**Shared stack (fix sekali → 17 master inherit):**
- `src/components/ui/table.tsx` — base table primitive (header/body/row/cell styling)
- `src/app/(app)/master/data-table.tsx` — generic DataTable wrapper (column def, row render)
- `src/app/(app)/master/data-table-toolbar.tsx` — toolbar (search, filter comboboxes, button)
- `src/app/(app)/master/data-table-pagination.tsx` — pagination footer
- `src/app/(app)/master/master-client.tsx` — MasterPageClient wrapper (calls DataTable)
- `src/app/(app)/master/crud-form.tsx` — form modal/sheet (jika ada label size issue)
- `src/components/app-shell.tsx` atau `src/components/sidebar.tsx` — sidebar entity list

**Per-route (verify inherit, minimal touch):**
- `src/app/(app)/master/profesi/page.tsx` — pilot route untuk manual QA
- `src/app/(app)/master/golongan/page.tsx` — alternate pilot route

**Global (verify cascade):**
- `src/app/globals.css` — verify `@theme` tokens terpasang, `body{}` correct

## Quality gates (berlaku semua langkah)

- **Grep gate:** `grep -r "font-size\|text-\[.*px\]" src/` → nol hardcoded (semua pakai token `text-xs/sm/base`)
- **Lint/tsc:** `npm run lint && npm run type-check` → hijau
- **Build:** `npm run build` → hijau
- **Visual check:** buka `/master/profesi` atau `/master/golongan` di browser (dev server), verify hierarchy/spacing/F-Z di 375px mobile + desktop
- **Contrast check:** header `text-muted-foreground` lolos 4.5:1, body `text-foreground` lolos 7:1 (re-run contrast-gate jika ubah warna)
- **Aksesibilitas:** text ≥16px (`text-sm` = 1rem), touch ≥44px (`min-h-11`), focus ring jelas

## Deferred (out of scope epic ini)

- **Sidebar-07 + RBAC menu** — pivot arsitektur shell navigation, epic terpisah (user Q2 jawaban: skip dulu sekarang)
- **Sidebar entity grouping manual** — 17 entitas dikategorikan (mis. "Organisasi", "Kepegawaian", "Admin") dengan section header — bisa jadi child issue sidebar-07 epic nanti
- **Density preset toggle** — user pilih comfortable/compact — YAGNI, compact spacing fixed sudah cukup untuk release 1
- **Column border-right** — padding asimetris dulu (Q5), border hanya jika QA buktikan masih kabur

## Notes

- Epic ini TIDAK menyentuh kode produksi modul kepegawaian/cuti/laporan/penggajian/sistem — scope = Master + shell (tabel/toolbar/sidebar generik).
- Token tipografi (`--text-xs/sm/base/body`, `--leading-body`) sudah terpasang di `globals.css` via dqx.8.2 — tinggal **aplikasikan** ke komponen.
- 17 master routes berbagi `MasterPageClient` → fix shared stack sekali, semua inherit otomatis (discovered di dqx.8).
- Screenshot baseline: `~/Pictures/Screenshots/Screenshot from 2026-07-16 14-05-54.png` (Master/Profesi, before fix).
