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
- [ ] **[4] `dqx.4`** — Pilih **SATU** palet final (keputusan manusia)
  - Bandingkan 3 kandidat di `/theme-preview`; catat pilihan + alasan di notes issue.
  - **Status:** ⏳ **Menunggu keputusan user** — bandingkan Evergreen, Warm Terracotta, Quiet Luxury.
- [ ] **[5] `dqx.5`** — Kunci palet final ke `globals.css :root` + verifikasi water login
  - `gitnexus_impact` sebelum edit, `gitnexus_detect_changes` sebelum commit (harus hanya sentuh :root).
  - Login water effect dibiarkan (Q6=A) — hanya verifikasi kontras teks panel.
- [ ] **[6] `dqx.6`** — Bersihkan harness + QA 21 route
  - Hapus `/theme-preview`, `src/components/theme-picker.tsx`, dan pemasangan di `layout.tsx` (`ThemePicker` + `preApplyScript`).
  - QA ~21 route (public `/login` + 20 di grup `(app)`, termasuk 18 master) di 375px & desktop; surface berisiko: sidebar active, data-table error/zebra/hover, form validation, status badge, delete dialog.

## Deferred (setelah palet light final)

- [ ] **`dqx.7`** — Isi `.dark {}` + aktifkan `next-themes` (Q4=B, ditunda ~2026-08-01).
- [ ] **`dqx.8`** — Audit tipografi keterbacaan 35+/lansia (Q10=A, ditunda ~2026-08-01).

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
