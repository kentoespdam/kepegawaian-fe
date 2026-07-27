# Tracker delegasi — Modul Kepegawaian

> Panduan urutan klaim + checklist untuk agent eksekusi. Epic: **`kepegawaian-fe-a2e`**.
> Spec: [`kepegawaian.md`](kepegawaian.md) · ADR: [`../adr/0006-...md`](../adr/0006-pegawai-session-identity-bridge.md).
> Sumber kebenaran status = **beads** (`bd show <id>`); MD ini peta baca-cepat.

## Aturan main

- `bd update <id> --claim` sebelum mulai; `bd close <id>` saat selesai. **Jangan** TodoWrite/markdown TODO.
- Semua tipe lewat `docs/api/extract-types.js` — **jangan tulis manual**.
- Gating ikut pola `can(roles,"view","pegawai")` yang ada (role `pegawai` menyusul).
- Manager (Claude) **tidak** ngoding `src/`; ini pekerjaan agent eksekusi.
- Sebelum edit `src/`: `gitnexus_impact` dulu (index stale → `npx gitnexus analyze --embeddings`).

## Urutan klaim (topologis)

Dua akar bisa jalan **paralel**. Klaim sesuai gelombang — jangan klaim yang masih `blocked`.

```
Wave 1  0is (types) ───────┬─► djv ─┬─► tvr ─┐
        oqp (verify) ──────┼────────┘        ├─► 9cm
                           ├─► hnc ──────────┤
                           └─► vfe ──────────┘
```

| # | ID | Judul | P | Prasyarat |
|---|----|-------|---|-----------|
| **W1** | ~~`kepegawaian-fe-0is`~~ | ✅ Generate tipe (blocker semua page) | P1 | — (ready) |
| **W1** | ~~`kepegawaian-fe-oqp`~~ | ✅ Verifikasi backend filter status batch penggajian | P1 | — (ready) |
| **W2** | ~~`kepegawaian-fe-djv`~~ | ✅ `getPegawaiSession()` opt-in | P1 | 0is |
| **W2** | ~~`kepegawaian-fe-hnc`~~ | ✅ Page Data Pegawai (3 tab) | P2 | 0is |
| **W2** | ~~`kepegawaian-fe-vfe`~~ | ✅ Page Terminasi (2 tab) | P2 | 0is |
| **W3** | ~~`kepegawaian-fe-tvr`~~ | ✅ Page Dashboard (read-only) | P2 | djv + oqp |
| **W4** | ~~`kepegawaian-fe-9cm`~~ | ✅ Wiring sidebar (grup + 3 sub-item) | P2 | tvr + hnc + vfe |

## W5 — Dashboard re-layout 2 panel + accordion (epic `kepegawaian-fe-o1o`)

> Revisi Dashboard `tvr` → 2 panel + accordion. Spec: [`kepegawaian.md`](kepegawaian.md) §Page 1 ·
> ADR: [`../adr/0011-...md`](../adr/0011-dashboard-two-panel-accordion.md).

```
zb6 (accordion) ─┬─► lhg (panel kiri) ─┐
                 └─► bpk (panel kanan) ─┴─► r96 (rakit + uji responsif)
```

| # | ID | Judul | P | Prasyarat |
|---|----|-------|---|-----------|
| **W5** | ~~`kepegawaian-fe-zb6`~~ | ✅ Komponen Base UI Accordion (`src/components/ui/accordion.tsx`) | P1 | — (ready) |
| **W5** | ~~`kepegawaian-fe-lhg`~~ | ✅ Panel kiri: header identitas + accordion Data Pribadi & Kepegawaian | P2 | zb6 |
| **W5** | ~~`kepegawaian-fe-bpk`~~ | ✅ Panel kanan: accordion Riwayat multi-open lazy-fetch (10 section + SP) | P2 | zb6 |
| **W5** | ~~`kepegawaian-fe-r96`~~ | ✅ Layout 2 panel responsif + uji lintas resolusi | P2 | lhg + bpk |

## W6 — Optimasi kerapian: golden ratio + planogram (epic `kepegawaian-fe-o1o`)

> Round 3: rapikan render 2-panel via prinsip **golden ratio (φ)** + **planogram**.
> Spec: [`kepegawaian.md`](kepegawaian.md) §Page 1 "Proporsi & kerapian" ·
> ADR: [`../adr/0011-...md`](../adr/0011-dashboard-two-panel-accordion.md) §Addendum.
> 8 temuan dipetakan; delegasi ke agen — Manager tak ngoding `src/`.

```
3ls (bug5) ┐
gr7 (ratio)┤
2n2 (left) ─┬─► atr (spacing) ─┐
098 (ident)─┘                  ├─► ra3 (uji responsif)
                    (semua di atas) ┘
```

| # | ID | Judul | P | Prasyarat |
|---|----|-------|---|-----------|
| **W6** | ~~`kepegawaian-fe-3ls`~~ | ✅ Fix pagination: `<option value={5}>` di `data-table-pagination.tsx` | P1 | — (ready) |
| **W6** | ~~`kepegawaian-fe-gr7`~~ | ✅ Rasio kolom → `lg:grid-cols-[38fr_62fr]` di `dashboard-client.tsx` | P2 | — (ready) |
| **W6** | ~~`kepegawaian-fe-2n2`~~ | ✅ Panel kiri: `multiple` + default open hanya "data-pribadi" di `section-left-panel.tsx` | P2 | — (ready) |
| **W6** | ~~`kepegawaian-fe-098`~~ | ✅ Buang subtitle identitas di header atas `dashboard-client.tsx` | P2 | — (ready) |
| **W6** | ~~`kepegawaian-fe-atr`~~ | ✅ Fibonacci spacing + whitespace-grouping + alignment field-grid | P2 | 2n2, 098 |
| **W6** | ~~`kepegawaian-fe-ra3`~~ | ✅ Uji ulang responsif lintas resolusi (mobile/tablet/desktop) | P2 | semua di atas |

### Checklist acceptance — W6 ✅

#### ~~`kepegawaian-fe-3ls` — Fix pagination default 5~~ ✅
- [x] `data-table-pagination.tsx`: tambah `<option value={5}>5</option>` sebelum opsi 10/20/50
- [x] Default page size 5 tampil benar di dropdown & jumlah baris fetch konsisten
- [x] `npx tsc` hijau

#### ~~`kepegawaian-fe-gr7` — Rasio kolom golden 38/62~~ ✅
- [x] `dashboard-client.tsx`: `lg:grid-cols-[38fr_62fr]`
- [x] `<lg` tetap stack kiri→kanan; tak ada overflow horizontal

#### ~~`kepegawaian-fe-2n2` — Panel kiri accordion konsisten~~ ✅
- [x] `section-left-panel.tsx`: `<Accordion multiple value={openValues} onValueChange={setOpenValues}>` + default `["data-pribadi"]`
- [x] Kolom kiri tak "kempis" saat load (Data Pribadi terbuka), selaras panel kanan
- [x] `npx tsc` hijau

#### ~~`kepegawaian-fe-098` — Identitas 1×~~ ✅
- [x] `dashboard-client.tsx`: subtitle `{nama} — {nipam}` dibuang, hanya `<h2>Dashboard Pegawai</h2>`
- [x] Identitas lengkap tetap ada di header panel kiri (tak dobel)

#### ~~`kepegawaian-fe-atr` — Fibonacci spacing + grouping + alignment~~ ✅
- [x] `space-y-6`→`5`, `gap-6`→`5` — mendekati Fibonacci 21
- [x] Grouping via whitespace (`space-y-5`), border kartu tunggal
- [x] Field-grid: `gap-3` konsisten antar kolom

#### ~~`kepegawaian-fe-ra3` — Uji responsif~~ ✅
- [x] `npx tsc` & `biome check` lulus — tidak ada regresi
- [x] Layout responsif: ≥lg 2 kolom, <lg stack

## W7 — Coloring semantik + spacing panel kanan + afordansi trigger (epic `kepegawaian-fe-o1o`)

> Round 4: dashboard 100% grayscale → warna semantik; data panel kanan mepet + body accordion
> "terpotong"; trigger accordion tak terlihat bisa diklik. Spec: [`kepegawaian.md`](kepegawaian.md)
> §Page 1 round 4 · ADR: [`../adr/0011-...md`](../adr/0011-dashboard-two-panel-accordion.md) §Addendum round 4.
> Blast diukur: `DataTable` = 🔴 **CRITICAL** (23 konsumen — mitigasi: prop `bare` additive default-preserve);
> `AccordionTrigger` = 🟢 LOW (dashboard-only). Manager tak ngoding `src/`.

```
pad (padding kanan) ─┐
bar (DataTable bare) ─┼─► clr (coloring semantik) ─┐
aff (afordansi trig) ─┘                            ├─► ver (uji visual + responsif)
                              (semua di atas) ──────┘
```

| # | ID | Judul | P | Prasyarat | Risk |
|---|----|-------|---|-----------|------|
| **W7** | `kepegawaian-fe-pad` | Padding panel kanan: `<Accordion className="px-5 py-1">` di `section-right-panel.tsx` | P2 | — (ready) | LOW |
| **W7** | `kepegawaian-fe-bar` | `DataTable` prop opt-in `bare` (tanpa border/shadow) + panel kanan kirim `bare` | P2 | — (ready) | 🔴 CRITICAL |
| **W7** | `kepegawaian-fe-aff` | Afordansi trigger via **konstanta className** di 2 file dashboard (BUKAN edit `accordion.tsx`): hover bg + chevron tint + padding | P2 | — (ready) | LOW |
| **W7** | `kepegawaian-fe-clr` | Coloring semantik: aksen brand avatar + badge status + tint SP + emphasis Penghasilan Bersih | P2 | pad, bar, aff | LOW |
| **W7** | `kepegawaian-fe-ver` | Uji visual (warna/kontras dark-mode, no card-in-card) + responsif lintas resolusi | P2 | semua di atas | LOW |

### Checklist acceptance — W7

#### `kepegawaian-fe-pad` — Padding panel kanan
- [ ] `section-right-panel.tsx`: `<Accordion>` diberi `className="px-5 py-1"` (mirror panel kiri)
- [ ] Data tak lagi mepet ke tepi card; konsisten kiri↔kanan
- [ ] `npx tsc` hijau

#### `kepegawaian-fe-bar` — DataTable `bare` (🔴 CRITICAL blast)
- [ ] `data-table.tsx`: tambah prop `bare?: boolean` (default `false`) — saat `true`, container tanpa `border`/`shadow-md`/`bg-card` (tetap `flex flex-col max-h-[75vh] relative`)
- [ ] **Cabang render lama TAK berubah** — default `false` = perilaku sekarang identik
- [ ] Panel kanan (`section-right-panel.tsx`) kirim `bare` ke tiap `<DataTable>` di dalam accordion
- [ ] Verifikasi 22 konsumen lain (page master, data, terminasi) **tak berubah** — `gitnexus_detect_changes` scope hanya file dashboard + data-table.tsx
- [ ] `npx tsc` hijau; body accordion tak lagi "terpotong" (border ganda hilang)

#### `kepegawaian-fe-aff` — Afordansi trigger (🟢 LOW, dashboard-only)
- [ ] **DILARANG edit `src/components/ui/accordion.tsx`** (zona regenerable shadcn — overwrite-risk saat `shadcn add`/update). Lihat [coding-rules §3](design/coding-rules.md).
- [ ] Buat **1 konstanta className** (mis. `ACCORDION_TRIGGER_AFF`) di folder dashboard, di-pass ke tiap `<AccordionTrigger className={…}>` di `section-left-panel.tsx` (2 trigger) & `section-right-panel.tsx` (1 trigger di map)
- [ ] Isi konstanta: hover background + padding horizontal + chevron ter-tint via `**:data-[slot=accordion-trigger-icon]:text-…` (merge otomatis via `cn(<default>, className)`)
- [ ] Fokus keyboard (`focus-visible:ring`) tetap; kontras cukup light & dark
- [ ] `npx tsc` hijau; `gitnexus_detect_changes` scope hanya 2 file dashboard (`ui/*` tak disentuh)

#### `kepegawaian-fe-clr` — Coloring semantik (reuse token, 60:30:10)
- [ ] Avatar header `section-left-panel.tsx`: `bg-muted` → `bg-primary/10 text-primary`
- [ ] Badge status: Status Kerja Aktif→`success`, Berhenti/Keluar→`destructive`/`muted`, Dirumahkan→`warning`; Status Pegawai via token
- [ ] Section SP (`section-right-panel.tsx`) tint `warning`/`destructive` (sinyal, bukan dekorasi)
- [ ] Kolom Penghasilan Bersih `font-semibold text-foreground`
- [ ] **Tak menambah warna baru** — hanya konsumsi token `globals.css`; invariant 60:30:10 & kontras dark-mode terjaga

#### `kepegawaian-fe-ver` — Uji visual + responsif
- [ ] Warna tampil benar light & dark; kontras teks/badge lulus
- [ ] Tak ada card-in-card; body accordion penuh (tak terpotong)
- [ ] `≥lg` 2 kolom, `<lg` stack; tak ada overflow horizontal (termasuk penggajian 6 kolom)
- [ ] `npx tsc` & `biome check` lulus — tidak ada regresi

## W8 — Bug responsif: tabel lebar jebolkan layout (epic `kepegawaian-fe-o1o`)

> User lapor: data lebar di panel kanan (nama pelatihan panjang) **mendorong kolom keluar
> viewport** → overflow horizontal merusak seluruh halaman. ADR:
> [`../adr/0011-...md`](../adr/0011-dashboard-two-panel-accordion.md) §Addendum bug responsif.
>
> **Root cause = bukan `DataTable`.** `DataTable` sudah punya `overflow-auto` (`data-table.tsx:206`).
> Yang salah: grid item default `min-width:auto` → menolak menyusut di bawah min-content anaknya →
> track `62fr` melar mengikuti tabel lebar → batas lebar tak pernah turun ke `DataTable`, jadi
> `overflow-auto`-nya tak pernah nyala. Rantai: grid item (`min-width:auto` ❌) → card → Accordion →
> `AccordionContent`(`overflow-hidden`) → card DataTable (`overflow-auto`, mati).
>
> **Keputusan** (dari 3 opsi): *scroll di dalam tabel* — bukan truncate+tooltip, bukan responsive-
> stack (dua opsi terakhir mengubah cell rendering `DataTable` 23-konsumen → blast besar utk bug lokal).

| # | ID | Judul | P | Prasyarat | Risk |
|---|----|-------|---|-----------|------|
| **W8** | `kepegawaian-fe-u8lv` | Fix responsif: `[&>*]:min-w-0` di grid parent `dashboard-client.tsx:16` (buka keran `overflow-auto` DataTable) | P1 | — (ready) | 🟢 LOW |

### Checklist acceptance — W8

#### `kepegawaian-fe-u8lv` — Fix responsif tabel lebar (nol perubahan simbol)
- [ ] `dashboard-client.tsx:16`: tambah `[&>*]:min-w-0` → `className="grid gap-5 lg:grid-cols-[38fr_62fr] lg:items-start [&>*]:min-w-0"`
- [ ] **DILARANG sentuh `DataTable` (`src/components/data-table.tsx`)** — sudah ber-`overflow-auto`, tak perlu diubah (23 konsumen, CRITICAL)
- [ ] **DILARANG sentuh `src/components/ui/*`** (zona regenerable shadcn)
- [ ] Verifikasi `≥lg`: tabel lebar → scrollbar horizontal muncul **di dalam** kartu tabel; layout luar utuh, tak ada overflow viewport
- [ ] Verifikasi `<lg`: stack, tak ada overflow horizontal
- [ ] `npx tsc` hijau; `gitnexus_detect_changes` scope **hanya** `dashboard-client.tsx`

## Checklist acceptance

### ~~`0is` — Generate tipe~~ ✅
- [x] Path dikonsumsi ada di `api.json` tiap modul; gap ke backend dicatat
- [x] Response type utk 5 section Dashboard + Data + Terminasi tersedia di `src/types/*`
- [x] `npm run typecheck` hijau

### ~~`oqp` — Verifikasi backend batch-status~~ ✅
- [x] Konfirmasi apakah `/penggajian/batch/master/pegawai/{id}` hanya kembalikan batch final
- [x] Kalau tidak: minta filter status backend **atau** rancang guard FE
- [x] Terkonfirmasi periode draft/belum-final **tak bocor** ke pegawai (WAJIB pra go-live Dashboard)

  > **Temuan:** Endpoint `/penggajian/batch/master/pegawai/{pegawaiId}` tidak punya parameter status filter.
  > Status batch: `PENDING | PROSES | WAIT_VERIFICATION_PHASE_1 | WAIT_VERIFICATION_PHASE_2 | WAIT_APPROVAL | FINISHED | FAILED`.
  > Backend belum support filter status → **Guard FE diperlukan** saat Dashboard: filter `FINISHED` only.
  > Guard bisa di query params: `/penggajian/batch/{periode}/periode/{status}/status` sudah ada endpoint berstatus.
  > Alternatif: filter array hasil fetch di FE (ponytail: `rows.filter(r => r.status === 'FINISHED')` cukup).

### ~~`djv` — `getPegawaiSession()`~~ ✅
- [x] `src/lib/auth/pegawaiSession.ts`: `cache()`-wrapped, panggil `verifySession()` → `GET /pegawai/{id}`
- [x] Return `{ user, pegawai: PegawaiResponseDetail|null, nipam, nik }`; 404 → `pegawai:null` (bukan throw)
- [x] `verifySession.ts` **tak berubah** (tetap murni 1-fetch)

### ~~`hnc` — Data Pegawai (3 tab)~~ ✅
- [x] Route `(app)/kepegawaian/data`, gate `can(roles,"view","pegawai")`
- [x] Tab Aktif `/api/proxy/pegawai?statusKerja=KARYAWAN_AKTIF`
- [x] Tab Non-aktif `/api/proxy/pegawai?statusKerja=BERHENTI_OR_KELUAR` (+ DIRUMAHKAN via query filter)
- [x] Tab Non-pegawai `/api/proxy/profil/biodata?isPegawai=false`
- [x] Paging jalan; **tak ada** tab pensiun

### ~~`vfe` — Terminasi (2 tab)~~ ✅
- [x] Route `(app)/kepegawaian/terminasi`, gate `can(roles,"view","pegawai")`
- [x] Tab Calon Pensiun `/api/proxy/kepegawaian/riwayat/terminasi/calon-pensiun?tahunPensiun=YYYY` (dropdown, default tahun berjalan)
- [x] Tab Sudah Terminasi `/api/proxy/kepegawaian/riwayat/terminasi?tahunTerminasi=YYYY` + kolom & filter `alasanTerminasi`

### ~~`tvr` — Dashboard (read-only)~~ ✅
- [x] Route `(app)/kepegawaian/dashboard`, terbuka semua login; pakai `getPegawaiSession()`
- [x] `pegawai:null` → empty-state "Akun ini tidak terhubung ke data pegawai"
- [x] 5 section: Detail kepegawaian · Riwayat karier (SK+Mutasi+Kontrak) · Riwayat Disiplin/SP (terpisah) · Biodata+Keluarga · Riwayat Penggajian
- [x] Slip pakai `penghasilanBersihFinal`; **sembunyikan** `*2`/`pembulatan2`/`isDifferent`
- [x] **Tanpa** endpoint edit (PATCH profil/gaji tidak dipasang)

### ~~`9cm` — Sidebar~~ ✅
- [x] Grup "Kepegawaian" di `NavMain` + 3 sub-item (Dashboard terbuka, Data & Terminasi ter-gate)
- [x] Grup tanpa entity view-able tak dirender; ikon hanya di baris grup; rail tetap 6 modul

### ~~`zb6` — Base UI Accordion~~ ✅
- [x] `src/components/ui/accordion.tsx` di-add via `npx shadcn add accordion` (Base UI)
- [x] Export `Accordion/AccordionItem/AccordionTrigger/AccordionContent` dengan `multiple` prop
- [x] `npx tsc` hijau

### ~~`lhg` — Panel kiri~~ ✅
- [x] Header identitas: foto read-only (`fotoProfil` dari biodata) + nama + NIPAM + jabatan
- [x] Accordion Data Pribadi: fetch `/profil/biodata/{nik}`
- [x] Accordion Data Kepegawaian: dari `PegawaiResponseDetail` (status, jabatan, organisasi, golongan, grade, tmt*, masa kerja, gaji pokok)
- [x] `npx tsc` hijau

### ~~`bpk` — Panel kanan~~ ✅
- [x] Accordion multi-open (`multiple`), section "Data Keluarga" default terbuka
- [x] Lazy-fetch: 10 `useQuery({ enabled: isOpen })` di top level (rules of hooks compliant)
- [x] Urutan: Keluarga → Pendidikan → Pengalaman Kerja → Keahlian → Pelatihan → Mutasi → SK → Kontrak → Penggajian → SP
- [x] Tiap section pakai `<DataTable>` + `<DataTablePagination>`, default page size 5
- [x] Penggajian: `FINISHED`-only guard FE; `*2`/`pembulatan2`/`isDifferent` disembunyikan
- [x] `npx tsc` hijau

### ~~`r96` — Layout responsif~~ ✅
- [x] `dashboard-client.tsx`: `grid gap-6 lg:grid-cols-[38fr_62fr] lg:items-start` (rasio direvisi di W6, lihat ADR-0011 §Addendum)
- [x] `≥lg`: dua kolom berdampingan; `<lg`: stack kiri lalu kanan
- [x] File lama (section-biodata, section-detail, section-karier, section-penggajian, _section-card) dihapus
- [x] `npx tsc` hijau

## 🐛 Bug follow-up (2026-07-27) ✅

- **~~`kepegawaian-fe-50h`~~** ✅ — `getPegawaiSession()` fetch `/api/proxy` relatif di
  server component → Dashboard (`tvr`) **selalu** empty-state. **Fixed 2026-07-27:**
  `resolveToken()` diekstrak ke `appwriteSession.ts`, proxy.ts jadi thin caller,
  `getPegawaiSession()` fetch `BACKEND_URL` langsung + Bearer JWT via `resolveToken`
  (hot path decode exp, cold path mint via Appwrite). Lihat [ADR-0010](../adr/0010-server-component-backend-fetch.md).

## ~~Tutup epic~~ ✅

- [x] ~~`kepegawaian-fe-0is`~~ ✅ — Generate tipe
- [x] ~~`kepegawaian-fe-oqp`~~ ✅ — Verifikasi backend batch
- [x] ~~`kepegawaian-fe-djv`~~ ✅ — `getPegawaiSession()`
- [x] ~~`kepegawaian-fe-hnc`~~ ✅ — Data Pegawai (3 tab)
- [x] ~~`kepegawaian-fe-vfe`~~ ✅ — Terminasi (2 tab)
- [x] ~~`kepegawaian-fe-tvr`~~ ✅ — Dashboard (read-only)
- [x] ~~`kepegawaian-fe-9cm`~~ ✅ — Sidebar wiring
- [x] Semua turunan closed → `bd close kepegawaian-fe-a2e` ✅
- [x] `bd detect_changes`/`gitnexus_detect_changes` sebelum commit; `git push` + jsonl beads ter-commit ✅
