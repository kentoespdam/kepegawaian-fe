// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider } from "@/hooks/useAuth";
import { TambahanClient } from "./tambahan-client";

const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_MONTH = String(new Date().getMonth() + 1).padStart(2, "0");
const CURRENT_PERIODE = `${CURRENT_YEAR}${CURRENT_MONTH}`;

function asPage<T>(items: T[]) {
	return {
		content: items,
		totalElements: items.length,
		totalPages: 1,
		number: 0,
		size: 10,
		first: true,
		last: true,
	};
}

const MOCK_BATCH = [
	{
		id: "b1",
		periode: CURRENT_PERIODE,
		status: "WAIT_VERIFICATION_PHASE_1",
		totalPegawai: 2,
		tanggalProses: "2026-08-01",
		diProsesOleh: "Budi",
		jabatanPemroses: "Staf SDM",
	},
];

const MOCK_MASTER = [
	{
		id: 1,
		nama: "Budi Santoso",
		nipam: "12345",
		namaOrganisasi: "01. DIREKSI",
		namaJabatan: "Direktur",
		golongan: "IV/a",
		penghasilanKotor: 6000000,
		totalPotongan: 500000,
		pembulatan: 0,
		penghasilanBersih: 5500000,
		totalAddTambahan: 100000,
		totalAddPotongan: 50000,
		penghasilanBersihFinal: 5550000,
	},
];

const MOCK_PROSES = [
	{
		id: 101,
		gajiBatchMasterId: 1,
		kode: "GAPOK",
		nama: "Gaji Pokok",
		jenisGaji: "PEMASUKAN",
		nilai: 5000000,
	},
	{
		id: 102,
		gajiBatchMasterId: 1,
		kode: "ADD_BONUS",
		nama: "Bonus Kinerja",
		jenisGaji: "PEMASUKAN",
		nilai: 100000,
	},
	{
		id: 103,
		gajiBatchMasterId: 1,
		kode: "ADD_POTONGAN",
		nama: "Simpanan Koperasi",
		jenisGaji: "POTONGAN",
		nilai: 50000,
	},
];

function mockFetch(handlers: Record<string, unknown>) {
	const entries = Object.entries(handlers).sort((a, b) => b[0].length - a[0].length);
	global.fetch = vi.fn().mockImplementation((url: string) => {
		for (const [pattern, data] of entries) {
			if (url.includes(pattern)) {
				return Promise.resolve({
					ok: true,
					status: 200,
					json: () => Promise.resolve({ status: 200, data }),
				});
			}
		}

		if (url.includes("/penggajian/batch/master/proses/")) {
			return Promise.resolve({
				ok: true,
				status: 200,
				json: () => Promise.resolve({ status: 200, data: MOCK_PROSES }),
			});
		}

		if (url.includes("/penggajian/batch/master?")) {
			return Promise.resolve({
				ok: true,
				status: 200,
				json: () => Promise.resolve({ status: 200, data: MOCK_MASTER }),
			});
		}

		if (url.includes("/penggajian/batch?")) {
			return Promise.resolve({
				ok: true,
				status: 200,
				json: () => Promise.resolve({ status: 200, data: asPage(MOCK_BATCH) }),
			});
		}

		return Promise.resolve({
			ok: true,
			status: 200,
			json: () => Promise.resolve({ status: 200, data: [] }),
		});
	});
}

function createWrapper() {
	const qc = new QueryClient({
		defaultOptions: { queries: { retry: false, gcTime: 0 } },
	});
	return function Wrapper({ children }: { children: ReactNode }) {
		return (
			<QueryClientProvider client={qc}>
				<AuthProvider roles={["admin"]} permissions={["PENGGAJIAN:TAMBAHAN"]}>
					{children}
				</AuthProvider>
			</QueryClientProvider>
		);
	};
}

describe("TambahanClient", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	afterEach(() => {
		cleanup();
	});

	it("renders empty state when no batch exists for period", async () => {
		mockFetch({
			"/penggajian/batch?": asPage([]),
		});

		render(<TambahanClient />, { wrapper: createWrapper() });

		await waitFor(() => {
			expect(screen.getByText("Belum ada proses gaji untuk periode ini")).toBeInTheDocument();
		});
	});

	it("renders batch info, left table columns and right panel rincian gaji", async () => {
		mockFetch({
			"/penggajian/batch?": asPage(MOCK_BATCH),
			"/penggajian/batch/master?": MOCK_MASTER,
			"/penggajian/batch/master/proses/1/master": MOCK_PROSES,
		});

		render(<TambahanClient />, { wrapper: createWrapper() });

		await waitFor(() => {
			expect(screen.getAllByText("Tambah Komponen Gaji")[0]).toBeInTheDocument();
			expect(screen.getByText("01. DIREKSI")).toBeInTheDocument();
			expect(screen.getAllByText("Budi Santoso").length).toBeGreaterThanOrEqual(1);
			expect(screen.getByText("12345")).toBeInTheDocument();
			expect(screen.getByText("Peng. Tambahan")).toBeInTheDocument();
			expect(screen.getByText("Pot. Tambahan")).toBeInTheDocument();
			expect(screen.getByText("Jml. Gaji Final")).toBeInTheDocument();
		});

		// Verify right panel loads automatically for first pegawai
		await waitFor(() => {
			expect(screen.getByText("Rincian Gaji")).toBeInTheDocument();
			expect(screen.getByText("Jenis: Penghasilan")).toBeInTheDocument();
			expect(screen.getByText("Gaji Pokok")).toBeInTheDocument();
			expect(screen.getByText("Bonus Kinerja")).toBeInTheDocument();
			expect(screen.getByText("Jenis: Potongan")).toBeInTheDocument();
			expect(screen.getByText("Simpanan Koperasi")).toBeInTheDocument();
		});

		// Verify toolbar buttons exist
		expect(screen.getByRole("button", { name: /Komponen Gaji/i })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /Verifikasi/i })).toBeEnabled();
		expect(screen.getByRole("button", { name: /Proses Ulang/i })).toBeEnabled();
	});

	it("renders delete button only for ADD_ components when canEdit is true", async () => {
		mockFetch({
			"/penggajian/batch?": asPage(MOCK_BATCH),
			"/penggajian/batch/master?": MOCK_MASTER,
			"/penggajian/batch/master/proses/1/master": MOCK_PROSES,
		});

		render(<TambahanClient />, { wrapper: createWrapper() });

		await waitFor(() => {
			expect(screen.getByText("Bonus Kinerja")).toBeInTheDocument();
		});

		// Check delete buttons for ADD_ components
		const deleteBtns = screen.getAllByTitle("Hapus Komponen");
		expect(deleteBtns.length).toBe(2); // Bonus Kinerja (ADD_BONUS) & Simpanan Koperasi (ADD_POTONGAN)
	});

	it("disables edit actions when status is not WAIT_VERIFICATION_PHASE_1", async () => {
		const nonEditableBatch = [
			{
				...MOCK_BATCH[0],
				status: "WAIT_VERIFICATION_PHASE_2",
			},
		];

		mockFetch({
			"/penggajian/batch?": asPage(nonEditableBatch),
			"/penggajian/batch/master?": MOCK_MASTER,
			"/penggajian/batch/master/proses/1/master": MOCK_PROSES,
		});

		render(<TambahanClient />, { wrapper: createWrapper() });

		await waitFor(() => {
			expect(screen.getAllByText("Budi Santoso").length).toBeGreaterThanOrEqual(1);
		});

		// Buttons should be disabled
		expect(screen.getByRole("button", { name: /Verifikasi/i })).toBeDisabled();
		expect(screen.getByRole("button", { name: /Proses Ulang/i })).toBeDisabled();

		await waitFor(() => {
			expect(screen.getByRole("button", { name: /Tambah Komponen/i })).toBeDisabled();
		});
		expect(screen.queryByTitle("Hapus Komponen")).not.toBeInTheDocument();
	});

	it("filters pegawai by NIK and Nama and resets filter", async () => {
		mockFetch({
			"/penggajian/batch?": asPage(MOCK_BATCH),
			"/penggajian/batch/master?": MOCK_MASTER,
			"/penggajian/batch/master/proses/1/master": MOCK_PROSES,
		});

		render(<TambahanClient />, { wrapper: createWrapper() });

		await waitFor(() => {
			expect(screen.getAllByText("Budi Santoso").length).toBeGreaterThanOrEqual(1);
		});

		const nikInput = screen.getByPlaceholderText("Cari NIK");
		fireEvent.change(nikInput, { target: { value: "99999" } });

		await waitFor(() => {
			expect(screen.getByText("Tidak ada pegawai yang cocok dengan pencarian")).toBeInTheDocument();
		});

		const resetBtn = screen.getByTitle("Reset Pencarian");
		fireEvent.click(resetBtn);

		await waitFor(() => {
			expect(screen.getAllByText("Budi Santoso").length).toBeGreaterThanOrEqual(1);
		});
	});
});
