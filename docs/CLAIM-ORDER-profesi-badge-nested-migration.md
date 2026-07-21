# Claim Order — Migrasi Badge APD & Alat Kerja ke nested route profesi

> Papan pantau **migrasi** untuk agen implementer. Sumber kebenaran status = **beads (`bd`)**,
> bukan file ini. File ini = **urutan claim** + **checklist** biar mudah dibaca sekilas.
> Jangan pakai TodoWrite/markdown lain untuk tracking — pakai `bd`.
>
> Alur per issue: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.
> `bd ready` HANYA memunculkan issue yang blocker-nya tuntas — **selalu tanya `bd ready` dulu**.

**Kenapa migrasi ini ada.** Fitur badge apd/alat-kerja SUDAH terbangun (lihat
[`CLAIM-ORDER-profesi-badge.md`](./CLAIM-ORDER-profesi-badge.md), semua issue closed), tapi memakai
**route flat lama**: `POST /master/apd` dengan body `{profesiId, nama}`, plus entitas standalone
berhalaman (config + type + registrasi). Backend sudah pindah ke **nested route**:

```
POST/PUT/DELETE /master/profesi/{profesiId}/apd[/{id}]      # idem alat-kerja
body = {nama}      # profesiId di PATH, BUKAN di body
```

`apd` & `alat-kerja` **bukan lagi entitas berhalaman** — hanya kolom badge inline di tabel
`profesi`. Semua artefak standalone-nya dihapus.

**Desain terkunci** di [`docs/context/master.md`](./context/master.md)
§ *`apd` & `alat-kerja` — badge column inline di tabel `profesi` (nested route)*. Baca itu sebelum ngoding.

---

## Prasyarat (baca sebelum ngoding)

1. [`docs/context/master.md`](./context/master.md) — desain nested-route terkunci (WAJIB).
2. [`CONTEXT-MAP.md`](../CONTEXT-MAP.md) — konvensi lintas-modul (endpoint, api client, RBAC).
3. [`docs/design/coding-rules.md`](./design/coding-rules.md) — aturan wajib (baris ≤120, logika ke `src/hooks/`).
4. `node_modules/next/dist/docs/` untuk API Next.js (versi ini breaking — jangan asumsi training data).
5. **GitNexus (utamakan ini, bukan grep/find):** `gitnexus_impact` sebelum edit simbol;
   `gitnexus_detect_changes` sebelum commit. **WAJIB pass `repo:"kepegawaian-fe"`** (banyak repo terindeks).
   Index stale → `npx gitnexus analyze` dulu.

---

## Urutan claim

`bd ready` hanya memunculkan issue yang blocker-nya tuntas. Ikuti urutan ini.

### 1. `kepegawaian-fe-hd7` — Migrasi `useBadgeMutations` ke nested route
**← depends on:** — (ready duluan)

`src/hooks/useBadgeMutations.ts` masih hit route flat. Sesuaikan ke nested.

- [x] `gitnexus_impact({target:"useBadgeMutations", direction:"upstream", repo:"kepegawaian-fe"})` — lapor blast radius.
- [x] Signature: `useBadgeMutations(entity)` → `useBadgeMutations(entity, profesiId)`.
- [x] Composite path via `api.create/update/remove`:
  - create: `api.create(\`profesi/${profesiId}/${entity}\`, {nama})`
  - update: `api.update(\`profesi/${profesiId}/${entity}\`, id, {nama})`
  - remove: `api.remove(\`profesi/${profesiId}/${entity}\`, id)`
- [x] Body mutation DROP `profesiId` → **`{nama}` saja** (profesiId ada di path). Tipe = `ApdPostRequest`/`AlatKerjaPostRequest` (`{nama:string}`) di `src/types/master/profesi.ts`.
- [x] `invalidateAll`: **HAPUS** `qc.invalidateQueries({queryKey:[entity]})`, **SISAKAN HANYA** `qc.invalidateQueries({queryKey:["profesi"]})`.
- [x] **JANGAN ubah** `src/proxy.ts` & `src/lib/api/client.ts` — rewrite jalan di kedalaman path apa pun, `entity` diinterpolasi mentah.
- [x] `gitnexus_detect_changes({repo:"kepegawaian-fe"})` + typecheck. `bd close`.

### 2. `kepegawaian-fe-e4y` — `BadgeManager` teruskan `profesiId` ke hook
**← depends on:** `hd7`

- [x] `gitnexus_impact` upstream pada `BadgeManager` (`repo:"kepegawaian-fe"`).
- [x] `src/components/badge-manager.tsx`: panggil `useBadgeMutations(entity, profesiId)`. Prop `profesiId` sudah disuplai `profesi.config.tsx` (`profesiId={item.id}`) — verifikasi ada di props; tambahkan bila belum.
- [x] Payload create/edit tinggal `{nama}`.
- [x] `gitnexus_detect_changes` + typecheck. `bd close`.

### 3. `kepegawaian-fe-bif` — Hapus artefak standalone apd/alat-kerja
**← depends on:** — (independen, boleh paralel dgn hd7/e4y)

apd & alat-kerja bukan entitas berhalaman lagi. Bersihkan.

- [x] `gitnexus_impact` upstream pada `apdConfig` **dan** `alatKerjaConfig` (`repo:"kepegawaian-fe"`). **Pastikan tak ada consumer selain `master-config.ts`.** Ada consumer tak terduga → **STOP & flag ke manager.**
- [x] Hapus file: `src/config/master/apd.config.ts`, `src/config/master/alat-kerja.config.ts`, `src/types/master/apd.ts`, `src/types/master/alat-kerja.ts` (tipe sudah disatukan ke `profesi.ts`).
- [x] `src/config/master-config.ts`: hapus import `alatKerjaConfig` (±L2) & `apdConfig` (±L3); hapus registrasi `apd` (±L41) & `"alat-kerja"` (±L42). Map 17 → 15 entry.
- [x] `src/config/master-entity-types.ts`: hapus import apd/alat-kerja (±L16-17) & entry type-map (±L115-121). **Verifikasi nomor baris aktual — jangan percaya buta.**
- [x] **JANGAN sentuh** `src/config/entities.ts` (sudah 15 entry, apd/alat-kerja memang tak ada).
- [x] `gitnexus_detect_changes` + typecheck + `bunx biome check` (pastikan tak ada import yatim). `bd close`.

### 4. `kepegawaian-fe-fki` — Hapus spec OpenAPI flat yang stale
**← depends on:** — (independen)

- [x] Verifikasi keempat file memang spec route **FLAT** (`/master/apd`, bukan `/master/profesi/{profesiId}/apd`).
- [x] Verifikasi spec **nested** yang benar SUDAH ADA di `docs/api/master/endpoints/`. Belum ada → **STOP & flag.**
- [x] Hapus: `docs/api/master/endpoints/{apd,alat-kerja,apd-by-id,alat-kerja-by-id}.json`.
- [x] **JANGAN edit file types generated** (regen via `docs/api/master/extract-types.js` bila `master.json` berubah — di luar scope ini). `bd close`.

---

## Definition of Done (tiap issue)

- [ ] Sesuai desain di `docs/context/master.md` (bukan improvisasi).
- [ ] Baris ≤120; logika ke `src/hooks/`; RBAC via `can()` — tak ada `role === 'admin'` hardcode.
- [ ] `gitnexus_impact` sebelum edit, `gitnexus_detect_changes` sebelum commit — selalu `repo:"kepegawaian-fe"`.
- [ ] Quality gate lolos (`bunx tsc --noEmit`, `bunx biome check`).
- [ ] `bd close`. **Commit + push = tugas manager saat tutup sesi**, bukan agen.

---

## Invarian yang tak boleh dilanggar

- **profesiId di PATH, bukan body.** Body mutation = `{nama}` saja.
- **Invalidate hanya `["profesi"]`.** Tak ada lagi query `[entity]` (apd/alat-kerja tak berhalaman).
- **`proxy.ts` & `api/client.ts` tidak diubah.** Composite path string langsung jalan.
- **`entities.ts` tidak diubah.** Sudah 15 entry, konsisten dgn target akhir `master-config.ts`.
