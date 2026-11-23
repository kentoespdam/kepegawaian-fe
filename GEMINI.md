# Project Rules for AI Agents: Kepegawaian FE (Antigravity 2.0 Optimized)

## Konteks Project

Project **Kepegawaian FE** (`kepegawaian-fe`) adalah aplikasi manajemen kepegawaian berbasis **Next.js 16 / React 19 / TypeScript**, melayani Perumdam Tirta Satria (PDAM Kabupaten Banyumas).
Referensi utama: [`DESIGN.md`](./DESIGN.md) (index), [`docs/design/coding-rules.md`](./docs/design/coding-rules.md), [`docs/design/architecture.md`](./docs/design/architecture.md), dan sub-context domain di [`docs/design/`](./docs/design/).

Tech stack inti: Next.js 16 (App Router), React 19, TypeScript strict, TanStack Query v5, React Hook Form + Zod v4, shadcn/ui (Base UI), Tailwind CSS v4 (CSS-first `@theme`), Biome 2, Vitest + Testing Library.

---

## 1. Adaptive Routing & Agent Roles (Direct-First)

Terapkan urutan prioritas ketat ini sebelum mengeksekusi task apapun:

### Priority 1: Mandatory Deep-Reasoning (`deep_reasoner` Sub-Agent)
Invoke `invoke_subagent` dengan `deep_reasoner` (tier: `pro`) SEBELUM menulis kode jika salah satu kondisi objektif berikut terpenuhi:
- **Auth & Session:** Implementasi atau perubahan logika `proxy.ts`, `verifySession()`, cookie Appwrite, atau rute proteksi 401/403/409.
- **Interface Break:** Refactor yang mengubah signature publik custom hook (`src/hooks/`), tipe shared (`src/types/`), atau kontrak API (`src/lib/api/`).
- **Blast Radius Tinggi:** `gitnexus_impact` mengembalikan risk level HIGH atau CRITICAL.
- **Stuck Bug:** Bug yang tidak terjelaskan setelah tepat 2 attempt debugging di level Root Agent.

*Exceptions (Do NOT invoke `deep_reasoner`):*
- Implementasi sudah ada Implementation Contract yang dikonfirmasi dari respons `deep_reasoner` sebelumnya.
- Menulis unit/integration test rutin atau memperbaiki bug terlokalisasi dengan root cause yang sudah diidentifikasi.
- Task yang tidak menyentuh `src/hooks/`, `src/lib/api/`, atau `src/types/` sama sekali.

**Quota Fallback:** Jika `deep_reasoner` (model: `pro`) mengembalikan error quota/rate-limit, WAJIB segera re-invoke dengan `deep_reasoner_fallback` (model: `flash`). Gunakan prompt dan context yang identik. Jika fallback mengembalikan `Confidence Level: LOW`, tunda implementasi dan laporkan ke user.

### Priority 2: Direct Execution (Root Agent — No Sub-Agent)
Root Agent HARUS mengeksekusi langsung tanpa spawn sub-agent ketika:
- Menjalankan operasi issue tracker (`bd`), perintah `git`, atau query `gitnexus` tunggal.
- Membuat perubahan kode terlokalisasi (≤ 2 file, < 50 LOC) pada file **selain** `src/hooks/`, `src/lib/api/`, atau `src/types/`, mengikuti pola yang sudah ada.
- Menjalankan perintah verifikasi akhir (`bun run test`, `bunx biome check`).
- Menjawab pertanyaan, menulis dokumentasi, atau analisis tanpa perubahan kode.

### Priority 3: Substantial Technical Delegation (`flash_lite` Sub-Agent)
Invoke `invoke_subagent` dengan `flash_lite` (tier: `flash`) ketika:
- Implementasi mencakup ≥ 2 file dengan perubahan substansial (halaman baru, modul baru).
- Membuat test suite dengan ≥ 3 test case.
- Eksplorasi codebase luas yang memerlukan pembacaan > 5 file.
- Task yang diestimasi memakan > 15 menit waktu eksekusi.

---

## 2. Sub-Agent Execution, Error Handling & Reporting Protocol

### Bounded Self-Fix (Anti Ping-Pong)
- Sub-agent DIIZINKAN melakukan perbaikan mandiri (*self-fix*) maksimal **2 kali percobaan lokal** khusus untuk error deterministik (syntax error, import hilang, type error Biome, atau kegagalan test dengan penyebab jelas).
- Jika masih gagal setelah 2 percobaan lokal, atau jika menemukan ambiguitas desain/pelanggaran constraint keamanan, sub-agent WAJIB berhenti dan melapor ke Root Agent.
- Jika error berlanjut setelah 3 percobaan remediasi di level Root Agent, lakukan riset referensi terbaru (dokumentasi Next.js, TanStack Query, atau paket terkait).

### Proportional Reporting Protocol (STRICT)

**A. Untuk Tugas Eksplorasi / Riset (Tanpa Modifikasi File):**
Laporkan temuan secara padat dalam maksimal 5 baris berisi poin inti dan referensi `file:baris`. Akhiri dengan: `"Report complete. Awaiting next instructions."`

**B. Untuk Tugas Modifikasi Kode / Eksekusi Teknis:**
Sub-agent wajib melaporkan dalam format berlapis berikut:

```text
STATUS: [DONE|PARTIAL|BLOCKED|ERROR]
HASIL: <1–3 kalimat inti — apa yang berubah, ditemukan, atau gagal, dan mengapa penting>

ARTEFAK TERMODIFIKASI:
- <file>:<baris-dari>–<baris-ke> — <deskripsi singkat perubahan>
  CONSTRAINT CHECK: <PASS/FAIL + alasan singkat terhadap: auth guard, log sanitation, type safety, test coverage>

VERIFIKASI:
- Tests: <X passed, Y failed — sebutkan nama test spesifik yang relevan; nyatakan eksplisit jika 0 test>
- Lint: <PASS / FAIL: <baris pesan error spesifik dari biome>>
- Regression: <Ya/Tidak + detail singkat>

Report complete. Awaiting next instructions.
```

**Aturan Ketat Laporan Modifikasi:**
- **Wajib sebutkan `file:baris`** untuk setiap perubahan dan **wajib jalankan Constraint Check**.
- Buang *stack trace* penuh atau listing kode panjang — ringkas hanya ke baris error spesifik (< 10 baris raw output).
- DILARANG menyertakan saran, opini, langkah selanjutnya, atau mengeksekusi pekerjaan di luar scope.
- DILARANG melaporkan `STATUS: DONE` jika ada test `FAIL`, lint `FAIL`, atau constraint check `FAIL`.
- Root Agent WAJIB memeriksa bagian `ARTEFAK TERMODIFIKASI` dan `VERIFIKASI` sebelum mengambil keputusan berikutnya.

---

## 3. Token Economy & Pre-Coding Gates

- **No Preamble & Concise Output:** Hilangkan kalimat basa-basi ("Baik", "Tentu saja", "Saya akan..."). Mulai langsung dari substansi.
- **Selective Reading & Micro-Diffs:** Baca hanya rentang baris yang relevan (hindari membaca seluruh file >150 baris jika posisi simbol sudah diketahui). Edit hanya baris yang berubah.
- **Quiet Commands:** Selalu gunakan flag minim output pada terminal (`-q`, `head`, `grep`).
- **GitNexus Targeted Gate:**
  - WAJIB gunakan `gitnexus_query` atau `gitnexus_impact` sebelum mengeksplorasi atau memodifikasi file di `src/hooks/`, `src/lib/api/`, dan `src/types/`.
  - Untuk CLI `npx gitnexus`, selalu sertakan `--repo kepegawaian-fe` (contoh: `npx gitnexus query "useAuth" --repo kepegawaian-fe`), kecuali untuk perintah `npx gitnexus analyze`.
- **Conditional Skill Gate:**
  - **Ponytail:** WAJIB load skill `/ponytail` sebelum memodifikasi kode produksi (lewati jika hanya melakukan query `bd`, `git`, atau diskusi desain).
  - **Grilling Rules:** WAJIB ikuti skill `grilling` saat melakukan Q&A interaktif dan penajaman arsitektur (Prioritas 1).
  - **DESIGN.md:** Baca modul design yang relevan dari [`DESIGN.md`](./DESIGN.md) sebelum menyentuh UI (gunakan tabel peta modul § untuk navigasi selektif).
- **Issue Tracking (Beads/`bd`):** Klaim task (`bd update <id> --claim`), tutup task (`bd close <id>`).
- **Sandbox Policy:** WAJIB gunakan `BypassSandbox: true` untuk semua eksekusi perintah `git` dan `bd`.

---

## 4. File Size, Toolchain & Domain Rules (`kepegawaian-fe`)

### Modularitas & Ukuran File
- Target: **100–200 LOC** per file.
- Hard Ceiling: **Maksimal 300 LOC**. WAJIB pecah/modularisasi jika mendekati batas.
- Struktur modul: `src/hooks/` → pisahkan per domain (mis. `kepegawaian/`, `master/`, `cuti/`); `src/app/(app)/` → route per domain.

### Toolchain (Bun)
Seluruh eksekusi menggunakan Bun:
```bash
bun run dev          # Dev server Next.js
bun run build        # Build produksi
bun run test         # Jalankan semua unit test (Vitest)
bun run test --filter <name>  # Test spesifik
bun run lint         # Cek Biome (read-only)
bun run format       # Format + fix Biome
bunx biome check     # Cek format tanpa ubah file
```

### Keamanan & Domain Constraints (Harga Mati)
1. **Auth Guard:** Setiap route di `(app)/` WAJIB dilindungi oleh `verifySession()` di server component. JANGAN bypass atau lemahkan pengecekan sesi.
2. **Log Sanitation:** DILARANG KERAS mencatat data sensitif ke log (password, token JWT, cookie, atau data pribadi pegawai).
3. **Type Safety:** Seluruh kode WAJIB menggunakan TypeScript strict. DILARANG menggunakan `any` tanpa alasan terdokumentasi dan komentar `// biome-ignore`.
4. **Zod + RHF Cast:** Zod v4 resolver WAJIB di-cast: `resolver: zodResolver(schema as never)` — lihat [`docs/design/forms.md`](./docs/design/forms.md) §10.
5. **Integritas Nominal Pembayaran:** Nilai gaji/tunjangan SELALU diambil dari respons server. Klien TIDAK BOLEH menentukan atau mengubah nilai finansial.
6. **N+1 / Waterfall Prevention:** Gunakan TanStack Query dengan `enabled` guard dan `useQueries` untuk fetch paralel. Hindari chained fetches di `useEffect`.
7. **Immutability:** DILARANG mutasi state langsung (`array.push()`). Gunakan struktur immutable (`[...array, item]`).
8. **React 19 Compiler:** DILARANG menggunakan `useMemo`, `useCallback`, atau `React.memo` secara defensif — compiler mengoptimasi otomatis.

### React 19 & Next.js 16 Constraints
- **No `forwardRef`:** Gunakan `ref` sebagai prop langsung.
- **No `Context.Provider`:** Gunakan `<Context value={v}>` langsung.
- **Async params:** `params`, `searchParams`, `cookies()`, `headers()` WAJIB di-`await`.
- **Proxy runtime:** Gunakan `proxy.ts` (Node runtime), bukan `middleware.ts`.
- **No inline styles:** Seluruh styling via Tailwind utility classes. DILARANG `style={{ ... }}`.
- **shadcn/ui:** Komponen di `src/components/ui/*` adalah pure UI primitives — DILARANG menempatkan API calls atau business logic di dalamnya.

---

## 5. Prosedur Penyelesaian Pekerjaan (Completion Workflow)

Sebelum menyatakan task selesai secara keseluruhan:
1. Jalankan `gitnexus_detect_changes()` untuk memverifikasi cakupan perubahan.
2. Jalankan `bun run test` — pastikan seluruh test yang relevan lulus (hijau).
3. Jalankan `bunx biome check` — pastikan bebas error format/lint.
4. Jalankan `bun run build` — pastikan build produksi sukses (zero TypeScript error).
5. Push perubahan ke remote (WAJIB dengan `BypassSandbox: true`):
   ```bash
   git pull --rebase
   git push
   git status  # HARUS menunjukkan "up to date with origin"
   ```
6. Perbarui atau tutup status issue di `bd` (`bd close <id>`).
