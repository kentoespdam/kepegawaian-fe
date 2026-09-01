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

	it("extracts rows from Page envelope (backend response shape)", async () => {
		// Backend returns PageEnvelope: { status, data: { content: [...], totalElements, ... } }
		const mockPage = {
			content: [
				{ id: "b1", periode: "2026-08", status: "PENDING", totalPegawai: 50 },
				{ id: "b2", periode: "2026-07", status: "FINISHED", totalPegawai: 48 },
			],
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

		const { result } = renderHook(
			() => useBatchList({ page: "0", size: "10" }),
			{ wrapper },
		);

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		// After fix: batch-list-client.tsx uses .content (Page shape)
		const rows = result.current.data?.content ?? [];
		expect(rows).toHaveLength(2);
		expect(rows[0].periode).toBe("2026-08");
	});
});
