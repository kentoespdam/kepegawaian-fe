# Claim Order — Persetujuan Cuti: Detail Modal (CU-19)

> Papan pantau untuk agen implementer. Sumber kebenaran status = **beads (`bd`)**, bukan file ini.
> Alur: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.

**Issue:** `kepegawaian-fe-g9c6` — cuti: Detail Modal Persetujuan Cuti (CU-19)

**Tujuan.** Mengubah halaman Persetujuan Cuti dari tombol inline Setujui/Tolak di kolom Aksi
menjadi **modal detail** dengan 2 tab (Detail + Riwayat Approval) dan tombol aksi di footer.
Semua aksi approve/reject hanya melalui modal.

**Keputusan terkunci:** `docs/context/cuti.md` CU-19 (grilling 2026-08-19).
Jangan re-litigasi.

**Prasyarat baca sebelum ngcoding:**
1. `docs/context/cuti.md` CU-19 — keputusan lengkap
2. `CONTEXT-MAP.md` — inti bersama (RBAC, pola fetch, state handling)
3. `docs/design/coding-rules.md` — aturan mengikat (wajib)
4. `src/app/(app)/cuti/persetujuan/persetujuan-page-client.tsx` — kode saat ini
5. `src/app/(app)/cuti/persetujuan/approval-confirm-dialog.tsx` — dialog saat ini
6. `src/types/cuti/approval.ts` — tipe `CutiApprovalMiniResponse` (riwayat)

---

## Keputusan CU-19 (Ringkasan Eksekusi)

| # | Keputusan | Implikasi Kode |
|---|-----------|---------------|
| D1 | Trigger = ikon Detail di kolom Aksi | Ganti tombol Setujui/Tolak → ikon `Eye` / `ChevronRight` |
| D2 | Tombol inline dihapus | Hapus kolom push `aksi` yang render Setujui/Tolak |
| D3 | Modal = Dialog (bukan Sheet) | Pakai `<Dialog>` Base UI |
| D4 | 2 tab: Detail + Riwayat | Tab component di dalam Dialog |
| D5 | Footer = Setujui + Tolak | `<AlertDialogFooter>` pattern |
| D6 | Riwayat = `GET /cuti/approval/{cutiId}?size=100` | Lazy fetch `useQuery` saat modal buka |
| D7 | Notes wajib keduanya | Sama dengan CU-12 |
| D8 | Inline expansion untuk konfirmasi | Klik aksi → textarea + tombol konfirmasi muncul di dialog |

---

## File yang Diubah

```
src/app/(app)/cuti/persetujuan/persetujuan-page-client.tsx   [MODIF] — hapus kolom aksi inline, tambah state detailRow, mounting dialog baru
src/app/(app)/cuti/persetujuan/detail-approval-dialog.tsx    [BARU] — dialog detail 2-tab + footer aksi + inline expansion
```

**Tidak diubah:**
- `page.tsx` — server thin tetap sama
- `approval-confirm-dialog.tsx` — bisa dihapus atau dipertahankan (tergantung refactor)
- Tipe generated — tidak diedit manual

---

## Claim Steps (Urutan Pengerjaan)

### Step 1 — Buat `detail-approval-dialog.tsx`

**Deskripsi:** Buat komponen dialog baru dengan prop:
```typescript
interface DetailApprovalDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  row: CutiApprovalChainResponse | null;  // baris yang diklik
  pegawaiId: number | null;
  onActionComplete: () => void;  // callback setelah approve/reject sukses
}
```

**Internal state:**
- `activeTab: "detail" | "riwayat"` (default: "detail")
- `approvalAction: { type: "APPROVE" | "REJECT" } | null` — null = belum klik aksi
- `notes: string`

**Tab "Detail":**
- Section "Informasi Pegawai": nama, NIPAM, jabatan, organisasi (dari `row.refCuti`)
- Section "Detail Cuti": jenis cuti (+ sub-jenis), periode, jumlah hari/kerja, alasan, status badge

**Tab "Riwayat":**
- Fetch: `GET /api/proxy/cuti/approval/{cutiId}?size=100`
- Query key: `["cuti-approval-history", cutiId]`
- Render: list/stepper — nama approver, jabatan, status (badge), catatan, timestamp
- Loading: skeleton; Kosong: empty state "Belum ada riwayat approval"

**Footer:**
- Jika `readWriteStatus !== "WRITE"` ATAU status bukan PENDING → tombol "Tutup" saja
- Jika `readWriteStatus === "WRITE"` DAN status PENDING → tombol "Setujui" + "Tolak"
- Klik Setujui/Tolak → `approvalAction` ter-set → area notes + tombol konfirmasi muncul inline
- Inline expansion: `<Label>Catatan *</Label>` + `<Textarea>` + tombol "Konfirmasi" + "Batal"

**Mutasi:**
- `POST /api/proxy/cuti/approval` (sama dengan yang sudah ada di `persetujuan-page-client.tsx`)
- csrfToken: `GET /api/proxy/auth/csrf-token`
- Body: `{ csrfToken, cutiId, approverId: pegawaiId, approvalLevel, approvalStatus, notes }`
- Success: toast → `onActionComplete()` → tutup dialog
- Error: inline di dialog

### Step 2 — Modifikasi `persetujuan-page-client.tsx`

**Hapus:**
- State `approval` + `approvalError` (ganti dengan `detailRow`)
- Kolom push `aksi` yang render tombol Setujui/Tolak
- `<ApprovalConfirmDialog>` mounting (ganti dengan `<DetailApprovalDialog>`)

**Tambah:**
- State `detailRow: CutiApprovalChainResponse | null`
- Kolom `aksi` baru: hanya ikon `Eye` / `ChevronRight` yang memanggil `setDetailRow(row)`
  - Hanya render jika `readWriteStatus === "WRITE"` ATAU semua baris (icon detail selalu tampil?)
  - **Decision:** icon detail selalu tampil (semua user bisa melihat detail, aksi diatur di dialog)
- Mounting `<DetailApprovalDialog>` — satu dialog per halaman

**Kolom `aksi` final:**
```tsx
{
  id: "aksi",
  header: "Aksi",
  align: "right",
  cell: (row) => (
    <Button
      size="sm"
      variant="ghost"
      className="h-8 gap-1"
      onClick={() => setDetailRow(row)}
    >
      <Eye className="size-3.5" />
      Detail
    </Button>
  ),
}
```

### Step 3 — Cleanup & Quality Gate

- Hapus `approval-confirm-dialog.tsx` jika tidak dipakai elsewhere
- `bun run build` — zero error
- `bunx biome check` — zero lint
- `bun run test` — existing tests pass + tambah test baru untuk dialog

### Step 4 — Test Baru

- `detail-approval-dialog.test.tsx`:
  - Tab switching (Detail ↔ Riwayat)
  - Fetch riwayat approval saat modal buka
  - Read-only mode: tombol aksi tidak tampil
  - Inline expansion: notes required, submit body benar
  - Status final: tombol aksi tidak tampil

### Step 5 — Update docs & Close

- Tandai step selesai di claim order ini
- `bd close kepegawaian-fe-g9c6`

---

## Quality Gates

- [ ] `bun run test` — all green
- [ ] `bun run build` — zero error
- [ ] `bunx biome check` — zero lint

---

## Invarian (jangan dilanggar)

- Unauthorized = unmount (`forbidden()`), bukan CSS-hide atau `disabled`
- Toast hanya untuk hasil mutasi — gagal fetch pakai panel inline
- Tipe generated tidak diedit manual
- `src/components/ui/*` tidak disentuh
- Fetch via `fetch("/api/proxy/cuti/…")` langsung
- Warna via design token — bukan hex/oklch() inline
- Satu Dialog per halaman, bukan N dialog untuk N baris
- `gcTime: Infinity` / `staleTime: Infinity` dilarang
