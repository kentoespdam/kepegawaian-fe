# ADR-0041 — Persetujuan Cuti: Gate Approver (menu + page, reversal CU-10)

**Tanggal:** 2026-08-18
**Status:** Accepted

---

## Konteks

Keputusan awal (CU-10) menetapkan halaman `/cuti/persetujuan` terbuka untuk **semua pegawai
yang login** — non-approver cukup melihat list kosong (konten per-role). Review dengan role
`USER` menemukan dua masalah:

1. **User `890300426` (jabatan supervisor, NIPAM) mendapat "Akun ini tidak terhubung ke data
   pegawai"** — error yang sama muncul di Dashboard & Pengajuan (satu fungsi
   `getPegawaiSession()`). Root cause: **identity bridge putus**. Bridge mengasumsikan
   `Appwrite $id = pegawaiId` (ADR-0006), tapi akun diprovisioning **by NIPAM**
   (`POST /system/users` body `{nipam, nama, password, roles}`) → `$id` ≠ `pegawaiId` →
   `GET /pegawai/{$id}` 404 → `pegawai: null`.
2. **Staf tetap melihat menu Persetujuan Cuti** padahal ekspektasi bisnis: menu hanya untuk
   yang **punya anak buah** (approver posisional); jabatan staf tidak berhak.

**Kendala gating:** rantai approval bersifat **posisional** — backend menentukan `picSaatIni`
(jabatan approver) dari struktur jabatan, bukan dari permission. Supervisor ber-role `USER`
yang **tidak** memegang `CUTI:APPROVE` tetap approver. Jadi permission RBAC **tidak dapat**
menyatakan "punya anak buah".

Alternatif deteksi approver yang dipertimbangkan:

1. **Heuristic jabatan/level di FE** (`jabatan.level.nama` ≠ daftar staff) — nol kerja BE,
   tapi rapuh: nama level free-text (`Staf`/`Staff SDM`/`Staf Ahli`…), dan tidak mencerminkan
   chain approval sebenarnya (supervisor tanpa anak buah tetap tampil).
2. **Data-driven dari list approval** (menu tampil hanya jika `GET /cuti/pengajuan/approval`
   mengembalikan ≥1 record) — tanpa endpoint baru, tapi data-dependent: supervisor tanpa
   pengajuan di tahun sepi tersembunyi; butuh query tiap render.
3. **Backend approver-flag** — backend (pemilik data chain posisional) menyatakan apakah
   principal adalah approver. Akurat & konsisten dengan arah "backend resolve by principal".

---

## Keputusan

1. **Menu & halaman Persetujuan Cuti = approver-only.** Backend menyediakan flag
   `isCutiApprover` (posisional — principal berada dalam rantai approval cuti / punya anak
   buah). Saat flag `false` (staff/non-approver): item sidebar **disembunyikan** dan akses
   langsung ke `/cuti/persetujuan` → **`forbidden()`** (pola ADR-0001/CU-1: unmount, bukan
   hide/disable).
2. **Flag numpang `GET /account/me`.** Backend menambah field ke respons yang sudah di-fetch
   tiap halaman oleh `getAccountSession()` di root layout → `AppShell`. **Zero fetch
   tambahan, tanpa flash** (menu server-rendered konsisten dgn gate statis lain).
3. **Bridge identitas = backend resolve by principal.** `getPegawaiSession()` tetap memanggil
   `GET /pegawai/{$id}`; backend yang memetakan `$id` → pegawai (via NIPAM/provisioning)
   sehingga user ber-NIPAM seperti `890300426` ter-resolve. FE tidak berubah; satu fix
   memperbaiki Dashboard, Pengajuan, dan Persetujuan sekaligus.
4. **Empty state "Akun ini tidak terhubung ke data pegawai" di page persetujuan
   dipertahankan** sebagai defensive fallback — hanya ter-render jika gate lolos tapi sesi
   pegawai `null` (inkonsistensi BE). Halaman Pengajuan (CU-6) & Dashboard tidak berubah.

---

## Alasan

1. **Chain posisional tidak bisa diekspresikan lewat permission.** `USER` role tidak memegang
   `CUTI:APPROVE`, tapi supervisor ber-role `USER` harus bisa menyetujui. Satu-satunya sumber
   kebenaran "apakah punya anak buah" ada di backend (struktur jabatan / rantai `picSaatIni`).
2. **Numpang `/account/me` = tanpa biaya tambahan.** Endpoint ini sudah dipanggil di root
   layout untuk `roles`/`permissions`; menambah satu field tidak menambah round-trip dan
   menghindari flash menu (masalah dari fetch client-side di `AppShell`).
3. **`forbidden()` konsisten dgn ADR-0001/CU-1.** Menu disembunyikan DAN route di-unmount —
   staf tidak bisa bypass lewat URL. Ini pola yang sama dengan Kuota Cuti (`CUTI:WRITE`).
4. **Bridge di-backend karena FE tidak punya data.** Saat `GET /pegawai/{$id}` 404, FE tidak
   tahu NIPAM (chicken-egg: NIPAM ada di record yang gagal di-fetch). Backend punya mapping
   provisioning dan endpoint fallback `GET /pegawai/{nipam}/nipam` sudah tersedia.

---

## Konsekuensi

- **Dependensi backend baru (2 item):** (a) resolve `$id` → pegawai di `GET /pegawai/{id}` /
  endpoint self; (b) field `isCutiApprover` di `GET /account/me`. Detail kontrak:
  `docs/BE-REQUIREMENT-persetujuan-cuti-approver-dan-bridge.md`.
- **Perubahan FE:** `app-shell.tsx` menerima prop gate dinamis; `(app)/layout.tsx`
  meneruskan `isCutiApprover` dari `getAccountSession()`; `cuti/persetujuan/page.tsx`
  menambah guard `forbidden()`; tipe `src/types/account/me.ts` di-sync via `bun run spec:sync`.
- **Perilaku berubah:** staf tidak lagi melihat menu Persetujuan; URL langsung → halaman
  forbidden. Approver ber-NIPAM yang sebelumnya kena "tidak terhubung" (kasus `890300426`)
  kini bisa membuka halaman setelah fix BE.
- **Tidak terpengaruh:** Pengajuan Cuti (semua pegawai, CU-6), Dashboard, Kuota Cuti
  (`CUTI:WRITE`), dan empty state "tidak terhubung" di Dashboard/Pengajuan (tetap relevan
  untuk akun non-pegawai).
- **Reversal tercatat:** CU-10 direvisi; dokumentasi keputusan lengkap di
  `docs/context/cuti.md` CU-18 & glossary (Approver / Non-Approver).
