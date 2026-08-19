// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider as RolesProvider } from "@/hooks/useAuth";
import { PERMISSION } from "@/lib/auth/permissions";
import SkPage from "./page";

// ── Mock next/navigation ──

vi.mock("next/navigation", () => ({
	useParams: vi.fn(),
	useRouter: vi.fn(),
	useSearchParams: vi.fn(),
}));

// ── Mock sonner toast ──

vi.mock("sonner", () => ({
	toast: { success: vi.fn(), error: vi.fn() },
}));

// ── Data ──

const MOCK_ROWS = [
	{
		id: 1,
		nomorSk: "820/2821/2020",
		jenisSk: "SK_CAPEG",
		tanggalSk: "2020-01-15",
		tmtBerlaku: "2020-02-01",
		golongan: { id: 1, golongan: "II/a", pangkat: "Pengatur Muda" },
		gajiPokok: 2_500_000,
		mkgTahun: 2,
		mkgBulan: 6,
		kenaikanBerikutnya: "2022-02-01",
		mkgbTahun: 0,
		mkgbBulan: 0,
		notes: "CPNS",
	},
	{
		id: 2,
		nomorSk: "821/2822/2022",
		jenisSk: "SK_PEGAWAI_TETAP",
		tanggalSk: "2022-03-10",
		tmtBerlaku: "2022-04-01",
		golongan: { id: 2, golongan: "II/b", pangkat: "Pengatur Muda Tk.I" },
		gajiPokok: 3_200_000,
		mkgTahun: 4,
		mkgBulan: 2,
		kenaikanBerikutnya: "2024-04-01",
		mkgbTahun: 2,
		mkgbBulan: 0,
		notes: "Pengangkatan",
	},
];

const MOCK_PAGE = {
	totalElements: 2,
	totalPages: 1,
	size: 10,
	number: 0,
	numberOfElements: 2,
	first: true,
	last: true,
	empty: false,
	content: MOCK_ROWS,
};

/** Helper: buat Response sukses dengan envelope { data: ... }. */
function okJson(data: unknown) {
	return new Response(JSON.stringify({ data }), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}

// Mock fetch yang handle multiple URL:
// - SK list → MOCK_PAGE
// - master/*/list (golongan dll) → empty array
// - lainnya → default (error test pakai mockRejectedValue override)
function mockDefaultFetch() {
	vi.mocked(globalThis.fetch).mockImplementation(async (input: string | URL | Request) => {
		const s = typeof input === "string" ? input : input instanceof Request ? input.url : input.toString();
		if (s.includes("/kepegawaian/riwayat/sk/pegawai/")) {
			return okJson(MOCK_PAGE);
		}
		if (s.includes("/master/") && s.endsWith("/list")) {
			return okJson([]);
		}
		// Default: return empty — biar query lain (session dll) gak crash
		return okJson({});
	});
}

function renderPage() {
	const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	return render(
		<RolesProvider
			roles={["admin"]}
			permissions={[PERMISSION.PEGAWAI_READ, PERMISSION.PEGAWAI_WRITE, PERMISSION.PEGAWAI_DELETE]}
		>
			<QueryClientProvider client={qc}>
				<SkPage />
			</QueryClientProvider>
		</RolesProvider>,
	);
}

// ── Tests ──

describe("Riwayat SK page", () => {
	beforeEach(() => {
		cleanup();
		vi.clearAllMocks();

		// Spy on fetch dulu — vi.mocked cuma type cast, mock methods butuh spy
		vi.spyOn(globalThis, "fetch");

		// Mock next/navigation
		vi.mocked(useParams).mockReturnValue({ pegawaiId: "123" });
		vi.mocked(useRouter).mockReturnValue({ replace: vi.fn(), push: vi.fn() } as unknown as ReturnType<
			typeof useRouter
		>);
		vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams("") as ReturnType<typeof useSearchParams>);
	});

	it("menampilkan skeleton saat loading", () => {
		renderPage();
		expect(screen.getByText("No")).toBeInTheDocument();
		expect(screen.getByText("Nomor SK")).toBeInTheDocument();
		expect(screen.getByText("Jenis SK")).toBeInTheDocument();
	});

	it("menampilkan tabel dengan data setelah fetch berhasil", async () => {
		mockDefaultFetch();
		renderPage();

		expect(await screen.findByText("820/2821/2020")).toBeInTheDocument();
		expect(screen.getByText("821/2822/2022")).toBeInTheDocument();

		// label jenis SK
		expect(screen.getByText("Calon Pegawai")).toBeInTheDocument();
		expect(screen.getByText("Pegawai Tetap")).toBeInTheDocument();

		// format tanggal
		expect(screen.getByText("15 Januari 2020")).toBeInTheDocument();
		expect(screen.getByText("10 Maret 2022")).toBeInTheDocument();

		// format rupiah
		expect(screen.getByText("Rp 2.500.000")).toBeInTheDocument();
		expect(screen.getByText("Rp 3.200.000")).toBeInTheDocument();

		// format MKG
		expect(screen.getByText(/2 Thn – 6 Bln/)).toBeInTheDocument();
		expect(screen.getByText(/4 Thn – 2 Bln/)).toBeInTheDocument();

		// kolom header
		for (const header of ["Tgl. SK", "Tgl. Berlaku", "Golongan", "Gaji Pokok", "MKG", "MKGB", "Notes"]) {
			expect(screen.getByText(header)).toBeInTheDocument();
		}
	});

	it("menampilkan panel error saat fetch gagal", async () => {
		vi.mocked(globalThis.fetch).mockRejectedValue(new Error("Network error"));
		renderPage();

		expect(await screen.findByText("Gagal memuat data")).toBeInTheDocument();
		expect(screen.getByText("Coba lagi")).toBeInTheDocument();
	});

	it("menampilkan tombol filter dan form tambah", () => {
		mockDefaultFetch();
		renderPage();
		expect(screen.getByPlaceholderText(/cari nomor sk/i)).toBeInTheDocument();
		expect(screen.getByText("Tambah SK")).toBeInTheDocument();
	});

	it("klik baris memicu ?sel=id di URL", async () => {
		const replace = vi.fn();
		vi.mocked(useRouter).mockReturnValue({ replace } as unknown as ReturnType<typeof useRouter>);
		mockDefaultFetch();
		renderPage();

		const row = await screen.findByText("820/2821/2020");
		await userEvent.click(row.closest("tr") as HTMLElement);

		expect(replace).toHaveBeenCalledWith(expect.stringContaining("sel=1"));
	});
});
