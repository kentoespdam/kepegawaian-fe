// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider } from "@/hooks/useAuth";
import { PersetujuanClient } from "./persetujuan-client";

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
			<AuthProvider roles={["admin"]} permissions={["PENGGAJIAN:APPROVE"]}>
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
		status: "WAIT_APPROVAL",
		totalPegawai: 1,
		tanggalProses: "2026-08-01",
		diProsesOleh: "Budi",
		jabatanPemroses: "Staf SDM",
	},
];

const MOCK_MASTER = [
	{
		id: 1,
		nama: "Ahmad Yani",
		nipam: "99881",
		namaOrganisasi: "01. DIREKSI",
		namaJabatan: "Direktur Utama",
		golongan: "IV/e",
		penghasilanKotor: 15000000,
		totalPotongan: 1500000,
		pembulatan: 0,
		penghasilanBersihFinal: 13500000,
	},
];

describe("PersetujuanClient", () => {
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

		render(<PersetujuanClient />, { wrapper });

		await waitFor(() => {
			expect(screen.getByText("Belum ada proses gaji untuk periode ini")).toBeInTheDocument();
		});
	});

	it("renders executive table and approves batch when clicked", async () => {
		mockFetch({
			"/penggajian/batch?": asPage(MOCK_BATCH),
			"/penggajian/batch/master?": MOCK_MASTER,
			"/penggajian/batch/b1/accept": { status: 200, data: {} },
		});

		render(<PersetujuanClient />, { wrapper });

		await waitFor(() => {
			expect(screen.getByText("04. Persetujuan Akhir")).toBeInTheDocument();
			expect(screen.getByText("Ahmad Yani")).toBeInTheDocument();
			expect(screen.getByText("Subtotal 1 Pegawai")).toBeInTheDocument();
		});

		const approveBtn = screen.getByRole("button", { name: /Setujui/i });
		expect(approveBtn).toBeEnabled();

		fireEvent.click(approveBtn);

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/penggajian/batch/b1/accept"),
				expect.objectContaining({ method: "PATCH" }),
			);
		});
	});
});
