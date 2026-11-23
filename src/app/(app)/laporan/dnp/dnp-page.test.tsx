/** @vitest-environment jsdom */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { useLaporanDnp } from "@/hooks/laporan/useLaporanDnp";
import type { DnpResponse } from "@/types/laporan/kepegawaian";
import { DnpPageClient, formatDnpDate, groupDnpByOrganisasi } from "./dnp-page-client";

vi.mock("@/hooks/laporan/useLaporanDnp", () => ({
	useLaporanDnp: vi.fn(),
}));

vi.mock("@/hooks/laporan/useAsyncReportExport", () => ({
	useAsyncReportExport: () => ({
		exportReport: vi.fn(),
		isExporting: false,
	}),
}));

function createWrapper() {
	const qc = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});
	return function Wrapper({ children }: { children: ReactNode }) {
		return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
	};
}

describe("formatDnpDate", () => {
	it("memformat ISO date string YYYY-MM-DD menjadi DD.MM.YYYY", () => {
		expect(formatDnpDate("2026-03-17")).toBe("17.03.2026");
		expect(formatDnpDate("1997-11-01T00:00:00")).toBe("01.11.1997");
	});

	it("mengembalikan string apa adanya jika sudah bertitik atau format lain", () => {
		expect(formatDnpDate("01.04.2019")).toBe("01.04.2019");
	});

	it("mengembalikan '-' untuk falsy, null, undefined, atau invalid date", () => {
		expect(formatDnpDate(null)).toBe("-");
		expect(formatDnpDate(undefined)).toBe("-");
		expect(formatDnpDate("")).toBe("-");
		expect(formatDnpDate("-")).toBe("-");
		expect(formatDnpDate("0000-00-00")).toBe("-");
	});
});

describe("groupDnpByOrganisasi", () => {
	it("mengelompokkan data berdasarkan orgGroup dan menghitung groupIndex", () => {
		const raw: DnpResponse[] = [
			{ nama: "Dir 1", orgGroup: "DIREKSI", nipam: "101" },
			{ nama: "Dir 2", orgGroup: "DIREKSI", nipam: "102" },
			{ nama: "SPI 1", orgGroup: "SATUAN PENGAWAS INTERN", nipam: "201" },
		];

		const groups = groupDnpByOrganisasi(raw);
		expect(groups).toHaveLength(2);
		expect(groups[0].organisasi).toBe("DIREKSI");
		expect(groups[0].items).toHaveLength(2);
		expect(groups[0].items[0].groupIndex).toBe(1);
		expect(groups[0].items[1].groupIndex).toBe(2);

		expect(groups[1].organisasi).toBe("SATUAN PENGAWAS INTERN");
		expect(groups[1].items).toHaveLength(1);
		expect(groups[1].items[0].groupIndex).toBe(1);
	});

	it("fallback ke kodeOrganisasi jika orgGroup kosong", () => {
		const raw: DnpResponse[] = [{ nama: "Pegawai A", kodeOrganisasi: "ORG-01", nipam: "301" }];

		const groups = groupDnpByOrganisasi(raw);
		expect(groups[0].organisasi).toBe("ORG-01");
	});
});

describe("DnpPageClient", () => {
	it("merender tabel DNP dengan grouping organisasi dan urutan nomor berlanjut", async () => {
		const mockData: DnpResponse[] = [
			{
				nama: "YOHANES NOVAGA, S.E.",
				nipam: "771100531",
				namaJabatan: "Direktur Utama",
				orgGroup: "DIREKSI",
				tmtJabatan: "2026-03-17",
				pangkat: "-",
				golongan: "-",
				tmtGolongan: "-",
				mkgTahun: undefined,
				mkgBulan: undefined,
				tmtKerja: "2026-03-17",
				mkTahun: 0,
				mkBulan: 8,
				pendidikan: "S1 Ekonomi Pembangunan 2000",
				ttl: "Purwokerto 05.11.1977",
			},
			{
				nama: "WIPI SUPRIYANTO, S.T., M.I.Kom.",
				nipam: "660600242",
				namaJabatan: "Direktur Teknik",
				orgGroup: "DIREKSI",
				tmtJabatan: "2025-11-10",
				pangkat: "-",
				golongan: "-",
				tmtGolongan: "-",
				tmtKerja: "1997-11-01",
				mkTahun: 29,
				mkBulan: 0,
				pendidikan: "S2 Ilmu Komunikasi 2020",
				ttl: "Purwokerto 11.06.1966",
			},
			{
				nama: "WACHJONO, S.E., Ak., CA.",
				nipam: "710100239",
				namaJabatan: "Manajer Satuan Pengawas Intern",
				orgGroup: "SATUAN PENGAWAS INTERN",
				tmtJabatan: "2025-05-07",
				pangkat: "Staf Madya Tk. I",
				golongan: "C.4",
				tmtGolongan: "2019-04-01",
				mkgTahun: 7,
				mkgBulan: 7,
				tmtKerja: "1997-11-01",
				mkTahun: 29,
				mkBulan: 0,
				pendidikan: "S1 Akuntansi 1996",
				ttl: "Cilacap 10.01.1971",
			},
		];

		vi.mocked(useLaporanDnp).mockReturnValue({
			data: mockData,
			isLoading: false,
			isError: false,
			error: null,
			refetch: vi.fn(),
		} as unknown as ReturnType<typeof useLaporanDnp>);

		render(<DnpPageClient />, { wrapper: createWrapper() });

		await waitFor(() => {
			expect(screen.getByText("DAFTAR NOMINATIF PEGAWAI")).toBeInTheDocument();
			expect(screen.getByText("DIREKSI")).toBeInTheDocument();
			expect(screen.getByText("SATUAN PENGAWAS INTERN")).toBeInTheDocument();
			expect(screen.getByText("YOHANES NOVAGA, S.E.")).toBeInTheDocument();
			expect(screen.getByText("WACHJONO, S.E., Ak., CA.")).toBeInTheDocument();
			expect(screen.getByText("07.05.2025")).toBeInTheDocument();
			expect(screen.getAllByText("17.03.2026").length).toBeGreaterThanOrEqual(1);
		});

		// Verifikasi header label
		expect(screen.getByText("JABATAN")).toBeInTheDocument();
		expect(screen.getByText("TMT JABATAN")).toBeInTheDocument();
		expect(screen.getByText("GOL. TERAKHIR")).toBeInTheDocument();
		expect(screen.getByText("MULAI BEKERJA")).toBeInTheDocument();
		expect(screen.getByText("TEMPAT/TGL. LAHIR")).toBeInTheDocument();
	});

	it("menampilkan pesan kosong jika tidak ada data", async () => {
		vi.mocked(useLaporanDnp).mockReturnValue({
			data: [],
			isLoading: false,
			isError: false,
			error: null,
			refetch: vi.fn(),
		} as unknown as ReturnType<typeof useLaporanDnp>);

		render(<DnpPageClient />, { wrapper: createWrapper() });

		expect(screen.getByText("Tidak ada data laporan DNP.")).toBeInTheDocument();
	});
});
