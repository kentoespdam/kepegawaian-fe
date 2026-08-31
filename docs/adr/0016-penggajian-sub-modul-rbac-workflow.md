# ADR-0016 — Modul Penggajian: 2 Sub-grup Sidebar + RBAC Granular per Fase + State Machine Workflow

**Tanggal:** 2026-08-31
**Status:** Accepted

---

## Konteks

Sistem menerima permintaan untuk mengimplementasikan modul **Penggajian** (payroll bulanan)
Perumdam Tirta Satria dengan 8 sub-fitur:

1. Seting komponen Gaji
2. Verifikasi Gapok, Tunjangan & Potongan
3. Tambahan Komponen Gaji
4. Persetujuan Akhir
5. Setting Pendapatan Non Pajak
6. Setting Tunjangan
7. Setting Lain-lain
8. Setting Ref Potongan TKK

Backend Spring Boot sudah menyediakan 12 controller (`docs/api/penggajian/api.json`) dengan
state machine workflow: `PENDING → PROSES → WAIT_VERIFICATION_PHASE_1 → WAIT_VERIFICATION_PHASE_2
→ WAIT_APPROVAL → FINISHED/FAILED`. Setiap fase punya endpoint berbeda
(`verify1`, `verify2`, `accept`, `reprocess`).

**Pertanyaan desain:**

1. Bagaimana struktur sidebar — flat (8 item), 2-grup, atau 1-grup kompilasi?
2. Route mana yang dipakai untuk workflow4 fase?
3. Bagaimana RBAC — broad (view/write) atau granular per fase?
4. Bagaimana step locking saat fase tertentu belum siap (state machine backend)?

---

## Keputusan

### 1. Sidebar: 2 sub-grup (Setup + Proses Batch)

Modul `penggajian` di sidebar punya **2 collapsible group** (NavMain pattern):

- **Setup** — 5 item: Komponen Gaji, Pendapatan Non Pajak, Tunjangan, Lain-lain, Ref Potongan TKK
- **Proses Batch** — 1 item: Proses Gaji Bulanan (entry ke workflow 4 fase)

### 2. Route: prefix `/penggajian/setup/*` + `/penggajian/batch/[id]/[fase]`

- **Setup master**: `/penggajian/setup/{entity}/page.tsx`
- **Batch list**: `/penggajian/batch/page.tsx` (+ Dialog create)
- **Detail batch**: `/penggajian/batch/[id]/layout.tsx` + 4 sub-page (`/setup`, `/verifikasi-1`,
  `/tambahan`, `/persetujuan`) — konsisten dengan preseden
  [`riwayat` (ADR-0013)](0013-riwayat-route-per-kategori.md)

### 3. RBAC: 4 permission granular per fase

| Permission | Fase | Role Default |
|---|---|---|
| `penggajian.setup` | Setup master + Fase 01 | staf-sdm, admin |
| `penggajian.verify1` | Fase 02 Verifikasi Tahap 1 | manager-sdm, admin |
| `penggajian.tambahan` | Fase 03 Tambahan | staf-keuangan, admin |
| `penggajian.approve` | Fase 04 Persetujuan (covers verify2 + accept) | manager-keuangan, admin |

### 4. Step locking: gabungan status backend + permission user

Step di rail stepper = enabled jika:
- Status backend sudah sesuai fase tsb (e.g. fase 02 enabled jika status = `WAIT_VERIFICATION_PHASE_1`), DAN
- User punya permission untuk fase tsb (e.g. fase 02 enabled jika role `manager-sdm`)

Step yang disabled = **greyed-out dengan tooltip** (BUKAN unmount, karena step lain berguna sebagai
visualisasi state machine). Backend `proxy.ts` adalah hard gate — request yang tidak authorized
ditolak server-side.

---

## Alasan

### Alasan 1: 2 sub-grup, bukan flat 8-item

- **Setup adalah CRUD master** (jarang disentuh, satu kali jalan saat konfigurasi awal) —
  pattern identik dengan 17 entitas Master.
- **Proses Batch adalah workflow multi-fase** (rutin bulanan, multi-role, multi-state) —
  pattern baru yang berbeda dari CRUD master.
- Mencampur keduanya dalam 1 flat list = UI cluttered, HR bingung mana yang "konfigurasi" vs "eksekusi".
- 1-grup kompilasi dengan 8-link landing page = menyembunyikan step workflow di belakang1 klik;
  konsider UX buruk untuk HR yang bolak-balik.

### Alasan 2: Route prefix `setup/*` + `batch/[id]/[fase]`

- **Setup/* = konsisten dengan Master**: tiap entitas punya folder sendiri, tidak perlu dynamic route.
- **Batch/[id]/[fase] = konsisten dengan ADR-0013 (riwayat)**: filter per kategori/fase wajib di
  `searchParams`, satu route bersama untuk semua fase membuat namespacing filter bertabrakan.
- **Deep-link works**: `/penggajian/batch/42/persetujuan` bisa di-share, di-bookmark.
- **RBAC per route**: guard di level layout lebih mudah dari pada guard di level tab.

### Alasan 3: 4 permission granular, bukan 2 broad / 1 single

- **Workflow aktual punya 4 peran berbeda** (Staf SDM → Manager SDM → Spv/Staf Keuangan → Manager
  Keuangan). Broad permission `penggajian.write` akan mengizinkan Staf SDM approve — salah.
- **2 broad** (setup + execute) terlalu kasar, e.g. Manager SDM tidak boleh setup komponen (bukan
  domain-nya).
- **Granular 4** memetakan tepat ke 4 peran operasional. Viewer = view-only semua fase (via
  kombinasi `penggajian.*: view`).
- **Unmount (bukan disable)** untuk unauthorized action sesuai CONTEXT-MAP. Step rail pengecualian:
  greyed-out (bukan unmount) karena step lain berguna sebagai visual state machine.

### Alasan 4: Step locking via status + permission

- **State machine backend sudah encode alur**: tinggal petakan status → enabled route.
- **Permission user**: gate kedua agar user tidak loncat fase (e.g. Staf SDM tidak boleh langsung
  ke persetujuan meski status `WAIT_APPROVAL`).
- **Defense in depth**: frontend lock = UX, backend lock = security. FE mencegah "salah klik",
  backend ultimate gate.

---

## Konsekuensi

### Positif

- Konsistensi dengan preseden project (`riwayat`, `Master`, `pendukung`).
- RBAC jelas, setiap peran tahu boundary-nya.
- Workflow visual lewat rail stepper = UX familiar untuk multi-role approval.
- Deep-link per fase works.
- 7 milestone implementasi → risiko per milestone rendah, bisa release incremental.

### Negatif / Trade-off

- **5 file route setup** + 4 file route fase + 1 layout bersama + 1 list page = ~11 file page baru.
  Disediakan via 7 milestone CLAIM-ORDER.
- **2 grup sidebar** = satu grup (Proses Batch) hanya punya1 item — mungkin terasa "kosong".
  Justifikasi: ini intentional — item tunggal = entry ke workflow besar.
- **Step rail greyed-out** (bukan unmount) menambah kompleksitas kecil di komponen stepper.
  Trade-off: visualisasi state machine > strict unmount rule.

---

## Alternatif yang Ditolak

### A. Sidebar flat 8-item

Ditolak karena: (1) UI cluttered, (2) workflow multi-fase tersembunyi di balik1 item,
(3) sulit bedakan "konfigurasi" vs "eksekusi" untuk pemula.

### B. Sidebar 1-grup kompilasi

Ditolak karena: (1) landing page kompilasi = klik ekstra untuk HR, (2) menyembunyikan step
workflow, (3) tidak ada visualisasi state machine.

### C. RBAC broad 2-permission (setup + execute)

Ditolak karena: Manager SDM akan punya `execute` padahal tidak sesuai domain-nya. Akan jadi
kesalahan岗位职责.

### D. RBAC single write permission

Ditolak karena: siapapun akan bisa approve — bertentangan dengan prinsip separation of duties
untuk payroll (umum di industri: Si/Do/Check分开).

### E. Route flat `/penggajian/batch/[id]` dengan tabs

Ditolak karena: (1) tabs/state lokal membuat deep-link tidak works, (2) RBAC per-tab lebih
rumit dari per-route, (3) inkonsisten dengan preseden `riwayat`.

---

## Referensi

- [`docs/context/penggajian.md`](../context/penggajian.md) — delta modul
- [`docs/CONTEXT-MAP.md`](../../CONTEXT-MAP.md) — core RBAC + state table rules
- [`docs/adr/0013-riwayat-route-per-kategori.md`](0013-riwayat-route-per-kategori.md) — preseden route pattern
- [`docs/api/penggajian/api.json`](../../api/penggajian/api.json) — spec backend
- [UU Cipta Kerja & PP 35/2021](https://peraturan.go.id) — referensi domain Indonesia