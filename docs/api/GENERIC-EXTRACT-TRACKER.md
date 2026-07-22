# Tracker — `extract-types.js` generic multi-modul

Papan monitoring untuk agent yang menggeneralisasi generator tipe dari **single-modul (master)**
menjadi **multi-modul (scan semua folder di `docs/api/`)**.

Parent beads (epic): **`kepegawaian-fe-dki`**

**Aturan klaim:** ambil issue paling atas yang `open` & tak diblokir → `bd update <id> --claim`
→ kerjakan → centang checklist → `bd close <id>` → `git push` + `bd dolt push`.

> **Batas manager (JANGAN dilanggar):** Claude = manager. Implementasi kode (termasuk
> `docs/api/extract-types.js`, test, dan sync ke `src/types/`) **dikerjakan agent**, bukan Claude
> langsung. Dokumen context/ADR/tracker boleh diedit manager.

---

## Keputusan terkunci (hasil grill — JANGAN diubah tanpa konfirmasi user)

Enam cabang di-grill dan dikunci (semua user memilih **A**):

### Q1 — Multi-spec aware, SATU `_shared.ts` lintas-modul
Generator membaca **semua** spec modul di `docs/api/*/api.json`, menggabung peta schema, dan
menghitung "shared" **lintas semua modul**. Output: **satu** `_shared.ts` di root + subfolder
per-modul. Alasan: layout fisik `src/types/` **sudah** mengasumsikan ini (`src/types/_shared.ts`
ada di root, file entity import `../_shared`). 8 schema yang identik byte-for-byte antara master ∩
pegawai (`DeletedResult`, `JabatanMiniResponse`, `JenjangPendidikanResponse`, `LevelResponse`,
`OrganisasiMiniResponse`, `PageableObject`, `SavedResultLong`, `SortObject`) otomatis naik ke
`_shared.ts`, tidak terduplikasi per-modul.

### Q2 — Strategi "domain" per-modul, via config per-folder (`module.json`)
Master & pegawai beda bentuk dan **tidak bisa dibedakan secara sintaksis** (`grade` entity vs
`list`/`batch`/`profil` action — sama-sama segmen non-param). Maka bentuk dideklarasikan, bukan
ditebak. Tiap folder modul berisi `docs/api/<modul>/module.json` minimal:

```json
{ "type": "resource" }     // pegawai  → seluruh modul = 1 domain = nama folder
{ "type": "collection" }   // master   → domain = segmen entity setelah prefix /master/
```

- **`collection`** (master): `domainOf(path)` = segmen entity setelah `/<modul>/` (perilaku lama).
- **`resource`** (pegawai): `domainOf(path)` = konstan nama folder (`pegawai`). Path
  `/pegawai/{id}`, `/pegawai/list`, `/pegawai/batch`, `/pegawai/{id}/profil` **semua** → domain
  `pegawai` → satu file `pegawai.ts`.
- Prefix (`/pegawai`, `/master`), nama resource, dan lokasi diturunkan dari **nama folder**. Nambah
  modul = folder baru + `module.json` 1-baris. **Script tidak disentuh.**
- `prefix` boleh jadi field opsional override nanti — YAGNI sampai ada modul yang prefix-nya ≠ nama
  folder.

### Q3 — Layout output MIRROR `src/types/`; placement lintas-modul; jaga `_computed.ts`
Output generator (di `docs/api/types/`) meniru **persis** struktur `src/types/`:
```
docs/api/types/_shared.ts          ← import via ../_shared
docs/api/types/master/*.ts
docs/api/types/pegawai/*.ts
```
Sync ke `src/types/` jadi **copy struktur apa adanya + biome**, tanpa penerjemahan path
(`./_shared` → `../_shared`) yang selama ini jadi sumber galat manual.
- **`placementOf` jadi lintas-modul:** schema dipakai ≥2 domain **lintas SEMUA modul** → `_shared.ts`
  root; else → file entity di subfolder modulnya.
- **`_computed.ts` HAND-WRITTEN (`src/types/master/_computed.ts`, header "DITULIS MANUAL").**
  Generator TIDAK boleh menyentuhnya (lihat Q6 proteksi).

### Q4 — Konflik nama-schema → FAIL KERAS saat generate
Saat merge lintas-modul: nama sama + bentuk **identik** (deep-equal) → merge jadi 1 definisi shared.
Nama sama + bentuk **beda** → `throw` (`<Name>: konflik <modulA> vs <modulB>`) + exit 1. Mengubah
kelas bug "senyap → runtime" jadi "berisik → generate-time". Deep-equal toh sudah dibutuhkan untuk
memutuskan merge, jadi cek konflik praktis gratis.

### Q5 — Tanpa arg CLI: selalu baca semua, tulis semua
Arg `domain`/`--module` lama **dihapus**. Satu perintah = scan semua folder → generate semua output.
Alasan: placement lintas-modul **wajib** membaca semua spec agar benar (regenerate-satu-modul-saja
akan salah menaruh schema shared → `_shared.ts` menyimpang). Generate itu cepat & jarang; mode
parsial hanya mengundang `_shared.ts` tak sinkron. Diff per-modul cukup lewat `git diff`.

### Q6 — Sync per-file idempoten; proteksi implisit "hanya sentuh file yang di-plan"
`extract-types.js` menyediakan langkah sync yang **copy per-file** (hanya file yang ada di plan) lalu
biome — **tidak pernah** `rm -rf` folder tujuan. Konsekuensi: file hand-written (`_computed.ts`, dan
calon serupa di modul lain) aman **by construction** — generator hanya menulis/menimpa file yang ada
di plan-nya; file lain di folder tujuan tak disentuh. **Proteksi implisit** (bukan whitelist yang
harus dirawat).

---

## Peta modul saat ini (`docs/api/`)

| Modul | `type` | Bentuk path | Domain dihasilkan |
|---|---|---|---|
| `master` | `collection` | `/master/{entity}/...` (2-level) | 22 entity → 22 file |
| `pegawai` | `resource` | `/pegawai/...` (1-level, modul = resource) | 1 domain `pegawai` → 1 file |

## Schema identik master ∩ pegawai (terverifikasi byte-for-byte → naik ke `_shared.ts`)

`DeletedResult` · `JabatanMiniResponse` · `JenjangPendidikanResponse` · `LevelResponse` ·
`OrganisasiMiniResponse` · `PageableObject` · `SavedResultLong` · `SortObject`

---

## Backlog implementasi

| # | Beads | Judul | Depends on | Status |
|---|-------|-------|-----------|--------|
| 1 | `kepegawaian-fe-q4e` | Pindah `extract-types.js` → `docs/api/` + baca semua modul (Q1,Q5) | epic | ✅ closed |
| 2 | `kepegawaian-fe-7un` | Config per-folder `module.json` + `domainOf` per-strategi (Q2) | #1 | ✅ closed |
| 3 | `kepegawaian-fe-kpy` | Placement lintas-modul + deteksi konflik fail-keras (Q3,Q4) | #1 | ✅ closed |
| 4 | `kepegawaian-fe-fd3` | Layout output mirror `src/types/` + sync per-file idempoten (Q3,Q6) | #1 | ⬜ blocked |
| 5 | `kepegawaian-fe-y95` | Sesuaikan `extract-types.test.ts` ke multi-modul | #2,#3,#4 | ⬜ blocked |
| 6 | `kepegawaian-fe-xx9` | Generate + sync tipe pegawai → `src/types/pegawai/` + quality gate | #4,#5 | ⬜ blocked |

Epic: `kepegawaian-fe-dki`.

> `split-openapi.js` **DIPARKIR** (user: skip). Tidak ada perubahan pada `endpoints/*.json`
> (terbukti nol consumer).

---

## 📋 Papan claim-order (monitoring pengerjaan)

Urutan klaim mengikuti rantai dependency. Ambil issue paling atas yang **UNBLOCKED**.
Kerjakan → centang seluruh checklist DoD → `bd close <id>` → `git push` + `bd dolt push`.
Menutup satu issue akan meng-*unblock* issue di bawahnya.

```
        ┌─────────────── #1 q4e (pindah + scan semua modul)
        │                    │  unblocks
        ├──────────┬─────────┼──────────┐
       #2 7un    #3 kpy    #4 fd3        │
     (module   (placement (layout+sync)  │
      .json)   +konflik)                 │
        └──────────┴─────────┘           │
                   │ ketiganya unblock   │
                  #5 y95 (test)          │
                   │                     │
                   └────────┬────────────┘
                       #4 + #5 unblock
                          #6 xx9 (generate+sync pegawai)
```

### ✅ #1 — `kepegawaian-fe-q4e` — pindah + scan semua modul  · SELESAI
- [x] `bd update kepegawaian-fe-q4e --claim`
- [x] File dipindah ke `docs/api/extract-types.js` (bukan `git mv` polos)
- [x] Discover semua `docs/api/*/api.json` (folder ber-`api.json` = modul) — 6 modul
- [x] `OUTPUT_DIR` → `docs/api/types/`
- [x] Seam `plan()`/`render()`/`main()` tetap terjaga & testable — exports sama
- [x] Arg CLI domain-filter DIHAPUS (satu run = baca semua, tulis semua)
- [x] Tak ada `INPUT_FILE` single-file / regex `/^\/master\//` hardcode di jalur discovery
- [x] `node docs/api/extract-types.js` jalan tanpa arg → 48 domain dari 6 modul
- [x] `bd close` + push

### ✅ #2 — `kepegawaian-fe-7un` — `module.json` + `domainOf` per-strategi  · SELESAI
- [x] `bd update kepegawaian-fe-7un --claim`
- [x] `docs/api/master/module.json` = `{ "type": "collection" }`
- [x] `docs/api/pegawai/module.json` = `{ "type": "resource" }`
- [x] `collection`: `domainOf` = segmen entity setelah `/<modul>/` (prefix dari nama folder)
- [x] `resource`: `domainOf` = konstan nama folder
- [x] `module.json` hilang → error eksplisit (tak nebak)
- [x] Verifikasi: master → 20+ domain, pegawai → 1 domain `pegawai` (1 file `pegawai.ts`)
- [x] `bd close` + push

### ✅ #3 — `kepegawaian-fe-kpy` — placement lintas-modul + konflik fail-keras  · SELESAI
- [x] `bd update kepegawaian-fe-kpy --claim`
- [x] `placementOf` hitung domain **lintas semua modul** (≥2 → `_shared.ts`) — sudah berjalan sejak #1
- [x] Merge schema identik (deep-equal) antar spec — via `deepEqual()` di merge loop
- [x] Nama sama + bentuk beda → `throw` + `exit 1` (bukan last-write-wins)
- [x] 8 schema master∩pegawai muncul **hanya** di `_shared.ts` (terverifikasi)
- [ ] `bd close` + push

### ✅ #4 — `kepegawaian-fe-fd3` — layout mirror `src/types/` + sync idempoten  · SELESAI
- [x] `bd update kepegawaian-fe-fd3 --claim`
- [x] Output: `docs/api/types/_shared.ts` + `docs/api/types/{master,pegawai}/*.ts`
- [x] Entity file import `../_shared` (selalu di subfolder)
- [x] Sync = copy **per-file** (hanya file di plan) + `biome check --write src/types/`
- [x] TIDAK ada `rm -rf` folder tujuan
- [x] `src/types/master/_computed.ts` tak tersentuh (proteksi implisit)
- [x] Run generator 2× → idempoten (git diff kosong run kedua)
- [x] `bd close` + push

### ⬜ #5 — `kepegawaian-fe-y95` — sesuaikan test multi-modul  · butuh #2,#3,#4
- [ ] `bd update kepegawaian-fe-y95 --claim`
- [ ] Test dipindah ke `docs/api/extract-types.test.ts`, import `./extract-types`
- [ ] Kasus `domainOf` collection + resource
- [ ] Kasus `placementOf` lintas-modul (2 modul → shared; 1 domain → lokal)
- [ ] Kasus konflik nama-sama-bentuk-beda → `throw`
- [ ] Pakai framework test yang sudah ada di repo (cek `package.json` dulu)
- [ ] Suite hijau
- [ ] `bd close` + push

### ⬜ #6 — `kepegawaian-fe-xx9` — generate + sync pegawai + quality gate  · butuh #4,#5
- [ ] `bd update kepegawaian-fe-xx9 --claim`
- [ ] `node docs/api/extract-types.js` → `docs/api/types/pegawai/pegawai.ts` ada
- [ ] Output `master/*` tidak berubah tak-terduga (git diff ~ kosong)
- [ ] Sync → `src/types/pegawai/pegawai.ts` (+ update `_shared.ts` bila perlu)
- [ ] `_computed.ts` utuh
- [ ] `npx biome check --write src/types/` bersih + typecheck (`tsc --noEmit`/skrip repo) lulus
- [ ] TIDAK bikin config/tabel/form UI (di luar scope)
- [ ] `bd close` + push

> Cara update papan: setelah `bd close`, ubah ⬜→✅ pada judul issue di atas dan status di tabel
> backlog. `bd show <id>` = sumber kebenaran; papan ini cuma cermin cepat.
