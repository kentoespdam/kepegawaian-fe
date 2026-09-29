// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { KpiClient } from "./kpi-client";

let mockSearchParams = new URLSearchParams("periode=202609&page=1&size=10");

vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: vi.fn(),
		replace: vi.fn(),
	}),
	useSearchParams: () => mockSearchParams,
	usePathname: () => "/penggajian/kpi",
}));

vi.mock("sonner", () => ({
	toast: {
		success: vi.fn(),
		error: vi.fn(),
	},
}));

function createWrapper() {
	const qc = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});
	return function Wrapper({ children }: { children: ReactNode }) {
		return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
	};
}

describe("KpiClient", () => {
	afterEach(() => {
		cleanup();
		document.body.innerHTML = "";
		document.body.removeAttribute("style");
		document.body.removeAttribute("data-base-ui-inert");
	});

	beforeEach(() => {
		vi.restoreAllMocks();
		mockSearchParams = new URLSearchParams("periode=202609&page=1&size=10");
	});

	it("renders page title, toolbar, and data table with formatted Rupiah", async () => {
		const mockPage = {
			content: [
				{
					id: 1,
					nipam: "01001",
					periode: "202609",
					tunkin: 1500000,
					pph21Ter: 75000,
				},
			],
			totalElements: 1,
			totalPages: 1,
			number: 0,
			size: 10,
			first: true,
			last: true,
		};

		global.fetch = vi.fn().mockImplementation((url: string) => {
			if (url.includes("/api/proxy/penggajian/kpi")) {
				return Promise.resolve({
					ok: true,
					json: () => Promise.resolve({ status: 200, data: mockPage }),
				});
			}
			return Promise.resolve({
				ok: true,
				json: () => Promise.resolve({ status: 200, data: [] }),
			});
		});

		render(<KpiClient />, { wrapper: createWrapper() });

		expect(screen.getByText("00. Input Data KPI")).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByText("01001")).toBeInTheDocument();
		});

		// Check Rupiah formatted currency
		expect(screen.getByText("Rp 1.500.000")).toBeInTheDocument();
		expect(screen.getByText("Rp 75.000")).toBeInTheDocument();
	});

	it("opens create form dialog when clicking Tambah Data", async () => {
		const user = userEvent.setup();

		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: () =>
				Promise.resolve({
					status: 200,
					data: { content: [], totalElements: 0, totalPages: 0, first: true, last: true },
				}),
		});

		render(<KpiClient />, { wrapper: createWrapper() });

		const tambahBtn = screen.getByRole("button", { name: /Tambah Data/i });
		await user.click(tambahBtn);

		await waitFor(() => {
			expect(screen.getByText("Tambah Data KPI")).toBeInTheDocument();
			expect(screen.getByRole("button", { name: /Cari Pegawai Aktif/i })).toBeInTheDocument();
		});

		const batalBtn = screen.getByRole("button", { name: /Batal/i });
		await user.click(batalBtn);
	});

	it("opens upload dialog when clicking Upload Excel", async () => {
		const user = userEvent.setup();

		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: () =>
				Promise.resolve({
					status: 200,
					data: { content: [], totalElements: 0, totalPages: 0, first: true, last: true },
				}),
		});

		render(<KpiClient />, { wrapper: createWrapper() });

		const uploadBtn = screen.getByRole("button", { name: /Upload Excel/i });
		await user.click(uploadBtn);

		await waitFor(() => {
			expect(screen.getByText("Upload Data KPI")).toBeInTheDocument();
			expect(screen.getAllByText("Unduh Template").length).toBeGreaterThanOrEqual(2);
		});
	});
});
