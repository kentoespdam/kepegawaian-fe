// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useBatchMasterProses } from "./useBatchMasterProses";

function wrapper({ children }: { children: ReactNode }) {
	return (
		<QueryClientProvider
			client={
				new QueryClient({
					defaultOptions: { queries: { retry: false } },
				})
			}
		>
			{children}
		</QueryClientProvider>
	);
}

describe("useBatchMasterProses", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
		vi.spyOn(console, "error").mockImplementation(() => {});
	});

	it("fetches tambahan list for given pegawaiId", async () => {
		const mockData = [
			{ id: 1, nama: "Bonus", jenisGaji: "PEMASUKAN", nilai: 500000 },
			{ id: 2, nama: "Potongan Pinjaman", jenisGaji: "POTONGAN", nilai: 100000 },
		];

		vi.spyOn(global, "fetch").mockResolvedValue({
			ok: true,
			json: () => Promise.resolve({ data: mockData }),
		} as Response);

		const { result } = renderHook(() => useBatchMasterProses("123"), { wrapper });

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(result.current.data).toHaveLength(2);
		expect(result.current.data?.[0].nama).toBe("Bonus");
		expect(global.fetch).toHaveBeenCalledWith("/api/proxy/penggajian/batch/master/proses/123/master");
	});

	it("does not fetch when pegawaiId is empty", () => {
		vi.spyOn(global, "fetch").mockResolvedValue({} as Response);

		const { result } = renderHook(() => useBatchMasterProses(""), { wrapper });

		expect(result.current.fetchStatus).toBe("idle");
		expect(global.fetch).not.toHaveBeenCalled();
	});

	it("handles fetch error", async () => {
		vi.spyOn(global, "fetch").mockResolvedValue({
			ok: false,
			status: 500,
		} as Response);

		const { result } = renderHook(() => useBatchMasterProses("123"), { wrapper });

		await waitFor(() => expect(result.current.isError).toBe(true));
	});
});
