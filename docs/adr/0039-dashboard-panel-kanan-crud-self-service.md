# 39. Dashboard Pegawai: CRUD Self-Service Panel Kanan (5 Entitas Profil)

Date: 2026-08-14
Status: Accepted
Extends: [ADR-0012](0012-dashboard-self-edit-biodata.md) (self-edit biodata), [ADR-0038](../FE-CONTRACT-profil-update-rbac.md §5.1) (split profil self vs admin endpoint).

## Konteks

Dashboard Pegawai panel kiri sudah punya "Edit Profil" biodata (ADR-0012). Panel kanan saat ini **read-only** — 10 section (Keluarga, Pendidikan, Pengalaman Kerja, Keahlian, Pelatihan, Mutasi, SK, Kontrak, Penggajian, SP) hanya menampilkan data tanpa aksi.

BE (ADR-0038) sudah menyediakan **endpoint self-service** untuk 6 entitas profil:
`POST/PUT/DELETE /profil/{entity}/...` — yang **selalu** memasukkan perubahan ke antrian approval (`changedStatus=true`), termasuk untuk user ADMIN/HRD. Ownership diverifikasi server-side: user hanya bisa mengubah data miliknya sendiri (endpoint self → 404 bila target bukan milik principal).

User meminta CRUD dibuka di panel kanan dashboard untuk 5 entitas yang bisa di-self-edit.

## Keputusan

**Buka CRUD self-service di panel kanan untuk 5 entitas profil: Keluarga, Pendidikan, Pengalaman Kerja, Keahlian, Pelatihan.**

**11 keputusan terkunci (hasil grilling 2026-08-14):**

1. **Indikator approval per-section.** Badge "Menunggu" di header AccordionTrigger tiap section bila ada pending change — **tombol CRUD tetap bisa dibuka** (multiple pending entry per section diperbolehkan, karena tiap row adalah entitas terpisah). Konsisten dengan pola badge biodata (ADR-0012 Addendum 2).

2. **Scope 5 entitas.** Hanya entitas yang punya endpoint self-service: `keluarga`, `pendidikan`, `pengalaman-kerja`, `keahlian`, `pelatihan`. Riwayat Mutasi, SK, Kontrak, Penggajian, SP tetap **read-only** — dikontrol HR/sistem, bukan self-edit.

3. **Form pattern = Dialog + CrudForm.** Konsisten dengan biodata. Satu Dialog per section, di-mount sekali di atas DataTable — pass `editingRow` state. Tidak ada N Dialog per N row (sesuai anti-pattern coding-rules).

4. **Delete = ConfirmDeleteDialog.** Ketik `HAPUS` untuk enable — konsisten dengan halaman master/data-pegawai.

5. **Kode config dipisah per entity.** Buat `src/config/profil/{entity}.config.ts` per entitas berisi: Zod schema, `FormField[]`, kolom tabel (extend dari SECTIONS), dan mutation URL. Right-panel mengimport config tersebut.

6. **Self-endpoint only, tanpa bypass admin.** Dashboard = profil diri sendiri → selalu via `/profil/{entity}/...`. Semua perubahan masuk approval queue. ADMIN/HRD yang perlu edit data pegawai lain → gunakan halaman data-pegawai (terpisah). Tidak ada deteksi role/bypass di halaman ini.

7. **Extend `SectionConf` dengan `crudConfig?` opsional.** `crudConfig: null | { ... }` — bila null = section read-only. Lima section editable isi `crudConfig`, 5 section riwayat biarkan null.

8. **`changedStatus` per-row = guard Edit/Hapus.** Bila field `changedStatus` truthy di response row, tombol Edit dan Hapus untuk row tersebut di-unmount (bukan disable). User tetap bisa Tambah entry baru. Visual cue: icon clock atau badge kecil "Pending" di baris tersebut.

9. **Placement action tombol.** Tambah di header section (atas DataTable), Edit/Hapus di kolom aksi paling kanan per-row. Tidak ada toolbar terpisah.

10. **Biodata (`PATCH /profil`) tetap via endpoint yang sudah ada** — tidak berubah dari ADR-0012.

11. **Tidak ada bypass `X-Acting-As` / flag admin di body.** Sesuai kontrak ADR-0038: jalur konteks (endpoint) yang menentukan behavior, bukan header tambahan.

## Alternatif yang Ditolak

- *Semua 10 section CRUD.* Ditolak — Mutasi/SK/Kontrak/Penggajian/SP tidak punya endpoint self-edit dan memang dikontrol HR/sistem.
- *Dialog global tunggal untuk semua section.* Ditolak — perlu tracking `activeSection` state ekstra; satu Dialog per section lebih clean dan bounded.
- *Admin bypass di dashboard.* Ditolak — dashboard = konteks self; admin yang edit data pegawai lain punya halaman dedicated.
- *Tampilkan CRUD tapi blokir semua aksi saat ada pending di section.* Ditolak — granularitas per-row lebih tepat karena pending hanya untuk row tertentu, bukan seluruh section.
- *Sembunyikan Edit/Hapus tanpa visual cue pending.* Ditolak — user perlu tahu kenapa tombol tidak ada (changedStatus icon/badge per-row).

## Konsekuensi

**Positif.**
- Pegawai bisa mengelola data profil sendiri (tambah keluarga, riwayat pendidikan, dll.) langsung dari dashboard.
- Semua perubahan masuk approval queue — data stabil, tidak langsung overwrite tanpa review HRD.
- Pola config per-entity konsisten dengan arsitektur `master/` (config-driven CRUD).
- Ownership dijamin server-side — FE tidak perlu validasi lintas-pegawai.

**Negatif / trade-off yang diterima.**
- `SectionConf` di `section-right-panel.tsx` perlu extend — potensi blast radius ke semua consumer `SectionConf`. Mitigasi: `crudConfig` **opsional** (additive-only), section tanpa `crudConfig` tidak berubah perilakunya.
- Lima file config baru (`keluarga.config.ts`, `pendidikan.config.ts`, dst.) — penambahan nominal, bukan duplikasi.
- `section-right-panel.tsx` (~410 baris) harus di-refactor setelah CRUD masuk — kemungkinan perlu dipecah. Dicatat di CLAIM-ORDER.
- BE endpoint self verifikasi ownership (`kepegawaian-3blf`) sudah LIVE — FE cukup kirim ke jalur self, tidak perlu validasi tambahan di FE.

**Tinjau ulang jika:**
- Muncul kebutuhan admin edit profil orang lain dari halaman dashboard (bukan data-pegawai) → butuh conditional endpoint routing berbasis role.
- BE memisahkan approval queue self vs self-read (`kepegawaian-t3s3`, masih OPEN) → FE perlu fetch pending status per entitas secara terpisah.

## File Terkait

- `src/app/(app)/kepegawaian/dashboard/section-right-panel.tsx` — extend `SectionConf`, tambah `crudConfig`, mount Dialog per section.
- `src/config/profil/keluarga.config.ts` — Zod schema + FormField[] + mutation helpers (baru).
- `src/config/profil/pendidikan.config.ts` — idem (baru).
- `src/config/profil/pengalaman-kerja.config.ts` — idem (baru).
- `src/config/profil/keahlian.config.ts` — idem (baru).
- `src/config/profil/pelatihan.config.ts` — idem (baru).
- `docs/context/kepegawaian-dashboard.md` — update §Panel KANAN: tambah catatan CRUD per section.
- `docs/CLAIM-ORDER-dashboard-crud-panel-kanan.md` — claim order implementasi.
