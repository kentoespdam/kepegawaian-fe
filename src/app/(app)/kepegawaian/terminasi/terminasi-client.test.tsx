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

		const mockCalonPensiunResponse = {
			statusCode: 200,
			statusText: "200 OK",
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
		};

		globalThis.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => mockCalonPensiunResponse,
		} as Response);

		renderComponent();

		// Wait for data to load
		await waitFor(() => {
			expect(screen.getByText("19800101")).toBeInTheDocument();
		});

		// Verify that Nama, Organisasi, Jabatan, and Tgl. Pensiun are properly displayed in the table
		expect(screen.getByText("Budi Santoso")).toBeInTheDocument();
		expect(screen.getByText("Bagian Keuangan")).toBeInTheDocument();
		expect(screen.getByText("Kepala Bagian Keuangan")).toBeInTheDocument();
		expect(screen.getByText("31 Desember 2026")).toBeInTheDocument();
	});

	it("renders sudah terminasi table rows correctly with all columns including alasan", async () => {
		const searchParams = new URLSearchParams("tab=terminasi&tahunPensiun=2026");
		vi.mocked(useSearchParams).mockReturnValue(searchParams as never);

		const mockTerminasiResponse = {
			statusCode: 200,
			statusText: "200 OK",
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
		};

		globalThis.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => mockTerminasiResponse,
		} as Response);

		renderComponent();

		// Wait for data to load
		await waitFor(() => {
			expect(screen.getByText("19700101")).toBeInTheDocument();
		});

		// Verify fields for Sudah Terminasi
		expect(screen.getByText("Siti Rahma")).toBeInTheDocument();
		expect(screen.getByText("Bagian Umum")).toBeInTheDocument();
		expect(screen.getByText("Staf Administrasi")).toBeInTheDocument();
		expect(screen.getByText("15 Mei 2026")).toBeInTheDocument();
		expect(screen.getByText("Pensiun Normal")).toBeInTheDocument();
	});
});
