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

	it("extracts rows from Envelope (backend response shape)", async () => {
		// Backend GET /penggajian/batch returns ListResultGajiBatchRootResponse = Envelope<GajiBatchRootResponse[]>
		// HTTP body: { status: 200, data: [...batches...] }
		// API client handle<T> strips outer { status, data } → useQuery.data = GajiBatchRootResponse[]
		const mockBatches = [
			{ id: "b1", periode: "2026-08", status: "PENDING", totalPegawai: 50 },
			{ id: "b2", periode: "2026-07", status: "FINISHED", totalPegawai: 48 },
		];

		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: () => Promise.resolve({ status: 200, data: mockBatches }),
		});

		const { result } = renderHook(() => useBatchList({ page: "0", size: "10" }), { wrapper });

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		// list.data IS the array (handle() already stripped the Envelope)
		const rows = result.current.data ?? [];
		expect(rows).toHaveLength(2);
		expect(rows[0].periode).toBe("2026-08");
	});
});
