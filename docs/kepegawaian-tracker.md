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
