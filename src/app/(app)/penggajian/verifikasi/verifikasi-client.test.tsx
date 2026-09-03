// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider } from "@/hooks/useAuth";
import { VerifikasiClient } from "./verifikasi-client";

const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_MONTH = String(new Date().getMonth() + 1).padStart(2, "0");
const CURRENT_PERIODE = `${CURRENT_YEAR}${CURRENT_MONTH}`;

/** Wrap an array in the Page shape that the paginated batch API now returns. */
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
		totalPegawai: 1,
		tanggalProses: "2026-08-01",
		diProsesOleh: "Budi",
		jabatanPemroses: "Staf SDM",
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
				<AuthProvider roles={["admin"]} permissions={["PENGGAJIAN:VERIFY1"]}>
					{children}
				</AuthProvider>
			</QueryClientProvider>
		);
	};
}

const MOCK_MASTER = [
	{
		id: 1,
		nama: "Siti Aminah",
		nipam: "54321",
		namaOrganisasi: "02. KEUANGAN",
		namaJabatan: "Staf",
		golongan: "III/b",
		jmlJiwa: 3,
		kodePajak: "K/2",
		gajiPokok: 4500000,
		phdp: 3500000,
		penghasilanKotor: 5500000,
		totalPotongan: 400000,
		pembulatan: 0,
		pajak: 80000,
		penghasilanBersihFinal: 5100000,
	},
];

// Org names interleave (A, B, A, B) so consecutive-only grouping produces
// duplicate group names -> duplicate React keys unless keys are unique.
const MOCK_MASTER_INTERLEAVED = [
	{
		id: 1,
		nama: "Pegawai A1",
		nipam: "0001",
		namaOrganisasi: "SUB BAG A",
		namaJabatan: "Staf",
		golongan: "III/a",
	},
	{
		id: 2,
		nama: "Pegawai B1",
		nipam: "0002",
		namaOrganisasi: "SUB BAG B",
		namaJabatan: "Staf",
		golongan: "III/a",
	},
	{
		id: 3,
		nama: "Pegawai A2",
		nipam: "0003",
		namaOrganisasi: "SUB BAG A",
		namaJabatan: "Staf",
		golongan: "III/a",
	},
	{
		id: 4,
		nama: "Pegawai B2",
		nipam: "0004",
		namaOrganisasi: "SUB BAG B",
		namaJabatan: "Staf",
		golongan: "III/a",
	},
];

const MOCK_PROSES = [
	{
		id: 101,
		gajiBatchMasterId: 1,
		kode: "GAPOK",
		nama: "Gaji Pokok",
		jenisGaji: "PEMASUKAN",
		nilai: 4500000,
	},
	{
		id: 102,
		gajiBatchMasterId: 1,
		kode: "TUNJ_KEL",
		nama: "Tunjangan Suami Istri",
		jenisGaji: "PEMASUKAN",
		nilai: 1000000,
	},
	{
		id: 103,
		gajiBatchMasterId: 1,
		kode: "POT_PENS",
		nama: "Iuran Pensiun",
		jenisGaji: "POTONGAN",
		nilai: 400000,
	},
	{
		id: 104,
		gajiBatchMasterId: 1,
		kode: "IGNORE_ME",
		nama: "Komponen None",
		jenisGaji: "NONE",
		nilai: 999999,
	},
];

describe("VerifikasiClient", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	afterEach(() => {
		cleanup();
	});

	it("renders empty state when no batch exists for period", async () => {
		mockFetch({
			"/penggajian/batch?": asPage([]),
			"/penggajian/batch": asPage([]),
		});

		render(<VerifikasiClient />, { wrapper: createWrapper() });

		await waitFor(() => {
			expect(screen.getByText("Belum ada proses gaji untuk periode ini")).toBeInTheDocument();
		});
	});

	it("renders table, grouped header, detail components, and handles verification", async () => {
		mockFetch({
			"/penggajian/batch?": asPage(MOCK_BATCH),
			"/penggajian/batch/master?": MOCK_MASTER,
			"/penggajian/batch/master/proses/1/master": MOCK_PROSES,
			"/penggajian/batch/b1/verify1": { status: 200, data: {} },
		});

		render(<VerifikasiClient />, { wrapper: createWrapper() });

		await waitFor(() => {
			expect(screen.getByText("02. Verifikasi Gapok, Tunjangan & Potongan")).toBeInTheDocument();
			expect(screen.getByText("02. KEUANGAN")).toBeInTheDocument();
			expect(screen.getAllByText("Siti Aminah").length).toBeGreaterThanOrEqual(1);
			expect(screen.getByText("54321")).toBeInTheDocument();
			expect(screen.getByText("K/2")).toBeInTheDocument();
		});

		// Verify detail panel components loaded for selected pegawai
		await waitFor(() => {
			expect(screen.getByText("Jenis: Penghasilan")).toBeInTheDocument();
			expect(screen.getByText("Gaji Pokok")).toBeInTheDocument();
			expect(screen.getByText("Tunjangan Suami Istri")).toBeInTheDocument();
			expect(screen.getByText("Jenis: Potongan")).toBeInTheDocument();
			expect(screen.getByText("Iuran Pensiun")).toBeInTheDocument();
			// Component with jenisGaji NONE should be filtered out
			expect(screen.queryByText("Komponen None")).not.toBeInTheDocument();
		});

		const verifyBtn = screen.getByRole("button", { name: /Verifikasi/i });
		expect(verifyBtn).toBeEnabled();

		fireEvent.click(verifyBtn);

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/penggajian/batch/b1/verify1"),
				expect.objectContaining({ method: "PATCH" }),
			);
		});

		// Verify that batch master is called with periode parameter, NOT gajiBatchRootId
		expect(global.fetch).toHaveBeenCalledWith(
			expect.stringContaining(`/api/proxy/penggajian/batch/master?periode=${CURRENT_PERIODE}`),
		);
	});

	it("correctly renders table when batch master returns paginated Page response", async () => {
		mockFetch({
			"/penggajian/batch?": asPage(MOCK_BATCH),
			"/penggajian/batch/master?": asPage(MOCK_MASTER),
			"/penggajian/batch/master/proses/1/master": MOCK_PROSES,
		});

		render(<VerifikasiClient />, { wrapper: createWrapper() });

		await waitFor(() => {
			expect(screen.getByText("02. KEUANGAN")).toBeInTheDocument();
			expect(screen.getAllByText("Siti Aminah").length).toBeGreaterThanOrEqual(1);
			expect(screen.getByText("54321")).toBeInTheDocument();
		});
	});

	it("does not emit duplicate-key warnings when same org appears in non-consecutive rows", async () => {
		const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

		mockFetch({
			"/penggajian/batch?": asPage(MOCK_BATCH),
			"/penggajian/batch/master?": MOCK_MASTER_INTERLEAVED,
			"/penggajian/batch/master/proses/1/master": MOCK_PROSES,
		});

		render(<VerifikasiClient />, { wrapper: createWrapper() });

		await waitFor(() => {
			expect(screen.getAllByText("SUB BAG A").length).toBeGreaterThanOrEqual(1);
		});

		// Same-name orgs merge into a single group (one header, both members)
		expect(screen.getAllByText("SUB BAG A").length).toBe(1);
		expect(screen.getAllByText("SUB BAG B").length).toBe(1);
		expect(screen.getAllByText("Pegawai A1").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("Pegawai A2").length).toBeGreaterThanOrEqual(1);

		const sameKeyCalls = consoleError.mock.calls.filter((call: unknown[]) =>
			call.some((a: unknown) => typeof a === "string" && a.includes("same key")),
		);
		expect(sameKeyCalls).toHaveLength(0);

		consoleError.mockRestore();
	});

	it("handles download button click", async () => {
		const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

		mockFetch({
			"/penggajian/batch?": asPage(MOCK_BATCH),
			"/penggajian/batch/master?": MOCK_MASTER,
		});

		render(<VerifikasiClient />, { wrapper: createWrapper() });

		await waitFor(() => {
			expect(screen.getByRole("button", { name: /Download/i })).toBeEnabled();
		});

		const downloadBtn = screen.getByRole("button", { name: /Download/i });
		fireEvent.click(downloadBtn);

		expect(openSpy).toHaveBeenCalledWith(
			expect.stringContaining("/api/proxy/penggajian/batch/master/download/table-gaji/b1"),
			"_blank",
		);

		openSpy.mockRestore();
	});
});
