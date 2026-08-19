// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TerminasiClient } from "./terminasi-client";

vi.mock("next/navigation", () => ({
	useRouter: vi.fn(),
	useSearchParams: vi.fn(),
}));

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

function renderComponent() {
	return render(
		<QueryClientProvider client={queryClient}>
			<TerminasiClient />
		</QueryClientProvider>,
	);
}

/** Mock fetch that routes by URL. */
function mockFetchByEndpoint(responses: Record<string, unknown>) {
	globalThis.fetch = vi.fn().mockImplementation(async (input: string | URL | Request) => {
		const s = typeof input === "string" ? input : input instanceof Request ? input.url : String(input);
		for (const [pattern, body] of Object.entries(responses)) {
			if (s.includes(pattern)) {
				return { ok: true, json: async () => body } as Response;
			}
		}
		return { ok: true, json: async () => ({ data: [] }) } as Response;
	});
}

describe("TerminasiClient", () => {
	const mockPush = vi.fn();
	const mockReplace = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		queryClient.clear();
		vi.mocked(useRouter).mockReturnValue({
			push: mockPush,
			replace: mockReplace,
			back: vi.fn(),
			forward: vi.fn(),
			refresh: vi.fn(),
			prefetch: vi.fn(),
		});
	});

	it("renders calon pensiun table rows correctly with nama, organisasi, jabatan, and tmtPensiun", async () => {
		const searchParams = new URLSearchParams("tab=calon-pensiun&tahunPensiun=2026");
		vi.mocked(useSearchParams).mockReturnValue(searchParams as never);

		mockFetchByEndpoint({
			"/calon-pensiun": {
				data: {
					totalElements: 1,
					totalPages: 1,
					size: 10,
					number: 0,
					numberOfElements: 1,
					first: true,
					last: true,
					empty: false,
					content: [
						{
							id: 101,
							nipam: "19800101",
							biodata: {
								nik: "3507123456780001",
								nama: "Budi Santoso",
							},
							organisasi: {
								id: 1,
								nama: "Bagian Keuangan",
							},
							jabatan: {
								id: 2,
								nama: "Kepala Bagian Keuangan",
							},
							tmtPensiun: "2026-12-31",
						},
					],
				},
			},
			"/master/alasan-berhenti": { data: [] },
		});

		renderComponent();

		await waitFor(() => {
			expect(screen.getByText("19800101")).toBeInTheDocument();
		});

		expect(screen.getByText("Budi Santoso")).toBeInTheDocument();
		expect(screen.getByText("Bagian Keuangan")).toBeInTheDocument();
		expect(screen.getByText("Kepala Bagian Keuangan")).toBeInTheDocument();
		expect(screen.getByText("31 Desember 2026")).toBeInTheDocument();
	});

	it("renders sudah terminasi table rows correctly with all columns including alasan", async () => {
		const searchParams = new URLSearchParams("tab=terminasi&tahunPensiun=2026");
		vi.mocked(useSearchParams).mockReturnValue(searchParams as never);

		mockFetchByEndpoint({
			"/riwayat/terminasi": {
				data: {
					totalElements: 1,
					totalPages: 1,
					size: 10,
					number: 0,
					numberOfElements: 1,
					first: true,
					last: true,
					empty: false,
					content: [
						{
							id: 201,
							nipam: "19700101",
							nama: "Siti Rahma",
							namaOrganisasi: "Bagian Umum",
							namaJabatan: "Staf Administrasi",
							tanggalTerminasi: "2026-05-15",
							alasanTerminasi: {
								id: 1,
								nama: "Pensiun Normal",
							},
						},
					],
				},
			},
			"/master/alasan-berhenti": { data: [{ id: 1, nama: "Pensiun Normal" }] },
		});

		renderComponent();

		await waitFor(() => {
			expect(screen.getByText("19700101")).toBeInTheDocument();
		});

		expect(screen.getByText("Siti Rahma")).toBeInTheDocument();
		expect(screen.getByText("Bagian Umum")).toBeInTheDocument();
		expect(screen.getByText("Staf Administrasi")).toBeInTheDocument();
		expect(screen.getByText("15 Mei 2026")).toBeInTheDocument();
		expect(screen.getAllByText("Pensiun Normal").length).toBeGreaterThanOrEqual(1);
	});
});
