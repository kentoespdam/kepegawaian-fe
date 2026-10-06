// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useKartuIdentitasList, usePendukungList } from "./usePendukungQueries";

function okJson(data: unknown) {
	return new Response(JSON.stringify({ data }), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}

describe("Kepegawaian Hooks", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
		vi.stubGlobal("fetch", vi.fn());
	});

	it("usePendukungList fetches data correctly", async () => {
		const mockData = [{ id: "1", nomor: "123" }];
		vi.mocked(fetch).mockResolvedValueOnce(okJson(mockData));

		const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result } = renderHook(() => usePendukungList("100", "pendidikan"), { wrapper });

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data).toEqual(mockData);
		expect(fetch).toHaveBeenCalledWith("/api/proxy/pegawai/100/pendukung/pendidikan");
	});

	it("useKartuIdentitasList fetches data correctly", async () => {
		const mockData = { content: [{ id: "1", nomorKartu: "A1" }] };
		vi.mocked(fetch).mockResolvedValueOnce(okJson(mockData));

		const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result } = renderHook(() => useKartuIdentitasList("100", { page: 1, size: 10 }), { wrapper });

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data).toEqual(mockData);
	});
});
