# Checklist Pekerjaan: Laporan Struktur Organisasi (Org Chart)

Dokumen pelacak klaim order dan progres implementasi halaman Laporan Struktur Organisasi (`/laporan/so`) berbasis issue tracker Beads (`bd`).

**Endpoint Backend:** `GET /laporan/kepegawaian/so`  
**Referensi Desain:** [`FE-RECOMMENDATION-struktur-organisasi-chart.md`](./FE-RECOMMENDATION-struktur-organisasi-chart.md)

---

## Tabel Urutan Klaim (Claim Order)

| No | ID Issue | Judul Pekerjaan | Status | Target Artefak |
|:--:|:---------|:----------------|:------:|:---------------|
| 1 | `kepegawaian-fe-1h2r` | so: install dependencies d3, d3-org-chart, d3-flextree & ambient types | Selesai | `package.json`, `src/types/d3-org-chart.d.ts` |
| 2 | `kepegawaian-fe-vzga` | so: tambahkan query key laporanKeys.so & hook useLaporanSo | Selesai | `src/hooks/keys/laporan-keys.ts`, `src/hooks/laporan/useLaporanSo.ts` |
| 3 | `kepegawaian-fe-dtsl` | so: buat komponen OrgChartView d3-org-chart & skeleton | Selesai | `src/components/laporan/org-chart.tsx`, `src/app/(app)/laporan/so/so-page-skeleton.tsx` |
| 4 | `kepegawaian-fe-8s87` | so: buat page /laporan/so & daftarkan menu di app-shell | Selesai | `src/app/(app)/laporan/so/page.tsx`, `src/app/(app)/laporan/so/so-page-client.tsx`, `src/components/app-shell.tsx` |
| 5 | `kepegawaian-fe-vrke` | so: buat unit test & verifikasi akhir (test, lint, build) | Selesai | `src/hooks/laporan/useLaporanSo.test.ts`, verifikasi build & lint |

---

## Catatan Eksekusi & Status Log

- [x] Inisialisasi daftar issue Beads (`bd create`)
- [x] Task 1: `kepegawaian-fe-1h2r` (Selesai)
- [x] Task 2: `kepegawaian-fe-vzga` (Selesai)
- [x] Task 3: `kepegawaian-fe-dtsl` (Selesai)
- [x] Task 4: `kepegawaian-fe-8s87` (Selesai)
- [x] Task 5: `kepegawaian-fe-vrke` (Selesai)

- [ ] Task 2: `kepegawaian-fe-vzga`
- [ ] Task 3: `kepegawaian-fe-dtsl`
- [ ] Task 4: `kepegawaian-fe-8s87`
- [ ] Task 5: `kepegawaian-fe-vrke`
