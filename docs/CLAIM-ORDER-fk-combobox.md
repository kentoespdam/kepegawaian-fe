# Claim Order — FK selectbox → searchable `<FKCombobox>` (CommandDialog)

> Papan pantau untuk agen implementer. Sumber kebenaran status = **beads (`bd`)**, bukan file ini.
> File ini = **urutan claim** + **checklist** biar mudah dibaca sekilas.
> Jangan pakai TodoWrite/markdown lain untuk tracking — pakai `bd`.
>
> Alur per issue: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.

**Epic:** `kepegawaian-fe-31p`

**Tujuan.** FK dengan data panjang (organisasi, jabatan, grade) di **form** masih pakai `<Select>`
shadcn — scroll panjang, tak bisa search. Ganti jadi **CommandDialog searchable**. Sorotan utama
user: **form profesi** (FK organisasi + cascade jabatan).

**Yang TIDAK berubah.** Enum kecil (field `type:"select"` yang `options`-nya **hard-coded di
config**, mis. kategori/level) **tetap `<Select>`**. Toolbar filter juga tak disentuh — sudah pakai
`FKComboboxFilter` (CommandDialog) sejak awal.

---

## Keputusan terkunci (grill 2026-07-21)

| # | Keputusan | Konsekuensi |
|---|---|---|
| **B1** | FK auto-jadi `type:"combobox"` di `useMasterTable` enrich; enum tetap `select` | Nol flag manual di 16 config. Beda FK vs enum = **asal options** (FK-injected vs config-owned), bukan threshold angka |
| **Q2** | Heavy form profesi & sanksi **ikut** (hand-written, tak lewat enrich) | Issue terpisah `508` |
| **Q3** | Cascade jabatan←organisasi: disabled-sampai-org / reset-hanya-on-user-change / **preserve-existing-saat-edit** | Issue terpisah `bfz`. Data-loss dilarang |
| **Q4** | Komponen **baru `<FKCombobox>`** (form-oriented), **terpisah** dari `fk-combobox-filter` | Semantik nilai beda (single-required vs "Semua"/toggle). Berbagi primitive `Command` shadcn |
| **Q5** | Search **client-side** (options eager-loaded); server-search **defer** | `ponytail:` ceiling ditandai di komponen |
| — | Issue `kla` **superseded** | Premisnya usang (toolbar sudah pakai combobox); form-half didesain ulang |

---

## Peta ketergantungan

```
rgz  FKCombobox component (fondasi)
      │
      ├──> 3ym  generic CrudForm (B1: enrich auto-tag + render combobox)
      ├──> 508  heavy-form profesi & sanksi (ganti 4 <Select>)
      │          │
      └──────────┴──> bfz  cascade jabatan←organisasi (butuh rgz + 508)
```

`bd ready` memunculkan issue yang blocker-nya tuntas. **Kerjakan `rgz` dulu.**

---

## Prasyarat (baca sebelum ngoding)

1. `src/components/fk-combobox-filter.tsx` — **pola acuan** CommandDialog + search (jangan diubah).
2. `src/components/ui/command.tsx` — primitive cmdk.
3. `docs/design/forms.md` §10.3 (visual grammar) & §10.4 (heavy-form).
4. `docs/design/coding-rules.md` §8 (cakupan field vs `*PostRequest`).
5. `gitnexus_impact` sebelum edit simbol; `gitnexus_detect_changes` sebelum commit. Index stale →
   `npx gitnexus analyze` dulu.

---

## Urutan claim

### 1. `kepegawaian-fe-rgz` — `<FKCombobox>` komponen (TASK, P2) ✅
**← depends on:** — (ready duluan)

- [x] **New** `src/components/fk-combobox.tsx`. Copy pola CommandDialog dari `fk-combobox-filter.tsx`,
      **buang** item "Semua"/toggle-off (form = single-required).
- [x] Interface terkunci: `options[] / value(string|number|undefined) / onChange / placeholder /
      searchPlaceholder / disabled / loading / emptyText / id / invalid`.
- [x] Bandingkan value sebagai `String()` (FK id bisa number).
- [x] Search **client-side** via `CommandInput`. Tandai `ponytail: client-side filter, server-search
      jika /list organisasi terbukti berat`.
- [x] **Tanpa** virtualization (rung-3 lazy).
- [x] a11y: trigger `id` (nyambung `<Label htmlFor>`), `aria-invalid={invalid}`, h-11 (forms.md §10.3).
- [x] `fk-combobox-filter.tsx` **TIDAK** diubah.
- [ ] Quality gate (`bunx biome check` + build) + `gitnexus_detect_changes` + `bd close`.

### 2. `kepegawaian-fe-3ym` — Wire ke generic CrudForm (TASK, P2) ✅
**← depends on:** `rgz` ✅

- [x] `src/hooks/useMasterTable.ts` `formFields` enrich: saat inject options ke FK (blok
      `fkSources.find` + `treeField`), set `type: "combobox"`. Enum (`f.options` sudah ada → return
      lebih awal) **tak tersentuh**.
- [x] `src/components/crud-form.tsx`: cabang `type==='combobox'` → `<FKCombobox>`; `type==='select'`
      **tetap** `<Select>`. Tambah `"combobox"` ke union `FormField.type`.
- [x] **JANGAN** threshold `options.length` (angka ajaib — ditolak).
- [x] `gitnexus_impact` pada `useMasterTable` + `CrudForm` **sebelum** edit (blast radius tinggi —
      laporkan risk ke reviewer).
- [ ] Verifikasi: form organisasi → Parent = FKCombobox; entitas enum → tetap Select; create/edit
      kirim value benar.
- [ ] Quality gate + `gitnexus_detect_changes` + `bd close`.

### 3. `kepegawaian-fe-508` — Heavy form profesi & sanksi (TASK, P2) ✅
**← depends on:** `rgz` ✅

- [x] `profesi-form.tsx`: 3 `<Select>` (organisasiId/jabatanId/gradeId) → `<FKCombobox>`. Options
      dari `useFkOptions` existing. `onChange` coerce `Number(v)||undefined`.
- [x] `sanksi-form.tsx`: `jenisSpId` `<Select>` → `<FKCombobox>` (baca file, konfirmasi field).
- [x] Pertahankan grammar heavy-form (labeled sections, sticky footer, h-11) — forms.md §10.4.
- [x] **Scope boundary:** cascade **BUKAN** di sini — jabatan tetap tampil semua.
- [x] `gitnexus_impact` `ProfesiForm`/`SanksiForm` sebelum edit.
- [ ] Verifikasi: edit existing → FK label benar; submit kirim FK id (number) benar.
- [ ] Quality gate + `gitnexus_detect_changes` + `bd close`.

### 4. `kepegawaian-fe-bfz` — Cascade jabatan←organisasi (FEATURE, P2)
**← depends on:** `rgz`, `508`

- [ ] `src/lib/api/client.ts`: fetcher baru `GET /master/jabatan/organisasi/{orgId}` (endpoint ada —
      lihat header `src/types/master/jabatan.ts`). Ikut pola `listAll`/`handle`.
- [ ] `profesi-form.tsx`: jabatan options = `useQuery` by `watch("organisasiId")`, `enabled:!!orgId`,
      `staleTime 300_000`.
- [ ] **3a** disabled: `disabled={!organisasiId}`, `emptyText="Pilih organisasi dulu"`.
- [ ] **3b** reset **hanya on user-change**: di `onChange` organisasi → `setValue("jabatanId",
      undefined)`. **BUKAN** `useEffect` yang jalan saat mount (itu me-reset saat load edit).
- [ ] **3c** preserve existing: saat load edit, fetch by organisasi awal; kalau `jabatanId` lama tak
      match filter → **tetap tampilkan label lama** (jangan diam-diam hapus). **Data-loss dilarang.**
- [ ] `gitnexus_impact` sebelum edit.
- [ ] Verifikasi: org kosong→jabatan disabled; pilih org→list menyempit; ganti org→jabatan reset;
      **edit existing→tidak ter-reset saat load, jabatan lama tak hilang**.
- [ ] Quality gate + `gitnexus_detect_changes` + `bd close`.

---

## Definition of Done (epic `31p`)

- Form organisasi & FK panjang lain → CommandDialog searchable, bukan Select scroll.
- Enum kecil tetap `<Select>` (tak kena "pajak" buka dialog).
- Profesi: organisasi/jabatan/grade searchable; jabatan ter-cascade oleh organisasi.
- Edit data existing tak pernah menghapus FK valid secara diam-diam.
- `bunx biome check` + build lolos; `gitnexus_detect_changes` bersih tiap issue.
