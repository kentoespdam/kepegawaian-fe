/** @vitest-environment jsdom */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { useLaporanDuk } from "@/hooks/laporan/useLaporanDuk";
import { DukPageClient } from "./duk-page-client";

vi.mock("@/hooks/laporan/useLaporanDuk", () => ({
	useLaporanDuk: vi.fn(),
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

describe("DukPageClient", () => {
	it("tidak menampilkan duplicate key error saat ada NIPAM yang sama", async () => {
		const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		vi.mocked(useLaporanDuk).mockReturnValue({
			data: [
				{
					nama: "Pegawai A",
					nipam: "900800456",
					golongan: "III/a",
					pangkat: "Penata Muda",
					usia: 30,
				},
				{
					nama: "Pegawai B",
					nipam: "900800456",
					golongan: "III/b",
					pangkat: "Penata Muda Tk. I",
					usia: 32,
				},
			],
			isLoading: false,
			isError: false,
			error: null,
			refetch: vi.fn(),
		} as unknown as ReturnType<typeof useLaporanDuk>);

		render(<DukPageClient />, { wrapper: createWrapper() });

		await waitFor(() => {
			expect(screen.getByText("Pegawai A")).toBeInTheDocument();
			expect(screen.getByText("Pegawai B")).toBeInTheDocument();
		});

		const duplicateKeyCalls = consoleErrorSpy.mock.calls.filter((call) =>
			String(call[0]).includes("Encountered two children with the same key"),
		);
		expect(duplicateKeyCalls.length).toBe(0);

		consoleErrorSpy.mockRestore();
	});
});
