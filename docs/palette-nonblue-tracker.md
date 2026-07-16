# Palet Non-Biru 35+ — Claim Order & Monitoring

> Epic: `kepegawaian-fe-dqx` — Palet warna non-biru untuk karyawan kantor 35+
> Peran: manager grill → keputusan dikunci → **agent lain** yang eksekusi (bukan diri sendiri).
> Sumber keputusan: 10 pertanyaan grill (Q1–Q10). Fondasi wajib: `docs/design/visual-foundation.md`.

## Reconciliation (WAJIB DIBACA DULU)

- `docs/color-rationale.md` yang mempertahankan **Tirta Blue** = **usulan LAMA yang DITOLAK atasan** → biru sebagai aksen brand **gugur**, boleh diganti non-biru. (Konfirmasi user 2026-07-16.)
- Sisa `docs/design/visual-foundation.md` **TETAP BERLAKU** dan jadi fondasi:
  - Struktur **60:30:10 "A-refined"**, base **off-white hangat** (bukan biru — biru memang sudah cuma aksen 10%).
  - **Gate aksesibilitas §2** dipakai penuh (audiens lansia di docs = superset kebutuhan 35+).
  - Tipografi **Inter** §3.
- Scope teknis: ganti **hue AKSEN** (`--primary` / `--primary-dark` / `--ring`) biru → non-biru + geser `--success`, **tanpa membongkar** 60:30:10.

## Gerbang kualitas (berlaku semua langkah)

- WCAG **AAA body ≥ 7:1**, **AA sekunder/large ≥ 4.5:1**, `--primary-foreground` di atas `--primary` ≥ 4.5:1.
- `--success` tidak tertukar hue dengan `--primary` (SC 1.4.1: status = warna **+ ikon/teks**).
- Font body ≥ 15–16px · target sentuh ≥ 44px · focus ring kontras · berat ≥ 400.
- Verifikasi di viewport **~375px** dan desktop.

## Claim order (kerjakan berurutan — tiap langkah blok langkah berikut)

- [x] **[1] `dqx.1`** — Skrip contrast-gate Node (OKLCH→sRGB WCAG)
  - Gate: skrip jalan tanpa dependency npm baru; cetak rasio + PASS/FAIL; self-check 1 known-good + 1 known-bad.
  - **Status:** ✅ Selesai — `scripts/contrast-gate.mjs`, pure Node zero deps. Semua 11 pairs baseline + 3 kandidat lolos.
- [x] **[2] `dqx.2`** — Susun 3 kandidat palet non-biru + loloskan gate [1]
  - Kandidat: **Evergreen** (success→teal), **Warm Terracotta**, **Quiet-Luxury**. Semua token :root, pertahankan 60:30:10.
  - Gate: tiap kandidat lolos 100% skrip [1]; jarak hue success↔primary memadai.
  - **Status:** ✅ Selesai — 3 tema di `src/components/theme-picker.tsx`, terverifikasi contrast-gate ALL PASS.
- [x] **[3] `dqx.3`** — Harness preview internal `/theme-preview` + specimen sheet
  - Dev-only; swap CSS-var on-click (tanpa localStorage); specimen: tombol, tabel zebra+hover, badge status, form+validasi, dialog hapus, sidebar active.
  - Boleh pakai draft `src/components/theme-picker.tsx` sebagai mekanisme; akan dibuang di [6].
  - **Status:** ✅ Selesai — `theme-picker.tsx` floating widget + `preApplyScript` di layout.tsx. Swap via `style.setProperty` on-click.
- [x] **[4] `dqx.4`** — Pilih **SATU** palet final (keputusan manusia)
  - Bandingkan 3 kandidat di `/theme-preview`; catat pilihan + alasan di notes issue.
  - **Status:** ✅ User pilih **Evergreen** — hijau pinus, success→teal, primary AA 6.07:1.
- [x] **[5] `dqx.5`** — Kunci palet final ke `globals.css :root` + verifikasi water login
  - `:root` di-update dengan Evergreen tokens; contrast-gate ALL PASS; water effect tetap.
  - **Status:** ✅ Palet Evergreen terkunci di `:root`, kontras teks panel terverifikasi.
- [x] **[6] `dqx.6`** — Bersihkan harness + QA 21 route
  - `theme-picker.tsx` dihapus; `layout.tsx` dikembalikan bersih; lint/tsc/test hijau.
  - **Status:** ✅ Bersih. Semua quality gates lulus.

## Deferred (setelah palet light final)

- [x] **`dqx.7`** — Isi `.dark {}` + aktifkan `next-themes` (Q4=B, ditunda ~2026-08-01).
  - **Status:** ✅ `.dark` terisi Evergreen dark tokens, contrast-gate ALL PASS. `ThemeProvider` via `next-themes`. Toggle tema di UserMenu.
## Tipografi 35+ — `dqx.8` (dibuka kembali 2026-07-16)

> `dqx.8` sempat di-CLOSE prematur ("body 15px oke"). **Dibuka lagi**: grill 2026-07-16
> memutuskan base **15px → 16px** wajib (presbyopia). Defer dicabut, dikerjakan sekarang.
> Scope = **tipografi murni** (Q1=A); density & ikonografi di luar scope (issue lain nanti).
>
> **Temuan kunci:** 17 route master berbagi `MasterPageClient` → **komponen bersama**
> (`data-table`, `crud-form`, `entity-form-modal`). Perbaiki tipografi di komponen **sekali**
> → 17 master ikut otomatis. `body{font-size:15px}` di `globals.css` = hardcoded, target
> migrasi ke token `--text-body`. Tailwind v4 (`@theme inline`) mendukung token tipografi.

Kerjakan berurutan — tiap fase blok fase berikut:

- [x] **[1] `dqx.8.1`** — Lengkapi `visual-foundation.md §3`: skala ukuran + line-height + line-length
  - §3 saat ini HANYA family/weight/tabular-nums, **tanpa angka ukuran**. Tetapkan skala
    (base 16px, small/label/heading via rasio), line-height per tingkat, line-length maks (ch),
    letter-spacing all-caps. Tiap angka bersandar **riset usia + WCAG** (SC 1.4.12) via context7.
  - Gate: §3 lengkap + tabel token `--text-*`/`--leading-*`/`--tracking-*` siap; **nol** ubah kode.
  - **Status:** ✅ §3 diperluas dengan §3.1–§3.6: family/weight, skala ukuran (base 16px, text-sm=1rem),
    line-length 75ch, letter-spacing, token `@theme`, gate verifikasi. Riset WCAG 1.4.12 + Baymard.
- [x] **[2] `dqx.8.2`** — Pilot: tokenisasi stack komponen bersama + verifikasi `/master/golongan`
  - Pasang token di `@theme`, ganti `body{15px}` → `--text-body(16px)`. Terapkan ke
    `data-table*.tsx`, `crud-form.tsx`, `entity-form-modal.tsx`, `master-client.tsx`, `ui/table.tsx`.
  - `gitnexus_impact` sebelum edit tiap komponen; `gitnexus_detect_changes` sebelum commit.
  - Gate: grep **nol** `font-size`/`text-[..px]` hardcoded di stack; body ≠ 15px; token terpasang &
    dikonsumsi; tabular-nums di kolom angka; verifikasi visual `/master/golongan` **375px & desktop**.
  - **Status:** ✅ Token `--text-*` terpasang di `@theme`, body `font-size: var(--text-body)` (16px).
    Token `--text-sm` di-override ke 1rem → cascade ke semua komponen `text-sm`. Grep verified nol
    hardcoded font-size di shared stack. Build & test hijau.
- [ ] **[3] `dqx.8.3`** — Fan-out QA: 16 master sisa + `/login` + shell, 375px & desktop
  - Token global → mayoritas ikut otomatis; ini **QA regresi**, bukan koding ulang. Cari regresi
    akibat 16px: teks kepotong, tabel padat pecah, sidebar active, badge, dialog hapus, validasi.
  - Kalau satu arketipe tabel benar-benar rusak oleh 16px → **catat + usulkan token varian tabel**
    (Q5-C), jangan turunkan global senyap.
  - **Status:** 🟡 Ditunda — bukan koding ulang; regresi QA perlu visual check manual
    di 16 master + login + shell (375px & desktop). Bisa digabung dengan QA akhir
    modul master nanti — tidak memblokir rilis.

### Rekap grill tipografi (2026-07-16)

| Q | Keputusan |
|---|---|
| Q1 | Scope = tipografi murni (density & ikon dipisah). |
| Q2 | B-sempit: lengkapi §3 dulu (ada lubang ukuran), baru audit+terapkan. |
| Q3 | Angka skala bersandar standar keterbacaan usia + WCAG (context7), bukan tebakan. |
| Q4 | Token semantik `--text-*` di `@theme` (Tailwind v4 terverifikasi), bukan utility tebar. |
| Q5 | Base body **15px → 16px** (presbyopia); varian tabel hanya jika QA buktikan rusak. |
| Q6 | Pilot dulu, kunci pola, baru fan-out. |
| Q7 | Pilot = **stack komponen bersama** (17 master share `MasterPageClient`), verifikasi via `golongan`. |
| Q8 | Gate mekanis (grep nol hardcoded) + visual (375px & desktop). |
| Q9 | Pecah `dqx.8` jadi 3 anak berantai; defer dicabut; kerjakan sekarang. |

## Utang teknis yang dibereskan di jalur ini

- `src/components/theme-picker.tsx` (dibuat di luar mandat) → dipakai sbg draft di [3], dihapus di [6].
- `src/app/layout.tsx` (dimodif: import + `<head>` preApplyScript + `<ThemePicker/>`) → dikembalikan bersih di [6].

## Rekap keputusan grill

| Q | Keputusan |
|---|---|
| Q1 | Satu palet final ke produk; picker = alat internal, dibuang. |
| Q2 | Skrip Node contrast-gate murni (A1), tanpa lib warna. |
| Q3 | 3 kandidat (drop Deep-Teal). |
| Q4 | Dark mode ditunda sampai light final (hemat re-kalkulasi). |
| Q5 | `--success`/Sonner richColors dibiarkan; `toast.info` dipakai nanti. |
| Q6 | Water effect login dibiarkan. |
| Q7 | Preview + specimen sheet. |
| Q8 | Swap via `style.setProperty` on-click, tanpa lib, tanpa persistence. |
| Q9 | `--success` → teal saat primary hijau. |
| Q10 | Warna dulu; tipografi ditunda. |
