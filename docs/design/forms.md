# Form Engine — RHF + Zod via `<CrudForm>`

> **Muat modul ini untuk:** kerja form CRUD apa pun (Dialog/Sheet), `<CrudForm>`, validasi Zod,
> field sanksi/profesi, visual grammar form. Berisi §10 (termasuk heavy-form §10.4).
> **Sumber:** CONTEXT §Form engine/§CRUD form presentation/§Heavy-form + ADR 0002.

---

## 10. Form engine — RHF + Zod via `<CrudForm>` (ADR 0002, CONTEXT §Form engine / §CRUD form presentation)

Semua form CRUD Master = **RHF v7 + Zod** (`zodResolver`) via shadcn **`<Field />`**
(di v4 `<Field />` = lapisan markup a11y, terpisah dari state lib → kompatibel Base UI).

- **DRY:** satu primitive **`<CrudForm>`** pegang seluruh boilerplate RHF (wiring resolver,
  submit, pemetaan error backend, `isSubmitting`). Tiap entitas suplai **skema Zod + daftar field**.
- **KISS:** field sanksi (8 switch) & profesi (FK) = deskriptor field, bukan form khusus.
- **Alur:** skema Zod per-entitas → `zodResolver` → RHF `useForm` → markup `<Field>` →
  input/switch/combobox Base UI.
- Skema Zod = satu sumber kebenaran validasi client; **selaras** dengan
  `required`/`minLength`/`minimum` OpenAPI Backend tiap entitas.

### 10.1 Presentasi container — Dialog default, Sheet untuk form berat

- **Dialog** = mayoritas form pendek (2–6 field: golongan, level, dll) — cepat, tabel tetap terlihat.
- **Sheet** (right drawer, ~480px) = form berat (**sanksi** ~12 field, **profesi** 6+FK).
- Keduanya = `<CrudForm>` sama, container beda.

### 10.2 Aturan performa (WAJIB)

- Container di-mount **sekali di level halaman**; open-state + row aktif diangkat ke halaman
  (`editing` state) — **JANGAN** satu `<Dialog>`/`<Sheet>` per baris. Aksi baris hanya panggil
  `setEditing(row)`.
- Base UI Dialog/Sheet content **lazy by default** (tak di DOM sampai `open`; `keepMounted`
  default `false`, bukan `forceMount` Radix) → idle cost ≈ 0.
- FK dropdown `/list` fetch saat **form-open**, bukan saat render tabel → buka halaman Master =
  satu GET terpaginasi.

### 10.3 Visual grammar (TERKUNCI)

- **Single column, label-on-top** (jangan label inline kiri) — paling terbaca lansia, identik
  mobile/desktop.
- Field besar (aksesibilitas): tinggi input ≥44px, label ≥15px, focus ring jelas.
- **Footer aksi pinned:** sekunder **Batal** kiri, primer **Simpan** (Tirta Blue, teks putih)
  kanan; di Sheet berat footer **sticky** (Simpan selalu terjangkau).
- Submit → tombol loading (spinner + "Menyimpan…") + disable (cegah double-submit).
- **Error inline di dalam form** (Zod field error di bawah field; error submit-level di atas
  footer) — JANGAN toast untuk validasi.
- Rejected: two-column & horizontal-label (zigzag eye-path / pola mobile ganda).

### 10.3b FK field = `<FKCombobox>` searchable, enum = `<Select>` (grill 2026-07-21, epic `31p`)

FK dengan data panjang (organisasi, jabatan, grade) dirender sebagai **`<FKCombobox>`** —
CommandDialog + search (pola sama `fk-combobox-filter.tsx` di toolbar, tapi komponen **terpisah**:
form = nilai tunggal wajib, tanpa item "Semua"). **Enum** (`type:"select"` dengan `options`
**hard-coded di config**, mis. kategori/level) **tetap `<Select>`** — tak kena "pajak" buka dialog.

- **Beda FK vs enum ditentukan oleh asal `options`, bukan jumlahnya.** `useMasterTable.formFields`
  menandai field jadi `type:"combobox"` **saat meng-inject** options FK (`fkSources`/`treeField`).
  Enum yang sudah bawa `options` di config tak tersentuh → tetap `select`. **JANGAN** threshold
  `options.length` (angka ajaib).
- Search **client-side** (options sudah eager-loaded di `fkLookup`); server-search **defer** sampai
  `/list` terbukti berat.
- **Cascade** (mis. jabatan difilter organisasi di form profesi): FKCombobox `disabled` sampai
  parent terisi; reset child **hanya saat user mengubah** parent (bukan saat load edit); saat edit,
  nilai lama yang tak match filter **tetap ditampilkan** (jangan hapus diam-diam).

### 10.4 Heavy-form layout — labeled sections + switch list (CONTEXT §Heavy-form)

Dua entitas berat di **Sheet** (~480px), tersusun **labeled sections**, bukan dump field datar.

**`sanksi`** (3 core + 8 boolean + 1 conditional int):
- **Section "IDENTITAS"** → `kode`, `keterangan`, `jenisSpId` (combobox). **Required:** ketiganya.
- **Section "KONSEKUENSI SANKSI"** → 8 boolean sebagai **switch list** (Base UI Switch, satu
  efek kebijakan per baris), tiap-tiap **label bahasa manusia** (BUKAN nama field mentah):

  | Field | Label |
  |---|---|
  | `potTkk` | Potong TKK |
  | `isPendingPangkat` | Tunda kenaikan pangkat |
  | `isPendingGaji` | Tunda kenaikan gaji berkala |
  | `isTurunPangkat` | Turunkan pangkat |
  | `isTurunJabatan` | Turunkan jabatan |
  | `isSuspension` | Skorsing (suspension) |
  | `isTerminateDh` | PHK dengan hormat |
  | `isTerminateTh` | PHK tidak dengan hormat |

- **`jmlPotTkk` conditional** — tersembunyi sampai `potTkk` ON (tanpa field disabled mati di
  layout); muncul **indented** di bawah baris "Potong TKK". Kolom angka → `tabular-nums`.
- Semua flag default `false`.

**`profesi`** (grammar dua-section sama):
- **Section "IDENTITAS"** → `nama` + `organisasiId`/`jabatanId`/`gradeId` (combobox, semua FK opsional).
- **Section "DETAIL"** → `detail`, `resiko` sebagai `<textarea>` multi-line.
- **Required (Backend):** `nama`, `detail`, `resiko`.

**Aturan:** switch (bukan checkbox) untuk on/off independen; tiap flag berlabel manusia; kedua
form berat berbagi satu grammar (learn-once). Entitas sederhana tetap Dialog single-column
default — sectioning HANYA untuk dua ini.
