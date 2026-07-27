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
| **W6** | `kepegawaian-fe-3ls` | 🔴 Fix pagination: `<option value={5}>` hilang di `data-table-pagination.tsx` | P1 | — (ready) |
| **W6** | `kepegawaian-fe-gr7` | Rasio kolom → `lg:grid-cols-[38fr_62fr]` di `dashboard-client.tsx` | P2 | — (ready) |
| **W6** | `kepegawaian-fe-2n2` | Panel kiri: `multiple` + default open hanya "data-pribadi" di `section-left-panel.tsx` | P2 | — (ready) |
| **W6** | `kepegawaian-fe-098` | Buang subtitle identitas di header atas `dashboard-client.tsx` | P2 | — (ready) |
| **W6** | `kepegawaian-fe-atr` | Fibonacci spacing + whitespace-grouping (kurangi border ganda) + alignment field-grid | P2 | 2n2, 098 |
| **W6** | `kepegawaian-fe-ra3` | Uji ulang responsif lintas resolusi (mobile/tablet/desktop) | P2 | semua di atas |

### Checklist acceptance — W6

#### `kepegawaian-fe-3ls` — Fix pagination default 5 🔴
- [ ] `data-table-pagination.tsx`: tambah `<option value={5}>5</option>` (opsi hilang → dropdown render "10" walau `size`=5)
- [ ] Default page size 5 tampil benar di dropdown & jumlah baris fetch konsisten
- [ ] `npx tsc` hijau

#### `kepegawaian-fe-gr7` — Rasio kolom golden 38/62
- [ ] `dashboard-client.tsx:21`: `lg:grid-cols-[38fr_62fr]` (dari `35fr_65fr` ter-ship saat ini)
- [ ] `<lg` tetap stack kiri→kanan; tak ada overflow horizontal

#### `kepegawaian-fe-2n2` — Panel kiri accordion konsisten
- [ ] `section-left-panel.tsx:48`: `<Accordion multiple>` + default open **hanya** `"data-pribadi"`
- [ ] Kolom kiri tak "kempis" saat load (Data Pribadi terbuka), selaras panel kanan
- [ ] `npx tsc` hijau

#### `kepegawaian-fe-098` — Identitas 1×
- [ ] `dashboard-client.tsx:14-17`: buang subtitle `{nama} — {nipam}`, sisakan `<h2>Dashboard Pegawai</h2>`
- [ ] Identitas lengkap tetap ada di header panel kiri (tak dobel)

#### `kepegawaian-fe-atr` — Fibonacci spacing + grouping + alignment
- [ ] Ritme jarak ikut deret φ (8→13→21→34); hapus spacing ad-hoc yang timpang
- [ ] Grouping via whitespace, bukan border ganda (accordion `not-last:border-b` + border kartu jangan tumpuk)
- [ ] Field-grid: baris kosong "-" tak bikin alignment ragged (rata antar kolom)

#### `kepegawaian-fe-ra3` — Uji responsif
- [ ] Verifikasi ≥lg (2 kolom), tablet, mobile (stack) — screenshot bukti
- [ ] Tak ada regresi layout dari perubahan W6

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
