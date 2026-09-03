// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useBatchList } from "./useBatchList";

function wrapper({ children }: { children: ReactNode }) {
	return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
}

describe("useBatchList", () => {
	beforeEach(() => vi.restoreAllMocks());

	it("extracts rows from PageEnvelope (paginated response shape)", async () => {
		const mockBatches = [
			{ id: "b1", periode: "2026-08", status: "PENDING", totalPegawai: 50 },
			{ id: "b2", periode: "2026-07", status: "FINISHED", totalPegawai: 48 },
		];

		const mockPage = {
			content: mockBatches,
			totalElements: 2,
			totalPages: 1,
			number: 0,
			size: 10,
			first: true,
			last: true,
		};

		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: () => Promise.resolve({ status: 200, data: mockPage }),
		});

		const { result } = renderHook(() => useBatchList({ page: "0", size: "10" }), { wrapper });

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		const page = result.current.data;
		expect(page?.content).toHaveLength(2);
		expect(page?.content?.[0]?.periode).toBe("2026-08");
		expect(page?.totalElements).toBe(2);
		expect(page?.totalPages).toBe(1);
	});
});
