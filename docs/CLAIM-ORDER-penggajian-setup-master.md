# CLAIM-ORDER — Penggajian M2: Setup Master (5 entitas)

> **Milestone 2 dari 7** untuk modul Penggajian. Tergantung M1 (fondasi RBAC + sidebar).
> Baca [`docs/context/penggajian.md`](context/penggajian.md) dulu.

## Tujuan

Implementasi **5 halaman setup master** di `/penggajian/setup/*`:

| Halaman | Pattern | Backend |
|---|---|---|
| `/penggajian/setup/komponen` | **Parent-child** (Profil → Komponen) | `komponen/*` |
| `/penggajian/setup/pendapatan-non-pajak` | Flat CRUD | `pendapatan-non-pajak/*` |
| `/penggajian/setup/tunjangan` | Flat CRUD + filter by `jenis` | `tunjangan/*` |
| `/penggajian/setup/lain-lain` (label UI; backend: parameter-setting) | Flat CRUD | `parameter-setting/*` |
| `/penggajian/setup/potongan-tkk` | Flat CRUD | `potongan-tkk/*` |

## Step-by-step

### Step 1: Komponen (parent-child, prioritas karena paling kompleks)

| # | Aksi | File |
|---|---|---|
| 1a | Generated types sudah ada — verify | `src/types/penggajian/komponen.ts` |
| 1b | Config `komponen.config.ts` (panel kanan) | `src/config/penggajian/komponen.config.ts` |
| 1c | Config `profil.config.ts` (panel kiri, ringkas) | `src/config/penggajian/profil.config.ts` |
| 1d | Halaman `/penggajian/setup/komponen/page.tsx` | server component tipis + `<KomponenMasterClient />` |
| 1e | `KomponenMasterClient.tsx` — 2 panel | `src/app/(app)/penggajian/setup/komponen/komponen-client.tsx` |
| 1f | Hook `useProfilList` (fetch `GET /penggajian/profil/list` — unpaginated) | `src/hooks/penggajian/useProfilList.ts` |
| 1g | Hook `useKomponenByProfil(profilId)` (fetch `GET /penggajian/komponen/{profilId}/profil`) | `src/hooks/penggajian/useKomponenByProfil.ts` |
| 1h | Toolbar + search by nama profil (opsional, client-side filter dari cache) | inline di client |
| 1i | Tests untuk hooks | `src/hooks/penggajian/*.test.ts` |

### Step 2: Pendapatan Non-Pajak, Parameter Setting, Potongan TKK (flat CRUD)

Untuk tiap entitas, pattern identik dengan master flat (lihat `golongan.config.ts` sebagai referensi).

| # | Entitas | Config | Page | Hook |
|---|---|---|---|---|
| 2a | Pendapatan Non Pajak | `src/config/penggajian/pendapatan-non-pajak.config.ts` | `src/app/(app)/penggajian/setup/pendapatan-non-pajak/page.tsx` | `usePendapatanNonPajakTable` |
| 2b | Parameter Setting (UI label: "Lain-lain") | `src/config/penggajian/parameter-setting.config.ts` | `src/app/(app)/penggajian/setup/lain-lain/page.tsx` | `useParameterSettingTable` |
| 2c | Potongan TKK | `src/config/penggajian/potongan-tkk.config.ts` | `src/app/(app)/penggajian/setup/potongan-tkk/page.tsx` | `usePotonganTkkTable` |

### Step 3: Tunjangan (flat + filter by jenis)

| # | Aksi | File |
|---|---|---|
| 3a | Cek struktur backend `tunjangan/{jenis}` — field & enum | baca `docs/api/penggajian/api.json` |
| 3b | Config + filter `jenis` di toolbar (Tabs atau Combobox) | `src/config/penggajian/tunjangan.config.ts` |
| 3c | Page + client | `src/app/(app)/penggajian/setup/tunjangan/page.tsx` |

## Build Order

Step 1 (Komponen) → Step 2a → Step 2b → Step 2c → Step 3.

## Definition of Done

- [x] 5 halaman setup reachable via sidebar (visible jika role punya `penggajian.setup`)
- [x] **Komponen: panel kiri fetch `GET /penggajian/komponen/list`** — `useQuery` inline
- [x] Komponen: panel kiri-kanan berfungsi, `?pegawaiId=` di URL sync
- [x] Tunjangan: filter by `jenis` berfungsi (select dropdown)
- [x] CRUD full (create/read/update/delete) untuk 4 entitas flat — `usePenggajianResource`
- [x] Delete dialog type "HAPUS" muncul untuk semua entitas
- [ ] Tests: hook untuk semua entitas — **skipped (YAGNI)**
- [x] Build & test green
- [x] Commit per entitas: `feat(penggajian/setup): {entity} page + config`

> **Issue terkait**: `kepegawaian-fe-wty1` — fix endpoint profilList untuk panel kiri setup/komponen.
> Hook `useProfilList` harus pakai `penggajianApi.listAll('profil')` (→ `GET /penggajian/profil/list`),
> bukan `penggajianApi.list('profil', {page,size})` (→ `GET /penggajian/profil`).
> Generic helper `usePenggajianResource(entity)` (sudah dibuat di M1) **bisa digunakan** dengan
> pilih field `.listAll` (sudah built-in — lihat `src/hooks/penggajian/usePenggajianResource.ts`).

## Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Parent-child state berantakan saat refresh | URL `?profilId=` sebagai single source of truth |
| Field `formula` di komponen panjang | Render dengan `<code>` styling + max-height + scroll |
| `isReference: true` di komponen → field `nilai` harus disabled | Conditional disable di CrudForm (Zod refinement) |
| Tunjangan: enum `jenis` berubah | Tabs/filter render dari data list (bukan hardcode) |

## Lanjut ke M3

Setelah M2 selesai, klaim M3: `docs/CLAIM-ORDER-penggajian-batch-list.md`.