// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider } from "@/hooks/useAuth";
import { PersetujuanClient } from "./persetujuan-client";

const mockSearchParams = vi.fn(() => new URLSearchParams());

vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: vi.fn(),
		replace: vi.fn(),
	}),
	useSearchParams: () => mockSearchParams(),
	usePathname: () => "/penggajian/persetujuan",
}));

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
				json: () => Promise.resolve({ status: 200, data: [] }),
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
				<AuthProvider roles={["admin"]} permissions={["PENGGAJIAN:APPROVE"]}>
					{children}
				</AuthProvider>
			</QueryClientProvider>
		);
	};
}

describe("PersetujuanClient", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
	});

	it("renders empty state when no batch exists for period", async () => {
		mockFetch({
			"/penggajian/batch?": asPage([]),
			"/penggajian/batch": asPage([]),
		});

		render(<PersetujuanClient />, { wrapper: createWrapper() });

		await waitFor(() => {
			expect(screen.getByText("Belum ada proses gaji untuk periode ini")).toBeInTheDocument();
		});
	});

	it("renders executive table and approves batch when clicked", async () => {
		mockFetch({
			"/penggajian/batch?": asPage(MOCK_BATCH),
			"/penggajian/batch/master?": MOCK_MASTER,
			"/penggajian/batch/b1/verify": { status: 200, data: {} },
		});

		render(<PersetujuanClient userName="Budi" jabatanName="Manager Keuangan" />, { wrapper: createWrapper() });

		await waitFor(() => {
			expect(screen.getByText("04. Persetujuan Akhir")).toBeInTheDocument();
			expect(screen.getAllByText("Ahmad Yani").length).toBeGreaterThanOrEqual(1);
			expect(screen.getByText("Total : 1 Pegawai")).toBeInTheDocument();
		});

		const approveBtn = screen.getByRole("button", { name: /Setujui/i });
		expect(approveBtn).toBeEnabled();

		fireEvent.click(approveBtn);

		await waitFor(() => {
			expect(screen.getByText("Persetujuan Akhir Batch Gaji")).toBeInTheDocument();
		});

		fireEvent.click(screen.getByRole("button", { name: /Ya, Setujui/i }));

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/penggajian/batch/b1/verify"),
				expect.objectContaining({
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						id: "b1",
						nama: "Budi",
						jabatan: "Manager Keuangan",
					}),
				}),
			);
		});
	});

	it("executes reprocess flow with confirmation dialog and target phase", async () => {
		mockFetch({
			"/penggajian/batch?": asPage(MOCK_BATCH),
			"/penggajian/batch/master?": MOCK_MASTER,
			"/penggajian/batch/b1/reprocess": { status: 200, data: {} },
		});

		render(<PersetujuanClient userName="Budi" jabatanName="Manager Keuangan" />, { wrapper: createWrapper() });

		await waitFor(() => {
			expect(screen.getByRole("button", { name: /Proses Ulang/i })).toBeEnabled();
		});

		fireEvent.click(screen.getByRole("button", { name: /Proses Ulang/i }));

		await waitFor(() => {
			expect(screen.getByText("Proses Ulang Batch")).toBeInTheDocument();
		});

		fireEvent.click(screen.getByRole("button", { name: /Ya, Proses Ulang/i }));

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/penggajian/batch/b1/reprocess"),
				expect.objectContaining({
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						id: "b1",
					}),
				}),
			);
		});
	});

	it("downloads table gaji when Table Gaji button is clicked", async () => {
		const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
		mockFetch({
			"/penggajian/batch?": asPage(MOCK_BATCH),
			"/penggajian/batch/master?": MOCK_MASTER,
		});

		render(<PersetujuanClient userName="Budi" jabatanName="Manager Keuangan" />, { wrapper: createWrapper() });

		await waitFor(() => {
			expect(screen.getByRole("button", { name: /Table Gaji/i })).toBeEnabled();
		});

		fireEvent.click(screen.getByRole("button", { name: /Table Gaji/i }));

		expect(openSpy).toHaveBeenCalledWith("/api/proxy/penggajian/batch/master/download/table-gaji/b1", "_blank");
		openSpy.mockRestore();
	});

	it("executes kirim slip gaji flow with confirmation dialog", async () => {
		mockFetch({
			"/penggajian/batch?": asPage(MOCK_BATCH),
			"/penggajian/batch/master?": MOCK_MASTER,
			"/penggajian/batch/master/upload/b1": { status: 200, data: {} },
		});

		render(<PersetujuanClient userName="Budi" jabatanName="Manager Keuangan" />, { wrapper: createWrapper() });

		await waitFor(() => {
			expect(screen.getByRole("button", { name: /Kirim Slip Gaji/i })).toBeEnabled();
		});

		fireEvent.click(screen.getByRole("button", { name: /Kirim Slip Gaji/i }));

		await waitFor(() => {
			expect(screen.getByRole("heading", { name: "Kirim Slip Gaji" })).toBeInTheDocument();
		});

		fireEvent.click(screen.getByRole("button", { name: /Ya, Kirim Slip/i }));

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/penggajian/batch/master/upload/b1"),
				expect.objectContaining({
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						id: "b1",
						nama: "Budi",
						jabatan: "Manager Keuangan",
					}),
				}),
			);
		});
	});
});
