// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider } from "@/hooks/useAuth";
import { ProsesGajiClient } from "./proses-gaji-client";

let mockSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: vi.fn(),
		replace: vi.fn(),
	}),
	useSearchParams: () => mockSearchParams,
}));

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

function createWrapper(
	roles = ["admin"],
	permissions = ["PENGGAJIAN:SETUP", "PENGGAJIAN:DELETE", "PENGGAJIAN:PROCESS"],
) {
	return function Wrapper({ children }: { children: ReactNode }) {
		const qc = new QueryClient({
			defaultOptions: { queries: { retry: false } },
		});
		return (
			<QueryClientProvider client={qc}>
				<AuthProvider roles={roles} permissions={permissions}>
					{children}
				</AuthProvider>
			</QueryClientProvider>
		);
	};
}

const MOCK_BATCH = [
	{
		id: "b1",
		periode: "2026-08",
		status: "PENDING",
		notes: "Proses rutin Agustus",
		totalPegawai: 50,
		tanggalProses: "2026-08-01",
		diProsesOleh: "Budi",
		jabatanPemroses: "Staf SDM",
	},
];

describe("ProsesGajiClient", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
		mockSearchParams = new URLSearchParams();
	});

	afterEach(() => {
		cleanup();
	});

	it("renders batch table and create batch button", async () => {
		mockFetch({
			"/penggajian/batch": asPage(MOCK_BATCH),
		});

		render(<ProsesGajiClient userName="Budi" />, { wrapper: createWrapper() });

		await waitFor(() => {
			expect(screen.getByText("01. Proses Gaji Bulanan")).toBeInTheDocument();
			expect(screen.getByText("Buat Proses Gaji Baru")).toBeInTheDocument();
			expect(screen.getAllByText("2026-08").length).toBeGreaterThan(0);
		});
	});

	it("renders action buttons according to batch status rules", async () => {
		const batches = [
			{ id: "b1", periode: "2026-01", status: "PENDING" },
			{ id: "b2", periode: "2026-02", status: "FAILED" },
			{ id: "b3", periode: "2026-03", status: "WAIT_VERIFICATION_PHASE_1" },
			{ id: "b4", periode: "2026-04", status: "FINISHED" },
			{ id: "b5", periode: "2026-05", status: "PROSES" },
		];

		mockFetch({
			"/penggajian/batch": asPage(batches),
		});

		render(<ProsesGajiClient userName="Budi" />, { wrapper: createWrapper() });

		await waitFor(() => {
			expect(screen.getAllByLabelText("Proses Ulang")).toHaveLength(2); // b1 (PENDING) & b2 (FAILED)
			expect(screen.getAllByLabelText("Hapus")).toHaveLength(3); // b1 (PENDING), b2 (FAILED), b3 (WAIT_VERIFICATION_PHASE_1)
		});
	});

	it("executes reprocess flow with confirmation dialog", async () => {
		const user = userEvent.setup();
		mockFetch({
			"/penggajian/batch": asPage(MOCK_BATCH),
			"/penggajian/batch/b1/reprocess": { status: 200, data: {} },
		});

		render(<ProsesGajiClient userName="Budi" />, { wrapper: createWrapper() });

		await waitFor(() => {
			expect(screen.getByLabelText("Proses Ulang")).toBeInTheDocument();
		});

		await user.click(screen.getByLabelText("Proses Ulang"));

		expect(screen.getByText("Proses Ulang Batch")).toBeInTheDocument();
		expect(screen.getByText(/Apakah Anda yakin ingin memproses ulang batch payroll periode/)).toBeInTheDocument();

		const confirmBtn = screen.getByRole("button", { name: "Proses Ulang" });
		await user.click(confirmBtn);

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/penggajian/batch/b1/reprocess"),
				expect.objectContaining({ method: "PATCH" }),
			);
		});
	});

	it("executes delete flow with confirm delete dialog", async () => {
		const user = userEvent.setup();
		mockFetch({
			"/penggajian/batch": asPage(MOCK_BATCH),
			"/penggajian/batch/b1": { status: 200, data: {} },
		});

		render(<ProsesGajiClient userName="Budi" />, { wrapper: createWrapper() });

		await waitFor(() => {
			expect(screen.getByLabelText("Hapus")).toBeInTheDocument();
		});

		await user.click(screen.getByLabelText("Hapus"));

		expect(screen.getByText("Hapus Batch Periode 2026-08")).toBeInTheDocument();

		const input = screen.getByPlaceholderText("Ketik HAPUS");
		await user.type(input, "HAPUS");

		const confirmBtn = screen.getByRole("button", { name: "Hapus" });
		expect(confirmBtn).not.toBeDisabled();
		await user.click(confirmBtn);

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/penggajian/batch/b1"),
				expect.objectContaining({ method: "DELETE" }),
			);
		});
	});

	it("respects RBAC by hiding actions when permissions are missing", async () => {
		mockFetch({
			"/penggajian/batch": asPage(MOCK_BATCH),
		});

		// User only with read/setup permission, no DELETE and no PROCESS
		render(<ProsesGajiClient userName="Budi" />, {
			wrapper: createWrapper(["viewer"], ["PENGGAJIAN:READ"]),
		});

		await waitFor(() => {
			expect(screen.getByText("01. Proses Gaji Bulanan")).toBeInTheDocument();
		});

		expect(screen.queryByLabelText("Proses Ulang")).not.toBeInTheDocument();
		expect(screen.queryByLabelText("Hapus")).not.toBeInTheDocument();
	});

	it("renders filter container with labels and human-readable month label in table", async () => {
		mockFetch({
			"/penggajian/batch": asPage(MOCK_BATCH),
		});

		render(<ProsesGajiClient userName="Budi" />, { wrapper: createWrapper() });

		await waitFor(() => {
			// Human-readable Indonesian period label in table
			expect(screen.getByText("Agustus 2026")).toBeInTheDocument();

			// Filter card container & labels
			expect(screen.getByText("Filter & Pencarian Batch")).toBeInTheDocument();
			expect(screen.getByText("Periode Batch")).toBeInTheDocument();
			expect(screen.getByText("Status Payroll")).toBeInTheDocument();
		});
	});

	it("renders phase shortcut links with period query parameters (year & month)", async () => {
		const batches = [
			{ id: "b1", periode: "2026-03", status: "WAIT_VERIFICATION_PHASE_1" },
			{ id: "b2", periode: "2026-04", status: "WAIT_VERIFICATION_PHASE_2" },
			{ id: "b3", periode: "2026-05", status: "WAIT_APPROVAL" },
		];

		mockFetch({
			"/penggajian/batch": asPage(batches),
		});

		render(<ProsesGajiClient userName="Budi" />, {
			wrapper: createWrapper(["admin"], ["PENGGAJIAN:VERIFY1", "PENGGAJIAN:TAMBAHAN", "PENGGAJIAN:APPROVE"]),
		});

		await waitFor(() => {
			const linkVerif = screen.getByRole("link", { name: /Verifikasi 1/i });
			expect(linkVerif).toHaveAttribute("href", "/penggajian/verifikasi?year=2026&month=03");

			const linkTambahan = screen.getByRole("link", { name: /Tambah Komponen/i });
			expect(linkTambahan).toHaveAttribute("href", "/penggajian/tambahan?year=2026&month=04");

			const linkPersetujuan = screen.getByRole("link", { name: /Persetujuan/i });
			expect(linkPersetujuan).toHaveAttribute("href", "/penggajian/persetujuan?year=2026&month=05");
		});
	});

	it("hides phase shortcut links when user lacks RBAC permission for that phase", async () => {
		const batches = [{ id: "b1", periode: "2026-03", status: "WAIT_VERIFICATION_PHASE_1" }];

		mockFetch({
			"/penggajian/batch": asPage(batches),
		});

		// User without admin role and without PENGGAJIAN:VERIFY1
		render(<ProsesGajiClient userName="Budi" />, {
			wrapper: createWrapper(["user"], ["PENGGAJIAN:SETUP"]),
		});

		await waitFor(() => {
			expect(screen.getByText("2026-03")).toBeInTheDocument();
		});

		expect(screen.queryByRole("link", { name: /Verifikasi 1/i })).not.toBeInTheDocument();
	});

	it("displays human-readable status label instead of raw enum value when status filter is active", async () => {
		mockSearchParams = new URLSearchParams("status=WAIT_VERIFICATION_PHASE_1");

		mockFetch({
			"/penggajian/batch": asPage(MOCK_BATCH),
		});

		render(<ProsesGajiClient userName="Budi" />, { wrapper: createWrapper() });

		await waitFor(() => {
			const trigger = screen.getByLabelText("Filter Status");
			// Should display the human-readable label "Verifikasi Tahap 1" in the select trigger
			expect(trigger).toHaveTextContent("Verifikasi Tahap 1");
			// Should NOT display raw enum value in the trigger
			expect(trigger).not.toHaveTextContent("WAIT_VERIFICATION_PHASE_1");
		});
	});
});
