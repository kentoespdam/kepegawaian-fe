// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider } from "@/hooks/useAuth";
import { TambahanClient } from "./tambahan-client";

function mockFetch(handlers: Record<string, unknown>) {
	const entries = Object.entries(handlers).sort((a, b) => b[0].length - a[0].length);
	global.fetch = vi.fn().mockImplementation((url: string) => {
		for (const [pattern, data] of entries) {
			if (url.includes(pattern)) {
				return Promise.resolve({
					ok: true,
					json: () => Promise.resolve({ status: 200, data }),
				});
			}
		}
		return Promise.resolve({
			ok: true,
			json: () => Promise.resolve({ status: 200, data: [] }),
		});
	});
}

function wrapper({ children }: { children: ReactNode }) {
	const qc = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});
	return (
		<QueryClientProvider client={qc}>
			<AuthProvider roles={["admin"]} permissions={["PENGGAJIAN:TAMBAHAN"]}>
				{children}
			</AuthProvider>
		</QueryClientProvider>
	);
}

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
		periode: `${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}`,
		status: "WAIT_VERIFICATION_PHASE_2",
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
		gajiPokok: 5000000,
		phdp: 4000000,
		penghasilanKotor: 6000000,
		totalPotongan: 500000,
		pajak: 100000,
		penghasilanBersihFinal: 5400000,
	},
];

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

		render(<TambahanClient />, { wrapper });

		await waitFor(() => {
			expect(screen.getByText("Belum ada proses gaji untuk periode ini")).toBeInTheDocument();
		});
	});

	it("renders batch info and daftar pegawai when batch exists", async () => {
		mockFetch({
			"/penggajian/batch?": asPage(MOCK_BATCH),
			"/penggajian/batch/master?": MOCK_MASTER,
			"/penggajian/batch/master/proses/": [],
		});

		render(<TambahanClient />, { wrapper });

		await waitFor(() => {
			expect(screen.getByText("03. Tambah Komponen Gaji")).toBeInTheDocument();
			expect(screen.getByText("Budi Santoso")).toBeInTheDocument();
			expect(screen.getByText("01. DIREKSI")).toBeInTheDocument();
		});
	});

	it("selects a pegawai and shows detail panel", async () => {
		mockFetch({
			"/penggajian/batch?": asPage(MOCK_BATCH),
			"/penggajian/batch/master?": MOCK_MASTER,
			"/penggajian/batch/master/pegawai/1": MOCK_MASTER[0],
			"/penggajian/batch/master/proses/1/master": [],
		});

		render(<TambahanClient />, { wrapper });

		await waitFor(() => {
			expect(screen.getByText("Budi Santoso")).toBeInTheDocument();
		});

		fireEvent.click(screen.getByText("Budi Santoso"));

		await waitFor(() => {
			expect(screen.getByText("Tambah Komponen")).toBeInTheDocument();
		});
	});
});
